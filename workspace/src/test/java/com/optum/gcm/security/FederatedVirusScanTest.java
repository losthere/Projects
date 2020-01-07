package com.optum.gcm.security;

import java.io.IOException;
import org.joda.time.DateTime;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import com.optum.gcm.common.util.FileNameUtil;
import com.optum.gcm.security.FederatedVirusScan.AccessGrant;
import com.optum.gcm.security.FederatedVirusScan.FederatedDataResult;
import com.optum.gcm.security.FederatedVirusScan.FederatedDataResults;

@RunWith(PowerMockRunner.class)
public class FederatedVirusScanTest {


	@Mock
	RestTemplate restTemplate;
	
	@Mock
	MultipartFile multipartfile;
	
	@Mock
	FederatedVirusScanParams params;
	
	@Mock
	ResponseEntity<AccessGrant> responseEntity;
	
	@Mock
	ResponseEntity<FederatedDataResults> result;
	
	@InjectMocks
	FederatedVirusScan federatedVirusScan = new FederatedVirusScan(params);

	@Test
	public void testGetToken() throws Exception {
		AccessGrant grand = new AccessGrant();
		grand.setAccess_token("1");
		grand.setExpirationDateTime(new DateTime());
		grand.setExpires_in(12);
		grand.setRefresh_token("test234");
		grand.setToken_type("ref");
		grand.getRefresh_token();
		grand.getExpirationDateTime();
		grand.getToken_type();
		PowerMockito.when(params.getClientId()).thenReturn("618");
		PowerMockito.when(params.getClientSecret()).thenReturn("Test1234567890");
		PowerMockito.when(params.getAccessTokenUrl()).thenReturn("http://www.test.com");
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
		PowerMockito.when(restTemplate.exchange(accessTokenUrl, HttpMethod.POST, requestEntity,
					AccessGrant.class)).thenReturn(responseEntity);
		PowerMockito.when(responseEntity.getBody()).thenReturn(grand);
		federatedVirusScan.getToken();
	}
	@SuppressWarnings("unchecked")
	@Test(expected=Exception.class)
	public void testGetToken_Exception() throws Exception {
		AccessGrant grand = new AccessGrant();
		grand.setAccess_token("1");
		grand.setExpirationDateTime(new DateTime());
		grand.setExpires_in(12);
		grand.setRefresh_token("test234");
		grand.setToken_type("ref");
		grand.getRefresh_token();
		grand.getExpirationDateTime();
		grand.getToken_type();
		PowerMockito.when(params.getClientId()).thenReturn("618");
		PowerMockito.when(params.getClientSecret()).thenReturn("Test1234567890");
		PowerMockito.when(params.getAccessTokenUrl()).thenReturn("http://www.test.com");
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
		PowerMockito.when(restTemplate.exchange(accessTokenUrl, HttpMethod.POST, requestEntity,
					AccessGrant.class)).thenThrow(RestClientException.class);
		PowerMockito.when(responseEntity.getBody()).thenReturn(grand);
		federatedVirusScan.getToken();
	}

