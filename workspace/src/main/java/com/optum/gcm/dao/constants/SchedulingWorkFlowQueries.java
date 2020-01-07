package com.optum.gcm.dao.constants;

/**
 * @author pmule
 *
 */

public interface SchedulingWorkFlowQueries {
	
	String QUERY_GET_EXISTING_APPTS = 	"SELECT GCM_RET_APPT_KEY, TO_CHAR(APPT_DATE_TIME, 'MM-DD-YYYY') APPT_DATE, " 
										+"  TO_CHAR(APPT_DATE_TIME, 'HH24:MI:SS PM') APPT_TIME, " 
										+"  ADDRESS_1 " 
										+"  ||', ' " 
										+"  || ADDRESS_2 " 
										+"  ||', ' " 
										+"  || CITY " 
										+"  ||', ' " 
										+"  || STATE " 
										+"  ||', ' " 
										+"  ||ZIP RETR_LOCATION, " 
										+" LAST_NAME ||', '|| FIRST_NAME as RETR_CONTACT,"
										+"  PHONE_NUM RETR_PHONE, " 
										+"  FAX_NUM RETR_FAX, " 
										+"  (SELECT LAST_NAME " 
										+"    ||', ' " 
										+"    ||FIRST_NAME " 
										+"  FROM GCM_USER U " 
										+"  WHERE U.GCM_USER_KEY = A.GCM_USER_KEY " 
										+"  ) AS APPT_USERNAME, " 
										+"  APPT_TYPE, " 
										+"  APPT_STATUS,"
										+ " A.GCM_USER_KEY AS GCM_USER_KEY, " 
										+" (select count(*) from GCM_RET_WI wi where wi.GCM_RET_APPT_KEY = A.GCM_RET_APPT_KEY) as CHART_CNT, " 
										+"  0 RET_CNT " 
										+"FROM GCM_RET_APPT A " 
										+ "WHERE APPT_STATUS IN ('SCHEDULED', 'PASTDUE')  "
										+ " #WHERE# ORDER BY GCM_RET_APPT_KEY ASC";
	
	String QUERY_GET_APPTDETAILS_BYAPPTID = "SELECT * FROM GCM_RET_APPT WHERE GCM_RET_APPT_KEY = :GCM_RET_APPT_KEY  " ;
	
	String QUERY_GET_APPTDETAILS_BYCHARTID = "select a.*" + 
			"  From GCM_RET_WI w," + 
			"       GCM_RET_APPT a" + 
			" where w.GCM_RET_APPT_KEY = a.GCM_RET_APPT_KEY" + 
			"   and w.GCM_PROJ_CONTENT_BARCODE=:PROJ_CONTENT_BARCODE" ;


