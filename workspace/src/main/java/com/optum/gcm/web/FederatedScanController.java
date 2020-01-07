package com.optum.gcm.web;

import static com.optum.gcm.common.util.LoggingUtil.logInfo;
import static com.optum.gcm.model.RestResponse.ERROR;
import static com.optum.gcm.model.RestResponse.SUCCESS;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.optum.gcm.model.RestResponse;
import com.optum.gcm.security.FederatedVirusScanService;

@RequestMapping("/api/federated")
@RestController
public class FederatedScanController {

	private static final Logger LOG = LoggerFactory.getLogger(FederatedScanController.class);
	private static final String FILE_CLEAN = "CLEAN";
	private static final String FILE_INFECTED = "INFECTED";

	@Autowired
	private FederatedVirusScanService federatedVirusScanService;

	@PostMapping(value = "/scanfile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<String> scanFile(@RequestParam("file") MultipartFile file) {
		logInfo(LOG, true,"Starting Federated Scan for file - {} with size - {} ", file.getOriginalFilename(), file.getSize());
		RestResponse<String> restResponse = new RestResponse<>(SUCCESS);
		try {
			boolean status = federatedVirusScanService.scanFile(file);
			restResponse.setStatus(SUCCESS);
			if (status) {
				restResponse.setResult(FILE_CLEAN);
			} else {
				restResponse.setResult(FILE_INFECTED);
			}
		} catch (Exception e) {
			restResponse.setStatus(ERROR);
			restResponse.setResult(ERROR);
			restResponse.setErrorMessage(e.getMessage());
		}
		return restResponse;
	}

}
