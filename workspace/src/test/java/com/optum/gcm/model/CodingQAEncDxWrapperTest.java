package com.optum.gcm.model;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class CodingQAEncDxWrapperTest {

	@InjectMocks
	CodingQAEncDxWrapper codingQAEncDxWrapper;
	@Mock
	private List<CodingQAEncDxDetails> codingQAEncDxDetailsList;

	@Test
	public void testCodingQAEncDxWrapper() {

		codingQAEncDxWrapper.setBusFuncVenKey(5L);
		codingQAEncDxWrapper.getBusFuncVenKey();
		codingQAEncDxWrapper.setCodingQAEncDxDetailsList(codingQAEncDxDetailsList);
		codingQAEncDxWrapper.getCodingQAEncDxDetailsList();
		codingQAEncDxWrapper.setGroupKey(6L);
		codingQAEncDxWrapper.getGroupKey();
		codingQAEncDxWrapper.setLoginUserId("test");
		codingQAEncDxWrapper.getLoginUserId();
		codingQAEncDxWrapper.setLoginUserKey(5L);
		codingQAEncDxWrapper.getLoginUserKey();
		codingQAEncDxWrapper.setProjContKey(5L);
		codingQAEncDxWrapper.getProjContKey();
		codingQAEncDxWrapper.setProjectKey(5L);
		codingQAEncDxWrapper.getProjectKey();
		codingQAEncDxWrapper.toString();
	}

}
