package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class QAFeedbackDxDetailsTest {
	@InjectMocks
	QAFeedbackDxDetails qaFeedbackDxDetails;

	@Test
	public void testQAFeedbackDxDetails() {
		qaFeedbackDxDetails.setCoderDxEoDesc("Test");
		qaFeedbackDxDetails.getCoderDxEoDesc();
		qaFeedbackDxDetails.setCoderDxEoKey("Test");
		qaFeedbackDxDetails.getCoderDxEoKey();
		qaFeedbackDxDetails.setCoderEncounterDxKey(4L);
		qaFeedbackDxDetails.getCoderEncounterDxKey();
		qaFeedbackDxDetails.setCoderEncounterKey(4L);
		qaFeedbackDxDetails.getCoderEncounterKey();
		qaFeedbackDxDetails.setCoderHccModelCatHhs("Test");
		qaFeedbackDxDetails.getCoderHccModelCatHhs();
		qaFeedbackDxDetails.setCoderICDDxCode("Test");
		qaFeedbackDxDetails.getCoderICDDxCode();
		qaFeedbackDxDetails.setCoderRxHcc("Test");
		qaFeedbackDxDetails.getCoderRxHcc();
		qaFeedbackDxDetails.setCoderRxV22("Test");
		qaFeedbackDxDetails.getCoderRxV22();
		qaFeedbackDxDetails.setQaDxActionCd("Test");
		qaFeedbackDxDetails.getQaDxActionCd();
		qaFeedbackDxDetails.setQaDxEoDesc("Test");
		qaFeedbackDxDetails.getQaDxEoDesc();
		qaFeedbackDxDetails.setQaDxEoKey("Test");
		qaFeedbackDxDetails.getQaDxEoKey();
		qaFeedbackDxDetails.setQaEncounterDXKey(4L);
		qaFeedbackDxDetails.getQaEncounterDXKey();
		qaFeedbackDxDetails.setQaEncounterKey(4L);
		qaFeedbackDxDetails.getQaEncounterKey();
		qaFeedbackDxDetails.setQaHccModelCatHhs("Test");
		qaFeedbackDxDetails.getQaHccModelCatHhs();
		qaFeedbackDxDetails.setQaICDDxCode("Test");
		qaFeedbackDxDetails.getQaICDDxCode();
		qaFeedbackDxDetails.setQaRxHcc("Test");
		qaFeedbackDxDetails.getQaRxHcc();
		qaFeedbackDxDetails.setQaRxV22("Test");
		qaFeedbackDxDetails.getQaRxV22();

	}

}
