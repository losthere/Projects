package com.optum.gcm.model;

import java.util.List;

public class VendorReqObj{
	
	private List<Vendor> vendorList;
	private Long userKey ;
	private String userId;
	
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
	public List<Vendor> getVendorList() {
		return vendorList;
	}
	public void setVendorList(List<Vendor> vendorList) {
		this.vendorList = vendorList;
	}
	

}
