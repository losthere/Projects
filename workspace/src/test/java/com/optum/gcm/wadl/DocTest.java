package com.optum.gcm.wadl;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.namespace.QName;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class DocTest {

	Doc doc = new Doc();

	protected List<Object> content ;
	protected String lang ;
	protected String title ;
	private Map<QName, String> otherAttributes = new HashMap<QName, String>();

	@Test
	public void testGetContent() throws Exception {
		content = doc.getContent();
		assertEquals(doc.getContent(), content);
		content = null;
		assertTrue(doc.getContent() instanceof List);
	}

	@Test
	public void testGetTitle() throws Exception {
		doc.setTitle("testGetTitle");
		assertEquals("testGetTitle", doc.getTitle());
	}

	@Test
	public void testSetTitle() throws Exception {
		doc.setTitle("testSetTitle");
		assertEquals(doc.getTitle(), "testSetTitle");
	}

	@Test
	public void testGetLang() throws Exception {
		doc.setLang("testGetLang method");
		assertEquals(doc.getLang(), "testGetLang method");

	}

	@Test
	public void testSetLang() throws Exception {
		doc.setLang("testSetLang method");
		assertEquals("testSetLang method", doc.getLang());
	}

	@Test
	public void testGetOtherAttributes() throws Exception {
		assertEquals(doc.getOtherAttributes(), otherAttributes);
	}

}
