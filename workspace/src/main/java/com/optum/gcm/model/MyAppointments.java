package com.optum.gcm.model;

import java.sql.Date;
import java.sql.Timestamp;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class MyAppointments {
		
		@Column("GCM_RET_APPT_KEY")
		private Long apptId;
		
		@Column("APPT_STATUS")
		private String apptStatus;
		
		@Column("PROV_LOCATION")
		private String provLocation;
		
		@Column("PROV_NAME")
		private String provName;
		
		@Column("PROV_GRP_NAME")
		private String provGroupName;
		
		@Column("FAX_STATUS")
		private String faxStatus;
		
		@Column("CREATE_DATE_TIME")
		private Date createDateTime;
					
		@Column("APPT_DATE_TIME")
		private Timestamp apptDate;
		
		@Column("CHART_NOT_RECVDCNT")
		private Long chartNotRecvdCnt;
		
		@Column("TOTAL_CNT")
		private Long totalCnt;
		
		@Column("APPT_TYPE")
		private String apptType;

		public Long getApptId() {
			return apptId;
		}

		public void setApptId(Long apptId) {
			this.apptId = apptId;
		}

		public String getApptStatus() {
			return apptStatus;
		}

		public void setApptStatus(String apptStatus) {
			this.apptStatus = apptStatus;
		}

		public String getProvLocation() {
			return provLocation;
		}

		public void setProvLocation(String provLocation) {
			this.provLocation = provLocation;
		}

		public String getProvName() {
			return provName;
		}

		public void setProvName(String provName) {
			this.provName = provName;
		}

		public String getProvGroupName() {
			return provGroupName;
		}

		public void setProvGroupName(String provGroupName) {
			this.provGroupName = provGroupName;
		}

		public String getFaxStatus() {
			return faxStatus;
		}

		public void setFaxStatus(String faxStatus) {
			this.faxStatus = faxStatus;
		}

		public Date getCreateDateTime() {
			return createDateTime != null ? (Date)createDateTime.clone() : null;
		}

		public void setCreateDateTime(Date createDateTime) {
			this.createDateTime = (createDateTime != null) ? (Date)createDateTime.clone() : null;
		}

		public Timestamp getApptDate() {
			return apptDate != null ? (Timestamp)apptDate.clone() : null;
		}

		public void setApptDate(Timestamp apptDate) {
			this.apptDate = (apptDate != null) ? (Timestamp)apptDate.clone() : null;
		}

		public Long getChartNotRecvdCnt() {
			return chartNotRecvdCnt;
		}

		public void setChartNotRecvdCnt(Long chartNotRecvdCnt) {
			this.chartNotRecvdCnt = chartNotRecvdCnt;
		}

		public Long getTotalCnt() {
			return totalCnt;
		}

		public void setTotalCnt(Long totalCnt) {
			this.totalCnt = totalCnt;
		}

		public String getApptType() {
			return apptType;
		}

		public void setApptType(String apptType) {
			this.apptType = apptType;
		}
}
