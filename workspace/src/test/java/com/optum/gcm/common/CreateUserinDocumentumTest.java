package com.optum.gcm.common;


import javax.xml.soap.SOAPConnection;
import javax.xml.soap.SOAPConnectionFactory;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
@PrepareForTest({SOAPConnectionFactory.class})
public class CreateUserinDocumentumTest {
		
	@InjectMocks
	CreateUserinDocumentum createUserinDocumentum;
	
	@Mock
	SOAPConnection soapConnection;
	
	@Mock
	SOAPConnectionFactory soapConnectionFactory;
	
	@SuppressWarnings("static-access")
	@Test
	public void testCreateUserinDocumentum() {
		createUserinDocumentum.callSoapWebService("test", "test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8","test9");
	}
	
	@Test
	public void testCreateUserinDocumentum2() throws Exception {
		PowerMockito.whenNew(SOAPConnectionFactory.class).withAnyArguments().thenReturn(soapConnectionFactory);
		PowerMockito.mockStatic(SOAPConnectionFactory.class);
		PowerMockito.when(SOAPConnectionFactory.newInstance()).thenReturn(soapConnectionFactory);
		PowerMockito.when(soapConnectionFactory.createConnection()).thenReturn(soapConnection);
		createUserinDocumentum.callSoapWebService("test", "test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9");
	}
	

}
