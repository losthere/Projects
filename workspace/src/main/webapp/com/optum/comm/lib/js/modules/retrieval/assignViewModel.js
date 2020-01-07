angular
		.module("assignViewModel", [ 'looup-data' ])
		.factory(
				"assignViewModel",
				function(lookupService) {

					return {
						id : 'assignTable',
						records : [],
						totalRecordsCount : 0,
						selectedRecordCount : 0,
						selectedRecords : [],
						userAssignList : [],
						links : [ '<img class="img" src="../../lib/images/retrieval/assign.png"><a href="" ng-click="model.linkClick()">Assign</a>' ],
						pagination : {
							currentPageNumber : 1,
							recordsPerPage : 10,
							recordsPerPageChoices : [ 10, 15, 25 ]
						},
						columns : [
								{
									resizable : false,
									columnId : 'multiSelect',
									layoutOrder : 1,
									align : "center",
									excludeFromExport : true,
									cellHeaderTemplate : [
											'<label for="selectAllCheckboxId1" class="oui-a11y-hidden">Select All Checkbox</label> ',
											'<input type="checkbox" ng-model="model.selectAllChecked" ng-disabled="model.records.length === 0" id="selectAllCheckboxId1" ng-change="model.onSelectAllRows(model.selectAllChecked);"/> ' ]
											.join(''),
									cellTemplate : [ '<label for="{{record.index}}" class="oui-a11y-hidden">Select Row</label> ',
											'<input type="checkbox" id="{{record.index}}" ng-model="record.selected" ng-click="model.onRowSelect($event, record, record.selected);"/>' ]
											.join(''),
								},
								{
									resizable : false,
									columnId : 'provGroupName',
									label : 'Group Name',
									layoutOrder : 2,
									sortable : true,
									sortOrder : 0,
									cellTemplate : '<span ng-bind="::record.provGroupName" > </span>',
								},
								{
									resizable : false,
									columnId : 'provName',
									label : 'Provider Name',
									layoutOrder : 3,
									sortable : true,
									sortOrder : 0,
									cellTemplate : '<span style="text-transform:capitalize" ng-bind="::record.provName" > </span>'
								},
								{
									resizable : false,
									columnId : 'provId',
									label : 'Provider ID',
									layoutOrder : 4,
									sortable : true,
									sortOrder : 0,
									cellTemplate : '<span ng-bind="::record.provId" > </span>'
								},
								{
									resizable : false,
									columnId : 'provLocation',
									label : 'Location',
									layoutOrder : 5,
									sortable : true,
									sortOrder : 0,
									cellTemplate : '<span ng-bind="::record.provLocation" > </span>'
								},
								{
									resizable : false,
									columnId : 'provPhone',
									label : '<span>Phone <br> \n Fax</span>',
									style : 'width:100px',
									layoutOrder : 6,
									sortable : false,
									cellTemplate : '<span>{{record.provPhone}} <br> \n {{record.provFax}}</span>'
								},
								{
									resizable : false,
									columnId : 'count',
									label : '#Chart ID',
									layoutOrder : 7,
									sortable : true,
									sortOrder : 0,
									cellTemplate : '<span ng-bind="::record.count" > </span>'
								},
								{
									resizable : false,
									columnId : 'specialHandling',
									label : 'Special Handling',
									layoutOrder : 8,
									sortable : true,
									sortOrder : 0,
									cellTemplate : '<span ng-bind="::record.specialHandling" > </span>'
								},
								{
									resizable : false,
									columnId : 'assigntoUser',
									label : 'Assign To User',
									layoutOrder : 9,
									align : "center",
									cellTemplate : [ '<select ng-model="record.userKey" ng-change="model.onRowSelect(undefined,record,undefined)" ng-options="userAssign.key as userAssign.value for userAssign in model.userAssignList"></select>' ]
											.join('')
								} ]

					}
				})
		.factory(
				"codingAssignViewModel",
				function() {

					return {
						id : 'codingAssignTable',
						records : [],
						totalRecordsCount : 0,
						selectedRecordCount : 0,
						selectedRecords : [],
						links : [ '<div style="margin-right: 7px;" ng-if="model.showAssignToLocation"><img class="img" src="../../lib/images/retrieval/assign.png"><a href="" ng-click="model.assignToLocation()">Assign To Location</a></div>',
							      '<div ng-if ="model.showAssignToUser"><img class="img" src="../../lib/images/retrieval/assign.png"><a href="" ng-click="model.linkClick()">Assign To User</a></div>'
						],
						pagination : {
							currentPageNumber : 1,
							recordsPerPage : 10,
							recordsPerPageChoices : [ 10, 15, 25 ]
						},
						columns : [
								{
									resizable : false,
									columnId : 'multiSelect',
									layoutOrder : 1,
									align : "center",
									excludeFromExport : true,
									cellHeaderTemplate : [
											'<label for="selectAllCheckboxId1" class="oui-a11y-hidden">Select All Checkbox</label> ',
											'<input type="checkbox" ng-model="model.selectAllChecked" ng-disabled="model.records.length === 0" id="selectAllCheckboxId1" ng-change="model.onSelectAllRows(model.selectAllChecked);"/> ' ]
											.join(''),
									cellTemplate : [ '<label for="{{record.index}}" class="oui-a11y-hidden">Select Row</label> ',
											'<input type="checkbox" id="{{record.index}}" ng-model="record.selected" ng-click="model.onRowSelect($event, record, record.selected);"/>' ]
											.join(''),
								}, {
									resizable : false,
									columnId : 'programName',
									label : 'Program',
									sortOrder : 0,
									sortable : true,
									layoutOrder : 2,
									cellTemplate : '<span ng-bind="::record.programName" > </span>',
								}, {
									resizable : false,
									columnId : 'clientDesc',
									label : 'Health Plan',
									sortOrder : 0,
									sortable : true,
									layoutOrder : 3,
									cellTemplate : '<span ng-bind="::record.clientDesc" > </span>'
								}, {
									resizable : false,
									columnId : 'hpDesc',
									label : 'Health Plan Name',
									sortOrder : 0,
									sortable : true,
									layoutOrder : 4,
									cellTemplate : '<span ng-bind="::record.hpDesc" > </span>'
								}, {
									resizable : false,
									columnId : 'hpProductDesc',
									label : 'Health Plan Product',
									sortOrder : 0,
									sortable : true,
									layoutOrder : 5,
									cellTemplate : '<span ng-bind="::record.hpProductDesc" > </span>'
								}, {
									resizable : false,
									columnId : 'codingInstruction',
									label : 'Instructions',
									sortOrder : 0,
									sortable : true,
									layoutOrder : 6,
									cellTemplate : '<span ng-bind="::record.codingInstruction" > </span>'
								}, {
									resizable : false,
									columnId : 'recCount',
									label : '#Charts',
									sortOrder : 0,
									sortable : true,
									layoutOrder : 7,
									cellTemplate : '<span ng-bind="::record.recCount" > </span>'
								} ]
					}
				}).factory("codingAssignUsersViewModel", function() {

			return {
				id : 'codingAssignUsersTable',
				records : [],
				totalRecordsCount : 0,
				pagination : {
					currentPageNumber : 1,
					recordsPerPage : 10,
					recordsPerPageChoices : [ 10, 15, 25 ],
					showPaginationFooter : false
				},
				columns : [ {
					resizable : false,
					columnId : 'fullName',
					label : 'User',
					layoutOrder : 1,
					style : "width: 60%;",
					sortOrder : 1,
					cellTemplate : '<span>{{record.fullName}} ({{record.assignedCount}}) </span>'
				}, {
					resizable : false,
					columnId : 'amountToAssign',
					label : 'Amount to Assign',
					style : "width: 40%;",
					layoutOrder : 2,
					cellTemplate : '<input style="height: 25px;" type="text" ng-model="record.amountToAssign" uitk-numbers-only />'
				} ]

			}
		});