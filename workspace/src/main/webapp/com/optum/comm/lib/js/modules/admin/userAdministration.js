administrationmodule
		.controller(
				'userAdminCtrl',
				function($scope, $compile, $timeout, $http, staticDataService, lookupService, errorMessageModel, dataServiceModel) {
					$scope.lookupService = lookupService;
					$scope.filters = lookupService.filters;
					$scope.errorMessageModel = errorMessageModel;
					$scope.searchResults = [];
					$scope.filters.memberLastName = '';
					$scope.filters.memberFirstName = '';
					$scope.filters.userId = '';
					$scope.filters.userRole = '';
					$scope.filters.supervisor = '';
					$scope.filters.userStatus = '';
					$scope.supervisorPopup = false;
					$scope.activateUserPopup = false;
					$scope.userProfilePopup = false;
					$scope.EnableUserProfilePopup = false;
					$scope.userProfileUIPopup = false;
					$scope.updateVendorPopup=false;
					$scope.filters.supOrganizations=''
					var rootData = window.parent ? window.parent.rootData : {};
					$scope.currentRole = rootData.currentRole;
					$scope.vendorKey = optumUI.getUser().getDefaultVendorKey();
					$scope.loginUserKey = optumUI.getUser().getLoggedInUserKey();
					$scope.groupKey = optumUI.getUser().getCurrentGroupKey();
					$scope.dataModel = dataServiceModel;
					if($scope.currentRole === 'OCUA'){
						$scope.groupKey = $scope.dataModel.groupKey;
						//$scope.lookupService.getGroups($scope.groupKey);
					}
					$scope.loginUserId = optumUI.getAuthUser();
					dataServiceModel.userRoles = CordysRoot.optumUI.getUserRoles();

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
						
						if($scope.filters.userStatus =="" || $scope.filters.userStatus==undefined) 
						{
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Please select Status</span>';
							$scope.errorMessageModel.visible = true;
							$timeout(function () {
								$scope.errorMessageModel.visible = false;
							}, 5000);
							return;
						}
						if($scope.filters.userStatus =="Active" && ($scope.filters.vendor=="" || $scope.filters.vendor==undefined)) 
						{
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Please select Organization</span>';
							$timeout(function () {
								$scope.errorMessageModel.visible = false;
							}, 5000);
							$scope.errorMessageModel.visible = true;
							return;
						}
						$scope.getUserAdminList();
					}

					lookupService.clear = function() {
						$scope.filters.memberLastName = '';
						$scope.filters.memberFirstName = '';
						$scope.filters.userId = '';
						$scope.filters.userRole = '';
						$scope.filters.vendor = '';
						$scope.filters.supervisor = '';
						$scope.filters.userStatus = '',
						$scope.userAdminListModel.records = [];
						$scope.userAdminListModel.totalRecordsCount = 0;
						$scope.userAdminListModel.pagination.currentPageNumberInView = 1;
						$scope.userAdminListModel.pagination.recordsPerPage = 10;
						$scope.userAdminListModel.pagination.pageNumberError = false;
					}

					$scope.userAdminListModel = {
						records : [],
						totalRecordsCount : 0,
						fixedHeader : false,
						links : [
								'<uitk:icon-font icon="cux-icon-person" style="margin-right: 5px;"></uitk:icon-font><a href="" ng-click="model.changeSupervisor()"> Change Supervisor</a>',
								'<uitk:icon-font icon="cux-icon-add" ng-if="model.multiSelectUpdate" style="margin-right: 5px;"></uitk:icon-font><a href="" ng-if="model.multiSelectUpdate" ng-click="model.activateUser()"> Enable User</a><a class="disabled" ng-show=false href="#" ng-click=""> Enable User</a>',
								'<uitk:icon-font icon="cux-icon-prohibited_slash" ng-if="model.multiSelectUpdate" style="margin-right: 5px;"></uitk:icon-font><a ng-if="model.multiSelectUpdate" href="" ng-click="model.InactiveUser()"> Disable User</a>',
								'<uitk:icon-font icon="cux-icon-group" ng-if="model.multiSelectUpdate" style="margin-right: 5px;"></uitk:icon-font><a ng-if="model.multiSelectUpdate" href="" ng-click="model.updateRole()"> Update Role</a>','<uitk:icon-font icon="cux-icon-group" ng-if="model.multiSelectUpdate" style="margin-right: 5px;"></uitk:icon-font><a ng-if="model.multiSelectUpdate" href="" ng-click="model.updateVendor()"> Add/Remove Orgs</a>' ],
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
									cellTemplate : '<a href="" ng-click="model.onLastNameClick(record)"><span ng-bind="::record.lastName"  style = "text-align: left;" class="tk-dtbl-as-table-cell"></a>',
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
								} ]
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

							// Add this code snippet for Select All
							// Functionality
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

					

					$scope.userAdminListModel.changeSupervisor = function() {
						
						if ($scope.userAdminListModel.selectedRecords.length == 0) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Select user record</span>';
							$scope.errorMessageModel.visible = true;
							$timeout(function () {
								$scope.errorMessageModel.visible = false;
							}, 5000);
							return false;
						}
						var selectedUserRecord = $scope.userAdminListModel.selectedRecords[0];
						if(selectedUserRecord && selectedUserRecord.status == "Inactive"){
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Enable user to change supervisor</span>';
							$scope.errorMessageModel.visible = true;
							$timeout(function () {
								$scope.errorMessageModel.visible = false;
							}, 5000);
							return false;
						}
						for(var i =0; i < $scope.userAdminListModel.selectedRecords.length; i++)
						if($scope.userAdminListModel.selectedRecords[i].userId== $scope.loginUserId){
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>User cannot change own supervisor.</span>';
							$scope.errorMessageModel.visible = true;
							$timeout(function () {
								$scope.errorMessageModel.visible = false;
							}, 5000);
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
					
					$scope.viewUserProfileObj ={
							userID : '',
							name : '',
							email : '',
							supervisor : '',
							organization : '',
						};
					
					$scope.userProfileObj.popUpErrorMessageModel = {
						id : 'popUpError',
				        messageType : 'error',
				        content : '',
				        visible : false,
				        ariaAttributes : true,
				        headingLevel : '2'
					}
					$scope.viewUserProfileObj.popUpErrorMessageModel1 = {
							id : 'popUpError',
					        messageType : 'error',
					        content : '',
					        visible : false,
					        ariaAttributes : true,
					        headingLevel : '2'
						}

					$scope.supervisorVendorList = {
							columns : [
							{
									columnId : 'isActive',
									label : '',
									layoutOrder : 1,
									sortable : false,
									style : "text-align: right",
									cellTemplate : '<span> <input type="checkbox" ng-change="model.onVendorChange(record)" ng-model="record.isActiveSW" ng-true-value="\'Y\'" ng-false-value="\'N\'"></span>',
								},
								{
									columnId : 'organizationNm',
									label : 'Organization Name',
									layoutOrder : 2,
									sortable : false,
									style : "text-align: right",
									cellTemplate : '<span ng-bind="::record.vendorName" style = "text-align: right;" class="tk-dtbl-as-table-cell"> </span>',
								}],
								records : [],
								totalRecordsCount : 0
					}
					
					
					$scope.vendorObj=[];
					$scope.supervisorVendorList.onVendorChange =function(record)
					{
						var existingFlag=false;
						angular.forEach($scope.vendorObj, function(obj, idx) {
							
							if(obj.vendorKey==record.vendorKey)
						{
								existingFlag=true;
								obj.isActiveSW=record.isActiveSW;
						}
							else if(!existingFlag)
								existingFlag=false;
						});
						if(!existingFlag){
						$scope.vendorObj.push(record);
						}
					}
					$scope.viewUserProfileObj.userRoleListModel = {
							columns : [
								{
									columnId : 'role',
									label : 'Assigned Roles',
									layoutOrder : 1,
									sortable : false,
									style : "text-align: right",
									cellTemplate : '<span ng-bind="::record.roleName" style = "text-align: right;" class="tk-dtbl-as-table-cell"> </span>',
								}],
								records : [],
								totalRecordsCount : 0
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
							showCount : true

						} ]
					};
		
					$scope.existingRoleList = [];
					$scope.getVendorsList =function()
					{
						$http.post('/gcm-app-services/masterdata/vendorListDetails', reqParams({
							userKey : $scope.userAdminListModel.selectedRecords[0].userKey,
							groupKey :  $scope.dataModel.groupKey ? $scope.dataModel.groupKey :$scope.groupKey,
							roleCode : ($scope.supervisorKey==$scope.loginUserKey && $scope.reqFrom=='updateVendor') ? $scope.currentRole:'SUP',
							supUserKey : $scope.supervisorKey
						}), config).then(function(response) {
							if(response.data && response.data.status == 'SUCCESS'){
								$scope.supervisorVendorList.records = response.data.result;
								$scope.supervisorVendorList.totalRecordsCount = response.data.result.length;
								if($scope.supervisorVendorList.records && $scope.supervisorVendorList.records.length == 1){
									$scope.userProfileObj.vendor = $scope.supervisorVendorList.records[0].vendorKey.toString();
									$scope.onuserProfileVendorChange();
								}
							}else if(response.data && response.data.result){
								$scope.supervisorVendorList.records = [];
								$scope.supervisorVendorList.totalRecordsCount = 0;
								$scope.userProfileObj.popUpErrorMessageModel.messageType = 'error';
								$scope.userProfileObj.popUpErrorMessageModel.content = '<span>' + response.data.result + '</span>';
								$scope.userProfileObj.popUpErrorMessageModel.visible = true;
								$scope.showLoadingDialog = false;
							}
						}, function(error) {
							$scope.userProfileObj.popUpErrorMessageModel.messageType = 'error';
							$scope.userProfileObj.popUpErrorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
							$scope.userProfileObj.popUpErrorMessageModel.visible = true;
							$scope.showLoadingDialog = false;
						});
					}
					$scope.addOrUpdateVendor =function()
					{
						var vendorReqObj = {
								vendorList: $scope.vendorObj,
								userId : $scope.loginUserId,
								userKey : $scope.userAdminListModel.selectedRecords[0].userKey
						};
						$http.post('/gcm-app-services/user/administration/updateUserVendors', 
							 vendorReqObj
						).then(function(response) {
							if(response.data && response.data.status == 'SUCCESS'){
								/*$scope.supervisorVendorList.records = response.data.result;
								$scope.supervisorVendorList.totalRecordsCount = response.data.result.length;*/
								$scope.errorMessageModel.messageType="success";
								$scope.errorMessageModel.content= '<span>' + "User Vendor Updated successfully"+ '</span>';
								$scope.errorMessageModel.visible = true;
								$scope.vendorObj=[];
								$scope.getUserAdminList();
								$scope.updateVendorPopup = false;
							}else if(response.data && response.data.result){
								$scope.userProfileObj.popUpErrorMessageModel.messageType = 'error';
								$scope.userProfileObj.popUpErrorMessageModel.content = '<span>' + response.data.result + '</span>';
								$scope.userProfileObj.popUpErrorMessageModel.visible = true;
								$scope.showLoadingDialog = false;
							}
						}, function(error) {
							$scope.userProfileObj.popUpErrorMessageModel.messageType = 'error';
							$scope.userProfileObj.popUpErrorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
							$scope.userProfileObj.popUpErrorMessageModel.visible = true;
							$scope.showLoadingDialog = false;
						});
						
						
					}
					$scope.userAdminListModel.updateVendor = function() {
						$scope.vendorObj=[];
						if(!($scope.validateUser("vendors")))
							return false;
						$scope.updateVendorPopup=true;
						$scope.reqFrom='updateVendor';
						$scope.getVendorsList();
					}
					$scope.closeUpdateVendorPopup = function(){
						$scope.vendorObj=[];
						$scope.updateVendorPopup = false;
					}
					$scope.addRemoveOrg = function(){
						$scope.addOrUpdateVendor();
					}
					$scope.validateUser =function(reqFrom)
					{
						if ($scope.userAdminListModel.selectedRecords.length == 0) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Select user record</span>';
							$scope.errorMessageModel.visible = true;
							$timeout(function () {
								$scope.errorMessageModel.visible = false;
							}, 5000);
							return false;
						}
						var selectedUserRecord = $scope.userAdminListModel.selectedRecords[0];
						$scope.supervisorKey=selectedUserRecord.supervisorId;
						if(selectedUserRecord.status == "Inactive"){
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Enable user to update '+reqFrom+'</span>';
							$scope.errorMessageModel.visible = true;
							$timeout(function () {
								$scope.errorMessageModel.visible = false;
							}, 5000);
							return false;
						}
						if(selectedUserRecord.userId == $scope.loginUserId){
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>User cannot update own '+reqFrom+'.</span>';
							$scope.errorMessageModel.visible = true;
							$timeout(function () {
								$scope.errorMessageModel.visible = false;
							}, 5000);
							return false;
						}
						return true;
					}
					$scope.userAdminListModel.updateRole = function() {
						$scope.userProfileObj.picklistModal.availableList = [];
						$scope.userProfileObj.picklistModal.selectedList = [];
						$scope.existingRoleList = [];
						$scope.selectedListCopy = [];
						var selectedUserRecord = $scope.userAdminListModel.selectedRecords[0];
						/*if ($scope.userAdminListModel.selectedRecords.length == 0) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Select user record</span>';
							$scope.errorMessageModel.visible = true;
							$timeout(function () {
								$scope.errorMessageModel.visible = false;
							}, 5000);
							return false;
						}
					
						if(selectedUserRecord.status == "Inactive"){
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Enable user to update roles</span>';
							$scope.errorMessageModel.visible = true;
							$timeout(function () {
								$scope.errorMessageModel.visible = false;
							}, 5000);
							return false;
						}
						if(selectedUserRecord.userId == $scope.loginUserId){
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>User cannot update own roles.</span>';
							$scope.errorMessageModel.visible = true;
							$timeout(function () {
								$scope.errorMessageModel.visible = false;
							}, 5000);
							return false;
						}
						*/
						if(!($scope.validateUser("roles")))
							return false;
						if($scope.userProfileObj.popUpErrorMessageModel.visible)
							$scope.userProfileObj.popUpErrorMessageModel.visible = false;
						$scope.userProfileObj.vendor='';
						lookupService.filters.isSupOrgs=true;
						lookupService.filters.supervisorKey=selectedUserRecord.supervisorId;
						$scope.reqFrom='updateRoles';
						$scope.getVendorsList();
						$scope.userProfilePopup = true;
						$scope.userProfileObj.userID = selectedUserRecord.userId;
						$scope.userProfileObj.name = selectedUserRecord.lastName + ", " + selectedUserRecord.firstName;
						$scope.userProfileObj.email = selectedUserRecord.email;
						$scope.userProfileObj.supervisor = selectedUserRecord.supervisor;
						$scope.userProfileObj.pickListShow = true;
						
						
					};
					
					
					$scope.fetchUserRoleList = function()
					{
						
						$scope.userProfileObj.picklistModal.availableList = [];
						$scope.userProfileObj.picklistModal.selectedList = [];
						$scope.existingRoleList = [];
						$scope.selectedListCopy = [];
						if ($scope.userAdminListModel.selectedRecords.length == 0) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Select user record</span>';
							$scope.errorMessageModel.visible = true;
							$timeout(function () {
								$scope.errorMessageModel.visible = false;
							}, 5000);
							return false;
						}
						var selectedUserRecord = $scope.userAdminListModel.selectedRecords[0];
						if(selectedUserRecord.status == "Inactive"){
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Enable user to update roles</span>';
							$scope.errorMessageModel.visible = true;
							$timeout(function () {
								$scope.errorMessageModel.visible = false;
							}, 5000);
							return false;
						}
						if(selectedUserRecord.userId == $scope.loginUserId){
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>User cannot update own roles.</span>';
							$scope.errorMessageModel.visible = true;
							$timeout(function () {
								$scope.errorMessageModel.visible = false;
							}, 5000);
							return false;
						}
						
						$http.post('/gcm-app-services/user/administration/getUserRolesList', reqParams({
							userKey : selectedUserRecord.userKey,
							vendorKey : $scope.userProfileObj.vendor ? $scope.userProfileObj.vendor :   $scope.vendorKey 
						}), config).then(
								function(response) {
									for(var i=0 ; i<$scope.filters.usrAdminRoles.length; i++){
										var recordExists = false;
										for(var k=0 ; k<response.data.result.length; k++){
											if($scope.filters.usrAdminRoles[i].roleCode == response.data.result[k].roleCode){
												recordExists = true;
												break;
											}
										}
										if(!recordExists){
											if($scope.filters.usrAdminRoles[i].roleCode === 'SA'||$scope.filters.usrAdminRoles[i].roleCode === 'IM' ||$scope.filters.usrAdminRoles[i].roleCode === 'OCUA') continue;
											if($scope.filters.usrAdminRoles[i].roleCode === 'SA'||$scope.filters.usrAdminRoles[i].roleCode === 'IM'){
												if((CordysRoot.optumUI.getUserRoles()["SA"])||(CordysRoot.optumUI.getUserRoles()["IM"])){
													$scope.userProfileObj.picklistModal.availableList.push($scope.filters.usrAdminRoles[i]);
												}
											}else{
												$scope.userProfileObj.picklistModal.availableList.push($scope.filters.usrAdminRoles[i]);
											}
												
										}else{
											$scope.existingRoleList.push($scope.filters.usrAdminRoles[i].roleCode);
										}
									}
									
									$scope.userProfileObj.picklistModal.selectedList = response.data.result;
									$scope.availableListCopy = angular.copy($scope.userProfileObj.picklistModal.availableList);
									$scope.selectedListCopy = angular.copy(response.data.result);
									if($scope.userProfileObj.popUpErrorMessageModel.visible)
										$scope.userProfileObj.popUpErrorMessageModel.visible = false;
									
									$scope.userProfileObj.userID = selectedUserRecord.userId;
									$scope.userProfileObj.name = selectedUserRecord.lastName + ", " + selectedUserRecord.firstName;
									$scope.userProfileObj.email = selectedUserRecord.email;
									$scope.userProfileObj.supervisor = selectedUserRecord.supervisor;
									$scope.userProfileObj.pickListShow = true;
								}, function(error) {
									$scope.errorMessageModel.messageType = 'error';
									$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
									$scope.errorMessageModel.visible = true;
									$scope.showLoadingDialog = false;
								});
						
					}
					
					$scope.onuserProfileVendorChange =function()
					{
						$scope.fetchUserRoleList();
						
					}
					$scope.updateProfile = function() {
						if($scope.userProfileObj.vendor=="" || $scope.userProfileObj.vendor==undefined) 
						{
									$scope.userProfileObj.popUpErrorMessageModel.messageType = 'error';
									$scope.userProfileObj.popUpErrorMessageModel.content = '<span>Please select Organization before saving data.</span>';
									$scope.userProfileObj.popUpErrorMessageModel.visible = true;
									return;
							
						}
						var selectedRoles = $scope.userProfileObj.picklistModal.selectedList;
						if(selectedRoles.length > 0)
							$scope.handleUpdateRole();
						else 
							$scope.userProfileObj.showRemoveAllRolesConfirm = true;
					}
					
					
					$scope.updateUserProfile = function() {
						if($scope.userProfileObj.vendor=="" || $scope.userProfileObj.vendor==undefined) 
						{
									$scope.userProfileObj.popUpErrorMessageModel.messageType = 'error';
									$scope.userProfileObj.popUpErrorMessageModel.content = '<span>Please select Organization before saving data.</span>';
									$scope.userProfileObj.popUpErrorMessageModel.visible = true;
									return;
							
						}
						var selectedRoles = $scope.userProfileObj.picklistModal.selectedList;
						if(selectedRoles.length > 0)
							$scope.newUserObj.activateUser();
						else 
							$scope.userProfileObj.showRemoveAllRolesConfirm = true;
					}
					$scope.closeUpdateProfile = function(){
						if($scope.userProfileObj.popUpErrorMessageModel.visible)
							$scope.userProfileObj.popUpErrorMessageModel.visible = false;
						$scope.userProfilePopup = false;
						$scope.userProfileObj.vendor='';
					}
					
					$scope.userProfileObj.handleUpdateProfileConfirmYesClick = function(){
						$scope.userProfileObj.showRemoveAllRolesConfirm = false;
						$scope.handleUpdateRole();
					}

					$scope.userProfileObj.handleUpdateUserProfileConfirmYesClick = function(){
						$scope.userProfileObj.showRemoveAllRolesConfirm = false;
						$scope.newUserObj.activateUser();
					}
					
					$scope.handleUpdateRole = function(){
						$scope.showLoadingDialog = true;
						var newAssignedRoles = [];
						var selectedRoles = $scope.userProfileObj.picklistModal.selectedList;
						for(var i=0 ; i < selectedRoles.length; i++){
							var selectedRole = selectedRoles[i];
							
							newAssignedRoles.push(selectedRole.roleCode);
						}
						
						if($scope.userProfileObj.picklistModal.selectedList.length == $scope.selectedListCopy.length){
							var rolesUpdated = false;
							for(var i =0; i <  $scope.selectedListCopy.length; i++){
								var role = $scope.selectedListCopy[i];
								if(newAssignedRoles.indexOf(role.roleCode) < 0){
									rolesUpdated = true;
								}
							}
							
							if(!rolesUpdated){
								$scope.showLoadingDialog = false;
								$scope.userProfileObj.popUpErrorMessageModel.messageType = 'error';
								$scope.userProfileObj.popUpErrorMessageModel.content = '<span>No Roles updated to save.</span>';
								$scope.userProfileObj.popUpErrorMessageModel.visible = true;
								return false;
							}
						}
						$scope.userProfilePopup=false;
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
						var selectedUserRecord;
						angular.forEach($scope.userAdminListModel.selectedRecords, function(obj, idx) {
							selectedUserRecord = obj;
						});
						
						$http.post('/gcm-app-services/user/administration/updateUserRoles', reqParams({
							userKey : selectedUserRecord.userKey,
							vendorKey : $scope.userProfileObj.vendor ? $scope.userProfileObj.vendor :   $scope.vendorKey,
							loginUserKey : $scope.loginUserKey,
							roleCodes : newAssignedRoles,
							existingRoleCodes : $scope.existingRoleList,
							userId : $scope.loginUserId
						}), config).then(function(response) {
							if(response.data.status == 'ERROR'){
								$scope.showLoadingDialog = false;
								$scope.userProfileObj.popUpErrorMessageModel.messageType = 'error';
								$scope.userProfileObj.popUpErrorMessageModel.content = '<span>'+response.data.result+'</span>';
								$scope.userProfileObj.popUpErrorMessageModel.visible = true;
								$scope.userProfileObj.picklistModal.selectedList = angular.copy($scope.selectedListCopy);
								$scope.userProfileObj.picklistModal.availableList = angular.copy($scope.availableListCopy);
							}else{
								$scope.showLoadingDialog = false;
								$scope.errorMessageModel.messageType = 'success';
								if( response.data.result == 'SUCCESS'){
									$scope.errorMessageModel.content = '<span>User Roles Updated successfully</span>';
								}else{
									$scope.errorMessageModel.messageType = 'error';
									$scope.errorMessageModel.content = '<span>'+response.data.result+'</span>';
								}
								$scope.errorMessageModel.visible = true;
								$scope.userAdminListModel.records = [];
								$scope.userAdminListModel.totalRecordsCount = 0;
								$scope.searchResults = [];
								$scope.userAdminListModel.selectedRecord = undefined;
								$scope.getUserAdminList();
								if($scope.userProfileObj.popUpErrorMessageModel.visible)
									$scope.userProfileObj.popUpErrorMessageModel.visible = false;
								$scope.userProfilePopup = false;
							}
						}, function(error) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
							$scope.errorMessageModel.visible = true;
							$scope.showLoadingDialog = false;
							$scope.availableListCopy =[];
							$scope.selectedListCopy=[];
						});
						$scope.userProfileObj.vendor='';
					}

					$scope.userAdminListModel.InactiveUser = function() {
						if ($scope.userAdminListModel.selectedRecords.length == 0) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Select user record</span>';
							$scope.errorMessageModel.visible = true;
							$timeout(function () {
								$scope.errorMessageModel.visible = false;
							}, 5000);
							return false;
						}
						if ($scope.userAdminListModel.selectedRecords.length > 1) {
							return false;
						}
						
						var selectedRecord = $scope.userAdminListModel.selectedRecords[0];
						if(selectedRecord.status == 'Inactive'){
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>User already Inactivated</span>';
							$scope.errorMessageModel.visible = true;
							$timeout(function () {
								$scope.errorMessageModel.visible = false;
							}, 5000);
							return false;
						}
						if(selectedRecord.userId == $scope.loginUserId){
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>User cannot inactivate own roles.</span>';
							$scope.errorMessageModel.visible = true;
							$timeout(function () {
								$scope.errorMessageModel.visible = false;
							}, 5000);
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
						
						$http.post('/gcm-app-services/user/administration/inactiveUser', reqParams({
							userKey : selectedRecord.userKey,
							loginUserKey : $scope.loginUserKey
						}), config).then(function(response) {
							if(response.data && response.data.result == 'SUCCESS'){
								$scope.errorMessageModel.messageType = 'success';
								$scope.errorMessageModel.content = '<span>User Inactivated successfully</span>';
								$scope.errorMessageModel.visible = true;
								$scope.userAdminListModel.records = [];
								$scope.userAdminListModel.totalRecordsCount = 0;
								$scope.searchResults = [];
								$scope.userAdminListModel.selectedRecord = undefined;
								$scope.getUserAdminList();
							}else if(response.data && response.data.result){
								$scope.errorMessageModel.messageType = 'error';
								$scope.errorMessageModel.content = '<span>' + response.data.result + '</span>';
								$scope.errorMessageModel.visible = true;
								$scope.showLoadingDialog = false;
							}
						}, function(error) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
							$scope.errorMessageModel.visible = true;
							$scope.showLoadingDialog = false;
						});
					};

					$scope.changeSupervisorDialogObj = {
						changeSupervisorId : ''
							
					};

					$scope.newUserObj = {
						emailIdText : ''
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
							$timeout(function () {
								$scope.errorMessageModel.visible = false;
							}, 5000);
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
							$scope.showLoadingDialog = false;
						});
					};

					
					$scope.fetchUserRoleListForEnablingUsers = function()
					{
						$scope.userProfileObj.picklistModal.selectedList = [];
						$scope.existingRoleList = [];
						$scope.selectedListCopy = [];		
						$scope.userProfileObj.picklistModal.availableList=[];
						$http.post('/gcm-app-services/user/administration/getUserRolesList', reqParams({
							userKey : $scope.selectedActivateUserRecord.userKey,
							vendorKey : $scope.userProfileObj.vendor ? $scope.userProfileObj.vendor :   $scope.vendorKey  
						}), config).then(
								function(response) {
									for(var i=0 ; i<$scope.filters.usrAdminRoles.length; i++){
										var recordExists = false;
										for(var k=0 ; k<response.data.result.length; k++){
											if($scope.filters.usrAdminRoles[i].roleCode == response.data.result[k].roleCode){
												recordExists = true;
												break;
											}
										}
										if(!recordExists){
											if($scope.filters.usrAdminRoles[i].roleCode === 'SA'||$scope.filters.usrAdminRoles[i].roleCode === 'IM' || $scope.filters.usrAdminRoles[i].roleCode === 'OCUA') continue;
											if($scope.filters.usrAdminRoles[i].roleCode === 'SA'||$scope.filters.usrAdminRoles[i].roleCode === 'IM'){
												if((CordysRoot.optumUI.getUserRoles()["SA"])||(CordysRoot.optumUI.getUserRoles()["IM"])){
													$scope.userProfileObj.picklistModal.availableList.push($scope.filters.usrAdminRoles[i]);
												}
											}else{
												$scope.userProfileObj.picklistModal.availableList.push($scope.filters.usrAdminRoles[i]);
											}
												
										}else{
											$scope.existingRoleList.push($scope.filters.usrAdminRoles[i].roleCode);
										}
									}
									
									$scope.userProfileObj.picklistModal.selectedList = response.data.result;
									$scope.availableListCopy = angular.copy($scope.userProfileObj.picklistModal.availableList);
									$scope.selectedListCopy = angular.copy(response.data.result);
									if($scope.userProfileObj.popUpErrorMessageModel.visible)
										$scope.userProfileObj.popUpErrorMessageModel.visible = false;
									
									$scope.userProfileObj.userID = $scope.selectedActivateUserRecord.userId;
									$scope.userProfileObj.name = $scope.selectedActivateUserRecord.lastName + ", " + $scope.selectedActivateUserRecord.firstName;
									$scope.userProfileObj.email = $scope.selectedActivateUserRecord.email;
									$scope.userProfileObj.supervisor = $scope.selectedActivateUserRecord.supervisor;
									$scope.userProfileObj.pickListShow = true;
								}, function(error) {
									$scope.errorMessageModel.messageType = 'error';
									$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
									$scope.errorMessageModel.visible = true;
									$scope.showLoadingDialog = false;
								});
						
					}
					$scope.closeUpdateUserProfile = function(){
					if($scope.userProfileObj.popUpErrorMessageModel.visible)
						$scope.userProfileObj.popUpErrorMessageModel.visible = false;
					$scope.EnableUserProfilePopup = false;
					$scope.userProfileObj.vendor='';
				}

					$scope.userAdminListModel.activateUser = function() {
						
						if ($scope.userAdminListModel.selectedRecords.length == 0) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Select user record</span>';
							$scope.errorMessageModel.visible = true;
							$timeout(function () {
								$scope.errorMessageModel.visible = false;
							}, 5000);
							return false;
						}
						if ($scope.userAdminListModel.selectedRecords.length == 1) {
							var selectedRecord = $scope.userAdminListModel.selectedRecords[0];
							if(selectedRecord.status == 'Active'){
								$scope.errorMessageModel.messageType = 'error';
								$scope.errorMessageModel.content = '<span>User already Active</span>';
								$scope.errorMessageModel.visible = true;
								$timeout(function () {
									$scope.errorMessageModel.visible = false;
								}, 5000);
								return false;
							}
							$scope.newUserObj.emailIdText = "";
							$scope.newUserObj.supervisor = "";
							$scope.newUserObj.isValidEmail = false;
							$scope.activateUserPopup = true;
							
						}else{
							return false;
						}
					};
					
					$scope.newUserObj.validateUser = function(){
						var selectedUserRecord = $scope.userAdminListModel.selectedRecords[0];
						$http.post('/gcm-app-services/user/administration/validateUser', reqParams({
							emailid : $scope.newUserObj.emailIdText,
							userKey : selectedUserRecord.userKey
						}), config).then(function(response) {
							if(response.data && response.data.result && response.data.result.loginUserKey){
								var userKey = response.data.result.key;
								$scope.isUserHasRoles = response.data.result.value > 0;
								$scope.newUserObj.isValidEmail = true;
								$scope.userAdminsupervisors(userKey);
							}
							else
								{
								$scope.errorMessageModel.messageType = 'error';
								$scope.errorMessageModel.content = '<span>Invalid EmailId</span>';
								$scope.errorMessageModel.visible = true;
								$timeout(function () {
									$scope.errorMessageModel.visible = false;
								}, 5000);
								}
						}, function(error) {
							$scope.showLoadingDialog = false;
							var message = JSON.stringify(error);
							
						});
					}
					
					$scope.userAdminsupervisors = function(userKey) {
						$scope.newUserObj.supervisor = '';
						$scope.newUserObj.userAdminSupervisors = [];
						$scope.newUserObj.supervisorList = [];
						$http.post('/gcm-app-services/masterdata/getSupervisorsByVendor', reqParams({
							vendorKey : $scope.filters.vendor ? $scope.filters.vendor :$scope.vendorKey,
							loginUserKey : $scope.loginUserKey,
							groupKey :  $scope.dataModel.groupKey ? $scope.dataModel.groupKey :$scope.groupKey,
							roleCode : 'SUP'
						}), config).then(function(response) {
							$scope.newUserObj.userAdminSupervisors = response.data.result;
							var userAdminSupList = response.data.result;
							for(var i =0; i < userAdminSupList.length; i++){
								$scope.newUserObj.supervisorList[userAdminSupList[i].loginUserKey] = userAdminSupList[i].fullName;
							}
							$scope.newUserObj.isUserAdminSupervisors=true;
						}, function(error) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
							$scope.errorMessageModel.visible = true;
						});
					};
					$scope.newUserObj.activateUser = function(){
						$scope.EnableUserProfilePopup = true;
						lookupService.filters.isSupOrgs = true;
						var selectedUserRecord;
						angular.forEach($scope.userAdminListModel.selectedRecords, function(obj, idx) {
							selectedUserRecord = obj;
							$scope.selectedActivateUserRecord=selectedUserRecord;
						});
						
						if($scope.newUserObj.isUserAdminSupervisors)
						{
						$scope.userAdminListModel.updateUsersRole();
						}
						
						$http.post('/gcm-app-services/masterdata/vendorsAssignedByUser', reqParams({
							businessSegment : '',
							programKey : $scope.filters.program,
							businessFuncKey :'',
							hpKey : $scope.filters.hp,
							supervisorKey : $scope.newUserObj.supervisor,
							groupKey : $scope.dataModel.groupKey ? $scope.dataModel.groupKey :$scope.groupKey,
							roleCode :'SUP',
						}), config).then(function(response) {
							$scope.filters.supOrganizations = response.data.result;
							if($scope.filters.supOrganizations && $scope.filters.supOrganizations.length == 1){
								$scope.userProfileObj.vendor = $scope.filters.supOrganizations[0].key;
								$scope.onuserProfileVendorChangeForEnable();
							}
						}, function(error) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
							$scope.errorMessageModel.visible = true;
						});
					}
					
					$scope.onuserProfileVendorChangeForEnable =function()
					{
						$scope.fetchUserRoleListForEnablingUsers();
					}
					
					
					$scope.existingRoleList = [];
					$scope.userAdminListModel.updateUsersRole = function() {
						$scope.userProfileObj.picklistModal.availableList = [];
						$scope.userProfileObj.picklistModal.selectedList = [];
						$scope.existingRoleList = [];
						$scope.selectedListCopy = [];

						if($scope.userProfileObj.popUpErrorMessageModel.visible)
							$scope.userProfileObj.popUpErrorMessageModel.visible = false;
						$scope.userProfileObj.vendor='';
						lookupService.filters.supervisorKey=$scope.selectedActivateUserRecord.supervisorId;
						$scope.EnableUserProfilePopup = true;
						$scope.userProfileObj.userID = $scope.selectedActivateUserRecord.userId;
						$scope.userProfileObj.name = $scope.selectedActivateUserRecord.lastName + ", " + $scope.selectedActivateUserRecord.firstName;
						$scope.userProfileObj.email = $scope.selectedActivateUserRecord.email;
						$scope.userProfileObj.supervisor = $scope.selectedActivateUserRecord.supervisor;
						$scope.userProfileObj.pickListShow = true;	
					};
					
					// this function enables the disabled user with/without
					// adding new roles
					$scope.enableUser = function(){
						var selectedUserRecord = $scope.userAdminListModel.selectedRecords[0];
						 $scope.rolesToAdd = [];
							var selectedRoles = $scope.userProfileObj.picklistModal.selectedList;
							for(var i=0 ; i < selectedRoles.length; i++){
								var selectedRole = selectedRoles[i];
								$scope.rolesToAdd.push(selectedRole.roleCode);
							}
							if($scope.userProfileObj.picklistModal.selectedList.length == $scope.selectedListCopy.length){
								var rolesUpdated = false;
								for(var i =0; i <  $scope.selectedListCopy.length; i++){
									var role = $scope.selectedListCopy[i];
									if($scope.rolesToAdd.indexOf(role.roleCode) < 0){
										rolesUpdated = true;
									}
								}
								$scope.showLoadingDialog = true;
								$scope.EnableUserProfilePopup = false;
								$scope.activateUserPopup=false;
								
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
							
							}
						$http.post('/gcm-app-services/user/administration/activateUser', reqParams({
							emailid : $scope.newUserObj.emailIdText,
							userKey : selectedUserRecord.userKey,
							loginUserKey : $scope.loginUserKey,
							supervisorKey : $scope.newUserObj.supervisor,
							roleCodes : $scope.rolesToAdd,
							vendorKey: $scope.userProfileObj.vendor ? $scope.userProfileObj.vendor :   $scope.vendorKey
							
						}), config).then(function(response) {
							if(response.data && response.data.result == 'SUCCESS'){
								$scope.newUserObj.isValidEmail = false;
								$scope.activateUserPopup = false;
								$scope.EnableUserProfilePopup = false;
								$scope.errorMessageModel.messageType = 'success';
								$scope.errorMessageModel.content = '<span>User Enabled successfully</span>';
								$scope.errorMessageModel.visible = true;
								$scope.userAdminListModel.records = [];
								$scope.userAdminListModel.totalRecordsCount = 0;
								$scope.searchResults = [];
								$scope.userAdminListModel.selectedRecords = [];
								$scope.userAdminListModel.selectedRecord = undefined;
								$scope.getUserAdminList();
								$scope.newUserObj.supervisor = '';
							}else{
								if(response.data && response.data.result){
									$scope.errorMessageModel.messageType = 'error';
									$scope.errorMessageModel.content = '<span>'+response.data.result+'</span>';
									$scope.errorMessageModel.visible = true;
									return false;
								}
							}
						}, function(error) {
							$scope.EnableUserProfilePopup = false;
							var message = JSON.stringify(error);
						});
					}

					$scope.userAdminListModel.onLastNameClick=function(record){
						$scope.existingRoleList = [];
						if($scope.viewUserProfileObj.popUpErrorMessageModel1.visible)
							$scope.viewUserProfileObj.popUpErrorMessageModel1.visible = false;
						record.selected = !record.selected;
						$scope.userProfileObj.vendor='';
						lookupService.getVendors();
						lookupService.filters.isSupOrgs=true;
						$scope.userProfileUIPopup = true;
						$scope.viewUserProfileObj.userID = record.userId;
						$scope.viewUserProfileObj.name = record.lastName + ", " + record.firstName;
						$scope.viewUserProfileObj.email = record.email;
						$scope.viewUserProfileObj.supervisor =record.supervisor;
						$scope.viewUserProfileObj.userRoleListModel.records = [];
						$scope.viewUserProfileObj.userRoleListModel.totalRecordsCount = 0;
						$scope.viewUserProfileObj.userKey = record.userKey;
						$scope.getOrganizations();
					};
					
					$scope.viewProfileVendorChange = function(){
						$scope.readUserRolesByVendor();
					}
					
					$scope.getOrganizations = function() {
						$http.post('/gcm-app-services/masterdata/vendorsForUserProfile', reqParams({
							'groupKey' :   $scope.dataModel.groupKey ? $scope.dataModel.groupKey :$scope.groupKey,
							'userKey' : $scope.viewUserProfileObj.userKey 
						}), config).then(function(response) {
							if(response.data && response.data.result){
								$scope.viewUserProfileObj.organizations = response.data.result;
								if($scope.viewUserProfileObj.organizations.length > 0)
								{
									$scope.viewUserProfileObj.vendor = $scope.viewUserProfileObj.organizations[0].key;
									$scope.readUserRolesByVendor();
								}
							}
							
						}, function(error) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
							$scope.errorMessageModel.visible = true;
						});
					};
					
					$scope.readUserRolesByVendor = function(){
						$http.post('/gcm-app-services/user/administration/getUserRolesList', reqParams({
							'userKey' : $scope.viewUserProfileObj.userKey,
							'vendorKey' : $scope.viewUserProfileObj.vendor 
						}), config).then(
								function(response) {
									$scope.viewUserProfileObj.userRoleListModel.records = response.data.result;
									$scope.viewUserProfileObj.userRoleListModel.totalRecordsCount = response.data.result.length;
								});
					}
					
					$scope.getUserAdminList = function() {
						$scope.userAdminListModel.records = [];
						$scope.userAdminListModel.totalRecordsCount = 0;
						$scope.userAdminListModel.selectedRecords = [];
						$scope.userAdminListModel.selectedRecordCount = 0;
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
							"vendorKey" : $scope.filters.vendor ? $scope.filters.vendor :$scope.vendorKey
						}
						$scope.projectsList = [];
						$http.post('/gcm-app-services/user/administration/getUserAdminList', $scope.inputData).then(function(response) {
							$scope.userAdminListModel.records = response.data.result;
							$scope.userAdminListModel.totalRecordsCount = response.data.result.length;
							$scope.userAdminListModel.selectedRecords = [];
							$scope.userAdminListModel.selectedRecordCount = 0;
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
							$scope.userAdminListModel.pagination.currentPageNumber = 1;
							$scope.userAdminListModel.multiSelectUpdate = true;
							$scope.showLoadingDialog = false;
						}, function(error) {
							$scope.showLoadingDialog = false;
							var message = JSON.stringify(error);
						});
					};

				});