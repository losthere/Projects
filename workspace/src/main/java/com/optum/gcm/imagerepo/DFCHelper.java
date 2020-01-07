/**
 * 
 */
package com.optum.gcm.imagerepo;

import java.io.File;
import java.text.SimpleDateFormat;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.documentum.fc.client.IDfACL;
import com.documentum.fc.client.IDfDocument;
import com.documentum.fc.client.IDfFolder;
import com.documentum.fc.client.IDfSession;
import com.documentum.fc.common.DfException;
import com.optum.gcm.constants.GCMConstants;
import com.optum.gcm.constants.GCMConstants.DMDocumentTypeEnum;
import com.optum.gcm.constants.GCMConstants.DMObjectAttributeConstants;
import com.optum.gcm.constants.GCMConstants.DMObjectTypeConstants;
import com.optum.gcm.constants.GCMConstants.IngestionJobContants;
import com.optum.gcm.constants.GCMConstants.TaskStatus;
import com.optum.gcm.model.BaseTaskStatus;
import com.optum.gcm.model.IngestionTaskErrorEnum;

/**
 * @author 189833
 * 
 */
@Component
@Lazy
public class DFCHelper {

  private static final Logger           LOG = LoggerFactory.getLogger(DFCHelper.class);

  @Value("${gcm.docBaseOwner}")
  private String                        docBaseOwner;

  //Commenting out below line of code to fix the Sonar critical issue. sdf reference was not in use across source code.
  //private static final SimpleDateFormat sdf = SafeSimpleDateFormat.getDateFormatter();

  // create folder in documentum
  public IDfFolder createFolder(IDfSession dfcSession, String path, String aclName,
      BaseTaskStatus taskStatus) {
    IDfFolder folder = null;
    boolean folderExists = false;
    try {
      synchronized (this) {
        folder = (IDfFolder) dfcSession.getObjectByQualification(getFolderQualificationDQL(path));
        if (folder == null) {
          LOG.debug("Folder Not Exists " + path);

          // split path into separate folders
          String[] dirs = path.split(IngestionJobContants.FOLDER_SEPERATOR);

          // loop through path folders and build
          String dm_path = "";
          for (int i = 0; i < dirs.length; i++) {

            if (dirs[i].length() > 0) {

              // build up path
              dm_path = dm_path + IngestionJobContants.FOLDER_SEPERATOR + dirs[i];

              // see if this path exists
              IDfFolder testFolder =
                  (IDfFolder) dfcSession
                      .getObjectByQualification(getFolderQualificationDQL(dm_path));
              if (null == testFolder) {

                // check if a cabinet need to be made
                if (dm_path.equalsIgnoreCase("/" + dirs[i])) {
                  IDfFolder cab =
                      (IDfFolder) dfcSession
                          .getObjectByQualification("dm_cabinet where object_name='" + dirs[i]
                              + "'");
                  if (cab == null) {
                    cab = (IDfFolder) dfcSession.newObject("dm_cabinet");
                    cab.setObjectName(dirs[i]);
                    cab.setACLName("gcm_year");
                    cab.setACLDomain(docBaseOwner);
                    cab.save();
                  }

                } else {// else make a folder
                  folder =
                      (IDfFolder) dfcSession
                          .getObjectByQualification(getFolderQualificationDQL(dm_path));
                  if (folder == null) {
                    folderExists = false;
                    folder = (IDfFolder) dfcSession.newObject("dm_folder");
                    folder.setObjectName(dirs[i]);
                    // link it to parent
                    String parent_path = "";
                    for (int j = 0; j < i; j++) {
                      if (dirs[j].length() > 0) {
                        parent_path = parent_path + IngestionJobContants.FOLDER_SEPERATOR + dirs[j];
                      }
                    }
                    folder.link(parent_path);
                    folder.save();
                    LOG.debug("Folder created ");
                  } else {
                    folderExists = true;
                  }
                }
              }
            }
          }
        } else {
          folderExists = true;
          LOG.debug("Folder Exists " + path);
        }
        if (!folderExists) {
          folder = (IDfFolder) dfcSession.getObjectByQualification(getFolderQualificationDQL(path));
          if (folder != null && !aclName.equalsIgnoreCase(folder.getACLName())) {
            IDfACL acl = getACL(dfcSession, aclName, path, taskStatus);
            if (acl != null) {
              folder.setACL(acl);
              folder.setACLDomain(docBaseOwner);
              folder.save();
              LOG.debug("Successfully applied the ACL " + aclName + " on the folder " + path);
            } else {
              LOG.debug(IngestionTaskErrorEnum.ACL_DOES_NOT_EXISTS.formatMessage(aclName));
              taskStatus.getErrorMessageMap().put(IngestionTaskErrorEnum.ACL_DOES_NOT_EXISTS,
                  IngestionTaskErrorEnum.ACL_DOES_NOT_EXISTS.formatMessage(aclName));
              taskStatus.setTaskStatus(TaskStatus.FAILURE);
            }
          } else if (folder == null) {
            LOG.info("Fodler" + path + " not created successfully");
            taskStatus.getErrorMessageMap().put(
                IngestionTaskErrorEnum.FOLDER_CREATION_ERROR,
                IngestionTaskErrorEnum.FOLDER_CREATION_ERROR.formatMessage(path,
                    "Folder not created for the path " + path));
            taskStatus.setTaskStatus(TaskStatus.FAILURE);
          }
        }
      }
    } catch (Exception e) {
      LOG.error("Exception occurred while creating folder " + path, e);
      taskStatus.getErrorMessageMap()
          .put(
              IngestionTaskErrorEnum.FOLDER_CREATION_ERROR,
              IngestionTaskErrorEnum.FOLDER_CREATION_ERROR.formatMessage(path,
                  e.getLocalizedMessage()));
      taskStatus.setTaskStatus(TaskStatus.FAILURE);
    }
    return folder;
  }

