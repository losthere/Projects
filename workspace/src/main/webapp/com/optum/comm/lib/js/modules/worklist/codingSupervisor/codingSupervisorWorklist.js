var CordysRoot = window.parent;
var rootData = window.parent.rootData;
var loginUserKey = optumUI.getUser().getLoggedInUserKey();
var requestedUserId = optumUI.getAuthUser();
var vendorKey = optumUI.getUser().getDefaultVendorKey();
var groupKey = optumUI.getUser().getCurrentGroupKey();
var codingSupervisorWorkListModule = angular.module("codingSupervisorWorklistApp",[ 'looup-data', 'uitk.component.uitkDynamicTable', 'uitk.component.uitkIconFont', 'ngSanitize', 'uitk.component.uitkMessage',
	'staticDataService', 'codingSupervisorWorklistViewModel', 'uitk.component.uitkPanel','uitk.component.tabs',	'uitk.component.uitkTextField','codingUIApp'])
	codingSupervisorWorkListModule.factory("dataServiceModel", function() {
		var dataObj = {};
		dataObj.selectedChart = {};
		return dataObj;
	});
	codingSupervisorWorkListModule.controller('codingSupervisorWorklistCtrl',function($scope, $compile, $timeout, $http, lookupService, errorMessageModel, dataServiceModel) {
		var CordysRoot = window.parent;
		$scope.dataModel = dataServiceModel;
		$scope.dataModel.showCodingSupFiltersLoadingDialog = false;
		//to change the view on clicking chartID, starts here
		$scope.lookupService = lookupService;
		$scope.url = 'codingSupervisorWorklisttabs.html';
		
		$scope.$watch('lookupService.url',function(newVal,oldVal){
			if(newVal !== '')
				$scope.url = lookupService.url;
			if($scope.url == 'codingSupervisorWorklisttabs.html')
				$scope.showWorklist = true;
			else
				$scope.showWorklist = false;
		});
		//to change the view on clicking chartID, ends here
		
		$scope.errorMessageModel = errorMessageModel;
		
		if(!lookupService.filters.organization){
			if(!lookupService.filters.vendors || lookupService.filters.vendors.length <= 0)
				lookupService.filters.vendors = rootData.getVendorsByRole(rootData.currentRole);
			if(lookupService.filters.vendors.length==1){
				lookupService.filters.organization = lookupService.filters.vendors[0].key;
			}
		}
		$scope.codingSupervisorWorklistFilters = {
				id : 'worklistFilterPanel',
				title : 'Filters',
				templateUrl : '../../retrieval/assignment/filters.html',
				open : true,
				collapsible : true
		};

		$scope.codingSupervisorWorklistTabsModel = {
				selectedIndex : 0,
				id : 'codingSupervisorWorklistTabs',
				ariaLabel : 'Coding Escalation Worklist',
				eventsEnable : true,
				tabs : [ {
					title : 'My Worklist',
					templateurl : 'myworklist.html',
					callback : function(event, tabData) {
						lookupService.filters.currentTab = 'codingSupervisorMyWorklist';
						if(lookupService.filters.vendors.length==1)
						lookupService.filter();
					}
				}, {
					title : 'Available Work Items',
					templateurl : 'availableworkitems.html',
					callback : function(event, tabData) {
						lookupService.filters.currentTab = 'codingSupervisorAvailableWorkItems';
						if(lookupService.filters.vendors.length==1)
						lookupService.filter();
					}
				}, {
					title : 'Completed Work Items',
					templateurl : 'completedworkitems.html',
					callback : function(event, tabData) {
						lookupService.filters.currentTab = 'codingSupervisorCompletedWorkItems';
						if(lookupService.filters.vendors.length==1)
						lookupService.filter();
					}
				} ]
		};
	});
	codingSupervisorWorkListModule.controller('myWorklistCtrl',function($scope, $compile, $timeout, $http, lookupService, errorMessageModel, 
			staticDataService, myWorklistViewModel, dataServiceModel) {
		var CordysRoot = window.parent;
		$scope.dataModel = dataServiceModel;
		$scope.dataModel.showCodingSupFiltersLoadingDialog = false;
		/*var loginUserKey = optumUI.getUser().getLoggedInUserKey();
		var requestedUserId = optumUI.getAuthUser();
		var vendorKey = optumUI.getUser().getDefaultVendorKey();
		var groupKey = optumUI.getUser().getCurrentGroupKey();*/
		var searchResults = [];
		var selectedChartIds = [];
		
		$scope.errorMessageModel = errorMessageModel;
		$scope.worklistViewModel = myWorklistViewModel;
		$scope.dataModel.showCodingSupMyWlistLoadingDialog = false;

		$scope.worklistViewModel.releaseToAvailableItems = function() {
			//release assignment
			$scope.errorMessageModel.visible = false;
			if (selectedChartIds.length === 0) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Select atleast one record for releasing to available items.</span>';
				$scope.errorMessageModel.visible = true;
				return;
			}
			var obj = {
					toStatus : 'CREATED',
					requestedUserId : requestedUserId,
					loginUserKey : loginUserKey,
					chartIdList : selectedChartIds,
					busFunction : 2
			};
			$scope.dataModel.showCodingSupMyWlistLoadingDialog = true;
			$http.post('/gcm-app-services/coding/worklist/releaseToAvailableItemsForCodingSupervisor', obj).then(function(response) {
				$scope.dataModel.showCodingSupMyWlistLoadingDialog = false;
				lookupService.filter();
				$scope.errorMessageModel.messageType = 'success';
				$scope.errorMessageModel.content = '<span>Successfully released to assignment.</span>';
				$scope.errorMessageModel.visible = true;
			}, function(error) {
				$scope.dataModel.showCodingSupMyWlistLoadingDialog = false;
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Failed in releasing to assignment.</span>';
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
}
			for (var row = 0; row < availableRecords.length; row++) {
				var recordIndex = selectedRecordIds.indexOf(availableRecords[row].uniqueIndex);
				if (selectAll) {
					availableRecords[row].selected = true;
					if (recordIndex < 0){
						model.selectedRecords.push(availableRecords[row]);
						selectedChartIds.push(availableRecords[row].chartId);
						}
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
					}
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
			$scope.dataModel.isSupervisorUI = true;
			$scope.dataModel.isReadonly = false;
		};
		
		$scope.dataModel.showAgreeDisagree = function(){
			return dataServiceModel.selectedChart.escalationReasonCode != 'GCM10';
		}

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
			//apply default sort on Chart ID column
			$scope.worklistViewModel.columns[1].sortOrder = 1;
		}

		lookupService.filter = function() {

			clearTableData();
			$scope.errorMessageModel.visible = false;
		
				if(!lookupService.filters.organization )
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
					isCompleted		: 'WORKLIST',
					acceptedFromDate : '',
					acceptedToDate : ''
			};
			
			$scope.dataModel.showCodingSupFiltersLoadingDialog = true;
			$http.post('/gcm-app-services/coding/worklist/getCodingSupervisorMyWorkList', obj).then(function(respose) {
				$scope.dataModel.showCodingSupFiltersLoadingDialog = false;
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
				$scope.dataModel.showCodingSupFiltersLoadingDialog = false;
			});

		};

		lookupService.clear = function() {
			lookupService.filters.busSegment = '';
			lookupService.filters.projectKey = '';
			lookupService.filters.client = '';
			lookupService.filters.hp = '';
			lookupService.filters.hpp = '';
			lookupService.filters.chartId = '';
			lookupService.filters.status = '';
			if(lookupService.filters.vendors.length==1)
				lookupService.filters.organization =lookupService.filters.vendors[0].key;
			else
				lookupService.filters.organization ='';
			clearTableData();
			$scope.errorMessageModel.visible = false;
		}
		
		lookupService.clear();

	});
	codingSupervisorWorkListModule.controller('availableWorkItemsCtrl',function($scope, $compile, $timeout, $http, lookupService, errorMessageModel, 
			staticDataService, availableWorkItemsViewModel,dataServiceModel) {

		var loginUserKey = optumUI.getUser().getLoggedInUserKey();
		var requestedUserId = optumUI.getAuthUser();
		var searchResults = [];
		var selectedChartIds = [];
		$scope.dataModel = dataServiceModel;
		$scope.dataModel.showCodingSupFiltersLoadingDialog = false;
		$scope.dataModel.isInitialCall=true;
		$scope.errorMessageModel = errorMessageModel;
		$scope.worklistViewModel = availableWorkItemsViewModel;
		$scope.showCodingSupAvlWlistLoadingDialog = false;

		$scope.worklistViewModel.clearAll = function() {
			$scope.errorMessageModel.visible = false;
			if ($scope.worklistViewModel.selectedRecords.length > 0) {
				angular.forEach($scope.worklistViewModel.selectedRecords, function(obj) {
					obj.selected = false;
				});
				selectedChartIds = [];
				$scope.worklistViewModel.selectedRecords = [];
				$scope.worklistViewModel.selectedRecordCount = 0;
				$scope.worklistViewModel.selectAllChecked = false;
			} else {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Select atleast one record to clear the selected items.</span>';
				$scope.errorMessageModel.visible = true;
			}
		};
		
		$scope.worklistViewModel.addToMyWorklist = function(){
			$scope.errorMessageModel.visible = false;
			if (selectedChartIds.length === 0) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Select atleast one record for adding to worklist.</span>';
				$scope.errorMessageModel.visible = true;
				return;
			}
			var obj = {
					toStatus : 'ASSIGNED',
					requestedUserId : requestedUserId,
					loginUserKey : loginUserKey,
					chartIdList : selectedChartIds,
					busFunction : 2,
					fromUserKey : lookupService.filters.supervisor
			};
			$scope.showCodingSupAvlWlistLoadingDialog = true;
			$http.post('/gcm-app-services/coding/worklist/codingSupervisorAddToMyWorkList', obj).then(function(response) {
				$scope.showCodingSupAvlWlistLoadingDialog = false;
				lookupService.filter();
				$scope.errorMessageModel.messageType = 'success';
				$scope.errorMessageModel.content = '<span>Successfully added to worklist.</span>';
				$scope.errorMessageModel.visible = true;
			}, function(error) {
				$scope.showCodingSupAvlWlistLoadingDialog = false;
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Failed in adding to worklist.</span>';
				$scope.errorMessageModel.visible = true;
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
		}

		lookupService.filter = function() {
			$scope.errorMessageModel.visible = false;
			if (lookupService.filters.status == 1 && (lookupService.filters.supervisor == undefined || lookupService.filters.supervisor == "")) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>User is mandatory.</span>';
				$scope.errorMessageModel.visible = true;
				return;
			}
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
					isAssigned 		: lookupService.filters.status,
					busFuncKey		: 2,
					busSegment		: lookupService.filters.busSegment,
					status 			: lookupService.filters.status,
					projectKey		: lookupService.filters.projectKey,
					clientKey		: lookupService.filters.client,
					hpKey			: lookupService.filters.hp,
					hpProduct		: lookupService.filters.hpp,
					vendorKey		: lookupService.filters.organization,
					chartId 		: lookupService.filters.chartId,
					fromUserKey 	: lookupService.filters.supervisor,
					isCompleted		: '',
					acceptedFromDate : '',
					acceptedToDate : ''
			};
			$scope.dataModel.showCodingSupFiltersLoadingDialog = true;
			$http.post('/gcm-app-services/coding/worklist/getUnassignedCodingSupervisorWorkList', obj).then(function(respose) {
				$scope.dataModel.showCodingSupFiltersLoadingDialog = false;
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
				$scope.dataModel.showCodingSupFiltersLoadingDialog = false;
			});

		};

		lookupService.clear = function() {

			lookupService.filters.busSegment = '';
			lookupService.filters.projectKey = '';
			lookupService.filters.client = '';
			lookupService.filters.hp = '';
			lookupService.filters.hpp = '';
			lookupService.filters.chartId = '';
			lookupService.filters.supervisor = '';
			lookupService.filters.status = '';
			if(lookupService.filters.vendors.length==1)
				lookupService.filters.organization =lookupService.filters.vendors[0].key;
			else
				lookupService.filters.organization ='';
			clearTableData();
			$scope.errorMessageModel.visible = false;
		}
		
		lookupService.clear();

	});
	codingSupervisorWorkListModule.controller('completedWorkItemsCtrl',function($scope, $compile, $timeout, $http, lookupService, errorMessageModel, 
			staticDataService, completedWorkItemsViewModel,dataServiceModel) {

		var searchResults = [];
		var loginUserKey = optumUI.getUser().getLoggedInUserKey();
		
		$scope.errorMessageModel = errorMessageModel;
		$scope.worklistViewModel = completedWorkItemsViewModel;
		$scope.dataModel = dataServiceModel;
		$scope.worklistViewModel.onExport = function(filterCondition, initiateExport) {
			$scope.initiateExport = initiateExport;

			staticDataService.query(filterCondition, searchResults, function(result) {
				$scope.initiateExport(result, 'Completed Work Items');
			});
		};

		$scope.worklistViewModel.onChartIdClick = function(record) {
			dataServiceModel.selectedChart = record;
			lookupService.url = '../../coding/codingui.htm';
			$scope.dataModel.isSupervisorUI = true;
			$scope.dataModel.isReadonly = true;
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
		}

		lookupService.filter = function() {
			
			if(lookupService.fromDateCalendarViewModel.invalid || lookupService.throughDateCalendarViewModel.invalid) 
				return;
			
			if (lookupService.filters.acceptedDate === '4') {
				if (lookupService.filters.fromDate != '' && lookupService.filters.fromDate != null
						&& lookupService.filters.throughDate != '' && lookupService.filters.throughDate != null
						&& (lookupService.filters.fromDate > lookupService.filters.throughDate)) {
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>From Date can not be beyond Through Date.</span>';
					$scope.errorMessageModel.visible = true;
					return;
				}else if (lookupService.filters.fromDate != '' && lookupService.filters.fromDate != null
						&& lookupService.filters.throughDate != '' && lookupService.filters.throughDate != null
						&& (lookupService.filters.fromDate > new Date() || lookupService.filters.throughDate > new Date())){
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>Date can not be beyond Current Date.</span>';
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
					acceptedFromDate : (lookupService.filters.acceptedDate === '4' && lookupService.filters.fromDate !== '' && lookupService.filters.fromDate !== null) ? lookupService.getDateAsString(lookupService.filters.fromDate) : lookupService.filters.fromDate,
					acceptedToDate : (lookupService.filters.acceptedDate === '4' && lookupService.filters.throughDate !== '' && lookupService.filters.throughDate !== null) ? lookupService.getDateAsString(lookupService.filters.throughDate) : lookupService.filters.throughDate
			};
			
			if ((obj.acceptedFromDate == null || obj.acceptedFromDate.trim() === '') && (obj.acceptedToDate == null || obj.acceptedToDate.trim() === '')) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>From/Through Date is mandatory.</span>';
				$scope.errorMessageModel.visible = true;
				return;
			}else if(obj.acceptedToDate == null || obj.acceptedToDate.trim() === ''){
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Through Date is mandatory.</span>';
				$scope.errorMessageModel.visible = true;
				return;
			}else if(obj.acceptedFromDate == null || obj.acceptedFromDate.trim() === ''){
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>From Date is mandatory.</span>';
				$scope.errorMessageModel.visible = true;
				return;
			}
			
			clearTableData();
			$scope.dataModel.showCodingSupFiltersLoadingDialog = true;
			$http.post('/gcm-app-services/coding/worklist/getCodingSupervisorMyWorkList', obj).then(function(respose) {
				$scope.dataModel.showCodingSupFiltersLoadingDialog = false;
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
				$scope.dataModel.showCodingSupFiltersLoadingDialog = false;
			});

		};

		lookupService.clear = function() {

			lookupService.filters.busSegment = '';
			lookupService.filters.projectKey = '';
			lookupService.filters.client = '';
			lookupService.filters.hp = '';
			lookupService.filters.hpp = '';
			lookupService.filters.chartId = '';
			lookupService.filters.acceptedDate = '0';
			lookupService.fromDateCalendarViewModel.dateText = '';
			lookupService.fromDateCalendarViewModel.invalid = false;
			lookupService.throughDateCalendarViewModel.dateText = '';
			lookupService.throughDateCalendarViewModel.invalid = false;
			lookupService.filters.fromDate = '';
			lookupService.filters.throughDate = '';
			lookupService.onAcceptedDateChange();
			if(lookupService.filters.vendors.length==1)
				lookupService.filters.organization =lookupService.filters.vendors[0].key;
			else
				lookupService.filters.organization ='';
			clearTableData();
			$scope.errorMessageModel.visible = false;
		}
		
		lookupService.clear();

	});
