package com.optum.gcm.sevice;

import static com.optum.gcm.dao.constants.UtilityQueries.FUNC_SEARCH_BY_CLIENTID;
import static com.optum.gcm.dao.constants.UtilityQueries.FUNC_SEARCH_BY_MEMBER;
import static com.optum.gcm.dao.constants.UtilityQueries.FUNC_SEARCH_BY_PROVIDER;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.common.dao.CommonJpaDao;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.common.sevice.StoredProcedureService;
import com.optum.gcm.model.ProjectCloseUtility;
import com.optum.gcm.model.SearchChartInput;
import com.optum.gcm.model.SearchFilter;
import com.optum.gcm.model.SearchResult;
import com.optum.gcm.model.UtilitiesFilter;

@RunWith(PowerMockRunner.class)
public class UtilitiesServiceTest {

	@InjectMocks
	protected UtilitiesService utilitiesService;

	@Mock
	private CommonJpaService commonJpaService;

	@Mock
	private StoredProcedureService storedProcedureService;

	@Mock
	private CommonJpaDao commonJpaDao;

	@Test
	public void TestgetProjectListforRelease() throws SQLException {
		UtilitiesFilter utilitiesFilter = new UtilitiesFilter();
		utilitiesFilter.setCreateDate("07-08-1997");
		utilitiesFilter.setFileName("Test");
		utilitiesFilter.setVendorKey(0L);
		utilitiesFilter.setRegion("Test");
		utilitiesService.getProjectListforRelease(utilitiesFilter);
	}
	@Test
	public void TestgetProjectListforRelease1() throws SQLException {
		UtilitiesFilter utilitiesFilter = new UtilitiesFilter();
		utilitiesFilter.setCreateDate("07-08-1997");
		utilitiesFilter.setFileName("Test");
		utilitiesFilter.setVendorKey(7L);
		utilitiesFilter.setRegion("Test");
		utilitiesService.getProjectListforRelease(utilitiesFilter);
	}

	@Test
	public void testReleaseProject() throws SQLException {
		UtilitiesFilter utilitiesFilter = new UtilitiesFilter();
		utilitiesFilter.setProjKey(7L);
		UtilitiesFilter[] arrayUtilitiesFilter = { utilitiesFilter };
		utilitiesService.releaseProject(arrayUtilitiesFilter);
	}

	@Test
	public void testdeleteProject() throws SQLException {
		UtilitiesFilter utilitiesFilter = new UtilitiesFilter();
		utilitiesFilter.setProjKey(7L);
		UtilitiesFilter[] arrayUtilitiesFilter = { utilitiesFilter };
		utilitiesService.deleteProject(arrayUtilitiesFilter);
	}

	@Test
	public void testgetSearchResultsByMember() throws SQLException {
		SearchFilter searchFilter = new SearchFilter();
		searchFilter.setProjectKey(null);
		List<SearchResult> searchResults = new ArrayList<>();
		SearchResult e = new SearchResult();
		e.setBusFuncKey(7L);
		e.setDisableHyperLink("Y");
		searchResults.add(e);
		List<SearchResult> searchResults1=new ArrayList<>();
		SearchResult e1=new SearchResult();
		e1.setBusFuncKey(7l);
		e1.setDisableHyperLink("Y");
		searchResults1.add(e1);
		PowerMockito
				.when(commonJpaService.getResultList(Matchers.anyString(),Matchers.anyMap(),Matchers.<Class<SearchResult>> any())).thenReturn(searchResults1);
		utilitiesService.getSearchResultsByMember(searchFilter);

	}

	@Test
	public void testgetSearchResultsByMember_con1() throws SQLException {
		SearchFilter searchFilter = new SearchFilter();
		searchFilter.setProjectKey(null);
		List<SearchResult> searchResults = new ArrayList<>();
		SearchResult e = new SearchResult();
		e.setBusFuncKey(8L);
		e.setDisableHyperLink("Y");
		List<SearchResult> searchResults1=new ArrayList<>();
		SearchResult e1=new SearchResult();
		e1.setBusFuncKey(8l);
		e1.setDisableHyperLink("Y");
		searchResults1.add(e1);
		PowerMockito
				.when(commonJpaService.getResultList(Matchers.anyString(),Matchers.anyMap(),Matchers.<Class<SearchResult>> any())).thenReturn(searchResults1);
		utilitiesService.getSearchResultsByMember(searchFilter);

	}

