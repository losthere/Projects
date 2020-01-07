package com.optum.gcm.web;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.exception.ServiceException;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.StatusUpdateInfo;
import com.optum.gcm.sevice.CodingWorkListService;

@RunWith(PowerMockRunner.class)
public class CodingWorkListControllerTest {

	@InjectMocks
	private CodingWorkListController codingWorklistController;

	@Mock
	private CodingWorkListService codingWorkListService;

	@Test
	public void testGetMyCodingWorklist() throws Exception {
		SchedulingSearchFilter schedulingSearchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(codingWorkListService.getMyCodingWorklist(schedulingSearchFilter)).thenReturn(null);
		codingWorklistController.getMyCodingWorklist(schedulingSearchFilter);
	}
	@Test
	public void testGetMyCodingWorklist_() throws Exception {
		SchedulingSearchFilter schedulingSearchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(codingWorkListService.getMyCodingWorklist(schedulingSearchFilter)).thenThrow(new ServiceException());
		codingWorklistController.getMyCodingWorklist(schedulingSearchFilter);
	}
	
	@Test
	public void testCodingReleasetoAssingment() throws Exception {
		StatusUpdateInfo statusUpdateInfo = Mockito.mock(StatusUpdateInfo.class);
		PowerMockito.when(codingWorkListService.codingReleasetoAssingment(statusUpdateInfo)).thenReturn(null);
		codingWorklistController.codingReleasetoAssingment(statusUpdateInfo);
	}	
	@Test
	public void testCodingReleasetoAssingment_() throws Exception {
		StatusUpdateInfo statusUpdateInfo = Mockito.mock(StatusUpdateInfo.class);
		PowerMockito.when(codingWorkListService.codingReleasetoAssingment(statusUpdateInfo)).thenThrow(new ServiceException());
		codingWorklistController.codingReleasetoAssingment(statusUpdateInfo);
	}	
}




