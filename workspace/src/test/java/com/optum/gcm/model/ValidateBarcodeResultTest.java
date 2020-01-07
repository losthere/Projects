package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class ValidateBarcodeResultTest {
	@InjectMocks
	ValidateBarcodeResult validateBarcodeResult;
	@Test
	public void testgetProgramKey() {
		validateBarcodeResult.getProgramKey();
	}
	@Test
	public void testsetProgramKey() {
		validateBarcodeResult.setProgramKey(123);
	}
	@Test
	public void testgetBusFuncStatus() {
		validateBarcodeResult.getBusFuncStatus();
	}
	@Test
	public void testsetBusFuncStatus() {
		validateBarcodeResult.setBusFuncStatus("test");
	}
	@Test
	public void testgetProjContBarCode() {
		validateBarcodeResult.getProjContBarCode();
	}
	@Test
	public void testsetProjContBarCode() {
		validateBarcodeResult.setProjContBarCode("test");
	}
	@Test
	public void testgetInputBarcode() {
		validateBarcodeResult.getInputBarcode();
	}
	@Test
	public void testsetInputBarcode() {
		validateBarcodeResult.setInputBarcode("test");
	}
	@Test
	public void testgetWorkItemsCnt() {
		validateBarcodeResult.getWorkItemsCnt();
	}
	@Test
	public void testsetWorkItemsCnt() {
		validateBarcodeResult.setWorkItemsCnt(123);
	}
	@Test
	public void testgetHpKey() {
		validateBarcodeResult.getHpKey();
	}
	@Test
	public void testsetHpKey() {
		validateBarcodeResult.setHpKey(123);
	}
	@Test
	public void testgetProjKey() {
		validateBarcodeResult.getProjKey();
	}
	@Test
	public void testsetProjKey() {
		validateBarcodeResult.setProjKey(123);
	}
	@Test
	public void testgetProjYear() {
		validateBarcodeResult.getProjYear();
	}
	@Test
	public void testsetProjYear() {
		validateBarcodeResult.setProjYear(123);
	}
	@Test
	public void testgetRowNum() {
		validateBarcodeResult.getRowNum();
	}
	@Test
	public void testsetRowNum() {
		validateBarcodeResult.setRowNum(123);
	}
	@Test
	public void testHasPendReq() {
		validateBarcodeResult.getHasPendReq();
	}
	@Test
	public void testsetHasPendReq() {
		validateBarcodeResult.setHasPendReq("test");
	}

	
}
