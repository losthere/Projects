package com.optum.gcm.wadl;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class ApplicationTest {

	@InjectMocks
	protected Application application = new Application();

	protected Grammars grammars;
	protected List<Doc> doc;
	protected List<Resources> resources;
	protected List<Object> resourceTypeOrMethodOrRepresentation;
	protected List<Object> any;

	@Test
	public void testGetDoc() throws Exception {
		doc = application.getDoc();
		Assert.assertEquals(application.getDoc(), application.doc);
		doc = null;
		Assert.assertTrue(application.getDoc() instanceof List);
	}

	@Test
	public void testGetGrammars() throws Exception {
		application.setGrammars(grammars);
		Assert.assertEquals(grammars, application.getGrammars());
	}

	@Test
	public void testSetGrammars() throws Exception {
		application.setGrammars(grammars);
		Assert.assertEquals(application.getGrammars(), grammars);
	}

	@Test
	public void testGetResources() throws Exception {
		resources = application.getResources();
		Assert.assertEquals(application.getResources(), application.resources);
		resources = null;
		Assert.assertTrue(application.getResources() instanceof List);
	}

	@Test
	public void testGetResourceTypeOrMethodOrRepresentation() throws Exception {
		resourceTypeOrMethodOrRepresentation = application.getResourceTypeOrMethodOrRepresentation();
		Assert.assertEquals(application.getResourceTypeOrMethodOrRepresentation(),
				resourceTypeOrMethodOrRepresentation);
		resourceTypeOrMethodOrRepresentation = null;
		Assert.assertTrue(application.getResourceTypeOrMethodOrRepresentation() instanceof List);
	}

	@Test
	public void testGetAny() throws Exception {
		any = application.getAny();
		Assert.assertEquals(application.getAny(), any);
		any = null;
		Assert.assertTrue(application.getAny() instanceof List);
	}

}
