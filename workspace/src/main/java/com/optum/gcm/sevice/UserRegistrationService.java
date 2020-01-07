package com.optum.gcm.sevice;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.GCMUser;
import com.optum.gcm.model.GCMUserVendor;
import com.optum.gcm.model.GcmMailContent;
import com.optum.gcm.model.GcmMailId;
import com.optum.gcm.model.InsertStgUser;
import com.optum.gcm.model.InsertStgUserObject;
import com.optum.gcm.model.KeyValue;
import com.optum.gcm.model.StgExtUserFileInfo;
import com.optum.gcm.model.StgExtUserInfo;
import com.optum.gcm.model.UserFileHistory;

/**
 * @author rsankary
*/

@Service
public class UserRegistrationService {
	
	private static final Logger LOG = LoggerFactory.getLogger(UserRegistrationService.class);
	
	private static final String GET_USER_FILE_HISTORY_QUERY = "SELECT F.STG_EXT_USER_FILE_INFO_KEY, " + 
    		"       F.FILE_NAME, " + 
    		"       GU.LAST_NAME || ', ' || GU.FIRST_NAME AS UPLOADED_BY, " + 
    		"       GU.USERID AS UPLOADED_BY_USERID, " + 
    		"       F.CREATION_DATE_TIME AS UPLOADED_ON,F.LAST_PROCCESSED_ON, " + 
    		"       COUNT(U.STG_EXT_USER_FILE_INFO_KEY) AS CNT_USER, " + 
    		"       COUNT(CASE WHEN U.IS_VALID = 'Y' THEN U.STG_EXT_USER_FILE_INFO_KEY END) AS CNT_USER_SUCCESS, " + 
    		"       COUNT(CASE WHEN U.IS_VALID = 'N' THEN U.STG_EXT_USER_FILE_INFO_KEY END) AS CNT_USER_FAILURE " + 
    		"  FROM STG_EXT_USER_FILE_INFO F, " + 
    		"       STG_EXT_USER_INFO U, " + 
    		"       GCM_USER GU " + 
    		" WHERE F.STG_EXT_USER_FILE_INFO_KEY = U.STG_EXT_USER_FILE_INFO_KEY " + 
    		"   AND F.UPLOADED_BY = GU.USERID AND F.GCM_GROUP_KEY= :GCM_GROUP_KEY" + 
    		" GROUP BY F.STG_EXT_USER_FILE_INFO_KEY, F.FILE_NAME, GU.FIRST_NAME, GU.LAST_NAME,GU.USERID, F.CREATION_DATE_TIME,F.LAST_PROCCESSED_ON " + 
    		" ORDER BY F.LAST_PROCCESSED_ON DESC";
	
	private static final String GET_STG_USERS_BY_FILE_KEY ="SELECT SU.* FROM STG_EXT_USER_INFO SU,STG_EXT_USER_FILE_INFO SUF WHERE SU.STG_EXT_USER_FILE_INFO_KEY=SUF.STG_EXT_USER_FILE_INFO_KEY AND  SU.STG_EXT_USER_FILE_INFO_KEY=:STG_EXT_USER_FILE_INFO_KEY AND SUF.GCM_GROUP_KEY=:GCM_GROUP_KEY";
	
	private static final String GET_STG_USER_BY_EMAIL ="SELECT SU.* FROM STG_EXT_USER_INFO SU WHERE SU.IS_VALID='Y' AND UPPER(SU.EMAIL)=:EMAIL ";
	
	private static final String GET_STG_USER_BY_KEY ="SELECT SU.* FROM STG_EXT_USER_INFO SU WHERE SU.IS_VALID='Y' AND SU.STG_EXT_USER_INFO_KEY=:STG_EXT_USER_INFO_KEY ";
	
	
	private static final String GET_USER_GROUP_BY_FILEKEY = "SELECT GCM_GROUP_KEY FROM STG_EXT_USER_FILE_INFO WHERE STG_EXT_USER_FILE_INFO_KEY=:STG_EXT_USER_FILE_INFO_KEY ";
	
	private static final String GET_ENV = "select PARAM_VALUE from GCM_CONFIGURATION where CONFIG_NAME =:CONFIG_NAME and PARAM_NAME =:PARAM_NAME  ";
	
	private static final String GET_GCM_USER_COUNT_BY_EMAIL = "SELECT DISTINCT GP.GCM_GROUP_KEY KEY,GP.GCM_GROUP_NAME VALUE FROM GCM_VENDOR GV, GCM_USER_VENDOR GUV, GCM_USER GU,GCM_GROUP GP WHERE " + 
			"    GU.GCM_USER_KEY = GUV.GCM_USER_KEY AND GUV.GCM_VENDOR_KEY = GV.GCM_VENDOR_KEY AND UPPER(GU.EMAIL) =:EMAIL AND GP.GCM_GROUP_KEY = GV.GCM_GROUP_KEY ";
	
	private static final String GET_STG_USER_COUNT_BY_EMAIL = "SELECT COUNT(SU.STG_EXT_USER_INFO_KEY) AS IS_USER_EXISTS FROM STG_EXT_USER_INFO SU,STG_EXT_USER_FILE_INFO SUF WHERE SU.STG_EXT_USER_FILE_INFO_KEY=SUF.STG_EXT_USER_FILE_INFO_KEY AND SU.IS_VALID='Y' AND UPPER(SU.EMAIL)=:EMAIL AND SUF.GCM_GROUP_KEY=:GCM_GROUP_KEY  ";
	
