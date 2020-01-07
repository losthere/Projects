package com.optum.gcm.web;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.exception.ServiceException;
import com.optum.gcm.model.ChartInputInfo;
import com.optum.gcm.model.DxCodeDOSDetails;
import com.optum.gcm.sevice.CodingWorkFlowService;

@RunWith(PowerMockRunner.class)
public class CodingWorkFlowControllerTest {

	@InjectMocks
	private CodingWorkFlowController codingWorkFlowController;

	@Mock
	private CodingWorkFlowService codingWorkFlowService;

	
	@Test
	public void testGetChartDetails() throws Exception {
		ChartInputInfo chartInputInfo = Mockito.mock(ChartInputInfo.class);
		PowerMockito.when(codingWorkFlowService.getChartDetails(chartInputInfo)).thenReturn(null);
		codingWorkFlowController.getChartDetails(chartInputInfo);
	}
	
	
	@Test
	public void testIsBusFuncConfigured() throws Exception {
		PowerMockito.when(codingWorkFlowService.isBusFuncConfigured(3L,"test")).thenReturn(true);
		codingWorkFlowController.isBusFuncConfigured(3L,"test");
	}
	
	@SuppressWarnings("unchecked")
	@Test
	public void testIsBusFuncConfigured_1() throws Exception {
		PowerMockito.when(codingWorkFlowService.isBusFuncConfigured(3L,"test")).thenThrow(Exception.class);
		codingWorkFlowController.isBusFuncConfigured(3L,"test");
	}
	
	@Test
	public void testGetChartDetails_() throws Exception {
		ChartInputInfo chartInputInfo = Mockito.mock(ChartInputInfo.class);
		PowerMockito.when(codingWorkFlowService.getChartDetails(chartInputInfo)).thenThrow(new ServiceException());
		codingWorkFlowController.getChartDetails(chartInputInfo);
	}
	@Test  
	public void testUpdateChartStatus() throws Exception {
		ChartInputInfo chartInputInfo = Mockito.mock(ChartInputInfo.class);
		PowerMockito.when(codingWorkFlowService.updateChartStatus(chartInputInfo)).thenReturn(12);
		codingWorkFlowController.updateChartStatus(chartInputInfo);
	}
	@Test  
	public void testUpdateChartStatus_1() throws Exception {
		ChartInputInfo chartInputInfo = new ChartInputInfo();
		chartInputInfo.setToBusFuncStatus("COMPLETED");
		PowerMockito.when(codingWorkFlowService.updateChartStatus(chartInputInfo)).thenReturn(0);
		codingWorkFlowController.updateChartStatus(chartInputInfo);
	}
	@Test  
	public void testUpdateChartStatus_2() throws Exception {
		ChartInputInfo chartInputInfo =Mockito.mock(ChartInputInfo.class);
		PowerMockito.when(codingWorkFlowService.updateChartStatus(chartInputInfo)).thenReturn(0);
		codingWorkFlowController.updateChartStatus(chartInputInfo);
	}
	@Test  
	public void testUpdateChartStatus_() throws Exception {
		ChartInputInfo chartInputInfo = Mockito.mock(ChartInputInfo.class);
		PowerMockito.when(codingWorkFlowService.updateChartStatus(chartInputInfo)).thenThrow(new ServiceException());
		codingWorkFlowController.updateChartStatus(chartInputInfo);
	}
	
	@Test
	public void testReplyAndExitforEscalatedItem() throws Exception {
		ChartInputInfo chartInputInfo = Mockito.mock(ChartInputInfo.class);
		PowerMockito.when(codingWorkFlowController.replyAndExitforEscalatedItem(chartInputInfo)).thenThrow(new ServiceException());
		codingWorkFlowController.replyAndExitforEscalatedItem(chartInputInfo);
	}
	@Test
	public void testReplyAndExitforEscalatedItem_() throws Exception {
		ChartInputInfo chartInputInfo = Mockito.mock(ChartInputInfo.class);
		codingWorkFlowController.replyAndExitforEscalatedItem(chartInputInfo);
	}
	@Test
	public void testGetChartHistory() throws Exception {
		PowerMockito.when(codingWorkFlowService.getChartHistory(1L)).thenReturn(null);
		codingWorkFlowController.getChartHistory(1L);
	}
	@Test
	public void testGetChartHistory_() throws Exception {
		PowerMockito.when(codingWorkFlowService.getChartHistory(1L)).thenThrow(new ServiceException());
		codingWorkFlowController.getChartHistory(1L);
	}
	@Test
	public void testGetChartComments() throws Exception {
		PowerMockito.when(codingWorkFlowService.getChartComments(1L)).thenReturn(null);
		codingWorkFlowController.getChartComments(1L);
	}
	@Test
	public void testGetChartComments_() throws Exception {
		PowerMockito.when(codingWorkFlowService.getChartComments(1L)).thenThrow(new ServiceException());
		codingWorkFlowController.getChartComments(1L);
	}
	@Test
	public void testGetEncEoCodes() throws Exception {
		PowerMockito.when(codingWorkFlowService.getEncEoCodes()).thenReturn(null);
		codingWorkFlowController.getEncEoCodes();
	}
	@Test
	public void testGetEncEoCodes_() throws Exception {
		PowerMockito.when(codingWorkFlowService.getEncEoCodes()).thenThrow(new ServiceException());
		codingWorkFlowController.getEncEoCodes();
	}
	@Test
	public void testGetDxLevelEoCodes() throws Exception {
		PowerMockito.when(codingWorkFlowService.getDxLevelEoCodes()).thenReturn(null);
		codingWorkFlowController.getDxLevelEoCodes();
	}
	@Test
	public void testGetDxLevelEoCodes_() throws Exception {
		PowerMockito.when(codingWorkFlowService.getDxLevelEoCodes()).thenThrow(new ServiceException());
		codingWorkFlowController.getDxLevelEoCodes();
	}
	@Test
	public void testValidateIcdCode() throws Exception {
		DxCodeDOSDetails dxCodedosDetailsObj = Mockito.mock(DxCodeDOSDetails.class);
		PowerMockito.when(codingWorkFlowService.validateIcdCode(dxCodedosDetailsObj)).thenReturn(null);
		codingWorkFlowController.validateIcdCode(dxCodedosDetailsObj);
	}
	@Test
	public void testValidateIcdCode_() throws Exception {
		DxCodeDOSDetails dxCodedosDetailsObj = Mockito.mock(DxCodeDOSDetails.class);
		PowerMockito.when(codingWorkFlowService.validateIcdCode(dxCodedosDetailsObj)).thenThrow(new ServiceException());
		codingWorkFlowController.validateIcdCode(dxCodedosDetailsObj);
	}
	@Test
	public void testmakeEntryforCoderProductivity() throws Exception {
		ChartInputInfo chartInputInfo = Mockito.mock(ChartInputInfo.class);
		codingWorkFlowController.makeEntryforCoderProductivity(chartInputInfo);
	}
	@Test
	public void testmakeEntryforCoderProductivity_() throws Exception {
		ChartInputInfo chartInputInfo = Mockito.mock(ChartInputInfo.class);
		PowerMockito.when(codingWorkFlowController.makeEntryforCoderProductivity(chartInputInfo)).thenThrow(new ServiceException());
		codingWorkFlowController.makeEntryforCoderProductivity(chartInputInfo);
	}
}




