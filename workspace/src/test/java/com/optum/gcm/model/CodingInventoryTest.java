package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class CodingInventoryTest {
	@InjectMocks
	CodingInventory codinginventory;

	@Test
	public void testcodinginventory() {
		codinginventory.getClientDesc();
		codinginventory.setClientDesc("test");
		codinginventory.getClientKey();
		codinginventory.setClientKey(2L);
		codinginventory.getCntTotal();
		codinginventory.setCntTotal(2L);
		codinginventory.getCodingInstruction();
		codinginventory.setCodingInstruction("test");
		codinginventory.getHpDesc();
		codinginventory.setHpDesc("test");
		codinginventory.getHpKey();
		codinginventory.setHpKey(2L);
		codinginventory.getHpProduct();
		codinginventory.setHpProduct("test");
		codinginventory.getHpProductDesc();
		codinginventory.setHpProductDesc("test");
		codinginventory.getPageCount();
		codinginventory.setPageCount(2L);
		codinginventory.getProgramKey();
		codinginventory.setProgramKey(2L);
		codinginventory.getProgramName();
		codinginventory.setProgramName("test");
		codinginventory.getProvGrpNm();
		codinginventory.setProvGrpNm("test");
		codinginventory.getRecCount();
		codinginventory.setRecCount(2L);
		codinginventory.toString();
	}

}
