package com.optum.gcm.model;

import org.junit.Assert;
import java.sql.Timestamp;
import org.junit.Test;

public class GcmEncEoTest {

	@Test
	public void test() {
		GcmEncEo encEo = new GcmEncEo();

		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		encEo.setCreateDate(timestamp);
		encEo.setCreateUser("TEST_USER");
		encEo.setModifiedDate(timestamp);
		encEo.setModifiedUser("TEST_USER");
		encEo.setEncEoKey(123456L);
		encEo.getEncEoKey();
		encEo.setProjKey(967L);
		encEo.getProjKey();
		encEo.setEoKey("AN-CO7");
		encEo.getEoKey();
		encEo.setEncounterKey(123458L);
		encEo.getEncounterKey();
		Assert.assertEquals(timestamp, encEo.getCreateDate());
		Assert.assertEquals("TEST_USER", encEo.getCreateUser());
		Assert.assertEquals(timestamp, encEo.getModifiedDate());
		Assert.assertEquals("TEST_USER", encEo.getModifiedUser());
		
	}

}
