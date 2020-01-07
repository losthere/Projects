package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class GcmUserVendorRoleTest {
@InjectMocks
GcmUserVendorRole gcmuservendorrole;
	@Test
	public void testGcmUserVendorRole() {
		gcmuservendorrole.setGcmRoleCode("test");
		gcmuservendorrole.setGcmRoleName("test");
		gcmuservendorrole.setGcmVendorKey(1);
		gcmuservendorrole.toString();
		gcmuservendorrole.getGcmRoleCode();
		gcmuservendorrole.getGcmRoleName();
		gcmuservendorrole.getGcmVendorKey();
		
	}

}
