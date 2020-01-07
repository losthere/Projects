package com.optum.gcm.dao.constants;

public interface RetrievalActionQueries {
	String QUERY_PROJECT_HAS_NEW_STATUS = "SELECT 'YES' FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR WHERE GCM_BUSINESS_SEGMENT = :GCM_BUSINESS_SEGMENT AND "
			+ "GCM_PROJECT_YEAR = :GCM_PROJECT_YEAR AND GCM_PROJ_KEY = :GCM_PROJ_KEY AND GCM_BUS_FUNC_STATUS = 'NEW' AND ROWNUM = 1";

	String QUERY_PROJECT_HAS_COMP_BARCODES = "SELECT 'YES' STATUS FROM GCM_PROJ_CONT_BUS_FUNC_VENDOR WHERE GCM_PROJ_KEY = :GCM_PROJ_KEY AND "
			+ "GCM_PROJECT_YEAR = :GCM_PROJECT_YEAR AND GCM_BUSINESS_FUNC_KEY = 4 AND GCM_BUS_FUNC_STATUS in (SELECT GCM_BUS_FUNC_STATUS FROM "
			+ "GCM_BUS_FUNC_STATUS WHERE GCM_BUSINESS_FUNC_KEY = 4 AND GCM_BUS_FUNC_STATUS_GROUP = 'COMPLETED') AND ROWNUM =1";
	
	String QUERY_UPDATE_PROJECT = "UPDATE GCM_PROJECT SET GCM_PROJ_NAME = 'DELETED - ' || GCM_PROJ_KEY || ' - ' || TO_CHAR(SYSDATE,'mmddyyyyhh24miss'), "
			+ "MODIFY_USERID = :USER_ID, MODIFY_DATE_TIME = SYSDATE, SUPPLEMENT_KEY = '' WHERE GCM_PROJ_KEY = :GCM_PROJ_KEY";
	
	 String QUERY_BARCODES_HAS_INVALID_PROGRAM = "select count(1) cnt from gcm_proj_content pc where pc.gcm_proj_content_barcode "
			+ "in (select * from table(fnc_parse_list(:BARCODES,';')) where column_value is not null) and not exists (SELECT 1 RESULT FROM "
			+ "GCM_USER_SKILL US, GCM_USER U, GCM_PROGRAM_LIST pl WHERE US.GCM_SKILL_TYPE_KEY = 5 AND US.GCM_USER_KEY = U.GCM_USER_KEY AND "
			+ "U.USERID = :USERID and PL.GCM_PARENT_PROGRAM_KEY = TO_NUMBER(US.GCM_SKILL_NAME) and "
			+ "regexp_replace(US.GCM_SKILL_NAME,'[0-9]') is null and pl.gcm_program_key = pc.gcm_program_key)";
	
	 String QUERY_BARCODES_HAS_INVALID_BUSINESS_SEGMENT = "select COUNT(1) CNT from gcm_proj_content pc where pc.gcm_proj_content_barcode "
			+ "in (select * from table(fnc_parse_list(:BARCODES,';')) where column_value is not null) and not exists (SELECT 1 RESULT FROM "
			+ "GCM_USER_SKILL US, GCM_USER U, GCM_BUSINESS_SEGMENT_LIST BS WHERE US.GCM_SKILL_TYPE_KEY = 4 AND US.GCM_USER_KEY = U.GCM_USER_KEY AND "
			+ "U.USERID = :USERID and BS.GCM_BUSINESS_SEGMENT_DESC = US.GCM_SKILL_NAME and "
			+ "BS.Gcm_Business_Segment = pc.Gcm_Business_Segment)";
	 
	 String QUERY_BARCODES_HAS_INVALID_GROUP = "SELECT COUNT(1) cnt " + 
	 		"  FROM gcm_proj_content pc " + 
	 		" WHERE pc.gcm_proj_content_barcode IN " + 
	 		"           (SELECT * " + 
	 		"              FROM TABLE(fnc_parse_list(:BARCODES, ';')) " + 
	 		"             WHERE COLUMN_VALUE IS NOT NULL) " + 
	 		"   AND gcm_proj_key NOT IN " + 
	 		"           (SELECT gcm_proj_key " + 
	 		"              FROM gcm_project p, gcm_user_vendor_group_vw g " + 
	 		"             WHERE p.gcm_group_key = g.gcm_group_key AND g.gcm_user_key = :GCM_USER_KEY)";
	
	 String QUERY_BARCODES_VALIDATION = "select x.*, "
			+ "NVL((SELECT 'YES' FROM GCM_VENDOR_REQUEST VR WHERE VR.GCM_PROJ_KEY = x.gcm_proj_key AND VR.GCM_PROJ_YEAR = x.gcm_project_year AND "
			+ "((VR.REQUEST_TYPE = 'DELETE' AND VR.GCM_PROGRAM_KEY IS NOT NULL) or  VR.GCM_PROGRAM_KEY = x.gcm_program_key) AND "
			+ "((VR.REQUEST_TYPE = 'DELETE' AND VR.GCM_HP_KEY IS NOT NULL) OR VR.GCM_HP_KEY = x.gcm_hp_key) AND "
			+ "PROCESS_STATUS NOT IN ('COMPLETE', 'PROCESSERROR', 'FILECREATIONERROR') AND ROWNUM = 1),'NO') HAS_PENDING_REQ "
			+ "from (select gcm_program_key, gcm_bus_func_status, gcm_proj_content_barcode, t.column_value input_barcode, "
			+ "count(1) over(partition by gcm_proj_content_barcode) work_items_cnt, gcm_hp_key, gcm_proj_key, gcm_project_year, "
			+ "row_number() over(partition by gcm_proj_content_barcode order by create_date_time) row_num from gcm_proj_cont_bus_func_vendor bv, "
			+ "(select * from table(fnc_parse_list(:BARCODES,';')) where column_value is not null) t where gcm_proj_content_barcode(+) = t.column_value) x "
			+ "where row_num = 1";
	
	 String UPDATE_BAROCDES_STATUS = "update gcm_proj_cont_bus_func_vendor set gcm_bus_func_status = 'CANCELED', "
			+ "gcm_reason_code= :REASON_CODE where gcm_proj_content_barcode in "
			+ "(select * from table(fnc_parse_list(:BARCODES,';')) where column_value is not null) and gcm_business_func_key = 4";
	
	 String INSERT_VENDOR_MANIFEST = "INSERT INTO GCM_VENDOR_MANIFEST_DET SELECT GCM_VENDOR_MANIFEST_DET_seq.nextval, gcm_proj_content_barcode || '|CANCELED|', GCM_VENDOR_KEY, NULL, GCM_PROJ_KEY, GCM_PROJECT_YEAR, "
			 +" GCM_PROJECT_CONTENT_KEY,GCM_PROJ_CONTENT_BARCODE, GCM_BUSINESS_FUNC_KEY, 'CANCELED', :USERID, sysdate, :USERID, sysdate FROM gcm_proj_cont_bus_func_vendor WHERE "
			 +" gcm_proj_content_barcode IN (SELECT * FROM TABLE(fnc_parse_list(:BARCODES,';')) WHERE column_value IS NOT NULL ) and GCM_BUSINESS_FUNC_KEY = 4 and GCM_VENDOR_KEY is not null";
}
