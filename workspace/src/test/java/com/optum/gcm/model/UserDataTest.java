package com.optum.gcm.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class UserDataTest {

	@InjectMocks
	private UserData userData;

	@Test
	public void testGetUserId() throws Exception {
		userData.getUserId();
	}

	@Test
	public void testSetUserId() throws Exception {
		userData.setUserId("sjain");
	}
	
	@Test
	public void testGetLastName() throws Exception {
		userData.getLastName();
	}

	@Test
	public void testSetLastName() throws Exception {
		userData.setLastName("test");
	}
	
	@Test
	public void testGetFirstName() throws Exception {
		userData.getFirstName();
	}

	@Test
	public void testSetFirstName() throws Exception {
		userData.setFirstName("test");
	}	
	
	@Test
	public void testGetEmail() throws Exception {
		userData.getEmail();
	}

	@Test
	public void testSetEmail() throws Exception {
		userData.setEmail("test@test.com");
	}

}
