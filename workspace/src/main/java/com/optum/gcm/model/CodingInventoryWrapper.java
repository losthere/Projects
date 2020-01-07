
package com.optum.gcm.model;

import java.util.Collections;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * @author sgangul1
 */

public class CodingInventoryWrapper {

	private List<CodingInventory> codingInventoryList;

	private SchedulingSearchFilter searchFilter;

	private Long assignType;
	
	private Long assignVendorKey;

	private Long assignPerUserCount;
	
	private Long assignCount;

	private List<KeyValue<Long, Long>> assignIndUsers;

	public List<CodingInventory> getCodingInventoryList() {
		return (codingInventoryList != null) ? Collections.unmodifiableList(codingInventoryList) : null;
	}

	public void setCodingInventoryList(List<CodingInventory> codingInventoryList) {
		this.codingInventoryList = (codingInventoryList != null) ? Collections.unmodifiableList(codingInventoryList) : null;
	}

	public SchedulingSearchFilter getSearchFilter() {
		return searchFilter;
	}

	public void setCodingSearchFilter(SchedulingSearchFilter searchFilter) {
		this.searchFilter = searchFilter;
	}

	public Long getAssignVendorKey() {
		return assignVendorKey;
	}

	public void setAssignVendorKey(Long assignVendorKey) {
		this.assignVendorKey = assignVendorKey;
	}

	public Long getAssignType() {
		return assignType;
	}

	public void setAssignType(Long assignType) {
		this.assignType = assignType;
	}

	public Long getAssignCount() {
		return assignCount;
	}

	public void setAssignCount(Long assignCount) {
		this.assignCount = assignCount;
	}

	public Long getAssignPerUserCount() {
		return assignPerUserCount;
	}

	public void setAssignPerUserCount(Long assignPerUserCount) {
		this.assignPerUserCount = assignPerUserCount;
	}

	public void setSearchFilter(SchedulingSearchFilter searchFilter) {
		this.searchFilter = searchFilter;
	}

	public List<KeyValue<Long, Long>> getAssignIndUsers() {
		return (assignIndUsers != null) ? Collections.unmodifiableList(assignIndUsers) : null;
	}

	public void setAssignIndUsers(List<KeyValue<Long, Long>> assignIndUsers) {
		this.assignIndUsers = (assignIndUsers != null) ? Collections.unmodifiableList(assignIndUsers) : null;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
	}

}
