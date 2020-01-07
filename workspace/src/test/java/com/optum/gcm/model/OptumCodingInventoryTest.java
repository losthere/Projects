package com.optum.gcm.model;

import org.junit.Assert;
import org.junit.Test;

public class OptumCodingInventoryTest {

	@Test
	public void test() {
		OptumCodingInventory optumCodingInventory=new OptumCodingInventory();
		
		optumCodingInventory.setClientDesc("TEST_PROJECT");
		optumCodingInventory.setHpCD("TEST_PROJECT");
		optumCodingInventory.setHpProduct("TEST_PROJECT");
		optumCodingInventory.setProgramName("TEST_PROJECT");
		optumCodingInventory.setCodingInstruction("TEST_PROJECT");
		optumCodingInventory.setRecCount(1l);
		optumCodingInventory.setVendorKey(1l);
	
		
		Assert.assertEquals("TEST_PROJECT", optumCodingInventory.getClientDesc());
		Assert.assertEquals("TEST_PROJECT", optumCodingInventory.getHpCD());
		
		Assert.assertEquals("TEST_PROJECT", optumCodingInventory.getHpProduct());
		Assert.assertEquals("TEST_PROJECT", optumCodingInventory.getProgramName());
		Assert.assertEquals("TEST_PROJECT", optumCodingInventory.getCodingInstruction());
		Assert.assertEquals((Long) 1l, optumCodingInventory.getRecCount());
		Assert.assertEquals((Long) 1l, optumCodingInventory.getVendorKey());
	
	}
	@Test
	public void testtostring() {
		OptumCodingInventory optumCodingInventory=new OptumCodingInventory();
		optumCodingInventory.toString();
	}
	
	}

