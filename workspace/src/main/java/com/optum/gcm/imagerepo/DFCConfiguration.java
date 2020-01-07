/**
 * 
 */
package com.optum.gcm.imagerepo;

import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.documentum.fc.client.DfClient;
import com.documentum.fc.client.DfServiceException;
import com.documentum.fc.client.IDfClient;
import com.documentum.fc.client.IDfSession;
import com.documentum.fc.client.IDfSessionManager;
import com.documentum.fc.common.DfException;
import com.documentum.fc.common.DfLoginInfo;
import com.documentum.fc.common.IDfLoginInfo;
import com.optum.gcm.exception.ServiceException;
import com.optum.gcm.exception.ServiceFaultEnum;

/**
 * 
 * @author 189833
 * 
 */
@Component
@Lazy
public class DFCConfiguration {

  private static final Logger LOG = LoggerFactory.getLogger(DFCConfiguration.class);

  private String              username;

  private String              password;

  private String              repository;

  @Value("${com.optum.security.header.username}")
  private String              HEADER_USERNAME;

  /**
   * @return the hEADER_USERNAME
   */
  public String getHEADER_USERNAME() {
    return HEADER_USERNAME;
  }

  /**
   * @param hEADER_USERNAME the hEADER_USERNAME to set
   */
  public void setHEADER_USERNAME(String hEADER_USERNAME) {
    HEADER_USERNAME = hEADER_USERNAME;
  }

  /**
   * @return the hEADER_SMSESSION
   */
  public String getHEADER_SMSESSION() {
    return HEADER_SMSESSION;
  }

  /**
   * @param hEADER_SMSESSION the hEADER_SMSESSION to set
   */
  public void setHEADER_SMSESSION(String hEADER_SMSESSION) {
    HEADER_SMSESSION = hEADER_SMSESSION;
  }

  @Value("${com.optum.security.header.session}")
  private String            HEADER_SMSESSION;

  @Value("${transformation.profile.name}")
  private String            contentTransformationProfile;

  private IDfClient         client;

  private IDfSessionManager idfSessionManager;

  public DFCConfiguration() {}

  @PostConstruct
  public void init() throws Exception {
    client = new DfClient();
    idfSessionManager = client.newSessionManager();
    releaseSession(createDFCSession(getUsername(), getPassword()));
  }

  public IDfSession getDFCSession(Map<String, List<String>> httpHeaders) throws Exception {
    if (client == null) {
      client = new DfClient();
    }
    if (idfSessionManager == null) {
      idfSessionManager = client.newSessionManager();
    }
    if (httpHeaders.get(HEADER_USERNAME) == null || httpHeaders.get(HEADER_USERNAME).isEmpty()
        || httpHeaders.get(HEADER_SMSESSION) == null || httpHeaders.get(HEADER_SMSESSION).isEmpty()) {
      LOG.error("Credentials are not passed to obtain DFC Session ");
      throw new ServiceException(ServiceFaultEnum.ERROR_1001);
    }

    String smusername = StringUtils.join(httpHeaders.get(HEADER_USERNAME).toArray());
    String smsession = StringUtils.join(httpHeaders.get(HEADER_SMSESSION).toArray());

    try {
      smsession = com.documentum.fc.tools.RegistryPasswordUtils.decrypt(smsession);
    } catch (DfException e) {
    	LOG.error("Exception while getting smsession ", e);}
    LOG.info("USERNAME ===>" + smusername + "SMSESSION====>" + smsession);
    return createDFCSession(smusername, smsession);
  }

  private IDfSession createDFCSession(String user, String pwd) throws DfException {
    IDfLoginInfo login = new DfLoginInfo();
    login.setUser(user);
    login.setPassword(pwd);
    LOG.info("The repository for which session is created is " + repository);
    if (idfSessionManager.hasIdentity(repository)) {
      LOG.debug("[DFC_SESSION_DUPLICATE_IDENTITY] An identity is already defined for docbase "
          + repository);
      idfSessionManager.clearIdentity(repository);
    }

    idfSessionManager.setIdentity(repository, login);
    return idfSessionManager.getSession(repository);
  }

  public void releaseSession(IDfSession idfSession) {
    try {
      if (idfSession != null && idfSessionManager != null) {
        idfSessionManager.release(idfSession);
        LOG.info("DOCUMENTUM SESSION RELEASED SUCCESSFULLY");
      }
    } catch (Exception e) {
      LOG.error("ERROR OCCURRED IN RELEASING DFC SESSION ", e);
    }
  }

  public IDfSession getSession() throws Exception {
    return idfSessionManager.getSession(repository);
  }

  public IDfSessionManager getIdfSessionManager() {
    return idfSessionManager;
  }

  public IDfSessionManager getSessionManager() {
    IDfSessionManager sessionManager = client.newSessionManager();
    try {
      if (StringUtils.isNotBlank(username) && StringUtils.isNotBlank(password)) {
        IDfLoginInfo login = new DfLoginInfo();
        login.setUser(username);
        login.setPassword(password);
        sessionManager.setIdentity(repository, login);
      } else {
        LOG.warn("Credentials are not passed. User Name / Password is null....");
      }
    } catch (DfServiceException e) {
      LOG.error("Exception occured while creating Session Manager: ", e);
    }
    return sessionManager;
  }

  /**
   * @return the username
   */
  public String getUsername() {
    return username;
  }

  /**
   * @param username the username to set
   */
  @Value("${com.optum.security.repo.username}")
  public void setUsername(String username) {
    this.username = username;
  }

  /**
   * @return the password
   */
  public String getPassword() {
    return password;
  }

  /**
   * @param password the password to set
   */
  @Value("${com.optum.security.repo.pwd}")
  public void setPassword(String password) {
    try {
    	this.password = com.documentum.fc.tools.RegistryPasswordUtils.decrypt(password);
    } catch (DfException e) {
    	this.password = password;
    }
  }

  /**
   * @return the repository
   */
  public String getRepository() {
    return repository;
  }

  /**
   * @param repository the repository to set
   */
  @Value("${gcm.repository}")
  public void setRepository(String repository) {
    this.repository = repository;
  }

  /**
   * @return the contentTransformationProfile
   */
  public String getContentTransformationProfile() {
    return contentTransformationProfile;
  }

  /**
   * @param contentTransformationProfile the contentTransformationProfile to set
   */
  public void setContentTransformationProfile(String contentTransformationProfile) {
    this.contentTransformationProfile = contentTransformationProfile;
  }
}
