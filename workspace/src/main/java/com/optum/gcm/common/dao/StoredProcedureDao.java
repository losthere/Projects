package com.optum.gcm.common.dao;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.SqlParameter;

/**
 * The Interface StoredProcedureDao. Generic class used to invoke the stored procedure with params
 * and without params. Also if the procedure return refcursor as output then we can map the result
 * using entity class
 * 
 */
public interface StoredProcedureDao {

  /**
   * Call stored proc.
   * 
   * @param <T> the generic type
   * @param proc the proc used to pass the procedure name
   * @param inParams the in params used to pass the input params for the procedure. The param name
   *        should match the name as the param specified in the procedure
   * @param returnColumnName the return column name of the procedures out param.
   * @return the t
   */
  <T> T callStoredProc(String proc, Map<String, Object> inParams, String returnColumnName);

  /**
   * Call stored proc.
   * 
   * @param <T> the generic type
   * @param proc the proc used to pass the procedure name
   * @param inParams the in params used to pass the input params for the procedure. The param name
   *        should match the name as the param specified in the procedure
   * @param resultType the result type used when the procedure returs Refcursor
   * @param resultTypeColumn the result type column name of the procedures out param Refcursor.
   * @return the list
   */
  <T> List<T> callStoredProc(String proc, Map<String, Object> inParams, Class<T> resultType,
      String resultTypeColumn);

  /**
   * Call stored proc.
   * 
   * @param inParams the in params used to pass the input params for the procedure. The param name
   *        should match the name as the param specified in the procedure
   * @param proc the proc used to pass the procedure name
   * @return the map
   */
  Map<String, ? extends Object> callStoredProc(Map<String, Object> inParams, String proc);

  /**
   * Call stored proc.
   * 
   * @param <T> the generic type
   * @param inParams the in params used to pass the input params for the procedure. The param name
   *        should match the name as the param specified in the procedure
   * @param proc the proc used to pass the procedure name
   * @param resultType the result type used when the procedure returs Refcursor
   * @param resultTypeColumn the result type column name of the procedures out param Refcursor.
   * @return the map
   */
  <T> Map<String, ? extends Object> callStoredProc(Map<String, Object> inParams, String proc, Class<T> resultType,
      String resultTypeColumn);

  /**
   * Call stored proc.
   * 
   * @param <T> the generic type
   * @param proc the proc used to pass the procedure name
   * @param returnColumnName the return column name name of the procedures out param.
   * @return the t
   */
  <T> T callStoredProc(String proc, String returnColumnName);

  /**
   * Call stored proc.
   * 
   * @param <T> the generic type
   * @param proc the proc used to pass the procedure name
   * 
   */
  void callStoredProc(String proc);

  Map<String, ? extends Object> callStoredProc(Map<String, Object> inParams, String proc, SqlParameter... params);
}
