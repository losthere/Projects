package com.optum.gcm.dao.constants;

import static org.junit.Assert.*;

import org.junit.Test;


public class RetrievalActionsTest {

	@Test
	public void test() {

		assertEquals((RetrievalActions.RELEASE), RetrievalActions.valueOf("RELEASE"));
		assertEquals((RetrievalActions.CANCEL), RetrievalActions.valueOf("CANCEL"));
		assertEquals((RetrievalActions.INACTIVATE), RetrievalActions.valueOf("INACTIVATE"));
		assertEquals((RetrievalActions.ASSIGN), RetrievalActions.valueOf("ASSIGN"));
		assertEquals((RetrievalActions.DELETE), RetrievalActions.valueOf("DELETE"));
		assertEquals((RetrievalActions.REVIEW_EXTRACT), RetrievalActions.valueOf("REVIEW_EXTRACT"));
		assertEquals((RetrievalActions.EXTRACT), RetrievalActions.valueOf("EXTRACT"));
		assertEquals((RetrievalActions.REASSIGN), RetrievalActions.valueOf("REASSIGN"));

	}

}
