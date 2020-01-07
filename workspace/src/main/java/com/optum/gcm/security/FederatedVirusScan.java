package com.optum.gcm.security;

import static com.optum.gcm.common.util.LoggingUtil.logInfo;

import java.io.IOException;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.optum.gcm.common.util.FileNameUtil;
import com.optum.gcm.exception.ServiceException;

@Service
public class FederatedVirusScan {

	private static final Logger LOGGER = LoggerFactory.getLogger(FederatedVirusScan.class);

	private FederatedVirusScanParams params;

	@Autowired
	public FederatedVirusScan(FederatedVirusScanParams params) {
		this.params = params;
	}

	@Autowired
	private RestTemplate restTemplate;

	static final String STATUS_CLEAN = "CLEAN";

	public AccessGrant getToken() throws ServiceException {

		MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();

		String clientId = params.getClientId();
		String clientSecret = params.getClientSecret();
		String accessTokenUrl = params.getAccessTokenUrl();

		formData.add("client_id", clientId);
		formData.add("client_secret", clientSecret);
		formData.add("grant_type", "authorization_code");

		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
		requestHeaders.set("Accept", MediaType.APPLICATION_JSON_VALUE);
		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(formData, requestHeaders);
		logInfo(LOGGER,true, "requesting new FederatedVirusScan token. accessTokenUrl={}, clientId={}, clientSecret={}:"
				, accessTokenUrl, clientId, clientSecret.substring(0, 10));
		try {
			ResponseEntity<AccessGrant> response = restTemplate.exchange(accessTokenUrl, HttpMethod.POST, requestEntity,
					AccessGrant.class);
			AccessGrant accessGrant = response.getBody();
			//DateTime expiration = new DateTime();
			accessGrant.setExpirationDateTime(DateTime.now().plusSeconds(accessGrant.getExpires_in() - 1));
			return accessGrant;
		} catch (RestClientException e) {
			String message = "Error occured while getting Virus Scan token";
			LOGGER.error(message, e);
			throw new ServiceException(message);
		}
	}

	public boolean scanFile(MultipartFile file, AccessGrant accessGrant) throws ServiceException {
		MultiValueMap<String, Object> multipartMap = new LinkedMultiValueMap<>();

		final String filename = FileNameUtil.cleanseFileName(file.getOriginalFilename());
		try {
			multipartMap.add("file_01", new ByteArrayResource(file.getBytes()) {
				@Override
				public String getFilename() {
					return filename;
				}
			});
		} catch (IOException e) {
			String message = "Exception getting bytes from uploaded file.";
			LOGGER.error(message, e);
			throw new ServiceException(message);
		}

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.MULTIPART_FORM_DATA);
		headers.set("Authorization", "Bearer " + accessGrant.getAccess_token());

		HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(multipartMap, headers);
		try {
			ResponseEntity<FederatedDataResults> result = restTemplate.exchange(
					params.getScanUrl() + "?space_id=" + params.getSpaceId(), HttpMethod.POST, request,
					FederatedDataResults.class);
			FederatedDataResults list = result.getBody();
			FederatedDataResult[] results = list.getResults();
			if (results == null || results.length != 1) {
				return false;
			}
			// System.out.println(ReflectionToStringBuilder.toString(results));
			return STATUS_CLEAN.equalsIgnoreCase(results[0].getStatus());
		} catch (RestClientException e) {
			String message = "Exception while calling Federated Virus Scanner.";
			LOGGER.error(message, e);
			throw new ServiceException(message);
		}
	}

	public boolean isDisabled() {
		return Boolean.parseBoolean(params.getDisabled());
	}

	public static class AccessGrant {

		private String access_token;
		private Integer expires_in;
		private DateTime expirationDateTime;
		private String refresh_token;
		private String token_type;

		public String getAccess_token() {
			return access_token;
		}

		public void setAccess_token(String access_token) {
			this.access_token = access_token;
		}

		public String getToken_type() {
			return token_type;
		}

		public void setToken_type(String token_type) {
			this.token_type = token_type;
		}

		public Integer getExpires_in() {
			return expires_in;
		}

		public void setExpires_in(Integer expires_in) {
			this.expires_in = expires_in;
		}

		public String getRefresh_token() {
			return refresh_token;
		}

		public void setRefresh_token(String refresh_token) {
			this.refresh_token = refresh_token;
		}

		public DateTime getExpirationDateTime() {
			return expirationDateTime;
		}

		public void setExpirationDateTime(DateTime expirationDateTime) {
			this.expirationDateTime = expirationDateTime;
		}

	}
		public static class FederatedDataResults {
		FederatedDataResult[] virusscan;

		FederatedDataResult[] getResults() {
			return virusscan;
		}

		public FederatedDataResult[] getVirusscan() {
			return virusscan;
		}

		public void setVirusscan(FederatedDataResult... virusscan) {
			this.virusscan = virusscan;
		}
	}

	public static class FederatedDataResult {
		private String fileName;
		private String status;
		private String status_code;
		private String description;
		private String file_size;

		public String getFileName() {
			return fileName;
		}

		public void setFileName(String fileName) {
			this.fileName = fileName;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public String getStatus_code() {
			return status_code;
		}

		public void setStatus_code(String status_code) {
			this.status_code = status_code;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public String getFile_size() {
			return file_size;
		}

		public void setFile_size(String file_size) {
			this.file_size = file_size;
		}
	}
}