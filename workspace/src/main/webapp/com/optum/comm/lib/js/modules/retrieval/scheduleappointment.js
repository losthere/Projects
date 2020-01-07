var module = angular.module('schduleAppointment', ['uitk.component.uitkCalendar','uitk.component.uitkDateOfBirth','uitk.component.uitkDynamicTable','uitk.component.uitkPanel','uitk.component.uitkTextField',
     'uitk.component.uitkLabel', 'uitk.component.uitkTextarea', 'uitk.component.uitkWizard', 'uitk.component.uitkIconFont', 'ngSanitize']);

    module.factory("dataServiceModel",function(){
        var dataObj = {};
        return dataObj;
    });
	
	module.factory('viewModel', function() {
		return {
			columns :  [
				{
					 columnId:'fax',
					 label:'Fax',
					 resizable:false,
					 style : 'width: 15%;',                 
					 cellTemplate:'<span ng-bind="::record.fax"> </span>'
				},
				{ 
					columnId:'faxDate', 
					label:'Date', 
					resizable:false, 
					style : 'width: 15%;', 
					sortOrder:0, 
					sortable:true,                 
					cellTemplate:'<span ng-bind="::record.faxDate"> </span>'
				},

				{ 
					columnId:'faxStatus', 
					label:'Status',
					resizable:false, 
					style : 'width: 30%;', 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.faxStatus"> </span>' 
				}
			]
		 };
	});

    module.controller("schedulerController",function($scope,dataServiceModel){
        dataServiceModel.hasCompletedAllSteps = false;

        $scope.model = {
            id:"wizardComponent",
            wizardDescriptionId:"SampleWizard",
            renderNavIndexes: true,
            buttonsTemplateUrl: "",
            wizardSteps: [{label: "Provider Information", templateurl: 'views/providerinformation.htm'},
                {label: "Retrieval Information", templateurl: 'views/retrievalinformation.htm',focusElementId:'firstNameId_input'},
                {label: "Appointment", templateurl: 'views/appointment.htm',focusElementId:'userNameId_input'},
                {label: "Confirmation", templateurl: 'views/appointmentconfirmation.htm',focusElementId:'iAgreeLblId'}],
                nextButton :{
                    label:"Next"
                },
                extraBtn1:{
                    label:"Pend Chart",
                    show:true,
                    action:function(){
                        $scope.handlePendChartAction();
                    }
                },
                extraBtn2:{
                    label:"Save as Draft",
                    show:true,
                    action:function(){
                        $scope.handleSaveAsDraft();
                    }
                },
                finishButton :{
                    label:"Finish",
                    callback:function(){
                        this.hasCompletedAllSteps=true;
                        dataServiceModel.hasCompletedAllSteps = true;
                        return true;
                    }
                }
        }
        $scope.handlePendChartAction = function(){
            alert("Pend Chart buttion click logic goes here");
        }
        $scope.handleSaveAsDraft = function(){
            alert("save As draft button logic goes here");
        }
        $scope.data={};
        $scope.model.dataModelService = dataServiceModel;

        var globalModel = $scope.model;

        $scope.chartStatusModel = {
            id : 'chartStatusPanel',
            title:'Chart Status',
            titleH3:true,
            templateUrl: 'views/chartstatus.htm',
            open : false,
            lazyLoad:true,
            collapsible: true
        }
        $scope.faxStatusModel = {
            id : 'faxtStatuspanel',
            title:'Fax Status',
            titleH3:true,
            templateUrl: 'views/faxstatus.htm',
            open : false,
            lazyLoad:false,
            collapsible: true
        }
        $scope.commentHistoryModel = {
            id : 'commentHistoryPanel',
            title:'Comments History',
            titleH3:true,
            templateUrl: 'views/commentshistory.htm',
            open : false,
            lazyLoad:true,
            collapsible: true
        }
		
	});

    module.controller('chartStatusCntrl', function($scope, viewModel){
        $scope.scheduledCharts = 35;
        $scope.receivedCharts = 12;
        $scope.pendingCharts = 23;
        $scope.unScheduledCharts = 13;
    });

    module.controller('faxStatusCntrl', function($scope, viewModel){
        var dataObjs = [];
        var dataObj = {};
        dataObj.fax = '1';
        dataObj.faxDate = '01/02/2017';
        dataObj.faxStatus = 'Received';
        dataObjs[0] = dataObj;
        dataObj = {};
        dataObj.fax = '2';
        dataObj.faxDate = '01/03/2017';
        dataObj.faxStatus = 'Pending';
        dataObjs[1] = dataObj;

        viewModel.records = dataObjs;
		viewModel.totalRecordsCount = dataObjs.length;
        $scope.faxStatusTableModel = viewModel;
    });

    module.controller('commentsHitoryCntrl', function($scope, viewModel){
        $scope.saveComments = function(){
            alert('save added comment logic goes here '+ $scope.addcomments);
        }
    });
	
	module.factory('providerInfoTableModel', function() {
		return {
			pagination : {
					currentPageNumber : 1,
					paginationWindow : 5,
					recordsPerPage : 10,
					recordsPerPageChoices : [10, 25, 50, 100]
				},
			columns :  [
				{
					columnId:'multiSelect',
					layoutOrder:1,
					resizable:false,
					style: "width: 5%;",
					align: "center",
					cellHeaderTemplate: [
											'<label for="selectAllCheckboxId1" class="oui-a11y-hidden">Select All Checkbox</label> ',
											'<input type="checkbox" ng-model="model.selectAllChecked" id="selectAllCheckboxId1" ng-change="model.onSelectAllRows(model.selectAllChecked);"/> '
										].join(''),
					cellTemplate:['<label for="{{record.providerName}}" class="oui-a11y-hidden">Select Row</label> ',
									 '<input type="checkbox" id="{{record.providerName}}" ng-model="record.selected" ng-click="model.onRowSelect($event, record, record.selected);"/>'].join('')
				},
				{
					columnId:'groupName',
					label:'Group Name',
					layoutOrder:2,
					resizable:false,
					sortOrder:0, 
					sortable:true,					 
					cellTemplate:'<span ng-bind="::record.groupName"> </span>'
				},
				{ 
					columnId:'providerName', 
					label:'Provider Name',
					layoutOrder:3,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.providerName"> </span>'
				},
				{ 
					columnId:'providerID', 
					label:'Provider ID',
					layoutOrder:4,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.providerID"> </span>' 
				},
				{ 
					columnId:'location', 
					label:'Location',
					layoutOrder:5,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.location"> </span>' 
				},
				{ 
					columnId:'phone', 
					label:'Phone',
					layoutOrder:6,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.phone"> </span>' 
				},
				{ 
					columnId:'fax', 
					label:'Fax',
					layoutOrder:7,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.fax"> </span>' 
				},
				{ 
					columnId:'splHndlingDesc', 
					label:'Special Handling Description',
					layoutOrder:8,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.splHndlingDesc"> </span>' 
				},
				{ 
					columnId:'splHndlingCtgry', 
					label:'Special Handling Category',
					layoutOrder:8,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.splHndlingCtgry"> </span>' 
				},
				{ 
					columnId:'notes', 
					label:'Notes',
					layoutOrder:9,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.notes"> </span>' 
				},
				{ 
					columnId:'charts', 
					label:'Charts',
					layoutOrder:9,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.charts"> </span>' 
				}
			],
			records : [],
            totalRecordsCount : 0,
            selectedRecordCount : 0,
            selectedRecords : [],            
            onSelectAllRows : function(selectAll) {
                //console.log('onSelectAll callback method called');
                var model = this;
                var availableRecords = model.records;

                var selectedRecordIds = [];
                for(var index = 0 ; index < model.selectedRecords.length ; index++) {
                    selectedRecordIds.push(model.selectedRecords[index].patientId);
                }
                if(model.viewAvailableRecords){
                    for(var row = 0 ; row < availableRecords.length ; row++) {
                        if(availableRecords[row].selected) {
                            availableRecords[row].selected = false;
                        }
                    }
                    availableRecords.length = 0;
                }
                for(row = 0 ; row < availableRecords.length ; row++) {
                    var recordIndex = selectedRecordIds.indexOf(availableRecords[row].patientId);
                    if(selectAll) {
                        availableRecords[row].selected = true;
                        if(recordIndex < 0) {
                            model.selectedRecords.push(availableRecords[row]);
                        }
                    } else {
                        if(availableRecords[row].selected) {
                            model.selectedRecords.splice(recordIndex, 1);
                            selectedRecordIds.splice(recordIndex,1);
                            availableRecords[row].selected = false;
                        }
                    }
                }
                this.selectedRecordCount = this.selectedRecords.length;
            },
            onRowSelect : function(event, record, selected) {
                var model = this;
                //console.log('onSelect callback method called');
                if(typeof selected === 'undefined') {
                    if(event.target.tagName === 'A' || event.target.tagName === 'INPUT') {
                        return;
                    }
                    record.selected = !record.selected;
                    selected = record.selected;
                }
                if(!selected && model.selectAllChecked) {
                    model.selectAllChecked = false;
                }

                var availableRecords = model.records;
                var allSelected = true;

                for(var rowIndex = 0; rowIndex < availableRecords.length; rowIndex++) {
                    if(!availableRecords[rowIndex].selected) {
                        allSelected = false;
                        break;
                    }
                }

                if(model.viewAvailableRecords){
                    allSelected = true;
                }

                model.selectAllChecked = allSelected;

                var recordIndex = -1;
                for( var index = 0 ; index < model.selectedRecords.length ; index++) {
                    if(model.selectedRecords[index].patientId === record.patientId) {
                        recordIndex = index;
                    }
                }
                if(selected) {
                    if(recordIndex < 0) {
                        model.selectedRecords.push(record);
                    }
                } else {
                    model.selectedRecords.splice(recordIndex, 1);
                }
                this.selectedRecordCount = this.selectedRecords.length;
            }
		 };
	});
    module.controller('prvdrInforCntrl', function($scope, providerInfoTableModel, dataServiceModel){
		$scope.dataModel = dataServiceModel;
        $scope.tkWizardCtrl.viewModel.nextButton.disabled = false;
		$scope.tkWizardCtrl.viewModel.extraBtn1.show = true;
		var dataObjs = [];
        var dataObj = {};
        dataObj.groupName = 'Group 1';
        dataObj.providerName = 'Last,Frist';
        dataObj.providerID = '';
		dataObj.location = 'Address1';
		dataObj.phone = '1234567899';
		dataObj.fax = '1234567899';
		dataObj.splHndlingDesc = '';
		dataObj.splHndlingCtgry = '';
		dataObj.notes = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hinc ceteri particulas nat..';
		dataObj.charts = 10;
        dataObjs[0] = dataObj;
        dataObj = {};
        dataObj.groupName = 'Group 2';
        dataObj.providerName = 'Last,Frist';
        dataObj.providerID = '';
		dataObj.location = 'Address1';
		dataObj.phone = '1234567899';
		dataObj.fax = '1234567899';
		dataObj.splHndlingDesc = '';
		dataObj.splHndlingCtgry = '';
		dataObj.notes = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hinc ceteri particulas nat..';
		dataObj.charts = 10;
        dataObjs[1] = dataObj;
		providerInfoTableModel.records = dataObjs;
		providerInfoTableModel.totalRecordsCount = dataObjs.length;
		$scope.dataModel.providerInfoModel = providerInfoTableModel;
    });
	module.factory('retrievalInfoTablModel', function() {
		return {
			pagination : {
					currentPageNumber : 1,
					paginationWindow : 5,
					recordsPerPage : 10,
					recordsPerPageChoices : [10, 25, 50, 100]
				},
			columns :  [
				{
					columnId:'status',
					label:'Status',
					layoutOrder:1,
					resizable:false,
					style: "width: 5%;",
					align: "center",
					cellTemplate:['<select ng-model="record.status">',
									'  <option value="">Select</option>',
									'  <option value="Verified">Verified</option>',
									'  <option value="Chart Not Available">Chart Not Available</option>',
									'</select> '].join('')
				},
				{
					columnId:'groupName',
					label:'Group Name',
					layoutOrder:2,
					resizable:false,
					sortOrder:0, 
					sortable:true,					 
					cellTemplate:'<span ng-bind="::record.groupName"> </span>'
				},
				{ 
					columnId:'providerName', 
					label:'Provider Name',
					layoutOrder:3,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.providerName"> </span>'
				},
				{ 
					columnId:'location', 
					label:'Location',
					layoutOrder:4,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.location"> </span>' 
				},
				{ 
					columnId:'phone', 
					label:'Phone',
					layoutOrder:5,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.phone"> </span>' 
				},
				{ 
					columnId:'fax', 
					label:'Fax',
					layoutOrder:6,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.fax"> </span>' 
				},
				{ 
					columnId:'memberName', 
					label:'Member Name',
					layoutOrder:7,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.memberName"> </span>' 
				},
				{ 
					columnId:'memberDOB', 
					label:'Member Date of Birth',
					layoutOrder:8,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.memberDOB"> </span>' 
				},
				{ 
					columnId:'gender', 
					label:'Gender',
					layoutOrder:9,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.gender"> </span>' 
				},
				{ 
					columnId:'chartId', 
					label:'Chart ID',
					layoutOrder:10,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.chartId"> </span>' 
				}
			],
		};
	});
	

    module.controller("rtrvlInfoCntrl",function($scope,retrievalInfoTablModel, dataServiceModel){
		$scope.dataModel = dataServiceModel;
        $scope.dataModel.retrievalInfoModel = retrievalInfoTablModel;
		var dataObjs = [];
        var dataObj = {};
		dataObj.status = 'Verified';
		dataObj.groupName = 'Group 1';
        dataObj.providerName = 'Last,Frist';
		dataObj.location = 'Address1';
		dataObj.phone = '1234567899';
		dataObj.fax = '1234567899';
		dataObj.memberName = '';
		dataObj.memberDOB = '';
		dataObj.gender = 'M';
		dataObj.chartId = 'OOOOOOOOOO';
        dataObjs[0] = dataObj;
        dataObj = {};
		dataObj.status = 'Chart Not Available';
        dataObj.groupName = 'Group 2';
        dataObj.providerName = 'Last,Frist';
		dataObj.location = 'Address1';
		dataObj.phone = '1234567899';
		dataObj.fax = '1234567899';
		dataObj.memberName = '';
		dataObj.memberDOB = '';
		dataObj.gender = 'F';
		dataObj.chartId = 'OOOOOOOOOO';
        dataObjs[1] = dataObj;
		
		retrievalInfoTablModel.records = dataObjs;
		retrievalInfoTablModel.totalRecordsCount = dataObjs.length;
		$scope.tkWizardCtrl.viewModel.extraBtn1.show = true;
        $scope.tkWizardCtrl.viewModel.nextButton.disabled = false;
    });
	
	module.factory('appointmentsModel', function() {
		return {
			pagination : {
					currentPageNumber : 1,
					paginationWindow : 5,
					recordsPerPage : 10,
					recordsPerPageChoices : [10, 25, 50, 100]
				},
			columns :  [
				{
					columnId:'selectApontmntRadio',
					layoutOrder:1,
					resizable:false,
					style: "width: 5%;",
					align: "center",
					cellTemplate:'<input type="radio" ng-model="record.apontmntid" />'
				},
				{
					columnId:'appointmentTime',
					label:'Time',
					layoutOrder:2,
					resizable:false,
					sortOrder:0, 
					sortable:true,					 
					cellTemplate:'<span ng-bind="::record.appointmentTime"> </span>'
				},
				{ 
					columnId:'retrvlLoc', 
					label:'Retrieval Location',
					layoutOrder:3,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.retrievalLocation"> </span>'
				},
				{ 
					columnId:'phone', 
					label:'Phone',
					layoutOrder:4,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.phone"> </span>' 
				},
				{ 
					columnId:'fax', 
					label:'Fax',
					layoutOrder:5,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.fax"> </span>' 
				},
				{ 
					columnId:'apontmntScheduledBy', 
					label:'Appointment Scheduled By',
					layoutOrder:6,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.apontmntScheduledBy"> </span>' 
				},
				{ 
					columnId:'charts', 
					label:'Charts',
					layoutOrder:7,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.charts"> </span>' 
				},
				{ 
					columnId:'retrievalMethod', 
					label:'Retrieval Method',
					layoutOrder:8,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.retrievalMethod"> </span>' 
				},
				{ 
					columnId:'status', 
					label:'Status',
					layoutOrder:9,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.status"> </span>' 
				},
				{ 
					columnId:'retrievalContact', 
					label:'Retrieval Contact',
					layoutOrder:10,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.retrievalContact"> </span>' 
				}
			],
		};
	});

    module.controller("appointmentCntrl",function($scope, appointmentsModel, dataServiceModel){
		$scope.dataModel = dataServiceModel;
		$scope.dataModel.existingAppointmentsModel = appointmentsModel;
		$scope.dataModel.retrievalProvName = $scope.dataModel.lastName+", "+$scope.dataModel.firstName;
		$scope.retrievalProvaddr1 = $scope.dataModel.address1;
		$scope.retrievalProvaddr2 = $scope.dataModel.address2;
		$scope.appointmentTypes = [{
										label:'Add to existing appointment',
										value:'addToExisting',
										disabled:false
									},
									{
										label:'New appointment',
										value:'newAppointment',
										disabled:false
									}];
		$scope.faxMemberTypes = [{
										label:'Fax all members',
										value:'faxAllMembers',
										disabled:false
									},
									{
										label:'Fax added members only',
										value:'faxAddedMembersOnly',
										disabled:false
									}];
		$scope.appointmentType = {index:0};
        $scope.dataModel = dataServiceModel;
		$scope.dataModel.existingAppointmentsModel = appointmentsModel;
		appointmentsModel.records = [];
		appointmentsModel.totalRecordsCount = 0;
		
		$scope.addToAppointmentClick = function(){
		  alert("add to appointment logic goes here");
		}
		
		$scope.myDateVM1 = {};
		
		$scope.tkWizardCtrl.viewModel.extraBtn1.show = false;
		$scope.tkWizardCtrl.viewModel.nextButton.disabled = false;
    });
	
	module.factory('appointmentConfirmTableModel', function(){
		return {
			pagination : {
					currentPageNumber : 1,
					paginationWindow : 5,
					recordsPerPage : 10,
					recordsPerPageChoices : [10, 25, 50, 100]
				},
			columns :  [
				{
					columnId:'groupName',
					label:'Group Name',
					layoutOrder:1,
					resizable:false,
					sortOrder:0, 
					sortable:true,					 
					cellTemplate:'<span ng-bind="::record.groupName"> </span>'
				},
				{ 
					columnId:'providerName', 
					label:'Name',
					layoutOrder:2,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.providerName"> </span>'
				},
				{ 
					columnId:'location', 
					label:'Location',
					layoutOrder:3,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.location"> </span>' 
				},
				{ 
					columnId:'phone', 
					label:'Phone',
					layoutOrder:4,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.phone"> </span>' 
				},
				{ 
					columnId:'fax', 
					label:'Fax',
					layoutOrder:5,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.fax"> </span>' 
				},
				{ 
					columnId:'memberName', 
					label:'Member Name',
					layoutOrder:6,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.memberName"> </span>' 
				},
				{ 
					columnId:'memberDOB', 
					label:'Member Date of Birth',
					layoutOrder:7,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.memberDOB"> </span>' 
				},
				{ 
					columnId:'gender', 
					label:'Gender',
					layoutOrder:8,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.gender"> </span>' 
				},
				{ 
					columnId:'chartId', 
					label:'Chart ID',
					layoutOrder:9,
					resizable:false, 
					sortOrder:0, 
					sortable:true,                
					cellTemplate:'<span ng-bind="::record.chartId"> </span>' 
				}
			]
		};
	});

    module.controller("apntmntCnfrmCntrl",function($scope, appointmentConfirmTableModel,dataServiceModel){
		$scope.dataModel = dataServiceModel;
		$scope.tkWizardCtrl.viewModel.extraBtn1.show = false;

        $scope.tkWizardCtrl.viewModel.finishButton.disabled = !$scope.dataModel.agree;

        $scope.$watch('dataModel.agree', function(value){
            $scope.tkWizardCtrl.viewModel.finishButton.disabled = !value;
        });
		$scope.dataModel.appointmentConfirmModel = appointmentConfirmTableModel;
		appointmentConfirmTableModel.records = [];
		appointmentConfirmTableModel.totalRecordsCount = 0;
    });