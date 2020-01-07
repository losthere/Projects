package com.optum.gcm.model;

import java.sql.Timestamp;

import com.optum.gcm.common.annotation.Column;

public class UserFileHistory {
	


	@Column("STG_EXT_USER_FILE_INFO_KEY")
	private Long stgExtUserFileInfoKey;
	
	@Column("FILE_NAME")
	private String fileName;

	@Column("UPLOADED_BY")
	private String uploadedBy;

	@Column("UPLOADED_ON")
	private Timestamp uploadedOn;
	
	@Column("LAST_PROCCESSED_ON")
	private Timestamp lastProcessedOn;

	@Column("CNT_USER")
	private Long cntUser;
	
	@Column("CNT_USER_SUCCESS")
	private Long cntUserSuccess;

	@Column("CNT_USER_FAILURE")
	private Long cntUserFailure;

	
	public Timestamp getUploadedOn() {
		return uploadedOn;
	}

	public void setUploadedOn(Timestamp uploadedOn) {
		this.uploadedOn = uploadedOn;
	}

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

	public String getUploadedBy() {
		return uploadedBy;
	}

	public void setUploadedBy(String uploadedBy) {
		this.uploadedBy = uploadedBy;
	}

	public Long getCntUser() {
		return cntUser;
	}

	public void setCntUser(Long cntUser) {
		this.cntUser = cntUser;
	}

	public Long getCntUserSuccess() {
		return cntUserSuccess;
	}

	public void setCntUserSuccess(Long cntUserSuccess) {
		this.cntUserSuccess = cntUserSuccess;
	}

	public Long getCntUserFailure() {
		return cntUserFailure;
	}

	public void setCntUserFailure(Long cntUserFailure) {
		this.cntUserFailure = cntUserFailure;
	}

	public Timestamp getLastProcessedOn() {
		return lastProcessedOn;
	}

	public void setLastProcessedOn(Timestamp lastProcessedOn) {
		this.lastProcessedOn = lastProcessedOn;
	}
	
}
