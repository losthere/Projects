package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class EOCodeTest {
@InjectMocks
EOCode eocode;
	@Test
	public void testEOCode() {
		eocode.getLabel();
		eocode.getValue();
		eocode.setLabel("test");
		eocode.setValue("test");
		eocode.toString();
		
		
	}
	@Test
	public void testEOCode1() {
		EOCode eocode=new EOCode();
	
	}

}
