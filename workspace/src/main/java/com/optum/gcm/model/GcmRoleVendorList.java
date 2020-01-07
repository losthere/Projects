package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

public class GcmRoleVendorList extends GcmUserVendorRole{

	public GcmRoleVendorList()
	{
	}
	
	/*public GcmRoleVendorList(String vendorName)
	{
		this.vendorName=vendorName;
	}*/
	@Column("VENDOR_NAME")
	private String vendorName;

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
}
