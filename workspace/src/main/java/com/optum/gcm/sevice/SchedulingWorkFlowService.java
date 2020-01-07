package com.optum.gcm.sevice;

import static com.optum.gcm.common.util.LoggingUtil.logInfo;
import static com.optum.gcm.dao.constants.FaxQueryConstants.UPDATE_APPT_AS_REFAX;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_GET_APPTDETAILS_BYAPPTID;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_GET_APPTDETAILS_BYCHARTID;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_GET_APPT_COMMENT;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_GET_CHARTDS_BY_APPT_KEY;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_GET_CHARTDS_WITHOUTAPPT;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_GET_CHART_MEMBER_DETAILS;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_GET_EXISTING_APPTS;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_GET_MEMBER_DETAILS;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_GET_PROVDETAILS_BYAPPTID;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_PUSH_NOT_SELECTED_WI_TO_WL;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_REMOVE_EXCLUDED_WI_FROM_APPT;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_SELECT_PROVIDER_KEYS;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_UPDATE_APPT_DETAILS;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_UPDATE_RETAPPT_APPTCANCEL;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_UPDATE_RETAPPT_DATEANDTIME;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_UPDATE_RETWI_APPTCANCEL;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_UPDATE_RETWI_RELTOASSN;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_UPDATE_RETWI_STATUS;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_UPDATE_RETWI_WITHAPPT;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_UPDATE_RETWI_WOAPPT;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUERY_UPDATE_WORKLIST_PROVIDER_DETAILS;
import static com.optum.gcm.dao.constants.SchedulingWorkFlowQueries.QUEY_GETCHARTSTATUS_CNTS;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import com.optum.gcm.common.dao.CommonJpaDao;
import com.optum.gcm.common.sevice.CommonJpaService;
import com.optum.gcm.common.util.LoggingUtil;
import com.optum.gcm.common.util.QueryBuilderUtil;
import com.optum.gcm.model.AppointmentComments;
import com.optum.gcm.model.AppointmentInfo;
import com.optum.gcm.model.AppointmentSearchFilter;
import com.optum.gcm.model.AssignInventorySearchFilter;
import com.optum.gcm.model.ChartMember;
import com.optum.gcm.model.ChartStatusCount;
import com.optum.gcm.model.ExistingAppointment;
import com.optum.gcm.model.GcmRetAppointment;
import com.optum.gcm.model.GcmRetApptComments;
import com.optum.gcm.model.MemberDetails;
import com.optum.gcm.model.ProviderDetails;
import com.optum.gcm.model.ProviderDetailsWrapper;
import com.optum.gcm.model.SchedulingSearchFilter;
import com.optum.gcm.model.SchedulingSearchFilterWrapper;
import com.optum.gcm.model.SchedulingWorklist;

/**
 * @author pmule
 *
 */

@Service
public class SchedulingWorkFlowService {

	private static final Logger LOG = LoggerFactory.getLogger(SchedulingWorkFlowService.class);

	@Autowired
	private CommonJpaService commonJpaService;

	@Autowired
	private CommonJpaDao commonJpaDao;

	public List<ExistingAppointment> getExistingAppts(AppointmentSearchFilter appointmentSearchFilter) {
		Map<String, Object> params = new HashMap<String, Object>();
		String queryString = "";
		String where = buildParams(appointmentSearchFilter, params);
		queryString = QUERY_GET_EXISTING_APPTS.replace("#WHERE#", where);
		List<ExistingAppointment> results = commonJpaService.getResultList(queryString, params,
				ExistingAppointment.class);
		return results;
	}

	public GcmRetAppointment getApptDetailsByApptId(GcmRetAppointment gcmRetAppointment) {
		Map<String, Object> params = new HashMap<String, Object>();
		String queryString = "";
		params.put("GCM_RET_APPT_KEY", gcmRetAppointment.getApptKey());
		queryString = QUERY_GET_APPTDETAILS_BYAPPTID;
		GcmRetAppointment results = null;
		try {
			results = commonJpaService.getResultObject(queryString, params, GcmRetAppointment.class);
			Date apptDateTime = results.getApptDateTime();
			if (null != apptDateTime) {
				String uiApptDate = new SimpleDateFormat("MM-dd-yyyy HH:mm:ss").format(apptDateTime);
				results.setUiApptDate(uiApptDate);
			}
		} catch (EmptyResultDataAccessException e) {
			results = new GcmRetAppointment();
		}
		return results;
	}
	
	public GcmRetAppointment getApptDetailsByChartID(String barcode) {
		Map<String, Object> params = new HashMap<String, Object>();
		String queryString = "";
		params.put("PROJ_CONTENT_BARCODE", barcode);
		queryString = QUERY_GET_APPTDETAILS_BYCHARTID;
		GcmRetAppointment results = null;
		try {
			results = commonJpaService.getResultObject(queryString, params, GcmRetAppointment.class);
			Date apptDateTime = results.getApptDateTime();
			if (null != apptDateTime) {
				String uiApptDate = new SimpleDateFormat("MM-dd-yyyy HH:mm:ss").format(apptDateTime);
				results.setUiApptDate(uiApptDate);
			}
		} catch (EmptyResultDataAccessException e) {
			results = new GcmRetAppointment();
		}
		return results;
	}

