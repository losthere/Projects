package com.optum.gcm.model;

import org.junit.Assert;
import java.sql.Timestamp;
import org.junit.Test;

public class BaseModelTest {

	@Test
	public void test() {
		BaseModel baseModel = new BaseModel();

		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		baseModel.setCreateDate(timestamp);
		baseModel.setCreateUser("TEST_USER");
		baseModel.setModifiedDate(timestamp);
		baseModel.setModifiedUser("TEST_USER");

		Assert.assertEquals(timestamp, baseModel.getCreateDate());
		Assert.assertEquals("TEST_USER", baseModel.getCreateUser());
		Assert.assertEquals(timestamp, baseModel.getModifiedDate());
		Assert.assertEquals("TEST_USER", baseModel.getModifiedUser());

	}

}
