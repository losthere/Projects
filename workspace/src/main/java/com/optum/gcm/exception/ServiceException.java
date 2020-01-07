/**
 * 
 */
package com.optum.gcm.exception;

import javax.xml.ws.WebFault;

/**
 * @author 189833
 * 
 */
@WebFault(name = "ServiceException", targetNamespace = "http://gcm.optum.com/imagerepo/services")
public class ServiceException extends RuntimeException {

  /**
     * 
     */
  private static final long serialVersionUID = 1L;

  private ServiceFault      faultInfo;

  public ServiceException() {
    super();
  }

  public ServiceException(ServiceFaultEnum serviceFaultEnum) {
    super();
    this.faultInfo = new ServiceFault(serviceFaultEnum.name(), serviceFaultEnum.getErrorMsg());
  }

  public ServiceException(Throwable cause, ServiceFaultEnum serviceFaultEnum) {
    super(cause);
    this.faultInfo = new ServiceFault(serviceFaultEnum.name(), serviceFaultEnum.getErrorMsg());
  }

  public ServiceException(ServiceFaultEnum serviceFaultEnum, Object... params) {
    super(serviceFaultEnum.formatMessage(params));
    this.faultInfo =
        new ServiceFault(serviceFaultEnum.name(), serviceFaultEnum.formatMessage(params));
  }

  public ServiceException(Throwable cause, ServiceFaultEnum serviceFaultEnum, Object... params) {
    super(cause);
    this.faultInfo =
        new ServiceFault(serviceFaultEnum.name(), serviceFaultEnum.formatMessage(params));
  }

  public ServiceException(String message) {
    super(message);
  }

  public ServiceException(String message, Throwable cause) {
    super(message, cause);
  }

  public ServiceException(String message, ServiceFault faultInfo) {
    super(message);
    this.faultInfo = faultInfo;
  }

  public ServiceException(String message, ServiceFault faultInfo, Throwable cause) {
    super(message, cause);
    this.faultInfo = faultInfo;
  }

  public ServiceFault getFaultInfo() {
    return this.faultInfo;
  }

  public void setFaultInfo(ServiceFault faultInfo) {
    this.faultInfo = faultInfo;
  }

}
