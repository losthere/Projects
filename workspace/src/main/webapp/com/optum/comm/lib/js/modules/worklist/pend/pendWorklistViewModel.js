angular.module("pendWorklistViewModel", []).factory("myWorklistViewModel",
		function() {

	return {
		id : 'worklistTable',
		records : [],
		totalRecordsCount : 0,
		selectedRecordCount : 0,
		selectedRecords : [],
		links : [
			
			'<uitk:icon-font icon="cux-icon-remove"></uitk:icon-font><a href="" ng-click="model.clearAll()">Clear All Selected Items</a>','<img class="img" style="margin-bottom: -3px" src="../../lib/images/release.png"><a href="" ng-click="model.releaseToAvailableItems()">Release to Available Work Items</a>'],
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
				cellTemplate : [ '<label for="{{record.apptId}}" class="oui-a11y-hidden">Select Row</label> ',
					'<input type="checkbox" id="{{record.apptId}}" ng-model="record.selected" ng-click="model.onRowSelect($event, record, record.selected);"/>' ]
				.join(''),
				}, {
					columnId : 'apptId',
					resizable : false,
					label : 'Pended Appointment',
					layoutOrder : 2,
					style: "width: 11%",
					sortable : true,
					sortOrder : 0,
					cellTemplate : '<a href="" ng-click="model.viewAppointment(record)" <span ng-bind="::record.apptId" ></a> </span>',
				}, {
					columnId : 'apptDate',
					resizable : false,
					label : 'Appointment Date',
					layoutOrder : 3,
					style: "width: 10%",
					sortable : true,
					sortOrder : 1,
					cellTemplate : '<span ng-bind="::record.apptDate | date : \'MM-dd-yyyy\'" > </span>'
				}, {
					columnId : 'cntNotRecvd',
					resizable : false,
					label : 'Charts Not Recieved',
					layoutOrder : 4,
					style: "width: 11%",
					sortable : true,
					sortOrder : 0,
					cellTemplate : '<span ng-bind="::record.cntNotRecvd" > </span>'
				}, {
					columnId : 'cntTotal',
					resizable : false,
					label : 'Total Charts',
					style: "width: 11%",
					layoutOrder : 5,
					sortable : true,
					sortOrder : 0,
					cellTemplate : '<span ng-bind="::record.cntTotal" > </span>'
				}, {
					columnId : 'provGroupName',
					resizable : false,
					label : 'Group Name',
					layoutOrder : 6,
					style: "width: 13%",
					sortable : true,
					sortOrder : 0,
					cellTemplate : '<span ng-bind="::record.provGroupName" > </span>'
				}, {
					columnId : 'provName',
					resizable : false,
					label : 'Provider Name',
					layoutOrder : 7,
					style: "width: 9%",
					sortable : true,
					sortOrder : 0,
					dataType: 'date',
					cellTemplate : '<span ng-bind="::record.provName"></span>'
				}, {
					columnId : 'provLocation',
					resizable : false,
					label : 'Retrieval Location',
					layoutOrder : 8,
					style: "width: 11%",
					sortable : true,
					sortOrder : 0,
					dataType: 'date',
					cellTemplate : '<span ng-bind="::record.provLocation"></span>'
				}, {
					columnId : 'specialCategory',
					resizable : false,
					label : 'Special Handling',
					sortOrder : 0,
					sortable : true,
					layoutOrder : 9,
					style: "width: 11%",
					cellTemplate : '<span> {{record.specialCategory ? record.specialCategory+"-" : ""}}{{record.specialNotes}}</span>',
				}, {
					columnId : 'pendReason',
					resizable : false,
					label : 'Pended Reason',
					sortOrder : 0,
					sortable : true,
					layoutOrder : 10,
					style: "width: 11%",
					cellTemplate : '<span ng-bind="::record.pendReason"></span>'
				}]

	}
}).factory("availableWorkItemsViewModel",function() {

	return {
		id : 'worklistTable',
		records : [],
		totalRecordsCount : 0,
		pagination : {
			currentPageNumber : 1,
			recordsPerPage : 10,
			recordsPerPageChoices : [ 10, 15, 25 ]
		},
		links : [
			'<uitk:icon-font icon="cux-icon-remove"></uitk:icon-font><a href="" ng-click="model.clearAll()">Clear All Selected Items</a>',
			'<uitk:icon-font icon="cux-icon-add"></uitk:icon-font><a href="" ng-click="model.addToMyWorklist()">Add to My Worklist</a>' ],
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
				cellTemplate : [ '<label for="{{record.apptId}}" class="oui-a11y-hidden">Select Row</label> ',
					'<input type="checkbox" id="{{record.apptId}}" ng-model="record.selected" ng-click="model.onRowSelect($event, record, record.selected);"/>' ]
				.join(''),
				}, {
					columnId : 'apptId',
					resizable : false,
					label : 'Pended Appointment',
					layoutOrder : 2,
					sortable : true,
					sortOrder : 0,
					cellTemplate : '<span ng-bind="::record.apptId" > </span>',
				}, {
					columnId : 'apptDate',
					resizable : false,
					label : 'Appointment Date',
					layoutOrder : 3,
					sortable : true,
					sortOrder : 1,
					cellTemplate : '<span ng-bind="::record.apptDate | date:\'MM-dd-yyyy\'" > </span>'
				}, {
					columnId : 'cntNotRecvd',
					resizable : false,
					label : 'Charts Not Recieved',
					layoutOrder : 4,
					sortable : true,
					sortOrder : 0,
					cellTemplate : '<span ng-bind="::record.cntNotRecvd" > </span>'
				}, {
					columnId : 'cntTotal',
					resizable : false,
					label : 'Total Charts',
					layoutOrder : 5,
					sortable : true,
					sortOrder : 0,
					cellTemplate : '<span ng-bind="::record.cntTotal" > </span>'
				}, {
					columnId : 'provGroupName',
					resizable : false,
					label : 'Group Name',
					layoutOrder : 6,
					sortable : true,
					sortOrder : 0,
					cellTemplate : '<span ng-bind="::record.provGroupName" > </span>'
				}, {
					columnId : 'provName',
					resizable : false,
					label : 'Provider Name',
					layoutOrder : 7,
					sortable : true,
					sortOrder : 0,
					dataType: 'date',
					cellTemplate : '<span ng-bind="::record.provName"></span>'
				}, {
					columnId : 'provLocation',
					resizable : false,
					label : 'Retrieval Location',
					layoutOrder : 8,
					sortable : true,
					sortOrder : 0,
					dataType: 'date',
					cellTemplate : '<span ng-bind="::record.provLocation"></span>'
				}, {
					columnId : 'specialCategory',
					resizable : false,
					label : 'Special Handling',
					sortOrder : 0,
					sortable : true,
					layoutOrder : 9,
					cellTemplate : '<span>{{record.specialCategory ? record.specialCategory+"-" : ""}}{{record.specialNotes}}</span>',
				}, {
					columnId : 'assignedUser',
					resizable : false,
					label : 'Assigned User',
					sortOrder : 0,
					sortable : true,
					layoutOrder : 10,
					cellTemplate : '<span ng-bind="::record.assignedUser"></span>'
				}]
	}
});