  /**
   * 
   * @param dfcSession
   * @param aclName
   * @param path
   * @param taskStatus
   * @return
   */
  public IDfACL getACL(IDfSession dfcSession, String aclNameParam, String path,
      BaseTaskStatus taskStatus) {
    IDfACL acl = null;
    String aclName = null;
    try {
      aclName = aclNameParam.toLowerCase();
      LOG.info("ACL name is ===>" + aclName);
      acl =
          (IDfACL) dfcSession.getObjectByQualification("dm_acl where object_name='" + aclName
              + "' ");
      if (acl == null) {
        LOG.info("ACL does not exists ====>" + aclName);
        taskStatus.getErrorMessageMap().put(IngestionTaskErrorEnum.ACL_DOES_NOT_EXISTS,
            IngestionTaskErrorEnum.ACL_DOES_NOT_EXISTS.formatMessage(aclName));
      }
    } catch (Exception e) {
      LOG.error("Exception occurred while applying ACL " + aclName, e);
      taskStatus.getErrorMessageMap().put(
          IngestionTaskErrorEnum.APPLY_ACL_ERROR,
          IngestionTaskErrorEnum.APPLY_ACL_ERROR.formatMessage(aclName, path,
              e.getLocalizedMessage()));
      taskStatus.setTaskStatus(TaskStatus.FAILURE);
    }
    return acl;
  }

  /**
   * 
   * @param dfcSession
   * @param file
   * @param busFuncName
   * @param format
   * @return
   * @throws DfException
   */
  public IDfDocument createDocument(IDfSession dfcSession, File file, String busFuncName,
      String format) throws DfException {
    IDfDocument document = (IDfDocument) dfcSession.newObject(DMObjectTypeConstants.GCM_DOCUMENT);

    document.setObjectName(getBarcodeByFileName(file.getName(), busFuncName));
    document.setTitle(file.getName());
    document
        .setString(DMObjectAttributeConstants.DOCUMENT_TYPE, DMDocumentTypeEnum.DOCUMENT.name());
    document.setString(DMObjectAttributeConstants.CONTENT_TYPE, format.toLowerCase());
    document.setString(DMObjectAttributeConstants.GCM_CONTENT_TYPE, format);
    return document;
  }

  /**
   * 
   * @param dfcSession
   * @param file
   * @param busFuncName
   * @param format
   * @return
   * @throws DfException
   */
  public IDfDocument createDocument(IDfSession dfcSession, String filename, String objectName,
      String format) throws DfException {
    IDfDocument document = (IDfDocument) dfcSession.newObject(DMObjectTypeConstants.GCM_DOCUMENT);

    document.setObjectName(objectName);
    document.setTitle(filename);
    document
        .setString(DMObjectAttributeConstants.DOCUMENT_TYPE, DMDocumentTypeEnum.DOCUMENT.name());
    document.setString(DMObjectAttributeConstants.CONTENT_TYPE, format.toLowerCase());
    document.setString(DMObjectAttributeConstants.GCM_CONTENT_TYPE, format);
    return document;
  }

  /**
   * 
   * @param fileName
   * @param busFuncName
   * @return
   */
  public String getBarcodeByFileName(String fileName, String busFuncName) {

    if (GCMConstants.IngestionJobContants.RETRIEVAL_JOB.equalsIgnoreCase(busFuncName)) {
      String s = StringUtils.split(fileName, "_")[3];
      return StringUtils.substringBefore(s, ".");
    } else {
      String s = StringUtils.split(fileName, "_")[2];
      return StringUtils.substringBefore(s, ".");
    }
  }


  public String getFolderQualificationDQL(String path) {
    return "dm_folder where any r_folder_path='" + path + "' and object_name='"
        + StringUtils.substringAfterLast(path, "/") + "'";
  }

  /**
   * @return the docBaseOwner
   */
  public String getDocBaseOwner() {
    return docBaseOwner;
  }

  /**
   * @return the sdf
   */
 /* public static SimpleDateFormat getSdf() {
    return sdf;
  }*/

}
