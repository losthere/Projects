package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class RetrievalSearchInputTest {

	@InjectMocks
	RetrievalSearchInput retrievalSearchInput;

	@Test
	public void testgetGroupKey() {
		retrievalSearchInput.getGroupKey();

	}

	@Test
	public void testsetGroupKey() {
		retrievalSearchInput.setGroupKey(512);

	}
}
