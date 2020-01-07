package com.optum.gcm.web;

import static com.optum.gcm.common.util.LoggingUtil.logInfo;
import static com.optum.gcm.model.RestResponse.ERROR;
import static com.optum.gcm.model.RestResponse.SUCCESS;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.optum.gcm.model.AppointmentComments;
import com.optum.gcm.model.AppointmentInfo;
import com.optum.gcm.model.AppointmentSearchFilter;
import com.optum.gcm.model.AssignInventorySearchFilter;
import com.optum.gcm.model.ChartMember;
import com.optum.gcm.model.ChartStatusCount;
import com.optum.gcm.model.ExistingAppointment;
import com.optum.gcm.model.GcmRetAppointment;
import com.optum.gcm.model.MemberDetails;
import com.optum.gcm.model.ProviderDetailsWrapper;
//import com.optum.gcm.model.ProviderDetails;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.SchedulingSearchFilterWrapper;
import com.optum.gcm.model.SchedulingWorklist;
//import com.optum.gcm.sevice.FaxPacketService;
import com.optum.gcm.sevice.SchedulingWorkFlowService;

/**
 * @author pmule
 *
 */

@RequestMapping("/scheduling/workflow/")
@RestController
public class SchedulingWorkFlowController {

	private static final Logger LOG = LoggerFactory
			.getLogger(SchedulingWorkFlowController.class);

	@Autowired
	private SchedulingWorkFlowService schedulingWorkFlowService;
	
