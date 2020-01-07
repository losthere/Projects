package com.optum.gcm.web;

import static com.optum.gcm.common.util.LoggingUtil.logInfo;
import static com.optum.gcm.model.RestResponse.ERROR;

/**
 * @author pmule
 *
 */

import static com.optum.gcm.model.RestResponse.SUCCESS;

import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.optum.gcm.model.EncounterDxDetails;
import com.optum.gcm.model.EncounterDxHccInfo;
import com.optum.gcm.model.EncounterInfo;
import com.optum.gcm.model.EncounterInputInfo;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.sevice.EncounterService;

@RequestMapping("/coding/encounter")
@RestController
public class EncounterController {

	@Autowired
	private EncounterService encounterService;
	
	private static final Logger LOG = LoggerFactory.getLogger(EncounterController.class);
	
	@PostMapping(value = "/saveEncounter", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<Long> saveEncounterAndDx(@RequestBody EncounterDxDetails encounterDxDetails) throws SQLException, ParseException, IOException {
		logInfo(LOG, "saveEncounter started with search filter:");
		RestResponse<Long> restResponse = new RestResponse<>(SUCCESS);
		try {
			Long encKey = encounterService.saveEncounterAndDx(encounterDxDetails);
			if(encKey > 0) {
				restResponse.setResult(encKey);
			}else {
				restResponse.setStatus(ERROR);
				restResponse.setErrorMessage("Workitem has been completed/reassigned to different user.");
			}
		} catch (EmptyResultDataAccessException e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while saveEncounter ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/getEncounters", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<EncounterInfo>> getEncounters(@RequestBody EncounterInputInfo encounterInputInfo) throws SQLException, ParseException {
		logInfo(LOG, "getEncounters started with search filter: ");
		RestResponse<List<EncounterInfo>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(encounterService.getEncounters(encounterInputInfo));
		} catch (EmptyResultDataAccessException e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getEncounters ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/getEncounterwithDxHcc", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<EncounterDxHccInfo>> getEncounterwithDxHcc(@RequestBody EncounterInputInfo encounterInputInfo) throws SQLException, ParseException {
		logInfo(LOG, "getEncounterswithDxHcc started with search filter: ");
		RestResponse<List<EncounterDxHccInfo>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(encounterService.getEncounterwithDxHcc(encounterInputInfo));
		} catch (EmptyResultDataAccessException e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getEncounterwithDxHcc ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/deleteEncounter", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<String> deleteEncounter(@RequestBody EncounterInputInfo encounterInputInfo) throws SQLException, ParseException, IOException {
		logInfo(LOG, "deleteEncounter started with search filter: ");
		RestResponse<String>restResponse = new RestResponse<>(SUCCESS);
		try {
			boolean isDeleted = encounterService.deleteEncounter(encounterInputInfo);
			if(!isDeleted) {
				restResponse.setStatus(ERROR);
				restResponse.setErrorMessage("Workitem has been completed/reassigned to different user.");
			}
		} catch (EmptyResultDataAccessException e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while deleteEncounter ", e);
		}
		return restResponse;
	}
}
