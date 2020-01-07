package com.optum.gcm.sevice;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.jdbc.core.SqlParameter;

import com.optum.gcm.common.dao.CommonJpaDao;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.common.sevice.StoredProcedureService;
import com.optum.gcm.model.CodingQAAcceptFilter;
import com.optum.gcm.model.CodingQAEncDxDetails;
import com.optum.gcm.model.CodingQAEncDxWrapper;
import com.optum.gcm.model.CodingQAWorkItem;
import com.optum.gcm.model.CodingQaDxDetails;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.StatusUpdateInfo;

@RunWith(PowerMockRunner.class)
public class CodingQAServiceTest {

	@InjectMocks
	protected CodingQAService codingQAService;

	@Mock
	private CommonJpaService commonJpaService;
	@Mock
	private CommonJpaDao commonJpaDao;
	@Mock
	protected SchedulingSearchFilter searchFilter;
	@Mock
	private StatusUpdateInfo statusUpdateInfo;
	@Mock
	private CodingQAEncDxWrapper codingQAEncDxWrapper;
	@Mock
	private CodingQAAcceptFilter codingQAAcceptFilter;
	@Mock
	private StoredProcedureService storedProcedureService;
	@Mock
	private SqlParameter P_OUT_STATUS;

	@Test
	public void TestgetCodingQAAvailableWorkItems() throws SQLException {
		SchedulingSearchFilter searchFilter= new SchedulingSearchFilter();
		searchFilter.setAcceptedFromDate("07-08-1997");
		searchFilter.setAcceptedToDate("07-08-1997");
		searchFilter.setRecordCount(5L);
		searchFilter.setFromUserKey(4L);
		searchFilter.setProgramKey(5L);
		codingQAService.getCodingQAAvailableWorkItems(searchFilter);
	}
	@Test
	public void TestcodingQAAddtoMyWorkList() throws SQLException {
		StatusUpdateInfo statusUpdateInfo=new StatusUpdateInfo();
		List<String> chartIdList=new ArrayList<>();
		chartIdList.add("Test");
		chartIdList.add("Test");
		statusUpdateInfo.setChartIdList(chartIdList);
		codingQAService.codingQAAddtoMyWorkList(statusUpdateInfo);
	}
	@Test
	public void TestcodingQAAddtoMyWorkList_() throws SQLException {
		codingQAService.codingQAAddtoMyWorkList(statusUpdateInfo);
	}
	@Test
	public void TestcodingQAreleasetoAssign() throws SQLException {
		StatusUpdateInfo statusUpdateInfo=new StatusUpdateInfo();
		List<String> chartIdList=new ArrayList<>();
		chartIdList.add("Test");
		chartIdList.add("Test");
		statusUpdateInfo.setChartIdList(chartIdList);
		codingQAService.codingQAreleasetoAssign(statusUpdateInfo);
	}
	@Test
	public void TestgetCodingQAMyWorkList() throws SQLException {
		SchedulingSearchFilter searchFilter= new SchedulingSearchFilter();
		searchFilter.setIsAssigned("1");
		searchFilter.setStatus("1");
		codingQAService.getCodingQAMyWorkList(searchFilter);
	}
	@Test
	public void TestgetCodingQAMyWorkList1() throws SQLException {
		SchedulingSearchFilter searchFilter= new SchedulingSearchFilter();
		searchFilter.setIsAssigned("1");
		searchFilter.setStatus("2");
		codingQAService.getCodingQAMyWorkList(searchFilter);
	}
	@Test
	public void TestgetCodingQAMyWorkList2() throws SQLException {
		SchedulingSearchFilter searchFilter= new SchedulingSearchFilter();
		searchFilter.setIsAssigned("1");
		searchFilter.setStatus("3");
		codingQAService.getCodingQAMyWorkList(searchFilter);
	}
	@Test
	public void TestgetCodingQAMyWorkList3() throws SQLException {
		SchedulingSearchFilter searchFilter= new SchedulingSearchFilter();
		searchFilter.setIsAssigned("1");
		searchFilter.setStatus("1");
		searchFilter.setIsCompleted("1");
		searchFilter.setAcceptedFromDate("07-08-1997");
		searchFilter.setAcceptedToDate("07-08-1997");
		searchFilter.setProgramKey(4L);
		codingQAService.getCodingQAMyWorkList(searchFilter);
	}
	@Test
	public void TestgetCodingQAMyWorkList4() throws SQLException {
		SchedulingSearchFilter searchFilter= new SchedulingSearchFilter();
		searchFilter.setIsAssigned("1");
		searchFilter.setStatus("1");
		searchFilter.setIsCompleted("1");
		searchFilter.setAcceptedFromDate("07-08-1997");
		codingQAService.getCodingQAMyWorkList(searchFilter);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void TestgetCodingQAEncounterDx() throws SQLException, ParseException {
		List<CodingQAWorkItem> value=new ArrayList<>();
		CodingQAWorkItem e=new CodingQAWorkItem();
		e.setCoderEncounterDxKey(5L);
		e.setQaEncounterKey(5L);
		e.setRecordLevel("ENC");
		value.add(e);
		CodingQAEncDxDetails code=new CodingQAEncDxDetails();
		List<CodingQaDxDetails> codingQaDxDetails=new ArrayList<>();
		code.setCodingQaDxDetails(codingQaDxDetails);
		PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(),Mockito.<Class<CodingQAWorkItem>> any())).thenReturn(value);
		codingQAService.getCodingQAEncounterDx(searchFilter);
	}
	@SuppressWarnings("unchecked")
	@Test(expected=NullPointerException.class)
	public void TestgetCodingQAEncounterDx_() throws SQLException, ParseException {
		List<CodingQAWorkItem> value=new ArrayList<>();
		CodingQAWorkItem e=new CodingQAWorkItem();
		e.setCoderEncounterDxKey(5L);
		e.setQaEncounterKey(5L);
		e.setRecordLevel("DX");
		value.add(e);
		Map<String, CodingQAEncDxDetails> codingQAMap=Mockito.mock(HashMap.class);
		CodingQAEncDxDetails codingQAEncDxDetails=new CodingQAEncDxDetails();
		codingQAMap.get(codingQAEncDxDetails);
		List<CodingQaDxDetails> codingQaDxDetails=new ArrayList<>();
		CodingQaDxDetails e1=new CodingQaDxDetails();
		codingQaDxDetails.add(e1);
		codingQAEncDxDetails.setCodingQaDxDetails(codingQaDxDetails);
		PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(),Mockito.<Class<CodingQAWorkItem>> any())).thenReturn(value);
		codingQAService.getCodingQAEncounterDx(searchFilter);
	}
	@Test
	public void TestgetCodingQAEncounterDx1() throws SQLException, ParseException {
		SchedulingSearchFilter searchFilter= new SchedulingSearchFilter();
		searchFilter.setIsCompleted("Y");
		codingQAService.getCodingQAEncounterDx(searchFilter);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void TestsaveCodingQaResults() throws SQLException, ParseException {
		PowerMockito.when(codingQAService.saveCodingQaResults(codingQAEncDxWrapper)).thenThrow(Exception.class);
		codingQAService.saveCodingQaResults(codingQAEncDxWrapper);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void TestacceptCodingQaResults() throws SQLException, ParseException {
		PowerMockito.when(codingQAService.acceptCodingQaResults(codingQAAcceptFilter)).thenThrow(Exception.class);
		codingQAService. acceptCodingQaResults(codingQAAcceptFilter);
	}
}
