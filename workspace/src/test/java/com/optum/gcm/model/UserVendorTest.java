package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class UserVendorTest {
	@InjectMocks
	UserVendor userVendor;
	@Test
	public void testgetIsActvieSW() {
		userVendor.getIsActvieSW();
		}
	@Test
	public void testsetIsActvieSW() {
		userVendor.setIsActvieSW("test");
		} 
	@Test
	public void testgetGcmVendorKey() {
		userVendor.getGcmVendorKey();
		}
	@Test
	public void testsetGcmVendorKey() {
		userVendor.setGcmVendorKey("test");
		}
	@Test
	public void testgetGcmUserKey() {
		userVendor.getGcmUserKey();
		}
	@Test
	public void testsetGcmUserKey() {
		userVendor.setGcmUserKey(5L);
		}
	@Test
	public void testgetIsDefaultSW() {
		userVendor.getIsDefaultSW();
		}
	@Test
	public void testsetIsDefaultSW() {
		userVendor.setIsDefaultSW("test");
		}
	@Test
	public void testtoString() {
		userVendor.toString();
		}
	
	

}
