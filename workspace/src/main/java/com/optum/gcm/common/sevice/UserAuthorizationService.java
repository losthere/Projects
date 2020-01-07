package com.optum.gcm.common.sevice;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserAuthorizationService {

	private static final String QUERY_AUTHORIZED_USER = "SELECT count(1) IS_AUTHORIZED FROM GCM_USER_REST_SVC_VW where uuid=:UUID and upper(gcm_rest_resource) = upper(:GCM_REST_RESOURCE)";

	private static final String QUERY_ANONYMOUS_USER = "SELECT COUNT(1) IS_ANONYMOUS FROM GCM_REST_SVC GRS, GCM_REST_SVC_INTERFACE GSI "
			+ "WHERE UPPER(GRS.GCM_REST_RESOURCE)= upper(:GCM_REST_RESOURCE) "
			+ "AND GRS.GCM_REST_SVC_INTERFACE_KEY=GSI.GCM_REST_SVC_INTERFACE_KEY "
			+ "AND GSI.GCM_REST_SVC_INTERFACE_NAME='AnonymousWSI'";

	@Autowired
	private CommonJpaService commonJpaService;

	private static final Logger LOG = LoggerFactory.getLogger(UserAuthorizationService.class);

	public boolean isAuthorizedUser(String uuid, String restResource) {
		Map<String, Object> params = new HashMap<>();
		params.put("UUID", uuid);
		params.put("GCM_REST_RESOURCE", restResource);
		int status = commonJpaService.getResultObject(QUERY_AUTHORIZED_USER, params, Integer.class);

		if (LOG.isDebugEnabled()) {
			LOG.debug("Authorization status {}", status);
		}

		if (status > 0) {
			return true;
		}

		int isAnonymous = commonJpaService.getResultObject(QUERY_ANONYMOUS_USER, params, Integer.class);

		if (isAnonymous > 0) {
			return true;
		}

		return false;
	}
}