	private static final String GET_STG_USER_COUNT_BY_EMAIL_EXCEPT_CURRENT = "SELECT COUNT(SU.STG_EXT_USER_INFO_KEY) AS IS_USER_EXISTS FROM STG_EXT_USER_INFO SU,STG_EXT_USER_FILE_INFO SUF WHERE SU.STG_EXT_USER_FILE_INFO_KEY=SUF.STG_EXT_USER_FILE_INFO_KEY AND SU.IS_VALID='Y' AND UPPER(SU.EMAIL)=:EMAIL AND SU.STG_EXT_USER_INFO_KEY!=:STG_EXT_USER_INFO_KEY AND SUF.GCM_GROUP_KEY=:GCM_GROUP_KEY ";
	
	private static final String GET_ROLE_CODE_BY_GROUP = "SELECT GCM_ROLE_CODE FROM GCM_ROLE_GROUP WHERE GCM_GROUP_KEY = :GCM_GROUP_KEY";
	
	
	private static final String GET_GCM_REPORTS_USER = "SELECT " + 
			"    COUNT(1) AS REPORTS_TO_COUNT " + 
			" FROM " + 
			"    GCM_USER_VENDOR_GROUP_VW   GUVW, " + 
			"    GCM_USER                   GU, " + 
			"    GCM_USER_ROLE              UR " + 
			" WHERE " + 
			"    GUVW.GCM_USER_KEY = GU.GCM_USER_KEY " + 
			"    AND UPPER(GU.USERID) = UPPER(:USERID) " + 
			"    AND UR.GCM_USER_KEY = GU.GCM_USER_KEY " + 
			"    AND ( ( UR.GCM_ROLE_CODE <> 'OCUA' " + 
			"            AND GUVW.GCM_GROUP_KEY = :GCM_GROUP_KEY " + 
			"            AND GUVW.GCM_VENDOR_KEY = :GCM_VENDOR_KEY ) " + 
			"          OR ( UR.GCM_ROLE_CODE = 'OCUA' ) )";
	
/*	private static final String IS_USER_OPTUMADMIN = "SELECT COUNT(1) AS REPORTS_TO_COUNT FROM GCM_USER GU,GCM_USER_ROLE GUR " + 
			"WHERE GU.GCM_USER_KEY=GUR.GCM_USER_KEY " + 
			"AND GUR.GCM_ROLE_CODE='OUA' " + 
			"AND  UPPER(GU.USERID)=:USERID ";*/
	
	private static final String GET_GCM_VENDOR = "SELECT DISTINCT  " + 
	"	  GV.GCM_VENDOR_KEY,GV.VENDOR_NAME,GV.VENDOR_CODE  " + 
	"	FROM GCM_VENDOR GV " + 
	"	WHERE UPPER(GV.VENDOR_NAME)=:VENDOR_NAME  " + 
	"	AND GV.GCM_GROUP_KEY = :GCM_GROUP_KEY ";
	
/*	private static final String GET_GCM_VENDOR = "SELECT DISTINCT  " + 
			"	  GV.GCM_VENDOR_KEY,GV.VENDOR_NAME,GV.VENDOR_CODE,GV.IS_DEFAULT_SW  " + 
			"	FROM GCM_VENDOR GV,gcm_vendor_group_assn GVGA  " + 
			"	WHERE UPPER(GV.VENDOR_NAME)=:VENDOR_NAME  " + 
			"	AND GV.GCM_VENDOR_KEY = GVGA.GCM_VENDOR_KEY " + 
			"	AND GVGA.GCM_GROUP_KEY = :GCM_GROUP_KEY ";*/
	
/*	
	SELECT DISTINCT  
	  GV.GCM_VENDOR_KEY,GV.VENDOR_NAME,GV.VENDOR_CODE,GV.IS_DEFAULT_SW  
	FROM GCM_VENDOR GV,gcm_vendor_group_assn GVGA   
	WHERE UPPER(GV.VENDOR_NAME)=:VENDOR_NAME  
	AND GV.GCM_VENDOR_KEY = GVGA.GCM_VENDOR_KEY
	AND GVGA.GCM_GROUP_KEY = :GCM_GROUP_KEY;
*/
	private static final String GET_DEFAULT_VENDOR_BY_GROUP = "SELECT GV.GCM_VENDOR_KEY,GV.VENDOR_NAME,GV.VENDOR_CODE,GV.IS_DEFAULT_SW  " + 
			"			FROM GCM_VENDOR GV " + 
			"			WHERE  GV.GCM_GROUP_KEY    = :GCM_GROUP_KEY  " + 
			"			AND GV.IS_DEFAULT_SW='Y' ";

	private static final String UPDATE_STG_USER_FILE = "UPDATE STG_EXT_USER_FILE_INFO SET LAST_PROCCESSED_ON=:LAST_PROCCESSED_ON,MODIFIED_BY=:MODIFIED_BY,MODIFIED_DATE_TIME=:MODIFIED_DATE_TIME WHERE STG_EXT_USER_FILE_INFO_KEY=:STG_EXT_USER_FILE_INFO_KEY";
	
