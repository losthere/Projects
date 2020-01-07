package com.optum.gcm.model;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class ChartInputInfoTest {
	@InjectMocks
	ChartInputInfo chartinputinfo;
	@Mock
	private ChartCommentsInfo chartComment;

	@Test
	public void testchartinputinfo() {
		chartinputinfo.setBusFuncKey(2L);
		assertNotNull(chartinputinfo.getBusFuncKey());
		chartinputinfo.setBusFuncVenKey(2L);
		assertNotNull(chartinputinfo.getBusFuncVenKey());
		chartinputinfo.setChartComment(chartComment);
		assertNotNull(chartinputinfo.getChartComment());
		chartinputinfo.setContentErrorCode("test");
		assertNotNull(chartinputinfo.getContentErrorCode());
		chartinputinfo.setCurrentSessionId("test");
		assertNotNull(chartinputinfo.getCurrentSessionId());
		chartinputinfo.setEventType("test");
		assertNotNull(chartinputinfo.getEventType());
		chartinputinfo.setFromBusFuncStatus("test");
		assertNotNull(chartinputinfo.getFromBusFuncStatus());
		chartinputinfo.setGroupKey(2L);
		assertNotNull(chartinputinfo.getGroupKey());
		chartinputinfo.setProjContentKey(2L);
		assertNotNull(chartinputinfo.getProjContentKey());
		chartinputinfo.setProjKey(2L);
		assertNotNull(chartinputinfo.getProjKey());
		chartinputinfo.setReasonCode("test");
		assertNotNull(chartinputinfo.getReasonCode());
		chartinputinfo.setRequestedUserId("test");
		assertNotNull(chartinputinfo.getRequestedUserId());
		chartinputinfo.setToBusFuncStatus("test");
		assertNotNull(chartinputinfo.getToBusFuncStatus());
		chartinputinfo.setUserKey(2L);
		assertNotNull(chartinputinfo.getUserKey());
		chartinputinfo.setWorklistActivityKey("test");
		assertNotNull(chartinputinfo.getWorklistActivityKey());
		chartinputinfo.toString();
		chartinputinfo.setBusFuncDetailKey(7l);
		assertNotNull(chartinputinfo.getBusFuncDetailKey());
		chartinputinfo.setBarcode("Test");
		assertNotNull(chartinputinfo.getBarcode());
		chartinputinfo.setVendorKey(7l);
		assertNotNull(chartinputinfo.getVendorKey());
		chartinputinfo.setDosYear(2017l);
		assertNotNull(chartinputinfo.getDosYear());
	}

}
