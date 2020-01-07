package com.optum.gcm.sevice;

import static com.optum.gcm.common.util.LoggingUtil.logInfo;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.optum.gcm.common.CreateUserinDocumentum;
import com.optum.gcm.common.RemoveUserinDocumentum;
import com.optum.gcm.common.dao.CommonJpaDao;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.dao.constants.SchedulingWorkFlowQueries;
import com.optum.gcm.model.GCMUser;
import com.optum.gcm.model.GcmMailContent;
import com.optum.gcm.model.GcmMailId;
import com.optum.gcm.model.GcmUserRole;
import com.optum.gcm.model.Role;
import com.optum.gcm.model.UserAdminFilter;
import com.optum.gcm.model.UserAdminModel;
import com.optum.gcm.model.UserData;
import com.optum.gcm.model.UserVendor;
import com.optum.gcm.model.Vendor;
import com.optum.gcm.model.VendorReqObj;

@Service
public class UserAdministrationService {

	private static final Logger LOG = LoggerFactory.getLogger(UserAdministrationService.class);

	private static final String USER_DETAILS = "SELECT USERID, LAST_NAME, FIRST_NAME, EMAIL FROM GCM_USER WHERE GCM_USER_KEY =:GCM_USER_KEY";

	private static final String GET_ACTIVE_USER_DETAILS = "SELECT * FROM GCM_USER WHERE GCM_USER_KEY =:GCM_USER_KEY AND IS_ACTIVE_SW='Y'";

	private static final String UPDATE_SUPERVISOR = "UPDATE GCM_USER SET GCM_APPROVED_USER_KEY =:SUPERVISOR_ID, MODIFY_USERID =:MODIFY_USERID, "
			+ " MODIFY_DATE_TIME = SYSDATE WHERE GCM_USER_KEY =:GCM_USER_KEY";

	private static final String INACTIVATE_USER = "UPDATE gcm_user "
			+ "SET "
			+ "    is_active_sw = :IS_ACTIVE_SW, "
			+ "    modify_userid = :MODIFY_USERID, "
			+ "    modify_date_time = SYSDATE "
			+ "WHERE "
			+ "    gcm_user_key = :GCM_USER_KEY "
			+ "    AND NOT EXISTS ( "
			+ "        SELECT "
			+ "            * "
			+ "        FROM "
			+ "            ( "
			+ "                SELECT "
			+ "                    24 * ( SYSDATE - MAX(create_date_time) ) hour_diff "
			+ "                FROM "
			+ "                    gcm_user_logon "
			+ "                WHERE "
			+ "                    logoff_time IS NULL "
			+ "                    AND gcm_user_key = :GCM_USER_KEY "
			+ "            ) "
			+ "        WHERE "
			+ "            hour_diff < 8 "
			+ "    ) ";

	private static final String ACTIVATE_USER = "UPDATE GCM_USER SET IS_ACTIVE_SW =:IS_ACTIVE_SW, MODIFY_USERID =:MODIFY_USERID, "
			+ "MODIFY_DATE_TIME = SYSDATE, GCM_APPROVED_USER_KEY = :GCM_APPROVED_USER_KEY, INACTIVATE_NOTIFICATION_DT = NULL  WHERE GCM_USER_KEY =:GCM_USER_KEY";

	private static final String GET_USER_BY_EMAIL = "SELECT * FROM GCM_USER where UPPER(EMAIL) = UPPER(:EMAIL) AND GCM_USER_KEY = :GCM_USER_KEY ";

	private static final String USER_ADMIN_LIST = "SELECT * FROM (SELECT gu1.gcm_user_key, gu1.last_name, gu1.first_name, gu1.userid, gu1.email,"
			+ "    gu1.gcm_approved_user_key AS supervisorid, "
			+ "    gu2.last_name ||  ', ' ||  gu2.first_name AS supervisor, "
			+ "    CASE WHEN gu1.is_active_sw = 'Y' THEN 'Active' ELSE 'Inactive' END AS status, "
			+ "    COUNT(DISTINCT rll.gcm_role_code) AS role_cnt, "
			+ "    LISTAGG(rln.gcm_role_name,'|') WITHIN GROUP(ORDER BY rln.gcm_role_name) AS role_names, "
			+ "    LISTAGG(rln.gcm_role_code,'|') WITHIN GROUP(ORDER BY rln.gcm_role_code) AS role_code " + "FROM "
			+ "    gcm_user gu1 " + "    INNER JOIN gcm_user gu2 ON gu1.gcm_approved_user_key = gu2.gcm_user_key "
			+ "    INNER JOIN gcm_user_role rll ON gu1.gcm_user_key = rll.gcm_user_key AND ((gu1.is_active_sw = 'Y' AND rll.is_active_sw = 'Y') OR gu1.is_active_sw = 'N') "
			+ "    INNER JOIN gcm_role_list rln ON rll.gcm_role_code = rln.gcm_role_code "
			+ "WHERE rll.gcm_vendor_key =:gcm_vendor_key " + "GROUP BY "
			+ "    gu1.gcm_user_key, gu1.last_name, gu1.first_name, gu1.userid, gu1.email, gu1.gcm_approved_user_key, "
			+ "    gu2.last_name ||  ', ' ||  gu2.first_name, "
			+ "    CASE WHEN gu1.is_active_sw = 'Y' THEN 'Active' ELSE 'Inactive' END)" + " #WHERE# ";

	private static final String USER_ROLES_LIST_BY_VENDOR = "SELECT GRL.GCM_ROLE_CODE, GRL.GCM_ROLE_NAME FROM GCM_ROLE_LIST GRL INNER JOIN GCM_USER_ROLE GUR ON GRL.GCM_ROLE_CODE = GUR.GCM_ROLE_CODE"
			+ " WHERE GUR.GCM_USER_KEY =:GCM_USER_KEY AND GUR.GCM_VENDOR_KEY=:GCM_VENDOR_KEY AND GUR.IS_ACTIVE_SW = 'Y' AND GRL.GCM_ROLE_CODE not in ('SA' ,'IM','OGIM', 'OCUA') ";

	private static final String USER_ROLES_LIST = "SELECT DISTINCT GRL.GCM_ROLE_CODE, GRL.GCM_ROLE_NAME FROM GCM_ROLE_LIST GRL INNER JOIN GCM_USER_ROLE GUR ON GRL.GCM_ROLE_CODE = GUR.GCM_ROLE_CODE"
			+ " WHERE GUR.GCM_USER_KEY =:GCM_USER_KEY AND GUR.IS_ACTIVE_SW = 'Y' AND GRL.GCM_ROLE_CODE not in ( 'SA','IM','OGIM', 'OCUA') ";

