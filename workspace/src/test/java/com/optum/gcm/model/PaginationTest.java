package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class PaginationTest {

	@InjectMocks
	Pagination pagination;
	@Test
	public void testPagination() {
		pagination.setPageNo(25);
		pagination.setPageSize(25);
		pagination.setSortColumn("Test");
		pagination.setSortOrder("test");
		pagination.toString();
		pagination.getPageEnd();
		pagination.getPageStart();
		pagination.getPageNo();
		pagination.getPageSize();
		pagination.getSortColumn();
		pagination.getSortOrder();
	}

}
