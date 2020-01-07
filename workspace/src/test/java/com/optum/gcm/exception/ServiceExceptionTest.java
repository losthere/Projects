package com.optum.gcm.exception;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Spy;


public class ServiceExceptionTest {
	
	@Mock@Spy
	ServiceException serviceException;
	
	@Mock
	ServiceFault faultInfo;
	
	@Mock
	ServiceFaultEnum serviceFaultEnum;
	
	@Before
    public void setUp() {
		serviceException = new ServiceException();
		faultInfo = new ServiceFault();
	}
	@Test
	 public void testAll() {
		String message = "msg"; 
		String[] s = {};
		ServiceException exception = new ServiceException(message,faultInfo,new Throwable());
		assertNotNull(exception);
		
		ServiceException exception1 = new ServiceException(message,faultInfo);
		assertNotNull(exception1);
		
		ServiceException exception2 = new ServiceException(message,new Throwable());
		assertNotNull(exception2);
		
		ServiceException exception3 = new ServiceException(message);
		assertNotNull(exception3);
		
		ServiceException exception4 = new ServiceException(new Throwable(),serviceFaultEnum.ERROR_0001,s);
		assertNotNull(exception4);
		
		ServiceException exception5 = new ServiceException(serviceFaultEnum.ERROR_0001,s);
		assertNotNull(exception5);
		
		ServiceException exception6 = new ServiceException(new Throwable(),serviceFaultEnum.ERROR_0001);
		assertNotNull(exception6);
		
		ServiceException exception7 = new ServiceException(serviceFaultEnum.ERROR_0001);
		assertNotNull(exception7);
	}
	
	@Test
	 public void getFaultInfo() {
		serviceException.setFaultInfo(faultInfo);
		assertEquals(faultInfo, serviceException.getFaultInfo());
    }
	
	
}
		 


