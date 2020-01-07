package com.optum.gcm.common.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class MapResultSetExtractorTest {
	@Mock
    private ResultSet rs;
	@Test
	public void test() throws SQLException {
		 
		 MapResultSetExtractor MapRes= new MapResultSetExtractor(String.class,String.class);
		 MapRes.extractData(rs);
	}
	@Test
	public void test1() throws SQLException {
		 
		 MapResultSetExtractor MapRes= new MapResultSetExtractor(String.class,String.class);
		 PowerMockito.when(rs.getString("test")).thenReturn("test");
		 PowerMockito.when(rs.next()).thenReturn(true).thenReturn(true).thenReturn(false);
		 MapRes.extractData(rs);
	}
	@Test
	public void test2() throws SQLException {
		 
		 MapResultSetExtractor MapRes= new MapResultSetExtractor(String.class,Exception.class);
		 PowerMockito.when(rs.getString("test")).thenReturn("test");
		 PowerMockito.when(rs.next()).thenReturn(true).thenReturn(true).thenReturn(false);
		 MapRes.extractData(rs);
	}
}
