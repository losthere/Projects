package com.optum.gcm.web;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.GCMUser;
import com.optum.gcm.sevice.UserCreationService;

@RunWith(PowerMockRunner.class)
public class GcmSuperUserControllerTest {
	
	@InjectMocks
	private GcmSuperUserController gcmSuperUserController;
	
	@Mock
	private CommonJpaService commonJpaService;
	
	@Mock
	private UserCreationService userCreationService;
	
	@Mock
	private HttpServletRequest request;
	
	@Mock
	private HttpServletResponse response;
	
	@Test
	public void switchUserTest() {
		GCMUser gcmUser = new GCMUser();
		gcmUser.setUserID("AA67890");
		gcmUser.setUuID("123456TYU");
		gcmUser.setFirstName("Arch");
		gcmUser.setLastName("Ad");
		gcmUser.setEmail("aa.add@gmail.com");
		PowerMockito.when(userCreationService.getUser("AA67890")).thenReturn(gcmUser);
		PowerMockito.when(userCreationService.getEncryptedString(Mockito.anyString(),Mockito.anyString())).thenReturn("test");
		PowerMockito.when(request.getHeader("X-Forwarded-Host")).thenReturn("test");
		gcmSuperUserController.switchUser("AA67890", request, response);
	}
	
	@Test
	public void switchUserTest1() throws IOException {
		GCMUser gcmUser = new GCMUser();
		gcmUser.setUserID("AA67890");
		gcmUser.setUuID("123456TYU");
		gcmUser.setFirstName("Arch");
		gcmUser.setLastName("Ad");
		gcmUser.setEmail("aa.add@gmail.com");
		PowerMockito.when(userCreationService.getUser("AA67890")).thenReturn(gcmUser);
		PowerMockito.when(userCreationService.getEncryptedString(Mockito.anyString(),Mockito.anyString())).thenReturn("test");
		PowerMockito.when(request.getHeader("X-Forwarded-Host")).thenReturn("test");
		PowerMockito.doThrow(new IOException()).when(response).sendRedirect("/app/default.htm");
		gcmSuperUserController.switchUser("AA67890", request, response);
	}
	@Test
	public void switchUserTest2() throws IOException {
		GCMUser gcmUser = new GCMUser();
		gcmUser.setUserID("AA67890");
		gcmUser.setUuID("123456TYU");
		gcmUser.setFirstName("Arch");
		gcmUser.setLastName("Ad");
		gcmUser.setEmail("aa.add@gmail.com");
		PowerMockito.when(userCreationService.getUser("AA67890")).thenReturn(gcmUser);
		PowerMockito.when(userCreationService.getEncryptedString(Mockito.anyString(),Mockito.anyString())).thenReturn("test");
		PowerMockito.when(request.getHeader("X-Forwarded-Host")).thenReturn("test");
		PowerMockito.doThrow(new IOException()).when(response).sendRedirect("/app/default.htm");
		gcmSuperUserController.switchUser("AA67890", request, response);
	}@Test
	public void switchUserTest3() throws IOException {
		GCMUser gcmUser = new GCMUser();
		gcmUser.setUserID("AA67890");
		gcmUser.setUuID("123456TYU");
		gcmUser.setFirstName("Arch");
		gcmUser.setLastName("Ad");
		gcmUser.setEmail("aa.add@gmail.com");
		PowerMockito.when(userCreationService.getUser("AA67890")).thenReturn(null);
		PowerMockito.when(userCreationService.getEncryptedString(Mockito.anyString(),Mockito.anyString())).thenReturn("test");
		PowerMockito.when(request.getHeader("X-Forwarded-Host")).thenReturn("test");
		PowerMockito.doThrow(new IOException()).when(response).sendRedirect("/app/default.htm");
		gcmSuperUserController.switchUser("AA67890", request, response);
	}

}
