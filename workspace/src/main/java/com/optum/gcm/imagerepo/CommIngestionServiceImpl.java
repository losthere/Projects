package com.optum.gcm.imagerepo;

import static com.optum.gcm.common.util.LoggingUtil.logDebug;
import static com.optum.gcm.common.util.LoggingUtil.logInfo;
import static com.optum.gcm.dao.constants.ChartLoadQueryConstants.PKG_CHART_LOAD$PRC_UPDATE_CHART_STATUS;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.documentum.fc.client.IDfDocument;
import com.documentum.fc.client.IDfFolder;
import com.documentum.fc.client.IDfSession;
import com.documentum.fc.common.DfException;
import com.documentum.fc.common.DfTime;
import com.optum.gcm.common.sevice.StoredProcedureService;
import com.optum.gcm.common.util.PDFUtil;
import com.optum.gcm.constants.GCMConstants;
import com.optum.gcm.constants.GCMConstants.DMObjectAttributeConstants;
import com.optum.gcm.constants.GCMConstants.IngestionJobContants;
import com.optum.gcm.constants.GCMConstants.TaskStatus;
import com.optum.gcm.model.BaseTaskStatus;
import com.optum.gcm.model.CommIngestionTaskStatus;
import com.optum.gcm.model.ImageAttributes;

@Service
public class CommIngestionServiceImpl extends BaseService {

	private static final Logger LOGGER = LoggerFactory.getLogger(CommIngestionServiceImpl.class);

	private static final String CABINET_NAME = "/Commercial";

	private StoredProcedureService storedProcedureService;

	@Autowired
	public CommIngestionServiceImpl(StoredProcedureService storedProcedureService) {
		this.storedProcedureService = storedProcedureService;
	}

	@Transactional
	public String ingestChart(File file, ImageAttributes imageAttributes, String uploadSource) throws DfException,IOException,Exception{
		if(null != file) {
			logInfo(LOGGER, "Started chart ingestion for the file =>{}", file.getName());
		}else {
			logInfo(LOGGER, "Invalid input file object");
			return null;
		}
		String status = "";
		IDfSession dfcSession = null;
		IDfDocument document = null;
		try {
			if (imageAttributes != null) {
				dfcSession = dfcConfiguration.getSession();
				String format = FilenameUtils.getExtension(file.getName());
				document = (IDfDocument) getDocumentumDocument(dfcSession, imageAttributes.getBarcode(), format);
				int pageCount = PDFUtil.getPageCount(file.getAbsolutePath());
				String aclName = getACLName(imageAttributes);
				if (document != null) {
					logInfo(LOGGER, "File already exists in the repository.");
					if (document.isCheckedOut()) {
						document.cancelCheckout();
					}
					document.checkout();
					applyMetaData(document, imageAttributes);
					document.setString(DMObjectAttributeConstants.NO_OF_PAGES, String.valueOf(pageCount));
					document.setACLName(aclName);
					document.setACLDomain(dfcHelper.getDocBaseOwner());
					document.setFile(file.getAbsolutePath());
					document.setTitle(file.getName());
					document.checkin(false, "");
				} else {
					String documentumLink = getDocumentumLink(imageAttributes);
					BaseTaskStatus taskStatus = new CommIngestionTaskStatus();
					IDfFolder folder = dfcHelper.createFolder(dfcSession, documentumLink, aclName, taskStatus);

					if (null != taskStatus.getTaskStatus() && taskStatus.getTaskStatus().equals(TaskStatus.FAILURE)) {

						status = "Error occurred while creating folder ===>" + documentumLink;

					} else if (folder != null) {
						if (pageCount > 0) {
							document = dfcHelper.createDocument(dfcSession, file.getName(),
									imageAttributes.getBarcode(), format);
							applyMetaData(document, imageAttributes);
							document.setString(DMObjectAttributeConstants.NO_OF_PAGES, String.valueOf(pageCount));
							document.link(documentumLink);
							document.setACLName(aclName);
							document.setACLDomain(dfcHelper.getDocBaseOwner());
							document.setFile(file.getAbsolutePath());
							document.save();
						} else {
							LOGGER.error("ERROR: Page count is 0 for the file : " + file.getName());
							status = "Page count is 0 for the file.";
						}
					} else {
						status = "Error while creating the folder in documentum. Please contact adminstrator.";
					}
				}
				processChart(imageAttributes, pageCount, uploadSource);
				logInfo(LOGGER, "Successfully ingested the image for barcode {}", imageAttributes.getBarcode());
			}
		} finally {
			dfcConfiguration.releaseSession(dfcSession);
		}
		return status;
	}

