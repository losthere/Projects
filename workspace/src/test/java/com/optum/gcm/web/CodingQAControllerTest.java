package com.optum.gcm.web;

import java.sql.SQLException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.common.GenericExceptionHandler;
import com.optum.gcm.exception.ServiceException;
import com.optum.gcm.model.CodingQAAcceptFilter;
import com.optum.gcm.model.CodingQAEncDxWrapper;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.StatusUpdateInfo;
import com.optum.gcm.sevice.CodingQAService;

@RunWith(PowerMockRunner.class)
public class CodingQAControllerTest {

	@InjectMocks
	private CodingQAController codingQAController;

	@Mock
	private CodingQAService codingQAService;

	@Test
	public void testGetCodingQAAvailableWorkItems() throws Exception {
		SchedulingSearchFilter searchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(codingQAService.getCodingQAAvailableWorkItems(searchFilter)).thenReturn(null);
		codingQAController.getCodingQAAvailableWorkItems(searchFilter);
	}
	@Test
	public void testGetCodingQAAvailableWorkItems_() throws Exception {
		SchedulingSearchFilter searchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(codingQAService.getCodingQAAvailableWorkItems(searchFilter)).thenThrow(new ServiceException());
		codingQAController.getCodingQAAvailableWorkItems(searchFilter);
	}
	
