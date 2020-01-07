package com.optum.gcm.constants;

public interface GCMConstants {

	public enum TaskStatus {
		SUCCESS, FAILURE, VALIDATION_ERROR, FILE_REJECTED;
	}

	public interface IngestionJobContants {

		String PREFIX_PATTERN = "PREFIX_PATTERN";
		String SUFFIX_PATTERN = "SUFFIX_PATTERN";
		String FOLDER_SEPERATOR = "/";
		String DOT_OPERATOR = ".";

		String RETRIEVAL_JOB = "RETRIEVAL";
		String COMMERCIAL_JOB = "COMMERCIAL";

		String TEMP_IMAGE_HOLD = "/gcm/comm/data/inb/imageHold";

		int RETRIEVAL_JOB_NUM = 4;
		int CODING_JOB_NUM = 2;
		int ONSITE_CODING_JOB_NUM = 10;

		String RETRIEVAL_JOB_CODE = "RETRIEVAL";

		String YES_FLAG = "Y";
		String NO_FLAG = "N";

		String EXCLUDE_PREFIX_PATTERN = "EXCLUDE_PREFIX_PATTERN";
	}

	public enum DMDocumentTypeEnum {
		DOCUMENT, ATTESTATION, SIGNATURE

	}

	public interface DMObjectTypeConstants {

		String DM_ACL = "dm_acl";
		String DM_DOCUMNET = "dm_document";
		String DM_FOLDER = "dm_folder";
		String DM_USER = "dm_user";
		String DM_GROUP = "dm_group";
		String DM_NETEGRITY = "dm_netegrity";
		String GROUP_CLASS = "group";
		String GROUP_ADMIN = "dmadmin";
		String GCM_DOCUMENT = "gcm_document";

		String CABINET_NAME = "/Commercial";

		String ORPHAN_FOLDER_NAME = "ORPHAN";

		String ACL_COMM_PREFIX = "gcmc_";
		String ACL_SUFFIX = "_acl";

		String OBJECT_OWNER = "owner_name";
	}

	public interface DMObjectAttributeConstants {
		String CONTENT_TYPE = "a_content_type";
		String GCM_CONTENT_TYPE = "content_type";

		String DOCUMENT_TYPE = "gcm_doc_type";

		String PROJ_YEAR = "proj_year";
		String PROGRAM_TYPE_REPEATING = "prgm_type";

		String GLOBAL_MBR_ID = "global_mbr_id";
		String GLOBAL_PROV_ID = "global_provider_id";

		String PROV_GRP_ID = "prov_grp_id";
		String PROV_ID = "prov_id";
		String PROV_FIRST_NAME = "prov_fname";
		String PROV_LAST_NAME = "prov_lname";

		String MBR_HIC = "mbr_hic";
		String MBR_FIRST_NAME = "mbr_fname";
		String MBR_LAST_NAME = "mbr_lname";
		String MBR_DOB = "mbr_dob";

		String MBR_HP_CD = "mbr_hp_cd";
		String MBR_HP_PROD = "mbr_hp_prod";

		String BUSINESS_SEGMENT = "bus_segment";
		String BUSINESS_FUNCTION = "bus_function"; // TODO
		String BUSINESS_FUNCTION_STATUS = "bus_function_status"; // TODO
		String BUSINESS_FUNCTION_VENDOR = "bus_function_vendor"; // TODO

		String RETRIEVAL_SOURCE = "retrieval_source";
		String RETRIEVAL_VENDOR = "retrieval_vendor"; // TODO

		String NO_OF_PAGES = "no_of_pages";

		String DOS_YEAR_REPEATING = "dos_year";
		String DOS_RANGE_REPEATING = "dos_range";
		String DOS_YEAR_PAGE_NOS_REPEATING = "dos_year_page_nos";
		String CLIENT_REQUEST_ID = "client_request_id";

		String CLIENT_CODE = "gcm_client_code";
	}

	public interface DMGroupConstants {
		String DM_OWNER = "dm_owner";
		String DM_WORLD = "dm_world";
		String GCM_BATCH_USER = "gcmbatch";
		String GCMC_ONSHORE = "gcmc_onshore";
	}

	public interface DMACLNames {
		String GCM_COMMERCIAL_ACL = "gcmc_onshore_acl";
	}

}