	private static final String IS_USER_HAS_REPORTEES = "SELECT COUNT(*) FROM GCM_USER WHERE GCM_APPROVED_USER_KEY = :GCM_USER_KEY AND IS_ACTIVE_SW = 'Y' ";

	private static final String USER_ROLES_TO_UPDATE = "SELECT * FROM GCM_USER_ROLE WHERE GCM_USER_KEY=:GCM_USER_KEY AND GCM_VENDOR_KEY =:GCM_VENDOR_KEY";

	private static final String USER_ROLES_ENABLE = "UPDATE GCM_USER_ROLE SET IS_ACTIVE_SW =:IS_ACTIVE_SW, MODIFY_USERID =:MODIFY_USERID, MODIFY_DATE_TIME = SYSDATE "
			+ " WHERE GCM_USER_KEY =:GCM_USER_KEY AND GCM_VENDOR_KEY =:GCM_VENDOR_KEY AND GCM_ROLE_CODE =:GCM_ROLE_CODE ";

	private static final String GET_MAIL_CONTENT = "SELECT SUBJECT,CONTENT,CONTENT_TYPE FROM GCM_MAIL_CONFIG WHERE GCM_CONFIG_NAME=:GCM_CONFIG_NAME";

	private static final String GET_MAIL_ID = "SELECT NAME,MAIL_ID,TYPE FROM GCM_MAIL_ID WHERE GCM_CONFIG_NAME=:GCM_CONFIG_NAME";

	private static final String OUTREACH_SH_ROLE_CODE = "SH";

	private static final String ONSITE_SH_ROLE_CODE = "OSH";

	private static final String EMR_SH_ROLE_CODE = "ESH";

	private static final String PEND_MGR_ROLE_CODE = "PDM";

	private static final String CODER_ROLE_CODE = "COU";

	private static final String COD_SUP_ROLE_CODE = "CSP";

	private static final String QA_ROLE_CODE = "QA";

	private static final String PNP_PROCESSOR_ROLE_CODE = "PNPP";

	private static final String OPT_CODER_ROLE_CODE = "OCOU";

	private static final String OPT_COD_SUP_ROLE_CODE = "OCSP";

	private static final String GCM_ONSHORE_GROUP = "gcm_onshore";

	private static final String OPT_QA_ROLE_CODE = "OQA";

	private static final String GET_INPROGRESS_CODING_WORKITEM_COUNT = "SELECT COUNT(*) FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR "
			+ " WHERE GCM_USER_KEY = :GCM_USER_KEY AND GCM_BUSINESS_FUNC_KEY = :GCM_BUSINESS_FUNC_KEY "
			+ " AND GCM_BUS_FUNC_STATUS IN ('ASSIGNED', 'INPROGRESS', 'ESCALATED') ";

	private static final String GET_INPROGRESS_OPTUM_CODING_WORKITEM_COUNT = "SELECT COUNT(*) FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR "
			+ " WHERE GCM_USER_KEY = :GCM_USER_KEY  and GCM_VENDOR_KEY =:GCM_VENDOR_KEY "
			+ " AND GCM_BUS_FUNC_STATUS IN ('ASSIGNED', 'INPROGRESS', 'ESCALATED') ";

	private static final String GET_TOTAL_VENDORS_MAPPED_COUNT = "SELECT COUNT(*) FROM GCM_USER_VENDOR "
			+ " WHERE GCM_USER_KEY = :GCM_USER_KEY AND IS_ACTIVE_SW ='Y' ";

	private static final String GET_PNP_NOT_COMPLETED_WORKITEM_COUNT = " SELECT COUNT(*) "
			+ " FROM gcm_pnp_outreach po, gcm_pnp_content_extent pce WHERE "
			+ " po.gcm_pnp_outreach_key = pce.gcm_pnp_outreach_key  AND pce.gcm_pnp_status     IS NULL "
			+ " AND po.gcm_user_key= :GCM_NOTCOMPLETE_USER_KEY " + " AND ROWNUM = 1 ";

	private static final String GET_USER_VENDOR = "SELECT * FROM GCM_USER_VENDOR  WHERE GCM_USER_KEY =:GCM_USER_KEY AND GCM_VENDOR_KEY=:GCM_VENDOR_KEY ";
	
	@Autowired
	private CommonJpaDao commonJpaDao;

	@Autowired
	private CommonJpaService commonJpaService;

	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private UserRegistrationService userRegistrationService;

	public List<UserAdminModel> getUserAdminList(UserAdminFilter userAdminFilter) throws SQLException {
		logInfo(LOG, true, "getUserAdminList started with search filter: {}", userAdminFilter);
		Map<String, Object> params = new HashMap<>();
		params.put("gcm_vendor_key", userAdminFilter.getVendorKey());
		String queryString = "";
		String where = buildParams(userAdminFilter, params);
		queryString = USER_ADMIN_LIST.replace("#WHERE#", where);
		List<UserAdminModel> results = commonJpaService.getResultList(queryString, params, UserAdminModel.class);
		for (UserAdminModel userAdminModel : results) {
			if (Integer.parseInt(userAdminModel.getRoleCnt()) > 1) {
				userAdminModel.setRole("Multiple");
			} else {
				userAdminModel.setRole(userAdminModel.getRoleNames());
			}
		}

		return results;
	}

	public List<Role> getUserRolesList(Long userKey, Long vendorKey) throws SQLException {
		logInfo(LOG, true, "getUserRolesList for user key: {} ", userKey);
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_USER_KEY", userKey);
		params.put("GCM_VENDOR_KEY", vendorKey);
		List<Role> results = commonJpaService.getResultList(USER_ROLES_LIST_BY_VENDOR, params, Role.class);

		return results;
	}

