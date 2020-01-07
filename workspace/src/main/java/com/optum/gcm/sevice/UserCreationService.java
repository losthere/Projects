package com.optum.gcm.sevice;

import static com.optum.gcm.common.util.LoggingUtil.logDebug;
import static com.optum.gcm.common.util.LoggingUtil.logInfo;
import static org.apache.commons.lang3.StringEscapeUtils.escapeJava;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.optum.gcm.common.CreateUserinDocumentum;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.crypto.GcmAESCrypto;
import com.optum.gcm.model.GCMUser;
import com.optum.gcm.model.GCMUserGroup;
import com.optum.gcm.model.GCMUserVendor;
import com.optum.gcm.model.GcmRoleVendorList;
import com.optum.gcm.model.GcmRoleVendors;
import com.optum.gcm.model.GcmUserVendorRole;
import com.optum.gcm.model.KeyValue;
import com.optum.gcm.model.LoginProperties;
import com.optum.gcm.model.StgExtUserInfo;
import com.optum.gcm.model.UserLogin;
import com.optum.gcm.model.UserResource;
import com.optum.gcm.model.UserRole;
import com.optum.gcm.model.UserVendor;

/**
 * @author rsankary
 */


@Service
public class UserCreationService {

	private static final Logger LOG = LoggerFactory.getLogger(UserCreationService.class);

	private static final String adminUserId = "Admin";

	protected static final String QUERY_VERIFY_USER = "SELECT count(1) IS_USER_EXISTS FROM GCM_USER where uuid=:UUID and IS_ACTIVE_SW='Y'";

	private static final String QUERY_USER_DETAILS = "SELECT U1.GCM_USER_KEY,U1.USERID,U1.LAST_NAME,U1.FIRST_NAME,U1.EMAIL,U1.IS_ACTIVE_SW,U1.GCM_APPROVED_USER_KEY,U1.UUID,U2.LAST_NAME APPROVER_LAST_NAME,U2.FIRST_NAME APPROVER_FIRST_NAME FROM GCM_USER U1, GCM_USER U2 WHERE U1.GCM_APPROVED_USER_KEY = U2.GCM_USER_KEY AND UPPER(U1.USERID) =:USERID"; 
			
	private static final String QUERY_GET_USER_DETAILS = "SELECT * FROM GCM_USER  WHERE upper(userid)=:USERID";

	/*private static final String QUERY_USER_GRP_DETAILS = "SELECT DISTINCT GR.GCM_GROUP_KEY,GR.GCM_GROUP_NAME,GR.GCM_GROUP_CD,GCUV.IS_DEFAULT_GROUP_SW,GR.SPOTLIGHT_URL,GR.IS_INTERNAL_GROUP  "
			+ "FROM GCM_USER_VENDOR_GROUP_VW GCUV,GCM_USER GU,GCM_VENDOR GV,GCM_GROUP GR  " + "WHERE  "
			+ "GU.GCM_USER_KEY = GCUV.GCM_USER_KEY  " + "AND GU.IS_ACTIVE_SW='Y'  "
			+ "AND GV.GCM_VENDOR_KEY = GCUV.GCM_VENDOR_KEY  " + "AND GR.GCM_GROUP_KEY = GCUV.GCM_GROUP_KEY  "
			+ "AND UPPER(GU.USERID) = :USERID";*/
	
	
	private static final String QUERY_USER_GRP_DETAILS = "SELECT DISTINCT GR.GCM_GROUP_KEY, " + 
														"  GR.GCM_GROUP_NAME, " + 
														"  GR.GCM_GROUP_CD, " + 
														"  CASE " + 
														"    WHEN COUNT(CASE WHEN GCUV.IS_DEFAULT_GROUP_SW = 'Y' THEN 1 END) > 0 THEN 'Y' " + 
														"    ELSE 'N' " + 
														"  END AS IS_DEFAULT_GROUP_SW, " + 
														"  GR.SPOTLIGHT_URL, " + 
														"  GR.IS_INTERNAL_GROUP " + 
														" FROM GCM_USER_VENDOR_GROUP_VW GCUV, " + 
														"  GCM_USER GU, " + 
														"  GCM_VENDOR GV, " + 
														"  GCM_GROUP GR " + 
														" WHERE GU.GCM_USER_KEY = GCUV.GCM_USER_KEY " + 
														" AND GU.IS_ACTIVE_SW   ='Y' " + 
														" AND GV.GCM_VENDOR_KEY = GCUV.GCM_VENDOR_KEY " + 
														" AND GR.GCM_GROUP_KEY  = GCUV.GCM_GROUP_KEY " + 
														" AND UPPER(GU.USERID)  = :USERID " + 
														" GROUP BY GR.GCM_GROUP_KEY, " + 
														"  GR.GCM_GROUP_NAME, " + 
														"  GR.GCM_GROUP_CD, " + 
														"  GR.SPOTLIGHT_URL, " + 
														"  GR.IS_INTERNAL_GROUP";

