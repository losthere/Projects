package com.optum.gcm.model;
import static org.junit.Assert.*;

import org.junit.Test;
import java.util.List;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class InsertStgUserObjectTest {

	@InjectMocks
	private InsertStgUserObject insertStgUserObject;
	
	@Mock
	private InsertStgUser insertStgUser;
	
	@Test
	public void testgetInsertStgUser() {
		insertStgUserObject.getInsertStgUser();
	}
	@Test
	public void testtoString() {
		insertStgUserObject.toString();
	}		
}


