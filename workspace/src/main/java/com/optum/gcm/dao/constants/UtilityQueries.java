package com.optum.gcm.dao.constants;

public interface UtilityQueries {

	String QUERY_GET_PROJECT_LIST = "SELECT f.failure_count," + 
			"       f.success_count," + 
			"       f.total_count," + 
			"       f.file_name," + 
			"       p.gcm_business_segment," + 
			"       p.gcm_proj_name," + 
			"       p.gcm_proj_key," + 
			"       f.gcm_chase_file_key," + 
			"       p.gcm_project_year," + 
			"       to_char(f.create_date_time,'YYYY-MM-DD HH24:MI:SS') AS create_date_time," + 
			"       f.data_coll_status," + 
			"       f.process_sts_key," + 
			"       gr.is_internal_group AS is_optum_retrieval," + 
			"       gc.is_internal_group AS is_optum_coding" + 
			"  FROM gcm_chase_file f," + 
			"       gcm_project p," + 
			"       gcm_vendor vr," + 
			"       gcm_group gr," + 
			"       gcm_vendor vc," + 
			"       gcm_group gc" +
			" WHERE f.gcm_proj_key = p.gcm_proj_key(+)" + 
			"   AND p.retrieval_vendor_key = vr.gcm_vendor_key(+)" + 
			"   AND vr.gcm_group_key = gr.gcm_group_key(+)" + 
			"   AND p.retrieval_vendor_key = vc.gcm_vendor_key(+)" + 
			"   AND vc.gcm_group_key = gc.gcm_group_key(+)" + 
			"   AND f.data_coll_status = 'INITIAL'" + 
			"   AND f.gcm_group_key = :GCM_GROUP_KEY" + 
			"   AND p.region = :REGION " +
			"   AND f.process_sts_key IN (4, 6, 21)";
	
	String QUERY_GET_PROJECTS_FORCLOSE = "SELECT p.gcm_proj_key, " 
									+"  p.gcm_proj_name, " 
									+"  p.GCM_PROJECT_YEAR, " 
									+"  p.GCM_BUSINESS_SEGMENT, " 
									+"  COUNT(*) AS rec_count " 
									+"FROM gcm_project p, " 
									+"  gcm_proj_content pc " 
									+"WHERE pc.GCM_PROJ_KEY = p.GCM_PROJ_KEY " 
									+" AND p.GCM_GROUP_KEY = :GCM_GROUP_KEY "
									+"AND p.PROJECT_STATUS  = 'INPROGRESS' #WHERE# " 
									+"GROUP BY p.GCM_BUSINESS_SEGMENT, " 
									+"  p.GCM_PROJECT_YEAR, " 
									+"  p.gcm_proj_key, " 
									+"  p.gcm_proj_name " ;
			
	String QUERY_UPDATE_PROJECT_RELEASE = " UPDATE GCM_CHASE_FILE SET DATA_COLL_STATUS = 'RELEASED', "
										+ " MODIFY_DATE_TIME = SYSDATE, MODIFY_USERID =  :MODIFY_USERID  "
			 							+ " WHERE GCM_PROJ_KEY = :GCM_PROJ_KEY  "
			                             + " AND GCM_CHASE_FILE_KEY = :GCM_CHASE_FILE_KEY" ;
	
	String QUERY_UPDATE_PROJECT_DELETE = " UPDATE GCM_CHASE_FILE SET DATA_COLL_STATUS = 'DELETE', "
			+ " MODIFY_DATE_TIME = SYSDATE, MODIFY_USERID =  :MODIFY_USERID  "
				+ " WHERE (GCM_PROJ_KEY IS NULL OR GCM_PROJ_KEY = :GCM_PROJ_KEY) "
             + " AND GCM_CHASE_FILE_KEY = :GCM_CHASE_FILE_KEY" ;
	
	
	String FUNC_SEARCH_BY_MEMBER = "select * from " + "table(pkg_comm_search.fnc_search_by_member "
			+ "			( p_group_key           => :p_group_key, 		  p_user_key			=> :p_user_key, p_vendor_key  => :p_vendor_key,"
			+ "			  p_business_segment    => :p_business_segment, p_region  => :p_region,  p_proj_key			=> :p_proj_key,"
			+ "  		  p_hp_mbr_id 	=> :p_hp_mbr_id , p_mbr_last_name	=> :p_mbr_last_name, "
			+ "  		  p_mbr_first_name	=> :p_mbr_first_name,  p_mbr_gender	=> :p_mbr_gender, "
			+ "  		  p_mbr_dob		=> :p_mbr_dob, " 
			+ "   		  p_project_year => :p_project_year,"
			+ "           p_image_name => :p_image_name, "
			+ "    		  p_status => :p_status "
			+ "		    )	)";
	
