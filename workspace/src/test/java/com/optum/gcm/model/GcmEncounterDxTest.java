package com.optum.gcm.model;

import java.sql.Timestamp;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class GcmEncounterDxTest {

	@InjectMocks
	GcmEncounterDx gcmEncounterDx;
	@Mock
	private Timestamp cd;
	@Mock
	private Timestamp modifyDateTime;

	@Test
	public void testGcmEncounterDx() {
		gcmEncounterDx.setCreateDateTime(cd);
		gcmEncounterDx.getCreateDateTime();
		gcmEncounterDx.setCreateUserId("test");
		gcmEncounterDx.getCreateUserId();
		gcmEncounterDx.setEncounterDxKey(5L);
		gcmEncounterDx.getEncounterDxKey();
		gcmEncounterDx.setEncounterKey(5L);
		gcmEncounterDx.getEncounterKey();
		gcmEncounterDx.setIcdDxCd("test");
		gcmEncounterDx.getIcdDxCd();
		gcmEncounterDx.setIsInactiveEncDxSw("test");
		gcmEncounterDx.getIsInactiveEncDxSw();
		gcmEncounterDx.setModifyDateTime(modifyDateTime);
		gcmEncounterDx.getModifyDateTime();
		gcmEncounterDx.setModifyUserId("test");
		gcmEncounterDx.getModifyUserId();
		gcmEncounterDx.setProjKey(5L);
		gcmEncounterDx.getProjKey();
		gcmEncounterDx.toString();
		gcmEncounterDx.getClass();
		gcmEncounterDx.setEoKey("test");
		gcmEncounterDx.getEoKey();

	}

}
