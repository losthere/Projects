package com.optum.gcm.model;

import java.util.Date;

import com.optum.gcm.common.annotation.Column;

public class CodingQAWorkItem {

	@Column("RECORD_LEVEL")
	private String recordLevel;

	@Column("GCM_ENCOUNTER_KEY")
	private Long coderEncounterKey;

	@Column("GCM_ENC_DX_KEY")
	private Long coderEncounterDxKey;

	@Column("STG_ENCOUNTER_KEY")
	private Long qaEncounterKey;

	@Column("STG_ENC_DX_KEY")
	private Long qaEncounterDXKey;

	@Column("CODER_DOS_FROM_DT")
	private Date coderDOSFromDate;

	@Column("CODER_DOS_THRU_DT")
	private Date coderDOSThruDate;

	@Column("CODER_PAGE_NUMBER")
	private String coderPageNum;

	@Column("CODER_RETRIEVAL_PROV_FLAG")
	private String coderRetProvFlag;

	@Column("CODER_PROV_NPI")
	private String coderProvNPI;

	@Column("CODER_PROV_FIRST_NAME")
	private String coderProvFirstName;

	@Column("CODER_PROV_LAST_NAME")
	private String coderProvLastName;

	@Column("CODER_ICD_DX_CD")
	private String coderICDDxCode;

	@Column("CODER_DX_EO_KEY")
	private String coderDxEOKey;

	@Column("CODER_DX_EO_DESC")
	private String coderDxEODesc;

	@Column("CODER_HCC_MODEL_CAT_V22")
	private String coderHccModelCatV22;
	
	@Column("CODER_HCC_MODEL_CAT_V23")
	private String coderHccModelCatV23;
	
	@Column("CODER_HCC_MODEL_CAT_V24")
	private String coderHccModelCatV24;

	@Column("CODER_HCC_MODEL_CAT_RX")
	private String coderHccModelCatRx;

	@Column("CODER_HCC_MODEL_CAT_HHS")
	private String coderHccModelCatHhs;

	@Column("QA_DOS_FROM_DT")
	private Date qaDOSFromDate;

	@Column("QA_DOS_THRU_DT")
	private Date qaDOSThruDate;

	@Column("QA_PAGE_NUMBER")
	private String qaPageNum;

	@Column("QA_RETRIEVAL_PROV_FLAG")
	private String qaRetProvFlag;

	@Column("QA_PROV_NPI")
	private String qaProvNPI;

	@Column("QA_PROV_FIRST_NAME")
	private String qaProvFirstName;

	@Column("QA_PROV_LAST_NAME")
	private String qaProvLastName;

	@Column("QA_ENC_COMMENT")
	private String qaEncComments;

	@Column("QA_ICD_DX_CD")
	private String qaICDDxCode;

	@Column("QA_DX_EO_KEY")
	private String qaDxEOKey;

	@Column("QA_DX_EO_DESC")
	private String qaDxEODesc;

	@Column("QA_HCC_MODEL_CAT_V22")
	private String qaHccModelCatV22;
	
	@Column("QA_HCC_MODEL_CAT_V23")
	private String qaHccModelCatV23;
	
	@Column("QA_HCC_MODEL_CAT_V24")
	private String qaHccModelCatV24;

	@Column("QA_HCC_MODEL_CAT_RX")
	private String qaHccModelCatRx;

	@Column("QA_HCC_MODEL_CAT_HHS")
	private String qaHccModelCatHhs;

	@Column("QA_ACTION_CD_ENC")
	private String qaEncActionCd;

	@Column("QA_ACTION_CD_ENC_DX")
	private String qaDxActionCd;

	@Column("QA_SHORT_DESC")
	private String icdDesc;

	@Column("CODER_SHORT_DESC")
	private String coderIcdDesc;
	
	@Column("CODER_ENC_EO_KEY_LIST")
	private String coderEoKeyListRes;
	
	@Column("QA_ENC_EO_KEY_LIST")
	private String qaEoKeyList;
	
	private transient String[] coderEoKeyList;
	
	private transient String[] qaEoKeyListResponse;

	public String getIcdDesc() {
		return icdDesc;
	}

	public void setIcdDesc(String icdDesc) {
		this.icdDesc = icdDesc;
	}

	public String getCoderIcdDesc() {
		return coderIcdDesc;
	}

	public void setCoderIcdDesc(String coderIcdDesc) {
		this.coderIcdDesc = coderIcdDesc;
	}

	public String getRecordLevel() {
		return recordLevel;
	}

	public void setRecordLevel(String recordLevel) {
		this.recordLevel = recordLevel;
	}

	public Long getCoderEncounterKey() {
		return coderEncounterKey;
	}

	public void setCoderEncounterKey(Long coderEncounterKey) {
		this.coderEncounterKey = coderEncounterKey;
	}

