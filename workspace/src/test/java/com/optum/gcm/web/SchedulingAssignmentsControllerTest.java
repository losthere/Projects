package com.optum.gcm.web;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.exception.ServiceException;
import com.optum.gcm.model.SchedulingSearchFilterWrapper;
import com.optum.gcm.sevice.SchedulingAssingmentsService;

@RunWith(PowerMockRunner.class)
public class SchedulingAssignmentsControllerTest {

	@InjectMocks
	private SchedulingAssignmentsController schedulingAssignmentsController;

	@Mock
	private SchedulingAssingmentsService schedulingAssignmentsService;
 
	@Test
	public void testAssignSchedulingInvenotry() throws Exception {
		SchedulingSearchFilterWrapper schedulingSearchFilterWrapper = new SchedulingSearchFilterWrapper();
		PowerMockito.when(schedulingAssignmentsService.assignSchedulingInvenotry(schedulingSearchFilterWrapper)).thenReturn(true);
		schedulingAssignmentsController.assignSchedulingInvenotry(schedulingSearchFilterWrapper);
	}

	@Test
	public void testAssignSchedulingInvenotry_() throws Exception {
		SchedulingSearchFilterWrapper schedulingSearchFilterWrapper = new SchedulingSearchFilterWrapper();
		PowerMockito.when(schedulingAssignmentsService.assignSchedulingInvenotry(schedulingSearchFilterWrapper)).thenThrow(new ServiceException());
		schedulingAssignmentsController.assignSchedulingInvenotry(schedulingSearchFilterWrapper);
	}
}
