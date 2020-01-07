package com.optum.gcm.sevice;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.SchedulingSearchFilter;

@RunWith(PowerMockRunner.class)
public class CodingSearchServiceTest {

	@InjectMocks
	protected CodingSearchService codingSearchService;

	@Mock
	private CommonJpaService commonJpaService;

	@Mock
	protected SchedulingSearchFilter searchFilter;

	@Test
	public void testGetUnassignedInventoryforCoding() {
		codingSearchService.getUnassignedInventoryforCoding(searchFilter);
	}
	
	@Test
	public void testGetCodingUsersforSupervisor() {
		codingSearchService.getCodingUsersforSupervisor("1", 1L, 1L, "1", 1L, "1", 1L);
	}

}
