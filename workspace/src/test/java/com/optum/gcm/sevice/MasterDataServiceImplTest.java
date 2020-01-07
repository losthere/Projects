package com.optum.gcm.sevice;

import static com.optum.gcm.dao.constants.MasterDataQueries.QUERY_GET_PROV_DETAILS;
import static com.optum.gcm.dao.constants.MasterDataQueries.QUERY_SERVICE_CONFIGURED;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.documentum.xerces_2_8_0.xerces.impl.xpath.regex.Match;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.common.sevice.StoredProcedureService;
import com.optum.gcm.dao.constants.MasterDataQueries;
import com.optum.gcm.model.GcmConfigInput;
import com.optum.gcm.model.KeyValue;
import com.optum.gcm.model.OptumInventoryInput;
import com.optum.gcm.model.Role;
import com.optum.gcm.model.SegmentProjects;
import com.optum.gcm.model.User;

import ch.qos.logback.core.boolex.Matcher;

@RunWith(PowerMockRunner.class)

public class MasterDataServiceImplTest {

	@InjectMocks
	protected MasterDataServiceImpl masterDataServiceImpl;

	@Mock
	private CommonJpaService commonJpaService;

	@Mock
	private StoredProcedureService storedProcedureService;
	
	@Mock
	private GcmConfigInput gcmConfigInput;

	List<KeyValue<String, Object>> out = new ArrayList<KeyValue<String, Object>>();

	@Before
	public void setBeforeParameter() {
		KeyValue<String, Object> key = new KeyValue<String, Object>();
		key.setKey("TEST_KEY");
		key.setValue("TEST_VALUE");
		out.add(key);
	}

	@Test
	public void getBusinessSegmentsTest() {

		PowerMockito.when(commonJpaService.getKeyKeyValueResults(MasterDataQueries.QUERY_GET_BUSINESS_SEGMENTS, null,
				String.class)).thenReturn(out);
		masterDataServiceImpl.getBusinessSegments();
	}

	@Test
	public void getBusSegByUserAssociationTest() throws Exception {
		Map<String, Object> params = new HashMap<>();
		params.put("USER_KEY", 1l);

		PowerMockito
				.when(commonJpaService.getKeyKeyValueResults(
						MasterDataQueries.QUERY_GET_BUSINESS_SEGMENTS_BY_USER_ASSOCIATION, params, String.class))
				.thenReturn(out);
		masterDataServiceImpl.getBusSegByUserAssociation(1l);
	}

	@Test
	public void getBusinessSegmentsByUserTest() {
		Map<String, Object> params = new HashMap<>();
		params.put("USERID", 1l);
		PowerMockito.when(commonJpaService.getKeyKeyValueResults(MasterDataQueries.QUERY_GET_BUSINESS_SEGMENTS_BY_USER,
				params, String.class)).thenReturn(out);
		masterDataServiceImpl.getBusinessSegmentsByUser("test");
	}

	@Test
	public void getProgramsByBusinessSegmentTest() throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_BUSINESS_SEGMENT", "TEST_SEGMENT");

