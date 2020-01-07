package com.optum.gcm.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class SupervisorDashboardPendMgmtCountsTest {

	@InjectMocks
	private SupervisorDashboardPendMgmtCounts supervisorDashboardPendMgmtCounts;
	
	
	@Test
	public void testSetAsOfDate() throws Exception {
		supervisorDashboardPendMgmtCounts.setAsOfDate("4-4-2014");
	}
	
	@Test
	public void testGetAsOfDate() throws Exception {
		supervisorDashboardPendMgmtCounts.getAsOfDate();		
	}
	
	@Test
	public void testSetTabCode() throws Exception {
		supervisorDashboardPendMgmtCounts.setTabCode("123");
	}
	
	@Test
	public void testGetTabCode() throws Exception {
		supervisorDashboardPendMgmtCounts.getTabCode();		
	}
	
	
	@Test
	public void testGetUnassingedCnt() throws Exception {
		supervisorDashboardPendMgmtCounts.getUnassingedCnt();
	}

	@Test
	public void testSetUnassingedCnt() throws Exception {
		supervisorDashboardPendMgmtCounts.setUnassingedCnt(4l);
	}	
	
	@Test
	public void testGetAssignedCnt() throws Exception {
		supervisorDashboardPendMgmtCounts.getAssignedCnt();
	}

	@Test
	public void testSetAssignedCnt() throws Exception {
		supervisorDashboardPendMgmtCounts.setAssignedCnt(8L);
	}
		
	@Test
	public void testGetReleasedCnt() throws Exception {
		supervisorDashboardPendMgmtCounts.getReleasedCnt();
	}

	@Test
	public void testSetReleasedCnt() throws Exception {
		supervisorDashboardPendMgmtCounts.setReleasedCnt(9L);
	}

	@Test
	public void testGetNonRetrievableCnt() throws Exception {
		supervisorDashboardPendMgmtCounts.getNonRetrievableCnt();
	}

	@Test
	public void testSetNonRetrievableCnt() throws Exception {
		supervisorDashboardPendMgmtCounts.setNonRetrievableCnt(3L);
	}
	
	@Test
	public void testGetTotalCnt() throws Exception {
		supervisorDashboardPendMgmtCounts.getTotalCnt();
	}

	@Test
	public void testSetTotalCnt() throws Exception {
		supervisorDashboardPendMgmtCounts.setTotalCnt(8L);
	}
	
	@Test
	public void testGetUnassignedPct() throws Exception {
		supervisorDashboardPendMgmtCounts.getUnassignedPct();
	}

	@Test
	public void testSetUnassignedPct() throws Exception {
		supervisorDashboardPendMgmtCounts.setUnassignedPct("test");
	}

	@Test
	public void testGetAssignedPct() throws Exception {
		supervisorDashboardPendMgmtCounts.getAssignedPct();
	}

	@Test
	public void testSetAssignedPct() throws Exception {
		supervisorDashboardPendMgmtCounts.setAssignedPct("test");
	}
	
	@Test
	public void testGetReleasedPct() throws Exception {
		supervisorDashboardPendMgmtCounts.getReleasedPct();
	}

	@Test
	public void testSetReleasedPct() throws Exception {
		supervisorDashboardPendMgmtCounts.setReleasedPct("test");
	}	

	@Test
	public void testGetNonRetrievablePct() throws Exception {
		supervisorDashboardPendMgmtCounts.getNonRetrievablePct();
	}

	@Test
	public void testSetNonRetrievablePct() throws Exception {
		supervisorDashboardPendMgmtCounts.setNonRetrievablePct("test");
	}
	
	@Test
	public void testGetGcmReasonDesc() throws Exception {
		supervisorDashboardPendMgmtCounts.getGcmReasonDesc();
	}

	@Test
	public void testSetGcmReasonDesc() throws Exception {
		supervisorDashboardPendMgmtCounts.setGcmReasonDesc("test");
	}
	
	@Test
	public void testGetReasonPct() throws Exception {
		supervisorDashboardPendMgmtCounts.getReasonPct();
	}

	@Test
	public void testSetReasonPct() throws Exception {
		supervisorDashboardPendMgmtCounts.setReasonPct("test");
	}
		
	@Test
	public void testGetReasonCnt() throws Exception {
		supervisorDashboardPendMgmtCounts.getReasonCnt();
	}

	@Test
	public void testSetReasonCnt() throws Exception {
		supervisorDashboardPendMgmtCounts.setReasonCnt(8L);
	}
		
	@Test
	public void testGetReasonCnt1To5() throws Exception {
		supervisorDashboardPendMgmtCounts.getReasonCnt1To5();
	}

	@Test
	public void testSetReasonCnt1To5() throws Exception {
		supervisorDashboardPendMgmtCounts.setReasonCnt1To5(8L);
	}
	
	@Test
	public void testGetReasonCnt6To10() throws Exception {
		supervisorDashboardPendMgmtCounts.getReasonCnt6To10();
	}

	@Test
	public void testSetReasonCnt6To10() throws Exception {
		supervisorDashboardPendMgmtCounts.setReasonCnt6To10(8L);
	}
		
	@Test
	public void testGetReasonCnt11Plus() throws Exception {
		supervisorDashboardPendMgmtCounts.getReasonCnt11Plus();
	}

	@Test
	public void testSetReasonCnt11Plus() throws Exception {
		supervisorDashboardPendMgmtCounts.setReasonCnt11Plus(8L);
	}
	@Test
	public void testsetcnaCount() {
		supervisorDashboardPendMgmtCounts.setCnaCnt(1033l);
	}
	@Test
	public void testgetcnaCount() {
		supervisorDashboardPendMgmtCounts.getCnaCnt();
	}
	@Test
	public void testgetcnaPct() {
		supervisorDashboardPendMgmtCounts.getCnaPct();
	}
	@Test
	public void testsetcnaPct() {
		supervisorDashboardPendMgmtCounts.setCnaPct("test");
	}
	
	
}