	public List<ChartMember> getChartMemberDetails(SchedulingSearchFilterWrapper wrapper) {

		Map<String, Object> filterparams = new HashMap<>();
		String whereFilter = QueryBuilderUtil.getWhereClause(wrapper.getSchedulingSearchFilter(), filterparams);
		long loginUserKey = wrapper.getSchedulingSearchFilter().getLoginUserKey();
		List<ChartMember> results = new ArrayList<ChartMember>();

		for (AssignInventorySearchFilter search : wrapper.getAssignInventorySearchFilter()) {
			List<ChartMember> searchresults = null;
			Map<String, Object> params = new HashMap<>();
			String where = QueryBuilderUtil.getAssignedToWhere(search, params);
			where += whereFilter;
			params.putAll(filterparams);

			if (null != wrapper.getSchedulingSearchFilter()
					&& null != wrapper.getSchedulingSearchFilter().getAppointmentId()
					&& wrapper.getSchedulingSearchFilter().getAppointmentId() > 0) {
				where += "AND WI.GCM_RET_APPT_KEY = :GCM_RET_APPT_KEY ";
				params.put("GCM_RET_APPT_KEY", wrapper.getSchedulingSearchFilter().getAppointmentId());
			} else {
				where += "AND WI.GCM_RET_APPT_KEY IS NULL ";
			}

			String queryString = QUERY_GET_CHART_MEMBER_DETAILS.replace("#WHERE#", where + " AND WI.GCM_BUS_FUNC_STATUS NOT IN ('RECVD', 'NONRETRIEVABLE', 'CANCELED', 'DUPLICATE','CNA') ");

			params.put("GCM_LOGIN_USER_KEY", loginUserKey);

			searchresults = commonJpaService.getResultList(queryString, params, ChartMember.class);
			results.addAll(searchresults);
		}
		return results;
	}

	public List<ChartMember> getChartMemberDetailsByApptId(SchedulingSearchFilterWrapper filter) {
		long loginUserKey = filter.getSchedulingSearchFilter().getLoginUserKey();
		long apptId = filter.getSchedulingSearchFilter().getAppointmentId();
		String roleCode = filter.getSchedulingSearchFilter().getRoleCode();
		Map<String, Object> filterparams = new HashMap<>();
		String where = "";
		if (null != roleCode && roleCode.equalsIgnoreCase("PDM")) {
			long noOfPendAttempts = filter.getSchedulingSearchFilter().getNoOfPendAttempts();
			where += " AND ((WI.GCM_BUS_FUNC_STATUS NOT IN ('RECVD','NONRETRIEVABLE', 'CANCELED', 'DUPLICATE', 'CNA') AND RA.APPT_STATUS!='PEND') OR (WI.GCM_BUS_FUNC_STATUS IN ('PEND','PEND RELEASED','NONRETRIEVABLE') AND NVL(WI.NO_OF_PEND_ATTEMPTS,0) = " + noOfPendAttempts + " AND  RA.APPT_STATUS='PEND')) ";
			//where += " AND ((WI.GCM_BUS_FUNC_STATUS NOT IN ('RECVD','NONRETRIEVABLE', 'CANCELED', 'DUPLICATE') AND RA.APPT_STATUS!='PEND') OR (WI.GCM_BUS_FUNC_STATUS NOT IN ('RECVD') AND  RA.APPT_STATUS='PEND')) ";
		} else {
			where = " AND IS_INCLUDE_FLAG IS NOT NULL AND WI.GCM_BUS_FUNC_STATUS NOT IN ('RECVD','NONRETRIEVABLE', 'CANCELED', 'DUPLICATE', 'CNA') ";
		}

		filterparams.put("GCM_RET_APPT_KEY", apptId);
		filterparams.put("GCM_LOGIN_USER_KEY", loginUserKey);
		if (null != filter.getSchedulingSearchFilter() && null != filter.getSchedulingSearchFilter().getAppointmentId()
				&& filter.getSchedulingSearchFilter().getAppointmentId() > 0) {
			where += "AND WI.GCM_RET_APPT_KEY = :GCM_RET_APPT_KEY ";
			filterparams.put("GCM_RET_APPT_KEY", filter.getSchedulingSearchFilter().getAppointmentId());
		} else {
			where += "AND WI.GCM_RET_APPT_KEY IS NULL ";
		}
		String queryString = QUERY_GET_CHART_MEMBER_DETAILS.replace("#WHERE#", where);
		List<ChartMember> results = commonJpaService.getResultList(queryString, filterparams, ChartMember.class);
		return results;
	}

	public List<ChartStatusCount> getChartStatusCountByUser(SchedulingSearchFilter schedulingSearchFilter)
			throws SQLException {
		Map<String, Object> params = new HashMap<String, Object>();
		String queryString = QUEY_GETCHARTSTATUS_CNTS;
		params.put("GCM_RET_APPT_KEY", schedulingSearchFilter.getAppointmentId());
		List<ChartStatusCount> results = commonJpaService.getResultList(queryString, params, ChartStatusCount.class);
		return results;
	}

	public List<SchedulingWorklist> getProviderDetailsByApptId(SchedulingSearchFilter schedulingSearchFilter)
			throws SQLException {
		Map<String, Object> params = new HashMap<String, Object>();
		String queryString = QUERY_GET_PROVDETAILS_BYAPPTID;
		params.put("GCM_USER_KEY", schedulingSearchFilter.getLoginUserKey());
		params.put("GCM_VENDOR_KEY", schedulingSearchFilter.getVendorKey());
		params.put("GCM_GROUP_KEY", schedulingSearchFilter.getGroupKey());
		params.put("GCM_RET_APPT_KEY", schedulingSearchFilter.getAppointmentId());
		List<SchedulingWorklist> results = commonJpaService.getResultList(queryString, params,
				SchedulingWorklist.class);
		return results;
	}

	public List<AppointmentComments> getApptComments(Long apptKey) throws SQLException {
		Map<String, Object> params = new HashMap<String, Object>();
		String queryString = QUERY_GET_APPT_COMMENT;
		params.put("GCM_RET_APPT_KEY", apptKey);
		List<AppointmentComments> results = commonJpaService.getResultList(queryString, params,
				AppointmentComments.class);
		return results;
	}

