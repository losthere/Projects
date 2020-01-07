package com.optum.gcm.dao.constants;

import static org.junit.Assert.*;

import java.lang.reflect.Field;

import org.junit.Test;

@SuppressWarnings("static-access")
public class MasterDataQueriesTest {
	MasterDataQueries masterDataQueries;
	Field field;
	String s1, s2;

	@Test
	public void test1() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_BUSINESS_SEGMENTS");
		s1 = masterDataQueries.QUERY_GET_BUSINESS_SEGMENTS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test2() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_BUSINESS_SEGMENTS_BY_USER_ASSOCIATION");
		s1 = masterDataQueries.QUERY_GET_BUSINESS_SEGMENTS_BY_USER_ASSOCIATION;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test3() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_BUSINESS_SEGMENTS_BY_USER");
		s1 = masterDataQueries.QUERY_GET_BUSINESS_SEGMENTS_BY_USER;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test4() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_PROGRAMS_BY_BUSINESS_SEGMENT");
		s1 = masterDataQueries.QUERY_GET_PROGRAMS_BY_BUSINESS_SEGMENT;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test5() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_PROGRAMS_BY_BUS_SEG_AND_USR_ASSOCIATION");
		s1 = masterDataQueries.QUERY_GET_PROGRAMS_BY_BUS_SEG_AND_USR_ASSOCIATION;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test6() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_PROJ_YEARS_BY_BUSINESS_SEGMENT_AND_PROGRAM");
		s1 = masterDataQueries.QUERY_GET_PROJ_YEARS_BY_BUSINESS_SEGMENT_AND_PROGRAM;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test7() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_CHART_SCORE_GROUP");
		s1 = masterDataQueries.QUERY_GET_CHART_SCORE_GROUP;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test8() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_PROV_SPEC_CODES");
		s1 = masterDataQueries.QUERY_GET_PROV_SPEC_CODES;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test9() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_STATES");
		s1 = masterDataQueries.QUERY_GET_STATES;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test10() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_VENDORS");
		s1 = masterDataQueries.QUERY_GET_VENDORS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test11() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_VENDORS_BY_USER_ASSOCIATION");
		s1 = masterDataQueries.QUERY_GET_VENDORS_BY_USER_ASSOCIATION;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test12() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_CLIENTS");
		s1 = masterDataQueries.QUERY_GET_CLIENTS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test13() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_CLIENTS_BY_USER_ASSOCIATION");
		s1 = masterDataQueries.QUERY_GET_CLIENTS_BY_USER_ASSOCIATION;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test14() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_HP_BY_BUSINESS_SEGMENT_AND_CLIENT");
		s1 = masterDataQueries.QUERY_GET_HP_BY_BUSINESS_SEGMENT_AND_CLIENT;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test15() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_HP_BY_CLIENT_USER_ASSOCIATION");
		s1 = masterDataQueries.QUERY_GET_HP_BY_CLIENT_USER_ASSOCIATION;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test16() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_HP_BY_BUS_SEG_USER_ASSOCIATION");
		s1 = masterDataQueries.QUERY_GET_HP_BY_BUS_SEG_USER_ASSOCIATION;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test17() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_USERS_AND_COUNT");
		s1 = masterDataQueries.QUERY_GET_USERS_AND_COUNT;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test18() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_HP_PRODUCT_BY_HP");
		s1 = masterDataQueries.QUERY_GET_HP_PRODUCT_BY_HP;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test19() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_HP_PRD_BY_HP_USER_ASSOCIATION");
		s1 = masterDataQueries.QUERY_GET_HP_PRD_BY_HP_USER_ASSOCIATION;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test20() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_HP_PRD_BY_HP_BUS_SEG_USER_ASSOCIATION");
		s1 = masterDataQueries.QUERY_GET_HP_PRD_BY_HP_BUS_SEG_USER_ASSOCIATION;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test21() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_PROV_DETAILS");
		s1 = masterDataQueries.QUERY_GET_PROV_DETAILS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test22() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_PROJECTS_BUS_SEGMENT");
		s1 = masterDataQueries.QUERY_GET_PROJECTS_BUS_SEGMENT;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test23() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_PROJECTS_WITH_BUS_SEGMENT");
		s1 = masterDataQueries.QUERY_GET_PROJECTS_WITH_BUS_SEGMENT;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test24() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_STATUS_BY_BUSINESS_FUNCTION");
		s1 = masterDataQueries.QUERY_GET_STATUS_BY_BUSINESS_FUNCTION;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test25() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_STATUS_FOR_RET");
		s1 = masterDataQueries.QUERY_GET_STATUS_FOR_RET;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test26() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_USERS_BY_ROLE_VENDOR");
		s1 = masterDataQueries.QUERY_GET_USERS_BY_ROLE_VENDOR;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test27() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_USERS_BY_BUSFUNCDETAIL");
		s1 = masterDataQueries.QUERY_GET_USERS_BY_BUSFUNCDETAIL;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test28() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_CODING_SUPERVISORS_FOR_VENDOR");
		s1 = masterDataQueries.QUERY_GET_CODING_SUPERVISORS_FOR_VENDOR;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test29() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_SUPERVISORS_FOR_VENDOR");
		s1 = masterDataQueries.QUERY_GET_SUPERVISORS_FOR_VENDOR;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test30() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_ROLES_BY_GROUP_VENDOR");
		s1 = masterDataQueries.QUERY_GET_ROLES_BY_GROUP_VENDOR;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test31() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_USERS_BY_SUPERVISOR");
		s1 = masterDataQueries.QUERY_GET_USERS_BY_SUPERVISOR;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test32() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_REASONCODES");
		s1 = masterDataQueries.QUERY_GET_REASONCODES;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test33() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_PROJECTS_USER_KEY");
		s1 = masterDataQueries.QUERY_GET_PROJECTS_USER_KEY;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test34() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("FUNC_GET_PROJ_BY_USER");
		s1 = masterDataQueries.FUNC_GET_PROJ_BY_USER;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test35() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("FUNC_GET_PROJ_BY_FILTER");
		s1 = masterDataQueries.FUNC_GET_PROJ_BY_FILTER;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test36() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("FUNC_GET_PROJ_BY_FILTER_FOR_UTILITY");
		s1 = masterDataQueries.FUNC_GET_PROJ_BY_FILTER_FOR_UTILITY;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test37() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("FUNC_GET_VENDOR_BY_INV_FILTER");
		s1 = masterDataQueries.FUNC_GET_VENDOR_BY_INV_FILTER;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test38() throws Exception {
		Class<MasterDataQueries> c = MasterDataQueries.class;
		field = c.getField("QUERY_GET_ROLES");
		s1 = masterDataQueries.QUERY_GET_ROLES;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

}
