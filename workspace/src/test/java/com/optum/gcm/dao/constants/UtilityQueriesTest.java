package com.optum.gcm.dao.constants;

import static org.junit.Assert.assertEquals;

import java.lang.reflect.Field;

import org.junit.Test;

@SuppressWarnings("static-access")
public class UtilityQueriesTest {

	UtilityQueries utilityQueries;
	Field field;
	String s1, s2;

	@Test
	public void test1() throws Exception {
		Class<UtilityQueries> c = UtilityQueries.class;
		field = c.getField("QUERY_GET_PROJECT_LIST");
		s1 = utilityQueries.QUERY_GET_PROJECT_LIST;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test2() throws Exception {
		Class<UtilityQueries> c = UtilityQueries.class;
		field = c.getField("QUERY_GET_PROJECTS_FORCLOSE");
		s1 = utilityQueries.QUERY_GET_PROJECTS_FORCLOSE;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test3() throws Exception {
		Class<UtilityQueries> c = UtilityQueries.class;
		field = c.getField("QUERY_UPDATE_PROJECT_RELEASE");
		s1 = utilityQueries.QUERY_UPDATE_PROJECT_RELEASE;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test4() throws Exception {
		Class<UtilityQueries> c = UtilityQueries.class;
		field = c.getField("QUERY_UPDATE_PROJECT_DELETE");
		s1 = utilityQueries.QUERY_UPDATE_PROJECT_DELETE;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test5() throws Exception {
		Class<UtilityQueries> c = UtilityQueries.class;
		field = c.getField("FUNC_SEARCH_BY_MEMBER");
		s1 = utilityQueries.FUNC_SEARCH_BY_MEMBER;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test6() throws Exception {
		Class<UtilityQueries> c = UtilityQueries.class;
		field = c.getField("FUNC_SEARCH_BY_PROVIDER");
		s1 = utilityQueries.FUNC_SEARCH_BY_PROVIDER;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test7() throws Exception {
		Class<UtilityQueries> c = UtilityQueries.class;
		field = c.getField("FUNC_SEARCH_BY_CLIENTID");
		s1 = utilityQueries.FUNC_SEARCH_BY_CLIENTID;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test8() throws Exception {
		Class<UtilityQueries> c = UtilityQueries.class;
		field = c.getField("FUNC_SEARCH_BY_CHARTID");
		s1 = utilityQueries.FUNC_SEARCH_BY_CHARTID;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test9() throws Exception {
		Class<UtilityQueries> c = UtilityQueries.class;
		field = c.getField("QUERY_UPDATE_PROJECT_CLOSING");
		s1 = utilityQueries.QUERY_UPDATE_PROJECT_CLOSING;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test10() throws Exception {
		Class<UtilityQueries> c = UtilityQueries.class;
		field = c.getField("QUERY_UPDATE_SEARCHCHART_STATUS");
		s1 = utilityQueries.QUERY_UPDATE_SEARCHCHART_STATUS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test11() throws Exception {
		Class<UtilityQueries> c = UtilityQueries.class;
		field = c.getField("QUERY_UPDATE_SEARCHCHART_STATUS_FORRETWI");
		s1 = utilityQueries.QUERY_UPDATE_SEARCHCHART_STATUS_FORRETWI;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

}
