package com.optum.gcm.model;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)

public class CoderProductivityTest {
	@InjectMocks
	CoderProductivity coderproductivity;

	@Test
	public void testcoderproductivity() {
		coderproductivity.setContentCommentKey(33l);
		coderproductivity.setProjContentKey(10l);
		coderproductivity.setBarcode("test");
		coderproductivity.setBusFuncVenKey(33l);
		coderproductivity.setProjectKey(10l);
		coderproductivity.setBusFuncKey(33l); 
		coderproductivity.setBusFuncStatus("test");
		coderproductivity.setVendorKey(33l);
		coderproductivity.setUserKey(10l);
		coderproductivity.setEvent("test");
		coderproductivity.setWorkId("test");
		coderproductivity.setWorkListParentActKey("test");
		coderproductivity.setProjectYear(1033l);
		Assert.assertEquals("test", coderproductivity.getBarcode());
		Assert.assertEquals("test", coderproductivity.getBusFuncStatus());
		Assert.assertEquals("test", coderproductivity.getEvent());
		Assert.assertEquals("test", coderproductivity.getWorkId());
		Assert.assertEquals("test", coderproductivity.getWorkListParentActKey());
		Assert.assertEquals((Long)33l,coderproductivity.getContentCommentKey());
		Assert.assertEquals((Long)10l,coderproductivity.getProjContentKey());
		Assert.assertEquals((Long)33l,coderproductivity.getBusFuncVenKey());
		Assert.assertEquals((Long)10l,coderproductivity.getProjectKey());
		Assert.assertEquals((Long)33l,coderproductivity.getBusFuncKey());
		Assert.assertEquals((Long)10l,coderproductivity.getUserKey());
		Assert.assertEquals((Long)33l,coderproductivity.getVendorKey());
		Assert.assertEquals((Long)1033l,coderproductivity.getProjectYear());	
	}

}
