package com.optum.gcm.model;
import static org.junit.Assert.*;

import org.junit.Test;
import java.util.List;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

import com.rsa.cryptoj.c.in;

@RunWith(PowerMockRunner.class)
public class InsertStgUserTest {

		@InjectMocks
		private InsertStgUser insertStgUser;
		
		@Mock
		private static java.util.List<StgExtUserInfo> List = null;


		@Mock
		StgExtUserFileInfo stgExtUserFileInfo;

		@Test
		public void testgetStgExtUserFileInfo() {
			insertStgUser.getStgExtUserFileInfo();}
		
		
		@Test
		public void testsetStgExtUserFileInfo() {
			insertStgUser.setStgExtUserFileInfo(stgExtUserFileInfo);
			}

		@Test
		public void testgetStgExtUserInfo() {
			insertStgUser.getStgExtUserInfo();
	
		}

		@Test
		public void testsetStgExtUserInfo() {
			insertStgUser.setStgExtUserInfo(List);
		}
		@Test
		public void testrole() {
			insertStgUser.setRoleCode("Test");
			insertStgUser.getRoleCode();
		}
	
		@Test
		public void testtoString() {
			insertStgUser.toString();
		}
}
