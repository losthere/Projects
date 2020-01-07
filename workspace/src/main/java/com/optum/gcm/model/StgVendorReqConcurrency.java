package com.optum.gcm.model;

import java.sql.Timestamp;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

@Table("STG_VENDOR_REQUEST_CONCURRENCY")
public class StgVendorReqConcurrency {
	@Column("GCM_PROJ_KEY")
	private Long projKey;
	@Column("GCM_PROGRAM_KEY")
	private Long programKey;
	@Column("GCM_HP_KEY")
	private Long hpKey;
	@Column("REQUEST_TYPE")
	private String reqestType;
	@Column("GCM_VENDOR_KEY")
	private Long vendorKey;
	@Column("LOGGED_IN_USER")
	private String userId;
	@Column("CREATE_DATE_TIME")
	private Timestamp crateDate;

	public Long getProjKey() {
		return projKey;
	}

	public void setProjKey(Long projKey) {
		this.projKey = projKey;
	}

	public Long getProgramKey() {
		return programKey;
	}

	public void setProgramKey(Long programKey) {
		this.programKey = programKey;
	}

	public Long getHpKey() {
		return hpKey;
	}

	public void setHpKey(Long hpKey) {
		this.hpKey = hpKey;
	}

	public String getReqestType() {
		return reqestType;
	}

	public void setReqestType(String reqestType) {
		this.reqestType = reqestType;
	}

	public Long getVendorKey() {
		return vendorKey;
	}

	public void setVendorKey(Long vendorKey) {
		this.vendorKey = vendorKey;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Timestamp getCrateDate() {
		return crateDate != null ? (Timestamp)crateDate.clone() : null;
	}

	public void setCrateDate(Timestamp crateDate) {
		this.crateDate = (crateDate != null) ? (Timestamp)crateDate.clone() : null;
	}

}
