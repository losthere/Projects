package com.optum.gcm.common.util;

import static com.optum.gcm.common.util.AnnotationParserConstants.AND;
import static com.optum.gcm.common.util.AnnotationParserConstants.COMMA;
import static com.optum.gcm.common.util.AnnotationParserConstants.DERIVED_QUERY;
import static com.optum.gcm.common.util.AnnotationParserConstants.DOT;
import static com.optum.gcm.common.util.AnnotationParserConstants.HASH;
import static com.optum.gcm.common.util.AnnotationParserConstants.SINGLE_QUOTE;
import static com.optum.gcm.common.util.AnnotationParserConstants.WHERE;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.Collection;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.optum.gcm.common.annotation.FilterMapping;
import com.optum.gcm.model.AssignInventorySearchFilter;
import com.optum.gcm.model.SchedulingSearchFilter;


public class QueryBuilderUtil {

	private static final Logger LOG = LoggerFactory.getLogger(QueryBuilderUtil.class);

	public static <T> String getWhere(Class<T> filter, Object obj,
									  Map<String, Object> params) {

		StringBuilder where = new StringBuilder();
		try {
			Method[] decMethods = filter.getDeclaredMethods();
			for (Method method : decMethods) {
				Annotation[] annotations = method.getDeclaredAnnotations();
				for (Annotation annotation : annotations) {
					if (annotation instanceof FilterMapping) {
						Object val = method.invoke(obj, new Object[] {});
						FilterMapping column = (FilterMapping) annotation;
						String bindVar = column.columnName();
						if (column.columnName().contains(DOT)) {
							bindVar = column.columnName().substring(
									column.columnName().lastIndexOf(DOT) + 1);
						}
						if (column.queryColumn().length() > 0) {
							bindVar = column.queryColumn();
						}
						if ("GCM_BUS_FUNC_STATUS".equals(bindVar) && "INITIAL".equals(getStringValue(val))) {
							where.append(" AND BVF.GCM_BUS_FUNC_STATUS NOT IN ('INITIAL') ");
							continue;
						}
						if (hasValue(val)) {
							if (column.isDerivedQuery()) {
								String derivedWhere = getWhere(
										method.getReturnType(), val, params);
								if (StringUtils.isNotBlank(derivedWhere)) {
									where.append(AND);
									column.operation().buildQueryPart(where,
											column, bindVar);
									String derivedQuery = column.query()
											.replace(WHERE, derivedWhere);
									int start = where.indexOf(DERIVED_QUERY);
									int end = start + DERIVED_QUERY.length();
									where.replace(start, end, derivedQuery);
								}
							} else {
								where.append(AND);
								column.operation().buildQueryPart(where,
										column, bindVar);
								params.put(bindVar, val);
							}
						} else if (column.defalutValues().length > 0) {
							where.append(AND);
							column.defaultOperation().buildQueryPart(where,
									column, bindVar);
							if (column.defalutValues().length >= 1) {
								int start = where
										.indexOf(HASH + bindVar + HASH);
								int end = start
										+ (HASH + bindVar + HASH).length();
								where.replace(
										start,
										end,
										SINGLE_QUOTE
												+ StringUtils.join(
												column.defalutValues(),
												SINGLE_QUOTE + COMMA
														+ SINGLE_QUOTE)
												+ SINGLE_QUOTE);
							} else {
								params.put(bindVar, column.defalutValues()[0]);
							}
						}
					}
				}
			}
		} catch (Exception e) {
			LOG.error("Exception : ", e);
		}
		return where.toString();
	}

	private static boolean hasValue(Object val) {
		if (val != null) {
			if (val instanceof String) {
				if (StringUtils.isNotBlank(((String) val))) {
					return true;
				}
			} else if (val instanceof Number) {
				if (((Number) val).doubleValue() > 0) {
					return true;
				}
			} else if (val instanceof Collection<?>) {
				if (((Collection<?>) val).size() > 0) {
					return true;
				}
			} else {
				return true;
			}
		}
		return false;
	}

