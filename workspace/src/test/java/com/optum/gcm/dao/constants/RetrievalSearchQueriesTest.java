package com.optum.gcm.dao.constants;

import static org.junit.Assert.assertEquals;

import java.lang.reflect.Field;

import org.junit.Test;

@SuppressWarnings("static-access")
public class RetrievalSearchQueriesTest {

	RetrievalSearchQueries retrievalSearchQueries;
	Field field;
	String s1, s2;

	@Test
	public void test1() throws Exception {
		Class<RetrievalSearchQueries> c = RetrievalSearchQueries.class;
		field = c.getField("HINT_FULL_BVF");
		s1 = retrievalSearchQueries.HINT_FULL_BVF;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test2() throws Exception {
		Class<RetrievalSearchQueries> c = RetrievalSearchQueries.class;
		field = c.getField("QUERY_SEARCH_PROJECTS");
		s1 = retrievalSearchQueries.QUERY_SEARCH_PROJECTS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test3() throws Exception {
		Class<RetrievalSearchQueries> c = RetrievalSearchQueries.class;
		field = c.getField("QUERY_EXPAND_PROJECT");
		s1 = retrievalSearchQueries.QUERY_EXPAND_PROJECT;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test4() throws Exception {
		Class<RetrievalSearchQueries> c = RetrievalSearchQueries.class;
		field = c.getField("QUERY_SEARCH_BASE");
		s1 = retrievalSearchQueries.QUERY_SEARCH_BASE;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test5() throws Exception {
		Class<RetrievalSearchQueries> c = RetrievalSearchQueries.class;
		field = c.getField("QUERY_EXPORT_RESULTS");
		s1 = retrievalSearchQueries.QUERY_EXPORT_RESULTS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test6() throws Exception {
		Class<RetrievalSearchQueries> c = RetrievalSearchQueries.class;
		field = c.getField("QUERY_HP_BY_PROJECT");
		s1 = retrievalSearchQueries.QUERY_HP_BY_PROJECT;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test7() throws Exception {
		Class<RetrievalSearchQueries> c = RetrievalSearchQueries.class;
		field = c.getField("QUERY_USER_HAS_PROGRAMS");
		s1 = retrievalSearchQueries.QUERY_USER_HAS_PROGRAMS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test8() throws Exception {
		Class<RetrievalSearchQueries> c = RetrievalSearchQueries.class;
		field = c.getField("QUERY_USER_HAS_BUS_SEGMENTS");
		s1 = retrievalSearchQueries.QUERY_USER_HAS_BUS_SEGMENTS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test9() throws Exception {
		Class<RetrievalSearchQueries> c = RetrievalSearchQueries.class;
		field = c.getField("QUERY_VALIDATE_DELETE_COMP");
		s1 = retrievalSearchQueries.QUERY_VALIDATE_DELETE_COMP;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test10() throws Exception {
		Class<RetrievalSearchQueries> c = RetrievalSearchQueries.class;
		field = c.getField("QUERY_USER_HAS_BUS_SEGMENTS");
		s1 = retrievalSearchQueries.QUERY_USER_HAS_BUS_SEGMENTS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test11() throws Exception {
		Class<RetrievalSearchQueries> c = RetrievalSearchQueries.class;
		field = c.getField("QUERY_HAS_VALID_SUP_RECS");
		s1 = retrievalSearchQueries.QUERY_HAS_VALID_SUP_RECS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test12() throws Exception {
		Class<RetrievalSearchQueries> c = RetrievalSearchQueries.class;
		field = c.getField("QUERY_ASSIGN_FILE_CHECK");
		s1 = retrievalSearchQueries.QUERY_ASSIGN_FILE_CHECK;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test13() throws Exception {
		Class<RetrievalSearchQueries> c = RetrievalSearchQueries.class;
		field = c.getField("QUERY_SUPPLEMENT_MISSING");
		s1 = retrievalSearchQueries.QUERY_SUPPLEMENT_MISSING;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test14() throws Exception {
		Class<RetrievalSearchQueries> c = RetrievalSearchQueries.class;
		field = c.getField("QUERY_RETRIEVAL_SEARCH_TOTAL_CNT");
		s1 = retrievalSearchQueries.QUERY_RETRIEVAL_SEARCH_TOTAL_CNT;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test15() throws Exception {
		Class<RetrievalSearchQueries> c = RetrievalSearchQueries.class;
		field = c.getField("QUERY_UPDATE_PROJECT");
		s1 = retrievalSearchQueries.QUERY_UPDATE_PROJECT;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test16() throws Exception {
		Class<RetrievalSearchQueries> c = RetrievalSearchQueries.class;
		field = c.getField("QUERY_GET_ASSIGNABLE_VENDORS");
		s1 = retrievalSearchQueries.QUERY_GET_ASSIGNABLE_VENDORS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test17() throws Exception {
		Class<RetrievalSearchQueries> c = RetrievalSearchQueries.class;
		field = c.getField("QUERY_GET_ASSIGNABLE_VENDORS_BY_HP_CLIENT");
		s1 = retrievalSearchQueries.QUERY_GET_ASSIGNABLE_VENDORS_BY_HP_CLIENT;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

}
