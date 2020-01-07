package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class ExistingAppointment {
	
	@Column("GCM_RET_APPT_KEY")
	private String apptId;
	
	@Column("RETR_LOCATION")
	private String retrLocation;
	
	@Column("RETR_CONTACT")
	private String retrContact;
	
	@Column("APPT_USERNAME")
	private String apptUserName;
	
	@Column("RETR_PHONE")
	private String retrPhone;
	
	@Column("RETR_FAX")
	private String retrFax;
	
	@Column("APPT_TYPE")
	private String apptType;
	
	@Column("APPT_STATUS")
	private String apptStatus;
	
	@Column("APPT_DATE")
	private String apptDate;
	
	@Column("APPT_TIME")
	private String apptTime;
	
	@Column("CHART_CNT")
	private Long chartCnt;
	
	@Column("RET_CNT")
	private Long retCnt;
	
	@Column("GCM_USER_KEY")
	private long gcmUserKey;
	
	public String getApptId() {
		return apptId;
	}

	public void setApptId(String apptId) {
		this.apptId = apptId;
	}

	public String getRetrLocation() {
		return retrLocation;
	}

	public void setRetrLocation(String retrLocation) {
		this.retrLocation = retrLocation;
	}

	public String getApptUserName() {
		return apptUserName;
	}

	public void setApptUserName(String apptUserName) {
		this.apptUserName = apptUserName;
	}

	public String getRetrPhone() {
		return retrPhone;
	}

	public void setRetrPhone(String retrPhone) {
		this.retrPhone = retrPhone;
	}

	public String getRetrFax() {
		return retrFax;
	}

	public void setRetrFax(String retrFax) {
		this.retrFax = retrFax;
	}

	public String getApptType() {
		return apptType;
	}

	public void setApptType(String apptType) {
		this.apptType = apptType;
	}

	public String getApptDate() {
		return apptDate;
	}

	public void setApptDate(String apptDate) {
		this.apptDate = apptDate;
	}

	public String getApptTime() {
		return apptTime;
	}

	public void setApptTime(String apptTime) {
		this.apptTime = apptTime;
	}

	public Long getChartCnt() {
		return chartCnt;
	}

	public void setChartCnt(Long chartCnt) {
		this.chartCnt = chartCnt;
	}

	public Long getRetCnt() {
		return retCnt;
	}

	public void setRetCnt(Long retCnt) {
		this.retCnt = retCnt;
	}

	public String getRetrContact() {
		return retrContact;
	}

	public void setRetrContact(String retrContact) {
		this.retrContact = retrContact;
	}

	public String getApptStatus() {
		return apptStatus;
	}

	public void setApptStatus(String apptStatus) {
		this.apptStatus = apptStatus;
	}

	public long getGcmUserKey() {
		return gcmUserKey;
	}

	public void setGcmUserKey(long gcmUserKey) {
		this.gcmUserKey = gcmUserKey;
	}
	
}
