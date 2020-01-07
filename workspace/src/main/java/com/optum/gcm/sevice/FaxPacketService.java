package com.optum.gcm.sevice;

import static org.apache.commons.lang3.StringEscapeUtils.escapeJava;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.documentum.fc.client.IDfSession;
import com.documentum.fc.client.IDfSysObject;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.dao.constants.FaxQueryConstants;
import com.optum.gcm.imagerepo.BaseService;
import com.optum.gcm.model.ChartStatusUpdate;
import com.optum.gcm.model.RightFaxDetails;

/**
 * @author sgangul1
 */

@Service
public class FaxPacketService extends BaseService {

	private static final Logger LOG = LoggerFactory.getLogger(FaxPacketService.class);

	@Autowired
	private CommonJpaService commonJpaService;

	public byte[] getFaxPacketByDocID(String documentID) {

		String fileName = "";
		InputStream in = null;
		byte[] fileContent = null;
		IDfSession session = null;

		try {
			if (StringUtils.isNotBlank(documentID)) {
				session = dfcConfiguration.getSession();
				IDfSysObject sysObject = (IDfSysObject) session
						.getObjectByQualification("dm_document where object_name ='" + StringUtils.trim(documentID)
								+ "' and a_content_type='pdf'");
				if (sysObject != null) {
					fileName = sysObject.getFile(documentID + ".pdf");
					in = new FileInputStream(fileName);
					fileContent = IOUtils.toByteArray(in);
				}
			}
		} catch (Exception e) {
			LOG.error("Exception occured while extract Fax Packet from Documentum for document: " + escapeJava(documentID), e);
		} finally {
			dfcConfiguration.releaseSession(session);
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
					LOG.error("Exception occured while closing the input stream of getFaxPacketByDocID: ", e);	}
			}
			if (StringUtils.isNotBlank(fileName)) {
				FileUtils.deleteQuietly(new File(fileName));
			}
		}
		return fileContent;
	}

	public byte[] getFaxPacketByAppt(String apptKey) throws Exception {

		String fileName = "";
		InputStream in = null;
		byte[] fileContent = null;
		IDfSession session = null;

		try {
			session = dfcConfiguration.getSession();
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("GCM_RET_APPT_KEY", apptKey);
			String documentID = commonJpaService.getResultObject(FaxQueryConstants.QUERY_FAX_DOCUMENTID, params, String.class);

			if (StringUtils.isNotBlank(documentID)) {
				IDfSysObject sysObject = (IDfSysObject) session
						.getObjectByQualification("dm_document where object_name ='" + StringUtils.trim(documentID)
								+ "' and a_content_type='pdf'");
				if (sysObject != null) {
					fileName = sysObject.getFile(documentID + ".pdf");
					in = new FileInputStream(fileName);
					fileContent = IOUtils.toByteArray(in);
				}
			}
		} catch (Exception e) {
			LOG.error("No Fax Packet Found for apptKey: " + escapeJava(apptKey), e);
		} finally {
			dfcConfiguration.releaseSession(session);
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
					LOG.error("Exception occured while closing the input stream of getFaxPacketByAppt: ", e);			}
			}
			if (StringUtils.isNotBlank(fileName)) {
				FileUtils.deleteQuietly(new File(fileName));
			}
		}
		return fileContent;
	}

	public List<RightFaxDetails> getFaxHistory(Long apptKey) {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_RET_APPT_KEY", apptKey);
		return commonJpaService.getResultList(FaxQueryConstants.QUERY_FAX_HISTORY, params, RightFaxDetails.class);
	}

	@Transactional
	public String updateChartStatus(ChartStatusUpdate chartStatusUpdate) {
		String status = "";
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("MODIFY_USERID", chartStatusUpdate.getRequestedUserId());
			params.put("CHARTIDS", chartStatusUpdate.getChartIdList());
			commonJpaService.update(FaxQueryConstants.UPDATE_APPTSTS_AS_REFAX, params);
			
			params = new HashMap<String, Object>();
			params.put("MODIFY_USERID", chartStatusUpdate.getRequestedUserId());
			params.put("CHARTIDS", chartStatusUpdate.getChartIdList());
			commonJpaService.update(FaxQueryConstants.UPDATE_CHARTS_AS_REFAX, params);
		} catch (Exception e) {
			LOG.error("Exception occured while updating charts with status as Refax", e);
			status = "ERROR";
		}
		return status;
	}

}
