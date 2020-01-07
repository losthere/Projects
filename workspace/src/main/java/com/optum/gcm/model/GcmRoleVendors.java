package com.optum.gcm.model;

import java.util.List;
import java.util.Map;

import com.optum.gcm.common.annotation.Column;

public class GcmRoleVendors{
	@Column("GCM_ROLE_CODE")
	private String gcmRoleCode;

	@Column("GCM_ROLE_NAME")
	private String gcmRoleName;
	
	/*public GcmRoleVendors()
	{
		
	}
	public GcmRoleVendors(String gcmRoleCode,String gcmRoleName)
	{
		this.gcmRoleCode=gcmRoleCode;
		this.gcmRoleName=gcmRoleName;
	}*/
	
	//Map<String, String> roleVendor;
	List<KeyValue<Integer, String>> roleVendor;

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

	public List<KeyValue<Integer, String>> getRoleVendor() {
		return roleVendor;
	}

	public void setRoleVendor(List<KeyValue<Integer, String>> roleVendor) {
		this.roleVendor = roleVendor;
	}

	
}
