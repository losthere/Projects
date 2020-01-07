package com.optum.gcm.dao.constants;

import static org.junit.Assert.assertEquals;

import java.lang.reflect.Field;

import org.junit.Test;

@SuppressWarnings("static-access")
public class SchedulingAssignmentQuriesTest {

	SchedulingAssignmentQuries schedulingAssignmentQuries;
	Field field;
	String s1, s2;

	@Test
	public void test1() throws Exception {
		Class<SchedulingAssignmentQuries> c = SchedulingAssignmentQuries.class;
		field = c.getField("QUERY_ASSIGN_TO_USER");
		s1 = schedulingAssignmentQuries.QUERY_ASSIGN_TO_USER;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test2() throws Exception {
		Class<SchedulingAssignmentQuries> c = SchedulingAssignmentQuries.class;
		field = c.getField("QUERY_REASSIGN_TO_USER");
		s1 = schedulingAssignmentQuries.QUERY_REASSIGN_TO_USER;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}
}