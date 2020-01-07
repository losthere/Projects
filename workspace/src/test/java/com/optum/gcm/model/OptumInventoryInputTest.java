package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class OptumInventoryInputTest {

	@InjectMocks
	OptumInventoryInput optumInventoryInput;
	@Test
	public void test() {
		optumInventoryInput.setBusFuncKey(7l);
		optumInventoryInput.setBusSegment("Test");
		optumInventoryInput.setGroupKey(2017l);
		optumInventoryInput.setProjectYear(2017l);
		optumInventoryInput.setRegion("Test");
		optumInventoryInput.setRoleCode("Test");
		optumInventoryInput.setUserId("Test");
		optumInventoryInput.setUserKey(7l);
		optumInventoryInput.setVendorKey(7l);
		assertNotNull(optumInventoryInput.getBusFuncKey());
		assertNotNull(optumInventoryInput.getBusSegment());
		assertNotNull(optumInventoryInput.getGroupKey());
		assertNotNull(optumInventoryInput.getProjectYear());
		assertNotNull(optumInventoryInput.getRegion());
		assertNotNull(optumInventoryInput.getRoleCode());
		assertNotNull(optumInventoryInput.getUserId());
		assertNotNull(optumInventoryInput.getUserKey());
		assertNotNull(optumInventoryInput.getVendorKey());
		
	}

}
