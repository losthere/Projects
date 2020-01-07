package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;
import org.opensaml.xmlsec.encryption.P;
import org.powermock.modules.junit4.PowerMockRunner;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
@RunWith(PowerMockRunner.class)
public class EncounterDxDetailsTest {
@InjectMocks
EncounterDxDetails encounterdxdetails;
@Mock
private List<EncounterDxInfo> deleteDxList;
@Mock
private List<EncounterDxInfo> dxList;
@Mock
private EncounterInfo encounterInfo;
@Mock
private List<EncounterDxInfo> updateDxList;
	@Test
	public void testEncounterDxDetails() {
		encounterdxdetails.getDeleteDxList();
		encounterdxdetails.getDxList();
		encounterdxdetails.getEncounterInfo();
		encounterdxdetails.getLoginUserId();
		encounterdxdetails.getUpdateDxList();
		encounterdxdetails.getUserKey();
		encounterdxdetails.setDeleteDxList(deleteDxList);
		encounterdxdetails.setDxList(dxList);
		encounterdxdetails.setEncounterInfo(encounterInfo);
		encounterdxdetails.setLoginUserId("test");
		encounterdxdetails.setUpdateDxList(updateDxList);
		encounterdxdetails.setUserKey(5L);
	}

}
