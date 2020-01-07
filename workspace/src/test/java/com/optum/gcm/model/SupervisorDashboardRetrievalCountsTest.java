package com.optum.gcm.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class SupervisorDashboardRetrievalCountsTest {

	@InjectMocks
	private SupervisorDashboardRetrievalCounts supervisorDashboardRetrievalCounts;

	@Test
	public void testSetAsOfDate() throws Exception {
		supervisorDashboardRetrievalCounts.setAsOfDate("4-4-2014");
	}

	@Test
	public void testGetAsOfDate() throws Exception {
		supervisorDashboardRetrievalCounts.getAsOfDate();
	}

	@Test
	public void testSetNotRetrievedCnt() throws Exception {
		supervisorDashboardRetrievalCounts.setNotRetrievedCnt(123L);
	}

	@Test
	public void testGetNotRetrievedCnt() throws Exception {
		supervisorDashboardRetrievalCounts.getNotRetrievedCnt();
	}

	@Test
	public void testGetClientUploadCnt() throws Exception {
		supervisorDashboardRetrievalCounts.getClientUploadCnt();
	}

	@Test
	public void testSetClientUploadCnt() throws Exception {
		supervisorDashboardRetrievalCounts.setClientUploadCnt(4l);
	}

	@Test
	public void testGetEmrCnt() throws Exception {
		supervisorDashboardRetrievalCounts.getEmrCnt();
	}

	@Test
	public void testSetEmrCnt() throws Exception {
		supervisorDashboardRetrievalCounts.setEmrCnt(8L);
	}

	@Test
	public void testGetFaxCnt() throws Exception {
		supervisorDashboardRetrievalCounts.getFaxCnt();
	}

	@Test
	public void testSetFaxCnt() throws Exception {
		supervisorDashboardRetrievalCounts.setFaxCnt(9L);
	}

	@Test
	public void testGetMailCnt() throws Exception {
		supervisorDashboardRetrievalCounts.getMailCnt();
	}

	@Test
	public void testSetMailCdFdCnt() throws Exception {
		supervisorDashboardRetrievalCounts.setMailCdFdCnt(3L);
	}

	@Test
	public void testGetMailCdFdCnt() throws Exception {
		supervisorDashboardRetrievalCounts.getMailCdFdCnt();
	}

	@Test
	public void testSetMailCnt() throws Exception {
		supervisorDashboardRetrievalCounts.setMailCnt(3L);
	}

	@Test
	public void testGetOnsiteCnt() throws Exception {
		supervisorDashboardRetrievalCounts.getOnsiteCnt();
	}

	@Test
	public void testSetOnsiteCnt() throws Exception {
		supervisorDashboardRetrievalCounts.setOnsiteCnt(9L);
	}

	@Test
	public void testGetOptumRetvdCnt() throws Exception {
		supervisorDashboardRetrievalCounts.getOptumRetvdCnt();
	}

	@Test
	public void testSetOptumRetvdCnt() throws Exception {
		supervisorDashboardRetrievalCounts.setOptumRetvdCnt(3L);
	}

	@Test
	public void testGetProviderUploadCnt() throws Exception {
		supervisorDashboardRetrievalCounts.getProviderUploadCnt();
	}

	@Test
	public void testSetProviderUploadCnt() throws Exception {
		supervisorDashboardRetrievalCounts.setProviderUploadCnt(3L);
	}

	@Test
	public void testGetTotalCnt() throws Exception {
		supervisorDashboardRetrievalCounts.getTotalCnt();
	}

	@Test
	public void testSetTotalCnt() throws Exception {
		supervisorDashboardRetrievalCounts.setTotalCnt(8L);
	}

	@Test
	public void testGetNotRetvdPct() throws Exception {
		supervisorDashboardRetrievalCounts.getNotRetvdPct();
	}

	@Test
	public void testSetNotRetvdPct() throws Exception {
		supervisorDashboardRetrievalCounts.setNotRetvdPct("test");
	}

	@Test
	public void testGetClientUploadPct() throws Exception {
		supervisorDashboardRetrievalCounts.getClientUploadPct();
	}

	@Test
	public void testSetClientUploadPct() throws Exception {
		supervisorDashboardRetrievalCounts.setClientUploadPct("test");
	}

	@Test
	public void testGetEmrPct() throws Exception {
		supervisorDashboardRetrievalCounts.getEmrPct();
	}

	@Test
	public void testSetEmrPct() throws Exception {
		supervisorDashboardRetrievalCounts.setEmrPct("test");
	}

	@Test
	public void testGetFaxPct() throws Exception {
		supervisorDashboardRetrievalCounts.getFaxPct();
	}

	@Test
	public void testSetFaxPct() throws Exception {
		supervisorDashboardRetrievalCounts.setFaxPct("test");
	}

	@Test
	public void testGetMailPct() throws Exception {
		supervisorDashboardRetrievalCounts.getMailPct();
	}

	@Test
	public void testSetMailPct() throws Exception {
		supervisorDashboardRetrievalCounts.setMailPct("test");
	}

	@Test
	public void testGetMailCdFdPct() throws Exception {
		supervisorDashboardRetrievalCounts.getMailCdFdPct();
	}

	@Test
	public void testSetMailCdFdPct() throws Exception {
		supervisorDashboardRetrievalCounts.setMailCdFdPct("test");
	}

	@Test
	public void testGetOnsitePct() throws Exception {
		supervisorDashboardRetrievalCounts.getOnsitePct();
	}

	@Test
	public void testSetOnsitePct() throws Exception {
		supervisorDashboardRetrievalCounts.setOnsitePct("test");
	}

	@Test
	public void testGetOptumRetvdPct() throws Exception {
		supervisorDashboardRetrievalCounts.getOptumRetvdPct();
	}

	@Test
	public void testSetOptumRetvdPct() throws Exception {
		supervisorDashboardRetrievalCounts.setOptumRetvdPct("8L");
	}

	@Test
	public void testGetProviderUploadPct() throws Exception {
		supervisorDashboardRetrievalCounts.getProviderUploadPct();
	}

	@Test
	public void testSetProviderUploadPct() throws Exception {
		supervisorDashboardRetrievalCounts.setProviderUploadPct("8L");
	}

}
