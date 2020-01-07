package com.optum.gcm.sevice;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.SupervisorDashboardCodingCounts;
import com.optum.gcm.model.SupervisorDashboardCodingQACounts;
import com.optum.gcm.model.SupervisorDashboardFilter;
import com.optum.gcm.model.SupervisorDashboardPendMgmtCounts;
import com.optum.gcm.model.SupervisorDashboardRetrievalCounts;
import com.optum.gcm.model.SupervisorDashboardSchedulingCounts;

@RunWith(PowerMockRunner.class)
public class SupervisorDashboardServiceTest {

	@InjectMocks
	protected SupervisorDashboardService supervisorDashboardService;

	@Mock
	private CommonJpaService commonJpaService;

	private static final String FUNC_SUPDASHBOARD_SCH_COUNTS = "select * from "
			+ "table(pkg_comm_sup_dashboard.fnc_scheduling " + "			( p_user_key			=> :loginUserKey,"
			+ "		  p_group_key			=> :p_group_key,"
			+ "  		  p_retrieval_vendor	=> :p_retrieval_vendor, " + " p_proj_key	=> :projectKey, "
			+ "  		  p_provider_key		=> :providerKey " + "		    )" + "		)";

	private static final String FUNC_SUPDASHBOARD_RET_COUNTS = "select * from "
			+ "table(pkg_comm_sup_dashboard.fnc_retrieval " + "			( p_user_key			=> :loginUserKey,"
			+ "		  p_group_key			=> :p_group_key,"
			+ "  		  p_retrieval_vendor	=> :p_retrieval_vendor, " + " p_proj_key	=> :projectKey, "
			+ "  		  p_provider_key		=> :providerKey " + "		    )" + "		)";

	private static final String FUNC_SUPDASHBOARD_PENDMGMT_COUNTS = "select * from "
			+ "table(pkg_comm_sup_dashboard.fnc_pend_mgmt " + "			( p_user_key			=> :loginUserKey,"
			+ "		  p_group_key			=> :p_group_key,"
			+ "  		  p_retrieval_vendor	=> :p_retrieval_vendor, " + " p_proj_key	=> :projectKey, "
			+ "  		  p_provider_key		=> :providerKey " + "		    )" + "		)";

	private static final String FUNC_SUPDASHBOARD_CODING_COUNTS = "select * from "
			+ "table(pkg_comm_sup_dashboard.fnc_coding " + "			( p_user_key			=> :loginUserKey,"
			+ "		  p_group_key			=> :p_group_key,"
			+ "  		  p_retrieval_vendor	=> :p_retrieval_vendor, " + " p_proj_key	=> :projectKey, "
			+ "  		  p_provider_key		=> :providerKey " + "		    )" + "		)";

	private static final String FUNC_SUPDASHBOARD_CODINGQA_COUNTS = "select * from "
			+ "table(pkg_comm_sup_dashboard.fnc_coding_qa " + "			( p_user_key			=> :loginUserKey,"
			+ "		  p_group_key			=> :p_group_key,"
			+ "  		  p_retrieval_vendor	=> :p_retrieval_vendor, " + " p_proj_key	=> :projectKey, "
			+ "  		  p_provider_key		=> :providerKey " + "		    )" + "		)";

	private SupervisorDashboardFilter supervisorDashboardFilter = new SupervisorDashboardFilter();
	private Map<String, Object> params = new HashMap<>();

	@org.junit.Before
	public void setup() {
		supervisorDashboardFilter.setLoginUserKey(1L);
		supervisorDashboardFilter.setGroupKey(1L);
		supervisorDashboardFilter.setVendorKey(1L);
		supervisorDashboardFilter.setProviderKey(1L);
		supervisorDashboardFilter.setProjectKey(1L);

		params.put("loginUserKey", supervisorDashboardFilter.getLoginUserKey());
		params.put("p_group_key", supervisorDashboardFilter.getGroupKey());
		params.put("p_retrieval_vendor", supervisorDashboardFilter.getVendorKey());
		params.put("projectKey", supervisorDashboardFilter.getProjectKey());
		params.put("providerKey", null);
	}

