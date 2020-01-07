package com.optum.gcm.exception;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;

import org.junit.Test;
import org.mockito.Mock;

public class ServiceFaultTest {
	   
	  ServiceFault serviceFault = new ServiceFault();
	   
	  String faultCode="001";
	  String faultString="fault_desc";
	   
	  @Test
	  public void getFaultCode() { 
		 serviceFault.setFaultCode(faultCode);
		 assertEquals(serviceFault.getFaultCode(),"001");
	  }
	  
	  @Test
	  public void testConstructor() { 
		 serviceFault = new ServiceFault(faultCode,faultString);
	  }
	  
	  @Test
	  public void getFaultString() {
			 serviceFault.setFaultString(faultString);
			 assertEquals(serviceFault.getFaultString(),"fault_desc");
	  }
}
