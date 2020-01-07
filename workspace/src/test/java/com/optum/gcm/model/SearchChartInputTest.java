package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class SearchChartInputTest {
	@InjectMocks
	SearchChartInput searchChartInput;

	@Test
	public void testProjContentKey() {
		searchChartInput.getProjContentKey();

	}
	@Test
	public void testsetProjContentKey() {
		searchChartInput.setProjContentKey(5L);

	}
	@Test
	public void testBusFuncVenKey() {
		searchChartInput.getBusFuncVenKey();

	}
	@Test
	public void testsetBusFuncVenKey() {
		searchChartInput.setBusFuncVenKey(5L);

	}
	@Test
	public void testBusFuncKey() {
		searchChartInput.getBusFuncKey();

	}
	@Test
	public void testsetBusFuncKey() {
		searchChartInput.setBusFuncKey(5L);

	}
	@Test
	public void testFromBusFuncStatus() {
		searchChartInput.getFromBusFuncStatus();

	}
	@Test
	public void testsetFromBusFuncStatus() {
		searchChartInput.setFromBusFuncStatus("test");

	}
	@Test
	public void testToBusFuncStatus() {
		searchChartInput.getToBusFuncStatus();

	}
	@Test
	public void testsetToBusFuncStatus() {
		searchChartInput.setToBusFuncStatus("test");

	}
	@Test
	public void testReasonCode() {
		searchChartInput.getReasonCode();

	}
	@Test
	public void testsetReasonCode() {
		searchChartInput.setReasonCode("test");

	}
	@Test
	public void testProjKey() {
		searchChartInput.getProjKey();

	}
	@Test
	public void testsetProjKey() {
		searchChartInput.setProjKey(5L);

	}
	@Test
	public void testRequestedUserId() {
		searchChartInput.getRequestedUserId();

	}
	@Test
	public void testsetRequestedUserId() {
		searchChartInput.setRequestedUserId("test");

	}
	@Test
	public void testGroupKey() {
		searchChartInput.getGroupKey();

	}
	@Test
	public void testsetGroupKey() {
		searchChartInput.setGroupKey(5L);

	}
	@Test
	public void testRetWiKey() {
		searchChartInput.getRetWiKey();

	}
	@Test
	public void testsetRetWiKey() {
		searchChartInput.setRetWiKey(5L);

	}
	@Test
	public void testReasonComment() {
		searchChartInput.getReasonComment();

	}
	@Test
	public void testsetReasonComment() {
		searchChartInput.setReasonComment("test");

	}
	@Test
	public void testtoString() {
		searchChartInput.toString();

	}
	@Test
	public void testsettoString() {
		searchChartInput.toString();

	}
	
}
