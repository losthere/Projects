package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.sql.Timestamp;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class StgExtUserInfoTest {
	@InjectMocks
	StgExtUserInfo stgExtUserInfo;
	private Timestamp creationDate;
	private Timestamp modifiedDate;

	@Test
	public void testgetStgExtUserInfo() {
		stgExtUserInfo.getStgExtUserInfoKey();
	}

	@Test
	public void testsetStgExtUserInfo() {
		stgExtUserInfo.setStgExtUserInfoKey(5L);
	}

	@Test
	public void testStgExtUserFileInfoKey() {
		stgExtUserInfo.getStgExtUserFileInfoKey();
	}

	@Test
	public void testsetStgExtUserFileInfoKey() {
		stgExtUserInfo.setStgExtUserFileInfoKey(5L);
	}

	@Test
	public void testgetFirstName() {
		stgExtUserInfo.getFirstName();
	}

	@Test
	public void testsetFirstName() {
		stgExtUserInfo.setFirstName("test");
	}

	@Test
	public void testgetStgExtLastName() {
		stgExtUserInfo.getLastName();
	}

	@Test
	public void testsetLastName() {
		stgExtUserInfo.setLastName("test");
	}

	@Test
	public void testgetEmail() {
		stgExtUserInfo.getEmail();
	}

	@Test
	public void testsetEmail() {
		stgExtUserInfo.setEmail("test");
	}

	@Test
	public void testgetRole() {
		stgExtUserInfo.getRole();
	}

	@Test
	public void testsetRole() {
		stgExtUserInfo.setRole("test");
	}

	@Test
	public void testReportsToUserID() {
		stgExtUserInfo.getReportsToUserID();
	}

	@Test
	public void testsetReportsToUserID() {
		stgExtUserInfo.setReportsToUserID("test");
	}

	@Test
	public void testgetAccMgrUserID() {
		stgExtUserInfo.getAccMgrUserID();
	}

	@Test
	public void testsetAccMgrUserID() {
		stgExtUserInfo.setAccMgrUserID("test");
	}

	@Test
	public void testgetContactAddress1() {
		stgExtUserInfo.getContactAddress1();
	}

	@Test
	public void testsetContactAddress1() {
		stgExtUserInfo.setContactAddress1("test");
	}

	@Test
	public void testgetContactAddress2() {
		stgExtUserInfo.getContactAddress2();
	}

	@Test
	public void testsetContactAddress2() {
		stgExtUserInfo.setContactAddress2("test");
	}

	@Test
	public void testgetContactCity() {
		stgExtUserInfo.getContactCity();
	}

	@Test
	public void testsetStgContactCity() {
		stgExtUserInfo.setContactCity("test");
	}

	@Test
	public void testgetStgState() {
		stgExtUserInfo.getContactState();
	}

	@Test
	public void testsetContactState() {
		stgExtUserInfo.setContactState("test");
	}

	@Test
	public void testgetContactZipCode() {
		stgExtUserInfo.getContactZipCode();
	}

	@Test
	public void testsetContactZipCode() {
		stgExtUserInfo.setContactZipCode("test");
	}

	@Test
	public void testgetOrganizationName() {
		stgExtUserInfo.getOrganizationName();
	}

	@Test
	public void testsetOrganizationName() {
		stgExtUserInfo.setOrganizationName("test");
	}

	@Test
	public void testgetIsValid() {
		stgExtUserInfo.getIsValid();
	}

	@Test
	public void testsetIsValid() {
		stgExtUserInfo.setIsValid("yes");
	}

	@Test
	public void testgetValMessage() {
		stgExtUserInfo.getValMessage();
	}

	@Test
	public void testsetValMessage() {
		stgExtUserInfo.setValMessage("test");
	}

	@Test
	public void testgetGcmUserKey() {
		stgExtUserInfo.getGcmUserKey();
	}

	@Test
	public void testsetGcmUserKey() {
		stgExtUserInfo.setGcmUserKey("test");
	}

	@Test
	public void testgetGcmVendorKey() {
		stgExtUserInfo.getGcmVendorKey();
	}

	@Test
	public void testsetGcmVendorKey() {
		stgExtUserInfo.setGcmVendorKey("test");
	}

	@Test
	public void testgetCreationDate() {
		stgExtUserInfo.getCreationDate();
	}

	@Test
	public void testsetCreationDate() {
		stgExtUserInfo.setCreationDate(creationDate);
	}

	@Test
	public void testgetCreatedBy() {
		stgExtUserInfo.getCreatedBy();
	}

	@Test
	public void testsetCreatedBy() {
		stgExtUserInfo.setCreatedBy("test");
	}

	@Test
	public void testgetModifiedDate() {
		stgExtUserInfo.getModifiedDate();
	}

	@Test
	public void testsetModifiedDate() {
		stgExtUserInfo.setModifiedDate(modifiedDate);
	}

	@Test
	public void testgetModifiedBy() {
		stgExtUserInfo.getModifiedBy();
	}

	@Test
	public void testsetModifiedBy() {
		stgExtUserInfo.setModifiedBy("test");
	}

	@Test
	public void testgettoString() {
		stgExtUserInfo.toString();
	}

}
