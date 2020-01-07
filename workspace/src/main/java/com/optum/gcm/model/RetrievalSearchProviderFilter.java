package com.optum.gcm.model;

import com.optum.gcm.common.annotation.FilterMapping;
import com.optum.gcm.common.annotation.FilterMapping.Operations;

public class RetrievalSearchProviderFilter {

	private String provState;
	private String provLastName;

	@FilterMapping(columnName = "PROV.PROV_STATE")
	public String getProvState() {
		return provState;
	}

	public void setProvState(String provState) {
		this.provState = provState;
	}

	@FilterMapping(columnName = "PROV.PROV_LAST_NAME", operation = Operations.LIKE)
	public String getProvLastName() {
		return provLastName;
	}

	public void setProvLastName(String provLastName) {
		this.provLastName = provLastName;
	}

}
