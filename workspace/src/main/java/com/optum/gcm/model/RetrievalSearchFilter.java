package com.optum.gcm.model;

import com.optum.gcm.common.annotation.FilterMapping;
import com.optum.gcm.common.annotation.FilterMapping.Operations;

public class RetrievalSearchFilter {
	private String busSegment;
	private String program;
	private Long programKey;
	private String projectName;
	private Long projectKey;
	private Integer projYear;
	private Long vendorKey;
	private Long clientKey;
	private Long hpKey;
	private String hpProduct;
	private String status;
	private String programsByUser;
	
	private RetrievalSearchProviderFilter providerFilter;

	@FilterMapping(columnName = "BVF.GCM_BUSINESS_SEGMENT")
	public String getBusSegment() {
		return busSegment;
	}

	public void setBusSegment(String busSegment) {
		this.busSegment = busSegment;
	}

	@FilterMapping(columnName = "BVF.GCM_PROGRAM_KEY", operation = Operations.IN, query = "SELECT PL.GCM_PROGRAM_KEY FROM GCM_PROGRAM_LIST PL WHERE GCM_PROGRAM_DISPLAY_NAME = :PROGRAM_GROUP", queryColumn = "PROGRAM_GROUP")
	public String getProgram() {
		return program;
	}

	public void setProgram(String program) {
		this.program = program;
	}

	@FilterMapping(columnName = "BVF.GCM_PROGRAM_KEY")
	public Long getProgramKey() {
		return programKey;
	}

	public void setProgramKey(Long programKey) {
		this.programKey = programKey;
	}

	@FilterMapping(columnName = "GCM_PROJ_NAME", operation = Operations.EXISTS, query = "SELECT GCM_PROJ_KEY FROM GCM_PROJECT WHERE UPPER(GCM_PROJ_NAME) LIKE UPPER(TRIM(:GCM_PROJ_NAME)) || '%' AND GCM_PROJ_KEY = BVF.GCM_PROJ_KEY")
	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	@FilterMapping(columnName = "BVF.GCM_PROJ_KEY")
	public Long getProjectKey() {
		return projectKey;
	}

	public void setProjectKey(Long projectKey) {
		this.projectKey = projectKey;
	}

	@FilterMapping(columnName = "BVF.GCM_PROJECT_YEAR")
	public Integer getProjYear() {
		return projYear;
	}

	public void setProjYear(Integer projYear) {
		this.projYear = projYear;
	}

	@FilterMapping(columnName = "BVF.GCM_VENDOR_KEY")
	public Long getVendorKey() {
		return vendorKey;
	}

	public void setVendorKey(Long vendorKey) {
		this.vendorKey = vendorKey;
	}

	@FilterMapping(columnName = "GCM_CLIENT_KEY", operation = Operations.EXISTS, query = "SELECT 1 FROM GCM_HP WHERE GCM_HP_KEY = BVF.GCM_HP_KEY AND GCM_CLIENT_KEY = :GCM_CLIENT_KEY")
	public Long getClientKey() {
		return clientKey;
	}

	public void setClientKey(Long clientKey) {
		this.clientKey = clientKey;
	}

	@FilterMapping(columnName = "BVF.GCM_HP_KEY")
	public Long getHpKey() {
		return hpKey;
	}

	public void setHpKey(Long hpKey) {
		this.hpKey = hpKey;
	}

	@FilterMapping(columnName = "BVF.GCM_HP_PRODUCT")
	public String getHpProduct() {
		return hpProduct;
	}

	public void setHpProduct(String hpProduct) {
		this.hpProduct = hpProduct;
	}

	@FilterMapping(columnName = "BVF.GCM_BUS_FUNC_STATUS", defalutValues = {"RECVD", "INACTIVATED", "DUPLICATE", "CANCELED", "PNPFINAL",
			"CNAFINAL", "SENT", "INITIAL" }, defaultOperation = Operations.NOTIN)
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@FilterMapping(columnName = "BVF.GCM_PROVIDER_KEY", operation = Operations.IN, query = "SELECT GCM_PROVIDER_KEY FROM GCM_PROVIDER PROV WHERE 1=1 #WHERE#", isDerivedQuery = true)
	public RetrievalSearchProviderFilter getProviderFilter() {
		return providerFilter;
	}

	public void setProviderFilter(RetrievalSearchProviderFilter providerFilter) {
		this.providerFilter = providerFilter;
	}

	@FilterMapping(columnName = "BVF.GCM_PROGRAM_KEY", operation = Operations.IN, query = "SELECT PL.GCM_PROGRAM_KEY FROM GCM_PROGRAM_LIST PL, "
			+ "GCM_BUS_SEGMENT_PROGRAM  BUS_SEG, GCM_USER_SKILL US, GCM_USER U WHERE PL.GCM_PROGRAM_KEY = BUS_SEG.GCM_PROGRAM_KEY AND "
			+ "BUS_SEG.GCM_BUSINESS_SEGMENT = :GCM_BUSINESS_SEGMENT AND US.GCM_SKILL_TYPE_KEY = 5 AND US.GCM_USER_KEY = U.GCM_USER_KEY AND "
			+ "U.USERID = :USERID AND PL.GCM_PARENT_PROGRAM_KEY = TO_NUMBER(US.GCM_SKILL_NAME) AND regexp_replace(US.GCM_SKILL_NAME,'[0-9]') is null", queryColumn = "USERID")
	public String getProgramsByUser() {
		return programsByUser;
	}

	public void setProgramsByUser(String programsByUser) {
		this.programsByUser = programsByUser;
	}

	
	
}
