/*var OUTREACH_SCHEDULER_BUS_FUNC_DTL_KEY = 1;
var ONSITE_SCHEDULER_BUS_FUNC_DTL_KEY = 2;
var EMR_SCHEDULER_BUS_FUNC_DTL_KEY = 3;*/
var CordysRoot = window.parent;
var rootData = window.parent.rootData;
var loginUserKey = optumUI.getUser().getLoggedInUserKey();
var requestedUserId = optumUI.getAuthUser();
var vendorKey = optumUI.getUser().getDefaultVendorKey();
var groupKey = optumUI.getUser().getCurrentGroupKey();

var utilitymodule = angular.module('utilityApp', ['uitk.component.uitkPanel', 'uitk.component.uitkDynamicTable', 'uitk.component.uitkIconFont',
	'uitk.component.uitkCalendar', 'uitk.component.uitkLabel', 'uitk.component.uitkTextField', 'uitk.component.uitkButton', 'uitk.component.tabs',
	'uitk.uitkUtility', 'uitk.component.uitkDialog', 'uitk.component.uitkRadioGroup', 'ngSanitize', 'uitk.component.uitkMessage', 'looup-data',
	'uitk.component.uitkTextarea','codingQAWorklistViewModel', 'codingUIApp', 'codingQAUIApp','staticDataService', 'ngDialog'
]);

utilitymodule.factory("dataServiceModel", function () {
	var dataObj = {};
	dataObj.showUploadError = false;
	dataObj.showFileSizeError = false;
	dataObj.showChartFileUploadButton = false
	dataObj.errorMsg = false;
	dataObj.providerInfoModel = {};
	dataObj.providerInfoVisited = false;
	dataObj.providerSelectionChanged = false;
	dataObj.retrvlInfoVisited = false;
	dataObj.retrvlSelectionChanged = false;
	dataObj.showViewAppt = false;
	dataObj.showPend = false;
	dataObj.isSupervisorUI = true;
	dataObj.isReadonly=true;
	dataObj.providerRecords = [];
	dataObj.selectedProvRecords = [];
	dataObj.retrievalRecords = [];
	dataObj.includedRtrvlRecords = [];
	dataObj.existingAppointments = [];
	dataObj.myAppointmentsModel = {};
	dataObj.viewAppointmentModel = {};
	dataObj.previousAtmtDates = [];
	dataObj.selectedAppt = {};
	dataObj.selectedChart = {};
	dataObj.history = [];
	dataObj.comments = [];
	dataObj.viewEncounters = [];
	dataObj.apptKey = '';
	return dataObj;
});

