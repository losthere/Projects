
	/*administrationmodule.factory("dataServiceModel", function() {
		var dataObj = {};
		dataObj.showUploadError = false;
        dataObj.errorMsg = false;
        dataObj.uploadErrorMsg = '';
		return dataObj;
	});*/

	administrationmodule.controller('userUploadController', function($scope, $compile, $filter, $timeout, $http, staticDataService, errorMessageModel, userViewModel, userDetailsViewModel, dataServiceModel,
				uploadUserViewModel) {
		// Variables	
		$scope.dataModel = dataServiceModel;
		$scope.emailRegExp =/^[-A-Za-z0-9._&]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$/;
		$scope.zipCodeRegExp = /^[0-9\-]+$/;
		$scope.nameRegExp = /^[\'a-zA-Z0-9 -]*$/;
		$scope.addressRegExp = /^[\#\,\.\,\_a-zA-Z0-9 -]*$/;
		$scope.textRegExp = /^[A-Za-z\s]+$/;
		$scope.orgRegExp = /^[\|\'\–a-zA-Z0-9 -]*$/;
		$scope.roleRegExp = /^[\|\;\'\–a-zA-Z0-9 -]*$/;
		$scope.statesRegExp=/^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/;
		$scope.hasError = false;
		$scope.showUserUploadDialog = false;
		$scope.userFileRecords=[];
		$scope.userFileRecordObjects = [];		
		$scope.title = 'Read CSV file';
		$scope.lines = [];
		$scope.selected = {};
		$("#csvFileInput").val = '';
		$scope.userListObj = angular.copy($scope.mainObj);
		$scope.tinyArrowImg="../../gcm-app-services/com/optum/comm/lib/images/tiny_arrow_right.png";
		$scope.errorMessageModel = errorMessageModel;
		$scope.errorMessageModel.messageType = 'error';
		$scope.errorMessageModel.content = '';
		$scope.errorMessageModel.visible = false;
		$scope.dialogErrorMessageModel = angular.copy(errorMessageModel);
		$scope.open = false;
		$scope.userTableModel = userViewModel;
		$scope.userDetailsTableModel = userDetailsViewModel;
		$scope.userDetailsTableModel.columns = $scope.userTableModel.subColumns.slice();
		$scope.innerTableModifiedRecord = {};
		$scope.uploadUsersTableModel = uploadUserViewModel;
		var userObj = optumUI.getUser();
		$scope.dataModel.loginUserKey = userObj.getLoggedInUserKey();
		$scope.dataModel.currentRolecode = window.parent.rootData.currentRole;
		/*if( $scope.dataModel.currentRolecode === 'OCUA'){
			//$scope.dataModel.getGroups();
			$scope.dataModel.gcmGroupKey = $scope.dataModel.groupKey;
		}else{
			$scope.dataModel.gcmGroupKey = $scope.dataModel.groupKey ? $scope.dataModel.groupKey : userObj.getCurrentGroupKey();
		}*/
		
		$scope.dataModel.gcmGroupKey = $scope.dataModel.groupKey ? $scope.dataModel.groupKey : userObj.getCurrentGroupKey();
		
		function reqParams(params) {
			var queryParams = "";
			for ( var key in params) {
				queryParams += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
				//	queryParams += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
			}
			return queryParams;
		}
		
		var config = {
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		};

		// Functions
		$scope.dataModel.readUploadHistory = $scope.readUploadHistory = function(groupKey){
			var deferred = $.Deferred();
			var parameters = {
					userGroupKey : $scope.dataModel.groupKey ? $scope.dataModel.groupKey : $scope.dataModel.gcmGroupKey
			};	
			
			
			$http.post('/gcm-app-services/useradmin/getUserFileHistory',reqParams(parameters),config).then(function(response) {
			  	if(response && response.data && response.data.result && response.data.result.length > 0){
								$scope.userFileHistory = response;								
								$scope.userResults = response.data.result;
								angular.forEach($scope.userResults, function(obj, idx) {
									obj.index = idx;
								});
						
								$scope.userTableModel.records = $scope.userResults.slice();
								$scope.userTableModel.totalRecordsCount = $scope.userTableModel.records.length;
								$scope.userTableModel.originalRecords = $scope.userResults.slice();
								$scope.userTableModel.pagination.currentPageNumber = 1;
								$scope.userTableModel.pagination.currentPageNumberInView = 1;
								$scope.userTableModel.pagination.pageNumberError = false;
								$scope.userTableModel.pagination.recordsPerPage = 25;				
								
								var obj = {
										recordsPerPage : $scope.userTableModel.pagination.recordsPerPage,
										pageNumber : 1,
										sortBy : [$scope.userTableModel.columns[0].columnId],
										sortOrder : [1]
								};
								for(var key in $scope.userFileHistory)
								{
									var userFileObj = $scope.userFileHistory[key];
									userFileObj.tinyArrowImg = "../../gcm-app-services/com/optum/comm/lib/images/tiny_arrow_right.png";
								}
							  deferred.resolve(response);
						}else{
							$scope.userTableModel.records = [];
							$scope.userTableModel.totalRecordsCount = 0;
							$timeout(function(){
								$scope.userFileHistory = [];
								$scope.errorMessage = "Unable to read file history.";
								deferred.reject();
							});
						}
						
				}, function(error) {
					var message = JSON.stringify(error);
					$scope.dataModel.setMessage(message, "error");
				});
			return deferred;
			}		
			
		
		$scope.userTableModel.uploadClick = function(){
			$scope.dialogErrorMessageModel.visible = false;
			$scope.dataModel.showUploadError = false;
			$scope.errorMessageModel.visible = false;
			$scope.clearUploadedDetails();
			$scope.showUserUploadDialog = true;
			$scope.uploadUsersTableModel.pagination.currentPageNumber = 1;
			$scope.uploadUsersTableModel.pagination.currentPageNumberInView = 1;
		}
		
		

		$scope.userTableModel.onRowSelect = function(index){
			$scope.errorMessageModel.visible = false;
			$scope.indexVal ;			
			if (-1 === $scope.userTableModel.expandedRowIndex || index === $scope.userTableModel.expandedRowIndex) {
				$scope.userTableModel.expandedRowIndex = index;
				$scope.indexVal = index;
				$scope.userTableModel.records[index].open = !$scope.userTableModel.records[index].open;
				if (index === $scope.userTableModel.expandedRowIndex && !$scope.userTableModel.records[index].open){
					$scope.userTableModel.records[$scope.indexVal].open = false;
				}else{
					$scope.userTableModel.records[$scope.indexVal].open = true;
				}
				if (!$scope.userTableModel.records[index].open)
					$scope.userTableModel.expandedRowIndex = -1;
			}			
			else if($scope.userTableModel.expandedRowIndex != index || -1 != $scope.userTableModel.expandedRowIndex){
				
					if($scope.indexVal === index && $scope.userTableModel.records[index].open){
						$scope.userTableModel.records[$scope.indexVal].open = false;
						$scope.userTableModel.records[index].open = false;
					}else{
						$scope.userTableModel.records[$scope.indexVal].open = false;
						$scope.userTableModel.records[index].open = true;
					}
					$scope.indexVal = index;
			}
		}
		
		$scope.userTableModel.getModel = function(record,index){
			$scope.open = true;
			$scope.userDetailsTableModel.componentId = 'dynamic-sub-table'+index;
        	$scope.openDetailedGrid(record);
        	return $scope.userDetailsTableModel;
        }
		
		$scope.userDetailsTableModel.verifyRecordsModified = function(userObj) {
			$scope.innerTableModifiedRecord = {};
			$scope.innerTableModifiedRecord = userObj;
			userObj.edit=true;
		}
		
		$scope.userDetailsTableModel.userSaveClick = function(){
			$scope.errorMessageModel.visible = false;
			saveFailedRecords($scope.innerTableModifiedRecord);
		}
		
		$scope.validateMandatory = function(val){
			if (!val){
			    $scope.hasError = true;
			    return true;
			  }
			  $scope.hasError = false;
				return false;
		}		
		
		$scope.synchronizeUserData = function(model, message){
			model.synchronize().done(function(response, statusText, ob){
			}
			).fail(function(e, statusText, errorThrown) {
			});
		}
		
		$scope.readFileRecords = function(){
			var deferred = $.Deferred();
			$scope.userFileRecords=[];
			var parameters = {
				stgExtUserFileInfoKey : $scope.fileKeyInpuObj.STG_EXT_USER_FILE_INFO_KEY,
				gcmGroupKey : $scope.dataModel.gcmGroupKey,				
			};
			
			$http.post('/gcm-app-services/useradmin/getValidatedExtUsers',parameters).then(function(response) {
				if(response.data.status === 'SUCCESS' ){
					$timeout(function(){
						$scope.userFileRecordObjects = response.data.result;
						
						 for(var i =0; i < response.data.result.length; i++){
							 var userFileRecord = response.data.result[i];
							if(userFileRecord.isValid == "Y"){
								userFileRecord.ACTION='Send email';
								userFileRecord.STATUS_DESCRIPTION = 'Success';
							}else {
								userFileRecord.STATUS_DESCRIPTION = 'Failure';
							}				
							$scope.userFileRecords[i]  = userFileRecord;
							
						}
					  deferred.resolve(response);
					  $scope.userDetailsTableModel.records = $scope.userFileRecords;
					  $scope.userDetailsTableModel.totalRecordsCount = $scope.userDetailsTableModel.records.length;
					});					
				}
				else{
					$timeout(function(){
						$scope.errorMessage = "Unable to read file history.";
						deferred.reject();
					});
				}			
			},function(error) {
				deferred.reject(errorResponse);
			});	
			return deferred;
		}		
	
		$scope.readUploadHistory();
		

  $scope.saveUserFileRecords = function(){
	  $scope.errorMessageModel.visible = false;
	  if($scope.isFileLoaded())
		{
		  // check for duplicate user based on email
		  var valueArr = $scope.userListObj.INSERT_STG_USER_OBJECT.insertStgUser.stgExtUserInfo.map(function(item){ return item.email });
		  var isDuplicate = valueArr.some(function(item, idx){ 
		      return valueArr.indexOf(item) != idx 
		  });
		  
		  if(isDuplicate) {
				$scope.dialogErrorMessageModel.messageType = 'error';
				$scope.dialogErrorMessageModel.content = '<span>Duplicate email entered (DTL-3).</span>';
				$scope.dialogErrorMessageModel.visible = true;
				$scope.errorMessageModel.visible = false;
				//alert("Remove duplicate user from the uploading recods.");
				return;
		  }
		  $scope.dialogErrorMessageModel.visible = false;
		// General validation  
		for(var key in $scope.userListObj.INSERT_STG_USER_OBJECT.insertStgUser.stgExtUserInfo)
		{
			var userObj = $scope.userListObj.INSERT_STG_USER_OBJECT.insertStgUser.stgExtUserInfo[key];
			if(userObj.$$hashKey) {	
				delete userObj.$$hashKey;
			}
			if(!userObj.firstName || !userObj.lastName || !userObj.email || !userObj.role || !userObj.reportsToUserID || !userObj.organizationName || !userObj.contactZipCode )
			{
				$scope.dialogErrorMessageModel.messageType = 'error';
				$scope.dialogErrorMessageModel.content = '<span>Fill all the mandatory values to submit.</span>';
				$scope.dialogErrorMessageModel.visible = true;
				$scope.errorMessageModel.visible = false;
				return;
			}
			
			if($scope.emailRegExp.test(userObj.email) == false){
				$scope.dialogErrorMessageModel.messageType = 'error';
				$scope.dialogErrorMessageModel.content = '<span>Invalid Email format entered (DTL-3).</span>';
				$scope.dialogErrorMessageModel.visible = true;
				$scope.errorMessageModel.visible = false;
				return;
			}
			
			if($scope.zipCodeRegExp.test(userObj.contactZipCode) === false){
				$scope.dialogErrorMessageModel.messageType = 'error';
				$scope.dialogErrorMessageModel.content = '<span>Invalid format entered (DTL-11).</span>';
				$scope.dialogErrorMessageModel.visible = true;
				$scope.errorMessageModel.visible = false;
				return;
			}

		}
		var fileName = $("#csvFileInput").val().split('/').pop().split('\\').pop();
		$scope.userListObj.INSERT_STG_USER_OBJECT.insertStgUser.stgExtUserFileInfo.fileName = fileName ? fileName : $scope.userListObj.INSERT_STG_USER_OBJECT.insertStgUser.stgExtUserFileInfo.fileName; 
		$scope.userListObj.INSERT_STG_USER_OBJECT.insertStgUser.roleCode = window.parent.rootData.currentRole; 
		$scope.insertExtUsers();
		
		}else{
			$scope.dialogErrorMessageModel.messageType = 'error';
			$scope.dialogErrorMessageModel.content = '<span>Please upload csv file to proceed.</span>';
			$scope.dialogErrorMessageModel.visible = true;
			$scope.errorMessageModel.visible = false;
		}
	  
	  $("#csvFileInput").val('');
  }
    
    $scope.clearUploadedDetails=function(){
		$scope.uploadUsersTableModel.records = [];
		$scope.uploadUsersTableModel.totalRecordsCount = 0;
	    $scope.lines = [];
	    $("#csvFileInput").val('');
		$scope.userListObj = angular.copy($scope.mainObj);
		$scope.reset();
    }
    
    $scope.userDetailsTableModel.sendReminderMail = function(userObj){		 
		 // call email service here sendUserRegistrationEmailModel
    	$scope.errorMessageModel.visible = false;
    //	 $scope.sendUserRegistrationEmail(userObj.EMAIL,userObj.STG_EXT_USER_INFO_KEY);	
    	 //$scope.error
    	 $scope.sendUserRegistrationEmail(userObj.stgExtUserInfoKey,userObj.email);
    	 
    }
    
    $scope.sendUserRegistrationEmail = function(userkey,email){
		//	$scope.emailInpuObj.userEmail = email;
		//	$scope.emailInpuObj.extUserKey = userkey;			
			
			var deferred = $.Deferred();
			var parameters = {
					stgExtUserInfoKey : userkey		
			};
			
        	$http.post('/gcm-app-services/useradmin/sendUserRegistrationMailForExtUser',reqParams(parameters),config).then(function(response) {
				if(response.data.status === 'SUCCESS' ){
					$scope.errorMessageModel.messageType = 'success';
			         $scope.errorMessageModel.content = "<span>Reminder email triggered to "+email+"</span>";
			        $scope.errorMessageModel.visible = true;
			         $scope.errorMessageModel.messageVisibleTime = 3000;
			/**		$timeout(function(){						
					  deferred.resolve(response);
					}); */						
				}
				else{
					$timeout(function(){
						$scope.errorMessage = "Unable to send mail.";
						deferred.reject();
					});
				}			
			},function(error) {
				deferred.reject(errorResponse);
			});				
			return deferred;
		}
   
	function saveFailedRecords(fileObj){    	
//		$scope.failedUserObjs = angular.copy($scope.mainObj);
//		$scope.tupleObj = angular.copy($scope.failedUserObjs.UpdateStgExtUserInfo.tuple); 
		var isRecordEdit = false;  
		var userObjArray = [];
		
		for(var key in $scope.userFileRecords)
		{
				var userFileRecord = $scope.userFileRecords[key];
				if(userFileRecord.edit)
				{
					isRecordEdit = true;
						for(var i in $scope.userFileRecordObjects)
						{
							var  userFileRecordObj = $scope.userFileRecordObjects[i];	
							if(!userFileRecord.firstName || !userFileRecord.lastName || !userFileRecord.email
								 || !userFileRecord.role || !userFileRecord.reportsToUserID || !userFileRecord.organizationName )
								 {
								 		 $scope.errorMessageModel.messageType = 'error';
										 $scope.errorMessageModel.content = '<span>Fill all mandatory values to save</span>';
										 $scope.errorMessageModel.visible = true;
								 		return;
								 }	
							if($scope.emailRegExp.test(userFileRecord.email) == false){
									$scope.errorMessageModel.messageType = 'error';
									$scope.errorMessageModel.content = '<span>Email is not valid.</span>';
									$scope.errorMessageModel.visible = true;
									return;
							}
							
							if(userFileRecord.stgExtUserInfoKey == userFileRecordObj.stgExtUserInfoKey)
							{
								if(userFileRecordObj.$$hashKey) {
									delete userFileRecordObj.$$hashKey;
								} 
															
	    						userFileRecordObj.stgExtUserInfoKey = userFileRecord.stgExtUserInfoKey;
	    						userFileRecordObj.firstName = userFileRecord.firstName;
	    						userFileRecordObj.lastName = userFileRecord.lastName;
	    						userFileRecordObj.email = userFileRecord.email;
	    						userFileRecordObj.role = userFileRecord.role;
	    						userFileRecordObj.reportsToUserID = userFileRecord.reportsToUserID;
	    						userFileRecordObj.contactAddress1 = userFileRecord.contactAddress1;
	    						userFileRecordObj.contactAddress2 = userFileRecord.contactAddress2;
	    						userFileRecordObj.contactCity = userFileRecord.contactCity;
	    						userFileRecordObj.contactState = userFileRecord.contactState;
	    						userFileRecordObj.contactZipCode = userFileRecord.contactZipCode;
	    						userFileRecordObj.organizationName = userFileRecord.organizationName;
	    						userFileRecordObj.accMgrUserID = userData.userId;
	    						userFileRecordObj.gcmVendorKey = "";
	    						userFileRecordObj.createdBy = userData.userId;
	    						userFileRecordObj.modifiedBy = userData.userId;
	    						
	    						var userFileObj = $scope.userListObj.INSERT_STG_USER_OBJECT.insertStgUser.stgExtUserFileInfo;
	    						userFileObj.stgExtUserFileInfoKey = userFileRecord.stgExtUserFileInfoKey;
	    						userFileObj.fileName = userFileRecord.fileName;
	    						userFileObj.gcmGroupKey = $scope.dataModel.gcmGroupKey;
	    						userFileObj.uploadedBy = userData.userId;
	    						userFileObj.createdBy = userData.userId;
	    						userFileObj.modifiedBy = userData.userId;
	    						
	    						userObjArray.push(userFileRecordObj);
	    						    						
	    						$scope.userListObj.INSERT_STG_USER_OBJECT.insertStgUser.stgExtUserInfo = userObjArray;
								$scope.userListObj.INSERT_STG_USER_OBJECT.insertStgUser.stgExtUserFileInfo = userFileObj;
								$scope.userListObj.INSERT_STG_USER_OBJECT.insertStgUser.roleCode = window.parent.rootData.currentRole; 
								$scope.updateExtUsers();
	    						
							}
						}
				}
		}   		
		if(isRecordEdit)
		{
	/**		$scope.userTableModel.expandedRowIndex = -1;
			$scope.errorMessageModel.messageType = 'success';
	        $scope.errorMessageModel.content = "<span>User details saved Successfully.</span>";
	        $scope.errorMessageModel.visible = true;
	        $scope.errorMessageModel.messageVisibleTime = 3000;
			$scope.synchronizeUserData(readFileRecordsModel,"");
			$scope.readUploadHistory(); */
		}
}

    $scope.openDetailedGrid=function(fileObj){
    	$scope.errorMessageModel.visible = false;
		$scope.fileKeyInpuObj.STG_EXT_USER_FILE_INFO_KEY=fileObj.stgExtUserFileInfoKey;
    	$scope.fileKeyInpuObj.fileName = fileObj.fileName;
    //	$scope.fileKeyInpuObj.stgExtUserFileInfoKey : fileObj.stgExtUserFileInfoKey;
		$scope.readFileRecords();
    }
		
	$scope.readValidatedExtUsers = function(){
		var deferred = $.Deferred();

		var parameters = {
			// Set file key as input here STG_EXT_USER_FILE_INFO_KEY
					parameters : {}
		};
		
		$http.post('/gcm-app-services/useradmin/getValidatedExtUsers',parameters).then(function(response) {
			//console.log(response);
			if(response.data.status === 'SUCCESS' ){
				$timeout(function(){
					$scope.validatedUsers = response;
				  deferred.resolve(response);
				});						
			}
			else{
				$timeout(function(){
					$scope.validatedUsers = [];
					$scope.errorMessage = "Unable to read validated users.";
					deferred.reject();
				});
			}			
		},function(error) {
			deferred.reject(errorResponse);
		});		
		return deferred;
	}
	
	$scope.updateExtUsers = function(){
		var deferred = $.Deferred();
			
		$http.post('/gcm-app-services/useradmin/validateAndUpdateExtUsers',$scope.userListObj.INSERT_STG_USER_OBJECT).then(function(response) {
			//console.log(response);
			if(response.data.status === 'SUCCESS' ){
				$scope.extUsersResponse = response;	
				$scope.userTableModel.expandedRowIndex = -1;
				$scope.errorMessageModel.messageType = 'success';
		        $scope.errorMessageModel.content = "<span>User details saved Successfully.</span>";
		        $scope.errorMessageModel.visible = true;
		        $scope.errorMessageModel.messageVisibleTime = 3000;
				$scope.readUploadHistory();
			}
		},function(error) {
			deferred.reject(error.data.errorMessage);
		});
		
		return deferred;	
	}

	$scope.insertExtUsers = function(){
		var deferred = $.Deferred();
		
		$http.post('/gcm-app-services/useradmin/validateAndInsertExtUsers',$scope.userListObj.INSERT_STG_USER_OBJECT).then(function(response) {
			//console.log(response);
			if(response.data.status === 'SUCCESS' ){
				$scope.extUsersResponse = response;	
				$scope.readUploadHistory();
				$scope.clearUploadedDetails();
				$scope.showUserUploadDialog = false;
			}
		},function(error) {
			deferred.reject(error.data.errorMessage);
		});
		
		return deferred;	
	}
	
    $scope.ctrlFn = function (arg) {
    	$timeout(function(){
			$scope.uploadUsersTableModel.records = [];
			$scope.uploadUsersTableModel.totalRecordsCount = 0;
			$scope.processData(arg);
        });
        
    }

    $scope.processData = function (strData, strDelimiter) {
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");

        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                    // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                    // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
        );
        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];
        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;
        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec(strData)) {

            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[1];

            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push([]);
            }
            var strMatchedValue;
            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[2]) {
                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                strMatchedValue = arrMatches[2].replace(
                    new RegExp("\"\"", "g"),
                    "\""
                );
            } else {
                // We found a non-quoted value.
                strMatchedValue = arrMatches[3];
            }
            // Now that we have our value string, let's add
            // it to the data array.
            arrData[arrData.length - 1].push(strMatchedValue);
        }
        //$scope.userListObj = angular.copy($scope.mainObj);
        $scope.csv2json((arrData));
        // Return the parsed data.
        // return ( arrData );
    }
    
    $scope.dataModel.isFileLoaded = $scope.isFileLoaded = function(){
    	
		if($scope.lines.length > 0 ) {
			
			return true;
		}else{
			false;
		}
    }
    
    $scope.fileKeyInpuObj = {
    		"STG_EXT_USER_FILE_INFO_KEY": "PARAMETER" ,
    		"fileName": "PARAMETER"
    }
    
    $scope.emailInpuObj = {
		"userEmail": "PARAMETER" ,
		"extUserKey": "PARAMETER"
    }
    
    $scope.mainObj = {
    		  "INSERT_STG_USER_OBJECT": {
    		    "insertStgUser": {
    		    	"stgExtUserFileInfo" : {
    		        "fileName": "PARAMETER",
    	            "gcmGroupKey": "PARAMETER",
    	            "uploadedBy": "PARAMETER",
    	            "createdBy": "PARAMETER",
    	            "modifiedBy": "PARAMETER"
    		      },
    		      "stgExtUserInfo": {
    		        "firstName": "PARAMETER",
    		        "lastName": "PARAMETER",
    		        "email": "PARAMETER",
    		        "organizationName": "PARAMETER",
    		        "role": "PARAMETER",
    		        "reportsToUserID": "PARAMETER",
    		        "accMgrUserID": "PARAMETER",
    	            "gcmVendorKey": "PARAMETER", 
    		        "contactAddress1": "PARAMETER",
    		        "contactAddress2": "PARAMETER",
    		        "contactCity": "PARAMETER",
    		        "contactState": "PARAMETER",
    		        "contactZipCode": "PARAMETER",
    		        "createdBy": "PARAMETER",
    	            "modifiedBy": "PARAMETER"

    		      }
    		    }
    		  }
    };

	$scope.updateUserObj = {
	  "UpdateStgExtUserInfo": {
	    "tuple": {
	      "old": {
	        "STG_EXT_USER_INFO": {
	          "STG_EXT_USER_INFO_KEY": "PARAMETER"
	        }
	      },
	      "new": {
	        "STG_EXT_USER_INFO": {
	          "STG_EXT_USER_INFO_KEY": "PARAMETER",
	          "FIRST_NAME": "PARAMETER",
	          "LAST_NAME": "PARAMETER",
	          "EMAIL": "PARAMETER",
	          "HEALTH_PLAN": "PARAMETER",
	          "ROLE": "PARAMETER",
	          "REPORTS_TO_USERID": "PARAMETER",
	          "STG_EXT_USER_FILE_INFO_KEY": "PARAMETER",
	          "CONTACT_ADDRESS_1": "PARAMETER",
	          "CONTACT_ADDRESS_2": "PARAMETER",
	          "CONTACT_CITY": "PARAMETER",
	          "CONTACT_STATE": "PARAMETER",
	          "CONTACT_ZIP_CODE": "PARAMETER",
	          "ORGANIZATION_NAME": "PARAMETER"
	        }
	      }
	    }
	  }
	};

	$scope.userListObj = angular.copy($scope.mainObj);
	
	 $scope.uploadUsersTableModel.change=function()
	 {
	     userObj.isFirstNameNotValid=false;
	    	
	  }
	


	$scope.csv2json = function (csv) {
		$scope.dataModel.errorMsg = false;
		$scope.dataModel.showUploadError=false;
	    var array = csv;
		$scope.userListObj = angular.copy($scope.mainObj);
	    var userObjStr = $scope.userListObj.INSERT_STG_USER_OBJECT.insertStgUser.stgExtUserInfo;
	    var fileObj = $scope.userListObj.INSERT_STG_USER_OBJECT.insertStgUser.stgExtUserFileInfo;
	    var colHeaders = ["FirstName","LastName","Email","OrganizationName","Role","ReportsToManagerUserId","ContactAddress1","ContactAddress2","ContactCity","ContactState","ContactZipCode"];
	    var userObjArray = [];
	
	   /* if(array.length <= 2 )
	    {
	    	$scope.dataModel.errorMsg = true; 
	    	return;
	    }*/
	    if(array[0].length > colHeaders.length){
	    	$scope.dataModel.showUploadError=true;
	    	$scope.dataModel.uploadErrorMsg = 'New User Registration File must contain exactly 1 Header Record on line 1.';	
	    	return;
	    }
	    else if(array[0].length !== colHeaders.length){
	    	$scope.dataModel.showUploadError=true;
	    }
	    else{
	    	for(var j=0;j<array[0].length;j++)
	    	{
	    		if(colHeaders.indexOf(array[0][j].trim()) === -1)
	    		{
	    			$scope.dataModel.showUploadError=true;
	    			break;
	    		}
	    	}
	    }
	    if($scope.dataModel.showUploadError)
	    {
	    	$scope.dataModel.uploadErrorMsg = 'One or more required Header Record Fields are missing or invalid.';	
	    	return;
	    }
		
	    for(var j=0;j<colHeaders.length;j++)
	   	{
	    	for(var i=1;i<array.length;i++)
	    		{
			   		if(array[0][j]==array[i][j])
			   		{
			   			$scope.dataModel.showUploadError=true;
						$scope.dataModel.uploadErrorMsg = 'New User Registration File must contain exactly 1 Header Record on line 1.';	
						return;
			   		}
	    		}
	   	}
	    var isDataRowPresent = false;
	    for(var j=0;j<colHeaders.length;j++)
	   	{
	    	if(!(array[1][j]==="" || array[1][j]===undefined))
	    		isDataRowPresent=true;
		   		
	   	}
	    if(isDataRowPresent===false)
    	{
	    	$scope.dataModel.showUploadError=true;
	    	$scope.dataModel.uploadErrorMsg =  'New User Registration File must contain at least 1 Detail Record after line 1.';
	    	return;
    	}
	    // Read header and verify the columns
	    
	    if(array[1].length !== colHeaders.length)
	    {
	    	$scope.dataModel.showUploadError=true;
	    	$scope.dataModel.uploadErrorMsg = 'New User Registration File must contain at least 1 Detail Record after line 1.';	
	    	return;
	    }
	   // $scope.uploadUsersTableModel.isFirstNameNotValid=[];
	    for (var i = 2; i < array.length; i++) {
	    	var userObj = angular.copy(userObjStr);
	        userObj.firstName = $scope.removeSpecial(array[i-1][0]);
	        userObj.lastName = $scope.removeSpecial(array[i-1][1]);
	        userObj.email = $scope.removeSpecial(array[i-1][2]);
	        userObj.organizationName = $scope.removeSpecialOrgRole(array[i-1][3]);
	        userObj.role = $scope.removeSpecialOrgRole(array[i-1][4]);
	        userObj.reportsToUserID = $scope.removeSpecial(array[i-1][5]);
	        userObj.accMgrUserID = userData.userId;
	        userObj.gcmVendorKey = "";
	        userObj.contactAddress1 = $scope.removeSpecial(array[i-1][6]);
	        userObj.contactAddress2 = $scope.removeSpecial(array[i-1][7]);
	        userObj.contactCity = $scope.removeSpecial(array[i-1][8]);
	        userObj.contactState = $scope.removeSpecial(array[i-1][9]);
	        userObj.contactZipCode = $scope.removeSpecial(array[i-1][10]);
	        userObj.createdBy = userData.userId;
			userObj.modifiedBy = userData.userId;
			userObj.isFirstNameNotValid=false;
			userObj.isLastNameNotValid=false;
			userObj.isEmailNotValid=false;
			userObj.isOrganizationNameNotValid=false;
			userObj.isRoleNotValid=false;
			userObj.isReportsToUserIDNotValid=false;
			userObj.isContactAddress1NotValid=false;
			userObj.isContactAddress2NotValid=false;
			userObj.isContactCityNotValid=false;
			userObj.isContactStateNotValid=false;
			userObj.isContactZipCodeNotValid=false;
			
			if(userObj.firstName && $scope.nameRegExp.test(userObj.firstName) == false){
				userObj.isFirstNameNotValid=true;
			}
			
			if(userObj.lastName && $scope.nameRegExp.test(userObj.lastName) == false){
				userObj.isLastNameNotValid=true;
			}
			
			if(userObj.email && $scope.emailRegExp.test(userObj.email) == false){
				userObj.isEmailNotValid=true;
			}
			
			if(userObj.contactAddress1 && $scope.addressRegExp.test(userObj.contactAddress1) == false){
				userObj.isContactAddress1NotValid=true;
			}
			
			if(userObj.contactAddress2 && $scope.addressRegExp.test(userObj.contactAddress2) == false){
				userObj.isContactAddress2NotValid=true;
			}
			
			if(userObj.contactCity && $scope.addressRegExp.test(userObj.contactCity) == false){
				userObj.isContactCityNotValid=true;
			}
			
			if(userObj.contactState && $scope.statesRegExp.test(userObj.contactState) == false){
				userObj.isContactStateNotValid=true;
			}
			
			if(userObj.contactZipCode && $scope.zipCodeRegExp.test(userObj.contactZipCode) == false){
				userObj.isContactZipCodeNotValid=true;
			}
			
			
			if(!userObj.firstName && !userObj.lastName && !userObj.email && 
		        !userObj.organizationName && !userObj.role && !userObj.reportsToUserID && !userObj.contactAddress1
		        && !userObj.contactAddress2 && !userObj.contactCity && !userObj.contactState && !userObj.contactZipCode ){
		    }
	        else{
	      		userObjArray.push(userObj);
			}	
			$scope.lines = userObjArray;
			
			fileObj.fileName = $("#csvFileInput").val().split('/').pop().split('\\').pop();
			fileObj.gcmGroupKey = $scope.dataModel.gcmGroupKey;
			fileObj.uploadedBy = userData.userId;
			fileObj.createdBy = userData.userId;
			fileObj.modifiedBy = userData.userId;			
			$scope.userListObj.INSERT_STG_USER_OBJECT.insertStgUser.stgExtUserInfo = userObjArray;
			$scope.userListObj.INSERT_STG_USER_OBJECT.insertStgUser.stgExtUserFileInfo = fileObj;
	    }
		$timeout(function(){
			$scope.uploadUsersTableModel.records = $scope.lines;
			$scope.uploadUsersTableModel.totalRecordsCount = $scope.lines.length;
        });
	}
	
    $scope.isNumber =function(text) {
	  var reg = new RegExp('[0-9]+$');
	  if(text) {
	    return reg.test(text);
	  }
	  return false;
	}
 
	$scope.removeSpecial = function(text) {
		if(text) {
			var lower = text.toLowerCase();
			var upper = text.toUpperCase();
			var result = "";
			for(var i=0; i<lower.length; ++i) {
				if(lower[i]=='"' && lower[i+1]=='\,'&& lower[i+2]=='"')
				{
					result += text[i+1];
					i=i+2;
				}
				else if($scope.isNumber(text[i]) || (lower[i] != upper[i]) || (lower[i].trim() === '') || (lower[i].trim() === ';')|| (lower[i].trim() === '@')|| (lower[i].trim() === '.')|| (lower[i].trim() === '_') || lower[i]==='-' || lower[i]==='\'' || lower[i]==='$'|| lower[i]==='\.'|| lower[i]==='#'|| lower[i]==='/,' || lower[i]==='&' || lower[i]==='%'  || lower[i]===')'|| lower[i]==='(') {
					result += text[i];
				}
			}
			return result;
		}
		return '';
	}
	
	$scope.removeSpecialOrgRole = function(text) {
		if(text) {
			var lower = text.toLowerCase();
			var upper = text.toUpperCase();
			var result = "";
			for(var i=0; i<lower.length; ++i) {
				if(lower[i]=='"' && lower[i+1]=='\,'&& lower[i+2]=='"')
				{
					result += text[i+1];
					i=i+2;
				}
				else if($scope.isNumber(text[i]) || (lower[i] === '|')|| (lower[i] != upper[i]) || (lower[i].trim() === '') || (lower[i].trim() === ';')|| (lower[i].trim() === '@')|| (lower[i].trim() === '.')|| (lower[i].trim() === '_')||lower[i]==='-' || lower[i]==='\'' || lower[i]==='$'|| lower[i]==='\.'|| lower[i]==='#'|| lower[i]==='/,' || lower[i]==='&'|| lower[i]==='%'|| lower[i]===')'|| lower[i]==='(') {
					result += text[i];
				}
			}
			return result;
		}
		return '';
	}

	
    // gets the template to ng-include for a table row / item
    $scope.getTemplate = function (clientDetail) {        
        return 'edit';
    };

    /**
     * Edit the selected Client Details
     * @param clientDetail
     */
    $scope.editClientDetail = function (clientDetail) {
        $scope.selected = angular.copy(clientDetail);
    };

    /**
     * Update the edited client details
     * @param idx
     */
    $scope.saveClientDetail = function (idx) {
        $scope.lines[idx] = angular.copy($scope.selected);
        $scope.reset();
    };

    /**
     * Reset Client Details
     */
    $scope.reset = function () {
        $scope.selected = {};
    };
    
    /**
     * Post the JSON data
     */
    $scope.postJsonData = function () {
        $scope.fileInfo = {
            STG_EXT_USER_FILE_INFO: {
                FILE_NAME: $("#csvFileInput").val().split('/').pop().split('\\').pop()
            }
        };
        $scope.userInfo = {
            STG_EXT_USER_INFO: $scope.lines
        };

        $scope.finalObject = {
            INSERT_STG_USER: angular.extend($scope.fileInfo, $scope.userInfo)
        };
    }
})


