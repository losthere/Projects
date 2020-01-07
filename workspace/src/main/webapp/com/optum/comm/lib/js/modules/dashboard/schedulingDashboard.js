supervisorModule.controller('supervisorSchedulingCtrl', function($scope, $compile, $timeout, $http, ngDialog, dataServiceModel, staticDataService) {

	$scope.dataModel = dataServiceModel;

	if ($scope.dataModel.isClientView) {
		$scope.dataModel.schedulingTabsModel = {
			selectedIndex : 0,
			id : 'schedulingTabsId',
			ariaLabel : 'Scheduling',
			eventsEnable : true,
			tabs : [ {
				title : 'Status',
				templateurl : 'schedulingStatus.htm',
				disabled : false,
				callback : function(event, tabData) {
					// lookupService.filters.currentTab = "statusTab";
				}
			}, {
				title : 'Outreach',
				templateurl : 'schedulingOutreach.htm',
				disabled : false,
				focusElement : 'input',
				callback : function(event, tabData) {
					// lookupService.filters.currentTab='outreachTab';
				}
			}, {
				title : 'Onsite',
				templateurl : 'schedulingOnsite.htm',
				disabled : false,
				callback : function(event, tabData) {
					// lookupService.filters.currentTab='outreachTab';
				}
			}, {
				title : 'EMR',
				templateurl : 'schedulingEmr.htm',
				disabled : false,
				callback : function(event, tabData) {
					// lookupService.filters.currentTab='outreachTab';
				}
			}

			]
		};
	} else {
		$scope.dataModel.schedulingTabsModel = {
			selectedIndex : 0,
			id : 'schedulingTabsId',
			ariaLabel : 'Scheduling',
			eventsEnable : true,
			tabs : [ {
				title : 'Status',
				templateurl : 'schedulingstatusoptum.htm',
				disabled : false,
				callback : function(event, tabData) {
					// lookupService.filters.currentTab = "statusTab";
				}
			} ]
		};
	}

});
