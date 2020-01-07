package com.optum.gcm.dao.constants;

/**
 * @author pmule
 *
 */

public interface CodingWorkFlowQueries {

	String QUERY_GET_CHART_DETAILS = "SELECT V.GCM_BUSINESS_SEGMENT, V.GCM_PROJ_CONTENT_BARCODE CHART_ID, "
									+"V.GCM_BUSINESS_FUNC_KEY,"	 
									+"V.GCM_PROJECT_CONTENT_KEY," 
									+"V.GCM_PROJ_CONT_BUS_FUNC_VEN_KEY," 
									+"MBR_LAST_NAME ||', ' || MBR_FIRST_NAME AS MEMBER_NAME," 
									+"TO_CHAR(MBR_DOB, 'mm-dd-yyyy') as MBR_DOB," 
									+"MBR_GENDER," 
									+"HP_MBR_ID," 
									+"GPC.MBR_EXT_ID,"
									+"V.GCM_PROJ_KEY,"
									+"PROV_LAST_NAME ||', ' ||PROV_FIRST_NAME PROV_NAME, "
									+"PROV_GRP_NAME, "
									+"PROV_GRP_ID, "
									+"V.GCM_BUS_FUNC_STATUS CHART_STATUS, "
									+"V.GCM_HP_PRODUCT, "
									+"(SELECT HP_CD FROM GCM_HP H WHERE H.GCM_HP_KEY = V.GCM_HP_KEY) AS HP_CD, "
									+"(SELECT GCM_CLIENT_CD C "
									+"FROM GCM_CLIENT C, "
									+"GCM_HP H1 "
									+"WHERE C.GCM_CLIENT_KEY = H1.GCM_CLIENT_KEY  "
									+"AND H1.GCM_HP_KEY = V.GCM_HP_KEY) AS GCM_CLIENT_CD, "
									+"GCM_CONT_BUS_FUNC_INSTRUCTION AS CODING_INSTRUCTIONS," 
									+"WORK_LIST_ACTIVITY_KEY as WORK_ID, "
									+"PKG_UTIL.FNC_GUID() as CURRENT_SESSION_ID, "
									+"(SELECT PROGRAM_INSTRUCTION "
									+"FROM GCM_PROGRAM_LIST PL "
									+"WHERE PL.GCM_PROGRAM_KEY = V.GCM_PROGRAM_KEY) AS PROGRAM_INSTRUCTIONS, "
									+"SOURCE_SYSTEM_PROV_ID as SOURCE_SYSTEM_PROV_ID, "
									+"GET_PROJ_CONT_ATTR_VALUE(V.GCM_PROGRAM_KEY, 'CHART REVIEW YEAR', V.GCM_PROJECT_CONTENT_KEY) as CHART_REVIEW_YEAR, "
									+"GCM_CONTENT_EO_KEY, "
									+"PJ.GCM_GROUP_KEY "
									+"FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR V, "
									+"GCM_MEMBER M, "
									+"GCM_PROVIDER P, "
									+"GCM_HP_MEMBER HM, "
									+"GCM_PROJECT PJ, "
									+"GCM_PROJ_CONTENT GPC "
									+"WHERE P.GCM_PROVIDER_KEY = V.GCM_PROVIDER_KEY "
									+"AND M.GCM_GLB_MEMBER_KEY = V.GCM_GLB_MEMBER_KEY "
									+"and HM.GCM_GLB_MEMBER_KEY = M.GCM_GLB_MEMBER_KEY "
									+"and PJ.GCM_PROJ_KEY = V.GCM_PROJ_KEY "
									+"and V.GCM_PROJ_CONTENT_BARCODE = GPC.GCM_PROJ_CONTENT_BARCODE "
									+"AND V.GCM_PROJECT_CONTENT_KEY = GPC.GCM_PROJECT_CONTENT_KEY ";

	
	String QUERY_UPDATE_CHART_STATUS = "UPDATE GCM_PROJ_CONT_BUS_FUNC_VENDOR set GCM_BUS_FUNC_STATUS = :GCM_BUS_FUNC_STATUS, "
			                            + "MODIFY_USERID = :MODIFY_USERID, MODIFY_DATE_TIME = SYSDATE, GCM_BUS_FUNC_STATUS_DT = SYSDATE #SET# " 
			                            + " WHERE GCM_PROJ_CONT_BUS_FUNC_VEN_KEY = :GCM_PROJ_CONT_BUS_FUNC_VEN_KEY "
			                            + " AND GCM_PROJECT_CONTENT_KEY = :GCM_PROJECT_CONTENT_KEY "
			                            + " AND GCM_BUSINESS_FUNC_KEY = :GCM_BUSINESS_FUNC_KEY "
			                            + " AND GCM_PROJ_KEY = :GCM_PROJ_KEY "
			                            + " AND GCM_USER_KEY = :GCM_USER_KEY ";
	
