package com.optum.gcm.sevice;

import static com.optum.gcm.common.util.LoggingUtil.logInfo;
import static com.optum.gcm.dao.constants.EncounterQueries.*;
import static java.time.LocalDate.now;

import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.optum.gcm.common.dao.CommonJpaDao;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.EncounterDxDetails;
import com.optum.gcm.model.EncounterDxHccInfo;
import com.optum.gcm.model.EncounterDxInfo;
import com.optum.gcm.model.EncounterInfo;
import com.optum.gcm.model.EncounterInputInfo;
import com.optum.gcm.model.GcmEncEo;
import com.optum.gcm.model.GcmEncounter;
import com.optum.gcm.model.GcmEncounterDx;

/**
 * @author pmule
 *
 */

@Service
public class EncounterService {

	private static final Logger LOG = LoggerFactory.getLogger(EncounterService.class);

	private CommonJpaDao commonJpaDao;

	@Autowired
	public EncounterService(CommonJpaDao commonJpaDao) {
		this.commonJpaDao = commonJpaDao;
	}

	@Autowired
	private CommonJpaService commonJpaService;
	
	@Transactional
	public Long saveEncounterAndDx(EncounterDxDetails encDetails) throws SQLException, ParseException, IOException {
		EncounterInfo encInfo = encDetails.getEncounterInfo();
		if(!checkIsWorkItemActive(encInfo.getProjContBusFuncVenKey(), encInfo.getProjKey(), encDetails.getUserKey())) {
			return 0L;
		}
		
		logInfo(LOG, "saveEncounter for ProjContentKey :{}, start Time: {}",
				encDetails.getEncounterInfo().getProjContentKey(), now());
		
		Long encKey = encInfo.getEncounterKey();
		if(null != encKey && encKey > 0){
			updateEncounter(encDetails);
		}else{
			encKey = saveEncounter(encDetails);
			if(null != encKey && encKey > 0) {
				saveEoCode(encDetails,encKey);
			}
			saveEncounterDx(encDetails, encKey);
		}
		logInfo(LOG, "saveEncounter for ProjContentKey : {} end Time: {}",
				encDetails.getEncounterInfo().getProjContentKey(), now());
		return encKey;
	}
	
	private Long saveEncounter(EncounterDxDetails encDetails) throws SQLException, ParseException {
		GcmEncounter encounter = new GcmEncounter();
		encounter.setBarcode(encDetails.getEncounterInfo().getBarcode());
		encounter.setBusFuncKey(encDetails.getEncounterInfo().getBusFuncKey());
		
		if (StringUtils.isNotBlank(encDetails.getEncounterInfo().getDosFromDt())) {
			Date date1 = new SimpleDateFormat("MM-dd-yyyy").parse(encDetails.getEncounterInfo().getDosFromDt());
			encounter.setDosFromDt(date1); 
		}
		
		if (StringUtils.isNotBlank(encDetails.getEncounterInfo().getDosThruDt())) {
			Date date2 = new SimpleDateFormat("MM-dd-yyyy").parse(encDetails.getEncounterInfo().getDosThruDt());
			encounter.setDosThruDt(date2); 
		}
		
		//encounter.setEoKey(encDetails.getEncounterInfo().getEoKey());
		encounter.setProjContentKey(encDetails.getEncounterInfo().getProjContentKey());
		encounter.setProjContBusFuncVenKey(encDetails.getEncounterInfo().getProjContBusFuncVenKey());
		encounter.setProjKey(encDetails.getEncounterInfo().getProjKey());
		encounter.setPageNumber(encDetails.getEncounterInfo().getPageNumber());
		encounter.setRetrievalProvFlag(encDetails.getEncounterInfo().getRetrievalProvFlag());
		encounter.setProvNpi(encDetails.getEncounterInfo().getProvNpi());
		encounter.setProvFirstName(encDetails.getEncounterInfo().getProvFirstName());
		encounter.setProvLastName(encDetails.getEncounterInfo().getProvLastName());
		encounter.setCreateUser(encDetails.getLoginUserId());
		encounter.setModifiedUser(encDetails.getLoginUserId());
		encounter.setCreateDate(new java.sql.Timestamp(System.currentTimeMillis()));
		encounter.setModifiedDate(new java.sql.Timestamp(System.currentTimeMillis()));
		return commonJpaDao.persist(encounter);
	}
	
