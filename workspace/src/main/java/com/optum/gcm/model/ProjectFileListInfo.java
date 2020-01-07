package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 * 
 */

public class ProjectFileListInfo {
	
	 @Column("GCM_BUSINESS_SEGMENT")
	  private String busSegment;
	  
	  @Column("GCM_PROJ_NAME")
	  private String projName;
	  
	  @Column("GCM_PROJ_KEY")
	  private Long projKey;
	  
	  @Column("GCM_PROJECT_YEAR")
	  private Long projectYear;
	  
	  @Column("GCM_CHASE_FILE_KEY")
	  private Long chaseFileKEy;
	  
	  @Column("FAILURE_COUNT")
	  private Long failureCount;
	  
	  @Column("SUCCESS_COUNT")
	  private Long successCount;
	  
	  @Column("TOTAL_COUNT")
	  private Long totalCount;
	  
	  @Column("FILE_NAME")
	  private String fileName;
	  
	  @Column("CREATE_DATE_TIME")
	  String createDate;
	  
	  @Column("DATA_COLL_STATUS")
	  private String dataCollStatus;
	  
	  @Column("PROCESS_STS_KEY")
	  private int processStatusKey;
	  
	  @Column("IS_OPTUM_RETRIEVAL")
	  private String isOptumRetrieval;
	  
	  @Column("IS_OPTUM_CODING")
	  private String isOptumCoding;
	  

	public String getIsOptumRetrieval() {
		return isOptumRetrieval;
	}

	public void setIsOptumRetrieval(String isOptumRetrieval) {
		this.isOptumRetrieval = isOptumRetrieval;
	}

	public String getIsOptumCoding() {
		return isOptumCoding;
	}

	public void setIsOptumCoding(String isOptumCoding) {
		this.isOptumCoding = isOptumCoding;
	}

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

	public Long getFailureCount() {
		return failureCount;
	}

	public void setFailureCount(Long failureCount) {
		this.failureCount = failureCount;
	}

	public Long getSuccessCount() {
		return successCount;
	}

	public void setSuccessCount(Long successCount) {
		this.successCount = successCount;
	}

	public Long getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(Long totalCount) {
		this.totalCount = totalCount;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getDataCollStatus() {
		return dataCollStatus;
	}

	public void setDataCollStatus(String dataCollStatus) {
		this.dataCollStatus = dataCollStatus;
	}

	public Long getChaseFileKEy() {
		return chaseFileKEy;
	}

	public void setChaseFileKEy(Long chaseFileKEy) {
		this.chaseFileKEy = chaseFileKEy;
	}

	public int getProcessStatusKey() {
		return processStatusKey;
	}

	public void setProcessStatusKey(int processStatusKey) {
		this.processStatusKey = processStatusKey;
	}
	  

}