	String QUERY_UPDATE_CHART_STATUS_FORCODING_WI_WHENESC = "UPDATE GCM_PROJ_CONT_BUS_FUNC_VENDOR set GCM_BUS_FUNC_STATUS = :CODING_WI_STATUS, "
            + "MODIFY_USERID = :MODIFY_USERID, MODIFY_DATE_TIME = SYSDATE, GCM_BUS_FUNC_STATUS_DT = SYSDATE " 
            + " WHERE GCM_PROJECT_CONTENT_KEY = :GCM_PROJECT_CONTENT_KEY "
            + " AND GCM_BUSINESS_FUNC_KEY = :GCM_BUSINESS_FUNC_KEY "
            + " AND GCM_PROJ_KEY = :GCM_PROJ_KEY AND GCM_BUS_FUNC_STATUS = 'ESCALATED' ";
	
	String QUERY_UPDATE_ESC_CHART_STATUS = "UPDATE GCM_PROJ_CONT_BUS_FUNC_VENDOR set GCM_BUS_FUNC_STATUS = :SUP_WI_STATUS, "
            + "MODIFY_USERID = :MODIFY_USERID, MODIFY_DATE_TIME = SYSDATE, GCM_BUS_FUNC_STATUS_DT = SYSDATE  " 
            + " WHERE GCM_PROJECT_CONTENT_KEY = :GCM_PROJECT_CONTENT_KEY "
            + " AND GCM_BUSINESS_FUNC_KEY = :GCM_BUSINESS_FUNC_KEY "
            + " AND GCM_PROJ_KEY = :GCM_PROJ_KEY AND GCM_PROJ_CONT_BUS_FUNC_VEN_KEY = :GCM_PROJ_CONT_BUS_FUNC_VEN_KEY ";
	
	String QUERY_SOFTDELETE_ENCOUNTER_DX = "update gcm_encounter_dx set IS_INACTIVE_ENC_DX_SW = 'Y', MODIFY_USERID = :MODIFY_USERID,"
			+ " MODIFY_DATE_TIME = SYSDATE where GCM_ENCOUNTER_KEY IN ( "
			+ " SELECT GCM_ENCOUNTER_KEY FROM GCM_ENCOUNTER WHERE GCM_PROJECT_CONTENT_KEY = :GCM_PROJECT_CONTENT_KEY "
			+ " AND GCM_BUSINESS_FUNC_KEY = :GCM_BUSINESS_FUNC_KEY "	
			+ " AND GCM_PROJ_KEY = :GCM_PROJ_KEY) ";
	
	String QUERY_SOFTDELETE_ENCOUNTER = "UPDATE gcm_encounter " 
										+"SET IS_INACTIVE_ENC_SW             = 'Y', " 
										+"  INACTIVE_ENC_DATE_TIME           = sysdate, " 
										+"  INACTIVE_BY_USERID               = :MODIFY_USERID, MODIFY_DATE_TIME = SYSDATE " 
										+"WHERE GCM_PROJECT_CONTENT_KEY      = :GCM_PROJECT_CONTENT_KEY " 
										+"AND GCM_BUSINESS_FUNC_KEY          = :GCM_BUSINESS_FUNC_KEY " 
										+"AND GCM_PROJ_KEY                   = :GCM_PROJ_KEY" ;
			
