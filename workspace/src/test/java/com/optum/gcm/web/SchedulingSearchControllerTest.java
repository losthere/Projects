package com.optum.gcm.web;

import javax.sql.rowset.serial.SerialArray;

//import java.sql.SQLException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.exception.ServiceException;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.SearchFilter;
import com.optum.gcm.sevice.SchedulingSearchService;

@RunWith(PowerMockRunner.class)
public class SchedulingSearchControllerTest {

	@InjectMocks
	private SchedulingSearchController schedulingSearchController;

	@Mock
	private SchedulingSearchService schedulingSearchService;

	@Test
	public void testGetUnassignedInventoryforScheduling() throws Exception {
		SchedulingSearchFilter searchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(schedulingSearchService.getUnassignedInventoryforScheduling(searchFilter)).thenReturn(null);
		schedulingSearchController.getUnassignedInventoryforScheduling(searchFilter);
	}

	@Test
	public void testGetUnassignedInventoryforScheduling_() throws Exception {
		SchedulingSearchFilter searchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(schedulingSearchService.getUnassignedInventoryforScheduling(searchFilter)).thenThrow(new ServiceException());
		schedulingSearchController.getUnassignedInventoryforScheduling(searchFilter);
	}
	
}
