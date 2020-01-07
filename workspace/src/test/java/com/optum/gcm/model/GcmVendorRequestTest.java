package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.sql.Timestamp;

import org.bouncycastle.crypto.macs.GMac;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class GcmVendorRequestTest {
	@InjectMocks
	GcmVendorRequest gcmvendorrequest;
	private Timestamp createDate;
	private Timestamp modifiedDate;

	@Test
	public void testGcmVendorRequest() {
		gcmvendorrequest.setBusFuncStatus("test");
		gcmvendorrequest.setBusinessSegment("test");
		gcmvendorrequest.setCreateDate(createDate);
		gcmvendorrequest.setCreateUser("test");
		gcmvendorrequest.setHpKey(5L);
		gcmvendorrequest.setHpProduct("test");
		gcmvendorrequest.setModifiedDate(modifiedDate);
		gcmvendorrequest.setModifiedUser("test");
		gcmvendorrequest.setNewVendorKey(4L);
		gcmvendorrequest.setProcessStatus("test");
		gcmvendorrequest.setProgramKey(4L);
		gcmvendorrequest.setProjKey(4L);
		gcmvendorrequest.setProjYear(123);
		gcmvendorrequest.setRequestType("test");
		gcmvendorrequest.setVendorAssignKey(4L);
		gcmvendorrequest.setVendorKey(4L);
		gcmvendorrequest.setVendorReqKey(4L);
		gcmvendorrequest.toString();
		gcmvendorrequest.getBusFuncStatus();
		gcmvendorrequest.getBusinessSegment();
		gcmvendorrequest.getCreateDate();
		gcmvendorrequest.getCreateUser();
		gcmvendorrequest.getHpKey();
		gcmvendorrequest.getHpProduct();
		gcmvendorrequest.getModifiedDate();
		gcmvendorrequest.getModifiedUser();
		gcmvendorrequest.getNewVendorKey();
		gcmvendorrequest.getProcessStatus();
		gcmvendorrequest.getProgramKey();
		gcmvendorrequest.getProjKey();
		gcmvendorrequest.getProjYear();
		gcmvendorrequest.getRequestType();
		gcmvendorrequest.getVendorAssignKey();
		gcmvendorrequest.getVendorKey();
		gcmvendorrequest.getVendorReqKey();

	}

}
