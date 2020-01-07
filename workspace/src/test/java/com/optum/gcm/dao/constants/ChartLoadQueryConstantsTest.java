package com.optum.gcm.dao.constants;

import java.lang.reflect.Field;

import org.junit.Assert;
import org.junit.Test;

@SuppressWarnings("static-access")
public class ChartLoadQueryConstantsTest {

	ChartLoadQueryConstants chartLoadQueryConstants;
	Field f;
	String s1, s2;

	@Test
	public void test1() throws Exception {
		Class<ChartLoadQueryConstants> c = ChartLoadQueryConstants.class;
		f = c.getField("PKG_CHART_LOAD$PRC_UPDATE_CHART_STATUS");
		s1 = chartLoadQueryConstants.PKG_CHART_LOAD$PRC_UPDATE_CHART_STATUS;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test2() throws Exception {
		Class<ChartLoadQueryConstants> c = ChartLoadQueryConstants.class;
		f = c.getField("PKG_CHART_LOAD$PRC_VALIDATE_CHARTS");
		s1 = chartLoadQueryConstants.PKG_CHART_LOAD$PRC_VALIDATE_CHARTS;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}


	@Test
	public void test5() throws Exception {
		Class<ChartLoadQueryConstants> c = ChartLoadQueryConstants.class;
		f = c.getField("QUERY_IMAGE_ATTRIBUTES_BY_BARCODE");
		s1 = chartLoadQueryConstants.QUERY_IMAGE_ATTRIBUTES_BY_BARCODE;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

	@Test
	public void test6() throws Exception {
		Class<ChartLoadQueryConstants> c = ChartLoadQueryConstants.class;
		f = c.getField("QUERY_DOCUMENTUM_DOCUMENT");
		s1 = chartLoadQueryConstants.QUERY_DOCUMENTUM_DOCUMENT;
		s2 = (String) f.get(c);
		Assert.assertEquals(s1, s2);
	}

}