	String FUNC_SEARCH_BY_PROVIDER = "select * from " + "table(pkg_comm_search.fnc_search_by_provider "
			+ "			( p_group_key           => :p_group_key, p_user_key			=> :p_user_key, p_vendor_key  => :p_vendor_key,"
			+ "			  p_business_segment    => :p_business_segment, p_region  => :p_region,  p_proj_key	=> :p_proj_key,"
			+ "  		  p_provider_id	=> :p_provider_id, p_prov_last_name	=> :p_prov_last_name, "
			+ "  		  p_prov_first_name	=> :p_prov_first_name, "  
			+ "  		  p_prov_grp_name => :p_prov_grp_name, " 
			+ "           p_project_year => :p_project_year,"
			+ "           p_image_name => :p_image_name, "
			+ "			  p_status => :p_status"	
			+ "		    ) )";
	
	String FUNC_SEARCH_BY_CLIENTID = "select * from " + "table(pkg_comm_search.fnc_search_by_client_id "
			+ "			( p_group_key   => :p_group_key, p_region  => :p_region,  p_user_key => :p_user_key,p_vendor_key  => :p_vendor_key,"
			+ "			  p_business_segment    => :p_business_segment,  p_proj_key => :p_proj_key,"
			+ "  		  p_client_internal_id  => :p_client_internal_id ,"
			+ "			  p_project_year => :p_project_year,"  
			+ "           p_image_name => :p_image_name, "
			+ "			  p_status => :p_status"
			+ "		    )" + "		)";
	
	String FUNC_SEARCH_BY_CHARTID = "select * from " + "table(pkg_comm_search.fnc_search_by_chart_id "
			+ "			(  p_group_key           => :p_group_key," 
			+ "		       p_user_key			 => :p_user_key,"
			+ "            p_vendor_key          => :p_vendor_key,"
			+ "			   p_business_segment    => :p_business_segment," 
			+ "			   p_region  			 => :p_region,"
			+ "		       p_proj_key			 => :p_proj_key,"
			+ "  		   p_chart_id            => :p_chart_id,"
			+ "           p_image_name => :p_image_name, "
			+ "            p_status              => :p_status,"
			+ "			   p_project_year => :p_project_year"
			+ "		       ))";
	
	
	String QUERY_UPDATE_PROJECT_CLOSING= "pkg_project_close.prc_close" ;
	
	
	String QUERY_UPDATE_SEARCHCHART_STATUS = "UPDATE GCM_PROJ_CONT_BUS_FUNC_VENDOR set GCM_BUS_FUNC_STATUS = :GCM_BUS_FUNC_STATUS, "
            + "MODIFY_USERID = :MODIFY_USERID, MODIFY_DATE_TIME = SYSDATE, GCM_BUS_FUNC_STATUS_DT = SYSDATE " 
            + " WHERE GCM_PROJ_CONT_BUS_FUNC_VEN_KEY = :GCM_PROJ_CONT_BUS_FUNC_VEN_KEY "
            + " AND GCM_PROJECT_CONTENT_KEY = :GCM_PROJECT_CONTENT_KEY "
            + " AND GCM_BUSINESS_FUNC_KEY = :GCM_BUSINESS_FUNC_KEY "
            + " AND GCM_PROJ_KEY = :GCM_PROJ_KEY ";
	
	String QUERY_UPDATE_SEARCHCHART_STATUS_FORRETWI = "UPDATE gcm_ret_wi set GCM_BUS_FUNC_STATUS = :GCM_BUS_FUNC_STATUS, "
            + "MODIFY_USERID = :MODIFY_USERID, MODIFY_DATE_TIME = SYSDATE, GCM_BUS_FUNC_STATUS_DT = SYSDATE,  " 
			+ "GCM_REASON_CODE = :GCM_REASON_CODE, GCM_REASON_COMMENT = :GCM_REASON_COMMENT, "
			+ " RFAX_SENT_STATUS = CASE WHEN (RFAX_SENT_STATUS IS NOT NULL AND CHART_FINDER_ID IS NOT NULL)  THEN 'CANCEL' "
			+ " 				   WHEN (RFAX_SENT_STATUS IS NOT NULL AND CHART_FINDER_ID IS NULL)  THEN 'CANCELED' "
			+ "					   ELSE NULL END "
            + " WHERE GCM_RET_WI_KEY = :GCM_RET_WI_KEY "
            + " AND GCM_PROJECT_CONTENT_KEY = :GCM_PROJECT_CONTENT_KEY "
            + " AND GCM_BUSINESS_FUNC_KEY = :GCM_BUSINESS_FUNC_KEY "
            + " AND GCM_PROJ_KEY = :GCM_PROJ_KEY "
            + " AND GCM_BUS_FUNC_STATUS NOT IN ('RECVD', 'NONRETRIEVABLE', 'CANCELED', 'DUPLICATE','CNA') ";
	
}