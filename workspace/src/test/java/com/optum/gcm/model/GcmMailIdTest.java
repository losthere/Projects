package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class GcmMailIdTest {
	@InjectMocks
	GcmMailId gcmmailid;

	@Test
	public void testGcmMailId() {

		gcmmailid.setMailId("test");
		gcmmailid.setName("Test");
		gcmmailid.setType("test");
		gcmmailid.getClass();
		gcmmailid.toString();
		gcmmailid.getMailId();
		gcmmailid.getName();
		gcmmailid.getType();
	}

}
