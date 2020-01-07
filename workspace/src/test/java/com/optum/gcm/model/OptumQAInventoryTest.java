package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Assert;
import org.junit.Test;

public class OptumQAInventoryTest {

	@Test
	public void test() {
		OptumQAInventory optumQAInventory = new OptumQAInventory();

		optumQAInventory.setClientDesc("TEST");
		optumQAInventory.setHpCD("TEST");
		optumQAInventory.setHpProduct("TEST");
		optumQAInventory.setProgramName("TEST");
		optumQAInventory.setProvGrpNm("TEST");
		optumQAInventory.setPageCount("TEST");
		optumQAInventory.setRecCount(1l);
		optumQAInventory.setVendorKey(1l);
		optumQAInventory.setChartScoreGrp(1l);
		
		Assert.assertEquals("TEST", optumQAInventory.getClientDesc());
		Assert.assertEquals("TEST", optumQAInventory.getHpCD());
		Assert.assertEquals("TEST", optumQAInventory.getHpProduct());
		Assert.assertEquals("TEST", optumQAInventory.getProgramName());
		Assert.assertEquals("TEST", optumQAInventory.getProvGrpNm());
		Assert.assertEquals("TEST", optumQAInventory.getPageCount());
		Assert.assertEquals((Long)1l, optumQAInventory.getRecCount());
		Assert.assertEquals((Long)1l, optumQAInventory.getVendorKey());
		Assert.assertEquals((Long)1l, optumQAInventory.getChartScoreGrp());
		
		
	}

}
