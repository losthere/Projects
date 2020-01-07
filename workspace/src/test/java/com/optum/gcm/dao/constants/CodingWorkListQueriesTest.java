package com.optum.gcm.dao.constants;

import static org.junit.Assert.*;

import java.lang.reflect.Field;

import org.junit.Test;

@SuppressWarnings("static-access")
public class CodingWorkListQueriesTest {

	CodingWorkListQueries codingWorkListQueries;
	Field field;
	String s1, s2;

	@Test
	public void test1() throws Exception {
		Class<CodingWorkListQueries> c = CodingWorkListQueries.class;
		field = c.getField("QUERY_GET_CODING_WORKLIST");
		s1 = codingWorkListQueries.QUERY_GET_CODING_WORKLIST;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test2() throws Exception {
		Class<CodingWorkListQueries> c = CodingWorkListQueries.class;
		field = c.getField("QUERY_UPDATE_CODING_RELEASETOASSIGN");
		s1 = codingWorkListQueries.QUERY_UPDATE_CODING_RELEASETOASSIGN;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test3() throws Exception {
		Class<CodingWorkListQueries> c = CodingWorkListQueries.class;
		field = c.getField("QUERY_INSERT_CODERPROD_FORQA");
		s1 = codingWorkListQueries.QUERY_INSERT_CODERPROD_FORQA;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

}
