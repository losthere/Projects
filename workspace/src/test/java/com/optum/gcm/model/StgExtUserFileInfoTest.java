package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.sql.Timestamp;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class StgExtUserFileInfoTest {
	@InjectMocks
	StgExtUserFileInfo stgExtUserFileInfo;
	@Mock
	private Timestamp creationDate;
	@Mock
	private Timestamp lastProcessOn;
	@Mock
	private Timestamp modifiedDate;

	@Test
	public void testgetStgExtUserFileInfo() {
		stgExtUserFileInfo.getStgExtUserFileInfoKey();
	}

	@Test
	public void testsetStgExtUserFileInfo() {
		stgExtUserFileInfo.setStgExtUserFileInfoKey(5L);
	}

	@Test
	public void testgetFileName() {
		stgExtUserFileInfo.getFileName();
	}

	@Test
	public void testsetFileName() {
		stgExtUserFileInfo.setFileName("test");
	}

	@Test
	public void testgetGcmGroupKey() {
		stgExtUserFileInfo.getGcmGroupKey();
	}

	@Test
	public void testsetGcmGroupKey() {
		stgExtUserFileInfo.setGcmGroupKey(5L);
	}

	@Test
	public void testgetUploadedBy() {
		stgExtUserFileInfo.getUploadedBy();
	}

	@Test
	public void testsetUploadedBy() {
		stgExtUserFileInfo.setUploadedBy("test");
	}

	@Test
	public void testgetLastProcessOn() {
		stgExtUserFileInfo.getLastProcessOn();
	}

	@Test
	public void testsetStgLastProcessOn() {
		stgExtUserFileInfo.setLastProcessOn(lastProcessOn);
	}

	@Test
	public void testgetCreationDate() {
		stgExtUserFileInfo.getCreationDate();
	}

	@Test
	public void testsetCreationDate() {
		stgExtUserFileInfo.setCreationDate(creationDate);
	}

	@Test
	public void testgetCreatedBy() {
		stgExtUserFileInfo.getCreatedBy();
	}

	@Test
	public void testsetCreatedBy() {
		stgExtUserFileInfo.setCreatedBy("test");
	}

	@Test
	public void testgetModifiedDate() {
		stgExtUserFileInfo.getModifiedDate();
	}

	@Test
	public void testsetModifiedDate() {
		stgExtUserFileInfo.setModifiedDate(modifiedDate);
	}

	@Test
	public void testgetModifiedBy() {
		stgExtUserFileInfo.getModifiedBy();
	}

	@Test
	public void testsetStgModifiedBy() {
		stgExtUserFileInfo.setModifiedBy("test");
	}

	@Test
	public void testgettoString() {
		stgExtUserFileInfo.toString();
	}

}
