package com.optum.gcm.web;



import java.sql.SQLException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.powermock.modules.junit4.PowerMockRunner;


import com.optum.gcm.model.SupervisorDashboardFilter;
@RunWith(PowerMockRunner.class)
public class SupervisorDashboardControllerTest {

	@InjectMocks
	SupervisorDashboardController supervisorDashboardController;
	@Test
	public void testgetSchedulingCounts() throws SQLException {
		SupervisorDashboardFilter supervisorDashboardFilter=Mockito.mock(SupervisorDashboardFilter.class);
		supervisorDashboardController.getSchedulingCounts(supervisorDashboardFilter);
	}
	@Test
	public void testgetRetrievalCounts() throws SQLException {
		SupervisorDashboardFilter supervisorDashboardFilter=Mockito.mock(SupervisorDashboardFilter.class);
		supervisorDashboardController.getRetrievalCounts(supervisorDashboardFilter);
	}
	@Test
	public void testgetPendMgmtCounts() throws SQLException {
		SupervisorDashboardFilter supervisorDashboardFilter=Mockito.mock(SupervisorDashboardFilter.class);
		supervisorDashboardController.getPendMgmtCounts(supervisorDashboardFilter);
	}
	@Test
	public void testgetCodingCounts() throws SQLException {
		SupervisorDashboardFilter supervisorDashboardFilter=Mockito.mock(SupervisorDashboardFilter.class);
		supervisorDashboardController.getCodingCounts(supervisorDashboardFilter);
	}
	@Test
	public void testgetCodingQACounts() throws SQLException {
		SupervisorDashboardFilter supervisorDashboardFilter=Mockito.mock(SupervisorDashboardFilter.class);
		supervisorDashboardController. getCodingQACounts(supervisorDashboardFilter);
	}
}
