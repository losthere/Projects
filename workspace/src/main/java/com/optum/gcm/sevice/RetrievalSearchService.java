package com.optum.gcm.sevice;

import static com.optum.gcm.common.util.LoggingUtil.logDebug;
import static com.optum.gcm.dao.constants.RetrievalSearchQueries.HINT_FULL_BVF;
import static com.optum.gcm.dao.constants.RetrievalSearchQueries.QUERY_EXPAND_PROJECT;
import static com.optum.gcm.dao.constants.RetrievalSearchQueries.QUERY_GET_ASSIGNABLE_VENDORS;
import static com.optum.gcm.dao.constants.RetrievalSearchQueries.QUERY_GET_ASSIGNABLE_VENDORS_BY_HP_CLIENT;
import static com.optum.gcm.dao.constants.RetrievalSearchQueries.QUERY_HP_BY_PROJECT;
import static com.optum.gcm.dao.constants.RetrievalSearchQueries.QUERY_SEARCH_PROJECTS;
import static com.optum.gcm.dao.constants.RetrievalSearchQueries.QUERY_USER_HAS_BUS_SEGMENTS;
import static com.optum.gcm.dao.constants.RetrievalSearchQueries.QUERY_USER_HAS_PROGRAMS;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.optum.gcm.common.constants.StatusFlag;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.common.util.QueryBuilderUtil;
import com.optum.gcm.constants.BusinessFunctionStatuses.RetrievalStatuses;
import com.optum.gcm.model.AssignableVendorsInput;
import com.optum.gcm.model.KeyValue;
import com.optum.gcm.model.RetrievalHpVendorStatusCount;
import com.optum.gcm.model.RetrievalHpVendorStatusCountResult;
import com.optum.gcm.model.RetrievalSearchFilter;
import com.optum.gcm.model.RetrievalSearchInput;
import com.optum.gcm.model.RetrievalSearchResult;

@Service
public class RetrievalSearchService {
	@Autowired
	private CommonJpaService commonJpaService;
	
	private static final Logger LOG = LoggerFactory.getLogger(RetrievalSearchService.class);

/*	@Autowired
	private RetrievalSearchDao retrievalSearchDao;*/

