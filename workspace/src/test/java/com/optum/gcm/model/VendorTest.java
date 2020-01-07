package com.optum.gcm.model;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;

public class VendorTest {

	@Test
	public void test() {
		Vendor vendor = new Vendor();
		vendor.setVendorKey(1l);
		vendor.setVendorName("test");
		vendor.setIsActiveSW("test");
		assertNotNull(vendor.getVendorName());
		assertNotNull(vendor.getIsActiveSW());
		assertNotNull(vendor.getVendorKey());
	}
}
