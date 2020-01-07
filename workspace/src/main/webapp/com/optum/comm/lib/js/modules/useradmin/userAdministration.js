administrationmodule
		.controller(
				'userAdminCtrl',
				function($scope, $compile, $timeout, $http, staticDataService, lookupService, errorMessageModel) {
					$scope.lookupService = lookupService;
					$scope.filters = lookupService.filters;
					$scope.errorMessageModel = errorMessageModel;
					$scope.searchResults = [];
					$scope.filters.memberLastName = '', $scope.filters.memberFirstName = '', $scope.filters.userId = '',
							$scope.filters.userRole = '', $scope.filters.supervisor = '', $scope.filters.userStatus = '',
							$scope.supervisorPopup = false;
					$scope.activateUserPopup = false;
					$scope.userProfilePopup = false;

					$scope.vendorKey = optumUI.getUser().getDefaultVendorKey();
					$scope.loginUserKey = optumUI.getUser().getLoggedInUserKey();
					$scope.groupKey = optumUI.getUser().getCurrentGroupKey();

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

					$scope.userAdminFilters = {
						id : 'userAdminPanel',
						title : 'Filters',
						templateUrl : '../admin/userAdminFilters.htm',
						open : true,
						headerClass : 'tk-panl-with-underline',
						collapsible : true
					};

					lookupService.filter = function() {
						$scope.getUserAdminList();
					}

					lookupService.clear = function() {
						$scope.filters.memberLastName = '', $scope.filters.memberFirstName = '', $scope.filters.userId = '',
								$scope.filters.userRole = '', $scope.filters.supervisor = '', $scope.filters.userStatus = '',
								$scope.userAdminListModel.records = [];
						$scope.userAdminListModel.totalRecordsCount = 0;
						$scope.userAdminListModel.pagination.currentPageNumberInView = 1;
						$scope.userAdminListModel.pagination.recordsPerPage = 10;
						$scope.userAdminListModel.pagination.pageNumberError = false;
					}

					$scope.userAdminListModel = {
						records : [],
						totalRecordsCount : 0,
						fixedHeader : true,
						links : [
								'<img class="img" style="margin-bottom: -4px;" src="../lib/images/person.png"><a href="" ng-click="model.changeSupervisor()"> Change Supervisor</a>',
								'<img class="img" style="margin-bottom: -4px;" src="../lib/images/enable.png"><a href="" ng-if="model.multiSelectUpdate" ng-click="model.activateUser()"> Enable User</a><a class="disabled" href="#" ng-if="!model.multiSelectUpdate" ng-click=""> Enable User</a>',
								'<img class="img" style="margin-bottom: -4px;" src="../lib/images/disable.png"><a href="" ng-click="model.InactiveUser()"> Disable User</a>',
								'<img class="img" style="margin-bottom: -4px;" src="../lib/images/multi_roles.png"><a ng-if="model.multiSelectUpdate" href="" ng-click="model.updateRole()"> Update Role</a><a class="disabled" ng-if="!model.multiSelectUpdate" href="#" ng-click=""> Update Role</a>' ],
						pagination : {
							currentPageNumber : 1,
							currentPageNumberInView : 1,
							paginationWindow : 5,
							recordsPerPage : 10,
							recordsPerPageChoices : [ 10, 25, 50, 75, 100 ],
							showPaginationFooter : false,
							pageNumberError : false
						},
						columns : [
							{
								resizable : false,
								columnId : 'multiSelect',
								layoutOrder : 1,
								align : "center",
								excludeFromExport : true,
								cellHeaderTemplate : [
										'<label for="selectAllCheckboxId1" class="oui-a11y-hidden">Select All Checkbox</label> ',
										'<input type="checkbox" ng-model="model.selectAllChecked" ng-disabled="model.records.length === 0" id="selectAllCheckboxId1" ng-change="model.onSelectAllRows(model.selectAllChecked);"/> ' ]
										.join(''),
								cellTemplate : [ '<label for="{{record.index}}" class="oui-a11y-hidden">Select Row</label> ',
										'<input type="checkbox" id="{{record.index}}" ng-model="record.selected" ng-click="model.onRowSelect($event, record, record.selected);"/>' ]
										.join(''),
								},
								{
									columnId : 'lastName',
									label : 'Last Name',
									layoutOrder : 2,
									sortable : true,
									sortOrder : 1,
									style : "text-align: right",
									cellTemplate : '<span ng-bind="::record.lastName" style = "text-align: right;" class="tk-dtbl-as-table-cell"> </span>',
								},
								{
									columnId : 'firstName',
									label : 'First Name',
									layoutOrder : 3,
									sortable : true,
									sortOrder : 0,
									style : "text-align: left",
									cellTemplate : '<span ng-bind="::record.firstName" style = "text-align: left;" class="tk-dtbl-as-table-cell"> </span>'
								},
								{
									columnId : 'userId',
									label : 'User ID',
									layoutOrder : 4,
									sortable : true,
									sortOrder : 0,
									style : "text-align: right",
									cellTemplate : '<span ng-bind="::record.userId" style = "text-align: right;" class="tk-dtbl-as-table-cell"> </span>'
								},
								{
									columnId : 'supervisor',
									label : 'Reports To',
									layoutOrder : 5,
									sortable : true,
									sortOrder : 0,
									style : "text-align: left",
									cellTemplate : '<span ng-bind="::record.supervisor" style = "text-align: left;" class="tk-dtbl-as-table-cell"> </span>'
								},
								{
									columnId : 'role',
									label : 'Role',
									layoutOrder : 6,
									sortable : true,
									sortOrder : 0,
									style : "text-align: right",
									cellTemplate : '<span ng-bind="::record.role" style = "text-align: left;" class="tk-dtbl-as-table-cell"> </span>'
								},
								{
									columnId : 'status',
									label : 'Status',
									layoutOrder : 7,
									sortable : true,
									sortOrder : 0,
									style : "text-align: right",
									cellTemplate : '<span ng-bind="::record.status" style = "text-align: right;" class="tk-dtbl-as-table-cell"> </span>'
								} ],
						/*onRowSelect : function(event, record) {
							$scope.userAdminListModel.selectedRecord = record;
						}*/
					};
					
					$scope.userAdminListModel.onSelectAllRows = function(selectAll) {
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
						if(this.selectedRecordCount > 1){
							$scope.userAdminListModel.multiSelectUpdate = false;
						} else {
							$scope.userAdminListModel.multiSelectUpdate = true;
						}
					}

					$scope.userAdminListModel.onRowSelect = function(event, record, selected) {
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
						if(this.selectedRecordCount > 1){
							$scope.userAdminListModel.multiSelectUpdate = false;
						} else {
							$scope.userAdminListModel.multiSelectUpdate = true;
						}
					}

					$scope.userAdminListModel.onChange = function(filterCondition) {
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

					$scope.userAdminListModel.onExport = function(filterCondition, initiateExport) {
						$scope.initiateExport = initiateExport;

						staticDataService.query(filterCondition, $scope.searchResults, function(result) {
							$scope.initiateExport(result, lookupService.filters.currentTab );
						});
					};

					/*$scope.userAdminListModel.onChange = function(filterCondition) {
						var that = this;
						staticDataService.query(filterCondition, $scope.searchResults, function(result) {
							that.records = result.records;
							that.totalRecordsCount = result.totalRecordsCount;
						});
					};

					$scope.userAdminListModel.onExport = function(filterCondition, initiateExport) {
						$scope.initiateExport = initiateExport;
						staticDataService.query(filterCondition, $scope.searchResults, function(result) {
							$scope.initiateExport(result, lookupService.filters.currentTab);
						});
					};*/

					$scope.userAdminListModel.changeSupervisor = function() {
						if ($scope.userAdminListModel.selectedRecords.length == 0) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Select user record</span>';
							$scope.errorMessageModel.visible = true;
							return false;
						}
						$scope.changeSupervisorDialogObj.changeSupervisorId = '';
						$scope.supervisorPopup = true;
					};

					$scope.userProfileObj = {
						userID : '',
						name : '',
						email : '',
						supervisor : '',
						organization : '',
						picklistModal : {},
						pickListShow : false
					};

					$scope.userProfileObj.picklistModal = {
						availableListTitle : 'Available',
						addButtonText : 'Add >',
						addAllButtonText : 'Add All >>',
						removeButtonText : '< Remove',
						removeAllButtonText : '<< Remove All',
						selectedListTitle : 'Selected',
						enableMultiRowSelection : false,
						showCount:true,
						width : "100px",
						availableList : [],
						selectedList : [],
						columns : [ {
							label:'Roles', 
							cellTemplate : '<span ng-bind="::record.roleName"></span>',
							width : '300px',
							showCount : true

						} ]
					};

					$scope.userAdminListModel.updateRole = function() {
						$scope.userProfileObj.picklistModal.availableList = [];
						$scope.userProfileObj.picklistModal.selectedList = [];
						if ($scope.userAdminListModel.selectedRecords.length == 0) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Select user record</span>';
							$scope.errorMessageModel.visible = true;
							return false;
						}
						var selectedUserRecord;
						angular.forEach($scope.userAdminListModel.selectedRecords, function(obj, idx) {
							selectedUserRecord = obj;
						});
						$http.post('/gcm-app-services/user/administration/getUserRolesList', reqParams({
							userKey : selectedUserRecord.userKey,
							vendorKey : $scope.vendorKey
						}), config).then(
								function(response) {
									for(var i=0 ; i<$scope.filters.roles.length; i++){
										var recordExists = false;
										for(var k=0 ; k<response.data.result.length; k++){
											if($scope.filters.roles[i].roleCode == response.data.result[k].roleCode){
												recordExists = true;
											}
										}
										if(!recordExists){
											$scope.userProfileObj.picklistModal.availableList.push($scope.filters.roles[i]);
										}
									}
									//$scope.userProfileObj.picklistModal.availableList = $scope.filters.roles;
									$scope.userProfileObj.picklistModal.selectedList = response.data.result;
									$scope.userProfilePopup = true;
									$scope.userProfileObj.userID = selectedUserRecord.userId;
									$scope.userProfileObj.name = selectedUserRecord.lastName + ", " + selectedUserRecord.firstName;
									$scope.userProfileObj.email = selectedUserRecord.email;
									$scope.userProfileObj.supervisor = selectedUserRecord.supervisor;
									$scope.userProfileObj.pickListShow = true;
								}, function(error) {
									$scope.errorMessageModel.messageType = 'error';
									$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
									$scope.errorMessageModel.visible = true;
								});
					};

					$scope.updateProfile = function() {
						$scope.showLoadingDialog = true;
						var newAssignedRoles = [];
						var selectedRoles = $scope.userProfileObj.picklistModal.selectedList;
						for(var i=0 ; i < selectedRoles.length; i++){
							var selectedRole = selectedRoles[i];
							newAssignedRoles.push(selectedRole.roleCode);
						}
						$scope.userProfilePopup = false;
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
						var selectedUserRecord;
						angular.forEach($scope.userAdminListModel.selectedRecords, function(obj, idx) {
							selectedUserRecord = obj;
						});
						$http.post('/gcm-app-services/user/administration/updateUserRoles', reqParams({
							userKey : selectedUserRecord.userKey,
							vendorKey : $scope.vendorKey,
							loginUserKey : $scope.loginUserKey,
							roleCodes : newAssignedRoles
						}), config).then(function(response) {
							$scope.errorMessageModel.messageType = 'success';
							$scope.errorMessageModel.content = '<span>User Roles Updated successfully</span>';
							$scope.errorMessageModel.visible = true;
							$scope.userAdminListModel.records = [];
							$scope.userAdminListModel.totalRecordsCount = 0;
							$scope.searchResults = [];
							$scope.userAdminListModel.selectedRecord = undefined;
							$scope.getUserAdminList();
						}, function(error) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
							$scope.errorMessageModel.visible = true;
						});
					}

					$scope.userAdminListModel.InactiveUser = function() {
						if ($scope.userAdminListModel.selectedRecords.length == 0) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Select user record</span>';
							$scope.errorMessageModel.visible = true;
							return false;
						}
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
						var inactiveUserKeys=[];
						angular.forEach($scope.userAdminListModel.selectedRecords, function(obj, idx) {
							inactiveUserKeys.push(obj.userKey);
						});
						$http.post('/gcm-app-services/user/administration/inactiveUser', reqParams({
							userKeys : inactiveUserKeys,
							loginUserKey : $scope.loginUserKey
						}), config).then(function(response) {
							$scope.errorMessageModel.messageType = 'success';
							$scope.errorMessageModel.content = '<span>User Inactivated successfully</span>';
							$scope.errorMessageModel.visible = true;
							$scope.userAdminListModel.records = [];
							$scope.userAdminListModel.totalRecordsCount = 0;
							$scope.searchResults = [];
							$scope.userAdminListModel.selectedRecord = undefined;
							$scope.getUserAdminList();
						}, function(error) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
							$scope.errorMessageModel.visible = true;
						});
					};

					$scope.changeSupervisorDialogObj = {
						changeSupervisorId : ''
					};

					$scope.newUserObj = {
						optumIdText : ''
					};

					$scope.onSelectSupervisor = function() {
						if ($scope.changeSupervisorDialogObj.changeSupervisorId != "" && $scope.errorMessageModel.visible == true) {
							$scope.errorMessageModel.visible = false;
						}
					};

					$scope.changeSupervisor = function() {
						if ($scope.changeSupervisorDialogObj.changeSupervisorId == "") {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Select New Supervisor To Proceed</span>';
							$scope.errorMessageModel.visible = true;
							return false;
						}
						var selectedSupervisor = parseInt($scope.changeSupervisorDialogObj.changeSupervisorId);
						$scope.supervisorPopup = false;
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
						
						angular.forEach($scope.userAdminListModel.selectedRecords, function(obj, idx) {
							if(obj.$$hashKey) {	
								delete obj.$$hashKey;
							}
							obj.newSupervisorId = selectedSupervisor;
							obj.loginUserKey = $scope.loginUserKey;
						});
						$http.post('/gcm-app-services/user/administration/changeSupervisor', $scope.userAdminListModel.selectedRecords).then(function(response) {
							$scope.errorMessageModel.messageType = 'success';
							$scope.errorMessageModel.content = '<span>Supervisor changed successful.</span>';
							$scope.errorMessageModel.visible = true;
							$scope.userAdminListModel.records = [];
							$scope.userAdminListModel.totalRecordsCount = 0;
							$scope.searchResults = [];
							$scope.userAdminListModel.selectedRecord = undefined;
							$scope.getUserAdminList();
						}, function(error) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
							$scope.errorMessageModel.visible = true;
						});
					};

					
					$scope.userAdminListModel.activateUser = function() {
						if ($scope.userAdminListModel.selectedRecords.length == 0) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Select user record</span>';
							$scope.errorMessageModel.visible = true;
							return false;
						}
						$scope.newUserObj.optumIdText = "";
						$scope.activateUserPopup = true;
						
					};

					$scope.getUserAdminList = function() {
						$scope.userAdminListModel.records = [];
						$scope.userAdminListModel.totalRecordsCount = 0;
						$scope.searchResults=[];
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
						$scope.inputData = {
							"lastName" : $scope.filters.memberLastName,
							"firstName" : $scope.filters.memberFirstName,
							"userId" : $scope.filters.userId,
							"role" : $scope.filters.userRole,
							"supervisor" : $scope.filters.supervisor,
							"status" : $scope.filters.userStatus,
							"vendorKey" : $scope.vendorKey
						}
						$scope.projectsList = [];
						$http.post('/gcm-app-services/user/administration/getUserAdminList', $scope.inputData).then(function(response) {
							$scope.userAdminListModel.records = response.data.result;
							$scope.userAdminListModel.totalRecordsCount = response.data.result.length;
							var searchResults = response.data.result;
							angular.forEach(searchResults, function(obj, idx) {
								obj.uniqueIndex = idx + 1;
							});
							$scope.searchResults = response.data.result;
							var obj = {
								recordsPerPage : $scope.userAdminListModel.pagination.recordsPerPage,
								pageNumber : 1,
								sortBy : [$scope.userAdminListModel.columns[1].columnId],
								sortOrder : [1]
							};
							$scope.userAdminListModel.onChange(obj);
							$scope.userAdminListModel.multiSelectUpdate = true;
							$scope.showLoadingDialog = false;
						}, function(error) {
							$scope.showLoadingDialog = false;
							var message = JSON.stringify(error);
						});
					};

				});