	String QUERY_GET_CHART_MEMBER_DETAILS = "SELECT P.PROV_GRP_NAME, " 
										+"  (P.PROV_LAST_NAME " 
										+"  ||', ' " 
										+"  || P.PROV_FIRST_NAME)   AS PROV_NAME, " 
										+"  P.SOURCE_SYSTEM_PROV_ID AS PROV_ID, " 
										+"  P.PROVIDER_ADDRESS AS PROV_LOCATION, " 
										+"  P.PROV_PHONE, " 
										+"  P.PROV_FAX, " 
										+"  (SELECT LAST_NAME " 
										+"    ||', ' " 
										+"    ||FIRST_NAME " 
										+"  FROM GCM_USER U " 
										+"  WHERE U.GCM_USER_KEY = WI.GCM_USER_KEY " 
										+"  ) AS USER_NAME, " 
										+"  MBR_LAST_NAME " 
										+"  ||', ' " 
										+"  || MBR_FIRST_NAME              AS MEMBER_NAME, " 
										+"  MBR_DOB AS MEMBER_DOB, " 
										+"  PC.GCM_PROJ_CONTENT_BARCODE    AS CHART_ID, " 
										+"  MBR_GENDER AS MEMBER_GENDER, " 
										+"  WI.GCM_USER_KEY USER_KEY, "
										+"  IS_INCLUDE_FLAG,"
										+" 	GCM_BUS_FUNC_STATUS, " 
										+" 	GRC.GCM_REASON_DESC AS PEND_REASON "
										+" FROM GCM_PROVIDER P, " 
										+"  GCM_RET_WI WI, " 
										+"  GCM_MEMBER M, " 
										+"  GCM_PROJ_CONTENT PC, " 
										+" GCM_REASON GRC, "
										+"  GCM_RET_APPT RA "
										+" WHERE WI.GCM_PROVIDER_KEY      = P.GCM_PROVIDER_KEY "
										+ " AND RA.GCM_RET_APPT_KEY(+)  = WI.GCM_RET_APPT_KEY "
										+ " AND RA.GCM_REASON_CODE = GRC.GCM_REASON_CODE(+) "
										+" #WHERE# "
										+" AND M.GCM_GLB_MEMBER_KEY       = WI.GCM_GLB_MEMBER_KEY " 
										+" AND PC.GCM_PROJECT_CONTENT_KEY = WI.GCM_PROJECT_CONTENT_KEY " 
										+" AND WI.GCM_USER_KEY = :GCM_LOGIN_USER_KEY "
							//			+" AND WI.GCM_BUS_FUNC_STATUS NOT IN ('RECVD', 'NONRETRIEVABLE', 'CANCELED', 'DUPLICATE','CNA') "
										+" AND WI.GCM_HP_KEY             IN " 
										+"  (SELECT GCM_HP_KEY " 
										+"  FROM GCM_GROUP_CLIENT_HP_VW " 
										+"  WHERE GCM_GROUP_KEY IN " 
										+"    (SELECT GCM_GROUP_KEY " 
										+"    FROM GCM_USER_VENDOR_GROUP_VW " 
										+"    WHERE GCM_USER_KEY = :GCM_LOGIN_USER_KEY " 
										+"    ) " 
										+"  ) " ;
	
	
	String QUERY_GET_CHART_MEMBER_DETAILS_WITHAPPT = "SELECT P.PROV_GRP_NAME, " 
													+"  (P.PROV_LAST_NAME " 
													+"  ||', ' " 
													+"  || P.PROV_FIRST_NAME)   AS PROV_NAME, " 
													+"  P.SOURCE_SYSTEM_PROV_ID AS PROV_ID, " 
													+"  (PROV_ADDRESS_1 " 
													+"  ||',' " 
													+"  || PROV_ADDRESS_2 " 
													+"  ||',' " 
													+"  || P.PROV_CITY " 
													+"  ||',' " 
													+"  || P.PROV_STATE " 
													+"  ||',' " 
													+"  || P.PROV_ZIP) AS PROV_LOCATION, " 
													+"  P.PROV_PHONE, " 
													+"  P.PROV_FAX, " 
													+"  (SELECT LAST_NAME " 
													+"    ||', ' " 
													+"    ||FIRST_NAME " 
													+"  FROM GCM_USER U " 
													+"  WHERE U.GCM_USER_KEY = WI.GCM_USER_KEY " 
													+"  ) AS USER_NAME, " 
													+"  MBR_LAST_NAME " 
													+"  ||', ' " 
													+"  || MBR_FIRST_NAME              AS MEMBER_NAME, " 
													+"  TO_CHAR(MBR_DOB, 'MM-DD-YYYY') AS MEMBER_DOB, " 
													+"  PC.GCM_PROJ_CONTENT_BARCODE    AS CHART_ID, " 
													+"  MBR_GENDER AS MEMBER_GENDER, " 
													+"  GCM_USER_KEY USER_KEY, "
													+"  IS_INCLUDE_FLAG " 
													+"FROM GCM_PROVIDER P, " 
													+"  GCM_RET_WI WI, " 
													+"  GCM_MEMBER M, " 
													+"  GCM_PROJ_CONTENT PC " 
													+"WHERE WI.GCM_PROVIDER_KEY      = P.GCM_PROVIDER_KEY " 
													+ " #WHERE# "
													+"AND M.GCM_GLB_MEMBER_KEY       = WI.GCM_GLB_MEMBER_KEY " 
													+"AND PC.GCM_PROJECT_CONTENT_KEY = WI.GCM_PROJECT_CONTENT_KEY " 
													+"AND WI.GCM_USER_KEY = :GCM_LOGIN_USER_KEY "
													+"AND WI.GCM_BUS_FUNC_STATUS NOT IN ('RECVD', 'NONRETRIEVABLE', 'CANCELED', 'DUPLICATE','CNA') "
													+"AND WI.GCM_HP_KEY             IN " 
													+"  (SELECT GCM_HP_KEY " 
													+"  FROM GCM_GROUP_CLIENT_HP_VW " 
													+"  WHERE GCM_GROUP_KEY IN " 
													+"    (SELECT GCM_GROUP_KEY " 
													+"    FROM GCM_USER_VENDOR_GROUP_VW " 
													+"    WHERE GCM_USER_KEY = :GCM_LOGIN_USER_KEY " 
													+"    ) " 
													+"  ) " ;
	
