var codingUImodule = angular.module('codingUIApp', ['uitk.component.uitkPanel','uitk.component.uitkDynamicTable',
                                                    'uitk.component.uitkCalendar','uitk.component.uitkLabel','uitk.component.uitkTextField',
                                                    'uitk.component.uitkButton','uitk.component.uitkDialog','uitk.component.uitkTextarea','uitk.component.uitkMultiSelect','ngSanitize']);

codingUImodule.controller("codingUIController", function($scope, $http, $timeout, lookupService, errorMessageModel, dataServiceModel) {
	
		var CordysRoot = window.parent;
	
		$scope.dataModel = dataServiceModel;
		CordysRoot.rootData.dataModel = dataServiceModel;
		
		
		var userObj = optumUI.getUser();
		$scope.dataModel.loginUserKey = userObj.getLoggedInUserKey();
		$scope.dataModel.loginUserId = optumUI.getAuthUser();
		$scope.dataModel.vendorKey = userObj.getDefaultVendorKey();
		$scope.dataModel.currentGroupKey =  userObj.getCurrentGroupKey();
		$scope.dataModel.currentGroupCode = userObj.currentGroupCode;
		var userGroups = userObj.getUserGroups();
		$scope.dataModel.isInternalGroup = false;
		
		if(userGroups && userGroups.length > 0){
			for(var i = 0; i < userGroups.length; i++) {
				if(userGroups[i].groupCode == userObj.currentGroupCode && userGroups[i].isInternalGroup == 'Y'){
					$scope.dataModel.isInternalGroup = true;
				}
			}
		}
		
		$scope.dataModel.noDosMeetsCriteria = 'N';
		
		$scope.dataModel.chartDetailsObj = {};
		
		$scope.showCodingInstructions = false;	
		$scope.showProgramDirections = false;
		$scope.showCodingUILoadingDialog = false;
		$scope.dataModel = dataServiceModel;
		
		$scope.dataModel.chartInputDetails = {
				projContentKey : dataServiceModel.selectedChart.projContentKey,
				busFuncVenKey : dataServiceModel.selectedChart.busFuncVenKey,
				busFuncKey : '2',
				busFuncStatus : dataServiceModel.selectedChart.chartStatus
		};
		 
		 $scope.toggleCIDialog = function(){
				$scope.showCodingInstructions = !$scope.showCodingInstructions;			 
		 }	 
		 
		 $scope.togglePDDialog = function(){
				$scope.showProgramDirections  = !$scope.showProgramDirections;			 
		 }
		 
		 $scope.openImage = function(){
			 var viewerUrl = "/gcm-image-viewer/view/pdfviewer.html";
			 if ((CordysRoot.winLookup) && (!CordysRoot.winLookup.closed)){
				 CordysRoot.winLookup = window.open(viewerUrl,"viewer","width=" + (screen.availWidth-10) + ",height=" + (screen.availHeight-30) + ",resizable=yes" );
			 }
			 CordysRoot.winLookup = window.open(viewerUrl + "?imgDetails=" + getViewerParam('CUSTOM'),"viewer","width=" + (screen.availWidth-10) + ",height=" + (screen.availHeight-30) + ",resizable=yes");
			 CordysRoot.winLookup.moveTo(0,0);
		};
		 
		function getViewerParam(type){
			var dt = new Date();
			var imgDet = {};
			imgDet.documentId = $scope.dataModel.chartDetailsObj.chartId;
			imgDet.editable = !$scope.dataModel.isReadonly;
			imgDet.busFuncVenKey = $scope.dataModel.chartDetailsObj.busFuncVenKey;
			imgDet.busFuncKey = $scope.dataModel.chartInputDetails.busFuncKey;
			imgDet.appName = 'MRM';
			imgDet.viewerType=type;
			imgDet.roleCode=rootData.currentRole;
			return $.base64.encode(JSON.stringify(imgDet));
		} 
		 
		$scope.chartInputInfo = {
				 projContentKey : dataServiceModel.selectedChart.projContentKey,
				 busFuncVenKey	: dataServiceModel.selectedChart.busFuncVenKey,
				 projKey		: $scope.dataModel.chartDetailsObj.projKey,
				 busFuncKey		: 2,
				 toBusFuncStatus: "INPROGRESS",
				 requestedUserId: $scope.dataModel.loginUserId,
				 userKey		: $scope.dataModel.loginUserKey,
				 reasonCode		: "",
				 groupKey 		: $scope.dataModel.currentGroupKey,
				 eventType		: 'OPEN'
		 };
		 
		 $scope.dataModel.updataChartStatus = function(closeCodingUI){
			 $scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
			 $scope.chartInputInfo.currentSessionId = dataServiceModel.currentSessionId;
			 $scope.chartInputInfo.worklistActivityKey = dataServiceModel.worklistActivityKey;
				$scope.chartInputInfo.barcode = dataServiceModel.chartDetailsObj.chartId;
				$scope.chartInputInfo.dosYear = dataServiceModel.chartDetailsObj.chartReviewYear;
				$scope.chartInputInfo.vendorKey = dataServiceModel.vendorKey;
			 $http.post('/gcm-app-services/coding/workflow/updateChartStatus',$scope.chartInputInfo).then(function(response) {
				 $scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
				/* if (response && response.data && response.data.result){
					//alert("Chart Status Updated");
				}
				if(closeCodingUI){
					$scope.closeImage();
					lookupService.url = 'codingworklisttabs.html';
				}
				//means it's called from either Accept or Escalate so clear opened work item.
				if (  closeCodingUI && response.data && response.data.status != 'ERROR'){
					CordysRoot.rootData.dataModel = null;
				}*/
				
				if (response.data && response.data.status == 'ERROR'){
					 $scope.dataModel.setErrorMessage(response.data.errorMessage);
				}
				else if(closeCodingUI){
					//means it's called from either Accept or Escalate so clear opened work item.
					CordysRoot.rootData.dataModel = null;
					$scope.closeImage();
					lookupService.url = 'codingworklisttabs.html';
				}
			 },function(error) {
				 $scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
				 $scope.dataModel.setErrorMessage("Error: Failed to Update Chart Status");
			 });
		 }
		 
		 $http.post('/gcm-app-services/coding/workflow/getChartDetails',$scope.dataModel.chartInputDetails).then(function(response) {
			if (response && response.data && response.data.result){
				$scope.dataModel.chartDetailsObj = response.data.result;
				dataServiceModel.currentSessionId =  response.data.result.currentSessionId;
				dataServiceModel.worklistActivityKey = response.data.result.workId;
				$scope.chartInputInfo.worklistActivityKey = response.data.result.workId;
				$scope.dataModel.noDosMeetsCriteria = $scope.dataModel.chartDetailsObj.contentEoKey ? 'Y' : 'N';
				$scope.chartInputInfo.projKey = $scope.dataModel.chartDetailsObj.projKey;
				if($scope.dataModel.chartDetailsObj.chartStatus == 'ASSIGNED'){
					if(dataServiceModel.selectedChart && ! dataServiceModel.selectedChart.busFuncKey){
						 dataServiceModel.selectedChart.busFuncKey = $scope.dataModel.chartInputDetails.busFuncKey;
					 }
					$scope.dataModel.updataChartStatus(false);
				}else{
					$scope.logCoderProdEvent('OPEN');
				}
				$scope.openImage();
				$scope.dataModel.readEncounters();
			}
		 });
		 if(rootData.currentRole == 'SUP'){
			 $scope.dataModel.history =  $scope.history = {
					 codingUIHistoryModel : {
						    id : 'codingUIHistoryPanel',
							title:'History',
							templateUrl: '../coding/views/historytemplate.htm',
							open : false,
			                panelWidth : '98%',
							panelHeight: 'auto',
							collapsible: true        
					},		 
				 historyTableModel : {
							columns :  [
							{
								columnId:'actionId',
								label:'Action',
								layoutOrder:1,
								cellTemplate:'<span ng-bind="::record.action"> </span>'
								
							},
							{
								columnId:'userId',
								label:'User',
								layoutOrder:2,
								cellTemplate:'<span ng-bind="::record.userName"> </span>'
							},
							{
								columnId:'dateId',
								label:'Date',
								layoutOrder:3,	
								cellTemplate:'<span ng-bind="::record.actionDate"> </span>'				
							}
							],
							records : [],
							totalRecordsCount : 0
						 }				 
		 };
			 
			
		 }
		 else {
			 $scope.dataModel.history =  $scope.history = {
					 codingUIHistoryModel : {
						    id : 'codingUIHistoryPanel',
							title:'History',
							templateUrl: '../../coding/views/historytemplate.htm',
							open : false,
			                panelWidth : '98%',
							panelHeight: 'auto',
							collapsible: true        
					},		 
				 historyTableModel : {
							columns :  [
							{
								columnId:'actionId',
								label:'Action',
								layoutOrder:1,
								cellTemplate:'<span ng-bind="::record.action"> </span>'
								
							},
							{
								columnId:'userId',
								label:'User',
								layoutOrder:2,
								cellTemplate:'<span ng-bind="::record.userName"> </span>'
							},
							{
								columnId:'dateId',
								label:'Date',
								layoutOrder:3,	
								cellTemplate:'<span ng-bind="::record.actionDate"> </span>'				
							}
							],
							records : [],
							totalRecordsCount : 0
						 }				 
			 	};			
		 }
		 
		$scope.dataModel.codingErrorMessageModel = {
					id : 'retrievalError',
			        messageType : 'error',
			        content : '',
			        visible : false,
			        ariaAttributes : true,
			        headingLevel : '2'
		}
		$scope.dataModel.codingSuccessMessageModel = {
			id : 'success-message',
			messageType : 'success',
			content : '',
			visible : false,
			messageRole : 'alertdialog',
			ariaAttributes : true,
			headingLevel : '2',
			messageVisibleTime : '5000'
		};
		
		$http.post('/gcm-app-services/coding/workflow/getChartHistory',$scope.dataModel.chartInputDetails.projContentKey).then(function(response) {
			if (response && response.data && response.data.result){
				$scope.history.historyTableModel.records = response.data.result;
				$scope.history.historyTableModel.totalRecordsCount = response.data.result.length;
			} 
		 },function(error) {
			 $scope.dataModel.setErrorMessage("Error:Failed to read Chart History");
		});
		
		//comments section
		if(rootData.currentRole == 'SUP'){
			$scope.dataModel.codingUICommentsModel =  $scope.codingUICommentsModel = {
					id : 'codingUICommentsPanel',
					title:'Comments',
					templateUrl: '../coding/views/commentstemplate.htm',
					open : false,
		            panelWidth : '98%',
					panelHeight: 'auto',
					collapsible: true
			};
		}else{
			$scope.dataModel.codingUICommentsModel =  $scope.codingUICommentsModel = {
					id : 'codingUICommentsPanel',
					title:'Comments',
					templateUrl: '../../coding/views/commentstemplate.htm',
					open : false,
		            panelWidth : '98%',
					panelHeight: 'auto',
					collapsible: true
			};
		}
		
		 
		$http.post('/gcm-app-services/coding/workflow/getChartComments',$scope.dataModel.chartInputDetails.projContentKey).then(function(response) {
			if (response && response.data.result){
				//$scope.comments.showCommentsTable = true;
				$scope.dataModel.comments = response.data.result;					
			} 
		 },function(error) {
			 $scope.dataModel.setErrorMessage("Error:Failed to read Chart Comments");
		});
		
		//saved encounters section		 
				
		 $scope.dataModel.encounters = $scope.encounters = {
					showICDCodeTable : false,
					isRPNotListed : false,
					showSavedEncountersTable : false,
					showRPDetails : false,
					validatePageNumber : function(){},
				    codingUIEncounters : {
					    id : 'codingUIEncountersPanel',
						title:'Add Encounters',
						templateUrl: '../../coding/views/encounterstemplate.htm',
						open : true,
					    panelWidth : '98%',
						panelHeight: '40%',
						collapsible: false,
						style: 'overflow-y:visible !important'
				    }			    
		}
		 if(rootData.currentRole == 'SUP'){
			 $scope.dataModel.viewEncounters =  $scope.viewEncounters = {
					 	id : 'codingUIViewEncountersPanel',
						title:'View Encounter',
						templateUrl: '../coding/views/encounterstemplate.htm',
						open : true,
						panelWidth : '98%',
						panelHeight: '40%',
						collapsible: false,
						style: 'overflow-y:visible !important'
			 };
		 }else{
			 $scope.dataModel.viewEncounters =  $scope.viewEncounters = {
					 	id : 'codingUIViewEncountersPanel',
						title:'View Encounter',
						templateUrl: '../../coding/views/encounterstemplate.htm',
						open : true,
						panelWidth : '98%',
						panelHeight: '40%',
						collapsible: false,
						style: 'overflow-y:visible !important' 
					 
			 };
		 }
	
		 
		$scope.dataModel.fromDateModel = {
				textFieldClassName : 'uitk-calendar-custom-class',
				enableValidation : true,
				requiredMessage : "From Date is a required field",
				invalidFormatMessage : "Enter valid From Date in MMDDYYYY format"
		};
		$scope.dataModel.throughDateModel = {
				textFieldClassName : 'uitk-calendar-custom-class',
				enableValidation : true,
				requiredMessage : "Through Date is a required field",
				invalidFormatMessage : "Enter valid Through Date in MMDDYYYY format"				
		};
		 
		 $scope.dataModel.readEncounters = function(){
			 $scope.encounterInputInfo = {
					 projContentKey	: $scope.dataModel.chartInputDetails.projContentKey,
					 busFuncVenKey	: $scope.dataModel.chartInputDetails.busFuncVenKey,
					 projKey		: $scope.dataModel.chartDetailsObj.projKey,
					 busFuncKey		: $scope.dataModel.chartInputDetails.busFuncKey,
					 encounterKey	: ""
			 }
			 $scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
			 $http.post('/gcm-app-services/coding/encounter/getEncounters', $scope.encounterInputInfo).then(function(response) {
				 $scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
					 if(response && response.data && response.data.result && response.data.result.length > 0){
						 var savedEncounters = response.data.result;
						 for(var i = 0; i < savedEncounters.length; i++){
							 var record = savedEncounters[i];
							 record.dateOfService = record.dosFromDt + " - "+ record.dosThruDt;
							 if($scope.dataModel.encLevelEoCodeList){
								 record.encEoDesc = $scope.dataModel.encLevelEoCodeList[record.eoKey] ? $scope.dataModel.encLevelEoCodeList[record.eoKey].gcmEoDesc : '';
							 }else{
								 record.encEoDesc = '';
							 }
							 record.provName = $scope.dataModel.chartDetailsObj.provName;
						 }
						 $scope.dataModel.savedEncountersTableModel.totalRecordsCount = savedEncounters.length;
						 $scope.dataModel.savedEncountersTableModel.records = savedEncounters;
					 }
					 else{
						 $scope.dataModel.savedEncountersTableModel.totalRecordsCount = 0;
						 $scope.dataModel.savedEncountersTableModel.records = [];
					 }
				}, function(error) {
					 $scope.dataModel.setErrorMessage("Error:Failed to read encounters");
				});
		 }	 
		 
		 $scope.dataModel.savedEncountersTableModel = {
					pagination : {
						currentPageNumber : 1,
						paginationWindow : 5,
						recordsPerPage : 25,
						recordsPerPageChoices : [10, 15, 25],
						showPaginationFooter : false,
						totalRecordsCount : true
					},			
					columns :  [
					{
						columnId:'actionsId',
						label:'Actions',
						layoutOrder:1,
						cellTemplate:'<span ng-if="(!model.isReadonly && !model.isSupervisorUI)"><uitk:icon-font icon="cux-icon-edit cux-icon-action" hidden-text="Edit Row and Press Submit button" icon-text="Edit" style="display:table-cell" uitk-navigable ng-click="model.editEncounter(record)"> Edit </uitk:icon-font> <uitk:icon-font icon="cux-icon-delete cux-icon-action" hidden-text="Delete Record" icon-text="Delete" style="display:table-cell" uitk-navigable ng-click="model.deleteEncounter(record)">Delete</uitk:icon-font></span><span ng-if="model.isReadonly || model.isSupervisorUI"><uitk:icon-font icon="cux-icon-view cux-icon-action" hidden-text="View DxCodes" icon-text="View" style="display:table-cell" uitk-navigable ng-click="model.showEncounterDx(record)">View</uitk:icon-font></span>',
						resizable: false,	
						style: 'width:15%'
					},
					{
						columnId:'dateOfServiceId',
						label:'Date of Service',
						layoutOrder:2,
						cellTemplate:'<span ng-bind="::record.dateOfService"></span>',
						resizable: false,	
						style: 'width:30%'
					},
					{
						columnId:'pageNumberId',
						label:'Page Number',
						layoutOrder:3,	
						cellTemplate:'<span ng-bind="::record.pageNumber"> </span>',
						resizable: false,	
						style: 'width:10%'
					},
					{
						columnId:'renderingProviderId',
						label:'Rendering Provider',
						layoutOrder:4,	
						cellTemplate:'<span ng-if="record.retrievalProvFlag == \'Y\'" ng-bind="::record.provName"></span> <a href ng-click="model.showDetails(record)" ng-if="record.retrievalProvFlag != \'Y\'" style="text-decoration: underline;">Other</a>',
						resizable: false,	
						style: 'width:20%'
					},
					{
						columnId:'eoCodeId',
						label:'EO Code',
						layoutOrder:4,	
						cellTemplate:'<a ng-click="model.openWindow(record)"><span>view</span></a>',
						resizable: false,	
						style: 'width:25%'
					}
					],
					records : [],
					totalRecordsCount : 0,
					showDetails : function(record){
						$scope.selectedEnc = record;
						$scope.dataModel.encounters.showRPDetails = !$scope.dataModel.encounters.showRPDetails;
					},
					editEncounter : function(record){
						$scope.dataModel.editEncounter(record, false);
					},
					deleteEncounter : function(record){
						$scope.deleteEncounerRecord = record;
						$scope.showConfirmDeleteEncounter = !$scope.showConfirmDeleteEncounter;
						//$scope.dataModel.deleteEncounter(record);
					},
					showEncounterDx : function(record){						
						$scope.dataModel.showEncounterSection = true;
						$scope.dataModel.fromDateModel.disabled = $scope.dataModel.isReadonly || $scope.dataModel.isSupervisorUI;
						$scope.dataModel.throughDateModel.disabled = $scope.dataModel.isReadonly || $scope.dataModel.isSupervisorUI;
						$scope.dataModel.editEncounter(record, true);
					}
					
				 }
		 $scope.dataModel.showEncounterSection = false;
		 $scope.dataModel.savedEncountersTableModel.isReadonly = $scope.dataModel.isReadonly;
		 $scope.dataModel.savedEncountersTableModel.isSupervisorUI = $scope.dataModel.isSupervisorUI;
		 $scope.dataModel.encEoDescValue='None selected';
		 $scope.showencEoDesc = false;
		 $scope.dataModel.savedEncountersTableModel.openWindow = function(record){
			 $scope.showencEoDesc = true;
			 $scope.dataModel.encEoDescValue = [];
			 if(record.eoKeyList.length > 0){
				 angular.forEach(record.eoKeyList, function(value, key){
					var gcmEoDesc = $scope.dataModel.encLevelEoCodeList[value] ? $scope.dataModel.encLevelEoCodeList[value].gcmEoDesc : '';
					$scope.dataModel.encEoDescValue.push(gcmEoDesc);
				});
			 } else {
				 $scope.dataModel.encEoDescValue.push('None selected');
			 }
		 }
		 $scope.toggleEncEoDesc = function(){
			 $scope.showencEoDesc = false;
		 }
		 $scope.toggleRpDetailsDialog = function(){
			$scope.dataModel.encounters.showRPDetails = !$scope.dataModel.encounters.showRPDetails;
		 }
		 
		 $scope.dataModel.deleteEncounter = function(record){
			 $scope.encounterInputInfo = {
					 projContentKey	: $scope.dataModel.chartInputDetails.projContentKey,
					 busFuncVenKey	: $scope.dataModel.chartInputDetails.busFuncVenKey,
					 projKey		: $scope.dataModel.chartDetailsObj.projKey,
					 busFuncKey		: $scope.dataModel.chartInputDetails.busFuncKey,
					 encounterKey	: record.encounterKey,
					 userKey		: $scope.dataModel.loginUserKey
			 }
			$scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;	
			$http.post('/gcm-app-services/coding/encounter/deleteEncounter', $scope.encounterInputInfo).then(function(response) {
				$scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
				$scope.showConfirmDeleteEncounter = !$scope.showConfirmDeleteEncounter;
				$scope.dataModel.setSuccessMessage("Encounter Deleted Successfully.");
				$scope.dataModel.readEncounters();
				$scope.dataModel.clearEncounterSection();
			}, function(error) {
				 $scope.dataModel.setErrorMessage("Error:Error occured while deleting encounter");
			});
		 }
		 
		 $scope.showEscalateDialog = false;
		 $scope.escalateReasonDropdownList = [
			{
				label: 'Select',
				value: ''
			},			 
			{
				label: 'Corrupted Image',
				value: 'GCM13'
			},
			{
				label: 'Incorrect Member',
				value: 'GCM8'
			},
			{
				label: 'Multiple Member',
				value: 'GCM9'
			},
			{
				label: 'Other/unassigned',
				value: 'GCM10'
			}			
		 ];
		 
		 $scope.escalateReason = $scope.escalateReasonDropdownList[0];
		 
		 /*$scope.dataModel.noDosMeetsCriteriaChange = function(){
			 if($scope.dataModel.noDosMeetsCriteria == 'Y'){
				 $scope.dataModel.noDosMeetsCriteria == 'N';
				 $scope.dataModel.setErrorMessage("Save or Cancel encounter to check ");
				 return;
			 }
		 }*/
		 
		 $scope.dataModel.acceptWorkItem = function(){
			 if($scope.dataModel.savedEncountersTableModel.totalRecordsCount > 0 || $scope.dataModel.noDosMeetsCriteria == 'Y'){
				 $scope.chartInputInfo = {
						 projContentKey 	: dataServiceModel.selectedChart.projContentKey,
						 busFuncVenKey		: dataServiceModel.selectedChart.busFuncVenKey,
						 projKey			: $scope.dataModel.chartDetailsObj.projKey,
						 busFuncKey			: 2,
						 toBusFuncStatus	: "COMPLETED",
						 requestedUserId	: $scope.dataModel.loginUserId,
						 userKey			: $scope.dataModel.loginUserKey,
						 contentErrorCode	: $scope.dataModel.noDosMeetsCriteria == 'Y' ? 'D05' : '',
						 groupKey 		: $scope.dataModel.currentGroupKey,
						 eventType		: 'CLOSE'
				 };
				 $scope.chartInputInfo.toBusFuncStatus = "COMPLETED";
				 $scope.chartInputInfo.projKey = $scope.dataModel.chartDetailsObj.projKey;
				 
				 $scope.dataModel.updataChartStatus(true);
				 //lookupService.url = 'codingworklisttabs.html';
			 }else{
				 $scope.dataModel.setErrorMessage("Add encounter/Select No Dos Meets criteria to accept the work item");
			 }
			 $scope.showConfirmAcceptWorkItem = !$scope.showConfirmAcceptWorkItem;
		 }
		 
		 $scope.toggleCloseChartDialog = function(selectedActn, isCloseDialog){
			 $scope.selectedAction = selectedActn;
			 $scope.cofirmMessage = "All unsaved information for encounter will be lost.Do you want to continue?";
			 if($scope.dataModel.isEncounterModified() || isCloseDialog){
				 if(selectedActn == 'ACCEPT'){
					 $scope.cofirmMessage = "Are you sure you want to Accept? All unsaved data will be lost.";
				 }else if (selectedActn == 'EXIT' && rootData.currentRole=='SUP'){
					 $scope.exitCodingUI();				 
				 }else if (selectedActn == 'EXIT'){
					 $scope.cofirmMessage = "Are you sure you want to exit? All unsaved data will be lost.";
				 }else if (selectedActn == 'ESCALATE'){
					 $scope.cofirmMessage = "Are you sure you want to escalate? All unsaved data will be lost.";
				 }
				 $scope.showCloseChartDialog = !$scope.showCloseChartDialog;
			 }
			 else if(!$scope.dataModel.isEncounterModified()){
				 $scope.handleYesClick();
			 }
		 }
		 
		 $scope.handleYesClick = function(isCloseDialog){
			 if(isCloseDialog){
				 $scope.showCloseChartDialog = !$scope.showCloseChartDialog;
			 }
			 $scope.dataModel.clearEncounterSection()
			 if($scope.selectedAction == 'ACCEPT'){
				 $scope.acceptCodingData();
			 }else if ($scope.selectedAction == 'EXIT'){
				 $scope.exitCodingUI();
			 }else if ($scope.selectedAction == 'ESCALATE'){
				 $scope.toggleEscalateDialog();
			 }
		 }
		 
		 $scope.acceptCodingData = function(){
			/* if($scope.dataModel.isEncounterModified()){
				 $scope.dataModel.setErrorMessage("Save/Cancel unsaved data to accept the workitem.");
				 return;
			 }
			 if( $scope.dataModel.ICDTableModel.records.length > 0 && $scope.dataModel.ICDTableModel.records[0].icdCode){
				 $scope.dataModel.setErrorMessage("Save/Cancel unsaved data to accept the workitem.");
				 return;
			 }*/
			 if($scope.dataModel.savedEncountersTableModel.totalRecordsCount > 0 || $scope.dataModel.noDosMeetsCriteria == 'Y'){
				 $scope.showConfirmAcceptWorkItem = !$scope.showConfirmAcceptWorkItem;
			 }
			 else{
				 $scope.dataModel.setErrorMessage("Add encounter/Select No Dos Meets criteria to accept the work item");
			 }
		 }
		 
		 $scope.closeImage = function(){
			 if (CordysRoot.winLookup && !CordysRoot.winLookup.closed){
				 CordysRoot.winLookup = window.open("/gcm-image-viewer/view/pdfviewer.html","viewer","width=" + screen.width + ",height=" + screen.height);
			 }
		 }
		 
		 $scope.toggleEscalateDialog = function(){
			 $scope.showEscalateDialog  = !$scope.showEscalateDialog;
			 $scope.dataModel.commentsTextModel = '';
			 $scope.escalateReason = $scope.escalateReasonDropdownList[0];
		 }
		 
		 $scope.toggleReplyDialog = function(){
			 $scope.dataModel.replyComments = "";
			 $scope.dataModel.replyButtonText = "Reply and Exit";
			 $scope.showReplyDialog = !$scope.showReplyDialog;
		 }
		 
		 $scope.toggleAgreeDialog = function(){
			 //if($scope.dataModel.selectedChart.escalationReasonCode == 'GCM8'){
			 $scope.showConfirmAcceptWorkItem = !$scope.showConfirmAcceptWorkItem;
			 /*}else{
				 $scope.dataModel.agreeComments = "";
				 $scope.dataModel.agreeButtonText = "Agree and Exit";
				 $scope.showAgreeDialog = !$scope.showAgreeDialog; 
			 }*/
		 }
		 
		 $scope.toggleDisagreeDialog = function(){
			 //$scope.dataModel.disAgreeComments = "";
			 $scope.dataModel.disagreeComments = "";
			 $scope.dataModel.disagreeButtonText = "Disagree and Exit";
			 $scope.showDisagreeDialog = !$scope.showDisagreeDialog;
		 }
		 
		 $scope.escalateReasonChange = function(value){
			 $scope.escalateReason = value;
		 }
		 
		 $scope.escalateAndExit = function(){
			 if(!$scope.escalateReason.value){
				 $scope.dataModel.escalateDialogErrorMessageModel.content = '<span>Escalation reason is required</span>';
				 $scope.dataModel.escalateDialogErrorMessageModel.visible = true;
				 return;
			 }
			 if(!$scope.dataModel.commentsTextModel || $scope.dataModel.commentsTextModel.trim().length <= 0){
				 $scope.dataModel.escalateDialogErrorMessageModel.content = '<span>Escalation comment is required</span>';
				 $scope.dataModel.escalateDialogErrorMessageModel.visible = true;
				 return;
			 }
			 var todayDate = new Date();
			 $scope.chartInputInfo = {
					 projContentKey : dataServiceModel.selectedChart.projContentKey,
					 busFuncVenKey	: dataServiceModel.selectedChart.busFuncVenKey,
					 projKey		: $scope.dataModel.chartDetailsObj.projKey,
					 busFuncKey		: 2,
					 toBusFuncStatus: "ESCALATED",
					 requestedUserId: $scope.dataModel.loginUserId,
					 userKey		: $scope.dataModel.loginUserKey,
					 reasonCode		: $scope.escalateReason.value,
					 groupKey 		: $scope.dataModel.currentGroupKey,
					 eventType		: 'CLOSE',
					 chartComment	:{
						 busFuncVenKey	: $scope.dataModel.chartInputDetails.busFuncVenKey,
						 projContentKey : $scope.dataModel.chartInputDetails.projContentKey,
				    	 busFuncKey 	: $scope.dataModel.chartInputDetails.busFuncKey,
				    	 projKey		: $scope.dataModel.chartDetailsObj.projKey,
				    	 contentComment : $scope.dataModel.commentsTextModel,
				    	 userName 		: $scope.dataModel.loginUserId,
				    	 chartId 		: $scope.dataModel.selectedChart.chartId,
				    	 contentCommentDt : todayDate.getFullYear()	
					 }
			 };
			 
			 $scope.dataModel.updataChartStatus(true);
		 }
		 
		 $scope.dataModel.replyAndExitModel = function(){
			 $scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
			 $scope.replyChartInputInfo.currentSessionId = dataServiceModel.currentSessionId;
			 $scope.replyChartInputInfo.worklistActivityKey = dataServiceModel.worklistActivityKey;
			 $scope.replyChartInputInfo.eventType = 'CLOSE';
			 $http.post('/gcm-app-services/coding/workflow/replyAndExitforEscalatedItem',$scope.replyChartInputInfo).then(function(response) {
				 if (response.data && response.data.status == 'ERROR'){
					 $scope.dataModel.setErrorMessage(response.data.errorMessage);			 
				 }else{
					 $scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
					 $scope.closeImage();
					 lookupService.url = 'codingSupervisorWorklisttabs.html'; 
				 }
				 CordysRoot.rootData.dataModel = null;
			 },function(error) {
				 $scope.dataModel.setErrorMessage("Error:Error occured");
			 });
		 }
		 
		 $scope.replyAndExit = function(){
			 if(!$scope.dataModel.replyComments)
			 {
				 $scope.dataModel.replyDialogErrorMessageModel.content = '<span>Comment is required</span>';
				 $scope.dataModel.replyDialogErrorMessageModel.visible = true;
				 return;				 
			 }
			 var todayDate = new Date();
			 $scope.replyChartInputInfo = {
					 projContentKey : dataServiceModel.selectedChart.projContentKey,
					 busFuncVenKey	: dataServiceModel.selectedChart.busFuncVenKey,
					 projKey		: $scope.dataModel.chartDetailsObj.projKey,
					 busFuncKey		: 2,
					 toBusFuncStatus: "COMPLETED",
					 requestedUserId: $scope.dataModel.loginUserId,
					 userKey		: $scope.dataModel.loginUserKey,
					 groupKey 		: $scope.dataModel.currentGroupKey,
					 reasonCode		: dataServiceModel.selectedChart.escalationReasonCode,
					 eventType 		: 'CLOSE',
					 currentSessionId : dataServiceModel.currentSessionId,
					 chartComment	:
					 {
						 busFuncVenKey		: $scope.dataModel.chartInputDetails.busFuncVenKey,
						 projContentKey 	: $scope.dataModel.chartInputDetails.projContentKey,
				    	 busFuncKey 		: $scope.dataModel.chartInputDetails.busFuncKey,
				    	 projKey			: $scope.dataModel.chartDetailsObj.projKey,
				    	 contentComment 	: $scope.dataModel.replyComments,
				    	 userName 			: $scope.dataModel.loginUserId,
				    	 chartId 			: $scope.dataModel.selectedChart.chartId,
				    	 contentCommentDt	: todayDate.getFullYear()	
					 }
			 };
			 $scope.dataModel.replyAndExitModel();
		 }
		 
		 $scope.agreeAndExit = function(){
			 /*if(!$scope.dataModel.agreeComments && $scope.dataModel.selectedChart.escalationReasonCode != 'GCM8')
			 {
				 $scope.dataModel.agreeDialogErrorMessageModel.content = '<span>Comment is required</span>';
				 $scope.dataModel.agreeDialogErrorMessageModel.visible = true;
				 return;				 
			 }*/
			 var todayDate = new Date();
			 $scope.replyChartInputInfo = {
					 projContentKey : dataServiceModel.selectedChart.projContentKey,
					 busFuncVenKey	: dataServiceModel.selectedChart.busFuncVenKey,
					 projKey		: $scope.dataModel.chartDetailsObj.projKey,
					 busFuncKey		: 2,
					 toBusFuncStatus: "COMPLETED",
					 requestedUserId: $scope.dataModel.loginUserId,
					 userKey		: $scope.dataModel.loginUserKey,
					 reasonCode		: dataServiceModel.selectedChart.escalationReasonCode,
					 groupKey 		: $scope.dataModel.currentGroupKey,
					 eventType 		: 'CLOSE',
					 chartComment	:
					 {
						/* busFuncVenKey		: $scope.dataModel.chartInputDetails.busFuncVenKey,
						 projContentKey 	: $scope.dataModel.chartInputDetails.projContentKey,
				    	 busFuncKey 		: $scope.dataModel.chartInputDetails.busFuncKey,
				    	 projKey			: $scope.dataModel.chartDetailsObj.projKey,
				    	 contentComment 	: $scope.dataModel.agreeComments,
				    	 userName 			: $scope.dataModel.loginUserId,
				    	 chartId 			: $scope.dataModel.selectedChart.chartId,
				    	 contentCommentDt	: todayDate.getFullYear()	*/
					 }
			 };
			 
			 $scope.dataModel.replyAndExitModel();
		 }
		 
		 $scope.disagreeAndExit = function(){
			 if(!$scope.dataModel.disagreeComments)
			 {
				 $scope.dataModel.disAgreeDialogErrorMessageModel.content = '<span>Comment is required</span>';
				 $scope.dataModel.disAgreeDialogErrorMessageModel.visible = true;
				 return;				 
			 }
			 var todayDate = new Date();
			 $scope.replyChartInputInfo = {
					 projContentKey : dataServiceModel.selectedChart.projContentKey,
					 busFuncVenKey	: dataServiceModel.selectedChart.busFuncVenKey,
					 projKey		: $scope.dataModel.chartDetailsObj.projKey,
					 busFuncKey		: 2,
					 toBusFuncStatus: "REJECTED",
					 requestedUserId: $scope.dataModel.loginUserId,
					 userKey		: $scope.dataModel.loginUserKey,
					 reasonCode		: dataServiceModel.selectedChart.escalationReasonCode,
					 groupKey 		: $scope.dataModel.currentGroupKey,
					 eventType 		: 'CLOSE',
					 chartComment	:
					 {
						 busFuncVenKey		: $scope.dataModel.chartInputDetails.busFuncVenKey,
						 projContentKey 	: $scope.dataModel.chartInputDetails.projContentKey,
				    	 busFuncKey 		: $scope.dataModel.chartInputDetails.busFuncKey,
				    	 projKey			: $scope.dataModel.chartDetailsObj.projKey,
				    	 contentComment 	: $scope.dataModel.disagreeComments,
				    	 userName 			: $scope.dataModel.loginUserId,
				    	 chartId 			: $scope.dataModel.selectedChart.chartId,
				    	 contentCommentDt	: todayDate.getFullYear()	
					 }
			 };
			 
			 $scope.dataModel.replyAndExitModel();
		 }
		 
		 
		 
		 $scope.logCoderProdEvent = function(eventType){
			 if(dataServiceModel.selectedChart && ! dataServiceModel.selectedChart.busFuncKey){
				 dataServiceModel.selectedChart.busFuncKey = $scope.dataModel.chartInputDetails.busFuncKey;
			 }
			 $scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
			 $scope.chartInputInfo.eventType = eventType;
			 
			 CordysRoot.recordEvent(eventType).done(function(response){
			 		$scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
			}).fail(function(response){
					$scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
					 $scope.dataModel.setErrorMessage("Error: Failed to record " + eventType + " event ");
			});

			 
			/* $http.post('/gcm-app-services/coding/workflow/makeEntryforCoderProductivity',$scope.chartInputInfo).then(function(response) {
				$scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
			 },function(error) {
				 $scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
				 $scope.dataModel.setErrorMessage("Error: Failed to Update Chart Status");
			 });
			 */
			 
		 }
		 
		 $scope.exitCodingUI = function(){
			 $scope.dataModel.showEncounterSection = false;
			 $scope.closeImage();
			 $scope.logCoderProdEvent('CLOSE');
			 if(rootData.currentRole=='SUP'){
				 $scope.dataModel.exitWorkItem();
			 }else if($scope.dataModel.isSupervisorUI){
				 lookupService.url = 'codingSupervisorWorklisttabs.html';
			 }else{
				 lookupService.url = 'codingworklisttabs.html'; 
			 }
		 }
		 
		 $scope.dataModel.exitWorkItem = function(){
				
					lookupService.url = 'utilityTabs.htm';
			
			}
		 
		 $scope.dataModel.escalateDialogErrorMessageModel = {
					id : 'escalateError',
			        messageType : 'error',
			        content : '',
			        visible : false,
			        ariaAttributes : true,
			        headingLevel : '2'
		}
		 
		 $scope.dataModel.replyDialogErrorMessageModel = {
					id : 'replyError',
			        messageType : 'error',
			        content : '',
			        visible : false,
			        ariaAttributes : true,
			        headingLevel : '2'
		}
		$scope.dataModel.agreeDialogErrorMessageModel = {
			id : 'agreeError',
			messageType : 'error',
			content : '',
			visible : false,
			ariaAttributes : true,
			headingLevel : '2' 
		 }
		$scope.dataModel.disAgreeDialogErrorMessageModel = {
			 id : 'disagreeError',
		        messageType : 'error',
		        content : '',
		        visible : false,
		        ariaAttributes : true,
		        headingLevel : '2'
		}
		
});
codingUImodule.controller("codingHistoryUIController", function($scope, $http, $timeout, lookupService, errorMessageModel, dataServiceModel) {
	$scope.dataModel = dataServiceModel;
	$scope.history = $scope.dataModel.history; 
});
codingUImodule.controller("codingEncountersUIController", function($scope, $http, $timeout, lookupService, errorMessageModel, dataServiceModel) {
	$scope.dataModel = dataServiceModel;
	$scope.dataModel.encounterObj = $scope.encounterObj = {};
	$scope.encounterObj.encEoKey = '';
	$scope.encounterObj.retrievalProvFlag = '';
	$scope.encounters = $scope.dataModel.encounters;
	$scope.dataModel.viewEncounters =  $scope.viewEncounters;
	$scope.dataModel.isNoDxEoSelected = false;
	$scope.showCancelEncounterDialog = false;
  
	   $scope.dataModel.selected1 = [];
		 
		 //Add Encounters section
		 $scope.renderingProviderDropdownList = [
			{
				label: 'Select',
				value: ''
			},
			{
				label: 'Not Listed',
				value: 'Not Listed'
			},
			{
				label: 'R=R',
				value: 'R=R'
			}		 
		 ]
		 $scope.eoCodeDropdownList = [
			{
				label: 'Select',
				value: ''
			},
			{
				label: 'No provider signature on documentation',
				value: 'No provider signature on documentation'
			}		 	 
		 ]
				 
		$scope.checkRPValue = function(retrievalProvFlag){
			if(retrievalProvFlag == "N")
				$scope.encounters.isRPNotListed = true;
			else
				$scope.encounters.isRPNotListed = false;			
		}
		$scope.fromDateChange = function(){
			$scope.dataModel.codingErrorMessageModel.visible = false;
			if(dataServiceModel.selectedChart.programName == "CR"){
				$scope.encounterObj.dosThruDt = $scope.encounterObj.dosFromDt;	
				$scope.displayICDCodeTable();
				$scope.checkDateIsPresent();
			}
			
		}
		$scope.displayICDCodeTable = function(){
			if(!$scope.dataModel.isNoDxEoSelected){
				if($scope.dataModel.encounterObj.encEoKey && ($scope.dataModel.encounterObj.encEoKey.indexOf('C06') > 0 || $scope.dataModel.encounterObj.encEoKey.indexOf('D04') > 0)){
					$scope.dataModel.isNoDxEoSelected = true;
				}else{
					$scope.dataModel.isNoDxEoSelected = false;
				}
			}
			if($scope.encounterObj.dosFromDt && $scope.encounterObj.dosThruDt && !$scope.encounters.showICDCodeTable && !$scope.dataModel.isNoDxEoSelected){
				$scope.showICDCodeTableDummyRecords();
			}	
			$scope.checkDateIsPresent();
		}
		
		$scope.showICDCodeTableDummyRecords = function(){
			$scope.encounters.showICDCodeTable = true;
			$scope.dataModel.ICDTableModel.records = [];
				for (var i = 0; i < 10; i++) {
					 var dxCodesRowTemplate = {
						  icdCode : '',
						   v22Hcc : '',
						   v23Hcc : '',
						   v24Hcc:'',
						   rxHcc : '',
						   icdDesc : '',
						   encDxEoKey : ''
					 };
					  $scope.dataModel.ICDTableModel.records.push(dxCodesRowTemplate);
				}
						
			$scope.dataModel.ICDTableModel.totalRecordsCount = $scope.dataModel.ICDTableModel.records.length;
		}
		
		$scope.showICDCodeTableRecords = function(){
			$scope.encounters.showICDCodeTable = true;
			if($scope.dataModel.ICDTableModel.records.length == 0) {
				for (var i = 0; i < 10; i++) {
					 var dxCodesRowTemplate = {
						  icdCode : '',
						   v22Hcc : '',
						   v23Hcc : '',
						   v24Hcc:'',
						   rxHcc : '',
						   icdDesc : '',
						   encDxEoKey : ''
					 };
					  $scope.dataModel.ICDTableModel.records.push(dxCodesRowTemplate);
				}
						
				$scope.dataModel.ICDTableModel.totalRecordsCount = $scope.dataModel.ICDTableModel.records.length;
			}
		}
		
		$scope.dataModel.changeEncEoCode = function(){
			var valuePresent = false;
			if($scope.dataModel.selected1.length >0){
				angular.forEach($scope.dataModel.selected1, function(value, key){
					if(value.gcmEoKey && (value.gcmEoKey.indexOf('C06') > 0 || value.gcmEoKey.indexOf('D04') > 0)){
						valuePresent = true;
					}
				 });
			}
			if(valuePresent){
				$scope.encounters.showICDCodeTable = false;
				$scope.dataModel.isNoDxEoSelected = true;
			}else{
				if($scope.dataModel.selected1.length == 0){
					$scope.dataModel.isNoDxEoSelected = false;
					$scope.checkDateIsPresent();
				} else {
					$scope.dataModel.isNoDxEoSelected = false;
					$scope.encounters.showICDCodeTable = true;
					$scope.showICDCodeTableRecords();
					
				}
			}
		}
		
		$scope.checkDateIsPresent = function(){
			$scope.encounters.showICDCodeTable = false;
			if(dataServiceModel.selectedChart.programName == "CR"){
				if($scope.dataModel.encounterObj.dosFromDt ||  $scope.dataModel.encounterObj.dosThruDt){
					$scope.encounters.showICDCodeTable = true;
				} 
			} else {
				if($scope.dataModel.encounterObj.dosFromDt && $scope.dataModel.encounterObj.dosThruDt){
					$scope.encounters.showICDCodeTable = true;
				} 
			}
		}
		
		$scope.eoCodeOptions = [
			{
				label: "Document is illegible",
				value: 	"Document is illegible"
			},
			{
				label: "Missing Date of Service",
				value: 	"Missing Date of Service"
			}			
		]
		var emptyEo = {
						gcmEoKey : "",
						gcmEoDesc : "Select"
					 };
		

		  
		  $scope.dataModel.encLevelEoCodeList = {};
		  $scope.dataModel.isEncEoCodesPresent = false; 
		  //$scope.dataModel.encLevelEoCodeList.push(emptyEo);
		  
		
		  $scope.dataModel.ICDTableModel = $scope.ICDTableModel = {
			columns :  [
						{
							columnId:'icdCodeId',
							label:'ICD-10 DX Codes',
							layoutOrder:1,
							cellTemplate: '<input ng-model="::record.icdDxCd" ng-update-model-on="blur" ng-blur="model.handleIcdDXChange(record)" style="width:80%" type="text" id="icdCodeInputId"></input>',					
							style: 'width:15%',
							resizable: false
						},
						{
							columnId:'hccId',
							label:'HCC',
							layoutOrder:2,
							cellTemplate:'<span ng-if="record.v22Hcc">V22 : <span>record.v22Hcc</span><br/></span>'+
								'<span ng-if="record.v24Hcc">V24 : <span>record.v24Hcc</span></span>',
							style: 'width:5%',
							resizable: false
						},
						{
							columnId:'rxHccId',
							label:'RxHCC',
							layoutOrder:3,	
							cellTemplate:'<span ng-bind="::record.rxHcc"> </span>',
							style: 'width:5%',
							resizable: false				
						},
						{   columnId:'icdDescriptionId',
			        		label:'ICD 10 DX Description',
							layoutOrder:4, 
							cellTemplate:'<span style="width:80%" ng-bind="::record.icdDesc"> </span>',
							style: 'width:45%',
							resizable: false
						},
						{   columnId:'eoCodeId',
			        		label:'EO Code',
							layoutOrder:5, 
							cellTemplate: '<select ng-model="::record.encDxEoKey" class="eocodes-class" id="eoTableDropDown" style="width:80%" ng-options="eoCodeObj.gcmEoKey as eoCodeObj.gcmEoDesc for eoCodeObj in model.dxLevelEoCodeLst"></select>',
							style: 'width:30%',
							resizable: false		
						}
			], 			
			records : [],
			totalRecordsCount : 0,
			dxLevelEoCodeLst : []			
		 };
		 
		  $scope.dataModel.handleIcdDXChange = $scope.dataModel.ICDTableModel.handleIcdDXChange = function(record){
			  var dxCode = record.icdDxCd;
			  if(record.icdDxCd) 
			  {
				  record.icdDxCd = dxCode.toUpperCase();
				  getHccAndRxHccByDX(record);
			  }else{
				  record.v22Hcc = '';
				  record.v23Hcc = '';
				  record.v24Hcc = '';
				  record.rxHcc = '';
				  record.icdDesc = '';
				  record.errorCode = '';
				  record.hhs = '';
			  }
		  }
		  
		  window.handlePreventDefault = function(e){
			  if(e.keyCode == 13){
				  e.preventDefault();  
			  }
		  }
		  
		  var getHccAndRxHccByDX = function(record){
			  
			  var memberDOB = new Date($scope.dataModel.chartDetailsObj.memberDOB);
			  var birthYear = memberDOB.getFullYear();
			  var birthMonth = memberDOB.getMonth();
			  var birthDay = memberDOB.getDate();
			  
			  var fromYear = $scope.encounterObj.dosFromDt.getFullYear();
			  var fromMonth = $scope.encounterObj.dosFromDt.getMonth();
			  var fromDay = $scope.encounterObj.dosFromDt.getDate();
			  
			  var age = fromYear - birthYear;
			  var ageMonth = fromMonth - birthMonth;
			  var ageDay = fromDay - birthDay;
			  if(age > 0 && (ageMonth < 0 || (ageMonth == 0 && ageDay < 0)) ){
				  age = parseInt(age) -1;
			  }

			  
			 /* var diffMilliSecs = $scope.encounterObj.dosFromDt - $scope.dataModel.chartDetailsObj.memberDOB;
			  var age =  parseInt(diffMilliSecs / (1000 * 60 * 60 * 24));*/
			  
			  $scope.dataModel.isValidationInprogress = true;
			  
			  var dxCodedosDetailsObj = {
					  icdDxCd 		: record.icdDxCd,
					  dosThruDt		: $scope.dataModel.throughDateModel.dateText,
					  dosFromDt		: $scope.dataModel.fromDateModel.dateText,
					  busSegment	: $scope.dataModel.chartDetailsObj.busSegment,
					  gender		: $scope.dataModel.chartDetailsObj.memberGender,
					  dateOfBirth	: $scope.dataModel.chartDetailsObj.memberDOB,
					  age			: age
			  };
			  $scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
			  $http.post('/gcm-app-services/coding/workflow/validateIcdCode', dxCodedosDetailsObj).then(function(response) {
				  $scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
				  if(response && response.data && response.data.result)
				  {
					  if(response.data.result.errorCode){
						  $scope.setErrorMessage(response.data.result.icdDesc);
						  record.icdDesc = response.data.result.icdDesc;
						  record.errorCode = response.data.result.errorCode;
						  record.v22Hcc = '';
						  record.v23Hcc = '';
						  record.v24Hcc = '';
						  record.rxHcc = '';
						  record.hhs = '';
					  }else{
						  record.v22Hcc = response.data.result.v22Hcc;
						  record.v23Hcc = response.data.result.v23Hcc;
						  record.v24Hcc = response.data.result.v24Hcc;
                          record.rxHcc = response.data.result.rxHcc;
						  record.icdDesc = response.data.result.icdDesc;
						  record.hhs = response.data.result.hhs;
						  record.errorCode = '';
					  }
				  }
				  var icdRecords = $scope.dataModel.ICDTableModel.records;
				  $scope.dataModel.isValidationInprogress = false;
			  },function(error) {
				  $scope.dataModel.setErrorMessage("Error:DX,Age/Gender Validation failed.");
			  });
		  }
		
		  $scope.getEncEoCodes = function(){
			  $http.post('/gcm-app-services/coding/workflow/getEncEoCodes',$scope.dataModel.chartInputDetails.projContentKey).then(function(response) {
				  if (response && response.data && response.data.result){
					  $scope.dataModel.encLevelEoCodeList[emptyEo.gcmEoKey] = emptyEo;
					  $scope.encLevelEoCodeList = [];
					  for (var i = 0; i < response.data.result.length; i++){
						  var record = response.data.result[i];
						  if(record.gcmGroupKey == $scope.dataModel.chartDetailsObj.projOrgGroup){
								var eoObj = {};
								eoObj.gcmEoKey = record.gcmEoKey;
								eoObj.gcmEoDesc = record.gcmEoDesc;
								//$scope.dataModel.encLevelEoCodeList.push(eoObj);
								$scope.dataModel.encLevelEoCodeList[eoObj.gcmEoKey] = eoObj;
								$scope.encLevelEoCodeList.push(eoObj);
						  }
					  }
					  $scope.dataModel.isEncEoCodesPresent = true;
				  }else{
					  $scope.dataModel.isEncEoCodesPresent = false;
				  }
			  });
		  }
		  $scope.getEncEoCodes();
		  $http.post('/gcm-app-services/coding/workflow/getDxLevelEoCodes',$scope.dataModel.chartInputDetails.projContentKey).then(function(response) {
			  if (response && response.data && response.data.result){
				  $scope.dataModel.dxLevelEoCodeLst = [emptyEo];
				  for (var i = 0; i < response.data.result.length; i++){
					  var record = response.data.result[i];
					  if(record.gcmGroupKey == $scope.dataModel.chartDetailsObj.projOrgGroup){
							var eoObj = {};
							eoObj.gcmEoKey = record.gcmEoKey;
							eoObj.gcmEoDesc = record.gcmEoDesc;
							$scope.dataModel.dxLevelEoCodeLst.push(eoObj);
					  }
				  }
					$scope.dataModel.ICDTableModel.dxLevelEoCodeLst = $scope.dataModel.dxLevelEoCodeLst;
			  }
		  });
		
		 	$scope.onAddRow = function(){
				var rows = {
					icdDxCd: '',
					v22Hcc:'',
					v23Hcc:'',
					v24Hcc:'',
					rxHcc:'',
					icdDesc:'',
					encDxEoKey: ''
					};
				$scope.dataModel.ICDTableModel.records.push(rows);
				$scope.dataModel.ICDTableModel.totalRecordsCount = $scope.dataModel.ICDTableModel.records.length;		
		 	}
		 	$scope.orginalDxObj = [];
		 	$scope.dataModel.savedEncounter = {};
		 	$scope.dataModel.editEncounter = function(record, isViewEncounter){
		 		$scope.dataModel.clearEncounterSection();
				 $scope.encounterInputInfo = {
						 projContentKey	: $scope.dataModel.chartInputDetails.projContentKey,
						 busFuncVenKey	: $scope.dataModel.chartInputDetails.busFuncVenKey,
						 projKey		: $scope.dataModel.chartDetailsObj.projKey,
						 busFuncKey		: $scope.dataModel.chartInputDetails.busFuncKey,
						 encounterKey	: record.encounterKey
				 }
				 $http.post('/gcm-app-services/coding/encounter/getEncounterwithDxHcc', $scope.encounterInputInfo).then(function(response) {
					 if(response && response.data && response.data.result && response.data.result.length > 0)
					 {
						 $scope.dataModel.ICDTableModel.records = [];
						 $scope.encounterObj = $scope.dataModel.encounterObj = response.data.result[0];
						 $scope.encounterObj.isOptumCoding = isOptumCoding();//($scope.dataModel.currentGroupCode == 'CP' || $scope.dataModel.currentGroupCode == 'OI') ? true : false;
						 var dosFromdateStringArr = $scope.encounterObj.dosFromDt.split(" ");
						 var dosFromDate = dosFromdateStringArr.length > 1 ? dosFromdateStringArr[0] :"";
						 
						 dosFromdateStringArr = $scope.encounterObj.dosThruDt.split(" ");
						 var dosThruDate = dosFromdateStringArr.length > 1 ? dosFromdateStringArr[0] :"";
						 
						 var fromDate = new Date(dosFromDate);
						 var userTimezoneOffset = fromDate.getTimezoneOffset() * 60000;						 
						 
						 $scope.encounterObj.dosFromDt = new Date(fromDate.getTime() + userTimezoneOffset);
						 
						 var thruDate = new Date(dosThruDate);
						 
						 $scope.encounterObj.dosThruDt = new Date(thruDate.getTime() + userTimezoneOffset);
						 
						 if(!$scope.encounterObj.encEoKey){
							 $scope.encounterObj.encEoKey = '';
						 }
						 if($scope.encounterObj.retrievalProvFlag != 'Y'){
							 $scope.encounters.isRPNotListed = false;
						 }
						 
						 $scope.dataModel.isNoDxEoSelected = false;
						 if ($scope.encounterObj.eoKeyList.length > 0 && $scope.encounterObj.eoKeyList.length > 0) {
							 angular.forEach($scope.encLevelEoCodeList, function(value, key) {
								 angular.forEach($scope.encounterObj.eoKeyList, function(value1, key1) {
									 if(value.gcmEoKey == value1) {
										 value.ticked = true; 
									 }
									 if(value1 && (value1.indexOf('C06') > 0 || value1.indexOf('D04') > 0)){
										 $scope.dataModel.isNoDxEoSelected = true;
										}
								 });
							 });		  
						}
						 for(var i = 0; i < response.data.result.length; i++){
							 
							 var dxCodesRowTemplate = response.data.result[i];
							 if(dxCodesRowTemplate.icdDxCd){
								 if(!dxCodesRowTemplate.encDxEoKey){
									 dxCodesRowTemplate.encDxEoKey = '';
								 }
								 $scope.dataModel.ICDTableModel.records.push(dxCodesRowTemplate);
							 }
						 }
						 var totalDxCodes = $scope.dataModel.ICDTableModel.records.length;
						 for(var i = totalDxCodes; i < 10; i++){
							 var dxCodesRowTemplate = {
										icdCode: '',
								    	v22Hcc: '',
								    	v23Hcc:'',
								    	v24Hcc:'',
								    	rxHcc: '',
								    	icdDesc: '',
								    	encDxEoKey: ''
								};
							$scope.dataModel.ICDTableModel.records.push(dxCodesRowTemplate);
						 }
						 $scope.dataModel.ICDTableModel.totalRecordsCount = totalDxCodes > 10 ? totalDxCodes : 10;
						 angular.forEach(response.data.result, function(value, key){
							 $scope.orginalDxObj[value.encDxKey] = angular.copy(value); 
						 });
						 if(totalDxCodes > 0 ){
							 $scope.encounters.showICDCodeTable = true;
						 }
						 
						 $scope.dataModel.savedEncounter = angular.copy($scope.encounterObj, {});
					 }
				 },function(error) {
					 $scope.dataModel.setErrorMessage("Error:Failed to read encounter for edit.");
				 });
				 
		 	}
	 	var saveEncounterModel = function(){
	 		if($scope.dataModel.saveInprogress) return;
	 		$scope.dataModel.saveInprogress = true;
			if($scope.dataModel.isValidationInprogress){
				$scope.setErrorMessage("ICD Code Validation is in progress.");
				$scope.dataModel.saveInprogress = false;
				return;
			}
	 		if($scope.dataModel.noDosMeetsCriteria == 'Y'){
	 			$scope.setErrorMessage("Encounter cannot be saved when the NO DOS checkbox is selected.  Please delete the encounter or deselect the checkbox.");
	 			$scope.dataModel.saveInprogress = false;
	 			return;
	 		}
			
			if(validateEncounter() && validateDxCodes()){
				
				var diffDays = 0;
				if($scope.dataModel.fromDateModel.dateText && $scope.dataModel.throughDateModel.dateText)
				{
					var diffMilliSecs = $scope.encounterObj.dosThruDt - $scope.encounterObj.dosFromDt;
					diffDays = parseInt(diffMilliSecs / (1000 * 60 * 60 * 24));
				}
				if(diffDays>=30){
					$scope.setErrorMessage("Date Span Cannot Be Greater Than 30 Days.");
					$scope.dataModel.saveInprogress = false;
					return;
				}
				$scope.triggerSaveEncounter();
			}else{
				$scope.dataModel.saveInprogress = false;
			}
		}
			
		$scope.triggerSaveEncounter=function()
		{
			$scope.prepareEncounter2Save();
			$scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
			$http.post('/gcm-app-services/coding/encounter/saveEncounter', $scope.dataModel.encounterDxDetails).then(function(response) {
				$scope.dataModel.saveInprogress = false;
				if(response.data.status == 'ERROR'){
					$scope.setErrorMessage(response.data.errorMessage);
					return;
				}
				$scope.dataModel.isNoDxEoSelected = false;
				$scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
				$scope.dataModel.readEncounters();
				$scope.dataModel.clearEncounterSection();
				$scope.dataModel.setSuccessMessage("Encounter Saved Successfully.");
			}, function(error) {
				$scope.dataModel.saveInprogress = false;
				$scope.setErrorMessage("Error:Failed to save encounter/DX changes.");
			});
		}
		
		$scope.prepareEncounter2Save = function(){
			var dxCodesList = [];
			var deleteDxCodesList = [];
			var updateDXCodesList = [];
			for(var i = 0; i < $scope.dataModel.ICDTableModel.records.length; i++){
				var record = $scope.dataModel.ICDTableModel.records[i];
				var dxCodeObj = {};
				if(record && record.icdDxCd && !$scope.dataModel.isNoDxEoSelected){
					if(!record.encDxKey){						
						dxCodeObj.icdDxCd = record.icdDxCd;
						dxCodeObj.eoKey	= record.encDxEoKey ? record.encDxEoKey : '';
						dxCodesList.push(dxCodeObj);
					}else if($scope.orginalDxObj[record.encDxKey] 
							&& (record.icdDxCd != $scope.orginalDxObj[record.encDxKey].icdDxCd || record.encDxEoKey != $scope.orginalDxObj[record.encDxKey].encDxEoKey)){
						dxCodeObj.encDxKey = record.encDxKey;
						dxCodeObj.icdDxCd = record.icdDxCd;
						dxCodeObj.eoKey	= record.encDxEoKey ? record.encDxEoKey : '';
						updateDXCodesList.push(dxCodeObj);
					}
				}else if(record && record.encDxKey && (!record.icdDxCd || $scope.dataModel.isNoDxEoSelected) ){
					dxCodeObj.encDxKey = record.encDxKey;
					deleteDxCodesList.push(dxCodeObj);
				}
			}
			var selectedEoRecords = [];
			if($scope.dataModel.selected1.length >0){
				angular.forEach($scope.dataModel.selected1, function(value, key){
					selectedEoRecords.push(value.gcmEoKey);
				 });
			}
			
			$scope.dataModel.encounterDxDetails = {
				loginUserId : $scope.dataModel.loginUserId,
				userKey		: $scope.dataModel.loginUserKey,
				encounterInfo : {
					encounterKey			: $scope.encounterObj.encounterKey,
					projContentKey			: $scope.dataModel.selectedChart.projContentKey,
					barcode					: $scope.dataModel.selectedChart.chartId,
					projKey					: $scope.dataModel.chartDetailsObj.projKey,
					dosFromDt				: $scope.dataModel.fromDateModel.dateText,
					dosThruDt				: $scope.dataModel.throughDateModel.dateText,
					pageNumber				: $scope.encounterObj.pageNumber,
					projContBusFuncVenKey	: $scope.dataModel.chartDetailsObj.busFuncVenKey,
					retrievalProvFlag		: $scope.encounterObj.retrievalProvFlag,
					provNpi					: $scope.encounterObj.retrievalProvFlag == 'N' ? $scope.encounterObj.provNpi: '',
					provFirstName			: $scope.encounterObj.retrievalProvFlag == 'N' ? $scope.encounterObj.provFirstName: '',
					provLastName			: $scope.encounterObj.retrievalProvFlag == 'N' ? $scope.encounterObj.provLastName: '',
					eoKeyList				: selectedEoRecords,
					busFuncKey				: $scope.dataModel.chartDetailsObj.busFuncKey,
					modBusFuncKey			: ""
				},
				dxList			: dxCodesList,
				deleteDxList	: deleteDxCodesList,
				updateDxList	: updateDXCodesList
			}
		}
		
		$scope.dataModel.isEncounterModified = function(){
			$scope.prepareEncounter2Save();
			if($scope.dataModel.selected1.length > 0){
				return true;
			}
			if($scope.dataModel.encounterObj && $scope.dataModel.encounterObj.encounterKey){
				if($scope.dataModel.encounterDxDetails && 
						($scope.compareEncounterInfo() || 
								($scope.dataModel.encounterDxDetails.dxList && $scope.dataModel.encounterDxDetails.dxList.length > 0)
								|| ($scope.dataModel.encounterDxDetails.deleteDxList && $scope.dataModel.encounterDxDetails.deleteDxList.length > 0)
								|| ($scope.dataModel.encounterDxDetails.updateDxList && $scope.dataModel.encounterDxDetails.updateDxList.length > 0)
								)){
					return true;
				}else{
					return false;
				}
			}else{
				if($scope.dataModel.encounterObj.dosFromDt ||  $scope.dataModel.encounterObj.dosThruDt || $scope.dataModel.encounterObj.pageNumber || $scope.dataModel.encounterObj.retrievalProvFlag || $scope.dataModel.encounterObj.encEoKey){
					return true;
				}else{
					return false;
				}
			}
			
		}
		
		$scope.compareEncounterInfo = function (){
			if($scope.dataModel.savedEncounter && (
					($scope.dataModel.savedEncounter.pageNumber != $scope.dataModel.encounterObj.pageNumber)
					|| ($scope.dataModel.savedEncounter.dosFromDt != $scope.dataModel.encounterObj.dosFromDt)
					|| ($scope.dataModel.savedEncounter.dosThruDt != $scope.dataModel.encounterObj.dosThruDt)
					|| ($scope.dataModel.savedEncounter.retrievalProvFlag != $scope.dataModel.encounterObj.retrievalProvFlag)
					|| ($scope.dataModel.encounterObj.provNpi && $scope.dataModel.savedEncounter.provNpi != $scope.dataModel.encounterObj.provNpi)
					|| ($scope.dataModel.encounterObj.provFirstName && $scope.dataModel.savedEncounter.provFirstName != $scope.dataModel.encounterObj.provFirstName)
					|| ($scope.dataModel.encounterObj.provLastName && $scope.dataModel.savedEncounter.provLastName != $scope.dataModel.encounterObj.provLastName)
					|| ($scope.dataModel.encounterObj.encEoKey && $scope.dataModel.savedEncounter.encEoKey != $scope.dataModel.encounterObj.encEoKey)
					)){
				return true;
			}else{
				return false;
			}
		}
			
		$scope.saveEncounter = function() {
			$scope.dataModel.codingErrorMessageModel.visible = false;
			$scope.encounters.showSavedEncountersTable = true;	
			saveEncounterModel();	 	
		}
		
		var validateDxCodes = function(){
			var isValidDXCodesExist = false;
			if($scope.dataModel.ICDTableModel.records.length > 0 && !$scope.dataModel.isNoDxEoSelected){
				var dxCodes = $scope.dataModel.ICDTableModel.records;
				var duplicateDxCodes = {};
				var duplicateDxCodesString = "";
				var notValidDxCodesString = "";
				angular.forEach(dxCodes, function(value, key){
					if ( value &&  value.icdDxCd ){
						isValidDXCodesExist = true;
						if ( duplicateDxCodes[value.icdDxCd] ){
							if ( duplicateDxCodesString  != '' ) duplicateDxCodesString  += ",";
							duplicateDxCodesString  += value.icdDxCd;
						}else{
							duplicateDxCodes[value.icdDxCd] = value.icdDxCd;
						}
						if(value.errorCode && value.errorCode != ''){
							if(notValidDxCodesString.length > 0){
								notValidDxCodesString += ","+ value.icdDxCd; 
							}else{
								notValidDxCodesString += value.icdDxCd; 
							}
						}
					}
				});
				return setDxErrorMessage(duplicateDxCodesString,notValidDxCodesString,isValidDXCodesExist);
			}
			return true;
		}
		
		function setDxErrorMessage(duplicateDxCodesString,notValidDxCodesString,isValidDXCodesExist)
		{
			if (  duplicateDxCodesString  != '' ){
					$scope.setErrorMessage("Duplicate Dx Codes : " + duplicateDxCodesString);
					return false;
				}
				if(notValidDxCodesString != ""){
					$scope.setErrorMessage("ICD code not valid : " + notValidDxCodesString);
					return false;
				}
			if(!isValidDXCodesExist && !($scope.encounterObj.encEoKey && ($scope.encounterObj.encEoKey.indexOf('C06') > 0 || $scope.encounterObj.encEoKey.indexOf('D04') > 0))){
				$scope.setErrorMessage("Save Encounter Failed: As there is no DX code entered or No non codebale EO code selected");
				return false;
			}
			return true;
		}
		
		var isOptumCoding = function(){
			return $scope.dataModel.isInternalGroup;
		}
		
		$scope.encounterObj.isOptumCoding = isOptumCoding();
		
		$scope.validateEncounterDetails=function()
		{
			if(!$scope.encounterObj.dosFromDt){
				$scope.setErrorMessage('From Date is required');
				return false;
			}
			if(!$scope.encounterObj.dosThruDt){
				$scope.setErrorMessage('Through Date is required');
				return false;
			}
			if ( ! validateDate($scope.encounterObj.dosFromDt, "From Date") ){
				return false;
			}
			if ( ! validateDate($scope.encounterObj.dosThruDt, "Through Date") ){
				return false;
			}
			if(!validateFromandTHruDates($scope.encounterObj.dosFromDt, $scope.encounterObj.dosThruDt))
			{
				return false;
			}
			if (  ! validatePageNumber($scope.encounterObj.pageNumber) ){

				$scope.setErrorMessage("The Page # you entered is not valid.");
				return false;
			}

			if ( ! $scope.encounterObj.pageNumber){
				$scope.setErrorMessage('Page # is required');
				return false;
			}		
			return true;
		}
		var validateEncounter = function(){
			if($scope.validateEncounterDetails()){
				
			//validateRenderingProvider();
			if (!$scope.encounterObj.retrievalProvFlag){
				$scope.setErrorMessage("Rendering Provider is required.");
				return false;			
			}
			if($scope.encounterObj.retrievalProvFlag=="N" &&  $scope.dataModel.chartDetailsObj.busSegment == "MCAID" && (typeof($scope.encounterObj.provFirstName) == "undefined" || $scope.encounterObj.provFirstName=="" || $scope.encounterObj.provFirstName.trim().length == 0|| $scope.encounterObj.provFirstName==null || typeof($scope.encounterObj.provLastName)=="undefined" || $scope.encounterObj.provLastName == "" || $scope.encounterObj.provLastName == null || $scope.encounterObj.provLastName.trim().length == 0))
			{
				$scope.setErrorMessage("Provider First/Last name is required when Rendering Provider Match = Other");
				return false;
			}
			if($scope.encounterObj.retrievalProvFlag=="N" )
			{
				if(isOptumCoding() && !$scope.encounterObj.provNpi){
					$scope.setErrorMessage('NPI is required');
					return false;
				}
				if($scope.encounterObj.provLastName)
				{
					if ( ! validateProperties($scope.encounterObj.provLastName, '[a-zA-Z- ]', '[^a-zA-Z- ]') ){
					   $scope.setErrorMessage("Last Name contains characters that cannot be accepted.");
					   return false;
					}
					if ( $scope.encounterObj.provLastName && $scope.encounterObj.provLastName.length > 50 ){
						$scope.setErrorMessage("Please enter Last Name value less than 50 characters.");
						return false;
					}
				}
				else{
					if ( $scope.dataModel.chartDetailsObj.busSegment == "MCAID")
					{
						$scope.setErrorMessage("Record not saved. Rendering Provider Last Name is required when business segment = Medicaid");
						return false;
					}
				}
					
				if($scope.encounterObj.provFirstName)
				{
					if ( ! validateProperties($scope.encounterObj.provFirstName, '[a-zA-Z- ]', '[^a-zA-Z- ]') ){
					   $scope.setErrorMessage("First Name contains characters that cannot be accepted.");
					   return false;
					}
					if ( $scope.encounterObj.provFirstName && $scope.encounterObj.provFirstName.length > 50 ){
						$scope.setErrorMessage("Please enter First Name value less than 50 characters.");
						return false;
					}
				}else{
					if ( $scope.dataModel.chartDetailsObj.busSegment == "MCAID")
					{
						$scope.setErrorMessage("Record not saved. Rendering Provider First Name is required when business segment = Medicaid");
						return false;
					}
				}
					
				if($scope.encounterObj.provNpi)
				{
					if ( ! validateProperties($scope.encounterObj.provNpi, '[0-9]', '[^0-9]') ){
					   $scope.setErrorMessage("NPI contains characters that cannot be accepted.");
					   return false;
					}
					if ( $scope.encounterObj.provNpi && $scope.encounterObj.provNpi.length != 10 ){
						$scope.setErrorMessage("Please enter NPI value 10 characters.");
						return false;
					}
				}/*else{
					if($scope.dataModel.chartDetailsObj.busSegment !='MCAID'){
						$scope.setErrorMessage("Record not saved.Rendering Provider NPI is required");
						return false;
					}
				}*/
			}
			return true;
		}
		else
			return false;
		}
		
		$scope.dataModel.isNPIRequired = function(){
			if($scope.encounterObj.retrievalProvFlag == 'N' || $scope.dataModel.chartDetailsObj.busSegment !='MCAID')
			{
				return true;				
			}
			else{
				return false;
			}
		}
		
		function validateDate(dateValue,  elementName)
		{
			if(typeof(dateValue) === "string"){
				dateValue = new Date(dateValue);
			}
			var result = true;
			if(!isValidDate(dateValue.getFullYear(), dateValue.getDate(), dateValue.getMonth()+1 ))
			{
				$scope.setErrorMessage("Enter valid "+ elementName +".");
				return false;
			}
			var otherDate = dateValue;
			var toDate = new Date();
			
			if(otherDate > toDate)
			{
				$scope.setErrorMessage("Enter Date less than Current Date.");
				result = false;
			}
			return result;
		}
		
		function isValidDate(year, month, day)
		{
			year = parseInt(year);
			if (day == 31 && (month == 4 || month == 6 || month == 9 || month == 11))
			{
				return false; // 31st of a month with 30 days
			}
			else if (day >= 30 && month == 2)
			{
				return false; // February 30th or 31st
			}
			else if (month == 2 && day == 29 && !(year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)))
			{
				return false; // February 29th outside a leap year
			}
			else
			{
				return true; // Valid date
			}
		}
		
		function validateFromandTHruDates(FromDate, ThruDate)
		{
			var fromDateValue = FromDate;

			var throughDateValue = ThruDate;

			if(fromDateValue > throughDateValue )
			{
				$scope.setErrorMessage("Through Date should be greater than or equal to From date.");
				return false;
			}
			
			var MBR_DOB = $scope.dataModel.chartDetailsObj.memberDOB;
			var bussSegment = $scope.dataModel.chartDetailsObj.busSegment;
			if ( MBR_DOB.indexOf("T") > 0 ){
				MBR_DOB = MBR_DOB.substring(0, MBR_DOB.indexOf("T"));
			}
			var dateAttr = MBR_DOB.split("-");
			MBR_DOB = new Date(dateAttr[0], dateAttr[1] - 1, dateAttr[2]);
			
			var otherDate = fromDateValue;
			if(otherDate <= MBR_DOB && bussSegment == "MCARE")
			{
				$scope.setErrorMessage("From Date should be Greater than Chart Member DOB.");
				return false;
			}
			if(otherDate < MBR_DOB )
			{
				$scope.setErrorMessage("From Date should be Greater than or equal to Chart Member DOB.");
				return false;
			}
			return true;
		}
		
		function validatePageNumber(pageNumberString){
			var regex = /^[0-9-,\s]+$/;
			if (!pageNumberString)
				return true;
			if (regex.test(pageNumberString))
			{
				// Before Saving Encounter Check for Page Number entered is valid or not.
				var str = "";
				// if , alone present throw error
				if (pageNumberString == ",")
					return false;

				// Split individually as a string using comma/space
				var splitStr = pageNumberString.split(/[ ,]+/);

				for (var i = 0; i < splitStr.length; i++)
				{
					if (splitStr[i].length != 0)
					{
						// Identify non-negative numbers
						if (splitStr[i].substr(0, 1) == "-")
						{
							return false;
						}
					}
				}
				// Split individually as a string using minus/comma/space
				var splitNoStr = pageNumberString.split(/[- ,]+/);
					for (i = 0; i < splitNoStr.length; i++)
					{
						var stInt = parseInt(splitNoStr[i]);
						if ( stInt <= 0 ) return false;
					}
			}
			else
			{
				return false;
			}
			return true;
		}
		
		
		$scope.ValidateFieldLength = function(name, value, length){
			 if ( value && value.length > length ){
				$scope.setErrorMessage("Please enter " + name + " value less than " + length + " characters.");
				return false;
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
		
		$scope.dataModel.clearEncounterSection = function(){
			  $scope.dataModel.codingErrorMessageModel.visible = false;
			  $scope.encounterObj.dosThruDt = '';
			  $scope.encounterObj.dosFromDt = '';
			  $scope.encounterObj.pageNumber = '';
			  $scope.encounterObj.retrievalProvFlag = '';
			  $scope.encounterObj.provNpi = '';
			  $scope.encounterObj.provFirstName = '';
			  $scope.encounterObj.provLastName = '';
			  if($scope.encounters.showICDCodeTable)
			  {
				  $scope.encounters.showICDCodeTable = false;
			  }
			  $scope.dataModel.ICDTableModel.records = [];
			  $scope.encounters.isRPNotListed = false;
			  $scope.encounterObj.encounterKey = '';
			  $scope.encounterObj.encEoKey = '';
			  if($scope.encLevelEoCodeList.length > 0){
				  angular.forEach($scope.encLevelEoCodeList, function(value, key){
					  value.ticked = false;
				  });
			  }
			  $scope.dataModel.isNoDxEoSelected = false;
			  $scope.dataModel.selected1=[];
		 }
		$scope.toggleCancelEncDialog = function(isCloseCancelDialog){
			if($scope.dataModel.isEncounterModified() || isCloseCancelDialog){
				$scope.showCancelEncounterDialog = !$scope.showCancelEncounterDialog;
			}
		}
		
		$scope.clearEncounterSection = function(){
			$scope.showCancelEncounterDialog = !$scope.showCancelEncounterDialog;
			$scope.dataModel.clearEncounterSection()
		}
		
		$scope.dataModel.setErrorMessage = $scope.setErrorMessage = function(message){
			$scope.dataModel.codingErrorMessageModel.messageType = 'error';
			$scope.dataModel.codingErrorMessageModel.content = '<span>'+message+'</span>';
			$scope.dataModel.codingErrorMessageModel.visible = true;
		}
		$scope.dataModel.setSuccessMessage = $scope.setSuccessMessage = function(message){
			$scope.dataModel.codingErrorMessageModel.messageType = 'success';
			$scope.dataModel.codingErrorMessageModel.content = '<span>'+message+'</span>';
			$scope.dataModel.codingErrorMessageModel.visible = true;
		}
});
codingUImodule.controller("codingCommentsUIController", function($scope, $http, $timeout, lookupService, errorMessageModel, dataServiceModel) {
	$scope.dataModel = dataServiceModel;
	$scope.comments = $scope.dataModel.comments;
});