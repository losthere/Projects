package com.optum.gcm.model;

public class GcmConfigInput {
	
	
	private String groupKey;
	private String region;
	private String busFunckey;
	private String configType;
	private String busFuncDetailKey;
	private String userId;
	private String roleCode;
	private String configValue;
	private String vendorKey;
	private String userKey;
	private String matchType;
	
	
	public String getMatchType() {
		return matchType;
	}

	public void setMatchType(String matchType) {
		this.matchType = matchType;
	}

	public String getVendorKey() {
		return vendorKey;
	}

	public void setVendorKey(String vendorKey) {
		this.vendorKey = vendorKey;
	}

	public String getUserKey() {
		return userKey;
	}

	public void setUserKey(String userKey) {
		this.userKey = userKey;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getGroupKey() {
		return groupKey;
	}

	public void setGroupKey(String groupKey) {
		this.groupKey = groupKey;
	}

	public String getBusFunckey() {
		return busFunckey;
	}

	public void setBusFunckey(String busFunckey) {
		this.busFunckey = busFunckey;
	}

	public String getConfigType() {
		return configType;
	}

	public void setConfigType(String configType) {
		this.configType = configType;
	}

	public String getConfigValue() {
		return configValue;
	}

	public void setConfigValue(String configValue) {
		this.configValue = configValue;
	}

	public String getBusFuncDetailKey() {
		return busFuncDetailKey;
	}

	public void setBusFuncDetailKey(String busFuncDetailKey) {
		this.busFuncDetailKey = busFuncDetailKey;
	}

}

