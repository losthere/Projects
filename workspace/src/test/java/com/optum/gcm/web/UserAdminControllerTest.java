package com.optum.gcm.web;



import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.exception.ServiceException;
import com.optum.gcm.model.GCMUser;
import com.optum.gcm.model.InsertStgUserObject;
import com.optum.gcm.model.KeyValue;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.model.StgExtUserFileInfo;
import com.optum.gcm.model.UserResource;
import com.optum.gcm.sevice.UserCreationService;
import com.optum.gcm.sevice.UserRegistrationService;

@RunWith(PowerMockRunner.class)
public class UserAdminControllerTest {

	@InjectMocks
	UserAdminController useradmincontroller;
	@Mock
	UserCreationService userCreationService;
	@Mock
	UserRegistrationService userRegistrationService;
	@Mock
	private RestResponse<UserResource> restResponse;
	@Mock
	private UserResource userlogin;
	

	@Test
	public void testcreateUser() throws SQLException {
		HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
		useradmincontroller.createUser(request);
	}
	@Test
	public void testcreateUser_() throws SQLException {
		HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
		PowerMockito.when(useradmincontroller.createUser(request)).thenReturn(null);
		useradmincontroller.createUser(request);
	}
	@Test
	public void testcreateUser_1() throws SQLException {
		UserResource value=new UserResource();
		value.setUserKey("");
		value.setErrorMsg("ERRORRRRR");
		PowerMockito.when(userCreationService.createUser(Mockito.anyString(),Mockito.anyString(),Mockito.anyString(),Mockito.anyString(),Mockito.anyString(),Mockito.anyString(),Mockito.anyString())).thenReturn(value);
		HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
		useradmincontroller.createUser(request);
	}
	@Test
	public void testcreateUser_4() throws SQLException {
		UserResource value=new UserResource();
		value.setUserKey("9");
		value.setErrorMsg(" ");
		PowerMockito.when(userCreationService.createUser(Mockito.anyString(),Mockito.anyString(),Mockito.anyString(),Mockito.anyString(),Mockito.anyString(),Mockito.anyString(),Mockito.anyString())).thenReturn(value);
		HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
		useradmincontroller.createUser(request);
	}
	@Test
	public void testgetUser() throws SQLException {
		HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
	GCMUser value=new GCMUser();
	PowerMockito.when(userCreationService.getUser(Mockito.anyString())).thenReturn(value);
		useradmincontroller.getUser(request);
	}

	@Test
	public void testgetUser1() throws SQLException {
		HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
	GCMUser value=new GCMUser();
	PowerMockito.when(userCreationService.getUser(Mockito.anyString())).thenReturn(null);
		useradmincontroller.getUser(request);
	}

