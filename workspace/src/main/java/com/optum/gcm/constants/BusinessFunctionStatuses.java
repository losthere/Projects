package com.optum.gcm.constants;

import java.util.EnumSet;
import java.util.Set;

public class BusinessFunctionStatuses {
	public enum RetrievalStatuses {
		NEW, RELEASED, UNSCHEDULED, SENT, SCHEDULED, RETVD, PNP, PNPRELEASE, CNA, RECVD, CANCELED, DUPLICATE, PASTDUE, REJRETQA, INACTIVATED, EXTRATOVEN, PNPFINAL, CNAFINAL, REQACK;

		public static final Set<RetrievalStatuses> COMPLETED = EnumSet.of(RECVD, CANCELED, INACTIVATED, CANCELED, DUPLICATE,
				CNAFINAL, PNPFINAL);

		public static final Set<RetrievalStatuses> ASSIGNABLE = EnumSet.of(RELEASED, PNP, SCHEDULED, NEW, UNSCHEDULED,
				PNPRELEASE, PASTDUE, RETVD, CNA, REJRETQA, EXTRATOVEN, REQACK);

		public static final Set<RetrievalStatuses> NON_EXTRACTED = EnumSet.of(NEW, RELEASED, CANCELED, INACTIVATED);
	}
}
