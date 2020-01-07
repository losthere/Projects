schedulerworklistmodule.controller("rtrvlInfoCntrl",function($scope, $compile, $timeout, $http, dataServiceModel, staticDataService){
	$scope.dataModel = dataServiceModel;
	$scope.hasErrors = true;
	$scope.errorMessage = "";	
	
	$scope.errorMessageModel = {
		id : 'retrievalError',
        messageType : 'error',
        content : '',
        visible : false,
        ariaAttributes : true,
        headingLevel : '2',
        messageVisibleTime : '5000'
	}
	
			
	$scope.dataModel.retrievalInfoModel = {
		links : [ '<a></a>' ],
		pagination : {
				currentPageNumber : 1,
				paginationWindow : 5,
				recordsPerPage : 10,
				recordsPerPageChoices : [10, 25, 50, 100]
			},
		columns :  [
			{
				columnId:'retrvlTablMultiSelect',
				layoutOrder:1,
				resizable:false,
				style: "width: 5%;",
				align: "center",
				cellHeaderTemplate: '<label for="include">Include?</label>',
				cellTemplate:['<label for="{{record.providerName}}" class="oui-a11y-hidden">Select Row</label> ',
								 '<input type="checkbox" id="{{record.providerName}},{{record.groupName}}" ng-model="record.selected" ng-click="model.onRowSelect($event, record, record.selected);"/>'].join('')
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
				columnId:'provPhone', 
				label:'Phone',
				layoutOrder:5,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.provPhone"> </span>' 
			},
			{ 
				columnId:'provFax', 
				label:'Fax',
				layoutOrder:6,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.provFax"> </span>' 
			},
			{ 
				columnId:'memberName', 
				label:'Member Name',
				layoutOrder:7,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span style="text-transform:capitalize" ng-bind="::record.memberName"> </span>' 
			},
			{ 
				columnId:'memberDOB', 
				label:'Member Date of Birth',
				layoutOrder:8,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.memberDOB"> </span>' 
			},
			{ 
				columnId:'memberGender', 
				label:'Gender',
				layoutOrder:9,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.memberGender"> </span>' 
			},
			{ 
				columnId:'chartId', 
				label:'Chart ID',
				layoutOrder:10,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.chartId"> </span>' 
			}
		],
		records: [],
		totalRecordsCount: 0,
		selectedRecords : [],
		selectedRecordCount : 0,
		onChange : function(filterCondition){
			var that = this;
			staticDataService.query(filterCondition, that.records, function(result) {
				that.records = result.records;
				that.totalRecordsCount = result.totalRecordsCount;

				/*// Add this code snippet for Select All Functionality
				var allSelected = true;
				for(var rowIndex = 0; rowIndex < that.records.length; rowIndex++) {
					if(!(that.records[rowIndex].selected)) {
						allSelected = false;
						break;
					}
				}
				if(that.records.length > 0)
					that.selectAllChecked = allSelected;*/
			});
		}
	};
	
	$scope.dataModel.retrievalInfoModel.selectedRecords = $scope.dataModel.includedRtrvlRecords;
	$scope.dataModel.retrievalInfoModel.selectedRecordCount = $scope.dataModel.includedRtrvlRecords.length;
	
	$scope.dataModel.retrievalInfoModel.onRowSelect = function(event, record, selected) {
		$scope.dataModel.providerSelectionChanged = true;		
		var model = this;
		
//		this.viewAvailableRecords = true;
		if($scope.dataModel.includedRtrvlRecords.length > 0)
		{
			model.selectedRecords = $scope.dataModel.includedRtrvlRecords;
		}
		//console.log('onSelect callback method called');
		if(typeof selected === 'undefined') {
			if(event.target.tagName === 'A' || event.target.tagName === 'INPUT') {
				return;
			}
			record.selected = !record.selected;
			selected = record.selected;
		}		

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
		if(this.selectedRecordCount > 0 || $scope.dataModel.wizardModel.nextButton.label != 'Next'){
			$scope.dataModel.wizardModel.nextButton.disabled = false;
		}else{
			$scope.dataModel.wizardModel.nextButton.disabled = true;
		}
		$scope.dataModel.includedRtrvlRecords = model.selectedRecords;
	}
	
	$scope.dataModel.retrievalInfoModel.onChange = function(filterCondition) {
		var that = this;
		
		staticDataService.query(filterCondition, $scope.dataModel.retrievalRecords, function(result) {
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
	
	if(!$scope.dataModel.providerSelectionChanged && $scope.dataModel.isFromModifyApptmnt && $scope.dataModel.includedRtrvlRecords.length == 0)
	{
		$scope.dataModel.readChartMemberDetailsApptId();		
	}
	else if ($scope.dataModel.providerSelectionChanged){
		var assignInventorySearchFilterArray = [];		
		for( var i =0; i < $scope.dataModel.providerInfoModel.selectedRecords.length; i++)
		{
			var recordObj = $scope.dataModel.providerInfoModel.selectedRecords[i];
			var filterObj = {};
			filterObj.count = recordObj.count;
			filterObj.provFax = recordObj.provFax;
			filterObj.provGroupName = recordObj.provGroupName;
			filterObj.provId = recordObj.provId;
			filterObj.provLocation = recordObj.provLocation;
			filterObj.provName = recordObj.provName;
			filterObj.provPhone = recordObj.provPhone;
			filterObj.specialCategory = recordObj.specialCategory;
			filterObj.specialNotes = recordObj.specialNotes;
			filterObj.userKey = recordObj.userKey;
			filterObj.userName = recordObj.userName;
			assignInventorySearchFilterArray[i] = filterObj;
		}
		
		$scope.dataModel.SchedulingSearchFilter.appointmentId = $scope.dataModel.selectedMyApptId;
		$scope.dataModel.SchedulingSearchFilter.busFuncDtlKey = $scope.dataModel.busFuncDtlKey;
		var retDataSearchFilter = {
									"assignInventorySearchFilter": assignInventorySearchFilterArray,
									"schedulingSearchFilter" : $scope.dataModel.SchedulingSearchFilter
								  };
		var readChartMemberDetails = function(){
			$scope.dataModel.retrievalRecords = [];
			$scope.dataModel.includedRtrvlRecords = [];
			$http.post('/gcm-app-services/scheduling/workflow/getChartMemberDetails', retDataSearchFilter).then(function(response) {
				if(response && response.data && response.data.result && response.data.result.length > 0){
					$scope.dataModel.retrievalRecords = response.data.result;
					for(var i = 0; i <  $scope.dataModel.retrievalRecords.length; i++)
					{
						if($scope.dataModel.retrievalRecords[i].isIncludeFlag == 'N'){
							$scope.dataModel.retrievalRecords[i].selected = false;
						}else{
							$scope.dataModel.retrievalRecords[i].selected = true;
							$scope.dataModel.includedRtrvlRecords.push($scope.dataModel.retrievalRecords[i]);
						}
					}					
					$scope.dataModel.retrievalInfoModel.records = $scope.dataModel.retrievalRecords;
					$scope.dataModel.retrievalInfoModel.totalRecordsCount = response.data.result.length;
					$scope.dataModel.retrievalInfoModel.selectedRecords = $scope.dataModel.includedRtrvlRecords;
					$scope.dataModel.retrievalInfoModel.selectedRecordCount = $scope.dataModel.includedRtrvlRecords.length;
					$scope.dataModel.retrievalInfoModel.onLoad(true);
				}else{
					$scope.dataModel.includedRtrvlRecords = [];
					$scope.dataModel.retrievalRecords = [];
				}
				$scope.dataModel.retrievalInfoModel.records = $scope.dataModel.retrievalRecords;
				$scope.dataModel.retrievalInfoModel.totalRecordsCount = $scope.dataModel.retrievalRecords.length;
				$scope.dataModel.retrievalInfoModel.selectedRecords = $scope.dataModel.includedRtrvlRecords;
				$scope.dataModel.retrievalInfoModel.selectedRecordCount = $scope.dataModel.includedRtrvlRecords.length;
			}, function(error) {
				alert(JSON.stringify(error));
			});
		}		
		readChartMemberDetails();		
	}else{		
		$scope.dataModel.retrievalInfoModel.records = $scope.dataModel.retrievalRecords;
		$scope.dataModel.retrievalInfoModel.totalRecordsCount = $scope.dataModel.retrievalRecords.length;
		$scope.dataModel.retrievalInfoModel.selectedRecords = $scope.dataModel.includedRtrvlRecords;
		$scope.dataModel.retrievalInfoModel.selectedRecordCount = $scope.dataModel.includedRtrvlRecords.length;
		if($scope.dataModel.retrievalInfoModel.onLoad){
			$scope.dataModel.retrievalInfoModel.onLoad(true)
		};
	}
	$scope.handleRetrvlPrefSelection = function(){
		if($scope.dataModel.retrvlPrefSelect == 'EMR' && $scope.dataModel.busFuncDtlKey != EMR_SCHEDULER_BUS_FUNC_DTL_KEY){
			$scope.dataModel.wizardModel.nextButton.label = 'Release to EMR Queue';
			$("#createSchedule_nextBtn").text($scope.dataModel.wizardModel.nextButton.label);
			$scope.dataModel.wizardModel.nextButton.disabled = false;
		}else if($scope.dataModel.retrvlPrefSelect == 'ONSITE' && $scope.dataModel.busFuncDtlKey != ONSITE_SCHEDULER_BUS_FUNC_DTL_KEY ){
			$scope.dataModel.wizardModel.nextButton.label = 'Release to Onsite Queue';
			$("#createSchedule_nextBtn").text($scope.dataModel.wizardModel.nextButton.label);
			$scope.dataModel.wizardModel.nextButton.disabled = false;
		}else{
			$scope.dataModel.wizardModel.nextButton.label = 'Next';
			$("#createSchedule_nextBtn").text($scope.dataModel.wizardModel.nextButton.label);
			if($scope.dataModel.includedRtrvlRecords.length > 0){
				$scope.dataModel.wizardModel.nextButton.disabled = false;
			}else{
				$scope.dataModel.wizardModel.nextButton.disabled = true;
			}			
		}
	}
	
	$scope.dataModel.validateretrievalDetails = function(){
		if(!$scope.dataModel.retrvlPrefSelect)
		{
			var errorMessage = "Retrieval method Required";
			$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
			$scope.errorMessageModel.visible = true;
			return false;
		}
		else if(!$scope.dataModel.firstName)
		{
			var errorMessage ="First name Required";
			$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
			$scope.errorMessageModel.visible = true;
			return false;
		}
		else if(!$scope.dataModel.lastName)
		{
			var errorMessage ="Last name Required";
			$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
			$scope.errorMessageModel.visible = true;
			return false;
		}else if(!$scope.dataModel.address1){
			var errorMessage ="Address1 Required";
			$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
			$scope.errorMessageModel.visible = true;
			return false;
		}else if(!$scope.dataModel.city){
			var errorMessage ="City Required";
			$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
			$scope.errorMessageModel.visible = true;
			return false;
		}else if(!$scope.dataModel.stateSelect){
			var errorMessage ="State Required";
			$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
			$scope.errorMessageModel.visible = true;
			return false;
		}else if(!$scope.dataModel.zip){// || !validateProperties($scope.dataModel.zip, '/(^\d{5}$)|(^\d{5}-\d{4}$)/')){
			var errorMessage ="Zip Code Required";
			if(!$scope.dataModel.zip){
				errorMessage ="Zip Code Required";
			}else{
				errorMessage ="Zip Code Not Valid";
			}
			$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
			$scope.errorMessageModel.visible = true;
			return false;
		}else if(!$scope.dataModel.phonenumber){
			var errorMessage ="Phone Number Required";
			$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
			$scope.errorMessageModel.visible = true;
			return false;
		}else if(!$scope.dataModel.fax){
			var errorMessage ="Fax Required";
			$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
			$scope.errorMessageModel.visible = true;
			return false;
		}
		return $scope.dataModel.validateRetrievalFormDetails();
	}
	
	$scope.dataModel.validateRetrievalFormDetails = function(){
		if($scope.dataModel.firstName) {
			var firstNamePattern = /^[0-9a-zA-Z- _/]*$/;
			var firstNameRegEx = new RegExp(firstNamePattern);
			var firstNameFlag = firstNameRegEx.test($scope.dataModel.firstName);
			if(!firstNameFlag || $scope.dataModel.firstName.length > 32)
			{
				var errorMessage ="First name Not Valid";
				$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
				$scope.errorMessageModel.visible = true;
				return false;
			}
		}
		if($scope.dataModel.lastName) {
			var lastNamePattern = /^[0-9a-zA-Z- _/]*$/;
			var lastNameRegEx = new RegExp(lastNamePattern);
			var lastNameFlag = lastNameRegEx.test($scope.dataModel.lastName);
			if(!lastNameFlag || $scope.dataModel.firstName.length > 32)
			{
				var errorMessage ="Last name Not Valid";
				$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
				$scope.errorMessageModel.visible = true;
				return false;
			}
		}
		if($scope.dataModel.address1) {
			if($scope.dataModel.address1.length > 32)
			{
				var errorMessage ="Address1 Not Valid";
				$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
				$scope.errorMessageModel.visible = true;
				return false;
			}
		}
		if($scope.dataModel.address2) {
			if($scope.dataModel.address2.length > 32)
			{
				var errorMessage ="Address2 Not Valid";
				$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
				$scope.errorMessageModel.visible = true;
				return false;
			}
		}
		if($scope.dataModel.city) {
			var cityPattern = /^[0-9a-zA-Z- _/]*$/;
			var cityRegEx = new RegExp(cityPattern);
			var cityFlag = cityRegEx.test($scope.dataModel.city);
			if(!cityFlag || $scope.dataModel.city.length > 32)
			{
				var errorMessage ="City Not Valid";
				$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
				$scope.errorMessageModel.visible = true;
				return false;
			}
		}
		if($scope.dataModel.zip) {
			var zipPattern = /^[0-9]*$/;
			var zipRegEx = new RegExp(zipPattern);
			var zipFlag = zipRegEx.test($scope.dataModel.zip);
			if(!zipFlag || ($scope.dataModel.zip.length != 5 && $scope.dataModel.zip.length != 10))
			{
				var errorMessage ="Zip Not Valid";
				$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
				$scope.errorMessageModel.visible = true;
				return false;
			}
		}
		if($scope.dataModel.phonenumber) {
			var phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
			var phoneRegEx = new RegExp(phonePattern);
			var phoneFlag = phoneRegEx.test($scope.dataModel.phonenumber);
			var phonePattern1 = /^\d{10}$/;
			var phoneRegEx1 = new RegExp(phonePattern1);
			var phoneFlag1 = phoneRegEx1.test($scope.dataModel.phonenumber);
			if((!phoneFlag && !phoneFlag1) || $scope.dataModel.phonenumber.length > 12)
			{
				var errorMessage ="Phone Number Not Valid";
				$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
				$scope.errorMessageModel.visible = true;
				return false;
			}
		}
		if($scope.dataModel.fax) {
			var faxPattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
			var faxRexEx = new RegExp(faxPattern);
			var faxFlag = faxRexEx.test($scope.dataModel.fax);
			var faxPattern1 = /^\d{10}$/;
			var faxRexEx1 = new RegExp(faxPattern1);
			var faxFlag1 = faxRexEx1.test($scope.dataModel.fax);
			if((!faxFlag && !faxFlag1) || $scope.dataModel.fax.length > 12)
			{
				var errorMessage ="Fax Not Valid";
				$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
				$scope.errorMessageModel.visible = true;
				return false;
			}
		}
		if ($scope.dataModel.email) {
			var emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
			var emailRegEx = new RegExp(emailPattern);
			var emailFlag = emailRegEx.test($scope.dataModel.email);
			if(!emailFlag || $scope.dataModel.email.length > 64)
			{
				var errorMessage ="Email Not Valid";
				$scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
				$scope.errorMessageModel.visible = true;
				return false;
			}
		}
		return true;
	}
	function validateProperties(value, legal, illegal)
	{
		if (value)
		{
			if (legal)
			{
				var j = new RegExp(legal);
				if (!j.test(value))
				{
					return false;
				}
			}
			if(illegal)
			{
				var j = new RegExp(illegal);
				if (j.test(value))
				{
					return false;
				}
				return true;
			}
		}
		return true;
	}
	
	$scope.dataModel.retrvlInfoVisited = true;
	$scope.dataModel.wizardModel.extraBtn1.show = true;
});