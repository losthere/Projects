package com.optum.gcm.model;

import java.util.Collections;
import java.util.List;

public class ProviderDetailsWrapper {
	private List<ProviderDetails> providerDetails;
	
	private SchedulingSearchFilter schedulingSearchFilter;

	public List<ProviderDetails> getProviderDetails() {
		return (providerDetails != null) ? Collections.unmodifiableList(providerDetails) : null;
	}

	public void setProviderDetails(List<ProviderDetails> providerDetails) {
		this.providerDetails = (providerDetails != null) ? Collections.unmodifiableList(providerDetails) : null;
	}

	public SchedulingSearchFilter getSchedulingSearchFilter() {
		return schedulingSearchFilter;
	}

	public void setSchedulingSearchFilter(SchedulingSearchFilter schedulingSearchFilter) {
		this.schedulingSearchFilter = schedulingSearchFilter;
	}

}
