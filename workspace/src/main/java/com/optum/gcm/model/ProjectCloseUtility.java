package com.optum.gcm.model;

/**
 * @author pmule
 * 
 */

public class ProjectCloseUtility {
	
	private Long projKey;
	private Long userId;
	private Boolean isImgExt;
	private String region;
	
	public Long getProjKey() {
		return projKey;
	}
	public String getRegion() {
		return region;
	}
	public void setRegion(String region) {
		this.region = region;
	}
	public void setProjKey(Long projKey) {
		this.projKey = projKey;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Boolean getIsImgExt() {
		return isImgExt;
	}
	public void setIsImgExt(Boolean isImgExt) {
		this.isImgExt = isImgExt;
	}

}
