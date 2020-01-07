package com.optum.gcm.wadl;

import static org.junit.Assert.assertEquals;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class ResourcesTest {

	@InjectMocks
	protected Resources resources;

	@Test
	public void testGetDoc() throws Exception {
		resources.getDoc();
	}

	@Test
	public void testGetResource() throws Exception {
		Assert.assertNotNull(resources);
		
		resources.getResource();
	}

	@Test
	public void testGetAny() throws Exception {
		Assert.assertNotNull(resources);

		resources.getAny();
	}

	@Test
	public void testGetBase() throws Exception {

		resources.setBase("test");
		assertEquals("test", resources.getBase());
	}

	@Test
	public void testSetBase() throws Exception {
		resources.setBase("test");
		assertEquals(resources.getBase(), "test");
	}

	@Test
	public void testGetOtherAttributes() throws Exception {
		resources.getOtherAttributes();
	}

}
