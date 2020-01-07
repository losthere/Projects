package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

@Table("GCM_VENDOR_REQUEST")
public class GcmVendorRequest extends BaseModel {

	@Column(value = "GCM_VENDOR_REQUEST_KEY", sequence = "GCM_VENDOR_REQUEST_SEQ")
	private Long vendorReqKey;

	@Column("GCM_PROJ_KEY")
	private Long projKey;

	@Column("GCM_PROGRAM_KEY")
	private Long programKey;

	@Column("GCM_VENDOR_KEY")
	private Long vendorKey;
	
	@Column("NEW_VENDOR_KEY")
	private Long newVendorKey;

	@Column("GCM_PROJ_YEAR")
	private Integer projYear;

	@Column("GCM_HP_KEY")
	private Long hpKey;

	@Column("REQUEST_TYPE")
	private String requestType;

	@Column("GCM_HP_PRODUCT")
	private String hpProduct;

	@Column("GCM_BUS_FUNC_STATUS")
	private String busFuncStatus;

	@Column("GCM_VENDOR_ASSIGN_KEY")
	private Long vendorAssignKey;

	/*@Column("ASSIGNABLE_QUANTITY")
	private Integer assignableQty;

	@Column("GCM_PROJ_NAME")
	private String projName;*/
	
	@Column("GCM_BUSINESS_SEGMENT")
	private String businessSegment;
	
	@Column("PROCESS_STATUS")
	private String processStatus;

	public Long getVendorReqKey() {
		return vendorReqKey;
	}

	public void setVendorReqKey(Long vendorReqKey) {
		this.vendorReqKey = vendorReqKey;
	}

	public Long getProjKey() {
		return projKey;
	}

	public void setProjKey(Long projKey) {
		this.projKey = projKey;
	}

	public Long getProgramKey() {
		return programKey;
	}

	public void setProgramKey(Long programKey) {
		this.programKey = programKey;
	}

	public Long getVendorKey() {
		return vendorKey;
	}

	public void setVendorKey(Long vendorKey) {
		this.vendorKey = vendorKey;
	}
	
	public Long getNewVendorKey() {
		return newVendorKey;
	}

	public void setNewVendorKey(Long newVendorKey) {
		this.newVendorKey = newVendorKey;
	}

	public Integer getProjYear() {
		return projYear;
	}

	public void setProjYear(Integer projYear) {
		this.projYear = projYear;
	}

	public Long getHpKey() {
		return hpKey;
	}

	public void setHpKey(Long hpKey) {
		this.hpKey = hpKey;
	}

	public String getRequestType() {
		return requestType;
	}

	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}

	public String getHpProduct() {
		return hpProduct;
	}

	public void setHpProduct(String hpProduct) {
		this.hpProduct = hpProduct;
	}

	public String getBusFuncStatus() {
		return busFuncStatus;
	}

	public void setBusFuncStatus(String busFuncStatus) {
		this.busFuncStatus = busFuncStatus;
	}

	public Long getVendorAssignKey() {
		return vendorAssignKey;
	}

	public void setVendorAssignKey(Long vendorAssignKey) {
		this.vendorAssignKey = vendorAssignKey;
	}

	/*public Integer getAssignableQty() {
		return assignableQty;
	}

	public void setAssignableQty(Integer assignableQty) {
		this.assignableQty = assignableQty;
	}

	public String getProjName() {
		return projName;
	}

	public void setProjName(String projName) {
		this.projName = projName;
	}*/

	public String getBusinessSegment() {
		return businessSegment;
	}

	public void setBusinessSegment(String businessSegment) {
		this.businessSegment = businessSegment;
	}

	public String getProcessStatus() {
		return processStatus;
	}

	public void setProcessStatus(String processStatus) {
		this.processStatus = processStatus;
	}	
	
}
