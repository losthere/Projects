package com.optum.gcm.web;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class GcmHeartBeatControllerTest {

	@InjectMocks
	private GcmHeartbeatController gcmHeartBeatController;
	
	@Test
	public void heartbeatTest() {
		assertNotNull(gcmHeartBeatController.heartbeat());
	}
}
