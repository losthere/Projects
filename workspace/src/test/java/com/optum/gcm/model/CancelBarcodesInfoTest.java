package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class CancelBarcodesInfoTest {
	@InjectMocks
	CancelBarcodesInfo cancelbarecodeinfo;

	@Test
	public void testgetBarcodes() {
		cancelbarecodeinfo.getBarcodes();

	}
	@Test
	public void testsetBarcodes() {
		cancelbarecodeinfo.setBarcodes("test");

	}

	@Test
	public void testgetReasonCode() {
		cancelbarecodeinfo.getReasonCode();

	}
	@Test
	public void testsetReasonCode() {
		cancelbarecodeinfo.setReasonCode("test");
	}

	@Test
	public void testgetUserId() {
		cancelbarecodeinfo.getUserId();

	}
	@Test
	public void testsetUserId() {
		cancelbarecodeinfo.setUserId("test");

	}

	@Test
	public void testgetUserKey() {
		cancelbarecodeinfo.getUserKey();

	}
	@Test
	public void testsetUserKey() {
		cancelbarecodeinfo.setUserKey(2L);

	}

	@Test
	public void testgetGroupKey() {
		cancelbarecodeinfo.getGroupKey();

	}
	@Test
	public void testsetGroupKey() {
		cancelbarecodeinfo.setGroupKey(2L);

	}

}
