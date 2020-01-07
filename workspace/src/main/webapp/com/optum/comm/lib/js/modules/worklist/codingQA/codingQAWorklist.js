var rootData = window.parent.rootData;
angular.module("codingQAWorklistApp",[ 'looup-data', 'uitk.component.uitkDynamicTable', 'uitk.component.uitkIconFont', 'ngSanitize', 'uitk.component.uitkMessage',
	'staticDataService', 'codingQAWorklistViewModel', 'uitk.component.uitkPanel','uitk.component.tabs',	'uitk.component.uitkTextField','codingQAUIApp'])
.factory("dataServiceModel", function() {
	return {
		selectedChart : {}
	};
}).controller('codingQAWorklistCtrl',function($scope, $compile, $timeout, $http, lookupService, errorMessageModel,dataServiceModel) {
		
		var CordysRoot = window.parent;
		var rootData = window.parent.rootData;
		$scope.groupKey = optumUI.getUser().getCurrentGroupKey();
		$scope.dataModel = dataServiceModel;
		CordysRoot.rootData.dataModel = dataServiceModel;
		var userObj = optumUI.getUser();
		var userGroups = userObj.getUserGroups();
		$scope.dataModel.isInternalGroup = false;
		
		if(userGroups && userGroups.length > 0){
			for(var i = 0; i < userGroups.length; i++) {
				if(userGroups[i].groupCode == userObj.currentGroupCode && userGroups[i].isInternalGroup == 'Y'){
					$scope.dataModel.isInternalGroup = true;
				}
			}
		}
		
		//to change the view on clicking chartID, starts here
		$scope.lookupService = lookupService;
		$scope.url = 'codingQAWorklisttabs.html';
		$scope.dataModel = dataServiceModel;
		$scope.dataModel.showCodingQAFiltersLoadingDialog = false;
		//$scope.url = 'codingQAui.html';
		
		$scope.$watch('lookupService.url',function(newVal,oldVal){
			if(newVal !== '')
				$scope.url = lookupService.url;
		});
		//to change the view on clicking chartID, ends here
		
		$scope.errorMessageModel = errorMessageModel;

		$scope.codingQAWorklistFilters = {
				id : 'worklistFilterPanel',
				title : 'Filters',
				templateUrl : '../../retrieval/assignment/filters.html',
				open : true,
				collapsible : true
		};
if(!$scope.dataModel.isInternalGroup){
		$scope.codingQAWorklistTabsModel = {
				selectedIndex : 0,
				id : 'codingQAWorklistTabs',
				ariaLabel : 'Worklist',
				eventsEnable : true,
				tabs : [ {
					title : 'My Worklist',
					templateurl : 'myworklist.html',
					callback : function(event, tabData) {
						lookupService.filters.currentTab = 'codingQAMyWorklist';
						//lookupService.filter();
					}
				}, {
					title : 'Available Work Items',
					templateurl : 'availableworkitems.html',
					callback : function(event, tabData) {
						lookupService.filters.currentTab = 'codingQAAvailableWorkItems';
						if(!lookupService.lookup || !lookupService.lookup.coders || lookupService.lookup.coders.length == 0){
							lookupService.coders();
						}
					}
				}, {
					title : 'Completed Work Items',
					templateurl : 'completedworkitems.html',
					callback : function(event, tabData) {
						lookupService.filters.currentTab = 'codingQACompletedWorkItems';
						lookupService.filter();
					}
				} ]
		};
}
else
{
	$scope.codingQAWorklistTabsModel = {
				selectedIndex : 0,
				id : 'codingQAWorklistTabs',
				ariaLabel : 'Worklist',
				eventsEnable : true,
				tabs : [ {
					title : 'My Worklist',
					templateurl : 'myworklist.html',
					callback : function(event, tabData) {
						lookupService.filters.currentTab = 'codingQAMyWorklist';
						lookupService.filter();
						$("#releaseIdImg")[0].hidden=true;
						$("#releaseId")[0].style.display = 'none';
					}
				}, {
					title : 'Completed Work Items',
					templateurl : 'completedworkitems.html',
					callback : function(event, tabData) {
						lookupService.filters.currentTab = 'codingQACompletedWorkItems';
						lookupService.filter();
					}
				} ]
		};
}

		
	}).controller('myWorklistCtrl',function($scope, $compile, $timeout, $http, lookupService, errorMessageModel, 
			staticDataService, myWorklistViewModel,dataServiceModel) {

		var loginUserKey = optumUI.getUser().getLoggedInUserKey();
		var loginUserKey = optumUI.getUser().getLoggedInUserKey();
		var requestedUserId = optumUI.getAuthUser();
		var vendorKey = optumUI.getUser().getDefaultVendorKey();
		var groupKey = optumUI.getUser().getCurrentGroupKey();
		var searchResults = [];
		var selectedChartIds = [];
		var apptIds = [];
		
		$scope.errorMessageModel = errorMessageModel;
		$scope.worklistViewModel = myWorklistViewModel;
		$scope.dataModel = dataServiceModel;
		$scope.dataModel.showCodingQAFiltersLoadingDialog = false;		
		$scope.showCodingQAMyWlistLoadingDialog = false;
		$scope.worklistViewModel.clearAll = function(){
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
		
		$scope.worklistViewModel.releaseToAssignment = function() {
			//release assignment
			if (selectedChartIds.length === 0) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Select atleast one record for releasing to assignment</span>';
				$scope.errorMessageModel.visible = true;
				return;
			}
			var obj = {
					toStatus : 'CREATED',
					requestedUserId : requestedUserId,
					loginUserKey : loginUserKey,
					chartIdList : selectedChartIds,
					busFunction : 6
			};
			$scope.showCodingQAMyWlistLoadingDialog = true;
			$http.post('/gcm-app-services/codingqa/worklist/releaseToAssignmentForCodingQA', obj).then(function(response) {
				selectedChartIds = [];
				$scope.showCodingQAMyWlistLoadingDialog = false;
				lookupService.filter();
				$scope.errorMessageModel.messageType = 'success';
				$scope.errorMessageModel.content = '<span>Successfully released to assignment</span>';
				$scope.errorMessageModel.visible = true;
			}, function(error) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Failed in releasing to assignment</span>';
				$scope.errorMessageModel.visible = true;
				$scope.showCodingQAMyWlistLoadingDialog = false;
			});
		}

		$scope.worklistViewModel.onChartIdClick = function(record){
			dataServiceModel.selectedChart = record;
			dataServiceModel.isReadOnly = false;
			lookupService.url = 'codingQAui.html';
		};
		
		$scope.worklistViewModel.onExport = function(filterCondition, initiateExport) {
			$scope.errorMessageModel.visible = false;
			$scope.initiateExport = initiateExport;

			staticDataService.query(filterCondition, searchResults, function(result) {
				$scope.initiateExport(result, 'My Worklist');
			});
		};

		$scope.worklistViewModel.onSelectAllRows = function(selectAll) {
			$scope.errorMessageModel.visible = false;
			var model = this;
			var availableRecords = model.records.slice();

			var selectedRecordIds = [];
			selectedChartIds = [];
			for (var i = 0; i < model.selectedRecords.length; i++){
				selectedRecordIds.push(model.selectedRecords[i].uniqueIndex);
				selectedChartIds.push(model.selectedRecords[i].chartId);
}
			for (var row = 0; row < availableRecords.length; row++) {
				var recordIndex = selectedRecordIds.indexOf(availableRecords[row].uniqueIndex);
				if (selectAll) {
					availableRecords[row].selected = true;
					if (recordIndex < 0){
						model.selectedRecords.push(availableRecords[row]);
						selectedChartIds.push(availableRecords[row].chartId);}
						
				} else {
					if (availableRecords[row].selected) {
						model.selectedRecords.splice(recordIndex, 1);
						selectedChartIds.splice(recordIndex, 1);
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
			$scope.errorMessageModel.visible = false;
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
					selectedChartIds.push(record.chartId);}
			} else {
				model.selectedRecords.splice(recordIndex, 1);
				selectedChartIds.splice(recordIndex, 1);
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
			$scope.errorMessageModel.visible = false;
			clearSort();
		}

		function clearSort(){
			angular.forEach($scope.worklistViewModel.columns,function(col){
				col.sortOrder = 0;
			});
			//apply default sort on Chart ID column
			$scope.worklistViewModel.columns[1].sortOrder = 1;
			$scope.errorMessageModel.visible = false;
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
					busFuncKey		: 6,
					busSegment		: lookupService.filters.busSegment,
					status 			: lookupService.filters.status ? lookupService.filters.status : '0',
					projectKey		: lookupService.filters.projectKey,
					programKey		: lookupService.filters.program,
					clientKey		: lookupService.filters.client,
					hpKey			: lookupService.filters.hp,
					hpProduct		: lookupService.filters.hpp,
					vendorKey		: lookupService.filters.organization,
					chartId 		: lookupService.filters.chartId,
					isCompleted		: 'WORKLIST'
			};
			
			$scope.dataModel.showCodingQAFiltersLoadingDialog = true;
			$http.post('/gcm-app-services/coding/worklist/getMyCodingWorklist', obj).then(function(respose) {
				selectedChartIds = [];
				$scope.dataModel.showCodingQAFiltersLoadingDialog = false;
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
				$scope.dataModel.showCodingQAFiltersLoadingDialog = false;
			});

		};

		lookupService.clear = function() {

			lookupService.filters.busSegment = '';
			lookupService.filters.projectKey = '';
			lookupService.filters.client = '';
			lookupService.filters.hp = '';
			lookupService.filters.hpp = '';
			lookupService.filters.program = '';
			lookupService.filters.status = '';
			if(lookupService.filters.vendors.length==1)
				lookupService.filters.organization =lookupService.filters.vendors[0].key;
			else
				lookupService.filters.organization ='';
			clearTableData();
			$scope.errorMessageModel.visible = false;
		}
		
		lookupService.clear();

	}).controller('availableWorkItemsCtrl',function($scope, $compile, $timeout, $http, lookupService, errorMessageModel, 
			staticDataService, availableWorkItemsViewModel,dataServiceModel) {

		var loginUserKey = optumUI.getUser().getLoggedInUserKey();
		$scope.loginUserKey = optumUI.getUser().getLoggedInUserKey();
		$scope.vendorKey = optumUI.getUser().getDefaultVendorKey();
		$scope.groupKey = optumUI.getUser().getCurrentGroupKey();
		var requestedUserId = optumUI.getAuthUser();
		var searchResults = [];
		var selectedChartIds = [];
		var apptIds = [];

		$scope.errorMessageModel = errorMessageModel;
		$scope.worklistViewModel = availableWorkItemsViewModel;
		$scope.dataModel = dataServiceModel;
		$scope.dataModel.showCodingQAFiltersLoadingDialog = false;
		$scope.showCodingQAAvlWlistLoadingDialog = false;

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
			}
			else {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Select atleast one record to clear the selected items</span>';
				$scope.errorMessageModel.visible = true;
			}
		};
		
		$scope.worklistViewModel.addToMyWorklist = function(){
			$scope.errorMessageModel.visible = false;
			if (selectedChartIds.length === 0) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Select atleast one record for adding to worklist</span>';
				$scope.errorMessageModel.visible = true;
				return;
			}
			var obj = {
					toStatus : 'ASSIGNED',
					requestedUserId : requestedUserId,
					loginUserKey : loginUserKey,
					chartIdList : selectedChartIds,
					busFunction : 6
			};
			$scope.showCodingQAAvlWlistLoadingDialog = true;
			$http.post('/gcm-app-services/codingqa/worklist/codingQAAddtoMyWorkList', obj).then(function(response) {
				
				$scope.showCodingQAAvlWlistLoadingDialog = false;
				if(response.data.status=="ERROR")
				{
					$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>'+response.data.errorMessage+'</span>';
				$scope.errorMessageModel.visible = true;
				}
					else{
						selectedChartIds = [];
				lookupService.filter();
				$scope.errorMessageModel.messageType = 'success';
				$scope.errorMessageModel.content = '<span>Successfully added to worklist</span>';
				$scope.errorMessageModel.visible = true;
					}
			}, function(error) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Failed in adding to worklist</span>';
				$scope.errorMessageModel.visible = true;
				$scope.showCodingQAAvlWlistLoadingDialog = false;
			});
		};
		
		$scope.worklistViewModel.onExport = function(filterCondition, initiateExport) {
			$scope.errorMessageModel.visible = false;
			$scope.initiateExport = initiateExport;

			staticDataService.query(filterCondition, searchResults, function(result) {
				$scope.initiateExport(result, 'Available Work Items');
			});
		};

		$scope.worklistViewModel.onChange = function(filterCondition) {
			$scope.errorMessageModel.visible = false;
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
		
		$scope.worklistViewModel.onSelectAllRows = function(selectAll) {
			$scope.errorMessageModel.visible = false;
			var model = this;
			var availableRecords = model.records.slice();

			var selectedRecordIds = [];
			selectedChartIds = [];
			for (var i = 0; i < model.selectedRecords.length; i++){
				selectedRecordIds.push(model.selectedRecords[i].uniqueIndex);
				selectedChartIds.push(model.selectedRecords[i].chartId);
}
			for (var row = 0; row < availableRecords.length; row++) {
				var recordIndex = selectedRecordIds.indexOf(availableRecords[row].uniqueIndex);
				if (selectAll) {
					availableRecords[row].selected = true;
					if (recordIndex < 0){
						model.selectedRecords.push(availableRecords[row]);
						selectedChartIds.push(availableRecords[row].chartId);}
						
				} else {
					if (availableRecords[row].selected) {
						model.selectedRecords.splice(recordIndex, 1);
						selectedChartIds.splice(recordIndex, 1);
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

$scope.errorMessageModel.visible = false;
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
					selectedChartIds.push(record.chartId);}
			} else {
				model.selectedRecords.splice(recordIndex, 1);
				selectedChartIds.splice(recordIndex, 1);
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

		function clearTableData() {
			$scope.errorMessageModel.visible = false;
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
			// apply default sort on Chart ID column
			$scope.worklistViewModel.columns[1].sortOrder = 1;
			$scope.errorMessageModel.visible = false;
		}

		lookupService.filter = function() {
			$scope.errorMessageModel.visible = false;
			if(lookupService.fromDateCalendarViewModel.invalid || lookupService.throughDateCalendarViewModel.invalid) 
				return;

			if (lookupService.filters.fromDate != '' && lookupService.filters.fromDate != null && lookupService.filters.throughDate != ''
				&& lookupService.filters.throughDate != null && (lookupService.filters.fromDate > lookupService.filters.throughDate)) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>From date cannot be beyond through date</span>';
				$scope.errorMessageModel.visible = true;
				return;
			} else if (lookupService.filters.fromDate != '' && lookupService.filters.fromDate != null && lookupService.filters.throughDate != ''
				&& lookupService.filters.throughDate != null
				&& (lookupService.filters.fromDate > new Date() || lookupService.filters.throughDate > new Date())) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Date cannot be beyond current date</span>';
				$scope.errorMessageModel.visible = true;
				return;
			}
			var vendorKey = lookupService.filters.organization ? lookupService.filters.organization : $scope.vendorKey;
			var obj = {
					loginUserKey : loginUserKey,
					vendorKey : vendorKey,
					busFuncKey : 6,
					busSegment : lookupService.filters.busSegment,
					projectKey : lookupService.filters.projectKey,
					clientKey : lookupService.filters.client,
					hpKey : lookupService.filters.hp,
					hpProduct : lookupService.filters.hpp,
					recordCount : lookupService.filters.noOfCharts,
					fromUserKey : lookupService.filters.user,
					programKey : lookupService.filters.program,
					acceptedFromDate : (lookupService.filters.fromDate !== '') ? lookupService.getDateAsString(lookupService.filters.fromDate) : lookupService.filters.fromDate,
					acceptedToDate : (lookupService.filters.throughDate !== '') ? lookupService.getDateAsString(lookupService.filters.throughDate) : lookupService.filters.throughDate
			};

			if ((obj.acceptedFromDate == null || obj.acceptedFromDate.trim() === '') && (obj.acceptedToDate == null || obj.acceptedToDate.trim() === '')) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>From/To date is mandatory</span>';
				$scope.errorMessageModel.visible = true;
				return;
			}else if(obj.acceptedToDate == null || obj.acceptedToDate.trim() === ''){
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>To date is mandatory</span>';
				$scope.errorMessageModel.visible = true;
				return;
			}else if(obj.acceptedFromDate == null || obj.acceptedFromDate.trim() === ''){
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>From date is mandatory</span>';
				$scope.errorMessageModel.visible = true;
				return;
			}
			
			clearTableData();
			$scope.dataModel.showCodingQAFiltersLoadingDialog = true;
			$http.post('/gcm-app-services/codingqa/worklist/getCodingQAAvailableWorkItems', obj).then(function(respose) {
				selectedChartIds = [];
				$scope.dataModel.showCodingQAFiltersLoadingDialog = false;
				searchResults = respose.data.result;
				angular.forEach(searchResults, function(obj, idx) {
					obj.uniqueIndex = idx + 1;
				});
				$scope.worklistViewModel.records = searchResults;
				$scope.worklistViewModel.totalRecordsCount = searchResults.length;

				$scope.worklistViewModel.onLoad(true);
			}, function(error) {
				$scope.dataModel.showCodingQAFiltersLoadingDialog = false;
			});

		};

		lookupService.clear = function() {

			lookupService.filters.busSegment = '';
			lookupService.filters.projectKey = '';
			lookupService.filters.client = '';
			lookupService.filters.hp = '';
			lookupService.filters.hpp = '';
			lookupService.filters.program = '';
			lookupService.filters.noOfCharts = '100';
			lookupService.filters.user = '';
			lookupService.fromDateCalendarViewModel.dateText = '';
			lookupService.fromDateCalendarViewModel.invalid = false;
			lookupService.throughDateCalendarViewModel.dateText = '';
			lookupService.throughDateCalendarViewModel.invalid = false;
			lookupService.filters.fromDate = '';
			lookupService.filters.throughDate = '';
			clearTableData();
			$scope.errorMessageModel.visible = false;
		}
		
		lookupService.clear();

	}).controller('completedWorkItemsCtrl',function($scope, $compile, $timeout, $http, lookupService, errorMessageModel, 
			staticDataService, completedWorkItemsViewModel,dataServiceModel) {

		var searchResults = [];
		var loginUserKey = optumUI.getUser().getLoggedInUserKey();
		var requestedUserId = optumUI.getAuthUser();
		var vendorKey = optumUI.getUser().getDefaultVendorKey();
		var groupKey = optumUI.getUser().getCurrentGroupKey();
		
		$scope.errorMessageModel = errorMessageModel;
		$scope.worklistViewModel = completedWorkItemsViewModel;
		$scope.dataModel = dataServiceModel;
		$scope.dataModel.showCodingQAFiltersLoadingDialog = false;

		$scope.worklistViewModel.onExport = function(filterCondition, initiateExport) {
			$scope.initiateExport = initiateExport;

			staticDataService.query(filterCondition, searchResults, function(result) {
				$scope.initiateExport(result, 'Completed Work Items');
			});
		};

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
		
		$scope.worklistViewModel.onChartIdClick = function(record){
			$scope.errorMessageModel.visible = false;
			dataServiceModel.selectedChart = record;
			dataServiceModel.isReadOnly = true;
			lookupService.url = 'codingQAui.html';
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
			//apply default sort on Chart ID column
			$scope.worklistViewModel.columns[0].sortOrder = 1;
			$scope.errorMessageModel.visible = false;
		}

		lookupService.filter = function() {
			$scope.errorMessageModel.visible = false;
			if(lookupService.fromDateCalendarViewModel.invalid || lookupService.throughDateCalendarViewModel.invalid) 
				return;
			
			if(lookupService.filters.acceptedDate === '4'){
				if (lookupService.filters.fromDate != '' && lookupService.filters.fromDate != null
						&& lookupService.filters.throughDate != '' && lookupService.filters.throughDate != null
						&& (lookupService.filters.fromDate > lookupService.filters.throughDate)) {
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>From date cannot be beyond through date</span>';
					$scope.errorMessageModel.visible = true;
					return;
				}else if (lookupService.filters.fromDate != '' && lookupService.filters.fromDate != null
						&& lookupService.filters.throughDate != '' && lookupService.filters.throughDate != null
						&& (lookupService.filters.fromDate > new Date() || lookupService.filters.throughDate > new Date())){
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>Date cannot be beyond current date</span>';
					$scope.errorMessageModel.visible = true;
					return;
				}
			}
			
			var obj = {
					loginUserKey	: loginUserKey,
					loginUserId		: requestedUserId,
					groupKey		: groupKey,
					roleCode		: rootData.currentRole ? rootData.currentRole : '',
					isAssigned 		: 1,
					busFuncKey		: 6,
					busSegment		: lookupService.filters.busSegment,
					status 			: lookupService.filters.status ? lookupService.filters.status : '0',
					projectKey		: lookupService.filters.projectKey,
					programKey		: lookupService.filters.program,
					clientKey		: lookupService.filters.client,
					hpKey			: lookupService.filters.hp,
					hpProduct		: lookupService.filters.hpp,
					vendorKey		: lookupService.filters.organization,
					chartId 		: lookupService.filters.chartId,
					isCompleted		: 'COMPLETED',
					acceptedFromDate : (lookupService.filters.acceptedDate === '4' && lookupService.filters.fromDate !== '') ? lookupService.getDateAsString(lookupService.filters.fromDate) : lookupService.filters.fromDate,
					acceptedToDate : (lookupService.filters.acceptedDate === '4' && lookupService.filters.throughDate !== '') ? lookupService.getDateAsString(lookupService.filters.throughDate) : lookupService.filters.throughDate
			};

			if ((obj.acceptedFromDate == null || obj.acceptedFromDate.trim() === '') && (obj.acceptedToDate == null || obj.acceptedToDate.trim() === '')) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>From/Through date is mandatory</span>';
				$scope.errorMessageModel.visible = true;
				return;
			}else if(obj.acceptedToDate == null || obj.acceptedToDate.trim() === ''){
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Through date is mandatory</span>';
				$scope.errorMessageModel.visible = true;
				return;
			}else if(obj.acceptedFromDate == null || obj.acceptedFromDate.trim() === ''){
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>From date is mandatory</span>';
				$scope.errorMessageModel.visible = true;
				return;
			}
			
			clearTableData();
			$scope.dataModel.showCodingQAFiltersLoadingDialog = true;
			$http.post('/gcm-app-services/coding/worklist/getMyCodingWorklist', obj).then(function(respose) {
				$scope.dataModel.showCodingQAFiltersLoadingDialog = false;
				searchResults = respose.data.result;
				angular.forEach(searchResults, function(obj, idx) {
					obj.uniqueIndex = idx + 1;
				});
				$scope.worklistViewModel.records = searchResults;
				$scope.worklistViewModel.totalRecordsCount = searchResults.length;

				$scope.worklistViewModel.onLoad(true);
			}, function(error) {
				$scope.dataModel.showCodingQAFiltersLoadingDialog = false;
			});

		};

		lookupService.clear = function() {

			lookupService.filters.busSegment = '';
			lookupService.filters.projectKey = '';
			lookupService.filters.client = '';
			lookupService.filters.hp = '';
			lookupService.filters.hpp = '';
			lookupService.filters.program = '';
			lookupService.filters.program = '';
			lookupService.filters.acceptedDate = '0';
			lookupService.fromDateCalendarViewModel.dateText = '';
			lookupService.fromDateCalendarViewModel.invalid = false;
			lookupService.throughDateCalendarViewModel.dateText = '';
			lookupService.throughDateCalendarViewModel.invalid = false;
			lookupService.filters.fromDate = '';
			lookupService.filters.throughDate = '';
			lookupService.onAcceptedDateChange();
			clearTableData();
			$scope.errorMessageModel.visible = false;
		}
		
		lookupService.clear();

	});