	private static final String QUERY_USER_VENDOR_DETAILS = "SELECT DISTINCT GV.GCM_VENDOR_KEY," + "  GV.VENDOR_NAME,"
			+ "  GV.VENDOR_CODE," + "  GCUV.IS_DEFAULT_SW " + "FROM GCM_USER_VENDOR_GROUP_VW GCUV," + "  GCM_USER GU,"
			+ "  GCM_VENDOR GV," + "  GCM_GROUP GR " + "WHERE GU.GCM_USER_KEY = GCUV.GCM_USER_KEY "
			+ "AND GU.IS_ACTIVE_SW   ='Y' " + "AND GV.GCM_VENDOR_KEY = GCUV.GCM_VENDOR_KEY "
			+ "AND GR.GCM_GROUP_KEY  = GCUV.GCM_GROUP_KEY " + "AND UPPER(GU.USERID)  = :USERID ";

	private static final String QUERY_USER_VENDOR_ROLE = "SELECT R.GCM_ROLE_CODE, "
			+ "  R.GCM_ROLE_NAME,U.GCM_VENDOR_KEY " + "FROM GCM_ROLE_LIST R, " + "  GCM_USER_ROLE U "
			+ "WHERE R.GCM_ROLE_CODE  =U.GCM_ROLE_CODE " + "AND R.IS_VENDOR_ROLE_SW='Y' "
			+ "AND R.IS_ACTIVE_SW     ='Y' " + "AND U.GCM_USER_KEY     =:GCM_USER_KEY "
			+ "AND U.GCM_VENDOR_KEY      =:GCM_VENDOR_KEY " + "ORDER BY R.ROLE_ORDER DESC ";
	
	
	private static final String QUERY_USER_VENDOR_BY_GROUP =	"SELECT R.GCM_ROLE_CODE,  R.GCM_ROLE_NAME,U.GCM_VENDOR_KEY, V.VENDOR_NAME FROM GCM_ROLE_LIST R, " + 
	"GCM_USER_ROLE U ,  GCM_VENDOR V WHERE R.GCM_ROLE_CODE =U.GCM_ROLE_CODE AND R.IS_VENDOR_ROLE_SW='Y' AND R.IS_ACTIVE_SW ='Y' AND " + 
	"U.IS_ACTIVE_SW = 'Y' AND U.GCM_USER_KEY = :GCM_USER_KEY  AND V.GCM_VENDOR_KEY=U.GCM_VENDOR_KEY AND V.GCM_GROUP_KEY=:GCM_GROUP_KEY " + 
	" ORDER BY V.VENDOR_NAME ASC ";
	
	private static final String QUERY_USER_REGIONS_BY_GROUP = "SELECT * FROM TABLE(PKG_COMM_COMMON.FNC_SUP_REGION " + 
			"  ( P_GROUP_KEY             => :GCM_GROUP_KEY, " + 
			"    P_USER_KEY              => :GCM_USER_KEY, " + 
			"    P_VENDOR_KEY            => :GCM_VENDOR_KEY, " + 
			"    P_ROLE_CODE             => :GCM_ROLE_CODE )) ";
	/*"SELECT R.REGION AS KEY, R.REGION_NAME AS VALUE "+
			" FROM GCM_REGION R, GCM_USER_VENDOR UV, GCM_VENDOR V,GCM_USER_ROLE UR " + 
			" WHERE R.REGION = V.REGION " + 
			" AND V.GCM_VENDOR_KEY = UV.GCM_VENDOR_KEY " + 
			" AND UV.IS_ACTIVE_SW = 'Y' " + 
			" AND UV.GCM_VENDOR_KEY = UR.GCM_VENDOR_KEY "+
			" AND UR.GCM_USER_KEY = UV.GCM_USER_KEY "+
			" AND UR.GCM_ROLE_CODE = :GCM_ROLE_CODE "+
			" AND V.GCM_GROUP_KEY = :GCM_GROUP_KEY " + 
			" AND UV.GCM_USER_KEY = :GCM_USER_KEY";*/

