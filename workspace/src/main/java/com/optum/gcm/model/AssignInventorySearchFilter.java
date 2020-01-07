package com.optum.gcm.model;

public class AssignInventorySearchFilter extends SchedulingInventory {

	private String isAssigned;
	private Long fromUserKey;
	private Long toUserKey;
	private Long loginUserKey;
	private String requestedUserId;
	private Long busFuncDtlKey;
	private Long apptKey;
	public String getIsAssigned() {
		return isAssigned;
	}

	public void setIsAssigned(String isAssigned) {
		this.isAssigned = isAssigned;
	}

	public Long getFromUserKey() {
		return fromUserKey;
	}

	public void setFromUserKey(Long fromUserKey) {
		this.fromUserKey = fromUserKey;
	}

	public Long getToUserKey() {
		return toUserKey;
	}

	public void setToUserKey(Long toUserKey) {
		this.toUserKey = toUserKey;
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

	public Long getApptKey() {
		return apptKey;
	}

	public void setApptKey(Long apptKey) {
		this.apptKey = apptKey;
	}

	public Long getBusFuncDtlKey() {
		return busFuncDtlKey;
	}

	public void setBusFuncDtlKey(Long busFuncDtlKey) {
		this.busFuncDtlKey = busFuncDtlKey;
	}

}
