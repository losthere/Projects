package com.optum.gcm.dao.constants;

public interface MasterDataQueries {
	String QUERY_GET_BUSINESS_SEGMENTS = "select distinct BSP.GCM_BUSINESS_SEGMENT KEY, BSL.GCM_BUSINESS_SEGMENT_DESC VALUE from GCM_BUS_SEGMENT_PROGRAM BSP, GCM_BUSINESS_SEGMENT_LIST BSL where "
			+ " bsp.GCM_BUSINESS_SEGMENT = BSL.GCM_BUSINESS_SEGMENT ORDER BY BSL.GCM_BUSINESS_SEGMENT_DESC ASC ";

	String QUERY_GET_BUSINESS_SEGMENTS_BY_USER_ASSOCIATION = "SELECT DISTINCT gcm_business_segment KEY,gcm_business_segment_desc VALUE FROM gcm_hp_bus_func_user_vw "
			+ " WHERE gcm_user_key  = :USER_KEY ORDER BY gcm_business_segment ";
	
	String QUERY_GET_BUSINESS_SEGMENTS_BY_USER = "select distinct BSP.GCM_BUSINESS_SEGMENT KEY, BSL.GCM_BUSINESS_SEGMENT_DESC VALUE from GCM_BUS_SEGMENT_PROGRAM BSP, GCM_BUSINESS_SEGMENT_LIST BSL where "
			+ " bsp.GCM_BUSINESS_SEGMENT = BSL.GCM_BUSINESS_SEGMENT AND BSL.GCM_BUSINESS_SEGMENT_DESC IN (SELECT GCM_SKILL_NAME FROM GCM_USER_SKILL US, GCM_USER U WHERE US.GCM_SKILL_TYPE_KEY = 4 "
			+ "AND US.GCM_USER_KEY = U.GCM_USER_KEY AND U.USERID = :USERID)";

	String QUERY_GET_PROGRAMS_BY_BUSINESS_SEGMENT = "SELECT DISTINCT GPL.GCM_PARENT_PROGRAM_KEY KEY, GPL.GCM_PROGRAM_DISPLAY_NAME VALUE FROM GCM_BUS_SEGMENT_PROGRAM GPSP, "
			+ "GCM_PROGRAM_LIST GPL WHERE gpsp.GCM_BUSINESS_SEGMENT  = :GCM_BUSINESS_SEGMENT AND gpsp.gcm_program_key = gpl.gcm_program_key ORDER BY GPL.GCM_PROGRAM_DISPLAY_NAME ASC ";

	String QUERY_GET_PROGRAMS_BY_BUS_SEG_AND_USR_ASSOCIATION = "SELECT DISTINCT gcm_program_key KEY,gcm_program_desc VALUE FROM gcm_hp_bus_func_user_vw  "
			+ " WHERE gcm_user_key      = :USER_KEY AND gcm_business_segment  = :BUSINESS_SEGMENT ORDER BY gcm_program_key ";

	
	
	String QUERY_GET_PROJ_YEARS_BY_BUSINESS_SEGMENT_AND_PROGRAM = "SELECT DISTINCT GCM_PROJECT_YEAR From GCM_PROJ_YEAR_LIST WHERE (GCM_PROGRAM_KEY IN "
			+ "(SELECT GCM_PROGRAM_KEY FROM GCM_PROGRAM_LIST WHERE GCM_PARENT_PROGRAM_KEY = :GCM_PROGRAM_KEY) OR :GCM_PROGRAM_KEY  IS NULL) AND "
			+ "(GCM_BUSINESS_SEGMENT=:GCM_BUSINESS_SEGMENT OR :GCM_BUSINESS_SEGMENT IS NULL) ORDER BY GCM_PROJECT_YEAR DESC";
	
	String QUERY_GET_CHART_SCORE_GROUP = "SELECT DISTINCT CHART_SCORE_GROUP FROM GCM_CHART_SCORE_GROUP_LIST ";
		
	String QUERY_GET_PROV_SPEC_CODES="SELECT DISTINCT PROV_SPECIALITY_CODE KEY, PROV_SPECIALITY VALUE FROM GCM_PROV_SPECIALITY ORDER BY PROV_SPECIALITY ASC ";
	
