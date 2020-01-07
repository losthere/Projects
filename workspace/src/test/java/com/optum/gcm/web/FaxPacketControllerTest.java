package com.optum.gcm.web;



import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.model.ChartStatusUpdate;
import com.optum.gcm.model.GcmRetAppointment;
import com.optum.gcm.sevice.FaxPacketService;
@RunWith(PowerMockRunner.class)
public class FaxPacketControllerTest {

	@InjectMocks
	FaxPacketController faxPacketController;
	@Mock
	FaxPacketService faxPacketService ;

	@Test
	public void testgetFaxHistory() throws Exception {
		GcmRetAppointment gcmRetAppointment=Mockito.mock(GcmRetAppointment.class);
		faxPacketController.getFaxHistory(gcmRetAppointment);
		
	}
	@Test
	public void testgetFaxPacketByAppt() throws Throwable {
		faxPacketController.getFaxPacketByAppt("test");
	}
	@Test
	public void testgetFaxPacketByAppt1() throws Throwable {
		faxPacketController.getFaxPacketByAppt1("test");
	}
	@Test
	public void testgetFaxPacketByAppt1ExceptionTest() throws Throwable {
		PowerMockito.when(faxPacketService.getFaxPacketByAppt("test")).thenThrow(new Exception());
		faxPacketController.getFaxPacketByAppt1("test");
	}
	@Test
	public void testgetFaxPacketByAppt1Test() throws Throwable {
		String name = "test";
		PowerMockito.when(faxPacketService.getFaxPacketByAppt("test")).thenReturn(name.getBytes());
		faxPacketController.getFaxPacketByAppt1("test");
	}
	@Test
	public void testgetFaxPacketByAppt2() throws Throwable {
		faxPacketController.getFaxPacketByAppt2("test");
	}
	@Test
	public void testgetFaxPacketByDocID() throws Exception {
		faxPacketController.getFaxPacketByDocID("test");
		
	}
	@Test
	public void testgetFaxPacketByDocID_() throws Exception {
		faxPacketController.getFaxPacketByDocID1("test");
		
	}
	@Test
	public void testrefaxByChart() throws Exception {
		ChartStatusUpdate chartStatusUpdate=Mockito.mock(ChartStatusUpdate.class);;
		faxPacketController.refaxByChart(chartStatusUpdate);
		
	}
	
	@Test
	public void testrefaxByChart1() throws Exception {
		ChartStatusUpdate chartStatusUpdate=Mockito.mock(ChartStatusUpdate.class);
		PowerMockito.when(faxPacketService.updateChartStatus(chartStatusUpdate)).thenReturn("Error");
		faxPacketController.refaxByChart(chartStatusUpdate);
	}
}
