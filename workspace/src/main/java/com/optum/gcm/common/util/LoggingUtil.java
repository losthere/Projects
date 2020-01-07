package com.optum.gcm.common.util;

import org.slf4j.Logger;

public final class LoggingUtil {

	private LoggingUtil() {
	}

	public static void logInfo(Logger log, boolean escapeArgs, String msg, Object... args) {
		if (log.isInfoEnabled()) {
			if (escapeArgs) {
				for (int i = 0; i < args.length; i++) {
					if (args[i] != null) {
						args[i] = args[i].toString().replaceAll("[^a-zA-Z0-9]", " ");
					}
				}
			}
			log.info(msg, args);
		}
	}

	public static void logInfo(Logger log, String msg, Object... args) {
		logInfo(log, false, msg, args);
	}

	public static void logInfo(Logger log, String msg) {
		logInfo(log, msg, new Object[] {});
	}

	public static void logDebug(Logger log, boolean escapeArgs, String msg, Object... args) {
		if (log.isDebugEnabled()) {
			if (escapeArgs) {
				for (int i = 0; i < args.length; i++) {
					if (args[i] != null) {
						args[i] = args[i].toString().replaceAll("[^a-zA-Z0-9]", " ");
					}
				}
			}
			log.debug(msg, args);
		}
	}

	public static void logDebug(Logger log, String msg, Object... args) {
		logDebug(log, false, msg, args);
	}

	public static void logDebug(Logger log, String msg) {
		logDebug(log, msg, new Object[] {});
	}
}
