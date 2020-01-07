package com.optum.gcm.model;


/**
 * @author pmule
 *
 */

public class UtilitiesFilter {
	
	private String createDate;
	private Long loginUserKey;
	private Long groupKey;
	private String requestedUser;
	private Long fileKey;
	private Long projKey;
	private Long projYear;
	private Long vendorKey;
	private String fileName;
	private String busSegment;
	private String region;
	
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	
	public Long getLoginUserKey() {
		return loginUserKey;
	}
	public void setLoginUserKey(Long loginUserKey) {
		this.loginUserKey = loginUserKey;
	}
	public Long getGroupKey() {
		return groupKey;
	}
	public void setGroupKey(Long groupKey) {
		this.groupKey = groupKey;
	}
	public String getRequestedUser() {
		return requestedUser;
	}
	public void setRequestedUser(String requestedUser) {
		this.requestedUser = requestedUser;
	}
	public Long getFileKey() {
		return fileKey;
	}
	public void setFileKey(Long fileKey) {
		this.fileKey = fileKey;
	}
	public Long getProjKey() {
		return projKey;
	}
	public void setProjKey(Long projKey) {
		this.projKey = projKey;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public Long getProjYear() {
		return projYear;
	}
	public void setProjYear(Long projYear) {
		this.projYear = projYear;
	}
	public Long getVendorKey() {
		return vendorKey;
	}
	public void setVendorKey(Long vendorKey) {
		this.vendorKey = vendorKey;
	}
	public String getBusSegment() {
		return busSegment;
	}
	public void setBusSegment(String busSegment) {
		this.busSegment = busSegment;
	}
	public String getRegion() {
		return region;
	}
	public void setRegion(String region) {
		this.region = region;
	}
}
