package com.optum.gcm.common.sevice;

import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.jdbc.core.SqlParameter;

import com.optum.gcm.common.dao.StoredProcedureDao;
import com.optum.gcm.model.RetrievalSearchFilter;
@RunWith(PowerMockRunner.class)
public class StoredProcedureServiceImplTest {

	@InjectMocks
	StoredProcedureServiceImpl storedProcedureServiceImpl;
	@Mock
	StoredProcedureDao storedProcedureDao;
	@Mock
	private Map<String, Object> inParams;
	@Mock
	private SqlParameter returnColumnName;
	@Mock
	private SqlParameter params;
	@Mock
	private SqlParameter resultType;
	@Mock
	private SqlParameter resultTypeColumn;
	@Test
	public void testStoredProcedureServiceImpl() {
		storedProcedureServiceImpl.callStoredProc("test");
		storedProcedureServiceImpl.callStoredProc("test", "test");
		storedProcedureServiceImpl.callStoredProc(inParams, "test");
		storedProcedureServiceImpl.callStoredProc("test", inParams, params);
		storedProcedureServiceImpl.callStoredProc("test", inParams, resultType, resultTypeColumn);
		storedProcedureServiceImpl.callStoredProc("test", inParams, "test");
		storedProcedureServiceImpl.callStoredProc("test", inParams, RetrievalSearchFilter.class,"test");
		storedProcedureServiceImpl.callStoredProc(inParams,"test", RetrievalSearchFilter.class,"test");


	}

}
