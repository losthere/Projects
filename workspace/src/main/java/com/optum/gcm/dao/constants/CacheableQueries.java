package com.optum.gcm.dao.constants;

/**
 * @author pmule
 *
 */

public interface CacheableQueries {
	
	String QUERY_GET_ALL_ICDCODES_FOR_MCARE =  "SELECT extract( YEAR FROM ICD_DX_CD_YEAR) " 
			+"  ||',' " 
			+"  || I.ICD_DX_CD AS KEY, " 
			+"  i.SHORT_DESC   AS VALUE " 
			+" FROM gcm_icd_dx_cd I " 
			+" WHERE i.VALIDITY = 'C' "
	 //		+" AND icd_dx_cd = 'A18.14' "
			+" AND extract( YEAR FROM ICD_DX_CD_YEAR) >= '2017'	" ;
	
	
	String QUERY_GET_ALL_MCARE_HCCMAPPINGS = "SELECT extract( YEAR FROM model_yr)"
											+"  || ',' "
											+"  || icd_dx_cd AS KEY, "
											+"  RTRIM( NVL2(gcm_hcc_model_cat_rx, 'Rx:'  "
											+"  || gcm_hcc_model_cat_rx    "
											+"  || ';', NULL)   "
											+"  || NVL2(gcm_hcc_model_cat_v22, 'V22:'    "
											+"  || gcm_hcc_model_cat_v22   "
											+"  || ';', NULL)   "
											+"  || NVL2(gcm_hcc_model_cat_v23, 'V23:'  "
											+"  || gcm_hcc_model_cat_v23   "
											+"  || ';', NULL)	"
											+ " || nvl2(gcm_hcc_model_cat_v24,'V24:'	" 
											+ " || gcm_hcc_model_cat_v24	" 
											+"  || ';', NULL), ';' ) AS VALUE "
											+"FROM  "
											+"  (SELECT model_yr, "
											+"    icd_dx_cd,"
											+"    LISTAGG(  "
											+"    CASE "
											+"      WHEN gcm_hcc_model_type = 'Rx'  "
											+"      THEN gcm_hcc_model_cat "
											+"    END, ',') WITHIN GROUP ( "
											+"  ORDER BY gcm_hcc_model_cat) AS gcm_hcc_model_cat_rx,"
											+"    LISTAGG(  "
											+"    CASE "
											+"      WHEN gcm_hcc_model_type = 'V22' "
											+"      THEN gcm_hcc_model_cat "
											+"    END, ',') WITHIN GROUP ( "
											+"  ORDER BY gcm_hcc_model_cat) AS gcm_hcc_model_cat_v22,"
											+"  LISTAGG(    "
											+"    CASE "
											+"      WHEN gcm_hcc_model_type = 'V23' "
											+"      THEN gcm_hcc_model_cat "
											+"    END, ',') WITHIN GROUP ( "
											+"  ORDER BY gcm_hcc_model_cat) AS gcm_hcc_model_cat_v23, "
											+"	LISTAGG(	" 
											+"     CASE	" 
											+"       WHEN gcm_hcc_model_type = 'V24' "
											+"		 THEN gcm_hcc_model_cat	" 
											+"     END,',') WITHIN GROUP( " 
											+"   ORDER BY gcm_hcc_model_cat) AS gcm_hcc_model_cat_v24 "
											+"  FROM gcm_hcc_model "
											+"  WHERE gcm_business_segment   = 'MCARE' "
											+"  AND extract( YEAR FROM MODEL_YR) >= '2017' "
											+"  GROUP BY model_yr,   "
											+"    icd_dx_cd "
											+"  )  " ;
	
	
	String QUERY_GET_ALL_ACA_HHSMAPPINGS = "SELECT extract( YEAR FROM model_yr) " 
										+"  || ',' " 
										+"  || icd_dx_cd || ',' || GCM_GENDER AS KEY, " 
										+"  GCM_HCC_MODEL_CAT, " 
										+"  DIAG_START_AGE, " 
										+"  DIAG_END_AGE " 
										+"FROM gcm_hcc_model " 
										+"WHERE GCM_BUSINESS_SEGMENT        = 'ACA' " 
										+"AND extract( YEAR FROM MODEL_YR) >= '2017' " 
									//	+" AND icd_dx_cd = 'A1814' "
										+"GROUP BY MODEL_YR, " 
										+"  ICD_DX_CD, " 
										+"  GCM_HCC_MODEL_CAT, " 
										+"  GCM_GENDER, " 
										+"  DIAG_START_AGE, " 
										+"  DIAG_END_AGE";
	
	String QUERY_GET_AGE_GENDER_VALIDATIONS = "SELECT EXTRACT( YEAR FROM ICD_DX_CD_YEAR) " 
											+"  || ',' " 
											+"  || ICD_DX_CD AS KEY, " 
											+"  NVL(FROM_AGE,0) FROM_AGE, " 
											+"  NVL(THRU_AGE,999) THRU_AGE, " 
											+" GENDER "
											+"FROM GCM_ICD_AGE_GENDER_DET " 
											+"WHERE EXTRACT( YEAR FROM ICD_DX_CD_YEAR) >= '2017' " 
									//		+" AND  ICD_DX_CD = 'A18.14' "
											+"GROUP BY ICD_DX_CD_YEAR, " 
											+"  GENDER, " 
											+"  ICD_DX_CD, " 
											+"  FROM_AGE, " 
											+"  THRU_AGE"  ; 

}
