package com.optum.gcm.model;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class)
public class PendWorklistUpdateTest {

	@InjectMocks
	PendWorklistUpdate pendworklistupdate;
	@Mock
	private List<Long> gcmRetApptIds;
	@Mock
	private List<String> roleCodes;
	@Test
	public void testPendWorklistUpdate() {
		
		pendworklistupdate.setGcmRetApptIds(gcmRetApptIds);
		pendworklistupdate.getGcmRetApptIds();
		pendworklistupdate.setLoginUserKey(4L);
		pendworklistupdate.getLoginUserKey();
		pendworklistupdate.setPendMgrUserKey(4L);
		pendworklistupdate.getPendMgrUserKey();
		pendworklistupdate.setRequestedUser("test");
		pendworklistupdate.getRequestedUser();
		pendworklistupdate.setRoleCodes(roleCodes);
		pendworklistupdate.getRoleCodes();
	}

}
