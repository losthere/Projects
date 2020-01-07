package com.optum.gcm.model;

import org.junit.Assert;
import org.junit.Test;

public class GcmBusFuncDetailTest {

	@Test
	public void test() {
		GcmBusFuncDetail busFuncDetail = new GcmBusFuncDetail();
		busFuncDetail.setGcmBusinessFuncDetailKey("test");
		busFuncDetail.setGcmBusinessFuncDetailName("test");
		Assert.assertEquals(busFuncDetail.getGcmBusinessFuncDetailKey(),"test");
		Assert.assertEquals(busFuncDetail.getGcmBusinessFuncDetailName(),"test");
	}

}
