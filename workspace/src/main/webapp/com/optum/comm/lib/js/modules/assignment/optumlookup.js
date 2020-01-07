var lookupData = angular.module("looup-data", [ 'uitk.component.uitkAutocomplete','uitk.component.uitkCalendar' ]);
lookupData.factory("lookupService", function() {
	var lookupService = {

		filters : {
			busSegment : 'MCARE',
			program : '',
			client : '',
			hp : '',
			hpp : null,
			provId : '',
			provgrpNm : '',
			provLastNm : '',
			provFstNm : '',
			status : '0',
			isOffshoreCoding : null,
			isAssigned : '',
			codingLoc : '',
			user : '',
			currentTab : "",
			projectKey : '',
			chartId : '',
			acceptedDate : '0',
			fromDate : '',
			throughDate : '',
			busFunction : '',
			memberFirstName : '',
			memberLastName : '',
			memberGender : '',
			memberDOB : '',
			memberId : '',
			clientInternalId : '',
			noOfCharts : '100',
			projectIDText:null,
			projectYear:'',
			closeProjects:[],
			closeProjectsList:[],
			supervisorsList:[],
			roles:[],
			projectYears : [],
			searchCategoryType : {index:0},
			provState : '',
			chartReqStatus : '',
			vendorName : '',
			emr : '',
			chartScore : '',
			provSplCode : '',
			vendor : ''
		},
		fromDateCalendarViewModel : {
			enableValidation : true
		},
		throughDateCalendarViewModel : {
			enableValidation : true
		},
		memberDOBViewModel : {
			enableValidation : true
		},
		onAcceptedDateChange : function() {

			var today = new Date();
			if (lookupService.filters.acceptedDate === '0') {
				lookupService.filters.fromDate = this.getDateAsString(new Date(new Date().setDate(today.getDate() - 30)));
				lookupService.filters.throughDate = this.getDateAsString(today);
			} else if (lookupService.filters.acceptedDate === '1') {
				lookupService.filters.fromDate = this.getDateAsString(new Date(new Date().setMonth(today.getMonth() - 6)));
				lookupService.filters.throughDate = this.getDateAsString(today);
			} else if (lookupService.filters.acceptedDate === '2') {
				lookupService.filters.fromDate = '1-1-' + today.getFullYear();
				lookupService.filters.throughDate = this.getDateAsString(today);
			} else if (lookupService.filters.acceptedDate === '3') {
				lookupService.filters.fromDate = '1-1-' + (today.getFullYear() - 1);
				lookupService.filters.throughDate = '12-31-' + (today.getFullYear() - 1);
			} else if (lookupService.filters.acceptedDate === '4') {
				lookupService.filters.fromDate = '';
				lookupService.filters.throughDate = '';
			}
		},
		getDateAsString : function(dateObj){
			//this function returns date in mm-dd-yyyy format
			return (dateObj.getMonth() + 1) + '-' + dateObj.getDate() + '-' + dateObj.getFullYear();
		},
		url : ''
	}
	return lookupService;
});

lookupData.factory('errorMessageModel', function() {
	return {
		id : 'Error',
		messageType : 'error',
		content : '',
		visible : false,
		headingLevel : '2',
		closeButton : true
	}
});

