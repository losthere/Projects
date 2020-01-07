package com.optum.gcm.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.model.KeyValue;
import com.optum.gcm.model.GcmConfigInput;
import com.optum.gcm.model.OptumInventoryInput;
import com.optum.gcm.model.PendWorklistUpdate;
import com.optum.gcm.sevice.MasterDataService;

@RunWith(PowerMockRunner.class)
public class MasterDataControllerTest {

	@InjectMocks
	private MasterDataController masterDataController;

	@Mock
	private MasterDataService masterDataService;
	@Mock
	private OptumInventoryInput optInvInput;
	@Mock
	private GcmConfigInput gcmConfigInput;
	
	List<KeyValue<String, String>> out = new ArrayList<KeyValue<String, String>>();

	@Before
	public void setBeforeParameter() {
		KeyValue<String, String> key = new KeyValue<String, String>();
		key.setKey("TEST_KEY");
		key.setValue("TEST_VALUE");
		out.add(key);
	}

	@Test
	public void testGetBusinessSegments() throws Exception {
		PowerMockito.when(masterDataService.getBusinessSegments()).thenReturn(null);
		masterDataController.getBusinessSegments();
	}

	@Test
	public void testGetPrograms() throws Exception {
		PowerMockito.when(masterDataService.getProgramsByBusinessSegment("ACA")).thenReturn(null);
		masterDataController.getPrograms("ACA");
	}

	@Test
	public void testGetProjectYears() throws Exception {
		PowerMockito.when(masterDataService.getProjectYearsByBusSegAndProgram("ACA", 1L)).thenReturn(null);
		masterDataController.getProjectYears("ACA", 1L);
	}

	@Test
	public void testGetChartScore() throws Exception {
		PowerMockito.when(masterDataService.getChartScore()).thenReturn(null);
		masterDataController.getChartScore();
	}

	@Test
	public void testGetProvSpecCodes() throws Exception {
		PowerMockito.when(masterDataService.getProvSpecCodes()).thenReturn(null);
		masterDataController.getProvSpecCodes();
	}

	@Test
	public void testGetStates() throws Exception {
		PowerMockito.when(masterDataService.getStates()).thenReturn(null);
		masterDataController.getStates();
	}

	@Test
	public void testGetVendors() throws Exception {
		PowerMockito.when(masterDataService.getVendorsByFilter("ACA", 1L, 1L, 1L)).thenReturn(null);
		masterDataController.getVendors("ACA", 1L, 1L, 1L);
	}

	@Test
	public void testGetClients() throws Exception {
		PowerMockito.when(masterDataService.getClients(1L)).thenReturn(null);
		masterDataController.getClients(1L);
	}

	@Test
	public void testGetHealthPlans() throws Exception {
		PowerMockito.when(masterDataService.getHPByBusSegAndClient("ACA", 1L)).thenReturn(null);
		masterDataController.getHealthPlans("ACA", 1L);
	}

	@Test
	public void testGetHealthPlanProducts() throws Exception {
		PowerMockito.when(masterDataService.getHPProductByBusSegAndHP("ACA", 1L)).thenReturn(null);
		masterDataController.getHealthPlanProducts("ACA", 1L);
	}

	@Test
	public void testGetUsersByRoleCode() throws Exception {
		PendWorklistUpdate pendWorklistUpdate = Mockito.mock(PendWorklistUpdate.class);
		// PowerMockito.when(masterDataService.getUsersByRoleCode(pendWorklistUpdate.getRoleCodes(),pendWorklistUpdate.getLoginUserKey()).thenReturn(null);
		masterDataController.getUsersByRoleCode(pendWorklistUpdate);
	}

	@Test
	public void testGetUsersForSupervisor() throws Exception {
		PowerMockito.when(masterDataService.getUsersForSupervisor("123", "user", "456")).thenReturn(null);
		masterDataController.getUsersForSupervisor("123", "user", "456");
	}

	@Test
	public void testGetUsersCountBySupervisor() throws Exception {
		PowerMockito.when(masterDataService.getUsersCountBySupervisor("123", "user", "456", "111")).thenReturn(null);
		masterDataController.getUsersCountBySupervisor("123", "user", "456", "111");
	}

	@Test
	public void testGetProjects() throws Exception {
		PowerMockito.when(masterDataService.getProjects("ACA", 1L, 1L)).thenReturn(null);
		masterDataController.getProjects("ACA", 1L, 1L);
	}

	@Test
	public void testGetProjectsByUserKey() throws Exception {
		PowerMockito.when(masterDataService.getProjectsByUserKey(1L, 1L, "CLIENT", "", "", "")).thenReturn(null);
		masterDataController.getProjectsByUserKey(1L, 1L, "CLIENT", "", "", "");
	}

	@Test
	public void testGetProjectsByInvFilter() throws Exception {
		PowerMockito.when(masterDataService.getProjectsByInvFilter(optInvInput)).thenReturn(null);
		masterDataController.getProjectsByInvFilter(optInvInput);
	}

	@Test
	public void testGetProjectsByInvFilterForUtility() throws Exception {
		PowerMockito.when(masterDataService.getProjectsByInvFilterForUtility(optInvInput)).thenReturn(null);
		masterDataController.getProjectsByInvFilterForUtility(optInvInput);
	}

	@Test
	public void testGetStatuses() throws Exception {
		PowerMockito.when(masterDataService.getBusinessFunctionStatus(4L, "CLIENT",true)).thenReturn(null);
		String workFlow="Test";
		Boolean isUtility=true;
		masterDataController.getStatuses(workFlow, isUtility);
	}

