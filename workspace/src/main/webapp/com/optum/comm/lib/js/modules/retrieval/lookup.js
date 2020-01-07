var lookupData = angular.module("looup-data", [ 'uitk.component.uitkAutocomplete','uitk.component.uitkCalendar' ]);
lookupData.factory("lookupService", function() {
	var lookupService = {

		filters : {
			busSegment : null,
			program : '',
			client : '',
			hp : '',
			hpp : null,
			provId : '',
			provgrpNm : '',
			provLastNm : '',
			provFstNm : '',
			status : '',
			imageName :'',
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
			organization : '',
			projectYear:null,
			closeProjects:[],
			closeProjectsList:[],
			supervisorsList:[],
			roles:[],
			usrAdminRoles : [],
			searchCategoryType : {index:0},
			provState : '',
			chartReqStatus : '',
			vendorName : '',
			vendors :[],
			organizations : [],
			currentRole : "",
			isSupOrgs : false,
			supervisorKey : 0,
			region	: '',
			regionsList : [],
			serviceConfigRegionList : []
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
	$scope.currentRole=rootData.currentRole;
	//$scope.lookupService = lookupService;
	lookupService.filters.currentRole = rootData.currentRole; 

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
	if(!lookupService.filters.organization){
		if(!lookupService.filters.vendors || lookupService.filters.vendors.length <= 0)
			lookupService.filters.vendors = rootData.getVendorsByRole(rootData.currentRole);
		if(lookupService.filters.vendors.length==1){
			lookupService.filters.organization = lookupService.filters.vendors[0].key;
		}
	}
	$scope.vendorKey = lookupService.filters.organization;
	$scope.loginUserKey = optumUI.getUser().getLoggedInUserKey();
	$scope.groupKey = optumUI.getUser().getCurrentGroupKey();
	$scope.userId = optumUI.getAuthUser();
	lookupService.filters.status =  lookupService.filters.status ? lookupService.filters.status :'';
	$scope.filters.status=lookupService.filters.status == 0 ? '' : lookupService.filters.status;
	$scope.providerIds = [];
	$scope.providerGrpNms = [];
	$scope.providerLastNms = [];
	$scope.providerFstNms = [];

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
	
	$scope.groupKey = lookupService.groupKey ? lookupService.groupKey  : $scope.groupKey;
	
	lookupService.getGroups = function(groupKey) {
		
		if(groupKey || lookupService.groupKey){
			$scope.groupKey = groupKey ? groupKey : lookupService.groupKey;
			lookupService.getVendors(true);
		}
		else{
			$http.post('/gcm-app-services/masterdata/groups',  reqParams({
				userKey		:	$scope.loginUserKey
			}),
			 config).then(function(response) {
				lookupService.groupList = response.data.result;
				if(lookupService.groupList.length > 0){
					$scope.groupKey = lookupService.groupList[0].key;
				}
				lookupService.getVendors(true);
			}, function(error) {
				/*$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
				$scope.errorMessageModel.visible = true;*/
			});
		}
		
	};
	
	
	
	$scope.getRegions = function (){
		$scope.lookup.regionsList = [];
		lookupService.filters.regionsList = [];
	/*	if(lookupService.filters.currentTab == 'projectClose'){
			$scope.lookup.regionsList = lookupService.filters.regionsList = lookupService.filters.serviceConfigRegionList;
		}else{*/
			$http.post('/gcm-app-services/useradmin/getUserRegionsByGroupKey', reqParams({
				userKey		:	$scope.loginUserKey,
				groupKey	:	$scope.groupKey,
				roleCode	:	rootData.currentRole,
				vendorKey 	: ''
			}), config).then(function(response) {
				if(response.data.status === 'SUCCESS' ){
					$scope.lookup.regionsList = response.data.result;
					lookupService.filters.regionsList = $scope.lookup.regionsList;
					if($scope.lookup.regionsList && $scope.lookup.regionsList.length == 1){
						$scope.region = lookupService.filters.region = $scope.lookup.regionsList[0].key;
						$scope.projsutility();
					}
				}
			});
		//}
	}
	if(lookupService.isForUtility)
		$scope.getRegions();
	
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
	
	
	lookupService.getPrograms = function() {
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
	
	//lookupService.getPrograms();
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
				//lookupService.filters.busSegment = 'MCARE';
			lookupService.getPrograms();
				if(lookupService.filters.currentTab!="search")
					$scope.projs();
				else if(lookupService.filters.organization){
					$scope.vendorKey=lookupService.filters.organization;
					$scope.projsutility();
				}
				if(rootData.currentRole != 'OCUA'){
					lookupService.getVendors();
				}
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
		if(!$scope.filters.busSegment || !$scope.loginUserKey)
			return;
		$http.post('/gcm-app-services/masterdata/healthPlansByUserAssociation', reqParams({
			businessSegment : $scope.filters.busSegment,
			clientKey : $scope.filters.client ? $scope.filters.client : '',
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
		lookupService.getVendors();
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

	$scope.users = function() {
		$scope.filters.user = '';
		$scope.lookup.users = [];
		$scope.vendorKey = lookupService.filters.organization;
		if(!$scope.vendorKey)
			return;
			$http.post('/gcm-app-services/masterdata/getUsersForSupervisor', reqParams({
				vendorKey : $scope.vendorKey,
				role : lookupService.filters.currentTab === 'Coding' ? 'COU' : lookupService.filters.currentTab === 'EMR' ? 'ESH' : lookupService.filters.currentTab === 'Onsite' ? 'OSH' : (lookupService.filters.currentTab === 'pendMyWorklist' || lookupService.filters.currentTab=='pendAvailableWorkItems') ? 'PDM' : 'SH',
				userKey : $scope.loginUserKey,
			}), config).then(function(response) {
				$scope.lookup.users = response.data.result;
			}, function(error) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
				$scope.errorMessageModel.visible = true;
			});
	};
	
	lookupService.coders = function(){
		$scope.filter.coder = '';
		$scope.lookup.coders = [];
		var roleCodeList = ['COU'];
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
	
	
	$scope.supervisors = function() {
		$scope.filters.supervisor = '';
		$scope.lookup.supervisors = [];
		$http.post('/gcm-app-services/masterdata/getSupervisors', reqParams({
			vendorKey : $scope.vendorKey,
			loginUserKey : $scope.loginUserKey,
			groupKey : $scope.groupKey,
			roleCode : rootData.currentRole ? rootData.currentRole : 'CSP'
		}), config).then(function(response) {
			$scope.lookup.supervisors = response.data.result;
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});
	};
	
	
	$scope.userAdminsupervisors = function() {
		$scope.filters.supervisor = '';
		$scope.lookup.supervisors = [];
		$http.post('/gcm-app-services/masterdata/getSupervisorsByVendor', reqParams({
			vendorKey : $scope.vendorKey,
			loginUserKey : $scope.loginUserKey,
			groupKey : $scope.groupKey,
			roleCode : 'SUP'
		}), config).then(function(response) {
			$scope.lookup.userAdminSupervisors = response.data.result;
			$scope.filters.supervisorsList = response.data.result;
			$scope.getRolesByGroupVendor();
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});
	};
	
	if($scope.vendorKey){
		$scope.users();
		$scope.supervisors();
		$scope.userAdminsupervisors();
	}
	
	
	$scope.onStatusChange = function() {
		if(lookupService.clearTableData)
		lookupService.clearTableData();
		$scope.errorMessageModel.visible = false;
		if ($scope.filters.status != 0)
			$scope.users();
		else{
			$scope.filters.user = "";
			$scope.filters.supervisor = '';
			if(lookupService.filters.organizations > 1){
				lookupService.filters.organization = '';
			}
		}
	};
	
	$scope.projs = function() {
	
		//$scope.filters.projectKey = '';
		$scope.lookup.projects = [];
		var busFuncKey = 4;
		var roleCode = rootData ? rootData.currentRole : '';
		if(rootData.currentRole === 'OCOU' || rootData.currentRole === 'COU' || lookupService.filters.currentTab=='Coding' || rootData.currentRole=='CSP'){
			busFuncKey = 2;
		}else if(rootData.currentRole === 'OQA' || rootData.currentRole === 'QA'){
			busFuncKey = 6;
		}
		
		var optInvInput = {
				userKey		: $scope.loginUserKey,
				userId      : $scope.userId,
				groupKey    : $scope.groupKey,
				roleCode    : roleCode,
				busSegment  : $scope.filters.busSegment,
				busFuncKey  : busFuncKey,
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
	
	
$scope.projsutility = function() {

		
		//$scope.filters.projectKey = '';
		$scope.lookup.projects = [];
		var busFuncKey = 4;
		var roleCode = rootData ? rootData.currentRole : '';
		if(rootData.currentRole === 'OCOU' || rootData.currentRole === 'COU'){
			busFuncKey = 2;
		}else if(rootData.currentRole === 'OQA' || rootData.currentRole === 'QA'){
			busFuncKey = 6;
		}
	
		var optInvInput = {
				userKey		: $scope.loginUserKey,
				userId      : $scope.userId,
				groupKey    : $scope.groupKey,
				vendorKey   : $scope.vendorKey,
				roleCode    : roleCode,
				busSegment  : $scope.filters.busSegment,
				busFuncKey  : busFuncKey,
				projectYear : lookupService.filters.projectYear ? lookupService.filters.projectYear : '',
				region		: $scope.region
		}
		$http.post('/gcm-app-services/masterdata/projectsByInvFilterForUtility', optInvInput).then(function(response) {
			$scope.lookup.projects = response.data.result;
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});

	};

	
	$scope.segmentProjs = function() {
		//$scope.filters.projectKey = '';
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
	
	$scope.getRoles = function() {
		$http.post('/gcm-app-services/masterdata/roles', reqParams({
			loginUserKey : $scope.loginUserKey
		}), config).then(function(response) {
			$scope.lookup.roles = response.data.result;
			$scope.filters.roles = response.data.result;
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});
	};
		$scope.getRoles();
	$scope.onVendorChange =function(){
		$scope.vendorKey=$scope.filters.vendor;
		$scope.errorMessageModel.visible = false;
		$scope.userAdminsupervisors();
	}
	$scope.getRolesByGroupVendor = function() {
		$http.post('/gcm-app-services/masterdata/getRolesByGroupVendor', reqParams({
			vendorKey : $scope.vendorKey,
			loginUserKey : $scope.loginUserKey,
			groupKey : $scope.groupKey,
			roleCode : 'SUP'
		}), config).then(function(response) {
			$scope.lookup.usrAdminRoles = response.data.result;
			$scope.filters.usrAdminRoles = response.data.result;
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});
	};
	
	

	$scope.onClientChange = function() {
		$scope.healthPlans();
		$scope.filters.hpp = '';
		if(lookupService.clearTableData)
		lookupService.clearTableData();
	}
	
	$scope.onBusSegmentChange = function() {
		lookupService.getPrograms();
		$scope.projs();
		if(lookupService.clearTableData)
		lookupService.clearTableData();
	}
	
	
	$scope.onBusSegmentChangeUtility = function() {
		lookupService.getPrograms();
		$scope.lookup.projects=[];
		if(lookupService.filters.currentTab!="search")
			$scope.projs();
		else if(lookupService.filters.organization){
			$scope.vendorKey=lookupService.filters.organization;
			$scope.projsutility();
		}
		if(lookupService.clearTableData)
		lookupService.clearTableData();
	}
	$scope.onOrgChange =function()
	{
		if(lookupService.filters.currentTab!="search")
			$scope.projs();
		else if(lookupService.filters.organization){
			$scope.vendorKey=lookupService.filters.organization;
			$scope.projsutility();
		}
		$scope.users();
		if(lookupService.clearTableData)
			lookupService.clearTableData();
	}
	
	$scope.onRegionChange = function(){
		if($scope.filters.region)
			$scope.region = $scope.filters.region;
		if($scope.filters.busSegment)
			$scope.projsutility();
		if(lookupService.clearTableData)
			lookupService.clearTableData();
	}
	
	$scope.onRegionOrgChange = function(){
		 //$scope.dataModel.isBusFuncConfigure();
	}
	
	$scope.onOrganizationChange = function(){
		$scope.filters.status = '';
		if(lookupService.filters.currentTab!="search")
			$scope.projs();
		else if(lookupService.filters.organization){
			$scope.vendorKey=lookupService.filters.organization;
			$scope.projsutility();
		}
		$scope.users();
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
			if(lookupService.isFromOptRet){
				lookupService.filters.projectYear = ''+$scope.lookup.projectYears[0];
				lookupService.projectYears = $scope.lookup.projectYears;
			}
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});
	};
	
	$scope.getProjectYears();
	
	$scope.getProviderStates = function() {
		$http.post('/gcm-app-services/masterdata/states', config).then(function(response) {
			$scope.lookup.providerStates = response.data.result;
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});
	};

	$scope.getProviderStates();

	$scope.businessFuncKey=4;
	lookupService.getVendors = function(isForOCUA) {
		if(isForOCUA){
			$scope.clear();
			$http.post('/gcm-app-services/masterdata/vendorsbygroup', reqParams({
				groupKey : $scope.groupKey
			}), config).then(function(response) {
				if(!lookupService.filters.isSupOrgs){
					$scope.lookup.vendors = response.data.result;
					lookupService.filters.vendors=$scope.lookup.vendors;
					$scope.filters.vendor = '';
				}
				else
				{
					lookupService.filters.supOrganizations = response.data.result;
					lookupService.filters.isSupOrgs=false;
				}
					
			}, function(error) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
				$scope.errorMessageModel.visible = true;
			});
		}
		else{
			if(rootData.currentRole=="QA" || rootData.currentRole=="COU" || rootData.currentRole=="OCOU" || rootData.currentRole=="CSP" ||  rootData.currentRole=="OCSP" || rootData.currentRole=="SUP" || rootData.currentRole=="IM")
			{
				$scope.lookup.vendors = rootData.getVendorsByRole(rootData.currentRole);
				lookupService.filters.vendors = $scope.lookup.vendors;
			}
			else
			{
				if(lookupService.filters.isSupOrgs && (rootData.currentRole=="CUA" || rootData.currentRole=="OCUA" ))
					{
						$scope.roleCode="SUP";
						$scope.userKey=lookupService.filters.supervisorKey;
					}
				else if(lookupService.filters.isSupOrgs && rootData.currentRole=="OUA")
				{
					$scope.roleCode="IM";
					$scope.userKey=lookupService.filters.supervisorKey;
				}
				else
					{
						$scope.roleCode=rootData ? rootData.currentRole : '';
						$scope.userKey=$scope.loginUserKey;
					}
				$http.post('/gcm-app-services/masterdata/vendorsByUserAssociation', reqParams({
					businessSegment : $scope.filters.busSegment,
					programKey : $scope.filters.program,
					businessFuncKey:( rootData.currentRole=="COU" || rootData.currentRole=="CSP")? 2 : (rootData.currentRole =="OCUA" || rootData.currentRole =="CUA" || rootData.currentRole =="OUA") ?0 : (rootData.currentRole =="QA") ? 6:$scope.businessFuncKey,
					hpKey : $scope.filters.hp,
					loginUserKey : $scope.userKey,
					groupKey : $scope.groupKey,
					roleCode : $scope.roleCode,
				}), config).then(function(response) {
					if(!lookupService.filters.isSupOrgs){
						$scope.lookup.vendors = response.data.result;
						lookupService.filters.vendors=$scope.lookup.vendors;
					}
					else
					{
						lookupService.filters.supOrganizations = response.data.result;
						lookupService.filters.isSupOrgs=false;
					}
						
				}, function(error) {
					$scope.errorMessageModel.messageType = 'error';
					$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
					$scope.errorMessageModel.visible = true;
				});
			}
		}
	};
	
	$scope.getOrganizations = function() {
		var optInvInput = {
				userKey		: $scope.loginUserKey,
				userId      : $scope.userId,
				groupKey    : $scope.groupKey,
				roleCode    : rootData ? rootData.currentRole : '',
				busSegment  : $scope.filters.busSegment,
				busFuncKey  : rootData.currentRole === 'QA' ? 6 : 2,
				projectYear : ''
		}
		$http.post('/gcm-app-services/masterdata/vendorsByInvFilter', optInvInput).then(function(response) {
			$scope.lookup.organizations = response.data.result;
			lookupService.filters.organizations = $scope.lookup.organizations;
			if($scope.lookup.organizations.length==1)
			{
				lookupService.filters.organization = $scope.lookup.organizations[0].key;
			}
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});
	};


	$scope.getOrganizations();

	
	$scope.getVendorsInit = function(){
		
		if(lookupService.filters.currentTab === "userAdministration"){
			$scope.businessFuncKey='0';
			if($scope.currentRole === 'OCUA'){
				$scope.clear();
				lookupService.getGroups();
			}else{
				lookupService.getVendors();
			}
		}
	}
	$scope.getVendorsInit();
	$scope.getChartRequestStatuses = function() {
		var workFlow = '';
		var isUtility = true;
		if(lookupService.isFromOptRet){
			workFlow = 'OPTUM';			
		}else{
			workFlow = 'CLIENT';
		}
		$http.post('/gcm-app-services/masterdata/statuses', 
				reqParams({
					workFlow : workFlow,
					isUtility : isUtility
				}), config).then(function(response) {
			$scope.lookup.chartRequestStatuses = response.data.result;
		}, function(error) {
			$scope.errorMessageModel.messageType = 'error';
			$scope.errorMessageModel.content = '<span>' + JSON.stringify(error) + '</span>';
			$scope.errorMessageModel.visible = true;
		});
	};

	$scope.getChartRequestStatuses();
	
	
});