package com.optum.gcm.imagerepo;

import static org.junit.Assert.*;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.security.Principal;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.Servlet;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.xml.ws.EndpointReference;
import javax.xml.ws.WebServiceContext;
import javax.xml.ws.handler.MessageContext;

import org.apache.commons.lang3.text.StrSubstitutor;
import org.apache.cxf.transport.http.AbstractHTTPDestination;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.w3c.dom.Element;

import com.documentum.fc.client.IDfPersistentObject;
import com.documentum.fc.client.IDfSession;
import com.documentum.fc.common.DfException;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.constants.GCMConstants;
import com.optum.gcm.constants.GCMConstants.DMACLNames;
import com.optum.gcm.exception.ServiceException;
import com.optum.gcm.model.ImageAttributes;

@RunWith(PowerMockRunner.class)
public class BaseServiceTest {
	
	  @InjectMocks@Spy
	  BaseService baseService = new BaseService();
		
	  @Mock 
	  WebServiceContext webServiceContext;

	  @Mock
	  DFCConfiguration dfcConfiguration;

	  @Mock
	  DFCHelper dfcHelper;
	  
	  @Mock
	  MessageContext mctx;
	  
	  @Mock
	  HttpServletRequest httpServletRequest;
	  
	  @Mock
	  IDfSession iDfSession;
	  
	  @Mock
	  ImageAttributes imageAttributes;
	  
	  @Mock
	  ImageAttributes imageAttributes1;
	  
	  @Mock
	  CommonJpaService commonJpaService;
	  
	  @Mock
	  IDfPersistentObject iDfPersistentObject;
	  
	  @Test
	  public void testGetHTTPHeaders() throws Exception{
		  when(webServiceContext.getMessageContext()).thenReturn(mctx);
		  Map<String, List<String>> test = new HashMap<>();
		  String[] vowels = {"a","e","i","o","u"};
		  List<String> value = Arrays.asList(vowels);
		  test.put("a", value);
		  
		  Mockito.when(mctx.get(MessageContext.HTTP_REQUEST_HEADERS)).thenReturn(test);
		  Map<String, List<String>> actualVal = baseService.getHTTPHeaders();
		  assertNotNull(actualVal);
	  } 
	   
	  @Test
	  public void testGetHttpServletRequest() throws Exception{
		  HttpServletRequest actualVal = null;
		  when(webServiceContext.getMessageContext()).thenReturn(mctx);
		  Mockito.when(mctx.get(AbstractHTTPDestination.HTTP_REQUEST)).thenReturn(httpServletRequest);
		  actualVal= baseService.getHttpServletRequest();
		  assertNotNull(actualVal);
	  }
	  
	  @Test   
	  public void testGetDFCSession() throws Exception { 
		  baseService.setWebServiceContext(webServiceContext);
		  when(webServiceContext.getMessageContext()).thenReturn(mctx);
		  IDfSession actualVal = null;
		  
		  Map<String, List<String>> httpHeaders = baseService.getHTTPHeaders();
		  
		  
		  when(dfcConfiguration.getDFCSession(httpHeaders)).thenReturn(iDfSession);
		  actualVal = baseService.getDFCSession();
		  assertNotNull(actualVal); 
 	  } 
	  
	 @Test(expected=Exception.class)
	  public void testGetDFCSessionWithException() throws Exception { 
		  baseService.setWebServiceContext(webServiceContext);
		  Map<String, List<String>> httpHeaders = new HashMap<String,List<String>>();	
		  httpHeaders.put("HEADER_USERNAME", null);
		  when(dfcConfiguration.getDFCSession(httpHeaders)).thenReturn(iDfSession);
		  baseService.getDFCSession();		  
 	  }
	  
	  @Test 
	  public void testReleaseSession() throws Exception {
		  doNothing().when(dfcConfiguration).releaseSession(iDfSession);
		  baseService.releaseSession(iDfSession);
 	  } 
	 
	  @Test
	  public void testGetWebServiceContext() {
		  baseService.setWebServiceContext(webServiceContext);
		  assertEquals(baseService.getWebServiceContext(),webServiceContext);
		}
	  
	  @Test
	  public void testSetWebServiceContext() {
		  baseService.setWebServiceContext(webServiceContext);
		}
	   
	  @Test
	  public void testgetACLName() throws Exception {
		  String QUERY_GET_DOC_GROUP = "select HPP.DOCUMENTUM_GROUP from GCM_HP hp, GCM_HP_PRODUCT hpp, GCM_CLIENT cl where hp.GCM_HP_KEY = hpp.gcm_hp_key AND "
			      + "CL.GCM_CLIENT_KEY = HP.GCM_CLIENT_KEY and hp.hp_cd = :hpCd and GCM_HP_PRODUCT = :hpProduct and CL.GCM_CLIENT_CD = :clientCd";
		  
		  String aclName=baseService.getACLName(imageAttributes);
		  assertNotNull(aclName);		 
		  
		  Map<String, Object> params = new HashMap<String, Object>();
	      params.put("hpCd", "hpCd1");
	      params.put("hpProduct","hpProduct1");
	      params.put("clientCd", "clientCd1"); 
	      when(commonJpaService.getResultObject(QUERY_GET_DOC_GROUP,params, String.class)).thenReturn("success");
	      aclName = null;
	      imageAttributes = null;
	      aclName = baseService.getACLName(imageAttributes);
	      assertNotNull(aclName);
		}
	  
	  @Test
	  public void getDocumentumDocument() throws DfException {
		  	assertNotNull(iDfPersistentObject);
		    when(iDfSession.getObjectByQualification(anyString())).thenReturn(iDfPersistentObject);
		    IDfPersistentObject actualVal = baseService.getDocumentumDocument(iDfSession, "barcode", "format");
		    assertNotNull(actualVal);
		  }

}

