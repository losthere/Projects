package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class RetrievalSearchFilterTest {

	private static final RetrievalSearchProviderFilter List = null;
	@InjectMocks
	RetrievalSearchFilter retrievalSearchFilter;

	@Test
	public void testgetterseter() { 
		retrievalSearchFilter.setBusSegment("12d");
		  retrievalSearchFilter.getBusSegment();
		retrievalSearchFilter.setProgram("test");
		  retrievalSearchFilter.getProgram();
		retrievalSearchFilter.setProgramKey(5L);
		  retrievalSearchFilter.getProgramKey();
		retrievalSearchFilter.setProjectName("test");
		  retrievalSearchFilter.getProjectName();
		retrievalSearchFilter.setProjectKey(5L);
		  retrievalSearchFilter.getProjectKey();
		retrievalSearchFilter.setProjYear(123);
		  retrievalSearchFilter.getProjYear();
		retrievalSearchFilter.setVendorKey(5L);
		  retrievalSearchFilter.getVendorKey();
		retrievalSearchFilter.setClientKey(5L);
		  retrievalSearchFilter.getClientKey();
		retrievalSearchFilter.setHpKey(5L);
		  retrievalSearchFilter.getHpKey();
		retrievalSearchFilter.setHpProduct("test");
		  retrievalSearchFilter.getHpProduct(); 
		retrievalSearchFilter.setStatus("test");
		  retrievalSearchFilter.getStatus();
		retrievalSearchFilter.setProgram("test");
		  retrievalSearchFilter.getProgram();
		retrievalSearchFilter.setProviderFilter(List);
		  retrievalSearchFilter.getProviderFilter();
		retrievalSearchFilter.setProgramsByUser("test");
		  retrievalSearchFilter.getProgramsByUser();
	}
 
	@Test
	public void testProgramsByUser() {
		retrievalSearchFilter.getProgramsByUser();
}
	@Test
	public void testsetProgramsByUser() {
		retrievalSearchFilter.setProgramsByUser("test");
}



}