	@Test
	public void testgetSearchResultsByMember_con2() throws SQLException {
		SearchFilter searchFilter = new SearchFilter();
		searchFilter.setProjectKey(null);
		List<SearchResult> searchResults = new ArrayList<>();
		SearchResult e = new SearchResult();
		e.setBusFuncKey(8L);
		e.setDisableHyperLink("Y");
		List<SearchResult> searchResults1=new ArrayList<>();
		SearchResult e1=new SearchResult();
		e1.setBusFuncKey(8l);
		e1.setDisableHyperLink("N");
		searchResults1.add(e1);
		PowerMockito
				.when(commonJpaService.getResultList(Matchers.anyString(),Matchers.anyMap(),Matchers.<Class<SearchResult>> any())).thenReturn(searchResults1);
		utilitiesService.getSearchResultsByMember(searchFilter);

	}

	@Test
	public void testgetSearchResultsByProvider_con1() throws SQLException {
		SearchFilter searchFilter = new SearchFilter();
		searchFilter.setProjectKey(null);
		List<SearchResult> searchResults = new ArrayList<>();
		SearchResult e = new SearchResult();
		e.setBusFuncKey(8L);
		e.setDisableHyperLink("Y");
		searchResults.add(e);
		List<SearchResult> searchResults1=new ArrayList<>();
		SearchResult e1=new SearchResult();
		e1.setBusFuncKey(8l);
		e1.setDisableHyperLink("Y");
		searchResults1.add(e1);
		PowerMockito
				.when(commonJpaService.getResultList(Matchers.anyString(),Matchers.anyMap(),Matchers.<Class<SearchResult>> any())).thenReturn(searchResults1);
		utilitiesService.getSearchResultsByProvider(searchFilter);

	}

	@Test
	public void testgetSearchResultsByProvider_con2() throws SQLException {
		SearchFilter searchFilter = new SearchFilter();
		searchFilter.setProjectKey(null);
		List<SearchResult> searchResults = new ArrayList<>();
		SearchResult e = new SearchResult();
		e.setBusFuncKey(8L);
		e.setDisableHyperLink("N");
		searchResults.add(e);
		List<SearchResult> searchResults1=new ArrayList<>();
		SearchResult e1=new SearchResult();
		e1.setBusFuncKey(7l);
		e1.setDisableHyperLink("Y");
		searchResults1.add(e1);
		PowerMockito
				.when(commonJpaService.getResultList(Matchers.anyString(),Matchers.anyMap(),Matchers.<Class<SearchResult>> any())).thenReturn(searchResults1);
		utilitiesService.getSearchResultsByProvider(searchFilter);

	}

	@Test
	public void testgetSearchResultsByProvider() throws SQLException {
		SearchFilter searchFilter = new SearchFilter();
		searchFilter.setProjectKey(null);
		List<SearchResult> searchResults = new ArrayList<>();
		SearchResult e = new SearchResult();
		e.setBusFuncKey(7L);
		e.setDisableHyperLink("y");
		searchResults.add(e);
		List<SearchResult> searchResults1=new ArrayList<>();
		SearchResult e1=new SearchResult();
		e1.setBusFuncKey(8l);
		e1.setDisableHyperLink("N");
		searchResults1.add(e1);
		PowerMockito
				.when(commonJpaService.getResultList(Matchers.anyString(),Matchers.anyMap(),Matchers.<Class<SearchResult>> any())).thenReturn(searchResults1);
		utilitiesService.getSearchResultsByProvider(searchFilter);

	}

	@Test
	public void testgetSearchResultsByClientInternalId() throws SQLException {
		SearchFilter searchFilter = new SearchFilter();
		searchFilter.setProjectKey(null);
		List<SearchResult> searchResults = new ArrayList<>();
		SearchResult e = new SearchResult();
		e.setBusFuncKey(7L);
		e.setDisableHyperLink("Y");
		searchResults.add(e);
		List<SearchResult> searchResults1=new ArrayList<>();
		SearchResult e1=new SearchResult();
		e1.setBusFuncKey(8l);
		e1.setDisableHyperLink("N");
		searchResults1.add(e1);
		PowerMockito
				.when(commonJpaService.getResultList(Matchers.anyString(),Matchers.anyMap(),Matchers.<Class<SearchResult>> any())).thenReturn(searchResults1);
		utilitiesService.getSearchResultsByClientInternalId(searchFilter);

	}

	@Test
	public void testgetSearchResultsByClientInternalId_con1() throws SQLException {
		SearchFilter searchFilter = new SearchFilter();
		searchFilter.setProjectKey(null);
		List<SearchResult> searchResults = new ArrayList<>();
		SearchResult e = new SearchResult();
		e.setBusFuncKey(8L);
		e.setDisableHyperLink("Y");
		List<SearchResult> searchResults1=new ArrayList<>();
		SearchResult e1=new SearchResult();
		e1.setBusFuncKey(7l);
		e1.setDisableHyperLink("N");
		searchResults1.add(e1);
		PowerMockito
				.when(commonJpaService.getResultList(Matchers.anyString(),Matchers.anyMap(),Matchers.<Class<SearchResult>> any())).thenReturn(searchResults1);
		utilitiesService.getSearchResultsByClientInternalId(searchFilter);

	}