	public static String getWhereClause(SchedulingSearchFilter schScrFilter,
										Map<String, Object> map) {
		StringBuilder whereClause = new StringBuilder(100);

		if (schScrFilter != null) {

			if (schScrFilter.getSpecialCategory() != null
					&& StringUtils
					.isNotBlank(schScrFilter.getSpecialCategory())) {
				whereClause.append(" AND SPECIAL_CATEGORY = :SPECIAL_CATEGORY ");
				map.put("SPECIAL_CATEGORY", schScrFilter.getSpecialCategory());
			}

			if (schScrFilter.getProjYear() != null) {
				whereClause.append(" AND GCM_PROJECT_YEAR = :GCM_PROJECT_YEAR ");
				map.put("GCM_PROJECT_YEAR", schScrFilter.getProjYear());
			}

			if (StringUtils.isNotBlank(schScrFilter.getProjectName())) {
				whereClause.append(" AND GCM_PROJ_KEY IN (SELECT GCM_PROJ_KEY FROM GCM_PROJECT WHERE GCM_PROJ_NAME = :GCM_PROJ_NAME) " );
				map.put("GCM_PROJ_NAME", schScrFilter.getProjectName().trim());
			}

			if (StringUtils.isNotBlank(schScrFilter.getBusSegment())) {
				whereClause.append(" AND WI.GCM_BUSINESS_SEGMENT = :GCM_BUSINESS_SEGMENT ");
				map.put("GCM_BUSINESS_SEGMENT", schScrFilter.getBusSegment()
						.trim());
			}

			if (schScrFilter.getClientKey() != null) {
				whereClause.append(" AND WI.GCM_HP_KEY IN (SELECT H.GCM_HP_KEY FROM GCM_CLIENT C, GCM_HP H WHERE C.GCM_CLIENT_KEY = H.GCM_CLIENT_KEY AND C.GCM_CLIENT_KEY = :GCM_CLIENT_KEY ) ");
				map.put("GCM_CLIENT_KEY", schScrFilter.getClientKey());
			}

			if (schScrFilter.getHpKey() != null && schScrFilter.getHpKey() > 0) {
				whereClause.append(" AND WI.GCM_HP_KEY = :GCM_HP_KEY ");
				map.put("GCM_HP_KEY", schScrFilter.getHpKey());
			}

			if (StringUtils.isNotBlank(schScrFilter.getHpProduct())) {
				whereClause.append(" AND WI.GCM_HP_PRODUCT = :GCM_HP_PRODUCT ");
				map.put("GCM_HP_PRODUCT", schScrFilter.getHpProduct().trim());
			}
			if (schScrFilter.getProjectKey() != null
					&& schScrFilter.getProjectKey() > 0) {
				whereClause.append(" AND WI.GCM_PROJ_KEY = :GCM_PROJ_KEY ");
				map.put("GCM_PROJ_KEY", schScrFilter.getProjectKey());
			}

			if (StringUtils.isNotBlank(schScrFilter.getProviderGroup())) {
				whereClause.append(" AND PROV_GRP_ID = :PROV_GRP_ID ");
				map.put("PROV_GRP_ID", schScrFilter.getProviderGroup());
			}
			if (StringUtils.isNotBlank(schScrFilter.getProviderId())) {
				whereClause.append(" AND SOURCE_SYSTEM_PROV_ID = :SOURCE_SYSTEM_PROV_ID ");
				map.put("SOURCE_SYSTEM_PROV_ID", schScrFilter.getProviderId());
			}
			if (StringUtils.isNotBlank(schScrFilter.getProvGroupName())) {
				whereClause.append(" AND PROV_GRP_NAME = :PROV_GRP_NAME ");
				map.put("PROV_GRP_NAME", schScrFilter.getProvGroupName().trim());
			}

			if (StringUtils.isNotBlank(schScrFilter.getProvLastName())) {
				whereClause.append(" AND PROV_LAST_NAME = :PROV_LAST_NAME ");
				map.put("PROV_LAST_NAME", schScrFilter.getProvLastName().trim());
			}

			if (StringUtils.isNotBlank(schScrFilter.getProvFirstName())) {
				whereClause.append(" AND PROV_FIRST_NAME = :PROV_FIRST_NAME ");
				map.put("PROV_FIRST_NAME", schScrFilter.getProvFirstName()
						.trim());
			}

			if (schScrFilter.getLoginUserKey() != null) {
				map.put("GCM_LOGIN_USER_KEY", schScrFilter.getLoginUserKey());
			}

			if(null != schScrFilter.getBusFuncDtlKey() && schScrFilter.getBusFuncDtlKey() > 0){
				whereClause.append(" AND GCM_BUS_FUNC_DETAIL_KEY = :GCM_BUS_FUNC_DETAIL_KEY ");
				map.put("GCM_BUS_FUNC_DETAIL_KEY", schScrFilter.getBusFuncDtlKey());
			}
		}

		return whereClause.toString();
	}


