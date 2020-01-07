package com.optum.gcm.dao.constants;

/**
 * @author pmule
 *
 */

public interface CodingQAQueries {


		String QUERY_GET_CODINGQA_WORKLIST = "SELECT PC.GCM_PROJ_CONTENT_BARCODE CHART_ID, GCM_PROJ_CONT_BUS_FUNC_VEN_KEY, V.GCM_PROJECT_CONTENT_KEY, " 
											+"  PROV_GRP_NAME,  gp.GCM_PROJ_KEY,  " 
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
											+"  PC.PAGE_COUNT, " 
											+"  PC.CHART_SCORE_GROUP, '' as ESCALATED_FLAG, " 
											+"  V.GCM_BUSINESS_FUNC_KEY, "
											+"  V.QA_ACTION_CD,"
											+"  V.GCM_BUS_FUNC_STATUS_DT "
											+"FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR V, " 
											+"  GCM_PROJ_CONTENT PC, " 
											+"  GCM_PROVIDER P ,  gcm_project GP,gcm_role_group rg,GCM_BUSINESS_FUNCTION GBF,GCM_ROLE GR " 
											+"WHERE P.GCM_PROVIDER_KEY             = V.GCM_PROVIDER_KEY " 
											+"AND PC.GCM_PROJECT_CONTENT_KEY       = V.GCM_PROJECT_CONTENT_KEY " 
											+"AND V.WORK_LIST_PARENT_ACTIVITY_KEY IS NULL " 
											+" AND GP.GCM_PROJ_KEY=PC.GCM_PROJ_KEY "
											+"    AND RG.GCM_GROUP_KEY=GP.GCM_GROUP_KEY "
											 +"    AND GBF.GCM_BUSINESS_FUNC_KEY=v.GCM_BUSINESS_FUNC_KEY "
											 +"     AND GBF.GCM_BUSINESS_FUNC_KEY=GR.GCM_BUSINESS_FUNC_KEY "
											 +"    AND GR.GCM_ROLE_CODE=rg.GCM_ROLE_CODE "
											+" AND V.GCM_CODER_USER_KEY NOT IN (:GCM_LOGIN_USER_KEY) "
											+ " AND V.GCM_HP_KEY IN ( SELECT gcm_hp_key "
											+ " FROM GCM_GROUP_CLIENT_HP_VW "
											+ " WHERE gcm_group_key IN "
											+ "( SELECT gcm_group_key FROM GCM_USER_VENDOR_GROUP_VW WHERE gcm_user_key = :GCM_LOGIN_USER_KEY )) "
											+ " AND V.GCM_VENDOR_KEY = :GCM_VENDOR_KEY "
											+" AND GCM_BUS_FUNC_STATUS = 'CREATED'   AND gp.project_status NOT LIKE 'CLS%' "
											+" AND V.GCM_BUSINESS_FUNC_KEY          = :GCM_BUSINESS_FUNC_KEY "
											+ "#WHERE#"
											+ " FETCH FIRST :PERCENT PERCENT ROWS ONLY ";
		
		String QUERY_UPDATE_CODINGQA_ADDTOMYWORKLIST = "UPDATE GCM_PROJ_CONT_BUS_FUNC_VENDOR V SET V.GCM_USER_KEY = :GCM_LOGIN_USER_KEY, V.GCM_BUS_FUNC_STATUS = 'ASSIGNED', "
				                                     +" V.MODIFY_USERID = :MODIFY_USERID, GCM_BUS_FUNC_STATUS_DT = SYSDATE, MODIFY_DATE_TIME = SYSDATE, ASSIGNED_DATE_TIME = SYSDATE, "
				                                     +" WORK_LIST_ACTIVITY_KEY = PKG_UTIL.FNC_GUID()"
				                                     +"WHERE V.GCM_PROJ_CONTENT_BARCODE IN "
				                                 	 +" (SELECT REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) "  
				            						 +"	FROM DUAL CONNECT BY REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) IS NOT NULL ) "
				                                     +" AND V.GCM_BUSINESS_FUNC_KEY = :GCM_BUSINESS_FUNC_KEY "
				                                     +" AND V.WORK_LIST_PARENT_ACTIVITY_KEY IS NULL AND GCM_BUS_FUNC_STATUS = 'CREATED' "
				                                     + " AND V.GCM_HP_KEY IN ( SELECT gcm_hp_key "
													 + " FROM GCM_GROUP_CLIENT_HP_VW "
													 + " WHERE gcm_group_key IN "
													 + "( SELECT gcm_group_key FROM GCM_USER_VENDOR_GROUP_VW WHERE gcm_user_key = :GCM_LOGIN_USER_KEY )) " ;
		
