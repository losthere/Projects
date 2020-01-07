package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

public class UserAdminModel {
	
	@Column("GCM_USER_KEY")
	private Long userKey;
	
	@Column("LAST_NAME")
	private String lastName;
	
	@Column("FIRST_NAME")
	private String firstName;
	
	@Column("USERID")
	private String userId;
	
	@Column("SUPERVISORID")
	private Long supervisorId;
	
	@Column("SUPERVISOR")
	private String supervisor;
	
	@Column("STATUS")
	private String status;
	
	@Column("EMAIL")
	private String email;
	
	@Column("ROLE_CNT")
	private String roleCnt;
	
	@Column("ROLE_CODE")
	private String roleCode;
	
	@Column("ROLE_NAMES")
	private String roleNames;
	
	private Long newSupervisorId;
	
	private Long loginUserKey;
	
	private String role;

	public Long getUserKey() {
		return userKey;
	}

	public void setUserKey(Long userKey) {
		this.userKey = userKey;
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

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Long getSupervisorId() {
		return supervisorId;
	}

	public void setSupervisorId(Long supervisorId) {
		this.supervisorId = supervisorId;
	}

	public String getSupervisor() {
		return supervisor;
	}

	public void setSupervisor(String supervisor) {
		this.supervisor = supervisor;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRoleCnt() {
		return roleCnt;
	}

	public void setRoleCnt(String roleCnt) {
		this.roleCnt = roleCnt;
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getRoleNames() {
		return roleNames;
	}

	public void setRoleNames(String roleNames) {
		this.roleNames = roleNames;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getNewSupervisorId() {
		return newSupervisorId;
	}

	public void setNewSupervisorId(Long newSupervisorId) {
		this.newSupervisorId = newSupervisorId;
	}

	public Long getLoginUserKey() {
		return loginUserKey;
	}

	public void setLoginUserKey(Long loginUserKey) {
		this.loginUserKey = loginUserKey;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
}
