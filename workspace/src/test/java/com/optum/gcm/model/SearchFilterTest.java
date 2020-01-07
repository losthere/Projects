package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

import com.rsa.cryptoj.c.se;
@RunWith(PowerMockRunner.class)
public class SearchFilterTest {
	@InjectMocks
	SearchFilter searchFilter;
	@Test
	public void testgettersetters() {
		searchFilter.setImageName("test");
		assertNotNull(searchFilter.getImageName());
		searchFilter.setBusSegment("test");
		assertNotNull(searchFilter.getBusSegment());
		searchFilter.setBusFuncDtlKey(5L);
		assertNotNull(searchFilter.getBusFuncDtlKey());
		searchFilter.setBusFuncKey(5L);
		assertNotNull(searchFilter.getBusFuncKey());
		searchFilter.setChartId("test");
		assertNotNull(searchFilter.getChartId());
		searchFilter.setClientInternalId("");
		assertNotNull(searchFilter.getClientInternalId());
		searchFilter.setGroupKey(5L);
		assertNotNull(searchFilter.getGroupKey());
		searchFilter.setLoginUserKey(5L); 
		assertNotNull(searchFilter.getLoginUserKey());
		searchFilter.setMemberDOB("test");
		assertNotNull(searchFilter.getMemberDOB());
		searchFilter.setMemberFirstName("test");
		assertNotNull(searchFilter.getMemberFirstName());
		searchFilter.setMemberGender("M");
		assertNotNull(searchFilter.getMemberGender());
		searchFilter.setMemberId("22d");
		assertNotNull(searchFilter.getMemberId());
		searchFilter.setMemberLastName("test");
		assertNotNull(searchFilter.getMemberLastName());
		searchFilter.setProjectKey(5L);
		assertNotNull(searchFilter.getProjectKey());
		searchFilter.setProjectName("MRM");
		assertNotNull(searchFilter.getProjectName());
		searchFilter.setProjYear(5L);
		assertNotNull(searchFilter.getProjYear());
		searchFilter.setProvFirstName("MRM");
		assertNotNull(searchFilter.getProvFirstName());
		searchFilter.setProvGroupName("MRM");
		assertNotNull(searchFilter.getProvGroupName()); 
		searchFilter.setProviderId("demo");
		assertNotNull(searchFilter.getProviderId());
		searchFilter.setProvLastName("MRM");
		assertNotNull(searchFilter.getProvLastName());
		searchFilter.setStatus("Active");
		assertNotNull(searchFilter.getStatus());
		searchFilter.setVendorKey(5L);
		assertNotNull(searchFilter.getVendorKey());
		searchFilter.setRegion("Test");
		assertNotNull(searchFilter.getRegion());
		
		
	}

}
