package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class SupervisorDashboardSchedulingCounts {

	@Column("AS_OF_DATE")
	private String asOfDate;
	
	@Column("TAB_CODE")
	private String tabCode;
	
	@Column("UNSCHEDULED_CNT")
	private Long unscheduledCnt;
	
	@Column("UNASSIGNED_CNT")
	private Long unassingedCnt;
	
	@Column("PAST_DUE_CNT")
	private Long pastDueCnt;
	
	@Column("ASSIGNED_CNT")
	private Long assignedCnt;
	
	@Column("SCHEDULED_CNT")
	private Long scheduledCnt;
	
	@Column("COMPLETED_CNT")
	private Long completedCnt;
	
	@Column("CANCELED_CNT")
	private Long canceledCnt;
	
	@Column("PEND_CNT")
	private Long pendCnt;
	
	@Column("CNA_CNT")
	private Long cnaCnt;	
	
	@Column("TOTAL_CNT")
	private Long totalCnt;
	
	@Column("UNSCHEDULED_PCT")
	private String unscheduledPct;
	
	public Long getUnscheduledCnt() {
		return unscheduledCnt;
	}

	public void setUnscheduledCnt(Long unscheduledCnt) {
		this.unscheduledCnt = unscheduledCnt;
	}

	public String getUnscheduledPct() {
		return unscheduledPct;
	}

	public void setUnscheduledPct(String unscheduledPct) {
		this.unscheduledPct = unscheduledPct;
	}

	@Column("UNASSIGNED_PCT")
	private String unassignedPct;
	
	@Column("PAST_DUE_PCT")
	private String pastDuePct;
	
	@Column("ASSIGNED_PCT")
	private String assignedPct;
	
	@Column("SCHEDULED_PCT")
	private String scheduledPct;
	
	@Column("CANCELED_PCT")
	private String canceledPct;
	
	@Column("PEND_PCT")
	private String pendPct;
	
	@Column("COMPLETED_PCT")
	private String completedPct;
	
	@Column("CNA_PCT")
	private String cnatPCt;	

	public Long getCnaCnt() {
		return cnaCnt;
	}

	public void setCnaCnt(Long cnaCnt) {
		this.cnaCnt = cnaCnt;
	}

	public String getCnatPCt() {
		return cnatPCt;
	}

	public void setCnatPCt(String cnatPCt) {
		this.cnatPCt = cnatPCt;
	}

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

	public Long getPastDueCnt() {
		return pastDueCnt;
	}

	public void setPastDueCnt(Long pastDueCnt) {
		this.pastDueCnt = pastDueCnt;
	}

	public Long getAssignedCnt() {
		return assignedCnt;
	}

	public void setAssignedCnt(Long assignedCnt) {
		this.assignedCnt = assignedCnt;
	}

	public Long getScheduledCnt() {
		return scheduledCnt;
	}

	public void setScheduledCnt(Long scheduledCnt) {
		this.scheduledCnt = scheduledCnt;
	}

	public Long getCompletedCnt() {
		return completedCnt;
	}

	public void setCompletedCnt(Long completedCnt) {
		this.completedCnt = completedCnt;
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

	public String getPastDuePct() {
		return pastDuePct;
	}

	public void setPastDuePct(String pastDuePct) {
		this.pastDuePct = pastDuePct;
	}

	public String getAssignedPct() {
		return assignedPct;
	}

	public void setAssignedPct(String assignedPct) {
		this.assignedPct = assignedPct;
	}

	public String getScheduledPct() {
		return scheduledPct;
	}

	public void setScheduledPct(String scheduledPct) {
		this.scheduledPct = scheduledPct;
	}

	public String getCompletedPct() {
		return completedPct;
	}

	public void setCompletedPct(String completedPct) {
		this.completedPct = completedPct;
	}

	public Long getCanceledCnt() {
		return canceledCnt;
	}

	public void setCanceledCnt(Long canceledCnt) {
		this.canceledCnt = canceledCnt;
	}

	public Long getPendCnt() {
		return pendCnt;
	}

	public void setPendCnt(Long pendCnt) {
		this.pendCnt = pendCnt;
	}

	public String getCanceledPct() {
		return canceledPct;
	}

	public void setCanceledPct(String canceledPct) {
		this.canceledPct = canceledPct;
	}

	public String getPendPct() {
		return pendPct;
	}

	public void setPendPct(String pendPct) {
		this.pendPct = pendPct;
	}
	
	
}
