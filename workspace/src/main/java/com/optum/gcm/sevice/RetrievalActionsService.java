package com.optum.gcm.sevice;

import static com.optum.gcm.common.util.LoggingUtil.logInfo;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.optum.gcm.common.constants.StatusFlag;
import com.optum.gcm.common.dao.CommonJpaDao;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.common.util.QueryBuilderUtil;
import com.optum.gcm.dao.constants.RetrievalActionQueries;
import com.optum.gcm.dao.constants.RetrievalActions;
import com.optum.gcm.model.CancelBarcodesInfo;
import com.optum.gcm.model.GcmVendorAssignment;
import com.optum.gcm.model.GcmVendorRequest;
import com.optum.gcm.model.RetrievalSearchFilter;
import com.optum.gcm.model.RetrievalSearchFilterWrapper;
import com.optum.gcm.model.StgVendorReqConcurrency;
import com.optum.gcm.model.ValidateBarcodeResult;

@Service
public class RetrievalActionsService {

	@Autowired
	private CommonJpaDao commonJpaDao;
	@Autowired
	private CommonJpaService commonJpaService;
	@Autowired
	private RetrievalSearchService retrievalSearchService;

	private static final String QUERY_HP_BY_PROJECT = "SELECT DISTINCT GCM_HP_KEY FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR BVF WHERE BVF.GCM_BUSINESS_FUNC_KEY = 4 #WHERE#";

	private static final String QUERY_HAS_VALID_EXTRACT_RECS = "SELECT COUNT(1) FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR BVF WHERE "
			+ "BVF.GCM_BUSINESS_FUNC_KEY = 4 AND BVF.GCM_BUS_FUNC_STATUS IN (SELECT GCM_BUS_FUNC_STATUS FROM GCM_BUS_FUNC_STATUS WHERE GCM_BUSINESS_FUNC_KEY = 4 "
			+ "AND GCM_BUS_FUNC_STATUS_GROUP IN ('INPROGRESS','REASSIGNED')) #WHERE# AND ROWNUM = 1";

	private static final String QUERY_HAS_VALID_REVIEWEXTRACT_RECS = "SELECT COUNT(1) FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR BVF WHERE "
			+ "BVF.GCM_BUSINESS_FUNC_KEY = 4 AND BVF.GCM_BUS_FUNC_STATUS IN (SELECT GCM_BUS_FUNC_STATUS FROM GCM_BUS_FUNC_STATUS WHERE GCM_BUSINESS_FUNC_KEY = 4 "
			+ "AND GCM_BUS_FUNC_STATUS_GROUP IN ('INPROGRESS','REASSIGNED','CREATED')) #WHERE# AND ROWNUM = 1";

	private static final Logger LOG = LoggerFactory.getLogger(RetrievalActionsService.class);

	@Transactional
	public String releaseByProject(List<RetrievalSearchFilter> projectDetails) throws SQLException {
		boolean allProjectsReleased = true;
		for (RetrievalSearchFilter projDetail : projectDetails) {
			Map<String, Object> params = new HashMap<>();
			params.put("GCM_BUSINESS_SEGMENT", projDetail.getBusSegment());
			params.put("GCM_PROJECT_YEAR", projDetail.getProjYear());
			params.put("GCM_PROJ_KEY", projDetail.getProjectKey());
			String status = null;
			if (null == projDetail.getStatus() || projDetail.getStatus().equalsIgnoreCase("")
					|| "NEW".equalsIgnoreCase(projDetail.getStatus())) {
				try {
					status = commonJpaDao.getResultObject(RetrievalActionQueries.QUERY_PROJECT_HAS_NEW_STATUS, params,
							String.class);
				} catch (EmptyResultDataAccessException eRDAE) {
					status = "NO";
					allProjectsReleased = false;
				}
			} else {
				status = "NO";
				allProjectsReleased = false;
			}
			if (StatusFlag.YES.name().equals(status)) {
				insertStgVendorReq(projDetail, RetrievalActions.RELEASE.name());
			}
		}
		if (allProjectsReleased)
			return "SUCCESS";
		else
			return "ERROR";
	}

