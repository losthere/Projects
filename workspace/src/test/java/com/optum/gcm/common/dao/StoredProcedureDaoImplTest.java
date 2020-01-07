package com.optum.gcm.common.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;

@RunWith(PowerMockRunner.class)
public class StoredProcedureDaoImplTest {

  @Mock
  private DataSource dataSource;

  @Mock
  private SimpleJdbcCall simpleJdbcCall;  
  
  @InjectMocks
  private StoredProcedureDaoImpl storedProcedureDaoImpl;
  
  @Before
  public void setUp() {
	  //storedProcedureDaoImpl = new StoredProcedureDaoImpl(dataSource); 
	  MockitoAnnotations.initMocks(this);
  }

  @Test(expected=Exception.class)
  public final void testcallStoredProcW3Param() throws Exception {
    Map<String, Object> inParams = new HashMap<String, Object>();
    inParams.put("TEST", "TEST");
    Map<String, Object> results = new HashMap<String, Object>();
    results.put("o_status", "TEST");
    PowerMockito.whenNew(SimpleJdbcCall.class).withAnyArguments().thenReturn(simpleJdbcCall);
    PowerMockito.when(simpleJdbcCall.execute(inParams)).thenReturn(results);
    storedProcedureDaoImpl.callStoredProc("TEST.TEST", inParams, "o_status");
  }

  @Test(expected=Exception.class)
  public final void testcallStoredProcW2Param() throws Exception {
    HashMap<String, Object> inParams = new HashMap<String, Object>();
    inParams.put("TEST", "TEST");
    Map<String, Object> results = new HashMap<String, Object>();
    results.put("o_status", "TEST");
    PowerMockito.whenNew(HashMap.class).withAnyArguments().thenReturn(inParams);
    PowerMockito.whenNew(SimpleJdbcCall.class).withAnyArguments().thenReturn(simpleJdbcCall);
    PowerMockito.when(simpleJdbcCall.execute(inParams)).thenReturn(results);
    storedProcedureDaoImpl.callStoredProc("TEST.TEST", "o_status");
  }

  @Test(expected=Exception.class)
  public final void testcallStoredProcW4Param() throws Exception {
    HashMap<String, Object> inParams = new HashMap<String, Object>();
    inParams.put("TEST", "TEST");
    Map<String, Object> results = new HashMap<>();
    ArrayList<String> oStatus = new ArrayList<>();
    oStatus.add("VALUE1");
    results.put("o_status", oStatus);
    PowerMockito.whenNew(SimpleJdbcCall.class).withAnyArguments().thenReturn(simpleJdbcCall);
    GenericRowMapper<StoredProcedureDaoImpl> gRW =
        new GenericRowMapper<StoredProcedureDaoImpl>(null);
    PowerMockito.whenNew(GenericRowMapper.class).withAnyArguments().thenReturn(gRW);
    PowerMockito.when(simpleJdbcCall.execute(inParams)).thenReturn(results);
    storedProcedureDaoImpl.callStoredProc("TEST", inParams, StoredProcedureDaoImpl.class,
        "o_status");
  }
  
  @Test(expected=Exception.class)
  public final void testcallStoredProcWParam() throws Exception {
    HashMap<String, Object> inParams = new HashMap<String, Object>();
    inParams.put("TEST", "TEST");
    Map<String, Object> results = new HashMap<>();
    ArrayList<String> oStatus = new ArrayList<>();
    oStatus.add("VALUE1");
    results.put("o_status", oStatus);
    PowerMockito.whenNew(SimpleJdbcCall.class).withAnyArguments().thenReturn(simpleJdbcCall);
    GenericRowMapper<StoredProcedureDaoImpl> gRW =
        new GenericRowMapper<StoredProcedureDaoImpl>(null);
    PowerMockito.whenNew(GenericRowMapper.class).withAnyArguments().thenReturn(gRW);
    PowerMockito.when(simpleJdbcCall.execute(inParams)).thenReturn(results);
    storedProcedureDaoImpl.callStoredProc(results,"Test", new SqlParameter(0));
  }

}

