/**
 * 
 */
package com.optum.gcm.common.util;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfCopy;
import com.itextpdf.text.pdf.PdfReader;

/**
 * @author gsithur
 *
 */
public final class PDFUtil {

	private PDFUtil() {
	}

	private static final Logger LOGGER = LoggerFactory.getLogger(PDFUtil.class);

	/**
	 * @param outputFile -- Fully qualified file name with absolute path
	 * @param files      -- List of files that needs to be concatenated
	 * @return true if concatenation is successful or else false
	 */
	public static int concatenatePDF(String outputFile, String... files) {
		int totalPages = 0;
		// step 1
		Document document = new Document();
		FileOutputStream fileOutputStream = null;
		// step 2
		try {
			fileOutputStream = new FileOutputStream(outputFile);
			PdfCopy copy = new PdfCopy(document, fileOutputStream);
			// step 3
			document.open();
			// step 4
			PdfReader reader;
			PdfReader.unethicalreading = true;
			int n;
			// loop over the documents you want to concatenate
			for (int i = 0; i < files.length; i++) {
				LOGGER.info(files[i]);
				reader = new PdfReader(files[i]);
				// loop over the pages in that document
				n = reader.getNumberOfPages();
				for (int page = 0; page < n;) {
					copy.addPage(copy.getImportedPage(reader, ++page));
				}
				copy.freeReader(reader);
				reader.close();
				totalPages = totalPages + n;
			}
		} catch (Exception e) {
			totalPages = 0;
			LOGGER.error("Exception occured in concatenatePDF ", e);
		} finally {
			// step 5
			document.close();
			try {
				if (fileOutputStream != null)
					fileOutputStream.close();
			} catch (IOException e) {
				LOGGER.error(e.getMessage());
			}
		}
		return totalPages;
	}

	/**
	 * Get the page count of pdf file
	 * 
	 * @param inputFile - Fully qualified file name with absolute path
	 * @return page count (int)
	 * @throws Exception
	 */
	public static int getPageCount(String inputFile) throws Exception {
		PdfReader reader = null;
		try {
			reader = new PdfReader(inputFile);
			return reader.getNumberOfPages();
		} catch (Exception e) {
			LOGGER.error("Exception occured : ", e);
			throw e;
		} finally {
			if (reader != null) {
				reader.close();
			}
		}
	}

	/**
	 * 
	 * @param inputFile  - input file name with complete path
	 * @param pageNumStr - Page numbers to be extracted
	 * @param outFile    - Output file name with path
	 */
	public static void getRequestPDF(String inputFile, String pageNumStr, String outFile) {
		PdfReader reader = null;
		PdfCopy copy = null;
		OutputStream out = null;
		try {
			PdfReader.unethicalreading = true;
			reader = new PdfReader(inputFile);
			reader.selectPages(pageNumStr);
			int n = reader.getNumberOfPages();
			Document document = new Document();
			out = new FileOutputStream(outFile);
			copy = new PdfCopy(document, out);
			document.open();
			for (int i = 0; i < n;) {
				copy.addPage(copy.getImportedPage(reader, ++i));
			}
			document.close();
		} catch (IOException e) {
			LOGGER.error("Exception occured : ", e);
		} catch (DocumentException e) {
			LOGGER.error("Exception occured : ", e);
		} finally {
			if (out != null) {
				try {
					out.close();
				} catch (Exception e) {
					LOGGER.error("Exception occured : ", e);
				}
			}
			if (reader != null) {
				try {
					reader.close();
				} catch (Exception e) {
					LOGGER.error("Exception occured : ", e);
				}
			}
		}
	}

}
