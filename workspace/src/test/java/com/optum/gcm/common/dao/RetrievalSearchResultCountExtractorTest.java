package com.optum.gcm.common.dao;

import static org.junit.Assert.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.powermock.api.mockito.PowerMockito;
import org.springframework.dao.DataAccessException;

import com.optum.gcm.model.RetrievalHpVendorStatusCount;

@RunWith(MockitoJUnitRunner.class)
public class RetrievalSearchResultCountExtractorTest {
	
	
	@Mock
    private ResultSet rs;
	@Test
	public void test() throws DataAccessException, SQLException {
		/*KeyValueResultMapper KeyValueResultMapper = new KeyValueResultMapper<>(String.class);
		KeyValueResultMapper.*/
		RetrievalSearchResultCountExtractor rse=new RetrievalSearchResultCountExtractor();
		PowerMockito.when(rs.getString("GCM_HP_KEY")).thenReturn("hello");
		PowerMockito.when(rs.getInt("GCM_VENDOR_KEY")).thenReturn(7);
		//PowerMockito.when(rs.next()).thenReturn(true);
		PowerMockito.when(rs.next()).thenReturn(true).thenReturn(true).thenReturn(false);
		rse.extractData(rs);
	}

}
