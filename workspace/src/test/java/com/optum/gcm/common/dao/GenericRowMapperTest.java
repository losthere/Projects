package com.optum.gcm.common.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.model.GCMUser;


@RunWith(PowerMockRunner.class)
public class GenericRowMapperTest {
	
	/*@SuppressWarnings({ "rawtypes" })
	@InjectMocks
	private GenericRowMapper genericRowMapper;
	@Mock
	private ResultSet resultSet;

	@SuppressWarnings({ "unchecked" })
	@Test
	public <T> void testmapRow() throws SQLException {
		Class<T> resultType = (Class<T>) String.class;
		genericRowMapper = new GenericRowMapper<>(resultType);
		genericRowMapper.mapRow(resultSet, 5);
	}

	@SuppressWarnings({ "unchecked" })
	@Test
	public <T> void testmapRow1() throws SQLException {
		Class<T> resultType = (Class<T>) GcmCommonDateTime.class;
		genericRowMapper = new GenericRowMapper<>(resultType);
		genericRowMapper.mapRow(resultSet, 5);
	}

	@SuppressWarnings({ "unchecked" })
	@Test(expected = Exception.class)
	public <T> void testmapRow2() throws SQLException {
		Class<T> resultType = (Class<T>) List.class;
		genericRowMapper = new GenericRowMapper<>(resultType);
		genericRowMapper.mapRow(resultSet, 1);
	}
*/
	
	@SuppressWarnings({ "rawtypes" })
	@InjectMocks
	private GenericRowMapper genericRowMapper;
	@Mock
	private ResultSet rs;

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Test
	public void testmapRow() throws SQLException {
		GenericRowMapper Gen = new GenericRowMapper(String.class);
		PowerMockito.when(rs.getString("test")).thenReturn(null);
		Gen.mapRow(rs, 7);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Test
	public void testmapRow1() throws IllegalAccessException, SQLException {
		GenericRowMapper Gen = new GenericRowMapper(Exception.class);
		PowerMockito.when(rs.next()).thenReturn(true).thenReturn(true).thenReturn(false);
		Gen.mapRow(rs, 5);
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Test
	public void testmapRow2() throws IllegalAccessException, SQLException {
		GenericRowMapper Gen = new GenericRowMapper(Exception.class);
		PowerMockito.when(rs.next()).thenThrow(InstantiationException.class).thenThrow(IllegalAccessException.class);
		Gen.mapRow(rs, 5);
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Test
	public void testmapRow3() throws IllegalAccessException, SQLException {
		GenericRowMapper Gen = new GenericRowMapper(InternalError.class);
		PowerMockito.when(rs.next()).thenReturn(false).thenReturn(false).thenReturn(false);
		Gen.mapRow(rs, 5);
	}
	
	@SuppressWarnings({ "unchecked" })
	@Test
	public <T> void testmapRow4() throws SQLException {
		Class<T> resultType = (Class<T>) GCMUser.class;
		genericRowMapper = new GenericRowMapper<>(resultType);
		genericRowMapper.mapRow(rs, 5);
	}
}
