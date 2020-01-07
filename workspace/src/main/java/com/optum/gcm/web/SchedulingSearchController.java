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
import com.optum.gcm.model.SchedulingInventory;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.sevice.SchedulingSearchService;

	/**
	 * @author pmule
	 *
	 */

	@RequestMapping("/scheduling/inventory")
	@RestController
	public class SchedulingSearchController {
		
		private static final Logger LOG = LoggerFactory.getLogger(SchedulingSearchController.class);
		
		@Autowired
		private SchedulingSearchService schedulingSearchService;
		
		@PostMapping(value = "/getUnassignedInventoryforScheduling", consumes = MediaType.APPLICATION_JSON_VALUE, 
				produces = MediaType.APPLICATION_JSON_VALUE)
		public RestResponse<List<SchedulingInventory>> getUnassignedInventoryforScheduling(@RequestBody SchedulingSearchFilter schedulingSearchFilter) throws SQLException {
			LOG.info("getUnassignedInventoryforScheduling started with search filter: ");
			RestResponse<List<SchedulingInventory>> restResponse = new RestResponse<>(SUCCESS);
			try {
			restResponse.setResult(schedulingSearchService.getUnassignedInventoryforScheduling(schedulingSearchFilter));
			} catch (Exception e) {
				restResponse.setStatus(ERROR);
				restResponse.setErrorMessage(ERROR);
				LOG.error("Exception while getting getUnassignedInventoryforScheduling ", e);
			}
			return restResponse;
		}

}
