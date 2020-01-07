var apptDate;
var apptTime;
schedulerworklistmodule.controller("myAppointmentsController", function($scope, $compile, $timeout, $http, $filter,myAppointmentsTableModel, dataServiceModel,lookupService,staticDataService) {
	$scope.dataModel = dataServiceModel;
	$scope.dataModel.selectedMyApptId = "";
	$scope.dataModel.myAppointmentsModel = myAppointmentsTableModel;
	$scope.dataModel.showFiltersLoadingDialog = false;
	lookupService.filters.currentTab='myAppTab';
	
	if(lookupService.clearApptFilters){
		lookupService.clear();
		lookupService.filter();
		lookupService.clearApptFilters = false;
	}
	
	var readProviderDetailsByAppointmentId = function()
	{
		var schedulingSearchFilter = {
			busSegment : lookupService.filters.busSegment,
			projectName : lookupService.filters.program,
			clientKey : lookupService.filters.client,
			hpKey : lookupService.filters.hp,
			hpProduct : lookupService.filters.hpp,
			isAssigned : '1',
			providerId : lookupService.filters.provId,
			provGroupName : lookupService.filters.provgrpNm,
			provLastName : lookupService.filters.provLastNm,
			provFirstName : lookupService.filters.provFstNm,
			fromUserKey : lookupService.filters.user,
			loginUserKey : $scope.dataModel.loginUserKey,
			appointmentId : $scope.dataModel.selectedMyApptId,
			vendorKey	: $scope.dataModel.vendorKey
		};
		
		$http.post('/gcm-app-services/scheduling/workflow/getProviderDetailsByApptId', schedulingSearchFilter).then(function(response) {
			if(response && response.data && response.data.result && response.data.result.length > 0){
				$scope.dataModel.providerRecords = response.data.result;
				var selectedRecords = [];
				for(var i =0; i < $scope.dataModel.providerRecords.length; i++)
				{
					if($scope.dataModel.providerRecords[i].providerSelected == "Y"){
						$scope.dataModel.providerRecords[i].selected = true;
						selectedRecords.push($scope.dataModel.providerRecords[i]);
					}else{
						$scope.dataModel.providerRecords[i].selected = false;
					}
				}
				$scope.dataModel.selectedProviderRecords = selectedRecords;
				$scope.dataModel.showWorklist = false;
				$scope.dataModel.showViewAppt = false;
			}else{
				$scope.dataModel.providerRecords = [];
			}
			$scope.dataModel.readChartStatusDetails();
		}, function(error) {
			var errorMessage = JSON.stringify(error);
			$scope.dataModel.setMessage(errorMessage, "error");
		});
	}
	
	myAppointmentsTableModel.onExport = function(filterCondition, initiateExport) {
				$scope.dataModel.clearBanners();
				$scope.initiateExport = initiateExport;

				staticDataService.query(filterCondition, $scope.dataModel.myAppointmentsModel.originalRecords, function(result) {
					$scope.initiateExport(result, lookupService.filters.currentTab);
				});
			};
	myAppointmentsTableModel.modifyAppointment=function(){
		if($scope.dataModel.selectedMyApptId){
			$scope.dataModel.workListWarningMessageModel.visible=false;
			$scope.dataModel.apptCommentsList = [];
			$scope.dataModel.isFromModifyApptmnt = true;
			$scope.dataModel.wizardModel.nextButton.disabled = false;
			$scope.dataModel.wizardModel.currentStep = 1;			
			readProviderDetailsByAppointmentId();
			$scope.dataModel.readRetProviderDetails();
			$scope.dataModel.readApptComments();
		}
		else{
			var errorMessage = "select appointment to modify";
			$scope.dataModel.setMessage(errorMessage, "error");
		}
	}
	$scope.dataModel.selectedApptChange = function(record){
		$scope.dataModel.modifyAppId = record.apptId;
	}
	
	myAppointmentsTableModel.cancelAppointment=function(){
		$scope.dataModel.clearBanners();
		if(!$scope.dataModel.selectedAppt || !$scope.dataModel.selectedAppt.apptStatus){
			var errorMessage = "Select appointment to Cancel";
			$scope.dataModel.setMessage(errorMessage, "error");
			return;
		}
		var apptStatus = $scope.dataModel.selectedAppt.apptStatus;
		if(apptStatus == "SCHEDULED" || apptStatus == "PASTDUE"){
			$scope.dataModel.showCancelApptDialog = !$scope.dataModel.showCancelApptDialog; 
		}else if(apptStatus == "INPROGRESS"){
			var errorMessage = "This appointment status is ‘In Progress’. Cancel Appointment is not a valid action.";
			$scope.dataModel.setMessage(errorMessage, "error");
		}
		else{
			var errorMessage = "Cancel Appointment is not allowed on appointment with "+apptStatus+" Status";
			$scope.dataModel.setMessage(errorMessage, "error");			
		}
	}
	
	$scope.dataModel.handleCancelAppointment = function(isFromAddToExistingAppt){
		$scope.cancelApptInput = {
			"retStatus" 		: "",
			"requestedUserId"	: $scope.dataModel.loginUserId,
			"retMethod"			: "",
			"chartIdList"		: [],
			"chartIdExclList"	: [],
			"loginUserKey"		: $scope.dataModel.loginUserKey,
			"assignInventorySearchFilter" : [],
			"appt" 				: {
					apptKey	:	$scope.dataModel.selectedMyApptId
			}
		}
		$scope.dataModel.showFiltersLoadingDialog = true;
		$http.post('/gcm-app-services/scheduling/workflow/cancelAppointment', $scope.cancelApptInput).then(function(response) {	
			$scope.dataModel.showFiltersLoadingDialog = false;
			var message = '';
			var messageType = '';
			if(!isFromAddToExistingAppt){
				message = "Appointment cancelled and members returned to your Worklist.";
				messageType = "success";
			}
			else{
				$scope.dataModel.clearWizardData();
			}
			lookupService.filter(message, messageType);
			myAppointmentsTableModel.selectedRecords = [];
			myAppointmentsTableModel.selectedRecordCount = 0;
		}, function(error) {
			$scope.dataModel.showFiltersLoadingDialog = false;
			var errorMessage = JSON.stringify(error);
			if(!isFromAddToExistingAppt){
				$scope.dataModel.setMessage("Cancel Appointment failed.", "error");
			}else{
				$scope.dataModel.setMessage(errorMessage, "error");
			}
			
			return false;
		});
	}
	
	myAppointmentsTableModel.changeAppointment = function(){
		$scope.dataModel.clearBanners();
		if(!$scope.dataModel.selectedAppt || !$scope.dataModel.selectedAppt.apptStatus){
			var errorMessage = "Select appointment to change Date or Time";
			$scope.dataModel.setMessage(errorMessage, "error");
			return;
		}
		var apptStatus = $scope.dataModel.selectedAppt.apptStatus;
		$scope.dataModel.selectedMyApptId = $scope.dataModel.selectedAppt.apptId;
		if($scope.dataModel.selectedMyApptId && (apptStatus == "SCHEDULED" || apptStatus == "PASTDUE")){
			$scope.dataModel.showChangeApptDtTimeDialog = !$scope.dataModel.showChangeApptDtTimeDialog;
			$scope.dataModel.readRetProviderDetails();
		}else if($scope.dataModel.selectedMyApptId && (apptStatus == "INPROGRESS")){
			var errorMessage = "This appointment status is ‘In Progress’.  Change Appointment Date / Time is not a valid action.";
			$scope.dataModel.setMessage(errorMessage, "error");
		}
		else{
			var errorMessage = "Change Appointment Date/Time Not allowed on "+ apptStatus + " appointment";
			$scope.dataModel.setMessage(errorMessage, "error");
		}
	}
	
	myAppointmentsTableModel.viewAppointment = function(appointment){
		$scope.dataModel.clearBanners();
		$scope.dataModel.showWorklist = false;
		$scope.dataModel.workListWarningMessageModel.visible=false;
		$scope.dataModel.selectedMyApptId =  appointment.apptId;
		$scope.dataModel.selectedApptType =  appointment.apptType;
		$scope.dataModel.showViewAppt = true;
		$scope.dataModel.readRetProviderDetails();
		$scope.dataModel.readChartStatusDetails();
		$scope.dataModel.readApptComments();
	}
	
	
	function validateAppointmentTimings (apptDate, apptTime){
		if(!$scope.dataModel.apontmntDate)
		{
			var errorMessage = "Date Required";
			$scope.dataModel.changeDataTimeMessageModel.content = '<span>'+errorMessage+'</span>';
			$scope.dataModel.changeDataTimeMessageModel.visible = true;
			return false;
		}
		if(!$scope.dataModel.apontmntTime)
		{
			var errorMessage = "Time Required";
			$scope.dataModel.changeDataTimeMessageModel.content = '<span>'+errorMessage+'</span>';
			$scope.dataModel.changeDataTimeMessageModel.visible = true;
			return false;
		}
		if ($scope.dataModel.apontmntDate || $scope.dataModel.apontmntTime) {
			var dateFlag = $scope.dataModel.apontmntDate >= new Date();
			if (dateFlag) {
				var apontmntDate = $filter('date')($scope.dataModel.apontmntDateViewModel.dateText, "MM-dd-yyyy"); 
				var apontmntDatePattern = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/ 
				var apontmntDateRegEx = new RegExp(apontmntDatePattern);
				var apontmntDateFlag = apontmntDateRegEx.test(apontmntDate);
				var month = apontmntDate.split('-')[0];
				var day = apontmntDate.split('-')[1];
				var year = apontmntDate.split('-')[2];
				if(!apontmntDateFlag || !isValidDate(year, month, day))
				{
					var errorMessage ="Date Not Valid";
					$scope.dataModel.changeDataTimeMessageModel.content = '<span>'+errorMessage+'</span>';
					$scope.dataModel.changeDataTimeMessageModel.visible = true;
					return false;
				}
				var apontmntTimePattern = /^(0?[1-9]|1[012])(:[0-5]\d)$/;
				var apontmntTimeRegEx = new RegExp(apontmntTimePattern);
				var apontmntTimeFlag = apontmntTimeRegEx.test($scope.dataModel.apontmntTime);
				if(!apontmntTimeFlag)
				{
					var errorMessage ="Time Not Valid";
					$scope.dataModel.changeDataTimeMessageModel.content = '<span>'+errorMessage+'</span>';
					$scope.dataModel.changeDataTimeMessageModel.visible = true;
					return false;
				}
				return true;
			}
			else {
				var errorMessage ="Date Not Valid";
				$scope.dataModel.changeDataTimeMessageModel.content = '<span>'+errorMessage+'</span>';
				$scope.dataModel.changeDataTimeMessageModel.visible = true;
				return false;
			}
		}
		return true;
	}

	function isValidDate(year, month, day)
	{
		year = parseInt(year);
		if (day == 31 && (month == 4 || month == 6 || month == 9 || month == 11))
		{
			return false; // 31st of a month with 30 days
		}
			else if (day >= 30 && month == 2)
		{
				return false; // February 30th or 31st
		}
		else if (month == 2 && day == 29 && !(year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)))
		{
			return false; // February 29th outside a leap year
		}
		else
		{
			return true; // Valid date
		}
	}
	
	$scope.dataModel.handleChangeApptDateTime = function(){
		var dateToStore = $scope.dataModel.apontmntDate;
		var hrMntArray = [];
		var appointmentTime =  $scope.dataModel.apontmntTime;
		if(validateAppointmentTimings(dateToStore, appointmentTime)){			
			if(appointmentTime)
			{
				hrMntArray = appointmentTime.split(":");
			}
			if(hrMntArray.length > 1){
				var hrs = hrMntArray[0];
				hrs = parseInt(hrs);
				if($scope.dataModel.amPMType && $scope.dataModel.amPMType.index == 1){
					
					if(hrs < 12){
						hrs = hrs+12;
					}
					dateToStore.setHours(hrs);
				}
				else{
					if(hrs == 12){
						dateToStore.setHours('00');
					}
					else{
						dateToStore.setHours(hrMntArray[0]);
					}
					
				}
				dateToStore.setMinutes(hrMntArray[1]);
			}
			var dateToStoreString = $scope.dataModel.apontmntDateViewModel.dateText + " "+dateToStore.getHours()+":"+dateToStore.getMinutes()+":"+"00";
				
			$scope.changeAppDateInput = {
				"retStatus" 		: "",
				"requestedUserId"	: $scope.dataModel.loginUserId,
				"retMethod"			: "",
				"chartIdList"		: [],
				"chartIdExclList"	: [],
				"loginUserKey"		: $scope.dataModel.loginUserKey,
				"assignInventorySearchFilter" : [],
				"appt" 				: {
						apptKey		: $scope.dataModel.selectedMyApptId,
						uiApptDate	: dateToStoreString,
						apptStatus : "SCHEDULED"
				}
			}
			$scope.dataModel.showFiltersLoadingDialog = true;
			$http.post('/gcm-app-services/scheduling/workflow/changeApptDateTime', $scope.changeAppDateInput).then(function(response) {
				$scope.dataModel.showFiltersLoadingDialog = false; 
				$scope.dataModel.showChangeApptDtTimeDialog = !$scope.dataModel.showChangeApptDtTimeDialog;
				var message = "Appointment Date/Time has been changed";
				//$scope.dataModel.setMessage(message, "success");
				lookupService.filter(message, "success");
				myAppointmentsTableModel.selectedRecords = [];
				myAppointmentsTableModel.selectedRecordCount = 0;			
			}, function(error) {
				$scope.dataModel.showFiltersLoadingDialog = false;
				var errorMessage = JSON.stringify(error);
				$scope.dataModel.setMessage(errorMessage, "error");
				return false;
			});
		}
	}
});

