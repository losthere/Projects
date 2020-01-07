package com.optum.gcm.model;

import java.util.Collections;
import java.util.List;


public class StatusUpdateInfo {
	
	private String toStatus;
	
	private String requestedUserId;
	
	private Long loginUserKey;
	
	private Long fromUserKey;
	
	private List<String> chartIdList;
	
	private Long busFunction;

	public String getToStatus() {
		return toStatus;
	}

	public void setToStatus(String toStatus) {
		this.toStatus = toStatus;
	}

	public String getRequestedUserId() {
		return requestedUserId;
	}

	public void setRequestedUserId(String requestedUserId) {
		this.requestedUserId = requestedUserId;
	}


	public Long getLoginUserKey() {
		return loginUserKey;
	}

	public void setLoginUserKey(Long loginUserKey) {
		this.loginUserKey = loginUserKey;
	}

	public Long getFromUserKey() {
		return fromUserKey;
	}

	public void setFromUserKey(Long fromUserKey) {
		this.fromUserKey = fromUserKey;
	}

	public List<String> getChartIdList() {
		return (chartIdList != null) ? Collections.unmodifiableList(chartIdList) : null;
	}

	public void setChartIdList(List<String> chartIdList) {
		this.chartIdList = (chartIdList != null) ? Collections.unmodifiableList(chartIdList) : null;
	}

	public Long getBusFunction() {
		return busFunction;
	}

	public void setBusFunction(Long busFunction) {
		this.busFunction = busFunction;
	}

	
	
}