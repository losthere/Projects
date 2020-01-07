package com.optum.gcm.dao.constants;

import java.lang.reflect.Field;

import org.junit.Assert;
import org.junit.Test;

@SuppressWarnings("static-access")
public class CodingQAQueriesTest {

	CodingQAQueries codingQAQueries;
	Field f;
	String s1, s2;

	@Test
	public void test1() throws Exception {
		Class<CodingQAQueries> c = CodingQAQueries.class;
		f = c.getField("QUERY_GET_CODINGQA_WORKLIST");
		s1 = codingQAQueries.QUERY_GET_CODINGQA_WORKLIST;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test2() throws Exception {
		Class<CodingQAQueries> c = CodingQAQueries.class;
		f = c.getField("ACCEPT_CODING_QA_RESULTS_PROC");
		s1 = codingQAQueries.ACCEPT_CODING_QA_RESULTS_PROC;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);

	}

	@Test
	public void test3() throws Exception {
		Class<CodingQAQueries> c = CodingQAQueries.class;
		f = c.getField("FUNC_OPTUM_CODING_ASSIGN_VENDOR_SEARCH");
		s1 = codingQAQueries.FUNC_OPTUM_CODING_ASSIGN_VENDOR_SEARCH;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test4() throws Exception {
		Class<CodingQAQueries> c = CodingQAQueries.class;
		f = c.getField("FUNC_OPTUM_INVENTORY_SEARCH");
		s1 = codingQAQueries.FUNC_OPTUM_INVENTORY_SEARCH;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test5() throws Exception {
		Class<CodingQAQueries> c = CodingQAQueries.class;
		f = c.getField("QUERY_COMPLETED_CODING_QA_ENCOUNTER_DX");
		s1 = codingQAQueries.QUERY_COMPLETED_CODING_QA_ENCOUNTER_DX;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test6() throws Exception {
		Class<CodingQAQueries> c = CodingQAQueries.class;
		f = c.getField("QUERY_ENCOUNTER_DX");
		s1 = codingQAQueries.QUERY_ENCOUNTER_DX;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test7() throws Exception {
		Class<CodingQAQueries> c = CodingQAQueries.class;
		f = c.getField("QUERY_OPTUM_CODING_UNASSIGNED_INVENTORY");
		s1 = codingQAQueries.QUERY_OPTUM_CODING_UNASSIGNED_INVENTORY;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test8() throws Exception {
		Class<CodingQAQueries> c = CodingQAQueries.class;
		f = c.getField("QUERY_OPTUM_QA_UNASSIGNED_INVENTORY");
		s1 = codingQAQueries.QUERY_OPTUM_QA_UNASSIGNED_INVENTORY;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test9() throws Exception {
		Class<CodingQAQueries> c = CodingQAQueries.class;
		f = c.getField("QUERY_UPDATE_CODINGQA_RELEASETOASSIGN");
		s1 = codingQAQueries.QUERY_UPDATE_CODINGQA_RELEASETOASSIGN;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test10() throws Exception {
		Class<CodingQAQueries> c = CodingQAQueries.class;
		f = c.getField("SAVE_CODING_QA_RESULTS_PROC");
		s1 = codingQAQueries.SAVE_CODING_QA_RESULTS_PROC;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test11() throws Exception {
		Class<CodingQAQueries> c = CodingQAQueries.class;
		f = c.getField("QUERY_UPDATE_CODINGQA_ADDTOMYWORKLIST");
		s1 = codingQAQueries.QUERY_UPDATE_CODINGQA_ADDTOMYWORKLIST;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}
	@Test
	public void test12() throws Exception {
		Class<CodingQAQueries> c = CodingQAQueries.class;
		f = c.getField("QUERY_TO_CHECK_CLOSED_PROJS");
		s1 = codingQAQueries.QUERY_TO_CHECK_CLOSED_PROJS;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}
}