	String QUERY_GET_CHARTDS_WITHOUTAPPT = "SELECT  " 
											+"  PC.GCM_PROJ_CONTENT_BARCODE  " 
											+"FROM GCM_PROVIDER P, " 
											+"  GCM_RET_WI WI, " 
											+"  GCM_PROJ_CONTENT PC " 
											+"WHERE WI.GCM_PROVIDER_KEY      = P.GCM_PROVIDER_KEY " 
											+ " #WHERE# "
											//+"AND GCM_RET_APPT_KEY          IS NULL " 
											+"AND GCM_USER_KEY = :GCM_USER_KEY "
											+"AND PC.GCM_PROJECT_CONTENT_KEY = WI.GCM_PROJECT_CONTENT_KEY " 
											+"AND WI.GCM_HP_KEY             IN " 
											+"  (SELECT GCM_HP_KEY " 
											+"  FROM GCM_GROUP_CLIENT_HP_VW " 
											+"  WHERE GCM_GROUP_KEY IN " 
											+"    (SELECT GCM_GROUP_KEY " 
											+"    FROM GCM_USER_VENDOR_GROUP_VW " 
											+"    WHERE GCM_USER_KEY = :GCM_LOGIN_USER_KEY " 
											+"    ) " 
											+"  ) " ;

	String QUERY_GET_PROVDETAILS_BYAPPTID = "SELECT PROV_GRP_NAME, " +
											"  PROV_NAME, " +
											"  PROV_ID, " +
											"  PROV_LOCATION, " +
											"  PROV_PHONE, " +
											"  PROV_FAX, " +
											"  '' AS USER_NAME, " +
											"  '' AS USER_KEY, " +
											"  REC_CNT, " +
											"  SPECIAL_CATEGORY, " +
											"  SPECIAL_NOTES, " +
											"  provider_selected " +
											"FROM " +
											"  (SELECT P.PROV_GRP_NAME, " +
											"    (P.PROV_LAST_NAME " +
											"    ||', ' " +
											"    || P.PROV_FIRST_NAME)   AS PROV_NAME, " +
											"    P.SOURCE_SYSTEM_PROV_ID AS PROV_ID, " +
											"    P.PROVIDER_ADDRESS AS PROV_LOCATION, " +
											"    P.PROV_PHONE, " +
											"    P.PROV_FAX, " +
											"    SPECIAL_CATEGORY AS SPECIAL_CATEGORY, " +
											"    SPECIAL_NOTES    AS SPECIAL_NOTES , " +
											"    COUNT(1) REC_CNT, " +
											"    NVL2(IS_INCLUDE_FLAG,'Y','N') AS PROVIDER_SELECTED " +
											"  FROM GCM_PROVIDER P, " +
											"    GCM_RET_WI WI, " +
											"    GCM_RET_APPT A " +
											"  WHERE WI.GCM_PROVIDER_KEY = P.GCM_PROVIDER_KEY " +
											"  AND WI.GCM_RET_APPT_KEY   = A.GCM_RET_APPT_KEY " +
											"  AND A.GCM_VENDOR_KEY      = :GCM_VENDOR_KEY " +
											"  AND A.GCM_RET_APPT_KEY    = :GCM_RET_APPT_KEY "+
											"  AND WI.GCM_BUS_FUNC_STATUS NOT IN ('RECVD', 'NONRETRIEVABLE', 'CANCELED', 'DUPLICATE','CNA') " +
											"  GROUP BY P.PROV_GRP_NAME, " +
											"    (P.PROV_LAST_NAME " +
											"    ||', ' " +
											"    || P.PROV_FIRST_NAME), " +
											"    P.SOURCE_SYSTEM_PROV_ID, " +
											"    P.PROVIDER_ADDRESS, " +
											"    SPECIAL_CATEGORY, " +
											"    SPECIAL_NOTES, " +
											"    P.PROV_PHONE, " +
											"    P.PROV_FAX, " +
											"    A.GCM_USER_KEY, " +
											"    NVL2(IS_INCLUDE_FLAG,'Y','N') " +
											"  )";
	
