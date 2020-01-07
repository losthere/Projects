package com.optum.gcm.model;

import java.sql.Timestamp;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;
@Table("GCM_VENDOR_ASSIGNMENT")
public class GcmVendorAssignment {

		@Column(value="GCM_VENDOR_ASSIGN_KEY", sequence = "GCM_VENDOR_ASSIGNMENT_SEQ")    
		private Long vendorAssignKey;
		
		@Column(value="ASSIGNABLE_QUANTITY")    
		private Long assignableQty;
		
		@Column(value="GCM_VENDOR_KEY")
		private Long vendorKey;
		
		@Column(value="CREATE_USERID")  
		private String createUserId;
		
		@Column(value="CREATE_DATE_TIME")    
		private Timestamp createDateTime;
		
		@Column(value="MODIFY_USERID")  
		private String modifyUserId;
		
		@Column(value="MODIFY_DATE_TIME") 
		private Timestamp modifyDateTime;

		public Long getVendorAssignKey() {
			return vendorAssignKey;
		}

		public void setVendorAssignKey(Long vendorAssignKey) {
			this.vendorAssignKey = vendorAssignKey;
		}

		public Long getAssignableQty() {
			return assignableQty;
		}

		public void setAssignableQty(Long assignableQty) {
			this.assignableQty = assignableQty;
		}

		public Long getVendorKey() {
			return vendorKey;
		}

		public void setVendorKey(Long vendorKey) {
			this.vendorKey = vendorKey;
		}

		public String getCreateUserId() {
			return createUserId;
		}

		public void setCreateUserId(String createUserId) {
			this.createUserId = createUserId;
		}

		public Timestamp getCreateDateTime() {
			return createDateTime;
		}

		public void setCreateDateTime(Timestamp createDateTime) {
			this.createDateTime = createDateTime;
		}

		public String getModifyUserId() {
			return modifyUserId;
		}

		public void setModifyUserId(String modifyUserId) {
			this.modifyUserId = modifyUserId;
		}

		public Timestamp getModifyDateTime() {
			return modifyDateTime;
		}

		public void setModifyDateTime(Timestamp modifyDateTime) {
			this.modifyDateTime = modifyDateTime;
		}
	
}
