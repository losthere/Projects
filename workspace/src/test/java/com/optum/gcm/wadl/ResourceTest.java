package com.optum.gcm.wadl;

import static org.junit.Assert.assertEquals;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class ResourceTest {

	@InjectMocks
	protected Resource resource;

	@Test
	public void testGetDoc() throws Exception {
		Assert.assertNotNull(resource);
		resource.getDoc();
	}

	@Test
	public void testGetParam() throws Exception {
		Assert.assertNotNull(resource);
		resource.getParam();
	}

	@Test
	public void testGetMethodOrResource() throws Exception {
		Assert.assertNotNull(resource);
		resource.getMethodOrResource();
	}

	@Test
	public void testGetAny() throws Exception {
		Assert.assertNotNull(resource);

		resource.getAny();
	}

	@Test
	public void testGetId() throws Exception {
		resource.setId("test");
		assertEquals(resource.getId(), "test");
	}

	@Test
	public void testSetId() throws Exception {
		resource.setId("test");
		assertEquals("test", resource.getId());
	}

	@Test
	public void testGetType() throws Exception {
		Assert.assertNotNull(resource);
		resource.getType();
	}

	@Test
	public void testGetQueryType() throws Exception {
		Assert.assertNotNull(resource);
		resource.setQueryType("application/x-www-form-urlencoded");
		assertEquals("application/x-www-form-urlencoded", resource.getQueryType());
	}

	@Test
	public void testSetQueryType() throws Exception {
		resource.setQueryType("test");
		assertEquals("test", resource.getQueryType());
	}

	@Test
	public void testGetPath() throws Exception {
		resource.setPath("test");
		assertEquals(resource.getPath(), "test");
	}

	@Test
	public void testSetPath() throws Exception {
		resource.setPath("test");
		assertEquals("test", resource.getPath());
	}

	@Test
	public void testGetOtherAttributes() throws Exception {
		resource.getOtherAttributes();
	}

}
