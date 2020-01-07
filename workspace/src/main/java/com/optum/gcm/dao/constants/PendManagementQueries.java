package com.optum.gcm.dao.constants;

public interface PendManagementQueries {
	
	
	
	String QUERY_GET_PENDMGMT_INVENTORY = "SELECT DISTINCT RA.GCM_RET_APPT_KEY, " +
			"  RA.APPT_DATE_TIME AS APPT_DATE_TIME, " +
			"  RA.APPT_TYPE      AS APPT_TYPE, " +
			"  CASE " +
			"    WHEN COUNT(DISTINCT NVL(PROVIDER_ADDRESS,'^')) OVER ( PARTITION BY RA.GCM_RET_APPT_KEY )=1 " +
			"    THEN PROVIDER_ADDRESS " +
			"    ELSE 'MULTIPLE' " +
			"  END AS PROV_LOCATION, " +
			"  CASE " +
			"    WHEN COUNT(DISTINCT P.PROV_LAST_NAME " +
			"      ||', ' " +
			"      ||P.PROV_FIRST_NAME) OVER ( PARTITION BY RA.GCM_RET_APPT_KEY )=1 " +
			"    THEN (P.PROV_LAST_NAME " +
			"      ||', ' " +
			"      ||P.PROV_FIRST_NAME) " +
			"    ELSE 'MULTIPLE' " +
			"  END AS PROV_NAME, " +
			"  CASE " +
			"    WHEN COUNT(DISTINCT PROV_GRP_NAME) OVER ( PARTITION BY RA.GCM_RET_APPT_KEY ) =1 " +
			"    THEN P. PROV_GRP_NAME " +
			"    ELSE 'MULTIPLE' " +
			"  END AS PROV_GRP_NAME, " +
			"  CASE " +
			"    WHEN COUNT(DISTINCT NVL(SPECIAL_CATEGORY,'^')) OVER ( PARTITION BY RA.GCM_RET_APPT_KEY )=1 " +
			"    THEN SPECIAL_CATEGORY " +
			"    ELSE 'MULTIPLE' " +
			"  END AS SPECIAL_CATEGORY, " +
			"  CASE " +
			"    WHEN COUNT(DISTINCT NVL(SPECIAL_NOTES,'^')) OVER ( PARTITION BY RA.GCM_RET_APPT_KEY )=1 " +
			"    THEN SPECIAL_NOTES " +
			"    ELSE 'MULTIPLE' " +
			"  END AS SPECIAL_NOTES, " +
			"  CASE " +
			"    WHEN COUNT(DISTINCT NVL(GRC.GCM_REASON_DESC,'^')) OVER ( PARTITION BY RA.GCM_RET_APPT_KEY )=1 " +
			"    THEN GRC.GCM_REASON_DESC " +
			"    ELSE 'MULTIPLE' " +
			"  END AS PEND_REASON, " +
			"  CASE " +
			"    WHEN COUNT(DISTINCT NVL((GU.LAST_NAME " +
			"      || ' ' " +
			"      || GU.FIRST_NAME),'^')) OVER ( PARTITION BY RA.GCM_RET_APPT_KEY )=1 " +
			"    THEN (GU.LAST_NAME " +
			"      || ' ' " +
			"      || GU.FIRST_NAME) " +
			"    ELSE 'MULTIPLE' " +
			"  END                                                AS ASSIGNED_USER, " +
			"  COUNT(*) OVER ( PARTITION BY RA.GCM_RET_APPT_KEY ) AS CNT_TOTAL, " +
			"  COUNT( " +
			"  CASE " +
			"    WHEN WI.GCM_BUS_FUNC_STATUS IN ( 'RECVD' ,  'CANCELED', 'DUPLICATE', 'INACTIVATED', 'CNA'  ) " +
			"    THEN NULL " +
			"    ELSE 1 " +
			"  END) OVER ( PARTITION BY RA.GCM_RET_APPT_KEY ) AS CNT_NOT_RECVD " +
			"FROM GCM_RET_APPT RA, " +
			"  GCM_RET_WI WI, " +
			"  GCM_PROVIDER P, " +
			"  GCM_REASON GRC, " +
			"  GCM_USER GU " +
			"WHERE RA.GCM_RET_APPT_KEY = WI.GCM_RET_APPT_KEY " +
			"AND P.GCM_PROVIDER_KEY    = WI.GCM_PROVIDER_KEY " +
			"AND WI.GCM_HP_KEY        IN " +
			"  (SELECT gcm_hp_key " +
			"  FROM GCM_GROUP_CLIENT_HP_VW " +
			"  WHERE gcm_group_key IN " +
			"    (SELECT GCM_GROUP_KEY " +
			"    FROM GCM_USER_VENDOR_GROUP_VW " +
			"    WHERE GCM_USER_KEY = :GCM_LOGIN_USER_KEY " +
			"    ) " +
			"  ) " +
			"AND RA.APPT_STATUS           = 'PEND' " +
			"AND RA.GCM_REASON_CODE       = GRC.GCM_REASON_CODE " +
			"AND RA.GCM_PEND_MGR_USER_KEY = GU.GCM_USER_KEY(+) "
	  + " #WHERE# ";

