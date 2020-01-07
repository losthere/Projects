//Constants

var OUTREACH_SCHEDULER_BUS_FUNC_DTL_KEY = 1;
var ONSITE_SCHEDULER_BUS_FUNC_DTL_KEY = 2;
var EMR_SCHEDULER_BUS_FUNC_DTL_KEY = 3;

var schedulerworklistmodule = angular.module('schduleWorkList', [ 'uitk.component.tabs', 'uitk.component.uitkDynamicTable',
		'uitk.component.uitkPanel', 'uitk.component.uitkTextField', 'uitk.component.uitkLabel', 'uitk.component.uitkTextarea',
		'uitk.component.uitkIconFont', 'ngSanitize', 'looup-data', 'uitk.component.uitkWizard', 'uitk.component.uitkDialog',
		'uitk.component.uitkCalendar', 'uitk.component.uitkDateOfBirth', 'uitk.component.uitkMessage', 'staticDataService']);
schedulerworklistmodule.directive('filterDirective', function() {
	return {
		restrict : 'E',
		templateUrl : '../retrieval/assignment/filters.html'
	};
});

schedulerworklistmodule.factory("dataServiceModel", function() {
	var dataObj = {};
	dataObj.providerInfoModel = {};
	dataObj.providerInfoVisited = false;
	dataObj.providerSelectionChanged = false;
	dataObj.retrvlInfoVisited = false;
	dataObj.retrvlSelectionChanged = false;
	dataObj.showViewAppt = false;
	dataObj.providerRecords = [];
	dataObj.selectedProvRecords = [];
	dataObj.retrievalRecords = [];
	dataObj.includedRtrvlRecords = [];
	dataObj.existingAppointments = [];
	dataObj.myAppointmentsModel = {};
	dataObj.previousAtmtDates = [];
	dataObj.selectedAppt = {};
	dataObj.apptKey = '';
	
	return dataObj;
});