	@Transactional
	public void cancelByProjectDetails(List<RetrievalSearchFilter> retrievalSearchFilterList) throws SQLException {
		for (RetrievalSearchFilter retrievalSearchFilter : retrievalSearchFilterList) {
			insertStgVendorReq(retrievalSearchFilter, RetrievalActions.CANCEL.name());
		}
	}

	@Transactional
	public void inactivateByProjectDetails(List<RetrievalSearchFilter> retrievalSearchFilterList) throws SQLException {
		for (RetrievalSearchFilter retrievalSearchFilter : retrievalSearchFilterList) {
			insertStgVendorReq(retrievalSearchFilter, RetrievalActions.INACTIVATE.name());
		}
	}

	@Transactional
	public void assignVendors(RetrievalSearchFilterWrapper retrievalSearchFilterWrapper) throws SQLException {
		Long vendorAssignKey = null;
		if (retrievalSearchFilterWrapper.getAssignQty() != null)
			vendorAssignKey = insertVendorAssignment(retrievalSearchFilterWrapper.getNewVendorKey(),
					retrievalSearchFilterWrapper.getAssignQty(), retrievalSearchFilterWrapper.getLoggedInUser());

		List<RetrievalSearchFilter> retrievalSearchFilterList = retrievalSearchFilterWrapper.getRetrievalSearchFilter();
		for (RetrievalSearchFilter retrievalSearchObj : retrievalSearchFilterList) {
			List<Long> hpList = getHealthPlansByProject(retrievalSearchObj);
			insertStgVendorReq(retrievalSearchObj, RetrievalActions.ASSIGN.name());
			for (Long hpKey : hpList) {
				retrievalSearchObj.setHpKey(hpKey);
				String actionNm = RetrievalActions.ASSIGN.name();
				if (retrievalSearchObj.getVendorKey() != 0)
					actionNm = RetrievalActions.REASSIGN.name();
				insertVendorRequest(retrievalSearchObj, actionNm, retrievalSearchFilterWrapper.getNewVendorKey(),
						vendorAssignKey);
			}
		}
	}

	@Transactional
	public String reviewExtract(List<RetrievalSearchFilter> retrievalSearchFilterList) throws SQLException {
		String status = "";
		for (RetrievalSearchFilter retrievalSearchFilter : retrievalSearchFilterList) {
			Long valid = hasValidReviewExtractBarcodes(retrievalSearchFilter);
			if (valid == 0L) {
				status = retrievalSearchFilter.getProjectKey().toString();
				break;
			}
		}
		if (StringUtils.isBlank(status)) {
			for (RetrievalSearchFilter retrievalSearchFilter : retrievalSearchFilterList) {
				insertStgVendorReq(retrievalSearchFilter, RetrievalActions.REVIEW_EXTRACT.name().replace("_", "-"));
			}
		}
		return status;
	}

	@Transactional
	public String sendExtract(List<RetrievalSearchFilter> retrievalSearchFilterList) throws SQLException {
		String status = "";
		for (RetrievalSearchFilter retrievalSearchFilter : retrievalSearchFilterList) {
			Long valid = hasValidExtractBarcodes(retrievalSearchFilter);
			if (valid == 0L) {
				// status = "NOTVALID";
				// status = "Extract to vendor process failed. Barcodes in a
				// 'Released' status not present for this project " +
				// retrievalSearchFilter.getProjectKey();
				status = retrievalSearchFilter.getProjectKey().toString();
				break;
			}
		}
		if (StringUtils.isBlank(status)) {
			for (RetrievalSearchFilter retrievalSearchFilter : retrievalSearchFilterList) {
				insertStgVendorReq(retrievalSearchFilter, RetrievalActions.EXTRACT.name());
			}
		}
		return status;
	}

