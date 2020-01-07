package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.experimental.categories.Categories.IncludeCategory;
import org.powermock.modules.junit4.PowerMockRunner;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;

@RunWith(PowerMockRunner.class)

public class CodingSupervisorWorkListInfoTest {
	@InjectMocks
	CodingSupervisorWorkListInfo codingsupervisorworklistinfo;

	@Test
	public void testCodingSupervisorWorkListInfo() {
		codingsupervisorworklistinfo.getBusFuncVenKey();
		codingsupervisorworklistinfo.getBusFunKey();
		codingsupervisorworklistinfo.getChartId();
		codingsupervisorworklistinfo.getClientCode();
		codingsupervisorworklistinfo.getEscalatedBy();
		codingsupervisorworklistinfo.getEscalationReasonCode();
		codingsupervisorworklistinfo.getEscalationReasonDesc();
		codingsupervisorworklistinfo.getHpCode();
		codingsupervisorworklistinfo.getHpProduct();
		codingsupervisorworklistinfo.getProgramName();
		codingsupervisorworklistinfo.getProjContentKey();
		codingsupervisorworklistinfo.getProvGroupName();
		codingsupervisorworklistinfo.setBusFuncVenKey(5L);
		codingsupervisorworklistinfo.setBusFunKey(2L);
		codingsupervisorworklistinfo.setChartId("test");
		codingsupervisorworklistinfo.setClientCode("test");
		codingsupervisorworklistinfo.setEscalatedBy("test");
		codingsupervisorworklistinfo.setEscalationReasonCode("test");
		codingsupervisorworklistinfo.setEscalationReasonDesc("test");
		codingsupervisorworklistinfo.setHpCode("test");
		codingsupervisorworklistinfo.setHpProduct("test");
		codingsupervisorworklistinfo.setProgramName("test");
		codingsupervisorworklistinfo.setProjContentKey(5L);
		codingsupervisorworklistinfo.setProvGroupName("test");
	}

}
