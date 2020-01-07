package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

public class RetrievalSearchInput extends RetrievalSearchFilter{
	
	@Column("GCM_GROUP_KEY")
	private Integer groupKey;
	
	
	public Integer getGroupKey() {
		return groupKey;
	}
	
	public void setGroupKey(Integer groupKey) {
		this.groupKey = groupKey;
	}

}