	String QUERY_GET_CHART_HISTORY = "SELECT b.gcm_buss_func_name " 
									+"  || '-' ||w.ESCALATED " 
									+"  || w.gcm_bus_func_status AS action, " 
									+"  nvl2(u.gcm_user_key, u.last_name " 
									+"  || ', ' " 
									+"  || u.first_name, 'SYSTEM') AS user_name, " 
									+"  w.gcm_bus_func_status_dt    AS action_date " 
									+"FROM " 
									+"  (SELECT gcm_project_content_key, " 
									+"    gcm_user_key, " 
									+"    gcm_business_func_key, " 
									+"    gcm_bus_func_status, " 
									+"    gcm_bus_func_status_dt,"
									+ "	  '' as ESCALATED " 
									+"  FROM gcm_ret_wi " 
									+"  UNION ALL " 
									+"  SELECT gcm_project_content_key, " 
									+"    gcm_user_key, " 
									+"    gcm_business_func_key, " 
									+"    gcm_bus_func_status, " 
									+"    gcm_bus_func_status_dt, "
									+"    case when gcm_business_func_key = 2 and WORK_LIST_PARENT_ACTIVITY_KEY is not null then 'Escalate-' end as ESCALATED "
									+"  FROM gcm_proj_cont_bus_func_vendor " 
									+"  ) w, " 
									+"  gcm_user u, " 
									+"  gcm_business_function b " 
									+"WHERE w.gcm_user_key          = u.gcm_user_key (+) " 
									+"AND w.gcm_business_func_key   = b.gcm_business_func_key " 
									+"AND w.gcm_project_content_key = :gcm_project_content_key " 
									+"ORDER BY gcm_bus_func_status_dt DESC, w.gcm_business_func_key DESC " ;
	
	String QUERY_BUS_FUNC_BY_GRP_KEY= "SELECT COUNT(1)  AS COUNT FROM GCM_ROLE_GROUP WHERE GCM_ROLE_CODE=:GCM_ROLE_CODE AND GCM_GROUP_KEY =:GCM_GROUP_KEY";
	
	String GET_CONFIGURATION_QUERY="SELECT" + 
			"     PKG_COMM_CONFIG.FNC_EXISTS_BY_BARCODE(P_BARCODE =>:P_BARCODE,P_DOS_YEAR =>:P_DOS_YEAR,P_VENDOR_KEY =>:P_VENDOR_KEY" + 
			",P_BUSINESS_FUNC_KEY =>:P_BUSINESS_FUNC_KEY,P_BUSINESS_FUNC_DETAIL_KEY =>:P_BUSINESS_FUNC_DETAIL_KEY,P_CONFIG_TYPE =>:P_CONFIG_TYPE,P_CONFIG_VALUE =>:P_CONFIG_VALUE,P_AS_OF_DATE =>TO_DATE(:P_AS_OF_DATE,'MM-dd-YYYY')) FROM DUAL ";
	String QUERY_GET_CHART_COMMENTS = "SELECT CC.CONTENT_COMMENT, " 
										+"  CC.CONTENT_COMMENT_DT, " 
										+"  NVL( " 
										+"  (SELECT TRIM(U.LAST_NAME) " 
										+"    || ', ' " 
										+"    || TRIM(U.FIRST_NAME) " 
										+"  FROM GCM_USER U " 
										+"  WHERE U.USERID = CC.MODIFY_USERID " 
										+"  AND ROWNUM     = 1 " 
										+"  ), 'APPLOAD' ) AS USER_NAME " 
										+"FROM GCM_CONTENT_COMMENT CC " 
										+"WHERE CC.GCM_PROJECT_CONTENT_KEY = :GCM_PROJECT_CONTENT_KEY " 
										+"ORDER BY CC.MODIFY_DATE_TIME DESC " ;
			
	String QUERY_GET_ENC_EO_CODES = "SELECT GCM_EO_KEY, GCM_EO_CODE, GCM_EO_DESC,GCM_GROUP_KEY,IS_ENC_LEVEL,IS_DX_LEVEL FROM  GCM_EO_VW WHERE IS_ENC_LEVEL = 'Y' AND GCM_USE_CODE = 'CODING' ORDER BY GCM_EO_KEY ASC";
	
	String QUERY_GET_DX_LEVEL_EO_CODES = "SELECT DISTINCT GCM_EO_KEY, GCM_EO_CODE, GCM_EO_DESC,GCM_GROUP_KEY,IS_ENC_LEVEL,IS_DX_LEVEL FROM  GCM_EO_VW WHERE IS_DX_LEVEL = 'Y' ORDER BY GCM_EO_KEY ASC";
	
