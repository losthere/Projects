package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Assert;
import org.junit.Test;

public class MemberDetailsTest {

	@Test
	public void test() {
		MemberDetails memberDetails=new MemberDetails();
		memberDetails.setMemberName("TEST_PROJECT");
		memberDetails.setMemberDOB("TEST_PROJECT");
		memberDetails.setMemberGender("TEST_PROJECT");
		memberDetails.setMemberId("TEST_PROJECT");
		
		
		Assert.assertEquals("TEST_PROJECT", memberDetails.getMemberName());
		Assert.assertEquals("TEST_PROJECT", memberDetails.getMemberDOB());
		Assert.assertEquals("TEST_PROJECT", memberDetails.getMemberGender());
		Assert.assertEquals("TEST_PROJECT", memberDetails.getMemberId());
	}

}
