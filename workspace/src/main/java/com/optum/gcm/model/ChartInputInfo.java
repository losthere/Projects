package com.optum.gcm.model;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * @author pmule
 *
 */

public class ChartInputInfo {

	private Long projContentKey;
	
	private Long busFuncVenKey;
	
	private Long projKey;

	private Long busFuncDetailKey;
	
	private String barcode;
	
	private Long vendorKey;
	
	private Long dosYear;
	
	private Long busFuncKey;
	
	private String fromBusFuncStatus;
	
	private String toBusFuncStatus;
	
	private String reasonCode;
	
	private String contentErrorCode;
	
	private String requestedUserId;
	
	private String eventType;
	
	private Long groupKey;
	
	private Long userKey;
	
	private String currentSessionId;
	
	private String worklistActivityKey;
	
	private ChartCommentsInfo chartComment;
	
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

	public String getContentErrorCode() {
		return contentErrorCode;
	}

	public void setContentErrorCode(String contentErrorCode) {
		this.contentErrorCode = contentErrorCode;
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

	public Long getBusFuncDetailKey() {
		return busFuncDetailKey;
	}

	public void setBusFuncDetailKey(Long busFuncDetailKey) {
		this.busFuncDetailKey = busFuncDetailKey;
	}

	public String getBarcode() {
		return barcode;
	}

	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}

	public Long getVendorKey() {
		return vendorKey;
	}

	public void setVendorKey(Long vendorKey) {
		this.vendorKey = vendorKey;
	}

	public Long getDosYear() {
		return dosYear;
	}

	public void setDosYear(Long dosYear) {
		this.dosYear = dosYear;
	}

	public String getRequestedUserId() {
		return requestedUserId;
	}

	public void setRequestedUserId(String requestedUserId) {
		this.requestedUserId = requestedUserId;
	}

	
	public ChartCommentsInfo getChartComment() {
		return chartComment;
	}

	public void setChartComment(ChartCommentsInfo chartComment) {
		this.chartComment = chartComment;
	}

	
	public Long getGroupKey() {
		return groupKey;
	}

	public void setGroupKey(Long groupKey) {
		this.groupKey = groupKey;
	}

	public String getEventType() {
		return eventType;
	}

	public void setEventType(String eventType) {
		this.eventType = eventType;
	}

	public Long getUserKey() {
		return userKey;
	}

	public void setUserKey(Long userKey) {
		this.userKey = userKey;
	}
	
	public String getCurrentSessionId() {
		return currentSessionId;
	}

	public void setCurrentSessionId(String currentSessionId) {
		this.currentSessionId = currentSessionId;
	}

	public String getWorklistActivityKey() {
		return worklistActivityKey;
	}

	public void setWorklistActivityKey(String worklistActivityKey) {
		this.worklistActivityKey = worklistActivityKey;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
	}
	
}
