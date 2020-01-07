package com.optum.gcm.dao.constants;

/**
 * @author pmule
 *
 */

public interface EncounterQueries {
	
	String QUERY_GET_ENCOUNTERS = "SELECT GCM_ENCOUNTER_KEY, " 
								+"  GCM_PROJ_KEY, " 
								+"  GCM_PROJECT_CONTENT_KEY, " 
								+"  GCM_PROJ_CONTENT_BARCODE, " 
								+"  GCM_PROJ_CONT_BUS_FUNC_VEN_KEY, " 
								+"  GCM_BUSINESS_FUNC_KEY, " 
								+"  GCM_MOD_BUSINESS_FUNC_KEY, "
								+"  TO_CHAR(DOS_FROM_DT, 'mm-dd-yyyy') AS DOS_FROM_DT, " 
								+"  TO_CHAR(DOS_THRU_DT, 'mm-dd-yyyy') AS DOS_THRU_DT, " 
								+"  PAGE_NUMBER, " 
								+"  RETRIEVAL_PROV_FLAG, " 
								+"  PROV_NPI, " 
								+"  PROV_FIRST_NAME, " 
								+"  PROV_LAST_NAME, " 
								+"  GCM_EO_KEY " 
								+"FROM GCM_ENCOUNTER " 
								+"WHERE GCM_PROJECT_CONTENT_KEY = :GCM_PROJECT_CONTENT_KEY " 
								+"AND GCM_PROJ_KEY              = :GCM_PROJ_KEY" 
								+" AND GCM_BUSINESS_FUNC_KEY = :GCM_BUSINESS_FUNC_KEY "
								+" AND NVL(IS_INACTIVE_ENC_SW,'N') = 'N' ORDER BY MODIFY_DATE_TIME DESC";
	
	String QUERY_GET_ENCDXHCC  = "SELECT GCM_ENCOUNTER_KEY, " 
								+"  GCM_PROJ_KEY, " 
								+"  GCM_PROJECT_CONTENT_KEY, " 
								+"  GCM_PROJ_CONTENT_BARCODE, " 
								+"  GCM_PROJ_CONT_BUS_FUNC_VEN_KEY, " 
								+"  GCM_BUSINESS_FUNC_KEY, " 
								+"  DOS_FROM_DT, " 
								+"  DOS_THRU_DT, " 
								+"  PAGE_NUMBER, " 
								+"  RETRIEVAL_PROV_FLAG, " 
								+"  PROV_NPI, " 
								+"  PROV_FIRST_NAME, PROV_LAST_NAME, " 
								+"  GCM_EO_KEY_ENC, " 
								+"  GCM_ENC_DX_KEY, " 
								+"  ICD_DX_CD, " 
								+"  NVL(GCM_EO_KEY_DX, '') AS GCM_EO_KEY_DX, " 
								+"  SHORT_DESC, " 
								+"  GCM_HCC_MODEL_CAT_V22, " 
								+"  GCM_HCC_MODEL_CAT_V23, " 
								+"  GCM_HCC_MODEL_CAT_V24, " 
								+"  GCM_HCC_MODEL_CAT_RX, " 
								+"  GCM_HCC_MODEL_CAT_HHS "
								+"FROM GCM_ENC_DX_HCC_VW " 
								+"WHERE GCM_PROJECT_CONTENT_KEY = :GCM_PROJECT_CONTENT_KEY " 
								+"AND GCM_PROJ_KEY              = :GCM_PROJ_KEY " 
								+"AND GCM_ENCOUNTER_KEY         = :GCM_ENCOUNTER_KEY" ;
	
	String QUERY_DELETE_ENCDX  = " DELETE FROM GCM_ENCOUNTER_DX DX WHERE GCM_ENCOUNTER_KEY = :GCM_ENCOUNTER_KEY "
								+ " AND GCM_PROJ_KEY = :GCM_PROJ_KEY ";
					
	String QUERY_DELETE_ENC  = " DELETE FROM GCM_ENCOUNTER E WHERE GCM_ENCOUNTER_KEY = :GCM_ENCOUNTER_KEY "
								+ " AND GCM_PROJ_KEY = :GCM_PROJ_KEY AND GCM_PROJECT_CONTENT_KEY = :GCM_PROJECT_CONTENT_KEY ";
	
	String QUERY_DELETE_DX_BY_DXKEY = "DELETE FROM GCM_ENCOUNTER_DX DX WHERE GCM_ENCOUNTER_KEY = :GCM_ENCOUNTER_KEY "
								+ " AND GCM_PROJ_KEY = :GCM_PROJ_KEY AND GCM_ENC_DX_KEY IN ( :GCM_ENC_DX_KEY ) ";
	
