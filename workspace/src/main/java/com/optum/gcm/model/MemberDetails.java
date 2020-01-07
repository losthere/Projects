package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class MemberDetails {
		
		@Column("MEMBER_NAME")
		private String memberName;
		
		@Column("MEMBER_DOB")
		private String memberDOB;
		
		@Column("MEMBER_GENDER")
		private String memberGender;
		
		@Column("MEMBER_ID")
		private String memberId;

		public String getMemberName() {
			return memberName;
		}

		public void setMemberName(String memberName) {
			this.memberName = memberName;
		}

		public String getMemberDOB() {
			return memberDOB;
		}

		public void setMemberDOB(String memberDOB) {
			this.memberDOB = memberDOB;
		}

		public String getMemberGender() {
			return memberGender;
		}

		public void setMemberGender(String memberGender) {
			this.memberGender = memberGender;
		}

		public String getMemberId() {
			return memberId;
		}

		public void setMemberId(String memberId) {
			this.memberId = memberId;
		}

	

}
