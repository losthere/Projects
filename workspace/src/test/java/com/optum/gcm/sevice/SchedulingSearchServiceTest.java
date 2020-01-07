package com.optum.gcm.sevice;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.SchedulingSearchFilter;

import com.optum.gcm.sevice.SchedulingSearchService;

@RunWith(PowerMockRunner.class)
public class SchedulingSearchServiceTest {

	@InjectMocks
	protected SchedulingSearchService schedulingSearchService;

	@Mock
	private CommonJpaService commonJpaService;

	@Mock
	protected SchedulingSearchFilter searchFilter;

	@Test
	public void testGetUnassignedInventoryforScheduling() throws Exception {
		SchedulingSearchFilter searchFilter =new SchedulingSearchFilter();
		searchFilter.setIsAssigned("1");
		searchFilter.getIsAssigned();
		schedulingSearchService.getUnassignedInventoryforScheduling(searchFilter);
	}
	@Test
	public void test_GetUnassignedInventoryforScheduling() throws Exception {
		
		searchFilter.setIsAssigned("1");
		searchFilter.getIsAssigned();
		schedulingSearchService.getUnassignedInventoryforScheduling(searchFilter);
	}
}
