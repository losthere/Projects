package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class CodingInventoryWrapperTest {
	private static final List<KeyValue<Long, Long>> List = null;
	@InjectMocks
	CodingInventoryWrapper codinginventorywrapper;
	private java.util.List<CodingInventory> codingInventoryList;
	private SchedulingSearchFilter searchFilter;
	private SchedulingSearchFilter searchFilter1;

	@Test
	public void testcodinginventorywrapper() {
		codinginventorywrapper.getAssignCount();
		codinginventorywrapper.setAssignCount(2L);
		codinginventorywrapper.getAssignIndUsers();
		codinginventorywrapper.setAssignIndUsers(List);
		codinginventorywrapper.getAssignPerUserCount();
		codinginventorywrapper.setAssignPerUserCount(2L);
		codinginventorywrapper.getAssignType();
		codinginventorywrapper.setAssignType(2L);
		codinginventorywrapper.getAssignVendorKey();
		codinginventorywrapper.setAssignVendorKey(2L);
		codinginventorywrapper.getCodingInventoryList();
		codinginventorywrapper.setCodingInventoryList(codingInventoryList);
		codinginventorywrapper.getSearchFilter();
		codinginventorywrapper.setSearchFilter(searchFilter);
		codinginventorywrapper.toString();
		codinginventorywrapper.setCodingSearchFilter(searchFilter);
		
	}

}
