package com.optum.gcm.model;

import java.sql.Timestamp;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

@Table("STG_EXT_USER_INFO")
public class StgExtUserInfo {

	@Column(value = "STG_EXT_USER_INFO_KEY", sequence="STG_EXT_USER_INFO_SEQ")
	private Long stgExtUserInfoKey;
	
	@Column("STG_EXT_USER_FILE_INFO_KEY")
	private Long stgExtUserFileInfoKey;
	
	@Column("FIRST_NAME")
	private String firstName;
	
	@Column("LAST_NAME")
	private String lastName;
	
	@Column("EMAIL")
	private String email;
	
	@Column("ROLE")
	private String role;
	
	@Column("REPORTS_TO_USERID")
	private String reportsToUserID;
	
	@Column("ACC_MGR_USERID")
	private String accMgrUserID;
	
	@Column("CONTACT_ADDRESS_1")
	private String contactAddress1;
	
	@Column("CONTACT_ADDRESS_2")
	private String contactAddress2;
	
	@Column("CONTACT_CITY")
	private String contactCity;
	
	@Column("CONTACT_STATE")
	private String contactState;
	
	@Column("CONTACT_ZIP_CODE")
	private String contactZipCode;
	
	@Column("ORGANIZATION_NAME")
	private String organizationName;
	
	@Column("IS_VALID")
	private String isValid;
	
	@Column("VAL_MESSAGE")
	private String valMessage;	
	
	@Column("GCM_USER_KEY")
	private String gcmUserKey;
	
	@Column("GCM_VENDOR_KEY")
	private String gcmVendorKey;
	
	@Column("CREATION_DATE_TIME")
	private Timestamp creationDate;
	
	@Column("CREATED_BY")
	private String createdBy;
	
	@Column("MODIFIED_DATE_TIME")
	private Timestamp modifiedDate;	

	@Column("MODIFIED_BY")
	private String modifiedBy;
	
	public Long getStgExtUserInfoKey() {
		return stgExtUserInfoKey;
	}


	public void setStgExtUserInfoKey(Long stgExtUserInfoKey) {
		this.stgExtUserInfoKey = stgExtUserInfoKey;
	}


	public Long getStgExtUserFileInfoKey() {
		return stgExtUserFileInfoKey;
	}


	public void setStgExtUserFileInfoKey(Long stgExtUserFileInfoKey) {
		this.stgExtUserFileInfoKey = stgExtUserFileInfoKey;
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


	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}


	public String getReportsToUserID() {
		return reportsToUserID;
	}


	public void setReportsToUserID(String reportsToUserID) {
		this.reportsToUserID = reportsToUserID;
	}


	public String getAccMgrUserID() {
		return accMgrUserID;
	}


	public void setAccMgrUserID(String accMgrUserID) {
		this.accMgrUserID = accMgrUserID;
	}


	public String getContactAddress1() {
		return contactAddress1;
	}


	public void setContactAddress1(String contactAddress1) {
		this.contactAddress1 = contactAddress1;
	}


	public String getContactAddress2() {
		return contactAddress2;
	}


	public void setContactAddress2(String contactAddress2) {
		this.contactAddress2 = contactAddress2;
	}


	public String getContactCity() {
		return contactCity;
	}


	public void setContactCity(String contactCity) {
		this.contactCity = contactCity;
	}


	public String getContactState() {
		return contactState;
	}


	public void setContactState(String contactState) {
		this.contactState = contactState;
	}


	public String getContactZipCode() {
		return contactZipCode;
	}


	public void setContactZipCode(String contactZipCode) {
		this.contactZipCode = contactZipCode;
	}


	public String getOrganizationName() {
		return organizationName;
	}


	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}


	public String getIsValid() {
		return isValid;
	}


	public void setIsValid(String isValid) {
		this.isValid = isValid;
	}


	public String getValMessage() {
		return valMessage;
	}


	public void setValMessage(String valMessage) {
		this.valMessage = valMessage;
	}


	public String getGcmUserKey() {
		return gcmUserKey;
	}


	public void setGcmUserKey(String gcmUserKey) {
		this.gcmUserKey = gcmUserKey;
	}


	public String getGcmVendorKey() {
		return gcmVendorKey;
	}


	public void setGcmVendorKey(String gcmVendorKey) {
		this.gcmVendorKey = gcmVendorKey;
	}


	public Timestamp getCreationDate() {
		return creationDate != null ? (Timestamp)creationDate.clone() : null;
	}


	public void setCreationDate(Timestamp creationDate) {
		this.creationDate = (creationDate != null) ? (Timestamp)creationDate.clone() : null;
	}


	public String getCreatedBy() {
		return createdBy;
	}


	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}


	public Timestamp getModifiedDate() {
		return modifiedDate != null ? (Timestamp)modifiedDate.clone() : null;
	}


	public void setModifiedDate(Timestamp modifiedDate) {
		this.modifiedDate = (modifiedDate != null) ? (Timestamp) modifiedDate.clone() : null;
	}


	public String getModifiedBy() {
		return modifiedBy;
	}


	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
	}
}
