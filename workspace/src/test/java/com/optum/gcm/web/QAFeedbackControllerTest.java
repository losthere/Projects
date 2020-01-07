package com.optum.gcm.web;





import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.exception.ServiceException;
import com.optum.gcm.model.QAFeedbackInputFiler;
import com.optum.gcm.sevice.QAFeedbackService;

@RunWith(PowerMockRunner.class)
public class QAFeedbackControllerTest {

	@InjectMocks
	private QAFeedbackController  qaFeedbackController;

	@Mock
	private QAFeedbackService qaFeedbackService;

	@Test
	public void testGetCodingQAFeedbackResults() throws Exception {
		QAFeedbackInputFiler qaInputFiler = Mockito.mock(QAFeedbackInputFiler.class);
		PowerMockito.when(qaFeedbackController.getCodingQAFeedbackResults(qaInputFiler)).thenReturn(null);
		qaFeedbackController.getCodingQAFeedbackResults(qaInputFiler);
	 }
	@Test
	public void testGetCodingQAFeedbackResults_() throws Exception {
		QAFeedbackInputFiler qaInputFiler = Mockito.mock(QAFeedbackInputFiler.class);
		PowerMockito.when(qaFeedbackController.getCodingQAFeedbackResults(qaInputFiler)).thenThrow(new ServiceException());
		qaFeedbackController.getCodingQAFeedbackResults(qaInputFiler);
	 }
}
