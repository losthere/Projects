package com.optum.gcm.model;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class EOCode {

	private String value;

	private String label;

	public EOCode() {

	}

	public EOCode(String value, String label) {
		super();
		this.value = value;
		this.label = StringEscapeUtils.escapeJava(label);
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = StringEscapeUtils.escapeJava(label);
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
	}

}