	private void processChart(ImageAttributes imageAttributes, int pageCount, String uploadSource) {
		Map<String, Object> params = new HashMap<>();
		params.put("P_PROJ_YEAR", imageAttributes.getProjectYear());
		params.put("P_BARCODE", imageAttributes.getBarcode());
		params.put("P_PAGE_COUNT", pageCount);
		params.put("P_IMG_FILE_KEY", imageAttributes.getImageFileKey());
		params.put("P_IMAGE_SOURCE", uploadSource);
		storedProcedureService.callStoredProc(params, PKG_CHART_LOAD$PRC_UPDATE_CHART_STATUS);
	}

	public void applyMetaData(IDfDocument document, ImageAttributes imageAttributes) throws DfException {
		if (imageAttributes != null) {
			logDebug(LOGGER,"Ingestion started for barcode : {}", imageAttributes.getBarcode());
			document.setString(DMObjectAttributeConstants.GLOBAL_MBR_ID, imageAttributes.getGlbMbrId());
			document.setString(DMObjectAttributeConstants.GLOBAL_PROV_ID, imageAttributes.getSourceSysProvId());
			document.setString(DMObjectAttributeConstants.MBR_HP_CD, imageAttributes.getHpCd());
			document.setString(DMObjectAttributeConstants.MBR_HP_PROD, imageAttributes.getHpProduct());
			document.setString(DMObjectAttributeConstants.CLIENT_CODE, imageAttributes.getClientCd());
			document.setString(DMObjectAttributeConstants.MBR_HIC, imageAttributes.getMbrHic());
			logDebug(LOGGER, "Member DOB : {}", imageAttributes.getMbrDob());
			document.setTime(DMObjectAttributeConstants.MBR_DOB, new DfTime(imageAttributes.getMbrDob()));
			document.setString(DMObjectAttributeConstants.MBR_FIRST_NAME, imageAttributes.getMbrFirstName());
			document.setString(DMObjectAttributeConstants.MBR_LAST_NAME, imageAttributes.getMbrLastName());
			document.setString(DMObjectAttributeConstants.PROV_ID, imageAttributes.getProviderKey());
			document.setString(DMObjectAttributeConstants.PROV_GRP_ID, imageAttributes.getProvGrpId());
			document.setString(DMObjectAttributeConstants.PROJ_YEAR, String.valueOf(imageAttributes.getProjectYear()));
			document.setString(DMObjectAttributeConstants.PROGRAM_TYPE_REPEATING, imageAttributes.getProgName());
			document.setString(DMObjectAttributeConstants.BUSINESS_SEGMENT, imageAttributes.getBusSegment());
			document.setString(DMObjectAttributeConstants.RETRIEVAL_VENDOR, imageAttributes.getVendorCode());
			document.setString(DMObjectAttributeConstants.PROV_FIRST_NAME, imageAttributes.getProvFirstName());
			document.setString(DMObjectAttributeConstants.PROV_LAST_NAME, imageAttributes.getProvLastName());
			document.setString(DMObjectAttributeConstants.RETRIEVAL_SOURCE,
					GCMConstants.IngestionJobContants.COMMERCIAL_JOB);
		}
	}

	private String getDocumentumLink(ImageAttributes imageAttributes) {
		StringBuilder link = new StringBuilder(CABINET_NAME);
		link.append(IngestionJobContants.FOLDER_SEPERATOR).append(imageAttributes.getProjectYear()).append(IngestionJobContants.FOLDER_SEPERATOR).append(imageAttributes.getHpCd()).append(IngestionJobContants.FOLDER_SEPERATOR).append(imageAttributes.getHpProduct());
		// link.append(IngestionJobContants.FOLDER_SEPERATOR);
		return link.toString();
	}

}
