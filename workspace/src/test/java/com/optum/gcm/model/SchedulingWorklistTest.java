package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class SchedulingWorklistTest {
	@InjectMocks
	SchedulingWorklist schedulingWorklist;

	@Test
	public void testgetProviderSelected() {
		schedulingWorklist.getProviderSelected();

	}

	@Test
	public void testsetProviderSelected() {
		schedulingWorklist.setProviderSelected("test");

	}
}
