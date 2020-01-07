angular.module("userViewModel", []).factory("userViewModel",function() {

	return {
        records : [],
        totalRecordsCount :0,
        expandedRowIndex : -1,
        pagination : { 
        	currentPageNumber : 1,
			currentPageNumberInView : 1,
			recordsPerPage : 25,
        	recordsPerPageChoices : [5, 15, 25],
        	pageNumberError : false
        }, 
        links : [
        	"<img ng-src='../../comm/lib/images/upload.png' ng-click='model.uploadClick()' style='cursor:pointer;'></img>",
        	"<a tabindex=0 href='' title='Upload' ng-click='model.uploadClick()' style='cursor:pointer;color:#005187;line-height:20px;font-size:12px;background:white;' ng-class='hover-item'>Upload</a>",
        	"<a  href='../../comm/lib/template/User Registration File Template.csv'><img style=width:18px; ng-src='../../comm/lib/images/download.png'></img></a>",
        	"<a  href='../../comm/lib/template/User Registration File Template.csv' title='Download'  style='cursor:pointer;color:#005187;line-height:20px;font-size:12px;background:white;' ng-class='hover-item' download>Download Registration File Template</a>",
        	],
        columns : [
            {
                columnId : 'fileName',
                label : 'File Name',
                layoutOrder : 1,
                style : "width : 35%",
                cellTemplate : '<span ng-bind="::record.fileName"> </span>',
                sortable: true             
            },
            {
                columnId : 'uploadedBy',
                label : 'Uploaded By',
                layoutOrder : 2,
                cellTemplate : '<span ng-bind="::record.uploadedBy"> </span>',
                sortable: true
            },
            {
                columnId : 'uploadedOn',
                label : 'Uploaded On',
                layoutOrder : 3,
                style : "width : 11.5%",
                cellTemplate : '<span>{{::record.uploadedOn}} </span>',
                sortable: true
            },
            {
                columnId : 'lastProcessedOn',
                label : 'Last Processed Date',
                layoutOrder : 4,
                style : "width : 11.5%",
                cellTemplate : '<span>{{::record.lastProcessedOn}} </span>',
                sortable: true,
                sortOrder : -1
            },
            {
                columnId : 'cntUser',
                label : 'Total Records',
                layoutOrder : 5,
                style : "text-align: right;width : 8%",
                cellTemplate : '<span style = "text-align: right;" ng-bind="::record.cntUser"> </span>',
                sortable: true
            },
            {
                columnId : 'cntUserSuccess',
                label : 'Success',
                layoutOrder : 6,
                style : "text-align: right;width : 7%",
                cellTemplate : '<span  ng-bind="::record.cntUserSuccess"> </span>',
                sortable: true
            },
            {
                columnId : 'cntUserFailure',
                label : 'Failure',
                layoutOrder : 7,
                style : "text-align: right;width : 7%",
                cellTemplate : '<span style = "text-align: right;" ng-bind="::record.cntUserFailure"> </span>',
                sortable: true
            }
        ],
        subColumns: [
            {
                columnId: 'FIRST_NAME',
                label: 'First Name',
                layoutOrder: 1,
                style : "width:120px;",
                cellTemplate: "<input type='text' maxlength='50' name='firstname' ng-model='record.firstName' ng-class='{error:!record.firstName }'"
                		+"  style='width:100%' ng-change='model.verifyRecordsModified(record)' ng-disabled=\"record.STATUS_DESCRIPTION == 'Success'\"/>"
                		+" <div role='alert'> <span class='error' ng-show='!record.firstName'>First Name is Required!</span></div>",
                draggable : true,
                sortable : true,
                sortOrder : 1
            },
            {
                columnId: 'LAST_NAME',
                label: 'Last Name',
                layoutOrder: 2,
                style : "width:120px;",
                cellTemplate: "<input type='text' maxlength='50' ng-model='record.lastName' ng-class='{error: !record.lastName }'"
                		+" style='width:100%' ng-change='model.verifyRecordsModified(record)' ng-disabled=\"record.STATUS_DESCRIPTION == 'Success'\"/>"
						+" <div role='alert'><span class='error' ng-show='!record.lastName'>Last Name is Required!</span></div>",
                draggable : true,
                sortable : true
            },
            {
                columnId: 'ORGANIZATION_NAME',
                label: '<span>Organization Name</span>',
                layoutOrder: 3,
                style : "width:180px;",
                cellTemplate: "<input type='text' maxlength='250' ng-model='record.organizationName' ng-change='model.verifyRecordsModified(record)' ng-class='{error: !record.organizationName }'"
                		+"  style='width:100%' ng-change='model.verifyRecordsModified(record)' ng-disabled=\"record.STATUS_DESCRIPTION == 'Success'\"/>"
                		+" <div role='alert'><span class='error' ng-show='!record.organizationName'>Organization Name is Required!</span></div>",
                draggable : true,
                sortable : true
            },
            {
                columnId: 'EMAIL',
                label: 'Email',
                layoutOrder: 4,
                style : "width:300px;",
                cellTemplate: "<input type='text' maxlength='50'  ng-model='record.email' ng-pattern='/^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{1,})$/'  ng-class='{error: !record.email }'"
                		+" style='width:100%' ng-change='model.verifyRecordsModified(record)'  ng-disabled=\"record.STATUS_DESCRIPTION == 'Success'\"/>"
                		+" <div role='alert'><span class='error' ng-show='!record.email'>Valid Email is Required!</span></div>",
                draggable : true,
                sortable : true
            },
            {
                columnId: 'REPORTS_TO_USERID',
                label: 'Reports To',
                layoutOrder: 5,
                style : "width:100px;",
                cellTemplate: "<input type='text' maxlength='50' ng-model='record.reportsToUserID' ng-class='{error: !record.reportsToUserID }'"
                		+"  style='width:100%' ng-click='model.verifyRecordsModified(record)' ng-disabled=\"record.STATUS_DESCRIPTION == 'Success'\"/>"
                		+" <div role='alert'><span class='error' ng-show='!record.reportsToUserID'>Reports To is Required!</span></div>",
                draggable : true,
                sortable : true
            },
            {
                columnId: 'ROLE',
                label: 'Role',
                layoutOrder: 6,
                style : "width:60px;",
                cellTemplate: "<input type='text' maxlength='250' ng-model='record.role' ng-class='{error: !record.role }' ng-disabled=\"record.STATUS_DESCRIPTION == 'Success'\""
                		+" style='width:100%'  ng-change='model.verifyRecordsModified(record)'/>"
                		+" <div role='alert'><span class='error' ng-show='!record.role'> Role is Required!</span></div>",
                draggable : true,
                sortable : true
            },
            {
                columnId: 'STATUS_DESCRIPTION',
                label: 'Status',
                layoutOrder: 7,
                style : "width:40px;",
                cellTemplate: "<img ng-src='../../comm/lib/images/success_user.png' title='Success' ng-if=\"record.STATUS_DESCRIPTION == 'Success'\"/>"
						+"<img ng-src='../../comm/lib/images/failure_user.png' title='Failure' ng-if=\"record.STATUS_DESCRIPTION == 'Failure'\"/>",
                draggable : true,
                sortable : true
            },
           {
                columnId: 'VAL_MESSAGE',
                label: 'Error',
                layoutOrder: 8,
                style : "width:300px;",
                cellTemplate: '<textarea ng-bind="record.valMessage" style="width:100%" cols="10" class="tk-dtbl-as-table-cell"></textarea>',
                draggable : true,
                sortable : true
            },
            {
                columnId: 'action',
                label: 'Action',
                layoutOrder: 9,
                cellTemplate: "<img ng-src='../../comm/lib/images/sendmail.png' ng-click='model.sendReminderMail(record)' ng-show=\"record.isValid == 'Y' && !record.gcmUserKey \" style='cursor:pointer;'/>"
							+"<span style='width:100%' ng-click='model.sendReminderMail(record)' ng-show=\"record.isValid == 'Y' && ! record.gcmUserKey \" style='cursor:pointer;color:#005187;line-height:20px;font-size:12px;'>"
							+"{{record.ACTION}}</span><span ng-show=\"(record.isValid == 'N') || (record.isValid == 'Y' && record.gcmUserKey != '')\">---</span>",
                draggable : true,
            },
    	],
    	rowTemplate: [
            '<td colspan="{{model.columns.length}}" ng-class="{\'tk-dtbl-expanded\':model.records[$index].open}" ng-init="model.records[$index].open=false;name=\'expandableRows\';parentIndex=$index" class="tk-dtbl-cell tk-padding-none">',
            '		<table class="tk-dtbl" role="grid" aria-readonly="true">',
            '			<tbody>',
            '				<tr ng-click="model.onRowSelect($index)" aria-expanded="{{model.records[$index].open}}" role="link" id="{{name}}{{parentIndex}}-vm10" aria-owns="{{model.getChildId(name,parentIndex,$scope.userFileRecords.length);}}" uitk-navigable>',
            '					<td style="width : 35%" ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}-vm100" class="tk-dtbl-cell"><uitk:icon-font ng-if="!model.records[$index].open"  icon="cux-icon-caret_right"></uitk:icon-font><uitk:icon-font ng-if="model.records[$index].open"  icon="cux-icon-caret_down_centered"></uitk:icon-font>{{record.fileName}}</td>',
            '					<td  ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}-vm101" class="tk-dtbl-cell">{{record.uploadedBy}}</td>',
            '					<td style="width : 11.5%" g-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}-vm102" class="tk-dtbl-cell">{{record.uploadedOn | date:"MM/dd/yyyy HH:mm"}}</td>',
            '					<td style="width : 11.5%" ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}-vm103" class="tk-dtbl-cell">{{record.lastProcessedOn | date:"MM/dd/yyyy HH:mm"}}</td>',
            '                    <td style="width : 8%" ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}-vm104" class="tk-dtbl-cell">{{record.cntUser}}</td>',
            ' 					<td style="width : 7%" ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}-vm105" class="tk-dtbl-cell">{{record.cntUserSuccess}}</td>',
            '					<td style="width : 7%" ng-class="{\'tk-dtbl-cell-dotted-border-bottom tk-dtbl-cell-active tk-dtbl-cell-actived\':model.records[$index].open}" id="{{name}}{{parentIndex}}-vm106" class="tk-dtbl-cell">{{record.cntUserFailure}}</td>',
            '				</tr>',
            '				<tr>',
            '					<td ng-if="model.records[$index].open" colspan="{{model.columns.length}}"  ng-init="userRecord=model.getModel(record,$index)">',
            '                   		<uitk:dynamic-table model="userRecord"></uitk:dynamic-table>',
            '					</td>',
            '				</tr>',
            '			</tbody>',
            '		</table>',
            '</td>'
     ].join(''),
	}
}).factory("userDetailsViewModel", function() {
	
	return {
        records: [],
        totalRecordsCount: 0,
        pagination : { 
        	currentPageNumber : 1,
			currentPageNumberInView : 1,
			recordsPerPage : 5,
        	recordsPerPageChoices : [5, 15, 25],
        	pageNumberError : false
        }, 
        links : [
        	"<img ng-src='../../comm/lib/images/save.png' ng-click='model.userSaveClick()' style='cursor:pointer;'></img>",
        	"<a tabindex=0 href='' title='Save' ng-click='model.userSaveClick()'>Save</a>",
		]
	};
});