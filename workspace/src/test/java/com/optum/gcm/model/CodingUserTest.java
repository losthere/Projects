package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class CodingUserTest {
	@InjectMocks
	CodingUser codinguser;
	@Test
	public void testCodingUser() {
		codinguser.getAssignedCount();
		codinguser.setAssignedCount(5L);
	}

}
