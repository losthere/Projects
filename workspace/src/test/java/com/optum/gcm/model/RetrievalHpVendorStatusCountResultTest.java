package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class RetrievalHpVendorStatusCountResultTest {

	@InjectMocks
	RetrievalHpVendorStatusCountResult retrievalHpVendorStatusCountResult;
	private List<KeyValue<String, Integer>> list;

	@Test
	public void testgetAssignableCount() {
		retrievalHpVendorStatusCountResult.getAssignableCount();
	}

	@Test
	public void testsetAssignableCount() {
		retrievalHpVendorStatusCountResult.setAssignableCount(125);
	}
	
	@Test
	public void testgetCompletedCount() {
		retrievalHpVendorStatusCountResult.getCompletedCount();
	}

	@Test
	public void testsetCompletedCount() {
		retrievalHpVendorStatusCountResult.setCompletedCount(125);
	}
	@Test
	public void testgetExtractedCount() {
		retrievalHpVendorStatusCountResult.getExtractedCount();
	}

	@Test
	public void testsetExtractedCount() {
		retrievalHpVendorStatusCountResult.setExtractedCount(125);
	}
	@Test
	public void testgetTotalCount() {
		retrievalHpVendorStatusCountResult.getTotalCount();
	}

	@Test
	public void testsetTotalCount() {
		retrievalHpVendorStatusCountResult.setTotalCount(125);
	}
	@Test
	public void testgetStatusCountObj() {
		retrievalHpVendorStatusCountResult.getStatusCountObj();
	}

	@Test
	public void testsetStatusCountObj() {
		retrievalHpVendorStatusCountResult.setStatusCountObj(list);
	}
}
