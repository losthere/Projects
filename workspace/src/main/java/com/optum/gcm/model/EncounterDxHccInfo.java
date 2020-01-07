package com.optum.gcm.model;

import java.util.List;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class EncounterDxHccInfo {

	@Column(value = "GCM_PROJECT_CONTENT_KEY") 
	private Long projContentKey;
	
	@Column(value = "GCM_ENCOUNTER_KEY")
	private Long encounterKey;
	
	@Column(value = "GCM_PROJ_CONTENT_BARCODE")  
	private String barcode;
	
	@Column(value = "GCM_PROJ_KEY")
	private Long projKey;
	
	@Column(value = "DOS_FROM_DT")  
	private String dosFromDt;
	
	@Column(value = "DOS_THRU_DT") 
	private String dosThruDt;
	
	@Column(value = "PAGE_NUMBER")   
	private String pageNumber;
	
	@Column(value = "GCM_PROJ_CONT_BUS_FUNC_VEN_KEY") 
	private Long projContBusFuncVenKey;
	
	@Column(value = "RETRIEVAL_PROV_FLAG")      
	private String retrievalProvFlag;
	
	@Column(value = "PROV_NPI")  
	private String provNpi;
	
	@Column(value = "PROV_FIRST_NAME")    
	private String provFirstName;
	
	@Column(value = "PROV_LAST_NAME")
	private String provLastName;
	
	@Column(value = "GCM_EO_KEY_ENC")     
	private String encEoKey;
	
	@Column(value = "GCM_BUSINESS_FUNC_KEY")
	private Long busFuncKey;
	
	@Column(value = "GCM_ENC_DX_KEY")
	private Long encDxKey;
	
	@Column(value = "ICD_DX_CD")
	private String icdDxCd;

	@Column(value = "GCM_EO_KEY_DX")
	private String encDxEoKey;
	
	@Column(value = "SHORT_DESC")
	private String icdDesc;
	
	@Column(value = "GCM_HCC_MODEL_CAT_V22")
	private String v22Hcc;
	
	@Column(value = "GCM_HCC_MODEL_CAT_V23")
	private String v23Hcc;

	@Column(value = "GCM_HCC_MODEL_CAT_V24")
	private String v24Hcc;
	
	@Column(value = "GCM_HCC_MODEL_CAT_RX")
	private String rxHcc;
	
	@Column(value = "GCM_HCC_MODEL_CAT_HHS")
	private String hhs;
	
	List<String> eoKeyList;
	
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


	public String getDosFromDt() {
		return dosFromDt;
	}

	public void setDosFromDt(String dosFromDt) {
		this.dosFromDt = dosFromDt;
	}

	public String getDosThruDt() {
		return dosThruDt;
	}

	public void setDosThruDt(String dosThruDt) {
		this.dosThruDt = dosThruDt;
	}


	public String getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(String pageNumber) {
		this.pageNumber = pageNumber;
	}

	public Long getProjContBusFuncVenKey() {
		return projContBusFuncVenKey;
	}

	public void setProjContBusFuncVenKey(Long projContBusFuncVenKey) {
		this.projContBusFuncVenKey = projContBusFuncVenKey;
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

	public Long getBusFuncKey() {
		return busFuncKey;
	}

	public void setBusFuncKey(Long busFuncKey) {
		this.busFuncKey = busFuncKey;
	}

	public Long getEncounterKey() {
		return encounterKey;
	}

	public void setEncounterKey(Long encounterKey) {
		this.encounterKey = encounterKey;
	}

	public String getEncEoKey() {
		return encEoKey;
	}

	public void setEncEoKey(String encEoKey) {
		this.encEoKey = encEoKey;
	}

	public Long getEncDxKey() {
		return encDxKey;
	}

	public void setEncDxKey(Long encDxKey) {
		this.encDxKey = encDxKey;
	}

	public String getIcdDxCd() {
		return icdDxCd;
	}

	public void setIcdDxCd(String icdDxCd) {
		this.icdDxCd = icdDxCd;
	}

	public String getEncDxEoKey() {
		return encDxEoKey;
	}

	public void setEncDxEoKey(String encDxEoKey) {
		this.encDxEoKey = encDxEoKey;
	}

	public String getIcdDesc() {
		return icdDesc;
	}

	public void setIcdDesc(String icdDesc) {
		this.icdDesc = icdDesc;
	}

	public String getV22Hcc() {
		return v22Hcc;
	}

	public void setV22Hcc(String v22Hcc) {
		this.v22Hcc = v22Hcc;
	}

	public String getRxHcc() {
		return rxHcc;
	}

	public void setRxHcc(String rxHcc) {
		this.rxHcc = rxHcc;
	}

	public String getHhs() {
		return hhs;
	}

	public void setHhs(String hhs) {
		this.hhs = hhs;
	}
	
	public List<String> getEoKeyList() {
		return eoKeyList;
	}

	public void setEoKeyList(List<String> eoKeyList) {
		this.eoKeyList = eoKeyList;
	}
	
	public String getV23Hcc() {
		return v23Hcc;
	}

	public void setV23Hcc(String v23Hcc) {
		this.v23Hcc = v23Hcc;
	}

	public String getV24Hcc() {
		return v24Hcc;
	}

	public void setV24Hcc(String v24Hcc) {
		this.v24Hcc = v24Hcc;
	}
}
