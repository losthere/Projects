package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class GCMUserGroupTest {
	@InjectMocks
	GCMUserGroup gcmusergroup;

	@Test
	public void testGCMUserGroup() {
		gcmusergroup.setGroupCode("test");
		gcmusergroup.setGroupKey("test");
		gcmusergroup.setGroupName("test");
		gcmusergroup.setIsDefaultGroupSW("test");
		gcmusergroup.setIsInternalGroup("test");
		gcmusergroup.setSpotlightUrl("test");
		gcmusergroup.toString();
		gcmusergroup.getClass();
		gcmusergroup.getGroupCode();
		gcmusergroup.getGroupKey();
		gcmusergroup.getGroupName();
		gcmusergroup.getIsDefaultGroupSW();
		gcmusergroup.getIsInternalGroup();
		gcmusergroup.getSpotlightUrl();
	}

}
