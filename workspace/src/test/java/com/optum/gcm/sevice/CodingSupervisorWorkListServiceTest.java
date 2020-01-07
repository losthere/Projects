package com.optum.gcm.sevice;


import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.StatusUpdateInfo;
@RunWith(PowerMockRunner.class)
public class CodingSupervisorWorkListServiceTest {

	@InjectMocks
	CodingSupervisorWorkListService codingSupervisorWorkListService;
	@Mock
	private SchedulingSearchFilter searchFilter;
	@Mock
	private CommonJpaService commonJpaService;
	@Mock
	private StatusUpdateInfo statusUpdateInfo;
	@Test
	public void testCodingSupervisorWorkListService() throws SQLException {
		codingSupervisorWorkListService.getUnassignedCodingSupervisorWorkList(searchFilter);
	}
	
	@Test
	public void testcodingSupervisorAddToMyWorkList() throws SQLException {
		StatusUpdateInfo statusUpdateInfo =new StatusUpdateInfo();
		List<String> chartIdList=new ArrayList<>();
		chartIdList.add("MY");
		chartIdList.add("Test");
		statusUpdateInfo.setChartIdList(chartIdList);
		codingSupervisorWorkListService.codingSupervisorAddToMyWorkList(statusUpdateInfo);
	}
	@Test
	public void testcodingSupervisorAddToMyWorkList1() throws SQLException {
		StatusUpdateInfo statusUpdateInfo =new StatusUpdateInfo();
		List<String> chartIdList=new ArrayList<>();
		statusUpdateInfo.setChartIdList(chartIdList);
		codingSupervisorWorkListService.codingSupervisorAddToMyWorkList(statusUpdateInfo);
	}
	@Test
	public void testcodingSupervisorAddToMyWorkList2() throws SQLException {
		StatusUpdateInfo statusUpdateInfo =new StatusUpdateInfo();
		List<String> chartIdList=null;
		statusUpdateInfo.setChartIdList(chartIdList);
		codingSupervisorWorkListService.codingSupervisorAddToMyWorkList(statusUpdateInfo);
	}
	@Test
	public void testcodingSupervisorAddToMyWorkList3() throws SQLException {
		StatusUpdateInfo statusUpdateInfo =new StatusUpdateInfo();
		statusUpdateInfo.setFromUserKey(5L);
		codingSupervisorWorkListService.codingSupervisorAddToMyWorkList(statusUpdateInfo);
	}
	@Test
	public void releaseToAvailableItemsForCodingSupervisor() throws SQLException {
		StatusUpdateInfo statusUpdateInfo=new StatusUpdateInfo();
		List<String> chartIdList=new ArrayList<>();
		chartIdList.add("MY");
		chartIdList.add("Test");
		statusUpdateInfo.setChartIdList(chartIdList);
		codingSupervisorWorkListService.releaseToAvailableItemsForCodingSupervisor(statusUpdateInfo);
	}
	@Test
	public void releaseToAvailableItemsForCodingSupervisor1() throws SQLException {
		StatusUpdateInfo statusUpdateInfo =new StatusUpdateInfo();
		List<String> chartIdList=new ArrayList<>();
		statusUpdateInfo.setChartIdList(chartIdList);
		codingSupervisorWorkListService.releaseToAvailableItemsForCodingSupervisor(statusUpdateInfo);
	}
	@Test
	public void  getCodingSupervisorMyWorkList() throws SQLException {
		SchedulingSearchFilter searchFilter =new SchedulingSearchFilter();
		searchFilter.setIsAssigned("1");
		searchFilter.setIsCompleted("COMPLETED");
		codingSupervisorWorkListService. getCodingSupervisorMyWorkList(searchFilter);
	}
	@Test
	public void  getCodingSupervisorMyWorkList1() throws SQLException {
		SchedulingSearchFilter searchFilter =new SchedulingSearchFilter();
		searchFilter.setIsAssigned("0");
		searchFilter.setIsCompleted("COMPLETED");
		codingSupervisorWorkListService. getCodingSupervisorMyWorkList(searchFilter);
	}
	@Test
	public void  getCodingSupervisorMyWorkList2() throws SQLException {
		SchedulingSearchFilter searchFilter =new SchedulingSearchFilter();
		searchFilter.setIsAssigned("2");
		searchFilter.setIsCompleted("COMPLETED");
		codingSupervisorWorkListService. getCodingSupervisorMyWorkList(searchFilter);
	}
	@Test
	public void  getCodingSupervisorMyWorkList3() throws SQLException {
		SchedulingSearchFilter searchFilter =new SchedulingSearchFilter();
		searchFilter.setIsCompleted("1");
		codingSupervisorWorkListService. getCodingSupervisorMyWorkList(searchFilter);
	}
	@Test
	public void  getCodingSupervisorMyWorkList4() throws SQLException {
		SchedulingSearchFilter searchFilter =new SchedulingSearchFilter();
		searchFilter.setFromUserKey(5L);
		codingSupervisorWorkListService. getCodingSupervisorMyWorkList(searchFilter);
	}
	@Test
	public void  getCodingSupervisorMyWorkList5() throws SQLException, ParseException {
		SchedulingSearchFilter searchFilter =new SchedulingSearchFilter();
		searchFilter.setAcceptedFromDate("07-08-1997");
		Date date1 = new SimpleDateFormat("MM-dd-yyyy").parse(searchFilter.getAcceptedFromDate());
		PowerMockito.when(codingSupervisorWorkListService. getCodingSupervisorMyWorkList(searchFilter)).thenThrow(ParseException.class);
	} 
	@Test
	public void  getCodingSupervisorMyWorkList6() throws SQLException {
		SchedulingSearchFilter searchFilter =new SchedulingSearchFilter();
		searchFilter.setAcceptedToDate("07-08-1997");
		codingSupervisorWorkListService. getCodingSupervisorMyWorkList(searchFilter);
	}
	@Test
	public void  getCodingSupervisorMyWorkList7() throws SQLException {
		SchedulingSearchFilter searchFilter =new SchedulingSearchFilter();
		searchFilter.setStatus("2");
		codingSupervisorWorkListService. getCodingSupervisorMyWorkList(searchFilter);
	}
	
}
