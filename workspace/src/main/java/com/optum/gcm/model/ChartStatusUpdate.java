package com.optum.gcm.model;

import java.util.Collections;
import java.util.List;

/**
 * @author pmule
 *
 */

public class ChartStatusUpdate {
	
		private String retStatus;
		
		private String requestedUserId;
		
		private List<String> chartIdList;
		
		private List<String> chartIdExclList;
		
		private String retMethod;
		
		private String includeFlag;
		
		private Long busFuncDtlKey;
		
		private String pendReasonCode;
		
		private String pendReasonComment;
		
		public String getRetStatus() {
			return retStatus;
		}

		public void setRetStatus(String retStatus) {
			this.retStatus = retStatus;
		}
		
		public List<String> getChartIdList() {
			return (chartIdList != null) ? Collections.unmodifiableList(chartIdList) : null;
		}

		public void setChartIdList(List<String> chartIdList) {
			this.chartIdList = (chartIdList != null) ? Collections.unmodifiableList(chartIdList) : null;
		}		

		public List<String> getChartIdExclList() {
			return (chartIdExclList != null) ? Collections.unmodifiableList(chartIdExclList) : null;
		}

		public void setChartIdExclList(List<String> chartIdExclList) {
			this.chartIdExclList = (chartIdExclList != null) ? Collections.unmodifiableList(chartIdExclList) : null;
		}

		public String getRetMethod() {
			return retMethod;
		}

		public void setRetMethod(String retMethod) {
			this.retMethod = retMethod;
		}

		public String getRequestedUserId() {
			return requestedUserId;
		}

		public void setRequestedUserId(String requestedUserId) {
			this.requestedUserId = requestedUserId;
		}

		public String getIncludeFlag() {
			return includeFlag;
		}

		public void setIncludeFlag(String includeFlag) {
			this.includeFlag = includeFlag;
		}

		public Long getBusFuncDtlKey() {
			return busFuncDtlKey;
		}

		public void setBusFuncDtlKey(Long busFuncDtlKey) {
			this.busFuncDtlKey = busFuncDtlKey;
		}

		public String getPendReasonCode() {
			return pendReasonCode;
		}

		public void setPendReasonCode(String pendReasonCode) {
			this.pendReasonCode = pendReasonCode;
		}

		public String getPendReasonComment() {
			return pendReasonComment;
		}

		public void setPendReasonComment(String pendReasonComment) {
			this.pendReasonComment = pendReasonComment;
		}
}
