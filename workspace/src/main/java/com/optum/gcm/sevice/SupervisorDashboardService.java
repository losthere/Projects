package com.optum.gcm.sevice;

import static com.optum.gcm.common.util.LoggingUtil.logInfo;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.SupervisorDashboardCodingCounts;
import com.optum.gcm.model.SupervisorDashboardCodingQACounts;
import com.optum.gcm.model.SupervisorDashboardFilter;
import com.optum.gcm.model.SupervisorDashboardPendMgmtCounts;
import com.optum.gcm.model.SupervisorDashboardRetrievalCounts;
import com.optum.gcm.model.SupervisorDashboardSchedulingCounts;

/**
 * @author pmule
 *
 */

@Service
public class SupervisorDashboardService {

	private static final Logger LOG = LoggerFactory.getLogger(SupervisorDashboardService.class);
	
	private static final String FUNC_SUPDASHBOARD_SCH_COUNTS = "select * from " + "table(pkg_comm_sup_dashboard.fnc_scheduling "
			+ "			( p_user_key => :loginUserKey, p_userid => :p_userid, p_group_key => :p_group_key,"
			+ "  		  p_vendor_key	=> :p_retrieval_vendor,  p_role_code => :p_role_code, p_region => :p_region, p_proj_key	=> :projectKey, "
			+ "  		  p_provider_key		=> :providerKey " 
			+ "		    ) )";
	
	private static final String FUNC_SUPDASHBOARD_RET_COUNTS = "select * from " + "table(pkg_comm_sup_dashboard.fnc_retrieval "
			+ "			( p_user_key => :loginUserKey, p_userid => :p_userid, p_group_key => :p_group_key,"
			+ "  		  p_vendor_key	=> :p_retrieval_vendor,  p_role_code => :p_role_code, p_region => :p_region, p_proj_key	=> :projectKey, "
			+ "  		  p_provider_key		=> :providerKey " 
			+ "		    ) )";
	
	private static final String FUNC_SUPDASHBOARD_PENDMGMT_COUNTS = "select * from " + "table(pkg_comm_sup_dashboard.fnc_pend_mgmt "
			+ "			( p_user_key => :loginUserKey, p_userid => :p_userid, p_group_key => :p_group_key,"
			+ "  		  p_vendor_key	=> :p_retrieval_vendor,  p_role_code => :p_role_code, p_region => :p_region, p_proj_key	=> :projectKey, "
			+ "  		  p_provider_key		=> :providerKey " 
			+ "		    ) )";
	
	private static final String FUNC_SUPDASHBOARD_CODING_COUNTS = "select * from " + "table(pkg_comm_sup_dashboard.fnc_coding "
			+ "			( p_user_key => :loginUserKey, p_userid => :p_userid, p_group_key => :p_group_key,"
			+ "  		  p_vendor_key	=> :p_retrieval_vendor,  p_role_code => :p_role_code, p_region => :p_region, p_proj_key	=> :projectKey, "
			+ "  		  p_provider_key		=> :providerKey " 
			+ "		    ) )";
	
	private static final String FUNC_SUPDASHBOARD_CODINGQA_COUNTS = "select * from " + "table(pkg_comm_sup_dashboard.fnc_coding_qa "
			+ "			( p_user_key => :loginUserKey, p_userid => :p_userid, p_group_key => :p_group_key,"
			+ "  		  p_vendor_key	=> :p_retrieval_vendor,  p_role_code => :p_role_code, p_region => :p_region, p_proj_key	=> :projectKey, "
			+ "  		  p_provider_key		=> :providerKey " 
			+ "		    ) )";
	
	

	private CommonJpaService commonJpaService;

	@Autowired
	public SupervisorDashboardService(CommonJpaService commonJpaService) {
		this.commonJpaService = commonJpaService;
	}

	public List<SupervisorDashboardSchedulingCounts> getSchedulingCounts(SupervisorDashboardFilter supervisorDashboardFilter) throws SQLException {
		logInfo(LOG, "getSchedulingCounts started with search filter: {}", supervisorDashboardFilter.toString());
		Map<String, Object> params = new HashMap<>();
		params.put("loginUserKey", supervisorDashboardFilter.getLoginUserKey());
		params.put("p_userid", supervisorDashboardFilter.getUserId());
		params.put("p_group_key", supervisorDashboardFilter.getGroupKey());
		params.put("p_retrieval_vendor", supervisorDashboardFilter.getVendorKey());
		params.put("p_role_code", supervisorDashboardFilter.getRoleCode());
		params.put("p_region", supervisorDashboardFilter.getRegion());
		params.put("projectKey", supervisorDashboardFilter.getProjectKey() == null || supervisorDashboardFilter.getProjectKey()==0 ? "" : supervisorDashboardFilter.getProjectKey());
		params.put("providerKey", null);
		List<SupervisorDashboardSchedulingCounts> results = commonJpaService.getResultList(FUNC_SUPDASHBOARD_SCH_COUNTS, params,SupervisorDashboardSchedulingCounts.class);
		return results;
	}
	
