schedulerworklistmodule.factory("dataObject", function() {
	var dataObj = {};
	dataObj.showUploadError = false;
	dataObj.showFileSizeError = false;
	dataObj.showChartFileUploadButton = false
    dataObj.errorMsg = false;        
	return dataObj;
});

schedulerworklistmodule.controller("viewApptCntrl",function($scope, $compile, $timeout, $http, dataServiceModel, dataObject, staticDataService){
	$scope.showChartFileUploadDialog = false;
	$scope.showMultipleChartFileUploadDialog = false;
	$scope.showLoadingDialog=false;
	$scope.dataModel = dataServiceModel;
	$scope.messageModel = dataObject;
	
	
	$scope.viewAppointmentModel = {
		apptType : $scope.dataModel.selectedApptType,
		links : [
					'<a href="" ng-click="model.handleRefax()"><uitk:icon-font icon="cux-icon-refresh"></uitk:icon-font> Fax/Refax</a>',
					'<a href="" ng-click="model.handleBulkUpload()"><uitk:icon-font icon="cux-icon-upload"></uitk:icon-font> Upload</a>',
					'<a href="" ng-click="model.handlePrint()"><uitk:icon-font icon="cux-icon-print"></uitk:icon-font> Print</a>' ],
		pagination : {
				currentPageNumber : 1,
				paginationWindow : 5,
				recordsPerPage : 10,
				recordsPerPageChoices : [10, 25, 50, 100]
			},
		columns :  [
			{
				columnId:'view	ApptMultiSelect',
				layoutOrder:1,
				resizable:false,
				style: "width: 2%;",
				align: "center",
				cellHeaderTemplate : [ '<label for="selectAllCheckboxId1" class="oui-a11y-hidden">Select All Checkbox</label> ',
										'<input type="checkbox" ng-model="model.selectAllChecked" id="selectAllCheckboxId1" ng-change="model.onSelectAllRows(model.selectAllChecked);"/> ' ]
										.join(''),
				cellTemplate : [ '<label for="{{record.providerName}}" class="oui-a11y-hidden">Select Row</label> ',
						'<input type="checkbox" id="{{record.providerName}}" ng-model="record.selected" ng-click="model.onRowSelect($event, record, record.selected);"/>' ].join('')
										
			},
			/*{
				columnId:'upload',
				label:'Upload',
				layoutOrder:2,
				resizable:false,
				style: "width: 6%;",
				showColumnInTable : false,
				cellTemplate : "<span ng-if=\"model.apptType != 'FAX'\"><img ng-src='../../comm/lib/images/upload.png' ng-click='model.uploadClick(record)' style='cursor:pointer;'></img>"
						+" <a tabindex=0 href='' title='Upload' ng-click='model.uploadClick(record)' style='cursor:pointer;color:#005187;line-height:20px;font-size:12px;background:white;'"
						+"  ng-class='hover-item'>Upload</a></span>"
			},*/
			{
				columnId:'provGroupName',
				label:'Group Name',
				layoutOrder:3,
				resizable:false,
				sortable:true,					 
				cellTemplate:'<span ng-bind="::record.provGroupName"> </span>'
			},
			{ 
				columnId:'provName', 
				label:'Provider Name',
				layoutOrder:4,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span style="text-transform:capitalize" ng-bind="::record.provName"> </span>'
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
				columnId:'memberName', 
				label:'Member Name',
				layoutOrder:8,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span style="text-transform:capitalize" ng-bind="::record.memberName"> </span>' 
			},
			{ 
				columnId:'memberDOB', 
				label:'Member Date of Birth',
				layoutOrder:9,
				resizable:false, 
				sortOrder:0, 
				sortable:true,  
				dataType:'date',
				cellTemplate:"<span ng-bind='::record.memberDOB | date : \"MM-dd-yyyy\"'> </span>" 
			},
			{ 
				columnId:'memberGender', 
				label:'Gender',
				layoutOrder:10,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.memberGender"> </span>' 
			},
			{ 
				columnId:'chartId', 
				label:'Chart ID',
				layoutOrder:11,
				resizable:false, 
				sortOrder:0, 
				sortable:true,                
				cellTemplate:'<span ng-bind="::record.chartId"> </span>' 
			}
		],
		records : [],
		totalRecordsCount : 0,
		selectedRecords : [],
		onSelectAllRows : function(selectAll){
			var model = this
			var availableRecords = model.records;
			var selectedRecordIds = [];
			for (var i = 0; i < model.selectedRecords.length; i++)
				selectedRecordIds.push(model.selectedRecords[i].index);
			
			for(var row = 0 ; row < availableRecords.length ; row++) {
				var recordIndex = selectedRecordIds.indexOf(availableRecords[row]);
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
		},
		onRowSelect : function(event, record, selected) {
			var model = this
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
		},
		onChange : function(filterCondition){
			var that = this;
			staticDataService.query(filterCondition, that.originalRecords, function(result) {
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
	};
	
	$scope.showchartFileUploadWarningDialog = false;
	
	$scope.viewAppointmentModel.handleBulkUpload = function() {
		var rootData = window.parent;
		$scope.urlParams = 
			 "uploadSource="
			+ $scope.dataModel.retrvlPrefSelect
			+ "&gcmGroupKey="
			+ $scope.dataModel.currentGroupKey
			if(rootData.bulkUploadLookup && (!rootData.bulkUploadLookup.closed)){
				$scope.showchartFileUploadWarningDialog = true;
				}
			else{
			rootData.bulkUploadLookup = window.open("/gcm-app-services/com/optum/comm/retrieval/scheduling/views/bulkupload.html?"+$scope.urlParams,
				"bulkUploadLookup", "width=" + (screen.availWidth - 10)
						+ ",height="+ (screen.availHeight - 30)	+ ",resizable=yes,scrollbars=yes");
			rootData.bulkUploadLookup.moveTo(0, 0);
				}
	}
	
/*	$scope.showchartFileUploadWarningOK = function(){
		var rootData = window.parent;
		$scope.showchartFileUploadWarningDialog = !$scope.showchartFileUploadWarningDialog;
		rootData.bulkUploadLookup = window.open("/gcm-app-services/com/optum/comm/retrieval/scheduling/views/bulkupload.html?"+$scope.urlParams,
				"bulkUploadLookup", "width=" + (screen.availWidth - 10)
						+ ",height="+ (screen.availHeight - 30)	+ ",resizable=yes,scrollbars=yes");
		rootData.bulkUploadLookup.moveTo(0, 0);
	}*/
	
	$scope.showchartFileUploadWarning = function(){
		$scope.showchartFileUploadWarningDialog = !$scope.showchartFileUploadWarningDialog;
	}
	
	$scope.viewAppointmentModel.handleRefax = function(){
		var chartIdList = [];
		if ($scope.viewAppointmentModel.selectedRecords.length > 0) {
			for(var i =0; i < $scope.viewAppointmentModel.selectedRecords.length; i++)
			{	
				chartIdList.push($scope.viewAppointmentModel.selectedRecords[i].chartId);
			}
			var chartStatusUpdate = {
				chartIdList : chartIdList,
				requestedUserId : $scope.dataModel.loginUserId
			}
			$http.post('/gcm-app-services/scheduling/retrieval/refaxByChart',chartStatusUpdate).then(function(response) {
				if(response && response.data) {
					if(response.data.status == 'SUCCESS') {
						var successMessage = "Refax successful";
						$scope.dataModel.setMessage(successMessage, "success");
					}
				}
			}
			, function(error) {
				alert(JSON.stringify(error));
			});
		}
		else {
			var errorMessage = "Select the row(s) to Refax.";
			$scope.dataModel.setMessage(errorMessage, "error");
		}
	}
	
	$scope.viewAppointmentModel.handlePrint = function(){
		$http.post('/gcm-app-services/scheduling/retrieval/getFaxPacketByAppt?apptKey='+$scope.dataModel.selectedMyApptId
				, {}, {responseType:'arraybuffer'})
		.then(function(response) {
			if(response && response.data && response.data.byteLength != 0) {
				var ieEDGE = navigator.userAgent.match(/Edge/g);
	            var ie = navigator.userAgent.match(/.NET/g); // IE 11+
	            var oldIE = navigator.userAgent.match(/MSIE/g); 
	            var name = "file";
	            var blob = new window.Blob([response.data], { type: 'application/pdf' });
	            if (ie || oldIE || ieEDGE) {
	                var fileName = name+'.pdf';
	                window.navigator.msSaveOrOpenBlob(blob, fileName);
	            }
	            else {
	                var file = new Blob([ response.data ], {
	                    type : 'application/pdf'
	                });
	                var fileURL = URL.createObjectURL(file);
	                var a         = document.createElement('a');
	                a.href        = fileURL; 
	                a.target      = '_blank';
	                a.download    = name+'.pdf';
	                document.body.appendChild(a);
	                a.click();
	            }
//				var file = new Blob([response.data], {type: 'application/pdf'});
//			    var fileURL = URL.createObjectURL(file);
//			    window.open(fileURL);
			}
			else {
				var errorMessage = "To print the member packet, first click the 'Fax/Refax' icon to generate the fax packet.  Once the fax is generated, the member packet will be available to print.";
				$scope.dataModel.setMessage(errorMessage, "error");
			}
		}, function(error) {
			alert(JSON.stringify(error));
		});
	}
	
	$scope.pendAppointment = function(){
		//$scope.dataModel.handlePendAppointMent();
		$scope.dataModel.pendReasonSelect = "";
		$scope.dataModel.addPendcomments = "";
		if(!$scope.dataModel.pendReasons || $scope.dataModel.pendReasons.length == 0){
			$scope.dataModel.readPendReasons();
		}
		$scope.dataModel.viewAppointmentModel=$scope.viewAppointmentModel;
		$scope.dataModel.showPendApptDialog = !$scope.dataModel.showPendApptDialog;
	}
	
	$scope.handleFinishClick = function(){
		$scope.dataModel.handleFinishClick();
	}
	
	$scope.handleCancelClick = function(){
		$scope.dataModel.handleCancelClick();
	}
	
	$scope.dataModel.readChartMemberDetails = function(){
			
		$scope.dataModel.SchedulingSearchFilter.appointmentId = $scope.dataModel.selectedMyApptId;
		var retDataSearchFilter = {
									"assignInventorySearchFilter": [],
									"schedulingSearchFilter" : $scope.dataModel.SchedulingSearchFilter
								  };
		
		$scope.dataModel.retrievalRecords = [];
		$scope.dataModel.includedRtrvlRecords = [];
		$scope.dataModel.chartId = [];
		if(!$scope.dataModel.retrievalInfoModel){
			$scope.dataModel.retrievalInfoModel = {};
		}
		$http.post('/gcm-app-services/scheduling/workflow/getChartMemberDetailsByApptId', retDataSearchFilter).then(function(response) {
			if(response && response.data && response.data.result && response.data.result.length > 0){
				var viewAppointmentRecords = response.data.result;
				//$scope.dataModel.chartId = response.data.result.chartId;
				angular.forEach(viewAppointmentRecords, function(obj, idx) {
					obj.index = idx;
					$scope.dataModel.chartId.push(viewAppointmentRecords[idx]["chartId"]);
				});
				if ($scope.dataModel.selectedApptType != 'FAX')
					$scope.viewAppointmentModel.columns[1].showColumnInTable = true;
				$scope.viewAppointmentModel.records = viewAppointmentRecords.slice();
				$scope.viewAppointmentModel.originalRecords = viewAppointmentRecords.slice();
				$scope.viewAppointmentModel.totalRecordsCount = viewAppointmentRecords.length;
				var obj = {
						recordsPerPage : $scope.viewAppointmentModel.pagination.recordsPerPage,
						pageNumber : $scope.viewAppointmentModel.pagination.currentPageNumber,
						sortBy : [$scope.viewAppointmentModel.columns[2].columnId],
						sortOrder : [1]
				};
				$scope.viewAppointmentModel.onChange(obj);
			}else{
				$scope.viewAppointmentModel.records = [];
				$scope.viewAppointmentModel.totalRecordsCount = 0;
			}
		}, function(error) {
			alert(JSON.stringify(error));
		});
	}
	$scope.dataModel.readChartMemberDetails();
	
	$scope.viewAppointmentModel.uploadClick = function(record){
		$("#chartFileId").val('');
		$scope.chartId = record.chartId;
		$scope.showChartFileUploadDialog = true;
		$scope.showMultipleChartFileUploadDialog = true;
		$scope.messageModel.showUploadError = false;
		$scope.messageModel.showFileSizeError = false;
		$scope.messageModel.showChartFileUploadButton = false;
		$scope.chartFile = '';
		//readChartMemberDetails();
	}
	
	$scope.ctrlFn = function (arg) {
    	$timeout(function(){
    		$scope.chartFile = arg;
        });
    }
	
	$scope.uploadChartFile = function() {
		$scope.showLoadingDialog=true;
		$('#uitkPopupId1_headerId').css({
			display: 'none'
		});
		$('#uitkPopupId1_closeLink').css({
		    display: 'none'
		});
		$('#uitkPopupId1').css({'border-width':'unset','border-style' : 'none'});
		//FormData, object of key/value pair for form fields and values
	    var fileFormData = new FormData();
	    fileFormData.append('metadata', new Blob([JSON.stringify({
	        "uploadSource": $scope.dataModel.retrvlPrefSelect,
	        "loginUserId" : $scope.dataModel.loginUserId,
	        "gcmGroupKey" : $scope.dataModel.currentGroupKey
	    })], {
	        type: "application/json"
	    }));
	    fileFormData.append('file', $scope.chartFile);
		$http.post('/gcm-app-services/scheduling/retrieval/chartUpload', fileFormData,{ 
			transformRequest: angular.identity, 
			headers: {'Content-Type': undefined}
		}).then(function(response) {
			if(response && response.data) {
				
				if(response.data.status == 'SUCCESS') {
					var successMessage = "Chart file upload successful";
					$scope.dataModel.setMessage(successMessage, "success");
				}
				if(response.data.errorMessage == 'CHART_ALREADY_AVAILABLE') {
					var errorMessage = "Chart file already available";
					$scope.dataModel.setMessage(errorMessage, "error");
				}
				if (response.data.errorMessage == 'FILE_INFECTED') {
					var errorMessage = "File is virus infected.  Upload of this file is not permitted.";
					$scope.dataModel.setMessage(errorMessage, "error");
				}
				
				$scope.showLoadingDialog=false;
		        $scope.showChartFileUploadDialog = false;
		        $scope.showMultipleChartFileUploadDialog = false;
		        $scope.showChartFileUploadButton = false;
		        $scope.messageModel.showUploadError = false;
		        $scope.messageModel.showFileSizeError = false;
		        $scope.chartFile = '';
		        $scope.dataModel.readChartMemberDetails();
			}
		}, function(error) {
			alert(JSON.stringify(error));
		});
	}
});




/**
 * For Chart file upload - Creating this custom directive for two way binding 
 * in case of a file upload since ngModel directive does not provide this
 */
schedulerworklistmodule.directive('chartFileModel', function ($parse, $timeout, dataObject) {
	
    return {
        restrict: 'EA', //the directive can be used as an attribute only
        scope: {
            fromDirectiveFn: '=method',
        },
        /*
         link is a function that defines functionality of directive
         scope: scope associated with the element
         element: element on which this directive used
         attrs: key value pair of element attributes
         */
        link: function (scope, element, attrs) {
        	var showUploadError = false;
        	var showFileSizeError = false;
        	var showChartFileUploadButton = false;
            var model = $parse(attrs.chartFileModel),
                modelSetter = model.assign; //define a setter for demoFileModel

            //Bind change event on the element
            element.bind('change', function () {
                //Call apply on scope, it checks for value changes and reflect them on UI
                scope.$apply(function () {
                    //set the model value
                	if(element[0].files[0].type == "application/pdf"){
	                    if(element[0].files[0].size > 209715200){
	                    	showUploadError = false;
	                    	showFileSizeError = true;
	                    	showChartFileUploadButton = false;
	                    }
	                    else{
	                    	scope.fromDirectiveFn(element[0].files[0]);
	                    	modelSetter(scope, element[0].files[0]);
	                    	showUploadError = false;
	                    	showFileSizeError = false;
	                    	showChartFileUploadButton = true;
	                    }
                    }
                    else {
                    	showUploadError = true;
                    	showFileSizeError = false;
                    	showChartFileUploadButton = false;
                    }
                });
                $timeout(function(){
                	dataObject.showUploadError = showUploadError;
                	dataObject.showFileSizeError = showFileSizeError;
                	dataObject.showChartFileUploadButton = showChartFileUploadButton;
                });
            });
        }
    };
});

  
 