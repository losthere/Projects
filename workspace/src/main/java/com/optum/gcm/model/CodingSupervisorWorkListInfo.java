package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class CodingSupervisorWorkListInfo {
	
	@Column("PROV_GRP_NAME")
	private String provGroupName;
	
	@Column("CHART_ID")
	private String chartId;
	
	@Column("GCM_HP_PRODUCT")
	private String hpProduct;
	
	@Column("HP_CD")
	private String hpCode;
	
	@Column("GCM_CLIENT_CD")
	private String clientCode;
	
	@Column("ESCALATED_BY")
	private String escalatedBy;
	
	public String getEscalationReasonDesc() {
		return escalationReasonDesc;
	}

	public void setEscalationReasonDesc(String escalationReasonDesc) {
		this.escalationReasonDesc = escalationReasonDesc;
	}

	@Column("PROGRAM_NAME")
	private String programName;
	
	@Column("GCM_REASON_CODE")
	private String escalationReasonCode;
	
	@Column("GCM_REASON_DESC")
	private String escalationReasonDesc;
	
	@Column("GCM_PROJ_CONT_BUS_FUNC_VEN_KEY")
	private Long busFuncVenKey;
	
	@Column("GCM_PROJECT_CONTENT_KEY")
	private Long projContentKey;

	@Column("GCM_BUSINESS_FUNC_KEY")
	private Long busFunKey;
	
	
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

	public String getEscalatedBy() {
		return escalatedBy;
	}

	public void setEscalatedBy(String escalatedBy) {
		this.escalatedBy = escalatedBy;
	}

	public String getProgramName() {
		return programName;
	}

	public void setProgramName(String programName) {
		this.programName = programName;
	}

	public String getEscalationReasonCode() {
		return escalationReasonCode;
	}

	public void setEscalationReasonCode(String escalationReasonCode) {
		this.escalationReasonCode = escalationReasonCode;
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

	public Long getBusFunKey() {
		return busFunKey;
	}

	public void setBusFunKey(Long busFunKey) {
		this.busFunKey = busFunKey;
	}
	

}
