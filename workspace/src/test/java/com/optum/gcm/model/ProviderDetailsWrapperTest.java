package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.sevice.UserAdministrationService;

@RunWith(PowerMockRunner.class)
public class ProviderDetailsWrapperTest {

	@Mock
	private static final List<ProviderDetails> List = null;

	@InjectMocks
	protected ProviderDetailsWrapper providerDetailsWrapper;

	@Mock
	private SchedulingSearchFilter schedulingSearchFilter;

	@Test
	public void testgetSchedulingSearchFilter() {
		providerDetailsWrapper.getSchedulingSearchFilter();
		
	}
	@Test
	public void testSetSchedulingSearchFilter() {
		providerDetailsWrapper.setSchedulingSearchFilter(schedulingSearchFilter);
		
	}
	

	@Test
	public void testgetProviderDetails() {
		providerDetailsWrapper.getProviderDetails();
		
	}

	@Test
	public void testsetProviderDetails() {
		providerDetailsWrapper.setProviderDetails(List);
	}
}
