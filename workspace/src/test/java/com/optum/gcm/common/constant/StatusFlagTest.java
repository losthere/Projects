package com.optum.gcm.common.constant;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

import org.junit.Test;

import com.optum.gcm.common.constants.StatusFlag;

public class StatusFlagTest {

	@Test
	public void testStatusFlag()
			throws InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		Constructor[] constructors = StatusFlag.class.getDeclaredConstructors();
		assertEquals(1, constructors.length);
		Constructor constructor = constructors[0];
		assertFalse(constructor.isAccessible());
	}

	@Test
	public void testGetValue() {
		assertEquals(StatusFlag.YES.getValue(), "Y");
		assertEquals(StatusFlag.NO.getValue(), "N");
	}

}