	private static final String UPDATE_STG_USER = "UPDATE STG_EXT_USER_INFO " + 
			"SET FIRST_NAME             =:FIRST_NAME, " + 
			"  LAST_NAME                =:LAST_NAME, " + 
			"  IS_VALID                 =:IS_VALID, " + 
			"  ORGANIZATION_NAME        =:ORGANIZATION_NAME, "+
			"  REPORTS_TO_USERID        =:REPORTS_TO_USERID, " + 
			"  GCM_VENDOR_KEY           =:GCM_VENDOR_KEY, " + 
			"  ROLE                     =:ROLE, " + 
			"  EMAIL                    =:EMAIL, " + 
			"  VAL_MESSAGE              =:VAL_MESSAGE, " + 
			"  CONTACT_ADDRESS_1        =:CONTACT_ADDRESS_1, " + 
			"  CONTACT_ADDRESS_2        =:CONTACT_ADDRESS_2, " + 
			"  CONTACT_CITY             =:CONTACT_CITY, " + 
			"  CONTACT_STATE            =:CONTACT_STATE, " + 
			"  CONTACT_ZIP_CODE         =:CONTACT_ZIP_CODE, " + 
			"  MODIFIED_BY              =:MODIFIED_BY, " + 
			"  MODIFIED_DATE_TIME       =:MODIFIED_DATE_TIME " + 
			"WHERE STG_EXT_USER_INFO_KEY=:STG_EXT_USER_INFO_KEY";
	
	private static final String GET_MAIL_CONTENT = "SELECT SUBJECT,CONTENT,CONTENT_TYPE FROM GCM_MAIL_CONFIG WHERE GCM_CONFIG_NAME=:GCM_CONFIG_NAME";
	
	private static final String GET_MAIL_ID = "SELECT NAME,MAIL_ID,TYPE FROM GCM_MAIL_ID WHERE GCM_CONFIG_NAME=:GCM_CONFIG_NAME";
	
	private static final String GET_ACTIVE_USER_DETAILS = "SELECT * FROM GCM_USER WHERE UPPER(USERID)=:USERID AND IS_ACTIVE_SW='Y'";
	
	
	private Map<Long, List<String>> groupRoleMap = new HashMap<>();
	
	
	
	@Autowired
	  private JavaMailSender mailSender;
	
	@Autowired
	private CommonJpaService commonJpaService;
	
	// Get file history for supervisor
	public List<UserFileHistory> getUserFileHistory(Long userGroupKey) {
		List<UserFileHistory>  userFileHistory = null;		
		Map<String, Object> paramsUserMap = new HashMap<>();
		/*paramsUserMap.put("GCM_USER_KEY", userKey);		
		Long userGroupKey =  commonJpaService.getResultObject(GET_USER_GROUP_QUERY, paramsUserMap, Long.class);
		LOG.info("User group key : " + userGroupKey);	
		paramsUserMap.remove("GCM_USER_KEY");*/
		paramsUserMap.put("GCM_GROUP_KEY", userGroupKey);		
		userFileHistory =  commonJpaService.getResultList(GET_USER_FILE_HISTORY_QUERY, paramsUserMap, UserFileHistory.class);
		return userFileHistory;		
	}
	
	// Get ext users from the uploaded file
	public List<StgExtUserInfo> getValidatedExtUsers(Long stgExtUserFileInfoKey,Long groupKey){
		List<StgExtUserInfo>  validatedUsers = null;
		Map<String, Object> paramsValUserMap = new HashMap<>();
		paramsValUserMap.put("STG_EXT_USER_FILE_INFO_KEY", stgExtUserFileInfoKey);
		LOG.info("Stage Ext User File Info Key  : " + stgExtUserFileInfoKey);	
		paramsValUserMap.put("GCM_GROUP_KEY", groupKey);
		validatedUsers =  commonJpaService.getResultList(GET_STG_USERS_BY_FILE_KEY, paramsValUserMap, StgExtUserInfo.class);
		return validatedUsers;	
	}
	
	// Get ext user by email
	public StgExtUserInfo getValidExtUser(String email){
		StgExtUserInfo  validatedUser = null;
		Map<String, Object> paramsValUserMap = new HashMap<>();
		paramsValUserMap.put("EMAIL", email.toUpperCase());
		LOG.info("Stage ext user's email  : {}", email);	
		validatedUser =  commonJpaService.getResultObject(GET_STG_USER_BY_EMAIL, paramsValUserMap, StgExtUserInfo.class);
		return validatedUser;
	}
	
	// Bulk upload of users
	public InsertStgUserObject validateAndUpdateExtUsers(InsertStgUserObject insertStgUserObj)
	{
		InsertStgUserObject returnObj = new InsertStgUserObject();
		StgExtUserFileInfo stgExtUserFileInfo = insertStgUserObj.getInsertStgUser().getStgExtUserFileInfo();
		List<StgExtUserInfo> extStgUsers = new ArrayList<StgExtUserInfo>();
		StgExtUserInfo newStgUser = null;
		updateFileInfo(stgExtUserFileInfo);
		// set fileKey and insert details
		InsertStgUser insertStgUser = new InsertStgUser();
		stgExtUserFileInfo.setStgExtUserFileInfoKey(stgExtUserFileInfo.getStgExtUserFileInfoKey());
		insertStgUser.setStgExtUserFileInfo(stgExtUserFileInfo);	
		List<StgExtUserInfo> stgExtUsers = insertStgUserObj.getInsertStgUser().getStgExtUserInfo();		
		for(int i=0;i<stgExtUsers.size();i++) {
			StgExtUserInfo extUser = stgExtUsers.get(i);
			newStgUser = updateExtUser(extUser,stgExtUserFileInfo.getGcmGroupKey(),insertStgUserObj.getInsertStgUser().getRoleCode());
			extStgUsers.add(newStgUser);
		}
		insertStgUser.setStgExtUserInfo(extStgUsers);
		returnObj.setInsertStgUser(insertStgUser);
		return returnObj;
	}
	
