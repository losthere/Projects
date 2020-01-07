package com.optum.gcm.sevice;


import java.io.FileInputStream;
import java.io.InputStream;

import org.apache.commons.lang3.StringUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import com.documentum.fc.client.IDfSession;
import com.documentum.fc.client.IDfSysObject;
import com.documentum.fc.common.DfException;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.imagerepo.DFCConfiguration;
import com.optum.gcm.model.ChartStatusUpdate;

import com.optum.gcm.sevice.FaxPacketService;

@RunWith(PowerMockRunner.class)
@PrepareForTest({FileInputStream.class, InputStream.class})
public class FaxPacketServiceTest {

	@InjectMocks
	protected FaxPacketService faxPacketService;

	@Mock
	private CommonJpaService commonJpaService;

	@Mock
	protected ChartStatusUpdate chartStatusUpdate;
	@Mock
	private DFCConfiguration dfcConfiguration;
	
	@Mock
	private IDfSession session;
	
	@Mock
	private IDfSysObject idfSysObject;
	
	@Mock
	private FileInputStream fileInputStream;
	
	@Mock
	private InputStream inputStream;
	
	@Test
	public void testGetFaxHistory() {
		faxPacketService.getFaxHistory(1234L);
	}
	
	@Test
	public void testgetFaxPacketByDocID() throws Exception {
		PowerMockito.when(dfcConfiguration.getSession()).thenReturn(session);
		PowerMockito.when((IDfSysObject) session.getObjectByQualification("dm_document where object_name ='" + StringUtils.trim(Mockito.anyString())
								+ "' and a_content_type='pdf'")).thenReturn(idfSysObject);
		PowerMockito.when(idfSysObject.getFile("test" + ".pdf")).thenReturn("test");
		//final FileInputStream fileInputStreamMock = PowerMockito.mock(FileInputStream.class);
        PowerMockito.whenNew(FileInputStream.class).withAnyArguments().thenReturn(fileInputStream);
		PowerMockito.whenNew(InputStream.class).withAnyArguments().thenReturn(inputStream);
		faxPacketService.getFaxPacketByDocID("test");
	}
	
	@SuppressWarnings("unchecked")
	@Test
	public void testgetFaxPacketByAppt() throws Exception {
		PowerMockito.when(dfcConfiguration.getSession()).thenReturn(session);
		PowerMockito.when(commonJpaService.getResultObject(Mockito.anyString(), Mockito.anyMap(), Mockito.anyObject())).thenReturn("test");
		PowerMockito.when((IDfSysObject) session.getObjectByQualification("dm_document where object_name ='" + StringUtils.trim(Mockito.anyString())
								+ "' and a_content_type='pdf'")).thenReturn(idfSysObject);
		PowerMockito.when(idfSysObject.getFile("test" + ".pdf")).thenReturn("com/optum/gcm/sevice/Test1.pdf");
		//FileInputStream fileInputStreamMock = PowerMockito.mock(FileInputStream.class);
		//InputStream inputStreamMock = PowerMockito.mock(InputStream.class);
        PowerMockito.whenNew(FileInputStream.class).withAnyArguments().thenReturn(fileInputStream);
        PowerMockito.whenNew(InputStream.class).withAnyArguments().thenReturn(inputStream);

		//PowerMockito.when(new FileInputStream("com/optum/gcm/sevice/Test1.pdf").thenReturn(in);
		faxPacketService.getFaxPacketByAppt("test");
	}
	
	@Test
	public void testUpdateChartStatus() {
		faxPacketService.updateChartStatus(chartStatusUpdate);
	}	
}