	String QUERY_GET_STATES = "SELECT STATE_CD KEY, STATE_NAME VALUE FROM GCM_US_STATE WHERE STATE_CD <> 'NA' order by STATE_NAME";

	String QUERY_GET_VENDORS = "SELECT DISTINCT GV.GCM_VENDOR_KEY KEY, GV.VENDOR_NAME VALUE FROM GCM_HP_PRG_PRODUCT HPP, GCM_HP_VENDOR_BUS_FUNC VBF, GCM_VENDOR GV WHERE HPP.GCM_HP_KEY = VBF.GCM_HP_KEY AND "
			+ "GV.GCM_VENDOR_STATUS = 'LISTED' AND (VBF.GCM_HP_PRODUCT IS NULL OR HPP.GCM_HP_PRODUCT = VBF.GCM_HP_PRODUCT) AND VBF.GCM_VENDOR_KEY = GV.GCM_VENDOR_KEY AND "
			+ "HPP.GCM_BUSINESS_SEGMENT = VBF.GCM_BUSINESS_SEGMENT AND HPP.GCM_BUSINESS_SEGMENT = :GCM_BUSINESS_SEGMENT AND VBF.GCM_BUSINESS_FUNC_KEY = :GCM_BUSINESS_FUNC_KEY "
			+ "AND (:GCM_PROGRAM_KEY IS NULL OR VBF.GCM_PROGRAM_KEY = :GCM_PROGRAM_KEY) AND (:GCM_HP_KEY IS NULL OR VBF.GCM_HP_KEY = :GCM_HP_KEY)";
	
	String QUERY_GET_VENDORS_BY_USER_ROLE_ASSOCIATION = "SELECT DISTINCT GV.GCM_VENDOR_KEY KEY, GV.VENDOR_NAME VALUE FROM GCM_USER_ROLE UR, GCM_VENDOR GV, GCM_USER GU WHERE UR.GCM_VENDOR_KEY=GV.GCM_VENDOR_KEY " + 
			" AND GV.GCM_GROUP_KEY=:GCM_GROUP_KEY AND GU.GCM_USER_KEY=UR.GCM_USER_KEY AND GU.GCM_USER_KEY= :GCM_USER_KEY AND UR.GCM_ROLE_CODE= :GCM_ROLE_CODE AND  GV.IS_REAL_SW = 'Y' AND GCM_VENDOR_STATUS ='LISTED' ORDER BY VENDOR_NAME ";
			
			
	String QUERY_GET_VENDORS_BY_USER_ASSOCIATION = "SELECT DISTINCT gcm_vendor_key KEY,vendor_name VALUE FROM gcm_hp_bus_func_user_vw   WHERE gcm_user_key      =:USER_KEY  #WHERE# ORDER BY vendor_name ";
		
	
String QUERY_GET_VENDORS_LIST_DETAILS=" WITH W_VENDOR_sup AS" + 
			" (SELECT GUV.GCM_VENDOR_KEY, GV.VENDOR_NAME " + 
			"   FROM GCM_USER_VENDOR GUV," + 
			"        GCM_USER_ROLE GUR," + 
			"        GCM_VENDOR GV" + 
			"  WHERE GUV.GCM_VENDOR_KEY = GUR.GCM_VENDOR_KEY" + 
			"    AND GUV.GCM_USER_KEY = GUR.GCM_USER_KEY" + 
			"    AND GV.GCM_VENDOR_KEY = GUV.GCM_VENDOR_KEY" + 
			"    AND GUV.GCM_USER_KEY =:GCM_SUPERVISOR_USER_KEY" + 
			"    AND GUR.GCM_ROLE_CODE =:GCM_ROLE_CODE" +
			" AND GV.GCM_GROUP_KEY =:GCM_GROUP_KEY "+ 
			"    AND GUV.IS_ACTIVE_SW= 'Y'  AND GUR.IS_ACTIVE_SW='Y')," + 
			" W_VENDOR_REPP AS" + 
			" (SELECT GUV.GCM_VENDOR_KEY, GV.VENDOR_NAME " + 
			"   FROM GCM_USER_VENDOR GUV," + 
			"        GCM_VENDOR GV" + 
			"  WHERE GV.GCM_VENDOR_KEY = GUV.GCM_VENDOR_KEY" + 
			"    AND GUV.GCM_USER_KEY =:GCM_USER_KEY    " + 
			"    AND GUV.IS_ACTIVE_SW= 'Y')" + 
			" SELECT DISTINCT GUV.GCM_VENDOR_KEY," + 
			"       (CASE WHEN GUV.GCM_VENDOR_KEY = WL.GCM_VENDOR_KEY THEN 'Y' ELSE 'N' END) IS_ACTIVE_SW," + 
			"       GUV.VENDOR_NAME " + 
			"  FROM W_VENDOR_sup GUV," + 
			"       W_VENDOR_repp WL" + 
			" WHERE GUV.GCM_VENDOR_KEY = WL.GCM_VENDOR_KEY (+) ORDER BY VENDOR_NAME " ;

