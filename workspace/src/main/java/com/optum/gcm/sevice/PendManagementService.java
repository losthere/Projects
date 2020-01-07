package com.optum.gcm.sevice;

import static com.optum.gcm.common.util.LoggingUtil.logInfo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.common.util.QueryBuilderUtil;
import com.optum.gcm.dao.constants.PendManagementQueries;
import com.optum.gcm.model.PendWorkListViewInfo;
import com.optum.gcm.model.SchedulingSearchFilter;

/**
 * @author pmule
 *
 */

@Service
public class PendManagementService {

	private static final Logger LOG = LoggerFactory.getLogger(PendManagementService.class);
	@Autowired
	private CommonJpaService commonJpaService;

	public List<PendWorkListViewInfo> getUnassignedInventoryforPendMgmt(SchedulingSearchFilter schedulingSearchFilter) {
		Map<String, Object> params = new HashMap<String, Object>();
		String where = "";
		String queryString = "";
		
		if (schedulingSearchFilter != null ) {
			LOG.debug("Search Creteria: " + schedulingSearchFilter.toString());
			where = QueryBuilderUtil.getWhereClause( schedulingSearchFilter,  params);
		}
		
		if ((schedulingSearchFilter != null && StringUtils.isNotBlank(schedulingSearchFilter.getIsAssigned()) && schedulingSearchFilter.getIsAssigned().trim()
				.equalsIgnoreCase("1")) && schedulingSearchFilter.getFromUserKey()!=0) {
			 where += " AND RA.GCM_PEND_MGR_USER_KEY = :GCM_PEND_MGR_USER_KEY ";
			 params.put("GCM_PEND_MGR_USER_KEY", schedulingSearchFilter.getFromUserKey());
		} else if (schedulingSearchFilter != null && StringUtils.isNotBlank(schedulingSearchFilter.getIsAssigned()) && schedulingSearchFilter.getIsAssigned().trim()
				.equalsIgnoreCase("0") && schedulingSearchFilter.getFromUserKey()==0){
			where += " AND RA.GCM_PEND_MGR_USER_KEY IS NULL ";
		}

		if (schedulingSearchFilter != null && schedulingSearchFilter.getAppointmentId() != null) {
			where += " AND RA.GCM_RET_APPT_KEY = :GCM_RET_APPT_KEY ";
			params.put("GCM_RET_APPT_KEY", schedulingSearchFilter.getAppointmentId());
		}
		
		queryString = PendManagementQueries.QUERY_GET_PENDMGMT_INVENTORY.replace("#WHERE#", where);
		
		logInfo(LOG, true, "getUnassignedInventoryforPendMgmt Service query: {}", queryString);
		logInfo(LOG, true, "getUnassignedInventoryforPendMgmt Service recived parms: {}", params.toString());
		List<PendWorkListViewInfo> results = commonJpaService.getResultList(queryString, params,PendWorkListViewInfo.class);
		return results;
	}
	
	@Transactional
	public void updatePendWorkList(List<Long> gcmRetApptIds, Long pendMgrUserKey, Long loginUserKey, String requestedUser){
		Map<String, Object> params = new HashMap<>();
		String updateQuery = null;
		if(pendMgrUserKey == null){
			updateQuery = PendManagementQueries.QUERY_UPDATE_PEND_WORK_LIST_USERKEY_NULL;
			params.put("GCM_RET_APPT_KEY", gcmRetApptIds);
			params.put("GCM_LOGIN_USER_KEY", loginUserKey);
			params.put("GCM_LOGIN_USER_KEY", loginUserKey);
			params.put("MODIFY_USERID", requestedUser);
		}else {
			updateQuery = PendManagementQueries.QUERY_UPDATE_PEND_WORK_LIST_USERKEY_NOTNULL;
			params.put("GCM_PEND_MGR_USER_KEY", pendMgrUserKey);
			params.put("GCM_RET_APPT_KEY", gcmRetApptIds);
			params.put("GCM_LOGIN_USER_KEY", loginUserKey);
			params.put("MODIFY_USERID", requestedUser);
		}
		commonJpaService.update(updateQuery, params);
	}
	
	@Transactional
	public void updateChartStatus(List<String> nonRetChartIds, String busStatus, String requestedUserId, String userKey, Long busFuncDetailKey, Long apptId, String specialCategory, String status,Long noOfPendAttempts){
		Map<String, Object> params = new HashMap<>();
			String updateQuery = PendManagementQueries.QUERY_UPDATE_CHART_STATUS;
			if(busFuncDetailKey!=0L){
				updateQuery=updateQuery.replaceAll("#where", ",GCM_BUS_FUNC_DETAIL_KEY =:GCM_BUS_FUNC_DETAIL_KEY");
				params.put("GCM_BUS_FUNC_DETAIL_KEY", busFuncDetailKey);
			}
			else
				updateQuery=updateQuery.replaceAll("#where", "");
			params.put("GCM_BUS_FUNC_STATUS", busStatus);
			params.put("GCM_PROJ_CONTENT_BARCODE", nonRetChartIds);
			params.put("MODIFY_USERID", requestedUserId);
			params.put("GCM_USER_KEY", userKey);
			updateApptStatus(apptId,requestedUserId,userKey,specialCategory,status,noOfPendAttempts);
		commonJpaService.update(updateQuery, params);
	}
	private boolean getChartStatus( Long apptId){
		Map<String, Object> params = new HashMap<>();
			String query = PendManagementQueries.QUERY_SELECT_CHART_STATUS;
			params.put("GCM_RET_APPT_KEY", apptId);
			List<Long> results=commonJpaService.getResultList(query, params,Long.class);
			return results.get(0)>0;
	}

	private void updateApptStatus(Long apptId, String requestedUserId, String userKey, String specialCategory,
			String status, Long noOfPendAttempts) {
		Map<String, Object> params = new HashMap<>();
		String updateQuery = PendManagementQueries.QUERY_UPDATE_APPT_STATUS;
		params.put("GCM_RET_APPT_KEY", apptId);
		params.put("GCM_USER_KEY", userKey);
		params.put("MODIFY_USERID", requestedUserId);
		params.put("APPT_TYPE", specialCategory);
		if (StringUtils.isEmpty(status)) {
			if (getChartStatus(apptId)) {
				params.put("APPT_STATUS", "PEND RELEASED");
				updateQuery = updateQuery.replaceAll("#update", ",GCM_PEND_MGR_USER_KEY = NULL ");
			} else {
				params.put("APPT_STATUS", "COMPLETED");
				updateQuery = updateQuery.replaceAll("#update", "");
			}
		} else {
			params.put("APPT_STATUS", status);
			updateQuery = updateQuery.replaceAll("#update", "");
		}
		commonJpaService.update(updateQuery, params);
	}
}