	private void insertStgVendorReq(RetrievalSearchFilter retrievalSearchFilter, String actionNm) {
		java.util.Date date = new Date();
		java.sql.Timestamp timestampdate = new java.sql.Timestamp(date.getTime());
		if (!actionNm.equalsIgnoreCase(RetrievalActions.ASSIGN.name())
				&& !actionNm.equalsIgnoreCase(RetrievalActions.REASSIGN.name())) {
			GcmVendorRequest vendorRequest = new GcmVendorRequest();
			vendorRequest.setProjYear(retrievalSearchFilter.getProjYear());
			vendorRequest.setProjKey(retrievalSearchFilter.getProjectKey());
			vendorRequest.setRequestType(actionNm);
			vendorRequest.setBusFuncStatus(retrievalSearchFilter.getStatus());
			vendorRequest.setHpKey(retrievalSearchFilter.getHpKey());
			vendorRequest.setHpProduct(retrievalSearchFilter.getHpProduct());
			vendorRequest.setProgramKey(retrievalSearchFilter.getProgramKey());
			vendorRequest.setVendorKey(retrievalSearchFilter.getVendorKey());
			vendorRequest.setBusinessSegment(retrievalSearchFilter.getBusSegment());
			vendorRequest.setProcessStatus("NEW");
			vendorRequest.setCreateDate(new java.sql.Timestamp(System.currentTimeMillis()));
			vendorRequest.setCreateUser(retrievalSearchFilter.getProgramsByUser());
			vendorRequest.setModifiedDate(new java.sql.Timestamp(System.currentTimeMillis()));
			vendorRequest.setModifiedUser(retrievalSearchFilter.getProgramsByUser());
			logInfo(LOG, true, "Vendor RequestObj {} ", vendorRequest.toString());
			commonJpaDao.persist(vendorRequest);
		}
		StgVendorReqConcurrency vendorReqConcurrency = new StgVendorReqConcurrency();
		vendorReqConcurrency.setCrateDate(timestampdate);
		vendorReqConcurrency.setReqestType(actionNm);
		vendorReqConcurrency.setProjKey(retrievalSearchFilter.getProjectKey());
		vendorReqConcurrency.setHpKey(retrievalSearchFilter.getHpKey());
		logInfo(LOG, true, "Vendor Key is before : {} ", retrievalSearchFilter.getVendorKey());
		vendorReqConcurrency.setVendorKey(retrievalSearchFilter.getVendorKey());
		logInfo(LOG, true, "Vendor Key is after : {} ", vendorReqConcurrency.getVendorKey());
		vendorReqConcurrency.setProgramKey(retrievalSearchFilter.getProgramKey());
		vendorReqConcurrency.setUserId(retrievalSearchFilter.getProgramsByUser());
		commonJpaDao.persist(vendorReqConcurrency);

	}

	private void insertVendorRequest(RetrievalSearchFilter retrievalSearchFilter, String actionNm, Long newVendorKey,
			Long vendorAssignKey) {
		GcmVendorRequest vendorRequest = new GcmVendorRequest();
		vendorRequest.setProjYear(retrievalSearchFilter.getProjYear());
		vendorRequest.setProjKey(retrievalSearchFilter.getProjectKey());
		vendorRequest.setRequestType(actionNm);
		vendorRequest.setBusFuncStatus(retrievalSearchFilter.getStatus());
		vendorRequest.setHpKey(retrievalSearchFilter.getHpKey());
		vendorRequest.setHpProduct(retrievalSearchFilter.getHpProduct());
		vendorRequest.setProgramKey(retrievalSearchFilter.getProgramKey());
		vendorRequest.setVendorKey(retrievalSearchFilter.getVendorKey());
		vendorRequest.setBusinessSegment(retrievalSearchFilter.getBusSegment());
		vendorRequest.setNewVendorKey(newVendorKey);
		vendorRequest.setVendorAssignKey(vendorAssignKey);
		vendorRequest.setProcessStatus("NEW");
		vendorRequest.setCreateDate(new java.sql.Timestamp(System.currentTimeMillis()));
		vendorRequest.setCreateUser(retrievalSearchFilter.getProgramsByUser());
		vendorRequest.setModifiedDate(new java.sql.Timestamp(System.currentTimeMillis()));
		vendorRequest.setModifiedUser(retrievalSearchFilter.getProgramsByUser());
		commonJpaDao.persist(vendorRequest);
	}

	private Long insertVendorAssignment(Long vendorKey, Long assignQty, String userId) {
		Long assignKey = null;
		GcmVendorAssignment vendorAssignment = new GcmVendorAssignment();
		vendorAssignment.setVendorAssignKey(assignKey);
		vendorAssignment.setVendorKey(vendorKey);
		vendorAssignment.setAssignableQty(assignQty);
		vendorAssignment.setCreateUserId(userId);
		vendorAssignment.setModifyUserId(userId);
		vendorAssignment.setCreateDateTime(new java.sql.Timestamp(System.currentTimeMillis()));
		vendorAssignment.setModifyDateTime(new java.sql.Timestamp(System.currentTimeMillis()));
		assignKey = commonJpaDao.persist(vendorAssignment);
		return assignKey;
	}