		String QUERY_UPDATE_CODINGQA_RELEASETOASSIGN = "pkg_comm_assignment.prc_release_assignment" ;
		
		String QUERY_ENCOUNTER_DX = 	"select * from table("
											+ "pkg_comm_qa.fnc_qa_work_item"
											+ "( p_user_key     => :p_user_key,"
											+ " p_group_key     => :p_group_key,"
											+ " p_proj_key      => :p_proj_key,"
											+ " p_content_key   => :p_content_key,"
											+ " p_ven_key       => :p_ven_key ))"
											+ " order by GCM_ENCOUNTER_KEY, RECORD_LEVEL desc";
		String QUERY_COMPLETED_CODING_QA_ENCOUNTER_DX = "select * from table("
				+ "    pkg_comm_qa.fnc_qa_completed"
				+ "      ( p_user_key      => :p_user_key,"
				+ "        p_group_key     => :p_group_key,"
				+ "        p_proj_key      => :p_proj_key,"
				+ "        p_content_key   => :p_content_key,"
				+ "        p_ven_key       => :p_ven_key ))"
				+ "  order by GCM_ENCOUNTER_KEY, RECORD_LEVEL desc";
		
		String SAVE_CODING_QA_RESULTS_PROC 		= 	"PKG_COMM_QA.PRC_SAVE";
		
		String ACCEPT_CODING_QA_RESULTS_PROC 	= 	"PKG_COMM_QA.PRC_ACCEPT";
		