	private static final String QUERY_USER_ROLE = "SELECT R.GCM_ROLE_CODE, " + 
			"   R.GCM_ROLE_NAME, " + 
			"  U.GCM_VENDOR_KEY, " + 
			"  V.VENDOR_NAME " + 
			"FROM GCM_ROLE_LIST R, " + 
			"   GCM_USER_ROLE U , " + 
			"  GCM_USER GU, " + 
			"  GCM_VENDOR V, " + 
			"  GCM_USER_VENDOR UV " + 
			" WHERE R.GCM_ROLE_CODE =U.GCM_ROLE_CODE " + 
			" AND R.IS_VENDOR_ROLE_SW ='Y'AND R.IS_ACTIVE_SW ='Y'AND U.IS_ACTIVE_SW = 'Y' " + 
			" AND V.GCM_VENDOR_KEY = UV.GCM_VENDOR_KEY " + 
			" AND UV.GCM_VENDOR_KEY = U.GCM_VENDOR_KEY " + 
			" AND UV.GCM_USER_KEY = U.GCM_USER_KEY " + 
			" AND U.GCM_USER_KEY  = GU.GCM_USER_KEY " + 
			" AND UPPER(GU.USERID) = :USERID " + 
			" ORDER BY R.ROLE_ORDER DESC";

	private static final String QUERY_GET_USER_LOGIN_HISTORY = "select * from (select UL.* from GCM_USER_LOGON UL, GCM_USER GU where UL.GCM_USER_KEY=GU.GCM_USER_KEY AND "
			+ " UL.LOGIN_TIME is not null and UL.LOGOFF_TIME is null "
			+ " AND UL.LOGIN_TIME >= ( sysdate - 8/24 ) and UPPER(GU.USERID)=:USERID ORDER BY UL.LOGIN_TIME DESC) where rownum = 1";

	private static final String UPDATE_USER_LOGOFF = "UPDATE GCM_USER_LOGON SET LOGOFF_TIME=:LOGOFF_TIME,LOG_OFF_MODE=:LOG_OFF_MODE WHERE GCM_USER_LOGON_KEY=:GCM_USER_LOGON_KEY";

	private static String GET_STG_USER_BY_EMAIL = "SELECT SU.* FROM STG_EXT_USER_INFO SU WHERE SU.IS_VALID='Y' AND UPPER(SU.EMAIL)=:EMAIL ";

	private static String GET_REPORTS_TO_DETAILS = "SELECT GCM_USER_KEY FROM GCM_USER WHERE UPPER(USERID) = :USERID";

	private static String GET_REPORTS_TO_DETAILS_KEY = "SELECT GCM_APPROVED_USER_KEY FROM GCM_USER WHERE GCM_USER_KEY = :GCM_USER_KEY";

	private static String GET_USER_VENDOR_DETAILS = "SELECT COUNT(1) FROM GCM_USER_VENDOR WHERE GCM_USER_KEY = :GCM_USER_KEY AND GCM_VENDOR_KEY=:GCM_VENDOR_KEY";

	private static String GET_USER_VENDOR_KEY = "SELECT GCM_VENDOR_KEY FROM GCM_USER_VENDOR_GROUP_VW WHERE GCM_USER_KEY = :GCM_USER_KEY";

	private static String GET_DOCUMENTUM_ORG_LOCATION = "SELECT DOCUMENT_ORG_LOCATION FROM GCM_VENDOR WHERE GCM_VENDOR_KEY=:GCM_VENDOR_KEY";

	private static String UPDATE_STG_USER = "UPDATE STG_EXT_USER_INFO SET GCM_USER_KEY=:GCM_USER_KEY,MODIFIED_BY=:MODIFIED_BY,MODIFIED_DATE_TIME=:MODIFIED_DATE_TIME WHERE STG_EXT_USER_INFO_KEY=:STG_EXT_USER_INFO_KEY";

	private static final String GCM_ONSHORE_GROUP = "gcm_onshore";
	
