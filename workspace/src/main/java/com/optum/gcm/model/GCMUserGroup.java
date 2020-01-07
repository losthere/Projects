package com.optum.gcm.model;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import com.optum.gcm.common.annotation.Column;

public class GCMUserGroup {
	
	@Column("GCM_GROUP_CD")
	private String groupCode;
	
	@Column("GCM_GROUP_KEY")
	private String groupKey;
	
	@Column("GCM_GROUP_NAME")
	private String groupName;
	
	@Column("IS_DEFAULT_GROUP_SW")
	private String isDefaultGroupSW;
	
	@Column("IS_INTERNAL_GROUP")
	private String isInternalGroup;
	
	@Column("SPOTLIGHT_URL")
	private String spotlightUrl;
	
	public String getGroupCode() {
		return groupCode;
	}

	public void setGroupCode(String groupCode) {
		this.groupCode = groupCode;
	}

	public String getIsInternalGroup() {
		return isInternalGroup;
	}

	public void setIsInternalGroup(String isInternalGroup) {
		this.isInternalGroup = isInternalGroup;
	}

	public String getSpotlightUrl() {
		return spotlightUrl;
	}

	public void setSpotlightUrl(String spotlightUrl) {
		this.spotlightUrl = spotlightUrl;
	}

	public String getGroupKey() {
		return groupKey;
	}

	public void setGroupKey(String groupKey) {
		this.groupKey = groupKey;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	
	public String getIsDefaultGroupSW() {
		return isDefaultGroupSW;
	}

	public void setIsDefaultGroupSW(String isDefaultGroupSW) {
		this.isDefaultGroupSW = isDefaultGroupSW;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
	}
	
}
