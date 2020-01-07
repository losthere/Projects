package com.optum.gcm.sevice;

import static com.optum.gcm.common.util.LoggingUtil.logDebug;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.common.sevice.StoredProcedureService;
import com.optum.gcm.dao.constants.CodingQAQueries;
import com.optum.gcm.model.CodingInventory;
import com.optum.gcm.model.CodingInventoryWrapper;
import com.optum.gcm.model.KeyValue;
import com.optum.gcm.model.SchedulingSearchFilter;

/**
 * @author sgangul1
 */

@Service
public class CodingAssignmentService {

	private static final Logger LOG = LoggerFactory.getLogger(CodingAssignmentService.class);

	private static final String PKG_CODING_ASSIGN = "PKG_COMM_ASSIGNMENT.PRC_ASSIGN";
	private static final String P_USER_KEY = "P_USER_KEY";
	private static final String P_USERID = "P_USERID";
	private static final String P_GROUP_KEY = "P_GROUP_KEY";
	private static final String P_ROLE_CODE = "P_ROLE_CODE";
	private static final String P_VENDOR_KEY = "P_VENDOR_KEY";
	private static final String P_BUSINESS_SEGMENT = "P_BUSINESS_SEGMENT";
	private static final String P_PROJ_KEY = "P_PROJ_KEY";
	private static final String P_CLIENT_KEY = "P_CLIENT_KEY";
	private static final String P_BUSINESS_FUNC_KEY  = "P_BUSINESS_FUNC_KEY";
	private static final String P_HP_KEY = "P_HP_KEY";
	private static final String P_HP_PRODUCT = "P_HP_PRODUCT";
	private static final String P_PROGRAM_KEY = "P_PROGRAM_KEY";
	private static final String P_IS_OFFSHORE = "P_IS_OFFSHORE";
	private static final String P_ASSIGNED_VENDOR_KEY   ="P_ASSIGNED_VENDOR_KEY";
	private static final String P_PROV_SPECIALTY_CODE="P_PROV_SPECIALTY_CODE";
	private static final String P_CHART_SCORE_GROUP="P_CHART_SCORE_GROUP";
	private static final String P_IS_EMR_SW="P_IS_EMR_SW";
	private static final String P_IS_ASSIGNED = "P_IS_ASSIGNED";
	private static final String P_ASSIGNED_USER_KEY = "P_ASSIGNED_USER_KEY";
	private static final String P_ASSIGN_VENDOR_KEY = "P_ASSIGN_VENDOR_KEY";
	private static final String P_ASSIGN_TYPE = "P_ASSIGN_TYPE";
	private static final String P_ASSIGN_COUNT = "P_ASSIGN_COUNT";
	private static final String P_ASSIGN_PER_USER = "P_ASSIGN_PER_USER";
	private static final String P_ASSIGN_IND_USERS = "P_ASSIGN_IND_USERS";
	private static final String P_SEARCH_LIST = "P_SEARCH_LIST";
	private static final String P_OUT_STATUS = "P_OUT_STATUS";
	private static final String P_PROJECT_YEAR = "P_PROJECT_YEAR";
	private static final String P_CODING_USER_KEY ="P_CODER_USER_KEY";
	private static final String   P_DATE_FROM  ="P_DATE_FROM"  ;        
	private static final String   P_DATE_TO  = "P_DATE_TO"    ;         
	private static final String  P_PERCENTAGE ="P_PERCENTAGE";

	private StoredProcedureService storedProcedureService;

	@Autowired
	public CodingAssignmentService(StoredProcedureService storedProcedureService) {
		this.storedProcedureService = storedProcedureService;
	}

	@Autowired
	private CommonJpaService commonJpaService;

