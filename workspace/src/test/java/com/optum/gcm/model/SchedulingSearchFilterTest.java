package com.optum.gcm.model;


import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

import com.fasterxml.jackson.databind.Module.SetupContext;



public class SchedulingSearchFilterTest {

	
	SchedulingSearchFilter schedulingSearchFilter;

	@Before
	public void setUp() throws Exception{
		schedulingSearchFilter = new SchedulingSearchFilter();
	}
	
	@Test
	public void testsetBusSegment() {
		schedulingSearchFilter.setBusSegment("test");
	}
	@Test
	public void testgetBusSegment() {
		schedulingSearchFilter.getBusSegment();
	}

	

	@Test
	public void testgetProgramKey() {
		schedulingSearchFilter.getProgramKey();
	}

	@Test
	public void testsetProgramKey() {
		schedulingSearchFilter.setProgramKey(2L);
	}

	@Test
	public void testgetProjectName() {
		schedulingSearchFilter.getProjectName();
	}

	@Test
	public void testsetProjectName() {
		schedulingSearchFilter.setProjectName("2L");
	}

	@Test
	public void testgetProjectKey() {
		schedulingSearchFilter.getProjectKey();
	}

	@Test
	public void testsetProjectKey() {
		schedulingSearchFilter.setProjectKey(2L);
	}

	@Test
	public void testgetProjYear() {
		schedulingSearchFilter.getProjYear();
	}

	@Test
	public void testsetProjYear() {
		schedulingSearchFilter.setProjYear(2L);
	}

	@Test
	public void testgetProjContKey() {
		schedulingSearchFilter.getProjContKey();
	}

	@Test
	public void testsetProjContKey() {
		schedulingSearchFilter.setProjContKey(2L);
	}

	@Test
	public void testgetClientKey() {
		schedulingSearchFilter.getClientKey();
	}

	@Test
	public void testsetClientKey() {
		schedulingSearchFilter.setClientKey(5L);
	}

	@Test
	public void testgetHpKey() {
		schedulingSearchFilter.getHpKey();
	}

	@Test
	public void testsetHpKey() {
		schedulingSearchFilter.setHpKey(8L);
	}

	@Test
	public void testgetHpProduct() {
		schedulingSearchFilter.getHpProduct();
	}

	@Test
	public void testsetHpProduct() {
		schedulingSearchFilter.setHpProduct("2L");
	}

	@Test
	public void testgetStatus() {
		schedulingSearchFilter.getStatus();
	}

	@Test
	public void testsetStatus() {
		schedulingSearchFilter.setStatus("2L");
	}

	@Test
	public void testgetProviderId() {
		schedulingSearchFilter.getProviderId();
	}

	@Test
	public void testsetProviderId() {
		schedulingSearchFilter.setProviderId("2L");
	}

	@Test
	public void testgetProviderGroup() {
		schedulingSearchFilter.getProviderGroup();
	}

	@Test
	public void testsetProviderGroup() {
		schedulingSearchFilter.setProviderGroup("2L");
	}

	@Test
	public void testgetIsAssigned() {
		schedulingSearchFilter.getIsAssigned();
	}

	@Test
	public void testsetIsAssigned() {
		schedulingSearchFilter.setIsAssigned("2L");
	}

	@Test
	public void testgetRequestedUser() {
		schedulingSearchFilter.getRequestedUser();
	}

	@Test
	public void testsetRequestedUser() {
		schedulingSearchFilter.setRequestedUser("2L");
	}

	@Test
	public void testgetIsOffshoreCoding() {
		schedulingSearchFilter.getIsOffshoreCoding();
	}

	@Test
	public void testsetIsOffshoreCoding() {
		schedulingSearchFilter.setIsOffshoreCoding("2L");
	}

	@Test
	public void testgetVendorKey() {
		schedulingSearchFilter.getVendorKey();
	}

	@Test
	public void testsetVendorKey() {
		schedulingSearchFilter.setVendorKey(2L);
	}

	@Test
	public void testgetFromUserKey() {
		schedulingSearchFilter.getFromUserKey();
	}

	@Test
	public void testsetFromUserKey() {
		schedulingSearchFilter.setFromUserKey(2L);
	}

	@Test
	public void testgetToUserKey() {
		schedulingSearchFilter.getToUserKey();
	}

	@Test
	public void testsetToUserKey() {
		schedulingSearchFilter.setToUserKey(2L);
	}

	@Test
	public void testgetGroupKey() {
		schedulingSearchFilter.getGroupKey();
	}

	@Test
	public void testsetGroupKey() {
		schedulingSearchFilter.setGroupKey(2L);
	}

	@Test
	public void testgetRecordCount() {
		schedulingSearchFilter.getRecordCount();
	}

	@Test
	public void testsetRecordCount() {
		schedulingSearchFilter.setRecordCount(5L);
	}

	@Test
	public void testgetProvGroupName() {
		schedulingSearchFilter.getProvGroupName();
	}

	@Test
	public void testsetProvGroupName() {
		schedulingSearchFilter.setProvGroupName("2L");
	}

	@Test
	public void testgetProvLastName() {
		schedulingSearchFilter.getProvLastName();
	}

	@Test
	public void testsetProvLastName() {
		schedulingSearchFilter.setProvLastName("2L");
	}