	String QUERY_INSERT_ESCALATED_WITEM = "INSERT " 
										+"INTO GCM_PROJ_CONT_BUS_FUNC_VENDOR " 
										+"  ( " 
										+"    GCM_PROJ_CONT_BUS_FUNC_VEN_KEY, " 
										+"    GCM_PROJECT_CONTENT_KEY, " 
										+"    GCM_PROJ_CONTENT_BARCODE, " 
										+"    GCM_PROVIDER_KEY, " 
										+"    GCM_PROJ_KEY, " 
										+"    GCM_HP_KEY, " 
										+"    GCM_GLB_MEMBER_KEY, " 
										+"    GCM_HP_MEMBER_KEY, " 
										+"    GCM_HP_PRODUCT, " 
										+"    GCM_PROJECT_YEAR, " 
										+"    GCM_BUSINESS_FUNC_KEY, " 
										+"    GCM_BUSINESS_SEGMENT, " 
										+"    GCM_VENDOR_KEY, " 
										+"    GCM_BUS_FUNC_STATUS, " 
										+"    WORK_LIST_ACTIVITY_KEY, " 
										+"    WORK_LIST_PARENT_ACTIVITY_KEY, " 
										+"    GCM_BUSINESS_FUNC_DETAIL_KEY, " 
										+"    GCM_REASON_CODE, " 
										+"    GCM_DOS_YEAR, " 
										+"    GCM_ITERATION, " 
										+"    GCM_CONT_BUS_FUNC_INSTRUCTION, " 
										+"    GCM_REASON_COMMENT, " 
										+"    SCHEDULED_VISIT_DT, " 
										+"    GCM_BUS_FUNC_STATUS_DT, " 
										+"    GCM_USER_KEY, " 
										+"    CREATE_USERID, " 
										+"    CREATE_DATE_TIME, " 
										+"    MODIFY_USERID, " 
										+"    MODIFY_DATE_TIME, " 
										+"    GCM_PROGRAM_KEY, " 
										+"    GCM_OLD_VENDOR_KEY, " 
										+"    IS_CODING_EXTRACTED_SW, " 
										+"    ASSIGNED_DATE_TIME, " 
										+"    IMAGE_SOURCE, " 
										+"    GCM_CONTENT_EO_KEY " 
										+"  ) " 
										+"SELECT GCM_PROJ_CONT_BUS_FUNC_VEN_SEQ.NEXTVAL, " 
										+"  GCM_PROJECT_CONTENT_KEY, " 
										+"  GCM_PROJ_CONTENT_BARCODE, " 
										+"  GCM_PROVIDER_KEY, " 
										+"  GCM_PROJ_KEY, " 
										+"  GCM_HP_KEY, " 
										+"  GCM_GLB_MEMBER_KEY, " 
										+"  GCM_HP_MEMBER_KEY, " 
										+"  GCM_HP_PRODUCT, " 
										+"  GCM_PROJECT_YEAR, " 
										+"  GCM_BUSINESS_FUNC_KEY, " 
										+"  GCM_BUSINESS_SEGMENT, " 
										+"  GCM_VENDOR_KEY, " 
										+"  'CREATED', " 
										+"  WORK_LIST_ACTIVITY_KEY, " 
										+"  :GCM_PROJ_CONT_BUS_FUNC_VEN_KEY, " 
										+"  GCM_BUSINESS_FUNC_DETAIL_KEY, " 
										+"  :GCM_REASON_CODE, " 
										+"  GCM_DOS_YEAR, " 
										+"  GCM_ITERATION, " 
										+"  GCM_CONT_BUS_FUNC_INSTRUCTION, " 
										+"  GCM_REASON_COMMENT, " 
										+"  SCHEDULED_VISIT_DT, " 
										+"  SYSDATE, " 
										+"  '', " 
										+"  :MODIFY_USERID, " 
										+"  SYSDATE, " 
										+"  :MODIFY_USERID, " 
										+"  SYSDATE, " 
										+"  GCM_PROGRAM_KEY, " 
										+"  GCM_OLD_VENDOR_KEY, " 
										+"  IS_CODING_EXTRACTED_SW, " 
										+"  SYSDATE, " 
										+"  IMAGE_SOURCE, " 
										+"  GCM_CONTENT_EO_KEY " 
										+"FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR " 
										+"WHERE GCM_PROJECT_CONTENT_KEY      = :GCM_PROJECT_CONTENT_KEY " 
										+"AND GCM_PROJ_CONT_BUS_FUNC_VEN_KEY = :GCM_PROJ_CONT_BUS_FUNC_VEN_KEY " 
										+"AND GCM_PROJ_KEY                   = :GCM_PROJ_KEY " 
										+"AND GCM_BUSINESS_FUNC_KEY          = :GCM_BUSINESS_FUNC_KEY "
										+"AND GCM_USER_KEY = :GCM_USER_KEY "
										+"AND WORK_LIST_PARENT_ACTIVITY_KEY IS NULL ";
	
