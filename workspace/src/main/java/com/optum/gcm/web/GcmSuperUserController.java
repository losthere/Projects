package com.optum.gcm.web;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.GCMUser;
import com.optum.gcm.model.GcmOidcUserTracking;
import com.optum.gcm.sevice.UserCreationService;
import com.optum.gcm.web.util.WebUtil;

@Controller
public class GcmSuperUserController {

	private static final Logger LOG = LoggerFactory.getLogger(GcmSuperUserController.class);

	@Autowired
	private CommonJpaService commonJpaService;

	@Autowired
	private UserCreationService userCreationService;

	@PostMapping("/switchuser")
	public void switchUser(@RequestParam String userId, HttpServletRequest request, HttpServletResponse response) {
		GCMUser user = userCreationService.getUser(userId);
		if (user != null) {
			GcmOidcUserTracking userTracking = new GcmOidcUserTracking();
			userTracking.setState(String.valueOf(System.nanoTime()));
			userTracking.setAuthToken(RandomStringUtils.randomAlphanumeric(100));
			userTracking.setExpiresIn(1799);
			userTracking.setUuid(user.getUuID());
			userTracking.setFirstName(user.getFirstName());
			userTracking.setLastName(user.getLastName());
			userTracking.setEmail(user.getEmail());
			userTracking.setUserName(userId);
			commonJpaService.persist(userTracking);
			WebUtil.removeCookie(request, response);
			WebUtil.putUserToCookie(response, userCreationService.getEncryptedString(userTracking.getAuthToken(), ""),
					user.getUserID(), request.getHeader("X-Forwarded-Host"));
			try {
				response.sendRedirect("/app/default.htm");
			} catch (IOException e) {
				LOG.error("Exception occured : ", e);
			}
		}
	}
}
