package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)  
public class RetrievalSearchFilterWrapperTest {
	private static final List<RetrievalSearchFilter> List = null;
	@InjectMocks
	RetrievalSearchFilterWrapper retrievalSearchFilterWrapper;

	

	@Test
	public void testgetNewVendorKey() {
		retrievalSearchFilterWrapper.getNewVendorKey();
	}
	@Test
	public void testsetNewVendorKey() {
		retrievalSearchFilterWrapper.setNewVendorKey(5L);
	}
	@Test
	public void testgetRetrievalSearchFilter() {
		retrievalSearchFilterWrapper.getRetrievalSearchFilter();
	}
	@Test
	public void testsetRetrievalSearchFilter() {
		retrievalSearchFilterWrapper.setRetrievalSearchFilter(List);
	}
	@Test
	public void testgetAssignQty() {
		retrievalSearchFilterWrapper.getAssignQty();
	}
	@Test
	public void testsetAssignQty() {
		retrievalSearchFilterWrapper.setAssignQty(5L);
	}
	@Test
	public void testgetLoggedInUser() {
		retrievalSearchFilterWrapper.getLoggedInUser();
	}
	@Test
	public void testsetLoggedInUser() {
		retrievalSearchFilterWrapper.setLoggedInUser("test");
	}
}