	private void saveEoCode(EncounterDxDetails encDetails, Long encKey) throws SQLException {
		for (String eoKey: encDetails.getEncounterInfo().getEoKeyList()) {
			GcmEncEo eo = new GcmEncEo();
			eo.setEncounterKey(encKey);
			eo.setEoKey(eoKey);
			eo.setProjKey(encDetails.getEncounterInfo().getProjKey());
			eo.setCreateUser(encDetails.getLoginUserId());
			eo.setModifiedUser(encDetails.getLoginUserId());
			eo.setCreateDate(new java.sql.Timestamp(System.currentTimeMillis()));
			eo.setModifiedDate(new java.sql.Timestamp(System.currentTimeMillis()));
			commonJpaDao.persist(eo);
		}
		//return commonJpaDao.persist(eo);
	}
	
	private void saveEncounterDx(EncounterDxDetails encDetails, Long encKey) throws SQLException {
		for (EncounterDxInfo Dx: encDetails.getDxList()) {
			logInfo(LOG, "Dx Details: {}", Dx);
			GcmEncounterDx encDx = new GcmEncounterDx();
			encDx.setEncounterKey(encKey);
			encDx.setEoKey(Dx.getEoKey());
			encDx.setIcdDxCd(Dx.getIcdDxCd().toUpperCase());
			encDx.setProjKey(encDetails.getEncounterInfo().getProjKey());
			encDx.setCreateUserId(encDetails.getLoginUserId());
			encDx.setModifyUserId(encDetails.getLoginUserId());
			encDx.setCreateDateTime(new java.sql.Timestamp(System.currentTimeMillis()));
			encDx.setModifyDateTime(new java.sql.Timestamp(System.currentTimeMillis()));
			commonJpaDao.persist(encDx);			
		}
	}
	
	private void updateEncounter(EncounterDxDetails encDetails) throws SQLException,ParseException {
		String query = QUERY_UPDATE_ENC;
		EncounterInfo encounterInfo = encDetails.getEncounterInfo();
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_PROJ_KEY", encounterInfo.getProjKey());
		params.put("GCM_ENCOUNTER_KEY", encounterInfo.getEncounterKey());
		params.put("GCM_PROJECT_CONTENT_KEY", encounterInfo.getProjContentKey());
		if (StringUtils.isNotBlank(encDetails.getEncounterInfo().getDosFromDt())) {
			Date date1 = new SimpleDateFormat("MM-dd-yyyy").parse(encDetails.getEncounterInfo().getDosFromDt());
			params.put("DOS_FROM_DT", date1);
		}		
		if (StringUtils.isNotBlank(encDetails.getEncounterInfo().getDosThruDt())) {
			Date date2 = new SimpleDateFormat("MM-dd-yyyy").parse(encDetails.getEncounterInfo().getDosThruDt());
			params.put("DOS_THRU_DT", date2);
		}
		params.put("PAGE_NUMBER", encounterInfo.getPageNumber());
		params.put("RETRIEVAL_PROV_FLAG", encounterInfo.getRetrievalProvFlag());
		//params.put("GCM_EO_KEY", encounterInfo.getEoKey());
		params.put("PROV_FIRST_NAME", encounterInfo.getProvFirstName());
		params.put("PROV_LAST_NAME", encounterInfo.getProvLastName());
		params.put("PROV_NPI", encounterInfo.getProvNpi());
		params.put("MODIFY_USERID", encDetails.getLoginUserId());
		commonJpaDao.update(query, params);
		
		if(encounterInfo.getEoKeyList() == null || encounterInfo.getEoKeyList().isEmpty()) {
			deleteEoKey(encounterInfo);
		} else {
			params = new HashMap<>();
			params.put("enc_eo_cds", encounterInfo.getEoKeyList());
			params.put("gcm_encounter_key", encounterInfo.getEncounterKey());
			params.put("gcm_proj_key", encounterInfo.getProjKey());
			commonJpaService.update(DELETE_ENC_EO_BY_EO_CD, params);
			params = new HashMap<>();
			params.put("enc_eo_cds", encounterInfo.getEoKeyList());
			params.put("gcm_encounter_key", encounterInfo.getEncounterKey());
			params.put("gcm_proj_key", encounterInfo.getProjKey());
			params.put("create_userid",encDetails.getLoginUserId());
			params.put("create_date_time",new java.sql.Timestamp(System.currentTimeMillis()));
			params.put("modify_userid",encDetails.getLoginUserId());
			params.put("modify_date_time",new java.sql.Timestamp(System.currentTimeMillis()));
			commonJpaService.update(INSERT_ENC_EO_BY_EO_CD, params);
		}
		if(encDetails.getDeleteDxList() != null && !encDetails.getDeleteDxList().isEmpty()){
			deleteEncounterDx(encDetails, encounterInfo);
		}
		if(encDetails.getUpdateDxList() != null && !encDetails.getUpdateDxList().isEmpty()){
			updateEncounterDX(encDetails, encounterInfo);
		}
		if(encDetails.getDxList() != null && !encDetails.getDxList().isEmpty()){
			saveEncounterDx(encDetails, encDetails.getEncounterInfo().getEncounterKey());
		}
	}
	
