package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class SearchResultTest {
	@InjectMocks
	SearchResult searchResult;
	@Mock
	private Boolean disableHyperLink1;
	private String disableHyperLink;
	private Date d;

	@Test
	public void testgetDisableHyperLink1() {
		searchResult.getDisableHyperLink1();

	}

	@Test
	public void testsetDisableHyperLink1() {
		searchResult.setDisableHyperLink1(disableHyperLink1);

	}

	@Test
	public void testgetDisableHyperLink() {
		searchResult.getDisableHyperLink();

	}

	@Test
	public void testsetDisableHyperLink() {
		searchResult.setDisableHyperLink(disableHyperLink);

	}

	@Test
	public void testgetProvGroupName() {
		searchResult.getProvGroupName();

	}

	@Test
	public void testsetProvGroupName() {
		searchResult.setProvGroupName("MRM");

	}

	@Test
	public void testgetProvName() {
		searchResult.getProvName();

	}

	@Test
	public void testsetProvName() {
		searchResult.setProvName("MRM");

	}

	@Test
	public void testgetMemberName() {
		searchResult.getMemberName();

	}

	@Test
	public void testsetMemberName() {
		searchResult.setMemberName("MRM");

	}

	@Test
	public void testgetMemberDOB() {
		searchResult.getMemberDOB();

	}

	@Test
	public void testsetMemberDOB() {
		searchResult.setMemberDOB(d);

	}

	@Test
	public void testMemberGender() {
		searchResult.getMemberGender();

	}

	@Test
	public void testsetMemberGender() {
		searchResult.setMemberGender("MRM");

	}

	@Test
	public void testgetChartId() {
		searchResult.getChartId();

	}

	@Test
	public void testsetChartId() {
		searchResult.setChartId("MRM");

	}

	@Test
	public void testgetAssignedUser() {
		searchResult.getAssignedUser();

	}

	@Test
	public void testsetAssignedUser() {
		searchResult.setAssignedUser("MRM");

	}

	@Test
	public void testgetBusFuncStatus() {
		searchResult.getBusFuncStatus();

	}

	@Test
	public void testsetBusFuncStatus() {
		searchResult.setBusFuncStatus("MRM");

	}

	@Test
	public void testgetProjKey() {
		searchResult.getProjKey();

	}

	@Test
	public void testsetProjKey() {
		searchResult.setProjKey(5L);

	}

	@Test
	public void testgetProjContentKey() {
		searchResult.getProjContentKey();

	}

	@Test
	public void testsetProjContentKey() {
		searchResult.setProjContentKey(5L);

	}

	@Test
	public void testgetBusFuncVenKey() {
		searchResult.getBusFuncVenKey();

	}

	@Test
	public void testsetBusFuncVenKey() {
		searchResult.setBusFuncVenKey(5L);

	}

	@Test
	public void testgetRetWiKey() {
		searchResult.getRetWiKey();

	}

	@Test
	public void testsetRetWiKey() {
		searchResult.setRetWiKey(5L);

	}

	@Test
	public void testgetBusFuncKey() {
		searchResult.getBusFuncKey();

	}

	@Test
	public void testsetBusFuncKey() {
		searchResult.setBusFuncKey(5L);

	}
	@Test
	public void testgetbusFunction() {
		searchResult.getBusFunction();

	}

	@Test
	public void testsetbusFunction() {
		searchResult.setBusFunction("test");
	
	}
	@Test
	public void testgetImageName() {
		searchResult.getImageName();

	}

	@Test
	public void testsetImageName() {
		searchResult.setImageName("test");
	
	}
}