	private List<Long> getHealthPlansByProject(RetrievalSearchFilter searchFilter) {
		List<Long> hpKeys = new ArrayList<>();
		Long clientKey = searchFilter.getClientKey();
		Long hpKey = searchFilter.getHpKey();
		if (null != clientKey && clientKey > 0 && null != hpKey && hpKey == 0) {
			Map<String, Object> params = new HashMap<String, Object>();
			searchFilter.setProjectKey(searchFilter.getProjectKey());
			searchFilter.setProgramKey(searchFilter.getProgramKey());
			if (searchFilter.getVendorKey() > 0) {
				searchFilter.setVendorKey(searchFilter.getVendorKey());
			}
			String where = QueryBuilderUtil.getWhere(RetrievalSearchFilter.class, searchFilter, params);
			String queryString = QUERY_HP_BY_PROJECT.replace("#WHERE#", where);
			if (searchFilter.getVendorKey() == 0) {
				queryString = queryString.concat("AND BFV.GCM_VENDOR_KEY IS NULL");
			}
			List<RetrievalSearchFilter> hplList = commonJpaService.getResultList(queryString, params,
					RetrievalSearchFilter.class);
			for (RetrievalSearchFilter result : hplList) {
				hpKeys.add(result.getHpKey());
			}
		} else {
			hpKeys.add(null);
		}
		return hpKeys;
	}

	private long hasValidExtractBarcodes(RetrievalSearchFilter retrievalSearchFilter) {
		Map<String, Object> params = new HashMap<String, Object>();
		String where = QueryBuilderUtil.getWhere(RetrievalSearchFilter.class, retrievalSearchFilter, params);
		String queryString = QUERY_HAS_VALID_EXTRACT_RECS.replace("#WHERE#", where);
		params.put("USERID", retrievalSearchFilter.getProgramsByUser());
		Long flag = 0L;
		flag = commonJpaService.getResultObject(queryString, params, Long.class);
		return flag;
	}

	private long hasValidReviewExtractBarcodes(RetrievalSearchFilter retrievalSearchFilter) {
		Map<String, Object> params = new HashMap<String, Object>();
		String where = QueryBuilderUtil.getWhere(RetrievalSearchFilter.class, retrievalSearchFilter, params);
		params.put("USERID", retrievalSearchFilter.getProgramsByUser());
		Long flag = 0L;
		if (StringUtils.equalsIgnoreCase((CharSequence) params.get("GCM_BUS_FUNC_STATUS"), "EXTNEW")) {
			where = where.replaceAll("BVF.GCM_BUS_FUNC_STATUS = :GCM_BUS_FUNC_STATUS",
					"BVF.GCM_BUS_FUNC_STATUS in (:GCM_BUS_FUNC_STATUS)");
			params.put("GCM_BUS_FUNC_STATUS", Arrays.asList("NEW", "RELEASED"));
		}
		String queryString = QUERY_HAS_VALID_REVIEWEXTRACT_RECS.replace("#WHERE#", where);
		flag = commonJpaService.getResultObject(queryString, params, Long.class);
		return flag;
	}

	@Transactional
	public String cancelBarcodes(CancelBarcodesInfo cancelBarcodesInfo) {
		List<String> validBarcodes = new ArrayList<String>();
		List<String> invalidBarcodes = new ArrayList<String>();
		String barcodes = cancelBarcodesInfo.getBarcodes();
		String userId = cancelBarcodesInfo.getUserId();
		String reasonCode = cancelBarcodesInfo.getReasonCode();
		Long userKey = cancelBarcodesInfo.getUserKey();
		String status = validateBarcode(barcodes, invalidBarcodes, validBarcodes, userId, userKey);
		if ("SUCCESS".equals(status)) {
			if (validBarcodes.size() > 0) {
				boolean flag = processRequest(validBarcodes, reasonCode, userId);
				if (flag) {
					status = "SUCCESS.All the barcodes are processed successfully.";
					if (invalidBarcodes.size() > 0) {
						status = "SUCCESS.Cancel barcode request processed successfully. " + validBarcodes.size()
								+ " of " + (validBarcodes.size() + invalidBarcodes.size())
								+ " barcodes cancelled successfully.";
						// sendEmail(invalidBarcodes, validBarcodes, barcodes);
					}
				} else {
					status = "Exception occured while processing the request.";
				}
			} else {
				status = "All the barcodes are invalid. Provide valid barcodes to process the request.";
				// sendEmail(invalidBarcodes, validBarcodes, barcodes);
			}
		}
		return status;
	}

