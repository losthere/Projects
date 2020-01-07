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

import com.optum.gcm.model.CodingWorkListInfo;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.StatusUpdateInfo;
import com.optum.gcm.sevice.CodingWorkListService;


/**
 * @author pmule
 *
 */

@RequestMapping("/coding/worklist")
@RestController
public class CodingWorkListController {

	private static final Logger LOG = LoggerFactory.getLogger(CodingWorkFlowController.class);
	
	@Autowired
	private CodingWorkListService codingWorkListService;
	
	@PostMapping(value = "/getMyCodingWorklist", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<CodingWorkListInfo>> getMyCodingWorklist(@RequestBody SchedulingSearchFilter schedulingSearchFilter) throws SQLException {
		logInfo(LOG, "getMyCodingWorklist started with search filter: ");
		RestResponse<List<CodingWorkListInfo>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(codingWorkListService.getMyCodingWorklist(schedulingSearchFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getMyCodingWorklist ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/codingReleasetoAssingment", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<String>  codingReleasetoAssingment(@RequestBody StatusUpdateInfo statusUpdateInfo) throws SQLException {
		logInfo(LOG, "codingReleasetoAssingment started with search filter: ");
		RestResponse<String> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(codingWorkListService.codingReleasetoAssingment(statusUpdateInfo));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while codingReleasetoAssingment ", e);
		}
		return restResponse;
	}

}