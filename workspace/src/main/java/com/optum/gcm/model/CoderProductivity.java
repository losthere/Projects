package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

/**
 * @author pmule
 *
 */

@Table("GCM_CODER_PRODUCTIVITY")
public class CoderProductivity extends BaseModel {
	public Long getContentCommentKey() {
		return contentCommentKey;
	}

	public void setContentCommentKey(Long contentCommentKey) {
		this.contentCommentKey = contentCommentKey;
	}

	public Long getProjContentKey() {
		return projContentKey;
	}

	public void setProjContentKey(Long projContentKey) {
		this.projContentKey = projContentKey;
	}

	public String getBarcode() {
		return barcode;
	}

	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}

	public Long getBusFuncVenKey() {
		return busFuncVenKey;
	}

	public void setBusFuncVenKey(Long busFuncVenKey) {
		this.busFuncVenKey = busFuncVenKey;
	}

	public Long getProjectKey() {
		return projectKey;
	}

	public void setProjectKey(Long projectKey) {
		this.projectKey = projectKey;
	}

	public Long getBusFuncKey() {
		return busFuncKey;
	}

	public void setBusFuncKey(Long busFuncKey) {
		this.busFuncKey = busFuncKey;
	}

	public String getBusFuncStatus() {
		return busFuncStatus;
	}

	public void setBusFuncStatus(String busFuncStatus) {
		this.busFuncStatus = busFuncStatus;
	}

	public Long getVendorKey() {
		return vendorKey;
	}

	public void setVendorKey(Long vendorKey) {
		this.vendorKey = vendorKey;
	}

	public Long getUserKey() {
		return userKey;
	}

	public void setUserKey(Long userKey) {
		this.userKey = userKey;
	}

	public String getEvent() {
		return event;
	}

	public void setEvent(String event) {
		this.event = event;
	}

	public String getWorkId() {
		return workId;
	}

	public void setWorkId(String workId) {
		this.workId = workId;
	}

	public String getWorkListParentActKey() {
		return workListParentActKey;
	}

	public void setWorkListParentActKey(String workListParentActKey) {
		this.workListParentActKey = workListParentActKey;
	}

	public Long getProjectYear() {
		return projectYear;
	}

	public void setProjectYear(Long projectYear) {
		this.projectYear = projectYear;
	}

	@Column(value = "GCM_CODER_PRODUCTIVITY_KEY", sequence = "GCM_CODER_PRODUCTIVITY_SEQ")
	private Long contentCommentKey;
	
	@Column(value = "GCM_PROJECT_CONTENT_KEY")
	private Long projContentKey;
	
	@Column(value = "GCM_PROJ_CONTENT_BARCODE")
	private String barcode;
	
	@Column(value = "GCM_PROJ_CONT_BUS_FUNC_VEN_KEY")
	private Long busFuncVenKey;
	
	@Column(value = "GCM_PROJ_KEY")
	private Long projectKey;
	
	@Column(value = "GCM_BUSINESS_FUNC_KEY")
	private Long busFuncKey;
	
	@Column(value = "GCM_BUS_FUNC_STATUS")
	private String busFuncStatus;	
	
	@Column(value = "GCM_VENDOR_KEY")
	private Long vendorKey;
	
	@Column(value = "GCM_USER_KEY")
	private Long userKey;
	
	@Column(value = "EVENT")
	private String event;	
	
	@Column(value = "WORK_ID")
	private String workId;
	
	@Column(value = "WORK_LIST_PARENT_ACTIVITY_KEY")
	private String workListParentActKey;

	@Column(value = "GCM_PROJECT_YEAR")
	private Long projectYear;
	
	
}
