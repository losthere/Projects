package com.optum.gcm.common.sevice;



import static org.junit.Assert.assertTrue;

import java.util.HashMap;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class UserAuthorizationServiceTest {
	private static final String QUERY_AUTHORIZED_USER = "SELECT count(1) IS_AUTHORIZED FROM GCM_USER_REST_SVC_VW where upper(userid)=:USERID and upper(gcm_rest_resource)= :GCM_REST_RESOURCE";


	@InjectMocks
	UserAuthorizationService userAuthorizationService;
	
	@Mock
	public CommonJpaService commonJpaService;
	
	
	
	 
	@SuppressWarnings("unchecked")
	@Test
	public void testUserAuthorizationService1() {
		
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.anyObject())).thenReturn(0).thenReturn(1);
		userAuthorizationService.isAuthorizedUser("TEST", "TEST");
		
		
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testUserAuthorizationService2() {
		
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.anyObject())).thenReturn(1);
		userAuthorizationService.isAuthorizedUser("TEST", "TEST");
		
		
	}
	
}
