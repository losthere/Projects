angular.module("codingQAUIViewModel", []).factory("historyTableViewModel", function() {
	
	return {
		id : 'historyTable',
		drawerTemplate : false,
		records : [],
		totalRecordsCount : 0,
		columns : [ {
			resizable : false,
			columnId : 'action',
			label : 'Action',
			layoutOrder : 1,
			cellTemplate : '<span ng-bind="::record.action"> </span>'

		}, {
			resizable : false,
			columnId : 'userName',
			label : 'User',
			layoutOrder : 2,
			cellTemplate : '<span ng-bind="::record.userName"> </span>'
		}, {
			resizable : false,
			columnId : 'actionDate',
			label : 'Date',
			layoutOrder : 3,
			cellTemplate : '<span ng-bind="::record.actionDate"> </span>'
		} ]

	}
}).factory("commentsTableViewModel",function() {

	return {
		id : 'commentsTable',
		pagination : {
			currentPageNumber : 1,
			paginationWindow : 5,
			recordsPerPage : 10,
			recordsPerPageChoices : [ 10, 25, 50, 100 ],
			showPaginationFooter : false
		},
		records : [],
		totalRecordsCount : 1,
		columns : [ {
			resizable : false,
			columnId : 'contentComment',
			layoutOrder : 1,
			cellTemplate : '<div><span style="margin-bottom: 5px; display: inline-block;" ng-bind="::record.contentCommentDt"></span><br><span style="margin-bottom: 5px; display: inline-block;" ng-bind="::record.userName"></span><br><span style="style="margin-bottom: 5px; display: inline-block;" ng-bind="::record.contentComment"></span></div>'
		} ]
	}
}).factory("icdCodesTableViewModel", function() {

	return {
		id : 'idcCodesTable',
		records : [],
		totalRecordsCount : 0,
		columns : [ {
			showColumnInTable : true,
			resizable : false,
			align : 'left',
			columnId : 'icdDxCd',
			label : 'IDC-10 DX Codes',
			layoutOrder : 1,
			cellTemplate : '<uitk:input tk-type="text" id="icdDxCd" style-class="tk-width-14t" model="record.icdDxCd" on-blur="model.onBlur(record)" name="icdDxCd"></uitk:input>'

		}, {
			showColumnInTable : true,
			resizable : false,
			align : 'left',
			columnId : 'v22Hcc',
			label : 'HCC',
			layoutOrder : 2,
			cellTemplate : '<div ng-if="record.v22Hcc">V22 : <span ng-bind="record.v22Hcc"></span></div>'+
			'<div ng-if="record.v24Hcc">V24 : <span ng-bind="record.v24Hcc"></span></div>'
		}, {
			showColumnInTable : true,
			resizable : false,
			align : 'left',
			columnId : 'rxHCC',
			label : 'RxHCC',
			layoutOrder : 3,
			cellTemplate : '<span ng-bind="record.rxHcc"></span>'
		}, {
			showColumnInTable : true,
			resizable : false,
			align : 'left',
			columnId : 'icdDesc',
			label : 'ICD 10 DX Description',
			layoutOrder : 4,
			cellTemplate : '<span ng-bind="record.icdDesc"></span>'
		}, {
			showColumnInTable : true,
			resizable : false,
			align : 'left',
			columnId : 'eoCode',
			label : 'EO Code',
			layoutOrder : 5,
			cellTemplate : [ '<select ng-model="record.eoCode" class="tk-width-14t" ng-options="userAssign.value as userAssign.label for userAssign in model.eoCodeForDXCodeTableList"></select>' ]
			.join('')
		} ]

	}
}).factory("savedEncountersTableViewModel",function(errorMessageModel, dataServiceModel) {
	
	return {
		id : 'savedEncountersTable',
		pagination : {
			currentPageNumber : 1,
			paginationWindow : 5,
			recordsPerPage : 5,
			recordsPerPageChoices : [ 5, 10, 25 ],
			showPaginationFooter : false,
			totalRecordsCount : false
		},
		links : [ '<span ng-if="!model.isReadOnly"><uitk:icon-font icon="cux-icon-add2"></uitk:icon-font><a href="" ng-click="model.addEncounter()">Add Encounter</a></span>' ],
		records : [],
		totalRecordsCount : 0,
		busSegment	: dataServiceModel.chartDetailsObj ? dataServiceModel.chartDetailsObj.busSegment : '',
		enableSplitHeader : true,
		columns : [
			{
				resizable : false,
				columnId : 'coderDos',
				label : 'DOS',
				layoutOrder : 1,
				groupLabel : 'Coder',
				numberOfSplitHeaders : 4,
				splitHeaderIndex : 1,
				align	:'left',
				cellTemplate : '<span ng-bind="::record.coderDOSToDate"></span>'
			},
			{
				resizable : false,
				columnId : 'coderPageNo',
				label : 'Page',
				layoutOrder : 2,
				numberOfSplitHeaders : 4,
				splitHeaderIndex : 2,
				align	:'left',
				cellTemplate : '<span ng-bind="::record.coderPageNum"></span>'
			},
			{
				resizable : false,
				columnId : 'coderRenderingProvider',
				label : '<span><uitk:icon-font title="Does the rendering provider match the provider displayed above?" icon="cux-icon-info_hollow"></uitk:icon-font> Rendering Provider Match</span>',
				layoutOrder : 3,
				numberOfSplitHeaders : 4,
				splitHeaderIndex : 3,
				align	:'left',
				cellTemplate : '<span ng-bind="::record.coderRetProvFlag"></span><uitk:icon-font title="{{record.coderRenderingProvider}}" icon="cux-icon-info_hollow"></uitk:icon-font>'
			},
			{
				resizable : false,
				columnId : 'encEoCode',
				label : 'Enc EO Code',
				layoutOrder : 4,
				numberOfSplitHeaders : 4,
				splitHeaderIndex : 4,
				align	:'left',
				cellTemplate:'<a ng-click="model.openWindowCoder(record)"><span>view</span></a>',
			},
			{
				resizable : false,
				columnId : 'qaDos',
				label : '<span><uitk:icon-font title="MMDDYYYY" icon="cux-icon-info_hollow"></uitk:icon-font> DOS </span>',
				layoutOrder : 5,
				groupLabel : 'QA',
				numberOfSplitHeaders : 8,
				splitHeaderIndex : 1,
				align	:'left',
				style : 'border-left-style:solid;border-left-color : darkgrey',
				cellTemplate : '<span ng-bind="::record.qaDOSThruDate"></span>'
			},
			{
				resizable : false,
				columnId : 'qaPageNum',
				label : 'Page',
				layoutOrder : 6,
				numberOfSplitHeaders : 8,
				splitHeaderIndex : 2,
				align	:'left',
				cellTemplate : '<span ng-bind="::record.qaPageNum"></span>'
			},
			{
				resizable : false,
				columnId : 'qaRenderingProvider',
				label : '<span><uitk:icon-font title="Does the rendering provider match the provider displayed above?" icon="cux-icon-info_hollow"></uitk:icon-font> Rendering Provider Match</span>',
				layoutOrder : 7,
				numberOfSplitHeaders : 8,
				splitHeaderIndex : 3,
				align	:'left',
				cellTemplate : '<span ng-bind="::record.qaRetProvFlag"></span>'
			},
			{
				resizable : false,
				columnId : 'npi',
				label : 'NPI',
				layoutOrder : 8,
				numberOfSplitHeaders : 8,
				splitHeaderIndex : 4,
				align	:'left',
				cellTemplate : '<span ng-bind="::record.qaProvNPI"></span>'
			},
			{
				resizable : false,
				columnId : 'firstName',
				label : 'First Name',
				layoutOrder : 9,
				numberOfSplitHeaders : 8,
				splitHeaderIndex : 5,
				align	:'left',
				cellTemplate : '<span ng-bind="::record.qaProvFirstName"></span>'
			},
			{
				resizable : false,
				columnId : 'lastName',
				label : 'Last Name',
				layoutOrder : 10,
				numberOfSplitHeaders : 8,
				splitHeaderIndex : 6,
				align	:'left',
				cellTemplate : '<span ng-bind="::record.qaProvLastName"></span>'
			},
			{
				resizable : false,
				columnId : 'encounterEoCode',
				label : 'Encounter EO Code',
				layoutOrder : 11,
				numberOfSplitHeaders : 8,
				splitHeaderIndex : 7,
				align	:'left',
				cellTemplate:'<a><span>view</span></a>',
			},
			{
				resizable : false,
				columnId : 'encounterAction',
				label : 'Encounter Action',
				layoutOrder : 12,
				numberOfSplitHeaders : 8,
				splitHeaderIndex : 8,
				align	:'left',
				cellTemplate : [ '<select ng-model="record.qaEncActionCd"><option value="" selected="selected">Select</option><option value="1">Valid</option><option value="2">Not Valid</option><option value="3">Modify</option></select>' ]
			.join('')
			} ],
			subColumns : [
						{
							resizable : false,
							columnId : 'coderICDDxCode',
							label : 'DX Code - HCC, Rx',
							layoutOrder : 1,
							align	:'left',
							style:'width:15%',
							cellTemplate : '<span style="float:left;"ng-if="record.coderICDDxCode">{{record.coderICDDxCode}} - </span>'
										+'		<span style="position:absolute; margin-left:10px;" ng-if="model.busSegment == \'MCAID\'">NA,NA</span>'
										+'		<span style="position:absolute; margin-left:10px;" ng-if="model.busSegment == \'ACA\'">'
										+'			<span ng-if="record.coderHccModelCatHhs"><span ng-bind="record.coderHccModelCatHhs"></span></span>'
										+'			<span ng-if="!record.coderHccModelCatHhs">NA</span>,NA'
										+'		</span>'
										+'		<span  style="position:absolute; margin-left:10px;" ng-if="model.busSegment == \'MCARE\'">'
										+'			<span ng-if="record.coderICDDxCode && !record.coderHccModelCatV22 && !record.coderHccModelCatV24 && !record.coderHccModelCatRx">NA,NA</span>'
										+'			<span> <span ng-if="record.coderHccModelCatV22">V22 : <span ng-bind="record.coderHccModelCatV22"></span></span>'
										+'			<span ng-if="(record.coderHccModelCatV22 || record.coderHccModelCatV24) && record.coderHccModelCatRx">,</span>'
										+'			<span ng-if="record.coderHccModelCatRx">Rx : <span ng-bind="record.coderHccModelCatRx"></span></span>'
										+'			<br/><span ng-if="record.coderHccModelCatV24">V24 : <span ng-bind="record.coderHccModelCatV24"></span></span> </span>'
										+'		</span>'
						},
						{
							resizable : false,
							columnId : 'coderDxEoCode',
							label : 'DX EO Code',
							layoutOrder : 2,
							align	:'left',
							style:'width:18%',
							cellTemplate : '<span ng-bind="record.coderDxEoCode.label"> </span>'
						},
						{
							resizable : false,
							columnId : 'qaICDDxCode',
							label : 'DX',
							layoutOrder : 3,
							align	:'left',
							style :'border-left-style :solid;border-left-color : darkgrey;width:10%;',
							cellTemplate : '<span style="border-left-style :solid;border-left-color : darkgrey;"><span ng-if="(record.qaDxActionCd == \'VALID\' || model.isReadOnly) || (!record.coderICDDxCode && !record.newDxCode)" ng-bind="record.qaICDDxCode"></span><span ng-if="record.qaDxActionCd == \'NOT VALID\'"></span>'
								+'<span ng-if="!(!record.coderICDDxCode && !record.newDxCode) && (((record.qaDxActionCd == \'MODIFY\' && !model.isReadOnly) && !model.isReadOnly) || record.qaDxActionCd == \'NEW\')"><uitk:input tk-type="text" id="dx" name="dx" style-class="tk-width-7t" model="record.qaICDDxCode" on-blur="model.onQAICDCodeChange(record)"></uitk:input></span></span>'
						},
						{
							resizable : false,
							columnId : 'qaHccModelCatV22',
							label : 'HCC',
							layoutOrder : 4,
							align	:'left',
							style:'width:7%',
							cellTemplate : '<span ng-if="(record.qaDxActionCd == \'VALID\' || model.isReadOnly) || (!record.coderICDDxCode && !record.newDxCode) || ((record.qaDxActionCd == \'MODIFY\' && !model.isReadOnly) && !model.isReadOnly) ||  record.qaDxActionCd == \'NEW\'">'
											+'	<span ng-if="model.busSegment != \'ACA\'">'
											+'	<div ng-if="record.qaHccModelCatV22">V22 : <span ng-bind="record.qaHccModelCatV22"></span></div>'
											+'	<div ng-if="record.qaHccModelCatV24">V24 : <span ng-bind="record.qaHccModelCatV24"></span></div>'
											+'	</span>'
											+'	<span ng-if="model.busSegment == \'ACA\'"><span ng-bind="record.qaHccModelCatHhs"></span></span>'
											+'</span>'
											+'<span ng-if="record.qaDxActionCd == \'NOT VALID\'"></span>'
						},
						{
							resizable : false,
							columnId : 'qaHccModelCatRx',
							label : 'RX HCC',
							layoutOrder : 5,
							align	:'left',
							style:'width:7%',
							cellTemplate :  '<span ng-if="(record.qaDxActionCd == \'VALID\' || model.isReadOnly) || (!record.coderICDDxCode && !record.newDxCode) || ((record.qaDxActionCd == \'MODIFY\' && !model.isReadOnly) && !model.isReadOnly) ||  record.qaDxActionCd == \'NEW\'" ng-bind="record.qaHccModelCatRx"></span><span ng-if="record.qaDxActionCd == \'NOT VALID\'"></span>'
						},
						{
							resizable : false,
							columnId : 'qaDxEoCode',
							label : 'DX EO Code',
							layoutOrder : 6,
							align	:'left',
							style:'width:26%',
							cellTemplate : '<span ng-if="(record.qaDxActionCd == \'VALID\' || model.isReadOnly) || (!record.coderICDDxCode && !record.newDxCode)" ng-bind="record.qaDxEoCode.label"></span><span ng-if="!(!record.coderICDDxCode && !record.newDxCode) && ((record.qaDxActionCd == \'MODIFY\' && !model.isReadOnly) || record.qaDxActionCd == \'NEW\')"><select ng-model="record.qaDxEoCode.value" id="qaDxEoCode" class="tk-width-28t" ng-options="obj.value as obj.label for obj in model.eoCodeForDXCodeTableList"></select></span>',
						},
						{
							resizable : false,
							columnId : 'qaDxActionCd',
							label : 'Dx Action',
							layoutOrder : 7,
							align	:'left',
							style:'width:17%',
							cellTemplate : '<span ng-if="((!record.coderICDDxCode && !record.newDxCode) || record.showEditDeleteButtons) && !model.isReadOnly"><uitk:icon-font icon="cux-icon-edit" ng-click="model.editDX(record)"></uitk:icon-font><uitk:icon-font icon="cux-icon-trash_delete" ng-click="model.deleteDX(record, record.index)"></uitk:icon-font></span>'+
							'<span ng-if="record.coderICDDxCode"><span ng-if="!record.newDxCode && record.coderEncounterKey" ng-disabled="model.expandedRow.qaEncActionCd == \'NOT VALID\'">'+
							'<span style="padding:5px;"><input type="radio" name="dxAction_{{record.index}}" ng-click="model.handleDxActionChange(record)" id="valid_{{record.index}}" value="VALID" ng-model="record.qaDxActionCd" ng-disabled="model.expandedRow.qaEncActionCd == \'NOT VALID\' || model.isReadOnly"> Valid </span>'+
							'<span style="padding:5px;"><input type="radio" name="dxAction_{{record.index}}" ng-click="model.handleDxActionChange(record)" id="notvalid_{{record.index}}" value="NOT VALID" ng-model="record.qaDxActionCd" ng-disabled="model.expandedRow.qaEncActionCd == \'NOT VALID\' || model.isReadOnly"> Not Valid </span>'+
							'<span style="padding:5px;"> <input type="radio" name="dxAction_{{record.index}}" ng-click="model.handleDxActionChange(record)" id="modify_{{record.index}}" value="MODIFY" ng-model="record.qaDxActionCd" ng-disabled="model.expandedRow.qaEncActionCd == \'NOT VALID\' || model.isReadOnly"> Modify</span>'+
							'</span></span>'
			} ],
			rowTemplate : [
				'<td colspan="{{model.columns.length}}" ng-class="{\'tk-dtbl-expanded\':model.records[$index].open}" ng-init="model.records[$index].open=false;name=\'expandableRows\';parentIndex=$index" class="tk-dtbl-cell tk-padding-none">',
				'		<table class="tk-dtbl" role="grid" aria-readonly="true">',
				'			<tbody>',
				'				<tr aria-expanded="{{model.records[$index].open}}" role="link" id="{{name}}{{parentIndex}}" uitk-navigable>',
				'					<td ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}" class="tk-dtbl-cell"><uitk:icon-font ng-if="!model.records[$index].open" icon="cux-icon-caret_right" ng-click="model.onRowSelect($event,record,$index)"></uitk:icon-font><uitk:icon-font ng-if="model.records[$index].open" icon="cux-icon-caret_down_centered"></uitk:icon-font><span ng-if="record.coderEncounterKey"><span ng-bind="record.coderDOSFromDate"></span> -<br><span style="margin-left: 27px;" ng-bind="record.coderDOSThruDate"></span></span><span ng-if="!record.coderEncounterKey">---</span></td>',
				'					<td ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}" class="tk-dtbl-cell"><span ng-if="record.coderEncounterKey" ng-bind="record.coderPageNum"></span><span ng-if="!record.coderEncounterKey">---</span></td>',
				'					<td ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}" class="tk-dtbl-cell"><span ng-if="record.coderEncounterKey"><span ng-if="record.coderRetProvFlag == \'Y\'" ng-bind="record.provName"></span><span ng-if="record.coderRetProvFlag == \'N\'">Other <uitk:icon-font title="{{record.coderProvLastName}},{{record.coderProvFirstName}}, NPI: {{record.coderProvNPI}}" icon="cux-icon-info_hollow"></uitk:icon-font></span> </span><span ng-if="!record.coderEncounterKey">---</span></td>',
				'					<td ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}" class="tk-dtbl-cell"><a ng-click="model.openWindowCoder(record)"><span>view</span></a></td></td>',
				/*'					<td ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}" class="tk-dtbl-cell"><span ng-if="record.coderEncounterKey" ng-bind="record.coderEoCode.label"></span><span ng-if="!record.coderEncounterKey">---</span></td>',*/
				'					<td style="border-left-style :solid;border-left-color : darkgrey" ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}"><span ng-if="record.qaEncActionCd == 0 || record.qaEncActionCd == \'NOT VALID\'"></span><span ng-if="(record.qaEncActionCd == \'VALID\' || model.isReadOnly) || !record.coderEncounterKey"><span ng-bind="::record.qaDOSFromDate"></span> - <br><span ng-bind="::record.qaDOSThruDate"></span></span><span ng-if="(record.qaEncActionCd == \'MODIFY\' && !model.isReadOnly)"> <uitk:calendar id="qaDOSFromDate" name="qaDOSFromDate" ng-model="record.qaDOSFromDateObj" view-model="record.qaDosFromDateCalendarViewModel" /> <uitk:calendar id="qaDOSThruDate" name="qaDOSThruDate" ng-model="record.qaDOSThruDateObj" view-model="record.qaDosThruDateCalendarViewModel" /></span></td>',
				'					<td ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}" class="tk-dtbl-cell"><span ng-if="record.qaEncActionCd == 0 || record.qaEncActionCd == \'NOT VALID\'"></span><span ng-if="(record.qaEncActionCd == \'VALID\' || model.isReadOnly) || !record.coderEncounterKey">{{record.qaPageNum}}</span><span ng-if="(record.qaEncActionCd == \'MODIFY\' && !model.isReadOnly)"><uitk:input tk-type="text" id="qaPageNum" name="qaPageNum" style-class="tk-width-8t" model="record.qaPageNum"></uitk:input></span></td>',
				'					<td ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}" class="tk-dtbl-cell"><span ng-if="record.qaEncActionCd == 0 || record.qaEncActionCd == \'NOT VALID\'"></span><span ng-if="(record.qaEncActionCd == \'VALID\' || model.isReadOnly) || !record.coderEncounterKey"><span ng-if="record.qaRetProvFlag == \'Y\'" ng-bind="record.provName"></span><span ng-if="record.qaRetProvFlag == \'N\'">Other</span></span><span ng-if="(record.qaEncActionCd == \'MODIFY\' && !model.isReadOnly)"><select id="qaRenderingProvider" name="qaRenderingProvider" class="tk-width-8t" ng-model="record.qaRetProvFlag" ng-change="model.onRendProvMatchChange(record,$index)" ng-options="rendProv.value as rendProv.label for rendProv in model.renderingProviderMatchList"></select></span></td>',
				'					<td ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}" class="tk-dtbl-cell"><span ng-if="record.qaEncActionCd == 0 || record.qaEncActionCd == \'NOT VALID\'"></span><span ng-if="(record.qaEncActionCd == \'VALID\' || model.isReadOnly) || !record.coderEncounterKey" || (record.qaRetProvFlag == \'Y\')>{{record.qaProvNPI}}</span><span ng-if="(record.qaEncActionCd == \'MODIFY\' && !model.isReadOnly) && (record.qaRetProvFlag == \'N\')"><input type="text" id="npi" name="npi" maxlength="10" ng-model="record.qaProvNPI" Placeholder="Max 10 #s" class="tk-width-8t" /></span></td>',
				'					<td ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}" class="tk-dtbl-cell"><span ng-if="record.qaEncActionCd == 0 || record.qaEncActionCd == \'NOT VALID\'"></span><span ng-if="(record.qaEncActionCd == \'VALID\' || model.isReadOnly) || !record.coderEncounterKey" || (record.qaRetProvFlag == \'Y\')>{{record.qaProvFirstName}}</span><span ng-if="(record.qaEncActionCd == \'MODIFY\' && !model.isReadOnly) && (record.qaRetProvFlag == \'N\')"><uitk:input tk-type="text" id="firstName" name="firstName" style-class="tk-width-8t" model="record.qaProvFirstName"></uitk:input></span></td>',
				'					<td ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}" class="tk-dtbl-cell"><span ng-if="record.qaEncActionCd == 0 || record.qaEncActionCd == \'NOT VALID\'"></span><span ng-if="(record.qaEncActionCd == \'VALID\' || model.isReadOnly) || !record.coderEncounterKey" || (record.qaRetProvFlag == \'Y\')>{{record.qaProvLastName}}</span><span ng-if="(record.qaEncActionCd == \'MODIFY\' && !model.isReadOnly) && (record.qaRetProvFlag == \'N\')"><uitk:input tk-type="text" id="lastName" name="lastName" style-class="tk-width-8t" model="record.qaProvLastName"></uitk:input></span></td>',
				/*'					<td ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}" class="tk-dtbl-cell"><span ng-if="record.qaEncActionCd == 0 || record.qaEncActionCd == \'NOT VALID\'"></span><span ng-if="(record.qaEncActionCd == \'VALID\' || model.isReadOnly) || !record.coderEncounterKey">{{record.qaEoCode.label}}</span><span ng-if="(record.qaEncActionCd == \'MODIFY\' && !model.isReadOnly)"><select ng-model="record.qaEoCode.value" id="eoTableDropDown" class="tk-width-8t" ng-options="obj.value as obj.label for obj in model.eoCodeList" ng-click="model.onEncEOClick($event, record, $index, record.qaEoCode)" ng-change="model.changeEncEoCode(record)"></select></span></td>',*/
				'					<td ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}" class="tk-dtbl-cell"><span ng-if="record.qaEncActionCd == 0 || record.qaEncActionCd == \'NOT VALID\'"></span><span ng-if="(record.qaEncActionCd == \'VALID\' || model.isReadOnly) || !record.coderEncounterKey">{{record.qaEoCode.label}}</span><span ng-if="(record.qaEncActionCd == \'MODIFY\' && !model.isReadOnly)"><uitk:multiselect id="eoTableDropDown" input-model="record.eoCodeList" output-model="record.qaEoKeyList" button-label="label" item-label="label" max-height="16.667rem" flyoutwindow-width="16.667rem" width="7.5rem !important" max-labels="1"  helper-elements="all none" tick-property="ticked" default-label="Select" on-item-click="model.onEncEOClick($event, record, $index, record.qaEoKeyList)" on-close="model.changeEncEoCode(record)"></uitk:multiselect></span><a ng-if="(model.isReadOnly && !(record.qaEncActionCd == \'NOT VALID\'))" ng-click="model.openWindowQA(record)"><span>view</span></a><a ng-if="record.qaEncActionCd == \'VALID\' && !model.isReadOnly" ng-click="model.openWindowVal(record)"><span>view</span></a><a ng-if="!record.coderEncounterKey && !model.isReadOnly" ng-click="model.openWindowEnc(record)"><span>view</span></a></td>',
				'					<td ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}" class="tk-dtbl-cell"><span ng-if="record.coderEncounterKey"><select ng-model="record.qaEncActionCd" ng-disabled="model.isReadOnly" ng-click="model.onEncounterActionClick($event, record, $index, record.qaEncActionCd)" ng-change="model.onEncounterActionChange($event,record,$index)"><option value="" selected="selected">Select</option><option value="VALID">Valid</option><option value="NOT VALID">Not Valid</option><option value="MODIFY">Modify</option></select></span><span ng-if="!record.coderEncounterKey && !model.isReadOnly"><uitk:icon-font icon="cux-icon-edit" ng-click="model.editEncounter(record, $index)"></uitk:icon-font><uitk:icon-font icon="cux-icon-trash_delete" ng-click="model.deleteEnc(record)"></uitk:icon-font></span></td>',
				'				</tr> <tr>',
				'					<td ng-if="model.records[$index].open" colspan="{{model.columns.length}}" ng-init="model.subTableViewModel = model.updateSubTableViewModel(record, $index, dataServiceModel)">',
				'                   <span ng-if="model.subTableViewModel && model.showEditICDCodeTable"><uitk:dynamic-table class="encDtlTable" model="model.subTableViewModel"></uitk:dynamic-table></span><br>',
				' 					<span ng-if="!model.isReadOnly" style="margin-left:15px;" ng-if="record.coderEncounterKey"><uitk:icon-font icon="cux-icon-add2"></uitk:icon-font>',
				' 					<a href="" ng-click="model.subTableViewModel.addDXCodes()">Add DX Codes</a></span><br><br><span ng-if="model.viewInUtilityTab()"  style="margin-left:150px;"><uitk:label id="addressLblId2" ng-if="!model.isReadOnly" name="addressLbl2" for="addressField2_textarea">Add Comment</uitk:label></span> <uitk:textarea tk-disabled = "model.isReadOnly" style="margin-left:150px;" id="addComment" name="addComment" model="record.qaEncComments" width="750" rows="5"></uitk:textarea>',
				' 					<uitk:button style="margin-left:15px;" ng-if="!model.isReadOnly" ng-click="model.subTableViewModel.saveSubTableRecord(record)">Save</uitk:button>',
				' 					<uitk:button style="margin-left:15px;" ng-click="model.subTableViewModel.closeSubTableDialog(false)">Cancel</uitk:button></td> </tr>',
				'			</tbody> </table> </td>' ].join(''),
				expandedRowObj : {
					index : -1,
					pageNo : -1
				},
				// Create model for child dynamic table based on record and index
				updateSubTableViewModel : function(record, index, dataServiceModel) {
					angular.forEach(record.codingQaDxDetails, function(obj,idx){
						obj.index = idx;
						if(!obj.coderICDDxCode)
							obj.showEditDeleteButtons = true;
					});
					var that = this;
					var subTableViewModel = {
								componentId : 'sub-table' + index,
								id : 'sub-table' + index,
								columns : this.subColumns,
								records : record.codingQaDxDetails,
								totalRecordsCount : record.codingQaDxDetails ? record.codingQaDxDetails.length : 0,
								expandedRow : record,
								busSegment : that.busSegment,
								isReadOnly : that.isReadOnly,
								addDXCodes : function() {
									if(this.expandedRow.qaEncActionCd != 'NOT VALID' && that.showEditICDCodeTable){
										var obj = {
												newDxCode : true,												
												qaICDDxCode : '',
												qaHccModelCatV22 : '',
												qaHccModelCatV23 : '',
												qaHccModelCatV24 : '',
												qaHccModelCatRx : '',
												qaDxEoCode : {
													label : 'Select',
													value : ''
												},
												qaDxActionCd : 'NEW'
											};
											this.records.push(obj);
											this.totalRecordsCount++;
									}else{
										that.errorMessageModel.messageType = 'error';
										that.errorMessageModel.content = '<span>DX code cannot be added when encounter action is not valid/No DX EO selected</span>';
										that.errorMessageModel.visible = true;
										return;
									}
								},
								handleDxActionChange: function(record){
									var orgObj = angular.copy(that.originalRecords[that.expandedRowObj.index].codingQaDxDetails[record.index]);
									if(record.qaDxActionCd != 'MODIFY'){
										record.qaICDDxCode = orgObj.coderICDDxCode;
										record.qaDxEoCode = orgObj.coderDxEoCode;
										record.qaHccModelCatHhs = orgObj.coderHccModelCatHhs;
										record.qaHccModelCatRx = orgObj.coderHccModelCatRx;
										record.qaHccModelCatV22 = orgObj.coderHccModelCatV22;
										record.qaHccModelCatV23 = orgObj.coderHccModelCatV23;
										record.qaHccModelCatV24 = orgObj.coderHccModelCatV24;
									}else{
										record.qaICDDxCode = orgObj.qaICDDxCode;
										record.qaDxEoCode = orgObj.qaDxEoCode;
										record.qaHccModelCatHhs = orgObj.qaHccModelCatHhs;
										record.qaHccModelCatRx = orgObj.qaHccModelCatRx;
										record.qaHccModelCatV22 = orgObj.qaHccModelCatV22;
										record.qaHccModelCatV23 = orgObj.qaHccModelCatV23;
										record.qaHccModelCatV24 = orgObj.qaHccModelCatV24;
									}
									if(record.qaDxEoCode && !record.qaDxEoCode.value){
										record.qaDxEoCode.value = '';
									}
								},
								eoCodeForDXCodeTableList : that.eoCodeForDXCodeTableList,
								saveSubTableRecord : that.saveSubTableRecord,
								closeSubTableDialog : that.closeSubTableDialog,
								onQAICDCodeChange : that.onQAICDCodeChange,
								addComment : record.qaEncComments ? record.qaEncComments : '',
								editDX : function(record) {
									record.qaDxActionCd = 'NEW';
									record.newDxCode = true;
									record.showEditDeleteButtons = true;
								},
								deleteDX : function(record, index) {
									that.handleDeleteDxCode(this.records, record,index);
								}

							};
					return angular.copy(subTableViewModel);
				}
	}
});