	public String assignInventoryforCoding(CodingInventoryWrapper codingInventoryWrapper) {

		String status = null;
		SchedulingSearchFilter searchFilter = codingInventoryWrapper.getSearchFilter();

		try {
			Map<String, Object> inParams = new HashMap<String, Object>();
			inParams.put(P_USER_KEY, searchFilter.getLoginUserKey());
			inParams.put(P_USERID, searchFilter.getLoginUserId());
			inParams.put(P_VENDOR_KEY, searchFilter.getVendorKey());
			inParams.put(P_GROUP_KEY, searchFilter.getGroupKey());
			inParams.put(P_ROLE_CODE, searchFilter.getRoleCode());
			inParams.put(P_BUSINESS_FUNC_KEY, searchFilter.getBusFuncKey());
			inParams.put(P_BUSINESS_SEGMENT, searchFilter.getBusSegment());
			inParams.put(P_PROJ_KEY, searchFilter.getProjectKey());
			inParams.put(P_PROJECT_YEAR, searchFilter.getProjYear());
			inParams.put(P_CLIENT_KEY, searchFilter.getClientKey());
			inParams.put(P_HP_KEY, searchFilter.getHpKey());
			inParams.put(P_HP_PRODUCT, searchFilter.getHpProduct());
			inParams.put(P_PROGRAM_KEY, searchFilter.getProgramKey());
			inParams.put(P_ASSIGNED_VENDOR_KEY, searchFilter.getFromVendorKey());
			inParams.put(P_ASSIGN_VENDOR_KEY, codingInventoryWrapper.getAssignVendorKey());			
			inParams.put(P_PROV_SPECIALTY_CODE, searchFilter.getProvSplCode());
			inParams.put(P_IS_EMR_SW, searchFilter.getEmr());
			inParams.put(P_CHART_SCORE_GROUP, searchFilter.getChartScoreGrp());
			inParams.put(P_CODING_USER_KEY, searchFilter.getCodingUserKey());
			
			if (null != searchFilter.getAcceptedFromDate() && !"".equals(searchFilter.getAcceptedFromDate()) &&StringUtils.isNotBlank(searchFilter.getAcceptedFromDate())) {
				try {
					Date date1 = new SimpleDateFormat("MM-dd-yyyy", Locale.ENGLISH).parse(searchFilter.getAcceptedFromDate());
					java.sql.Timestamp timestampdate1 = new java.sql.Timestamp(date1.getTime());
					inParams.put(P_DATE_FROM, timestampdate1);
				}catch(ParseException pe) {
					LOG.error("Exception during parsin in Coding Assignment", pe);
					inParams.put(P_DATE_FROM, null);
				}
			}else {
				inParams.put(P_DATE_FROM, null);
			}
			
			if (null != searchFilter.getAcceptedToDate() && !"".equals(searchFilter.getAcceptedToDate()) && StringUtils.isNotBlank(searchFilter.getAcceptedToDate())) {
				try {
					Date date1 = new SimpleDateFormat("MM-dd-yyyy", Locale.ENGLISH).parse(searchFilter.getAcceptedToDate());
					java.sql.Timestamp timestampdate1 = new java.sql.Timestamp(date1.getTime());
					inParams.put(P_DATE_TO, timestampdate1);
				}catch(ParseException pe) {
					LOG.error("Exception during parsin in Coding Assignment", pe);
					inParams.put(P_DATE_TO, null);
				}
				
			}else {
				inParams.put(P_DATE_TO, null);
			}
			inParams.put(P_PERCENTAGE, searchFilter.getPercentage());
			inParams.put(P_IS_OFFSHORE, null != searchFilter.getIsOffshoreCoding() ? searchFilter.getIsOffshoreCoding() : 0L );
			inParams.put(P_IS_ASSIGNED, searchFilter.getIsAssigned());
			inParams.put(P_ASSIGNED_USER_KEY, searchFilter.getFromUserKey());
			inParams.put(P_ASSIGN_COUNT, codingInventoryWrapper.getAssignCount());
			inParams.put(P_ASSIGN_TYPE, codingInventoryWrapper.getAssignType());
			inParams.put(P_ASSIGN_PER_USER, codingInventoryWrapper.getAssignPerUserCount());
			
			if (codingInventoryWrapper.getAssignIndUsers() != null){
				inParams.put(P_ASSIGN_IND_USERS, getUserAsClob(codingInventoryWrapper.getAssignIndUsers()));
			}
			else {
				inParams.put(P_ASSIGN_IND_USERS, null);
			}
			//inParams.put(P_CODING_LIST, getInventoryAsClob(codingInventoryWrapper.getCodingInventoryList()));
			inParams.put(P_SEARCH_LIST, getInventoryAsClob(codingInventoryWrapper.getCodingInventoryList()));
			status = storedProcedureService.callStoredProc(PKG_CODING_ASSIGN, inParams, P_OUT_STATUS);
			
		} catch (Exception e) {
			LOG.error("Exception during Coding Assignment :", e);
		}

		return status;
	}

