schedulerworklistmodule.controller("apntmntCnfrmCntrl",function($scope, $compile, $timeout, $http, dataServiceModel){
	$scope.dataModel = dataServiceModel;
	
	var appointmentConfirmTableModel = {
			pagination : {
				currentPageNumber : 1,
				paginationWindow : 5,
				recordsPerPage : 10,
				recordsPerPageChoices : [10, 25, 50, 100]
			},
		columns :  [
			{
				columnId:'provGroupName',
				label:'Group Name',
				layoutOrder:1,
				resizable:false,
				sortOrder:0, 
				sortable:true,					 
				cellTemplate:'<span ng-bind="::record.provGroupName"> </span>'
			},
			{ 
				columnId:'provName', 
				label:'Provider Name',
				layoutOrder:2,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.provName"> </span>'
			},
			{ 
				columnId:'provLocation', 
				label:'Location',
				layoutOrder:3,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.provLocation"> </span>' 
			},
			{ 
				columnId:'provPhone', 
				label:'Phone',
				layoutOrder:4,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.provPhone"> </span>' 
			},
			{ 
				columnId:'provFax', 
				label:'Fax',
				layoutOrder:5,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.provFax"> </span>' 
			},
			{ 
				columnId:'memberName', 
				label:'Member Name',
				layoutOrder:6,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span style="text-transform:capitalize;" ng-bind="::record.memberName"> </span>' 
			},
			{ 
				columnId:'memberDOB', 
				label:'Member Date of Birth',
				layoutOrder:7,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.memberDOB"> </span>' 
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
			}
		],
		records : [],
		totalRecordsCount : 0
	};
	
	$scope.dataModel.appointmentConfirmModel = appointmentConfirmTableModel;
	$scope.dataModel.wizardModel.extraBtn1.show = false;
	if($scope.dataModel.isFromViewApptmnt)
	{
		$scope.dataModel.wizardModel.nextButton.show=false;
		$scope.dataModel.wizardModel.previousButton.show = false;
		$scope.dataModel.wizardModel.previousButton.render = false;		
		$scope.dataModel.wizardModel.finishButton.show = false;
		$scope.dataModel.wizardModel.finishButton.render = false;
		$scope.dataModel.wizardModel.extraBtn1.show = false;
		$scope.dataModel.wizardModel.extraBtn2.show = false;
		$scope.dataModel.readRetProviderDetails();
		$scope.dataModel.readChartMemberDetails();
	}

	$scope.dataModel.wizardModel.finishButton.disabled = !$scope.dataModel.agree;

	$scope.$watch('dataModel.agree', function(value){
		$scope.dataModel.wizardModel.finishButton.disabled = !value;
	});
	var selectedMemebers = [];
	for(var i=0; i < $scope.dataModel.retrievalRecords.length; i++){
		if($scope.dataModel.retrievalRecords[i].selected){
			selectedMemebers.push($scope.dataModel.retrievalRecords[i]);
		}
	}
	appointmentConfirmTableModel.records = selectedMemebers;
	appointmentConfirmTableModel.totalRecordsCount = selectedMemebers.length;
	$scope.dataModel.appointmentConfirmModel = appointmentConfirmTableModel;	
});