	@SuppressWarnings("unchecked")
	@Test
	public void testgetLoginProperties() throws SQLException {
		PowerMockito.when(userCreationService.getLoginProperties()).thenThrow(ServiceException.class);
		useradmincontroller.getLoginProperties();
	}
	@Test
	public void testgetLoginProperties_() throws SQLException {
		useradmincontroller.getLoginProperties();
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testrecordUserLogOff() throws SQLException {
		PowerMockito.when(useradmincontroller.recordUserLogOff("test", "test")).thenThrow(Exception.class);
		useradmincontroller.recordUserLogOff("test", "test");
	}
	@Test 
	public void testrecordUserLogOff_() throws SQLException {
		useradmincontroller.recordUserLogOff("test", "test");
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testgetUserFileHistory() throws SQLException {
		PowerMockito.when(useradmincontroller.getUserFileHistory(5L)).thenThrow(Exception.class);
		useradmincontroller.getUserFileHistory(5L);
	}

	@SuppressWarnings("unchecked")
	@Test
	public void testgetUserRoles() throws SQLException {
		PowerMockito.when(useradmincontroller.getUserRoles(5L, 4L)).thenThrow(Exception.class);
		useradmincontroller.getUserRoles(5L, 4L);
	}

	@SuppressWarnings("unchecked")
	@Test
	public void testgetValidatedExtUsers() throws SQLException {
		StgExtUserFileInfo stgExtUserFileInfo = Mockito.mock(StgExtUserFileInfo.class);
		PowerMockito.when(useradmincontroller.getValidatedExtUsers(stgExtUserFileInfo)).thenThrow(Exception.class);
		useradmincontroller.getValidatedExtUsers(stgExtUserFileInfo);
	}

	@SuppressWarnings("unchecked")
	@Test
	public void testgetValidExtUser() throws SQLException {
		PowerMockito.when(useradmincontroller.getValidExtUser("test")).thenThrow(Exception.class);
		useradmincontroller.getValidExtUser("test");
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testAddUserRole() throws SQLException {
		PowerMockito.when(useradmincontroller.addUserRole(5L, "test", "test")).thenThrow(Exception.class);
		useradmincontroller.addUserRole(5L, "test", "test");
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testvalidateAndInsertExtUsers() throws SQLException {
		InsertStgUserObject insertStgUserObject = Mockito.mock(InsertStgUserObject.class);
		PowerMockito.when(useradmincontroller.validateAndInsertExtUsers(insertStgUserObject)).thenThrow(Exception.class);
		useradmincontroller.validateAndInsertExtUsers(insertStgUserObject);
	}

	@SuppressWarnings("unchecked")
	@Test
	public void testvalidateAndUpdateExtUsers() throws SQLException {
		InsertStgUserObject insertStgUserObject = Mockito.mock(InsertStgUserObject.class);
		PowerMockito.when(useradmincontroller.validateAndUpdateExtUsers(insertStgUserObject)).thenThrow(Exception.class);
		useradmincontroller.validateAndUpdateExtUsers(insertStgUserObject);
	}
	@Test
	public void testvalidateAndUpdateExtUsers_() throws SQLException {
		InsertStgUserObject insertStgUserObject = Mockito.mock(InsertStgUserObject.class);
		PowerMockito.when(userRegistrationService.validateAndUpdateExtUsers(insertStgUserObject)).thenReturn(null);
		useradmincontroller.validateAndUpdateExtUsers(insertStgUserObject);
	}
	@Test
	public void testsendUserRegistrationMailForExtUser() throws SQLException {
		PowerMockito.when(userRegistrationService.sendUserRegistrationMailForExtUser(115L, null)).thenReturn(115);
		useradmincontroller.sendUserRegistrationMailForExtUser(115L);
	}
	@Test
	public void testsendUserRegistrationMailForExtUser1() throws SQLException {
		PowerMockito.when(userRegistrationService.sendUserRegistrationMailForExtUser(115L, null)).thenReturn(113);
		useradmincontroller.sendUserRegistrationMailForExtUser(115L);
	}
	@Test
	public void testsendUserRegistrationMailForExtUser2() throws SQLException {
		PowerMockito.when(userRegistrationService.sendUserRegistrationMailForExtUser(115L, null)).thenReturn(112);
		useradmincontroller.sendUserRegistrationMailForExtUser(115L);
	}
	@Test
	public void testsendUserRegistrationMailForExtUser3() throws SQLException {
		PowerMockito.when(userRegistrationService.sendUserRegistrationMailForExtUser(115L, null)).thenReturn(114);
		useradmincontroller.sendUserRegistrationMailForExtUser(115L);
	}
	@Test
	public void testsendUserRegistrationMailForExtUser7() throws SQLException {
		PowerMockito.when(userRegistrationService.sendUserRegistrationMailForExtUser(115L, null)).thenReturn(110);
		useradmincontroller.sendUserRegistrationMailForExtUser(115L);
	}
	@Test
	public void testsendUserRegistrationMailForExtUser4() throws SQLException {
		PowerMockito.when(userRegistrationService.sendUserRegistrationMailForExtUser(115L, null)).thenReturn(null);
		useradmincontroller.sendUserRegistrationMailForExtUser(115L);
	}
	@Test
	public void testgetUserRegionsByGroup() throws SQLException {
		useradmincontroller.getUserRegionsByGroup(7l, 7l, "Test", 7l);
	}
	@Test
	public void testgetUserVendorByGroupKey() throws SQLException {
		useradmincontroller.getUserVendorByGroupKey(7l, 7l);
	}
	@Test
	public void testgetUserVendorByGroupKey1() throws SQLException {
		PowerMockito.when(userCreationService.getUserVendorByGroupKey(7l, 7l)).thenThrow(Exception.class);
		useradmincontroller.getUserVendorByGroupKey(7l, 7l);
	}
	@Test
	public void testgetUserRegionsByGroup2() throws SQLException {
		List<KeyValue<String, String>> value=new ArrayList<>();
		PowerMockito.when(userCreationService.getUserRegionsByGroup(Mockito.anyLong(), Mockito.anyLong(), Mockito.anyString(), Mockito.anyLong())).thenThrow(Exception.class);
		useradmincontroller.getUserRegionsByGroup(7l, 7l, "Test", 7l);
	}
	
}
