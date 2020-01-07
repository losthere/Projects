package com.optum.gcm.wadl;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.List;

import javax.xml.namespace.QName;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class ParamTest {

	@InjectMocks
	protected Param param = new Param();

	protected List<Doc> doc;
	protected List<Option> option;
	protected Link link;
	protected List<Object> any;
	protected String href;
	protected String name;
	protected ParamStyle style;
	protected String id;
	protected QName type;
	protected String _default;
	protected Boolean required;
	protected Boolean repeating;
	protected String fixed;
	protected String path;

	@Test
	public void testGetDoc() throws Exception {
		doc = param.getDoc();
		assertEquals(param.getDoc(), param.doc);
		doc = null;
		Assert.assertTrue(param.getDoc() instanceof List);
	}

	@Test
	public void testGetOption() throws Exception {
		option = param.getOption();
		assertEquals(param.getOption(), param.option);
		option = null;
		Assert.assertTrue(param.getOption() instanceof List);
	}

	@Test
	public void testGetLink() throws Exception {
		param.setLink(link);
		assertEquals(link, param.getLink());
	}

	@Test
	public void testSetLink() throws Exception {
		param.setLink(link);
		assertEquals(param.getLink(), link);
	}

	@Test
	public void testGetAny() throws Exception {
		any = param.getAny();
		assertEquals(param.getAny(), param.any);
		any = null;
		Assert.assertTrue(param.getAny() instanceof List);
	}

	@Test
	public void testGetHref() throws Exception {
		param.setHref("test");
		assertEquals("test", param.getHref());
	}

	@Test
	public void testSetHref() throws Exception {
		param.setHref("test");
		assertEquals(param.getHref(), "test");
	}

	@Test
	public void testGetName() throws Exception {
		param.setName("test");
		assertEquals("test", param.getName());
	}

	@Test
	public void testSetName() throws Exception {
		param.setName("test");
		assertEquals(param.getName(), "test");
	}

	@Test
	public void testGetStyle() throws Exception {
		param.setStyle(style);
		assertEquals(style, param.getStyle());
	}

	@Test
	public void testSetStyle() throws Exception {
		param.setStyle(style);
		assertEquals(param.getStyle(), style);
	}

	@Test
	public void testGetId() throws Exception {
		param.setId("test");
		assertEquals(param.getId(), "test");
	}

	@Test
	public void testSetId() throws Exception {
		param.setId("test");
		assertEquals("test", param.getId());
	}

	@Test
	public void testGetType() throws Exception {
		Param p = Mockito.mock(Param.class);
	    PowerMockito.when(p.getType()).thenReturn(null);
		QName type = new QName("http://www.w3.org/2001/XMLSchema", "string", "xs");
		
		param.setType(type);
		assertEquals(param.getType(), type);

	}

	@Test
	public void testSetType() throws Exception {
		QName type = new QName("http://www.w3.org/2001/XMLSchema", "string", "xs");
		param.setType(type);
		
		assertEquals(param.getType(), type);
	}

	@Test
	public void testGetDefault() throws Exception {
		param.setDefault("test");
		assertEquals("test", param.getDefault());
	}

	@Test
	public void testSetDefault() throws Exception {
		param.setDefault("test");
		assertEquals(param.getDefault(), "test");
	}

	@Test
	public void testIsRequired() throws Exception {
		Assert.assertEquals(null, required);
		//Param p = Mockito.mock(Param.class);
	    //when(p.getIsRequired()).thenReturn(1);
		param.setRequired(true);
		assertTrue(param.isRequired());
	}

	@Test
	public void testSetRequired() throws Exception {
		param.setRequired(true);
		assertTrue(param.isRequired());
	}

	@Test
	public void testIsRepeating() throws Exception {
		param.setRepeating(true);
		assertTrue(param.isRepeating());
	}

	@Test
	public void testSetRepeating() throws Exception {
		param.setRepeating(true);
		assertTrue(param.isRepeating());
	}

	@Test
	public void testGetFixed() throws Exception {
		param.setFixed("test");
		assertEquals("test", param.getFixed());
	}

	@Test
	public void testSetFixed() throws Exception {
		param.setFixed("test");
		assertEquals(param.getFixed(), "test");
	}

	@Test
	public void testGetPath() throws Exception {
		param.setPath("test");
		assertEquals("test", param.getPath());
	}

	@Test
	public void testSetPath() throws Exception {
		param.setPath("test");
		assertEquals(param.getPath(), "test");
	}

	@Test
	public void testGetOtherAttributes() throws Exception {
		param.getOtherAttributes();
	}

}
