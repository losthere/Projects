package com.optum.gcm.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class FederatedVirusScanParams {
	
	@Value("${fedscan.accessTokenUrl}")
	private String accessTokenUrl;
	
	@Value("${fedscan.scanUrl}")
	private String scanUrl;
	
	@Value("${fedscan.clientId}")
	private String clientId;
	
	@Value("${fedscan.clientSecret}")
	private String clientSecret;
	
	@Value("${fedscan.spaceId}")
	private String spaceId;
	
	@Value("${fedscan.disabled}")
	private String disabled;
	
	public String getAccessTokenUrl() {
		return accessTokenUrl;
	}
	public String getScanUrl() {
		return scanUrl;
	}
	public String getClientId() {
		return clientId;
	}
	public String getClientSecret() {
		return clientSecret;
	}
	public String getSpaceId() {
		return spaceId;
	}
	public String getDisabled() {
		return disabled;
	}
}
