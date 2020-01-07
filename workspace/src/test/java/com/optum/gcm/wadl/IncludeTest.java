package com.optum.gcm.wadl;

import static org.junit.Assert.assertEquals;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.annotation.XmlAnyAttribute;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.namespace.QName;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class IncludeTest {

	protected Include include = new Include();
	protected List<Doc> doc;
	protected String href;
	private Map<QName, String> otherAttributes = new HashMap<QName, String>();

	@Test
	public void testGetDoc() throws Exception {
		doc = include.getDoc();
		assertEquals(include.getDoc(), include.doc);
		doc = null;
		Assert.assertTrue(include.getDoc() instanceof List);
	}

	@Test
	public void testGetHref() throws Exception {
		include.setHref("test");
		assertEquals(include.getHref(), "test");
	}

	@Test
	public void testSetHref() throws Exception {
		include.setHref("test");
		assertEquals("test", include.getHref());
	}

	@Test
	public void testGetOtherAttributes() throws Exception {
		include.getOtherAttributes();
	}

}
