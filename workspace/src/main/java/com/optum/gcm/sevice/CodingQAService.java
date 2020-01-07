package com.optum.gcm.sevice;

import static com.optum.gcm.dao.constants.CodingQAQueries.ACCEPT_CODING_QA_RESULTS_PROC;
import static com.optum.gcm.dao.constants.CodingQAQueries.QUERY_COMPLETED_CODING_QA_ENCOUNTER_DX;
import static com.optum.gcm.dao.constants.CodingQAQueries.QUERY_ENCOUNTER_DX;
import static com.optum.gcm.dao.constants.CodingQAQueries.QUERY_GET_CODINGQA_WORKLIST;
import static com.optum.gcm.dao.constants.CodingQAQueries.QUERY_TO_CHECK_CLOSED_PROJS;
import static com.optum.gcm.dao.constants.CodingQAQueries.QUERY_UPDATE_CODINGQA_ADDTOMYWORKLIST;
import static com.optum.gcm.dao.constants.CodingQAQueries.QUERY_UPDATE_CODINGQA_RELEASETOASSIGN;
import static com.optum.gcm.dao.constants.CodingQAQueries.SAVE_CODING_QA_RESULTS_PROC;
import static com.optum.gcm.dao.constants.CodingWorkListQueries.QUERY_GET_CODING_WORKLIST;
import static com.optum.gcm.dao.constants.CodingWorkListQueries.QUERY_INSERT_CODERPROD_FORQA;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.optum.gcm.common.dao.CommonJpaDao;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.common.sevice.StoredProcedureService;
import com.optum.gcm.common.util.QueryBuilderUtil;
import com.optum.gcm.model.CodingQAAcceptFilter;
import com.optum.gcm.model.CodingQAEncDxDetails;
import com.optum.gcm.model.CodingQAEncDxWrapper;
import com.optum.gcm.model.CodingQAWorkItem;
import com.optum.gcm.model.CodingQaDxDetails;
import com.optum.gcm.model.CodingWorkListInfo;
import com.optum.gcm.model.EOCode;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.StatusUpdateInfo;

/**
 * @author pmule
 *
 */

@Service
public class CodingQAService {

	private static final Logger LOG = LoggerFactory.getLogger(CodingWorkListService.class);

	@Autowired
	private CommonJpaService commonJpaService;

	@Autowired
	private CommonJpaDao commonJpaDao;

	@Autowired
	private StoredProcedureService storedProcedureService;

	public List<CodingWorkListInfo> getCodingQAAvailableWorkItems(SchedulingSearchFilter searchFilter)
			throws SQLException {
		Map<String, Object> params = new HashMap<>();
		String where = "";
		String queryString = null;
		if (searchFilter != null) {
			where = QueryBuilderUtil.getWhereClauseforCoding(searchFilter, params);
			LOG.info("getCodingQAAvailableWorkItems started with search filter: " + searchFilter!=null?searchFilter.toString():null);
			params.put("GCM_LOGIN_USER_KEY", searchFilter.getLoginUserKey());
			params.put("GCM_BUSINESS_FUNC_KEY", searchFilter.getBusFuncKey());
		}

		if (searchFilter != null && searchFilter.getAcceptedFromDate() != null && searchFilter.getAcceptedToDate() != null) {
			where += " AND TRUNC(GCM_BUS_FUNC_STATUS_DT) BETWEEN TO_DATE(:FROMDATE,'MM/DD/YY')  AND  TO_DATE(:TODATE,'MM/DD/YY') ";
			params.put("FROMDATE", searchFilter.getAcceptedFromDate());
			params.put("TODATE", searchFilter.getAcceptedToDate());
		} 

		if (searchFilter != null && searchFilter.getRecordCount() != null && searchFilter.getRecordCount() > 0) {
			params.put("PERCENT", searchFilter.getRecordCount());

		}

		if (searchFilter != null && searchFilter.getFromUserKey() != null && searchFilter.getFromUserKey() > 0) {
			where += " AND V.GCM_CODER_USER_KEY = :GCM_USER_KEY ";
			params.put("GCM_USER_KEY", searchFilter.getFromUserKey());

		}

		if (searchFilter != null && searchFilter.getProgramKey() != null) {
			where += " AND V.GCM_PROGRAM_KEY = :GCM_PROGRAM_KEY ";
			params.put("GCM_PROGRAM_KEY", searchFilter.getProgramKey());
		}
		
		if (searchFilter != null)
			params.put("GCM_VENDOR_KEY", searchFilter.getVendorKey());
		
		queryString = QUERY_GET_CODINGQA_WORKLIST.replace("#WHERE#", where);
		return commonJpaService.getResultList(queryString, params, CodingWorkListInfo.class);
	}

