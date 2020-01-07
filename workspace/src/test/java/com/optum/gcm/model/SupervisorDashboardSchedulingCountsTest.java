package com.optum.gcm.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class SupervisorDashboardSchedulingCountsTest {

	@InjectMocks
	private SupervisorDashboardSchedulingCounts supervisorDashboardSchedulingCounts;
	
	@Test
	public void testSetAsOfDate() throws Exception {
		supervisorDashboardSchedulingCounts.setAsOfDate("4-4-2014");
	}
	
	@Test
	public void testGetAsOfDate() throws Exception {
		supervisorDashboardSchedulingCounts.getAsOfDate();		
	}	
	
	@Test
	public void testSetTabCode() throws Exception {
		supervisorDashboardSchedulingCounts.setTabCode("123L");
	}
	
	@Test
	public void testGetTabCode() throws Exception {
		supervisorDashboardSchedulingCounts.getTabCode();		
	}
	
	
	@Test
	public void testGetUnassingedCnt() throws Exception {
		supervisorDashboardSchedulingCounts.getUnassingedCnt();
	}

	@Test
	public void testSetUnassingedCnt() throws Exception {
		supervisorDashboardSchedulingCounts.setUnassingedCnt(4l);
	}	
	
	@Test
	public void testGetPastDueCnt() throws Exception {
		supervisorDashboardSchedulingCounts.getPastDueCnt();
	}

	@Test
	public void testSetPastDueCnt() throws Exception {
		supervisorDashboardSchedulingCounts.setPastDueCnt(8L);
	}
			
	@Test
	public void testGetAssignedCnt() throws Exception {
		supervisorDashboardSchedulingCounts.getAssignedCnt();
	}

	@Test
	public void testSetAssignedCnt() throws Exception {
		supervisorDashboardSchedulingCounts.setAssignedCnt(9L);
	}
	
	@Test
	public void testGetScheduledCnt() throws Exception {
		supervisorDashboardSchedulingCounts.getScheduledCnt();
	}

	@Test
	public void testSetScheduledCnt() throws Exception {
		supervisorDashboardSchedulingCounts.setScheduledCnt(3L);
	}
	
	@Test
	public void testGetCompletedCnt() throws Exception {
		supervisorDashboardSchedulingCounts.getCompletedCnt();
	}

	@Test
	public void testSetCompletedCnt() throws Exception {
		supervisorDashboardSchedulingCounts.setCompletedCnt(9L);
	}

	@Test
	public void testGetCanceledCnt() throws Exception {
		supervisorDashboardSchedulingCounts.getCanceledCnt();
	}

	@Test
	public void testSetCanceledCnt() throws Exception {
		supervisorDashboardSchedulingCounts.setCanceledCnt(3L);
	}
	
	@Test
	public void testGetPendCnt() throws Exception {
		supervisorDashboardSchedulingCounts.getPendCnt();
	}

	@Test
	public void testSetPendCnt() throws Exception {
		supervisorDashboardSchedulingCounts.setPendCnt(3L);
	}
	
	@Test
	public void testGetTotalCnt() throws Exception {
		supervisorDashboardSchedulingCounts.getTotalCnt();
	}

	@Test
	public void testSetTotalCnt() throws Exception {
		supervisorDashboardSchedulingCounts.setTotalCnt(8L);
	}

	@Test
	public void testGetUnassignedPct() throws Exception {
		supervisorDashboardSchedulingCounts.getUnassignedPct();
	}

	@Test
	public void testSetUnassignedPct() throws Exception {
		supervisorDashboardSchedulingCounts.setUnassignedPct("test");
	}

	@Test
	public void testGetPastDuePct() throws Exception {
		supervisorDashboardSchedulingCounts.getPastDuePct();
	}

	@Test
	public void testSetPastDuePct() throws Exception {
		supervisorDashboardSchedulingCounts.setPastDuePct("test");
	}
	
	@Test
	public void testGetAssignedPct() throws Exception {
		supervisorDashboardSchedulingCounts.getAssignedPct();
	}

	@Test
	public void testSetAssignedPct() throws Exception {
		supervisorDashboardSchedulingCounts.setAssignedPct("test");
	}	

	@Test
	public void testGetScheduledPct() throws Exception {
		supervisorDashboardSchedulingCounts.getScheduledPct();
	}

	@Test
	public void testSetScheduledPct() throws Exception {
		supervisorDashboardSchedulingCounts.setScheduledPct("test");
	}
	
	@Test
	public void testGetCanceledPct() throws Exception {
		supervisorDashboardSchedulingCounts.getCanceledPct();
	}

	@Test
	public void testSetCanceledPct() throws Exception {
		supervisorDashboardSchedulingCounts.setCanceledPct("test");
	}
	
	@Test
	public void testGetPendPct() throws Exception {
		supervisorDashboardSchedulingCounts.getPendPct();
	}

	@Test
	public void testSetPendPct() throws Exception {
		supervisorDashboardSchedulingCounts.setPendPct("test");
	}
		
	@Test
	public void testGetCompletedPct() throws Exception {
		supervisorDashboardSchedulingCounts.getCompletedPct();
	}

	@Test
	public void testSetCompletedPct() throws Exception {
		supervisorDashboardSchedulingCounts.setCompletedPct("8L");
	}	
	
	@Test
	public void testSDSC() {
		supervisorDashboardSchedulingCounts.setUnscheduledCnt(5L);
		supervisorDashboardSchedulingCounts.getUnscheduledCnt();
		supervisorDashboardSchedulingCounts.setUnscheduledPct("Test");
		supervisorDashboardSchedulingCounts.getUnscheduledPct();
		supervisorDashboardSchedulingCounts.setCnaCnt(5L);
		supervisorDashboardSchedulingCounts.getCnaCnt();
		supervisorDashboardSchedulingCounts.setCnatPCt("Test");
		supervisorDashboardSchedulingCounts.getCnatPCt();
	}
}

