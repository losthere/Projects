var bulkUploadApp = angular.module('bulkUploadApp', ['uitk.component.uitkButton','ngSanitize','uitk.component.uitkIconFont','uitk.component.uitkFileUpload']);
bulkUploadApp.controller("bulkUploadCntrl",function($scope) {
	
	$scope.getBulkValues = function() {
		var str = window.location.search;
		var bulkUploadInputs = str.split('&');
		$scope.retrvlPrefSelect = bulkUploadInputs[0].substring(str.indexOf('=')+1,bulkUploadInputs[0].length);
		$scope.gcmGroupKey = bulkUploadInputs[1].substring(bulkUploadInputs[1].indexOf('=')+1,bulkUploadInputs[1].length);
		
	}
	$scope.getBulkValues();

	 var data = new FormData();
	 
    data.append("source", $scope.retrvlPrefSelect);
    data.append("groupKey", $scope.gcmGroupKey);
    
	$scope.fileUploadViewModel = {			
			id : "FileUploadId",
			acceptFileTypes : "PDF|ZIP", 
			maxFileSize : "1000", //MB
			formData: data,
			multipart :true,
			userData: {"source":$scope.retrvlPrefSelect, "groupKey": $scope.gcmGroupKey},
			uploadUrl : "/gcm-io-web/secure/io/uploadimage",
			sequentialUploads : false, //true or false,
			validFileNameRegEx : "^[\\w^'@{}\\[\\],$=!\\-().~;`_ ]*$",
			selectFilesBtn : "Select Files",
			tablePlaceholderValue: "Drag and drop files here",
			beforeSend : function(xhr,data){
				xhr.setRequestHeader("X-CSRF-HEADER","X-CSRF-TOKEN");
				xhr.setRequestHeader("X-CSRF-PARAM","_csrf");
				xhr.setRequestHeader("X-CSRF-TOKEN",window.csrfToken);
			},

			onLoad : function(){
			}
	}
	
});
