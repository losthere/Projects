package com.optum.gcm.dao.constants;

import static org.junit.Assert.*;

import java.lang.reflect.Field;

import org.junit.Test;

@SuppressWarnings("static-access")
public class FaxQueryConstantsTest {

	FaxQueryConstants faxQueryConstants;
	Field field;
	String s1, s2;

	@Test
	public void test1() throws Exception {
		Class<FaxQueryConstants> c = FaxQueryConstants.class;
		field = c.getField("QUERY_FAX_DOCUMENTID");
		s1 = faxQueryConstants.QUERY_FAX_DOCUMENTID;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test2() throws Exception {
		Class<FaxQueryConstants> c = FaxQueryConstants.class;
		field = c.getField("QUERY_FAX_HISTORY");
		s1 = faxQueryConstants.QUERY_FAX_HISTORY;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test3() throws Exception {
		Class<FaxQueryConstants> c = FaxQueryConstants.class;
		field = c.getField("UPDATE_CHARTS_AS_REFAX");
		s1 = faxQueryConstants.UPDATE_CHARTS_AS_REFAX;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test4() throws Exception {
		Class<FaxQueryConstants> c = FaxQueryConstants.class;
		field = c.getField("UPDATE_APPT_AS_REFAX");
		s1 = faxQueryConstants.UPDATE_APPT_AS_REFAX;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test5() throws Exception {
		Class<FaxQueryConstants> c = FaxQueryConstants.class;
		field = c.getField("UPDATE_APPTSTS_AS_REFAX");
		s1 = faxQueryConstants.UPDATE_APPTSTS_AS_REFAX;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

}
