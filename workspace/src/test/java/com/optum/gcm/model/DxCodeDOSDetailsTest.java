package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class DxCodeDOSDetailsTest {
	@InjectMocks
	DxCodeDOSDetails dxcodedosdetails;

	@Test
	public void testDxCodeDOSDetails() {
		dxcodedosdetails.getAge();
		dxcodedosdetails.getBusSegment();
		dxcodedosdetails.getDateOfBirth();
		dxcodedosdetails.getDosFromDt();
		dxcodedosdetails.getDosThruDt();
		dxcodedosdetails.getGender();
		dxcodedosdetails.getIcdDxCd();
		dxcodedosdetails.setAge(5L);
		dxcodedosdetails.setBusSegment("test");
		dxcodedosdetails.setDateOfBirth("test");
		dxcodedosdetails.setDosFromDt("test");
		dxcodedosdetails.setDosThruDt("test");
		dxcodedosdetails.setGender("test");
		dxcodedosdetails.setAge(5L);
		dxcodedosdetails.setIcdDxCd("test");
	}

}
