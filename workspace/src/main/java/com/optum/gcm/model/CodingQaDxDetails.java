package com.optum.gcm.model;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class CodingQaDxDetails {

	private Long coderEncounterDxKey;

	private Long coderEncounterKey;

	private String coderICDDxCode;

	private String coderHccModelCatV22;
	
	private String coderHccModelCatV23;
	
	private String coderHccModelCatV24;

	private String coderHccModelCatRx;

	private String coderHccModelCatHhs;

	private EOCode coderDxEoCode;

	private String coderIcdDesc;

	private Long qaEncounterDXKey;

	private Long qaEncounterKey;

	private String qaICDDxCode;

	private String qaHccModelCatV22;
	
	private String qaHccModelCatV23;
	
	private String qaHccModelCatV24;

	private String qaHccModelCatRx;

	private String qaHccModelCatHhs;

	private String qaDxActionCd;

	private EOCode qaDxEoCode;

	private String icdDesc;

	public String getCoderIcdDesc() {
		return coderIcdDesc;
	}

	public void setCoderIcdDesc(String coderIcdDesc) {
		this.coderIcdDesc = coderIcdDesc;
	}

	public String getIcdDesc() {
		return icdDesc;
	}

	public void setIcdDesc(String icdDesc) {
		this.icdDesc = StringEscapeUtils.escapeJava(icdDesc);
	}

	public Long getCoderEncounterDxKey() {
		return coderEncounterDxKey;
	}

	public void setCoderEncounterDxKey(Long coderEncounterDxKey) {
		this.coderEncounterDxKey = coderEncounterDxKey;
	}

	public Long getCoderEncounterKey() {
		return coderEncounterKey;
	}

	public void setCoderEncounterKey(Long coderEncounterKey) {
		this.coderEncounterKey = coderEncounterKey;
	}

	public String getCoderICDDxCode() {
		return coderICDDxCode;
	}

	public void setCoderICDDxCode(String coderICDDxCode) {
		this.coderICDDxCode = coderICDDxCode;
	}

	public String getCoderHccModelCatV22() {
		return coderHccModelCatV22;
	}

	public void setCoderHccModelCatV22(String coderHccModelCatV22) {
		this.coderHccModelCatV22 = coderHccModelCatV22;
	}

	public String getCoderHccModelCatRx() {
		return coderHccModelCatRx;
	}

	public void setCoderHccModelCatRx(String coderHccModelCatRx) {
		this.coderHccModelCatRx = coderHccModelCatRx;
	}

	public String getCoderHccModelCatHhs() {
		return coderHccModelCatHhs;
	}

	public void setCoderHccModelCatHhs(String coderHccModelCatHhs) {
		this.coderHccModelCatHhs = coderHccModelCatHhs;
	}

	public EOCode getCoderDxEoCode() {
		return coderDxEoCode;
	}

	public void setCoderDxEoCode(EOCode coderDxEoCode) {
		this.coderDxEoCode = coderDxEoCode;
	}

	public Long getQaEncounterDXKey() {
		return qaEncounterDXKey;
	}

	public void setQaEncounterDXKey(Long qaEncounterDXKey) {
		this.qaEncounterDXKey = qaEncounterDXKey;
	}

	public Long getQaEncounterKey() {
		return qaEncounterKey;
	}

	public void setQaEncounterKey(Long qaEncounterKey) {
		this.qaEncounterKey = qaEncounterKey;
	}

	public String getQaICDDxCode() {
		return qaICDDxCode;
	}

	public void setQaICDDxCode(String qaICDDxCode) {
		this.qaICDDxCode = qaICDDxCode;
	}

	public String getQaHccModelCatV22() {
		return qaHccModelCatV22;
	}

	public void setQaHccModelCatV22(String qaHccModelCatV22) {
		this.qaHccModelCatV22 = qaHccModelCatV22;
	}

	public String getQaHccModelCatRx() {
		return qaHccModelCatRx;
	}

	public void setQaHccModelCatRx(String qaHccModelCatRx) {
		this.qaHccModelCatRx = qaHccModelCatRx;
	}

	public String getQaHccModelCatHhs() {
		return qaHccModelCatHhs;
	}

	public void setQaHccModelCatHhs(String qaHccModelCatHhs) {
		this.qaHccModelCatHhs = qaHccModelCatHhs;
	}

	public String getQaDxActionCd() {
		return qaDxActionCd;
	}

	public void setQaDxActionCd(String qaDxActionCd) {
		this.qaDxActionCd = qaDxActionCd;
	}

	public EOCode getQaDxEoCode() {
		return qaDxEoCode;
	}

	public void setQaDxEoCode(EOCode qaDxEoCode) {
		this.qaDxEoCode = qaDxEoCode;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
	}

	public String getCoderHccModelCatV23() {
		return coderHccModelCatV23;
	}

	public String getCoderHccModelCatV24() {
		return coderHccModelCatV24;
	}

	public String getQaHccModelCatV23() {
		return qaHccModelCatV23;
	}

	public String getQaHccModelCatV24() {
		return qaHccModelCatV24;
	}

	public void setCoderHccModelCatV23(String coderHccModelCatV23) {
		this.coderHccModelCatV23 = coderHccModelCatV23;
	}

	public void setCoderHccModelCatV24(String coderHccModelCatV24) {
		this.coderHccModelCatV24 = coderHccModelCatV24;
	}

	public void setQaHccModelCatV23(String qaHccModelCatV23) {
		this.qaHccModelCatV23 = qaHccModelCatV23;
	}

	public void setQaHccModelCatV24(String qaHccModelCatV24) {
		this.qaHccModelCatV24 = qaHccModelCatV24;
	}

}