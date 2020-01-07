package com.optum.gcm.common.util;

import static org.junit.Assert.assertNotNull;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
public class PDFUtilTest {

	@InjectMocks
	PDFUtil pdfUtil;

	/*@Test
	public void TestgetPageCount() throws Exception {
		String inputFile = "com/optum/gcm/common/util/Test1.pdf";
		
		PDFUtil.getPageCount(inputFile);
	}*/

	@Test(expected = IOException.class)
	public void TestgetPageCount_exception() throws Exception {
		String inputFile = "C:\\Users\\mmanika6\\Downloads\\FORM12BB";
		assertNotNull("NOT NULL", PDFUtil.getPageCount(inputFile));
	}

	@Test
	public void TestgetRequestPDF() {
		String inputFile = "com/optum/gcm/common/util/Test1.pdf";
		String pageNumStr = "1";
		String outFile = "Test2.pdf";
		PDFUtil.getRequestPDF(inputFile, pageNumStr, outFile);
	}
	
	@Test
	public void TestgetRequestPDF2() {
		String inputFile = "com/optum/gcm/common/util/Test1.pdf";
		String pageNumStr = "1";
		String outFile = "test/test/Test2.pdf";
		PDFUtil.getRequestPDF(inputFile, pageNumStr, outFile);
	}

	@Test
	public void TestgetRequestPDF_exception() {
		String inputFile = "";
		String pageNumStr = "1";
		String outFile = "test/test/FORM1212BB.pdf";
		PDFUtil.getRequestPDF(inputFile, pageNumStr, outFile);
	}

	/*@Test
	public void TestconcatenatePDF() {
		String inputFile = "com/optum/gcm/common/util/Test1.pdf";
		String outFile = "Test2.pdf";
		PDFUtil.concatenatePDF(outFile, inputFile);
	}*/

	@Test
	public void TestconcatenatePDF_exception() {
		String inputFile = "test/test/FORM12BB";
		String outFile = "";
		PDFUtil.concatenatePDF(outFile, inputFile);
	}

}
