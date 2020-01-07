package com.optum.gcm.web;

import static com.optum.gcm.model.RestResponse.ERROR;
import static com.optum.gcm.model.RestResponse.SUCCESS;

import java.sql.SQLException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.optum.gcm.model.QAFeedbackEncDxDetails;
import com.optum.gcm.model.QAFeedbackInputFiler;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.sevice.QAFeedbackService;

/**
 * @author pmule
 *
 */

@RequestMapping("/codingqa/feedback")
@RestController
public class QAFeedbackController {

	private static final Logger LOG = LoggerFactory.getLogger(CodingSearchController.class);

	@Autowired
	private QAFeedbackService qaFeedbackService;

	@PostMapping(value = "/getCodingQAFeedbackResults", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<QAFeedbackEncDxDetails>> getCodingQAFeedbackResults(
			@RequestBody QAFeedbackInputFiler qaInputFiler) {
		LOG.info("getCodingQAFeedbackResults started with search filter: " + qaInputFiler.toString());
		RestResponse<List<QAFeedbackEncDxDetails>> restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(qaFeedbackService.getCodingQAFeedbackResults(qaInputFiler));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getCodingQAFeedbackResults ", e);
		}
		return restResponse;
	}

}
