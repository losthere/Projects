package com.optum.gcm.common.dao;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.optum.gcm.common.annotation.Column;
import com.optum.gcm.model.KeyValue;
import com.optum.gcm.model.Pagination;

@Repository
public class CommonJpaDaoImpl implements CommonJpaDao {

	private NamedParameterJdbcTemplate jdbcTemplate;

	@Autowired
	private PaginationQueryBuilder paginationQueryBuilder;

	@Autowired
	public CommonJpaDaoImpl(DataSource dataSource) {
		this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}

	@Override
	public <T> List<T> getResultList(String query, Map<String, ?> params, Class<T> resultType, Pagination pagination) {
		String paginatedQuery = paginationQueryBuilder.getPaginatedQuery(query, pagination);
		if (StringUtils.isBlank(paginatedQuery)) {
			paginatedQuery = query;
		}
		return jdbcTemplate.query(paginatedQuery, params, new GenericRowMapper<T>(resultType));
	}

	@Override
	public <T> T getResultObject(String query, Map<String, ?> params, Class<T> resultType) throws EmptyResultDataAccessException{
		return jdbcTemplate.queryForObject(query, params, new GenericRowMapper<T>(resultType));		
	}

	@Override
	public <K, V> Map<K, V> getResultMap(String query, Map<String, ?> params, Class<K> keyType, Class<V> valueType) {
		return jdbcTemplate.query(query, params, new MapResultSetExtractor<K, V>(keyType, valueType));
	}

	@Override
	public <K, V> Map<K, List<V>> getResultMapWithList(String query, Map<String, ?> params, Class<K> keyType,
			Class<V> valueType) {
		return jdbcTemplate.query(query, params, new MapListExtractor<K, V>(keyType, valueType));
	}

	@Override
	public Map<String, Object> getResultMap(String query, Map<String, ?> params) {
		return jdbcTemplate.queryForMap(query, params);
	}

	@Override
	public <T> Long persist(T t){
		Map<String, ?> params =  getParams(t);
		Long sequence = (Long) params.remove("primary_key");
		jdbcTemplate.update(getPersistQuery(t, params), params);
		 
		 return sequence;
	}

	@Override
	public int update(String query, Map<String, ?> params) {
		return jdbcTemplate.update(query, params);
	}
	
	@Override
	public <K, V> List<KeyValue<K, V>> getKeyKeyValueResults(String query, Map<String, ?> params, Class<K> keyType) {
		return jdbcTemplate.query(query, params, new KeyValueResultMapper<>(keyType));
	}
	
	@Override
	public int[] batchUpdate(String query, Map<String, ?>[] params) {
		return jdbcTemplate.batchUpdate(query, params);
	}

	@SuppressWarnings("unchecked")
	@Override
	public <T> Long[] persist(List<T> objs) {
		String query = "";
		Long[] keys = new Long[objs.size()];
		Map<String, ?>[] params = new HashMap[objs.size()];
		int index = 0;
		for(T t : objs) {
			params[index] = getParams(t);
			keys[index] = (Long) params[index].remove("primary_key");
			 
			if(index == 0) {
				query = getPersistQuery(t, params[0]);
			}
			index ++;
		}
		batchUpdate(query, params);
		
		return keys;
	}
	
	private <T> String getPersistQuery(T t, Map<String, ?> params) {
		String query = "INSERT INTO ";
		String tableName = getTableName(t);
		if(StringUtils.isBlank(tableName)) {
			throw new RuntimeException("Table name is not present.");
		}
		String columns = "";
		String values = "";
		for(String key : params.keySet()) {
			values += ":" + key + ",";
			columns +=  key + ",";
		}
		return query + tableName + "(" + StringUtils.removeEnd(columns, ",") + ")" + " VALUES(" + StringUtils.removeEnd(values, ",") + ")";
	}
	
	private <T> String getTableName(T t) {
		Class<?> persistClass = t.getClass();
		for (Annotation annotation : persistClass.getDeclaredAnnotations()) {
			if (annotation instanceof Table) {
				Table table = (Table) annotation;
				return table.value();
			}
		}
		return null;
	}

	private <T> Map<String, ?> getParams(T t) {
		Class<?> persistClass = t.getClass();
		Map<String, Object> params = new HashMap<String, Object>();
		buildParams(t, persistClass, params);
		buildParams(t, persistClass.getSuperclass(), params);
		return params;
	}
	
	private <T> void buildParams(T t, Class<?> persistClass, Map<String, Object> params) {
		for (Field field : FieldUtils.getFieldsListWithAnnotation(persistClass, Column.class)) {
			for (Annotation annotation : field.getDeclaredAnnotations()) {
				if (annotation instanceof Column) {
					Column column = (Column) annotation;
					if (StringUtils.isBlank(column.sequence())) {
						try {
							field.setAccessible(true);
							params.put(column.value(), field.get(t));
						} catch (IllegalArgumentException | IllegalAccessException e) {
							throw new RuntimeException("Unable to retrieve the value from Object");
						}
					} else {
						@SuppressWarnings("unchecked")
						Long sequence = jdbcTemplate.queryForObject(
								"SELECT " + column.sequence() + ".NEXTVAL FROM DUAL", Collections.EMPTY_MAP,
								Long.class);
						params.put(column.value(), sequence);
						params.put("primary_key", sequence);
					}
				}
			}
		}
	}
}
