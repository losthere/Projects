package com.optum.gcm.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class AgeGendorMappingTest {

	@InjectMocks
	private AgeGendorMapping ageGendorMapping;

	@Test
	public void testGetFromAge() throws Exception {
		ageGendorMapping.getFromAge();
	}

	@Test
	public void testSetFromAge() throws Exception {
		ageGendorMapping.setFromAge(12d);
	}
	
	@Test
	public void testGetThruAge() throws Exception {
		ageGendorMapping.getThruAge();
	}

	@Test
	public void testSetThruAge() throws Exception {
		ageGendorMapping.setThruAge(12d);
	}
	
	@Test
	public void testGetGender() throws Exception {
		ageGendorMapping.getGender();
	}

	@Test
	public void testSetGender() throws Exception {
		ageGendorMapping.setGender("F");
	}	

}
