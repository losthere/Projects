
package com.optum.gcm.model;

import java.sql.Timestamp;
import java.util.Date;

import com.optum.gcm.common.annotation.Column;
/**
 * @author pmule
 *
 */

public class ChartCommentsInfo {

		@Column("GCM_PROJ_CONT_BUS_FUNC_VEN_KEY")
		private Long busFuncVenKey;
		
		@Column("GCM_PROJECT_CONTENT_KEY")
		private Long projContentKey;
		
		@Column("GCM_BUSINESS_FUNC_KEY")
		private Long busFuncKey;
		
		@Column("GCM_PROJ_KEY")
		private Long projKey;
	
		@Column("CONTENT_COMMENT")
		private String contentComment;
		
		@Column("USER_NAME")
		private String userName;
		
		@Column("CHART_ID")
		private String chartId;
		
		@Column("CONTENT_COMMENT_DT")
		private Date contentCommentDt;

		public Long getBusFuncVenKey() {
			return busFuncVenKey;
		}

		public void setBusFuncVenKey(Long busFuncVenKey) {
			this.busFuncVenKey = busFuncVenKey;
		}

		public Long getBusFuncKey() {
			return busFuncKey;
		}

		public void setBusFuncKey(Long busFuncKey) {
			this.busFuncKey = busFuncKey;
		}

		public Long getProjKey() {
			return projKey;
		}

		public void setProjKey(Long projKey) {
			this.projKey = projKey;
		}

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

		public String getChartId() {
			return chartId;
		}

		public void setChartId(String chartId) {
			this.chartId = chartId;
		}

		public Date getContentCommentDt() {
			return contentCommentDt != null ? (Date)contentCommentDt.clone() : null;
		}

		public void setContentCommentDt(Date contentCommentDt) {
			this.contentCommentDt = (contentCommentDt != null) ? (Date) contentCommentDt.clone() : null;
		}

		public Long getProjContentKey() {
			return projContentKey;
		}

		public void setProjContentKey(Long projContentKey) {
			this.projContentKey = projContentKey;
		}


}