	private static String documentumUserProperty;

	private static String documentumSessionProperty;

	private static String documentumUserPropertyVal;

	private static String documentumSessionPropertyVal;

	private static String documentumEndPointURI;

	private static String loginUrl;

	private static String verifyUrl;

	private static String reportsUrl;

	private static String relyingId;

	@Value("${gcm.aes.passwd}")
	private String aesPass;

	@Value("${gcm.aes.salt}")
	private String aesSalt;

	@Value("${gcm.aes.iv}")
	private String aesIv;
	
	public UserCreationService() {
	}
	
	public static String getDocumentumUserPropertyVal() {
		return documentumUserPropertyVal;
	}

	public static String getDocumentumUserProperty() {
		return documentumUserProperty;
	}

	public static String getDocumentumSessionProperty() {
		return documentumSessionProperty;
	}

	public static String getDocumentumSessionPropertyVal() {
		return documentumSessionPropertyVal;
	}

	public static String getDocumentumEndPointURI() {
		return documentumEndPointURI;
	}

	@Value("${com.optum.security.loginurl}")
	public void setLoginUrl(String loginUrl) {
		UserCreationService.loginUrl = loginUrl;
	}

	@Value("${com.optum.security.verifyurl}")
	public void setVerifyUrl(String verifyUrl) {
		UserCreationService.verifyUrl = verifyUrl;
	}

	@Value("${com.optum.security.relyingid}")
	public void setRelyingid(String relyingid) {
		UserCreationService.relyingId = relyingid;
	}

	@Value("${com.optum.orbit.reports.url}")
	public void setReportsUrl(String reportsUrl) {
		UserCreationService.reportsUrl = reportsUrl;
	}

	@Value("${com.optum.security.header.username}")
	public void setDocumentumUserProperty(String documentumUserProperty) {
		UserCreationService.documentumUserProperty = documentumUserProperty;
	}

	@Value("${com.optum.security.header.session}")
	public void setDocumentumSessionProperty(String documentumSessionProperty) {
		UserCreationService.documentumSessionProperty = documentumSessionProperty;
	}

	@Value("${com.optum.security.header.username.value}")
	public void setDocumentumUserPropertVal(String documentumUserPropertyVal) {
		UserCreationService.documentumUserPropertyVal = documentumUserPropertyVal;
	}

	@Value("${com.optum.security.header.session.value}")
	public void setDocumentumSessionPropertyVal(String documentumSessionPropertyVal) {
		UserCreationService.documentumSessionPropertyVal = documentumSessionPropertyVal;
	}

	@Value("${com.optum.documentum.endpoint}")
	public void setDocumentumEndPointURI(String documentumEndPointURI) {
		UserCreationService.documentumEndPointURI = documentumEndPointURI;
	}

	@Autowired
	private CommonJpaService commonJpaService;
	
	@Value("${ciox.landing.url}")
	private String cioxLaunchUrl;

