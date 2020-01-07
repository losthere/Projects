package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

import com.rsa.cryptoj.c.qa;

@RunWith(PowerMockRunner.class)
public class QAFeedbackEncDxDetailsTest {

	private static final List<QAFeedbackDxDetails> List = null;
	@InjectMocks
	QAFeedbackEncDxDetails qaFeedbackEncDxDetails;

	@Test
	public void testgetCoderEncounterKey() {
		qaFeedbackEncDxDetails.getCoderEncounterKey();

	}

	@Test
	public void testsetCoderEncounterKey() { 
		qaFeedbackEncDxDetails.setCoderEncounterKey(5L);

	}

	@Test
	public void testgetCoderDOSFromDate() {
		qaFeedbackEncDxDetails.getCoderDOSFromDate();

	}

	@Test
	public void testsetCoderDOSFromDate() {
		qaFeedbackEncDxDetails.setCoderDOSFromDate("12d");

	}

	@Test
	public void testgetCoderDOSThruDate() {
		qaFeedbackEncDxDetails.getCoderDOSThruDate();
	}

	@Test
	public void testsetCoderDOSThruDate() {
		qaFeedbackEncDxDetails.setCoderDOSThruDate("15d");
	}

	@Test
	public void testgetCoderPageNum() {
		qaFeedbackEncDxDetails.getCoderPageNum();
	}

	@Test
	public void testsetCoderPageNum() {
		qaFeedbackEncDxDetails.setCoderPageNum("12d");
	}

	@Test
	public void testgetCoderRetProvFlag() {
		qaFeedbackEncDxDetails.getCoderRetProvFlag();
	}

	@Test
	public void testsetCoderRetProvFlag() {
		qaFeedbackEncDxDetails.setCoderRetProvFlag("15d");
	}

	@Test
	public void testgetCoderProvNPI() {
		qaFeedbackEncDxDetails.getCoderProvNPI();
	}

	@Test
	public void testsetCoderProvNPI() {
		qaFeedbackEncDxDetails.setCoderProvNPI("15d");
	}

	@Test
	public void testgetCoderProvFirstName() {
		qaFeedbackEncDxDetails.getCoderProvFirstName();
	}

	@Test
	public void testsetCoderProvFirstName() {
		qaFeedbackEncDxDetails.setCoderProvFirstName("test");
	}

	@Test
	public void testgetCoderProvLastName() {
		qaFeedbackEncDxDetails.getCoderProvLastName();
	}

	@Test
	public void testsetCoderProvLastName() {
		qaFeedbackEncDxDetails.setCoderProvLastName("test");
	}

	@Test
	public void testgetCoderEncEoKey() {
		qaFeedbackEncDxDetails.getCoderEncEoKey();
	}

	@Test
	public void testsetCoderEncEoKey() {
		qaFeedbackEncDxDetails.setCoderEncEoKey("12d");
	}

	@Test
	public void testgetCoderEncEoDesc() {
		qaFeedbackEncDxDetails.getCoderEncEoDesc();
	}

	@Test
	public void testsetCoderEncEoDesc() {
		qaFeedbackEncDxDetails.setCoderEncEoDesc("12d");
	}

	@Test
	public void testgetQaEncounterKey() {
		qaFeedbackEncDxDetails.getQaEncounterKey();
	}

	@Test
	public void testsetQaEncounterKey() {
		qaFeedbackEncDxDetails.setQaEncounterKey(5L);
	}

	@Test
	public void testgetQaDOSFromDate() {
		qaFeedbackEncDxDetails.getQaDOSFromDate();
	}

	@Test
	public void testsetQaDOSFromDate() {
		qaFeedbackEncDxDetails.setQaDOSFromDate("12d");
	}

	@Test
	public void testgetQaDOSThruDate() {
		qaFeedbackEncDxDetails.getQaDOSThruDate();
	}

	@Test
	public void testsetQaQaDOSThruDate() {
		qaFeedbackEncDxDetails.setQaDOSThruDate("15d");
	}

	@Test
	public void testgetQagetQaPageNum() {
		qaFeedbackEncDxDetails.getQaPageNum();
	}

	@Test
	public void testsetQagetQaPageNum() {
		qaFeedbackEncDxDetails.setQaPageNum("12d");
	}

	@Test
	public void testgetQaRetProvFlag() {
		qaFeedbackEncDxDetails.getQaRetProvFlag();
	}

	@Test
	public void testsetQaRetProvFlag() {
		qaFeedbackEncDxDetails.setQaRetProvFlag("12d");
	}

	@Test
	public void testgetgetQaProvNPI() {
		qaFeedbackEncDxDetails.getQaProvNPI();
	}

	@Test
	public void testgetQaProvNPI() {
		qaFeedbackEncDxDetails.setQaProvNPI("12d");
	}

	@Test
	public void testgetQaProvFirstName() {
		qaFeedbackEncDxDetails.getQaProvFirstName();
	}

	@Test
	public void testsetQaProvFirstName() {
		qaFeedbackEncDxDetails.setQaProvFirstName("12d");
	}

	@Test
	public void testgetQaProvLastName() {
		qaFeedbackEncDxDetails.getQaProvLastName();
	}

	@Test
	public void testsetQaProvLastName() {
		qaFeedbackEncDxDetails.setQaProvLastName("12d");
	}

	@Test
	public void testgetQaEncEoKey() {
		qaFeedbackEncDxDetails.getQaEncEoKey();
	}

	@Test
	public void testsetQaEncEoKey() {
		qaFeedbackEncDxDetails.setQaEncEoKey("12d");
	}

	@Test
	public void testgetQaEncEoDesc() {
		qaFeedbackEncDxDetails.getQaEncEoDesc();
	}

	@Test
	public void testsetQaEncEoDesc() {
		qaFeedbackEncDxDetails.setQaEncEoDesc("12d");
	}

	@Test
	public void testgetQaEncActionCd() {
		qaFeedbackEncDxDetails.getQaEncActionCd();
	}

	@Test
	public void testsetQaEncActionCd() {
		qaFeedbackEncDxDetails.setQaEncActionCd("12d");
	}

	@Test
	public void testgetQAFeedbackDxDetails() {
		qaFeedbackEncDxDetails.getQAFeedbackDxDetails();
	}

	@Test
	public void testsetQAFeedbackDxDetails() {
		qaFeedbackEncDxDetails.setQAFeedbackDxDetails(List);
	}

	@Test
	public void testgetQaEncComment() {
		qaFeedbackEncDxDetails.getQaEncComment();
	}

	@Test
	public void testsetQaEncComment() {
		qaFeedbackEncDxDetails.setQaEncComment("12d");
	}
	@Test
	public void test() {
		String[] eoKeyList=new String[10] ;
		qaFeedbackEncDxDetails.setEoKeyList(eoKeyList);
		String[] eoKeyListQA=new String[10] ;;
		qaFeedbackEncDxDetails.setEoKeyListQA(eoKeyListQA);
		qaFeedbackEncDxDetails.getEoKeyList();
		qaFeedbackEncDxDetails.getEoKeyListQA();
	}
}
