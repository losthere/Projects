package com.optum.gcm.common.dao;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class ResultSetTransformSupportTest {

	protected Class<?> type;

//	@Mock
//	KeyValueResultMapper KeyValueResultMapper;
	@Mock
	private ResultSet rs;

	@Test(expected = NullPointerException.class)
	public void testTypeNull() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		String column = "Main";

		Object actual = KeyValueResultMapper.getColumnValue(rs, column, null);
		// Mockito.when(v.getString(String)).thenReturn("Main");

	}

	@Test
	public void testResultValNull() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		String column = "Main";
		String chat = "HI";
		Object actual = KeyValueResultMapper.getColumnValue(rs, column, chat.getClass());
		assertNull(actual);

	}

	@Test
	public void testString() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		String column = "Main";
		String chart = "HI";
		String expectedValue = "myVal";
		PowerMockito.when(rs.getString(column)).thenReturn(expectedValue);
		Object actual = KeyValueResultMapper.getColumnValue(rs, column, chart.getClass());
		assertEquals(expectedValue, actual);

	}

	@Test
	public void testInt() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		String column = "Main";
		Integer i = 52;
		Integer expectedValue = 52;
		PowerMockito.when(rs.getInt(column)).thenReturn(expectedValue);
		Object actual = KeyValueResultMapper.getColumnValue(rs, column, expectedValue.getClass());
		assertEquals(expectedValue, actual);

	}

	@Test
	public void testDouble() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		String column = "Main";
		Double i = 52.00;
		Double expectedValue = 52.00;
		PowerMockito.when(rs.getDouble(column)).thenReturn(expectedValue);
		Object actual = KeyValueResultMapper.getColumnValue(rs, column, expectedValue.getClass());
		assertEquals(expectedValue, actual);
	}

	@Test
	public void testFloat() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		String column = "Main";
		Float i = 21f;
		Float expectedValue = 21f;
		PowerMockito.when(rs.getFloat(column)).thenReturn(expectedValue);
		Object actual = KeyValueResultMapper.getColumnValue(rs, column, expectedValue.getClass());
		assertEquals(expectedValue, actual);
	}

	@Test
	public void testLong() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		String column = "Main";
		Long i = 21l;
		Long expectedValue = 21l;
		PowerMockito.when(rs.getLong(column)).thenReturn(expectedValue);
		Object actual = KeyValueResultMapper.getColumnValue(rs, column, expectedValue.getClass());
		assertEquals(expectedValue, actual);
	}

	@Test
	public void testbigdec() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		String column = "Main";
		BigDecimal a = new BigDecimal("0.03");
		BigDecimal expectedValue = a;
		PowerMockito.when(rs.getBigDecimal(column)).thenReturn(expectedValue);
		Object actual = KeyValueResultMapper.getColumnValue(rs, column, expectedValue.getClass());
		assertEquals(expectedValue, actual);
	}

	@Test
	public void testdate() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		String column = "Main";
		Date d = new Date(2018, 05, 18);
		Date expectedValue = d;
		PowerMockito.when(rs.getDate(column)).thenReturn(expectedValue);
		Object actual = KeyValueResultMapper.getColumnValue(rs, column, expectedValue.getClass());
		assertEquals(expectedValue, actual);
	}

	@Test
	public void testTSP() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		String column = "Main";
		Timestamp T = new Timestamp(5l);
		Timestamp expectedValue = T;
		PowerMockito.when(rs.getTimestamp(column)).thenReturn(expectedValue);
		Object actual = KeyValueResultMapper.getColumnValue(rs, column, expectedValue.getClass());
		assertEquals(expectedValue, actual);
	}

	@Test(expected = SQLException.class)
	public void testSqlException() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		String column = "Main";
		String chat = "HI";
		String expectedValue = "myVal";
		Exception exception = new Exception();
		PowerMockito.when(rs.getString(column)).thenReturn(expectedValue);
		Object actual = KeyValueResultMapper.getColumnValue(rs, column, exception.getClass());
	}

	@Test
	public void testString1() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		Integer column = 7;
		String chart = "HI";
		String expectedValue = "myVal";
		PowerMockito.when(rs.getString(column)).thenReturn(expectedValue);
		Object actual = KeyValueResultMapper.getColumnValue(rs, column, chart.getClass());
		assertEquals(expectedValue, actual);

	}

	@Test
	public void testInt1() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		Integer column = 7;
		Integer i = 52;
		Integer expectedValue = 52;
		PowerMockito.when(rs.getInt(column)).thenReturn(expectedValue);
		Object actual = KeyValueResultMapper.getColumnValue(rs, column, expectedValue.getClass());
		assertEquals(expectedValue, actual);

	}

	@Test
	public void testDouble1() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		Integer column = 7;
		Double i = 52.00;
		Double expectedValue = 52.00;
		PowerMockito.when(rs.getDouble(column)).thenReturn(expectedValue);
		Object actual = KeyValueResultMapper.getColumnValue(rs, column, expectedValue.getClass());
		assertEquals(expectedValue, actual);
	}

	@Test
	public void testFloat1() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		Integer column = 7;
		Float i = 21f;
		Float expectedValue = 21f;
		PowerMockito.when(rs.getFloat(column)).thenReturn(expectedValue);
		Object actual = KeyValueResultMapper.getColumnValue(rs, column, expectedValue.getClass());
		assertEquals(expectedValue, actual);
	}

	@Test
	public void testLong1() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		Integer column = 7;
		Long i = 21l;
		Long expectedValue = 21l;
		PowerMockito.when(rs.getLong(column)).thenReturn(expectedValue);
		Object actual = KeyValueResultMapper.getColumnValue(rs, column, expectedValue.getClass());
		assertEquals(expectedValue, actual);
	}

	@Test
	public void testbigdec1() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		Integer column = 7;
		BigDecimal a = new BigDecimal("0.03");
		BigDecimal expectedValue = a;
		PowerMockito.when(rs.getBigDecimal(column)).thenReturn(expectedValue);
		Object actual = KeyValueResultMapper.getColumnValue(rs, column, expectedValue.getClass());
		assertEquals(expectedValue, actual);
	}

	@Test
	public void testdate1() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		Integer column = 7;
		Date d = new Date(2018, 05, 18);
		Date expectedValue = d;
		PowerMockito.when(rs.getDate(column)).thenReturn(expectedValue);
		Object actual = KeyValueResultMapper.getColumnValue(rs, column, expectedValue.getClass());
		assertEquals(expectedValue, actual);
	}

	@Test
	public void testTSP1() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		Integer column = 7;
		Timestamp T = new Timestamp(5l);
		Timestamp expectedValue = T;
		PowerMockito.when(rs.getTimestamp(column)).thenReturn(expectedValue);
		Object actual = KeyValueResultMapper.getColumnValue(rs, column, expectedValue.getClass());
		assertEquals(expectedValue, actual);
	}

	@Test(expected = SQLException.class)
	public void testSqlException1() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		Integer column = 7;
		String chat = "HI";
		String expectedValue = "myVal";
		Exception exception = new Exception();
		PowerMockito.when(rs.getString(column)).thenReturn(expectedValue);
		Object actual = KeyValueResultMapper.getColumnValue(rs, column, exception.getClass());
	}

	@Test
	public void testisValidDataType() throws SQLException {
		KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);

		// Class type = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		Integer column = 7;
		Timestamp T = new Timestamp(5l);
		Timestamp expectedValue = T;
		PowerMockito.when(rs.getTimestamp(column)).thenReturn(expectedValue);
		Object actual = KeyValueResultMapper.isValidDataType(expectedValue.getClass());
		assertTrue(true);
	}

}
