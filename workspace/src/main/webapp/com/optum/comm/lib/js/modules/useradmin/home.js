var app = angular.module('adminTabModule', ['uitk.component.uitkPanel','uitk.component.uitkDynamicTable', 'uitk.component.uitkIconFont',
	'uitk.component.uitkCalendar','uitk.component.uitkLabel','uitk.component.uitkTextField','uitk.component.uitkButton', 'uitk.component.tabs',
	'uitk.uitkUtility','uitk.component.uitkDialog','uitk.component.uitkRadioGroup','uitk.component.uitkMessage','looup-data', 
	'uitk.component.uitkTextarea', 'staticDataService','ngDialog', 'ngSanitize', 
	'uitk.component.uitkNavigable', 'userViewModel', 'uploadUserViewModel']);

app.factory("dataObject", function() {
	var dataObj = {};
	dataObj.showUploadError = false;
    dataObj.errorMsg = false;        
	return dataObj;
});

app.controller("adminTabController", function($scope, $http, $compile, $filter, $timeout, lookupService, staticDataService, errorMessageModel, dataObject) {
	
	$scope.lookupService = lookupService;
	$scope.url = 'adminTabs.htm';
	
	$scope.$watch('lookupService.url',function(newVal,oldVal){
		if(newVal !== '')
			$scope.url = lookupService.url;
	});
	
	$scope.adminTabsModel = {
			selectedIndex : 0,
			id : 'adminTabs',
			ariaLabel : 'Administration',
			eventsEnable : true,
			tabs : [ {
				title : 'User Registration',
				templateurl : 'userregistration.htm',
				callback : function(event, tabData) {
					lookupService.filters.currentTab = 'User Registration';
				}
			}]
	};
});