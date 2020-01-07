package com.optum.gcm.sevice;

import static com.optum.gcm.common.util.LoggingUtil.logInfo;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.optum.gcm.common.dao.CommonJpaDao;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.common.sevice.StoredProcedureService;
import com.optum.gcm.dao.constants.UtilityQueries;
import com.optum.gcm.model.ProjectCloseInfo;
import com.optum.gcm.model.ProjectCloseUtility;
import com.optum.gcm.model.ProjectFileListInfo;
import com.optum.gcm.model.SearchChartInput;
import com.optum.gcm.model.SearchFilter;
import com.optum.gcm.model.SearchResult;
import com.optum.gcm.model.UtilitiesFilter;

/**
 * @author pmule
 *
 */

@Service
public class UtilitiesService {

	private static final Logger LOG = LoggerFactory.getLogger(UtilitiesService.class);

	@Autowired
	private CommonJpaService commonJpaService;

	@Autowired
	private CommonJpaDao commonJpaDao;

	@Autowired
	private StoredProcedureService storedProcedureService;

	public List<ProjectFileListInfo> getProjectListforRelease(UtilitiesFilter utilitiesFilter) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		StringBuilder str=new StringBuilder(1000);
		//String queryString = UtilityQueries.QUERY_GET_PROJECT_LIST;
		str.append(UtilityQueries.QUERY_GET_PROJECT_LIST);
		if (utilitiesFilter != null && utilitiesFilter.getCreateDate() != null
				&& StringUtils.isNotBlank(utilitiesFilter.getCreateDate())) {
			//queryString +=
			str.append(" AND TO_CHAR(F.CREATE_DATE_TIME) BETWEEN TO_DATE(:CREATEDATE,'MM/DD/YYYY') AND TO_DATE(:CREATEDATE,'MM/DD/YYYY') ") ;
			params.put("CREATEDATE", utilitiesFilter.getCreateDate());
		}
		if (utilitiesFilter != null && utilitiesFilter.getFileName() != null
				&& StringUtils.isNotBlank(utilitiesFilter.getFileName())) {
			str.append(" AND UPPER(F.FILE_NAME) LIKE UPPER(:FILE_NAME )") ;
			params.put("FILE_NAME", "%" + utilitiesFilter.getFileName() + "%");
		}
		if (utilitiesFilter != null && null != utilitiesFilter.getVendorKey() && utilitiesFilter.getVendorKey()!=0L) {
			str.append(" AND p.region = (SELECT region FROM gcm_vendor WHERE gcm_vendor_key = :GCM_VENDOR_KEY ) ");
			params.put("GCM_VENDOR_KEY", utilitiesFilter.getVendorKey());
		}
		if (utilitiesFilter != null && StringUtils.isNotBlank(utilitiesFilter.getRegion())) {
			params.put("REGION", utilitiesFilter.getRegion());
		}
		
