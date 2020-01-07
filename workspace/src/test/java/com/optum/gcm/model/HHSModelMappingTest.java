package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class HHSModelMappingTest {
@InjectMocks
HHSModelMapping hhsmodelmappingtest;
	@Test
	public void testHHSModelMapping() {
		hhsmodelmappingtest.setDiagEndAge(12.00);
		hhsmodelmappingtest.setDiagStartAge(12.0);
		hhsmodelmappingtest.setHccModelCat("test");
		hhsmodelmappingtest.toString();
		hhsmodelmappingtest.getDiagEndAge();
		hhsmodelmappingtest.getDiagStartAge();
		hhsmodelmappingtest.getHccModelCat();
		hhsmodelmappingtest.getClass();
	}

}
