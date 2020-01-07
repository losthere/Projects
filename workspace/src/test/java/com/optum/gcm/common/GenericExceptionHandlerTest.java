package com.optum.gcm.common;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.context.request.WebRequest;

import com.optum.gcm.model.RestResponse;

@RunWith(PowerMockRunner.class)
public class GenericExceptionHandlerTest {
	@InjectMocks
	private GenericExceptionHandler genericExceptionHandler;
	 
	@Test
	public void testhandleException() throws Exception {
		RestResponse<Object> errorResponse = new RestResponse<Object>();
		MethodArgumentNotValidException exception = Mockito.mock(MethodArgumentNotValidException.class);
		WebRequest webRequest = Mockito.mock(WebRequest.class);
		BindingResult bindingResult= Mockito.mock(BindingResult.class);
		PowerMockito.when(exception.getBindingResult()).thenReturn(bindingResult);
		genericExceptionHandler.handleException(exception, webRequest);
	}
}
