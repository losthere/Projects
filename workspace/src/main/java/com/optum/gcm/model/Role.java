package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

public class Role {

	@Column("GCM_ROLE_CODE")
	private String roleCode;

	@Column("GCM_ROLE_NAME")
	private String roleName;

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

}