schedulerworklistmodule.controller("schdulerWorkListController", function($scope, $compile, $timeout, $http, lookupService,
		dataServiceModel, staticDataService) {
	lookupService.filters.currentTab=="myWorklistTab";
	lookupService.clearWorklistFilters = true;
	$scope.dataModel = dataServiceModel;
	$scope.dataModel.showPendLoadingDialog = false;
	$scope.dataModel.showFiltersLoadingDialog = false;
	$scope.showConfirmLoadingDialog = false;
	$scope.showSaveDraftLoadingDialog = false;

	var userObj = optumUI.getUser();
	$scope.dataModel.loginUserKey = userObj.getLoggedInUserKey();
	$scope.dataModel.loginUserId = optumUI.getAuthUser();
	$scope.dataModel.vendorKey = userObj.getDefaultVendorKey();
	$scope.dataModel.currentGroupKey =  userObj.getCurrentGroupKey();
	//$scope.dataModel.currentRole =  CordysRoot.optumUI.currentUserRole;
	var rootData = window.parent ? window.parent.rootData : {};
	$scope.dataModel.currentRole =  rootData.currentRole;
	
	$scope.dataModel.showFlag=false;
	if($scope.dataModel.currentRole == "SH"){
		$scope.dataModel.busFuncDtlKey = OUTREACH_SCHEDULER_BUS_FUNC_DTL_KEY;
	}else if ($scope.dataModel.currentRole == "OSH"){
		$scope.dataModel.busFuncDtlKey = ONSITE_SCHEDULER_BUS_FUNC_DTL_KEY;
	}else if ($scope.dataModel.currentRole == "ESH"){
		$scope.dataModel.busFuncDtlKey = EMR_SCHEDULER_BUS_FUNC_DTL_KEY;
	}
	$scope.dataModel.showMemberInfoDialog = false;
	$scope.dataModel.showCancelApptDialog = false;
	$scope.dataModel.showChangeApptDtTimeDialog = false;
	$scope.dataModel.showWorklist = true;
	$scope.dataModel.isFromViewApptmnt = false;
	$scope.dataModel.showViewAppt = false;
	$scope.dataModel.recordModified = false;
	$scope.dataModel.cancelClick = false;
	
	$scope.dataModel.workListErrorMessageModel = {
		id : 'retrievalError',
        messageType : 'error',
        content : '',
        visible : false,
        ariaAttributes : true,
        headingLevel : '2'
	}
	$scope.dataModel.workListSuccessMessageModel = {
		id : 'success-message',
		messageType : 'success',
		content : '',
		visible : false,
		messageRole : 'alertdialog',
		ariaAttributes : true,
		headingLevel : '2'
	};
	$scope.dataModel.workListWarningMessageModel = {
		id : 'warning-message',
		messageType : 'warning',
		content : '',
		visible : false,
		ariaAttributes : true,
		headingLevel : '2',
		position : 'inline'
	};
	
	$scope.dataModel.changeDataTimeMessageModel = {
		id : 'changeDtTimeError',
        messageType : 'error',
        content : '',
        visible : false,
        ariaAttributes : true,
        headingLevel : '2'
	}
	
	$scope.worklistFilters = {
		id : 'worklistFilterPanel',
		title : 'Filters',
		templateUrl : '../retrieval/assignment/filters.html',
		open : true,
		collapsible : true
	}

	$scope.schedulerWorkListTabsModel = {
		selectedIndex : 0,
		id : 'scheduleWorkListTabs',
		ariaLabel : 'Scheduler Worklist',
		eventsEnable : true,
		tabs : [ {
			title : 'My Worklist',
			templateurl : 'views/schedulermyworklist.htm',
			disabled : false,
			callback : function(event, tabData) {
				lookupService.clearApptFilters = true;
				lookupService.filters.currentTab = 'myWorklistTab';
				// myWorklist tab Focus
			}
		}, {
			title : 'My Appointments',
			templateurl : 'views/schedulermyappointments.htm',
			disabled : false,
			callback : function(event, tabData) {
				lookupService.clearWorklistFilters = true;
				lookupService.filters.currentTab='myAppTab';
			}
		} ]
	};
	
	$scope.amPMTypes = [	
							{
								label:'AM',
								value:'AM',
								disabled:false
							},
							{
								label:'PM',
								value:'PM',
								disabled:false
							}
						];
	
	var readStates = function(){
		$http.post('/gcm-app-services/masterdata/states').then(function(response) {
			if(response && response.data && response.data.result && response.data.result.length > 0){
				$scope.dataModel.states = response.data.result;					
				$scope.dataModel.states.splice(0,0,{key:'', value:'Select'});
				$scope.dataModel.stateSelect = '';
			}else{
				$scope.dataModel.states = [];
			}
		}, function(error) {
			var message = JSON.stringify(error);
			$scope.dataModel.setMessage(message, "error");
		});
	}
	
	var getChartCounts = function(){
	$scope.dataModel.SchedulingSearchFilter={
			loginUserKey : $scope.dataModel.loginUserKey,
			busFuncDtlKey : $scope.dataModel.busFuncDtlKey
	};
		$http.post('/gcm-app-services/scheduling/worklist/getAssignedChartCountByUser', $scope.dataModel.SchedulingSearchFilter).then(function(response) {
			if(response && response.data && response.data.result ){
				$scope.dataModel.getChartCount = response.data.result;	
				$scope.dataModel.workListWarningMessageModel.visible =true;
				$scope.dataModel.workListWarningMessageModel.content ="<span>Warning!</span><br/><span>You have "+response.data.result.inprogressCnt+" appointments In Progress.</span><br/><span>You have "+response.data.result.pastdueCnt+" appointments Past Due.</span>";
			}else{
				$scope.dataModel.getChartCount = [];
			}
		}, function(error) {
			var message = JSON.stringify(error);
			$scope.dataModel.setMessage(message, "error");
		});
	}
	getChartCounts();
	if(!$scope.dataModel.states || $scope.dataModel.states.length <= 0)
	{
		readStates();
	}
	$scope.dataModel.setMessage = function(message, messageType){
		$scope.dataModel.clearBanners();
		if(messageType && messageType == "success"){
			$scope.dataModel.workListSuccessMessageModel.content = '<span>'+message+'</span>';
			$scope.dataModel.workListSuccessMessageModel.visible = true;
			$scope.dataModel.workListSuccessMessageModel.messageType='success';
			//$scope.dataModel.workListSuccessMessageModel.messageVisibleTime = '5000';
		}else if(messageType && messageType == "error"){
			$scope.dataModel.workListErrorMessageModel.content = '<span>'+message+'</span>';
			$scope.dataModel.workListErrorMessageModel.visible = true;
			$scope.dataModel.workListErrorMessageModel.messageType='error';
		}
		else if(messageType && messageType == "warning"){
			$scope.dataModel.workListErrorMessageModel.content = '<span>'+message+'</span>';
			$scope.dataModel.workListErrorMessageModel.visible = true;
			$scope.dataModel.workListErrorMessageModel.messageType='warning';
		}
	}
	
	$scope.dataModel.clearBanners = function(){
		$scope.dataModel.workListSuccessMessageModel.visible = false;
		$scope.dataModel.workListErrorMessageModel.visible = false;		
	}
	
	// Schedule appointment wizard logic
	dataServiceModel.hasCompletedAllSteps = false;

	$scope.dataModel.wizardModel = {
		id : "createSchedule",
		wizardDescriptionId : "createScheduleWizard",
		renderNavIndexes : true,
		buttonsTemplateUrl : "",
		wizardSteps : [ {
			label : "Provider Information",
			templateurl : '../retrieval/scheduling/views/providerinformation.htm'
		}, {
			label : "Retrieval Information",
			templateurl : '../retrieval/scheduling/views/retrievalinformation.htm',
			focusElementId : 'firstNameId_input'
		}, {
			label : "Appointment",
			templateurl : '../retrieval/scheduling/views/appointment.htm',
			focusElementId : 'userNameId_input'
		}, {
			label : "Confirmation",
			templateurl : '../retrieval/scheduling/views/appointmentconfirmation.htm',
			focusElementId : 'iAgreeLblId'
		} ],
		previousButton:{
			label : "Previous",
			callback: function(){
				return $scope.handlePrevButtonClick();
			}
		},
		nextButton : {
			label : "Next",
			callback: function(){
				return $scope.handleNextButtonClick();
			}
		},
		extraBtn1 : {
			label : "Pend Appointment",
			show : true,
			action : function() {
				$scope.handlePendAppointMent();
			}
		},
		extraBtn2 : {
			label : "Save as Draft",
			show : true,
			action : function() {
				$scope.handleSaveAsDraft();
			}
		},
		finishButton : {
			label : "Finish",
			callback : function() {

				this.hasCompletedAllSteps = false;
				dataServiceModel.hasCompletedAllSteps = false;
				return $scope.handleFinishClick();
			}
		},
		cancelLink : {
			label : "Cancel",
			action : function() {
				$scope.handleCancelClick();
			}
		}
	}
	
	
	$scope.handlePrevButtonClick = function(){
		$scope.dataModel.showPendLoadingDialog=false;
		$scope.dataModel.clearBanners();
		if($scope.dataModel.wizardModel.currentStep == 2){
			$scope.dataModel.wizardModel.nextButton.label = 'Next';
			$("#createSchedule_nextBtn").text($scope.dataModel.wizardModel.nextButton.label);
		}else if($scope.dataModel.wizardModel.currentStep == 3){
			$scope.dataModel.providerSelectionChanged = false;
		}
		return true;
	}
	
	$scope.handleNextButtonClick = function(){
		$scope.dataModel.clearBanners();
		if($scope.dataModel.wizardModel.currentStep == 1){
			if($scope.dataModel.retrvlPrefSelect == 'EMR' && $scope.dataModel.busFuncDtlKey != EMR_SCHEDULER_BUS_FUNC_DTL_KEY){
				$scope.dataModel.wizardModel.nextButton.label = 'Release to EMR Queue';
				$("#createSchedule_nextBtn").text($scope.dataModel.wizardModel.nextButton.label);
				$scope.dataModel.wizardModel.nextButton.disabled = false;
			}else if($scope.dataModel.retrvlPrefSelect == 'ONSITE' && $scope.dataModel.busFuncDtlKey != ONSITE_SCHEDULER_BUS_FUNC_DTL_KEY){
				$scope.dataModel.wizardModel.nextButton.label = 'Release to Onsite Queue';
				$("#createSchedule_nextBtn").text($scope.dataModel.wizardModel.nextButton.label);
				$scope.dataModel.wizardModel.nextButton.disabled = false;
			}else{
				$scope.dataModel.wizardModel.nextButton.label = 'Next';
				$("#createSchedule_nextBtn").text($scope.dataModel.wizardModel.nextButton.label);
				$scope.dataModel.wizardModel.nextButton.disabled = false;
			}
		}
		if($scope.dataModel.wizardModel.currentStep == 2){
			if($scope.dataModel.includedRtrvlRecords.length <= 0){
				$scope.dataModel.setMessage("Select Members to release to EMR/ONSITE Queue", "error");
				return;
			}
			
			if($scope.dataModel.retrvlPrefSelect == 'EMR' && $scope.dataModel.busFuncDtlKey != EMR_SCHEDULER_BUS_FUNC_DTL_KEY){
				//alert("push to emr queue logic");
				$scope.dataModel.confirmType = 'ReleaseToEMR'
				$scope.dataModel.confirmMessage = "Included members will be sent to the EMR queue for assignment.  Excluded members will return to your Worklist.  Do you want to proceed?";
				$scope.dataModel.showConfirmApptDialog = !$scope.dataModel.showConfirmApptDialog;
				return false;
			}else if($scope.dataModel.retrvlPrefSelect!=null && $scope.dataModel.retrvlPrefSelect.toUpperCase() == 'ONSITE' && $scope.dataModel.busFuncDtlKey != ONSITE_SCHEDULER_BUS_FUNC_DTL_KEY){
				//push to onsite queue logic;
				$scope.dataModel.confirmType = 'ReleaseToONSITE'
				$scope.dataModel.confirmMessage = "Included members will be sent to the Onsite queue for assignment.  Excluded members will return to your Worklist.  Do you want to proceed?";
				$scope.dataModel.showConfirmApptDialog = !$scope.dataModel.showConfirmApptDialog;
				return false;
			}
		if($scope.dataModel.phonenumber.length>10 || $scope.dataModel.phonenumber.length==0)
			$scope.phoneNo=$scope.dataModel.phonenumber;
		else if($scope.dataModel.phonenumber.length==10)
			$scope.phoneNo=$scope.dataModel.phonenumber.slice(0,3)+"-"+$scope.dataModel.phonenumber.slice(3,6)+"-"+$scope.dataModel.phonenumber.slice(6,10);
		if($scope.dataModel.fax.length>10 || $scope.dataModel.fax.length==0)
			$scope.fax=$scope.dataModel.fax;
		else if($scope.dataModel.fax.length==10)
			$scope.fax=$scope.dataModel.fax.slice(0,3)+"-"+$scope.dataModel.fax.slice(3,6)+"-"+$scope.dataModel.fax.slice(6,10);
			var canproceedToNextStep = $scope.dataModel.validateretrievalDetails();
			if(!canproceedToNextStep){
				$scope.dataModel.wizardModel.currentStep = 2;
				return false;				
			}
			if(!$scope.dataModel.amPMType || $scope.dataModel.amPMType.index != 1){
				$scope.dataModel.amPMType = {index:0};
			}
			if ($scope.dataModel.faxMemberType) {
				$scope.dataModel.faxMemberType = {index:-1};
			}
		}
		
		if($scope.dataModel.wizardModel.currentStep == 3){
			var canproceedToNextStep = $scope.dataModel.validateAppointmentTimings();
			if(!canproceedToNextStep){
				$scope.dataModel.wizardModel.currentStep = 3;
				return false;				
			}
		}
		return true;
	}
	
	var releaseToQue = function(busFuncDtlKey){		
		var schedulingInventory = [];
		var chartIdList = [];
		var chartIdExclList = [];
		if($scope.dataModel.wizardModel.currentStep == 2){
			for(var i=0; i < $scope.dataModel.includedRtrvlRecords.length; i++){
				chartIdList.push($scope.dataModel.includedRtrvlRecords[i].chartId);
			}
			$scope.releaseToQueInput = {
				"retStatus" 		: "NEW",
				"requestedUserId"	: $scope.dataModel.loginUserId,
				"retMethod"			: $scope.dataModel.retrvlPrefSelect ? $scope.dataModel.retrvlPrefSelect : "",
				"busFuncDtlKey"		: busFuncDtlKey,
				"chartIdList"		: chartIdList,
				"chartIdExclList"	: chartIdExclList,
				"loginUserKey"		: $scope.dataModel.loginUserKey,
				"assignInventorySearchFilter" : schedulingInventory,
				"appt" 				: {
					apptKey		:	$scope.dataModel.selectedMyApptId
				}
			}	
			$scope.showConfirmLoadingDialog = true;
			$http.post('/gcm-app-services/scheduling/workflow/releaseToQue', $scope.releaseToQueInput).then(function(response) {
				$scope.showConfirmLoadingDialog = false;
				var message = ""
				if (response && response.data && response.data.status == 'SUCCESS') {
					if(busFuncDtlKey == ONSITE_SCHEDULER_BUS_FUNC_DTL_KEY){
						message = "Charts Released to Onsite Queue Successfully";
					}else if(busFuncDtlKey == EMR_SCHEDULER_BUS_FUNC_DTL_KEY){
						message = "Charts Released to EMR Queue Successfully";
					}
				}
				$scope.clearWizardData();
				lookupService.filter(message, 'success');
			}, function(error) {
				$scope.showConfirmLoadingDialog = false;
				var message = JSON.stringify(error);
				$scope.dataModel.setMessage(message, "error");
				return false;
			});
		}
		
		return false;
	}
	
	$scope.handleCancelClick = function() {
		$scope.dataModel.confirmType = 'Cancel'
		$scope.dataModel.confirmMessage = "You have unsaved data on this page.  If you continue, all changes will be lost.  Click ‘Yes’ to exit without saving or click ‘No’ to return to the page.";
		$scope.dataModel.showConfirmApptDialog = !$scope.dataModel.showConfirmApptDialog;
	}
	
	$scope.dataModel.handleConfirmYesClick = function(){
		if($scope.dataModel.confirmType == 'Cancel'){
			$scope.dataModel.handleCancelClick();
			$scope.dataModel.showConfirmApptDialog = !$scope.dataModel.showConfirmApptDialog;
		}else if($scope.dataModel.confirmType == 'Finish'){
			$scope.dataModel.handleFinishClick();
			$scope.dataModel.showConfirmApptDialog = !$scope.dataModel.showConfirmApptDialog;
		}else if($scope.dataModel.confirmType == 'ReleaseToONSITE'){
			if($scope.dataModel.includedRtrvlRecords.length > 0){
				releaseToQue(ONSITE_SCHEDULER_BUS_FUNC_DTL_KEY);
				$scope.dataModel.showConfirmApptDialog = !$scope.dataModel.showConfirmApptDialog;
			}
			else{
				var message = "Select Members to release to ONSITE Queue"; 
				$scope.dataModel.setMessage(message, "error");
			}
		}else if($scope.dataModel.confirmType == 'ReleaseToEMR'){
			if($scope.dataModel.includedRtrvlRecords.length > 0){
				releaseToQue(EMR_SCHEDULER_BUS_FUNC_DTL_KEY);
				$scope.dataModel.showConfirmApptDialog = !$scope.dataModel.showConfirmApptDialog;
			}else{
				var message = "Select Members to release to EMR Queue";
				$scope.dataModel.setMessage(message, "error");
			}
		}else if($scope.dataModel.confirmType == 'AddToExistingAppointment'){
			$scope.dataModel.addToExistingAppt();
			$scope.dataModel.showConfirmApptDialog = !$scope.dataModel.showConfirmApptDialog;
		}
	}
	
	$scope.dataModel.handleCancelClick = function(){
		$scope.clearWizardData();
		lookupService.filter();
	}
	
	$scope.dataModel.handleFinishClick = function(){
			var schedulingInventory=[];
		
		var apptStatus = "SCHEDULED";
		var noOfAttempts = $scope.dataModel.noOfAttempts; 
		/*if($scope.dataModel.selectedAppt && $scope.dataModel.selectedAppt.apptStatus && $scope.dataModel.selectedAppt.apptStatus == 'PASTDUE'){
			noOfAttempts = noOfAttempts + 1; 
		}*/
		if(!$scope.dataModel.apontmntDate) return false;
		var chartIdList = [];
		var chartIdExclList = [];
		for(var i=0; i < $scope.dataModel.includedRtrvlRecords.length; i++){
			chartIdList.push($scope.dataModel.includedRtrvlRecords[i].chartId);
		}
		for(var i = 0; i < $scope.dataModel.retrievalRecords.length; i++){
			if(!$scope.dataModel.retrievalRecords[i].selected){
				chartIdExclList.push($scope.dataModel.retrievalRecords[i].chartId);
			}
		}
		for(var i=0; i < $scope.dataModel.providerRecords.length; i++){
				if(!$scope.dataModel.providerRecords[i].selected){
					schedulingInventory.push($scope.dataModel.providerRecords[i]);
				}
			}
		var dateToStore = $scope.dataModel.apontmntDate;
		var appointmentTime =  $scope.dataModel.apontmntTime;
		var dateToStoreString;
		var hrMntArray = [];
		
		if(appointmentTime)
		{
			hrMntArray = appointmentTime.split(":");
		}
		if(hrMntArray.length > 1){
			var apptHours, apptMinutes;
			if($scope.dataModel.amPMType && $scope.dataModel.amPMType.index == 1){
				var hrs = parseInt(hrMntArray[0]);
				if(hrs < 12){
					hrs = hrs + 12;
				}
				
		//		dateToStore.setHours(hrs);
				apptHours = hrs;
 			}else{
 				var hrs = parseInt(hrMntArray[0]);
 				if(hrs == 12){
 					apptHours = '00';
 				}
		//		dateToStore.setHours(hrMntArray[0]);
 				else{
 					apptHours = hrMntArray[0];
 				}
				
			}
		//	dateToStore.setMinutes(hrMntArray[1]);
			apptMinutes = hrMntArray[1];
			dateToStoreString = $scope.dataModel.apontmntDateViewModel.dateText + " " + apptHours + ":" + apptMinutes+":"+"00";
		}
		else{
			dateToStoreString = $scope.dataModel.apontmntDateViewModel.dateText + " "+dateToStore.getHours()+":"+dateToStore.getMinutes()+":"+"00";
		}
		
//		var dateToStoreString = $scope.dataModel.apontmntDateViewModel.dateText + " "+dateToStore.getHours()+":"+dateToStore.getMinutes()+":"+"00";
	
		$scope.confirmApptInput = {
			"retStatus" : "SCHEDULED",
			"requestedUserId" : $scope.dataModel.loginUserId,
			"assignInventorySearchFilter" : schedulingInventory,
			"chartIdList"	: chartIdList,
			"chartIdExclList"	: chartIdExclList,
			"loginUserKey"		: $scope.dataModel.loginUserKey,
			"retMethod"		: $scope.dataModel.retrvlPrefSelect,
			"busFuncDtlKey" : $scope.dataModel.busFuncDtlKey,
			"appt" : {
				"apptIteration" : "",
				"apptKey"		: $scope.dataModel.selectedMyApptId,
				"firstName" : $scope.dataModel.firstName.trim(),
				"lastName" : $scope.dataModel.lastName.trim(),
				"address1" : $scope.dataModel.address1.trim(),
				"address2" : $scope.dataModel.address2!=null ? $scope.dataModel.address2.trim() : '',
				"city" : $scope.dataModel.city.trim(),
				"state" : $scope.dataModel.stateSelect,
				"zip" : $scope.dataModel.zip,
				"phoneNum" : $scope.phoneNo,
				"faxNum" : $scope.fax,
				"email" : $scope.dataModel.email,
				"faxStatus"		: $scope.dataModel.faxStatus ? $scope.dataModel.faxStatus : 'NEW',
				"apptStatus"	: apptStatus,
				"uiApptDate"	: dateToStoreString,
				"apptType"		: $scope.dataModel.retrvlPrefSelect,
				"gcmUserKey"	: $scope.dataModel.loginUserKey,
				"gcmVendorKey"	: $scope.dataModel.vendorKey,
				"gcmGroupKey"	: $scope.dataModel.currentGroupKey ? $scope.dataModel.currentGroupKey : 3,
				"createUser"	: $scope.dataModel.loginUserId,
				"modifiedUser"	: $scope.dataModel.loginUserId,
				"noOfAttempts"	: noOfAttempts
			}
		}
		$scope.showConfirmLoadingDialog = true;
		$http.post('/gcm-app-services/scheduling/workflow/confirmAppointment', $scope.confirmApptInput).then(function(response) {
			var message = '';
			if (response && response.data && response.data.status == 'SUCCESS') {
				$scope.showConfirmLoadingDialog = false;
				message = "Appointment has been created.";
				//$scope.dataModel.setMessage(message, "success");
			}
			$scope.clearWizardData();
			lookupService.filter(message, "success");
		}, function(error) {
			$scope.showConfirmLoadingDialog = false;
			var message = JSON.stringify(error);
			$scope.dataModel.setMessage(message, "error");
			return false;
		});
		return false;
	}
	
	$scope.clearWizardData = function(){	
		$scope.dataModel.clearApptData();

		$scope.dataModel.clearWorkListData();
		
		$scope.dataModel.wizardModel.nextButton.label = 'Next';

		$scope.dataModel.providerInfoModel.totalRecordsCount = 0;
		$scope.dataModel.providerInfoModel.records = [];
		$scope.dataModel.providerRecords = [];
		$scope.dataModel.providerInfoVisited = false;
		$scope.dataModel.providerSelectionChanged = true;		
		$scope.dataModel.providerRecords = [];
		$scope.dataModel.selectedProviderRecords = [];
		
		//retrieval Model reset
		$scope.dataModel.includedRtrvlRecords = [];
		$scope.dataModel.retrievalRecords = [];
		$scope.dataModel.excludedRtrvlRecords = [];
		$scope.dataModel.retrvlSelectionChanged = true;
		$scope.dataModel.retrvlInfoVisited = false;
		
		//appointment model reset
		
		$scope.dataModel.appointmentType = {index:0};
		$scope.dataModel.amPMType = {index:0};
		$scope.dataModel.existingAppointmentsModel = {};
		$scope.dataModel.existingAppointmentsModel.records = [];
		$scope.dataModel.existingAppointmentsModel.totalRecordsCount = 0;
		$scope.dataModel.apptCommentsList = [];
		$scope.dataModel.existingAppointments = [];
		$scope.dataModel.previousAtmtDates = [];
		
		$scope.dataModel.isFromModifyApptmnt = false;
		
		
		getChartCounts();
		$scope.chartStatusModel.open = false;
		$scope.faxStatusModel.open = false;
		$scope.commentHistoryModel.open =false;
		//$scope.dataModel.selectedMyApptId = "";
	}
	
	$scope.dataModel.clearWizardData = function(){
		$scope.clearWizardData();
	}
	
	$scope.dataModel.clearApptData = function(){
		$scope.dataModel.showWorklist = true;
		
		$scope.showLoadingDialog=false;
		$scope.dataModel.apptKey = '';
		$scope.dataModel.retrvlPrefSelect = '';
		$scope.dataModel.firstName = '';
		$scope.dataModel.lastName = '';
		$scope.dataModel.address1 = '';
		$scope.dataModel.address2 = '';
		$scope.dataModel.city = '';
		$scope.dataModel.stateSelect = '';
		$scope.dataModel.phonenumber = '';
		$scope.dataModel.fax = '';
		$scope.dataModel.zip = '';
		$scope.dataModel.email = '';
		$scope.dataModel.apontmntTime = '';
		$scope.dataModel.apontmntDate = '';
		$scope.dataModel.agree = false;
		$scope.dataModel.apptStatus =  '';
		$scope.dataModel.faxStatus = '';
		$scope.dataModel.gcmUserKey = '';
		$scope.dataModel.noOfAttempts = 0;
		$scope.dataModel.noOfPendAttempts = 0;
		$scope.phoneNo = '';
		$scope.fax = '';
		$scope.dateToStoreString = '';
	}
	
	$scope.handleFinishClick = function() {
		$scope.dataModel.confirmType = 'Finish'
		$scope.dataModel.confirmMessage = "An appointment will be created for all Included members.  Excluded members will return to your Worklist.  Do you want to proceed?";
		$scope.dataModel.showConfirmApptDialog = !$scope.dataModel.showConfirmApptDialog;
	}

	$scope.handlePendAppointMent = function() {
		$scope.dataModel.clearBanners();
		$scope.dataModel.pendReasonSelect = "";
		$scope.dataModel.addPendcomments = "";
		if(!$scope.dataModel.pendReasons || $scope.dataModel.pendReasons.length == 0){
			$scope.dataModel.readPendReasons();
		}
		//Pend Chart button click logic goes here
		$scope.dataModel.showPendApptDialog = !$scope.dataModel.showPendApptDialog;
	}
	
	$scope.dataModel.handlePendAppointMent = function(){
		if($scope.dataModel.pendReasonSelect){
			var chartIdList = [];
			var chartIdExclList = [];
			var schedulingInventory = [];
			if($scope.dataModel.phonenumber && $scope.dataModel.phonenumber.length!=0) {
			var phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
			var phoneRegEx = new RegExp(phonePattern);
			var phoneFlag = phoneRegEx.test($scope.dataModel.phonenumber);
			var phonePattern1 = /^\d{10}$/;
			var phoneRegEx1 = new RegExp(phonePattern1);
			var phoneFlag1 = phoneRegEx1.test($scope.dataModel.phonenumber);
			if((!phoneFlag && !phoneFlag1) || $scope.dataModel.phonenumber.length > 12)
			{
				var errorMessage ="Phone Number Not Valid";
				$scope.dataModel.setMessage(errorMessage, "error");
				return false;
			}
		}
		if($scope.dataModel.fax && $scope.dataModel.fax.length!=0) {
			var faxPattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
			var faxRexEx = new RegExp(faxPattern);
			var faxFlag = faxRexEx.test($scope.dataModel.fax);
			var faxPattern1 = /^\d{10}$/;
			var faxRexEx1 = new RegExp(faxPattern1);
			var faxFlag1 = faxRexEx1.test($scope.dataModel.fax);
			if((!faxFlag && !faxFlag1) || $scope.dataModel.fax.length > 12)
			{
				var errorMessage ="Fax Not Valid";
				$scope.dataModel.setMessage(errorMessage, "error");
				return false;
			}
		}
			if($scope.dataModel.phonenumber){
			if($scope.dataModel.phonenumber.length>10 || $scope.dataModel.phonenumber.length==0)
				$scope.phoneNo=$scope.dataModel.phonenumber
			else if($scope.dataModel.phonenumber.length==10)
				$scope.phoneNo=$scope.dataModel.phonenumber.slice(0,3)+"-"+$scope.dataModel.phonenumber.slice(3,6)+"-"+$scope.dataModel.phonenumber.slice(6,10);
			}
			if($scope.dataModel.fax){
			if($scope.dataModel.fax.length>10 || $scope.dataModel.fax.length==0)
				$scope.fax=$scope.dataModel.fax;
			else if($scope.dataModel.fax.length==10)
				$scope.fax=$scope.dataModel.fax.slice(0,3)+"-"+$scope.dataModel.fax.slice(3,6)+"-"+$scope.dataModel.fax.slice(6,10);
			}
			if($scope.dataModel.wizardModel.currentStep == 1)
			{	
				schedulingInventory = $scope.dataModel.providerRecords;
			}
			else if($scope.dataModel.wizardModel.currentStep == 2){
				for(var i=0; i < $scope.dataModel.retrievalRecords.length; i++){
					chartIdList.push($scope.dataModel.retrievalRecords[i].chartId);
				}
			}
			else if($scope.dataModel.viewAppointmentModel){
				for(var i=0; i < $scope.dataModel.viewAppointmentModel.records.length; i++){
					chartIdList.push($scope.dataModel.viewAppointmentModel.records[i].chartId);
				}
			}
			$scope.dateToStoreString = '';
			$scope.prepareDateStringToStore()
			var retMethod = $scope.dataModel.retrvlPrefSelect ? $scope.dataModel.retrvlPrefSelect : "";
			if(!retMethod)
			{
				if($scope.dataModel.busFuncDtlKey == OUTREACH_SCHEDULER_BUS_FUNC_DTL_KEY){
					retMethod = 'FAX';
				}
				else if ($scope.dataModel.busFuncDtlKey == ONSITE_SCHEDULER_BUS_FUNC_DTL_KEY){
					retMethod = 'ONSITE';
				}
				else if($scope.dataModel.busFuncDtlKey == EMR_SCHEDULER_BUS_FUNC_DTL_KEY){
					retMethod = 'EMR';
				}
			}
		
			$scope.pendApptInput = {
				"retStatus" 		: "PEND",
				"requestedUserId"	: $scope.dataModel.loginUserId,
				"retMethod"			: retMethod,
				"chartIdList"		: chartIdList,
				"chartIdExclList"	: chartIdExclList,
				"loginUserKey"		: $scope.dataModel.loginUserKey,
				"pendReasonCode"	: $scope.dataModel.pendReasonSelect,
				"pendReasonComment"	: $scope.dataModel.addPendcomments,
				"assignInventorySearchFilter" : schedulingInventory,
				"busFuncDtlKey" 	: $scope.dataModel.busFuncDtlKey,
				"appt" 				: {
						"apptKey"		: $scope.dataModel.selectedMyApptId,
						"apptIteration" : 1,
						"firstName" 	: $scope.dataModel.firstName!=null ? $scope.dataModel.firstName.trim() : '',
						"lastName" 		: $scope.dataModel.lastName!=null ? $scope.dataModel.lastName.trim() : '',
						"address1" 		: $scope.dataModel.address1!=null ? $scope.dataModel.address1.trim() : '',
						"address2" 		: $scope.dataModel.address2!=null? $scope.dataModel.address2.trim() : '',
						"city" 			:  $scope.dataModel.city!=null ? $scope.dataModel.city.trim() : '',
						"state" 		: $scope.dataModel.stateSelect,
						"zip" 			: $scope.dataModel.zip,
						"phoneNum"		: $scope.phoneNo,
						"faxNum"		: $scope.fax,
						"email"			: $scope.dataModel.email,
						"faxStatus"		: $scope.dataModel.faxStatus ? $scope.dataModel.faxStatus : 'NEW',
						"apptStatus"	: "PEND",
						"uiApptDate"	: $scope.dateToStoreString,
						"apptType"		: retMethod,
						"gcmUserKey"	: $scope.dataModel.loginUserKey,
						"gcmVendorKey"	: $scope.dataModel.vendorKey,
						"gcmGroupKey"	: $scope.dataModel.currentGroupKey ? $scope.dataModel.currentGroupKey : 3,
						"createUser"	: $scope.dataModel.loginUserId,
						"modifiedUser"	: $scope.dataModel.loginUserId,
						"reasonCode"	: $scope.dataModel.pendReasonSelect,
						"reasonComment"	: $scope.dataModel.addPendcomments,
						"noOfAttempts"	: $scope.dataModel.noOfAttempts,
						"noOfPendAttempts" : $scope.dataModel.noOfPendAttempts
				}
			}
			$scope.dataModel.showPendLoadingDialog = true;
			$('#uitkPopupId1_headerId').css({
				display: 'none'
			});
			$('#uitkPopupId1_closeLink').css({
			    display: 'none'
			});
			$('#uitkPopupId1').css({'border-width':'unset','border-style' : 'none'});
			$http.post('/gcm-app-services/scheduling/workflow/confirmAppointment', $scope.pendApptInput).then(function(response) {
				$scope.dataModel.showPendLoadingDialog = false;
				var message = "";
				if (response && response.data && response.data.status == 'SUCCESS') {
					message = "Appointment moved to PEND successfully";
				}
				$scope.dataModel.showPendApptDialog = false;
				$scope.clearWizardData();
				lookupService.filter(message, "success");
			}, function(error) {
				$scope.dataModel.showPendLoadingDialog = false;
				var message = JSON.stringify(error);
				$scope.dataModel.setMessage(message, "error");
				return false;
			});
		}else{
			var message = "Pend Reason is a required field.";
			$scope.dataModel.setMessage(message, "error");
		}
	}
	$scope.handleSaveAsDraft = $scope.dataModel.handleSaveAsDraft = function() {
		
		var chartIdList = [];
		var chartIdExclList = [];
		var schedulingInventory = [];
		if($scope.dataModel.wizardModel.currentStep == 1 && !$scope.dataModel.isFromModifyApptmnt)
		{
			schedulingInventory = $scope.dataModel.providerRecords;
		}else{
			for(var i=0; i < $scope.dataModel.retrievalRecords.length; i++){
				if($scope.dataModel.retrievalRecords[i].selected)
				{
					chartIdList.push($scope.dataModel.retrievalRecords[i].chartId);
				}
				else{
					chartIdExclList.push($scope.dataModel.retrievalRecords[i].chartId);
				}
			}
			for(var i=0; i < $scope.dataModel.providerRecords.length; i++){
				if(!$scope.dataModel.providerRecords[i].selected){
					schedulingInventory.push($scope.dataModel.providerRecords[i]);
				}
			}
		}
		
		if($scope.dataModel.phonenumber!=null && $scope.dataModel.phonenumber.length>10 || $scope.dataModel.phonenumber.length==0) 
				$scope.phoneNo=$scope.dataModel.phonenumber
		else if($scope.dataModel.phonenumber!=null && $scope.dataModel.phonenumber.length==10)
				$scope.phoneNo=$scope.dataModel.phonenumber.slice(0,3)+"-"+$scope.dataModel.phonenumber.slice(3,6)+"-"+$scope.dataModel.phonenumber.slice(6,10);
		if($scope.dataModel.fax!=null && $scope.dataModel.fax.length>10 || $scope.dataModel.fax.length==0)
				$scope.fax=$scope.dataModel.fax;
		else if($scope.dataModel.fax!=null && $scope.dataModel.fax.length==10)
				$scope.fax=$scope.dataModel.fax.slice(0,3)+"-"+$scope.dataModel.fax.slice(3,6)+"-"+$scope.dataModel.fax.slice(6,10);
		var canSave = $scope.dataModel.validateRetrievalFormDetails ? $scope.dataModel.validateRetrievalFormDetails():true;
		var validateDateandTime = true
		if($scope.dataModel.apontmntDate)
			validateDateandTime = $scope.dataModel.validateAppointmentTimings ? $scope.dataModel.validateAppointmentTimings():true;
		if(!canSave || !validateDateandTime)
			return false;
		$scope.dateToStoreString = "";
		/*if($scope.dataModel.apontmntDate){
			var dateToStore = $scope.dataModel.apontmntDate;
			var appointmentTime =  $scope.dataModel.apontmntTime;
			var hrMntArray = [];
			if(appointmentTime)
			{
				hrMntArray = appointmentTime.split(":");
			}
			if(hrMntArray.length > 1){
				if($scope.dataModel.amPMType && $scope.dataModel.amPMType.index == 1){
					var hrs = parseInt(hrMntArray[0]);
					hrs = hrs + 12;
					dateToStore.setHours(hrs);
				}else{
					dateToStore.setHours(hrMntArray[0]);
				}
				dateToStore.setMinutes(hrMntArray[1]);
			}
			var dateText = $scope.dataModel.apontmntDateViewModel.displayDate ? $scope.dataModel.apontmntDateViewModel.displayDate : $scope.dataModel.apontmntDateViewModel.dateText;
			dateToStoreString = dateText + " "+dateToStore.getHours()+":"+dateToStore.getMinutes()+":"+"00";
		}*/
		
		$scope.prepareDateStringToStore();
		
		$scope.saveAsDraftInput = {
			"retStatus" : $scope.dataModel.apptStatus == 'PASTDUE' ? $scope.dataModel.apptStatus : 'INPROGRESS',
			"requestedUserId" : $scope.dataModel.loginUserId,
			"assignInventorySearchFilter" : schedulingInventory,
			"chartIdList"	: chartIdList,
			"chartIdExclList" : chartIdExclList,
			"loginUserKey"	: $scope.dataModel.loginUserKey,
			"retMethod"		: $scope.dataModel.retrvlPrefSelect,
			"busFuncDtlKey" : $scope.dataModel.busFuncDtlKey,
			"appt" : {
				"apptIteration" : "",
				"apptKey"		: $scope.dataModel.selectedMyApptId,
				"firstName" 	: $scope.dataModel.firstName!=null ? $scope.dataModel.firstName.trim() : '',
				"lastName" 		: $scope.dataModel.lastName!=null ?  $scope.dataModel.lastName.trim() : '',
				"address1" 		: $scope.dataModel.address1!=null ? $scope.dataModel.address1.trim() : '',
				"address2" 		: $scope.dataModel.address2!=null ? $scope.dataModel.address2.trim() : '',
				"city" 			: $scope.dataModel.city!=null ? $scope.dataModel.city.trim() : '',
				"state" 		: $scope.dataModel.stateSelect,
				"zip" 			: $scope.dataModel.zip,
				"phoneNum" 		: $scope.phoneNo,
				"faxNum" 		: $scope.fax,
				"email" 		: $scope.dataModel.email,
				"faxStatus"		: $scope.dataModel.faxStatus ? $scope.dataModel.faxStatus : 'NEW',
				"apptStatus"	: $scope.dataModel.apptStatus == 'PASTDUE' ? $scope.dataModel.apptStatus : 'INPROGRESS',
				"uiApptDate"	: $scope.dateToStoreString,
				"apptType"		: $scope.dataModel.retrvlPrefSelect,
				"gcmUserKey"	: $scope.dataModel.loginUserKey,
				"gcmVendorKey"	: $scope.dataModel.vendorKey,
				"gcmGroupKey"	: $scope.dataModel.currentGroupKey ? $scope.dataModel.currentGroupKey : 3,
				"createUser"	: $scope.dataModel.loginUserId,
				"modifiedUser"	: $scope.dataModel.loginUserId,
				"noOfAttempts"	: $scope.dataModel.noOfAttempts
			}
		}
		$scope.showSaveDraftLoadingDialog = true;
		$http.post('/gcm-app-services/scheduling/workflow/confirmAppointment', $scope.saveAsDraftInput).then(function(response) {
			if (response && response.data && response.data.result) {
				$scope.showSaveDraftLoadingDialog = false;
				$scope.dataModel.selectedMyApptId = $scope.dataModel.apptKey = response.data.result;
			}
			$scope.dataModel.setMessage("Draft appointment has been saved.", "success");
			if($scope.dataModel.saveComments){
				$scope.dataModel.addComments();
			}else{
				$scope.dataModel.readApptComments();
			}
			$scope.dataModel.saveComments = false;
		}, function(error) {
			$scope.showSaveDraftLoadingDialog = false;
			var message = JSON.stringify(error);
			$scope.dataModel.setMessage(message, "error");
			return false;
		});
		return false;
	}
	
	$scope.prepareDateStringToStore = function(){
		if($scope.dataModel.apontmntDate){
			var dateToStore = $scope.dataModel.apontmntDate;
			var appointmentTime =  $scope.dataModel.apontmntTime;
			var hrMntArray = [];
			var dateText = $scope.dataModel.apontmntDateViewModel.displayDate ? $scope.dataModel.apontmntDateViewModel.displayDate : $scope.dataModel.apontmntDateViewModel.dateText;
			
			if(appointmentTime)
			{
				hrMntArray = appointmentTime.split(":");
			}
			if(hrMntArray.length > 1){
				var apptHours, apptMinutes;
				if($scope.dataModel.amPMType && $scope.dataModel.amPMType.index == 1){
					var hrs = parseInt(hrMntArray[0]);
					if(hrs < 12){
						hrs = hrs + 12;
					}else{
						
					}
			//		dateToStore.setHours(hrs);
					apptHours = hrs;
	 			}else{
			//		dateToStore.setHours(hrMntArray[0]);
					apptHours = hrMntArray[0];
				}
			//	dateToStore.setMinutes(hrMntArray[1]);
				apptMinutes = hrMntArray[1];
				$scope.dateToStoreString = dateText + " " + apptHours + ":" + apptMinutes+":"+"00";
			}
			else{
				$scope.dateToStoreString = dateText + " "+dateToStore.getHours()+":"+dateToStore.getMinutes()+":"+"00";
			}
		}
/**		if($scope.dataModel.apontmntDate){
			var dateToStore = $scope.dataModel.apontmntDate;
			var appointmentTime =  $scope.dataModel.apontmntTime;
			var hrMntArray = [];
			if(appointmentTime)
			{
				hrMntArray = appointmentTime.split(":");
			}
			if(hrMntArray.length > 1){
				if($scope.dataModel.amPMType && $scope.dataModel.amPMType.index == 1){
					var hrs = parseInt(hrMntArray[0]);
					hrs = hrs + 12;
					dateToStore.setHours(hrs);
				}else{
					dateToStore.setHours(hrMntArray[0]);
				}
				dateToStore.setMinutes(hrMntArray[1]);
			}
			var dateText = $scope.dataModel.apontmntDateViewModel.displayDate ? $scope.dataModel.apontmntDateViewModel.displayDate : $scope.dataModel.apontmntDateViewModel.dateText;
			$scope.dateToStoreString = dateText + " "+dateToStore.getHours()+":"+dateToStore.getMinutes()+":"+"00";
		} */
	}
	
	$scope.data = {};
	$scope.dataModel.wizardModel.dataModelService = dataServiceModel;

	$scope.chartStatusModel = {
		id : 'chartStatusPanel',
		title : 'Chart Status',
		titleH3 : true,
		templateUrl : '../retrieval/scheduling/views/chartstatus.htm',
		open : false,
		lazyLoad : false,
		collapsible : true
	}
	
	$scope.dataModel.readChartStatusDetails = function(){
		var unscheduledCnt = 0;
		var receivedCnt = 0;
		var scheduledCnt = 0;
		var nonRetrievableCnt = 0;
		if(!$scope.dataModel.selectedMyApptId){
			if($scope.dataModel.myWorklistModel && $scope.dataModel.myWorklistModel.selectedRecords){
				var selectedRecordsForAppt = $scope.dataModel.myWorklistModel.selectedRecords;				
				for(var i = 0; i < selectedRecordsForAppt.length; i++){
					unscheduledCnt += selectedRecordsForAppt[i].count;					
				}
			}
			
			$scope.dataModel.scheduledCnt = scheduledCnt; 
			$scope.dataModel.receivedCnt = receivedCnt;
			$scope.dataModel.unscheduledCnt = unscheduledCnt;
			$scope.dataModel.nonRetrievableCnt = nonRetrievableCnt;
			$scope.dataModel.totalChartCount = scheduledCnt + receivedCnt + unscheduledCnt + nonRetrievableCnt;
		}
		else{
			var chartStatusFilter = {
					appointmentId	: $scope.dataModel.selectedMyApptId,
					busSegment : lookupService.filters.busSegment,
					projectName : lookupService.filters.program,
					clientKey : lookupService.filters.client,
					hpKey : lookupService.filters.hp,
					hpProduct : lookupService.filters.hpp,
					isAssigned : '',
					providerId : lookupService.filters.provId,
					provGroupName : lookupService.filters.provgrpNm,
					provLastName : lookupService.filters.provLastNm,
					provFirstName : lookupService.filters.provFstNm,
					fromUserKey : lookupService.filters.user,
					loginUserKey : $scope.dataModel.loginUserKey,
					groupKey	: $scope.dataModel.currentGroupKey ? $scope.dataModel.currentGroupKey : 3,
					vendorKey: $scope.dataModel.vendorKey,
					busFuncDtlKey : $scope.dataModel.busFuncDtlKey //need to get it from worklist and pass for now hard coding to 1(outreach) Once changes made to default.htm to get detail key this needs to modify
				}
				$http.post('/gcm-app-services/scheduling/workflow/getChartStatusCountByUser', chartStatusFilter).then(function(response) {
					if (response && response.data && response.data.result && response.data.result.length > 0) {
						scheduledCnt = response.data.result[0].scheduledCnt ? response.data.result[0].scheduledCnt : 0;
						receivedCnt = response.data.result[0].receivedCnt ? response.data.result[0].receivedCnt : 0;
						unscheduledCnt = response.data.result[0].unscheduledCnt ? response.data.result[0].unscheduledCnt : 0;
						nonRetrievableCnt = response.data.result[0].unscheduledCnt ? response.data.result[0].unscheduledCnt : 0;
						nonRetrievableCnt = response.data.result[0].nonRetrievableCnt ? response.data.result[0].nonRetrievableCnt : 0;
					} else if (response && response.data && response.data.result){
						scheduledCnt = response.data.result.scheduledCnt ? response.data.result.scheduledCnt : 0;
						receivedCnt = response.data.result.receivedCnt ? response.data.result.receivedCnt : 0;
						unscheduledCnt = response.data.result.unscheduledCnt ? response.data.result.unscheduledCnt : 0;
						nonRetrievableCnt = response.data.result.nonRetrievableCnt ? response.data.result.nonRetrievableCnt : 0;
					}
					$scope.dataModel.scheduledCnt = scheduledCnt;
					$scope.dataModel.receivedCnt = receivedCnt;
					$scope.dataModel.unscheduledCnt = unscheduledCnt;
					$scope.dataModel.nonRetrievableCnt = nonRetrievableCnt;
					$scope.dataModel.totalChartCount = scheduledCnt + receivedCnt + unscheduledCnt + nonRetrievableCnt;
				}, function(error) {
					var message = JSON.stringify(error);
					$scope.dataModel.setMessage(message, "error");
				});
		}
	}
	
	$scope.faxStatusModel = {
		id : 'faxtStatuspanel',
		title : 'Fax Status',
		titleH3 : true,
		templateUrl : '../retrieval/scheduling/views/faxstatus.htm',
		open : false,
		lazyLoad : false,
		collapsible : true
	}
	$scope.commentHistoryModel = {
		id : 'commentHistoryPanel',
		title : 'Comments History',
		titleH3 : true,
		templateUrl : '../retrieval/scheduling/views/commentshistory.htm',
		open : false,
		lazyLoad : false,
		collapsible : true
	}
	
	$scope.viewApptModel = {
		id : 'viewApptPanel',
		title:'Confirmation',
		templateUrl: '../retrieval/scheduling/views/viewappointment.htm',
		styleClass : '',
		headerClass : '',
		contentClass : '',
		open:true
	}

	
	lookupService.isWorklist = function(){
		return true;
	}
	
	$scope.dataModel.clearWorkListData = function(){
		$scope.dataModel.selectedMyApptId = "";
		$scope.dataModel.myWorklistModel.records = [];
		$scope.dataModel.myWorklistModel.totalRecordsCount = 0;
		$scope.dataModel.myWorklistModel.selectedRecords = [];
		$scope.dataModel.myWorklistModel.selectedRecordCount = 0;
		$scope.dataModel.myWorklistModel.pagination.currentPageNumber = 1;
		$scope.dataModel.myWorklistModel.pagination.currentPageNumberInView = 1;
		$scope.dataModel.myWorklistModel.pagination.pageNumberError = false;
	}
	
	lookupService.filter = function(message, messageType) {	
		$scope.dataModel.clearBanners();
		if ((!$scope.dataModel.recordModified) || ($scope.dataModel.recordModified && $scope.dataModel.cancelClick)) {
			$scope.dataModel.clearWorkListData();
			var appointmentIdRegex = new RegExp(/^\d+$/);
			$scope.dataModel.SchedulingSearchFilter = {
				busSegment : lookupService.filters.busSegment,
				projectKey : lookupService.filters.projectKey,
				clientKey : lookupService.filters.client,
				hpKey : lookupService.filters.hp,
				hpProduct : lookupService.filters.hpp,
				isAssigned : '1',
				providerId : lookupService.filters.provId,
				provGroupName : lookupService.filters.provgrpNm,
				provLastName : lookupService.filters.provLastNm,
				provFirstName : lookupService.filters.provFstNm,
				fromUserKey : $scope.dataModel.loginUserKey,
				vendorKey	: $scope.dataModel.vendorKey,
				loginUserKey : $scope.dataModel.loginUserKey,
				appointmentId : lookupService.filters.apptId,
				appointmentStatus : lookupService.filters.appStatus,
				faxStatus : lookupService.filters.faxStatus,
				busFuncDtlKey : $scope.dataModel.busFuncDtlKey //need to get it from worklist and pass for now hard coding to 1(outreach) Once changes made to default.htm to get detail key this needs to modify
			};
			if(lookupService.filters.currentTab=="myWorklistTab"){
				$scope.dataModel.showFiltersLoadingDialog = true;
				$http.post('/gcm-app-services/scheduling/worklist/getMySchedulingWorklist', $scope.dataModel.SchedulingSearchFilter).then(function(response) {
					$scope.dataModel.showFiltersLoadingDialog = false;
					if(message){
						$scope.dataModel.setMessage(message, messageType);
					}
					if (response && response.data && response.data.result && response.data.result.length > 0) {
						$scope.searchResults = response.data.result;
						angular.forEach($scope.searchResults, function(obj, idx) {
							obj.index = idx;
						});
						$scope.dataModel.myWorklistModel.records = $scope.searchResults.slice();
						$scope.dataModel.myWorklistModel.originalRecords = $scope.searchResults.slice();
						$scope.dataModel.oldWorklistRecords = angular.copy(response.data.result);
						$scope.dataModel.myWorklistModel.totalRecordsCount = $scope.dataModel.myWorklistModel.records.length;
						var obj = {
								recordsPerPage : $scope.dataModel.myWorklistModel.pagination.recordsPerPage,
								pageNumber : 1,
								sortBy : [$scope.dataModel.myWorklistModel.columns[1].columnId],
								sortOrder : [1]
						};
						$scope.dataModel.myWorklistModel.onChange(obj);
						if ($scope.dataModel.myWorklistModel.selectAllChecked) {
							$scope.dataModel.myWorklistModel.selectAllChecked = false;
						}
					} else {
						$scope.dataModel.myWorklistModel.records = [];
						$scope.dataModel.myWorklistModel.originalRecords = [];
						$scope.dataModel.oldWorklistRecords = [];
						$scope.dataModel.clearWorkListData();
						if ($scope.dataModel.myWorklistModel.selectAllChecked) {
							$scope.dataModel.myWorklistModel.selectAllChecked = false;
						}
					}
				}, function(error) {
					$scope.dataModel.showFiltersLoadingDialog = false;
					var message = JSON.stringify(error);
					$scope.dataModel.setMessage(message, "error");
				});
			}
			else
			{
				var appointmentIdFlag = true;
				if (lookupService.filters.apptId != "")
					appointmentIdFlag = appointmentIdRegex.test(lookupService.filters.apptId);
				if (appointmentIdFlag) 
				{
					$scope.dataModel.myAppointmentsModel.records=[];
					$scope.dataModel.myAppointmentsModel.totalRecordsCount = 0;
					$scope.dataModel.myAppointmentsModel.selectedRecords = [];
					$scope.dataModel.myAppointmentsModel.selectedRecordCount = 0;
					$scope.dataModel.myAppointmentsModel.pagination.currentPageNumber = 1;
					$scope.dataModel.myAppointmentsModel.pagination.currentPageNumberInView = 1;
					$scope.dataModel.myAppointmentsModel.pagination.pageNumberError = false;
					$scope.dataModel.showFiltersLoadingDialog = true;
					$http.post('/gcm-app-services/scheduling/worklist/getMyAppointments', $scope.dataModel.SchedulingSearchFilter).then(function(response) {
						$scope.dataModel.showFiltersLoadingDialog = false;
						if(message){
						$scope.dataModel.setMessage(message, messageType);
						}
						if (response && response.data && response.data.result && response.data.result.length > 0) {
							angular.forEach(response.data.result, function(obj, idx) {
								obj.index = idx;
								obj.selected = false;
							});
							$scope.dataModel.myAppointmentsModel.records = response.data.result;
							$scope.dataModel.myAppointmentsModel.originalRecords = response.data.result;
							$scope.dataModel.myAppointmentsModel.totalRecordsCount = response.data.result.length;
							$scope.dataModel.myAppointmentsModel.selectedRecords = [];
							$scope.dataModel.selectedAppt = {};
							$scope.dataModel.selectedMyApptId = '';
							if ($scope.dataModel.myAppointmentsModel.pagination) {
								var obj = {
										recordsPerPage : $scope.dataModel.myAppointmentsModel.pagination.recordsPerPage,
										pageNumber : 1,
										sortBy : [$scope.dataModel.myAppointmentsModel.columns[1].columnId],
										sortOrder : [1]
								};
								$scope.dataModel.myAppointmentsModel.onChange(obj);
							}
						}else{
							$scope.dataModel.myAppointmentsModel.records = [];
							$scope.dataModel.myAppointmentsModel.originalRecords = [];
							$scope.dataModel.myAppointmentsModel.totalRecordsCount = 0;
						}
					}, function(error) {
						$scope.dataModel.showFiltersLoadingDialog = false;
						var message = JSON.stringify(error);
						$scope.dataModel.setMessage(message, "error");
					});
				}
				else {
					var message = "Appointment ID Not Valid";
					$scope.dataModel.setMessage(message, "error");
				}
			}
		}
		else {
			var errorMessage = "You have unsaved edits. Select Save to save these edits and continue to Filter. Select Cancel to return to My Worklist and continue editing";
			$scope.dataModel.setMessage(errorMessage, "error");
		}
	};
	lookupService.clear = function() {
		$scope.dataModel.clearBanners();
		if (!$scope.dataModel.recordModified) {
			lookupService.filters.busSegment = '';
			lookupService.filters.projectKey = '';
			lookupService.filters.client = '';
			lookupService.filters.provFstNm = '';
			lookupService.filters.hp = '';
			lookupService.filters.hpp = '';
			lookupService.filters.provId = '';
			lookupService.filters.provLastNm = '';
			lookupService.filters.user = '';
			lookupService.filters.status = '0';
			lookupService.filters.provgrpNm = '';
			$scope.dataModel.myWorklistModel.selectAllChecked = false;
			$scope.dataModel.clearWorkListData();
			$scope.dataModel.myAppointmentsModel.records = [];
			$scope.dataModel.myAppointmentsModel.totalRecordsCount = 0;
			$scope.dataModel.selectedMyApptId = "";
			lookupService.filters.apptId = '';
			lookupService.filters.appStatus = '';
			lookupService.filters.faxStatus = '';
			
			clearSort();
		}
		else {
			var errorMessage = "You have unsaved edits. Select Save to save these edits and continue to Clear. Select Cancel to return to My Worklist and continue editing";
			$scope.dataModel.setMessage(errorMessage, "error");
		}
	}
	function clearSort(){
				if(lookupService.filters.currentTab === 'myWorklistTab'){
					angular.forEach($scope.dataModel.myWorklistModel.columns,function(col,idx){
						col.sortOrder = 0;
					});
					if($scope.dataModel.myWorklistModel.columns && $scope.dataModel.myWorklistModel.columns.length > 0)$scope.dataModel.myWorklistModel.columns[1].sortOrder = 1;
				}else{
					angular.forEach($scope.dataModel.myAppointmentsModel.columns,function(col,idx){
						col.sortOrder = 0;
					});
					if($scope.dataModel.myAppointmentsModel.columns && $scope.dataModel.myAppointmentsModel.columns.length > 0)$scope.dataModel.myAppointmentsModel.columns[1].sortOrder = 1;
				}
			}
	$scope.dataModel.memberInfoModel = {
		columns : [ {
			columnId : 'memberName',
			label : 'Member Name',
			layoutOrder : 1,
			cellTemplate : '<span ng-bind="::record.memberName" class="tk-dtbl-as-table-cell"> </span>'
		}, {
			columnId : 'gender',
			label : 'Gender',
			layoutOrder : 1,
			cellTemplate : '<span ng-bind="::record.memberGender" class="tk-dtbl-as-table-cell"> </span>'
		}, {
			columnId : 'membDOB',
			label : 'Date of Birth',
			layoutOrder : 1,
			cellTemplate : '<span ng-bind="::record.memberDOB" class="tk-dtbl-as-table-cell"> </span>'
		}, {
			columnId : 'memberId',
			label : 'Member ID',
			layoutOrder : 1,
			cellTemplate : '<span ng-bind="::record.memberId" class="tk-dtbl-as-table-cell"> </span>'
		} ],
		records : [],
		totalRecordsCount : 0
	}
	
	$scope.cancelWarningMessageModel = {
			id : 'cancelWarningMessage',
            messageType : 'warning',
            content : '',
            visible : true,
            position : 'inline',
            rememberMe : false,
            messageRole : 'alert',
            headingLevel : '2'
	}
	
	
	$scope.dataModel.readRetProviderDetails = function(){
		var gcmRetAppointment = {
			apptKey : $scope.dataModel.selectedMyApptId
		}
		$http.post('/gcm-app-services/scheduling/workflow/getApptDetailsByApptId', gcmRetAppointment).then(function(response) {
			if(response && response.data && response.data.result){
				$scope.retrievalPreference = response.data.result.apptType;
				$scope.dataModel.retrvlPrefSelect = response.data.result.apptType;
				$scope.dataModel.retrievalProvName = response.data.result.firstName + ", "+  response.data.result.lastName;
				$scope.dataModel.firstName = response.data.result.firstName;
				$scope.dataModel.lastName = response.data.result.lastName;
				$scope.dataModel.address1 = response.data.result.address1;
				$scope.dataModel.address2 = response.data.result.address2;
				$scope.dataModel.city = response.data.result.city;
				if (null != response.data.result.state)
					$scope.dataModel.stateSelect = response.data.result.state;
				$scope.dataModel.zip = response.data.result.zip;
				$scope.dataModel.phonenumber = response.data.result.phoneNum;
				$scope.dataModel.fax = response.data.result.faxNum;
				$scope.dataModel.email = response.data.result.email;
				$scope.dataModel.apptDate = response.data.result.uiApptDate;
				$scope.dataModel.retrievalProvName = response.data.result.firstName + ", "+  response.data.result.lastName;
				$scope.dataModel.apptStatus =  response.data.result.apptStatus;
				$scope.dataModel.faxStatus = response.data.result.faxStatus;
				$scope.dataModel.gcmUserKey = response.data.result.gcmUserKey;
				$scope.dataModel.noOfAttempts =  response.data.result.noOfAttempts;
				$scope.dataModel.noOfPendAttempts =  response.data.result.noOfPendAttempts;
				var timePart = "";
				var hrs = 0;
				var mnts = 0;
				var apptTime = "";
				var apptDate = "";
				if($scope.dataModel.apptDate)
				{
					var dateStringArr = $scope.dataModel.apptDate.split(" ");
					apptDate = dateStringArr.length > 1 ? dateStringArr[0] :"";
					apptTime = dateStringArr.length > 1 ? dateStringArr[1] :"";
					if(apptTime.length > 5){
						apptTime = apptTime.substring(0, 5);
					}
					timePart = apptTime.split(":");
					if(timePart.length == 2){
						hrs = timePart[0];
						mnts = timePart[1];
					}
					
					$scope.dataModel.apontmntTime = apptTime;
					if(hrs < 12){
						if(hrs == 0){
							$scope.dataModel.apontmntTime = '12'+":"+mnts;
						}
						$scope.dataModel.amPMType = {index:0};
					}else{
						if(hrs > 12){
							hrs = hrs - 12;
						}
						$scope.dataModel.apontmntTime = hrs+":"+mnts;
						$scope.dataModel.amPMType = {index:1};
					}
				}
				
				if(!$scope.dataModel.apontmntDateViewModel)
				{
					$scope.dataModel.apontmntDateViewModel = {};
				}
				if(apptDate)
				{
					$scope.dataModel.apontmntDate = new Date(apptDate);
				}
				$scope.dataModel.apontmntDateViewModel.displayDate = apptDate;
				$scope.dataModel.apontmntDateViewModel.dateText = $scope.dataModel.apontmntDate;
			}
			if(!$scope.dataModel.showViewAppt){
				$scope.dataModel.readPreviousApptAttemptedDates();
				$scope.dataModel.readChartMemberDetailsApptId();
			}
		},function(error) {
			var message = JSON.stringify(error);
			$scope.dataModel.setMessage(message, "error");
		});
	}
	
	$scope.dataModel.readPreviousApptAttemptedDates = function(){
		var apptKey = $scope.dataModel.selectedMyApptId;
		$scope.dataModel.previousAtmtDates = [];
		var gcmRetAppointment = {
				apptKey : $scope.dataModel.selectedMyApptId
			}
		$http.post('/gcm-app-services/scheduling/workflow/getApptAttemptedDates', gcmRetAppointment).then(function(response) {
			if(response && response.data && response.data.result){
				$scope.dataModel.previousAtmtDates = response.data.result;
			}
		},function(error){
			var message = JSON.stringify(error);
			$scope.dataModel.setMessage(message, "error");
		});
	}
	
	$scope.dataModel.readChartMemberDetailsApptId = function(){
			$scope.dataModel.SchedulingSearchFilter.appointmentId = $scope.dataModel.selectedMyApptId;
			var retDataSearchFilter = {
								"assignInventorySearchFilter": [],
								"schedulingSearchFilter" : $scope.dataModel.SchedulingSearchFilter
							  };
		$http.post('/gcm-app-services/scheduling/workflow/getChartMemberDetailsByApptId', retDataSearchFilter).then(function(response) {
			if(response && response.data && response.data.result && response.data.result.length > 0){
				$scope.dataModel.retrievalRecords = response.data.result;
				for(var i = 0; i <  $scope.dataModel.retrievalRecords.length; i++)
				{
					if($scope.dataModel.retrievalRecords[i].isIncludeFlag == 'N'){
						$scope.dataModel.retrievalRecords[i].selected = false;
					}else{
						$scope.dataModel.retrievalRecords[i].selected = true;
						$scope.dataModel.includedRtrvlRecords.push($scope.dataModel.retrievalRecords[i]);
					}
				}
			}else{
				$scope.dataModel.includedRtrvlRecords = [];
				$scope.dataModel.retrievalRecords = [];
			}
			/*$scope.dataModel.retrievalInfoModel.records = $scope.dataModel.retrievalRecords;
			$scope.dataModel.retrievalInfoModel.totalRecordsCount = $scope.dataModel.retrievalRecords.length;
			$scope.dataModel.retrievalInfoModel.selectedRecords = $scope.dataModel.includedRtrvlRecords;
			$scope.dataModel.retrievalInfoModel.selectedRecordCount = $scope.dataModel.includedRtrvlRecords.length;*/
		}, function(error) {
			var errorMessage = JSON.stringify(error);
			$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
			$scope.errorMessageModel.visible = true;
		});
	}
	
	$scope.dataModel.apptCommentsList = [];
	
	$scope.dataModel.readApptComments = function(){
		$scope.dataModel.apptCommentsList  = [];
		$http.post('/gcm-app-services/scheduling/workflow/getApptComments', $scope.dataModel.selectedMyApptId).then(function(response) {
			if (response && response.data && response.data.result) {
				$scope.dataModel.apptCommentsList  = response.data.result;
			}
		}, function(error) {
			var message = JSON.stringify(error);
			$scope.dataModel.setMessage(message, "error");
		});
		
	}
	
	var config = {
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		};
	
	function reqParams(params) {
		var queryParams = "";
		for ( var key in params) {
			queryParams += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
		}
		return queryParams;
	}
	
	$scope.dataModel.readPendReasons = function(){
		$http.post('/gcm-app-services/masterdata/reasonCodes', reqParams({
			reasonType : "PNP",
			busFuncKey : 4
		}), config).then(function(response) {
			$scope.dataModel.pendReasons = response.data.result;
		}, function(error) {
			var message = JSON.stringify(error);
			$scope.dataModel.setMessage(message, "error");
		});
	}

});

