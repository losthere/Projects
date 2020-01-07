package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class ChartStatusCount {
	
	@Column("SCHEDULED_CNT")
	private Integer scheduledCnt;

	@Column("RECEIVED_CNT")
	private Integer receivedCnt;
	
	@Column("UNSCHEDULED_CNT")
	private Integer unscheduledCnt;
	
	@Column("NONRETRIEVABLE_CNT")
	private Integer nonRetrievableCnt;
	
	
	public Integer getScheduledCnt() {
		return scheduledCnt;
	}

	public void setScheduledCnt(Integer scheduledCnt) {
		this.scheduledCnt = scheduledCnt;
	}

	public Integer getReceivedCnt() {
		return receivedCnt;
	}

	public void setReceivedCnt(Integer receivedCnt) {
		this.receivedCnt = receivedCnt;
	}

	public Integer getUnscheduledCnt() {
		return unscheduledCnt;
	}

	public void setUnscheduledCnt(Integer unscheduledCnt) {
		this.unscheduledCnt = unscheduledCnt;
	}

	public Integer getNonRetrievableCnt() {
		return nonRetrievableCnt;
	}

	public void setNonRetrievableCnt(Integer nonRetrievableCnt) {
		this.nonRetrievableCnt = nonRetrievableCnt;
	}

	
}