	@Transactional
	public String inventoryAssignmentforOptum(CodingInventoryWrapper codingInventoryWrapper) {

		String status = null;
		SchedulingSearchFilter searchFilter = codingInventoryWrapper.getSearchFilter();

		try {
			Map<String, Object> inParams = new HashMap<String, Object>();
			inParams.put(P_USER_KEY, searchFilter.getLoginUserKey());
			inParams.put(P_USERID, searchFilter.getLoginUserId());
			inParams.put(P_VENDOR_KEY, searchFilter.getVendorKey());
			inParams.put(P_GROUP_KEY, searchFilter.getGroupKey());
			inParams.put(P_ROLE_CODE, searchFilter.getRoleCode());
			inParams.put(P_BUSINESS_FUNC_KEY, searchFilter.getBusFuncKey());
			inParams.put(P_BUSINESS_SEGMENT, searchFilter.getBusSegment());
			inParams.put(P_PROJ_KEY, searchFilter.getProjectKey());
			inParams.put(P_PROJECT_YEAR, searchFilter.getProjYear());
			inParams.put(P_CLIENT_KEY, searchFilter.getClientKey());
			inParams.put(P_HP_KEY, searchFilter.getHpKey());
			inParams.put(P_HP_PRODUCT, searchFilter.getHpProduct());
			inParams.put(P_PROGRAM_KEY, searchFilter.getProgramKey());
			inParams.put(P_ASSIGNED_VENDOR_KEY, searchFilter.getFromVendorKey());
			inParams.put(P_ASSIGN_VENDOR_KEY, codingInventoryWrapper.getAssignVendorKey());			
			inParams.put(P_PROV_SPECIALTY_CODE, searchFilter.getProvSplCode());
			inParams.put(P_IS_EMR_SW, searchFilter.getEmr());
			inParams.put(P_CHART_SCORE_GROUP, searchFilter.getChartScoreGrp());
			inParams.put(P_CODING_USER_KEY, searchFilter.getCodingUserKey());
			
			if (null != searchFilter.getAcceptedFromDate() && !"".equals(searchFilter.getAcceptedFromDate()) &&StringUtils.isNotBlank(searchFilter.getAcceptedFromDate())) {
				try {
					Date date1 = new SimpleDateFormat("MM-dd-yyyy", Locale.ENGLISH).parse(searchFilter.getAcceptedFromDate());
					java.sql.Timestamp timestampdate1 = new java.sql.Timestamp(date1.getTime());
					inParams.put(P_DATE_FROM, timestampdate1);
				}catch(ParseException pe) {
					LOG.error("Exception during parsing in Coding Assignment", pe);
					inParams.put(P_DATE_FROM, null);
				}
			}else {
				inParams.put(P_DATE_FROM, null);
			}
			
			if (null != searchFilter.getAcceptedToDate() && !"".equals(searchFilter.getAcceptedToDate()) && StringUtils.isNotBlank(searchFilter.getAcceptedToDate())) {
				try {
					Date date1 = new SimpleDateFormat("MM-dd-yyyy", Locale.ENGLISH).parse(searchFilter.getAcceptedToDate());
					java.sql.Timestamp timestampdate1 = new java.sql.Timestamp(date1.getTime());
					inParams.put(P_DATE_TO, timestampdate1);
				}catch(ParseException pe) {
					LOG.error("Exception during parsing in Coding Assignment", pe);
					inParams.put(P_DATE_TO, null);
				}
				
			}else {
				inParams.put(P_DATE_TO, null);
			}
			inParams.put(P_PERCENTAGE, searchFilter.getPercentage());
			inParams.put(P_IS_OFFSHORE, null != searchFilter.getIsOffshoreCoding() ? searchFilter.getIsOffshoreCoding() : 0L );
			inParams.put(P_IS_ASSIGNED, searchFilter.getIsAssigned());
			inParams.put(P_ASSIGNED_USER_KEY, searchFilter.getFromUserKey());
			inParams.put(P_ASSIGN_TYPE, codingInventoryWrapper.getAssignType());
			inParams.put(P_ASSIGN_COUNT, codingInventoryWrapper.getAssignCount());
			inParams.put(P_ASSIGN_PER_USER, codingInventoryWrapper.getAssignPerUserCount());
			if (codingInventoryWrapper.getAssignIndUsers() != null) {
				inParams.put(P_ASSIGN_IND_USERS, getUserAsClob(codingInventoryWrapper.getAssignIndUsers()));
			}
			else {
				inParams.put(P_ASSIGN_IND_USERS, null);
			}
			inParams.put(P_SEARCH_LIST, getInventoryAsClob(codingInventoryWrapper.getCodingInventoryList()));
			logDebug(LOG, true, "Input Parameters :: {}", inParams);
			status = storedProcedureService.callStoredProc(PKG_CODING_ASSIGN, inParams, P_OUT_STATUS);
		} catch (Exception e) {
			LOG.error("Exception during Optum Coding Assignment", e);
		}

		return status;
	}
	