	@Test
	public void testgetSearchResultsByClientInternalId_con2() throws SQLException {
		SearchFilter searchFilter = new SearchFilter();
		searchFilter.setProjectKey(null);
		List<SearchResult> searchResults = new ArrayList<>();
		SearchResult e = new SearchResult();
		e.setBusFuncKey(8L);
		e.setDisableHyperLink("N");
		searchResults.add(e);
		List<SearchResult> searchResults1=new ArrayList<>();
		SearchResult e1=new SearchResult();
		e1.setBusFuncKey(8l);
		e1.setDisableHyperLink("Y");
		searchResults1.add(e1);
		PowerMockito
				.when(commonJpaService.getResultList(Matchers.anyString(),Matchers.anyMap(),Matchers.<Class<SearchResult>> any())).thenReturn(searchResults1);
		utilitiesService.getSearchResultsByClientInternalId(searchFilter);

	}

	@Test
	public void testgetSearchResultsByChartId() throws SQLException {
		SearchFilter searchFilter = new SearchFilter();
		searchFilter.setProjectKey(null);
		List<SearchResult> searchResults = new ArrayList<>();
		SearchResult e = new SearchResult();
		e.setBusFuncKey(7L);
		e.setDisableHyperLink("Y");
		List<SearchResult> searchResults1=new ArrayList<>();
		SearchResult e1=new SearchResult();
		e1.setBusFuncKey(8l);
		e1.setDisableHyperLink("Y");
		searchResults1.add(e1);
		PowerMockito
				.when(commonJpaService.getResultList(Matchers.anyString(),Matchers.anyMap(),Matchers.<Class<SearchResult>> any())).thenReturn(searchResults1);
		utilitiesService.getSearchResultsByChartId(searchFilter);

	}

	@Test
	public void testgetSearchResultsByChartId_con1() throws SQLException {
		SearchFilter searchFilter = new SearchFilter();
		searchFilter.setProjectKey(null);
		List<SearchResult> searchResults = new ArrayList<>();
		SearchResult e = new SearchResult();
		e.setBusFuncKey(8L);
		e.setDisableHyperLink("Y");
		searchResults.add(e);
		List<SearchResult> searchResults1=new ArrayList<>();
		SearchResult e1=new SearchResult();
		e1.setBusFuncKey(7l);
		e1.setDisableHyperLink("Y");
		searchResults1.add(e1);
		PowerMockito
				.when(commonJpaService.getResultList(Matchers.anyString(),Matchers.anyMap(),Matchers.<Class<SearchResult>> any())).thenReturn(searchResults1);
		utilitiesService.getSearchResultsByChartId(searchFilter);

	}

	@Test
	public void testgetSearchResultsByChartId_con2() throws SQLException {
		SearchFilter searchFilter = new SearchFilter();
		searchFilter.setProjectKey(null);
		List<SearchResult> searchResults = new ArrayList<>();
		SearchResult e = new SearchResult();
		e.setBusFuncKey(8L);
		e.setDisableHyperLink("N");
		searchResults.add(e);
		List<SearchResult> searchResults1=new ArrayList<>();
		SearchResult e1=new SearchResult();
		e1.setBusFuncKey(7l);
		e1.setDisableHyperLink("Y");
		searchResults1.add(e1);
		PowerMockito
				.when(commonJpaService.getResultList(Matchers.anyString(),Matchers.anyMap(),Matchers.<Class<SearchResult>> any())).thenReturn(searchResults1);
		utilitiesService.getSearchResultsByChartId(searchFilter);

	}

	@Test
	public void TestcloseProjectwithExtract() throws SQLException {
		ProjectCloseUtility projectCloseUtility = new ProjectCloseUtility();
		projectCloseUtility.setIsImgExt(true);
		utilitiesService.closeProjectwithExtract(projectCloseUtility);
	}

	@Test
	public void TestgetProjectListforClose() throws SQLException {
		UtilitiesFilter utilitiesFilter = new UtilitiesFilter();
		utilitiesFilter.setProjKey(7L);
		utilitiesFilter.setProjYear(7L);
		utilitiesFilter.setBusSegment("Test");
		utilitiesService.getProjectListforClose(utilitiesFilter);
	}

	@Test
	public void TestupdateSearchChartStatus() throws SQLException {
		SearchChartInput searchChartInput = new SearchChartInput();
		searchChartInput.setRetWiKey(7L);
		searchChartInput.setBusFuncKey(7L);
		searchChartInput.setBusFuncVenKey(7L);
		utilitiesService.updateSearchChartStatus(searchChartInput);
	}
}
