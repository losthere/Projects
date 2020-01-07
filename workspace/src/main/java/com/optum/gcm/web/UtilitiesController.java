package com.optum.gcm.web;

import static com.optum.gcm.common.util.LoggingUtil.logInfo;
import static com.optum.gcm.model.RestResponse.ERROR;
import static com.optum.gcm.model.RestResponse.SUCCESS;

import java.sql.SQLException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.optum.gcm.model.ProjectCloseInfo;
import com.optum.gcm.model.ProjectCloseUtility;
import com.optum.gcm.model.ProjectFileListInfo;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.model.SearchChartInput;
import com.optum.gcm.model.SearchFilter;
import com.optum.gcm.model.SearchResult;
import com.optum.gcm.model.UtilitiesFilter;
import com.optum.gcm.sevice.UtilitiesService;

/**
 * @author pmule
*/

@RequestMapping("/utilities/project")
@RestController
public class UtilitiesController {
	
	private static final Logger LOG = LoggerFactory.getLogger(UtilitiesController.class);
	
	@Autowired
	UtilitiesService utilitiesService;
	
	@PostMapping(value = "/getProjectListforRelease", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<ProjectFileListInfo>> getProjectListforRelease(@RequestBody UtilitiesFilter utilitiesFilter) throws SQLException {
		logInfo(LOG, "getProjectListforRelease started with search filter: ");
		RestResponse<List<ProjectFileListInfo>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(utilitiesService.getProjectListforRelease(utilitiesFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getProjectListforRelease ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/releaseProject", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<Long>>  releaseProject(@RequestBody UtilitiesFilter[] utilitiesFilter) throws SQLException {
		logInfo(LOG, "releaseProject started with search filter: ");
		RestResponse<List<Long>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(utilitiesService.releaseProject(utilitiesFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while releaseProject ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/deleteProject", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<Long>>  deleteProject(@RequestBody UtilitiesFilter[] utilitiesFilter) throws SQLException {
		logInfo(LOG, "deleteProject started with search filter: ");
		RestResponse<List<Long>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(utilitiesService.deleteProject(utilitiesFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while deleteProject ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/getSearchResultsByMember", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<SearchResult>> getSearchResultsByMember(@RequestBody SearchFilter searchFilter) throws SQLException {
		logInfo(LOG, "getSearchResultsByMember started with search filter: ");
		RestResponse<List<SearchResult>> restResponse = new RestResponse<>(SUCCESS);
		try {
		restResponse.setResult(utilitiesService.getSearchResultsByMember(searchFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getSearchResultsByMember ", e);
		}
		return restResponse;
	}

	@PostMapping(value = "/getSearchResultsByProvider", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<SearchResult>> getSearchResultsByProvider(@RequestBody SearchFilter searchFilter) throws SQLException {
		logInfo(LOG, "getSearchResultsByProvider started with search filter: ");
		RestResponse<List<SearchResult>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(utilitiesService.getSearchResultsByProvider(searchFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getSearchResultsByProvider ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/getSearchResultsByClientInternalId", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<SearchResult>> getSearchResultsByClientInternalId(@RequestBody SearchFilter searchFilter) throws SQLException {
		logInfo(LOG, "getSearchResultsByClientInternalId started with search filter: ");
		RestResponse<List<SearchResult>> restResponse = new RestResponse<>(SUCCESS);
		try {
		restResponse.setResult(utilitiesService.getSearchResultsByClientInternalId(searchFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getSearchResultsByClientInternalId ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/getSearchResultsByChartId", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<SearchResult>> getSearchResultsByChartId(@RequestBody SearchFilter searchFilter) throws SQLException {
		logInfo(LOG, "getSearchResultsByChartId started with search filter: ");
		RestResponse<List<SearchResult>> restResponse = new RestResponse<>(SUCCESS);
		try {
		restResponse.setResult(utilitiesService.getSearchResultsByChartId(searchFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getSearchResultsByChartId ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/closeProjectwithExtract", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<String> closeProjectwithExtract(@RequestBody ProjectCloseUtility proejctCloseUtility) throws SQLException {
		logInfo(LOG, "closeProjectwithExtract started with search filter: ");
		RestResponse<String> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(utilitiesService.closeProjectwithExtract(proejctCloseUtility));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while closeProjectwithExtract ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/getProjectListforClose", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<ProjectCloseInfo>> getProjectListforClose(@RequestBody UtilitiesFilter utilitiesFilter) throws SQLException {
		logInfo(LOG, "getProjectListforClose started with search filter: ");
		RestResponse<List<ProjectCloseInfo>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(utilitiesService.getProjectListforClose(utilitiesFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getProjectListforClose ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/updateSearchChartStatus", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<String> updateChartStatus(@RequestBody SearchChartInput searchChartInput) throws SQLException {
		logInfo(LOG, "updateSearchChartStatus started with search filter: ");
		RestResponse<String>restResponse = new RestResponse<>(SUCCESS);
		try {
			utilitiesService.updateSearchChartStatus(searchChartInput);
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while updateSearchChartStatus ", e);
		}
		return restResponse;
	}
	
}
