package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

public class GcmBusFuncDetail {

	public GcmBusFuncDetail() {
	}
	
	@Column(value="GCM_BUSINESS_FUNC_DETAIL_KEY")
	private String gcmBusinessFuncDetailKey;
	
	@Column(value="GCM_BUSS_FUNC_DETAIL_NAME")
	private String gcmBusinessFuncDetailName;
	
	public String getGcmBusinessFuncDetailKey() {
		return gcmBusinessFuncDetailKey;
	}

	public void setGcmBusinessFuncDetailKey(String gcmBusinessFuncDetailKey) {
		this.gcmBusinessFuncDetailKey = gcmBusinessFuncDetailKey;
	}
	
	public String getGcmBusinessFuncDetailName() {
		return gcmBusinessFuncDetailName;
	}

	public void setGcmBusinessFuncDetailName(String gcmBusinessFuncDetailName) {
		this.gcmBusinessFuncDetailName = gcmBusinessFuncDetailName;
	}

}