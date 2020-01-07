package com.optum.gcm.sevice;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.dao.EmptyResultDataAccessException;

import com.optum.gcm.common.dao.CommonJpaDao;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.ChartCommentsInfo;
import com.optum.gcm.model.ChartInputInfo;
import com.optum.gcm.model.DxCodeDOSDetails;

import ch.qos.logback.core.boolex.Matcher;

@RunWith(PowerMockRunner.class)
public class CodingWorkFlowServiceTest {

	@InjectMocks
	protected CodingWorkFlowService codingWorkFlowService;

	@Mock
	protected ChartInputInfo chartInputInfo;
	@Mock
	protected ChartCommentsInfo chartCommentsInfo;
	@Mock
	protected DxCodeDOSDetails dxCodeDOSDetails;
	@Mock
	private CommonJpaService commonJpaService;
	@Mock
	private CommonJpaDao commonJpaDao;
	@Mock
	private CacheableService cacheableService;
	@Mock
	private ChartCommentsInfo chartComment;
	


	

	@SuppressWarnings("unchecked")
	@Test
	public void testGetChartDetails() throws SQLException {
		ChartInputInfo chartInputInfo = new ChartInputInfo();
		chartInputInfo.setBusFuncKey(5L);
		chartInputInfo.setProjContentKey(5L);
		chartInputInfo.setBusFuncVenKey(5L);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any()))
				.thenThrow(EmptyResultDataAccessException.class);
		codingWorkFlowService.getChartDetails(chartInputInfo);
	}

	@Test
	public void testGetChartDetails_() throws SQLException {
		ChartInputInfo chartInputInfo = new ChartInputInfo();
		chartInputInfo.setBusFuncKey(5L);
		chartInputInfo.setProjContentKey(5L);
		chartInputInfo.setBusFuncVenKey(5L);
		codingWorkFlowService.getChartDetails(chartInputInfo);
	}

	@Test
	public void testupdateChartStatus() throws SQLException {
		ChartInputInfo chartInputInfo = new ChartInputInfo();
		chartInputInfo.setContentErrorCode("Test");
		chartInputInfo.setReasonCode("Test");
		chartInputInfo.setToBusFuncStatus("ESCALATED");
		codingWorkFlowService.updateChartStatus(chartInputInfo);
	}

	@Test
	public void testupdateChartStatus1() throws SQLException {
		ChartInputInfo chartInputInfo = new ChartInputInfo();
		chartInputInfo.setContentErrorCode("Test");
		chartInputInfo.setReasonCode("Test");
		chartInputInfo.setToBusFuncStatus("COMPLETED");
		chartInputInfo.setBusFuncKey(5L);
		chartInputInfo.setChartComment(chartComment);
		chartInputInfo.setBarcode("Test");
		chartInputInfo.setDosYear(7l);
		chartInputInfo.setVendorKey(7l);
		PowerMockito.when(commonJpaService.update(Mockito.anyString(), Mockito.anyMap())).thenReturn(5);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(),Mockito.any())).thenReturn(1L);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(),Mockito.any())).thenReturn(1L);
		PowerMockito.when(commonJpaService.getResultObject(Matchers.anyString(), Matchers.anyMap(),Mockito.<Class<String>> any())).thenReturn("Test");
		codingWorkFlowService.updateChartStatus(chartInputInfo);
	}

	@Test
	public void testIsBusFuncConfigured() throws SQLException {
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(),Mockito.any())).thenReturn(1L);
		codingWorkFlowService.isBusFuncConfigured(3L,"test");
	}
	
	
	@Test
	public void testreplyandExitforEscalatedItem() throws SQLException {
		ChartInputInfo chartInputInfo = new ChartInputInfo();
		ChartCommentsInfo chartComment = new ChartCommentsInfo();
		chartInputInfo.setReasonCode("GCM10");
		chartInputInfo.setToBusFuncStatus("COMPLETED");
		chartInputInfo.setChartComment(chartComment);
		chartComment.setContentComment("Test");
		codingWorkFlowService.replyandExitforEscalatedItem(chartInputInfo);
	}
	@Test
	public void testreplyandExitforEscalatedItem_reasoncode() throws SQLException {
		ChartInputInfo chartInputInfo = new ChartInputInfo();
		ChartCommentsInfo chartComment = new ChartCommentsInfo();
		chartInputInfo.setReasonCode("GCM101");
		chartInputInfo.setToBusFuncStatus("COMPLETED");
		chartInputInfo.setChartComment(chartComment);
		chartComment.setContentComment("Test");
		codingWorkFlowService.replyandExitforEscalatedItem(chartInputInfo);
	}
	@Test
	public void testreplyandExitforEscalatedItem_rsncode() throws SQLException {
		ChartInputInfo chartInputInfo = new ChartInputInfo();
		ChartCommentsInfo chartComment = new ChartCommentsInfo();
		chartInputInfo.setReasonCode("GCM101");
		chartInputInfo.setToBusFuncStatus("REJECTED");
		chartInputInfo.setChartComment(chartComment);
		chartComment.setContentComment("Test");
		codingWorkFlowService.replyandExitforEscalatedItem(chartInputInfo);
	}

	@Test
	public void makeEntryforCoderProductivity() throws SQLException {
		codingWorkFlowService.makeEntryforCoderProductivity(chartInputInfo);

	}

	@Test
	public void getChartHistory() throws SQLException {
		codingWorkFlowService.getChartHistory(5L);
	}

	@Test
	public void getChartComments() throws SQLException {
		codingWorkFlowService.getChartComments(5L);
	}
	
	@Test
	public void getEncEoCodes() throws SQLException {
		codingWorkFlowService.getEncEoCodes();
	}
	@Test
	public void getDxLevelEoCode() throws SQLException {
		codingWorkFlowService.getDxLevelEoCodes();
	}
	@Test
	public void insertCoderProductivityforQATest() throws SQLException {
		ChartInputInfo chartInput=new ChartInputInfo();
		Map<String, Object> params=new HashMap<>();
		codingWorkFlowService.insertCoderProductivityforQA(chartInput, params);
	}
	
}