	@Test
	public void testScanFile() throws Exception {
		FederatedDataResults federatedDataResults = new FederatedDataResults(); 
		byte[] b = String.valueOf("a").getBytes();
		PowerMockito.when(multipartfile.getBytes()).thenReturn(b);
		MultiValueMap<String, Object> multipartMap = new LinkedMultiValueMap<>();
		final String filename = FileNameUtil.cleanseFileName(multipartfile.getOriginalFilename());
		try {
			multipartMap.add("file_01", new ByteArrayResource(multipartfile.getBytes()) {
				@Override
				public String getFilename() {
					return filename;
				}
			});
		} catch (IOException e) {
		}
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.MULTIPART_FORM_DATA);
		headers.set("Authorization", "Bearer " + new FederatedVirusScan.AccessGrant().getAccess_token());
		HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(multipartMap, headers);
		PowerMockito.when(params.getScanUrl()).thenReturn("test");
		PowerMockito.when(params.getSpaceId()).thenReturn("1");
		PowerMockito.when(restTemplate.exchange("test?space_id=1", HttpMethod.POST, request,
				FederatedDataResults.class)).thenReturn(result);
		PowerMockito.when(result.getBody()).thenReturn(federatedDataResults);
		try {
		federatedVirusScan.scanFile(multipartfile, new FederatedVirusScan.AccessGrant());
		} catch(Exception e) {
		
		}
	}
	@SuppressWarnings("unchecked")
	@Test(expected=Exception.class)
	public void testScanFile1() throws Exception {
		PowerMockito.when(multipartfile.getBytes()).thenThrow(IOException.class);
		federatedVirusScan.scanFile(multipartfile, new FederatedVirusScan.AccessGrant());
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testScanFile_Exception() throws Exception {
		FederatedDataResults federatedDataResults = new FederatedDataResults(); 
		byte[] b = String.valueOf("a").getBytes();
		PowerMockito.when(multipartfile.getBytes()).thenReturn(b);
		MultiValueMap<String, Object> multipartMap = new LinkedMultiValueMap<>();
		final String filename = FileNameUtil.cleanseFileName(multipartfile.getOriginalFilename());
		try {
			multipartMap.add("file_01", new ByteArrayResource(multipartfile.getBytes()) {
				@Override
				public String getFilename() {
					return filename;
				}
			});
		} catch (IOException e) {
		}
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.MULTIPART_FORM_DATA);
		headers.set("Authorization", "Bearer " + new FederatedVirusScan.AccessGrant().getAccess_token());
		HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(multipartMap, headers);
		PowerMockito.when(params.getScanUrl()).thenReturn("test");
		PowerMockito.when(params.getSpaceId()).thenReturn("1");
		PowerMockito.when(restTemplate.exchange("test?space_id=1", HttpMethod.POST, request,
				FederatedDataResults.class)).thenThrow(RestClientException.class);
		PowerMockito.when(result.getBody()).thenReturn(federatedDataResults);
		try {
		federatedVirusScan.scanFile(multipartfile, new FederatedVirusScan.AccessGrant());
		} catch(Exception e) {
		
		}
	}
	
	@Test
	public void testScanResultFile() throws Exception {
		FederatedDataResults federatedDataResults = new FederatedDataResults(); 
		FederatedDataResult virusscan =new FederatedDataResult();
		virusscan.setDescription("test");
		virusscan.setFile_size("20");
		virusscan.setFileName("test");
		virusscan.setStatus("CLEAN");
		virusscan.setStatus_code("200");
		virusscan.getStatus_code();
		virusscan.getDescription();
		virusscan.getFile_size();
		virusscan.getFileName();
		federatedDataResults.getVirusscan();
		federatedDataResults.setVirusscan(virusscan);
		byte[] b = String.valueOf("a").getBytes();
		PowerMockito.when(multipartfile.getBytes()).thenReturn(b);
		MultiValueMap<String, Object> multipartMap = new LinkedMultiValueMap<>();

		final String filename = FileNameUtil.cleanseFileName(multipartfile.getOriginalFilename());
		try {
			multipartMap.add("file_01", new ByteArrayResource(multipartfile.getBytes()) {
				@Override
				public String getFilename() {
					return filename;
				}
			});
		} catch (IOException e) {
		}
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.MULTIPART_FORM_DATA);
		headers.set("Authorization", "Bearer " + new FederatedVirusScan.AccessGrant().getAccess_token());
		HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(multipartMap, headers);
		PowerMockito.when(params.getScanUrl()).thenReturn("test");
		PowerMockito.when(params.getSpaceId()).thenReturn("1");
		PowerMockito.when(restTemplate.exchange("test?space_id=1", HttpMethod.POST, request,
				FederatedDataResults.class)).thenReturn(result);
		PowerMockito.when(result.getBody()).thenReturn(federatedDataResults);
		try {
		federatedVirusScan.scanFile(multipartfile, new FederatedVirusScan.AccessGrant());
		} catch(Exception e) {
		
		}
	}

	@Test
	public void testIsDisabled() throws Exception {
		federatedVirusScan.isDisabled();
	}

}
