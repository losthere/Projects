package com.optum.gcm.wadl;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class ObjectFactoryTest {

	@InjectMocks
	protected ObjectFactory objectFactory;
	
	@Test
	public void testObjectFactory() {
	 
	}

	@Test
	public void testCreateInclude() throws Exception {
		objectFactory.createInclude();
	}

	@Test
	public void testCreateDoc() throws Exception {
		objectFactory.createDoc();
	}

	@Test
	public void testCreateRequest() throws Exception {
		objectFactory.createRequest();
	}

	@Test
	public void testCreateParam() throws Exception {
		objectFactory.createParam();
	}

	@Test
	public void testCreateOption() throws Exception {
		objectFactory.createOption();
	}

	@Test
	public void testCreateLink() throws Exception {
		objectFactory.createLink();
	}

	@Test
	public void testCreateRepresentation() throws Exception {
		objectFactory.createRepresentation();
	}

	@Test
	public void testCreateMethod() throws Exception {
		objectFactory.createMethod();
	}

	@Test
	public void testCreateResponse() throws Exception {
		objectFactory.createResponse();
	}

	@Test
	public void testCreateResource() throws Exception {
		objectFactory.createResource();
	}

	@Test
	public void testCreateResourceType() throws Exception {
		objectFactory.createResourceType();
	}

	@Test
	public void testCreateResources() throws Exception {
		objectFactory.createResources();
	}

	@Test
	public void testCreateApplication() throws Exception {
		objectFactory.createApplication();
	}

	@Test
	public void testCreateGrammars() throws Exception {
		objectFactory.createGrammars();
	}

}





