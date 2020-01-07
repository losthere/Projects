package com.optum.gcm.common.sevice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.optum.gcm.common.dao.CommonJpaDao;
import com.optum.gcm.model.KeyValue;
import com.optum.gcm.model.Pagination;

@Service
public class CommonJpaServiceImpl implements CommonJpaService {

	@Autowired
	private CommonJpaDao commonJpaDao;

	@Override
	public <T> List<T> getResultList(String query, Class<T> resultType) {
		return getResultList(query, new HashMap<String, String>(), resultType, null);
	}

	@Override
	public <T> List<T> getResultList(String query, Map<String, ?> params, Class<T> resultType, Pagination pagination) {
		return commonJpaDao.getResultList(query, params, resultType, pagination);
	}

	@Transactional
	@Override
	public <T> Long persist(T t) {
		return commonJpaDao.persist(t);
	}

	@Override
	public <T> List<T> getResultList(String query, Map<String, ?> params, Class<T> resultType) {
		return getResultList(query, params, resultType, null);
	}

	@Override
	public <T> T getResultObject(String query, Class<T> resultType) {
		return getResultObject(query, new HashMap<String, String>(), resultType);
	}

	@Override
	public <T> T getResultObject(String query, Map<String, ?> params, Class<T> resultType) throws EmptyResultDataAccessException {
		return commonJpaDao.getResultObject(query, params, resultType);
	}

	@Override
	public <K, V> Map<K, V> getResultMap(String query, Class<K> keyType, Class<V> valueType) {
		return getResultMap(query, new HashMap<String, String>(), keyType, valueType);
	}

	@Override
	public <K, V> Map<K, V> getResultMap(String query, Map<String, ?> params, Class<K> keyType, Class<V> valueType) {
		return commonJpaDao.getResultMap(query, params, keyType, valueType);
	}

	@Override
	public <K, V> Map<K, List<V>> getResultMapWithList(String query, Class<K> keyType, Class<V> valueType) {
		return getResultMapWithList(query, new HashMap<String, String>(), keyType, valueType);
	}

	@Override
	public <K, V> Map<K, List<V>> getResultMapWithList(String query, Map<String, ?> params, Class<K> keyType,
			Class<V> valueType) {
		return commonJpaDao.getResultMapWithList(query, params, keyType, valueType);
	}

	@Override
	public Map<String, Object> getResultMap(String query, Map<String, ?> params) {
		return commonJpaDao.getResultMap(query, params);
	}

	@Transactional
	@Override
	public int update(String query, Map<String, ?> params) {
		return commonJpaDao.update(query, params);
	}
	
	@Override
	public <K, V> List<KeyValue<K, V>> getKeyKeyValueResults(String query, Map<String, ?> params, Class<K> keyType) {
		return commonJpaDao.getKeyKeyValueResults(query, params, keyType);
	}

	@Override
	public int[] batchUpdate(String query, Map<String, ?>[] params) {
		return commonJpaDao.batchUpdate(query, params);
	}

	@Override
	public <T> Long[] persist(List<T> t) {
		return commonJpaDao.persist(t);
	}
	
}
