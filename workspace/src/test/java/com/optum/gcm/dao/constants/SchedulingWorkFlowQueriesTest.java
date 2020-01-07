package com.optum.gcm.dao.constants;

import static org.junit.Assert.assertEquals;

import java.lang.reflect.Field;

import org.junit.Test;

@SuppressWarnings("static-access")
public class SchedulingWorkFlowQueriesTest {

	SchedulingWorkFlowQueries schedulingWorkFlowQueries;
	Field field;
	String s1, s2;

	@Test
	public void test1() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_GET_PEND_CNT_APPT_BY_USER_VENDOR");
		s1 = schedulingWorkFlowQueries.QUERY_GET_PEND_CNT_APPT_BY_USER_VENDOR;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test2() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_GET_APPT_CNT_BY_USER_VENDOR");
		s1 = schedulingWorkFlowQueries.QUERY_GET_APPT_CNT_BY_USER_VENDOR;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test3() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_GET_RETWI_BY_USER_ROLE_CD");
		s1 = schedulingWorkFlowQueries.QUERY_GET_RETWI_BY_USER_ROLE_CD;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test4() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_UPDATE_RETWI_STATUS");
		s1 = schedulingWorkFlowQueries.QUERY_UPDATE_RETWI_STATUS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test5() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_SELECT_PROVIDER_KEYS");
		s1 = schedulingWorkFlowQueries.QUERY_SELECT_PROVIDER_KEYS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test6() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_UPDATE_WORKLIST_PROVIDER_DETAILS");
		s1 = schedulingWorkFlowQueries.QUERY_UPDATE_WORKLIST_PROVIDER_DETAILS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test7() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_UPDATE_APPT_DETAILS");
		s1 = schedulingWorkFlowQueries.QUERY_UPDATE_APPT_DETAILS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test8() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_GET_CHARTDS_BY_APPT_KEY");
		s1 = schedulingWorkFlowQueries.QUERY_GET_CHARTDS_BY_APPT_KEY;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test9() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_GET_MEMBER_DETAILS");
		s1 = schedulingWorkFlowQueries.QUERY_GET_MEMBER_DETAILS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test10() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUEY_GETCHARTSTATUS_CNTS");
		s1 = schedulingWorkFlowQueries.QUEY_GETCHARTSTATUS_CNTS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test11() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_REMOVE_EXCLUDED_WI_FROM_APPT");
		s1 = schedulingWorkFlowQueries.QUERY_REMOVE_EXCLUDED_WI_FROM_APPT;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test12() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_GET_APPT_COMMENT");
		s1 = schedulingWorkFlowQueries.QUERY_GET_APPT_COMMENT;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test13() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_UPDATE_RETWI_RELTOASSN");
		s1 = schedulingWorkFlowQueries.QUERY_UPDATE_RETWI_RELTOASSN;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test14() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_PUSH_NOT_SELECTED_WI_TO_WL");
		s1 = schedulingWorkFlowQueries.QUERY_PUSH_NOT_SELECTED_WI_TO_WL;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test15() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_UPDATE_RETWI_WOAPPT");
		s1 = schedulingWorkFlowQueries.QUERY_UPDATE_RETWI_WOAPPT;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test16() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_UPDATE_RETWI_APPTCANCEL");
		s1 = schedulingWorkFlowQueries.QUERY_UPDATE_RETWI_APPTCANCEL;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test17() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_UPDATE_RETAPPT_APPTCANCEL");
		s1 = schedulingWorkFlowQueries.QUERY_UPDATE_RETAPPT_APPTCANCEL;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test18() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_UPDATE_RETAPPT_DATEANDTIME");
		s1 = schedulingWorkFlowQueries.QUERY_UPDATE_RETAPPT_DATEANDTIME;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test19() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_UPDATE_RETWI_WITHAPPT");
		s1 = schedulingWorkFlowQueries.QUERY_UPDATE_RETWI_WITHAPPT;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test20() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_GET_PROVDETAILS_BYAPPTID");
		s1 = schedulingWorkFlowQueries.QUERY_GET_PROVDETAILS_BYAPPTID;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test21() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_GET_CHARTDS_WITHOUTAPPT");
		s1 = schedulingWorkFlowQueries.QUERY_GET_CHARTDS_WITHOUTAPPT;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test22() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_GET_EXISTING_APPTS");
		s1 = schedulingWorkFlowQueries.QUERY_GET_EXISTING_APPTS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test23() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_GET_APPTDETAILS_BYAPPTID");
		s1 = schedulingWorkFlowQueries.QUERY_GET_APPTDETAILS_BYAPPTID;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test24() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_GET_APPTDETAILS_BYCHARTID");
		s1 = schedulingWorkFlowQueries.QUERY_GET_APPTDETAILS_BYCHARTID;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test25() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_GET_CHART_MEMBER_DETAILS");
		s1 = schedulingWorkFlowQueries.QUERY_GET_CHART_MEMBER_DETAILS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test26() throws Exception {
		Class<SchedulingWorkFlowQueries> c = SchedulingWorkFlowQueries.class;
		field = c.getField("QUERY_GET_CHART_MEMBER_DETAILS_WITHAPPT");
		s1 = schedulingWorkFlowQueries.QUERY_GET_CHART_MEMBER_DETAILS_WITHAPPT;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

}