	String QUERY_GET_VENDOR_LIST_FOR_OCUA = "SELECT " + 
			"    GV.GCM_VENDOR_KEY, " + 
			"    CASE " + 
			"        WHEN EXISTS " + 
			"          ( SELECT NULL " + 
			"              FROM GCM_USER_VENDOR GUV  " + 
			"             WHERE GV.GCM_VENDOR_KEY = GUV.GCM_VENDOR_KEY " + 
			"               AND GUV.GCM_USER_KEY =:GCM_USER_KEY " + 
			"               AND GUV.IS_ACTIVE_SW = 'Y' ) " + 
			"        THEN 'Y' " + 
			"        ELSE 'N' " + 
			"    END AS IS_ACTIVE_SW, " + 
			"    GV.VENDOR_NAME " + 
			"  FROM GCM_VENDOR GV " + 
			"WHERE GV.GCM_GROUP_KEY =:GCM_GROUP_KEY " + 
			"   AND GV.GCM_VENDOR_STATUS = 'LISTED' ";
	
	String QUERY_GET_CLIENTS = "SELECT GCM_CLIENT_CD VALUE, GCM_CLIENT_KEY KEY FROM GCM_CLIENT CL  WHERE  EXISTS (SELECT GCM_CLIENT_KEY FROM "
			+ "GCM_HP HP WHERE HP.GCM_CLIENT_KEY = CL.GCM_CLIENT_KEY AND HP.GCM_HP_ACTIVE_FLAG = 'Y' )  AND CL.GCM_GROUP_KEY  in  (SELECT gcm_group_key FROM GCM_USER_VENDOR_GROUP_VW WHERE gcm_user_key = :GCM_LOGIN_USER_KEY) ORDER BY GCM_CLIENT_CD";

	String QUERY_GET_CLIENTS_BY_USER_ASSOCIATION = "SELECT DISTINCT gcm_client_key KEY,gcm_client_desc VALUE FROM gcm_hp_bus_func_user_vw "
			+ " WHERE gcm_user_key        =:USER_KEY  ORDER BY gcm_client_desc ";

	
	String QUERY_GET_HP_BY_BUSINESS_SEGMENT_AND_CLIENT = "SELECT DISTINCT VW.GCM_HP_KEY KEY, VW.HP_DESC VALUE FROM GCM_HP_PROG_PROD_BUSFUN_VW VW WHERE "
			+ " VW.GCM_CLIENT_KEY=:GCM_CLIENT_KEY ";
	
	String QUERY_GET_HP_BY_CLIENT_USER_ASSOCIATION = " SELECT DISTINCT gcm_hp_key KEY,hp_desc VALUE FROM gcm_hp_bus_func_user_vw  "
			+ " WHERE gcm_user_key      =:USER_KEY  AND GCM_CLIENT_KEY = :CLIENT_KEY ORDER BY hp_desc ";
	
	String QUERY_GET_HP_BY_BUS_SEG_USER_ASSOCIATION = "SELECT DISTINCT gcm_hp_key KEY,hp_desc VALUE FROM gcm_hp_bus_func_user_vw  "
			+ " WHERE gcm_user_key      =:USER_KEY  AND gcm_business_segment  = :BUSINESS_SEGMENT  AND GCM_CLIENT_KEY = :CLIENT_KEY ORDER BY hp_desc ";
	