	String QUERY_UPDATE_RETWI_WITHAPPT = " UPDATE GCM_RET_WI SET GCM_BUS_FUNC_STATUS = :GCM_BUS_FUNC_STATUS, MODIFY_USERID = :MODIFY_USERID, "
								+ "MODIFY_DATE_TIME = SYSDATE, GCM_RET_APPT_KEY = :GCM_RET_APPT_KEY,  "
			                    + "IS_INCLUDE_FLAG = :IS_INCLUDE_FLAG, GCM_USER_KEY = :GCM_USER_KEY, "
			                    + "GCM_BUS_FUNC_DETAIL_KEY = :GCM_BUS_FUNC_DETAIL_KEY #UPDATEFAXSTATUS# #UPDATE_PEND_ATTEMPT# "
								+ "WHERE GCM_PROJ_CONTENT_BARCODE IN " 
								+" (SELECT REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) "  
								+"	FROM DUAL CONNECT BY REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) IS NOT NULL ) "
								+" AND GCM_BUS_FUNC_STATUS NOT IN ('RECVD', 'NONRETRIEVABLE', 'CANCELED', 'DUPLICATE','CNA') ";
	
	String QUERY_UPDATE_RETAPPT_DATEANDTIME = " UPDATE GCM_RET_APPT SET APPT_DATE_TIME = :APPT_DATE_TIME, MODIFY_USERID = :MODIFY_USERID, MODIFY_DATE_TIME = SYSDATE, "
			+ " FAX_STATUS = CASE WHEN (APPT_TYPE = 'FAX')  THEN 'NEW' "
			+ "				 ELSE FAX_STATUS END, "
			+ " APPT_STATUS = :APPT_STATUS WHERE GCM_RET_APPT_KEY = :GCM_RET_APPT_KEY ";
	
	String QUERY_UPDATE_RETAPPT_APPTCANCEL = " UPDATE GCM_RET_APPT SET APPT_STATUS = 'CANCELED', MODIFY_DATE_TIME = SYSDATE, MODIFY_USERID = :MODIFY_USERID "
			+ " WHERE GCM_RET_APPT_KEY = :GCM_RET_APPT_KEY ";
	
	String QUERY_UPDATE_RETWI_APPTCANCEL = " UPDATE GCM_RET_WI SET GCM_BUS_FUNC_STATUS = 'ASSIGNED', GCM_RET_APPT_KEY = NULL, IS_INCLUDE_FLAG = NULL, MODIFY_DATE_TIME = SYSDATE, MODIFY_USERID = :MODIFY_USERID, "
			+ " RFAX_SENT_STATUS = CASE WHEN (RFAX_SENT_STATUS IS NOT NULL AND CHART_FINDER_ID IS NOT NULL)  THEN 'REASSIGN' "
			+ " 				   WHEN (RFAX_SENT_STATUS IS NOT NULL AND CHART_FINDER_ID IS NULL)  THEN 'UNASSIGNED' "
			+ "					   ELSE NULL END "
			+ " WHERE GCM_PROJ_CONTENT_BARCODE IN (SELECT REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) "
			+ " FROM DUAL CONNECT BY REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) IS NOT NULL ) "
			+ "  AND GCM_BUS_FUNC_STATUS NOT IN ('RECVD', 'NONRETRIEVABLE', 'CANCELED', 'DUPLICATE','CNA') AND GCM_RET_APPT_KEY = :GCM_RET_APPT_KEY ";
	
