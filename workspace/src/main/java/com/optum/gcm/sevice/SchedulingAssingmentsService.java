
package com.optum.gcm.sevice;

import static com.optum.gcm.common.util.LoggingUtil.logInfo;

/**
 * @author pmule
 *
 */

import static com.optum.gcm.dao.constants.SchedulingAssignmentQuries.QUERY_ASSIGN_TO_USER;
import static com.optum.gcm.dao.constants.SchedulingAssignmentQuries.QUERY_REASSIGN_TO_USER;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.optum.gcm.common.dao.CommonJpaDao;
import com.optum.gcm.common.util.QueryBuilderUtil;
import com.optum.gcm.model.AssignInventorySearchFilter;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.SchedulingSearchFilterWrapper;

@Service
public class SchedulingAssingmentsService {
	
	private static final Logger LOG = LoggerFactory.getLogger(SchedulingAssingmentsService.class);

	@Autowired
	private CommonJpaDao commonJpaDao;
	
	@Transactional
	public boolean assignSchedulingInvenotry(SchedulingSearchFilterWrapper wrapper)
			throws SQLException {
		
		String queryString = "";
		
		Map<String, Object> filterparams = new HashMap<>();
		SchedulingSearchFilter schedulingSearchFilter = wrapper.getSchedulingSearchFilter();
		String whereFilter =  QueryBuilderUtil.getWhereClause(wrapper.getSchedulingSearchFilter(), filterparams);
		
		long busFuncDtlKey = wrapper.getSchedulingSearchFilter().getBusFuncDtlKey();
		
		for (AssignInventorySearchFilter search: wrapper.getAssignInventorySearchFilter()) {
			
			Map<String, Object> params = new HashMap<>();
			String where = QueryBuilderUtil.getAssignedToWhere(search, params);
			where += whereFilter;
			params.putAll(filterparams);
			
			if (StringUtils.isNotBlank(search.getIsAssigned()) && "0".equalsIgnoreCase(search.getIsAssigned())) {
				queryString = QUERY_ASSIGN_TO_USER.replace("#WHERE#", where);
				params.put("GCM_TO_USER_KEY", search.getToUserKey());
			}
			else if (StringUtils.isNotBlank(search.getIsAssigned()) && "1".equalsIgnoreCase(search.getIsAssigned())) {
				queryString = QUERY_REASSIGN_TO_USER.replace("#WHERE#", where);
				params.put("GCM_FROM_USER_KEY", search.getFromUserKey());
				params.put("GCM_TO_USER_KEY", search.getToUserKey());
			} 
			
			params.put("GCM_VENDOR_KEY", schedulingSearchFilter.getVendorKey());
			params.put("ROWNUM", search.getCount());
			params.put("SOURCE_SYSTEM_PROV_ID", search.getProvId());
			params.put("MODIFY_USERID", search.getRequestedUserId());
			params.put("GCM_BUS_FUNC_DETAIL_KEY", busFuncDtlKey);

			int cnt = commonJpaDao.update(queryString, params);
			logInfo(LOG, "No.of Rows updated : {}", cnt);
			
		}
		
		return true;
		
	}

	
}
