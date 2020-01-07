package com.optum.gcm.sevice;

import static org.junit.Assert.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.common.RemoveUserinDocumentum;
import com.optum.gcm.common.dao.CommonJpaDao;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.dao.constants.SchedulingWorkFlowQueries;
import com.optum.gcm.model.GCMUser;
import com.optum.gcm.model.GcmMailContent;
import com.optum.gcm.model.GcmMailId;
import com.optum.gcm.model.GcmUserRole;
import com.optum.gcm.model.Role;
import com.optum.gcm.model.UserAdminFilter;
import com.optum.gcm.model.UserAdminModel;
import com.optum.gcm.model.UserData;
import com.rsa.cryptoj.c.gc;

import ch.qos.logback.core.boolex.Matcher;

@RunWith(PowerMockRunner.class)
public class UserAdministrationServiceTest {

	@InjectMocks
	protected UserAdministrationService userAdministrationService;

	@Mock
	private CommonJpaService commonJpaService;

	@Mock
	private CommonJpaDao commonJpaDao;
	private static final String USER_DETAILS = "SELECT USERID, LAST_NAME, FIRST_NAME, EMAIL FROM GCM_USER WHERE GCM_USER_KEY =:GCM_USER_KEY";

	private static final String GET_ACTIVE_USER_DETAILS = "SELECT * FROM GCM_USER WHERE GCM_USER_KEY =:GCM_USER_KEY AND IS_ACTIVE_SW='Y'";

	private static final String UPDATE_SUPERVISOR = "UPDATE GCM_USER SET GCM_APPROVED_USER_KEY =:SUPERVISOR_ID, MODIFY_USERID =:MODIFY_USERID, "
			+ " MODIFY_DATE_TIME = SYSDATE WHERE GCM_USER_KEY =:GCM_USER_KEY";

	private static final String IN_ACTIVE_USER = "UPDATE GCM_USER SET IS_ACTIVE_SW =:IS_ACTIVE_SW, MODIFY_USERID =:MODIFY_USERID, MODIFY_DATE_TIME = SYSDATE WHERE GCM_USER_KEY =:GCM_USER_KEY";

	private static final String USER_ROLES_LIST = "SELECT GRL.GCM_ROLE_CODE, GRL.GCM_ROLE_NAME FROM GCM_ROLE_LIST GRL INNER JOIN GCM_USER_ROLE GUR ON GRL.GCM_ROLE_CODE = GUR.GCM_ROLE_CODE"
			+ " WHERE GUR.GCM_USER_KEY =:GCM_USER_KEY AND GUR.GCM_VENDOR_KEY=:GCM_VENDOR_KEY AND GUR.IS_ACTIVE_SW = 'Y' AND GRL.GCM_ROLE_CODE != 'SA' ";

	private static final String OUTREACH_SH_ROLE_CODE = "SH";

	private static final String EMR_SH_ROLE_CODE = "ESH";

	private static final String PEND_MGR_ROLE_CODE = "PDM";

	private static final String QUERY_GET_USER_VENDOR_MAPPING = "SELECT COUNT(*) FROM GCM_USER_VENDOR WHERE GCM_USER_KEY =:GCM_USER_KEY AND GCM_VENDOR_KEY =:GCM_VENDOR_KEY AND IS_ACTIVE_SW ='Y' ";

	private static final String QUERY_GET_APPT_CNT_BY_USER_VENDOR = "SELECT COUNT(AP.GCM_RET_APPT_KEY) FROM GCM_RET_APPT AP JOIN GCM_RET_WI WI ON WI.GCM_RET_APPT_KEY = AP.GCM_RET_APPT_KEY "
			+ " WHERE AP.GCM_VENDOR_KEY = :GCM_VENDOR_KEY AND AP.GCM_USER_KEY = :GCM_USER_KEY "
			+ " AND WI.GCM_BUS_FUNC_DETAIL_KEY = :GCM_BUS_FUNC_DETAIL_KEY "
			+ " AND AP.APPT_STATUS NOT IN ('CANCELED', 'COMPLETED', 'PEND')";
	private static final String GET_MAIL_CONTENT = "SELECT SUBJECT,CONTENT,CONTENT_TYPE FROM GCM_MAIL_CONFIG WHERE GCM_CONFIG_NAME=:GCM_CONFIG_NAME";
	private static final String GET_MAIL_ID = "SELECT NAME,MAIL_ID,TYPE FROM GCM_MAIL_ID WHERE GCM_CONFIG_NAME=:GCM_CONFIG_NAME";

