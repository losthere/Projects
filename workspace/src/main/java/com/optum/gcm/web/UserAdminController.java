package com.optum.gcm.web;

import static com.optum.gcm.common.util.LoggingUtil.logDebug;
import static com.optum.gcm.common.util.LoggingUtil.logInfo;
import static com.optum.gcm.model.RestResponse.ERROR;
import static com.optum.gcm.model.RestResponse.SUCCESS;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
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
import com.optum.gcm.model.GcmRoleVendors;
import com.optum.gcm.model.GcmUserVendorRole;
import com.optum.gcm.model.InsertStgUserObject;
import com.optum.gcm.model.KeyValue;
import com.optum.gcm.model.LoginProperties;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.model.StgExtUserFileInfo;
import com.optum.gcm.model.StgExtUserInfo;
import com.optum.gcm.model.UserFileHistory;
import com.optum.gcm.model.UserLogin;
import com.optum.gcm.model.UserResource;
import com.optum.gcm.sevice.UserCreationService;
import com.optum.gcm.sevice.UserRegistrationService;
import com.optum.gcm.web.util.WebUtil;

/**
 * @author rsankary
*/


@RequestMapping("/useradmin")
@RestController
public class UserAdminController {

	private static final Logger LOG = LoggerFactory.getLogger(UserAdminController.class);
	
	@Autowired
	UserCreationService userCreationService;
	
	@Autowired
	UserRegistrationService userRegistrationService;
	
