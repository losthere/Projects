package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class RetrievalSearchProviderFilterTest {
	@InjectMocks
	RetrievalSearchProviderFilter retrievalSearchProviderFilter;

	@Test
	public void testgetProvState() {
		retrievalSearchProviderFilter.getProvState();

	}

	@Test
	public void testsetProvState() {
		retrievalSearchProviderFilter.setProvState("Test");

	}
	@Test
	public void testgetProvLastName() {
		retrievalSearchProviderFilter.getProvLastName();

	}

	@Test
	public void testsetProvLastName() {
		retrievalSearchProviderFilter.setProvLastName("Test");

	}
}