utilitymodule.factory('errorMessageModel1', function() {
	return {
		id : 'Error',
		messageType : 'error',
		content : '',
		visible : false,
		headingLevel : '2',
		closeButton : true,
		messageVisibleTime : '5000'
	}
});
utilitymodule.controller("utilityCtrl", function ($scope, $http, $compile, $filter, $timeout, lookupService, staticDataService, errorMessageModel,errorMessageModel1, dataServiceModel) {

	$scope.lookupService = lookupService;
	$scope.url = 'utilityTabs.htm';
	$scope.dataModel = dataServiceModel;

	$scope.$watch('lookupService.url', function (newVal, oldVal) {
		if (newVal !== '')
			$scope.url = lookupService.url;
	});
	
	var searchTab = {
			title : 'Search',
			templateurl : 'search.htm',
			callback : function(event, tabData) {
				lookupService.filters.currentTab = 'search';
				$scope.dataModel.retainSearchFilters = false;
			}
	};
	var dataIntakeTab = {
			title : 'Data Intake',
			templateurl : 'dataintake.htm',
			callback : function(event, tabData) {
				lookupService.filters.currentTab = 'dataintake';
				$scope.dataModel.retainSearchFilters = false;
			}
		};
	var projCloseTab = {
			title : 'Project Close',
			templateurl : 'projectClose.htm',
			callback : function(event, tabData) {
				lookupService.filters.currentTab = 'projectClose';
				$scope.dataModel.retainSearchFilters = false;
			}
		};
	
	$scope.utilitiesTabsModel = {
			selectedIndex : 0,
			id : 'utilityTabs',
			ariaLabel : 'Utility',
			eventsEnable : true,
			tabs : [ searchTab, dataIntakeTab, projCloseTab ]
		};
	
	
	$scope.dataModel.selectedChart = {};
	$scope.dataModel.retrvlPrefSelect = '';
	
	$scope.dataModel.viewPage = function(url){
		lookupService.url = url;
	}
	
	$scope.dataModel.openPendAppointment = function(results){
		if(results!=null){
			$scope.dataModel.selectedMyApptId =results.apptKey;
			$scope.dataModel.apptStatus =  results.apptStatus;
			$scope.dataModel.apptType =  results.apptType;
			$scope.dataModel.apptKey=results.apptKey;
		
			$scope.dataModel.readChartStatusDetails();
			$scope.retrievalPreference = results.apptType;
			$scope.dataModel.retrvlPrefSelect = results.apptType;
			$scope.dataModel.retrievalProvName = results.firstName + ", "+  results.lastName;
			$scope.dataModel.firstName = results.firstName;
			$scope.dataModel.lastName = results.lastName;
			$scope.dataModel.address1 = results.address1;
			$scope.dataModel.address2 = results.address2;
			$scope.dataModel.city = results.city;
			if (null != results.state)
				$scope.dataModel.stateSelect = results.state;
			$scope.dataModel.zip = results.zip;
			$scope.dataModel.phonenumber = results.phoneNum;
			$scope.dataModel.fax = results.faxNum;
			$scope.dataModel.email = results.email;
			$scope.dataModel.apptDate = results.uiApptDate;
			$scope.dataModel.retrievalProvName = results.firstName + ", "+  results.lastName;
			$scope.dataModel.faxStatus = results.faxStatus;
			$scope.dataModel.gcmUserKey = results.gcmUserKey;
			$scope.dataModel.noOfAttempts =  results.noOfAttempts;
			$scope.dataModel.pendAttempts =  results.noOfPendAttempts;
			$scope.dataModel.name = (results.lastName ? results.lastName +", ": '')
			+(results.firstName?results.firstName:'');
			$scope.dataModel.location = (results.address1 ? results.address1+',' : '')+
			   (results.address2 ? results.address2+',' : '')
			   +(results.city ? results.city+',': '')
			   + (results.state ? results.state+',' : '')
			   +(results.zip ? results.zip : '')	;
			$scope.dataModel.location =$scope.dataModel.location =="null,"?'':$scope.dataModel.location;

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
				
				$scope.dataModel.apptTime = apptTime;
				if(hrs < 12){
					if(hrs == 0){
						$scope.dataModel.apptTime = '12'+":"+mnts;
					}
					$scope.dataModel.apptTime = $scope.dataModel.apptTime +" AM";
				}else{
					if(hrs > 12){
						hrs = hrs - 12;
					}
					$scope.dataModel.apptTime = hrs+":"+mnts+" "+" PM";
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
	}
	$scope.dataModel.openViewAppointment = function(results){
			if(results!=null){
				$scope.dataModel.previousAtmtDates = results;
					$scope.dataModel.selectedMyApptId =results.apptKey;
					$scope.dataModel.apptStatus =  results.apptStatus;
					$scope.dataModel.apptType =  results.apptType;
					$scope.dataModel.apptKey=results.apptKey;
					//$scope.dataModel.readApptComments();
					$scope.dataModel.readChartStatusDetails();
					$scope.retrievalPreference = results.apptType;
					$scope.dataModel.retrvlPrefSelect = results.apptType;
					$scope.dataModel.retrievalProvName = results.firstName + ", "+  results.lastName;
					$scope.dataModel.firstName = results.firstName;
					$scope.dataModel.lastName = results.lastName;
					$scope.dataModel.address1 = results.address1;
					$scope.dataModel.address2 = results.address2;
					$scope.dataModel.city = results.city;
					if (null != results.state)
						$scope.dataModel.stateSelect = results.state;
					$scope.dataModel.zip = results.zip;
					$scope.dataModel.phonenumber = results.phoneNum;
					$scope.dataModel.fax = results.faxNum;
					$scope.dataModel.email = results.email;
					$scope.dataModel.apptDate = results.uiApptDate;
					$scope.dataModel.retrievalProvName = results.firstName + ", "+  results.lastName;
					$scope.dataModel.faxStatus = results.faxStatus;
					$scope.dataModel.gcmUserKey = results.gcmUserKey;
					$scope.dataModel.noOfAttempts =  results.noOfAttempts;
					$scope.dataModel.noOfPendAttempts =  results.noOfPendAttempts;

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
		
	}
	$scope.dataModel.showPendLoadingDialog = false;
	$scope.dataModel.showFiltersLoadingDialog = false;
	$scope.showConfirmLoadingDialog = false;
	$scope.showSaveDraftLoadingDialog = false;

	$scope.dataModel.showFlag = false;
	$scope.dataModel.showMemberInfoDialog = false;
	$scope.dataModel.showCancelApptDialog = false;
	$scope.dataModel.showChangeApptDtTimeDialog = false;
	$scope.dataModel.showWorklist = false;
	$scope.dataModel.isFromViewApptmnt = false;
	$scope.dataModel.recordModified = false;
	$scope.dataModel.cancelClick = false;
	$scope.showChartFileUploadDialog = false;
	$scope.showLoadingDialog=false;
	$scope.dataModel.isFromUtility = true;
	
	$scope.pendAppointment = function(){
		$scope.dataModel.pendReasonSelect = "";
		$scope.dataModel.addPendcomments = "";
		if(!$scope.dataModel.pendReasons || $scope.dataModel.pendReasons.length == 0){
			$scope.dataModel.readPendReasons();
		}
		$scope.dataModel.viewAppointmentModel=$scope.viewAppointmentModel;
		$scope.dataModel.showPendApptDialog = !$scope.dataModel.showPendApptDialog;
	}
	
	var userObj = optumUI.getUser();
	$scope.dataModel.loginUserKey = userObj.getLoggedInUserKey();
	$scope.dataModel.loginUserId = optumUI.getAuthUser();
	$scope.dataModel.vendorKey = userObj.getDefaultVendorKey();
	$scope.dataModel.currentGroupKey = userObj.getCurrentGroupKey();
	var rootData = window.parent ? window.parent.rootData : {};
	$scope.dataModel.currentRole = rootData.currentRole;

	$scope.amPMTypes = [{
			label: 'AM',
			value: 'AM',
			disabled: false
		},
		{
			label: 'PM',
			value: 'PM',
			disabled: false
		}
	];
	
	
	$scope.dataModel.setMessage = function (message, messageType) {
		$scope.dataModel.clearBanners();
		if (messageType && messageType == "success") {
			$scope.dataModel.workListSuccessMessageModel.content = '<span>' + message + '</span>';
			$scope.dataModel.workListSuccessMessageModel.visible = true;
			$scope.dataModel.workListSuccessMessageModel.messageType = 'success';
			//$scope.dataModel.workListSuccessMessageModel.messageVisibleTime = '5000';
		} else if (messageType && messageType == "error") {
			$scope.dataModel.workListErrorMessageModel.content = '<span>' + message + '</span>';
			$scope.dataModel.workListErrorMessageModel.visible = true;
			$scope.dataModel.workListErrorMessageModel.messageType = 'error';
		} else if (messageType && messageType == "warning") {
			$scope.dataModel.workListErrorMessageModel.content = '<span>' + message + '</span>';
			$scope.dataModel.workListErrorMessageModel.visible = true;
			$scope.dataModel.workListErrorMessageModel.messageType = 'warning';
		}
	}

	$scope.dataModel.clearBanners = function () {
		$scope.dataModel.workListSuccessMessageModel.visible = false;
		$scope.dataModel.workListErrorMessageModel.visible = false;
	}

	// Schedule appointment wizard logic
	dataServiceModel.hasCompletedAllSteps = false;

	$scope.dataModel.wizardModel = {
		id: "createSchedule",
		wizardDescriptionId: "createScheduleWizard",
		renderNavIndexes: true,
		buttonsTemplateUrl: "",
		wizardSteps: [{
			label: "Provider Information",
			templateurl: '../retrieval/scheduling/views/providerinformation.htm'
		}, {
			label: "Retrieval Information",
			templateurl: '../retrieval/scheduling/views/retrievalinformation.htm',
			focusElementId: 'firstNameId_input'
		}, {
			label: "Appointment",
			templateurl: '../retrieval/scheduling/views/appointment.htm',
			focusElementId: 'userNameId_input'
		}, {
			label: "Confirmation",
			templateurl: '../retrieval/scheduling/views/appointmentconfirmation.htm',
			focusElementId: 'iAgreeLblId'
		}],
		previousButton: {
			label: "Previous",
			callback: function () {
				return $scope.handlePrevButtonClick();
			}
		},
		nextButton: {
			label: "Next",
			callback: function () {
				return $scope.handleNextButtonClick();
			}
		},
		extraBtn1: {
			label: "Pend Appointment",
			show: true,
			action: function () {
				$scope.handlePendAppointMent();
			}
		},
		extraBtn2: {
			label: "Save as Draft",
			show: true,
			action: function () {
				$scope.handleSaveAsDraft();
			}
		},
		finishButton: {
			label: "Finish",
			callback: function () {

				this.hasCompletedAllSteps = false;
				dataServiceModel.hasCompletedAllSteps = false;
				return $scope.handleFinishClick();
			}
		},
		cancelLink: {
			label: "Cancel",
			action: function () {
				$scope.handleCancelClick();
			}
		}
	}


	$scope.handlePrevButtonClick = function () {
		$scope.dataModel.showPendLoadingDialog = false;
		$scope.dataModel.clearBanners();
		if ($scope.dataModel.wizardModel.currentStep == 2) {
			$scope.dataModel.wizardModel.nextButton.label = 'Next';
			$("#createSchedule_nextBtn").text($scope.dataModel.wizardModel.nextButton.label);
		} else if ($scope.dataModel.wizardModel.currentStep == 3) {
			$scope.dataModel.providerSelectionChanged = false;
		}
		return true;
	}

	$scope.handleNextButtonClick = function () {
		$scope.dataModel.clearBanners();
		if ($scope.dataModel.wizardModel.currentStep == 1) {
			$scope.dataModel.wizardModel.nextButton.label = 'Next';
			$("#createSchedule_nextBtn").text($scope.dataModel.wizardModel.nextButton.label);
			$scope.dataModel.wizardModel.nextButton.disabled = false;
		}
		if ($scope.dataModel.wizardModel.currentStep == 2) {
			if ($scope.dataModel.includedRtrvlRecords.length <= 0) {
				$scope.dataModel.setMessage("Select Members to release to EMR/ONSITE Queue", "error");
				return;
			}
			if ($scope.dataModel.phonenumber.length > 10 || $scope.dataModel.phonenumber.length == 0)
				$scope.phoneNo = $scope.dataModel.phonenumber;
			else if ($scope.dataModel.phonenumber.length == 10)
				$scope.phoneNo = $scope.dataModel.phonenumber.slice(0, 3) + "-" + $scope.dataModel.phonenumber.slice(3, 6) + "-" + $scope.dataModel.phonenumber.slice(6, 10);
			if ($scope.dataModel.fax.length > 10 || $scope.dataModel.fax.length == 0)
				$scope.fax = $scope.dataModel.fax;
			else if ($scope.dataModel.fax.length == 10)
				$scope.fax = $scope.dataModel.fax.slice(0, 3) + "-" + $scope.dataModel.fax.slice(3, 6) + "-" + $scope.dataModel.fax.slice(6, 10);
			var canproceedToNextStep = $scope.dataModel.validateretrievalDetails();
			if (!canproceedToNextStep) {
				$scope.dataModel.wizardModel.currentStep = 2;
				return false;
			}
			if (!$scope.dataModel.amPMType || $scope.dataModel.amPMType.index != 1) {
				$scope.dataModel.amPMType = {
					index: 0
				};
			}
			if ($scope.dataModel.faxMemberType) {
				$scope.dataModel.faxMemberType = {
					index: -1
				};
			}
		}

		if ($scope.dataModel.wizardModel.currentStep == 3) {
			var canproceedToNextStep = $scope.dataModel.validateAppointmentTimings();
			if (!canproceedToNextStep) {
				$scope.dataModel.wizardModel.currentStep = 3;
				return false;
			}
		}
		return true;
	}


	$scope.dataModel.handleCancelClick = function () {
		$scope.dataModel.showViewAppt = false;
		$scope.dataModel.showPend = false;
	}

	$scope.dataModel.handleCancelClick = function () {
		$scope.clearWizardData();
		lookupService.filter();
	}

	$scope.dataModel.handleFinishClick = function () {
		var schedulingInventory = [];

		var apptStatus = "SCHEDULED";
		var noOfAttempts = $scope.dataModel.noOfAttempts;
		/*if($scope.dataModel.selectedAppt && $scope.dataModel.selectedAppt.apptStatus && $scope.dataModel.selectedAppt.apptStatus == 'PASTDUE'){
			noOfAttempts = noOfAttempts + 1; 
		}*/
		if (!$scope.dataModel.apontmntDate) return false;
		var chartIdList = [];
		var chartIdExclList = [];
		for (var i = 0; i < $scope.dataModel.includedRtrvlRecords.length; i++) {
			chartIdList.push($scope.dataModel.includedRtrvlRecords[i].chartId);
		}
		for (var i = 0; i < $scope.dataModel.retrievalRecords.length; i++) {
			if (!$scope.dataModel.retrievalRecords[i].selected) {
				chartIdExclList.push($scope.dataModel.retrievalRecords[i].chartId);
			}
		}
		for (var i = 0; i < $scope.dataModel.providerRecords.length; i++) {
			if (!$scope.dataModel.providerRecords[i].selected) {
				schedulingInventory.push($scope.dataModel.providerRecords[i]);
			}
		}
		var dateToStore = $scope.dataModel.apontmntDate;
		var appointmentTime = $scope.dataModel.apontmntTime;
		var dateToStoreString;
		var hrMntArray = [];

		if (appointmentTime) {
			hrMntArray = appointmentTime.split(":");
		}
		if (hrMntArray.length > 1) {
			var apptHours, apptMinutes;
			if ($scope.dataModel.amPMType && $scope.dataModel.amPMType.index == 1) {
				var hrs = parseInt(hrMntArray[0]);
				if (hrs < 12) {
					hrs = hrs + 12;
				}

				//		dateToStore.setHours(hrs);
				apptHours = hrs;
			} else {
				var hrs = parseInt(hrMntArray[0]);
				if (hrs == 12) {
					apptHours = '00';
				}
				//		dateToStore.setHours(hrMntArray[0]);
				else {
					apptHours = hrMntArray[0];
				}

			}
			//	dateToStore.setMinutes(hrMntArray[1]);
			apptMinutes = hrMntArray[1];
			dateToStoreString = $scope.dataModel.apontmntDateViewModel.dateText + " " + apptHours + ":" + apptMinutes + ":" + "00";
		} else {
			dateToStoreString = $scope.dataModel.apontmntDateViewModel.dateText + " " + dateToStore.getHours() + ":" + dateToStore.getMinutes() + ":" + "00";
		}

		//		var dateToStoreString = $scope.dataModel.apontmntDateViewModel.dateText + " "+dateToStore.getHours()+":"+dateToStore.getMinutes()+":"+"00";

		$scope.confirmApptInput = {
			"retStatus": "SCHEDULED",
			"requestedUserId": $scope.dataModel.loginUserId,
			"assignInventorySearchFilter": schedulingInventory,
			"chartIdList": chartIdList,
			"chartIdExclList": chartIdExclList,
			"loginUserKey": $scope.dataModel.loginUserKey,
			"retMethod": $scope.dataModel.retrvlPrefSelect,
			"busFuncDtlKey": $scope.dataModel.busFuncDtlKey,
			"appt": {
				"apptIteration": "",
				"apptKey": $scope.dataModel.apptKey,
				"firstName": $scope.dataModel.firstName.trim(),
				"lastName": $scope.dataModel.lastName.trim(),
				"address1": $scope.dataModel.address1.trim(),
				"address2": $scope.dataModel.address2 != null ? $scope.dataModel.address2.trim() : '',
				"city": $scope.dataModel.city.trim(),
				"state": $scope.dataModel.stateSelect,
				"zip": $scope.dataModel.zip,
				"phoneNum": $scope.phoneNo,
				"faxNum": $scope.fax,
				"email": $scope.dataModel.email,
				"faxStatus": $scope.dataModel.faxStatus ? $scope.dataModel.faxStatus : 'NEW',
				"apptStatus": apptStatus,
				"uiApptDate": dateToStoreString,
				"apptType": $scope.dataModel.retrvlPrefSelect,
				"gcmUserKey": $scope.dataModel.loginUserKey,
				"gcmVendorKey": $scope.dataModel.vendorKey,
				"gcmGroupKey": $scope.dataModel.currentGroupKey ? $scope.dataModel.currentGroupKey : 3,
				"createUser": $scope.dataModel.loginUserId,
				"modifiedUser": $scope.dataModel.loginUserId,
				"noOfAttempts": noOfAttempts
			}
		}
		$scope.showConfirmLoadingDialog = true;
		$http.post('/gcm-app-services/scheduling/workflow/confirmAppointment', $scope.confirmApptInput).then(function (response) {
			var message = '';
			if (response && response.data && response.data.status == 'SUCCESS') {
				$scope.showConfirmLoadingDialog = false;
				message = "Appointment has been created.";
				//$scope.dataModel.setMessage(message, "success");
			}
			$scope.clearWizardData();
			lookupService.filter(message, "success");
		}, function (error) {
			$scope.showConfirmLoadingDialog = false;
			var message = JSON.stringify(error);
			$scope.dataModel.setMessage(message, "error");
			return false;
		});
		return false;
	}

	$scope.clearWizardData = function () {
		$scope.dataModel.clearApptData();

		//$scope.dataModel.clearWorkListData();

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

		$scope.dataModel.appointmentType = {
			index: 0
		};
		$scope.dataModel.amPMType = {
			index: 0
		};
		$scope.dataModel.existingAppointmentsModel = {};
		$scope.dataModel.existingAppointmentsModel.records = [];
		$scope.dataModel.existingAppointmentsModel.totalRecordsCount = 0;
		//$scope.dataModel.apptCommentsList = [];
		$scope.dataModel.existingAppointments = [];
		$scope.dataModel.previousAtmtDates = [];

		$scope.dataModel.isFromModifyApptmnt = false;

		$scope.chartStatusModel.open = false;
		$scope.faxStatusModel.open = false;
		$scope.commentHistoryModel.open = false;
		//$scope.dataModel.apptKey = "";
	}

	$scope.dataModel.clearWizardData = function () {
		$scope.clearWizardData();
	}

	$scope.dataModel.clearApptData = function () {
		$scope.dataModel.showWorklist = true;

		$scope.showLoadingDialog = false;
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
		$scope.dataModel.apptStatus = '';
		$scope.dataModel.faxStatus = '';
		$scope.dataModel.gcmUserKey = '';
		$scope.dataModel.noOfAttempts = 0;
		$scope.dataModel.noOfPendAttempts = 0;
		$scope.phoneNo = '';
		$scope.fax = '';
		$scope.dateToStoreString = '';
	}

	$scope.handleFinishClick = function () {
		$scope.dataModel.confirmType = 'Finish'
		$scope.dataModel.confirmMessage = "An appointment will be created for all Included members.  Excluded members will return to your Worklist.  Do you want to proceed?";
		$scope.dataModel.showConfirmApptDialog = !$scope.dataModel.showConfirmApptDialog;
	}

	

	$scope.dataModel.handlePendAppointMent = function () {
		if ($scope.dataModel.pendReasonSelect) {
			var chartIdList = [];
			var chartIdExclList = [];
			var schedulingInventory = [];
			if ($scope.dataModel.phonenumber && $scope.dataModel.phonenumber.length != 0) {
				var phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
				var phoneRegEx = new RegExp(phonePattern);
				var phoneFlag = phoneRegEx.test($scope.dataModel.phonenumber);
				var phonePattern1 = /^\d{10}$/;
				var phoneRegEx1 = new RegExp(phonePattern1);
				var phoneFlag1 = phoneRegEx1.test($scope.dataModel.phonenumber);
				if ((!phoneFlag && !phoneFlag1) || $scope.dataModel.phonenumber.length > 12) {
					var errorMessage = "Phone Number Not Valid";
					$scope.dataModel.setMessage(errorMessage, "error");
					return false;
				}
			}
			if ($scope.dataModel.fax && $scope.dataModel.fax.length != 0) {
				var faxPattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
				var faxRexEx = new RegExp(faxPattern);
				var faxFlag = faxRexEx.test($scope.dataModel.fax);
				var faxPattern1 = /^\d{10}$/;
				var faxRexEx1 = new RegExp(faxPattern1);
				var faxFlag1 = faxRexEx1.test($scope.dataModel.fax);
				if ((!faxFlag && !faxFlag1) || $scope.dataModel.fax.length > 12) {
					var errorMessage = "Fax Not Valid";
					$scope.dataModel.setMessage(errorMessage, "error");
					return false;
				}
			}
			if ($scope.dataModel.phonenumber) {
				if ($scope.dataModel.phonenumber.length > 10 || $scope.dataModel.phonenumber.length == 0)
					$scope.phoneNo = $scope.dataModel.phonenumber
				else if ($scope.dataModel.phonenumber.length == 10)
					$scope.phoneNo = $scope.dataModel.phonenumber.slice(0, 3) + "-" + $scope.dataModel.phonenumber.slice(3, 6) + "-" + $scope.dataModel.phonenumber.slice(6, 10);
			}
			if ($scope.dataModel.fax) {
				if ($scope.dataModel.fax.length > 10 || $scope.dataModel.fax.length == 0)
					$scope.fax = $scope.dataModel.fax;
				else if ($scope.dataModel.fax.length == 10)
					$scope.fax = $scope.dataModel.fax.slice(0, 3) + "-" + $scope.dataModel.fax.slice(3, 6) + "-" + $scope.dataModel.fax.slice(6, 10);
			}
			if ($scope.dataModel.wizardModel.currentStep == 1) {
				schedulingInventory = $scope.dataModel.providerRecords;
			} else if ($scope.dataModel.wizardModel.currentStep == 2) {
				for (var i = 0; i < $scope.dataModel.retrievalRecords.length; i++) {
					chartIdList.push($scope.dataModel.retrievalRecords[i].chartId);
				}
			} else if ($scope.viewAppointmentModel) {
				for (var i = 0; i < $scope.viewAppointmentModel.records.length; i++) {
					chartIdList.push($scope.viewAppointmentModel.records[i].chartId);
				}
			}
			$scope.dateToStoreString = '';
			$scope.prepareDateStringToStore()
			var retMethod = $scope.dataModel.retrvlPrefSelect ? $scope.dataModel.retrvlPrefSelect : "";

			$scope.pendApptInput = {
				"retStatus": "PEND",
				"requestedUserId": $scope.dataModel.loginUserId,
				"retMethod": retMethod,
				"chartIdList": chartIdList,
				"chartIdExclList": chartIdExclList,
				"loginUserKey": $scope.dataModel.loginUserKey,
				"pendReasonCode": $scope.dataModel.pendReasonSelect,
				"pendReasonComment": $scope.dataModel.addPendcomments,
				"assignInventorySearchFilter": schedulingInventory,
				"busFuncDtlKey": $scope.dataModel.busFuncDtlKey,
				"appt": {
					"apptKey": $scope.dataModel.apptKey,
					"apptIteration": 1,
					"firstName": $scope.dataModel.firstName != null ? $scope.dataModel.firstName.trim() : '',
					"lastName": $scope.dataModel.lastName != null ? $scope.dataModel.lastName.trim() : '',
					"address1": $scope.dataModel.address1 != null ? $scope.dataModel.address1.trim() : '',
					"address2": $scope.dataModel.address2 != null ? $scope.dataModel.address2.trim() : '',
					"city": $scope.dataModel.city != null ? $scope.dataModel.city.trim() : '',
					"state": $scope.dataModel.stateSelect,
					"zip": $scope.dataModel.zip,
					"phoneNum": $scope.phoneNo,
					"faxNum": $scope.fax,
					"email": $scope.dataModel.email,
					"faxStatus": $scope.dataModel.faxStatus ? $scope.dataModel.faxStatus : 'NEW',
					"apptStatus": "PEND",
					"uiApptDate": $scope.dateToStoreString,
					"apptType": retMethod,
					"gcmUserKey": $scope.dataModel.loginUserKey,
					"gcmVendorKey": $scope.dataModel.vendorKey,
					"gcmGroupKey": $scope.dataModel.currentGroupKey ? $scope.dataModel.currentGroupKey : 3,
					"createUser": $scope.dataModel.loginUserId,
					"modifiedUser": $scope.dataModel.loginUserId,
					"reasonCode": $scope.dataModel.pendReasonSelect,
					"reasonComment": $scope.dataModel.addPendcomments,
					"noOfAttempts": $scope.dataModel.noOfAttempts,
					"noOfPendAttempts": $scope.dataModel.noOfPendAttempts
				}
			}
			$scope.dataModel.showPendLoadingDialog = true;
			$('#uitkPopupId1_headerId').css({
				display: 'none'
			});
			$('#uitkPopupId1_closeLink').css({
				display: 'none'
			});
			$('#uitkPopupId1').css({
				'border-width': 'unset',
				'border-style': 'none'
			});
			$http.post('/gcm-app-services/scheduling/workflow/confirmAppointment', $scope.pendApptInput).then(function (response) {
				$scope.dataModel.showPendLoadingDialog = false;
				var message = "";
				if (response && response.data && response.data.status == 'SUCCESS') {
					$scope.errorMessageModel1.messageType = 'success';
					$scope.errorMessageModel1.content = '<span>Appointment moved to PEND successfully</span>';
					$scope.errorMessageModel1.visible = true;
				}
				$scope.dataModel.showPendApptDialog = false;
				$scope.clearWizardData();
				//lookupService.filter(message, "success");
				$scope.dataModel.showPend=false;	
				$scope.dataModel.showViewAppt=false;
			}, function (error) {
				$scope.dataModel.showPendLoadingDialog = false;
				var message = JSON.stringify(error);
				$scope.dataModel.setMessage(message, "error");
				return false;
			});
		} else {
			var message = "Pend Reason is a required field.";
			$scope.dataModel.setMessage(message, "error");
		}
	}

	$scope.prepareDateStringToStore = function () {
		if ($scope.dataModel.apontmntDate) {
			var dateToStore = $scope.dataModel.apontmntDate;
			var appointmentTime = $scope.dataModel.apontmntTime;
			var hrMntArray = [];
			var dateText = $scope.dataModel.apontmntDateViewModel.displayDate ? $scope.dataModel.apontmntDateViewModel.displayDate : $scope.dataModel.apontmntDateViewModel.dateText;

			if (appointmentTime) {
				hrMntArray = appointmentTime.split(":");
			}
			if (hrMntArray.length > 1) {
				var apptHours, apptMinutes;
				if ($scope.dataModel.amPMType && $scope.dataModel.amPMType.index == 1) {
					var hrs = parseInt(hrMntArray[0]);
					if (hrs < 12) {
						hrs = hrs + 12;
					} else {

					}
					//		dateToStore.setHours(hrs);
					apptHours = hrs;
				} else {
					//		dateToStore.setHours(hrMntArray[0]);
					apptHours = hrMntArray[0];
				}
				//	dateToStore.setMinutes(hrMntArray[1]);
				apptMinutes = hrMntArray[1];
				$scope.dateToStoreString = dateText + " " + apptHours + ":" + apptMinutes + ":" + "00";
			} else {
				$scope.dateToStoreString = dateText + " " + dateToStore.getHours() + ":" + dateToStore.getMinutes() + ":" + "00";
			}
		}
	}

	$scope.data = {};
	$scope.dataModel.wizardModel.dataModelService = dataServiceModel;

	$scope.chartStatusModel = {
		id: 'chartStatusPanel',
		title: 'Chart Status',
		titleH3: true,
		templateUrl: 'chartstatus.htm',
		open: false,
		lazyLoad: false,
		collapsible: true
	}
	
	$scope.retrievalInfoModel = {
			id : 'retrievalInfoId',
			titleH3 : true,
			templateUrl : 'retrievalinfo.htm',
			open : true,
			lazyLoad : false,
			collapsible : false
	}
	
	
	$scope.handleRetrvlPrefSelection=function(){
		$scope.dataModel.gcmUserKey="";
		$scope.dataModel.isChanged=true;
		$scope.dataModel.getUsersByRoleCode();
	}
	$scope.dataModel.getUsersByRoleCode= function(){
		var roleCodes=["SH","ESH","OSH"];
		if($scope.dataModel.retrvlPrefSelect=="EMR")
			roleCodes=["ESH"];
		else if($scope.dataModel.retrvlPrefSelect=="ONSITE")
			roleCodes=["OSH"];
		else
		 roleCodes=["SH","ESH","OSH"];
		$scope.dataModel.pendWorklistUpdate ={
		loginUserKey : $scope.dataModel.loginUserKey,
		roleCodes : roleCodes
		}
			$http.post('/gcm-app-services/masterdata/getUsersByRoleCode', $scope.dataModel.pendWorklistUpdate).then(function(response) {
				if (response && response.data && response.data.result) {
				
				$scope.dataModel.users	=[];
					$scope.dataModel.users  = response.data.result;
					
				}
				if(!$scope.dataModel.isChanged)
					$scope.dataModel.openPendAppointment();
			}, function(error) {
				var message = JSON.stringify(error);
				$scope.dataModel.setMessage(message, "error");
			});
		
		}

	
	$scope.dataModel.readChartStatusDetails = function () {
		var unscheduledCnt = 0;
		var receivedCnt = 0;
		var scheduledCnt = 0;
		var nonRetrievableCnt = 0;
			var chartStatusFilter = {
				appointmentId: $scope.dataModel.apptKey,
				busSegment: lookupService.filters.busSegment,
				projectName: lookupService.filters.program,
				clientKey: lookupService.filters.client,
				hpKey: lookupService.filters.hp,
				hpProduct: lookupService.filters.hpp,
				isAssigned: '',
				providerId: lookupService.filters.provId,
				provGroupName: lookupService.filters.provgrpNm,
				provLastName: lookupService.filters.provLastNm,
				provFirstName: lookupService.filters.provFstNm,
				fromUserKey: lookupService.filters.user,
				loginUserKey: $scope.dataModel.loginUserKey,
				groupKey: $scope.dataModel.currentGroupKey ? $scope.dataModel.currentGroupKey : 3,
				vendorKey: $scope.dataModel.vendorKey,
				busFuncDtlKey: $scope.dataModel.busFuncDtlKey //need to get it from worklist and pass for now hard coding to 1(outreach) Once changes made to default.htm to get detail key this needs to modify
			}
			$http.post('/gcm-app-services/scheduling/workflow/getChartStatusCountByUser', chartStatusFilter).then(function (response) {
				if (response && response.data && response.data.result && response.data.result.length > 0) {
					scheduledCnt = response.data.result[0].scheduledCnt ? response.data.result[0].scheduledCnt : 0;
					receivedCnt = response.data.result[0].receivedCnt ? response.data.result[0].receivedCnt : 0;
					unscheduledCnt = response.data.result[0].unscheduledCnt ? response.data.result[0].unscheduledCnt : 0;
					nonRetrievableCnt = response.data.result[0].unscheduledCnt ? response.data.result[0].unscheduledCnt : 0;
					nonRetrievableCnt = response.data.result[0].nonRetrievableCnt ? response.data.result[0].nonRetrievableCnt : 0;
				} else if (response && response.data && response.data.result) {
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
			}, function (error) {
				var message = JSON.stringify(error);
				$scope.dataModel.setMessage(message, "error");
			});
	}

	$scope.faxStatusModel = {
		id: 'faxtStatuspanel',
		title: 'Fax Status',
		titleH3: true,
		templateUrl: 'faxstatus.htm',
		open: false,
		lazyLoad: false,
		collapsible: true
	}
	$scope.commentHistoryModel = {
		id: 'commentHistoryPanel',
		title: 'Comments History',
		titleH3: true,
		templateUrl: 'commentshistory.htm',
		open: false,
		lazyLoad: false,
		collapsible: true
	}

	$scope.viewApptModel = {
		id: 'viewApptPanel',
		title: 'Confirmation',
		templateUrl: 'viewappointmentChart.htm',
		styleClass: '',
		headerClass: '',
		contentClass: '',
		open: true
	}

	

	$scope.cancelWarningMessageModel = {
		id: 'cancelWarningMessage',
		messageType: 'warning',
		content: '',
		visible: true,
		position: 'inline',
		rememberMe: false,
		messageRole: 'alert',
		headingLevel: '2'
	}


	$scope.dataModel.readPreviousApptAttemptedDates = function () {
		var apptKey = $scope.dataModel.apptKey;
		$scope.dataModel.previousAtmtDates = [];
		var gcmRetAppointment = {
			apptKey: $scope.dataModel.apptKey
		}
		$http.post('/gcm-app-services/scheduling/workflow/getApptAttemptedDates', gcmRetAppointment).then(function (response) {
			if (response && response.data && response.data.result) {
				$scope.dataModel.previousAtmtDates = response.data.result;
			}
		}, function (error) {
			var message = JSON.stringify(error);
			$scope.dataModel.setMessage(message, "error");
		});
	}
	

var config = {
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
};

function reqParams(params) {
	var queryParams = "";
	for (var key in params) {
		queryParams += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
	}
	return queryParams;
}

$scope.dataModel.readPendReasons = function () {
$http.post('/gcm-app-services/masterdata/reasonCodes', reqParams({
	reasonType: "PNP",
	busFuncKey: 4
}), config).then(function (response) {
	$scope.dataModel.pendReasons = response.data.result;
}, function (error) {
	var message = JSON.stringify(error);
	$scope.dataModel.setMessage(message, "error");
});
}


$scope.errorMessageModel1=errorMessageModel1;
$scope.errorMessageModel1.visible = false;	
$scope.dataModel.showRetrievalInfoLoadingDialog = false;
$scope.cancelBtn = function(){
	$scope.dataModel.showPend=false;	
	$scope.dataModel.showViewAppt=false;
}
$scope.handleRetrvlPrefSelection=function(){
$scope.dataModel.gcmUserKey="";
$scope.dataModel.isChanged=true;
$scope.dataModel.getUsersByRoleCode();
}
var releasedChartIds=[];
var nonRetrChartIds=[];

          $scope.isServiceConfigured = function() {
        	  var gcmConfigInput = {
        			  	groupKey : $scope.dataModel.currentGroupKey,
        				region :'',
        				busFunckey :'',
        				configType :'PROJECT_CLOSE_ENABLED',
        				busFuncDetailKey:'',
        				userId : $scope.dataModel.loginUserId,
        				roleCode : $scope.dataModel.currentRole,
        				configValue :'TRUE',
        				vendorKey : '',
        				userKey : $scope.dataModel.loginUserKey,
        				matchType : 'WHOLE'
        			}
	          return $http.post('/gcm-app-services/masterdata/isBusFuncConfigured',gcmConfigInput).then(function(response) {
		          if(response.data.status == "SUCCESS"){
		        	  if(response.data.result && response.data.result.length > 0){
		        		  lookupService.filters.serviceConfigRegionList = response.data.result;
		        		  $scope.isSvcConfigured = true;
		        	  }else{
		        		  $scope.isSvcConfigured = false;
		        	  }
			          
		              if($scope.isSvcConfigured){
			              $scope.utilitiesTabsModel.tabs=[searchTab, dataIntakeTab,projCloseTab];
		              }else{
		            	  $scope.utilitiesTabsModel.tabs = [searchTab, dataIntakeTab]
		              }
		          }else{
		        	  $scope.utilitiesTabsModel.tabs = [searchTab, dataIntakeTab, projCloseTab];
		          }
		          });	
	          }
          $scope.isServiceConfigured();
          
          
          });
