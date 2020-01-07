/**
 * 
 */
package com.optum.gcm.model;

import java.text.MessageFormat;

/**
 * @author 189833
 *
 */
public enum IngestionTaskErrorEnum implements ITaskErrorEnum {

    INVALID_BUSINESS_FUNCTION("The business function of the barcode {0} is not a valid business function for Ingestion Process"),
    INVALID_PROGRAM_FOR_APPREP("{0} images not allowed for {1} program"),
    INVALID_PROGRAM_APP_REP("Images not allowed  to append/teplace for {0} program"),
    INVALID_BUSINESS_FUNCTION_VENDOR("The file cannot be loaded because the vendor in the filename {0} does not match the current vendor in the system"),
    INVALID_BUSINESS_FUNCTION_STATUS("The business function status of the barcode {0} is not a valid status for the Ingestion Process"),
    BARCODE_DOES_NOT_EXISTS("The barcode in the file {0} does not exists in the system"),
    FOLDER_CREATION_ERROR("Ingestion job could not create folder {0} in the repository due to the error {1}"),
    ACL_DOES_NOT_EXISTS("Ingestion Job could not find the ACL {0} in the Image Repository. This is an internal Optum error. Contact your Optum representative for more information."),
    EO_CODE_NOT_EXISTS("EO CODE for Clinical Clarification is not present for barcode {0} for {1} business function and hence image could not be appended"),
    APPLY_ACL_ERROR("Ingestion job could not apply the ACL {0} for the folder {1} in the repository due to the error {2}"),
    APPLY_METADATA_ERROR("Metadata cannot be applied for the barcode {0} with the error {1}"),
    DOCUMENT_CREATION_ERROR("Document {0} could not be created because of the error {1} "),
    DOCUMENT_INGESTION_ERROR("Document {0} could not be saved because of the error {1}. Barcode could not be ingested due to an internal Optum error. Contact your Optum representative for more information."),
    INGESTION_SERVICE_FAILURE("Ingestion of the file {0} in Image Repository is failed due to the error {1}. Please check the image for password protection, header/trailer issue in PDF or corruption."),
    RENDITION_CREATION_ERROR("TIFF Rendition is not created for the document {0} due to the error {1}"),
    UPDATE_DOC_AVAILABILITY_STATUS_ERROR("Error occurred while updating the DOC_AVAILABILITY_STATUS for the file {0} due to the error {1}"),
    UPDATE_EVALUATION_STATUS_SLR_ERROR("Error occurred while creating the GCM_BUS_FUNC_EVALUATION item for the file {0} due to the error {1}"),
    UPDATE_BUS_FUNC_STATUS_ERROR("Error occurred while updating the BUS FFUNC STATUS for the file {0} due to the error {1}"),
    UPDATE_GCM_INBOUND_ERROR("Error occurred while updating the GCM_INBOUND_ERROR table for the file {0}."),
    //NUMBER_OF_PAGES_ERROR("Error occurred while calculating the number of pages for the file {0} due to the error {1}"),
    DUPLIACTE_IMAGE("There is already an image in the repository for the barcode in the file {0}"),
    DOCUMENT_CHECKOUT_ERROR("Document {0} could not be checkedout"),
    DOCUMENT_AVAILABLE_AND_BUS_FUNC_COMPLETED("The business function status is COMPLETED and Chart is already available for barcode in {0}"),
    INVALID_FILE_NAME_VERSION_PAF("The version in the file name {0} is not valid for file {1} "),
    CLIENT_REQUEST_ID_INVALID("The client Request Id in the file {0} does not exists in the system or error in extracting metadat"),
    MULTI_SLR_INPRGRESS_ERROR("Workitem for barcode {0} is in INPROGRESS for internal Vendor in SLR/MULTISLR business function."),
    LOCKED_IMAGE("Error occurred while saving document {0} because it is password protected."),
    NO_IMAGE_RETRIEVAL("The file cannot be loaded because the barcode doesn't have retrieval image loaded."),
    PROJECT_DELETED("Image could not be loaded for barcode {0} because Project ID {1} for that barcode has been marked for deletion in the system.");

  private String erroMsg;

  private IngestionTaskErrorEnum(String msg) {
    this.erroMsg = msg;
  }

  public String getErroMsg() {
    return erroMsg;
  }

  public void setErroMsg(String erroMsg) {
    this.erroMsg = erroMsg;
  }

  public String formatMessage(Object... params) {
    return MessageFormat.format(erroMsg, params);
  }

}
