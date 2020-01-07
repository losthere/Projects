package com.optum.gcm.common.dao;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import com.optum.gcm.model.Pagination;

@Component
public class PaginationQueryBuilder {
	private static final String SORT_PART = " ORDER BY ";
	private static final String SELECT = "SELECT ";
	private static final String FROM = " FROM ";
	private static final String ASTERISK = "*";
	private static final String DOT = ".";
	private static final String SPACE = " ";
	private static final String TEMP_TABLE_1 = "pg_t1";
	private static final String TEMP_TABLE_2 = "pg_t2";
	private static final String LETF_PARENTHESIS = "(";
	private static final String RIGHT_PARENTHESIS = ")";
	private static final String COMMA = ",";
	private static final String ROWNUM = "ROWNUM";
	private static final String ROWNUM_ALIAS = "ROW_NUM";
	private static final String LESS_THAN_EQUAL = " <= ";
	private static final String BETWEEN = " BETWEEN ";
	private static final String WHERE = " WHERE ";
	private static final String AND = " AND ";

	public String getPaginatedQuery(String query, Pagination pagination) {
		if (pagination != null) {
			StringBuilder paginatedQuery = new StringBuilder();
			if (pagination.getPageStart() > 0) {
				paginatedQuery.append(SELECT);
				paginatedQuery.append(TEMP_TABLE_2);
				paginatedQuery.append(DOT);
				paginatedQuery.append(ASTERISK);
				paginatedQuery.append(SPACE);
				paginatedQuery.append(FROM);
				paginatedQuery.append(LETF_PARENTHESIS);
			}
			if (pagination.getPageEnd() > 0) {
				paginatedQuery.append(SELECT);
				paginatedQuery.append(TEMP_TABLE_1);
				paginatedQuery.append(DOT);
				paginatedQuery.append(ASTERISK);
				paginatedQuery.append(COMMA);
				paginatedQuery.append(SPACE);
				paginatedQuery.append(ROWNUM);
				paginatedQuery.append(SPACE);
				paginatedQuery.append(ROWNUM_ALIAS);
				paginatedQuery.append(SPACE);
				paginatedQuery.append(FROM);
				paginatedQuery.append(LETF_PARENTHESIS);
				paginatedQuery.append(query);
			} else {
				paginatedQuery.append(query);
			}
			if (StringUtils.isNoneBlank(pagination.getSortColumn())) {
				paginatedQuery.append(SORT_PART);
				paginatedQuery.append(pagination.getSortColumn());
				paginatedQuery.append(" ");
				if (StringUtils.isNoneBlank(pagination.getSortOrder())) {
					paginatedQuery.append(pagination.getSortOrder());
				}
			}
			if (pagination.getPageEnd() > 0) {
				paginatedQuery.append(RIGHT_PARENTHESIS);
				paginatedQuery.append(SPACE);
				paginatedQuery.append(TEMP_TABLE_1);
				paginatedQuery.append(WHERE);
				paginatedQuery.append(ROWNUM);
				paginatedQuery.append(LESS_THAN_EQUAL);
				paginatedQuery.append(pagination.getPageEnd());
			}
			if (pagination.getPageStart() > 0) {
				paginatedQuery.append(RIGHT_PARENTHESIS);
				paginatedQuery.append(SPACE);
				paginatedQuery.append(TEMP_TABLE_2);
				paginatedQuery.append(WHERE);
				paginatedQuery.append(ROWNUM_ALIAS);
				paginatedQuery.append(BETWEEN);
				paginatedQuery.append(pagination.getPageStart() + 1);
				paginatedQuery.append(AND);
				paginatedQuery.append(pagination.getPageEnd());
			}
			return paginatedQuery.toString();
		}
		return "";
	}

}
