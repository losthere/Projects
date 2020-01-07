package com.optum.gcm.imagerepo;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.documentum.fc.client.IDfACL;
import com.documentum.fc.client.IDfDocument;
import com.documentum.fc.client.IDfFolder;
import com.documentum.fc.client.IDfSession;
import com.documentum.fc.common.DfException;
import com.optum.gcm.constants.GCMConstants.IngestionJobContants;
import com.optum.gcm.constants.GCMConstants.TaskStatus;
import com.optum.gcm.exception.ServiceException;
import com.optum.gcm.model.BaseTaskStatus;
import com.optum.gcm.model.ITaskErrorEnum;
import com.optum.gcm.model.IngestionTaskErrorEnum;

import junit.framework.Assert;

@RunWith(PowerMockRunner.class)
public class DFCHelperTest {

	@InjectMocks
	DFCHelper dFCHelper;
	
	@Mock
	DFCHelper dFCHelper1;
	
	@Mock
	IDfSession iDfSession;
	
	@Mock
	IDfDocument document; 
	
	@Mock
	BaseTaskStatus taskStatus;
	
	@Mock
	IDfFolder cab;

	 @Test
	public void createFolder() throws DfException
	{	
		IDfFolder folder=null;			
		when(iDfSession.newObject("dm_cabinet")).thenReturn(cab);
		Mockito.when(iDfSession.getObjectByQualification("test")).thenReturn(folder);
		IDfFolder actualFolder = dFCHelper.createFolder(iDfSession, "path", "aclName", taskStatus);
		 
	}   
	 
	 @Test
	public void createFolderWithException() throws DfException
	{	
			IDfFolder folder=null;
			IDfSession iDfSessionNull = null;
			assertNull(folder);
			Mockito.when(iDfSession.getObjectByQualification("test")).thenReturn(folder);
			IDfFolder actualFolder = dFCHelper.createFolder(iDfSessionNull, "path", "aclName", taskStatus);
			assertNull(actualFolder);
			
	} 
	 
		
	 @Test
	 public void createDocument() {
		 	try{
		 		File file=new File("a_b_c.txt");
		 		Mockito.when(iDfSession.newObject("gcm_document")).thenReturn((IDfDocument)document);	
		 		Mockito.when(dFCHelper1.getBarcodeByFileName(file.getName(), "busname")).thenReturn("success");		
			    IDfDocument document = dFCHelper.createDocument(iDfSession, file, "busname", "format");
			    assertNotNull(document);
		 	}
		 	catch(Exception e)
		 	{ 
		 		e.printStackTrace();
		 	}
	}
	
	
	 @Test
	 public void createDocument_FileName() {
		 
		 	try{
		 		when(iDfSession.newObject("gcm_document")).thenReturn((IDfDocument)document);	
			 	when(dFCHelper1.getBarcodeByFileName("a_b_c_d.txt", "busname")).thenReturn("success");		
			    IDfDocument document = dFCHelper.createDocument(iDfSession, "a_b_c_d", "busname", "format");
			    assertNotNull(document);
		 	}
		 	catch(Exception e)
		 	{ 
		 		e.printStackTrace();
		 	}
	}

	 @Test
	 public void getDocBaseOwner() {
		    dFCHelper.getDocBaseOwner();
		  }
	 
	 @Test
	 public void testGetFolderQualificationDQL() {
	 String actualVal = dFCHelper.getFolderQualificationDQL("dummypath");
	 assertNotNull(actualVal);
	}
	 
	 @Test 
	 public void testGetBarcodeByFileName() throws Exception{
		 	String busname = "RETRIEVAL";
		 	String busname1 = "OTHER";
		 	String filename = "a_b_c_d";
		 	String actualVal = dFCHelper.getBarcodeByFileName(filename, busname);
		 	assertEquals("d", actualVal);
		 	
		 	String actualVal1 = dFCHelper.getBarcodeByFileName(filename, busname1);
		 	assertEquals("c", actualVal1);
		  }
	 @Test
	 public void testGetACL() throws DfException { 
		    IDfACL acl = null;
		    String aclName = "aclName"; 
		    Map<ITaskErrorEnum, String> messageMap = new HashMap<>() ;
		    when(iDfSession.getObjectByQualification(anyString())).thenReturn(acl);
		    when(taskStatus.getErrorMessageMap()).thenReturn(messageMap);
		    messageMap.put(IngestionTaskErrorEnum.ACL_DOES_NOT_EXISTS, "value");
		    IDfACL actualVal = dFCHelper.getACL(iDfSession, aclName, "path", taskStatus);
		    assertNull(actualVal);
	}
	 
	 @Test
	 public void testGetACLwithException() {
		    IDfACL acl = null;
		    Map<ITaskErrorEnum, String> messageMap = new HashMap<>() ;
		    try {
				when(iDfSession.getObjectByQualification(anyString())).thenReturn(acl);
			} catch (DfException e) {
				e.printStackTrace();
			}
		    when(taskStatus.getErrorMessageMap()).thenReturn(messageMap);
		    messageMap.put(IngestionTaskErrorEnum.ACL_DOES_NOT_EXISTS, "value");
		    dFCHelper.getACL(iDfSession, null, "path", taskStatus);
	}
	 
	 @Test
	 public void testcreateFolderExixts() throws DfException {
		 String path ="path";
		 String val = "dm_folder where any r_folder_path='" + path + "' and object_name='"
			        + StringUtils.substringAfterLast(path, "/") + "'";
		Mockito.when(iDfSession.getObjectByQualification(val)).thenReturn(cab);
		dFCHelper.createFolder(iDfSession, path, "aclName", taskStatus);
	 }
	 
	 @Test
	 public void testcreateFolderNonExixts() throws DfException {
		 String path ="path/path1";
		 when(iDfSession.newObject("dm_cabinet")).thenReturn(cab);
		 when(iDfSession.newObject("dm_folder")).thenReturn(cab);
		Mockito.when(iDfSession.getObjectByQualification("/path")).thenReturn(cab);
		dFCHelper.createFolder(iDfSession, path, "aclName", taskStatus);
	 }
	 
	 @Test
	 public void testcreateFolderNonExixtsCheck() throws DfException {
		 String path ="path/path1";
		 String path1 ="/path/path1";
		 String val = "dm_folder where any r_folder_path='" + path1 + "' and object_name='"
			        + StringUtils.substringAfterLast(path1, "/") + "'";
		 Mockito.when(iDfSession.getObjectByQualification(val)).thenReturn(cab);
		 when(iDfSession.newObject("dm_cabinet")).thenReturn(cab);
		 when(iDfSession.newObject("dm_folder")).thenReturn(cab);
		Mockito.when(iDfSession.getObjectByQualification("/path")).thenReturn(cab);
		dFCHelper.createFolder(iDfSession, path, "aclName", taskStatus);
	 }
}
