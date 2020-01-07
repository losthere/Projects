package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class ExistingAppointmentTest {
	@InjectMocks
	ExistingAppointment existingappointment;

	@Test
	public void test() {
		existingappointment.getApptId();
		existingappointment.setApptId("test");
		existingappointment.getApptDate();
		existingappointment.setApptDate("test");
		existingappointment.getApptStatus();
		existingappointment.setApptStatus("test");
		existingappointment.getApptTime();
		existingappointment.setApptTime("Test");
		existingappointment.getApptType();
		existingappointment.setApptType("Test");
		existingappointment.getApptUserName();
		existingappointment.setApptUserName("Test");
		existingappointment.getChartCnt();
		existingappointment.setChartCnt(5L);
		existingappointment.getGcmUserKey();
		existingappointment.setGcmUserKey(5L);
		existingappointment.getRetCnt();
		existingappointment.setRetCnt(5L);
		existingappointment.getRetrContact();
		existingappointment.setRetrFax("Test");
		existingappointment.getRetrLocation();
		existingappointment.setRetrLocation("Test");
		existingappointment.getRetrPhone();
		existingappointment.setRetrPhone("Test");
		existingappointment.getRetrFax();
		existingappointment.setRetrContact("Test");
	}

}
