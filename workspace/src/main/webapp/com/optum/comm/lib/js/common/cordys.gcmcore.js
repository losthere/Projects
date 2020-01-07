/**
 * Emerlad Web Service Plugin
 *
 * Copyright (c) 2013 Cordys
 */
;(function (window, $, undefined) {

	if (!$.cordys) {
		throw new Error("The Cordys HTML5 SDK is required, please ensure it is loaded properly");
	}
	$.cordys.ajax.defaults.isMock = true;

	$.cordys.ajax.defaults.error = function(data){
			var faultString = $(data.responseXML).find("faultstring").text();                
                        if(faultString != "") optumUI.showError(faultString,true);
			return false;
	};

	//GCM Core contains read only models. for read-write like Encounters use cordys.model instead cordys.ajax
	$.cordys.gcmcore = new function(){

		var self = this;

		self.CORE_NS = "http://schemas.optum.com/optum/cpc/mrm/comm/corelist/1.0";
		self.VENDOR_NS = "http://schemas.optum.com/optum/mrm/comm/vendor/1.0";
		self.HEALTH_PLAN_NS = "http://schemas.optum.com/optum/mrm/comm/healthplan/1.0";
		self.TEAM_NS = "http://schemas.optum.com/optum/mrm/comm/useradmin/1.0";

		this.getUserTeams = function(options){

			options = getOptionsForGCMCore("GetOrganizationUnits",
				self.TEAM_NS,
				options
			);
			options.objectName = "OrganizationUnit";

			var callback = options.success;
			options.success = null;
			return new $.cordys.model(options);
		};

		this.getBusinessSegments = function(options){

			options = getOptionsForGCMCore("GetBusinessSegments",
				self.CORE_NS,
				options
			);
			options.objectName = "GCM_BUS_SEGMENT_PROGRAM";

			var callback = options.success;
			options.success = null;
			return new $.cordys.model(options);
		};

		this.getVendors = function(options){
			options = getOptionsForGCMCore("GetVendors",
				self.VENDOR_NS,
				options
			);
			options.objectName = "Vendor";
			var callback = options.success;
			options.success = null;
			return new $.cordys.model(options);
		};

		this.getProjectYearModel = function(options){
					options = getOptionsForGCMCore("GetProjectYears",
						self.CORE_NS,
						options
					);
					options.objectName = "GCM_PROJ_YEAR_LIST";
					var callback = options.success;
					options.success = null;
					return new $.cordys.model(options);
		};

		this.getHealthPlanModel = function(options){
					options = getOptionsForGCMCore("GetDistinctHealthPlans",
						self.HEALTH_PLAN_NS,
						options
					);
					options.objectName = "HealthPlan";
					var callback = options.success;
					options.success = null;
					return new $.cordys.model(options);
		};
	this.getClientsModel = function(options){
					options = getOptionsForGCMCore("GetClients",
						self.HEALTH_PLAN_NS,
						options
					);
					options.objectName = "HealthPlan";
					var callback = options.success;
					options.success = null;
					return new $.cordys.model(options);
		};
		this.getProgramServiceModel = function(options){
				options = getOptionsForGCMCore("GetProgramServicesforDashboard",
					self.CORE_NS,
					options
				);
				options.objectName = "ProgramService";
				var callback = options.success;
				options.success = null;
				return new $.cordys.model(options);
		};
                this.getProgramGroupsModel = function(options){
				options = getOptionsForGCMCore("GetProgramGroups",
					self.CORE_NS,
					options
				);
				options.objectName = "ProgramService";
				var callback = options.success;
				options.success = null;
				return new $.cordys.model(options);
		};

		function getOptionsForGCMCore(methodName, namespace, options) {
			options = options || {};
			options.read = {
				async: true,
				method: methodName,
				namespace: namespace,
				parameters: options.parameters
			},
			options.dataType = 'json'
			return options;
		};

	}
})(window, jQuery)
