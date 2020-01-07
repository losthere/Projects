package com.optum.gcm.model;

import org.junit.Assert;
import org.junit.Test;


public class RestResponseTest {

	@Test
	public <T> void testRestRespone() {
		T result = null;
		RestResponse<T> test=new RestResponse<T>(result);
		test.setErrorMessage("testt");
		Assert.assertEquals("testt", test.getErrorMessage());
	}

}