	String QUERY_INSERT_QA_WITEM = "INSERT " 
										+"INTO GCM_PROJ_CONT_BUS_FUNC_VENDOR " 
										+"  ( " 
										+"    GCM_PROJ_CONT_BUS_FUNC_VEN_KEY, " 
										+"    GCM_PROJECT_CONTENT_KEY, " 
										+"    GCM_PROJ_CONTENT_BARCODE, " 
										+"    GCM_PROVIDER_KEY, " 
										+"    GCM_PROJ_KEY, " 
										+"    GCM_HP_KEY, " 
										+"    GCM_GLB_MEMBER_KEY, " 
										+"    GCM_HP_MEMBER_KEY, " 
										+"    GCM_HP_PRODUCT, " 
										+"    GCM_PROJECT_YEAR, " 
										+"    GCM_BUSINESS_FUNC_KEY, " 
										+"    GCM_BUSINESS_SEGMENT, " 
										+"    GCM_VENDOR_KEY, " 
										+"    GCM_BUS_FUNC_STATUS, " 
										+"    WORK_LIST_ACTIVITY_KEY, " 
										+"    WORK_LIST_PARENT_ACTIVITY_KEY, " 
										+"    GCM_BUSINESS_FUNC_DETAIL_KEY, " 
										+"    GCM_REASON_CODE, " 
										+"    GCM_DOS_YEAR, " 
										+"    GCM_ITERATION, " 
										+"    GCM_CONT_BUS_FUNC_INSTRUCTION, " 
										+"    GCM_REASON_COMMENT, " 
										+"    SCHEDULED_VISIT_DT, " 
										+"    GCM_BUS_FUNC_STATUS_DT, " 
										+"    GCM_USER_KEY, " 
										+"    CREATE_USERID, " 
										+"    CREATE_DATE_TIME, " 
										+"    MODIFY_USERID, " 
										+"    MODIFY_DATE_TIME, " 
										+"    GCM_PROGRAM_KEY, " 
										+"    GCM_OLD_VENDOR_KEY, " 
										+"    IS_CODING_EXTRACTED_SW, " 
										+"    ASSIGNED_DATE_TIME, " 
										+"    IMAGE_SOURCE, " 
										+"    GCM_CONTENT_EO_KEY, " 
										+"    GCM_CODER_USER_KEY"
										+"  ) " 
										+"SELECT GCM_PROJ_CONT_BUS_FUNC_VEN_SEQ.NEXTVAL, " 
										+"  GCM_PROJECT_CONTENT_KEY, " 
										+"  GCM_PROJ_CONTENT_BARCODE, " 
										+"  GCM_PROVIDER_KEY, " 
										+"  GCM_PROJ_KEY, " 
										+"  GCM_HP_KEY, " 
										+"  GCM_GLB_MEMBER_KEY, " 
										+"  GCM_HP_MEMBER_KEY, " 
										+"  GCM_HP_PRODUCT, " 
										+"  GCM_PROJECT_YEAR, " 
										+"  6, " 
										+"  GCM_BUSINESS_SEGMENT, " 
										+"  GCM_VENDOR_KEY, " 
										+"  'CREATED', " 
										+"  '', " 
										+"  '', " 
										+"  '', " 
										+"  '', " 
										+"  GCM_DOS_YEAR, " 
										+"  1, " 
										+"  'CODING-QA', " 
										+"  '', " 
										+"  '', " 
										+"  SYSDATE, " 
										+"  '', " 
										+"  'SYSTEM', " 
										+"  SYSDATE, " 
										+"  :MODIFY_USERID, " 
										+"  SYSDATE, " 
										+"  GCM_PROGRAM_KEY, " 
										+"  '', " 
										+"  '', " 
										+"  '', " 
										+"  '', " 
										+"  GCM_CONTENT_EO_KEY, " 
										+"  GCM_USER_KEY "
										+"FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR " 
										+"WHERE GCM_PROJECT_CONTENT_KEY      = :GCM_PROJECT_CONTENT_KEY " 
										+"AND GCM_PROJ_CONT_BUS_FUNC_VEN_KEY = :GCM_PROJ_CONT_BUS_FUNC_VEN_KEY " 
										+"AND GCM_PROJ_KEY                   = :GCM_PROJ_KEY " 
										+"AND GCM_BUSINESS_FUNC_KEY          = :GCM_BUSINESS_FUNC_KEY "
										+"AND WORK_LIST_PARENT_ACTIVITY_KEY IS NULL ";
			
