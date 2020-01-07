var codingWorklistModule = angular.module("codingWorklistViewModel", []).factory("myWorklistViewModel",function(dataServiceModel) {

	return {
		id : 'worklistTable',
		records : [],
		totalRecordsCount : 0,
		selectedRecordCount : 0,
		selectedRecords : [],
		 links : [ '<img class="img" style="margin-bottom: -3px" src="../../lib/images/release.png"><a href="" ng-click="model.linkClick()">Release to Assignment</a>','<uitk:icon-font icon="cux-icon-remove"></uitk:icon-font><a href="" ng-click="model.clearAll()">Clear All Selected Items</a>' ],
		pagination : {
			currentPageNumber : 1,
			recordsPerPage : 10,
			recordsPerPageChoices : [ 10, 15, 25 ]
		},
		columns : [
			{
				columnId : 'multiSelect',
				resizable : false,
				layoutOrder : 1,
				align : "center",
				excludeFromExport : true,
				cellHeaderTemplate : [
					'<label for="selectAllCheckboxId1" class="oui-a11y-hidden">Select All Checkbox</label> ',
					'<input type="checkbox" ng-model="model.selectAllChecked" ng-disabled="model.records.length === 0" id="selectAllCheckboxId1" ng-change="model.onSelectAllRows(model.selectAllChecked);"/> ' ]
			.join(''),
			cellTemplate : [ '<label for="{{record.chartId}}" class="oui-a11y-hidden">Select Row</label> ',
				'<input type="checkbox" id="{{record.chartId}}" ng-model="record.selected" ng-click="model.onRowSelect($event, record, record.selected);"/>' ]
			.join(''),
			}, {
				columnId : 'chartId',
				resizable : false,
				label : 'Chart ID',
				layoutOrder : 2,
				sortable : true,
				sortOrder : 1,
				cellTemplate : '<uitk:icon-font icon="cux-icon-warning_filled" ng-show="record.escalatedFlag == \'Y\'"></uitk:icon-font><a href="#" ng-click="model.onChartIdClick(record)"><span>{{record.chartId}}</span></a>',
			}, {
				columnId : 'clientCode',
				resizable : false,
				label : 'Health Plan',
				layoutOrder : 3,
				sortable : true,
				sortOrder : 0,
				cellTemplate : '<span ng-bind="::record.clientCode"></span>'
			}, {
				columnId : 'hpCode',
				resizable : false,
				label : 'Health Plan Name',
				layoutOrder : 4,
				sortable : true,
				sortOrder : 0,
				cellTemplate : '<span ng-bind="::record.hpCode"></span>'
			}, {
				columnId : 'hpProduct',
				resizable : false,
				label : 'Health Plan Product',
				layoutOrder : 5,
				sortable : true,
				sortOrder : 0,
				cellTemplate : '<span ng-bind="::record.hpProduct"></span>'
			}, {
				columnId : 'provGroupName',
				resizable : false,
				label : 'Group Name',
				layoutOrder : 6,
				sortable : true,
				sortOrder : 0,
				cellTemplate : '<span ng-bind="::record.provGroupName"></span>'
			}, {
				columnId : 'assignedDate',
				resizable : false,
				label : 'Assigned Date',
				layoutOrder : 7,
				sortable : true,
				sortOrder : 0,
				dataType: 'date',
				cellTemplate : '<span ng-bind="::record.assignedDate | date:\'MM-dd-yyyy\'"></span>'
			}, {
				columnId : 'chartStatus',
				resizable : false,
				label : 'Status',
				layoutOrder : 8,
				sortable : true,
				sortOrder : 0,
				align : "center",
				cellTemplate : '<span ng-bind="::record.chartStatus"></span>'
			}, {
				columnId : 'pageCount',
				resizable : false,
				label : 'Page Count',
				sortOrder : 0,
				sortable : true,
				layoutOrder : 9,
				cellTemplate : '<span ng-bind="::record.pageCount"></span>',
			}, {
				columnId : 'chartScoreGroup',
				resizable : false,
				label : 'CSG',
				sortOrder : 0,
				sortable : true,
				layoutOrder : 10,
				cellTemplate : '<span ng-bind="::record.chartScoreGroup"></span>'
			}, {
				columnId : 'programName',
				resizable : false,
				label : 'Program',
				sortOrder : 0,
				sortable : true,
				layoutOrder : 11,
				cellTemplate : '<span ng-bind="::record.programName"></span>'
			} ]

	}
});
codingWorklistModule.factory("completedWorkItemsViewModel", function(dataServiceModel) {

	return {
		id : 'worklistTable',
		records : [],
		totalRecordsCount : 0,
		pagination : {
			currentPageNumber : 1,
			recordsPerPage : 10,
			recordsPerPageChoices : [ 10, 15, 25 ]
		},
		columns : [ {
			columnId : 'chartId',
			resizable : false,
			label : 'Chart ID',
			layoutOrder : 1,
			sortable : true,
			sortOrder : 1,
			cellTemplate : '<a href="#" ng-click="model.onChartIdClick(record)"><span>{{record.chartId}}</span></a>',
		}, {
			columnId : 'clientCode',
			resizable : false,
			label : 'Health Plan',
			layoutOrder : 2,
			sortable : true,
			sortOrder : 0,
			cellTemplate : '<span ng-bind="::record.clientCode"></span>'
		}, {
			columnId : 'hpCode',
			resizable : false,
			label : 'Health Plan Name',
			layoutOrder : 3,
			sortable : true,
			sortOrder : 0,
			cellTemplate : '<span ng-bind="::record.hpCode"></span>'
		}, {
			columnId : 'hpProduct',
			resizable : false,
			label : 'Health Plan Product',
			layoutOrder : 4,
			sortable : true,
			sortOrder : 0,
			cellTemplate : '<span ng-bind="::record.hpProduct"></span>'
		}, {
			columnId : 'provGroupName',
			resizable : false,
			label : 'Group Name',
			layoutOrder : 5,
			sortable : true,
			sortOrder : 0,
			cellTemplate : '<span ng-bind="::record.provGroupName"></span>'
		}, {
			columnId : 'assignedDate',
			resizable : false,
			label : 'Assigned Date',
			layoutOrder : 6,
			sortable : true,
			sortOrder : 0,
			dataType: 'date',
			cellTemplate : '<span ng-bind="::record.assignedDate | date:\'MM-dd-yyyy\'"></span>'
		}, {
			columnId : 'acceptedDate',
			resizable : false,
			label : 'Accepted Date',
			layoutOrder : 7,
			sortOrder : 0,
			sortable : true,
			dataType: 'date',
			cellTemplate : '<span ng-bind="::record.acceptedDate | date:\'MM-dd-yyyy\'"></span>'
		},
		{
			columnId : 'chartStatus',
			resizable : false,
			label : 'Status',
			layoutOrder : 8,
			sortable : true,
			sortOrder : 0,
			align : "center",
			cellTemplate : '<span ng-bind="::record.chartStatus"></span>'
		},
		{
			columnId : 'pageCount',
			resizable : false,
			label : 'Page Count',
			sortOrder : 0,
			sortable : true,
			layoutOrder : 9,
			cellTemplate : '<span ng-bind="::record.pageCount"></span>',
		}, {
			columnId : 'chartScoreGroup',
			resizable : false,
			label : 'CSG',
			sortOrder : 0,
			sortable : true,
			layoutOrder : 10,
			cellTemplate : '<span ng-bind="::record.chartScoreGroup"></span>'
		}, {
			columnId : 'programName',
			resizable : false,
			label : 'Program',
			sortOrder : 0,
			sortable : true,
			layoutOrder : 11,
			cellTemplate : '<span ng-bind="::record.programName"></span>'
		} ]

	}
});
codingWorklistModule.factory("qaFeedbackViewModel", function(dataServiceModel) {

	return {
		id : 'worklistTable',
		records : [],
		totalRecordsCount : 0,
		pagination : {
			currentPageNumber : 1,
			recordsPerPage : 10,
			recordsPerPageChoices : [ 10, 15, 25 ]
		},
		columns : [ {
			columnId : 'chartId',
			resizable : false,
			label : 'Chart ID',
			layoutOrder : 1,
			sortable : true,
			sortOrder : 1,
				cellTemplate : '<uitk:icon-font icon="cux-icon-warning_filled" ng-show="record.qaActionCd == \'MODIFY\'"></uitk:icon-font>'+
				'<uitk:icon-font icon="cux-icon-checkmark_hollow" ng-show="record.qaActionCd == \'VALID\'"></uitk:icon-font>'+
				'<uitk:icon-font icon="cux-icon-prohibited_x" ng-show="record.qaActionCd == \'NOT VALID\'"></uitk:icon-font>'+
				'<a href="" ng-click="model.openQAUI(record)"><span ng-bind="::record.chartId"></span></a>',
		}, {
			columnId : 'clientCode',
			resizable : false,
			label : 'Health Plan',
			layoutOrder : 2,
			sortable : true,
			sortOrder : 0,
			cellTemplate : '<span ng-bind="::record.clientCode"></span>'
		}, {
			columnId : 'hpCode',
			resizable : false,
			label : 'Health Plan Name',
			layoutOrder : 3,
			sortable : true,
			sortOrder : 0,
			cellTemplate : '<span ng-bind="::record.hpCode"></span>'
		}, {
			columnId : 'hpProduct',
			resizable : false,
			label : 'Health Plan Product',
			layoutOrder : 4,
			sortable : true,
			sortOrder : 0,
			cellTemplate : '<span ng-bind="::record.hpProduct"></span>'
		}, {
			columnId : 'provGroupName',
			resizable : false,
			label : 'Group Name',
			layoutOrder : 5,
			sortable : true,
			sortOrder : 0,
			cellTemplate : '<span ng-bind="::record.provGroupName"></span>'
		}, {
			columnId : 'assignedDate',
			resizable : false,
			label : 'QA Feedback Date',
			sortOrder : 0,
			sortable : true,
			layoutOrder : 6,
			dataType: 'date',
			cellTemplate : '<span ng-bind="::record.assignedDate | date:\'MM-dd-yyyy\'"></span>'
		}, {
			columnId : 'programName',
			resizable : false,
			label : 'Program',
			sortOrder : 0,
			sortable : true,
			layoutOrder : 7,
			cellTemplate : '<span ng-bind="::record.programName"></span>'
		} ]

	}
});