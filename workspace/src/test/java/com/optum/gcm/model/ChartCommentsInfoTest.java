package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.util.Date;

import org.junit.Test; 
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class ChartCommentsInfoTest {
	@InjectMocks
	ChartCommentsInfo chartcommentinfo;
	private Date contentCommentDt;

	@Test
	public void testgetBusFuncVenKey() {
		chartcommentinfo.getBusFuncVenKey();

	}

	@Test
	public void testsetBusFuncVenKey() {
		chartcommentinfo.setBusFuncVenKey(2L);

	}

	@Test
	public void testgetBusFuncKey() {
		chartcommentinfo.getBusFuncKey();

	}

	@Test
	public void testsetBusFuncKey() {
		chartcommentinfo.setBusFuncKey(2L);

	}

	@Test
	public void testgetProjKey() {
		chartcommentinfo.getProjKey();

	}

	@Test
	public void testsetProjKey() {
		chartcommentinfo.setProjKey(2L);

	}

	@Test
	public void testgetContentComment() {
		chartcommentinfo.getContentComment();

	}

	@Test
	public void testsetContentComment() {
		chartcommentinfo.setContentComment("test");
	}

	@Test
	public void testgetUserName() {
		chartcommentinfo.getUserName();

	}

	@Test
	public void testsetUserName() {
		chartcommentinfo.setUserName("test");

	}

	@Test
	public void testgetChartId() {
		chartcommentinfo.getChartId();

	}

	@Test
	public void testsetChartId() {
		chartcommentinfo.setChartId("test");

	}

	@Test
	public void testgetContentCommentDt() {
		chartcommentinfo.getContentCommentDt();

	}

	@Test
	public void testsetContentCommentDt() {
		chartcommentinfo.setContentCommentDt(contentCommentDt);

	}

	@Test
	public void testgetProjContentKey() {
		chartcommentinfo.getProjContentKey();

	}

	@Test
	public void testsetProjContentKey() {
		chartcommentinfo.setProjContentKey(2L);

	}
	

}