	private String buildParams(UserAdminFilter userAdminFilter, Map<String, Object> appmap) {
		String whereClause = "";
		if (userAdminFilter != null) {
			if (StringUtils.isNotBlank(userAdminFilter.getLastName())) {
				whereClause += " upper(last_name) =upper(:last_name) ";
				appmap.put("last_name", userAdminFilter.getLastName());
			}
			if (StringUtils.isNotBlank(userAdminFilter.getFirstName())) {
				if (StringUtils.isNotBlank(whereClause)) {
					whereClause += "and";
				}
				whereClause += "  upper(first_name) = upper(:first_name) ";
				appmap.put("first_name", userAdminFilter.getFirstName());
			}
			if (StringUtils.isNotBlank(userAdminFilter.getUserId())) {
				if (StringUtils.isNotBlank(whereClause)) {
					whereClause += "and";
				}
				whereClause += " upper(userid) =upper(:userid) ";
				appmap.put("userid", userAdminFilter.getUserId());
			}
			if (StringUtils.isNotBlank(userAdminFilter.getRole())) {
				if (StringUtils.isNotBlank(whereClause)) {
					whereClause += "and";
				}
				whereClause += " (role_code like :role_code or role_code like :role_code1 or role_code like :role_code2 or role_code =:role_code3) ";
				appmap.put("role_code", userAdminFilter.getRole() + "|%");
				appmap.put("role_code1", "%|" + userAdminFilter.getRole() + "|%");
				appmap.put("role_code2", "%|" + userAdminFilter.getRole() + "");
				appmap.put("role_code3", userAdminFilter.getRole());
			}
			if (userAdminFilter.getSupervisor() != null && userAdminFilter.getSupervisor() > 0) {
				if (StringUtils.isNotBlank(whereClause)) {
					whereClause += "and";
				}
				whereClause += " supervisorid =:supervisorid ";
				appmap.put("supervisorid", userAdminFilter.getSupervisor());
			}
			if (StringUtils.isNotBlank(userAdminFilter.getStatus())) {
				if (StringUtils.isNotBlank(whereClause)) {
					whereClause += "and";
				}
				whereClause += " status = :status ";
				appmap.put("status", userAdminFilter.getStatus());
			}
		}
		if (StringUtils.isNotBlank(whereClause)) {
			whereClause = " where " + whereClause;
		}
		return whereClause;
	}

	public String changeSupervisor(List<UserAdminModel> users) throws SQLException {
		try {
			Map<String, Object> newSupervisorParams = new HashMap<>();
			newSupervisorParams.put("GCM_USER_KEY", users.get(0).getNewSupervisorId());
			Map<String, Object> loginParams = new HashMap<>();
			loginParams.put("GCM_USER_KEY", users.get(0).getLoginUserKey());
			UserData loginUserObj = commonJpaService.getResultObject(USER_DETAILS, loginParams, UserData.class);

			for (UserAdminModel user : users) {
				Map<String, Object> userParams = new HashMap<>();
				userParams.put("GCM_USER_KEY", user.getUserKey());
				Map<String, Object> updateParams = new HashMap<>();
				updateParams.put("SUPERVISOR_ID", user.getNewSupervisorId());
				updateParams.put("MODIFY_USERID", loginUserObj.getUserId());
				updateParams.put("GCM_USER_KEY", user.getUserKey());
				commonJpaService.update(UPDATE_SUPERVISOR, updateParams);
				sendChangeSuperVisorMail(user,loginUserObj.getEmail());
			}
		} catch (Exception e) {
			LOG.error("Exception occured while updating supervisor details", e);
		}
		return "SUCCESS";
	}

	private String canDisableUser(Long userKey) {
		List<Role> userRolesList = getRolesForUser(userKey);
		if (null == userRolesList || userRolesList.isEmpty())
			return "true";
		else {
			Long vendorKey = 0L;
			for (Role role : userRolesList) {
				String currentRole = role.getRoleCode();
				if (OUTREACH_SH_ROLE_CODE.equalsIgnoreCase(currentRole)
						|| ONSITE_SH_ROLE_CODE.equalsIgnoreCase(currentRole)
						|| EMR_SH_ROLE_CODE.equalsIgnoreCase(currentRole)
						|| PEND_MGR_ROLE_CODE.equalsIgnoreCase(currentRole)) {
					int busFuncDtlKey = OUTREACH_SH_ROLE_CODE.equalsIgnoreCase(currentRole) ? 1
							: (ONSITE_SH_ROLE_CODE.equalsIgnoreCase(currentRole) ? 2
									: EMR_SH_ROLE_CODE.equalsIgnoreCase(currentRole) ? 3 : 0);
					int count = getInprogressRETWIForuser(userKey, vendorKey, busFuncDtlKey);
					if (count > 0) {
						return "There are pending work items in user's scheduling work list. Reassign before removing the role..";
					}
					if (!PEND_MGR_ROLE_CODE.equalsIgnoreCase(currentRole)) {
						int apptcount = getInprogressApptForUser(userKey, vendorKey, busFuncDtlKey);
						if (apptcount > 0) {
							return "All work items for this user's my appointment work list must be removed before the user can be deactivated.";
						}
					} else {
						int pendCount = getPendApptCountForUser(userKey, vendorKey);
						if (pendCount > 0) {
							return "All work items for this user's Pend work list must be removed before the user can be deactivated.";
						}
					}
				} else if (CODER_ROLE_CODE.equalsIgnoreCase(currentRole)
						|| COD_SUP_ROLE_CODE.equalsIgnoreCase(currentRole)
						|| OPT_CODER_ROLE_CODE.equalsIgnoreCase(currentRole)
						|| OPT_COD_SUP_ROLE_CODE.equalsIgnoreCase(currentRole)) {
					int codingWorkitemCount = getNotCompletedCodingWorkitemCount(userKey, vendorKey, 2,
							(COD_SUP_ROLE_CODE.equalsIgnoreCase(currentRole)
									|| OPT_COD_SUP_ROLE_CODE.equalsIgnoreCase(currentRole)));
					if (codingWorkitemCount > 0) {
						return "All work items for this user's Coding/Coding Supervisor work list must be removed before the user can be deactivated.";
					}
				} else if (QA_ROLE_CODE.equalsIgnoreCase(currentRole)
						|| OPT_QA_ROLE_CODE.equalsIgnoreCase(currentRole)) {
					int codingWorkitemCount = getNotCompletedCodingWorkitemCount(userKey, vendorKey, 6, false);
					if (codingWorkitemCount > 0) {
						return "All work items for this user's QA work list must be removed before the user can be deactivated.";
					}
				} else if (PNP_PROCESSOR_ROLE_CODE.equalsIgnoreCase(currentRole)) {
					int codingWorkitemCount = getNotCompletedPNPWorkitemCount(userKey);
					if (codingWorkitemCount > 0) {
						return "All work items for this user's PNP work list must be removed before the user can be deactivated.";
					}
				} else if (isUserHasReportees(userKey) > 0) {
					return "All Reportees must be removed before user can be deactivated";
				}
			}
			return "true";
		}
	}

	private int isUserHasReportees(Long userKey) {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_USER_KEY", userKey);
		return commonJpaService.getResultObject(IS_USER_HAS_REPORTEES, params, Integer.class);
	}

