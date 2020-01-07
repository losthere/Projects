utilitymodule.controller('pendAppointment',function($scope, $http, $compile, $filter, $timeout, lookupService, staticDataService,
		errorMessageModel, dataServiceModel){
	$scope.dataModel = dataServiceModel;
	$scope.retrievalInfoTableModel = {
			pagination : { 
				currentPageNumber : 1,
				currentPageNumberInView : 1,
				recordsPerPage : 25,
	        	recordsPerPageChoices : [10, 20, 25],
	        	pageNumberError : false
		        },
				columns :  [
				{
					columnId:'busFuncStatus',
					label:'Status',
					layoutOrder:1,
					resizable:false,
					cellTemplate:['<select disabled="disabled"  ng-model="record.busFuncStatus"><option value="NONRETRIEVABLE">Non-Retrievable</option><option value="PEND RELEASED">Release</option></select>'].join('')
				},
				{
					columnId:'provGroupName',
					label:'Group Name',
					layoutOrder:2,
					resizable:false,
					sortOrder:0, 
					sortable:true,					 
					cellTemplate:'<span ng-bind="::record.provGroupName"> </span>'
				},
				{ 
					columnId:'provName', 
					label:'Provider Name',
					layoutOrder:3,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span style="text-transform:capitalize" ng-bind="::record.provName"> </span>'
				},
				{ 
					columnId:'provLocation', 
					label:'Location',
					layoutOrder:4,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.provLocation"> </span>' 
				},
				{ 
					columnId:'phone', 
					label:'<span>Phone <br> \n Fax</span>',
					layoutOrder:5,
					resizable:false, 
					sortOrder:0, 
					sortable:false,                
					cellTemplate:'<span>{{record.provPhone}} <br> \n {{record.provFax}}</span>' 
				},
				
				{ 
					columnId:'memberName', 
					label:'Member Name',
					layoutOrder:6,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span style="text-transform:capitalize" ng-bind="::record.memberName"> </span>' 
				},
				{ 
					columnId:'memberDOB', 
					label:'Member Date of Birth',
					layoutOrder:7,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.memberDOB | date :\'MM-dd-yyyy\'"> </span>' 
				},
				{ 
					columnId:'memberGender', 
					label:'Gender',
					layoutOrder:8,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.memberGender"> </span>' 
				},
				{ 
					columnId:'chartId', 
					label:'Chart ID',
					layoutOrder:9,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.chartId"> </span>' 
				},
				{ 
					columnId:'pendReason', 
					label:'Pend Reason',
					layoutOrder:10,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.pendReason"> </span>' 
				}
			],
			records: [],
			selectedRecords : [],
			selectedRecordCount : 0
	}
	$scope.dataModel.viewPendAppointmentMemberDetails = function(){
		$scope.SchedulingSearchFilter = 
		{
			appointmentId : $scope.dataModel.selectedMyApptId,
			loginUserKey : $scope.dataModel.gcmUserKey,
			roleCode : '',
			noOfPendAttempts : $scope.dataModel.noOfPendAttempts
		}
		var retDataSearchFilter = {
							"assignInventorySearchFilter": [],
							"schedulingSearchFilter" : $scope.SchedulingSearchFilter
						  };
	$http.post('/gcm-app-services/scheduling/workflow/getChartMemberDetailsByApptId', retDataSearchFilter).then(function(response) {
		$scope.retrievalInfoTableModel.originalRecords = [];
		$scope.retrievalInfoTableModel.records = [];
		$scope.retrievalInfoTableModel.totalRecords = 0;
		if(response && response.data && response.data.result){
			$scope.dataModel.isWorklist=false;
			for(var i=0;i<response.data.result.length;i++){
				if(response.data.result[i].busFuncStatus!="NONRETRIEVABLE")
					response.data.result[i].busFuncStatus="PEND RELEASED";
			}
			
				
			$scope.retrievalInfoTableModel.records = response.data.result.slice();
			$scope.retrievalInfoTableModel.originalRecords = response.data.result.slice();
			$scope.retrievalInfoTableModel.totalRecords = response.data.result.length;
			var obj = {
					recordsPerPage : $scope.retrievalInfoTableModel.pagination.recordsPerPage,
					pageNumber : $scope.retrievalInfoTableModel.pagination.currentPageNumber,
					sortOrder : [1]
			};
			$scope.retrievalInfoTableModel.onChange(obj);			
		}
	}, function(error) {
		var errorMessage = JSON.stringify(error);
		$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
		$scope.errorMessageModel.visible = true;
		$scope.errorMessageModel.messageType='error';
		$scope.errorMessageModel.messageVisibleTime = 5000;
	});
	}
	$scope.dataModel.viewPendAppointmentMemberDetails();

$scope.cancelBtn = function(){
		$scope.dataModel.showPend=false;	
		$scope.dataModel.showViewAppt=false;
		$scope.retrievalInfoTableModel.originalRecords = [];
		$scope.retrievalInfoTableModel.records = [];
		$scope.retrievalInfoTableModel.totalRecords = 0;
	}
});