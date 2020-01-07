angular.module('codingQAUIApp', ['uitk.component.uitkPanel','uitk.component.uitkDynamicTable', 'uitk.component.uitkIconFont', 'uitk.component.uitkCalendar','uitk.component.uitkLabel',
	'uitk.component.uitkTextField','uitk.component.uitkButton','uitk.component.uitkDialog','uitk.component.uitkTextarea',
	'uitk.component.uitkSelect','ngSanitize','uitk.component.uitkNavigable','codingQAUIViewModel','uitk.component.uitkMultiSelect']).controller("qaUIController", function($scope, $q, $http, $timeout, lookupService, dataServiceModel,savedEncountersTableViewModel,icdCodesTableViewModel) {
		var CordysRoot = window.parent;
		$scope.dialogErrorMessageModel = {
				id : 'Error',
				messageType : 'error',
				content : '',
				visible : false,
				headingLevel : '2',
				closeButton : true
		};

		$scope.dataModel = dataServiceModel;
		CordysRoot.rootData.dataModel = dataServiceModel;

		var userObj = optumUI.getUser();
		$scope.dataModel.loginUserKey = userObj.getLoggedInUserKey();
		$scope.dataModel.loginUserId = optumUI.getAuthUser();
		$scope.dataModel.currentGroupKey = userObj.getCurrentGroupKey();
		$scope.dataModel.currentGroupCode = userObj.currentGroupCode;
		var selectedEoRecords = [];
		
		var userGroups = userObj.getUserGroups();
		$scope.dataModel.isInternalGroup = false;
		
		if(userGroups && userGroups.length > 0){
			for(var i = 0; i < userGroups.length; i++) {
				if(userGroups[i].groupCode == userObj.currentGroupCode && userGroups[i].isInternalGroup == 'Y'){
					$scope.dataModel.isInternalGroup = true;
				}
			}
		}
		

		$scope.dataModel.chartDetailsObj = {};
		$scope.dataModel.chartInputDetails = {
				projContentKey : dataServiceModel.selectedChart.projContentKey,
				busFuncVenKey : dataServiceModel.selectedChart.busFuncVenKey,
				busFuncKey : dataServiceModel.selectedChart.busFuncKey,
				busFuncStatus : dataServiceModel.selectedChart.chartStatus
		};

		$scope.showCodingInstructions = false;	
		$scope.showProgramDirections = false;
		$scope.showCodingQALoadingDialog = false;

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
			imgDet.documentId = dataServiceModel.selectedChart.chartId;
			imgDet.editable = !$scope.dataModel.isReadonly;
			imgDet.busFuncVenKey = dataServiceModel.selectedChart.busFuncVenKey;
			imgDet.appName = 'MRM';
			imgDet.viewerType=type;
			return $.base64.encode(JSON.stringify(imgDet));
		}
		
		function buildImgDetails(value,isReadOnly){
			var keySize = 128;
			var iterationCount = 1000;
			var iv = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
			var salt = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
			var passphrase = $.format.date(new Date(),'ddMMyyyyHHmmssSSS').substring(0,16);
			var aesUtil = new AesUtil(keySize, iterationCount);
			var imgDetails = value + ";" + !isReadOnly ;
			var ciphertext = aesUtil.encrypt(salt, iv, passphrase, imgDetails);
			return $.base64.encode(ciphertext + "." + iv + "." + salt + "." + passphrase);
		}

		function getEncounters() {
			$scope.selectedRowEoCodeList = [];
			var encounterInputInfo = {
					loginUserKey : $scope.dataModel.loginUserKey,
					groupKey : $scope.dataModel.currentGroupKey,
					projectKey : $scope.dataModel.chartDetailsObj.projKey,
					projContKey : $scope.dataModel.chartInputDetails.projContentKey,
					busFuncVenKey : $scope.dataModel.chartInputDetails.busFuncVenKey,
			}

			if(dataServiceModel.isReadOnly && $scope.dataModel.chartDetailsObj.busFuncKey=='6' && $scope.dataModel.chartDetailsObj.chartStatus=="INPROGRESS" && rootData.currentRole == 'SUP'){
				encounterInputInfo.isCompleted	= 'N';
			}else if(dataServiceModel.isReadOnly && $scope.dataModel.chartDetailsObj.chartStatus!="INPROGRESS"){
				encounterInputInfo.isCompleted	= 'Y';
			}
			
			$http.post('/gcm-app-services/codingqa/worklist/getCodingQaEncounterDx', encounterInputInfo).then(function(response) {
				$scope.showCodingQALoadingDialog = false;
				if (response && response.data && response.data.result) {
					var savedEncounters = response.data.result.codingQAEncDxDetailsList;
					var calendarObj = {
							enableValidation : true,
							iconCalendar : true,
							dateText : ''
					};
					angular.forEach(savedEncounters,function(obj,idx){
						obj.qaDOSThruDateObj = new Date(obj.qaDOSThruDate);
						obj.qaDOSFromDateObj = new Date(obj.qaDOSFromDate);
						obj.qaDosFromDateCalendarViewModel = angular.copy(calendarObj);
						obj.qaDosFromDateCalendarViewModel.dateText = obj.qaDOSFromDate;
						obj.qaDosThruDateCalendarViewModel = angular.copy(calendarObj);
						obj.qaDosThruDateCalendarViewModel.dateText = obj.qaDOSThruDate;
						if(!obj.qaEncComments){
							obj.qaEncComments = "";
						}
						obj.provName =  $scope.dataModel.chartDetailsObj.provName;
						angular.forEach(obj.codingQaDxDetails,function(v,k){
							if(!v.qaDxEoCode.label) v.qaDxEoCode.label='';
							if(!v.qaDxEoCode.value) v.qaDxEoCode.value='';
						});
						obj.eoCodeList = angular.copy($scope.encEoObjList);
						 if (obj.qaEoKeyListResponse && obj.qaEoKeyListResponse.length > 0) {
							 angular.forEach(obj.eoCodeList, function(eoCodeObj, key) {
								 angular.forEach(obj.qaEoKeyListResponse, function(selectedEo, key1) {
									 if(eoCodeObj.value == selectedEo) {
										 eoCodeObj.ticked = true; 
										 var eoObj = {};
										 eoObj.value = eoCodeObj.value;
										 eoObj.label = eoCodeObj.label;
										 if(!obj.qaEoKeyList) 
											 obj.qaEoKeyList=[];
										 obj.qaEoKeyList.push(eoObj);
									 }
								 });
							 });		  
						}
					})
					
							
					$scope.savedEncountersTableViewModel.records = savedEncounters;
					$scope.savedEncountersTableViewModel.totalRecordsCount = savedEncounters.length;
					$scope.savedEncountersTableViewModel.originalRecords = angular.copy(savedEncounters);
				} else {
					$scope.savedEncountersTableViewModel.records = [];
					$scope.savedEncountersTableViewModel.totalRecordsCount = 0;
				}
			}, function(error) {
				$scope.showCodingQALoadingDialog = false;
			});
		};

		function setErrorMessage(message){
			$scope.dialogErrorMessageModel.visible = false;
			$scope.savedEncountersTableViewModel.errorMessageModel.messageType = 'error';
			$scope.savedEncountersTableViewModel.errorMessageModel.content = '<span>'+message+'</span>';
			$scope.savedEncountersTableViewModel.errorMessageModel.visible = true;
			$scope.errorMessageModel = $scope.savedEncountersTableViewModel.errorMessageModel;
		}
		
		function setDialogErrorMessage(message){
			$scope.savedEncountersTableViewModel.errorMessageModel.visible = false;
			$scope.dialogErrorMessageModel.messageType = 'error';
			$scope.dialogErrorMessageModel.content = '<span>'+message+'</span>';
			$scope.dialogErrorMessageModel.visible = true;
		}
		
		function updateChartStatus(closeQAUI){
			$scope.dataModel.chartInputInfo.currentSessionId = dataServiceModel.currentSessionId;
			$http.post('/gcm-app-services/coding/workflow/updateChartStatus',$scope.dataModel.chartInputInfo).then(function(response) {
				if (response && response.data && response.data.result){
					//alert("Chart Status Updated");
				}
				if(closeQAUI){
					$scope.closeImage();
					lookupService.url = 'codingQAWorklisttabs.html';
				}
			},function(error) {

			});
		}

		function getChartDetails(){
			$http.post('/gcm-app-services/coding/workflow/getChartDetails',$scope.dataModel.chartInputDetails).then(function(response) {
				if (response && response.data && response.data.result){
					$scope.dataModel.chartDetailsObj = response.data.result;
					dataServiceModel.currentSessionId =  response.data.result.currentSessionId;
					$scope.dataModel.chartInputInfo = {
							projContentKey	: dataServiceModel.selectedChart.projContentKey,
							busFuncVenKey	: dataServiceModel.selectedChart.busFuncVenKey,
							projKey			: $scope.dataModel.chartDetailsObj.projKey,
							busFuncKey		: 6,
							toBusFuncStatus	: "INPROGRESS",
							requestedUserId	: $scope.dataModel.loginUserId,
							userKey			: $scope.dataModel.loginUserKey,
							reasonCode		: "",
							eventType		: 'OPEN',
							currentSessionId : dataServiceModel.currentSessionId
					};

					dataServiceModel.worklistActivityKey = response.data.result.workId;
					$scope.dataModel.chartInputInfo.worklistActivityKey = response.data.result.workId;
					
					if($scope.dataModel.chartDetailsObj.chartStatus == 'ASSIGNED'){
						updateChartStatus(false);
					}else{
						$scope.logCoderProdEvent('OPEN');
					}
					$scope.icdCodesTableViewModel.busSegment = $scope.savedEncountersTableViewModel.busSegment = $scope.dataModel.chartDetailsObj.busSegment;
					if($scope.dataModel.chartDetailsObj.busSegment === 'MCAID'){
						$scope.icdCodesTableViewModel.columns[1].showColumnInTable = false;
						$scope.icdCodesTableViewModel.columns[2].showColumnInTable = false;
					}else if($scope.dataModel.chartDetailsObj.busSegment === 'ACA'){
						$scope.icdCodesTableViewModel.columns[2].showColumnInTable = false;
					}
					if(!$scope.dataModel.chartDetailsObj.contentEoKey){
						$scope.dataModel.checkboxValue = 'N'
					}else{
						$scope.dataModel.checkboxValue = $scope.dataModel.chartDetailsObj.contentEoKey.indexOf('D05') > 0 ? 'Y' : 'N';
					}
					if($scope.savedEncountersTableViewModel.renderingProviderMatchList){
						$scope.savedEncountersTableViewModel.renderingProviderMatchList[1].label = response.data.result.provName;
					}
					$scope.getEncAndDxEoCodes();
					$scope.openImage();
					getEncounters();
				}
			});
		}
		
		 $scope.logCoderProdEvent = function(eventType){
			 $scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
			 $scope.dataModel.chartInputInfo.eventType = eventType;
			 
			 if(dataServiceModel.selectedChart && ! dataServiceModel.selectedChart.busFuncKey){
				 dataServiceModel.selectedChart.busFuncKey = $scope.dataModel.chartInputDetails.busFuncKey;
			 }
			 
			CordysRoot.recordEvent(eventType).done(function(response){
			 		$scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
			}).fail(function(response){
					$scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
					 $scope.dataModel.setErrorMessage("Error: Failed to record " + eventType + " event ");
			});
			 
		/*	 $http.post('/gcm-app-services/coding/workflow/makeEntryforCoderProductivity',$scope.dataModel.chartInputInfo).then(function(response) {
				$scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
			 },function(error) {
				 $scope.showCodingUILoadingDialog = !$scope.showCodingUILoadingDialog;
				 $scope.dataModel.setErrorMessage("Error: Failed to Update Chart Status");
			 });
			 */
		 }
		
		$scope.getEncAndDxEoCodes = function() {
			return $q.all([

				$http.post('/gcm-app-services/coding/workflow/getEncEoCodes', $scope.dataModel.chartInputDetails.projContentKey)
				.then(function(response) {
					if (response && response.data && response.data.result) {
						$scope.encEoObjList = [];
						for (var i = 0; i < response.data.result.length; i++) {
							var record = response.data.result[i];
							if (record.gcmGroupKey == $scope.dataModel.chartDetailsObj.projOrgGroup) {
								var eoObj = {};
								eoObj.value = record.gcmEoKey;
								eoObj.label = record.gcmEoDesc;
								eoObj.ticked = false;
								$scope.encEoObjList.push(eoObj);
								$scope.savedEncountersTableViewModel.eoCodeList.push(eoObj);
							}
						}
					}
				}),

				$http.post('/gcm-app-services/coding/workflow/getDxLevelEoCodes', $scope.dataModel.chartInputDetails.projContentKey)
				.then(function(response) {
					if (response && response.data && response.data.result) {
						$scope.dataModel.dxLevelEoCodeLst = [ emptyEo ];
						for (var i = 0; i < response.data.result.length; i++) {
							var record = response.data.result[i];
							if (record.gcmGroupKey == $scope.dataModel.chartDetailsObj.projOrgGroup) {
								$scope.dataModel.dxLevelEoCodeLst.push(record);
								var eoObj = {};
								eoObj.value = record.gcmEoKey;
								eoObj.label = record.gcmEoDesc;
								$scope.dataModel.dxLevelEoCodeLst[record.gcmEoKey] = eoObj;
								$scope.savedEncountersTableViewModel.eoCodeForDXCodeTableList.push(eoObj);
							}
						}
					}
				}) ]);
		};
		getChartDetails();
		/*$scope.getEncAndDxEoCodes().then(function() {
			getChartDetails();
		});*/
		
		$scope.savedEncountersTableViewModel = savedEncountersTableViewModel;
		
		$scope.savedEncountersTableViewModel.isReadOnly = dataServiceModel.isReadOnly;
		
		
		$scope.savedEncountersTableViewModel.errorMessageModel = {
				id : 'Error',
				messageType : 'error',
				content : '',
				visible : false,
				headingLevel : '2',
				closeButton : true
		};
		
		
		$scope.savedEncountersTableViewModel.successMessageModel = {
				id : 'QASuccessMsg',
				messageType : 'success',
				content : '',
				visible : false,
				headingLevel : '2',
				closeButton : true
		};
		
		$scope.savedEncountersTableViewModel.onEncounterActionClick = function(event, record, index, oldEncAction)
		{
			if(record.qaEncActionCd != $scope.dataModel.prevEncAction){
				
				if(!$scope.selectedRowEoCodeList || $scope.selectedRowEoCodeList.length == 0){
					$scope.selectedRowEoCodeList = angular.copy(record.qaEoKeyList);
				}else{
					if ($scope.selectedRowEoCodeList && $scope.selectedRowEoCodeList.length > 0) {
						 angular.forEach(record.eoCodeList, function(eoCodeObj, key) {
							 angular.forEach($scope.selectedRowEoCodeList, function(selectedEo, key1) {
								 if(eoCodeObj.value == selectedEo.value) {
									 eoCodeObj.ticked = true; 
								 }
							 });
						 });		  
					}
				}
				$scope.dataModel.prevEncAction = oldEncAction;
			}	
		}

		$scope.savedEncountersTableViewModel.onEncounterActionChange = function(event, record, index) {

			if (record.qaEncActionCd == ''){
				$scope.savedEncountersTableViewModel.isNoDxEoSelectedForEdit = true;
				$scope.savedEncountersTableViewModel.showEditICDCodeTable = false;
				return;
			}
			else if (record.qaEncActionCd != '') {
				var orgRecord = angular.copy($scope.savedEncountersTableViewModel.originalRecords[index]);
				if (record.qaEncActionCd != 'MODIFY'){					
					record.qaDOSFromDate = orgRecord.coderDOSFromDate;
					record.qaDOSThruDate = orgRecord.coderDOSThruDate;
					record.qaPageNum = orgRecord.coderPageNum;
					record.qaProvFirstName = orgRecord.coderProvFirstName;
					record.qaProvLastName = orgRecord.coderProvLastName;
					record.qaProvNPI = orgRecord.coderProvNPI;
					record.qaRetProvFlag = orgRecord.coderRetProvFlag;
					//record.qaEoCode = orgRecord.coderEoCode;
					record.qaEoKeyList = [];
					if(record.coderEoKeyList){
						for(var i =0; i < record.coderEoKeyList.length;i++){
							for(var j = 0; j < $scope.encEoObjList.length; j++ ){
								if($scope.encEoObjList[j].value ==record.coderEoKeyList[i]){
								var eoObj = {};
								eoObj.value = record.value;
								eoObj.label = record.label;
								record.qaEoKeyList.push($scope.encEoObjList[j]);
								}
							}
						}
					}
				}else{
					record.qaPageNum = orgRecord.qaPageNum;
					record.qaDOSFromDate = orgRecord.qaDOSFromDate;
					record.qaDOSThruDate = orgRecord.qaDOSThruDate;
					record.qaPageNum = orgRecord.qaPageNum;
					record.qaProvFirstName = orgRecord.qaProvFirstName;
					record.qaProvLastName = orgRecord.qaProvLastName;
					record.qaProvNPI = orgRecord.qaProvNPI;
					record.qaRetProvFlag = orgRecord.qaRetProvFlag;
					//record.qaEoCode = orgRecord.qaEoCode;
					record.qaEoKeyList = orgRecord.qaEoKeyList;
				}
				/*if(record.qaEoCode && !record.qaEoCode.value){
				record.qaEoCode.value = '';
			}*/
			
			/*if(record.qaEoCode.value && (record.qaEoCode.value.indexOf('C06') > 0 || record.qaEoCode.value.indexOf('D04') > 0)){
				$scope.savedEncountersTableViewModel.showEditICDCodeTable = false;
				$scope.savedEncountersTableViewModel.isNoDxEoSelectedForEdit = true;
				record.qaEoCode.value = record.qaEoCode.value;
			}else{
				$scope.savedEncountersTableViewModel.showEditICDCodeTable = true;
				$scope.savedEncountersTableViewModel.isNoDxEoSelectedForEdit = false;
				record.qaEoCode.value = record.qaEoCode.value;
			}*/
				selectedEoRecords = [];
				angular.forEach(record.qaEoKeyList, function(value, key){
					var eoObj = {};
					eoObj.value = value.value;
					eoObj.label = value.label;
					selectedEoRecords.push(eoObj);
				});
				
				if(this.records[index].open){
					var codingQaDxDetails = record.codingQaDxDetails;
					var dxCodesToDisplay = [];
					for (var i = 0; i < codingQaDxDetails.length; i++) {
						if($scope.deletedDXCodes.indexOf(codingQaDxDetails[i].qaICDDxCode) > -1){
							continue;
						}
						dxCodesToDisplay.push(codingQaDxDetails[i]);
						if(record.qaEncActionCd == 'NOT VALID' && codingQaDxDetails[i].qaDxActionCd == 'NEW'){
							record.qaEncActionCd = $scope.dataModel.prevEncAction;
							$scope.savedEncountersTableViewModel.isNoDxEoSelectedForEdit = false;
							$scope.savedEncountersTableViewModel.showEditICDCodeTable = true;
							setErrorMessage("Delete added DX codes to change encounter action to not valid");
							return;
						}
						if(record.qaEncActionCd == 'VALID' && (codingQaDxDetails[i].qaDxActionCd == 'NEW')){
							record.qaEncActionCd = $scope.dataModel.prevEncAction;
							$scope.savedEncountersTableViewModel.isNoDxEoSelectedForEdit = false;
							$scope.savedEncountersTableViewModel.showEditICDCodeTable = true;
							setErrorMessage("Delete added DX codes to change encounter action to valid");
							return;
						}
						if (record.qaEncActionCd == 'NOT VALID' && codingQaDxDetails[i].qaDxActionCd != 'NEW') {
							codingQaDxDetails[i].qaDxActionCd = 'NOT VALID';
						}else if(codingQaDxDetails[i].qaDxActionCd != 'NEW'){
							codingQaDxDetails[i].qaDxActionCd = '';
						}
					}
					
					this.subTableViewModel.records = dxCodesToDisplay;
					this.subTableViewModel.totalRecordsCount =  dxCodesToDisplay.length;
					this.subTableViewModel.expandedRow.qaEncActionCd = record.qaEncActionCd;
					return;
				}
				
				$scope.savedEncountersTableViewModel.showEditICDCodeTable = true;
				$scope.savedEncountersTableViewModel.isNoDxEoSelectedForEdit = false;
				if(record.qaEoKeyList && record.qaEoKeyList.length>0){
					for(var i=0;i<record.qaEoKeyList.length;i++){
						if(record.qaEoKeyList[i].value && (record.qaEoKeyList[i].value.indexOf('C06') > 0 ||record.qaEoKeyList[i].value.indexOf('D04') > 0)){
							$scope.savedEncountersTableViewModel.isNoDxEoSelectedForEdit = true;
							$scope.savedEncountersTableViewModel.showEditICDCodeTable = false;
							break;
						}
					}
				}
			}
			this.onRowSelect(event, record, index, true);
		}
		
		$scope.savedEncountersTableViewModel.onRendProvMatchChange = function(record, index) {
			var origRec = angular.copy($scope.savedEncountersTableViewModel.originalRecords[index]);
			if (record.qaRetProvFlag == 'N') {
				record.qaProvNPI = '';
				record.qaProvFirstName = '';
				record.qaProvLastName = '';
			}else {
				record.qaProvNPI = origRec.qaProvNPI;
				record.qaProvFirstName = origRec.qaProvFirstName;
				record.qaProvLastName = origRec.qaProvLastName;
			}
		}
		$scope.savedEncountersTableViewModel.onRowSelect = function(event, record, index, isFromQAEncActionCd) {
			if (!isFromQAEncActionCd
					&& (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT' || event.target.tagName === 'OPTION'
						|| event.target.className == 'cux-icon-edit' || event.target.className == 'cux-icon-trash_delete')){
				return;
			}
	/*		angular.forEach($scope.savedEncountersTableViewModel.selectedQaEo, function(value, key){
			if(value.value && (value.value.indexOf('C06') > 0 ||value.value.indexOf('D04') > 0)){
				$scope.savedEncountersTableViewModel.showEditICDCodeTable = false;
				$scope.savedEncountersTableViewModel.isNoDxEoSelectedForEdit = true;
			}else{
				$scope.savedEncountersTableViewModel.showEditICDCodeTable = true;
				$scope.savedEncountersTableViewModel.isNoDxEoSelectedForEdit = false;
			}
			});*/
			selectedEoRecords = [];
			var flag=false;
			if(record.qaEoKeyList && record.qaEoKeyList.length>0){
				for(var i=0;i<record.qaEoKeyList.length;i++){
					if(record.qaEoKeyList[i].value && (record.qaEoKeyList[i].value.indexOf('C06') > 0 ||record.qaEoKeyList[i].value.indexOf('D04') > 0)){
						flag=true;
						break;
					}
				}
			}
			if(flag){
				$scope.savedEncountersTableViewModel.isNoDxEoSelectedForEdit = true;
				$scope.savedEncountersTableViewModel.showEditICDCodeTable = false;
			}
			else{
				$scope.savedEncountersTableViewModel.showEditICDCodeTable = true;
				$scope.savedEncountersTableViewModel.isNoDxEoSelectedForEdit = false;
			}
			if (this.pagination.currentPageNumber != this.expandedRowObj.pageNo)
				this.expandedRowObj.index = -1;

			if (this.expandedRowObj.index === -1 || index === this.expandedRowObj.index) {
				this.expandedRowObj.index = index;
				this.expandedRowObj.pageNo = this.pagination.currentPageNumber;
				this.records[index].open = !this.records[index].open;
				if (!this.records[index].open) {
					$scope.deletedDXCodes = [];
					this.subTableViewModel.records = [];
					this.subTableViewModel.totalRecordsCount = 0;
					this.expandedRowObj.index = -1;
				}else{
					var codingQAdexDetl = this.records[index].codingQaDxDetails ? this.records[index].codingQaDxDetails: [];
					$scope.deletedDXCodes = [];
					for(var i = 0; i < codingQAdexDetl.length; i ++){
						if(record.qaEncActionCd == 'NOT VALID' && this.records[index].codingQaDxDetails[i].qaDxActionCd == 'NEW'){
							record.qaEncActionCd = $scope.dataModel.prevEncAction;
							setErrorMessage("Delete added DX codes to change encounter action to not valid");
							return;
						}
						if(record.qaEncActionCd == 'NOT VALID'){
							this.records[index].codingQaDxDetails[i].qaDxActionCd = 'NOT VALID';
						}						
					}
				}
				$scope.savedEncountersTableViewModel.currentRecord = record;
			} else {
				setErrorMessage('Collapse the open row before expanding another');
			}
			
		};
		
		$scope.deletedDXCodes = [];
		
		$scope.finalDxRecords =[];
		
		$scope.savedEncountersTableViewModel.handleDeleteDxCode = function(dxRecords, record, index){
			for(var i =0; i < dxRecords.length; i ++){
				if(dxRecords[i].qaICDDxCode == record.qaICDDxCode){
					$scope.deletedDXCodes.push(record.qaICDDxCode);
					dxRecords.splice(i,1);
				}
				else
					$scope.finalDxRecords.push(dxRecords[i]);
			}
		}

		function validateQaEnc(record) {
			if(!record.qaEncActionCd){
				setErrorMessage('Choose a valid encounter action');
				return false;
			}
			if (record.qaEncActionCd == 'MODIFY') {
				if (record.qaDosFromDateCalendarViewModel.invalid || record.qaDosThruDateCalendarViewModel.invalid)
					return false;

				if (record.qaDosFromDateCalendarViewModel.dateText != '' && record.qaDosThruDateCalendarViewModel.dateText != ''
					&& (record.qaDOSFromDateObj > record.qaDOSThruDateObj)) {
					setErrorMessage("From date cannot be beyond through date");
					return false;
				} else if (record.qaDosFromDateCalendarViewModel.dateText != '' && record.qaDosThruDateCalendarViewModel.dateText != ''
					&& (record.qaDOSFromDateObj > new Date() || record.qaDOSThruDateObj > new Date())) {
					setErrorMessage("Date cannot be beyond current date");
					return false;
				}

				if (record.qaDosFromDateCalendarViewModel.dateText == '' && record.qaDosThruDateCalendarViewModel.dateText == '') {
					setErrorMessage("From/Through date is mandatory");
					return false;
				} else if (record.qaDosThruDateCalendarViewModel.dateText == '') {
					setErrorMessage("Through date is mandatory");
					return false;
				} else if (record.qaDosFromDateCalendarViewModel.dateText == '') {
					setErrorMessage("From date is mandatory");
					return false;
				}
				var diffDays = 0;
				if(record.qaDosFromDateCalendarViewModel.dateText && record.qaDosThruDateCalendarViewModel.dateText)
				{
					var diffMilliSecs = record.qaDOSThruDateObj - record.qaDOSFromDateObj;
					diffDays = parseInt(diffMilliSecs / (1000 * 60 * 60 * 24));
				}
				if(diffDays >= 30){
					setErrorMessage("Date span cannot be greater than 30 days");
					return false;
				}
				if(record.qaPageNum == '' || record.qaPageNum.trim().length == 0){
					setErrorMessage('Page # is mandatory');
					return false;
				}
				if(!validatePageNumber(record.qaPageNum)){
					setErrorMessage('The page # you entered is not valid');
					return false;
				}
				if (!record.qaRetProvFlag){
					setErrorMessage("Rendering provider is required");
					return false;			
				}
				
				if(record.qaRetProvFlag == "N" &&  $scope.dataModel.chartDetailsObj.busSegment == "MCAID" 
					&& (typeof(record.qaProvFirstName) == "undefined" || record.qaProvFirstName == "" || record.qaProvFirstName.trim().length == 0|| record.qaProvFirstName == null 
							|| typeof(record.qaProvLastName)=="undefined" || record.qaProvLastName == "" || record.qaProvLastName == null || record.qaProvLastName.trim().length == 0))
				{
					setErrorMessage("When the rendering provider match is 'Other', the provider's first and last name are required");
					return false;
				}
				if(record.qaRetProvFlag == "N" )
				{
					if(record.qaProvLastName)
					{
						if ( ! validateProperties(record.qaProvLastName, '[a-zA-Z- ]', '[^a-zA-Z- ]') ){
							setErrorMessage("Last name contains characters that cannot be accepted");
						   return false;
						}
						if ( record.qaProvLastName && record.qaProvLastName.length > 50 ){
							setErrorMessage("Please enter last name value less than 50 characters");
							return false;
						}
					}
					else{
						if ( $scope.dataModel.chartDetailsObj.busSegment == "MCAID")
						{
							setErrorMessage("Record not saved. Rendering provider last name is required when business segment = Medicaid");
							return false;
						}
					}
						
					if(record.qaProvFirstName)
					{
						if ( ! validateProperties(record.qaProvFirstName, '[a-zA-Z- ]', '[^a-zA-Z- ]') ){
							setErrorMessage("First name contains characters that cannot be accepted");
						   return false;
						}
						if ( record.qaProvFirstName && record.qaProvFirstName.length > 50 ){
							setErrorMessage("Please enter first name value less than 50 characters");
							return false;
						}
					}else{
						if ( $scope.dataModel.chartDetailsObj.busSegment == "MCAID")
						{
							setErrorMessage("Record not saved. Rendering provider first name is required when business segment = Medicaid");
							return false;
						}
					}
						
					if(record.qaProvNPI)
					{
						if ( ! validateProperties(record.qaProvNPI, '[0-9]', '[^0-9]') ){
							setErrorMessage("NPI contains characters that cannot be accepted");
						   return false;
						}
						if ( record.qaProvNPI && record.qaProvNPI.length != 10 ){
							setErrorMessage("Please enter NPI value 10 characters");
							return false;
						}
					}else if($scope.isOptumCoding()){
						setErrorMessage("NPI is required");
						return false;
					}
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
		
		var validatePageNumber = function(pageNumberString){
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
		
		$scope.savedEncountersTableViewModel.saveSubTableRecord = function(record) {
			if(record.qaEncActionCd != 'NOT VALID' && $scope.dataModel.checkboxValue == 'Y'){
				setErrorMessage('Encounter cannot be saved when the NO DOS checkbox is selected.  Please deselect the checkbox.');
				return;
			}
			var isNoDXEoSelected = false;
			if(!validateQaEnc(record))
				return;
			
			var subTableRecords = $scope.savedEncountersTableViewModel.subTableViewModel.records;
			var recordsWithICDcodes = [];
			var isEncCommentsRequired = false;
			var noOfNotValidDx = 0;
			var noOfValidRecords = 0;
			
		/*	if(record.qaEoCode.value && (record.qaEoCode.value.indexOf('C06') > 0 || record.qaEoCode.value.indexOf('D04') > 0)){
				isNoDXEoSelected = true;
			}*/
			if(record.qaEncActionCd=='NEW' || record.qaEncActionCd=='MODIFY'){
			selectedEoRecords = [];
			if(record.qaEoKeyList && record.qaEoKeyList.length >0){
				angular.forEach(record.qaEoKeyList, function(value, key){
					var eoObj = {};
					eoObj.value = value.value;
					eoObj.label = value.label;
					selectedEoRecords.push(eoObj);
				 });
			  }
			}
			if(record.qaEoKeyList && record.qaEoKeyList.length>0){
				for(var i=0;i<record.qaEoKeyList.length;i++){
					if(record.qaEoKeyList[i].value && (record.qaEoKeyList[i].value.indexOf('C06') > 0 ||record.qaEoKeyList[i].value.indexOf('D04') > 0)){
						isNoDXEoSelected=true;
						break;
					}
				}
			}
			
			if(!isNoDXEoSelected){
				if(subTableRecords.length > 0){
					var isIcdCodePresent = false;
					for (var i = 0; i < subTableRecords.length; i++) {
						if(subTableRecords[i].qaDxActionCd != 'VALID' && subTableRecords[i].qaDxActionCd != 'NOT VALID' && subTableRecords[i].qaDxActionCd != 'MODIFY' && subTableRecords[i].qaDxActionCd != 'NEW'){ 
							setErrorMessage('Choose a valid DX action for each record');
							return;
						}
						if(record.qaEncActionCd != 'NOT VALID' && subTableRecords[i].qaDxActionCd == 'NOT VALID'){
							noOfNotValidDx ++;
						}
						if(record.qaEncActionCd == 'NOT VALID' && subTableRecords[i].qaDxActionCd == 'NEW'){
							setErrorMessage("Delete added DX codes to save encounter encounter action as not valid");
							return;
						}
						if(subTableRecords[i].qaDxActionCd != 'VALID' || record.qaEncActionCd != 'VALID'){
							isEncCommentsRequired = true;
						}
						if(record.qaEncActionCd == 'MODIFY' && subTableRecords[i].qaDxActionCd == 'VALID'){
							noOfValidRecords++;
						}
						if(!subTableRecords[i].qaICDDxCode && subTableRecords[i].qaDxActionCd == 'MODIFY'){
							setErrorMessage("Enter valid DX code/Choose action code as not valid");
							return;
						}
						if(subTableRecords[i].qaDxActionCd == 'MODIFY' && !(subTableRecords[i].qaICDDxCode != subTableRecords[i].coderICDDxCode || subTableRecords[i].coderDxEoCode.value != subTableRecords[i].qaDxEoCode.value)){
							setErrorMessage('Selected DX action is not appropriate');
							return;
						}
						if(subTableRecords[i].qaICDDxCode){
							recordsWithICDcodes.push(subTableRecords[i]);
							isIcdCodePresent = true;
						}
					}
					if(!isIcdCodePresent){
						setErrorMessage("Save encounter failed: As there is no DX code entered or no non codeable EO code selected");
						return;
					}
				}else{
					setErrorMessage("Save encounter failed: As there is no DX code entered or no non codeable EO code selected");
					return;
				}
				
			}else{
				for(var i = 0; i < subTableRecords.length; i++){
					if(subTableRecords[i].qaICDDxCode){
						subTableRecords[i].qaDxActionCd = 'NOT VALID';
						recordsWithICDcodes.push(subTableRecords[i]);
					}
				}
			}	
			/*if(noOfNotValidDx > 0 && noOfNotValidDx == subTableRecords.length && (!record.qaEoCode.value || !isNoDXEoSelected)){
				setErrorMessage('Choose a valid DX action for each record');
				return;
			}*/
			/*var validDXactionFlag = false;
			if(record.qaEoKeyList){
				for(var i=0;i<record.qaEoKeyList.length;i++){
					if(record.qaEoKeyList[i].value && (record.qaEoKeyList[i].value.indexOf('C06') > 0 ||record.qaEoKeyList[i].value.indexOf('D04') > 0)){
						validDXactionFlag=true;
						break;
					}
				}
			}*/
			if(!record.qaEoKeyList) record.qaEoKeyList=[];
			if(noOfNotValidDx > 0 && noOfNotValidDx == subTableRecords.length&& record.qaEoKeyList && (!record.qaEoKeyList.length || !isNoDXEoSelected)){
				setErrorMessage('Choose a valid DX action for each record');
				return;
			}
			if(!isEncCommentsRequired && record.qaEncActionCd != 'VALID'){
				isEncCommentsRequired = true;
			}
			
			if(isEncCommentsRequired && (!record.qaEncComments || record.qaEncComments.trim().length == 0)){
				setErrorMessage('Encounter comments required if encounter/DX action other than valid');
				return;
			}
			
			if(record.qaEncActionCd == 'MODIFY'){
				var flag = true;
				var flagMismatch = true;
				if(record.qaEoKeyList && !record.coderEoKeyList) flag=false;
				else if(!record.qaEoKeyList && record.coderEoKeyList) flag = false;
				else{
				if(record.qaEoKeyList && record.qaEoKeyList.length>=0 && record.coderEoKeyList && record.coderEoKeyList.length>=0){
				if(record.qaEoKeyList.length ==record.coderEoKeyList.length){
					for(var i = 0;i<record.qaEoKeyList.length;i++){
							for(var j = 0;j<record.coderEoKeyList.length;j++){
								if(record.coderEoKeyList[i] !== record.qaEoKeyList[j].value){
										flagMismatch = false;
										break;
								}
							}
							if(!flagMismatch){
								flag =false;
								break;
							}
						}
					}
				else
					flag =false;
					}
				}
				
				if((record.qaDosFromDateCalendarViewModel && record.coderDOSFromDate == record.qaDosFromDateCalendarViewModel.dateText )
						&& (record.qaDosThruDateCalendarViewModel && record.coderDOSThruDate == record.qaDosThruDateCalendarViewModel.dateText )
						&& record.coderPageNum == record.qaPageNum &&/* record.coderEoCode.value == record.qaEoCode.value*/ flag && record.coderRetProvFlag == record.qaRetProvFlag
						&& record.coderProvFirstName == record.qaProvFirstName && record.coderProvLastName == record.qaProvLastName && record.coderProvNPI == record.qaProvNPI){
					setErrorMessage('Selected encounter action is not appropriate');
					return;
				}
				record.qaDOSFromDate = record.qaDosFromDateCalendarViewModel ? record.qaDosFromDateCalendarViewModel.dateText : record.qaDOSFromDate;
				record.qaDOSThruDate = record.qaDosThruDateCalendarViewModel ? record.qaDosThruDateCalendarViewModel.dateText : record.qaDOSThruDate;
			}else if(record.qaEncActionCd !== 'MODIFY' && record.qaEncActionCd !== 'NEW'){
				selectedEoRecords = [];
				if(record.coderEoKeyList){
					for(var i =0; i < record.coderEoKeyList.length;i++){
						for(var j = 0; j < $scope.encEoObjList.length; j++ ){
							if(record.coderEoKeyList[i] == $scope.encEoObjList[j].value){
								selectedEoRecords.push($scope.encEoObjList[j]);
								//break;
							}
						}
					}
				}
			}			
			//validate DXCodes
			if(isNoDXEoSelected || (!isNoDXEoSelected && validateDXCodesForEditEnc(recordsWithICDcodes))){
				var comments = record.qaEncComments.replace(/[\n\r]/g, ' ');
				var coderEncKey = record.coderEncounterKey ? record.coderEncounterKey : '';
				var codingQAEncDxWrapper = {
						loginUserKey			: 	$scope.dataModel.loginUserKey,
						loginUserId				:	$scope.dataModel.loginUserId,
						groupKey				:	$scope.dataModel.currentGroupKey,
						projectKey				:	$scope.dataModel.chartDetailsObj.projKey,
						projContKey				:	$scope.dataModel.chartInputDetails.projContentKey,
						busFuncVenKey			:	$scope.dataModel.chartInputDetails.busFuncVenKey,
						codingQAEncDxDetailsList:[	{
								coderDOSFromDate	: 	record.coderDOSFromDate,
								coderDOSThruDate	: 	record.coderDOSThruDate,
								coderEncounterKey	:	record.coderEncounterKey,
								/*coderEoCode			:	{
									value			:	record.coderEoCode.value ? record.coderEoCode.value : '',
									label			:	record.coderEoCode.label ? record.coderEoCode.label : '' 
								},	*/
								coderPageNum		:	record.coderPageNum,
								coderProvFirstName	:	record.coderProvFirstName,
								coderProvLastName	:	record.coderProvLastName,
								coderProvNPI		:	record.coderProvNPI,
								coderRetProvFlag	:	record.coderRetProvFlag,
								qaEncounterKey		:	record.qaEncounterKey ? record.qaEncounterKey : '',
								qaDOSFromDate		:	record.qaDOSFromDate,
								qaDOSThruDate		:	record.qaDOSThruDate,
								qaPageNum			:	record.qaPageNum,
								qaRetProvFlag		:	record.qaRetProvFlag,
								qaProvNPI			:	record.qaProvNPI,
								qaProvFirstName		:	record.qaProvFirstName,
								qaProvLastName		:	record.qaProvLastName,
								qaEncActionCd		:	record.qaEncActionCd,
								qaEncComments		:	comments,
								//qaEoCode			:	{label:'',value:''},
								qaEoKeyList         :   selectedEoRecords,
								codingQaDxDetails	:	recordsWithICDcodes,
								//coderEoKeyList      :   [] 
						}]
				};
				$scope.showCodingQALoadingDialog = true;
				$http.post('/gcm-app-services/codingqa/worklist/saveCodingQaResults', codingQAEncDxWrapper).then(function(response) {
					if (response && response.data && response.data.status == 'SUCCESS') {
						selectedEoRecords = [];
						$scope.savedEncountersTableViewModel.closeSubTableDialog(true);
						getEncounters();
						$scope.savedEncountersTableViewModel.errorMessageModel.messageType = 'success';
						$scope.savedEncountersTableViewModel.errorMessageModel.content = '<span>Encounter saved successfully</span>';
						$scope.savedEncountersTableViewModel.errorMessageModel.visible = true;
					} else {
						//selectedEoRecords = [];
						$scope.showCodingQALoadingDialog = false;
						setErrorMessage('Encounter save failed');
					}
				},function(error){
					//selectedEoRecords =[];
					$scope.showCodingQALoadingDialog = false;
					setErrorMessage('Encounter save failed');
				});
			}
			
		}
		
		var validateDXCodesForEditEnc = function(subTableRecords){
			var isValidDXCodesExist = false;
			if(subTableRecords.length > 0 && !$scope.isNoDxEoSelected){
				var dxCodes = subTableRecords;
				var duplicateDxCodes = {};
				var duplicateDxCodesString = "";
				var notValidDxCodesString = "";
				angular.forEach(dxCodes, function(value, key){
					if ( value &&  value.qaICDDxCode ){
						isValidDXCodesExist = true;
						if ( duplicateDxCodes[value.qaICDDxCode] ){
							if ( duplicateDxCodesString  != '' ) duplicateDxCodesString  += ",";
							duplicateDxCodesString  += value.qaICDDxCode;
						}else{
							duplicateDxCodes[value.qaICDDxCode] = value.qaICDDxCode;
						}
						if(value.errorCode && value.errorCode != ''){
							if(notValidDxCodesString.length > 0){
								notValidDxCodesString += ","+ value.qaICDDxCode; 
							}else{
								notValidDxCodesString += value.qaICDDxCode; 
							}
						}
					}
				});
				if (  duplicateDxCodesString  != '' ){
					setErrorMessage("Duplicate DX codes : " + duplicateDxCodesString);
					return false;
				}
				if(notValidDxCodesString != ""){
					setErrorMessage("ICD code not valid : " + notValidDxCodesString);
					return false;
				}
			}
			return true;
		}

		$scope.savedEncountersTableViewModel.closeSubTableDialog = function(isFromSave) {
			//$scope.dataModel.prevEncEO = {};
			$scope.dataModel.prevEncEO = [];
			$scope.dataModel.prevEncAction = {};
			$scope.deletedDXCodes = [];
			$scope.selectedRowEoCodeList = [];
			selectedEoRecords = [];
			var index = $scope.savedEncountersTableViewModel.expandedRowObj.index;
			if(index > -1 
					&& $scope.savedEncountersTableViewModel.records.length > index ){
				if(!isFromSave){
					$scope.savedEncountersTableViewModel.records[index] = angular.copy($scope.savedEncountersTableViewModel.originalRecords[index]);
				}
				$scope.savedEncountersTableViewModel.records[index].open = false;
			}
			$scope.savedEncountersTableViewModel.expandedRowObj = {
				index : -1,
				pageNo : -1
			};
		}
		
		$scope.savedEncountersTableViewModel.onQAICDCodeChange = function(record){
			var dxCode = record.qaICDDxCode;
			if(!dxCode && record.qaDxActionCd == 'MODIFY'){
				setErrorMessage("Enter valid DX code/Choose action code as not valid");
				return;
			}
			if (record.qaICDDxCode) {
				record.qaICDDxCode = dxCode.toUpperCase();
				//getHccAndRxHccByDX(record);
				var currentRowObj = $scope.savedEncountersTableViewModel.currentRecord;
				
				var memberDOB = new Date($scope.dataModel.chartDetailsObj.memberDOB);
				var birthYear = memberDOB.getFullYear();
				var birthMonth = memberDOB.getMonth();
				var birthDay = memberDOB.getDate();

				var fromYear = currentRowObj.qaDOSFromDateObj.getFullYear();
				var fromMonth = currentRowObj.qaDOSFromDateObj.getMonth();
				var fromDay = currentRowObj.qaDOSFromDateObj.getDate();

				var age = fromYear - birthYear;
				var ageMonth = fromMonth - birthMonth;
				var ageDay = fromDay - birthDay;
				if(age > 0 && (ageMonth < 0 || (ageMonth == 0 && ageDay < 0))){
					age = parseInt(age) -1;
				}

				$scope.addEncounterObj.isValidationInprogress = true;

				var dxCodedosDetailsObj = {
						icdDxCd 		: record.qaICDDxCode,
						dosThruDt		: currentRowObj.qaDosThruDateCalendarViewModel.dateText,
						dosFromDt		: currentRowObj.qaDosFromDateCalendarViewModel.dateText,
						busSegment	: $scope.dataModel.chartDetailsObj.busSegment,
						gender		: $scope.dataModel.chartDetailsObj.memberGender,
						dateOfBirth	: $scope.dataModel.chartDetailsObj.memberDOB,
						age			: age
				};
				$http.post('/gcm-app-services/coding/workflow/validateIcdCode', dxCodedosDetailsObj).then(function(response) {
					if (response && response.data && response.data.result) {
						if (response.data.result.errorCode) {
							setErrorMessage(response.data.result.icdDesc);
							record.icdDesc = response.data.result.icdDesc;							
							record.errorCode = response.data.result.errorCode;
							record.qaHccModelCatV22 = '';
							record.qaHccModelCatV23 = '';
							record.qaHccModelCatV24 = '';
							record.qaHccModelCatRx = '';
							record.qaHccModelCatHhs = '';
						} else {
							record.qaHccModelCatV22 = response.data.result.v22Hcc ? response.data.result.v22Hcc : response.data.result.hhs;
							record.qaHccModelCatV23 = response.data.result.v23Hcc ? response.data.result.v23Hcc : response.data.result.hhs;
							record.qaHccModelCatV24 = response.data.result.v24Hcc;
							record.qaHccModelCatRx = response.data.result.rxHcc;
							record.qaHccModelCatHhs = response.data.result.hhs;
							record.errorCode = '';
						}
					}
				},function(error) {
					setErrorMessage("Error:DX,age/gender validation failed");
				});
			} else {
				record.qaHccModelCatV22 = '';
				record.qaHccModelCatV23 = '';
				record.qaHccModelCatV24 = '';
				record.qaHccModelCatRx = '';
				record.icdDesc= '';
				record.errorCode = '';
			}
		}

		$scope.onAddRow = function(){
			var rows = {
				icdDxCd: '',
				v22Hcc:'',
				v23Hcc:'',
				v24Hcc:'',
				rxHcc:'',
				icdDesc:'',
				eoCode: ''
				};
			$scope.icdCodesTableViewModel.records.push(rows);
			$scope.icdCodesTableViewModel.totalRecordsCount = $scope.icdCodesTableViewModel.records.length;		
	 	}
		
		$scope.icdCodesTableViewModel = icdCodesTableViewModel;
		$scope.icdCodesTableViewModel.records = [];

		function initializeICDTableModel() {
			$scope.icdCodesTableViewModel.records = [];
			$scope.icdCodesTableViewModel.totalRecordsCount = 0;
			for (var i = 0; i < 5; i++) {
				$scope.icdCodesTableViewModel.records.push({
					idc10DxCodes : '',
					hcc : '',
					rxHCC : '',
					icdDxDescr : '',
					eoCode : ''
				});
				$scope.icdCodesTableViewModel.totalRecordsCount++;
			}
		};

		$scope.icdCodesTableViewModel.chartDetailsObj = $scope.dataModel.selectedChart;

		$scope.addEncounterObj = {
				showAddEncounterDialog : false
		};

		$scope.fromDateCalendarViewModel =  {
				enableValidation : true
		};

		$scope.throughDateCalendarViewModel = {
				enableValidation : true
		};
		
		$scope.isOptumCoding = function(){
			return $scope.dataModel.isInternalGroup;
		}
		
		$scope.dataModel.isOptumCoding = function(){
			return $scope.isOptumCoding();
		}
		
		$scope.fromDateChange = function(){
			initializeICDTableModel();
			if(dataServiceModel.selectedChart.programName == "CR"){
				$scope.addEncounterObj.throughDate = $scope.addEncounterObj.fromDate;				
			}
			if($scope.addEncounterObj.throughDate && !$scope.isNoDxEoSelected ){
				$scope.showICDCodeTable = true;
			}
		}
		
		$scope.displayICDCodeTable = function(){
			if($scope.addEncounterObj.throughDate && !$scope.isNoDxEoSelected ){
				initializeICDTableModel();
				$scope.showICDCodeTable = true;
			}
		}

		$scope.savedEncountersTableViewModel.editEncounter = function(record, index) {
			if($scope.savedEncountersTableViewModel.expandedRowObj.index > -1 && $scope.savedEncountersTableViewModel.expandedRowObj.index != index && $scope.savedEncountersTableViewModel.records[$scope.savedEncountersTableViewModel.expandedRowObj.index].open){
				setErrorMessage("To edit encounter, save or cancel changes");
				return;
			}
			$scope.addEncounterObj.showAddEncounterDialog = !$scope.addEncounterObj.showAddEncounterDialog;
			$scope.showICDCodeTable = true;
			$scope.fromDateCalendarViewModel.dateText = record.qaDosFromDateCalendarViewModel.dateText;
			$scope.throughDateCalendarViewModel.dateText = record.qaDosThruDateCalendarViewModel.dateText;
			$scope.addEncounterObj.pageNo = record.qaPageNum;

			if (record.qaRetProvFlag == 'Y')
				$scope.addEncounterObj.selectedRendProvMatch = $scope.savedEncountersTableViewModel.renderingProviderMatchList[1];
			else if (record.qaRetProvFlag == 'N')
				$scope.addEncounterObj.selectedRendProvMatch = $scope.savedEncountersTableViewModel.renderingProviderMatchList[2];
			else
				$scope.addEncounterObj.selectedRendProvMatch = $scope.savedEncountersTableViewModel.renderingProviderMatchList[0];
			
			$scope.addEncounterObj.npi = record.qaProvNPI;
			$scope.addEncounterObj.firstName = record.qaProvFirstName;
			$scope.addEncounterObj.lastName = record.qaProvLastName;
			$scope.addEncounterObj.qaEncComments = record.qaEncComments;
			var eoList = $scope.savedEncountersTableViewModel.eoCodeList;
			/*for(var i =0 ; i < eoList.length; i ++){
				if(record.qaEoCode.value == eoList[i].value){
					$scope.addEncounterObj.selectedEOCode = eoList[i];
				}
				if(record.qaEoCode.value && (record.qaEoCode.value.indexOf('C06') > 0 || record.qaEoCode.value.indexOf('D04') > 0)){
					$scope.showICDCodeTable = false;
				}
			}*/
			$scope.addEncounterObj.eoCodeList = angular.copy($scope.encEoObjList);
			angular.forEach($scope.addEncounterObj.eoCodeList, function(eoCodeObj, key) {
				 angular.forEach(record.qaEoKeyList, function(selectedEo, key1) {
					 if(eoCodeObj.value == selectedEo.value) {
						 eoCodeObj.ticked = true; 
					 }
				 });
			 });	
			 
			if(record.qaEoKeyList && record.qaEoKeyList.length>0){
				for(var i=0;i<record.qaEoKeyList.length;i++){
					if(record.qaEoKeyList[i].value && (record.qaEoKeyList[i].value.indexOf('C06') > 0 ||record.qaEoKeyList[i].value.indexOf('D04') > 0)){
						$scope.showICDCodeTable = false;
						break;
					}
				}
			}
			
			$scope.addEncounterObj.qaEncounterKey = record.qaEncounterKey;
			
			initializeICDTableModel();
			angular.forEach(record.codingQaDxDetails, function(obj, idx) {
				
				if (idx < 5) {
					$scope.icdCodesTableViewModel.records[idx].icdDxCd = obj.qaICDDxCode;
					$scope.icdCodesTableViewModel.records[idx].v22Hcc = obj.qaHccModelCatV22;
					$scope.icdCodesTableViewModel.records[idx].v23Hcc = obj.qaHccModelCatV23;
					$scope.icdCodesTableViewModel.records[idx].v24Hcc = obj.qaHccModelCatV24;
					$scope.icdCodesTableViewModel.records[idx].rxHcc = obj.qaHccModelCatRx;
					$scope.icdCodesTableViewModel.records[idx].icdDesc = obj.icdDesc;
					$scope.icdCodesTableViewModel.records[idx].eoCode = obj.qaDxEoCode.value ? obj.qaDxEoCode.value : '';
					$scope.icdCodesTableViewModel.records[idx].qaEncounterDXKey = obj.qaEncounterDXKey ? obj.qaEncounterDXKey : '';
					$scope.icdCodesTableViewModel.records[idx].qaEncounterKey	= obj.qaEncounterKey ? obj.qaEncounterKey : '';
				} else {
					var reqObj = {
							icdDxCd : obj.qaICDDxCode,
							v22Hcc : obj.qaHccModelCatV22,
							v23Hcc : obj.qaHccModelCatV23,
							v24Hcc : obj.qaHccModelCatV24,
							rxHcc : obj.qaHccModelCatRx,
							icdDesc : obj.icdDesc,
							eoCode : obj.qaDxEoCode ? obj.qaDxEoCode.value: '',
							qaEncounterDXKey : obj.qaEncounterDXKey ? obj.qaEncounterDXKey : '',
							qaEncounterKey	: obj.qaEncounterKey ? obj.qaEncounterKey : ''
					}
					
					$scope.icdCodesTableViewModel.records.push(reqObj);
				}
				$scope.icdCodesTableViewModel.totalRecordsCount++;
			});
			/*var encounterRecords = [];
			for(var i = 0; i < record.codingQaDxDetails.length; i++){
				 
				 var obj = record.codingQaDxDetails[i];
				 if(obj.qaICDDxCode){
					 if(!obj.qaDxEoCode || !obj.qaDxEoCode.value){
						 obj.qaDxEoCode.value = '';
					 }
					 var dxCodesRowTemplate = {
								icdDxCd : obj.qaICDDxCode,
								v22Hcc : obj.qaHccModelCatV22,
								rxHcc : obj.qaHccModelCatRx,
								icdDesc : obj.icdDesc,
								eoCode : obj.qaDxEoCode,
								qaEncounterDXKey : obj.qaEncounterDXKey ? obj.qaEncounterDXKey : '',
								qaEncounterKey	: obj.qaEncounterKey ? obj.qaEncounterKey : ''
					 }
					 encounterRecords.push(dxCodesRowTemplate);
				 }
			 }
			 var totalDxCodes = encounterRecords.length;
			 for(var i = totalDxCodes; i < 5; i++){
				 var dxCodesRowTemplate = {
						 idc10DxCodes : '',
						 hcc : '',
						 rxHCC : '',
						 icdDxDescr : '',
						 eoCode : ''
					};
				 encounterRecords.push(dxCodesRowTemplate);
			 }
			 $scope.icdCodesTableViewModel.records = encounterRecords;
			 $scope.icdCodesTableViewModel.totalRecordsCount = encounterRecords.length;*/
		}
		
		$scope.savedEncountersTableViewModel.deleteEnc = function(record){
			$scope.deleteEncounerRecord = record;
			$scope.showConfirmDeleteEncounter = !$scope.showConfirmDeleteEncounter;
		}
		
		$scope.dataModel.deleteEncounter = function(record){
			$scope.savedEncountersTableViewModel.closeSubTableDialog(true);
			var coderEncKey = record.coderEncounterKey ? record.coderEncounterKey : '';
			var comments = record.qaEncComments.replace(/[\n\r]/g, '');
			var codingQAEncDxWrapper = {
					loginUserKey			: 	$scope.dataModel.loginUserKey,
					loginUserId				:	$scope.dataModel.loginUserId,
					groupKey				:	$scope.dataModel.currentGroupKey,
					projectKey				:	$scope.dataModel.chartDetailsObj.projKey,
					projContKey				:	$scope.dataModel.chartInputDetails.projContentKey,
					busFuncVenKey			:	$scope.dataModel.chartInputDetails.busFuncVenKey,
					codingQAEncDxDetailsList:[	{
							coderDOSFromDate	: 	record.coderDOSFromDate,
							coderDOSThruDate	: 	record.coderDOSThruDate,
							coderEncounterKey	:	record.coderEncounterKey,
							/*coderEoCode			:	{
								value			:	record.coderEoCode.value ? record.coderEoCode.value : '',
								label			:	record.coderEoCode.label ? record.coderEoCode.label : '' 
							},*/	
							coderProvFirstName	:	record.coderProvFirstName,
							coderProvLastName	:	record.coderProvLastName,
							coderProvNPI		:	record.coderProvNPI,
							coderRetProvFlag	:	record.coderRetProvFlag,
							qaEncounterKey		:	record.qaEncounterKey ? record.qaEncounterKey : '',
							qaDOSFromDate		:	record.qaDosFromDateCalendarViewModel ? record.qaDosFromDateCalendarViewModel.dateText : record.qaDOSFromDate,
							qaDOSThruDate		:	record.qaDosThruDateCalendarViewModel ? record.qaDosThruDateCalendarViewModel.dateText : record.qaDOSThruDate,
							qaPageNum			:	record.qaPageNum,
							qaRetProvFlag		:	record.qaRetProvFlag,
							qaProvNPI			:	record.qaProvNPI,
							qaProvFirstName		:	record.qaProvFirstName,
							qaProvLastName		:	record.qaProvLastName,
							qaEncActionCd		:	'DELETE',
							qaEncComments		:	comments,
							/*qaEoCode			:	{
								value			:	record.qaEoCode.value ? record.qaEoCode.value : '',
								label			:	record.qaEoCode.label ? record.qaEoCode.label : '' 
							},*/
							codingQaDxDetails	:	record.codingQaDxDetails,
							qaEoKeyList         :   selectedEoRecords
					}]
			};
			$scope.showCodingQALoadingDialog = true;
			$http.post('/gcm-app-services/codingqa/worklist/saveCodingQaResults', codingQAEncDxWrapper).then(function(response) {
				if (response && response.data && response.data.result && response.data.status == 'SUCCESS') {
					$scope.showConfirmDeleteEncounter = !$scope.showConfirmDeleteEncounter;
					getEncounters();
					$scope.savedEncountersTableViewModel.errorMessageModel.messageType = 'success';
					$scope.savedEncountersTableViewModel.errorMessageModel.content = '<span>Encounter deleted successfully</span>';
					$scope.savedEncountersTableViewModel.errorMessageModel.visible = true;
				} else {
					setErrorMessage('Encounter save failed');
				}
			},function(error){
				$scope.showCodingQALoadingDialog = false;
				setErrorMessage('Encounter save failed');
			});
		}
		
		$scope.savedEncountersTableViewModel.addEncounter = function(){
			
			if($scope.dataModel.checkboxValue == 'Y'){
				setErrorMessage("Encounter cannot be added when the no DOS checkbox is checked.  Please uncheck the checkbox");
				return;
			}
			
			if($scope.savedEncountersTableViewModel.expandedRowObj.index > -1 && $scope.savedEncountersTableViewModel.records[$scope.savedEncountersTableViewModel.expandedRowObj.index].open){
				setErrorMessage("To add encounter, save or cancel changes");
				return;
			}
			$scope.addEncounterObj = {
					pageNo : ''
			};
			$scope.fromDateCalendarViewModel.dateText = '';
			$scope.throughDateCalendarViewModel.dateText = '';
			$scope.addEncounterObj.fromDate = '';
			$scope.addEncounterObj.throughDate = '';
			$scope.fromDateCalendarViewModel.invalid = false;
			$scope.throughDateCalendarViewModel.invalid = false;
			$scope.addEncounterObj.selectedEOCode = $scope.savedEncountersTableViewModel.eoCodeList[0];
			$scope.addEncounterObj.selectedRendProvMatch = $scope.savedEncountersTableViewModel.renderingProviderMatchList[0];
			$scope.addEncounterObj.eoCodeList = angular.copy($scope.encEoObjList);
			initializeICDTableModel();
			$scope.addEncounterObj.showAddEncounterDialog = true;
		}
		
		$scope.savedEncountersTableViewModel.changeEncEoCode = function(record)
		{
/*			if(record.qaEoCode.value && (record.qaEoCode.value.indexOf('C06') > 0 || record.qaEoCode.value.indexOf('D04') > 0)){
				var codingQaDxDetails = record.codingQaDxDetails;
				if(codingQaDxDetails.length > 0){
					for (var i = 0; i < codingQaDxDetails.length; i++) {
						if(codingQaDxDetails[i].qaDxActionCd == 'NEW' && $scope.deletedDXCodes.indexOf(codingQaDxDetails[i].qaICDDxCode) < 0){
							var errorMessage = "Delete added DX codes to change encounter EO code to: "+$scope.dataModel.encEoObjList[record.qaEoCode.value];
							record.qaEoCode.label = $scope.dataModel.prevEncEO.label;
							record.qaEoCode.value = $scope.dataModel.prevEncEO.value;
							setErrorMessage(errorMessage);
							return;
						}
					}
				}
				$scope.savedEncountersTableViewModel.showEditICDCodeTable = false;
				$scope.savedEncountersTableViewModel.isNoDxEoSelectedForEdit = true;
			}else{
				$scope.savedEncountersTableViewModel.showEditICDCodeTable = true;
				$scope.savedEncountersTableViewModel.isNoDxEoSelectedForEdit = false;
			}*/
					
			$scope.dataModel.isNoDxEoSelected = false;
			if(record.qaEoKeyList && record.qaEoKeyList.length >0){
				for(var i = 0;i<record.qaEoKeyList.length;i++){
					if(record.qaEoKeyList[i].value && (record.qaEoKeyList[i].value.indexOf('C06') > 0 || record.qaEoKeyList[i].value.indexOf('D04') > 0)){
						$scope.dataModel.isNoDxEoSelected = true;
					}
				 }
			}
			if($scope.dataModel.isNoDxEoSelected){
				$scope.savedEncountersTableViewModel.showEditICDCodeTable = false;
				$scope.savedEncountersTableViewModel.isNoDxEoSelectedForEdit = true;
			}else{
					$scope.dataModel.isNoDxEoSelected = false;
					$scope.savedEncountersTableViewModel.showEditICDCodeTable = true;
					$scope.savedEncountersTableViewModel.isNoDxEoSelectedForEdit = false;
			}
			
			selectedEoRecords = [];
			angular.forEach(record.qaEoKeyList, function(value, key){
				var eoObj = {};
				eoObj.value = value.value;
				eoObj.label = value.label;
				selectedEoRecords.push(eoObj);
			 });
		}
		$scope.savedEncountersTableViewModel.onEncEOClick = function(event, record, index, oldEncEo)
		{
			
		/*	if(record.qaEoCode != $scope.dataModel.prevEncEO){
				$scope.dataModel.prevEncEO = {};
				$scope.dataModel.prevEncEO.value = oldEncEo.value;
				$scope.dataModel.prevEncEO.label = $scope.dataModel.encEoObjList[oldEncEo.value];
			}	*/
			$scope.dataModel.prevEncEO = [];
			$scope.dataModel.prevEncEO = record.qaEoKeyList;
			
			/*if(this.records[index].open){
				//var codingQaDxDetails = $scope.savedEncountersTableViewModel.subTableViewModel.records;
				for (var i = 0; i < $scope.savedEncountersTableViewModel.subTableViewModel.records.length; i++) {
					if($scope.savedEncountersTableViewModel.subTableViewModel.records[i].qaDxActionCd == 'NEW'){
						 angular.forEach(record.eoCodeList, function(eoCodeObj, key) {
							 angular.forEach(record.qaEoKeyList, function(selected, key) {
							 if((selected.value == 'AN-C06' || selected.value == 'AN-D04') &&selected.value==eoCodeObj.value) {
								 eoCodeObj.ticked = false; 
								 $scope.savedEncountersTableViewModel.isNoDxEoSelectedForEdit = false;
								 $scope.savedEncountersTableViewModel.showEditICDCodeTable = true;
								 setErrorMessage("Delete added DX codes to change encounter action");
								 return;
							 }
						});
					 });	
					}
				}
			}*/
				
			var msgVal = "";
			$scope.dataModel.isNoDxEoSelected = false;
			if(record.qaEoKeyList && record.qaEoKeyList.length >0){
				for(var i = 0;i<record.qaEoKeyList.length;i++){
					if(record.qaEoKeyList[i].value && (record.qaEoKeyList[i].value.indexOf('C06') > 0 || record.qaEoKeyList[i].value.indexOf('D04') > 0)){
						$scope.dataModel.isNoDxEoSelected = true;
						msgVal = record.qaEoKeyList[i];
						
					}
				 }
			}
			if($scope.dataModel.isNoDxEoSelected){
				//var codingQaDxDetails = record.codingQaDxDetails;
				var isNewRecordPresent = false;
				if($scope.savedEncountersTableViewModel.subTableViewModel && $scope.savedEncountersTableViewModel.subTableViewModel.records && $scope.savedEncountersTableViewModel.subTableViewModel.records.length > 0){
					for (var i = 0; i < $scope.savedEncountersTableViewModel.subTableViewModel.records.length; i++) {
						if($scope.savedEncountersTableViewModel.subTableViewModel.records[i].qaDxActionCd == 'NEW'){
							record.qaEoKeyList = $scope.dataModel.prevEncEO;
							angular.forEach(record.eoCodeList, function(eoCodeObj, key) {
								 angular.forEach(record.qaEoKeyList, function(selected, key) {
									 if((selected.value == 'AN-C06' || selected.value == 'AN-D04') && selected.value==eoCodeObj.value){
										 eoCodeObj.ticked = false; 
										 isNewRecordPresent = true;
										 $scope.savedEncountersTableViewModel.isNoDxEoSelectedForEdit = false;
										 $scope.savedEncountersTableViewModel.showEditICDCodeTable = true;
										 setErrorMessage("Delete added DX codes to change encounter EO code to: "+msgVal.label);
										 return;
									}
								 });
							});
						}
						
					}
				}
				if(!isNewRecordPresent){
					$scope.savedEncountersTableViewModel.isNoDxEoSelectedForEdit = true;
					$scope.savedEncountersTableViewModel.showEditICDCodeTable = false;
				}
			}else{
				$scope.savedEncountersTableViewModel.showEditICDCodeTable = true;
				$scope.savedEncountersTableViewModel.isNoDxEoSelectedForEdit = false;
				$scope.dataModel.isNoDxEoSelected = false;
			}
			
			selectedEoRecords = [];
			angular.forEach(record.qaEoKeyList, function(value, key){
				var eoObj = {};
				eoObj.value = value.value;
				eoObj.label = value.label;
				selectedEoRecords.push(eoObj);
			 });
		}
		
		$scope.savedEncountersTableViewModel.viewInUtilityTab= function()
		{	
			var isReadOnly = dataServiceModel.isReadOnly;
			var isFromUtility = $scope.dataModel.isFromUtility ;
			if(!isReadOnly || isFromUtility)
				return true;
			else 
				return false;	
		}
		
		$scope.showencEoDescCoder = false;
		$scope.savedEncountersTableViewModel.openWindowCoder = function(record){
			 $scope.showencEoDescCoder = true;
			 
			 $scope.savedEncountersTableViewModel.encEoDescValueCoder = [];
			 if(record.coderEoKeyList && record.coderEoKeyList.length > 0){
				 angular.forEach(record.coderEoKeyList, function(value, key){
					 angular.forEach($scope.savedEncountersTableViewModel.eoCodeList, function(eoRec, key){
						 if(eoRec.value==value)
						 $scope.savedEncountersTableViewModel.encEoDescValueCoder.push(eoRec.label);
					 });
				 });
			 }
			 else{
				 $scope.savedEncountersTableViewModel.encEoDescValueCoder.push('None selected');
			 }
				 
		 }
		$scope.toggleEncEoDescCoder = function(){
			 $scope.showencEoDescCoder = false;
		 }
		
		$scope.showencEoDescEnc = false;
		$scope.savedEncountersTableViewModel.openWindowEnc = function(record){
			 $scope.showencEoDescEnc = true;
			 
			 $scope.savedEncountersTableViewModel.encEoDescValueEnc = [];
			 if(record.qaEoKeyList && record.qaEoKeyList.length > 0){
				 for(var i=0;i<record.qaEoKeyList.length;i++){
					 angular.forEach($scope.savedEncountersTableViewModel.eoCodeList, function(eoRec, key){
						 if(eoRec.value==record.qaEoKeyList[i].value){
							 $scope.savedEncountersTableViewModel.encEoDescValueEnc.push(eoRec.label);
						 }
					 });
				}
			 }
			 else{
				 $scope.savedEncountersTableViewModel.encEoDescValueEnc.push('None selected');
			 }
				 
		 }
		$scope.toggleEncEoDescEnc = function(){
			 $scope.showencEoDescEnc = false;
		 }
		
		$scope.showencEoDescQA = false;
		$scope.savedEncountersTableViewModel.openWindowQA = function(record){
			 $scope.showencEoDescQA = true;
			 
			 $scope.savedEncountersTableViewModel.encEoDescValueQA = [];
			 if(record.qaEoKeyList && record.qaEoKeyList.length > 0){
				 angular.forEach(record.qaEoKeyList, function(value, key){
					 angular.forEach($scope.savedEncountersTableViewModel.eoCodeList, function(eoRec, key){
						 if(eoRec.value==value.value)
						 $scope.savedEncountersTableViewModel.encEoDescValueQA.push(eoRec.label);
					 });
				});
			 }
			 else{
				$scope.savedEncountersTableViewModel.encEoDescValueQA.push('None selected');
			 }
				 
		 }
		$scope.toggleEncEoDescQA = function(){
			 $scope.showencEoDescQA = false;
		 }
		
		$scope.showencEoDescVal = false;
		$scope.savedEncountersTableViewModel.openWindowVal = function(record){
			 $scope.showencEoDescVal = true;
			 
			 $scope.savedEncountersTableViewModel.encEoDescValueVal = [];
			 if(record.coderEoKeyList && record.coderEoKeyList.length > 0){
				 angular.forEach(record.coderEoKeyList, function(value, key){
					 angular.forEach($scope.savedEncountersTableViewModel.eoCodeList, function(eoRec, key){
						 if(eoRec.value==value)
						 $scope.savedEncountersTableViewModel.encEoDescValueVal.push(eoRec.label);
					 });
				});
			 }
			 else{
				 $scope.savedEncountersTableViewModel.encEoDescValueVal.push('None selected');
			 }
				 
		 }
		$scope.toggleEncEoDescVal = function(){
			 $scope.showencEoDescVal = false;
		 }
		
		 $scope.addEncounterObj.selectedEOCode = [];
		$scope.saveEncounter = function(){
			$scope.savedEncountersTableViewModel.errorMessageModel.visible = false;
			$scope.errorMessageModel.visible = false;
			$scope.dialogErrorMessageModel.visible = false;
			if(validateNewEncounter()){
				var qaDXCodesList = [];
				var selected = $scope.addEncounterObj.selectedEOCode;
				var isNoDxEOSelected = false;
				if(selected){
				for(var i=0;i<selected.length;i++){
					if(selected[i].value && (selected[i].value.indexOf('C06') > 0 ||selected[i].value.indexOf('D04') > 0)){
						isNoDxEOSelected=true;
						break;
					}
			     }
				}
				selectedEoRecords = [];
				if($scope.addEncounterObj.selectedEOCode && $scope.addEncounterObj.selectedEOCode.length >0){
					angular.forEach($scope.addEncounterObj.selectedEOCode, function(value, key){
						var eoObj = {};
						eoObj.value = value.value;
						eoObj.label = value.label;
						selectedEoRecords.push(eoObj);
					 });
				}
				
				/*if(selected && selected.value && (selected.value.indexOf('C06') > 0 || selected.value.indexOf('D04') > 0)){
					isNoDxEOSelected = true;
				}*/
				if(!isNoDxEOSelected){
					for(var i = 0; i < $scope.icdCodesTableViewModel.records.length; i ++){
						var record = $scope.icdCodesTableViewModel.records[i];
						if(record.icdDxCd){
							var qaDXCodeObj = {};
							qaDXCodeObj.qaEncounterDXKey	= record.qaEncounterDXKey ? record.qaEncounterDXKey : ''; 
							qaDXCodeObj.qaEncounterKey		= record.qaEncounterKey ? record.qaEncounterKey : '';
							qaDXCodeObj.qaICDDxCode			= record.icdDxCd ? record.icdDxCd : '';
							qaDXCodeObj.qaDxActionCd		= 'NEW'
							if(record.eoCode){
								qaDXCodeObj.qaDxEoCode 			= $scope.dataModel.dxLevelEoCodeLst[record.eoCode];
							}else{
								qaDXCodeObj.qaDxEoCode 			= {
										value	: '',
										label	: ''
								} 
							}
							qaDXCodesList.push(qaDXCodeObj);
						}
					}
				}
				
				
				if(isNoDxEOSelected || validateDxCodes($scope.icdCodesTableViewModel.records)){
					var comments = $scope.addEncounterObj.qaEncComments.replace(/[\n\r]/g, '');					
					var codingQAEncDxWrapper = {
							loginUserKey			: 	$scope.dataModel.loginUserKey,
							loginUserId				:	$scope.dataModel.loginUserId,
							groupKey				:	$scope.dataModel.currentGroupKey,
							projectKey				:	$scope.dataModel.chartDetailsObj.projKey,
							projContKey				:	$scope.dataModel.chartInputDetails.projContentKey,
							busFuncVenKey			:	$scope.dataModel.chartInputDetails.busFuncVenKey,
							codingQAEncDxDetailsList:[	{
									qaEncounterKey		:	$scope.addEncounterObj.qaEncounterKey ? $scope.addEncounterObj.qaEncounterKey : '',
									qaDOSFromDate		:	$scope.fromDateCalendarViewModel.dateText,
									qaDOSThruDate		:	$scope.throughDateCalendarViewModel.dateText,
									qaPageNum			:	$scope.addEncounterObj.pageNo,
									qaRetProvFlag		:	$scope.addEncounterObj.selectedRendProvMatch.value,
									qaProvNPI			:	$scope.addEncounterObj.npi,
									qaProvFirstName		:	$scope.addEncounterObj.firstName,
									qaProvLastName		:	$scope.addEncounterObj.lastName,
									qaEncActionCd		:	'NEW',
									//qaEoCode			:	'',
									qaEncComments		:	comments,
									codingQaDxDetails	:	qaDXCodesList,
									qaEoKeyList         :   selectedEoRecords
							}]
					};
					$scope.showCodingQALoadingDialog = true;
					$http.post('/gcm-app-services/codingqa/worklist/saveCodingQaResults', codingQAEncDxWrapper).then(function(response) {
						if (response && response.data && response.data.status != 'ERROR') {
							selectedEoRecords = [];
							getEncounters();
							$scope.addEncounterObj.showAddEncounterDialog = !$scope.addEncounterObj.showAddEncounterDialog;
							$scope.showICDCodeTable = false;
							$scope.isNoDxEoSelected = false;
						}
					},function(error) {
						$scope.showCodingQALoadingDialog = false;
						setDialogErrorMessage("Error:Error occured while saving encounter/DX changes");
					});
				}
			}
		};

		function validateNewEncounter(){
			if($scope.fromDateCalendarViewModel.invalid || $scope.throughDateCalendarViewModel.invalid) 
				return false;

			if ($scope.fromDateCalendarViewModel.dateText != '' && $scope.throughDateCalendarViewModel.dateText != ''
				&& ($scope.addEncounterObj.fromDate > $scope.addEncounterObj.throughDate)) {
				setDialogErrorMessage('From date cannot be beyond through date');
				return false;
			} else if ($scope.fromDateCalendarViewModel.dateText != '' && $scope.throughDateCalendarViewModel.dateText != ''
				&& ($scope.addEncounterObj.fromDate > new Date() || $scope.addEncounterObj.throughDate > new Date())) {
				setDialogErrorMessage('Date cannot be beyond current date');
				return false;
			}

			if ($scope.fromDateCalendarViewModel.dateText == '' && $scope.throughDateCalendarViewModel.dateText == '') {
				setDialogErrorMessage('From/Through date is mandatory');
				return false;
			}else if($scope.throughDateCalendarViewModel.dateText == ''){
				setDialogErrorMessage('Through date is mandatory');
				return false;
			}else if($scope.fromDateCalendarViewModel.dateText == ''){
				setDialogErrorMessage('From date is mandatory');
				return false;
			}
			var diffDays = 0;
			if($scope.fromDateCalendarViewModel.dateText && $scope.throughDateCalendarViewModel.dateText)
			{
				var diffMilliSecs = $scope.addEncounterObj.throughDate - $scope.addEncounterObj.fromDate;
				diffDays = parseInt(diffMilliSecs / (1000 * 60 * 60 * 24));
			}
			if(diffDays >= 30){
				setDialogErrorMessage("Date span cannot be greater than 30 days");
				return false;
			}
			if($scope.addEncounterObj.pageNo == ''){
				setDialogErrorMessage('Page # is mandatory');
				return false;
			}
			if(!validatePageNumber($scope.addEncounterObj.qaPageNum)){
				setDialogErrorMessage('The page # you entered is not valid');
				return false;
			}
			var qaRetProvFlag = $scope.addEncounterObj.selectedRendProvMatch ? $scope.addEncounterObj.selectedRendProvMatch.value : '';
			if (!qaRetProvFlag){
				setDialogErrorMessage("Rendering provider is required");
				return false;			
			}
			
			if(qaRetProvFlag == "N" &&  $scope.dataModel.chartDetailsObj.busSegment == "MCAID" 
				&& (typeof($scope.addEncounterObj.firstName) == "undefined" || $scope.addEncounterObj.firstName == null || $scope.addEncounterObj.firstName == "" || $scope.addEncounterObj.firstName.trim().length == 0 
						|| typeof($scope.addEncounterObj.lastName)=="undefined" || $scope.addEncounterObj.lastName == "" || $scope.addEncounterObj.lastName == null || $scope.addEncounterObj.lastName.trim().length == 0))
			{
				setDialogErrorMessage("Provider First/Last name is required when Rendering Provider Match = Other");
				return false;
			}
			if(qaRetProvFlag == "N" )
			{
				if($scope.addEncounterObj.lastName)
				{
					if ( ! validateProperties($scope.addEncounterObj.lastName, '[a-zA-Z- ]', '[^a-zA-Z- ]') ){
						setDialogErrorMessage("Last name contains characters that cannot be accepted");
					   return false;
					}
					if ( $scope.addEncounterObj.lastName && $scope.addEncounterObj.lastName.length > 50 ){
						setDialogErrorMessage("Please enter last name value less than 50 characters");
						return false;
					}
				}
				else{
					if ( $scope.dataModel.chartDetailsObj.busSegment == "MCAID")
					{
						setDialogErrorMessage("Record not saved. Rendering provider last name is required when business segment = Medicaid");
						return false;
					}
				}
					
				if($scope.addEncounterObj.firstName)
				{
					if ( ! validateProperties($scope.addEncounterObj.firstName, '[a-zA-Z- ]', '[^a-zA-Z- ]') ){
						setDialogErrorMessage("First name contains characters that cannot be accepted");
					   return false;
					}
					if ( $scope.addEncounterObj.firstName && $scope.addEncounterObj.firstName.length > 50 ){
						setDialogErrorMessage("Please enter first name value less than 50 characters");
						return false;
					}
				}else{
					if ( $scope.dataModel.chartDetailsObj.busSegment == "MCAID")
					{
						setDialogErrorMessage("Record not saved. Rendering provider first name is required when business segment = Medicaid");
						return false;
					}
				}
					
				if($scope.addEncounterObj.npi)
				{
					if ( ! validateProperties($scope.addEncounterObj.npi, '[0-9]', '[^0-9]') ){
						setDialogErrorMessage("NPI contains characters that cannot be accepted");
						return false;
					}
					if ( $scope.addEncounterObj.npi && $scope.addEncounterObj.npi.length != 10 ){
						setDialogErrorMessage("Please enter NPI value 10 characters");
						return false;
					}
				}else if($scope.isOptumCoding()){
					setDialogErrorMessage("NPI is required");
					return false;
				}
			}
			
			if(!$scope.addEncounterObj.qaEncComments || $scope.addEncounterObj.qaEncComments.trim().length == 0){
				setDialogErrorMessage('Encounter comments required');
				return false;
			}
			
			return true;
		}
		
		var validateDxCodes = function(qaDXCodesList){
			var isValidDXCodesExist = false;
			if(qaDXCodesList.length > 0 && !$scope.isNoDxEoSelected){
				var dxCodes = qaDXCodesList;
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
				if (  duplicateDxCodesString  != '' ){
					setDialogErrorMessage("Duplicate DX codes : " + duplicateDxCodesString);
					return false;
				}
				if(notValidDxCodesString != ""){
					setDialogErrorMessage("ICD code not valid : " + notValidDxCodesString);
					return false;
				}
			}
			if(!$scope.dataModel.isNoDxEoSelected && !isValidDXCodesExist){
				setDialogErrorMessage("Save encounter failed: As there is no DX code entered or no non codeable EO code selected");
				return false;
			}
			return true;
		}
		
		
		$scope.closeAddEncounterDialog = function(){
			$scope.icdCodesTableViewModel.records = [];
			$scope.addEncounterObj.selectedEOCode =[];
			$scope.icdCodesTableViewModel.totalRecordsCount = 0;
			$scope.addEncounterObj.showAddEncounterDialog = false;
			$scope.showICDCodeTable = false;
			$scope.isNoDxEoSelected = false;
			if($scope.savedEncountersTableViewModel.eoCodeList && $scope.savedEncountersTableViewModel.eoCodeList.length>0){
			for(var i=0;i<$scope.savedEncountersTableViewModel.eoCodeList.length;i++){
					$scope.savedEncountersTableViewModel.eoCodeList[i].ticked = false;
				}
			}
		}

		$scope.savedEncountersTableViewModel.renderingProviderMatchList = [ {
			label : 'Select',
			value : null
		}, {
			label : 'Yes',
			value : 'Y'
		}, {
			label : 'Other',
			value : 'N'
		} ];	

		$scope.savedEncountersTableViewModel.eoCodeList  =[];

		$scope.savedEncountersTableViewModel.eoCodeForDXCodeTableList = $scope.icdCodesTableViewModel.eoCodeForDXCodeTableList = [ {
			label : 'Select',
			value : ''
		} ];
		
		var emptyEo = {
				gcmEoKey : "",
				gcmEoDesc : "Select"
			 };

		$scope.addEncounterObj.selectedEOCode = $scope.savedEncountersTableViewModel.eoCodeList[0];
		$scope.addEncounterObj.selectedRendProvMatch = $scope.savedEncountersTableViewModel.renderingProviderMatchList[0];

		$scope.addEncounterObj.onRendProvMatchChange = function(selected){
			$scope.addEncounterObj.selectedRendProvMatch = selected;
		}

		$scope.onEOCodeChange = function(){
			//$scope.addEncounterObj.selectedEOCode = selected;
			/*var eoList = $scope.savedEncountersTableViewModel.eoCodeList;
			for(var i =0 ; i < eoList.length; i ++){
				if($scope.addEncounterObj.selectedEOCode.value = eoList[i].value){
					$scope.addEncounterObj.selectedEOCode = eoList[i];
				}
			}*/
			selectedEoRecords = [];
			if($scope.addEncounterObj.selectedEOCode && $scope.addEncounterObj.selectedEOCode.length >0){
				angular.forEach($scope.addEncounterObj.selectedEOCode, function(value, key){
					var eoObj = {};
					eoObj.value = value.value;
					eoObj.label = value.label;
					selectedEoRecords.push(eoObj);
				 });
			}
			var expandFlagAddEnc=false;
			var selected = $scope.addEncounterObj.selectedEOCode;
			if(selected && selected.length>0){
			for(var i=0;i<selected.length;i++){
					if(selected[i].value && (selected[i].value.indexOf('C06') > 0 ||selected[i].value.indexOf('D04') > 0)){
						expandFlagAddEnc=true;
						break;
					}
				}
			}
			if(expandFlagAddEnc){
				$scope.showICDCodeTable = false;
				$scope.isNoDxEoSelected = true;
			}else{
				$scope.showICDCodeTable = true;
				$scope.isNoDxEoSelected = false;
			}
		}

		$scope.addMoreDxCodes = function(){
			$scope.icdCodesTableViewModel.records.push({idc10DxCodes: '',hcc:'',rxHCC:'',icdDxDescr:'',eoCode:''});
			$scope.icdCodesTableViewModel.totalRecordsCount++;
		}
		
		$scope.noDosMeetsCriteriaChange = function(){
			if($scope.dataModel.checkboxValue == 'Y'){
				if(checkForValidEnc()){
					setErrorMessage("Valid encounters cannot be present when no DOS checkbox is selected. Please select not valid/delete encounters to check the checkbox");
					$scope.dataModel.checkboxValue = 'N';
				}
			}
		}
		
		var checkForValidEnc = function(){
			var isValidEncountersExist = false;
			for(var key =0; key < $scope.savedEncountersTableViewModel.records.length; key++){
				var value = $scope.savedEncountersTableViewModel.records[key];
				if (value){
					if(value.open){
						setErrorMessage("Save/Cancel changes then select no DOS meets criteria");
						$scope.dataModel.checkboxValue = 'N';
						return false;
					}
					if(!value.qaEncActionCd){
						setErrorMessage("Validate encounters to check no DOS meets criteria");
						$scope.dataModel.checkboxValue = 'N';
						return false;
					}
					if(value.qaEncActionCd == 'VALID' || value.qaEncActionCd == 'MODIFY' || value.qaEncActionCd == 'NEW'){
						isValidEncountersExist =  true;
						return true;
					}
				}
			}
			return false; 
		}

		$scope.historyPanelViewModel = {
				id : 'codingUIHistoryPanel',
				title:'History',
				templateUrl: 'historytemplate.html',
				open : false,
				panelWidth : '100%',
				panelHeight: 'auto',
				collapsible: true        
		}

		$scope.commentsPanelViewModel = {
				id : 'codingUICommentsPanel',
				title:'Comments',
				templateUrl: 'commentstemplate.html',
				open : false,
				panelWidth : '100%',
				panelHeight: 'auto',
				collapsible: true        
		}
		$scope.exitCodingUI = function(){
			var index = $scope.savedEncountersTableViewModel.expandedRowObj.index;
			if(rootData.currentRole == 'SUP'){
				$scope.savedEncountersTableViewModel.expandedRowObj.index=-1;
				$scope.dataModel.exitWorkItem();
			}else if(index > -1 && $scope.savedEncountersTableViewModel.records.length > index && $scope.savedEncountersTableViewModel.records[index].open){
				$scope.showConfirmExitWorkItem = !$scope.showConfirmExitWorkItem;
			}else{
				lookupService.url='';
				$scope.dataModel.exitWorkItem();
			}
		}
		
		$scope.dataModel.exitWorkItem = function(){
			$scope.closeImage();
			$scope.logCoderProdEvent('CLOSE');
			if(rootData.currentRole == 'SUP'){
				lookupService.url = 'utilityTabs.htm';
			}else{
				$scope.savedEncountersTableViewModel.closeSubTableDialog(true);
				$scope.showConfirmExitWorkItem = !$scope.showConfirmExitWorkItem;
				lookupService.url = 'codingQAWorklisttabs.html';
			}
			
		}

		$scope.acceptCodingData = function (){
			if(!validateBeforeAccept()) return;
			$scope.showConfirmAcceptWorkItem = !$scope.showConfirmAcceptWorkItem;
		}
		
		$scope.dataModel.acceptWorkItem = function(){
			$scope.dataModel.acceptCodingQAInput = {
					loginUserKey	: $scope.dataModel.loginUserKey,
					loginUserId		: $scope.dataModel.loginUserId,
					groupKey		: $scope.dataModel.currentGroupKey,
					projectKey		: $scope.dataModel.chartDetailsObj.projKey,
					projContKey		: dataServiceModel.selectedChart.projContentKey,
					busFuncVenKey	: dataServiceModel.selectedChart.busFuncVenKey,
					dosIndFlag		: $scope.dataModel.checkboxValue == 'Y' ? 'Y' : 'N'
			};
			
			acceptCodingQAResults();
		}
		
		
		$scope.dataModel.acceptCodingQAInput = {
				loginUserKey	: $scope.dataModel.loginUserKey,
				loginUserId		: $scope.dataModel.loginUserId,
				groupKey		: $scope.dataModel.currentGroupKey,
				projectKey		: $scope.dataModel.chartDetailsObj.projKey,
				projContKey		: dataServiceModel.selectedChart.projContentKey,
				busFuncVenKey	: dataServiceModel.selectedChart.busFuncVenKey,
				dosIndFlag		: $scope.dataModel.checkboxValue == 'Y' ? 'Y' : 'N'
		};
		
		var validateBeforeAccept = function(){

			var isValidEncountersExist = false;
			var isValidDxExist = false;
			var notValidEncCount = 0;
			for(var key =0; key < $scope.savedEncountersTableViewModel.records.length; key++){
				var record = $scope.savedEncountersTableViewModel.records[key];
				var validateFlag=false;
				
				if (record){
					if(record.open){
						setErrorMessage("Save/Cancel changes before accept");
						return false;
					}
					if(record.qaEoKeyList && record.qaEoKeyList.length>0){
						for(var i=0;i<record.qaEoKeyList.length;i++){
							if(record.qaEoKeyList[i].value && (record.qaEoKeyList[i].value.indexOf('C06') > 0 ||record.qaEoKeyList[i].value.indexOf('D04') > 0)){
								validateFlag=true;
								break;
							}
						}
					}
					if(!record.qaEncActionCd){
						setErrorMessage("Validate all encounters before accepting work item");
						return false;
					}
					if(record.qaEncActionCd == 'NEW'){
						isValidEncountersExist = true;
					}else if (validateFlag){
						if(record.qaEncActionCd == 'NOT VALID'){
							notValidEncCount ++;
						}else{
							isValidEncountersExist = true;
						}
					}else if((record.qaEncActionCd == 'VALID' || record.qaEncActionCd == 'MODIFY')){
						angular.forEach(record.codingQaDxDetails, function(dxRecord, index){
							if(dxRecord && (dxRecord.qaDxActionCd == 'VALID' || dxRecord.qaDxActionCd == 'MODIFY')){
								isValidEncountersExist = true;
								isValidDxExist = true;
								return true;
							}
						});
					}else if(record.qaEncActionCd == 'NOT VALID'){
						notValidEncCount ++;
					}
				}
			}
			if(!isValidEncountersExist && $scope.dataModel.checkboxValue != 'Y'){
				setErrorMessage("Add encounter/select no DOS meets criteria to accept the work item");
				return false;
			}
			if(notValidEncCount == $scope.savedEncountersTableViewModel.records.length &&  $scope.dataModel.checkboxValue != 'Y'){
				setErrorMessage("Add minimum one valid encounter/Select no DOS meets criteria to accept the work item");
				return false;
			}
			return true;
		}

		var acceptCodingQAResults = function(){
			$scope.showCodingQALoadingDialog = true;
			$http.post('/gcm-app-services/codingqa/worklist/acceptCodingQaResults',$scope.dataModel.acceptCodingQAInput).then(function(response) {
				if (response && response.data && response.data.status == 'SUCCESS'){
					$scope.showConfirmAcceptWorkItem = !$scope.showConfirmAcceptWorkItem;
					$scope.showCodingQALoadingDialog = false;
					if (response && response.data && response.data.result){
						//alert("Chart Status Updated");
					}
					$scope.logCoderProdEvent('CLOSE');
					$scope.closeImage();
					lookupService.url = 'codingQAWorklisttabs.html';
				}else{
					$scope.showCodingQALoadingDialog = false;
					setErrorMessage("Error while accepting QA Workitem..");
				}
				
			},function(error) {
				$scope.showCodingQALoadingDialog = false;
				setErrorMessage("Error while accepting QA Workitem..");
			});
		}
		
		$scope.dataModel.handleIcdDXChange = function(record) {
			var dxCode = record.icdDxCd;
			if (record.icdDxCd) {
				record.icdDxCd = dxCode.toUpperCase();
				getHccAndRxHccByDX(record);
			} else {
				record.v22Hcc = '';
				record.v23Hcc = '';
				record.v24Hcc = '';
				record.rxHcc = '';
				record.icdDesc = '';
				record.errorCode = '';
			}

		};

		var getHccAndRxHccByDX = function(record){

			var memberDOB = new Date($scope.dataModel.chartDetailsObj.memberDOB);
			var birthYear = memberDOB.getFullYear();
			var birthMonth = memberDOB.getMonth();
			var birthDay = memberDOB.getDate();
			var fromDate = $scope.addEncounterObj.fromDate ? $scope.addEncounterObj.fromDate : new Date($scope.fromDateCalendarViewModel.dateText);
			var fromYear = fromDate.getFullYear();
			var fromMonth = fromDate.getMonth();
			var fromDay = fromDate.getDate();

			var age = fromYear - birthYear;
			var ageMonth = fromMonth - birthMonth;
			var ageDay = fromDay - birthDay;
			if(ageMonth < 0 || (ageMonth == 0 && ageDay < 0)){
				age = parseInt(age) -1;
			}

			$scope.addEncounterObj.isValidationInprogress = true;

			var dxCodedosDetailsObj = {
					icdDxCd 		: record.icdDxCd,
					dosThruDt		: $scope.fromDateCalendarViewModel.dateText,
					dosFromDt		: $scope.throughDateCalendarViewModel.dateText,
					busSegment	: $scope.dataModel.chartDetailsObj.busSegment,
					gender		: $scope.dataModel.chartDetailsObj.memberGender,
					dateOfBirth	: $scope.dataModel.chartDetailsObj.memberDOB,
					age			: age
			};
			$http.post('/gcm-app-services/coding/workflow/validateIcdCode', dxCodedosDetailsObj).then(function(response) {
				if (response && response.data && response.data.result) {
					if (response.data.result.errorCode) {
						setDialogErrorMessage(response.data.result.icdDesc);
						record.icdDesc = response.data.result.icdDesc;
						record.v22Hcc = '';
						record.v23Hcc = '';
						record.v24Hcc = '';
						record.rxHcc = '';
						record.hhs = '';
						record.errorCode = response.data.result.errorCode;
					} else {
						record.v22Hcc = response.data.result.v22Hcc ? response.data.result.v22Hcc : response.data.result.hhs;
						record.v23Hcc = response.data.result.v23Hcc ? response.data.result.v23Hcc : response.data.result.hhs;
						record.v24Hcc = response.data.result.v24Hcc;
						record.rxHcc = response.data.result.rxHcc;
						record.icdDesc = response.data.result.icdDesc;
						record.hhs = response.data.result.hhs;
						record.errorCode = '';
					}
				}
			},function(error) {
				setErrorMessage("Error:DX,age/gender validation failed");
			});
		}
		
		$scope.closeImage = function(){
			CordysRoot.winLookup = window.open("/gcm-image-viewer/view/pdfviewer.html","viewer","width=" + screen.width + ",height=" + screen.height);
		}
		 
	}).controller("historyTableController", function($scope, $http, $timeout, historyTableViewModel, dataServiceModel) {

		$scope.historyTableViewModel = historyTableViewModel;
		$http.post('/gcm-app-services/coding/workflow/getChartHistory', dataServiceModel.selectedChart.projContentKey).then(function(response) {
			if (response && response.data && response.data.result) {
				$scope.historyTableViewModel.records = response.data.result;
				$scope.historyTableViewModel.totalRecordsCount = response.data.result.length;
			}
		}, function(error) {
			setErrorMessage("Error:Failed to read chart history");
		});

	}).controller("commentsTableController", function($scope, $http, $timeout,commentsTableViewModel, dataServiceModel) {

		$scope.commentsTableViewModel = commentsTableViewModel;

		$http.post('/gcm-app-services/coding/workflow/getChartComments',dataServiceModel.selectedChart.projContentKey).then(function(response) {
			if (response && response.data.result){
				$scope.commentsTableViewModel.records = response.data.result;
				$scope.commentsTableViewModel.totalRecordsCount = response.data.result.length;
			} 
		},function(error) {
			setErrorMessage("Error:Failed to read chart comments");
		});

	});