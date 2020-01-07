package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)

public class EncounterDxHccInfoTest {
	@InjectMocks
	EncounterDxHccInfo encounterdxhccinfo;
	
	@Mock
	private List<String> eoKeyList;

	@Test
	public void testEncounterDxHccInfo() {
		encounterdxhccinfo.getBarcode();
		encounterdxhccinfo.getBusFuncKey();
		encounterdxhccinfo.getDosFromDt();
		encounterdxhccinfo.getDosThruDt();
		encounterdxhccinfo.getEncDxEoKey();
		encounterdxhccinfo.getEncDxKey();
		encounterdxhccinfo.getEncEoKey();
		encounterdxhccinfo.getEncounterKey();
		encounterdxhccinfo.getHhs();
		encounterdxhccinfo.getIcdDesc();
		encounterdxhccinfo.getIcdDxCd();
		encounterdxhccinfo.getPageNumber();
		encounterdxhccinfo.getProjContBusFuncVenKey();
		encounterdxhccinfo.getProjContentKey();
		encounterdxhccinfo.getProjKey();
		encounterdxhccinfo.getProvFirstName();
		encounterdxhccinfo.getProvLastName();
		encounterdxhccinfo.getProvNpi();
		encounterdxhccinfo.getRetrievalProvFlag();
		encounterdxhccinfo.getRxHcc();
		encounterdxhccinfo.getV22Hcc();
		encounterdxhccinfo.setBarcode("Test");
		encounterdxhccinfo.setBusFuncKey(5L);
		encounterdxhccinfo.setDosFromDt("Test");
		encounterdxhccinfo.setDosThruDt("Test");
		encounterdxhccinfo.setEncDxEoKey("Test");
		encounterdxhccinfo.setEncDxKey(5L);
		encounterdxhccinfo.setEncEoKey("Test");
		encounterdxhccinfo.setEncounterKey(5L);
		encounterdxhccinfo.setHhs("Test");
		encounterdxhccinfo.setIcdDesc("Test");
		encounterdxhccinfo.setIcdDxCd("Test");
		encounterdxhccinfo.setPageNumber("Test");
		encounterdxhccinfo.setProjContBusFuncVenKey(5L);
		encounterdxhccinfo.setProjContentKey(5L);
		encounterdxhccinfo.setProjKey(5L);
		encounterdxhccinfo.setProvFirstName("Test");
		encounterdxhccinfo.setProvLastName("Test");
		encounterdxhccinfo.setProvNpi("Test");
		encounterdxhccinfo.setRetrievalProvFlag("Test");
		encounterdxhccinfo.setRxHcc("Test");
		encounterdxhccinfo.setV22Hcc("Test");
		encounterdxhccinfo.getEoKeyList();
		encounterdxhccinfo.setEoKeyList(eoKeyList);

	}

}
