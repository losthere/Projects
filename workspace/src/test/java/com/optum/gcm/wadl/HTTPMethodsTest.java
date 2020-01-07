package com.optum.gcm.wadl;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class HTTPMethodsTest {

	@Test
	public void test() {
		assertEquals((HTTPMethods.GET), HTTPMethods.valueOf("GET"));
		assertEquals((HTTPMethods.PUT), HTTPMethods.valueOf("PUT"));
		assertEquals((HTTPMethods.POST), HTTPMethods.valueOf("POST"));
		assertEquals((HTTPMethods.HEAD), HTTPMethods.valueOf("HEAD"));
		assertEquals((HTTPMethods.DELETE), HTTPMethods.valueOf("DELETE"));
	}

	@Test
	public void testValue() {
		assertEquals("GET", HTTPMethods.GET.value());
		assertEquals("PUT", HTTPMethods.PUT.value());
		assertEquals("POST", HTTPMethods.POST.value());
		assertEquals("HEAD", HTTPMethods.HEAD.value());
		assertEquals("DELETE", HTTPMethods.DELETE.value());
	}

	@Test
	public void testFromValue() {
		assertEquals((HTTPMethods.GET), HTTPMethods.fromValue("GET"));
		assertEquals((HTTPMethods.PUT), HTTPMethods.fromValue("PUT"));
		assertEquals((HTTPMethods.POST), HTTPMethods.fromValue("POST"));
		assertEquals((HTTPMethods.HEAD), HTTPMethods.fromValue("HEAD"));
		assertEquals((HTTPMethods.DELETE), HTTPMethods.fromValue("DELETE"));
	}

}
