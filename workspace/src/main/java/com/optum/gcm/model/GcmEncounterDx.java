package com.optum.gcm.model;

import java.sql.Timestamp;
import java.util.Date;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

/**
 * @author pmule
 *
 */

@Table("GCM_ENCOUNTER_DX")
public class GcmEncounterDx {

	@Column(value="GCM_ENC_DX_KEY", sequence = "GCM_ENCOUNTER_DX_SEQ")    
	private Long encounterDxKey;
	
	@Column(value="GCM_ENCOUNTER_KEY")    
	private Long encounterKey;
	
	@Column(value="GCM_PROJ_KEY")
	private Long projKey;
	
	@Column(value="ICD_DX_CD")
	private String icdDxCd;
	
	@Column(value="GCM_EO_KEY")     
	private String eoKey;
	
	@Column(value="IS_INACTIVE_ENC_DX_SW")  
	private String isInactiveEncDxSw;
	
	@Column(value="CREATE_USERID")  
	private String createUserId;
	
	@Column(value="CREATE_DATE_TIME")    
	private Timestamp createDateTime;
	
	@Column(value="MODIFY_USERID")  
	private String modifyUserId;
	
	@Column(value="MODIFY_DATE_TIME") 
	private Timestamp modifyDateTime;

	public Long getEncounterDxKey() {
		return encounterDxKey;
	}

	public void setEncounterDxKey(Long encounterDxKey) {
		this.encounterDxKey = encounterDxKey;
	}

	public Long getEncounterKey() {
		return encounterKey;
	}

	public void setEncounterKey(Long encounterKey) {
		this.encounterKey = encounterKey;
	}

	public Long getProjKey() {
		return projKey;
	}

	public void setProjKey(Long projKey) {
		this.projKey = projKey;
	}

	public String getIcdDxCd() {
		return icdDxCd;
	}

	public void setIcdDxCd(String icdDxCd) {
		this.icdDxCd = icdDxCd;
	}

	public String getIsInactiveEncDxSw() {
		return isInactiveEncDxSw;
	}

	public void setIsInactiveEncDxSw(String isInactiveEncDxSw) {
		this.isInactiveEncDxSw = isInactiveEncDxSw;
	}

	public String getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}

	public Timestamp getCreateDateTime() {
		return createDateTime != null ? (Timestamp)createDateTime.clone() : null;
	}

	public void setCreateDateTime(Timestamp createDateTime) {
		this.createDateTime = (createDateTime != null) ? (Timestamp)createDateTime.clone() : null;
	}

	public String getModifyUserId() {
		return modifyUserId;
	}

	public void setModifyUserId(String modifyUserId) {
		this.modifyUserId = modifyUserId;
	}

	public Timestamp getModifyDateTime() {
		return modifyDateTime != null ? (Timestamp)modifyDateTime.clone() : null;
	}

	public void setModifyDateTime(Timestamp modifyDateTime) {
		this.modifyDateTime = (modifyDateTime != null) ? (Timestamp)modifyDateTime.clone() : null;
	}

	public String getEoKey() {
		return eoKey;
	}

	public void setEoKey(String eoKey) {
		this.eoKey = eoKey;
	}
	
	
	
}