	public boolean codingQAAddtoMyWorkList(StatusUpdateInfo statusUpdateInfo) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		List<String> chartIdList = new ArrayList<String>();
		params.put("GCM_LOGIN_USER_KEY", statusUpdateInfo.getLoginUserKey());
		params.put("GCM_BUSINESS_FUNC_KEY", statusUpdateInfo.getBusFunction());
		//params.put("CHARTIDS", statusUpdateInfo.getChartIdList());
		params.put("MODIFY_USERID", statusUpdateInfo.getRequestedUserId());
		if(LOG.isDebugEnabled()){
			LOG.info("codingQAAddtoMyWorkList started with search filter: " + statusUpdateInfo.toString());
		}
		chartIdList = statusUpdateInfo.getChartIdList();
		List<String> barcodes=new ArrayList<String>();
		if(null != chartIdList && chartIdList.size() > 1) {
			params.put("CHARTIDS", getChartIDStringFromList(chartIdList));
			barcodes=verifyProjsByBarcode(getChartIDStringFromList(chartIdList));
		}
		else {
			params.put("CHARTIDS", chartIdList);
		}
		if(barcodes.isEmpty()) {
		commonJpaDao.update(QUERY_UPDATE_CODINGQA_ADDTOMYWORKLIST, params);
		commonJpaDao.update(QUERY_INSERT_CODERPROD_FORQA, params);
		return true;  
		}
		else
		{
			return false;
		}
	}
