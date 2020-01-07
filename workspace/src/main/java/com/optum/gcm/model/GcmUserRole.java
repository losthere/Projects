package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

@Table("GCM_USER_ROLE")
public class GcmUserRole extends BaseModel {
	
	@Column(value="GCM_USER_ROLE_KEY", sequence = "GCM_USER_ROLE_SEQ")    
	private Long userRoleKey;
	
	@Column(value="GCM_USER_KEY")  
	private Long userKey;
	
	@Column(value="GCM_ROLE_CODE")  
	private String roleCode;
	
	@Column(value="GCM_VENDOR_KEY")  
	private Long vendorKey;
	
	@Column(value="GCM_REPORTS_USER_KEY")  
	private Long reportsUserKey;
	
	@Column(value="IS_ACTIVE_SW")  
	private String isActive;

	public Long getUserRoleKey() {
		return userRoleKey;
	}

	public void setUserRoleKey(Long userRoleKey) {
		this.userRoleKey = userRoleKey;
	}

	public Long getUserKey() {
		return userKey;
	}

	public void setUserKey(Long userKey) {
		this.userKey = userKey;
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public Long getVendorKey() {
		return vendorKey;
	}

	public void setVendorKey(Long vendorKey) {
		this.vendorKey = vendorKey;
	}

	public Long getReportsUserKey() {
		return reportsUserKey;
	}

	public void setReportsUserKey(Long reportsUserKey) {
		this.reportsUserKey = reportsUserKey;
	}

	public String getIsActive() {
		return isActive;
	}

	public void setIsActive(String isActive) {
		this.isActive = isActive;
	}
	
}
