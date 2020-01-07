package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class SchedulingInventoryTest {
	@InjectMocks
	SchedulingInventory schedulingInventory;

	@Test
	public void testgetProvPhone() {
		schedulingInventory.getProvPhone();
	}

	@Test
	public void testsetProvPhone() {
		schedulingInventory.setProvPhone("test");
	}

	@Test
	public void testgetProvGroupName() {
		schedulingInventory.getProvGroupName();
	}

	@Test
	public void testsetProvGroupName() {
		schedulingInventory.setProvGroupName("test");
	}

	@Test
	public void testgetProvName() {
		schedulingInventory.getProvName();
	}

	@Test
	public void testsetProvName() {
		schedulingInventory.setProvName("test");
	}

	@Test
	public void testgetProvId() {
		schedulingInventory.getProvId();
	}

	@Test
	public void testsetProvId() {
		schedulingInventory.setProvId("test");
	}

	@Test
	public void testgetProvLocation() {
		schedulingInventory.getProvLocation();
	}

	@Test
	public void testsetProvLocation() {
		schedulingInventory.setProvLocation("test");
	}

	@Test
	public void testgetProvFax() {
		schedulingInventory.getProvFax();
	}

	@Test
	public void testsetProvFax() {
		schedulingInventory.setProvFax("test");
	}

	@Test
	public void testgetUserName() {
		schedulingInventory.getUserName();
	}

	@Test
	public void testsetUserName() {
		schedulingInventory.setUserName("test");
	}

	@Test
	public void testgetCount() {
		schedulingInventory.getCount();
	}

	@Test
	public void testsetCount() {
		schedulingInventory.setCount(123);
	}

	@Test
	public void testgetUserKey() {
		schedulingInventory.getUserKey();
	}

	@Test
	public void testsetUserKey() {
		schedulingInventory.setUserKey("test");
	}

	@Test
	public void testgetSpecialCategory() {
		schedulingInventory.getSpecialCategory();
	}

	@Test
	public void testsetSpecialCategory() {
		schedulingInventory.setSpecialCategory("test");
	}

	@Test
	public void testgetSpecialNotes() {
		schedulingInventory.getSpecialNotes();
	}

	@Test
	public void testsetSpecialNotes() {
		schedulingInventory.setSpecialNotes("test");
	} 

	@Test
	public void testtoString() {
		schedulingInventory.toString();
	}

}
