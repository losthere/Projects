package com.optum.gcm.web;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.optum.gcm.model.CodingInventory;
import com.optum.gcm.model.CodingUser;
import com.optum.gcm.model.OptumCodingInventory;
import com.optum.gcm.model.OptumQAInventory;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.sevice.CodingSearchService;

/**
 * @author sgangul1
 */

@RequestMapping("/coding/inventory")
@RestController
public class CodingSearchController {

	private static final Logger LOG = LoggerFactory.getLogger(CodingSearchController.class);

	@Autowired
	private CodingSearchService codingSearchService;

	@PostMapping(value = "/getUnassignedInventoryforCoding", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<CodingInventory>> getUnassignedInventoryforCoding(
			@RequestBody SchedulingSearchFilter searchFilter) throws SQLException {
		LOG.info("getInventoryforCoding started with search filter: " + searchFilter.toString());
		RestResponse<List<CodingInventory>> restResponse = new RestResponse<>(SUCCESS);
		restResponse.setResult(codingSearchService.getUnassignedInventoryforCoding(searchFilter));
		return restResponse;
	}
	
	@PostMapping(value = "/getCodingUsersforSupervisor", produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<CodingUser>> getCodingUsersforSupervisor(
			@RequestParam(required = false) String supervisorUserKey, @RequestParam Long vendorKey, @RequestParam Long groupKey, @RequestParam String roleCode, @RequestParam Long userKey, @RequestParam String userId,@RequestParam Long busFuncKey) throws SQLException {
		LOG.info("getCodingUsersforSupervisor started with supervisor User Key: " + supervisorUserKey);
		RestResponse<List<CodingUser>> restResponse = new RestResponse<>(SUCCESS);
		restResponse.setResult(codingSearchService.getCodingUsersforSupervisor(supervisorUserKey, vendorKey, groupKey, roleCode, userKey, userId, busFuncKey));
		return restResponse;
	}

	
	@PostMapping(value = "/getUnassignedInventoryforOptum", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<CodingInventory>> getUnassignedInventoryforOptum(
			@RequestBody SchedulingSearchFilter searchFilter) throws SQLException {
		LOG.info("getInventoryforCoding started with search filter: " + searchFilter.toString());
		RestResponse<List<CodingInventory>> restResponse = new RestResponse<>(SUCCESS);
		restResponse.setResult(codingSearchService.getUnassignedInventoryforOptum(searchFilter));
		return restResponse;
	}
}