	public List<SupervisorDashboardRetrievalCounts> getRetrievalCounts(SupervisorDashboardFilter supervisorDashboardFilter) throws SQLException {
		logInfo(LOG, "getRetrievalCounts started with search filter: {}", supervisorDashboardFilter.toString());
		Map<String, Object> params = new HashMap<>();
		params.put("loginUserKey", supervisorDashboardFilter.getLoginUserKey());
		params.put("p_userid", supervisorDashboardFilter.getUserId());
		params.put("p_group_key", supervisorDashboardFilter.getGroupKey());
		params.put("p_retrieval_vendor", supervisorDashboardFilter.getVendorKey());
		params.put("p_role_code", supervisorDashboardFilter.getRoleCode());
		params.put("p_region", supervisorDashboardFilter.getRegion());
		params.put("projectKey", supervisorDashboardFilter.getProjectKey() == null || supervisorDashboardFilter.getProjectKey()==0 ? "" : supervisorDashboardFilter.getProjectKey());
		params.put("providerKey", null);
		List<SupervisorDashboardRetrievalCounts> results = commonJpaService.getResultList(FUNC_SUPDASHBOARD_RET_COUNTS, params,SupervisorDashboardRetrievalCounts.class);
		return results;
	}
	
	public List<SupervisorDashboardPendMgmtCounts> getPendMgmtCounts(SupervisorDashboardFilter supervisorDashboardFilter) throws SQLException {
		logInfo(LOG, "getPendMgmtCounts started with search filter: {}" , supervisorDashboardFilter.toString());
		Map<String, Object> params = new HashMap<>();
		params.put("loginUserKey", supervisorDashboardFilter.getLoginUserKey());
		params.put("p_userid", supervisorDashboardFilter.getUserId());
		params.put("p_group_key", supervisorDashboardFilter.getGroupKey());
		params.put("p_retrieval_vendor", supervisorDashboardFilter.getVendorKey());
		params.put("p_role_code", supervisorDashboardFilter.getRoleCode());
		params.put("p_region", supervisorDashboardFilter.getRegion());
		params.put("projectKey", supervisorDashboardFilter.getProjectKey() == null || supervisorDashboardFilter.getProjectKey()==0 ? "" : supervisorDashboardFilter.getProjectKey());
		params.put("providerKey", null);
		List<SupervisorDashboardPendMgmtCounts> results = commonJpaService.getResultList(FUNC_SUPDASHBOARD_PENDMGMT_COUNTS, params,SupervisorDashboardPendMgmtCounts.class);
		return results;
	}
	
	public List<SupervisorDashboardCodingCounts> getCodingCounts(SupervisorDashboardFilter supervisorDashboardFilter) throws SQLException {
		logInfo(LOG, "getCodingCounts started with search filter: {}" , supervisorDashboardFilter.toString());
		Map<String, Object> params = new HashMap<>();
		params.put("loginUserKey", supervisorDashboardFilter.getLoginUserKey());
		params.put("p_userid", supervisorDashboardFilter.getUserId());
		params.put("p_group_key", supervisorDashboardFilter.getGroupKey());
		params.put("p_retrieval_vendor", supervisorDashboardFilter.getVendorKey());
		params.put("p_role_code", supervisorDashboardFilter.getRoleCode());
		params.put("p_region", supervisorDashboardFilter.getRegion());
		params.put("projectKey", supervisorDashboardFilter.getProjectKey() == null || supervisorDashboardFilter.getProjectKey()==0 ? "" : supervisorDashboardFilter.getProjectKey());
		params.put("providerKey", null);
		List<SupervisorDashboardCodingCounts> results = commonJpaService.getResultList(FUNC_SUPDASHBOARD_CODING_COUNTS, params,SupervisorDashboardCodingCounts.class);
		return results;
	}
	
	public List<SupervisorDashboardCodingQACounts> getCodingQACounts(SupervisorDashboardFilter supervisorDashboardFilter) throws SQLException {
		logInfo(LOG, "getCodingQACounts started with search filter: {}", supervisorDashboardFilter.toString());
		Map<String, Object> params = new HashMap<>();
		params.put("loginUserKey", supervisorDashboardFilter.getLoginUserKey());
		params.put("p_userid", supervisorDashboardFilter.getUserId());
		params.put("p_group_key", supervisorDashboardFilter.getGroupKey());
		params.put("p_retrieval_vendor", supervisorDashboardFilter.getVendorKey());
		params.put("p_role_code", supervisorDashboardFilter.getRoleCode());
		params.put("p_region", supervisorDashboardFilter.getRegion());
		params.put("projectKey", supervisorDashboardFilter.getProjectKey() == null || supervisorDashboardFilter.getProjectKey()==0 ? "" : supervisorDashboardFilter.getProjectKey());
		params.put("providerKey", null);
		List<SupervisorDashboardCodingQACounts> results = commonJpaService.getResultList(FUNC_SUPDASHBOARD_CODINGQA_COUNTS, params,SupervisorDashboardCodingQACounts.class);
		return results;
	}
	 
}