		 String QUERY_OPTUM_CODING_UNASSIGNED_INVENTORY ="SELECT count(*) CNT, PV.* " + 
				"FROM" + 
				"  (SELECT V.GCM_HP_PRODUCT," + 
				"    V.GCM_CONT_BUS_FUNC_INSTRUCTION," + 
				"    (SELECT HP_CD FROM GCM_HP H WHERE H.GCM_HP_KEY = V.GCM_HP_KEY" + 
				"    ) AS HP_CD," + 
				"    (SELECT GCM_CLIENT_CD C" + 
				"    FROM GCM_CLIENT C," + 
				"      GCM_HP H1" + 
				"    WHERE C.GCM_CLIENT_KEY = H1.GCM_CLIENT_KEY" + 
				"    AND H1.GCM_HP_KEY      = V.GCM_HP_KEY" + 
				"    ) AS GCM_CLIENT_CD," + 
				"    (SELECT GCM_PROGRAM_NAME" + 
				"    FROM GCMC.GCM_PROGRAM_LIST PL" + 
				"    WHERE PL.GCM_PROGRAM_KEY = V.GCM_PROGRAM_KEY" + 
				"    ) AS GCM_PROGRAM_NAME," + 
				"    V.GCM_VENDOR_KEY" + 
				"  FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR V," + 
				"    GCM_PROJ_CONTENT PC" + 
				"  WHERE PC.GCM_PROJECT_CONTENT_KEY     = V.GCM_PROJECT_CONTENT_KEY" + 
				"  AND V.WORK_LIST_PARENT_ACTIVITY_KEY IS NULL" + 
				" AND V.GCM_PROJECT_YEAR =:GCM_PROJECT_YEAR "+
				"  AND V.GCM_HP_KEY                    IN" + 
				"    (SELECT gcm_hp_key" + 
				"    FROM GCM_GROUP_CLIENT_HP_VW" + 
				"    WHERE gcm_group_key IN" + 
				"      (SELECT GCM_GROUP_KEY" + 
				"      FROM GCM_USER_VENDOR_GROUP_VW" + 
				"      WHERE GCM_USER_KEY = :loginUserKey" + 
				"      )" + 
				"    )" + 
				"  AND V.GCM_VENDOR_KEY    = :GCM_VENDOR_KEY" + 
				" AND V.GCM_BUSINESS_FUNC_KEY =:GCM_BUSINESS_FUNC_KEY"+
				"  AND GCM_BUS_FUNC_STATUS = 'CREATED'   #where# " + 
				"  ) PV " + 
				" GROUP BY GCM_HP_PRODUCT," + 
				"  GCM_CLIENT_CD," + 
				"  GCM_VENDOR_KEY," + 
				"  GCM_PROGRAM_NAME," + 
				"  HP_CD," + 
				"  GCM_CONT_BUS_FUNC_INSTRUCTION ";
		 String QUERY_OPTUM_QA_UNASSIGNED_INVENTORY ="SELECT COUNT(*) CNT," + 
		 		"  PV.*" + 
		 		"FROM" + 
		 		"  (SELECT V.GCM_HP_PRODUCT," + 
		 		"    GP.PROV_GRP_NAME," + 
		 		"    (SELECT HP_CD FROM GCM_HP H WHERE H.GCM_HP_KEY = V.GCM_HP_KEY" + 
		 		"    ) AS HP_CD," + 
		 		"    (SELECT GCM_CLIENT_CD C" + 
		 		"    FROM GCM_CLIENT C," + 
		 		"      GCM_HP H1" + 
		 		"    WHERE C.GCM_CLIENT_KEY = H1.GCM_CLIENT_KEY" + 
		 		"    AND H1.GCM_HP_KEY      = V.GCM_HP_KEY" + 
		 		"    ) AS GCM_CLIENT_CD," + 
		 		"    (SELECT GCM_PROGRAM_NAME" + 
		 		"    FROM GCMC.GCM_PROGRAM_LIST PL" + 
		 		"    WHERE PL.GCM_PROGRAM_KEY = V.GCM_PROGRAM_KEY" + 
		 		"    ) AS GCM_PROGRAM_NAME," + 
		 		"    PC.PAGE_COUNT ," + 
		 		"    PC.CHART_SCORE_GROUP," + 
		 		"    V.GCM_VENDOR_KEY" + 
		 		"  FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR V," + 
		 		"    GCM_PROJ_CONTENT PC," + 
		 		"    GCM_PROVIDER GP" + 
		 		"  WHERE PC.GCM_PROJECT_CONTENT_KEY     = V.GCM_PROJECT_CONTENT_KEY" + 
		 		"  AND V.WORK_LIST_PARENT_ACTIVITY_KEY IS NULL" + 
		 		"  AND V.GCM_PROJECT_YEAR =:GCM_PROJECT_YEAR"+
		 		"  AND V.GCM_HP_KEY                    IN" + 
		 		"    (SELECT gcm_hp_key" + 
		 		"    FROM GCM_GROUP_CLIENT_HP_VW" + 
		 		"    WHERE gcm_group_key IN" + 
		 		"      (SELECT GCM_GROUP_KEY" + 
		 		"      FROM GCM_USER_VENDOR_GROUP_VW" + 
		 		"      WHERE GCM_USER_KEY = :loginUserKey" + 
		 		"      )" + 
		 		"    )" + 
		 		"  AND V.GCM_VENDOR_KEY        = :GCM_VENDOR_KEY" + 
		 		"  AND V.GCM_BUSINESS_FUNC_KEY =:GCM_BUSINESS_FUNC_KEY" + 
		 		"  AND GCM_BUS_FUNC_STATUS     = 'CREATED'" + 
		 		"  AND GP.GCM_PROVIDER_KEY     =V.GCM_PROVIDER_KEY  #where# " + 
		 		"  ) PV " + 
		 		" GROUP BY GCM_HP_PRODUCT," + 
		 		"  GCM_CLIENT_CD," + 
		 		"  GCM_VENDOR_KEY," + 
		 		"  GCM_PROGRAM_NAME," + 
		 		"  HP_CD," + 
		 		"  CHART_SCORE_GROUP," + 
		 		"  PROV_GRP_NAME," + 
		 		"  PAGE_COUNT";
		 
