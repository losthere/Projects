package com.optum.gcm.model;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

@Table("GCM_USER_VENDOR")
public class UserVendor extends BaseModel {
	
	@Column("GCM_VENDOR_KEY")
	private String gcmVendorKey;
	
	@Column("GCM_USER_KEY")
	private Long gcmUserKey;	
	
	@Column("IS_ACTIVE_SW")
	private String isActvieSW;	

	@Column("IS_DEFAULT_SW")
	private String isDefaultSW;	
	
	public String getIsActvieSW() {
		return isActvieSW;
	}

	public void setIsActvieSW(String isActvieSW) {
		this.isActvieSW = isActvieSW;
	}

	public String getGcmVendorKey() {
		return gcmVendorKey;
	}

	public void setGcmVendorKey(String gcmVendorKey) {
		this.gcmVendorKey = gcmVendorKey;
	}

	public Long getGcmUserKey() {
		return gcmUserKey;
	}

	public void setGcmUserKey(Long gcmUserKey) {
		this.gcmUserKey = gcmUserKey;
	}
	
	public String getIsDefaultSW() {
		return isDefaultSW;
	}

	public void setIsDefaultSW(String isDefaultSW) {
		this.isDefaultSW = isDefaultSW;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
	}

}
