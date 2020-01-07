var userProfileApp = angular.module('userProfileApp', [ 'ngSanitize']);

userProfileApp.factory("dataServiceModel", function() {
	var dataObj = {};
	return dataObj;
});

userProfileApp.controller("userProfileCtrl", function($scope, $http, $compile, $filter, $timeout, dataServiceModel) {

		$scope.dataModel = dataServiceModel;
		var rootData = window.parent ? window.parent.rootData : {};
		$scope.dataModel.currentRole = rootData.currentRole;
		$scope.dataModel.loginUserKey = rootData.userData.userKey;
		$scope.dataModel.groupKey = rootData.userData.groupKey;
		$scope.groupKey = $scope.dataModel.groupKey;
		$scope.dataModel.loginUserId = rootData.userData.userId;
		$scope.viewUserProfileObj = {
			userID : rootData.userData.userId,
			name : rootData.userData.lastName + ', ' + rootData.userData.firstName,
			email : rootData.userData.userEmail,
			supervisor : rootData.userData.approverlastName+', '+rootData.userData.approverfirstName,
			organization : '',
		};
		$scope.viewUserProfileObj.userRoleListModelrecords = [];
		$scope.viewUserProfileObj.userKey = $scope.dataModel.loginUserKey;
		function reqParams(params) {
			var queryParams = "";
			for ( var key in params) {
				queryParams += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
			}
			return queryParams;
		}
		var config = {
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			};
		$scope.dataModel.getOrganizations = function() {
			$http.post('/gcm-app-services/masterdata/vendorsForUserProfile', reqParams({
				'groupKey' : $scope.dataModel.groupKey ? $scope.dataModel.groupKey : $scope.groupKey,
				'userKey' : $scope.viewUserProfileObj.userKey
			}), config).then(function(response) {
				if (response.data && response.data.result) {
					$scope.viewUserProfileObj.organizations = response.data.result;
					if ($scope.viewUserProfileObj.organizations.length > 0) {
						$scope.viewUserProfileObj.vendor = $scope.viewUserProfileObj.organizations[0].key;
						$scope.dataModel.readUserRolesByVendor();
					}
				}

			}, function(error) {
				
			});
		};
		
		$scope.dataModel.getOrganizations();

		$scope.dataModel.readUserRolesByVendor = function() {
			$http.post('/gcm-app-services/user/administration/getUserRolesList', reqParams({
				'userKey' : $scope.viewUserProfileObj.userKey,
				'vendorKey' : $scope.viewUserProfileObj.vendor
			}), config).then(function(response) {
				$scope.viewUserProfileObj.userRoleListModelrecords = response.data.result;
			});
		}
		$scope.dataModel.viewProfileVendorChange = function() {
			$scope.dataModel.readUserRolesByVendor();
		}

	$scope.dataModel.closeUpdateProfile = function() {
		$scope.dataModel.userProfileUIPopup = false;
		$scope.viewUserProfileObj.vendor = $scope.viewUserProfileObj.organizations[0].key;
		$scope.dataModel.readUserRolesByVendor();
		$(".js_user_profile_popup").hide();
	}
});