package com.optum.gcm.model;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class InsertStgUserObject {
/*	
	{
		  "INSERT_STG_USER_OBJECT": {
		    "INSERT_STG_USER": {
		      "STG_EXT_USER_FILE_INFO": {
		        "FILE_NAME": "PARAMETER",
		      },
		      "STG_EXT_USER_INFO": {
		        "FIRST_NAME": "PARAMETER",
		        "LAST_NAME": "PARAMETER",
		        "EMAIL": "PARAMETER",
		        "ORGANIZATION_NAME": "PARAMETER",
		        "ROLE": "PARAMETER",
		        "REPORTS_TO_USERID": "PARAMETER",
		        "CONTACT_ADDRESS_1": "PARAMETER",
		        "CONTACT_ADDRESS_2": "PARAMETER",
		        "CONTACT_CITY": "PARAMETER",
		        "CONTACT_STATE": "PARAMETER",
		        "CONTACT_ZIP_CODE": "PARAMETER"
		      }
		    }
		  }
		};*/


	private InsertStgUser insertStgUser;

	public InsertStgUser getInsertStgUser() {
		return insertStgUser;
	}

	public void setInsertStgUser(InsertStgUser insertStgUser) {
		this.insertStgUser = insertStgUser;
	}
	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
	}
}