	public Long updateFileInfo(StgExtUserFileInfo fileInfo)
	{		
		Map<String, Object> paramsValExtUserFileMap = new HashMap<>();	
		paramsValExtUserFileMap.put("STG_EXT_USER_FILE_INFO_KEY",fileInfo.getStgExtUserFileInfoKey());
		paramsValExtUserFileMap.put("LAST_PROCCESSED_ON",new java.sql.Timestamp(System.currentTimeMillis()));
		paramsValExtUserFileMap.put("MODIFIED_DATE_TIME",new java.sql.Timestamp(System.currentTimeMillis()));
		paramsValExtUserFileMap.put("MODIFIED_BY",fileInfo.getModifiedBy());
		long fileKey = commonJpaService.update(UPDATE_STG_USER_FILE, paramsValExtUserFileMap);
		return fileKey;
	}
	
	public StgExtUserInfo updateExtUser(StgExtUserInfo stgExtUserInfo,Long gcmGroupKey, String roleCode) {
		
		String isUserValidBeforeSave = stgExtUserInfo.getIsValid();
		StgExtUserInfo newStgUser = new StgExtUserInfo();		
		//validate all the details while updating
		newStgUser = validateExtUser(stgExtUserInfo,gcmGroupKey,true);
		Map<String, Object> paramsValExtUserMap = new HashMap<>();
		paramsValExtUserMap.put("STG_EXT_USER_INFO_KEY",newStgUser.getStgExtUserInfoKey());
		paramsValExtUserMap.put("FIRST_NAME",newStgUser.getFirstName());
		paramsValExtUserMap.put("LAST_NAME",newStgUser.getLastName());
		paramsValExtUserMap.put("IS_VALID",newStgUser.getIsValid());
		paramsValExtUserMap.put("ORGANIZATION_NAME",newStgUser.getOrganizationName());
		paramsValExtUserMap.put("GCM_VENDOR_KEY",newStgUser.getGcmVendorKey());
		paramsValExtUserMap.put("REPORTS_TO_USERID",newStgUser.getReportsToUserID());		
		paramsValExtUserMap.put("ROLE",newStgUser.getRole());
		paramsValExtUserMap.put("EMAIL",newStgUser.getEmail());
		paramsValExtUserMap.put("VAL_MESSAGE",newStgUser.getValMessage());
		paramsValExtUserMap.put("CONTACT_ADDRESS_1",newStgUser.getContactAddress1());		
		paramsValExtUserMap.put("CONTACT_ADDRESS_2",newStgUser.getContactAddress2());
		paramsValExtUserMap.put("CONTACT_CITY",newStgUser.getContactCity());
		paramsValExtUserMap.put("CONTACT_STATE",newStgUser.getContactState());
		paramsValExtUserMap.put("CONTACT_ZIP_CODE",newStgUser.getContactZipCode());
		paramsValExtUserMap.put("MODIFIED_BY",newStgUser.getModifiedBy());
		paramsValExtUserMap.put("MODIFIED_DATE_TIME",new java.sql.Timestamp(System.currentTimeMillis()));
		int userKey = commonJpaService.update(UPDATE_STG_USER, paramsValExtUserMap);
		if(userKey > 0 && (newStgUser.getIsValid().equalsIgnoreCase("Y") && isUserValidBeforeSave.equalsIgnoreCase("N"))) {
			// user details in stage successfully updated
			// Update service to Send a mail 
			sendUserRegistrationMailForExtUser(stgExtUserInfo.getStgExtUserInfoKey(), newStgUser);
		}
		return newStgUser;		
	}
	

	// Bulk upload of users
	public InsertStgUserObject validateAndInsertExtUsers(InsertStgUserObject insertStgUserObj)
	{
		InsertStgUserObject returnObj = new InsertStgUserObject();
		StgExtUserFileInfo stgExtUserFileInfo = insertStgUserObj.getInsertStgUser().getStgExtUserFileInfo();
		List<StgExtUserInfo> extStgUsers = new ArrayList<StgExtUserInfo>();
		StgExtUserInfo newStgUser = null;
		Long fileKey = insertFileInfo(stgExtUserFileInfo);
		// set fileKey and insert details
		InsertStgUser insertStgUser = new InsertStgUser();
		stgExtUserFileInfo.setStgExtUserFileInfoKey(fileKey);
		insertStgUser.setStgExtUserFileInfo(stgExtUserFileInfo);	
		List<StgExtUserInfo> stgExtUsers = insertStgUserObj.getInsertStgUser().getStgExtUserInfo();
		
		for(int i=0;i<stgExtUsers.size();i++) {
			StgExtUserInfo extUser = stgExtUsers.get(i);
			extUser.setStgExtUserFileInfoKey(fileKey);
			newStgUser = insertExtUser(extUser,stgExtUserFileInfo.getGcmGroupKey(),insertStgUserObj.getInsertStgUser().getRoleCode());
			extStgUsers.add(newStgUser);
		}
		insertStgUser.setStgExtUserInfo(extStgUsers);
		returnObj.setInsertStgUser(insertStgUser);
		return returnObj;
	}
	