		 String FUNC_OPTUM_INVENTORY_SEARCH = " SELECT *" + 
		 		"  FROM TABLE(pkg_comm_assignment.fnc_search_list" + 
		 		"  ( p_user_key              => :userKey," + 
		 		"    p_userid                => :userId," + 
		 		"    p_group_key             => :groupKey," + 
		 		"    p_role_code             => :roleCode," + 
		 		"    p_business_func_key     => :busFuncKey," + 
		 		"    p_business_segment      => :busSegment," + 
		 		"    p_program_key           => :programKey," + 
		 		"    p_project_year          => :projYear," + 
		 		"    p_proj_key              => :projKey," + 
		 		"    p_client_key            => :clientKey," + 
		 		"    p_hp_key                => :hpKey," + 
		 		"    p_hp_product            => :hpProduct," + 
		 		"    p_chart_score_group     => :chartScoreGrp," + 
		 		"    p_prov_specialty_code   => :provSplCode," + 
		 		"    p_is_emr_sw             => :emr," + 
		 		"    p_coder_user_key       => :codingUserKey," + 
		 		"    p_date_from             => TO_DATE(:fromDate,'MM-dd-YYYY')," + 
		 		"    p_date_to               => TO_DATE(:toDate,'MM-dd-YYYY')," + 
		 		"    p_percentage            => :percentage," + 
		 		"    p_is_offshore           => :isOffshoreCoding," + 
		 		"    p_assigned_vendor_key   => :fromVendorKey," + 
		 		"    p_is_assigned           => :isAssigned," + 
		 		"    p_assigned_user_key     => :assignedUserKey ))";
		 
		 String FUNC_OPTUM_CODING_ASSIGN_VENDOR_SEARCH = " SELECT *" + 
		 		"  FROM TABLE(pkg_comm_assignment.fnc_assign_vendor" + 
		 		"  ( p_user_key              => :userKey," + 
		 		"    p_userid                => :userId," + 
		 		"    p_group_key             => :groupKey," + 
		 		"    p_role_code             => :roleCode," + 
		 		"    p_business_func_key     => :busFuncKey," + 
		 		"    p_business_segment      => :busSegment," + 
		 		"    p_program_key           => :programKey," + 
		 		"    p_project_year          => :projYear," + 
		 		"    p_proj_key              => :projKey," + 
		 		"    p_client_key            => :clientKey," + 
		 		"    p_hp_key                => :hpKey," + 
		 		"    p_hp_product            => :hpProduct," + 
		 		"    p_chart_score_group     => :chartScoreGrp," + 
		 		"    p_prov_specialty_code   => :provSplCode," + 
		 		"    p_is_emr_sw             => :emr," + 
		 		"    p_coder_user_key        => :codingUserKey," + 
		 		"	 p_date_from             => TO_DATE(:fromDate,'MM-dd-YYYY')," + 
		 		"    p_date_to               => TO_DATE(:toDate,'MM-dd-YYYY')," + 
		 		"    p_percentage            => :percentage," + 
		 		"    p_is_offshore           => :isOffshoreCoding," + 
		 		"    p_assigned_vendor_key   => :fromVendorKey," + 
		 		"    p_is_assigned           => :isAssigned," + 
		 		"    p_assigned_user_key     => :assignedUserKey," + 
		 		"    p_search_list           => :searchList ))";
				
				
		String QUERY_TO_CHECK_CLOSED_PROJS = "SELECT PC.GCM_PROJ_CONTENT_BARCODE FROM GCM_PROJECT P, GCM_PROJ_CONTENT PC WHERE P.GCM_PROJ_KEY=PC.GCM_PROJ_KEY "
			+ " AND PC.GCM_PROJ_CONTENT_BARCODE IN (SELECT REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) "
			+ "	FROM DUAL CONNECT BY REGEXP_SUBSTR (:CHARTIDS,'[^,]+',1,LEVEL) IS NOT NULL) AND P.PROJECT_STATUS LIKE 'CLS%' ";
}
