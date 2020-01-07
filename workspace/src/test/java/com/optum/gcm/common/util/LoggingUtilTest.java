package com.optum.gcm.common.util;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RunWith(PowerMockRunner.class)
public class LoggingUtilTest {
	
	
	
	@Test
	public void logInfoTest() {
		Logger log = LoggerFactory.getLogger(LoggingUtilTest.class);
		LoggingUtil.logInfo(log, true, "test msg", "test" , "test");;
	}
	
	@Test
	public void logInfoTest2() {
		Logger log = LoggerFactory.getLogger(LoggingUtilTest.class);
		LoggingUtil.logInfo(log, "test msg", "test" , "test");;
	}
	
	@Test
	public void logInfoTest3() {
		Logger log = LoggerFactory.getLogger(LoggingUtilTest.class);
		LoggingUtil.logInfo(log, "test msg");;
	}
	
	@Test
	public void logDebugTest() {
		Logger log = PowerMockito.mock(Logger.class);
		PowerMockito.when(log.isDebugEnabled()).thenReturn(true);
		LoggingUtil.logDebug(log, true, "test msg", "test", "test");
	}
	
	@Test
	public void logDebugTest2() {
		Logger log = LoggerFactory.getLogger(LoggingUtilTest.class);
		LoggingUtil.logDebug(log, "test msg", "test", "test");
	}
	
	@Test
	public void logDebugTest3() {
		Logger log = LoggerFactory.getLogger(LoggingUtilTest.class);
		LoggingUtil.logDebug(log, "test msg");
	}


}