	public List<MemberDetails> getMemberDetails(AssignInventorySearchFilter filter) {
		Map<String, Object> params = new HashMap<>();
		String where = QueryBuilderUtil.getAssignedToWhere(filter, params);
		if (null != filter.getApptKey() && filter.getApptKey() > 0) {
			where = where + " AND GCM_RET_APPT_KEY = :GCM_RET_APPT_KEY ";
			params.put("GCM_RET_APPT_KEY", filter.getApptKey());
		} else {
			where = where + " AND GCM_RET_APPT_KEY IS NULL ";
		}
		String queryString = QUERY_GET_MEMBER_DETAILS.replace("#WHERE#", where);
		params.put("GCM_LOGIN_USER_KEY", filter.getLoginUserKey());
		return commonJpaService.getResultList(queryString, params, MemberDetails.class);
	}

	@Transactional
	public Long confirmAppointment(AppointmentInfo appt) throws SQLException, ParseException {
		// if user is trying to add the chartid's to existing appointment
		Long apptKey = appt.getAppt().getApptKey();

		List<String> nonSelectionChartList = null;

		// get all the chart id's based on the provider details 
		if (appt.getAssignInventorySearchFilter() != null && appt.getAssignInventorySearchFilter().size() > 0) {
			nonSelectionChartList = getChartIdswithProvDetails(appt);
		}
		if (apptKey > 0) {
			updateAppointment(appt);
			updateRetWIStatusWithAppt(appt, nonSelectionChartList, false, false);
			logInfo(LOG, true, "Confirm Appointment Status: {}", appt.getAppt().getApptStatus());
			if (null != appt.getAppt().getApptStatus()
					&& "SCHEDULED".equalsIgnoreCase(appt.getAppt().getApptStatus())) {
				logInfo(LOG, true, "removeExcludedRecordsFromAppt started {}", appt.getAppt().getApptStatus());
				removeExcludedRecordsFromAppt(apptKey, appt);
			}

			// Logic to untie excluded records from appointment
		} else {
			apptKey = createAppointment(appt.getAppt());
			appt.getAppt().setApptKey(apptKey);
			updateRetWIStatusWithAppt(appt, nonSelectionChartList, true, false);
		}

		return apptKey;
	}

	@Transactional
	public Long insertApptComments(AppointmentComments comments) throws SQLException {
		return insetComments(comments);
	}

	private Long insetComments(AppointmentComments comments) {
		if (null != comments.getApptComments() && !comments.getApptComments().equalsIgnoreCase("")) {
			java.util.Date date = new Date();
			java.sql.Timestamp timestampdate = new java.sql.Timestamp(date.getTime());
			GcmRetApptComments comm = new GcmRetApptComments();
			comm.setApptComments(comments.getApptComments());
			comm.setApptKey(comments.getApptKey());
			comm.setApptIteration(comments.getApptIteration());
			comm.setCreateUserId(comments.getCreateUserId());
			comm.setModifyUserId(comments.getCreateUserId());
			comm.setCreateDate(timestampdate);
			comm.setModifyDate(timestampdate);
			return commonJpaDao.persist(comm);
		}
		return 0L;
	}

	private List<String> getChartIdswithProvDetails(AppointmentInfo apptinfo) {

		List<AssignInventorySearchFilter> sch = apptinfo.getAssignInventorySearchFilter();
		List<String> chartIds = new ArrayList<String>();
		String queryString = null;
		String where = null;
		List<String> templist = null;
		Map<String, Object> params = new HashMap<>();

		double apptKey = 0;

		if (null != apptinfo.getAppt() && apptinfo.getAppt().getApptKey() > 0) {
			apptKey = apptinfo.getAppt().getApptKey();
		}

		for (AssignInventorySearchFilter provider : sch) {
			where = QueryBuilderUtil.getAssignedToWhere(provider, params);
			if (apptKey > 0) {
				where += " AND GCM_RET_APPT_KEY = :GCM_RET_APPT_KEY ";
				params.put("GCM_RET_APPT_KEY", apptKey);
			} else {
				where += " AND GCM_RET_APPT_KEY          IS NULL ";
			}
			queryString = QUERY_GET_CHARTDS_WITHOUTAPPT.replace("#WHERE#", where);

			params.put("GCM_LOGIN_USER_KEY", apptinfo.getLoginUserKey());
			params.put("GCM_USER_KEY", apptinfo.getLoginUserKey());

			templist = commonJpaService.getResultList(queryString, params, String.class);
			LoggingUtil.logDebug(LOG, "templist {} ", templist);
			chartIds.addAll(templist);
		}
		return chartIds;
	}

	@Transactional
	public void releaseToQue(AppointmentInfo info) throws SQLException {
		if (info.getChartIdList() != null) {
			updateRetWIStatusWOAppt(info);
			if (null != info.getAppt() && info.getAppt().getApptKey() > 0) {
				moveNotSelectedToWorklist(info);
				updateRetCancelAppt(info);
			}
		}
	}

