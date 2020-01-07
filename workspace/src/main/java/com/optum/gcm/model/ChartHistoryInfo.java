package com.optum.gcm.model;

import java.sql.Timestamp;
/**
 * @author pmule
 *
 */
import java.util.Date;

import com.optum.gcm.common.annotation.Column;

public class ChartHistoryInfo {

	@Column("ACTION")
	private String action;
	
	@Column("USER_NAME")
	private String userName;
	
	@Column("ACTION_DATE")
	private Timestamp actionDate;

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Timestamp getActionDate() {
		return actionDate != null ? (Timestamp)actionDate.clone() : null;
	}

	public void setActionDate(Timestamp actionDate) {
		this.actionDate = (actionDate != null) ? (Timestamp) actionDate.clone() : null;
	}
	
	
}
