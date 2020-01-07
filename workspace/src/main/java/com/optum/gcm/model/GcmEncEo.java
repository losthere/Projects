package com.optum.gcm.model;

import javax.validation.constraints.NotNull;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

@Table("GCM_ENC_EO")
public class GcmEncEo extends BaseModel {
	
	public GcmEncEo() {
	}
	
	@Column(value="GCM_ENC_EO_KEY",sequence="GCM_ENC_EO_SEQ")
	private Long encEoKey;
	
	@Column(value = "GCM_ENCOUNTER_KEY")
	private Long encounterKey;

	@Column("GCM_PROJ_KEY")
	@NotNull
	private Long projKey;

	@Column("GCM_EO_KEY")
	@NotNull
	private String eoKey;

	public Long getProjKey() {
		return projKey;
	}

	public void setProjKey(Long projKey) {
		this.projKey = projKey;
	}

	public String getEoKey() {
		return eoKey;
	}

	public void setEoKey(String eoKey) {
		this.eoKey = eoKey;
	}

	public Long getEncEoKey() {
		return encEoKey;
	}

	public void setEncEoKey(Long encEoKey) {
		this.encEoKey = encEoKey;
	}


	public Long getEncounterKey() {
		return encounterKey;
	}

	public void setEncounterKey(Long encounterKey) {
		this.encounterKey = encounterKey;
	}


}