	public static String getWhereClauseforCoding(SchedulingSearchFilter schScrFilter,
												 Map<String, Object> map) {
		StringBuilder whereClause = new StringBuilder(100);

		if (schScrFilter != null) {

			if (schScrFilter.getProjYear() != null) {
				whereClause.append(" AND V.GCM_PROJECT_YEAR = :GCM_PROJECT_YEAR ");
				map.put("GCM_PROJECT_YEAR", schScrFilter.getProjYear());
			}

			if (StringUtils.isNotBlank(schScrFilter.getProjectName())) {
				whereClause.append(" AND V.GCM_PROJ_KEY IN (SELECT GCM_PROJ_KEY FROM GCM_PROJECT WHERE GCM_PROJ_NAME = :GCM_PROJ_NAME) ");
				map.put("GCM_PROJ_NAME", schScrFilter.getProjectName().trim());
			}

			if (StringUtils.isNotBlank(schScrFilter.getBusSegment())) {
				whereClause.append(" AND V.GCM_BUSINESS_SEGMENT = :GCM_BUSINESS_SEGMENT ");
				map.put("GCM_BUSINESS_SEGMENT", schScrFilter.getBusSegment()
						.trim());
			}

			if (schScrFilter.getClientKey() != null) {
				whereClause.append(" AND V.GCM_HP_KEY IN (SELECT H.GCM_HP_KEY FROM GCM_CLIENT C, GCM_HP H WHERE C.GCM_CLIENT_KEY = H.GCM_CLIENT_KEY AND C.GCM_CLIENT_KEY = :GCM_CLIENT_KEY ) ");
				map.put("GCM_CLIENT_KEY", schScrFilter.getClientKey());
			}

			if (schScrFilter.getHpKey() != null && schScrFilter.getHpKey() > 0) {
				whereClause.append(" AND V.GCM_HP_KEY = :GCM_HP_KEY ");
				map.put("GCM_HP_KEY", schScrFilter.getHpKey());
			}

			if (StringUtils.isNotBlank(schScrFilter.getHpProduct())) {
				whereClause.append(" AND V.GCM_HP_PRODUCT = :GCM_HP_PRODUCT ");
				map.put("GCM_HP_PRODUCT", schScrFilter.getHpProduct().trim());
			}
			if (schScrFilter.getProjectKey() != null
					&& schScrFilter.getProjectKey() > 0) {
				whereClause.append(" AND V.GCM_PROJ_KEY = :GCM_PROJ_KEY ");
				map.put("GCM_PROJ_KEY", schScrFilter.getProjectKey());
			}

			if (StringUtils.isNotBlank(schScrFilter.getChartId())) {
				whereClause.append(" AND V.GCM_PROJ_CONTENT_BARCODE = :GCM_PROJ_CONTENT_BARCODE ");
				map.put("GCM_PROJ_CONTENT_BARCODE", schScrFilter.getChartId());
			}

			if (schScrFilter.getLoginUserKey() != null) {
				map.put("GCM_LOGIN_USER_KEY", schScrFilter.getLoginUserKey());
			}

		}

		return whereClause.toString();
	}

