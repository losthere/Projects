package com.optum.gcm.model;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

/**
 * @author pmule
 *
 */

public class QAFeedbackInputFiler {

	private Long projContentKey;
	
	private Long busFuncVenKey;
	
	private Long projKey;

	private Long busFuncKey;
	
	private Long loginUserKey;
	
	private String requestedUserId;
	
	private Long groupKey;
	

	public Long getProjContentKey() {
		return projContentKey;
	}

	public void setProjContentKey(Long projContentKey) {
		this.projContentKey = projContentKey;
	}


	public Long getBusFuncVenKey() {
		return busFuncVenKey;
	}


	public void setBusFuncVenKey(Long busFuncVenKey) {
		this.busFuncVenKey = busFuncVenKey;
	}


	public Long getProjKey() {
		return projKey;
	}


	public void setProjKey(Long projKey) {
		this.projKey = projKey;
	}


	public Long getBusFuncKey() {
		return busFuncKey;
	}


	public void setBusFuncKey(Long busFuncKey) {
		this.busFuncKey = busFuncKey;
	}


	public Long getLoginUserKey() {
		return loginUserKey;
	}


	public void setLoginUserKey(Long loginUserKey) {
		this.loginUserKey = loginUserKey;
	}


	public String getRequestedUserId() {
		return requestedUserId;
	}


	public void setRequestedUserId(String requestedUserId) {
		this.requestedUserId = requestedUserId;
	}


	public Long getGroupKey() {
		return groupKey;
	}


	public void setGroupKey(Long groupKey) {
		this.groupKey = groupKey;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
	}
	
}