	public boolean userHasPrograms(String userId) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("USERID", userId);
			String flag = commonJpaService.getResultObject(QUERY_USER_HAS_PROGRAMS, params, String.class);
			if (StatusFlag.YES.name().equals(flag)) {
				return true;
			}
		} catch (EmptyResultDataAccessException e) {
			LOG.error("Error occured in RetrievalSearchService.userHasPrograms ",e);}
		return false;
	}

	public boolean userHasBusinesSegments(String userId) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("USERID", userId);
			String flag = commonJpaService.getResultObject(QUERY_USER_HAS_BUS_SEGMENTS, params, String.class);
			if (StatusFlag.YES.name().equals(flag)) {
				return true;
			}
		} catch (EmptyResultDataAccessException e) {
			LOG.error("Error occured in RetrievalSearchService.userHasBusinesSegments ",e);}
		return false;
	}

	public List<RetrievalSearchResult> getProjects(RetrievalSearchInput retrievalSearchFilter) {
		if (userHasPrograms(retrievalSearchFilter.getProgramsByUser()) && StringUtils.isBlank(retrievalSearchFilter.getProgram())) {
			retrievalSearchFilter.setProgramsByUser(retrievalSearchFilter.getProgramsByUser());
		}
		Map<String, Object> params = new HashMap<String, Object>();
		String where = QueryBuilderUtil.getWhere(RetrievalSearchFilter.class, retrievalSearchFilter, params);
		String queryString = QUERY_SEARCH_PROJECTS.replace("#WHERE#", where);
		if (isHintRequiredForProjectSearch(retrievalSearchFilter)) {
			queryString = queryString.replaceFirst("#HINT#", HINT_FULL_BVF);
		} else {
			queryString = queryString.replaceFirst("#HINT#", "");
		}
		params.put("GCM_GROUP_KEY", retrievalSearchFilter.getGroupKey());
		LOG.error("getProjects Query With Filters:: "+queryString + " ::Params:: "+params.entrySet());
		List<RetrievalSearchResult> projects = commonJpaService.getResultList(queryString, params,
				RetrievalSearchResult.class);
		return projects;
	}

	
	public List<RetrievalSearchResult> getHealthPlansByProject(RetrievalSearchFilter retrievalSearchFilter) {
		if (userHasPrograms(retrievalSearchFilter.getProgramsByUser()) && StringUtils.isBlank(retrievalSearchFilter.getProgram())) {
			retrievalSearchFilter.setProgramsByUser(retrievalSearchFilter.getProgramsByUser());
		}
		Map<String, Object> params = new HashMap<String, Object>();
		String where = QueryBuilderUtil.getWhere(RetrievalSearchFilter.class, retrievalSearchFilter, params);
		String queryString = QUERY_HP_BY_PROJECT.replace("#WHERE#", where);
		if (isHintRequiredForProjectSearch(retrievalSearchFilter)) {
			queryString = queryString.replaceFirst("#HINT#", HINT_FULL_BVF);
		} else {
			queryString = queryString.replaceFirst("#HINT#", "");
		}
		List<RetrievalSearchResult> projects = commonJpaService.getResultList(queryString, params,
				RetrievalSearchResult.class);
		return projects;
	}

	
	private boolean isHintRequiredForProjectSearch(RetrievalSearchFilter retrievalSearchFilter) {
		if (retrievalSearchFilter.getVendorKey() != null || retrievalSearchFilter.getHpKey() != null
				|| StringUtils.isNotBlank(retrievalSearchFilter.getStatus())
				|| (retrievalSearchFilter.getProviderFilter() != null && (StringUtils
						.isNotBlank(retrievalSearchFilter.getProviderFilter().getProvState()) || StringUtils
								.isNotBlank(retrievalSearchFilter.getProviderFilter().getProvLastName())))) {
			return false;
		}
		return true;
	}

	public List<RetrievalHpVendorStatusCountResult> getDetailCountByProject(RetrievalSearchFilter retrievalSearchFilter) {
		Map<String, Object> params = new HashMap<String, Object>();
		String where = QueryBuilderUtil.getWhere(RetrievalSearchFilter.class, retrievalSearchFilter, params);
		String queryString = QUERY_EXPAND_PROJECT.replace("#WHERE#", where);
		List<RetrievalHpVendorStatusCount> statusCountList =  commonJpaService.getResultList(queryString, params,	RetrievalHpVendorStatusCount.class);
		Map<String, RetrievalHpVendorStatusCountResult> hpVendorStatusCountMap = new HashMap<>();
		for (RetrievalHpVendorStatusCount statusCountObj : statusCountList) {
			String key = statusCountObj.getHpKey() + "|" + statusCountObj.getVendorKey();
			if (hpVendorStatusCountMap.containsKey(key)) {
				RetrievalHpVendorStatusCountResult responseObj = hpVendorStatusCountMap.get(key);
				List<KeyValue<String, Integer>> statusObjList = responseObj.getStatusCountObj();
				statusObjList.add(new KeyValue<String, Integer>(statusCountObj.getStatus(), statusCountObj.getStatusCnt()));
				responseObj.setStatusCountObj(statusObjList);
			}else {
				RetrievalHpVendorStatusCountResult responseObj = new RetrievalHpVendorStatusCountResult();
				responseObj.setProjYear(statusCountObj.getProjYear());
				responseObj.setProjKey(statusCountObj.getProjKey());
				responseObj.setProgramKey(statusCountObj.getProgramKey());
				responseObj.setHpKey(statusCountObj.getHpKey());
				responseObj.setHpCd(statusCountObj.getHpCd());
				responseObj.setClient(statusCountObj.getClient());
				responseObj.setVendor(statusCountObj.getVendor());
				responseObj.setVendorKey(statusCountObj.getVendorKey());
				List<KeyValue<String, Integer>> statusObjList = new ArrayList<KeyValue<String, Integer>>();
				statusObjList.add(new KeyValue<String, Integer>(statusCountObj.getStatus(), statusCountObj.getStatusCnt()));
				responseObj.setStatusCountObj(statusObjList);
				hpVendorStatusCountMap.put(key, responseObj);
			}
		}

		List<KeyValue<String, Integer>> status;
		for (RetrievalHpVendorStatusCountResult hpVendorStatusCount : hpVendorStatusCountMap.values()) {
			status = hpVendorStatusCount.getStatusCountObj();
			hpVendorStatusCount.setTotalCount(getTotalCount(status));
			hpVendorStatusCount.setAssignableCount(getAssignableCount(status));
			hpVendorStatusCount.setCompletedCount(getCompletedCount(status));
			hpVendorStatusCount.setExtractedCount(getExtractedCount(status));
		}
		return new ArrayList<>(hpVendorStatusCountMap.values());
	}
	
	public List<KeyValue<String, String>> getAssignableVendors(AssignableVendorsInput assinableVendorInp){
		Map<String, Object> params = new HashMap<String, Object>();
		logDebug(LOG, true, "proDetails : {} :BusSegment: {} " , assinableVendorInp.getProjDetails(),assinableVendorInp.getBusinessSegment());
		String queryString = QUERY_GET_ASSIGNABLE_VENDORS;
		params.put("P_PROJ_DET", assinableVendorInp.getProjDetails());
		params.put("P_BUSINESS_SEGMENT", assinableVendorInp.getBusinessSegment());
		return commonJpaService.getKeyKeyValueResults(queryString, params,	String.class);
	}
	
	
	public List<KeyValue<String, String>> getAssignableVendorsByHPnClient(AssignableVendorsInput assinableVendorInp){
		Map<String, Object> params = new HashMap<String, Object>();
		logDebug(LOG, true, "proDetails : {} :BusSegment: {} " , assinableVendorInp.getProjDetails(),assinableVendorInp.getBusinessSegment());
		String queryString = QUERY_GET_ASSIGNABLE_VENDORS_BY_HP_CLIENT;
		params.put("P_PROJ_DET", assinableVendorInp.getProjDetails());
		params.put("P_REC_BUSINESS_SEGMENT", assinableVendorInp.getBusinessSegment());
		params.put("P_USER_KEY", assinableVendorInp.getUserKey());
		params.put("P_GROUP_KEY", assinableVendorInp.getGroupKey());
		params.put("P_VENDOR_KEY", assinableVendorInp.getVendorKey());
		params.put("P_REC_PROJ_KEY", assinableVendorInp.getProjKey());
		params.put("P_REC_PROGRAM_KEY", assinableVendorInp.getProgramKey());
		params.put("P_REC_VENDOR_KEY", assinableVendorInp.getRecVendorKey());
		params.put("P_REC_HP_KEY", assinableVendorInp.getHpKey());
		params.put("P_REC_CLIENT_KEY", assinableVendorInp.getClientKey());
		return commonJpaService.getKeyKeyValueResults(queryString, params,	String.class);
	}
	
	
	
	
	public static Integer getTotalCount(List<KeyValue<String,Integer>> statusCounts) {
		int count = 0;
		for (KeyValue<String,Integer> keyValue : statusCounts) {
			count += keyValue.getValue();
		}
		return count;
	}

	public static Integer getAssignableCount(List<KeyValue<String,Integer>> statusCounts) {
		int count = 0;
		for (RetrievalStatuses status : RetrievalStatuses.ASSIGNABLE) {
			KeyValue<String,Integer> result = getKeyValue(statusCounts, status.name());
			if (result != null) {
				count += result.getValue();
			}
		}
		return count;
	}

	public static Integer getCompletedCount(List<KeyValue<String,Integer>> statusCounts) {
		int count = 0;
		for (RetrievalStatuses status : RetrievalStatuses.COMPLETED) {
			KeyValue<String,Integer> result = getKeyValue(statusCounts, status.name());
			if (result != null) {
				count += result.getValue();
			}
		}
		return count;
	}

	public static Integer getExtractedCount(List<KeyValue<String,Integer>> statusCounts) {
		int totalCount = getTotalCount(statusCounts);
		for (RetrievalStatuses status : RetrievalStatuses.NON_EXTRACTED) {
			KeyValue<String,Integer> result = getKeyValue(statusCounts, status.name());
			if (result != null) {
				totalCount -= result.getValue();
			}
		}
		return totalCount;
	}
	
	private static KeyValue<String,Integer> getKeyValue(List<KeyValue<String,Integer>> statusCounts, String key) {
		for (KeyValue<String,Integer> keyValue : statusCounts) {
			if (key.equals(keyValue.getKey())) {
				return keyValue;
			}
		}
		return null;
	}
}
