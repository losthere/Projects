package com.optum.gcm.dao.constants;

import static org.junit.Assert.assertEquals;

import java.lang.reflect.Field;

import org.junit.Test;

@SuppressWarnings("static-access")
public class CacheableQueriesTest{

	CacheableQueries cacheableQueries;
	Field field;
	String s1, s2;
	@Test
	public void test_QUERY_GET_ALL_ICDCODES_FOR_MCARE() throws Exception {
		Class<CacheableQueries> c = CacheableQueries.class;
		field = c.getField("QUERY_GET_ALL_ICDCODES_FOR_MCARE");
		s1 = cacheableQueries.QUERY_GET_ALL_ICDCODES_FOR_MCARE;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test_QUERY_GET_ALL_MCARE_HCCMAPPINGS() throws Exception {
		Class<CacheableQueries> c = CacheableQueries.class;
		field = c.getField("QUERY_GET_ALL_MCARE_HCCMAPPINGS");
		s1 = cacheableQueries.QUERY_GET_ALL_MCARE_HCCMAPPINGS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test_QUERY_GET_ALL_ACA_HHSMAPPINGS() throws Exception {
		Class<CacheableQueries> c = CacheableQueries.class;
		field = c.getField("QUERY_GET_ALL_ACA_HHSMAPPINGS");
		s1 = cacheableQueries.QUERY_GET_ALL_ACA_HHSMAPPINGS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

	@Test
	public void test_QUERY_GET_AGE_GENDER_VALIDATIONS() throws Exception {
		Class<CacheableQueries> c = CacheableQueries.class;
		field = c.getField("QUERY_GET_AGE_GENDER_VALIDATIONS");
		s1 = cacheableQueries.QUERY_GET_AGE_GENDER_VALIDATIONS;
		s2 = (String) field.get(c);
		assertEquals(s2, s1);
	}

}
