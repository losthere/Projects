package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.sql.Timestamp;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class GcmVendorAssignmentTest {
@InjectMocks
GcmVendorAssignment gcmvendorassignmenttest;
private Timestamp createDateTime;
private Timestamp modifyDateTime;
	@Test
	public void testGcmVendorAssignment() {
		gcmvendorassignmenttest.setAssignableQty(4L);
		gcmvendorassignmenttest.setCreateDateTime(createDateTime);
		gcmvendorassignmenttest.setCreateUserId("test");
		gcmvendorassignmenttest.setModifyDateTime(modifyDateTime);
		gcmvendorassignmenttest.setModifyUserId("test");
		gcmvendorassignmenttest.setVendorAssignKey(4L);
		gcmvendorassignmenttest.setVendorKey(5L);
		gcmvendorassignmenttest.toString();
		gcmvendorassignmenttest.getAssignableQty();
		gcmvendorassignmenttest.getClass();
		gcmvendorassignmenttest.getCreateDateTime();
		gcmvendorassignmenttest.getCreateUserId();
		gcmvendorassignmenttest.getModifyDateTime();
		gcmvendorassignmenttest.getModifyUserId();
		gcmvendorassignmenttest.getVendorAssignKey();
		gcmvendorassignmenttest.getVendorKey();
	}

}