	String QUERY_UPDATE_DX_BY_DXKEY = "UPDATE GCM_ENCOUNTER_DX SET ICD_DX_CD = :ICD_DX_CD, GCM_EO_KEY = :GCM_EO_KEY, "
									+ " MODIFY_USERID = :MODIFY_USERID, MODIFY_DATE_TIME = SYSDATE "
									+ " WHERE GCM_ENCOUNTER_KEY = :GCM_ENCOUNTER_KEY AND GCM_PROJ_KEY = :GCM_PROJ_KEY AND GCM_ENC_DX_KEY = :GCM_ENC_DX_KEY";
	
	String QUERY_UPDATE_ENC = "UPDATE GCM_ENCOUNTER SET DOS_FROM_DT = :DOS_FROM_DT, DOS_THRU_DT = :DOS_THRU_DT, PAGE_NUMBER = :PAGE_NUMBER, "
			+ "RETRIEVAL_PROV_FLAG = :RETRIEVAL_PROV_FLAG, PROV_FIRST_NAME = :PROV_FIRST_NAME, PROV_LAST_NAME = :PROV_LAST_NAME, "
			+ "PROV_NPI = :PROV_NPI, MODIFY_USERID = :MODIFY_USERID, MODIFY_DATE_TIME = SYSDATE "
			+ "WHERE GCM_ENCOUNTER_KEY = :GCM_ENCOUNTER_KEY AND GCM_PROJ_KEY = :GCM_PROJ_KEY AND GCM_PROJECT_CONTENT_KEY = :GCM_PROJECT_CONTENT_KEY";
	
	String QUERY_CHECK_IS_WORK_ITEM_ACITVE = "SELECT GCM_PROJ_CONT_BUS_FUNC_VEN_KEY FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR "
			+ "WHERE GCM_PROJ_CONT_BUS_FUNC_VEN_KEY = :GCM_PROJ_CONT_BUS_FUNC_VEN_KEY AND GCM_PROJ_KEY = :GCM_PROJ_KEY AND GCM_USER_KEY = :GCM_USER_KEY";
	
	String QUERY_DELETE_EO_KEY = "DELETE FROM GCM_ENC_EO WHERE GCM_ENCOUNTER_KEY = :GCM_ENCOUNTER_KEY";
	
	String QUERY_FETCH_EO_KEY = "SELECT GCM_EO_KEY FROM GCM_ENC_EO WHERE GCM_ENCOUNTER_KEY = :GCM_ENCOUNTER_KEY";
	
	String QUERY_FETCH_ENC_EO = "SELECT GCM_ENC_EO_KEY, "
								+ "GCM_ENCOUNTER_KEY, "
								+ "GCM_PROJ_KEY, "
								+ "GCM_EO_KEY "
								+ "FROM GCM_ENC_EO WHERE GCM_ENCOUNTER_KEY = :GCM_ENCOUNTER_KEY";
	
	String DELETE_ENC_EO_BY_EO_CD = "DELETE gcm_enc_eo "
			+ "WHERE "
			+ "    gcm_encounter_key =:gcm_encounter_key "
			+ "    AND gcm_proj_key =:gcm_proj_key "
			+ "    AND gcm_eo_key not in (:enc_eo_cds) ";
	
	String INSERT_ENC_EO_BY_EO_CD = "INSERT INTO gcm_enc_eo " + 
			"  ( gcm_enc_eo_key, " + 
			"    gcm_encounter_key, " + 
			"    gcm_proj_key, " + 
			"    gcm_eo_key, " + 
			"    create_userid, " + 
			"    create_date_time, " + 
			"    modify_userid, " + 
			"    modify_date_time ) " + 
			"SELECT gcm_enc_eo_seq.NEXTVAL gcm_enc_eo_key, " + 
			"       :gcm_encounter_key gcm_encounter_key, " + 
			"       :gcm_proj_key gcm_proj_key, " + 
			"       t.column_value AS gcm_eo_key, " + 
			"       :create_userid create_userid, " + 
			"       :create_date_time create_date_time, " + 
			"       :modify_userid modify_userid, " + 
			"       :modify_date_time modify_date_time " + 
			"  FROM TABLE(SYS.ODCIVarchar2List(:enc_eo_cds)) t " + 
			" WHERE NOT EXISTS " + 
			"          ( SELECT gcm_encounter_key " + 
			"              FROM gcm_enc_eo " + 
			"             WHERE gcm_encounter_key = :gcm_encounter_key " + 
			"               AND gcm_proj_key = :gcm_proj_key " + 
			"               AND gcm_eo_key = t.column_value ) ";
}
