package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class EncounterDxInfo {

	@Column(value="ICD_DX_CD")
	private String icdDxCd;
	
	@Column(value="GCM_EO_KEY")     
	private String eoKey;
	
	@Column(value="GCM_ENC_DX_KEY")
	private Long encDxKey;


	public String getIcdDxCd() {
		return icdDxCd;
	}

	public void setIcdDxCd(String icdDxCd) {
		this.icdDxCd = icdDxCd;
	}

	public String getEoKey() {
		return eoKey;
	}

	public void setEoKey(String eoKey) {
		this.eoKey = eoKey;
	}

	public Long getEncDxKey() {
		return encDxKey;
	}

	public void setEncDxKey(Long encDxKey) {
		this.encDxKey = encDxKey;
	}
	
}
