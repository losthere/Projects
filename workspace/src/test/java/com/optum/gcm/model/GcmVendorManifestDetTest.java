package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.sql.Timestamp;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class GcmVendorManifestDetTest {
	@InjectMocks
	GcmVendorManifestDet gcmvcendormanifesdet;
	private Timestamp createDateTime;
	private Timestamp modifyDateTime;

	@Test
	public void testGcmVendorManifestDet() {
		gcmvcendormanifesdet.setAssnStatus("test");
		gcmvcendormanifesdet.setBusFuncKey(123);
		gcmvcendormanifesdet.setCreateDateTime(createDateTime);
		gcmvcendormanifesdet.setCreateUserId("test");
		gcmvcendormanifesdet.setFileKey(4L);
		gcmvcendormanifesdet.setModifyDateTime(modifyDateTime);
		gcmvcendormanifesdet.setModifyUserId("test");
		gcmvcendormanifesdet.setProjContBarcode("test");
		gcmvcendormanifesdet.setProjContKey(4L);
		gcmvcendormanifesdet.setProjYear(123);
		gcmvcendormanifesdet.setProjKey(5L);
		gcmvcendormanifesdet.setReqString("test");
		gcmvcendormanifesdet.setVendoManifestDetKey(1L);
		gcmvcendormanifesdet.setVendorKey(1L);
		gcmvcendormanifesdet.getClass();
		gcmvcendormanifesdet.toString();
		gcmvcendormanifesdet.getAssnStatus();
		gcmvcendormanifesdet.getBusFuncKey();
		gcmvcendormanifesdet.getCreateDateTime();
		gcmvcendormanifesdet.getFileKey();
		gcmvcendormanifesdet.getModifyDateTime();
		gcmvcendormanifesdet.getModifyUserId();
		gcmvcendormanifesdet.getProjContBarcode();
		gcmvcendormanifesdet.getProjContKey();
		gcmvcendormanifesdet.getProjKey();
		gcmvcendormanifesdet.getProjYear();
		gcmvcendormanifesdet.getReqString();
		gcmvcendormanifesdet.getVendoManifestDetKey();
		gcmvcendormanifesdet.getVendorKey();
		gcmvcendormanifesdet.getCreateUserId();

	}

}
