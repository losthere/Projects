package com.optum.gcm.common.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

public class MapResultSetExtractor<K, V> extends ResultSetTransformSupport implements ResultSetExtractor<Map<K, V>> {

	private Class<K> keyType;
	private Class<V> valueType;

	public MapResultSetExtractor(Class<K> keyType, Class<V> valueType) {
		this.keyType = keyType;
		this.valueType = valueType;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Map<K, V> extractData(ResultSet resultSet) throws SQLException, DataAccessException {
		Map<K, V> result = new LinkedHashMap<>();
		if (isValidDataType(valueType)) {
			while (resultSet.next()) {
				result.put((K) getColumnValue(resultSet, 1, keyType), (V) getColumnValue(resultSet, 2, valueType));
			}
		} else {
			int row = 1;
			GenericRowMapper<V> rowMapper = new GenericRowMapper<>(valueType);
			while (resultSet.next()) {
				result.put((K) getColumnValue(resultSet, 1, keyType), rowMapper.mapRow(resultSet, row++));
			}
		}
		return result;
	}

}
