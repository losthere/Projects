package com.optum.gcm.sevice;

import static com.optum.gcm.dao.constants.CodingWorkFlowQueries.*;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.optum.gcm.common.dao.CommonJpaDao;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.AgeGendorMapping;
import com.optum.gcm.model.ChartComments;
import com.optum.gcm.model.ChartCommentsInfo;
import com.optum.gcm.model.ChartDetailsInfo;
import com.optum.gcm.model.ChartHistoryInfo;
import com.optum.gcm.model.ChartInputInfo;
import com.optum.gcm.model.DxCodeDOSDetails;
import com.optum.gcm.model.GcmContentComment;
import com.optum.gcm.model.GcmEOVw;
import com.optum.gcm.model.HHSModelMapping;
import com.optum.gcm.model.IcdHccDetails;

/**
 * @author pmule
 *
 */

@Service
public class CodingWorkFlowService {

	private static final Logger LOG = LoggerFactory.getLogger(CodingWorkFlowService.class);

	@Autowired
	private CommonJpaService commonJpaService;

	@Autowired
	private CommonJpaDao commonJpaDao;

	@Autowired
	CacheableService cacheableService;
	
	private static final String CONST_VAL001 = "VAL001";
	private static final String CONST_VAL002 = "VAL002";
	private static final String CONST_FAT001 = "FAT001";
	private static final String DATE_FORMAT="MM-dd-yyyy";
	
	private Map<String, String> icdCodesMap;
	private Map<String, String> hccsForMCAREMap;
	private Map<String, HHSModelMapping> hccsForACAMap;
	
	@PostConstruct
	protected void init() {
		icdCodesMap = cacheableService.getAllIcdDxCodes();
		hccsForMCAREMap = cacheableService.getAllHccMappingsforMCARE();
		hccsForACAMap = cacheableService.getAllHccMappingsforACA();
	}

	public ChartDetailsInfo getChartDetails(ChartInputInfo chartInputInfo) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		String where = "";

		ChartDetailsInfo info = null;
		if (chartInputInfo.getBusFuncKey() != null && chartInputInfo.getBusFuncKey() > 0) {
			where = " AND GCM_BUSINESS_FUNC_KEY = :GCM_BUSINESS_FUNC_KEY ";
			params.put("GCM_BUSINESS_FUNC_KEY", chartInputInfo.getBusFuncKey());
		}

		if (chartInputInfo.getProjContentKey() != null && chartInputInfo.getProjContentKey() > 0) {
			where += " AND V.GCM_PROJECT_CONTENT_KEY =  :GCM_PROJECT_CONTENT_KEY " ;
			params.put("GCM_PROJECT_CONTENT_KEY", chartInputInfo.getProjContentKey());
		}

		if (chartInputInfo.getBusFuncVenKey() != null && chartInputInfo.getBusFuncVenKey() > 0) {
			where += " AND GCM_PROJ_CONT_BUS_FUNC_VEN_KEY =  :GCM_PROJ_CONT_BUS_FUNC_VEN_KEY " ;
			params.put("GCM_PROJ_CONT_BUS_FUNC_VEN_KEY", chartInputInfo.getBusFuncVenKey());
		}

