package com.optum.gcm.web;

import static com.optum.gcm.model.RestResponse.SUCCESS;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.optum.gcm.model.GcmBusFuncDetail;
import com.optum.gcm.model.GcmConfigInput;
import com.optum.gcm.model.KeyValue;
import com.optum.gcm.model.OptumInventoryInput;
import com.optum.gcm.model.PendWorklistUpdate;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.model.Role;
import com.optum.gcm.model.SegmentProjects;
import com.optum.gcm.model.User;
import com.optum.gcm.model.Vendor;
import com.optum.gcm.sevice.MasterDataService;

@RequestMapping("/masterdata")
@RestController
public class MasterDataController {
	

	@Autowired
	private MasterDataService masterDataService;

	@PostMapping("/businesssegments")
	public RestResponse<List<KeyValue<String, String>>> getBusinessSegments() {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> businessSegments = masterDataService.getBusinessSegments();
		response.setStatus(SUCCESS);
		response.setResult(businessSegments);
		return response;
	}

	@PostMapping("/busSegsByUserAssociation")
	public RestResponse<List<KeyValue<String, String>>> getBusSegByUserAssociation(@RequestParam Long userKey) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> businessSegments = masterDataService.getBusSegByUserAssociation(userKey);
		response.setStatus(SUCCESS);
		response.setResult(businessSegments);
		return response;
	}

	@PostMapping("/programs")
	public RestResponse<List<KeyValue<String, String>>> getPrograms(@RequestParam String businessSegment) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> businessSegments = masterDataService
				.getProgramsByBusinessSegment(businessSegment);
		response.setStatus(SUCCESS);
		response.setResult(businessSegments);
		return response;
	}

	@PostMapping("/programsByUserAssociation")
	public RestResponse<List<KeyValue<String, String>>> getProgramsByUserAssociation(
			@RequestParam String businessSegment, @RequestParam Long userKey) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> businessSegments = masterDataService
				.getProgramsByUserAssociation(businessSegment, userKey);
		response.setStatus(SUCCESS);
		response.setResult(businessSegments);
		return response;
	}

	@PostMapping("/projectYears")
	public RestResponse<List<Long>> getProjectYears(@RequestParam String businessSegment,
			@RequestParam Long programKey) {
		RestResponse<List<Long>> response = new RestResponse<>();
		List<Long> projectYears = masterDataService.getProjectYearsByBusSegAndProgram(businessSegment, programKey);
		response.setStatus(SUCCESS);
		response.setResult(projectYears);
		return response;
	}
	
	
	@PostMapping("/chartScoreGroup")
	public RestResponse<List<Long>> getChartScore() {
		RestResponse<List<Long>> response = new RestResponse<>();
		List<Long> chartScore = masterDataService.getChartScore();
		response.setStatus(SUCCESS);
		response.setResult(chartScore);
		return response;
	}

	@PostMapping("/provSpecCodes")
	public RestResponse<List<KeyValue<String, String>>> getProvSpecCodes() {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> provSpecCodes = masterDataService.getProvSpecCodes();
		response.setStatus(SUCCESS);
		response.setResult(provSpecCodes);
		return response;
	}
	
	@PostMapping("/states")
	public RestResponse<List<KeyValue<String, String>>> getStates() {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> states = masterDataService.getStates();
		response.setStatus(SUCCESS);
		response.setResult(states);
		return response;
	}

	@PostMapping("/vendors")
	public RestResponse<List<KeyValue<String, String>>> getVendors(@RequestParam String businessSegment,
			@RequestParam Long programKey, @RequestParam Long businessFuncKey, @RequestParam Long hpKey) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> vendors = masterDataService.getVendorsByFilter(businessSegment, programKey,
				businessFuncKey, hpKey);
		response.setStatus(SUCCESS);
		response.setResult(vendors);
		return response;
	}
	
	@PostMapping("/vendorListDetails")
	public RestResponse<List<Vendor>> getVendorListDetails( @RequestParam Long userKey, @RequestParam Long groupKey,  @RequestParam String roleCode, @RequestParam Long supUserKey) {
		RestResponse<List<Vendor>> response = new RestResponse<>();
		List<Vendor> vendors = masterDataService.getVendorListDetails(userKey, groupKey, roleCode,supUserKey);
		response.setStatus(SUCCESS);
		response.setResult(vendors);
		return response;
	}

	@PostMapping("/vendorsByUserAssociation")
	public RestResponse<List<KeyValue<String, String>>> getVendorsByUserAssociation(
			@RequestParam String businessSegment, @RequestParam Long programKey, @RequestParam Long businessFuncKey,
			@RequestParam Long hpKey, @RequestParam Long loginUserKey, @RequestParam Long groupKey,  @RequestParam String roleCode) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> vendors = masterDataService.getVendorsByUserAssociation(businessSegment,
				programKey, businessFuncKey, hpKey, loginUserKey, groupKey, roleCode);
		response.setStatus(SUCCESS);
		response.setResult(vendors);
		return response;
	}
	
	@PostMapping("/vendorsAssignedByUser")
	public RestResponse<List<KeyValue<String, String>>> getVendorsAssignedByUser(
			@RequestParam String businessSegment, @RequestParam Long programKey, @RequestParam Long businessFuncKey,
			@RequestParam Long hpKey, @RequestParam Long supervisorKey, @RequestParam Long groupKey,  @RequestParam String roleCode) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> vendors = masterDataService.getVendorsAssignedByUser(businessSegment,
				programKey, businessFuncKey, hpKey, supervisorKey , groupKey, roleCode);
		response.setStatus(SUCCESS);
		response.setResult(vendors);
		return response;
	}
	
	@PostMapping("/vendorsForUserProfile")
	public RestResponse<List<KeyValue<String, String>>> getVendorsForUserProfile(@RequestParam Long groupKey, @RequestParam Long userKey) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> vendors = masterDataService.getVendorsForUserProfile(groupKey, userKey);
		response.setStatus(SUCCESS);
		response.setResult(vendors);
		return response;
	}
	
	@PostMapping("/vendorsByUserRole")
	public RestResponse<List<KeyValue<String, String>>> getVendorsByUserRole(@RequestParam Long loginUserKey, @RequestParam Long groupKey,  @RequestParam String roleCode) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> vendors = masterDataService.getVendorsByUserRole(loginUserKey, groupKey, roleCode);
		response.setStatus(SUCCESS);
		response.setResult(vendors);
		return response;
	}
	
	
	@PostMapping("/vendorsByInvFilter")
	public RestResponse<List<KeyValue<String, String>>> getVendorsByInvFilter(
			@RequestBody OptumInventoryInput optInvInput) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> vendors = masterDataService.getVendorsByInvFilter(optInvInput);
		response.setStatus(SUCCESS);
		response.setResult(vendors);
		return response;
	}
	
	

	@PostMapping("/clients")
	public RestResponse<List<KeyValue<String, String>>> getClients(@RequestParam Long loginUserKey) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> clients = masterDataService.getClients(loginUserKey);
		response.setStatus(SUCCESS);
		response.setResult(clients);
		return response;
	}

	@PostMapping("/clientsByUserAssociation")
	public RestResponse<List<KeyValue<String, String>>> getClientsByUserAssociation(@RequestParam Long userKey) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> clients = masterDataService.getClientsByUserAssociation(userKey);
		response.setStatus(SUCCESS);
		response.setResult(clients);
		return response;
	}

	@PostMapping("/healthPlans")
	public RestResponse<List<KeyValue<String, String>>> getHealthPlans(@RequestParam String businessSegment,
			Long clientKey) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> healthPlans = masterDataService.getHPByBusSegAndClient(businessSegment,
				clientKey);
		response.setStatus(SUCCESS);
		response.setResult(healthPlans);
		return response;
	}

	@PostMapping("/healthPlansByUserAssociation")
	public RestResponse<List<KeyValue<String, String>>> getHealthPlansByUserAssociation(
			@RequestParam String businessSegment, @RequestParam Long clientKey, @RequestParam Long userKey) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> healthPlans = masterDataService.getHealthPlansByUserAssociation(businessSegment,
				clientKey, userKey);
		response.setStatus(SUCCESS);
		response.setResult(healthPlans);
		return response;
	}

	@PostMapping("/hPProducts")
	public RestResponse<List<String>> getHealthPlanProducts(@RequestParam String businessSegment,
			@RequestParam Long hpKey) {
		RestResponse<List<String>> response = new RestResponse<>();
		List<String> healthPlanProducts = masterDataService.getHPProductByBusSegAndHP(businessSegment, hpKey);
		response.setStatus(SUCCESS);
		response.setResult(healthPlanProducts);
		return response;
	}

	@PostMapping("/hPProductsByUserAssociation")
	public RestResponse<List<String>> getHealthPlanProductsByUserAssociation(@RequestParam String businessSegment,
			@RequestParam Long hpKey, @RequestParam Long userKey) {
		RestResponse<List<String>> response = new RestResponse<>();
		List<String> healthPlanProducts = masterDataService.getHealthPlanProductsByUserAssociation(businessSegment, hpKey,
				userKey);
		response.setStatus(SUCCESS);
		response.setResult(healthPlanProducts);
		return response;
	}

	@PostMapping(value = "/getUsersByRoleCode", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<KeyValue<String, String>>> getUsersByRoleCode(
			@RequestBody PendWorklistUpdate pendWorklistUpdate) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<String> roleCode = pendWorklistUpdate.getRoleCodes();
		List<KeyValue<String, String>> user = masterDataService.getUsersByRoleCode(roleCode,
				pendWorklistUpdate.getLoginUserKey());
		response.setStatus(SUCCESS);
		response.setResult(user);
		return response;
	}

	@PostMapping("/getUsersForSupervisor")
	public RestResponse<List<KeyValue<String, String>>> getUsersForSupervisor(@RequestParam String vendorKey,
			@RequestParam String role, @RequestParam String userKey) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> user = masterDataService.getUsersForSupervisor(vendorKey, role, userKey);
		response.setStatus(SUCCESS);
		response.setResult(user);
		return response;
	}

	@PostMapping("/getUsersCountBySupervisor")
	public RestResponse<List<KeyValue<String, String>>> getUsersCountBySupervisor(@RequestParam String userKey,
			@RequestParam String roleCode, @RequestParam String vendorKey, @RequestParam String busFuncDetailKey) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> user = masterDataService.getUsersCountBySupervisor(userKey, roleCode, vendorKey,
				busFuncDetailKey);
		response.setStatus(SUCCESS);
		response.setResult(user);
		return response;
	}

	@PostMapping("/projects")
	public RestResponse<List<KeyValue<String, String>>> getProjects(@RequestParam String businessSegment,
			@RequestParam Long loginUserKey, @RequestParam Long groupKey) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> projects = masterDataService.getProjects(businessSegment, loginUserKey, groupKey);
		response.setStatus(SUCCESS);
		response.setResult(projects);
		return response;
	}

	@PostMapping("/projectsByUser")
	public RestResponse<List<KeyValue<String, String>>> getProjectsByUserKey(@RequestParam Long loginUserKey, @RequestParam Long groupKey, @RequestParam String vendor, @RequestParam String userId, @RequestParam String roleCode, @RequestParam String region) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> projects = masterDataService.getProjectsByUserKey(loginUserKey,  groupKey,  vendor,  userId,  roleCode,  region);
		response.setStatus(SUCCESS);
		response.setResult(projects);
		return response;
	}
	
		@PostMapping("/projectsByInvFilter")
	public RestResponse<List<KeyValue<String, String>>> getProjectsByInvFilter(@RequestBody OptumInventoryInput optInvInput) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> projects = masterDataService.getProjectsByInvFilter(optInvInput);
		response.setStatus(SUCCESS);
		response.setResult(projects);
		return response;
	}
	
	@PostMapping("/projectsByInvFilterForUtility")
	public RestResponse<List<KeyValue<String, String>>> getProjectsByInvFilterForUtility(@RequestBody OptumInventoryInput optInvInput) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> projects = masterDataService.getProjectsByInvFilterForUtility(optInvInput);
		response.setStatus(SUCCESS);
		response.setResult(projects);
		return response;
	}

	@PostMapping("/statuses")
	public RestResponse<List<KeyValue<String, String>>> getStatuses(@RequestParam String workFlow , @RequestParam Boolean isUtility) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> statuses = masterDataService.getBusinessFunctionStatus(4L, workFlow ,isUtility);
		response.setStatus(SUCCESS);
		response.setResult(statuses);
		return response;
	}

	@PostMapping("/getProviderDetails")
	public RestResponse<List<String>> getProviderDetails(@RequestParam Long groupKey, @RequestParam String fieldVal,
			@RequestParam String fieldNm) {
		RestResponse<List<String>> response = new RestResponse<>();
		List<String> statuses = masterDataService.getProviderDetails(groupKey, fieldVal, fieldNm);
		response.setStatus(SUCCESS);
		response.setResult(statuses);
		return response;
	}

	@PostMapping("/getSupervisors")
	public RestResponse<List<User>> getSupervisors(@RequestParam Long loginUserKey, @RequestParam Long vendorKey,
			@RequestParam Long groupKey, @RequestParam String roleCode) {
		RestResponse<List<User>> response = new RestResponse<>();
		List<User> supervisors = masterDataService.getSupervisors(loginUserKey, vendorKey, groupKey, roleCode);
		response.setStatus(SUCCESS);
		response.setResult(supervisors);
		return response;
	}
	
	@PostMapping("/getSupervisorsByVendor")
	public RestResponse<List<User>> getSupervisorsByVendor(@RequestParam Long loginUserKey, @RequestParam Long vendorKey,
			@RequestParam Long groupKey, @RequestParam String roleCode) {
		RestResponse<List<User>> response = new RestResponse<>();
		List<User> supervisors = masterDataService.getSupervisorsByVendor(loginUserKey, vendorKey, groupKey, roleCode);
		response.setStatus(SUCCESS);
		response.setResult(supervisors);
		return response;
	}
	
	@PostMapping("/getRolesByGroupVendor")
	public RestResponse<List<Role>> getRolesByGroupVendor(@RequestParam Long loginUserKey, @RequestParam Long vendorKey,
			@RequestParam Long groupKey, @RequestParam String roleCode) {
		RestResponse<List<Role>> response = new RestResponse<>();
		List<Role> roleList = masterDataService.getRolesByGroupVendor(loginUserKey, vendorKey, groupKey, roleCode);
		response.setStatus(SUCCESS);
		response.setResult(roleList);
		return response;
	}
	
	
	

	@PostMapping("/reasonCodes")
	public RestResponse<List<KeyValue<String, String>>> reasonCodes(@RequestParam String reasonType,
			@RequestParam Long busFuncKey) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> reasonCodes = masterDataService.getReasonCodes(reasonType, busFuncKey);
		response.setStatus(SUCCESS);
		response.setResult(reasonCodes);
		return response;
	}

	@PostMapping("/SegmentProjects")
	public RestResponse<List<SegmentProjects>> segmentProjects(@RequestParam Long loginUserKey) {
		RestResponse<List<SegmentProjects>> response = new RestResponse<>();
		List<SegmentProjects> projects = masterDataService.segmentProjects(loginUserKey);
		response.setStatus(SUCCESS);
		response.setResult(projects);
		return response;
	}

	@PostMapping("/roles")
	public RestResponse<List<Role>> getRoles(@RequestParam Long loginUserKey) {
		RestResponse<List<Role>> response = new RestResponse<>();
		List<Role> roles = masterDataService.getRoles();
		response.setStatus(SUCCESS);
		response.setResult(roles);
		return response;
	}
	
	@PostMapping(value = "/isBusFuncConfigured")
	public RestResponse<List<KeyValue<String, String>>> isBusFuncConfigured(@RequestBody GcmConfigInput gcmConfigInput) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();		
		List<KeyValue<String, String>> isBusFuncConfigured = masterDataService.isBusFuncConfigured(gcmConfigInput);
		response.setStatus(SUCCESS);
		response.setResult(isBusFuncConfigured);
		return response;
	}
	
	@PostMapping("/businessFunctionDetails")
	public RestResponse<List<GcmBusFuncDetail>> getBusinessFunctionDetails() {
		RestResponse<List<GcmBusFuncDetail>> response = new RestResponse<>();
		List<GcmBusFuncDetail> busdetails = masterDataService.getBusinessFunctionDetails(9L);
		response.setStatus(SUCCESS);
		response.setResult(busdetails);
		return response;
	}
	
	@PostMapping("/isRetrievalConfigured")
	public RestResponse<Boolean> isRetrievalConfigured(@RequestParam Integer groupKey){
		RestResponse<Boolean> response = new RestResponse<>();
		Boolean isRetConfig = masterDataService.isRetrievalConfigured(groupKey);
		response.setStatus(SUCCESS);
		response.setResult(isRetConfig);
		return response;
	}
	
	
	@PostMapping("/isServiceConfigured")
	public RestResponse<Boolean> isServiceConfigured(@RequestParam String serviceName, @RequestParam Integer groupKey){
		RestResponse<Boolean> response = new RestResponse<>();
		Boolean isRetConfig = masterDataService.isServiceConfigured(serviceName, groupKey);
		response.setStatus(SUCCESS);
		response.setResult(isRetConfig);
		return response;
	}
	
	@PostMapping("/vendorsbygroup")
	public RestResponse<List<KeyValue<String, String>>> getVendorsByGroup(@RequestParam Integer groupKey) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> vendors = masterDataService.getVendorsByGroup(groupKey);
		response.setStatus(SUCCESS);
		response.setResult(vendors);
		return response;
	}
	
	@PostMapping("/groups")
	public RestResponse<List<KeyValue<String, String>>> getConfiguredGroups(Long userKey){
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> groupList = masterDataService.getConfiguredGroups(userKey);
		response.setStatus(SUCCESS);
		response.setResult(groupList);
		return response;
	}
}
