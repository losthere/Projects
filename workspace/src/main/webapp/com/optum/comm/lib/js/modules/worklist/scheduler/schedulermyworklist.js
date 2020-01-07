schedulerworklistmodule.controller("myWorklistController", function($scope, $compile, $timeout, $http, myWorklistTableModel, staticDataService,
		dataServiceModel,lookupService) {
	$scope.dataModel = dataServiceModel;
	$scope.dataModel.myWorklistModel = myWorklistTableModel;
	$scope.dataModel.showFiltersLoadingDialog = false;
	lookupService.filters.currentTab = "myWorklistTab";
	
	if(lookupService.clearWorklistFilters){
		lookupService.clear();
		lookupService.filter();
		lookupService.clearWorklistFilters = false;
	}
	
	myWorklistTableModel.modifiedSelectedRecords = [];
	
	myWorklistTableModel.makeAnAppointment = function() {
		$scope.dataModel.clearBanners();
		if (!$scope.dataModel.recordModified) {
			$scope.dataModel.workListWarningMessageModel.visible=false;
			$scope.dataModel.selectedMyApptId = "";
			$scope.dataModel.clearApptData();
			if ($scope.dataModel.myWorklistModel.selectedRecords && $scope.dataModel.myWorklistModel.selectedRecords.length > 0) {
				$scope.dataModel.readChartStatusDetails();
				$scope.dataModel.showWorklist = false;
				$scope.dataModel.showViewAppt = false;
				$scope.dataModel.wizardModel.currentStep = 1;
			} else {
				var errorMessage = "Select the row(s) to be included in the appointment.";
				$scope.dataModel.setMessage(errorMessage, "error");
			}
		}
		else {
			var errorMessage = "You have unsaved edits. Select Save to save these edits and continue to Make an Appointment. Select Cancel to return to My Worklist and continue editing";
			$scope.dataModel.setMessage(errorMessage, "error");
		}
	}
	myWorklistTableModel.releaseToAssignment = function() {
		$scope.dataModel.clearBanners();
		if (!$scope.dataModel.recordModified) {
			if ($scope.dataModel.myWorklistModel.selectedRecords && $scope.dataModel.myWorklistModel.selectedRecords.length > 0) {
			//	$scope.dataModel.showMyWorklistLoadingDialog = true;
				$scope.releaseToassignmentInput = {
					"retStatus" 		: "NEW",
					"requestedUserId"	: $scope.dataModel.loginUserId,
					"retMethod"			: "FAX",
					"chartIdList"		: [],
					"chartIdExclList"	: [],
					"loginUserKey"		: $scope.dataModel.loginUserKey,
					"assignInventorySearchFilter" : $scope.dataModel.myWorklistModel.selectedRecords,
					"appt" 				: {}
				}
				$scope.dataModel.showFiltersLoadingDialog = true;
				$http.post('/gcm-app-services/scheduling/workflow/releaseToAssignment', $scope.releaseToassignmentInput).then(function(response) {
					$scope.dataModel.showFiltersLoadingDialog = false;
					var successMessage = "Selected items returned to the assignment queue for reassignment.";
					//$scope.dataModel.setMessage(successMessage, "success");
					lookupService.filter(successMessage, "success");
					$scope.dataModel.clearWorkListData();
				}, function(error) {
					$scope.dataModel.showFiltersLoadingDialog = false;
					var errorMessage = JSON.stringify(error);
					$scope.dataModel.setMessage(errorMessage, "error");
					return false;
				});
				
			}		
			else {
				var errorMessage = "Select the row(s) to be released to assignment.";
				$scope.dataModel.setMessage(errorMessage, "error");
			}
		}
		else {
			var errorMessage = "You have unsaved edits. Select Save to save these edits and continue to Release to Assignment. Select Cancel to return to My Worklist and continue editing";
			$scope.dataModel.setMessage(errorMessage, "error");
		}
	}

	myWorklistTableModel.verifyRecordsModified = function(providerInfo) {
		providerInfo.edit=true;
		$scope.dataModel.recordModified = true;
		var i = 0;
		if (providerInfo.selected) {
			angular.forEach(myWorklistTableModel.modifiedSelectedRecords, function (providerInfo1) {
				if (providerInfo.index == providerInfo1.index) {
					myWorklistTableModel.modifiedSelectedRecords.splice(i,1);
				}
				i++;
			});
			myWorklistTableModel.modifiedSelectedRecords.push(providerInfo);
		}
	}
	
	myWorklistTableModel.onExport = function(filterCondition, initiateExport) {
		$scope.dataModel.clearBanners();
		if(myWorklistTableModel.selectedRecords && myWorklistTableModel.selectedRecords.length > 0) {
			var errorMessage = "Unselect the record to export";
			$scope.dataModel.setMessage(errorMessage, "error");
		}
		else{
			if (!$scope.dataModel.recordModified) {
				$scope.initiateExport = initiateExport;
				staticDataService.query(filterCondition, $scope.dataModel.myWorklistModel.originalRecords, function(result) {
					$scope.initiateExport(result, lookupService.filters.currentTab);
				});
			}
			else {
				var errorMessage = "You have unsaved edits. Select Save to save these edits and continue to Export. Select Cancel to return to My Worklist and continue editing";
				$scope.dataModel.setMessage(errorMessage, "error");
			}
		}
	};
			
	myWorklistTableModel.saveProviderInfo = function() {
		$scope.dataModel.clearBanners();
		if (myWorklistTableModel.modifiedSelectedRecords && myWorklistTableModel.modifiedSelectedRecords.length > 0) {
			//$scope.dataModel.showMyWorklistLoadingDialog = true;
			var formattedModifiedRecords = [];
			var invalidRecords = false;
			angular.forEach(myWorklistTableModel.modifiedSelectedRecords, function (newProviderInfo) {
				if (validateProviderInfo(newProviderInfo)) {
					invalidRecords = true;
					var formattedModifedRecord = {};
					angular.forEach($scope.dataModel.oldWorklistRecords, function (oldProviderInfo) {
						if (newProviderInfo.index == oldProviderInfo.index) {
							if(oldProviderInfo.$$hashKey) {	
								delete oldProviderInfo.$$hashKey;
							}
							formattedModifedRecord.schedulingInventory = oldProviderInfo;
							formattedModifedRecord.address = newProviderInfo.provLocation;
							formattedModifedRecord.phone = newProviderInfo.provPhone;
							formattedModifedRecord.fax = newProviderInfo.provFax;
							formattedModifedRecord.userId = newProviderInfo.userKey;
						}
					});
					formattedModifiedRecords.push(formattedModifedRecord);
				}
			});
				var providerDetails = {
							providerDetails : formattedModifiedRecords,
							schedulingSearchFilter : $scope.dataModel.SchedulingSearchFilter
					};
			if (invalidRecords) {
				$scope.dataModel.showFiltersLoadingDialog = true;
				$http.post('/gcm-app-services/scheduling/workflow/updateWorkListProviderDetails', providerDetails).then(function(response) {
					var message = '';
					if(response.data.status === 'SUCCESS'){
					$scope.dataModel.showFiltersLoadingDialog = false;
						message = 'Provider Info saved successfully';
					}
					myWorklistTableModel.modifiedSelectedRecords = [];
					myWorklistTableModel.selectedRecords = [];
					$scope.dataModel.recordModified = false;
					lookupService.filter(message, "success");
					invalidRecords = false;
				}, function(error) {
					$scope.dataModel.showFiltersLoadingDialog = false;
					$scope.dataModel.setMessage('Provider Info saved failed', "error");
					return false;
				});
			}
			
		}
		else {
			$scope.dataModel.setMessage('Modify and select atleast one record to save', "error");
		}
	}
	
	function validateProviderInfo(newProviderInfo) {
		if(newProviderInfo.provFax) {
			var faxPattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
			var faxRegEx = new RegExp(faxPattern);
			var faxFlag = faxRegEx.test(newProviderInfo.provFax);
			var faxPattern1 = /^\d{10}$/;
			var faxRexEx1 = new RegExp(faxPattern1);
			var faxFlag1 = faxRexEx1.test(newProviderInfo.provFax);
			if((!faxFlag && !faxFlag1) || newProviderInfo.provFax.length > 12)
			{
				$scope.dataModel.setMessage('Fax Not Valid', "error");
				return false;
			}
		}
		if(newProviderInfo.provPhone) {
			var phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
			var phoneRegEx = new RegExp(phonePattern);
			var phoneFlag = phoneRegEx.test(newProviderInfo.provPhone);
			var phonePattern1 = /^\d{10}$/;
			var phoneRegEx1 = new RegExp(phonePattern1);
			var phoneFlag1 = phoneRegEx1.test(newProviderInfo.provPhone);
			if((!phoneFlag && !phoneFlag1) || newProviderInfo.provPhone.length > 12)
			{
				$scope.dataModel.setMessage('Phone Number Not Valid', "error");
				return false;
			}
		}
		if(!newProviderInfo.provPhone) {
			$scope.dataModel.setMessage('Phone Number Required', "error");
			return false;
		}
		return true
	}
	
	myWorklistTableModel.cancelProviderInfo = function() {
		//if (myWorklistTableModel.selectedRecords && myWorklistTableModel.selectedRecords.length > 0) {
			$scope.dataModel.clearBanners();
			$scope.dataModel.cancelClick = true;
			lookupService.filter();
			$scope.dataModel.cancelClick = false;
			$scope.dataModel.recordModified = false;
		//}
	}
});