	public Long insertFileInfo(StgExtUserFileInfo fileInfo)
	{
		StgExtUserFileInfo newUserFileInfo = new StgExtUserFileInfo();
		newUserFileInfo.setFileName(fileInfo.getFileName());
		newUserFileInfo.setUploadedBy(fileInfo.getUploadedBy());
		newUserFileInfo.setGcmGroupKey(fileInfo.getGcmGroupKey());
		newUserFileInfo.setLastProcessOn(new java.sql.Timestamp(System.currentTimeMillis()));
		newUserFileInfo.setCreatedBy(fileInfo.getCreatedBy());
		newUserFileInfo.setCreationDate(new java.sql.Timestamp(System.currentTimeMillis()));
		newUserFileInfo.setModifiedBy(fileInfo.getUploadedBy());
		newUserFileInfo.setModifiedDate(new java.sql.Timestamp(System.currentTimeMillis()));
		Long stgExtUserFileInfoKey = commonJpaService.persist(newUserFileInfo);
		return stgExtUserFileInfoKey;
	}
	
	public StgExtUserInfo insertExtUser(StgExtUserInfo stgExtUserInfo,Long gcmGroupKey, String roleCode) {
		
		StgExtUserInfo newStgUser = new StgExtUserInfo();
		
		newStgUser.setStgExtUserFileInfoKey(stgExtUserInfo.getStgExtUserFileInfoKey());
		//validate all the details while inserting
		newStgUser = validateExtUser(stgExtUserInfo,gcmGroupKey,false);
		newStgUser.setCreatedBy(stgExtUserInfo.getCreatedBy());
		newStgUser.setCreationDate(new java.sql.Timestamp(System.currentTimeMillis()));
		newStgUser.setModifiedDate(new java.sql.Timestamp(System.currentTimeMillis()));
		Long userKey = commonJpaService.persist(newStgUser);
		if(userKey > 0 && newStgUser.getIsValid().equalsIgnoreCase("Y") ) {
			// user details in stage successfully loaded
			// Service to send a mail to registered user
			sendUserRegistrationMailForExtUser(userKey, newStgUser);
		}
		newStgUser.setStgExtUserInfoKey(userKey);
		return newStgUser;
	}
	
