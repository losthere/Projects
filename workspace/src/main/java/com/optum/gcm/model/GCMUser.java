package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

@Table("GCM_USER")
public class GCMUser extends BaseModel {
	
	@Column(value = "GCM_USER_KEY", sequence = "GCM_USER_SEQ")
	private String loginUserKey;
	
	@Column("USERID")
	private String userID;
	
	@Column("LAST_NAME")
	private String lastName;
	
	@Column("FIRST_NAME")
	private String firstName;
	
	@Column("EMAIL")
	private String email;
	
	@Column("IS_ACTIVE_SW")
	private String isActive;
	
	@Column("GCM_APPROVED_USER_KEY")
	private String reportsToUserKey;
	
	@Column("UUID")
	private String uuID;
	
	@Column("IS_INTERNAL_SW")
	private String isInternal;
	
	@Column("EXT_USER_IDENTIFICATION")
	private String extUserIdentification;
	
	@Column("EXT_USER_IDENTIFICATION_SOURCE")
	private String extUserIdentificationSrc;

	@Column("IV_TOKEN")
	private String passwd;
	
	public String getIsInternal() {
		return isInternal;
	}

	public void setIsInternal(String isInternal) {
		this.isInternal = isInternal;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getIsActive() {
		return isActive;
	}

	public void setIsActive(String isActive) {
		this.isActive = isActive;
	}

	public String getReportsToUserKey() {
		return reportsToUserKey;
	}

	public void setReportsToUserKey(String reportsToUserKey) {
		this.reportsToUserKey = reportsToUserKey;
	}

	public String getUuID() {
		return uuID;
	}

	public void setUuID(String uuID) {
		this.uuID = uuID;
	}

	public String getLoginUserKey() {
		return loginUserKey;
	}

	public void setLoginUserKey(String loginUserKey) {
		this.loginUserKey = loginUserKey;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getExtUserIdentification() {
		return extUserIdentification;
	}

	public void setExtUserIdentification(String extUserIdentification) {
		this.extUserIdentification = extUserIdentification;
	}

	public String getExtUserIdentificationSrc() {
		return extUserIdentificationSrc;
	}

	public void setExtUserIdentificationSrc(String extUserIdentificationSrc) {
		this.extUserIdentificationSrc = extUserIdentificationSrc;
	}

	public String getPasswd() {
		return passwd;
	}

	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}
	
}