	private List<Role> getRolesForUser(Long userKey) {
		logInfo(LOG, true, "getUserRolesList for user key: {} ", userKey);
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_USER_KEY", userKey);
		List<Role> results = commonJpaService.getResultList(USER_ROLES_LIST, params, Role.class);

		return results;
	}

	public String InactivateUser(Long user, Long loginUserKey) throws SQLException {
		try {
			String canDisableUserStr = canDisableUser(user);
			if ("true".equalsIgnoreCase(canDisableUserStr)) {
				Map<String, Object> loginParams = new HashMap<>();
				loginParams.put("GCM_USER_KEY", loginUserKey);
				UserData loginUserObj = commonJpaService.getResultObject(USER_DETAILS, loginParams, UserData.class);

				GCMUser userObj = getUserDetailsByUserKey(user);

				if (userObj != null && userObj.getUserID() != null) {
					Map<String, Object> updateParams = new HashMap<>();
					updateParams.put("IS_ACTIVE_SW", "N");
					updateParams.put("MODIFY_USERID", loginUserObj.getUserId());
					updateParams.put("GCM_USER_KEY", user);
					int cnt =commonJpaService.update(INACTIVATE_USER, updateParams);
					if(cnt>0){
						sendDisableMailToUser(userObj, "COMM_USER_DISABLE", false, loginUserObj.getEmail());
					}
					else{
						return "User currently logged in";
					}
				}
			} else {
				return canDisableUserStr;
			}
		} catch (Exception e) {
			LOG.error("Exception occured while Inactivating user", e);
		}
		return "SUCCESS";
	}

	public String activateUser(String emailid, Long userKey, Long loginUserKey, Long supervisorKey,
			List<String> roleCodes, Long vendorKey) throws SQLException {
		try {
			Map<String, Object> params = new HashMap<>();
			params.put("EMAIL", emailid);
			params.put("GCM_USER_KEY", userKey);
			GCMUser userObj = commonJpaService.getResultObject(GET_USER_BY_EMAIL, params, GCMUser.class);
			if (null != userObj && userObj.getUserID() != null) {
				Map<String, Object> loginParams = new HashMap<>();
				loginParams.put("GCM_USER_KEY", loginUserKey);
				UserData loginUserObj = commonJpaService.getResultObject(USER_DETAILS, loginParams, UserData.class);
				if (null != loginUserObj) {
					Map<String, Object> updateParams = new HashMap<>();
					updateParams.put("IS_ACTIVE_SW", "Y");
					updateParams.put("MODIFY_USERID", loginUserObj.getUserId());
					updateParams.put("GCM_USER_KEY", userKey);
					updateParams.put("GCM_APPROVED_USER_KEY", supervisorKey);
					// updateParams.put("ROLE_CODES", roleCodes);
					commonJpaService.update(ACTIVATE_USER, updateParams);
					if (null != roleCodes && roleCodes.size() > 0) {
						updateUserVendor("Y", loginUserObj.getUserId(), vendorKey, userKey);
						List<String> existingRoleCodes = new ArrayList<String>();
						updateUserRoles(userKey, vendorKey, loginUserKey, roleCodes, existingRoleCodes,
								loginUserObj.getUserId(), false);
					}
					sendDisableMailToUser(userObj, "COMM_USER_ENABLE", true, loginUserObj.getEmail());
				}
			} else {
				return "User with the emailid " + emailid + " does not exist";
			}
		} catch (Exception e) {
			return "Exception occured while activating the user";
		}
		return "SUCCESS";
	}

	public GCMUser validateUser(String email, Long userKey) {
		Map<String, Object> params = new HashMap<>();
		params.put("EMAIL", email);
		params.put("GCM_USER_KEY", userKey);
		return commonJpaService.getResultObject(GET_USER_BY_EMAIL, params, GCMUser.class);
	}

