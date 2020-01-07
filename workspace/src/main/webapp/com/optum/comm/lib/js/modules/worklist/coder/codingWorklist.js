var codingWorkListModule = angular.module("codingWorklistApp",[ 'looup-data', 'uitk.component.uitkDynamicTable', 'uitk.component.uitkIconFont', 'ngSanitize', 'uitk.component.uitkMessage',
	'staticDataService', 'codingWorklistViewModel','uitk.component.uitkPanel','uitk.component.tabs','uitk.component.uitkTextField','codingUIApp','codingQAFeedbackUIApp']);

codingWorkListModule.factory("dataServiceModel", function() {
	var dataObj = {};
	dataObj.selectedChart = {};
	return dataObj;
});
var rootData = window.parent.rootData;
codingWorkListModule.controller('codingWorklistCtrl',function($scope, $compile, $timeout, $http, staticDataService, lookupService, errorMessageModel, dataServiceModel) {
		var CordysRoot = window.parent;
		$scope.dataModel = dataServiceModel;
		CordysRoot.rootData.dataModel = dataServiceModel;
		var loginUserKey = optumUI.getUser().getLoggedInUserKey();
		var requestedUserId = optumUI.getAuthUser();
		//to change the view on clicking chartID, starts here
		$scope.lookupService = lookupService;
		$scope.showWorkList = true;
	//	$scope.url = 'codingworklisttabs.html';
		$scope.dataModel = dataServiceModel;
		$scope.dataModel.showCodingFiltersLoadingDialog = false;
		if(!lookupService.filters.organization){
			if(!lookupService.filters.vendors || lookupService.filters.vendors.length <= 0)
				lookupService.filters.vendors = rootData.getVendorsByRole(rootData.currentRole);
			if(lookupService.filters.vendors.length==1){
				lookupService.filters.organization = lookupService.filters.vendors[0].key;
				//$scope.isBusFuncConfigure();
			}
		}
		function reqParams(params) {
			var queryParams = "";
			for (var key in params) {
				queryParams += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
			}
			return queryParams;
		}
		var config = {
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		};
		$scope.isBusFuncConfigure = $scope.dataModel.isBusFuncConfigure = function() {
			var regionInput = '';
			/*var regionInput;
			if(lookupService.filters.organization)
		    {
				for(var cnt=0; cnt<lookupService.filters.organizations.length; cnt++){
				  if(lookupService.filters.organizations[cnt].key=== lookupService.filters.organization)	
				  {
					  regionInput=lookupService.filters.organizations[cnt].value;
					  break;
				  }
				}
			}*/
			$scope.dataModel.gcmConfigInput = {
						groupKey : optumUI.getUser().getCurrentGroupKey(),
        				region :regionInput,
        				busFunckey : 6,
        				configType :'FUNCTION_ENABLED',
        				busFuncDetailKey:'',
        				userId : requestedUserId,
        				roleCode : rootData.currentRole,
        				configValue :'TRUE',
        				vendorKey : '',
        				userKey : loginUserKey,
    					matchType: 'PARTIAL'
			};
		return $http.post('/gcm-app-services/masterdata/isBusFuncConfigured',$scope.dataModel.gcmConfigInput).then(function(response) {
			if(response.data.result && response.data.result.length > 0){
				lookupService.filters.organizations = response.data.result;
				$scope.dataModel.showQATab = true;
			}
				$scope.dataModel.tabArr=[];
				$scope.url = 'codingworklisttabs.html';
		if($scope.dataModel.showQATab)
		{
			$scope.dataModel.tabArr=[ {
					title : 'My Worklist',
					templateurl : 'myworklist.html',
					callback : function(event, tabData) {
						lookupService.filters.currentTab = 'codingMyWorklist';
					}
				}, {
					title : 'Completed Work Items',
					templateurl : 'completedworkitems.html',
					callback : function(event, tabData) {
						lookupService.filters.currentTab = 'codingCompletedWorkItems';
					}
				}, {
					title : 'QA Feedback',
					templateurl : 'qafeedback.html',
					callback : function(event, tabData) {
						lookupService.filters.currentTab = 'codingQAFeedback';
					}
				} ]
		}
		else
		{
			$scope.dataModel.tabArr=[ {
					title : 'My Worklist',
					templateurl : 'myworklist.html',
					callback : function(event, tabData) {
						lookupService.filters.currentTab = 'codingMyWorklist';
					}
				}, {
					title : 'Completed Work Items',
					templateurl : 'completedworkitems.html',
					callback : function(event, tabData) {
						lookupService.filters.currentTab = 'codingCompletedWorkItems';
					}
				} ]
		}

		$scope.codingWorklistTabsModel = {
				selectedIndex : 0,
				id : 'codingWorklistTabs',
				ariaLabel : 'Coding Worklist',
				eventsEnable : true,
				tabs : $scope.dataModel.tabArr
		};
		
		$scope.$watch('lookupService.url',function(newVal,oldVal){
			
			if(newVal !== '')
				$scope.url = lookupService.url;
			if($scope.url == 'codingworklisttabs.html')
				$scope.showWorkList = true;
			else
				$scope.showWorkList = false;
		});
				$scope.dataModel.showCodingFiltersLoadingDialog = false;
				$scope.errorMessageModel.visible = false;
			}, function(error) {
				$scope.dataModel.showCodingFiltersLoadingDialog = false;
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Error while fecthing the configuration.</span>';
				$scope.errorMessageModel.visible = true;
			});
		}
		
		//to change the view on clicking chartID, ends here
		$scope.isBusFuncConfigure();
		$scope.errorMessageModel = errorMessageModel;
		
		$scope.codingWorklistFilters = {
				id : 'worklistFilterPanel',
				title : 'Filters',
				templateUrl : '../../retrieval/assignment/filters.html',
				open : true,
				collapsible : true
		};
		
		
		
	});
