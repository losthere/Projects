package com.optum.gcm.common.sevice;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.stereotype.Service;

import com.optum.gcm.common.dao.StoredProcedureDao;

/**
 * The Class StoredProcuderServiceImpl.
 */
@Service
public class StoredProcedureServiceImpl implements StoredProcedureService {

  /** The stored procedure dao. */
  private StoredProcedureDao storedProcedureDao;

  @Autowired
  public StoredProcedureServiceImpl(StoredProcedureDao storedProcedureDao) {
    this.storedProcedureDao = storedProcedureDao;
  }
  /*
   * (non-Javadoc)
   * 
   * @see com.optum.gcm.service.StoredProcedureService#callStoredProc(java.lang.String,
   * java.util.Map, java.lang.String)
   */
  @Override
  public <T> T callStoredProc(String proc, Map<String, Object> inParams, String returnColumnName) {
    return storedProcedureDao.callStoredProc(proc, inParams, returnColumnName);
  }

  /*
   * (non-Javadoc)
   * 
   * @see com.optum.gcm.service.StoredProcedureService#callStoredProc(java.lang.String,
   * java.util.Map, java.lang.Class, java.lang.String)
   */
  @Override
  public <T> List<T> callStoredProc(String proc, Map<String, Object> inParams, Class<T> resultType,
      String resultTypeColumn) {
    return storedProcedureDao.callStoredProc(proc, inParams, resultType, resultTypeColumn);
  }

  /*
   * (non-Javadoc)
   * 
   * @see com.optum.gcm.service.StoredProcedureService#callStoredProc(java.util.Map,
   * java.lang.String)
   */
  @Override
  public Map<String, ?> callStoredProc(Map<String, Object> inParams, String proc) {
    return storedProcedureDao.callStoredProc(inParams, proc);
  }

  @Override
  public Map<String, ?> callStoredProc(String proc, Map<String, Object> inParams,
      SqlParameter... params) {
    return storedProcedureDao.callStoredProc(inParams, proc, params);
  }

  /*
   * (non-Javadoc)
   * 
   * @see com.optum.gcm.service.StoredProcedureService#callStoredProc(java.util.Map,
   * java.lang.String, java.lang.Class, java.lang.String)
   */
  @Override
  public <T> Map<String, ?> callStoredProc(Map<String, Object> inParams, String proc,
      Class<T> resultType, String resultTypeColumn) {
    return storedProcedureDao.callStoredProc(inParams, proc, resultType, resultTypeColumn);
  }

  /*
   * (non-Javadoc)
   * 
   * @see com.optum.gcm.service.StoredProcedureService#callStoredProc(java.lang.String,
   * java.lang.String)
   */
  @Override
  public <T> T callStoredProc(String proc, String returnColumnName) {
    return storedProcedureDao.callStoredProc(proc, returnColumnName);
  }

  /*
   * (non-Javadoc)
   * 
   * @see com.optum.gcm.service.StoredProcedureService#callStoredProc(java.lang.String)
   */
  @Override
  public void callStoredProc(String proc) {
    storedProcedureDao.callStoredProc(proc);
  }
}
