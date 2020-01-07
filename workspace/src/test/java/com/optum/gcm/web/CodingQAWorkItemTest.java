package com.optum.gcm.web;

import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.model.CodingQAWorkItem;

@RunWith(PowerMockRunner.class)
public class CodingQAWorkItemTest {
	@InjectMocks
	CodingQAWorkItem codingqaworkitem;
	private Date coderDOSFromDate;
	private Date coderDOSThruDate;
	private Date qaDOSFromDate;
	private Date qaDOSThruDate;

	@Test
	public void testcodingqaworkitem() {
		codingqaworkitem.getCoderDxEODesc();
		codingqaworkitem.getCoderDOSFromDate();
		codingqaworkitem.getCoderDOSThruDate();
		codingqaworkitem.getCoderDxEOKey();
		codingqaworkitem.getCoderEncounterDxKey();
		codingqaworkitem.getCoderEncounterKey();
		codingqaworkitem.getCoderHccModelCatHhs();
		codingqaworkitem.getCoderHccModelCatRx();
		codingqaworkitem.getCoderHccModelCatRx();
		codingqaworkitem.getCoderHccModelCatV22();
		codingqaworkitem.getCoderIcdDesc();
		codingqaworkitem.getCoderICDDxCode();
		codingqaworkitem.getCoderPageNum();
		codingqaworkitem.getCoderProvFirstName();
		codingqaworkitem.getCoderProvLastName();
		codingqaworkitem.getCoderProvNPI();
		codingqaworkitem.getCoderRetProvFlag();
		codingqaworkitem.getIcdDesc();
		codingqaworkitem.getQaDOSFromDate();
		codingqaworkitem.getQaDOSThruDate();
		codingqaworkitem.getQaDxActionCd();
		codingqaworkitem.getQaDxEODesc();
		codingqaworkitem.getQaDxEOKey();
		codingqaworkitem.getQaEncounterDXKey();
		codingqaworkitem.getQaEncounterKey();
		codingqaworkitem.getQaHccModelCatHhs();
		codingqaworkitem.getQaHccModelCatRx();
		codingqaworkitem.getQaHccModelCatV22();
		codingqaworkitem.getQaICDDxCode();
		codingqaworkitem.getQaPageNum();
		codingqaworkitem.getQaProvFirstName();
		codingqaworkitem.getQaProvLastName();
		codingqaworkitem.getQaProvNPI();
		codingqaworkitem.getQaRetProvFlag();
		codingqaworkitem.getRecordLevel();
		codingqaworkitem.getQaEncComments();
		codingqaworkitem.getQaEncActionCd();
		codingqaworkitem.setCoderDOSFromDate(coderDOSFromDate);
		codingqaworkitem.setCoderDOSThruDate(coderDOSThruDate);
		codingqaworkitem.setCoderDxEODesc("test");
		codingqaworkitem.setCoderDxEOKey("test");
		codingqaworkitem.setCoderEncounterDxKey(5L);
		codingqaworkitem.setCoderEncounterKey(5L);
		codingqaworkitem.setCoderHccModelCatHhs("test");
		codingqaworkitem.setCoderHccModelCatRx("test");
		codingqaworkitem.setCoderHccModelCatV22("test");
		codingqaworkitem.setCoderIcdDesc("test");
		codingqaworkitem.setCoderICDDxCode("test");
		codingqaworkitem.setCoderPageNum("test");
		codingqaworkitem.setCoderProvFirstName("test");
		codingqaworkitem.setCoderProvLastName("test");
		codingqaworkitem.setCoderProvNPI("test");
		codingqaworkitem.setCoderRetProvFlag("test");
		codingqaworkitem.setIcdDesc("test");
		codingqaworkitem.setQaDOSFromDate(qaDOSFromDate);
		codingqaworkitem.setQaDOSThruDate(qaDOSThruDate);
		codingqaworkitem.setQaDxActionCd("test");
		codingqaworkitem.setQaDxEOKey("test");
		codingqaworkitem.setQaDxEODesc("test");
		codingqaworkitem.setQaEncActionCd("test");
		codingqaworkitem.setQaEncComments("test");
		codingqaworkitem.setQaDxEOKey("test");
		codingqaworkitem.setQaEncounterDXKey(5L);
		codingqaworkitem.setQaEncounterKey(5L);
		codingqaworkitem.setQaHccModelCatHhs("test");
		codingqaworkitem.setQaHccModelCatRx("test");
		codingqaworkitem.setQaHccModelCatV22("test");
		codingqaworkitem.setQaICDDxCode("test");
		codingqaworkitem.setQaPageNum("test");
		codingqaworkitem.setQaProvFirstName("test");
		codingqaworkitem.setQaProvLastName("test");
		codingqaworkitem.setQaProvNPI("test");
		codingqaworkitem.setQaRetProvFlag("test");
		codingqaworkitem.setRecordLevel("test");

	}

}
