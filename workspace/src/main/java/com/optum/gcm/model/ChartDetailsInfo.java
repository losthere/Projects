package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class ChartDetailsInfo {
	
	@Column("GCM_PROJECT_CONTENT_KEY")
	private Long projContentKey;
	
	@Column("GCM_PROJ_CONT_BUS_FUNC_VEN_KEY")
	private Long busFuncVenKey;
	
	@Column("GCM_BUSINESS_FUNC_KEY")
	private Long busFuncKey;
	
	@Column("GCM_PROJ_KEY")
	private Long projKey;
	
	@Column("GCM_BUSINESS_SEGMENT")
	private String busSegment;
	
	@Column("PROV_GRP_NAME")
	private String provGroupName;
	
	@Column("PROV_NAME")
	private String provName;
	
	@Column("PROV_GRP_ID")
	private String provGroupId;
	
	@Column("HP_MBR_ID")
	private String hpMemberId;
	
	@Column("MEMBER_NAME")
	private String memberName;
	
	@Column("MBR_DOB")
	private String memberDOB;
	
	@Column("MBR_GENDER")
	private String memberGender;
	
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
	
	@Column("CHART_REVIEW_YEAR")
	private String chartReviewYear;
	
	@Column("SOURCE_SYSTEM_PROV_ID")
	private String providerId;
	
	@Column("CODING_INSTRUCTIONS")
	private String codingInstructions;
	
	@Column("PROGRAM_INSTRUCTIONS")
	private String programInstructions;

	@Column("GCM_CONTENT_EO_KEY")
	private String contentEoKey;
	
	@Column("WORK_ID")
	private String workId;
	
	@Column("CURRENT_SESSION_ID")
	private String currentSessionId;
	
	@Column("GCM_GROUP_KEY")
	private Long projOrgGroup;
	
	@Column("MBR_EXT_ID")
	private String mbrextID;
	
	public String getMbrextID() {
		return mbrextID;
	}

	public void setMbrextID(String mbrextID) {
		this.mbrextID = mbrextID;
	}

	public Long getProjContentKey() {
		return projContentKey;
	}

	public void setProjContentKey(Long projContentKey) {
		this.projContentKey = projContentKey;
	}

	public String getProvGroupName() {
		return provGroupName;
	}

	public void setProvGroupName(String provGroupName) {
		this.provGroupName = provGroupName;
	}

	public String getProvName() {
		return provName;
	}

	public void setProvName(String provName) {
		this.provName = provName;
	}

	public String getProvGroupId() {
		return provGroupId;
	}

	public void setProvGroupId(String provGroupId) {
		this.provGroupId = provGroupId;
	}

	public String getMemberName() {
		return memberName;
	}

	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}

	public String getMemberDOB() {
		return memberDOB;
	}

	public void setMemberDOB(String memberDOB) {
		this.memberDOB = memberDOB;
	}

	public String getMemberGender() {
		return memberGender;
	}

	public void setMemberGender(String memberGender) {
		this.memberGender = memberGender;
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

	public String getChartReviewYear() {
		return chartReviewYear;
	}

	public void setChartReviewYear(String chartReviewYear) {
		this.chartReviewYear = chartReviewYear;
	}


	public String getProviderId() {
		return providerId;
	}

	public void setProviderId(String providerId) {
		this.providerId = providerId;
	}

	public String getCodingInstructions() {
		return codingInstructions;
	}

	public void setCodingInstructions(String codingInstructions) {
		this.codingInstructions = codingInstructions;
	}

	public String getProgramInstructions() {
		return programInstructions;
	}

	public void setProgramInstructions(String programInstructions) {
		this.programInstructions = programInstructions;
	}

	public Long getProjKey() {
		return projKey;
	}

	public void setProjKey(Long projKey) {
		this.projKey = projKey;
	}

	public String getHpMemberId() {
		return hpMemberId;
	}

	public void setHpMemberId(String hpMemberId) {
		this.hpMemberId = hpMemberId;
	}

	public Long getBusFuncVenKey() {
		return busFuncVenKey;
	}

	public void setBusFuncVenKey(Long busFuncVenKey) {
		this.busFuncVenKey = busFuncVenKey;
	}

	public String getBusSegment() {
		return busSegment;
	}

	public void setBusSegment(String busSegment) {
		this.busSegment = busSegment;
	}

	public Long getBusFuncKey() {
		return busFuncKey;
	}

	public void setBusFuncKey(Long busFuncKey) {
		this.busFuncKey = busFuncKey;
	}

	public String getContentEoKey() {
		return contentEoKey;
	}

	public void setContentEoKey(String contentEoKey) {
		this.contentEoKey = contentEoKey;
	}

	public String getWorkId() {
		return workId;
	}

	public void setWorkId(String workId) {
		this.workId = workId;
	}

	public String getCurrentSessionId() {
		return currentSessionId;
	}

	public void setCurrentSessionId(String currentSessionId) {
		this.currentSessionId = currentSessionId;
	}

	public Long getProjOrgGroup() {
		return projOrgGroup;
	}

	public void setProjOrgGroup(Long projOrgGroup) {
		this.projOrgGroup = projOrgGroup;
	}
}
