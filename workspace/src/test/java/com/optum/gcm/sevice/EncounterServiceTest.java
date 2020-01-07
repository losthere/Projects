package com.optum.gcm.sevice;

import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.dao.EmptyResultDataAccessException;

import com.optum.gcm.common.dao.CommonJpaDao;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.model.EncounterDxDetails;
import com.optum.gcm.model.EncounterDxHccInfo;
import com.optum.gcm.model.EncounterDxInfo;
import com.optum.gcm.model.EncounterInfo;
import com.optum.gcm.model.EncounterInputInfo;
import com.optum.gcm.model.GcmEncounter;
import com.optum.gcm.model.UserAdminModel;
import com.rsa.cryptoj.c.up;

@RunWith(PowerMockRunner.class)
public class EncounterServiceTest {

	@Before
	  public void createMocks() {
	    MockitoAnnotations.initMocks(this);
	  }
	@InjectMocks
	EncounterService encounterService;
	@Mock
	private CommonJpaService commonJpaService;
	@Mock
	private CommonJpaDao commonJpaDao;

	@Test
	public void testEncounterService() throws SQLException, ParseException, IOException {
		EncounterDxDetails encDetails = new EncounterDxDetails();
		EncounterInfo encounterInfo = new EncounterInfo();
		encounterInfo.setProjContBusFuncVenKey(7L);
		encounterInfo.setProjKey(7L);
		encounterInfo.setDosFromDt("09-08-1997");
		encounterInfo.setDosThruDt("08-09-1997");
		encounterInfo.setEncounterKey(7L);
		List<String> eoKeyList=new ArrayList<>();
		eoKeyList.add("Test");
		encounterInfo.setEoKeyList(eoKeyList);
		encDetails.setUserKey(7L);
		List<EncounterDxInfo> deleteDxList = new ArrayList<>();
		EncounterDxInfo e1 = new EncounterDxInfo();
		deleteDxList.add(e1);
		encDetails.setDeleteDxList(deleteDxList);
		encDetails.setEncounterInfo(encounterInfo);
		List<EncounterDxInfo> updateDxList=new ArrayList<>();
		EncounterDxInfo e5=new EncounterDxInfo();
		updateDxList.add(e5);
		encDetails.setUpdateDxList(updateDxList);
		List<EncounterDxInfo> dxList = new ArrayList<>();
		EncounterDxInfo e = new EncounterDxInfo();
		e.setIcdDxCd("TEst");
		dxList.add(e);
		encDetails.setDxList(dxList);
		PowerMockito.when(encounterService.saveEncounterAndDx(encDetails)).thenReturn(0L);
		encounterService.saveEncounterAndDx(encDetails);

	}
	@Test
	public void testEncounterService1() throws SQLException, ParseException, IOException {
		EncounterDxDetails encDetails = new EncounterDxDetails();
		EncounterInfo encounterInfo = new EncounterInfo();
		encounterInfo.setProjContBusFuncVenKey(7L);
		encounterInfo.setProjKey(7L);
		encounterInfo.setDosFromDt("09-08-1997");
		encounterInfo.setDosThruDt("08-09-1997");
		encounterInfo.setEncounterKey(7L);
		encDetails.setUserKey(7L);
		List<EncounterDxInfo> deleteDxList = new ArrayList<>();
		EncounterDxInfo e1 = new EncounterDxInfo();
		deleteDxList.add(e1);
		encDetails.setDeleteDxList(deleteDxList);
		encDetails.setEncounterInfo(encounterInfo);
		List<EncounterDxInfo> dxList = new ArrayList<>();
		EncounterDxInfo e = new EncounterDxInfo();
		e.setIcdDxCd("TEst");
		dxList.add(e);
		encDetails.setDxList(dxList);
		PowerMockito.when(encounterService.saveEncounterAndDx(encDetails)).thenReturn(0L);
		encounterService.saveEncounterAndDx(encDetails);

	}

	@Test
	public void testEncounterService_notnull() throws SQLException, ParseException, IOException {
		EncounterDxDetails encDetails = new EncounterDxDetails();
		EncounterInfo encounterInfo = new EncounterInfo();
		encounterInfo.setProjContBusFuncVenKey(7L);
		encounterInfo.setProjKey(7L);
		encounterInfo.setDosFromDt("09-08-1997");
		encounterInfo.setDosThruDt("08-09-1997");
		encDetails.setUserKey(7L);
		encDetails.setEncounterInfo(encounterInfo);
		List<EncounterDxInfo> updateDxList = new ArrayList<>();
		EncounterDxInfo e2 = new EncounterDxInfo();
		updateDxList.add(e2);
		encDetails.setUpdateDxList(updateDxList);
		List<EncounterDxInfo> dxList = new ArrayList<>();
		EncounterDxInfo e = new EncounterDxInfo();
		e.setIcdDxCd("TEst");
		dxList.add(e);
		encDetails.setDxList(dxList);
		encounterService.saveEncounterAndDx(encDetails);

	}

	@Test
	public void testEncounterService_notnull1() throws SQLException, ParseException, IOException {
		EncounterDxDetails encDetails=new EncounterDxDetails();
		EncounterInfo encounterInfo=new EncounterInfo();
		encounterInfo.setProjContBusFuncVenKey(7L);
		encounterInfo.setProjKey(7L);
		encounterInfo.setDosFromDt("09-08-1997");
		encounterInfo.setDosThruDt("08-09-1997");
		encDetails.setUserKey(7L);
		encDetails.setEncounterInfo(encounterInfo);
		List<EncounterDxInfo> dxList=new ArrayList<>();
		EncounterDxInfo eno=new EncounterDxInfo();
		eno.setIcdDxCd("TEST");
		dxList.add(eno);
		encDetails.setDxList(dxList);
		List<EncounterDxInfo> updateDxList=new ArrayList<>();
		EncounterDxInfo e2=new EncounterDxInfo();
		updateDxList.add(e2);
		encDetails.setUpdateDxList(updateDxList);
		encDetails.setDeleteDxList(null);
		encounterService.saveEncounterAndDx(encDetails);
		
	}
	
