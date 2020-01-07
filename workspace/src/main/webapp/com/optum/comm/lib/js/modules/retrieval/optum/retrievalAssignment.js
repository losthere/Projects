
var optRetModule = angular.module("retrieval-assignment-app", [ 'looup-data', 'uitk.component.uitkDynamicTable', 'uitk.component.uitkIconFont',
		'ngSanitize', 'uitk.component.uitkMessage', 'uitk.uitkUtility', 'staticDataService', 'projectInfoModel', 'uitk.component.uitkDialog',
		'uitk.component.uitkButton', 'uitk.component.uitkTextField', 'uitk.component.uitkTextarea' ])
optRetModule.directive('filterDirective', function() {
	return {
		restrict : 'E',
		templateUrl : 'retrievalAssignmentFilters.html'
	};
});
optRetModule.factory("dataServiceModel", function() {
	var dataObj = {};
	return dataObj;
});
var completeStatues = ['RECVD','INACTIVATED','DUPLICATE','CANCELED','PNPFINAL','CNAFINAL','SENT'];

optRetModule.controller('retrievalAssignmentCtrl', function($scope, $compile, $timeout, $http, lookupService, errorMessageModel, staticDataService,
		projectInfoModel, projectSubInfoModel, dataServiceModel) {

	$scope.searchResults = [];
	$scope.projectTableModel = projectInfoModel;
	$scope.projectTableModel.onExport=false;
	$scope.projectSubTableModel = projectSubInfoModel;
	$scope.projectSubTableModel.columns = $scope.projectTableModel.subColumns.slice();
	$scope.showLoadingDialog = false;
	$scope.showAssignFiltersLoadingDialog = false;
	
	$scope.dataModel = dataServiceModel;

	$scope.projectTableModel.actionEnabled = true;
	
	$scope.barCodes = {
		value : ''
	};
	$scope.cancelReason = {
		value : ''
	};
	$scope.projectTableModel.selectedHealthPlanId = '';
	$scope.projectTableModel.selectedHealthPlanRecord = {};
	$scope.assignAmount = {
		type : 'All',
		selectedVendor : '',
		totalBarcodes : 0
	};
	$scope.selectedVendor = '';
	$scope.lookupService = lookupService;
	$scope.errorMessageModel = errorMessageModel;
	$scope.successMessageModel = {
		id : 'success-message',
		messageType : 'success',
		content : '',
		visible : false,
		messageRole : 'alertdialog',
		ariaAttributes : true,
		headingLevel : '2'
//		messageVisibleTime : '5000'
	};

	lookupService.isFromOptRet = true;
	/*
	 * lookupService.businessSegments(); lookupService.getProjectYears();
	 */

	$scope.projectTableModel.onSelectAllRows = function(selectAll) {

		var model = this;
		var availableRecords = model.records.slice();

		var selectedRecordIds = [];
		for (var i = 0; i < model.selectedRecords.length; i++)
			selectedRecordIds.push(model.selectedRecords[i].uniqueIndex);

		for (var row = 0; row < availableRecords.length; row++) {

			var recordIndex = selectedRecordIds.indexOf(availableRecords[row].uniqueIndex);
			if (selectAll) {
				availableRecords[row].selected = true;
				if (recordIndex < 0)
					model.selectedRecords.push(availableRecords[row]);
			} else {
				if (availableRecords[row].selected) {
					model.selectedRecords.splice(recordIndex, 1);
					selectedRecordIds.splice(recordIndex, 1);
					availableRecords[row].selected = false;
				}
			}
		}
		this.selectedRecordCount = this.selectedRecords.length;
	}

	$scope.projectTableModel.onRowCheck = function(event, record, selected) {
		var model = this;
		var recordIndex = -1;
		for (var i = 0; i < model.selectedRecords.length; i++) {
			if (model.selectedRecords[i].uniqueIndex === record.uniqueIndex)
				recordIndex = i;
		}

		if (selected) {
			if (recordIndex < 0)
				model.selectedRecords.push(record);
		} else {
			model.selectedRecords.splice(recordIndex, 1);
		}

		this.selectedRecordCount = this.selectedRecords.length;

	}

	$scope.projectTableModel.onRowSelect = function(event, record, selected) {
		/*
		 * if(event && event.target && event.target.type === "checkbox"){
		 * return; }
		 */
		var model = this;
		$scope.errorMessageModel.visible = false;
		/*
		 * if (typeof selected === 'undefined') { if (typeof event !==
		 * 'undefined' && (event.target.tagName === 'A' || event.target.tagName
		 * === 'INPUT')) return; if (typeof event === 'undefined' ||
		 * event.target.tagName === 'SELECT' || event.target.tagName ===
		 * 'OPTION') { record.selected = true; selected = true; } else {
		 * record.selected = !record.selected; selected = record.selected; } }
		 * 
		 * if (!selected && model.selectAllChecked) model.selectAllChecked =
		 * false;
		 * 
		 * var recordIndex = -1; for (var i = 0; i <
		 * model.selectedRecords.length; i++) { if
		 * (model.selectedRecords[i].uniqueIndex === record.uniqueIndex)
		 * recordIndex = i; }
		 * 
		 * if (selected) { if (recordIndex < 0)
		 * model.selectedRecords.push(record); } else {
		 * model.selectedRecords.splice(recordIndex, 1); }
		 * 
		 * var availableRecords = model.records; var allSelected = true;
		 * 
		 * for (var i = 0; i < availableRecords.length; i++) { if
		 * (!availableRecords[i].selected) { allSelected = false; break; } }
		 * if(availableRecords.length > 0){ model.selectAllChecked =
		 * allSelected; }
		 * 
		 * this.selectedRecordCount = this.selectedRecords.length;
		 */

		if (-1 === $scope.projectTableModel.expandedRowIndex || record.uniqueIndex === $scope.projectTableModel.expandedRowIndex) {
			$scope.projectTableModel.expandedRowIndex = record.uniqueIndex;
			$scope.projectTableModel.orgRecords[record.uniqueIndex].open = !$scope.projectTableModel.orgRecords[record.uniqueIndex].open;
			if (!$scope.projectTableModel.orgRecords[record.uniqueIndex].open) {
				$scope.projectTableModel.expandedRowIndex = -1;
				$scope.expandedRow = {};
			} else {
				if (!$scope.projectTableModel.orgRecords[record.uniqueIndex].selected && record.currentState == null) {
					$scope.projectTableModel.orgRecords[record.uniqueIndex].selected = true;
					$scope.projectTableModel.selectedRecords.push($scope.projectTableModel.orgRecords[record.uniqueIndex]);
					$scope.projectTableModel.selectedRecordCount = $scope.projectTableModel.selectedRecords.length;
				}
				$scope.projectTableModel.readProjectDetails(record);
				//$scope.projectTableModel.readAssignableVendorsForHPnClient();
			}
		} else {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>Collapse the open row before expanding another row.</span>';
			$scope.errorMessageModel.visible = true;
		}
	}

	/*
	 * $scope.projectTableModel.openStatusCount = function(index){
	 * $scope.selectedStatusCntIndex = index; }
	 */

	$scope.projectTableModel.getModel = function(record, index) {
		$scope.open = true;
		$scope.projectSubTableModel.componentId = 'projectDetails' + index;
		$scope.projectSubTableModel.id = 'projectDetails' + index;
		$scope.projectSubTableModel.isRealVendor = record.isRealVendor;
		return $scope.projectSubTableModel;
	}

	$scope.projectTableModel.onChange = function(filterCondition) {
		var that = this;
		$scope.projectTableModel.expandedRowIndex=-1;
		$scope.expandedRow = {};
		staticDataService.query(filterCondition, $scope.searchResults, function(result) {
			that.records = result.records;
			that.totalRecordsCount = result.totalRecordsCount;

			// Add this code snippet for Select All Functionality
			var allSelected = true;
			for (var rowIndex = 0; rowIndex < that.records.length; rowIndex++) {
				if (!(that.records[rowIndex].selected)) {
					allSelected = false;
					break;
				}
			}
			if (that.records.length > 0)
				that.selectAllChecked = allSelected;
		});
	};

	/*$scope.projectTableModel.onExport = function(filterCondition, initiateExport) {
		$scope.initiateExport = initiateExport;

		staticDataService.query(filterCondition, $scope.projectTableModel.records, function(result) {
			$scope.initiateExport(result, 'OptumRetrievalAssignment');
		});
		//$scope.initiateExport($scope.projectTableModel.records, 'OptumRetrievalAssignment_1');		
	};*/

	$scope.projectSubTableModel.onRowSelect = function(event, record) {

		$scope.projectTableModel.selectedHealthPlanId = record.uniqueIndex;
		$scope.projectTableModel.selectedHealthPlanRecord = record;
		if (event && event.target && event.target.type == 'radio') {
			angular.forEach($scope.projectSubTableModel.records, function(obj, idx) {
				obj.enabled = true;
			});
			record.enabled = false;
			$scope.projectTableModel.readAssignableVendorsForHPnClient();
		}
	}

	$scope.projectSubTableModel.openStatusCount = function(index) {
		$scope.showStatusCountDialog = !$scope.showStatusCountDialog;
		$scope.selectedStatusCntIndex = index;
	}

	$scope.getStatusCount = function() {
		if (angular.isArray($scope.projectTableModel.selectedHealthPlanRecord.statusCountObj)) {
			return $scope.projectTableModel.selectedHealthPlanRecord.statusCountObj;
		} else {
			var statusCnts = [];
			statusCnts.push($scope.projectTableModel.selectedHealthPlanRecord.statusCountObj);
			return statusCnts;
		}
	}

	function reqParams(params) {
		var queryParams = "";
		for ( var key in params) {
			queryParams += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
		}
		return queryParams;
	}

	var config = {
		headers : {
			'Content-Type' : 'application/x-www-form-urlencoded'
		}
	};

	$scope.loginUserKey = optumUI.getUser().getLoggedInUserKey();
	$scope.vendorKey = optumUI.getUser().getDefaultVendorKey();
	$scope.groupKey = optumUI.getUser().getCurrentGroupKey();
	/*
	 * $scope.loginUserKey = 11; $scope.vendorKey = 1; $scope.groupKey = 3;
	 */

	function clearTableData() {
		$scope.searchResults = [];
		$scope.projectTableModel.records = [];
		$scope.projectTableModel.totalRecordsCount = 0;
		$scope.projectTableModel.selectedRecords = [];
		$scope.projectTableModel.selectedRecordCount = 0;
		$scope.projectTableModel.pagination.currentPageNumber = 1;
		$scope.projectTableModel.pagination.currentPageNumberInView = 1;
		$scope.projectTableModel.pagination.pageNumberError = false;
		$scope.projectTableModel.selectAllChecked = false;
		$scope.projectTableModel.selectedHealthPlanId = '';
		$scope.projectTableModel.selectedHealthPlanRecord = {};
		$scope.barCodes.value = '';
		$scope.cancelReason.value = '';
		if ($scope.projectSubTableModel) {
			$scope.projectSubTableModel.records = [];
			$scope.projectSubTableModel.totalRecordsCount = 0;
			$scope.projectSubTableModel.selectedRecords = [];
			$scope.projectSubTableModel.selectedRecordCount = 0;
		}
		clearSort();
	}

	function clearSort() {
		$scope.projectTableModel.columns[1].sortOrder = 1;
	}

	$scope.projectTableModel.displayAssignDialog = function() {
		$scope.errorMessageModel.visible = false;
		if ($scope.projectTableModel.selectedRecords.length > 0 || $scope.projectTableModel.selectedHealthPlanId != '') {
			var totalBarCodes = 0;
			for(var i = 0; i <  $scope.projectTableModel.selectedRecords.length; i++){
				var record = $scope.projectTableModel.selectedRecords[i];
				totalBarCodes += parseInt(record.barcodeCnt);
			}
			$scope.assignAmount.totalBarcodes = totalBarCodes;
			$scope.assignAmount.type = 'All';
			$scope.assignAmount.selectedVendor = '';
			$scope.assignAmount.quantityVal = '';
			$scope.projectTableModel.readAssignableVendors();
			$scope.showAssignDialog = true;
		} else {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>Select record to assign</span>';
			$scope.errorMessageModel.visible = true;
		}
	}

	$scope.projectTableModel.displayReleaseDialog = function() {
		$scope.errorMessageModel.visible = false;
		if (lookupService.filters.chartRequestStatus && lookupService.filters.chartRequestStatus != 'NEW') {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>Search with valid business status to release the barcodes.</span>';
			$scope.errorMessageModel.visible = true;
			return;
		}
		if ($scope.projectTableModel.selectedRecords.length > 0) {
			$scope.showReleaseDialog = true;
		} else {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>Select record to release</span>';
			$scope.errorMessageModel.visible = true;
		}
	}

	$scope.projectTableModel.displayExtractDialog = function(type) {
		$scope.errorMessageModel.visible = false;
		if ($scope.projectTableModel.selectedRecords.length > 0) {
			$scope.showExtractDialog = true;
			$scope.extractType = type;
		} else {
			$scope.errorMessageModel.messageType = 'error';
			if (type == 'Send')
				$scope.errorMessageModel.content = '<span>Select record to Send Extract</span>';
			else
				$scope.errorMessageModel.content = '<span>Select record to Review Extract</span>';
			$scope.errorMessageModel.visible = true;
		}
	}

	$scope.projectTableModel.displayCancelDialog = function() {
		$scope.errorMessageModel.visible = false;
		if ($scope.projectTableModel.selectedRecords.length > 0) {
			$scope.showCancelDialog = true;
		} else {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>Select record to Cancel</span>';
			$scope.errorMessageModel.visible = true;
		}
	}

	$scope.projectTableModel.displayInactivateDialog = function() {
		$scope.errorMessageModel.visible = false;
		if ($scope.projectTableModel.selectedRecords.length > 0) {
			$scope.showInactivateDialog = true;
		} else {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>Select record to Inactivate</span>';
			$scope.errorMessageModel.visible = true;
		}
	}

	$scope.projectTableModel.displayCancelBarcodesDialog = function() {
		$scope.errorMessageModel.visible = false;
		if ($scope.projectTableModel.selectedRecords.length > 0) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>Not required to select records to Cancel Barcodes</span>';
			$scope.errorMessageModel.visible = true;
		} else {
			if (!$scope.cancelReasons || $scope.cancelReasons.length == 0) {
				readCancelReasons();
			}
			$scope.dataModel.selectedCancelReason = "";
			$scope.dataModel.barcodesToCancel = '';
			$scope.showCancelBarcodesDialog = true;
		}
	}

	function readCancelReasons() {
		$scope.errorMessageModel.visible = false;
		$http.post('/gcm-app-services/masterdata/reasonCodes', reqParams({
			reasonType : "CANCELLED",
			busFuncKey : 4
		}), config).then(function(response) {
			$scope.cancelReasons = response.data.result;
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>Error retrieving cancel reasons</span>';
			$scope.errorMessageModel.visible = true;
		});
	}

	$scope.retrievalSearchFilter = {};
	$scope.retrievalSearchProviderFilter = {};
	
	var enableDisableActions = function(){
		$scope.projectTableModel.actionEnabled = true;
		if(completeStatues.indexOf(lookupService.filters.chartRequestStatus) >= 0 ){
			$scope.projectTableModel.actionEnabled = false;
		}
	}

	lookupService.filter = function() {
		$scope.errorMessageModel.visible = false;
		$scope.projectTableModel.expandedRowIndex = -1;
		if (lookupService.filters.busSegment == '') {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>Business segment is mandatory.</span>';
			$scope.errorMessageModel.visible = true;
			return;
		} else if (lookupService.filters.projectYear == null) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>Project year is mandatory.</span>';
			$scope.errorMessageModel.visible = true;
			return;
		} else {
			$scope.errorMessageModel.visible = false;
			if (lookupService.filters.chartRequestStatus == 1 && (lookupService.filters.user == undefined || lookupService.filters.user == "")) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>User is mandatory.</span>';
				$scope.errorMessageModel.visible = true;
				return;
			}

			clearTableData();
			var busFuncDtlKey = 1;
			$scope.retrievalSearchProviderFilter = {
				provState : lookupService.filters.providerState, // Provider
																	// State
				provLastName : lookupService.filters.providerLastName, // Provider
																		// Last
																		// Name
			}

			$scope.retrievalSearchFilter = {
				busSegment : lookupService.filters.busSegment, // Business
																// Segment
				programKey : lookupService.filters.program, // Project Type
				projectKey : lookupService.filters.projectId ? lookupService.filters.projectId : lookupService.filters.projectKey, // Project Name
				projYear : lookupService.filters.projectYear, // Project Year
				clientKey : lookupService.filters.client, // Health Plan
				hpKey : lookupService.filters.hp, // Health Plan Name
				hpProduct : lookupService.filters.hpp, // Health Plan Product
				status : lookupService.filters.chartRequestStatus, // Chart Request Status
				vendorKey : lookupService.filters.vendor, // Vendor Name
				providerFilter : $scope.retrievalSearchProviderFilter, // Provider details
				programsByUser : optumUI.getAuthUser(),
				groupKey : optumUI.user.currentGroupKey
			};

			$scope.projectSubTableModel.vendorList = [];
			$scope.showAssignFiltersLoadingDialog = true;
			$http.post('/gcm-app-services/retrieval/projects', $scope.retrievalSearchFilter).then(function(respose) {
				$scope.showAssignFiltersLoadingDialog = false;
				var searchResults = respose.data.result;
				angular.forEach(searchResults, function(obj, idx) {
					obj.uniqueIndex = idx;
				});
				$scope.searchResults = searchResults.slice();
				$scope.projectTableModel.records = $scope.searchResults;
				$scope.projectTableModel.orgRecords = $scope.searchResults;
				$scope.projectTableModel.totalRecordsCount = searchResults.length;
				$scope.projectTableModel.onLoad(true);
				enableDisableActions();
			}, function(error) {
				$scope.showAssignFiltersLoadingDialog = false;
			});
		}
	};

	lookupService.clearTableData = function() {
		clearTableData();
	}

	lookupService.clear = function() {

		lookupService.filters.busSegment = 'MCARE';
		lookupService.filters.program = '';
		lookupService.filters.projectKey = '';
		lookupService.filters.projectId = '';
		lookupService.filters.client = '';
		lookupService.filters.hp = '';
		lookupService.filters.hpp = '';
		lookupService.filters.providerState = '';
		lookupService.filters.providerLastName = '';
		lookupService.filters.chartRequestStatus = '';
		lookupService.filters.vendor = '';
		lookupService.filters.chartRequestStatus = "";
		clearTableData();
		$scope.projectTableModel.actionEnabled = true;
		$scope.errorMessageModel.visible = false;
		lookupService.filters.projectYear = '' + lookupService.projectYears[0];
	}
	$scope.setBusSegment = function(){
		lookupService.filters.busSegment = 'MCARE';
	}
	$scope.setBusSegment();
	$scope.assignableVendorList = [];

	$scope.projectTableModel.readAssignableVendors = function() {
		var projectDetails = '';

		$scope.projectTableModel.selectedRecords.forEach(function(project) {
			projectDetails += project.projKey + ',' + project.programKey + ',' + (project.vendorKey == '0' ? '' : project.vendorKey) + ';';
			// $scope.assignambeQty += parseInt(project.barcodeCnt);
		});

		$scope.assignableVendors = [];
		$scope.showAssignFiltersLoadingDialog = true;
		var assinableVendorInp = {
			projDetails : projectDetails,
			businessSegment : lookupService.filters.busSegment
		}
		$http.post('/gcm-app-services/retrieval/getAssignableVendors', assinableVendorInp).then(function(respose) {
			$scope.showAssignFiltersLoadingDialog = false;
			var searchResults = respose.data.result;
			$scope.assignableVendorList = searchResults;
			//$scope.projectSubTableModel.clientVendorList = searchResults;
		}, function(error) {
			$scope.showAssignFiltersLoadingDialog = false;
		});
	}

	$scope.projectSubTableModel.clientVendorList = [];
	$scope.projectTableModel.readAssignableVendorsForHPnClient = function(project) {

		var project = $scope.expandedRow;
		// $scope.projectTableModel.selectedRecords

		var assinableVendorInp = {
			projDetails : '',
			businessSegment : lookupService.filters.busSegment,
			userKey : $scope.loginUserKey,
			groupKey : $scope.groupKey,
			vendorKey : $scope.vendorKey,
			projKey : project.projKey,
			programKey : project.programKey,
			recVendorKey : project.vendorKey,
			hpKey : $scope.projectTableModel.selectedHealthPlanRecord.hpKey,
			clientKey : $scope.projectTableModel.selectedHealthPlanRecord.clientKey
		}
		$http.post('/gcm-app-services/retrieval/getAssignableVendorsByHPnClient', assinableVendorInp).then(function(respose) {
			$scope.showAssignFiltersLoadingDialog = false;
			$scope.projectSubTableModel.clientVendorList = [];
			var searchResults = respose.data.result;
			for(var i=0; i < searchResults.length; i ++){
				if(searchResults[i].key != $scope.expandedRow.vendorKey){
					$scope.projectSubTableModel.clientVendorList.push(searchResults[i]);
				}
			}
		}, function(error) {
			$scope.showAssignFiltersLoadingDialog = false;
		});
	}

	$scope.expandedRow = {};
	$scope.projectTableModel.readProjectDetails = function(record) {
		$scope.expandedRow = record;
		$scope.retrievalSearchFilter = {
			busSegment : lookupService.filters.busSegment, // Business Segment
			programKey : record.programKey, // Project Type
			projectKey : record.projKey, // Project Name
			projYear : record.projYear, // Project Year
			clientKey : lookupService.filters.client, // Health Plan
			hpKey : lookupService.filters.hp, // Health Plan Name
			hpProduct : lookupService.filters.hpp, // Health Plan Product
			status : lookupService.filters.chartRequestStatus?lookupService.filters.chartRequestStatus:'INITIAL', // Chart Request Status
			vendorKey : record.vendorKey, // Vendor Name
			providerFilter : $scope.retrievalSearchProviderFilter, // Provider details
			programsByUser : optumUI.getAuthUser()
		};
		$scope.projectSubTableModel.records = [];
		$scope.projectSubTableModel.totalRecordsCount = 0;
		$scope.projectSubTableModel.vendorList = [];
		$http.post('/gcm-app-services/retrieval/getDetailCountByProject', $scope.retrievalSearchFilter).then(function(respose) {
			if (respose && respose.data && respose.data.status == 'SUCCESS') {
				$scope.projectSubTableModel.records = respose.data.result;
				angular.forEach($scope.projectSubTableModel.records, function(obj, idx) {
					if($scope.projectSubTableModel.isRealVendor != 'Y'){
						obj.vendorKey = '';
						obj.vendor = 'Select';
					}
					obj.uniqueIndex = idx;
					obj.statusCnt = obj.assignableCount;
					obj.status = record.currentState;
					$scope.projectSubTableModel.clientVendorList.push({
						key : obj.vendorKey,
						value : obj.vendor
					})
					obj.enabled = true;
				});
				$scope.projectSubTableModel.totalRecordsCount = $scope.projectSubTableModel.records.length;
			/*	$scope.projectSubTableModel.vendorList.push({
					key : '3',
					value : 'Optum'
				});
				$scope.projectSubTableModel.vendorList.push({
					key : 'Ciox',
					value : 'Ciox'
				});*/
			}
		}, function(error) {
			$scope.showAssignFiltersLoadingDialog = false;
		});
	}

	var prepareProjectDetailsForAction = function(action) {
		$scope.projectDetails = [];
		for (var i = 0; i < $scope.projectTableModel.selectedRecords.length; i++) {
			var selectedProject = $scope.projectTableModel.selectedRecords[i];
			selectedProject.currentState = action;
			var projectObj = {
				busSegment : lookupService.filters.busSegment, // Business Segment
				programKey : selectedProject.programKey, // Project Type
				projectKey : selectedProject.projKey, // Project Name
				projYear : selectedProject.projYear, // Project Year
				clientKey : lookupService.filters.client, // Health Plan
				hpKey : lookupService.filters.hp, // Health Plan Name
				hpProduct : lookupService.filters.hpp, // Health Plan Product
				status : lookupService.filters.chartRequestStatus, // Chart Request Status
				vendorKey : selectedProject.vendorKey, // Vendor Name
				providerFilter : $scope.retrievalSearchProviderFilter, // Provider details
				programsByUser : optumUI.getAuthUser()
			};
			$scope.projectDetails.push(projectObj);
		}
	}
	
	$scope.projectTableModel.validateRealVendor = function() {
		for (var i = 0; i < $scope.projectTableModel.selectedRecords.length; i++) {
			var selectedProject = $scope.projectTableModel.selectedRecords[i];
			if (selectedProject.isRealVendor == 'N')
				return false;
		}
		return true;
	}

	var prepareProjDtlforAssignByHp = function(action, hpVendCnt) {
		$scope.projectDetails = [];
		var selectedProject = $scope.expandedRow;
		selectedProject.currentState = action;
		hpVendCnt.status = action;
		var projectObj = {
			busSegment : lookupService.filters.busSegment, // Business Segment
			programKey : selectedProject.programKey, // Project Type
			projectKey : selectedProject.projKey, // Project Name
			projYear : selectedProject.projYear, // Project Year
			clientKey : lookupService.filters.client, // Health Plan
			hpKey : hpVendCnt.hpKey, // Health Plan Name
			hpProduct : lookupService.filters.hpp, // Health Plan Product
			status : lookupService.filters.chartRequestStatus, // Chart Request
																// Status
			vendorKey : selectedProject.vendorKey, // Vendor Name
			providerFilter : $scope.retrievalSearchProviderFilter, // Provider
																	// details
			programsByUser : optumUI.getAuthUser()
		};
		$scope.projectDetails.push(projectObj);
	}

	var clearProjectSelectionAfterAction = function() {
		for (var i = 0; i < $scope.projectTableModel.selectedRecords.length; i++) {
			$scope.projectTableModel.selectedRecords[i].selected = false;
		}
		$scope.projectTableModel.selectedRecords = [];
		$scope.projectTableModel.selectedRecordCount = 0;
	}

	$scope.releaseChart = function() {
		prepareProjectDetailsForAction('Release');
		$scope.projectDetails.status = $scope.projectDetails.status ? $scope.projectDetails.status : null; 
		$http.post('/gcm-app-services/retrieval/release', $scope.projectDetails).then(function(respose) {
			// $scope.showAssignFiltersLoadingDialog = true;
			$scope.showReleaseDialog = false;
			// lookupService.filter();
			clearProjectSelectionAfterAction();
			$scope.setSuccessMessage('<span>Process initiated and upon completion, a status email will be sent.</span>');
			$scope.showAssignFiltersLoadingDialog = false;
		}, function(error) {
			$scope.setErrorMessage('<span>Error occured while releasing selected project(s).</span>');
			$scope.showAssignFiltersLoadingDialog = false;
		});
	}
	
	var isValidAssignRequest = function(newVendor){
	    var flag = true;
	    var errorMsg = "Project(s) ";
	    for(var i = 0;i < $scope.projectTableModel.selectedRecords.length;i++){
	       var selectedRow = $scope.projectTableModel.selectedRecords[i];
	       var oldVendor = selectedRow.vendorKey;
	       var projKey = selectedRow.projKey;
	       if(oldVendor == newVendor){
	           errorMsg += projKey + ', ';
	           flag = false;
	       }
	    }
	    if(!flag){
	    	var errorMsg = "Vendor update failed.  Selected vendor must be different than the current vendor.";
			$scope.setErrorMessage('<span>'+errorMsg+'</span>');
	    }
	    return flag;
	  }
	
	$scope.assignVendor = function() {
		var assignQty = $scope.assignAmount.quantityVal;
		if(assignQty){
			assignQty = assignQty.trim();
		}
		if ($scope.assignAmount.type == 'Small' && 
			(!assignQty || parseInt(assignQty) <= 0 || parseInt(assignQty) > parseInt($scope.assignAmount.totalBarcodes))) {
			$scope.setErrorMessage('<span>Enter the valid small quantity.</span>');
			return;
		}
		if (!$scope.assignAmount.selectedVendor) {
			$scope.setErrorMessage('<span>Select valid vendor.</span>');
			return;
		}
		if(!isValidAssignRequest($scope.assignAmount.selectedVendor)){
			return;
		}
		prepareProjectDetailsForAction('Assign');
		var assignVendorInp = {
			retrievalSearchFilter : $scope.projectDetails,
			newVendorKey : $scope.assignAmount.selectedVendor,
			assignQty : $scope.assignAmount.quantityVal,
			loggedInUser : optumUI.getAuthUser()
		}
		$http.post('/gcm-app-services/retrieval/assignVendors', assignVendorInp).then(function(respose) {
			// $scope.showAssignFiltersLoadingDialog = true;
			$scope.showAssignDialog = false;
			clearProjectSelectionAfterAction();;
			$scope.assignAmount.quantityVal = '';
			$scope.setSuccessMessage('<span>Process initiated and upon completion, a status email will be sent.</span>');
			$scope.showAssignFiltersLoadingDialog = false;
		}, function(error) {
			$scope.setErrorMessage('<span>Error occured while assigning selected project(s).</span>');
			$scope.showAssignFiltersLoadingDialog = false;
		});
	}

	$scope.projectSubTableModel.assignVendorByHp = function(hpVendCnt) {
		if(hpVendCnt.enabled) {
			$scope.setErrorMessage("<span>Please enter a valid 'Assigned Count' value.</span>");
			return;
		}else if(!validateStatusCnt(hpVendCnt)){
			$scope.setErrorMessage("<span>Please enter a valid 'Assigned Count' value.</span>");
			return;
		}else if(!validateSelectedVendor(hpVendCnt)){
			$scope.setErrorMessage("<span>Please select a vendor to assign</span>");
			return;
		}
		prepareProjDtlforAssignByHp('Assign', hpVendCnt);
		var assignVendorInt = {
			retrievalSearchFilter : $scope.projectDetails,
			newVendorKey : hpVendCnt.vendorKey,
			assignQty : hpVendCnt.statusCnt,
			loggedInUser : optumUI.getAuthUser()
		}

		$http.post('/gcm-app-services/retrieval/assignVendors', assignVendorInt).then(function(respose) {
			// $scope.showAssignFiltersLoadingDialog = true;
			$scope.showAssignFiltersLoadingDialog = true;
			$scope.showAssignDialog = false;
			$scope.setSuccessMessage('<span>Process initiated and upon completion, a status email will be sent.</span>');
			$scope.showAssignFiltersLoadingDialog = false;
		}, function(error) {
			$scope.setErrorMessage('<span>Error occured while assigning selected record(s).</span>');
			$scope.showAssignFiltersLoadingDialog = false;
		});
	}
	
	var validateStatusCnt = function(hpVendCnt) {
		var regex = new RegExp(/^[0-9]/);
		if (hpVendCnt.statusCnt && regex.test(hpVendCnt.statusCnt) && hpVendCnt.statusCnt != 0 && hpVendCnt.assignableCount >= hpVendCnt.statusCnt){
			return true;
		}
		return false;
	}
	
	var validateSelectedVendor = function(hpVendCnt) {
		if (hpVendCnt.vendorKey){
			return true;
		}
		return false;
	}

	$scope.extractByNew = function() {
		if ($scope.extractType == 'Send') {
			var message = '<span>Send Extract request initiated successfully.</span>';
			sendExtract(false, message);
		} else {
			var message = '<span>Review Extract request initiated successfully.</span>';
			reviewExtract(false, message);
		}
	}

	$scope.extractByAll = function() {
		if ($scope.extractType == 'Send') {
			var message = '<span>Send Extract request initiated successfully.</span>';
			sendExtract(true, message);
		} else {
			var message = '<span>Review Extract request initiated successfully.</span>';
			reviewExtract(true, message);
		}
	}

	var prepareInputForExtract = function(action, isAll, isReviewExtract) {
		$scope.projectDetails = [];
		for (var i = 0; i < $scope.projectTableModel.selectedRecords.length; i++) {
			var selectedProject = $scope.projectTableModel.selectedRecords[i];
			selectedProject.currentState = action;
			var projectObj = {
				busSegment : lookupService.filters.busSegment, // Business
																// Segment
				programKey : selectedProject.programKey, // Project Type
				projectKey : selectedProject.projKey, // Project Name
				projYear : selectedProject.projYear, // Project Year
				clientKey : lookupService.filters.client, // Health Plan
				hpKey : lookupService.filters.hp, // Health Plan Name
				hpProduct : lookupService.filters.hpp, // Health Plan Product
				status : lookupService.filters.chartRequestStatus, // Chart
																	// Request
																	// Status
				vendorKey : selectedProject.vendorKey, // Vendor Name
				providerFilter : $scope.retrievalSearchProviderFilter, // Provider
																		// details
				programsByUser : optumUI.getAuthUser()
			};
			if (!isAll && !lookupService.filters.chartRequestStatus) {
				projectObj.status = 'RELEASED';
			}
			if (!isAll && isReviewExtract) {
				projectObj.status = 'EXTNEW';
			}
			$scope.projectDetails.push(projectObj);
		}
	}

	var sendExtract = function(isAll, message) {
		prepareInputForExtract("send", isAll, false);
		$http.post('/gcm-app-services/retrieval/sendExtract', $scope.projectDetails).then(function(respose) {
			var errorMessage = respose.data.errorMessage;
			if(errorMessage && errorMessage != ""){
				$scope.setErrorMessage("<span>Extract to vendor process failed.  Barcodes in a 'Released' status not present for this project.</span>");
			//	$scope.setErrorMessage("<span>Extract to vendor process failed.  Barcodes in a 'Released' status not present for this project " + errorMessage + ".</span>");
				for (var i = 0; i < $scope.projectTableModel.selectedRecords.length; i++) {
					$scope.projectTableModel.selectedRecords[i].currentState = null;
				}
			}else{
				$scope.setSuccessMessage(message);	
			}
			// $scope.showAssignFiltersLoadingDialog = true;
			$scope.showExtractDialog = false;
			clearProjectSelectionAfterAction();
			$scope.showAssignFiltersLoadingDialog = false;
		}, function(error) {
			$scope.setErrorMessage('<span>Error occured while send extract selected project(s).</span>');
			$scope.showAssignFiltersLoadingDialog = false;
		});
	}

	var reviewExtract = function(isAll, message) {
		prepareInputForExtract("review", isAll, true);
		$http.post('/gcm-app-services/retrieval/reviewExtract', $scope.projectDetails).then(function(respose) {
			var errorMessage = respose.data.errorMessage;
			if(errorMessage && errorMessage != ""){
				$scope.setErrorMessage("<span>Review Extract process failed.  Barcodes in a 'New/Released' status not present for this project.</span>");
				for (var i = 0; i < $scope.projectTableModel.selectedRecords.length; i++) {
					$scope.projectTableModel.selectedRecords[i].currentState = null;
				}
			}else{
				$scope.setSuccessMessage(message);	
			}
			// $scope.showAssignFiltersLoadingDialog = true;
			$scope.showExtractDialog = false;
			clearProjectSelectionAfterAction();
			$scope.showAssignFiltersLoadingDialog = false;
		}, function(error) {
			$scope.setErrorMessage('<span>Error occured while review extract selected project(s).</span>');
			$scope.showAssignFiltersLoadingDialog = false;
		});
	}

	$scope.cancelChart = function() {
		prepareProjectDetailsForAction('Cancel');
		$http.post('/gcm-app-services/retrieval/cancel', $scope.projectDetails).then(function(respose) {
			// $scope.showAssignFiltersLoadingDialog = true;
			clearProjectSelectionAfterAction();
			$scope.showCancelDialog = false;
			$scope.setSuccessMessage('<span>Process initiated and upon completion, a status email will be sent.</span>');
			$scope.showAssignFiltersLoadingDialog = false;
		}, function(error) {
			$scope.setErrorMessage('<span>Error occured while cancelling selected project(s).</span>');
			$scope.showAssignFiltersLoadingDialog = false;
		});
	}

	$scope.inactivateChart = function() {
		prepareProjectDetailsForAction('Inactivate');
		$http.post('/gcm-app-services/retrieval/inactivate', $scope.projectDetails).then(function(respose) {
			$scope.showInactivateDialog = false;
			clearProjectSelectionAfterAction();
			$scope.setSuccessMessage('<span>Process initiated and upon completion, a status email will be sent.</span>');
			$scope.showAssignFiltersLoadingDialog = false;
		}, function(error) {
			$scope.setErrorMessage('<span>Error occured while inactivating selected project(s).</span>');
			$scope.showAssignFiltersLoadingDialog = false;
		});
	}
	
	$scope.dataModel.selectedCancelReason = "";
	
	$scope.clearBarcodes = function() {
		$scope.dataModel.barcodesToCancel = "";
	}
	
	$scope.cancelBarcodes = function() {
		var barcodes = $scope.dataModel.barcodesToCancel;
		if(!$scope.dataModel.selectedCancelReason){
			var errorMessage = '<span>Select valid reason code.</span>';
			$scope.setErrorMessage(errorMessage);
			return;
		}
		if(!barcodes){
			var errorMessage = '<span>Barcodes are required.</span>';
			$scope.setErrorMessage(errorMessage);
			return;
		}else
		{
			barcodes = barcodes.trim();
			if(barcodes.charAt(barcodes.length-1)==";")
			{
				barcodes = barcodes.substring(0,barcodes.length-1);
			}
		}
		var barcodeArr = barcodes.split(';');
		var trimBarcodestr = '';
		for (var barcode in barcodeArr) {
			var barcodeRegEx = new RegExp(
					/^[0-9A-Z]{10}$/);
			if (!barcodeRegEx.test(barcodeArr[barcode].trim())) {
				$scope.setErrorMessage("<span>Enter valid list of Barcodes.</span>");
				return;
			}else{
				trimBarcodestr += barcodeArr[barcode].trim()+";";
			}
		}
		if (barcodeArr.length > 100) {
			$scope.setErrorMessage("<span>Maximum 100 barcodes allowed to cancel.</span>");
			return;
		}
		
		barcodes = trimBarcodestr;
		var cancelBarcodesInfo = {
				barcodes	: barcodes,
				reasonCode	: $scope.dataModel.selectedCancelReason,
				userId		: optumUI.getAuthUser(),
				userKey		: $scope.loginUserKey,
				groupKey	: $scope.groupKey
		}
		
		$http.post('/gcm-app-services/retrieval/cancelBarcodes', cancelBarcodesInfo).then(function(response) {
			var errorMessage = response.data.errorMessage;
			if(errorMessage.indexOf("SUCCESS") < 0){
				var errorMessage = response.data.errorMessage;
				$scope.setErrorMessage("<span>"+errorMessage+".</span>");
			}else{
				$scope.showInactivateDialog = false;
				clearProjectSelectionAfterAction();
				$scope.showCancelBarcodesDialog = false;
				$scope.setSuccessMessage("<span>"+errorMessage+".</span>");
			}
		}, function(error) {
			var errorMessage = '<span>Error occured while Cancelling Barcode(s).</span>';
			$scope.setErrorMessage(errorMessage);
			$scope.showAssignFiltersLoadingDialog = false;
		});
	}
	
	$scope.setSuccessMessage = function(successMessage){
		$scope.errorMessageModel.visible = false;
		$scope.successMessageModel.content = successMessage;
		$scope.successMessageModel.visible = true;
	}
	
	$scope.setErrorMessage = function(errorMessage){
		$scope.errorMessageModel.messageType = 'error';
		$scope.errorMessageModel.content = errorMessage;
		$scope.errorMessageModel.visible = true;
	}
});
