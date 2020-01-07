package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.sql.Timestamp;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class UserLoginTest {
	@InjectMocks
	UserLogin userLogin;
	@Mock
	private Timestamp logInTime;
	private Timestamp logOffTime;

	@Test
	public void testgetGcmUserLogonKey() {
		userLogin.getGcmUserLogonKey();
	}

	@Test
	public void testsetGcmUserLogonKey() {
		userLogin.setGcmUserLogonKey("test");
	}

	@Test
	public void testgetGcmUserKey() {
		userLogin.getGcmUserKey();
	}

	@Test
	public void testsetGcmUserKey() {
		userLogin.setGcmUserKey(5L);
	}

	@Test
	public void testgetLogInTime() {
		userLogin.getLogInTime();
	}

	@Test
	public void testLogInTime() {
		userLogin.setLogInTime(logInTime);
	}

	@Test
	public void testgetLogOffTime() {
		userLogin.getLogOffTime();
	}

	@Test
	public void testsetLogOffTime() {
		userLogin.setLogOffTime(logOffTime);
	}

	@Test
	public void testgetIpInfo() {
		userLogin.getIpInfo();
	}

	@Test
	public void testsetIpInfo() {
		userLogin.setIpInfo("test");
	}

	@Test
	public void testgetBrowserInfo() {
		userLogin.getBrowserInfo();
	}

	@Test
	public void testsetBrowserInfo() {
		userLogin.setBrowserInfo("test");
	}

	@Test
	public void testgetLogOffMode() {
		userLogin.getLogOffMode();
	}

	@Test
	public void testsetLogOffMode() {
		userLogin.setLogOffMode("test");
	}

}