		PowerMockito.when(commonJpaService
				.getKeyKeyValueResults(MasterDataQueries.QUERY_GET_PROGRAMS_BY_BUSINESS_SEGMENT, params, String.class))
				.thenReturn(out);
		masterDataServiceImpl.getProgramsByBusinessSegment("TEST_SEGMENT");
	}

	@Test
	public void getProgramsByUserAssociationTest() throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("BUSINESS_SEGMENT", "TEST_SEGMENT");
		params.put("USER_KEY", 1L);

		PowerMockito
				.when(commonJpaService.getKeyKeyValueResults(
						MasterDataQueries.QUERY_GET_PROGRAMS_BY_BUS_SEG_AND_USR_ASSOCIATION, params, String.class))
				.thenReturn(out);
		masterDataServiceImpl.getProgramsByUserAssociation("TEST_SEGMENT", 1l);
	}

	@Test
	public void getProjectYearsByBusSegAndProgramTest() throws Exception {

		List<Long> projYear = new ArrayList<Long>();
		projYear.add(1l);

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_BUSINESS_SEGMENT", "TEST_SEGMENT");
		params.put("GCM_PROGRAM_KEY", 1L);

		PowerMockito
				.when(commonJpaService.getResultList(
						MasterDataQueries.QUERY_GET_PROJ_YEARS_BY_BUSINESS_SEGMENT_AND_PROGRAM, params, Long.class))
				.thenReturn(projYear);
		masterDataServiceImpl.getProjectYearsByBusSegAndProgram("TEST_SEGMENT", 1l);
	}

	@Test
	public void getStatesTest() throws Exception {
		PowerMockito
				.when(commonJpaService.getKeyKeyValueResults(MasterDataQueries.QUERY_GET_STATES, null, String.class))
				.thenReturn(out);
		masterDataServiceImpl.getStates();
	}

	@Test
	public void getProvSpecCodesTest() throws Exception {
		Map<String, String> params = new HashMap<>();
		PowerMockito.when(
				commonJpaService.getKeyKeyValueResults(MasterDataQueries.QUERY_GET_PROV_SPEC_CODES, null, String.class))
				.thenReturn(null);
		masterDataServiceImpl.getStates();
	}

	@Test
	public void getRolesByGroupVendorTest() {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_VENDOR_KEY", 1l);
		params.put("GCM_USER_KEY", 1l);
		params.put("GCM_GROUP_KEY", 1l);
		params.put("GCM_ROLE_CODE", "test");
		params.put("USERID", "");
		PowerMockito.when(
				commonJpaService.getResultList(MasterDataQueries.QUERY_GET_ROLES_BY_GROUP_VENDOR, params, Role.class))
				.thenReturn(null);
		masterDataServiceImpl.getRolesByGroupVendor(1l, 1l, 1l, "test");

	}

	@Test
	public void getSupervisorsByVendorTest() {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_VENDOR_KEY", 1l);
		params.put("GCM_USER_KEY", 1l);
		params.put("GCM_GROUP_KEY", 1l);
		params.put("GCM_ROLE_CODE", "test");
		params.put("USERID", "");

		PowerMockito.when(
				commonJpaService.getResultList(MasterDataQueries.QUERY_GET_SUPERVISORS_FOR_VENDOR, params, User.class))
				.thenReturn(null);
		masterDataServiceImpl.getSupervisorsByVendor(1l, 1l, 1l, "test");

	}

	@Test
	public void getChartScoreTest() throws Exception {
		List<Long> chartScore = new ArrayList<Long>();
		chartScore.add(1l);
		PowerMockito.when(commonJpaService.getResultList(MasterDataQueries.QUERY_GET_CHART_SCORE_GROUP, Long.class))
				.thenReturn(chartScore);
		masterDataServiceImpl.getChartScore();
	}

	@Test
	public void getVendorsByFilterTest() throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_BUSINESS_SEGMENT", "TEST_SEGMENT");
		params.put("GCM_PROGRAM_KEY", 1L);
		params.put("GCM_BUSINESS_FUNC_KEY", 1L);
		params.put("GCM_HP_KEY", 1L);

		PowerMockito
				.when(commonJpaService.getKeyKeyValueResults(MasterDataQueries.QUERY_GET_VENDORS, params, String.class))
				.thenReturn(out);
		masterDataServiceImpl.getVendorsByFilter("TEST_SEGMENT", 1l, 1L, 1L);
	}

	@Test
	public void getVendorsByUserAssociationTest() throws Exception {

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("BUSINESS_SEGMENT", "TEST_SEGMENT");
		params.put("PROGRAM_KEY", 1L);
		params.put("GCM_BUSINESS_FUNC_KEY", 1L);
		params.put("HP_KEY", 1L);

		String queryString = MasterDataQueries.QUERY_GET_VENDORS_BY_USER_ASSOCIATION;
		String where = " ";
		where += " AND gcm_business_segment  = :BUSINESS_SEGMENT ";
		where += " AND GCM_PROGRAM_KEY = :PROGRAM_KEY ";
		where += "  AND GCM_BUSINESS_FUNC_KEY = :BUSINESS_FUNC_KEY  ";
		where += " AND GCM_HP_KEY = :HP_KEY";
		queryString = queryString.replace("#WHERE#", where);

		PowerMockito.when(commonJpaService.getKeyKeyValueResults(queryString, params, String.class)).thenReturn(out);
		masterDataServiceImpl.getVendorsByUserAssociation("TEST_SEGMENT", 1l, 1L, 1L, 1L,1L, "Test");
	}
	@Test
	public void getVendorsAssignedByUserTest() throws Exception {

		Map<String, Object> params = new HashMap<String, Object>();

		String queryString = MasterDataQueries.QUERY_GET_VENDORS_BY_USER_ASSOCIATION;
		String where = " ";
		
		queryString = queryString.replace("#WHERE#", where);

		PowerMockito.when(commonJpaService.getKeyKeyValueResults(queryString, params, String.class)).thenReturn(out);
		masterDataServiceImpl.getVendorsAssignedByUser("TEST_SEGMENT", 1l, 1L, 1L, 1L,1L, "Test");
	}
	@Test
	public void getVendorsForUserProfileTest() throws Exception {

		Map<String, Object> params = new HashMap<String, Object>();

		String queryString = MasterDataQueries.GET_VENDORS_USER_PROFILE;
		PowerMockito.when(commonJpaService.getKeyKeyValueResults(queryString, params, String.class)).thenReturn(out);
		masterDataServiceImpl.getVendorsForUserProfile(1l, 1L);
	}

	@Test
	public void getVendorsByUserRolesTest() throws Exception {

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_GROUP_KEY", 3L);
		params.put("GCM_USER_KEY", 1L);
		params.put("GCM_ROLE_CODE", "Test");
		String queryString = MasterDataQueries.QUERY_GET_VENDORS_BY_USER_ROLE_ASSOCIATION;
		PowerMockito.when(commonJpaService.getKeyKeyValueResults(queryString, params, String.class)).thenReturn(out);
		masterDataServiceImpl.getVendorsByUserRole(1L,3L, "Test");
	}

	@Test
	public void getVendorsByInvFilterTest() throws Exception {
		OptumInventoryInput optInvInput = new OptumInventoryInput();
		optInvInput.setUserKey(1L);
		optInvInput.setUserId("1");
		optInvInput.setGroupKey(1L);
		optInvInput.setRoleCode("TEST_ROLE");
		optInvInput.setBusFuncKey(1L);

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userKey", optInvInput.getUserKey());
		params.put("userId", optInvInput.getUserId());
		params.put("groupKey", optInvInput.getGroupKey());
		params.put("roleCode", optInvInput.getRoleCode());
		params.put("busFuncKey", optInvInput.getBusFuncKey());

		PowerMockito.when(commonJpaService.getKeyKeyValueResults(MasterDataQueries.FUNC_GET_VENDOR_BY_INV_FILTER,
				params, String.class)).thenReturn(out);
		masterDataServiceImpl.getVendorsByInvFilter(optInvInput);
	}

	@Test
	public void getClientsTest() throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_LOGIN_USER_KEY", 1L);
		PowerMockito
				.when(commonJpaService.getKeyKeyValueResults(MasterDataQueries.QUERY_GET_CLIENTS, params, String.class))
				.thenReturn(out);
		masterDataServiceImpl.getClients(1L);
	}

	@Test
	public void getClientsByUserAssociationTest() throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("USER_KEY", 1L);
		PowerMockito.when(commonJpaService
				.getKeyKeyValueResults(MasterDataQueries.QUERY_GET_CLIENTS_BY_USER_ASSOCIATION, params, String.class))
				.thenReturn(out);
		masterDataServiceImpl.getClientsByUserAssociation(1L);
	}

	@Test
	public void getHPByBusSegAndClientTest() throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		String query = MasterDataQueries.QUERY_GET_HP_BY_BUSINESS_SEGMENT_AND_CLIENT;
		query += " AND GCM_BUSINESS_SEGMENT = :GCM_BUSINESS_SEGMENT ";
		params.put("GCM_BUSINESS_SEGMENT", "TEST_SEGMENT");
		params.put("GCM_CLIENT_KEY", 1L);
		PowerMockito.when(commonJpaService.getKeyKeyValueResults(query, params, String.class)).thenReturn(out);
		masterDataServiceImpl.getHPByBusSegAndClient("TEST_SEGMENT", 1L);
	}

	@Test
	public void getHealthPlansByUserAssociationTest() throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("USER_KEY", 1L);
		params.put("CLIENT_KEY", 1L);
		params.put("BUSINESS_SEGMENT", "TEST_SEGMENT");
		String query = MasterDataQueries.QUERY_GET_HP_BY_BUS_SEG_USER_ASSOCIATION;
		PowerMockito.when(commonJpaService.getKeyKeyValueResults(query, params, String.class)).thenReturn(out);
		masterDataServiceImpl.getHealthPlansByUserAssociation("TEST_SEGMENT", 1L, 1L);
	}

	@Test
	public void getHPProductByBusSegAndHPTest() throws Exception {
		List<String> hpProduct = new ArrayList<String>();
		hpProduct.add("TEST_HP_PRODUCT");

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_BUSINESS_SEGMENT", "TEST_SEGMENT");
		params.put("GCM_HP_KEY", 1L);

		String query = MasterDataQueries.QUERY_GET_HP_PRODUCT_BY_HP;
		query += " AND GCM_BUSINESS_SEGMENT = :GCM_BUSINESS_SEGMENT ";
		query += " ORDER BY GCM_HP_PRODUCT ";

		PowerMockito.when(commonJpaService.getResultList(query, params, String.class)).thenReturn(hpProduct);
		masterDataServiceImpl.getHPProductByBusSegAndHP("TEST_SEGMENT", 1L);
	}

	@Test
	public void getHealthPlanProductsByUserAssociationTest() throws Exception {
		List<String> hpProduct = new ArrayList<String>();
		hpProduct.add("TEST_HP_PRODUCT");

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("BUSINESS_SEGMENT", "TEST_SEGMENT");
		params.put("USER_KEY", 1L);
		params.put("HP_KEY", 1L);

		String query = MasterDataQueries.QUERY_GET_HP_PRD_BY_HP_BUS_SEG_USER_ASSOCIATION;

		PowerMockito.when(commonJpaService.getResultList(query, params, String.class)).thenReturn(hpProduct);
		masterDataServiceImpl.getHealthPlanProductsByUserAssociation("TEST_SEGMENT", 1L, 1L);
	}

	@Test
	public void getBusinessFunctionStatusTestPositive() throws Exception {

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_BUSINESS_FUNC_KEY", 4L);
		params.put("WORK_FLOW", "TEST_WORKFLOW");

		String queryString = MasterDataQueries.QUERY_GET_STATUS_FOR_RET;

		PowerMockito.when(commonJpaService.getKeyKeyValueResults(queryString, params, String.class)).thenReturn(out);
		masterDataServiceImpl.getBusinessFunctionStatus(4L, "TEST_WORKFLOW" ,true);
	}

	@Test
	public void getBusinessFunctionStatusTestPositive1() throws Exception {

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_BUSINESS_FUNC_KEY", 4L);
		params.put("WORK_FLOW", "TEST_WORKFLOW");

		String queryString = MasterDataQueries.QUERY_GET_STATUS_FOR_RET;

		PowerMockito.when(commonJpaService.getKeyKeyValueResults(queryString, params, String.class)).thenReturn(out);
		masterDataServiceImpl.getBusinessFunctionStatus(4L, "TEST_WORKFLOW" ,false);
	}
	@Test
	public void getBusinessFunctionStatusTestPositive2() throws Exception {

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_BUSINESS_FUNC_KEY", 4L);
		params.put("WORK_FLOW", "TEST_WORKFLOW");

		String queryString = MasterDataQueries.QUERY_GET_STATUS_FOR_RET;

		PowerMockito.when(commonJpaService.getKeyKeyValueResults(queryString, params, String.class)).thenReturn(out);
		masterDataServiceImpl.getBusinessFunctionStatus(null, "TEST_WORKFLOW" ,false);
	}

	@Test
	public void getBusinessFunctionStatusTestNegative() throws Exception {

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_BUSINESS_FUNC_KEY", 1L);
		String queryString = MasterDataQueries.QUERY_GET_STATUS_BY_BUSINESS_FUNCTION;

		PowerMockito.when(commonJpaService.getKeyKeyValueResults(queryString, params, String.class)).thenReturn(out);
		masterDataServiceImpl.getBusinessFunctionStatus(1L, "TEST_WORKFLOW" ,true);
	}

	@Test
	public void getUsersForSupervisorTestPositive() throws Exception {

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_VENDOR_KEY", "1");
		params.put("GCM_ROLE_CODE", "PDM");
		params.put("GCM_LOGIN_USER_KEY", "1");

		String query = MasterDataQueries.QUERY_GET_USERS_BY_ROLE_VENDOR;
		query += " ORDER BY VALUE ASC";

		PowerMockito.when(commonJpaService.getKeyKeyValueResults(query, params, String.class)).thenReturn(out);
		masterDataServiceImpl.getUsersForSupervisor("1", "PDM", "1");
	}

	@Test
	public void getUsersForSupervisorTestNegative() throws Exception {

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_VENDOR_KEY", "1");
		params.put("GCM_ROLE_CODE", "TEST_ROLE");
		params.put("GCM_LOGIN_USER_KEY", "1");

		String query = MasterDataQueries.QUERY_GET_USERS_BY_ROLE_VENDOR;
		query += " AND GU.GCM_APPROVED_USER_KEY=:GCM_LOGIN_USER_KEY ORDER BY VALUE ASC";

		PowerMockito.when(commonJpaService.getKeyKeyValueResults(query, params, String.class)).thenReturn(out);
		masterDataServiceImpl.getUsersForSupervisor("1", "TEST_ROLE", "1");
	}

	@Test
	public void getUsersByRoleCodeTest() throws Exception {
		List<String> roleCode = new ArrayList<String>();
		roleCode.add("TEST_ROLE");

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("LOGIN_USER_KEY", 1L);
		params.put("GCM_ROLE_CODE", roleCode);

		PowerMockito.when(commonJpaService.getKeyKeyValueResults(MasterDataQueries.QUERY_GET_USERS_BY_BUSFUNCDETAIL,
				params, String.class)).thenReturn(out);
		masterDataServiceImpl.getUsersByRoleCode(roleCode, 1L);
	}

	@Test
	public void getProjectsTest() throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_BUSINESS_SEGMENT", "TEST_SEGMENT");
		params.put("GCM_LOGIN_USER_KEY", 1L);
		params.put("GCM_GROUP_KEY1", 1L);
		params.put("GCM_GROUP_KEY2", 1L);

		PowerMockito.when(commonJpaService.getKeyKeyValueResults(MasterDataQueries.QUERY_GET_PROJECTS_BUS_SEGMENT,
				params, String.class)).thenReturn(out);
		masterDataServiceImpl.getProjects("TEST_SEGMENT", 1L, 1L);
	}

	@Test
	public void segmentProjectsTest() throws Exception {
		List<SegmentProjects> segmentProjects = new ArrayList<SegmentProjects>();

		SegmentProjects segmentProject = new SegmentProjects();
		segmentProject.setBusinessSegment("TEST_SEGMENT");

		segmentProjects.add(segmentProject); 

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_LOGIN_USER_KEY", 1L);

		PowerMockito.when(commonJpaService.getResultList(MasterDataQueries.QUERY_GET_PROJECTS_WITH_BUS_SEGMENT, params,
				SegmentProjects.class)).thenReturn(segmentProjects);
		masterDataServiceImpl.segmentProjects(1L);
	}

	@Test
	public void getProjectsByUserKeyTest() throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("loginUserKey", 1L);
		params.put("groupKey", 1L);
		params.put("vendor", "TEST_VENDOR");
		PowerMockito.when(
				commonJpaService.getKeyKeyValueResults(MasterDataQueries.FUNC_GET_PROJ_BY_USER, params, String.class))
				.thenReturn(out);
		masterDataServiceImpl.getProjectsByUserKey(1L, 1L, "TEST_VENDOR", "", "", "");
	}

	@Test
	public void getProjectsByInvFilterTest() throws Exception {
		OptumInventoryInput optInvInput = new OptumInventoryInput();
		optInvInput.setUserKey(1L);
		optInvInput.setUserId("1");
		optInvInput.setGroupKey(1L);
		optInvInput.setRoleCode("TEST_ROLE");
		optInvInput.setBusFuncKey(1L);
		optInvInput.setBusSegment("TEST_SEGMENT");
		optInvInput.setProjectYear(1L);

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("userKey", optInvInput.getUserKey());
		params.put("userId", optInvInput.getUserId());
		params.put("groupKey", optInvInput.getGroupKey());
		params.put("roleCode", optInvInput.getRoleCode());
		params.put("busFuncKey", optInvInput.getBusFuncKey());
		params.put("busSegment", optInvInput.getBusSegment());
		params.put("projYear", optInvInput.getProjectYear());

		PowerMockito.when(
				commonJpaService.getKeyKeyValueResults(MasterDataQueries.FUNC_GET_PROJ_BY_FILTER, params, String.class))
				.thenReturn(out);
		masterDataServiceImpl.getProjectsByInvFilter(optInvInput);
	}

	@Test
	public void getProjectsByInvFilterForUtilityTest() {
		OptumInventoryInput optInvInput = new OptumInventoryInput();
		optInvInput.setUserKey(1L);
		optInvInput.setGroupKey(1L);
		optInvInput.setVendorKey(1L);
		optInvInput.setRoleCode("TEST_ROLE");
		optInvInput.setBusSegment("TEST_SEGMENT");

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("groupKey", optInvInput.getGroupKey());
		params.put("userKey", optInvInput.getUserKey());
		params.put("vendorKey", optInvInput.getVendorKey());
		params.put("roleCode", optInvInput.getRoleCode());
		params.put("busSegment", optInvInput.getBusSegment());

		PowerMockito.when(commonJpaService.getKeyKeyValueResults(MasterDataQueries.FUNC_GET_PROJ_BY_FILTER_FOR_UTILITY,
				params, String.class)).thenReturn(out);
		masterDataServiceImpl.getProjectsByInvFilterForUtility(optInvInput);
	}

	@Test
	public void getProviderDetailsTest() {
		List<String> providerDetails = new ArrayList<String>();
		providerDetails.add("TEST_RPOVIDER_OUTPUT");
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("p_group_key", 1L);
		params.put("p_field_value", "TEST_VALE");
		params.put("p_field_name", "TEST_NAME");

		PowerMockito.when(commonJpaService.getResultList(QUERY_GET_PROV_DETAILS, params, String.class))
				.thenReturn(providerDetails);
		masterDataServiceImpl.getProviderDetails(1L, "TEST_VALE", "TEST_NAME");
	}

	@Test
	public void getUsersCountBySupervisorTestPositive() {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_LOGIN_USER_KEY", "1");
		params.put("GCM_ROLE_CODE", "COU");
		params.put("GCM_VENDOR_KEY", "1");
		params.put("GCM_BUS_FUNC_DETAIL_KEY", "1");

		String where = " AND ( RW.GCM_BUS_FUNC_STATUS IS NULL OR RW.GCM_BUS_FUNC_STATUS IN ('ASSIGNED','INPROGRESS')) ";
		String queryString = MasterDataQueries.QUERY_GET_USERS_AND_COUNT.replace("#BUS_FUNC_STATUS#", where);

		PowerMockito.when(commonJpaService.getKeyKeyValueResults(queryString, params, String.class)).thenReturn(out);
		masterDataServiceImpl.getUsersCountBySupervisor("1", "COU", "1", "1");
	}

	@Test
	public void getUsersCountBySupervisorTestNegative() {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_LOGIN_USER_KEY", "1");
		params.put("GCM_ROLE_CODE", "SH");
		params.put("GCM_VENDOR_KEY", "1");
		params.put("GCM_BUS_FUNC_DETAIL_KEY", "1");

		String where = " AND ( RW.GCM_BUS_FUNC_STATUS IS NULL OR RW.GCM_BUS_FUNC_STATUS IN ('ASSIGNED','INPROGRESS', 'PASTDUE', 'SCHEDULED', 'PEND RELEASED') )";
		String queryString = MasterDataQueries.QUERY_GET_USERS_AND_COUNT.replace("#BUS_FUNC_STATUS#", where);

		PowerMockito.when(commonJpaService.getKeyKeyValueResults(queryString, params, String.class)).thenReturn(out);
		masterDataServiceImpl.getUsersCountBySupervisor("1", "SH", "1", "1");
	}

	@Test
	public void getSupervisorsTest() {
		List<User> userDetails = new ArrayList<User>();
		User user = new User();
		user.setUserID("TEST_USER");
		userDetails.add(user);

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_VENDOR_KEY", 1L);
		params.put("GCM_USER_KEY", 1L);
		params.put("GCM_GROUP_KEY", 1L);
		params.put("GCM_ROLE_CODE", "TEST_ROLE");
		params.put("USERID", "");

		PowerMockito.when(
				commonJpaService.getResultList(MasterDataQueries.QUERY_GET_SUPERVISORS_FOR_VENDOR, params, User.class))
				.thenReturn(userDetails);
		masterDataServiceImpl.getSupervisors(1L, 1L, 1L, "TEST_ROLE");
	}

	@Test
	public void getReasonCodesTest() {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_REASON_TYPE", "TEST_REASON_TYPE");
		params.put("GCM_BUSINESS_FUNC_KEY", 1L);

		PowerMockito.when(
				commonJpaService.getKeyKeyValueResults(MasterDataQueries.QUERY_GET_REASONCODES, params, String.class))
				.thenReturn(out);
		masterDataServiceImpl.getReasonCodes("TEST_REASON_TYPE", 1L);
	}

	@Test
	public void getProvSpecCodes() throws Exception {
		PowerMockito.when(
				commonJpaService.getKeyKeyValueResults(MasterDataQueries.QUERY_GET_PROV_SPEC_CODES, null, String.class))
				.thenReturn(null);
		masterDataServiceImpl.getProvSpecCodes();
	}

	@Test 
	public void getRolesTest() {

		List<Role> roles = new ArrayList<Role>();
		Role role = new Role();
		role.setRoleCode("TEST_ROLE_CODE");
		role.setRoleName("TEST_ROLE_NAME");
		roles.add(role);

		PowerMockito.when(commonJpaService.getResultList(MasterDataQueries.QUERY_GET_ROLES, Role.class))
				.thenReturn(roles);
		masterDataServiceImpl.getRoles();
	}
	
	/*@Test
	public void isRetrievalConfiguredTest() {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_GROUP_KEY", 1);
		params.put("SERVICE_NAME", "RETRIEVAL_NOSCHEDULING");
		Integer returnValue = 1;
		PowerMockito.when(commonJpaService.getResultObject(QUERY_SERVICE_CONFIGURED, params, Integer.class)).thenReturn(returnValue);		
		Assert.assertFalse(returnValue == 0 );
	}
	@Test
	public void isRetrievalNotConfiguredTest() {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_GROUP_KEY", 1);
		params.put("SERVICE_NAME", "RETRIEVAL_NOSCHEDULING");
		Integer returnValue = 0;
		PowerMockito.when(commonJpaService.getResultObject(QUERY_SERVICE_CONFIGURED, params, Integer.class)).thenReturn(returnValue);	
		Assert.assertTrue(returnValue == 0);
	}*/
	
	@Test
	public void isServiceConfiguredTest() {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_GROUP_KEY", 1);
		params.put("SERVICE_NAME", "SCHEDULING_SVC_ON");
		Integer returnValue = 1;
		PowerMockito.when(commonJpaService.getResultObject(QUERY_SERVICE_CONFIGURED, params, Integer.class)).thenReturn(returnValue);
		masterDataServiceImpl.isServiceConfigured("SCHEDULING_SVC_ON", 1);
		Assert.assertFalse(returnValue == 0 );
	}
	
	@Test
	public void isBusFuncConfiguredTest() throws SQLException {
		Long returnValue = 1L;
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_GROUP_KEY", 1);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(),Mockito.anyMap(),Mockito.any(Class.class))).thenReturn(returnValue);
		masterDataServiceImpl.isBusFuncConfigured(gcmConfigInput);
		Assert.assertFalse(returnValue == 0 );
	}
	
	@Test
	public void isServiceNotConfiguredTest() {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_GROUP_KEY", 1);
		params.put("SERVICE_NAME", "SCHEDULING_SVC_ON");
		Integer returnValue = 0;
		PowerMockito.when(commonJpaService.getResultObject(QUERY_SERVICE_CONFIGURED, params, Integer.class)).thenReturn(returnValue);
		masterDataServiceImpl.isServiceConfigured("SCHEDULING_SVC_ON", 1);
		Assert.assertTrue(returnValue == 0);
	}
	
	@Test
	public void getVendorListDetailsTest() {
		masterDataServiceImpl.getVendorListDetails(7l, 7l, "Test", 7l);
	}
	
	@Test
	public void getBusinessFunctionDetailsTest() {
		masterDataServiceImpl.getBusinessFunctionDetails(7l);
	}
	
	@Test
	public void isRetrievalConfiguredTest() {
		PowerMockito.when(commonJpaService.getResultObject(Matchers.anyString(), Matchers.anyMap(),Matchers.any())).thenReturn(1);
		masterDataServiceImpl.isRetrievalConfigured(1997);
	}
	
}