	@PostMapping(value = "/getExistingAppts", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<ExistingAppointment>> getExistingAppts(
			@RequestBody AppointmentSearchFilter appointmentSearchFilter)
			throws SQLException {
		RestResponse<List<ExistingAppointment>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(schedulingWorkFlowService.getExistingAppts(appointmentSearchFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getting getExistingAppts ", e);
		}
		return restResponse;
	}

	@PostMapping(value = "/getChartMemberDetails", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<ChartMember>> getChartMemberDetails(
			@RequestBody SchedulingSearchFilterWrapper filter)
			throws SQLException {
		RestResponse<List<ChartMember>> restResponse = new RestResponse<>(SUCCESS);
		try {
		restResponse.setResult(schedulingWorkFlowService.getChartMemberDetails(filter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getting getChartMemberDetails ", e);
		}
		return restResponse;
	}

	@PostMapping(value = "/getChartMemberDetailsByApptId", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<ChartMember>> getChartMemberDetailsByApptId(
			@RequestBody SchedulingSearchFilterWrapper filter)
			throws SQLException {
		RestResponse<List<ChartMember>> restResponse = new RestResponse<>(SUCCESS);
		try {
		restResponse.setResult(schedulingWorkFlowService.getChartMemberDetailsByApptId(filter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getting getChartMemberDetailsByApptId ", e);
		}
		return restResponse;
	}

	@PostMapping(value = "/createAppointment", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<String> createAppointment(
			@RequestBody GcmRetAppointment appt) throws SQLException,ParseException {
		RestResponse<String> restResponse = new RestResponse<>(SUCCESS);
		try {
		schedulingWorkFlowService.createAppointment(appt);
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while createAppointment ", e);
		}
		return new RestResponse<>(SUCCESS);

	}

	@PostMapping(value = "/confirmAppointment", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<Long> confirmAppointment(
			@RequestBody AppointmentInfo appt) throws SQLException,
			ParseException {
		RestResponse<Long> restResponse = new RestResponse<>(SUCCESS);
		try {
		Long apptKey = schedulingWorkFlowService.confirmAppointment(appt);
		restResponse.setResult(apptKey);
	} catch (Exception e) {
		restResponse.setStatus(ERROR);
		restResponse.setErrorMessage(ERROR);
		LOG.error("Exception while confirmAppointment ", e);
	}
		return restResponse;
	}

	@PostMapping(value = "/getChartStatusCountByUser", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<ChartStatusCount>> getChartStatusCountByUser(
			@RequestBody SchedulingSearchFilter schedulingSearchFilter)
			throws SQLException {
		
		RestResponse<List<ChartStatusCount>> restResponse = new RestResponse<>(
				SUCCESS);
		try {
		restResponse.setResult(schedulingWorkFlowService.getChartStatusCountByUser(schedulingSearchFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getChartStatusCountByUser ", e);
		}
		return restResponse;
	}

	@PostMapping(value = "/getMemberDetails", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<MemberDetails>> getMemberDetails(
			@RequestBody AssignInventorySearchFilter filter)
			throws SQLException {
		RestResponse<List<MemberDetails>> restResponse = new RestResponse<>(
				SUCCESS);
		try {
		restResponse.setResult(schedulingWorkFlowService.getMemberDetails(filter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getMemberDetails ", e);
		}
		return restResponse;
	}

	@PostMapping(value = "/releaseToQue", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<String> releaseToQue(@RequestBody AppointmentInfo info)
			throws SQLException {
		RestResponse<String> restResponse = new RestResponse<>(SUCCESS);;
		try {
			schedulingWorkFlowService.releaseToQue(info);
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while releaseToQue ", e);
		}
		return restResponse;
	}

	@PostMapping(value = "/getApptComments", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<AppointmentComments>> getApptComments(
			@RequestBody Long apptKey) throws SQLException {
		logInfo(LOG, true, "getApptComments started with ApptKey: {}", apptKey);
		
		RestResponse<List<AppointmentComments>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(schedulingWorkFlowService.getApptComments(apptKey));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getApptComments ", e);
		}
		return restResponse;
	}

	@PostMapping(value = "/getProviderDetailsByApptId", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<SchedulingWorklist>> getProviderDetailsByApptId(
			@RequestBody SchedulingSearchFilter schedulingSearchFilter)
			throws SQLException {
		RestResponse<List<SchedulingWorklist>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(schedulingWorkFlowService.getProviderDetailsByApptId(schedulingSearchFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getProviderDetailsByApptId ", e);
		}
		return restResponse;
	}

	@PostMapping(value = "/getApptDetailsByApptId", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<GcmRetAppointment> getApptDetailsByApptId(
			@RequestBody GcmRetAppointment gcmRetAppointment)
			throws SQLException {
		logInfo(LOG, true, "getApptDetailsByApptId started with search filter: {}", gcmRetAppointment.getApptKey());
		RestResponse<GcmRetAppointment> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(schedulingWorkFlowService.getApptDetailsByApptId(gcmRetAppointment));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getApptDetailsByApptId ", e);
		}
		return restResponse;
	}
			
	@PostMapping(value = "/getApptDetailsByChartID", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<GcmRetAppointment> getApptDetailsByChartID(
			@RequestBody GcmRetAppointment gcmRetAppointment)
			throws SQLException {
		logInfo(LOG, true, "getApptDetailsByChartID started with search filter: {}", gcmRetAppointment.getBarcode());
		RestResponse<GcmRetAppointment> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(schedulingWorkFlowService.getApptDetailsByChartID(gcmRetAppointment.getBarcode()));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getApptDetailsByChartID ", e);
		}
		return restResponse;
	}

	@PostMapping(value = "/insertApptComments", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<String> insertApptComments(@RequestBody AppointmentComments appointmentComments) throws SQLException {
		RestResponse<String>restResponse = new RestResponse<>(SUCCESS);
		logInfo(LOG, true, "insertApptComments started with param: ", appointmentComments.getApptKey());
		try {
			schedulingWorkFlowService.insertApptComments(appointmentComments);
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while insertApptComments ", e);
		}
		return restResponse;
	}

	@PostMapping(value = "/releaseToAssignment", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<String> releaseToAssignment(
			@RequestBody AppointmentInfo info) throws SQLException {
		schedulingWorkFlowService.releaseToAssignment(info);
		return new RestResponse<>(SUCCESS);
	}

	@PostMapping(value = "/changeApptDateTime", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<Long> changeApptDateTime(
			@RequestBody AppointmentInfo appt) throws SQLException,
			ParseException {
		RestResponse<Long> restResponse = new RestResponse<>(SUCCESS);
		Long apptKey = schedulingWorkFlowService.changeAppointmentDateAndTime(appt);
		restResponse.setResult(apptKey);
		return restResponse;
	}

	@PostMapping(value = "/cancelAppointment", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<Long> cancelAppointment(
			@RequestBody AppointmentInfo appt) throws SQLException,
			ParseException {
		RestResponse<Long> restResponse = new RestResponse<>(SUCCESS);
		Long apptKey = schedulingWorkFlowService.cancelAppointment(appt);
		restResponse.setResult(apptKey);
		return restResponse;
	}

	@PostMapping(value = "/addToExistingAppointment", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<Long> addToExistingAppointment(
			@RequestBody AppointmentInfo appt) throws SQLException,
			ParseException {
		RestResponse<Long> restResponse = new RestResponse<>(SUCCESS);
		Long apptKey = schedulingWorkFlowService.addToExistingAppointment(appt);
		restResponse.setResult(apptKey);
		return restResponse;
	}

	@PostMapping(value = "/updateWorkListProviderDetails", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<String> updateApptProviderDetails(
			@RequestBody ProviderDetailsWrapper providerDetailsWrapper) {
		RestResponse<String> restResponse = new RestResponse<>(SUCCESS);
		try {
			schedulingWorkFlowService.updateWorkListProviderAddressDetails(providerDetailsWrapper);
		} catch (Exception e) {
			LOG.error("Exception : " + e.getMessage());
			restResponse = new RestResponse<>(ERROR);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/getApptAttemptedDates", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<Date>> getApptAttemptedDates(@RequestBody GcmRetAppointment gcmRetAppointment){
		RestResponse<List<Date>> restResponse = new RestResponse<>(SUCCESS);
		List<Date> apptAttemptDates = null;
		try {
		 apptAttemptDates = schedulingWorkFlowService.getApptAttemptedDates(gcmRetAppointment.getApptKey());
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getting getApptAttemptedDates ", e);
		}
		restResponse.setResult(apptAttemptDates);
		return restResponse;
	}
	
}
