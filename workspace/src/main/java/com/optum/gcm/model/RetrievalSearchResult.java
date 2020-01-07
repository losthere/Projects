package com.optum.gcm.model;

import java.sql.Timestamp;

import com.optum.gcm.common.annotation.Column;

public class RetrievalSearchResult {
	@Column("GCM_PROJ_KEY")
	private Long projKey;
	@Column("GCM_PROJ_NAME")
	private String projName;
	@Column("GCM_PROGRAM_NAME")
	private String program;
	@Column("GCM_PROGRAM_KEY")
	private Long programKey;
	@Column("GCM_PROJECT_YEAR")
	private Integer projYear;
	@Column("BARCODE_COUNT")
	private Integer barcodeCnt;
	@Column("EXTRACTED_DATE")
	private Timestamp extractedDate;
	@Column("CURRENT_STATE")
	private String currentState;
	@Column("GCM_VENDOR_KEY")
	private Long vendorKey;
	@Column("VENDOR_NAME")
	private String vendorName;
	@Column("IS_REAL_SW")
	private String isRealVendor;

	public RetrievalSearchResult() {
	}

	public Long getProjKey() {
		return projKey;
	}

	public void setProjKey(Long projKey) {
		this.projKey = projKey;
	}

	public String getProjName() {
		return projName;
	}

	public void setProjName(String projName) {
		this.projName = projName;
	}

	public String getProgram() {
		return program;
	}

	public void setProgram(String program) {
		this.program = program;
	}

	public Long getProgramKey() {
		return programKey;
	}

	public void setProgramKey(Long programKey) {
		this.programKey = programKey;
	}

	public Integer getProjYear() {
		return projYear;
	}

	public void setProjYear(Integer projYear) {
		this.projYear = projYear;
	}

	public Integer getBarcodeCnt() {
		return barcodeCnt;
	}

	public void setBarcodeCnt(Integer barcodeCnt) {
		this.barcodeCnt = barcodeCnt;
	}

	public Timestamp getExtractedDate() {
		return extractedDate != null ? (Timestamp)extractedDate.clone() : null;
	}

	public void setExtractedDate(Timestamp extractedDate) {
		this.extractedDate = (extractedDate != null) ? (Timestamp) extractedDate.clone() : null;
	}

	public String getCurrentState() {
		return currentState;
	}

	public void setCurrentState(String currentState) {
		this.currentState = currentState;
	}

	public Long getVendorKey() {
		return vendorKey;
	}

	public void setVendorKey(Long vendorKey) {
		this.vendorKey = vendorKey;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getIsRealVendor() {
		return isRealVendor;
	}

	public void setIsRealVendor(String isRealVendor) {
		this.isRealVendor = isRealVendor;
	}

}
