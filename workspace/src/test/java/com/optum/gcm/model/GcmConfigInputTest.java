package com.optum.gcm.model;

import org.junit.Assert;
import org.junit.Test;

import com.optum.gcm.model.GcmConfigInput;

public class GcmConfigInputTest {

	@Test
	public void test() {
		GcmConfigInput gcmConfigInput = new GcmConfigInput();
		gcmConfigInput.setMatchType("test");
		gcmConfigInput.setVendorKey("test");
		gcmConfigInput.setUserKey("test");
		gcmConfigInput.setUserId("test");
		gcmConfigInput.setRoleCode("test");
		gcmConfigInput.setRegion("test");
		gcmConfigInput.setGroupKey("test");
		gcmConfigInput.setBusFunckey("test");
		gcmConfigInput.setConfigType("test");
		gcmConfigInput.setConfigValue("test");
		gcmConfigInput.setBusFuncDetailKey("test");
		gcmConfigInput.setVendorKey("test");
		
		Assert.assertEquals(gcmConfigInput.getMatchType(),"test");
		Assert.assertEquals(gcmConfigInput.getVendorKey(),"test");
		Assert.assertEquals(gcmConfigInput.getUserKey(),"test");
		Assert.assertEquals(gcmConfigInput.getUserId(),"test");
		Assert.assertEquals(gcmConfigInput.getRoleCode(),"test");
		Assert.assertEquals(gcmConfigInput.getRegion(),"test");
		Assert.assertEquals(gcmConfigInput.getGroupKey(),"test");
		Assert.assertEquals(gcmConfigInput.getBusFunckey(),"test");
		Assert.assertEquals(gcmConfigInput.getConfigType(),"test");
		Assert.assertEquals(gcmConfigInput.getConfigValue(),"test");
		Assert.assertEquals(gcmConfigInput.getBusFuncDetailKey(),"test");
	}

}

