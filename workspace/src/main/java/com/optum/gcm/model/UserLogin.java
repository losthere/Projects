package com.optum.gcm.model;

import java.sql.Timestamp;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.common.dao.Table;

@Table("GCM_USER_LOGON")
public class UserLogin extends BaseModel{
	
	@Column(value = "GCM_USER_LOGON_KEY" , sequence = "GCM_USER_LOGON_SEQ")
	private String gcmUserLogonKey;

	@Column("GCM_USER_KEY")
	private Long gcmUserKey;
	
	@Column("LOGIN_TIME")
	private Timestamp  logInTime;
	
	@Column("LOGOFF_TIME")
	private Timestamp logOffTime;
	
	@Column("IP_INFO")
	private String ipInfo;
	
	@Column("BROWSER_INFO")
	private String browserInfo;
	
	@Column("LOG_OFF_MODE")
	private String logOffMode;

	public String getGcmUserLogonKey() {
		return gcmUserLogonKey;
	}

	public void setGcmUserLogonKey(String gcmUserLogonKey) {
		this.gcmUserLogonKey = gcmUserLogonKey;
	}

	public Long getGcmUserKey() {
		return gcmUserKey;
	}

	public void setGcmUserKey(Long gcmUserKey) {
		this.gcmUserKey = gcmUserKey;
	}

	public Timestamp getLogInTime() {
		return logInTime;
	}

	public void setLogInTime(Timestamp logInTime) {
		this.logInTime = logInTime;
	}

	public Timestamp getLogOffTime() {
		return logOffTime;
	}

	public void setLogOffTime(Timestamp logOffTime) {
		this.logOffTime = logOffTime;
	}

	public String getIpInfo() {
		return ipInfo;
	}

	public void setIpInfo(String ipInfo) {
		this.ipInfo = ipInfo;
	}

	public String getBrowserInfo() {
		return browserInfo;
	}

	public void setBrowserInfo(String browserInfo) {
		this.browserInfo = browserInfo;
	}

	public String getLogOffMode() {
		return logOffMode;
	}

	public void setLogOffMode(String logOffMode) {
		this.logOffMode = logOffMode;
	}
	

}
