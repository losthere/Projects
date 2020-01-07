package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class GcmMailContentTest {
@InjectMocks
GcmMailContent gcmmailcontent;
	@Test
	public void testGcmMailContent() {
		gcmmailcontent.setContent("test");
		gcmmailcontent.setContentType("test");
		gcmmailcontent.setSubject("test");
		gcmmailcontent.getClass();
		gcmmailcontent.getContent();
		gcmmailcontent.getContentType();
		gcmmailcontent.getSubject();
		gcmmailcontent.toString();
		
	}

}
