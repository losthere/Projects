package com.optum.gcm.dao.constants;


/**
 * @author pmule
 *
 */

public interface CodingSupervisorWorkListQueries {
	
	/*String QUERY_GET_CODINGSUP_UNASSIGNED_INVENTORY = "SELECT V.GCM_PROJ_CONTENT_BARCODE CHART_ID, " 
												+"  GCM_PROJ_CONT_BUS_FUNC_VEN_KEY, " 
												+"  V.GCM_PROJECT_CONTENT_KEY, " 
												+"  PROV_GRP_NAME, " 
												+"  V.GCM_HP_PRODUCT, " 
												+"  (SELECT HP_CD FROM GCM_HP H WHERE H.GCM_HP_KEY = V.GCM_HP_KEY " 
												+"  ) AS HP_CD, " 
												+"  (SELECT GCM_CLIENT_CD C " 
												+"  FROM GCM_CLIENT C, " 
												+"    GCM_HP H1 " 
												+"  WHERE C.GCM_CLIENT_KEY = H1.GCM_CLIENT_KEY " 
												+"  AND H1.GCM_HP_KEY      = V.GCM_HP_KEY " 
												+"  ) AS GCM_CLIENT_CD, " 
												+"  (SELECT GCM_PROGRAM_NAME " 
												+"  FROM GCMC.GCM_PROGRAM_LIST PL " 
												+"  WHERE PL.GCM_PROGRAM_KEY = V.GCM_PROGRAM_KEY " 
												+"  ) AS PROGRAM_NAME, " 
												+"  GR.GCM_REASON_DESC, " 
												+"  V.GCM_REASON_CODE, "  
												+" V.GCM_BUSINESS_FUNC_KEY, "
												+"  (SELECT NVL(last_name " 
												+"    || ', ' " 
												+"    || first_name,'APPLOAD') " 
												+"  FROM gcmc.gcm_user u " 
												+"  WHERE u.userid = v.create_userid " 
												+"  ) ESCALATED_BY " 
												+"FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR V, " 
												+"  GCM_PROVIDER P , GCM_REASON GR " 
												+"WHERE P.GCM_PROVIDER_KEY             = V.GCM_PROVIDER_KEY " 
												+"AND V.GCM_BUSINESS_FUNC_KEY          = :GCM_BUSINESS_FUNC_KEY " 
										//		+"AND V.GCM_USER_KEY IS NULL "
												+" AND GR.GCM_REASON_CODE=V.GCM_REASON_CODE "
												+"AND V.WORK_LIST_PARENT_ACTIVITY_KEY IS NOT NULL" 
												+ " AND V.GCM_HP_KEY IN ( SELECT gcm_hp_key "
												+ " FROM GCM_GROUP_CLIENT_HP_VW "
												+ " WHERE gcm_group_key IN "
												+ "( SELECT gcm_group_key FROM GCM_USER_VENDOR_GROUP_VW WHERE gcm_user_key = :GCM_LOGIN_USER_KEY )) "
												+ " #WHERE# ";*/
	String QUERY_GET_CODINGSUP_UNASSIGNED_INVENTORY = "SELECT * "
			+"  FROM TABLE(pkg_comm_worklist.fnc_csp_worklist "
			+"  ( p_user_key              => :userKey,       "
			+"    p_userid                => :userId,        "
			+"    p_group_key             => :groupKey,      "
			+"    p_vendor_key            => :vendorKey,      "
			+"    p_role_code             => :roleCode,      "
			+"    p_business_func_key     => :busFuncKey,    "
			+"    p_worklist_type         => :workListType,  "
			+"    p_business_segment      => :busSegment,    "
			+"    p_proj_key              => :projKey,       "
			+"    p_client_key            => :clientKey,     "
			+"    p_hp_key                => :hpKey,         "
			+"    p_hp_product            => :hpProduct,     "
			+"    p_barcode               => :chartId,       "
			+"    p_bus_func_status       => :busFuncStatus, "
			+"    p_is_assigned           => :isAssigned,    "
			+"    p_assigned_user_key     => :assignedUserKey,"
			+"    p_accepted_from_date    => :fromDate,  "
			+"    p_accepted_thru_date    => :toDate ))";

	String QUERY_UPDATE_CODINGSUP_RELEASETOASSIGN = "UPDATE GCM_PROJ_CONT_BUS_FUNC_VENDOR SET GCM_USER_KEY = :GCM_LOGIN_USER_KEY, GCM_BUS_FUNC_STATUS = 'ASSIGNED', "
							            +"MODIFY_USERID = :MODIFY_USERID, GCM_BUS_FUNC_STATUS_DT = SYSDATE, MODIFY_DATE_TIME = SYSDATE, "
							            +"WORK_LIST_ACTIVITY_KEY = PKG_UTIL.FNC_GUID() "
							            +"WHERE GCM_PROJ_CONTENT_BARCODE IN "
										+" (SELECT REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) "  
										+"	FROM DUAL CONNECT BY REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) IS NOT NULL ) "
							            +"AND GCM_BUSINESS_FUNC_KEY = :GCM_BUSINESS_FUNC_KEY "
							            +"AND WORK_LIST_PARENT_ACTIVITY_KEY IS NOT NULL #WHERE# ";
	