	private StgExtUserInfo validateExtUser(StgExtUserInfo stgExtUserInfo,Long gcmGroupKey, boolean isUpdate) {
		String duplicateUserValMessage = isDuplicateUser(stgExtUserInfo,isUpdate);
		if(duplicateUserValMessage.length() > 0) {
			stgExtUserInfo.setIsValid("N");
			stgExtUserInfo.setValMessage(duplicateUserValMessage);
			return stgExtUserInfo;
		}
		
		StringBuilder str = new StringBuilder(1000);
		String valMessage="";
		Long groupKey = gcmGroupKey;//getGroupKeyByFileKey(stgExtUserInfo.getStgExtUserFileInfoKey());
		stgExtUserInfo.setFirstName(stgExtUserInfo.getFirstName().trim());
		stgExtUserInfo.setLastName(stgExtUserInfo.getLastName().trim());
		
		str.append(stgExtUserInfo.getOrganizationName().contains("||")?"Incorrect format of Organizations provided in file,":"");
		stgExtUserInfo.setEmail(stgExtUserInfo.getEmail().trim());
		stgExtUserInfo.setRole(stgExtUserInfo.getRole().trim().toUpperCase());
		str.append(stgExtUserInfo.getRole().contains("||")?"Incorrect format of Roles provided in file,":"");
		stgExtUserInfo.setOrganizationName(stgExtUserInfo.getOrganizationName().trim().toUpperCase());
		
		
		if(stgExtUserInfo.getContactAddress1() != null ) {
			stgExtUserInfo.setContactAddress1(stgExtUserInfo.getContactAddress1().trim());
		}
		if(stgExtUserInfo.getContactAddress2() != null) {
			stgExtUserInfo.setContactAddress2(stgExtUserInfo.getContactAddress2().trim());
		}
		if(stgExtUserInfo.getContactCity() != null) {
			stgExtUserInfo.setContactCity(stgExtUserInfo.getContactCity().trim());
		}
		if(stgExtUserInfo.getContactState() != null) {
			stgExtUserInfo.setContactState(stgExtUserInfo.getContactState().trim());
		}
		if(stgExtUserInfo.getContactZipCode() != null) {
			stgExtUserInfo.setContactZipCode(stgExtUserInfo.getContactZipCode());
		}
		stgExtUserInfo.setStgExtUserFileInfoKey(stgExtUserInfo.getStgExtUserFileInfoKey());
		stgExtUserInfo.setIsValid("Y");
		
		stgExtUserInfo.setAccMgrUserID(stgExtUserInfo.getAccMgrUserID().trim());	
		
		stgExtUserInfo.setModifiedBy(stgExtUserInfo.getModifiedBy());
		
		// validate organization
		String vendor[]=stgExtUserInfo.getOrganizationName().split("\\|");
		
		if(! stgExtUserInfo.getOrganizationName().trim().isEmpty())
		{
			for(int j=0;j<vendor.length;j++)
			{
				GCMUserVendor vendorDetails = getOrganizationDetails(vendor[j].trim().toUpperCase(),groupKey);
				if(vendorDetails != null) {
					String orgName = vendorDetails.getVendorName();
					boolean isOrgValid = orgName.equalsIgnoreCase("") ? false : true;
					if(isOrgValid)
					{
					//	stgExtUserInfo.setOrganizationName(j!=0?stgExtUserInfo.getOrganizationName()+"|"+orgName :orgName);
						stgExtUserInfo.setGcmVendorKey(StringUtils.isNotBlank(stgExtUserInfo.getGcmVendorKey())
								? stgExtUserInfo.getGcmVendorKey() + "|" + vendorDetails.getGcmVendorKey()
								: vendorDetails.getGcmVendorKey());
						if(stgExtUserInfo.getReportsToUserID() !=null && stgExtUserInfo.getReportsToUserID().length() > 0) {
							stgExtUserInfo.setReportsToUserID(stgExtUserInfo.getReportsToUserID().trim());
							// validate reports to user	
							String validateReportsTo = isValidReportsID(stgExtUserInfo.getReportsToUserID().trim().toUpperCase(),groupKey, Long.valueOf(vendorDetails.getGcmVendorKey()));
							if(validateReportsTo.length() > 0) {
								str.append(validateReportsTo).append(orgName).append("," );
							}
						}else {
							str.append("OrganizationName (DTL-4) is not associated with the ReportsToManagerUserId. : ").append(orgName).append(",");
						}
					}else {
					//	stgExtUserInfo.setOrganizationName(stgExtUserInfo.getOrganizationName().trim());
						str.append("OrganizationName (DTL-4) is not configured in the system.,");
					}
					
				}else {
					//str.append(vendor[j]).append(" : OrganizationName (DTL-4) is not configured in the system.,");
					str.append("OrganizationName (DTL-4) is not configured in the system.:").append(vendor[j]).append(",");
				}
			}
		}
		else
		{
			str.append("OrganizationName (DTL-4) is not configured in the system.,");
		}
		String multipleRoles[] = stgExtUserInfo.getRole().trim().toUpperCase().split("\\|");
		// str.append(vendor.length!=multipleRoles.length ?str.append("OrganizationName
		// (DTL-4) is not associated with the ReportsToManagerUserId. :
		// ").append(orgName).append(","):"");
		if (!stgExtUserInfo.getOrganizationName().trim().isEmpty()) {
			for (int j = 0; j < vendor.length; j++) {
				GCMUserVendor vendorDetails = getOrganizationDetails(vendor[j].trim().toUpperCase(), groupKey);
				if (vendorDetails == null) {
					str.append(vendor.length != multipleRoles.length ?"OrganizationName (DTL-4) is not associated with the ReportsToManagerUserId. : " +(vendor[j])+"," : "");
				}
			}
		}
		for(int k=0;k<multipleRoles.length;k++) {	
			String roles[] = multipleRoles[k].trim().toUpperCase().split(";");
			for(int i=0;i<roles.length;i++) {
				if(roles[i].equalsIgnoreCase("SA") || roles[i].equalsIgnoreCase("IM")) {
					str.append(roles[i]).append(": Role cannot be added through file. Please contact support team. ");
					break;
				}else if(! isRoleValid(roles[i],groupKey)) {
					//str.append(roles[i]).append(": Invalid Role (DTL-5) entered.,");
					str.append("Invalid Role (DTL-5) entered.: ").append(roles[i]).append(".");
					break;
				}
			}
		}
		
		
		if(str.length() > 1){
			valMessage= str.substring(0, str.length()-1);
			stgExtUserInfo.setIsValid("N");
		}
		stgExtUserInfo.setValMessage(valMessage);
		return stgExtUserInfo;
	}
	
	private GCMUserVendor getOrganizationDetails(String orgName , Long groupKey) {
		GCMUserVendor orgnization = null;
		Map<String, Object> paramsOrgMap = new HashMap<>();
		paramsOrgMap.put("VENDOR_NAME", orgName);
		paramsOrgMap.put("GCM_GROUP_KEY", groupKey);
		try {
			orgnization =  commonJpaService.getResultObject(GET_GCM_VENDOR, paramsOrgMap, GCMUserVendor.class);
		}catch(EmptyResultDataAccessException ex) {
		LOG.error("Exception occured while getOrganizationDetails ", ex);}
		return orgnization;
		
	}
	
	@SuppressWarnings("unused")
	private GCMUserVendor getDefaultOrganizationDetails(Long groupKey) {		
		GCMUserVendor orgnization = null;
		Map<String, Object> paramsOrgMap = new HashMap<>();
		paramsOrgMap.put("GCM_GROUP_KEY", groupKey);
		orgnization =  commonJpaService.getResultObject(GET_DEFAULT_VENDOR_BY_GROUP, paramsOrgMap, GCMUserVendor.class);
		return orgnization;
	}
	
