package com.optum.gcm.web;

import java.sql.SQLException;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.GcmProject;
import com.optum.gcm.model.RestResponse;

@RestController
public class ProjectController {

	private static final Logger LOG = LoggerFactory.getLogger(ProjectController.class);

	@Autowired
	private CommonJpaService commonJpaService;
	
	@PostMapping(value = "/createproject", consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public RestResponse<List<GcmProject>> createProject(@Valid @RequestBody GcmProject project) throws SQLException {
		LOG.info("Create project start.");
		RestResponse<List<GcmProject>> restResponse = new RestResponse<List<GcmProject>>();
		commonJpaService.persist(project);
		LOG.info("Create project end.");
		return restResponse;
	}
}
