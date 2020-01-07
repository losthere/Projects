package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class SupervisorDashboardRetrievalCounts {

	@Column("AS_OF_DATE")
	private String asOfDate;

	@Column("NOT_RETRIEVED_CNT")
	private Long notRetrievedCnt;

	@Column("CLIENT_UPLOAD_CNT")
	private Long clientUploadCnt;

	@Column("EMR_CNT")
	private Long emrCnt;

	@Column("FAX_CNT")
	private Long faxCnt;

	@Column("MAIL_CNT")
	private Long mailCnt;

	@Column("MAIL_CD_FD_CNT")
	private Long mailCdFdCnt;

	@Column("ONSITE_CNT")
	private Long onsiteCnt;

	@Column("OPTUM_RETRIEVED_CNT")
	private Long optumRetvdCnt;

	@Column("PROVIDER_UPLOAD_CNT")
	private Long providerUploadCnt;

	@Column("TOTAL_CNT")
	private Long totalCnt;

	@Column("NOT_RETRIEVED_PCT")
	private String notRetvdPct;

	@Column("CLIENT_UPLOAD_PCT")
	private String clientUploadPct;

	@Column("EMR_PCT")
	private String emrPct;

	@Column("FAX_PCT")
	private String faxPct;

	@Column("MAIL_PCT")
	private String mailPct;

	@Column("MAIL_CD_FD_PCT")
	private String mailCdFdPct;

	@Column("ONSITE_PCT")
	private String onsitePct;

	@Column("OPTUM_RETRIEVED_PCT")
	private String optumRetvdPct;

	@Column("PROVIDER_UPLOAD_PCT")
	private String providerUploadPct;

	public String getAsOfDate() {
		return asOfDate;
	}

	public void setAsOfDate(String asOfDate) {
		this.asOfDate = asOfDate;
	}

	public Long getNotRetrievedCnt() {
		return notRetrievedCnt;
	}

	public void setNotRetrievedCnt(Long notRetrievedCnt) {
		this.notRetrievedCnt = notRetrievedCnt;
	}

	public Long getClientUploadCnt() {
		return clientUploadCnt;
	}

	public void setClientUploadCnt(Long clientUploadCnt) {
		this.clientUploadCnt = clientUploadCnt;
	}

	public Long getEmrCnt() {
		return emrCnt;
	}

	public void setEmrCnt(Long emrCnt) {
		this.emrCnt = emrCnt;
	}

	public Long getFaxCnt() {
		return faxCnt;
	}

	public void setFaxCnt(Long faxCnt) {
		this.faxCnt = faxCnt;
	}

	public Long getMailCnt() {
		return mailCnt;
	}

	public void setMailCnt(Long mailCnt) {
		this.mailCnt = mailCnt;
	}

	public Long getMailCdFdCnt() {
		return mailCdFdCnt;
	}

	public void setMailCdFdCnt(Long mailCdFdCnt) {
		this.mailCdFdCnt = mailCdFdCnt;
	}

	public Long getOnsiteCnt() {
		return onsiteCnt;
	}

	public void setOnsiteCnt(Long onsiteCnt) {
		this.onsiteCnt = onsiteCnt;
	}

	public Long getOptumRetvdCnt() {
		return optumRetvdCnt;
	}

	public void setOptumRetvdCnt(Long optumRetvdCnt) {
		this.optumRetvdCnt = optumRetvdCnt;
	}

	public Long getProviderUploadCnt() {
		return providerUploadCnt;
	}

	public void setProviderUploadCnt(Long providerUploadCnt) {
		this.providerUploadCnt = providerUploadCnt;
	}

	public Long getTotalCnt() {
		return totalCnt;
	}

	public void setTotalCnt(Long totalCnt) {
		this.totalCnt = totalCnt;
	}

	public String getNotRetvdPct() {
		return notRetvdPct;
	}

	public void setNotRetvdPct(String notRetvdPct) {
		this.notRetvdPct = notRetvdPct;
	}

	public String getClientUploadPct() {
		return clientUploadPct;
	}

	public void setClientUploadPct(String clientUploadPct) {
		this.clientUploadPct = clientUploadPct;
	}

	public String getEmrPct() {
		return emrPct;
	}

	public void setEmrPct(String emrPct) {
		this.emrPct = emrPct;
	}

	public String getFaxPct() {
		return faxPct;
	}

	public void setFaxPct(String faxPct) {
		this.faxPct = faxPct;
	}

	public String getMailPct() {
		return mailPct;
	}

	public void setMailPct(String mailPct) {
		this.mailPct = mailPct;
	}

	public String getMailCdFdPct() {
		return mailCdFdPct;
	}

	public void setMailCdFdPct(String mailCdFdPct) {
		this.mailCdFdPct = mailCdFdPct;
	}

	public String getOnsitePct() {
		return onsitePct;
	}

	public void setOnsitePct(String onsitePct) {
		this.onsitePct = onsitePct;
	}

	public String getOptumRetvdPct() {
		return optumRetvdPct;
	}

	public void setOptumRetvdPct(String optumRetvdPct) {
		this.optumRetvdPct = optumRetvdPct;
	}

	public String getProviderUploadPct() {
		return providerUploadPct;
	}

	public void setProviderUploadPct(String providerUploadPct) {
		this.providerUploadPct = providerUploadPct;
	}

}