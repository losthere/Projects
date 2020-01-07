package com.optum.gcm.model;

import java.sql.Timestamp;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class StgVendorReqConcurrencyTest {

	@InjectMocks
	private StgVendorReqConcurrency stgVendorReqConcurrency;
	

	
	@Test
	public void testGetProjKey() throws Exception {
		stgVendorReqConcurrency.getProjKey();
	}

	@Test
	public void testSetProjKey() throws Exception {
		stgVendorReqConcurrency.setProjKey(12L);
	}
	
	@Test
	public void testGetProgramKey() throws Exception {
		stgVendorReqConcurrency.getProgramKey();
	}

	@Test
	public void testSetProgramKey() throws Exception {
		stgVendorReqConcurrency.setProgramKey(12l);
	}
	
	@Test
	public void testGetHpKey() throws Exception {
		stgVendorReqConcurrency.getHpKey();
	}

	@Test
	public void testSetHpKey() throws Exception {
		stgVendorReqConcurrency.setHpKey(12l);
	}
	
	@Test
	public void testGetReqestType() throws Exception {
		stgVendorReqConcurrency.getReqestType();
	}

	@Test
	public void testSetReqestType() throws Exception {
		stgVendorReqConcurrency.setReqestType("normal");
	}
	
	@Test
	public void testGetUserId() throws Exception {
		stgVendorReqConcurrency.getUserId();
	}

	@Test
	public void testSetUserId() throws Exception {
		stgVendorReqConcurrency.setUserId("test");
	}
	
	@Test
	public void testGetCrateDate() throws Exception {
		stgVendorReqConcurrency.getCrateDate();
	}

	@Test
	public void testSetCrateDate() throws Exception {
		Timestamp createDate = new Timestamp(12L);
		stgVendorReqConcurrency.setCrateDate(createDate);
	}
	
	@Test
	public void testVendorKey() {
		stgVendorReqConcurrency.setVendorKey(5L);
		stgVendorReqConcurrency.getVendorKey();
		
		
	}
}
