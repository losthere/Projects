package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

@Table("GCM_PROJECT")
public class GcmEOVw {

	/*
	 * GCM_EO_KEY GCM_EO_CODE GCM_EO_DESC GCM_GROUP_KEY IS_ENC_LEVEL IS_DX_LEVEL
	 * GCM_USE_CODE
	 */
	@Column("GCM_EO_KEY")
	private String gcmEoKey;
	
	@Column("GCM_EO_CODE")
	private String gcmEoCode;
	
	@Column("GCM_EO_DESC")
	private String gcmEoDesc;
	
	@Column("GCM_GROUP_KEY")
	private Integer gcmGroupKey;
	
	@Column("IS_ENC_LEVEL")
	private String isEncLevel;
	
	@Column("IS_DX_LEVEL")
	private String isDxLevel;
	
	/*@Column("GCM_USE_CODE")
	private String gcmUseCode;*/

	public String getGcmEoKey() {
		return gcmEoKey;
	}

	public void setGcmEoKey(String gcmEoKey) {
		this.gcmEoKey = gcmEoKey;
	}

	public String getGcmEoCode() {
		return gcmEoCode;
	}

	public void setGcmEoCode(String gcmEoCode) {
		this.gcmEoCode = gcmEoCode;
	}

	public String getGcmEoDesc() {
		return gcmEoDesc;
	}

	public void setGcmEoDesc(String gcmEoDesc) {
		this.gcmEoDesc = gcmEoDesc;
	}

	public Integer getGcmGroupKey() {
		return gcmGroupKey;
	}

	public void setGcmGroupKey(Integer gcmGroupKey) {
		this.gcmGroupKey = gcmGroupKey;
	}

	public String getIsEncLevel() {
		return isEncLevel;
	}

	public void setIsEncLevel(String isEncLevel) {
		this.isEncLevel = isEncLevel;
	}

	public String getIsDxLevel() {
		return isDxLevel;
	}

	public void setIsDxLevel(String isDxLevel) {
		this.isDxLevel = isDxLevel;
	}

	/*public String getGcmUseCode() {
		return gcmUseCode;
	}

	public void setGcmUseCode(String gcmUseCode) {
		this.gcmUseCode = gcmUseCode;
	}*/

	@Override
	public String toString() {
		return "GcmEOVw [gcmEoKey=" + gcmEoKey + ", gcmEoCode=" + gcmEoCode + ", gcmEoDesc=" + gcmEoDesc
				+ ", gcmGroupKey=" + gcmGroupKey + ", isEncLevel=" + isEncLevel + ", isDxLevel=" + isDxLevel
				//+ ", gcmUseCode=" + gcmUseCode 
				+ "]";
	}

	/*
	 * GCM_EO_KEY GCM_EO_CODE GCM_EO_DESC GCM_GROUP_KEY IS_ENC_LEVEL IS_DX_LEVEL
	 * GCM_USE_CODE
	 */

	
}
