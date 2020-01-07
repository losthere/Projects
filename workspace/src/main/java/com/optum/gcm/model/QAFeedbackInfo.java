package com.optum.gcm.model;

import java.util.Date;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class QAFeedbackInfo {

	@Column("RECORD_LEVEL")
	private String recordLevel;

	@Column(value = "CODER_ENCOUNTER_KEY")
	private Long coderEncounterKey;

	@Column(value = "CODER_DOS_FROM_DT")
	private Date coderDOSFromDate;

	@Column(value = "CODER_DOS_THRU_DT")
	private Date coderDOSThruDate;

	@Column(value = "CODER_PAGE_NUMBER")
	private String coderPageNum;

	@Column(value = "CODER_RETRIEVAL_PROV_FLAG")
	private String coderRetProvFlag;

	@Column(value = "CODER_PROV_NPI")
	private String coderProvNPI;

	@Column(value = "CODER_PROV_FIRST_NAME")
	private String coderProvFirstName;

	@Column(value = "CODER_PROV_LAST_NAME")
	private String coderProvLastName;

	@Column(value = "CODER_ENC_EO_KEY_LIST")
	private String coderEncEoKeyList;

	@Column(value = "CODER_ENC_DX_KEY")
	private Long coderEncounterDxKey;

	@Column(value = "CODER_ICD_DX_CD")
	private String coderICDDxCode;

	@Column(value = "CODER_HCC_MODEL_CAT_V22")
	private String coderRxV22;
	
	@Column(value = "CODER_HCC_MODEL_CAT_V23")
	private String coderRxV23;
	
	@Column(value = "CODER_HCC_MODEL_CAT_V24")
	private String coderRxV24;

	@Column(value = "CODER_HCC_MODEL_CAT_RX")
	private String coderRxHcc;

	@Column("CODER_HCC_MODEL_CAT_HHS")
	private String coderHccModelCatHhs;

	@Column(value = "CODER_DX_EO_KEY")
	private String coderDxEoKey;

	@Column(value = "CODER_DX_EO_DESC")
	private String coderDxEoDesc;

	@Column(value = "QA_ENCOUNTER_KEY")
	private Long qaEncounterKey;

	@Column(value = "QA_DOS_FROM_DT")
	private Date qaDOSFromDate;

	@Column(value = "QA_DOS_THRU_DT")
	private Date qaDOSThruDate;

	@Column(value = "QA_PAGE_NUMBER")
	private String qaPageNum;

	@Column(value = "QA_RETRIEVAL_PROV_FLAG")
	private String qaRetProvFlag;

	@Column(value = "QA_PROV_NPI")
	private String qaProvNPI;

	@Column(value = "QA_PROV_FIRST_NAME")
	private String qaProvFirstName;

	@Column(value = "QA_PROV_LAST_NAME")
	private String qaProvLastName;

	@Column(value = "QA_ENC_EO_KEY_LIST")
	private String qaEncEoKeyList;

	@Column(value = "QA_ENC_COMMENT")
	private String qaEncComment;

	@Column(value = "QA_ACTION_CD_ENC")
	private String qaEncActionCd;

	@Column(value = "QA_ENC_DX_KEY")
	private Long qaEncounterDXKey;

	@Column(value = "QA_ICD_DX_CD")
	private String qaICDDxCode;

	@Column(value = "QA_HCC_MODEL_CAT_V22")
	private String qaRxV22;
	
	@Column(value = "QA_HCC_MODEL_CAT_V23")
	private String qaRxV23;
	
	@Column(value = "QA_HCC_MODEL_CAT_V24")
	private String qaRxV24;

	@Column(value = "QA_HCC_MODEL_CAT_RX")
	private String qaRxHcc;

	@Column("QA_HCC_MODEL_CAT_HHS")
	private String qaHccModelCatHhs;

	@Column(value = "QA_DX_EO_KEY")
	private String qaDxEoKey;

	@Column(value = "QA_DX_EO_DESC")
	private String qaDxEoDesc;

	@Column(value = "QA_ACTION_CD_ENC_DX")
	private String qaEncDxActionCd;
	
	private transient String[] eoKeyList;
	
	private transient String[] eoKeyListQA;

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

	public Long getCoderEncounterDxKey() {
		return coderEncounterDxKey;
	}

	public void setCoderEncounterDxKey(Long coderEncounterDxKey) {
		this.coderEncounterDxKey = coderEncounterDxKey;
	}

	public String getCoderICDDxCode() {
		return coderICDDxCode;
	}

	public void setCoderICDDxCode(String coderICDDxCode) {
		this.coderICDDxCode = coderICDDxCode;
	}

	public String getCoderRxV22() {
		return coderRxV22;
	}

	public void setCoderRxV22(String coderRxV22) {
		this.coderRxV22 = coderRxV22;
	}

	public String getCoderRxHcc() {
		return coderRxHcc;
	}

	public void setCoderRxHcc(String coderRxHcc) {
		this.coderRxHcc = coderRxHcc;
	}

	public String getCoderHccModelCatHhs() {
		return coderHccModelCatHhs;
	}

	public void setCoderHccModelCatHhs(String coderHccModelCatHhs) {
		this.coderHccModelCatHhs = coderHccModelCatHhs;
	}

	public String getCoderDxEoKey() {
		return coderDxEoKey;
	}

	public void setCoderDxEoKey(String coderDxEoKey) {
		this.coderDxEoKey = coderDxEoKey;
	}

	public String getCoderDxEoDesc() {
		return coderDxEoDesc;
	}

	public void setCoderDxEoDesc(String coderDxEoDesc) {
		this.coderDxEoDesc = coderDxEoDesc;
	}

	public Long getQaEncounterKey() {
		return qaEncounterKey;
	}

	public void setQaEncounterKey(Long qaEncounterKey) {
		this.qaEncounterKey = qaEncounterKey;
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

	public String getQaEncActionCd() {
		return qaEncActionCd;
	}

	public void setQaEncActionCd(String qaEncActionCd) {
		this.qaEncActionCd = qaEncActionCd;
	}

	public Long getQaEncounterDXKey() {
		return qaEncounterDXKey;
	}

	public void setQaEncounterDXKey(Long qaEncounterDXKey) {
		this.qaEncounterDXKey = qaEncounterDXKey;
	}

	public String getQaICDDxCode() {
		return qaICDDxCode;
	}

	public void setQaICDDxCode(String qaICDDxCode) {
		this.qaICDDxCode = qaICDDxCode;
	}

	public String getQaRxV22() {
		return qaRxV22;
	}

	public void setQaRxV22(String qaRxV22) {
		this.qaRxV22 = qaRxV22;
	}

	public String getQaRxHcc() {
		return qaRxHcc;
	}

	public void setQaRxHcc(String qaRxHcc) {
		this.qaRxHcc = qaRxHcc;
	}

	public String getQaHccModelCatHhs() {
		return qaHccModelCatHhs;
	}

	public void setQaHccModelCatHhs(String qaHccModelCatHhs) {
		this.qaHccModelCatHhs = qaHccModelCatHhs;
	}

	public String getQaDxEoKey() {
		return qaDxEoKey;
	}

	public void setQaDxEoKey(String qaDxEoKey) {
		this.qaDxEoKey = qaDxEoKey;
	}

	public String getQaDxEoDesc() {
		return qaDxEoDesc;
	}

	public void setQaDxEoDesc(String qaDxEoDesc) {
		this.qaDxEoDesc = qaDxEoDesc;
	}

	public String getQaEncDxActionCd() {
		return qaEncDxActionCd;
	}

	public void setQaEncDxActionCd(String qaEncDxActionCd) {
		this.qaEncDxActionCd = qaEncDxActionCd;
	}

	public String getQaEncComment() {
		return qaEncComment;
	}

	public void setQaEncComment(String qaEncComment) {
		this.qaEncComment = qaEncComment;
	}

	public String[] getEoKeyList() {
		return eoKeyList;
	}

	public void setEoKeyList(String[] eoKeyList) {
		this.eoKeyList = eoKeyList;
	}

	public String[] getEoKeyListQA() {
		return eoKeyListQA;
	}

	public void setEoKeyListQA(String[] eoKeyListQA) {
		this.eoKeyListQA = eoKeyListQA;
	}

	public String getCoderEncEoKeyList() {
		return coderEncEoKeyList;
	}

	public void setCoderEncEoKeyList(String coderEncEoKeyList) {
		this.coderEncEoKeyList = coderEncEoKeyList;
	}

	public String getCoderRxV23() {
		return coderRxV23;
	}

	public void setCoderRxV23(String coderRxV23) {
		this.coderRxV23 = coderRxV23;
	}

	public String getCoderRxV24() {
		return coderRxV24;
	}

	public void setCoderRxV24(String coderRxV24) {
		this.coderRxV24 = coderRxV24;
	}
	
	public String getQaEncEoKeyList() {
		return qaEncEoKeyList;
	}

	public void setQaEncEoKeyList(String qaEncEoKeyList) {
		this.qaEncEoKeyList = qaEncEoKeyList;
	}

	public String getQaRxV23() {
		return qaRxV23;
	}

	public void setQaRxV23(String qaRxV23) {
		this.qaRxV23 = qaRxV23;
	}
	
	public String getQaRxV24() {
		return qaRxV24;
	}

	public void setQaRxV24(String qaRxV24) {
		this.qaRxV24 = qaRxV24;
	}
	
}