	String QUERY_GET_USERS_AND_COUNT = "SELECT DISTINCT GU.GCM_USER_KEY KEY,  (GU.LAST_NAME  || ', '  || GU.FIRST_NAME "
			+ " || ' (' 	  || COUNT(RW.GCM_USER_KEY)   ||')') VALUE 	FROM GCM_USER GU, GCM_USER_VENDOR GUV,	  GCM_RET_WI RW, GCM_USER_ROLE GUR,	  GCM_VENDOR_GROUP_ASSN VGA "
			+ " WHERE GU.IS_ACTIVE_SW       ='Y' and GUR.IS_ACTIVE_SW  ='Y' and GUR.GCM_USER_KEY= GU.GCM_USER_KEY "
			+ "  AND GUR.GCM_ROLE_CODE= :GCM_ROLE_CODE "
			+ "  AND GUV.GCM_VENDOR_KEY=VGA.GCM_VENDOR_KEY "
			+ "  AND VGA.GCM_GROUP_KEY       IN  (select GCM_GROUP_KEY from GCM_USER_VENDOR_GROUP_VW where GCM_USER_KEY = :GCM_LOGIN_USER_KEY) "
			+ "  AND GU.GCM_APPROVED_USER_KEY=:GCM_LOGIN_USER_KEY "
			+ "  AND GUV.GCM_USER_KEY=GU.GCM_USER_KEY AND RW.GCM_RET_APPT_KEY(+)     IS NULL "
			+ "  AND GUV.GCM_VENDOR_KEY =:GCM_VENDOR_KEY AND RW.GCM_USER_KEY(+) = GU.GCM_USER_KEY "
			+ "  #BUS_FUNC_STATUS# "
			+ "  AND RW.GCM_BUS_FUNC_DETAIL_KEY(+)=:GCM_BUS_FUNC_DETAIL_KEY	GROUP BY GU.GCM_USER_KEY, "
			+ "  (GU.LAST_NAME  || ', '  || GU.FIRST_NAME) 	ORDER BY VALUE ASC ";
	String QUERY_GET_HP_PRODUCT_BY_HP = "SELECT DISTINCT GCM_HP_PRODUCT FROM GCM_HP_PROG_PROD_BUSFUN_VW WHERE "
			+ "GCM_HP_KEY = :GCM_HP_KEY ";
	
	String QUERY_GET_HP_PRD_BY_HP_USER_ASSOCIATION = "SELECT DISTINCT gcm_hp_product FROM gcm_hp_bus_func_user_vw "
			+ " WHERE gcm_user_key      =:USER_KEY  AND gcm_hp_key = :HP_KEY  ORDER BY gcm_hp_product ";
	
	String QUERY_GET_HP_PRD_BY_HP_BUS_SEG_USER_ASSOCIATION = " SELECT DISTINCT gcm_hp_product FROM gcm_hp_bus_func_user_vw  "
			+ " WHERE gcm_user_key      =:USER_KEY  AND gcm_business_segment  = :BUSINESS_SEGMENT  AND gcm_hp_key = :HP_KEY ORDER BY gcm_hp_product ";
	
	String QUERY_GET_PROV_DETAILS= "select * from table(pkg_comm_suggest.fnc_provider "+
  " 								( p_field_name    => :p_field_name, "+
    								" p_field_value   => :p_field_value, "+
    								" p_group_key     => :p_group_key )) " ;
	
	String QUERY_GET_PROJECTS_BUS_SEGMENT = "SELECT GCM_PROJ_KEY KEY ,  GCM_PROJ_NAME VALUE FROM GCM_PROJECT "
											+ " WHERE GCM_BUSINESS_SEGMENT= :GCM_BUSINESS_SEGMENT"
											+ " AND GCM_GROUP_KEY IN" 
											+ "  (SELECT GCM_GROUP_KEY" 
											+ "  FROM GCM_USER_VENDOR_GROUP_VW"
											+ "  WHERE GCM_USER_KEY = :GCM_LOGIN_USER_KEY"
											+ "    AND GCM_VENDOR_KEY IN"  
											+ "          ( SELECT GCM_VENDOR_KEY"
											+ "              FROM GCM_VENDOR"
											+ "             WHERE GCM_GROUP_KEY = :GCM_GROUP_KEY1 )"
											+ "  )"
											+ " AND RETRIEVAL_VENDOR_KEY IN (" 
											+ "  SELECT GCM_VENDOR_KEY"
											+ "    FROM GCM_VENDOR"
											+ "   WHERE GCM_GROUP_KEY = :GCM_GROUP_KEY2"
											+ " )" 
											+ " ORDER BY GCM_PROJ_NAME";
	String QUERY_GET_PROJECTS_WITH_BUS_SEGMENT = "SELECT GCM_BUSINESS_SEGMENT, GCM_PROJ_KEY KEY ,GCM_PROJ_NAME VALUE FROM GCM_PROJECT WHERE GCM_GROUP_KEY IN  (select GCM_GROUP_KEY from GCM_USER_VENDOR_GROUP_VW where GCM_USER_KEY = :GCM_LOGIN_USER_KEY) ORDER BY GCM_PROJ_NAME  ";
	
