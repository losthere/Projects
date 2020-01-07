package com.optum.gcm.model;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class AppointmentInfoTest {

	@InjectMocks
	private AppointmentInfo appointmentInfo;
	
	@Mock
	protected AssignInventorySearchFilter assignInventorySearchFilter;

	@Test
	public void testGetAssignInventorySearchFilter() throws Exception {
		appointmentInfo.getAssignInventorySearchFilter();
	}

	@Test
	public void testSetAssignInventorySearchFilter() throws Exception {
		List<AssignInventorySearchFilter> listAssignInventorySearchFilter = new ArrayList<AssignInventorySearchFilter>();
		appointmentInfo.setAssignInventorySearchFilter(listAssignInventorySearchFilter);
	}
	
	@Test
	public void testGetAppt() throws Exception {
		appointmentInfo.getAppt();
	}

	@Test
	public void testSetAppt() throws Exception {
		GcmRetAppointment gcmRetAppointment = Mockito.mock(GcmRetAppointment.class);
		appointmentInfo.setAppt(gcmRetAppointment);		
	}
	
	@Test
	public void testGetLoginUserKey() throws Exception {
		appointmentInfo.getLoginUserKey();
	}

	@Test
	public void testSetLoginUserKey() throws Exception {
		appointmentInfo.setLoginUserKey("test");
	}
	
	@Test
	public void testGetFaxAllMembers() throws Exception {
		appointmentInfo.isFaxAllMembers();
	}
	
	@Test
	public void testSetFaxAllMembers() throws Exception {
		appointmentInfo.setFaxAllMembers(true);
	}
	
	@Test
	public void testGetNoOfPendAttempts() throws Exception {
		appointmentInfo.getNoOfPendAttempts();
	}

	@Test
	public void testSetNoOfPendAttempts() throws Exception {
		appointmentInfo.setNoOfPendAttempts(4L);
	}
	
}
