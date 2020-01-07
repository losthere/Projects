package com.optum.gcm.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class SupervisorDashboardCodingCountsTest {

	@InjectMocks
	private SupervisorDashboardCodingCounts supervisorDashboardCodingCounts;
	
	
	@Test
	public void testSetAsOfDate() throws Exception {
		supervisorDashboardCodingCounts.setAsOfDate("4-4-2014");
	}
	
	@Test
	public void testGetAsOfDate() throws Exception {
		supervisorDashboardCodingCounts.getAsOfDate();		
	}
	
	@Test
	public void testGetUnassingedCnt() throws Exception {
		supervisorDashboardCodingCounts.getUnassingedCnt();
	}

	@Test
	public void testSetUnassingedCnt() throws Exception {
		supervisorDashboardCodingCounts.setUnassingedCnt(4l);
	}	
	
	@Test
	public void testGetAssignedCnt() throws Exception {
		supervisorDashboardCodingCounts.getAssignedCnt();
	}

	@Test
	public void testSetAssignedCnt() throws Exception {
		supervisorDashboardCodingCounts.setAssignedCnt(8L);
	}
	
	@Test
	public void testGetEscalatedCnt() throws Exception {
		supervisorDashboardCodingCounts.getEscalatedCnt();
	}

	@Test
	public void testSetEscalatedCnt() throws Exception {
		supervisorDashboardCodingCounts.setEscalatedCnt(9L);
	}

	@Test
	public void testGetCodingCompletedCnt() throws Exception {
		supervisorDashboardCodingCounts.getCodingCompletedCnt();
	}

	@Test
	public void testSetCodingCompletedCnt() throws Exception {
		supervisorDashboardCodingCounts.setCodingCompletedCnt(3L);
	}
	
	@Test
	public void testGetRejectedCnt() throws Exception {
		supervisorDashboardCodingCounts.getRejectedCnt();
	}

	@Test
	public void testSetRejectedCnt() throws Exception {
		supervisorDashboardCodingCounts.setRejectedCnt(8L);
	}

	@Test
	public void testGetTotalCnt() throws Exception {
		supervisorDashboardCodingCounts.getTotalCnt();
	}

	@Test
	public void testSetTotalCnt() throws Exception {
		supervisorDashboardCodingCounts.setTotalCnt(8L);
	}
	
	@Test
	public void testGetUnassignedPct() throws Exception {
		supervisorDashboardCodingCounts.getUnassignedPct();
	}

	@Test
	public void testSetUnassignedPct() throws Exception {
		supervisorDashboardCodingCounts.setUnassignedPct("test");
	}

	@Test
	public void testGetAssignedPct() throws Exception {
		supervisorDashboardCodingCounts.getAssignedPct();
	}

	@Test
	public void testSetAssignedPct() throws Exception {
		supervisorDashboardCodingCounts.setAssignedPct("test");
	}
	
	@Test
	public void testGetEscalatedPct() throws Exception {
		supervisorDashboardCodingCounts.getEscalatedPct();
	}

	@Test
	public void testSetEscalatedPct() throws Exception {
		supervisorDashboardCodingCounts.setEscalatedPct("test");
	}	

	@Test
	public void testGetCodingCompletedPct() throws Exception {
		supervisorDashboardCodingCounts.getCodingCompletedPct();
	}

	@Test
	public void testSetCodingCompletedPct() throws Exception {
		supervisorDashboardCodingCounts.setCodingCompletedPct("test");
	}
	
	@Test
	public void testGetRejectedPct() throws Exception {
		supervisorDashboardCodingCounts.getRejectedPct();
	}

	@Test
	public void testSetRejectedPct() throws Exception {
		supervisorDashboardCodingCounts.setRejectedPct("test");
	}
	
	
}
