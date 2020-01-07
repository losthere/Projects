package com.optum.gcm.common.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import com.optum.gcm.common.dao.GenericRowMapper;

/**
 * The Class StoredProcedureDaoImpl.
 */
@Repository
public class StoredProcedureDaoImpl implements StoredProcedureDao {

  /** The data source. */
  private DataSource dataSource;

  @Autowired
  public StoredProcedureDaoImpl(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  /*
   * (non-Javadoc)
   * 
   * @see com.optum.gcm.dao.StoredProcedureDao#callStoredProc(java.lang.String, java.util.Map,
   * java.lang.String)
   */
  @SuppressWarnings("unchecked")
  @Override
  public <T> T callStoredProc(String proc, Map<String, Object> inParams, String returnColumnName) {
    Map<String, ?> result = callStoredProc(inParams, proc);
    return (T) result.get(returnColumnName);
  }

  /*
   * (non-Javadoc)
   * 
   * @see com.optum.gcm.dao.StoredProcedureDao#callStoredProc(java.lang.String, java.lang.String)
   */
  @Override
  public <T> T callStoredProc(String proc, String returnColumnName) {
    return callStoredProc(proc, new HashMap<String, Object>(), returnColumnName);
  }

  /*
   * (non-Javadoc)
   * 
   * @see com.optum.gcm.dao.StoredProcedureDao#callStoredProc(java.lang.String, java.util.Map,
   * java.lang.Class, java.lang.String)
   */
  @SuppressWarnings("unchecked")
  @Override
  public <T> List<T> callStoredProc(String proc, Map<String, Object> inParams, Class<T> resultType,
      String resultTypeColumn) {
    Map<String, ?> result = callStoredProc(inParams, proc, resultType, resultTypeColumn);
    return (List<T>) result.get(resultTypeColumn);
  }

  /*
   * (non-Javadoc)
   * 
   * @see com.optum.gcm.dao.StoredProcedureDao#callStoredProc(java.util.Map, java.lang.String,
   * java.lang.Class, java.lang.String)
   */
  @Override
  public <T> Map<String, ?> callStoredProc(Map<String, Object> inParams, String proc,
      Class<T> resultType, String resultTypeColumn) {
    SimpleJdbcCall simpleJdbcCall = getSimpleJdbcCall(proc);
    simpleJdbcCall.returningResultSet(resultTypeColumn, new GenericRowMapper<T>(resultType));
    return simpleJdbcCall.execute(inParams);
  }

  /*
   * (non-Javadoc)
   * 
   * @see com.optum.gcm.dao.StoredProcedureDao#callStoredProc(java.util.Map, java.lang.String)
   */
  @Override
  public Map<String, ?> callStoredProc(Map<String, Object> inParams, String proc) {
    SimpleJdbcCall simpleJdbcCall = getSimpleJdbcCall(proc);
    return simpleJdbcCall.execute(inParams);
  }


  @Override
  public Map<String, ?> callStoredProc(Map<String, Object> inParams, String proc,
      SqlParameter... params) {
    SimpleJdbcCall simpleJdbcCall = getSimpleJdbcCall(proc);
    simpleJdbcCall = simpleJdbcCall.withoutProcedureColumnMetaDataAccess();
    for (SqlParameter parameter : params) {
      simpleJdbcCall.addDeclaredParameter(parameter);
    }
    return simpleJdbcCall.execute(inParams);
  }

  /*
   * (non-Javadoc)
   * 
   * @see com.optum.gcm.dao.StoredProcedureDao#callStoredProc(java.lang.String)
   */
  @Override
  public void callStoredProc(String proc) {
    callStoredProc(proc, "");
  }

  /**
   * Gets the simple jdbc call.
   * 
   * @return the simple jdbc call
   */
  private SimpleJdbcCall getSimpleJdbcCall(String procName) {
    String proc[] = procName.split("\\.");
    SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(dataSource);
    if (proc.length == 2) {
      simpleJdbcCall.withProcedureName(proc[1]);
      simpleJdbcCall.withCatalogName(proc[0]);
    } else {
      simpleJdbcCall.withProcedureName(proc[0]);
    }
    return simpleJdbcCall;
  }
}