	@Transactional
	public UserResource createUser(String userId, String uuID, String firstName, String lastName, String email,
			String ipInfo, String browserInfo) {
		Map<String, Object> paramsUserDetails = new HashMap<>();
		UserResource userResouceDetails = null;
		paramsUserDetails.put("UUID", uuID);
		Long gcmUserKey = null;
		// Query to verify the user details
		int isUserExists = commonJpaService.getResultObject(QUERY_VERIFY_USER, paramsUserDetails, Integer.class);
		if (isUserExists > 0) {
			// Return all details of user
			userResouceDetails = GetGCMUserDetails(userId);
			gcmUserKey = Long.valueOf(userResouceDetails.getUserKey());
		} else {
			// Check with UUID
			// if not exists
			// Check in Stage table
			// if exists create user in database with roles and documentum
			// if not exists in stage table throw an error
			Map<String, Object> paramsExtUserDetails = new HashMap<>();
			paramsExtUserDetails.put("EMAIL", email.trim().toUpperCase());
			StgExtUserInfo extUserInfo = null;
			try {
				extUserInfo = commonJpaService.getResultObject(GET_STG_USER_BY_EMAIL, paramsExtUserDetails,
						StgExtUserInfo.class);
			} catch (EmptyResultDataAccessException e) {
				extUserInfo = null;
			}
			if (extUserInfo != null && extUserInfo.getEmail().length() > 0) {
				LOG.info(extUserInfo.toString());
				// Get Reports To userkey from user table
				paramsUserDetails.put("USERID", extUserInfo.getReportsToUserID().trim().toUpperCase());
				String userReportsToKey = commonJpaService.getResultObject(GET_REPORTS_TO_DETAILS, paramsUserDetails,
						String.class);
				if (userReportsToKey.length() > 0) {
					// Create user
					//if(isUserExists>0) {
					GCMUser userObj = new GCMUser();
					String newUserKey = userObj.getLoginUserKey();
					userObj.setLoginUserKey(newUserKey);
					userObj.setFirstName(extUserInfo.getFirstName());
					userObj.setLastName(extUserInfo.getLastName());
					userObj.setEmail(extUserInfo.getEmail());
					userObj.setUserID(userId);
					userObj.setExtUserIdentification(userId);
					userObj.setExtUserIdentificationSrc("JPA");
					userObj.setUuID(uuID);
					userObj.setIsActive("Y");
					userObj.setIsInternal("N");
					userObj.setReportsToUserKey(userReportsToKey);
					userObj.setCreateUser(adminUserId);
					userObj.setModifiedUser(adminUserId);
					userObj.setCreateDate(new java.sql.Timestamp(System.currentTimeMillis()));
					userObj.setModifiedDate(new java.sql.Timestamp(System.currentTimeMillis()));
					String random = RandomStringUtils.randomAlphabetic(16);
					GcmAESCrypto crypto = new GcmAESCrypto(aesPass, aesSalt, aesIv);
					userObj.setPasswd(crypto.encrypt(random, userObj.getUuID()));
					gcmUserKey = commonJpaService.persist(userObj);
				//	}
					
					String vendors[] = extUserInfo.getGcmVendorKey().split("\\|");
					for(int j=0;j<vendors.length;j++)
					{
					// Add Roles for Org
						String rolesForOrg[] = extUserInfo.getRole().split("\\|");
						String roles[] = rolesForOrg[j].split(";");
				
						for (int i = 0; i < roles.length; i++) {
							addRolesToUser(gcmUserKey, roles[i], vendors[j]);
						}
						// Create user in documentum
						Map<String, Object> paramsVendorDetails = new HashMap<>();
						paramsVendorDetails.put("GCM_VENDOR_KEY", vendors[j]);
						//if(count >0) {
						String documentumGroup = commonJpaService.getResultObject(GET_DOCUMENTUM_ORG_LOCATION,
								paramsVendorDetails, String.class);
						LOG.info("Documentum service details : " + documentumEndPointURI + "," + documentumUserProperty
								+ "," + documentumSessionProperty + "," + documentumUserPropertyVal + ","
								+ documentumSessionPropertyVal);
						CreateUserinDocumentum.callSoapWebService(documentumEndPointURI, "createCommSSOUser",
								documentumUserProperty, documentumSessionProperty, documentumUserPropertyVal,
								documentumSessionPropertyVal, userObj.getUuID(), documentumGroup, extUserInfo.getEmail(), random);
						//}
						List<String> roleList = Arrays.asList(roles);
						
						if (roleList.contains("NUQAUD")|| roleList.contains("NUQASAUD")|| roleList.contains("ONUQAUD")
								|| roleList.contains("NUQAM") || roleList.contains("ONUQAM")) {

							CreateUserinDocumentum.callSoapWebService(documentumEndPointURI, "createCommSSOUser",
									documentumUserProperty,documentumSessionProperty, documentumUserPropertyVal,
									documentumSessionPropertyVal, userObj.getUuID(), GCM_ONSHORE_GROUP, extUserInfo.getEmail(), "");
						}
					}
					// Update user key details to stage db
					Map<String, Object> paramsUpdateExtUserDetails = new HashMap<>();
					paramsUpdateExtUserDetails.put("STG_EXT_USER_INFO_KEY", extUserInfo.getStgExtUserInfoKey());
					paramsUpdateExtUserDetails.put("GCM_USER_KEY", gcmUserKey);
					paramsUpdateExtUserDetails.put("MODIFIED_BY", userId);
					paramsUpdateExtUserDetails.put("MODIFIED_DATE_TIME",
							new java.sql.Timestamp(System.currentTimeMillis()));
					commonJpaService.update(UPDATE_STG_USER, paramsUpdateExtUserDetails);

					// Retrun user details
					userResouceDetails = GetGCMUserDetails(userId);
				} else {
					// Throw error user has to contact his supervisor.
					userResouceDetails = new UserResource();
					userResouceDetails.setErrorMsg("User with email '" + email
							+ "' either doesn't have a valid reports to manager in system. Contact your supervisor.");
					logDebug(LOG,
							"User with email {} either doesn't have a valid reports to manager in system. Contact your supervisor.",
							email);
				}

			} else {
				//Throw error user has to contact his supervisor.if email id or optum id  doesn't match. 
				userResouceDetails = new UserResource(); 
				userResouceDetails.setErrorMsg("Your Optum email address or Optum ID is invalid.");
				logDebug(LOG,
						"User with email {} either doesn't exist in system or not valid. Contact your supervisor.",
						email);
			}
		}
		if (gcmUserKey != null && gcmUserKey > 0) {
			// Record user login
			
			userResouceDetails.setPnpURL(cioxLaunchUrl);
		}
		return userResouceDetails;
	}

