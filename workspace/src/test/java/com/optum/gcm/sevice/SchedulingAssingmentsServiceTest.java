package com.optum.gcm.sevice;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.powermock.api.mockito.PowerMockito;

import com.optum.gcm.common.dao.CommonJpaDao;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.SchedulingSearchFilterWrapper;
import com.optum.gcm.model.AssignInventorySearchFilter;

@RunWith(PowerMockRunner.class)
public class SchedulingAssingmentsServiceTest {

	@InjectMocks
	protected SchedulingAssingmentsService schedulingAssingmentsService;

	@Mock
	private CommonJpaDao commonJpaDao;

	
	public  SchedulingSearchFilterWrapper wrapper = new SchedulingSearchFilterWrapper();
	
	public SchedulingSearchFilter schedulingSearchFilter = new SchedulingSearchFilter();
	
	public AssignInventorySearchFilter assignInventorySearchFilter = new AssignInventorySearchFilter();
	
	@Test
	public void testAssignSchedulingInvenotry() throws Exception {
		Map<String, Object> filterparams = new HashMap<>();
		Map<String, Object> params = new HashMap<>();
		wrapper.setSchedulingSearchFilter(schedulingSearchFilter);
		wrapper.getSchedulingSearchFilter();
		schedulingSearchFilter.setBusFuncDtlKey(4L);
		schedulingSearchFilter.getBusFuncDtlKey();
		List<AssignInventorySearchFilter> filterList=new ArrayList<>();
		filterList.add(assignInventorySearchFilter);
		wrapper.setAssignInventorySearchFilter(filterList);
		assignInventorySearchFilter.setIsAssigned("0");
		assignInventorySearchFilter.getIsAssigned();
		assignInventorySearchFilter.setIsAssigned("1");
		assignInventorySearchFilter.getIsAssigned();
		schedulingAssingmentsService.assignSchedulingInvenotry(wrapper);
	}

	
}
