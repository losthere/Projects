package com.optum.gcm.sevice;

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
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.dao.EmptyResultDataAccessException;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.crypto.GcmAESCrypto;
import com.optum.gcm.exception.GcmApplicationException;
import com.optum.gcm.model.GCMUser;
import com.optum.gcm.model.GCMUserGroup;
import com.optum.gcm.model.GCMUserVendor;
import com.optum.gcm.model.GcmRoleVendorList;
import com.optum.gcm.model.GcmRoleVendors;
import com.optum.gcm.model.GcmUserVendorRole;
import com.optum.gcm.model.KeyValue;
import com.optum.gcm.model.LoginProperties;
import com.optum.gcm.model.StgExtUserInfo;
import com.optum.gcm.model.UserLogin;
import com.optum.gcm.model.UserResource;
import com.optum.gcm.model.UserVendor;

@RunWith(PowerMockRunner.class)
public class UserCreationServiceTest {

	@InjectMocks
	private UserCreationService userCreationService;

	@Mock
	private CommonJpaService commonJpaService;

	@Mock
	private static String documentumUserProperty;

	@Mock
	private static String documentumSessionProperty;

	@Mock
	private static String documentumUserPropertyVal;

	@Mock
	private static String documentumSessionPropertyVal;

	@Mock
	private static String documentumEndPointURI;

	@Mock
	private static String loginUrl;

	@Mock
	private static String verifyUrl;

	@Mock
	private static String reportsUrl;

	@Mock
	private static String relyingId;

	@Mock
	private UserVendor userVendor;

	@Mock
	private List<GCMUserGroup> userGroups;

	@Mock
	private List<GCMUserVendor> userVendors;

	@Mock
	private GCMUser user;

	@Mock
	private List<GcmUserVendorRole> userRoles;

	protected static final String QUERY_VERIFY_USER = "SELECT count(1) IS_USER_EXISTS FROM GCM_USER where upper(userid)=:USERID and IS_ACTIVE_SW='Y'";

	private static String GET_STG_USER_BY_EMAIL = "SELECT SU.* FROM STG_EXT_USER_INFO SU WHERE SU.IS_VALID='Y' AND UPPER(SU.EMAIL)=:EMAIL ";

	private static String GET_REPORTS_TO_DETAILS = "SELECT GCM_USER_KEY FROM GCM_USER WHERE UPPER(USERID) = :USERID";

	private static String GET_USER_VENDOR_DETAILS = "SELECT COUNT(1) FROM GCM_USER_VENDOR WHERE GCM_USER_KEY = :GCM_USER_KEY AND GCM_VENDOR_KEY=:GCM_VENDOR_KEY";