lookupData.controller("lookupCtrl", function($scope, $http, lookupService, errorMessageModel) {

	$scope.errorMessageModel = errorMessageModel;
	
	var rootData = window.parent.rootData;
	

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
	$scope.lookup = {};
	$scope.filters = lookupService.filters;

	$scope.vendorKey = optumUI.getUser().getDefaultVendorKey();
	$scope.loginUserKey = optumUI.getUser().getLoggedInUserKey();
	$scope.groupKey = optumUI.getUser().getCurrentGroupKey();
	$scope.userId = optumUI.getAuthUser();
	$scope.providerIds = [];
	$scope.providerGrpNms = [];
	$scope.providerLastNms = [];
	$scope.providerFstNms = [];
	$scope.lookup.chartScoreList = [];
	$scope.lookup.provSplCodeList

	$scope.acceptedDates = [ {
		key : 0,
		value : 'Past 30 days'
	}, {
		key : 1,
		value : 'Past 6 months'
	}, {
		key : 2,
		value : 'This year'
	}, {
		key : 3,
		value : 'Last year'
	}, {
		key : 4,
		value : 'Custom'
	}];

	$scope.fromDateCalendarViewModel = lookupService.fromDateCalendarViewModel;
	$scope.throughDateCalendarViewModel = lookupService.throughDateCalendarViewModel;
	$scope.memberDOBViewModel = lookupService.memberDOBViewModel;
	
	$scope.fetchproviderIds = function(scope) {
		$scope.providerIds = [];
		if (angular.isDefined(scope))
			$scope.filters.provId = angular.copy(scope.model);
		$scope.getProviderDetails('SOURCE_SYSTEM_PROV_ID',$scope.filters.provId);
	}

	$scope.fetchproviderGrpNms = function(scope) {
		$scope.providerGrpNms = [];
		if (angular.isDefined(scope))
			$scope.filters.provgrpNm = angular.copy(scope.model);
		$scope.getProviderDetails('PROV_GRP_NAME',$scope.filters.provgrpNm);
	}
	$scope.fetchproviderLastNms = function(scope) {
		$scope.providerLastNms = [];
		if (angular.isDefined(scope))
			$scope.filters.provLastNm = angular.copy(scope.model);
		$scope.getProviderDetails('PROV_LAST_NAME',$scope.filters.provLastNm);
	}

	$scope.fetchproviderFstNms = function(scope) {
		$scope.providerFstNms = [];
		if (angular.isDefined(scope))
			$scope.filters.provFstNm = angular.copy(scope.model);
		$scope.getProviderDetails('PROV_FIRST_NAME',$scope.filters.provFstNm);
	}

	$scope.filter = function() {
		lookupService.filter();
	};
	
	$scope.getPrograms = function() {
		$scope.filters.program = '';
		$scope.lookup.programs =[];
		$http.post('/gcm-app-services/masterdata/programsByUserAssociation', reqParams({
			businessSegment : $scope.filters.busSegment,
			userKey : $scope.loginUserKey
		}), config).then(function(response) {
			$scope.lookup.programs = response.data.result;

		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});
	}
	
	$scope.getPrograms();
	$scope.getProviderDetails = function(fieldNm,fieldVal) {
		$http.post('/gcm-app-services/masterdata/getProviderDetails', reqParams({
			groupKey : $scope.groupKey,
			fieldVal : fieldVal,
			fieldNm : fieldNm
		}), config).then(function(response) {
			if(fieldNm=="SOURCE_SYSTEM_PROV_ID")
					$scope.providerIds = response.data.result;
			else if(fieldNm=="PROV_GRP_NAME")
					$scope.providerGrpNms = response.data.result;
			else if(fieldNm=="PROV_LAST_NAME")
					$scope.providerLastNms = response.data.result;
			else if(fieldNm=="PROV_FIRST_NAME")
					$scope.providerFstNms = response.data.result;

		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});
	}

	
	$scope.clear = function() {
		lookupService.clear();
	}
	
	$scope.businessSegments = function() {
		$http.post('/gcm-app-services/masterdata/busSegsByUserAssociation', reqParams({
			userKey : $scope.loginUserKey
		}), config).then(function(response) {
			$scope.lookup.businessSegments = response.data.result;
			lookupService.filters.busSegment = 'MCARE';
			$scope.getPrograms();
			$scope.getVendors();
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});
	};
	
	$scope.businessSegments();
	
	$scope.clients = function() {
		$http.post('/gcm-app-services/masterdata/clientsByUserAssociation', reqParams({
			userKey : $scope.loginUserKey
		}), config).then(function(response) {
			$scope.lookup.clients = response.data.result;
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});
	};

	$scope.clients();

	$scope.healthPlans = function() {
		$scope.filters.hp = '';
		$scope.lookup.healthPlans = [];
		$http.post('/gcm-app-services/masterdata/healthPlansByUserAssociation', reqParams({
			businessSegment : $scope.filters.busSegment,
			clientKey : $scope.filters.client,
			userKey : $scope.loginUserKey
		}), config).then(function(response) {
			for(var i =0; i < response.data.result.length; i++){
				if(response.data.result[i]){
					$scope.lookup.healthPlans.push(response.data.result[i]);
				}
			}
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});

	}
	$scope.onHPChange = function() {
		if(lookupService.clearTableData)
		lookupService.clearTableData();
		$scope.hPProducts();
		$scope.getVendors();
	}
	$scope.hPProducts = function() {
		$scope.filters.hpp = '';
		$scope.lookup.healthPlanProds = [];
		if ($scope.filters.hp) {
			$http.post('/gcm-app-services/masterdata/hPProductsByUserAssociation', reqParams({
				businessSegment : $scope.filters.busSegment,
				hpKey : $scope.filters.hp,
				userKey : $scope.loginUserKey
			}), config).then(function(response) {
				for(var i =0; i < response.data.result.length; i++){
					if(response.data.result[i]){
						$scope.lookup.healthPlanProds.push(response.data.result[i]);
					}
				}
			}, function(error) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
				$scope.errorMessageModel.visible = true;
			});
		}
	};

	lookupService.users = function() {
		$scope.filters.user = '';
		$scope.lookup.users = [];
		$http.post('/gcm-app-services/masterdata/getUsersForSupervisor', reqParams({
			vendorKey : $scope.filters.vendor,
			role : lookupService.filters.currentTab === 'QA' ? 'OQA' : 'OCOU',
			userKey : $scope.loginUserKey,
			//supervisorUserKey : $scope.loginUserKey,
		}), config).then(function(response) {
			$scope.lookup.users = response.data.result;
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});

	};
	
	$scope.users = function(){
		lookupService.users();
	}
	
	lookupService.coders = function(){
		$scope.filter.coder = '';
		$scope.lookup.coders = [];
		var roleCodeList = ['OCOU'];
		var codersInp ={
				loginUserKey : $scope.loginUserKey,
				roleCodes : roleCodeList
		}
		$http.post('/gcm-app-services/masterdata/getUsersByRoleCode', codersInp).then(function(response) {
			$scope.lookup.coders = response.data.result;
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});
		
	}
	$scope.users();

	
	$scope.onStatusChange = function() {
		if(lookupService.clearTableData)
		lookupService.clearTableData();
		$scope.errorMessageModel.visible = false;
		if ($scope.filters.status != 0)
			$scope.users();
		else{
			$scope.filters.user = "";
			$scope.filters.supervisor = '';
		}
	};
	
	$scope.projs = function() {
		
		$scope.filters.projectKey = '';
		$scope.lookup.projects = [];
		var optInvInput = {
				userKey		: $scope.loginUserKey,
				userId      : $scope.userId,
				groupKey    : $scope.groupKey,
				roleCode    : rootData ? rootData.currentRole : '',
				busSegment  : $scope.filters.busSegment,
				busFuncKey  : lookupService.filters.currentTab === 'QA' ? 6 : 2,
				projectYear : lookupService.filters.projectYear ? lookupService.filters.projectYear : ''
		}
		$http.post('/gcm-app-services/masterdata/projectsByInvFilter', optInvInput).then(function(response) {
			$scope.lookup.projects = response.data.result;
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});

	};
	
	$scope.segmentProjs = function() {
		$scope.filters.projectKey = '';
		$scope.lookup.segmentProjects = [];
		$http.post('/gcm-app-services/masterdata/SegmentProjects', reqParams({
			loginUserKey : $scope.loginUserKey
		}), config).then(function(response) {
			$scope.lookup.segmentProjects = response.data.result;
			$scope.filters.closeProjects = response.data.result;
			$scope.filters.closeProjectsList = response.data.result;
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});

	};
	
	$scope.segmentProjs();
	
	$scope.onClientChange = function() {
		$scope.healthPlans();
		$scope.filters.hpp = '';
		if(lookupService.clearTableData)
		lookupService.clearTableData();
	}
	
	$scope.onBusSegmentChange = function() {
		$scope.getPrograms();
		$scope.projs();
		if(lookupService.clearTableData)
		lookupService.clearTableData();
	}
	
	$scope.onSegmentChange = function() {
		lookupService.segmentProjectsDisplay();
	}
	
	$scope.onProjectIdChange = function(){
		lookupService.projectIdValidation();
	}
	
	$scope.onProjectYearChange = function(){
		lookupService.projectYearValidation();
		$scope.projs();
	}
	
	$scope.onProjectChange = function() {
		lookupService.segmentDisplay();
	}
	
	$scope.isWorklist = function() {
		lookupService.isWorklist();
	}
	
	$scope.onAcceptedDateChange = function(){
		lookupService.onAcceptedDateChange();
	};
	
	$scope.onAcceptedDateChange();
	
	/**
	 * Basic Search Filters
	 */
	$scope.searchCategoryTypes = [{
		label : 'Member',
		value : 'member',
		disabled : false	
	},{
		label : 'Provider',
		value : 'provider',
		disabled : false	
	},{
		label : 'Client Internal ID',
		value : 'client',
		disabled : false	
	},{
		label : 'Chart ID',
		value : 'chartId',
		disabled : false	
	}];
	
	/**
	 * Optum retrieval
	 */
	
	$scope.onProjectTypeChange = function() {
		$scope.getProjectYears(false);
		if(lookupService.clearTableData)
		lookupService.clearTableData();
	}
	
	$scope.getProjectYears = function() {
		$http.post('/gcm-app-services/masterdata/projectYears', reqParams({
			businessSegment : $scope.filters.busSegment ? $scope.filters.busSegment : '',
			programKey : $scope.filters.program
		}), config).then(function(response) {
			$scope.lookup.projectYears = response.data.result;
			lookupService.filters.projectYears = response.data.result;
			lookupService.filters.projectYear = ''+$scope.lookup.projectYears[0];
			lookupService.projectYears = $scope.lookup.projectYears;
			$scope.projs();
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});
	};
	
	$scope.getProjectYears();
	
	$scope.getVendors = function() {
		var optInvInput = {
				userKey		: $scope.loginUserKey,
				userId      : $scope.userId,
				groupKey    : $scope.groupKey,
				roleCode    : rootData ? rootData.currentRole : '',
				busSegment  : $scope.filters.busSegment,
				busFuncKey  : lookupService.filters.currentTab === 'QA' ? 6 : 2,
				projectYear : ''
		}
		$http.post('/gcm-app-services/masterdata/vendorsByInvFilter', optInvInput).then(function(response) {
			$scope.lookup.vendors = response.data.result;
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});
	};
	
		
	$scope.getChartScore = function(){
		$http.post('/gcm-app-services/masterdata/chartScoreGroup', 
				config).then(function(response) {
			$scope.lookup.chartScoreList = response.data.result;
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});
	}
	
	$scope.getChartScore();
	
	
	
	
	$scope.getProvSpecCodes = function(){
		$http.post('/gcm-app-services/masterdata/provSpecCodes', 
				config).then(function(response) {
			$scope.lookup.provSplCodeList = response.data.result;
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});
	}
	
	$scope.getProvSpecCodes();
	
});
