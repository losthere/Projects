package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class EncounterDxInfoTest {
@InjectMocks
EncounterDxInfo encounterdxinfo;
	@Test
	public void testEncounterDxInfo() {
		encounterdxinfo.setEncDxKey(5L);
		encounterdxinfo.setEoKey("test");
		encounterdxinfo.setIcdDxCd("test");
		encounterdxinfo.toString();
		encounterdxinfo.getClass();
		encounterdxinfo.getEncDxKey();
		encounterdxinfo.getEoKey();
		encounterdxinfo.getIcdDxCd();
	}

}
