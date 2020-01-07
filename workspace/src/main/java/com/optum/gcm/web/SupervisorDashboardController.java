package com.optum.gcm.web;

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

import com.optum.gcm.model.RestResponse;
import com.optum.gcm.model.SupervisorDashboardCodingCounts;
import com.optum.gcm.model.SupervisorDashboardCodingQACounts;
import com.optum.gcm.model.SupervisorDashboardFilter;
import com.optum.gcm.model.SupervisorDashboardPendMgmtCounts;
import com.optum.gcm.model.SupervisorDashboardRetrievalCounts;
import com.optum.gcm.model.SupervisorDashboardSchedulingCounts;
import com.optum.gcm.sevice.SupervisorDashboardService;

/**
 * @author pmule
 *
 */

@RequestMapping("/supervisor/dashboard")
@RestController
public class SupervisorDashboardController {

	private static final Logger LOG = LoggerFactory.getLogger(SupervisorDashboardController.class);
	
	@Autowired
	private SupervisorDashboardService supervisorDashboardService;
	
	@PostMapping(value = "/getSchedulingCounts", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<SupervisorDashboardSchedulingCounts>> getSchedulingCounts(@RequestBody SupervisorDashboardFilter supervisorDashboardFilter) throws SQLException {
		LOG.info("getSchedulingCounts started with search filter: " + supervisorDashboardFilter.toString());
		RestResponse<List<SupervisorDashboardSchedulingCounts>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(supervisorDashboardService.getSchedulingCounts(supervisorDashboardFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getSchedulingCounts ", e);
		}
		return restResponse;
	}
	

	@PostMapping(value = "/getRetrievalCounts", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<SupervisorDashboardRetrievalCounts>> getRetrievalCounts(@RequestBody SupervisorDashboardFilter supervisorDashboardFilter) throws SQLException {
		LOG.info("getRetrievalCounts started with search filter: " + supervisorDashboardFilter.toString());
		RestResponse<List<SupervisorDashboardRetrievalCounts>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(supervisorDashboardService.getRetrievalCounts(supervisorDashboardFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getRetrievalCounts ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/getPendMgmtCounts", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<SupervisorDashboardPendMgmtCounts>> getPendMgmtCounts(@RequestBody SupervisorDashboardFilter supervisorDashboardFilter) throws SQLException {
		LOG.info("getPendMgmtCounts started with search filter: " + supervisorDashboardFilter.toString());
		RestResponse<List<SupervisorDashboardPendMgmtCounts>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(supervisorDashboardService.getPendMgmtCounts(supervisorDashboardFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getPendMgmtCounts ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/getCodingCounts", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<SupervisorDashboardCodingCounts>> getCodingCounts(@RequestBody SupervisorDashboardFilter supervisorDashboardFilter) throws SQLException {
		LOG.info("getCodingCounts started with search filter: " + supervisorDashboardFilter.toString());
		RestResponse<List<SupervisorDashboardCodingCounts>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(supervisorDashboardService.getCodingCounts(supervisorDashboardFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getCodingCounts ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/getCodingQACounts", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<SupervisorDashboardCodingQACounts>> getCodingQACounts(@RequestBody SupervisorDashboardFilter supervisorDashboardFilter) throws SQLException {
		LOG.info("getCodingQACounts started with search filter: " + supervisorDashboardFilter.toString());
		RestResponse<List<SupervisorDashboardCodingQACounts>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(supervisorDashboardService.getCodingQACounts(supervisorDashboardFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getCodingQACounts ", e);
		}
		return restResponse;
	}
	
}
