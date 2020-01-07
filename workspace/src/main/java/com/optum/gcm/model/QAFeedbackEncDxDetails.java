package com.optum.gcm.model;

import java.util.ArrayList;
import java.util.List;

/**
 * @author pmule
 *
 */

public class QAFeedbackEncDxDetails {

	private Long coderEncounterKey;

	private String coderDOSFromDate;

	private String coderDOSThruDate;

	private String coderPageNum;

	private String coderRetProvFlag;

	private String coderProvNPI;

	private String coderProvFirstName;

	private String coderProvLastName;

	private String coderEncEoKey;

	private String coderEncEoDesc;

	private Long qaEncounterKey;

	private String qaDOSFromDate;

	private String qaDOSThruDate;

	private String qaPageNum;

	private String qaRetProvFlag;

	private String qaProvNPI;

	private String qaProvFirstName;

	private String qaProvLastName;

	private String qaEncComment;

	private String qaEncEoKey;

	private String qaEncEoDesc;

	private String qaEncActionCd;
	
	private String[] eoKeyList;
	
	private String[] eoKeyListQA;

	private List<QAFeedbackDxDetails> QAFeedbackDxDetails = new ArrayList<>();

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

	public String getCoderEncEoKey() {
		return coderEncEoKey;
	}

	public void setCoderEncEoKey(String coderEncEoKey) {
		this.coderEncEoKey = coderEncEoKey;
	}

	public String getCoderEncEoDesc() {
		return coderEncEoDesc;
	}

	public void setCoderEncEoDesc(String coderEncEoDesc) {
		this.coderEncEoDesc = coderEncEoDesc;
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

	public String getQaEncEoKey() {
		return qaEncEoKey;
	}

	public void setQaEncEoKey(String qaEncEoKey) {
		this.qaEncEoKey = qaEncEoKey;
	}

	public String getQaEncEoDesc() {
		return qaEncEoDesc;
	}

	public void setQaEncEoDesc(String qaEncEoDesc) {
		this.qaEncEoDesc = qaEncEoDesc;
	}

	public String getQaEncActionCd() {
		return qaEncActionCd;
	}

	public void setQaEncActionCd(String qaEncActionCd) {
		this.qaEncActionCd = qaEncActionCd;
	}

	public List<QAFeedbackDxDetails> getQAFeedbackDxDetails() {
		return QAFeedbackDxDetails;
	}

	public void setQAFeedbackDxDetails(List<QAFeedbackDxDetails> qAFeedbackDxDetails) {
		QAFeedbackDxDetails = qAFeedbackDxDetails;
	}

	public String getQaEncComment() {
		return qaEncComment;
	}

	public void setQaEncComment(String qaEncComment) {
		this.qaEncComment = qaEncComment;
	}

	public String[] getEoKeyList() {
		return eoKeyList;
	}

	public void setEoKeyList(String[] eoKeyList) {
		this.eoKeyList = eoKeyList;
	}

	public String[] getEoKeyListQA() {
		return eoKeyListQA;
	}

	public void setEoKeyListQA(String[] eoKeyListQA) {
		this.eoKeyListQA = eoKeyListQA;
	}
	
}
