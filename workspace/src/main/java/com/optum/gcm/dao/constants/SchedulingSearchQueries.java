package com.optum.gcm.dao.constants;

/**
 * @author pmule
 *
 */

public interface SchedulingSearchQueries {
	String QUERY_PROJECT_HAS_NEW_STATUS = "SELECT 'YES' FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR WHERE GCM_BUSINESS_SEGMENT = :GCM_BUSINESS_SEGMENT AND "
			+ "GCM_PROJECT_YEAR = :GCM_PROJECT_YEAR AND GCM_PROJ_KEY = :GCM_PROJ_KEY AND GCM_BUS_FUNC_STATUS = 'NEW' AND ROWNUM = 1";

	String QUERY_PROJECT_HAS_COMP_BARCODES = "SELECT 'YES' STATUS FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR WHERE GCM_PROJ_KEY = :GCM_PROJ_KEY AND "
			+ "GCM_PROJECT_YEAR = :GCM_PROJECT_YEAR AND GCM_BUSINESS_FUNC_KEY = 4 AND GCM_BUS_FUNC_STATUS in (SELECT GCM_BUS_FUNC_STATUS FROM "
			+ "GCM_BUS_FUNC_STATUS WHERE GCM_BUSINESS_FUNC_KEY = 4 AND GCM_BUS_FUNC_STATUS_GROUP = 'COMPLETED') AND ROWNUM =1";
	
	String QUERY_GET_INVENTORY_SCHEDULING_SELECT = "select prov_grp_name, prov_name, prov_id, prov_location,prov_phone,"
						            +" prov_fax, user_name,user_key, rec_cnt, special_category, special_notes "
						            + " from"
						            + "     (  SELECT P.PROV_GRP_NAME, " 
									+"  (P.PROV_LAST_NAME " 
									+"  ||', ' " 
									+"  || P.PROV_FIRST_NAME)   AS Prov_Name, " 
									+"  P.SOURCE_SYSTEM_PROV_ID AS Prov_ID, " 
									+" PROVIDER_ADDRESS AS Prov_Location, " 
									+" special_category,"
									+" special_notes, "
									+"  P.PROV_PHONE, " 
									+"  P.PROV_FAX, " 
									+"  (select last_name ||','||first_name from gcm_user u where u.gcm_user_key = wi.gcm_user_key) as User_Name,"
									+" GCM_USER_KEY USER_KEY, "
									+"  COUNT(1) REC_CNT " 
									+"FROM GCM_PROVIDER P, " 
									+"  GCM_RET_WI WI " ;
	
	String QUERY_GET_UNASSIGNED_INVENTORY_SCHEDULING = QUERY_GET_INVENTORY_SCHEDULING_SELECT
										+"WHERE WI.GCM_PROVIDER_KEY = P.GCM_PROVIDER_KEY " 
								    	+" AND GCM_RET_APPT_KEY IS NULL "
										+ " AND GCM_USER_KEY IS NULL "
										+" AND GCM_BUS_FUNC_STATUS = 'NEW' "
										+" AND WI.GCM_VENDOR_KEY = :GCM_VENDOR_KEY "
										+" AND GCM_BUS_FUNC_DETAIL_KEY = :GCM_BUS_FUNC_DETAIL_KEY "
										+ " AND WI.GCM_HP_KEY IN ( SELECT gcm_hp_key "
										+ " FROM GCM_GROUP_CLIENT_HP_VW "
										+ " WHERE gcm_group_key IN "
										+ "( SELECT gcm_group_key FROM GCM_USER_VENDOR_GROUP_VW WHERE gcm_user_key = :GCM_LOGIN_USER_KEY )) "
										+" #WHERE# "
										+"GROUP BY P.PROV_GRP_NAME, " 
										+"  (P.PROV_LAST_NAME " 
										+"  ||', ' " 
										+"  || P.PROV_FIRST_NAME), " 
										+"  P.SOURCE_SYSTEM_PROV_ID, " 
									    +"  PROVIDER_ADDRESS, "
										+"  P.PROV_PHONE, " 
										+"  P.PROV_FAX, "
										+" special_category,"
										+" special_notes, "
										+ " gcm_user_key " 
										+"ORDER BY P.PROV_GRP_NAME )  FETCH FIRST (SELECT TO_NUMBER(PARAM_VALUE) FROM GCM_CONFIGURATION WHERE CONFIG_NAME = 'FETCH_SIZE' AND PARAM_NAME = 'SCHEDULING_FETCH_SIZE') ROWS ONLY " ;
	
	String QUERY_GET_ASSIGNED_INVENTORY_SCHEDULING = QUERY_GET_INVENTORY_SCHEDULING_SELECT 
										+"WHERE WI.GCM_PROVIDER_KEY = P.GCM_PROVIDER_KEY " 
								    	+" AND GCM_RET_APPT_KEY IS NULL "
								    	+" AND GCM_USER_KEY IS NOT NULL "
								    	+" AND GCM_USER_KEY = :GCM_FROM_USER_KEY "
										+" AND GCM_BUS_FUNC_STATUS = 'ASSIGNED'"
										+" AND WI.GCM_VENDOR_KEY = :GCM_VENDOR_KEY "
										+" AND GCM_BUS_FUNC_DETAIL_KEY = :GCM_BUS_FUNC_DETAIL_KEY "
										+ " AND WI.GCM_HP_KEY IN ( SELECT gcm_hp_key "
										+ " FROM GCM_GROUP_CLIENT_HP_VW "
										+ " WHERE gcm_group_key IN "
										+ "( SELECT gcm_group_key FROM GCM_USER_VENDOR_GROUP_VW WHERE gcm_user_key = :GCM_LOGIN_USER_KEY )) "
										+" #WHERE# "
										+"GROUP BY P.PROV_GRP_NAME, " 
										+"  (P.PROV_LAST_NAME " 
										+"  ||', ' " 
										+"  || P.PROV_FIRST_NAME), " 
										+"  P.SOURCE_SYSTEM_PROV_ID, " 
										+"  PROVIDER_ADDRESS, "
										+"  P.PROV_PHONE, " 
										+"  P.PROV_FAX, "
										+" special_category,"
										+" special_notes, "
										+ "gcm_user_key " 
										+" ORDER BY P.PROV_GRP_NAME ) FETCH FIRST (SELECT TO_NUMBER(PARAM_VALUE) FROM GCM_CONFIGURATION WHERE CONFIG_NAME = 'FETCH_SIZE' AND PARAM_NAME = 'SCHEDULING_FETCH_SIZE') ROWS ONLY " ;

	}
