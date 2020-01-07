package com.optum.gcm.model;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class UtilitiesFilterTest {

	@InjectMocks
	private UtilitiesFilter utilitiesFilter;
	
	
	@Test
	public void testGetCreateDate() throws Exception {
		utilitiesFilter.getCreateDate();
	}

	@Test
	public void testSetCreateDate() throws Exception {
		utilitiesFilter.setCreateDate("12/12/2017");
	}

	@Test
	public void testGetLoginUserKey() throws Exception {
		utilitiesFilter.getLoginUserKey();
	}

	@Test
	public void testSetLoginUserKey() throws Exception {
		utilitiesFilter.setLoginUserKey(12L);
	}
	
	@Test
	public void testGetGroupKey() throws Exception {
		utilitiesFilter.getGroupKey();
	}

	@Test
	public void testSetGroupKey() throws Exception {
		utilitiesFilter.setGroupKey(12L);
	}
	
	@Test
	public void testGetRequestedUser() throws Exception {
		utilitiesFilter.getRequestedUser();
	}

	@Test
	public void testSetRequestedUser() throws Exception {
		utilitiesFilter.setRequestedUser("mani");
	}	
	
	@Test
	public void testGetFileKey() throws Exception {
		utilitiesFilter.getFileKey();
	}

	@Test
	public void testSetFileKey() throws Exception {
		utilitiesFilter.setFileKey(3L);
	}
	
	@Test
	public void testGetProjKey() throws Exception {
		utilitiesFilter.getProjKey();
	}

	@Test
	public void testSetProjKey() throws Exception {
		utilitiesFilter.setProjKey(12L);
	}
	
	@Test
	public void testGetFileName() throws Exception {
		utilitiesFilter.getFileName();
	}

	@Test
	public void testSetFileName() throws Exception {
		utilitiesFilter.setFileName("test");
	}	
	
	@Test
	public void testGetProjYear() throws Exception {
		utilitiesFilter.getProjYear();
	}

	@Test
	public void testSetProjYear() throws Exception {
		utilitiesFilter.setProjYear(2000L);
	}
	
	@Test
	public void testGetBusSegment() throws Exception {
		utilitiesFilter.getBusSegment();
	}

	@Test
	public void testSetBusSegment() throws Exception {
		utilitiesFilter.setBusSegment("ACA");
	}
	@Test
	public void testGetRegion() throws Exception {
		utilitiesFilter.getRegion();
	}
	@Test
	public void testSetRegion() throws Exception {
		utilitiesFilter.setRegion("NY");
	}
}
