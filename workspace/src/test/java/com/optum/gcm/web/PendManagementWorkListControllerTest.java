package com.optum.gcm.web;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.exception.ServiceException;
import com.optum.gcm.model.AppointmentInfo;
import com.optum.gcm.model.GcmRetAppointment;
import com.optum.gcm.model.PendWorklistUpdate;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.sevice.PendManagementService;

@RunWith(PowerMockRunner.class)
public class PendManagementWorkListControllerTest {

	@InjectMocks
	private PendManagementWorkListController pendManagementWorkListController;

	@Mock
	private PendManagementService pendManagementService;

	@Mock
	private CommonJpaService commonJpaService;

	@Test
	public void testGetUnassignedInventoryforPendMgmt() throws Exception {
		SchedulingSearchFilter schedulingSearchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(pendManagementService.getUnassignedInventoryforPendMgmt(schedulingSearchFilter)).thenReturn(null);
		pendManagementWorkListController.getUnassignedInventoryforPendMgmt(schedulingSearchFilter);
	}
	@Test
	public void testGetUnassignedInventoryforPendMgmt_() throws Exception {
		SchedulingSearchFilter schedulingSearchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(pendManagementService.getUnassignedInventoryforPendMgmt(schedulingSearchFilter)).thenThrow(new ServiceException());
		pendManagementWorkListController.getUnassignedInventoryforPendMgmt(schedulingSearchFilter);
	}
	@Test 
	public void testUpdatePendWorkList() throws Exception {
		PendWorklistUpdate pendWorklistUpdate =new PendWorklistUpdate();
		List<Long> gcmRetApptIds=new ArrayList<>();
		gcmRetApptIds.add(5L);
		pendWorklistUpdate.setGcmRetApptIds(gcmRetApptIds);
		pendManagementWorkListController.updatePendWorkList(pendWorklistUpdate);
	}
	@SuppressWarnings("unchecked")
	@Test  
	public void testUpdatePendWorkList_() throws Exception {
		PendWorklistUpdate pendWorklistUpdate =new PendWorklistUpdate();
		List<Long> gcmRetApptIds=new ArrayList<>();
		gcmRetApptIds.add(5L);
		pendWorklistUpdate.setGcmRetApptIds(gcmRetApptIds);
		PowerMockito.when(pendManagementWorkListController.updatePendWorkList(pendWorklistUpdate)).thenThrow(Exception.class);
		pendManagementWorkListController.updatePendWorkList(pendWorklistUpdate);
	}
	@Test
	public void testUpdateChartStatus() throws Exception {
		AppointmentInfo appointmentInfo = Mockito.mock(AppointmentInfo.class);
		pendManagementWorkListController.updateChartStatus(appointmentInfo);
	}
	@Test
	public void testUpdateChartStatus_1() throws Exception {
		AppointmentInfo appointmentInfo = new AppointmentInfo();
		List<String> chartIdExclList=new ArrayList<>();
		chartIdExclList.add("TEST");
		chartIdExclList.add("TESTED");
		appointmentInfo.setRequestedUserId("NONRETRIEVABLE");
		appointmentInfo.setLoginUserKey("5L");
		GcmRetAppointment appt=new GcmRetAppointment();
		appt.setApptKey(0L);
		appointmentInfo.setAppt(appt);
		appointmentInfo.setRetMethod("TEST"); 
		appointmentInfo.setNoOfPendAttempts(5L);
		appointmentInfo.setChartIdExclList(chartIdExclList);
		pendManagementWorkListController.updateChartStatus(appointmentInfo);
	}
	@Test
	public void testUpdateChartStatus_2() throws Exception {
		AppointmentInfo appointmentInfo = new AppointmentInfo();
		List<String> chartIdList=new ArrayList<>();
		chartIdList.add("TEST");
		chartIdList.add("TESTED");
		appointmentInfo.setRequestedUserId("PEND RELEASED");
		appointmentInfo.setLoginUserKey("5L");
		GcmRetAppointment appt=new GcmRetAppointment();
		appt.setApptKey(0L);
		appointmentInfo.setAppt(appt);
		appointmentInfo.setRetMethod("TEST"); 
		appointmentInfo.setNoOfPendAttempts(5L);
		appointmentInfo.setChartIdList(chartIdList);
		pendManagementWorkListController.updateChartStatus(appointmentInfo);
	}
	@Test
	public void testUpdateChartStatus_() throws Exception {
		AppointmentInfo appointmentInfo = Mockito.mock(AppointmentInfo.class);
		PowerMockito.when(pendManagementWorkListController.updateChartStatus(appointmentInfo)).thenThrow(new ServiceException());
		pendManagementWorkListController.updateChartStatus(appointmentInfo);
	}
	
	
	@Test
	public void testUpdateApptStatus() throws Exception {
		AppointmentInfo appointmentInfo = new AppointmentInfo();
		List<String> chartIdExclList=new ArrayList<>();
		chartIdExclList.add("tet");
		chartIdExclList.add("teste");
		appointmentInfo.setRequestedUserId("NONRETRIEVABLE");
		appointmentInfo.setLoginUserKey("5L");
		appointmentInfo.setBusFuncDtlKey(5L);
		GcmRetAppointment appt=new GcmRetAppointment();
		appt.setApptKey(0L);
		appointmentInfo.setAppt(appt);
		appointmentInfo.setRetMethod(""); 
		appointmentInfo.setNoOfPendAttempts(5L);
		appointmentInfo.setChartIdExclList(chartIdExclList);
		pendManagementWorkListController.updateApptStatus(appointmentInfo);
	}
	@Test
	public void testUpdateApptStatus_1() throws Exception {
		AppointmentInfo appointmentInfo = new AppointmentInfo();
		appointmentInfo.setRequestedUserId("PEND RELEASED");
		appointmentInfo.setLoginUserKey("5L");
		appointmentInfo.setBusFuncDtlKey(5L);
		GcmRetAppointment appt=new GcmRetAppointment();
		appt.setApptKey(0L);
		appointmentInfo.setAppt(appt);
		appointmentInfo.setRetMethod(""); 
		appointmentInfo.setNoOfPendAttempts(5L);
		List<String> chartIdList=new ArrayList<>();
		chartIdList.add("TEST");
		chartIdList.add("TESTED");
		appointmentInfo.setChartIdList(chartIdList);
		pendManagementWorkListController.updateApptStatus(appointmentInfo);
	}
	@Test
	public void testUpdateApptStatus_() throws Exception {
		AppointmentInfo appointmentInfo = Mockito.mock(AppointmentInfo.class);
		PowerMockito.when(pendManagementWorkListController.updateApptStatus(appointmentInfo)).thenThrow(new ServiceException());
		pendManagementWorkListController.updateApptStatus(appointmentInfo);
	}
	
}