window.closeChangeAppointmentDialog = function(apptDate, apptTime){
	if(validateAppointmentTimings (apptDate, apptTime)){
		document.getElementById('changeApptDtTimeDialog_closeLink').click();
	}
}

schedulerworklistmodule.factory("myAppointmentsTableModel", function(dataServiceModel,staticDataService) {	
	return {
	links : [
				'<a href="" ng-click="model.changeAppointment()"><uitk:icon-font icon="cux-icon-calendar"></uitk:icon-font> Change Appointment Date/Time</a>',				
								'<a href="" ng-click="model.cancelAppointment()"><uitk:icon-font icon="cux-icon-remove"></uitk:icon-font> Cancel Appointment</a>',
'<a href="" ng-click="model.modifyAppointment()"><uitk:icon-font icon="cux-icon-edit"></uitk:icon-font> Modify Appointment</a>'								],
		pagination : {
			currentPageNumber : 1,
			paginationWindow : 5,
			recordsPerPage : 10,
			recordsPerPageChoices : [ 10, 15, 25]
		},
		columns : [ 
				{
                    columnId:'radio',
                    sortOrder:0,
                    sortable:false,
					style : "width: 3%;",
                    layoutOrder:1,
                    enableSearch : false,
                    cellTemplate:'<input type="radio" id="{{record.index}}" name="myAppRadio" ng-click="model.onRowSelect($event,record)"/>',
                    excludeFromExport:true
                },
				{
					columnId : 'apptStatus',
					label : 'Status',
					layoutOrder : 2,
					resizable : false,
					sortOrder : 1,
					sortable : true,
					style : "width: 10%;",
					cellTemplate : "<img style='float:left; margin-right:5px;' ng-src='../../comm/lib/images/failure_user.png' ng-if=\"record.apptStatus == 'PASTDUE'\"/>"
								   +"<img style='float:left; margin-right:5px;' ng-src='../../comm/lib/images/success_user.png' ng-if=\"record.apptStatus == 'INPROGRESS'\"/>"
								   +"<span class='cux-icon-warning' ng-if=\"record.apptStatus == 'PEND RELEASED'\"></span>"
								   +"<span ng-bind='::record.apptStatus'> </span>"
				}, {
					columnId : 'createDateTime',
					label : 'Date Created',
					layoutOrder : 3,
					style : "width: 9%;",
					resizable : false,
					sortOrder : 0,
					sortable : true,
					cellTemplate : "<span ng-bind='::record.createDateTime | date : \"MM-dd-yyyy\"'> </span>"
				}, {
					columnId : 'chartNotRecvdCnt',
					label : 'Charts Not Received',
					layoutOrder : 4,
					style : "width: 8%;",
					resizable : false,
					sortOrder : 0,
					sortable : true,
					cellTemplate : '<span ng-bind="::record.chartNotRecvdCnt"> </span>'
				}, {
					columnId : 'totalCnt',
					label : 'Total Charts',
					layoutOrder : 5,
					resizable : false,
					sortOrder : 0,
					sortable : true,
					cellTemplate : '<span ng-bind="::record.totalCnt"> </span>'
				}, {
					columnId : 'apptId',
					label : 'Appointment ID',
					layoutOrder : 6,
					resizable : false,
					sortOrder : 0,
					sortable : true,
					cellTemplate : '<a ng-if="record.apptStatus==\'SCHEDULED\'  || record.apptStatus == \'PASTDUE\'" href="" ng-click="model.viewAppointment(record)"><span ng-bind="::record.apptId"> </span></a><span ng-if="record.apptStatus != \'SCHEDULED\' && record.apptStatus != \'PASTDUE\'" ng-bind="::record.apptId"> </span>'
				}, {
					columnId : 'apptDate',
					label : 'Appointment Date',
					layoutOrder : 7,
					resizable : false,
					sortOrder : 0,
					sortable : true,
					cellTemplate : '<span ng-bind="::record.apptDate"></span>'
				}, {
					columnId : 'provGroupName',
					label : 'Group Name',
					layoutOrder : 8,
					resizable : false,
					sortOrder : 0,
					sortable : true,
					cellTemplate : '<span ng-bind="::record.provGroupName"> </span>'
				}, {
					columnId : 'provName',
					label : 'Provider Name',
					layoutOrder : 9,
					resizable : false,
					sortOrder : 0,
					sortable : true,
					cellTemplate : '<span style="text-transform:capitalize" ng-bind="::record.provName"> </span>'
				}, {
					columnId : 'provLocation',
					label : 'Location',
					layoutOrder : 10,
					resizable : false,
					sortOrder : 0,
					sortable : true,
					cellTemplate : '<span ng-bind="::record.provLocation"> </span>'
				}, {
					columnId : 'faxStatus',
					label : 'Fax Status',
					layoutOrder : 11,
					resizable : false,
					sortOrder : 0,
					sortable : true,
					cellTemplate : '<span ng-bind="::record.faxStatus"> </span>'
				} 
		],
		records : [],
		totalRecordsCount : 0,
		selectedRecordCount : 0,
		selectedRecords : [],
		onRowSelect:function(event, record){
			
			dataServiceModel.selectedMyApptId = record.apptId;
			dataServiceModel.selectedAppt = record;
		},
		onChange : function(filterCondition){
			var that = this;
			
			staticDataService.query(filterCondition, that.originalRecords, function(result) {
				that.records = result.records;
				that.totalRecordsCount = result.totalRecordsCount;

				// Add this code snippet for Select All Functionality
				var allSelected = true;
				for(var rowIndex = 0; rowIndex < that.records.length; rowIndex++) {
					if(!(that.records[rowIndex].selected)) {
						allSelected = false;
						break;
					}
				}
				if(that.records.length > 0)
					that.selectAllChecked = allSelected;
			});
		}
	}
});