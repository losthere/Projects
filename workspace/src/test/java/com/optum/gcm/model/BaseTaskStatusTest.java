package com.optum.gcm.model;

import java.util.Map;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import com.optum.gcm.constants.GCMConstants.TaskStatus;
import org.junit.Assert;
public class BaseTaskStatusTest {
	
	@InjectMocks
	private BaseTaskStatus thiz =new BaseTaskStatus() {
	};
	@Mock
	TaskStatus taskStatus;
	@Mock
	Map<ITaskErrorEnum, String> errorMessageMap;

	@Test
	public void testBaseTaskStatus() {
		thiz.setErrorMessageMap(errorMessageMap);
		thiz.setFileName("test");
		thiz.setTaskStatus(taskStatus);
		Assert.assertEquals("test", thiz.getFileName());
		Assert.assertEquals(errorMessageMap, thiz.getErrorMessageMap());
		Assert.assertEquals(taskStatus, thiz.getTaskStatus());
		
	}
	@Test
	public void testhaserrors() {
		thiz.hasErrors();
	}
}
