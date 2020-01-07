package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

import com.rsa.certj.x.c;

@RunWith(PowerMockRunner.class)
public class ChartDetailsInfoTest {
	@InjectMocks
	ChartDetailsInfo chartdetailsinfo;

	@Test
	public void test() {
		chartdetailsinfo.setBusFuncKey(2L);
		assertNotNull(chartdetailsinfo.getBusFuncKey());
		chartdetailsinfo.setBusFuncVenKey(2L);
		assertNotNull(chartdetailsinfo.getBusFuncVenKey());
		chartdetailsinfo.setBusSegment("test");
		assertNotNull(chartdetailsinfo.getBusSegment());
		chartdetailsinfo.setChartId("test");
		assertNotNull(chartdetailsinfo.getChartId());
		chartdetailsinfo.setChartReviewYear("test");
		assertNotNull(chartdetailsinfo.getChartReviewYear());
		chartdetailsinfo.setChartStatus("active");
		assertNotNull(chartdetailsinfo.getChartStatus());
		chartdetailsinfo.setClientCode("test");
		assertNotNull(chartdetailsinfo.getClientCode());
		chartdetailsinfo.setCodingInstructions("test");
		assertNotNull(chartdetailsinfo.getCodingInstructions());
		chartdetailsinfo.setContentEoKey("test");
		assertNotNull(chartdetailsinfo.getContentEoKey());
		chartdetailsinfo.setCurrentSessionId("test");
		assertNotNull(chartdetailsinfo.getCurrentSessionId());
		chartdetailsinfo.setHpCode("test");
		assertNotNull(chartdetailsinfo.getHpCode());
		chartdetailsinfo.setHpMemberId("test");
		assertNotNull(chartdetailsinfo.getHpMemberId());
		chartdetailsinfo.setHpProduct("test");
		assertNotNull(chartdetailsinfo.getHpProduct());
		chartdetailsinfo.setMemberDOB("test");
		assertNotNull(chartdetailsinfo.getMemberDOB());
		chartdetailsinfo.setMemberGender("test");
		assertNotNull(chartdetailsinfo.getMemberGender());
		chartdetailsinfo.setMemberName("test");
		assertNotNull(chartdetailsinfo.getMemberName());
		chartdetailsinfo.setProgramInstructions("test");
		assertNotNull(chartdetailsinfo.getProgramInstructions());
		chartdetailsinfo.setProjContentKey(2L);
		assertNotNull(chartdetailsinfo.getProjContentKey());
		chartdetailsinfo.setProjKey(2L);
		assertNotNull(chartdetailsinfo.getProjKey());
		chartdetailsinfo.setProjOrgGroup(2L);
		assertNotNull(chartdetailsinfo.getProjOrgGroup());
		chartdetailsinfo.setProvGroupId("test");
		assertNotNull(chartdetailsinfo.getProvGroupId());
		chartdetailsinfo.setProvGroupName("test");
		assertNotNull(chartdetailsinfo.getProvGroupName());
		chartdetailsinfo.setProviderId("test");
		assertNotNull(chartdetailsinfo.getProviderId());
		chartdetailsinfo.setProvName("test");
		assertNotNull(chartdetailsinfo.getProvName());
		chartdetailsinfo.setWorkId("test");
		assertNotNull(chartdetailsinfo.getWorkId());
		chartdetailsinfo.setMbrextID("Test");
		assertNotNull(chartdetailsinfo.getMbrextID());

	}

}
