package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

public class CodingUser extends User {

	@Column("CNT_ASSIGNED")
	private long assignedCount;

	public long getAssignedCount() {
		return assignedCount;
	}

	public void setAssignedCount(long assignedCount) {
		this.assignedCount = assignedCount;
	}

}
