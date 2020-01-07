package com.optum.gcm.web;

import java.util.ArrayList;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.dao.EmptyResultDataAccessException;

import com.optum.gcm.common.GenericExceptionHandler;
import com.optum.gcm.exception.ServiceException;
import com.optum.gcm.model.EncounterDxDetails;
import com.optum.gcm.model.EncounterInputInfo;
import com.optum.gcm.model.RestResponse;
import com.optum.gcm.sevice.EncounterService;

@RunWith(PowerMockRunner.class)
public class EncounterControllerTest {

	@InjectMocks
	private EncounterController encounterController;

	@Mock
	private EncounterService encounterService;


	
	@Test
	public void testGetEncounters() throws Exception {
		EncounterInputInfo encounterInputInfo = Mockito.mock(EncounterInputInfo.class);
		PowerMockito.when(encounterService.getEncounters(encounterInputInfo)).thenReturn(null);
		encounterController.getEncounters(encounterInputInfo);
	}	
	@Test
	public void testGetEncounters_() throws Exception {
		EncounterInputInfo encounterInputInfo = Mockito.mock(EncounterInputInfo.class);
		PowerMockito.when(encounterService.getEncounters(encounterInputInfo)).thenThrow(new EmptyResultDataAccessException(0));
		encounterController.getEncounters(encounterInputInfo);
	}	
	@Test 
	public void testGetEncounterwithDxHcc() throws Exception {
		
		EncounterInputInfo encounterInputInfo = Mockito.mock(EncounterInputInfo.class);
		PowerMockito.when(encounterService.getEncounterwithDxHcc(encounterInputInfo)).thenReturn(null);
		encounterController.getEncounterwithDxHcc(encounterInputInfo);
	}
	@Test 
	public void testGetEncounterwithDxHcc_() throws Exception {
		
		EncounterInputInfo encounterInputInfo = Mockito.mock(EncounterInputInfo.class);
		PowerMockito.when(encounterService.getEncounterwithDxHcc(encounterInputInfo)).thenThrow(new EmptyResultDataAccessException(0));
		encounterController.getEncounterwithDxHcc(encounterInputInfo);
	}
	@Test
	public void testDeleteEncounter() throws Exception {
		EncounterInputInfo encounterInputInfo = Mockito.mock(EncounterInputInfo.class);
		encounterController.deleteEncounter(encounterInputInfo);
	}
	@Test
	public void testDeleteEncounter_() throws Exception {
		EncounterInputInfo encounterInputInfo = Mockito.mock(EncounterInputInfo.class);
		PowerMockito.when(encounterController.deleteEncounter(encounterInputInfo)).thenThrow(new EmptyResultDataAccessException(0));
		encounterController.deleteEncounter(encounterInputInfo);
	}
	@Test
	public void testsaveEncounterAndDx() throws Exception {	
		EncounterDxDetails encDetails= Mockito.mock(EncounterDxDetails.class);;
		PowerMockito.when(encounterController.saveEncounterAndDx(encDetails)).thenThrow(new EmptyResultDataAccessException(0));
		encounterController.saveEncounterAndDx(encDetails);
	}
	
}
