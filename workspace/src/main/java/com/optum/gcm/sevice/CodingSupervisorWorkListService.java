package com.optum.gcm.sevice;

import static com.optum.gcm.dao.constants.CodingSupervisorWorkListQueries.QUERY_GET_CODINGSUP_MYWORKLIST;
import static com.optum.gcm.dao.constants.CodingSupervisorWorkListQueries.QUERY_GET_CODINGSUP_UNASSIGNED_INVENTORY;
import static com.optum.gcm.dao.constants.CodingSupervisorWorkListQueries.QUERY_INSERT_CODER_PRODUCTIVITY_FORSUP;
import static com.optum.gcm.dao.constants.CodingSupervisorWorkListQueries.QUERY_INSERT_CODER_PRODUCTIVITY;
import static com.optum.gcm.dao.constants.CodingSupervisorWorkListQueries.QUERY_UPDATE_CODINGSUP_RELEASETOASSIGN;
import static com.optum.gcm.dao.constants.CodingSupervisorWorkListQueries.QUERY_UPDATE_CODINGSUP_RELEASETOAVAILABLEITEMS;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.common.util.QueryBuilderUtil;
import com.optum.gcm.model.CodingSupervisorMyWorkListInfo;
import com.optum.gcm.model.CodingSupervisorWorkListInfo;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.StatusUpdateInfo;

/**
 * @author pmule
 *
 */

@Service
public class CodingSupervisorWorkListService {

private static final Logger LOG = LoggerFactory.getLogger(CodingSupervisorWorkListService.class);
	
	@Autowired
	private CommonJpaService commonJpaService;
	
	public List<CodingSupervisorWorkListInfo> getUnassignedCodingSupervisorWorkList(SchedulingSearchFilter searchFilter ) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		String where ="";
		String queryString = "";
		String workListType = "";
		
		
		/*if (searchFilter != null ) {
			LOG.debug("getUnassignedCodingSupervisorWorkList started with search filter: " + searchFilter.toString());
			where = QueryBuilderUtil.getWhereClauseforCoding(searchFilter,  params);
		}*/
		
		/*if (searchFilter != null && StringUtils.isNotBlank(searchFilter.getIsAssigned()) ){
			 if (searchFilter.getIsAssigned().equalsIgnoreCase("1") ) {
				 //where += " AND V.GCM_USER_KEY IS NOT NULL AND GCM_BUS_FUNC_STATUS IN ('ASSIGNED','INPROGRESS') ";
				 workListType = "AVAILABLE";
				 
			 } else if (searchFilter.getIsAssigned().equalsIgnoreCase("0") ) {
				 //where += " AND V.GCM_USER_KEY IS NULL AND GCM_BUS_FUNC_STATUS IN ('CREATED') ";
				 workListType = "AVAILABLE";
			 } else {
				 //where += " AND GCM_BUS_FUNC_STATUS NOT IN ('COMPLETED','REJECTED', 'CANCELED') ";
				 workListType = "COMPLETED";
			 }
			
		}*/
		params.put("workListType","AVAILABLE");
		/*if (searchFilter != null && null != searchFilter.getFromUserKey() && searchFilter.getFromUserKey() > 0 ) {
			 //where += " AND GCM_USER_KEY = :GCM_USER_KEY ";
			params.put("assignedUserKey",searchFilter.getFromUserKey());
		}else {
			params.put("assignedUserKey", );
		}*/
		params.put("assignedUserKey",searchFilter.getFromUserKey());
		String status = "";
		if(searchFilter != null) {
			params.put("userKey", searchFilter.getLoginUserKey());
			params.put("userId", searchFilter.getLoginUserId());
			params.put("groupKey", searchFilter.getGroupKey());
			params.put("roleCode", searchFilter.getRoleCode());
			params.put("busFuncKey",searchFilter.getBusFuncKey() );
			params.put("busSegment", searchFilter.getBusSegment());
			params.put("programKey", searchFilter.getProgramKey());
			params.put("projKey", searchFilter.getProjectKey());
			params.put("clientKey", searchFilter.getClientKey());
			params.put("hpKey", searchFilter.getHpKey());
			params.put("hpProduct", searchFilter.getHpProduct());
			params.put("fromDate", null);
			params.put("toDate", null);
			params.put("busFuncStatus", "");
			params.put("isAssigned", searchFilter.getIsAssigned());
			params.put("vendorKey", searchFilter.getVendorKey());
			params.put("chartId", searchFilter.getChartId());
		}
		queryString = QUERY_GET_CODINGSUP_UNASSIGNED_INVENTORY;
	
