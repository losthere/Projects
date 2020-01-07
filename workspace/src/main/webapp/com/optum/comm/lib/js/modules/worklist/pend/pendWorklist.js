angular.module("pendWorklistApp",[ 'looup-data', 'uitk.component.uitkDynamicTable', 'uitk.component.uitkIconFont', 'ngSanitize', 'uitk.component.uitkMessage',
	'staticDataService', 'pendWorklistViewModel', 'uitk.component.uitkPanel','uitk.component.uitkDialog','uitk.component.uitkButton','uitk.component.tabs','uitk.component.uitkLabel',	'uitk.component.uitkTextarea','uitk.component.uitkTextField']).factory("dataServiceModel", function() {
	var dataObj = {
	};
	
	return dataObj;
	
}).factory('errorMessageModel', function() {
	return {
		id : 'Error',
		messageType : 'error',
		content : '',
		visible : false,
		headingLevel : '2',
		closeButton : true,
		messageVisibleTime : '5000'
	}
}).controller('pendWorklistCtrl',function($scope, $compile, $timeout, $http, lookupService, errorMessageModel,dataServiceModel,staticDataService) {
		$scope.dataModel=dataServiceModel;
		$scope.dataModel.showPendFiltersLoadingDialog = false;
		dataServiceModel.isWorklist=true;
		$scope.dataModel.retrievalRecords=[];
		$scope.dataModel.isWorklist=dataServiceModel.isWorklist;
		$scope.dataModel.appointmentId=0;
		$scope.dataModel.showFlag=true;
		$scope.dataModel.loginUserKey =  optumUI.getUser().getLoggedInUserKey();
		$scope.dataModel.currentGroupKey= optumUI.getUser().getCurrentGroupKey();
		$scope.dataModel.requestedUserId =  optumUI.getAuthUser(); 
				
		$scope.errorMessageModel = errorMessageModel;
		lookupService.filters.currentTab = 'pendMyWorklist';		
		$scope.pendWorklistFilters = {
				id : 'worklistFilterPanel',
				title : 'Filters',
				templateUrl : '../../retrieval/assignment/filters.html',
				open : true,
				collapsible : true
		};
		
$scope.chartStatusModel = {
		id : 'chartStatusPanel',
		title : 'Chart Status',
		titleH3 : true,
		templateUrl : '../../retrieval/scheduling/views/chartstatus.htm',
		open : false,
		lazyLoad : false,
		collapsible : true
	}
	
		$scope.dataModel.readRetProviderDetails = function(){
		var gcmRetAppointment = {
			apptKey : $scope.dataModel.appointmentId
		}
		$http.post('/gcm-app-services/scheduling/workflow/getApptDetailsByApptId', gcmRetAppointment).then(function(response) {
			if(response && response.data && response.data.result){
				$scope.retrievalPreference = response.data.result.apptType;
				$scope.dataModel.retrvlPrefSelect = response.data.result.apptType;
				$scope.dataModel.name = (response.data.result.lastName ? response.data.result.lastName +", ": '')
										+(response.data.result.firstName?response.data.result.firstName:'');
				$scope.dataModel.location = (response.data.result.address1 ? response.data.result.address1+',' : '')+
										   (response.data.result.address2 ? response.data.result.address2+',' : '')
										   +(response.data.result.city ? response.data.result.city+',': '')
										   + (response.data.result.state ? response.data.result.state+',' : '')
										   +(response.data.result.zip ? response.data.result.zip : '')	;
				$scope.dataModel.location =$scope.dataModel.location =="null,"?'':$scope.dataModel.location;
				$scope.dataModel.phonenumber = response.data.result.phoneNum;
				$scope.dataModel.fax = response.data.result.faxNum;
				$scope.dataModel.email = response.data.result.email;
				$scope.dataModel.apptDate = response.data.result.uiApptDate;
				
				$scope.dataModel.apptStatus =  response.data.result.apptStatus;
				$scope.dataModel.faxStatus = response.data.result.faxStatus;
				$scope.dataModel.gcmUserKey = ""+response.data.result.gcmUserKey;
				$scope.dataModel.pendAttempts =response.data.result.noOfPendAttempts? response.data.result.noOfPendAttempts : 0;
				$scope.dataModel=dataServiceModel;
				$scope.dataModel.readChartMemberDetailsApptId();
				setAppointmentDate();
			}
		},function(error) {
			var message = JSON.stringify(error);
			$scope.dataModel.setMessage(message, "error");
		});
	}
	function setAppointmentDate()
	{
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
				}
				if(apptTime!=""){
				if(hrs <= 12 ){
					$scope.dataModel.apptTime = apptTime+" AM";
				}else{
					hrs = hrs - 12;
					$scope.dataModel.apptTime = hrs+":"+mnts +" PM";
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
	}
	$scope.dataModel.readApptComments = function(){
		$scope.dataModel.apptCommentsList  = [];
		$http.post('/gcm-app-services/scheduling/workflow/getApptComments', $scope.dataModel.appointmentId).then(function(response) {
			if (response && response.data && response.data.result) {
				$scope.dataModel.apptCommentsList  = response.data.result;
			}
		}, function(error) {
			var message = JSON.stringify(error);
			$scope.dataModel.setMessage(message, "error");
		});
		
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
				$scope.dataModel.readRetProviderDetails();
		}, function(error) {
			var message = JSON.stringify(error);
			$scope.dataModel.setMessage(message, "error");
		});
	
	}
	$scope.dataModel.readChartStatusDetails = function(){
		var unscheduledCnt = 0;
		var receivedCnt = 0;
		var scheduledCnt = 0;
		var nonRetrievableCnt = 0;
		var chartStatusFilter = {
					appointmentId	:$scope.dataModel.appointmentId,
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
					groupKey	: $scope.dataModel.currentGroupKey ? $scope.dataModel.currentGroupKey : 3
					
				}
				$http.post('/gcm-app-services/scheduling/workflow/getChartStatusCountByUser', chartStatusFilter).then(function(response) {
					if (response && response.data && response.data.result && response.data.result.length > 0) {
						scheduledCnt = response.data.result[0].scheduledCnt ? response.data.result[0].scheduledCnt : 0;
						receivedCnt = response.data.result[0].receivedCnt ? response.data.result[0].receivedCnt : 0;
						unscheduledCnt = response.data.result[0].unscheduledCnt ? response.data.result[0].unscheduledCnt : 0;
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
				});
	}
	
	
	$scope.dataModel.readChartMemberDetailsApptId = function(){
			$scope.SchedulingSearchFilter = 
			{
				appointmentId : $scope.dataModel.appointmentId,
				loginUserKey : $scope.dataModel.gcmUserKey,
				roleCode : 'PDM',
				noOfPendAttempts : $scope.dataModel.pendAttempts
			}
			var retDataSearchFilter = {
								"assignInventorySearchFilter": [],
								"schedulingSearchFilter" : $scope.SchedulingSearchFilter
							  };
		$http.post('/gcm-app-services/scheduling/workflow/getChartMemberDetailsByApptId', retDataSearchFilter).then(function(response) {
			$scope.dataModel.retrievalRecords=[];
			if(response && response.data && response.data.result){
			$scope.dataModel.isWorklist=false;
				for(var i=0;i<response.data.result.length;i++){
					if(response.data.result[i].busFuncStatus!="NONRETRIEVABLE")
						response.data.result[i].busFuncStatus="PEND RELEASED";
				}
				
					$scope.dataModel.retrievalRecords=[];
					$scope.dataModel.retrievalRecords = response.data.result;
					if($scope.dataModel.retrievalInfoTableModel)
						$scope.dataModel.retrievalInfoTableModel.records = response.data.result;
			}
		}, function(error) {
			var errorMessage = JSON.stringify(error);
			$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
			$scope.errorMessageModel.visible = true;
			$scope.errorMessageModel.messageType='error';
			$scope.errorMessageModel.messageVisibleTime = 5000;
		});
	//	$scope.dataModel.isWorklist=false;
	}
	
	$scope.faxStatusModel = {
		id : 'faxtStatuspanel',
		title : 'Fax Status',
		titleH3 : true,
		templateUrl : '../../retrieval/scheduling/views/faxstatus.htm',
		open : false,
		lazyLoad : false,
		collapsible : true
	}
	$scope.commentHistoryModel = {
		id : 'commentHistoryPanel',
		title : 'Comments History',
		titleH3 : true,
		templateUrl : '../../retrieval/scheduling/views/commentshistory.htm',
		open : false,
		lazyLoad : false,
		collapsible : true
	}
	
	$scope.retrievalInfoModel = {
		id : 'retrievalInfoId',
		titleH3 : true,
		templateUrl : 'retrievalinfo.htm',
		open : true,
		lazyLoad : false,
		collapsible : false
	}
	
		$scope.pendWorklistTabsModel = {
				selectedIndex : 0,
				id : 'pendWorklistTabs',
				ariaLabel : 'Worklist',
				eventsEnable : true,
				tabs : [ {
					title : 'My Worklist',
					templateurl : 'myworklist.html',
					callback : function(event, tabData) {
						lookupService.filters.currentTab = 'pendMyWorklist';
					}
				}, {
					title : 'Available Work Items',
					templateurl : 'availableworkitems.html',
					callback : function(event, tabData) {
						lookupService.filters.currentTab = 'pendAvailableWorkItems';
					}
				} ]
		};
	}).controller('myWorklistCtrl',function($scope, $compile, $timeout, $http, lookupService, errorMessageModel, 
		staticDataService, myWorklistViewModel,dataServiceModel) {
		$scope.dataModel=dataServiceModel;
		$scope.dataModel.showPendFiltersLoadingDialog = false;
		var searchResults = [];
		var apptIds = [];
		var selectedChartIds = [];
		
		$scope.showPendMyWorklistLoadingDialog = false;
		$scope.errorMessageModel = errorMessageModel;
		$scope.worklistViewModel = myWorklistViewModel;
		$scope.worklistViewModel.viewAppointment= function(record){
		$scope.dataModel.appointmentId=record.apptId;
		$scope.dataModel.getUsersByRoleCode();
		$scope.dataModel.readChartStatusDetails();
		$scope.dataModel.readApptComments();
		
		}
		$scope.worklistViewModel.releaseToAvailableItems = function() {
			$scope.errorMessageModel.visible = false;
			if (apptIds.length === 0) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Select atleast one record for releasing to assignment.</span>';
				$scope.errorMessageModel.visible = true;
				$scope.errorMessageModel.messageVisibleTime = 5000;
				return;
			}
			var obj = {
					gcmRetApptIds : apptIds,
					pendMgrUserKey : "",
					loginUserKey : $scope.dataModel.loginUserKey,
					requestedUser : $scope.dataModel.requestedUserId
			};
			$scope.showPendMyWorklistLoadingDialog = true;
			$http.post('/gcm-app-services/pendmgmt/worklist/updatePendWorkList', obj).then(function(response) {
				$scope.showPendMyWorklistLoadingDialog = false;
				if(response.data.status=="SUCCESS"){
				lookupService.filter();
				$scope.errorMessageModel.messageType = 'success';
				$scope.errorMessageModel.content = '<span>Appointments are released to available worklist.</span>';
				apptIds=[];
				}
				else
				{					
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>Release to available worklist failed.</span>';
				}
				$scope.errorMessageModel.visible = true;
				$scope.errorMessageModel.messageVisibleTime = 5000;
			});
		}

		$scope.worklistViewModel.onExport = function(filterCondition, initiateExport) {
			$scope.errorMessageModel.visible = false;
			$scope.initiateExport = initiateExport;

			staticDataService.query(filterCondition, searchResults, function(result) {
				$scope.initiateExport(result, 'My Worklist');
			});
		};

		$scope.worklistViewModel.onSelectAllRows = function(selectAll) {
			var model = this;
			var availableRecords = model.records.slice();

			var selectedRecordIds = [];
		apptIds = [];
			for (var i = 0; i < model.selectedRecords.length; i++){
				selectedRecordIds.push(model.selectedRecords[i].uniqueIndex);
				apptIds.push(model.selectedRecords[i].apptId);
}
			for (var row = 0; row < availableRecords.length; row++) {
				var recordIndex = selectedRecordIds.indexOf(availableRecords[row].uniqueIndex);
				if (selectAll) {
					availableRecords[row].selected = true;
					if (recordIndex < 0){
						model.selectedRecords.push(availableRecords[row]);
						apptIds.push(availableRecords[row].apptId);
						}
				} else {
					if (availableRecords[row].selected) {
						model.selectedRecords.splice(recordIndex, 1);
						apptIds.splice(recordIndex, 1);
						selectedRecordIds.splice(recordIndex, 1);
						availableRecords[row].selected = false;
					}
				}
			}
			this.selectedRecordCount = this.selectedRecords.length;
			if(this.selectedRecordCount > 1){
				$scope.worklistViewModel.multiSelectUpdate = false;
			} else {
				$scope.worklistViewModel.multiSelectUpdate = true;
			}
		}

		myWorklistViewModel.onRowSelect = function(event, record, selected) {
			var model = this;
			if (typeof selected === 'undefined') {
				if (typeof event !== 'undefined' && (event.target.tagName === 'A' || event.target.tagName === 'INPUT'))
					return;
				if (typeof event === 'undefined' || event.target.tagName === 'SELECT' || event.target.tagName === 'OPTION') {
					if (record.userKey === '' || record.userKey === null) {
						return;
					} else {
						record.selected = true;
						selected = true;
					}
				} else {
					record.selected = !record.selected;
					selected = record.selected;
				}
			}
			
			if (!selected && model.selectAllChecked)
				model.selectAllChecked = false;


			var recordIndex = -1;
			for (var i = 0; i < model.selectedRecords.length; i++) {
				if (model.selectedRecords[i].uniqueIndex === record.uniqueIndex)
					recordIndex = i;
			}

			if (selected) {
				if (recordIndex < 0){
					model.selectedRecords.push(record);
					apptIds.push(record.apptId);}
			} else {
				model.selectedRecords.splice(recordIndex, 1);
				apptIds.splice(recordIndex, 1);
			}

			var availableRecords = model.records;
			var allSelected = true;

			for (var i = 0; i < availableRecords.length; i++) {
				if (!availableRecords[i].selected) {
					allSelected = false;
					break;
				}
			}
			if(availableRecords.length > 0)
				model.selectAllChecked = allSelected;
			
			this.selectedRecordCount = this.selectedRecords.length;
			if(this.selectedRecordCount > 1){
				$scope.myWorklistViewModel.multiSelectUpdate = false;
			} else {
				$scope.myWorklistViewModel.multiSelectUpdate = true;
			}
		}

		$scope.worklistViewModel.onChange = function(filterCondition) {
			var that = this;
			staticDataService.query(filterCondition, searchResults, function(result) {
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
		};

		function clearTableData() {
			searchResults = [];
			$scope.worklistViewModel.records = [];
			$scope.worklistViewModel.totalRecordsCount = 0;
			$scope.worklistViewModel.selectedRecords = [];
			$scope.worklistViewModel.selectedRecordCount = 0;
			$scope.worklistViewModel.pagination.currentPageNumber = 1;
			$scope.worklistViewModel.pagination.currentPageNumberInView = 1;
			$scope.worklistViewModel.pagination.pageNumberError = false;
			$scope.worklistViewModel.selectAllChecked = false;
			clearSort();
		}

		function clearSort(){
			angular.forEach($scope.worklistViewModel.columns,function(col){
				col.sortOrder = 0;
			});

			$scope.worklistViewModel.columns[2].sortOrder = 1;
		}

		lookupService.filter = function() {
			clearTableData();
			$scope.errorMessageModel.visible = false;
			var obj = {
					loginUserKey : $scope.dataModel.loginUserKey,
					isAssigned : 1,
					appointmentId : lookupService.filters.apptId,
					busSegment : lookupService.filters.busSegment,
					projectKey : lookupService.filters.projectKey,
					clientKey : lookupService.filters.client,
					hpKey : lookupService.filters.hp,
					hpProduct : lookupService.filters.hpp,
					providerId : lookupService.filters.provId,
					provGroupName : lookupService.filters.provgrpNm.toUpperCase(),
					provLastName : lookupService.filters.provLastNm.toUpperCase(),
					provFirstName : lookupService.filters.provFstNm.toUpperCase(),
					fromUserKey : $scope.dataModel.loginUserKey,
					isCompleted : '0'
			};		
			$scope.dataModel.showPendFiltersLoadingDialog = true;
			$http.post('/gcm-app-services/pendmgmt/worklist/getUnassignedInventoryforPendMgmt', obj).then(function(respose) {
				$scope.dataModel.showPendFiltersLoadingDialog = false;
				if(respose.data.result){
				searchResults = respose.data.result;
				angular.forEach(searchResults, function(obj, idx) {
					obj.uniqueIndex = idx + 1;
				});
				$scope.worklistViewModel.records = searchResults;
				$scope.worklistViewModel.totalRecordsCount = searchResults.length;
				$scope.worklistViewModel.columns[2].sortOrder = 1;
				$scope.worklistViewModel.onLoad(true);
				}
			}, function(error) {
				$scope.dataModel.showPendFiltersLoadingDialog = false;
			});
			

		};
	
	$scope.worklistViewModel.clearAll = function(){
			angular.forEach($scope.worklistViewModel.selectedRecords, function (obj, idx) {
				if (obj.selected == true) {
					selectedChartIds.push(obj);
					obj.selected = false;
				}
			});
			apptIds = [];
			if (selectedChartIds.length > 0) {
				$scope.selected = false;
				$scope.worklistViewModel.selectedRecords = [];
				$scope.worklistViewModel.selectedRecordCount = 0;
				$scope.worklistViewModel.selectAllChecked = false;
			}
			$scope.errorMessageModel.visible = false;
		};
		lookupService.clear = function() {

			lookupService.filters.busSegment = '';
			lookupService.filters.projectKey = '';
			lookupService.filters.client = '';
			lookupService.filters.hp = '';
			lookupService.filters.hpp = '';
			lookupService.filters.provId = '';
			lookupService.filters.provLastNm = '';
			lookupService.filters.provFstNm = '';
			lookupService.filters.provgrpNm = '';
			lookupService.filters.apptId = '';
			lookupService.filters.user = '';
			lookupService.filters.status = '';
			clearTableData();
			$scope.errorMessageModel.visible = false;
			
		}
		
		lookupService.clear();
		lookupService.filter();

	}).controller('availableWorkItemsCtrl',function($scope, $compile, $timeout, $http, lookupService, errorMessageModel, 
			staticDataService,dataServiceModel, availableWorkItemsViewModel) {

		$scope.dataModel=dataServiceModel;
		$scope.dataModel.showPendFiltersLoadingDialog = false;
		var searchResults = [];
		var apptIds = [];
		var selectedChartIds = [];

		$scope.errorMessageModel = errorMessageModel;
		$scope.worklistViewModel = availableWorkItemsViewModel;
		
		lookupService.filter = function() {
		clearTableData();
		
			
		$scope.errorMessageModel.visible = false;
		if(lookupService.filters.status ==1 && (lookupService.filters.user=='' || lookupService.filters.user ==undefined)){
		$scope.errorMessageModel.messageType = 'error';
		$scope.errorMessageModel.content = '<span>User is mandatory.</span>';
		$scope.errorMessageModel.visible= true;
		return;
		}
			var obj = {
					loginUserKey : $scope.dataModel.loginUserKey,
					isAssigned : lookupService.filters.status ? lookupService.filters.status : 0,
					appointmentId : lookupService.filters.apptId,
					busSegment : lookupService.filters.busSegment,
					projectKey : lookupService.filters.projectKey,
					clientKey : lookupService.filters.client,
					hpKey : lookupService.filters.hp,
					hpProduct : lookupService.filters.hpp,
					providerId : lookupService.filters.provId,
					provGroupName : lookupService.filters.provgrpNm.toUpperCase(),
					provLastName : lookupService.filters.provLastNm.toUpperCase(),
					provFirstName : lookupService.filters.provFstNm.toUpperCase(),
					fromUserKey : lookupService.filters.user ? lookupService.filters.user : '0'
			};
			$scope.dataModel.showPendFiltersLoadingDialog = true;
			$http.post('/gcm-app-services/pendmgmt/worklist/getUnassignedInventoryforPendMgmt', obj).then(function(respose) {
				$scope.dataModel.showPendFiltersLoadingDialog = false;
				if(respose.data.result){					
				searchResults = respose.data.result;
				angular.forEach(searchResults, function(obj, idx) {
					obj.uniqueIndex = idx + 1;
				});
				$scope.worklistViewModel.records = searchResults;
				$scope.worklistViewModel.totalRecordsCount = searchResults.length;

				$scope.worklistViewModel.onLoad(true);
				}
			}, function(error) {
				$scope.dataModel.showPendFiltersLoadingDialog = false;
			});
	
		};
		function clearTableData() {
			searchResults = [];
			$scope.worklistViewModel.records = [];
			$scope.worklistViewModel.totalRecordsCount = 0;
			$scope.worklistViewModel.selectedRecords = [];
			$scope.worklistViewModel.selectedRecordCount = 0;
			$scope.worklistViewModel.pagination.currentPageNumber = 1;
			$scope.worklistViewModel.pagination.currentPageNumberInView = 1;
			$scope.worklistViewModel.pagination.pageNumberError = false;
			$scope.worklistViewModel.selectAllChecked = false;
			clearSort();
		}

		function clearSort(){
			angular.forEach($scope.worklistViewModel.columns,function(col){
				col.sortOrder = 0;
			});
			$scope.worklistViewModel.columns[2].sortOrder = 1;
		}
		lookupService.clear = function() {

			lookupService.filters.busSegment = '';
			lookupService.filters.projectKey = '';
			lookupService.filters.client = '';
			lookupService.filters.hp = '';
			lookupService.filters.hpp = '';
			lookupService.filters.provId = '';
			lookupService.filters.provLastNm = '';
			lookupService.filters.provFstNm = '';
			lookupService.filters.provgrpNm = '';
			lookupService.filters.apptId = '';
			lookupService.filters.user = '';
			lookupService.filters.status = '';
			clearTableData();
			$scope.errorMessageModel.visible = false;
			
		}
		
		lookupService.clear();
		lookupService.filter();
		$scope.worklistViewModel.clearAll = function(){
			angular.forEach($scope.worklistViewModel.selectedRecords, function (obj, idx) {
				if (obj.selected == true) {
					selectedChartIds.push(obj);
					obj.selected = false;
				}
			});
			apptIds = [];
			if (selectedChartIds.length > 0) {
				$scope.selected = false;
				$scope.worklistViewModel.selectedRecords = [];
				$scope.worklistViewModel.selectedRecordCount = 0;
				$scope.worklistViewModel.selectAllChecked = false;
			}
		};
		
		$scope.worklistViewModel.addToMyWorklist = function(){
			$scope.errorMessageModel.visible = false;
			if (apptIds.length === 0) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Select atleast one record for adding to worklist.</span>';
				$scope.errorMessageModel.visible = true;
				$scope.errorMessageModel.messageVisibleTime = 5000;
				return;
			}
			var obj = {
					pendMgrUserKey : $scope.dataModel.loginUserKey,
					loginUserKey : $scope.dataModel.loginUserKey,
					requestedUser : $scope.dataModel.requestedUserId,
					gcmRetApptIds : apptIds
			};
			$scope.showAvailableWorklistLoadingDialog = true;
			$http.post('/gcm-app-services/pendmgmt/worklist/updatePendWorkList', obj).then(function(response) {
			if(response.data.status=="SUCCESS"){
				$scope.showAvailableWorklistLoadingDialog = false;
				lookupService.filter();
				$scope.errorMessageModel.messageType = 'success';
				$scope.errorMessageModel.content = '<span>Pended appointment has been added to your Worklist.</span>';
				apptIds=[];
				}
				else{
				$scope.showAvailableWorklistLoadingDialog = false;
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Add to worklist failed.</span>';
				}
				$scope.errorMessageModel.visible = true;
				$scope.errorMessageModel.messageVisibleTime = 5000;
			});
		};
		
		$scope.worklistViewModel.onExport = function(filterCondition, initiateExport) {
			$scope.errorMessageModel.visible = false;
			$scope.initiateExport = initiateExport;

			staticDataService.query(filterCondition, searchResults, function(result) {
				$scope.initiateExport(result, 'Available Work Items');
			});
		};
	
		$scope.worklistViewModel.onSelectAllRows = function(selectAll) {
			var model = this;
			var availableRecords = model.records.slice();

			var selectedRecordIds = [];
				apptIds = [];
			for (var i = 0; i < model.selectedRecords.length; i++){
				selectedRecordIds.push(model.selectedRecords[i].uniqueIndex);
				apptIds.push(model.selectedRecords[i].apptId);
}
			for (var row = 0; row < availableRecords.length; row++) {
				var recordIndex = selectedRecordIds.indexOf(availableRecords[row].uniqueIndex);
				if (selectAll) {
					availableRecords[row].selected = true;
					if (recordIndex < 0){
						model.selectedRecords.push(availableRecords[row]);
						apptIds.push(availableRecords[row].apptId);}
						
				} else {
					if (availableRecords[row].selected) {
						model.selectedRecords.splice(recordIndex, 1);
						apptIds.splice(recordIndex, 1);
						selectedRecordIds.splice(recordIndex, 1);
						availableRecords[row].selected = false;
					}
				}
			}
			this.selectedRecordCount = this.selectedRecords.length;
			if(this.selectedRecordCount > 1){
				$scope.worklistViewModel.multiSelectUpdate = false;
			} else {
				$scope.worklistViewModel.multiSelectUpdate = true;
			}
		}

		$scope.worklistViewModel.onRowSelect = function(event, record, selected) {

			var model = this;
			if (typeof selected === 'undefined') {
				if (typeof event !== 'undefined' && (event.target.tagName === 'A' || event.target.tagName === 'INPUT'))
					return;
				if (typeof event === 'undefined' || event.target.tagName === 'SELECT' || event.target.tagName === 'OPTION') {
					if (record.userKey === '' || record.userKey === null) {
						return;
					} else {
						record.selected = true;
						selected = true;
					}
				} else {
					record.selected = !record.selected;
					selected = record.selected;
				}
			}
			
			if (!selected && model.selectAllChecked)
				model.selectAllChecked = false;


			var recordIndex = -1;
			for (var i = 0; i < model.selectedRecords.length; i++) {
				if (model.selectedRecords[i].uniqueIndex === record.uniqueIndex)
					recordIndex = i;
			}

			if (selected) {
				if (recordIndex < 0){
					model.selectedRecords.push(record);
					apptIds.push(record.apptId);}
			} else {
				model.selectedRecords.splice(recordIndex, 1);
				apptIds.splice(recordIndex, 1);
			}

			var availableRecords = model.records;
			var allSelected = true;

			for (var i = 0; i < availableRecords.length; i++) {
				if (!availableRecords[i].selected) {
					allSelected = false;
					break;
				}
			}
			if(availableRecords.length > 0)
				model.selectAllChecked = allSelected;
			
			this.selectedRecordCount = this.selectedRecords.length;
			if(this.selectedRecordCount > 1){
				$scope.worklistViewModel.multiSelectUpdate = false;
			} else {
				$scope.worklistViewModel.multiSelectUpdate = true;
			}
		}

		$scope.worklistViewModel.onChange = function(filterCondition) {
			var model = this;
			staticDataService.query(filterCondition, searchResults, function(result) {
				model.records = result.records;
				model.totalRecordsCount = result.totalRecordsCount;

				// Add this code snippet for Select All Functionality
				var allSelected = true;
				for(var rowIndex = 0; rowIndex < model.records.length; rowIndex++) {
					if(!(model.records[rowIndex].selected)) {
						allSelected = false;
						break;
					}
				}
				if(model.records.length > 0)
					model.selectAllChecked = allSelected;
			});
		};	
	}).controller('faxStatusCntrl', function($scope, $compile, $http, dataServiceModel,staticDataService) {
		
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
				apptKey : $scope.dataModel.appointmentId
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
}).factory('commentHistoryModel',function(){
}).controller('chartStatusCntrl', function($scope, $compile, $timeout, $http,lookupService,errorMessageModel,dataServiceModel,staticDataService) {
$scope.dataModel=dataServiceModel;
	$scope.dataModel.scheduledCnt = $scope.dataModel.scheduledCnt;
	$scope.dataModel.receivedCnt = $scope.dataModel.receivedCnt;
	$scope.dataModel.pendingCnt = $scope.dataModel.pendingCnt;
	$scope.dataModel.unscheduledCnt = $scope.dataModel.unscheduledCnt;
}).controller('commentsHitoryCntrl', function($scope, $compile, $timeout, $http,errorMessageModel,dataServiceModel,staticDataService) {
		$scope.dataModel=dataServiceModel;
		$scope.dataModel.showFlag=true;
		$scope.errorMessageModel = errorMessageModel;
		$scope.dataModel.showCommentsLoadingDialog = false;
		var addComments = $scope.addComments = function(){
		if ($scope.addcomments != "") {
			var appointmentComments = {
				apptKey : $scope.dataModel.appointmentId,
				apptComments : $scope.addcomments,
				createUserId : $scope.dataModel.requestedUserId
			}
			$scope.dataModel.showCommentsLoadingDialog = true;
			$http.post('/gcm-app-services/scheduling/workflow/insertApptComments', appointmentComments).then(function(response) {
				$scope.dataModel.showCommentsLoadingDialog = false;
				$scope.addcomments = "";
				var message = "Comments Added to appointment Successfully";
				$scope.errorMessageModel.messageType="success";
				$scope.errorMessageModel.visible="true";
				$scope.errorMessageModel.content='<span>'+message+'</span>';
				$scope.dataModel.readApptComments();
			}, function(error) {
				$scope.dataModel.showCommentsLoadingDialog = false;
				var message = JSON.stringify(error);
				$scope.errorMessageModel.messageType="error";
				$scope.errorMessageModel.visible="true";
				$scope.errorMessageModel.content='<span>'+message+'</span>';;
			
			});
		}
		else {			
			var message = "Comments Required";
			$scope.errorMessageModel.messageType="error";
				$scope.errorMessageModel.visible="true";
				$scope.errorMessageModel.content='<span>'+message+'</span>';;
		}
	}
	$scope.saveComments = function() {
		if(!$scope.dataModel.appointmentId){
			$scope.saveComments = true;
		}else{
			addComments();
		}		
	}
}).controller('retrievalInfoCtrl', function($scope, $compile, $timeout, $http,dataServiceModel,staticDataService,errorMessageModel) {
	$scope.dataModel=dataServiceModel;
	$scope.errorMessageModel=errorMessageModel;
	$scope.dataModel.showRetrievalInfoLoadingDialog = false;
	$scope.cancelBtn = function(){
		$scope.dataModel.isWorklist=true;	
		$scope.dataModel.isChanged=false;
	}
	$scope.handleRetrvlPrefSelection=function(){
	$scope.dataModel.gcmUserKey="";
	$scope.dataModel.isChanged=true;
	$scope.dataModel.getUsersByRoleCode();
	}
	var releasedChartIds=[];
	var nonRetrChartIds=[];
	$scope.onSave=function(){
	 $scope.errorMessageModel.visible = false;	
	 releasedChartIds=[];
	 nonRetrChartIds=[];
	 if($scope.dataModel.retrvlPrefSelect=="" || $scope.dataModel.retrvlPrefSelect==null)
	{
		$scope.errorMessageModel.messageType="error";
		$scope.errorMessageModel.content="<span>Please select the retrieval method before releasing.</span>";
		$scope.errorMessageModel.visible=true;
		return;
	}
	if($scope.dataModel.gcmUserKey=="")
	{
		$scope.errorMessageModel.messageType="error";
		$scope.errorMessageModel.content="<span>Please select the user before releasing.</span>";
		$scope.errorMessageModel.visible=true;
		return;
	}
		var arr=$scope.dataModel.retrievalInfoTableModel.records;
		for(var i=0;i<arr.length;i++){
		if(arr[i].busFuncStatus=="NONRETRIEVABLE")
			nonRetrChartIds.push(arr[i].chartId);
		else
			releasedChartIds.push(arr[i].chartId);
		}
		var obj = {
					chartIdList : releasedChartIds,
					chartIdExclList : nonRetrChartIds,
					requestedUserId : $scope.dataModel.requestedUserId,
					loginUserKey : $scope.dataModel.gcmUserKey,
					appt:{
					apptKey : $scope.dataModel.appointmentId
					},
					retMethod : $scope.dataModel.retrvlPrefSelect
			};
			$scope.dataModel.showRetrievalInfoLoadingDialog = true;
			$http.post('/gcm-app-services/pendmgmt/worklist/updateChartStatus', obj).then(function(response) {
				$scope.dataModel.showRetrievalInfoLoadingDialog = false;
				if(response.data.status=="SUCCESS"){
				$scope.errorMessageModel.messageType = 'success';
				$scope.errorMessageModel.content = '<span>Chart Status has been updated.</span>';
				$scope.dataModel.readChartStatusDetails();
				$( "#finish_Btn" ).prop( "disabled", "" );
				}
				else
				{
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>Chart Status updation failed.</span>';
				}
				$scope.errorMessageModel.visible = true;
				$scope.errorMessageModel.messageVisibleTime = 5000;
			});
	}
	$scope.onFinish=function(){
		$scope.errorMessageModel.visible = false;
		nonRetrChartIds=[];
		releasedChartIds=[];
	 if($scope.dataModel.retrvlPrefSelect=="" || $scope.dataModel.retrvlPrefSelect==null)
	{
		$scope.errorMessageModel.messageType="error";
		$scope.errorMessageModel.content="<span>Please select the retrieval method before releasing.</span>";
		$scope.errorMessageModel.visible=true;
		return;
	}
	if($scope.dataModel.gcmUserKey=="")
	{
		$scope.errorMessageModel.messageType="error";
		$scope.errorMessageModel.content="<span>Please select the user before releasing.</span>";
		$scope.errorMessageModel.visible=true;
		return;
	}
		var arr=$scope.dataModel.retrievalInfoTableModel.records;
		for(var i=0;i<arr.length;i++){
		if(arr[i].busFuncStatus=="NONRETRIEVABLE")
			nonRetrChartIds.push(arr[i].chartId);
		else
			releasedChartIds.push(arr[i].chartId);
		}
		var obj = 
			{		
					chartIdList : releasedChartIds,
					chartIdExclList : nonRetrChartIds,
					requestedUserId : $scope.dataModel.requestedUserId,
					loginUserKey : $scope.dataModel.gcmUserKey,
					appt:{
					apptKey : $scope.dataModel.appointmentId
					},
					busFuncDtlKey : $scope.dataModel.retrvlPrefSelect=="FAX"?1:$scope.dataModel.retrvlPrefSelect=="ONSITE"?2:3,
					retMethod : $scope.dataModel.retrvlPrefSelect,
					noOfPendAttempts : parseInt($scope.dataModel.pendAttempts) + 1
					
			}
		$scope.dataModel.showRetrievalInfoLoadingDialog = true;
			$http.post('/gcm-app-services/pendmgmt/worklist/updateApptStatus', obj).then(function(response) {
				$scope.dataModel.showRetrievalInfoLoadingDialog = false;
				if(response.data.status=="SUCCESS"){
				$scope.errorMessageModel.messageType = 'success';
				$scope.errorMessageModel.content = '<span>Appointment Status has been updated.</span>';
				$scope.dataModel.isWorklist=true;
				}
				else
				{
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>Appointment Status updation failed.</span>';
				}
				$scope.errorMessageModel.visible = true;
				$scope.errorMessageModel.messageVisibleTime = 5000;
			});
	}
	$scope.dataModel.retrievalInfoTableModel={
	
		pagination : {
				currentPageNumber : 1,
				paginationWindow : 5,
				recordsPerPage : 10,
				recordsPerPageChoices : [10, 15, 25]
			},
			columns :  [
			{
				columnId:'busFuncStatus',
				label:'Status',
				layoutOrder:1,
				resizable:false,
				cellTemplate:['<select  ng-model="record.busFuncStatus"><option value="NONRETRIEVABLE">Non-Retrievable</option><option value="PEND RELEASED">Release</option></select>'].join('')
			},
			{
				columnId:'provGroupName',
				label:'Group Name',
				layoutOrder:2,
				resizable:false,
				sortOrder:0, 
				sortable:true,					 
				cellTemplate:'<span ng-bind="::record.provGroupName"> </span>'
			},
			{ 
				columnId:'provName', 
				label:'Provider Name',
				layoutOrder:3,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span style="text-transform:capitalize" ng-bind="::record.provName"> </span>'
			},
			{ 
				columnId:'provLocation', 
				label:'Location',
				layoutOrder:4,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.provLocation"> </span>' 
			},
			{ 
				columnId:'phone', 
				label:'<span>Phone <br> \n Fax</span>',
				layoutOrder:5,
				resizable:false, 
				sortOrder:0, 
				sortable:false,                
				cellTemplate:'<span>{{record.provPhone}} <br> \n {{record.provFax}}</span>' 
			},
			
			{ 
				columnId:'memberName', 
				label:'Member Name',
				layoutOrder:6,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span style="text-transform:capitalize" ng-bind="::record.memberName"> </span>' 
			},
			{ 
				columnId:'memberDOB', 
				label:'Member Date of Birth',
				layoutOrder:7,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.memberDOB | date :\'MM-dd-yyyy\'"> </span>' 
			},
			{ 
				columnId:'memberGender', 
				label:'Gender',
				layoutOrder:8,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.memberGender"> </span>' 
			},
			{ 
				columnId:'chartId', 
				label:'Chart ID',
				layoutOrder:9,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.chartId"> </span>' 
			},
			{ 
				columnId:'pendReason', 
				label:'Pend Reason',
				layoutOrder:10,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.pendReason"> </span>' 
			}
		],
		records: $scope.dataModel.retrievalRecords,
		selectedRecords : [],
		selectedRecordCount : 0
}
	$scope.dataModel.retrievalInfoTableModel.onChange = function(filterCondition) {
		var model = this;
		staticDataService.query(filterCondition, $scope.dataModel.retrievalRecords, function(result) {
			model.records = result.records;
			model.totalRecordsCount = result.totalRecordsCount;

			var allSelected = true;
			for(var rowIndex = 0; rowIndex < model.records.length; rowIndex++) {
				if(!(model.records[rowIndex].selected)) {
					allSelected = false;
					break;
				}
			}
			if(model.records.length > 0)
				model.selectAllChecked = allSelected;
		});
	};
	
});
