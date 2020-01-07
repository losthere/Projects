package com.optum.gcm.wadl;

import static org.junit.Assert.assertEquals;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.namespace.QName;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class MethodTest {

	@InjectMocks
	protected Method method = new Method();

	protected List<Doc> doc;
	protected Request request;
	protected List<Response> response;
	protected List<Object> any;
	protected String id;
	protected String name;
	protected String href;
	private Map<QName, String> otherAttributes = new HashMap<QName, String>();

	@Test
	public void testGetDoc() throws Exception {
		doc = method.getDoc();
		assertEquals(method.getDoc(), method.doc);
		doc = null;
		Assert.assertTrue(method.getDoc() instanceof List);
	}

	@Test
	public void testGetRequest() throws Exception {
		method.setRequest(request);
		assertEquals(method.getRequest(), request);
	}

	@Test
	public void testSetRequest() throws Exception {
		method.setRequest(request);
		assertEquals(request, method.getRequest());
	}

	@Test
	public void testGetResponse() throws Exception {

		response = method.getResponse();
		assertEquals(method.getResponse(), method.response);
		response = null;
		Assert.assertTrue(method.getResponse() instanceof List);

	}

	@Test
	public void testGetAny() throws Exception {
		any = method.getAny();
		assertEquals(method.getAny(), method.any);
		any = null;
		Assert.assertTrue(method.getAny() instanceof List);
	}

	@Test
	public void testGetId() throws Exception {
		method.setId("sampleId");
		assertEquals(method.getId(), "sampleId");
	}

	@Test
	public void testSetId() throws Exception {
		method.setId("sampleId");
		assertEquals("sampleId", method.getId());
	}

	@Test
	public void testGetName() throws Exception {
		method.setName("test");
		assertEquals("test", method.getName());
	}

	@Test
	public void testSetName() throws Exception {
		method.setName("test");
		assertEquals(method.getName(), "test");
	}

	@Test
	public void testGetHref() throws Exception {
		method.setHref("test");
		assertEquals(method.getHref(), "test");
	}

	@Test
	public void testSetHref() throws Exception {
		method.setHref("test");
		assertEquals("test", method.getHref());
	}

	@Test
	public void testGetOtherAttributes() throws Exception {
		method.getOtherAttributes();
	}

}
