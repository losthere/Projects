package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

public class Vendor {
	
	@Column("GCM_VENDOR_KEY")
	private Long vendorKey;
	
	
	@Column("VENDOR_NAME")
	private String vendorName;
	
	@Column("IS_ACTIVE_SW")
	private String isActiveSW;
	

	public Long getVendorKey() {
		return vendorKey;
	}

	public void setVendorKey(Long vendorKey) {
		this.vendorKey = vendorKey;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getIsActiveSW() {
		return isActiveSW;
	}

	public void setIsActiveSW(String isActiveSW) {
		this.isActiveSW = isActiveSW;
	}

	
}
