package com.optum.gcm.model;

import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class InsertStgUser {

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
	
	private StgExtUserFileInfo stgExtUserFileInfo;
	
	private String roleCode;
	
	private List<StgExtUserInfo> stgExtUserInfo;

	public StgExtUserFileInfo getStgExtUserFileInfo() {
		return stgExtUserFileInfo;
	}

	public void setStgExtUserFileInfo(StgExtUserFileInfo stgExtUserFileInfo) {
		this.stgExtUserFileInfo = stgExtUserFileInfo;
	}

	public List<StgExtUserInfo> getStgExtUserInfo() {
		return stgExtUserInfo;
	}

	public void setStgExtUserInfo(List<StgExtUserInfo> stgExtUserInfo) {
		this.stgExtUserInfo = stgExtUserInfo;
	}
	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}
	
}
