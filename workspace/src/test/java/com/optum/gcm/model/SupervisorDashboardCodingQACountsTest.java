package com.optum.gcm.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class SupervisorDashboardCodingQACountsTest {

	@InjectMocks
	private SupervisorDashboardCodingQACounts supervisorDashboardCodingQACounts;
	
	@Test
	public void testSetAsOfDate() throws Exception {
		supervisorDashboardCodingQACounts.setAsOfDate("4-4-2014");
	}
	
	@Test
	public void testGetAsOfDate() throws Exception {
		supervisorDashboardCodingQACounts.getAsOfDate();		
	}
	
	@Test
	public void testGetUnassingedCnt() throws Exception {
		supervisorDashboardCodingQACounts.getUnassingedCnt();
	}

	@Test
	public void testSetUnassingedCnt() throws Exception {
		supervisorDashboardCodingQACounts.setUnassingedCnt(4l);
	}	
	
	@Test
	public void testGetAssignedCnt() throws Exception {
		supervisorDashboardCodingQACounts.getAssignedCnt();
	}

	@Test
	public void testSetAssignedCnt() throws Exception {
		supervisorDashboardCodingQACounts.setAssignedCnt(8L);
	}
	
	@Test
	public void testGetQaCompletedCnt() throws Exception {
		supervisorDashboardCodingQACounts.getQaCompletedCnt();
	}

	@Test
	public void testSetQaCompletedCnt() throws Exception {
		supervisorDashboardCodingQACounts.setQaCompletedCnt(9L);
	}

	@Test
	public void testGetQaNotEligCnt() throws Exception {
		supervisorDashboardCodingQACounts.getQaNotEligCnt();
	}

	@Test
	public void testSetQaNotEligCnt() throws Exception {
		supervisorDashboardCodingQACounts.setQaNotEligCnt(3L);
	}

	@Test
	public void testGetTotalCnt() throws Exception {
		supervisorDashboardCodingQACounts.getTotalCnt();
	}

	@Test
	public void testSetTotalCnt() throws Exception {
		supervisorDashboardCodingQACounts.setTotalCnt(8L);
	}
	
	@Test
	public void testGetUnassignedPct() throws Exception {
		supervisorDashboardCodingQACounts.getUnassignedPct();
	}

	@Test
	public void testSetUnassignedPct() throws Exception {
		supervisorDashboardCodingQACounts.setUnassignedPct("test");
	}

	@Test
	public void testGetAssignedPct() throws Exception {
		supervisorDashboardCodingQACounts.getAssignedPct();
	}

	@Test
	public void testSetAssignedPct() throws Exception {
		supervisorDashboardCodingQACounts.setAssignedPct("test");
	}
	
	@Test
	public void testGetCodingCompletedPct() throws Exception {
		supervisorDashboardCodingQACounts.getCodingCompletedPct();
	}

	@Test
	public void testSetCodingCompletedPct() throws Exception {
		supervisorDashboardCodingQACounts.setCodingCompletedPct("test");
	}
	
	@Test
	public void testGetQaNotEligPct() throws Exception {
		supervisorDashboardCodingQACounts.getQaNotEligPct();
	}

	@Test
	public void testSetQaNotEligPct() throws Exception {
		supervisorDashboardCodingQACounts.setQaNotEligPct("test");
	}
}
