package com.optum.gcm.model;

import java.sql.Timestamp;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class AppointmentCommentsTest {

	@InjectMocks
	private AppointmentComments appointmentComments;
	@Mock
	private Timestamp createDate;

	@Test
	public void testGetApptKey() throws Exception {
		appointmentComments.getApptKey();
	}

	@Test
	public void testSetApptKey() throws Exception {
		appointmentComments.setApptKey(12L);
	}

	@Test
	public void testGetApptIteration() throws Exception {
		appointmentComments.getApptIteration();
	}

	@Test
	public void testSetApptIteration() throws Exception {
		appointmentComments.setApptIteration(12L);
	}

	@Test
	public void testGetApptComments() throws Exception {
		appointmentComments.getApptComments();
	}

	@Test
	public void testSetApptComments() throws Exception {
		appointmentComments.setApptComments("test");
	}

	@Test
	public void testGetCreateDate() throws Exception {
		appointmentComments.getCreateDate();
	}

	@Test
	public void testSetCreateDate() throws Exception {
		appointmentComments.setCreateDate(createDate);
	}

	@Test
	public void testGetCreateUserId() throws Exception {
		appointmentComments.getCreateUserId();
	}
	@Test
	public void testgetCreateDate() throws Exception {
		appointmentComments.getCreateDate();
	}

	@Test
	public void testsetCreateDate() throws Exception {
		Timestamp ts = new Timestamp(2,3,1,1,1,1,1);
		appointmentComments.setCreateDate(ts);
	}

	@Test
	public void testSetCreateUserId() throws Exception {
		appointmentComments.setCreateUserId("mani");
	}

}
