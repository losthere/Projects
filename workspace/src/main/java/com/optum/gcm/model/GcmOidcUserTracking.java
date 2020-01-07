package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

@Table("GCM_OIDC_USER_TRAKING")
public class GcmOidcUserTracking {
	
	@Column("STATE")
	private String state;
	
	@Column("AUTH_TOKEN")
	private String authToken;
	
	@Column("CODE")
	private String code;
	
	@Column("USER_NAME")
	private String userName;
	
	@Column("UUID")
	private String uuid;
	
	@Column("FIRST_NAME")
	private String firstName;
	
	@Column("LAST_NAME")
	private String lastName;
	
	@Column("EMAIL")
	private String email;
	
	@Column("ACCESS_TOKEN")
	private String accessToken;
	
	@Column("REFRESH_TOKEN")
	private String refreshToken;
	
	@Column("EXPIRES_IN")
	private Integer expiresIn;

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getAuthToken() {
		return authToken;
	}

	public void setAuthToken(String authToken) {
		this.authToken = authToken;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public Integer getExpiresIn() {
		return expiresIn;
	}

	public void setExpiresIn(Integer expiresIn) {
		this.expiresIn = expiresIn;
	}

}
