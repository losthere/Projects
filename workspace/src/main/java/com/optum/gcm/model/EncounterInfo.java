package com.optum.gcm.model;

import java.util.List;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class EncounterInfo {

	@Column(value="GCM_PROJECT_CONTENT_KEY") 
	private Long projContentKey;
	
	@Column(value = "GCM_ENCOUNTER_KEY")
	private Long encounterKey;
	
	@Column(value="GCM_PROJ_CONTENT_BARCODE")  
	private String barcode;
	
	@Column(value="GCM_PROJ_KEY")
	private Long projKey;
	
	@Column(value="DOS_FROM_DT")  
	private String dosFromDt;
	
	@Column(value="DOS_THRU_DT") 
	private String dosThruDt;
	
	@Column(value="PAGE_NUMBER")   
	private String pageNumber;
	
	@Column(value="GCM_PROJ_CONT_BUS_FUNC_VEN_KEY") 
	private Long projContBusFuncVenKey;
	
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
	
	@Column(value="GCM_BUSINESS_FUNC_KEY")
	private Long busFuncKey;
	
	@Column(value="GCM_MOD_BUSINESS_FUNC_KEY")
	private Long modBusFuncKey;
	
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

	public String getEoKey() {
		return eoKey;
	}

	public void setEoKey(String eoKey) {
		this.eoKey = eoKey;
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

	public Long getEncounterKey() {
		return encounterKey;
	}

	public void setEncounterKey(Long encounterKey) {
		this.encounterKey = encounterKey;
	}

	public List<String> getEoKeyList() {
		return eoKeyList;
	}

	public void setEoKeyList(List<String> eoKeyList) {
		this.eoKeyList = eoKeyList;
	}

	
}
