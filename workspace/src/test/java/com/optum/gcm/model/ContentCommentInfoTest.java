package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class ContentCommentInfoTest {
@InjectMocks
ContentCommentInfo contentcommentinfo;
	@Test
	public void testContentCommentInfo() {
		contentcommentinfo.getBarcode();
		contentcommentinfo.getBusFuncKey();
		contentcommentinfo.getContentComment();
		contentcommentinfo.getProjContentKey();
		contentcommentinfo.getProjectKey();
		contentcommentinfo.setBarcode("Test");
		contentcommentinfo.setBusFuncKey(5L);
		contentcommentinfo.setContentComment("Test");
		contentcommentinfo.setProjContentKey(5L);
		contentcommentinfo.setProjectKey(5L);
	}

}
