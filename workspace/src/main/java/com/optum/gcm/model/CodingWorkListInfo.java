
package com.optum.gcm.model;

import java.sql.Date;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class CodingWorkListInfo {
	
	@Column("PROV_GRP_NAME")
	private String provGroupName;
	
	@Column("CHART_ID")
	private String chartId;
	
	@Column("CHART_STATUS")
	private String chartStatus;
	
	@Column("GCM_HP_PRODUCT")
	private String hpProduct;
	
	@Column("HP_CD")
	private String hpCode;
	
	@Column("GCM_CLIENT_CD")
	private String clientCode;
	
	@Column("PROGRAM_NAME")
	private String programName;
	
	@Column("ASSIGNED_DATE")
	private Date assignedDate;
	
	@Column("PAGE_COUNT")
	private Long pageCount;
	
	@Column("GCM_BUS_FUNC_STATUS_DT")
	private Date acceptedDate;
	
	@Column("GCM_PROJ_CONT_BUS_FUNC_VEN_KEY")
	private Long busFuncVenKey;
	
	@Column("GCM_PROJECT_CONTENT_KEY")
	private Long projContentKey;
	
	@Column("CHART_SCORE_GROUP")
	private String chartScoreGroup;
	
	@Column("ESCALATED_FLAG")
	private String escalatedFlag;

	@Column("GCM_BUSINESS_FUNC_KEY")
	private Long busFuncKey;
	
	@Column("QA_ACTION_CD")
	private String qaActionCd;
	
	public String getProvGroupName() {
		return provGroupName;
	}

	public void setProvGroupName(String provGroupName) {
		this.provGroupName = provGroupName;
	}

	public String getChartId() {
		return chartId;
	}

	public void setChartId(String chartId) {
		this.chartId = chartId;
	}

	public String getChartStatus() {
		return chartStatus;
	}

	public void setChartStatus(String chartStatus) {
		this.chartStatus = chartStatus;
	}

	public String getHpProduct() {
		return hpProduct;
	}

	public void setHpProduct(String hpProduct) {
		this.hpProduct = hpProduct;
	}

	public String getHpCode() {
		return hpCode;
	}

	public void setHpCode(String hpCode) {
		this.hpCode = hpCode;
	}

	public String getClientCode() {
		return clientCode;
	}

	public void setClientCode(String clientCode) {
		this.clientCode = clientCode;
	}

	public String getProgramName() {
		return programName;
	}

	public void setProgramName(String programName) {
		this.programName = programName;
	}

	public Date getAssignedDate() {
		return assignedDate != null ? (Date)assignedDate.clone() : null;
	}

	public void setAssignedDate(Date assignedDate) {
		this.assignedDate = (assignedDate != null) ? (Date) assignedDate.clone() : null;
	}

	public Long getPageCount() {
		return pageCount;
	}

	public void setPageCount(Long pageCount) {
		this.pageCount = pageCount;
	}

	public String getChartScoreGroup() {
		return chartScoreGroup;
	}

	public void setChartScoreGroup(String chartScoreGroup) {
		this.chartScoreGroup = chartScoreGroup;
	}

	public Long getBusFuncVenKey() {
		return busFuncVenKey;
	}

	public void setBusFuncVenKey(Long busFuncVenKey) {
		this.busFuncVenKey = busFuncVenKey;
	}

	public Long getProjContentKey() {
		return projContentKey;
	}

	public void setProjContentKey(Long projContentKey) {
		this.projContentKey = projContentKey;
	}

	public String getEscalatedFlag() {
		return escalatedFlag;
	}

	public void setEscalatedFlag(String escalatedFlag) {
		this.escalatedFlag = escalatedFlag;
	}

	public Long getBusFuncKey() {
		return busFuncKey;
	}

	public void setBusFuncKey(Long busFuncKey) {
		this.busFuncKey = busFuncKey;
	}

	public Date getAcceptedDate() {
		return (Date) acceptedDate.clone();
	}

	public void setAcceptedDate(Date acceptedDate) {
		this.acceptedDate = (Date) acceptedDate.clone();
	}

	public String getQaActionCd() {
		return qaActionCd;
	}

	public void setQaActionCd(String qaActionCd) {
		this.qaActionCd = qaActionCd;
	}

	
}

