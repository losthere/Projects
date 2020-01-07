package com.optum.gcm.dao.constants;

import java.lang.reflect.Field;

import org.junit.Assert;
import org.junit.Test;

@SuppressWarnings("static-access")
public class CodingSupervisorWorkListQueriesTest {

	CodingSupervisorWorkListQueries codingSupervisorWorkListQueries;
	Field f;
	String s1, s2;

	@Test
	public void test1() throws Exception {
		Class<CodingSupervisorWorkListQueries> c = CodingSupervisorWorkListQueries.class;
		f = c.getField("QUERY_GET_CODINGSUP_UNASSIGNED_INVENTORY");
		s1 = codingSupervisorWorkListQueries.QUERY_GET_CODINGSUP_UNASSIGNED_INVENTORY;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test2() throws Exception {
		Class<CodingSupervisorWorkListQueries> c = CodingSupervisorWorkListQueries.class;
		f = c.getField("QUERY_UPDATE_CODINGSUP_RELEASETOASSIGN");
		s1 = codingSupervisorWorkListQueries.QUERY_UPDATE_CODINGSUP_RELEASETOASSIGN;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test3() throws Exception {
		Class<CodingSupervisorWorkListQueries> c = CodingSupervisorWorkListQueries.class;
		f = c.getField("QUERY_UPDATE_CODINGSUP_RELEASETOAVAILABLEITEMS");
		s1 = codingSupervisorWorkListQueries.QUERY_UPDATE_CODINGSUP_RELEASETOAVAILABLEITEMS;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test4() throws Exception {
		Class<CodingSupervisorWorkListQueries> c = CodingSupervisorWorkListQueries.class;
		f = c.getField("QUERY_GET_CODINGSUP_MYWORKLIST");
		s1 = codingSupervisorWorkListQueries.QUERY_GET_CODINGSUP_MYWORKLIST;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test5() throws Exception {
		Class<CodingSupervisorWorkListQueries> c = CodingSupervisorWorkListQueries.class;
		f = c.getField("QUERY_INSERT_CODER_PRODUCTIVITY");
		s1 = codingSupervisorWorkListQueries.QUERY_INSERT_CODER_PRODUCTIVITY;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test6() throws Exception {
		Class<CodingSupervisorWorkListQueries> c = CodingSupervisorWorkListQueries.class;
		f = c.getField("QUERY_INSERT_CODER_PRODUCTIVITY_FORSUP");
		s1 = codingSupervisorWorkListQueries.QUERY_INSERT_CODER_PRODUCTIVITY_FORSUP;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

}
