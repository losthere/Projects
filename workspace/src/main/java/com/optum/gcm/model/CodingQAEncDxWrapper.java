package com.optum.gcm.model;

import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class CodingQAEncDxWrapper {

	private Long loginUserKey;

	private String loginUserId;

	private Long groupKey;

	private Long projectKey;

	private Long projContKey;

	private Long busFuncVenKey;

	private List<CodingQAEncDxDetails> codingQAEncDxDetailsList;

	public Long getLoginUserKey() {
		return loginUserKey;
	}

	public void setLoginUserKey(Long loginUserKey) {
		this.loginUserKey = loginUserKey;
	}

	public String getLoginUserId() {
		return loginUserId;
	}

	public void setLoginUserId(String loginUserId) {
		this.loginUserId = loginUserId;
	}

	public Long getGroupKey() {
		return groupKey;
	}

	public void setGroupKey(Long groupKey) {
		this.groupKey = groupKey;
	}

	public Long getProjectKey() {
		return projectKey;
	}

	public void setProjectKey(Long projectKey) {
		this.projectKey = projectKey;
	}

	public Long getProjContKey() {
		return projContKey;
	}

	public void setProjContKey(Long projContKey) {
		this.projContKey = projContKey;
	}

	public Long getBusFuncVenKey() {
		return busFuncVenKey;
	}

	public void setBusFuncVenKey(Long busFuncVenKey) {
		this.busFuncVenKey = busFuncVenKey;
	}

	public List<CodingQAEncDxDetails> getCodingQAEncDxDetailsList() {
		return codingQAEncDxDetailsList;
	}

	public void setCodingQAEncDxDetailsList(List<CodingQAEncDxDetails> codingQAEncDxDetailsList) {
		this.codingQAEncDxDetailsList = codingQAEncDxDetailsList;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
	}

}
