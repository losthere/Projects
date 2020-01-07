package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class ChartCommentsTest {
	@InjectMocks
	ChartComments chartcomments;
	@Mock
	private Date contentCommentDt;



	@Test
	public void testgetContentComment() {
		chartcomments.getContentComment();

	}

	@Test
	public void testsetContentComment() {
		chartcomments.setContentComment("test");

	}

	@Test
	public void testgetUserName() {
		chartcomments.getUserName();

	}

	@Test
	public void testsetUserName() { 
		chartcomments.setUserName("test");

	}

	

	@Test
	public void testsetContentCommentDt() {
		
		chartcomments.setContentCommentDt(contentCommentDt);

	}
	
}
