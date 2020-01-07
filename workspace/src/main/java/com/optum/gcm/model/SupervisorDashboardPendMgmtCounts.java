package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class SupervisorDashboardPendMgmtCounts {

	@Column("AS_OF_DATE")
	private String asOfDate;
	
	@Column("TAB_CODE")
	private String tabCode;
	
	@Column("UNASSIGNED_CNT")
	private Long unassingedCnt;
	
	@Column("ASSIGNED_CNT")
	private Long assignedCnt;
	
	@Column("RELEASED_CNT")
	private Long releasedCnt;
	
	@Column("NON_RETRIEVABLE_CNT")
	private Long nonRetrievableCnt;
	
	@Column("CNA_CNT")
	private Long cnaCnt;
	
	@Column("TOTAL_CNT")
	private Long totalCnt;
	
	@Column("UNASSIGNED_PCT")
	private String unassignedPct;
	
	@Column("ASSIGNED_PCT")
	private String assignedPct;
	
	@Column("RELEASED_PCT")
	private String releasedPct;
	
	@Column("NON_RETRIEVABLE_PCT")
	private String nonRetrievablePct;
	
	@Column("CNA_PCT")
	private String cnaPct;
	
	@Column("GCM_REASON_DESC")
	private String gcmReasonDesc;
	
	@Column("REASON_PCT")
	private String reasonPct;
	
	@Column("REASON_CNT")
	private Long reasonCnt;
	
	@Column("REASON_CNT_1_TO_5")
	private Long reasonCnt1To5;
	
	@Column("REASON_CNT_6_TO_10")
	private Long reasonCnt6To10;
	
	@Column("REASON_CNT_11_PLUS")
	private Long reasonCnt11Plus;


	public String getAsOfDate() {
		return asOfDate;
	}

	public void setAsOfDate(String asOfDate) {
		this.asOfDate = asOfDate;
	}

	public String getTabCode() {
		return tabCode;
	}

	public void setTabCode(String tabCode) {
		this.tabCode = tabCode;
	}

	public Long getUnassingedCnt() {
		return unassingedCnt;
	}

	public void setUnassingedCnt(Long unassingedCnt) {
		this.unassingedCnt = unassingedCnt;
	}

	public Long getAssignedCnt() {
		return assignedCnt;
	}

	public void setAssignedCnt(Long assignedCnt) {
		this.assignedCnt = assignedCnt;
	}

	public Long getReleasedCnt() {
		return releasedCnt;
	}

	public void setReleasedCnt(Long releasedCnt) {
		this.releasedCnt = releasedCnt;
	}

	public Long getNonRetrievableCnt() {
		return nonRetrievableCnt;
	}

	public void setNonRetrievableCnt(Long nonRetrievableCnt) {
		this.nonRetrievableCnt = nonRetrievableCnt;
	}
	
	public Long getCnaCnt() {
		return cnaCnt;
	}

	public void setCnaCnt(Long cnaCnt) {
		this.cnaCnt = cnaCnt;
	}

	public Long getTotalCnt() {
		return totalCnt;
	}

	public void setTotalCnt(Long totalCnt) {
		this.totalCnt = totalCnt;
	}

	public String getUnassignedPct() {
		return unassignedPct;
	}

	public void setUnassignedPct(String unassignedPct) {
		this.unassignedPct = unassignedPct;
	}

	public String getAssignedPct() {
		return assignedPct;
	}

	public void setAssignedPct(String assignedPct) {
		this.assignedPct = assignedPct;
	}

	public String getReleasedPct() {
		return releasedPct;
	}

	public void setReleasedPct(String releasedPct) {
		this.releasedPct = releasedPct;
	}

	public String getNonRetrievablePct() {
		return nonRetrievablePct;
	}

	public void setNonRetrievablePct(String nonRetrievablePct) {
		this.nonRetrievablePct = nonRetrievablePct;
	}
	
	public String getCnaPct() {
		return cnaPct;
	}

	public void setCnaPct(String cnaPct) {
		this.cnaPct = cnaPct;
	}

	public String getGcmReasonDesc() {
		return gcmReasonDesc;
	}

	public void setGcmReasonDesc(String gcmReasonDesc) {
		this.gcmReasonDesc = gcmReasonDesc;
	}

	public String getReasonPct() {
		return reasonPct;
	}

	public void setReasonPct(String reasonPct) {
		this.reasonPct = reasonPct;
	}

	public Long getReasonCnt() {
		return reasonCnt;
	}

	public void setReasonCnt(Long reasonCnt) {
		this.reasonCnt = reasonCnt;
	}

	public Long getReasonCnt1To5() {
		return reasonCnt1To5;
	}

	public void setReasonCnt1To5(Long reasonCnt1To5) {
		this.reasonCnt1To5 = reasonCnt1To5;
	}

	public Long getReasonCnt6To10() {
		return reasonCnt6To10;
	}

	public void setReasonCnt6To10(Long reasonCnt6To10) {
		this.reasonCnt6To10 = reasonCnt6To10;
	}

	public Long getReasonCnt11Plus() {
		return reasonCnt11Plus;
	}

	public void setReasonCnt11Plus(Long reasonCnt11Plus) {
		this.reasonCnt11Plus = reasonCnt11Plus;
	}
	
	
}
