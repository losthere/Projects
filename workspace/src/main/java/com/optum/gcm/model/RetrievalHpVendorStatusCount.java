package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

public class RetrievalHpVendorStatusCount {
	@Column("GCM_PROJ_KEY")
	private Long projKey;
	@Column("GCM_PROGRAM_KEY")
	private Long programKey;
	@Column("GCM_HP_KEY")
	private Long hpKey;
	@Column("HP_CD")
	private String hpCd;
	@Column("GCM_CLIENT_DESC")
	private String client;
	@Column("GCM_CLIENT_KEY")
	private String clientKey;
	@Column("VENDOR_NAME")
	private String vendor;
	@Column("GCM_VENDOR_KEY")
	private Long vendorKey;
	@Column("GCM_PROJECT_YEAR")
	private Integer projYear;
	@Column("STATUS")
	private String status;
	@Column("STATUS_CNT")
	private Integer statusCnt;
	

	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getStatusCnt() {
		return statusCnt;
	}

	public void setStatusCnt(Integer statusCnt) {
		this.statusCnt = statusCnt;
	}
	
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

	public String getHpCd() {
		return hpCd;
	}

	public void setHpCd(String hpCd) {
		this.hpCd = hpCd;
	}

	public String getClient() {
		return client;
	}

	public void setClient(String client) {
		this.client = client;
	}

	public String getClientKey() {
		return clientKey;
	}

	public void setClientKey(String clientKey) {
		this.clientKey = clientKey;
	}

	public String getVendor() {
		return vendor;
	}

	public void setVendor(String vendor) {
		this.vendor = vendor;
	}

	public Long getVendorKey() {
		return vendorKey;
	}

	public void setVendorKey(Long vendorKey) {
		this.vendorKey = vendorKey;
	}


	public Integer getProjYear() {
		return projYear;
	}

	public void setProjYear(Integer projYear) {
		this.projYear = projYear;
	}

}
