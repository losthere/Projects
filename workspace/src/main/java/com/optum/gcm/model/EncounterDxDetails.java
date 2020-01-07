package com.optum.gcm.model;

import java.util.Collections;
import java.util.List;

/**
 * @author pmule
 *
 */


public class EncounterDxDetails {

	private String loginUserId;
	
	private Long userKey;
	
	private EncounterInfo encounterInfo;
	
	private List<EncounterDxInfo> dxList;
	
	private List<EncounterDxInfo> deleteDxList;
	
	private List<EncounterDxInfo> updateDxList;

	public EncounterInfo getEncounterInfo() {
		return encounterInfo;
	}

	public void setEncounterInfo(EncounterInfo encounterInfo) {
		this.encounterInfo = encounterInfo;
	}

	public List<EncounterDxInfo> getDxList() {
		return (dxList != null ) ? Collections.unmodifiableList(dxList) : null;
	}

	public void setDxList(List<EncounterDxInfo> dxList) {
		this.dxList = (dxList != null ) ? Collections.unmodifiableList(dxList) : null;
	}

	public String getLoginUserId() {
		return loginUserId;
	}

	public void setLoginUserId(String loginUserId) {
		this.loginUserId = loginUserId;
	}

	public List<EncounterDxInfo> getDeleteDxList() {
		return (deleteDxList != null) ? Collections.unmodifiableList(deleteDxList) : null;
	}

	public void setDeleteDxList(List<EncounterDxInfo> deleteDxList) {
		this.deleteDxList = (deleteDxList != null) ? Collections.unmodifiableList(deleteDxList) : null;
	}

	public List<EncounterDxInfo> getUpdateDxList() {
		return (updateDxList != null) ? Collections.unmodifiableList(updateDxList) : null;
	}

	public void setUpdateDxList(List<EncounterDxInfo> updateDxList) {
		this.updateDxList = (updateDxList != null) ? Collections.unmodifiableList(updateDxList) : null;
	}

	public Long getUserKey() {
		return userKey;
	}

	public void setUserKey(Long userKey) {
		this.userKey = userKey;
	}
}
