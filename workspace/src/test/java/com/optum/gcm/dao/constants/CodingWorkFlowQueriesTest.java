package com.optum.gcm.dao.constants;

import static org.junit.Assert.fail;

import java.lang.reflect.Field;

import org.junit.Assert;
import org.junit.Test;

@SuppressWarnings("static-access")
public class CodingWorkFlowQueriesTest {

	CodingWorkFlowQueries codingWorkFlowQueries;
	Field f;
	String s1, s2;

	@Test
	public void test1() throws Exception {
		Class<CodingWorkFlowQueries> c = CodingWorkFlowQueries.class;
		f = c.getField("QUERY_GET_CHART_DETAILS");
		s1 = codingWorkFlowQueries.QUERY_GET_CHART_DETAILS;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test2() throws Exception {
		Class<CodingWorkFlowQueries> c = CodingWorkFlowQueries.class;
		f = c.getField("QUERY_UPDATE_ESC_CHART_STATUS");
		s1 = codingWorkFlowQueries.QUERY_UPDATE_ESC_CHART_STATUS;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test3() throws Exception {
		Class<CodingWorkFlowQueries> c = CodingWorkFlowQueries.class;
		f = c.getField("QUERY_UPDATE_CHART_STATUS");
		s1 = codingWorkFlowQueries.QUERY_UPDATE_CHART_STATUS;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test4() throws Exception {
		Class<CodingWorkFlowQueries> c = CodingWorkFlowQueries.class;
		f = c.getField("QUERY_UPDATE_CHART_STATUS_FORCODING_WI_WHENESC");
		s1 = codingWorkFlowQueries.QUERY_UPDATE_CHART_STATUS_FORCODING_WI_WHENESC;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test5() throws Exception {
		Class<CodingWorkFlowQueries> c = CodingWorkFlowQueries.class;
		f = c.getField("QUERY_SOFTDELETE_ENCOUNTER_DX");
		s1 = codingWorkFlowQueries.QUERY_SOFTDELETE_ENCOUNTER_DX;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test6() throws Exception {
		Class<CodingWorkFlowQueries> c = CodingWorkFlowQueries.class;
		f = c.getField("QUERY_SOFTDELETE_ENCOUNTER");
		s1 = codingWorkFlowQueries.QUERY_SOFTDELETE_ENCOUNTER;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test7() throws Exception {
		Class<CodingWorkFlowQueries> c = CodingWorkFlowQueries.class;
		f = c.getField("QUERY_GET_CHART_HISTORY");
		s1 = codingWorkFlowQueries.QUERY_GET_CHART_HISTORY;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test8() throws Exception {
		Class<CodingWorkFlowQueries> c = CodingWorkFlowQueries.class;
		f = c.getField("QUERY_GET_CHART_COMMENTS");
		s1 = codingWorkFlowQueries.QUERY_GET_CHART_COMMENTS;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test9() throws Exception {
		Class<CodingWorkFlowQueries> c = CodingWorkFlowQueries.class;
		f = c.getField("QUERY_GET_ENC_EO_CODES");
		s1 = codingWorkFlowQueries.QUERY_GET_ENC_EO_CODES;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test10() throws Exception {
		Class<CodingWorkFlowQueries> c = CodingWorkFlowQueries.class;
		f = c.getField("QUERY_INSERT_ESCALATED_WITEM");
		s1 = codingWorkFlowQueries.QUERY_INSERT_ESCALATED_WITEM;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test11() throws Exception {
		Class<CodingWorkFlowQueries> c = CodingWorkFlowQueries.class;
		f = c.getField("QUERY_INSERT_QA_WITEM");
		s1 = codingWorkFlowQueries.QUERY_INSERT_QA_WITEM;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test12() throws Exception {
		Class<CodingWorkFlowQueries> c = CodingWorkFlowQueries.class;
		f = c.getField("QUERY_INSERT_GCM_CODER_PRODUCTIVITY");
		s1 = codingWorkFlowQueries.QUERY_INSERT_GCM_CODER_PRODUCTIVITY;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test13() throws Exception {
		Class<CodingWorkFlowQueries> c = CodingWorkFlowQueries.class;
		f = c.getField("QUERY_INSERT_GCM_CODER_PRODUCTIVITY_FORQAWI");
		s1 = codingWorkFlowQueries.QUERY_INSERT_GCM_CODER_PRODUCTIVITY_FORQAWI;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}
}
