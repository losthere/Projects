package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class RetrievalHpVendorStatusCountTest {

	@InjectMocks
	RetrievalHpVendorStatusCount retrievalHpVendorStatusCount;

	@Test
	public void testgetStatus() {
		retrievalHpVendorStatusCount.getStatus();
	}
	
	@Test
	public void testsetStatus() {
		retrievalHpVendorStatusCount.setStatus("12d");
	}
	
	@Test
	public void testgetStatusCnt() {
		retrievalHpVendorStatusCount.getStatusCnt();
	}
	
	@Test
	public void testsetStatusCnt() {
		retrievalHpVendorStatusCount.setStatusCnt(122);
	}@Test
	public void testgetProjKey() {
		retrievalHpVendorStatusCount.getProjKey();
	}
	
	@Test
	public void testsetProjKey() {
		retrievalHpVendorStatusCount.setProjKey(6L);
	}@Test
	public void testgetProgramKey() {
		retrievalHpVendorStatusCount.getProgramKey();
	}
	
	@Test
	public void testsetProgramKey() {
		retrievalHpVendorStatusCount.setProgramKey(5L);
	}@Test
	public void testgetHpKey() {
		retrievalHpVendorStatusCount.getHpKey();
	}
	
	@Test
	public void testsetHpKey() {
		retrievalHpVendorStatusCount.setHpKey(7L);
	}@Test
	public void testgetHpCd() {
		retrievalHpVendorStatusCount.getHpCd();
	}
	
	@Test
	public void testsetHpCd() {
		retrievalHpVendorStatusCount.setHpCd("12d");
	}@Test
	public void testgetClient() {
		retrievalHpVendorStatusCount.getClient();
	}
	
	@Test
	public void testsetClient() {
		retrievalHpVendorStatusCount.setClient("12d");
	}@Test
	public void testgetVendor() {
		retrievalHpVendorStatusCount.getVendor();
	}
	
	@Test
	public void testsetVendor() {
		retrievalHpVendorStatusCount.setVendor("12d");
	}
	@Test
	public void testgetVendorKey() {
		retrievalHpVendorStatusCount.getVendorKey();
	}
	
	@Test
	public void testsetVendorKey() {
		retrievalHpVendorStatusCount.setVendorKey(2L);
	}@Test
	public void testgetProjYear() {
		retrievalHpVendorStatusCount.getProjYear();
	}
	
	@Test
	public void testsetProjYear() {
		retrievalHpVendorStatusCount.setProjYear(1222);
	}
	@Test
	public void testgetclientKey() {
		retrievalHpVendorStatusCount.getClientKey();
	}
	
	@Test
	public void testclientKey() {
		retrievalHpVendorStatusCount.setClientKey("12d");
	}
}
