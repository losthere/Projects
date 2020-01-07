package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.sql.Timestamp;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class UserFileHistoryTest {

	@InjectMocks
	UserFileHistory userFileHistory;
	private Timestamp uploadedOn;
	private String uploadedBy;
	private Timestamp lastProcessedOn;

	@Test
	public void testgetUploadedOn() {
		userFileHistory.getUploadedOn();
	}

	@Test
	public void testsetUploadedOn() {
		userFileHistory.setUploadedOn(uploadedOn);
	}

	@Test
	public void testStgExtUserFileInfoKey() {
		userFileHistory.getStgExtUserFileInfoKey();
	}

	@Test
	public void testsetStgExtUserFileInfoKey() {
		userFileHistory.setStgExtUserFileInfoKey(5L);
	}

	@Test
	public void testFileName() {
		userFileHistory.getFileName();
	}

	@Test
	public void testsetFileName() {
		userFileHistory.setFileName("test");
	}

	@Test
	public void testUploadedBy() {
		userFileHistory.getUploadedBy();
	}

	@Test
	public void testsetUploadedBy() {
		userFileHistory.setUploadedBy(uploadedBy);
	}

	@Test
	public void testCntUser() {
		userFileHistory.getCntUser();
	}

	@Test
	public void testsetCntUser() {
		userFileHistory.setCntUser(5L);
	}

	@Test
	public void testCntUserSuccess() {
		userFileHistory.getCntUserSuccess();
	}

	@Test
	public void testsetCntUserSuccess() {
		userFileHistory.setCntUserSuccess(5L);
	}

	@Test
	public void testCntUserFailure() {
		userFileHistory.getCntUserFailure();
	}

	@Test 
	public void testsetCntUserFailure() {
		userFileHistory.setCntUserFailure(5L);
	}

	@Test
	public void testLastProcessedOn() {
		userFileHistory.getLastProcessedOn();
	}

	@Test
	public void testsetLastProcessedOn() {
		userFileHistory.setLastProcessedOn(lastProcessedOn);
	}

}
