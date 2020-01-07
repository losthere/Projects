package com.optum.gcm.web;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.exception.ServiceException;
import com.optum.gcm.model.AppointmentComments;
import com.optum.gcm.model.AppointmentInfo;
import com.optum.gcm.model.AppointmentSearchFilter;
import com.optum.gcm.model.AssignInventorySearchFilter;

import com.optum.gcm.model.GcmRetAppointment;
import com.optum.gcm.model.ProviderDetailsWrapper;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.SchedulingSearchFilterWrapper;
import com.optum.gcm.sevice.SchedulingWorkFlowService;

@RunWith(PowerMockRunner.class)
public class SchedulingWorkFlowControllerTest {

	@InjectMocks
	private SchedulingWorkFlowController schedulingWorkFlowController;

	@Mock
	private SchedulingWorkFlowService schedulingWorkFlowService;

	@Test
	public void testGetExistingAppts() throws Exception {
		AppointmentSearchFilter appointmentSearchFilter = Mockito.mock(AppointmentSearchFilter.class);
		PowerMockito.when(schedulingWorkFlowService.getExistingAppts(appointmentSearchFilter)).thenReturn(null);
		schedulingWorkFlowController.getExistingAppts(appointmentSearchFilter);
	}
	@Test
	public void testGetExistingAppts_() throws Exception {
		AppointmentSearchFilter appointmentSearchFilter = Mockito.mock(AppointmentSearchFilter.class);
		PowerMockito.when(schedulingWorkFlowService.getExistingAppts(appointmentSearchFilter)).thenThrow(new ServiceException());
		schedulingWorkFlowController.getExistingAppts(appointmentSearchFilter);
	} 
	
	@Test
	public void testGetChartMemberDetails() throws Exception {
		SchedulingSearchFilterWrapper schedulingSearchFilterWrapper = Mockito.mock(SchedulingSearchFilterWrapper.class);
		PowerMockito.when(schedulingWorkFlowService.getChartMemberDetails(schedulingSearchFilterWrapper)).thenReturn(null);
		schedulingWorkFlowController.getChartMemberDetails(schedulingSearchFilterWrapper);
	}
	@Test
	public void testGetChartMemberDetails_() throws Exception {
		SchedulingSearchFilterWrapper schedulingSearchFilterWrapper = Mockito.mock(SchedulingSearchFilterWrapper.class);
		PowerMockito.when(schedulingWorkFlowService.getChartMemberDetails(schedulingSearchFilterWrapper)).thenThrow(new ServiceException());
		schedulingWorkFlowController.getChartMemberDetails(schedulingSearchFilterWrapper);
	}
	
	@Test
	public void testGetChartMemberDetailsByApptId() throws Exception {
		SchedulingSearchFilterWrapper schedulingSearchFilterWrapper = Mockito.mock(SchedulingSearchFilterWrapper.class);
		PowerMockito.when(schedulingWorkFlowService.getChartMemberDetailsByApptId(schedulingSearchFilterWrapper)).thenReturn(null);
		schedulingWorkFlowController.getChartMemberDetailsByApptId(schedulingSearchFilterWrapper);
	}
	@Test
	public void testGetChartMemberDetailsByApptId_() throws Exception {
		SchedulingSearchFilterWrapper schedulingSearchFilterWrapper = Mockito.mock(SchedulingSearchFilterWrapper.class);
		PowerMockito.when(schedulingWorkFlowService.getChartMemberDetailsByApptId(schedulingSearchFilterWrapper)).thenThrow(new ServiceException());
		schedulingWorkFlowController.getChartMemberDetailsByApptId(schedulingSearchFilterWrapper);
	}
	@Test
	public void testCreateAppointment() throws Exception {
		GcmRetAppointment gcmRetAppointment = Mockito.mock(GcmRetAppointment.class);
		PowerMockito.when(schedulingWorkFlowService.createAppointment(gcmRetAppointment)).thenReturn(null);
		schedulingWorkFlowController.createAppointment(gcmRetAppointment);
	}
	@Test
	public void testCreateAppointment_() throws Exception {
		GcmRetAppointment gcmRetAppointment = Mockito.mock(GcmRetAppointment.class);
		PowerMockito.when(schedulingWorkFlowService.createAppointment(gcmRetAppointment)).thenThrow(new ServiceException());
		schedulingWorkFlowController.createAppointment(gcmRetAppointment);
	}
	
