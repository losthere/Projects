package com.optum.gcm.dao.constants;

/**
 * @author gvadiv2
 *
 */
public interface ChartLoadQueryConstants {
  
  String PKG_CHART_LOAD$PRC_VALIDATE_CHARTS = "PKG_CHART_LOAD.PRC_VALIDATE_CHARTS";
  
  String PKG_CHART_LOAD$PRC_UPDATE_CHART_STATUS = "PKG_CHART_LOAD.PRC_UPDATE_CHART_STATUS";
 
  String QUERY_IMAGE_ATTRIBUTES_BY_BARCODE           =
      "SELECT gpc.gcm_proj_content_barcode, "
              + "  gm.mbr_first_name, "
              + "  gm.mbr_last_name, "
              + "  gm.glb_mbr_id, "
              + "  gm.mbr_dob, "
              + "  gpr.prov_grp_id, "
              + "  gpr.source_system_prov_id, "
              + "  gpr.prov_last_name, "
              + "  gpr.prov_first_name, "
              + "  ghp.hp_cd, "
              + "  gpc.gcm_hp_product, "
              + "  gpc.gcm_project_year, "
              + "  (SELECT gcm_program_name "
              + "  FROM gcm_program_list "
              + "  WHERE gcm_program_key = gpc.gcm_program_key "
              + "  ) gcm_program_name, "
              + "  gcmv.vendor_code, "
              + "  gpc.gcm_business_segment, "
              + "  gpc.mbr_ext_id,"
              + "  gpc.gcm_provider_key,"
              + "  gc.gcm_client_cd,"
	          + "  gpc.image_name file_name, "
	          + "  gc.gcm_group_key, "
	          + "  '0' as img_file_key "
	          + "FROM gcm_member gm, "
	          + "  gcm_proj_content gpc, "
	          + "  gcm_provider gpr, "
	          + "  gcm_vendor gcmv, "
	          + "  gcm_hp ghp, "
	          + "  gcm_client gc, "
	          + "  gcm_ret_wi rw " 
	          + "WHERE gpc.gcm_glb_member_key       = gm.gcm_glb_member_key "
	          + "AND gpc.gcm_provider_key         = gpr.gcm_provider_key "
	          + "AND rw.gcm_project_content_key  =  gpc.gcm_project_content_key "
	          + "AND rw.gcm_vendor_key = gcmv.gcm_vendor_key "
	          + "AND ghp.gcm_hp_key = gpc.gcm_hp_key "
	          + "AND ghp.gcm_client_key           = gc.gcm_client_key "
	          + "AND GPC.GCM_PROJ_CONTENT_BARCODE = :GCM_PROJ_CONTENT_BARCODE ";  
	          //+ "AND UPPER(TRIM(gpc.image_name)) = UPPER(TRIM(ip.file_name)) " 
	          //+ "AND IP.run_id                      = :RUN_ID "  
	          //+ "AND ip.process_status              = 'INPROGRESS' ";
  
  String QUERY_DOCUMENTUM_DOCUMENT = "gcm_document where object_name ='${BARCODE}' and a_content_type='${FORMAT}'";
  

}
