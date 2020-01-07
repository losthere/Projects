package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class SchedulingChartCount {
	
	@Column("RECEIVED_CNT")
	private Integer receivedCnt;

	@Column("INPROGRESS_CNT")
	private Integer inprogressCnt;
	
	@Column("PASTDUE_CNT")
	private Integer pastdueCnt;

	public Integer getReceivedCnt() {
		return receivedCnt;
	}

	public void setReceivedCnt(Integer receivedCnt) {
		this.receivedCnt = receivedCnt;
	}

	public Integer getInprogressCnt() {
		return inprogressCnt;
	}

	public void setInprogressCnt(Integer inprogressCnt) {
		this.inprogressCnt = inprogressCnt;
	}

	public Integer getPastdueCnt() {
		return pastdueCnt;
	}

	public void setPastdueCnt(Integer pastdueCnt) {
		this.pastdueCnt = pastdueCnt;
	}
	
	
}
