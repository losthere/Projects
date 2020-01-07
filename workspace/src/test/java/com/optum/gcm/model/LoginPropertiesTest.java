package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Assert;
import org.junit.Test;

public class LoginPropertiesTest {

	@Test
	public void test() {
		LoginProperties loginProperties=new LoginProperties();
		loginProperties.setLoginUrl("TEST_PROJECT");
		loginProperties.setVerifyUrl("TEST_PROJECT");
		loginProperties.setReportsUrl("TEST_PROJECT");
		loginProperties.setRelyingId("TEST_PROJECT");
		
		
		Assert.assertEquals("TEST_PROJECT", loginProperties.getLoginUrl());
		Assert.assertEquals("TEST_PROJECT", loginProperties.getVerifyUrl());
		Assert.assertEquals("TEST_PROJECT", loginProperties.getReportsUrl());
		Assert.assertEquals("TEST_PROJECT", loginProperties.getRelyingId());
		
		
	}

}
