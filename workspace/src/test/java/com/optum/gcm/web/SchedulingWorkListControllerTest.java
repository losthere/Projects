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
import com.optum.gcm.sevice.SchedulingWorklistService;

@RunWith(PowerMockRunner.class)
public class SchedulingWorkListControllerTest {

	@InjectMocks
	private SchedulingWorklistController schedulingWorklistController;

	@Mock
	private SchedulingWorklistService schedulingWorklistService;

	@Test
	public void testGetMySchedulingWorklist() throws Exception {
		SchedulingSearchFilter schedulingSearchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(schedulingWorklistService.getMySchedulingWorklist(schedulingSearchFilter)).thenReturn(null);
		schedulingWorklistController.getMySchedulingWorklist(schedulingSearchFilter);
	}
	@Test
	public void testGetMySchedulingWorklist_() throws Exception {
		SchedulingSearchFilter schedulingSearchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(schedulingWorklistService.getMySchedulingWorklist(schedulingSearchFilter)).thenThrow(new ServiceException());
		schedulingWorklistController.getMySchedulingWorklist(schedulingSearchFilter);
	}
	@Test
	public void testGetAssignedChartCountByUser() throws Exception {
		SchedulingSearchFilter schedulingSearchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(schedulingWorklistService.getAssignedChartCountByUser(schedulingSearchFilter)).thenReturn(null);
		schedulingWorklistController.getassignedChartCountByUser(schedulingSearchFilter);
	}
	@Test
	public void testGetAssignedChartCountByUser_() throws Exception {
		SchedulingSearchFilter schedulingSearchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(schedulingWorklistService.getAssignedChartCountByUser(schedulingSearchFilter)).thenThrow(new ServiceException());
		schedulingWorklistController.getassignedChartCountByUser(schedulingSearchFilter);
	}
	@Test
	public void testGetMyAppointments() throws Exception {
		SchedulingSearchFilter schedulingSearchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(schedulingWorklistService.getMyAppointments(schedulingSearchFilter)).thenReturn(null);
		schedulingWorklistController.getMyAppointments(schedulingSearchFilter);
	}
	@Test
	public void testGetMyAppointments_() throws Exception {
		SchedulingSearchFilter schedulingSearchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(schedulingWorklistService.getMyAppointments(schedulingSearchFilter)).thenThrow(new ServiceException());
		schedulingWorklistController.getMyAppointments(schedulingSearchFilter);
	}
}




