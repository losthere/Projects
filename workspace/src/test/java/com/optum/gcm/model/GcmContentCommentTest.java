package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.sql.Timestamp;
import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class GcmContentCommentTest {
	@InjectMocks
	GcmContentComment gcmcontetntcomment;
	private Date commentDt;
	private Timestamp createDate;
	private Timestamp modifiedDate;

	@Test
	public void testGcmContentComment() {
		gcmcontetntcomment.getBarcode();
		gcmcontetntcomment.getBusFuncKey();
		gcmcontetntcomment.getBusFuncVenKey();
		gcmcontetntcomment.getCommentDt();
		gcmcontetntcomment.getContentComment();
		gcmcontetntcomment.getContentCommentKey();
		gcmcontetntcomment.getCreateDate();
		gcmcontetntcomment.getCreateUser();
		gcmcontetntcomment.getModifiedDate();
		gcmcontetntcomment.getModifiedUser();
		gcmcontetntcomment.getProjContentKey();
		gcmcontetntcomment.getProjectKey();
		gcmcontetntcomment.setBarcode("");
		gcmcontetntcomment.setBusFuncKey(8L);
		gcmcontetntcomment.setBusFuncVenKey(5L);
		gcmcontetntcomment.setCommentDt(commentDt);
		gcmcontetntcomment.setContentComment("");
		gcmcontetntcomment.setContentCommentKey(5L);
		gcmcontetntcomment.setCreateDate(createDate);
		gcmcontetntcomment.setModifiedDate(modifiedDate);
		gcmcontetntcomment.setModifiedUser("test");
		gcmcontetntcomment.setProjContentKey(5L);
		gcmcontetntcomment.setProjectKey(5L);

	}

}
