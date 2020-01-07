package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

@Table("GCM_USER_ROLE")
public class UserRole extends BaseModel {

	@Column(value = "GCM_USER_ROLE_KEY" , sequence = "GCM_USER_ROLE_SEQ")
	private String gcmUserRoleKey;

	@Column("GCM_USER_KEY")
	private Long gcmUserKey;

	@Column("GCM_ROLE_CODE")
	private String gcmRoleCode;

	@Column("GCM_VENDOR_KEY")
	private String gcmVendorKey;

	@Column("GCM_REPORTS_USER_KEY")
	private String gcmReportsUserKey;

	@Column("IS_ACTIVE_SW")
	private String isActiveSW;

	public String getGcmUserRoleKey() {
		return gcmUserRoleKey;
	}

	public void setGcmUserRoleKey(String gcmUserRoleKey) {
		this.gcmUserRoleKey = gcmUserRoleKey;
	}

	public Long getGcmUserKey() {
		return gcmUserKey;
	}

	public void setGcmUserKey(Long gcmUserKey) {
		this.gcmUserKey = gcmUserKey;
	}

	public String getGcmRoleCode() {
		return gcmRoleCode;
	}

	public void setGcmRoleCode(String gcmRoleCode) {
		this.gcmRoleCode = gcmRoleCode;
	}

	public String getGcmVendorKey() {
		return gcmVendorKey;
	}

	public void setGcmVendorKey(String gcmVendorKey) {
		this.gcmVendorKey = gcmVendorKey;
	}

	public String getGcmReportsUserKey() {
		return gcmReportsUserKey;
	}

	public void setGcmReportsUserKey(String gcmReportsUserKey) {
		this.gcmReportsUserKey = gcmReportsUserKey;
	}

	public String getIsActiveSW() {
		return isActiveSW;
	}

	public void setIsActiveSW(String isActiveSW) {
		this.isActiveSW = isActiveSW;
	}

	
}
