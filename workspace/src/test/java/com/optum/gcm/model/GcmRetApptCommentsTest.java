package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.sql.Timestamp;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class GcmRetApptCommentsTest {
	@InjectMocks
	GcmRetApptComments gcmretapptcomments;
	private Timestamp createDate;
	private Timestamp modifyDate;

	@Test
	public void testGcmRetApptComments() {
		gcmretapptcomments.setApptComments("test");
		gcmretapptcomments.setApptIteration(5L);
		gcmretapptcomments.setApptKey(5L);
		gcmretapptcomments.setCommentsKey(5L);
		gcmretapptcomments.setCommentType("test");
		gcmretapptcomments.setCreateDate(createDate);
		gcmretapptcomments.setCreateUserId("test");
		gcmretapptcomments.setModifyDate(modifyDate);
		gcmretapptcomments.setModifyUserId("test");
		gcmretapptcomments.toString();
		gcmretapptcomments.getApptIteration();
		gcmretapptcomments.getApptIteration();
		gcmretapptcomments.getApptKey();
		gcmretapptcomments.getClass();
		gcmretapptcomments.getCommentsKey();
		gcmretapptcomments.getCommentType();
		gcmretapptcomments.getCreateDate();
		gcmretapptcomments.getCreateUserId();
		gcmretapptcomments.getModifyDate();
		gcmretapptcomments.getModifyUserId();
		gcmretapptcomments.getApptComments();

	}

}
