package com.optum.gcm.sevice;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.QAFeedbackDxDetails;
import com.optum.gcm.model.QAFeedbackEncDxDetails;
import com.optum.gcm.model.QAFeedbackInfo;
import com.optum.gcm.model.QAFeedbackInputFiler;

/**
 * @author pmule
 *
 */

@Service
public class QAFeedbackService {

	protected static final String FUNC_QA_FEEDBACK = "select * from table(pkg_comm_qa.fnc_qa_feedback "
			+ "	(p_user_key => :p_user_key, " + "	 p_group_key => :p_group_key, " + "  p_proj_key => :p_proj_key, "
			+ "  p_content_key => :p_content_key, " + "  p_ven_key => :p_ven_key "
			+ "	)) order by CODER_ENCOUNTER_KEY, RECORD_LEVEL desc";
	
	protected static final String QUERY_FETCH_EO_KEY = "SELECT GCM_EO_KEY FROM GCM_ENC_EO WHERE GCM_ENCOUNTER_KEY = :GCM_ENCOUNTER_KEY";

	private CommonJpaService commonJpaService;

	@Autowired
	public QAFeedbackService(CommonJpaService commonJpaService) {
		this.commonJpaService = commonJpaService;
	}

	public List<QAFeedbackEncDxDetails> getCodingQAFeedbackResults(QAFeedbackInputFiler qaFilter) {
		Map<String, Object> params = new HashMap<>();
		params.put("p_user_key", qaFilter.getLoginUserKey());
		params.put("p_group_key", qaFilter.getGroupKey());
		params.put("p_proj_key", qaFilter.getProjKey());
		params.put("p_content_key", qaFilter.getProjContentKey());
		params.put("p_ven_key", qaFilter.getBusFuncVenKey());

		List<QAFeedbackInfo> qaFeedbackInfoList = commonJpaService.getResultList(FUNC_QA_FEEDBACK, params,
				QAFeedbackInfo.class);
		
		for(QAFeedbackInfo qAFeedbackInfo : qaFeedbackInfoList) {
			if("ENC".equals(qAFeedbackInfo.getRecordLevel())){
				qAFeedbackInfo.setEoKeyList(StringUtils.split(qAFeedbackInfo.getCoderEncEoKeyList(),"\\|"));
				qAFeedbackInfo.setEoKeyListQA(StringUtils.split(qAFeedbackInfo.getQaEncEoKeyList(),"\\|"));
			}
		}
		List<QAFeedbackEncDxDetails> qaFeedbackEncDxDetailsList = convertToWrapper(qaFeedbackInfoList);

		return qaFeedbackEncDxDetailsList;
	}

