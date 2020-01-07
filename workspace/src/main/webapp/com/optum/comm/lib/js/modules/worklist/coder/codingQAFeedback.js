var codingQAFeedbackUImodule = angular.module('codingQAFeedbackUIApp', [ 'uitk.component.uitkPanel', 'uitk.component.uitkDynamicTable',
		'uitk.component.uitkCalendar', 'uitk.component.uitkLabel', 'uitk.component.uitkTextField', 'uitk.component.uitkButton',
		'uitk.component.uitkDialog', 'uitk.component.uitkTextarea', 'uitk.component.uitkLabel', 'ngSanitize' ]);

codingQAFeedbackUImodule
		.controller(
				"codingQAUIController",
				function($scope, $http, $timeout, lookupService, errorMessageModel, dataServiceModel, encounterModel) {
					var CordysRoot = window.parent;
					
					$scope.dataModel = dataServiceModel;
					CordysRoot.rootData.dataModel = dataServiceModel;
					
					$scope.dataModel = dataServiceModel;
					var userObj = optumUI.getUser();
					$scope.dataModel.loginUserKey = userObj.getLoggedInUserKey();
					$scope.dataModel.loginUserId = optumUI.getAuthUser();
					$scope.dataModel.vendorKey = userObj.getDefaultVendorKey();
					$scope.dataModel.currentGroupKey = userObj.getCurrentGroupKey();
					$scope.dataModel.qaReview = 'N';
					$scope.dataModel.chartDetailsObj = {};
					$scope.showCodingInstructions = false;
					$scope.showProgramDirections = false;
					$scope.dataModel = dataServiceModel;
					$scope.dataModel.noDos=false;
					dataServiceModel.selectedChart.projKey = $scope.dataModel.chartDetailsObj.projKey;
					$scope.dataModel.chartInputDetails = {
						projContentKey : dataServiceModel.selectedChart.projContentKey,
						busFuncVenKey : dataServiceModel.selectedChart.busFuncVenKey,
						busFuncKey : '7',
						busFuncStatus : dataServiceModel.selectedChart.chartStatus
					};

					$scope.toggleCIDialog = function() {
						$scope.showCodingInstructions = !$scope.showCodingInstructions;
					}

					$scope.togglePDDialog = function() {
						$scope.showProgramDirections = !$scope.showProgramDirections;
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
						imgDet.busFuncKey = dataServiceModel.selectedChart.busFuncKey;
						imgDet.appName = 'MRM';
						imgDet.viewerType=type;
						imgDet.roleCode=rootData.currentRole;
						return $.base64.encode(JSON.stringify(imgDet));
					}

					$scope.chartInputInfo = {
						projContentKey : dataServiceModel.selectedChart.projContentKey,
						busFuncVenKey : dataServiceModel.selectedChart.busFuncVenKey,
						projKey : $scope.dataModel.chartDetailsObj.projKey,
						busFuncKey : 7,
						toBusFuncStatus : "COMPLETED",
						requestedUserId : $scope.dataModel.loginUserId,
						reasonCode : "",
						groupKey : $scope.dataModel.currentGroupKey,
						userKey : $scope.dataModel.loginUserKey
					};

					$scope.dataModel.updataChartStatus = function(closeCodingUI) {
						$scope.dataModel.showCodingFiltersLoadingDialog = true;
						$scope.chartInputInfo.currentSessionId = dataServiceModel.currentSessionId;
						$scope.chartInputInfo.worklistActivityKey = dataServiceModel.worklistActivityKey;
						$http.post('/gcm-app-services/coding/workflow/updateChartStatus', $scope.chartInputInfo).then(function(response) {
							if (response && response.data && response.data.status == "SUCCESS") {
								
								$scope.closeImage();
								lookupService.url = 'codingworklisttabs.html';
							}
						}, function(error) {
							alert(JSON.stringify(error));
						});
						$scope.dataModel.showCodingFiltersLoadingDialog = false;
					}

					$http
							.post('/gcm-app-services/coding/workflow/getChartDetails', $scope.dataModel.chartInputDetails)
							.then(
									function(response) {
										if (response && response.data && response.data.result) {
											$scope.dataModel.chartDetailsObj = response.data.result;
											// $scope.dataModel.noDosMeetsCriteria
											// =
											// $scope.dataModel.chartDetailsObj.contentEoKey
											// ? 'Y' : 'N';
											
											dataServiceModel.currentSessionId =  response.data.result.currentSessionId;
											dataServiceModel.worklistActivityKey = response.data.result.workId;
											
											$scope.dataModel.noDos=$scope.dataModel.chartDetailsObj.contentEoKey ? 'Y' : 'N';
											if ($scope.dataModel.chartDetailsObj.chartStatus == 'ASSIGNED') {
												$scope.chartInputInfo.projKey = $scope.dataModel.chartDetailsObj.projKey;
												$scope.qaInputFiler = {
													projContentKey : dataServiceModel.selectedChart.projContentKey,
													busFuncVenKey : dataServiceModel.selectedChart.busFuncVenKey,
													projKey : $scope.dataModel.chartDetailsObj.projKey,
													busFuncKey : 7,
													requestedUserId : $scope.dataModel.loginUserId,
													loginUserKey : $scope.dataModel.loginUserKey,
													groupKey : $scope.dataModel.currentGroupKey,
													currentSessionId : dataServiceModel.currentSessionId
												};

												$http
														.post('/gcm-app-services/codingqa/feedback/getCodingQAFeedbackResults', $scope.qaInputFiler)
														.then(
																function(response) {
																	if (response && response.data.result) {
																		$scope.encounterModel.records = response.data.result;
																		$scope.encounterModel.totalRecordsCount = response.data.result.length;
																		$scope.encounterModel.expandedRowObj.index=-1;
																		$scope.encounterModel.expandedRowObj.pageNo=-1;
																		$scope.logCoderProdEvent('OPEN');
																		$scope.getEncAndDxEoCodes();
																	} else {
																		$scope.dataModel.codingErrorMessageModel.content = '<span>Error occured while fetching the details, please contact Administrator</span>';
																		$scope.dataModel.codingErrorMessageModel.visible = true;
																	}
																});
												// $scope.dataModel.updataChartStatus(false);
											}
											$scope.openImage();
										}
									});
						$scope.getEncAndDxEoCodes = function() {					

						$http.post('/gcm-app-services/coding/workflow/getEncEoCodes', $scope.dataModel.chartInputDetails.projContentKey)
						.then(function(response) {
							if (response && response.data && response.data.result) {
								$scope.dataModel.encEoObjList = [];
								for (var i = 0; i < response.data.result.length; i++) {
									var record = response.data.result[i];
									if (record.gcmGroupKey == $scope.dataModel.chartDetailsObj.projOrgGroup) {
										var eoObj = {};
										eoObj.value = record.gcmEoKey;
										eoObj.label = record.gcmEoDesc;
										$scope.dataModel.encEoObjList.push(eoObj);
									}
								}
							}
						});

				};
				
					$scope.dataModel.history = $scope.history = {
						codingUIHistoryModel : {
							id : 'codingUIHistoryPanel',
							title : 'History',
							templateUrl : '../../coding/views/historytemplate.htm',
							open : false,
							panelWidth : '100%',
							panelHeight : 'auto',
							collapsible : true
						},
						historyTableModel : {
							columns : [ {
								columnId : 'actionId',
								label : 'Action',
								layoutOrder : 1,
								cellTemplate : '<span ng-bind="::record.action"> </span>'

							}, {
								columnId : 'userId',
								label : 'User',
								layoutOrder : 2,
								cellTemplate : '<span ng-bind="::record.userName"> </span>'
							}, {
								columnId : 'dateId',
								label : 'Date',
								layoutOrder : 3,
								cellTemplate : '<span ng-bind="::record.actionDate"> </span>'
							} ],
							records : [],
							totalRecordsCount : 0
						}
					};

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
						headingLevel : '2'
					};

					$http.post('/gcm-app-services/coding/workflow/getChartHistory', $scope.dataModel.chartInputDetails.projContentKey).then(
							function(response) {
								if (response && response.data && response.data.result) {
									$scope.history.historyTableModel.records = response.data.result;
									$scope.history.historyTableModel.totalRecordsCount = response.data.result.length;
								}
							}, function(error) {
								alert(JSON.stringify(error));
							});

					$scope.confirmQAFeedback = function() {
						if ($scope.dataModel.qaReview == true) {
							$scope.dataModel.codingErrorMessageModel.visible = false;
							$scope.dataModel.updataChartStatus();
						} else {
							$scope.dataModel.codingErrorMessageModel.content = '<span>Please check reviewed the QA feedback check box</span>';
							$scope.dataModel.codingErrorMessageModel.visible = true;
						}
					}

					// comments section
					$scope.codingUICommentsModel = {
						id : 'codingUICommentsPanel',
						title : 'Comments',
						templateUrl : '../../coding/views/commentstemplate.htm',
						open : false,
						panelWidth : '100%',
						panelHeight : 'auto',
						collapsible : true
					}

					$http.post('/gcm-app-services/coding/workflow/getChartComments', $scope.dataModel.chartInputDetails.projContentKey).then(
							function(response) {
								if (response && response.data.result) {
									$scope.dataModel.comments = response.data.result;
								}
							}, function(error) {
								alert(JSON.stringify(error));
							});

					$scope.closeImage = function() {
						if ((CordysRoot.winLookup) && (!CordysRoot.winLookup.closed)){
							CordysRoot.winLookup = window.open("/viewer/view/pdfviewer.html","viewer","width=" + screen.width + ",height=" + screen.height);
						 }
						 
					}

					 $scope.logCoderProdEvent = function(eventType){
						 $scope.dataModel.showCodingFiltersLoadingDialog = !$scope.dataModel.showCodingFiltersLoadingDialog;
						 $scope.dataModel.eventType = eventType;
						 $scope.dataModel.currentSessionId=$scope.dataModel.chartDetailsObj.currentSessionId;
						 $scope.dataModel.worklistActivityKey=$scope.dataModel.chartDetailsObj.workId;
						CordysRoot.recordEvent(eventType).done(function(response){
						 		$scope.dataModel.showCodingFiltersLoadingDialog = !$scope.dataModel.showCodingFiltersLoadingDialog;
						}).fail(function(response){
								$scope.dataModel.showCodingFiltersLoadingDialog = !$scope.dataModel.showCodingFiltersLoadingDialog;
								 $scope.dataModel.setErrorMessage("Error: Failed to record " + eventType + " event ");
						});
					 }
					
					
					
					$scope.encounterModel = encounterModel;

					$scope.exitCodingUI = function() {
						$scope.dataModel.showEncounterSection = false;
						$scope.closeImage();
						$scope.logCoderProdEvent('CLOSE');
						lookupService.url = 'codingworklisttabs.html';
					}
					$scope.encounterModel.onRowSelect = function(event, record, index) {
						$scope.dataModel.codingErrorMessageModel.visible = false;
						if (event.target.tagName === 'SELECT' || event.target.tagName === 'OPTION' || event.target.tagName === 'INPUT' ||  $scope.showencEoDescCoder || $scope.showencEoDescQA)
							return;

						if (this.pagination.currentPageNumber != this.expandedRowObj.pageNo)
							this.expandedRowObj.index = -1;
						if(this.expandedRowObj.index!==-1)
							this.expandedRowObj.index = index;
							this.expandedRowObj.pageNo = this.pagination.currentPageNumber;
							this.records[index].open = !this.records[index].open;
							if (!this.records[index].open)
							{
							this.subTableViewModel.records = [];
							this.subTableViewModel.totalRecordsCount = 0;
							this.expandedRowObj.index = -1;
							}
					};
					
					$scope.showencEoDescQA = false;
					$scope.encounterModel.openWindowQA = function(record){
						 $scope.showencEoDescQA = true;
						 $scope.encounterModel.encEoDescValueQA = [];
						 if(record.eoKeyListQA!==null && record.eoKeyListQA.length > 0){
						 angular.forEach(record.eoKeyListQA, function(value1, key){
							 angular.forEach($scope.dataModel.encEoObjList, function(k, v){
								if(k.value ===record.eoKeyListQA[key]){
								$scope.encounterModel.encEoDescValueQA.push(k.label);
								}
							 });
							});
						 }
						 else{
							 $scope.encounterModel.encEoDescValueQA.push('None Selected');
						 }
							 
					 }
					$scope.toggleEncEoDescQA = function(){
						 $scope.showencEoDescQA = false;
					 }
					
					$scope.showencEoDescCoder = false;
					$scope.encounterModel.openWindowCoder = function(record){
						 $scope.showencEoDescCoder = true;
						 $scope.encounterModel.encEoDescValueCoder = [];
						 if(record.eoKeyList!==null && record.eoKeyList.length > 0){
						 angular.forEach(record.eoKeyList, function(value, key){
							 angular.forEach($scope.dataModel.encEoObjList, function(k, v){
								 if(k.value===record.eoKeyList[key])
								$scope.encounterModel.encEoDescValueCoder.push(k.label);
							 });
							});
						 }
						 else{
							 $scope.encounterModel.encEoDescValueCoder.push('None Selected');
						 }
					 }
					$scope.toggleEncEoDescCoder = function(){
						 $scope.showencEoDescCoder = false;
					 }
					

					$scope.encounterModel.eoCodeList={};
				});
