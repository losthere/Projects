package com.optum.gcm.dao.constants;

import static org.junit.Assert.*;

import java.lang.reflect.Field;

import org.junit.Test;

@SuppressWarnings("static-access")
public class RetrievalActionQueriesTest {

	RetrievalActionQueries retrievalActionQueries;
	Field field;
	String s1, s2;

	@Test
	public void test1() throws Exception {
		Class<RetrievalActionQueries> c = RetrievalActionQueries.class;
		field = c.getField("QUERY_PROJECT_HAS_NEW_STATUS");
		s1 = retrievalActionQueries.QUERY_PROJECT_HAS_NEW_STATUS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test2() throws Exception {
		Class<RetrievalActionQueries> c = RetrievalActionQueries.class;
		field = c.getField("QUERY_PROJECT_HAS_COMP_BARCODES");
		s1 = retrievalActionQueries.QUERY_PROJECT_HAS_COMP_BARCODES;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test3() throws Exception {
		Class<RetrievalActionQueries> c = RetrievalActionQueries.class;
		field = c.getField("QUERY_UPDATE_PROJECT");
		s1 = retrievalActionQueries.QUERY_UPDATE_PROJECT;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test4() throws Exception {
		Class<RetrievalActionQueries> c = RetrievalActionQueries.class;
		field = c.getField("QUERY_BARCODES_HAS_INVALID_PROGRAM");
		s1 = retrievalActionQueries.QUERY_BARCODES_HAS_INVALID_PROGRAM;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test5() throws Exception {
		Class<RetrievalActionQueries> c = RetrievalActionQueries.class;
		field = c.getField("QUERY_BARCODES_HAS_INVALID_BUSINESS_SEGMENT");
		s1 = retrievalActionQueries.QUERY_BARCODES_HAS_INVALID_BUSINESS_SEGMENT;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test6() throws Exception {
		Class<RetrievalActionQueries> c = RetrievalActionQueries.class;
		field = c.getField("QUERY_BARCODES_HAS_INVALID_GROUP");
		s1 = retrievalActionQueries.QUERY_BARCODES_HAS_INVALID_GROUP;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test7() throws Exception {
		Class<RetrievalActionQueries> c = RetrievalActionQueries.class;
		field = c.getField("QUERY_BARCODES_VALIDATION");
		s1 = retrievalActionQueries.QUERY_BARCODES_VALIDATION;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test8() throws Exception {
		Class<RetrievalActionQueries> c = RetrievalActionQueries.class;
		field = c.getField("UPDATE_BAROCDES_STATUS");
		s1 = retrievalActionQueries.UPDATE_BAROCDES_STATUS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test9() throws Exception {
		Class<RetrievalActionQueries> c = RetrievalActionQueries.class;
		field = c.getField("INSERT_VENDOR_MANIFEST");
		s1 = retrievalActionQueries.INSERT_VENDOR_MANIFEST;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

}
