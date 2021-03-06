package com.optum.gcm.dao.constants;

/**
 * @author pmule
 *
 */

public interface SchedulingAssignmentQuries {

	String QUERY_ASSIGN_TO_USER = "UPDATE GCM_RET_WI  WI SET WI.ASSIGNED_DATE = SYSDATE, WI.GCM_USER_KEY = :GCM_TO_USER_KEY, "
			+ "WI.GCM_BUS_FUNC_STATUS = 'ASSIGNED', WI.GCM_BUS_FUNC_STATUS_DT = SYSDATE, "
			+ "WI.MODIFY_USERID = :MODIFY_USERID, WI.MODIFY_DATE_TIME = SYSDATE "
			+ "WHERE WI.GCM_USER_KEY IS NULL "
			+ " AND WI.GCM_BUS_FUNC_STATUS = 'NEW' "
			+ " AND WI.GCM_RET_APPT_KEY is NULL "
			+" AND WI.GCM_VENDOR_KEY = :GCM_VENDOR_KEY "
			+ "AND GCM_BUS_FUNC_DETAIL_KEY = :GCM_BUS_FUNC_DETAIL_KEY "
			+ "  AND WI.GCM_HP_KEY IN ( SELECT gcm_hp_key "
			+ "	 FROM GCM_GROUP_CLIENT_HP_VW "
			+ "		 WHERE gcm_group_key IN "
			+ "		( SELECT gcm_group_key FROM GCM_USER_VENDOR_GROUP_VW WHERE gcm_user_key = :GCM_LOGIN_USER_KEY )) "
			+ " AND WI.GCM_PROVIDER_KEY IN (SELECT GCM_PROVIDER_KEY FROM GCM_PROVIDER WHERE "
			+ " SOURCE_SYSTEM_PROV_ID = :SOURCE_SYSTEM_PROV_ID  #WHERE# ) AND ROWNUM <= :ROWNUM";

	String QUERY_REASSIGN_TO_USER = "UPDATE GCM_RET_WI WI  SET WI.ASSIGNED_DATE = SYSDATE, WI.GCM_USER_KEY = :GCM_TO_USER_KEY, "
			+ "WI.GCM_BUS_FUNC_STATUS = 'ASSIGNED', WI.GCM_BUS_FUNC_STATUS_DT = SYSDATE, "
			+ "WI.MODIFY_USERID = :MODIFY_USERID, WI.MODIFY_DATE_TIME = SYSDATE "
			+ "WHERE WI.GCM_USER_KEY = :GCM_FROM_USER_KEY "
			+ " AND WI.GCM_RET_APPT_KEY IS NULL "
			+" AND WI.GCM_VENDOR_KEY = :GCM_VENDOR_KEY "
			+ "AND GCM_BUS_FUNC_DETAIL_KEY = :GCM_BUS_FUNC_DETAIL_KEY "
			+ "  AND WI.GCM_HP_KEY IN ( SELECT gcm_hp_key "
			+ "	 FROM GCM_GROUP_CLIENT_HP_VW "
			+ "		 WHERE gcm_group_key IN "
			+ "		( SELECT gcm_group_key FROM GCM_USER_VENDOR_GROUP_VW WHERE gcm_user_key = :GCM_LOGIN_USER_KEY )) "
			+ "AND WI.GCM_PROVIDER_KEY IN (SELECT GCM_PROVIDER_KEY FROM GCM_PROVIDER WHERE "
			+ " SOURCE_SYSTEM_PROV_ID = :SOURCE_SYSTEM_PROV_ID  #WHERE# ) "
			+ " AND GCM_BUS_FUNC_STATUS NOT IN ('RECVD', 'NONRETRIEVABLE', 'CANCELED', 'DUPLICATE','CNA') "
			+ " AND ROWNUM <= :ROWNUM";
}
