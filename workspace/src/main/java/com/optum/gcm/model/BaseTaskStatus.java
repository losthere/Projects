/**
 * 
 */
package com.optum.gcm.model;

import java.util.HashMap;
import java.util.Map;

import com.optum.gcm.constants.GCMConstants.TaskStatus;

/**
 * @author agadiraj
 *
 */
public abstract class BaseTaskStatus {

  protected String                      fileName;
  protected TaskStatus                  taskStatus;
  protected Map<ITaskErrorEnum, String> errorMessageMap = new HashMap<ITaskErrorEnum, String>();

  /**
   * @return the fileName
   */
  public String getFileName() {
    return fileName;
  }

  /**
   * @param fileName the fileName to set
   */
  public void setFileName(String fileName) {
    this.fileName = fileName;
  }

  /**
   * @return the taskStatus
   */
  public TaskStatus getTaskStatus() {
    return taskStatus;
  }

  /**
   * @param taskStatus the taskStatus to set
   */
  public void setTaskStatus(TaskStatus taskStatus) {
    this.taskStatus = taskStatus;
  }

  /**
   * @return the errorMessageMap
   */
  public Map<ITaskErrorEnum, String> getErrorMessageMap() {
    return errorMessageMap;
  }

  /**
   * @param errorMessageMap the errorMessageMap to set
   */
  public void setErrorMessageMap(Map<ITaskErrorEnum, String> errorMessageMap) {
    this.errorMessageMap = errorMessageMap;
  }

  public boolean hasErrors() {
    return errorMessageMap.size() > 0;

  }

}
