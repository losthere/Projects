package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

public class ValidateBarcodeResult {
	@Column("GCM_PROGRAM_KEY")
	private Integer programKey;
	@Column("GCM_BUS_FUNC_STATUS")
	private String busFuncStatus;
	@Column("GCM_PROJ_CONTENT_BARCODE")
	private String projContBarCode;
	@Column("INPUT_BARCODE")
	private String inputBarcode;
	@Column("WORK_ITEMS_CNT")
	private Integer workItemsCnt;
	@Column("GCM_HP_KEY")
	private Integer hpKey;
	@Column("GCM_PROJ_KEY")
	private Integer projKey;
	@Column("GCM_PROJECT_YEAR")
	private Integer ProjYear;
	@Column("ROW_NUM")
	private Integer rowNum;
	@Column("HAS_PENDING_REQ")
	private String hasPendReq;
	public Integer getProgramKey() {
		return programKey;
	}
	public void setProgramKey(Integer programKey) {
		this.programKey = programKey;
	}
	public String getBusFuncStatus() {
		return busFuncStatus;
	}
	public void setBusFuncStatus(String busFuncStatus) {
		this.busFuncStatus = busFuncStatus;
	}
	public String getProjContBarCode() {
		return projContBarCode;
	}
	public void setProjContBarCode(String projContBarCode) {
		this.projContBarCode = projContBarCode;
	}
	public String getInputBarcode() {
		return inputBarcode;
	}
	public void setInputBarcode(String inputBarcode) {
		this.inputBarcode = inputBarcode;
	}
	public Integer getWorkItemsCnt() {
		return workItemsCnt;
	}
	public void setWorkItemsCnt(Integer workItemsCnt) {
		this.workItemsCnt = workItemsCnt;
	}
	public Integer getHpKey() {
		return hpKey;
	}
	public void setHpKey(Integer hpKey) {
		this.hpKey = hpKey;
	}
	public Integer getProjKey() {
		return projKey;
	}
	public void setProjKey(Integer projKey) {
		this.projKey = projKey;
	}
	public Integer getProjYear() {
		return ProjYear;
	}
	public void setProjYear(Integer projYear) {
		ProjYear = projYear;
	}
	public Integer getRowNum() {
		return rowNum;
	}
	public void setRowNum(Integer rowNum) {
		this.rowNum = rowNum;
	}
	public String getHasPendReq() {
		return hasPendReq;
	}
	public void setHasPendReq(String hasPendReq) {
		this.hasPendReq = hasPendReq;
	}
}