	String QUERY_GET_STATUS_BY_BUSINESS_FUNCTION = "SELECT GCM_BUS_FUNC_STATUS KEY, BUS_FUNC_STATUS_DESCRIPTION VALUE FROM GCM_BUS_FUNC_STATUS STATUS WHERE "
			+ "STATUS.GCM_BUSINESS_FUNC_KEY = :GCM_BUSINESS_FUNC_KEY AND GCM_BUS_FUNC_STATUS <> 'SENT' ORDER BY GCM_BUS_FUNC_STATUS";
	
	String QUERY_GET_STATUS_FOR_RET = "SELECT STATUSWF.GCM_BUS_FUNC_STATUS KEY, STATUS.BUS_FUNC_STATUS_DESCRIPTION VALUE FROM GCM_BUS_FUNC_STATUS_WORK_FLOW STATUSWF,GCM_BUS_FUNC_STATUS STATUS " + 
			"WHERE STATUS.GCM_BUSINESS_FUNC_KEY = :GCM_BUSINESS_FUNC_KEY aND STATUSWF.GCM_BUS_FUNC_STATUS = STATUS.GCM_BUS_FUNC_STATUS"
			+ " AND STATUSWF.GCM_BUS_FUNC_STATUS NOT IN  ('SENT', 'INITIAL', 'DATACOLLSENT')"
			+ " AND WORK_FLOW = :WORK_FLOW"
			+ "  ORDER BY STATUSWF.GCM_BUS_FUNC_STATUS ASC ";

	String QUERY_GET_USERS_BY_ROLE_VENDOR = "SELECT DISTINCT GU.GCM_USER_KEY KEY,(GU.LAST_NAME || ', ' || GU.FIRST_NAME)  VALUE"
			+ " FROM GCM_USER GU,GCM_USER_ROLE GUR,GCM_VENDOR_GROUP_ASSN VGA  "
			+ " WHERE GU.GCM_USER_KEY=GUR.GCM_USER_KEY AND GUR.GCM_ROLE_CODE=:GCM_ROLE_CODE AND GUR.GCM_VENDOR_KEY=:GCM_VENDOR_KEY AND VGA.GCM_VENDOR_KEY=GUR.GCM_VENDOR_KEY "
			+ " AND GU.IS_ACTIVE_SW='Y' AND GUR.IS_ACTIVE_SW='Y' AND VGA.GCM_GROUP_KEY IN  (select GCM_GROUP_KEY from GCM_USER_VENDOR_GROUP_VW where GCM_USER_KEY = :GCM_LOGIN_USER_KEY)  ";

	
	String QUERY_GET_USERS_BY_BUSFUNCDETAIL ="SELECT DISTINCT GU.GCM_USER_KEY KEY,  (GU.LAST_NAME  || ', '  || GU.FIRST_NAME) VALUE FROM  "+
													" GCM_USER GU,GCM_USER_ROLE GUR, GCM_USER_VENDOR_GROUP_VW UV "+
										" WHERE GU.GCM_USER_KEY=GUR.GCM_USER_KEY AND GUR.GCM_ROLE_CODE  IN (:GCM_ROLE_CODE) AND "+
										" UV.GCM_USER_KEY=GU.GCM_USER_KEY AND UV.GCM_GROUP_KEY IN  "+
										" (SELECT GCM_GROUP_KEY from GCM_USER_VENDOR_GROUP_VW WHERE GCM_USER_KEY =:LOGIN_USER_KEY)  ORDER BY value "; 
	
	
	String QUERY_GET_CODING_SUPERVISORS_FOR_VENDOR = "SELECT *      "
			  +"FROM TABLE(pkg_comm_worklist.fnc_csp_user    "
			  +"( p_user_key              => :GCM_USER_KEY , "
			  +"  p_userid                => :USERID,        "
			  +"  p_group_key             => :GCM_GROUP_KEY, "
			  +"  p_vendor_key            => :GCM_VENDOR_KEY,"
			  +"  p_role_code             => :GCM_ROLE_CODE))";
	
