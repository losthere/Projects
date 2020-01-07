package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.sql.Timestamp;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class RetrievalSearchResultTest {
	@InjectMocks
	RetrievalSearchResult retrievalSearchResult;
	@Mock
	private Timestamp extractedDate;

	@Test
	public void testsetprojKey() {
		retrievalSearchResult.setProjKey(2L);
	}

	@Test
	public void testgetprojKey() {
		retrievalSearchResult.getProjKey();
	}

	@Test
	public void testsetprojName() {
		retrievalSearchResult.setProjName("Test");
	}

	@Test
	public void testgetProjName() {
		retrievalSearchResult.getProjName();
	}

	@Test
	public void testsetProgram() {
		retrievalSearchResult.setProgram("test");
	}

	@Test
	public void testgetProgram() {
		retrievalSearchResult.getProgram();
	}

	@Test
	public void testsetProgramKey() {
		retrievalSearchResult.setProgramKey(2L);
	}

	@Test
	public void testgetProgramKey() {
		retrievalSearchResult.getProgramKey();
	}

	@Test
	public void testsetProjYear() {
		retrievalSearchResult.setProjYear(123);
	}

	@Test
	public void testgetProjYear() {
		retrievalSearchResult.getProjYear();
	} 

	@Test
	public void testsetBarcodeCnt() {
		retrievalSearchResult.setBarcodeCnt(123);
	}

	@Test
	public void testgetBarcodeCnt() {
		retrievalSearchResult.getBarcodeCnt();
	}

	@Test
	public void testsetExtractedDate() {
		retrievalSearchResult.setExtractedDate(extractedDate);
	}

	@Test
	public void testgetExtractedDate() {
		retrievalSearchResult.getExtractedDate();
	}

	@Test
	public void testCurrentState() {
		retrievalSearchResult.setCurrentState("test");
	}

	@Test
	public void testgetCurrentState() {
		retrievalSearchResult.getCurrentState();
	}

	@Test
	public void testsetVendorKey() {
		retrievalSearchResult.setVendorKey(2L);
	}

	@Test
	public void testgetVendorKey() {
		retrievalSearchResult.getVendorKey();
	}

	@Test
	public void testsetVendorName() {
		retrievalSearchResult.setVendorName("test");
	}

	@Test
	public void testgetVendorName() {
		retrievalSearchResult.getVendorName();
	}

	@Test
	public void testIsRealVendor() {
		retrievalSearchResult.setIsRealVendor("yes");
	}

	@Test
	public void testgetIsRealVendor() {
		retrievalSearchResult.getIsRealVendor();
	}
}