	String QUERY_UPDATE_RETWI_WOAPPT = " UPDATE GCM_RET_WI SET GCM_BUS_FUNC_STATUS = :GCM_BUS_FUNC_STATUS, MODIFY_USERID = :MODIFY_USERID, "
			+ " MODIFY_DATE_TIME = SYSDATE, IS_INCLUDE_FLAG = NULL, GCM_USER_KEY = NULL, GCM_RET_APPT_KEY = NULL, GCM_BUS_FUNC_DETAIL_KEY = :GCM_BUS_FUNC_DETAIL_KEY, "
			+ " RFAX_SENT_STATUS = CASE WHEN (RFAX_SENT_STATUS IS NOT NULL AND CHART_FINDER_ID IS NOT NULL)  THEN 'REASSIGN' "
			+ " 				   WHEN (RFAX_SENT_STATUS IS NOT NULL AND CHART_FINDER_ID IS NULL)  THEN 'UNASSIGNED' "
			+ "					   ELSE NULL END "
			+ " WHERE GCM_PROJ_CONTENT_BARCODE IN (SELECT REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) FROM DUAL CONNECT BY REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) IS NOT NULL)  AND GCM_BUS_FUNC_STATUS NOT IN ('RECVD', 'NONRETRIEVABLE', 'CANCELED', 'DUPLICATE','CNA') ";
	
	String QUERY_PUSH_NOT_SELECTED_WI_TO_WL = "UPDATE GCM_RET_WI SET GCM_BUS_FUNC_STATUS = 'ASSIGNED', GCM_RET_APPT_KEY = NULL, MODIFY_DATE_TIME = SYSDATE, IS_INCLUDE_FLAG = NULL, MODIFY_USERID = :MODIFY_USERID, "
			+ " RFAX_SENT_STATUS = CASE WHEN (RFAX_SENT_STATUS IS NOT NULL AND CHART_FINDER_ID IS NOT NULL)  THEN 'REASSIGN' "
			+ " 				   WHEN (RFAX_SENT_STATUS IS NOT NULL AND CHART_FINDER_ID IS NULL)  THEN 'UNASSIGNED' "
			+ "					   ELSE NULL END "
			+ " WHERE  GCM_RET_APPT_KEY = :GCM_RET_APPT_KEY AND GCM_BUS_FUNC_STATUS NOT IN ('RECVD', 'NONRETRIEVABLE','CNA')";
	
	String QUERY_UPDATE_RETWI_RELTOASSN = " UPDATE GCM_RET_WI SET GCM_BUS_FUNC_STATUS = :GCM_BUS_FUNC_STATUS, MODIFY_USERID = :MODIFY_USERID, "
			+ "MODIFY_DATE_TIME = SYSDATE,  GCM_USER_KEY = NULL, IS_INCLUDE_FLAG = NULL "
			+ "WHERE GCM_PROJ_CONTENT_BARCODE IN (SELECT REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) FROM DUAL CONNECT BY REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) IS NOT NULL) AND GCM_BUS_FUNC_STATUS NOT IN ('RECVD', 'NONRETRIEVABLE', 'CANCELED', 'DUPLICATE','CNA') ";
	
	String QUERY_GET_APPT_COMMENT = "SELECT C.GCM_RET_APPT_KEY, " 
										+"  C.APPT_ITERATION, " 
										+"  C.COMMENTS, " 
										+"  CASE " 
										+"    WHEN C.COMMENT_TYPE = 'SYSTEM' " 
										+"    THEN 'System Comment' " 
										+"    WHEN U.USERID IS NOT NULL " 
										+"    THEN U.LAST_NAME " 
										+"      || ', ' " 
										+"      || U.FIRST_NAME " 
										+"    ELSE 'System Comment' " 
										+"  END AS CREATE_USERID, " 
										+"  C.CREATE_DATE_TIME " 
										+"FROM GCM_RET_APPT_COMMENTS c, " 
										+"  GCM_USER U " 
										+"WHERE GCM_RET_APPT_KEY = :GCM_RET_APPT_KEY " 
										+"AND C.CREATE_USERID    = U.USERID(+) " 
										+"ORDER BY C.CREATE_DATE_TIME DESC ";
	
