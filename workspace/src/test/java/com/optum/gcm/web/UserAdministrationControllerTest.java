package com.optum.gcm.web;

import java.sql.SQLException;
import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
import com.optum.gcm.exception.ServiceException;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.model.UserAdminFilter;
import com.optum.gcm.model.UserAdminModel;
import com.optum.gcm.model.VendorReqObj;
import com.optum.gcm.sevice.UserAdministrationService;

@RunWith(PowerMockRunner.class)
public class UserAdministrationControllerTest {

	@InjectMocks
	UserAdministrationController userAdministrationController;
	@Mock
	private List<UserAdminModel> users;
	@Mock
	private List<Long> userKeys;
	@Mock
	private Long userKey;
	@Mock
	private List<String> roleCodes;
	@Mock
	private List<String> existingRoleCodes;
	@Mock
	private UserAdministrationService userAdministrationService;
	@Mock
	private UserAdminFilter userAdminFilter;
	@Mock
	private List<UserAdminModel> restResponse;
	@Mock
	RestResponse<String> restResponse1;

	@SuppressWarnings("unchecked")
	@Test
	public void testgetUserAdminList() throws SQLException {
		UserAdminFilter userAdminFilter = Mockito.mock(UserAdminFilter.class);
		PowerMockito.when(userAdministrationController.getUserAdminList(userAdminFilter))
				.thenThrow(ServiceException.class);
		userAdministrationController.getUserAdminList(userAdminFilter);
	}

	@SuppressWarnings("unchecked")
	@Test
	public void testchangeSupervisor() throws SQLException {
		PowerMockito.when(userAdministrationController.changeSupervisor(users)).thenThrow(ServiceException.class);
		userAdministrationController.changeSupervisor(users);
	}

	@SuppressWarnings("unchecked")
	@Test
	public void testInactiveUser() throws SQLException {
		PowerMockito.when(userAdministrationController.InactiveUser(userKey, 5L)).thenThrow(ServiceException.class);
		userAdministrationController.InactiveUser(userKey, 5L);
	}

	@SuppressWarnings("unchecked")
	@Test
	public void testgetUserRolesList() throws SQLException {
		PowerMockito.when(userAdministrationController.getUserRolesList(5L, 5L)).thenThrow(ServiceException.class);
		userAdministrationController.getUserRolesList(5L, 5L);
	}

	@SuppressWarnings("unchecked")
	@Test
	public void testupdateUserRoles() throws SQLException {
		PowerMockito.when(userAdministrationController.updateUserRoles(5L, 5L, 5L, roleCodes, existingRoleCodes, "test"))
				.thenThrow(ServiceException.class);
		userAdministrationController.updateUserRoles(5L, 5L, 5L, roleCodes, existingRoleCodes,"test");
	}

	@Test
	public void testactiveuser() throws SQLException {
		userAdministrationController.activateUser("mailid", null, 1l, 1l, existingRoleCodes, userKey);
	}

	@SuppressWarnings("unchecked")
	@Test
	public void testactiveuser1() throws SQLException {
		PowerMockito.when(userAdministrationService.activateUser(Mockito.anyString(), Mockito.anyLong(),
				Mockito.anyLong(), Mockito.anyLong(), Mockito.anyList(),Mockito.anyLong())).thenThrow(Exception.class);
		userAdministrationController.activateUser("mailid", null, 1l, 1l, existingRoleCodes, userKey);
	}
	@Test
	public void testvalidateuser() throws SQLException {
		userAdministrationController.validateUser("mailid", 1l);
	}

	@SuppressWarnings("unchecked")
	@Test
	public void testvalidateuser1() throws SQLException {
		PowerMockito.when(userAdministrationService.validateUser(Mockito.anyString(),Mockito.anyLong())).thenThrow(Exception.class);
		userAdministrationController.validateUser("mailid", 1l);
	}

	@SuppressWarnings("unchecked")
	@Test
	public void testupdateUserRoles_() throws SQLException {
		PowerMockito.when(userAdministrationService.getUserAdminList(userAdminFilter)).thenReturn(restResponse);
		PowerMockito.when(userAdministrationService.getUserAdminList(userAdminFilter))
				.thenThrow(ServiceException.class);
		userAdministrationController.getUserAdminList(userAdminFilter);
	}
	
	@Test
	public void updateUserVendors() throws SQLException {
		VendorReqObj vendorReqObj=new VendorReqObj();
		PowerMockito.when(userAdministrationService.updateUserVendors(vendorReqObj)).thenReturn(true);
		userAdministrationController.updateUserVendors(vendorReqObj);
	}
	@Test
	public void updateUserVendorsfalse() throws SQLException {
		VendorReqObj vendorReqObj=new VendorReqObj();
		PowerMockito.when(userAdministrationService.updateUserVendors(vendorReqObj)).thenReturn(false);
		userAdministrationController.updateUserVendors(vendorReqObj);
	}
	@Test
	public void updateUserVendors1() throws SQLException {
		VendorReqObj vendorReqObj=new VendorReqObj();
		PowerMockito.when(userAdministrationService.updateUserVendors(vendorReqObj)).thenThrow(Exception.class);
		userAdministrationController.updateUserVendors(vendorReqObj);
	}
}
