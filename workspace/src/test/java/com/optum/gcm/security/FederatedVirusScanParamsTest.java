package com.optum.gcm.security;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class FederatedVirusScanParamsTest {

	@InjectMocks
    private FederatedVirusScanParams federatedVirusScanParams;
    

    @Test
    public void test() throws Exception {
    	 federatedVirusScanParams.getAccessTokenUrl();
         federatedVirusScanParams.getClientId();
         federatedVirusScanParams.getClientSecret();
         federatedVirusScanParams.getDisabled();
         federatedVirusScanParams.getScanUrl();
         federatedVirusScanParams.getSpaceId();
    }

}