	private String isValidReportsID(String userId, Long gcmGroupKey, Long gcmVendorKey) {
		String validationMessage = "";
		int count = 0;
		Long groupKey =  gcmGroupKey;
		Map<String, Object> paramsDupUserMap = new HashMap<>();
		paramsDupUserMap.put("GCM_GROUP_KEY", groupKey);
		// Check in gcm user table		
		//Map<String, Object> paramsDupUserMap = new HashMap<>();
		paramsDupUserMap.put("USERID", userId.trim().toUpperCase());
		paramsDupUserMap.put("GCM_VENDOR_KEY", gcmVendorKey);
		count = commonJpaService.getResultObject(GET_GCM_REPORTS_USER, paramsDupUserMap, Integer.class);
		
		if(count == 0) {
			validationMessage = "OrganizationName (DTL-4) is not associated with the ReportsToManagerUserId. : ";			
		}/* Commenting out the check for user has supervisor role or not as with CUA role and PNP, N&UQA implementation no need to check wheather the user has supervisor role or not 
		else {
			count = 0;
			//paramsDupUserMap.remove("GCM_GROUP_KEY");
			paramsDupUserMap.put("USERID", userId.trim().toUpperCase());
			if(groupInfo.getIsInternalGroup().equalsIgnoreCase("Y")) {
				count = commonJpaService.getResultObject(IS_USER_OPTUMADMIN , paramsDupUserMap, Integer.class);
				if(count == 0) {				
					validationMessage = "Reports To UserID doesn't have Optum User Admin role";
				}
			}else {
				count = commonJpaService.getResultObject(IS_USER_SUPERVISOR, paramsDupUserMap, Integer.class);
				if(count == 0) {				
					validationMessage = "Reports To UserID doesn't have Supervisor role";
				}
			}
		}*/
		return validationMessage;
	}
	
	private String isDuplicateUser(StgExtUserInfo stgExtUserInfo , boolean isUpdate) {
		int userCount =  0;
		String email = stgExtUserInfo.getEmail().trim().toUpperCase();
		Integer groupKey =  getGroupKeyByFileKey(stgExtUserInfo.getStgExtUserFileInfoKey());
		// Check in gcm user table		
		Map<String, Object> paramsDupUserMap = new HashMap<>();
		paramsDupUserMap.put("EMAIL", email);
		paramsDupUserMap.put("GCM_GROUP_KEY", groupKey);
		List<KeyValue<Integer, String>> list =	commonJpaService.getKeyKeyValueResults(GET_GCM_USER_COUNT_BY_EMAIL, paramsDupUserMap, Integer.class);
		for (KeyValue<Integer, String> keyVal : list) {
			if(keyVal.getKey() == groupKey) {
				return "Email (DTL-3) has already been registered.";
			}
			else {
				return "Multiple client access not allowed. ";
			}
		}
		
		// Check in Stage table
		if(isUpdate) {
			// this will be called while updating the stage user details
			paramsDupUserMap.put("STG_EXT_USER_INFO_KEY", stgExtUserInfo.getStgExtUserInfoKey());
			paramsDupUserMap.put("GCM_VENDOR_KEY", stgExtUserInfo.getGcmVendorKey());
			userCount =	commonJpaService.getResultObject(GET_STG_USER_COUNT_BY_EMAIL_EXCEPT_CURRENT, paramsDupUserMap, Integer.class);
			if(userCount > 0) {
				return "Email (DTL-3) has already been registered.";
			}			
		}else
		{		
			// this will be called while inserting the stage user details
			userCount =	commonJpaService.getResultObject(GET_STG_USER_COUNT_BY_EMAIL, paramsDupUserMap, Integer.class);
			if(userCount > 0) {
				return "Email (DTL-3) has already been registered.";
			}
		}
		return "";
	}
	
	
	public Integer getGroupKeyByFileKey(Long extFileKey)
	{
		Map<String, Object> paramsDupUserMap = new HashMap<>();
		paramsDupUserMap.put("STG_EXT_USER_FILE_INFO_KEY", extFileKey);		
		return commonJpaService.getResultObject(GET_USER_GROUP_BY_FILEKEY, paramsDupUserMap, Integer.class);
	}
	
	private boolean isRoleValid(String role,long gcmGroupKey)
	{
		return isRoleCodesByGroup(gcmGroupKey, role);
	}
	
	private boolean isRoleCodesByGroup(Long gcmGroupKey, String roleCode){
		List<String> roleCodeList =  groupRoleMap.get(gcmGroupKey);
		if(null != roleCodeList) {
			return roleCodeList.indexOf(roleCode.toUpperCase()) >= 0;
		}else
		{
			Map<String, Object> paramsRoleMap = new HashMap<>();
			paramsRoleMap.put("GCM_GROUP_KEY", gcmGroupKey);
			roleCodeList = commonJpaService.getResultList(GET_ROLE_CODE_BY_GROUP, paramsRoleMap, String.class);
			groupRoleMap.put(gcmGroupKey, roleCodeList);
			return roleCodeList.indexOf(roleCode.toUpperCase()) >= 0;
		}
	}
	
	public GCMUser getUserDetailsByUserId(String userId) {
		GCMUser userDetails = null;
		Map<String, Object> paramsValUserMap = new HashMap<>();
		paramsValUserMap.put("USERID", userId.toUpperCase());
		userDetails = commonJpaService.getResultObject(GET_ACTIVE_USER_DETAILS, paramsValUserMap, GCMUser.class);
		return userDetails;
	}
	
