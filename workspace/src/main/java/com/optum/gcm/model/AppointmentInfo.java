package com.optum.gcm.model;

import java.util.Collections;
import java.util.List;

public class AppointmentInfo extends ChartStatusUpdate {
	
	private String  loginUserKey;
	
	private Long  noOfPendAttempts;
	
	private boolean faxAllMembers;
	
	private List<AssignInventorySearchFilter> assignInventorySearchFilter;
	
	private GcmRetAppointment appt;

	public List<AssignInventorySearchFilter> getAssignInventorySearchFilter() {
		return (assignInventorySearchFilter != null) ? Collections.unmodifiableList(assignInventorySearchFilter) : null;
	}

	public void setAssignInventorySearchFilter(List<AssignInventorySearchFilter> assignInventorySearchFilter) {
		this.assignInventorySearchFilter = (assignInventorySearchFilter != null) ? Collections.unmodifiableList(assignInventorySearchFilter) : null;
	}

	public GcmRetAppointment getAppt() {
		return appt;
	}

	public void setAppt(GcmRetAppointment appt) {
		this.appt = appt;
	}
	
	public String getLoginUserKey() {
		return loginUserKey;
	}

	public void setLoginUserKey(String loginUserKey) {
		this.loginUserKey = loginUserKey;
	}

	public boolean isFaxAllMembers() {
		return faxAllMembers;
	}

	public void setFaxAllMembers(boolean faxAllMembers) {
		this.faxAllMembers = faxAllMembers;
	}

	public Long getNoOfPendAttempts() {
		return noOfPendAttempts;
	}

	public void setNoOfPendAttempts(Long noOfPendAttempts) {
		this.noOfPendAttempts = noOfPendAttempts;
	}
}
