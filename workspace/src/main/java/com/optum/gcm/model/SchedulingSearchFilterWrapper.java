package com.optum.gcm.model;

import java.util.Collections;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * @author pmule
 *
 */

public class SchedulingSearchFilterWrapper {
	
	private List<AssignInventorySearchFilter> assignInventorySearchFilter;

	public List<AssignInventorySearchFilter> getAssignInventorySearchFilter() {
		return (assignInventorySearchFilter != null) ? Collections.unmodifiableList(assignInventorySearchFilter) : null;
	}

	public void setAssignInventorySearchFilter(List<AssignInventorySearchFilter> assignInventorySearchFilter) {
		this.assignInventorySearchFilter = (assignInventorySearchFilter != null) ? Collections.unmodifiableList(assignInventorySearchFilter) : null;
	}

	private SchedulingSearchFilter schedulingSearchFilter;

	public SchedulingSearchFilter getSchedulingSearchFilter() {
		return schedulingSearchFilter;
	}

	public void setSchedulingSearchFilter(SchedulingSearchFilter schedulingSearchFilter) {
		this.schedulingSearchFilter = schedulingSearchFilter;
	}
	
	@Override
	  public String toString () {
	    return ToStringBuilder.reflectionToString(this,ToStringStyle.SHORT_PREFIX_STYLE);
	  }
}