	@Test
	public void testCodingReleasetoAssingment() throws SQLException{
		StatusUpdateInfo statusUpdateInfo = Mockito.mock(StatusUpdateInfo.class);
		codingQAController.codingReleasetoAssingment(statusUpdateInfo);
	}
	@Test
	public void testCodingReleasetoAssingment_() throws SQLException{
		StatusUpdateInfo statusUpdateInfo = Mockito.mock(StatusUpdateInfo.class);
		PowerMockito.when(codingQAController.codingReleasetoAssingment(statusUpdateInfo)).thenThrow(new ServiceException());
		codingQAController.codingReleasetoAssingment(statusUpdateInfo);
	}
	@Test
	public void testCodingReleasetoAssingment_7() throws SQLException{
		StatusUpdateInfo statusUpdateInfo = Mockito.mock(StatusUpdateInfo.class);
		PowerMockito.when( codingQAService.codingQAAddtoMyWorkList(statusUpdateInfo)).thenReturn(true);
		codingQAController.codingReleasetoAssingment(statusUpdateInfo);
	}
	@Test
	public void testGetCodingQAMyWorkList() throws SQLException {
		SchedulingSearchFilter searchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(codingQAService.getCodingQAMyWorkList(searchFilter)).thenReturn(null);
		codingQAController.getCodingQAMyWorkList(searchFilter);
	}
	@Test
	public void testGetCodingQAMyWorkList_() throws SQLException {
		SchedulingSearchFilter searchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(codingQAService.getCodingQAMyWorkList(searchFilter)).thenThrow(new ServiceException());
		codingQAController.getCodingQAMyWorkList(searchFilter);
	}
	@Test
	public void testReleaseToAssignmentForCodingQA() throws SQLException{
		StatusUpdateInfo statusUpdateInfo = Mockito.mock(StatusUpdateInfo.class);
		PowerMockito.when(codingQAService.codingQAreleasetoAssign(statusUpdateInfo)).thenReturn(null);
		codingQAController.releaseToAssignmentForCodingQA(statusUpdateInfo);
	}
	@Test
	public void testReleaseToAssignmentForCodingQA_() throws SQLException{
		StatusUpdateInfo statusUpdateInfo = Mockito.mock(StatusUpdateInfo.class);
		PowerMockito.when(codingQAService.codingQAreleasetoAssign(statusUpdateInfo)).thenThrow(new ServiceException());
		codingQAController.releaseToAssignmentForCodingQA(statusUpdateInfo);
	}
	@Test
	public void testGetCodingQaEncounterDx() throws SQLException {
		SchedulingSearchFilter searchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(codingQAController.getCodingQaEncounterDx(searchFilter)).thenReturn(null);
		codingQAController.getCodingQaEncounterDx(searchFilter);
	}
	@Test
	public void testGetCodingQaEncounterDx_() throws SQLException {
		SchedulingSearchFilter searchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(codingQAController.getCodingQaEncounterDx(searchFilter)).thenThrow(new ServiceException());
		codingQAController.getCodingQaEncounterDx(searchFilter);	}
	@Test
	public void testSaveCodingQaResults(){
		CodingQAEncDxWrapper codingQAEncDxWrapper = Mockito.mock(CodingQAEncDxWrapper.class);
		PowerMockito.when(codingQAService.saveCodingQaResults(codingQAEncDxWrapper)).thenReturn(null);
		codingQAController.saveCodingQaResults(codingQAEncDxWrapper);
	}
	@Test
	public void testSaveCodingQaResults1(){
		CodingQAEncDxWrapper codingQAEncDxWrapper = Mockito.mock(CodingQAEncDxWrapper.class);
		PowerMockito.when(codingQAService.saveCodingQaResults(codingQAEncDxWrapper)).thenReturn("Y");
		codingQAController.saveCodingQaResults(codingQAEncDxWrapper);
	}
	@Test
	public void testSaveCodingQaResults2(){
		CodingQAEncDxWrapper codingQAEncDxWrapper = Mockito.mock(CodingQAEncDxWrapper.class);
		PowerMockito.when(codingQAService.saveCodingQaResults(codingQAEncDxWrapper)).thenReturn(" ");
		codingQAController.saveCodingQaResults(codingQAEncDxWrapper);
	}
	@Test
	public void testSaveCodingQaResults3(){
		CodingQAEncDxWrapper codingQAEncDxWrapper = Mockito.mock(CodingQAEncDxWrapper.class);
		PowerMockito.when(codingQAService.saveCodingQaResults(codingQAEncDxWrapper)).thenReturn("N");
		codingQAController.saveCodingQaResults(codingQAEncDxWrapper);
	}
	@Test
	public void testAcceptCodingQaResults(){ 
		CodingQAAcceptFilter codingQAAcceptFilter = Mockito.mock(CodingQAAcceptFilter.class);
		PowerMockito.when(codingQAService.acceptCodingQaResults(codingQAAcceptFilter)).thenReturn(null);
		codingQAController.acceptCodingQaResults(codingQAAcceptFilter);
	}
	@Test
	public void testAcceptCodingQaResults1(){ 
		CodingQAAcceptFilter codingQAAcceptFilter = Mockito.mock(CodingQAAcceptFilter.class);
		PowerMockito.when(codingQAService.acceptCodingQaResults(codingQAAcceptFilter)).thenReturn("SUCCESS");
		codingQAController.acceptCodingQaResults(codingQAAcceptFilter);
	}
	@Test
	public void testAcceptCodingQaResults2(){ 
		CodingQAAcceptFilter codingQAAcceptFilter = Mockito.mock(CodingQAAcceptFilter.class);
		PowerMockito.when(codingQAService.acceptCodingQaResults(codingQAAcceptFilter)).thenReturn("N");
		codingQAController.acceptCodingQaResults(codingQAAcceptFilter);
	}
	@Test
	public void testAcceptCodingQaResults3(){ 
		CodingQAAcceptFilter codingQAAcceptFilter = Mockito.mock(CodingQAAcceptFilter.class);
		PowerMockito.when(codingQAService.acceptCodingQaResults(codingQAAcceptFilter)).thenReturn(" ");
		codingQAController.acceptCodingQaResults(codingQAAcceptFilter);
	}
	@Test
	public void testAcceptCodingQaResults_1(){
		CodingQAAcceptFilter codingQAAcceptFilter = new CodingQAAcceptFilter();
		CodingQAEncDxWrapper codingQAEncDxWrapper=new CodingQAEncDxWrapper();
		PowerMockito.when(codingQAService.saveCodingQaResults(codingQAEncDxWrapper)).thenReturn("SUCCESS");
		codingQAService.acceptCodingQaResults(codingQAAcceptFilter);
		codingQAController.acceptCodingQaResults(codingQAAcceptFilter);
	}
}
