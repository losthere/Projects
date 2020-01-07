package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class IcdHccDetailsTest {
	@InjectMocks
	IcdHccDetails icdhccdetails;

	@Test
	public void testIcdHccDetails() {
		icdhccdetails.setErrorCode("test");
		icdhccdetails.setHhs("test");
		icdhccdetails.setIcdDesc("test");
		icdhccdetails.setRxHcc("test");
		icdhccdetails.setV22Hcc("test");
		icdhccdetails.setV23Hcc("Test");
		icdhccdetails.toString();
		assertNotNull(icdhccdetails.getV23Hcc());
		icdhccdetails.getClass();
		assertNotNull(icdhccdetails.getErrorCode());
		assertNotNull(icdhccdetails.getHhs());
		assertNotNull(icdhccdetails.getIcdDesc());
		assertNotNull(icdhccdetails.getRxHcc());
		assertNotNull(icdhccdetails.getV22Hcc());
	}

}
