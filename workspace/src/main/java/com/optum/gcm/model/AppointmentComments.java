package com.optum.gcm.model;

import java.sql.Timestamp;

import com.optum.gcm.common.annotation.Column;

public class AppointmentComments {
	
	@Column("GCM_RET_APPT_KEY")
	private Long apptKey;
	
	@Column("APPT_ITERATION")
	private Long apptIteration;
	
	@Column("COMMENTS")
	private String apptComments;
	
	@Column("CREATE_DATE_TIME")
	private Timestamp createDate;
	
	@Column("CREATE_USERID")
	private String createUserId;

	public Long getApptKey() {
		return apptKey;
	}

	public void setApptKey(Long apptKey) {
		this.apptKey = apptKey;
	}

	public Long getApptIteration() {
		return apptIteration;
	}

	public void setApptIteration(Long apptIteration) {
		this.apptIteration = apptIteration;
	}

	public String getApptComments() {
		return apptComments;
	}

	public void setApptComments(String apptComments) {
		this.apptComments = apptComments;
	}

	public Timestamp getCreateDate() {
		return createDate != null ? (Timestamp)createDate.clone() : null;
	}

	public void setCreateDate(Timestamp createDate) {
		this.createDate = (createDate != null) ? (Timestamp) createDate.clone() : null;
	}

	public String getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}
	

}
