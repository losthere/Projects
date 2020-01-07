package com.optum.gcm.imagerepo;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import com.documentum.fc.client.DfClient;
import com.documentum.fc.client.DfServiceException;
import com.documentum.fc.client.IDfClient;
import com.documentum.fc.client.IDfSession;
import com.documentum.fc.client.IDfSessionManager;
import com.documentum.fc.common.DfException;
import com.documentum.fc.common.IDfLoginInfo;
import com.optum.gcm.exception.ServiceException;

@RunWith(PowerMockRunner.class)
@PrepareForTest({com.documentum.fc.tools.RegistryPasswordUtils.class})
public class DFCConfigurationTest {
	 
	@InjectMocks
	DFCConfiguration dFCConfiguration;
	
	@Mock
	IDfClient client;
	
	@Mock
	IDfLoginInfo iDfLoginInfo;
	
	@Mock
	IDfSessionManager iDfSessionManager;

	@Mock 
	IDfSession iDfSession;
	
	@Mock
	IDfSession iDfSessionNull;
	
	@Mock
	BaseService baseService;
	
	DFCConfiguration dFCConfiguration1;
	    @Before
	    public void setUp() {
	        dFCConfiguration1 = PowerMockito.spy(new DFCConfiguration());
	    }
	
	 @PostConstruct
	  public void init() throws Exception {
	    client = new DfClient();
	  }
	 
	@Test
	public void testSetHEADER_USERNAME()
	{
		dFCConfiguration.setHEADER_USERNAME("test");
		assertEquals("test",dFCConfiguration.getHEADER_USERNAME());
	} 
	
	@Test
	public void testGetHEADER_USERNAME()
	{
		dFCConfiguration.setHEADER_USERNAME("test");
		assertEquals("test",dFCConfiguration.getHEADER_USERNAME());
	}
	
	@Test
	 public void testGetHEADER_SMSESSION() {
	    dFCConfiguration.setHEADER_SMSESSION("session1");
		assertEquals("session1",dFCConfiguration.getHEADER_SMSESSION());
    }
	

	@Test
	 public void testSetHEADER_SMSESSION() {
	    dFCConfiguration.setHEADER_SMSESSION("session1");
		assertEquals("session1",dFCConfiguration.getHEADER_SMSESSION());
    }

	@Test
	public void testSetContentTransformationProfile() {
		  dFCConfiguration.setContentTransformationProfile("contentTransformation");
	
	}
	
    @Test
	public void testGetContentTransformationProfile() {
    	dFCConfiguration.setContentTransformationProfile("contentTransformation");
		assertEquals("contentTransformation", dFCConfiguration.getContentTransformationProfile());
	}  
    
      @Test
  	public void testSetRepository() {
  		  dFCConfiguration.setRepository("repo");
  	}
  	
      @Test
  	public void testGetRepository() {
      	dFCConfiguration.setRepository("repo");
  		assertEquals("repo", dFCConfiguration.getRepository());
  	}  
    
 	@Test
	  public void testSetPassword() {
    	dFCConfiguration.setPassword("repo");
     }
    	  	
    @Test
    public void testGetPassword() {
      	dFCConfiguration.setPassword("repo");
    	assertEquals("repo", dFCConfiguration.getPassword());
    }  
    
    @Test
	  public void testSetUsername() {
  	dFCConfiguration.setUsername("uname");
   }
    
	  @Test
	  public void testGetUsername() {
	    	dFCConfiguration.setUsername("repo");
	  	assertEquals("repo", dFCConfiguration.getUsername());
	  }  
	  
	 @Test
	  public void testGetSessionManager() throws Exception
	  {	
		  when(client.newSessionManager()).thenReturn(iDfSessionManager); 
		  IDfSessionManager actualVal = dFCConfiguration.getSessionManager();
		  dFCConfiguration.setUsername("user_name");
		  dFCConfiguration.setPassword("password");
		  IDfSessionManager actualValwithCred = dFCConfiguration.getSessionManager();
		  assertNotNull(actualVal);
		  assertNotNull(actualValwithCred);
	  }
	  
	  @Test
	  public void testGetIdfSessionManager() {
	  	assertEquals(iDfSessionManager, dFCConfiguration.getIdfSessionManager());
	  }  
	  
	  @Test 
	  public void testGetSession() throws Exception{
		  when(iDfSessionManager.getSession("test")).thenReturn(iDfSession);
		  IDfSession actualVal = iDfSessionManager.getSession("test");
		  assertNotNull(actualVal);
	  }
	
	  @Test
	  public void testReleaseSession() throws Exception{		  
	  	dFCConfiguration.releaseSession(iDfSession);
	  }
	  @Test
	  public void testReleaseSession1() throws Exception{
	  	dFCConfiguration.releaseSession(null);
	  }
	  
      @Test(expected=DfServiceException.class)
	  public void getDFCSessionValid() throws Exception {
		  	assertNotNull(dFCConfiguration1);
		  	when(client.newSessionManager()).thenReturn(iDfSessionManager);
		   	when(iDfSessionManager.hasIdentity(anyString())).thenReturn(true); 
		   	when(iDfSessionManager.getSession("repository")).thenReturn(iDfSession);
			  String[] username = {"user_name"};
			  List<String> value = Arrays.asList(username);
			  
			  String[] headersmsession = {"header_smsession"};
			  List<String> value1 = Arrays.asList(headersmsession);
		   	Map<String, List<String>> httpHeaders = new HashMap<>();
		   	httpHeaders.put("HEADER_USERNAME", value);
		   	httpHeaders.put("HEADER_SMSESSION", value1);
		   	dFCConfiguration1.setRepository("repository");
		   	dFCConfiguration1.setHEADER_USERNAME("HEADER_USERNAME");
		   	dFCConfiguration1.setHEADER_SMSESSION("HEADER_SMSESSION");
		   	dFCConfiguration1.getDFCSession(httpHeaders);
		   	PowerMockito.doReturn(iDfSession).when(dFCConfiguration1, "createDFCSession","user","pwd");
		   	assertNotNull(iDfSession);
		  }
      
      @Test(expected=ServiceException.class)
	  public void getDFCSessionThrowException() throws Exception {
		  	assertNotNull(dFCConfiguration1);
		  	when(client.newSessionManager()).thenReturn(iDfSessionManager);
		   	when(iDfSessionManager.hasIdentity(anyString())).thenReturn(false);
	        
	        
		   	Map<String, List<String>> httpHeaders = baseService.getHTTPHeaders();	
		   	IDfSession actualVal = dFCConfiguration1.getDFCSession(httpHeaders);
		   	PowerMockito.doReturn(iDfSession).when(dFCConfiguration1, "createDFCSession","user","pwd");
		   	assertNotNull(actualVal);
		  }
      
      @Test
      public void setPasswordTest() throws DfException {
    	  PowerMockito.mockStatic(com.documentum.fc.tools.RegistryPasswordUtils.class);
    	  PowerMockito.when(com.documentum.fc.tools.RegistryPasswordUtils.encrypt("test")).thenReturn("te12st");
    	  dFCConfiguration.setPassword("test");
      }
      
      @Test
      public void getSessionTest( ) throws Exception {
    	  DFCConfiguration dfc = new DFCConfiguration();
    	  dFCConfiguration.getSession();
      }
}
