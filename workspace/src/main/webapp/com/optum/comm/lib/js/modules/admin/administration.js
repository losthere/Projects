var administrationmodule = angular.module('administrationApp', ['uitk.component.uitkPanel','uitk.component.uitkDynamicTable', 'uitk.component.uitkIconFont',
	'uitk.component.uitkCalendar','uitk.component.uitkLabel','uitk.component.uitkTextField','uitk.component.uitkButton', 'uitk.component.tabs',
	'uitk.uitkUtility','uitk.component.uitkDialog','uitk.component.uitkRadioGroup','ngSanitize', 'uitk.component.uitkMessage', 
	'uitk.component.uitkTextarea', 'uitk.component.uitkNavigable', 'staticDataService','ngDialog','looup-data','uitk.component.uitkPicklist','userViewModel', 'uploadUserViewModel']);

administrationmodule.factory("dataServiceModel", function() {
	var dataObj = {};
	dataObj.showUploadError = false;
    dataObj.errorMsg = false;
    dataObj.uploadErrorMsg = '';
	return dataObj;
});

administrationmodule.controller("administrationCtrl", function($scope, $http, $compile, $filter, $timeout, staticDataService, lookupService, dataServiceModel) {
	
	$scope.lookupService = lookupService;
	$scope.url = 'administrationTabs.htm';
	var rootData = window.parent ? window.parent.rootData : {};
	dataServiceModel.currentRole = rootData.currentRole;
	$scope.dataModel = dataServiceModel;
	
	$scope.loginUserKey = optumUI.getUser().getLoggedInUserKey();
	
	$scope.$watch('lookupService.url',function(newVal,oldVal){
		if(newVal !== '')
			$scope.url = lookupService.url;
	});
	
	var userRegTab = {
			title : 'User Registration',
			templateurl : '../useradmin/home.htm',
			callback : function(event, tabData) {
				lookupService.filters.currentTab = 'userRegistration';
				$scope.handleGroupchange();
			}
	};
	
	var userAdminTab = {
			title : 'User Administration',
			templateurl : 'userAdministration.htm',
			callback : function(event, tabData) {
				lookupService.filters.currentTab = 'userAdministration';
				lookupService.filters.vendor='';
				$scope.handleGroupchange();
			}
		};
	
	$scope.administrationTabsModel = {
			selectedIndex : 0,
			id : 'administrationTabs',
			ariaLabel : 'Administration',
			eventsEnable : true,
			tabs : []
	};
	
	
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
	
	$scope.dataModel.getGroups = function() {
		
		$http.post('/gcm-app-services/masterdata/groups',  reqParams({
					userKey		:	$scope.loginUserKey
				}),
				 config).then(function(response) {
			$scope.dataModel.groupList = response.data.result;
			if($scope.dataModel.groupList.length > 0){
				$scope.dataModel.groupKey = $scope.dataModel.groupList[0].key;
			}
		}, function(error) {
			/*$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;*/
		});
	};
		
	$scope.administrationTabsModel.tabs[0] = userRegTab;
	$scope.administrationTabsModel.tabs[1] = userAdminTab;
	
	var rootData = window.parent.rootData;
	$scope.currentRole=rootData.currentRole;
	
	$scope.showGroupList = rootData.currentRole === 'OCUA' ? true : false;
	if($scope.showGroupList){
		$scope.dataModel.getGroups();
	}
	
	$scope.handleGroupchange = function(){
		if($scope.currentRole!="OCUA"){
		$scope.lookupService.groupKey = $scope.dataModel.groupKey=$scope.dataModel.gcmGroupKey;
		}
		else{
			$scope.lookupService.groupKey =$scope.dataModel.gcmGroupKey= $scope.dataModel.groupKey;
		}
		if(lookupService.filters.currentTab === "userAdministration"){
			lookupService.filters.isSupOrgs = false;
			if($scope.lookupService.getGroups){
				$scope.lookupService.getGroups($scope.dataModel.groupKey);
			}
		}else{
			if($scope.dataModel.readUploadHistory){
				$scope.dataModel.readUploadHistory($scope.dataModel.groupKey);
			}
		}
	}
	/*$scope.administrationTabsModel = {
			selectedIndex : 0,
			id : 'administrationTabs',
			ariaLabel : 'Administration',
			eventsEnable : true,
			tabs : [ {
				title : 'User Registration',
				templateurl : '../useradmin/home.htm',
				callback : function(event, tabData) {
					lookupService.filters.currentTab = 'userRegistration';
				}
			}, {
				title : 'User Administration',
				templateurl : 'userAdministration.htm',
				callback : function(event, tabData) {
					lookupService.filters.currentTab = 'userAdministration';
				}
			} ]
	};*/
});