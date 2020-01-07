package com.optum.gcm.model;

import static org.junit.Assert.assertNotNull;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class CodingQAEncDxDetailsTest {
	@InjectMocks
	CodingQAEncDxDetails codingqaencdetails;
	@Mock
	private EOCode coderEoCode;
	@Mock
	private EOCode qaEoCode;

	@Test
	public void testcodingqaencdetails() {
		codingqaencdetails.setCoderDOSFromDate("test");
		assertNotNull(codingqaencdetails.getCoderDOSFromDate());
		codingqaencdetails.setCoderDOSThruDate("test");
		assertNotNull(codingqaencdetails.getCoderDOSThruDate());
		codingqaencdetails.setCoderEncounterKey(2L);
		assertNotNull(codingqaencdetails.getCoderEncounterKey());
		codingqaencdetails.setCoderEoCode(coderEoCode);
		assertNotNull(codingqaencdetails.getCoderEoCode());
		codingqaencdetails.setCoderPageNum("test");
		assertNotNull(codingqaencdetails.getCoderPageNum());
		codingqaencdetails.setCoderProvFirstName("test");
		assertNotNull(codingqaencdetails.getCoderProvFirstName());
		codingqaencdetails.setCoderProvLastName("test");
		assertNotNull(codingqaencdetails.getCoderProvLastName());
		codingqaencdetails.setCoderProvNPI("test");
		assertNotNull(codingqaencdetails.getCoderProvNPI());
		codingqaencdetails.setCoderRetProvFlag("test");
		assertNotNull(codingqaencdetails.getCoderRetProvFlag());
		List<CodingQaDxDetails> List=new ArrayList<>();
		CodingQaDxDetails e=new CodingQaDxDetails();
		List.add(e);
		codingqaencdetails.setCodingQaDxDetails(List);
		assertNotNull(codingqaencdetails.getCodingQaDxDetails());
		codingqaencdetails.setQaDOSFromDate("test");
		assertNotNull(codingqaencdetails.getQaDOSFromDate());
		codingqaencdetails.setQaDOSThruDate("test");
		assertNotNull(codingqaencdetails.getQaDOSThruDate());
		codingqaencdetails.setQaEncActionCd("test");
		assertNotNull(codingqaencdetails.getQaEncActionCd());
		codingqaencdetails.setQaEncounterKey(2L);
		assertNotNull(codingqaencdetails.getQaEncounterKey());
		codingqaencdetails.setQaEncComments("test");
		assertNotNull(codingqaencdetails.getQaEncComments());
		codingqaencdetails.setQaEoCode(qaEoCode);
		assertNotNull(codingqaencdetails.getQaEoCode());
		codingqaencdetails.setQaPageNum("test");
		assertNotNull(codingqaencdetails.getQaPageNum());
		codingqaencdetails.setQaProvFirstName("test");
		assertNotNull(codingqaencdetails.getQaProvFirstName());
		codingqaencdetails.setQaProvLastName("test");
		assertNotNull(codingqaencdetails.getQaProvLastName());
		codingqaencdetails.setQaProvNPI("test");
		assertNotNull(codingqaencdetails.getQaProvNPI());
		codingqaencdetails.setQaRetProvFlag("test");
		assertNotNull(codingqaencdetails.getQaRetProvFlag());
		List<EOCode> qaEoKeyList=new ArrayList<>();
		codingqaencdetails.setQaEoKeyList(qaEoKeyList);
		assertNotNull(codingqaencdetails.getQaEoKeyList());
		String[] strings=new String[10];
		codingqaencdetails.setQaEoKeyListResponse(strings);
		assertNotNull(codingqaencdetails.getQaEoKeyListResponse());
		String[] coderEoKeyList=new String[10];;
		codingqaencdetails.setCoderEoKeyList(coderEoKeyList);
		assertNotNull(codingqaencdetails.getCoderEoKeyList());
		List<String> coderEoKeyListResponse=new ArrayList<>();
		codingqaencdetails.setCoderEoKeyListResponse(coderEoKeyListResponse);
		assertNotNull(codingqaencdetails.getCoderEoKeyListResponse());
		codingqaencdetails.toString();

	}

}