/**
 * File Reader Directive
 */
administrationmodule.directive('fileReader', function ($timeout, dataServiceModel) {
    return {
        scope: {
            fileReader: "=",
            fromDirectiveFn: '=method',
            fileName: "=",
            fileType: "="
        },
        link: function (scope, element) {
            $(element).on('change', function (changeEvent) {
                var files = changeEvent.target.files;
                var showUploadError = false;
                var uploadErrorMsg = '';
                scope.dataModel = dataServiceModel;
                if (files.length) {
                    var r = new FileReader();
                    r.onload = function (e) {
                        var contents = e.target.result;
                        
                        scope.$apply(function () {
                            scope.fileReader = contents;
                            scope.fromDirectiveFn(contents);
                            scope.fileName = files[0].name;
                        });
                    };
                    if(files[0].type == "application/vnd.ms-excel" || files[0].type == "text/plain" || files[0].type == "text/x-csv" || files[0].type == "text/csv"){
                    	r.readAsText(files[0]);
                    	showUploadError = false;
                  	}else{ 
                  		scope.dataModel.uploadErrorMsg = 'New User Registration File must be in CSV format.';
                  		showUploadError = true;
//                  	scope.errorMessageModel.messageType = 'error';
//            			scope.errorMessageModel.content = "<span>'CSV file format only supported.</span>";
//            			scope.errorMessageModel.visible = true;
                  	}
                    $timeout(function(){
                    	scope.dataModel.showUploadError = showUploadError;
                    });
                }
            });
        }
    };
});