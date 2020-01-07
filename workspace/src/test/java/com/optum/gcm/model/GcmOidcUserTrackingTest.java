package com.optum.gcm.model;

import org.junit.Assert;
import org.junit.Test;

public class GcmOidcUserTrackingTest {

	@Test
	public void test() {
		GcmOidcUserTracking userTracking = new GcmOidcUserTracking();
		userTracking.setState("test");
		userTracking.setAuthToken("test");
		userTracking.setCode("test");
		userTracking.setUserName("test");
		userTracking.setUuid("test");
		userTracking.setFirstName("test");
		userTracking.setLastName("test");
		userTracking.setEmail("test");
		userTracking.setAccessToken("test");
		userTracking.setRefreshToken("test");
		userTracking.setExpiresIn(1);
		Assert.assertEquals(userTracking.getState(),"test");
		Assert.assertEquals(userTracking.getAuthToken(),"test");
		Assert.assertEquals(userTracking.getCode(),"test");
		Assert.assertEquals(userTracking.getUserName(),"test");
		Assert.assertEquals(userTracking.getUuid(),"test");
		Assert.assertEquals(userTracking.getFirstName(),"test");
		Assert.assertEquals(userTracking.getLastName(),"test");
		Assert.assertEquals(userTracking.getEmail(),"test");
		Assert.assertEquals(userTracking.getAccessToken(),"test");
		Assert.assertEquals(userTracking.getRefreshToken(),"test");
		Assert.assertEquals(userTracking.getExpiresIn(),(Integer)1);
	}

}
