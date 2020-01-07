	var dataCleanUpApp = angular.module("dataCleanUp-app",[]);
	dataCleanUpApp.controller("dataCleanUpCtrl", function($scope) {
	dataCleanUpApp.directive('panelDirective', function() {
		return function(scope, element, attrs) {
			if (scope.$last) {
				(new ux()).initializeExpandCollapsePanels();
			}
		};
	});
	});