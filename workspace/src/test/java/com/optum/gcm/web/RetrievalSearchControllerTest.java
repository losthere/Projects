package com.optum.gcm.web;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.model.AssignableVendorsInput;
import com.optum.gcm.model.RetrievalSearchInput;
import com.optum.gcm.sevice.RetrievalSearchService;

@RunWith(PowerMockRunner.class)
public class RetrievalSearchControllerTest {

	@InjectMocks
	private RetrievalSearchController retrievalSearchController;

	@Mock
	private RetrievalSearchService retrievalSearchService;
	@Mock
	private AssignableVendorsInput assinableVendorInp;

	@Test
	public void testGetProjects() throws Exception {
		RetrievalSearchInput retrievalSearchFilter = Mockito.mock(RetrievalSearchInput.class);
		PowerMockito.when(retrievalSearchService.getProjects(retrievalSearchFilter)).thenReturn(null);
		retrievalSearchController.getProjects(retrievalSearchFilter);
	}

	@Test
	public void testGetAssignableVendors() throws Exception {
		RetrievalSearchInput retrievalSearchFilter = Mockito.mock(RetrievalSearchInput.class);
		PowerMockito.when(retrievalSearchService.getAssignableVendors(assinableVendorInp)).thenReturn(null);
		retrievalSearchController.getAssignableVendors(assinableVendorInp);
	}

	@Test
	public void testGetDetailCountByProject() throws Exception {
		RetrievalSearchInput retrievalSearchFilter = Mockito.mock(RetrievalSearchInput.class);
		PowerMockito.when(retrievalSearchService.getDetailCountByProject(retrievalSearchFilter)).thenReturn(null);
		retrievalSearchController.getDetailCountByProject(retrievalSearchFilter);
	}

	@Test
	public void testGetAssignableVendorsByHPnClient() throws Exception {
		RetrievalSearchInput retrievalSearchFilter = Mockito.mock(RetrievalSearchInput.class);
		PowerMockito.when(retrievalSearchService.getAssignableVendorsByHPnClient(assinableVendorInp)).thenReturn(null);
		retrievalSearchController.getAssignableVendorsByHPnClient(assinableVendorInp);
	}
}
