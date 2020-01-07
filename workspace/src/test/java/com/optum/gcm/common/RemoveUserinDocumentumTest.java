package com.optum.gcm.common;

import javax.xml.soap.SOAPConnection;
import javax.xml.soap.SOAPConnectionFactory;
import javax.xml.soap.SOAPException;
import javax.xml.soap.SOAPMessage;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
@PrepareForTest({SOAPConnectionFactory.class})
public class RemoveUserinDocumentumTest {

	@InjectMocks
	RemoveUserinDocumentum removeUserinDocumentum;
	
	@Mock
	SOAPConnection soapConnection;
	
	@Mock
	SOAPConnectionFactory soapConnectionFactory;

	@Mock
	private SOAPMessage value;
	
	@Test
	public void testcallSoapWebService() throws Exception {
		PowerMockito.whenNew(SOAPConnectionFactory.class).withAnyArguments().thenReturn(soapConnectionFactory);
		PowerMockito.mockStatic(SOAPConnectionFactory.class);
		PowerMockito.when(SOAPConnectionFactory.newInstance()).thenReturn(soapConnectionFactory);
		PowerMockito.when(soapConnectionFactory.createConnection()).thenReturn(soapConnection);
		RemoveUserinDocumentum.callSoapWebService("Test", "Test", "Test", "Test", "Test", "Test", "Test", "Test");
	}
	
	@Test
	public void testcallSoapWebService_exception() throws Exception {
		RemoveUserinDocumentum.callSoapWebService("Test", "Test", "Test", "Test", "Test", "Test", "Test", "Test");
	}
	
	@Test
	public void testcallsoapwebservice() throws SOAPException {
		 SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
         SOAPConnection soapConnection = Mockito.mock(SOAPConnection.class);
		PowerMockito.when(soapConnection.call(Mockito.any(SOAPMessage.class), Mockito.anyString())).thenReturn(value);
	}

}
