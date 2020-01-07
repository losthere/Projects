package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class UserResourceTest {

	private static final List<GcmUserVendorRole> List = null;
	@InjectMocks
	UserResource userResource;
	private java.util.List<GCMUserGroup> gcmUserGroup;
	private java.util.List<GCMUserVendor> gcmUserVendor;

	@Test
	public void testgetGcmUserVendorRole() {
		userResource.getGcmUserVendorRole();
	}

	@Test
	public void testsetGcmUserVendorRole() {
		userResource.setGcmUserVendorRole(List);
	}

	@Test
	public void testgetUuid() {
		userResource.getUuid();
	}

	@Test
	public void testsetUuid() {
		userResource.setUuid("test");
	}

	@Test
	public void testgetFirstName() {
		userResource.getFirstName();
	}

	@Test
	public void testsetFirstName() {
		userResource.setFirstName("test");
	}

	@Test
	public void testgettLastName() {
		userResource.getLastName();
	}

	@Test
	public void testsettLastName() {
		userResource.setLastName("test");
	}

	@Test
	public void testgetUserId() {
		userResource.getUserId();
	}

	@Test
	public void testsetUserId() {
		userResource.setUserId("test");
	}

	@Test
	public void testgetUserEmail() {
		userResource.getUserEmail();
	}

	@Test
	public void testsetUserEmail() {
		userResource.setUserEmail("test");
	}

	@Test
	public void testgetUserKey() {
		userResource.getUserKey();
	}

	@Test
	public void testsetUserKey() {
		userResource.setUserKey("test");
	}

	@Test
	public void testgetUserName() {
		userResource.getUserName();
	}

	@Test
	public void testsetUserName() {
		userResource.setUserName("test");
	}

	@Test
	public void testgetStatus() {
		userResource.getStatus();
	}

	@Test
	public void testsetStatus() {
		userResource.setStatus("test");
	}

	@Test
	public void testgetGcmUserGroup() {
		userResource.getGcmUserGroup();
	}

	@Test
	public void testsetGcmUserGroup() {
		userResource.setGcmUserGroup(gcmUserGroup);
	}

	@Test
	public void testgetGcmUserVendor() {
		userResource.getGcmUserVendor();
	}

	@Test
	public void testsetGcmUserVendor() {
		userResource.setGcmUserVendor(gcmUserVendor);
	}

	@Test
	public void testgetErrorMsg() {
		userResource.getErrorMsg();
	}

	@Test
	public void testsetErrorMsg() {
		userResource.setErrorMsg("test");
	}

	@Test
	public void testtoString() {
		userResource.toString();
	}
	
	@Test
	public void testpnpurl() {
		userResource.setPnpURL("Test");
		userResource.getPnpURL();
	}
}
