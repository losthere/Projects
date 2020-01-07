package com.optum.gcm.model;

public class Pagination {
	private int pageNo;
	private Integer pageSize = 25;
	private String sortColumn;
	private String sortOrder;

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public String getSortColumn() {
		return sortColumn;
	}

	public void setSortColumn(String sortColumn) {
		this.sortColumn = sortColumn;
	}

	public String getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}

	public int getPageStart() {
		return (pageNo - 1) * pageSize;
	}

	public int getPageEnd() {
		return pageNo * pageSize;
	}
}
