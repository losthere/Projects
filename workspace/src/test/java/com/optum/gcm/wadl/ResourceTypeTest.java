package com.optum.gcm.wadl;

import static org.junit.Assert.assertEquals;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class ResourceTypeTest {

	@InjectMocks
	protected ResourceType resourceType;

	@Test
	public void testGetDoc() throws Exception {
		Assert.assertNotNull(resourceType);
		resourceType.getDoc();
	}

	@Test
	public void testGetParam() throws Exception {
		assertEquals(resourceType.getParam(),resourceType.param);
		resourceType.getParam();
	}

	@Test
	public void testGetMethodOrResource() throws Exception {
		Assert.assertNotNull(resourceType);
		assertEquals(resourceType.getMethodOrResource(),resourceType.methodOrResource);
		resourceType.getMethodOrResource();
	}

	@Test
	public void testGetAny() throws Exception {
		assertEquals(resourceType.getAny(),resourceType.any);
		resourceType.getAny();
	}

	@Test
	public void testGetId() throws Exception {
		resourceType.setId("test");
		assertEquals(resourceType.getId(), "test");
	}

	@Test
	public void testSetId() throws Exception {
		resourceType.setId("test");
		assertEquals("test", resourceType.getId());
	}

	@Test
	public void testGetOtherAttributes() throws Exception {
		resourceType.getOtherAttributes();
	}

}
