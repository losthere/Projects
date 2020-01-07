package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

public class UserData {
	
	@Column("USERID")
	private String userId;
	
	@Column("LAST_NAME")
	private String lastName;
	
	@Column("FIRST_NAME")
	private String firstName;
	
	@Column("EMAIL")
	private String email;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
