package com.optum.gcm.web;

import static com.optum.gcm.model.RestResponse.SUCCESS;
import static com.optum.gcm.model.RestResponse.ERROR;

import java.sql.SQLException;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.optum.gcm.model.CodingInventoryWrapper;
import com.optum.gcm.model.KeyValue;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.sevice.CodingAssignmentService;

/**
 * @author sgangul1
 */

@RequestMapping("/coding/inventory")
@RestController
public class CodingAssignmentController {

	private static final Logger LOG = LoggerFactory.getLogger(CodingAssignmentController.class);

	@Autowired
	private CodingAssignmentService codingAssignmentService;

	@PostMapping(value = "/assignInventoryforCoding", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<Boolean> assignInventoryforCoding(@RequestBody CodingInventoryWrapper codingInventoryWrapper)
			throws SQLException {
		LOG.info("assignInventoryforCoding started with search filter: " + codingInventoryWrapper.toString());
		RestResponse<Boolean> restResponse = new RestResponse<>(SUCCESS);
		String status = codingAssignmentService.assignInventoryforCoding(codingInventoryWrapper);
		if (StringUtils.equalsIgnoreCase(status, SUCCESS))
			restResponse.setResult(true);
		else {
			restResponse.setResult(false);
			restResponse.setStatus(ERROR);
			restResponse.setErrorMessage(status);
		}
		return restResponse;
	}
	@PostMapping(value = "/inventoryAssignmentforOptum", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<Boolean> vendorAssignmentforOptumCoding(@RequestBody CodingInventoryWrapper codingInventoryWrapper)
			throws SQLException {
		LOG.info("assignInventoryforCoding started with search filter: " + codingInventoryWrapper.toString());
		RestResponse<Boolean> restResponse = new RestResponse<>(SUCCESS);
		String status = codingAssignmentService.inventoryAssignmentforOptum(codingInventoryWrapper);
		if (StringUtils.equalsIgnoreCase(status, SUCCESS))
			restResponse.setResult(true);
		else {
			restResponse.setResult(false);
			restResponse.setStatus(ERROR);
			if(StringUtils.equalsIgnoreCase(status, "USER_VENDOR_NOT_REAL")){
				restResponse.setErrorMessage("Assignment Failed:User Assignment is not possible for the selected vendor !!!");
			}else if(StringUtils.equalsIgnoreCase(status, "ASSIGN_VENDOR_NOT_REAL")){
				restResponse.setErrorMessage("Location Assignment is not possible for the selected vendor !!!");
			}else {
				restResponse.setErrorMessage("Exception occurred while Assignment. Please try again !!!");
			}
		}
		return restResponse;
	}
	
	@PostMapping(value = "/assignableVendorsForOptumInventory", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<KeyValue<String, String>>> getAssignableVendorsForOptumInventory(@RequestBody CodingInventoryWrapper vendorSearchInp) {
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>();
		List<KeyValue<String, String>> vendors = codingAssignmentService.getAssignableVendorsForOptumInventory(vendorSearchInp);
		response.setStatus(SUCCESS);
		response.setResult(vendors);
		return response;
	}
}
