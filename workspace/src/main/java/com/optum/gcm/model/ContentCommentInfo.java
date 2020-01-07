
package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class ContentCommentInfo  {

	
	@Column(value = "GCM_PROJECT_CONTENT_KEY")
	private Long projContentKey;
	
	@Column(value = "GCM_PROJ_CONTENT_BARCODE")
	private String barcode;
	
	@Column(value = "GCM_PROJ_CONT_BUS_FUNC_VEN_KEY")
	private Long busFuncKey;
	
	@Column(value = "GCM_PROJ_KEY")
	private Long projectKey;
	
	@Column(value = "CONTENT_COMMENT")
	private String contentComment;

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

	public Long getBusFuncKey() {
		return busFuncKey;
	}

	public void setBusFuncKey(Long busFuncKey) {
		this.busFuncKey = busFuncKey;
	}

	public Long getProjectKey() {
		return projectKey;
	}

	public void setProjectKey(Long projectKey) {
		this.projectKey = projectKey;
	}

	public String getContentComment() {
		return contentComment;
	}

	public void setContentComment(String contentComment) {
		this.contentComment = contentComment;
	}

	
}