	@Test
	public void testgetProvFirstName() {
		schedulingSearchFilter.getProvFirstName();
	}

	@Test
	public void testsetProvFirstName() {
		schedulingSearchFilter.setProvFirstName("2L");
	}

	@Test
	public void testgetAppointmentId() {
		schedulingSearchFilter.getAppointmentId();
	}

	@Test
	public void testsetAppointmentId() {
		schedulingSearchFilter.setAppointmentId(5L);
	}

	@Test
	public void testgetSpecialCategory() {
		schedulingSearchFilter.getSpecialCategory();
	}

	@Test
	public void testsetSpecialCategory() {
		schedulingSearchFilter.setSpecialCategory("2L");
	}

	@Test
	public void testgetLoginUserId() {
		schedulingSearchFilter.getLoginUserId();
	}

	@Test
	public void testsetLoginUserId() {
		schedulingSearchFilter.setLoginUserId("2L");
	}

	@Test
	public void testgetLoginUserKey() {
		schedulingSearchFilter.getLoginUserKey();
	}

	@Test
	public void testsetLoginUserKey() {
		schedulingSearchFilter.setLoginUserKey(5L);
	}

	@Test
	public void testgetCodingUserKey() {
		schedulingSearchFilter.getCodingUserKey();
	}

	@Test
	public void testsetCodingUserKey() {
		schedulingSearchFilter.setCodingUserKey(5L);
	}

	@Test
	public void testgetBusFuncKey() {
		schedulingSearchFilter.getBusFuncKey();
	}

	@Test
	public void testsetBusFuncKey() {
		schedulingSearchFilter.setBusFuncKey(5L);
	}

	@Test
	public void testgetBusFuncVenKey() {
		schedulingSearchFilter.getBusFuncVenKey();
	}

	@Test
	public void testsetBusFuncVenKey() {
		schedulingSearchFilter.setBusFuncVenKey(2L);
	}

	@Test
	public void testgetBusFuncDtlKey() {
		schedulingSearchFilter.getBusFuncDtlKey();
	}

	@Test
	public void testsetBusFuncDtlKey() {
		schedulingSearchFilter.setBusFuncDtlKey(5L);
	}

	@Test
	public void testgetIsCompleted() {
		schedulingSearchFilter.getIsCompleted();
	}

	@Test
	public void testsetIsCompleted() {
		schedulingSearchFilter.setIsCompleted("2L");
	}

	@Test
	public void testgetAcceptedFromDate() {
		schedulingSearchFilter.getAcceptedFromDate();
	}

	@Test
	public void testsetAcceptedFromDate() {
		schedulingSearchFilter.setAcceptedFromDate("2L");
	}

	@Test
	public void testgetAcceptedToDate() {
		schedulingSearchFilter.getAcceptedToDate();
	}

	@Test
	public void testsetAcceptedToDate() {
		schedulingSearchFilter.setAcceptedToDate("2L");
	}

	@Test
	public void testtoString() {
		schedulingSearchFilter.toString();
	}

	@Test
	public void testgetAppointmentStatus() {
		schedulingSearchFilter.getAppointmentStatus();
	}

	@Test
	public void testsetAppointmentStatus() {
		schedulingSearchFilter.setAppointmentStatus("2L");
	}

	@Test
	public void testgetFaxStatus() {
		schedulingSearchFilter.getFaxStatus();
	}

	@Test
	public void testsetFaxStatus() {
		schedulingSearchFilter.setFaxStatus("2L");
	}

	@Test
	public void testgetChartId() {
		schedulingSearchFilter.getChartId();
	}

	@Test
	public void testsetChartId() {
		schedulingSearchFilter.setChartId("2L");
	}

	@Test
	public void testgetRoleCode() {
		schedulingSearchFilter.getRoleCode();
	}

	@Test
	public void testsetRoleCode() {
		schedulingSearchFilter.setRoleCode("2L");
	}

	@Test
	public void testgetProvSplCode() {
		schedulingSearchFilter.getProvSplCode();
	}

	@Test
	public void testsetProvSplCode() {
		schedulingSearchFilter.setProvSplCode("2L");
	}

	@Test
	public void testgetChartScoreGrp() {
		schedulingSearchFilter.getChartScoreGrp();
	}

	@Test
	public void testsetChartScoreGrp() {
		schedulingSearchFilter.setChartScoreGrp("2L");
	}

	@Test
	public void testgetEmr() {
		schedulingSearchFilter.getEmr();
	}

	@Test
	public void testsetEmr() {
		schedulingSearchFilter.setEmr("2L");
	}

	@Test
	public void testgetFromVendorKey() {
		schedulingSearchFilter.getFromVendorKey();
	}

	@Test
	public void testsetFromVendorKey() {
		schedulingSearchFilter.setFromVendorKey(2L);
	}

	@Test
	public void testgetNoOfPendAttempts() {
		schedulingSearchFilter.getNoOfPendAttempts();
	}

	@Test
	public void testsetNoOfPendAttempts() {
		schedulingSearchFilter.setNoOfPendAttempts(2L);
	}
	@Test
	public void testgetPercentage() {
		schedulingSearchFilter.getPercentage();
	}

	@Test
	public void testsetPercentage() {
		schedulingSearchFilter.setPercentage(2L);
	}

}
