package com.optum.gcm.common.util;

import org.apache.commons.io.FilenameUtils;

public final class FileNameUtil {
	private FileNameUtil() {
	}

	public static String cleanseFileName(String origFileName) {
		String origFileNameExtract = FilenameUtils.getBaseName(origFileName) + "."
				+ FilenameUtils.getExtension(origFileName);
		return origFileNameExtract.replaceAll("[^A-Za-z0-9\\.]", "_");
	}

	public static String getFileExtension(String filename) {
		return filename.substring(filename.lastIndexOf('.') + 1, filename.length()).toUpperCase();
	}

}
