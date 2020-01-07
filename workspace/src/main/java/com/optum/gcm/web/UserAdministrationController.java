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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.optum.gcm.model.GCMUser;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.model.Role;
import com.optum.gcm.model.UserAdminFilter;
import com.optum.gcm.model.UserAdminModel;
import com.optum.gcm.model.VendorReqObj;
import com.optum.gcm.sevice.UserAdministrationService;

@RequestMapping("/user/administration")
@RestController
public class UserAdministrationController {
	
	private static final Logger LOG = LoggerFactory.getLogger(UserAdministrationController.class);
	
	@Autowired
	private UserAdministrationService userAdministrationService;
	
	@PostMapping(value = "/getUserAdminList", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<UserAdminModel>> getUserAdminList(@RequestBody UserAdminFilter userAdminFilter) throws SQLException {
		LOG.info("getUserAdminList started with search filter: ");
		RestResponse<List<UserAdminModel>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(userAdministrationService.getUserAdminList(userAdminFilter));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getUserAdminList ", e);
		}
		return restResponse;
	}
	
	@PostMapping("/changeSupervisor")
	public RestResponse<String> changeSupervisor(@RequestBody List<UserAdminModel> users) throws SQLException {
		LOG.info("changeSupervisor calling....");
		RestResponse<String> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(userAdministrationService.changeSupervisor(users));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getUserAdminList ", e);
		}
		return restResponse;
	}
	
	@PostMapping("/inactiveUser")
	public RestResponse<String> InactiveUser(
			@RequestParam Long userKey, @RequestParam Long loginUserKey) throws SQLException {
		LOG.info("inactiveUser method calling...: ");
		RestResponse<String> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(userAdministrationService.InactivateUser(userKey, loginUserKey));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while inactivating User ", e);
		}
		return restResponse;
	}
	
	@PostMapping("/activateUser")
	public RestResponse<String> activateUser(@RequestParam String emailid, @RequestParam Long userKey, @RequestParam Long loginUserKey, @RequestParam Long supervisorKey, @RequestParam List<String> roleCodes, @RequestParam Long vendorKey) throws SQLException {
		LOG.info("inactiveUser method calling...: ");
		RestResponse<String> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(userAdministrationService.activateUser(emailid, userKey, loginUserKey, supervisorKey, roleCodes, vendorKey));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while inactivating User ", e);
		}
		return restResponse;
	}
	
	@PostMapping("/validateUser")
	public RestResponse<GCMUser> validateUser(@RequestParam String emailid, @RequestParam Long userKey) throws SQLException{
		RestResponse<GCMUser> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(userAdministrationService.validateUser(emailid, userKey));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while inactivating User ", e);
		}
		return restResponse;
	}
	
	@PostMapping("/getUserRolesList")
	public RestResponse<List<Role>> getUserRolesList(
			@RequestParam Long userKey, @RequestParam Long vendorKey) throws SQLException {
		logInfo(LOG, true, "activateUser calling for user key: {}", userKey);
		RestResponse<List<Role>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(userAdministrationService.getUserRolesList(userKey, vendorKey));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while activating User ", e);
		}
		return restResponse;
	}
	
	@PostMapping("/updateUserRoles")
	public RestResponse<String> updateUserRoles(
			@RequestParam Long userKey, @RequestParam Long vendorKey, @RequestParam Long loginUserKey, @RequestParam List<String> roleCodes, @RequestParam List<String> existingRoleCodes, @RequestParam String userId) throws SQLException {
		logInfo(LOG, true, "updateUserRoles calling for user key: {}", userKey);
		RestResponse<String> restResponse = new RestResponse<>(SUCCESS);
		try {
			String result = userAdministrationService.updateUserRoles(userKey, vendorKey, loginUserKey, roleCodes, existingRoleCodes,userId, true);
			restResponse.setResult(result);
			//restResponse.setResult(userAdministrationService.updateUserRoles(userKey, vendorKey, loginUserKey, roleCodes));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while updating UserRoles ", e);
		}
		return restResponse;
	}
	
	@PostMapping("/updateUserVendors")
	public RestResponse<String> updateUserVendors(
			 @RequestBody VendorReqObj vendorReqObj) throws SQLException {
		RestResponse<String> restResponse = new RestResponse<>(SUCCESS);
		try {
			boolean result = userAdministrationService.updateUserVendors(vendorReqObj);
			if(result) {
			restResponse.setResult(SUCCESS);
			}
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while updating UserVendors ", e);
		}
		return restResponse;
	}
	
}