	private static final String GET_INPROGRESS_OPTUM_CODING_WORKITEM_COUNT = "SELECT COUNT(*) FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR "
			+ " WHERE GCM_USER_KEY = :GCM_USER_KEY   "
			+ " AND GCM_BUS_FUNC_STATUS IN ('ASSIGNED', 'INPROGRESS', 'ESCALATED') ";


	@Test
	public void testGetUserAdminList() throws Exception {
		UserAdminFilter userAdminFilter = new UserAdminFilter();
		userAdminFilter.setLastName("Test");
		userAdminFilter.setFirstName("Test");
		userAdminFilter.setUserId("Test");
		userAdminFilter.setRole("Test");
		userAdminFilter.setSupervisor(7L);
		userAdminFilter.setStatus("Test");
		List<UserAdminModel> results = new ArrayList<>();
		UserAdminModel e = new UserAdminModel();
		e.setRoleCnt("1");
		results.add(e);
		PowerMockito.when(commonJpaService.getResultList(Matchers.anyString(), Matchers.anyMap(),
				Matchers.<Class<UserAdminModel>>any())).thenReturn(results);
		userAdministrationService.getUserAdminList(userAdminFilter);

	}

	@Test
	public void testGetUserAdminList1() throws Exception {
		UserAdminFilter userAdminFilter = new UserAdminFilter();
		userAdminFilter.setLastName("");
		userAdminFilter.setFirstName("");
		userAdminFilter.setUserId("");
		userAdminFilter.setRole("");
		userAdminFilter.setSupervisor(7L);
		userAdminFilter.setStatus("");
		List<UserAdminModel> results = new ArrayList<>();
		UserAdminModel e = new UserAdminModel();
		e.setRoleCnt("7");
		results.add(e);
		PowerMockito.when(commonJpaService.getResultList(Matchers.anyString(), Matchers.anyMap(),
				Matchers.<Class<UserAdminModel>>any())).thenReturn(results);
		userAdministrationService.getUserAdminList(userAdminFilter);

	}
	
