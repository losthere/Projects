package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

@Table("GCM_USER")
public class User {

	@Column(value = "GCM_USER_KEY")
	private String loginUserKey;

	@Column(value = "FULL_NAME")
	private String fullName;

	@Column("USERID")
	private String userID;

	public String getLoginUserKey() {
		return loginUserKey;
	}

	public void setLoginUserKey(String loginUserKey) {
		this.loginUserKey = loginUserKey;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

}