	String QUERY_REMOVE_EXCLUDED_WI_FROM_APPT = " UPDATE GCM_RET_WI SET GCM_RET_APPT_KEY = NULL, GCM_BUS_FUNC_STATUS = 'ASSIGNED', IS_INCLUDE_FLAG = NULL, MODIFY_DATE_TIME = SYSDATE, MODIFY_USERID = :MODIFY_USERID, "
												+ " RFAX_SENT_STATUS = CASE WHEN (RFAX_SENT_STATUS IS NOT NULL AND CHART_FINDER_ID IS NOT NULL)  THEN 'REASSIGN' "
												+ " 				   WHEN (RFAX_SENT_STATUS IS NOT NULL AND CHART_FINDER_ID IS NULL)  THEN 'UNASSIGNED' "
												+ "					   ELSE NULL END "
												+ " WHERE GCM_RET_APPT_KEY = :GCM_RET_APPT_KEY AND (IS_INCLUDE_FLAG != 'Y' OR IS_INCLUDE_FLAG IS NULL) "
												+ " AND GCM_BUS_FUNC_STATUS NOT IN ('RECVD', 'NONRETRIEVABLE', 'CANCELED', 'DUPLICATE','CNA') ";
	
	String QUEY_GETCHARTSTATUS_CNTS = "SELECT RECEIVED_CNT , " 
										+"  SCHEDULED_CNT , " 
										+"  UNSCHEDULED_CNT , " 
										+"  NONRETRIEVABLE_CNT " 
										+"FROM " 
										+"  (SELECT WI.GCM_PROJECT_CONTENT_KEY, " 
										+"    CASE " 
										+"      WHEN WI.GCM_BUS_FUNC_STATUS='RECVD' " 
										+"      THEN 'RECIEVED' " 
										+"      WHEN WI.GCM_BUS_FUNC_STATUS='SCHEDULED' " 
										+"      THEN 'SCHEDULED' " 
										+"      WHEN WI.GCM_BUS_FUNC_STATUS IN ('NONRETRIEVABLE','DUPLICATE','CANCELED','CNA') " 
										+"      THEN 'NON-RETRIEVABLE' " 
										+"      ELSE 'UNSCHEDULED' " 
										+"    END AS GCM_BUS_FUNC_STATUS, " 
										+"    WI.GCM_BUSINESS_FUNC_KEY " 
										+"  FROM GCM_RET_WI WI " 
										+"  WHERE WI.GCM_BUSINESS_FUNC_KEY                                    = 4 " 
										+"  AND WI.GCM_RET_APPT_KEY                                           = :GCM_RET_APPT_KEY " 
										+"  ) PIVOT (COUNT (GCM_PROJECT_CONTENT_KEY) FOR GCM_BUS_FUNC_STATUS "
										+ "IN ('RECIEVED' AS RECEIVED_CNT, 'SCHEDULED' AS SCHEDULED_CNT, 'UNSCHEDULED' AS UNSCHEDULED_CNT ,'NON-RETRIEVABLE' AS NONRETRIEVABLE_CNT )) " ;
							
