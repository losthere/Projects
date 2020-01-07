package com.optum.gcm.model;

import java.sql.Timestamp;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

@Table("STG_EXT_USER_FILE_INFO")
public class StgExtUserFileInfo {
	
	@Column(value="STG_EXT_USER_FILE_INFO_KEY" , sequence="STG_EXT_USER_FILE_INFO_SEQ")
	private Long stgExtUserFileInfoKey;	

	@Column("FILE_NAME")
	private String fileName;
	
	@Column("GCM_GROUP_KEY")
	private Long gcmGroupKey;
	
	@Column("UPLOADED_BY")
	private String uploadedBy;
	
	@Column("LAST_PROCCESSED_ON")
	private Timestamp lastProcessOn;
	
	@Column("CREATION_DATE_TIME")
	private Timestamp creationDate;
	
	@Column("CREATED_BY")
	private String createdBy;
	
	@Column("MODIFIED_DATE_TIME")
	private Timestamp modifiedDate;	

	@Column("MODIFIED_BY")
	private String modifiedBy;
	
	public Long getStgExtUserFileInfoKey() {
		return stgExtUserFileInfoKey;
	}

	public void setStgExtUserFileInfoKey(Long stgExtUserFileInfoKey) {
		this.stgExtUserFileInfoKey = stgExtUserFileInfoKey;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public Long getGcmGroupKey() {
		return gcmGroupKey;
	}

	public void setGcmGroupKey(Long gcmGroupKey) {
		this.gcmGroupKey = gcmGroupKey;
	}

	public String getUploadedBy() {
		return uploadedBy;
	}

	public void setUploadedBy(String uploadedBy) {
		this.uploadedBy = uploadedBy;
	}

	public Timestamp getLastProcessOn() {
		return lastProcessOn != null ? (Timestamp)lastProcessOn.clone() : null;
	}

	public void setLastProcessOn(Timestamp lastProcessOn) {
		this.lastProcessOn = (lastProcessOn != null) ? (Timestamp)lastProcessOn.clone() : null;
	}

	public Timestamp getCreationDate() {
		return creationDate != null ? (Timestamp)creationDate.clone() : null;
	}


	public void setCreationDate(Timestamp creationDate) {
		this.creationDate = (creationDate != null) ? (Timestamp)creationDate.clone() : null;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Timestamp getModifiedDate() {
		return modifiedDate != null ? (Timestamp)modifiedDate.clone() : null;
	}


	public void setModifiedDate(Timestamp modifiedDate) {
		this.modifiedDate = (modifiedDate != null) ? (Timestamp) modifiedDate.clone() : null;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}
	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
	}

}
