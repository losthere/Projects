package com.optum.gcm.imagerepo;

import static com.optum.gcm.dao.constants.ChartLoadQueryConstants.QUERY_DOCUMENTUM_DOCUMENT;
import static org.mockito.Matchers.anyString;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.text.StrSubstitutor;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import com.documentum.fc.client.IDfDocument;
import com.documentum.fc.client.IDfFolder;
import com.documentum.fc.client.IDfPersistentObject;
import com.documentum.fc.client.IDfSession;
import com.documentum.fc.common.DfException;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.common.sevice.StoredProcedureService;
import com.optum.gcm.common.util.PDFUtil;
import com.optum.gcm.model.BaseTaskStatus;
import com.optum.gcm.model.CommIngestionTaskStatus;
import com.optum.gcm.model.ImageAttributes;

@RunWith(PowerMockRunner.class)
@PrepareForTest({PDFUtil.class})
public class CommInjectionServiceImplTest{
	
	@Mock
	private StoredProcedureService storedProcedureService;
	
	@Mock
	File file;
	
	@Mock
	IDfSession iDfSession;
	
	@Mock
	DFCConfiguration dfcConfiguration;
	
	@Mock
	IDfPersistentObject iDfPersistentObject;
	
	@Mock
	IDfDocument idfDocument;
	
	@Mock
	DFCHelper dfcHelper;
	
	@Mock
	CommonJpaService commonJpaService;
	
	@Mock
	IDfFolder iDfFolder;
	
	@InjectMocks@Spy
	CommIngestionServiceImpl commIngestionServiceImpl = new CommIngestionServiceImpl(storedProcedureService);
	
	@Test
	public void ingestChartNullTest() throws DfException, IOException, Exception {
		commIngestionServiceImpl.ingestChart(null,null,null);
	}
	
