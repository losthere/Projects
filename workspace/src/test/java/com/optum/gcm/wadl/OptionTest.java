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
public class OptionTest {

	@InjectMocks
	protected Option option = new Option();

	protected List<Doc> doc;
	protected List<Object> any;
	protected String value;
	protected String mediaType;
	private Map<QName, String> otherAttributes = new HashMap<QName, String>();

	@Test
	public void testGetDoc() throws Exception {
		doc = option.getDoc();
		assertEquals(option.getDoc(), option.doc);
		doc = null;
		Assert.assertTrue(option.getDoc() instanceof List);
	}

	@Test
	public void testGetAny() throws Exception {
		any = option.getAny();
		assertEquals(option.getAny(), option.any);
		any = null;
		Assert.assertTrue(option.getAny() instanceof List);
	}

	@Test
	public void testGetValue() throws Exception {
		option.setValue("test");
		assertEquals("test", option.getValue());
	}

	@Test
	public void testSetValue() throws Exception {
		option.setValue("test");
		assertEquals(option.getValue(), "test");
	}

	@Test
	public void testGetMediaType() throws Exception {
		option.setMediaType("test");
		assertEquals("test", option.getMediaType());
	}

	@Test
	public void testSetMediaType() throws Exception {
		option.setMediaType("test");
		assertEquals(option.getMediaType(), "test");
	}

	@Test
	public void testGetOtherAttributes() throws Exception {
		option.getOtherAttributes();
	}

}
