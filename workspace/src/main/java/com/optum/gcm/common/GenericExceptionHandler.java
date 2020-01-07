package com.optum.gcm.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.optum.gcm.model.RestResponse;

@RestControllerAdvice
public class GenericExceptionHandler {

	private static final Logger LOG = LoggerFactory.getLogger(GenericExceptionHandler.class);
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<RestResponse<Object>> handleException(Exception e, WebRequest request) {
		RestResponse<Object> errorResponse = new RestResponse<Object>();
		errorResponse.setErrorMessage("Exception while processing the request.");
		if (e instanceof MethodArgumentNotValidException) {
			MethodArgumentNotValidException bindException = (MethodArgumentNotValidException) e;
			errorResponse.setResult(bindException.getBindingResult().getAllErrors());
			errorResponse.setErrorMessage("Validation errors.");
		}
		LOG.error("Exception occured : ", e);
		return new ResponseEntity<RestResponse<Object>>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