	// @Transactional
	public Long createAppointment(GcmRetAppointment appt) throws SQLException, ParseException {
		java.util.Date date = new Date();
		java.sql.Timestamp timestampdate = new java.sql.Timestamp(date.getTime());
		GcmRetAppointment retappt = new GcmRetAppointment();
		retappt.setFirstName(appt.getFirstName().trim().toUpperCase());
		if (null != appt.getMiddleName()) {
			retappt.setMiddleName(appt.getMiddleName().toUpperCase());
		}
		retappt.setLastName(appt.getLastName().trim().toUpperCase());
		retappt.setApptIteration(1L);
		retappt.setAddress1(appt.getAddress1().trim().toUpperCase());
		retappt.setAddress2(appt.getAddress2().trim().toUpperCase());
		retappt.setCity(appt.getCity().trim().toUpperCase());
		retappt.setState(appt.getState());
		retappt.setZip(appt.getZip());
		retappt.setPhoneNum(appt.getPhoneNum());
		retappt.setFaxNum(appt.getFaxNum());
		retappt.setEmail(appt.getEmail().toUpperCase());
		retappt.setApptType(appt.getApptType());
		// if the appointment date received create with date, other wise create
		// dummy date
		if (StringUtils.isNotBlank(appt.getUiApptDate())) {
			Date date1 = new SimpleDateFormat("MM-dd-yyyy HH:mm:ss").parse(appt.getUiApptDate());
			java.sql.Timestamp timestampdate1 = new java.sql.Timestamp(date1.getTime());
			retappt.setApptDateTime(timestampdate1);
		}
		retappt.setApptType(appt.getApptType());
		retappt.setApptStatus(appt.getApptStatus());
		retappt.setReasonCode(appt.getReasonCode());
		retappt.setReasonComment(appt.getReasonComment());
		if (StringUtils.equalsIgnoreCase(appt.getApptType(), "FAX"))
			retappt.setFaxStatus(appt.getFaxStatus());
		else
			retappt.setFaxStatus(null);
		retappt.setGcmUserKey(appt.getGcmUserKey());
		retappt.setCreateUser(appt.getCreateUser());
		retappt.setCreateDate(timestampdate);
		retappt.setGcmVendorKey(appt.getGcmVendorKey());
		retappt.setGcmGroupKey(appt.getGcmGroupKey());
		retappt.setModifiedUser(appt.getModifiedUser());
		retappt.setModifiedDate(timestampdate);
		retappt.setNoOfAttempt(0L);
		if ("PEND".equalsIgnoreCase(appt.getApptStatus())) {
			retappt.setNoOfPendAttempts(1L);
		}
		return commonJpaDao.persist(retappt);
	}