codingQAFeedbackUImodule.controller("codingHistoryUIController",
		function($scope, $http, $timeout, lookupService, errorMessageModel, dataServiceModel) {
			$scope.dataModel = dataServiceModel;
			$scope.history = $scope.dataModel.history;
		});

codingQAFeedbackUImodule.controller("codingCommentsUIController", function($scope, $http, encounterModel, $timeout, lookupService, errorMessageModel,
		dataServiceModel) {
	$scope.dataModel = dataServiceModel;
	$scope.comments = $scope.dataModel.comments;

});
codingQAFeedbackUImodule
		.factory(
				"encounterModel",
				function(dataServiceModel) {

					return {
						pagination : {
							currentPageNumber : 1,
							paginationWindow : 5,
							recordsPerPage : 5,
							recordsPerPageChoices : [ 5, 10, 25 ],
							showPaginationFooter : false,
							totalRecordsCount : false
						},
						id : 'encounterTable',
						records : [],
						enableSplitHeader : true,
						columns : [
								{
									columnId : 'actionImage',
									label : '',
									layoutOrder : 1,
									cellTemplate : "<span class='cux-icon-warning' ng-if=\"record.qaEncActionCd == 'MODIFY'\"> </span><span class='cux-icon-checkmark_hollow' ng-if=\"record.qaEncActionCd == 'VALID'\"> </span><span class='cux-icon-prohibited_x' ng-if=\"record.qaEncActionCd == 'NOT VALID'\"> </span>",
									groupLabel : 'Coder',
									numberOfSplitHeaders : 7,
									// style : "width: 3%;",
									splitHeaderIndex : 1
								},
								{
									columnId : 'dos',
									label : 'DOS',
									layoutOrder : 2,
									numberOfSplitHeaders : 7,
									splitHeaderIndex : 2,
									// style : "width: 12%;",
									cellTemplate : '<span>{{ record.coderDOSFromDate}} - {{ record.coderDOSThruDate}} </span>'
								},
								{
									columnId : 'pageNumber',
									label : '#Page',
									layoutOrder : 3,
									numberOfSplitHeaders : 7,
									splitHeaderIndex : 3,
									cellTemplate : '<span ng-bind="::record.coderPageNum"> </span>'
								},
								{
									columnId : 'rendProvMatch',
									label : '<span><uitk:icon-font title="Does the rendering provider match the provider displayed above?" icon="cux-icon-info_hollow"></uitk:icon-font> Rendering Provider Match</span>',
									layoutOrder : 4,
									numberOfSplitHeaders : 7,
									// style : "width: 5%;",
									splitHeaderIndex : 4,
									cellTemplate : '<span ng-bind="::record.coderRetProvFlag"> </span>'
								},
								{
									columnId : 'coderProvNPI',
									label : 'NPI',
									layoutOrder : 5,
									numberOfSplitHeaders : 7,
									splitHeaderIndex : 5,
									cellTemplate : '<span ng-bind="::record.coderProvNPI"> </span>'
								},
								{
									columnId : 'provName',
									label : 'Provider Name',
									layoutOrder : 6,
									numberOfSplitHeaders : 7,
									splitHeaderIndex : 6,
									cellTemplate : '<span>{{record.coderProvLastName}}, {{record.coderProvFirstName}} </span>'
								},
								{
									columnId : 'coderEncEoDesc',
									label : 'Encounter EO Code',
									sortable : false,
									layoutOrder : 7,
									numberOfSplitHeaders : 7,
									splitHeaderIndex : 7,
									cellTemplate:'<a ng-click="model.openWindowCoder(record)"><span>view</span></a>',
								},
								{
									columnId : 'qadosFromDt',
									label : 'DOS',
									layoutOrder : 8,
									groupLabel : 'QA',
									numberOfSplitHeaders : 6,
									splitHeaderIndex : 1,
									style : 'border-left-style:solid;border-left-color : darkgrey',
									cellTemplate : '<span>{{record.qaDOSFromDate}} - {{record.qaDOSThruDate}} </span>'
								},
								{
									columnId : 'qapageNumber',
									label : '#Page',
									layoutOrder : 9,
									numberOfSplitHeaders : 6,
									splitHeaderIndex : 2,
									cellTemplate : '<span ng-bind="::record.qaPageNum"> </span>'
								},
								{
									columnId : 'qaretrievalFlag',
									label : '<span><uitk:icon-font title="Does the rendering provider match the provider displayed above?" icon="cux-icon-info_hollow"></uitk:icon-font> Rendering Provider Match</span>',
									layoutOrder : 10,
									numberOfSplitHeaders : 6,
									// style : "width: 5%;",
									splitHeaderIndex : 3,
									cellTemplate : '<span ng-bind="::record.qaRetProvFlag"> </span>'
								}, {
									columnId : 'qaNPI',
									label : 'NPI',
									layoutOrder : 11,
									numberOfSplitHeaders : 6,
									splitHeaderIndex : 4,
									cellTemplate : '<span ng-bind="::record.qaProvNPI"> </span>'
								}, {
									columnId : 'qaprovName',
									label : 'Provider Name',
									layoutOrder : 12,
									numberOfSplitHeaders : 6,
									splitHeaderIndex : 5,
									cellTemplate : '<span>{{record.qaProvLastName}}, {{record.qaProvFirstName}} </span>'
								}, {
									columnId : 'qaEncEoDesc',
									label : 'Encounter EO Code',
									sortable : false,
									layoutOrder : 13,
									numberOfSplitHeaders : 6,
									splitHeaderIndex : 6,
									cellTemplate:'<a ng-click="model.openWindowQA(record)"><span>view</span></a>',
								} ],
						subColumns : [
									{
										columnId : 'coderDx',
										label : 'DX Code - HCC, Rx',
										layoutOrder : 1,
										cellTemplate : '<span ng-if="record.coderHccModelCatHhs==null">{{record.coderICDDxCode}}{{dataModel.chartDetailsObj.busSegment}} - <br/>V22: {{record.coderRxV22 ? record.coderRxV22  : "N/A"}}'
												+' <span ng-if="record.coderRxV24"></br>V24: {{record.coderRxV24}}<br/></span>, {{record.coderRxHcc ? record.coderRxHcc : "N/A"}} </span><span ng-if="record.coderHccModelCatHhs!=null">{{record.coderICDDxCode}} - {{record.coderHccModelCatHhs}} </span>',
										style : 'width:27%',
										sortable : false
									},
									{
										columnId : 'coderDxEoDesc',
										label : 'DX EO Code',
										layoutOrder : 2,
										cellTemplate : '<span ng-bind="record.coderDxEoDesc"> </span>',
										style : 'width:27%',
										sortable : false
									},
									{
										columnId : 'qaIcdDxCd',
										label : 'DX',
										layoutOrder : 3,
										style :'border-left-style :solid;border-left-color : darkgrey',
										cellTemplate : '<span>{{record.qaICDDxCode}} </span>',
										sortable : false
									},
									{
										columnId : 'qaRxV22',
										label : 'HCC',
										sortable : false,
										layoutOrder : 4,
										cellTemplate : '<span ng-if="record.qaHccModelCatHhs==null">V22: {{record.qaRxV22}}<span ng-if="record.qaRxV24"><br/>V24: {{record.qaRxV24}}</span></span><span ng-if="record.qaHccModelCatHhs!==null">{{record.qaHccModelCatHhs}} </span>'
									},
									{
										columnId : 'qaRxHcc',
										label : 'RX HCC',
										sortable : false,
										layoutOrder : 5,
										cellTemplate : '<span ng-bind="record.qaRxHcc"> </span>',
									},
									{
										columnId : 'qaDxEoDesc',
										label : 'DX EO Code',
										sortable : false,
										layoutOrder : 6,
										cellTemplate : '<span ng-bind="record.qaDxEoDesc"> </span>'
									},
									{
										columnId : 'qaDxAction',
										label : '',
										sortable : false,
										layoutOrder : 7,
										cellTemplate : "<span class='cux-icon-warning' ng-if=\"record.qaDxActionCd == 'MODIFY'\"> </span><span class='cux-icon-checkmark_hollow' ng-if=\"record.qaDxActionCd == 'VALID'\"> </span><span class='cux-icon-prohibited_x' ng-if=\"record.qaDxActionCd == 'NOT VALID'\"></span>"
									}

							],
						rowTemplate : [
								'<td colspan="{{model.columns.length}}" ng-class="{\'tk-dtbl-expanded\':model.records[$index].open}" ng-init="model.records[$index].open=false;name=\'expandableRows\';parentIndex=$index" class="tk-dtbl-cell tk-padding-none">',
								'		<table class="tk-dtbl" role="grid" aria-readonly="true">',
								'			<tbody>',
								'				<tr ng-click="model.onRowSelect($event,record,$index)" aria-expanded="{{model.records[$index].open}}" role="link" 		id="{{name}}{{parentIndex}}" uitk-navigable>',
								'<td  ng-class="{\' tk-dtbl-cell-active tk-dtbl-cell-actived\':open}" id="{{::name}}{{::parentIndex}}-vm200" class="tk-dtbl-cell"><uitk:icon-font ng-if="!record.open" icon="cux-icon-caret_right"></uitk:icon-font><uitk:icon-font ng-if="record.open" icon="cux-icon-caret_down_centered"></uitk:icon-font><span class="cux-icon-warning" ng-if="record.qaEncActionCd == \'MODIFY\'"> </span><span class="cux-icon-checkmark_hollow" ng-if="record.qaEncActionCd ==\'VALID\'"> </span><span class="cux-icon-prohibited_x" ng-if="record.qaEncActionCd == \'NOT VALID\'"> </span></td>',
								'                   <td ng-class="{\' tk-dtbl-cell-active tk-dtbl-cell-actived\':open}" id="{{::name}}{{::parentIndex}}-vm203" class="tk-dtbl-cell">{{ record.coderDOSFromDate}} - {{ record.coderDOSThruDate}}</td>',
								'                   <td ng-class="{\' tk-dtbl-cell-active tk-dtbl-cell-actived\':open}" id="{{::name}}{{::parentIndex}}-vm201" class="tk-dtbl-cell">{{::record.coderPageNum}}</td>',
								'                   <td ng-class="{\' tk-dtbl-cell-active tk-dtbl-cell-actived\':open}" id="{{::name}}{{::parentIndex}}-vm202" class="tk-dtbl-cell"><span ng-if="record.coderRetProvFlag==\'Y\'">Yes</span><span ng-if="record.coderRetProvFlag==\'N\'">No<uitk:icon-font title="{{record.coderProvLastName}}, {{record.coderProvFirstName}}, NPI: {{record.coderProvNPI}}" icon="cux-icon-info_hollow"></uitk:icon-font></span></td>',
								'                   <td ng-class="{\' tk-dtbl-cell-active tk-dtbl-cell-actived\':open}" id="{{::name}}{{::parentIndex}}-vm203" class="tk-dtbl-cell">{{::record.coderProvNPI}}</td>',
								'                   <td ng-class="{\' tk-dtbl-cell-active tk-dtbl-cell-actived\':open}" id="{{::name}}{{::parentIndex}}-vm201" class="tk-dtbl-cell">{{record.coderProvLastName!=null?record.coderProvLastName+", ":""}}{{record.coderProvFirstName}}</td>',
								'                   <td ng-class="{\' tk-dtbl-cell-active tk-dtbl-cell-actived\':open}" id="{{::name}}{{::parentIndex}}-vm202" class="tk-dtbl-cell"><a ng-click="model.openWindowCoder(record)"><span>view</span></a></td>',
								'                   <td style="border-left-style : solid;border-left-width : medium;border-left-color : darkgrey" ng-class="{\' tk-dtbl-cell-active tk-dtbl-cell-actived\':open}" id="{{::name}}{{::parentIndex}}-vm203" class="tk-dtbl-cell">{{ record.qaDOSFromDate!=null?record.qaDOSFromDate+" - ": ""}}{{ record.qaDOSThruDate}}</td>',
								'                   <td ng-class="{\' tk-dtbl-cell-active tk-dtbl-cell-actived\':open}" id="{{::name}}{{::parentIndex}}-vm203" class="tk-dtbl-cell">{{::record.qaPageNum}}</td>',
								'                   <td ng-class="{\' tk-dtbl-cell-active tk-dtbl-cell-actived\':open}" id="{{::name}}{{::parentIndex}}-vm201" class="tk-dtbl-cell"><span ng-if="record.qaRetProvFlag==\'Y\'">Yes</span><span ng-if="record.qaRetProvFlag==\'N\'">No<uitk:icon-font title="{{record.qaProvLastName}}, {{record.qaProvFirstName}}, NPI: {{record.qaProvNPI}}" icon="cux-icon-info_hollow"></uitk:icon-font></span></td>',
								'                   <td ng-class="{\' tk-dtbl-cell-active tk-dtbl-cell-actived\':open}" id="{{::name}}{{::parentIndex}}-vm202" class="tk-dtbl-cell">{{::record.qaProvNPI}}</td>',
								'                   <td ng-class="{\' tk-dtbl-cell-active tk-dtbl-cell-actived\':open}" id="{{::name}}{{::parentIndex}}-vm203" class="tk-dtbl-cell">{{ record.qaProvLastName!=null?record.qaProvLastName+", ":""}}{{ record.qaProvFirstName}}</td>',
								'                   <td ng-class="{\' tk-dtbl-cell-active tk-dtbl-cell-actived\':open}" id="{{::name}}{{::parentIndex}}-vm203" class="tk-dtbl-cell"><a ng-click="model.openWindowQA(record)"><span>view</span></a></td>',

								'				</tr> <tr>',
								'					<td ng-if="model.records[$index].open" colspan="{{model.columns.length}}" ng-init="model.subTableViewModel = model.updateSubTableViewModel(record, $index)">',
								'                   <span ng-if="model.subTableViewModel"><uitk:dynamic-table class="childTable" model="model.subTableViewModel"></uitk:dynamic-table></span><br>',
								' 					<div> <uitk:label id=\'commentsId\' name=\'comments\'>Comments</uitk:label> <span>{{record.qaEncComment}}</span></div><br> ',
								'</td> </tr>', '			</tbody> </table> </td>' ].join(''),

						expandedRowObj : {
							index : -1,
							pageNo : -1
						},
						updateSubTableViewModel : function(record, index) {
							angular.forEach(record.qafeedbackDxDetails, function(obj, idx) {
								obj.index = idx;
							});
							var that = this;
					var subTableViewModel = {
							componentId : 'sub-table' + index,
							id : 'subTable' + index,
							columns : this.subColumns,
							records : record.qafeedbackDxDetails,
							totalRecordsCount : record.qafeedbackDxDetails.length,
							expandedRow : record
						}
						return angular.copy(subTableViewModel);
						}
					}
				});
