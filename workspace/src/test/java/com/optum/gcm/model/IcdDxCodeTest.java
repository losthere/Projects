package com.optum.gcm.model;

import static org.junit.Assert.*;

import java.sql.Timestamp;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;
@RunWith(PowerMockRunner.class
		)
public class IcdDxCodeTest {
@InjectMocks
IcdDxCode icddxcode;
private Timestamp time;
private Timestamp effThruDt;
private Timestamp gcmCodeValidEndDate;
private Timestamp gcmCodeValidStartDate;
	@Test
	public void testIcdDxCode() {
		icddxcode.setEffFromDt(time);
		icddxcode.setEffThruDt(effThruDt);
		icddxcode.setGcmBusinessSegment("test");
		icddxcode.setGcmCodeValidEndDate(gcmCodeValidEndDate);
		icddxcode.setGcmCodeValidStartDate(gcmCodeValidStartDate);
		icddxcode.setGcmHccModelCat("tets");
		icddxcode.setGcmHccModelType("tets");
		icddxcode.setGcmIcdKey(5L);
		icddxcode.setHccShortDesc("test");
		icddxcode.setIcdDxCd("test");
		icddxcode.setIcdShortDesc("test");
		icddxcode.toString();
		icddxcode.getEffFromDt();
		icddxcode.getEffThruDt();
		icddxcode.getGcmBusinessSegment();
		icddxcode.getGcmCodeValidEndDate();
		icddxcode.getGcmCodeValidStartDate();
		icddxcode.getGcmHccModelCat();
		icddxcode.getGcmHccModelType();
		icddxcode.getGcmIcdKey();
		icddxcode.getHccShortDesc();
		icddxcode.getIcdDxCd();
		icddxcode.getIcdShortDesc();
	}
	

}
