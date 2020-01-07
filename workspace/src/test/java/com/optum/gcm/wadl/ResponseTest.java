package com.optum.gcm.wadl;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class ResponseTest {

	@InjectMocks
	protected Response response;

	@Test
	public void testGetDoc() throws Exception {
		Assert.assertNotNull(response);
		response.getDoc();
	}

	@Test
	public void testGetParam() throws Exception {
		Assert.assertNotNull(response);
		response.getParam();
	}

	@Test
	public void testGetRepresentation() throws Exception {
		Assert.assertNotNull(response);
		response.getRepresentation();
	}

	@Test
	public void testGetAny() throws Exception {
		Assert.assertNotNull(response);
		response.getAny();
	}

	@Test
	public void testGetStatus() throws Exception {
		Assert.assertNotNull(response);
		response.getStatus();
	}

	@Test
	public void testGetOtherAttributes() throws Exception {
		response.getOtherAttributes();
	}

}
