utilitymodule.controller("searchController", function($scope, $http, $compile, $filter, $timeout, lookupService, staticDataService,
		errorMessageModel, dataServiceModel) {
	
	$scope.uploadMessageModel = dataServiceModel;
	$scope.errorMessageModel = errorMessageModel;
	$scope.lookupService = lookupService;
	$scope.showSearchLoadingDialog = false;
	$scope.lookupService.isForUtility = true;
	//lookupService.getRegions();
	$scope.selectedCancelReason = {
		value : ''
	};
	$scope.cancelComment = {
		value : ''
	};
	//lookupService.filters.busSegment = '';

	var CordysRoot = window.parent;

	$scope.dataModel = dataServiceModel;
	$scope.dataModel.isInitialCall=true;
	CordysRoot.rootData.dataModel = dataServiceModel;

	/**
	 * To disable the links which are not in scope of current release. Have to remove this once these are implemented
	 */
	$scope.disable = function() {
		return false;
	}

	$scope.searchFilters = {
		id : 'searchFilterPanel',
		title : 'Filters',
		templateUrl : 'userFilters.htm',
		open : true,
		collapsible : true
	};

	var userObj = optumUI.getUser();
	$scope.loginUserKey = userObj.getLoggedInUserKey();
	$scope.vendorKey = 0; // userObj.getDefaultVendorKey();
	$scope.currentGroupKey = userObj.getCurrentGroupKey();
	$scope.loginUserId = optumUI.getAuthUser();

	$scope.showChartFileUploadDialog = false;
	$scope.showDuplicateDialog = false;
	$scope.showDuplicateChartDialog = false;
	
	if(!lookupService.filters.organization){
		if(!lookupService.filters.vendors || lookupService.filters.vendors.length <= 0)
			lookupService.filters.vendors = rootData.getVendorsByRole(rootData.currentRole);
		if(lookupService.filters.vendors.length==1){
			lookupService.filters.organization = lookupService.filters.vendors[0].key;
		}
		
	}
	$scope.basicSearchModel = {
		links : [ /*'<img class="img" src="../../comm/lib/images/upload.png"><a href="" ng-click="model.showUploadDialog()">Upload</a>',*/
			'<a href="" ng-click="model.showMultiDialogUpload()"><uitk:icon-font icon="cux-icon-upload"></uitk:icon-font> Upload</a>',
			'<a href="" ng-click="model.showCancelDialog()"><uitk:icon-font icon="cux-icon-remove"></uitk:icon-font> Cancel</a>',
			'<a href="" ng-click="model.showDuplicateDialog()"><uitk:icon-font icon="cux-icon-add2"></uitk:icon-font> Duplicate</a>'
			/*,'<img class="img" src="../../comm/lib/images/retrieval/assign.png"><a href="" ng-click="disable()" ng-class="disabled">Reassign</a>',
		  	'<a href="" ng-click="disable()" ng-class="disabled"><uitk:icon-font icon="cux-icon-calendar"></uitk:icon-font> Change Appt Date/Time</a>',
		  	'<a href="" ng-click="disable()" ng-class="disabled"><uitk:icon-font icon="cux-icon-export"></uitk:icon-font> Export All to CSV</a>'*/
		],
		pagination : {
			currentPageNumber : 1,
			currentPageNumberInView : 1,
			recordsPerPage : 10,
			recordsPerPageChoices : [ 10, 25, 50, 75, 100 ],
			showPaginationFooter : false,
			pageNumberError : false
		},
		columns : [
			{
				columnId : 'radio',
				layoutOrder : 1,
				resizable : false,
				sortable : false,
				style : "width: 1%;",
				align : "center",
				excludeFromExport : true,
				cellTemplate : '<input type="radio" id="{{record.index}}" name="AppRadio" ng-click="model.onRowSelect($event,record)"/>'
			},
			{
				columnId : 'chartId',
				label : 'Chart ID',
				layoutOrder : 2,
				sortable : true,
				sortOrder : 1,
				resizable : false,
				style : "width : 7%",
				cellTemplate : '<div ng-if="record.disableHyperLink1==true">' + '<span ng-bind="record.chartId"></span>' + '</div>'
						+ '<div ng-if="record.disableHyperLink1==false">'
						+ '<a href="" ng-click="model.checkAppointmentStatus(record)">{{record.chartId}}</a>' + '</div>'
			},
			{
				columnId : 'imageName',
				label : 'Image Name',
				layoutOrder : 2.5,
				sortable : true,
				resizable : false,
				style : "width : 8%",
				cellTemplate : '<span ng-bind="record.imageName"> </span>'
			},
			{
				columnId : 'busFunction',
				label : 'Business Function',
				layoutOrder : 3,
				sortable : true,
				resizable : false,
				style : "width : 8%",
				cellTemplate : '<span ng-bind="record.busFunction"> </span>'
			},
			{
				columnId : 'busFuncStatus',
				label : 'Status',
				layoutOrder : 4,
				sortable : true,
				resizable : false,
				style : "width : 7%",
				cellTemplate : '<span ng-bind="record.busFuncStatus"> </span>'
			},
			{
				columnId : 'provGroupName',
				label : 'Group Name',
				layoutOrder : 5,
				sortable : true,
				resizable : false,
				style : "width : 8%",
				cellTemplate : '<span ng-bind="record.provGroupName"> </span>'
			},
			{
				columnId : 'provName',
				label : 'Provider Name',
				layoutOrder : 6,
				sortable : true,
				resizable : false,
				style : "width : 10%",
				cellTemplate : '<span style="text-transform:capitalize" ng-bind="record.provName"></span>'
			},
			{
				columnId : 'memberName',
				label : 'Member Name',
				layoutOrder : 7,
				sortable : true,
				resizable : false,
				style : "width : 8%",
				cellTemplate : '<span ng-bind="record.memberName"/>'
			},
			{
				columnId : 'memberDOB',
				label : 'Member DOB',
				layoutOrder : 8,
				sortable : true,
				resizable : false,
				sortorder : 0,
				style : "width : 8%",
				cellTemplate : "<span ng-bind='record.memberDOB | date : \"MM-dd-yyyy\"'/>"
			},
			{
				columnId : 'memberGender',
				label : 'Gender',
				layoutOrder : 9,
				sortable : true,
				resizable : false,
				style : "width : 8%",
				cellTemplate : '<span ng-bind="record.memberGender"/>'
			},
			{
				columnId : 'assignedUser',
				label : 'Assigned To User',
				layoutOrder : 10,
				sortable : true,
				resizable : false,
				style : "width : 8%",
				cellTemplate : '<span ng-bind="record.assignedUser"/>'
			}
		],
		records : [],
		totalRecordsCount : 1,
		selectedRecordCount : 0,
		selectedRecords : [],
		modifiedSelectedRecords : [],
		onRowSelect : function(event, record) {
			$scope.basicSearchModel.chartId = record.chartId;
			$scope.basicSearchModel.selectedChart = record;
		},
		onChange : function(filterCondition) {
			var that = this;
			staticDataService.query(filterCondition, that.originalRecords, function(result) {
				that.records = result.records;
				that.totalRecordsCount = result.totalRecordsCount;
			});
		}
	}

	$scope.dataModel.dialogErrorMessageModel = {
			id : 'dialogError',
			messageType : 'error',
			visible : false,
			content : '',
			headingLevel : '2',
			closeButton : true	
	};
	
	$scope.dataModel.showDialogErrorMessage = function(content){
		$scope.dataModel.dialogErrorMessageModel.content = "<span>"+content+"</span>";
		$scope.dataModel.dialogErrorMessageModel.visible = true;
		$timeout(function () {
			$scope.dataModel.dialogErrorMessageModel.visible = false;
		}, 10000);
	}
	
	$scope.dataModel.clearDialogMessage = function(content){
			$scope.dataModel.dialogErrorMessageModel.visible = false;
	}
	
	lookupService.filter = function(message, messageType) {
		clearbasicSearchInfo();
		$scope.errorMessageModel.visible = false;
		if (!lookupService.filters.busSegment) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>Business segment is a required field</span>';
			$scope.errorMessageModel.visible = true;
			return;
		}
		var gender = '';
		if (lookupService.filters.memberGender == 'male') {
			gender = 'M';
		} else if (lookupService.filters.memberGender == 'female') {
			gender = 'F';
		} else if (lookupService.filters.memberGender == 'undefined') {
			gender = 'U';
		}
		if (lookupService.memberDOBViewModel.invalid)
			return;
		if (lookupService.filters.memberDOB){
			var futureDateFlag = lookupService.filters.memberDOB <= new Date();
			var memberDob = $filter('date')(lookupService.filters.memberDOB, "MM-dd-yyyy");
			var datePattern = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/
			var dateRegEx = new RegExp(datePattern);
			var invalidDateFlag = dateRegEx.test(memberDob);
			var month = memberDob.split('-')[0];
			var day = memberDob.split('-')[1];
			var year = memberDob.split('-')[2];
			if (!futureDateFlag || !invalidDateFlag || !isValidDate(year, month, day)) {
				var errorMessage = "Date Not Valid";
				$scope.errorMessageModel.content = '<span>' + errorMessage + '</span>';
				$scope.errorMessageModel.visible = true;
				return false;
			}
		}
		if(lookupService.filters.imageName)
			{
			var len= lookupService.filters.imageName.length;
		if(len<3){
			var errorMessage = "You must enter, at a minimum, the first three characters before clicking the Filter button";
			$scope.errorMessageModel.content = '<span>' + errorMessage + '</span>';
			$scope.errorMessageModel.visible = true;
			return false;
		}
	}
		$scope.basicSearchFilter = {
			busSegment : lookupService.filters.busSegment,
			region	   : lookupService.filters.region,
			projectKey : lookupService.filters.projectKey,
			memberId : lookupService.filters.memberId,
			memberFirstName : lookupService.filters.memberFirstName,
			memberLastName : lookupService.filters.memberLastName,
			memberGender : gender,
			memberDOB : memberDob,
			imageName: lookupService.filters.imageName,
			providerId : lookupService.filters.provId,
			provGroupName : lookupService.filters.provgrpNm,
			provFirstName : lookupService.filters.provFstNm,
			provLastName : lookupService.filters.provLastNm,
			clientInternalId : lookupService.filters.clientInternalId,
			chartId : lookupService.filters.chartId,
			isAssigned : '1',
			fromUserKey : $scope.loginUserKey,
			//vendorKey : lookupService.filters.organization,
			loginUserKey : $scope.loginUserKey,
			groupKey : $scope.currentGroupKey,
			projYear :  lookupService.filters.projYear,
			status : lookupService.filters.status
		};
		
			if(!lookupService.filters.region)
			{
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>Region is a required field.</span>';
				$scope.errorMessageModel.visible = true;
				return;
			}
			if (lookupService.filters.searchCategoryType.index === 0 || lookupService.filters.searchCategoryType.index === 1 || lookupService.filters.searchCategoryType.index === 2 || lookupService.filters.searchCategoryType.index === 3) {
				if (!lookupService.filters.projYear) {
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>Project Year is a required field</span>';
					$scope.errorMessageModel.visible = true;
					return;
					}
				}
		
		var searchResultsString = '';
		if (lookupService.filters.searchCategoryType.index == 0) {
			searchResultsString = '/gcm-app-services/utilities/project/getSearchResultsByMember';
		}
		if (lookupService.filters.searchCategoryType.index == 1) {
			searchResultsString = '/gcm-app-services/utilities/project/getSearchResultsByProvider';
		}
		if (lookupService.filters.searchCategoryType.index == 2) {
			searchResultsString = '/gcm-app-services/utilities/project/getSearchResultsByClientInternalId';
			if (lookupService.filters.clientInternalId == "" || lookupService.filters.clientInternalId == undefined || lookupService.filters.clientInternalId == null) {
				$scope.showErrorMessage('<span>Please provide Client Internal ID</span>');
				return;
			}
		}
		if (lookupService.filters.searchCategoryType.index == 3) {
			searchResultsString = '/gcm-app-services/utilities/project/getSearchResultsByChartId';
			if (lookupService.filters.chartId == "" || lookupService.filters.chartId == undefined || lookupService.filters.chartId == null) {
				$scope.showErrorMessage('<span>Please provide Chart ID</span>');
				return;
			}
		}
		$scope.showSearchLoadingDialog = true;
		$http.post(searchResultsString, $scope.basicSearchFilter).then(function(response) {
			$scope.showSearchLoadingDialog = false;
			if (message) {
				if (messageType == 'success') {
					$scope.showSuccessMessage(message);
				} else if (messageType = 'error') {
					$scope.showErrorMessage(messageType);
				}
			}
			if (response && response.data && response.data.result && response.data.result.length > 0) {
				$scope.searchResults = response.data.result;
				$scope.dataModel.chartId=[];
				angular.forEach($scope.searchResults, function(obj, idx) {
					$scope.dataModel.chartId.push($scope.searchResults[idx]["chartId"]);
					obj.index = idx;
				});
				$scope.basicSearchModel.records = $scope.searchResults.slice();
				$scope.basicSearchModel.originalRecords = $scope.searchResults.slice();
				$scope.basicSearchModel.totalRecordsCount = $scope.basicSearchModel.records.length;
				$scope.basicSearchModel.pagination.currentPageNumber = 1;
				$scope.basicSearchModel.pagination.currentPageNumberInView = 1;
				$scope.basicSearchModel.pagination.pageNumberError = false;
				$scope.basicSearchModel.pagination.recordsPerPage = 10;

				var obj = {
					recordsPerPage : $scope.basicSearchModel.pagination.recordsPerPage,
					pageNumber : 1,
					sortBy : [ $scope.basicSearchModel.columns[1].columnId ],
					sortOrder : [ 1 ]
				};
				$scope.basicSearchModel.onChange(obj);
				if ($scope.basicSearchModel.selectAllChecked) {
					$scope.basicSearchModel.selectAllChecked = false;
				}
				$scope.dataModel.retainSearchFilters = true;
			} else {
				clearbasicSearchInfo();
				if ($scope.basicSearchModel.selectAllChecked) {
					$scope.basicSearchModel.selectAllChecked = false;
				}
			}
			$scope.searchCategoryType = {
				index : 0
			};
		}, function(error) {
			$scope.showErrorMessage("<span>Error retrieving records</span>'");
		});
	}
	
	function isValidDate(year, month, day) {
		year = parseInt(year);
		if (day == 31 && (month == 4 || month == 6 || month == 9 || month == 11)) {
			return false; // 31st of a month with 30 days
		} else if (day >= 30 && month == 2) {
			return false; // February 30th or 31st
		} else if (month == 2 && day == 29 && !(year % 4 == 0 && (year % 100 != 0 || year % 400 == 0))) {
			return false; // February 29th outside a leap year
		} else {
			return true; // Valid date
		}
	}

	function clearbasicSearchInfo() {
		$scope.basicSearchModel.records = [];
		$scope.basicSearchModel.originalRecords = [];
		$scope.basicSearchModel.totalRecordsCount = 0;
		$scope.basicSearchModel.selectedRecords = [];
		$scope.basicSearchModel.selectedRecordCount = 0;
		$scope.basicSearchModel.pagination.currentPageNumber = 1;
		$scope.basicSearchModel.pagination.currentPageNumberInView = 1;
		$scope.basicSearchModel.pagination.pageNumberError = false;
		$scope.dataModel.retainSearchFilters = false;
	}

	lookupService.clear = function() {
		$scope.errorMessageModel.visible = false;
		lookupService.filters.busSegment = '';
		lookupService.filters.projectKey = '';
		lookupService.filters.memberId = '';
		lookupService.filters.memberFirstName = '';
		lookupService.filters.memberLastName = '';
		lookupService.filters.memberGender = '';
		lookupService.filters.memberDOB = '';
		lookupService.filters.provId = '';
		lookupService.filters.imageName='';
		lookupService.filters.provgrpNm = '';
		lookupService.filters.provFstNm = '';
		lookupService.filters.provLastNm = '';
		lookupService.filters.clientInternalId = '';
		lookupService.filters.chartId = '';
		lookupService.filters.user = '';
		lookupService.filters.projYear='';
		lookupService.filters.status='';
		if(lookupService.filters.regionsList.length > 1)
			lookupService.filters.region = '';
		$scope.basicSearchModel.chartId = '';
		$scope.basicSearchModel.selectedChart = '';
		if(lookupService.filters.vendors.length==1)
			lookupService.filters.organization =lookupService.filters.vendors[0].key;
		else
			lookupService.filters.organization =''
		clearSort();
		clearbasicSearchInfo();
	}
	

	function clearSort() {
		angular.forEach($scope.basicSearchModel.columns, function(col, idx) {
			col.sortOrder = 0;
		});
		if ($scope.basicSearchModel.columns && $scope.basicSearchModel.columns.length > 0)
			$scope.basicSearchModel.columns[1].sortOrder = 1;
	}

	$scope.basicSearchModel.showUploadDialog = function() {
		var disableUploadButton = false;
		var selectedChart = $scope.basicSearchModel.selectedChart;
		if (selectedChart) {
			if (selectedChart.busFuncKey != 4) {
				$scope.showErrorMessage('<span>File upload not allowed</span>');
				return;
			}
			if (selectedChart.busFuncStatus == 'Canceled' || selectedChart.busFuncStatus == 'Duplicate'
					|| selectedChart.busFuncStatus == 'Non-Retrievable' || selectedChart.busFuncStatus == 'Received'
					|| selectedChart.busFuncStatus == 'CNA') {
				disableUploadButton = true;
			}
			if (!disableUploadButton) {
				$("#chartFileId").val('');
				$scope.chartId = selectedChart.chartId;
				$scope.showChartFileUploadDialog = true;
				$scope.uploadMessageModel.showUploadError = false;
				$scope.uploadMessageModel.showFileSizeError = false;
				$scope.uploadMessageModel.showChartFileUploadButton = false;
				$scope.chartFile = '';
			} else {
				$scope.showErrorMessage('<span>File upload not allowed</span>');
			}
		} else {
			$scope.showErrorMessage('<span>Select chart Id to upload</span>');
		}
	}

	$scope.basicSearchModel.checkAppointmentStatus = function(record) {
		if (record.busFuncKey == 4) {
			// Retrieval Work item (based on the appointment and barcode status view image or view appointment/view pend appointment)
			if (record.busFuncStatus == "Received") {
				$scope.basicSearchModel.openImage(record);
			} else {
				var gcmRetAppointment = {
					barcode : record.chartId
				}
				$http.post('/gcm-app-services/scheduling/workflow/getApptDetailsByChartID', gcmRetAppointment).then(function(response) {
					if (response && response.data && response.data.result) {
						if (response && response.data && response.data.result) {
							var results = response.data.result;
							$scope.dataModel.apptStatus = response.data.result.apptStatus;
							if ($scope.dataModel.apptStatus == "PASTDUE" || $scope.dataModel.apptStatus == "SCHEDULED" ||  $scope.dataModel.apptStatus == "INPROGRESS") {
								$scope.uploadMessageModel.openViewAppointment(results);
								$scope.uploadMessageModel.showViewAppt = true;
								$scope.uploadMessageModel.showPend = false;

							} else if ($scope.dataModel.apptStatus == "PEND") {
								$scope.dataModel.openPendAppointment(results);
								$scope.uploadMessageModel.showPend = true;
								$scope.uploadMessageModel.showViewAppt = false;

							}
						}
					}

				}, function(error) {
					$scope.showErrorMessage('<span>Error while getting Appointment details</span>');

				});
			}
		} else {
			if (record.busFuncKey == 2) {
				if (record.busFuncStatus == "Completed" || record.busFuncStatus == "In Progress" || record.busFuncStatus == "Rejected"
						|| record.busFuncStatus == "Escalated") {
					$scope.uploadMessageModel.showViewAppt = false;
					$scope.uploadMessageModel.showPend = false;
					$scope.uploadMessageModel.selectedChart.busFuncVenKey = record.busFuncVenKey;
					$scope.uploadMessageModel.selectedChart.projContentKey = record.projContentKey;
					$scope.uploadMessageModel.selectedChart.chartStatus = record.busFuncStatus;
					$scope.uploadMessageModel.isSupervisorUI = true;
					$scope.uploadMessageModel.isReadonly = true;
					$scope.dataModel.viewPage('../coding/codingui.htm');
				}

			} else if (record.busFuncKey == 6) {
				if (record.busFuncStatus == "Completed" || record.busFuncStatus == "In Progress") {
					$scope.uploadMessageModel.selectedChart.busFuncVenKey = record.busFuncVenKey;
					$scope.uploadMessageModel.selectedChart.projContentKey = record.projContentKey;
					$scope.uploadMessageModel.selectedChart.chartStatus = record.busFuncStatus;
					$scope.uploadMessageModel.selectedChart.chartId = record.chartId;
					$scope.uploadMessageModel.isReadOnly = true;
					$scope.dataModel.viewPage('../worklist/codingQA/codingQAui.html');
				}
				// QA Work item in view only mode
			} else if (record.busFuncKey == 7) {
				// QA Feed back in view only mode
			}
		}
	}

	// function for bulk upload

	$scope.basicSearchModel.handleBulkUpload = function() {
		var disableUploadButton = false;
		var selectedChart = $scope.basicSearchModel.selectedChart;
		if (selectedChart) {
			if (selectedChart.busFuncKey != 4) {
				$scope.showErrorMessage('<span>File upload not allowed</span>');
				return;
			}
			if (selectedChart.busFuncStatus == 'Canceled' || selectedChart.busFuncStatus == 'Duplicate'
					|| selectedChart.busFuncStatus == 'Non-Retrievable' || selectedChart.busFuncStatus == 'Received'
					|| selectedChart.busFuncStatus == 'CNA') {
				disableUploadButton = true;
			}
			if (!disableUploadButton) {
				$("#chartFileId").val('');
				$scope.chartId = selectedChart.chartId;
				$scope.showChartFileUploadDialog = true;
				$scope.uploadMessageModel.showUploadError = false;
				$scope.uploadMessageModel.showFileSizeError = false;
				$scope.uploadMessageModel.showChartFileUploadButton = false;
				$scope.chartFile = '';
			} else {
				$scope.showErrorMessage('<span>File upload not allowed</span>');
			}
		} else {
			$scope.showErrorMessage('<span>Select chart Id to upload</span>');
		}
	}

	$scope.basicSearchModel.showCancelDialog = function(record) {
		var disableCancelButton = false;
		var selectedChart = $scope.basicSearchModel.selectedChart;
		if (selectedChart) {
			if (selectedChart.busFuncKey != 4) {
				$scope.showErrorMessage('<span>Chart cannot be cancelled</span>');
				return;
			}
			if (selectedChart.busFuncStatus == 'Canceled' || selectedChart.busFuncStatus == 'Duplicate'
					|| selectedChart.busFuncStatus == 'Non-Retrievable' || selectedChart.busFuncStatus == 'Received'
					|| selectedChart.busFuncStatus == 'CNA') {
				disableCancelButton = true;
			}
			if (!disableCancelButton) {
				$scope.selectedCancelReason = {
					value : ''
				};
				$scope.cancelComment = {
					value : ''
				};
				if (!$scope.cancelReasons || $scope.cancelReasons.length == 0) {
					readCancelReasons();
				}
				$scope.showCancelChartDialog = true;
			} else {
				$scope.showErrorMessage('<span>Chart cannot be cancelled</span>');
			}
		} else {
			$scope.showErrorMessage('<span>Select chart Id to cancel</span>');
		}
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

	function readCancelReasons() {
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

	$scope.basicSearchModel.showDuplicateDialog = function(record) {
		var disableDuplicateButton = false;
		var selectedChart = $scope.basicSearchModel.selectedChart;
		if (selectedChart) {
			if (selectedChart.busFuncKey != 4) {
				$scope.showErrorMessage('<span>Chart cannot be duplicated</span>');
				return;
			}
			if (selectedChart.busFuncStatus == 'Canceled' || selectedChart.busFuncStatus == 'Duplicate'
					|| selectedChart.busFuncStatus == 'Non-Retrievable' || selectedChart.busFuncStatus == 'Received'
					|| selectedChart.busFuncStatus == 'CNA') {
				disableDuplicateButton = true;
			}
			if (!disableDuplicateButton) {
				$scope.showDuplicateChartDialog = true;
			} else {
				$scope.showErrorMessage('<span>Chart cannot be duplicated</span>');
				return;
			}
		} else {
			$scope.showErrorMessage('<span>Select chart Id to duplicate</span>');
		}
	}

	$scope.ctrlFn = function(arg) {
		$timeout(function() {
			$scope.chartFile = arg;
		});
	}

	$scope.uploadChartFile = function() {
		$scope.showLoadingDialog = true;
		$('#uitkPopupId1_headerId').css({
			display : 'none'
		});
		$('#uitkPopupId1_closeLink').css({
			display : 'none'
		});
		$('#uitkPopupId1').css({
			'border-width' : 'unset',
			'border-style' : 'none'
		});
		// FormData, object of key/value pair for form fields and values
		$scope.errorMessageModel.visible = false;
		var fileFormData = new FormData();
		 var selectedChartBusFunction = $scope.basicSearchModel.selectedChart.busFunction;
		 var index = selectedChartBusFunction.indexOf("-") + 2;
		 var uploadSource = selectedChartBusFunction.substring(index,selectedChartBusFunction.length).toUpperCase();
		 if (uploadSource === 'OUTREACH')
			 uploadSource = 'FAX';
		var uploadSource = 'CLIENT';
		fileFormData.append('metadata', new Blob([ JSON.stringify({
			"barcode" : $scope.chartId,
			"uploadSource" : uploadSource,
			"isUploadFromSearch" : "true",
			"loginUserId" : $scope.loginUserId
		}) ], {
			type : "application/json"
		}));
		fileFormData.append('file', $scope.chartFile);
		$http.post('/gcm-app-services/scheduling/retrieval/chartUpload', fileFormData, {
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		}).then(function(response) {
			if (response && response.data) {
				$scope.showLoadingDialog = false;
				var message = '';
				var messageType = '';
				if (response.data.status == 'SUCCESS') {
					messageType = 'success';
					message = '<span>Chart file upload successful</span>';
				}
				if (response.data.errorMessage == 'CHART_ALREADY_AVAILABLE') {
					messageType = 'error';
					message = '<span>Chart file already available</span>';
				}
				if (response.data.errorMessage == 'FILE_INFECTED') {
					messageType = 'error';
					message = '<span>Chart file already available</span>';
				}
				$scope.showChartFileUploadDialog = false;
				$scope.showChartFileUploadButton = false;
				$scope.uploadMessageModel.showUploadError = false;
				$scope.uploadMessageModel.showFileSizeError = false;
				$scope.chartFile = '';
				lookupService.filter(message, messageType);
			}
		}, function(error) {
			$scope.showErrorMessage('<span>Error while uploading.</span>');
		});
	}

	function constructSearchChartInput(chartStatus) {
		var selectedRecord = $scope.basicSearchModel.selectedChart;
		$scope.searchChartInput = {
			"projContentKey" : selectedRecord.projContentKey,
			"busFuncVenKey" : selectedRecord.busFuncVenKey,
			"retWiKey" : selectedRecord.retWiKey,
			"projKey" : selectedRecord.projKey,
			"busFuncKey" : selectedRecord.busFuncKey,
			"fromBusFuncStatus" : selectedRecord.busFuncStatus,
			"toBusFuncStatus" : chartStatus,
			"reasonCode" : $scope.selectedCancelReason.value,
			"reasonComments" : $scope.cancelComment.value,
			"requestedUserId" : $scope.loginUserId,
			"groupKey" : $scope.currentGroupKey
		};
	}

	$scope.basicSearchModel.openImage = function(record){
		 var viewerUrl = "/gcm-image-viewer/view/pdfviewer.html";
		 if ((CordysRoot.winLookup) && (!CordysRoot.winLookup.closed)){
			 CordysRoot.winLookup = window.open(viewerUrl,"viewer","width=" + (screen.availWidth-10) + ",height=" + (screen.availHeight-30) + ",resizable=yes" );
		 }
		 CordysRoot.winLookup = window.open(viewerUrl + "?imgDetails=" + getViewerParam(record, 'CUSTOM'),"viewer","width=" + (screen.availWidth-10) + ",height=" + (screen.availHeight-30) + ",resizable=yes");
		 CordysRoot.winLookup.moveTo(0,0);
	 };
	 
	function getViewerParam(record, type){
		var dt = new Date();
		var imgDet = {};
		imgDet.documentId = record.chartId;
		imgDet.editable = !($scope.uploadMessageModel.isReadonly ? $scope.uploadMessageModel.isReadonly : true);
		imgDet.busFuncVenKey = record.busFuncVenKey;
		imgDet.busFuncKey = record.busFuncKey;
		imgDet.appName = 'MRM';
		imgDet.viewerType=type;
		imgDet.roleCode=rootData.currentRole;
		return $.base64.encode(JSON.stringify(imgDet));
	}
	
	$scope.cancelChart = function() {
		$scope.errorMessageModel.visible = false;
		$scope.showCancelChartDialog = false;
		constructSearchChartInput("CANCELED");
		if($scope.selectedCancelReason.value==''){
			$scope.dataModel.showDialogErrorMessage('Cancel reason is required');
			$scope.showCancelChartDialog = true;
		}else{
		$http.post('/gcm-app-services/utilities/project/updateSearchChartStatus', $scope.searchChartInput).then(function(response) {
			if (response.data.status === 'SUCCESS') {
				$scope.searchChartInput = {};
				$scope.selectedCancelReason.value = '';
				$scope.cancelComment.value = '';
				lookupService.filter('<span>Chart cancel successful.</span>', 'success');
			}
		}, function(error) {
			$scope.showErrorMessage('<span>Error while cancelling charts.</span>');
		});
	}
	}
	

	$scope.duplicateChart = function() {
		$scope.errorMessageModel.visible = false;
		$scope.showDuplicateChartDialog = false;
		constructSearchChartInput("DUPLICATE");
		$http.post('/gcm-app-services/utilities/project/updateSearchChartStatus', $scope.searchChartInput).then(function(response) {
			if (response.data.status === 'SUCCESS') {
				$scope.searchChartInput = {};
				lookupService.filter("<span>Chart duplicate successful.</span>", 'success');
			}
		}, function(error) {
			$scope.showErrorMessage('<span>Error while duplicating charts.</span>');
		});
	}

	$scope.showSuccessMessage = function(message) {
		$scope.errorMessageModel.messageType = 'success';
		$scope.errorMessageModel.content = message;
		$scope.errorMessageModel.visible = true;
	}

	$scope.showErrorMessage = function(message) {
		$scope.errorMessageModel.messageType = 'error';
		$scope.errorMessageModel.content = message;
		$scope.errorMessageModel.visible = true;
	}
	
	$scope.dataModel.imageModel={
			source:$scope.uploadSource,
			groupKey:$scope.gcmGroupKey
	}
	
	$scope.dataModel.fileUploadViewModel = { 
			id : "FileUploadId",
			acceptFileTypes : "jpg|pdf", 
			maxFileSize : "1000", //MB
			formData:$scope.dataModel.imageModel,
			multipart :true,
			uploadUrl : "/gcm-io-web/secure/io/uploadimage",
			sequentialUploads : false, //true or false,
			validFileNameRegEx : "^[\\w^'@{}\\[\\],$=!\\-().~;`_ ]*$",
			selectFilesBtn : "Select Files",
			tablePlaceholderValue: "Drag and drop files here",
            transformRequest:[],
			beforeSend : function(xhr,data){
			        xhr.setRequestHeader("X-CSRF-HEADER","X-CSRF-TOKEN");
			        xhr.setRequestHeader("X-CSRF-PARAM","_csrf");
			        xhr.setRequestHeader("X-CSRF-TOKEN",window.csrfToken);
			},

			onLoad : function(){
			}
			}
	$scope.showchartFileUploadWarningDialog = false;
	
	$scope.showchartFileUploadWarning = function(){
		$scope.showchartFileUploadWarningDialog = !$scope.showchartFileUploadWarningDialog;
	}
	
	$scope.basicSearchModel.showMultiDialogUpload = function() {
		var uploadSource = 'CLIENT';
		var urlParams = "uploadSource="
		+ uploadSource
		+"&gcmGroupKey="
		+$scope.dataModel.currentGroupKey
		if(CordysRoot.bulkUploadLookup && (!CordysRoot.bulkUploadLookup.closed)){
			$scope.showchartFileUploadWarningDialog = true;
			}
		else{
		CordysRoot.bulkUploadLookup = window.open("/gcm-app-services/com/optum/comm/retrieval/scheduling/views/bulkupload.html?"+urlParams,
		"bulkuploadPopup", "width=" + (screen.availWidth - 10)
		+ ",height="+ (screen.availHeight - 30) + ",resizable=yes,scrollbars=yes");
		CordysRoot.bulkUploadLookup.moveTo(0, 0);
		}
		}
	 if($scope.dataModel.retainSearchFilters){
		 if(lookupService.filters.regionsList.length==1 || lookupService.filters.region!='')
		 lookupService.filter();
	 }else{
		 lookupService.filters.busSegment = '';
		lookupService.filters.projectKey = '';
	 }
});

/**
 * For Chart file upload - Creating this custom directive for two way binding in
 * case of a file upload since ngModel directive does not provide this
 */
utilitymodule.directive('chartFileModel', function($parse, $timeout, dataServiceModel) {

	return {
		restrict : 'A', // the directive can be used as an attribute only
		scope : {
			fromDirectiveFn : '=method',
		},
		/*
		 link is a function that defines functionality of directive
		 scope:scope associated with the element
		 element: element on which this  directive used
		 attrs: key value pair of element attributes
		*/
		link : function(scope, element, attrs) {
			var showUploadError = false;
			var showFileSizeError = false;
			var showChartFileUploadButton = false;
			var model = $parse(attrs.chartFileModel), modelSetter = model.assign; // define a setter for demoFileModel

			// Bind change event on the element
			element.bind('change', function() {
				// Call apply on scope, it checks for value changes and reflect them on UI
				scope.$apply(function() {
					// set the model value
					if (element[0].files[0].type == "application/pdf") {
						if (element[0].files[0].size > 209715200) {
							showUploadError = false;
							showFileSizeError = true;
							showChartFileUploadButton = false;
						} else {
							scope.fromDirectiveFn(element[0].files[0]);
							modelSetter(scope, element[0].files[0]);
							showUploadError = false;
							showFileSizeError = false;
							showChartFileUploadButton = true;
						}
					} else {
						showUploadError = true;
						showFileSizeError = false;
						showChartFileUploadButton = false;
					}
				});
				$timeout(function() {
					dataServiceModel.showUploadError = showUploadError;
					dataServiceModel.showFileSizeError = showFileSizeError;
					dataServiceModel.showChartFileUploadButton = showChartFileUploadButton;
				});
			});
		}
	};
});