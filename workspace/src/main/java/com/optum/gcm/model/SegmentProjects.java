package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

public class SegmentProjects {

	@Column("GCM_BUSINESS_SEGMENT")
	private String businessSegment;
	
	@Column("KEY")
	private String projKey;

	@Column("VALUE")
	private String projName;

	public String getBusinessSegment() {
		return businessSegment;
	}

	public void setBusinessSegment(String businessSegment) {
		this.businessSegment = businessSegment;
	}

	public String getProjKey() {
		return projKey;
	}

	public void setProjKey(String projKey) {
		this.projKey = projKey;
	}

	public String getProjName() {
		return projName;
	}

	public void setProjName(String projName) {
		this.projName = projName;
	}
	
}
