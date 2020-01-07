package com.optum.gcm.model;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class ProjectCloseUtilityTest {

	@InjectMocks
	ProjectCloseUtility projectCloseUtility;
	
	@Test
	public void test() {

		
		
		projectCloseUtility.setProjKey(1l);
		projectCloseUtility.setUserId(1l);
		projectCloseUtility.setIsImgExt(false);
		projectCloseUtility.setRegion("Test");
		Assert.assertEquals("Test", projectCloseUtility.getRegion());
		Assert.assertEquals((Long)1l, projectCloseUtility.getProjKey());
		Assert.assertEquals((Long)1l, projectCloseUtility.getUserId());
		Assert.assertEquals((false), projectCloseUtility.getIsImgExt());
	
	}

}