	String QUERY_GET_MEMBER_DETAILS = "SELECT MBR_LAST_NAME " 
										+"  ||', ' " 
										+"  || MBR_FIRST_NAME              AS MEMBER_NAME, " 
										+"  TO_CHAR(MBR_DOB, 'MM-DD-YYYY') AS MEMBER_DOB, " 
										+"  MBR_GENDER                     AS MEMBER_GENDER, " 
										+"  H.HP_MBR_ID MEMBER_ID " 
										+"FROM GCM_PROVIDER P, " 
										+"  GCM_RET_WI WI, " 
										+"  GCM_MEMBER M, " 
										+"  GCM_HP_MEMBER H " 
										+"WHERE WI.GCM_PROVIDER_KEY = P.GCM_PROVIDER_KEY " 
										//+"AND GCM_RET_APPT_KEY     IS NULL " 
										+"AND WI.GCM_USER_KEY = :GCM_LOGIN_USER_KEY "
										+"AND M.GCM_GLB_MEMBER_KEY  = WI.GCM_GLB_MEMBER_KEY " 
										+"AND H.GCM_HP_MEMBER_KEY   = WI.GCM_HP_MEMBER_KEY "
										+"AND WI.GCM_BUS_FUNC_STATUS NOT IN ('RECVD', 'NONRETRIEVABLE', 'CANCELED', 'DUPLICATE','CNA') " 
										+" #WHERE#"
										+"AND WI.GCM_HP_KEY        IN " 
										+"  (SELECT GCM_HP_KEY " 
										+"  FROM GCM_GROUP_CLIENT_HP_VW " 
										+"  WHERE GCM_GROUP_KEY IN " 
										+"    (SELECT GCM_GROUP_KEY " 
										+"    FROM GCM_USER_VENDOR_GROUP_VW " 
										+"    WHERE GCM_USER_KEY = :GCM_LOGIN_USER_KEY " 
										+"    ) " 
										+"  )" ;
	
	
	String QUERY_GET_CHARTDS_BY_APPT_KEY = "SELECT  " 
										+"  WI.GCM_PROJ_CONTENT_BARCODE  " 
										+"  FROM GCM_RET_WI WI " 
										+" WHERE WI.GCM_RET_APPT_KEY = :GCM_RET_APPT_KEY " 
										+" AND WI.GCM_HP_KEY             IN " 
										+"  (SELECT GCM_HP_KEY " 
										+"  FROM GCM_GROUP_CLIENT_HP_VW " 
										+"  WHERE GCM_GROUP_KEY IN " 
										+"    (SELECT GCM_GROUP_KEY " 
										+"    FROM GCM_USER_VENDOR_GROUP_VW " 
										+"    WHERE GCM_USER_KEY = :GCM_LOGIN_USER_KEY " 
										+"    ) " 
										+"  ) " ;
	
	String QUERY_UPDATE_APPT_DETAILS = "UPDATE GCM_RET_APPT SET "
									+"APPT_DATE_TIME	= :APPT_DATE_TIME, "
									+"APPT_TYPE			= :APPT_TYPE, "
									+"APPT_STATUS		= :APPT_STATUS, "
									+"FIRST_NAME		= :FIRST_NAME, "
									+"LAST_NAME			= :LAST_NAME, "
									+"ADDRESS_1			= :ADDRESS_1, "
									+"ADDRESS_2			= :ADDRESS_2, "
									+"CITY				= :CITY, "
									+"STATE				= :STATE, "
									+"ZIP				= :ZIP, "
									+"PHONE_NUM			= :PHONE_NUM, "
									+"FAX_NUM			= :FAX_NUM, "
									+"FAX_STATUS 		= CASE WHEN (:APPT_TYPE = 'FAX')  THEN 'NEW' "
									+"					  ELSE FAX_STATUS END, "
									+"EMAIL				= :EMAIL, "
									+"MODIFY_USERID		= :MODIFY_USERID, "
									+"MODIFY_DATE_TIME	= SYSDATE, "
									+"NO_OF_ATTEMPTS 	= :NO_OF_ATTEMPTS, "
									+"GCM_REASON_CODE 	= :GCM_REASON_CODE, "
									+"GCM_REASON_COMMENT= :GCM_REASON_COMMENT "
									+"#UPDATE_PEND_ATTEMPT# "
									+"WHERE GCM_RET_APPT_KEY = :GCM_RET_APPT_KEY";
	
	String QUERY_UPDATE_WORKLIST_PROVIDER_DETAILS = " UPDATE GCM_PROVIDER "
									+ " SET PROVIDER_ADDRESS    = :PROVIDER_ADDRESS, "
									+ " PROV_PHONE            = :PROV_PHONE, "
									+ " PROV_FAX              = :PROV_FAX, "
									+ " MODIFY_USERID         = :MODIFY_USERID, "
									+ " MODIFY_DATE_TIME		 = SYSDATE "
									+ " WHERE GCM_PROVIDER_KEY IN (:GCM_PROVIDER_KEY) ";

