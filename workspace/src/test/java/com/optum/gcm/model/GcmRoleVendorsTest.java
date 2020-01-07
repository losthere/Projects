package com.optum.gcm.model;

import static org.junit.Assert.assertNotNull;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;

public class GcmRoleVendorsTest {

	@Test
	public void test() {
		GcmRoleVendors vendors = new GcmRoleVendors();
		
		vendors.setGcmRoleCode("test");
		vendors.setGcmRoleName("test");
		List<KeyValue<Integer, String>> roleVendor=new ArrayList<>();
		vendors.setRoleVendor(roleVendor);
		assertNotNull(vendors.getGcmRoleCode());
		assertNotNull(vendors.getGcmRoleName());
		assertNotNull(vendors.getRoleVendor());
	}

}