	@Test
	public void getUserRolesListTest() throws SQLException {
		userAdministrationService.getUserRolesList(7l, 7l);
	}
	@Test
	public void InactivateUserTest() throws SQLException {
		userAdministrationService.InactivateUser(7l, 7l);
	}
	@Test
	public void InactivateUserTest1() throws SQLException {
		List<Role> results=new ArrayList<>();
		Role e1=new Role();
		e1.setRoleName("Test");
		e1.setRoleCode("SH");
		results.add(e1);
		GCMUser userObj=new GCMUser();
		userObj.setUserID("Test");
		PowerMockito.when(commonJpaService.getResultList(Matchers.anyString(), Mockito.anyMap(),Mockito.<Class<Role>> any())).thenReturn(results);
		PowerMockito.when(commonJpaService.getResultObject(Matchers.anyString(), Matchers.anyMap(), Matchers.<Class<GCMUser>> any())).thenReturn(userObj);
		PowerMockito.when(commonJpaService.getResultObject(Matchers.anyString(), Matchers.anyMap(), Matchers.<Class<Integer>> any())).thenReturn(5);
		userAdministrationService.InactivateUser(7l, 7l);
	}
	@Test
	public void InactivateUserTest3() throws SQLException {
		List<Role> results=new ArrayList<>();
		Role e1=new Role();
		e1.setRoleName("Test");
		e1.setRoleCode("SH");
		results.add(e1);
		GCMUser userObj=new GCMUser();
		userObj.setUserID("Test");
		PowerMockito.when(commonJpaService.getResultList(Matchers.anyString(), Mockito.anyMap(),Mockito.<Class<Role>> any())).thenReturn(results);
		PowerMockito.when(commonJpaService.getResultObject(Matchers.anyString(), Matchers.anyMap(), Matchers.<Class<GCMUser>> any())).thenReturn(userObj);
		PowerMockito.when(commonJpaService.getResultObject(Matchers.anyString(), Matchers.anyMap(), Matchers.<Class<Integer>> any())).thenReturn(0);
		userAdministrationService.InactivateUser(7l, 7l);
	}
	@Test
	public void InactivateUserTest4() throws SQLException {
		List<Role> results=new ArrayList<>();
		Role e1=new Role();
		e1.setRoleName("Test");
		e1.setRoleCode("COU");
		results.add(e1);
		GCMUser userObj=new GCMUser();
		userObj.setUserID("Test");
		PowerMockito.when(commonJpaService.getResultList(Matchers.anyString(), Mockito.anyMap(),Mockito.<Class<Role>> any())).thenReturn(results);
		PowerMockito.when(commonJpaService.getResultObject(Matchers.anyString(), Matchers.anyMap(), Matchers.<Class<GCMUser>> any())).thenReturn(userObj);
		PowerMockito.when(commonJpaService.getResultObject(Matchers.anyString(), Matchers.anyMap(), Matchers.<Class<Integer>> any())).thenReturn(0);
		userAdministrationService.InactivateUser(7l, 7l);
	}
	@Test
	public void InactivateUserTest5() throws SQLException {
		List<Role> results=new ArrayList<>();
		Role e1=new Role();
		e1.setRoleName("Test");
		e1.setRoleCode("QA");
		results.add(e1);
		GCMUser userObj=new GCMUser();
		userObj.setUserID("Test");
		PowerMockito.when(commonJpaService.getResultList(Matchers.anyString(), Mockito.anyMap(),Mockito.<Class<Role>> any())).thenReturn(results);
		PowerMockito.when(commonJpaService.getResultObject(Matchers.anyString(), Matchers.anyMap(), Matchers.<Class<GCMUser>> any())).thenReturn(userObj);
		PowerMockito.when(commonJpaService.getResultObject(Matchers.anyString(), Matchers.anyMap(), Matchers.<Class<Integer>> any())).thenReturn(0);
		userAdministrationService.InactivateUser(7l, 7l);
	}
	@Test
	public void InactivateUserTest6() throws SQLException {
		List<Role> results=new ArrayList<>();
		Role e1=new Role();
		e1.setRoleName("PNPP");
		e1.setRoleCode("QA");
		results.add(e1);
		GCMUser userObj=new GCMUser();
		userObj.setUserID("Test");
		PowerMockito.when(commonJpaService.getResultList(Matchers.anyString(), Mockito.anyMap(),Mockito.<Class<Role>> any())).thenReturn(results);
		PowerMockito.when(commonJpaService.getResultObject(Matchers.anyString(), Matchers.anyMap(), Matchers.<Class<GCMUser>> any())).thenReturn(userObj);
		PowerMockito.when(commonJpaService.getResultObject(Matchers.anyString(), Matchers.anyMap(), Matchers.<Class<Integer>> any())).thenReturn(0);
		userAdministrationService.InactivateUser(7l, 7l);
	}
	@Test
	public void InactivateUserTest2() throws SQLException {
		List<Role> results=new ArrayList<>();
		Role e1=new Role();
		e1.setRoleName("Test");
		e1.setRoleCode("SRH");
		results.add(e1);
		GCMUser userObj=new GCMUser();
		userObj.setUserID("Test");
		PowerMockito.when(commonJpaService.getResultList(Matchers.anyString(), Mockito.anyMap(),Mockito.<Class<Role>> any())).thenReturn(results);
		PowerMockito.when(commonJpaService.getResultObject(Matchers.anyString(), Matchers.anyMap(), Matchers.<Class<GCMUser>> any())).thenReturn(userObj);
		userAdministrationService.InactivateUser(7l, 7l);
	}