	private void deleteEoKey(EncounterInfo encounterInfo) {
		String query = QUERY_DELETE_EO_KEY;
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_ENCOUNTER_KEY", encounterInfo.getEncounterKey());
		commonJpaDao.update(query, params);
	}
	
	private void updateEncounterDX(EncounterDxDetails encDetails, EncounterInfo encounterInfo){
		String query = QUERY_UPDATE_DX_BY_DXKEY;		
		
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_PROJ_KEY", encounterInfo.getProjKey());
		params.put("GCM_ENCOUNTER_KEY", encounterInfo.getEncounterKey());
		params.put("MODIFY_USERID", encDetails.getLoginUserId());
		
		for (EncounterDxInfo dx: encDetails.getUpdateDxList()) {
			params.put("ICD_DX_CD", dx.getIcdDxCd());
			params.put("GCM_EO_KEY", dx.getEoKey());			
			params.put("GCM_ENC_DX_KEY", dx.getEncDxKey());
			commonJpaService.update(query, params);
		}
	}
	
	public List<EncounterInfo> getEncounters(EncounterInputInfo encounterInputInfo) throws SQLException, ParseException {
		Map<String, Object> params = new HashMap<>();
		String queryString = QUERY_GET_ENCOUNTERS;
		String queryFetch = QUERY_FETCH_EO_KEY;
		params.put("GCM_PROJECT_CONTENT_KEY", encounterInputInfo.getProjContentKey());
		params.put("GCM_PROJ_KEY", encounterInputInfo.getProjKey());
		params.put("GCM_BUSINESS_FUNC_KEY", encounterInputInfo.getBusFuncKey());
		logInfo(LOG, "getEncounters started with filter: {}", encounterInputInfo.getProjContentKey());
		List<EncounterInfo> encounterInfoList = commonJpaService.getResultList(queryString, params,EncounterInfo.class);
		for(EncounterInfo encounterInfo : encounterInfoList) {
			params = new HashMap<>();
			params.put("GCM_ENCOUNTER_KEY", encounterInfo.getEncounterKey());
			encounterInfo.setEoKeyList(commonJpaService.getResultList(queryFetch, params,String.class));
		}
		return encounterInfoList;
	}
	
	public List<EncounterDxHccInfo> getEncounterwithDxHcc(EncounterInputInfo encounterInputInfo) throws SQLException, ParseException {
		Map<String, Object> params = new HashMap<>();
		String queryString = QUERY_GET_ENCDXHCC;
		String queryFetch = QUERY_FETCH_EO_KEY;
		params.put("GCM_PROJECT_CONTENT_KEY", encounterInputInfo.getProjContentKey());
		params.put("GCM_PROJ_KEY", encounterInputInfo.getProjKey());
		params.put("GCM_ENCOUNTER_KEY", encounterInputInfo.getEncounterKey());
		logInfo(LOG, "getEncounterwithDxHcc started with filter: {}", encounterInputInfo.getProjContentKey());
		List<EncounterDxHccInfo> encounterdxInfoList = commonJpaService.getResultList(queryString, params,EncounterDxHccInfo.class);
		for(EncounterDxHccInfo encounterdxInfo : encounterdxInfoList) {
			params = new HashMap<>();
			params.put("GCM_ENCOUNTER_KEY", encounterdxInfo.getEncounterKey());
			encounterdxInfo.setEoKeyList(commonJpaService.getResultList(queryFetch, params,String.class));
		}
		return encounterdxInfoList;
	}
	
