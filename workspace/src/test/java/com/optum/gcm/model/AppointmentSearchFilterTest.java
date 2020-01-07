package com.optum.gcm.model;

import org.junit.Assert;
import org.junit.Test;

public class AppointmentSearchFilterTest {

	@Test
	public void test() {
		AppointmentSearchFilter appointmentSearchFilter = new AppointmentSearchFilter();

		appointmentSearchFilter.setFirstName("TEST_FIRST_NAME");
		appointmentSearchFilter.setLastName("TEST_LAST_NAME");
		appointmentSearchFilter.setAddr1("ADD_1");
		appointmentSearchFilter.setAddr2("ADD_2");
		appointmentSearchFilter.setCity("CITY");
		appointmentSearchFilter.setState("STATE");
		appointmentSearchFilter.setZip("123");
		appointmentSearchFilter.setPhone("123");
		appointmentSearchFilter.setFax("FAX");
		appointmentSearchFilter.setEmail("EMAIL");
		appointmentSearchFilter.setProgramKey(1l);
		appointmentSearchFilter.setVendorKey(1l);
		appointmentSearchFilter.setApptKey(1l);
		appointmentSearchFilter.setGroupKey(1l);

		Assert.assertEquals("TEST_FIRST_NAME", appointmentSearchFilter.getFirstName());
		Assert.assertEquals("TEST_LAST_NAME", appointmentSearchFilter.getLastName());
		Assert.assertEquals("ADD_1", appointmentSearchFilter.getAddr1());
		Assert.assertEquals("ADD_2", appointmentSearchFilter.getAddr2());
		Assert.assertEquals("CITY", appointmentSearchFilter.getCity());
		Assert.assertEquals("STATE", appointmentSearchFilter.getState());
		Assert.assertEquals("123", appointmentSearchFilter.getZip());
		Assert.assertEquals("123", appointmentSearchFilter.getPhone());
		Assert.assertEquals("FAX", appointmentSearchFilter.getFax());
		Assert.assertEquals("EMAIL", appointmentSearchFilter.getEmail());
		Assert.assertEquals((Long) 1l, appointmentSearchFilter.getProgramKey());
		Assert.assertEquals((Long) 1l, appointmentSearchFilter.getVendorKey());
		Assert.assertEquals((Long) 1l, appointmentSearchFilter.getApptKey());
		Assert.assertEquals((Long) 1l, appointmentSearchFilter.getGroupKey());

	}

}
