package com.optum.gcm.model;

import static org.junit.Assert.assertNotNull;

import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

import com.rsa.cryptoj.c.qa;

@RunWith(PowerMockRunner.class)
public class QAFeedbackInfoTest {

	@InjectMocks
	QAFeedbackInfo qaFeedbackInfo;

	@Test
	public void testQAFeedbackInfo() {
		Date coderDOSFromDate = new Date();
		qaFeedbackInfo.setCoderDOSFromDate(coderDOSFromDate);
		Date coderDOSThruDate = new Date();
		qaFeedbackInfo.setCoderDOSThruDate(coderDOSThruDate);
		qaFeedbackInfo.setCoderDxEoDesc("test");
		qaFeedbackInfo.setCoderDxEoKey("test");
		qaFeedbackInfo.setCoderEncounterDxKey(5L);
		qaFeedbackInfo.setCoderEncounterKey(5L);
		qaFeedbackInfo.setCoderHccModelCatHhs("test");
		qaFeedbackInfo.setCoderICDDxCode("test");
		qaFeedbackInfo.setCoderPageNum("");
		qaFeedbackInfo.setCoderProvFirstName("");
		qaFeedbackInfo.setCoderProvLastName("test");
		qaFeedbackInfo.setCoderProvNPI("");
		qaFeedbackInfo.setCoderRetProvFlag("");
		qaFeedbackInfo.setCoderRxHcc("");
		qaFeedbackInfo.setCoderRxV22("test");
		Date qaDOSFromDate = new Date();
		qaFeedbackInfo.setQaDOSFromDate(qaDOSFromDate);
		Date qaDOSThruDate = new Date();
		qaFeedbackInfo.setQaDOSThruDate(qaDOSThruDate);
		qaFeedbackInfo.setQaDxEoDesc("test");
		qaFeedbackInfo.setQaDxEoKey("test");
		qaFeedbackInfo.setQaEncActionCd("test");
		qaFeedbackInfo.setQaEncounterDXKey(5L);
		qaFeedbackInfo.setQaEncounterKey(5L);
		qaFeedbackInfo.setQaHccModelCatHhs("test");
		qaFeedbackInfo.setQaICDDxCode("test");
		qaFeedbackInfo.setQaPageNum("test");
		qaFeedbackInfo.setQaProvFirstName("test");
		qaFeedbackInfo.setQaProvLastName("test");
		qaFeedbackInfo.setQaProvNPI("test");
		qaFeedbackInfo.setQaRetProvFlag("test");
		qaFeedbackInfo.setQaRxHcc("test");
		qaFeedbackInfo.setQaRxV22("test");
		qaFeedbackInfo.setQaRxV23("Test");
		qaFeedbackInfo.setRecordLevel("test");
		qaFeedbackInfo.setQaEncDxActionCd("test");
		qaFeedbackInfo.setQaEncComment("test");
		qaFeedbackInfo.toString();	
		String[] eoKeyList=new String[10];
		qaFeedbackInfo.setEoKeyList(eoKeyList);
		String[] eoKeyListQA=new String[10];
		qaFeedbackInfo.setEoKeyListQA(eoKeyListQA);
		qaFeedbackInfo.setCoderEncEoKeyList("Test");
		qaFeedbackInfo.setCoderRxV23("Test");
		qaFeedbackInfo.setCoderRxV22("Test");
		qaFeedbackInfo.setQaEncEoKeyList("Test");
		assertNotNull(qaFeedbackInfo.getEoKeyList());
		assertNotNull(qaFeedbackInfo.getEoKeyListQA());
		assertNotNull(qaFeedbackInfo.getCoderEncEoKeyList());
		assertNotNull(qaFeedbackInfo.getCoderRxV23());
		assertNotNull(qaFeedbackInfo.getCoderRxV22());
		assertNotNull(qaFeedbackInfo.getQaRxV23());
		assertNotNull(qaFeedbackInfo.getQaEncEoKeyList());
		assertNotNull(qaFeedbackInfo.getClass());
		assertNotNull(qaFeedbackInfo.getCoderDOSFromDate());
		assertNotNull(qaFeedbackInfo.getCoderDOSThruDate());
		assertNotNull(qaFeedbackInfo.getCoderDxEoDesc());
		assertNotNull(qaFeedbackInfo.getCoderDxEoKey());
		assertNotNull(qaFeedbackInfo.getCoderEncounterDxKey());
		assertNotNull(qaFeedbackInfo.getCoderEncounterKey());
		assertNotNull(qaFeedbackInfo.getCoderHccModelCatHhs());
		assertNotNull(qaFeedbackInfo.getCoderICDDxCode());
		assertNotNull(qaFeedbackInfo.getCoderPageNum());
		assertNotNull(qaFeedbackInfo.getCoderProvFirstName());
		assertNotNull(qaFeedbackInfo.getCoderProvLastName());
		assertNotNull(qaFeedbackInfo.getCoderProvNPI());
		assertNotNull(qaFeedbackInfo.getCoderRetProvFlag());
		assertNotNull(qaFeedbackInfo.getCoderRxHcc());
		assertNotNull(qaFeedbackInfo.getCoderRxV22());
		assertNotNull(qaFeedbackInfo.getQaDOSFromDate());
		assertNotNull(qaFeedbackInfo.getQaDOSThruDate());
		assertNotNull(qaFeedbackInfo.getQaDxEoDesc());
		assertNotNull(qaFeedbackInfo.getQaDxEoKey());
		assertNotNull(qaFeedbackInfo.getQaEncActionCd());
		assertNotNull(qaFeedbackInfo.getQaEncComment());
		assertNotNull(qaFeedbackInfo.getQaEncDxActionCd());
		assertNotNull(qaFeedbackInfo.getQaEncounterDXKey());
		assertNotNull(qaFeedbackInfo.getQaEncounterKey());
		assertNotNull(qaFeedbackInfo.getQaHccModelCatHhs());
		assertNotNull(qaFeedbackInfo.getQaICDDxCode());
		assertNotNull(qaFeedbackInfo.getQaPageNum());
		assertNotNull(qaFeedbackInfo.getQaProvFirstName());
		assertNotNull(qaFeedbackInfo.getQaProvLastName());
		assertNotNull(qaFeedbackInfo.getQaProvNPI());
		assertNotNull(qaFeedbackInfo.getQaRetProvFlag());
		assertNotNull(qaFeedbackInfo.getQaRxHcc());
		assertNotNull(qaFeedbackInfo.getQaRxV22());
		assertNotNull(qaFeedbackInfo.getRecordLevel());

	}

}
