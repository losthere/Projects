package com.optum.gcm.sevice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.dao.constants.CodingQAQueries;
import com.optum.gcm.dao.constants.MasterDataQueries;
import com.optum.gcm.model.CodingInventory;
import com.optum.gcm.model.CodingUser;
import com.optum.gcm.model.SchedulingSearchFilter;

/**
 * @author sgangul1
 */

@Service
public class CodingSearchService {

	private static final Logger LOG = LoggerFactory.getLogger(CodingSearchService.class);

	
	private static final String FUNC_CODING_SEARCH = "select * from " + "table(pkg_comm_assignment.fnc_coding_list "
			+ "			( p_user_key			=> :loginUserKey," + "			  p_vendor_key			=> :vendorKey,"
			+ "  		  p_business_segment	=> :busSegment," + "  		  p_proj_key			=> :projectKey,"
			+ "  		  p_client_key			=> :clientKey, " + "  		  p_hp_key				=> :hpKey, "
			+ "  		  p_hp_product			=> :hpProduct, " + "  		  p_program_key			=> :programKey, "
			+"			  p_coding_vendor		=> :codingVendor, "+ "  	  p_is_offshore			=> :isOffshoreCoding, "
			+ "  		  p_is_assigned			=> :isAssigned, " + "  		  p_assigned_user_key	=> :fromUserKey "
			+ "		    )" + "		)";

	private CommonJpaService commonJpaService;

	@Autowired
	public CodingSearchService(CommonJpaService commonJpaService) {
		this.commonJpaService = commonJpaService;
	}

	public List<CodingInventory> getUnassignedInventoryforCoding(SchedulingSearchFilter searchFilter) {
		return getUnassignedInventoryforOptum(searchFilter);
	}
	
	public List<CodingInventory> getUnassignedInventoryforOptum(SchedulingSearchFilter searchFilter) {

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
		}
		String queryString = CodingQAQueries.FUNC_OPTUM_INVENTORY_SEARCH;
		List<CodingInventory> results = commonJpaService.getResultList(queryString, params,
				CodingInventory.class);

		return results;
	}
	
	
	public List<CodingUser> getCodingUsersforSupervisor(String supervisorUserKey, Long vendorKey, Long groupKey, String roleCode, Long userKey, String userId, Long busFuncKey) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("roleCode", roleCode);
		params.put("busFuncKey", busFuncKey);
		params.put("vendorKey", vendorKey);
		params.put("approvedUserKey", StringUtils.isNotBlank(supervisorUserKey) ? supervisorUserKey : null);
		params.put("groupKey", groupKey);
		params.put("userId", userId);
		params.put("userKey", userKey);
		return commonJpaService.getResultList(MasterDataQueries.QUERY_GET_USERS_BY_SUPERVISOR, params,
				CodingUser.class);
	}

}
