package com.optum.gcm.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class UserAdminModelTest {

	@InjectMocks
	private UserAdminModel userAdminModel;

	@Test
	public void testGetUserKey() throws Exception {
		userAdminModel.getUserKey();
	}

	@Test
	public void testSetUserKey() throws Exception {
		userAdminModel.setUserKey(3L);
	}
	
	@Test
	public void testGetLastName() throws Exception {
		userAdminModel.getLastName();
	}

	@Test
	public void testSetLastName() throws Exception {
		userAdminModel.setLastName("test");
	}
	
	@Test
	public void testGetFirstName() throws Exception {
		userAdminModel.getFirstName();
	}

	@Test
	public void testSetFirstName() throws Exception {
		userAdminModel.setFirstName("test");
	}	
	
	@Test
	public void testGetUserId() throws Exception {
		userAdminModel.getUserId();
	}

	@Test
	public void testSetUserId() throws Exception {
		userAdminModel.setUserId("sjain");
	}
	
	@Test
	public void testGetSupervisorId() throws Exception {
		userAdminModel.getSupervisorId();
	}

	@Test
	public void testSetSupervisorId() throws Exception {
		userAdminModel.setSupervisorId(4L);
	}
	
	@Test
	public void testGetSupervisor() throws Exception {
		userAdminModel.getSupervisor();
	}

	@Test
	public void testSetSupervisor() throws Exception {
		userAdminModel.setSupervisor("test");
	}
	
	@Test
	public void testGetStatus() throws Exception {
		userAdminModel.getStatus();
	}

	@Test
	public void testSetStatus() throws Exception {
		userAdminModel.setStatus("test");
	}
	
	@Test
	public void testGetRoleCnt() throws Exception {
		userAdminModel.getRoleCnt();
	}

	@Test
	public void testSetRoleCnt() throws Exception {
		userAdminModel.setRoleCnt("test");
	}
	
	@Test
	public void testGetRoleCode() throws Exception {
		userAdminModel.getRoleCode();
	}

	@Test
	public void testSetRoleCode() throws Exception {
		userAdminModel.setRoleCode("test");
	}
	
	@Test
	public void testGetRoleNames() throws Exception {
		userAdminModel.getRoleNames();
	}

	@Test
	public void testSetRoleNames() throws Exception {
		userAdminModel.setRoleNames("test");
	}
	
	@Test
	public void testGetEmail() throws Exception {
		userAdminModel.getEmail();
	}

	@Test
	public void testSetEmail() throws Exception {
		userAdminModel.setEmail("test@test.com");
	}
	@Test
	public void testgetRole() {
		userAdminModel.getRole();
	}
	
}
