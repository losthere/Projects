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

import com.optum.gcm.model.AppointmentInfo;
import com.optum.gcm.model.PendWorkListViewInfo;
import com.optum.gcm.model.PendWorklistUpdate;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.sevice.PendManagementService;

/**
 * @author pmule
 *
 */

@RequestMapping("/pendmgmt/worklist")
@RestController
public class PendManagementWorkListController {

	private static final Logger LOG = LoggerFactory
			.getLogger(PendManagementWorkListController.class);

	@Autowired
	private PendManagementService pendManagementService;

	@PostMapping(value = "/getUnassignedInventoryforPendMgmt", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<PendWorkListViewInfo>> getUnassignedInventoryforPendMgmt(
			@RequestBody SchedulingSearchFilter schedulingSearchFilter)
			throws SQLException {
		LOG.info("getUnassignedInventoryforPendMgmt started with search filter: ");
		RestResponse<List<PendWorkListViewInfo>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(pendManagementService.getUnassignedInventoryforPendMgmt(schedulingSearchFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getUnassignedInventoryforPendMgmt ", e);
		}
		return restResponse;
	}
	
	
	@PostMapping(value = "/updatePendWorkList", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<String> updatePendWorkList(@RequestBody PendWorklistUpdate pendWorklistUpdate){
		logInfo(LOG, true,"updatePendWorkList called {}, {}, {}", pendWorklistUpdate.getGcmRetApptIds(), pendWorklistUpdate.getPendMgrUserKey(), pendWorklistUpdate.getLoginUserKey() );
		RestResponse<String> restResponse = new RestResponse<>(SUCCESS);
		try {
			if(pendWorklistUpdate.getGcmRetApptIds() != null && !pendWorklistUpdate.getGcmRetApptIds().isEmpty()){
				pendManagementService.updatePendWorkList(pendWorklistUpdate.getGcmRetApptIds(),pendWorklistUpdate.getPendMgrUserKey(),pendWorklistUpdate.getLoginUserKey(),pendWorklistUpdate.getRequestedUser());
			}
		}catch(Exception e){
			LOG.error("Exception : " + e.getMessage());
			restResponse = new RestResponse<>(ERROR);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/updateChartStatus", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<String> updateChartStatus(@RequestBody AppointmentInfo appointmentInfo){
		RestResponse<String> restResponse = new RestResponse<>(SUCCESS);
		try {
			if(appointmentInfo.getChartIdExclList().size() >0)
				pendManagementService.updateChartStatus(appointmentInfo.getChartIdExclList(),"NONRETRIEVABLE", appointmentInfo.getRequestedUserId(), appointmentInfo.getLoginUserKey(),0L,appointmentInfo.getAppt().getApptKey(),appointmentInfo.getRetMethod(),"PEND",appointmentInfo.getNoOfPendAttempts());
			if(appointmentInfo.getChartIdList().size() >0)
				pendManagementService.updateChartStatus(appointmentInfo.getChartIdList(),"PEND RELEASED", appointmentInfo.getRequestedUserId(), appointmentInfo.getLoginUserKey(),0L,appointmentInfo.getAppt().getApptKey(),appointmentInfo.getRetMethod(),"PEND",appointmentInfo.getNoOfPendAttempts());
			}
		catch(Exception e){
			LOG.error("Exception : " + e.getMessage());
			restResponse = new RestResponse<>(ERROR);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/updateApptStatus", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<String> updateApptStatus(@RequestBody AppointmentInfo appointmentInfo){
		RestResponse<String> restResponse = new RestResponse<>(SUCCESS);
		try {
			if(appointmentInfo.getChartIdExclList().size() >0)
				pendManagementService.updateChartStatus(appointmentInfo.getChartIdExclList(),"NONRETRIEVABLE", appointmentInfo.getRequestedUserId(), appointmentInfo.getLoginUserKey(),appointmentInfo.getBusFuncDtlKey(),appointmentInfo.getAppt().getApptKey(),appointmentInfo.getRetMethod(),"",appointmentInfo.getNoOfPendAttempts());
			if(appointmentInfo.getChartIdList().size() >0)
				pendManagementService.updateChartStatus(appointmentInfo.getChartIdList(),"PEND RELEASED", appointmentInfo.getRequestedUserId(), appointmentInfo.getLoginUserKey(),appointmentInfo.getBusFuncDtlKey(),appointmentInfo.getAppt().getApptKey(),appointmentInfo.getRetMethod(),"",appointmentInfo.getNoOfPendAttempts());
				//pendManagementService.updateApptStatus(appointmentInfo.getAppt().getApptKey(), appointmentInfo.getRequestedUserId(), appointmentInfo.getLoginUserKey(),appointmentInfo.getRetMethod(),"");
				
			}
		catch(Exception e){
			LOG.error("Exception : " + e.getMessage());
			restResponse = new RestResponse<>(ERROR);
		}
		return restResponse;
	}

}
