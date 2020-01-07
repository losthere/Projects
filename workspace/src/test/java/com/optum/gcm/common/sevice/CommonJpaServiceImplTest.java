package com.optum.gcm.common.sevice;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.common.dao.CommonJpaDao;
import com.optum.gcm.model.Pagination;
import com.optum.gcm.model.RetrievalSearchFilter;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.SchedulingSearchFilterWrapper;
@RunWith(PowerMockRunner.class)
public class CommonJpaServiceImplTest {
	@InjectMocks
	CommonJpaServiceImpl commonJpaServiceImpl;
	
	@Mock
	private CommonJpaDao commonJpaDao;
	
	@Mock
	private Pagination pagination;
	
	@Mock
	private Map<String, ?> params1;
	
	@Mock
	private Object t1;

	@Test
	public void testCommonJpaServiceImpl() {
		Class<RetrievalSearchFilter> resultType = RetrievalSearchFilter.class;
		Class<SchedulingSearchFilter> keyType=SchedulingSearchFilter.class;
		Class<SchedulingSearchFilterWrapper> valueType=SchedulingSearchFilterWrapper.class;
		List<Object> T= new ArrayList<>();
		commonJpaServiceImpl.getResultList("test", resultType);
		commonJpaServiceImpl.getResultList("test", params1, resultType);
		commonJpaServiceImpl.persist(t1);
		commonJpaServiceImpl.getResultObject("test", resultType);
		commonJpaServiceImpl.getResultMap("test", params1);
		commonJpaServiceImpl.getResultMap("test", keyType, valueType);
		commonJpaServiceImpl.getResultMapWithList("test", keyType, valueType);
		commonJpaServiceImpl.update("test", params1);
		Map<String, Object>[] params = (Map<String, Object>[])new HashMap<?, ?>[5];
		commonJpaServiceImpl.getKeyKeyValueResults("test", params1, keyType);
		commonJpaServiceImpl.batchUpdate("test", params);
		HashMap map=new HashMap();
		//commonJpaServiceImpl.batchUpdate("test", map);
		commonJpaServiceImpl.persist(T);
	}

}
