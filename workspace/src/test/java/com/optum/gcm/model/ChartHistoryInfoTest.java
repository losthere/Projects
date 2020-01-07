package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.sql.Timestamp;

import org.junit.Test;
import org.junit.experimental.categories.Categories.IncludeCategory;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class ChartHistoryInfoTest {
	@InjectMocks
	ChartHistoryInfo charthistoryinfo;
	private Timestamp actionDate;

	@Test
	public void testcharthistoryinfo() {
		charthistoryinfo.getAction();
		charthistoryinfo.setAction("test");
		charthistoryinfo.getActionDate();
		charthistoryinfo.setActionDate(actionDate);
		charthistoryinfo.getUserName();
		charthistoryinfo.setUserName("test");
	}

}