		return commonJpaService.getResultList(queryString, params,CodingSupervisorWorkListInfo.class);
		
	}
	
	public Long codingSupervisorAddToMyWorkList(StatusUpdateInfo statusUpdateInfo ) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		List<String> chartIdsList = statusUpdateInfo.getChartIdList();
		String queryString = null;
		String where ="";
		params.put("GCM_LOGIN_USER_KEY", statusUpdateInfo.getLoginUserKey());
		params.put("GCM_BUSINESS_FUNC_KEY", statusUpdateInfo.getBusFunction());
		params.put("MODIFY_USERID", statusUpdateInfo.getRequestedUserId());
		//params.put("CHARTIDS", statusUpdateInfo.getChartIdList());
		if(null != chartIdsList && chartIdsList.size() > 1) {
			params.put("CHARTIDS", getChartIDStringFromList(chartIdsList));
		}
		else {
			params.put("CHARTIDS", chartIdsList);
		}
		
		//queryString = QUERY_UPDATE_CODINGSUP_RELEASETOASSIGN;
		if (statusUpdateInfo != null &&  null != statusUpdateInfo.getFromUserKey() && statusUpdateInfo.getFromUserKey() > 0 ) {
			LOG.info("CHARTIDS: " + statusUpdateInfo.getChartIdList());
			 where += " AND GCM_USER_KEY = :GCM_USER_KEY " ;
			 params.put("GCM_USER_KEY",statusUpdateInfo.getFromUserKey());
		} else {
			 where += " AND GCM_USER_KEY IS NULL" ;
		}
		
		params.put("EVENT", "ASSIGNED");
		String coderQueryString = QUERY_INSERT_CODER_PRODUCTIVITY ;
		commonJpaService.update(coderQueryString, params);
		
		queryString = QUERY_UPDATE_CODINGSUP_RELEASETOASSIGN.replace("#WHERE#", where);
		return (long)  commonJpaService.update(queryString, params);
		
	}
	
	public List<CodingSupervisorMyWorkListInfo> getCodingSupervisorMyWorkList(SchedulingSearchFilter searchFilter ) throws SQLException {
		/*Map<String, Object> params = new HashMap<>();
		String where ="";
		String queryString = "";
		
		if (searchFilter != null ) {
			LOG.debug("codingSupervisorAddToMyWorkList started with search filter: " + searchFilter.toString());
			where = QueryBuilderUtil.getWhereClauseforCoding( searchFilter,  params);
		}
		
		if (searchFilter != null && StringUtils.isNotBlank(searchFilter.getIsAssigned())) {

			if(searchFilter.getIsAssigned().equalsIgnoreCase("2")) {
				where += " AND GCM_BUS_FUNC_STATUS = 'INPROGRESS'";
			}else if(searchFilter.getIsAssigned().equalsIgnoreCase("1")) {
				where += " AND GCM_BUS_FUNC_STATUS = 'ASSIGNED'";
			}else {
				where += " AND GCM_BUS_FUNC_STATUS NOT IN ('COMPLETED','REJECTED') ";
			}
		} 
		
		if (searchFilter != null && StringUtils.isNotBlank(searchFilter.getIsCompleted()) 
				&& searchFilter.getIsCompleted().equalsIgnoreCase("1") ) {
			where += " AND GCM_BUS_FUNC_STATUS IN ( 'COMPLETED','REJECTED') ";
		}
		
		if (searchFilter != null && searchFilter.getAcceptedFromDate() != null && searchFilter.getAcceptedToDate() != null) {
			where += " AND TRUNC(GCM_BUS_FUNC_STATUS_DT) BETWEEN TO_DATE(:FROMDATE,'MM/DD/YY')  AND  TO_DATE(:TODATE,'MM/DD/YY') ";
			params.put("FROMDATE", searchFilter.getAcceptedFromDate() );
			params.put("TODATE", searchFilter.getAcceptedToDate() );
			
		} else {
			where += " AND TRUNC(GCM_BUS_FUNC_STATUS_DT) BETWEEN TRUNC(SYSDATE) - 30 AND TRUNC(SYSDATE) ";
		}
		
		if (null != searchFilter) {
			params.put("GCM_LOGIN_USER_KEY",searchFilter.getLoginUserKey());
			params.put("GCM_BUSINESS_FUNC_KEY", searchFilter.getBusFuncKey());
		}
		queryString = QUERY_GET_CODINGSUP_MYWORKLIST.replace("#WHERE#", where);*/
		
		
		Map<String, Object> params = new HashMap<>();
		String where ="";
		String queryString = "";
		String workListType = "";
		
		
		/*if (searchFilter != null ) {
			LOG.debug("getUnassignedCodingSupervisorWorkList started with search filter: " + searchFilter.toString());
			where = QueryBuilderUtil.getWhereClauseforCoding(searchFilter,  params);
		}*/
		
		if (searchFilter != null && StringUtils.isNotBlank(searchFilter.getIsAssigned()) ){
			 if (searchFilter.getIsAssigned().equalsIgnoreCase("1") &&  !searchFilter.getIsCompleted().equalsIgnoreCase("COMPLETED")  ) {
				 //where += " AND V.GCM_USER_KEY IS NOT NULL AND GCM_BUS_FUNC_STATUS IN ('ASSIGNED','INPROGRESS') ";
				 workListType = "WORKLIST";
				 
			 } else if (searchFilter.getIsAssigned().equalsIgnoreCase("0") ) {
				 //where += " AND V.GCM_USER_KEY IS NULL AND GCM_BUS_FUNC_STATUS IN ('CREATED') ";
				 workListType = "AVAILABLE";
			 } else {
				 //where += " AND GCM_BUS_FUNC_STATUS NOT IN ('COMPLETED','REJECTED', 'CANCELED') ";
				 workListType = "COMPLETED";
			 }
		}
		
		if (searchFilter != null && StringUtils.isNotBlank(searchFilter.getIsCompleted()) 
				&& searchFilter.getIsCompleted().equalsIgnoreCase("1") ) {
			workListType = "COMPLETED";
		}
		params.put("workListType",workListType);
		if (searchFilter != null && null != searchFilter.getFromUserKey() && searchFilter.getFromUserKey() > 0 ) {
			 //where += " AND GCM_USER_KEY = :GCM_USER_KEY ";
			params.put("assignedUserKey",searchFilter.getFromUserKey());
		}else {
			params.put("assignedUserKey", "");
		}
		String status = "";
		if(searchFilter != null) {
			params.put("userKey", searchFilter.getLoginUserKey());
			params.put("userId", searchFilter.getLoginUserId());
			params.put("groupKey", searchFilter.getGroupKey());
			params.put("roleCode", searchFilter.getRoleCode());
			params.put("busFuncKey",searchFilter.getBusFuncKey() );
			params.put("busSegment", searchFilter.getBusSegment());
			params.put("programKey", searchFilter.getProgramKey());
			params.put("projKey", searchFilter.getProjectKey());
			params.put("clientKey", searchFilter.getClientKey());
			params.put("hpKey", searchFilter.getHpKey());
			params.put("hpProduct", searchFilter.getHpProduct());
			if (null != searchFilter.getAcceptedFromDate() && !"".equals(searchFilter.getAcceptedFromDate()) &&StringUtils.isNotBlank(searchFilter.getAcceptedFromDate())) {
				try {
					Date date1 = new SimpleDateFormat("MM-dd-yyyy").parse(searchFilter.getAcceptedFromDate());
					java.sql.Timestamp timestampdate1 = new java.sql.Timestamp(date1.getTime());
					params.put("fromDate", timestampdate1);
				}catch(ParseException pe) {
					LOG.error("Exception during CodingSupervisorWorkListService", pe);
					params.put("fromDate", null);
				}
			}else {
				params.put("fromDate", null);
			}
			
			if (null != searchFilter.getAcceptedToDate() && !"".equals(searchFilter.getAcceptedToDate()) && StringUtils.isNotBlank(searchFilter.getAcceptedToDate())) {
				try {
					Date date1 = new SimpleDateFormat("MM-dd-yyyy").parse(searchFilter.getAcceptedToDate());
					java.sql.Timestamp timestampdate1 = new java.sql.Timestamp(date1.getTime());
					params.put("toDate", timestampdate1);
				}catch(ParseException pe) {
					LOG.error("Exception during CodingSupervisorWorkListService", pe);
					params.put("toDate", null);
				}
				
			}else {
				params.put("toDate", null);
			}
			
			if (searchFilter != null && StringUtils.isNotBlank(searchFilter.getIsAssigned()) 
					&& searchFilter.getIsAssigned().equalsIgnoreCase("1") ) {
				
				if (StringUtils.isNotBlank(searchFilter.getStatus()) && searchFilter.getStatus().equalsIgnoreCase("1") ) {
					status = "ASSIGNED";
				}
				else if (StringUtils.isNotBlank(searchFilter.getStatus()) && searchFilter.getStatus().equalsIgnoreCase("2") ) {
					status = "INPROGRESS";
				}
			}else if (searchFilter != null && StringUtils.isNotBlank(searchFilter.getIsAssigned()) 
					&& searchFilter.getIsAssigned().equalsIgnoreCase("0") )  {
				status = "CREATED";
			}
			
			params.put("busFuncStatus", status);
			params.put("isAssigned", searchFilter.getIsAssigned());
			params.put("vendorKey", searchFilter.getVendorKey());
			params.put("chartId", searchFilter.getChartId());
		}
		queryString = QUERY_GET_CODINGSUP_UNASSIGNED_INVENTORY;
		LOG.info("SUPERVISOR WORK LIST QUERY: " + queryString);
		return commonJpaService.getResultList(queryString, params,CodingSupervisorMyWorkListInfo.class);
		
	}
	
	public Long releaseToAvailableItemsForCodingSupervisor(StatusUpdateInfo statusUpdateInfo ) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		List<String> chartIdsList = statusUpdateInfo.getChartIdList();
		String queryString = null;
		params.put("GCM_LOGIN_USER_KEY", statusUpdateInfo.getLoginUserKey());
		params.put("GCM_BUSINESS_FUNC_KEY", statusUpdateInfo.getBusFunction());
		params.put("MODIFY_USERID", statusUpdateInfo.getRequestedUserId());
		if(null != chartIdsList && chartIdsList.size() > 1) {
			params.put("CHARTIDS", getChartIDStringFromList(chartIdsList));
		}
		else {
			params.put("CHARTIDS", chartIdsList);
		}
		// make close entry in coder Productivity table when sup releases the workitem to que when it is in inprogress status
				String coderQueryString = QUERY_INSERT_CODER_PRODUCTIVITY_FORSUP ;
				commonJpaService.update(coderQueryString, params);
				
		queryString = QUERY_UPDATE_CODINGSUP_RELEASETOAVAILABLEITEMS;
		LOG.info("CHARTIDS: " + statusUpdateInfo.getChartIdList());
		return (long) commonJpaService.update(queryString, params);
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
