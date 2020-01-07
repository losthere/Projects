package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class ChartStatusUpdateTest {
	@InjectMocks
	ChartStatusUpdate chartStatusUpdate;
	private List<String> chartIdList; 
	private List<String> chartIdExclList;

	@Test
	public void testgetRetStatus() {
		chartStatusUpdate.getRetStatus();
	}

	@Test
	public void testsetRetStatus() {
		chartStatusUpdate.setRetStatus("test");
	}

	@Test
	public void testgetChartIdList() {
		chartStatusUpdate.getChartIdList();
	}

	@Test
	public void testsetChartIdList() {
		chartStatusUpdate.setChartIdList(chartIdList);
	}

	@Test
	public void testgetChartIdExclList() {
		chartStatusUpdate.getChartIdExclList();
	}

	@Test
	public void testsetChartIdExclList() {
		chartStatusUpdate.setChartIdExclList(chartIdExclList);
	}

	@Test
	public void testgetRetMethod() {
		chartStatusUpdate.getRetMethod();
	}

	@Test
	public void testsetRetMethod() {
		chartStatusUpdate.setRetMethod("test");
	}

	@Test
	public void testgetRequestedUserId() {
		chartStatusUpdate.getRequestedUserId();
	}

	@Test
	public void testsetRequestedUserId() {
		chartStatusUpdate.setRequestedUserId("test");
	}

	@Test
	public void testgetIncludeFlag() {
		chartStatusUpdate.getIncludeFlag();
	}

	@Test
	public void testsetIncludeFlag() {
		chartStatusUpdate.setIncludeFlag("test");
	}

	@Test
	public void testgetBusFuncDtlKey() {
		chartStatusUpdate.getBusFuncDtlKey();
	}

	@Test
	public void testsetBusFuncDtlKey() {
		chartStatusUpdate.setBusFuncDtlKey(5L);
	}

	@Test
	public void testgetPendReasonCode() {
		chartStatusUpdate.getPendReasonCode();
	}

	@Test
	public void testsetPendReasonCode() {
		chartStatusUpdate.setPendReasonCode("test");
	}

	@Test
	public void testgetPendReasonComment() {
		chartStatusUpdate.getPendReasonComment();
	}

	@Test
	public void testsetPendReasonComment() {
		chartStatusUpdate.setPendReasonComment("test");
	}

}
