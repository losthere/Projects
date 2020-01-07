package com.optum.gcm.model;

import java.util.Date;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

/**
 * @author pmule
 *
 */

@Table("GCM_ENCOUNTER")
public class GcmEncounter extends BaseModel {
	
	@Column(value="GCM_ENCOUNTER_KEY", sequence = "GCM_ENCOUNTER_SEQ")    
	private Long encounterKey;
	
	@Column(value="GCM_PROJECT_CONTENT_KEY") 
	private Long projContentKey;
	
	@Column(value="GCM_PROJ_CONTENT_BARCODE")  
	private String barcode;
	
	@Column(value="GCM_PROJ_KEY")
	private Long projKey;
	
	@Column(value="DOS_FROM_DT")  
	private Date dosFromDt;
	
	@Column(value="DOS_THRU_DT") 
	private Date dosThruDt;
	
	@Column(value="PAGE_NUMBER")   
	private String pageNumber;
	
	@Column(value="IS_INACTIVE_ENC_SW")  
	private String isInactiveEncSw;	
	
	@Column(value="INACTIVE_ENC_DATE_TIME") 
	private Date inactiveEncDateTime;
	
	@Column(value="INACTIVE_BY_USERID")   
	private String isInactiveByUserId;
	
	@Column(value="GCM_PROJ_CONT_BUS_FUNC_VEN_KEY") 
	private Long projContBusFuncVenKey;
	
	@Column(value="GCM_MOD_PROJ_CONT_BF_VEN_KEY")  
	private Long modProjContBusFuncVenKey;
	
	@Column(value="RETRIEVAL_PROV_FLAG")      
	private String retrievalProvFlag;
	
	@Column(value="PROV_NPI")  
	private String provNpi;
	
	@Column(value="PROV_FIRST_NAME")    
	private String provFirstName;
	
	@Column(value="PROV_LAST_NAME")
	private String provLastName;
	
	@Column(value="GCM_EO_KEY")     
	private String eoKey;
	
	@Column(value="GCM_PARENT_ENCOUNTER_KEY") 
	private Long parentEncounterKey;
	
	@Column(value="GCM_MOD_BUSINESS_FUNC_KEY")  
	private Long modBusFuncKey;
	
	@Column(value="GCM_BUSINESS_FUNC_KEY")
	private Long busFuncKey;
	
	@Column(value="QA_ACTION_CD")   
	private String qaActionCd;

	public Long getEncounterKey() {
		return encounterKey;
	}

	public void setEncounterKey(Long encounterKey) {
		this.encounterKey = encounterKey;
	}

	public Long getProjContentKey() {
		return projContentKey;
	}

	public void setProjContentKey(Long projContentKey) {
		this.projContentKey = projContentKey;
	}

	public String getBarcode() {
		return barcode;
	}

	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}

	public Long getProjKey() {
		return projKey;
	}

	public void setProjKey(Long projKey) {
		this.projKey = projKey;
	}

	public Date getDosFromDt() {
		return dosFromDt != null ? (Date)dosFromDt.clone() : null;
	}

	public void setDosFromDt(Date dosFromDt) {
		this.dosFromDt = (dosFromDt != null) ? (Date) dosFromDt.clone() : null;
	}

	public Date getDosThruDt() {
		return dosThruDt != null ? (Date)dosThruDt.clone() : null;
	}

	public void setDosThruDt(Date dosThruDt) {
		this.dosThruDt = (dosThruDt != null) ? (Date)dosThruDt.clone() : null;
	}

	public String getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(String pageNumber) {
		this.pageNumber = pageNumber;
	}

	public String getIsInactiveEncSw() {
		return isInactiveEncSw;
	}

	public void setIsInactiveEncSw(String isInactiveEncSw) {
		this.isInactiveEncSw = isInactiveEncSw;
	}

	public Date getInactiveEncDateTime() {
		return (Date) inactiveEncDateTime.clone();
	}

	public void setInactiveEncDateTime(Date inactiveEncDateTime) {
		this.inactiveEncDateTime = (Date) inactiveEncDateTime.clone();
	}

	public String getIsInactiveByUserId() {
		return isInactiveByUserId;
	}

	public void setIsInactiveByUserId(String isInactiveByUserId) {
		this.isInactiveByUserId = isInactiveByUserId;
	}

	public Long getProjContBusFuncVenKey() {
		return projContBusFuncVenKey;
	}

	public void setProjContBusFuncVenKey(Long projContBusFuncVenKey) {
		this.projContBusFuncVenKey = projContBusFuncVenKey;
	}

	public Long getModProjContBusFuncVenKey() {
		return modProjContBusFuncVenKey;
	}

	public void setModProjContBusFuncVenKey(Long modProjContBusFuncVenKey) {
		this.modProjContBusFuncVenKey = modProjContBusFuncVenKey;
	}

	public String getRetrievalProvFlag() {
		return retrievalProvFlag;
	}

	public void setRetrievalProvFlag(String retrievalProvFlag) {
		this.retrievalProvFlag = retrievalProvFlag;
	}

	public String getProvNpi() {
		return provNpi;
	}

	public void setProvNpi(String provNpi) {
		this.provNpi = provNpi;
	}

	public String getProvFirstName() {
		return provFirstName;
	}

	public void setProvFirstName(String provFirstName) {
		this.provFirstName = provFirstName;
	}

	public String getProvLastName() {
		return provLastName;
	}

	public void setProvLastName(String provLastName) {
		this.provLastName = provLastName;
	}

	public String getEoKey() {
		return eoKey;
	}

	public void setEoKey(String eoKey) {
		this.eoKey = eoKey;
	}

	public Long getParentEncounterKey() {
		return parentEncounterKey;
	}

	public void setParentEncounterKey(Long parentEncounterKey) {
		this.parentEncounterKey = parentEncounterKey;
	}

	public Long getBusFuncKey() {
		return busFuncKey;
	}

	public void setBusFuncKey(Long busFuncKey) {
		this.busFuncKey = busFuncKey;
	}

	public Long getModBusFuncKey() {
		return modBusFuncKey;
	}

	public void setModBusFuncKey(Long modBusFuncKey) {
		this.modBusFuncKey = modBusFuncKey;
	}

	public String getQaActionCd() {
		return qaActionCd;
	}

	public void setQaActionCd(String qaActionCd) {
		this.qaActionCd = qaActionCd;
	}

}