	private boolean processRequest(List<String> validBarcodes, String reasonCode, String userId) {
		// String transId = Native.createGuid();
		StringBuilder barcodes = new StringBuilder();
		for (String barcode : validBarcodes) {
			barcodes.append(barcode);
			barcodes.append(";");
		}
		try {
			// BSF.startTransaction(transId);
			String query = RetrievalActionQueries.UPDATE_BAROCDES_STATUS;
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("BARCODES", barcodes.toString());
			params.put("REASON_CODE", reasonCode);
			commonJpaService.update(query, params);
			String insertManifest = RetrievalActionQueries.INSERT_VENDOR_MANIFEST;
			params.put("BARCODES", barcodes.toString());
			params.put("USERID", userId);
			commonJpaService.update(insertManifest, params);
		} catch (Exception e) {
			LOG.error("Exception occured while updading/inserting : ", e);
			return false;
		}
		return true;
	}

	private String validateBarcode(String barcodes, List<String> invalidBarcodes, List<String> validBarocdes,
			String userId, Long userKey) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();

			String queryString = RetrievalActionQueries.QUERY_BARCODES_HAS_INVALID_GROUP;
			params.put("BARCODES", barcodes);
			params.put("GCM_USER_KEY", userKey);
			Integer count = commonJpaService.getResultObject(queryString, params, Integer.class);
			if (null != count && count > 0) {
				return "One or More Barcodes belongs to a Group for which user has no access.";
			}
			if (retrievalSearchService.userHasBusinesSegments(userId)) {
				queryString = RetrievalActionQueries.QUERY_BARCODES_HAS_INVALID_BUSINESS_SEGMENT;
				params.put("BARCODES", barcodes);
				params.put("USERID", userId);
				count = commonJpaService.getResultObject(queryString, params, Integer.class);
				if (null != count && count > 0) {
					return "One or More Barcodes belongs to a Business Segment for which user has no access.";
				}
			}
			if (retrievalSearchService.userHasPrograms(userId)) {
				queryString = RetrievalActionQueries.QUERY_BARCODES_HAS_INVALID_PROGRAM;
				params.put("BARCODES", barcodes);
				params.put("USERID", userId);
				count = commonJpaService.getResultObject(queryString, params, Integer.class);
				if (null != count && count > 0) {
					return "One or More Barcodes belongs to a program for which user has no access.";
				}
			}
			queryString = RetrievalActionQueries.QUERY_BARCODES_VALIDATION;
			params.put("BARCODES", barcodes);

			List<ValidateBarcodeResult> results = commonJpaService.getResultList(queryString, params,
					ValidateBarcodeResult.class);
			for (ValidateBarcodeResult busObject : results) {
				if (null == busObject.getProjContBarCode()) {
					invalidBarcodes.add(busObject.getProjContBarCode() + " - Invalid barcode");
				} else if (null != busObject.getWorkItemsCnt() && busObject.getWorkItemsCnt() > 1) {
					invalidBarcodes.add(busObject.getProjContBarCode() + " - barcode has post retrieval work items");
				} else if (null != busObject.getBusFuncStatus() && "CANCELED".equals(busObject.getBusFuncStatus())) {
					invalidBarcodes.add(busObject.getProjContBarCode() + " - barcode already in CANCELED status");
				} else if (null != busObject.getHasPendReq() && "YES".equals(busObject.getHasPendReq())) {
					invalidBarcodes.add(busObject.getProjContBarCode() + " - Assign/Extract/Release still in progress");
				} else {
					validBarocdes.add(busObject.getProjContBarCode());
				}
			}
		} catch (EmptyResultDataAccessException e) {
			LOG.error("Exception occured in validation : ", e);
			return "Exception occured while validating the barocdes.";
		}
		return "SUCCESS";
	}

}