package com.optum.gcm.common;


import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.context.ApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.optum.gcm.common.sevice.UserAuthorizationService;
import com.optum.gcm.model.RestResponse;

@RunWith(PowerMockRunner.class)
public class SecurityInterceptorTest {
	@InjectMocks
	private SecurityInterceptor securityInterceptor;
	
	@Test
	public void testPreHandle1() throws Exception {
		// Validate with Empty Input
		Assert.assertNotNull(securityInterceptor);
		ApplicationContext applicationContext = Mockito.mock(ApplicationContext.class);

		securityInterceptor.setApplicationContext(applicationContext);
		
		//Validate with Valid Mocked Request
		HttpServletRequest httpServletRequest = Mockito.mock(HttpServletRequest.class);
		PowerMockito.when(httpServletRequest.getRequestURI()).thenReturn("Test//");
		PowerMockito.when(httpServletRequest.getHeader("APP_AUTH_TOKEN")).thenReturn("Test-String_appAuthToken");
		PowerMockito.when(httpServletRequest.getHeader("USERNAME")).thenReturn("Test");
		HttpServletResponse httpServletResponse = Mockito.mock(HttpServletResponse.class);
		PowerMockito.when(httpServletResponse.getWriter()).thenReturn(Mockito.mock(PrintWriter.class));
		Object object = Mockito.mock(Object.class);
		
		UserAuthorizationService userAuthorizationService = Mockito.mock(UserAuthorizationService.class);
		PowerMockito.when(applicationContext.getBean(UserAuthorizationService.class)).thenReturn(userAuthorizationService);
		PowerMockito.when(userAuthorizationService.isAuthorizedUser("Test", "/")).thenReturn(true);
		
		//assertTrue(securityInterceptor.preHandle(httpServletRequest, httpServletResponse, object));
		securityInterceptor.preHandle(httpServletRequest, httpServletResponse, object);
	}
	
	@Test
	public void testPreHandle2() throws Exception {
		// Validate with Empty Input
		ApplicationContext applicationContext = Mockito.mock(ApplicationContext.class);

		securityInterceptor.setApplicationContext(applicationContext);
		
		//Validate with Valid Mocked Request
		HttpServletRequest httpServletRequest = Mockito.mock(HttpServletRequest.class);
		PowerMockito.when(httpServletRequest.getRequestURI()).thenReturn("Test//");
		PowerMockito.when(httpServletRequest.getHeader("APP_AUTH_TOKEN")).thenReturn("Test-String_appAuthToken");
		PowerMockito.when(httpServletRequest.getHeader("USERNAME")).thenReturn("Test");
		HttpServletResponse httpServletResponse = Mockito.mock(HttpServletResponse.class);
		Object object = Mockito.mock(Object.class);
		
		UserAuthorizationService userAuthorizationService = Mockito.mock(UserAuthorizationService.class);
		PowerMockito.when(applicationContext.getBean(UserAuthorizationService.class)).thenReturn(userAuthorizationService);
		PowerMockito.when(userAuthorizationService.isAuthorizedUser("Test", "Test")).thenReturn(true);
		
		ObjectMapper objectMapper = Mockito.mock(ObjectMapper.class);
		RestResponse<String> restResponse = new RestResponse<>();
		restResponse.setErrorMessage("Internal Server Error Occured");
		PowerMockito.when(objectMapper.writeValueAsString(restResponse)).thenReturn("Hello");
		SecurityInterceptor restResource = Mockito.mock(SecurityInterceptor.class);
		
		Assert.assertNotNull(restResource);
		//restResource.contains("//");
		PrintWriter  printWriter= Mockito.mock(PrintWriter.class);
		PowerMockito.when(httpServletResponse.getWriter()).thenReturn(printWriter);
		printWriter.write("Hello");
		Assert.assertNotNull(securityInterceptor);
		//PowerMockito.when(httpServletResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value())).thenReturn("Hello Hi");
		
		//assertTrue(securityInterceptor.preHandle(httpServletRequest, httpServletResponse, object));
		securityInterceptor.preHandle(httpServletRequest, httpServletResponse, object);
	}
	
	@Test
	public void testPostHandle() throws Exception {
		// Validate with Empty Input
		Assert.assertNotNull(securityInterceptor);
		securityInterceptor.postHandle(null, null, null, null);
	}
	
	@Test
	public void testAfterCompletion() throws Exception {
		// Validate with Empty Input
		
		securityInterceptor.afterCompletion(null, null, null, null);
	}
	
}
