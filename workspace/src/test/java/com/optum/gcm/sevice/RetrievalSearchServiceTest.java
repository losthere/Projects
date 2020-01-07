package com.optum.gcm.sevice;

import static com.optum.gcm.dao.constants.RetrievalSearchQueries.QUERY_USER_HAS_PROGRAMS;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
import org.powermock.reflect.Whitebox;
import org.springframework.dao.EmptyResultDataAccessException;

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.AssignableVendorsInput;
import com.optum.gcm.model.KeyValue;
import com.optum.gcm.model.RetrievalHpVendorStatusCount;
import com.optum.gcm.model.RetrievalSearchFilter;
import com.optum.gcm.model.RetrievalSearchInput;
import com.optum.gcm.model.RetrievalSearchProviderFilter;


@RunWith(PowerMockRunner.class)
public class RetrievalSearchServiceTest {

	@InjectMocks
	protected RetrievalSearchService retrievalSearchService;

	@Mock
	private CommonJpaService commonJpaService;
	
	@Mock
	protected RetrievalSearchFilter retrievalSearchFilter;
	
	@Mock
	protected RetrievalSearchInput retrievalSearchInput;
	
	@Mock
	private AssignableVendorsInput assinableVendorInp;
	
	@Mock
	private Integer count;
	


	@SuppressWarnings("unchecked")
	@Test
	public void testUserHasPrograms() throws SQLException {
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenThrow(EmptyResultDataAccessException.class);
		retrievalSearchService.userHasPrograms("Test"); 
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testUserHasPrograms_() throws SQLException {
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn("YES");
		retrievalSearchService.userHasPrograms("Test"); 
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testUserHasBusinesSegments() throws SQLException {
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenReturn("YES");
		retrievalSearchService.userHasBusinesSegments("Test");
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testUserHasBusinesSegments_() throws SQLException {
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.any())).thenThrow(EmptyResultDataAccessException.class);
		retrievalSearchService.userHasBusinesSegments("Test");
	} 
	@Test
	public void testGetProjects() throws SQLException {
		RetrievalSearchFilter retrievalSearchFilter= new RetrievalSearchFilter(); 
		retrievalSearchFilter.setProgramsByUser("Test");
		retrievalSearchFilter.setProgram("Test");
		retrievalSearchService.getProjects(retrievalSearchInput);
	}
	
	public RetrievalHpVendorStatusCount statusCountObj =new RetrievalHpVendorStatusCount();
	@Test
	public void testIsHintRequiredForProjectSearch() throws Exception {
		Class<?> serviceClass = Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		Object obj = serviceClass.newInstance();
		retrievalSearchFilter.setHpKey(5L);
		retrievalSearchFilter.getHpKey(); 
		retrievalSearchFilter.setVendorKey(5L);
		retrievalSearchFilter.getVendorKey();
		retrievalSearchFilter.setStatus("test");
		retrievalSearchFilter.getStatus();
		RetrievalSearchProviderFilter providerFilter=new RetrievalSearchProviderFilter();
		retrievalSearchFilter.setProviderFilter(providerFilter);
		retrievalSearchFilter.getProviderFilter();
		providerFilter.setProvLastName("test");
		providerFilter.getProvLastName();
		providerFilter.setProvState("test");
		providerFilter.getProvState();
		Whitebox.invokeMethod(obj, "isHintRequiredForProjectSearch", retrievalSearchFilter );
	}	
	/*@SuppressWarnings("unchecked")
	@Test
	public void testgetDetailCountByProject() throws SQLException {
		RetrievalSearchFilter retrievalSearchFilter=new RetrievalSearchFilter();
		List<RetrievalHpVendorStatusCount> value=new ArrayList<>();
		RetrievalHpVendorStatusCount e=new RetrievalHpVendorStatusCount();
		e.setHpKey(8L);
		e.setVendorKey(8L);
		value.add(e);
		PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(),Mockito.any())).thenReturn(value);
		retrievalSearchService.getDetailCountByProject(retrievalSearchFilter);
	}*/
	@Test
	public void testgetHealthPlansByProject() throws SQLException {
		retrievalSearchService.getHealthPlansByProject(retrievalSearchFilter);
	}
	@Test
	public void testgetAssignableVendors() throws SQLException {
		retrievalSearchService.getAssignableVendors(assinableVendorInp);
	}
	@Test
	public void testgetAssignableVendorsByHPnClient() throws SQLException {
		retrievalSearchService.getAssignableVendorsByHPnClient(assinableVendorInp);
	}
	@Test
	public void testgetAssignableCount() throws SQLException {
		
		List<KeyValue<String, Integer>> list = new ArrayList<>();
		KeyValue<String, Integer> keyVal=new KeyValue<>();
		keyVal.setKey("tst");
		keyVal.setValue(3);
		list.add(keyVal);
		KeyValue<String,Integer> result = new KeyValue<String, Integer>(); 
		result.setKey("test");
		result.setValue(12);
		result.getValue();
		RetrievalSearchService.getAssignableCount(list);
	}
	@Test
	public void testgetTotalCount() throws SQLException {

		List<KeyValue<String, Integer>> list = new ArrayList<>();
		KeyValue<String, Integer> keyVal=new KeyValue<>(); 
		keyVal.setKey("8");
		keyVal.setValue(3); 
		list.add(keyVal);
		KeyValue<String,Integer> result = new KeyValue<String, Integer>();
		result.setKey("9");
		result.setValue(12);
		RetrievalSearchService.getTotalCount(list);
		}
	
	@Test
	public void testgetCompletedCount() throws SQLException {
		List<KeyValue<String, Integer>> list = new ArrayList<>();
		KeyValue<String, Integer> keyVal=new KeyValue<>();
		keyVal.setKey("tst");
		keyVal.setValue(3);
		list.add(keyVal);
		KeyValue<String,Integer> result = new KeyValue<String, Integer>();
		result.setKey("test");
		result.setValue(12);
		RetrievalSearchService.getCompletedCount(list);
		}
	
	@Test
	public void testgetExtractedCount() throws SQLException {
		List<KeyValue<String, Integer>> list = new ArrayList<>();
		KeyValue<String, Integer> keyVal=new KeyValue<>();
		keyVal.setKey("tst");
		keyVal.setValue(3);
		list.add(keyVal);
		KeyValue<String,Integer> result = new KeyValue<String, Integer>();
		result.setKey("test");
		result.setValue(12);
		result.getValue();
		RetrievalSearchService.getExtractedCount(list);
		}
	
	@SuppressWarnings("unchecked")
	@Test
	public void testgetDetailCountByProject() {
		List<RetrievalHpVendorStatusCount> statusCountList = new ArrayList<RetrievalHpVendorStatusCount>();
		RetrievalHpVendorStatusCount retrievalHpVendorStatusCount = new RetrievalHpVendorStatusCount();
		retrievalHpVendorStatusCount.setClient("test");
		retrievalHpVendorStatusCount.setHpKey(3L);
		retrievalHpVendorStatusCount.setVendorKey(4L);
		retrievalHpVendorStatusCount.setStatus("test");
		retrievalHpVendorStatusCount.setStatusCnt(1);
		//retrievalHpVendorStatusCount.sets
		statusCountList.add(retrievalHpVendorStatusCount);
		//PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(), Mockito.anyObject())).thenReturn(statusCountList);
		PowerMockito.doReturn(statusCountList).when(commonJpaService).getResultList(Mockito.anyString(), Mockito.anyMap(), Mockito.any());
		retrievalSearchService.getDetailCountByProject(retrievalSearchFilter);
	}
}