private List<String> verifyProjsByBarcode(String chartIdList)
		{
			Map<String, Object> params = new HashMap<>();
			params.put("CHARTIDS", chartIdList);
			return commonJpaService.getResultList(QUERY_TO_CHECK_CLOSED_PROJS, params, String.class);
		}
	public String codingQAreleasetoAssign(StatusUpdateInfo statusUpdateInfo) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		String P_OUT_STATUS = "P_OUT_STATUS";
		StringBuffer chartIdList = new StringBuffer("");
		for (int i = 0; statusUpdateInfo.getChartIdList() != null
				&& i < statusUpdateInfo.getChartIdList().size(); i++) {
			chartIdList.append(statusUpdateInfo.getChartIdList().get(i));
			if (i < statusUpdateInfo.getChartIdList().size() - 1) {
				chartIdList.append(',');
			}
		}
		params.put("p_barcodes", chartIdList.toString());
		params.put("p_user_key", statusUpdateInfo.getLoginUserKey());
		params.put("p_userid", statusUpdateInfo.getRequestedUserId());
		params.put("p_business_func_key", statusUpdateInfo.getBusFunction());
		if(LOG.isDebugEnabled()){
			LOG.info("codingQAreleasetoAssign started with search filter: " + statusUpdateInfo.toString());
		}
		return storedProcedureService.callStoredProc(QUERY_UPDATE_CODINGQA_RELEASETOASSIGN, params, P_OUT_STATUS);
	}

	public List<CodingWorkListInfo> getCodingQAMyWorkList(SchedulingSearchFilter searchFilter) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		String where = "";
		String queryString = null;
		if (searchFilter != null) {
			LOG.info("getMyCodingWorklist started with search filter: " + searchFilter.toString());
			where = QueryBuilderUtil.getWhereClauseforCoding(searchFilter, params);
		}

		if (searchFilter != null && StringUtils.isNotBlank(searchFilter.getIsAssigned())
				&& searchFilter.getIsAssigned().equalsIgnoreCase("1")) {

			if (StringUtils.isNotBlank(searchFilter.getStatus()) && searchFilter.getStatus().equalsIgnoreCase("1")) {
				where += " AND GCM_BUS_FUNC_STATUS IN ('ASSIGNED')";
			} else if (StringUtils.isNotBlank(searchFilter.getStatus())
					&& searchFilter.getStatus().equalsIgnoreCase("2")) {
				where += " AND GCM_BUS_FUNC_STATUS IN ('INPROGRESS') ";
			} else {
				where += " AND GCM_BUS_FUNC_STATUS <> 'COMPLETED' ";
			}

		}

		if (searchFilter != null && StringUtils.isNotBlank(searchFilter.getStatus())
				&& searchFilter.getStatus().equalsIgnoreCase("1")) {
			where += " AND GCM_BUS_FUNC_STATUS <> 'COMPLETED'";
		}

		if (searchFilter != null && StringUtils.isNotBlank(searchFilter.getIsCompleted())
				&& searchFilter.getIsCompleted().equalsIgnoreCase("1")) {
			where += " AND GCM_BUS_FUNC_STATUS IN ( 'COMPLETED','REJECTED') ";
			if (searchFilter.getAcceptedFromDate() != null && searchFilter.getAcceptedToDate() != null) {
				where += " AND TRUNC(GCM_BUS_FUNC_STATUS_DT) BETWEEN TO_DATE(:FROMDATE,'MM/DD/YY')  AND  TO_DATE(:TODATE,'MM/DD/YY') ";
				params.put("FROMDATE", searchFilter.getAcceptedFromDate());
				params.put("TODATE", searchFilter.getAcceptedToDate());

			} else {
				where += " AND TRUNC(GCM_BUS_FUNC_STATUS_DT) BETWEEN TRUNC(SYSDATE) - 30 AND TRUNC(SYSDATE) ";
			}
		}

		if (searchFilter != null && searchFilter.getProgramKey() != null) {
			where += " AND V.GCM_PROGRAM_KEY = :GCM_PROGRAM_KEY ";
			params.put("GCM_PROGRAM_KEY", searchFilter.getProgramKey());
		}

		if (null != searchFilter) {
			params.put("GCM_USER_KEY", searchFilter.getFromUserKey());
			params.put("GCM_BUSINESS_FUNC_KEY", searchFilter.getBusFuncKey());
		}
		queryString = QUERY_GET_CODING_WORKLIST.replace("#WHERE#", where);
		return commonJpaService.getResultList(queryString, params, CodingWorkListInfo.class);
	}

	public CodingQAEncDxWrapper getCodingQAEncounterDx(SchedulingSearchFilter searchFilter) throws ParseException {
		
		String query = "";
		if(null != searchFilter.getIsCompleted() && "Y".equalsIgnoreCase(searchFilter.getIsCompleted())){
			query = QUERY_COMPLETED_CODING_QA_ENCOUNTER_DX;
		}
		else{
			query = QUERY_ENCOUNTER_DX;
		}
		
		Map<String, Object> params = new HashMap<>();
		params.put("p_user_key", searchFilter.getLoginUserKey());
		params.put("p_group_key", searchFilter.getGroupKey());
		params.put("p_proj_key", searchFilter.getProjectKey());
		params.put("p_content_key", searchFilter.getProjContKey());
		params.put("p_ven_key", searchFilter.getBusFuncVenKey());

		List<CodingQAWorkItem> codingQAWorkItemList = commonJpaService.getResultList(query, params,
				CodingQAWorkItem.class); 
		
		for(CodingQAWorkItem codingQAWorkItem : codingQAWorkItemList) {
			if("ENC".equals(codingQAWorkItem.getRecordLevel())) {
					codingQAWorkItem.setCoderEoKeyList(StringUtils.split(codingQAWorkItem.getCoderEoKeyListRes(),"\\|"));
					codingQAWorkItem.setQaEoKeyListResponse(StringUtils.split(codingQAWorkItem.getQaEoKeyList(),"\\|"));
				}
		}

		List<CodingQAEncDxDetails> codingQAEncDxDetailsList = convertToWrapper(codingQAWorkItemList);

		CodingQAEncDxWrapper codingQAEncDxWrapper = new CodingQAEncDxWrapper();
		codingQAEncDxWrapper.setLoginUserKey(searchFilter.getLoginUserKey());
		codingQAEncDxWrapper.setLoginUserId(searchFilter.getLoginUserId());
		codingQAEncDxWrapper.setGroupKey(searchFilter.getGroupKey());
		codingQAEncDxWrapper.setProjectKey(searchFilter.getProjectKey());
		codingQAEncDxWrapper.setProjContKey(searchFilter.getProjContKey());
		codingQAEncDxWrapper.setBusFuncVenKey(searchFilter.getBusFuncVenKey());
		codingQAEncDxWrapper.setCodingQAEncDxDetailsList(codingQAEncDxDetailsList);
		
		LOG.info("codingQAEncDxWrapper: " + codingQAEncDxWrapper.toString());
		return codingQAEncDxWrapper;

	}

	private List<CodingQAEncDxDetails> convertToWrapper(List<CodingQAWorkItem> codingQAWorkItemList)
			throws ParseException {

		Map<String, CodingQAEncDxDetails> codingQAMap = new HashMap<>();
		List<CodingQAEncDxDetails> codingQAEncDxDetailsList = new ArrayList<>();
		SimpleDateFormat dformat = new SimpleDateFormat("MM-dd-yyyy");

		for (CodingQAWorkItem codingQAWorkItem : codingQAWorkItemList) {

			CodingQAEncDxDetails codingQAEncDxDetails = codingQAMap
					.get(codingQAWorkItem.getCoderEncounterKey() + "," + codingQAWorkItem.getQaEncounterKey());

			if (StringUtils.equalsIgnoreCase(codingQAWorkItem.getRecordLevel(), "ENC")) {

				if (codingQAEncDxDetails == null) {

					codingQAEncDxDetails = new CodingQAEncDxDetails();
					codingQAEncDxDetails.setCoderEncounterKey(codingQAWorkItem.getCoderEncounterKey());
					codingQAEncDxDetails.setCoderDOSFromDate(codingQAWorkItem.getCoderDOSFromDate() != null
							? dformat.format(codingQAWorkItem.getCoderDOSFromDate()) : null);
					codingQAEncDxDetails.setCoderDOSThruDate(codingQAWorkItem.getCoderDOSThruDate() != null
							? dformat.format(codingQAWorkItem.getCoderDOSThruDate()) : null);
					codingQAEncDxDetails.setCoderPageNum(codingQAWorkItem.getCoderPageNum());
					codingQAEncDxDetails.setCoderProvFirstName(codingQAWorkItem.getCoderProvFirstName());
					codingQAEncDxDetails.setCoderProvLastName(codingQAWorkItem.getCoderProvLastName());
					codingQAEncDxDetails.setCoderProvNPI(codingQAWorkItem.getCoderProvNPI());
					codingQAEncDxDetails.setCoderRetProvFlag(codingQAWorkItem.getCoderRetProvFlag());
					codingQAEncDxDetails.setQaEncounterKey(codingQAWorkItem.getQaEncounterKey());
					codingQAEncDxDetails.setQaDOSFromDate(codingQAWorkItem.getQaDOSFromDate() != null
							? dformat.format(codingQAWorkItem.getQaDOSFromDate()) : null);
					codingQAEncDxDetails.setQaDOSThruDate(codingQAWorkItem.getQaDOSThruDate() != null
							? dformat.format(codingQAWorkItem.getQaDOSThruDate()) : null);
					codingQAEncDxDetails.setQaPageNum(codingQAWorkItem.getQaPageNum());
					codingQAEncDxDetails.setQaProvFirstName(codingQAWorkItem.getQaProvFirstName());
					codingQAEncDxDetails.setQaProvLastName(codingQAWorkItem.getQaProvLastName());
					codingQAEncDxDetails.setQaProvNPI(codingQAWorkItem.getQaProvNPI());
					codingQAEncDxDetails.setQaRetProvFlag(codingQAWorkItem.getQaRetProvFlag());
					codingQAEncDxDetails.setQaEncActionCd(codingQAWorkItem.getQaEncActionCd());
					codingQAEncDxDetails.setCoderEoKeyList(codingQAWorkItem.getCoderEoKeyList());
					codingQAEncDxDetails.setQaEoKeyListResponse(codingQAWorkItem.getQaEoKeyListResponse());
					codingQAEncDxDetails.setQaEncComments(codingQAWorkItem.getQaEncComments());
					codingQAEncDxDetailsList.add(codingQAEncDxDetails);
					codingQAMap.put(codingQAEncDxDetails.getCoderEncounterKey() + ","
							+ codingQAEncDxDetails.getQaEncounterKey(), codingQAEncDxDetails);
					
				}
			} else if (StringUtils.equalsIgnoreCase(codingQAWorkItem.getRecordLevel(), "DX")) {

				CodingQaDxDetails codingQaDxDetails = new CodingQaDxDetails();
				codingQaDxDetails.setCoderEncounterDxKey(codingQAWorkItem.getCoderEncounterDxKey());
				codingQaDxDetails.setCoderEncounterKey(codingQAWorkItem.getCoderEncounterKey());
				codingQaDxDetails.setCoderICDDxCode(codingQAWorkItem.getCoderICDDxCode());
				codingQaDxDetails.setCoderHccModelCatV22(codingQAWorkItem.getCoderHccModelCatV22());
				codingQaDxDetails.setCoderHccModelCatV23(codingQAWorkItem.getCoderHccModelCatV23());
				codingQaDxDetails.setCoderHccModelCatV24(codingQAWorkItem.getCoderHccModelCatV24());
				codingQaDxDetails.setCoderHccModelCatRx(codingQAWorkItem.getCoderHccModelCatRx());
				codingQaDxDetails.setCoderHccModelCatHhs(codingQAWorkItem.getCoderHccModelCatHhs());
				codingQaDxDetails.setCoderDxEoCode(
						new EOCode(codingQAWorkItem.getCoderDxEOKey(), codingQAWorkItem.getCoderDxEODesc()));
				codingQaDxDetails.setCoderIcdDesc(codingQAWorkItem.getCoderIcdDesc());

				codingQaDxDetails.setQaEncounterDXKey(codingQAWorkItem.getQaEncounterDXKey());
				codingQaDxDetails.setQaEncounterKey(codingQAWorkItem.getQaEncounterKey());
				codingQaDxDetails.setQaICDDxCode(codingQAWorkItem.getQaICDDxCode());
				codingQaDxDetails.setQaHccModelCatV22(codingQAWorkItem.getQaHccModelCatV22());
				codingQaDxDetails.setQaHccModelCatV23(codingQAWorkItem.getQaHccModelCatV23());
				codingQaDxDetails.setQaHccModelCatV24(codingQAWorkItem.getQaHccModelCatV24());
				codingQaDxDetails.setQaHccModelCatRx(codingQAWorkItem.getQaHccModelCatRx());
				codingQaDxDetails.setQaHccModelCatHhs(codingQAWorkItem.getQaHccModelCatHhs());
				codingQaDxDetails.setQaDxActionCd(codingQAWorkItem.getQaDxActionCd());
				codingQaDxDetails
						.setQaDxEoCode(new EOCode(codingQAWorkItem.getQaDxEOKey(), codingQAWorkItem.getQaDxEODesc()));
				codingQaDxDetails.setIcdDesc(codingQAWorkItem.getIcdDesc());

				codingQAEncDxDetails.getCodingQaDxDetails().add(codingQaDxDetails);
			}
		}

		return codingQAEncDxDetailsList;
	}

	@Transactional
	public String saveCodingQaResults(CodingQAEncDxWrapper codingQAEncDxWrapper) {
		String status = "";
		try {
			Map<String, Object> inParams = new HashMap<String, Object>();
			inParams.put("P_USER_KEY", codingQAEncDxWrapper.getLoginUserKey());
			inParams.put("P_USERID", codingQAEncDxWrapper.getLoginUserId());
			inParams.put("P_GROUP_KEY", codingQAEncDxWrapper.getGroupKey());
			inParams.put("P_PROJ_KEY", codingQAEncDxWrapper.getProjectKey());
			inParams.put("P_CONTENT_KEY", codingQAEncDxWrapper.getProjContKey());
			inParams.put("P_VEN_KEY", codingQAEncDxWrapper.getBusFuncVenKey());
			inParams.put("P_OBJECT", codingQAEncDxWrapper.getCodingQAEncDxDetailsList().toString());
			status = storedProcedureService.callStoredProc(SAVE_CODING_QA_RESULTS_PROC, inParams, "P_OUT_STATUS");
		} catch (Exception e) {
			status = "ERROR";
			LOG.error("Exception occured while saving results for Coding QA", e);
		}
		return status;
	}

	@Transactional
	public String acceptCodingQaResults(CodingQAAcceptFilter codingQAAcceptFilter) {
		String status = "";
		try {
			Map<String, Object> inParams = new HashMap<String, Object>();
			inParams.put("P_USER_KEY", codingQAAcceptFilter.getLoginUserKey());
			inParams.put("P_USERID", codingQAAcceptFilter.getLoginUserId());
			inParams.put("P_GROUP_KEY", codingQAAcceptFilter.getGroupKey());
			inParams.put("P_PROJ_KEY", codingQAAcceptFilter.getProjectKey());
			inParams.put("P_CONTENT_KEY", codingQAAcceptFilter.getProjContKey());
			inParams.put("P_VEN_KEY", codingQAAcceptFilter.getBusFuncVenKey());
			inParams.put("P_NO_DOS_IND", codingQAAcceptFilter.getDosIndFlag());
			status = storedProcedureService.callStoredProc(ACCEPT_CODING_QA_RESULTS_PROC, inParams, "P_OUT_STATUS");
		} catch (Exception e) {
			status = "ERROR";
			LOG.error("Exception occured while accepting results for Coding QA", e);
		}
		return status;
	}
	
	private String getChartIDStringFromList(List<String> chartIdList) {
		StringBuilder chartIdListStr = new StringBuilder();
		for (int i = 0; i < chartIdList.size(); i++) {
			chartIdListStr.append(chartIdList.get(i));
			if(i < chartIdList.size() -1) {
				chartIdListStr.append(',');
			}
		}
		return chartIdListStr.toString();
	}

}
