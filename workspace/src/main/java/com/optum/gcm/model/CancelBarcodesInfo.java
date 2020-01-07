package com.optum.gcm.model;

public class CancelBarcodesInfo {
	
	String barcodes;
	
	String reasonCode;
	
	String userId;
	
	Long userKey;
	
	Long groupKey;

	public String getBarcodes() {
		return barcodes;
	}

	public void setBarcodes(String barcodes) {
		this.barcodes = barcodes;
	}

	public String getReasonCode() {
		return reasonCode;
	}

	public void setReasonCode(String reasonCode) {
		this.reasonCode = reasonCode;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Long getUserKey() {
		return userKey;
	}

	public void setUserKey(Long userKey) {
		this.userKey = userKey;
	}

	public Long getGroupKey() {
		return groupKey;
	}

	public void setGroupKey(Long groupKey) {
		this.groupKey = groupKey;
	}
}
