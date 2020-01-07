package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class ChartMemberTest {
	@InjectMocks
	ChartMember chartmember;
	private Date memberDOB;

	@Test
	public void testchartmember() {
		chartmember.getBusFuncStatus();
		chartmember.setBusFuncStatus("test");
		chartmember.getChartId();
		chartmember.setChartId("test");
		chartmember.getIsIncludeFlag();
		chartmember.setIsIncludeFlag("test");
		chartmember.getMemberDOB();
		chartmember.setMemberDOB(memberDOB);
		chartmember.getMemberGender();
		chartmember.setMemberGender("test");
		chartmember.getMemberName();
		chartmember.setMemberName("test");
		chartmember.getPendReason();
		chartmember.setPendReason("test");
		chartmember.getProvFax();
		chartmember.setProvFax("test");
		chartmember.getProvGroupName();
		chartmember.setProvGroupName("test");
		chartmember.getProvLocation();
		chartmember.setProvLocation("test");
		chartmember.getProvName();
		chartmember.setProvName("test");
		chartmember.getProvPhone();
		chartmember.setProvPhone("test");

	}

}
