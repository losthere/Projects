package com.optum.gcm.web;



import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.web.multipart.MultipartFile;

import com.optum.gcm.exception.ServiceException;
import com.optum.gcm.security.FederatedVirusScanService;


@RunWith(PowerMockRunner.class)
public class FederatedScanControllerTest {

	@InjectMocks
	FederatedScanController federatedScanController;
	@Mock
	private FederatedVirusScanService federatedVirusScanService; 
	@Test
	public void testscanFile() {
		FederatedVirusScanService federatedVirusScanService=Mockito.mock(FederatedVirusScanService.class);
		MultipartFile file= Mockito.mock(MultipartFile.class);
		federatedScanController.scanFile(file);
		
	}
	@Test
	public void testscanFile_() {
	
		MultipartFile file= Mockito.mock(MultipartFile.class);
		PowerMockito.when(federatedVirusScanService.scanFile(file)).thenReturn(true);
		federatedScanController.scanFile(file);
		
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testscanFile_exe() {
	
		MultipartFile file= Mockito.mock(MultipartFile.class);
		PowerMockito.when(federatedVirusScanService.scanFile(file)).thenThrow( ServiceException.class);
		federatedScanController.scanFile(file);
		
	}
}
