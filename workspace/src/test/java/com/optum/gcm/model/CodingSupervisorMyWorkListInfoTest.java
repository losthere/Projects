package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.sql.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class CodingSupervisorMyWorkListInfoTest {
	@InjectMocks
	CodingSupervisorMyWorkListInfo codingsupervisormyworklist;
	private Date assignedDate;
	private Date escalatedDate;

	@Test
	public void testcodingsupervisormyworklist() {
		codingsupervisormyworklist.getAssignedDate();
		codingsupervisormyworklist.setAssignedDate(assignedDate);
		codingsupervisormyworklist.getBusFuncVenKey();
		codingsupervisormyworklist.setBusFuncVenKey(2L);
		codingsupervisormyworklist.getChartId();
		codingsupervisormyworklist.getClientCode();
		codingsupervisormyworklist.getEscalatedBy();
		codingsupervisormyworklist.getEscalatedDate();
		codingsupervisormyworklist.getEscalationReasonCode();
		codingsupervisormyworklist.getEscalationReasonDesc();
		codingsupervisormyworklist.getHpCode();
		codingsupervisormyworklist.getHpProduct();
		codingsupervisormyworklist.getProgramName();
		codingsupervisormyworklist.getProjContentKey();
		codingsupervisormyworklist.getProvGroupName();
		codingsupervisormyworklist.getStatus();
		codingsupervisormyworklist.setChartId("test");
		codingsupervisormyworklist.setClientCode("test");
		codingsupervisormyworklist.setEscalatedBy("test");
		codingsupervisormyworklist.setEscalatedDate(escalatedDate);
		codingsupervisormyworklist.setEscalationReasonCode("test");
		codingsupervisormyworklist.setEscalationReasonDesc("test");
		codingsupervisormyworklist.setHpCode("test");
		codingsupervisormyworklist.setHpProduct("test");
		codingsupervisormyworklist.setProgramName("test");
		codingsupervisormyworklist.setProjContentKey(5L);
		codingsupervisormyworklist.setProvGroupName("test");
		codingsupervisormyworklist.setStatus("test");

	}

}
