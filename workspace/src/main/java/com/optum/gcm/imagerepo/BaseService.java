/**
 * 
 */
package com.optum.gcm.imagerepo;

import static com.optum.gcm.dao.constants.ChartLoadQueryConstants.QUERY_DOCUMENTUM_DOCUMENT;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.xml.ws.WebServiceContext;
import javax.xml.ws.handler.MessageContext;

import org.apache.commons.lang3.text.StrSubstitutor;
import org.apache.cxf.transport.http.AbstractHTTPDestination;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.documentum.fc.client.IDfPersistentObject;
import com.documentum.fc.client.IDfSession;
import com.documentum.fc.common.DfException;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.constants.GCMConstants;
import com.optum.gcm.constants.GCMConstants.DMACLNames;
import com.optum.gcm.exception.ServiceException;
import com.optum.gcm.exception.ServiceFaultEnum;
import com.optum.gcm.model.ImageAttributes;

/**
 * @author 189833
 * 
 */
public class BaseService {

  protected static final String QUERY_GET_DOC_GROUP = "select HPP.DOCUMENTUM_GROUP from GCM_HP hp, GCM_HP_PRODUCT hpp, GCM_CLIENT cl where hp.GCM_HP_KEY = hpp.gcm_hp_key AND "
      + "CL.GCM_CLIENT_KEY = HP.GCM_CLIENT_KEY and hp.hp_cd = :hpCd and GCM_HP_PRODUCT = :hpProduct and CL.GCM_CLIENT_CD = :clientCd";
  
  private static final Logger LOG = LoggerFactory.getLogger(BaseService.class);

  protected WebServiceContext webServiceContext;

  @Autowired
  protected DFCConfiguration  dfcConfiguration;

  @Autowired
  protected DFCHelper         dfcHelper;

  @Autowired
  protected CommonJpaService commonJpaService;
  

  @SuppressWarnings("unchecked")
  protected Map<String, List<String>> getHTTPHeaders() {
    MessageContext mctx = webServiceContext.getMessageContext();
    return (Map<String, List<String>>) mctx.get(MessageContext.HTTP_REQUEST_HEADERS);
  }

  protected HttpServletRequest getHttpServletRequest() {
    MessageContext mctx = webServiceContext.getMessageContext();
    return (HttpServletRequest) mctx.get(AbstractHTTPDestination.HTTP_REQUEST);
  }

  protected IDfSession getDFCSession() {
    try {
      Map<String, List<String>> httpHeaders = getHTTPHeaders();
      return dfcConfiguration.getDFCSession(httpHeaders);
    } catch (Exception e) {
      LOG.error("Exception occurred in obtaining DFC Session ", e);
      throw new ServiceException(ServiceFaultEnum.ERROR_1002);
    }
  }

  protected void releaseSession(IDfSession session) {
    dfcConfiguration.releaseSession(session);
  }

  /**
   * @return the webServiceContext
   */
  public WebServiceContext getWebServiceContext() {
    return webServiceContext;
  }

  @Resource
  public void setWebServiceContext(WebServiceContext webServiceContext) {
    this.webServiceContext = webServiceContext;
  }

  /**
   * Get the ACL name for the document form the folder
   * 
   * @param imageAttributes
   * @return
   * @throws Exception
   */
  protected String getACLName(ImageAttributes imageAttributes) throws IOException {
    StringBuffer aclName = new StringBuffer();
    if (imageAttributes != null) {
      Map<String, Object> params = new HashMap<String, Object>();
      params.put("hpCd", imageAttributes.getHpCd());
      params.put("hpProduct", imageAttributes.getHpProduct());
      params.put("clientCd", imageAttributes.getClientCd());
      String aclname = commonJpaService.getResultObject(QUERY_GET_DOC_GROUP, params, String.class);
      aclName.append(aclname).append(GCMConstants.DMObjectTypeConstants.ACL_SUFFIX);
    } else {
      aclName.append(DMACLNames.GCM_COMMERCIAL_ACL);
    }
    return aclName.toString().toLowerCase(Locale.ENGLISH);
  }
  
  protected IDfPersistentObject getDocumentumDocument(IDfSession session, String barcode,
      String format) throws DfException {
    Map<String, String> valueMap = new HashMap<>();
    valueMap.put("BARCODE", barcode);
    valueMap.put("FORMAT", format);
    return session
        .getObjectByQualification(StrSubstitutor.replace(QUERY_DOCUMENTUM_DOCUMENT, valueMap));
  }

}
