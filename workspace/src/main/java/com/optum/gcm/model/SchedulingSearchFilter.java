package com.optum.gcm.model;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * @author pmule
 *
 */

public class SchedulingSearchFilter {

	private String busSegment;
	private Long programKey;
	private String projectName;
	private Long projectKey;
	private Long projYear;
	private Long projContKey;
	private Long clientKey;
	private Long hpKey;
	private String hpProduct;
	private String status;
	private String providerId;
	private String providerGroup;
	private String provGroupName;
	private String provLastName;
	private String provFirstName;
	private String isAssigned;
	private String isCompleted;
	private String requestedUser;
	private String specialCategory;
	private String isOffshoreCoding;
	private String loginUserId;
	private Long vendorKey;
	private Long fromVendorKey;
	private Long loginUserKey;
	private Long codingUserKey;
	private Long percentage;
	private Long fromUserKey;
	private Long toUserKey;
	private Long groupKey;
	private Long recordCount;
	private Long appointmentId;
	private String appointmentStatus;
	private String faxStatus;
	private Long busFuncKey;
	private Long busFuncVenKey;
	private Long busFuncDtlKey;
	private String acceptedFromDate;
	private String acceptedToDate;
	private String chartId;
	private String roleCode;
	private String provSplCode;
	private String chartScoreGrp;
	private String emr;
	private Long noOfPendAttempts;

	public String getBusSegment() {
		return busSegment;
	}

	public void setBusSegment(String busSegment) {
		this.busSegment = busSegment;
	}

	public Long getProgramKey() {
		return programKey;
	}

