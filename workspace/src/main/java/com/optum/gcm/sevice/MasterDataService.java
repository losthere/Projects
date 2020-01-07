package com.optum.gcm.sevice;

import java.util.List;

import com.optum.gcm.model.GcmBusFuncDetail;
import com.optum.gcm.model.GcmConfigInput;
import com.optum.gcm.model.KeyValue;
import com.optum.gcm.model.OptumInventoryInput;
import com.optum.gcm.model.Role;
import com.optum.gcm.model.SegmentProjects;
import com.optum.gcm.model.User;
import com.optum.gcm.model.Vendor;

public interface MasterDataService {
	List<KeyValue<String, String>> getBusinessSegments();
	
	/**
	 * @param userKey
	 * @return List<KeyValue<String, String>>
	 * Association : (User --> Vendor --> Group) <--> ( BS --> Client --> Hp --> Hp Product )
	 */
	List<KeyValue<String, String>> getBusSegByUserAssociation(Long userKey);

	List<KeyValue<String, String>> getBusinessSegmentsByUser(String userId);
	

	List<KeyValue<String, String>> getProgramsByBusinessSegment(
			String businessSegment);
	
	/**
	 * @param businessSegment
	 * @param userKey
	 * @return List<KeyValue<String, String>>
	 * Association : (User --> Vendor --> Group) <--> ( BS --> Client --> Hp --> Hp Product )
	 */
	List<KeyValue<String, String>> getProgramsByUserAssociation(
			String businessSegment,Long userKey);

	List<Long> getProjectYearsByBusSegAndProgram(String businessSegment,
			Long programKey);
	
	
	List<Long> getChartScore();
	
	List<KeyValue<String, String>> getStates();
	
	List<KeyValue<String, String>> getProvSpecCodes();

	List<Vendor> getVendorListDetails(Long userKey,Long groupKey,String roleCode,Long supUserKey);
	
	List<KeyValue<String, String>> getVendorsByFilter(String businessSegment,
			Long programKey, Long businessFunctionKey, Long hpKey);
	
	/**
	 * @param businessSegment
	 * @param programKey
	 * @param businessFunctionKey
	 * @param hpKey
	 * @param userKey
	 * @return List<KeyValue<String, String>>
	 * Association : (User --> Vendor --> Group) <--> ( BS --> Client --> Hp --> Hp Product )
	 */
	List<KeyValue<String, String>> getVendorsByUserAssociation(String businessSegment,
			Long programKey, Long businessFunctionKey, Long hpKey,Long userKey, Long groupKey, String roleCode);
	
	
	List<KeyValue<String, String>> getVendorsByUserRole(Long userKey, Long groupKey, String roleCode);
	
	List<KeyValue<String, String>> getVendorsByInvFilter(OptumInventoryInput optInvInput);

	List<KeyValue<String, String>> getClients(Long userKey);
	
	/**
	 * @param loginUserKey
	 * @return List<KeyValue<String, String>>
	 * Association : (User --> Vendor --> Group) <--> ( BS --> Client --> Hp --> Hp Product )
	 */
	List<KeyValue<String, String>> getClientsByUserAssociation(Long loginUserKey);
	
	List<KeyValue<String, String>> getHPByBusSegAndClient(
			String businessSegment, Long clientKey);
	
	/**
	 * @param businessSegment
	 * @param clientKey
	 * @param userKey
	 * @return List<KeyValue<String, String>>
	 * Association : (User --> Vendor --> Group) <--> ( BS --> Client --> Hp --> Hp Product )
	 */
	List<KeyValue<String, String>> getHealthPlansByUserAssociation(
			String businessSegment, Long clientKey,Long userKey);
	

	List<String> getHPProductByBusSegAndHP(String businessSegment, Long hpKey);
	
	/**
	 * @param businessSegment
	 * @param hpKey
	 * @param userKey
	 * @return List<String>
	 * Association : (User --> Vendor --> Group) <--> ( BS --> Client --> Hp --> Hp Product )
	 */
	List<String> getHealthPlanProductsByUserAssociation(String businessSegment, Long hpKey,Long userKey);
	
	
	List<KeyValue<String, String>> getBusinessFunctionStatus(
			Long businessFunctionKey, String workFlow , Boolean isUtility);

	List<KeyValue<String, String>> getUsersForSupervisor(String vendorKey,
			String role, String userKey);

	List<KeyValue<String, String>> getUsersCountBySupervisor(String userKey,
			String roleCode, String vendorKey, String busFuncDetailKey);

	List<SegmentProjects> segmentProjects(Long loginUserKey);
	
	List<KeyValue<String, String>> getProjects(String businessSegment,
			Long loginUserKey, Long groupKey);
	
	List<KeyValue<String, String>> getProjectsByUserKey(Long loginUserKey, Long groupKey, String vendor, String userId, String roleCode, String region);
	
	List<KeyValue<String, String>> getProjectsByInvFilter(OptumInventoryInput optInvInput); 
	
	List<String> getProviderDetails(Long groupKey, String fieldVal, String fieldNm);

	List<User> getSupervisors(Long loginUserKey, Long vendorKey, Long groupKey, String roleCode);
	
	List<User> getSupervisorsByVendor(Long loginUserKey, Long vendorKey, Long groupKey, String roleCode);
	
	List<Role> getRolesByGroupVendor(Long loginUserKey, Long vendorKey, Long groupKey, String roleCode);
	
	List<KeyValue<String, String>> getReasonCodes(String reasonType, Long busFuncKey);

	

	List<KeyValue<String, String>> getUsersByRoleCode(List<String> roleCode,
			Long loginUserKey);
	
	List<Role> getRoles();
	
	List<GcmBusFuncDetail> getBusinessFunctionDetails(Long gcmBusinessFuncKey);

	List<KeyValue<String, String>> getProjectsByInvFilterForUtility(OptumInventoryInput optInvInput);
	
	Boolean isRetrievalConfigured(Integer groupKey);
	
	Boolean isServiceConfigured(String serviceName, Integer groupKey);

	List<KeyValue<String, String>> getVendorsAssignedByUser(String businessSegment, Long programKey,
			Long businessFunctionKey, Long hpKey, Long supervisorKey, Long groupKey, String roleCode);
	
	List<KeyValue<String, String>> getVendorsForUserProfile(Long groupKey, Long userKey);
	
	List<KeyValue<String, String>> isBusFuncConfigured(GcmConfigInput gcmConfigInput);
	
	List<KeyValue<String, String>> getConfiguredGroups(Long userKey);
	
	List<KeyValue<String, String>> getVendorsByGroup(Integer groupKey);
}
