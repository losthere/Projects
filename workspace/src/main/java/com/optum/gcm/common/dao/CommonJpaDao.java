package com.optum.gcm.common.dao;

import java.util.List;
import java.util.Map;

import org.springframework.dao.EmptyResultDataAccessException;

import com.optum.gcm.model.KeyValue;
import com.optum.gcm.model.Pagination;

public interface CommonJpaDao {
	<T> List<T> getResultList(String query, Map<String, ?> params, Class<T> resultType, Pagination pagination);

	<T> T getResultObject(String query, Map<String, ?> params, Class<T> resultType) throws EmptyResultDataAccessException;

	<K, V> Map<K, V> getResultMap(String query, Map<String, ?> params, Class<K> keyType, Class<V> valueType);
	Map<String, Object> getResultMap(String query, Map<String, ?> params);
	<K, V> Map<K, List<V>> getResultMapWithList(String query, Map<String, ?> params, Class<K> keyType,
			Class<V> valueType);


	<T> Long persist(T t);
	<T> Long[] persist(List<T> t);
	
	int update(String query, Map<String, ?> params);
	
	<K, V> List<KeyValue<K, V>> getKeyKeyValueResults(String query, Map<String, ?> params, Class<K> keyType);
	
	int[] batchUpdate(String query, Map<String, ?>... params);
	
	
	
}
