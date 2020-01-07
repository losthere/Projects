package com.optum.gcm.model;

import java.util.Date;

public class DxCodeDOSDetails {


	private String icdDxCd;

	private String dosThruDt;
	
	private String dosFromDt;
	
	private String busSegment;
	
	private String gender;
	
	private String dateOfBirth;
	
	private Long age;

	public String getIcdDxCd() {
		return icdDxCd;
	}

	public void setIcdDxCd(String icdDxCd) {
		this.icdDxCd = icdDxCd;
	}

	public String getDosThruDt() {
		return dosThruDt;
	}

	public void setDosThruDt(String dosThruDt) {
		this.dosThruDt = dosThruDt;
	}

	public String getDosFromDt() {
		return dosFromDt;
	}

	public void setDosFromDt(String dosFromDt) {
		this.dosFromDt = dosFromDt;
	}

	public String getBusSegment() {
		return busSegment;
	}

	public void setBusSegment(String busSegment) {
		this.busSegment = busSegment;
	}

	public String getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public Long getAge() {
		return age;
	}

	public void setAge(Long age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}
	
	
}
