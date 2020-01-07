package com.optum.gcm.sevice;

import static com.optum.gcm.dao.constants.CodingWorkListQueries.QUERY_GET_CODING_WORKLIST;
import static com.optum.gcm.dao.constants.CodingWorkListQueries.QUERY_UPDATE_CODING_RELEASETOASSIGN;
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
import com.optum.gcm.common.sevice.StoredProcedureService;
import com.optum.gcm.common.util.QueryBuilderUtil;
import com.optum.gcm.model.CodingWorkListInfo;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.StatusUpdateInfo;

/**
 * @author pmule
 *
 */

@Service
public class CodingWorkListService {
	
	private static final Logger LOG = LoggerFactory.getLogger(CodingWorkListService.class);
	
	@Autowired
	private CommonJpaService commonJpaService;
	
	@Autowired
	private StoredProcedureService storedProcedureService;
	
	public List<CodingWorkListInfo> getMyCodingWorklist(SchedulingSearchFilter searchFilter ) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		String where ="";
		String queryString = null;
		/*if (searchFilter != null ) {
			LOG.debug("getMyCodingWorklist started with search filter: " + searchFilter.toString());
			where = QueryBuilderUtil.getWhereClauseforCoding( searchFilter,  params);
		}
		
		if (searchFilter != null && StringUtils.isNotBlank(searchFilter.getIsAssigned()) 
				&& searchFilter.getIsAssigned().equalsIgnoreCase("1") ) {
			
			if (StringUtils.isNotBlank(searchFilter.getStatus()) && searchFilter.getStatus().equalsIgnoreCase("1") ) {
				where += " AND GCM_BUS_FUNC_STATUS IN ('ASSIGNED')";
			}
			else if (StringUtils.isNotBlank(searchFilter.getStatus()) && searchFilter.getStatus().equalsIgnoreCase("2") ) {
				where += " AND GCM_BUS_FUNC_STATUS IN ('INPROGRESS') ";
			} 
			else {
				where += " AND GCM_BUS_FUNC_STATUS NOT IN  ('COMPLETED', 'ESCALATED', 'REJECTED', 'CANCELED') ";
			}
		}
		
		if (searchFilter != null && StringUtils.isNotBlank(searchFilter.getStatus()) 
				&& searchFilter.getStatus().equalsIgnoreCase("1") ) {
			where += " AND GCM_BUS_FUNC_STATUS NOT IN  ('COMPLETED', 'ESCALATED', 'REJECTED', 'CANCELED') ";
		}
		
		if (searchFilter != null && StringUtils.isNotBlank(searchFilter.getIsCompleted()) 
				&& searchFilter.getIsCompleted().equalsIgnoreCase("1") ) {
			where += " AND GCM_BUS_FUNC_STATUS IN ( 'COMPLETED','REJECTED', 'CANCELED') ";
			if (searchFilter.getAcceptedFromDate() != null && searchFilter.getAcceptedToDate() != null) {
				where += " AND TRUNC(GCM_BUS_FUNC_STATUS_DT) BETWEEN TO_DATE(:FROMDATE,'MM/DD/YY')  AND  TO_DATE(:TODATE,'MM/DD/YY') ";
				params.put("FROMDATE", searchFilter.getAcceptedFromDate() );
				params.put("TODATE", searchFilter.getAcceptedToDate() );
				
			} else {
				where += " AND TRUNC(GCM_BUS_FUNC_STATUS_DT) BETWEEN TRUNC(SYSDATE) - 30 AND TRUNC(SYSDATE) ";
			}
		}
		
		if(searchFilter != null) {
			params.put("GCM_USER_KEY", searchFilter.getFromUserKey());
			params.put("GCM_BUSINESS_FUNC_KEY", searchFilter.getBusFuncKey());
		}*/
		
		String status = ""; 
		
		if(searchFilter!=null) {
			
			if (searchFilter != null && StringUtils.isNotBlank(searchFilter.getIsAssigned()) 
					&& searchFilter.getIsAssigned().equalsIgnoreCase("1") ) {
				
				if (StringUtils.isNotBlank(searchFilter.getStatus()) && searchFilter.getStatus().equalsIgnoreCase("1") ) {
					status = "ASSIGNED";
				}
				else if (StringUtils.isNotBlank(searchFilter.getStatus()) && searchFilter.getStatus().equalsIgnoreCase("2") ) {
					status = "INPROGRESS";
				}
			}
			
			if (searchFilter != null && StringUtils.isNotBlank(searchFilter.getStatus()) 
					&& searchFilter.getStatus().equalsIgnoreCase("1") ) {
				where += " AND GCM_BUS_FUNC_STATUS NOT IN  ('COMPLETED', 'ESCALATED', 'REJECTED', 'CANCELED') ";
			}
			
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
			/*params.put("fromDate", searchFilter.getAcceptedFromDate());
			params.put("toDate", searchFilter.getAcceptedToDate());*/
			
			if (null != searchFilter.getAcceptedFromDate() && !"".equals(searchFilter.getAcceptedFromDate()) &&StringUtils.isNotBlank(searchFilter.getAcceptedFromDate())) {
				try {
					Date date1 = new SimpleDateFormat("MM-dd-yyyy").parse(searchFilter.getAcceptedFromDate());
					java.sql.Timestamp timestampdate1 = new java.sql.Timestamp(date1.getTime());
					params.put("fromDate", timestampdate1);
				}catch(ParseException pe) {
					LOG.error("Exception occured with CodingWorkListService ", pe);
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
					LOG.error("Exception occured with CodingWorkListService ", pe);
					params.put("toDate", null);
				}
				
			}else {
				params.put("toDate", null);
			}
			params.put("busFuncStatus", status);
			params.put("vendorKey", searchFilter.getVendorKey());
			params.put("chartId", searchFilter.getChartId());
			params.put("workListType", searchFilter.getIsCompleted());
		}
		queryString = QUERY_GET_CODING_WORKLIST;
	
		return commonJpaService.getResultList(queryString, params,CodingWorkListInfo.class);
	}

	public String codingReleasetoAssingment(StatusUpdateInfo statusUpdateInfo ) throws SQLException {
		Map<String, Object> params = new HashMap<>();
	    String P_OUT_STATUS = "P_OUT_STATUS";
	    StringBuffer chartIdList = new StringBuffer("");
	    for (int i = 0; statusUpdateInfo.getChartIdList() != null && i < statusUpdateInfo.getChartIdList().size(); i++) {
	    	chartIdList.append(statusUpdateInfo.getChartIdList().get(i));
	        if (i < statusUpdateInfo.getChartIdList().size() - 1) {
	        	chartIdList.append(',');
	        }
	    }
		params.put("p_barcodes",chartIdList.toString());
		params.put("p_user_key", statusUpdateInfo.getLoginUserKey());
		params.put("p_userid", statusUpdateInfo.getRequestedUserId());
		params.put("p_business_func_key", statusUpdateInfo.getBusFunction());
		LOG.info("p_barcodes:" + chartIdList.toString());
		return storedProcedureService.callStoredProc(QUERY_UPDATE_CODING_RELEASETOASSIGN, params, P_OUT_STATUS);
	}
	
	
	
}