	@Test
	public void ingestChartTest() throws DfException, IOException, Exception {
		ImageAttributes imgAttrb = new ImageAttributes();
		imgAttrb.setBarcode("TEST123");
		Map<String, String> valueMap = new HashMap<>();
	    valueMap.put("BARCODE", "TEST123");
	    valueMap.put("FORMAT", "txt");
		PowerMockito.when(file.getName()).thenReturn("test.txt");
		PowerMockito.when(dfcConfiguration.getSession()).thenReturn(iDfSession);
		PowerMockito.when(file.getAbsolutePath()).thenReturn("/test");
		PowerMockito.when(iDfSession.getObjectByQualification(StrSubstitutor.replace(QUERY_DOCUMENTUM_DOCUMENT, valueMap))).thenReturn(idfDocument);
		PowerMockito.mockStatic(PDFUtil.class);
		PowerMockito.when(PDFUtil.getPageCount("/test")).thenReturn(1);
		PowerMockito.when(dfcHelper.getDocBaseOwner()).thenReturn("123Test");
		PowerMockito.when(idfDocument.isCheckedOut()).thenReturn(true);
		commIngestionServiceImpl.ingestChart(file,imgAttrb,null);
	}
	
	
	@Test
	public void ingestChartDocumentTest() throws DfException, IOException, Exception {
		ImageAttributes imgAttrb = new ImageAttributes();
		imgAttrb.setBarcode("TEST123");
		Map<String, String> valueMap = new HashMap<>();
	    valueMap.put("BARCODE", "TEST123");
	    valueMap.put("FORMAT", "txt");
		PowerMockito.when(file.getName()).thenReturn("test.txt");
		PowerMockito.when(dfcConfiguration.getSession()).thenReturn(iDfSession);
		PowerMockito.when(file.getAbsolutePath()).thenReturn("/test");
		PowerMockito.when(iDfSession.getObjectByQualification(StrSubstitutor.replace(QUERY_DOCUMENTUM_DOCUMENT, valueMap))).thenReturn(null);
		PowerMockito.mockStatic(PDFUtil.class);
		PowerMockito.when(PDFUtil.getPageCount("/test")).thenReturn(1);
		PowerMockito.when(dfcHelper.getDocBaseOwner()).thenReturn("123Test");
		commIngestionServiceImpl.ingestChart(file,imgAttrb,null);
	}
	@Test
	public void ingestChartDocumentTest1() throws DfException, IOException, Exception {
		ImageAttributes imgAttrb = new ImageAttributes();
		imgAttrb.setBarcode("TEST123");
		Map<String, String> valueMap = new HashMap<>();
	    valueMap.put("BARCODE", "TEST123");
	    valueMap.put("FORMAT", "txt");
		PowerMockito.when(file.getName()).thenReturn("test.txt");
		PowerMockito.when(dfcConfiguration.getSession()).thenReturn(iDfSession);
		PowerMockito.when(file.getAbsolutePath()).thenReturn("/test");
		PowerMockito.when(iDfSession.getObjectByQualification(StrSubstitutor.replace(QUERY_DOCUMENTUM_DOCUMENT, valueMap))).thenReturn(null);
		PowerMockito.mockStatic(PDFUtil.class);
		PowerMockito.when(PDFUtil.getPageCount("/test")).thenReturn(1);
		PowerMockito.when(dfcHelper.createFolder(Mockito.any(),Mockito.anyString(),Mockito.anyString(),Mockito.any())).thenReturn(iDfFolder);
		PowerMockito.when(dfcHelper.createDocument(Mockito.any(), Mockito.anyString(),Mockito.anyString(),Mockito.anyString())).thenReturn(idfDocument);
		PowerMockito.when(dfcHelper.getDocBaseOwner()).thenReturn("123Test");
		commIngestionServiceImpl.ingestChart(file,imgAttrb,null);
	}
	@Test
	public void ingestChartDocumentTest2() throws DfException, IOException, Exception {
		ImageAttributes imgAttrb = new ImageAttributes();
		imgAttrb.setBarcode("TEST123");
		Map<String, String> valueMap = new HashMap<>();
	    valueMap.put("BARCODE", "TEST123");
	    valueMap.put("FORMAT", "txt");
		PowerMockito.when(file.getName()).thenReturn("test.txt");
		PowerMockito.when(dfcConfiguration.getSession()).thenReturn(iDfSession);
		PowerMockito.when(file.getAbsolutePath()).thenReturn("/test");
		PowerMockito.when(iDfSession.getObjectByQualification(StrSubstitutor.replace(QUERY_DOCUMENTUM_DOCUMENT, valueMap))).thenReturn(null);
		PowerMockito.mockStatic(PDFUtil.class);
		PowerMockito.when(PDFUtil.getPageCount("/test")).thenReturn(0);
		PowerMockito.when(dfcHelper.createFolder(Mockito.any(),Mockito.anyString(),Mockito.anyString(),Mockito.any())).thenReturn(iDfFolder);
		PowerMockito.when(dfcHelper.createDocument(Mockito.any(), Mockito.anyString(),Mockito.anyString(),Mockito.anyString())).thenReturn(idfDocument);
		PowerMockito.when(dfcHelper.getDocBaseOwner()).thenReturn("123Test");
		commIngestionServiceImpl.ingestChart(file,imgAttrb,null);
	}

	
	@Test
	public void ingestChartFolderTest() throws DfException, IOException, Exception {
		ImageAttributes imgAttrb = new ImageAttributes();
		imgAttrb.setBarcode("TEST123");
		Map<String, String> valueMap = new HashMap<>();
	    valueMap.put("BARCODE", "TEST123");
	    valueMap.put("FORMAT", "txt");
		PowerMockito.when(file.getName()).thenReturn("test.txt");
		PowerMockito.when(dfcConfiguration.getSession()).thenReturn(iDfSession);
		PowerMockito.when(file.getAbsolutePath()).thenReturn("/test");
		PowerMockito.when(iDfSession.getObjectByQualification(StrSubstitutor.replace(QUERY_DOCUMENTUM_DOCUMENT, valueMap))).thenReturn(null);
		PowerMockito.mockStatic(PDFUtil.class);
		PowerMockito.when(PDFUtil.getPageCount("/test")).thenReturn(1);
		PowerMockito.when(dfcHelper.getDocBaseOwner()).thenReturn("123Test");
		BaseTaskStatus taskStatus = new CommIngestionTaskStatus();
		PowerMockito.when(dfcHelper.createFolder(iDfSession, "/Commercial/null/null/null", "null_acl", taskStatus)).thenReturn(iDfFolder);
		commIngestionServiceImpl.ingestChart(file,imgAttrb,null);
	}
	
	
}
