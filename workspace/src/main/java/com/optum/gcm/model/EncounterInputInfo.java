package com.optum.gcm.model;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * @author pmule
 *
 */

public class EncounterInputInfo {

	private Long projContentKey;
	
	private Long busFuncVenKey;
	
	private Long projKey;

	private Long busFuncKey;
	
	private Long encounterKey;
	
	private Long userKey;
	
	public Long getProjContentKey() {
		return projContentKey;
	}

	public void setProjContentKey(Long projContentKey) {
		this.projContentKey = projContentKey;
	}

	public Long getBusFuncVenKey() {
		return busFuncVenKey;
	}

	public void setBusFuncVenKey(Long busFuncVenKey) {
		this.busFuncVenKey = busFuncVenKey;
	}
	
	public Long getBusFuncKey() {
		return busFuncKey;
	}

	public void setBusFuncKey(Long busFuncKey) {
		this.busFuncKey = busFuncKey;
	}
	

	public Long getProjKey() {
		return projKey;
	}

	public void setProjKey(Long projKey) {
		this.projKey = projKey;
	}

	public Long getEncounterKey() {
		return encounterKey;
	}

	public void setEncounterKey(Long encounterKey) {
		this.encounterKey = encounterKey;
	}
	
	public Long getUserKey() {
		return userKey;
	}

	public void setUserKey(Long userKey) {
		this.userKey = userKey;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
	}
	
}
