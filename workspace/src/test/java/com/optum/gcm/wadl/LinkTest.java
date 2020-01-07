package com.optum.gcm.wadl;

import static org.junit.Assert.assertEquals;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.annotation.XmlAnyAttribute;
import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import javax.xml.namespace.QName;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class LinkTest {

	@InjectMocks
	protected Link link;

	protected List<Doc> doc;

	protected List<Object> any;
	protected String resourceType;
	protected String rel;
	protected String rev;
	private Map<QName, String> otherAttributes = new HashMap<QName, String>();

	@Test
	public void testGetDoc() throws Exception {
		doc = link.getDoc();
		assertEquals(link.getDoc(), link.doc);
		doc = null;
		Assert.assertTrue(link.getDoc() instanceof List);
		link.getDoc();
	}

	@Test
	public void testGetAny() throws Exception {
		any = link.getAny();
		assertEquals(link.getAny(), link.any);
		any = null;
		Assert.assertTrue(link.getAny() instanceof List);

	}

	@Test
	public void testGetResourceType() throws Exception {
		link.setResourceType("test");
		assertEquals("test", link.getResourceType());
	}

	@Test
	public void testSetResourceType() throws Exception {
		link.setResourceType("test");
		assertEquals(link.getResourceType(), "test");
	}

	@Test
	public void testGetRel() throws Exception {
		link.setRel("test");
		assertEquals(link.getRel(), "test");
	}

	@Test
	public void testSetRel() throws Exception {
		link.setRel("test");
		assertEquals("test", link.getRel());
	}

	@Test
	public void testGetRev() throws Exception {
		link.setRev("set rev sample");
		assertEquals(link.getRev(),"set rev sample");
	}

	@Test
	public void testSetRev() throws Exception {
		link.setRev("set rev sample");
		assertEquals("set rev sample",link.getRev());
	}

	@Test
	public void testGetOtherAttributes() throws Exception {
		link.getOtherAttributes();
	}

}
