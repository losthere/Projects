package com.optum.gcm.model;

import java.sql.Timestamp;

import com.optum.gcm.common.annotation.Column;

public class IcdDxCode {

	@Column("GCM_ICD_KEY")
	private Long gcmIcdKey;

	@Column("ICD_DX_CD")
	private String icdDxCd;

	@Column("ICD_SHORT_DESC")
	private String icdShortDesc;

	@Column("EFF_FROM_DT")
	private Timestamp effFromDt;

	@Column("EFF_THRU_DT")
	private Timestamp effThruDt;

	@Column("GCM_CODE_VALID_START_DATE")
	private Timestamp gcmCodeValidStartDate;

	@Column("GCM_CODE_VALID_END_DATE")
	private Timestamp gcmCodeValidEndDate;

	@Column("GCM_HCC_MODEL_TYPE")
	private String gcmHccModelType;

	@Column("GCM_HCC_MODEL_CAT")
	private String gcmHccModelCat;

	@Column("HCC_SHORT_DESC")
	private String hccShortDesc;
	
	@Column("GCM_BUSINESS_SEGMENT")
	private String gcmBusinessSegment;
	
	public Long getGcmIcdKey() {
		return gcmIcdKey;
	}

	public void setGcmIcdKey(Long gcmIcdKey) {
		this.gcmIcdKey = gcmIcdKey;
	}

	public String getIcdDxCd() {
		return icdDxCd;
	}

	public void setIcdDxCd(String icdDxCd) {
		this.icdDxCd = icdDxCd;
	}

	public String getIcdShortDesc() {
		return icdShortDesc;
	}

	public void setIcdShortDesc(String icdShortDesc) {
		this.icdShortDesc = icdShortDesc;
	}

	public Timestamp getEffFromDt() {
		return effFromDt != null ? (Timestamp)effFromDt.clone() : null;
	}

	public void setEffFromDt(Timestamp effFromDt) {
		this.effFromDt = (effFromDt != null) ? (Timestamp)effFromDt.clone() : null;
	}

	public Timestamp getEffThruDt() {
		return effThruDt != null ? (Timestamp)effThruDt.clone() : null;
	}

	public void setEffThruDt(Timestamp effThruDt) {
		this.effThruDt = (effThruDt != null) ? (Timestamp)effThruDt.clone() : null;
	}

	public Timestamp getGcmCodeValidStartDate() {
		return gcmCodeValidStartDate != null ? (Timestamp)gcmCodeValidStartDate.clone() : null;
	}

	public void setGcmCodeValidStartDate(Timestamp gcmCodeValidStartDate) {
		this.gcmCodeValidStartDate = (gcmCodeValidStartDate != null) ? (Timestamp)gcmCodeValidStartDate.clone() : null;
	}

	public Timestamp getGcmCodeValidEndDate() {
		return gcmCodeValidEndDate != null ? (Timestamp)gcmCodeValidEndDate.clone() : null;
	}

	public void setGcmCodeValidEndDate(Timestamp gcmCodeValidEndDate) {
		this.gcmCodeValidEndDate = (gcmCodeValidEndDate != null) ? (Timestamp)gcmCodeValidEndDate.clone() : null;
	}

	public String getGcmHccModelType() {
		return gcmHccModelType;
	}

	public void setGcmHccModelType(String gcmHccModelType) {
		this.gcmHccModelType = gcmHccModelType;
	}

	public String getGcmHccModelCat() {
		return gcmHccModelCat;
	}

	public void setGcmHccModelCat(String gcmHccModelCat) {
		this.gcmHccModelCat = gcmHccModelCat;
	}

	public String getHccShortDesc() {
		return hccShortDesc;
	}

	public void setHccShortDesc(String hccShortDesc) {
		this.hccShortDesc = hccShortDesc;
	}

	public String getGcmBusinessSegment() {
		return gcmBusinessSegment;
	}

	public void setGcmBusinessSegment(String gcmBusinessSegment) {
		this.gcmBusinessSegment = gcmBusinessSegment;
	}

}
