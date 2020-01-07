/**
 * 
 */
package com.optum.gcm.exception;

import java.text.MessageFormat;

/**
 * @author 189833
 * 
 */
public enum ServiceFaultEnum {

    ERROR_1001("The service request doesn't have credentials. Please provide credentials to invoke the services"),
    ERROR_1002("Authentication failed due to invalid/incorrect credentials. Please provide valid credentials to invoke the services"),
    ERROR_0001("Internal Server Error. Please contact the support team"),
    ERROR_0002("The Documentum Objcet Id or Emerald Request Id is required to invoke the operation"),
    ERROR_0003("There is no object exists in the repository with the given identifier {0}"),
    ERROR_0004("Cannot acquire lock on the document as the document is already locked by {0}"),
    ERROR_0005("The user with the login id {0} does not exists in the repository. Please check the user details"),
    ERROR_0006("The user with the login id {0} already exists in the repository. Please check the user details"),
    ERROR_0007("The group with the name {0} does not exists in the repository. Please check the user details"),
    ERROR_0008("Error occurred in performing matching logic for the reason {0}"),
    ERROR_0009("GCM Business Function Key is NULL"),
    ERROR_0010("Invalid GCM Business Function Key"),
    ERROR_0011("No Previous Matching Logic Run for the content key {0} "),
    ERROR_0012("Error occurred in finding the last successful Matching Logic for the content key {0}"),
    ERROR_0013("No Inventory is available after performing matching logic for the content key {0}"),
    ERROR_0014("The Dx Code {0} you entered maps to the same HCC you are validating. Update Dx Code entry or select a different validation option."),
    ERROR_0015("The Dx Code {0} you entered does not map to the HCC within the hierarchy. Update Dx Code entry or select a different validation option."),
    ERROR_0016("The Dx Code {0} you entered does not map to the same HCC"),
    ERROR_0017("The Dx Code {0} you entered does not map to a HCC model. Update Dx Code entry "),
    ERROR_0018("The DOS you entered does not fall within the {0} Member Eligibility Year"),
    ERROR_0019("Error occurred in validating the DoS against the Member Eligibility Period"),
    ERROR_0020("The DOS entered does not fall within the Member Eligibility Period(s) {0}."),
    ERROR_0021("GCM Proj Content Key is NULL"),
    ERROR_0022("The Chart does not have any Claims matched to the Encounter DoS and Rendering Providers "),
    ERROR_0023("The Dx Code {0} you entered does not match either the gender or age of the member on the chart. Please correct the Dx code"),
    ERROR_0024("Health Plan is a required Parameter"),
    ERROR_0025("Health Plan Product is a required Parameter"),
    ERROR_0026("{0} ACL already axists in the repository"),
    ERROR_0027(""),
    ERROR_0028(""),
    ERROR_0029(""),
    ERROR_0030(""),
    ERROR_0031("Group is a required Parameter");

  private String errorMsg;

  private ServiceFaultEnum(String errorMsg) {
    this.errorMsg = errorMsg;
  }

  /**
   * @return the errorMsg
   */
  public String getErrorMsg() {
    return this.errorMsg;
  }

  /**
   * @param errorMsg the errorMsg to set
   */
  public void setErrorMsg(String errorMsg) {
    this.errorMsg = errorMsg;
  }

  public String formatMessage(Object... params) {
    return MessageFormat.format(this.errorMsg, params);
  }
}