	@Test
	public void testgetEncounters() throws SQLException, ParseException {
		EncounterInputInfo encounterInputInfo=new EncounterInputInfo();
		List<EncounterInfo> value=new ArrayList<>();
		EncounterInfo e=new EncounterInfo();
		value.add(e);
		e.setBarcode("Test");
		//PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(),Mockito.any())).thenReturn(value);
		PowerMockito.when(encounterService.getEncounters(encounterInputInfo)).thenReturn(value);
		encounterService.getEncounters(encounterInputInfo);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void testgetEncounterwithDxHcc() throws SQLException, ParseException {
		EncounterInputInfo encounterInputInfo=new EncounterInputInfo() ;
		List<EncounterDxHccInfo> encounterdxInfoList=new ArrayList<>();
		EncounterDxHccInfo e=new EncounterDxHccInfo();
		encounterdxInfoList.add(e);
		PowerMockito.when(commonJpaService.getResultList(Mockito.anyString(), Mockito.anyMap(),Mockito.<Class<EncounterDxHccInfo>>any())).thenReturn(encounterdxInfoList);
		encounterService.getEncounterwithDxHcc(encounterInputInfo);
	}
	@Test
	public void testdeleteEncounter() throws SQLException, ParseException, IOException{
		EncounterInputInfo encounterInputInfo=new EncounterInputInfo();
		encounterInputInfo.setBusFuncKey(7L);
		encounterInputInfo.setProjKey(7L);
		encounterInputInfo.setUserKey(7L);
		PowerMockito.when(commonJpaDao.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.<Class<Long>>any())).thenThrow(EmptyResultDataAccessException.class);
		encounterService.deleteEncounter(encounterInputInfo);
	}
	@Test
	public void testdeleteEncounter1() throws SQLException, ParseException, IOException{
		EncounterInputInfo encounterInputInfo=new EncounterInputInfo();
		encounterInputInfo.setBusFuncKey(7L);
		encounterInputInfo.setProjKey(7L);
		encounterInputInfo.setUserKey(7L);
		encounterService.deleteEncounter(encounterInputInfo);
	}
	@Test
	public void saveEncounterAndDx() throws SQLException, ParseException, IOException {
		EncounterDxDetails encDetails=new EncounterDxDetails();
		EncounterInfo encounterInfo=new EncounterInfo();
		encounterInfo.setProjContBusFuncVenKey(7l);
		encounterInfo.setProjKey(7l);
		List<String> eoKeyList=new ArrayList<>();
		eoKeyList.add("Test");
		encounterInfo.setEoKeyList(eoKeyList);
		encounterInfo.setDosFromDt("09-08-1997");
		encounterInfo.setDosThruDt("08-09-1997");
		encDetails.setUserKey(7l);
		encDetails.setEncounterInfo(encounterInfo);
		List<EncounterDxInfo> dxList=new ArrayList<>();
		EncounterDxInfo e=new EncounterDxInfo();
		dxList.add(e);
		e.setIcdDxCd("Test");
		encDetails.setDxList(dxList);
		PowerMockito.when(commonJpaDao.persist(Matchers.<Class<GcmEncounter>>any())).thenReturn(5L);
		encounterService.saveEncounterAndDx(encDetails);
	}
	@SuppressWarnings("unchecked")
	@Test
	public void saveEncounterAndDx2() throws SQLException, ParseException, IOException {
		EncounterDxDetails encDetails=new EncounterDxDetails();
		EncounterInfo encounterInfo=new EncounterInfo();
		encounterInfo.setProjContBusFuncVenKey(7l);
		encounterInfo.setProjKey(7l);
		List<String> eoKeyList=new ArrayList<>();
		eoKeyList.add("Test");
		encounterInfo.setEoKeyList(eoKeyList);
		encDetails.setUserKey(7l);
		encDetails.setEncounterInfo(encounterInfo);
		List<EncounterDxInfo> dxList=new ArrayList<>();
		EncounterDxInfo e=new EncounterDxInfo();
		dxList.add(e);
		e.setIcdDxCd("Test");
		encDetails.setDxList(dxList);
		PowerMockito.when(commonJpaDao.persist(Matchers.<Class<GcmEncounter>>any())).thenReturn(5L);
		encounterService.saveEncounterAndDx(encDetails);
	}
	@Test
	public void saveEncounterAndDx1() throws SQLException, ParseException, IOException {
		EncounterDxDetails encDetails=new EncounterDxDetails();
		EncounterInfo encounterInfo=new EncounterInfo();
		encounterInfo.setProjContBusFuncVenKey(7l);
		encounterInfo.setProjKey(7l);
		List<String> eoKeyList=new ArrayList<>();
		eoKeyList.add("Test");
		encounterInfo.setEoKeyList(eoKeyList);
		encDetails.setUserKey(7l);
		encDetails.setEncounterInfo(encounterInfo);
		List<EncounterDxInfo> dxList=new ArrayList<>();
		EncounterDxInfo e=new EncounterDxInfo();
		dxList.add(e);
		e.setIcdDxCd("Test");
		encDetails.setDxList(dxList);
		PowerMockito.when(commonJpaDao.persist(Matchers.<Class<GcmEncounter>>any())).thenReturn(0L);
		PowerMockito.when(commonJpaDao.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.<Class<Long>>any())).thenThrow(EmptyResultDataAccessException.class);
		encounterService.saveEncounterAndDx(encDetails);
	}
}
