package com.optum.gcm.web;

import static com.optum.gcm.model.RestResponse.SUCCESS;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.exception.ServiceException;
import com.optum.gcm.model.ProjectCloseUtility;
import com.optum.gcm.model.ProjectFileListInfo;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.model.SearchChartInput;
import com.optum.gcm.model.UtilitiesFilter;
import com.optum.gcm.model.SearchFilter;
import com.optum.gcm.sevice.UtilitiesService;

@RunWith(PowerMockRunner.class)
public class UtilitiesControllerTest {

	@InjectMocks
	private UtilitiesController utilitiesController;

	@Mock
	private UtilitiesService utilitiesService;

	@Test
	public void testGetProjectListforRelease() throws Exception {
		UtilitiesFilter utilitiesFilter = Mockito.mock(UtilitiesFilter.class);
		PowerMockito.when(utilitiesService.getProjectListforRelease(utilitiesFilter)).thenReturn(null);
		utilitiesController.getProjectListforRelease(utilitiesFilter);
	}
	@Test
	public void testGetProjectListforRelease_() throws Exception {
		UtilitiesFilter utilitiesFilter = Mockito.mock(UtilitiesFilter.class);
		PowerMockito.when(utilitiesService.getProjectListforRelease(utilitiesFilter)).thenThrow(new ServiceException());
		utilitiesController.getProjectListforRelease(utilitiesFilter);
	}
	@Test
	public void testReleaseProject() throws Exception {
		PowerMockito.when(utilitiesService.releaseProject(Mockito.any(UtilitiesFilter[].class))).thenReturn(null);
		utilitiesController.releaseProject(Mockito.any(UtilitiesFilter[].class));
	}
	@Test
	public void testReleaseProject_() throws Exception {
		PowerMockito.when(utilitiesService.releaseProject(Mockito.any(UtilitiesFilter[].class))).thenThrow(new ServiceException());;
		utilitiesController.releaseProject(Mockito.any(UtilitiesFilter[].class));
	}
	@Test
	public void testDeleteProject() throws Exception {
		PowerMockito.when(utilitiesService.deleteProject(Mockito.any(UtilitiesFilter[].class))).thenReturn(null);
		utilitiesController.deleteProject(Mockito.any(UtilitiesFilter[].class));
	}
	@Test
	public void testDeleteProject_() throws Exception {
		PowerMockito.when(utilitiesService.deleteProject(Mockito.any(UtilitiesFilter[].class))).thenThrow(new ServiceException());
		utilitiesController.deleteProject(Mockito.any(UtilitiesFilter[].class));
	}
	@Test
	public void testGetSearchResultsByMember() throws Exception {
		SearchFilter searchFilter = Mockito.mock(SearchFilter.class);
		PowerMockito.when(utilitiesService.getSearchResultsByMember(searchFilter)).thenReturn(null);
		utilitiesController.getSearchResultsByMember(searchFilter);
	}
	@Test
	public void testGetSearchResultsByMember_() throws Exception {
		SearchFilter searchFilter = Mockito.mock(SearchFilter.class);
		PowerMockito.when(utilitiesService.getSearchResultsByMember(searchFilter)).thenThrow(new ServiceException());
		utilitiesController.getSearchResultsByMember(searchFilter);
	}
	@Test
	public void testGetSearchResultsByProvider() throws Exception {
		SearchFilter searchFilter = Mockito.mock(SearchFilter.class);
		PowerMockito.when(utilitiesService.getSearchResultsByProvider(searchFilter)).thenReturn(null);
		utilitiesController.getSearchResultsByProvider(searchFilter);
	}
	@Test
	public void testGetSearchResultsByProvider_() throws Exception {
		SearchFilter searchFilter = Mockito.mock(SearchFilter.class);
		PowerMockito.when(utilitiesService.getSearchResultsByProvider(searchFilter)).thenThrow(new ServiceException());
		utilitiesController.getSearchResultsByProvider(searchFilter);
	}
	@Test
	public void testGetSearchResultsByChartId() throws Exception {
		SearchFilter searchFilter = Mockito.mock(SearchFilter.class);
		PowerMockito.when(utilitiesService.getSearchResultsByChartId(searchFilter)).thenReturn(null);
		utilitiesController.getSearchResultsByChartId(searchFilter);
	}
	@Test
	public void testGetSearchResultsByChartId_() throws Exception {
		SearchFilter searchFilter = Mockito.mock(SearchFilter.class);
		PowerMockito.when(utilitiesService.getSearchResultsByChartId(searchFilter)).thenThrow(new ServiceException());
		utilitiesController.getSearchResultsByChartId(searchFilter);
	}
	@Test
	public void testGetSearchResultsByClientInternalId() throws Exception {
		SearchFilter searchFilter = Mockito.mock(SearchFilter.class);
		PowerMockito.when(utilitiesService.getSearchResultsByClientInternalId(searchFilter)).thenReturn(null);
		utilitiesController.getSearchResultsByClientInternalId(searchFilter);
	}
	@Test
	public void testGetSearchResultsByClientInternalId_() throws Exception {
		SearchFilter searchFilter = Mockito.mock(SearchFilter.class);
		PowerMockito.when(utilitiesService.getSearchResultsByClientInternalId(searchFilter)).thenThrow(new ServiceException());
		utilitiesController.getSearchResultsByClientInternalId(searchFilter);
	}
	@Test
	public void testCloseProjectwithExtract() throws Exception {
		ProjectCloseUtility projectCloseUtility = Mockito.mock(ProjectCloseUtility.class);
		PowerMockito.when(utilitiesService.closeProjectwithExtract(projectCloseUtility)).thenReturn(null);
		utilitiesController.closeProjectwithExtract(projectCloseUtility);
	}
	@Test
	public void testCloseProjectwithExtract_() throws Exception {
		ProjectCloseUtility projectCloseUtility = Mockito.mock(ProjectCloseUtility.class);
		PowerMockito.when(utilitiesService.closeProjectwithExtract(projectCloseUtility)).thenThrow(new ServiceException());
		utilitiesController.closeProjectwithExtract(projectCloseUtility);
	}
	@Test
	public void testGetProjectListforClose() throws Exception {
		UtilitiesFilter utilitiesFilter = Mockito.mock(UtilitiesFilter.class);
		PowerMockito.when(utilitiesService.getProjectListforClose(utilitiesFilter)).thenReturn(null);
		utilitiesController.getProjectListforClose(utilitiesFilter);
	}
	@Test
	public void testGetProjectListforClose_() throws Exception {
		UtilitiesFilter utilitiesFilter = Mockito.mock(UtilitiesFilter.class);
		PowerMockito.when(utilitiesService.getProjectListforClose(utilitiesFilter)).thenThrow(new ServiceException());
		utilitiesController.getProjectListforClose(utilitiesFilter);
	}
	@Test
	public void testUpdateChartStatus() throws Exception {
		SearchChartInput searchChartInput = Mockito.mock(SearchChartInput.class);
		PowerMockito.when(utilitiesController.updateChartStatus(searchChartInput)).thenThrow(new ServiceException());
		utilitiesController.updateChartStatus(searchChartInput);
	}	
	@Test
	public void testUpdateChartStatus_() throws Exception {
		SearchChartInput searchChartInput = Mockito.mock(SearchChartInput.class);
		utilitiesController.updateChartStatus(searchChartInput);
	}
}




