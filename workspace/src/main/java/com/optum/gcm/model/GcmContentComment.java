package com.optum.gcm.model;

import java.util.Date;
import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

/**
 * @author pmule
 *
 */

@Table("GCM_CONTENT_COMMENT")
public class GcmContentComment extends BaseModel {

	@Column(value = "GCM_CONTENT_COMMENT_KEY", sequence = "GCM_CONTENT_COMMENT_SEQ")
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
	
	@Column(value = "CONTENT_COMMENT")
	private String contentComment;
	
	@Column(value = "CONTENT_COMMENT_DT")
	private Date commentDt;

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

	public String getContentComment() {
		return contentComment;
	}

	public void setContentComment(String contentComment) {
		this.contentComment = contentComment;
	}

	public Date getCommentDt() {
		return commentDt != null ? (Date)commentDt.clone() : null;
	}

	public void setCommentDt(Date commentDt) {
		this.commentDt = (commentDt != null) ? (Date) commentDt.clone() : null;
	}
	
}
