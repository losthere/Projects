/**
 * 
 */
package com.optum.gcm.exception;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * @author 189833
 * 
 */
@XmlRootElement(namespace = "http://gcm.optum.com/imagerepo/services")
public class ServiceFault implements Serializable{

	private static final long serialVersionUID = 1L;
	
  /** * Fault Code */
  private String faultCode;
  /** * Fault String */
  private String faultString;

  /** * @return the faultCode */
  public String getFaultCode() {
    return this.faultCode;
  }

  /** * @param faultCode the faultCode to set */
  public void setFaultCode(String faultCode) {
    this.faultCode = faultCode;
  }

  /** * @return the faultString */
  public String getFaultString() {
    return this.faultString;
  }

  /** * @param faultString the faultString to set */
  public void setFaultString(String faultString) {
    this.faultString = faultString;
  }

  public ServiceFault() {

  }

  /**
   * @param faultCode
   * @param faultString
   */
  public ServiceFault(String faultCode, String faultString) {
    super();
    this.faultCode = faultCode;
    this.faultString = faultString;
  }
}