	String QUERY_INSERT_GCM_CODER_PRODUCTIVITY = "INSERT " 
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
										+"    WORK_SESSION_ID,"
										+"    GCM_USER_KEY, " 
										+"    CREATE_USERID, " 
										+"    CREATE_DATE_TIME, " 
										+"    MODIFY_USERID, " 
										+"    MODIFY_DATE_TIME " 
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
										+"  :WORK_LIST_ACTIVITY_KEY,"
										+"  WORK_LIST_PARENT_ACTIVITY_KEY, " 
										+"  :WORK_SESSION_ID,"
										+"  :GCM_USER_KEY, " 
										+"  :MODIFY_USERID, " 
										+"  SYSDATE, " 
										+"  :MODIFY_USERID, " 
										+"  SYSDATE " 
										+"FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR " 
										+"WHERE GCM_PROJECT_CONTENT_KEY      = :GCM_PROJECT_CONTENT_KEY " 
										+"AND GCM_PROJ_CONT_BUS_FUNC_VEN_KEY = :GCM_PROJ_CONT_BUS_FUNC_VEN_KEY " 
										+"AND GCM_PROJ_KEY                   = :GCM_PROJ_KEY " 
									//	+"AND GCM_USER_KEY                   = :GCM_USER_KEY "
										+"AND GCM_BUSINESS_FUNC_KEY          = :GCM_BUSINESS_FUNC_KEY ";
	
	String QUERY_INSERT_GCM_CODER_PRODUCTIVITY_FORQAWI = "INSERT " 
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
												+"    GCM_USER_KEY, " 
												+"    CREATE_USERID, " 
												+"    CREATE_DATE_TIME, " 
												+"    MODIFY_USERID, " 
												+"    MODIFY_DATE_TIME " 
												+"  ) " 
												+"SELECT GCM_CODER_PRODUCTIVITY_SEQ.NEXTVAL, " 
												+"  GCM_PROJ_CONT_BUS_FUNC_VEN_KEY,"
												+"  GCM_PROJECT_CONTENT_KEY, " 
												+"  GCM_PROJ_CONTENT_BARCODE, " 
												+"  GCM_PROJ_KEY, " 
												+"  GCM_PROJECT_YEAR, " 
												+"  6, " 
												+"  GCM_VENDOR_KEY, " 
												+"  'CREATED', " 
												+"  :EVENT, "
												+"  GCM_USER_KEY, " 
												+"  :MODIFY_USERID, " 
												+"  SYSDATE, " 
												+"  :MODIFY_USERID, " 
												+"  SYSDATE " 
												+"FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR " 
												+"WHERE GCM_PROJECT_CONTENT_KEY      = :GCM_PROJECT_CONTENT_KEY " 
												+"AND GCM_PROJ_CONT_BUS_FUNC_VEN_KEY = :GCM_PROJ_CONT_BUS_FUNC_VEN_KEY " 
												+"AND GCM_PROJ_KEY                   = :GCM_PROJ_KEY " 
												+"AND GCM_USER_KEY                   = :GCM_USER_KEY "
												+"AND GCM_BUSINESS_FUNC_KEY          = :GCM_BUSINESS_FUNC_KEY ";
}
