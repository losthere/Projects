package com.optum.gcm.model;


import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

public class KeyValueTest {
	
	@InjectMocks
	KeyValue<Object, Object> keyValue;
	

	@Test
	public void testKeyValue() {
		keyValue=new KeyValue<>();
		keyValue=new KeyValue<>("test","test");
		Object key = new Object();
		keyValue.setKey(key);
		Object value = new Object();
		keyValue.setValue(value);
		keyValue.getKey();
		keyValue.getValue();
		
	}

}
