package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class SegmentProjectsTest {

	@InjectMocks
	SegmentProjects segmentProjects;

	@Test
	public void testgetBusinessSegment() {
		segmentProjects.getBusinessSegment();
	}

	@Test
	public void testsetBusinessSegment() {
		segmentProjects.setBusinessSegment("test");
	}

	@Test
	public void testgetProjKey() {
		segmentProjects.getProjKey();
	}

	@Test 
	public void testsetProjKey() {
		segmentProjects.setProjKey("test");
	}

	@Test
	public void testgetProjName() {
		segmentProjects.getProjName();
	}

	@Test
	public void testsetProjName() {
		segmentProjects.setProjName("test");
	}

}
