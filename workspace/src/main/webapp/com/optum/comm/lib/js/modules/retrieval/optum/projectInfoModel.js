angular
		.module("projectInfoModel", [ 'looup-data' ])
		.factory(
				"projectInfoModel",
				function(lookupService) {

					return {
						onExport : false,
						id : 'projectInfoTable',
						records : [],
						totalRecordsCount : 0,
						selectedRecordCount : 0,
						selectedRecords : [],
						userAssignList : [],
						expandedRowIndex : -1,
						links : [
								'<img class="img" src="../../lib/images/retrieval/release.png" style="margin-bottom:-3px;"><a href="" ng-class="model.actionEnabled && model.selectedRecordCount > 0 && model.validateRealVendor()?\'ux-link-cursor\':\'not-allowed\'" ng-click="model.actionEnabled && model.selectedRecordCount > 0 && model.validateRealVendor() && model.displayReleaseDialog()">Release</a>',
								'<img class="img" src="../../lib/images/retrieval/assign.png" style="margin-bottom:-3px;"><a href="" ng-class="model.actionEnabled && model.selectedRecordCount > 0?\'ux-link-cursor\':\'not-allowed\'" ng-click="model.actionEnabled && model.selectedRecordCount > 0  && model.displayAssignDialog()">Assign</a>',
								'<img class="img" src="../../lib/images/retrieval/sendExtract.png" style="margin-bottom:-3px;"><a href="" ng-class="model.actionEnabled && model.selectedRecordCount > 0 && model.validateRealVendor()?\'ux-link-cursor\':\'not-allowed\'" ng-click="model.actionEnabled && model.selectedRecordCount > 0 && model.validateRealVendor() && model.displayExtractDialog(\'Send\')">Send Extract</a>',
								'<img class="img" src="../../lib/images/retrieval/reviewExtract.png" style="margin-bottom:-3px;"><a href="" ng-class="model.actionEnabled && model.selectedRecordCount > 0 && model.validateRealVendor()?\'ux-link-cursor\':\'not-allowed\'" ng-click="model.actionEnabled && model.selectedRecordCount > 0 && model.validateRealVendor() && model.displayExtractDialog(\'Review\')">Review Extract</a>',
								'<img class="img" src="../../lib/images/retrieval/cancel.png" style="margin-bottom:-3px;"><a href="" ng-class="model.actionEnabled && model.selectedRecordCount > 0?\'ux-link-cursor\':\'not-allowed\'" ng-click="model.actionEnabled && model.selectedRecordCount > 0 && model.displayCancelDialog()">Cancel</a>',
								'<img class="img" src="../../lib/images/retrieval/inactivate.png" style="margin-bottom:-3px;"><a href="" ng-class="model.actionEnabled && model.selectedRecordCount > 0?\'ux-link-cursor\':\'not-allowed\'" ng-click="model.actionEnabled && model.selectedRecordCount > 0 && model.displayInactivateDialog()">Inactivate</a>',
								'<img class="img" src="../../lib/images/retrieval/cancel.png" style="margin-bottom:-3px;"><a href="" ng-click="model.displayCancelBarcodesDialog()">Cancel Barcodes</a>'],

						pagination : {
							currentPageNumber : 1,
							recordsPerPage : 10,
							recordsPerPageChoices : [ 10, 15, 25 ]
						},
						columns : [ {
							resizable : false,
							columnId : 'multiSelect',
							layoutOrder : 1,
							align : "center",
							excludeFromExport : true,
							style : "width: 2%;",
							/*cellHeaderTemplate : [
								'<label for="selectAllCheckboxId1" class="oui-a11y-hidden">Select All Checkbox</label> ',
								'<input type="checkbox" ng-model="model.selectAllChecked" ng-disabled="model.records.length === 0" id="selectAllCheckboxId1" ng-change="model.onSelectAllRows(model.selectAllChecked);"/> ' ]
								.join(''),*/
							cellTemplate : [ '<label for="{{record.index}}" class="oui-a11y-hidden">Select Row</label> ',
									'<input type="checkbox" id="{{record.index}}" ng-disabled="record.currentState != null" ng-model="record.selected" ng-click="model.onRowSelect($event, record, record.selected);"/>' ]
						}, {
							resizable : false,
							columnId : 'projKey',
							label : 'Project ID',
							layoutOrder : 2,
							sortable : true,
							sortOrder : 1,
							cellTemplate : '<span ng-bind="::record.projKey" > </span>',
						}, {
							resizable : false,
							columnId : 'projName',
							label : 'Project Name',
							layoutOrder : 3,
							sortable : true,
							sortOrder : 0,
							cellTemplate : '<span ng-bind="::record.projName" > </span>'
						}, {
							resizable : false,
							columnId : 'program',
							label : 'Project Type',
							layoutOrder : 4,
							sortable : true,
							sortOrder : 0,
							cellTemplate : '<span ng-bind="::record.program" > </span>'
						}, {
							resizable : false,
							columnId : 'vendorName',
							label : 'Vendor',
							layoutOrder : 5,
							sortable : true,
							sortOrder : 0,
							cellTemplate : '<span ng-bind="::record.vendorName" > </span>'
						}, {
							resizable : false,
							columnId : 'barcodeCnt',
							label : 'Count',
							layoutOrder : 6,
							sortable : true,
							sortOrder : 0,
							cellTemplate : '<span ng-bind="::record.barcodeCnt" > </span>'
						}, {
							resizable : false,
							columnId : 'extractedDate',
							label : 'Retrieval Extracted Date',
							layoutOrder : 7,
							sortable : true,
							sortOrder : 0,
							cellTemplate : '<span ng-bind="::record.extractedDate" > </span>'
						} ],
						subColumns: [
							{
			                    columnId:'radio',
			                    sortOrder:0,
			                    sortable:false,
								style : "width: 35px;",
			                    layoutOrder:1,
			                    enableSearch : false,
			                    cellTemplate:'<input type="radio" id="{{record.index}}" name="myAppRadio" ng-disabled="record.status != null || record.statusCnt == 0" ng-click="model.onRowSelect($event,record)"/>',
			                    excludeFromExport:true
			                },
				            {
				                columnId: 'hpCd',
				                label: 'Health Plan',
				                layoutOrder: 2,
				                cellTemplate: '<span ng-bind="::record.hpCd" > </span>',
				                sortable : true,
				                sortOrder : 1
				            },
				            {
				                columnId: 'client',
				                label: 'Client',
				                layoutOrder: 3,
				                cellTemplate: '<span ng-bind="::record.client" > </span>',
				                sortable : true
				            },
				            {
				                columnId: 'totalCount',
				                label: '#Search Met',
				                layoutOrder: 4,
				                cellTemplate: '<span ng-bind="::record.totalCount" > </span>',
				                sortable : true
				            },
				            {
				                columnId: 'extractedCount',
				                label: '#Extracted',
				                layoutOrder: 5,
				                cellTemplate: '<span ng-bind="::record.extractedCount" > </span>',
				                sortable : true
				            },
				            {
				                columnId: 'completedCount',
				                label: '#Complete',
				                layoutOrder: 6,
				                cellTemplate: '<span ng-bind="::record.completedCount" > </span>',
				                sortable : true
				            },
				            {
				                columnId: 'assignableCount',
				                label: '#Assignable',
				                layoutOrder: 7,
				                cellTemplate: '<a ng-click="model.openStatusCount($index)" style="cursor: pointer;"><span ng-bind="::record.assignableCount" > </span></a>',
				                sortable : true
				            },
				            {
				                columnId: 'selectVendor',
				                label: 'Select Vendor',
				                layoutOrder: 8,
				                cellTemplate : [ '<select ng-model="record.vendorKey" ng-disabled="record.enabled || record.status != null || record.statusCnt == 0"'+
				                				 'ng-options="vendor.key as vendor.value for vendor in model.clientVendorList">'+
				                				 '<option value="">Select</option></select>' ]
								.join('')
				            },
				            {
				                columnId: 'statusCnt',
				                label: 'Assigned Count',
				                layoutOrder: 9,
				                cellTemplate: "<input type='text' maxlength='50' ng-model='record.statusCnt'"
			                		+" style='width:100%' ng-disabled='record.enabled || record.status != null '/>",
				                sortable : true
				            },
				            {
				                columnId: 'action',
				                label: 'Action',
				                layoutOrder: 10,
				                cellTemplate: "<span ng-if='record.enabled || record.status != null || record.statusCnt == 0' class=\'not-allowed\'>Save </span> <a ng-if='!record.enabled && record.status == null && record.statusCnt != 0' ng-click='!record.enabled && record.status == null && record.statusCnt != 0 && model.assignVendorByHp(record)'><span >Save</span></a>",
				            },
				    	],
						
												
				    	rowTemplate: [
				               '<td colspan="{{model.columns.length}}" ng-class="{\'tk-dtbl-expanded\':model.records[$index].open}"'+
				               '	ng-init="model.records[$index].open=false;name=\'expandableRows\';parentIndex=$index" class="tk-dtbl-cell tk-padding-none">',
				               '		<table class="tk-dtbl" role="grid" aria-readonly="true">',
				               '			<tbody>',
				               '				<tr aria-expanded="{{model.records[$index].open}}"'+
				               '					role="link" id="{{name}}{{parentIndex}}-vm10" aria-owns="{{model.getChildId(name,parentIndex,$scope.searchResults.length);}}" uitk-navigable>',
				               '					<td style="width:2%" ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}"'+
				               '						id="{{name}}{{parentIndex}}-vm100" class="tk-dtbl-cell">'+
				               '						<label for="{{record.index}}" class="oui-a11y-hidden">Select Row</label><input type="checkbox" id="{{record.index}}"'+
				               '						ng-model="record.selected" ng-disabled="record.currentState != null" ng-click="model.onRowCheck($event, record, record.selected);"/>'+
				               '				    </td>',
				               '					<td ng-click="model.onRowSelect($event, record, record.selected)" ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}"'+
				               '						id="{{name}}{{parentIndex}}-vm100" class="tk-dtbl-cell"><uitk:icon-font ng-if="!model.records[$index].open"'+
				               '						icon="cux-icon-caret_right"></uitk:icon-font><uitk:icon-font ng-if="model.records[$index].open" icon="cux-icon-caret_down_centered">'+
				               '						</uitk:icon-font>{{record.projKey}}'+
				               '					</td>',
				               '					<td ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}"'+
				               '						id="{{name}}{{parentIndex}}-vm101" class="tk-dtbl-cell"><span ng-bind="record.projName"></span>'+
				               '					</td>',
				               '					<td ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}"'+
				               '						id="{{name}}{{parentIndex}}-vm102" class="tk-dtbl-cell">{{record.program}}'+
				               '					</td>',
				               '					<td ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}"'+ 
				               '						id="{{name}}{{parentIndex}}-vm103" class="tk-dtbl-cell"><span ng-bind="record.vendorName" ng-if="record.isRealVendor !=\'N\'">'+
				               '					</td>',
				               '                    <td ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}"'+ 
				               '						id="{{name}}{{parentIndex}}-vm104" class="tk-dtbl-cell">{{record.barcodeCnt}}'+
				               '					</td>',
				               ' 					<td ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}"'+ 
				               '						id="{{name}}{{parentIndex}}-vm105" class="tk-dtbl-cell">{{record.extractedDate}}'+
				               '					</td>',
				               '				</tr>',
				               '				<tr>',
				               '					<td ng-if="model.records[$index].open" colspan="{{model.columns.length}}" ng-init="providerRecord=model.getModel(record,$index)">',
				               '                   		<uitk:dynamic-table model="providerRecord" id="projectSubInfoTable"></uitk:dynamic-table>',
				               '					</td>',
				               '				</tr>',
				               '			</tbody>',
				               '		</table>',
				               '</td>'
				        ].join(''),
					}
				}).factory("projectSubInfoModel", function() {
					
					return {
				        records: [],
				        totalRecordsCount: 0
					};
				});