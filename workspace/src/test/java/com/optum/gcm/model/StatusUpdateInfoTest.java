package com.optum.gcm.model;

import java.util.LinkedList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class StatusUpdateInfoTest {

	@InjectMocks
	private StatusUpdateInfo statusUpdateInfo;
	
	@Test
	public void testGetToStatus() throws Exception {
		statusUpdateInfo.getToStatus();
	}

	@Test
	public void testSetToStatus() throws Exception {
		statusUpdateInfo.setToStatus("12d");
	}
	
	@Test
	public void testGetRequestedUserId() throws Exception {
		statusUpdateInfo.getRequestedUserId();
	}

	@Test
	public void testSetRequestedUserId() throws Exception {
		statusUpdateInfo.setRequestedUserId("12d");
	}
	
	@Test
	public void testGetLoginUserKey() throws Exception {
		statusUpdateInfo.getLoginUserKey();
	}

	@Test
	public void testSetLoginUserKey() throws Exception {
		statusUpdateInfo.setLoginUserKey(2L);
	}	
	
	@Test
	public void testGetFromUserKey() throws Exception {
		statusUpdateInfo.getFromUserKey();
	}

	@Test
	public void testSetFromUserKey() throws Exception {
		statusUpdateInfo.setFromUserKey(2L);
	}	
	
	@Test
	public void testGetChartIdList() throws Exception {
		statusUpdateInfo.getChartIdList();
	}

	@Test
	public void testSetChartIdList() throws Exception {
		List<String> chartIdList = new LinkedList<String>();
		statusUpdateInfo.setChartIdList(chartIdList);
	}
	
	@Test
	public void testGetBusFunction() throws Exception {
		statusUpdateInfo.getBusFunction();
	}

	@Test
	public void testSetBusFunction() throws Exception {
		statusUpdateInfo.setBusFunction(2L);
	}	

}