	@Test
	public void testConfirmAppointment() throws Exception {
		AppointmentInfo appointmentInfo = Mockito.mock(AppointmentInfo.class);
		PowerMockito.when(schedulingWorkFlowService.confirmAppointment(appointmentInfo)).thenReturn(null);
		schedulingWorkFlowController.confirmAppointment(appointmentInfo);
	}
	@Test
	public void testConfirmAppointment_() throws Exception {
		AppointmentInfo appointmentInfo = Mockito.mock(AppointmentInfo.class);
		PowerMockito.when(schedulingWorkFlowService.confirmAppointment(appointmentInfo)).thenThrow(new ServiceException());
		schedulingWorkFlowController.confirmAppointment(appointmentInfo);
	}
	@Test
	public void testGetChartStatusCountByUser() throws Exception {
		SchedulingSearchFilter schedulingSearchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(schedulingWorkFlowService.getChartStatusCountByUser(schedulingSearchFilter)).thenReturn(null);
		schedulingWorkFlowController.getChartStatusCountByUser(schedulingSearchFilter);
	}
	@Test
	public void testGetChartStatusCountByUser_() throws Exception {
		SchedulingSearchFilter schedulingSearchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(schedulingWorkFlowService.getChartStatusCountByUser(schedulingSearchFilter)).thenThrow(new ServiceException());
		schedulingWorkFlowController.getChartStatusCountByUser(schedulingSearchFilter);
	}
	
	@Test
	public void testGetMemberDetails() throws Exception {
		AssignInventorySearchFilter assignInventorySearchFilter = Mockito.mock(AssignInventorySearchFilter.class);
		PowerMockito.when(schedulingWorkFlowService.getMemberDetails(assignInventorySearchFilter)).thenReturn(null);
		schedulingWorkFlowController.getMemberDetails(assignInventorySearchFilter);
	}
	@Test
	public void testGetMemberDetails_() throws Exception {
		AssignInventorySearchFilter assignInventorySearchFilter = Mockito.mock(AssignInventorySearchFilter.class);
		PowerMockito.when(schedulingWorkFlowService.getMemberDetails(assignInventorySearchFilter)).thenThrow(new ServiceException());
		schedulingWorkFlowController.getMemberDetails(assignInventorySearchFilter);
	}
	
	@Test
	public void testReleaseToQue() throws Exception {
		AppointmentInfo appointmentInfo = Mockito.mock(AppointmentInfo.class);
		schedulingWorkFlowController.releaseToQue(appointmentInfo);
	}
	@Test
	public void testReleaseToQue_() throws Exception {
		AppointmentInfo appointmentInfo = Mockito.mock(AppointmentInfo.class);
		PowerMockito.when(schedulingWorkFlowController.releaseToQue(appointmentInfo)).thenThrow(new ServiceException());
		schedulingWorkFlowController.releaseToQue(appointmentInfo);
	}
	
	@Test
	public void testGetApptComments() throws Exception {
		PowerMockito.when(schedulingWorkFlowController.getApptComments(1L)).thenThrow(new ServiceException());
		schedulingWorkFlowController.getApptComments(1L);
	}
	@Test
	public void testGetApptComments_() throws Exception {
		schedulingWorkFlowController.getApptComments(1L);
	}
	@Test
	public void testGetProviderDetailsByApptId() throws Exception {
		SchedulingSearchFilter schedulingSearchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(schedulingWorkFlowService.getProviderDetailsByApptId(schedulingSearchFilter)).thenReturn(null);
		schedulingWorkFlowController.getProviderDetailsByApptId(schedulingSearchFilter);
	}
	@Test
	public void testGetProviderDetailsByApptId_() throws Exception {
		SchedulingSearchFilter schedulingSearchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(schedulingWorkFlowService.getProviderDetailsByApptId(schedulingSearchFilter)).thenThrow(new ServiceException());
		schedulingWorkFlowController.getProviderDetailsByApptId(schedulingSearchFilter);
	}
	
