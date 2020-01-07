package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class GCMUserVendorTest {
@InjectMocks
GCMUserVendor gcmuservendor;
	@Test
	public void testGCMUserVendor() {
		gcmuservendor.setGcmVendorKey("test");
		gcmuservendor.setVendorCode("test");
		gcmuservendor.setVendorName("test");
		gcmuservendor.getClass();
		gcmuservendor.toString();
		gcmuservendor.getGcmVendorKey();
		gcmuservendor.getVendorCode();
		gcmuservendor.getVendorName();
	}

}
