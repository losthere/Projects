schedulerworklistmodule.controller('prvdrInforCntrl', function($scope, $compile, $http, dataServiceModel, $timeout, staticDataService){
		$scope.dataModel = dataServiceModel;        
		$scope.dataModel.wizardModel.extraBtn1.show = true;
		$scope.dataModel.wizardModel.extraBtn2.show = true;
		$scope.dataModel.providerSelectionChanged = false;
		if(!$scope.dataModel.selectedProviderRecords || $scope.dataModel.selectedProviderRecords <= 0){
			$scope.dataModel.wizardModel.nextButton.disabled = true;
			$scope.dataModel.selectedProviderRecords = [];
		}else{
			$scope.dataModel.providerInfoVisited = true;
			$scope.dataModel.wizardModel.nextButton.disabled = false;
		}
		
	$scope.dataModel.providerInfoModel = {
		links : [ '<a></a>' ],
		pagination : {
				currentPageNumber : 1,
				paginationWindow : 5,
				recordsPerPage : 10,
				recordsPerPageChoices : [10, 25, 50, 100]
			},
		columns :  [
			{
				columnId:'multiSelect',
				layoutOrder:1,
				resizable:false,
				style: "width: 5%;",
				align: "center",
				cellHeaderTemplate: [
										'<label for="worklistSelectAllRCheckId" class="oui-a11y-hidden">Select All Checkbox</label> ',
										'<input type="checkbox" ng-model="model.selectAllChecked" id="worklistSelectAllRCheckId" ng-change="model.onSelectAllRows(model.selectAllChecked);"/> '
									].join(''),
				cellTemplate:['<label for="{{record.index}}" class="oui-a11y-hidden">Select Row</label> ',
								 '<input type="checkbox" id="{{record.index}}" ng-model="record.selected" ng-click="model.onRowSelect($event, record, record.selected);"/>'].join('')
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
				columnId:'provId', 
				label:'Provider ID',
				layoutOrder:4,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.provId"> </span>' 
			},
			{ 
				columnId:'provLocation', 
				label:'Location',
				layoutOrder:5,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.provLocation"> </span>' 
			},
			{ 
				columnId:'provPhone', 
				label:'Phone',
				layoutOrder:6,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.provPhone"> </span>' 
			},
			{ 
				columnId:'provFax', 
				label:'Fax',
				layoutOrder:7,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.provFax"> </span>' 
			},
			{ 
				columnId:'splHndling', 
				label:'Special Handling',
				layoutOrder:8,
				resizable:false, 
				sortable:false,                
				cellTemplate : '<span> {{record.specialCategory ? record.specialCategory+"-" : ""}}{{record.specialNotes}}</span>' 
			},
			{ 
				columnId:'count', 
				label:'#Chart ID',
				layoutOrder:9,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<a href="" ng-click="model.showChartsPopUp(record)"><span ng-bind="::record.count"> </span></a>' 
			}
		],
		records : [],
		totalRecordsCount : 0,
		selectedRecordCount : 0,
		selectedRecords : [],
		viewAvailableRecords:false,
		onSelectAllRows : function(selectAll) {
			dataServiceModel.providerSelectionChanged = true;
			var model = this;
			var availableRecords = model.records;
			if(dataServiceModel.selectedProviderRecords.length > 0)
			{
				model.selectedRecords = dataServiceModel.selectedProviderRecords;
			}

			var selectedRecords = [];
			for(var index = 0 ; index < model.selectedRecords.length ; index++) {
				selectedRecords.push(model.selectedRecords[index]);
			}
			if(model.viewAvailableRecords){
				for(var row = 0 ; row < availableRecords.length ; row++) {
					if(availableRecords[row].selected) {
						availableRecords[row].selected = false;
					}
				}
				availableRecords.length = 0;
			}
			for(row = 0 ; row < availableRecords.length ; row++) {
				var recordIndex = selectedRecords.indexOf(availableRecords[row]);
				if(selectAll) {
					availableRecords[row].selected = true;
					if(recordIndex < 0) {
						model.selectedRecords.push(availableRecords[row]);
					}
				} else {
					if(availableRecords[row].selected) {
						model.selectedRecords.splice(row, 1);
						availableRecords[row].selected = false;
					}
				}
			}
			this.selectedRecordCount = this.selectedRecords.length;
			dataServiceModel.selectedProviderRecords = model.selectedRecords;
			if(selectAll){
				$scope.dataModel.wizardModel.nextButton.disabled = false;
			}else{
				this.selectedRecords = [];
				this.selectedRecordCount = this.selectedRecords.length;
				dataServiceModel.selectedProviderRecords = model.selectedRecords;
				$scope.dataModel.wizardModel.nextButton.disabled = true;
			}
		},
		onRowSelect : function(event, record, selected) {
			dataServiceModel.providerSelectionChanged = true;		
			var model = this;
			if(dataServiceModel.selectedProviderRecords.length > 0)
			{
				model.selectedRecords = dataServiceModel.selectedProviderRecords;
			}
			//console.log('onSelect callback method called');
			if(typeof selected === 'undefined') {
				if(event.target.tagName === 'A' || event.target.tagName === 'INPUT') {
					return;
				}
				record.selected = !record.selected;
				selected = record.selected;
			}
			if(!selected && model.selectAllChecked) {
				model.selectAllChecked = false;
			}

			var availableRecords = model.records;
			var allSelected = true;

			for(var rowIndex = 0; rowIndex < availableRecords.length; rowIndex++) {
				if(!availableRecords[rowIndex].selected) {
					allSelected = false;
					break;
				}
			}

			if(model.viewAvailableRecords){
				allSelected = true;
			}

			model.selectAllChecked = allSelected;

			var recordIndex = -1;
			for(var index = 0 ; index < model.selectedRecords.length ; index++) {
				if(model.selectedRecords[index] == record) {
					recordIndex = index;
				}
			}
			if(selected) {
				if(recordIndex < 0) {
					model.selectedRecords.push(record);
				}
			} else {
				model.selectedRecords.splice(recordIndex, 1);
			}
			this.selectedRecordCount = this.selectedRecords.length;
			if(this.selectedRecordCount > 0){
				dataServiceModel.wizardModel.nextButton.disabled = false;
			}else{
				dataServiceModel.wizardModel.nextButton.disabled = true;
			}
			dataServiceModel.selectedProviderRecords = model.selectedRecords;
		},
		onChange : function(filterCondition){
			var that = this;
			staticDataService.query(filterCondition, that.records, function(result) {
				that.records = result.records;
				that.totalRecordsCount = result.totalRecordsCount;

				// Add this code snippet for Select All Functionality
				var allSelected = true;
				for(var rowIndex = 0; rowIndex < that.records.length; rowIndex++) {
					if(!(that.records[rowIndex].selected)) {
						allSelected = false;
						break;
					}
				}
				if(that.records.length > 0)
					that.selectAllChecked = allSelected;
			});
		}
	}
	
	$scope.dataModel.providerInfoModel.onChange = function(filterCondition) {
		var that = this;
		
		staticDataService.query(filterCondition, $scope.dataModel.providerRecords, function(result) {
			that.records = result.records;
			that.totalRecordsCount = result.totalRecordsCount;

			// Add this code snippet for Select All Functionality
			var allSelected = true;
			for(var rowIndex = 0; rowIndex < that.records.length; rowIndex++) {
				if(!(that.records[rowIndex].selected)) {
					allSelected = false;
					break;
				}
			}
			if(that.records.length > 0)
				that.selectAllChecked = allSelected;
		});
	}
		
	if(!$scope.dataModel.isFromModifyApptmnt && $scope.dataModel.myWorklistModel && $scope.dataModel.myWorklistModel.selectedRecords && $scope.dataModel.myWorklistModel.selectedRecords.length > 0){
		$scope.dataModel.providerRecords = $scope.dataModel.myWorklistModel.selectedRecords;
		if(!$scope.dataModel.providerInfoVisited && $scope.dataModel.providerRecords.length > 0)
		{
			$scope.dataModel.providerInfoVisited = true;
			$scope.dataModel.providerInfoModel.totalRecordsCount = 0;
			$scope.dataModel.providerInfoModel.records = [];
			for(var i = 0; i < $scope.dataModel.providerRecords.length; i++)
			{
				$scope.dataModel.providerRecords[i].selected = false;
			}
			$scope.dataModel.providerInfoModel.selectedRecordCount = 0;
		}
	}
		
	$timeout(function(){
		$scope.dataModel.providerInfoModel.totalRecordsCount = $scope.dataModel.providerRecords.length;
		angular.forEach($scope.dataModel.providerRecords, function(obj, idx) {
			obj.index = idx + 1;
		});
		$scope.dataModel.providerInfoModel.records = $scope.dataModel.providerRecords;
		$scope.dataModel.providerInfoModel.selectedRecords = $scope.dataModel.selectedProviderRecords;
		$scope.dataModel.providerInfoModel.selectedRecordCount = $scope.dataModel.selectedProviderRecords.length;
		if($scope.dataModel.providerInfoModel.totalRecordsCount == $scope.dataModel.providerInfoModel.selectedRecordCount){
			$scope.dataModel.providerInfoModel.selectAllChecked = true;
		}else{
			$scope.dataModel.providerInfoModel.selectAllChecked = false;
		}
		$scope.dataModel.providerInfoModel.onLoad(true);
	});
	
	$scope.dataModel.providerInfoModel.showChartsPopUp = function(provDetails){
		$scope.dataModel.memberInfoModel.records = [];
		$scope.dataModel.memberInfoModel.totalRecordsCount = 0;
		$scope.dataModel.chartCount = provDetails.count;
		readChartMeberDetails(provDetails);
		$scope.dataModel.showMemberInfoDialog = !$scope.dataModel.showMemberInfoDialog;
	}
	
	var readChartMeberDetails = function(provDetails){
		var selectedRecords = [];
		var selectedRecordCount = 0;
		var memberDetailFilter = {
			"provGroupName"	:	provDetails.provGroupName,
			"provName"		:   provDetails.provName,
			"provId"		:	provDetails.provId,
			"provLocation"	:	provDetails.provLocation,
			"provPhone"		:	provDetails.provPhone,
			"provFax"		:	provDetails.provFax,			
			"specialNotes"	:	provDetails.specialNotes,
			"specialCategory":	provDetails.specialCategory,
			"userName"		:	provDetails.userName,
			"userKey"		: 	provDetails.userKey,
			"isAssigned"	:	"1",
			"fromUserKey"	:   "",
			"toUserKey"		:	"",
			"loginUserKey"	:	$scope.dataModel.loginUserKey,
			"requestedUserId":	$scope.dataModel.loginUserId,
			"apptKey"		:   $scope.dataModel.selectedMyApptId,
			"busFuncDtlKey"	:	$scope.dataModel.busFuncDtlKey
		}
		
		$http.post('/gcm-app-services/scheduling/workflow/getMemberDetails', memberDetailFilter).then(function(response) {
			if(response && response.data && response.data.result && response.data.result.length > 0){
				$scope.dataModel.memberInfoModel.records = response.data.result;
				$scope.dataModel.memberInfoModel.totalRecordsCount = response.data.result.length;
				/*for(var i = 0; i < $scope.dataModel.memberInfoModel.records.length; i++)
				{
					if($scope.dataModel.memberInfoModel.records[i].isIncludeFlag == "Y"){
						$scope.dataModel.memberInfoModel.records[i].selected = true;
						selectedRecords.push($scope.dataModel.memberInfoModel.records[i]);
					}else{
						$scope.dataModel.memberInfoModel.records[i].selected = false;
					}
				}
				$scope.dataModel.memberInfoModel.selectedRecords = selectedRecords;
				$scope.dataModel.memberInfoModel.selectedRecordCount = selectedRecords.length;*/
			}else{
				$scope.dataModel.memberInfoModel.records = [];
				$scope.dataModel.memberInfoModel.totalRecordsCount = 0;
				/*$scope.dataModel.memberInfoModel.selectedRecords = [];
				$scope.dataModel.memberInfoModel.selectedRecordCount = 0;*/
			}				
		}, function(error) {
			alert(JSON.stringify(error));
		});
	}
 }); 