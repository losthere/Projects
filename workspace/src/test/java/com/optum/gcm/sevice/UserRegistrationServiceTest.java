package com.optum.gcm.sevice;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import java.util.ArrayList;
import java.util.List;
import javax.mail.internet.MimeMessage;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.powermock.api.mockito.PowerMockito;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.GCMUser;
import com.optum.gcm.model.GCMUserVendor;
import com.optum.gcm.model.GcmMailContent;
import com.optum.gcm.model.GcmMailId;
import com.optum.gcm.model.InsertStgUser;
import com.optum.gcm.model.InsertStgUserObject;
import com.optum.gcm.model.StgExtUserFileInfo;
import com.optum.gcm.model.StgExtUserInfo;
import com.optum.gcm.model.UserFileHistory;

@RunWith(MockitoJUnitRunner.class)
public class UserRegistrationServiceTest {

	@Mock
	private CommonJpaService commonJpaService;
	@Mock
	private JavaMailSender mailSender;
	@Mock
	MimeMessageHelper msgHelper;
	@Mock
	MimeMessage mimeMessage;
	@Mock
	StgExtUserInfo stgExtUserInfo;
	@Mock
	InsertStgUser insertStgUser;
	@Mock
	InsertStgUserObject insertStgUserObj;
	@Mock
	StgExtUserFileInfo stgExtUserFileInfo;
	@Mock
	List<StgExtUserInfo> stgExtUsers;
	@InjectMocks
	UserRegistrationService userRegistrationService;

	@SuppressWarnings("unchecked")
	@Test
	public void getUserFileHistoryTest() {

		UserFileHistory userFileHistory1 = new UserFileHistory();
		List<UserFileHistory> userFileHistory = new ArrayList<UserFileHistory>();
		userFileHistory.add(userFileHistory1);
		PowerMockito.doReturn(userFileHistory).when(commonJpaService).getResultList(Mockito.anyString(),
				Mockito.anyMap(), Mockito.any());
		assertEquals(userFileHistory, userRegistrationService.getUserFileHistory((long) 5));
	}

	@SuppressWarnings("unchecked")
	@Test
	public void getValidatedExtUsersTest() {

		StgExtUserInfo stgExtUserInfo1 = new StgExtUserInfo();
		List<StgExtUserInfo> validatedUsers = new ArrayList<StgExtUserInfo>();
		validatedUsers.add(stgExtUserInfo1);
		PowerMockito.doReturn(validatedUsers).when(commonJpaService).getResultList(Mockito.anyString(),
				Mockito.anyMap(), Mockito.any());
		assertEquals(validatedUsers, userRegistrationService.getValidatedExtUsers((long) 5, (long) 6));
	}