	String QUERY_GET_SUPERVISORS_FOR_VENDOR = "SELECT *      "
			  +"FROM TABLE(PKG_COMM_USER_ADMIN.FNC_SUP_USER    "
			  +"( p_user_key              => :GCM_USER_KEY , "
			  +"  p_userid                => :USERID,        "
			  +"  p_group_key             => :GCM_GROUP_KEY, "
			  +"  p_vendor_key            => :GCM_VENDOR_KEY,"
			  +"  p_role_code             => :GCM_ROLE_CODE))";
	
	String QUERY_GET_ROLES_BY_GROUP_VENDOR = "SELECT *      "
			  +"FROM TABLE(PKG_COMM_USER_ADMIN.FNC_ROLE    "
			  +"( p_user_key              => :GCM_USER_KEY , "
			  +"  p_userid                => :USERID,        "
			  +"  p_group_key             => :GCM_GROUP_KEY, "
			  +"  p_vendor_key            => :GCM_VENDOR_KEY,"
			  +"  p_role_code             => :GCM_ROLE_CODE)) where gcm_role_code != 'OCUA' ";
	
	
	String QUERY_GET_USERS_BY_SUPERVISOR = "SELECT * "
			+"  FROM TABLE(pkg_comm_assignment.fnc_assign_user"
			+"  ( p_user_key              => :userKey,"
			+"    p_userid                => :userId,"
			+"    p_group_key             => :groupKey,"
			+"    p_role_code             => :roleCode,"
			+"    p_business_func_key     => :busFuncKey,"
			+"    p_assigned_vendor_key   => :vendorKey,"
			+"    p_approved_user_key     => :approvedUserKey ))";

	String QUERY_GET_REASONCODES = "SELECT GCM_REASON_CODE KEY, GCM_REASON_DESC VALUE from gcm_reason "
			+ "where GCM_BUSINESS_FUNC_KEY = :GCM_BUSINESS_FUNC_KEY AND GCM_REASON_TYPE = :GCM_REASON_TYPE ";
	
	String QUERY_GET_PROJECTS_USER_KEY = "SELECT GCM_PROJ_KEY KEY, GCM_PROJ_NAME VALUE FROM GCM_PROJECT "
			+ " WHERE GCM_GROUP_KEY IN (SELECT GCM_GROUP_KEY FROM GCM_USER_VENDOR_GROUP_VW "
			+ " WHERE GCM_USER_KEY = :GCM_LOGIN_USER_KEY) ORDER BY GCM_PROJ_NAME";
	
	String FUNC_GET_PROJ_BY_USER="select * from table(pkg_comm_sup_dashboard.fnc_project(p_user_key => :loginUserKey, p_userid => :userId, p_group_key => :groupKey, p_vendor_key => :vendor, p_role_code => :roleCode, p_region => :region))";
	
	String FUNC_GET_PROJ_BY_FILTER = "SELECT * " + 
	"  FROM TABLE(pkg_comm_assignment.fnc_project" + 
	"  ( p_user_key              => :userKey," + 
	"    p_userid                => :userId," + 
	"    p_group_key             => :groupKey," + 
	"    p_role_code             => :roleCode," + 
	"    p_business_func_key     => :busFuncKey," + 
	"    p_business_segment      => :busSegment," + 
	"    p_project_year          => :projYear ))";
	
	String FUNC_GET_PROJ_BY_FILTER_FOR_UTILITY = "SELECT * " + 
	"  FROM TABLE(pkg_comm_search.fnc_project" + 
	"  ( p_group_key             => :groupKey," + 
	"    p_user_key              => :userKey," + 
	"    p_vendor_key            => :vendorKey," + 
	"    p_role_code             => :roleCode," + 
	"    p_business_segment      => :busSegment, " +
    "	 p_region				 => :region))";
	
