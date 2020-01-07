package com.optum.gcm.common.dao;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.commons.lang3.reflect.FieldUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.RowMapper;

import com.optum.gcm.common.annotation.Column;

public class GenericRowMapper<T> extends ResultSetTransformSupport implements RowMapper<T> {

	private static final Logger LOG = LoggerFactory.getLogger(GenericRowMapper.class);

	private Class<T> resultType;

	public GenericRowMapper(Class<T> resultType) {
		this.resultType = resultType;
	}

	@SuppressWarnings("unchecked")
	public T mapRow(ResultSet resultSet, int row) throws SQLException {
		//LOG.debug("Row Mapping start for the object type : " + resultType.getSimpleName());
		T result = null;
		try {
			if (isValidDataType(resultType)) {
				result = (T) getColumnValue(resultSet, 1, resultType);
			} else {
				result = resultType.newInstance();
				for (Field field : FieldUtils.getFieldsListWithAnnotation(resultType, Column.class)) {
					//LOG.debug("Value mapping for the field : " + field.getName());
					for (Annotation annotation : field.getDeclaredAnnotations()) {
						if (annotation instanceof Column) {
							Column column = (Column) annotation;
							field.setAccessible(true);
							field.set(result, getColumnValue(resultSet, column.value(), field.getType()));
						}
					}
				}
			}
		} catch (InstantiationException | IllegalAccessException e) {
			LOG.error("Error occured : ", e);
			throw new SQLException(e);
		}
		//LOG.debug("Row Mapping end..");
		return result;
	}

}
