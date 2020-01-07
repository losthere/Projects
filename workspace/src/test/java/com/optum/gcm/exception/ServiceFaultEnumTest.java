package com.optum.gcm.exception;

import static org.junit.Assert.assertEquals;

import java.text.MessageFormat;

import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

public class ServiceFaultEnumTest {
	
		@Mock
		ServiceFaultEnum serviceFaultEnum;
		
		@Test
		public void setErrorMsg() {
			 assertEquals(serviceFaultEnum.ERROR_1001.getErrorMsg(),"The service request doesn't have credentials. Please provide credentials to invoke the services");
			 serviceFaultEnum.ERROR_1001.setErrorMsg("test");
		  }
		
		@Test
		public void formatMessage() {
			String[]  obj={};
			serviceFaultEnum.ERROR_1001.formatMessage(obj);
		}
	

}
