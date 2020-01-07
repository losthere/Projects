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
import com.optum.gcm.sevice.CodingSupervisorWorkListService;

@RunWith(PowerMockRunner.class)
public class CodingSupervisorWorkListControllerTest {

	@InjectMocks
	private CodingSupervisorWorkListController codingSupervisorWorklistController;

	@Mock
	private CodingSupervisorWorkListService codingSupervisorWorkListService;

	@Test
	public void testGetUnassignedCodingSupervisorWorkList() throws Exception {
		SchedulingSearchFilter searchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(codingSupervisorWorkListService.getUnassignedCodingSupervisorWorkList(searchFilter)).thenReturn(null);
		codingSupervisorWorklistController.getUnassignedCodingSupervisorWorkList(searchFilter);
	}
	@Test
	public void testGetUnassignedCodingSupervisorWorkList_() throws Exception {
		SchedulingSearchFilter searchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(codingSupervisorWorkListService.getUnassignedCodingSupervisorWorkList(searchFilter)).thenThrow(new ServiceException());
		codingSupervisorWorklistController.getUnassignedCodingSupervisorWorkList(searchFilter);
	}
	@Test
	public void testCodingSupervisorAddToMyWorkList() throws Exception {
		StatusUpdateInfo statusUpdateInfo = Mockito.mock(StatusUpdateInfo.class);
		PowerMockito.when(codingSupervisorWorkListService.codingSupervisorAddToMyWorkList(statusUpdateInfo)).thenReturn(null);
		codingSupervisorWorklistController.codingSupervisorAddToMyWorkList(statusUpdateInfo);
	}
	@Test
	public void testCodingSupervisorAddToMyWorkList_() throws Exception {
		StatusUpdateInfo statusUpdateInfo = Mockito.mock(StatusUpdateInfo.class);
		PowerMockito.when(codingSupervisorWorkListService.codingSupervisorAddToMyWorkList(statusUpdateInfo)).thenThrow(new ServiceException());
		codingSupervisorWorklistController.codingSupervisorAddToMyWorkList(statusUpdateInfo);
	}
	
	@Test
	public void testGetCodingSupervisorMyWorkList() throws Exception {
		SchedulingSearchFilter searchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(codingSupervisorWorkListService.getCodingSupervisorMyWorkList(searchFilter)).thenReturn(null);
		codingSupervisorWorklistController.getCodingSupervisorMyWorkList(searchFilter);
	}
	@Test
	public void testGetCodingSupervisorMyWorkList_() throws Exception {
		SchedulingSearchFilter searchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(codingSupervisorWorkListService.getCodingSupervisorMyWorkList(searchFilter)).thenThrow(new ServiceException());
		codingSupervisorWorklistController.getCodingSupervisorMyWorkList(searchFilter);
	}
	@Test
	public void testReleaseToAvailableItemsForCodingSupervisor() throws Exception {
		StatusUpdateInfo statusUpdateInfo = Mockito.mock(StatusUpdateInfo.class);
		PowerMockito.when(codingSupervisorWorkListService.releaseToAvailableItemsForCodingSupervisor(statusUpdateInfo)).thenReturn(null);
		codingSupervisorWorklistController.releaseToAvailableItemsForCodingSupervisor(statusUpdateInfo);
	}	
	@Test
	public void testReleaseToAvailableItemsForCodingSupervisor_() throws Exception {
		StatusUpdateInfo statusUpdateInfo = Mockito.mock(StatusUpdateInfo.class);
		PowerMockito.when(codingSupervisorWorkListService.releaseToAvailableItemsForCodingSupervisor(statusUpdateInfo)).thenThrow(new ServiceException());
		codingSupervisorWorklistController.releaseToAvailableItemsForCodingSupervisor(statusUpdateInfo);
	}
}
