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

import com.optum.gcm.model.MyAppointments;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.model.SchedulingChartCount;
import com.optum.gcm.model.SchedulingInventory;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.sevice.SchedulingWorklistService;

/**
 * @author pmule
 *
 */

@RequestMapping("/scheduling/worklist")
@RestController
public class SchedulingWorklistController {

	private static final Logger LOG = LoggerFactory
			.getLogger(SchedulingWorklistController.class);

	@Autowired
	private SchedulingWorklistService schedulingWorklistService;

	@PostMapping(value = "/getMySchedulingWorklist", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<SchedulingInventory>> getMySchedulingWorklist(@RequestBody SchedulingSearchFilter schedulingSearchFilter) throws SQLException {
		LOG.info("getMySchedulingWorklist started with search filter: ");
		RestResponse<List<SchedulingInventory>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(schedulingWorklistService.getMySchedulingWorklist(schedulingSearchFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getMySchedulingWorklist ", e);
		}
		return restResponse;
	}

	@PostMapping(value = "/getAssignedChartCountByUser", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<SchedulingChartCount> getassignedChartCountByUser(@RequestBody SchedulingSearchFilter schedulingSearchFilter) throws SQLException {
		LOG.info("getInventoryforScheduling started with search filter: ");
		RestResponse<SchedulingChartCount> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(schedulingWorklistService.getAssignedChartCountByUser(schedulingSearchFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getAssignedChartCountByUser ", e);
		}
		return restResponse;
	}

	@PostMapping(value = "/getMyAppointments", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<MyAppointments>> getMyAppointments(@RequestBody SchedulingSearchFilter schedulingSearchFilter) throws SQLException {
		LOG.info("getMyAppointments started with search filter: ");
		RestResponse<List<MyAppointments>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(schedulingWorklistService.getMyAppointments(schedulingSearchFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getMyAppointments ", e);
		}
		return restResponse;
	}

}