	// If user exists then it will return all the required details else create user on login if user doesn't exist in the system 
	@PostMapping(value = "/createUser", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<UserResource> createUser(HttpServletRequest request) throws SQLException {
		String userName = WebUtil.getCookieValue(request.getCookies(), "USERNAME");
		String uuID = (String)request.getAttribute("uuid");
		String emailID = (String)request.getAttribute("email");
		String firstName = (String)request.getAttribute("firstname");
		String lastName = (String)request.getAttribute("lastname");
		String browserVersion = request.getHeader("user-agent");
		String clientAddress = request.getHeader("x-forwarded-for");
		
		logDebug(LOG, "User Details :  {}, {}, {}, {}, {}, {}, {} ", userName, uuID, emailID, firstName, lastName,
				browserVersion, clientAddress); 
		
		RestResponse<UserResource> restResponse = new RestResponse<>(SUCCESS);
		try {
			UserResource userDetails = userCreationService.createUser(userName, uuID, firstName, lastName, emailID, clientAddress, browserVersion);
			if(StringUtils.isBlank(userDetails.getUserKey())) {
				restResponse.setStatus(ERROR);
				restResponse.setErrorMessage("Exception occured while retrieving details.");
			}
			if(StringUtils.isNotBlank(userDetails.getErrorMsg()))	{
				restResponse.setStatus(ERROR);
				restResponse.setErrorMessage(userDetails.getErrorMsg());			
			}
			restResponse.setResult(userDetails);
		} catch (Exception e) { // this is for inactive.
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage("You do not have any active roles in the system. Please contact your Supervisor to activate roles.");
			LOG.error("Exception while executing createUser service ", e);
		}
		return restResponse;
		
	}
	
	@PostMapping(value = "/getUser", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<GCMUser> getUser(HttpServletRequest request) throws SQLException{
		RestResponse<GCMUser> restResponse = new RestResponse<GCMUser>(SUCCESS);
		String userName = WebUtil.getCookieValue(request.getCookies(), "USERNAME");
		GCMUser userObj = userCreationService.getUser(userName);
		if(null != userObj) {
			restResponse.setResult(userObj);
		}else {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage("User not exists");
		}
		return restResponse;
	}
	
	// Retrieve login properties like optumId url to login/register etc
	@PostMapping(value = "/getLoginProperties", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<LoginProperties> getLoginProperties()
	{
		RestResponse<LoginProperties> restResponse = new RestResponse<>(SUCCESS);
		try {
			LoginProperties userlogin = userCreationService.getLoginProperties();
			restResponse.setResult(userlogin);
		}catch(Exception e) {
			LOG.error("Exception : ", e);
		}		
		return restResponse;
	}
	
	// Recording user log off
	@PostMapping(value = "/recordUserLogOff")
	public RestResponse<UserLogin> recordUserLogOff(@RequestParam String userId,@RequestParam String logOffMode) {
		RestResponse<UserLogin> restResponse = new RestResponse<>(SUCCESS);
		try {
			UserLogin userlogin = userCreationService.recordUserLogOff(userId, logOffMode);
			restResponse.setResult(userlogin);
		}catch(Exception e) {
			LOG.error("Exception : ", e);
		}
		return restResponse;		
	}
	
	// Get uploaded user file history for a group
	@PostMapping(value = "/getUserFileHistory")
	public RestResponse<List<UserFileHistory>> getUserFileHistory(@RequestParam Long userGroupKey) {	
		logInfo(LOG, true, "User Group key : {}", userGroupKey);
		RestResponse<List<UserFileHistory>> restResponse = new RestResponse<>(SUCCESS);
		try {
			List<UserFileHistory> userFileHistory = userRegistrationService.getUserFileHistory(userGroupKey);
			restResponse.setResult(userFileHistory);
		}catch(Exception e) {
			LOG.error("Exception : ", e);
		}
		return restResponse;		
	}	
	
	// Retrieve roles by user and vendor
	@PostMapping(value = "/getUserRoles")
	public RestResponse<List<GcmUserVendorRole>> getUserRoles(@RequestParam Long loggedInUserKey,@RequestParam Long vendorKey) {	
		logInfo(LOG, true, "User key : {}", loggedInUserKey);
		logInfo(LOG, true, "vendorKey : {}", vendorKey);
		
		RestResponse<List<GcmUserVendorRole>> restResponse = new RestResponse<>(SUCCESS);
		try {
			List<GcmUserVendorRole> userRoles = userCreationService.getUserRoles(loggedInUserKey, vendorKey);
			restResponse.setResult(userRoles);
		}catch(Exception e) {
			LOG.error("Exception : ", e);
		}
		return restResponse;		
	}
	
	
	
	// Retrieve roles by user and vendor
	@PostMapping(value = "/getUserVendorByGroupKey")
	public RestResponse<List<GcmRoleVendors>> getUserVendorByGroupKey(@RequestParam Long loggedInUserKey,@RequestParam Long groupKey) {	
		
		RestResponse<List<GcmRoleVendors>> restResponse = new RestResponse<>(SUCCESS);
		try {
			List<GcmRoleVendors> userRoles = userCreationService.getUserVendorByGroupKey(loggedInUserKey, groupKey);
			restResponse.setResult(userRoles);
		}catch(Exception e) {
			LOG.error("Exception : ", e);
		}
		return restResponse;		
	}
	
	@PostMapping(value = "/getUserRegionsByGroupKey")
	public RestResponse<List<KeyValue<String, String>>> getUserRegionsByGroup(@RequestParam Long userKey, @RequestParam Long groupKey, @RequestParam String roleCode, @RequestParam Long vendorKey){
		RestResponse<List<KeyValue<String, String>>> restResponse = new RestResponse<>(SUCCESS);
		try {
			List<KeyValue<String, String>> userRoles = userCreationService.getUserRegionsByGroup(userKey, groupKey, roleCode, vendorKey);
			restResponse.setResult(userRoles);
		}catch(Exception e) {
			LOG.error("Exception : ", e);
		}
		return restResponse;
	}
	
	// Adding a role to a user for a vendor
	@PostMapping(value = "/addUserRole")
	public RestResponse<Boolean> addUserRole(@RequestParam Long userKey,@RequestParam String roleCode,@RequestParam String vendorKey) {	
		logInfo(LOG, true, "User key : {}", userKey);
		logInfo(LOG, true, "roleCode : {}", roleCode);
		logInfo(LOG, true, "vendorKey : {}", vendorKey);
		RestResponse<Boolean> restResponse = new RestResponse<>(SUCCESS);
		try {
			boolean userRoles = userCreationService.addRolesToUser(userKey, roleCode, vendorKey);
			restResponse.setResult(userRoles);
		}catch(Exception e) {
			LOG.error("Exception : ", e);
		}
		return restResponse;		
	}
	
	// Get users list from stg ext user info table
	@PostMapping(value = "/getValidatedExtUsers", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<StgExtUserInfo>> getValidatedExtUsers(@RequestBody StgExtUserFileInfo stgExtUserFileInfo) {	
		Long stgExtUserFileInfoKey = stgExtUserFileInfo.getStgExtUserFileInfoKey();
		Long groupKey = stgExtUserFileInfo.getGcmGroupKey();
		logInfo(LOG, true, "User File key : {}", stgExtUserFileInfoKey);
		
		RestResponse<List<StgExtUserInfo>> restResponse = new RestResponse<>(SUCCESS);
		try {
			List<StgExtUserInfo> extUsers = userRegistrationService.getValidatedExtUsers(stgExtUserFileInfoKey,groupKey);
			restResponse.setResult(extUsers);
		}catch(Exception e) {
			LOG.error("Exception : ", e);
		}
		return restResponse;		
	}	
	
	// Get validated user from stg ext user info table
	@PostMapping(value = "/getValidExtUser")
	public RestResponse<StgExtUserInfo> getValidExtUser(@RequestParam String email) {	
		logInfo(LOG, true, "Ext user email : {} ", email);		
		RestResponse<StgExtUserInfo> restResponse = new RestResponse<>(SUCCESS);
		try {
			StgExtUserInfo extUser = userRegistrationService.getValidExtUser(email);
			restResponse.setResult(extUser);
		}catch(Exception e) {
			LOG.error("Exception : ", e);
		}
		return restResponse;		
	}
	
	// Bulk upload of users by Supervisor
	@PostMapping(value = "/validateAndInsertExtUsers", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<InsertStgUserObject> validateAndInsertExtUsers(@RequestBody InsertStgUserObject insertStgUserObject) {	
		logInfo(LOG, true, "InsertStgUserObject : {} ", insertStgUserObject);		
		RestResponse<InsertStgUserObject> restResponse = new RestResponse<>(SUCCESS);
		try {
			InsertStgUserObject insertedObj = userRegistrationService.validateAndInsertExtUsers(insertStgUserObject);
			restResponse.setResult(insertedObj);
		}catch(Exception e) {
			LOG.error("Exception : ", e);
			restResponse.setErrorMessage(e.getMessage());
			restResponse.setStatus(ERROR);
		}
		return restResponse;		
	}
	
	// Bulk upload of users by Supervisor
	@PostMapping(value = "/validateAndUpdateExtUsers", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<InsertStgUserObject> validateAndUpdateExtUsers(@RequestBody InsertStgUserObject insertStgUserObject) {	
		logInfo(LOG, true, "InsertStgUserObject : {}", insertStgUserObject);		
		RestResponse<InsertStgUserObject> restResponse = new RestResponse<>(SUCCESS);
		try {
			InsertStgUserObject insertedObj = userRegistrationService.validateAndUpdateExtUsers(insertStgUserObject);
			restResponse.setResult(insertedObj);
			restResponse.setStatus(SUCCESS);
		}catch(Exception e) {
			LOG.error("Exception : ", e);
			restResponse.setErrorMessage(e.getMessage());
			restResponse.setStatus(ERROR);
		}
		return restResponse;		
	}
	
	// Send mail to user after Supervisor uploads successfully in to the system
	@PostMapping(value = "/sendUserRegistrationMailForExtUser")
	public RestResponse<Integer> sendUserRegistrationMailForExtUser(@RequestParam Long stgExtUserInfoKey) {	
		logInfo(LOG, true, "User info key : {}", stgExtUserInfoKey);		
		RestResponse<Integer> restResponse = new RestResponse<>(SUCCESS);
		try {
			int responseCode = userRegistrationService.sendUserRegistrationMailForExtUser(stgExtUserInfoKey, null);
			restResponse.setResult(responseCode);
			if(responseCode == 115) {
				restResponse.setStatus(SUCCESS);
			}else if(responseCode == 113) {
				restResponse.setStatus(ERROR);
				restResponse.setErrorMessage("Subject is not available to send User Registration mail");
			}else if(responseCode == 112) {
				restResponse.setStatus(ERROR);
				restResponse.setErrorMessage("Mail Content is not available to send User Registration mail");
			}else if(responseCode == 114) {
				restResponse.setStatus(ERROR);
				restResponse.setErrorMessage("FROM configuration not available to send User Registration mail");
			}
		}catch(Exception e) {
			LOG.error("Exception : ", e);
		}
		return restResponse;		
	}	
	
}
