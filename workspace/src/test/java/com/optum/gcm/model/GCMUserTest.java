package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class GCMUserTest {
	@InjectMocks
	GCMUser gcmuser;

	@Test
	public void testgetIsInternal() {
		gcmuser.getIsInternal();
	}

	@Test
	public void testsetIsInternal() {
		gcmuser.setIsInternal("test");
	}

	@Test
	public void testgetLastName() {
		gcmuser.getLastName();
	}

	@Test
	public void testsetLastName() {
		gcmuser.setLastName("test");
	}

	@Test
	public void testgetFirstName() {
		gcmuser.getFirstName();
	}

	@Test
	public void testsetFirstName() {
		gcmuser.setFirstName("test");
	}

	@Test
	public void testgetEmail() {
		gcmuser.getEmail();
	}

	@Test
	public void testsetEmail() {
		gcmuser.setEmail("test");
	}

	@Test
	public void testgetIsActive() {
		gcmuser.getIsActive();
	}

	@Test
	public void testsetIsActive() {
		gcmuser.setIsActive("test");
	}

	@Test
	public void testgetReportsToUserKey() {
		gcmuser.getReportsToUserKey();
	}

	@Test
	public void testsetReportsToUserKey() {
		gcmuser.setReportsToUserKey("test");
	}

	@Test
	public void testgetUuID() {
		gcmuser.getUuID();
	}

	@Test
	public void testsetIUuID() {
		gcmuser.setUuID("test");
	}

	@Test
	public void testgetLoginUserKey() {
		gcmuser.getLoginUserKey();
	}

	@Test
	public void testsetLoginUserKey() {
		gcmuser.setLoginUserKey("test");
	}

	@Test
	public void testgetUserID() {
		gcmuser.getUserID();
	}

	@Test
	public void testsetUserID() {
		gcmuser.setUserID("test");
	}

	@Test
	public void testgetExtUserIdentification() {
		gcmuser.getExtUserIdentification();
	}

	@Test
	public void testsetExtUserIdentification() {
		gcmuser.setExtUserIdentification("test"); 
	}

	@Test
	public void testgetExtUserIdentificationSrc() {
		gcmuser.getExtUserIdentificationSrc();
	}

	@Test
	public void test() {
		gcmuser.setPasswd("Test");
		gcmuser.getPasswd();
		gcmuser.setExtUserIdentificationSrc("test");
	}
	

}