schedulerworklistmodule.factory("myWorklistTableModel",	function(dataServiceModel,staticDataService) {
	return {
		links : [
				'<a href="" ng-click="model.makeAnAppointment()"><uitk:icon-font icon="cux-icon-add2"></uitk:icon-font> Make an Appointment</a>',
				'<a href="" ng-click="model.releaseToAssignment()"><uitk:icon-font icon="cux-icon-undo"></uitk:icon-font> Release to Assignment</a>' ],
		pagination : {
			currentPageNumber : 1,
			paginationWindow : 5,
			recordsPerPage : 10,
			recordsPerPageChoices : [ 10, 15, 25 ]
		},
		columns : [
				{
					columnId : 'multiSelect',
					layoutOrder : 1,
					resizable : false,
					style : "width: 5%;",
					align : "center",
					excludeFromExport : true,
					cellHeaderTemplate : [ '<label for="selectAllCheckboxId1" class="oui-a11y-hidden">Select All Checkbox</label> ',
							'<input type="checkbox" ng-model="model.selectAllChecked" id="selectAllCheckboxId1" ng-change="model.onSelectAllRows(model.selectAllChecked);"/> ' ]
							.join(''),
					cellTemplate : [ '<label for="{{record.index}}" class="oui-a11y-hidden">Select Row</label> ',
							'<input type="checkbox" id="{{record.index}}" ng-model="record.selected" ng-click="model.onRowSelect($event, record, record.selected);"/>' ]
							.join('')
				},
				{
					columnId : 'count',
					label : '#Chart ID',
					layoutOrder : 2,
					resizable : false,
					sortOrder : 1,
					sortable : true,
					cellTemplate : '<span ng-bind="::record.count"> </span>'
				},
				{
					columnId : 'provGroupName',
					label : 'Group Name',
					layoutOrder : 3,
					resizable : false,
					sortOrder : 0,
					sortable : true,
					cellTemplate : '<span ng-bind="::record.provGroupName"> </span>'
				},
				{
					columnId : 'provName',
					label : 'Provider Name',
					layoutOrder : 4,
					resizable : false,
					sortOrder : 0,
					sortable : true,
					cellTemplate : '<span style="text-transform:capitalize" ng-bind="::record.provName"> </span>'
				},
				{
					columnId : 'provId',
					label : 'Provider ID',
					layoutOrder : 5,
					resizable : false,
					sortOrder : 0,
					sortable : true,
					cellTemplate : '<span ng-bind="::record.provId"> </span>'
				},
				{
					columnId : 'provLocation',
					label : 'Location',
					layoutOrder : 6,
					resizable : false,
					sortOrder : 0,
					sortable : true,
					style : "width : 20%",
					cellTemplate: '<span ng-bind="::record.provLocation" ng-if="!record.selected"/> <input type="text" ng-if="record.selected" ng-model="record.provLocation" ' +
						'style="width:100%;" ng-change="model.verifyRecordsModified(record)"/>'
				},
				{
					columnId : 'provPhone',
					label : 'Phone',
					layoutOrder : 7,
					resizable : false,
					sortOrder : 0,
					sortable : true,
					style : "width : 9%",
					cellTemplate: '<span ng-bind="::record.provPhone" ng-if="!record.selected"/> <input type="text" ng-if="record.selected" ng-model="record.provPhone" ' +
						'style="width:105%;" ng-change="model.verifyRecordsModified(record)"/>'
				},
				{
					columnId : 'provFax',
					label : 'Fax',
					layoutOrder : 8,
					resizable : false,
					sortOrder : 0,
					sortable : true,
					style : "width : 7%",
					cellTemplate: '<span ng-bind="::record.provFax" ng-if="!record.selected"/><input type="text" ng-if="record.selected" ng-model="record.provFax" ' +
						'style="width:105%;" ng-change="model.verifyRecordsModified(record)"/>'
				},
				{
					columnId : 'specialCategory',
					label : 'Special Handling',
					layoutOrder : 9,
					resizable : false,
					sortOrder : 0,
					sortable : true,
					cellTemplate : '<span> {{record.specialCategory ? record.specialCategory+"-" : ""}}{{record.specialNotes}}</span>'
				} ],
		records : [],
		totalRecordsCount : 0,
		selectedRecordCount : 0,
		selectedRecords : [],
		modifiedSelectedRecords : [],
		onSelectAllRows : function(selectAll) {

			var model = this;
			var availableRecords = model.records.slice();
			var selectedRecordIds = [];
			for (var i = 0; i < model.selectedRecords.length; i++)
				selectedRecordIds.push(model.selectedRecords[i].index);
			
			for (var row = 0; row < availableRecords.length; row++) {
				var recordIndex = selectedRecordIds.indexOf(availableRecords[row].index);
				if (selectAll) {
					availableRecords[row].selected = true;
					if (recordIndex < 0) {
						model.selectedRecords.push(availableRecords[row]);
						if(model.selectedRecords[row].edit) {
							model.modifiedSelectedRecords.push(model.selectedRecords);
						}
					}
				} else {
					if (availableRecords[row].selected) {
						model.selectedRecords.splice(recordIndex, 1);
						selectedRecordIds.splice(recordIndex, 1);
						availableRecords[row].selected = false;
						model.modifiedSelectedRecords.splice(recordIndex, 1);
					}
				}
			}
			this.selectedRecordCount = this.selectedRecords.length;

		},
		onRowSelect : function(event, record, selected) {
			var model = this;
			var modifiedSelectedRecords = [];

			if (typeof selected === 'undefined') {
				if (event.target.tagName === 'A' || event.target.tagName === 'INPUT') {
					return;
				}
				record.selected = !record.selected;
				selected = record.selected;
			}
			if (!selected && model.selectAllChecked)
				model.selectAllChecked = false;
			var recordIndex = -1;
			var selectedIndex=0;
			for (var i = 0; i < model.selectedRecords.length; i++) {
					selectedIndex=record.index;
				if (model.selectedRecords[i].index == record.index)
					recordIndex = i;
			}

			if (selected) {
				if (recordIndex < 0) {
					model.selectedRecords.push(record);
					if (record.edit) {
						model.modifiedSelectedRecords.push(record);
					}
				}
			} else {
				model.selectedRecords.splice(recordIndex, 1);
				model.modifiedSelectedRecords.splice(recordIndex, 1);
			}

			var availableRecords = model.records;
			var allSelected = true;

			for (var i = 0; i < availableRecords.length; i++) {
				if (!availableRecords[i].selected) {
					allSelected = false;
					break;
				}
			}

			if (availableRecords.length > 0)
				model.selectAllChecked = allSelected;

			this.selectedRecordCount = this.selectedRecords.length;
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
});