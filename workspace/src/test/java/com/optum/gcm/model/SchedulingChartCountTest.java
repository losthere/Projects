package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class SchedulingChartCountTest {
	@InjectMocks
	SchedulingChartCount  schedulingChartCount;
	@Test
	public void testgetReceivedCnt() {
		schedulingChartCount.getReceivedCnt();
	}
	@Test
	public void testsetReceivedCnt() {
		schedulingChartCount.setReceivedCnt(123);
	}
	@Test
	public void testgetInprogressCnt() {
		schedulingChartCount.getInprogressCnt();
	}
	@Test
	public void testsetInprogressCnt() {
		schedulingChartCount.setInprogressCnt(123);
	}
	@Test
	public void testgetPastdueCnt() {
		schedulingChartCount.getPastdueCnt();
	}
	@Test
	public void testsetPastdueCnt() {
		schedulingChartCount.setPastdueCnt(123);
	}
	
}
