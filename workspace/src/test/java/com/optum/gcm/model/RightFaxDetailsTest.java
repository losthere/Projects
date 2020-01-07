package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.sql.Timestamp;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class RightFaxDetailsTest {
	@InjectMocks
	RightFaxDetails rightFaxDetails;

	@Mock
	private Timestamp faxDateTime;
	@Test
	public void testgetApptKey() {
		rightFaxDetails.getApptKey();

	}

	@Test
	public void testsetApptKey() {
		rightFaxDetails.setApptKey(5L);

	}

	@Test
	public void testgetDocumentID() {
		rightFaxDetails.getDocumentID();

	}

	@Test
	public void testsetDocumentID() {
		rightFaxDetails.setDocumentID("test");

	}

	@Test
	public void testgetFaxStatus() {
		rightFaxDetails.getFaxStatus();

	}

	@Test
	public void testsetFaxStatus() {
		rightFaxDetails.setFaxStatus("truee");

	}

	@Test
	public void testgetFaxDateTime() {
		rightFaxDetails.getFaxDateTime();

	}

	@Test
	public void testsetFaxDateTime() {
		rightFaxDetails.setFaxDateTime(faxDateTime);

	}

	
}
