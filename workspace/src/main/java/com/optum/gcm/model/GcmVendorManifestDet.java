package com.optum.gcm.model;

import java.sql.Timestamp;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

@Table("GCM_VENDOR_MANIFEST_DET")
public class GcmVendorManifestDet {
	
	@Column(value="GCM_VENDOR_MANIFEST_DET_KEY", sequence = "GCM_VENDOR_MANIFEST_DET_SEQ")
	private Long vendoManifestDetKey;
	
	@Column(value="REQUEST_STRING")
	private String reqString;
	
	@Column(value="GCM_VENDOR_KEY")
	private Long vendorKey;
	
	@Column(value="FILE_KEY")
	private Long fileKey;
	
	@Column(value="GCM_PROJ_KEY")
	private Long projKey;
	
	@Column(value="GCM_PROJECT_YEAR")
	private Integer projYear;
	
	@Column(value="GCM_PROJECT_CONTENT_KEY")
	private Long projContKey;
	
	@Column(value="GCM_PROJ_CONTENT_BARCODE")
	private String projContBarcode;
	
	@Column(value="GCM_BUSINESS_FUNC_KEY")
	private Integer busFuncKey;
	
	@Column(value="ASSIGNMENT_STATUS")
	private String assnStatus;
	
	@Column(value="CREATE_USERID")  
	private String createUserId;
	
	@Column(value="CREATE_DATE_TIME")    
	private Timestamp createDateTime;
	
	@Column(value="MODIFY_USERID")  
	private String modifyUserId;
	
	@Column(value="MODIFY_DATE_TIME") 
	private Timestamp modifyDateTime;

	public Long getVendoManifestDetKey() {
		return vendoManifestDetKey;
	}

	public void setVendoManifestDetKey(Long vendoManifestDetKey) {
		this.vendoManifestDetKey = vendoManifestDetKey;
	}

	public String getReqString() {
		return reqString;
	}

	public void setReqString(String reqString) {
		this.reqString = reqString;
	}

	public Long getVendorKey() {
		return vendorKey;
	}

	public void setVendorKey(Long vendorKey) {
		this.vendorKey = vendorKey;
	}

	public Long getFileKey() {
		return fileKey;
	}

	public void setFileKey(Long fileKey) {
		this.fileKey = fileKey;
	}

	public Long getProjKey() {
		return projKey;
	}

	public void setProjKey(Long projKey) {
		this.projKey = projKey;
	}

	public Integer getProjYear() {
		return projYear;
	}

	public void setProjYear(Integer projYear) {
		this.projYear = projYear;
	}

	public Long getProjContKey() {
		return projContKey;
	}

	public void setProjContKey(Long projContKey) {
		this.projContKey = projContKey;
	}

	public String getProjContBarcode() {
		return projContBarcode;
	}

	public void setProjContBarcode(String projContBarcode) {
		this.projContBarcode = projContBarcode;
	}

	public Integer getBusFuncKey() {
		return busFuncKey;
	}

	public void setBusFuncKey(Integer busFuncKey) {
		this.busFuncKey = busFuncKey;
	}

	public String getAssnStatus() {
		return assnStatus;
	}

	public void setAssnStatus(String assnStatus) {
		this.assnStatus = assnStatus;
	}

	public String getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}

	public Timestamp getCreateDateTime() {
		return createDateTime;
	}

	public void setCreateDateTime(Timestamp createDateTime) {
		this.createDateTime = createDateTime;
	}

	public String getModifyUserId() {
		return modifyUserId;
	}

	public void setModifyUserId(String modifyUserId) {
		this.modifyUserId = modifyUserId;
	}

	public Timestamp getModifyDateTime() {
		return modifyDateTime;
	}

	public void setModifyDateTime(Timestamp modifyDateTime) {
		this.modifyDateTime = modifyDateTime;
	}

}
