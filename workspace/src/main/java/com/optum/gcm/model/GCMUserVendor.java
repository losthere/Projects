package com.optum.gcm.model;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import com.optum.gcm.common.annotation.Column;

public class GCMUserVendor {
	
	@Column("GCM_VENDOR_KEY")
	private String gcmVendorKey;
	
	@Column("VENDOR_NAME")
	private String vendorName;
	
	@Column("VENDOR_CODE")
	private String vendorCode;
	
	
	public String getGcmVendorKey() {
		return gcmVendorKey;
	}

	public void setGcmVendorKey(String gcmVendorKey) {
		this.gcmVendorKey = gcmVendorKey;
	}


	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getVendorCode() {
		return vendorCode;
	}

	public void setVendorCode(String vendorCode) {
		this.vendorCode = vendorCode;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
	}

}
