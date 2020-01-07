package com.optum.gcm.model;

public class RestResponse<T> {
	public static final String SUCCESS = "SUCCESS";
	public static final String ERROR = "ERROR";
	private T result;
	private String status = ERROR;
	private String errorMessage;

	public RestResponse() {
	}

	public RestResponse(String status) {
		this.status = status;
	}
	
	public RestResponse(T result) {
		this.status = SUCCESS;
		this.result = result;
	}

	public T getResult() {
		return result;
	}

	public void setResult(T result) {
		this.result = result;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
}