	public String updateUserRoles(Long userKey, Long vendorKey, Long loginUserKey, List<String> newRoles,
			List<String> existingRoleCodes, String adminUserId, boolean isMailRequired) {
		try {
			Map<String, Object> params = new HashMap<>();
			params.put("GCM_USER_KEY", loginUserKey);
			UserData loginUserObj = commonJpaService.getResultObject(USER_DETAILS, params, UserData.class);

			GCMUser userObj = getUserDetailsByUserKey(userKey);

			String rolesAdded = "";

			String rolesRemoved = "";

			for (String currentRole : existingRoleCodes) {
				if (!newRoles.contains(currentRole)) {
					if (OUTREACH_SH_ROLE_CODE.equalsIgnoreCase(currentRole)
							|| ONSITE_SH_ROLE_CODE.equalsIgnoreCase(currentRole)
							|| EMR_SH_ROLE_CODE.equalsIgnoreCase(currentRole)
							|| PEND_MGR_ROLE_CODE.equalsIgnoreCase(currentRole)) {
						int busFuncDtlKey = OUTREACH_SH_ROLE_CODE.equalsIgnoreCase(currentRole) ? 1
								: (ONSITE_SH_ROLE_CODE.equalsIgnoreCase(currentRole) ? 2
										: EMR_SH_ROLE_CODE.equalsIgnoreCase(currentRole) ? 3 : 0);
						int count = getInprogressRETWIForuser(userKey, vendorKey, busFuncDtlKey);
						if (count > 0) {
							return "There are pending work items in user's scheduling work list. Reassign before removing the role..";
						}
						if (!PEND_MGR_ROLE_CODE.equalsIgnoreCase(currentRole)) {
							int apptcount = getInprogressApptForUser(userKey, vendorKey, busFuncDtlKey);
							if (apptcount > 0) {
								return "All work items for this user's role must be removed before the role can be deactivated.";
							}
						} else {
							int pendCount = getPendApptCountForUser(userKey, vendorKey);
							if (pendCount > 0) {
								return "All work items for this user's role must be removed before the role can be deactivated.";
							}
						}
					} else if (CODER_ROLE_CODE.equalsIgnoreCase(currentRole)
							|| COD_SUP_ROLE_CODE.equalsIgnoreCase(currentRole)
							|| OPT_CODER_ROLE_CODE.equalsIgnoreCase(currentRole)
							|| OPT_COD_SUP_ROLE_CODE.equalsIgnoreCase(currentRole)) {
						int codingWorkitemCount = getNotCompletedCodingWorkitemCount(userKey, vendorKey, 2,
								(COD_SUP_ROLE_CODE.equalsIgnoreCase(currentRole)
										|| OPT_COD_SUP_ROLE_CODE.equalsIgnoreCase(currentRole)));
						if (codingWorkitemCount > 0) {
							return "All work items for this user's role must be removed before the role can be deactivated.";
						}
					} else if (QA_ROLE_CODE.equalsIgnoreCase(currentRole)
							|| OPT_QA_ROLE_CODE.equalsIgnoreCase(currentRole)) {
						int codingWorkitemCount = getNotCompletedCodingWorkitemCount(userKey, vendorKey, 6, false);
						if (codingWorkitemCount > 0) {
							return "All work items for this user's role must be removed before the role can be deactivated.";
						}
					} else if (PNP_PROCESSOR_ROLE_CODE.equalsIgnoreCase(currentRole)) {
						int codingWorkitemCount = getNotCompletedPNPWorkitemCount(userKey);
						if (codingWorkitemCount > 0) {
							return "All work items for this user's role must be removed before the role can be deactivated.";
						}
					}
				}
			}

			Map<String, Object> existingRolesparams = new HashMap<>();
			existingRolesparams.put("GCM_USER_KEY", userKey);
			existingRolesparams.put("GCM_VENDOR_KEY", vendorKey);
			List<GcmUserRole> existingRolesList = commonJpaService.getResultList(USER_ROLES_TO_UPDATE,
					existingRolesparams, GcmUserRole.class);
			List<GcmUserRole> existingActiveRolesList = new ArrayList<>();
			Map<String, String> existingRolesMap = new HashMap<String, String>();
			for (GcmUserRole role : existingRolesList) {
				existingRolesMap.put(role.getRoleCode(), role.getIsActive());
				if (role.getIsActive().equalsIgnoreCase("Y")) {
					existingActiveRolesList.add(role);
				}
			}
			Set<String> existingRoles = existingRolesMap.keySet();
			Map<String, String> roleCodeDescMap = getRoles();
			for (String newRole : newRoles) {
				// System Admin role can't be assigned through the system.. It will be assigned
				// only through manual process.
				if (!newRole.equalsIgnoreCase("SA")) {
					if (existingRoles.contains(newRole)) {
						if (null != existingRolesMap.get(newRole)
								&& !existingRolesMap.get(newRole).equalsIgnoreCase("Y")
								&& !existingRoleCodes.contains(newRole)) {
							Map<String, Object> updateParams = new HashMap<>();
							updateParams.put("IS_ACTIVE_SW", "Y");
							updateParams.put("MODIFY_USERID", loginUserObj.getUserId());
							updateParams.put("GCM_USER_KEY", userKey);
							updateParams.put("GCM_VENDOR_KEY", vendorKey);
							updateParams.put("GCM_ROLE_CODE", newRole);
							commonJpaService.update(USER_ROLES_ENABLE, updateParams);
							//updateUserRoles(userKey, vendorKey, loginUserKey, newRoles, existingRoleCodes, adminUserId, isMailRequired);
							rolesAdded += roleCodeDescMap.get(newRole) + ",";
						}
					} else {
						isUserVendorMappingExits(userKey, vendorKey, adminUserId);
						GcmUserRole gcmUserRole = new GcmUserRole();
						gcmUserRole.setUserKey(userKey);
						gcmUserRole.setRoleCode(newRole);
						gcmUserRole.setVendorKey(vendorKey);
						gcmUserRole.setReportsUserKey(null);
						gcmUserRole.setIsActive("Y");
						gcmUserRole.setCreateUser(loginUserObj.getUserId());
						gcmUserRole.setCreateDate(new java.sql.Timestamp(System.currentTimeMillis()));
						gcmUserRole.setModifiedUser(loginUserObj.getUserId());
						gcmUserRole.setModifiedDate(new java.sql.Timestamp(System.currentTimeMillis()));
						commonJpaDao.persist(gcmUserRole);
						rolesAdded += roleCodeDescMap.get(newRole) + ",";
					}
				}
			}
			for (String existingRole : existingRoles) {
				// System Admin role can't be removed through the system.. It will be assigned
				// only through manual process.
				if (!newRoles.contains(existingRole) && existingRoleCodes.contains(existingRole)
						&& !existingRole.equalsIgnoreCase("SA")) {
					Map<String, Object> updateParams = new HashMap<>();
					updateParams.put("IS_ACTIVE_SW", "N");
					updateParams.put("MODIFY_USERID", loginUserObj.getUserId());
					updateParams.put("GCM_USER_KEY", userKey);
					updateParams.put("GCM_VENDOR_KEY", vendorKey);
					updateParams.put("GCM_ROLE_CODE", existingRole);
					commonJpaService.update(USER_ROLES_ENABLE, updateParams);
					rolesRemoved += roleCodeDescMap.get(existingRole) + ",";
				}
			}

			if (newRoles.isEmpty() && existingRoleCodes.size() == existingActiveRolesList.size()) {
				int codingWorkitemCount = getNotCompletedOptumCodingWorkitemCount(userKey, vendorKey);
				int totalVendors = getTotalVendorsMappedToUser(userKey);
				if (codingWorkitemCount <= 0 && totalVendors <= 1)
					InactivateUser(userKey, loginUserKey);
				updateUserVendor("N", adminUserId, vendorKey, userKey);
			}

			rolesAdded = rolesAdded.length() > 0 ? rolesAdded.substring(0, rolesAdded.lastIndexOf(",")) : "";
			rolesRemoved = rolesRemoved.length() > 0 ? rolesRemoved.substring(0, rolesRemoved.lastIndexOf(",")) : "";
			if (!newRoles.isEmpty() && (newRoles.contains("NUQAUD") || newRoles.contains("NUQASAUD")
					|| newRoles.contains("ONUQAUD") || newRoles.contains("NUQAM") || newRoles.contains("ONUQAM"))) {
				CreateUserinDocumentum.callSoapWebService(UserCreationService.getDocumentumEndPointURI(),
						"createCommSSOUser", UserCreationService.getDocumentumUserProperty(),
						UserCreationService.getDocumentumSessionProperty(),
						UserCreationService.getDocumentumUserPropertyVal(),
						UserCreationService.getDocumentumSessionPropertyVal(), userObj.getUuID(), GCM_ONSHORE_GROUP,
						userObj.getEmail(), "");

			}
			if (!newRoles.contains("NUQAUD") && !newRoles.contains("NUQASAUD") && !newRoles.contains("ONUQAUD") 
					&& !newRoles.contains("NUQAM") && !newRoles.contains("ONUQAM")) {
				RemoveUserinDocumentum.callSoapWebService(UserCreationService.getDocumentumEndPointURI(),
						"removeUserFromCommGroup", UserCreationService.getDocumentumUserProperty(),
						UserCreationService.getDocumentumSessionProperty(),
						UserCreationService.getDocumentumUserPropertyVal(),
						UserCreationService.getDocumentumSessionPropertyVal(), userObj.getUuID(), GCM_ONSHORE_GROUP);
			}

			if (isMailRequired)
				sendRoleUpdateMailToUser(userObj, rolesAdded, rolesRemoved,loginUserObj.getEmail());
		} catch (Exception e) {
			LOG.error("Exception occured while updating user roles", e);
		}
		return "SUCCESS";
	}

