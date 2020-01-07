package com.optum.gcm.model;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * @author pmule
 *
 */

public class SearchChartInput {

	private Long projContentKey;
	
	private Long busFuncVenKey;
	
	private Long retWiKey;
	
	private Long projKey;

	private Long busFuncKey;
	
	private String fromBusFuncStatus;
	
	private String toBusFuncStatus;
	
	private String reasonCode;
	
	private String reasonComment;
	
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
	
	public Long getBusFuncKey() {
		return busFuncKey;
	}

	public void setBusFuncKey(Long busFuncKey) {
		this.busFuncKey = busFuncKey;
	}
	
	public String getFromBusFuncStatus() {
		return fromBusFuncStatus;
	}

	public void setFromBusFuncStatus(String fromBusFuncStatus) {
		this.fromBusFuncStatus = fromBusFuncStatus;
	}


	public String getToBusFuncStatus() {
		return toBusFuncStatus;
	}

	public void setToBusFuncStatus(String toBusFuncStatus) {
		this.toBusFuncStatus = toBusFuncStatus;
	}

	public String getReasonCode() {
		return reasonCode;
	}

	public void setReasonCode(String reasonCode) {
		this.reasonCode = reasonCode;
	}

	public Long getProjKey() {
		return projKey;
	}

	public void setProjKey(Long projKey) {
		this.projKey = projKey;
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

	public Long getRetWiKey() {
		return retWiKey;
	}

	public void setRetWiKey(Long retWiKey) {
		this.retWiKey = retWiKey;
	}

	public String getReasonComment() {
		return reasonComment;
	}

	public void setReasonComment(String reasonComment) {
		this.reasonComment = reasonComment;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
	}
	
}
