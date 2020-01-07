package com.optum.gcm.web;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.model.CancelBarcodesInfo;
import com.optum.gcm.model.RetrievalSearchFilter;
import com.optum.gcm.model.RetrievalSearchFilterWrapper;
import com.optum.gcm.sevice.RetrievalActionsService;

@RunWith(PowerMockRunner.class)
public class RetrievalActionsControllerTest {

	@InjectMocks
	private RetrievalActionsController retrievalActionsController;
	@Mock 
	String status;
	@Mock
	 RetrievalActionsService retrievalActionsService;
	@Mock
	public List<RetrievalSearchFilter> projectDetails;
	@Mock
	private RetrievalSearchFilterWrapper projectDetails1;
	@Mock
	private CancelBarcodesInfo cancelBarcodesInfo;

	
	@Test
	public void testcancelProject() throws Exception {
		retrievalActionsController.cancelProject(projectDetails);
	}
	@Test
	public void testinactivateProject() throws Exception {
		retrievalActionsController.inactivateProject(projectDetails);
	}
	@Test
	public void testassignVendors() throws Exception {
		retrievalActionsController.assignVendors(projectDetails1);
	}
	@Test
	public void testsendExtract() throws Exception {
		PowerMockito.when(retrievalActionsService.sendExtract(projectDetails)).thenReturn("TET");
		retrievalActionsController.sendExtract(projectDetails);
	}
	@Test
	public void testsendExtract_() throws Exception {
		PowerMockito.when(retrievalActionsService.sendExtract(projectDetails)).thenReturn(null);
		retrievalActionsController.sendExtract(projectDetails);
	}
	@Test
	public void testreviewExtract() throws Exception {
		PowerMockito.when(retrievalActionsService.reviewExtract(projectDetails)).thenReturn("TET");
		retrievalActionsController.reviewExtract(projectDetails);
	}
	@Test
	public void testreviewExtract_() throws Exception {
		PowerMockito.when(retrievalActionsService.reviewExtract(projectDetails)).thenReturn(null);
		retrievalActionsController.reviewExtract(projectDetails);
	}
	@Test
	public void testcancelBarcodes() throws Exception {
		PowerMockito.when(retrievalActionsService.cancelBarcodes(cancelBarcodesInfo)).thenReturn(null);
		retrievalActionsController. cancelBarcodes(cancelBarcodesInfo);
	}
	@Test
	public void testcancelBarcodes_() throws Exception {
		PowerMockito.when(retrievalActionsService.cancelBarcodes(cancelBarcodesInfo)).thenReturn("SUCCESS");
		retrievalActionsController. cancelBarcodes(cancelBarcodesInfo);
	}
	@Test
	public void testcancelBarcodes_1() throws Exception {
		PowerMockito.when(retrievalActionsService.cancelBarcodes(cancelBarcodesInfo)).thenReturn("SUCCEDED");
		retrievalActionsController. cancelBarcodes(cancelBarcodesInfo);
	}
	@Test
	public void testreleaseProject() throws Exception {
		PowerMockito.when(retrievalActionsService.releaseByProject(projectDetails)).thenReturn("SUCCESS");
		retrievalActionsController.releaseProject(projectDetails);
	}
	@Test
	public void testreleaseProject_() throws Exception {
		PowerMockito.when(retrievalActionsService.releaseByProject(projectDetails)).thenReturn("SUCCEDED");
		retrievalActionsController.releaseProject(projectDetails);
	}
}
