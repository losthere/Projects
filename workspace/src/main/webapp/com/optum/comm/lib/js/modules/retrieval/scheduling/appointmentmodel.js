schedulerworklistmodule
		.controller(
				"appointmentCntrl",
				function($scope, $compile, $timeout, $http, dataServiceModel, $filter, staticDataService) {
					$scope.dataModel = dataServiceModel;

					$scope.dataModel.existingAppointmentsModel = {
						pagination : {
							currentPageNumber : 1,
							paginationWindow : 5,
							recordsPerPage : 10,
							recordsPerPageChoices : [ 10, 25, 50, 100 ]
						},
						columns : [
								{
									columnId : 'selectApontmntRadio',
									layoutOrder : 1,
									resizable : false,
									style : "width: 1%;",
									align : "center",
									cellTemplate : '<input type="radio" id="{{record.index}}" name="existingAppRadio" ng-click="model.onRowSelect($event,record)" />'
								}, {
									columnId : 'apptId',
									label : 'AppointmentID',
									layoutOrder : 2,
									resizable : false,
									sortOrder : 0,
									sortable : true,
									style : "width: 3%;",
									align : "center",
									cellTemplate : '<span ng-bind="::record.apptId"> </span>'
								}, {
									columnId : 'apptDate',
									label : 'Date',
									layoutOrder : 3,
									resizable : false,
									style: "width: 10%;",
									sortOrder : 0,
									sortable : true,
									cellTemplate : '<span ng-bind="::record.apptDate"> </span>'
								}, {
									columnId : 'apptTime',
									label : 'Time',
									layoutOrder : 4,
									resizable : false,
									style: "width: 10%;",
									sortOrder : 0,
									sortable : true,
									cellTemplate : '<span ng-bind="::record.apptTime"> </span>'
								}, {
									columnId : 'retrContact',
									label : 'Retrieval Contact',
									layoutOrder : 5,
									resizable : false,
									style: "width: 11%;",
									sortOrder : 0,
									sortable : true,
									cellTemplate : '<span ng-bind="::record.retrContact"> </span>'
								}, {
									columnId : 'retrLocation',
									label : 'Retrieval Location',
									layoutOrder : 6,
									resizable : false,
									style: "width: 12%;",
									sortOrder : 0,
									sortable : true,
									cellTemplate : '<span ng-bind="::record.retrLocation"> </span>'
								}, {
									columnId : 'retrPhone',
									label : 'Phone',
									layoutOrder : 7,
									resizable : false,
									style: "width: 8%;",
									sortOrder : 0,
									sortable : true,
									cellTemplate : '<span ng-bind="::record.retrPhone"> </span>'
								}, {
									columnId : 'retrFax',
									label : 'Fax',
									layoutOrder : 8,
									resizable : false,
									style: "width: 8%;",
									sortOrder : 0,
									sortable : true,
									cellTemplate : '<span ng-bind="::record.retrFax"> </span>'
								}, {
									columnId : 'apptUserName',
									label : 'Appointment Scheduled By',
									layoutOrder : 9,
									resizable : false,
									style: "width: 11%;",
									sortOrder : 0,
									sortable : true,
									cellTemplate : '<span ng-bind="::record.apptUserName"> </span>'
								}, {
									columnId : 'chartCnt',
									label : 'Charts',
									layoutOrder : 10,
									resizable : false,
									dataType : 'number',
									style: "width: 7%;",
									sortOrder : 0,
									sortable : true,
									cellTemplate : '<span ng-bind="::record.chartCnt"> </span>'
								}, {
									columnId : 'apptType',
									label : 'Retrieval Method',
									layoutOrder : 11,
									resizable : false,
									style: "width: 7%;",
									sortOrder : 0,
									sortable : true,
									cellTemplate : '<span ng-bind="::record.apptType"> </span>'
								}, {
									columnId : 'apptStatus',
									label : 'Status',
									layoutOrder : 12,
									resizable : false,
									style: "width: 5%;",
									sortOrder : 0,
									sortable : true,
									cellTemplate : '<span ng-bind="::record.apptStatus"> </span>'
								} ],
						records : [],
						totalRecordsCount : 0,
						onRowSelect : function(event, record) {
							dataServiceModel.selectedAddToApptId = record.apptId;
							dataServiceModel.selectedAddToAppt = record;
						}
					};
					$scope.dataModel.existingAppointments = [];
					$scope.dataModel.existingAppointmentsModel.records = [];
					$scope.dataModel.existingAppointmentsModel.totalRecordsCount = 0;

					$scope.dataModel.selectedAddToApptId = "";
					$scope.dataModel.selectedAddToAppt = {};
					$scope.dataModel.retrievalProvName = $scope.dataModel.lastName + "," + $scope.dataModel.firstName;
					$scope.retrievalProvaddr1 = $scope.dataModel.address1;
					$scope.retrievalProvaddr2 = $scope.dataModel.address2;
					$scope.appointmentTypes = [ {
						label : 'Add to existing appointment',
						value : 'addToExisting',
						disabled : false
					}, {
						label : 'New appointment',
						value : 'newAppointment',
						disabled : false
					} ];
					$scope.faxMemberTypes = [ {
						label : 'Fax all members',
						value : 'faxAllMembers',
						disabled : false
					}, {
						label : 'Fax added members only',
						value : 'faxAddedMembersOnly',
						disabled : false
					} ];
					$scope.amPMTypes = [ {
						label : 'AM',
						value : 'AM',
						disabled : false
					}, {
						label : 'PM',
						value : 'PM',
						disabled : false
					} ];

					$scope.handleApptTypeClick = function() {
						/*
						 * $timeout(function(){
						 * $scope.dataModel.existingAppointmentsModel.records =
						 * $scope.dataModel.existingAppointments;
						 * $scope.dataModel.existingAppointmentsModel.totalRecordsCount =
						 * $scope.dataModel.existingAppointments.length; });
						 */
					}

					$scope.errorMessageModel = {
						id : 'appointmentError',
						messageType : 'error',
						content : '',
						visible : false,
						ariaAttributes : true,
						headingLevel : '2'
					}

					var readExistingAppointments = function() {
						if ($scope.dataModel.phonenumber.length > 10)
							$scope.phoneNo = $scope.dataModel.phonenumber;
						else
							$scope.phoneNo = $scope.dataModel.phonenumber.slice(0, 3) + "-" + $scope.dataModel.phonenumber.slice(3, 6) + "-"
									+ $scope.dataModel.phonenumber.slice(6, 10);
						if ($scope.dataModel.fax.length > 10)
							$scope.fax = $scope.dataModel.fax;
						else
							$scope.fax = $scope.dataModel.fax.slice(0, 3) + "-" + $scope.dataModel.fax.slice(3, 6) + "-"
									+ $scope.dataModel.fax.slice(6, 10);
						$scope.dataModel.existingAppointments = [];
						$scope.appointmentSearchFilter = {
							"firstName" : $scope.dataModel.firstName,
							"lastName" : $scope.dataModel.lastName,
							"addr1" : $scope.dataModel.address1,
							"addr2" : $scope.dataModel.address2,
							"city" : $scope.dataModel.city,
							"state" : $scope.dataModel.stateSelect,
							"zip" : $scope.dataModel.zip,
							"phone" : $scope.phoneNo,
							"fax" : $scope.fax,
							"email" : $scope.dataModel.email,
							"programKey" : "",
							"vendorKey" : $scope.dataModel.vendorKey,
							"groupKey" : $scope.dataModel.currentGroupKey
						}
						$http.post('/gcm-app-services/scheduling/workflow/getExistingAppts', $scope.appointmentSearchFilter).then(function(response) {
							if (response && response.data && response.data.result && response.data.result.length > 0) {
								angular.forEach(response.data.result, function(obj, idx) {
									obj.index = idx;
								});
								for (var i = 0; i < response.data.result.length; i++) {
									response.data.result[i] = formatTime(response.data.result[i]);
									if ($scope.dataModel.selectedMyApptId != response.data.result[i].apptId) {
										$scope.dataModel.existingAppointments.push(response.data.result[i]);
									}
								}
							} else {
								$scope.dataModel.existingAppointments = [];
							}
							$scope.dataModel.existingAppointmentsModel.records = $scope.dataModel.existingAppointments;
							$scope.dataModel.existingAppointmentsModel.totalRecordsCount = $scope.dataModel.existingAppointments.length;
						}, function(error) {
							alert(JSON.stringify(error));
						});
					}
					readExistingAppointments();

					var readApptAttemptedDates = function() {

						$http.post('/gcm-app-services/scheduling/workflow/getApptAttemptedDates', $scope.dataModel.selectedMyApptId).then(
								function(response) {
									if (response && response.data && response.data.result && response.data.result.length > 0) {

									}
								}, function(error) {
									alert(JSON.stringify(error));
								});

					}

					$scope.layout = 'vertical';

					$scope.dataModel.addToExistingAppt = function() {
						if ($scope.dataModel.faxMemberType) {
							var faxAllMembers = false;
							if ($scope.dataModel.faxMemberType.index == 0)
								faxAllMembers = true;
							var busFuncDtlKey = $scope.dataModel.busFuncDtlKey;
							if ($scope.dataModel.selectedAddToAppt.apptType == "FAX") {
								busFuncDtlKey = 1;
							} else if ($scope.dataModel.selectedAddToAppt.apptType == "ONSITE") {
								busFuncDtlKey = 2;
							} else if ($scope.dataModel.selectedAddToAppt.apptType == "EMR") {
								busFuncDtlKey = 3;
							}
							var chartIdList = [];
							for (var i = 0; i < $scope.dataModel.includedRtrvlRecords.length; i++) {
								chartIdList.push($scope.dataModel.includedRtrvlRecords[i].chartId);
							}
							var apptInfo = {
								"retStatus" : $scope.dataModel.selectedAddToAppt.apptStatus,
								"requestedUserId" : $scope.dataModel.loginUserId,
								"assignInventorySearchFilter" : [],
								"chartIdList" : chartIdList,
								"chartIdExclList" : [],
								"loginUserKey" : $scope.dataModel.loginUserKey,
								"retMethod" : $scope.dataModel.retrvlPrefSelect,
								"busFuncDtlKey" : busFuncDtlKey,
								"appt" : {
									"apptIteration" : "",
									"apptKey" : $scope.dataModel.selectedAddToApptId,
									"apptType" : $scope.dataModel.selectedAddToAppt.apptType,
									"gcmUserKey" : $scope.dataModel.selectedAddToAppt.gcmUserKey ? $scope.dataModel.selectedAddToAppt.gcmUserKey : $scope.dataModel.loginUserKey,
									"apptStatus" : $scope.dataModel.selectedAddToAppt.apptStatus,
									"gcmVendorKey" : $scope.dataModel.vendorKey,
									"gcmGroupKey" : $scope.dataModel.currentGroupKey ? $scope.dataModel.currentGroupKey : 3,
									"createUser" : $scope.dataModel.loginUserId,
									"modifiedUser" : $scope.dataModel.loginUserId
								},
								"faxAllMembers" : faxAllMembers
							}
							$http.post('/gcm-app-services/scheduling/workflow/addToExistingAppointment', apptInfo).then(function(response) {
								$scope.dataModel.setMessage("Charts added to selected appointment", "success");
								$scope.dataModel.selectedAddToApptId = "";
								$scope.dataModel.selectedAddToAppt = {};
								$scope.dataModel.existingAppointments = [];
								$scope.dataModel.existingAppointmentsModel.records = [];
								$scope.dataModel.existingAppointmentsModel.totalRecordsCount = 0;
								if ($scope.dataModel.handleCancelAppointment) {
									$scope.dataModel.handleCancelAppointment(true);
								}
								$scope.dataModel.clearWizardData();
							}, function(error) {

							});
						} else {
							var errorMessage = "Please select atleast one Fax option";
							$scope.errorMessageModel.content = '<span>' + errorMessage + '</span>';
							$scope.errorMessageModel.visible = true;
						}
					}

					$scope.addToAppointmentClick = function() {
						if ($scope.dataModel.selectedAddToApptId) {
							$scope.dataModel.confirmType = 'AddToExistingAppointment'
							$scope.dataModel.confirmMessage = "“Included members will be added to the selected appointment date/time.  Excluded members will return to your Worklist.  Do you want to proceed?";
							$scope.dataModel.showConfirmApptDialog = !$scope.dataModel.showConfirmApptDialog;
						} else {
							$scope.dataModel.setMessage("Please select an existing appointment date/time.", "error");
						}
					}

					$scope.dataModel.apontmntDateViewModel = {
						id : 'apontmntDt',
						name : 'apontmntDate',
						required : true,
						layout : $scope.layout
					}
					// $scope.dataModel.apontmntDate = '';
					if ($scope.dataModel.apontmntDate) {
						$scope.dataModel.apontmntDateViewModel.dateText = $scope.dataModel.apontmntDate;
					}
					if ($scope.dataModel.apontmntDate) {
						$scope.dataModel.appointmentType = {
							index : 1
						};
					} else {
						$scope.dataModel.appointmentType = {
							index : 0
						};
					}

					$scope.dataModel.validateAppointmentTimings = function() {
						if (!$scope.dataModel.apontmntDate) {
							var errorMessage = "Date Required";
							/*
							 * $scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
							 * $scope.errorMessageModel.visible = true;
							 */
							$scope.dataModel.setMessage(errorMessage, "error");
							return false;
						}
						if (!$scope.dataModel.apontmntTime) {
							var errorMessage = "Time Required";
							/*
							 * $scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
							 * $scope.errorMessageModel.visible = true;
							 */
							$scope.dataModel.setMessage(errorMessage, "error");
							return false;
						}
						if ($scope.dataModel.apontmntDate || $scope.dataModel.apontmntTime) {
							var dateFlag = $scope.dataModel.apontmntDate >= new Date();
							if (dateFlag) {
								var apontmntDate = $filter('date')($scope.dataModel.apontmntDateViewModel.dateText, "MM-dd-yyyy");
								var apontmntDatePattern = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/
								var apontmntDateRegEx = new RegExp(apontmntDatePattern);
								var apontmntDateFlag = apontmntDateRegEx.test(apontmntDate);
								var month = apontmntDate.split('-')[0];
								var day = apontmntDate.split('-')[1];
								var year = apontmntDate.split('-')[2];
								if (!apontmntDateFlag || !isValidDate(year, month, day)) {
									var errorMessage = "Date Not Valid";
									/*
									 * $scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
									 * $scope.errorMessageModel.visible = true;
									 */
									$scope.dataModel.setMessage(errorMessage, "error");
									return false;
								}
								var apontmntTimePattern = /^(0?[1-9]|1[012])(:[0-5]\d)$/;
								var apontmntTimeRegEx = new RegExp(apontmntTimePattern);
								var apontmntTimeFlag = apontmntTimeRegEx.test($scope.dataModel.apontmntTime);
								if (!apontmntTimeFlag) {
									var errorMessage = "Time Not Valid";
									/*
									 * $scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
									 * $scope.errorMessageModel.visible = true;
									 */
									$scope.dataModel.setMessage(errorMessage, "error");
									return false;
								}
								return true;
							} else {
								var errorMessage = "Date Not Valid";
								/*
								 * $scope.errorMessageModel.content = '<span>'+errorMessage+'</span>';
								 * $scope.errorMessageModel.visible = true;
								 */
								$scope.dataModel.setMessage(errorMessage, "error");
								return false;
							}
						}
						return true;
					}

					function isValidDate(year, month, day) {
						year = parseInt(year);
						if (day == 31 && (month == 4 || month == 6 || month == 9 || month == 11)) {
							return false; // 31st of a month with 30 days
						} else if (day >= 30 && month == 2) {
							return false; // February 30th or 31st
						} else if (month == 2 && day == 29 && !(year % 4 == 0 && (year % 100 != 0 || year % 400 == 0))) {
							return false; // February 29th outside a leap year
						} else {
							return true; // Valid date
						}
					}

					function formatTime(appointmentObj) {
						var timePart = "";
						var hrs = 0;
						var mts = 0;
						timePart = appointmentObj.apptTime.split(":");
						if (timePart.length == 3) {
							hrs = timePart[0];
							mts = timePart[1];
							if (hrs > 12) {
								hrs = hrs - 12;
								if(hrs  < 10){
									hrs = '0'+hrs;
								}
								appointmentObj.apptTime = hrs + ":" + mts + " PM";
							}else{
								if(hrs == 0 || hrs === '00'){
									hrs = 12;
								}
								appointmentObj.apptTime = hrs + ":" + mts + " AM";
							}
						}
						return appointmentObj;
					}

					$scope.dataModel.wizardModel.extraBtn1.show = false;
					$scope.dataModel.wizardModel.nextButton.disabled = false;
				});