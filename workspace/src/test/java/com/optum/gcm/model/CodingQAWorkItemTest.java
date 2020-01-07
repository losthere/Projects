package com.optum.gcm.model;

import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

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
		codingqaworkitem.getCoderEoKeyListRes();
		codingqaworkitem.getQaEoKeyList();
		codingqaworkitem.getCoderEoKeyList();
		codingqaworkitem.getQaEoKeyListResponse();
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
		codingqaworkitem.setCoderDxEODesc("");
		codingqaworkitem.setCoderDxEOKey("");
		codingqaworkitem.setCoderEoKeyListRes("test");
		codingqaworkitem.setQaEoKeyList("test");
		codingqaworkitem.setCoderEncounterDxKey(5L);
		codingqaworkitem.setCoderEncounterKey(5L);
		codingqaworkitem.setCoderHccModelCatHhs("");
		codingqaworkitem.setCoderHccModelCatRx("");
		codingqaworkitem.setCoderHccModelCatV22("");
		codingqaworkitem.setCoderIcdDesc("");
		codingqaworkitem.setCoderICDDxCode("");
		codingqaworkitem.setCoderPageNum("");
		codingqaworkitem.setCoderProvFirstName("");
		codingqaworkitem.setCoderProvLastName("");
		codingqaworkitem.setCoderProvNPI("");
		codingqaworkitem.setCoderRetProvFlag("");
		codingqaworkitem.setIcdDesc("");
		codingqaworkitem.setQaDOSFromDate(qaDOSFromDate);
		codingqaworkitem.setQaDOSThruDate(qaDOSThruDate);
		codingqaworkitem.setQaDxActionCd("");
		codingqaworkitem.setQaDxEOKey("");
		codingqaworkitem.setQaDxEODesc("");
		codingqaworkitem.setQaEncActionCd("");
		codingqaworkitem.setQaEncComments("");
		codingqaworkitem.setQaDxEOKey("");
		codingqaworkitem.setQaEncounterDXKey(5L);
		codingqaworkitem.setQaEncounterKey(5L);
		codingqaworkitem.setQaHccModelCatHhs("");
		codingqaworkitem.setQaHccModelCatRx("");
		codingqaworkitem.setQaHccModelCatV22("");
		codingqaworkitem.setQaICDDxCode("");
		codingqaworkitem.setQaPageNum("");
		codingqaworkitem.setQaProvFirstName("");
		codingqaworkitem.setQaProvLastName("");
		codingqaworkitem.setQaProvNPI("");
		codingqaworkitem.setQaRetProvFlag("");
		codingqaworkitem.setRecordLevel("");

	}

}
