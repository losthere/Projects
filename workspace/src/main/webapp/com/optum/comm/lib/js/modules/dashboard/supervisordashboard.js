var supervisorModule = angular.module("supervisorDashboard",[ 'uitk.component.uitkDynamicTable', 'uitk.component.uitkIconFont', 'uitk.component.uitkMessage', 'uitk.uitkUtility', 'staticDataService',
			'uitk.component.uitkDialog','uitk.component.uitkButton','uitk.component.uitkPanel', 'uitk.component.tabs','uitk.component.uitkPieChart', 'ngDialog']);

supervisorModule.factory("dataServiceModel", function() {
	var dataObj = {};
	dataObj.retrievalCounts = [];
	dataObj.codingCounts = [];
	dataObj.codingQACounts = [];
	dataObj.schedulingStatusCounts = {};
	dataObj.schedulingOutreachCounts = {};
	dataObj.schedulingOnsiteCounts = {};
	dataObj.schedulingEmrCounts = {};
	return dataObj;
});

supervisorModule.controller('supervisorDashboardCtrl',
		function($scope, $compile, $timeout, $http, staticDataService, dataServiceModel) {
		$scope.dataModel = dataServiceModel;
		$scope.dataModel.pendReasonShow = false;
		$scope.dataModel.CNAReasonShow = false;
		$scope.dataModel.showChart = false;
		$scope.dataModel.outreachShowChart = false;
		$scope.dataModel.onsiteShowChart = false;
		$scope.dataModel.emrShowChart = false;
		$scope.dataModel.retrievalShowChart = false;
		$scope.dataModel.pendStatusShowChart = false;
		$scope.dataModel.codingShowChart = false;
		$scope.dataModel.codingQAShowChart = false;
		$scope.dataModel.projectSelect = "0";
		$scope.dataModel.viewSummarySelect=null;
		var rootData=window.parent.rootData?window.parent.rootData:{};
		if(rootData && ( rootData.currentRole=="OIM" || rootData.currentRole=="OPM") ){
			$scope.dataModel.viewSummarySelect="OPTUM";
		}
		else{
			$scope.dataModel.viewSummarySelect = "CLIENT";	
		}
		$scope.organizationList = rootData.getVendorsByRole(rootData.currentRole);
		$scope.dataModel.currentRole = rootData.currentRole;
		$scope.dataModel.currentRoleName = rootData.currentRoleName;
		$scope.dataModel.isClientView =($scope.dataModel.viewSummarySelect == "CLIENT")?true:false; 
		var userObj = optumUI.getUser();
		$scope.dataModel.loginUserId = optumUI.getAuthUser();
		$scope.dataModel.loginUserKey = userObj.getLoggedInUserKey();
		$scope.dataModel.currentGroupKey = userObj.getCurrentGroupKey();
		$scope.dataModel.currentDate = new Date();
		$scope.searchResults = [];
		
		var config = {
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		};
		
		function reqParams(params) {
			var queryParams = "";
			for (var key in params) {
				queryParams += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
			}
			return queryParams;
		}
		
		$scope.isBusFuncConfigure = function() {
			$scope.dataModel.showQAChart = false;
			$scope.dataModel.gcmConfigInput = {
					groupKey :$scope.dataModel.currentGroupKey,
					region : $scope.dataModel.region,
					busFunckey:6,
					busFuncDetailKey:null,
					configType:'FUNCTION_ENABLED',
					configValue:'TRUE',
					userKey : $scope.dataModel.loginUserKey,
					userId  : $scope.dataModel.loginUserId,
					roleCode : rootData.currentRole,
					matchType: 'PARTIAL'
			};
		$http.post('/gcm-app-services/masterdata/isBusFuncConfigured',$scope.dataModel.gcmConfigInput).then(function(response) {
			if(response.data.result && response.data.result.length > 0){
				$scope.qaConfiguredRegionList = response.data.result;
				for(var i = 0; i < $scope.qaConfiguredRegionList.length; i++){
					if($scope.dataModel.region == $scope.qaConfiguredRegionList[i].key){
						$scope.dataModel.showQAChart = true;
						break;
					}
				}				
			}else{
				$scope.dataModel.showQAChart = false;
			}
		}, function(error) {
		});
	}	
		
		$scope.dataModel.schedulingPanelModel = {
                id : 'schedulingPanel',
                title:'Scheduling',
                panelWidth : '100%',
                panelHeight: '500px',
                open : true,
        		collapsible : false,
        		headerClass : 'tk-panl-with-underline',
        		templateUrl: 'schedulingDashboard.htm'
                
		};
		
		$scope.dataModel.retrievalPanelModel = {
                id : 'retrievalPanel',
                title:'Retrieval',
                panelWidth : '100%',
                panelHeight: '500px',
                open : true,
        		collapsible : false,
        		headerClass : 'tk-panl-with-underline',
        		templateUrl: 'retrievalDashboard.htm'
		};
		
		$scope.dataModel.pendManagementPanelModel = {
                id : 'pendManagementPanel',
                title:'Pend Management',
                panelWidth : '100%',
                panelHeight: '500px',
                open : true,
        		collapsible : false,
        		headerClass : 'tk-panl-with-underline',
        		templateUrl: 'pendManagementDashboard.htm',
                
		};
		
		$scope.dataModel.codingPanelModel = {
                id : 'codingPanel',
                title:'Coding',
                panelWidth : '100%',
                panelHeight: '500px',
                open : true,
        		collapsible : false,
        		headerClass : 'tk-panl-with-underline',
        		templateUrl: 'codingDashboard.htm',
		};
		
		$scope.dataModel.codingQAPanelModel = {
                id : 'codingQAPanel',
                title:'Coding QA',
                panelWidth : '100%',
                panelHeight: '500px',
                open : true,
        		collapsible : false,
        		headerClass : 'tk-panl-with-underline',
        		templateUrl: 'codingQADashboard.htm',
                
		};
		
		
		$scope.isRetrievalConfigured = function() {
			return $http.post('/gcm-app-services/masterdata/isRetrievalConfigured', reqParams({
				groupKey : $scope.dataModel.currentGroupKey
			}), config).then(function(response) {
				if(response.data.status == "SUCCESS"){
					$scope.isRetConfigured = response.data.result;
					if($scope.isRetConfigured){
						$scope.isRetConfigured = true;
					}else{
						$scope.isRetConfigured = false;
					}
				}else{
					$scope.isRetConfigured = true;
				}
				if($scope.isRetConfigured){
					$scope.getSchedulingCounts();
					$scope.getPendMgmtCounts();
				}
			}, function(error) {
				$scope.errorMessageModel.messageType = 'error';
				$scope.errorMessageModel.content = '<span> Error while fetching payer configuration.</span>';
			});
		}
		$scope.getSchedulingCounts = function(){
			$scope.dataModel.showChart = false;
			$scope.dataModel.outreachShowChart = false;
			$scope.dataModel.onsiteShowChart = false;
			$scope.dataModel.emrShowChart = false;
			$scope.dataModel.isClientView = ($scope.dataModel.viewSummarySelect == "CLIENT")?true:false;
			$http.post('/gcm-app-services/supervisor/dashboard/getSchedulingCounts', $scope.inputData).then(function(response) {
				if(response && response.data && response.data.result && response.data.result.length > 0){
					for(var i=0; i<response.data.result.length; i++){
						$scope.dataModel.currentDate = response.data.result[i].asOfDate;
						if(response.data.result[i].tabCode == 'STATUS'){
							$scope.dataModel.schedulingStatusCounts = response.data.result[i];
							$scope.loadSchedulingStatusPieChart();
						} else if (response.data.result[i].tabCode == 'OUTREACH'){
							$scope.dataModel.schedulingOutreachCounts = response.data.result[i];
							$scope.loadSchedulingOutreachPieChart();
						} else if (response.data.result[i].tabCode == 'ONSITE'){
							$scope.dataModel.schedulingOnsiteCounts = response.data.result[i];
							$scope.loadSchedulingOnsitePieChart();
						} else if (response.data.result[i].tabCode == 'EMR'){
							$scope.dataModel.schedulingEmrCounts = response.data.result[i];
							$scope.loadSchedulingEmrPieChart();
						}
					}
				}else{
					$scope.dataModel.schedulingStatusCounts = {};
					$scope.dataModel.schedulingOutreachCounts = {};
					$scope.dataModel.schedulingOnsiteCounts = {};
					$scope.dataModel.schedulingEmrCounts = {};
				}
			}, function(error) {
				var message = JSON.stringify(error);
			});
		};
		var minThreshold=.05;
		$scope.loadSchedulingStatusPieChart = function(){
			$scope.dataModel.schedulingStatusPieChartModel={};
			$scope.dataModel.schedulingStatusPieChartModel = {
		            id: "schedulingStatusPieChart",
		            chartType: "pie",
					description  : "Scheduling Status",
		            donut: true,
		            showA11yDescription: false,
		            tooltips: true,
		            showLegend: false,
		            showLabels: true,
		            showValues:true,
		            optionalLine: false,
		            width: 500,
					chartOptions: function(chart) {
					chart.labelsOutside(false);
					chart.labelThreshold(minThreshold);
						},
					a11yDescription : true,
		            height: 350,
		            data: []
		    };
			var statusMainObj = {
					key: "schedulingStatusSeries",
					values : []
			}
			if($scope.dataModel.schedulingStatusCounts.unassingedCnt > 0){
				var statusUnassigned = {
					"label":  parseInt($scope.dataModel.schedulingStatusCounts.unassignedPct) +"%" ,
                    "value": $scope.dataModel.schedulingStatusCounts.unassingedCnt,
                    "color": "#748C41"
				}
				statusMainObj.values.push(statusUnassigned);
			}
			if($scope.dataModel.schedulingStatusCounts.assignedCnt > 0){
				var statusAssigned = {
						"label":  $scope.dataModel.schedulingStatusCounts.assignedPct +"%" ,
                        "value": $scope.dataModel.schedulingStatusCounts.assignedCnt,
                        "color": "#89A54E"
				}
				statusMainObj.values.push(statusAssigned);
			}
			if($scope.dataModel.schedulingStatusCounts.unscheduledCnt > 0){
				var statusUnScheduled = {
						"label":  $scope.dataModel.schedulingStatusCounts.unscheduledPct +"%" ,
                        "value": $scope.dataModel.schedulingStatusCounts.unscheduledCnt,
                        "color": "#748C41"
				}
				statusMainObj.values.push(statusUnScheduled);
			}
			if($scope.dataModel.schedulingStatusCounts.scheduledCnt > 0){
				var statusScheduled = {
						 "label": $scope.dataModel.schedulingStatusCounts.scheduledPct+"%" ,
                         "value": $scope.dataModel.schedulingStatusCounts.scheduledCnt,
                         "color": $scope.dataModel.isClientView?"#9BBB59":"#89A54E"
				}
				statusMainObj.values.push(statusScheduled);
			}
			if($scope.dataModel.schedulingStatusCounts.pastDueCnt > 0){
				var statusPastDue = {
						"label":  $scope.dataModel.schedulingStatusCounts.pastDuePct+"%"  ,
                        "value": $scope.dataModel.schedulingStatusCounts.pastDueCnt,
                        "color": $scope.dataModel.isClientView?"#B9CD96":"#9BBB59"
				}
				statusMainObj.values.push(statusPastDue);
			}
			if($scope.dataModel.schedulingStatusCounts.completedCnt > 0){
				var statusCompleted = {
						"label":  $scope.dataModel.schedulingStatusCounts.completedPct+"%"  ,
                        "value": $scope.dataModel.schedulingStatusCounts.completedCnt,
                        "color": $scope.dataModel.isClientView?"#D1DEBE":"#B9CD96"
				}
				statusMainObj.values.push(statusCompleted);
			}
			if($scope.dataModel.schedulingStatusCounts.canceledCnt > 0){
				var statusCanceled = {
						 "label":  $scope.dataModel.schedulingStatusCounts.canceledPct+"%"  ,
                         "value": $scope.dataModel.schedulingStatusCounts.canceledCnt,
                         "color": $scope.dataModel.isClientView?"#d5e0c4":"#D1DEBE"
				}
				statusMainObj.values.push(statusCanceled);
			}
			if($scope.dataModel.schedulingStatusCounts.pendCnt > 0){
				var statusPend = {
						"label": $scope.dataModel.schedulingStatusCounts.pendPct+"%" ,
                        "value": $scope.dataModel.schedulingStatusCounts.pendCnt,
                        "color": $scope.dataModel.isClientView?"#E8EEDF":"#d5e0c4"
				}
				statusMainObj.values.push(statusPend);
			}
			if($scope.dataModel.schedulingStatusCounts.cnaCnt > 0){
				var statusCNA = {
						"label": $scope.dataModel.schedulingStatusCounts.cnaPct+"%" ,
                        "value": $scope.dataModel.schedulingStatusCounts.cnaCnt,
                        "color": $scope.dataModel.isClientView?"#f3f6ee":"#E8EEDF"
				}
				statusMainObj.values.push(statusCNA);
			}
			$scope.dataModel.schedulingStatusPieChartModel.data.push(statusMainObj);
			$scope.dataModel.showChart = true;
		}
		
		$scope.loadSchedulingOutreachPieChart = function(){
			$scope.dataModel.schedulingOutreachPieChartModel = {
		            id: "schedulingOutreachPieChart",
		            chartType: "pie",
					description  : "Scheduling OutReach",
		            donut: true,
		            showA11yDescription: false,
		            tooltips: true,
		            showLegend: false,
		            showLabels: true,
		            showValues:true,
		            optionalLine: false,
		            width: 500,
		            height: 350,
					a11yDescription : true,
					chartOptions: function(chart) {
					chart.labelsOutside(false);
					chart.labelThreshold(minThreshold);
						},
		            data: []
			};
			
			var outreachMainObj = {
					key: "schedulingOutreachSeries",
					values : []
			}
			if($scope.dataModel.schedulingOutreachCounts.unassingedCnt > 0){
				var outreachUnassigned = {
						"label":  $scope.dataModel.schedulingOutreachCounts.unassignedPct +"%",
                        "value": $scope.dataModel.schedulingOutreachCounts.unassingedCnt,
                        "color": "#748C41"
				}
				outreachMainObj.values.push(outreachUnassigned);
			}
			if($scope.dataModel.schedulingOutreachCounts.assignedCnt > 0){
				var outreachAssigned = {
						 "label":  $scope.dataModel.schedulingOutreachCounts.assignedPct +"%",
                         "value": $scope.dataModel.schedulingOutreachCounts.assignedCnt,
                         "color": "#89A54E"
				}
				outreachMainObj.values.push(outreachAssigned);
			}
			if($scope.dataModel.schedulingOutreachCounts.scheduledCnt > 0){
				var outreachScheduled = {
						"label": $scope.dataModel.schedulingOutreachCounts.scheduledPct +"%",
                        "value": $scope.dataModel.schedulingOutreachCounts.scheduledCnt,
                        "color": "#9BBB59"
				}
				outreachMainObj.values.push(outreachScheduled);
			}
			if($scope.dataModel.schedulingOutreachCounts.pastDueCnt > 0){
				var outreachPastDue = {
						"label":  $scope.dataModel.schedulingOutreachCounts.pastDuePct +"%",
                        "value": $scope.dataModel.schedulingOutreachCounts.pastDueCnt,
                        "color": "#B9CD96"
				}
				outreachMainObj.values.push(outreachPastDue);
			}
			if($scope.dataModel.schedulingOutreachCounts.completedCnt > 0){
				var outreachCompleted = {
						"label":  $scope.dataModel.schedulingOutreachCounts.completedPct +"%",
                        "value": $scope.dataModel.schedulingOutreachCounts.completedCnt,
                        "color": "#D1DEBE"
				}
				outreachMainObj.values.push(outreachCompleted);
			}
			if($scope.dataModel.schedulingOutreachCounts.canceledCnt > 0){
				var outreachCanceled = {
						"label":  $scope.dataModel.schedulingOutreachCounts.canceledPct +"%",
                        "value": $scope.dataModel.schedulingOutreachCounts.canceledCnt,
                        "color": "#d5e0c4"
				}
				outreachMainObj.values.push(outreachCanceled);
			}
			if($scope.dataModel.schedulingOutreachCounts.pendCnt > 0){
				var outreachPend = {
						"label": $scope.dataModel.schedulingOutreachCounts.pendPct +"%",
                        "value": $scope.dataModel.schedulingOutreachCounts.pendCnt,
                        "color": "#E8EEDF"
				}
				outreachMainObj.values.push(outreachPend);
			}
			if($scope.dataModel.schedulingOutreachCounts.cnaCnt > 0){
				var statusCNA = {
						"label": $scope.dataModel.schedulingOutreachCounts.cnaPct+"%" ,
                        "value": $scope.dataModel.schedulingOutreachCounts.cnaCnt,
                        "color": "#f3f6ee"
				}
				outreachMainObj.values.push(statusCNA);
			}
			$scope.dataModel.schedulingOutreachPieChartModel.data.push(outreachMainObj);
			$scope.dataModel.outreachShowChart = true;
		}
		
		$scope.loadSchedulingOnsitePieChart = function(){
			$scope.dataModel.schedulingOnsitePieChartModel = {
		            id: "schedulingOnsitePieChart",
		            chartType: "pie",
					description  : "Scheduling Onsite",
		            donut: true,
		            showA11yDescription: false,
		            tooltips: true,
		            showLegend: false,
		            showLabels: true,
		            showValues:true,
		            optionalLine: false,
		            width: 500,
		            height: 350,
					a11yDescription : true,
					chartOptions: function(chart) {
					chart.labelsOutside(false);
					chart.labelThreshold(minThreshold);
						},
		            data: []
			}
			var onsiteMainObj = {
					key: "schedulingOnsiteSeries",
					values : []
			}
			if($scope.dataModel.schedulingOnsiteCounts.unassingedCnt > 0){
				var onsiteUnassigned = {
						"label":  $scope.dataModel.schedulingOnsiteCounts.unassignedPct +"%",
                        "value": $scope.dataModel.schedulingOnsiteCounts.unassingedCnt,
                        "color": "#748C41"
				}
				onsiteMainObj.values.push(onsiteUnassigned);
			}
			if($scope.dataModel.schedulingOnsiteCounts.assignedCnt > 0){
				var onsiteAssigned = {
						"label":  $scope.dataModel.schedulingOnsiteCounts.assignedPct +"%",
                        "value": $scope.dataModel.schedulingOnsiteCounts.assignedCnt,
                        "color": "#89A54E"
				}
				onsiteMainObj.values.push(onsiteAssigned);
			}
			if($scope.dataModel.schedulingOnsiteCounts.scheduledCnt > 0){
				var onsiteScheduled = {
						"label":  $scope.dataModel.schedulingOnsiteCounts.scheduledPct +"%",
                        "value": $scope.dataModel.schedulingOnsiteCounts.scheduledCnt,
                        "color": "#9BBB59"
				}
				onsiteMainObj.values.push(onsiteScheduled);
			}
			if($scope.dataModel.schedulingOnsiteCounts.pastDueCnt > 0){
				var onsitePastDue = {
						"label":  $scope.dataModel.schedulingOnsiteCounts.pastDuePct +"%",
                        "value": $scope.dataModel.schedulingOnsiteCounts.pastDueCnt,
                        "color": "#B9CD96"
				}
				onsiteMainObj.values.push(onsitePastDue);
			}
			if($scope.dataModel.schedulingOnsiteCounts.completedCnt > 0){
				var onsiteCompleted = {
						"label":  $scope.dataModel.schedulingOnsiteCounts.completedPct +"%",
                        "value": $scope.dataModel.schedulingOnsiteCounts.completedCnt,
                        "color": "#D1DEBE"
				}
				onsiteMainObj.values.push(onsiteCompleted);
			}
			if($scope.dataModel.schedulingOnsiteCounts.canceledCnt > 0){
				var onsiteCanceled = {
						"label":  $scope.dataModel.schedulingOnsiteCounts.canceledPct +"%",
                        "value": $scope.dataModel.schedulingOnsiteCounts.canceledCnt,
                        "color": "#d5e0c4"
				}
				onsiteMainObj.values.push(onsiteCanceled);
			}
			if($scope.dataModel.schedulingOnsiteCounts.pendCnt > 0){
				var onsitePend = {
						"label":  $scope.dataModel.schedulingOnsiteCounts.pendPct +"%",
                        "value": $scope.dataModel.schedulingOnsiteCounts.pendCnt,
                        "color": "#E8EEDF"
				}
				onsiteMainObj.values.push(onsitePend);
			}
			if($scope.dataModel.schedulingOnsiteCounts.cnaCnt > 0){
				var statusCNA = {
						"label": $scope.dataModel.schedulingOnsiteCounts.cnaPct+"%" ,
                        "value": $scope.dataModel.schedulingOnsiteCounts.cnaCnt,
                        "color": "#f3f6ee"
				}
				onsiteMainObj.values.push(statusCNA);
			}
			$scope.dataModel.schedulingOnsitePieChartModel.data.push(onsiteMainObj);
			$scope.dataModel.onsiteShowChart = true;
		}
		
		$scope.loadSchedulingEmrPieChart = function(){
			$scope.dataModel.schedulingEmrPieChartModel = {
		            id: "schedulingEmrPieChart",
		            chartType: "pie",
					description  : "Scheduling EMR",
		            donut: true,
		            showA11yDescription: false,
		            tooltips: true,
		            showLegend: false,
		            showLabels: true,
		            showValues:true,
		            optionalLine: false,
		            width: 500,
		            height: 350,
					a11yDescription : true,
					chartOptions: function(chart) {
					chart.labelsOutside(false);
					chart.labelThreshold(minThreshold);
						},
		            data: []
			}
			var emrMainObj = {
					key: "schedulingEmrSeries",
					values : []
			}
			if($scope.dataModel.schedulingEmrCounts.unassingedCnt > 0){
				var onsiteUnassigned = {
						 "label":  $scope.dataModel.schedulingEmrCounts.unassignedPct +"%",
                         "value": $scope.dataModel.schedulingEmrCounts.unassingedCnt,
                         "color": "#748C41"
				}
				emrMainObj.values.push(onsiteUnassigned);
			}
			if($scope.dataModel.schedulingEmrCounts.assignedCnt > 0){
				var onsiteAssigned = {
						"label":  $scope.dataModel.schedulingEmrCounts.assignedPct +"%",
                        "value": $scope.dataModel.schedulingEmrCounts.assignedCnt,
                        "color": "#89A54E"
				}
				emrMainObj.values.push(onsiteAssigned);
			}
			if($scope.dataModel.schedulingEmrCounts.scheduledCnt > 0){
				var onsiteScheduled = {
						"label":  $scope.dataModel.schedulingEmrCounts.scheduledPct +"%",
                        "value": $scope.dataModel.schedulingEmrCounts.scheduledCnt,
                        "color": "#9BBB59"
				}
				emrMainObj.values.push(onsiteScheduled);
			}
			if($scope.dataModel.schedulingEmrCounts.pastDueCnt > 0){
				var onsitePastDue = {
						"label":  $scope.dataModel.schedulingEmrCounts.pastDuePct +"%",
                        "value": $scope.dataModel.schedulingEmrCounts.pastDueCnt,
                        "color": "#B9CD96"
				}
				emrMainObj.values.push(onsitePastDue);
			}
			if($scope.dataModel.schedulingEmrCounts.completedCnt > 0){
				var onsiteCompleted = {
						"label":  $scope.dataModel.schedulingEmrCounts.completedPct +"%",
                        "value": $scope.dataModel.schedulingEmrCounts.completedCnt,
                        "color": "#D1DEBE"
				}
				emrMainObj.values.push(onsiteCompleted);
			}
			if($scope.dataModel.schedulingEmrCounts.canceledCnt > 0){
				var onsiteCanceled = {
						"label":  $scope.dataModel.schedulingEmrCounts.canceledPct +"%",
                        "value": $scope.dataModel.schedulingEmrCounts.canceledCnt,
                        "color": "#d5e0c4"
				}
				emrMainObj.values.push(onsiteCanceled);
			}
			if($scope.dataModel.schedulingEmrCounts.pendCnt > 0){
				var onsitePend = {
						 "label":  $scope.dataModel.schedulingEmrCounts.pendPct +"%",
                         "value": $scope.dataModel.schedulingEmrCounts.pendCnt,
                         "color": "#E8EEDF"
				}
				emrMainObj.values.push(onsitePend);
			}
			if($scope.dataModel.schedulingEmrCounts.cnaCnt > 0){
				var statusCNA = {
						"label": $scope.dataModel.schedulingEmrCounts.cnaPct+"%" ,
                        "value": $scope.dataModel.schedulingEmrCounts.cnaCnt,
                        "color": "#f3f6ee"
				}
				emrMainObj.values.push(statusCNA);
			}
			$scope.dataModel.schedulingEmrPieChartModel.data.push(emrMainObj);
			$scope.dataModel.emrShowChart = true;
		}
		
		$scope.dataModel.pendRecordsTableModel =  {
	            records : [], 
	            totalRecordsCount : 0, 
	            fixedHeader: true,
	            columns : [
	                {
	                    columnId : 'gcmReasonDesc',
	                    label : 'Pend Reason',
	                    layoutOrder : 1,
	                    sortable: true,
	                    sortOrder: 1,
	                    cellTemplate : '<span ng-bind="::record.gcmReasonDesc" class="tk-dtbl-as-table-cell"> </span>',
	                },
	                {
	                    columnId : 'reasonPct',
	                    label : 'Percent',
	                    layoutOrder : 2,
	                    sortable: true,
	                    sortOrder: 0,
	                    cellTemplate : '<span ng-bind="::record.reasonPct + \'%\'" class="tk-dtbl-as-table-cell"> </span>'
	                },
	                {
	                    columnId : 'reasonCnt',
	                    label : 'Total',
	                    layoutOrder : 3,
	                    sortable: true,
	                    sortOrder: 0,
	                    cellTemplate : '<span ng-bind="::record.reasonCnt" class="tk-dtbl-as-table-cell"> </span>'
	                },
	                {
	                    columnId : 'reasonCnt1To5',
	                    label : '1-5 Days',
	                    layoutOrder : 4,
	                    sortable: true,
	                    sortOrder: 0,
	                    cellTemplate : '<span ng-bind="::record.reasonCnt1To5" class="tk-dtbl-as-table-cell"> </span>'
	                },
	                {
	                    columnId : 'reasonCnt6To10',
	                    label : '6-10 Days',
	                    layoutOrder : 5,
	                    sortable: true,
	                    sortOrder: 0,
	                    cellTemplate : '<span ng-bind="::record.reasonCnt6To10" class="tk-dtbl-as-table-cell"> </span>'
	                },
	                {
	                    columnId : '11PlusDays',
	                    label : '11+ Days',
	                    layoutOrder : 6,
	                    sortable: true,
	                    sortOrder: 0,
	                    cellTemplate : '<span ng-bind="::record.reasonCnt11Plus" class="tk-dtbl-as-table-cell"> </span>'
	                }]					            
	    };
		
		$scope.dataModel.pendRecordsTableModel.onChange = function(filterCondition) {
			var that = this;
			staticDataService.query(filterCondition, $scope.searchResults, function(result) {
				that.records = result.records;
				that.totalRecordsCount = result.totalRecordsCount;
			});
		};
		
		$scope.dataModel.CNARecordsTableModel =  {
	            records : [], 
	            totalRecordsCount : 0, 
	            fixedHeader: true,
	            columns : [
	                {
	                    columnId : 'gcmReasonDesc',
	                    label : 'CNA Reason',
	                    layoutOrder : 1,
	                    sortable: true,
	                    sortOrder: 1,
	                    cellTemplate : '<span ng-bind="::record.gcmReasonDesc" class="tk-dtbl-as-table-cell"> </span>',
	                },
	                {
	                    columnId : 'reasonPct',
	                    label : 'Percent',
	                    layoutOrder : 2,
	                    sortable: true,
	                    sortOrder: 0,
	                    cellTemplate : '<span ng-bind="::record.reasonPct + \'%\'" class="tk-dtbl-as-table-cell"> </span>'
	                },
	                {
	                    columnId : 'reasonCnt',
	                    label : 'Total',
	                    layoutOrder : 3,
	                    sortable: true,
	                    sortOrder: 0,
	                    cellTemplate : '<span ng-bind="::record.reasonCnt" class="tk-dtbl-as-table-cell"> </span>'
	                },
	                {
	                    columnId : 'reasonCnt1To5',
	                    label : '1-5 Days',
	                    layoutOrder : 4,
	                    sortable: true,
	                    sortOrder: 0,
	                    cellTemplate : '<span ng-bind="::record.reasonCnt1To5" class="tk-dtbl-as-table-cell"> </span>'
	                },
	                {
	                    columnId : 'reasonCnt6To10',
	                    label : '6-10 Days',
	                    layoutOrder : 5,
	                    sortable: true,
	                    sortOrder: 0,
	                    cellTemplate : '<span ng-bind="::record.reasonCnt6To10" class="tk-dtbl-as-table-cell"> </span>'
	                },
	                {
	                    columnId : '11PlusDays',
	                    label : '11+ Days',
	                    layoutOrder : 6,
	                    sortable: true,
	                    sortOrder: 0,
	                    cellTemplate : '<span ng-bind="::record.reasonCnt11Plus" class="tk-dtbl-as-table-cell"> </span>'
	                }]					            
	    };
			
		$scope.dataModel.CNARecordsTableModel.onChange = function(filterCondition) {
			var that = this;
			staticDataService.query(filterCondition, $scope.CNAsearchResults, function(result) {
				that.records = result.records;
				that.totalRecordsCount = result.totalRecordsCount;
			});
		};
		
		$scope.getPendMgmtCounts = function(){
			$scope.dataModel.pendReasonShow = false;
			$scope.dataModel.CNAReasonShow = false;
			$scope.dataModel.pendStatusShowChart = false;
			$http.post('/gcm-app-services/supervisor/dashboard/getPendMgmtCounts', $scope.inputData).then(function(response) {
				if(response && response.data && response.data.result && response.data.result.length > 0){
					//$scope.dataModel.pendPendReasonCounts = [];
					$scope.searchResults = [];
					$scope.dataModel.pendRecordsTableModel.records = [];
					$scope.dataModel.pendRecordsTableModel.totalRecordsCount = 0;
					// for CNA reason tab
					$scope.CNAsearchResults = [];
					$scope.dataModel.CNARecordsTableModel.records = [];
					$scope.dataModel.CNARecordsTableModel.totalRecordsCount = 0;
					for(var i=0; i<response.data.result.length; i++){
						if(response.data.result[i].tabCode == 'STATUS'){
							$scope.dataModel.pendStatusCounts = response.data.result[i];
							$scope.loadPendMgmtPieChart();
						} else if (response.data.result[i].tabCode == 'PEND_REASON'){
							//$scope.dataModel.pendPendReasonCounts.push(response.data.result[i]);
							$scope.searchResults.push(response.data.result[i]);
						} else if (response.data.result[i].tabCode == 'CNA_REASON'){
								$scope.CNAsearchResults.push(response.data.result[i]);
						} 
					}
					$scope.dataModel.pendRecordsTableModel.records = $scope.searchResults;
					$scope.dataModel.pendRecordsTableModel.totalRecordsCount = $scope.searchResults.length;
					$scope.dataModel.pendReasonShow = true;
					/* CNA reason code tab, adding to the variable*/
					$scope.dataModel.CNARecordsTableModel.records = $scope.CNAsearchResults;
					$scope.dataModel.CNARecordsTableModel.totalRecordsCount = $scope.CNAsearchResults.length;
					$scope.dataModel.CNAReasonShow = true;
				}else{
					$scope.dataModel.pendStatusCounts = {};
					$scope.dataModel.pendPendReasonCounts = [];
					$scope.dataModel.pendPendReasonCounts = [];
				}
			}, function(error) {
				var message = JSON.stringify(error);
			});
		};
		
		$scope.loadPendMgmtPieChart = function(){
			$scope.dataModel.pendStatusPieChartModel = {
		            id: "pendStatusPieChart",
		            chartType: "pie",
					description  : "Pend Management",
		            donut: true,
		            showA11yDescription: false,
		            tooltips: true,
		            showLegend: false,
		            showLabels: true,
		            showValues:true,
		            optionalLine: false,
		            width: 500,
		            height: 350,
					a11yDescription : true,
					chartOptions: function(chart) {
					chart.labelsOutside(false);
					chart.labelThreshold(minThreshold);
						},
		            data: []
			}
			var pendMainObj = {
					key: "pendStatusSeries",
					values : []
			}
			if($scope.dataModel.pendStatusCounts.unassingedCnt > 0){
				var pendUnassigned = {
						"label":  $scope.dataModel.pendStatusCounts.unassignedPct +"%",
                        "value": $scope.dataModel.pendStatusCounts.unassingedCnt,
                        "color": "#368195"
				}
				pendMainObj.values.push(pendUnassigned);
			}
			if($scope.dataModel.pendStatusCounts.assignedCnt > 0){
				var pendAssigned = {
						"label":  $scope.dataModel.pendStatusCounts.assignedPct +"%",
                        "value": $scope.dataModel.pendStatusCounts.assignedCnt,
                        "color": $scope.dataModel.isClientView?"#4198af":"#368195"
				}
				pendMainObj.values.push(pendAssigned);
			}
			if($scope.dataModel.pendStatusCounts.releasedCnt > 0){
				var pendReleased = {
						"label":  $scope.dataModel.pendStatusCounts.releasedPct +"%",
                        "value": $scope.dataModel.pendStatusCounts.releasedCnt,
                        "color": $scope.dataModel.isClientView?"#4bacc6":"#4198af"
				}
				pendMainObj.values.push(pendReleased);
			}
			if($scope.dataModel.pendStatusCounts.nonRetrievableCnt > 0){
				var pendNonRetrievable = {
						"label":  $scope.dataModel.pendStatusCounts.nonRetrievablePct +"%",
                        "value": $scope.dataModel.pendStatusCounts.nonRetrievableCnt,
                        "color": $scope.dataModel.isClientView?"#91c3d5":"#4bacc6"
				}
				pendMainObj.values.push(pendNonRetrievable);
			}
			if($scope.dataModel.pendStatusCounts.cnaCnt > 0){
				var pendCNA = {
						"label":  $scope.dataModel.pendStatusCounts.cnaPct +"%",
                        "value": $scope.dataModel.pendStatusCounts.cnaCnt,
                        "color": $scope.dataModel.isClientView?"#a3cddc":"#91c3d5"
				}
				pendMainObj.values.push(pendCNA);
			}
			$scope.dataModel.pendStatusPieChartModel.data.push(pendMainObj);
			$scope.dataModel.pendStatusShowChart = true;
			$scope.dataModel.isClientView = ($scope.dataModel.viewSummarySelect == "CLIENT")?true:false;
		}
		
		$scope.getRetrievalCounts = function(){
			$scope.dataModel.retrievalShowChart = false;
			$http.post('/gcm-app-services/supervisor/dashboard/getRetrievalCounts', $scope.inputData).then(function(response) {
				if(response && response.data && response.data.result && response.data.result.length > 0){
					$scope.dataModel.retrievalCounts = response.data.result;	
					$scope.loadRetrievalPieChart();
				}else{
					$scope.dataModel.retrievalCounts = [];
				}
			}, function(error) {
				var message = JSON.stringify(error);
				//$scope.dataModel.setMessage(message, "error");
			});
		};
		
		$scope.loadRetrievalPieChart = function(){
			$scope.dataModel.retrievalPieChartModel = {
		            id: "retrievalPieChart",
		            chartType: "pie",
		            donut: true,
		            showA11yDescription: false,
		            tooltips: true,
		            showLegend: false,
		            showLabels: true,
		            showValues:true,
		            optionalLine: false,
		            width: 550,
		            height: 350,
					a11yDescription : true,
					chartOptions: function(chart) {
					chart.labelsOutside(false);
					chart.labelThreshold(minThreshold);
						},
		            data: []
			}
			var retrievalMainObj = {
					key: "retrievalSeries",
					values : []
			}
			if($scope.dataModel.retrievalCounts[0].notRetrievedCnt > 0){
				var retrievalNotRetrieved = {
						"label":  $scope.dataModel.retrievalCounts[0].notRetvdPct +"%",
                        "value": $scope.dataModel.retrievalCounts[0].notRetrievedCnt,
                        "color": "#584470"
				}
				retrievalMainObj.values.push(retrievalNotRetrieved);
			}
			if($scope.dataModel.retrievalCounts[0].clientUploadCnt > 0){
				var retrievalClientUpload = {
						"label": $scope.dataModel.retrievalCounts[0].clientUploadPct +"%",
                        "value": $scope.dataModel.retrievalCounts[0].clientUploadCnt,
                        "color": "#664f81"
				}
				retrievalMainObj.values.push(retrievalClientUpload);
			}
			if($scope.dataModel.retrievalCounts[0].emrCnt > 0){
				var retrievalEMR = {
						"label":  $scope.dataModel.retrievalCounts[0].emrPct +"%",
                        "value": $scope.dataModel.retrievalCounts[0].emrCnt,
                        "color": "#71588f"
				}
				retrievalMainObj.values.push(retrievalEMR);
			}
			if($scope.dataModel.retrievalCounts[0].faxCnt > 0){
				var retrievalFax = {
						 "label":  $scope.dataModel.retrievalCounts[0].faxPct +"%",
                         "value": $scope.dataModel.retrievalCounts[0].faxCnt,
                         "color": "#7b609c"
				}
				retrievalMainObj.values.push(retrievalFax);
			}
			if($scope.dataModel.retrievalCounts[0].mailCnt > 0){
				var retrievalMail = {
						"label":  $scope.dataModel.retrievalCounts[0].mailPct +"%",
                        "value": $scope.dataModel.retrievalCounts[0].mailCnt,
                        "color": "#8e78ab"
				}
				retrievalMainObj.values.push(retrievalMail);
			}
			if($scope.dataModel.retrievalCounts[0].mailCdFdCnt > 0){
				var retrievalMail = {
						"label":  $scope.dataModel.retrievalCounts[0].mailCdFdPct +"%",
                        "value": $scope.dataModel.retrievalCounts[0].mailCdFdCnt,
                        "color": "#9c87b7"
				}
				retrievalMainObj.values.push(retrievalMail);
			}
			if($scope.dataModel.retrievalCounts[0].onsiteCnt > 0){
				var retrievalOnsite = {
						"label":  $scope.dataModel.retrievalCounts[0].onsitePct +"%",
                        "value": $scope.dataModel.retrievalCounts[0].onsiteCnt,
                        "color": "#a99bbd"
				}
				retrievalMainObj.values.push(retrievalOnsite);
			}
			if($scope.dataModel.retrievalCounts[0].optumRetvdCnt > 0){
				var retrievalOpturmRetrieved = {
						"label": $scope.dataModel.retrievalCounts[0].optumRetvdPct +"%",
                        "value": $scope.dataModel.retrievalCounts[0].optumRetvdCnt,
                        "color": "#beb4cc"
				}
				retrievalMainObj.values.push(retrievalOpturmRetrieved);
			}
			if($scope.dataModel.retrievalCounts[0].providerUploadCnt > 0){
				var retrievalProviderUpload = {
						 "label":  $scope.dataModel.retrievalCounts[0].providerUploadPct +"%",
                         "value": $scope.dataModel.retrievalCounts[0].providerUploadCnt,
                         "color": "#d1cbdb"
				}
				retrievalMainObj.values.push(retrievalProviderUpload);
			}
			$scope.dataModel.retrievalPieChartModel.data.push(retrievalMainObj);      
			$scope.dataModel.retrievalShowChart = true;
		}
		
		$scope.getCodingCounts = function(){
			$scope.dataModel.codingShowChart = false;
			$http.post('/gcm-app-services/supervisor/dashboard/getCodingCounts', $scope.inputData).then(function(response) {
				if(response && response.data && response.data.result && response.data.result.length > 0){
					$scope.dataModel.codingCounts = response.data.result;		
					$scope.loadCodingPieChart();
				}else{
					$scope.dataModel.codingCounts = [];
				}
			}, function(error) {
				var message = JSON.stringify(error);
				//$scope.dataModel.setMessage(message, "error");
			});
		};
		
		$scope.loadCodingPieChart = function(){
			$scope.dataModel.codingPieChartModel = {
		            id: "codingPieChart",
		            chartType: "pie",
					description  : "Coding",
		            donut: true,
		            showA11yDescription: false,
		            tooltips: true,
		            showLegend: false,
		            showLabels: true,
		            showValues:true,
		            optionalLine: false,
		            width: 550,
		            height: 350,
					a11yDescription : true,
		            data: [],
		            chartOptions: function(chart) {
					chart.labelsOutside(false);
					chart.labelThreshold(minThreshold);
					}
			}
			var codingMainObj = {
					key: "codingSeries",
					values : []
			}
			if($scope.dataModel.codingCounts[0].unassingedCnt > 0){
				var codingUnassigned = {
						"label":  $scope.dataModel.codingCounts[0].unassignedPct +"%",
                        "value": $scope.dataModel.codingCounts[0].unassingedCnt,
                        "color": "#ba7032"
				}
				codingMainObj.values.push(codingUnassigned);
			}
			if($scope.dataModel.codingCounts[0].assignedCnt > 0){
				var codingAssigned = {
						"label":  $scope.dataModel.codingCounts[0].assignedPct +"%",
                        "value": $scope.dataModel.codingCounts[0].assignedCnt,
                        "color": "#db843d"
				}
				codingMainObj.values.push(codingAssigned);
			}
			if($scope.dataModel.codingCounts[0].escalatedCnt > 0){
				var codingEscalated = {
						 "label":  $scope.dataModel.codingCounts[0].escalatedPct +"%",
                         "value": $scope.dataModel.codingCounts[0].escalatedCnt,
                         "color": "#f79646"
				}
				codingMainObj.values.push(codingEscalated);
			}
			if($scope.dataModel.codingCounts[0].codingCompletedCnt > 0){
				var codingCompleted = {
						"label": $scope.dataModel.codingCounts[0].codingCompletedPct +"%",
                        "value": $scope.dataModel.codingCounts[0].codingCompletedCnt,
                        "color": "#f9b590"
				}
				codingMainObj.values.push(codingCompleted);
			}
			if($scope.dataModel.codingCounts[0].rejectedCnt > 0){
				var codingRejected = {
						"label":  $scope.dataModel.codingCounts[0].rejectedPct +"%",
                        "value": $scope.dataModel.codingCounts[0].rejectedCnt,
                        "color": "#fbcfba"
				}
				codingMainObj.values.push(codingRejected);
			}
			$scope.dataModel.codingPieChartModel.data.push(codingMainObj);      
			$scope.dataModel.codingShowChart = true;
		}
		
		$scope.getCodingQACounts = function(){
			$scope.dataModel.codingQAShowChart = false;
			$http.post('/gcm-app-services/supervisor/dashboard/getCodingQACounts', $scope.inputData).then(function(response) {
				if(response && response.data && response.data.result && response.data.result.length > 0){
					$scope.dataModel.codingQACounts = response.data.result;		
					$scope.loadCodingQAPieChart();
				}else{
					$scope.dataModel.codingQACounts = [];
				}
			}, function(error) {
				var message = JSON.stringify(error);
				//$scope.dataModel.setMessage(message, "error");
			});
		};
		
		$scope.loadCodingQAPieChart = function(){
			$scope.dataModel.condingQAPieChartModel = {
		            id: "codingQAPieChart",
		            chartType: "pie",
					description  : "Coding QA",
		            donut: true,
		            showA11yDescription: false,
		            tooltips: true,
		            showLegend: false,
		            showLabels: true,
		            showValues:true,
		            optionalLine: false,
		            width: 550,
		            height: 350,
					a11yDescription : true,
					chartOptions: function(chart) {
					chart.labelsOutside(false);
					chart.labelThreshold(minThreshold);
						},
		            data: []
			}
			var codingQAMainObj = {
					key: "codingQASeries",
					values : []
			}
			if($scope.dataModel.codingQACounts[0].unassingedCnt > 0){
				var codingQAUnassigned = {
						"label":  $scope.dataModel.codingQACounts[0].unassignedPct +"%",
                        "value": $scope.dataModel.codingQACounts[0].unassingedCnt,
                        "color": "#963d3b"
				}
				codingQAMainObj.values.push(codingQAUnassigned);
			}
			if($scope.dataModel.codingQACounts[0].assignedCnt > 0){
				var codingQAAssigned = {
						"label":  $scope.dataModel.codingQACounts[0].assignedPct +"%",
                        "value": $scope.dataModel.codingQACounts[0].assignedCnt,
                        "color": "#b34a47"
				}
				codingQAMainObj.values.push(codingQAAssigned);
			}
			if($scope.dataModel.codingQACounts[0].qaCompletedCnt > 0){
				var codingQACompleted = {
						"label":  $scope.dataModel.codingQACounts[0].codingCompletedPct +"%",
                        "value": $scope.dataModel.codingQACounts[0].qaCompletedCnt,
                        "color": "#ca7e7d"
				}
				codingQAMainObj.values.push(codingQACompleted);
			}
			if($scope.dataModel.codingQACounts[0].qaNotEligCnt > 0){
				var codingQAQANotElig = {
						"label":  $scope.dataModel.codingQACounts[0].qaNotEligPct +"%",
                        "value": $scope.dataModel.codingQACounts[0].qaNotEligCnt,
                        "color": "#ddb6b5"
				}
				codingQAMainObj.values.push(codingQAQANotElig);
			}
			$scope.dataModel.condingQAPieChartModel.data.push(codingQAMainObj);    
			$scope.dataModel.codingQAShowChart = true;
		}
		
		$scope.refreshChartData = function(){
			$scope.isRetrievalConfigured();
			$scope.dataModel.schedulingStatusCounts = {};
			$scope.inputData = {
				"loginUserKey" 		: $scope.dataModel.loginUserKey,
				"userId"			: $scope.dataModel.loginUserId,
				"groupKey"			: $scope.dataModel.currentGroupKey,
				"vendorKey"			: null,
				"roleCode"			: rootData.currentRole,
				"region"			: $scope.dataModel.region,
				"projectKey"		: $scope.dataModel.projectSelect,
				"providerKey"		: null
			}
			$scope.getRetrievalCounts();
			$scope.getCodingCounts();
			$scope.getCodingQACounts();
		};
		
		$scope.getProjectsList = function() {
			$scope.dataModel.projectsList = [];
			$http.post('/gcm-app-services/masterdata/projectsByUser', reqParams({
				loginUserKey : $scope.dataModel.loginUserKey,
				groupKey : $scope.dataModel.currentGroupKey,
				vendor : 0,
				userId : $scope.dataModel.loginUserId,
				roleCode : rootData.currentRole,
				region : $scope.dataModel.region
				}), config).then(function(response) {
				$scope.dataModel.projectsList = response.data.result;
				if(!$scope.qaConfiguredRegionList)$scope.isBusFuncConfigure();
				else{
					$scope.dataModel.showQAChart = false;
					for(var i = 0; i < $scope.qaConfiguredRegionList.length; i++){
						if($scope.dataModel.region == $scope.qaConfiguredRegionList[i].key){
							$scope.dataModel.showQAChart = true;
							break
						}
					}
				}
				
				$scope.refreshChartData();
			}, function(error) {
			});

		};

		$scope.getRegions = function(){
			$http.post('/gcm-app-services/useradmin/getUserRegionsByGroupKey', reqParams({
				userKey : $scope.dataModel.loginUserKey,
				groupKey :$scope.dataModel.currentGroupKey,
				roleCode : rootData.currentRole,
				vendorKey : ''
			}), config).then(function(response) {
				if(response.data.status === 'SUCCESS' ){
					$scope.regionsList = response.data.result;
					if($scope.regionsList && $scope.regionsList.length == 1){
						$scope.dataModel.region =$scope.regionsList[0].key;
						$scope.getProjectsList();
					}
				}
			});
		}
		
		$scope.getRegions();
});