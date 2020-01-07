package com.optum.gcm.dao.constants;

import static org.junit.Assert.assertEquals;

import java.lang.reflect.Field;

import org.junit.Test;

@SuppressWarnings("static-access")
public class PendManagementQueriesTest {

	PendManagementQueries pendManagementQueries;
	Field field;
	String s1, s2;

	@Test
	public void test1() throws Exception {
		Class<PendManagementQueries> c = PendManagementQueries.class;
		field = c.getField("QUERY_GET_PENDMGMT_INVENTORY");
		s1 = pendManagementQueries.QUERY_GET_PENDMGMT_INVENTORY;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test2() throws Exception {
		Class<PendManagementQueries> c = PendManagementQueries.class;
		field = c.getField("QUERY_UPDATE_PEND_WORK_LIST_USERKEY_NULL");
		s1 = pendManagementQueries.QUERY_UPDATE_PEND_WORK_LIST_USERKEY_NULL;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test3() throws Exception {
		Class<PendManagementQueries> c = PendManagementQueries.class;
		field = c.getField("QUERY_UPDATE_CHART_STATUS");
		s1 = pendManagementQueries.QUERY_UPDATE_CHART_STATUS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test4() throws Exception {
		Class<PendManagementQueries> c = PendManagementQueries.class;
		field = c.getField("QUERY_SELECT_CHART_STATUS");
		s1 = pendManagementQueries.QUERY_SELECT_CHART_STATUS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}


	@Test
	public void test5() throws Exception {
		Class<PendManagementQueries> c = PendManagementQueries.class;
		field = c.getField("QUERY_UPDATE_APPT_STATUS");
		s1 = pendManagementQueries.QUERY_UPDATE_APPT_STATUS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test6() throws Exception {
		Class<PendManagementQueries> c = PendManagementQueries.class;
		field = c.getField("QUERY_UPDATE_PEND_WORK_LIST_USERKEY_NOTNULL");
		s1 = pendManagementQueries.QUERY_UPDATE_PEND_WORK_LIST_USERKEY_NOTNULL;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

}
