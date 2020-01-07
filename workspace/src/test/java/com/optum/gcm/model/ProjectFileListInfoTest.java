package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Assert;
import org.junit.Test;

public class ProjectFileListInfoTest {

	@Test
	public void test() {
		
		ProjectFileListInfo projectFileListInfo=new ProjectFileListInfo();
		projectFileListInfo.setBusSegment("TEST_PROJECT");
		projectFileListInfo.setProjName("TEST_PROJECT");
		projectFileListInfo.setProjKey(1l);
		projectFileListInfo.setProjectYear(1l);
		projectFileListInfo.setChaseFileKEy(1l);
		projectFileListInfo.setFailureCount(1l);
		projectFileListInfo.setSuccessCount(1l);
		projectFileListInfo.setTotalCount(1l);
		projectFileListInfo.setFileName("TEST_PROJECT");
		projectFileListInfo.setCreateDate("TEST_PROJECT");
		projectFileListInfo.setDataCollStatus("TEST_PROJECT");
		projectFileListInfo.setProcessStatusKey(1);
		projectFileListInfo.setIsOptumRetrieval("TEST_PROJECT");
		projectFileListInfo.setIsOptumCoding("TEST_PROJECT");
		
		Assert.assertEquals("TEST_PROJECT", projectFileListInfo.getBusSegment());
		Assert.assertEquals("TEST_PROJECT", projectFileListInfo.getProjName());
		Assert.assertEquals((Long) 1l, projectFileListInfo.getProjKey());
		Assert.assertEquals((Long) 1l, projectFileListInfo.getProjectYear());
		Assert.assertEquals((Long) 1l, projectFileListInfo.getChaseFileKEy());
		Assert.assertEquals((Long) 1l, projectFileListInfo.getFailureCount());
		Assert.assertEquals((Long) 1l, projectFileListInfo.getSuccessCount());
		Assert.assertEquals((Long) 1l, projectFileListInfo.getTotalCount());
		Assert.assertEquals("TEST_PROJECT", projectFileListInfo.getFileName());
		Assert.assertEquals("TEST_PROJECT", projectFileListInfo.getCreateDate());
		Assert.assertEquals("TEST_PROJECT", projectFileListInfo.getDataCollStatus());
		Assert.assertEquals(1, projectFileListInfo.getProcessStatusKey());
		Assert.assertEquals("TEST_PROJECT", projectFileListInfo.getIsOptumRetrieval());
		Assert.assertEquals("TEST_PROJECT", projectFileListInfo.getIsOptumCoding());
		
		
	}

}