	@SuppressWarnings("unchecked")
	@Test
	public void getValidExtUserTest() {
		StgExtUserInfo stgExtUserInfo = new StgExtUserInfo();
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any()))
				.thenReturn(stgExtUserInfo);
		assertEquals(stgExtUserInfo, userRegistrationService.getValidExtUser("TestString"));
	}

	@SuppressWarnings("unchecked")
	@Test
	public void validateAndUpdateExtUsersTest() {
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any()))
				.thenReturn(stgExtUserInfo);
		PowerMockito.when(commonJpaService.update(Mockito.anyString(), Mockito.anyMap())).thenReturn(5);
		PowerMockito.when(insertStgUserObj.getInsertStgUser()).thenReturn(insertStgUser);
		PowerMockito.when(insertStgUser.getStgExtUserInfo()).thenReturn(stgExtUsers);
		PowerMockito.when(insertStgUser.getStgExtUserFileInfo()).thenReturn(stgExtUserFileInfo);
		assertNotNull(userRegistrationService.validateAndUpdateExtUsers(insertStgUserObj));
	}

	@SuppressWarnings("unchecked")
	@Test
	public void sendUserRegistrationMailForExtUserTest() {
		UserRegistrationService spyService = Mockito.spy(userRegistrationService);
		final String GET_MAIL_CONTENT = "SELECT SUBJECT,CONTENT,CONTENT_TYPE FROM GCM_MAIL_CONFIG WHERE GCM_CONFIG_NAME=:GCM_CONFIG_NAME";
		GcmMailContent gcmMailContent = new GcmMailContent();
		gcmMailContent.setContent("HTML");
		gcmMailContent.setContentType("HTML");
		gcmMailContent.setSubject("subject");
		List<GcmMailId> gcmMailIdList = new ArrayList<>();
		GcmMailId gcmMailId1 = new GcmMailId();
		gcmMailId1.setType("FROM");
		gcmMailId1.setMailId("1");
		GcmMailId gcmMailId2 = new GcmMailId();
		gcmMailId2.setType("TO");
		gcmMailId2.setMailId("2");
		GcmMailId gcmMailId3 = new GcmMailId();
		gcmMailId3.setType("CC");
		gcmMailId3.setMailId("3");
		gcmMailIdList.add(gcmMailId1);
		gcmMailIdList.add(gcmMailId2);
		gcmMailIdList.add(gcmMailId3);
		Long extFileKey = (long) 5;

		StgExtUserInfo sExtUserInfo = new StgExtUserInfo();
		sExtUserInfo.setIsValid("N");
		sExtUserInfo.setFirstName("testFname");
		sExtUserInfo.setLastName("testLname");
		sExtUserInfo.setEmail("Test@mail.com");
		sExtUserInfo.setRole("testRole");
		sExtUserInfo.setStgExtUserFileInfoKey(extFileKey);
		sExtUserInfo.setStgExtUserInfoKey(extFileKey);
		sExtUserInfo.setReportsToUserID("reportsToUserID");
		sExtUserInfo.setContactAddress1("contactAddress1");
		sExtUserInfo.setContactAddress2("contactAddress2");
		sExtUserInfo.setContactCity("contactCity");
		sExtUserInfo.setContactState("contactState");
		sExtUserInfo.setContactZipCode("contactZipCode");
		sExtUserInfo.setOrganizationName("organizationName");
		sExtUserInfo.setAccMgrUserID("accMgrUserID");
		sExtUserInfo.setModifiedBy("modifiedBy");
		List<StgExtUserInfo> sExtUsers = new ArrayList<>();
		sExtUsers.add(sExtUserInfo);
		GCMUser userDetails = new GCMUser();
		userDetails.setEmail("email");
		Mockito.doReturn(sExtUserInfo).when(spyService).getValidStgExtUserByKey(Mockito.anyLong());
		Mockito.doReturn(userDetails).when(spyService).getUserDetailsByUserId(Mockito.anyString());
		Mockito.doReturn(mimeMessage).when(mailSender).createMimeMessage();
		PowerMockito
				.when(commonJpaService.getResultObject(Mockito.eq(GET_MAIL_CONTENT), Mockito.anyMap(), Mockito.any()))
				.thenReturn(gcmMailContent);
	}

	@SuppressWarnings("unchecked")
	@Test
	public void getValidStgExtUserByKeyTest() {
		final String GET_STG_USER_BY_KEY = "SELECT SU.* FROM STG_EXT_USER_INFO SU WHERE SU.IS_VALID='Y' AND SU.STG_EXT_USER_INFO_KEY=:STG_EXT_USER_INFO_KEY ";
		StgExtUserInfo validatedUser = new StgExtUserInfo();
		Long extFileKey = (long) 5;
		PowerMockito.when(
				commonJpaService.getResultObject(Mockito.eq(GET_STG_USER_BY_KEY), Mockito.anyMap(), Mockito.any()))
				.thenReturn(validatedUser);
		assertEquals(validatedUser, userRegistrationService.getValidStgExtUserByKey(extFileKey));
	}

	@SuppressWarnings("unchecked")
	@Test
	public void getUserDetailsByUserIdTest() {
		final String GET_ACTIVE_USER_DETAILS = "SELECT * FROM GCM_USER WHERE UPPER(USERID)=:USERID AND IS_ACTIVE_SW='Y'";
		GCMUser userDetails = new GCMUser();
		PowerMockito.when(
				commonJpaService.getResultObject(Mockito.eq(GET_ACTIVE_USER_DETAILS), Mockito.anyMap(), Mockito.any()))
				.thenReturn(userDetails);
		assertEquals(userDetails, userRegistrationService.getUserDetailsByUserId("5"));
	}

	@SuppressWarnings("unchecked")
	@Test
	public void getGroupKeyByFileKeyTest() {
		final String GET_USER_GROUP_BY_FILEKEY = "SELECT GCM_GROUP_KEY FROM STG_EXT_USER_FILE_INFO WHERE STG_EXT_USER_FILE_INFO_KEY=:STG_EXT_USER_FILE_INFO_KEY ";
		Integer extFileKey = 5;
		PowerMockito.when(commonJpaService.getResultObject(Mockito.eq(GET_USER_GROUP_BY_FILEKEY), Mockito.anyMap(),
				Mockito.any())).thenReturn(extFileKey);
		assertEquals(extFileKey, userRegistrationService.getGroupKeyByFileKey((long)extFileKey));
	}

	@Test
	public void validateAndInsertExtUsersTest() {
		long extFileKey = (long) 5;
		Long[] temp = { (long) 5 };
		StgExtUserInfo sExtUserInfo = new StgExtUserInfo();
		sExtUserInfo.setIsValid("true");
		sExtUserInfo.setFirstName("testFname");
		sExtUserInfo.setLastName("testLname");
		sExtUserInfo.setEmail("Test@mail.com");
		sExtUserInfo.setStgExtUserFileInfoKey(extFileKey);
		List<StgExtUserInfo> sExtUsers = new ArrayList<>();
		sExtUsers.add(sExtUserInfo);
		UserRegistrationService spyService = Mockito.spy(userRegistrationService);
		Mockito.doReturn(stgExtUserInfo).when(spyService).insertExtUser(Mockito.anyObject(), Mockito.anyLong(), Mockito.anyString());
		Mockito.doReturn((long) 5).when(spyService).updateFileInfo(Mockito.anyObject());
		PowerMockito.when(commonJpaService.persist(Mockito.anyObject())).thenReturn(temp);
		PowerMockito.when(insertStgUserObj.getInsertStgUser()).thenReturn(insertStgUser);
		PowerMockito.when(insertStgUser.getStgExtUserInfo()).thenReturn(sExtUsers);
		PowerMockito.when(insertStgUser.getStgExtUserFileInfo()).thenReturn(stgExtUserFileInfo);
		assertNotNull(spyService.validateAndInsertExtUsers(insertStgUserObj));
	}

	@SuppressWarnings("unchecked")
	@Test
	public void validateAndUpdateExtUsers_stgExtUsersTest() {
		long extFileKey = (long) 5;
		StgExtUserInfo sExtUserInfo = new StgExtUserInfo();
		sExtUserInfo.setIsValid("true");
		sExtUserInfo.setFirstName("testFname");
		sExtUserInfo.setLastName("testLname");
		sExtUserInfo.setEmail("Test@mail.com");
		sExtUserInfo.setStgExtUserFileInfoKey(extFileKey);
		List<StgExtUserInfo> sExtUsers = new ArrayList<>();
		sExtUsers.add(sExtUserInfo);
		UserRegistrationService spyService = Mockito.spy(userRegistrationService);

		Mockito.doReturn(stgExtUserInfo).when(spyService).updateExtUser(Mockito.anyObject(), Mockito.anyLong(), Mockito.anyString());
		Mockito.doReturn((long) 5).when(spyService).updateFileInfo(Mockito.anyObject());

		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any()))
				.thenReturn(stgExtUserInfo);
		PowerMockito.when(commonJpaService.update(Mockito.anyString(), Mockito.anyMap())).thenReturn(5);

		PowerMockito.when(insertStgUserObj.getInsertStgUser()).thenReturn(insertStgUser);
		PowerMockito.when(insertStgUser.getStgExtUserInfo()).thenReturn(sExtUsers);
		PowerMockito.when(insertStgUser.getStgExtUserFileInfo()).thenReturn(stgExtUserFileInfo);

		assertNotNull(spyService.validateAndUpdateExtUsers(insertStgUserObj));
	}

	/*@SuppressWarnings("unchecked")
	@Test
	public void updateExtUserTest() {
		final String GET_GCM_USER_COUNT_BY_EMAIL = "SELECT COUNT(1) IS_USER_EXISTS FROM GCM_USER_VENDOR_GROUP_VW GUVW,GCM_USER GU WHERE GUVW.GCM_USER_KEY = GU.GCM_USER_KEY AND UPPER(GU.EMAIL)=:EMAIL AND GUVW.GCM_GROUP_KEY=:GCM_GROUP_KEY ";
		final String GET_STG_USER_COUNT_BY_EMAIL_EXCEPT_CURRENT = "SELECT COUNT(SU.STG_EXT_USER_INFO_KEY) AS IS_USER_EXISTS FROM STG_EXT_USER_INFO SU,STG_EXT_USER_FILE_INFO SUF WHERE SU.STG_EXT_USER_FILE_INFO_KEY=SUF.STG_EXT_USER_FILE_INFO_KEY AND SU.IS_VALID='Y' AND UPPER(SU.EMAIL)=:EMAIL AND SU.STG_EXT_USER_INFO_KEY!=:STG_EXT_USER_INFO_KEY AND SUF.GCM_GROUP_KEY=:GCM_GROUP_KEY ";
		final String GET_STG_USER_COUNT_BY_EMAIL = "SELECT COUNT(SU.STG_EXT_USER_INFO_KEY) AS IS_USER_EXISTS FROM STG_EXT_USER_INFO SU,STG_EXT_USER_FILE_INFO SUF WHERE SU.STG_EXT_USER_FILE_INFO_KEY=SUF.STG_EXT_USER_FILE_INFO_KEY AND SU.IS_VALID='Y' AND UPPER(SU.EMAIL)=:EMAIL AND SUF.GCM_GROUP_KEY=:GCM_GROUP_KEY ";
		final String VERIFY_ROLE_CODE = "SELECT COUNT(1) ROLE_COUNT FROM GCM_ROLE_LIST GRL,GCM_ROLE_GROUP GRG WHERE  UPPER(GRL.GCM_ROLE_CODE)= UPPER(GRG.GCM_ROLE_CODE) AND GRG.GCM_GROUP_KEY=:GCM_GROUP_KEY AND  UPPER(GRL.GCM_ROLE_CODE)=:GCM_ROLE_CODE";
		final String GET_GCM_REPORTS_USER = "SELECT COUNT(1) AS REPORTS_TO_COUNT FROM GCM_USER_VENDOR_GROUP_VW GUVW,GCM_USER GU WHERE GUVW.GCM_USER_KEY = GU.GCM_USER_KEY AND UPPER(GU.USERID)=:USERID AND GUVW.GCM_GROUP_KEY=:GCM_GROUP_KEY ";
		final String GET_DEFAULT_VENDOR_BY_GROUP = "SELECT GV.GCM_VENDOR_KEY,GV.VENDOR_NAME,GV.VENDOR_CODE,GV.IS_DEFAULT_SW  "
				+ "			FROM GCM_VENDOR GV " + "			WHERE  GV.GCM_GROUP_KEY    = :GCM_GROUP_KEY  "
				+ "			AND GV.IS_DEFAULT_SW='Y' ";
		final String GET_GCM_VENDOR = "SELECT DISTINCT  "
				+ "	  GV.GCM_VENDOR_KEY,GV.VENDOR_NAME,GV.VENDOR_CODE,GV.IS_DEFAULT_SW  " + "	FROM GCM_VENDOR GV "
				+ "	WHERE UPPER(GV.VENDOR_NAME)=:VENDOR_NAME  " + "	AND GV.GCM_GROUP_KEY = :GCM_GROUP_KEY ";

		final String UPDATE_STG_USER = "UPDATE STG_EXT_USER_INFO " + "SET FIRST_NAME             =:FIRST_NAME, "
				+ "  LAST_NAME                =:LAST_NAME, " + "  IS_VALID                 =:IS_VALID, "
				+ "  ORGANIZATION_NAME        =:ORGANIZATION_NAME, "
				+ "  REPORTS_TO_USERID        =:REPORTS_TO_USERID, " + "  GCM_VENDOR_KEY           =:GCM_VENDOR_KEY, "
				+ "  ROLE                     =:ROLE, " + "  EMAIL                    =:EMAIL, "
				+ "  VAL_MESSAGE              =:VAL_MESSAGE, " + "  CONTACT_ADDRESS_1        =:CONTACT_ADDRESS_1, "
				+ "  CONTACT_ADDRESS_2        =:CONTACT_ADDRESS_2, " + "  CONTACT_CITY             =:CONTACT_CITY, "
				+ "  CONTACT_STATE            =:CONTACT_STATE, " + "  CONTACT_ZIP_CODE         =:CONTACT_ZIP_CODE, "
				+ "  MODIFIED_BY              =:MODIFIED_BY, " + "  MODIFIED_DATE_TIME       =:MODIFIED_DATE_TIME "
				+ "WHERE STG_EXT_USER_INFO_KEY=:STG_EXT_USER_INFO_KEY";
		long extFileKey = (long) 5;
		StgExtUserInfo sExtUserInfo = new StgExtUserInfo();
		sExtUserInfo.setIsValid("N");
		sExtUserInfo.setFirstName("testFname");
		sExtUserInfo.setLastName("testLname");
		sExtUserInfo.setEmail("Test@mail.com");
		sExtUserInfo.setRole("testRole");
		sExtUserInfo.setStgExtUserFileInfoKey(extFileKey);
		sExtUserInfo.setStgExtUserInfoKey(extFileKey);
		sExtUserInfo.setReportsToUserID("reportsToUserID");
		sExtUserInfo.setContactAddress1("contactAddress1");
		sExtUserInfo.setContactAddress2("contactAddress2");
		sExtUserInfo.setContactCity("contactCity");
		sExtUserInfo.setContactState("contactState");
		sExtUserInfo.setContactZipCode("contactZipCode");
		sExtUserInfo.setOrganizationName("organizationName");
		sExtUserInfo.setAccMgrUserID("accMgrUserID");
		sExtUserInfo.setModifiedBy("modifiedBy");
		List<StgExtUserInfo> sExtUsers = new ArrayList<>();
		sExtUsers.add(sExtUserInfo);

		GCMUserVendor organization = new GCMUserVendor();
		organization.setGcmVendorKey("gcmVendorKey");
		organization.setVendorName("vendorName");

		// UserRegistrationService usService = new UserRegistrationService();
		UserRegistrationService spyService = Mockito.spy(userRegistrationService);

		Mockito.doReturn(extFileKey).when(spyService).getGroupKeyByFileKey(Mockito.anyLong());
		Mockito.doReturn(5).when(spyService).sendUserRegistrationMailForExtUser(Mockito.anyLong());

		PowerMockito.when(commonJpaService.getResultObject(Mockito.eq(GET_GCM_USER_COUNT_BY_EMAIL), Mockito.anyMap(),
				Mockito.any())).thenReturn(0);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.eq(GET_STG_USER_COUNT_BY_EMAIL_EXCEPT_CURRENT),
				Mockito.anyMap(), Mockito.any())).thenReturn(0);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.eq(GET_STG_USER_COUNT_BY_EMAIL), Mockito.anyMap(),
				Mockito.any())).thenReturn(1);
		PowerMockito
				.when(commonJpaService.getResultObject(Mockito.eq(VERIFY_ROLE_CODE), Mockito.anyMap(), Mockito.any()))
				.thenReturn(1);
		PowerMockito.when(
				commonJpaService.getResultObject(Mockito.eq(GET_GCM_REPORTS_USER), Mockito.anyMap(), Mockito.any()))
				.thenReturn(1);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.eq(GET_DEFAULT_VENDOR_BY_GROUP), Mockito.anyMap(),
				Mockito.any())).thenReturn(organization);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.eq(GET_GCM_VENDOR), Mockito.anyMap(), Mockito.any()))
				.thenReturn(organization);
		PowerMockito.when(commonJpaService.update(Mockito.eq(UPDATE_STG_USER), Mockito.anyMap())).thenReturn(5);
		assertEquals(sExtUserInfo, spyService.updateExtUser(sExtUserInfo, (long) 5));
	}
*/
	@SuppressWarnings("unchecked")
	@Test
	public void updateExtUser_VendorDetailsNull_Test() {
		final String GET_GCM_USER_COUNT_BY_EMAIL = "SELECT COUNT(1) IS_USER_EXISTS FROM GCM_USER_VENDOR_GROUP_VW GUVW,GCM_USER GU WHERE GUVW.GCM_USER_KEY = GU.GCM_USER_KEY AND UPPER(GU.EMAIL)=:EMAIL AND GUVW.GCM_GROUP_KEY=:GCM_GROUP_KEY ";
		final String GET_STG_USER_COUNT_BY_EMAIL_EXCEPT_CURRENT = "SELECT COUNT(SU.STG_EXT_USER_INFO_KEY) AS IS_USER_EXISTS FROM STG_EXT_USER_INFO SU,STG_EXT_USER_FILE_INFO SUF WHERE SU.STG_EXT_USER_FILE_INFO_KEY=SUF.STG_EXT_USER_FILE_INFO_KEY AND SU.IS_VALID='Y' AND UPPER(SU.EMAIL)=:EMAIL AND SU.STG_EXT_USER_INFO_KEY!=:STG_EXT_USER_INFO_KEY AND SUF.GCM_GROUP_KEY=:GCM_GROUP_KEY ";
		final String GET_STG_USER_COUNT_BY_EMAIL = "SELECT COUNT(SU.STG_EXT_USER_INFO_KEY) AS IS_USER_EXISTS FROM STG_EXT_USER_INFO SU,STG_EXT_USER_FILE_INFO SUF WHERE SU.STG_EXT_USER_FILE_INFO_KEY=SUF.STG_EXT_USER_FILE_INFO_KEY AND SU.IS_VALID='Y' AND UPPER(SU.EMAIL)=:EMAIL AND SUF.GCM_GROUP_KEY=:GCM_GROUP_KEY ";
		final String VERIFY_ROLE_CODE = "SELECT COUNT(1) ROLE_COUNT FROM GCM_ROLE_LIST GRL,GCM_ROLE_GROUP GRG WHERE  UPPER(GRL.GCM_ROLE_CODE)= UPPER(GRG.GCM_ROLE_CODE) AND GRG.GCM_GROUP_KEY=:GCM_GROUP_KEY AND  UPPER(GRL.GCM_ROLE_CODE)=:GCM_ROLE_CODE";
		final String GET_GCM_REPORTS_USER = "SELECT COUNT(1) AS REPORTS_TO_COUNT FROM GCM_USER_VENDOR_GROUP_VW GUVW,GCM_USER GU WHERE GUVW.GCM_USER_KEY = GU.GCM_USER_KEY AND UPPER(GU.USERID)=:USERID AND GUVW.GCM_GROUP_KEY=:GCM_GROUP_KEY ";
		final String GET_DEFAULT_VENDOR_BY_GROUP = "SELECT GV.GCM_VENDOR_KEY,GV.VENDOR_NAME,GV.VENDOR_CODE,GV.IS_DEFAULT_SW  "
				+ "			FROM GCM_VENDOR GV " + "			WHERE  GV.GCM_GROUP_KEY    = :GCM_GROUP_KEY  "
				+ "			AND GV.IS_DEFAULT_SW='Y' ";
		long extFileKey = (long) 5;
		Integer groupKey = 5;
		StgExtUserInfo sExtUserInfo = new StgExtUserInfo();
		sExtUserInfo.setIsValid("true");
		sExtUserInfo.setFirstName("testFname");
		sExtUserInfo.setLastName("testLname");
		sExtUserInfo.setEmail("Test@mail.com");
		sExtUserInfo.setRole("testRole;SA");
		sExtUserInfo.setStgExtUserFileInfoKey(extFileKey);
		sExtUserInfo.setStgExtUserInfoKey(extFileKey);
		sExtUserInfo.setReportsToUserID("reportsToUserID");
		sExtUserInfo.setContactAddress1("contactAddress1");
		sExtUserInfo.setContactAddress2("contactAddress2");
		sExtUserInfo.setContactCity("contactCity");
		sExtUserInfo.setContactState("contactState");
		sExtUserInfo.setContactZipCode("contactZipCode");
		sExtUserInfo.setOrganizationName("organizationName");
		sExtUserInfo.setAccMgrUserID("accMgrUserID");
		sExtUserInfo.setModifiedBy("modifiedBy");
		List<StgExtUserInfo> sExtUsers = new ArrayList<>();
		sExtUsers.add(sExtUserInfo);

		GCMUserVendor organization = new GCMUserVendor();
		organization.setGcmVendorKey("gcmVendorKey");
		organization.setVendorName("vendorName");
		UserRegistrationService spyService = Mockito.spy(userRegistrationService);
		Mockito.doReturn(groupKey).when(spyService).getGroupKeyByFileKey(Mockito.anyLong());
		PowerMockito.when(commonJpaService.getResultObject(Mockito.eq(GET_GCM_USER_COUNT_BY_EMAIL), Mockito.anyMap(),
				Mockito.any())).thenReturn(0);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.eq(GET_STG_USER_COUNT_BY_EMAIL_EXCEPT_CURRENT),
				Mockito.anyMap(), Mockito.any())).thenReturn(0);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.eq(GET_STG_USER_COUNT_BY_EMAIL), Mockito.anyMap(),
				Mockito.any())).thenReturn(1);
		PowerMockito
				.when(commonJpaService.getResultObject(Mockito.eq(VERIFY_ROLE_CODE), Mockito.anyMap(), Mockito.any()))
				.thenReturn(1);
		PowerMockito.when(
				commonJpaService.getResultObject(Mockito.eq(GET_GCM_REPORTS_USER), Mockito.anyMap(), Mockito.any()))
				.thenReturn(1);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.eq(GET_DEFAULT_VENDOR_BY_GROUP), Mockito.anyMap(),
				Mockito.any())).thenReturn(organization);
		assertEquals(sExtUserInfo, spyService.updateExtUser(sExtUserInfo, (long) 5, "test"));
	}

}
