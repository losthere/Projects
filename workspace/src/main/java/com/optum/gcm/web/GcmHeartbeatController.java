
package com.optum.gcm.web;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GcmHeartbeatController {
	
	@GetMapping("/heartbeat")
	public String heartbeat() {
		return HttpStatus.OK.name();
	}
}

