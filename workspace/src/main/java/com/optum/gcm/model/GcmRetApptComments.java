package com.optum.gcm.model;

import java.sql.Timestamp;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;


/**
 * @author pmule
 *
 */

@Table("GCM_RET_APPT_COMMENTS")
public class GcmRetApptComments {

	@Column(value = "GCM_RET_APPT_COMMENTS_KEY", sequence = "GCM_RET_APPT_COMMENTS_SEQ")
	private long commentsKey;
	
	@Column("GCM_RET_APPT_KEY")
	private Long apptKey;
	
	@Column("APPT_ITERATION")
	private Long apptIteration;
	
	@Column("COMMENTS")
	private String apptComments;
	
	@Column("CREATE_DATE_TIME")
	private Timestamp createDate;
	
	@Column("CREATE_USERID")
	private String createUserId;
	
	@Column("MODIFY_DATE_TIME")
	private Timestamp modifyDate;
	
	@Column("MODIFY_USERID")
	private String modifyUserId;
	
	@Column("COMMENT_TYPE")
	private String commentType;

	public long getCommentsKey() {
		return commentsKey;
	}

	public void setCommentsKey(long commentsKey) {
		this.commentsKey = commentsKey;
	}

	public Long getApptKey() {
		return apptKey;
	}

	public void setApptKey(Long apptKey) {
		this.apptKey = apptKey;
	}

	public Long getApptIteration() {
		return apptIteration;
	}

	public void setApptIteration(Long apptIteration) {
		this.apptIteration = apptIteration;
	}

	public String getApptComments() {
		return apptComments;
	}

	public void setApptComments(String apptComments) {
		this.apptComments = apptComments;
	}

	public Timestamp getCreateDate() {
		return createDate != null ? (Timestamp)createDate.clone() : null;
	}

	public void setCreateDate(Timestamp createDate) {
		this.createDate = (createDate != null) ? (Timestamp)createDate.clone() : null;
	}

	public String getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}

	public Timestamp getModifyDate() {
		return modifyDate != null ? (Timestamp)modifyDate.clone() : null;
	}

	public void setModifyDate(Timestamp modifyDate) {
		this.modifyDate = (modifyDate != null) ? (Timestamp)modifyDate.clone() : null;
	}

	public String getModifyUserId() {
		return modifyUserId;
	}

	public void setModifyUserId(String modifyUserId) {
		this.modifyUserId = modifyUserId;
	}

	public String getCommentType() {
		return commentType;
	}

	public void setCommentType(String commentType) {
		this.commentType = commentType;
	}	
}
