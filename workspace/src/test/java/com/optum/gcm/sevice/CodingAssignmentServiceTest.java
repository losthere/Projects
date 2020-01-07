package com.optum.gcm.sevice;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.common.sevice.StoredProcedureService;
import com.optum.gcm.model.CodingInventory;
import com.optum.gcm.model.CodingInventoryWrapper;
import com.optum.gcm.model.KeyValue;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.SearchFilter;
import com.optum.gcm.sevice.CodingAssignmentService;

import net.sf.ehcache.writer.writebehind.CoalesceKeysFilter;

@RunWith(PowerMockRunner.class)
public class CodingAssignmentServiceTest {

	@InjectMocks
	protected CodingAssignmentService codingAssignmentService;
	@Mock
	private StoredProcedureService storedProcedureService;;
	@Mock
	public CommonJpaService commonJpaService;
	@Test
	public void TestassignInventoryforCoding_exception() {
		CodingInventoryWrapper codingInventoryWrapper=new CodingInventoryWrapper();
		SchedulingSearchFilter searchFilter=new SchedulingSearchFilter();
		codingInventoryWrapper.setSearchFilter(searchFilter);
		searchFilter.setAcceptedFromDate("DD/MM/YYYY");
		searchFilter.setAcceptedToDate("DD/MM/YYYY");
		List<KeyValue<Long, Long>> assignIndUsers=new ArrayList<>();
		KeyValue<Long, Long> e=new KeyValue<>();
		e.setKey(7L);
		e.setValue(7L);
		assignIndUsers.add(e);
		codingInventoryWrapper.setAssignIndUsers(assignIndUsers);
		codingAssignmentService.assignInventoryforCoding(codingInventoryWrapper);
	}
	@Test
	public void TestassignInventoryforCoding_assignnull() {
		CodingInventoryWrapper codingInventoryWrapper=new CodingInventoryWrapper();
		SchedulingSearchFilter searchFilter=new SchedulingSearchFilter();
		codingInventoryWrapper.setSearchFilter(searchFilter);
		searchFilter.setAcceptedFromDate("DD/MM/YYYY");
		searchFilter.setAcceptedToDate("DD/MM/YYYY");
		codingAssignmentService.assignInventoryforCoding(codingInventoryWrapper);
	}
	@Test
	public void TestassignInventoryforCoding_getinventor() {
		CodingInventoryWrapper codingInventoryWrapper=new CodingInventoryWrapper();
		SchedulingSearchFilter searchFilter=new SchedulingSearchFilter();
		codingInventoryWrapper.setSearchFilter(searchFilter);
		searchFilter.setAcceptedFromDate("DD/MM/YYYY");
		searchFilter.setAcceptedToDate("DD/MM/YYYY");
		List<CodingInventory> codingInventoryList=new ArrayList<>();
		CodingInventory e=new CodingInventory();
		e.setProvGrpNm("Test");
		e.setPageCount(7L);
		e.setRecCount(7L);
		codingInventoryList.add(e);
		codingInventoryWrapper.setCodingInventoryList(codingInventoryList);
		codingAssignmentService.assignInventoryforCoding(codingInventoryWrapper);
	}
	@Test
	public void TestassignInventoryforCoding_null() {
		CodingInventoryWrapper codingInventoryWrapper=new CodingInventoryWrapper();
		SchedulingSearchFilter searchFilter=new SchedulingSearchFilter();
		codingInventoryWrapper.setSearchFilter(searchFilter);
		searchFilter.setAcceptedFromDate(null);
		searchFilter.setAcceptedToDate(null);
		codingAssignmentService.assignInventoryforCoding(codingInventoryWrapper);
	}
	@Test
	public void TestassignInventoryforCoding() {
		CodingInventoryWrapper codingInventoryWrapper=new CodingInventoryWrapper();
		SchedulingSearchFilter searchFilter=new SchedulingSearchFilter();
		codingInventoryWrapper.setSearchFilter(searchFilter);
		searchFilter.setAcceptedFromDate("07-08-1197");
		searchFilter.setAcceptedToDate("07-08-1197");
		codingAssignmentService.assignInventoryforCoding(codingInventoryWrapper);
	}
	@Test
	public void TestinventoryAssignmentforOptum() {
		CodingInventoryWrapper codingInventoryWrapper=new CodingInventoryWrapper();
		SchedulingSearchFilter searchFilter=new SchedulingSearchFilter();
		codingInventoryWrapper.setSearchFilter(searchFilter);
		codingAssignmentService.inventoryAssignmentforOptum(codingInventoryWrapper);
	}
	@Test
	public void TestinventoryAssignmentforOptum_assigned() {
		CodingInventoryWrapper codingInventoryWrapper=new CodingInventoryWrapper();
		SchedulingSearchFilter searchFilter=new SchedulingSearchFilter();
		codingInventoryWrapper.setSearchFilter(searchFilter);
		List<KeyValue<Long, Long>> assignIndUsers=new ArrayList<>();
		KeyValue<Long, Long> e=new KeyValue<>();
		e.setKey(7L);
		e.setValue(7L);
		assignIndUsers.add(e);
		codingInventoryWrapper.setAssignIndUsers(assignIndUsers);
		codingAssignmentService.inventoryAssignmentforOptum(codingInventoryWrapper);
	}
	@Test
	public void TestinventoryAssignmentforOptum_getinv() {
		CodingInventoryWrapper codingInventoryWrapper=new CodingInventoryWrapper();
		SchedulingSearchFilter searchFilter=new SchedulingSearchFilter();
		codingInventoryWrapper.setSearchFilter(searchFilter);
		List<CodingInventory> codingInventoryList=new ArrayList<>();
		codingInventoryWrapper.setCodingInventoryList(codingInventoryList);
		codingAssignmentService.inventoryAssignmentforOptum(codingInventoryWrapper);
	}
	@Test
	public void TestinventoryAssignmentforOptum_exception() {
		CodingInventoryWrapper codingInventoryWrapper=new CodingInventoryWrapper();
		SchedulingSearchFilter searchFilter=new SchedulingSearchFilter();
		codingInventoryWrapper.setSearchFilter(searchFilter);
		searchFilter.setAcceptedFromDate("TEst");
		searchFilter.setAcceptedToDate("Test");
		codingAssignmentService.inventoryAssignmentforOptum(codingInventoryWrapper);
	}
	@Test
	public void TestinventoryAssignmentforOptum_Date() {
		CodingInventoryWrapper codingInventoryWrapper=new CodingInventoryWrapper();
		SchedulingSearchFilter searchFilter=new SchedulingSearchFilter();
		codingInventoryWrapper.setSearchFilter(searchFilter);
		searchFilter.setAcceptedFromDate("07-08-1997");
		searchFilter.setAcceptedToDate("07-08-1997");
		codingAssignmentService.inventoryAssignmentforOptum(codingInventoryWrapper);
	}
	@Test(expected=NullPointerException.class)
	public void TestgetAssignableVendorsForOptumInventory() {
		CodingInventoryWrapper vendorSearchInp=new CodingInventoryWrapper();
		List<CodingInventory> codingInventoryList=new ArrayList<>();
		CodingInventory e=new CodingInventory();
		codingInventoryList.add(e);
		vendorSearchInp.setCodingInventoryList(codingInventoryList);
		SchedulingSearchFilter searchFilter=new SchedulingSearchFilter();
		vendorSearchInp.setSearchFilter(searchFilter);
		List value=new ArrayList<>();
		PowerMockito.when(commonJpaService.getKeyKeyValueResults(Mockito.anyString(), Mockito.anyMap(),Mockito.any())).thenReturn(value);
		List<KeyValue<String, String>> value1=new ArrayList<>();
		KeyValue<String, String> e1=new KeyValue<>();
		e1.setKey("TEst");
		e1.setValue("TEST");
		value1.add(e1);
		PowerMockito.when(codingAssignmentService.getAssignableVendorsForOptumInventory(vendorSearchInp)).thenReturn(value1);
		codingAssignmentService.getAssignableVendorsForOptumInventory(vendorSearchInp);
	}

	
}
