package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Assert;
import org.junit.Test;
import java.sql.Timestamp;
import java.sql.Date;

public class MyAppointmentsTest {

	@Test
	public void test() {
		
		MyAppointments myAppointments=new MyAppointments();
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		Date date = new Date(System.currentTimeMillis());
		
		myAppointments.setApptId(1l);
		myAppointments.setApptStatus("TEST");
		myAppointments.setProvLocation("TEST");
		myAppointments.setProvName("TEST");
		myAppointments.setProvGroupName("TEST");
		myAppointments.setFaxStatus("TEST");
		myAppointments.setCreateDateTime(date);
		myAppointments.setApptDate(timestamp);
		myAppointments.setChartNotRecvdCnt(1l);
		myAppointments.setTotalCnt(1l);
		myAppointments.setApptType("TEST");
		
		Assert.assertEquals((Long)1l, myAppointments.getApptId());
		Assert.assertEquals("TEST", myAppointments.getApptStatus());
		Assert.assertEquals("TEST", myAppointments.getProvLocation());
		Assert.assertEquals("TEST", myAppointments.getProvName());
		Assert.assertEquals("TEST", myAppointments.getProvGroupName());
		Assert.assertEquals("TEST", myAppointments.getFaxStatus());
		Assert.assertEquals(date, myAppointments.getCreateDateTime());
		Assert.assertEquals(timestamp, myAppointments.getApptDate());
		Assert.assertEquals((Long)1l, myAppointments.getChartNotRecvdCnt());
		Assert.assertEquals((Long)1l, myAppointments.getTotalCnt());
		Assert.assertEquals("TEST", myAppointments.getApptType());

		
	}

}
