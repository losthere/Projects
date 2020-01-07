
package com.optum.gcm.sevice;


import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.jdbc.core.SqlParameter;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.common.sevice.StoredProcedureService;
import com.optum.gcm.model.Pagination;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.StatusUpdateInfo;

import com.optum.gcm.sevice.CodingWorkListService;
import com.optum.gcm.web.RetrievalActionsController;

@RunWith(PowerMockRunner.class)
public class CodingWorkListServiceTest {

	@InjectMocks
	protected CodingWorkListService codingWorkListService;

	@Mock
	private static final List<String> List = new ArrayList<String>();
	@Mock
	public CommonJpaService commonJpaService;
	@Mock
	public StoredProcedureService storedProcedureService;
	@Mock
	private SchedulingSearchFilter searchFilter;
	@Mock
	private StatusUpdateInfo statusUpdateInfo;
	@Mock
	private SqlParameter P_OUT_STATUS;

	@SuppressWarnings("unchecked")
	@Test
	public void testGetMyCodingWorklist() throws SQLException, ParseException {
		SchedulingSearchFilter searchFilter = new SchedulingSearchFilter();
		Map<String, Object> params = new HashMap<>();
		searchFilter.setIsAssigned("2");
		searchFilter.getIsAssigned();
		searchFilter.setStatus("1");
		searchFilter.getStatus();
		searchFilter.setAcceptedFromDate("09-08-1997");
		searchFilter.getAcceptedFromDate();
		searchFilter.setAcceptedToDate("09-08-1997");
		searchFilter.getAcceptedToDate();
		@SuppressWarnings("rawtypes")
		Class resultType = RetrievalActionsController.class;
		Pagination pagination = new Pagination();
		commonJpaService.getResultList("test", params, resultType, pagination);
		new SimpleDateFormat("MM-dd-yyyy").parse(searchFilter.getAcceptedToDate());
		new SimpleDateFormat("MM-dd-yyyy").parse(searchFilter.getAcceptedFromDate());
		codingWorkListService.getMyCodingWorklist(searchFilter);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testGetMyCodingWorklist_2() throws SQLException, ParseException {
		SchedulingSearchFilter searchFilter = new SchedulingSearchFilter();
		Map<String, Object> params = new HashMap<>();
		searchFilter.setIsAssigned("2"); 
		searchFilter.getIsAssigned();
		searchFilter.setStatus("2");
		searchFilter.getStatus();
		searchFilter.setAcceptedFromDate("09-08-1997");
		searchFilter.getAcceptedFromDate();
		searchFilter.setAcceptedToDate("MM-dd-yyyy");
		searchFilter.getAcceptedToDate();
		@SuppressWarnings("rawtypes")
		Class resultType = RetrievalActionsController.class;
		Pagination pagination = new Pagination();
		commonJpaService.getResultList("test", params, resultType, pagination);
		new SimpleDateFormat("MM-dd-yyyy").parse(searchFilter.getAcceptedFromDate());
		codingWorkListService.getMyCodingWorklist(searchFilter);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testGetMyCodingWorklist_() throws SQLException {
		SchedulingSearchFilter searchFilter = new SchedulingSearchFilter();
		Map<String, Object> params = new HashMap<>();
		searchFilter.setIsAssigned(null);
		searchFilter.setStatus("1");
		searchFilter.getStatus();
		searchFilter.setAcceptedFromDate("MM-dd-yyyy");
		searchFilter.getAcceptedFromDate();
		searchFilter.setAcceptedToDate("MM-dd-yyyy");
		searchFilter.getAcceptedToDate();
		@SuppressWarnings("rawtypes")
		Class resultType = RetrievalActionsController.class;
		Pagination pagination = new Pagination();
		commonJpaService.getResultList("test", params, resultType, pagination);
		codingWorkListService.getMyCodingWorklist(null);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testGetMyCodingWorklist_3() throws SQLException {
		SchedulingSearchFilter searchFilter = new SchedulingSearchFilter();
		Map<String, Object> params = new HashMap<>();
		searchFilter.setIsAssigned(null);
		searchFilter.setStatus("1");
		searchFilter.getStatus();
		searchFilter.setAcceptedFromDate("MM-dd-yyyy");
		searchFilter.getAcceptedFromDate();
		searchFilter.setAcceptedToDate("MM-dd-yyyy");
		searchFilter.getAcceptedToDate();
		@SuppressWarnings("rawtypes")
		Class resultType = RetrievalActionsController.class;
		Pagination pagination = new Pagination();
		commonJpaService.getResultList("test", params, resultType, pagination);
		PowerMockito.when(codingWorkListService.getMyCodingWorklist(searchFilter)).thenThrow(ParseException.class);
	}
	@Test
	public void testGetCodingUsersforSupervisor() throws SQLException {

		Map<String, Object> params = new HashMap<>();
		StatusUpdateInfo statusUpdateInfo = new StatusUpdateInfo();
		statusUpdateInfo.setChartIdList(List);
		List.add("test");
		codingWorkListService.codingReleasetoAssingment(statusUpdateInfo);
		storedProcedureService.callStoredProc("test", params, P_OUT_STATUS);
	}

}
