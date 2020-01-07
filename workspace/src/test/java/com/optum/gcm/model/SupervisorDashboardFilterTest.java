package com.optum.gcm.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class SupervisorDashboardFilterTest {

	@InjectMocks
	private SupervisorDashboardFilter supervisorDashboardFilter;
	
	@Test
	public void testGetLoginUserKey() throws Exception {
		supervisorDashboardFilter.getLoginUserKey();
	}

	@Test
	public void testSetLoginUserKey() throws Exception {
		supervisorDashboardFilter.setLoginUserKey(4L);
	}
	
	@Test
	public void testGetGroupKey() throws Exception {
		supervisorDashboardFilter.getGroupKey();
	}

	@Test
	public void testSetGroupKey() throws Exception {
		supervisorDashboardFilter.setGroupKey(4l);
	}	
	
	@Test
	public void testGetProjectKey() throws Exception {
		supervisorDashboardFilter.getProjectKey();
	}

	@Test
	public void testSetProjectKey() throws Exception {
		supervisorDashboardFilter.setProjectKey(8L);
	}
	
	@Test
	public void testGetProviderKey() throws Exception {
		supervisorDashboardFilter.getProviderKey();
	}

	@Test
	public void testSetProviderKey() throws Exception {
		supervisorDashboardFilter.setProviderKey(9L);
	}

	@Test
	public void testGetRetreivalVendor() throws Exception {
		supervisorDashboardFilter.getVendorKey();
	}

	@Test
	public void testSetRetreivalVendor() throws Exception {
		supervisorDashboardFilter.setVendorKey(1L);
	}	
	@Test
	public void testSetUserId() throws Exception {
		supervisorDashboardFilter.setUserId("test");
	}
	@Test
	public void testSetRoleCode() throws Exception {
		supervisorDashboardFilter.setRoleCode("test");
	}
	@Test
	public void testSetRegion() throws Exception {
		supervisorDashboardFilter.setRegion("test");
	}
}
