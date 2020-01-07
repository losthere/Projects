package com.optum.gcm.model;

import java.util.Date;

import com.optum.gcm.common.annotation.Column;

public class ChartComments {

		@Column("CONTENT_COMMENT")
		private String contentComment;
		
		@Column("USER_NAME")
		private String userName;
		
		@Column("CONTENT_COMMENT_DT")
		private Date contentCommentDt;

		public String getContentComment() {
			return contentComment;
		}

		public void setContentComment(String contentComment) {
			this.contentComment = contentComment;
		}

		public String getUserName() {
			return userName;
		}

		public void setUserName(String userName) {
			this.userName = userName;
		}

		public Date getContentCommentDt() {
			return (Date) contentCommentDt.clone();
		}

		public void setContentCommentDt(Date contentCommentDt) {
			this.contentCommentDt = (Date) contentCommentDt.clone();
		}
		
		
}
