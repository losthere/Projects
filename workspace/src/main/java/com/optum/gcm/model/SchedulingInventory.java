
package com.optum.gcm.model;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class SchedulingInventory  {

	@Column("PROV_GRP_NAME")
	private String provGroupName;
	
	@Column("PROV_NAME")
	private String provName;
	
	@Column("PROV_ID")
	private String ProvId;
	
	@Column("PROV_LOCATION")
	private String provLocation;
	
	@Column("PROV_PHONE")
	private String provPhone;
	
	@Column("PROV_FAX")
	private String provFax;
	
	@Column("USER_NAME")
	private String userName;
	
	@Column("USER_KEY")
	private String userKey;
	
	@Column("REC_CNT")
	private Integer count;
	
	@Column("SPECIAL_CATEGORY")
	private String specialCategory;
	
	@Column("SPECIAL_NOTES")
	private String specialNotes;
	
	public SchedulingInventory() {
		
	}

	public String getProvPhone() {
		return provPhone;
	}

	public void setProvPhone(String provPhone) {
		this.provPhone = provPhone;
	}

	public String getProvGroupName() {
		return provGroupName;
	}

	public void setProvGroupName(String provGroupName) {
		this.provGroupName = provGroupName;
	}

	
	public String getProvName() {
		return provName;
	}


	public void setProvName(String provName) {
		this.provName = provName;
	}


	public String getProvId() {
		return ProvId;
	}


	public void setProvId(String provId) {
		ProvId = provId;
	}


	public String getProvLocation() {
		return provLocation;
	}


	public void setProvLocation(String provLocation) {
		this.provLocation = provLocation;
	}


	public String getProvFax() {
		return provFax;
	}


	public void setProvFax(String provFax) {
		this.provFax = provFax;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String getUserKey() {
		return userKey;
	}

	public void setUserKey(String userKey) {
		this.userKey = userKey;
	}
	
	public String getSpecialCategory() {
		return specialCategory;
	}

	public void setSpecialCategory(String specialCategory) {
		this.specialCategory = specialCategory;
	}

	public String getSpecialNotes() {
		return specialNotes;
	}

	public void setSpecialNotes(String specialNotes) {
		this.specialNotes = specialNotes;
	}	

	@Override
	  public String toString () {
	    return ToStringBuilder.reflectionToString(this,ToStringStyle.SHORT_PREFIX_STYLE);
	  }
	
}
