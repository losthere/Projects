package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class GcmProjectTest {
	@InjectMocks
	GcmProject gcmproject;

	@Test
	public void testGcmProject() {
		gcmproject.setBusinessSegment("test");
		gcmproject.setProjectKey(5L);
		gcmproject.setProjectName("test");
		gcmproject.setProjectYear(5L);
		gcmproject.setReqFirstName("test");
		gcmproject.setReqLastName("test");
		gcmproject.setUserId("test");
		gcmproject.toString();
		gcmproject.getBusinessSegment();
		gcmproject.getClass();
		gcmproject.getProjectKey();
		gcmproject.getProjectName();
		gcmproject.getProjectYear();
		gcmproject.getReqFirstName();
		gcmproject.getReqLastName();
		gcmproject.getUserId();

	}

}
