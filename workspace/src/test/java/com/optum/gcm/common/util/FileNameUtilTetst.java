package com.optum.gcm.common.util;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class FileNameUtilTetst {

	@Test
	public void FileNameUtiltest() {
		String expected_value = "demo_1.txt";
		String origFileName = "demo@1.txt";
		String actual_value = FileNameUtil.cleanseFileName(origFileName);
		assertEquals(expected_value, actual_value);

	}

	@Test
	public void FileNameUtiltestAgain() {

		String filename = "demo.txt";
		String actual_value = FileNameUtil.getFileExtension(filename);
		String expected_value = "TXT";
		assertEquals(expected_value, actual_value);
	}
}
