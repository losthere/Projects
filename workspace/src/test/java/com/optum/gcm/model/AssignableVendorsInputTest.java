package com.optum.gcm.model;

import org.junit.Assert;
import org.junit.Test;

public class AssignableVendorsInputTest {

	@Test
	public void test() {
		AssignableVendorsInput assignableVendorsInput = new AssignableVendorsInput();

		assignableVendorsInput.setProjDetails("TEST_PROJECT");
		assignableVendorsInput.setBusinessSegment("TEST");
		assignableVendorsInput.setUserKey("1");
		assignableVendorsInput.setGroupKey("1");
		assignableVendorsInput.setVendorKey("1");
		assignableVendorsInput.setProjKey("1");
		assignableVendorsInput.setProgramKey("1");
		assignableVendorsInput.setRecVendorKey("1");
		assignableVendorsInput.setHpKey("1");
		assignableVendorsInput.setClientKey("1");

		Assert.assertEquals("TEST_PROJECT", assignableVendorsInput.getProjDetails());
		Assert.assertEquals("TEST", assignableVendorsInput.getBusinessSegment());
		Assert.assertEquals("1", assignableVendorsInput.getUserKey());
		Assert.assertEquals("1", assignableVendorsInput.getGroupKey());
		Assert.assertEquals("1", assignableVendorsInput.getVendorKey());
		Assert.assertEquals("1", assignableVendorsInput.getProjKey());
		Assert.assertEquals("1", assignableVendorsInput.getProgramKey());
		Assert.assertEquals("1", assignableVendorsInput.getRecVendorKey());
		Assert.assertEquals("1", assignableVendorsInput.getHpKey());
		Assert.assertEquals("1", assignableVendorsInput.getClientKey());

	}

}