	private void updateUserVendor(String isActiveSW, String adminUserId, Long vendorKey, Long userKey) {
		Map<String, Object> updateParams = new HashMap<>();
		updateParams.put("IS_ACTIVE_SW", isActiveSW);
		updateParams.put("MODIFY_USERID", adminUserId);
		updateParams.put("GCM_VENDOR_KEY", vendorKey);
		updateParams.put("GCM_USER_KEY", userKey);
		commonJpaService.update(SchedulingWorkFlowQueries.UPDATE_USER_VENDOR_MAPPING, updateParams);
	}

	private Map<String, String> getRoles() {
		String QUERY_GET_ROLES = "SELECT GCM_ROLE_CODE AS KEY, GCM_ROLE_NAME AS VALUE FROM GCM_ROLE_LIST WHERE IS_ACTIVE_SW = 'Y'";
		return commonJpaService.getResultMap(QUERY_GET_ROLES, String.class, String.class);
	}

	private Integer getInprogressRETWIForuser(Long userKey, Long vendorKey, int busFuncDtlKey) {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_USER_KEY", userKey);
		params.put("GCM_BUS_FUNC_DETAIL_KEY", busFuncDtlKey);
		params.put("GCM_VENDOR_KEY", vendorKey);

		String query = SchedulingWorkFlowQueries.QUERY_GET_RETWI_BY_USER_ROLE_CD;
		String busFuncDtl = " AND GCM_BUS_FUNC_DETAIL_KEY = :GCM_BUS_FUNC_DETAIL_KEY ";

		if (busFuncDtlKey > 0) {
			query = query.replace("#BUS_FUNC_DTL#", busFuncDtl);
		} else {
			query = query.replace("#BUS_FUNC_DTL#", "");
		}
		if (vendorKey > 0) {
			query += " AND GCM_VENDOR_KEY = :GCM_VENDOR_KEY";
		}
		return commonJpaService.getResultObject(query, params, Integer.class);
	}

	private void isUserVendorMappingExits(Long userKey, Long vendorKey, String adminUserId) {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_USER_KEY", userKey);
		params.put("GCM_VENDOR_KEY", vendorKey);
		String query = SchedulingWorkFlowQueries.QUERY_GET_USER_VENDOR_MAPPING;
		StringBuilder stringBuilder = new StringBuilder(500);
		stringBuilder.append(query).append(" AND IS_ACTIVE_SW ='Y' ");
		Integer integer = commonJpaService.getResultObject(stringBuilder.toString(), params, Integer.class);
		if (integer.intValue() < 1) {
			StringBuilder inactiveQuery = new StringBuilder(500);
			inactiveQuery.append(query).append(" AND IS_ACTIVE_SW ='N' ");
			Integer count = commonJpaService.getResultObject(inactiveQuery.toString(), params, Integer.class);
			if (count.intValue() > 0) {
				String vendorQuery = SchedulingWorkFlowQueries.QUERY_GET_USER_VENDOR;
				UserVendor existingUserVendor = commonJpaService.getResultObject(vendorQuery, params, UserVendor.class);
				if (existingUserVendor != null) {
					Map<String, Object> updateParams = new HashMap<>();
					updateParams.put("IS_ACTIVE_SW", "Y");
					updateParams.put("MODIFY_USERID", adminUserId);
					updateParams.put("GCM_VENDOR_KEY", existingUserVendor.getGcmVendorKey());
					updateParams.put("GCM_USER_KEY", existingUserVendor.getGcmUserKey());
					commonJpaService.update(SchedulingWorkFlowQueries.UPDATE_USER_VENDOR_MAPPING, updateParams);
				}
			} else {
				UserVendor userVendor = new UserVendor();
				userVendor.setGcmUserKey(userKey);
				userVendor.setGcmVendorKey(vendorKey.toString());
				userVendor.setIsActvieSW("Y");
				userVendor.setIsDefaultSW("N");
				userVendor.setCreateUser(adminUserId);
				userVendor.setModifiedUser(adminUserId);
				userVendor.setCreateDate(new java.sql.Timestamp(System.currentTimeMillis()));
				userVendor.setModifiedDate(new java.sql.Timestamp(System.currentTimeMillis()));
				commonJpaService.persist(userVendor);
			}
		}
	}

	private Integer getInprogressApptForUser(Long userKey, Long vendorKey, int busFuncDtlKey) {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_USER_KEY", userKey);
		params.put("GCM_BUS_FUNC_DETAIL_KEY", busFuncDtlKey);
		params.put("GCM_VENDOR_KEY", vendorKey);

		String query = SchedulingWorkFlowQueries.QUERY_GET_APPT_CNT_BY_USER_VENDOR;
		if (vendorKey > 0) {
			query += " AND AP.GCM_VENDOR_KEY = :GCM_VENDOR_KEY ";
		}
		return commonJpaService.getResultObject(query, params, Integer.class);
	}

	private Integer getPendApptCountForUser(Long userKey, Long vendorKey) {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_USER_KEY", userKey);
		params.put("GCM_VENDOR_KEY", vendorKey);

		String query = SchedulingWorkFlowQueries.QUERY_GET_PEND_CNT_APPT_BY_USER_VENDOR;

		if (vendorKey > 0) {
			query += " AND GCM_VENDOR_KEY = :GCM_VENDOR_KEY ";
		}

		return commonJpaService.getResultObject(query, params, Integer.class);
	}

