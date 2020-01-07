package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class ProviderDetailsTest {

		@InjectMocks
		private ProviderDetails providerDetails;
		

		@Mock
		protected SchedulingInventory schedulingInventory;

		@Test
		public void testgetSchedulingInventory() {
		providerDetails.getSchedulingInventory();
		
		}
		
	
		@Test
		public void testgetAddress() {
		providerDetails.getAddress();
		}
		@Test
		public void testsetAddress() {
		providerDetails.setAddress("test");
		}
	
		@Test
		public void testgetPhone() {
		providerDetails.getPhone();
		}
		@Test
		public void testsetPhone() {
		providerDetails.setPhone("test");
		}
		
		@Test
		public void testgetFax() {
		providerDetails.getFax();
		}
		@Test
		public void testsetFax() {
		providerDetails.setFax("test");
		}

		@Test
		public void testgetUserId() {
		providerDetails.getUserId();
		}
		@Test
		public void testsetUserId() {
		providerDetails.setUserId("test");
		}
		@Test
		public void testtoString() {
			providerDetails.toString();
		}
	}
