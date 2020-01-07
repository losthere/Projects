package com.optum.gcm.model;

import java.sql.Timestamp;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;
/**
 * @author pmule
 *
 */

@Table("GCM_RET_APPT")
public class GcmRetAppointment extends BaseModel {
	
	@Column(value = "GCM_RET_APPT_KEY", sequence = "GCM_RET_APPT_SEQ")
	private long apptKey;
	
	@Column("APPT_ITERATION")
	private Long apptIteration;
	
	@Column("FIRST_NAME")
	private String firstName;
	
	@Column("LAST_NAME")
	private String lastName;
	
	@Column("MIDDLE_NAME")
	private String middleName;
	
	@Column("ADDRESS_1")
	private String address1;
	
	@Column("ADDRESS_2")
	private String address2;
	
	@Column("CITY")
	private String city;
	
	@Column("STATE")
	private String state;
	
	@Column("ZIP")
	private String zip;
	
	@Column("PHONE_NUM")
	private String phoneNum;
	
	@Column("FAX_NUM")
	private String faxNum;
	
	@Column("EMAIL")
	private String email;
	
	@Column("FAX_STATUS")
	private String faxStatus;
	
	@Column("APPT_STATUS")
	private String apptStatus;
	
	@Column("APPT_DATE_TIME")
	private Timestamp apptDateTime;
	
	private String uiApptDate;
	
	@Column("APPT_TYPE")
	private String apptType;
	
	@Column("GCM_USER_KEY")
	private long gcmUserKey;

	@Column("GCM_VENDOR_KEY")
	private long gcmVendorKey;
	
	@Column("GCM_GROUP_KEY")
	private long gcmGroupKey;
	
	@Column("NO_OF_ATTEMPTS")
	private Long noOfAttempts;
	
	@Column("NO_OF_PEND_ATTEMPTS")
	private Long noOfPendAttempts;
	
	private String barcode;

	@Column("GCM_REASON_CODE")
	private String reasonCode;
	
	@Column("GCM_REASON_COMMENT")
	private String reasonComment;
	
	
	public String getBarcode() {
		return barcode;
	}

	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}

	public String getReasonCode() {
		return reasonCode;
	}

	public void setReasonCode(String reasonCode) {
		this.reasonCode = reasonCode;
	}

	public String getReasonComment() {
		return reasonComment;
	}

	public void setReasonComment(String reasonComment) {
		this.reasonComment = reasonComment;
	}

	public void setNoOfAttempts(Long noOfAttempts) {
		this.noOfAttempts = noOfAttempts;
	}

	public long getApptKey() {
		return apptKey;
	}

	public void setApptKey(long apptKey) {
		this.apptKey = apptKey;
	}

	public Long getApptIteration() {
		return apptIteration;
	}

	public void setApptIteration(Long apptIteration) {
		this.apptIteration = apptIteration;
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

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getPhoneNum() {
		return phoneNum;
	}

	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}

	public String getFaxNum() {
		return faxNum;
	}

	public void setFaxNum(String faxNum) {
		this.faxNum = faxNum;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFaxStatus() {
		return faxStatus;
	}

	public void setFaxStatus(String faxStatus) {
		this.faxStatus = faxStatus;
	}

	public Timestamp getApptDateTime() {
		return apptDateTime != null ? (Timestamp)apptDateTime.clone() : null;
	}

	public void setApptDateTime(Timestamp apptDateTime) {
		this.apptDateTime = (apptDateTime != null) ? (Timestamp)apptDateTime.clone() : null;
	}

	public String getApptType() {
		return apptType;
	}

	public void setApptType(String apptType) {
		this.apptType = apptType;
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

	public long getGcmVendorKey() {
		return gcmVendorKey;
	}

	public void setGcmVendorKey(long gcmVendorKey) {
		this.gcmVendorKey = gcmVendorKey;
	}

	public long getGcmGroupKey() {
		return gcmGroupKey;
	}

	public void setGcmGroupKey(long gcmGroupKey) {
		this.gcmGroupKey = gcmGroupKey;
	}

	public String getUiApptDate() {
		return uiApptDate;
	}

	public void setUiApptDate(String uiApptDate) {
		this.uiApptDate = uiApptDate;
	}

	public Long getNoOfAttempts() {
		return noOfAttempts;
	}

	public void setNoOfAttempt(Long noOfAttempts) {
		this.noOfAttempts = noOfAttempts;
	}	
	public Long getNoOfPendAttempts() {
		return noOfPendAttempts;
	}

	public void setNoOfPendAttempts(Long noOfPendAttempts) {
		this.noOfPendAttempts = noOfPendAttempts;
	}
}
