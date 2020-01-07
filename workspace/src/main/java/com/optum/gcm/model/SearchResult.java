package com.optum.gcm.model;

import java.util.Date;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */
public class SearchResult {

	@Column("GROUP_NAME")
	private String provGroupName;
	
	@Column("PROVIDER_NAME")
	private String provName;
	
	@Column("MEMBER_NAME")
	private String memberName;
	
	@Column("MEMBER_DOB")
	private Date memberDOB;
	
	@Column("GENDER")
	private String memberGender;
	
	@Column("CHART_ID")
	private String chartId;
	
	@Column("ASSIGNED_TO_USER")
	private String assignedUser;
	
	@Column("STATUS")
	private String busFuncStatus;
	
	@Column("BUSINESS_FUNCTION")
	private String busFunction;
	
	@Column("GCM_PROJ_KEY")
	private Long projKey;
	
	@Column("GCM_PROJECT_CONTENT_KEY")
	private Long projContentKey;
	
	@Column("GCM_PROJ_CONT_BUS_FUNC_VEN_KEY")
	private Long busFuncVenKey;     
	
	@Column("GCM_RET_WI_KEY")
	private Long retWiKey;
	
	@Column("GCM_BUSINESS_FUNC_KEY")
	private Long busFuncKey; 
	
	@Column("IMAGE_NAME")
	private String imageName;
	
	
	@Column("DISABLE_HYPERLINK_IND")
	private String disableHyperLink;
	
	
	private Boolean disableHyperLink1;
	
	
	
	public Boolean getDisableHyperLink1() {
		return disableHyperLink1;
	}

	public void setDisableHyperLink1(Boolean disableHyperLink1) {
		this.disableHyperLink1 = disableHyperLink1;
	}

	public String getDisableHyperLink() {
		return disableHyperLink;
	}

	public void setDisableHyperLink(String disableHyperLink) {
		this.disableHyperLink = disableHyperLink;
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

	public String getMemberName() {
		return memberName;
	}

	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}

	public Date getMemberDOB() {
		return memberDOB != null ? (Date)memberDOB.clone() : null;
	}

	public void setMemberDOB(Date memberDOB) {
		this.memberDOB = (memberDOB != null) ? (Date) memberDOB.clone() : null;
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

	public String getAssignedUser() {
		return assignedUser;
	}

	public void setAssignedUser(String assignedUser) {
		this.assignedUser = assignedUser;
	}

	public String getBusFuncStatus() {
		return busFuncStatus;
	}

	public void setBusFuncStatus(String busFuncStatus) {
		this.busFuncStatus = busFuncStatus;
	}

	public String getBusFunction() {
		return busFunction;
	}

	public void setBusFunction(String busFunction) {
		this.busFunction = busFunction;
	}

	public Long getProjKey() {
		return projKey;
	}

	public void setProjKey(Long projKey) {
		this.projKey = projKey;
	}

	public Long getProjContentKey() {
		return projContentKey;
	}

	public void setProjContentKey(Long projContentKey) {
		this.projContentKey = projContentKey;
	}

	public Long getBusFuncVenKey() {
		return busFuncVenKey;
	}

	public void setBusFuncVenKey(Long busFuncVenKey) {
		this.busFuncVenKey = busFuncVenKey;
	}

	public Long getRetWiKey() {
		return retWiKey;
	}

	public void setRetWiKey(Long retWiKey) {
		this.retWiKey = retWiKey;
	}

	public Long getBusFuncKey() {
		return busFuncKey;
	}

	public void setBusFuncKey(Long busFuncKey) {
		this.busFuncKey = busFuncKey;
	}
	
	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

}