	@Test
	public void testGetSchedulingCounts() throws SQLException {

		List<SupervisorDashboardSchedulingCounts> results = new ArrayList<SupervisorDashboardSchedulingCounts>();
		SupervisorDashboardSchedulingCounts supervisorDashboardSchedulingCounts = new SupervisorDashboardSchedulingCounts();
		supervisorDashboardSchedulingCounts.setAsOfDate("TEST");
		supervisorDashboardSchedulingCounts.setTabCode("TEST");
		results.add(supervisorDashboardSchedulingCounts);

		PowerMockito.when(commonJpaService.getResultList(FUNC_SUPDASHBOARD_SCH_COUNTS, params,
				SupervisorDashboardSchedulingCounts.class)).thenReturn(results);

		supervisorDashboardService.getSchedulingCounts(supervisorDashboardFilter);
	}

	@Test
	public void testGetRetrievalCounts() throws SQLException {

		List<SupervisorDashboardRetrievalCounts> results = new ArrayList<SupervisorDashboardRetrievalCounts>();
		SupervisorDashboardRetrievalCounts supervisorDashboardRetrievalCounts = new SupervisorDashboardRetrievalCounts();
		supervisorDashboardRetrievalCounts.setAsOfDate("TEST");
		supervisorDashboardRetrievalCounts.setClientUploadCnt(1l);
		results.add(supervisorDashboardRetrievalCounts);

		PowerMockito.when(commonJpaService.getResultList(FUNC_SUPDASHBOARD_RET_COUNTS, params,
				SupervisorDashboardRetrievalCounts.class)).thenReturn(results);

		supervisorDashboardService.getRetrievalCounts(supervisorDashboardFilter);
	}

	@Test
	public void testGetPendMgmtCounts() throws SQLException {

		List<SupervisorDashboardPendMgmtCounts> results = new ArrayList<SupervisorDashboardPendMgmtCounts>();
		SupervisorDashboardPendMgmtCounts supervisorDashboardPendMgmtCounts = new SupervisorDashboardPendMgmtCounts();
		supervisorDashboardPendMgmtCounts.setAsOfDate("TEST");
		supervisorDashboardPendMgmtCounts.setAssignedCnt(1l);
		supervisorDashboardPendMgmtCounts.setAssignedPct("10");
		supervisorDashboardPendMgmtCounts.setCnaCnt(1l);
		results.add(supervisorDashboardPendMgmtCounts);

		PowerMockito.when(commonJpaService.getResultList(FUNC_SUPDASHBOARD_PENDMGMT_COUNTS, params,
				SupervisorDashboardPendMgmtCounts.class)).thenReturn(results);

		supervisorDashboardService.getPendMgmtCounts(supervisorDashboardFilter);
	}

	@Test
	public void testGetCodingCounts() throws SQLException {

		List<SupervisorDashboardCodingCounts> results = new ArrayList<SupervisorDashboardCodingCounts>();
		SupervisorDashboardCodingCounts supervisorDashboardCodingCounts = new SupervisorDashboardCodingCounts();
		supervisorDashboardCodingCounts.setAsOfDate("TEST");
		supervisorDashboardCodingCounts.setAssignedCnt(1l);
		supervisorDashboardCodingCounts.setAssignedPct("10");
		results.add(supervisorDashboardCodingCounts);

		PowerMockito.when(commonJpaService.getResultList(FUNC_SUPDASHBOARD_CODING_COUNTS, params,
				SupervisorDashboardCodingCounts.class)).thenReturn(results);

		supervisorDashboardService.getCodingCounts(supervisorDashboardFilter);
	}

	@Test
	public void testGetCodingQACounts() throws SQLException {

		List<SupervisorDashboardCodingQACounts> results = new ArrayList<SupervisorDashboardCodingQACounts>();
		SupervisorDashboardCodingQACounts supervisorDashboardCodingQACounts = new SupervisorDashboardCodingQACounts();
		supervisorDashboardCodingQACounts.setAsOfDate("TEST");
		supervisorDashboardCodingQACounts.setAssignedCnt(1l);
		supervisorDashboardCodingQACounts.setAssignedPct("10");
		results.add(supervisorDashboardCodingQACounts);

		PowerMockito.when(commonJpaService.getResultList(FUNC_SUPDASHBOARD_CODINGQA_COUNTS, params,
				SupervisorDashboardCodingQACounts.class)).thenReturn(results);

		supervisorDashboardService.getCodingQACounts(supervisorDashboardFilter);
	}

}
