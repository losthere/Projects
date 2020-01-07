package com.optum.gcm.common.dao;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.SQLFeatureNotSupportedException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.sql.DataSource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import com.optum.gcm.model.DiagnosisDummy;
import com.optum.gcm.model.Pagination;

@RunWith(PowerMockRunner.class)
public class CommonJpaDaoImplTest {
	
	private DataSource dataSource = new DataSource() {

		@Override
		public <T> T unwrap(Class<T> arg0) throws SQLException {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public boolean isWrapperFor(Class<?> arg0) throws SQLException {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public void setLoginTimeout(int arg0) throws SQLException {
			// TODO Auto-generated method stub

		}

		@Override
		public void setLogWriter(PrintWriter arg0) throws SQLException {
			// TODO Auto-generated method stub

		}

		@Override
		public Logger getParentLogger() throws SQLFeatureNotSupportedException {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public int getLoginTimeout() throws SQLException {
			// TODO Auto-generated method stub
			return 0;
		}

		@Override
		public PrintWriter getLogWriter() throws SQLException {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Connection getConnection(String username, String password) throws SQLException {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Connection getConnection() throws SQLException {
			// TODO Auto-generated method stub
			return null;
		}
	};
	@InjectMocks
	private CommonJpaDaoImpl commonJpaDaoImpl = new CommonJpaDaoImpl(dataSource);
	@Mock
	private PaginationQueryBuilder paginationQueryBuilder;
	@Mock
	private NamedParameterJdbcTemplate jdbcTemplate;
	@Mock
	private Map<String, ?> params;

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Test
	public void testgetResultList() {
		Class resultType = null;
		Pagination pagination = new Pagination();
		commonJpaDaoImpl.getResultList("test", params, resultType, pagination);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Test
	public void testgetResultObject() throws EmptyResultDataAccessException {
		Class resultType = null;
		commonJpaDaoImpl.getResultObject("test", params, resultType);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Test
	public void testgetResultMap() {
		Class keyType = null;
		Class valueType = null;
		commonJpaDaoImpl.getResultMap("test", params, keyType, valueType);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Test
	public void testgetResultMapWithList() {
		Class keyType = null;
		Class valueType = null;
		commonJpaDaoImpl.getResultMapWithList("test", params, keyType, valueType);
	}

	@Test
	public void testgetResultMap1() {
		commonJpaDaoImpl.getResultMap("test", params);
	}

	@Test
	public <T> void testpersist() {
		commonJpaDaoImpl.update("tst", params);
	}

	@Test
	public <T> void testupdate() {
		commonJpaDaoImpl.update("tst", params);
	}

	/*@SuppressWarnings({ "rawtypes", "unchecked" })
	@Test
	public <T> void testgetKeyValueResults() {
		Class keyType = null;
		Class valueType = null;
		commonJpaDaoImpl.getKeyValueResults("test", params, keyType);
	}*/

	@Test
	public <T> void testbatchUpdate() {
		Map<String, ?>[] params1 = null;
		commonJpaDaoImpl.batchUpdate("tst", params1);
	}

	@Test
	public <T> void testpersist1() {
		List<DiagnosisDummy> objs = new ArrayList<>();
		DiagnosisDummy e = new DiagnosisDummy();
		objs.add(e);
		commonJpaDaoImpl.persist(objs);
	}

	
	/*@InjectMocks
	private CommonJpaDaoImpl commonJpaDaoImpl = new CommonJpaDaoImpl(Mockito.mock(DataSource.class));
	
	@Mock
	private PaginationQueryBuilder paginationQueryBuilder;
	
	 @Mock
	 private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
	 
	 @Mock
	 private JdbcTemplate jdbcTemplate;
	 
	 @Mock
	 private GenericRowMapper<String> genericRowMapper;
	 
	@Mock
	private PaginationQueryBuilder paginationQueryBuilder;
	
	@Mock
	private CommonJpaDao commonJpaDao;
	@Mock
	private Pagination pagination;
	@Mock
	private Map<String, ?> params;
	@Mock
	private Map<String, ?>[] params1;
	@Mock
	private Object t1;
	@Mock
	private List<String> objs;
	
	@Test
	public void testCommonJpaDaoImpl() throws Exception {
		MockGateway.MOCK_GET_CLASS_METHOD = true;
		PowerMockito.whenNew(JdbcTemplate.class).withAnyArguments().thenReturn(jdbcTemplate);
		PowerMockito.whenNew(NamedParameterJdbcTemplate.class).withAnyArguments()
	        .thenReturn(namedParameterJdbcTemplate);
	    PowerMockito.whenNew(GenericRowMapper.class).withAnyArguments().thenReturn(genericRowMapper);
		Map<String, ?> params = new HashMap<>();
		 Pagination pagination = new Pagination();
		Class<RetrievalSearchFilter> resultType = RetrievalSearchFilter.class;
		Class<SchedulingSearchFilter> keyType=SchedulingSearchFilter.class;
		Class<SchedulingSearchFilterWrapper> valueType=SchedulingSearchFilterWrapper.class;
		PowerMockito.when(paginationQueryBuilder.getPaginatedQuery("test", pagination)).thenReturn("test");
		PowerMockito.when(paginationQueryBuilder.getPaginatedQuery("test", pagination)).thenReturn("test");
		commonJpaDaoImpl.getResultList("test", params, resultType, pagination);
		commonJpaDaoImpl.getResultObject("test", params, resultType);
		commonJpaDaoImpl.getResultMap("test", params, keyType, valueType);
		commonJpaDaoImpl.getResultMapWithList("test", params, keyType, valueType);
		commonJpaDaoImpl.getResultMap("test", params);
		//commonJpaDaoImpl.persist(3);
		commonJpaDaoImpl.update("test", params);
		commonJpaDaoImpl.getKeyKeyValueResults("test", params, keyType);
		//commonJpaDaoImpl.batchUpdate("test", params1);
		commonJpaDaoImpl.persist(objs);*/
	}


