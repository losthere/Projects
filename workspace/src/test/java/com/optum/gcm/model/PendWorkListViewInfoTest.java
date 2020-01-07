package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.sql.Date;
import java.sql.Timestamp;

import org.junit.Assert;
import org.junit.Test;
import java.sql.Timestamp;
import java.sql.Date;

public class PendWorkListViewInfoTest {

	@Test
	public void test() {
		
		PendWorkListViewInfo pendWorkListViewInfo = new PendWorkListViewInfo();
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		Date date = new Date(System.currentTimeMillis());
		
		pendWorkListViewInfo.setPendReason("TEST");
		pendWorkListViewInfo.setAssignedUser("TEST");
		pendWorkListViewInfo.setApptId(1l);
		pendWorkListViewInfo.setApptDate(date);
		pendWorkListViewInfo.setApptType("TEST");
		pendWorkListViewInfo.setProvGroupName("TEST");
		pendWorkListViewInfo.setProvName("TEST");
		pendWorkListViewInfo.setProvLocation("TEST");
		pendWorkListViewInfo.setCntTotal(1);
		pendWorkListViewInfo.setCntNotRecvd(1);
		pendWorkListViewInfo.setSpecialCategory("TEST");
		pendWorkListViewInfo.setSpecialNotes("TEST");
		//pendWorkListViewInfo.setCntTotal(1);
		
		
		Assert.assertEquals("TEST", pendWorkListViewInfo.getPendReason());
		Assert.assertEquals("TEST", pendWorkListViewInfo.getAssignedUser());
		Assert.assertEquals((Long)1l, pendWorkListViewInfo.getApptId());
		Assert.assertEquals(date, pendWorkListViewInfo.getApptDate());
		Assert.assertEquals("TEST", pendWorkListViewInfo.getApptType());
		Assert.assertEquals("TEST", pendWorkListViewInfo.getProvGroupName());
		Assert.assertEquals("TEST", pendWorkListViewInfo.getProvName());
		Assert.assertEquals("TEST", pendWorkListViewInfo.getProvLocation());
		Assert.assertEquals((Integer)1, pendWorkListViewInfo.getCntTotal());
		Assert.assertEquals((Integer)1, pendWorkListViewInfo.getCntNotRecvd());
		Assert.assertEquals("TEST", pendWorkListViewInfo.getSpecialCategory());
		Assert.assertEquals("TEST", pendWorkListViewInfo.getSpecialNotes());

}
}