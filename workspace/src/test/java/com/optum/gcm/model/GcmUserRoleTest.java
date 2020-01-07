package com.optum.gcm.model;

import java.sql.Timestamp;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class GcmUserRoleTest {

	@InjectMocks
	GcmUserRole gcmuserrole;
	@Mock
	private Timestamp createDate;
	@Mock
	private Timestamp modifiedDate;

	@Test
	public void testGcmUserRole() {
		gcmuserrole.setCreateDate(createDate);
		gcmuserrole.getCreateDate();
		gcmuserrole.setCreateUser("test");
		gcmuserrole.getCreateUser();
		gcmuserrole.setIsActive("test");
		gcmuserrole.getIsActive();
		gcmuserrole.setModifiedDate(modifiedDate);
		gcmuserrole.getModifiedDate();
		gcmuserrole.setModifiedUser("test");
		gcmuserrole.getModifiedUser();
		gcmuserrole.setReportsUserKey(4L);
		gcmuserrole.getReportsUserKey();
		gcmuserrole.setRoleCode("test");
		gcmuserrole.getRoleCode();
		gcmuserrole.setUserKey(4L);
		gcmuserrole.getUserKey();
		gcmuserrole.setUserRoleKey(4L);
		gcmuserrole.getUserRoleKey();
		gcmuserrole.setVendorKey(5L);
		gcmuserrole.getVendorKey();
		gcmuserrole.toString();
		gcmuserrole.getClass();
	}

}
