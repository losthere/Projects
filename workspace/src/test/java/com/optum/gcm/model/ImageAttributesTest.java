package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class ImageAttributesTest {
	@InjectMocks
	ImageAttributes imageattributetest;
	private Date mbrDob;

	@Test
	public void testImageAttributes() {
		imageattributetest.setBarcode("Test");
		imageattributetest.setBusSegment("Test");
		imageattributetest.setClientCd("Test");
		imageattributetest.setFileName("Test");
		imageattributetest.setGlbMbrId("Test");
		imageattributetest.setGroupKey(4L);
		imageattributetest.setHpCd("Test");
		imageattributetest.setHpProduct("test");
		imageattributetest.setImageFileKey(4L);
		imageattributetest.setMbrDob(mbrDob);
		imageattributetest.setMbrFirstName("test");
		imageattributetest.setMbrHic("Test");
		imageattributetest.setMbrLastName("Test");
		imageattributetest.setProgName("Test");
		imageattributetest.setProjectYear(123);
		imageattributetest.setProvFirstName("Test");
		imageattributetest.setProvGrpId("Test");
		imageattributetest.setProviderKey("Test");
		imageattributetest.setProvLastName("Test");
		imageattributetest.setSourceSysProvId("Test");
		imageattributetest.setVendorCode("Test");
		imageattributetest.toString();
		imageattributetest.getBarcode();
		imageattributetest.getBusSegment();
		imageattributetest.getClientCd();
		imageattributetest.getFileName();
		imageattributetest.getGlbMbrId();
		imageattributetest.getGroupKey();
		imageattributetest.getHpCd();
		imageattributetest.getHpProduct();
		imageattributetest.getImageFileKey();
		imageattributetest.getMbrDob();
		imageattributetest.getMbrFirstName();
		imageattributetest.getMbrHic();
		imageattributetest.getMbrLastName();
		imageattributetest.getProgName();
		imageattributetest.getProjectYear();
		imageattributetest.getProvFirstName();
		imageattributetest.getProvGrpId();
		imageattributetest.getProviderKey();
		imageattributetest.getProvLastName();
		imageattributetest.getSourceSysProvId();
		imageattributetest.getVendorCode();

	}

}
