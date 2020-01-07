package com.optum.gcm.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class UserTest {

	@InjectMocks
	private User user;

	@Test
	public void testGetLoginUserKey() throws Exception {
		user.getLoginUserKey();
	}

	@Test
	public void testSetLoginUserKey() throws Exception {
		user.setLoginUserKey("test");
	}
	
	@Test
	public void testGetFullName() throws Exception {
		user.getFullName();
	}

	@Test
	public void testSetFullName() throws Exception {
		user.setFullName("test");
	}	
	
	@Test
	public void testGetUserID() throws Exception {
		user.getUserID();
	}

	@Test
	public void testSetUserID() throws Exception {
		user.setUserID("sjain");
	}	

}
