package com.optum.gcm.sevice;


import java.sql.SQLException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

import com.optum.gcm.common.sevice.CommonJpaService;

@RunWith(PowerMockRunner.class)
public class CacheableServiceTest {

	@InjectMocks
	protected CacheableService cacheableService;
	
	@Mock
	private CommonJpaService commonJpaService;


	@Test
	public void testGetAllICDDXCodes() throws SQLException {
		cacheableService.getAllIcdDxCodes();
	}
	
	@Test
	public void testGetAllHccMappingsforMCARE() throws SQLException {
		cacheableService.getAllHccMappingsforMCARE();
	}
	
	@Test
	public void testGetAllAgeGenderValidations() throws SQLException {
		cacheableService.getAllAgeGenderValidations();
	}	
	
	@Test
	public void testGetAllHccMappingsforACA() throws SQLException {
		cacheableService.getAllHccMappingsforACA();
	}
	
}