codingWorkListModule.controller('myWorklistCtrl',function($scope, $compile, $timeout, $http, lookupService, errorMessageModel, 
			staticDataService, myWorklistViewModel, dataServiceModel) {
		var CordysRoot = window.parent;
		var loginUserKey = optumUI.getUser().getLoggedInUserKey();
		var requestedUserId = optumUI.getAuthUser();
		var vendorKey = optumUI.getUser().getDefaultVendorKey();
		var groupKey = optumUI.getUser().getCurrentGroupKey();
		var selectedChartIds = [];
		var apptIds = [];
		var selectedChartStatuses = [];
		var searchResults = [];
		
		$scope.errorMessageModel = errorMessageModel;
		$scope.worklistViewModel = myWorklistViewModel;
		$scope.dataModel = dataServiceModel;
		$scope.dataModel.showCodingFiltersLoadingDialog = false;
		$scope.dataModel.showCodingLoadingDialog = false;
		$scope.dialogObj = {showReleaseToAssignWarning : false};

		$scope.worklistViewModel.linkClick = function() {
			$scope.errorMessageModel.visible = false;
			if (selectedChartIds.length === 0) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Select atleast one record for releasing to assignment.</span>';
				$scope.errorMessageModel.visible = true;
				return;
			}
			
			if(selectedChartStatuses.indexOf('INPROGRESS') > -1){
				$scope.dialogObj.showReleaseToAssignWarning = true;
				return;
			}
			$scope.releaseToAssignment();
		};
		
		$scope.worklistViewModel.clearAll = function(){
		$scope.errorMessageModel.visible = false;
			angular.forEach($scope.worklistViewModel.selectedRecords, function (obj, idx) {
				if (obj.selected == true) {
					apptIds.push(obj);
					obj.selected = false;
				}
			});
			selectedChartIds = [];
			if (apptIds.length > 0) {
				$scope.selected = false;
				$scope.worklistViewModel.selectedRecords = [];
				$scope.worklistViewModel.selectedRecordCount = 0;
				$scope.worklistViewModel.selectAllChecked = false;
			} else {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Select atleast one record to clear the selected items</span>';
				$scope.errorMessageModel.visible = true;
			}
		};

		$scope.releaseToAssignment = function(){
			$scope.errorMessageModel.visible = false;
			var obj = {
					toStatus : 'CREATED',
					requestedUserId : requestedUserId,
					loginUserKey : loginUserKey,
					chartIdList : selectedChartIds,
					busFunction : 2
			};
			$scope.dataModel.showCodingLoadingDialog = true;
			$http.post('/gcm-app-services/coding/worklist/codingReleasetoAssingment', obj).then(function(response) {
				$scope.dataModel.showCodingLoadingDialog = false;
				lookupService.filter();
				$scope.errorMessageModel.visible = false;
				$scope.dialogObj.showReleaseToAssignWarning = false;
				if(response.data.status === 'SUCCESS'){
					$scope.errorMessageModel.messageType = 'success';
					$scope.errorMessageModel.content = '<span>Release to Assignment successful.</span>';
				}
				$scope.errorMessageModel.visible = true;
			}, function(error) {
				$scope.dataModel.showCodingLoadingDialog = false;
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Release to Assignment unsuccessful.</span>';
				$scope.errorMessageModel.visible = true;
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
			selectedChartIds = [];
			for (var i = 0; i < model.selectedRecords.length; i++){
				selectedRecordIds.push(model.selectedRecords[i].uniqueIndex);
				selectedChartIds.push(model.selectedRecords[i].chartId);
				selectedChartStatuses.push(model.selectedRecords[i].chartStatus);
}
			for (var row = 0; row < availableRecords.length; row++) {
				var recordIndex = selectedRecordIds.indexOf(availableRecords[row].uniqueIndex);
				if (selectAll) {
					availableRecords[row].selected = true;
					if (recordIndex < 0){
						model.selectedRecords.push(availableRecords[row]);
						selectedChartIds.push(availableRecords[row].chartId);
						selectedChartStatuses.push(model.selectedRecords[i].chartStatus);}
						
				} else {
					if (availableRecords[row].selected) {
						model.selectedRecords.splice(recordIndex, 1);
						selectedChartIds.splice(recordIndex, 1);
						selectedRecordIds.splice(recordIndex, 1);
						selectedChartStatuses.splice(recordIndex, 1);
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
								selectedChartIds.push(record.chartId);
								selectedChartStatuses.push(record.chartStatus);}
						} else {
							model.selectedRecords.splice(recordIndex, 1);
							selectedChartIds.splice(recordIndex, 1);
							selectedChartStatuses.splice(recordIndex, 1);
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
		
		$scope.worklistViewModel.onChartIdClick = function(record) {
			$scope.errorMessageModel.visible = false;
			dataServiceModel.selectedChart = record;
			lookupService.url = '../../coding/codingui.htm';
			$scope.dataModel.isSupervisorUI = false;
			$scope.dataModel.isReadonly = false;
		};

		function clearTableData() {
			searchResults = [];
			selectedChartIds = [];
			selectedChartStatuses = [];
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
			//apply default sort on Chart ID column
			$scope.worklistViewModel.columns[1].sortOrder = 1;
		}

		lookupService.filter = function() {
			$scope.errorMessageModel.visible = false;
			clearTableData();
			
				if(!lookupService.filters.organization)
				{
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>Organization is mandatory.</span>';
					$scope.errorMessageModel.visible = true;
					return;
				}
			var obj = {
					loginUserKey	: loginUserKey,
					loginUserId		: requestedUserId,
					groupKey		: groupKey,
					roleCode		: rootData.currentRole ? rootData.currentRole : '',
					isAssigned 		: 1,
					busFuncKey		: 2,
					busSegment		: lookupService.filters.busSegment,
					status 			: lookupService.filters.status ? lookupService.filters.status : 0,
					projectKey		: lookupService.filters.projectKey,
					clientKey		: lookupService.filters.client,
					hpKey			: lookupService.filters.hp,
					hpProduct		: lookupService.filters.hpp,
					vendorKey		: lookupService.filters.organization,
					chartId 		: lookupService.filters.chartId,
					isCompleted		: 'WORKLIST'
			};
			$scope.dataModel.showCodingFiltersLoadingDialog = true;
			$http.post('/gcm-app-services/coding/worklist/getMyCodingWorklist', obj).then(function(respose) {
				$scope.dataModel.showCodingFiltersLoadingDialog = false;
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
				$scope.dataModel.showCodingFiltersLoadingDialog = false;
			});

		};

		lookupService.clear = function() {

			lookupService.filters.busSegment = '';
			lookupService.filters.projectKey = '';
			lookupService.filters.client = '';
			lookupService.filters.hp = '';
			lookupService.filters.hpp = '';
			lookupService.filters.status = '';
			lookupService.filters.chartId = '';
			if(lookupService.filters.vendors.length==1)
				lookupService.filters.organization =lookupService.filters.vendors[0].key;
			else
				lookupService.filters.organization ='';
			clearTableData();
			$scope.errorMessageModel.visible = false;
		}
		
		//lookupService.clear();
		if(lookupService.filters.vendors.length==1 || lookupService.filters.organization)
				lookupService.filter();
		});
codingWorkListModule.controller('completedWorkItemsCtrl',function($scope, $compile, $timeout, $http, lookupService, errorMessageModel, 
			staticDataService, completedWorkItemsViewModel, dataServiceModel) {

		var loginUserKey = optumUI.getUser().getLoggedInUserKey();
		var requestedUserId = optumUI.getAuthUser();
		var vendorKey = optumUI.getUser().getDefaultVendorKey();
		var groupKey = optumUI.getUser().getCurrentGroupKey();
		var searchResults = [];
		$scope.dataModel = dataServiceModel;
		$scope.dataModel.showCodingFiltersLoadingDialog = false;
		$scope.errorMessageModel = errorMessageModel;
		$scope.worklistViewModel = completedWorkItemsViewModel;
		
		$scope.worklistViewModel.onExport = function(filterCondition, initiateExport) {
			$scope.initiateExport = initiateExport;

			staticDataService.query(filterCondition, searchResults, function(result) {
				$scope.initiateExport(result, 'Completed Work Items');
			});
		};

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
		
		$scope.worklistViewModel.onChartIdClick = function(record) {
			dataServiceModel.selectedChart = record;
			lookupService.url = '../../coding/codingui.htm';
			$scope.dataModel.isSupervisorUI = false;
			$scope.dataModel.isReadonly = true;
		};

		function clearTableData() {
			searchResults = [];
			$scope.worklistViewModel.records = [];
			$scope.worklistViewModel.totalRecordsCount = 0;
			$scope.worklistViewModel.pagination.currentPageNumber = 1;
			$scope.worklistViewModel.pagination.currentPageNumberInView = 1;
			$scope.worklistViewModel.pagination.pageNumberError = false;
			clearSort();
		}

		function clearSort(){
			angular.forEach($scope.worklistViewModel.columns,function(col){
				col.sortOrder = 0;
			});
			// apply default sort on Chart ID column
			$scope.worklistViewModel.columns[0].sortOrder = 1;
		}

		lookupService.filter = function() {
			$scope.errorMessageModel.visible = false;
			if(lookupService.fromDateCalendarViewModel.invalid || lookupService.throughDateCalendarViewModel.invalid) 
				return;
			
			if(lookupService.filters.acceptedDate === '4'){
				if(lookupService.filters.fromDate > lookupService.filters.throughDate){
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>From Date can not be beyond Through Date.</span>';
					$scope.errorMessageModel.visible = true;
					return;
				}
			}
		
				if(!lookupService.filters.organization)
				{
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>Organization is mandatory.</span>';
					$scope.errorMessageModel.visible = true;
					return;
				}
			
			var obj = {
					loginUserKey	: loginUserKey,
					loginUserId		: requestedUserId,
					groupKey		: groupKey,
					roleCode		: rootData.currentRole ? rootData.currentRole : '',
					isAssigned 		: 1,
					busFuncKey		: 2,
					busSegment		: lookupService.filters.busSegment,
					status 			: lookupService.filters.status ? lookupService.filters.status : 0,
					projectKey		: lookupService.filters.projectKey,
					clientKey		: lookupService.filters.client,
					hpKey			: lookupService.filters.hp,
					hpProduct		: lookupService.filters.hpp,
					vendorKey		: lookupService.filters.organization,
					chartId 		: lookupService.filters.chartId,
					isCompleted		: 'COMPLETED',
					acceptedFromDate : (lookupService.filters.acceptedDate === '4' && lookupService.filters.fromDate !== '') ? lookupService.getDateAsString(lookupService.filters.fromDate) : lookupService.filters.fromDate,
					acceptedToDate : (lookupService.filters.acceptedDate === '4' && lookupService.filters.throughDate !== '') ? lookupService.getDateAsString(lookupService.filters.throughDate) : lookupService.filters.throughDate
			};
			
			if (obj.acceptedFromDate.trim() === '' || obj.acceptedToDate.trim() === '') {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Date is mandatory.</span>';
				$scope.errorMessageModel.visible = true;
				return;
			}
			
			clearTableData();
			$scope.dataModel.showCodingFiltersLoadingDialog = true;
			$http.post('/gcm-app-services/coding/worklist/getMyCodingWorklist', obj).then(function(respose) {
				$scope.dataModel.showCodingFiltersLoadingDialog = false;
				searchResults = respose.data.result;
				angular.forEach(searchResults, function(obj, idx) {
					obj.uniqueIndex = idx + 1;
				});
				$scope.worklistViewModel.records = searchResults;
				$scope.worklistViewModel.totalRecordsCount = searchResults.length;

				$scope.worklistViewModel.onLoad(true);
			}, function(error) {
				$scope.dataModel.showCodingFiltersLoadingDialog = false;
			});

		};

		lookupService.clear = function() {

			lookupService.filters.busSegment = '';
			lookupService.filters.projectKey = '';
			lookupService.filters.client = '';
			lookupService.filters.hp = '';
			lookupService.filters.hpp = '';
			lookupService.filters.status = '';
			lookupService.filters.chartId = '';
			lookupService.filters.acceptedDate = '0';
			lookupService.fromDateCalendarViewModel.dateText = '';
			lookupService.fromDateCalendarViewModel.invalid = false;
			lookupService.throughDateCalendarViewModel.dateText = '';
			lookupService.throughDateCalendarViewModel.invalid = false;
			lookupService.filters.fromDate = '';
			lookupService.filters.throughDate = '';
			if(lookupService.filters.vendors.length==1)
				lookupService.filters.organization =lookupService.filters.vendors[0].key;
			else
				lookupService.filters.organization ='';
			lookupService.onAcceptedDateChange();

			clearTableData();
			$scope.errorMessageModel.visible = false;
		}
		
		lookupService.clear();
		if(lookupService.filters.vendors.length==1)
		lookupService.filter();

	});
codingWorkListModule.controller('qaFeedbackCtrl',function($scope, $compile, $timeout, $http, lookupService, errorMessageModel, 
			staticDataService, qaFeedbackViewModel, dataServiceModel) {

		var loginUserKey = optumUI.getUser().getLoggedInUserKey();
		var requestedUserId = optumUI.getAuthUser();
		var vendorKey = optumUI.getUser().getDefaultVendorKey();
		var groupKey = optumUI.getUser().getCurrentGroupKey();
		var searchResults = [];
		
		$scope.errorMessageModel = errorMessageModel;
		$scope.worklistViewModel = qaFeedbackViewModel;
		$scope.dataModel = dataServiceModel;
		$scope.dataModel.showCodingFiltersLoadingDialog = false;
		$scope.worklistViewModel.onExport = function(filterCondition, initiateExport) {
			$scope.initiateExport = initiateExport;

			staticDataService.query(filterCondition, searchResults, function(result) {
				$scope.initiateExport(result, 'QA Feedback');
			});
		};
		
		
		$scope.worklistViewModel.openQAUI=function(record)
		{
			dataServiceModel.selectedChart = record;
			$scope.dataModel.isReadonly = false;
			lookupService.url = 'codingqafeedback.htm';
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
			//searchResults = [{"provGroupName":"CG Auto Prov GROUP 04","chartId":"0000270110","qaFeedbackDate":"12-04-2017","hpProduct":"CIGNA_HPP","hpCode":"CIGNA_HP","clientCode":"CIGNA","programName":"HCR","assignedDate":"2018-01-04","pageCount":7,"acceptedDate":"2018-01-04","busFuncVenKey":78397,"projContentKey":270110,"chartScoreGroup":"07","escalatedFlag":"N","busFuncKey":2,"actionFlag" :'0'},{"provGroupName":"CG Auto Prov GROUP 04","chartId":"0000270105","qaFeedbackDate":"12-01-2017","hpProduct":"CIGNA_HPP","hpCode":"CIGNA_HP","clientCode":"CIGNA","programName":"CR","assignedDate":"2018-01-04","pageCount":7,"acceptedDate":"2018-01-04","busFuncVenKey":78395,"projContentKey":270105,"chartScoreGroup":"5","escalatedFlag":"N","busFuncKey":2,"actionFlag" :'1'}];
			searchResults = [];
			$scope.worklistViewModel.records = [];
			$scope.worklistViewModel.totalRecordsCount = 0;
			$scope.worklistViewModel.pagination.currentPageNumber = 1;
			$scope.worklistViewModel.pagination.currentPageNumberInView = 1;
			$scope.worklistViewModel.pagination.pageNumberError = false;
			clearSort();
		}

		function clearSort(){
			angular.forEach($scope.worklistViewModel.columns,function(col){
				col.sortOrder = 0;
			});
			//apply default sort on Chart ID column
			$scope.worklistViewModel.columns[0].sortOrder = 1;
		}

		lookupService.filter = function() {
			$scope.errorMessageModel.visible = false;
			if(lookupService.fromDateCalendarViewModel.invalid || lookupService.throughDateCalendarViewModel.invalid) 
				return;
			
				if(!lookupService.filters.organization)
				{
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>Organization is mandatory.</span>';
					$scope.errorMessageModel.visible = true;
					return;
				}

			var obj = {
					loginUserKey	: loginUserKey,
					loginUserId		: requestedUserId,
					groupKey		: groupKey,
					roleCode		: rootData.currentRole ? rootData.currentRole : '',
					isAssigned 		: 1,
					busFuncKey		: 7,
					busSegment		: lookupService.filters.busSegment,
					status 			: lookupService.filters.status ? lookupService.filters.status : 0,
					projectKey		: lookupService.filters.projectKey,
					clientKey		: lookupService.filters.client,
					hpKey			: lookupService.filters.hp,
					hpProduct		: lookupService.filters.hpp,
					vendorKey		: lookupService.filters.organization,
					chartId 		: lookupService.filters.chartId,
					isCompleted		: 'QA_FEEDBACK'
			};
			clearTableData();
			$scope.dataModel.showCodingFiltersLoadingDialog = true;
			$http.post('/gcm-app-services/coding/worklist/getMyCodingWorklist', obj).then(function(respose) {
			$scope.dataModel.showCodingFiltersLoadingDialog = false;
			searchResults = respose.data.result;
			angular.forEach(searchResults, function(obj, idx) {
				obj.uniqueIndex = idx + 1;
			});
			$scope.worklistViewModel.records = searchResults;
			$scope.worklistViewModel.totalRecordsCount = searchResults.length;

			$scope.worklistViewModel.onLoad(true);
			}, function(error) {
				$scope.dataModel.showCodingFiltersLoadingDialog = false;
			});
		};

		lookupService.clear = function() {

			lookupService.filters.busSegment = '';
			lookupService.filters.projectKey = '';
			lookupService.filters.client = '';
			lookupService.filters.hp = '';
			lookupService.filters.hpp = '';
			lookupService.filters.status = '';
			lookupService.filters.chartId = '';
			lookupService.filters.acceptedDate = '0';
			lookupService.fromDateCalendarViewModel.dateText = '';
			lookupService.fromDateCalendarViewModel.invalid = false;
			lookupService.throughDateCalendarViewModel.dateText = '';
			lookupService.throughDateCalendarViewModel.invalid = false;
			lookupService.filters.fromDate = '';
			lookupService.filters.throughDate = '';
			if(lookupService.filters.vendors.length==1)
				lookupService.filters.organization =lookupService.filters.vendors[0].key;
			else
				lookupService.filters.organization ='';
			lookupService.onAcceptedDateChange();

			clearTableData();
			$scope.errorMessageModel.visible = false;
		}
		
		lookupService.clear();
		if(lookupService.filters.vendors.length==1)
			lookupService.filter();

	});