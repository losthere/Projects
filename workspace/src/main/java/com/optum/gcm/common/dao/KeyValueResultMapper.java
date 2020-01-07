package com.optum.gcm.common.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.optum.gcm.model.KeyValue;

public class KeyValueResultMapper<K, V> extends ResultSetTransformSupport implements RowMapper<KeyValue<K, V>> {
	
	private Class<K> keyType;
	
	public KeyValueResultMapper(Class<K> keyType) {
		this.keyType = keyType;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public KeyValue<K, V> mapRow(ResultSet rs, int rowNum) throws SQLException {
		KeyValue<K, V> keyValue = new KeyValue<>();
		keyValue.setKey((K)getColumnValue(rs, "KEY", keyType));
		keyValue.setValue((V)rs.getString("VALUE"));
		return keyValue;
	}
}
