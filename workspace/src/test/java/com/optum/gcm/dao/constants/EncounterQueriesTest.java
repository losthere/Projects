package com.optum.gcm.dao.constants;

import static org.junit.Assert.*;

import java.lang.reflect.Field;

import org.junit.Test;

@SuppressWarnings("static-access")
public class EncounterQueriesTest {

	EncounterQueries encounterQueries;
	Field field;
	String s1, s2;

	@Test
	public void test1() throws Exception {
		Class<EncounterQueries> c = EncounterQueries.class;
		field = c.getField("QUERY_GET_ENCOUNTERS");
		s1 = encounterQueries.QUERY_GET_ENCOUNTERS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test2() throws Exception {
		Class<EncounterQueries> c = EncounterQueries.class;
		field = c.getField("QUERY_GET_ENCDXHCC");
		s1 = encounterQueries.QUERY_GET_ENCDXHCC;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test3() throws Exception {
		Class<EncounterQueries> c = EncounterQueries.class;
		field = c.getField("QUERY_DELETE_ENCDX");
		s1 = encounterQueries.QUERY_DELETE_ENCDX;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test4() throws Exception {
		Class<EncounterQueries> c = EncounterQueries.class;
		field = c.getField("QUERY_DELETE_ENC");
		s1 = encounterQueries.QUERY_DELETE_ENC;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test5() throws Exception {
		Class<EncounterQueries> c = EncounterQueries.class;
		field = c.getField("QUERY_DELETE_DX_BY_DXKEY");
		s1 = encounterQueries.QUERY_DELETE_DX_BY_DXKEY;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test6() throws Exception {
		Class<EncounterQueries> c = EncounterQueries.class;
		field = c.getField("QUERY_UPDATE_DX_BY_DXKEY");
		s1 = encounterQueries.QUERY_UPDATE_DX_BY_DXKEY;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test7() throws Exception {
		Class<EncounterQueries> c = EncounterQueries.class;
		field = c.getField("QUERY_UPDATE_ENC");
		s1 = encounterQueries.QUERY_UPDATE_ENC;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test8() throws Exception {
		Class<EncounterQueries> c = EncounterQueries.class;
		field = c.getField("QUERY_CHECK_IS_WORK_ITEM_ACITVE");
		s1 = encounterQueries.QUERY_CHECK_IS_WORK_ITEM_ACITVE;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}
	

	@Test
	public void test9() throws Exception {
		Class<EncounterQueries> c = EncounterQueries.class;
		field = c.getField("DELETE_ENC_EO_BY_EO_CD");
		s1 = encounterQueries.DELETE_ENC_EO_BY_EO_CD;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}
	
	@Test
	public void test10() throws Exception {
		Class<EncounterQueries> c = EncounterQueries.class;
		field = c.getField("INSERT_ENC_EO_BY_EO_CD");
		s1 = encounterQueries.INSERT_ENC_EO_BY_EO_CD;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

}
