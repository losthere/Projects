package com.optum.gcm.model;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class ProviderDetails {

	private SchedulingInventory schedulingInventory;
	private String address;
	private String phone;
	private String fax;
	private String userId;


	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public SchedulingInventory getSchedulingInventory() {
		return schedulingInventory;
	}

	public void setSchedulingInventory(SchedulingInventory schedulingInventory) {
		this.schedulingInventory = schedulingInventory;
	}

	@Override
	  public String toString () {
	    return ToStringBuilder.reflectionToString(this,ToStringStyle.SHORT_PREFIX_STYLE);
	  }
}
