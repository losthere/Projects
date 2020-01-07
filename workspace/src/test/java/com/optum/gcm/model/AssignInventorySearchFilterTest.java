package com.optum.gcm.model;

import org.junit.Assert;
import org.junit.Test;

public class AssignInventorySearchFilterTest {

	@Test
	public void test() {
		AssignInventorySearchFilter assignInventorySearchFilter = new AssignInventorySearchFilter();

		assignInventorySearchFilter.setIsAssigned("1");
		assignInventorySearchFilter.setFromUserKey(1l);
		assignInventorySearchFilter.setToUserKey(1l);
		assignInventorySearchFilter.setLoginUserKey(1l);
		assignInventorySearchFilter.setRequestedUserId("TEST_ID");
		assignInventorySearchFilter.setBusFuncDtlKey(1l);
		assignInventorySearchFilter.setApptKey(1L);

		Assert.assertEquals("1", assignInventorySearchFilter.getIsAssigned());
		Assert.assertEquals((Long) 1L, assignInventorySearchFilter.getFromUserKey());
		Assert.assertEquals((Long) 1L, assignInventorySearchFilter.getToUserKey());
		Assert.assertEquals((Long) 1L, assignInventorySearchFilter.getLoginUserKey());
		Assert.assertEquals("TEST_ID", assignInventorySearchFilter.getRequestedUserId());
		Assert.assertEquals((Long) 1L, assignInventorySearchFilter.getBusFuncDtlKey());
		Assert.assertEquals((Long) 1L, assignInventorySearchFilter.getApptKey());
		;
	}

}