	public static String getAssignedToWhere(AssignInventorySearchFilter search,
											Map<String, Object> params) {
		StringBuilder whereClause = new StringBuilder(354);

		if (StringUtils.isNotBlank(search.getProvGroupName())) {
			whereClause.append(" AND PROV_GRP_NAME = :PROV_GRP_NAME ");
			params.put("PROV_GRP_NAME", search.getProvGroupName().trim());
		}
		if(StringUtils.isNotBlank(search.getProvId())){
			whereClause.append(" AND SOURCE_SYSTEM_PROV_ID = :PROV_ID ");
			params.put("PROV_ID", search.getProvId().trim());
		}

		if (StringUtils.isNotBlank(search.getProvPhone())) {
			whereClause.append(" AND PROV_PHONE = :PROV_PHONE ");
			params.put("PROV_PHONE", search.getProvPhone().trim());
		} else if (StringUtils.isBlank(search.getProvPhone())) {
			whereClause.append(" AND PROV_PHONE IS NULL ");
		}

		if (StringUtils.isNotBlank(search.getProvFax())) {
			whereClause.append(" AND PROV_FAX = :PROV_FAX ");
			params.put("PROV_FAX", search.getProvFax().trim());
		} else if (StringUtils.isBlank(search.getProvFax())) {
			whereClause.append(" AND PROV_FAX IS NULL ");
		}

		if (StringUtils.isNotBlank(search.getProvName())) {
			String pname[] = search.getProvName().split(",");
			if (StringUtils.isNotBlank(pname[0])) {
				whereClause.append(" AND PROV_LAST_NAME = :PROV_LAST_NAME ");
				params.put("PROV_LAST_NAME", pname[0]);
			}
			if (StringUtils.isNotBlank(pname[1])) {
				whereClause.append(" AND PROV_FIRST_NAME = :PROV_FIRST_NAME ");
				params.put("PROV_FIRST_NAME", pname[1].trim());
			}
		}
		if (StringUtils.isNotBlank(search.getProvId())) {
			whereClause.append(" AND SOURCE_SYSTEM_PROV_ID = :SOURCE_SYSTEM_PROV_ID ");
			params.put("SOURCE_SYSTEM_PROV_ID", search.getProvId());
		}

		if (StringUtils.isNotBlank(search.getProvLocation())) {
			whereClause.append(" AND PROVIDER_ADDRESS = :PROVIDER_ADDRESS ");
			params.put("PROVIDER_ADDRESS", search.getProvLocation());
		} else {
			whereClause.append(" AND PROVIDER_ADDRESS IS NULL ");
		}

		if (StringUtils.isNotBlank(search.getSpecialCategory())) {
			whereClause.append(" AND SPECIAL_CATEGORY = :SPECIAL_CATEGORY");
			params.put("SPECIAL_CATEGORY", search.getSpecialCategory().trim());
		} else {
			whereClause.append(" AND SPECIAL_CATEGORY IS NULL");
		}

		if (StringUtils.isNotBlank(search.getSpecialNotes())) {
			whereClause.append(" AND SPECIAL_NOTES = :SPECIAL_NOTES ");
			params.put("SPECIAL_NOTES", search.getSpecialNotes().trim());
		} else {
			whereClause.append(" AND SPECIAL_NOTES IS NULL ");
		}
		if(null != search.getBusFuncDtlKey() && search.getBusFuncDtlKey() > 0){
			whereClause.append(" AND GCM_BUS_FUNC_DETAIL_KEY = :GCM_BUS_FUNC_DETAIL_KEY ");
			params.put("GCM_BUS_FUNC_DETAIL_KEY", search.getBusFuncDtlKey());
		}

		return whereClause.toString();
	}
	private static String getStringValue(Object val){
		if(val != null && val instanceof String){
			return (String)val;
		}
		return null;
	}
}