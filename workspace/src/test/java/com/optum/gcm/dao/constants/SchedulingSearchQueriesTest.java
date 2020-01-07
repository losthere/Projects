package com.optum.gcm.dao.constants;

import static org.junit.Assert.assertEquals;

import java.lang.reflect.Field;

import org.junit.Test;

@SuppressWarnings("static-access")
public class SchedulingSearchQueriesTest {

	SchedulingSearchQueries schedulingSearchQueries;
	Field field;
	String s1, s2;

	@Test
	public void test1() throws Exception {
		Class<SchedulingSearchQueries> c = SchedulingSearchQueries.class;
		field = c.getField("QUERY_PROJECT_HAS_NEW_STATUS");
		s1 = schedulingSearchQueries.QUERY_PROJECT_HAS_NEW_STATUS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test2() throws Exception {
		Class<SchedulingSearchQueries> c = SchedulingSearchQueries.class;
		field = c.getField("QUERY_PROJECT_HAS_COMP_BARCODES");
		s1 = schedulingSearchQueries.QUERY_PROJECT_HAS_COMP_BARCODES;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test3() throws Exception {
		Class<SchedulingSearchQueries> c = SchedulingSearchQueries.class;
		field = c.getField("QUERY_GET_INVENTORY_SCHEDULING_SELECT");
		s1 = schedulingSearchQueries.QUERY_GET_INVENTORY_SCHEDULING_SELECT;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test4() throws Exception {
		Class<SchedulingSearchQueries> c = SchedulingSearchQueries.class;
		field = c.getField("QUERY_GET_UNASSIGNED_INVENTORY_SCHEDULING");
		s1 = schedulingSearchQueries.QUERY_GET_UNASSIGNED_INVENTORY_SCHEDULING;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test5() throws Exception {
		Class<SchedulingSearchQueries> c = SchedulingSearchQueries.class;
		field = c.getField("QUERY_GET_ASSIGNED_INVENTORY_SCHEDULING");
		s1 = schedulingSearchQueries.QUERY_GET_ASSIGNED_INVENTORY_SCHEDULING;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

}
