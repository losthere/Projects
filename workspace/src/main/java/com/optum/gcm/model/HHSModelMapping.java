package com.optum.gcm.model;

import com.optum.gcm.common.annotation.Column;

/**
 * @author pmule
 *
 */

public class HHSModelMapping {
	
	@Column(value = "DIAG_START_AGE")
	private double diagStartAge;
	
	@Column(value = "DIAG_END_AGE")
	private double diagEndAge;
	
	@Column(value = "GCM_HCC_MODEL_CAT")
	private String hccModelCat;

	public double getDiagStartAge() {
		return diagStartAge;
	}

	public void setDiagStartAge(double diagStartAge) {
		this.diagStartAge = diagStartAge;
	}

	public double getDiagEndAge() {
		return diagEndAge;
	}

	public void setDiagEndAge(double diagEndAge) {
		this.diagEndAge = diagEndAge;
	}

	public String getHccModelCat() {
		return hccModelCat;
	}

	public void setHccModelCat(String hccModelCat) {
		this.hccModelCat = hccModelCat;
	}

	
}
