utilitymodule
		.controller(
				'projectCloseCtrl',
				function($scope, $compile, $timeout, $http, staticDataService, lookupService, errorMessageModel) {
					$scope.lookupService = lookupService;
					$scope.filters = lookupService.filters;
					$scope.errorMessageModel = errorMessageModel;
					$scope.projectsList = [];
					$scope.projectListShow = false;
					$scope.showExtractPopup = false;
					$scope.isChecked = false;
					$scope.searchResults = [];
					$scope.filters.busSegment = '';
					$scope.filters.projectIDText = '';						
					$scope.filters.projectKey = '';
					$scope.filters.projectYear = '';

					var userObj = optumUI.getUser();
					$scope.loginUserKey = userObj.getLoggedInUserKey();
					$scope.currentGroupKey = userObj.getCurrentGroupKey();
					$scope.vendorKey = optumUI.getUser().getDefaultVendorKey();
					
					/*if(lookupService.filters.serviceConfigRegionList.length == 1){
						$scope.filters.region = lookupService.filters.serviceConfigRegionList[0].key;
					}*/
					
					//lookupService.filters.currentTab = 'projClose';

					lookupService.filter = function() {
						$scope.errorMessageModel.visible = false;
						$scope.projectListModel.hasProjCloseConfigured = false;
						$scope.getProjectsList();
						if($scope.filters.projectYear!="" && ($scope.filters.projectYear.length > 4 || $scope.filters.projectYear.length < 4))
						{
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Project Year should be 4 digits.</span>';
							$scope.errorMessageModel.visible = true;							
						}
					}
					lookupService.projectIdValidation = function(){
						if($scope.filters.projectIDText!=""){
							var projectIdPattern = /^[0-9]+$/;
							var regEx = new RegExp(projectIdPattern);
							var flag = regEx.test($scope.filters.projectIDText);
							if(!flag)
							{
								$scope.errorMessageModel.messageType = 'error';
								$scope.errorMessageModel.content = '<span>Project Id should be numeric</span>';
								$scope.errorMessageModel.visible = true;							
							} else {
								$scope.errorMessageModel.visible = false;
							}
						}
						if($scope.filters.projectIDText==""){
							$scope.errorMessageModel.visible = false;
						}
							
					}
					lookupService.projectYearValidation= function(){
						var projectYearPattern = /^[0-9]+$/;
						var regEx = new RegExp(projectYearPattern);
						var flag = regEx.test($scope.filters.projectYear);
						if(!flag && $scope.filters.projectYear!=""){
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Project Year should be numeric and 4 digits.</span>';
							$scope.errorMessageModel.visible = true;							
							}
							else
								$scope.errorMessageModel.visible = false;							
							
					}
					
					
					lookupService.segmentProjectsDisplay = function(){
						$scope.filters.closeProjects = [];
						if($scope.filters.busSegment == ''){
							$scope.filters.closeProjects = $scope.filters.closeProjectsList;
						} else {
							angular.forEach($scope.filters.closeProjectsList, function(projectsObj, index){
			                    if (projectsObj.businessSegment == $scope.filters.busSegment) {
			                    	$scope.filters.closeProjects.push(projectsObj);
			                    }
			                });
						}
						$scope.filters.projectKey = '';
					}
					
					lookupService.segmentDisplay = function(){
						angular.forEach($scope.filters.closeProjects, function(projectsObj, index){
		                    if (projectsObj.projKey == $scope.filters.projectKey) {
		                    	$scope.filters.busSegment = projectsObj.businessSegment;
		                    }
		                });
					}
					
					lookupService.clear = function() {
						$scope.errorMessageModel.visible = false;
						$scope.filters.busSegment = '';
						lookupService.segmentProjectsDisplay();
						$scope.filters.projectIDText = '';						
						$scope.filters.projectKey = '';
						$scope.filters.projectYear = '';
						$scope.projectListModel.records = [];
						$scope.projectListModel.totalRecordsCount = 0;
						$scope.projectListModel.pagination.currentPageNumberInView = 1;
						$scope.projectListModel.pagination.recordsPerPage = 10;
						$scope.projectListModel.pagination.pageNumberError = false;
					}

					$scope.projectCloseFilters = {
						id : 'projectClosePanel',
						title : 'Filters',
						templateUrl : '../utilities/projectCloseFilters.htm',
						open : true,
						headerClass : 'tk-panl-with-underline',
						collapsible : true
					};
					$scope.projectListModel = {
						records : [],
						totalRecordsCount : 0,
						fixedHeader : true,
						links : [ '<span ng-if="model.hasProjCloseConfigured"><img class="img" style="margin-bottom: -4px;" src="../lib/images/cancel.png"><a href="" ng-click="model.closeProject()"> Close Project</a></span>' ],

						pagination : {
							currentPageNumber : 1,
							currentPageNumberInView : 1,
							paginationWindow : 5,
							recordsPerPage : 10,
							recordsPerPageChoices : [10, 25, 50, 75, 100],
							showPaginationFooter : false,
							pageNumberError : false	
						},
						columns : [
								{
									columnId : 'radio',
									sortOrder : 1,
									sortable : false,
									layoutOrder : 1,
									enableSearch : false,
									cellTemplate : '<input type="radio" id="{{record.index}}" name="myAppRadio" ng-click="model.onRowSelect($event,record)"/>'
								}, {
									columnId : 'projKey',
									label : 'Project ID',
									layoutOrder : 2,
									sortable : true,
									sortOrder : 1,
									style : "text-align: right",
									cellTemplate : '<span ng-bind="::record.projKey" style = "text-align: right;" class="tk-dtbl-as-table-cell"> </span>',
								}, {
									columnId : 'projName',
									label : 'Project Name',
									layoutOrder : 3,
									sortable : true,
									sortOrder : 0,
									style : "text-align: left",
									cellTemplate : '<span ng-bind="::record.projName" style = "text-align: left;" class="tk-dtbl-as-table-cell"> </span>'
								}, {
									columnId : 'projectYear',
									label : 'Project Year',
									layoutOrder : 4,
									sortable : true,
									sortOrder : 0,
									style : "text-align: right",
									cellTemplate : '<span ng-bind="::record.projectYear" style = "text-align: right;" class="tk-dtbl-as-table-cell"> </span>'
								}, {
									columnId : 'busSegment',
									label : 'Business Segment',
									layoutOrder : 5,
									sortable : true,
									sortOrder : 0,
									style : "text-align: left",
									cellTemplate : '<span ng-bind="::record.busSegment" style = "text-align: left;" class="tk-dtbl-as-table-cell"> </span>'
								}, {
									columnId : 'totalCount',
									label : 'Total Count',
									layoutOrder : 6,
									sortable : true,
									sortOrder : 0,
									style : "text-align: right",
									cellTemplate : '<span ng-bind="::record.totalCount" style = "text-align: right;" class="tk-dtbl-as-table-cell"> </span>'
								} ],
						onRowSelect : function(event, record) {
							$scope.projectListModel.selectedRecord = record;
						}

					};
					
					$scope.projectListModel.onChange = function(filterCondition) {
						var that = this;
						staticDataService.query(filterCondition, $scope.searchResults, function(result) {
							that.records = result.records;
							that.totalRecordsCount = result.totalRecordsCount;
						});
					};
					
					$scope.getProjectsList = function() {
						$scope.showLoadingDialog=true;
						$('#uitkPopupId1_headerId').css({
							display: 'none'
						});
						$('#uitkPopupId1_closeLink').css({
							display: 'none'
						});
						$('#uitkPopupId1').css({'border-width':'unset','border-style' : 'none'});
						$scope.inputData = {
							"createDate" : null,
							"loginUserKey" : $scope.loginUserKey,
							"groupKey" : $scope.currentGroupKey,
							"requestedUser" : null,
							"fileKey" : null,
							"projKey" : ($scope.filters.projectIDText != null &&  $scope.filters.projectIDText != "") ? $scope.filters.projectIDText : $scope.filters.projectKey,
							"projYear" : $scope.filters.projectYear,
							"fileName" : null,
							"busSegment" : $scope.filters.busSegment,
							"region":$scope.filters.region
						}

						$scope.projectsList = [];
						if($scope.filters.region == '')
						{
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Region is mandatory.</span>';
							$scope.errorMessageModel.visible = true;
							$scope.showLoadingDialog=false;
							return;
						}
						$http.post('/gcm-app-services/utilities/project/getProjectListforClose', $scope.inputData).then(function(response) {
							$scope.projectListModel.records = response.data.result;
							$scope.projectListModel.totalRecordsCount = response.data.result.length;
							$scope.searchResults = response.data.result;
							$scope.showLoadingDialog=false;
							
							var obj = {
									recordsPerPage : $scope.projectListModel.pagination.recordsPerPage,
									pageNumber : 1,
									sortBy : [$scope.projectListModel.columns[1].columnId],
									sortOrder : [1]
							};
							for(var i = 0; i < lookupService.filters.serviceConfigRegionList.length; i++){
								if($scope.filters.region == lookupService.filters.serviceConfigRegionList[i].key){
									$scope.projectListModel.hasProjCloseConfigured = true;
									break;
								}
							}
							$scope.projectListModel.onChange(obj);
							
							
						}, function(error) {
							var message = JSON.stringify(error);
							$scope.showLoadingDialog=false;
						});
					};
					
					$scope.closeProjectDialogObj = {
						extractCheckbox : 0
					};

					$scope.projectListModel.closeProject = function() {
						if ($scope.projectListModel.selectedRecord == undefined) {
							$scope.errorMessageModel.messageType = 'error';
							$scope.errorMessageModel.content = '<span>Select project Id to close</span>';
							$scope.errorMessageModel.visible = true;
							return false;
						}
						$scope.projectListModel.selectedRecord;
						$scope.closeProjectDialogObj.extractCheckbox = 0;
						$scope.showExtractPopup = true;
					};

					

					$scope.closeDialog = function() {
						$scope.showLoadingDialog=true;
						$('#uitkPopupId1_headerId').css({
							display: 'none'
						});
						$('#uitkPopupId1_closeLink').css({
							display: 'none'
						});
						$('#uitkPopupId1').css({'border-width':'unset','border-style' : 'none'});
					
						var isExtract = $scope.closeProjectDialogObj.extractCheckbox==1?true:false;
						$scope.showExtractPopup = false;
						$scope.inputData = {
							"projKey" : $scope.projectListModel.selectedRecord.projKey,
							"userId" : $scope.loginUserKey,
							"isImgExt" : isExtract,
							"region":$scope.filters.region
						}
						$scope.closeProjectDialogObj.extractCheckbox = 0;
						$http.post('/gcm-app-services/utilities/project/closeProjectwithExtract', $scope.inputData).then(function(response) {
							if(response.data.result === 'INVALID') {
								$scope.errorMessageModel.messageType = 'error';
								$scope.errorMessageModel.content = '<span>Selected project is not eligible to close</span>';
								$scope.errorMessageModel.visible = true;
							} else if(response.data.result === 'SUCCESS') {
								$scope.errorMessageModel.messageType = 'success';
								$scope.errorMessageModel.content = '<span>Project Close successful.</span>';
								$scope.errorMessageModel.visible = true;
							} else {
								$scope.errorMessageModel.messageType = 'error';
								$scope.errorMessageModel.content = '<span>System error.</span>';
								$scope.errorMessageModel.visible = true;
							}
							$scope.projectListModel.records = [];
							$scope.projectListModel.totalRecordsCount = 0;
							$scope.getProjectsList();
							$scope.showLoadingDialog=false;
						}, function(error) {
							var message = JSON.stringify(error);
						});
					}

				});