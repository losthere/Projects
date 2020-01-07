
package com.optum.gcm.model;

import java.sql.Timestamp;

import com.optum.gcm.common.annotation.Column;

/**
 * @author sgangul1
 */

public class RightFaxDetails {

	@Column("GCM_RET_APPT_KEY")
	private Long apptKey;

	@Column("DOCUMENT_ID")
	private String documentID;
	
	@Column("STATUS")
	private String faxStatus;

	@Column("MODIFY_DATE_TIME")
	private Timestamp faxDateTime;

	public Long getApptKey() {
		return apptKey;
	}

	public void setApptKey(Long apptKey) {
		this.apptKey = apptKey;
	}

	public String getDocumentID() {
		return documentID;
	}

	public void setDocumentID(String documentID) {
		this.documentID = documentID;
	}

	public String getFaxStatus() {
		return faxStatus;
	}

	public void setFaxStatus(String status) {
		this.faxStatus = status;
	}

	public Timestamp getFaxDateTime() {
		return faxDateTime != null ? (Timestamp)faxDateTime.clone() : null;
	}

	public void setFaxDateTime(Timestamp modifyDateTime) {
		this.faxDateTime = (faxDateTime != null) ? (Timestamp) faxDateTime.clone() : null;
	}

}
