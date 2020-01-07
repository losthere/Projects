package com.optum.gcm.model;

import java.util.Date;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class ChartMember {
	
	@Column("PROV_GRP_NAME")
	private String provGroupName;
	
	@Column("PROV_NAME")
	private String provName;
	
	@Column("PROV_LOCATION")
	private String provLocation;
	
	@Column("PROV_PHONE")
	private String provPhone;
	
	@Column("PROV_FAX")
	private String provFax;
	
	@Column("MEMBER_NAME")
	private String memberName;
	
	@Column("MEMBER_DOB")
	private Date memberDOB;
	
	@Column("MEMBER_GENDER")
	private String memberGender;
	
	@Column("CHART_ID")
	private String chartId;
	
	@Column("IS_INCLUDE_FLAG")
	private String isIncludeFlag;
	
	@Column("PEND_REASON")
	private String pendReason;
	
	
	@Column("GCM_BUS_FUNC_STATUS")
	private String busFuncStatus;

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

	public String getProvLocation() {
		return provLocation;
	}

	public void setProvLocation(String provLocation) {
		this.provLocation = provLocation;
	}

	public String getProvPhone() {
		return provPhone;
	}

	public void setProvPhone(String provPhone) {
		this.provPhone = provPhone;
	}

	public String getProvFax() {
		return provFax;
	}

	public void setProvFax(String provFax) {
		this.provFax = provFax;
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

	public String getIsIncludeFlag() {
		return isIncludeFlag;
	}

	public void setIsIncludeFlag(String isIncludeFlag) {
		this.isIncludeFlag = isIncludeFlag;
	}

	public String getBusFuncStatus() {
		return busFuncStatus;
	}

	public void setBusFuncStatus(String busFuncStatus) {
		this.busFuncStatus = busFuncStatus;
	}

	public String getPendReason() {
		return pendReason;
	}

	public void setPendReason(String pendReason) {
		this.pendReason = pendReason;
	}
}
