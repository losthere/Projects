package com.optum.gcm.web;

import static com.optum.gcm.model.RestResponse.ERROR;
import static com.optum.gcm.model.RestResponse.SUCCESS;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.optum.gcm.model.ChartComments;
import com.optum.gcm.model.ChartDetailsInfo;
import com.optum.gcm.model.ChartHistoryInfo;
import com.optum.gcm.model.ChartInputInfo;
import com.optum.gcm.model.DxCodeDOSDetails;
import com.optum.gcm.model.GcmEOVw;
import com.optum.gcm.model.IcdHccDetails;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.sevice.CodingWorkFlowService;



/**
 * @author pmule
 *
 */

@RequestMapping("/coding/workflow/")
@RestController
public class CodingWorkFlowController {

	private static final Logger LOG = LoggerFactory.getLogger(CodingWorkFlowController.class);
	
	@Autowired
	private CodingWorkFlowService codingWorkFlowService;
	
	
	@PostMapping(value = "/getChartDetails", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<ChartDetailsInfo> getChartDetails(@RequestBody ChartInputInfo chartInputInfo) throws SQLException {
		LOG.info("getChartDetails started with search filter: " + chartInputInfo.toString());
		RestResponse<ChartDetailsInfo> restResponse = new RestResponse<>(SUCCESS);
		try {
		restResponse.setResult(codingWorkFlowService.getChartDetails(chartInputInfo));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getChartDetails ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/isBusFuncConfigured")
	public boolean isBusFuncConfigured(@RequestParam Long groupKey, @RequestParam String roleCode) throws SQLException {
		RestResponse<ChartDetailsInfo> restResponse = new RestResponse<>(SUCCESS);
		try {
			return codingWorkFlowService.isBusFuncConfigured(groupKey,roleCode);
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getChartDetails ", e);
			return false;
		}
	}

	@PostMapping(value = "/updateChartStatus", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<String> updateChartStatus(@RequestBody ChartInputInfo chartInputInfo) throws SQLException {
		LOG.info("updateChartStatus started with search filter: " + chartInputInfo.toString());
		RestResponse<String>restResponse = new RestResponse<>(SUCCESS);
		try {
			int updateCount = codingWorkFlowService.updateChartStatus(chartInputInfo);
			if(updateCount > 0) {
				return new RestResponse<>(SUCCESS);
			}else {
				restResponse.setStatus(ERROR);
				if(null != chartInputInfo.getToBusFuncStatus() && ("COMPLETED".equalsIgnoreCase(chartInputInfo.getToBusFuncStatus()) || "ESCALATED".equalsIgnoreCase(chartInputInfo.getToBusFuncStatus()) || "REJECTED".equalsIgnoreCase(chartInputInfo.getToBusFuncStatus()))) {
					restResponse.setErrorMessage("Workitem has been completed/reassigned to different user.");
				}else {
					restResponse.setErrorMessage(ERROR);
				}
			}
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while updateChartStatus ", e);
		}
		return restResponse;
	}

	@PostMapping(value = "/replyAndExitforEscalatedItem", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<String> replyAndExitforEscalatedItem(@RequestBody ChartInputInfo chartInputInfo) throws SQLException {
		LOG.info("replyandExitforEscalatedItem started with search filter: " + chartInputInfo.toString());
		RestResponse<String>restResponse = new RestResponse<>(SUCCESS);
		try {
			codingWorkFlowService.replyandExitforEscalatedItem(chartInputInfo);
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while replyAndExitforEscalatedItem ", e);
		}
		return new RestResponse<>(SUCCESS);
	}
	
	@PostMapping(value = "/getChartHistory", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<ChartHistoryInfo>> getChartHistory(@RequestBody Long projContentKey) throws SQLException {
		LOG.info("getChartHistory started with search filter: " + projContentKey);
		RestResponse<List<ChartHistoryInfo>>restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(codingWorkFlowService.getChartHistory(projContentKey));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getChartHistory ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/getChartComments", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<ChartComments>> getChartComments(@RequestBody Long projContentKey) throws SQLException {
		LOG.info("getChartComments started with search filter: " + projContentKey);
		RestResponse<List<ChartComments>> restResponse = new RestResponse<>(SUCCESS);
		try {
		restResponse.setResult(codingWorkFlowService.getChartComments(projContentKey));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getChartComments ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/getEncEoCodes", consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	@Cacheable("getEncEoCodes")
	public RestResponse<List<GcmEOVw>> getEncEoCodes(){
		LOG.info(">>>>>>>>>>>>>>>> controller class getEncEoCodes called ");
		RestResponse<List<GcmEOVw>> restResponse = new RestResponse<>(SUCCESS);
		try {
			List<GcmEOVw> encEoCodes = null;
			encEoCodes = codingWorkFlowService.getEncEoCodes();
			restResponse.setResult(encEoCodes);
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getEncEoCodes ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/getDxLevelEoCodes", consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	@Cacheable("getDxLevelEoCodes")
	public RestResponse<List<GcmEOVw>> getDxLevelEoCodes(){
		LOG.info(">>>>>>>>>>>>>>>> controller class getDxLevelEoCodes called ");
		RestResponse<List<GcmEOVw>> restResponse = new RestResponse<>(SUCCESS);
		try {
			List<GcmEOVw> encEoCodes = null;
			encEoCodes = codingWorkFlowService.getDxLevelEoCodes();
			restResponse.setResult(encEoCodes);
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getDxLevelEoCodes ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/validateIcdCode", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<IcdHccDetails> validateIcdCode(@RequestBody DxCodeDOSDetails dxCodedosDetailsObj) throws SQLException, ParseException {
		LOG.info("validateIcdCode started with search filter: " + dxCodedosDetailsObj.getIcdDxCd());
		RestResponse<IcdHccDetails>restResponse = new RestResponse<>(SUCCESS);
		try {
			restResponse.setResult(codingWorkFlowService.validateIcdCode(dxCodedosDetailsObj));
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while getDxLevelEoCodes ", e);
		}
		return restResponse;
	}
	
	@PostMapping(value = "/makeEntryforCoderProductivity", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<String> makeEntryforCoderProductivity(@RequestBody ChartInputInfo chartInputInfo) throws SQLException {
		LOG.info("makeEntryforCoderProductivity started with search filter: " + chartInputInfo.toString());
		RestResponse<String>restResponse = new RestResponse<>(SUCCESS);
		try {
			codingWorkFlowService.makeEntryforCoderProductivity(chartInputInfo);
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(ERROR);
			LOG.error("Exception while makeEntryforCoderProductivity ", e);
		}
		return new RestResponse<>(SUCCESS);
	}

}