package com.optum.gcm.model;

import java.util.Collections;
import java.util.List;

public class PendWorklistUpdate {
	
	private List<Long> gcmRetApptIds;
	
	private List<String> roleCodes;
	
	private Long pendMgrUserKey;
	
	private Long loginUserKey;
	
	private String requestedUser;

	public List<Long> getGcmRetApptIds() {
		return (gcmRetApptIds != null) ? Collections.unmodifiableList(gcmRetApptIds) : null;
	}

	public void setGcmRetApptIds(List<Long> gcmRetApptIds) {
		this.gcmRetApptIds = (gcmRetApptIds != null) ? Collections.unmodifiableList(gcmRetApptIds) : null;
	}

	public Long getPendMgrUserKey() {
		return pendMgrUserKey;
	}

	public void setPendMgrUserKey(Long pendMgrUserKey) {
		this.pendMgrUserKey = pendMgrUserKey;
	}

	public Long getLoginUserKey() {
		return loginUserKey;
	}

	public void setLoginUserKey(Long loginUserKey) {
		this.loginUserKey = loginUserKey;
	}

	public List<String> getRoleCodes() {
		return (roleCodes != null) ? Collections.unmodifiableList(roleCodes) : null;
	}

	public void setRoleCodes(List<String> roleCodes) {
		this.roleCodes = (roleCodes != null) ? Collections.unmodifiableList(roleCodes) : null;
	}

	public String getRequestedUser() {
		return requestedUser;
	}

	public void setRequestedUser(String requestedUser) {
		this.requestedUser = requestedUser;
	}
	
}
