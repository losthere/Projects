package com.optum.gcm.web;

import static com.optum.gcm.model.RestResponse.ERROR;
import static com.optum.gcm.model.RestResponse.SUCCESS;

import java.sql.SQLException;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.optum.gcm.model.CodingQAAcceptFilter;
import com.optum.gcm.model.CodingQAEncDxWrapper;
import com.optum.gcm.model.CodingWorkListInfo;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.StatusUpdateInfo;
import com.optum.gcm.sevice.CodingQAService;

/**
 * @author pmule
 *
 */

@RequestMapping("/codingqa/worklist")
@RestController
public class CodingQAController {

	private static final Logger LOG = LoggerFactory.getLogger(CodingWorkFlowController.class);

	@Autowired
	private CodingQAService codingQAService;

	@PostMapping(value = "/getCodingQAAvailableWorkItems", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<CodingWorkListInfo>> getCodingQAAvailableWorkItems(
			@RequestBody SchedulingSearchFilter schedulingSearchFilter) throws SQLException {
		LOG.info("getCodingQAAvailableWorkItems started with search filter: " + schedulingSearchFilter.toString());
		RestResponse<List<CodingWorkListInfo>> restResponse = new RestResponse<>(SUCCESS);
		try {
		restResponse.setResult(codingQAService.getCodingQAAvailableWorkItems(schedulingSearchFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getCodingQAAvailableWorkItems ", e);
		}
		return restResponse;
	}

	@PostMapping(value = "/codingQAAddtoMyWorkList", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<String> codingReleasetoAssingment(@RequestBody StatusUpdateInfo statusUpdateInfo)
			throws SQLException {
		LOG.info("codingQAAddtoMyWorkList started with search filter: " + statusUpdateInfo.toString());
		 RestResponse restResponse = new RestResponse<>(SUCCESS);
		try {
		boolean x = codingQAService.codingQAAddtoMyWorkList(statusUpdateInfo);
		if(!x) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage("Some barcodes belong to Project that has been closed. No further work on the project is permitted");
			return restResponse;
		}
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getCodingQAMyWorkList ", e);
		}
		return new RestResponse<>(SUCCESS);
	}

	@PostMapping(value = "/getCodingQAMyWorkList", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<CodingWorkListInfo>> getCodingQAMyWorkList(
			@RequestBody SchedulingSearchFilter schedulingSearchFilter) throws SQLException {
		LOG.info("getCodingQAMyWorkList started with search filter: " + schedulingSearchFilter.toString());
		RestResponse<List<CodingWorkListInfo>> restResponse = new RestResponse<>(SUCCESS);
		try {
		restResponse.setResult(codingQAService.getCodingQAMyWorkList(schedulingSearchFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getCodingQAMyWorkList ", e);
		}
		return restResponse;
	}

	@PostMapping(value = "/releaseToAssignmentForCodingQA", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<String> releaseToAssignmentForCodingQA(@RequestBody StatusUpdateInfo statusUpdateInfo)
			throws SQLException {
		LOG.info("codingReleasetoAssingment started with search filter: " + statusUpdateInfo.toString());
		RestResponse<String> restResponse = new RestResponse<>(SUCCESS);
		try {
		restResponse.setResult(codingQAService.codingQAreleasetoAssign(statusUpdateInfo));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while codingReleasetoAssingment ", e);
		}
		return restResponse;
	}

	@PostMapping(value = "/getCodingQaEncounterDx", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<CodingQAEncDxWrapper> getCodingQaEncounterDx(@RequestBody SchedulingSearchFilter searchFilter) {
		LOG.info("getCodingQAEncounterDx started with search filter: " + searchFilter.toString());
		RestResponse<CodingQAEncDxWrapper> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(codingQAService.getCodingQAEncounterDx(searchFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getting EncounterDXDetails ", e);
		}
		return restResponse;
	}

	@PostMapping(value = "/saveCodingQaResults", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<Boolean> saveCodingQaResults(@RequestBody CodingQAEncDxWrapper codingQAEncDxWrapper) {
		LOG.info("saveEncounterDx started with search filter: " + codingQAEncDxWrapper.toString());
		RestResponse<Boolean> restResponse = new RestResponse<>(SUCCESS);
		String status = codingQAService.saveCodingQaResults(codingQAEncDxWrapper);
		if (null != status && !StringUtils.isBlank(status) && StringUtils.equals(status, "Y")) {
			restResponse.setResult(true);
		} else {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
		}
		return restResponse;
	}

	@PostMapping(value = "/acceptCodingQaResults", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<Boolean> acceptCodingQaResults(@RequestBody CodingQAAcceptFilter codingQAAcceptFilter) {
		LOG.info("saveEncounterDx started with search filter: " + codingQAAcceptFilter.toString());
		RestResponse<Boolean> restResponse = new RestResponse<>(SUCCESS);
		String status = codingQAService.acceptCodingQaResults(codingQAAcceptFilter);
		if (null != status && !StringUtils.isBlank(status) && StringUtils.equals(status, SUCCESS)) {
			restResponse.setResult(true);
		} else {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
		}
		return restResponse;
	}
}