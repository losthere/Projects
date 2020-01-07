package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class RoleTest {

	@InjectMocks
	Role role;
	@Test
	public void testRole() {
		role.setRoleCode("Test");
		role.getRoleCode();
		role.setRoleName("Test");
		role.getRoleName();
	}

}