		String queryString = QUERY_GET_CHART_DETAILS + where;
		LOG.info("getChartDetails started with filter: " + chartInputInfo.toString());
		LOG.info("getChartDetails query: " + queryString);
		try {
			info = commonJpaService.getResultObject(queryString, params,ChartDetailsInfo.class);
		} catch(EmptyResultDataAccessException e) {
			LOG.error("Error occured : ", e);
			info = new ChartDetailsInfo();
		}
		return info;
	}

	@Transactional
	public int updateChartStatus(ChartInputInfo chartInputInfo) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		String setString = "";

		// If the Chart is Escalated, first insert escalated work item in busfuncvendor table
		if (chartInputInfo != null && StringUtils.isNotBlank(chartInputInfo.getContentErrorCode())) {
			setString += " ,GCM_CONTENT_EO_KEY = (SELECT gcm_eo_key FROM gcm_eo WHERE gcm_eo_code = :gcm_eo_code AND gcm_group_key = :gcm_group_key AND is_content_level = 'Y') ";
			params.put("gcm_eo_code",chartInputInfo.getContentErrorCode());
			params.put("gcm_group_key",chartInputInfo.getGroupKey());
		}
		if (chartInputInfo != null && StringUtils.isNotBlank(chartInputInfo.getReasonCode())) {
			setString += " ,GCM_REASON_CODE = :GCM_REASON_CODE ";
			params.put("GCM_REASON_CODE",chartInputInfo.getReasonCode());
		}
		String queryString = QUERY_UPDATE_CHART_STATUS.replace("#SET#", setString);
		if(chartInputInfo != null) {
			params.put("GCM_BUS_FUNC_STATUS",chartInputInfo.getToBusFuncStatus() );
			params.put("GCM_PROJECT_CONTENT_KEY",chartInputInfo.getProjContentKey());
			params.put("GCM_PROJ_CONT_BUS_FUNC_VEN_KEY",chartInputInfo.getBusFuncVenKey());
			params.put("GCM_BUSINESS_FUNC_KEY",chartInputInfo.getBusFuncKey());
			params.put("GCM_PROJ_KEY",chartInputInfo.getProjKey());
			params.put("MODIFY_USERID",chartInputInfo.getRequestedUserId());
			params.put("GCM_USER_KEY",chartInputInfo.getUserKey());
			LOG.debug("updateChartStatus for GCM_PROJECT_CONTENT_KEY: " + chartInputInfo.getProjContentKey());
			LOG.debug("updateChartStatus for GCM_PROJ_CONT_BUS_FUNC_VEN_KEY: " + chartInputInfo.getBusFuncVenKey());
		}

		if (chartInputInfo != null && StringUtils.isNotBlank(chartInputInfo.getToBusFuncStatus()) 
				&& chartInputInfo.getToBusFuncStatus().equalsIgnoreCase("ESCALATED")) {
			insertEscalatedWorkItem(chartInputInfo, params);

		} 

		int updateCount = commonJpaService.update(queryString, params);
		
		if(updateCount > 0) {
			if (chartInputInfo != null && StringUtils.isNotBlank(chartInputInfo.getToBusFuncStatus()) 
					&& chartInputInfo.getToBusFuncStatus().equalsIgnoreCase("COMPLETED") && chartInputInfo.getBusFuncKey()!=7) {
				// make entry in vendor table for QA work item
				//if(isBusFuncConfigured(chartInputInfo.getGroupKey(), "QA")) {
				if(configurationExists(chartInputInfo.getBarcode(), chartInputInfo.getDosYear(), chartInputInfo.getVendorKey(), 6, "" , "FUNCTION_ENABLED", "TRUE")) {
				createQAWorkItem(chartInputInfo, params);
				insertCoderProductivityforQA(chartInputInfo, params);
				}
			}

			if (null != chartInputInfo && chartInputInfo.getChartComment()!= null) {
				insertChartComments(chartInputInfo.getChartComment());
			}
			insertCoderProductivity(chartInputInfo, params);
		}
		return updateCount;
	}

	@Transactional
	public void replyandExitforEscalatedItem(ChartInputInfo chartInputInfo) throws SQLException {
		Map<String, Object> params = new HashMap<>();

		String CONST_COMPLETED  = "COMPLETED";
		String CONST_INPROGRESS = "INPROGRESS";
		String CONST_REJECTED   = "REJECTED";

		params.put("GCM_PROJECT_CONTENT_KEY",chartInputInfo.getProjContentKey());
		params.put("GCM_PROJ_CONT_BUS_FUNC_VEN_KEY",chartInputInfo.getBusFuncVenKey());
		params.put("GCM_BUSINESS_FUNC_KEY",chartInputInfo.getBusFuncKey());
		params.put("GCM_PROJ_KEY",chartInputInfo.getProjKey());
		params.put("MODIFY_USERID",chartInputInfo.getRequestedUserId());
		params.put("GCM_USER_KEY",chartInputInfo.getUserKey());

		//If the Escalation reason code is Other/unassigned
		if (chartInputInfo != null && chartInputInfo.getReasonCode().equalsIgnoreCase("GCM10") 
				&&  StringUtils.isNotBlank(chartInputInfo.getReasonCode())) {

			if (chartInputInfo.getToBusFuncStatus().equalsIgnoreCase(CONST_COMPLETED)) {
				params.put("CODING_WI_STATUS",CONST_INPROGRESS );
				params.put("SUP_WI_STATUS",CONST_COMPLETED );
				
			}

		} else {
			if (chartInputInfo.getToBusFuncStatus().equalsIgnoreCase(CONST_COMPLETED)) {
				params.put("CODING_WI_STATUS",CONST_REJECTED );
				params.put("SUP_WI_STATUS",CONST_COMPLETED);
				//If the Escalation reason code is Incorrect Member
				if (chartInputInfo.getReasonCode()!= null  && StringUtils.isNotBlank(chartInputInfo.getReasonCode())
						&& !chartInputInfo.getReasonCode().equalsIgnoreCase("GCM10")) {
					// Soft Delete encounters and Dx
					commonJpaService.update(QUERY_SOFTDELETE_ENCOUNTER_DX, params);
					commonJpaService.update(QUERY_SOFTDELETE_ENCOUNTER, params);

				}
			} else if (chartInputInfo.getToBusFuncStatus().equalsIgnoreCase(CONST_REJECTED)) {
				params.put("CODING_WI_STATUS",CONST_INPROGRESS );
				params.put("SUP_WI_STATUS",CONST_REJECTED );
			}

		}

		LOG.info("updateChartStatus started with filter: " + chartInputInfo.toString());
		commonJpaService.update(QUERY_UPDATE_CHART_STATUS_FORCODING_WI_WHENESC, params);
		params.put("GCM_BUS_FUNC_STATUS","INPROGRESS" );
		commonJpaService.update(QUERY_UPDATE_ESC_CHART_STATUS, params);
		params.put("GCM_BUS_FUNC_STATUS",CONST_COMPLETED );
		insertCoderProductivity(chartInputInfo, params);
		if (null != chartInputInfo.getChartComment() && null != chartInputInfo.getChartComment().getContentComment()) {
			insertChartComments(chartInputInfo.getChartComment());

		}
	}

	@Transactional
	public void makeEntryforCoderProductivity(ChartInputInfo chartInputInfo) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_PROJECT_CONTENT_KEY",chartInputInfo.getProjContentKey());
		params.put("GCM_PROJ_CONT_BUS_FUNC_VEN_KEY",chartInputInfo.getBusFuncVenKey());
		params.put("GCM_BUSINESS_FUNC_KEY",chartInputInfo.getBusFuncKey());
		params.put("GCM_PROJ_KEY",chartInputInfo.getProjKey());
		params.put("MODIFY_USERID",chartInputInfo.getRequestedUserId());
		params.put("GCM_USER_KEY",chartInputInfo.getUserKey());
		params.put("WORK_SESSION_ID",chartInputInfo.getCurrentSessionId());
		insertCoderProductivity(chartInputInfo, params);
	}
		
	private void insertEscalatedWorkItem(ChartInputInfo chartInputInfo, Map<String, Object> params) throws SQLException {
		String queryString = QUERY_INSERT_ESCALATED_WITEM ;
		commonJpaService.update(queryString, params);
	}

	private void createQAWorkItem(ChartInputInfo chartInputInfo, Map<String, Object> params) throws SQLException {
		String queryString = QUERY_INSERT_QA_WITEM ;
		commonJpaService.update(queryString, params);
	}

	public void insertCoderProductivity(ChartInputInfo chartInput, Map<String, Object> params) throws SQLException {
		params.put("EVENT", chartInput.getEventType());
		params.put("WORK_SESSION_ID", chartInput.getCurrentSessionId());
		params.put("WORK_LIST_ACTIVITY_KEY", chartInput.getWorklistActivityKey());
		String queryString = QUERY_INSERT_GCM_CODER_PRODUCTIVITY ;
		commonJpaService.update(queryString, params);
	}
	
	public void insertCoderProductivityforQA(ChartInputInfo chartInput, Map<String, Object> params) throws SQLException {
		params.put("EVENT", "VEN_ASSIGN");
		//params.put("WORK_SESSION_ID", chartInput.getCurrentSessionId());
		String queryString = QUERY_INSERT_GCM_CODER_PRODUCTIVITY_FORQAWI ;
		commonJpaService.update(queryString, params);
	}
	
	public List<ChartHistoryInfo> getChartHistory(Long projContentKey) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		String queryString = QUERY_GET_CHART_HISTORY;
		params.put("gcm_project_content_key", projContentKey);
		if(LOG.isDebugEnabled()){
			LOG.info("getChartHistory started with filter: " + projContentKey);
		}
		return commonJpaService.getResultList(queryString, params,ChartHistoryInfo.class);
	}
	
	
	public boolean isBusFuncConfigured(Long groupKey, String roleCode) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_GROUP_KEY", groupKey);
		params.put("GCM_ROLE_CODE", roleCode);
		Long count= commonJpaService.getResultObject(QUERY_BUS_FUNC_BY_GRP_KEY,params, Long.class);
			return ((count.intValue())>0);
	}
	
	private boolean configurationExists(String barcode, long dosYear, long vendorKey,long busFunckey, String busFuncDetailKey,String configType, String configValue)
	{
		Map<String, Object> params = new HashMap<>();
		LocalDate now = LocalDate.now(); 
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_FORMAT, Locale.ENGLISH);
		String asOfDate= now.format(formatter);
		String queryString = GET_CONFIGURATION_QUERY;
		params.put("P_BARCODE", barcode);
		params.put("P_DOS_YEAR", dosYear);
		params.put("P_VENDOR_KEY", vendorKey);
		params.put("P_BUSINESS_FUNC_KEY", busFunckey);
		params.put("P_BUSINESS_FUNC_DETAIL_KEY", busFuncDetailKey);
		params.put("P_CONFIG_TYPE", configType);
		params.put("P_CONFIG_VALUE", configValue);
		params.put("P_AS_OF_DATE", asOfDate);
		String status="";
		try {
			status= commonJpaService.getResultObject(queryString, params, String.class);
		}
		catch(EmptyResultDataAccessException e)
		{
			LOG.error("Error occured : ", e);
		}
		return "Y".equalsIgnoreCase(status);
		
	}

	public List<ChartComments> getChartComments(Long projContentKey) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		String queryString = QUERY_GET_CHART_COMMENTS;
		params.put("GCM_PROJECT_CONTENT_KEY", projContentKey);
		if(LOG.isDebugEnabled()){
			LOG.info("getChartComments started with filter: " + projContentKey);
		}
		return commonJpaService.getResultList(queryString, params,ChartComments.class);
	}

	public Long insertChartComments(ChartCommentsInfo comments) throws SQLException {
		java.util.Date date = new Date();
		java.sql.Timestamp timestampdate = new java.sql.Timestamp(date.getTime());
		GcmContentComment comm = new GcmContentComment(); 
		comm.setContentComment(comments.getContentComment());
		comm.setBusFuncKey(comments.getBusFuncKey());
		comm.setBusFuncVenKey(comments.getBusFuncVenKey());
		comm.setProjContentKey(comments.getProjContentKey());
		comm.setProjectKey(comments.getProjKey());
		comm.setBarcode(comments.getChartId());
		comm.setModifiedUser(comments.getUserName());
		comm.setCreateUser(comments.getUserName());
		comm.setCreateDate(timestampdate);
		comm.setCommentDt(timestampdate);
		comm.setModifiedDate(timestampdate);
		return commonJpaDao.persist(comm);
	}


	
	public List<GcmEOVw> getEncEoCodes(){
		String queryString = QUERY_GET_ENC_EO_CODES;
		return commonJpaService.getResultList(queryString, GcmEOVw.class);
	}

	public List<GcmEOVw> getDxLevelEoCodes(){
		String queryString = QUERY_GET_DX_LEVEL_EO_CODES;
		return commonJpaService.getResultList(queryString, GcmEOVw.class);
	}

	public IcdHccDetails validateIcdCode(DxCodeDOSDetails dxCodedosDetailsObj) throws SQLException, ParseException {

		String icdStartDate = "09-30-";
		String icdEndDate = "10-01-";
		String dxCodeDesc ="";
		String hccCode = "";
		int dosYear = 2017;
		int dxCodeYear = 0;
		int hccModelYear = 0;
		String dxCodeKey = "";
		String hccKey = "";
		IcdHccDetails icdHccDetails = new IcdHccDetails();

		if (StringUtils.isNotBlank(dxCodedosDetailsObj.getDosThruDt()) )  {
			Date dosThruDt = new SimpleDateFormat(DATE_FORMAT, Locale.ENGLISH).parse(dxCodedosDetailsObj.getDosThruDt());
			DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(DATE_FORMAT, Locale.ENGLISH);
			dosYear = java.time.Year.parse(dxCodedosDetailsObj.getDosThruDt(),dateTimeFormatter).getValue();
			String startDateStr = icdStartDate+dosYear; 
			String endDatestr = icdEndDate+(dosYear+1);
			Date startDate = new SimpleDateFormat(DATE_FORMAT, Locale.ENGLISH).parse(startDateStr);
			Date endDate = new SimpleDateFormat(DATE_FORMAT, Locale.ENGLISH).parse(endDatestr);

			if(dosThruDt.after(startDate) && dosThruDt.before(endDate)) {
				dxCodeYear = dosYear+1;
			} else {
				dxCodeYear = dosYear;
			}
			//Check ICD code exists or not
			dxCodeKey += dxCodeYear+","+dxCodedosDetailsObj.getIcdDxCd();
			LOG.info("Dx Lookup Key is:" +dxCodeKey );
			dxCodeDesc = icdCodesMap.get(dxCodeKey);

			if(null != dxCodeDesc) {
				if (validateAgeGender(dxCodeKey,dxCodedosDetailsObj) ) {
				//	if (!dxCodedosDetailsObj.getBusSegment().equalsIgnoreCase("ACA") || validateAgeGender(dxCodeKey,dxCodedosDetailsObj) ) {
					// Get HCC Mapping
					hccModelYear = dosYear + 1;
					if (dxCodedosDetailsObj.getBusSegment().equalsIgnoreCase("MCARE")) {
						hccKey += hccModelYear+","+dxCodedosDetailsObj.getIcdDxCd().replace(".", "");
						LOG.info("Hcc Lookup Key is:" +hccKey );
						hccCode = hccsForMCAREMap.get(hccKey);
						if (null != hccCode && StringUtils.isNotBlank(hccCode)) {
							String[] split = hccCode.split(";");
							if(split.length > 0){
								for(String hccStr : split) {
									if(null != hccStr) {
										String[] hccslist = hccStr.split(":");
										if (hccslist[0].equalsIgnoreCase("Rx")) {
											icdHccDetails.setRxHcc(hccslist[1]);
										} else if (hccslist[0].equalsIgnoreCase("V22")) {
											icdHccDetails.setV22Hcc(hccslist[1]);
										}else if (hccslist[0].equalsIgnoreCase("V23")) {
											icdHccDetails.setV23Hcc(hccslist[1]);
										}else if (hccslist[0].equalsIgnoreCase("V24")) {
											icdHccDetails.setV24Hcc(hccslist[1]);
										}
									}									
								}
							}
						}
					} else if (dxCodedosDetailsObj.getBusSegment().equalsIgnoreCase("ACA")) {
						hccKey += hccModelYear+","+dxCodedosDetailsObj.getIcdDxCd().replace(".", "")+","+dxCodedosDetailsObj.getGender();
						HHSModelMapping hhs = new HHSModelMapping();
						hhs = hccsForACAMap.get(hccKey);
						if (hhs != null && !StringUtils.equalsIgnoreCase(dxCodedosDetailsObj.getGender(),"U")) {
							if (dxCodedosDetailsObj.getAge() >= hhs.getDiagStartAge() 
									&& dxCodedosDetailsObj.getAge() <=  hhs.getDiagEndAge() ) {
								icdHccDetails.setHhs(hhs.getHccModelCat());
							}
						}

					}
				}
				else {
					dxCodeDesc = "ICD code not valid for age/gender combination";
					icdHccDetails.setErrorCode(CONST_VAL002);
				}
			} else {
				dxCodeDesc = "ICD code not valid";
				icdHccDetails.setErrorCode(CONST_VAL001);
				
			}

		} else {
			dxCodeDesc = "Mandatory parameters are missing";
			icdHccDetails.setErrorCode(CONST_FAT001);
		}
		icdHccDetails.setIcdDesc(dxCodeDesc);
		return icdHccDetails;
	}

	private boolean validateAgeGender(String dxKey, DxCodeDOSDetails dosInfo ) {
		Map<String, AgeGendorMapping> icdForAgeGenderMap = cacheableService.getAllAgeGenderValidations();
		AgeGendorMapping ageMap = new AgeGendorMapping();
		ageMap = icdForAgeGenderMap.get(dxKey);

		if (ageMap != null && dosInfo !=null ) {
			if (StringUtils.isBlank(ageMap.getGender()) || StringUtils.equalsIgnoreCase(dosInfo.getGender(),"U") 
					                                    || dosInfo.getGender().equals(ageMap.getGender())) {
				if (dosInfo.getAge() >= ageMap.getFromAge() && dosInfo.getAge() <=  ageMap.getThruAge() ) {
					return true;
				} else {
					return false;
				}

			} else {
				return false;
			}
		} else
			return true;
	}

}
