package com.optum.gcm.common;

import static com.optum.gcm.common.util.LoggingUtil.logInfo;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.WebContentInterceptor;

import com.optum.gcm.common.sevice.UserAuthorizationService;
import com.optum.gcm.model.UserResource;
import com.optum.gcm.sevice.UserCreationService;
import com.optum.gcm.web.util.WebUtil;

public class SecurityInterceptor extends WebContentInterceptor {

	private static final Logger LOG = LoggerFactory.getLogger(SecurityInterceptor.class);

	@Value("${APP_AUTH_TOKEN}")
	private String appAuthToken;

	@Value("${auth.landing.url}")
	private String appLaunchUrl;

	@Value("${ciox.landing.url}")
	private String cioxLaunchUrl;

	@Autowired
	private UserAuthorizationService authorizationService;

	@Autowired
	private UserCreationService userCreationService;

	private static final List<String> PNPROLES = Arrays.asList("PNPP", "PNPM");

	public SecurityInterceptor() {
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
		String uuid = (String) request.getAttribute("uuid");
		String restResource = request.getServletPath();
		if (StringUtils.isNotBlank(WebUtil.getCookieValue(request.getCookies(), "USERNAME"))) {
			MDC.put("USERNAME", WebUtil.getCookieValue(request.getCookies(), "USERNAME"));
		}
		if (StringUtils.equals(appAuthToken, request.getHeader("APP_AUTH_TOKEN"))
				&& authorizationService.isAuthorizedUser(uuid, restResource)) {
			if (restResource.equals(appLaunchUrl)) {
				UserResource resource = userCreationService.createUser(
						WebUtil.getCookieValue(request.getCookies(), "USERNAME"), uuid,
						(String) request.getAttribute("firstname"), (String) request.getAttribute("lastname"),
						(String) request.getAttribute("email"), request.getHeader("x-forwarded-for"),
						request.getHeader("user-agent"));
				if(resource != null && resource.getUserKey() !=null) {
					userCreationService.recordUserLogin(Long.parseLong(resource.getUserKey()),request.getHeader("x-forwarded-for"),
							request.getHeader("user-agent"));
				}
				if (resource == null) {
					response.setStatus(HttpStatus.UNAUTHORIZED.value());
					MDC.remove("USERNAME");
					return false;
				} else if (StringUtils.isNotBlank(cioxLaunchUrl) && isUserHasPnpRole(resource)) {
					LOG.info("User has pnp role..... {}", resource.getUserId());
					try {
						response.sendRedirect(cioxLaunchUrl);
					} catch (IOException e) {
						LOG.error("Exception while redirecting.. ", e);
					}
					MDC.remove("USERNAME");
					return false;
				}
			}
			logInfo(LOG, true, "Security Authentication for user: {} is true for resource: {}",
					WebUtil.getCookieValue(request.getCookies(), "USERNAME"), restResource.toLowerCase());
			return true;
		}
		response.setStatus(HttpStatus.FORBIDDEN.value());
		logInfo(LOG, true, "Security Authentication for user: {} is false for resource: {}",
				WebUtil.getCookieValue(request.getCookies(), "USERNAME"), restResource);
		MDC.remove("USERNAME");
		return false;
	}

	private boolean isUserHasPnpRole(UserResource resource) {
		if (resource != null && !CollectionUtils.isEmpty(resource.getGcmUserVendorRole())) {
			long pnpCount = resource.getGcmUserVendorRole().stream()
					.filter(vr -> PNPROLES.contains(vr.getGcmRoleCode())).count();
			long nonPnpCount = resource.getGcmUserVendorRole().stream()
					.filter(vr -> !PNPROLES.contains(vr.getGcmRoleCode())).count();
			if (pnpCount > 0 && nonPnpCount == 0) {
				return true;
			}
		}
		return false;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		super.postHandle(request, response, handler, modelAndView);
		MDC.remove("USERNAME");
	}

}
