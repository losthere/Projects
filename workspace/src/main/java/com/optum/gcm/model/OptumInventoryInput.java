package com.optum.gcm.model;

public class OptumInventoryInput {
	
	Long userKey;
	
	String userId;
	
	Long groupKey;
	
	String roleCode;
	
	String busSegment;
	
	String region;
	
	Long busFuncKey;
	
	Long projectYear;
	
	Long vendorKey;
	
	public Long getVendorKey() {
		return vendorKey;
	}

	public void setVendorKey(Long vendorKey) {
		this.vendorKey = vendorKey;
	}

	public Long getUserKey() {
		return userKey;
	}

	public void setUserKey(Long userKey) {
		this.userKey = userKey;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Long getGroupKey() {
		return groupKey;
	}

	public void setGroupKey(Long groupKey) {
		this.groupKey = groupKey;
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getBusSegment() {
		return busSegment;
	}

	public void setBusSegment(String busSegment) {
		this.busSegment = busSegment;
	}
	
	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public Long getBusFuncKey() {
		return busFuncKey;
	}

	public void setBusFuncKey(Long busFuncKey) {
		this.busFuncKey = busFuncKey;
	}

	public Long getProjectYear() {
		return projectYear;
	}

	public void setProjectYear(Long projectYear) {
		this.projectYear = projectYear;
	}

}