		if (utilitiesFilter != null) {
			params.put("GCM_GROUP_KEY", utilitiesFilter.getGroupKey());
		}
		logInfo(LOG, "getProjectListforRelease started with filter: ");
		return commonJpaService.getResultList(str.toString(), params, ProjectFileListInfo.class);
	}

	@Transactional
	public List<Long> releaseProject(UtilitiesFilter[] utilitiesFilters) throws SQLException {
		List<Long> notUpdatedIds = new ArrayList<Long>();
		for (UtilitiesFilter utilitiesFilter : utilitiesFilters) {
			Map<String, Object> params = new HashMap<>();
			String queryString = UtilityQueries.QUERY_UPDATE_PROJECT_RELEASE;
			params.put("GCM_PROJ_KEY", utilitiesFilter.getProjKey());
			params.put("GCM_CHASE_FILE_KEY", utilitiesFilter.getFileKey());
			params.put("MODIFY_USERID", utilitiesFilter.getRequestedUser());
			int cnt = commonJpaDao.update(queryString, params);
			logInfo(LOG, "No.of Rows updated : {}", cnt);
			if (cnt <= 0 && utilitiesFilter.getProjKey() != null) {
				notUpdatedIds.add(utilitiesFilter.getProjKey());
			}
		}
		return notUpdatedIds;
	}

	@Transactional
	public List<Long> deleteProject(UtilitiesFilter[] utilitiesFilters) throws SQLException {
		List<Long> notUpdatedIds = new ArrayList<Long>();
		for (UtilitiesFilter utilitiesFilter : utilitiesFilters) {
			Map<String, Object> params = new HashMap<>();
			String queryString = UtilityQueries.QUERY_UPDATE_PROJECT_DELETE;
			params.put("GCM_PROJ_KEY", utilitiesFilter.getProjKey());
			params.put("GCM_CHASE_FILE_KEY", utilitiesFilter.getFileKey());
			params.put("MODIFY_USERID", utilitiesFilter.getRequestedUser());
			int cnt = commonJpaDao.update(queryString, params);
			logInfo(LOG, "No.of Rows updated : {}", cnt);
			if (cnt <= 0) {
				notUpdatedIds.add(utilitiesFilter.getProjKey());
			}
		}
		return notUpdatedIds;
	}

	public List<SearchResult> getSearchResultsByMember(SearchFilter searchFilter) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		String queryString = UtilityQueries.FUNC_SEARCH_BY_MEMBER;
		prepareInputForSearch(searchFilter, params);
		params.put("p_hp_mbr_id", searchFilter.getMemberId());
		params.put("p_mbr_last_name", searchFilter.getMemberLastName());
		params.put("p_mbr_first_name", searchFilter.getMemberFirstName());
		params.put("p_mbr_gender", searchFilter.getMemberGender());
		params.put("p_mbr_dob", searchFilter.getMemberDOB());
		params.put("p_project_year", searchFilter.getProjYear());
		params.put("p_status", searchFilter.getStatus());
		logInfo(LOG, "getSearchResultsByMember started with filter: ");
		List<SearchResult> searchResults = commonJpaService.getResultList(queryString, params, SearchResult.class);
		for (SearchResult searchResult : searchResults) {
			if (searchResult.getBusFuncKey() == 7L) {
				searchResult.setDisableHyperLink1(true);
			} else if (searchResult.getDisableHyperLink().equalsIgnoreCase("Y")) {
				searchResult.setDisableHyperLink1(true);
			} else {
				searchResult.setDisableHyperLink1(false);
			}
		}
		return searchResults;

	}

	public List<SearchResult> getSearchResultsByProvider(SearchFilter searchFilter) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		String queryString = UtilityQueries.FUNC_SEARCH_BY_PROVIDER;
		prepareInputForSearch(searchFilter, params);
		params.put("p_provider_id", searchFilter.getProviderId());
		params.put("p_prov_last_name", searchFilter.getProvLastName());
		params.put("p_prov_first_name", searchFilter.getProvFirstName());
		params.put("p_prov_grp_name", searchFilter.getProvGroupName());
		params.put("p_project_year", searchFilter.getProjYear());
		params.put("p_status", searchFilter.getStatus());
		logInfo(LOG, "getSearchResultsByProvider started with filter: ");
		List<SearchResult> searchResults = commonJpaService.getResultList(queryString, params, SearchResult.class);
		for (SearchResult searchResult : searchResults) {
			if (searchResult.getBusFuncKey() == 7L) {
				searchResult.setDisableHyperLink1(true);
			} else if (searchResult.getDisableHyperLink().equalsIgnoreCase("Y")) {
				searchResult.setDisableHyperLink1(true);
			}
			else {
				searchResult.setDisableHyperLink1(false);
			}
		}
		return searchResults;
	}
	
	public List<SearchResult> getSearchResultsByClientInternalId(SearchFilter searchFilter) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		String queryString = UtilityQueries.FUNC_SEARCH_BY_CLIENTID;
		prepareInputForSearch(searchFilter, params);
		params.put("p_client_internal_id", searchFilter.getClientInternalId());
		params.put("p_project_year", searchFilter.getProjYear());
		params.put("p_status", searchFilter.getStatus());
		logInfo(LOG, "getSearchResultsByClientInternalId started with filter: ");
		List<SearchResult> searchResults = commonJpaService.getResultList(queryString, params, SearchResult.class);
		for (SearchResult searchResult : searchResults) {
			if (searchResult.getBusFuncKey() == 7L) {
				searchResult.setDisableHyperLink1(true);
			} else if (searchResult.getDisableHyperLink().equalsIgnoreCase("Y")) {
				searchResult.setDisableHyperLink1(true);
			}
			else {
				searchResult.setDisableHyperLink1(false);
			}
		}
		return searchResults;
	}
	
	public List<SearchResult> getSearchResultsByChartId(SearchFilter searchFilter) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		String queryString = UtilityQueries.FUNC_SEARCH_BY_CHARTID;
		prepareInputForSearch(searchFilter, params);
		params.put("p_chart_id", searchFilter.getChartId());
		params.put("p_project_year", searchFilter.getProjYear());
		params.put("p_status", searchFilter.getStatus());
		logInfo(LOG, "getSearchResultsByChartId started with filter: ");
		List<SearchResult> searchResults = commonJpaService.getResultList(queryString, params, SearchResult.class);
		for (SearchResult searchResult : searchResults) {
			if (searchResult.getBusFuncKey() == 7L) {
				searchResult.setDisableHyperLink1(true);
			} else if (searchResult.getDisableHyperLink().equalsIgnoreCase("Y")) {
				searchResult.setDisableHyperLink1(true);
			}
			else {
				searchResult.setDisableHyperLink1(false);
			}
		}
		return searchResults;
	}
	
	private void prepareInputForSearch(SearchFilter searchFilter, Map<String, Object> params){
		params.put("p_group_key", searchFilter.getGroupKey());
		params.put("p_user_key", searchFilter.getLoginUserKey());
		params.put("p_vendor_key", searchFilter.getVendorKey());
		params.put("p_business_segment", searchFilter.getBusSegment());
		params.put("p_region", searchFilter.getRegion());
		params.put("p_proj_key", searchFilter.getProjectKey() == null || searchFilter.getProjectKey() == 0 ? "" : searchFilter.getProjectKey());
		params.put("p_image_name", searchFilter.getImageName());
	}

	public String closeProjectwithExtract(ProjectCloseUtility projectCloseUtility) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		String P_OUT_STATUS = "P_OUT_STATUS";
		params.put("p_proj_key", projectCloseUtility.getProjKey());
		params.put("p_userid", projectCloseUtility.getUserId());
		params.put("p_ext_img_ind", projectCloseUtility.getIsImgExt() ? "Y" : "N");
		logInfo(LOG, true, "closeProjectwithExtract started with search filter: {} ", projectCloseUtility.getProjKey());
		return storedProcedureService.callStoredProc(UtilityQueries.QUERY_UPDATE_PROJECT_CLOSING, params, P_OUT_STATUS);
	}

	public List<ProjectCloseInfo> getProjectListforClose(UtilitiesFilter utilitiesFilter) throws SQLException {
		logInfo(LOG, "getProjectListforClose started with filter: ");
		Map<String, Object> params = new HashMap<>();
		String queryString = "";
		String where = "";
		if (utilitiesFilter != null && utilitiesFilter.getProjKey() != null && utilitiesFilter.getProjKey() > 0) {
			where += " AND p.GCM_PROJ_KEY = :GCM_PROJ_KEY ";
			params.put("GCM_PROJ_KEY", utilitiesFilter.getProjKey());
		}
		if (utilitiesFilter != null && utilitiesFilter.getProjYear() != null && utilitiesFilter.getProjYear() > 0) {
			where += " AND p.GCM_PROJECT_YEAR = :GCM_PROJECT_YEAR ";
			params.put("GCM_PROJECT_YEAR", utilitiesFilter.getProjYear());
		}

		if (utilitiesFilter != null && utilitiesFilter.getBusSegment() != null
				&& StringUtils.isNotBlank(utilitiesFilter.getBusSegment())) {
			where += " AND p.GCM_BUSINESS_SEGMENT = :GCM_BUSINESS_SEGMENT ";
			params.put("GCM_BUSINESS_SEGMENT", utilitiesFilter.getBusSegment());
		}
		if (utilitiesFilter != null && StringUtils.isNotBlank(utilitiesFilter.getRegion())) {
			where += " AND p.REGION = :REGION ";
			params.put("REGION", utilitiesFilter.getRegion());
		}
		queryString = UtilityQueries.QUERY_GET_PROJECTS_FORCLOSE.replace("#WHERE#", where);
		if (null != utilitiesFilter) {
			params.put("GCM_GROUP_KEY", utilitiesFilter.getGroupKey());
		}
		return commonJpaService.getResultList(queryString, params, ProjectCloseInfo.class);

	}

	@Transactional
	public void updateSearchChartStatus(SearchChartInput searchChartInput) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		String queryString = "";
		params.put("GCM_BUS_FUNC_STATUS", searchChartInput.getToBusFuncStatus());
		params.put("GCM_PROJECT_CONTENT_KEY", searchChartInput.getProjContentKey());
		params.put("GCM_PROJ_CONT_BUS_FUNC_VEN_KEY", searchChartInput.getBusFuncVenKey());
		params.put("GCM_BUSINESS_FUNC_KEY", searchChartInput.getBusFuncKey());
		params.put("GCM_PROJ_KEY", searchChartInput.getProjKey());
		params.put("MODIFY_USERID", searchChartInput.getRequestedUserId());
		params.put("GCM_REASON_COMMENT", searchChartInput.getReasonComment());
		params.put("GCM_REASON_CODE", searchChartInput.getReasonCode());
		params.put("GCM_RET_WI_KEY", searchChartInput.getRetWiKey());

		if (searchChartInput != null) {
			if (searchChartInput.getRetWiKey() != null && searchChartInput.getRetWiKey() > 0
					&& searchChartInput.getBusFuncKey() > 0) {
				queryString = UtilityQueries.QUERY_UPDATE_SEARCHCHART_STATUS_FORRETWI;

			}

			if (searchChartInput.getBusFuncVenKey() != null && searchChartInput.getBusFuncVenKey() > 0
					&& searchChartInput.getBusFuncKey() > 0) {
				queryString = UtilityQueries.QUERY_UPDATE_SEARCHCHART_STATUS;

			}
		}
		logInfo(LOG, "updateSearchChartStatus started with filter: ");
		commonJpaService.update(queryString, params);

	}

}