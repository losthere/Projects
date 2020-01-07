package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.sql.Timestamp;

import org.junit.Test;
import org.powermock.modules.junit4.PowerMockRunner;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;

@RunWith(PowerMockRunner.class)
public class GcmRetAppointmentTest {
	@InjectMocks
	GcmRetAppointment gcmretappointment;
	private Timestamp Time;
	private Timestamp createDate;
	private Timestamp modifiedDate;

	@Test
	public void testGcmRetAppointment() {
		gcmretappointment.setAddress1("test");
		gcmretappointment.setAddress2("test");
		gcmretappointment.setApptDateTime(Time);
		gcmretappointment.setApptIteration(5L);
		gcmretappointment.setApptKey(5L);
		gcmretappointment.setApptStatus("test");
		gcmretappointment.setApptType("test");
		gcmretappointment.setBarcode("test");
		gcmretappointment.setCity("test");
		gcmretappointment.setCreateDate(createDate);
		gcmretappointment.setCreateUser("test");
		gcmretappointment.setEmail("test");
		gcmretappointment.setFaxNum("test");
		gcmretappointment.setFaxStatus("test");
		gcmretappointment.setFirstName("test");
		gcmretappointment.setGcmGroupKey(5L);
		gcmretappointment.setGcmUserKey(5L);
		gcmretappointment.setGcmVendorKey(5L);
		gcmretappointment.setLastName("test");
		gcmretappointment.setMiddleName("test");
		gcmretappointment.setModifiedDate(modifiedDate);
		gcmretappointment.setModifiedUser("test");
		gcmretappointment.setNoOfAttempt(5L);
		gcmretappointment.setNoOfAttempts(5L);
		gcmretappointment.setNoOfPendAttempts(5L);
		gcmretappointment.setPhoneNum("test");
		gcmretappointment.setReasonCode("test");
		gcmretappointment.setReasonComment("test");
		gcmretappointment.setState("test");
		gcmretappointment.setUiApptDate("test");
		gcmretappointment.setZip("test");
		gcmretappointment.getAddress1();
		gcmretappointment.getAddress2();
		gcmretappointment.getApptDateTime();
		gcmretappointment.getApptIteration();
		gcmretappointment.getApptKey();
		gcmretappointment.getApptStatus();
		gcmretappointment.getApptType();
		gcmretappointment.getBarcode();
		gcmretappointment.getCity();
		gcmretappointment.getClass();
		gcmretappointment.getCreateDate();
		gcmretappointment.getCreateUser();
		gcmretappointment.getEmail();
		gcmretappointment.getFaxNum();
		gcmretappointment.getFaxStatus();
		gcmretappointment.getFirstName();
		gcmretappointment.getGcmGroupKey();
		gcmretappointment.getGcmUserKey();
		gcmretappointment.getGcmVendorKey();
		gcmretappointment.getLastName();
		gcmretappointment.getMiddleName();
		gcmretappointment.getModifiedDate();
		gcmretappointment.getModifiedUser();
		gcmretappointment.getNoOfAttempts();
		gcmretappointment.getNoOfPendAttempts();
		gcmretappointment.getPhoneNum();
		gcmretappointment.getReasonCode();
		gcmretappointment.getReasonComment();
		gcmretappointment.getState();
		gcmretappointment.getUiApptDate();
		gcmretappointment.getZip();

	}

}