	String FUNC_GET_VENDOR_BY_INV_FILTER = "SELECT *" + 
			"  FROM TABLE(pkg_comm_assignment.fnc_vendor" + 
			"  ( p_user_key              => :userKey," + 
			"    p_userid                => :userId," + 
			"    p_group_key             => :groupKey," + 
			"    p_role_code             => :roleCode," + 
			"    p_business_func_key     => :busFuncKey))";
	
	String QUERY_GET_ROLES = "SELECT GCM_ROLE_CODE, GCM_ROLE_NAME FROM GCM_ROLE_LIST WHERE IS_ACTIVE_SW = 'Y'";
	
	String QUERY_GET_CHART_STATUS = "SELECT DISTINCT GCM_BUS_FUNC_STATUS KEY ," + 
			"  BUS_FUNC_STATUS_DESCRIPTION VALUE    " + 
			"  FROM GCM_BUS_FUNC_STATUS " + 
			"  WHERE GCM_BUSINESS_FUNC_KEY IN (2, 4 ,6,7) " + 
			"  AND GCM_BUS_FUNC_STATUS  NOT IN ('CREATED','INITIAL','DATACOLLSENT','STAGED','REQACK','SENT','CNAFINAL','EXTRATOVEN','INACTIVATED','PNP','PNPFINAL','PNPRELEASE')" +
			"  ORDER BY GCM_BUS_FUNC_STATUS";
	
	String QUERY_GET_SUBTYPES = "SELECT *" +
			" FROM GCM_BUSINESS_FUNCTION_DETAIL " + 
			"WHERE GCM_BUSINESS_FUNC_KEY = :GCM_BUSINESS_FUNC_KEY ";
	
	String QUERY_SERVICE_CONFIGURED = "SELECT COUNT(1) AS COUNT FROM GCM_GROUP_CONFIGURATION"
			+ " WHERE GCM_BUS_FUNC_CONFIG_TYPE = :SERVICE_NAME "
			+ " AND GCM_GROUP_KEY = :GCM_GROUP_KEY AND IS_ACTIVE_SW = 'Y'";
	
	String QUERY_BUS_FUNC_CONFIGURED = "SELECT * FROM TABLE (pkg_comm_common.fnc_user_config_region " + 
			"  ( p_user_key   => :p_user_key," + 
			"    p_userid     => :p_userid," + 
			"    p_group_key  => :p_group_key," + 
			"    p_vendor_key => :p_vendor_key," + 
			"    p_role_code  => :p_role_code," + 
			"    p_business_func_key => :p_business_func_key," + 
			"    p_config_type  => :p_config_type," + 
			"    p_config_value => :p_config_value," +
			"	 p_match_type => :p_match_type ))";
			
	String GET_VENDORS_USER_PROFILE = "select ven.gcm_vendor_key key, ven.vendor_name value from gcm_vendor ven join gcm_user_vendor uv on ven.gcm_vendor_key = uv.gcm_vendor_key  where ven.GCM_GROUP_KEY = :GCM_GROUP_KEY  and uv.GCM_USER_KEY = :GCM_USER_KEY  and IS_ACTIVE_SW ='Y' order by vendor_name";
	
	String GET_GROUPS_BY_USER_KEY = "SELECT GCM_GROUP_KEY AS KEY,GCM_GROUP_NAME AS VALUE FROM GCM_GROUP";
	
	String IS_USER_HAS_ACCESS_TO_GROUPS = "SELECT COUNT(*) AS COUNT FROM GCM_USER_ROLE WHERE GCM_USER_KEY = :GCM_USER_KEY AND GCM_ROLE_CODE = 'OCUA'";
	
	String GET_VENDORS_BY_GROUP = "select ven.gcm_vendor_key key, ven.vendor_name value from gcm_vendor ven where ven.GCM_GROUP_KEY = :GCM_GROUP_KEY  and ven.IS_REAL_SW = 'Y' AND GCM_VENDOR_STATUS ='LISTED' ORDER BY VENDOR_NAME";
}
