package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Assert;
import org.junit.Test;

public class ProjectCloseInfoTest {

	@Test
	public void test() {
		ProjectCloseInfo projectCloseInfo=new ProjectCloseInfo();
		
		projectCloseInfo.setBusSegment("TEST_PROJECT");
		projectCloseInfo.setProjName("TEST_PROJECT");
		projectCloseInfo.setProjKey(1l);
		projectCloseInfo.setProjectYear(1l);
		projectCloseInfo.setTotalCount(1l);
		
		Assert.assertEquals("TEST_PROJECT", projectCloseInfo.getBusSegment());
		Assert.assertEquals("TEST_PROJECT", projectCloseInfo.getProjName());
		Assert.assertEquals((Long) 1l, projectCloseInfo.getProjKey());
		Assert.assertEquals((Long) 1l, projectCloseInfo.getProjectYear());
		Assert.assertEquals((Long) 1l, projectCloseInfo.getTotalCount());
		
		
	}

}
