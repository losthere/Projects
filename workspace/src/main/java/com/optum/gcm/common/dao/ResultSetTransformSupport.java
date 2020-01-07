package com.optum.gcm.common.dao;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

import org.apache.commons.lang3.ClassUtils;

public abstract class ResultSetTransformSupport {
	protected Object getColumnValue(ResultSet rs, String column, Class<?> type) throws SQLException {
		Object value;
		if (type.equals(String.class)) {
			value = rs.getString(column);
		} else if (type.equals(Date.class) || type.equals(java.util.Date.class)) {
			value = rs.getDate(column);
		} else if (type.equals(BigDecimal.class)) {
			value = rs.getBigDecimal(column);
		} else if (type.equals(Integer.TYPE) || type.equals(Integer.class)) {
			value = rs.getInt(column);
		} else if (type.equals(Double.TYPE) || type.equals(Double.class)) {
			value = rs.getDouble(column);
		} else if (type.equals(Float.TYPE) || type.equals(Float.class)) {
			value = rs.getFloat(column);
		} else if (type.equals(Long.TYPE) || type.equals(Long.class)) {
			value = rs.getLong(column);
		} else if (type.equals(Timestamp.class)) {
			value = rs.getTimestamp(column);
		} else {
			throw new SQLException("Invalid type defined for the column " + column
					+ ". Use the valid types String|Date|BigDecimal|Integer|Double|Float|Long|Timestamp.");
		}
		return (rs.wasNull() ? null : value);
	}

	protected Object getColumnValue(ResultSet rs, int column, Class<?> type) throws SQLException {
		Object value;
		if (type.equals(String.class)) {
			value = rs.getString(column);
		} else if (type.equals(Date.class) || type.equals(java.util.Date.class)) {
			value = rs.getDate(column);
		} else if (type.equals(BigDecimal.class)) {
			value = rs.getBigDecimal(column);
		} else if (type.equals(Integer.TYPE) || type.equals(Integer.class)) {
			value = rs.getInt(column);
		} else if (type.equals(Double.TYPE) || type.equals(Double.class)) {
			value = rs.getDouble(column);
		} else if (type.equals(Float.TYPE) || type.equals(Float.class)) {
			value = rs.getFloat(column);
		} else if (type.equals(Long.TYPE) || type.equals(Long.class)) {
			value = rs.getLong(column);
		} else if (type.equals(Timestamp.class)) {
			value = rs.getTimestamp(column);
		} else {
			throw new SQLException("Invalid type defined for the column index " + column
					+ ". Use the valid types String|Date|BigDecimal|Integer|Double|Float|Long|Timestamp.");
		}
		return (rs.wasNull() ? null : value);
	}

	protected <T> boolean isValidDataType(Class<T> type) {
		if (ClassUtils.isPrimitiveOrWrapper(type) || type.equals(String.class) || type.equals(Date.class)
				|| type.equals(Timestamp.class) || type.equals(java.sql.Date.class)
				|| type.equals(java.util.Date.class)) {
			return true;
		}
		return false;
	}
}
