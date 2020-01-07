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
public class RepresentationTest {

	@InjectMocks
	protected Representation representation = new Representation();

	protected List<Doc> doc;
	protected List<Param> param;
	protected List<Object> any;
	protected String id;
	protected QName element;
	protected String mediaType;
	protected String href;
	protected List<String> profile;
	private Map<QName, String> otherAttributes = new HashMap<QName, String>();

	@Test
	public void testGetDoc() throws Exception {
		doc = representation.getDoc();
		assertEquals(representation.getDoc(), representation.doc);
		doc = null;
		//Assert.assertTrue(doc instanceof List);
	}

	@Test
	public void testGetParam() throws Exception {
		param = representation.getParam();
		assertEquals(representation.getParam(), representation.param);
		param = null;
		//Assert.assertTrue(param instanceof List);
	}

	@Test
	public void testGetAny() throws Exception {
		any = representation.getAny();
		assertEquals(representation.getAny(),representation.any);
		any = null;
		//Assert.assertTrue(any instanceof List);
	}

	@Test
	public void testGetId() throws Exception {
		representation.setId("test");
		assertEquals(representation.getId(), "test");
	}

	@Test
	public void testSetId() throws Exception {
		representation.setId("test");
		assertEquals("test", representation.getId());
	}

	@Test
	public void testGetElement() throws Exception {
		QName qname = new QName("dummy");
		representation.setElement(qname);
		assertEquals(representation.getElement(), qname);
	}

	@Test
	public void testSetElement() throws Exception {
		QName qname = new QName("dummy");
		representation.setElement(qname);
		assertEquals(qname, representation.getElement());
	}

	@Test
	public void testGetMediaType() throws Exception {
		representation.setMediaType("test");
		assertEquals(representation.getMediaType(), "test");
	}

	@Test
	public void testSetMediaType() throws Exception {
		representation.setMediaType("test");
		assertEquals("test", representation.getMediaType());
	}

	@Test
	public void testGetHref() throws Exception {
		representation.setHref("test");
		assertEquals(representation.getHref(), "test");
	}

	@Test
	public void testSetHref() throws Exception {
		representation.setHref("test");
		assertEquals("test", representation.getHref());
	}

	@Test
	public void testGetProfile() throws Exception {
		profile = representation.getProfile();
		assertEquals(representation.getProfile(), representation.profile);
		profile = null;
		//Assert.assertTrue(profile instanceof List);
	}

	@Test
	public void testGetOtherAttributes() throws Exception {
		representation.getOtherAttributes();
	}

}
