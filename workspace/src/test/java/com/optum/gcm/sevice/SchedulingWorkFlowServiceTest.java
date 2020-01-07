

package com.optum.gcm.sevice;


import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.dao.EmptyResultDataAccessException;

import com.optum.gcm.common.dao.CommonJpaDao;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.AppointmentComments;
import com.optum.gcm.model.AppointmentInfo;
import com.optum.gcm.model.AppointmentSearchFilter;
import com.optum.gcm.model.AssignInventorySearchFilter;
import com.optum.gcm.model.ExistingAppointment;
import com.optum.gcm.model.GcmRetAppointment;
import com.optum.gcm.model.GcmRetApptComments;
import com.optum.gcm.model.ProviderDetails;
import com.optum.gcm.model.ProviderDetailsWrapper;
import com.optum.gcm.model.SchedulingInventory;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.SchedulingSearchFilterWrapper;

import com.optum.gcm.sevice.SchedulingWorkFlowService;

@RunWith(PowerMockRunner.class)
public class SchedulingWorkFlowServiceTest {

	@InjectMocks
	protected SchedulingWorkFlowService schedulingWorkFlowService;

	@Mock
	protected SchedulingSearchFilter searchFilter;
	@Mock
	protected AppointmentSearchFilter appointmentSearchFilter;
	@Mock
	protected GcmRetAppointment gcmRetAppointment;
	@Mock
	protected SchedulingSearchFilterWrapper wrapper;
	@Mock
	protected AppointmentInfo appointmentInfo;
	@Mock
	protected AppointmentComments comments;
	@Mock
	protected ProviderDetailsWrapper providerDetailsWrapper;
	@Mock
	private CommonJpaService commonJpaService;
	@Mock
	private CommonJpaDao commonJpaDao;