	public GCMUser getUser(String UserId) {
		Map<String, Object> paramsUserDetails = new HashMap<>();
		GCMUser userObj = null;
		paramsUserDetails.put("USERID", UserId.trim().toUpperCase());
		try {
			userObj = commonJpaService.getResultObject(QUERY_GET_USER_DETAILS, paramsUserDetails,
					GCMUser.class);
		} catch (EmptyResultDataAccessException ex) {
			LOG.error("UserId details not available in system for : " + escapeJava(UserId), ex);
		}
		return userObj;
	}

	// Get user details
	public UserResource GetGCMUserDetails(String UserId) {
		Map<String, Object> paramsUserDetails = new HashMap<>();
		UserResource userResouceDetails = null;
		paramsUserDetails.put("USERID", UserId.trim().toUpperCase());
		try {
			userResouceDetails = commonJpaService.getResultObject(QUERY_USER_DETAILS, paramsUserDetails,
					UserResource.class);
		} catch (EmptyResultDataAccessException ex) {
			LOG.error("UserId details not available in system for : " + escapeJava(UserId), ex);
		}
		List<GCMUserGroup> userGroups = null;
		try {
			userGroups = commonJpaService.getResultList(QUERY_USER_GRP_DETAILS, paramsUserDetails, GCMUserGroup.class);
			if (userResouceDetails != null)
				userResouceDetails.setGcmUserGroup(userGroups);
		} catch (EmptyResultDataAccessException ex) {
			LOG.error("Group details not available for user : " + escapeJava(UserId), ex);
		}
		List<GCMUserVendor> userVendors = null;
		try {
			userVendors = commonJpaService.getResultList(QUERY_USER_VENDOR_DETAILS, paramsUserDetails,
					GCMUserVendor.class);
			if (userResouceDetails != null)
				userResouceDetails.setGcmUserVendor(userVendors);
		} catch (EmptyResultDataAccessException ex) {
			LOG.error("Vendor details not available for user : " + escapeJava(UserId), ex);
		}
		List<GcmUserVendorRole> userRoles = null;
		try {
			userRoles = commonJpaService.getResultList(QUERY_USER_ROLE, paramsUserDetails, GcmUserVendorRole.class);
			if (userResouceDetails != null)
				userResouceDetails.setGcmUserVendorRole(userRoles);
		} catch (EmptyResultDataAccessException ex) {
			LOG.error("Roles not available for user : " + escapeJava(UserId), ex);
		}
		if (userResouceDetails != null)
			userResouceDetails.setErrorMsg("");
		return userResouceDetails;
	}

	// Add a specific role to user
	@Transactional
	public boolean addRolesToUser(Long userKey, String roleCode, String vendorKey) {
		boolean roleAdded = true;
		Map<String, Object> paramsUserVendorDetails = new HashMap<>();
		paramsUserVendorDetails.put("GCM_USER_KEY", userKey);
		paramsUserVendorDetails.put("GCM_VENDOR_KEY", vendorKey);
		int count = commonJpaService.getResultObject(GET_USER_VENDOR_DETAILS, paramsUserVendorDetails, Integer.class);
		if (count == 0) {
			// Add user to that vendor
			UserVendor userVendor = new UserVendor();
			userVendor.setGcmUserKey(userKey);
			userVendor.setGcmVendorKey(vendorKey);
			userVendor.setIsActvieSW("Y");
			userVendor.setIsDefaultSW("N");
			userVendor.setCreateUser(adminUserId);
			userVendor.setModifiedUser(adminUserId);
			userVendor.setCreateDate(new java.sql.Timestamp(System.currentTimeMillis()));
			userVendor.setModifiedDate(new java.sql.Timestamp(System.currentTimeMillis()));
			commonJpaService.persist(userVendor);
		}
		addRole(userKey, roleCode, vendorKey);
		return roleAdded;
	}

