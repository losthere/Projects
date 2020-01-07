package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class SupervisorDashboardCodingQACounts {

	@Column("AS_OF_DATE")
	private String asOfDate;
	
	@Column("UNASSIGNED_CNT")
	private Long unassingedCnt;
	
	@Column("ASSIGNED_CNT")
	private Long assignedCnt;
	
	@Column("QA_COMPLETE_CNT")
	private Long qaCompletedCnt;
	
	@Column("QA_NOT_ELIG_CNT")
	private Long qaNotEligCnt;
	
	@Column("TOTAL_CNT")
	private Long totalCnt;
	
	@Column("UNASSIGNED_PCT")
	private String unassignedPct;
	
	@Column("ASSIGNED_PCT")
	private String assignedPct;
	
	@Column("QA_COMPLETE_PCT")
	private String codingCompletedPct;
	
	@Column("QA_NOT_ELIG_PCT")
	private String qaNotEligPct;
	
	public String getAsOfDate() {
		return asOfDate;
	}

	public void setAsOfDate(String asOfDate) {
		this.asOfDate = asOfDate;
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

	public Long getQaCompletedCnt() {
		return qaCompletedCnt;
	}

	public void setQaCompletedCnt(Long qaCompletedCnt) {
		this.qaCompletedCnt = qaCompletedCnt;
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

	public String getCodingCompletedPct() {
		return codingCompletedPct;
	}

	public void setCodingCompletedPct(String codingCompletedPct) {
		this.codingCompletedPct = codingCompletedPct;
	}

	public Long getQaNotEligCnt() {
		return qaNotEligCnt;
	}

	public void setQaNotEligCnt(Long qaNotEligCnt) {
		this.qaNotEligCnt = qaNotEligCnt;
	}

	public String getQaNotEligPct() {
		return qaNotEligPct;
	}

	public void setQaNotEligPct(String qaNotEligPct) {
		this.qaNotEligPct = qaNotEligPct;
	}

	
}

