package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.sql.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class CodingWorkListInfoTest {
	@InjectMocks
	CodingWorkListInfo codingworklistinfo;
	@Mock
	private Date acceptedDate;
	@Mock
	private Date assignedDate; 

	@Test
	public void testcodingworklistinfo() {
		Date d = new Date(12L);
		codingworklistinfo.setAcceptedDate(d);
		codingworklistinfo.getAcceptedDate();
		codingworklistinfo.setAssignedDate(d);
		codingworklistinfo.getAssignedDate();
		codingworklistinfo.setBusFuncKey(5L);
		codingworklistinfo.getBusFuncKey();
		codingworklistinfo.setBusFuncVenKey(5L);
		codingworklistinfo.getBusFuncVenKey();
		codingworklistinfo.setChartId("Test");
		codingworklistinfo.getChartId();
		codingworklistinfo.setChartScoreGroup("Test");
		codingworklistinfo.getChartScoreGroup();
		codingworklistinfo.setChartStatus("Test");
		codingworklistinfo.getChartStatus();
		codingworklistinfo.setClientCode("Test");
		codingworklistinfo.getClientCode();
		codingworklistinfo.getEscalatedFlag();
		codingworklistinfo.setEscalatedFlag("Test");
		codingworklistinfo.setHpCode("Test");
		codingworklistinfo.getHpCode();
		codingworklistinfo.setHpProduct("Test");
		codingworklistinfo.getHpProduct();
		codingworklistinfo.setPageCount(5L);
		codingworklistinfo.setProgramName("Test");
		codingworklistinfo.getProgramName();
		codingworklistinfo.setProjContentKey(5L);
		codingworklistinfo.setProvGroupName("Test");
		codingworklistinfo.getProjContentKey();
		codingworklistinfo.getProvGroupName();
		codingworklistinfo.setQaActionCd("Test");
		codingworklistinfo.getQaActionCd(); 
		codingworklistinfo.getPageCount();
	
	}

}
