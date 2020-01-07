package com.optum.gcm.security;

import static com.optum.gcm.common.util.LoggingUtil.logInfo;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.optum.gcm.exception.ServiceException;
import com.optum.gcm.security.FederatedVirusScan.AccessGrant;

@Service
public class FederatedVirusScanService {
	private static final Logger LOGGER = LoggerFactory.getLogger(FederatedVirusScanService.class);

	private AccessGrant accessGrant;

	FederatedVirusScanService() {
		accessGrant = new AccessGrant();
		accessGrant.setExpirationDateTime(DateTime.now());
	}

	private FederatedVirusScan federatedVirusScan;

	@Autowired
	public FederatedVirusScanService(FederatedVirusScan federatedVirusScan) {
		this.federatedVirusScan = federatedVirusScan;
	}

	public boolean scanFile(MultipartFile file) throws ServiceException {
		if (federatedVirusScan.isDisabled()) {
			LOGGER.warn("Virus Scanner is disabled now");
			return true;
		}
		/*
		 * ***HIGH PRIORITY NOTE***TESTING REQUIRED****
		 * -------------------------------------------- Need to test the below function
		 * as Synchronization for ACCESS_GRANT is removed/disabled
		 */

		if (DateTime.now().isAfter(accessGrant.getExpirationDateTime())) {
			logInfo(LOGGER, "requesting new token");
			accessGrant = federatedVirusScan.getToken();
			// ACCESS_GRANT.setExpirationDateTime(DateTime.now().plusSeconds(ACCESS_GRANT.getExpires_in()
			// - 1));
			logInfo(LOGGER, true, "Virus Scan token Expires on : {}", accessGrant.getExpirationDateTime());
		}
		return federatedVirusScan.scanFile(file, accessGrant);
	}

}