	// @Transactional
	public void updateRetWIStatusWithAppt(AppointmentInfo appt, List<String> nonSelectionChartList,
			boolean isFromNewAppt, boolean isFromAddToExistingAppt) throws SQLException {
		Map<String, Object> params = new HashMap<>();

		String pendReasonCode = "";
		String pendReasonComment = "";

		if (null != appt.getPendReasonCode() && StringUtils.isNotBlank(appt.getPendReasonCode())) {
			pendReasonCode = appt.getPendReasonCode();
		}
		if (null != appt.getPendReasonComment() && StringUtils.isNotBlank(appt.getPendReasonComment())) {
			pendReasonComment = appt.getPendReasonComment();
		}

		params.put("GCM_RET_APPT_KEY", appt.getAppt().getApptKey());
		List<String> chartIdsList = appt.getChartIdList();
		if (null != chartIdsList && chartIdsList.size() > 1) {
			params.put("CHARTIDS", getChartIDStringFromList(chartIdsList));
		} else {
			params.put("CHARTIDS", chartIdsList);
		}

		params.put("MODIFY_USERID", appt.getRequestedUserId());
		params.put("GCM_BUS_FUNC_STATUS", appt.getRetStatus());
		params.put("IS_INCLUDE_FLAG", "Y");
		params.put("GCM_REASON_CODE", pendReasonCode);
		params.put("GCM_REASON_COMMENT", pendReasonComment);
		params.put("GCM_USER_KEY", appt.getAppt().getGcmUserKey());
		params.put("GCM_BUS_FUNC_DETAIL_KEY", appt.getBusFuncDtlKey());
		
		String queryString = QUERY_UPDATE_RETWI_WITHAPPT;
		if (StringUtils.equalsIgnoreCase(appt.getAppt().getApptType(), "FAX")) {
			if (!appt.isFaxAllMembers() && isFromNewAppt && !isFromAddToExistingAppt) {
				queryString = queryString.replace("#UPDATEFAXSTATUS#",
						" , RFAX_SENT_STATUS = CASE WHEN (CHART_FINDER_ID IS NULL OR RFAX_SENT_STATUS IS NULL OR (GCM_RET_APPT_KEY = :GCM_RET_APPT_KEY AND NVL(RFAX_SENT_STATUS,'Z') NOT IN ('REASSIGN','REASSIGN_REFAX')))  THEN 'NEW' "
								+ "  ELSE 'REASSIGN' END ");
			}
			else if (!appt.isFaxAllMembers() && !isFromNewAppt && !isFromAddToExistingAppt) {
				queryString = queryString.replace("#UPDATEFAXSTATUS#",
						" , RFAX_SENT_STATUS = CASE WHEN (CHART_FINDER_ID IS NULL) THEN 'NEW' "
								+ "  ELSE 'REASSIGN' END ");
			}
			else {
				queryString = queryString.replace("#UPDATEFAXSTATUS#",
						" , RFAX_SENT_STATUS = CASE WHEN (CHART_FINDER_ID IS NULL OR (GCM_RET_APPT_KEY = :GCM_RET_APPT_KEY AND NVL(RFAX_SENT_STATUS,'Z') NOT IN ('REASSIGN','REASSIGN_REFAX')))  THEN 'REFAX' "
								+ "  ELSE 'REASSIGN' END ");
			}
		} else {
			queryString = queryString.replace("#UPDATEFAXSTATUS#",
					" , RFAX_SENT_STATUS = CASE WHEN (CHART_FINDER_ID IS NOT NULL OR GCM_RET_APPT_KEY <> :GCM_RET_APPT_KEY) THEN 'REASSIGN' "
							+ "  ELSE RFAX_SENT_STATUS END ");
		}
		
		if ("PEND".equalsIgnoreCase(appt.getAppt().getApptStatus())) {
			queryString = queryString.replaceAll("#UPDATE_PEND_ATTEMPT#", ", NO_OF_PEND_ATTEMPTS = :NO_OF_PEND_ATTEMPTS ");
			params.put("NO_OF_PEND_ATTEMPTS", (appt.getAppt().getNoOfPendAttempts() == null) ? 1 : appt.getAppt().getNoOfPendAttempts() + 1);
		} else {
			queryString = queryString.replaceAll("#UPDATE_PEND_ATTEMPT#", "");
		}
		
		int cnt = 0;
		if (null != appt.getChartIdList() && appt.getChartIdList().size() > 0) {
			cnt = commonJpaDao.update(queryString, params);
			logInfo(LOG, true, "No.of Rows updated : {}", cnt);
		}
		/*
		 * Commenting out the Scheduled check condition as it is required to
		 * update include flag even during scheduled
		 */
		if (!"SCHEDULED".equalsIgnoreCase(appt.getAppt().getApptStatus())
				|| ("SCHEDULED".equalsIgnoreCase(appt.getAppt().getApptStatus()) && !isFromNewAppt)) {
			List<String> exclChartList = appt.getChartIdExclList();
			if (null != exclChartList && !exclChartList.isEmpty()) {

				if (exclChartList.size() > 1) {
					params.put("CHARTIDS", getChartIDStringFromList(exclChartList));
				} else {
					params.put("CHARTIDS", exclChartList);
				}

				if (!"PEND".equalsIgnoreCase(appt.getAppt().getApptStatus())) {
					params.put("IS_INCLUDE_FLAG", "N");
				}
				cnt = commonJpaDao.update(queryString, params);
				logInfo(LOG, true, "No.of Rows updated for exclusion list: {} : EXCl Chart List {}", cnt, exclChartList);
			}
			if (null != nonSelectionChartList && nonSelectionChartList.size() > 0) {

				if (nonSelectionChartList.size() > 1) {
					params.put("CHARTIDS", getChartIDStringFromList(nonSelectionChartList));
				} else {
					params.put("CHARTIDS", nonSelectionChartList);
				}

				if ("PEND".equalsIgnoreCase(appt.getAppt().getApptStatus())) {
					params.put("IS_INCLUDE_FLAG", "Y");
				}

				else if ("SCHEDULED".equalsIgnoreCase(appt.getAppt().getApptStatus())) {
					params.put("IS_INCLUDE_FLAG", "");
					// params.put("GCM_RET_APPT_KEY", "");
					params.put("GCM_BUS_FUNC_STATUS", "ASSIGNED");
				} else {
					params.put("IS_INCLUDE_FLAG", "");
				}
				/*
				 * if (params.get("RFAX_SENT_STATUS") != null) {
				 * params.remove("RFAX_SENT_STATUS"); queryString =
				 * queryString.replace("RFAX_SENT_STATUS = :RFAX_SENT_STATUS",
				 * " RFAX_SENT_STATUS = CASE WHEN (RFAX_SENT_STATUS IS NOT NULL AND CHART_FINDER_ID IS NOT NULL)  THEN 'REASSIGN' "
				 * +
				 * "  WHEN (RFAX_SENT_STATUS IS NOT NULL AND CHART_FINDER_ID IS NULL)  THEN 'UNASSIGNED' "
				 * + "  ELSE NULL END "); //params.put("RFAX_SENT_STATUS",
				 * "REASSIGN"); } else { queryString =
				 * queryString.replace("#UPDATEFAXSTATUS#",
				 * " ,  RFAX_SENT_STATUS = CASE WHEN (RFAX_SENT_STATUS IS NOT NULL AND CHART_FINDER_ID IS NOT NULL)  THEN 'REASSIGN' "
				 * +
				 * "  WHEN (RFAX_SENT_STATUS IS NOT NULL AND CHART_FINDER_ID IS NULL)  THEN 'UNASSIGNED' "
				 * + "  ELSE NULL END "); }
				 */
				cnt = commonJpaDao.update(queryString, params);
			}
		}
		if (isFromAddToExistingAppt && appt.isFaxAllMembers()
				&& StringUtils.equalsIgnoreCase(appt.getAppt().getApptType(), "FAX")) {
			updateFaxStatusByApptId(appt.getAppt().getApptKey(), appt.getRequestedUserId());
		}
		if ("PEND".equalsIgnoreCase(appt.getAppt().getApptStatus())) {
			AppointmentComments comments = new AppointmentComments();
			comments.setApptComments(pendReasonComment);
			comments.setApptKey(appt.getAppt().getApptKey());
			comments.setCreateUserId(appt.getRequestedUserId());
			comments.setApptIteration(appt.getAppt().getApptIteration());
			if (null != pendReasonComment && !pendReasonComment.equalsIgnoreCase(""))
				insertApptComments(comments);
		}
	}

	public void updateFaxStatusByApptId(Long apptId, String userId) {
		Map<String, Object> params = new HashMap<>();
		params.put("MODIFY_USERID", userId);
		params.put("GCM_RET_APPT_KEY", apptId);
		commonJpaDao.update(UPDATE_APPT_AS_REFAX, params);
	}

	public void updateRetWIStatusWOAppt(AppointmentInfo appt) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		List<String> chartIdList = appt.getChartIdList();
		if (null != chartIdList && chartIdList.size() > 1) {
			params.put("CHARTIDS", getChartIDStringFromList(chartIdList));
		} else {
			params.put("CHARTIDS", chartIdList);
		}