	@SuppressWarnings("unchecked")
	@Test
	public void testGetExistingAppts() throws Exception {
		List<ExistingAppointment> value=new ArrayList<>();
		ExistingAppointment e=new ExistingAppointment();
		value.add(e);
		List value1=new ArrayList<>();
		PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(),Mockito.any())).thenReturn(value1);
		AppointmentSearchFilter appointmentSearchFilter=new AppointmentSearchFilter();
		appointmentSearchFilter.setGroupKey(5L);
		appointmentSearchFilter.setVendorKey(5L);
		appointmentSearchFilter.setAddr1("TEST");
		appointmentSearchFilter.setCity("TEST");
		appointmentSearchFilter.setState("TEST");
		appointmentSearchFilter.setZip("TEST");
		appointmentSearchFilter.setPhone("TEST");
		appointmentSearchFilter.setFax("TEST");
		schedulingWorkFlowService.getExistingAppts(appointmentSearchFilter);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void TestgetApptDetailsByApptId() {
		GcmRetAppointment result=new GcmRetAppointment();
		@SuppressWarnings("deprecation")
		Timestamp apptDateTime=new Timestamp(1, 5, 5, 9, 8, 4, 8);
		result.setApptDateTime(apptDateTime);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn(result);
		schedulingWorkFlowService.getApptDetailsByApptId(gcmRetAppointment);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void TestgetApptDetailsByApptId_() {
		GcmRetAppointment result=new GcmRetAppointment();
		@SuppressWarnings("deprecation")
		Timestamp apptDateTime=null;
		result.setApptDateTime(apptDateTime);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn(result);
		PowerMockito.when(schedulingWorkFlowService.getApptDetailsByApptId(gcmRetAppointment)).thenThrow(EmptyResultDataAccessException.class);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void TestgetApptDetailsByChartID() {
		GcmRetAppointment result=new GcmRetAppointment();
		@SuppressWarnings("deprecation")
		Timestamp apptDateTime=null;
		result.setApptDateTime(apptDateTime);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn(result);
		PowerMockito.when(schedulingWorkFlowService.getApptDetailsByChartID("Test")).thenThrow(EmptyResultDataAccessException.class);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void TestgetApptDetailsByChartID_() {
		GcmRetAppointment result=new GcmRetAppointment();
		@SuppressWarnings("deprecation")
		Timestamp apptDateTime=new Timestamp(1, 5, 5, 9, 8, 4, 8);
		result.setApptDateTime(apptDateTime);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn(result);
		PowerMockito.when(schedulingWorkFlowService.getApptDetailsByChartID("Test")).thenThrow(EmptyResultDataAccessException.class);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void TestgetChartMemberDetails() {
		 SchedulingSearchFilterWrapper wrapper=new SchedulingSearchFilterWrapper();
		 SchedulingSearchFilter schedulingSearchFilter=new SchedulingSearchFilter();
		 schedulingSearchFilter.setLoginUserKey(4L);
		 schedulingSearchFilter.setAppointmentId(5L);
		 List<AssignInventorySearchFilter> assignInventorySearchFilter=new ArrayList<>();
		 AssignInventorySearchFilter e=new AssignInventorySearchFilter();
		assignInventorySearchFilter.add(e);
		wrapper.setAssignInventorySearchFilter(assignInventorySearchFilter);
		wrapper.setSchedulingSearchFilter(schedulingSearchFilter);
		schedulingWorkFlowService.getChartMemberDetails(wrapper);
	}
	@Test
	public void TestgetChartMemberDetailsByApptId() {
		SchedulingSearchFilterWrapper filter=new SchedulingSearchFilterWrapper();
		SchedulingSearchFilter schedulingSearchFilter=new SchedulingSearchFilter();
		schedulingSearchFilter.setRoleCode("PDM");
		schedulingSearchFilter.setNoOfPendAttempts(4L);
		schedulingSearchFilter.setAppointmentId(5L);
		schedulingSearchFilter.setLoginUserKey(2L);
		filter.setSchedulingSearchFilter(schedulingSearchFilter);
		schedulingWorkFlowService.getChartMemberDetailsByApptId(filter);
	}
	@Test
	public void TestgetChartMemberDetailsByApptId_() {
		SchedulingSearchFilterWrapper filter=new SchedulingSearchFilterWrapper();
		SchedulingSearchFilter schedulingSearchFilter=new SchedulingSearchFilter();
		schedulingSearchFilter.setRoleCode("PDMO");
		schedulingSearchFilter.setNoOfPendAttempts(4L);
		schedulingSearchFilter.setAppointmentId(5L);
		schedulingSearchFilter.setLoginUserKey(0L);
		filter.setSchedulingSearchFilter(schedulingSearchFilter);
		schedulingWorkFlowService.getChartMemberDetailsByApptId(filter);
	}
	@Test
	public void TestgetChartStatusCountByUser() throws SQLException {
		SchedulingSearchFilter schedulingSearchFilter=new SchedulingSearchFilter();
		schedulingWorkFlowService.getChartStatusCountByUser(schedulingSearchFilter);
	}
	@Test
	public void TestgetProviderDetailsByApptId() throws SQLException {
		SchedulingSearchFilter schedulingSearchFilter=new SchedulingSearchFilter();
		schedulingWorkFlowService.getProviderDetailsByApptId(schedulingSearchFilter);
	}
	@Test
	public void TestgetApptComments() throws SQLException {
		schedulingWorkFlowService.getApptComments(5L);
	}
	@Test
	public void TestgetMemberDetails() throws SQLException {
		AssignInventorySearchFilter filter=new AssignInventorySearchFilter();
		filter.setApptKey(5L);
		schedulingWorkFlowService.getMemberDetails(filter);
	}
	@Test
	public void TestconfirmAppointment() throws SQLException, ParseException {
		AppointmentInfo appt=new AppointmentInfo();
		GcmRetAppointment appts=new GcmRetAppointment();
		appts.setApptKey(5L);
		appt.setAppt(appts);
		appts.setUiApptDate("07-08-1997  02:05:12");
		appts.setFirstName("TEst");
		appts.setLastName("TESTED");
		appts.setAddress1("HYD");
		appts.setAddress2("IND");
		appts.setCity("GACH");
		appts.setState("AP");
		appts.setPhoneNum("777799999997");
		appts.setZip("522005");
		appts.setEmail("optum@optum.com");
		appts.setApptStatus("PEND");
		List<AssignInventorySearchFilter> assignInventorySearchFilter=new ArrayList<>();
		AssignInventorySearchFilter e=new AssignInventorySearchFilter();
		assignInventorySearchFilter.add(e);
		appt.setAssignInventorySearchFilter(assignInventorySearchFilter);
		schedulingWorkFlowService.confirmAppointment(appt);
	}
	@Test
	public void TestconfirmAppointment_() throws SQLException, ParseException {
		AppointmentInfo appt=new AppointmentInfo();
		GcmRetAppointment appts=new GcmRetAppointment();
		appts.setApptKey(5L);
		appt.setAppt(appts);
		appts.setUiApptDate(null);
		appts.setFirstName("TEst");
		appts.setLastName("TESTED");
		appts.setAddress1("HYD");
		appts.setAddress2(null);
		appts.setCity("GACH");
		appts.setState("AP");
		appts.setPhoneNum("777799999997");
		appts.setZip("522005");
		appts.setEmail(null);
		appts.setApptStatus("TEST");
		List<AssignInventorySearchFilter> assignInventorySearchFilter=new ArrayList<>();
		AssignInventorySearchFilter e=new AssignInventorySearchFilter();
		assignInventorySearchFilter.add(e);
		appt.setAssignInventorySearchFilter(assignInventorySearchFilter);
		schedulingWorkFlowService.confirmAppointment(appt);
	}
	@Test
	public void TestinsertApptComments() throws SQLException {
		AppointmentComments comments=new AppointmentComments();
		comments.setApptComments("");
		GcmRetApptComments comm = new GcmRetApptComments();
		java.util.Date date = new Date();
		java.sql.Timestamp timestampdate = new java.sql.Timestamp(date.getTime());
		schedulingWorkFlowService.insertApptComments(comments);
	}
	@Test
	public void TestreleaseToQue() throws SQLException {
		
		AppointmentInfo info=new AppointmentInfo();
		List<String> chartIdList=new ArrayList<>();
		chartIdList.add("TEST");
		chartIdList.add("TESTED");
		info.setChartIdList(chartIdList);
		GcmRetAppointment appt=new GcmRetAppointment();
		appt.setApptKey(5L);
		info.setAppt(appt);
		schedulingWorkFlowService.releaseToQue(info);
	}
	@Test
	public void TestcreateAppointment() throws SQLException, ParseException {
		GcmRetAppointment appt=new GcmRetAppointment();
		appt.setFirstName("TEst");
		appt.setMiddleName("TEST");
		appt.setLastName("TEst");
		appt.setAddress1("HYD");
		appt.setAddress2("Gnt");
		appt.setState("TEST");
		appt.setCity("TEST");
		appt.setEmail("OPTUM");
		appt.setApptType("TEST");
		appt.setUiApptDate("07-08-1997 2:5:12");
		appt.setApptType("FAX");
		appt.setApptStatus("PEND");
		schedulingWorkFlowService.createAppointment(appt);
	}
	@Test
	public void TestupdateRetWIStatusWithAppt() throws SQLException {
		AppointmentInfo appt=new AppointmentInfo();

		boolean isFromNewAppt = false;
		boolean isFromAddToExistingAppt=true;
		appt.setPendReasonCode("TEST");
		appt.setPendReasonComment("TEST");
		List<String> chartIdList=new ArrayList<>();
		chartIdList.add("TEST");
		chartIdList.add("TESTeed");
		appt.setChartIdList(chartIdList);
		GcmRetAppointment appts=new GcmRetAppointment();
		appt.setAppt(appts);
		appts.setApptType("FAX");
		appt.setFaxAllMembers(false);
		appts.setApptStatus("SCHEDULED");
		List<String> chartIdExclList=new ArrayList<>();
		chartIdExclList.add("TEST");
		chartIdExclList.add("TESTED");
		appt.setChartIdExclList(chartIdExclList);
		List<String> nonSelectionChartList = new ArrayList<>();
		nonSelectionChartList.add("TESTED");
		nonSelectionChartList.add("TEST");
		appts.setApptStatus("PEND");
		schedulingWorkFlowService.updateRetWIStatusWithAppt(appt, nonSelectionChartList, isFromNewAppt, isFromAddToExistingAppt);
	}
	@Test
	public void TestupdateRetWIStatusWithAppt_() throws SQLException {
		AppointmentInfo appt=new AppointmentInfo();

		boolean isFromNewAppt = false;
		boolean isFromAddToExistingAppt=true;
		appt.setPendReasonCode("TEST");
		appt.setPendReasonComment("TEST");
		List<String> chartIdList=new ArrayList<>();
		chartIdList.add("TEST");
		appt.setChartIdList(chartIdList);
		GcmRetAppointment appts=new GcmRetAppointment();
		appt.setAppt(appts);
		appts.setApptType("FAX");
		appt.setFaxAllMembers(false);
		appts.setApptStatus("SCHEDULEDDD");
		List<String> chartIdExclList=new ArrayList<>();
		chartIdExclList.add("TEST");
		appt.setChartIdExclList(chartIdExclList);
		List<String> nonSelectionChartList = new ArrayList<>();
		nonSelectionChartList.add("TESTED");
		appts.setApptStatus("PENDING");
		schedulingWorkFlowService.updateRetWIStatusWithAppt(appt, nonSelectionChartList, isFromNewAppt, isFromAddToExistingAppt);
	}
	@Test
	public void TestupdateFaxStatusByApptId() {
		schedulingWorkFlowService.updateFaxStatusByApptId(4L,"TEST");
	}
	@Test
	public void TestupdateRetWIRelToAssn() throws SQLException {
		AppointmentInfo appt=new AppointmentInfo();
		List<String> chartIdList=new ArrayList<>();
		chartIdList.add("TEST");
		chartIdList.add("TESTED");
		appt.setChartIdList(chartIdList);
		schedulingWorkFlowService.updateRetWIRelToAssn(appt);
	}
	/*@Test
	public void testreleaseToAssignment() throws SQLException {
		AppointmentInfo info=new AppointmentInfo();
		schedulingWorkFlowService.releaseToAssignment(info);
	}*/
	@Test
	public void testgetApptAttemptedDates() throws SQLException {
		schedulingWorkFlowService.getApptAttemptedDates(5L);
	}
	@Test
	public void testchangeAppointmentDateAndTime() throws SQLException, ParseException {
		AppointmentInfo appt=new AppointmentInfo();
		GcmRetAppointment appts=new GcmRetAppointment();
		appts.setApptKey(5L);
		appt.setAppt(appts);
		schedulingWorkFlowService.changeAppointmentDateAndTime(appt);
	}
	@Test
	public void testcancelAppointment() throws SQLException {
		AppointmentInfo appt=new AppointmentInfo();
		GcmRetAppointment appts=new GcmRetAppointment();
		appts.setApptKey(5L);
		appt.setAppt(appts);
		schedulingWorkFlowService.cancelAppointment(appt);
	}
	@Test
	public void testcancelAppointment_() throws SQLException {
		GcmRetAppointment appts=new GcmRetAppointment();
		appts.setApptKey(5L);
		List<String> chartIdList=new ArrayList<>();
		AppointmentInfo appt=new AppointmentInfo();
		appt.setAppt(appts);
		chartIdList.add("TEST");
		appt.setChartIdList(chartIdList);
		schedulingWorkFlowService.cancelAppointment(appt);
	}
	@Test
	public void testupdateWorkListProviderAddressDetails() throws Exception {
		ProviderDetailsWrapper providerDetailsWrapper=new ProviderDetailsWrapper();
		List<ProviderDetails> providerDetails=new ArrayList<>();
		ProviderDetails e=new ProviderDetails();
		providerDetails.add(e);
		providerDetailsWrapper.setProviderDetails(providerDetails);
		SchedulingSearchFilter schedulingSearchFilter=new SchedulingSearchFilter();
		providerDetailsWrapper.setSchedulingSearchFilter(schedulingSearchFilter);
		SchedulingInventory schedulingInventory=new SchedulingInventory();
		schedulingInventory.setProvName("TEST");
		schedulingInventory.setProvLocation("CANADA");
		schedulingInventory.setProvFax("FAX");
		schedulingInventory.setSpecialNotes("NOTE");
		schedulingInventory.setSpecialCategory("Cotegory");
		e.setSchedulingInventory(schedulingInventory);
		schedulingWorkFlowService.updateWorkListProviderAddressDetails(providerDetailsWrapper);
	}
	@Test
	public void testaddToExistingAppointment() throws SQLException, ParseException {
		AppointmentInfo appt=new AppointmentInfo();
		GcmRetAppointment appts=new GcmRetAppointment();
		appts.setApptKey(5L);
		appt.setAppt(appts);
		List<String> chartIdList=new ArrayList<>();
		chartIdList.add("TEST");
		chartIdList.add("TESTED");
		appt.setChartIdList(chartIdList);
		schedulingWorkFlowService.addToExistingAppointment(appt);
	}
}