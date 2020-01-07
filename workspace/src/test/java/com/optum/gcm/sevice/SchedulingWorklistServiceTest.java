package com.optum.gcm.sevice;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.SchedulingSearchFilter;

@RunWith(PowerMockRunner.class)
public class SchedulingWorklistServiceTest {

	@InjectMocks
	protected SchedulingWorklistService schedulingWorklistService;

	@Mock
	private CommonJpaService commonJpaService;

	@Mock
	protected SchedulingSearchFilter searchFilter;

	@Mock
	private SchedulingSearchFilter schedulingSearchFilter;

	@Test
	public void testGetUnassignedInventoryforScheduling() throws Exception {
		schedulingWorklistService.getMySchedulingWorklist(schedulingSearchFilter);
	}
	@Test
	public void testgetMyAppointments() throws Exception {
		SchedulingSearchFilter schedulingSearchFilter=new SchedulingSearchFilter();
		schedulingSearchFilter.setAppointmentId(5L);
		schedulingSearchFilter.setAppointmentStatus("Done"); 
		schedulingSearchFilter.setFaxStatus("Done");
		schedulingWorklistService.getMyAppointments(schedulingSearchFilter);
	}
	@Test
	public void testgetAssignedChartCountByUser() throws Exception {
		schedulingSearchFilter.setAppointmentId(5L);
		schedulingSearchFilter.setAppointmentStatus("Done");
		schedulingSearchFilter.setFaxStatus("Done");
		schedulingWorklistService.getAssignedChartCountByUser(schedulingSearchFilter);
	}
}
