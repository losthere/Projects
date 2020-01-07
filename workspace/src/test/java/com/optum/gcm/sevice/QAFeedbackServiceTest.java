package com.optum.gcm.sevice;

import static com.optum.gcm.sevice.QAFeedbackService.FUNC_QA_FEEDBACK;
import static org.powermock.api.mockito.PowerMockito.when;
import static org.powermock.api.mockito.PowerMockito.whenNew;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.QAFeedbackEncDxDetails;
import com.optum.gcm.model.QAFeedbackInfo;
import com.optum.gcm.model.QAFeedbackInputFiler;

@RunWith(PowerMockRunner.class)
public class QAFeedbackServiceTest {

	@InjectMocks
	protected QAFeedbackService qAFeedbackService;

	@Mock
	private CommonJpaService commonJpaService;

	@Mock
	private QAFeedbackInputFiler qaFilter;
	
	@Mock
	private QAFeedbackEncDxDetails qaFeedbackEncDxDetails;
	
	@Mock
	private Map<String, QAFeedbackEncDxDetails> codingQAMap;
	
	//@Mock
	//private List<QAFeedbackInfo> qaFeedbackInfoList;

	/*@Test
	public void testGetCodingQAFeedbackResults() {
		new HashMap<>();
		qAFeedbackService.getCodingQAFeedbackResults(qaFilter);
	}*/

	@SuppressWarnings("unchecked")
	@Test
	public void test_GetCodingQAFeedbackResults() throws Exception {
		new HashMap<>();
		List<QAFeedbackInfo> qaFeedbackInfoList = new ArrayList<QAFeedbackInfo>();
		QAFeedbackInfo qaInfo = new QAFeedbackInfo();
		qaInfo.setRecordLevel("ENC");
		qaFeedbackInfoList.add(qaInfo);
		HashMap<String, Object> params = new HashMap<>();
		params.put("p_user_key", 0);
		params.put("p_group_key", 0);
		params.put("p_proj_key", 0);
		params.put("p_content_key", 0);
		params.put("p_ven_key", 0);
		//whenNew(HashMap.class).withAnyArguments().thenReturn(params);
		//PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(), Mockito.anyObject())).thenReturn(qaFeedbackInfoList);
		PowerMockito.doReturn(qaFeedbackInfoList).when(commonJpaService).getResultList(Mockito.anyString(), Mockito.anyMap(), Mockito.any());
		qAFeedbackService.getCodingQAFeedbackResults(qaFilter);
	}
	
	@SuppressWarnings("unchecked")
	@Test
	public void test_GetCodingQAFeedbackResults2() throws Exception {
		new HashMap<>();
		List<QAFeedbackInfo> qaFeedbackInfoList = new ArrayList<QAFeedbackInfo>();
		Map<String, QAFeedbackEncDxDetails> codingQAMap = new HashMap<>();
		//PowerMockito.when(codingQAMap.get(Mockito.anyLong() + Mockito.anyString() + Mockito.anyLong())).thenReturn(qaFeedbackEncDxDetails);
		QAFeedbackInfo qaInfo = new QAFeedbackInfo();
		qaInfo.setRecordLevel("ENC");
		qaInfo.setCoderEncounterKey(2L);
		qaInfo.setQaEncounterKey(2L);
		qaFeedbackInfoList.add(qaInfo);
		QAFeedbackInfo qaInfo1 = new QAFeedbackInfo();
		qaInfo1.setRecordLevel("DX");
		qaInfo1.setCoderEncounterKey(2L);
		qaInfo1.setQaEncounterKey(2L);
		qaFeedbackInfoList.add(qaInfo1);
	//	PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(), Mockito.anyObject())).thenReturn(qaFeedbackInfoList);
		PowerMockito.doReturn(qaFeedbackInfoList).when(commonJpaService).getResultList(Mockito.anyString(), Mockito.anyMap(), Mockito.any());
		qAFeedbackService.getCodingQAFeedbackResults(qaFilter);
	}

}
