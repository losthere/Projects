package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.experimental.categories.Categories.IncludeCategory;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class ChartStatusCountTest {
	@InjectMocks
	ChartStatusCount chartstatuscount;

	@Test
	public void testchartstatuscount() {
		chartstatuscount.getNonRetrievableCnt();
		chartstatuscount.setNonRetrievableCnt(123);
		chartstatuscount.getReceivedCnt();
		chartstatuscount.setReceivedCnt(123);
		chartstatuscount.getScheduledCnt();
		chartstatuscount.setScheduledCnt(123);
		chartstatuscount.getUnscheduledCnt();
		chartstatuscount.setUnscheduledCnt(132);
	}

}
