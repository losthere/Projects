package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

public class SchedulingWorklist extends SchedulingInventory {
	
	@Column("PROVIDER_SELECTED")
	private String providerSelected;
	
	public String getProviderSelected() {
		return providerSelected;
	}

	public void setProviderSelected(String providerSelected) {
		this.providerSelected = providerSelected;
	}	
	
}
