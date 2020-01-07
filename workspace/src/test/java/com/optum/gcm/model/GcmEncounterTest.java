package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.sql.Timestamp;
import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class GcmEncounterTest {
	@InjectMocks
	GcmEncounter gcmencounter;
	@Mock
	private Timestamp createDate;
	@Mock
	private Date dosFromDt;
	@Mock
	private Date dosThruDt;
	@Mock
	private Timestamp modifiedDate;

	@Test
	public void testgcmEncounter() {
		gcmencounter.setBarcode("Test");
		gcmencounter.setBusFuncKey(5L);
		gcmencounter.setCreateDate(createDate);
		gcmencounter.setCreateUser("Test");
		gcmencounter.setDosFromDt(dosFromDt);
		gcmencounter.setDosThruDt(dosThruDt);
		gcmencounter.getDosThruDt();
		gcmencounter.setEoKey("Test");
		Date d = new Date(2L);
		gcmencounter.setInactiveEncDateTime(d);
		gcmencounter.setIsInactiveByUserId("Test");
		gcmencounter.setIsInactiveEncSw("Test");
		gcmencounter.setModBusFuncKey(5L);
		gcmencounter.setModifiedDate(modifiedDate);
		gcmencounter.setModifiedUser("Test");
		gcmencounter.setModProjContBusFuncVenKey(5L);
		gcmencounter.setPageNumber("Test");
		gcmencounter.setParentEncounterKey(5L);
		gcmencounter.setProjContBusFuncVenKey(5L);
		gcmencounter.setProjContentKey(5L);
		gcmencounter.setProjKey(5L);
		gcmencounter.setProvFirstName("Test");
		gcmencounter.setProvLastName("Test");
		gcmencounter.setProvNpi("Test");
		gcmencounter.setQaActionCd("Test");
		gcmencounter.setRetrievalProvFlag("Test");
		gcmencounter.setEncounterKey(5L);
		gcmencounter.getEncounterKey();
		gcmencounter.getBarcode(); 
		gcmencounter.getBusFuncKey();
		gcmencounter.getCreateDate();
		gcmencounter.getCreateUser();
		gcmencounter.getDosFromDt();
		gcmencounter.getEoKey();
		gcmencounter.getInactiveEncDateTime();
		gcmencounter.getIsInactiveByUserId();
		gcmencounter.getIsInactiveEncSw();
		gcmencounter.getModBusFuncKey();
		gcmencounter.getModifiedDate();
		gcmencounter.getModifiedUser();
		gcmencounter.getModProjContBusFuncVenKey();
		gcmencounter.getPageNumber();
		gcmencounter.getParentEncounterKey();
		gcmencounter.getProjContBusFuncVenKey();
		gcmencounter.getProjContentKey();
		gcmencounter.getProjKey();
		gcmencounter.getProvFirstName();
		gcmencounter.getProvLastName();
		gcmencounter.getProvNpi();
		gcmencounter.getQaActionCd();
		gcmencounter.getRetrievalProvFlag();

	}

}
