package com.optum.gcm.dao.constants;

import static org.junit.Assert.*;

import java.lang.reflect.Field;

import org.junit.Test;

@SuppressWarnings("static-access")
public class SchedulingWorlListQueriesTest {

	SchedulingWorlListQueries schedulingWorlListQueries;
	Field field;
	String s1, s2;

	@Test
	public void test1() throws Exception {
		Class<SchedulingWorlListQueries> c = SchedulingWorlListQueries.class;
		field = c.getField("QUERY_GET_WORKLIST_COUNTS");
		s1 = schedulingWorlListQueries.QUERY_GET_WORKLIST_COUNTS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test2() throws Exception {
		Class<SchedulingWorlListQueries> c = SchedulingWorlListQueries.class;
		field = c.getField("QUERY_GET_MY_APPTS");
		s1 = schedulingWorlListQueries.QUERY_GET_MY_APPTS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test3() throws Exception {
		Class<SchedulingWorlListQueries> c = SchedulingWorlListQueries.class;
		field = c.getField("QUERY_GET_USER_SCHEDULIG_WORKLIST");
		s1 = schedulingWorlListQueries.QUERY_GET_USER_SCHEDULIG_WORKLIST;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

}
