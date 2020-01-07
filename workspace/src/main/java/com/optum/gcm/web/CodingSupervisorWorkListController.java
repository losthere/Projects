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

import com.optum.gcm.model.CodingSupervisorMyWorkListInfo;
import com.optum.gcm.model.CodingSupervisorWorkListInfo;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.StatusUpdateInfo;
import com.optum.gcm.sevice.CodingSupervisorWorkListService;

/**
 * @author pmule
 *
 */

@RequestMapping("/coding/worklist")
@RestController
public class CodingSupervisorWorkListController {

private static final Logger LOG = LoggerFactory.getLogger(CodingSupervisorWorkListController.class);
	
	@Autowired
	private CodingSupervisorWorkListService codingSupervisorWorkListService;
	
	@PostMapping(value = "/getUnassignedCodingSupervisorWorkList", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<CodingSupervisorWorkListInfo>> getUnassignedCodingSupervisorWorkList(@RequestBody SchedulingSearchFilter schedulingSearchFilter) throws SQLException {
		logInfo(LOG, "getUnassignedCodingSupervisorWorkList started with search filter: ");
		RestResponse<List<CodingSupervisorWorkListInfo>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(codingSupervisorWorkListService.getUnassignedCodingSupervisorWorkList(schedulingSearchFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getUnassignedCodingSupervisorWorkList ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/codingSupervisorAddToMyWorkList", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<Long>  codingSupervisorAddToMyWorkList(@RequestBody StatusUpdateInfo statusUpdateInfo) throws SQLException {
		logInfo(LOG, "getChartDetails started with search filter: ");
		RestResponse<Long> restResponse = new RestResponse<>(SUCCESS);
		try {
		restResponse.setResult(codingSupervisorWorkListService.codingSupervisorAddToMyWorkList(statusUpdateInfo));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while codingSupervisorAddToMyWorkList ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/getCodingSupervisorMyWorkList", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<CodingSupervisorMyWorkListInfo>> getCodingSupervisorMyWorkList(@RequestBody SchedulingSearchFilter schedulingSearchFilter) throws SQLException {
		logInfo(LOG, "getCodingSupervisorMyWorkList started with search filter: ");
		RestResponse<List<CodingSupervisorMyWorkListInfo>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(codingSupervisorWorkListService.getCodingSupervisorMyWorkList(schedulingSearchFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getCodingSupervisorMyWorkList ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/releaseToAvailableItemsForCodingSupervisor", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<Long> releaseToAvailableItemsForCodingSupervisor(@RequestBody StatusUpdateInfo statusUpdateInfo) throws SQLException {
		logInfo(LOG, "releasetoAvaliableItemsforCodingSupervisor started with search filter: ");
		RestResponse<Long> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(codingSupervisorWorkListService.releaseToAvailableItemsForCodingSupervisor(statusUpdateInfo));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while releaseToAvailableItemsForCodingSupervisor ", e);
		}
		return restResponse;
	}
}