		params.put("MODIFY_USERID", appt.getRequestedUserId());
		params.put("GCM_BUS_FUNC_STATUS", appt.getRetStatus());
		params.put("GCM_BUS_FUNC_DETAIL_KEY", appt.getBusFuncDtlKey());
		params.put("IS_INCLUDE_FLAG", "NULL");
		String queryString = QUERY_UPDATE_RETWI_WOAPPT;
		int cnt = commonJpaDao.update(queryString, params);
		logInfo(LOG, "No.of Rows updated : {}", cnt);
	}

	public void moveNotSelectedToWorklist(AppointmentInfo appt) throws SQLException {
		String queryString = QUERY_PUSH_NOT_SELECTED_WI_TO_WL;
		Map<String, Object> params = new HashMap<>();
		params.put("MODIFY_USERID", appt.getRequestedUserId());
		params.put("GCM_RET_APPT_KEY", appt.getAppt().getApptKey());
		int cnt = commonJpaDao.update(queryString, params);
		logInfo(LOG, "No.of Rows updated : {}", cnt);
	}

	public void updateRetWIRelToAssn(AppointmentInfo appt) throws SQLException {
		Map<String, Object> params = new HashMap<>();
		List<String> chartIdList = appt.getChartIdList();
		if (null != chartIdList && chartIdList.size() > 1) {
			params.put("CHARTIDS", getChartIDStringFromList(chartIdList));
		} else {
			params.put("CHARTIDS", chartIdList);
		}
		params.put("MODIFY_USERID", appt.getRequestedUserId());
		params.put("GCM_BUS_FUNC_STATUS", appt.getRetStatus());
		params.put("IS_INCLUDE_FLAG", appt.getIncludeFlag());
		String queryString = QUERY_UPDATE_RETWI_RELTOASSN;
		int cnt = commonJpaDao.update(queryString, params);
		logInfo(LOG, "No.of Rows updated : {}", cnt);
	}

	private String buildParams(AppointmentSearchFilter appointmentSearchFilter, Map<String, Object> appmap) {

		String whereClause = "";

		if (appointmentSearchFilter != null) {
			if (appointmentSearchFilter.getGroupKey() > 0) {
				whereClause += " AND GCM_GROUP_KEY =:GCM_GROUP_KEY ";
				appmap.put("GCM_GROUP_KEY", appointmentSearchFilter.getGroupKey());
			}
			if (appointmentSearchFilter.getVendorKey() > 0) {
				whereClause += " AND GCM_VENDOR_KEY = :GCM_VENDOR_KEY ";
				appmap.put("GCM_VENDOR_KEY", appointmentSearchFilter.getVendorKey());
			}
			/*
			 * if
			 * (StringUtils.isNotBlank(appointmentSearchFilter.getFirstName()))
			 * { whereClause += "  AND FIRST_NAME = :FIRST_NAME ";
			 * appmap.put("FIRST_NAME",
			 * appointmentSearchFilter.getFirstName().trim().toUpperCase()); }
			 * if
			 * (StringUtils.isNotBlank(appointmentSearchFilter.getLastName())) {
			 * whereClause += " AND LAST_NAME= :LAST_NAME ";
			 * appmap.put("LAST_NAME",
			 * appointmentSearchFilter.getLastName().trim().toUpperCase()); }
			 */
			if (StringUtils.isNotBlank(appointmentSearchFilter.getAddr1())) {
				whereClause += " AND (( ADDRESS_1 = :ADDRESS_1 ";
				appmap.put("ADDRESS_1", appointmentSearchFilter.getAddr1().trim().toUpperCase());
			}
			/*
			 * if (StringUtils.isNotBlank(appointmentSearchFilter.getAddr2())) {
			 * whereClause += " AND ADDRESS_2 = :ADDRESS_2 ";
			 * appmap.put("ADDRESS_2",
			 * appointmentSearchFilter.getAddr2().trim().toUpperCase()); }
			 */
			if (StringUtils.isNotBlank(appointmentSearchFilter.getCity())) {
				whereClause += " AND CITY = :CITY ";
				appmap.put("CITY", appointmentSearchFilter.getCity().trim().toUpperCase());
			}
			if (StringUtils.isNotBlank(appointmentSearchFilter.getState())) {
				whereClause += " AND STATE = :STATE ";
				appmap.put("STATE", appointmentSearchFilter.getState().trim().toUpperCase());
			}
			if (StringUtils.isNotBlank(appointmentSearchFilter.getZip())) {
				whereClause += " AND ZIP = :ZIP) ";
				appmap.put("ZIP", appointmentSearchFilter.getZip().trim());
			}
			if (StringUtils.isNotBlank(appointmentSearchFilter.getPhone())) {
				whereClause += " OR PHONE_NUM = :PHONE_NUM ";
				appmap.put("PHONE_NUM", appointmentSearchFilter.getPhone().trim());
			}
			if (StringUtils.isNotBlank(appointmentSearchFilter.getFax())) {
				whereClause += " OR FAX_NUM = :FAX_NUM ) ";
				appmap.put("FAX_NUM", appointmentSearchFilter.getFax().trim());
			}

		}
		return whereClause;

	}

	@Transactional
	public void releaseToAssignment(AppointmentInfo info) throws SQLException {
		List<String> chartIdList = getChartIdswithProvDetails(info);
		info.setChartIdList(chartIdList);
		if (info.getChartIdList() != null) {
			updateRetWIRelToAssn(info);
		}
	}

	@Transactional
	public Long changeAppointmentDateAndTime(AppointmentInfo appt) throws SQLException, ParseException {
		// if user is trying to add the chartid's to existing appointment
		Long apptKey = appt.getAppt().getApptKey();
		if (apptKey > 0) {
			updateRetApptDateAndTime(appt);
			updateRetWorkitemStatus(appt);
			removeExcludedRecordsFromAppt(apptKey, appt);
		}
		return apptKey;
	}

	public void updateRetApptDateAndTime(AppointmentInfo appt) throws SQLException, ParseException {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_RET_APPT_KEY", appt.getAppt().getApptKey());
		String uiappDate = appt.getAppt().getUiApptDate();
		if (StringUtils.isNotBlank(appt.getAppt().getUiApptDate())) {
			Date date = new SimpleDateFormat("MM-dd-yyyy HH:mm:ss").parse(uiappDate);
			params.put("APPT_DATE_TIME", date);
		}
		params.put("MODIFY_USERID", appt.getRequestedUserId());
		params.put("APPT_STATUS", appt.getAppt().getApptStatus());

		String queryString = QUERY_UPDATE_RETAPPT_DATEANDTIME;
		int cnt = commonJpaDao.update(queryString, params);
		logInfo(LOG, "No.of Rows updated : {}", cnt);
	}

	private void updateRetWorkitemStatus(AppointmentInfo appt) {
		String queryString = QUERY_UPDATE_RETWI_STATUS;
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_RET_APPT_KEY", appt.getAppt().getApptKey());
		params.put("MODIFY_USERID", appt.getRequestedUserId());
		params.put("GCM_BUS_FUNC_STATUS", appt.getAppt().getApptStatus());
		int cnt = commonJpaDao.update(queryString, params);
		logInfo(LOG, true, "No.of Rows updated : {} With Status ", cnt, appt.getAppt().getApptStatus());
	}

	@Transactional
	public Long cancelAppointment(AppointmentInfo appt) throws SQLException {
		Long apptKey = appt.getAppt().getApptKey();
		List<String> chartIdList = getChartIdsByApptKey(appt);
		appt.setChartIdList(chartIdList);

		if (apptKey > 0) {
			updateRetCancelAppt(appt);
			if (null != appt.getChartIdList() && appt.getChartIdList().size() > 0) {
				updateRetWIApptCancelAppt(appt);
			}
		}
		return apptKey;
	}

	private void updateRetCancelAppt(AppointmentInfo appt) {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_RET_APPT_KEY", appt.getAppt().getApptKey());
		params.put("MODIFY_USERID", appt.getRequestedUserId());
		String queryString = QUERY_UPDATE_RETAPPT_APPTCANCEL;
		int cnt = commonJpaDao.update(queryString, params);
		logInfo(LOG, "No.of Rows updated : {}", cnt);

	}

	private void updateRetWIApptCancelAppt(AppointmentInfo appt) {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_RET_APPT_KEY", appt.getAppt().getApptKey());
		List<String> chartIdList = appt.getChartIdList();
		if (null != chartIdList && chartIdList.size() > 1) {
			params.put("CHARTIDS", getChartIDStringFromList(chartIdList));
		} else {
			params.put("CHARTIDS", chartIdList);
		}
		params.put("MODIFY_USERID", appt.getRequestedUserId());
		String queryString = QUERY_UPDATE_RETWI_APPTCANCEL;
		int cnt = commonJpaDao.update(queryString, params);
		logInfo(LOG, "No.of Rows updated : {} ", cnt);

	}

	private void updateAppointment(AppointmentInfo apptInfo) throws ParseException {
		GcmRetAppointment appt = apptInfo.getAppt();
		String queryString = QUERY_UPDATE_APPT_DETAILS;
		Map<String, Object> params = new HashMap<>();
		Date date = null;
		// if the appointment date received create with date, other wise create
		// dummy date
		if (StringUtils.isNotBlank(appt.getUiApptDate())) {
			date = new SimpleDateFormat("MM-dd-yyyy HH:mm:ss").parse(appt.getUiApptDate().toString());
		}
		if (null != date) {
			params.put("APPT_DATE_TIME", date);
		} else {
			params.put("APPT_DATE_TIME", "");
		}
		params.put("APPT_TYPE", appt.getApptType());
		params.put("APPT_STATUS", appt.getApptStatus());
		params.put("FIRST_NAME", appt.getFirstName().trim().toUpperCase());
		params.put("LAST_NAME", appt.getLastName().trim().toUpperCase());
		params.put("ADDRESS_1", appt.getAddress1().trim().toUpperCase());
		if (null != appt.getAddress2()) {
			params.put("ADDRESS_2", appt.getAddress2().trim().toUpperCase());
		} else {
			params.put("ADDRESS_2", "");
		}
		params.put("CITY", appt.getCity().trim().toUpperCase());
		params.put("STATE", appt.getState());
		params.put("ZIP", appt.getZip());
		params.put("PHONE_NUM", appt.getPhoneNum());
		params.put("FAX_NUM", appt.getFaxNum());
		if (null != appt.getEmail()) {
			params.put("EMAIL", appt.getEmail().trim().toUpperCase());
		} else {
			params.put("EMAIL", "");
		}
/*		if (StringUtils.equalsIgnoreCase(appt.getApptType(), "FAX"))
			params.put("FAX_STATUS", "NEW");
		else
			params.put("FAX_STATUS", null);*/
		params.put("MODIFY_USERID", apptInfo.getRequestedUserId());
		params.put("GCM_RET_APPT_KEY", appt.getApptKey());
		params.put("NO_OF_ATTEMPTS", appt.getNoOfAttempts());
		params.put("GCM_REASON_CODE", appt.getReasonCode());
		params.put("GCM_REASON_COMMENT", appt.getReasonComment());
		
		if ("PEND".equalsIgnoreCase(appt.getApptStatus())) {
			queryString = queryString.replaceAll("#UPDATE_PEND_ATTEMPT#", ", NO_OF_PEND_ATTEMPTS = :NO_OF_PEND_ATTEMPTS ");
			params.put("NO_OF_PEND_ATTEMPTS", (appt.getNoOfPendAttempts() == null) ? 1 : appt.getNoOfPendAttempts() + 1);
		} else {
			queryString = queryString.replaceAll("#UPDATE_PEND_ATTEMPT#", "");
		}
			
		commonJpaService.update(queryString, params);
	}

	private List<String> getChartIdsByApptKey(AppointmentInfo apptinfo) {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_RET_APPT_KEY", apptinfo.getAppt().getApptKey());
		params.put("GCM_LOGIN_USER_KEY", apptinfo.getLoginUserKey());
		String queryString = QUERY_GET_CHARTDS_BY_APPT_KEY;
		return commonJpaService.getResultList(queryString, params, String.class);

	}

	private void removeExcludedRecordsFromAppt(Long apptKey, AppointmentInfo apptinfo) {
		Map<String, Object> params = new HashMap<>();
		params.put("GCM_RET_APPT_KEY", apptKey);
		params.put("MODIFY_USERID", apptinfo.getRequestedUserId());
		String queryString = QUERY_REMOVE_EXCLUDED_WI_FROM_APPT;
		commonJpaService.update(queryString, params);
	}

	@Transactional
	public void updateWorkListProviderAddressDetails(ProviderDetailsWrapper providerDetailsWrapper) throws Exception {
		List<ProviderDetails> providerDetailsList = providerDetailsWrapper.getProviderDetails();
		SchedulingSearchFilter schedulingSearchFilter = providerDetailsWrapper.getSchedulingSearchFilter();
		for (ProviderDetails providerDetails : providerDetailsList) {
			Map<String, Object> params = new HashMap<>();
			String updateQuery = QUERY_UPDATE_WORKLIST_PROVIDER_DETAILS;
			String queryString = QUERY_SELECT_PROVIDER_KEYS;
			params.put("PROVIDER_ADDRESS", providerDetails.getAddress());
			params.put("PROV_PHONE", providerDetails.getPhone());
			params.put("PROV_FAX", providerDetails.getFax());
			params.put("MODIFY_USERID", providerDetails.getUserId());

			Map<String, Object> selectParams = new HashMap<>();
			String where = "";
			if (schedulingSearchFilter != null) {
				where = QueryBuilderUtil.getWhereClause(schedulingSearchFilter, selectParams);
			}
			selectParams.put("PROVNAME", providerDetails.getSchedulingInventory().getProvName());
			selectParams.put("PROV_ID", providerDetails.getSchedulingInventory().getProvId());
			selectParams.put("PROVPHONE", providerDetails.getSchedulingInventory().getProvPhone());
			if (StringUtils.isNotBlank(providerDetails.getSchedulingInventory().getProvLocation())) {
				selectParams.put("PROVLOCATION", providerDetails.getSchedulingInventory().getProvLocation());
				queryString += " AND GP.PROVIDER_ADDRESS = :PROVLOCATION  ";
			}
			if (StringUtils.isNotBlank(providerDetails.getSchedulingInventory().getProvFax())) {
				selectParams.put("PROVFAX", providerDetails.getSchedulingInventory().getProvFax());
				queryString += " AND  GP.PROV_FAX = :PROVFAX  ";
			}
			if (StringUtils.isNotBlank(providerDetails.getSchedulingInventory().getSpecialNotes())) {
				selectParams.put("SPECIAL_NOTES", providerDetails.getSchedulingInventory().getSpecialNotes());
				queryString += " AND GP.SPECIAL_NOTES = :SPECIAL_NOTES ";
			}
			if (StringUtils.isNotBlank(providerDetails.getSchedulingInventory().getSpecialCategory())) {
				selectParams.put("SPECIAL_CATEGORY", providerDetails.getSchedulingInventory().getSpecialCategory());
				queryString += " AND WI.SPECIAL_CATEGORY = :SPECIAL_CATEGORY ";
			}
			queryString = queryString.replaceAll("#WHERE#", where);
			List<Long> list = commonJpaService.getResultList(queryString, selectParams, long.class);
			if (list.size() > 0) {
				params.put("GCM_PROVIDER_KEY", list);
				commonJpaService.update(updateQuery, params);
			}
		}
	}

	public long addToExistingAppointment(@RequestBody AppointmentInfo appt) throws SQLException, ParseException {
		GcmRetAppointment retAppt = appt.getAppt();
		Long apptKey = retAppt.getApptKey();

		if (apptKey > 0) {
			updateRetWIStatusWithAppt(appt, null, false, true);

			java.util.Date date = new Date();
			java.sql.Timestamp timestampdate = new java.sql.Timestamp(date.getTime());
			GcmRetApptComments comments = new GcmRetApptComments();
			String comment = appt.getChartIdList().size() + " member(s) added to appointment by user "
					+ appt.getRequestedUserId();
			comments.setApptComments(comment);
			comments.setApptComments(comments.getApptComments());
			comments.setApptKey(apptKey);
			comments.setApptIteration(retAppt.getApptIteration());
			comments.setCreateUserId(appt.getRequestedUserId());
			comments.setModifyUserId(appt.getRequestedUserId());
			comments.setCommentType("SYSTEM");
			comments.setCreateDate(timestampdate);
			comments.setModifyDate(timestampdate);
			commonJpaDao.persist(comments);
		}
		return apptKey;
	}

	public List<Date> getApptAttemptedDates(Long apptKey) {
		String queryString = "SELECT  HIST_INSERT_DATE_TIME FROM GCM_RET_APPT_HISTORY "
				+ " WHERE APPT_STATUS='PASTDUE' AND GCM_RET_APPT_KEY = :GCM_RET_APPT_KEY ORDER BY HIST_INSERT_DATE_TIME DESC ";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("GCM_RET_APPT_KEY", apptKey);
		List<Date> apptAttemptedDates = commonJpaService.getResultList(queryString, params, Date.class);
		return apptAttemptedDates;
	}

	private String getChartIDStringFromList(List<String> chartIdList) {
		StringBuilder chartIdListStr = new StringBuilder();
		for (int i = 0; i < chartIdList.size(); i++) {
			chartIdListStr.append(chartIdList.get(i));
			if (i < chartIdList.size() - 1) {
				chartIdListStr.append(',');
			}
		}
		return chartIdListStr.toString();
	}
}
