package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class UserRoleTest {
	@InjectMocks
	UserRole userRole;
	@Test
	public void testgetGcmUserRoleKey() {
		userRole.getGcmUserRoleKey();
		}
	@Test
	public void testsetGcmUserRoleKey() {
		userRole.setGcmUserRoleKey("test");
		}
	@Test
	public void testGcmUserKey() {
		userRole.getGcmUserKey();
		}
	@Test
	public void testsetGcmUserKey() {
		userRole.setGcmUserKey(5L);
		}
	@Test
	public void testgetGcmRoleCode() {
		userRole.getGcmRoleCode();
		}
	@Test
	public void testsetGcmRoleCode() {
		userRole.setGcmRoleCode("test");
		}
	@Test
	public void testgetGcmVendorKey() {
		userRole.getGcmVendorKey();
		}
	@Test
	public void testsetGcmVendorKey() {
		userRole.setGcmVendorKey("test");
		}
	@Test
	public void testgetReportsUserKey() {
		userRole.getGcmReportsUserKey();
		}
	@Test
	public void testsetGcmReportsUserKey() {
		userRole.setGcmReportsUserKey("test");
		}
	@Test
	public void testgetGcmReportsUserKey() {
		userRole.getGcmReportsUserKey(); 
		}
	@Test
	public void testIsActiveSW() {
		userRole.setIsActiveSW("test");
		}
	@Test
	public void testgetIsActiveSW() {
		userRole.getIsActiveSW();
		}
	

}
