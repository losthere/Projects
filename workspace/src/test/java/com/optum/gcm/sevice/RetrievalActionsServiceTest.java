package com.optum.gcm.sevice;

import java.sql.SQLException;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.tags.form.ErrorsTag;

import com.optum.gcm.common.constants.StatusFlag;
import com.optum.gcm.common.dao.CommonJpaDao;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.dao.constants.RetrievalActionQueries;
import com.optum.gcm.model.CancelBarcodesInfo;
import com.optum.gcm.model.RetrievalSearchFilter;
import com.optum.gcm.model.RetrievalSearchFilterWrapper;
import com.optum.gcm.model.ValidateBarcodeResult;
import com.optum.gcm.sevice.RetrievalActionsService;

@RunWith(PowerMockRunner.class)
public class RetrievalActionsServiceTest {

	@InjectMocks
	protected RetrievalActionsService retrievalActionsService;
	@Mock
	protected RetrievalSearchFilter retrievalSearchFilter;
	@Mock
	private CommonJpaDao commonJpaDao;
	@Mock
	private RetrievalSearchService retrievalSearchService;
	@Mock
	private CommonJpaService commonJpaService;
	
	@Mock
	private List<String> validBarcodes;
	
	@Mock
	private List<ValidateBarcodeResult> validateResults;
	
	@Test
	public void testReleaseByProject() throws SQLException {
		List<RetrievalSearchFilter> projectDetails = new ArrayList<RetrievalSearchFilter>();
		RetrievalSearchFilter e=new RetrievalSearchFilter();
		e.setStatus("");
		projectDetails.add(e);
		retrievalActionsService.releaseByProject(projectDetails);
	}
	@Test
	public void testReleaseByProject_() throws SQLException {
		List<RetrievalSearchFilter> projectDetails = new ArrayList<RetrievalSearchFilter>();
		RetrievalSearchFilter e=new RetrievalSearchFilter();
		e.setStatus("NEW");
		projectDetails.add(e);
		retrievalActionsService.releaseByProject(projectDetails);
	}

	@Test
	public void testReleaseByProject_1() throws SQLException {
		List<RetrievalSearchFilter> projectDetails = new ArrayList<RetrievalSearchFilter>();
		RetrievalSearchFilter e=new RetrievalSearchFilter();
		e.setStatus("NEWER");
		projectDetails.add(e);
		retrievalActionsService.releaseByProject(projectDetails);
	}

	@Test
	public void TestcancelByProjectDetails() throws SQLException {
		List<RetrievalSearchFilter> retrievalSearchFilterList=new ArrayList<>();
		RetrievalSearchFilter e=new RetrievalSearchFilter();
		retrievalSearchFilterList.add(e);
		retrievalActionsService.cancelByProjectDetails(retrievalSearchFilterList);
	}
	@Test
	public void TestinactivateByProjectDetails() throws SQLException {
		List<RetrievalSearchFilter> retrievalSearchFilterList=new ArrayList<>();
		RetrievalSearchFilter e=new RetrievalSearchFilter();
		retrievalSearchFilterList.add(e);
		retrievalActionsService.inactivateByProjectDetails(retrievalSearchFilterList);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void TestassignVendors() throws SQLException {
		
		RetrievalSearchFilterWrapper retrievalSearchFilterWrapper=new RetrievalSearchFilterWrapper();
		retrievalSearchFilterWrapper.setAssignQty(5L);
		List<RetrievalSearchFilter> retrievalSearchFilter1=new ArrayList<>();

		RetrievalSearchFilter e=new RetrievalSearchFilter();
		e.setVendorKey(5L);
		e.setClientKey(5L);
		e.setHpKey(0L);
		retrievalSearchFilter1.add(e);
		retrievalSearchFilterWrapper.setRetrievalSearchFilter(retrievalSearchFilter1);
		//PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn(retrievalSearchFilter1);
		PowerMockito.doReturn(retrievalSearchFilter1).when(commonJpaService).getResultList(Mockito.anyString(), Mockito.anyMap(), Mockito.any());
		retrievalActionsService.assignVendors(retrievalSearchFilterWrapper);
	}
	@Test
	public void TestreviewExtract() throws SQLException {
		List<RetrievalSearchFilter> retrievalSearchFilterList=new ArrayList<>();
		RetrievalSearchFilter e=new RetrievalSearchFilter();
		retrievalSearchFilterList.add(e);
		e.setProjectKey(5L);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(),Mockito.any())).thenReturn(0L);
		retrievalActionsService.reviewExtract(retrievalSearchFilterList);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void TestsendExtract() throws SQLException {
		List<RetrievalSearchFilter> retrievalSearchFilterList=new ArrayList<>();
		RetrievalSearchFilter e=new RetrievalSearchFilter();
		retrievalSearchFilterList.add(e);
		e.setProjectKey(5L);
		e.setStatus("");
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(),Mockito.any())).thenReturn(0L);
		retrievalActionsService.sendExtract(retrievalSearchFilterList);
	}
	@Test
	public void TestcancelBarcodes() {
		CancelBarcodesInfo cancelBarcodesInfo=new CancelBarcodesInfo();
		cancelBarcodesInfo.setBarcodes("TEST");
		cancelBarcodesInfo.setUserId("TEST");
		cancelBarcodesInfo.setReasonCode("TEST");
		cancelBarcodesInfo.setUserKey(5L);
		List<String> validBarcodes = new ArrayList<String>(2);
		validBarcodes.add("TEST");
		validBarcodes.add("TEST");
		validBarcodes.size();
		List<ValidateBarcodeResult> results = new ArrayList<ValidateBarcodeResult>();
		
		String queryString1 = RetrievalActionQueries.QUERY_BARCODES_VALIDATION;
		Map<String, Object> params1 = new HashMap<String, Object>();
		params1.put("BARCODES", "TEST");
		params1.put("GCM_USER_KEY", 5L);
		List<ValidateBarcodeResult> validateResults = new ArrayList<ValidateBarcodeResult>();
		ValidateBarcodeResult validateBarcodeResult = new ValidateBarcodeResult();
		validateBarcodeResult.setProjContBarCode("test");
		validateResults.add(validateBarcodeResult);
		PowerMockito.when(commonJpaService.getResultList(queryString1, params1,ValidateBarcodeResult.class)).thenReturn(validateResults);
     	retrievalActionsService.cancelBarcodes(cancelBarcodesInfo);
	}
}
