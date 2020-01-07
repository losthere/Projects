package com.optum.gcm.web;

import static com.optum.gcm.model.RestResponse.SUCCESS;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.optum.gcm.model.AssignableVendorsInput;
import com.optum.gcm.model.KeyValue;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.model.RetrievalHpVendorStatusCountResult;
import com.optum.gcm.model.RetrievalSearchFilter;
import com.optum.gcm.model.RetrievalSearchInput;
import com.optum.gcm.model.RetrievalSearchResult;
import com.optum.gcm.sevice.RetrievalSearchService;

@RequestMapping("/retrieval")
@RestController
public class RetrievalSearchController {

	@Autowired
	private RetrievalSearchService retrievalSearchService;

	@PostMapping("/projects")
	public RestResponse<List<RetrievalSearchResult>> getProjects(
			@RequestBody RetrievalSearchInput retrievalSearchFilter) {
		RestResponse<List<RetrievalSearchResult>> restResponse = new RestResponse<>(SUCCESS);
		restResponse.setResult(retrievalSearchService.getProjects(retrievalSearchFilter));
		return restResponse;
	}

	@PostMapping("/getDetailCountByProject")
	public RestResponse<List<RetrievalHpVendorStatusCountResult>> getDetailCountByProject(@RequestBody RetrievalSearchFilter retrievalSearchFilter) {
		RestResponse<List<RetrievalHpVendorStatusCountResult>> restResponse = new RestResponse<>(SUCCESS);
		restResponse.setResult(retrievalSearchService.getDetailCountByProject(retrievalSearchFilter));
		return restResponse;
	}
	@PostMapping("/getAssignableVendors")
	public RestResponse<List<KeyValue<String, String>>> getAssignableVendors(@RequestBody AssignableVendorsInput assinableVendorInp){
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>(SUCCESS);
		List<KeyValue<String, String>> vendors = retrievalSearchService.getAssignableVendors(assinableVendorInp);
		response.setResult(vendors);
		return response;
	}
	@PostMapping("/getAssignableVendorsByHPnClient")
	public  RestResponse<List<KeyValue<String, String>>> getAssignableVendorsByHPnClient(@RequestBody AssignableVendorsInput assinableVendorInp){
		RestResponse<List<KeyValue<String, String>>> response = new RestResponse<>(SUCCESS);
		List<KeyValue<String, String>> vendors = retrievalSearchService.getAssignableVendorsByHPnClient(assinableVendorInp);
		response.setResult(vendors);
		return response;
	}
	
}
