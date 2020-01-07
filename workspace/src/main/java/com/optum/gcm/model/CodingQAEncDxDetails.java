package com.optum.gcm.model;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class CodingQAEncDxDetails {

	private Long coderEncounterKey;

	private String coderDOSFromDate;

	private String coderDOSThruDate;

	private String coderPageNum;

	private String coderRetProvFlag;

	private String coderProvNPI;

	private String coderProvFirstName;

	private String coderProvLastName;
	
	private EOCode coderEoCode;

	private Long qaEncounterKey;

	private String qaDOSFromDate;

	private String qaDOSThruDate;

	private String qaPageNum;

	private String qaRetProvFlag;

	private String qaProvNPI;

	private String qaProvFirstName;

	private String qaProvLastName;

	private String qaEncActionCd;

	private EOCode qaEoCode;
	
	private String qaEncComments;
	
	private List<String> coderEoKeyListResponse;
	
	private List<EOCode> qaEoKeyList;
	
	private transient String[] qaEoKeyListResponse;
	
	private transient String[] coderEoKeyList;

	private List<CodingQaDxDetails> codingQaDxDetails = new ArrayList<>();

	public Long getCoderEncounterKey() {
		return coderEncounterKey;
	}

	public void setCoderEncounterKey(Long coderEncounterKey) {
		this.coderEncounterKey = coderEncounterKey;
	}

	public String getCoderDOSFromDate() {
		return coderDOSFromDate;
	}

	public void setCoderDOSFromDate(String coderDOSFromDate) {
		this.coderDOSFromDate = coderDOSFromDate;
	}

	public String getCoderDOSThruDate() {
		return coderDOSThruDate;
	}

	public void setCoderDOSThruDate(String coderDOSThruDate) {
		this.coderDOSThruDate = coderDOSThruDate;
	}

	public String getCoderPageNum() {
		return coderPageNum;
	}

	public void setCoderPageNum(String coderPageNum) {
		this.coderPageNum = coderPageNum;
	}

	public String getCoderRetProvFlag() {
		return coderRetProvFlag;
	}

	public void setCoderRetProvFlag(String coderRetProvFlag) {
		this.coderRetProvFlag = coderRetProvFlag;
	}

	public String getCoderProvNPI() {
		return coderProvNPI;
	}

	public void setCoderProvNPI(String coderProvNPI) {
		this.coderProvNPI = coderProvNPI;
	}

	public String getCoderProvFirstName() {
		return coderProvFirstName;
	}

	public void setCoderProvFirstName(String coderProvFirstName) {
		this.coderProvFirstName = coderProvFirstName;
	}

	public String getCoderProvLastName() {
		return coderProvLastName;
	}

	public void setCoderProvLastName(String coderProvLastName) {
		this.coderProvLastName = coderProvLastName;
	}

	public EOCode getCoderEoCode() {
		return coderEoCode;
	}

	public void setCoderEoCode(EOCode coderEoCode) {
		this.coderEoCode = coderEoCode;
	}

	public Long getQaEncounterKey() {
		return qaEncounterKey;
	}

	public void setQaEncounterKey(Long qaEncounterKey) {
		this.qaEncounterKey = qaEncounterKey;
	}

	public String getQaDOSFromDate() {
		return qaDOSFromDate;
	}

	public void setQaDOSFromDate(String qaDOSFromDate) {
		this.qaDOSFromDate = qaDOSFromDate;
	}

	public String getQaDOSThruDate() {
		return qaDOSThruDate;
	}

	public void setQaDOSThruDate(String qaDOSThruDate) {
		this.qaDOSThruDate = qaDOSThruDate;
	}

	public String getQaPageNum() {
		return qaPageNum;
	}

	public void setQaPageNum(String qaPageNum) {
		this.qaPageNum = qaPageNum;
	}

	public String getQaRetProvFlag() {
		return qaRetProvFlag;
	}

	public void setQaRetProvFlag(String qaRetProvFlag) {
		this.qaRetProvFlag = qaRetProvFlag;
	}

	public String getQaProvNPI() {
		return qaProvNPI;
	}

	public void setQaProvNPI(String qaProvNPI) {
		this.qaProvNPI = qaProvNPI;
	}

	public String getQaProvFirstName() {
		return qaProvFirstName;
	}

	public void setQaProvFirstName(String qaProvFirstName) {
		this.qaProvFirstName = qaProvFirstName;
	}

	public String getQaProvLastName() {
		return qaProvLastName;
	}

	public void setQaProvLastName(String qaProvLastName) {
		this.qaProvLastName = qaProvLastName;
	}

	public String getQaEncActionCd() {
		return qaEncActionCd;
	}

	public void setQaEncActionCd(String qaEncActionCd) {
		this.qaEncActionCd = qaEncActionCd;
	}
	
	
	public EOCode getQaEoCode() {
		return qaEoCode;
	}

	public void setQaEoCode(EOCode qaEoCode) {
		this.qaEoCode = qaEoCode;
	}
	
	public List<EOCode> getQaEoKeyList() {
		return qaEoKeyList;
	}

	public void setQaEoKeyList(List<EOCode> qaEoKeyList) {
		this.qaEoKeyList = qaEoKeyList;
	}

	public String getQaEncComments() {
		return qaEncComments;
	}

	public void setQaEncComments(String qaEncComments) {
		this.qaEncComments = StringEscapeUtils.escapeJava(qaEncComments);
	}

	public List<CodingQaDxDetails> getCodingQaDxDetails() {
		return codingQaDxDetails;
	}

	public void setCodingQaDxDetails(List<CodingQaDxDetails> codingQaDxDetails) {
		this.codingQaDxDetails = codingQaDxDetails;
	}
	
	public String[] getQaEoKeyListResponse() {
		return qaEoKeyListResponse;
	}

	public void setQaEoKeyListResponse(String[] strings) {
		this.qaEoKeyListResponse = strings;
	}
	
	
	public List<String> getCoderEoKeyListResponse() {
		return coderEoKeyListResponse;
	}

	public void setCoderEoKeyListResponse(List<String> coderEoKeyListResponse) {
		this.coderEoKeyListResponse = coderEoKeyListResponse;
	}

	public String[] getCoderEoKeyList() {
		return coderEoKeyList;
	}

	public void setCoderEoKeyList(String[] coderEoKeyList) {
		this.coderEoKeyList = coderEoKeyList;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
	}

}