	@Test
	public void changeSupervisorTest() throws SQLException {
		List<UserAdminModel> users=new ArrayList<>();
		UserAdminModel e=new UserAdminModel();
		e.setNewSupervisorId(7l);
		e.setLoginUserKey(7l);
		e.setSupervisorId(7l);
		e.setUserKey(7l);
		users.add(e);
		UserData loginUserObj=new UserData();
		loginUserObj.setUserId("Test");
		GcmMailContent gcmMailContent=new GcmMailContent();
		gcmMailContent.setContent("Test");
		gcmMailContent.setSubject("Test");
		gcmMailContent.setContentType("HTML");
		GCMUser userObj=new GCMUser();
		
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(),Mockito.<Class<UserData>> any())).thenReturn(loginUserObj).thenReturn(gcmMailContent).thenReturn(userObj);
		List<Role> results=new ArrayList<>();
		Role e1=new Role();
		e1.setRoleName("Test");
		results.add(e1);
		PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(),Mockito.<Class<Role>> any())).thenReturn(results);
		userAdministrationService.changeSupervisor(users);
	}
	
	@Test
	public void activateUserTest() throws SQLException {
		List<String> roleCodes=new ArrayList<>();
		roleCodes.add("Test");
		GCMUser userObj =new GCMUser();
		userObj.setUserID("Test");
		userObj.setReportsToUserKey("252");
		UserData loginUserObj=new UserData();
		GcmMailContent gcmMailContent=new GcmMailContent();
		gcmMailContent.setContentType("HTMl");
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(),Mockito.<Class<GCMUser>> any())).thenReturn(userObj);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(),Mockito.<Class<GCMUser>> any())).thenReturn(userObj).thenReturn(loginUserObj).thenReturn(gcmMailContent);
		userAdministrationService.activateUser("Test@optum.com", 7l, 7l, 7l, roleCodes, 7l);
	}
	@Test
	public void validateTest() throws SQLException {
		userAdministrationService.validateUser("Test", 78l);
	}
	@Test
	public void updateUserRolesTest2() throws SQLException {
		List<String> newRoles=new ArrayList<>();
		List<String> existingRoleCodes=new ArrayList<>();
		existingRoleCodes.add("SBH");
		userAdministrationService.updateUserRoles(7l, 7l, 7l, newRoles, existingRoleCodes, "Test", true);
	}
	@Test
	public void updateUserRolesTest() throws SQLException {
		List<String> newRoles=new ArrayList<>();
		List<String> existingRoleCodes=new ArrayList<>();
		existingRoleCodes.add("OSH");
		String USER_ROLES_TO_UPDATE="Test";
		Map existingRolesparams=new HashMap<>();
		List<GcmUserRole> existingRolesList=new ArrayList<>();
		GcmUserRole e=new GcmUserRole();
		e.setRoleCode("Test");
		e.setIsActive("Y");
		existingRolesList.add(e);
		PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(),Mockito.<Class<GcmUserRole>> any())).thenReturn(existingRolesList);
		userAdministrationService.updateUserRoles(7l, 7l, 7l, newRoles, existingRoleCodes, "Test", true);
	}
	@Test
	public void updateUserRolesTest1() throws SQLException {
		List<String> newRoles=new ArrayList<>();
		List<String> existingRoleCodes=new ArrayList<>();
		userAdministrationService.updateUserRoles(7l, 7l, 7l, newRoles, existingRoleCodes, "Test", true);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testGetUserAdminList_RoleCNtZero() throws Exception {

		UserAdminFilter userAdminFilter = new UserAdminFilter();
		userAdminFilter.setVendorKey(1L);
		userAdminFilter.setLastName("TEST_LAST_NAME");
		userAdminFilter.setFirstName("TEST_FIRST_NAME");
		userAdminFilter.setUserId("1");
		userAdminFilter.setRole("TEST_ROLE");
		userAdminFilter.setSupervisor(1L);
		userAdminFilter.setStatus("TEST");

		Map<String, Object> params = new HashMap<>();
		params.put("gcm_vendor_key", userAdminFilter.getVendorKey());

		List<UserAdminModel> results = new ArrayList<UserAdminModel>();

		UserAdminModel userAdminModel = new UserAdminModel();
		userAdminModel.setRoleCnt("0");
		results.add(userAdminModel);
		// PowerMockito.when(commonJpaService.getResultList(Mockito.eq(queryString),
		// Mockito.anyMap(), Mockito.any()))
		// .thenReturn(results);
		PowerMockito.doReturn(results).when(commonJpaService).getResultList(Mockito.anyString(), Mockito.anyMap(),
				Mockito.any());
		userAdministrationService.getUserAdminList(userAdminFilter);
	}

	@Test
	public void testUserRolesList() throws SQLException {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_USER_KEY", 1L);
		params.put("GCM_VENDOR_KEY", 1L);

		List<Role> results = new ArrayList<Role>();
		Role role = new Role();
		role.setRoleCode("TEST_ROLE");
		results.add(role);

		PowerMockito.when(commonJpaService.getResultList(USER_ROLES_LIST, params, Role.class)).thenReturn(results);
		userAdministrationService.getUserRolesList(1L, 1L);
	}

	@Test
	public void testChangeSupervisor() throws SQLException {
		List<UserAdminModel> users = new ArrayList<UserAdminModel>();
		UserAdminModel userAdminModel = new UserAdminModel();
		userAdminModel.setNewSupervisorId(1L);
		userAdminModel.setSupervisorId(1l);
		userAdminModel.setUserKey(1L);
		userAdminModel.setLoginUserKey(1l);
		users.add(userAdminModel);

		Map<String, Object> newSupervisorParams = new HashMap<>();
		newSupervisorParams.put("GCM_USER_KEY", users.get(0).getNewSupervisorId());

		UserData loginUserObj = new UserData();
		loginUserObj.setUserId("1");
		PowerMockito.when(commonJpaService.getResultObject(USER_DETAILS, newSupervisorParams, UserData.class))
				.thenReturn(loginUserObj);

		Map<String, Object> loginParams = new HashMap<>();
		loginParams.put("GCM_USER_KEY", users.get(0).getLoginUserKey());
		PowerMockito.when(commonJpaService.getResultObject(USER_DETAILS, loginParams, UserData.class))
				.thenReturn(loginUserObj);

		Map<String, Object> userParams = new HashMap<>();
		userParams.put("GCM_USER_KEY", 1l);

		PowerMockito.when(commonJpaService.getResultObject(USER_DETAILS, userParams, UserData.class))
				.thenReturn(loginUserObj);

		Map<String, Object> currentSupervisorParams = new HashMap<>();
		currentSupervisorParams.put("GCM_USER_KEY", 1l);

		PowerMockito.when(commonJpaService.getResultObject(USER_DETAILS, currentSupervisorParams, UserData.class))
				.thenReturn(loginUserObj);

		Map<String, Object> updateParams = new HashMap<>();
		updateParams.put("SUPERVISOR_ID", 1l);
		updateParams.put("MODIFY_USERID", "1");
		updateParams.put("GCM_USER_KEY", 1l);
		PowerMockito.when(commonJpaService.update(UPDATE_SUPERVISOR, updateParams)).thenReturn(1);

		userAdministrationService.changeSupervisor(users);

	}

	@Test
	public void testInactiveUser() throws SQLException {
		Map<String, Object> loginParams = new HashMap<>();
		loginParams.put("GCM_USER_KEY", 5l);
		UserData loginUserObj = new UserData();
		loginUserObj.setUserId("5");
		PowerMockito.when(commonJpaService.getResultObject(USER_DETAILS, loginParams, UserData.class))
				.thenReturn(loginUserObj);
		Long userKey = 5l;
		Map<String, Object> userParams = new HashMap<>();
		userParams.put("GCM_USER_KEY", 5l);
		PowerMockito.when(commonJpaService.getResultObject(USER_DETAILS, userParams, UserData.class))
				.thenReturn(loginUserObj);
		Map<String, Object> updateParams = new HashMap<>();
		updateParams.put("IS_ACTIVE_SW", "N");
		updateParams.put("MODIFY_USERID", loginUserObj.getUserId());
		updateParams.put("GCM_USER_KEY", 5l);
		PowerMockito.when(commonJpaService.update(IN_ACTIVE_USER, updateParams)).thenReturn(1);
		assertEquals("SUCCESS", userAdministrationService.InactivateUser(userKey, (long) 5));
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testInactiveUser1() throws SQLException {
		List<Object> list=new ArrayList<>();
		Role role=new Role();
		role.setRoleCode("PDM");
		list.add(role);
		PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn(list);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn(33);
		 userAdministrationService.InactivateUser(33l, 10l);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testInactiveUser2() throws SQLException {
		List<Object> list=new ArrayList<>();
		Role role=new Role();
		role.setRoleCode("SH");
		list.add(role);
		PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn(list);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn(0);
		 userAdministrationService.InactivateUser(33l, 10l);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testInactiveUser3() throws SQLException {
		List<Object> list=new ArrayList<>();
		Role role=new Role();
		role.setRoleCode("PDM");
		list.add(role);
		PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn(list);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn(0);
		 userAdministrationService.InactivateUser(33l, 10l);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testInactiveUser4() throws SQLException {
		List<Object> list=new ArrayList<>();
		Role role=new Role();
		role.setRoleCode("OCSP");
		list.add(role);
		PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn(list);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn(33);
		 userAdministrationService.InactivateUser(33l, 10l);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testInactiveUser5() throws SQLException {
		List<Object> list=new ArrayList<>();
		Role role=new Role();
		role.setRoleCode("OQA");
		list.add(role);
		PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn(list);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn(33);
		 userAdministrationService.InactivateUser(33l, 10l);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testInactiveUser6() throws SQLException {
		List<Object> list=new ArrayList<>();
		Role role=new Role();
		role.setRoleCode("PNPP");
		list.add(role);
		PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn(list);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn(33);
		 userAdministrationService.InactivateUser(33l, 10l);
	}

	@SuppressWarnings("unchecked")
	@Test
	public void testUpdateUserRolesEMR() throws Exception {
		List<String> newRoles=new ArrayList<>();
		List<String> existingRoleCodes=new ArrayList<>();
		existingRoleCodes.add("PDM");
		Map params=new HashMap<>();
		UserData loginUserObj1=new UserData();
		PowerMockito.when(commonJpaService.getResultObject("query", params, Integer.class)).thenReturn(loginUserObj1);
		userAdministrationService.updateUserRoles(1l, 1l, 1l, newRoles, existingRoleCodes,"test", true);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testUpdateUserRolesEMR1() throws Exception {
		List<String> newRoles=new ArrayList<>();
		List<String> existingRoleCodes=new ArrayList<>();
		existingRoleCodes.add("OCSP");
		userAdministrationService.updateUserRoles(1l, 1l, 1l, newRoles, existingRoleCodes,"test", true);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testUpdateUserRolesEMR2() throws Exception {
		List<String> newRoles=new ArrayList<>();
		List<String> existingRoleCodes=new ArrayList<>();
		existingRoleCodes.add("OQA");
		userAdministrationService.updateUserRoles(1l, 1l, 1l, newRoles, existingRoleCodes,"test", true);
	}
	@Test
	public void testUpdateUserRolesEMR3() throws Exception {
		List<String> newRoles=new ArrayList<>();
		List<String> existingRoleCodes=new ArrayList<>();
		existingRoleCodes.add("PNPP");
		userAdministrationService.updateUserRoles(1l, 1l, 1l, newRoles, existingRoleCodes,"test", true);
	}
	@Test
	public void testUpdateUserRolesEMR4() throws Exception {
		List<String> newRoles=new ArrayList<>();
		List<String> existingRoleCodes=new ArrayList<>();
		userAdministrationService.updateUserRoles(1l, 1l, 1l, newRoles, existingRoleCodes,"test", true);
	}
	@Test
	public void testactivateUser() throws SQLException {
		UserData test=new UserData();
		List<String> newRoles2 = new ArrayList<String>();
		test.setUserId("userId");
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.any())).thenReturn(test);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn(test);
		userAdministrationService.activateUser("test", 1l, 1l, 1l,newRoles2,1l);
	}
	@Test
	public void testactivateUser1() throws SQLException {
		UserData test=new UserData();
		List<String> newRoles1 = new ArrayList<String>();
		test.setUserId("userId");
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.any())).thenReturn(test);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn(33);
		userAdministrationService.activateUser("test", 1l, 1l, 1l,newRoles1,1l);
	}
	@Test
	public void testvalidateUser() throws SQLException {
	userAdministrationService.validateUser("tst", 33l);
	}

	
}
