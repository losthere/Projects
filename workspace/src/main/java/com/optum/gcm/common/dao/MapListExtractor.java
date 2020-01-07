package com.optum.gcm.common.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

public class MapListExtractor<K, V> extends ResultSetTransformSupport implements ResultSetExtractor<Map<K, List<V>>> {
	private Class<K> keyType;
	private Class<V> valueType;

	public MapListExtractor(Class<K> keyType, Class<V> valueType) {
		this.keyType = keyType;
		this.valueType = valueType;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Map<K, List<V>> extractData(ResultSet resultSet) throws SQLException, DataAccessException {
		Map<K, List<V>> result = new HashMap<>();
		if (isValidDataType(valueType)) {
			while (resultSet.next()) {
				K key = (K) getColumnValue(resultSet, 1, keyType);
				if (!result.containsKey(key)) {
					result.put(key, new ArrayList<V>());
				}
				result.get(key).add((V) getColumnValue(resultSet, 2, valueType));
			}
		} else {
			int row = 1;
			GenericRowMapper<V> rowMapper = new GenericRowMapper<>(valueType);
			while (resultSet.next()) {
				K key = (K) getColumnValue(resultSet, 1, keyType);
				if (!result.containsKey(key)) {
					result.put(key, new ArrayList<V>());
				}
				result.get(key).add(rowMapper.mapRow(resultSet, row++));
			}
		}
		return result;
	}

}
