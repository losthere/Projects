//var dataintakemodule = angular.module('dataintakeUIApp', ['uitk.component.uitkPanel','uitk.component.uitkDynamicTable','uitk.component.uitkCalendar','uitk.component.uitkLabel','uitk.component.uitkTextField','uitk.component.uitkButton','uitk.component.uitkDialog','uitk.component.uitkMessage','looup-data','ngSanitize','staticDataService']);

utilitymodule.factory("dataServiceModel", function() {
	var dataObj = {};
	return dataObj;
});



utilitymodule.controller("dataintakeUIController", function($scope, $http, $compile, $filter, $timeout, dataServiceModel,staticDataService, errorMessageModel) {
	
	$scope.dataModel = dataServiceModel;
		
	var userObj = optumUI.getUser();
	$scope.dataModel.loginUserKey = userObj.getLoggedInUserKey();
	$scope.dataModel.loginUserId = optumUI.getAuthUser();
	$scope.dataModel.currentGroupKey =  userObj.getCurrentGroupKey();
	$scope.dataModel.canKeepMessages = false;
	
	var selectedData = {
			projectIds : [],			
			fileNames : []
	}
	
/**	var selectedProjectIds = [];
	var selectedProjectIndex = []; */
	
	$scope.showReleaseProjectDialog = false;
	$scope.showDeleteProjectDialog = false;
	$scope.showLoadingDialog = false;
	var isErrorFileSelected = false;
	$scope.searchResults = [];
	
	$scope.optumAsRetVendorProjects = [];
		
	$scope.dataintakeUIFiltersModel = {
	    id : 'dataintakeUIFiltersPanel',
		title:'Filters',
		templateUrl: 'filterstemplate.htm',
		open : true,
        panelWidth : '100%',
		panelHeight: 'auto',
		collapsible: true        
    }
		
    $scope.model = {
    		createdDateModel : {
    			enableValidation : true
    		}    		
    }
	
	$scope.dataModel.dataintakeErrorMessageModel = {
            id : 'error-message',
            messageType : 'error',
            content : '',
            visible : false,
            position : 'fixed',
            ariaAttributes : true,
            headingLevel : '2'            
	}
	$scope.dataModel.dataintakeSuccessMessageModel = {
            id : 'success-message',
            messageType : 'success',
            content : '',
            visible : false,
            position : 'fixed',
            messageRole : 'alertdialog',
            ariaAttributes : true,
            headingLevel : '2',
	};
	$scope.setErrorMessage = function(message){
             $scope.dataModel.dataintakeErrorMessageModel.content = '<span>'+message+'</span>';
             $scope.dataModel.dataintakeErrorMessageModel.visible = true;
	};
	$scope.setSuccessMessage = function(message){
        $scope.dataModel.dataintakeSuccessMessageModel.content = '<span>'+message+'</span>';
        $scope.dataModel.dataintakeSuccessMessageModel.visible = true;
	}
	
	$scope.dataModel.clearSelectedProjects = function(){
		selectedData.projectIds = [];
		selectedData.fileNames = [];
			
/**		selectedProjectIds = [];
		selectedFileNames = []; */
		$scope.dataintakeUITableModel.selectedRecords = [];
		$scope.dataintakeUITableModel.selectedRecordCount = 0;
	}
	
	var prepareRequestParams = function(isFromReleaseProject){
		$scope.dataModel.requestParams = [];
		var tableRecords = $scope.dataintakeUITableModel.selectedRecords;
		var requestParamsIndex = [];
		var selectedProjects = [];
		for(var selectedIndex = 0; selectedIndex < selectedData.projectIds.length; selectedIndex++ )
		{	
			var recordIndex = -1;
			var recordAlreadySelected = false;
			for(var index=0; index<tableRecords.length; index++){
				if(tableRecords[index].projKey == null || tableRecords[index].projKey == '' ){
					if(tableRecords[index].fileName == selectedData.fileNames[selectedIndex]){
						isErrorFileSelected = true;	
						recordIndex = index; 
						break;
					}
				}
				else if(tableRecords[index].projKey == selectedData.projectIds[selectedIndex]){ 
					recordIndex = index;
					for(var paramsIndex = 0; paramsIndex < requestParamsIndex.length; paramsIndex++){
						if(requestParamsIndex[paramsIndex] == recordIndex){
							recordAlreadySelected = true;
						}	
					}
					if(!recordAlreadySelected){	
						break;
					}				
				}
			}
			
			var selectedChaseFileKey  = tableRecords[recordIndex].chaseFileKEy;
			var selectedProjKey = tableRecords[recordIndex].projKey;
			
			var requestParam = {
					fileKey: selectedChaseFileKey,
			        projKey: selectedProjKey,
			        loginUserKey : $scope.dataModel.loginUserKey,
			        requestedUser :  $scope.dataModel.loginUserId		
			};
			
			if(selectedProjKey && tableRecords[recordIndex].isOptumRetrieval){
				if(!selectedProjects[selectedProjKey]){
					selectedProjects[selectedProjKey] = [selectedChaseFileKey];
				}else{
					var selectedFiles = selectedProjects[selectedProjKey];
					selectedFiles.push(selectedChaseFileKey);
				}
			}
			$scope.dataModel.requestParams.push(requestParam);
			requestParamsIndex.push(recordIndex);
		}
		if(isFromReleaseProject){
			for(var project in  selectedProjects){
				var selectedFileList = selectedProjects[project];
				var totalFileList = $scope.optumAsRetVendorProjects[project];
				if(!totalFileList){
					continue;
				}
				if(selectedFileList.length != totalFileList.length){
					$scope.setErrorMessage(project + " has more than one file loaded, selected for optum retrieval. Please select all the files for the project and click on release");
					return false;
				}else if(selectedFileList.length == totalFileList.length){
					for(var i=0; i < selectedFileList.length; i++){
						if(totalFileList.indexOf(selectedFileList[i]) < 0){
							$scope.setErrorMessage(project + " has more than one file loaded, selected for optum retrieval. Please select all the files for the project and click on release");
							return false;
						}
					}
				}
			}
		}
		return true;
	}
	
	$scope.dataModel.releaseProject = function(){
		$scope.dataModel.dataintakeErrorMessageModel.visible = false;
		$scope.dataModel.dataintakeSuccessMessageModel.visible = false;
		$scope.showLoadingDialog = true;
		$scope.showReleaseProjectDialog = false;
		$http.post('/gcm-app-services/utilities/project/releaseProject',$scope.dataModel.requestParams).then(function(response) {
			$scope.showLoadingDialog = false;
			if(response.data.status === 'SUCCESS' ){
				if(response.data.result && response.data.result.length > 0) {
					var projKeys = '';
						for (var i = 0; i < response.data.result.length; i++) {
							if (i == 0)
								projKeys = response.data.result[i];
							else
								projKeys = projKeys + ', ' + response.data.result[i];
						}
					$scope.setErrorMessage("The following projects cannot be released: " + projKeys + ". Please contact the help desk  at 1-844-752-9438 if you need assistance");					
				} else if(isErrorFileSelected){
					var array = $scope.dataModel.requestParams;
					var successProjs = '';
					for (var i = 0; i < $scope.dataModel.requestParams.length; i++) {
						var index = response.data.result.indexOf($scope.dataModel.requestParams[i].projKey);
						if (index == -1 && $scope.dataModel.requestParams[i].projKey != null) {
							if(successProjs == null || successProjs == '' )
								successProjs = $scope.dataModel.requestParams[i].projKey;
							else
								successProjs = successProjs + ', ' + $scope.dataModel.requestParams[i].projKey;
						}
					}
					$scope.setErrorMessage("File for project(s) " + successProjs + " was released.  Only projects with a Project ID  may be released for processing");	
				} else {
					$scope.setSuccessMessage("Records for your selected project(s) are being released for processing");
				}	
				$scope.dataModel.canKeepMessages = true;
				$scope.dataModel.readProjectListForRelease();
				$scope.dataModel.clearSelectedProjects();
				isErrorFileSelected = false;
							
			}
		},function(error) {
			$scope.showLoadingDialog = false;
			$scope.setErrorMessage("Projects cannot be released at this time. Please try again or contact the help desk at 1-844-752-9438 if you need assistance");
		});	
	}
	
	$scope.dataModel.deleteProject = function(){
		$scope.dataModel.dataintakeErrorMessageModel.visible = false;
		$scope.dataModel.dataintakeSuccessMessageModel.visible = false;
		$scope.showLoadingDialog = true;
		$scope.dataModel.requestParams = [];
		$scope.showDeleteProjectDialog = false;
		prepareRequestParams(false);
     	$http.post('/gcm-app-services/utilities/project/deleteProject',$scope.dataModel.requestParams).then(function(response) {
				if(response.data.status === 'SUCCESS' ){
					$scope.showLoadingDialog = false;
					$scope.dataModel.canKeepMessages = true;
					$scope.setSuccessMessage("Delete project request initiated for records in your selected project(s)");
					$scope.dataModel.readProjectListForRelease();
					$scope.dataModel.clearSelectedProjects();				
				}
			},function(error) {
				$scope.showLoadingDialog = false;
				$scope.setErrorMessage("Unable to delete project.  Please contact held desk at 1-844-752-9438 for assistance.");
			});						
		
	}
	
    $scope.dataModel.readProjectListForRelease = function(){
    	$scope.dataModel.clearDataIntakeInfo();
        $scope.showLoadingDialog = true;
		$scope.dataintakeUITableModel.disableRelease = true;
		$scope.dataintakeUITableModel.disableDelete = true;
		$http.post('/gcm-app-services/utilities/project/getProjectListforRelease',$scope.dataModel.requestParamsForFilter).then(function(response) {
			$scope.showLoadingDialog = false;
			if (response && response.data.result){
					//$scope.showLoadingDialog = false;
					$scope.dataintakeUITableModel.records = response.data.result;
					$scope.dataintakeUITableModel.totalRecordsCount  = $scope.dataintakeUITableModel.records.length;
					for(var i = 0; i < $scope.dataintakeUITableModel.records.length; i++){
						var record = $scope.dataintakeUITableModel.records[i];
						if(record.projKey && record.isOptumRetrieval == 'Y'){
							if(!$scope.optumAsRetVendorProjects[record.projKey]){
								$scope.optumAsRetVendorProjects[record.projKey] = [record.chaseFileKEy];
							}else{
								var fileNameList = $scope.optumAsRetVendorProjects[record.projKey];
								if(fileNameList.indexOf(record.chaseFileKEy) < 0){
									fileNameList.push(record.chaseFileKEy);
								}
							}
						}
					}
					$scope.dataintakeUITableModel.pagination.currentPageNumber = 1;
					$scope.dataintakeUITableModel.pagination.currentPageNumberInView = 1;
					$scope.dataintakeUITableModel.pagination.pageNumberError = false;
					$scope.dataintakeUITableModel.pagination.recordsPerPage = 10;
					$scope.dataintakeUITableModel.originalRecords = [];	
					$scope.searchResults = $scope.dataintakeUITableModel.records.slice();
					$scope.dataintakeUITableModel.columns[6].sortOrder = 1; //to always sort createdDate in ascending order
					$scope.dataintakeUITableModel.onSort('createDate');
			}				
		 },function(error){
			$scope.showLoadingDialog = false;
		 });
        }	
       
        function clearSort(){
    		angular.forEach($scope.dataintakeUITableModel.columns,function(col,idx){
    			col.sortOrder = 0;
    		});
    		if($scope.dataintakeUITableModel.columns && $scope.dataintakeUITableModel.columns.length > 0)
    			$scope.dataintakeUITableModel.columns[6].sortOrder = 1;
    	} 
        
       $scope.dataModel.clearDataIntakeInfo = function(){
    	    clearSort();
    	    if(!$scope.dataModel.canKeepMessages){
	    	    $scope.dataModel.dataintakeErrorMessageModel.visible = false;
	    		$scope.dataModel.dataintakeSuccessMessageModel.visible = false;
    	    }
    	    $scope.dataModel.canKeepMessages = false;
    		$scope.dataintakeUITableModel.records = [];
    		$scope.dataintakeUITableModel.originalRecords = [];
    		$scope.dataintakeUITableModel.totalRecordsCount = 0;
    		$scope.dataintakeUITableModel.selectedRecords = [];
    		$scope.dataintakeUITableModel.selectedRecordCount = 0;
    		$scope.dataintakeUITableModel.pagination.currentPageNumber = 1;
    		$scope.dataintakeUITableModel.pagination.currentPageNumberInView = 1;
    		$scope.dataintakeUITableModel.pagination.pageNumberError = false;
    		$scope.dataintakeUITableModel.pagination.recordsPerPage = 10;
    		$scope.dataintakeUITableModel.disableRelease = true;
    		$scope.dataintakeUITableModel.disableDelete = true;
    	}
	
	$scope.dataintakeUITableModel =  {
			
			links : [
				'<img class="img" style="margin-bottom: -3px" src="../lib/images/release.png"><a href ng-if="!model.disableRelease" ng-click="model.releaseProject()">Release</a><a ng-if="model.disableRelease" class="adisabled" >Release</a>',
				'<a href ng-click="model.deleteProject()"><uitk:icon-font icon="cux-icon-delete cux-icon-action" ng-if="!model.disableDelete" ng-click="model.deleteProject()" icon-text="Delete Project"></uitk:icon-font></a><a ng-if="model.disableDelete" class="adisabled"><uitk:icon-font icon="cux-icon-delete cux-icon-action" icon-text="Delete Project"></uitk:icon-font></a>'
			],	
			disableRelease : true,
			disableDelete : true,
			pagination : {
				currentPageNumber : 1,
				currentPageNumberInView : 1,
				recordsPerPage : 10,
				recordsPerPageChoices : [10, 25, 50, 75, 100],
				showPaginationFooter : false,
				pageNumberError : false										
			},			
			columns :  [
			{
				columnId:'checkboxId',
				label:'',
				layoutOrder:1,
				cellTemplate: '<input type="checkbox" id="{{record.projKey}}{{record.fileName}}" ng-model="record.selected" ng-click="model.onRowSelect($event, record, record.selected);"/>', 
				resizable: false,	
				style: 'width:2%; height: 4.176rem;'
			},
			{
				columnId:'projKey',
				label:'Project ID',
				layoutOrder:2,
				sortable:true,
				cellTemplate:'<span style="display:block; text-align:right" ng-bind="::record.projKey"></span>',
				resizable: false,	
				style: 'width:12%; text-align:right;'
			},
			{
				columnId:'projName',
				label:'Project Name',
				layoutOrder:3,
				sortable:true,
				cellTemplate:'<span ng-bind="::record.projName"> </span>',
				resizable: false,	
				style: 'width:14%;text-align:left;'
			},
			{
				columnId:'busSegment',
				label:'Business Segment',
				layoutOrder:4,
				sortable:true,
				cellTemplate:'<span ng-bind="::record.busSegment"</span>',
				resizable: false,	
				style: 'width:13%; text-align:left;'
			},
			{
				columnId:'projectYear',
				label:'Project Year',
				layoutOrder:5,
				sortable:true,
				cellTemplate:'<span style="display:block; text-align:right" ng-bind="::record.projectYear"></span>',
				resizable: false,				
				style: 'width:10%; text-align:right'
			},
			{
				columnId:'fileName',
				label:'File Name',
				layoutOrder:6,
				sortable:true,
				cellTemplate:'<span ng-bind="::record.fileName"> </span>',
				resizable: false,	
				style: 'width:10%;text-align:left;'
			},
			{
				columnId:'createDate',
				label:'Created Date',
				layoutOrder:7,	
				sortable:true,
				sortOrder:1,
				cellTemplate:'<span ng-bind="::record.createDate"></span>',
				resizable: false,	
				style: 'width:13%; text-align:left;'
			},
			{
				columnId:'totalCount',
				label:'Total Records',
				layoutOrder:8,
				sortable:true,
				cellTemplate:'<span style="display:block; text-align:right" ng-bind="::record.totalCount"></span>',
				resizable: false,	
				style: 'width:10%; text-align:right'
			},
			{
				columnId:'successCount',
				label:'Success',
				layoutOrder:9,
				sortable:true,
				cellTemplate:'<span style="display:block; text-align:right" ng-bind="::record.successCount"> </span>',
				resizable: false,	
				style: 'width:8%; text-align:right; '
			},
			{
				columnId:'failureCount',
				label:'Failure',
				layoutOrder:10,
				sortable:true,
				cellTemplate:'<span style="display:block; text-align:right" ng-bind="::record.failureCount"> </span>',
				resizable: false,	
				style: 'width:8%; text-align:right'
			}
			],
			records : [],
			selectedRecordCount : 0,
			selectedRecords : [],
			totalRecordsCount : 0,
			releaseProject : function(){
				if(this.selectedRecords.length==0){
					$scope.setErrorMessage("No project selected for release");					
					return;
				}
				if(prepareRequestParams(true)){
					$scope.showReleaseProjectDialog = true;
				}
			},
			deleteProject : function(){
				if(this.selectedRecords.length==0){
					$scope.setErrorMessage("No project selected for deletion");					
					return;
				}				
				$scope.showDeleteProjectDialog = true;	
			},
			onRowSelect : function(event, record, selected) {
				var model = this;				
				if (typeof selected === 'undefined') {
					if (event.target.tagName === 'A' || event.target.tagName === 'INPUT')
						return;

					record.selected = !record.selected;
					selected = record.selected;
				}
	

			var recordIndex = -1;
				for (var index = 0; index < model.selectedRecords.length; index++) {
					if (model.selectedRecords[index].fileName === record.fileName && model.selectedRecords[index].projKey === record.projKey)
						recordIndex = index;						
				}

				if (selected) {					
					if (recordIndex < 0){
						model.selectedRecords.push(record);
						selectedData.projectIds.push(record.projKey);
						selectedData.fileNames.push(record.fileName);						
					}
				} else {
					model.selectedRecords.splice(recordIndex, 1);
					selectedData.projectIds.splice(recordIndex, 1);
					selectedData.fileNames.splice(recordIndex, 1);
				}

				this.selectedRecordCount = this.selectedRecords.length;
				if(this.selectedRecordCount >= 1)
					this.disableDelete = false;
				else
					this.disableDelete = true;
				
				var shouldReleaseDisabled = true;
				for (var index = 0; index < model.selectedRecords.length; index++) {
					if (model.selectedRecords[index].projKey == null)
						shouldReleaseDisabled = true;
					else{
						shouldReleaseDisabled = false;
						break;
					}
				}
				this.disableRelease = shouldReleaseDisabled;
			},	
			onChange : function(filterCondition){
				var that = this;
				staticDataService.query(filterCondition, $scope.searchResults, function(result) {
					that.records = result.records;
					that.totalRecordsCount = result.totalRecordsCount; 
		
				});
			} 

				
			
		};
		
});

