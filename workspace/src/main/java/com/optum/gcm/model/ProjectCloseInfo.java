package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 * 
 */

public class ProjectCloseInfo {
	
	 @Column("GCM_BUSINESS_SEGMENT")
	  private String busSegment;
	  
	  @Column("GCM_PROJ_NAME")
	  private String projName;
	  
	  @Column("GCM_PROJ_KEY")
	  private Long projKey;
	  
	  @Column("GCM_PROJECT_YEAR")
	  private Long projectYear;
	  
	  @Column("REC_COUNT")
	  private Long totalCount;

	public String getBusSegment() {
		return busSegment;
	}

	public void setBusSegment(String busSegment) {
		this.busSegment = busSegment;
	}

	public String getProjName() {
		return projName;
	}

	public void setProjName(String projName) {
		this.projName = projName;
	}

	public Long getProjKey() {
		return projKey;
	}

	public void setProjKey(Long projKey) {
		this.projKey = projKey;
	}

	public Long getProjectYear() {
		return projectYear;
	}

	public void setProjectYear(Long projectYear) {
		this.projectYear = projectYear;
	}

	public Long getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(Long totalCount) {
		this.totalCount = totalCount;
	}
	  

}