	@Transactional
	public boolean deleteEncounter(EncounterInputInfo encounterInputInfo) throws SQLException, ParseException, IOException {
		if(!checkIsWorkItemActive(encounterInputInfo.getBusFuncVenKey(), encounterInputInfo.getProjKey(), encounterInputInfo.getUserKey())) {
			return false;
		}
		Map<String, Object> params = new HashMap<>();
		String queryString = QUERY_DELETE_ENCDX;
		params.put("GCM_PROJECT_CONTENT_KEY", encounterInputInfo.getProjContentKey());
		params.put("GCM_PROJ_KEY", encounterInputInfo.getProjKey());
		params.put("GCM_ENCOUNTER_KEY", encounterInputInfo.getEncounterKey());
		logInfo(LOG, "deleteEncounter started with filter: {} , Start time is: {}",
				encounterInputInfo.getProjContentKey(), now());
		logInfo(LOG, "deleteEncounter started with Proj content key: {} , Encounter Key: {}",
				encounterInputInfo.getProjContentKey(), encounterInputInfo.getEncounterKey());
		commonJpaDao.update(queryString, params);
		String query = QUERY_DELETE_EO_KEY;
		commonJpaDao.update(query, params);
		queryString = QUERY_DELETE_ENC;
		commonJpaDao.update(queryString, params);
		logInfo(LOG, "deleteEncounter  ended with filter: {},   End time is: {}",
				encounterInputInfo.getProjContentKey(), now());
		return true;
	}
	
	private void deleteEncounterDx(EncounterDxDetails encDetails, EncounterInfo encounterInfo){
		Map<String, Object> params = new HashMap<>();
		List<Long> DxKeys = new ArrayList<Long>();
		String queryString = QUERY_DELETE_DX_BY_DXKEY;
		params.put("GCM_PROJECT_CONTENT_KEY", encounterInfo.getProjContentKey());
		params.put("GCM_PROJ_KEY", encounterInfo.getProjKey());
		params.put("GCM_ENCOUNTER_KEY", encounterInfo.getEncounterKey());
		List<EncounterDxInfo> deleteDXList = encDetails.getDeleteDxList();
		logInfo(LOG, "deleteEncounterDx started with filter: {}, Start time is: {}", encounterInfo.getProjContentKey(),
				now());
		for(EncounterDxInfo dx : deleteDXList){
			DxKeys.add(dx.getEncDxKey());
		}
		params.put("GCM_ENC_DX_KEY", DxKeys);
		commonJpaDao.update(queryString, params);
		logInfo(LOG, "deleteEncounterDx started with filter: Proj content key is: {}, Encounter Key is: {}, Dx Keys are: {}", encounterInfo.getProjContentKey(), encounterInfo.getEncounterKey(), DxKeys);
		logInfo(LOG, "deleteEncounterDx ended with filter: {}, End time is: {}", encounterInfo.getProjContentKey(), now());
	}
	
	private boolean checkIsWorkItemActive(Long busFuncVenKey, Long projKey, Long userKey) {
		Map<String, Object> params = new HashMap<>();
		String queryString = QUERY_CHECK_IS_WORK_ITEM_ACITVE;
		params.put("GCM_PROJ_CONT_BUS_FUNC_VEN_KEY", busFuncVenKey);
		params.put("GCM_PROJ_KEY", projKey);
		params.put("GCM_USER_KEY", userKey);
		try {
			commonJpaDao.getResultObject(queryString, params, Long.class);
			return true;
		} catch (EmptyResultDataAccessException e) {
			return false;
		}
	}
	
}
