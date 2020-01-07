package com.optum.gcm.model;

import java.util.List;

import com.optum.gcm.common.annotation.Column;

public class RetrievalHpVendorStatusCountResult extends RetrievalHpVendorStatusCount {
	
	@Column("ASSIGNABLE_COUNT")
	private Integer assignableCount;
	@Column("COMPLETED_COUNT")
	private Integer completedCount;
	@Column("EXTRACTED_COUNT")
	private Integer extractedCount;
	@Column("TOTAL_COUNT")
	private Integer totalCount;
	
	private List<KeyValue<String, Integer>> statusCountObj;
	
	public Integer getAssignableCount() {
		return assignableCount;
	}

	public void setAssignableCount(Integer assignableCount) {
		this.assignableCount = assignableCount;
	}

	public Integer getCompletedCount() {
		return completedCount;
	}

	public void setCompletedCount(Integer completedCount) {
		this.completedCount = completedCount;
	}

	public Integer getExtractedCount() {
		return extractedCount;
	}

	public void setExtractedCount(Integer extractedCount) {
		this.extractedCount = extractedCount;
	}

	public Integer getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(Integer totalCount) {
		this.totalCount = totalCount;
	}

	public List<KeyValue<String, Integer>> getStatusCountObj() {
		return statusCountObj;
	}

	public void setStatusCountObj(List<KeyValue<String, Integer>> statusCountObj) {
		this.statusCountObj = statusCountObj;
	}
}