schedulerworklistmodule.controller('chartStatusCntrl', function($scope, $compile, $timeout, $http, dataServiceModel) {
	$scope.dataModel = dataServiceModel;
	$scope.scheduledCnt = dataServiceModel.scheduledCnt;
	$scope.receivedCnt = dataServiceModel.receivedCnt;
	$scope.pendingCnt = dataServiceModel.pendingCnt;
	$scope.unscheduledCnt = dataServiceModel.unscheduledCnt;
});

schedulerworklistmodule.controller('faxStatusCntrl', function($scope, $compile, dataServiceModel, $http) {
	$scope.dataModel = 	dataServiceModel;
	
	$scope.faxStatusTableModel = {
		columns : [ {
			columnId : 'fax',
			label : 'Fax',
			resizable : false,
			style : 'width: 15%;',
			cellTemplate : '<a href ng-model="model.documentID" id="{{record.documentID}}" ng-click="model.getRightFaxDocument(record.documentID)"><uitk:icon-font icon="cux-icon-document" icon-text=""></uitk:icon-font></a>'
		}, {
			columnId : 'faxDate',
			label : 'Date',
			resizable : false,
			style : 'width: 15%;',
			sortOrder : 0,
			sortable : true,
			cellTemplate : '<span ng-bind="::record.faxDateTime"> </span>'
		},
		{
			columnId : 'faxStatus',
			label : 'Status',
			resizable : false,
			style : 'width: 30%;',
			sortOrder : 0,
			sortable : true,
			cellTemplate : '<span ng-bind="::record.faxStatus"> </span>'
		} ],
		records : [],
		totalRecordsCount : 0,
		getRightFaxDocument : function(documentID){
			$scope.dataModel.getRightFaxDocument(documentID);
		}	
	}
	
	$scope.dataModel.getRightFaxDocument = function(documentID){
		$http.post('/gcm-app-services/scheduling/retrieval/getFaxPacketByDocID?documentID='+documentID
				, {}, {responseType:'arraybuffer'})
		.then(function(response) {
			if(response && response.data) {
				var ieEDGE = navigator.userAgent.match(/Edge/g);
	            var ie = navigator.userAgent.match(/.NET/g); // IE 11+
	            var oldIE = navigator.userAgent.match(/MSIE/g); 
	            var name = "file";
	            var blob = new window.Blob([response.data], { type: 'application/pdf' });
	            if (ie || oldIE || ieEDGE) {
	                var fileName = name+'.pdf';
	                window.navigator.msSaveOrOpenBlob(blob, fileName);
	            }
	            else {
	                var file = new Blob([ response.data ], {
	                    type : 'application/pdf'
	                });
	                var fileURL = URL.createObjectURL(file);
	                var a         = document.createElement('a');
	                a.href        = fileURL; 
	                a.target      = '_blank';
	                a.download    = name+'.pdf';
	                document.body.appendChild(a);
	                a.click();
	            }

			}
			else {
				var errorMessage = "Fax packet not available for selected appointment";
				$scope.dataModel.setMessage(errorMessage, "error");
			}
		}, function(error) {
			alert(JSON.stringify(error));
		});	
	}
	
	var requestParam = {
			apptKey : $scope.dataModel.selectedMyApptId
	}
	$http.post('/gcm-app-services/scheduling/retrieval/getApptFaxHistory', requestParam).then(function(response) {
			if (response && response.data && response.data.result) {
				$scope.faxStatusTableModel.records  = response.data.result;
				$scope.faxStatusTableModel.totalRecordsCount = $scope.faxStatusTableModel.records.length;				
			}
			}, function(error) {
				var message = JSON.stringify(error);
				$scope.dataModel.setMessage(message, "error");
			});		
	
});