	String QUERY_UPDATE_CODINGSUP_RELEASETOAVAILABLEITEMS = "UPDATE GCM_PROJ_CONT_BUS_FUNC_VENDOR SET GCM_USER_KEY = NULL , GCM_BUS_FUNC_STATUS = 'CREATED', "
							            +"MODIFY_USERID = :MODIFY_USERID, GCM_BUS_FUNC_STATUS_DT = SYSDATE, MODIFY_DATE_TIME = SYSDATE "
							            +"WHERE GCM_PROJ_CONTENT_BARCODE IN  "
										+" (SELECT REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) "  
										+"	FROM DUAL CONNECT BY REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) IS NOT NULL ) "
							            +"AND GCM_BUSINESS_FUNC_KEY = :GCM_BUSINESS_FUNC_KEY "
							            +"AND WORK_LIST_PARENT_ACTIVITY_KEY IS NOT NULL AND GCM_USER_KEY IS NOT NULL AND GCM_BUS_FUNC_STATUS NOT IN  ('COMPLETED', 'REJECTED', 'CANCELED')";
	
	String QUERY_GET_CODINGSUP_MYWORKLIST = "SELECT PC.GCM_PROJ_CONTENT_BARCODE CHART_ID, " 
								+"  GCM_PROJ_CONT_BUS_FUNC_VEN_KEY, " 
								+"  V.GCM_PROJECT_CONTENT_KEY, " 
								+"  PROV_GRP_NAME, " 
								+"  V.GCM_BUS_FUNC_STATUS CHART_STATUS, " 
								+"  V.GCM_HP_PRODUCT, " 
								+"  (SELECT HP_CD FROM GCM_HP H WHERE H.GCM_HP_KEY = V.GCM_HP_KEY " 
								+"  ) AS HP_CD, " 
								+"  (SELECT GCM_CLIENT_CD C " 
								+"  FROM GCM_CLIENT C, " 
								+"    GCM_HP H1 " 
								+"  WHERE C.GCM_CLIENT_KEY = H1.GCM_CLIENT_KEY " 
								+"  AND H1.GCM_HP_KEY      = V.GCM_HP_KEY " 
								+"  ) AS GCM_CLIENT_CD, " 
								+"  (SELECT GCM_PROGRAM_NAME " 
								+"  FROM GCMC.GCM_PROGRAM_LIST PL " 
								+"  WHERE PL.GCM_PROGRAM_KEY = V.GCM_PROGRAM_KEY " 
								+"  ) AS PROGRAM_NAME, " 
								+"  ASSIGNED_DATE_TIME AS ASSIGNED_DATE, " 
								+"  GR.GCM_REASON_DESC, " 
								+"  V.GCM_REASON_CODE, " 
								+"  (SELECT NVL(last_name " 
								+"    || ', ' " 
								+"    || first_name,'APPLOAD') " 
								+"  FROM gcmc.gcm_user u " 
								+"  WHERE u.userid = v.create_userid " 
								+"  ) ESCALATED_BY, " 
								+"  V.CREATE_DATE_TIME AS ESCALATED_DATE " 
								+"FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR V, " 
								+"  GCM_PROJ_CONTENT PC, " 
								+"  GCM_PROVIDER P, GCM_REASON GR " 
								+"WHERE P.GCM_PROVIDER_KEY             = V.GCM_PROVIDER_KEY " 
								+"AND PC.GCM_PROJECT_CONTENT_KEY       = V.GCM_PROJECT_CONTENT_KEY " 
								+"AND V.WORK_LIST_PARENT_ACTIVITY_KEY IS NOT NULL " 
								+" AND GR.GCM_REASON_CODE=V.GCM_REASON_CODE "
								+"AND V.GCM_USER_KEY                   = :GCM_LOGIN_USER_KEY " 
								+"AND V.GCM_BUSINESS_FUNC_KEY          = :GCM_BUSINESS_FUNC_KEY "
								+ " AND V.GCM_HP_KEY IN ( SELECT gcm_hp_key "
								+ " FROM GCM_GROUP_CLIENT_HP_VW "
								+ " WHERE gcm_group_key IN "
								+ "( SELECT gcm_group_key FROM GCM_USER_VENDOR_GROUP_VW WHERE gcm_user_key = :GCM_LOGIN_USER_KEY )) "
								+" #WHERE# " ;
	