	@Transactional
	private boolean addRole(Long userKey, String roleCode, String vendorKey) {
		boolean roleAdded = true;
		Map<String, Object> paramsUserDetails = new HashMap<>();
		paramsUserDetails.put("GCM_USER_KEY", userKey);
		String userReportsToKey = commonJpaService.getResultObject(GET_REPORTS_TO_DETAILS_KEY, paramsUserDetails,
				String.class);
		UserRole userRoleDeatils = new UserRole();
		userRoleDeatils.setGcmUserRoleKey(userRoleDeatils.getGcmUserRoleKey());
		userRoleDeatils.setGcmUserKey(userKey);
		userRoleDeatils.setGcmRoleCode(roleCode);
		userRoleDeatils.setGcmVendorKey(vendorKey);
		userRoleDeatils.setIsActiveSW("Y");
		userRoleDeatils.setGcmReportsUserKey(userReportsToKey);
		userRoleDeatils.setCreateUser(adminUserId);
		userRoleDeatils.setModifiedUser(adminUserId);
		userRoleDeatils.setCreateDate(new java.sql.Timestamp(System.currentTimeMillis()));
		userRoleDeatils.setModifiedDate(new java.sql.Timestamp(System.currentTimeMillis()));
		commonJpaService.persist(userRoleDeatils);
		return roleAdded;
	}

	// Creates user login history
	public boolean recordUserLogin(Long userKey, String ipInfo, String browserInfo) {
		boolean isLoginRecorded = true;
		UserLogin userLogin = new UserLogin();
		userLogin.setGcmUserKey(userKey);
		userLogin.setLogInTime(new java.sql.Timestamp(System.currentTimeMillis()));
		userLogin.setLogOffTime(null);
		userLogin.setIpInfo(ipInfo);
		userLogin.setBrowserInfo(browserInfo);
		userLogin.setLogOffMode(null);
		userLogin.setCreateUser(adminUserId);
		userLogin.setModifiedUser(adminUserId);
		userLogin.setCreateDate(new java.sql.Timestamp(System.currentTimeMillis()));
		userLogin.setModifiedDate(new java.sql.Timestamp(System.currentTimeMillis()));
		try {
			commonJpaService.persist(userLogin);
		} catch (Exception ex) {
			LOG.error("Exception : ", ex);
		}
		return isLoginRecorded;
	}

	// Creates user logoff
	public UserLogin recordUserLogOff(String userId, String logOffMode) {
		// Get Last User's Entry
		Map<String, Object> paramsUserDetails = new HashMap<>();
		UserLogin userLogOn = null;
		paramsUserDetails.put("USERID", userId.trim().toUpperCase());
		logInfo(LOG, true, "User :{}, {}", userId, logOffMode);
		try {
			userLogOn = commonJpaService.getResultObject(QUERY_GET_USER_LOGIN_HISTORY, paramsUserDetails,
					UserLogin.class);
		} catch (EmptyResultDataAccessException ex) {
			LOG.error("Exception : ", ex);
			userLogOn = null;
		}
		if (userLogOn != null) {
			// to make update ready
			userLogOn.setLogOffTime(new java.sql.Timestamp(System.currentTimeMillis()));
			logInfo(LOG, "logOffMode : {}", logOffMode);
			// L - Logout, T - Timeout, C - Browser Close, U - Unknown,
			// S-Session Timeout
			if ("L".equalsIgnoreCase(logOffMode) || "T".equalsIgnoreCase(logOffMode) || "C".equalsIgnoreCase(logOffMode)
					|| "S".equalsIgnoreCase(logOffMode)) {
				logInfo(LOG, "logOffMode -- inside If : {}", logOffMode);
				userLogOn.setLogOffMode(logOffMode);
			} else {
				userLogOn.setLogOffMode("U");
				logOffMode = "U";
			}
			Map<String, Object> paramsLogoffDetails = new HashMap<>();
			paramsLogoffDetails.put("LOGOFF_TIME", new java.sql.Timestamp(System.currentTimeMillis()));
			paramsLogoffDetails.put("LOG_OFF_MODE", logOffMode);
			paramsLogoffDetails.put("GCM_USER_LOGON_KEY", userLogOn.getGcmUserLogonKey());
			commonJpaService.update(UPDATE_USER_LOGOFF, paramsLogoffDetails);
		}
		return userLogOn;
	}

