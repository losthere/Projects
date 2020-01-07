package com.optum.gcm.model;

import static org.junit.Assert.assertNotNull;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

public class VendorReqObjTest {

	@Test
	public void test() {
		List<Vendor> vendorList = new ArrayList<>();
		VendorReqObj vendorReqObj = new VendorReqObj();
		vendorReqObj.setUserKey(1l);
		vendorReqObj.setUserId("test");
		vendorReqObj.setVendorList(vendorList);
		assertNotNull(vendorReqObj.getUserId());
		assertNotNull(vendorReqObj.getVendorList());
		assertNotNull(vendorReqObj.getUserKey());
	}

}
