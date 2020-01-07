package com.optum.gcm.model;

import java.util.List;

public class RetrievalSearchFilterWrapper {
 private List<RetrievalSearchFilter> retrievalSearchFilter;
 private Long newVendorKey;
 private Long assignQty;
 private String loggedInUser;
public List<RetrievalSearchFilter> getRetrievalSearchFilter() {
	return retrievalSearchFilter;
}

public void setRetrievalSearchFilter(List<RetrievalSearchFilter> retrievalSearchFilter) {
	this.retrievalSearchFilter = retrievalSearchFilter;
}

public Long getNewVendorKey() {
	return newVendorKey;
}

public void setNewVendorKey(Long newVendorKey) {
	this.newVendorKey = newVendorKey;
}

public Long getAssignQty() {
	return assignQty;
}

public void setAssignQty(Long assignQty) {
	this.assignQty = assignQty;
}

public String getLoggedInUser() {
	return loggedInUser;
}

public void setLoggedInUser(String loggedInUser) {
	this.loggedInUser = loggedInUser;
}
}
