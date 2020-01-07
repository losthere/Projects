
package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class SupervisorDashboardCodingCounts {

	@Column("AS_OF_DATE")
	private String asOfDate;
	
	@Column("UNASSIGNED_CNT")
	private Long unassingedCnt;
	
	@Column("ASSIGNED_CNT")
	private Long assignedCnt;
	
	@Column("ESCALATED_CNT")
	private Long escalatedCnt;
	
	@Column("COMPLETED_CNT")
	private Long codingCompletedCnt;
	
	@Column("REJECTED_CNT")
	private Long rejectedCnt;
	
	@Column("TOTAL_CNT")
	private Long totalCnt;
	
	@Column("UNASSIGNED_PCT")
	private String unassignedPct;
	
	@Column("ASSIGNED_PCT")
	private String assignedPct;
	
	@Column("ESCALATED_PCT")
	private String escalatedPct;
	
	@Column("COMPLETED_PCT")
	private String codingCompletedPct;

	@Column("REJECTED_PCT")
	private String rejectedPct;
	
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

	public Long getEscalatedCnt() {
		return escalatedCnt;
	}

	public void setEscalatedCnt(Long escalatedCnt) {
		this.escalatedCnt = escalatedCnt;
	}

	public Long getCodingCompletedCnt() {
		return codingCompletedCnt;
	}

	public void setCodingCompletedCnt(Long codingCompletedCnt) {
		this.codingCompletedCnt = codingCompletedCnt;
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

	public String getEscalatedPct() {
		return escalatedPct;
	}

	public void setEscalatedPct(String escalatedPct) {
		this.escalatedPct = escalatedPct;
	}

	public String getCodingCompletedPct() {
		return codingCompletedPct;
	}

	public void setCodingCompletedPct(String codingCompletedPct) {
		this.codingCompletedPct = codingCompletedPct;
	}

	public Long getRejectedCnt() {
		return rejectedCnt;
	}

	public void setRejectedCnt(Long rejectedCnt) {
		this.rejectedCnt = rejectedCnt;
	}

	public String getRejectedPct() {
		return rejectedPct;
	}

	public void setRejectedPct(String rejectedPct) {
		this.rejectedPct = rejectedPct;
	}

	
}
