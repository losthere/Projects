package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class AgeGendorMapping {
	
	@Column(value = "FROM_AGE")
	private double fromAge;
	
	@Column(value = "THRU_AGE")
	private double thruAge;
	
	@Column(value = "GENDER")
	private String gender;

	public double getFromAge() {
		return fromAge;
	}

	public void setFromAge(double fromAge) {
		this.fromAge = fromAge;
	}

	public double getThruAge() {
		return thruAge;
	}

	public void setThruAge(double thruAge) {
		this.thruAge = thruAge;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

}

