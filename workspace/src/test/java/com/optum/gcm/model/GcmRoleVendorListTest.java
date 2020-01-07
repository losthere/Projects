package com.optum.gcm.model;

import org.junit.Assert;
import org.junit.Test;

public class GcmRoleVendorListTest {

	@Test
	public void test() {
		GcmRoleVendorList vendorList = new GcmRoleVendorList();
		vendorList.setVendorName("test");
		Assert.assertEquals(vendorList.getVendorName(),"test");
	}

}
