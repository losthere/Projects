package com.optum.gcm.common.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class KeyValueResultMapperTest { 
	
	@Mock
	private ResultSet rs ;
	
	@Test
	public void test() throws SQLException {
		KeyValueResultMapper key=new KeyValueResultMapper(String.class);
		PowerMockito.when(rs.getString("test")).thenReturn("KEY VALUE");
		key.mapRow(rs, 8);
		
	
		
	}

	}
	
	
