package com.optum.gcm.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class UserAdminFilterTest {

	@InjectMocks
	private UserAdminFilter userAdminFilter;

	@Test
	public void testGetLastName() throws Exception {
		userAdminFilter.getLastName();
	}

	@Test
	public void testSetLastName() throws Exception {
		userAdminFilter.setLastName("test");
	}
	
	@Test
	public void testGetFirstName() throws Exception {
		userAdminFilter.getFirstName();
	}

	@Test
	public void testSetFirstName() throws Exception {
		userAdminFilter.setFirstName("test");
	}	
	
	@Test
	public void testGetUserId() throws Exception {
		userAdminFilter.getUserId();
	}

	@Test
	public void testSetUserId() throws Exception {
		userAdminFilter.setUserId("sjain");
	}
	
	@Test
	public void testGetRole() throws Exception {
		userAdminFilter.getRole();
	}

	@Test
	public void testSetRole() throws Exception {
		userAdminFilter.setRole("sjain");
	}
	
	@Test
	public void testGetSupervisor() throws Exception {
		userAdminFilter.getSupervisor();
	}

	@Test
	public void testSetSupervisor() throws Exception {
		userAdminFilter.setSupervisor(4L);
	}
	
	@Test
	public void testGetStatus() throws Exception {
		userAdminFilter.getStatus();
	}

	@Test
	public void testSetStatus() throws Exception {
		userAdminFilter.setStatus("open");
	}
	
	@Test
	public void testGetVendorKey() throws Exception {
		userAdminFilter.getVendorKey();
	}

	@Test
	public void testSetVendorKey() throws Exception {
		userAdminFilter.setVendorKey(4L);
	}

}
