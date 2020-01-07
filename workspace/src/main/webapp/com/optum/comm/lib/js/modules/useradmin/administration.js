var administrationmodule = angular.module('administrationApp', ['uitk.component.uitkPanel','uitk.component.uitkDynamicTable', 'uitk.component.uitkIconFont',
	'uitk.component.uitkCalendar','uitk.component.uitkLabel','uitk.component.uitkTextField','uitk.component.uitkButton', 'uitk.component.tabs',
	'uitk.uitkUtility','uitk.component.uitkDialog','uitk.component.uitkRadioGroup','ngSanitize', 'uitk.component.uitkMessage', 
	'uitk.component.uitkTextarea', 'staticDataService','ngDialog','looup-data','uitk.component.uitkPicklist']);

administrationmodule.factory("dataObject", function() {
	var dataObj = {};
	return dataObj;
});

administrationmodule.controller("administrationCtrl", function($scope, $http, $compile, $filter, $timeout, staticDataService, lookupService, dataObject) {
	
	$scope.lookupService = lookupService;
	$scope.url = 'administrationTabs.htm';
	
	$scope.$watch('lookupService.url',function(newVal,oldVal){
		if(newVal !== '')
			$scope.url = lookupService.url;
	});
	
	$scope.administrationTabsModel = {
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
	};


	
	
	


	
});