	public Long getCoderEncounterDxKey() {
		return coderEncounterDxKey;
	}

	public void setCoderEncounterDxKey(Long coderEncounterDxKey) {
		this.coderEncounterDxKey = coderEncounterDxKey;
	}

	public Long getQaEncounterKey() {
		return qaEncounterKey;
	}

	public void setQaEncounterKey(Long qaEncounterKey) {
		this.qaEncounterKey = qaEncounterKey;
	}

	public Long getQaEncounterDXKey() {
		return qaEncounterDXKey;
	}

	public void setQaEncounterDXKey(Long qaEncounterDXKey) {
		this.qaEncounterDXKey = qaEncounterDXKey;
	}

	public Date getCoderDOSFromDate() {
		return coderDOSFromDate != null ? (Date) coderDOSFromDate.clone() : null;
	}

	public void setCoderDOSFromDate(Date coderDOSFromDate) {
		this.coderDOSFromDate = (coderDOSFromDate != null) ? (Date) coderDOSFromDate.clone() : null;
	}

	public Date getCoderDOSThruDate() {
		return coderDOSThruDate != null ? (Date) coderDOSThruDate.clone() : null;
	}

	public void setCoderDOSThruDate(Date coderDOSThruDate) {
		this.coderDOSThruDate = (coderDOSThruDate != null) ? (Date) coderDOSThruDate.clone() : null;
	}

	public String getCoderPageNum() {
		return coderPageNum;
	}

	public void setCoderPageNum(String coderPageNum) {
		this.coderPageNum = coderPageNum;
	}

	public String getCoderRetProvFlag() {
		return coderRetProvFlag;
	}

	public void setCoderRetProvFlag(String coderRetProvFlag) {
		this.coderRetProvFlag = coderRetProvFlag;
	}

	public String getCoderProvNPI() {
		return coderProvNPI;
	}

	public void setCoderProvNPI(String coderProvNPI) {
		this.coderProvNPI = coderProvNPI;
	}

	public String getCoderProvFirstName() {
		return coderProvFirstName;
	}

	public void setCoderProvFirstName(String coderProvFirstName) {
		this.coderProvFirstName = coderProvFirstName;
	}

	public String getCoderProvLastName() {
		return coderProvLastName;
	}

	public void setCoderProvLastName(String coderProvLastName) {
		this.coderProvLastName = coderProvLastName;
	}

	public String getCoderICDDxCode() {
		return coderICDDxCode;
	}

	public void setCoderICDDxCode(String coderICDDxCode) {
		this.coderICDDxCode = coderICDDxCode;
	}

	public String getCoderDxEOKey() {
		return coderDxEOKey;
	}

	public void setCoderDxEOKey(String coderDxEOKey) {
		this.coderDxEOKey = coderDxEOKey;
	}

	public String getCoderDxEODesc() {
		return coderDxEODesc;
	}

	public void setCoderDxEODesc(String coderDxEODesc) {
		this.coderDxEODesc = coderDxEODesc;
	}

	public String getCoderHccModelCatV22() {
		return coderHccModelCatV22;
	}

	public void setCoderHccModelCatV22(String coderHccModelCatV22) {
		this.coderHccModelCatV22 = coderHccModelCatV22;
	}

	public String getCoderHccModelCatRx() {
		return coderHccModelCatRx;
	}

	public void setCoderHccModelCatRx(String coderHccModelCatRx) {
		this.coderHccModelCatRx = coderHccModelCatRx;
	}

	public String getCoderHccModelCatHhs() {
		return coderHccModelCatHhs;
	}

	public void setCoderHccModelCatHhs(String coderHccModelCatHhs) {
		this.coderHccModelCatHhs = coderHccModelCatHhs;
	}

	public Date getQaDOSFromDate() {
		return qaDOSFromDate != null ? (Date) qaDOSFromDate.clone() : null;
	}

	public void setQaDOSFromDate(Date qaDOSFromDate) {
		this.qaDOSFromDate = (qaDOSFromDate != null) ? (Date) qaDOSFromDate.clone() : null;
	}

	public Date getQaDOSThruDate() {
		return qaDOSThruDate != null ? (Date) qaDOSThruDate.clone() : null;
	}

	public void setQaDOSThruDate(Date qaDOSThruDate) {
		this.qaDOSThruDate = (qaDOSThruDate != null) ? (Date) qaDOSThruDate.clone() : null;
	}

	public String getQaPageNum() {
		return qaPageNum;
	}

	public void setQaPageNum(String qaPageNum) {
		this.qaPageNum = qaPageNum;
	}

	public String getQaRetProvFlag() {
		return qaRetProvFlag;
	}

	public void setQaRetProvFlag(String qaRetProvFlag) {
		this.qaRetProvFlag = qaRetProvFlag;
	}

