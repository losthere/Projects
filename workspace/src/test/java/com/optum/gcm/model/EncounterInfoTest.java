package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.util.List;

import org.bouncycastle.jcajce.provider.asymmetric.ec.SignatureSpi.ecNR;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class EncounterInfoTest {

	@InjectMocks
	EncounterInfo encounterinfo;
	
	@Mock
	private List<String> eoKeyList;

	@Test
	public void testEncounterInfo() {
		encounterinfo.setBarcode("Test");
		encounterinfo.setBusFuncKey(5L);
		encounterinfo.setDosFromDt("Test");
		encounterinfo.setDosThruDt("Test");
		encounterinfo.setEncounterKey(5L);
		encounterinfo.setEoKey("Test");
		encounterinfo.setModBusFuncKey(4L);
		encounterinfo.setPageNumber("Test");
		encounterinfo.setProjContBusFuncVenKey(5L);
		encounterinfo.setProjContentKey(5L);
		encounterinfo.setProjKey(5L);
		encounterinfo.setProvFirstName("test");
		encounterinfo.setProvLastName("test");
		encounterinfo.setProvNpi("test");
		encounterinfo.setRetrievalProvFlag("test");
		encounterinfo.toString();
		encounterinfo.getBarcode();
		encounterinfo.getBusFuncKey();
		encounterinfo.getEoKeyList();
		encounterinfo.getDosFromDt();
		encounterinfo.getDosThruDt();
		encounterinfo.getEncounterKey();
		encounterinfo.getEoKey();
		encounterinfo.getModBusFuncKey();
		encounterinfo.getPageNumber();
		encounterinfo.getProjContBusFuncVenKey();
		encounterinfo.getProjContentKey();
		encounterinfo.getProjKey();
		encounterinfo.getProvFirstName();
		encounterinfo.getProvLastName();
		encounterinfo.getProvNpi();
		encounterinfo.getRetrievalProvFlag();
		encounterinfo.setEoKeyList(eoKeyList);


	}

}