	String QUERY_INSERT_CODER_PRODUCTIVITY = "INSERT " 
										+"INTO GCM_CODER_PRODUCTIVITY " 
										+"  ( " 
										+"    GCM_CODER_PRODUCTIVITY_KEY,"
										+"    GCM_PROJ_CONT_BUS_FUNC_VEN_KEY, " 
										+"    GCM_PROJECT_CONTENT_KEY, " 
										+"    GCM_PROJ_CONTENT_BARCODE, " 
										+"    GCM_PROJ_KEY, " 
										+"    GCM_PROJECT_YEAR, " 
										+"    GCM_BUSINESS_FUNC_KEY, " 
										+"    GCM_VENDOR_KEY, " 
										+"    GCM_BUS_FUNC_STATUS, " 
										+"    EVENT,"
										+"    WORK_ID, " 
										+"    WORK_LIST_PARENT_ACTIVITY_KEY, " 
										+"    GCM_USER_KEY, " 
										+"    CREATE_USERID, " 
										+"    CREATE_DATE_TIME, " 
										+"    MODIFY_USERID, " 
										+"    MODIFY_DATE_TIME, " 
										+"    GCM_ASSIGNEDBY_USER_KEY"
										+"  ) " 
										+"SELECT GCM_CODER_PRODUCTIVITY_SEQ.NEXTVAL, " 
										+"  GCM_PROJ_CONT_BUS_FUNC_VEN_KEY,"
										+"  GCM_PROJECT_CONTENT_KEY, " 
										+"  GCM_PROJ_CONTENT_BARCODE, " 
										+"  GCM_PROJ_KEY, " 
										+"  GCM_PROJECT_YEAR, " 
										+"  GCM_BUSINESS_FUNC_KEY, " 
										+"  GCM_VENDOR_KEY, " 
										+"  GCM_BUS_FUNC_STATUS, " 
										+"  :EVENT, "
										+"  PKG_UTIL.FNC_GUID(),"
										+"  WORK_LIST_PARENT_ACTIVITY_KEY, " 
										+"  :GCM_LOGIN_USER_KEY, " 
										+"  :MODIFY_USERID, " 
										+"  SYSDATE, " 
										+"  :MODIFY_USERID, " 
										+"  SYSDATE, " 
										+"  :GCM_LOGIN_USER_KEY "
										+"FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR " 
										+"WHERE GCM_PROJ_CONTENT_BARCODE IN  "
										+" (SELECT REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) "  
										+"	FROM DUAL CONNECT BY REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) IS NOT NULL ) "
										+"AND GCM_BUSINESS_FUNC_KEY          = :GCM_BUSINESS_FUNC_KEY "
										+"AND GCM_BUS_FUNC_STATUS           IN ('CREATED') " 
										+"AND WORK_LIST_PARENT_ACTIVITY_KEY IS NOT NULL";
								
	String QUERY_INSERT_CODER_PRODUCTIVITY_FORSUP = "INSERT " 
											+"INTO GCM_CODER_PRODUCTIVITY " 
											+"  ( " 
											+"    GCM_CODER_PRODUCTIVITY_KEY, " 
											+"    GCM_PROJ_CONT_BUS_FUNC_VEN_KEY, " 
											+"    GCM_PROJECT_CONTENT_KEY, " 
											+"    GCM_PROJ_CONTENT_BARCODE, " 
											+"    GCM_PROJ_KEY, " 
											+"    GCM_PROJECT_YEAR, " 
											+"    GCM_BUSINESS_FUNC_KEY, " 
											+"    GCM_VENDOR_KEY, " 
											+"    GCM_BUS_FUNC_STATUS, " 
											+"    EVENT, " 
											+"    WORK_ID, " 
											+"    WORK_LIST_PARENT_ACTIVITY_KEY, " 
											+"    GCM_USER_KEY, " 
											+"    CREATE_USERID, " 
											+"    CREATE_DATE_TIME, " 
											+"    MODIFY_USERID, " 
											+"    MODIFY_DATE_TIME " 
											+"  ) " 
											+"SELECT GCM_CODER_PRODUCTIVITY_SEQ.NEXTVAL, " 
											+"  V.GCM_PROJ_CONT_BUS_FUNC_VEN_KEY, " 
											+"  V.GCM_PROJECT_CONTENT_KEY, " 
											+"  V.GCM_PROJ_CONTENT_BARCODE, " 
											+"  V.GCM_PROJ_KEY, " 
											+"  V.GCM_PROJECT_YEAR, " 
											+"  V.GCM_BUSINESS_FUNC_KEY, " 
											+"  V.GCM_VENDOR_KEY, " 
											+"  V.GCM_BUS_FUNC_STATUS, " 
											+"  'RELEASED', " 
											+"  V.WORK_LIST_ACTIVITY_KEY, " 
											+"  V.WORK_LIST_PARENT_ACTIVITY_KEY, " 
											+"  V.GCM_USER_KEY, " 
											+"  :MODIFY_USERID, " 
											+"  SYSDATE, " 
											+"  :MODIFY_USERID, " 
											+"  SYSDATE " 
											+"FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR V " 
											+"WHERE V.GCM_PROJ_CONTENT_BARCODE IN " 
											+"  (SELECT REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) " 
											+"  FROM DUAL " 
											+"    CONNECT BY REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) IS NOT NULL " 
											+"  ) " 
											+"AND V.GCM_USER_KEY                   = :GCM_LOGIN_USER_KEY " 
											+"AND V.GCM_BUSINESS_FUNC_KEY          = :GCM_BUSINESS_FUNC_KEY " 
											+"AND V.GCM_BUS_FUNC_STATUS           IN ('ASSIGNED', 'INPROGRESS') " 
											+"AND V.WORK_LIST_PARENT_ACTIVITY_KEY IS NOT NULL";
			
}
