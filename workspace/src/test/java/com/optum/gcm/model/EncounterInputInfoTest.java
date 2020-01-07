package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class EncounterInputInfoTest {
	@InjectMocks
	EncounterInputInfo encounterinputinfo;

	@Test
	public void testEncounterInputInfo() {
		encounterinputinfo.getBusFuncKey();
		encounterinputinfo.getBusFuncVenKey();
		encounterinputinfo.getEncounterKey();
		encounterinputinfo.getProjContentKey();
		encounterinputinfo.getProjKey();
		encounterinputinfo.getUserKey();
		encounterinputinfo.setBusFuncKey(5L);
		encounterinputinfo.setBusFuncVenKey(5L);
		encounterinputinfo.setEncounterKey(5L);
		encounterinputinfo.setProjContentKey(5L);
		encounterinputinfo.setProjKey(5L);
		encounterinputinfo.toString();
		encounterinputinfo.setUserKey(5L);
	}

}
