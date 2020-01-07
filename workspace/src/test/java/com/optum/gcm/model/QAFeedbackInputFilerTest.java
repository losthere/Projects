package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class QAFeedbackInputFilerTest {

	@InjectMocks
	QAFeedbackInputFiler qaFeedbackInputFiler;
	@Test
	public void testQAFeedbackInputFiler() {
		
		qaFeedbackInputFiler.setBusFuncKey(4L);
		qaFeedbackInputFiler.getBusFuncKey();
		qaFeedbackInputFiler.setBusFuncVenKey(4L);
		qaFeedbackInputFiler.getBusFuncVenKey();
		qaFeedbackInputFiler.setGroupKey(4L);
		qaFeedbackInputFiler.getGroupKey();
		qaFeedbackInputFiler.setLoginUserKey(5L);
		qaFeedbackInputFiler.getLoginUserKey();
		qaFeedbackInputFiler.setProjContentKey(5L);
		qaFeedbackInputFiler.getProjContentKey();
		qaFeedbackInputFiler.setProjKey(4L);
		qaFeedbackInputFiler.getProjKey();
		qaFeedbackInputFiler.setRequestedUserId("Test");
		qaFeedbackInputFiler.getRequestedUserId();
		qaFeedbackInputFiler.toString();
	}

}