	private Integer getNotCompletedCodingWorkitemCount(Long userKey, Long vendorKey, int busFuncKey,
			boolean isCodingSupervisor) {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_USER_KEY", userKey);
		params.put("GCM_VENDOR_KEY", vendorKey);
		params.put("GCM_BUSINESS_FUNC_KEY", busFuncKey);
		// String query = GET_INPROGRESS_CODING_WORKITEM_COUNT;
		StringBuilder stringBuilder = new StringBuilder(500);
		stringBuilder.append(GET_INPROGRESS_CODING_WORKITEM_COUNT);
		if (isCodingSupervisor)
			stringBuilder.append(" AND WORK_LIST_PARENT_ACTIVITY_KEY IS NOT NULL");
		else {
			stringBuilder.append(" AND WORK_LIST_PARENT_ACTIVITY_KEY IS NULL");
		}
		if (vendorKey > 0) {
			stringBuilder.append(" AND GCM_VENDOR_KEY  = :GCM_VENDOR_KEY ");
		}

		return commonJpaService.getResultObject(stringBuilder.toString(), params, Integer.class);
	}

	private Integer getNotCompletedPNPWorkitemCount(Long userKey) {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_NOTCOMPLETE_USER_KEY", userKey);

		String query = GET_PNP_NOT_COMPLETED_WORKITEM_COUNT;

		return commonJpaService.getResultObject(query, params, Integer.class);
	}

	private Integer getNotCompletedOptumCodingWorkitemCount(Long userKey, Long vendorKey) {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_USER_KEY", userKey);
		params.put("GCM_VENDOR_KEY", vendorKey);
		String query = GET_INPROGRESS_OPTUM_CODING_WORKITEM_COUNT;

		return commonJpaService.getResultObject(query, params, Integer.class);
	}

	private Integer getTotalVendorsMappedToUser(Long userKey) {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_USER_KEY", userKey);
		String query = GET_TOTAL_VENDORS_MAPPED_COUNT;

		return commonJpaService.getResultObject(query, params, Integer.class);
	}

	public GCMUser getUserDetailsByUserKey(double userKey) {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_USER_KEY", userKey);
		GCMUser userObj = commonJpaService.getResultObject(GET_ACTIVE_USER_DETAILS, params, GCMUser.class);
		return userObj;
	}

	private void sendRoleUpdateMailToUser(GCMUser userObj, String rolesAdded, String rolesRemoved, String adminMail) {
		Map<String, Object> paramsMailMap = new HashMap<>();
		paramsMailMap.put("GCM_CONFIG_NAME", "COMM_USER_ROLE_UPDATE");
		GcmMailContent gcmMailContent = commonJpaService.getResultObject(GET_MAIL_CONTENT, paramsMailMap,
				GcmMailContent.class);
		String content = gcmMailContent.getContent();
		String subject = gcmMailContent.getSubject();
		boolean isHtmlContent = (gcmMailContent.getContentType().equalsIgnoreCase("HTML")) ? true : false;

		GCMUser reportsToDetails = getUserDetailsByUserKey(Double.parseDouble(userObj.getReportsToUserKey()));
		String env =userRegistrationService.getEnvironment("BATCH","ENV");
		if(null!=env) {
			subject = subject.replaceAll("\\$ENV", env);
		}
		content = content.replaceAll("#userfullname#", userObj.getFirstName() + " " + userObj.getLastName());
		content = content.replaceAll("#supervisorfullname#",
				reportsToDetails.getFirstName() + " " + reportsToDetails.getLastName());
		StringBuilder roleUpdateString = new StringBuilder();
		if (null != rolesAdded && rolesAdded.length() > 0) {
			roleUpdateString =  roleUpdateString.append(rolesAdded);
		}
		if (null != rolesRemoved && rolesRemoved.length() > 0) {
			if (roleUpdateString.length() > 0) {
				roleUpdateString.append("<br/><br/> To remove roles ");
				roleUpdateString.append(rolesRemoved);
			} else {
				roleUpdateString.append("updated to remove roles ");
				roleUpdateString.append(rolesRemoved);
			}
		}
		content = content.replaceAll("#userprofileupdateString#", roleUpdateString.toString());

		String from = "";
		paramsMailMap.put("GCM_CONFIG_NAME", "COMM_USER_ROLE_UPDATE");
		GcmMailId gcmMailId = commonJpaService.getResultObject(GET_MAIL_ID, paramsMailMap, GcmMailId.class);

		if (null != gcmMailId && gcmMailId.getType().equalsIgnoreCase("FROM")) {
			from = gcmMailId.getMailId();
		} else {
			LOG.error("Mail configuration for COMM_USER_ROLE_UPDATE is not set");
			return;
		}

		try {
			String to = userObj.getEmail();
			String cc = reportsToDetails.getEmail() + "," + adminMail;
			prepareMessage(subject, content, isHtmlContent, from, to, cc);
		} catch (MessagingException e) {
			LOG.error(e.getMessage());
		} catch (Exception e) {
			LOG.error(e.getMessage());
		}
	}

	/*
	 * private void prePareFromAndToList(String from, List<String> toList,
	 * List<String> ccList) { Map<String, Object> paramsMailMap = new HashMap<>();
	 * paramsMailMap.put("GCM_CONFIG_NAME", "COMM_USER_ROLE_UPDATE");
	 * List<GcmMailId> gcmMailIdList = commonJpaService.getResultList(GET_MAIL_ID,
	 * paramsMailMap, GcmMailId.class);
	 * 
	 * 
	 * for(int i=0;i<gcmMailIdList.size();i++) { GcmMailId gcmMailId =
	 * gcmMailIdList.get(i); if(gcmMailId.getType().equalsIgnoreCase("FROM")) { from
	 * = gcmMailId.getMailId(); }
	 * 
	 * if(gcmMailId.getType().equalsIgnoreCase("TO")) {
	 * toList.add(gcmMailId.getMailId()); }
	 * 
	 * if(gcmMailId.getType().equalsIgnoreCase("CC")) {
	 * ccList.add(gcmMailId.getMailId()); }
	 * 
	 * } }
	 */

	
	private UserVendor getUserVendorObj(Long vendorKey, Long userKey)
	{
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_USER_KEY", userKey);
		params.put("GCM_VENDOR_KEY", vendorKey);
		try {
		UserVendor userVendor = commonJpaService.getResultObject(GET_USER_VENDOR, params, UserVendor.class);
		return userVendor;
		}
		catch (EmptyResultDataAccessException e) {
			// TODO: handle exception
			return null;
		}
	}
	
