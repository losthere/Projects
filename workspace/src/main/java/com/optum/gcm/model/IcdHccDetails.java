package com.optum.gcm.model;

/**
 * @author pmule
 *
 */

public class IcdHccDetails {
	
	private String icdDesc;
	
	private String v22Hcc;
	
	private String v23Hcc;
	
	private String v24Hcc;
	
	private String RxHcc;
	
	private String hhs;
	
	private String ErrorCode;

	public String getIcdDesc() {
		return icdDesc;
	}

	public void setIcdDesc(String icdDesc) {
		this.icdDesc = icdDesc;
	}

	public String getV22Hcc() {
		return v22Hcc;
	}

	public void setV22Hcc(String v22Hcc) {
		this.v22Hcc = v22Hcc;
	}
	
	public String getV23Hcc() {
		return v23Hcc;
	}

	public void setV23Hcc(String v23Hcc) {
		this.v23Hcc = v23Hcc;
	}
	
	public String getV24Hcc() {
		return v24Hcc;
	}

	public void setV24Hcc(String v24Hcc) {
		this.v24Hcc = v24Hcc;
	}

	public String getRxHcc() {
		return RxHcc;
	}

	public void setRxHcc(String rxHcc) {
		RxHcc = rxHcc;
	}

	public String getHhs() {
		return hhs;
	}

	public void setHhs(String hhs) {
		this.hhs = hhs;
	}

	public String getErrorCode() {
		return ErrorCode;
	}

	public void setErrorCode(String errorCode) {
		ErrorCode = errorCode;
	}
	

}
