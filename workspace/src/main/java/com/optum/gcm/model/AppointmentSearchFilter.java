package com.optum.gcm.model;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * @author pmule
 *
 */

public class AppointmentSearchFilter {

	private String firstName;
	private String lastName;
	private String addr1;
	private String addr2;
	private String city;
	private String state;
	private String zip;
	private String phone;
	private String fax;
	private String email;
	private Long programKey;
	private Long vendorKey;
	private Long apptKey;
	private Long groupKey;
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getAddr1() {
		return addr1;
	}
	public void setAddr1(String addr1) {
		this.addr1 = addr1;
	}
	public String getAddr2() {
		return addr2;
	}
	public void setAddr2(String addr2) {
		this.addr2 = addr2;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getZip() {
		return zip;
	}
	public void setZip(String zip) {
		this.zip = zip;
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Long getProgramKey() {
		return programKey;
	}
	public void setProgramKey(Long programKey) {
		this.programKey = programKey;
	}
	
	public Long getVendorKey() {
		return vendorKey;
	}
	public void setVendorKey(Long vendorKey) {
		this.vendorKey = vendorKey;
	}	
	public Long getApptKey() {
		return apptKey;
	}
	public void setApptKey(Long apptKey) {
		this.apptKey = apptKey;
	}
	@Override
	  public String toString () {
	    return ToStringBuilder.reflectionToString(this,ToStringStyle.SHORT_PREFIX_STYLE);
	  }
	public Long getGroupKey() {
		return groupKey;
	}
	public void setGroupKey(Long groupKey) {
		this.groupKey = groupKey;
	}
	
}
