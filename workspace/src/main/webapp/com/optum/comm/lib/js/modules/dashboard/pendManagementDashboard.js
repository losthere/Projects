supervisorModule.controller('pendManagementCtrl', function($scope, $compile, $timeout, $http, ngDialog, dataServiceModel, staticDataService) {
	
	$scope.dataModel = dataServiceModel;

    var isClientViews = $scope.dataModel.isClientView;
    var pendReasonTitle = isClientViews?'Pend Reason':'Provider Refusal';
    var cnaReasonTitle  = isClientViews?'CNA Reason':'Chart Not Available';

    $scope.dataModel.pendManagementTabsModel = {
		selectedIndex : 0,
		id : 'pendManagementTabsId',
		ariaLabel : 'PendManagement',
		eventsEnable : true,
		tabs : [ {
			title : 'Status',
			templateurl : 'pendManagementStatus.htm',
			disabled : false,
			callback : function(event, tabData) {
				// lookupService.filters.currentTab = "statusTab";
			}
		}, {
			title : pendReasonTitle,
			templateurl : 'pendManagementPendReason.htm',
			disabled : false,
			callback : function(event, tabData) {
				// lookupService.filters.currentTab='outreachTab';
			}
		}, {
			title : cnaReasonTitle,
			templateurl : 'pendManagementCNAReason.htm',
			disabled : false,
			callback : function(event, tabData) {
				// lookupService.filters.currentTab='outreachTab';
			}
		} ]
	};
});
