package com.optum.gcm.model;

import java.sql.Date;
import java.sql.Timestamp;

import com.optum.gcm.common.annotation.Column;

public class PendWorkListViewInfo {
	
	@Column("GCM_RET_APPT_KEY")
	private Long apptId;
	
	@Column("APPT_DATE_TIME")
	private Date apptDate;
	
	@Column("APPT_TYPE")
	private String apptType;
	
	@Column("PROV_GRP_NAME")
	private String provGroupName;
	
	@Column("PROV_NAME")
	private String provName;
	
	@Column("PROV_LOCATION")
	private String provLocation;
	
	@Column("CNT_TOTAL")
	private Integer cntTotal;
	
	@Column("CNT_NOT_RECVD")
	private Integer cntNotRecvd;
	
	@Column("SPECIAL_CATEGORY")
	private String specialCategory;
	
	@Column("SPECIAL_NOTES")
	private String specialNotes;
	
	@Column("PEND_REASON")
	private String pendReason;
	
	@Column("ASSIGNED_USER")
	private String assignedUser;
	
	public String getPendReason() {
		return pendReason;
	}

	public void setPendReason(String pendReason) {
		this.pendReason = pendReason;
	}

	public String getAssignedUser() {
		return assignedUser;
	}

	public void setAssignedUser(String assignedUser) {
		this.assignedUser = assignedUser;
	}

	public Long getApptId() {
		return apptId;
	}

	public void setApptId(Long apptId) {
		this.apptId = apptId;
	}

	public Date getApptDate() {
		return apptDate != null ? (Date)apptDate.clone() : null;
	}

	public void setApptDate(Date apptDate) {
		this.apptDate = (apptDate != null) ? (Date) apptDate.clone() : null;
	}

	public String getApptType() {
		return apptType;
	}

	public void setApptType(String apptType) {
		this.apptType = apptType;
	}

	public String getProvGroupName() {
		return provGroupName;
	}

	public void setProvGroupName(String provGroupName) {
		this.provGroupName = provGroupName;
	}

	public String getProvName() {
		return provName;
	}

	public void setProvName(String provName) {
		this.provName = provName;
	}

	public String getProvLocation() {
		return provLocation;
	}

	public void setProvLocation(String provLocation) {
		this.provLocation = provLocation;
	}

	public Integer getCntTotal() {
		return cntTotal;
	}

	public void setCntTotal(Integer cntTotal) {
		this.cntTotal = cntTotal;
	}

	public Integer getCntNotRecvd() {
		return cntNotRecvd;
	}

	public void setCntNotRecvd(Integer cntNotRecvd) {
		this.cntNotRecvd = cntNotRecvd;
	}

	public String getSpecialCategory() {
		return specialCategory;
	}

	public void setSpecialCategory(String specialCategory) {
		this.specialCategory = specialCategory;
	}

	public String getSpecialNotes() {
		return specialNotes;
	}

	public void setSpecialNotes(String specialNotes) {
		this.specialNotes = specialNotes;
	}
	
	

}
