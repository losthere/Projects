package com.optum.gcm.model;

import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import com.optum.gcm.common.annotation.Column;

public class UserResource {
	@Column("UUID")
	private String uuid;
	
	@Column("FIRST_NAME")
	private String firstName;
	
	@Column("LAST_NAME")
	private String lastName;
	
	@Column("USERID")
	private String userId;
	
	@Column("EMAIL")
	private String userEmail;
	
	@Column("GCM_USER_KEY")
	private String userKey;
	
	@Column("FIRST_NAME")
	private String userName;
	
	@Column("IS_ACTIVE_SW")
	private String status;
	
	@Column("APPROVER_LAST_NAME")
	private String approverlastName;
	
	@Column("APPROVER_FIRST_NAME")
	private String approverfirstName;

	private String errorMsg;
	
	private List<GCMUserGroup> gcmUserGroup;
	private List<GCMUserVendor> gcmUserVendor;
	private List<GcmUserVendorRole> gcmUserVendorRole;
	
	private String pnpURL;
	
	
	public List<GcmUserVendorRole> getGcmUserVendorRole() {
		return gcmUserVendorRole;
	}
	public void setGcmUserVendorRole(List<GcmUserVendorRole> gcmUserVendorRole) {
		this.gcmUserVendorRole = gcmUserVendorRole;
	}
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getUserKey() {
		return userKey;
	}
	public void setUserKey(String userKey) {
		this.userKey = userKey;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public List<GCMUserGroup> getGcmUserGroup() {
		return gcmUserGroup;
	}
	public void setGcmUserGroup(List<GCMUserGroup> gcmUserGroup) {
		this.gcmUserGroup = gcmUserGroup;
	}
	public List<GCMUserVendor> getGcmUserVendor() {
		return gcmUserVendor;
	}
	public void setGcmUserVendor(List<GCMUserVendor> gcmUserVendor) {
		this.gcmUserVendor = gcmUserVendor;
	}	
	public String getErrorMsg() {
		return errorMsg;
	}
	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}
	public String getPnpURL() {
		return pnpURL;
	}
	public void setPnpURL(String pnpURL) {
		this.pnpURL = pnpURL;
	}
	
	public String getApproverlastName() {
		return approverlastName;
	}
	public void setApproverlastName(String approverlastName) {
		this.approverlastName = approverlastName;
	}
	public String getApproverfirstName() {
		return approverfirstName;
	}
	public void setApproverfirstName(String approverfirstName) {
		this.approverfirstName = approverfirstName;
	}
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
	}
	
}
