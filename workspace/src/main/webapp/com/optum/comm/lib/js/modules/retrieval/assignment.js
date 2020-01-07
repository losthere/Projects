angular.module("assignment-app",[ 'looup-data', 'uitk.component.uitkDynamicTable', 'uitk.component.uitkIconFont', 'ngSanitize', 'uitk.component.uitkMessage', 'uitk.uitkUtility', 'staticDataService', 'assignViewModel',
			'uitk.component.uitkDialog','uitk.component.uitkButton'])
.directive('filterDirective', function() {
	return {
		restrict : 'E',
		templateUrl : 'supervisorfilters.html'
	};
}).directive('panelDirective', function() {
	return function(scope, element, attrs) {
		if (scope.$last) {
			(new ux()).initializeExpandCollapsePanels();
		}
	};
}).controller('assignmentGridCtrl',
		function($scope, $compile, $timeout, $http, lookupService, errorMessageModel, staticDataService, assignViewModel, codingAssignViewModel, codingAssignUsersViewModel) {

			var rootData = window.parent.rootData;
			$scope.currentRole = rootData.currentRole; 
			$scope.isInventoryManager=false;
			$scope.searchResults = [];
			$scope.assignTableModel = assignViewModel;
			$scope.codingAssignTableModel = codingAssignViewModel;
			$scope.showLoadingDialog = false;
			$scope.showCodingAssignLoadingDialog = false;
			$scope.showAssignFiltersLoadingDialog = false;
			if($scope.currentRole == 'IM'){
				$scope.codingAssignTableModel.showAssignToLocation = true;
				$scope.codingAssignTableModel.showAssignToUser = false;
				$scope.isInventoryManager=true;
			} else {
				$scope.codingAssignTableModel.showAssignToLocation = false;
				$scope.codingAssignTableModel.showAssignToUser = true;
			}
			
			//This code is to clear the records when status changes in Coding tab to avoid one defect reported, Starts here
			$scope.lookupService = lookupService;
			if(!lookupService.filters.organization){
				if(!lookupService.filters.vendors || lookupService.filters.vendors.length <= 0)
				lookupService.filters.vendors = rootData.getVendorsByRole(rootData.currentRole);
				if(lookupService.filters.vendors.length==1 && !lookupService.filters.organization){
					lookupService.filters.organization = lookupService.filters.vendors[0].key;
				}
			}
			$scope.$watch('lookupService.filters.status', function() {
				if (lookupService.filters.currentTab === 'Coding') {
					$scope.codingAssignTableModel.records = [];
					$scope.codingAssignTableModel.totalRecordsCount = 0;
					$scope.codingAssignTableModel.selectedRecords = [];
					$scope.codingAssignTableModel.selectedRecordCount = 0;
					$scope.codingAssignTableModel.pagination.currentPageNumber = 1;
					$scope.codingAssignTableModel.pagination.currentPageNumberInView = 1;
					$scope.codingAssignTableModel.pagination.pageNumberError = false;
					$scope.codingAssignTableModel.selectAllChecked = false;
				}
			});
			//This code is to clear the records when status changes in Coding tab to avoid one defect reported, Ends here
			
			/* Coding Assign Dialog code starts */
			$scope.usersOfSupervisors = [];
			
			var codingAssignObject = {
					codingInventoryList: [],
					searchFilter : {},
					assignType : null,
					assignPerUserCount : null,
					assignIndUsers : []
			};
			
			$scope.locationAssignObj = {
					chartsSelected : 0,
					selectedSupervisorKey : null,
					modalShown : false,
					locModalShown : false,
					errorMessage : ''
				}
			
			$scope.codingAssignObj = {
				chartsSelected : 0,
				usersEligible : 0,
				selectedOption : '-1',
				selectedCount : null,
				selectedSupervisorKey : null,
				userSearched : '',
				modalShown : false,
				locModalShown : false,
				errorMessage : ''
			};
			
			$scope.toggleModal = function() {
				$scope.getSupervisors();//to load list of supervisors for 3rd radio button selection
				$scope.codingAssignUsersTableModel.records = [];
				$scope.codingAssignUsersTableModel.totalRecordsCount = 0;
				$scope.codingAssignUsersTableModel.pagination.currentPageNumber = 1;

				$scope.codingAssignObj.selectedOption = '-1';
				$scope.codingAssignObj.selectedCount = null;
				$scope.codingAssignObj.selectedSupervisorKey = $scope.loginUserKey;
				$scope.codingAssignObj.userSearched = '';

				$scope.codingAssignObj.modalShown = true;
				$scope.codingAssignObj.locModalShown = false;
				$scope.confirmClicked = false;

				calculateChartCount();
			};
			
			function calculateChartCount() {
				if ($scope.codingAssignTableModel.selectedRecords.length > 0) {
					var chartCount = 0;
					for (var i = 0; i < $scope.codingAssignTableModel.selectedRecords.length; i++) {
						chartCount += $scope.codingAssignTableModel.selectedRecords[i].recCount;
					}
					$scope.codingAssignObj.chartsSelected = chartCount;
					$scope.codingAssignUsersTableModel.chartsSelected = chartCount;//for this value to be available to the table model
				}
			}
			
			$scope.enableConfirm = function() {
				if (($scope.codingAssignObj.chartsSelected < 1)
						|| ($scope.codingAssignObj.usersEligible < 1 && $scope.codingAssignObj.selectedOption !== '2')
						|| $scope.codingAssignObj.selectedOption === '-1') {
					return false;
				} else if ($scope.codingAssignObj.selectedOption === '1') {
					if (($scope.codingAssignObj.selectedCount > $scope.codingAssignObj.chartsSelected)
							|| $scope.codingAssignObj.selectedCount == null || $scope.codingAssignObj.selectedCount == 0) {
						return false;
					}
				} else if ($scope.codingAssignObj.selectedOption === '2') {
					var flag = false;
					for (var i = 0; i < $scope.codingAssignUsersTableModel.originalRecords.length; i++) {
						var obj = $scope.codingAssignUsersTableModel.records[i];
						if (angular.isDefined(obj.amountToAssign) && (obj.amountToAssign <= $scope.codingAssignObj.chartsSelected)
								&& (obj.amountToAssign != null) && obj.amountToAssign !== 0) {
							flag = true;
							break;
						}
					}
					return flag;
				}
				return true;

			}

			$scope.codingAssign = function() {
				codingAssignObject.codingInventoryList = $scope.codingAssignTableModel.selectedRecords.slice();
				codingAssignObject.searchFilter = $scope.searchFilter;
				codingAssignObject.searchFilter.loginUserId = optumUI.getAuthUser();
				var selectedOption = $scope.codingAssignObj.selectedOption;
				codingAssignObject.assignType = selectedOption;
				codingAssignObject.assignVendorKey = $scope.vendorKey;
				codingAssignObject.searchFilter.hpProduct = codingAssignObject.searchFilter.hpProduct == "" ? null : codingAssignObject.searchFilter.hpProduct;
				codingAssignObject.searchFilter.isOffshoreCoding = codingAssignObject.searchFilter.isOffshoreCoding == "" ? null : codingAssignObject.searchFilter.isOffshoreCoding;
				
				if (selectedOption === '0') {
					codingAssignObject.assignPerUserCount = null;
					codingAssignObject.assignIndUsers = null;
				} else if (selectedOption === '1') {
					codingAssignObject.assignPerUserCount = $scope.codingAssignObj.selectedCount;
					codingAssignObject.assignIndUsers = null;
				} else if (selectedOption === '2') {
					codingAssignObject.assignPerUserCount = null;

					var assignIndUsers = [];
					var assignUserObj = {};

					angular.forEach($scope.codingAssignUsersTableModel.originalRecords, function(obj, idx) {
						if(angular.isDefined(obj.amountToAssign) && obj.amountToAssign != null && obj.amountToAssign != ''){
							assignUserObj = {};
							assignUserObj.key = obj.loginUserKey;
							assignUserObj.value = obj.amountToAssign;
							assignIndUsers.push(assignUserObj);
						}
					});

					codingAssignObject.assignIndUsers = assignIndUsers;
				}
				
				$scope.confirmClicked = true;
				$scope.showCodingAssignLoadingDialog = true;
				
				$http.post('/gcm-app-services/coding/inventory/assignInventoryforCoding', codingAssignObject).then(function(response) {
					$scope.showCodingAssignLoadingDialog = false;
					$scope.codingAssignObj.modalShown = false;//close the assign dialog
					if(response.data.status === 'ERROR'){
						$scope.errorMessageModel.messageType = 'error';
						$scope.errorMessageModel.content = '<span>Exception occurred while Assignment. Please try again !!!</span>';
					}else if(response.data.status === 'SUCCESS'){
						$scope.errorMessageModel.messageType = 'success';
						$scope.errorMessageModel.content = '<span>Assignment is successful.</span>';
					}
					refreshPage();
				}, function(error) {
					$scope.showCodingAssignLoadingDialog = false;
					$scope.confirmClicked = false;
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>Assignment failed !!!</span>';
					$scope.errorMessageModel.visible = true;
				});
				
			}

			function refreshPage(){
				if($scope.codingAssignUsersTableModel){
					$scope.codingAssignUsersTableModel.selectedRecords = [];
					$scope.codingAssignUsersTableModel.selectedRecordCount = 0;
					$scope.codingAssignUsersTableModel.selectAllChecked = false;
				}
				lookupService.filter();
				$scope.errorMessageModel.visible = true;
			}
			
			$scope.search = function() {
				$scope.getUsersOfSupervisors().then(function() {
					var filteredData = $scope.usersOfSupervisors;
					var filterCondition = {
							searchBy : [ codingAssignUsersViewModel.columns[0].columnId ],
							searchInput : [ $scope.codingAssignObj.userSearched ]
					};
					// search
					if (filterCondition.searchBy && filterCondition.searchBy.length > 0) {
						filterCondition.searchBy.forEach(function(searchBy, index) {
							filteredData = filteredData.filter(function(record) {
								return _.startsWith(record[searchBy].toLowerCase(), filterCondition.searchInput[index].toLowerCase());
							});
						});
					}
					$scope.codingAssignUsersTableModel.records = filteredData.slice();
					$scope.codingAssignUsersTableModel.totalRecordsCount = filteredData.length;

				});
			}
			
			$scope.getSupervisors = function() {
				$http.post('/gcm-app-services/masterdata/getSupervisors', reqParams({
					loginUserKey : $scope.loginUserKey,
					vendorKey : $scope.vendorKey,
					groupKey : $scope.groupKey,
					roleCode : 'SUP'
				}), config).then(function(response) {
					var list = [{loginUserKey: null,fullName: 'All'},{loginUserKey: $scope.loginUserKey,fullName: 'My Staff'}];
					$scope.listOfSupervisors = list.concat(response.data.result);
				}, function(error) {
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
				});
			}
			
			$scope.getUsersOfSupervisors = function() {
				var reqObj = {
						roleCode : 'SUP',
						groupKey : $scope.groupKey,
						userKey  : $scope.loginUserKey,
						userId   : optumUI.getAuthUser(),
						busFuncKey : 2
				};
				reqObj.vendorKey = $scope.vendorKey;
				if ($scope.codingAssignObj.selectedSupervisorKey != null && $scope.codingAssignObj.selectedSupervisorKey != '')
					reqObj.supervisorUserKey = $scope.codingAssignObj.selectedSupervisorKey;
				
				return $http.post('/gcm-app-services/coding/inventory/getCodingUsersforSupervisor', reqParams(reqObj), config).then(
						function(response) {
							$scope.usersOfSupervisors = response.data.result;
							if(lookupService.filters.user != ''){
								var idxToRemove = _.indexOf($scope.usersOfSupervisors, _.findWhere($scope.usersOfSupervisors, {loginUserKey : lookupService.filters.user }));
								$scope.usersOfSupervisors.splice(idxToRemove,1);
							}
							$scope.codingAssignUsersTableModel.originalRecords = $scope.usersOfSupervisors.slice();
							$scope.codingAssignUsersTableModel.records = $scope.usersOfSupervisors.slice();
							$scope.codingAssignUsersTableModel.totalRecordsCount = $scope.usersOfSupervisors.length;
						}, function(error) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
						});
			}

			/* Coding Assign Dialog code ends */
	        

			$scope.assignTableModel.linkClick = $scope.codingAssignTableModel.linkClick = function() {
				if (lookupService.filters.currentTab === 'Coding') {
					if ($scope.codingAssignTableModel.selectedRecords.length > 0) {
						$scope.codingAssignUsersTableModel = codingAssignUsersViewModel;
						$scope.toggleModal();
					} else {
						$scope.errorMessageModel.messageType = 'error';
						$scope.errorMessageModel.content = '<span>Please select a  record in order to Assign</span>';
						$scope.errorMessageModel.visible = true;
					}
				} else {
					$scope.assign();
				}
			}
			/**Assign to Location*/
			$scope.codingAssignTableModel.assignToLocation = function() {
				if (lookupService.filters.currentTab === 'Coding') {
					if ($scope.codingAssignTableModel.selectedRecords.length > 0) {
						$scope.codingAssignUsersTableModel = codingAssignUsersViewModel;
						$scope.toggleLocModal();
					} else {
						$scope.errorMessageModel.messageType = 'error';
						$scope.errorMessageModel.content = '<span>Please select records to assign/re-assign</span>';
						$scope.errorMessageModel.visible = true;
					}
				}
			}
			
			$scope.toggleLocModal = function(){
				$scope.locationAssignObj.chartsSelected = 0;
				if (lookupService.filters.currentTab === 'Coding') {
					for(var i =0 ; i < $scope.codingAssignTableModel.selectedRecords.length ; i++){
						$scope.locationAssignObj.chartsSelected += $scope.codingAssignTableModel.selectedRecords[i].recCount;
					}
				}else{
					for(var i =0 ; i < $scope.codingQAAssignViewModel.selectedRecords.length ; i++){
						$scope.locationAssignObj.chartsSelected += $scope.codingQAAssignViewModel.selectedRecords[i].recCount;
					}
				}
				$scope.locationAssignObj.assignVendor = '';
				$scope.locationAssignObj.selectedSupervisorKey= null;
				$scope.locationAssignObj.selectedCount = '';
				$scope.locationAssignObj.vendors = [];
				$scope.locationAssignObj.modalShown = false;
				$scope.locationAssignObj.locModalShown = true;
				$scope.getVendorsToAssign();
				$scope.locationAssignObj.errorMessage = '';
				
			}			/**Assign to Location ends*/
			
				$scope.vendorKey = lookupService.filters.organization;
			
			
			/*To get organizations*/
			$scope.getVendorsToAssign = function (){
				var busFuncKey = 2;
				if ($scope.currentTab === 'Coding'){ 
					busFuncKey = 2;
					codingAssignObject.codingInventoryList = $scope.codingAssignTableModel.selectedRecords.slice();
				}else{
					busFuncKey = 6;
					codingAssignObject.codingInventoryList = $scope.codingQAAssignTableModel.selectedRecords.slice();
				}
				prepareSearchFilter(busFuncKey);
				
				codingAssignObject.searchFilter = $scope.searchFilter;
				
				$http.post('/gcm-app-services/coding/inventory/assignableVendorsForOptumInventory', codingAssignObject).then(function(respose) {
					$scope.locationAssignObj.vendors = respose.data.result;
				}, function(error) {
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
				});
				
			}
			
			var prepareSearchFilter = function(busFuncKey){
				if(lookupService.filters.organizations.length > 1) {
					$scope.vendorKey = lookupService.filters.organization;
				}
				var fromDate = busFuncKey == 2 ? '' : lookupService.filters.fromDate;
				var toDate =  busFuncKey == 2 ? '' : lookupService.filters.throughDate;
				$scope.searchFilter = {
						"loginUserKey" 	: $scope.loginUserKey,
						"loginUserId"	: $scope.loginUserId,
						"groupKey"	 	: $scope.groupKey,
						"roleCode"	 	: rootData.currentRole ? rootData.currentRole : '',
						"busFuncKey"	: busFuncKey,
						"busSegment"	: lookupService.filters.busSegment,
						"programKey"	: lookupService.filters.program ? lookupService.filters.program : '',
						"projYear"	 	: lookupService.filters.projectYear,
						"projectKey" 	: lookupService.filters.projectKey ? lookupService.filters.projectKey : '',
						"clientKey" 	: lookupService.filters.client ? lookupService.filters.client : '',
						"hpKey" 		: lookupService.filters.hp ? lookupService.filters.hp : '',
						"hpProduct" 	: lookupService.filters.hpp ? lookupService.filters.hpp : '',
						"chartScoreGrp"	: lookupService.filters.chartScore ? lookupService.filters.chartScore : '',
						"emr"			: lookupService.filters.emr ? lookupService.filters.emr : '' ,
						"provSplCode"  	: lookupService.filters.provSplCode ? lookupService.filters.provSplCode : '',
						"fromVendorKey"	: $scope.vendorKey,
						"codingUserKey"	: lookupService.filters.coder ? lookupService.filters.coder : '',
						"acceptedFromDate"	 	: (fromDate !== '') ? lookupService.getDateAsString(fromDate) : fromDate,
						"acceptedToDate"		: (toDate !== '') ? lookupService.getDateAsString(toDate) : toDate,
						"percentage"	: lookupService.filters.noOfCharts ? lookupService.filters.noOfCharts : 100,
						"isOffshoreCoding": lookupService.filters.codingLoc ? lookupService.filters.codingLoc : 0,
						"isAssigned" 	: lookupService.filters.status ? lookupService.filters.status : '0',
						"fromUserKey"	: lookupService.filters.user
				};
			}

			$scope.assignTableModel.onSelectAllRows = $scope.codingAssignTableModel.onSelectAllRows = function(selectAll) {
				var model = this;
				var availableRecords = model.records.slice();

				var selectedRecordIds = [];
				for (var i = 0; i < model.selectedRecords.length; i++)
					selectedRecordIds.push(model.selectedRecords[i].uniqueIndex);

				for (var row = 0; row < availableRecords.length; row++) {

					availableRecords[row].isAssigned = lookupService.filters.status ? lookupService.filters.status : 0;
					availableRecords[row].requestedUserId = optumUI.getAuthUser();
					availableRecords[row].toUserKey = (lookupService.filters.user != availableRecords[row].userKey ? availableRecords[row].userKey : '');
					availableRecords[row].fromUserKey = lookupService.filters.user;
					availableRecords[row].loginUserKey = $scope.loginUserKey;

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

			$scope.assignTableModel.onRowSelect = $scope.codingAssignTableModel.onRowSelect = function(event, record, selected) {

				record.isAssigned = lookupService.filters.status ? lookupService.filters.status : 0;
				record.requestedUserId = optumUI.getAuthUser();
				record.toUserKey = (lookupService.filters.user != record.userKey ? (record.userKey || ''): '');
				record.fromUserKey = lookupService.filters.user;
				record.loginUserKey = $scope.loginUserKey;

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
					if (recordIndex < 0)
						model.selectedRecords.push(record);
				} else {
					model.selectedRecords.splice(recordIndex, 1);
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
			}

			$scope.assignTableModel.onChange = $scope.codingAssignTableModel.onChange = function(filterCondition) {
				var that = this;
				staticDataService.query(filterCondition, $scope.searchResults, function(result) {
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

			$scope.assignTableModel.onExport = $scope.codingAssignTableModel.onExport = function(filterCondition, initiateExport) {
				$scope.errorMessageModel.visible = false;
				$scope.initiateExport = initiateExport;

				staticDataService.query(filterCondition, $scope.searchResults, function(result) {
					$scope.initiateExport(result, lookupService.filters.currentTab + ' Assignments');
				});
			};

			$scope.errorMessageModel = errorMessageModel;

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
			$scope.vendorKey = lookupService.filters.organization;
			$scope.groupKey = optumUI.getUser().getCurrentGroupKey();
			$scope.codingVendorKey = '';
			
			function clearTableData() {
				$scope.searchResults = [];

				if(lookupService.filters.currentTab === 'Coding'){
					$scope.codingAssignTableModel.records = [];
					$scope.codingAssignTableModel.totalRecordsCount = 0;
					$scope.codingAssignTableModel.selectedRecords = [];
					$scope.codingAssignTableModel.selectedRecordCount = 0;
					$scope.codingAssignTableModel.pagination.currentPageNumber = 1;
					$scope.codingAssignTableModel.pagination.currentPageNumberInView = 1;
					$scope.codingAssignTableModel.pagination.pageNumberError = false;
					$scope.codingAssignTableModel.selectAllChecked = false;
				}else {
					$scope.assignTableModel.records = [];
					$scope.assignTableModel.totalRecordsCount = 0;
					$scope.assignTableModel.selectedRecords = [];
					$scope.assignTableModel.selectedRecordCount = 0;
					$scope.assignTableModel.pagination.currentPageNumber = 1;
					$scope.assignTableModel.pagination.currentPageNumberInView = 1;
					$scope.assignTableModel.pagination.pageNumberError = false;
					$scope.assignTableModel.selectAllChecked = false;
				}
				clearSort();
			}
			
			function clearSort(){
				if(lookupService.filters.currentTab === 'Coding'){
					angular.forEach($scope.codingAssignTableModel.columns,function(col,idx){
						col.sortOrder = 0;
					});
					$scope.codingAssignTableModel.columns[1].sortOrder = 1;
				}else{
					angular.forEach($scope.assignTableModel.columns,function(col,idx){
						col.sortOrder = 0;
					});
					$scope.assignTableModel.columns[1].sortOrder = 1;
				}
			}

			
			$scope.searchFilter = {};
			var busFuncDtlKey = 1;
			lookupService.filter = function() {
				$scope.errorMessageModel.visible = false;
				if (lookupService.filters.organization == '' && lookupService.filters.currentTab =='Coding' && lookupService.filters.organizations.length > 1) {
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>Organization is mandatory.</span>';
					$scope.errorMessageModel.visible = true;
					return;
				}

				if ((rootData.currentRole!='IM') && (lookupService.filters.status == 1) && (lookupService.filters.user == undefined || lookupService.filters.user == ""))  {
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>User is mandatory.</span>';
					$scope.errorMessageModel.visible = true;
					return;
				}
				
				
				clearTableData();
				busFuncDtlKey=1;
				if(lookupService.filters.currentTab == 'Onsite'){
					busFuncDtlKey = 2;
				}else if(lookupService.filters.currentTab == 'EMR'){
					busFuncDtlKey = 3;
				}
				if (lookupService.filters.currentTab !== 'Coding') {
					
					lookupService.filters.vendors = rootData.getVendorsByRole(rootData.currentRole);
					if(lookupService.filters.vendors.length==1 && !lookupService.filters.organization){
						lookupService.filters.organization = lookupService.filters.vendors[0].key;
					}
					$scope.vendorKey = lookupService.filters.organization;
					$scope.searchFilter = {
						busSegment : lookupService.filters.busSegment,
						projectKey : lookupService.filters.projectKey,
						clientKey : lookupService.filters.client,
						hpKey : lookupService.filters.hp,
						hpProduct : lookupService.filters.hpp,
						isAssigned : lookupService.filters.status ? lookupService.filters.status : 0,
						providerId : lookupService.filters.provId,
						provGroupName : lookupService.filters.provgrpNm,
						provLastName : lookupService.filters.provLastNm,
						provFirstName : lookupService.filters.provFstNm,
						fromUserKey : lookupService.filters.user,
						loginUserKey : $scope.loginUserKey,
						vendorKey : $scope.vendorKey,
						specialCategory : "",
						busFuncKey : 4,
						busFuncDtlKey:busFuncDtlKey
					};
					$scope.getUsersForAssignment().then(
							function() {
//								$scope.assignTableModel.userAssignList = $scope.userToAssign;
								$scope.assignTableModel.userAssignList = [];
								var filteredUser = lookupService.filters.user;
								if (lookupService.filters.status == 0 ) {
									$scope.assignTableModel.userAssignList.push({key:'', value: 'Unassigned'});
									filteredUser = '';
								}
								$scope.assignTableModel.userAssignList = $scope.assignTableModel.userAssignList
											.concat($scope.userToAssign);
								$scope.showAssignFiltersLoadingDialog = true;
								$http.post('/gcm-app-services/scheduling/inventory/getUnassignedInventoryforScheduling', $scope.searchFilter).then(
										function(respose) {
											$scope.showAssignFiltersLoadingDialog = false;
											var searchResults = respose.data.result;
											angular.forEach(searchResults, function(obj, idx) {
												obj.uniqueIndex = idx + 1;
												obj.specialHandling = (obj.specialCategory != null) ? (obj.specialCategory + " - ") : "";
												obj.specialHandling += (obj.specialNotes != null) ? obj.specialNotes : ""; // adding this to make sorting work on this column
												obj.userKey=filteredUser;
											});
											$scope.searchResults = searchResults.slice();
											$scope.assignTableModel.records = searchResults;
											$scope.assignTableModel.totalRecordsCount = searchResults.length;

											$scope.assignTableModel.onLoad(true);
										}, function(error) {
											$scope.showAssignFiltersLoadingDialog = false;
											// alert(JSON.stringify(error));
										});
							});
				} else {
						$scope.vendorKey = lookupService.filters.organization;
					
					$scope.searchFilter = {
							
							"loginUserKey" 	: $scope.loginUserKey,
							"loginUserId"	: $scope.loginUserId,
							"groupKey"	 	: $scope.groupKey,
							"roleCode"	 	: rootData.currentRole ? rootData.currentRole : '',
							"busFuncKey"	: 2,
							"busSegment"	: lookupService.filters.busSegment,
							"programKey"	: lookupService.filters.program ? lookupService.filters.program : '',
							"projYear"	 	: lookupService.filters.projectYear ? lookupService.filters.projectYear : '',
							"projectKey" 	: lookupService.filters.projectKey ? lookupService.filters.projectKey : '',
							"clientKey" 	: lookupService.filters.client ? lookupService.filters.client : '',
							"hpKey" 		: lookupService.filters.hp ? lookupService.filters.hp : '',
							"hpProduct" 	: lookupService.filters.hpp ? lookupService.filters.hpp : '',
							"chartScoreGrp"	: '',
							"emr"			: '' ,
							"provSplCode"  	: '',
							"fromVendorKey"	: $scope.vendorKey,
							"codingUserKey"	: lookupService.filters.coder ? lookupService.filters.coder : '',
							"acceptedFromDate": '',
							"acceptedToDate": '',
							"percentage"	: lookupService.filters.noOfCharts ? lookupService.filters.noOfCharts : 100,
							"isOffshoreCoding": lookupService.filters.codingLoc ? lookupService.filters.codingLoc : 0,
							"isAssigned" 	: lookupService.filters.status ? lookupService.filters.status : 0,
							"fromUserKey"	: lookupService.filters.user
					};
					
					$scope.getUsersForAssignment().then(function(){
						if($scope.lookupService.filters.status == 1 && $scope.userToAssign.length > 0){
							$scope.codingAssignObj.usersEligible = $scope.userToAssign.length - 1;
						}else{
							$scope.codingAssignObj.usersEligible = $scope.userToAssign.length;
						}
						$scope.showAssignFiltersLoadingDialog = true;
						$http.post('/gcm-app-services/coding/inventory/getUnassignedInventoryforCoding', $scope.searchFilter).then(function(respose) {
							$scope.showAssignFiltersLoadingDialog = false;
							var searchResults = respose.data.result;
							angular.forEach(searchResults, function(obj, idx) {
								obj.uniqueIndex = idx + 1;
							});
							$scope.searchResults = searchResults.slice();
							$scope.codingAssignTableModel.records = searchResults;
							$scope.codingAssignTableModel.totalRecordsCount = searchResults.length;

							$scope.codingAssignTableModel.onLoad(true);
						}, function(error) {
							$scope.showAssignFiltersLoadingDialog = false;
							// alert(JSON.stringify(error));
						});
					});
				}

			};

			
			$scope.codingQALocAssign = function(){
				if(!$scope.locationAssignObj.assignVendor){
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>Please select a location to assign/re-assign</span>';
					$scope.errorMessageModel.visible = true;
					return;
				}
				if(!$scope.locationAssignObj.selectedCount || $scope.locationAssignObj.selectedCount <= 0){
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>Please select a amount to assign/re-assign</span>';
					$scope.errorMessageModel.visible = true;
					return;
				}
				
				prepareSearchFilter(2);
				codingAssignObject.codingInventoryList = $scope.codingAssignTableModel.selectedRecords.slice();
				
				
				codingAssignObject.searchFilter = $scope.searchFilter;
				codingAssignObject.searchFilter.loginUserId = optumUI.getAuthUser();
				codingAssignObject.assignVendorKey = $scope.locationAssignObj.assignVendor;
				codingAssignObject.assignCount = $scope.locationAssignObj.selectedCount;
				codingAssignObject.assignType = 3;
				codingAssignObject.assignVendorKey = $scope.locationAssignObj.assignVendor;
				$http.post('/gcm-app-services/coding/inventory/inventoryAssignmentforOptum', codingAssignObject).then(function(response) {
					if(response.data.status == 'SUCCESS'){
						$scope.locationAssignObj.modalShown = false;
						$scope.locationAssignObj.locModalShown = false;
						$scope.errorMessageModel.messageType = 'success';
						lookupService.filter(true);
						$scope.errorMessageModel.content = '<span>Assignment is successful.</span>';
						$scope.errorMessageModel.visible = true;
					}else{
						$scope.errorMessageModel.messageType = 'error';
						$scope.errorMessageModel.content = '<span>Exception occurred while Assignment. Please try again !!!</span>';
						$scope.errorMessageModel.visible = true;
					}
					
				}, function(error) {
					$scope.showAssignFiltersLoadingDialog = false;
					// alert(JSON.stringify(error));
				});
			}
				lookupService.clearTableData = function() {
				clearTableData();
		}
			lookupService.clear = function() {
				
				lookupService.filters.program = '';
				lookupService.filters.isOffshoreCoding = '';
				lookupService.filters.isAssigned = '';
				lookupService.filters.codingLoc = '';
				if(lookupService.filters.currentTab == 'Coding'){
					lookupService.filters.busSegment = 'MCARE';
				} else {
					lookupService.filters.busSegment = '';
				}
				lookupService.filters.projectKey = '';
				lookupService.filters.client = '';
				lookupService.filters.provFstNm = '';
				lookupService.filters.hp = '';
				lookupService.filters.hpp = '';
				lookupService.filters.provId = '';
				lookupService.filters.provLastNm = '';
				lookupService.filters.user = '';
				lookupService.filters.status = '';
				lookupService.filters.provgrpNm = '';
				if(lookupService.filters.vendors.length==1){
					lookupService.filters.organization = lookupService.filters.vendors[0].key;
				}else{
					lookupService.filters.organization = '';
				}
				
				clearTableData();
				$scope.errorMessageModel.visible = false;
			}
			
			lookupService.isWorklist = function() {
				return false;
			}
			
			$scope.getUsersForAssignment = function() {
				return $http.post('/gcm-app-services/masterdata/getUsersCountBySupervisor', reqParams({
					userKey : $scope.loginUserKey,
					roleCode : lookupService.filters.currentTab === 'Coding' ? 'COU' : lookupService.filters.currentTab === 'EMR' ? 'ESH' : lookupService.filters.currentTab === 'Onsite' ? 'OSH' : 'SH',
					vendorKey : $scope.vendorKey,
					busFuncDetailKey : busFuncDtlKey
				}), config).then(function(response) {
					$scope.userToAssign = response.data.result;
				}, function(error) {
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
				});
			}

			$scope.assign = function() {
				var selectedRecords = $scope.assignTableModel.selectedRecords;

				if (selectedRecords.length > 0) {
					$scope.errorMessageModel.visible = false;
					for (var i = 0; i < selectedRecords.length; i++) {
						if (selectedRecords[i].toUserKey == '' || selectedRecords[i].toUserKey == null) {
							$scope.errorMessageModel.messageType = 'error';
							if (lookupService.filters.user == selectedRecords[i].userKey && selectedRecords[i].userKey != ""){
								$scope.errorMessageModel.content = 
									'<span>Already assigned to user selected.Please select a different user in the \'Assign to user\' drop down box.</span>';
								$scope.errorMessageModel.visible = true;
								return;
							}else{
								$scope.errorMessageModel.content = '<span>Please select a user in the \'Assign to user\' drop down box.</span>';
								$scope.errorMessageModel.visible = true;
								return;
							}
						}
					}
					$scope.showLoadingDialog = true;
					
					var assignOutReach = {
							assignInventorySearchFilter : selectedRecords,
							schedulingSearchFilter : $scope.searchFilter
					};

					$http.post('/gcm-app-services/scheduling/inventory/assignSchedulingInvenotry', assignOutReach).then(function(respose) {
						$scope.showLoadingDialog = false;
						$scope.errorMessageModel.messageType = 'success';
						$scope.errorMessageModel.content = '<span>Assignment complete.</span>';
						refreshPage();
					}, function(error) {
						$scope.errorMessageModel.messageType = 'error';
						$scope.errorMessageModel.content = '<span>Assignment failed !!!</span>';
						$scope.errorMessageModel.visible = true;
					});
				} else {
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>Please select a user in the \'Assign to user\' drop down box.</span>';
					$scope.errorMessageModel.visible = true;

				}
			}

			/* Common code starts here */
			$scope.userToAssign = [];
			$scope.isRetrievalConfigured = function() {
				return $http.post('/gcm-app-services/masterdata/isRetrievalConfigured', reqParams({
					groupKey : $scope.groupKey
				}), config).then(function(response) {
					if(response.data.status == "SUCCESS"){
						$scope.isRetConfigured = response.data.result;
						if($scope.isRetConfigured){
							$scope.tabs = ['Outreach','Onsite','EMR','Coding'];
						}else{
							$scope.tabs = ['Coding'];
						}
					}else{
						$scope.tabs = ['Outreach','Onsite','EMR','Coding'];
					}
					$scope.url = 'assign.html';
					$scope.onClickTab($scope.tabs[0]);
				}, function(error) {
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span> Error while fetching payer configuration.</span>';
				});
			}
			
			$scope.onClickTab = function(tab) {
				$scope.currentTab = tab;
				if (tab === 'Coding'){ 
					$scope.url = 'codingAssign.html';
					$scope.codingAssignTableModel = codingAssignViewModel;
					lookupService.filters.busSegment = 'MCARE';
					if(lookupService.getPrograms)
						lookupService.getPrograms();
				}else{
					$scope.url = 'assign.html';
					$scope.assignTableModel = assignViewModel;
				}
				lookupService.filters.currentTab = tab;
				lookupService.clear();
			}
			
			if($scope.currentRole == 'IM'){
				$scope.tabs = ['Coding'];
				$scope.url = 'codingAssign.html';
				lookupService.filters.busSegment = 'MCARE';
				$scope.onClickTab($scope.tabs[0]);
			} else {
				$scope.isRetrievalConfigured();
			}

		});