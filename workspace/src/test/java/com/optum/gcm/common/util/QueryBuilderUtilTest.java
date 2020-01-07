package com.optum.gcm.common.util;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.model.AssignInventorySearchFilter;
import com.optum.gcm.model.RetrievalSearchFilter;
import com.optum.gcm.model.SchedulingSearchFilter;

@RunWith(PowerMockRunner.class)
public class QueryBuilderUtilTest {

	private SchedulingSearchFilter schScrFilter;
	private Map<String, Object> map;
	
	@InjectMocks
	QueryBuilderUtil queryBuilderUtil;

	@Test
	public void testgetWhere() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class<?> filter = Class.forName("com.optum.gcm.model.RetrievalSearchFilter");
		RetrievalSearchFilter rsf = new RetrievalSearchFilter();
		Map<String, Object> params = new HashMap<String, Object>();
		String actual = QueryBuilderUtil.getWhere(filter, rsf, params);
		String expected = " AND BVF.GCM_BUS_FUNC_STATUS NOT IN  ( 'RECVD','INACTIVATED','DUPLICATE','CANCELED','PNPFINAL','CNAFINAL','SENT','INITIAL' ) ";
		assertEquals(actual, expected);
	}

	@Test
	public void testgetWhere1() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class<?> filter = Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		Object obj = 5;
		Map<String, Object> params = null;
		String actual = QueryBuilderUtil.getWhere(filter, obj, params);
		String expected = "";
		assertEquals(actual, expected);
	}

	/*@Test
	public void hasValuetest() {
		Object obj = 5;
		new QueryBuilderUtil();
		boolean actual = QueryBuilderUtil.hasValue(obj);
		boolean expected = true;
		assertEquals(expected, actual);

	}

	@Test
	public void hasValuetest2() {

		Object obj = "main";
		new QueryBuilderUtil();
		boolean actual = QueryBuilderUtil.hasValue(obj);
		boolean expected = true;
		assertEquals(expected, actual);
	}

	@Test
	public void testHasvalue() {
		List<String> myList = new ArrayList<>();
		myList.add("Test");

		new QueryBuilderUtil();
		boolean actual = QueryBuilderUtil.hasValue(myList);
		boolean expected = true;
		assertEquals(expected, actual);
	}

	@Test
	public void hasValuetest3() {

		Object obj = null;
		new QueryBuilderUtil();
		boolean actual = QueryBuilderUtil.hasValue(obj);
		boolean expected = false;
		assertEquals(expected, actual);
	}

	public void testHasvalue1() {

		new QueryBuilderUtil();
		QueryBuilderUtil.hasValue(null);

	}*/

	@Test
	public void testgetWhereClause() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		String actual = QueryBuilderUtil.getWhereClause(schScrFilter, map);
		String expected = "";
		assertEquals(actual, expected);
	}

	@Test
	public void testgetWhereClause2() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setProjYear(4L);
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClause(schScrFilter, map);
		String expected = " AND GCM_PROJECT_YEAR = :GCM_PROJECT_YEAR ";
		assertEquals(actual, expected);
	}

	@Test
	public void testgetWhereClause1() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setSpecialCategory("Main");
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClause(schScrFilter, map);
		String expected = " AND SPECIAL_CATEGORY = :SPECIAL_CATEGORY ";
		assertEquals(actual, expected);
	}

	@Test
	public void testgetWhereClause3() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setProjectName("MRM");
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClause(schScrFilter, map);
		String expected = " AND GCM_PROJ_KEY IN (SELECT GCM_PROJ_KEY FROM GCM_PROJECT WHERE GCM_PROJ_NAME = :GCM_PROJ_NAME) ";
		assertEquals(actual, expected);
	}

	@Test
	public void testgetWhereClause4() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setBusSegment("operations");
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClause(schScrFilter, map);
		String expected = " AND WI.GCM_BUSINESS_SEGMENT = :GCM_BUSINESS_SEGMENT ";
		assertEquals(actual, expected);
	}

	@Test
	public void testgetWhereClause5() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setClientKey(5L);
		;
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClause(schScrFilter, map);
		String expected = " AND WI.GCM_HP_KEY IN (SELECT H.GCM_HP_KEY FROM GCM_CLIENT C, GCM_HP H WHERE C.GCM_CLIENT_KEY = H.GCM_CLIENT_KEY AND C.GCM_CLIENT_KEY = :GCM_CLIENT_KEY ) ";
		assertEquals(actual, expected);
	}

	@Test
	public void testgetWhereClause6() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setHpKey(5L);
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClause(schScrFilter, map);
		String expected = " AND WI.GCM_HP_KEY = :GCM_HP_KEY ";
		assertEquals(actual, expected);
	}

	@Test
	public void testgetWhereClause7() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setHpProduct("doc");
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClause(schScrFilter, map);
		String expected = " AND WI.GCM_HP_PRODUCT = :GCM_HP_PRODUCT ";
		assertEquals(actual, expected);
	}

	@Test
	public void testgetWhereClause8() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setProjectKey(8L);
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClause(schScrFilter, map);
		String expected = " AND WI.GCM_PROJ_KEY = :GCM_PROJ_KEY ";
		assertEquals(actual, expected);
	}

	@Test
	public void testgetWhereClause9() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setProviderGroup("rads");
		;
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClause(schScrFilter, map);
		String expected = " AND PROV_GRP_ID = :PROV_GRP_ID ";
		assertEquals(actual, expected);
	}

	@Test
	public void testgetWhereClause10() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setProviderId("none");
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClause(schScrFilter, map);
		String expected = " AND SOURCE_SYSTEM_PROV_ID = :SOURCE_SYSTEM_PROV_ID ";
		assertEquals(actual, expected);
	}

	@Test
	public void testgetWhereClause11() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setProvGroupName("none");
		;
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClause(schScrFilter, map);
		String expected = " AND PROV_GRP_NAME = :PROV_GRP_NAME ";
		assertEquals(actual, expected);
	}

	@Test
	public void testgetWhereClause12() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setProvLastName("none");
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClause(schScrFilter, map);
		String expected = " AND PROV_LAST_NAME = :PROV_LAST_NAME ";
		assertEquals(actual, expected);
	}

	@Test
	public void testgetWhereClause13() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setProvFirstName("nonee");
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClause(schScrFilter, map);
		String expected = " AND PROV_FIRST_NAME = :PROV_FIRST_NAME ";
		assertEquals(actual, expected);
	}

	@Test
	public void testgetWhereClause14() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setLoginUserKey(5L);
		;
		map = new HashMap<>();
		QueryBuilderUtil.getWhereClause(schScrFilter, map);
	}

	@Test
	public void testgetWhereClause15() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setBusFuncDtlKey(5L);
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClause(schScrFilter, map);
		String expected = " AND GCM_BUS_FUNC_DETAIL_KEY = :GCM_BUS_FUNC_DETAIL_KEY ";
		assertEquals(actual, expected);
	}

	@Test
	public void getWhereClauseforCoding() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setProjYear(5L);
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClauseforCoding(schScrFilter, map);
		String expected = " AND V.GCM_PROJECT_YEAR = :GCM_PROJECT_YEAR ";
		assertEquals(actual, expected);
	}

	@Test
	public void getWhereClauseforCoding1() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setProjectName("demo");
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClauseforCoding(schScrFilter, map);
		String expected = " AND V.GCM_PROJ_KEY IN (SELECT GCM_PROJ_KEY FROM GCM_PROJECT WHERE GCM_PROJ_NAME = :GCM_PROJ_NAME) ";
		assertEquals(actual, expected);
	}

	@Test
	public void getWhereClauseforCoding2() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setBusSegment("oper");
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClauseforCoding(schScrFilter, map);
		String expected = " AND V.GCM_BUSINESS_SEGMENT = :GCM_BUSINESS_SEGMENT ";
		assertEquals(actual, expected);
	}

	@Test
	public void getWhereClauseforCoding3() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setClientKey(5L);
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClauseforCoding(schScrFilter, map);
		String expected = " AND V.GCM_HP_KEY IN (SELECT H.GCM_HP_KEY FROM GCM_CLIENT C, GCM_HP H WHERE C.GCM_CLIENT_KEY = H.GCM_CLIENT_KEY AND C.GCM_CLIENT_KEY = :GCM_CLIENT_KEY ) ";
		assertEquals(actual, expected);
	}

	@Test
	public void getWhereClauseforCoding4() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setHpKey(5L);
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClauseforCoding(schScrFilter, map);
		String expected = " AND V.GCM_HP_KEY = :GCM_HP_KEY ";
		assertEquals(actual, expected);
	}

	@Test
	public void getWhereClauseforCoding5() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setHpProduct("none");
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClauseforCoding(schScrFilter, map);
		String expected = " AND V.GCM_HP_PRODUCT = :GCM_HP_PRODUCT ";
		assertEquals(actual, expected);
	}

	@Test
	public void getWhereClauseforCoding6() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setProjectKey(5L);
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClauseforCoding(schScrFilter, map);
		String expected = " AND V.GCM_PROJ_KEY = :GCM_PROJ_KEY ";
		assertEquals(actual, expected);
	}

	@Test
	public void getWhereClauseforCoding7() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setChartId("char4");
		map = new HashMap<>();
		String actual = QueryBuilderUtil.getWhereClauseforCoding(schScrFilter, map);
		String expected = " AND V.GCM_PROJ_CONTENT_BARCODE = :GCM_PROJ_CONTENT_BARCODE ";
		assertEquals(actual, expected);
	}

	@Test
	public void getWhereClauseforCoding8() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		schScrFilter = new SchedulingSearchFilter();
		schScrFilter.setLoginUserKey(5L);
		map = new HashMap<>();
		QueryBuilderUtil.getWhereClauseforCoding(schScrFilter, map);
	}

	@Test
	public void getAssignedToWhere() throws ClassNotFoundException {
		new QueryBuilderUtil();
		map = new HashMap<>();
		AssignInventorySearchFilter search = new AssignInventorySearchFilter();
		search.setProvGroupName("Demo");
		String actual = QueryBuilderUtil.getAssignedToWhere(search, map);
		String expected = " AND PROV_GRP_NAME = :PROV_GRP_NAME  AND PROV_PHONE IS NULL  AND PROV_FAX IS NULL  AND PROVIDER_ADDRESS IS NULL  AND SPECIAL_CATEGORY IS NULL AND SPECIAL_NOTES IS NULL ";
		assertEquals(actual, expected);
	}

	@Test
	public void getAssignedToWhere1() throws ClassNotFoundException {
		new QueryBuilderUtil();
		map = new HashMap<>();
		AssignInventorySearchFilter search = new AssignInventorySearchFilter();
		search.setProvId("proj");
		String actual = QueryBuilderUtil.getAssignedToWhere(search, map);
		String expected = " AND SOURCE_SYSTEM_PROV_ID = :PROV_ID  AND PROV_PHONE IS NULL  AND PROV_FAX IS NULL  AND SOURCE_SYSTEM_PROV_ID = :SOURCE_SYSTEM_PROV_ID  AND PROVIDER_ADDRESS IS NULL  AND SPECIAL_CATEGORY IS NULL AND SPECIAL_NOTES IS NULL ";
		assertEquals(actual, expected);
	}

	@Test
	public void getAssignedToWhere2() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		map = new HashMap<>();
		AssignInventorySearchFilter search = new AssignInventorySearchFilter();
		search.setProvId("proj");
		String actual = QueryBuilderUtil.getAssignedToWhere(search, map);
		String expected = " AND SOURCE_SYSTEM_PROV_ID = :PROV_ID  AND PROV_PHONE IS NULL  AND PROV_FAX IS NULL  AND SOURCE_SYSTEM_PROV_ID = :SOURCE_SYSTEM_PROV_ID  AND PROVIDER_ADDRESS IS NULL  AND SPECIAL_CATEGORY IS NULL AND SPECIAL_NOTES IS NULL ";
		assertEquals(actual, expected);
	}

	@Test
	public void getAssignedToWhere3() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		map = new HashMap<>();
		AssignInventorySearchFilter search = new AssignInventorySearchFilter();
		search.setProvId("proj");
		String actual = QueryBuilderUtil.getAssignedToWhere(search, map);
		String expected = " AND SOURCE_SYSTEM_PROV_ID = :PROV_ID  AND PROV_PHONE IS NULL  AND PROV_FAX IS NULL  AND SOURCE_SYSTEM_PROV_ID = :SOURCE_SYSTEM_PROV_ID  AND PROVIDER_ADDRESS IS NULL  AND SPECIAL_CATEGORY IS NULL AND SPECIAL_NOTES IS NULL ";
		assertEquals(actual, expected);
	}

	@Test
	public void getAssignedToWhere4() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		map = new HashMap<>();
		AssignInventorySearchFilter search = new AssignInventorySearchFilter();
		search.setProvId(null);
		String actual = QueryBuilderUtil.getAssignedToWhere(search, map);
		String expected = " AND PROV_PHONE IS NULL  AND PROV_FAX IS NULL  AND PROVIDER_ADDRESS IS NULL  AND SPECIAL_CATEGORY IS NULL AND SPECIAL_NOTES IS NULL ";
		assertEquals(actual, expected);
	}

	@Test
	public void getAssignedToWhere5() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		map = new HashMap<>();
		AssignInventorySearchFilter search = new AssignInventorySearchFilter();
		search.setProvFax("none");
		String actual = QueryBuilderUtil.getAssignedToWhere(search, map);
		String expected = " AND PROV_PHONE IS NULL  AND PROV_FAX = :PROV_FAX  AND PROVIDER_ADDRESS IS NULL  AND SPECIAL_CATEGORY IS NULL AND SPECIAL_NOTES IS NULL ";
		assertEquals(actual, expected);
	}

	@Test
	public void getAssignedToWhere6() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		map = new HashMap<>();
		AssignInventorySearchFilter search = new AssignInventorySearchFilter();
		search.setProvFax(null);
		String actual = QueryBuilderUtil.getAssignedToWhere(search, map);
		String expected = " AND PROV_PHONE IS NULL  AND PROV_FAX IS NULL  AND PROVIDER_ADDRESS IS NULL  AND SPECIAL_CATEGORY IS NULL AND SPECIAL_NOTES IS NULL ";
		assertEquals(actual, expected);
	}

	@Test
	public void getAssignedToWhere7() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		map = new HashMap<>();
		AssignInventorySearchFilter search = new AssignInventorySearchFilter();
		search.setProvName("helo,hsi");
		String actual = QueryBuilderUtil.getAssignedToWhere(search, map);
		String expected = " AND PROV_PHONE IS NULL  AND PROV_FAX IS NULL  AND PROV_LAST_NAME = :PROV_LAST_NAME  AND PROV_FIRST_NAME = :PROV_FIRST_NAME  AND PROVIDER_ADDRESS IS NULL  AND SPECIAL_CATEGORY IS NULL AND SPECIAL_NOTES IS NULL ";
		assertEquals(actual, expected);
	}

	@Test
	public void getAssignedToWhere8() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		map = new HashMap<>();
		AssignInventorySearchFilter search = new AssignInventorySearchFilter();
		search.setProvName("helo,hsi");
		String actual = QueryBuilderUtil.getAssignedToWhere(search, map);
		String expected = " AND PROV_PHONE IS NULL  AND PROV_FAX IS NULL  AND PROV_LAST_NAME = :PROV_LAST_NAME  AND PROV_FIRST_NAME = :PROV_FIRST_NAME  AND PROVIDER_ADDRESS IS NULL  AND SPECIAL_CATEGORY IS NULL AND SPECIAL_NOTES IS NULL ";
		assertEquals(actual, expected);
	}

	@Test
	public void getAssignedToWhere9() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		map = new HashMap<>();
		AssignInventorySearchFilter search = new AssignInventorySearchFilter();
		search.setProvId("none");
		String actual = QueryBuilderUtil.getAssignedToWhere(search, map);
		String expected = " AND SOURCE_SYSTEM_PROV_ID = :PROV_ID  AND PROV_PHONE IS NULL  AND PROV_FAX IS NULL  AND SOURCE_SYSTEM_PROV_ID = :SOURCE_SYSTEM_PROV_ID  AND PROVIDER_ADDRESS IS NULL  AND SPECIAL_CATEGORY IS NULL AND SPECIAL_NOTES IS NULL ";
		assertEquals(actual, expected);
	}

	@Test
	public void getAssignedToWhere10() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		map = new HashMap<>();
		AssignInventorySearchFilter search = new AssignInventorySearchFilter();
		search.setProvLocation("none");
		String actual = QueryBuilderUtil.getAssignedToWhere(search, map);
		String expected = " AND PROV_PHONE IS NULL  AND PROV_FAX IS NULL  AND PROVIDER_ADDRESS = :PROVIDER_ADDRESS  AND SPECIAL_CATEGORY IS NULL AND SPECIAL_NOTES IS NULL ";
		assertEquals(actual, expected);
	}

	@Test
	public void getAssignedToWhere11() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		map = new HashMap<>();
		AssignInventorySearchFilter search = new AssignInventorySearchFilter();
		search.setProvLocation(null);
		String actual = QueryBuilderUtil.getAssignedToWhere(search, map);
		String expected = " AND PROV_PHONE IS NULL  AND PROV_FAX IS NULL  AND PROVIDER_ADDRESS IS NULL  AND SPECIAL_CATEGORY IS NULL AND SPECIAL_NOTES IS NULL ";
		assertEquals(actual, expected);
	}

	@Test
	public void getAssignedToWhere12() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		map = new HashMap<>();
		AssignInventorySearchFilter search = new AssignInventorySearchFilter();
		search.setSpecialCategory("Hi");
		String actual = QueryBuilderUtil.getAssignedToWhere(search, map);
		String expected = " AND PROV_PHONE IS NULL  AND PROV_FAX IS NULL  AND PROVIDER_ADDRESS IS NULL  AND SPECIAL_CATEGORY = :SPECIAL_CATEGORY AND SPECIAL_NOTES IS NULL ";
		assertEquals(actual, expected);
	}

	@Test
	public void getAssignedToWhere13() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		map = new HashMap<>();
		AssignInventorySearchFilter search = new AssignInventorySearchFilter();
		search.setSpecialCategory(null);
		String actual = QueryBuilderUtil.getAssignedToWhere(search, map);
		String expected = " AND PROV_PHONE IS NULL  AND PROV_FAX IS NULL  AND PROVIDER_ADDRESS IS NULL  AND SPECIAL_CATEGORY IS NULL AND SPECIAL_NOTES IS NULL ";
		assertEquals(actual, expected);
	}

	@Test
	public void getAssignedToWhere14() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		map = new HashMap<>();
		AssignInventorySearchFilter search = new AssignInventorySearchFilter();
		search.setSpecialNotes("hh");
		String actual = QueryBuilderUtil.getAssignedToWhere(search, map);
		String expected = " AND PROV_PHONE IS NULL  AND PROV_FAX IS NULL  AND PROVIDER_ADDRESS IS NULL  AND SPECIAL_CATEGORY IS NULL AND SPECIAL_NOTES = :SPECIAL_NOTES ";
		assertEquals(actual, expected);
	}

	@Test
	public void getAssignedToWhere15() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		map = new HashMap<>();
		AssignInventorySearchFilter search = new AssignInventorySearchFilter();
		search.setSpecialCategory(null);
		String actual = QueryBuilderUtil.getAssignedToWhere(search, map);
		String expected = " AND PROV_PHONE IS NULL  AND PROV_FAX IS NULL  AND PROVIDER_ADDRESS IS NULL  AND SPECIAL_CATEGORY IS NULL AND SPECIAL_NOTES IS NULL ";
		assertEquals(actual, expected);
	}

	@Test
	public void getAssignedToWhere16() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		map = new HashMap<>();
		AssignInventorySearchFilter search = new AssignInventorySearchFilter();
		search.setBusFuncDtlKey(5L);
		String actual = QueryBuilderUtil.getAssignedToWhere(search, map);
		String expected = " AND PROV_PHONE IS NULL  AND PROV_FAX IS NULL  AND PROVIDER_ADDRESS IS NULL  AND SPECIAL_CATEGORY IS NULL AND SPECIAL_NOTES IS NULL  AND GCM_BUS_FUNC_DETAIL_KEY = :GCM_BUS_FUNC_DETAIL_KEY ";
		assertEquals(actual, expected);
	}
	
	@Test
	public void hasValueTest() throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		Method method = QueryBuilderUtil.class.getDeclaredMethod("hasValue", Object.class);
		method.setAccessible(true);
		Object obj = method.invoke(queryBuilderUtil, "test");
		assertTrue((boolean)obj);
	}
	
	@Test
	public void hasValueTest2() throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		Method method = QueryBuilderUtil.class.getDeclaredMethod("hasValue", Object.class);
		method.setAccessible(true);
		Object obj = method.invoke(queryBuilderUtil, 100);
		assertTrue((boolean)obj);
	}
	
	@Test
	public void hasValueTest3() throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		Method method = QueryBuilderUtil.class.getDeclaredMethod("hasValue", Object.class);
		method.setAccessible(true);
		List list = new ArrayList<>();
		list.add("A");
		Object obj = method.invoke(queryBuilderUtil, list);
		assertTrue((boolean)obj);
	}
	
	@Test
	public void hasValueTest4() throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		Method method = QueryBuilderUtil.class.getDeclaredMethod("hasValue", Object.class);
		method.setAccessible(true);
		QueryBuilderUtilTest testObj = new QueryBuilderUtilTest();
		Object obj = method.invoke(queryBuilderUtil, testObj);
		assertTrue((boolean)obj);
	}
	
	@Test
	public void hasValueTest5() throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		Method method = QueryBuilderUtil.class.getDeclaredMethod("hasValue", Object.class);
		method.setAccessible(true);
		QueryBuilderUtilTest testObj = null;
		Object obj = method.invoke(queryBuilderUtil, testObj);
		assertFalse((boolean)obj);
	}
	
	@Test
	public void getAssignedToWhere20() throws ClassNotFoundException {
		new QueryBuilderUtil();
		Class.forName("com.optum.gcm.sevice.RetrievalSearchService");
		map = new HashMap<>();
		AssignInventorySearchFilter search = new AssignInventorySearchFilter();
		search.setProvPhone("87654321");
		String actual = QueryBuilderUtil.getAssignedToWhere(search, map);
		String expected = " AND PROV_PHONE = :PROV_PHONE  AND PROV_FAX IS NULL  AND PROVIDER_ADDRESS IS NULL  AND SPECIAL_CATEGORY IS NULL AND SPECIAL_NOTES IS NULL ";
		assertEquals(actual, expected);
	}
	
	@Test
	public void getStringValueTest() throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		Method method = QueryBuilderUtil.class.getDeclaredMethod("getStringValue", Object.class);
		method.setAccessible(true);
		Object obj = method.invoke(queryBuilderUtil, "test");
		assertEquals("test", (String)obj);
	}

}
