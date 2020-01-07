package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;
import org.powermock.modules.junit4.PowerMockRunner;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
@RunWith(PowerMockRunner.class)
public class SchedulingSearchFilterWrapperTest {

	@InjectMocks
	SchedulingSearchFilterWrapper schedulingSearchFilterWrapper;
	@Mock
	private SchedulingSearchFilter schedulingSearchFilter;
	@Mock
	private List<AssignInventorySearchFilter> assignInventorySearchFilter;
	@Test
	public void testSchedulingSearchFilterWrapper() {
		schedulingSearchFilterWrapper.setSchedulingSearchFilter(schedulingSearchFilter);
		schedulingSearchFilterWrapper.getSchedulingSearchFilter();
		schedulingSearchFilterWrapper.setAssignInventorySearchFilter(assignInventorySearchFilter);
		schedulingSearchFilterWrapper.getAssignInventorySearchFilter();
		schedulingSearchFilterWrapper.toString();
	}

}