utilitymodule.controller("dataintakeUIFilterController", function($scope, $http, $compile, dataServiceModel) {
	$scope.filter = {
    		fileName : 'All' ,
    		region : ''
    }
	
	$scope.model.createdDate = {
			enableValidation : true			
	}
	
	$scope.filter.organization = '';
	
	$scope.filter.clearFilters = function() {
		$scope.filter.fileName = 'All';
		$scope.filter.createdDate = '';	
		if($scope.filter.organization == ''){
			$scope.filter.region = '';
		}
		if($scope.vendors.length==1)
			$scope.filter.organization=$scope.vendors[0].key;
		else
		$scope.filter.organization = '';
		$('input[name=createdDateId_cal').val('');
		$scope.model.createdDate.invalid = false;
		$scope.dataModel.clearDataIntakeInfo();
	}
	
	$scope.showErrorMessage = function(message) {
		$scope.errorMessageModel.messageType = 'error';
		$scope.errorMessageModel.content = message;
		$scope.errorMessageModel.visible = true;
	}

	$scope.dataModel = dataServiceModel;
	
	$scope.getVendors = function() {
		if(rootData.currentRole=="SUP" )
		{
			$scope.vendors = rootData.getVendorsByRole(rootData.currentRole);
			if($scope.vendors.length==1){
				$scope.filter.organization =$scope.vendors[0].key;
			}
		}
	}
	
	$scope.getVendors();
	
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
	
	$scope.getRegions = function(){
		$http.post('/gcm-app-services/useradmin/getUserRegionsByGroupKey', reqParams({
			userKey : $scope.dataModel.loginUserKey,
			groupKey :$scope.dataModel.currentGroupKey,
			roleCode : rootData.currentRole,
			vendorKey : ''
		}), config).then(function(response) {
			if(response.data.status === 'SUCCESS' ){
				$scope.regionsList = response.data.result;
				if($scope.regionsList && $scope.regionsList.length == 1)
					$scope.filter.region =$scope.regionsList[0].key;
			}
		});
	}
	
	$scope.getRegions();
	
	$scope.filterRecords = function(){
		$scope.dataModel.dataintakeErrorMessageModel.visible = false;
		if($scope.filter.region == '' && $scope.filter.organization == '')
		{
			$scope.dataModel.dataintakeErrorMessageModel.messageType = 'error';
			$scope.dataModel.dataintakeErrorMessageModel.content = '<span>Region is mandatory.</span>';
			$scope.dataModel.dataintakeErrorMessageModel.visible = true;
			return;
		}
		/*$scope.dataModel.dataintakeErrorMessageModel.visible = false;
		$scope.dataModel.dataintakeSuccessMessageModel.visible = false;*/
		if(!$scope.model.createdDate.invalid){
			$scope.filter.createdDate = $("#createdDateId_cal").val();
			$scope.dataModel.clearSelectedProjects();

			if($scope.filter.fileName == 'All'){
				$scope.dataModel.requestParamsForFilter = {				
						createDate   : $scope.filter.createdDate,	
						loginUserKey : $scope.dataModel.loginUserKey,
						groupKey     : $scope.dataModel.currentGroupKey,
						region	 : $scope.filter.region
				};				
			}
			else{
				$scope.dataModel.requestParamsForFilter = {
						fileName   : $scope.filter.fileName,	
						createDate : $scope.filter.createdDate,
						loginUserKey : $scope.dataModel.loginUserKey,
						groupKey     : $scope.dataModel.currentGroupKey,
						region	     : $scope.filter.region
				};
			}		
			$scope.dataModel.readProjectListForRelease();
		}	
	}
});