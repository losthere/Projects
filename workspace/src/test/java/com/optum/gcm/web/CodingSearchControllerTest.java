package com.optum.gcm.web;

import java.sql.SQLException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.sevice.CodingSearchService;

@RunWith(PowerMockRunner.class)
public class CodingSearchControllerTest {

	@InjectMocks
	private CodingSearchController codingSearchController;

	@Mock
	private CodingSearchService codingSearchService;

	@Test
	public void testGetUnassignedInventoryforCoding() throws Exception {
		SchedulingSearchFilter searchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(codingSearchService.getUnassignedInventoryforCoding(searchFilter)).thenReturn(null);
		codingSearchController.getUnassignedInventoryforCoding(searchFilter);
	}

	@Test
	public void testGetCodingUsersforSupervisor() throws SQLException {
		codingSearchController.getCodingUsersforSupervisor("1", 1L, 1L, "1", 1L, "1", 1L);
	}
	
	@Test
	public void testGetUnassignedInventoryforOptum() throws SQLException {
		SchedulingSearchFilter searchFilter = Mockito.mock(SchedulingSearchFilter.class);
		PowerMockito.when(codingSearchService.getUnassignedInventoryforOptum(searchFilter)).thenReturn(null);
		codingSearchController.getUnassignedInventoryforOptum(searchFilter);
	}

}
