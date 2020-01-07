package com.optum.gcm.wadl;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControllerTest {

	@GetMapping
	public String testGet() {
		return "Test Success";
	}
	
	@PostMapping
	public String testPost() {
		return "Test Success";
	}
	
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public String badRequest() {
		return "Bad Request";
	}
}
