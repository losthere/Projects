package com.optum.gcm.wadl;

import static org.junit.Assert.*;

import org.junit.Test;

public class ParamStyleTest {

	@Test
	public void testValue() {
		assertEquals("plain", ParamStyle.PLAIN.value());
		assertEquals("query", ParamStyle.QUERY.value());
		assertEquals("matrix", ParamStyle.MATRIX.value());
		assertEquals("header", ParamStyle.HEADER.value());
		assertEquals("template", ParamStyle.TEMPLATE.value());
	}

	@Test
	public void testFromValue() {
		assertEquals(ParamStyle.PLAIN, ParamStyle.fromValue("plain"));
		assertEquals(ParamStyle.QUERY, ParamStyle.fromValue("query"));
		assertEquals(ParamStyle.MATRIX, ParamStyle.fromValue("matrix"));
		assertEquals(ParamStyle.HEADER, ParamStyle.fromValue("header"));
		assertEquals(ParamStyle.TEMPLATE, ParamStyle.fromValue("template"));
	}

	@Test(expected = IllegalArgumentException.class)
	public void testIllegalArgumentException() {
		ParamStyle.fromValue("new");
	}
}
