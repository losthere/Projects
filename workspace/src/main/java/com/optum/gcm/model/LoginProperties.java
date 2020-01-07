package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

public class LoginProperties {
	
	@Column("loginUrl")
	private String loginUrl;
	
	@Column("verifyUrl")
	private String verifyUrl;
	
	@Column("reportsUrl")
	private String reportsUrl;
	
	@Column("relyingId")
	private String relyingId;

	public String getLoginUrl() {
		return loginUrl;
	}

	public void setLoginUrl(String loginUrl) {
		this.loginUrl = loginUrl;
	}

	public String getVerifyUrl() {
		return verifyUrl;
	}

	public void setVerifyUrl(String verifyUrl) {
		this.verifyUrl = verifyUrl;
	}

	public String getReportsUrl() {
		return reportsUrl;
	}

	public void setReportsUrl(String reportsUrl) {
		this.reportsUrl = reportsUrl;
	}

	public String getRelyingId() {
		return relyingId;
	}

	public void setRelyingId(String relyingId) {
		this.relyingId = relyingId;
	}
	
}

