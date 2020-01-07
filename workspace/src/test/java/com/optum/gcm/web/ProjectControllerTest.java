package com.optum.gcm.web;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.GcmProject;

@RunWith(PowerMockRunner.class)
public class ProjectControllerTest {

	@InjectMocks
	private ProjectController projectController;

	@Mock
	private CommonJpaService commonJpaService;

	@Test
	public void testUploadChart() throws Exception {
		GcmProject project = Mockito.mock(GcmProject.class);
		PowerMockito.when(commonJpaService.persist(project)).thenReturn(null);
		projectController.createProject(project);
	}	
}
