package com.optum.gcm.web;

import static com.optum.gcm.common.util.LoggingUtil.logDebug;
import static com.optum.gcm.common.util.LoggingUtil.logInfo;
import static com.optum.gcm.model.RestResponse.ERROR;
import static com.optum.gcm.model.RestResponse.SUCCESS;
import static org.apache.commons.lang3.StringEscapeUtils.escapeJava;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.optum.gcm.model.ChartStatusUpdate;
import com.optum.gcm.model.GcmRetAppointment;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.model.RightFaxDetails;
import com.optum.gcm.sevice.FaxPacketService;

/**
 * @author sgangul1
 */

@RequestMapping("/scheduling/retrieval")
@RestController
public class FaxPacketController {

	private static final Logger LOG = LoggerFactory.getLogger(FaxPacketController.class);

	@Autowired
	private FaxPacketService faxPacketService;

	@PostMapping(value = "/getFaxPacketByAppt", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_PDF_VALUE)
	public @ResponseBody byte[] getFaxPacketByAppt(@RequestParam String apptKey) throws Exception {
		logDebug(LOG, true, "Getting Fax packet for Appointment : ", apptKey);
		return faxPacketService.getFaxPacketByAppt(apptKey);
	}

	@PostMapping(value = "/getFaxPacketByDocID", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_PDF_VALUE)
	public @ResponseBody byte[] getFaxPacketByDocID(@RequestParam String documentID) {
		logDebug(LOG, true, "Getting Fax packet for Appointment : {}", documentID);
		return faxPacketService.getFaxPacketByDocID(documentID);
	}

	@PostMapping(value = "/getApptFaxHistory", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<RightFaxDetails>> getFaxHistory(@RequestBody GcmRetAppointment gcmRetAppointment) {
		logInfo(LOG, true, "Getting Fax History for appointment: {}", gcmRetAppointment.getApptKey());
		RestResponse<List<RightFaxDetails>> restResponse = new RestResponse<>(SUCCESS);
		restResponse.setResult(faxPacketService.getFaxHistory(gcmRetAppointment.getApptKey()));
		return restResponse;
	}

	@PostMapping(value = "/refaxByChart", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<Boolean> refaxByChart(@RequestBody ChartStatusUpdate chartStatusUpdate) {
		logInfo(LOG, true, "Updating status of charts to Refax");
		RestResponse<Boolean> restResponse = new RestResponse<>(SUCCESS);
		String status = faxPacketService.updateChartStatus(chartStatusUpdate);

		if (StringUtils.isBlank(status)) {
			restResponse.setStatus(SUCCESS);
			restResponse.setResult(true);
		} else {
			restResponse.setResult(false);
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(status);
		}
		return restResponse;
	}

	@PostMapping(value = "/getFaxPacketByAppt1", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<byte[]> getFaxPacketByAppt1(@RequestParam String apptKey) {
		logInfo(LOG, true, "Getting Fax packet for Appointment : {}", apptKey);
		RestResponse<byte[]> restResponse = new RestResponse<>(SUCCESS);
		byte[] fileContent;
		try {
			fileContent = faxPacketService.getFaxPacketByAppt(apptKey);
			if (fileContent != null) {
				restResponse.setResult(fileContent);
			} else {
				restResponse.setStatus(ERROR);
				restResponse.setErrorMessage("PACKET_NOT_FOUND");
			}
		} catch (Exception e) {
			LOG.error("Exception occured while extracting Fax Packet from Documentum for apptKey: " + escapeJava(apptKey), e);
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
		}
		return restResponse;
	}

	@GetMapping(value = "/getFaxPacketByAppt2", produces = MediaType.APPLICATION_PDF_VALUE)
	public @ResponseBody byte[] getFaxPacketByAppt2(@RequestParam String apptKey) throws Exception {
		logInfo(LOG, true, "Getting Fax packet for Appointment : {}", apptKey);
		return faxPacketService.getFaxPacketByAppt(apptKey);
	}

	@GetMapping(value = "/getFaxPacketByDocID1", produces = MediaType.APPLICATION_PDF_VALUE)
	public @ResponseBody byte[] getFaxPacketByDocID1(@RequestParam String documentID) {
		logInfo(LOG, true, "Getting Fax packet for Appointment : {}", documentID);
		return faxPacketService.getFaxPacketByDocID(documentID);
	}
}
