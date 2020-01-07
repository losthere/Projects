package com.optum.gcm.sevice;

import static com.optum.gcm.dao.constants.MasterDataQueries.QUERY_GET_PROV_DETAILS;
import static com.optum.gcm.dao.constants.MasterDataQueries.QUERY_GET_SUBTYPES;
import static com.optum.gcm.dao.constants.MasterDataQueries.QUERY_SERVICE_CONFIGURED;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.dao.constants.MasterDataQueries;
import com.optum.gcm.model.GcmBusFuncDetail;
import com.optum.gcm.model.GcmConfigInput;
import com.optum.gcm.model.KeyValue;
import com.optum.gcm.model.OptumInventoryInput;
import com.optum.gcm.model.Role;
import com.optum.gcm.model.SegmentProjects;
import com.optum.gcm.model.User;
import com.optum.gcm.model.Vendor;

@Service
public class MasterDataServiceImpl implements MasterDataService {

	private static final Logger LOG = LoggerFactory
			.getLogger(MasterDataServiceImpl.class);

	@Autowired
	private CommonJpaService commonJpaService;
	
	
	@Override
	public List<KeyValue<String, String>> getBusinessSegments() {
		return commonJpaService.getKeyKeyValueResults(
				MasterDataQueries.QUERY_GET_BUSINESS_SEGMENTS, null,
				String.class);
	}
	
	
	@Override
	public List<KeyValue<String, String>> getBusSegByUserAssociation(
			Long userKey) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("USER_KEY", userKey);
		return commonJpaService.getKeyKeyValueResults(
				MasterDataQueries.QUERY_GET_BUSINESS_SEGMENTS_BY_USER_ASSOCIATION, params,
				String.class);
	}

	@Override
	public List<KeyValue<String, String>> getBusinessSegmentsByUser(
			String userId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("USERID", userId);
		return commonJpaService.getKeyKeyValueResults(
				MasterDataQueries.QUERY_GET_BUSINESS_SEGMENTS_BY_USER, params,
				String.class);
	}

	@Override
	public List<KeyValue<String, String>> getProgramsByBusinessSegment(
			String businessSegment) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_BUSINESS_SEGMENT", businessSegment);
		return commonJpaService.getKeyKeyValueResults(
				MasterDataQueries.QUERY_GET_PROGRAMS_BY_BUSINESS_SEGMENT,
				params, String.class);
	}
	
	@Override
	public List<KeyValue<String, String>> getProgramsByUserAssociation(
			String businessSegment,Long userKey){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("BUSINESS_SEGMENT", businessSegment);
		params.put("USER_KEY", userKey);
		return commonJpaService.getKeyKeyValueResults(
				MasterDataQueries.QUERY_GET_PROGRAMS_BY_BUS_SEG_AND_USR_ASSOCIATION,
				params, String.class);
	}

	@Override
	public List<Long> getProjectYearsByBusSegAndProgram(String businessSegment,
			Long programKey) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_BUSINESS_SEGMENT", businessSegment);
		params.put("GCM_PROGRAM_KEY", programKey);
		return commonJpaService
				.getResultList(
						MasterDataQueries.QUERY_GET_PROJ_YEARS_BY_BUSINESS_SEGMENT_AND_PROGRAM,
						params, Long.class);
	}

	@Override
	public List<KeyValue<String, String>> getStates() {
		return commonJpaService.getKeyKeyValueResults(
				MasterDataQueries.QUERY_GET_STATES, null, String.class);
	}
	
	@Override
	public List<KeyValue<String, String>> getProvSpecCodes() {
		return commonJpaService.getKeyKeyValueResults(
				MasterDataQueries.QUERY_GET_PROV_SPEC_CODES, null, String.class);
	}
	
	@Override
	public List<Long> getChartScore() {
		return commonJpaService
				.getResultList(
						MasterDataQueries.QUERY_GET_CHART_SCORE_GROUP,
						 Long.class);
	}
	
	
	
	@Override
	public List<KeyValue<String, String>> getVendorsByFilter(
			String businessSegment, Long programKey, Long businessFunctionKey,
			Long hpKey) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_BUSINESS_SEGMENT", businessSegment);
		params.put("GCM_PROGRAM_KEY", programKey);
		params.put("GCM_BUSINESS_FUNC_KEY", businessFunctionKey);
		params.put("GCM_HP_KEY", hpKey);
		return commonJpaService.getKeyKeyValueResults(
				MasterDataQueries.QUERY_GET_VENDORS, params, String.class);
	}
	
	public List<KeyValue<String, String>> getVendorsByUserRole(Long userKey, Long groupKey, String roleCode)
	{
	String queryString = MasterDataQueries.QUERY_GET_VENDORS_BY_USER_ROLE_ASSOCIATION;
		
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_USER_KEY", userKey);
		params.put("GCM_GROUP_KEY", groupKey);
		params.put("GCM_ROLE_CODE", roleCode);
		return commonJpaService.getKeyKeyValueResults(
				queryString, params, String.class);
	}
	
	@Override
	public List<Vendor> getVendorListDetails( Long userKey,Long groupKey,String roleCode, Long supUserKey)
	{
		String queryString = MasterDataQueries.QUERY_GET_VENDORS_LIST_DETAILS;
		if(null != roleCode && ("OCUA".equalsIgnoreCase(roleCode) || "CUA".equalsIgnoreCase(roleCode) || "OUA".equalsIgnoreCase(roleCode))) {
			queryString = MasterDataQueries.QUERY_GET_VENDOR_LIST_FOR_OCUA;
		}
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_USER_KEY", userKey);
		params.put("GCM_GROUP_KEY", groupKey);
		params.put("GCM_ROLE_CODE", roleCode);
		params.put("GCM_SUPERVISOR_USER_KEY", supUserKey);
		return commonJpaService.getResultList(queryString, params, Vendor.class);
	}
	
	@Override
	public List<KeyValue<String, String>> getVendorsByUserAssociation(String businessSegment,
			Long programKey, Long businessFunctionKey, Long hpKey,Long userKey, Long groupKey, String roleCode) {
		String queryString = "";
		Map<String, Object> params = new HashMap<String, Object>();
		if(null != roleCode && !"".equalsIgnoreCase(roleCode) && "OCUA".equalsIgnoreCase(roleCode)) {
			queryString = MasterDataQueries.GET_VENDORS_BY_GROUP;
			params.put("GCM_GROUP_KEY", groupKey);
			return commonJpaService.getKeyKeyValueResults(
					queryString, params, String.class);
		}
		queryString = MasterDataQueries.QUERY_GET_VENDORS_BY_USER_ASSOCIATION;
		StringBuilder str=new StringBuilder(250);
		str.append(" ");
		if(null != businessSegment && businessSegment.isEmpty()) {
			str.append(" AND gcm_business_segment  = :BUSINESS_SEGMENT ") ;
			params.put("BUSINESS_SEGMENT", businessSegment);
		}
		if(null != programKey && programKey > 0) {
			str.append(" AND GCM_PROGRAM_KEY = :PROGRAM_KEY ");
			params.put("PROGRAM_KEY", programKey);
		}
		if(null != businessFunctionKey && businessFunctionKey > 0) {
			str.append( "  AND GCM_BUSINESS_FUNC_KEY = :BUSINESS_FUNC_KEY  ");
			params.put("BUSINESS_FUNC_KEY", businessFunctionKey);
		}
		else
		{
			str.append( "  AND IS_REAL_SW = 'Y' ");
		}
		if(null != hpKey && hpKey > 0) {
			str.append(" AND GCM_HP_KEY = :HP_KEY");
			params.put("HP_KEY", hpKey);
		}
		if(null != groupKey && groupKey > 0) {
			str.append(" AND GCM_GROUP_KEY = :GCM_GROUP_KEY");
			params.put("GCM_GROUP_KEY", groupKey);
			
		}
		params.put("USER_KEY", userKey);
		queryString = queryString.replace("#WHERE#", str);
		return commonJpaService.getKeyKeyValueResults(
				queryString, params, String.class);
	}

	@Override
	public List<KeyValue<String, String>> getVendorsAssignedByUser(String businessSegment,
			Long programKey, Long businessFunctionKey, Long hpKey,Long supervisorKey, Long groupKey, String roleCode) {
		String queryString = MasterDataQueries.QUERY_GET_VENDORS_BY_USER_ASSOCIATION;
		StringBuilder str=new StringBuilder(250);
		str.append(" ");
		//String where =  " ";
		Map<String, Object> params = new HashMap<String, Object>();
		
		str.append( "  AND IS_REAL_SW = 'Y' ");
		params.put("USER_KEY", supervisorKey);
		queryString = queryString.replace("#WHERE#", str);
		return commonJpaService.getKeyKeyValueResults(
				queryString, params, String.class);
	}
	
	@Override 
	public List<KeyValue<String, String>> getVendorsByInvFilter(OptumInventoryInput optInvInput){
		String queryString = MasterDataQueries.FUNC_GET_VENDOR_BY_INV_FILTER;
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userKey", optInvInput.getUserKey());
		params.put("userId", optInvInput.getUserId());
		params.put("groupKey", optInvInput.getGroupKey());
		params.put("roleCode", optInvInput.getRoleCode());
		params.put("busFuncKey", optInvInput.getBusFuncKey());
		return commonJpaService.getKeyKeyValueResults(
				queryString, params, String.class);
	}
	
	

	@Override
	public List<KeyValue<String, String>> getClients(Long loginUserKey) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_LOGIN_USER_KEY", loginUserKey);
		return commonJpaService.getKeyKeyValueResults(
				MasterDataQueries.QUERY_GET_CLIENTS, params, String.class);
	}
	
	@Override
	public List<KeyValue<String, String>> getClientsByUserAssociation(Long userKey) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("USER_KEY", userKey);
		return commonJpaService.getKeyKeyValueResults(
				MasterDataQueries.QUERY_GET_CLIENTS_BY_USER_ASSOCIATION, params, String.class);
	}
	
	

	@Override
	public List<KeyValue<String, String>> getHPByBusSegAndClient(
			String businessSegment, Long clientKey) {
		Map<String, Object> params = new HashMap<String, Object>();
		String query = MasterDataQueries.QUERY_GET_HP_BY_BUSINESS_SEGMENT_AND_CLIENT;
		if (StringUtils.isNotBlank(businessSegment)) {
			query += " AND GCM_BUSINESS_SEGMENT = :GCM_BUSINESS_SEGMENT ";
			params.put("GCM_BUSINESS_SEGMENT", businessSegment);
		}
		params.put("GCM_CLIENT_KEY", clientKey);
		return commonJpaService.getKeyKeyValueResults(query, params,
				String.class);
	}
	
	@Override
	public List<KeyValue<String, String>> getHealthPlansByUserAssociation(
			String businessSegment, Long clientKey,Long userKey) {
		Map<String, Object> params = new HashMap<String, Object>();
		String query = MasterDataQueries.QUERY_GET_HP_BY_CLIENT_USER_ASSOCIATION;
		params.put("USER_KEY", userKey);
		params.put("CLIENT_KEY", clientKey);
		
		if(StringUtils.isNotBlank(businessSegment)){
			params.put("BUSINESS_SEGMENT", businessSegment);
			query = MasterDataQueries.QUERY_GET_HP_BY_BUS_SEG_USER_ASSOCIATION;
		}
		
		return commonJpaService.getKeyKeyValueResults(query, params,
				String.class);
	}
	

	@Override
	public List<String> getHPProductByBusSegAndHP(String businessSegment,
			Long hpKey) {
		Map<String, Object> params = new HashMap<String, Object>();
		String query = MasterDataQueries.QUERY_GET_HP_PRODUCT_BY_HP;
		if (StringUtils.isNotBlank(businessSegment)) {
			query += " AND GCM_BUSINESS_SEGMENT = :GCM_BUSINESS_SEGMENT ";
			params.put("GCM_BUSINESS_SEGMENT", businessSegment);
		}
		params.put("GCM_HP_KEY", hpKey);
		query += " ORDER BY GCM_HP_PRODUCT ";
		return commonJpaService.getResultList(query, params, String.class);
	}
	
	@Override
	public List<String> getHealthPlanProductsByUserAssociation(String businessSegment,
			Long hpKey,Long userKey) {
		Map<String, Object> params = new HashMap<String, Object>();
		String query = MasterDataQueries.QUERY_GET_HP_PRD_BY_HP_USER_ASSOCIATION;
		
		if(StringUtils.isNotBlank(businessSegment)){
			params.put("BUSINESS_SEGMENT", businessSegment);
			query = MasterDataQueries.QUERY_GET_HP_PRD_BY_HP_BUS_SEG_USER_ASSOCIATION;
		}
		params.put("USER_KEY", userKey);
		params.put("HP_KEY", hpKey);
		
		return commonJpaService.getResultList(query, params, String.class);
	}
	
	

	@Override
	public List<KeyValue<String, String>> getBusinessFunctionStatus(
			Long businessFunctionKey, String workFlow ,Boolean isUtility) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_BUSINESS_FUNC_KEY", businessFunctionKey);
		String queryString = "";
		if(isUtility) {
			queryString=MasterDataQueries.QUERY_GET_CHART_STATUS;
		}
		else
		if(null != businessFunctionKey && businessFunctionKey == 4) {
			queryString = MasterDataQueries.QUERY_GET_STATUS_FOR_RET;
			params.put("WORK_FLOW", workFlow);			
		}else
		{
			queryString = MasterDataQueries.QUERY_GET_STATUS_BY_BUSINESS_FUNCTION;
		}
		return commonJpaService.getKeyKeyValueResults(
				queryString,
				params, String.class);
	}

	@Override
	public List<KeyValue<String, String>> getUsersForSupervisor(
			String vendorKey, String role, String userKey) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_VENDOR_KEY", vendorKey);
		params.put("GCM_ROLE_CODE", role);
		params.put("GCM_LOGIN_USER_KEY", userKey);
		String query=MasterDataQueries.QUERY_GET_USERS_BY_ROLE_VENDOR;
		if(role.equalsIgnoreCase("PDM"))
			query+= " ORDER BY VALUE ASC";
		else
			query+=" AND GU.GCM_APPROVED_USER_KEY=:GCM_LOGIN_USER_KEY ORDER BY VALUE ASC";
		LOG.info("received Vendor Key :" + vendorKey + " with Role Code " + role + " with user key" +userKey  );
		return commonJpaService.getKeyKeyValueResults(
				query, params,
				String.class);
	}
	
	
	
	
	@Override
	public List<KeyValue<String, String>> getUsersByRoleCode(List<String> roleCode,
			 Long loginUserKey){
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("LOGIN_USER_KEY", loginUserKey);
			params.put("GCM_ROLE_CODE", roleCode);
			String query=MasterDataQueries.QUERY_GET_USERS_BY_BUSFUNCDETAIL;
			return commonJpaService.getKeyKeyValueResults(
					query, params,
					String.class);
		
	}

	@Override
	public List<KeyValue<String, String>> getProjects(String businessSegment,
			Long loginUserKey, Long groupKey) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_BUSINESS_SEGMENT", businessSegment);
		params.put("GCM_LOGIN_USER_KEY", loginUserKey);
		params.put("GCM_GROUP_KEY1", groupKey);
		params.put("GCM_GROUP_KEY2", groupKey);
		return commonJpaService.getKeyKeyValueResults(
				MasterDataQueries.QUERY_GET_PROJECTS_BUS_SEGMENT, params,
				String.class);
	}
	
	@Override
	public List<SegmentProjects> segmentProjects(Long loginUserKey) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_LOGIN_USER_KEY", loginUserKey);
		return commonJpaService.getResultList(
				MasterDataQueries.QUERY_GET_PROJECTS_WITH_BUS_SEGMENT, params,
				SegmentProjects.class);
	}
	
	@Override
	public List<KeyValue<String, String>> getProjectsByUserKey(Long loginUserKey, Long groupKey, String vendor, String userId, String roleCode, String region) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("loginUserKey", loginUserKey);
		params.put("userId", userId);
		params.put("groupKey", groupKey);
		params.put("vendor", vendor);
		params.put("roleCode", roleCode);
		params.put("region", region);
		return commonJpaService.getKeyKeyValueResults(
				MasterDataQueries.FUNC_GET_PROJ_BY_USER, params,
				String.class);
	}
	
	
	@Override
	public List<KeyValue<String, String>> getProjectsByInvFilter(OptumInventoryInput optInvInput){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userKey", optInvInput.getUserKey());
		params.put("userId", optInvInput.getUserId());
		params.put("groupKey", optInvInput.getGroupKey());
		params.put("roleCode", optInvInput.getRoleCode());
		params.put("busFuncKey", optInvInput.getBusFuncKey());
		params.put("busSegment", optInvInput.getBusSegment());
		params.put("projYear", optInvInput.getProjectYear());
		return commonJpaService.getKeyKeyValueResults(
				MasterDataQueries.FUNC_GET_PROJ_BY_FILTER, params,
				String.class);
	}
	
	@Override
	public List<KeyValue<String, String>> getProjectsByInvFilterForUtility(OptumInventoryInput optInvInput){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("groupKey", optInvInput.getGroupKey());
		params.put("userKey", optInvInput.getUserKey());
		params.put("vendorKey", optInvInput.getVendorKey());
		params.put("roleCode", optInvInput.getRoleCode());
		params.put("busSegment", optInvInput.getBusSegment());
		params.put("region", optInvInput.getRegion());
		return commonJpaService.getKeyKeyValueResults(
				MasterDataQueries.FUNC_GET_PROJ_BY_FILTER_FOR_UTILITY, params,
				String.class);
	}


	@Override
	public List<String> getProviderDetails(Long groupKey,
			String fieldVal, String fieldNm) {
		Map<String, Object> params = new HashMap<String, Object>();
			params.put("p_group_key", groupKey);
			params.put("p_field_value", fieldVal);
			params.put("p_field_name", fieldNm);
			return commonJpaService.getResultList(QUERY_GET_PROV_DETAILS, params, String.class);
	}

	@Override
	public List<KeyValue<String, String>> getUsersCountBySupervisor(
			String userKey, String roleCode, String vendorKey,
			String busFuncDetailKey) {
		Map<String, Object> params = new HashMap<String, Object>();
		String where = "";
		params.put("GCM_LOGIN_USER_KEY", userKey);
		params.put("GCM_ROLE_CODE", roleCode);
		params.put("GCM_VENDOR_KEY", vendorKey);
		params.put("GCM_BUS_FUNC_DETAIL_KEY", busFuncDetailKey);
		
		if(null != roleCode && (roleCode.equalsIgnoreCase("COU") || roleCode.equalsIgnoreCase("CSP") || roleCode.equalsIgnoreCase("QA"))) {
			where = " AND ( RW.GCM_BUS_FUNC_STATUS IS NULL OR RW.GCM_BUS_FUNC_STATUS IN ('ASSIGNED','INPROGRESS')) ";
		}
		else if(null != roleCode && (roleCode.equalsIgnoreCase("SH") || roleCode.equalsIgnoreCase("OSH") || roleCode.equalsIgnoreCase("ESH"))) {
			where = " AND ( RW.GCM_BUS_FUNC_STATUS IS NULL OR RW.GCM_BUS_FUNC_STATUS IN ('ASSIGNED','INPROGRESS', 'PASTDUE', 'SCHEDULED', 'PEND RELEASED') )";
		}
		String queryString = MasterDataQueries.QUERY_GET_USERS_AND_COUNT.replace("#BUS_FUNC_STATUS#", where);
		return commonJpaService.getKeyKeyValueResults(queryString, params, String.class);
	}

	@Override
	public List<User> getSupervisors(Long loginUserKey, Long vendorKey, Long groupKey, String roleCode) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_VENDOR_KEY", vendorKey);
		params.put("GCM_USER_KEY", loginUserKey);
		params.put("GCM_GROUP_KEY", groupKey);
		params.put("GCM_ROLE_CODE", roleCode);
		params.put("USERID", "");
		
		return commonJpaService.getResultList(
				MasterDataQueries.QUERY_GET_CODING_SUPERVISORS_FOR_VENDOR, params,
				User.class);
	}
	
	@Override
	public List<User> getSupervisorsByVendor(Long loginUserKey, Long vendorKey, Long groupKey, String roleCode) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_VENDOR_KEY", vendorKey);
		params.put("GCM_USER_KEY", loginUserKey);
		params.put("GCM_GROUP_KEY", groupKey);
		params.put("GCM_ROLE_CODE", roleCode);
		params.put("USERID", "");
		
		return commonJpaService.getResultList(
				MasterDataQueries.QUERY_GET_SUPERVISORS_FOR_VENDOR, params,
				User.class);
	}
	
	@Override
	public List<Role> getRolesByGroupVendor(Long loginUserKey, Long vendorKey, Long groupKey, String roleCode){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_VENDOR_KEY", vendorKey);
		params.put("GCM_USER_KEY", loginUserKey);
		params.put("GCM_GROUP_KEY", groupKey);
		params.put("GCM_ROLE_CODE", roleCode);
		params.put("USERID", "");
		List<Role> results = commonJpaService.getResultList(MasterDataQueries.QUERY_GET_ROLES_BY_GROUP_VENDOR, params, Role.class);
		return results;
		
	}
	
	@Override
	public List<KeyValue<String, String>> getReasonCodes(String reasonType, Long busFuncKey) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_REASON_TYPE", reasonType);
		params.put("GCM_BUSINESS_FUNC_KEY", busFuncKey);
		return commonJpaService.getKeyKeyValueResults(MasterDataQueries.QUERY_GET_REASONCODES, params,String.class);
	}

	@Override
	public List<Role> getRoles() {
		return commonJpaService.getResultList(MasterDataQueries.QUERY_GET_ROLES, Role.class);
	}
	
	@Override
	public List<GcmBusFuncDetail> getBusinessFunctionDetails(Long gcmBusinessFuncKey) {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_BUSINESS_FUNC_KEY", gcmBusinessFuncKey);
		return commonJpaService.getResultList(QUERY_GET_SUBTYPES, params, GcmBusFuncDetail.class);
	}
	
	@Override
	public Boolean isRetrievalConfigured(Integer groupKey) {
		return isServiceConfigured("SCHEDULING_SVC_OFF", groupKey);
	}
	
	@Override
	public Boolean isServiceConfigured(String serviceName, Integer groupKey) {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_GROUP_KEY", groupKey);
		params.put("SERVICE_NAME", serviceName);
		int count  = commonJpaService.getResultObject(QUERY_SERVICE_CONFIGURED, params, Integer.class);
		return count == 0;
	}
    
	@Override
	public List<KeyValue<String, String>> getVendorsForUserProfile( Long groupKey,Long userKey) {
		String queryString = MasterDataQueries.GET_VENDORS_USER_PROFILE;
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_GROUP_KEY", groupKey);
		params.put("GCM_USER_KEY", userKey);
		return commonJpaService.getKeyKeyValueResults(
				queryString, params, String.class);	
	}

	@Override
	public List<KeyValue<String, String>>  isBusFuncConfigured(GcmConfigInput gcmConfigInput) {
		Map<String, Object> params = new HashMap<>();
		params.put("p_group_key", gcmConfigInput.getGroupKey());
		params.put("p_role_code", gcmConfigInput.getRoleCode());
		params.put("p_business_func_key", gcmConfigInput.getBusFunckey());
		params.put("p_business_func_detail_key", gcmConfigInput.getBusFuncDetailKey());
		params.put("p_config_type", gcmConfigInput.getConfigType());
		params.put("p_config_value", gcmConfigInput.getConfigValue());
		params.put("p_user_key", gcmConfigInput.getUserKey());
		params.put("p_userid", gcmConfigInput.getUserId());
		params.put("p_vendor_key", gcmConfigInput.getVendorKey());
		params.put("p_match_type", gcmConfigInput.getMatchType());
		return commonJpaService.getKeyKeyValueResults(MasterDataQueries.QUERY_BUS_FUNC_CONFIGURED, params, String.class);
	}
	
	@Override
	public List<KeyValue<String, String>> getConfiguredGroups(Long userKey){
		List<KeyValue<String, String>> result = null;
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_USER_KEY", userKey);
		int count = commonJpaService.getResultObject(MasterDataQueries.IS_USER_HAS_ACCESS_TO_GROUPS, params, Integer.class);
		if(count > 0)
			result = commonJpaService.getKeyKeyValueResults(MasterDataQueries.GET_GROUPS_BY_USER_KEY, params, String.class);
		return result;
	}
	
	@Override
	public List<KeyValue<String, String>> getVendorsByGroup(Integer groupKey){
		Map<String, Object> params = new HashMap<String, Object>();
		String queryString = MasterDataQueries.GET_VENDORS_BY_GROUP;
		params.put("GCM_GROUP_KEY", groupKey);
		return commonJpaService.getKeyKeyValueResults(queryString, params, String.class);
	}

}
