package com.optum.gcm.sevice;

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
import com.optum.gcm.model.SchedulingSearchFilter;

@RunWith(PowerMockRunner.class)
public class PendManagementServiceTest {

	@InjectMocks
	protected PendManagementService pendManagementService;

	@Mock
	protected SchedulingSearchFilter schedulingSearchFilter;

	@Mock
	private CommonJpaService commonJpaService;

	@Mock
	private List<Long> gcmRetApptIds;

	@Mock
	private String requestedUser;

	private List<String> nonRetChartIds;

	@Test
	public void testGetUnassignedInventoryforPendMgmt() {
		SchedulingSearchFilter schedulingSearchFilter = new SchedulingSearchFilter();
		schedulingSearchFilter.setIsAssigned("1");
		schedulingSearchFilter.setFromUserKey(5L);
		schedulingSearchFilter.setAppointmentId(5L);
		PowerMockito.when(pendManagementService.getUnassignedInventoryforPendMgmt(schedulingSearchFilter))
				.thenReturn(null);
		pendManagementService.getUnassignedInventoryforPendMgmt(schedulingSearchFilter);
	}

	@Test
	public void testGetUnassignedInventoryforPendMgmt_() {
		SchedulingSearchFilter schedulingSearchFilter = new SchedulingSearchFilter();
		schedulingSearchFilter.setIsAssigned("0");
		schedulingSearchFilter.setFromUserKey(0L);
		PowerMockito.when(pendManagementService.getUnassignedInventoryforPendMgmt(schedulingSearchFilter))
				.thenReturn(null);
		pendManagementService.getUnassignedInventoryforPendMgmt(schedulingSearchFilter);
	}

	@Test
	public void testupdatePendWorkList() {
		pendManagementService.updatePendWorkList(gcmRetApptIds, 5L, 5L, "test");
	}

	@Test
	public void testupdatePendWorkList_() {
		pendManagementService.updatePendWorkList(gcmRetApptIds, null, 5L, "test");
	}

	@Test
	public void testupdateChartStatus() {
		String busStatus = "test";
		String requestedUserId = "test";
		String userKey = "test";
		Long busFuncDetailKey = 5L;
		Long apptId = 5L;
		String specialCategory = "test";
		String status = "test";
		Long noOfPendAttempts = 5L;
		pendManagementService.updateChartStatus(nonRetChartIds, busStatus, requestedUserId, userKey, busFuncDetailKey,
				apptId, specialCategory, status, noOfPendAttempts);
	}

	@Test
	public void testupdateChartStatus1() {
		String busStatus = "test";
		String requestedUserId = "test";
		String userKey = "test";
		Long busFuncDetailKey = 0L;
		Long apptId = 5L;
		String specialCategory = "test";
		String status = "test";
		Long noOfPendAttempts = 5L;
		pendManagementService.updateChartStatus(nonRetChartIds, busStatus, requestedUserId, userKey, busFuncDetailKey,
				apptId, specialCategory, status, noOfPendAttempts);
	}

	@Test
	public void testupdateChartStatus2() {
		String busStatus = "test";
		String requestedUserId = "test";
		String userKey = "test";
		Long busFuncDetailKey = 0L;
		Long apptId = 5L;
		String specialCategory = "test";
		String status = "TEdst";
		Long noOfPendAttempts = 5L;
		pendManagementService.updateChartStatus(nonRetChartIds, busStatus, requestedUserId, userKey, busFuncDetailKey,
				apptId, specialCategory, status, noOfPendAttempts);
	}

	//@Test
	public void testupdateChartStatus3() throws Exception {
		String busStatus = "test";
		String requestedUserId = "test";
		String userKey = "test";
		Long busFuncDetailKey = 0L;
		Long apptId = 0L;
		String specialCategory = "test";
		String status = "";
		Long noOfPendAttempts = 5L;
		List<Long> results = new ArrayList<>();
		results.add(2L);
		//PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(), Mockito.any()))
	//			.thenReturn(results);
		pendManagementService.updateChartStatus(nonRetChartIds, busStatus, requestedUserId, userKey, busFuncDetailKey,
				apptId, specialCategory, status, noOfPendAttempts);
	}

	//@Test
	public void testupdateChartStatus3_null() throws Exception {
		String busStatus = "test";
		String requestedUserId = "test";
		String userKey = "test";
		Long busFuncDetailKey = 0L;
		Long apptId = 0L;
		String specialCategory = "test";
		String status = "";
		Long noOfPendAttempts = 5L;
		List<Long> results = new ArrayList<>();
		results.add(0L);
	//	PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(), Mockito.any()))
	//			.thenReturn(results);
		pendManagementService.updateChartStatus(nonRetChartIds, busStatus, requestedUserId, userKey, busFuncDetailKey,
				apptId, specialCategory, status, noOfPendAttempts);
	}

}
