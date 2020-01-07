package com.optum.gcm.sevice;

import static com.optum.gcm.common.util.LoggingUtil.logInfo;
import static com.optum.gcm.dao.constants.SchedulingWorlListQueries.QUERY_GET_MY_APPTS;
import static com.optum.gcm.dao.constants.SchedulingWorlListQueries.QUERY_GET_USER_SCHEDULIG_WORKLIST;
import static com.optum.gcm.dao.constants.SchedulingWorlListQueries.QUERY_GET_WORKLIST_COUNTS;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.common.util.QueryBuilderUtil;
import com.optum.gcm.model.MyAppointments;
import com.optum.gcm.model.SchedulingChartCount;
import com.optum.gcm.model.SchedulingInventory;
import com.optum.gcm.model.SchedulingSearchFilter;

/**
 * @author pmule
 *
 */

@Service
public class SchedulingWorklistService {

	private static final Logger LOG = LoggerFactory
			.getLogger(SchedulingWorklistService.class);

	private CommonJpaService commonJpaService;

	@Autowired
	public SchedulingWorklistService(CommonJpaService commonJpaService) {
		this.commonJpaService = commonJpaService;
	}

	public List<SchedulingInventory> getMySchedulingWorklist(
			SchedulingSearchFilter schedulingSearchFilter) {
		Map<String, Object> params = new HashMap<String, Object>();
		String where = QueryBuilderUtil.getWhereClause(schedulingSearchFilter,
				params);
		// Replace the Query String
		params.put("GCM_USER_KEY", schedulingSearchFilter.getFromUserKey());
		params.put("GCM_BUS_FUNC_DETAIL_KEY",
				schedulingSearchFilter.getBusFuncDtlKey());
		String queryString = QUERY_GET_USER_SCHEDULIG_WORKLIST.replace(
				"#WHERE#", where);
		List<SchedulingInventory> results = commonJpaService.getResultList(
				queryString, params, SchedulingInventory.class);
		return results;
	}

	public SchedulingChartCount getAssignedChartCountByUser(
			SchedulingSearchFilter schedulingSearchFilter) {
		Map<String, Object> params = new HashMap<String, Object>();
		String where = QueryBuilderUtil.getWhereClause(schedulingSearchFilter,
				params);
		String queryString = QUERY_GET_WORKLIST_COUNTS
				.replace("#WHERE#", where);
		logInfo(LOG, "getAssignedChartCountByUser Service query: {}", queryString);
		logInfo(LOG, "getAssignedChartCountByUser Service recived parms: {}", params.toString());
		SchedulingChartCount result = null;
		params.put("GCM_USER_KEY", schedulingSearchFilter.getLoginUserKey());
		params.put("GCM_BUS_FUNC_DETAIL_KEY",
				schedulingSearchFilter.getBusFuncDtlKey());
		try {
			result = commonJpaService.getResultObject(queryString, params,
					SchedulingChartCount.class);
		} catch (EmptyResultDataAccessException e) {
			result = new SchedulingChartCount();
			LOG.error(String.valueOf(e));
		}

		return result;
	}

	public List<MyAppointments> getMyAppointments(
			SchedulingSearchFilter schedulingSearchFilter) {
		Map<String, Object> params = new HashMap<String, Object>();
		StringBuilder where = new StringBuilder(200);
		where.append(QueryBuilderUtil.getWhereClause(schedulingSearchFilter, params));
		if (schedulingSearchFilter.getAppointmentId() != null
				&& schedulingSearchFilter.getAppointmentId() > 0) {
			where.append(" AND A.GCM_RET_APPT_KEY = :GCM_RET_APPT_KEY ");
			params.put("GCM_RET_APPT_KEY",
					schedulingSearchFilter.getAppointmentId());
		}

		if (StringUtils.isNotBlank(schedulingSearchFilter
				.getAppointmentStatus())) {
			where.append(" AND A.APPT_STATUS = :APPT_STATUS ");
			params.put("APPT_STATUS",
					schedulingSearchFilter.getAppointmentStatus());
		}

		if (StringUtils.isNotBlank(schedulingSearchFilter.getFaxStatus())) {
			where.append(" AND A.FAX_STATUS = :FAX_STATUS ");
			params.put("FAX_STATUS", schedulingSearchFilter.getFaxStatus());
		}
		String queryString = QUERY_GET_MY_APPTS.replace("#WHERE#", where);

		params.put("GCM_BUS_FUNC_DETAIL_KEY",
				schedulingSearchFilter.getBusFuncDtlKey());
		params.put("GCM_USER_KEY", schedulingSearchFilter.getLoginUserKey());
		params.put("GCM_VENDOR_KEY", schedulingSearchFilter.getVendorKey());
		params.put("GCM_RET_APPT_KEY",
				schedulingSearchFilter.getAppointmentId());
		List<MyAppointments> result = commonJpaService.getResultList(
				queryString, params, MyAppointments.class);
		return result;
	}

}
