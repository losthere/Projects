package com.optum.gcm.sevice;

import static com.optum.gcm.dao.constants.SchedulingSearchQueries.QUERY_GET_ASSIGNED_INVENTORY_SCHEDULING;
import static com.optum.gcm.dao.constants.SchedulingSearchQueries.QUERY_GET_UNASSIGNED_INVENTORY_SCHEDULING;

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
import com.optum.gcm.model.SchedulingInventory;
import com.optum.gcm.model.SchedulingSearchFilter;

/**
 * @author pmule
 *
 */

@Service
public class SchedulingSearchService {

	private static final Logger LOG = LoggerFactory.getLogger(SchedulingSearchService.class);
	@Autowired
	private CommonJpaService commonJpaService;

	public List<SchedulingInventory> getUnassignedInventoryforScheduling(SchedulingSearchFilter schedulingSearchFilter) {
		Map<String, Object> params = new HashMap<String, Object>();
		String where = "";
		String queryString = "";
		
		if (schedulingSearchFilter != null ) {
			where = QueryBuilderUtil.getWhereClause( schedulingSearchFilter,  params);
		}
		
		/*if(schedulingSearchFilter != null) {
			params.put("GCM_BUS_FUNC_DETAIL_KEY", schedulingSearchFilter.getBusFuncDtlKey());
		}*/
		
		if (schedulingSearchFilter != null && StringUtils.isNotBlank(schedulingSearchFilter.getIsAssigned()) && schedulingSearchFilter.getIsAssigned().trim()
				.equalsIgnoreCase("1")) {
			 queryString = QUERY_GET_ASSIGNED_INVENTORY_SCHEDULING.replace("#WHERE#", where);
			 params.put("GCM_FROM_USER_KEY", schedulingSearchFilter.getFromUserKey());
		} else {
			 queryString = QUERY_GET_UNASSIGNED_INVENTORY_SCHEDULING.replace("#WHERE#", where);
		}
		
		if (schedulingSearchFilter != null)
			params.put("GCM_VENDOR_KEY", schedulingSearchFilter.getVendorKey());
		
		List<SchedulingInventory> results = commonJpaService.getResultList(queryString, params,SchedulingInventory.class);
		return results;
	}

	
}
