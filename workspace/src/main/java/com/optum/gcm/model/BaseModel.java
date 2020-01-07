package com.optum.gcm.model;

import java.sql.Timestamp;

import com.optum.gcm.common.annotation.Column;

public class BaseModel {
	@Column("CREATE_USERID")
	private String createUser;
	@Column("MODIFY_USERID")
	private String modifiedUser;
	@Column("CREATE_DATE_TIME")
	private Timestamp createDate;
	@Column("MODIFY_DATE_TIME")
	private Timestamp modifiedDate;
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	public String getModifiedUser() {
		return modifiedUser;
	}
	public void setModifiedUser(String modifiedUser) {
		this.modifiedUser = modifiedUser;
	}
	public Timestamp getCreateDate() {
		return createDate != null ? (Timestamp)createDate.clone() : null;
	}
	public void setCreateDate(Timestamp createDate) {
		this.createDate = (createDate != null) ? (Timestamp) createDate.clone() : null;
	}
	public Timestamp getModifiedDate() {
		return modifiedDate != null ? (Timestamp)modifiedDate.clone() : null;
	}
	public void setModifiedDate(Timestamp modifiedDate) {
		this.modifiedDate = (modifiedDate != null) ? (Timestamp) modifiedDate.clone() : null;
	}
	
}
