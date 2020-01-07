package com.optum.gcm.common.constants;

public enum StatusFlag {
	YES("Y"), NO("N");
	private String value;

	StatusFlag(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
