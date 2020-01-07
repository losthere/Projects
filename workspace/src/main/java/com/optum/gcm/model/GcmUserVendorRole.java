package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

@Table("GCM_ROLE_LIST")
public class GcmUserVendorRole {
	
	@Column("GCM_ROLE_CODE")
	private String gcmRoleCode;

	@Column("GCM_ROLE_NAME")
	private String gcmRoleName;

	@Column("GCM_VENDOR_KEY")
	private Integer gcmVendorKey;
	
	

	

	public Integer getGcmVendorKey() {
		return gcmVendorKey;
	}

	public void setGcmVendorKey(Integer gcmVendorKey) {
		this.gcmVendorKey = gcmVendorKey;
	}

	public String getGcmRoleCode() {
		return gcmRoleCode;
	}

	public void setGcmRoleCode(String gcmRoleCode) {
		this.gcmRoleCode = gcmRoleCode;
	}

	public String getGcmRoleName() {
		return gcmRoleName;
	}

	public void setGcmRoleName(String gcmRoleName) {
		this.gcmRoleName = gcmRoleName;
	}
	
}
