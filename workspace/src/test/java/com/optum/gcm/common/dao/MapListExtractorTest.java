package com.optum.gcm.common.dao;


import java.sql.ResultSet;
import java.sql.SQLException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.dao.DataAccessException;
@RunWith(PowerMockRunner.class)
public class MapListExtractorTest {
	@Mock
    private ResultSet rs;
	@Test
	public void test() throws DataAccessException, SQLException {
		@SuppressWarnings("rawtypes")
		MapListExtractor MapLis=new MapListExtractor<>(String.class, String.class);
		PowerMockito.when(rs.next()).thenReturn(true).thenReturn(true).thenReturn(false);
		MapLis.extractData(rs);
	}
	@Test
	public void test1() throws DataAccessException, SQLException {
		@SuppressWarnings("rawtypes")
		MapListExtractor MapLis=new MapListExtractor<>(String.class, Exception.class);
		PowerMockito.when(rs.next()).thenReturn(true).thenReturn(true).thenReturn(false);
		MapLis.extractData(rs);
	}

}
