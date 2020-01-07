package com.optum.gcm.web;

import static com.optum.gcm.model.RestResponse.ERROR;
import static com.optum.gcm.model.RestResponse.SUCCESS;

import java.sql.SQLException;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.optum.gcm.model.CancelBarcodesInfo;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.model.RetrievalSearchFilter;
import com.optum.gcm.model.RetrievalSearchFilterWrapper;
import com.optum.gcm.sevice.RetrievalActionsService;

@RequestMapping("/retrieval")
@RestController
public class RetrievalActionsController {

	@Autowired
	private RetrievalActionsService retrievalActionsService;

	@RequestMapping("/release")
	public RestResponse<String> releaseProject(
			@RequestBody List<RetrievalSearchFilter> projectDetails)
			throws SQLException {
		String status = retrievalActionsService.releaseByProject(projectDetails);
		if(status.equalsIgnoreCase(SUCCESS))
			return new RestResponse<>(SUCCESS);
		else
		{
			RestResponse<String> response = new RestResponse<>(ERROR);
			response.setErrorMessage("Release action failed.  Barcodes must be in a valid status for 'Release' function.");
			return response;
		}
	}
	
	@RequestMapping("/cancel")
	public RestResponse<String> cancelProject(
			@RequestBody List<RetrievalSearchFilter> projectDetails)
			throws SQLException {
		retrievalActionsService.cancelByProjectDetails(projectDetails);
		return new RestResponse<>(SUCCESS);
	}
	
	@RequestMapping("/inactivate")
	public RestResponse<String> inactivateProject(
			@RequestBody List<RetrievalSearchFilter> projectDetails)
			throws SQLException {
		retrievalActionsService.inactivateByProjectDetails(projectDetails);
		return new RestResponse<>(SUCCESS);
	}
	
	@RequestMapping("/assignVendors")
	public RestResponse<String> assignVendors(
			@RequestBody RetrievalSearchFilterWrapper projectDetails)
			throws SQLException {
		retrievalActionsService.assignVendors(projectDetails);
		return new RestResponse<>(SUCCESS);
	}
	@RequestMapping("/sendExtract")
	public RestResponse<String> sendExtract(
			@RequestBody List<RetrievalSearchFilter> projectDetails)
			throws SQLException {
		RestResponse<String> response =  new RestResponse<String>();
		String statusMsg = retrievalActionsService.sendExtract(projectDetails);
		if(StringUtils.isBlank(statusMsg)) {
			response.setStatus(SUCCESS);
		}else {
			response.setStatus(ERROR);
			response.setErrorMessage(statusMsg);
		}		
		return response;
	}
	@RequestMapping("/reviewExtract")
	public RestResponse<String> reviewExtract(
			@RequestBody List<RetrievalSearchFilter> projectDetails)
			throws SQLException {
		RestResponse<String> response =  new RestResponse<String>();
		String statusMsg = retrievalActionsService.reviewExtract(projectDetails);
		if(StringUtils.isBlank(statusMsg)) {
			response.setStatus(SUCCESS);
		}else {
			response.setStatus(ERROR);
			response.setErrorMessage(statusMsg);
		}		
		return response;
	}
	
	@RequestMapping("/cancelBarcodes")
	public RestResponse<String> cancelBarcodes(@RequestBody CancelBarcodesInfo cancelBarcodesInfo) {
		RestResponse<String> response =  new RestResponse<String>();
		String statusMsg = retrievalActionsService.cancelBarcodes(cancelBarcodesInfo);
		if(null != statusMsg && "SUCCESS".equalsIgnoreCase(statusMsg)) {
			response.setStatus(SUCCESS);
		}else {
			response.setStatus(ERROR);
			response.setErrorMessage(statusMsg);
		}		
		return response;
	}
}