	// Get vendor key based on user key
	public Long getUserVendorKey(Long userKey) {
		Long vendorKey = null;
		Map<String, Object> paramsUserDetails = new HashMap<>();
		paramsUserDetails.put("GCM_USER_KEY", userKey);
		vendorKey = commonJpaService.getResultObject(GET_USER_VENDOR_KEY, paramsUserDetails, Long.class);
		return vendorKey;
	}

	// Get user roles
	public List<GcmUserVendorRole> getUserRoles(Long userKey, Long vendorKey) {
		List<GcmUserVendorRole> userRoles = null;
		Map<String, Object> paramsUserRole = new HashMap<>();
		paramsUserRole.put("GCM_USER_KEY", userKey);
		paramsUserRole.put("GCM_VENDOR_KEY", vendorKey);
		userRoles = commonJpaService.getResultList(QUERY_USER_VENDOR_ROLE, paramsUserRole, GcmUserVendorRole.class);
		return userRoles;
	}

	public List<GcmRoleVendors> getUserVendorByGroupKey(Long userKey, Long groupKey) {
		List<GcmRoleVendorList> userRoles = null;
		Map<String, Object> paramsUserRole = new HashMap<>();
		paramsUserRole.put("GCM_USER_KEY", userKey);
		paramsUserRole.put("GCM_GROUP_KEY", groupKey);
		userRoles = commonJpaService.getResultList(QUERY_USER_VENDOR_BY_GROUP, paramsUserRole, GcmRoleVendorList.class);
		Map<String, GcmRoleVendors> roleMap = new HashMap<>();
		for(GcmRoleVendorList userRole: userRoles ) {
			GcmRoleVendors roleVendors = null;
			if(roleMap.containsKey(userRole.getGcmRoleCode())) {
				roleVendors = roleMap.get(userRole.getGcmRoleCode());
			}else {
				roleVendors  = new GcmRoleVendors();
				roleVendors.setRoleVendor(new ArrayList<>());
				roleMap.put(userRole.getGcmRoleCode(), roleVendors);
				roleVendors.setGcmRoleCode(userRole.getGcmRoleCode());
				roleVendors.setGcmRoleName(userRole.getGcmRoleName());
			}
			KeyValue<Integer, String> vendorMap = new KeyValue<Integer, String>();
			vendorMap.setKey(userRole.getGcmVendorKey());			
			vendorMap.setValue(userRole.getVendorName());
			roleVendors.getRoleVendor().add(vendorMap);
		}
		return new ArrayList<>(roleMap.values());
	}
	
	public List<KeyValue<String, String>> getUserRegionsByGroup(Long userKey, Long groupKey, String roleCode, Long vendorKey){
		Map<String, Object> paramUserRegion = new HashMap<>();
		paramUserRegion.put("GCM_USER_KEY", userKey);
		paramUserRegion.put("GCM_ROLE_CODE", roleCode);
		paramUserRegion.put("GCM_VENDOR_KEY", vendorKey);
		paramUserRegion.put("GCM_GROUP_KEY", groupKey);
		return commonJpaService.getKeyKeyValueResults(QUERY_USER_REGIONS_BY_GROUP, paramUserRegion, String.class);
	}
	
	public LoginProperties getLoginProperties() {
		LoginProperties loginProp = new LoginProperties();
		loginProp.setLoginUrl(loginUrl);
		loginProp.setRelyingId(relyingId);
		loginProp.setReportsUrl(reportsUrl);
		loginProp.setVerifyUrl(verifyUrl);
		return loginProp;
	}
	
	public String getEncryptedString(String value, String passwd) {
		GcmAESCrypto crypto = new GcmAESCrypto(aesPass, aesSalt, aesIv);
		return crypto.encrypt(value, passwd);
	}

}