	@Test
	public void testGetApptDetailsByApptId() throws Exception {
		GcmRetAppointment gcmRetAppointment = Mockito.mock(GcmRetAppointment.class);
		PowerMockito.when(schedulingWorkFlowService.getApptDetailsByApptId(gcmRetAppointment)).thenReturn(null);
		schedulingWorkFlowController.getApptDetailsByApptId(gcmRetAppointment);
	}	
	@Test
	public void testGetApptDetailsByApptId_() throws Exception {
		GcmRetAppointment gcmRetAppointment = Mockito.mock(GcmRetAppointment.class);
		PowerMockito.when(schedulingWorkFlowService.getApptDetailsByApptId(gcmRetAppointment)).thenThrow(new ServiceException());
		schedulingWorkFlowController.getApptDetailsByApptId(gcmRetAppointment);
	}	
	@Test
	public void testGetApptDetailsByChartId() throws Exception {
		GcmRetAppointment gcmRetAppointment = Mockito.mock(GcmRetAppointment.class);
		PowerMockito.when(schedulingWorkFlowService.getApptDetailsByChartID("test")).thenReturn(null);
		schedulingWorkFlowController.getApptDetailsByChartID(gcmRetAppointment); 
	}	
	@Test 
	public void testGetApptDetailsByChartId_() throws Exception {
		GcmRetAppointment gcmRetAppointment = Mockito.mock(GcmRetAppointment.class);
		PowerMockito.when(schedulingWorkFlowService.getApptDetailsByChartID("test")).thenThrow(new ServiceException());
		schedulingWorkFlowController.getApptDetailsByChartID(gcmRetAppointment);
	}	
	@Test
	public void testInsertApptComments() throws Exception {
		AppointmentComments appointmentComments = Mockito.mock(AppointmentComments.class);
		PowerMockito.when(schedulingWorkFlowService.insertApptComments(appointmentComments)).thenReturn(null);
		schedulingWorkFlowController.insertApptComments(appointmentComments);			
	}
	@Test
	public void testInsertApptComments_() throws Exception {
		AppointmentComments appointmentComments = Mockito.mock(AppointmentComments.class);
		PowerMockito.when(schedulingWorkFlowService.insertApptComments(appointmentComments)).thenThrow(new ServiceException());
		schedulingWorkFlowController.insertApptComments(appointmentComments);			
	}
	
	@Test
	public void testReleaseToAssignment() throws Exception {
		AppointmentInfo appointmentInfo = Mockito.mock(AppointmentInfo.class);
		schedulingWorkFlowController.releaseToAssignment(appointmentInfo);
	}
	
	@Test
	public void testChangeApptDateTime() throws Exception {
		AppointmentInfo appointmentInfo = Mockito.mock(AppointmentInfo.class);
		schedulingWorkFlowController.changeApptDateTime(appointmentInfo);
	}
	
	@Test
	public void testCancelAppointment() throws Exception {
		AppointmentInfo appointmentInfo = Mockito.mock(AppointmentInfo.class);
		schedulingWorkFlowController.cancelAppointment(appointmentInfo);
	}
	
	@Test
	public void testAddToExistingAppointment() throws Exception {
		AppointmentInfo appointmentInfo = Mockito.mock(AppointmentInfo.class);
		schedulingWorkFlowController.addToExistingAppointment(appointmentInfo);
	}
	
	@Test
	public void testUpdateWorkListProviderDetails() throws Exception {
		ProviderDetailsWrapper providerDetailsWrapper = Mockito.mock(ProviderDetailsWrapper.class);
		schedulingWorkFlowController.updateApptProviderDetails(providerDetailsWrapper);
	}
	@Test
	public void testUpdateWorkListProviderDetails_() throws Exception {
		ProviderDetailsWrapper providerDetailsWrapper = Mockito.mock(ProviderDetailsWrapper.class);
		schedulingWorkFlowController.updateApptProviderDetails(providerDetailsWrapper);
	}
	@Test
	public void testGetApptAttemptedDates() throws Exception {
		GcmRetAppointment gcmRetAppointment = Mockito.mock(GcmRetAppointment.class);
		PowerMockito.when(schedulingWorkFlowService.getApptAttemptedDates(gcmRetAppointment.getApptKey())).thenReturn(null);
		schedulingWorkFlowController.getApptAttemptedDates(gcmRetAppointment);
	}
	@Test
	public void testGetApptAttemptedDates_() throws Exception {
		GcmRetAppointment gcmRetAppointment = Mockito.mock(GcmRetAppointment.class);
		PowerMockito.when(schedulingWorkFlowService.getApptAttemptedDates(gcmRetAppointment.getApptKey())).thenThrow(new ServiceException());
		schedulingWorkFlowController.getApptAttemptedDates(gcmRetAppointment);
	}
}