	@Test
	public void getUserVendorKey() throws Exception {

		Map<String, Object> paramsUserDetails = new HashMap<>();
		paramsUserDetails.put("GCM_USER_KEY", 1l);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.anyObject()))
				.thenReturn(null);
		userCreationService.getUserVendorKey(1l);
	}

	@Test
	public void getUserRoles() throws Exception {

		Map<String, Object> paramsUserRole = new HashMap<>();
		paramsUserRole.put("GCM_USER_KEY", 1L);
		paramsUserRole.put("GCM_VENDOR_KEY", 1L);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.anyObject()))
				.thenReturn(null);
		userCreationService.getUserRoles(1l, 1l);
	}

	/*
	 * @SuppressWarnings("unchecked")
	 * 
	 * @Test public void testcreateUser() throws Exception { StgExtUserInfo
	 * stgExtUserInfo = new StgExtUserInfo(); stgExtUserInfo.setEmail("test");
	 * stgExtUserInfo.setReportsToUserID("test"); stgExtUserInfo.setRole("test");
	 * stgExtUserInfo.setGcmVendorKey("test"); Map<String, Object> paramsUserDetails
	 * = new HashMap<>(); UserResource userResouceDetails =
	 * Mockito.mock(UserResource.class); paramsUserDetails.put("USERID", "TEST");
	 * Map<String, Object> paramsExtUserDetails = new HashMap<>();
	 * paramsExtUserDetails.put("EMAIL", "TEST"); Map<String, Object>
	 * paramsUserVendorDetails = new HashMap<>();
	 * paramsUserVendorDetails.put("GCM_USER_KEY", 3L);
	 * paramsUserVendorDetails.put("GCM_VENDOR_KEY", "test");
	 * 
	 * PowerMockito.when(commonJpaService.getResultObject(QUERY_VERIFY_USER,
	 * paramsUserDetails, Integer.class)).thenReturn(1);
	 * PowerMockito.when(commonJpaService.getResultObject(GET_STG_USER_BY_EMAIL,
	 * paramsExtUserDetails, StgExtUserInfo.class)).thenReturn(stgExtUserInfo);
	 * PowerMockito.when(commonJpaService.getResultObject(GET_REPORTS_TO_DETAILS,
	 * paramsUserDetails, String.class)).thenReturn("test");
	 * PowerMockito.when(commonJpaService.getResultObject(GET_USER_VENDOR_DETAILS,
	 * paramsUserVendorDetails, Integer.class)).thenReturn(2);
	 * PowerMockito.when(commonJpaService.persist(user)).thenReturn(3L);
	 * //PowerMockito.when().thenReturn(userResouceDetails);
	 * //PowerMockito.when().thenReturn(userGroups);
	 * //PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(),
	 * Mockito.anyMap(), Mockito.anyObject())).thenReturn(userVendors); //
	 * PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(),
	 * Mockito.anyMap(), Mockito.anyObject())).thenReturn(userRoles); //int
	 * isUserExists = 10; userResouceDetails.setUserKey("test");
	 * userCreationService.createUser("test", "test", "qwe", "ertyu",
	 * "test","fghjkl", "cvbnm"); }
	 */

	@SuppressWarnings("unchecked")
	@Test
	public void testgetGCMUserDetails() throws Exception {
		Map<String, Object> paramsUserDetails = new HashMap<>();
		UserResource userResouceDetails = Mockito.mock(UserResource.class);
		paramsUserDetails.put("USERID", "test");
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.anyObject()))
				.thenReturn(userGroups);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.anyObject()))
				.thenReturn(userVendors);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.anyObject()))
				.thenReturn(userRoles);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.anyObject()))
				.thenReturn(userResouceDetails);
		userResouceDetails.setUserKey("test");
		userCreationService.GetGCMUserDetails("test");
	}
	@Test
	public void testgetGCMUserDetails1() throws Exception {
		Map<String, Object> paramsUserDetails = new HashMap<>();
		UserResource userResouceDetails = Mockito.mock(UserResource.class);
		paramsUserDetails.put("USERID", "test");
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.anyObject()))
				.thenThrow(EmptyResultDataAccessException.class);
		userCreationService.GetGCMUserDetails("test");
	}

	@Test
	public void testgetUser() throws Exception {
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(),
				Mockito.<Class<GCMUser>> any())).thenThrow(EmptyResultDataAccessException.class);
		userCreationService.getUser("test");

	}

	@Test
	public void testgetLoginProperties() throws Exception {

		LoginProperties login = Mockito.mock(LoginProperties.class);
		userCreationService.getLoginProperties();

	}

	@Test
	public void testrecordUserLogin() throws Exception {
		boolean isLoginRecorded = true;
		UserLogin userLogin = Mockito.mock(UserLogin.class);
		userLogin.setGcmUserKey(1L);
		userLogin.setLogInTime(new java.sql.Timestamp(System.currentTimeMillis()));
		userLogin.setLogOffTime(new java.sql.Timestamp(System.currentTimeMillis()));
		userLogin.setIpInfo("test");
		userLogin.setBrowserInfo("test");
		userLogin.setLogOffMode("test");
		userLogin.setCreateUser("test");
		userLogin.setModifiedUser("test");
		userLogin.setCreateDate(new java.sql.Timestamp(System.currentTimeMillis()));
		userLogin.setModifiedDate(new java.sql.Timestamp(System.currentTimeMillis()));
		PowerMockito.when(userCreationService.recordUserLogin(1l, "test", "test")).thenThrow(Exception.class);
	}

	@Test
	public void testrecordUserLogOff() throws Exception {

		Map<String, Object> paramsLogoffDetails = new HashMap<>();

		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.anyObject()))
				.thenReturn(null);

		UserLogin userlogin = Mockito.mock(UserLogin.class);
		UserLogin userLogOn = Mockito.mock(UserLogin.class);
		UserCreationService userlog = Mockito.mock(UserCreationService.class);
		/*
		 * PowerMockito.when(userCreationService.recordUserLogOff("test", "test"))
		 * .thenThrow(EmptyResultDataAccessException.class);
		 */
		userLogOn.setLogOffTime(new java.sql.Timestamp(System.currentTimeMillis()));
		userLogOn.setLogOffMode("test");

		paramsLogoffDetails.put("LOGOFF_TIME", new java.sql.Timestamp(System.currentTimeMillis()));
		paramsLogoffDetails.put("LOG_OFF_MODE", "test");
		paramsLogoffDetails.put("GCM_USER_LOGON_KEY", "test");
		PowerMockito.when(commonJpaService.update(Mockito.anyString(), Mockito.anyMap())).thenReturn(4);
		userCreationService.recordUserLogOff("test", "test");

	}

	@Test
	public void testrecordUserLogOff2() throws Exception {

		Map<String, Object> paramsLogoffDetails = new HashMap<>();
		UserLogin userLogOn=new UserLogin();
		PowerMockito.when( commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(),
				Mockito.<Class<UserLogin>> any())).thenReturn(userLogOn);


		userLogOn.setLogOffTime(new java.sql.Timestamp(System.currentTimeMillis()));
		userLogOn.setLogOffMode("test");

		paramsLogoffDetails.put("LOGOFF_TIME", new java.sql.Timestamp(System.currentTimeMillis()));
		paramsLogoffDetails.put("LOG_OFF_MODE", "test");
		paramsLogoffDetails.put("GCM_USER_LOGON_KEY", "test");
		PowerMockito.when(commonJpaService.update(Mockito.anyString(), Mockito.anyMap())).thenReturn(4);
		userCreationService.recordUserLogOff("test", "T");

	}
	@Test
	public void testrecordUserLogOff3() throws Exception {

		Map<String, Object> paramsLogoffDetails = new HashMap<>();
		UserLogin userLogOn=new UserLogin();
		PowerMockito.when( commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(),
				Mockito.<Class<UserLogin>> any())).thenReturn(userLogOn);


		userLogOn.setLogOffTime(new java.sql.Timestamp(System.currentTimeMillis()));
		userLogOn.setLogOffMode("test");

		paramsLogoffDetails.put("LOGOFF_TIME", new java.sql.Timestamp(System.currentTimeMillis()));
		paramsLogoffDetails.put("LOG_OFF_MODE", "test");
		paramsLogoffDetails.put("GCM_USER_LOGON_KEY", "test");
		PowerMockito.when(commonJpaService.update(Mockito.anyString(), Mockito.anyMap())).thenReturn(4);
		userCreationService.recordUserLogOff("test", "TT");

	}
	@Test
	public void testrecordUserLogOff4() throws Exception {

		Map<String, Object> paramsLogoffDetails = new HashMap<>();
		UserLogin userLogOn=new UserLogin();
		PowerMockito.when( commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(),
				Mockito.<Class<UserLogin>> any())).thenThrow(EmptyResultDataAccessException.class);


		userLogOn.setLogOffTime(new java.sql.Timestamp(System.currentTimeMillis()));
		userLogOn.setLogOffMode("test");

		paramsLogoffDetails.put("LOGOFF_TIME", new java.sql.Timestamp(System.currentTimeMillis()));
		paramsLogoffDetails.put("LOG_OFF_MODE", "test");
		paramsLogoffDetails.put("GCM_USER_LOGON_KEY", "test");
		PowerMockito.when(commonJpaService.update(Mockito.anyString(), Mockito.anyMap())).thenReturn(4);
		userCreationService.recordUserLogOff("test", "TT");

	}
	@Test
	public void testgetUserVendorByGroupKey() {
		List<GcmRoleVendorList> userRoles=new ArrayList<>();
		GcmRoleVendorList e=new GcmRoleVendorList();
		e.setGcmRoleCode("Test");
		userRoles.add(e);
		PowerMockito.when(commonJpaService.getResultList(Matchers.anyString(), Matchers.anyMap(),Mockito.<Class<GcmRoleVendorList>> any())).thenReturn(userRoles);
		userCreationService.getUserVendorByGroupKey(1l, 1l);
	}

	/*
	 * @Test public void testgetUserRegionsByGroup() {
	 * userCreationService.getUserRegionsByGroup(1l, 1l, "test", 1l); }
	 */

	@Test
	public void testsetLoginUrl() throws Exception {
		userCreationService.setLoginUrl("test");
	}

	@Test
	public void testsetVerifyUrl() throws Exception {
		userCreationService.setVerifyUrl("test");
	}

	@Test
	public void testsetRelyingid() throws Exception {
		userCreationService.setRelyingid("test");
	}

	@Test
	public void testsetReportsUrl() throws Exception {
		userCreationService.setReportsUrl("test");
	}

	@Test
	public void setDocumentumUserProperty() throws Exception {
		userCreationService.setDocumentumUserProperty("test");
		userCreationService.getDocumentumUserProperty();
	}

	@Test
	public void setDocumentumSessionProperty() throws Exception {
		userCreationService.setDocumentumSessionProperty("test");
		userCreationService.getDocumentumSessionProperty();
	}

	@Test
	public void setDocumentumUserPropertVal() throws Exception {
		userCreationService.setDocumentumUserPropertVal("test");
		userCreationService.getDocumentumUserPropertyVal();
	}

	@Test
	public void setDocumentumSessionPropertyVal() throws Exception {
		userCreationService.setDocumentumSessionPropertyVal("test");
		userCreationService.getDocumentumSessionPropertyVal();
	}

	@Test
	public void setDocumentumEndPointURI() throws Exception {
		userCreationService.setDocumentumEndPointURI("URI");
		userCreationService.getDocumentumEndPointURI();
	}

	@Test
	public void testaddRolesToUser() throws Exception {
		PowerMockito.when(commonJpaService.getResultObject(Matchers.anyString(), Matchers.anyMap(), Mockito.<Class<Integer>> any())).thenReturn(0).thenReturn("Test");
		userCreationService.addRolesToUser(1l, "test", "test");
	}

	@Test(expected = Exception.class)
	public void testgetEncryptedString() {
		GcmAESCrypto crypto = new GcmAESCrypto("test", "test", "test");
		userCreationService.getEncryptedString("test", "test");
	}
	@Test
	public void testgetUserRegionsByGroup() {
		userCreationService.getUserRegionsByGroup(7l, 7l, "Test", 7l);
	}
	@Test
	public void testcreateUser() {
		UserResource userResouceDetails=new UserResource();
		userResouceDetails.setUserKey("7");
		PowerMockito.when(commonJpaService.getResultObject(Matchers.anyString(), Matchers.anyMap(), Mockito.<Class<Integer>> any())).thenReturn(1).thenReturn(userResouceDetails);
		userCreationService.createUser("Test", "Test", "Test", "Test", "Test", "Test", "Test");
	}
	@Test(expected=GcmApplicationException.class)
	public void testcreateUser1() {
		UserResource userResouceDetails=new UserResource();
		userResouceDetails.setUserKey("7");
		StgExtUserInfo extUserInfo=new StgExtUserInfo();
		extUserInfo.setEmail("Test@optum.com");
		extUserInfo.setReportsToUserID("Test");
		PowerMockito.when(commonJpaService.getResultObject(Matchers.anyString(), Matchers.anyMap(), Mockito.<Class<Integer>> any())).thenReturn(0).thenReturn(userResouceDetails);
		PowerMockito.when(commonJpaService.getResultObject(Matchers.anyString(), Matchers.anyMap(), Mockito.<Class<Integer>> any())).thenReturn(0).thenReturn(extUserInfo).thenReturn("Test");
		userCreationService.createUser("Test", "Test", "Test", "Test", "Test", "Test", "Test");
	}
	@Test
	public void testcreateUser2() {
		UserResource userResouceDetails=new UserResource();
		userResouceDetails.setUserKey("7");
		StgExtUserInfo extUserInfo=new StgExtUserInfo();
		extUserInfo.setEmail("Test@optum.com");
		extUserInfo.setReportsToUserID("Test");
		PowerMockito.when(commonJpaService.getResultObject(Matchers.anyString(), Matchers.anyMap(), Mockito.<Class<Integer>> any())).thenReturn(0).thenReturn(userResouceDetails);
		PowerMockito.when(commonJpaService.getResultObject(Matchers.anyString(), Matchers.anyMap(), Mockito.<Class<Integer>> any())).thenReturn(0).thenReturn(extUserInfo).thenReturn("");
		userCreationService.createUser("Test", "Test", "Test", "Test", "Test", "Test", "Test");
	}

}