	public void setProgramKey(Long programKey) {
		this.programKey = programKey;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public Long getProjectKey() {
		return projectKey;
	}

	public void setProjectKey(Long projectKey) {
		this.projectKey = projectKey;
	}

	public Long getProjYear() {
		return projYear;
	}

	public void setProjYear(Long projYear) {
		this.projYear = projYear;
	}

	public Long getProjContKey() {
		return projContKey;
	}

	public void setProjContKey(Long projContKey) {
		this.projContKey = projContKey;
	}

	public Long getClientKey() {
		return clientKey;
	}

	public void setClientKey(Long clientKey) {
		this.clientKey = clientKey;
	}

	public Long getHpKey() {
		return hpKey;
	}

	public void setHpKey(Long hpKey) {
		this.hpKey = hpKey;
	}

	public String getHpProduct() {
		return hpProduct;
	}

	public void setHpProduct(String hpProduct) {
		this.hpProduct = hpProduct;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getProviderId() {
		return providerId;
	}

	public void setProviderId(String providerId) {
		this.providerId = providerId;
	}

	public String getProviderGroup() {
		return providerGroup;
	}

	public void setProviderGroup(String providerGroup) {
		this.providerGroup = providerGroup;
	}

	public String getIsAssigned() {
		return isAssigned;
	}

	public void setIsAssigned(String isAssigned) {
		this.isAssigned = isAssigned;
	}

	public String getRequestedUser() {
		return requestedUser;
	}

	public void setRequestedUser(String requestedUser) {
		this.requestedUser = requestedUser;
	}

	public String getIsOffshoreCoding() {
		return isOffshoreCoding;
	}

	public void setIsOffshoreCoding(String isOffshoreCoding) {
		this.isOffshoreCoding = isOffshoreCoding;
	}

	public Long getVendorKey() {
		return vendorKey;
	}

	public void setVendorKey(Long vendorKey) {
		this.vendorKey = vendorKey;
	}

	public Long getFromUserKey() {
		return fromUserKey;
	}

	public void setFromUserKey(Long fromUserKey) {
		this.fromUserKey = fromUserKey;
	}

	public Long getToUserKey() {
		return toUserKey;
	}

	public void setToUserKey(Long toUserKey) {
		this.toUserKey = toUserKey;
	}

	public Long getGroupKey() {
		return groupKey;
	}

	public void setGroupKey(Long groupKey) {
		this.groupKey = groupKey;
	}

	public Long getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(Long recordCount) {
		this.recordCount = recordCount;
	}

	public String getProvGroupName() {
		return provGroupName;
	}

	public void setProvGroupName(String provGroupName) {
		this.provGroupName = provGroupName;
	}

	public String getProvLastName() {
		return provLastName;
	}

	public void setProvLastName(String provLastName) {
		this.provLastName = provLastName;
	}

	public String getProvFirstName() {
		return provFirstName;
	}

	public void setProvFirstName(String provFirstName) {
		this.provFirstName = provFirstName;
	}

	public Long getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(Long appointmentId) {
		this.appointmentId = appointmentId;
	}

	public String getSpecialCategory() {
		return specialCategory;
	}

	public void setSpecialCategory(String specialCategory) {
		this.specialCategory = specialCategory;
	}

	public String getLoginUserId() {
		return loginUserId;
	}

	public void setLoginUserId(String loginUserId) {
		this.loginUserId = loginUserId;
	}

	public Long getLoginUserKey() {
		return loginUserKey;
	}

	public void setLoginUserKey(Long loginUserKey) {
		this.loginUserKey = loginUserKey;
	}

	public Long getCodingUserKey() {
		return codingUserKey;
	}

	public void setCodingUserKey(Long codingUserKey) {
		this.codingUserKey = codingUserKey;
	}

	public Long getPercentage() {
		return percentage;
	}

	public void setPercentage(Long percentage) {
		this.percentage = percentage;
	}

	public Long getBusFuncKey() {
		return busFuncKey;
	}

	public void setBusFuncKey(Long busFuncKey) {
		this.busFuncKey = busFuncKey;
	}

	public Long getBusFuncVenKey() {
		return busFuncVenKey;
	}

	public void setBusFuncVenKey(Long busFuncVenKey) {
		this.busFuncVenKey = busFuncVenKey;
	}

	public Long getBusFuncDtlKey() {
		return busFuncDtlKey;
	}

	public void setBusFuncDtlKey(Long busFuncDtlKey) {
		this.busFuncDtlKey = busFuncDtlKey;
	}

	public String getIsCompleted() {
		return isCompleted;
	}

	public void setIsCompleted(String isCompleted) {
		this.isCompleted = isCompleted;
	}

	public String getAcceptedFromDate() {
		return acceptedFromDate;
	}

	public void setAcceptedFromDate(String acceptedFromDate) {
		this.acceptedFromDate = acceptedFromDate;
	}

	public String getAcceptedToDate() {
		return acceptedToDate;
	}

	public void setAcceptedToDate(String acceptedToDate) {
		this.acceptedToDate = acceptedToDate;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
	}

	public String getAppointmentStatus() {
		return appointmentStatus;
	}

	public void setAppointmentStatus(String appointmentStatus) {
		this.appointmentStatus = appointmentStatus;
	}

	public String getFaxStatus() {
		return faxStatus;
	}

	public void setFaxStatus(String faxStatus) {
		this.faxStatus = faxStatus;
	}

	public String getChartId() {
		return chartId;
	}

	public void setChartId(String chartId) {
		this.chartId = chartId;
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getProvSplCode() {
		return provSplCode;
	}

	public void setProvSplCode(String provSplCode) {
		this.provSplCode = provSplCode;
	}

	public String getChartScoreGrp() {
		return chartScoreGrp;
	}

	public void setChartScoreGrp(String chartScoreGrp) {
		this.chartScoreGrp = chartScoreGrp;
	}

	public String getEmr() {
		return emr;
	}

	public void setEmr(String emr) {
		this.emr = emr;
	}

	public Long getFromVendorKey() {
		return fromVendorKey;
	}

	public void setFromVendorKey(Long fromVendorKey) {
		this.fromVendorKey = fromVendorKey;
	}

	public Long getNoOfPendAttempts() {
		return noOfPendAttempts;
	}

	public void setNoOfPendAttempts(Long noOfPendAttempts) {
		this.noOfPendAttempts = noOfPendAttempts;
	}

}
