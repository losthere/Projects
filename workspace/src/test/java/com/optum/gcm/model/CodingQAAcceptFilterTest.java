package com.optum.gcm.model;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class CodingQAAcceptFilterTest {
	@InjectMocks
	CodingQAAcceptFilter codingqaacceptfilter;

	@Test
	public void testcodingqaacceptfilter() {
		codingqaacceptfilter.getBusFuncVenKey();
		codingqaacceptfilter.setBusFuncVenKey(2L);
		codingqaacceptfilter.getDosIndFlag();
		codingqaacceptfilter.setDosIndFlag("test");
		codingqaacceptfilter.getGroupKey();
		codingqaacceptfilter.setGroupKey(2L);
		codingqaacceptfilter.getLoginUserId();
		codingqaacceptfilter.setLoginUserId("test");
		codingqaacceptfilter.getLoginUserKey();
		codingqaacceptfilter.setLoginUserKey(2L);
		codingqaacceptfilter.getProjContKey();
		codingqaacceptfilter.setProjContKey(2L);
		codingqaacceptfilter.getProjectKey();
		codingqaacceptfilter.setProjectKey(2L);
		codingqaacceptfilter.toString();
	}

}
