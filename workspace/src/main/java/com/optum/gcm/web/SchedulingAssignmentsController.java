package com.optum.gcm.web;

import static com.optum.gcm.model.RestResponse.ERROR;

/**
 * @author pmule
 *
 */

import static com.optum.gcm.model.RestResponse.SUCCESS;

import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.optum.gcm.model.RestResponse;
import com.optum.gcm.model.SchedulingSearchFilterWrapper;
import com.optum.gcm.sevice.SchedulingAssingmentsService;

@RequestMapping("/scheduling/inventory")
@RestController
public class SchedulingAssignmentsController {

	private static final Logger LOG = LoggerFactory.getLogger(SchedulingAssignmentsController.class);
	
	@Autowired
	private SchedulingAssingmentsService schedulingAssingmentsService;

	
	@PostMapping(value = "/assignSchedulingInvenotry", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public RestResponse<String> assignSchedulingInvenotry(@RequestBody SchedulingSearchFilterWrapper wrapper) throws SQLException {
		LOG.info("assignSchedulingInvenotry started with search filter: " );
		RestResponse<String>restResponse = new RestResponse<>(SUCCESS);
		try {
		boolean x = schedulingAssingmentsService.assignSchedulingInvenotry(wrapper);
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while assignSchedulingInvenotry ", e);
		}
		return restResponse;
	}
}
