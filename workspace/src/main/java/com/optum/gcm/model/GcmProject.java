package com.optum.gcm.model;

import javax.validation.constraints.NotNull;

import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

@Table("GCM_PROJECT")
public class GcmProject {
	@Column(value = "GCM_PROJ_KEY", sequence = "GCM_PROJECT_SEQ")
	private Long projectKey;
	@Column("GCM_PROJ_NAME")
	@NotBlank
	private String projectName;
	@Column("GCM_BUSINESS_SEGMENT")
	@NotBlank
	private String businessSegment;
	@Column("GCM_PROJECT_YEAR")
	@NotNull
	private Long projectYear;
	@Column("REQUESTOR_LAST_NAME")
	@NotEmpty
	private String reqLastName;
	@Column("REQUESTOR_FIRST_NAME")
	@NotBlank
	private String reqFirstName;
	@NotBlank
	private String userId;

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getBusinessSegment() {
		return businessSegment;
	}

	public void setBusinessSegment(String businessSegment) {
		this.businessSegment = businessSegment;
	}

	public Long getProjectYear() {
		return projectYear;
	}

	public void setProjectYear(Long projectYear) {
		this.projectYear = projectYear;
	}

	public String getReqLastName() {
		return reqLastName;
	}

	public void setReqLastName(String reqLastName) {
		this.reqLastName = reqLastName;
	}

	public String getReqFirstName() {
		return reqFirstName;
	}

	public void setReqFirstName(String reqFirstName) {
		this.reqFirstName = reqFirstName;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Long getProjectKey() {
		return projectKey;
	}

	public void setProjectKey(Long projectKey) {
		this.projectKey = projectKey;
	}
	
	@Override
	public String toString() {
		return ReflectionToStringBuilder.toString(this);
	}

}