	private String getInventoryAsClob(List<CodingInventory> codingInventoryList){
		StringBuilder clobString = new StringBuilder();
		for (CodingInventory codingInventory : codingInventoryList) {
			clobString.append(codingInventory.getProgramKey()).append("|")
					  .append(codingInventory.getClientKey()).append("|")
					  .append(codingInventory.getHpKey()).append("|")
					  .append(codingInventory.getHpProduct()).append("|")
					  .append(StringUtils.defaultString(codingInventory.getCodingInstruction())).append("|")
					  .append(null != codingInventory.getProvGrpNm() ? codingInventory.getProvGrpNm().concat("|") : "|" )
					  .append((null != codingInventory.getPageCount() ? codingInventory.getPageCount() : 0)).append( "|")
					  .append((null != codingInventory.getRecCount() ? codingInventory.getRecCount() : "")).append("|")
					  .append(codingInventory.getCntTotal()).append("\n");
		}
		logDebug(LOG, true, "Coding Inventory Clob - {}", clobString);
		return clobString.toString();
	}

	private String getUserAsClob(List<KeyValue<Long, Long>> assignIndUsers) throws SQLException {

		StringBuilder clobString = new StringBuilder();
		for (KeyValue<Long, Long> assignIndUser : assignIndUsers) {
			clobString.append(assignIndUser.getKey()).append("|").append(assignIndUser.getValue()).append("\n");
		}
		logDebug(LOG, true, "Indivudual User Assignation Clob - {} ", clobString);
		return clobString.toString();
	}
	
	
	public List<KeyValue<String, String>> getAssignableVendorsForOptumInventory(CodingInventoryWrapper vendorSearchInp)  {
		String queryString = CodingQAQueries.FUNC_OPTUM_CODING_ASSIGN_VENDOR_SEARCH;
		
		SchedulingSearchFilter searchFilter = vendorSearchInp.getSearchFilter();
		List<CodingInventory> codingInventoryList = vendorSearchInp.getCodingInventoryList();
		
		Map<String, Object> params = new HashMap<>();
		if(searchFilter!=null) {
			params.put("userKey", searchFilter.getLoginUserKey());
			params.put("userId", searchFilter.getLoginUserId());
			params.put("groupKey", searchFilter.getGroupKey());
			params.put("roleCode", searchFilter.getRoleCode());
			params.put("busFuncKey",searchFilter.getBusFuncKey() );
			params.put("busSegment", searchFilter.getBusSegment());
			params.put("programKey", searchFilter.getProgramKey());
			params.put("projYear", searchFilter.getProjYear());
			params.put("projKey", searchFilter.getProjectKey());
			params.put("clientKey", searchFilter.getClientKey());
			params.put("hpKey", searchFilter.getHpKey());
			params.put("hpProduct", searchFilter.getHpProduct());
			params.put("chartScoreGrp", searchFilter.getChartScoreGrp());
			params.put("provSplCode", searchFilter.getProvSplCode());
			params.put("emr", searchFilter.getEmr());
			params.put("codingUserKey", searchFilter.getCodingUserKey());
			params.put("fromDate", searchFilter.getAcceptedFromDate());
			params.put("toDate", searchFilter.getAcceptedToDate());
			params.put("percentage", searchFilter.getPercentage());
			params.put("isOffshoreCoding", searchFilter.getIsOffshoreCoding());
			params.put("fromVendorKey", searchFilter.getFromVendorKey());
			params.put("isAssigned", searchFilter.getIsAssigned());
			params.put("assignedUserKey", searchFilter.getFromUserKey());
			params.put("searchList", getInventoryAsClob(codingInventoryList));
		}		
		return commonJpaService.getKeyKeyValueResults(queryString, params,
				String.class);
	}

}
