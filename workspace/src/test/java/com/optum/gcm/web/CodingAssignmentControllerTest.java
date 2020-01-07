package com.optum.gcm.web;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.model.CodingInventoryWrapper;
import com.optum.gcm.sevice.CodingAssignmentService;

@RunWith(PowerMockRunner.class)
public class CodingAssignmentControllerTest {

	@InjectMocks
	private CodingAssignmentController codingAssignmentController;

	@Mock
	private CodingAssignmentService codingAssignmentService;
	
	@Mock
	private CodingInventoryWrapper vendorSearchInp;

	@Test
	public void testAssignInventoryforCoding() throws Exception {
		CodingInventoryWrapper codingInventoryWrapper = Mockito.mock(CodingInventoryWrapper.class);
		PowerMockito.when(codingAssignmentService.assignInventoryforCoding(codingInventoryWrapper)).thenReturn("success");
		codingAssignmentController.assignInventoryforCoding(codingInventoryWrapper);
	}
	@Test
	public void testAssignInventoryforCoding_() throws Exception {
		CodingInventoryWrapper codingInventoryWrapper = Mockito.mock(CodingInventoryWrapper.class);
		PowerMockito.when(codingAssignmentService.assignInventoryforCoding(codingInventoryWrapper)).thenReturn(null);
		codingAssignmentController.assignInventoryforCoding(codingInventoryWrapper);
	}
	@Test
	public void testvendorAssignmentforOptumCoding() throws Exception {
		CodingInventoryWrapper codingInventoryWrapper = Mockito.mock(CodingInventoryWrapper.class);
		PowerMockito.when(codingAssignmentService.inventoryAssignmentforOptum(codingInventoryWrapper)).thenReturn("success");
		codingAssignmentController.vendorAssignmentforOptumCoding(codingInventoryWrapper);
	}
	@Test
	public void testvendorAssignmentforOptumCoding_() throws Exception {
		CodingInventoryWrapper codingInventoryWrapper = Mockito.mock(CodingInventoryWrapper.class);
		PowerMockito.when(codingAssignmentService.inventoryAssignmentforOptum(codingInventoryWrapper)).thenReturn(null);
		codingAssignmentController.vendorAssignmentforOptumCoding(codingInventoryWrapper);
	}
	@Test
	public void testvendorAssignmentforOptumCoding1() throws Exception {
		CodingInventoryWrapper codingInventoryWrapper = Mockito.mock(CodingInventoryWrapper.class);
		PowerMockito.when(codingAssignmentService.inventoryAssignmentforOptum(codingInventoryWrapper)).thenReturn("USER_VENDOR_NOT_REAL");
		codingAssignmentController.vendorAssignmentforOptumCoding(codingInventoryWrapper);
	}
	@Test
	public void testvendorAssignmentforOptumCoding2() throws Exception {
		CodingInventoryWrapper codingInventoryWrapper = Mockito.mock(CodingInventoryWrapper.class);
		PowerMockito.when(codingAssignmentService.inventoryAssignmentforOptum(codingInventoryWrapper)).thenReturn("ASSIGN_VENDOR_NOT_REAL");
		codingAssignmentController.vendorAssignmentforOptumCoding(codingInventoryWrapper);
	}
	@Test
	public void testgetAssignableVendorsForOptumInventory() throws Exception {
		CodingInventoryWrapper codingInventoryWrapper = Mockito.mock(CodingInventoryWrapper.class);
		PowerMockito.when(codingAssignmentService.getAssignableVendorsForOptumInventory(codingInventoryWrapper)).thenReturn(null);
		codingAssignmentController.getAssignableVendorsForOptumInventory(vendorSearchInp);
	}
}