	String QUERY_SELECT_PROVIDER_KEYS = " SELECT GP.GCM_PROVIDER_KEY FROM GCM_PROVIDER GP JOIN GCM_RET_WI WI ON (GP.GCM_PROVIDER_KEY = WI.GCM_PROVIDER_KEY) "
			+ " WHERE ( "
			+ " ( GP.PROV_LAST_NAME || ', ' || GP.PROV_FIRST_NAME ) = :PROVNAME)  "
			+ " AND  GP.SOURCE_SYSTEM_PROV_ID = :PROV_ID  "
			+ " AND GP.PROV_PHONE = :PROVPHONE AND WI.GCM_BUS_FUNC_STATUS ='ASSIGNED'  #WHERE# ";
	

	String QUERY_UPDATE_RETWI_STATUS = "UPDATE GCM_RET_WI " 
									+" SET GCM_BUS_FUNC_STATUS = :GCM_BUS_FUNC_STATUS, " 
									+"   MODIFY_DATE_TIME      = SYSDATE, " 
									+"   MODIFY_USERID         = :MODIFY_USERID, " 
									+" 	 RFAX_SENT_STATUS 	   = CASE WHEN (CHART_FINDER_ID IS NULL) THEN RFAX_SENT_STATUS "
									+"  						 ELSE 'REASSIGN' END "
									+" WHERE GCM_BUS_FUNC_STATUS != 'RECVD' " 
									+" AND GCM_RET_APPT_KEY       = :GCM_RET_APPT_KEY";
	
	String QUERY_GET_RETWI_BY_USER_ROLE_CD = "SELECT COUNT(*) FROM GCM_RET_WI "
											+ " WHERE GCM_USER_KEY = :GCM_USER_KEY "
											+ " #BUS_FUNC_DTL# "
											+ " AND GCM_BUS_FUNC_STATUS NOT IN ('RECVD', 'NONRETRIEVABLE', 'CANCELED', 'DUPLICATE','CNA')";
	String QUERY_GET_USER_VENDOR_MAPPING = "SELECT COUNT(*) FROM GCM_USER_VENDOR WHERE GCM_USER_KEY =:GCM_USER_KEY AND GCM_VENDOR_KEY =:GCM_VENDOR_KEY  ";
	
	
	
	
	String QUERY_GET_USER_VENDOR = "SELECT  * FROM GCM_USER_VENDOR WHERE GCM_USER_KEY =:GCM_USER_KEY AND GCM_VENDOR_KEY =:GCM_VENDOR_KEY AND IS_ACTIVE_SW ='N' ";
	
	String UPDATE_USER_VENDOR_MAPPING = " UPDATE GCM_USER_VENDOR SET IS_ACTIVE_SW =:IS_ACTIVE_SW,MODIFY_USERID =:MODIFY_USERID  WHERE GCM_USER_KEY =:GCM_USER_KEY AND GCM_VENDOR_KEY =:GCM_VENDOR_KEY ";
	
	String QUERY_GET_APPT_CNT_BY_USER_VENDOR = "SELECT COUNT(AP.GCM_RET_APPT_KEY) FROM GCM_RET_APPT AP JOIN GCM_RET_WI WI ON WI.GCM_RET_APPT_KEY = AP.GCM_RET_APPT_KEY " + 
			" WHERE AP.GCM_USER_KEY = :GCM_USER_KEY " + 
			" AND WI.GCM_BUS_FUNC_DETAIL_KEY = :GCM_BUS_FUNC_DETAIL_KEY " + 
			" AND AP.APPT_STATUS NOT IN ('CANCELED', 'COMPLETED', 'PEND')";
	
	String QUERY_GET_PEND_CNT_APPT_BY_USER_VENDOR = "SELECT COUNT(*) FROM GCM_RET_APPT WHERE GCM_USER_KEY = :GCM_USER_KEY AND APPT_STATUS = 'PEND'";
	
}