	private List<QAFeedbackEncDxDetails> convertToWrapper(List<QAFeedbackInfo> qaFeedbackInfoList) {

		List<QAFeedbackEncDxDetails> qaFeedbackEncDxDetailsList = new ArrayList<>();
		Map<String, QAFeedbackEncDxDetails> codingQAMap = new HashMap<>();
		SimpleDateFormat dformat = new SimpleDateFormat("MM-dd-yyyy", Locale.ENGLISH);

		for (QAFeedbackInfo qaFeedbackInfo : qaFeedbackInfoList) {

			QAFeedbackEncDxDetails qaFeedbackEncDxDetails = codingQAMap
					.get(qaFeedbackInfo.getCoderEncounterKey() + "," + qaFeedbackInfo.getQaEncounterKey());

			if (StringUtils.equalsIgnoreCase(qaFeedbackInfo.getRecordLevel(), "ENC")) {

				if (qaFeedbackEncDxDetails == null) {

					// Coder Enc Details
					qaFeedbackEncDxDetails = new QAFeedbackEncDxDetails();
					qaFeedbackEncDxDetails.setCoderEncounterKey(qaFeedbackInfo.getCoderEncounterKey());
					qaFeedbackEncDxDetails.setCoderDOSFromDate(qaFeedbackInfo.getCoderDOSFromDate() != null
							? dformat.format(qaFeedbackInfo.getCoderDOSFromDate()) : null);
					qaFeedbackEncDxDetails.setCoderDOSThruDate(qaFeedbackInfo.getCoderDOSThruDate() != null
							? dformat.format(qaFeedbackInfo.getCoderDOSThruDate()) : null);
					qaFeedbackEncDxDetails.setCoderPageNum(qaFeedbackInfo.getCoderPageNum());
					qaFeedbackEncDxDetails.setCoderProvFirstName(qaFeedbackInfo.getCoderProvFirstName());
					qaFeedbackEncDxDetails.setCoderProvLastName(qaFeedbackInfo.getCoderProvLastName());
					qaFeedbackEncDxDetails.setCoderProvNPI(qaFeedbackInfo.getCoderProvNPI());
					qaFeedbackEncDxDetails.setCoderRetProvFlag(qaFeedbackInfo.getCoderRetProvFlag());
					qaFeedbackEncDxDetails.setEoKeyList(qaFeedbackInfo.getEoKeyList());
					// QA Enc Details
					qaFeedbackEncDxDetails.setQaEncComment(qaFeedbackInfo.getQaEncComment());
					qaFeedbackEncDxDetails.setQaEncounterKey(qaFeedbackInfo.getQaEncounterKey());
					qaFeedbackEncDxDetails.setQaDOSFromDate(qaFeedbackInfo.getQaDOSFromDate() != null
							? dformat.format(qaFeedbackInfo.getQaDOSFromDate()) : null);
					qaFeedbackEncDxDetails.setQaDOSThruDate(qaFeedbackInfo.getQaDOSThruDate() != null
							? dformat.format(qaFeedbackInfo.getQaDOSThruDate()) : null);
					qaFeedbackEncDxDetails.setQaPageNum(qaFeedbackInfo.getQaPageNum());
					qaFeedbackEncDxDetails.setQaProvFirstName(qaFeedbackInfo.getQaProvFirstName());
					qaFeedbackEncDxDetails.setQaProvLastName(qaFeedbackInfo.getQaProvLastName());
					qaFeedbackEncDxDetails.setQaProvNPI(qaFeedbackInfo.getQaProvNPI());
					qaFeedbackEncDxDetails.setQaRetProvFlag(qaFeedbackInfo.getQaRetProvFlag());
					qaFeedbackEncDxDetails.setEoKeyListQA(qaFeedbackInfo.getEoKeyListQA());
					qaFeedbackEncDxDetails.setQaEncActionCd(qaFeedbackInfo.getQaEncActionCd());
					qaFeedbackEncDxDetails.setEoKeyListQA(qaFeedbackInfo.getEoKeyListQA());
					qaFeedbackEncDxDetailsList.add(qaFeedbackEncDxDetails);
					codingQAMap.put(qaFeedbackEncDxDetails.getCoderEncounterKey() + ","
							+ qaFeedbackEncDxDetails.getQaEncounterKey(), qaFeedbackEncDxDetails);
				}
			} else if (StringUtils.equalsIgnoreCase(qaFeedbackInfo.getRecordLevel(), "DX")) {
				// Coder Enc Dx Details
				QAFeedbackDxDetails qaFeedbackDxDetails = new QAFeedbackDxDetails();
				qaFeedbackDxDetails.setCoderEncounterDxKey(qaFeedbackInfo.getCoderEncounterDxKey());
				qaFeedbackDxDetails.setCoderEncounterKey(qaFeedbackInfo.getCoderEncounterKey());
				qaFeedbackDxDetails.setCoderICDDxCode(qaFeedbackInfo.getCoderICDDxCode());
				qaFeedbackDxDetails.setCoderRxV22(qaFeedbackInfo.getCoderRxV22());
				qaFeedbackDxDetails.setCoderRxV23(qaFeedbackInfo.getCoderRxV23());
				qaFeedbackDxDetails.setCoderRxV24(qaFeedbackInfo.getCoderRxV24());
				qaFeedbackDxDetails.setCoderRxHcc(qaFeedbackInfo.getCoderRxHcc());
				qaFeedbackDxDetails.setCoderHccModelCatHhs(qaFeedbackInfo.getCoderHccModelCatHhs());
				qaFeedbackDxDetails.setCoderDxEoKey(qaFeedbackInfo.getCoderDxEoKey());
				qaFeedbackDxDetails.setCoderDxEoDesc(qaFeedbackInfo.getCoderDxEoDesc());
				// QA Enc Dx Details
				qaFeedbackDxDetails.setQaEncounterDXKey(qaFeedbackInfo.getQaEncounterDXKey());
				qaFeedbackDxDetails.setQaEncounterKey(qaFeedbackInfo.getQaEncounterKey());
				qaFeedbackDxDetails.setQaICDDxCode(qaFeedbackInfo.getQaICDDxCode());
				qaFeedbackDxDetails.setQaRxV22(qaFeedbackInfo.getQaRxV22());
				qaFeedbackDxDetails.setQaRxV23(qaFeedbackInfo.getQaRxV23());
				qaFeedbackDxDetails.setQaRxV24(qaFeedbackInfo.getQaRxV24());
				qaFeedbackDxDetails.setQaRxHcc(qaFeedbackInfo.getQaRxHcc());
				qaFeedbackDxDetails.setQaHccModelCatHhs(qaFeedbackInfo.getQaHccModelCatHhs());
				qaFeedbackDxDetails.setQaDxEoKey(qaFeedbackInfo.getQaDxEoKey());
				qaFeedbackDxDetails.setQaDxEoDesc(qaFeedbackInfo.getQaDxEoDesc());
				qaFeedbackDxDetails.setQaDxActionCd(qaFeedbackInfo.getQaEncDxActionCd());

				qaFeedbackEncDxDetails.getQAFeedbackDxDetails().add(qaFeedbackDxDetails);
			}
		}
		return qaFeedbackEncDxDetailsList;
	}

}