			String QUERY_UPDATE_PEND_WORK_LIST_USERKEY_NULL = " UPDATE GCM_RET_APPT SET GCM_PEND_MGR_USER_KEY = NULL,MODIFY_DATE_TIME=SYSDATE, MODIFY_USERID =:MODIFY_USERID WHERE GCM_RET_APPT_KEY in (:GCM_RET_APPT_KEY) "
					+ " AND GCM_GROUP_KEY IN " + "      (SELECT GCM_GROUP_KEY "
							+ "      FROM GCM_USER_VENDOR_GROUP_VW "
							+ "      WHERE GCM_USER_KEY = :GCM_LOGIN_USER_KEY " + "      ) ";
			
			String QUERY_UPDATE_CHART_STATUS = "UPDATE GCM_RET_WI SET GCM_BUS_FUNC_STATUS = :GCM_BUS_FUNC_STATUS,MODIFY_DATE_TIME=SYSDATE, GCM_USER_KEY =:GCM_USER_KEY, MODIFY_USERID =:MODIFY_USERID "
								+ " , RFAX_SENT_STATUS = CASE WHEN (RFAX_SENT_STATUS IS NOT NULL AND CHART_FINDER_ID IS NOT NULL)  THEN 'CANCEL' "
								+ " 				   WHEN (RFAX_SENT_STATUS IS NOT NULL AND CHART_FINDER_ID IS NULL)  THEN 'CANCELED' "
								+ "					   ELSE NULL END "
								+ " #where "
								+ " where GCM_PROJ_CONTENT_BARCODE in (:GCM_PROJ_CONTENT_BARCODE) "
								+ " AND GCM_BUS_FUNC_STATUS NOT IN ('RECVD', 'NONRETRIEVABLE', 'CANCELED', 'DUPLICATE','CNA') ";
			
			String QUERY_SELECT_CHART_STATUS = "SELECT COUNT(GCM_RET_APPT_KEY) as GCM_RET_APPT_KEY  from  GCM_RET_WI WHERE GCM_BUS_FUNC_STATUS  IN ('PEND RELEASED','ASSIGNED','INPROGRESS','UNSCHEDULED','PASTDUE','SCHEDULED')"+
					" AND GCM_RET_APPT_KEY = (:GCM_RET_APPT_KEY)  ";
			
			String QUERY_UPDATE_APPT_STATUS = "UPDATE GCM_RET_APPT SET APPT_STATUS = :APPT_STATUS, APPT_TYPE =:APPT_TYPE,MODIFY_DATE_TIME=SYSDATE, MODIFY_USERID =:MODIFY_USERID, GCM_USER_KEY =:GCM_USER_KEY #update "+
					" where GCM_RET_APPT_KEY in (:GCM_RET_APPT_KEY) ";
			
			
			String QUERY_UPDATE_PEND_WORK_LIST_USERKEY_NOTNULL = " UPDATE GCM_RET_APPT SET GCM_PEND_MGR_USER_KEY = :GCM_PEND_MGR_USER_KEY,MODIFY_DATE_TIME=SYSDATE, MODIFY_USERID =:MODIFY_USERID WHERE GCM_RET_APPT_KEY in (:GCM_RET_APPT_KEY) "
					+ " AND GCM_GROUP_KEY IN " + "      (SELECT GCM_GROUP_KEY "
					+ "      FROM GCM_USER_VENDOR_GROUP_VW "
					+ "      WHERE GCM_USER_KEY = :GCM_LOGIN_USER_KEY " + "      ) ";
			
}
