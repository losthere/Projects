/**
 * 
 */
package com.optum.gcm.model;

import javax.validation.constraints.NotNull;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

@Table("STGSCD_NUQA_ENCNTER_DX")
public class DiagnosisDummy  {

	
	@Column("STGSEAS_NUQA_ENCTER_KEY")
	@NotNull
	private Long stgNuqaEncounterKey;
	
	
	

	/**
	 * @return the stgNuqaEncounterKey
	 */
	public Long getStgNuqaEncounterKey() {
		return stgNuqaEncounterKey;
	}

	/**
	 * @param stgNuqaEncounterKey the stgNuqaEncounterKey to set
	 */
	public void setStgNuqaEncounterKey(Long stgNuqaEncounterKey) {
		this.stgNuqaEncounterKey = stgNuqaEncounterKey;
	}

	}