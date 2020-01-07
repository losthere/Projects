package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class CodingQaDxDetailsTest {
	@InjectMocks
	CodingQaDxDetails codingqadxdetails;
	private EOCode coderDxEoCode;
	private EOCode qaDxEoCode;
 
	@Test
	public void testcodingqadxdetails() {
		codingqadxdetails.getCoderDxEoCode();
		codingqadxdetails.setCoderDxEoCode(coderDxEoCode);
		codingqadxdetails.getCoderEncounterDxKey();
		codingqadxdetails.setCoderEncounterDxKey(2L);
		codingqadxdetails.getCoderEncounterKey();
		codingqadxdetails.setCoderEncounterKey(2L);
		codingqadxdetails.getCoderHccModelCatHhs();
		codingqadxdetails.setCoderHccModelCatHhs("test");
		codingqadxdetails.getCoderHccModelCatRx();
		codingqadxdetails.setCoderHccModelCatRx("test");
		codingqadxdetails.getCoderHccModelCatV22();
		codingqadxdetails.setCoderHccModelCatV22("test");
		codingqadxdetails.getCoderIcdDesc();
		codingqadxdetails.setCoderIcdDesc("test");
		codingqadxdetails.getCoderICDDxCode();
		codingqadxdetails.setCoderICDDxCode("test");
		codingqadxdetails.getCoderIcdDesc();
		codingqadxdetails.setIcdDesc("test");
		codingqadxdetails.getQaDxActionCd();
		codingqadxdetails.setQaDxActionCd("test");
		codingqadxdetails.getQaDxEoCode();
		codingqadxdetails.setQaDxEoCode(qaDxEoCode);
		codingqadxdetails.getQaEncounterDXKey();
		codingqadxdetails.setQaEncounterDXKey(2L);
		codingqadxdetails.getQaEncounterKey();
		codingqadxdetails.setQaEncounterKey(2L);
		codingqadxdetails.getQaHccModelCatHhs();
		codingqadxdetails.setQaHccModelCatHhs("test");
		codingqadxdetails.getQaHccModelCatRx();
		codingqadxdetails.setQaHccModelCatRx("test");
		codingqadxdetails.getQaHccModelCatV22();
		codingqadxdetails.setQaHccModelCatV22("test");
		codingqadxdetails.getQaICDDxCode();
		codingqadxdetails.setQaICDDxCode("test");
		codingqadxdetails.toString();
		codingqadxdetails.getIcdDesc();
		codingqadxdetails.setIcdDesc("test");

	}

}