	@Test
	public void testGetProviderDetails() throws Exception {
		PowerMockito.when(masterDataService.getProviderDetails(111L, "123", "user")).thenReturn(null);
		masterDataController.getProviderDetails(111L, "123", "user");
	}

	@Test
	public void testGetSupervisors() throws Exception {
		PowerMockito.when(masterDataService.getSupervisors(1L, 1L, 1L, "user")).thenReturn(null);
		masterDataController.getSupervisors(1L, 1L, 1L, "user");
	}

	@Test
	public void testGetSupervisorsByVendor() throws Exception {
		PowerMockito.when(masterDataService.getSupervisorsByVendor(1L, 1L, 1L, "user")).thenReturn(null);
		masterDataController.getSupervisorsByVendor(1L, 1L, 1L, "user");
	}

	@Test
	public void testGetRolesByGroupVendor() throws Exception {
		PowerMockito.when(masterDataService.getRolesByGroupVendor(1L, 1L, 1L, "user")).thenReturn(null);
		masterDataController.getRolesByGroupVendor(1L, 1L, 1L, "user");
	}

	@Test
	public void testReasonCodes() throws Exception {
		PowerMockito.when(masterDataService.getReasonCodes("test", 1L)).thenReturn(null);
		masterDataController.reasonCodes("test", 1L);
	}

	@Test
	public void testSegmentProjects() throws Exception {
		PowerMockito.when(masterDataService.segmentProjects(1L)).thenReturn(null);
		masterDataController.segmentProjects(1L);
	}

	@Test
	public void testGetRoles() throws Exception {
		PowerMockito.when(masterDataService.getRoles()).thenReturn(null);
		masterDataController.getRoles(1L);
	}

	@Test
	public void testGetBusSegByUserAssociation() throws Exception {
		PowerMockito.when(masterDataService.getBusSegByUserAssociation(1L)).thenReturn(null);
		masterDataController.getBusSegByUserAssociation(1L);
	}

	@Test
	public void testGetProgramsByUserAssociation() throws Exception {
		PowerMockito.when(masterDataService.getProgramsByUserAssociation("ACA", 1L)).thenReturn(null);
		masterDataController.getProgramsByUserAssociation("ACA", 1L);
	}

	@Test
	public void testGetVendorsByUserAssociation() throws Exception {
		PowerMockito.when(masterDataService.getVendorsByUserAssociation("ACA", 1L, 1L, 1L, 1L, 1L, "Test")).thenReturn(null);
		masterDataController.getVendorsByUserAssociation("ACA", 1L, 1L, 1L, 1L,1L,"Test");
	}
	
	@Test
	public void testGetVendorsAssignedByUser() throws Exception {
		PowerMockito.when(masterDataService.getVendorsAssignedByUser("ACA", 1L, 1L, 1L, 1L, 1L, "Test")).thenReturn(null);
		masterDataController.getVendorsAssignedByUser("ACA", 1L, 1L, 1L, 1L,1L,"Test");
	}
	
	@Test
	public void testGetVendorsForUserProfile() throws Exception {
		PowerMockito.when(masterDataService.getVendorsForUserProfile(1L, 1L)).thenReturn(null);
		masterDataController.getVendorsForUserProfile(1L, 1L);
	}

	@Test
	public void testgetVendorsByInvFilter() throws Exception {
		PowerMockito.when(masterDataService.getVendorsByInvFilter(optInvInput)).thenReturn(null);
		masterDataController.getVendorsByInvFilter(optInvInput);
	}
	
	@Test
	public void testgetVendorsByUserRole() throws Exception {
		PowerMockito.when(masterDataService.getVendorsByUserRole(1L, 3L, "test")).thenReturn(null);
		masterDataController.getVendorsByUserRole(1L, 3L, "test");
	}

	@Test
	public void testGetClientsByUserAssociation() throws Exception {
		PowerMockito.when(masterDataService.getClientsByUserAssociation(1L)).thenReturn(null);
		masterDataController.getClientsByUserAssociation(1L);
	}

	@Test
	public void testGetHealthPlansByUserAssociation() throws Exception {
		PowerMockito.when(masterDataService.getHealthPlansByUserAssociation("ACA", 1L, 1L)).thenReturn(null);
		masterDataController.getHealthPlansByUserAssociation("ACA", 1L, 1L);
	}

	@Test
	public void testGetHealthPlanProductsByUserAssociation() throws Exception {
		PowerMockito.when(masterDataService.getHealthPlanProductsByUserAssociation("ACA", 1L, 1L)).thenReturn(null);
		masterDataController.getHealthPlanProductsByUserAssociation("ACA", 1L, 1L);
	}
	
	@Test
	public void testIsBusFuncConfigured() throws Exception {
		PowerMockito.when(masterDataService.isBusFuncConfigured(gcmConfigInput)).thenReturn(out);
		masterDataController.isBusFuncConfigured(gcmConfigInput);
	}
	
	@Test
	public void testgetVendorListDetails() throws Exception {
		masterDataController.getVendorListDetails(7l, 7l, "Test", 7l);
	}
	
	@Test
	public void testgetBusinessFunctionDetails() throws Exception {
		masterDataController.getBusinessFunctionDetails();
	}
	
	@Test
	public void testisRetrievalConfigured() throws Exception {
		masterDataController.isRetrievalConfigured(1);
	}
	
	@Test
	public void testisServiceConfigured() throws Exception {
		masterDataController.isServiceConfigured("Test", 1);
	}
}