	public String getQaProvNPI() {
		return qaProvNPI;
	}

	public void setQaProvNPI(String qaProvNPI) {
		this.qaProvNPI = qaProvNPI;
	}

	public String getQaProvFirstName() {
		return qaProvFirstName;
	}

	public void setQaProvFirstName(String qaProvFirstName) {
		this.qaProvFirstName = qaProvFirstName;
	}

	public String getQaProvLastName() {
		return qaProvLastName;
	}

	public void setQaProvLastName(String qaProvLastName) {
		this.qaProvLastName = qaProvLastName;
	}

/*	public String getQaEncEOKey() {
		return qaEncEOKey;
	}

	public void setQaEncEOKey(String qaEncEOKey) {
		this.qaEncEOKey = qaEncEOKey;
	}

	public String getQaEncEODesc() {
		return qaEncEODesc;
	}

	public void setQaEncEODesc(String qaEncEODesc) {
		this.qaEncEODesc = qaEncEODesc;
	}*/

	public String getQaEncComments() {
		return qaEncComments;
	}

	public void setQaEncComments(String qaEncComments) {
		this.qaEncComments = qaEncComments;
	}

	public String getQaICDDxCode() {
		return qaICDDxCode;
	}

	public void setQaICDDxCode(String qaICDDxCode) {
		this.qaICDDxCode = qaICDDxCode;
	}

	public String getQaDxEOKey() {
		return qaDxEOKey;
	}

	public void setQaDxEOKey(String qaDxEOKey) {
		this.qaDxEOKey = qaDxEOKey;
	}

	public String getQaDxEODesc() {
		return qaDxEODesc;
	}

	public void setQaDxEODesc(String qaDxEODesc) {
		this.qaDxEODesc = qaDxEODesc;
	}

	public String getQaHccModelCatV22() {
		return qaHccModelCatV22;
	}

	public void setQaHccModelCatV22(String qaHccModelCatV22) {
		this.qaHccModelCatV22 = qaHccModelCatV22;
	}

	public String getQaHccModelCatRx() {
		return qaHccModelCatRx;
	}

	public void setQaHccModelCatRx(String qaHccModelCatRx) {
		this.qaHccModelCatRx = qaHccModelCatRx;
	}

	public String getQaHccModelCatHhs() {
		return qaHccModelCatHhs;
	}

	public void setQaHccModelCatHhs(String qaHccModelCatHhs) {
		this.qaHccModelCatHhs = qaHccModelCatHhs;
	}

	public String getQaEncActionCd() {
		return qaEncActionCd;
	}

	public void setQaEncActionCd(String qaEncActionCd) {
		this.qaEncActionCd = qaEncActionCd;
	}

	public String getQaDxActionCd() {
		return qaDxActionCd;
	}

	public void setQaDxActionCd(String qaDxActionCd) {
		this.qaDxActionCd = qaDxActionCd;
	}

	public String getCoderEoKeyListRes() {
		return coderEoKeyListRes;
	}

	public void setCoderEoKeyListRes(String coderEoKeyListRes) {
		this.coderEoKeyListRes = coderEoKeyListRes;
	}

	public String getQaEoKeyList() {
		return qaEoKeyList;
	}

	public void setQaEoKeyList(String qaEoKeyList) {
		this.qaEoKeyList = qaEoKeyList;
	}

	public String[] getQaEoKeyListResponse() {
		return qaEoKeyListResponse;
	}

	public void setQaEoKeyListResponse(String[] qaEoKeyListResponse) {
		this.qaEoKeyListResponse = qaEoKeyListResponse;
	}

	public String[] getCoderEoKeyList() {
		return coderEoKeyList;
	}

	public void setCoderEoKeyList(String[] coderEoKeyList) {
		this.coderEoKeyList = coderEoKeyList;
	}
	
	public String getCoderHccModelCatV23() {
		return coderHccModelCatV23;
	}

	public void setCoderHccModelCatV23(String coderHccModelCatV23) {
		this.coderHccModelCatV23 = coderHccModelCatV23;
	}

	public String getCoderHccModelCatV24() {
		return coderHccModelCatV24;
	}

	public void setCoderHccModelCatV24(String coderHccModelCatV24) {
		this.coderHccModelCatV24 = coderHccModelCatV24;
	}

	public String getQaHccModelCatV23() {
		return qaHccModelCatV23;
	}

	public void setQaHccModelCatV23(String qaHccModelCatV23) {
		this.qaHccModelCatV23 = qaHccModelCatV23;
	}

	public String getQaHccModelCatV24() {
		return qaHccModelCatV24;
	}

	public void setQaHccModelCatV24(String qaHccModelCatV24) {
		this.qaHccModelCatV24 = qaHccModelCatV24;
	}
	
	
}
