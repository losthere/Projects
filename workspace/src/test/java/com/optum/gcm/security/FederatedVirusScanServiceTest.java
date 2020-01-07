package com.optum.gcm.security;

import static org.junit.Assert.assertEquals;

import org.joda.time.DateTime;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.web.multipart.MultipartFile;

import com.optum.gcm.security.FederatedVirusScan.AccessGrant;

@RunWith(PowerMockRunner.class)
public class FederatedVirusScanServiceTest {

	@Mock
	private FederatedVirusScan federatedVirusScan;

	@Mock
	protected MultipartFile multipartfile;
	
	@Mock
	protected AccessGrant accessGrant;
	
	@InjectMocks@Spy
	FederatedVirusScanService federatedVirusScanService = new FederatedVirusScanService(federatedVirusScan);

	@Test
	public void testScanFile() throws Exception {
		PowerMockito.when(federatedVirusScan.isDisabled()).thenReturn(true);
		assertEquals(true, federatedVirusScanService.scanFile(multipartfile));
	}
	
	@Test
	public void testScan() throws Exception {
		PowerMockito.when(federatedVirusScan.isDisabled()).thenReturn(false);
		PowerMockito.when(accessGrant.getExpirationDateTime()).thenReturn(new DateTime());
		PowerMockito.when(federatedVirusScan.scanFile(multipartfile, accessGrant)).thenReturn(true);
		PowerMockito.when(federatedVirusScan.getToken()).thenReturn(accessGrant);
		new FederatedVirusScanService();
		assertEquals(true, federatedVirusScanService.scanFile(multipartfile));
	}

}