	// Get user by ext user key
	public StgExtUserInfo getValidStgExtUserByKey(Long StgExtUserInfoKey){
		StgExtUserInfo  validatedUser = null;
		Map<String, Object> paramsValUserMap = new HashMap<>();
		paramsValUserMap.put("STG_EXT_USER_INFO_KEY", StgExtUserInfoKey);
		LOG.info("Stage ext user's StgExtUserInfoKey  : " + StgExtUserInfoKey);	
		validatedUser =  commonJpaService.getResultObject(GET_STG_USER_BY_KEY, paramsValUserMap, StgExtUserInfo.class);
		return validatedUser;
	}
	
	public Integer sendUserRegistrationMailForExtUser(Long StgExtUserKey, StgExtUserInfo extUserInfo) {
		// get details from mail using config COMM_USER_REGISTRATION
		// send mail
		Map<String, Object> paramsMailMap = new HashMap<>();
		paramsMailMap.put("GCM_CONFIG_NAME", "COMM_USER_REGISTRATION");
		GcmMailContent gcmMailContent = commonJpaService.getResultObject(GET_MAIL_CONTENT, paramsMailMap, GcmMailContent.class);
		
		String content = gcmMailContent.getContent();
		boolean isHtmlContent = (gcmMailContent.getContentType().equalsIgnoreCase("HTML")) ? true : false;
		String subject = gcmMailContent.getSubject();	
		if(content == null || content.isEmpty()) {
			// Email From Configurations Not valid
			LOG.error("Mail Content is not available to send User Registration mail");
			return 112;
		}
		
		if(subject == null || subject.isEmpty()) {
			// Email From Configurations Not valid
			LOG.error("Subject is not available to send User Registration mail");
			return 113;
		}
		
		List<GcmMailId> gcmMailIdList = commonJpaService.getResultList(GET_MAIL_ID, paramsMailMap, GcmMailId.class);
		String from = "";
		List<String> toList = new ArrayList<>();
		List<String> ccList = new ArrayList<>();
		
		for(int i=0;i<gcmMailIdList.size();i++) {
			GcmMailId gcmMailId = gcmMailIdList.get(i);			
			if(gcmMailId.getType().equalsIgnoreCase("FROM")) {
				from = gcmMailId.getMailId();
			}
			
			if(gcmMailId.getType().equalsIgnoreCase("TO")) {
				toList.add(gcmMailId.getMailId());
			}
			
			if(gcmMailId.getType().equalsIgnoreCase("CC")) {
				
				ccList.add(gcmMailId.getMailId());
			}
			
		}		
		if(from.isEmpty()) {
			// Email From Configurations Not valid
			LOG.error("FROM configuration not available to send User Registration mail");
			return 114;
		}
		// Get ext user details by key
		if(null == extUserInfo)
		{
			extUserInfo   = getValidStgExtUserByKey(StgExtUserKey);
		}
		toList.add(extUserInfo.getEmail());
		GCMUser reportsToDetails = getUserDetailsByUserId(extUserInfo.getReportsToUserID());
		ccList.add(reportsToDetails.getEmail());
		String env =getEnvironment("BATCH","ENV");
		if(null!=env) {
			subject = subject.replaceAll("\\$ENV", env);
		}
		content = content.replaceAll("#userfullname#", extUserInfo.getFirstName()+" "+ extUserInfo.getLastName());
		content = content.replaceAll("#supervisorfullname#", reportsToDetails.getFirstName()+" "+ reportsToDetails.getLastName());
		try {
			String[] to = toList.toArray(new String[0]);
			String[] cc = ccList.toArray(new String[0]);
			prepareMessage(subject,content,isHtmlContent,from,to,cc,null,null);
		} catch (MessagingException e) {
			LOG.error(e.getMessage());
		} catch (Exception e) {
			LOG.error(e.getMessage());
		}
		return 115;
	}
	
	public String getEnvironment(String configNm, String paramNm)
	{
		Map<String, Object> paramsMap = new HashMap<>();
		paramsMap.put("CONFIG_NAME", configNm);	
		paramsMap.put("PARAM_NAME", paramNm);
		return commonJpaService.getResultObject(GET_ENV, paramsMap, String.class);
	}
	 
	  private void prepareMessage(String subject, String content, boolean isHtmlContent,
		      String from, String[] to, String[] cc, String[] bcc, File attachment)
		      throws MessagingException {
	    MimeMessage mimeMessage = mailSender.createMimeMessage();
	    MimeMessageHelper msgHelper = new MimeMessageHelper(mimeMessage, true);
	    msgHelper.setFrom(from);
	    msgHelper.setTo(to);
	    msgHelper.setSubject(subject);
	    if (cc != null && cc.length > 0) {
	      msgHelper.setCc(cc);
	    }
	    if (bcc != null && bcc.length > 0) {
	      msgHelper.setBcc(bcc);
	    }
	    if (attachment != null && attachment.exists()) {
	      msgHelper.addAttachment(attachment.getName(), attachment);
	    }
	    if(LOG.isDebugEnabled()){
	    	LOG.debug("Mail Subject : " + subject);
	    	LOG.debug("Mail Content : " + content);
	    }
	    msgHelper.setText(content, isHtmlContent);
	    mailSender.send(mimeMessage);;
	  }	
}