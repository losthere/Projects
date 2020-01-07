package com.optum.gcm.wadl;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class RequestTest {

	@InjectMocks
	protected Request request;

	@Test
	public void testGetDoc() throws Exception {
		Assert.assertNotNull(request);
		request.getDoc();
	}

	@Test
	public void testGetParam() throws Exception {
		Assert.assertNotNull(request);
		request.getParam();
	}

	@Test
	public void testGetRepresentation() throws Exception {
		Assert.assertNotNull(request);
		request.getRepresentation();
	}

	@Test
	public void testGetAny() throws Exception {
		Assert.assertNotNull(request);
		request.getAny();
	}

	@Test
	public void testGetOtherAttributes() throws Exception {
		Assert.assertNotNull(request);
		request.getOtherAttributes();
	}

}