schedulerworklistmodule.controller('commentsHitoryCntrl', function($scope, $compile, $timeout, $http, dataServiceModel) {
	$scope.dataModel = dataServiceModel;
	$scope.dataModel.showFlag=false;
	$scope.dataModel.showSchCommentsLoadingDialog = false;
	var addComments = $scope.dataModel.addComments = function(){
		if ($scope.addcomments != "") {
			var appointmentComments = {
				apptKey : $scope.dataModel.selectedMyApptId,
				apptComments : $scope.addcomments,
				//apptIteration:  
				createUserId : $scope.dataModel.loginUserId
			}
			$scope.dataModel.showSchCommentsLoadingDialog = true;
			$http.post('/gcm-app-services/scheduling/workflow/insertApptComments', appointmentComments).then(function(response) {
				$scope.dataModel.showSchCommentsLoadingDialog = false;
				$scope.addcomments = "";
				var message = "Comments Added to appointment Successfully";
				$scope.dataModel.setMessage(message, "success");
				$scope.dataModel.readApptComments();
			}, function(error) {
				$scope.dataModel.showSchCommentsLoadingDialog = false;
				var message = JSON.stringify(error);
				$scope.dataModel.setMessage(message, "error");
			});
		}
		else {
			var message = "Comments Required";
			$scope.dataModel.setMessage(message, "error");
		}
	}
	$scope.saveComments = function() {
		if(!$scope.dataModel.selectedMyApptId){
			$scope.dataModel.saveComments = true;
			$scope.dataModel.handleSaveAsDraft();
		}else{
			addComments();
		}		
	}
});

window.handleCancelAppointment = function(){
	document.getElementById('cancelApptDialog_closeLink').click();
}
