utilitymodule.controller('commentControl',function($scope, $http, $compile, $filter, $timeout, lookupService, staticDataService,
		errorMessageModel, dataServiceModel){
	$scope.dataModel = dataServiceModel;
	$scope.dataModel.addcommentsChart= '';

	$scope.readApptComments = function () {
		$scope.apptCommentsList = [];
		$http.post('/gcm-app-services/scheduling/workflow/getApptComments', $scope.dataModel.apptKey).then(function (response) {
			if (response && response.data && response.data.result) {
				$scope.apptCommentsList = response.data.result;
			}
		}, function (error) {
			var message = JSON.stringify(error);
			$scope.dataModel.setMessage(message, "error");
		});

	}
	$scope.readApptComments();

	$scope.addComments = $scope.dataModel.addComments = function(){
		if ($scope.dataModel.addcommentsChart!= "") {
			var appointmentComments = {
				apptKey : $scope.dataModel.selectedMyApptId,
				apptComments : $scope.dataModel.addcommentsChart,
				//apptIteration:  
				createUserId : $scope.dataModel.loginUserId
			}
			$http.post('/gcm-app-services/scheduling/workflow/insertApptComments', appointmentComments).then(function(response) {
				$scope.dataModel.addcommentsChart = "";
				var message = "Comments Added to appointment Successfully";
				$scope.readApptComments();
				//$scope.dataModel.setMessage(message, "success");
			}, function(error) {
				var message = JSON.stringify(error);
				$scope.dataModel.setMessage(message, "error");
			});
		}
		else {
			var message = "Comments Required";
			$scope.dataModel.setMessage(message, "error");
		}
	}
	$scope.saveComments = function() {
		$scope.addComments();		
	}

});

utilitymodule.controller('viewAppCtrl',function($scope, $http, $compile, $filter, $timeout, lookupService, staticDataService,
		errorMessageModel, dataServiceModel){
	$scope.dataModel = dataServiceModel;
	$scope.messageModel = dataServiceModel;
	$scope.viewAppointmentModel = {
		apptType : $scope.dataModel.selectedApptType,
		links : [
					'<a href="" ng-click="model.handleRefax()"><uitk:icon-font icon="cux-icon-refresh"></uitk:icon-font> Fax/Refax</a>',
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
		//$scope.dataModel.handleCancelClick();
		$scope.dataModel.showViewAppt = false;
		$scope.dataModel.showPend = false;
	}
	
	
	$scope.dataModel.readChartMemberDetails = function(){
		
		var assignInventorySearchFilterArray = [];		
		$scope.dataModel.SchedulingSearchFilter = {
				busSegment : "",
				projectKey : "",
				clientKey : "",
				hpKey : "",
				hpProduct : "",
				isAssigned : '1',
				providerId :"",
				provGroupName : "",
				provLastName : "",
				provFirstName : "",
				appointmentStatus : "",
				faxStatus : "",
				busFuncDtlKey : "",
				appointmentId : ""
					
					
		};
		$scope.dataModel.SchedulingSearchFilter.appointmentId = $scope.dataModel.selectedMyApptId;
		$scope.dataModel.SchedulingSearchFilter.fromUserKey = $scope.dataModel.gcmUserKey;
		$scope.dataModel.SchedulingSearchFilter.loginUserKey = $scope.dataModel.gcmUserKey;
		//var busFuncDtlKey = $scope.dataModel.busFuncDtlKey;
		if ($scope.dataModel.apptType == "FAX") {
			$scope.dataModel.SchedulingSearchFilter.busFuncDtlKey = 1;
		} else if ($scope.dataModel.apptType == "ONSITE") {
			$scope.dataModel.SchedulingSearchFilter.busFuncDtlKey = 2;
		} else if ($scope.dataModel.apptType == "EMR") {
			$scope.dataModel.SchedulingSearchFilter.busFuncDtlKey = 3;
		}
		
		$scope.dataModel.SchedulingSearchFilter.vendorKey =	$scope.dataModel.vendorKey;
	
		var retDataSearchFilter = {
									"assignInventorySearchFilter": [],
									"schedulingSearchFilter" : $scope.dataModel.SchedulingSearchFilter
									}
		
		$scope.dataModel.retrievalRecords = [];
		$scope.dataModel.includedRtrvlRecords = [];
		if(!$scope.dataModel.retrievalInfoModel){
			$scope.dataModel.retrievalInfoModel = {};
		}
		$http.post('/gcm-app-services/scheduling/workflow/getChartMemberDetailsByApptId', retDataSearchFilter).then(function(response) {
			if(response && response.data && response.data.result && response.data.result.length > 0){
				var viewAppointmentRecords = response.data.result;
				angular.forEach(viewAppointmentRecords, function(obj, idx) {
					obj.index = idx;
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
	

})

utilitymodule.controller('faxStatusCntrl', function($scope, $compile, dataServiceModel, $http) {
	$scope.dataModel = 	dataServiceModel;
	
	$scope.faxStatusTableModel = {
		columns : [ {
			columnId : 'fax',
			label : 'Fax',
			resizable : false,
			style : 'width: 15%;',
			cellTemplate : '<a href ng-model="model.documentID" id="{{record.documentID}}" ng-click="model.getRightFaxDocument(record.documentID)"><uitk:icon-font icon="cux-icon-document" icon-text=""></uitk:icon-font></a>'
		}, {
			columnId : 'faxDate',
			label : 'Date',
			resizable : false,
			style : 'width: 15%;',
			sortOrder : 0,
			sortable : true,
			cellTemplate : '<span ng-bind="::record.faxDateTime"> </span>'
		},
		{
			columnId : 'faxStatus',
			label : 'Status',
			resizable : false,
			style : 'width: 30%;',
			sortOrder : 0,
			sortable : true,
			cellTemplate : '<span ng-bind="::record.faxStatus"> </span>'
		} ],
		records : [],
		totalRecordsCount : 0,
		getRightFaxDocument : function(documentID){
			$scope.dataModel.getRightFaxDocument(documentID);
		}	
	}
	
	$scope.dataModel.getRightFaxDocument = function(documentID){
		$http.post('/gcm-app-services/scheduling/retrieval/getFaxPacketByDocID?documentID='+documentID
				, {}, {responseType:'arraybuffer'})
		.then(function(response) {
			if(response && response.data) {
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

			}
			else {
				var errorMessage = "Fax packet not available for selected appointment";
				$scope.dataModel.setMessage(errorMessage, "error");
			}
		}, function(error) {
			alert(JSON.stringify(error));
		});	
	}
	
	var requestParam = {
			apptKey : $scope.dataModel.selectedMyApptId
	}
	$http.post('/gcm-app-services/scheduling/retrieval/getApptFaxHistory', requestParam).then(function(response) {
			if (response && response.data && response.data.result) {
				$scope.faxStatusTableModel.records  = response.data.result;
				$scope.faxStatusTableModel.totalRecordsCount = $scope.faxStatusTableModel.records.length;				
			}
			}, function(error) {
				var message = JSON.stringify(error);
				$scope.dataModel.setMessage(message, "error");
			});		
});