	public boolean updateUserVendors(VendorReqObj vendorReqObj)
	{
		List<Vendor> vendorList =vendorReqObj.getVendorList();
	for(Vendor vendorItr : vendorList)
	{
		if(null==getUserVendorObj(vendorItr.getVendorKey(),vendorReqObj.getUserKey()))
		{
		 UserVendor userVendor=new UserVendor();
		 userVendor.setCreateDate(new java.sql.Timestamp(System.currentTimeMillis()));
		 userVendor.setModifiedDate(new java.sql.Timestamp(System.currentTimeMillis()));
		 userVendor.setGcmUserKey(vendorReqObj.getUserKey());
		 userVendor.setGcmVendorKey(vendorItr.getVendorKey().toString());
		 userVendor.setIsActvieSW(vendorItr.getIsActiveSW());
		 userVendor.setIsDefaultSW("N");
		 userVendor.setModifiedUser(vendorReqObj.getUserId());
		 userVendor.setCreateUser(vendorReqObj.getUserId());
		 commonJpaDao.persist(userVendor);
		}
		else
		{
		updateUserVendor(vendorItr.getIsActiveSW(),vendorReqObj.getUserId(), vendorItr.getVendorKey(), vendorReqObj.getUserKey());
		}
	}
	return  true;
	}
	
	private void sendChangeSuperVisorMail(UserAdminModel userObj,String adminMail) {
		Map<String, Object> paramsMailMap = new HashMap<>();
		paramsMailMap.put("GCM_CONFIG_NAME", "COMM_USER_CHANGE_SUPERVISOR");
		GcmMailContent gcmMailContent = commonJpaService.getResultObject(GET_MAIL_CONTENT, paramsMailMap,
				GcmMailContent.class);
		String content = gcmMailContent.getContent();
		String subject = gcmMailContent.getSubject();
		boolean isHtmlContent = (gcmMailContent.getContentType().equalsIgnoreCase("HTML")) ? true : false;

		GCMUser reportsToDetails = getUserDetailsByUserKey(userObj.getSupervisorId());
		GCMUser newReportsToDetails = getUserDetailsByUserKey(userObj.getNewSupervisorId());

		content = content.replaceAll("#userfullname#", userObj.getFirstName() + " " + userObj.getLastName());
		content = content.replaceAll("#supervisorfullname#",
				newReportsToDetails.getFirstName() + " " + newReportsToDetails.getLastName());
		StringBuilder roleUpdateString = new StringBuilder();
		List<Role> roles = getRolesForUser(userObj.getUserKey());
		for(Role role:roles) {
			roleUpdateString.append(role.getRoleName());
			roleUpdateString.append(",");
		}
		content = content.replaceAll("#userprofileupdateString#", roleUpdateString.substring(0, roleUpdateString.lastIndexOf(",")));
		String env =userRegistrationService.getEnvironment("BATCH","ENV");
		if(null!=env) {
			subject = subject.replaceAll("\\$ENV", env);
		}
		String from = "";
		paramsMailMap.put("GCM_CONFIG_NAME", "COMM_USER_CHANGE_SUPERVISOR");
		GcmMailId gcmMailId = commonJpaService.getResultObject(GET_MAIL_ID, paramsMailMap, GcmMailId.class);

		if (null != gcmMailId && gcmMailId.getType().equalsIgnoreCase("FROM")) {
			from = gcmMailId.getMailId();
		} else {
			LOG.error("Mail configuration for COMM_USER_DISABLE is not set");
			return;
		}

		try {
			String to = newReportsToDetails.getEmail();
			String cc = reportsToDetails.getEmail() + "," + userObj.getEmail() + "," + adminMail;
			prepareMessage(subject, content, isHtmlContent, from, to, cc);
		} catch (MessagingException e) {
			LOG.error(e.getMessage());
		} catch (Exception e) {
			LOG.error(e.getMessage());
		}
	}

	private void sendDisableMailToUser(GCMUser userObj, String configName, boolean isCCRequired, String adminMail) {
		Map<String, Object> paramsMailMap = new HashMap<>();
		paramsMailMap.put("GCM_CONFIG_NAME", configName);
		GcmMailContent gcmMailContent = commonJpaService.getResultObject(GET_MAIL_CONTENT, paramsMailMap,
				GcmMailContent.class);
		String content = gcmMailContent.getContent();
		String subject = gcmMailContent.getSubject();
		boolean isHtmlContent = (gcmMailContent.getContentType().equalsIgnoreCase("HTML")) ? true : false;

		GCMUser reportsToDetails = getUserDetailsByUserKey(Double.parseDouble(userObj.getReportsToUserKey()));

		content = content.replaceAll("#userfullname#", userObj.getFirstName() + " " + userObj.getLastName());
		content = content.replaceAll("#supervisorfullname#",
				reportsToDetails.getFirstName() + " " + reportsToDetails.getLastName());
		String roleUpdateString = "";

		content = content.replaceAll("#userprofileupdateString#", roleUpdateString);
		String env =userRegistrationService.getEnvironment("BATCH","ENV");
		if(null!=env) {
			subject = subject.replaceAll("\\$ENV", env);
		}
		String from = "";
		paramsMailMap.put("GCM_CONFIG_NAME", configName);
		GcmMailId gcmMailId = commonJpaService.getResultObject(GET_MAIL_ID, paramsMailMap, GcmMailId.class);

		if (null != gcmMailId && gcmMailId.getType().equalsIgnoreCase("FROM")) {
			from = gcmMailId.getMailId();
		} else {
			LOG.error("Mail configuration for COMM_USER_DISABLE is not set");
			return;
		}

		try {
			String to = reportsToDetails.getEmail();
			String cc = null;
			if(!adminMail.equals(userObj.getEmail()) && configName.equals("COMM_USER_DISABLE")) {
				cc = adminMail;
			}else if(!adminMail.equals(userObj.getEmail()) && configName.equals("COMM_USER_ENABLE")) {					
				cc = adminMail + "," +  userObj.getEmail();
			}else if (isCCRequired) {
				cc = userObj.getEmail();
			}
			prepareMessage(subject, content, isHtmlContent, from, to, cc);
		} catch (MessagingException e) {
			LOG.error(e.getMessage());
		} catch (Exception e) {
			LOG.error(e.getMessage());
		}
	}

	private void prepareMessage(String subject, String content, boolean isHtmlContent, String from, String to,
			String cc) throws MessagingException {
		MimeMessage mimeMessage = mailSender.createMimeMessage();
		MimeMessageHelper msgHelper = new MimeMessageHelper(mimeMessage, true);
		msgHelper.setFrom(from);
		msgHelper.setTo(to);
		msgHelper.setSubject(subject.trim());
		if (null != cc && !cc.isEmpty()) {
			msgHelper.setCc(InternetAddress.parse(cc));
		}
		if (LOG.isDebugEnabled()) {
			LOG.debug("Mail Subject : " + subject);
			LOG.debug("Mail Content : " + content);
		}
		msgHelper.setText(content, isHtmlContent);
		mailSender.send(mimeMessage);
	}

}
