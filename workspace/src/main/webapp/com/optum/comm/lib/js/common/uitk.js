/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
/*!
  * Bowser - a browser detector
  * https://github.com/ded/bowser
  * MIT License | (c) Dustin Diaz 2014
  */
!function(e,t){typeof module!="undefined"&&module.exports?module.exports.browser=t():typeof define=="function"&&define.amd?define(t):this[e]=t()}("bowser",function(){function t(t){function n(e){var n=t.match(e);return n&&n.length>1&&n[1]||""}var r=n(/(ipod|iphone|ipad)/i).toLowerCase(),i=/like android/i.test(t),s=!i&&/android/i.test(t),o=n(/version\/(\d+(\.\d+)?)/i),u=/tablet/i.test(t),a=!u&&/[^-]mobi/i.test(t),f;/opera|opr/i.test(t)?f={name:"Opera",opera:e,version:o||n(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)}:/windows phone/i.test(t)?f={name:"Windows Phone",windowsphone:e,msie:e,version:n(/iemobile\/(\d+(\.\d+)?)/i)}:/msie|trident/i.test(t)?f={name:"Internet Explorer",msie:e,version:n(/(?:msie |rv:)(\d+(\.\d+)?)/i)}:/chrome|crios|crmo/i.test(t)?f={name:"Chrome",chrome:e,version:n(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:r?(f={name:r=="iphone"?"iPhone":r=="ipad"?"iPad":"iPod"},o&&(f.version=o)):/sailfish/i.test(t)?f={name:"Sailfish",sailfish:e,version:n(/sailfish\s?browser\/(\d+(\.\d+)?)/i)}:/seamonkey\//i.test(t)?f={name:"SeaMonkey",seamonkey:e,version:n(/seamonkey\/(\d+(\.\d+)?)/i)}:/firefox|iceweasel/i.test(t)?(f={name:"Firefox",firefox:e,version:n(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)},/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(t)&&(f.firefoxos=e)):/silk/i.test(t)?f={name:"Amazon Silk",silk:e,version:n(/silk\/(\d+(\.\d+)?)/i)}:s?f={name:"Android",version:o}:/phantom/i.test(t)?f={name:"PhantomJS",phantom:e,version:n(/phantomjs\/(\d+(\.\d+)?)/i)}:/blackberry|\bbb\d+/i.test(t)||/rim\stablet/i.test(t)?f={name:"BlackBerry",blackberry:e,version:o||n(/blackberry[\d]+\/(\d+(\.\d+)?)/i)}:/(web|hpw)os/i.test(t)?(f={name:"WebOS",webos:e,version:o||n(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)},/touchpad\//i.test(t)&&(f.touchpad=e)):/bada/i.test(t)?f={name:"Bada",bada:e,version:n(/dolfin\/(\d+(\.\d+)?)/i)}:/tizen/i.test(t)?f={name:"Tizen",tizen:e,version:n(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i)||o}:/safari/i.test(t)?f={name:"Safari",safari:e,version:o}:f={},/(apple)?webkit/i.test(t)?(f.name=f.name||"Webkit",f.webkit=e,!f.version&&o&&(f.version=o)):!f.opera&&/gecko\//i.test(t)&&(f.name=f.name||"Gecko",f.gecko=e,f.version=f.version||n(/gecko\/(\d+(\.\d+)?)/i)),s||f.silk?f.android=e:r&&(f[r]=e,f.ios=e);var l="";r?(l=n(/os (\d+([_\s]\d+)*) like mac os x/i),l=l.replace(/[_\s]/g,".")):s?l=n(/android[ \/-](\d+(\.\d+)*)/i):f.windowsphone?l=n(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i):f.webos?l=n(/(?:web|hpw)os\/(\d+(\.\d+)*)/i):f.blackberry?l=n(/rim\stablet\sos\s(\d+(\.\d+)*)/i):f.bada?l=n(/bada\/(\d+(\.\d+)*)/i):f.tizen&&(l=n(/tizen[\/\s](\d+(\.\d+)*)/i)),l&&(f.osversion=l);var c=l.split(".")[0];if(u||r=="ipad"||s&&(c==3||c==4&&!a)||f.silk)f.tablet=e;else if(a||r=="iphone"||r=="ipod"||s||f.blackberry||f.webos||f.bada)f.mobile=e;return f.msie&&f.version>=10||f.chrome&&f.version>=20||f.firefox&&f.version>=20||f.safari&&f.version>=6||f.opera&&f.version>=10||f.ios&&f.osversion&&f.osversion.split(".")[0]>=6||f.blackberry&&f.version>=10.1?f.a=e:f.msie&&f.version<10||f.chrome&&f.version<20||f.firefox&&f.version<20||f.safari&&f.version<6||f.opera&&f.version<10||f.ios&&f.osversion&&f.osversion.split(".")[0]<6?f.c=e:f.x=e,f}var e=!0,n=t(typeof navigator!="undefined"?navigator.userAgent:"");return n._detect=t,n})

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.component.browserDetection', ['uitk.uitkConfigs'])
.directive('uitkBrowserDetection', ['uitkConsumerConfigs', '$window', function (uitkConsumerConfigs, $window) {
    var contextPath = $window.location.pathname.substring(0, $window.location.pathname.indexOf("/", 2)); //Changed window to $window to improve testability
    return {
        restrict: 'AE',
        templateUrl: function (element, attrs) {
            return attrs.templateUrl || "html/browserDetection.html";
        },
        scope: {
          unsupportedBrowserUrl:'@',
          showTemplate:'@'
        },
        link: function ($scope) {
            $scope.bowser = bowser;
            $scope.contextPath = contextPath;
            $scope.supportedBrowsers = uitkConsumerConfigs.SUPPORTEDBROWSERS;
            $scope.unsupportedBrowsers = uitkConsumerConfigs.UNSUPPORTEDBROWSERS;
            var isArray = function(arr) {
                return arr.constructor.toString().indexOf("Array") > -1;
            };

            var include = function(arr, obj) {
                for(var i=0; i<arr.length; i++) {
                    if (arr[i] === obj) return true;
                }
            };

            var readCookie = function(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for(var i=0;i < ca.length;i++) {
                    var c = ca[i];
                    while (c.charAt(0) === ' ') c = c.substring(1,c.length);
                    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
                }
                return null;
            };

            var getMax = function(arr) {
                var max = arr[0];
                for(var i=1; i<arr.length; i++) {
                    if (arr[i] > max)
                        max = arr[i];
                }
                return max;
            };
            var checkBrowserForSupport = function () {
                if (bowser) {
                    var unsupported = $scope.unsupportedBrowsers[bowser.name];
                    var supported = $scope.supportedBrowsers[bowser.name];
                    var version = parseFloat(bowser.version);

                    var onLoadFunc = function() {
                        var detectSupportedBrowserScope = angular.element(document.getElementsByClassName('tk-detectSupportedBrowserScope')[0]).scope();
                        if(detectSupportedBrowserScope){
                            detectSupportedBrowserScope.$apply(function(){
                                detectSupportedBrowserScope.showBrowserDialog=true;
                            });
                        }else{ //below code is deprecated and used for backward compatibility. This entire else block needs to be removed in future release
                            var scope = angular.element(document.getElementsByClassName('tk-lbox')[0]).isolateScope();
                            if(scope) {
                                scope.$apply(function(){
                                    scope.show=true;
                                });
                            }
                        }
                    }

                    if(unsupported !== undefined) {
                        if( (isArray(unsupported) && include(unsupported,version)) || (version <= unsupported)) {
                            $window.location = contextPath + ($scope.unsupportedBrowserUrl || "/uitk-core/browser-detection/html/unsupportedBrowser.html");
                            return;
                        }
                    }

                    if (supported === undefined && readCookie("hideBrowserDetectionMessage") !== 'true') {
                        $window.onload = function () {
                            var detectSupportedBrowserScope = angular.element(document.getElementsByClassName('tk-detectSupportedBrowserScope')[0]).scope();
                            if(detectSupportedBrowserScope){
                                detectSupportedBrowserScope.$apply(function(){
                                    detectSupportedBrowserScope.showBrowserDialog=true;
                                });
                            }else{ //below code is deprecated and used for backward compatibility. This entire else block needs to be removed in future release
                                var scope = angular.element(document.getElementsByClassName('tk-lbox')[0]).isolateScope();
                                if(scope) {
                                    scope.$apply(function(){
                                        scope.show=true;
                                    });
                                }
                            }
                        }
                        return;
                    } else if (supported !== undefined && readCookie("hideBrowserDetectionMessage") !== 'true' && isArray(supported)) {
                        if (!include(supported,version) && supported.indexOf(version)) {
                            $window.onload = function () {
                                var detectSupportedBrowserScope = angular.element(document.getElementsByClassName('tk-detectSupportedBrowserScope')[0]).scope();
                                if(detectSupportedBrowserScope){
                                    detectSupportedBrowserScope.$apply(function(){
                                        detectSupportedBrowserScope.showBrowserDialog=true;
                                    });
                                }else{//below code is deprecated and used for backward compatibility. This entire else block needs to be removed in future release
                                    var scope = angular.element(document.getElementsByClassName('tk-lbox')[0]).isolateScope();
                                    if(scope) {
                                        scope.$apply(function(){
                                            scope.show=true;
                                        });
                                    }
                                }

                            }
                            return;
                        }
                        if (!include(supported,version) && version > getMax(supported)) {
                            $window.onload = onLoadFunc;
                            return;
                        }
                    } else if (supported !== undefined && readCookie("hideBrowserDetectionMessage") !== 'true' && !isArray(supported) && version !== supported) {
                        $window.onload = onLoadFunc;
                        return;
                    }// else
                }//main if
            };


            var getMin = function(arr) {
                var min = arr[0];
                for(var i=1; i<arr.length; i++) {
                    if (arr[i] < min)
                        min = arr[i];
                }
                return min;
            };

            if( typeof uitkTestEnv === "undefined" ) {
                checkBrowserForSupport();
            }
            else {
                if ( !uitkTestEnv ) checkBrowserForSupport();
            }

        },
        controller: ["$scope", "$element", function ($scope, $element) {
            if($scope.showTemplate == 'false'){
                $element.remove();
            }
            //This function is not getting called from anywhere
            /*$scope.onClickDoc = function () {
                location.href = contextPath + "/uitk-core/browser-detection/index.html";
            };*/
        }]
    };
}]);

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
/*!
  * Bowser - a browser detector
  * https://github.com/ded/bowser
  * MIT License | (c) Dustin Diaz 2014
  */

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
function createBrowserDetectionCookie() {
	document.cookie = "hideBrowserDetectionMessage=true; path=/";
}

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.component.busyIndicator', ['uitk.component.uitkNavigable','uitk.uitkUtility'])
.factory('httpInterceptor', ["$q", "$rootScope", function ($q, $rootScope) {

    return {
        request: function (config) {
        	var screenNumber = $rootScope.currentScreenNumber;
        	config.headers['screenNumber'] = screenNumber;
            $rootScope.$broadcast("busy_indicator",{type:"request",url:config.url, screenNumber: screenNumber});
            return config || $q.when(config);
        },
        response: function (response) {
        	$rootScope.$broadcast("busy_indicator",{type:"response",url:response.config.url, screenNumber: response.config.headers.screenNumber});
        	return response || $q.when(response);
        },
        responseError: function (response) {
        	$rootScope.$broadcast("busy_indicator",{type:"responseError",url:response.config.url, screenNumber: response.config.headers.screenNumber});
            return $q.reject(response);
        }
    };
}])
.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
}])
.run(["$rootScope", function($rootScope){
	$rootScope.currentScreenNumber = 1;
}])
.directive("uitkBusyIndicator", ["$timeout", "$document", "$rootScope", "uitkExceptionService", function ($timeout, $document, $rootScope, uitkExceptionService) {

    function link($scope, $element) {
    	$scope.requestCount = 0;
    	$scope.focusedElement = null;
    	$scope.visibility = "false";

        if(_.isUndefined($scope.model.busyIndicatorDelay)){
            $scope.model.busyIndicatorDelay = 5;
        }

        if(!_.isNumber($scope.model.busyIndicatorDelay)){
            uitkExceptionService.throwException("NumberFormatException", "busyIndicatorDelay should be a number");
        }
    	
    	$scope.eventHandlerFunction = function(event) {
			if($scope.requestCount > 0 && !event.ctrlKey && !event.altKey){
				event.stopPropagation();
				return false;
			}
		}
    	
    	$rootScope.$on("$routeChangeSuccess", function() {
    		$rootScope.currentScreenNumber++;
    		$scope.requestCount = 0;
    	});
    	
        $scope.$on("busy_indicator", function (event, parameter) {

        	var timeoutFunc = function(){
    			if($scope.requestCount > 0 && parameter.screenNumber === $rootScope.currentScreenNumber){
    				if(!$scope.focusedElement){
    					$scope.focusedElement = $(':focus');
    				}
    				$scope.visibility = "true";
    				$element.show(); 
    				$(".tk-wrapper").attr("aria-hidden", "true");
    				$("footer").attr("aria-hidden", "true");
    				$element.attr("aria-hidden", "false");
					$document.find('#busyIndicatorImage-'+$scope.id).focus();

					$timeout(function(){

    				}, $scope.model.busyIndicatorDelay * 1000 );
					
    				$document.bind('keydown', $scope.eventHandlerFunction);
    			}
    		}
        	
        	if(($scope.model.excludeUrl && !$scope.model.excludeUrl(parameter.url)) || !$scope.model.excludeUrl){
	        	if(parameter.type === 'request' ){
	        		$scope.requestCount++;
	        		$timeout(timeoutFunc, 500);
	        	}
	        	
	        	if((parameter.type === 'response' || parameter.type === 'responseError') 
	        			&& parameter.screenNumber === $rootScope.currentScreenNumber && (--$scope.requestCount) === 0) {

	        		$element.hide();
	        		$scope.visibility = "false";
	        		$(".tk-wrapper").attr("aria-hidden", "false");
	        		$("footer").attr("aria-hidden", "false");
	        		$element.attr("aria-hidden", "true");
	        		$document.unbind('keydown', $scope.eventHandlerFunction);
	        		if($scope.focusedElement){
	        			$scope.focusedElement.focus();
	        			$scope.focusedElement = null;
	        		}
	        	}
        	}
        });
        
        $scope.genRandomString = function( length ) {                
            var possible    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            var temp        = '';
            for( var i=0; i < length; i++ ) {
                 temp += possible.charAt( Math.floor( Math.random() * possible.length ));
            }
            return temp;
        };
        
        $scope.id = $scope.genRandomString(5);
		//$scope.model.cssSpinner = true;
		if($scope.model.cssSpinner === undefined){
			$scope.model.cssSpinner = false;
		}
    };
	
	return {
		restrict : 'E',
		link : link,
		replace : true,
		scope : {
			model : '='
		},
		template : 	['<div ng-if="visibility === \'true\'" aria-hidden="true">',
		           	 '	<div class="uitk-busyindicator-overlay"></div>',
		           	 '	<div id="busyIndicatorBox-{{$parent.id}}" role="alert" aria-live="assertive" class="uitk-busyindicator-dialog"',
		           	 ' 	  aria-labelledby="busyIndicatorHeading-{{$parent.id}}" aria-describedby="busyIndicatorMoreInfo-{{$parent.id}}">',
		           	 '	  <div class="uitk-busyindicator-content-wrapper">',
					 '	  	<div class="uitk-busyindicator-spinner" id="busyIndicatorImage-{{$parent.id}}" tabindex="-1"',
					 ' 			aria-labelledby="busyIndicatorHeading-{{$parent.id}}" aria-describedby="busyIndicatorMoreInfo-{{$parent.id}}">',
		           	 '			<img ng-show="!$parent.model.cssSpinner" ng-src="{{$parent.model.imageUrl}}" />',
					 '			<div ng-show="$parent.model.cssSpinner" class="tk-fading-circle">',
					 '			   <div class="tk-circle{{$index+1}} tk-circle" ng-repeat="x in [1,2,3,4,5,6,7,8]"></div>',
					 '		 	</div>',
					 '	  	</div>',
		           	 '		<h2 id="busyIndicatorHeading-{{$parent.id}}" class="uitk-busyindicator-message">{{"Information Loading" | uitkTranslate}}</h2>',
		           	 '		<div id="busyIndicatorMoreInfo-{{$parent.$parent.id}}" class="tk-busy-txt" ng-if="$parent.model.text">{{$parent.$parent.model.text}}</div>',
		           	 '	  </div>',
		           	 '	</div>',
		           	 '</div>'].join('')
	}
}]);

/*
 * Copyright (c) Optum 2015 - All Rights Reserved.
 */
/*
 * This directive is used to provide click event instead of ng-click
 * ng-click is getting fired twice while using with ng-touch on ipad. Due to that keyboard gets open and close. This directive helps to fire click event only once in ipad
 */
angular.module('uitk.click',[])
.directive('uitkClick', ['$parse', function($parse) {
    return {
        compile: function($element, attr) {
            var fn = $parse(attr["uitkClick"]);
            return function(scope, element) {
                element.on('click', function(event) {
                    scope.$apply(function() {
                        fn(scope, {$event:event});
                    });
                });
            };
        }
    };
}]);

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.15.0
 */
(function () {
    'use strict';

    var uitkConsumerConfigs = function () {
        //################################################-CONFIGS STATIC OBJECT-###############################
        var configs = {
            LOGCONFIG: {
                //set the error level to be used by the $log factory. See uitk-logger for error levels, set to info/test/debug for internal debugging
                errorLevel: "test",
                //log4javascript configuration for logging.
                log4javascriptConfig: {
                    'error': [
                             /*{
                                 appender: 'AjaxAppender'
                                 //todo: Specify the url if you are saving errors.
                                 //loggingServiceUrl: "/" + location.href.split('/')[3] + "/log"
                             },*/
                             {
                                 appender: 'BrowserConsoleAppender',
                                 pattern: "[%-5p] %d %c - %m%n"
                             }
                    ],
                    'all': [
                                 {
                                     appender: 'BrowserConsoleAppender',
                                     pattern: "[%-5p] %d %c - %m%n"
                                 }
                    ]
                }
            },
            USEEVENTS: { //control whether events are used globally or individually. Option set to give end-consumer maximum flexibility.
                all: true,
                accordion: true,
                authorization: true,
                autocomplete: true,
                button: true,
                calendar: true,
                checkboxGroup: true,
                dialog: true,
                dialogProgressBar: true,
                dynamicTable: true,
                fileUpload: true,
                footer: true,
                globalNavigation: true,
                grids: true,
                header: true,
                help: true,
                label: true,
                license: true,
                menu: true,
                message: true,
                multiSelectDropdown: true,
                panel: true,
                phiConfirmation: true,
                picklist: true,
                primaryNavigation: true,
                progressBar: true,
                radioSelectGroup: true,
                secondaryNavigation: true,
                sessionTimeout: true,
                settingMenu: true,
                singleSelectDropdown: true,
                tabs: true,
                textarea: true,
                texteditor: true,
                textfield: true,
                tooltip: true,
                tree: true,
                verticalNavigation: true,
                formLayout:true,
                showHideContent:true,
                megamenu:true,
                wizard:true

            }, //when true events will be broadcast by all components.
            SUPPORTEDBROWSERS : {
                'Internet Explorer': [11],
                'Chrome' : [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62],
                'Firefox': [38, 45, 47, 53, 54, 55, 56, 57, 58, 59, 60],
                'iPad'   : [1,2,3,4,5,6,7,8,9,10.1,10.2,10.3,11],
                'Opera'  : [28],
                'Safari' : [9, 9.1, 10, 10.1]
            },
            UNSUPPORTEDBROWSERS : {
                'Internet Explorer':[4,5,6,7,8,9,10],
                'Safari': [4]
            }

        }
        //################################################-CONFIGS GET/SET METHODS-###############################
        /**
         *
         * @param {string} level - info/verbose/debug
         */
        this.setErrorLevel = function (level) {
            configs.LOGCONFIG.errorLevel = level;
        }

        /**
         * Set supported and unsupported browsers
         * @param supportedBrowsers
         * @param unsupportedBrowsers
         */
        this.setBrowsers = function(supportedBrowsers, unsupportedBrowsers) {
            if ( _.isObject(supportedBrowsers) ) {
                configs.SUPPORTEDBROWSERS = supportedBrowsers;
            }
            if ( _.isObject(unsupportedBrowsers) ) {
                configs.UNSUPPORTEDBROWSERS = unsupportedBrowsers;
            }
        }

        /**
         *
         * @param {object} log4javascriptConfig - appenders defined by log4javascript errorlevel info/warn/debug/fatal/error
         */
        this.setLog4JavaScriptConfig = function (log4javascriptConfig) {
            configs.LOGCONFIG.log4javascriptConfig = log4javascriptConfig;
        }

        /**
         *
         * @param {string} component - name of component to be changed
         * @param {bool} state - true/false
         */
        this.setEventActiveByComponent = function (component,state) {
            configs.USEEVENTS[component] = state;
        }
        this.$get = function () {
            return configs
        }
        return this;
    }

    angular.module('uitk.uitkConfigs', [])
    .provider('uitkConsumerConfigs', uitkConsumerConfigs);
})();

/*
 * Copyright (c) Optum 2015 - All Rights Reserved.
 */
'use strict';

/**
 * @ngdoc overview
 * @name translateApp
 * @description
 * # translateApp
 *
 * Main module of the application.
 * TODO: could turn this into a new component, maybe do a seperate story for that work.
 */
angular
    .module('uitk.translateApp', [
        'ngSanitize',
        'pascalprecht.translate',
        'tmh.dynamicLocale',
        'ngCookies'
    ]).directive('ngTranslateLanguageSelect', ["LocaleService", function (LocaleService) {
        'use strict';

        return {
            restrict: 'A',
            replace: true,
            template: ''+
            '<div class="language-select" style="margin-top:15px;" ng-if="visible">'+
            '<label>'+
            '{{"Change language" | translate}} : '+
            '<select ng-model="currentLocaleDisplayName"'+
            'ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"'+
            'ng-change="changeLanguage(currentLocaleDisplayName)">'+
            '</select>'+
            '</label>'+
            '</div>'+
            '',
            controller: ["$scope", function ($scope) {
                $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
                $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
                $scope.visible = $scope.localesDisplayNames &&
                    $scope.localesDisplayNames.length > 1;

                $scope.changeLanguage = function (locale) {
                    LocaleService.setLocaleByDisplayName(locale);
                };
            }]
        };
    }])
    .constant('DEBUG_MODE', /*DEBUG_MODE*/false/*DEBUG_MODE*/)
    .constant('LOCALES', {
        'locales': {
            'en_US': 'English',
            'en_CA': "English (Canadian)",
            'en_GB': "English (United Kingdom)",
            'fr_CA': "French (Canadian)",
            'pt_BR': 'Português',
            'es_ES': 'Spanish'
        },
        'preferredLocale': 'en_US'
    })
    // Angular debug info
    .config(["$compileProvider", "DEBUG_MODE", function ($compileProvider, DEBUG_MODE) {
        if (!DEBUG_MODE) {
            $compileProvider.debugInfoEnabled(false);// disables AngularJS debug info
        }
    }])
    // Angular Translate
    .config(["$translateProvider", "DEBUG_MODE", "LOCALES", function ($translateProvider, DEBUG_MODE, LOCALES) {
        if (DEBUG_MODE) {
            $translateProvider.useMissingTranslationHandlerLog();// warns about missing translates
        }

        $translateProvider.useStaticFilesLoader({
            prefix: '../../uitk-core/i18n/uitk-components-locale-',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage(LOCALES.preferredLocale);
        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.useLocalStorage();
    }])
    // Angular Dynamic Locale
    .config(["tmhDynamicLocaleProvider", function (tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider.localeLocationPattern('../../uitk-core/lib/angular/ngLocale/angular-locale_{{locale}}.js');
    }]).service('LocaleService', ["$translate", "LOCALES", "$rootScope", "tmhDynamicLocale", function ($translate, LOCALES, $rootScope, tmhDynamicLocale) {
    'use strict';
    // VARS
    var localesObj = LOCALES.locales;

    // locales and locales display names
    var _LOCALES = Object.keys(localesObj);
    if (!_LOCALES || _LOCALES.length === 0) {
        console.error('There are no _LOCALES provided');
    }
    var _LOCALES_DISPLAY_NAMES = [];
    _LOCALES.forEach(function (locale) {
        _LOCALES_DISPLAY_NAMES.push(localesObj[locale]);
    });

    var currentLocale = $translate.proposedLanguage();// because of async loading

    // METHODS
    var checkLocaleIsValid = function (locale) {
        return _LOCALES.indexOf(locale) !== -1;
    };

    var setLocale = function (locale) {
        if (!checkLocaleIsValid(locale)) {
            console.error('Locale name "' + locale + '" is invalid');
            return;
        }
        //startLoadingAnimation();
        currentLocale = locale;
        $translate.use(locale);
    };

    /**
     * Stop application loading animation when translations are loaded
     */
    var $html = angular.element('html');
    var LOADING_CLASS = 'app-loading';

    //function startLoadingAnimation() {
    //    $html.addClass(LOADING_CLASS);
    //}
    //
    //function stopLoadingAnimation() {
    //    $html.removeClass(LOADING_CLASS);
    //}

    // EVENTS
    $rootScope.$on('$translateChangeSuccess', function (event, data) {
        var lang = data.language.split('_');
        document.documentElement.setAttribute('lang', lang[0]);// sets "lang" attribute to html

        tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));// load Angular locale
    });

    //$rootScope.$on('$localeChangeSuccess', function () {
    //    stopLoadingAnimation();
    //});

    return {
        getLocaleDisplayName: function () {
            return localesObj[currentLocale];
        },
        setLocaleByDisplayName: function (localeDisplayName) {
            setLocale(
                _LOCALES[
                    _LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName)// get locale index
                    ]
            );
        },
        getLocalesDisplayNames: function () {
            return _LOCALES_DISPLAY_NAMES;
        }
    };
}]);

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.service.logger', [])
.value('uitkLogConfig', { 
	'error' : [ 	
		{
			appender: 'AjaxAppender',		                		                        								        	 
			loggingServiceUrl: "/" + location.href.split('/')[3] + "/log"
		},
		{
			appender: 'BrowserConsoleAppender',
			pattern: "[%-5p] %d %c - %m%n"
		}
	],
	'all': [
		{
			appender: 'BrowserConsoleAppender',
			pattern: "[%-5p] %d %c - %m%n"
		}
	]          
})
.factory('UitkLogServiceProvider', function(){
	var logger = log4javascript.getLogger();

	log4javascript.setShowStackTraces(true);

	var logLevelMap = {
		'all': log4javascript.Level.ALL, 	
		'fatal': log4javascript.Level.FATAL,
		'error': log4javascript.Level.ERROR,
		'warn': log4javascript.Level.WARN,
		'info': log4javascript.Level.INFO,
		'debug': log4javascript.Level.DEBUG,
		'trace': log4javascript.Level.TRACE,
		'off': log4javascript.Level.OFF    					 
	};
	
	function registerAppendersForLogLevel(appenders, logLevel) {
		appenders.forEach(function(appender){
			switch(appender.appender) {
				case "AjaxAppender" :    
		 		    var ajaxAppender = new log4javascript.AjaxAppender(appender.loggingServiceUrl);
		            ajaxAppender.setThreshold(logLevelMap[logLevel]);
		            ajaxAppender.setLayout(new log4javascript.JsonLayout(false, true));
		            ajaxAppender.addHeader("Content-Type","application/json;charset=utf-8");
		            ajaxAppender.addHeader("X-CSRF-HEADER","X-CSRF-TOKEN");
		            ajaxAppender.addHeader("X-CSRF-PARAM","_csrf");
		            ajaxAppender.addHeader("X-CSRF-TOKEN",window.csrfToken);
			        logger.addAppender(ajaxAppender);
			        break;
				case "AlertAppender":
				case "PopUpAppender":
				case "InPageAppender":
				case "BrowserConsoleAppender":
					var appenderInstance = Object.create(log4javascript[appender.appender].prototype); 
					appenderInstance.constructor.apply(appenderInstance, []);
					appenderInstance.setThreshold(logLevelMap[logLevel]);
					if(appender.pattern) {
						appenderInstance.setLayout(new log4javascript.PatternLayout(appender.pattern));
					}	
			        logger.addAppender(appenderInstance);
			    break;
			    default: 
					throw {
						name: "InvalidAppenderException",
						message: "Log Appender '"+ appender.appender + "' not supported."
				};
			}
		});
	}
	
	return {
		registerAppendersForLogLevel : registerAppendersForLogLevel,
		getLogger : function(){
			return logger;
		}
	};
})
.config(["$provide", function($provide) {
    $provide.decorator('$log',["$delegate", "uitkLogConfig", "UitkLogServiceProvider", function($delegate,uitkLogConfig,UitkLogServiceProvider) {
    	for(var logLevel in uitkLogConfig) {
    		if(uitkLogConfig.hasOwnProperty(logLevel)) {
    			UitkLogServiceProvider.registerAppendersForLogLevel(uitkLogConfig[logLevel], logLevel);
    		}
    	}
    	var logger = UitkLogServiceProvider.getLogger();

    	['fatal', 'error', 'warn', 'info', 'debug', 'trace'].forEach(function(currentLogLevel){
    		var logLevel = currentLogLevel.toString();
    		$delegate[logLevel] = function() {  logger[logLevel].apply(logger, Array.prototype.slice.call(arguments)); };
    	});
    	return $delegate;       
    }]);      
}]);

/*
 * Copyright (c) Optum 2015 - All Rights Reserved.
 */

var maxlengthApp = angular.module('uitk.maxlength',[]);
maxlengthApp.directive('uitkMaxlength', [function() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, elem, attrs, ctrl) {
				attrs.$set("ngTrim", "false");
                var maxlength = parseInt(attrs.uitkMaxlength, 10);
                ctrl.$parsers.push(function (value) {
                    if (value.length > maxlength)
                    {
                        value = value.substr(0, maxlength);
                        ctrl.$setViewValue(value);
                        ctrl.$render();
                    }
                    return value;
                });
			}
		};
}]);

/*
 * Copyright (c) Optum 2015 - All Rights Reserved.
 */
(function () {

    //TODO: Function level comments!
    var uitkMenuModel = function ($window, $location, $document, $timeout, uitkEvents, $rootScope) {
        //TODO: Expose these as angular constants so consumers have access. Rather, put in the service with getResizer and expose there.
        //TODO: Can we grab these values from the media queries? We don't want to support specific breakpoints but should instead allow consumers to define them.
        //TODO: Change to SMALL, MEDIUM AND LARGE, etc... (x-small, x-large...)
        var PHONE_WIDTH = 640;
        var TABLET_WIDTH = 992;

        var PHONE_MODE = 0;
        var TABLET_MODE = 1;
        var DESKTOP_MODE = 2;

        return {
            initializeParents: function (currentItem, parent) {
                currentItem.menuParent = parent;

                //Level 1 menu
                if (parent === undefined) {
                    currentItem.globalNavStates = {};
                    currentItem.updateNavigationState = function (key, item) {
                        this.globalNavStates[key] = item;
                    }
                    currentItem.getNavigationState = function (key) {
                        var value = this.globalNavStates[key];
                        if (value && value.textTemplate)
                            return value.textTemplate;
                        else
                            return undefined
                    }

                    for (var i = 0; i < currentItem.links.length; i++) {
                        this.initializeParents(currentItem.links[i], currentItem);
                    }
                } else if (currentItem.dropDown && currentItem.dropDown.links) {
                    for (var i = 0; i < currentItem.dropDown.links.length; i++) {
                        this.initializeParents(currentItem.dropDown.links[i], currentItem);
                    }
                }
            },

            setLevel: function (scope) {
                scope.model.level = scope.$parent.model ? scope.$parent.model.level + 1 : 1;
            },

            initializeController: function (scope) {
                scope.show = false;
                /* For hiding menu on Tab/Shift Tab*/
                var nonDisabledLinks = scope.model.links.filter(function (link) {
                    return !link.disabled
                });

                if (nonDisabledLinks.length > 0) {
                    var firstNonDisabledLink = nonDisabledLinks[0];
                    firstNonDisabledLink.firstLinkInDropDown = true;
                    var lastNonDisabledLink = nonDisabledLinks[nonDisabledLinks.length - 1];
                    lastNonDisabledLink.lastLinkInDropDown = true;
                }
            },

            initializeVisibility: function (scope) {
                if (scope.model.level === 1) {
                    scope.model.menuVisible = true;
                    $document.on("click", function ($event) {
                        if (!($event.target[scope.model.parentId] || $event.target[scope.model.id]) && scope.clickPath) {
                            scope.$apply(function () {
                                for (var i = scope.clickPath.length - 1; i >= 0; i--) {
                                    if (scope.clickPath[i].dropDown) {
                                        scope.clickPath[i].dropDown.menuVisible = false;
                                        scope.clickPath.pop();
                                    }
                                }
                            })
                        }
                    });
                }
            },

            initializeSetFocus: function (scope, iElement, initLinks) {
                scope.model.setOnFocus = function () {
                    $timeout(function () {
                        iElement.find('a')[0].focus();
                    });
                };
                scope.model.setFocus = scope.model.setOnFocus;

                if (initLinks) {
                    scope.model.links.forEach(function (link, index) {
                        link.setOnFocus = function () {
                            var otherElement = iElement.find('ul a');
                            $timeout(function () {
                                iElement.find('a').not(function (index, element) {
                                    return _.includes(otherElement, element);
                                })[index].focus();
                            });
                        }
                        link.setFocus = link.setOnFocus;
                    });
                }
            },

            getClickHandler: function (scope) {
                var that = this;

                return function ($event, item) {
                    //Notify listeners that this menu was clicked
                    if (scope.model && scope.model.id) {
                        uitkEvents.setScope(scope).emit('menu', scope.model.id + '-Clicked', item);
                    }
                    if (scope.model.parentId) {
                        $event.target[scope.model.parentId] = true;
                    }
                    else {
                        $event.target[scope.model.id] = true;
                    }
                    var rootMenu = that.getRootMenuScopeFromChildScope(scope);

                    //First menu click
                    if (!rootMenu.clickPath || rootMenu.clickPath.length === 0) {
                        rootMenu.clickPath = [];
                        rootMenu.clickPath.push(item);
                        if (item.dropDown) {
                            item.dropDown.menuVisible = !item.dropDown.menuVisible;
                            if (item.dropDown.menuVisible) {
                                item.dropDown.setOnFocus();
                            }
                        }
                    } else {
                        var lastItem = rootMenu.clickPath[rootMenu.clickPath.length - 1];

                        //If we clicked on the last item again...
                        if (item === lastItem) {
                            rootMenu.clickPath.pop();
                            rootMenu.clickPath.push(item);
                            if (item.dropDown) {
                                item.dropDown.menuVisible = !item.dropDown.menuVisible;
                                if (item.dropDown.menuVisible) {
                                    scope.checkMenuPosition(item);
                                    item.dropDown.setOnFocus();
                                }
                            }
                        }

                        //If we click on the last item's parent...
                        else if (item === lastItem.menuParent) {
                            if (lastItem.dropDown) {
                                lastItem.dropDown.menuVisible = false;
                            }
                            item.dropDown.menuVisible = !item.dropDown.menuVisible;
                            rootMenu.clickPath.pop();
                        }

                        //If we click a level 2 menu...
                        else if (item.menuParent.level === 1) {
                            //hide other menus
                            for (var i = rootMenu.clickPath.length - 1; i >= 0; i--) {
                                if (rootMenu.clickPath[i].dropDown) {
                                    rootMenu.clickPath[i].dropDown.menuVisible = false;
                                }
                            }
                            rootMenu.clickPath = [];
                            rootMenu.clickPath.push(item);
                            if (item.dropDown) {
                                item.dropDown.menuVisible = true;
                                item.dropDown.setOnFocus();
                            }
                        }

                        //If we click last item's child...
                        else if (item.menuParent === lastItem) {
                            if (item.dropDown) {
                                item.dropDown.menuVisible = !item.dropDown.menuVisible;
                            }
                            rootMenu.clickPath.push(item);
                            if (item.dropDown) {
                                scope.checkMenuPosition(item);
                                item.dropDown.menuVisible = true;
                                item.dropDown.setOnFocus();
                            }
                        }

                        //If we click on the last item's sibling...
                        else if (item.menuParent === lastItem.menuParent) {
                            if (lastItem.dropDown) {
                                lastItem.dropDown.menuVisible = false;
                            }
                            rootMenu.clickPath.pop();
                            rootMenu.clickPath.push(item);
                            if (item.dropDown) {
                                scope.checkMenuPosition(item);
                                item.dropDown.menuVisible = true;
                                item.dropDown.setOnFocus();
                            }
                        }

                        //If we clicked a sibling of an ancestor...
                        else {
                            if (lastItem.menuParent.dropDown) {
                                lastItem.menuParent.dropDown.menuVisible = false;
                            }
                            //Pop the last item and its parent
                            rootMenu.clickPath.pop();
                            rootMenu.clickPath.pop();
                            rootMenu.clickPath.push(item);
                            if (item.dropDown) {
                                scope.checkMenuPosition(item);
                                item.dropDown.menuVisible = true;
                                item.dropDown.setOnFocus();
                            }
                        }
                    }

                    if (item.dropDown) {
                        return;
                    }

                    //If the item clicked has a url, navigate to it.
                    if (item.url) {
                        that.navigateToURL(item.url);
                    }

                    if (rootMenu.isHorizontal) {
                        //hide menus up to level 2
                        for (var i = rootMenu.clickPath.length - 1; i >= 0; i--) {
                            if (rootMenu.clickPath[i].dropDown) {
                                rootMenu.clickPath[i].dropDown.menuVisible = false;
                                rootMenu.clickPath.pop();
                            }
                        }
                        angular.forEach(rootMenu.model.links, function (link, key) {
                            link.selected = false;
                            if (link.dropDown) {
                                link.dropDown.selected = false;
                            }
                        })
                        rootMenu.clickPath[0].selected = true;
                    }

                    if (item.category !== undefined) {
                        rootMenu.model.updateNavigationState(item.category, item);
                    }
                }
            },

            checkMenuPosition: function (scope, iElement) {
                return function (item) {

                    //Exit early on vertical menus or horizontal menus less than level 3
                    if (!scope.isHorizontal || (item.dropDown && item.dropDown.level < 3))
                        return

                    if (item.dropDown)
                        item.dropDown.menuPosition = false;

                    var elementRightPosition = iElement[0].getBoundingClientRect().right;
                    var elementWidth = iElement[0].getBoundingClientRect().width;
                    var screenWidth = $window.innerWidth || $document.documentElement.clientWidth || $document.body.clientWidth;

                    if (screenWidth < elementRightPosition + elementWidth + elementWidth) {
                        scope.model.links.forEach(function (link) {
                            if (link.dropDown) {
                                link.dropDown.menuPosition = true;
                            }
                        })
                    }
                }
            },

            isSelected: function (item) { // check if the current link is in selected state.
                if (item.category && item.textTemplate) {
                    var rootMenu = this.getRootMenuScopeFromChildScope(this);
                    return rootMenu.model.getNavigationState(item.category) == item.textTemplate;
                } else {
                    return false;
                }
            },

            navigateToURL: function (url) {
                if (angular.isArray(url) && url[0] === '#') {
                    $location.path = url[1];
                }
                else if (url.indexOf('#') === 0) {
                    var newUrl = url.substring(1);
                    $location.url(newUrl);
                }
                else {
                    $window.location = url;
                }
            },

            //Called on key down in menus
            hideParentMenu: function (event, item) {
                //escape character
                if (event.which === 27) {
                    if (this.model.level > 1) {
                        this.model.menuVisible = false; // close current dropdown menu
                        if (this.focusItem) {
                            this.focusItem.focusMe = true;
                        }
                    }
                }
                else if (this.model.level > 1 && (event.which === 9) && !event.shiftKey) {
                    if (item.lastLinkInDropDown) {
                        if (!item.dropDown) {
                            this.model.menuVisible = false;
                            if (item.menuParent.lastLinkInDropDown) {
                                //Collapse to current expanded level 2 menu
                                var current = item.menuParent;
                                while (current.dropDown) {
                                    current.dropDown.menuVisible = false;
                                    current = current.menuParent;
                                }
                            }
                        }
                        else if (!item.dropDown.menuVisible) {  // if it has child menu
                            this.model.menuVisible = false;
                        }
                    }
                }
                else if (this.model.level > 1 && (event.which === 9) && event.shiftKey && item.firstLinkInDropDown) {
                    this.model.menuVisible = false;
                }
            },

            isExpanded: function (item) {
                if (item.dropDown) {
                    this.show = item.dropDown.menuVisible;
                    return this.show;
                }
                return undefined;
            },


            //Compilation Functions
            ValidateModelId: function (model, uitkExceptionService) {
                if (model.level === 1 && !model.id) {
                    uitkExceptionService.throwException('InvalidIdException', 'Id is required attribute');
                }
            },

            CheckForBothUrlAndDropdown: function (model, uitkExceptionService) {
                model.links.forEach(function (link) {
                    if (link.url && link.dropDown) {
                        uitkExceptionService.throwException('InvalidLinkException', 'Link can not have both url and dropDown element');
                    }
                });
            },

            //TODO: Look to refactor this into a base level service that the whole toolkit can consume. Something like $rootScope broadcasting
            //      up to the whole toolkit.
            // Reconfigure the top level menu on resize of the window
            getResizer: function (scope, iElement, maxItems) {
                var that = this;

                return function () {
                    var MAX_HORIZONTAL_ITEMS = maxItems || 4;

                    var rootMenu = that.getRootMenuScopeFromChildScope(scope);
                    var priorDisplayMode = rootMenu.model.displayMode;
                    rootMenu.model.displayMode = that.getModeForScreenWidth($window.innerWidth);

                    if (priorDisplayMode === rootMenu.model.displayMode)
                        return;

                    var isMoreDisplayed
                    if (scope.model.links.length > 0) {
                        isMoreDisplayed = scope.model.links[scope.model.links.length - 1].textTemplate === '<span>More</span>';
                    }


                    if (scope.model.level !== 1
                        || (!isMoreDisplayed && scope.model.links.length <= MAX_HORIZONTAL_ITEMS + 1)) {
                        return;
                    }

                    if (rootMenu.model.displayMode === PHONE_MODE && rootMenu.model.useStripOnMobile
                        && !isMoreDisplayed
                        && (iElement.context.offsetWidth > PHONE_WIDTH || scope.model.links.length > MAX_HORIZONTAL_ITEMS)) {
                        that.convertStripForPhone(scope, iElement, MAX_HORIZONTAL_ITEMS);
                    }
                    else if (isMoreDisplayed) {
                        that.convertStripForDesktop(scope);
                    }

                    // manual $digest required as resize event is outside of angular
                    scope.$digest();
                }
            },

            getModeForScreenWidth: function (width) {
                if (width <= PHONE_WIDTH)
                    return PHONE_MODE;
                else if (width <= TABLET_WIDTH)
                    return TABLET_MODE;
                else
                    return DESKTOP_MODE;
            },

            getRootMenuScopeFromChildScope: function (scope) {
                var curScope = scope;
                if (!scope)
                    return;

                var rootFound = false;
                while (!rootFound) {
                    //Some unit tests are triggering a resize event and failing due to scopes not properly setup for menus.
                    if (curScope === null)
                        return scope;

                    if (angular.isDefined(curScope.model) && curScope.model.level === 1)
                        rootFound = true;
                    else
                        curScope = curScope.$parent;
                }
                return curScope;
            },

            convertStripForPhone: function (scope, iElement, MAX_HORIZONTAL_ITEMS) {
                var moreMenu = {
                    textTemplate: '<span>More</span>',
                    dropDown: {
                        level: 2,
                        links: []
                    },
                    menuParent: this.getRootMenuScopeFromChildScope(scope).model
                };

                var totalWidth = 0;
                var itemsToDisplay = 0;
                while (totalWidth < PHONE_WIDTH && itemsToDisplay < scope.model.links.length) {
                    if (iElement.context && iElement.context.children && iElement.context.children[itemsToDisplay]) {
                        totalWidth += iElement.context.children[0].children[itemsToDisplay].offsetWidth;
                    }
                    itemsToDisplay++;
                }

                if (itemsToDisplay > MAX_HORIZONTAL_ITEMS)
                    itemsToDisplay = MAX_HORIZONTAL_ITEMS;

                var itemsToPop = scope.model.links.length - itemsToDisplay;
                for (var i = 0; i < itemsToPop; i++) {
                    var itemToMove = scope.model.links.pop();
                    if (itemToMove.dropDown) {
                        itemToMove.dropDown.level += 1;
                    }
                    itemToMove.menuParent = moreMenu;

                    moreMenu.dropDown.links.unshift(itemToMove);
                }
                scope.model.links.push(moreMenu);
                var rootMenuScope = this.getRootMenuScopeFromChildScope(scope);
            },

            convertStripForDesktop: function (scope) {
                var rootMenu = this.getRootMenuScopeFromChildScope(scope).model;
                var moreMenu = scope.model.links.pop();
                while (moreMenu.dropDown.links.length) {
                    var itemToMove = moreMenu.dropDown.links.shift();
                    if (itemToMove.dropDown) {
                        itemToMove.dropDown.level -= 1;
                    }
                    itemToMove.menuParent = rootMenu;
                    scope.model.links.push(itemToMove);
                }
                var rootMenuScope = this.getRootMenuScopeFromChildScope(scope);
                rootMenuScope.isHorizontal = true;
            },

            initializeHoverSlider: function (scope) {
                var that = this;
                if (scope.model.level === 1) {
                    var touchInterface = 'ontouchstart' in window || navigator.msMaxTouchPoints;
                    if (!touchInterface) {
                        $timeout(function () {//todo: This should be done the angular way to avoid timing issues. This logic should be bound to the componet code. -Clint
                            try { //Hover slider init will fail if the screen is small, if we are in small screen mode. Hence the try / empty catch
                                var totalWidth = $(".tk-pnav li:last").offset().left - $(".tk-pnav li:first").offset().left + $(".tk-pnav li:last").width();//width of menu
                                //$(".tk-pnav").css({width:totalWidth}); Commented to fix DE96852
                                var reducedWidth = 2;
                                var dLeft = $('.tk-pnav li:first').offset().left;
                                var dWidth = $('.tk-pnav li:first').width() + reducedWidth;
                                $('.tk-pnav-hover-div').css({visibility: "hidden"});
                                $('.tk-pnav-hover-div').stop().animate({
                                    left: dLeft,
                                    width: dWidth
                                }, {duration: 'slow'});
                            } catch (ex) {
                            }

                            $(".tk-pnav > li").on("mouseover", function () {
                                var rootMenu = that.getRootMenuScopeFromChildScope(scope);

                                if (rootMenu.model.displayMode === DESKTOP_MODE) {
                                    var position = $(this).offset().left;//set width and position of lava lamp
                                    if ($('.tk-head').length > 0) {
                                        position = position - $('.tk-head').offset().left - 1;
                                    }
                                    var width = $(this).width() + reducedWidth;
                                    $('.tk-pnav-hover-div').css({visibility: "visible"});
                                    $('.tk-pnav-hover-div').stop().animate({
                                        left: position,
                                        width: width
                                    }, {duration: 'slow'});
                                }
                            });

                            $(".tk-pnav").mouseleave(
                                function () {
                                    $('.tk-pnav-hover-div').css({visibility: "hidden"});
                                }
                            );

                            //This timeout  number is to make sure all angular code is loaded before inner code is executed,
                            // research to see if we need a timeout,  to get the correct calculations for totalwidth
                        }, 1000);
                    }
                }
            }
        }
    }

    uitkMenuModel.$inject = ['$window', '$location', '$document', '$timeout', 'uitkEvents', '$rootScope'];

    angular.module('uitk.Models', ['uitk.uitkUtility'])
        .service('uitkMenuModel', uitkMenuModel);
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.component.uitkNavigable',[])
.directive('uitkNavigable', ["$parse", function($parse){
	
    function link($scope, $element, $attrs) {
       
		var isNavigable = true;
		if($attrs.uitkNavigable){
		    isNavigable = $parse($attrs.uitkNavigable)($scope) ? true : false;
     	}
        $scope.keysToTrigger = ($attrs.keyCodes) ? JSON.parse($attrs.keyCodes) : [];
		if (isNavigable) {
			$element.attr('tabindex', 0);
			if($element.attr('ng-click')) {
				var fn = $parse($element.attr('ng-click'));
				$element.on('keydown', function (event) {
				    if (event.which === 13 || event.which === 32 || angular.element.inArray(event.which, $scope.keysToTrigger) > -1) { // enter or space key is pressed
						$scope.$apply(function() {fn($scope, {$event:event});});
						event.preventDefault();
					}

				});
			}
		}
	}
	
	return {
		restrict : 'A',
		replace : false,
		scope : false,
		link : link
	};
}]);

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.component.uitkSkipLink',[])
.directive('uitkSkipLink', function(){
	return {
		restrict : 'E',
		replace : true,
		scope : {
			allowAccesskeysSupport:'@',
			skipLinkTitle:'@',
			skipLinkText: '@'
		},
		link : function($scope){
			
			$scope.onSkipLinkClick = function(){
				var contentElements = window.document.getElementsByTagName('h1');
				if(contentElements !== 'undefined' && contentElements.length !== 0){
					contentElements[0].focus();
				}
			}
			
			$scope.setFocusOnMainContent = function(){
				if($scope.allowAccesskeysSupport  === "true"){
					var contentElements = window.document.getElementsByTagName('h1');
					if(contentElements !== 'undefined' && contentElements[0] !== 'undefined'){
						contentElements[0].focus();
					}
				}
			};
			$scope.setFocusOnSkiplink = function(){
				if($scope.allowAccesskeysSupport  === "true"){
					var skipElement = window.document.getElementById('skipToContentLink');
					if(skipElement !== 'undefined'){
						skipElement.focus();
					}
				}
			};
		},
		template: " <div id='skiptocontent'>" +
						"<a href='' title='{{skipLinkTitle}}'" +
							"ng-click='onSkipLinkClick()'" +
							"id='skipToContentLink' title=''>{{skipLinkText}}" +
							"<span class='tk-util-hidden-in-place'>. Access keys: T: Top of page; M: Main content</span>" +
						"</a>" +
						"<div class='tk-util-hidden-in-place'>" +
							"<input type='button' accesskey='M' value='Skip to main content (M)' tabindex='-1' " +
							"ng-click='setFocusOnMainContent()'>" +
							"<input type='button' accesskey='T' value='Back up to top of page (T)'" +
							"ng-click='setFocusOnSkiplink()' tabindex='-1' >" +
						"</div>" +
					"</div>"
	};
});


 


/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.component.uitkSlideAnimation',[])
.directive(
            "uitkSlideShow",
            function() {
                
                function link( $scope, element, attributes ) {
                    var expression = attributes.uitkSlideShow;  // truthy expression to watch.
                    var durationType = parseInt(attributes.uitkSlideShowDuration, 10);
                    var duration = (angular.element.isNumeric(durationType))? durationType: ( attributes.uitkSlideShowDuration || "fast" ); // default duration to fast if slide show duration is not provided.
                   
                   
                    
                    //default display of the element based on the link time value of the model we are watching.
                    
                    if ( ! $scope.$eval( expression ) ) {
                        element.hide();
                    }
                    
                    //watch for the expression 
                    $scope.$watch(
                        expression,
                        function( newValue ) {
                            if ( newValue ) {
                                element
                                    .stop( true, true )
                                    .slideDown( duration );
                            // Hide element.
                            } else {
                                element
                                    .stop( true, true )
                                    .slideUp( duration );
                            }
                        }
                    );
                }

                // Return the directive configuration.
                return({
                    link: link,
                    restrict: "A"
                });

            }
        );


 


/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.15.0
 */
(function () {
    var EventsProto = function (scope, emit, broadcast, internalBroadcast) {
        this.scope = scope;
        this.emit = emit;
        this.broadcast = broadcast;
        this.internalBroadcast = internalBroadcast;
    };

    /**
     * uitkEvents wraps broadcasting service to purpose of controlling if on or off.
     */
    var uitkEvents = function (uitkConsumerConfigs, $rootScope, $log) {
        //NOTE: $on is not implemented here since it doesn't effect the configs

        var supressLog = (uitkConsumerConfigs.LOGCONFIG.errorLevel === 'test');

        //check to see if all events are turn off.
        if (!uitkConsumerConfigs.USEEVENTS.all) {
            return { setScope: function () { return false; } };
        }
        //define the scope
        var scope = $rootScope;
        /**
         * quick short hand
         * @param {object} object
         * @returns {string} 
         */
        var toString = function (object) {
        
            function replacer(key, value) {
                if (key && key.startsWith && (key.startsWith("$") || key === "parent" || key === "children" || key === "menuParent")) {
                    return "---";
                }
                return value;
            };
                  
           try {
                var str = JSON.stringify(object, replacer); 
           } catch (error) {
               object = undefined;
           }
            return str;     
            //return angular.toJson(object);
        };
        /**
         * if in verbose or debug mode show additional info
         * @param {object} object
         * @returns {string} 
         */
        var debugging = function (object) {
            if ("verbose" === uitkConsumerConfigs.LOGCONFIG.errorLevel || "debug" === uitkConsumerConfigs.LOGCONFIG.errorLevel) {
                return toString(object); //angular.toJson(object);
            } else {
                return "";
            }
        };

        /**
        * braodcast 
        * @param {string} componentName - The name of the component one is broadcasting as.
        * @param {string} name - name of the event to broadcast
        * @param {*} args - Optional one or more arguments which will be passed onto the event listeners
        * @param {*} debugDetails - additional verbose info passed in about how component is being used. 
        */
        var emit = function (componentName, name, args, debugDetails) {
            if (!uitkConsumerConfigs.USEEVENTS[componentName]) {
                return null;//broadcast for this componentsName is disabled.
            }

            if (!supressLog) {
                $log.info(componentName, " Emit event: ", name, toString(args), debugging(debugDetails));
            }
            return scope.$emit(name, args);
        };

        /**
         * braodcast 
         * @param {string} componentName - The name of the component one is broadcasting as.
         * @param {string} name - name of the event to broadcast
         * @param {*} args - Optional one or more arguments which will be passed onto the event listeners
         * @param {*} debugDetails - additional verbose info passed in about how component is being used. 
         */
        var broadcast = function (componentName, name, args, debugDetails) {
            if (!uitkConsumerConfigs.USEEVENTS[componentName]) {
                return null;//broadcast for this componentsName is disabled.
            }
            if (!supressLog) {
                $log.info(componentName, " Broadcast event: ", name, toString(args), debugging(debugDetails));
            }
            return scope.$broadcast(name, args);
        };
        /**
      * Force braodcast or emit
      * @param {string} braodcast or emit - the action to broadcast
      * @param {string} name - name of the event to broadcast
      * @param {*} args - Optional one or more arguments which will be passed onto the event listeners
      * @param {*} debugDetails - additional verbose info passed in about how component is being used. 
      */
        var internalBroadcast = function (BEName, name, args, debugDetails) {
            if (!supressLog) {
                $log.info(BEName + " event: ", name, toString(args), debugging(debugDetails));
            }
            if (BEName === 'broadcast') {
                return scope.$broadcast(name, args);
            } else {
                return scope.$emit(name, args);
            }
        };

        /**
         * scope to be used by broadcast service.
         * @param {object} scope
         */
        var setScope = function (targetScope) {
            scope = targetScope || $rootScope;
            //$log.info("Event scope set: ", toString(scope));
            return new EventsProto(scope, emit, broadcast, internalBroadcast);
        };
        return { setScope: setScope };
    };
    uitkEvents.$inject = ["uitkConsumerConfigs", "$rootScope", "$log"];

    /**
     * Make use of log4javacript to be used to overwrite $log
     * @returns {object} 
     */
    var uitkLogServiceProvider = function () {
        //no execption if log4javascript is not included.
        if (typeof log4javascript === "undefined") {
            return null;
        }

        var logger = log4javascript.getLogger();
        log4javascript.setShowStackTraces(true);
        var logLevelMap = {
            'all': log4javascript.Level.ALL,
            'fatal': log4javascript.Level.FATAL,
            'error': log4javascript.Level.ERROR,
            'warn': log4javascript.Level.WARN,
            'info': log4javascript.Level.INFO,
            'debug': log4javascript.Level.DEBUG,
            'trace': log4javascript.Level.TRACE,
            'off': log4javascript.Level.OFF
        };

        function registerAppendersForLogLevel(appenders, logLevel) {
            appenders.forEach(function (appender) {
                switch (appender.appender) {
                    case "AjaxAppender":
                        var ajaxAppender = new log4javascript.AjaxAppender(appender.loggingServiceUrl);
                        ajaxAppender.setThreshold(logLevelMap[logLevel]);
                        ajaxAppender.setLayout(new log4javascript.JsonLayout(false, true));
                        ajaxAppender.addHeader("Content-Type", "application/json;charset=utf-8");
                        ajaxAppender.addHeader("X-CSRF-HEADER", "X-CSRF-TOKEN");
                        ajaxAppender.addHeader("X-CSRF-PARAM", "_csrf");
                        ajaxAppender.addHeader("X-CSRF-TOKEN", window.csrfToken);
                        logger.addAppender(ajaxAppender);
                        break;
                    case "AlertAppender":
                    case "PopUpAppender":
                    case "InPageAppender":
                    case "BrowserConsoleAppender":
                        var appenderInstance = Object.create(log4javascript[appender.appender].prototype);
                        appenderInstance.constructor.apply(appenderInstance, []);
                        appenderInstance.setThreshold(logLevelMap[logLevel]);
                        if (appender.pattern) {
                            appenderInstance.setLayout(new log4javascript.PatternLayout(appender.pattern));
                        }
                        logger.addAppender(appenderInstance);

                        break;
                    default:
                        var errorAppender = {
                            name: "InvalidAppenderException",
                            message: "Log Appender '" + appender.appender + "' not supported."
                        };
                        console.error(errorAppender);
                }
            });
        }

        return {
            registerAppendersForLogLevel: registerAppendersForLogLevel,
            getLogger: function () {
                return logger;
            }
        };
    };

    /**
     * Implentation to use log4javascript overloading $log of angularjs 
     * @param {object} uitkLogServiceProvider
     * @param {object} $injector
     * @returns {object} 
     */
    var $logOverload = function (uitkLogServiceProvider, uitkConsumerConfigs) {
        //TODO: Add support for server strings [support of log4js] and console objects.
        //This may require us to look at appenders for log4js and if console, display the object otherwise display the string.
        //this must work with exceptionService. 
        /**
         * set the configs for log4js
         * @param {object} uitkLogConfig
         * @returns {object}  
         */
        this.setLogConfigs = function (uitkLogConfig) {
            //log4javacript is not enabled use basic log
            if (typeof uitkLogServiceProvider.registerAppendersForLogLevel === 'undefined')
                return console;

            //loop through all configs of log4js and register configs. 
            for (var logLevel in uitkLogConfig) {
                if (uitkLogConfig.hasOwnProperty(logLevel)) {
                    uitkLogServiceProvider.registerAppendersForLogLevel(uitkLogConfig[logLevel], logLevel);
                }
            }

            //set log object to be returned. 
            var log = {};
            //get all registered loggers. 
            var logger = uitkLogServiceProvider.getLogger();
            //find registered loggers and init the level called.
            ['fatal', 'error', 'warn', 'info', 'debug', 'trace'].forEach(function (currentLogLevel) {
                //make sure currentlogLevel is a string
                var logLevel = currentLogLevel.toString();
                //set properties on log by logLevel
                log[logLevel] = console.log;
                //execute logLevel called
                log[logLevel] = function () {
                    logger[logLevel].apply(logger, Array.prototype.slice.call(arguments));
                };
            });
            return log;
        };
        return this.setLogConfigs(uitkConsumerConfigs.LOGCONFIG.log4javascriptConfig);
    };
    $logOverload.$inject = ["uitkLogServiceProvider", "uitkConsumerConfigs"];

    var uitkTools = function ($log) {
        var _this = this;
        _this.RandomId = function (length) {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
            if (!length) {
                length = Math.floor(Math.random() * chars.length);
            }
            var str = '';
            for (var i = 0; i < length; i++) {
                str += chars[Math.floor(Math.random() * chars.length)];
            }
            return str;
        };

        _this.ComponentId = function (id, viewModel, element, name) {
            if (_.isUndefined(viewModel)) {
                $log.error("model provided is undefined " + name);
                return '';
            }

            var checkViewModel = function (id) {
                if (id) {
                    element.attr("id", id);
                    return true;
                }
                return false;
            };

            var checkAttribute = function (id) {
                if (id) {
                    return true;
                }
                return false;
            }
         
            if (!checkViewModel(viewModel.id)) {
                if (!checkAttribute(id)) {
                    $log.warn("No unique id has been provided for component " + name);
                    var uniqueId = _this.RandomId(5);
                    element.attr("id", uniqueId);
                    return uniqueId;
                }
            }
            return id;
        };
    };
    uitkTools.$inject = ['$log'];

    /*
     * Exception service for UITK which will translate message in user selected language and throw exception
     * This service will check if tranlsation module is present in app or not.
     */
    var uitkExceptionService = function ($injector) {

        var throwException = function (name, message) {

            var pascalFilter;

            if ($injector.has('$translate')) {
                pascalFilter = $injector.get('$translate');
                pascalFilter(message).then(function (data) {
                    throw {
                        name: name,
                        message: data
                    };
                }, function () {
                    throw {
                        name: name,
                        message: message
                    };
                });
            }
            else {
                throw {
                    name: name,
                    message: message
                };
            }
        };
        return {
            throwException: throwException
        }
    };

    uitkExceptionService.$inject = ["$injector"];

    /*
     * Translate filter for UITK which will check if angular-translate is available or not.
     */
    var uitkTranslateFilter = function ($filter, $log, uitkConsumerConfigs) {
        var pascalFilter;
        var supressLog = (uitkConsumerConfigs.LOGCONFIG.errorLevel === 'test');
        try {
            pascalFilter = $filter('translate');
        } catch (exception) {
            if (!supressLog) {
                $log.info("No translate filter defined: " + exception);
            }
            
        }

        return function (inputStr) {
            return pascalFilter ? pascalFilter(inputStr) : inputStr;
        }
    };

    uitkTranslateFilter.$inject = ["$filter", "$log", "uitkConsumerConfigs"];

    /*
     * This service is used to create dynamic live region and announce the message
     */
    var uitkLiveRegionService = function ($timeout, $document) {
        var timerB = null;
        var alertMessage = function (message, alertOff) {
            var div = document.createElement("div");
            angular.element(div).attr("id", "announceThisLive");
            angular.element(div).attr("role", "alert");
            angular.element(div).attr("aria-live", "polite");
            angular.element(div).attr("aria-relevant", "additions");
            angular.element(div).attr("aria-atomic", "false");
            angular.element(div).attr("class", "oui-a11y-hidden");
            if (angular.element("#announceThisLive").length === 0) {
                $document.find('body').append(div);
            }

            $timeout(function () {
                angular.element("#announceThisLive").html("");
                angular.element("#announceThisLive").append("<div>" + message + "</div>");
            }, 100);
            if (timerB) {
                $timeout.cancel(timerB);
            }
            timerB = $timeout(function () {
                angular.element("body #announceThisLive").attr("aria-live", "off");
                angular.element("body #announceThisLive").attr("role", "presentation");
                $timeout(function () {
                    angular.element("body #announceThisLive").remove();
                }, 100);
            }, 5000);
        };
        return {
            alertMessage: alertMessage
        }
    };

    /*
     * The purpose of this directive is to allow only numbers.
     * @return transformedInput
     */
    var uitkNumbersOnly = function() {
        function link(scope, element, attr, ngModelCtrl) {
            function userInput(input) {
                if (input) {
                    //Replace all other characters with empty string
                    var transformedInput = input.replace(/[^0-9]/g, '');

                    if (transformedInput !== input) {
                        ngModelCtrl.$setViewValue(transformedInput); //Update the view value
                        ngModelCtrl.$render(); //Called as view needs to be updated
                    }
                    //Return transformedInput
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(userInput);
        };

        return {
            restrict: 'EA',
            require: 'ngModel', // get a hold of NgModelController
            link: link
        };
    };

    /**
     * uitkValidAttr
     * Helper service to add for attribute an element
     *
     * @returns {{link: link}}
     */
    var uitkValidAttr = function ($parse) {
        return {
            
            link: function (scope, ele, attrs) {
                attrs.uitkValidAttr = $parse(attrs.uitkValidAttr)(scope);
                if (attrs.uitkValidAttr.exp) {
                    ele.attr(attrs.uitkValidAttr.content.attr, attrs.uitkValidAttr.content.value);
                }
            }
        };
    };

    /**
     * To handle click events whose targets are outside of a particular dom element.
     * @param $document
     * @param $parse
     * @param $timeout
     * @returns {{restrict: string, link: Function}}
     */
    var uitkHandleExternalClickEvent = function($document, $parse, $timeout) {
        return {
            restrict: 'A',
            link: function(scope, elem, attr) {
                $timeout(function() {
                   var fn;
                   function eventHandler(e) {
                       if (!e || !e.target) {
                            return;
                       }
                       var targetsArr = elem.find(e.target.tagName );

                       //return and do nothing if the click event triggered from with in the dom element.
                       for (var i = 0; i < targetsArr.length; i++) {
                           if ( e.target === targetsArr[i] ) {
                               return;
                           }
                       }
                        //invoke the handler function when the click happened outside of the given dom element.
                        $timeout(function() {
                            fn = $parse(attr['uitkHandleExternalClickEvent']);
                            fn(scope);
                        });
                    }
                    $document.on('click', eventHandler);
                    scope.$on('$destroy', function() {
                        $document.off('click', eventHandler);
                    });

                });
            }
        };
    };
    uitkHandleExternalClickEvent.$inject = ["$document", "$parse", "$timeout"];

    uitkLiveRegionService.$inject = ["$timeout", "$document"];
    uitkValidAttr.$inject = ["$parse"];
    /**
     * @author Clint Small -> for dev questions :)
     * @module {uitk.uitkConfigs} This is configuration set for entire toolkit and can be adjusted for application requirements. 
     * This module will provide global tools required by the toolkit 
     */
    angular.module("uitk.uitkUtility", ["uitk.uitkConfigs"])
    .service("uitkEvents", uitkEvents)
    .service("uitkLogServiceProvider", uitkLogServiceProvider)
    .service("uitkExceptionService", uitkExceptionService)
    .service("$log", $logOverload)
    .service("uitkTools", uitkTools)
    .service("uitkLiveRegionService", uitkLiveRegionService)
    .filter("uitkTranslate", uitkTranslateFilter)
    .directive("uitkNumbersOnly", uitkNumbersOnly)
    .directive("uitkValidAttr", uitkValidAttr)
    .directive("uitkHandleExternalClickEvent", uitkHandleExternalClickEvent);
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.component.uitkAccordion', ['uitk.component.uitkSlideAnimation', 'uitk.component.uitkNavigable'])
	.directive(
	'uitkAccordion',
	["$timeout", "toggleActiveContent", function ($timeout, toggleActiveContent) {
		return {
			restrict: "E",
			replace: true,
			scope: {
				model: '='
			},
			templateUrl: function (element, attrs) {
				return attrs.templateUrl || 'template/uitk-accordion.html';
			},
			link: function (scope, element) {
				//set the selected Panel and index.
				scope.selectedIndex = 0;//default to 0
				//get the preselected index.
				scope.model.panels.forEach(function (panelItem, index) {
					if (panelItem.open === true) {
						scope.selectedIndex = index;
					}
				});
				/**
				 * Add support for navigating between panel header with arrow keys up and down
				 */
				element.on('keydown', function (event) {
					if (event.keyCode >= 37 && event.keyCode <= 40) {
						var selectorIndex = angular.element(event.target).data('panel-index');
						//When NVDA is on seems to be overriding keyCode 37
						if (event.keyCode === 38 || event.keyCode === 37) { //up
							if (selectorIndex > 0) {
								angular.element("#panel" + (selectorIndex - 1) + "_header").focus();
							}
						} else {//down
							if (scope.selectedIndex < scope.model.panels.length) {
								angular.element("#panel" + (selectorIndex + 1) + "_header").focus();
							}
						}
					}

				});

				/**
				 * Toggles the accordion panel open and close
				 *
				 * @param panelIndex {number} the index of the panel selected
				 */
				scope.togglePanel = function (panelIndex, event) {
					scope.selectedIndex = panelIndex;

					event.stopPropagation();
					/**
					 * Close all panels except panel key provided
					 *
					 * @param panel {object} a panel object
					 * @param key {number}
					 */
					scope.model.panels.forEach(function (panel, key) {
						if (key !== panelIndex) {
							panel.open = false;
							angular.element(document.querySelector('.content-active-header')).removeClass("content-active-header");
						}
					});
					scope.selectedPanel = scope.model.panels[panelIndex];
					scope.selectedPanel.open = !scope.selectedPanel.open;
					if (scope.selectedPanel.open) {
						/**
						 * legacy code that needs updating, to angular way.
						 */
						$timeout(function () {
							toggleActiveContent.toggleActive(element, 'tk-acrd-content-container', panelIndex);//set active content
						}, 0);
					}
				};
				/**
				 * Controls weather the tab is open or closed
				 *
				 * @param tabIndex {number} -
				 */
				scope.isOpenTab = function (tabIndex) {
					var selectedPanel = scope.model.panels[tabIndex];
					if (selectedPanel.open === true) {
						angular.element("#panel" + tabIndex + "_header").addClass("content-active-header");
					}
					return selectedPanel.open;
				};
				/**
				 *  executes callback function for links
				 *
				 * @param panelItem {object}
				 * @param panelIndex {number}
				 * @param event {object} - Dom Event Object
				 */
				scope.onLinkClick = function (panelItem, panelIndex, event) {
					event.stopPropagation();
					//scope.togglePanel(panelIndex, event);//TODO: This is there to be used for when we click on a link in a panel that is not this one we want to open it.
					if (panelItem.links[panelIndex].callBack) panelItem.links[panelIndex].callBack.call();//We are not binded to the call methods on the parent scope here we can all any provided method
				}

			}
		}
	}])
	.factory("toggleActiveContent", function () {
		return {
			/**
			 *
			 * Toggles the content as active and focus by adding active class.
			 * @param {type} element - need angular derived element to maintain the bindings & maintain state for unit test.
			 * @param {type} contentClass - class for which contains the content.
			 * @param {type} panelIndex - index in which we should make active.
			 */
			toggleActive: function (element, contentClass, panelIndex) {
				//make sure we have an active element
				if (angular.isNumber(panelIndex)) {
					angular.element('div.' + contentClass, element).removeClass("content-active");//clear out all active content classes
					angular.element(document.querySelector('.content-active-header')).removeClass("content-active-header");
					angular.element('div#panel' + panelIndex + '_content.' + contentClass, element).focus().addClass("content-active");
					angular.element("#panel" + panelIndex + "_header").addClass("content-active-header");
				}

			}
		}

	})
	.directive('uitkAccordionCompileLink', ["$compile", function ($compile) {
		return function ($scope, $element) {
			$compile($scope.panelLinks.text)($scope, function (clone) {
				if (!clone.selector) {
					$element.prepend(clone);
				}
				else {
					$element.prepend(clone.selector);
				}
			});
		};
	}]);



/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
(function () {

    var uitkAddressDirective = function () {
        return {
            restrict : "E",
            replace : "true",
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || 'template/uitk-address.html';
            },
            link: function($rootScope, element) {
                $rootScope.$on('$localeChangeSuccess', function () {
                    // reset all input values when changing language
                    element.find('input').val('');
                });

            }
        };
    };

    angular.module('uitk.component.uitkAddress', [
        'uitk.component.uitkTextField',
        'uitk.component.uitkLabel'
    ])
        .directive('uitkAddress', uitkAddressDirective);
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.component.hasPermission', ['uitk.uitkUtility']).directive(
		'hasAnyPermission',
		["Permissions", "uitkExceptionService", function(Permissions, uitkExceptionService) {

			function link(scope, element, attrs) {
				var permissionArr = attrs.hasAnyPermission.trim().split(",");
				var permPositiveValues = [];
				var permNegativeValues = [];

				_.forEach(permissionArr, function(permissionVal) {
					if (permissionVal[0] === '!') {
						permNegativeValues.push(permissionVal.slice(1).trim());
					} else {
						permPositiveValues.push(permissionVal.trim());
					}
				});

				function toggleVisibilityBasedOnPermission() {
					var permBool = false;

					if (permPositiveValues.length > 0) {
						permBool = Permissions
								.anyPermission(permPositiveValues);
					}
					if (permNegativeValues.length > 0) {
						permBool = permBool || !(Permissions
								.anyPermission(permNegativeValues));
					}

					if (permBool)
						element.show();
					else
						element.hide();
				}
				toggleVisibilityBasedOnPermission();
			};

			return {
				link : link
			};
		}]).directive(
		'hasAllPermissions',
		["Permissions", "uitkExceptionService", function(Permissions, uitkExceptionService) {

			function link(scope, element, attrs) {
				var permissionArr = attrs.hasAllPermissions.trim().split("&");
				var permPositiveValues = [];
				var permNegativeValues = [];

				_.forEach(permissionArr, function(permissionVal) {
					if (permissionVal[0] === '!') {
						permNegativeValues.push(permissionVal.slice(1).trim());
					} else {
						permPositiveValues.push(permissionVal.trim());
					}
				});

				function toggleVisibilityBasedOnPermission() {
					var permBool = false;

					if (permPositiveValues.length > 0) {
						permBool = Permissions
								.allPermissions(permPositiveValues);
					}
					if (permNegativeValues.length > 0) {
						permBool = permBool && !(Permissions
								.allPermissions(permNegativeValues));
					}

					if (permBool)
						element.show();
					else
						element.hide();
				}
				toggleVisibilityBasedOnPermission();
			};

			return {
				link : link
			};
		}]).factory('Permissions', function () {
		    var permissionList = {};
		    
		    function getIntersectionValues(permlist, perminput) {
		    	var permStr = [];
		    	_.forEach(permlist, function(permission){
		    		permStr.push(permission.name);
		    	});
		    	return _.intersection(permStr, perminput);
		    }
		    
		    return {
		      setPermissions: function(permissions) {
		        permissionList = permissions;
		      },
		      anyPermission: function (permissions) {
		    	return getIntersectionValues(permissionList, permissions).length > 0;
		      },
		      allPermissions: function(permissions) {
		    	return getIntersectionValues(permissionList, permissions).length === permissions.length;
		      },
		      hasAnyPermission: function(permissionList){
		    	    var permissionArr = permissionList.trim().split(",");
					var permPositiveValues = [];
					var permNegativeValues = [];

					_.forEach(permissionArr, function(permissionVal) {
						if (permissionVal[0] === '!') {
							permNegativeValues.push(permissionVal.slice(1).trim());
						} else {
							permPositiveValues.push(permissionVal.trim());
						}
					});

					var permBool = false;

					if (permPositiveValues.length > 0) {
						permBool = this.anyPermission(permPositiveValues);
					}
					if (permNegativeValues.length > 0) {
						permBool = permBool || !(this.anyPermission(permNegativeValues));
					}
					
					return !permBool;
		      },
		      hasAllPermissions: function(permissionList){
		    	    var permissionArr = permissionList.trim().split("&");
					var permPositiveValues = [];
					var permNegativeValues = [];

					_.forEach(permissionArr, function(permissionVal) {
						if (permissionVal[0] === '!') {
							permNegativeValues.push(permissionVal.slice(1).trim());
						} else {
							permPositiveValues.push(permissionVal.trim());
						}
					});
					
					var permBool = false;

					if (permPositiveValues.length > 0) {
						permBool = this.allPermissions(permPositiveValues);
					}
					if (permNegativeValues.length > 0) {
						permBool = permBool && !(this.allPermissions(permNegativeValues));
					}
					return !permBool;
		      }
		      
		   };
		  });

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.15.0
 */
angular.module('uitk.component.uitkAutocomplete',[])
.directive('uitkAutoComplete', ['$timeout', '$filter', function($timeout, $filter){
    return {
        restrict : 'E',
        scope: {
            id: '@',
            items: '=?', //optional in case onRefreshItems callback is undefined
            minLength: '@',
            model: '=',
            onSelect: '&',
            onBlur: '&',  //provided callback functionality for blur event.
            onFocus: '&', //provided callback functionality for focus event.
            readOnly:'=',
            disableInput:'=',
            onRefreshItems:'&?',
            name: '@'
        },
        replace: true,
        controller: ["$scope", function($scope){
            if(angular.isUndefined($scope.items)){
                $scope.items = [];
            };
            $scope.searchTriggered = false;
            $scope.current=-1;
            $scope.comboboxExpanded = false;
            $scope.filteredList = [];
        }],
        link: function(scope, elem, attr) {
            var defaultDescendantId = scope.id + "-listbox-opt-id"; //It's a default value
            scope.activeDescendantId = defaultDescendantId;

            /**
             * To get the filtered list only if searchTriggered is true and filtering happens on passed text
             * @param data actual items
             * @param textToBeFiltered, the value on the basis of which items will be filtered
             * @type {Array of filtered items}
             */
            var getFilteredList = function(data, textToBeFiltered){
                if(scope.searchTriggered){
                    return $filter('startWithfilter')(data, textToBeFiltered);
                }
                else{
                    return [];
                }
            };

            scope.extraClasses = attr['styleClass'];

            scope.handleSelection = function(selectedItem) {
                scope.model = selectedItem;
                scope.current = -1;
                scope.comboboxExpanded = false;
                $timeout(function() {
                    scope.onSelect();
                }, 100);
            };

            scope.selectedItem = function(index) {
                scope.activeDescendantId = scope.id + '_opt_' + index; //This is the naming pattern of the id of the individual option available in listbox.
            };

            scope.blurControl = function() {
                $timeout(function() {
                    scope.comboboxExpanded = false;
                    scope.activeDescendantId = defaultDescendantId;
                    scope.onBlur();
                }, 200);
            };

            /*
             * This method is used
             * 1. to show the comobobox suggestions if there are any when input element gets focus
             * 2. to call onFocus callback defined by the consumer
             */
            scope.focusControl = function(){
                 $timeout(function() {
                     if (scope.filteredList.length > 0){
                         scope.current = -1;
                         scope.modelChange(); //Trigger modelChange to display suggestions based on the value in the combobox.
                         scope.comboboxExpanded = true;
                         scope.onFocus();
                     }
                 }, 100);
             };

            scope.isCurrent=function(index){
                 return scope.current === index;
            };

            scope.setCurrent=function(index){
                 scope.current=index;
            };

            scope.serverSearchTerm="";
            scope.modelChange=function() {
                scope.current = -1;
                scope.activeDescendantId = defaultDescendantId;
                if(scope.model.length < scope.minLength){
                    scope.searchTriggered = false;
                }
                else{
                    scope.searchTriggered = true;

                    //Fetch data from server if the onRefreshItems callback is defined on the autocomplete directive
                    if (angular.isDefined(scope.onRefreshItems) && scope.model.length === Number(scope.minLength) && scope.serverSearchTerm !== scope.model) {
                        scope.serverSearchTerm = scope.model.slice(0);
                        scope.onRefreshItems()(scope); //Fix for DE112645
                        return;
                    }
                }
                scope.filteredList = getFilteredList(scope.items, scope.model);
            };

            /*
             * Deep watch on items array. If the items changes, so the filteredList.
             * This triggers an update on filtered list array if the items array changes
             */
            scope.$watch('items', function Listener(newItems, oldItems){
                if(newItems && newItems.length > 0){
                    scope.filteredList = getFilteredList(newItems, scope.model);
                }
            }, true);

            /*
             * Watch on Filtered List length. If it is greater than 0, then comboboxExpanded flag is set to true.
             * If it is not greater than 0, then comboboxExpanded flag is set to false.
             */
            scope.$watch('filteredList.length', function Listener(newValue, oldValue){
                if(newValue > 0){
                    scope.comboboxExpanded = true;
                }
                else {
                    scope.comboboxExpanded = false;
                }
            });

            var filteredListLength = 0;
            var strLen = 0;
            scope.keyNavigation = function(keyEvent) {
                filteredListLength = scope.filteredList.length;
                if(scope.model) {
                    strLen = scope.model.length;
                }

                if (strLen <= 0) {
                    scope.comboboxExpanded=false;
                }

                if (keyEvent.which === 40) { //down key
                    if (filteredListLength > 0 && strLen > 0 && scope.current + 1 !== filteredListLength) {
                        scope.current++;
                        scope.selectedItem(scope.current);

                    }
                    keyEvent.preventDefault();
                }
                else if (keyEvent.which === 38) { //up key
                    if (scope.current > 0) {
                        scope.current--;
                        scope.selectedItem(scope.current);
                    }
                    keyEvent.preventDefault();
                }
                else if (keyEvent.which === 13) { //Enter key
                    if (filteredListLength > 0 ) {
                        if (scope.current >= 0) {
                            scope.model = scope.filteredList[scope.current];
                            scope.current = -1;
                        }
                        scope.comboboxExpanded = false;
                        $timeout(function() {
                            scope.onSelect();
                        }, 100);
                    }
                }
                else if (keyEvent.which === 9) { //Tab key
                    if (filteredListLength > 1 && strLen > 0) {
                        scope.current = 0;
                    }
                    else {
                            scope.comboboxExpanded=false;
                    }
                }
                else  if (keyEvent.which === 222 && filteredListLength <= 1) { // Single Quote (') key
                    scope.comboboxExpanded=false;
                }

                /*scope.keyNavigationExtn = function(keyEvent) {
                    console.log('keyNavigationExtention');
                    //Tab key
                    if (keyEvent.which === 9) {
                        scope.current = -1;
                        scope.comboboxExpanded=false;
                    }
                };*/

                /*$timeout(function() {
                    if (scope.filteredList.length <= 0) {
                        scope.comboboxExpanded=false;
                    }
                }, 10);*/
            };
        },

        template: "<div >" +
                      "<input role='combobox' id='{{id}}_autocomplete' autocomplete='off'  aria-disabled='{{disableInput}}' aria-expanded='{{comboboxExpanded}}' aria-owns='{{id}}_flyoutList' aria-autocomplete='list' aria-activedescendant='{{activeDescendantId}}' ng-blur='blurControl()' ng-focus='focusControl()' type='text' class='tk-acom {{extraClasses}}' ng-model='model' name='{{name}}' ng-keydown='keyNavigation($event)' ng-change='modelChange()' ng-trim='false' ng-readonly='readOnly' ng-disabled='disableInput' />" +
                      "<div role='status' class='oui-a11y-hidden' id='{{id}}-log'>" +
                          "<div aria-atomic='true' aria-live='polite'>" +
                              "<!-- If the items are yet not fetched from server, 'O results displayed' to be announced -->" +
                              "<p ng-if='searchTriggered || comboboxExpanded'><span ng-bind-template='{{filteredList.length}} {{\"results displayed.\"}}'></span></p>" +
                          "</div>" +
                      "</div>" +
                      "<div id='{{id}}_flyoutList' role='listbox' tabindex='0' class='tk-acom-items {{extraClasses}}' ng-show='comboboxExpanded'>" +
                          "<div role='option' id='{{id}}_opt_{{$index}}' tabindex='-1' class='tk-acom-item' ng-repeat='item in filteredList track by $index' ng-click='handleSelection(item)' ng-class='{tkAcomActive:isCurrent($index)}' aria-selected='{{isCurrent($index)}}' ng-mouseenter='setCurrent($index); selectedItem($index)'>{{item}}</div>" +
                      "</div>" +
                  "</div>"
    };
}])
.filter('startWithfilter', function() {   
    function strStartsWith(str, prefix) {
        return (str+"").indexOf(prefix) === 0;
    }

    return function( items, model) {
        var filtered = [];
        angular.forEach(items, function(item) {
            if(strStartsWith(angular.lowercase(item), angular.lowercase(model))) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
(function () {

    /**
     * Primary directive for the bar chart component.
     *
     */

    var uitkBarChartDirective = function ($window, uitkExceptionService, dialogService) {
        return{
            restrict: 'E',
            replace: 'true',
            scope: {
                viewModel : '='
            },
            link: function (scope, element, attrs){

                var LABEL_PADDING_DESKTOP = 7;
                var LABEL_PADDING_TABLET = 11;
                var EXTRA_MARGIN_TABLET = 16;
                var TABLET_SCREEN_SIZE = 992;

                scope.isOpened = dialogService;

                //Throw exception if id is not defined
                if(!scope.viewModel.id){
                    uitkExceptionService.throwException(
                        'InvalidIdException',
                        'Id is required attribute'
                    );
                }

                //Chart type is mandatory
                if(scope.viewModel.chartType !== 'horizontal' && scope.viewModel.chartType !== 'vertical'){
                    uitkExceptionService.throwException(
                        'NoChartTypeException',
                        'Chart type is mandatory'
                    );
                    return;
                }

                if(scope.viewModel.decimalPlaces === undefined){
                    scope.viewModel.decimalPlaces = 2;
                }

                //Set defaults for the chart label and description if not provided
                scope.viewModel.heading = scope.viewModel.heading || scope.viewModel.id;
                scope.viewModel.description = scope.viewModel.description
                                              || 'This is a ' + scope.viewModel.chartType + ' chart component.';

                //Default width
                if(!scope.viewModel.width){
                   scope.viewModel.width = 600;
                }

                //Default height
                if(!scope.viewModel.height){
                    scope.viewModel.height = 400;
                }

                /**
                 * Show the simple data dialog for this chart
                 */
                scope.contentKeyupHandler = function() {
                    scope.showMe = true;
                };

                /**
                 * Hide the simple data dialog for this chart
                 */
                scope.callBackHideDialog = function() {
                    scope.showMe = false;
                    scope.isOpened.dialogOpened=false;
                    angular.element('#'+scope.viewModel.id+'_dialog_openModalBtn').focus();
                };

                scope.mouseover = function(){
                    var tooltipElement = angular.element(".nvtooltip.xy-tooltip.nv-pointer-events-none");
                    if(tooltipElement.length !== 0){
                        tooltipElement.attr("aria-hidden","true");
                        scope.setAriaHidden = true;
                    }
                }
                
                //Watch model data
                scope.$watch('data', function (data){
                    nv.addGraph(function() {
                        var chart;

                        //Check for horizontal or vertical bar chart
                        if (scope.viewModel.chartType === 'horizontal'){
                            chart = nv.models.multiBarHorizontalChart().groupSpacing(0.38)
                                .showValues(scope.viewModel.showValues);
                        }
                        else if (scope.viewModel.chartType === 'vertical'){
                            chart = nv.models.multiBarChart().groupSpacing(0.38)
                                .reduceXTicks(scope.viewModel.reduceXTicks)

                        }

                        //Chart options
                        chart.showControls(scope.viewModel.showControls)
                            .showLegend(scope.viewModel.showLegend)
                            .duration(scope.viewModel.duration ? scope.viewModel.duration : 100);

                        //Chart styles
                        if(scope.viewModel.margin) {
                            chart.margin(scope.viewModel.margin);
                        }

                        //X and Y axis content and formats. Content and formats can be customized by consumer.
                        if(typeof scope.viewModel.xContent === 'function') {
                            chart.x(function(d) {
                                return scope.viewModel.xContent(d);
                            });
                        } else {
                            chart.x(function(d) {
                                return d.label;
                            });
                        }

                        if(typeof scope.viewModel.yContent === 'function') {
                            chart.y(function(d) {
                                return scope.viewModel.yContent(d);
                            });
                        } else {
                            chart.y(function(d) {
                                return d.value;
                            });
                        }

                        //Y axis format
                        if(typeof scope.viewModel.yAxisFormat === 'function') {
                            chart.yAxis.tickFormat(scope.viewModel.yAxisFormat());
                        }

                        //X axis format
                        if(typeof scope.viewModel.xAxisFormat === 'function') {
                            chart.xAxis.tickFormat(scope.viewModel.xAxisFormat());
                        }

                        //Customize labels
                        chart.xAxis.axisLabel(scope.viewModel.xAxisLabel);
                        chart.yAxis.axisLabel(scope.viewModel.yAxisLabel);

                        //Padding for desktop
                        chart.yAxis.tickPadding(LABEL_PADDING_DESKTOP);
                        chart.xAxis.tickPadding(LABEL_PADDING_DESKTOP);

                        //Set margin
                        if(scope.viewModel.margin) {
                            var leftMargin = scope.viewModel.margin.left;
                            var leftMarginTab = scope.viewModel.margin.left + EXTRA_MARGIN_TABLET;
                        }

                        //Padding for tablet
                        if($window.innerWidth < TABLET_SCREEN_SIZE){
                            chart.yAxis.tickPadding(LABEL_PADDING_TABLET);
                            chart.xAxis.tickPadding(LABEL_PADDING_TABLET);

                            updateLeftMargin(leftMarginTab, chart);
                        }

                        //Customize tooltip content
                        if(typeof scope.viewModel.tooltipContent === 'function') {
                            chart.tooltip.contentGenerator(function(key, x, y, e, graph) {
                                return scope.viewModel.tooltipContent(key, x, y, e, graph);
                            });
                        }

                        //Enable/disable tooltips
                        chart.tooltip.enabled(scope.viewModel.tooltips);

                        //Set height and width of bar chart
                        chart.width(scope.viewModel.width).height(scope.viewModel.height);
                        //Set min width and height for div
                        angular.element('#'+scope.viewModel.id)
                            .css({'min-width':scope.viewModel.width, 'min-height':scope.viewModel.height});

                        //Any additional options if user would like to set
                        if(typeof scope.viewModel.chartOptions === 'function'){
                            scope.viewModel.chartOptions(chart);
                        }

                        //Event listener on window resize. This cannot be doable through CSS.
                        angular.element($window).on('resize', function (){
                            if($window.innerWidth < TABLET_SCREEN_SIZE){
                                chart.yAxis.tickPadding(LABEL_PADDING_TABLET);
                                chart.xAxis.tickPadding(LABEL_PADDING_TABLET);

                                updateLeftMargin(leftMarginTab, chart);
                            }
                            else{
                                chart.yAxis.tickPadding(LABEL_PADDING_DESKTOP);
                                chart.xAxis.tickPadding(LABEL_PADDING_DESKTOP);

                                updateLeftMargin(leftMargin, chart);
                            }
                        });

                        //Invoke d3 with chart options and data
                        d3.select('#' + scope.viewModel.id +' svg').datum(scope.viewModel.data)
                            .attr('width', scope.viewModel.width)
                            .attr('height', scope.viewModel.height)
                            .call(chart);

                        nv.utils.windowResize(chart.update);

                        return chart;
                    });
                });

                //Update left margin to adjust extra space between desktop and tablet
                function updateLeftMargin(leftMargin, chart){
                    if(scope.viewModel.margin) {
                        scope.viewModel.margin.left = leftMargin;
                        chart.margin(scope.viewModel.margin);
                    }
                }
            },
            templateUrl: 'template/uitkBarChartTemplate.html'
        };
    };

    uitkBarChartDirective.$inject = ['$window','uitkExceptionService', 'dialogService'];

    angular.module('uitk.component.uitkBarChart', ['uitk.component.uitkButton','uitk.component.uitkDialog','uitk.uitkUtility'])
        .directive('uitkBarChart', uitkBarChartDirective);
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
/**
 * Created by ksutariy on 2/24/2016.
 */

(function () {
    var uitkBreadcrumbDirective = function($sce, $timeout, uitkExceptionService,$parse,$compile){
        return {
            restrict : 'E',
            replace : true,
            transclude : false,
            controller: ["$scope", "$element", function($scope,$element){

            }],
            link: function(scope, element) {
                //Throw exception if id is not defined
                if(!scope.viewModel.id){
                    uitkExceptionService.throwException('InvalidIdException','Id is required attribute');
                }

                //calculate total linksLength
                scope.linksLength = scope.viewModel.links.length;
                scope.showAllItems = true;

                //This function is used to display all items on click of ellipsis([...]) link
                scope.show = function(){
                    scope.showAllItems = true;
                    $timeout(function(){
                        angular.element('li a').eq(scope.maxLinks - 2).focus();
                    });
                };

                //Calculate linksLength when viewModel gets change
                scope.$watch('viewModel.links', function(old,newValue){ /// the application of scope.watch must have
                    if(newValue!==old){                                 /// two paramaters must be used : functon(oldVal,newVal)
                        scope.linksLength = newValue.length;           //// - I added it to make the code testable - Emil
                        scope.showEllipses();
                    }
                },true);

                //This function dynamically calculates width of each element and displays ellipses if required
                scope.showEllipses = function(){
                    scope.showAllItems = true;
                    $timeout(function(){

                        var elementWidth = element[0].getBoundingClientRect().width;
                        var liElements = element.find('li');
                        var lastLiIndex = scope.viewModel.links.length - 1;

                        var array = new Array();
                        _.forEach(liElements, function(element){
                            array.push(element.getBoundingClientRect());
                        });

                        var index = 2;

                        var widthSum = array[0].width + array[1].width + array[lastLiIndex].width + array[lastLiIndex-1].width + 48; //48px for ellipses
                        while(widthSum < elementWidth && index <= lastLiIndex-2){
                            widthSum = widthSum + array[index].width;
                            index = index + 1;
                        }
                        if((scope.viewModel.links.length == 4) || (index == scope.viewModel.links.length - 2 && widthSum < elementWidth)){
                            scope.showAllItems = true;
                        } else {
                            scope.maxLinks = index+1;
                            scope.showAllItems = false;
                        }
                    });
                }
                scope.showEllipses();
            },
            scope : {
                viewModel:"="
            },
            templateUrl: 'template/uitk-breadcrumb.html'
        };
    };

    var uitkCompileTemplates = function($compile, $parse){
        return {
            link: function(scope, element, attr){
                 scope.template =  $compile(attr.uitkCompileTemplates)(scope);
                element.html(scope.template);
            }
        }
    };
    uitkCompileTemplates.$inject = ["$compile", "$parse"];

    uitkBreadcrumbDirective.$inject = ['$sce','$timeout','uitkExceptionService','$parse','$compile'];

    angular.module('uitk.component.uitkBreadcrumb',['uitk.uitkUtility'])
        .directive('uitkBreadcrumb', uitkBreadcrumbDirective)
        .directive('uitkCompileTemplates', uitkCompileTemplates);
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.component.uitkButton', [])
	.directive('uitkButton', function () {
		return {
			restrict: 'E',
			replace: true,
			scope: true,
            transclude: true,
			link: function ($scope, $element, $attrs) {
                $scope.value = $attrs["value"];
				$scope.enableDefault = $attrs["enableDefault"];
				$scope.customClass = $attrs["customClass"];

				if (navigator.userAgent.match(/iPad/i) === 'iPad' || navigator.userAgent.match(/Android/i) === 'Android') {
					$scope.isTablet = 'true';
					$element.bind('touchstart', function () {
						$element.addClass('tk-btn-active');
					});

					$element.bind('touchend', function () {
						$element.removeClass('tk-btn-active');
					});
				}
			},

            template: "<button  class=\"{{enableDefault == 'true' ? 'tk-btn-default-action' : 'tk-btn'}} {{isTablet == 'true' ? 'tk-btn-tablet' : ''}}  {{customClass}} \"  >" +
            " <ng-transclude></ng-transclude>{{value}}</button>"
		};
	})
	/*
	 * This directive is used instead of ng-disabled,
	 * ng-disabled directive is removing and adding element in DOM which is creating problem for a11y.
	 *
	 */
	.directive('uitkBtnDisabled', ["$timeout", function ($timeout) {
		return {
			restrict: 'A',
			scope: true,
			link: function (scope, element, attributes) {
				scope.isDisabled = false;
				//Add/remove styles and aria attributes when button is enabled
				scope.enableButton = function () {
					element.removeClass('tk-btn-disabled');
					element.attr('aria-disabled', 'false');
					scope.isDisabled = true;
				}

				//Add/remove styles and aria attributes when button is disabled
				scope.disableButton = function () {
					element.addClass('tk-btn-disabled');
					element.attr('aria-disabled', 'true');
					scope.isDisabled = false;
				}

				//To stop propogating ng-click event when button is disabled
				element[0].addEventListener('click', function (event) {
					if (!scope.isDisabled) {
						event.preventDefault();
						event.stopImmediatePropagation();
					}
				}, true);

				//If the value of uitk-disabled directive is string
				if (attributes.uitkBtnDisabled === 'true') {
					$timeout(function () {
						scope.disableButton();
					});
				}
				else if (attributes.uitkBtnDisabled === 'false') {
					scope.enableButton();
				}
				//If value of uitk-disabled directive is expression then keep watch on that
				else {
					scope.$watch(attributes.uitkBtnDisabled, function (value) {
						if (value === true) {
							$timeout(function () {
								scope.disableButton();
							});
						}
						if (value === false) {
							scope.enableButton();
						}
						if (value === undefined) {
							scope.isDisabled = true;
						}
					});
				}

			}
		}
	}]);

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
/*!
 * calendar is an Angular.js Date/Time picker directive.
 * https://github.com/adamalbrecht/ngQuickDate/blob/master/LICENSE.txt
 * Copyright (c) 2010-2013 Adam Albrecht and other contributors.
 */
(function() {
    var app = angular.module("uitk.component.uitkCalendar", ['uitk.uitkUtility']);
    app.provider("uitkCalendarDefaults", function() {
        return {
            options: {
                dateFormat: 'dd/mm/yyyy',
                dateFormatDisplayTip: 'mm-dd-yyyy',
                timeFormat: 'h:mm a',
                labelFormat: null,
                placeholder: '',
                hoverText: null,
                disableTimepicker: true,
                disableClearButton: false,
                defaultTime: null,
                weekdayDay: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayAbbreviations: [ ["Sun","Sunday"], ["Mon","Monday"], ["Tue","Tuesday"], ["Wed","Wednesday"], ["Thu","Thursday"], ["Fri","Friday"], ["Sat","Saturday"] ],
                monthsList:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
                monthsListLong:["January","February","March","April","May","June","July","August","September","October","November","December"],
                minYear:'1900',
                maxYear:'2019',
                textFieldClassName: 'textField',
                validationErrorsMap:{"requiredMessage":"Date is required.","invalidFormatMessage":"Invalid date format.","outOfRangeMessage":"Date must be between ","invalidDateMessage":"Invalid date."},
                dateFilter: null,

                /**uitk
                 * Parse param string into valid date string
                 * @param str - date string
                 * @returns date object
                 */
                parseDateFunction: function(str, dateFormat) {
                    var delimiter;
                    if(str && str.length && str.indexOf("-") > 0) {
                        delimiter = '-';
                    }
                    if(str && str.length && str.indexOf("/") > 0) {
                        delimiter = '/';
                    }
                    if(str.length === 10 && delimiter) {
                        var parts = str.split(delimiter), parsedDate;
                        if(dateFormat === 'yyyy-mm-dd') {
                            parsedDate = new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
                        } else if(dateFormat === 'dd/mm/yyyy') {
                            parsedDate = new Date(parts[2], parts[1]-1, parts[0]); // Note: months are 0-based
                        } else {
                            parsedDate = new Date(parts[2], parts[0]-1, parts[1]); // Note: months are 0-based
                        }
                        // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])

                        return parsedDate;
                    }
                    var seconds;
                    seconds = Date.parse(str);
                    if (isNaN(seconds)) {
                        return null;
                    } else {
                        return new Date(seconds);
                    }
                } // ends parseDateFunction
            },
            $get: function() {
                return this.options;
            },
            set: function(keyOrHash, value) {
                var k, v, _results;
                if (typeof keyOrHash === 'object') {
                    _results = [];
                    for (k in keyOrHash) {
                        if(keyOrHash.hasOwnProperty(k)) {
                            v = keyOrHash[k];
                            _results.push(this.options[k] = v);
                        }
                    }
                    return _results;
                } else {
                    return this.options[keyOrHash] = value;
                }
            }
        };
    });

    app.filter('mydate', function() {
        //Format date as: MM-dd-yyyy
        return function (number) {
            if (!number) { return ''; }
            number = String(number.trim());
            var formattedNumber = number;

            var m = number.substring(0,2);
            var d = number.substring(2, 4);
            var y = number.substring(4, 8);
            if (d) {
                formattedNumber = (m + "-" + d);
            }
            if (y) {
                formattedNumber += ("-" + y);
            }
            return formattedNumber;
        };
    });

    app.directive("uitkCalendar", [
        'uitkCalendarDefaults', '$filter', '$sce', '$interpolate', '$rootScope', function(uitkCalendarDefaults, $filter, $sce, $interpolate, $rootScope) {
            return {
                restrict: "E",
                require: "?ngModel",
                scope: {
                    dateFilter: '=?',
                    onChange: "&",
                    required: '@', // Required attribute kept as is for backward compatibility
                    id: '@',
                    labelledBy: '@',
                    viewModel:"=?" // viewModel for configuring validations. TODO:: Move all the attributes to viewModel in future

                    /**viewModel - below are the possible properties and their corresponding uses
                     *      required - boolean property for required validation
                     *      invalid - property which stores field's validity
                     *      errorMessage - string which stores the error message for the component
                     *      requiredMessage - property(optional) through which consumers can configure the required error message.
                     *      invalidFormatMessage - property(optional) through which consumers can configure the invalid format error message
                     *      outOfRangeMessage - property(optional) through which consumers can configure the date out of range error message
                     *      invalidDateMessage - property(optional) through which consumers can configure the invalid date error message
                     *      dateText - modal bound to the date input field.
                     *      displayTipId - customizable input tip ID that will be used for aria-describedby attribute if it's provided
                     *      displayTipText - allows the user to set custom Tip text
                     *      supressAriaDescribedBy - allows end-user to turn off the aria-describedby functionality and keep attr from displaying in the html
                     */
                },
                replace: true,
                templateUrl: function (element, attrs) {
                    return attrs.templateUrl || 'template/uitk-calendar.html';
                },
                link: function(scope, element, attrs, ngModelCtrl) {
                    var datepickerClicked, datesAreEqual, datesAreEqualToMinute, getDaysInMonth, initialize,
                        parseDateString, refreshView, setCalendarDate, setConfigOptions, setInputFieldValues,
                        setupCalendarView, stringToDate;


                    if(scope.viewModel) {
                        scope.viewModel.enableValidation = scope.viewModel.enableValidation || false;
                        scope.viewModel.layout = scope.viewModel.layout || "vertical";
                    } else {
                        scope.viewModel = {};
                        scope.viewModel.enableValidation = false;
                        scope.viewModel.layout = "vertical";
                    }

                    /**
                     * populates the years drop down in the calendar view.
                     */
                    var populateYears  = function(){
                        //Allow user to override the provider defaults for min and max years.
                        scope.minYear = scope.viewModel.minYear || scope.minYear;
                        scope.maxYear = scope.viewModel.maxYear || scope.maxYear;

                        // dates takes precedence of min/max years, Need to do validation on min/max dates
                        scope.minDate = scope.viewModel.minDate || scope.minDate;
                        scope.maxDate = scope.viewModel.maxDate || scope.maxDate;

                        if ( typeof scope.minDate !== 'undefined' && typeof scope.maxDate !== 'undefined' ) {
                            var strMinDate = scope.minDate.split('-');
                            var strMaxDate = scope.maxDate.split('-');
                            var minYear = parseInt(strMinDate[2], 10);
                            var maxYear = parseInt(strMaxDate[2], 10);
                            if(!isNaN(minYear) && !isNaN(maxYear)) {
                                scope.minYear = minYear;
                                scope.maxYear = maxYear;
                            }

                            var isValidMinDate = scope.isValidDate(scope.minDate);
                            // isValidDate checks both min and max date,
                            // will fail if either is false
                            if ( isValidMinDate === false ) {
                                scope.viewModel.errorMessage = "Invalid min or max date provided in view model.";
                                return;
                            }
                        }

                        for(var i=Number(scope.minYear);i<=scope.maxYear;i++){
                            scope.years.push(i);
                        }
                    };


                    $rootScope.$on('$localeChangeSuccess', function () {
                        initialize();
                    });

                    scope.$watch('viewModel.minYear', function(newValue, oldValue) {
                        scope.years.length = 0;
                        populateYears();
                    });

                    scope.$watch('viewModel.maxYear', function(newValue, oldValue) {
                        scope.years.length = 0;
                        populateYears();
                    });

                    scope.$watch('viewModel.dateText', function(newVal, oldVal) {
                        if ( newVal && newVal.length == 10 ) {
                            var isValid = scope.isValidDate(newVal);
                            if ( isValid ) {
                                var date = parseDateString(newVal);
                                if ( typeof scope.minDate !== 'undefined' ) {
                                    var minDateObj = parseDateString(scope.minDate);
                                    if (date < minDateObj) {
                                        scope.invalid = true;
                                    }
                                }
                                if (  typeof scope.maxDate !== 'undefined' ) {
                                    var maxDateObj = parseDateString(scope.maxDate);

                                    if ( date > maxDateObj ) {
                                        scope.invalid = true;
                                    }
                                }
                            }
                        }

                    });

                    scope.viewModel = scope.viewModel || {};
                    scope.viewModel.required = scope.required || scope.viewModel.required;
                    scope.displayTipId = scope.viewModel.displayTipId || scope.id;
                    scope.viewModel.disabled = !!scope.viewModel.disabled;


                    if ( scope.viewModel.iconCalendar === false ) {
                        scope.viewModel.iconCalendar = false;
                    }
                    else {
                        scope.viewModel.iconCalendar = true;
                    }

                    scope.applyLocalization = function() {
                        var newDatePattern = $interpolate("{{'date_pattern' | uitkTranslate}}")();
                        if(newDatePattern === 'date_pattern') {
                            newDatePattern = $interpolate("{{'mm-dd-yyyy' | uitkTranslate}}")();
                        } else {
                            newDatePattern = $interpolate("{{'date_pattern' | uitkTranslate}}")();
                        }
                        scope.dateFormat = newDatePattern;
                        scope.dateFormatDisplayTip = newDatePattern;
                        scope.displayTipText = newDatePattern;
                        scope.displayTipText = $sce.trustAsHtml(scope.viewModel.displayTipText) || $sce.trustAsHtml('<span class="oui-a11y-hidden">Format &nbsp;</span>' + scope.dateFormat);
                        scope.labelFormat = newDatePattern;
                        scope.formatGivenDate(scope.viewModel.dateText);
                    }

                    initialize = function() {
                        var templateDate;
                        setConfigOptions();
                        scope.toggleCalendar(false);
                        scope.weeks = [];
                        scope.years = [];
                        scope.inputDate = null;
                        scope.inputTime = null;
                        scope.invalid = true;

                        if (typeof attrs.initValue === 'string') {
                            ngModelCtrl.$setViewValue(attrs.initValue);
                        }
                        if (!scope.defaultTime) {
                            templateDate = new Date(2013, 0, 1, 12, 0);
                            scope.datePlaceholder = scope.formatGivenDate(templateDate);
                        }
                        setCalendarDate();
                        scope.selectedYear = scope.calendarDate.getFullYear();
                        scope.selectedMonth = scope.monthsList[scope.calendarDate.getMonth()];
                        scope.selectedMonthLong = scope.monthsListLong[scope.calendarDate.getMonth()];

                        if ((scope.id !== undefined) && (scope.id !== '')){
                            scope.inputCompId = scope.id.trim();
                        } else {
                            scope.inputCompId = 'input_'+randomId(6);
                        }
                        scope.textFieldClassName = scope.viewModel.textFieldClassName || scope.textFieldClassName;
                        populateYears();
                        scope.applyLocalization();
                        return refreshView();
                    };

                    /**
                     * sets the text for aria-describedby attribute on the calendar
                     * if it doesnt have a value then it returns 'undefined' so the attribute doesnt show up in the html and invalidate it
                     */
                    scope.getAriaDescribedBy = function () {
                        if(!scope.viewModel.supressAriaDescribedBy) {
                            scope.ariaDescribedByIds = '';
                            scope.ariaDescribedByTipId = scope.viewModel.displayTipId || scope.id; // will either be the custom tip ID defined in the viewModel or the ID attr defined on the calendar component

                            if(scope.viewModel.invalid === true){ // For fields with format or validation errors
                                scope.ariaDescribedByIds = scope.id + "_err";
                            }
                            if(scope.ariaDescribedByTipId) { // input tip id
                                scope.ariaDescribedByIds += " "+ scope.ariaDescribedByTipId + "_tip";
                            }
                            return scope.ariaDescribedByIds ? scope.ariaDescribedByIds : undefined;
                        } else {
                            return undefined;
                        }
                    };

                    /**
                     * disables the previous and next links if minimum or maximum allowed month and year are selected.
                     **/
                    scope.checkPrevAndNextMonthStatus=function(){
                        scope.disablePrevMonthSelection = false;
                        scope.disableNextMonthSelection=false;

                        if((scope.selectedYear < scope.minYear) ||(scope.selectedYear === scope.years[0] && scope.monthsList[0] === scope.selectedMonth) ){
                            scope.disablePrevMonthSelection = true;
                        }

                        if((scope.selectedYear > scope.maxYear) ||(scope.selectedYear === scope.years[scope.years.length-1] && scope.monthsList[11] === scope.selectedMonth) ){
                            scope.disableNextMonthSelection = true;
                        }
                    };

                    setConfigOptions = function() {
                        var key, value;
                        for (key in uitkCalendarDefaults) {
                            if(uitkCalendarDefaults.hasOwnProperty(key)) {
                                value = uitkCalendarDefaults[key];
                                if (!scope[key] && attrs[key]) {
                                    scope[key] = attrs[key];
                                } else if (!scope[key]) {
                                    scope[key] = value;
                                }
                            }
                        }

                        if (!scope.labelFormat) {
                            scope.labelFormat = scope.dateFormat;
                            if (!scope.disableTimepicker) {
                                scope.labelFormat += " " + scope.timeFormat;
                            }
                        }

                    };

                    datepickerClicked = false;

                    window.document.addEventListener('click', function() {
                        if (scope.calendarShown && !datepickerClicked) {
                            scope.toggleCalendar(false);
                            scope.$apply();
                        }

                        return datepickerClicked = false;
                    });

                    angular.element(element[0])[0].addEventListener('click', function() {
                        return datepickerClicked = true;
                    });

                    /**
                     * Update the model and calendar view
                     * @returns {boolean|FormController.$invalid|*|ngModel.NgModelController.$invalid|context.ctrl.$invalid}
                     */
                    refreshView = function() {
                        var date = ngModelCtrl.$modelValue ? parseDateString(ngModelCtrl.$modelValue) : null;
                        setupCalendarView();
                        setInputFieldValues(date);//mainButtonStr
                        scope.checkPrevAndNextMonthStatus();
                        scope.viewModel.dateText = date ? scope.formatGivenDate(date) : scope.placeholder;
                        scope.getAriaDescribedBy();
                        //scope.applyLocalization();
                        return scope.invalid = ngModelCtrl.$invalid;
                    };

                    setInputFieldValues = function(val) {
                        if (val != null) {
                            scope.inputDate = $filter('date')(val, scope.dateFormat);
                            return;
                        } else {
                            scope.inputDate = null;
                            return;
                        }
                    };

                    setCalendarDate = function(val) {
                        // val is in format ("mm-dd-yyyy")
                        // we need to conver to format "yyyy-mm-dd"

                        if ( typeof val !== 'undefined' && val !== null ) {
                            var d = new Date(val), composedDate, strDate;
                            if(scope.dateFormat === 'yyyy-mm-dd' && d.toString() === "Invalid Date") {
                                strDate = val.toString().split('-');

                                // The Date needs to be in this format "2012-11-02T00:00:00.000Z"
                                composedDate = new Date(strDate[0] +"-" + strDate[1] + "-" + strDate[2] + "T00:00:00.000Z");
                                return scope.calendarDate = composedDate;

                            } else if(scope.dateFormat === 'dd/mm/yyyy' && d.toString() === "Invalid Date") {
                                strDate = val.toString().split('/');
                                // The Date needs to be in this format "2012-11-02T00:00:00.000Z"
                                composedDate = new Date(strDate[2] +"-" + strDate[1] + "-" + strDate[0] + "T00:00:00.000Z");
                                return scope.calendarDate = composedDate;
                            } else if (d.toString() === "Invalid Date") {
                                strDate = val.toString().split('-');
                                // The Date needs to be in this format "2012-11-02T00:00:00.000Z"
                                composedDate = new Date(strDate[2] +"-" + strDate[0] + "-" + strDate[1] + "T00:00:00.000Z");
                                return scope.calendarDate = composedDate;
                            }
                            else {
                                return scope.calendarDate = d;
                            }
                        }
                        else {
                            return scope.calendarDate = new Date();
                        }

                    };

                    setupCalendarView = function() {
                        var curDate, d, daysInMonth, numRows, offset, row, selected, time, today, weeks, _i, _j, _ref;
                        daysInMonth = getDaysInMonth(scope.calendarDate.getFullYear(), scope.calendarDate.getMonth());
                        weeks = [];
                        curDate = new Date(scope.calendarDate.getFullYear(),scope.calendarDate.getMonth(),1);
                        offset = curDate.getDay();
                        numRows = Math.ceil((offset + daysInMonth) / 7);
                        curDate.setDate(curDate.getDate() + (offset * -1));
                        for (row = _i = 0, _ref = numRows - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; row = 0 <= _ref ? ++_i : --_i) {
                            weeks.push([]);

                            for (_j = 0; _j <= 6; ++_j) {

                                d = new Date(curDate);
                                if (scope.defaultTime) {
                                    time = scope.defaultTime.split(':');
                                    d.setHours(time[0] || 0);
                                    d.setMinutes(time[1] || 0);
                                    d.setSeconds(time[2] || 0);
                                }
                                selected = ngModelCtrl.$modelValue && d && datesAreEqual(d, ngModelCtrl.$modelValue);
                                today = datesAreEqual(d, new Date());
                                weeks[row].push({
                                    date: d,
                                    selected: selected,
                                    disabled: typeof scope.dateFilter === 'function' ? !scope.dateFilter(d) : false,
                                    other: d.getMonth() !== scope.calendarDate.getMonth(),
                                    today: today
                                });
                                curDate.setDate(curDate.getDate() + 1);
                            }
                        }
                        return scope.weeks = weeks;
                    };

                    ngModelCtrl.$parsers.push(function(viewVal) {
                        if (scope.required && (viewVal == null)) {
                            ngModelCtrl.$setValidity('required', false);
                            return null;
                        } else if (angular.isDate(viewVal)) {
                            ngModelCtrl.$setValidity('required', true);
                            return viewVal;
                        } else if (angular.isString(viewVal)) {
                            ngModelCtrl.$setValidity('required', true);
                            return scope.parseDateFunction(viewVal, scope.dateFormat);
                        } else {
                            return null;
                        }
                    });

                    ngModelCtrl.$formatters.push(function(modelVal) {
                        if (angular.isDate(modelVal)) {
                            return modelVal;
                        } else if (angular.isString(modelVal)) {
                            return scope.parseDateFunction(modelVal, scope.dateFormat);
                        } else {
                            return;
                        }
                    });

                    stringToDate = function(date) {
                        if (typeof date === 'string') {
                            return parseDateString(date);
                        } else {
                            return date;
                        }
                    };

                    parseDateString = uitkCalendarDefaults.parseDateFunction;

                    datesAreEqual = function(d1, d2, compareTimes) {
                        if (compareTimes == null) {
                            compareTimes = false;
                        }
                        if (compareTimes) {
                            return (d1 - d2) === 0;
                        } else {
                            d1 = stringToDate(d1);
                            d2 = stringToDate(d2);
                            var objectsAreEqual =  d1 && d2;
                            var valuesAreEqual = (d1.getYear() === d2.getYear()) && (d1.getMonth() === d2.getMonth()) && (d1.getDate() === d2.getDate());
                            return objectsAreEqual && valuesAreEqual;
                        }
                    };

                    datesAreEqualToMinute = function(d1, d2) {
                        if (!(d1 && d2)) {
                            return false;
                        }
                        return parseInt(d1.getTime() / 60000, 10) === parseInt(d2.getTime() / 60000, 10);
                    };

                    /**
                     * To get the number of days in month for the given year.
                     * @param year Year Value
                     * @param month, the month value should be as per 0 based index. For Jan, expected value is 0.
                     * @type {Number} Number of days in the month
                     */
                    getDaysInMonth = function(year, month) {
                        var y = Number(year);
                        var m = Number(month);
                        return [31, ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m];
                    };

                    ngModelCtrl.$render = function() {
                        if ( ngModelCtrl.$viewValue !== 'undefined') {
                            setCalendarDate(ngModelCtrl.$viewValue);
                        }
                        return refreshView();
                    };

                    ngModelCtrl.$viewChangeListeners.unshift(function() {
                        setCalendarDate(ngModelCtrl.$viewValue);
                        refreshView();
                        if (scope.onChange) {
                            return scope.onChange();
                        }
                    });



                    scope.toggleCalendar = _.debounce(function(show) {
                        if (isFinite(show)) {
                            scope.calendarShown = show;
                        } else {
                            scope.calendarShown = !scope.calendarShown;
                        }
                        if(!scope.$$phase) {
                            scope.$digest();
                        }
                    }, 150);

                    scope.selectDate = function(date, closeCalendar) {
                        if (closeCalendar == null) {
                            closeCalendar = true;
                        }
                        if (typeof scope.dateFilter === 'function' && !scope.dateFilter(date)) {

                            return false;
                        }
                        ngModelCtrl.$setViewValue(date);
                        if (closeCalendar) {
                            scope.toggleCalendar(false);
                        }
                        scope.viewModel.invalid = false;
                        scope.viewModel.errorMessage="";

                        return true;
                    };

                    scope.selectDateFromInput = function(closeCalendar) {
                        var err, tmpDate, tmpDateAndTime, tmpTime;
                        if (closeCalendar == null) {
                            closeCalendar = false;
                        }
                        try {
                            tmpDate = parseDateString(scope.inputDate);
                            if (!tmpDate) {
                                throw 'Invalid Date';
                            }
                            if (!scope.disableTimepicker && scope.inputTime && scope.inputTime.length && tmpDate) {
                                tmpTime = scope.disableTimepicker ? '00:00:00' : scope.inputTime;
                                tmpDateAndTime = parseDateString("" + scope.inputDate + " " + tmpTime);
                                if (!tmpDateAndTime) {
                                    throw 'Invalid Time';
                                }
                                tmpDate = tmpDateAndTime;
                            }
                            if (!datesAreEqualToMinute(ngModelCtrl.$viewValue, tmpDate) && !scope.selectDate(tmpDate, false)) {
                                throw 'Invalid Date';
                            }
                            if (closeCalendar) {
                                scope.toggleCalendar(false);
                            }
                            scope.inputDateErr = false;
                            return scope.inputTimeErr = false;
                        } catch (_error) {
                            err = _error;
                            if (err === 'Invalid Date') {
                                return scope.inputDateErr = true;
                            } else if (err === 'Invalid Time') {
                                return scope.inputTimeErr = true;
                            }
                        }
                    };


                    scope.selectDateOnKeyPress = function(event,date){

                        if((event.which === 32) || (event.which === 13) ){
                            scope.selectDate(date, true, true);
                            event.stopPropagation();
                            event.preventDefault();
                            // set calendar icon focus
                            this.setFocusOnClose();
                            return true;
                        }else if(event.which === 27){
                            scope.toggleCalendar(false);
                            // set focus to calendar icon on escape
                            this.setFocusOnClose();
                        }else if((event.which == 9 && !event.shiftKey) && angular.element(event.target).hasClass('tk-last-date')){
                            element.find('.tk-cal-prev-month').focus();
                            event.preventDefault();
                        }
                    }

                    scope.closeCalendarOnEscape = function(event){
                        if(event.which === 27){
                            scope.toggleCalendar(false);
                            // set focus to calendar icon
                            this.setFocusOnClose();
                        }else  if((event.target.className == 'tk-cal-prev-month') && ((event.which === 9) && event.shiftKey)) {
                            element.find('td.tk-last-date').focus();
                            event.preventDefault();

                        }
                    }

                    scope.clickOnCalendarIcon = function () {
                        if(scope.viewModel.disabled) return;
                        var date = ngModelCtrl.$modelValue ? parseDateString(ngModelCtrl.$modelValue) : null;
                        if (date != null) {
                            scope.calendarDate = new Date(date);
                        }else{
                            scope.disablePrevMonthSelection=false;
                            scope.disableNextMonthSelection=false;
                            scope.calendarDate = new Date();
                        }
                        scope.selectedYear = scope.calendarDate.getFullYear();
                        scope.selectedMonth = scope.monthsList[scope.calendarDate.getMonth()];
                        setupCalendarView();
                        scope.toggleCalendar();
                    };


                    scope.toggleCalendarOnKeypress = function(event){
                        if(event.which === 13){
                            scope.clickOnCalendarIcon();
                            this.setFocusOnClose(); // set focus to calendar icon
                        }else if(event.which === 27){
                            scope.toggleCalendar(false);
                            this.setFocusOnClose();  // set focus to calendar icon
                        }
                    }

                    scope.setFocusOnClose = function() {
                        document.getElementById(scope.inputCompId+'_calIcon').focus();
                    }

                    scope.onDateInputTab = function() {
                        if (scope.disableTimepicker) {
                            scope.toggleCalendar(false);
                        }
                        return true;
                    };

                    scope.onTimeInputTab = function() {
                        scope.toggleCalendar(false);
                        return true;
                    };

                    scope.nextMonth = function() {
                        if(scope.disableNextMonthSelection){
                            return;
                        }
                        setCalendarDate(new Date(new Date(scope.calendarDate).setMonth(scope.calendarDate.getMonth() + 1)));
                        scope.selectedYear = scope.calendarDate.getFullYear();
                        scope.selectedMonth = scope.monthsList[scope.calendarDate.getMonth()];
                        return refreshView();
                    };

                    scope.prevMonth = function() {
                        if(scope.disablePrevMonthSelection){
                            return;
                        }
                        setCalendarDate(new Date(new Date(scope.calendarDate).setMonth(scope.calendarDate.getMonth() - 1)));
                        scope.selectedYear = scope.calendarDate.getFullYear();
                        scope.selectedMonth = scope.monthsList[scope.calendarDate.getMonth()];
                        return refreshView();
                    };

                    scope.changeCalendarView = function(){
                        setCalendarDate(new Date(new Date(scope.calendarDate).setFullYear(scope.selectedYear,scope.monthsList.indexOf(scope.selectedMonth))));
                        return refreshView();
                    };

                    /**
                     * Format the date value provided by the user in the calendar input text to "MM-dd-yyyy" format
                     * Below are possible date formats that are accepted
                     * MM/dd/yyyy, MM.dd.yyyy, MM-dd-yyyy, MMddyyyy, yyyy.MM.dd, yyyy-MM-dd, yyyy/MM/dd.
                     *
                     * @param date
                     * @returns {string}
                     */
                    scope.formatGivenDate = function(date){
                        var strDate = [];
                        var dateDelimiter = '';
                        var month, year, day;
                        if(!date){
                            return "";
                        }
                        if(Object.prototype.toString.call(date) === "[object Date]") {
                            year = date.getFullYear().toString();
                            month = (date.getMonth() + 1).toString();
                            day = date.getDate().toString();

                            day = (day.length == 1)? ("0" + day): day;
                            month = (month.length == 1)? ("0" + month) : month;

                            if(scope.dateFormat === 'yyyy-mm-dd') {
                                return year + '-' + month + '-' + day;
                            } else if(scope.dateFormat === 'dd/mm/yyyy') {
                                return day + '/' + month + '/' + year;
                            } else {
                                return month + '-' + day + '-' + year;
                            }
                        }   else {
                            if(date.indexOf('-') !== -1){
                                dateDelimiter = "-";
                            }else if(date.indexOf('.') !== -1){
                                dateDelimiter = ".";
                            }else if(date.indexOf('/') !== -1){
                                dateDelimiter = "/";
                            }
                        }

                        if(dateDelimiter !== ''){
                            /* This block formats  MM/dd/yyyy, MM.dd.yyyy, MM-dd-yyyy, MMddyyyy, yyyy.MM.dd, yyyy-MM-dd, yyyy/MM/dd formatted dates*/
                            strDate = date.toString().split(dateDelimiter);
                            if(strDate[0].length === 4){
                                strDate[3] = strDate[0];
                                strDate[0] = strDate[1];
                                strDate[1] = strDate[2];
                                strDate[2] = strDate[3];
                                strDate.pop();
                            }else if(strDate[0].length === 3){
                                /* This block parses Dec-14-2014, Dec/14/2014 format dates*/
                                strDate[0] = strDate[0].toLowerCase();
                                uitkCalendarDefaults.monthsList.forEach(function(v,i,a){
                                    if(v.toLowerCase() === strDate[0]){
                                        strDate[0]=i+1;
                                    }
                                });
                            }
                            strDate[0] = strDate[0].toString(); //converting to string to fix issue in firefox
                            strDate[1] = strDate[1].toString();
                            strDate[0] = (strDate[0].length == 1)? "0"+strDate[0]:strDate[0];
                            strDate[1] = (strDate[1].length == 1)? "0"+strDate[1]:strDate[1];
                            if(scope.dateFormat === "yyyy-mm-dd") {
                                return strDate[2]+"-"+strDate[0]+"-"+strDate[1];
                            } else if(scope.dateFormat === "dd/mm/yyyy") {
                                return strDate[0]+"/"+strDate[1]+"/"+strDate[2];
                            } else {
                                return strDate[0]+"-"+strDate[1]+"-"+strDate[2];
                            }

                        } else if(scope.dateFormat === "yyyy-mm-dd") {
                            strDate[0] = date.substr(0,4);
                            strDate[1] = date.substr(4,2);
                            strDate[2] = date.substr(6,2);
                            return strDate[0]+"-"+strDate[1]+"-"+strDate[2];
                        } else if(scope.dateFormat === "dd/mm/yyyy") {
                            strDate[0] = date.substr(0,2);
                            strDate[1] = date.substr(2,2);
                            strDate[2] = date.substr(4,4);
                            return strDate[0]+"/"+strDate[1]+"/"+strDate[2];
                        } else if(date.match(/^\d{8}$/)){/*This block parses MMddYYYY formatted dates*/
                            strDate[0] = date.substr(0,2);
                            strDate[1] = date.substr(2,2);
                            strDate[2] = date.substr(4,4);
                            return strDate[0]+"-"+strDate[1]+"-"+strDate[2];
                        }  else if(date.indexOf(' ') > 0 && date.indexOf(',')>0 && date.indexOf(' ') < date.indexOf(',') ){
                            /*This block parses  Dec 14, 2014, December 14, 2014 format dates*/
                            strDate[0] = "";
                            strDate[1] = date.substr(0, date.indexOf(' '));
                            if( strDate[1].length === 3){
                                uitkCalendarDefaults.monthsList.forEach(function(v,i,a){
                                    if(v.toLowerCase() === strDate[1].toLowerCase()){
                                        strDate[0]=i+1;
                                    }
                                });
                            }else if(strDate[1].length > 3){
                                uitkCalendarDefaults.monthsListLong.forEach(function(v,i,a){
                                    if(v.toLowerCase() === strDate[1].toLowerCase()){
                                        strDate[0]=i+1;
                                    }
                                });
                            }
                            if(strDate[0] === ""){
                                return ""
                            }else{
                                var tempStrDate = (date.substr(date.indexOf(' '),date.length)).toString().split(',');
                                strDate[1] = tempStrDate[0].trim();
                                strDate[2] = tempStrDate[1].trim();
                                strDate[0] = strDate[0].toString(); //converting to string to fix issue in firefox
                                strDate[1] = strDate[1].toString();
                                strDate[0] = (strDate[0].length == 1)? "0"+strDate[0]:strDate[0];
                                strDate[1] = (strDate[1].length == 1)? "0"+strDate[1]:strDate[1];
                                return strDate[0]+"-"+strDate[1]+"-"+strDate[2];
                            }

                        }
                        return "";
                    };
                    /**
                     * Checking if the param input is an valid date format (i.e: mm-dd-yyyy, 12-12-2010, 00-00-0000)
                     * @param date - date in string format
                     * @returns {boolean}
                     */
                    scope.isValidDate = function(date) {
                        var strDate = [], year, month, day;
                        if(date.indexOf('-') > 0) {
                            strDate = date.toString().split('-');
                        } else {
                            strDate = date.toString().split('/');
                        }

                        // The Date needs to be in this format "2012-11-02T00:00:00.000Z"
                        // This is the Entered date from user
                        if(scope.dateFormat === "yyyy-mm-dd") {
                            year = strDate[0];
                            month = strDate[1];
                            day = strDate[2];
                        } else if(scope.dateFormat === "dd/mm/yyyy") {
                            year = strDate[2];
                            month = strDate[1];
                            day = strDate[0];
                        } else {
                            year = strDate[2];
                            month = strDate[0];
                            day = strDate[1];
                        }
                        var tmpMonth = month - 1;
                        tmpMonth = tmpMonth.toString();
                        var composedDate = new Date(year,tmpMonth,day,0,0,0,0);

                        scope.viewModel.invalid = false;

                        // Checking min and max date
                        if ( typeof scope.minDate !== 'undefined' ) {
                            var minDateObj = parseDateString(scope.minDate);
                            if ( composedDate < minDateObj ) {
                                scope.viewModel.errorMessage = (scope.viewModel.outOfRangeMessage || uitkCalendarDefaults.validationErrorsMap.outOfRangeMessage) + scope.minDate + " and " + scope.maxDate + ".";
                                scope.viewModel.invalid = true;
                                return false;
                            }
                        }

                        if ( typeof scope.maxDate !== 'undefined' ) {
                            var maxDateObj = parseDateString(scope.maxDate);
                            if ( composedDate > maxDateObj ) {
                                scope.viewModel.errorMessage = (scope.viewModel.outOfRangeMessage || uitkCalendarDefaults.validationErrorsMap.outOfRangeMessage) + scope.minDate + " and " + scope.maxDate + ".";
                                scope.viewModel.invalid = true;
                                return false;
                            }
                        }

                        // Done checking min/max date


                        //checking month
                        if(!(month && month < 13 && month > 0)){
                            scope.viewModel.errorMessage = scope.viewModel.invalidDateMessage || uitkCalendarDefaults.validationErrorsMap.invalidDateMessage;
                            scope.viewModel.invalid = true;
                            return false;
                        }
                        // Checking min and max year
                        if (year && ( year < scope.minYear || year > scope.maxYear)) {
                            scope.viewModel.errorMessage = (scope.viewModel.outOfRangeMessage || uitkCalendarDefaults.validationErrorsMap.outOfRangeMessage) + " 01-01-" + uitkCalendarDefaults.minYear + " and 12-31-" + uitkCalendarDefaults.maxYear + ".";
                            scope.viewModel.invalid = true;
                            return false;
                        }
                        //checking days in month
                        if(parseInt(day, 10) === 0 || day > getDaysInMonth(year, month-1)){
                            scope.viewModel.errorMessage = scope.viewModel.invalidDateMessage ||  uitkCalendarDefaults.validationErrorsMap.invalidDateMessage;
                            scope.viewModel.invalid = true;
                            return false;
                        }

                        if ( Object.prototype.toString.call(composedDate) === "[object Date]" ) {
                            // it is a date
                            if ( isNaN( composedDate.getTime() ) ) {
                                // date is not valid
                                return false;
                            }
                            else {
                                // date is valid
                                return true;
                            }
                        }
                        else {
                            // not a date
                            return false;
                        }
                        scope.getAriaDescribedBy();
                    };

                    /**
                     * This function fires when user inputs text in the input text box
                     * if valid date is enter (mm-dd-yyyy), this func updates the view
                     * @param event - key down event
                     */
                    scope.onKeyDown = function() {
                        var date_reg_ex = /^\d{1,2}\-\d{1,2}\-\d{4}$/;
                        var tmpDateAndTime = scope.formatGivenDate(scope.viewModel.dateText);
                        if(scope.dateFormat === 'yyyy-mm-dd') {
                            if (scope.isValidDate(tmpDateAndTime) ) {
                                scope.selectDate(tmpDateAndTime, true, true);
                                scope.selectedYear = scope.calendarDate.getFullYear();
                                scope.selectedMonth = scope.monthsList[scope.calendarDate.getMonth()];
                                scope.changeCalendarView();
                            }
                        } else if(scope.dateFormat === 'dd/mm/yyyy') {
                            if (scope.isValidDate(tmpDateAndTime) ) {
                                scope.selectDate(tmpDateAndTime, true, true);
                                scope.selectedYear = scope.calendarDate.getFullYear();
                                scope.selectedMonth = scope.monthsList[scope.calendarDate.getMonth()];
                                scope.changeCalendarView();
                            }
                        }
                        else if(tmpDateAndTime.match(date_reg_ex)) {
                            //var tmpDateAndTime = scope.mainButtonStr;
                            // If only Entered date is a valid date
                            if (scope.isValidDate(tmpDateAndTime) ) {
                                scope.selectDate(tmpDateAndTime, true, true);
                                scope.selectedYear = scope.calendarDate.getFullYear();
                                scope.selectedMonth = scope.monthsList[scope.calendarDate.getMonth()];
                                scope.changeCalendarView();
                            }
                        }
                        else if(scope.viewModel.dateText){
                            scope.viewModel.errorMessage =  scope.viewModel.invalidFormatMessage || uitkCalendarDefaults.validationErrorsMap.invalidFormatMessage;
                            scope.viewModel.invalid = true;
                        }else if(scope.viewModel.required){
                            ngModelCtrl.$setViewValue(null);
                            scope.viewModel.invalid = true;
                            scope.viewModel.errorMessage =  scope.viewModel.requiredMessage || uitkCalendarDefaults.validationErrorsMap.requiredMessage;
                        }else{
                            ngModelCtrl.$setViewValue(null);
                            scope.viewModel.invalid = false;
                        }
                        scope.getAriaDescribedBy();
                    }


                    scope.clear = function() {
                        return scope.selectDate(null, true);
                    };
                    return initialize();
                }
            };
        }
    ]);

}).call(this);

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.15.0
 */
angular.module('uitk.component.uitkCheckboxGroup',['uitk.uitkUtility'])
.directive('uitkCheckbox', function(){
	return {
		restrict : 'E',
		replace : true,
		transclude : true,
		scope : {
			//List of checkboxes
			itemList :'=',
			//id for the checkbox group
			id : '@',
			//group name for checkbox group
			groupName : '@',
			//Javascript function on change
			onChange : '&',
			//set to false to have a single checkbox
			isGroup: '@',
            tkDescribedby :'@',
            tkLabelledby : '@',
			tkAriainvalid : '=',
			tkModel : '='
		},
		link : function($scope) {
			$scope.selectedItem = $scope.tkModel || [];
		
			$scope.selectedValue = function(name, value) {
				var needToDelete = _.find($scope.selectedItem, {'value':name} );//if found...del from selectedItem
				if (needToDelete) {
					$scope.selectedItem = _.remove($scope.selectedItem, function(n) {

						if ( n.value !== name ) {
							return n;
						}

					});
					// use uitkEvents
					needToDelete.checked = false;
					$scope.$emit($scope.id + '-checkboxHasChanged', {item: needToDelete, itemList : $scope.selectedItem} );
				}

				if(value){//value is true
					var found = _.find($scope.selectedItem, {'value':name,'checked': true } );//if found...do nothing
					if ( !found ) {
						var item = { value: name, checked: true };
						$scope.selectedItem.push(item);
						// use uitkEvents
						$scope.$emit($scope.id + '-checkboxHasChanged', {item:item, itemList : $scope.selectedItem} );
					}
				}

			};
			var found = false;
			angular.forEach($scope.itemList, function (v, k) {
			    if (v.checked === true) {
			        $scope.selectedValue(v.value, v.checked);
			        found = true;
			    }
			});
			if (!found) {
			    $scope.$emit($scope.id + '-checkboxHasChanged', { item: undefined, itemList: $scope.selectedItem });
			}
		},
		templateUrl: function (element, attrs) {
			return attrs.templateUrl || 'template/uitkCheckboxTemplate.html';
		}
	};
});

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
(function() {
  "use strict";
  
  angular
    .module("uitk.component.choropleth", []);
  
  angular
    .module("uitk.component.choropleth")
    .run(function(){
        var createButton = function(html, title, className, container, fn, context){
          var link = L.DomUtil.create('a', className, container);
          link.innerHTML = html;
          link.href = '#';
          link.title = title;

          var stop = L.DomEvent.stopPropagation;
          L.DomEvent
              .on(link, 'click', stop)
              .on(link, 'mousedown', stop)
              .on(link, 'dblclick', stop)
              .on(link, 'click', L.DomEvent.preventDefault)
              .on(link, 'click', fn, context)
          return link;
      };

        L.Control.Home = L.Control.extend({
          options:{
              position: 'topleft',
              html: '',
              title: 'Home',
              center: {lat: 38, lng: -97},
              zoom: 5
          },
          onAdd: function(map){
              var controlName = 'leaflet-control-home',
                  container = L.DomUtil.create('div', controlName + ' leaflet-bar');

              this._map = map;

              this._homeButton  = createButton(
                  this.options.html, this.options.title,
                  controlName + '-btn cux-icon-home',  container, this._onClick, this);

              return container;
          },

          onRemove: function (map) {
          },

          _onClick: function(){
              this._map.setView(this.options.center, this.options.zoom);
          }
      });

        L.Control.Save = L.Control.extend({
          options:{
              position: 'topleft',
              html: '',
              title: 'Save'
          },

          onAdd: function(map){
              var controlName = 'leaflet-control-save',
                  container = L.DomUtil.create('div', controlName + ' leaflet-bar');

              this._map = map;

              this._saveButton  = createButton(
                  this.options.html, this.options.title,
                  controlName + '-btn cux-icon-save',  container, this._onClick,  this);

              return container;
          },

          onRemove: function (map) {
          },

          _onClick: function(){
              //Implementations for what happens when the save button is clicked goes here
          }
      });

        L.Control.Settings = L.Control.extend({
          options:{
              position: 'topleft',
              html: '',
              title: 'Settings'
          },
          onAdd: function(map){
              var controlName = 'leaflet-control-settings',
                  container = L.DomUtil.create('div', controlName + ' leaflet-bar');

              this._map = map;

              this._settingsButton  = createButton(
                  this.options.html, this.options.title,
                  controlName + '-btn cux-icon-settings',  container, this._onClick, this);

              return container;
          },

          onRemove: function (map) {
          },

          _onClick : function(){
              //Implementations for what happens when the settings button is clicked goes here
          }
      });
    })
    .directive("uitkChoropleth", uitkChoropleth);

  /**
   * Primary directive for the leaflet choropleth. Creates the map div and handles
   * the logic for updating map attributes like styling, segments, color series, and more.
   */
  function uitkChoropleth($log, $q, uitkChoroplethBorders, uitkChoroplethColorSeries, uitkChoroplethOptions) {
    controller.$inject = ["$scope"];
    return {
      restrict: "E",
      scope: {
        name: "=?",                    // choropleth layer's name which will appear in the layer controls
        center: "=?",                  // default map view lat/lng coordinates
        zoom: "=?",                    // default map view zoom level
        basemap: "=?",                 // leaflet basemap URL to draw background tilelayer
        borderType: "=?",              // use "states" or "counties" borders
        statData: "=?",                // (REQUIRED) developer-provided stat data which should contain a FIPS and a boundary-related statistic
        statIgnoreFields: "=?",        // array of strings that of which will provide a list of fields to "ignore" from the statData
        statField: "=?",               // currently selected stat from the statData
        choroplethOptions: "=?",       // Leaflet-DVF defined list of options used for drawing the choropleth, see: https://github.com/humangeo/leaflet-dvf/wiki/8.-Datalayers#ldatalayer
        legendOptions: "=?",           // display options for the legend
        layerControlOptions: "=?",     // display options for the layer control
        zoomControlOptions: "=?",      // display options for the zoom slider control
        choroplethColorSeries: "=?",   // Optum color series to use for the choropleth, such as "OrangeTurqoise", "RedGreen", "Orange", etc.
        choroplethSegments: "=?",      // number of choropleth segments to draw
        onMapLoad: "&",               // callback function that fires when the map is loaded
        onLayerLoad: "&",              // callback function that fires when the choropleth layer is loaded
        overlayLayer:"=?",
        viewModel:"=?"          // TODO: Migrate all the properties to this view model.
      },
      replace: true,
      template: "<div></div>",
      bindToController: true,
      controllerAs: "uitkChoroplethCtrl",
      controller: controller,
      link: postLink
    };
    
    /**
     * Main controller for directive.
     * Contains all functions for interacting with map.
     */
    function controller($scope) {
      var self = this;

      self._choroplethLayerDeferred = $q.defer();
      self.addChoroplethLayer = addChoroplethLayer;
      self.getChoroplethLayer = getChoroplethLayer;
      self.getScopeDefaults = getScopeDefaults;
      self.id = "leafletMap";
      self.initBaseLayer = initBaseLayer;
      self.initLayerControl = initLayerControl;
      self.initLegend = initLegend;
      self.initMap = initMap;
      self.initZoomControl = initZoomControl;
      self.updateChoropleth = updateChoropleth;
      self.updateChoroplethBorderType = updateChoroplethBorderType;
      self.initToolbarControls = initToolbarControls;
      
      /**
       * Contains static return object of defaults.
       *
       * @returns an object of default parameters used by the map.
       */
      function getScopeDefaults() {
        return {
          center: {lat: 38, lng: -97},
          zoom: 5,
          basemapUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          name: "Choropleth",
          statIgnoreFields: ["FIPS"],
          borderType: "Counties",
          choroplethSegments: 11,
          choroplethColorSeries: "OrangeTurqoise",
          legendOptions: {},
          layerControlOptions: {},
          zoomControlOptions: {}
        };
      }
      
      /**
       * @returns choropleth layer promise object
       */
      function getChoroplethLayer() {
        return self._choroplethLayerDeferred.promise;
      }

      /**
       * Initialize the leaflet map.
       */
      function initMap() {
        // set map center if it does not already exist
        if (!self.center) {
          self.center = self.getScopeDefaults().center;
        }
        
        // set map zoom if it does not already exist
        if (!self.zoom) {
          self.zoom = self.getScopeDefaults().zoom;
        }

        // initiate leaflet map object
        self._map = L.map(self.id, {"zoomControl": false});

        // callback function that returns map object
        if (self.onMapLoad) {
          self._map.on("load", function() {
            self.onMapLoad()(self._map);
          });
        }

        // set origin view of map
        // fire map.on("load")
        self._map.setView(self.center, self.zoom);
      }

      /**
       * Set basemap and add to leaflet map object.
       */
      function initBaseLayer() {
        // set basemap tilelayer URL if it does not already exist
        if (!self.basemapUrl) {
          self.basemapUrl = self.getScopeDefaults().basemapUrl;
        }

        self._baseLayer = L.tileLayer(self.basemapUrl).addTo(self._map);
      }

      /**
       * Initialize the leaflet map legend.
       */
      function initLegend() {
        // set legend options if it does not already exist
        if (!self.legendOptions) {
          self.legendOptions = self.getScopeDefaults().legendOptions;
        }
        
        self._legendControl = new L.Control.Legend(self.legendOptions).addTo(self._map);
      }

      /**
       * Initiate the layer controller and add basemap to it.
       */
      function initLayerControl() {
        // set layer control options if it does not already exist
       /* if (!self.layerControlOptions) {
          self.layerControlOptions = self.getScopeDefaults().layerControlOptions;
        }*/
        
        /*self._layerControl = new L.Control.Layers({
          "Basemap": self._baseLayer
        }, {}, self.layerControlOptions).addTo(self._map);*/
      }

      /**
       * Initiate the zoom controller.
       */
      function initZoomControl() {
        // set zoom control options if it does not already exist
        if (!self.zoomControlOptions) {
          self.zoomControlOptions = self.getScopeDefaults().zoomControlOptions;
        }

        self._zoomControl = new L.Control.Zoom(self.zoomControlOptions).addTo(self._map);
      }

      /**
       * Add the leaflet-dvf choropleth layer to the map.
       */
      function addChoroplethLayer() {
        // check if stat data exists
        if (!self.statData) {
          $log.error("Cannot create choropleth map without stat data.");
          return;
        }

        // set choropleth layer name if it does not already exist
        if (!self.name) {
          self.name = self.getScopeDefaults().name;
        }

        // set ignoreFields if it does not already exist
        if (!self.statIgnoreFields) {
          self.statIgnoreFields = self.getScopeDefaults().statIgnoreFields;
        }
        
        // create a list of available fields that aren't a part of the ignore list
        self.availableFields = [];
        for (var key in self.statData[0]) {
          if (self.statIgnoreFields.indexOf(key) === -1) {
            self.availableFields.push(key);
          }
        }

        // set the default boundary type if it is unavailable or does not exist
        if (!self.borderType || !uitkChoroplethBorders.isValidBorderType(self.borderType)) {
          self.borderType = self.getScopeDefaults().borderType;
        }

        uitkChoroplethBorders.getBorders(self.borderType).then(function(bordersData) {
          // get the default choropleth options for any properties that were not passed to directive
          self.choroplethOptions = uitkChoroplethOptions.setDefaults(self.choroplethOptions, self.id);
          self.choroplethOptions.locationLookup = bordersData;

          // intiate new choropleth layer object
          self._choroplethLayer = new L.ChoroplethDataLayer(self.statData, self.choroplethOptions);

          // overwrite default leaflet-dvf function for setting the filter function
          self._choroplethLayer.setFilter = function(filterFunction) {
            self._choroplethLayer.options.filter = filterFunction;

            // Re-load data
            self._choroplethLayer.clearLayers();
            self._choroplethLayer.reloadData();

            // refresh the legend and choropleth colors
            self.updateChoropleth();

            return self._choroplethLayer;
          };

          // callback function that returns choropleth layer
          if (self.onLayerLoad) {
            self.onLayerLoad()(self._choroplethLayer, self.availableFields);
          }

          // color the choropleth
          self.updateChoropleth();

          // add chorpleth to layer controller
          //self._layerControl.addOverlay(self._choroplethLayer, self.name);

          // add chorpleth layer to leaflet map object
          self._choroplethLayer.addTo(self._map);

          self._choroplethLayerDeferred.resolve(self._choroplethLayer);
        });
      }

      /**
       * Update the border type used on the choropleth (states vs counties).
       * Border type is based on the FIPS code length used in the passed in stat data.
       * FIPS 2 characters = states.
       * FIPS 5 characters = counties.
       */
      function updateChoroplethBorderType() {
        // set the default boundary type if it is unavailable or does not exist
        if (!self.borderType || !uitkChoroplethBorders.isValidBorderType(self.borderType)) {
          self.borderType = self.getScopeDefaults().borderType;
        }

        uitkChoroplethBorders.getBorders(self.borderType).then(function(bordersData) {
          self._choroplethLayer.options.locationLookup = bordersData;
          self._choroplethLayer._layerIndex = null;
          self._choroplethLayer._boundaryIndex = null;
          self._choroplethLayer._lookupIndex = null;

          if (self.borderType.toLowerCase() === "counties") {
            self._choroplethLayer.setFilter(function(stat) {
              return stat.FIPS.length === 5;
            });
          } else {
            self._choroplethLayer.setFilter(function(stat) {
              return stat.FIPS.length === 2;
            });
          }
        });
      }

      /**
       * Update the choropleth segments and color series.
       * Also updates the legend to match these values display.
       */
      function updateChoropleth() {
        // check if stat data exists
        if (!self.statData) {
          $log.error("Cannot create choropleth map without stat data.");
          return;
        }
        
        // set the default data field to the first available one
        if (!self.statField) {
          self.statField = self.availableFields[0];
        }

        // set the choropleth segments if it does not already exist
        if (!self.choroplethSegments) {
          self.choroplethSegments = self.getScopeDefaults().choroplethSegments;
        }

        // set choropleth color series type if it does not already exist
        if (!uitkChoroplethColorSeries.isValidColorSeriesType(self.choroplethColorSeries)) {
          self.choroplethColorSeries = self.getScopeDefaults().choroplethColorSeries;
        }

        // get a list of only the visible data stats in order to calculate an appropriate range
        var visibleStats = [];
        self.statData.forEach(function(stat) {
          if (self._choroplethLayer.options.filter(stat)) {
            visibleStats.push(stat);
          }
        });

        // set the range min and max to determine the division of choropleth segments (using only visible stats)
        var range = L.Util.getNumericRange(visibleStats, self.statField);

        // get the color series based on directive options and number of segments
        var colorSeries = uitkChoroplethColorSeries.getSeries(self.choroplethColorSeries, self.choroplethSegments);

        // choropleth inner fill color
        var fillColor = new L.CustomColorFunction(range[0], range[1], colorSeries, {
          interpolate: false
        });

        // choropleth border color
        var color = new L.CustomColorFunction(range[0], range[1], colorSeries, {
          postProcess: function(y) {
            var newColor = new L.RGBColor(y);

            newColor.l(0.2);

            return newColor.toRGBString();
          }
        });

        var displayOptions = {};
        displayOptions[self.statField] = {
          fillColor: fillColor,
          color: color
        };

        self.choroplethOptions.legendOptions.numSegments = colorSeries.length;
        self._choroplethLayer.setDisplayOptions(displayOptions);
      }

      function initToolbarControls(){
          //Order of intitialization of controls define the order in the UI
          // set tool bar options if it does not already exist.
          self._homeControl = new L.Control.Home({}).addTo(self._map);

          // initiate zoom controller
          initZoomControl();

          // set tool bar options if it does not already exist.
          self._saveControl = new L.Control.Save({}).addTo(self._map);

          // set tool bar options if it does not already exist.
          self._settingsControl = new L.Control.Settings({}).addTo(self._map);
      }

        /**
         * overlay watcher which adds / removes the choropleth layer to the map accordingly.
         */
        $scope.$watch(function() {
            return self.overlayLayer;
        }, function(newValue, oldValue) {
            if (newValue !== oldValue) {
                self.getChoroplethLayer().then(function() {
                    if (newValue === 'choropleth') {
                        self._choroplethLayer.addTo(self._map);
                    } else if(newValue === 'basemap'){
                        self._map.removeLayer(self._choroplethLayer);
                    }
                });
            }
        });

      // statField watcher
      $scope.$watch(function() {
        return self.statField;
      }, function(newValue, oldValue) {
        if (newValue !== oldValue) {
          self.getChoroplethLayer().then(function() {
              self.updateChoropleth();
          });
        }
      });
      
      // choroplethSegments watcher
      $scope.$watch(function() {
        return self.choroplethSegments;
      }, function(newValue, oldValue) {
        if (newValue !== oldValue) {
          self.getChoroplethLayer().then(function() {
            self.updateChoropleth();
          });
        }
      });
      
      // choroplethColorSeries watcher
      $scope.$watch(function() {
        return self.choroplethColorSeries;
      }, function(newValue, oldValue) {
        if (newValue !== oldValue) {
          self.getChoroplethLayer().then(function() {
            self.updateChoropleth();
          });
        }
      });
      
      // borderType watcher
      $scope.$watch(function() {
        return self.borderType;
      }, function(newValue, oldValue) {
        if (newValue !== oldValue) {
          self.getChoroplethLayer().then(function() {
            self.updateChoroplethBorderType();
          });
        }
      });
    }
    
    /**
     * Directive post-link function.
     * These steps must happen in the post-link after the DOM is rendered.
     * Runs through a series of initialization steps to setup the map and layers.
     */
    function postLink($scope, $element, $attrs, $ctrl) {
      // set map container id if it does not already exist
      if (!$attrs.id) {
        $attrs.id = $ctrl.id;
        $element.attr("id", $ctrl.id);
      } else {
        $ctrl.id = $attrs.id;
      }
      
      // set container height of map if it does not already exist
      if (!$element[0].offsetHeight && (!$element.css("height") || parseInt($element.css("height"), 10) === 0)) {
            $element.css("height", "100%");
      }
      
      // set container width of map if it does not already exist
      if (!$element[0].offsetWidth && (!$element.css("width") || parseInt($element.css("width"), 10) === 0)) {
            $element.css("width", "100%");
      }
      
      // initialize the leaflet map
      $ctrl.initMap();
      
      // initialize the leaflet legend
      $ctrl.initLegend();
      
      // initialize the basemap layer
      $ctrl.initBaseLayer();
      
      // initiate layer controller
      $ctrl.initLayerControl();

      // initiate toolbar controls
      $ctrl.initToolbarControls();

      // intialize the choropleth layer
      $ctrl.addChoroplethLayer();
    }
  }
  uitkChoropleth.$inject = ["$log", "$q", "uitkChoroplethBorders", "uitkChoroplethColorSeries", "uitkChoroplethOptions"];
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.component.uitkCopyright',['uitk.uitkUtility'])
.directive('uitkCopyright', function(){
	return {
		scope : {
			licensesUrl : '@',
			licensesInfoForReader : '@' //added to provide additional information to a screen reader
		},
		restrict : 'E',
		replace : true,
		link: function($scope){
			$scope.currentYear = new Date().getFullYear();
		},
		template: "<p class='tk-copy'>&copy; {{currentYear}} Optum, Inc. - {{'All Rights Reserved.'| uitkTranslate }}"+
				"{{\"Your use of this product is governed by the terms of your company's agreement.\"| uitkTranslate}}"+
				"{{'You may not use or disclose this product,' | uitkTranslate}} " +
				"{{'or allow others to use it or disclose it, except as permitted by your agreement with' | uitkTranslate}} Optum. " +
				"{{'License information can be found here:' | uitkTranslate}} <a href='{{licensesUrl}}' " +
				"target='_blank'>{{'Licenses' | uitkTranslate}}<span class=\"oui-a11y-hidden\">{{licensesInfoForReader}}</span></a>.</p>"
	};
});

 


/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.15.0
 */
(function() {
    var app;
    app = angular.module("uitk.component.uitkDateOfBirth", ['uitk.uitkUtility']);
    app.provider("uitkDateOfBirthDefaults", function() {
        return {
            options: {
                dateFormat: 'MM-dd-yyyy',
                dateFormatDisplayTip: 'mm-dd-yyyy',
                placeholder: '',
                weekdayDay: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                monthsList:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
                monthsListLong:["January","February","March","April","May","June","July","August","September","October","November","December"],
                minYear:'1900',
                maxYear:'2019',
                textFieldClassName: 'textField',
                validationErrorsMap:{"requiredMessage":"Date is required.","invalidFormatMessage":"Invalid date format.",
                    "outOfRangeMessage":"Date must be greater than  ","invalidDateMessage":"Invalid date.","dobInvalidFutureMessage":"Date of birth cannot be greater than today's date"},
                /**uitk
                 * Parse param string into valid date string
                 * @param str - date string
                 * @returns date object
                 */
                parseDateFunction: function(str) {
                    if(str.length === 10 && str.indexOf("-") > 0) {
                        var parts = str.split('-');
                        // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
                        var parsedDate = new Date(parts[2], parts[0]-1, parts[1]); // Note: months are 0-based
                        return parsedDate;
                    }
                    var seconds;
                    seconds = Date.parse(str);
                    if (isNaN(seconds)) {
                        return null;
                    } else {
                        return new Date(seconds);
                    }
                } // ends parseDateFunction
            },
            $get: function() {
                return this.options;
            },
            set: function(keyOrHash, value) {
                var k, v, _results;
                if (typeof keyOrHash === 'object') {
                    _results = [];
                    for (k in keyOrHash) {
                        if(keyOrHash.hasOwnProperty(k)) {
                            v = keyOrHash[k];
                            _results.push(this.options[k] = v);
                        }
                    }
                    return _results;
                } else {
                    return this.options[keyOrHash] = value;
                }
            }
        };
    });


    var uitkDateOfBirthDirective = function(uitkDateOfBirthDefaults, $filter,uitkExceptionService){
        return {
            restrict: "E",
            require: "?ngModel",
            scope: {
                id: '@',
                viewModel:"=" // viewModel for configuring validations.
                /**
                 * viewModel - below are the possible properties and their corresponding uses
                 *      required - boolean property for required validation
                 *      invalid - property which stores field's validity
                 *      errorMessage - string which stores the error message for the component
                 *      requiredMessage - property(optional) through which consumers can configure the required error message.
                 *      invalidFormatMessage - property(optional) through which consumers can configure the invalid format error message
                 *      outOfRangeMessage - property(optional) through which consumers can configure the date out of range error message
                 *      invalidDateMessage - property(optional) through which consumers can configure the invalid date error message
                 *      dateText - date in string format
                 *      displayAgeInformation - flag to render age information
                 *
                 */
            },
            replace: true,
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || 'template/uitk-date-of-birth.html';
            },
            link: function(scope, element, attrs, ngModelCtrl) {
                var  getDaysInMonth,initialize,parseDateString, refreshView,
                    setCalendarDate, setConfigOptions;
               /* if(!scope.viewModel){
                    uitkExceptionService.throwException('InvalidViewModelException','dateOfBirth component - viewModel is required attribute');
                }*/

                if(!scope.id){
                    uitkExceptionService.throwException('InvalidIdException','dateOfBirth component - id is required attribute');
                }

                scope.viewModel = scope.viewModel || {};

                /**
                 *watch the changes to minYear and update the model (scope.minYear)
                 *@param newValue and oldValue
                 */
                scope.$watch('viewModel.minYear', function(newValue, oldValue) {
                    scope.minYear = scope.viewModel.minYear || scope.minYear;
                });

                /**
                 * Initialize the scope object.
                 * @returns {*}
                 */
                initialize = function() {
                    setConfigOptions();
                    scope.invalid = true;
                    if ((scope.id !== undefined) && (scope.id !== '')){
                        scope.inputCompId = scope.id.trim();
                    }
                    scope.textFieldClassName = scope.viewModel.textFieldClassName || scope.textFieldClassName;
                    scope.viewModel.enableValidation=(scope.viewModel.enableValidation !== undefined )?scope.viewModel.enableValidation:true;
                    scope.viewModel.renderHintText=(scope.viewModel.renderHintText !==  undefined)?scope.viewModel.renderHintText:true;
                    scope.minYear = scope.viewModel.minYear || scope.minYear;
                    scope.viewModel.displayAgeInformation=(scope.viewModel.displayAgeInformation !== undefined )?scope.viewModel.displayAgeInformation:true;
                    return refreshView();
                };

                /**
                 * Setting the scope variables using the default configuration provider service.
                 */
                setConfigOptions = function() {
                    var key, value;
                    for (key in uitkDateOfBirthDefaults) {
                        if(uitkDateOfBirthDefaults.hasOwnProperty(key)) {
                            value = uitkDateOfBirthDefaults[key];
                            if (!scope[key] && attrs[key]) {
                                scope[key] = attrs[key];
                            } else if (!scope[key]) {
                                scope[key] = value;
                            }
                        }
                    }

                };

                /**
                 * Update the model
                 * @returns {boolean|FormController.$invalid|*|ngModel.NgModelController.$invalid|context.ctrl.$invalid}
                 */
                refreshView = function() {
                    var date = ngModelCtrl.$modelValue ? parseDateString(ngModelCtrl.$modelValue) : null;
                    scope.viewModel.dateText = date ? $filter('date')(date, scope.dateFormat) : scope.placeholder;
                    /* if(scope.viewModel.dateText !== scope.placeholder){
                     scope.calculateAge();
                     }*/
                    return scope.invalid = ngModelCtrl.$invalid;
                };


                setCalendarDate = function(val) {
                    if ( typeof val !== 'undefined' && val !== null ) {
                        var d = new Date(val);
                        if (d.toString() === "Invalid Date" ) {
                            var strDate = val.toString().split('-');
                            var composedDate = new Date(strDate[2] +"/" + strDate[0] + "/" + strDate[1]);
                            return scope.calendarDate = composedDate;
                        }
                        else {
                            return scope.calendarDate = d;
                        }
                    }
                    else {
                        return scope.calendarDate = new Date();
                    }

                };

                ngModelCtrl.$formatters.push(function(modelVal) {
                    if (angular.isDate(modelVal)) {
                        return modelVal;
                    } else if (angular.isString(modelVal)) {
                        return scope.parseDateFunction(modelVal);
                    } else {
                        return;
                    }
                });

                parseDateString = uitkDateOfBirthDefaults.parseDateFunction;

                getDaysInMonth = function(year, month) {
                    return [31, ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
                };

                ngModelCtrl.$render = function() {
                    if ( ngModelCtrl.$viewValue !== 'undefined') {
                        setCalendarDate(ngModelCtrl.$viewValue);
                    }
                    return refreshView();
                };

                ngModelCtrl.$viewChangeListeners.unshift(function() {
                    setCalendarDate(ngModelCtrl.$viewValue);
                    refreshView();
                    if (scope.viewModel.onChange) {
                        return scope.viewModel.onChange();
                    }
                });

                scope.selectDate = function(date) {
                    ngModelCtrl.$setViewValue(date);
                    scope.viewModel.invalid = false;
                    scope.viewModel.errorMessage="";
                    return true;
                };

                scope.getAriaDescribedBy = function () {
                    var ariaDescribedByIds = '';

                    if(scope.viewModel.renderHintText){
                        ariaDescribedByIds = scope.inputCompId+"_tip";
                    }

                    if(scope.viewModel.enableValidation && scope.viewModel.invalid){ // For fields with format errors
                        ariaDescribedByIds += " "+ scope.inputCompId+"_err";
                    }else if( (!!scope.viewModel.displayAgeInformation) && (scope.viewModel.dateToBeDisplayed)  && (scope.viewModel.dateToBeDisplayed.trim() !== "")){
                        ariaDescribedByIds += " "+ scope.inputCompId+"_age_info";
                    }
                    return ariaDescribedByIds ? ariaDescribedByIds : undefined;
                };

                scope.changeCalendarView = function(){
                    setCalendarDate(new Date(new Date(scope.calendarDate).setFullYear(scope.selectedYear,scope.monthsListLong.indexOf(scope.selectedMonth))));
                    return refreshView();
                };

                /**
                 * Format the date value provided by the user in the calendar input text to "MM-dd-yyyy" format
                 * Below are possible date formats that are accepted
                 * MM/dd/yyyy, MM.dd.yyyy, MM-dd-yyyy, MMddyyyy, yyyy.MM.dd, yyyy-MM-dd, yyyy/MM/dd.
                 *
                 * @param date
                 * @returns {string}
                 */
                scope.formatGivenDate = function(date){
                    var strDate = [];
                    var dateDelimiter = '';
                    if(!date){
                        return "";
                    }
                    if(date.indexOf('-') !== -1){
                        dateDelimiter = "-";
                    }else if(date.indexOf('.') !== -1){
                        dateDelimiter = ".";
                    }else if(date.indexOf('/') !== -1){
                        dateDelimiter = "/";
                    }
                    if(dateDelimiter !== ''){
                        /* This block formats  MM/dd/yyyy, MM.dd.yyyy, MM-dd-yyyy, MMddyyyy, yyyy.MM.dd, yyyy-MM-dd, yyyy/MM/dd formatted dates*/
                        strDate = date.toString().split(dateDelimiter);
                        if(strDate.length < 3){
                            return " ";
                        }
                        if(strDate[0].length === 4){
                            strDate[3] = strDate[0];
                            strDate[0] = strDate[1];
                            strDate[1] = strDate[2];
                            strDate[2] = strDate[3];
                            strDate.pop();
                        }else if(strDate[0].length === 3){
                            /* This block parses Dec-14-2014, Dec/14/2014 format dates*/
                            strDate[0] = strDate[0].toLowerCase();
                            uitkDateOfBirthDefaults.monthsList.forEach(function(v,i,a){
                                if(v.toLowerCase() === strDate[0]){
                                    strDate[0]=i+1;
                                }
                            });
                        }
                        strDate[0] = strDate[0].toString(); //converting to string to fix issue in firefox
                        strDate[1] = strDate[1].toString();
                        strDate[0] = (strDate[0].length == 1)? "0"+strDate[0]:strDate[0];
                        strDate[1] = (strDate[1].length == 1)? "0"+strDate[1]:strDate[1];
                        return strDate[0]+"-"+strDate[1]+"-"+strDate[2];
                    }else if(date.match(/^\d{8}$/)){/*This block parses MMddYYYY formatted dates*/
                        strDate[0] = date.substr(0,2);
                        strDate[1] = date.substr(2,2);
                        strDate[2] = date.substr(4,4);
                        return strDate[0]+"-"+strDate[1]+"-"+strDate[2];
                    }else if(date.indexOf(' ') > 0 && date.indexOf(',')>0 && date.indexOf(' ') < date.indexOf(',') ){
                        /*This block parses  Dec 14, 2014, December 14, 2014 format dates*/
                        strDate[0] = "";
                        strDate[1] = date.substr(0, date.indexOf(' '));
                        if( strDate[1].length === 3){
                            uitkDateOfBirthDefaults.monthsList.forEach(function(v,i,a){
                                if(v.toLowerCase() === strDate[1].toLowerCase()){
                                    strDate[0]=i+1;
                                }
                            });
                        }else if(strDate[1].length > 3){
                            uitkDateOfBirthDefaults.monthsListLong.forEach(function(v,i,a){
                                if(v.toLowerCase() === strDate[1].toLowerCase()){
                                    strDate[0]=i+1;
                                }
                            });
                        }
                        if(strDate[0] === ""){
                            return "";
                        }else{
                            var tempStrDate = (date.substr(date.indexOf(' '),date.length)).toString().split(',');
                            strDate[1] = tempStrDate[0].trim();
                            strDate[2] = tempStrDate[1].trim();
                            strDate[0] = strDate[0].toString(); //converting to string to fix issue in firefox
                            strDate[1] = strDate[1].toString();
                            strDate[0] = (strDate[0].length == 1)? "0"+strDate[0]:strDate[0];
                            strDate[1] = (strDate[1].length == 1)? "0"+strDate[1]:strDate[1];
                            return strDate[0]+"-"+strDate[1]+"-"+strDate[2];
                        }

                    }
                    return "";
                };
                /**
                 * Checking if the param input is an valid date format (i.e: mm-dd-yyyy, 12-12-2010, 00-00-0000)
                 * @param date - date in string format
                 * @returns {boolean}
                 */
                scope.isValidDate = function(date) {
                    var strDate = [];
                    strDate = date.toString().split('-');
                    scope.viewModel.invalid = false;
                    if(!(strDate[0] && strDate[0]<13 && strDate[0]>0)){
                        scope.viewModel.errorMessage = scope.viewModel.invalidDateMessage || uitkDateOfBirthDefaults.validationErrorsMap.invalidDateMessage;
                        scope.viewModel.invalid = true;
                        return false;
                    }

                    if(strDate[2] && ( strDate[2] < uitkDateOfBirthDefaults.minYear) ){
                        scope.viewModel.errorMessage = (scope.viewModel.outOfRangeMessage || uitkDateOfBirthDefaults.validationErrorsMap.outOfRangeMessage)+" 01-01-"+uitkDateOfBirthDefaults.minYear+".";
                        scope.viewModel.invalid = true;
                        return false;
                    }


                    if(parseInt(strDate[1], 10) === 0 || strDate[1] > getDaysInMonth(strDate[2], strDate[0]-1)){
                        scope.viewModel.errorMessage = scope.viewModel.invalidDateMessage ||  uitkDateOfBirthDefaults.validationErrorsMap.invalidDateMessage;
                        scope.viewModel.invalid = true;
                        return false;
                    }

                    // The Date needs to be in this format "2012-11-02T00:00:00.000Z"
                    var composedDate = new Date(strDate[2],strDate[0]-1,strDate[1],0,0,0,0);
                    var currentDate = new Date();
                    currentDate.setHours(0,0,0,0);
                    if(currentDate<composedDate){
                        scope.viewModel.errorMessage = scope.viewModel.dobInvalidFutureMessage ||  uitkDateOfBirthDefaults.validationErrorsMap.dobInvalidFutureMessage;
                        scope.viewModel.invalid = true;
                        return false;
                    }

                    if ( Object.prototype.toString.call(composedDate) === "[object Date]" ) {
                        // it is a date
                        if ( isNaN( composedDate.getTime() ) ) {
                            // date is not valid
                            return false;
                        }
                        else {
                            // date is valid
                            return true;
                        }
                    }
                    else {
                        // not a date
                        return false;
                    }
                };

                /**
                 * Calculates the month difference between two dates.
                 * @param d1
                 * @param d2
                 * @returns {number}
                 */
                scope.monthDiff=function(d1, d2) {
                    var months;
                    months = (d2.getFullYear() - d1.getFullYear()) * 12;
                    months -= d1.getMonth();
                    months += d2.getMonth();
                    if(d2.getDate() < d1.getDate()){
                        months--;
                    }
                    return months <= 0 ? 0 : months;
                }


                scope.calculateAge = function(){
                    scope.selectedYear = scope.calendarDate.getFullYear();
                    scope.selectedMonth = scope.monthsListLong[scope.calendarDate.getMonth()];
                    scope.viewModel.dateToBeDisplayed =scope.selectedMonth+" "+scope.calendarDate.getDate()+", "+scope.selectedYear;
                    var currentDate = new Date();
                    //scope.calendarDate
                    var diff = currentDate-scope.calendarDate;
                    diff = Math.floor(diff/(1000*60*60*24));
                    var age = null;
                    if(diff > 365){
                        age = Number(currentDate.getFullYear()) - Number(scope.selectedYear);
                        if(age === 1){
                            scope.viewModel.dateToBeDisplayed = scope.viewModel.dateToBeDisplayed+" (1 year)";
                        }else{
                            scope.viewModel.dateToBeDisplayed = scope.viewModel.dateToBeDisplayed+" ("+age+" years)";
                        }
                    }else {
                        age = scope.monthDiff(scope.calendarDate,currentDate);
                        if(age === 1){
                            scope.viewModel.dateToBeDisplayed = scope.viewModel.dateToBeDisplayed+" (1 month)";
                        }else{
                            scope.viewModel.dateToBeDisplayed = scope.viewModel.dateToBeDisplayed+" ("+age+" months)";
                        }
                    }
                }

                /**
                 * This function fires when user inputs text in the input text box
                 * if valid date is enter (mm-dd-yyyy), this func updates the view
                 * @param event - key down event
                 */
                scope.dateTextFieldBlur =  function() {
                    var tmpDateAndTime = scope.formatGivenDate(scope.viewModel.dateText);
                    scope.viewModel.dateToBeDisplayed="";
                    var validateDate = scope.viewModel.fnValidateInputDate || scope.validateFormattedDate;
                    validateDate(tmpDateAndTime);
                    if(!scope.viewModel.enableValidation){
                        scope.resetValidationState();
                    }
                }

                /**
                 * clears the validation flag and error message
                 */
                scope.resetValidationState = function(){
                    scope.viewModel.invalid = false;
                    scope.viewModel.errorMessage="";
                }

                /**
                 * Validates the formatted date and updates the model state if there are any validations errors.
                 * @param datetext
                 */
                scope.validateFormattedDate  = function(datetext){
                    var date_reg_ex = /^\d{1,2}\-\d{1,2}\-\d{4}$/;
                    if(datetext.match(date_reg_ex)) {
                        // If only Entered date is a valid date
                        if (scope.isValidDate(datetext) ) {
                            scope.selectDate(datetext);
                            scope.calculateAge();
                            scope.changeCalendarView();
                        }
                    }
                    else if(scope.viewModel.dateText){
                        scope.viewModel.errorMessage =  scope.viewModel.invalidFormatMessage || uitkDateOfBirthDefaults.validationErrorsMap.invalidFormatMessage;
                        scope.viewModel.invalid = true;
                    }else if(scope.viewModel.required){
                        ngModelCtrl.$setViewValue(null);
                        scope.viewModel.invalid = true;
                        scope.viewModel.errorMessage =  scope.viewModel.requiredMessage || uitkDateOfBirthDefaults.validationErrorsMap.requiredMessage;
                    }else{
                        ngModelCtrl.$setViewValue(null);
                        scope.viewModel.invalid = false;
                    }
                }

                return initialize();
            }
        };
    }

    uitkDateOfBirthDirective.$inject = ['uitkDateOfBirthDefaults', '$filter','uitkExceptionService'];

    app.directive("uitkDateOfBirth",uitkDateOfBirthDirective);

}).call(this);

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
var dialogApp = angular.module('uitk.component.uitkDialog',['uitk.component.uitkNavigable','uitk.uitkUtility', 'uitk.component.uitkIconFont']);
var x = window.innerWidth/2, y = window.innerHeight/2;
/**
 * This service is used to register the status of the dialog
 * This can be used to set aria-hidden property to true/false
 */
dialogApp.factory('dialogService', function() {
    var dialogOpened = false;
    return {
        dialogOpened : dialogOpened
    }
})
dialogApp.directive('uitkDialog', ["$timeout", "$document", "dialogService", function($timeout,$document,dialogService) {
    var ESC_KEY_CODE = 27,
        SPACE_KEY_CODE = 32,
        ENTER_KEY_CODE = 13;
    var KEY_BOARD_NAV_CLOSE_TIME = 250;
    return {
        restrict: 'E',
        scope: {
            show: '=',
            dialogRole: '@', // can be "alertdialog" for alerts or "dialog" for user input dialogs
            confirmDialog: '=', // display confirmation dialog if this dialog contains a form
            headerText: '@',
            dialogId: '@',
            defaultHeight: '@',
            defaultWidth: '@',
            triggerElement: '@', // the element that triggers this dialog to open
            callBackHide: '&',//This allows us to provide a callback when the dialog is closed
            callBackShow: '&',//This allows us to provide a callback when the dialog is shown
            tkAriaDescribedby: '@',//This optional attribute to set aria-describedby attribute on the dialog
            tkZindex:'@', //This optional attribute is to configure the z-index of the dialog.(default will be 9999)
            tkCloseButtonText: '@', //This optional attribute to set aria-describedby attribute on the dialog close button
            viewModel: '='
        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        link: function(scope, element, $rootScope) {
            //setting model to empty object if it hasnt been set in the controller
            if(scope.viewModel) {
                scope.model = scope.viewModel;
            } else {
                scope.model = {};
            }

            scope.dialogSize = {
                width: scope.defaultWidth ? scope.defaultWidth: '30%',
                height: scope.defaultHeight
            };

            scope.dialogStyle = {};
            var dialog = element[0].querySelector('.tk-lbox-dialog');
            var dialogOverlay = element[0].querySelector('.tk-lbox-overlay');
            if(scope.tkZindex){
                dialogOverlay.style.zIndex = Number(scope.tkZindex);
                dialog.style.zIndex = Number(scope.tkZindex)+1;
            }
            element[0].querySelector('.tk-lbox-dialog').focus();

            var isIE = false || !!document.documentMode;
            if(isIE && document.documentMode === 9) {
                dialog.style.marginLeft = '-'+ window.innerWidth/5 + 'px';
                dialog.style.marginTop = '-'+ window.innerHeight/4 + 'px';
            }

            /*iOS 8 Safari Prevent Scroll to Input in Focus. Ref: DE96421
            Todo: set position fixed for input controls in modal window
            */
            var ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
            if (ios) {
               /*(function($) {
                    return $.fn.focus = function() {
                      return arguments[0];
                    };
                })(jQuery);*/
            };

            /**
             * This function hides the dialog
             * Confirmation box displayed if the confirmDialog is set to true
             * After this dialog is closed, the focus is set to the element that opens this dialog
             */
            scope.hideModal = scope.model.hideModal || function(event) {
                if(event) {
                    if (event.keyCode !== SPACE_KEY_CODE && event.keyCode !== ENTER_KEY_CODE) {
                        return;
                    };
                }
                if ( scope.confirmDialog ) { // confirmDialog is set to true
                    if (confirm('Are you sure you want to close this dialog?')) { // user clicks 'Yes'
                        scope.show = false;
                        dialog.style.top = '50%';
                        dialog.style.left = '50%';
                        x = window.innerWidth/2; y = window.innerHeight/2;

                        if (typeof clearcountdown === 'function') { clearcountdown(); }

                        if(typeof scope.callBackHide === 'function'){//bind call back to X for close and any button that wants to close
                            scope.callBackHide();
                        }

                        $timeout(function(){
                            angular.element(scope.triggerElement).focus(); // set focus to the trigger element
                        },KEY_BOARD_NAV_CLOSE_TIME);
                    }
                }
                else { // no confirmation box
                    scope.show = false;
                    dialog.style.top = '50%';
                    dialog.style.left = '50%';
                    x = window.innerWidth/2; y = window.innerHeight/2;

                    if (typeof clearcountdown === 'function') { clearcountdown(); }

                    if(typeof scope.callBackHide === 'function'){//bind call back to X for close and any button that wants to close
                        scope.callBackHide();
                    }
                    //angular.element(scope.triggerElement).focus(); // set focus to the trigger element
                    $timeout(function() {
                        angular.element(scope.triggerElement).focus(); // set focus to the trigger element
                    },KEY_BOARD_NAV_CLOSE_TIME);
                }

                scope.$applyAsync();
                return false;
            };
            /**
             *  Use angular $document so we can maintain state and have testable code. No need to trigger element click since we have access to hideModal method.
             * @param {type} event
             */

            function escHandler (event) {
                if (event.keyCode === ESC_KEY_CODE) {
                    scope.hideModal();
                }
            };

            $document.on('keydown', escHandler);

            scope.$on('$destroy', function () {
                $document.off('keydown', escHandler);
            });


            scope.$watch("show", function ( ) {
                $timeout(function(){
                    if (scope.show === true) { // dialog is shown
                        dialogService.dialogOpened = true;
                        // set focus on main div 
                        element[0].querySelector('.tk-lbox-dialog').focus();
                        angular.element(scope.dialogId).focus();//
                        scope.callBackShow();
                    }
                    // else dialog is hidden
                    else {
                        dialogService.dialogOpened = false;
                    }

                }, 500);
            });

            // Function to set the tabbing inside
            scope.setFocus = function(position){
                switch(position) {
                    case 'start':
                        element[0].querySelector('button#'+scope.dialogId+'_closeLink').focus();
                        break;
                    case 'end':
                        var buttonElements = element[0].querySelectorAll('input[type="button"]');
                        if(buttonElements.length > 0) {
                            buttonElements[buttonElements.length - 1].focus();
                            break;
                        } else {
                            var inputElements = element[0].querySelectorAll('input');
                            var spanElement = element[0].querySelector('div.tk-lbox-content span.oui-a11y-hidden');

                            if(inputElements.length > 0) {
                                inputElements[inputElements.length - 1].focus();
                                break;
                            } else if(spanElement){
                                spanElement.focus();
                                break;
                            }
                        }
                }
            };
        },
        template: "<div class='tk-lbox' ng-show='show' id='{{dialogId}}_main'> "+
        "<span class='oui-a11y-hidden tk-lbox-startElem' tabindex='0' id='{{dialogId}}_startElemId' ng-focus=\"setFocus('end')\">{{\'Beginning of dialog\'| uitkTranslate}}</span>"+
        "<div class='tk-lbox-overlay' aria-hidden='{{!show}}' tabindex='-1' style=\"display: block;\"></div>" +
        "<div id='{{dialogId}}' aria-hidden='{{!show}}' tabindex='-1' ng-attr-aria-labelledby='{{dialogId}}_headerId' aria-describedby='{{tkAriaDescribedby ? tkAriaDescribedby : undefined}}' ng-style='dialogSize' class='tk-lbox-dialog' role='{{dialogRole}}'>"+
        "<div class='tk-lbox-content-wrapper'>"+

        "<div id='{{dialogId}}_headerId' tabindex='-1' class='tk-lbox-header'>" +
        "<h2><span uitk-dialog-compile-header='headerText' tabindex='-1'></span></h2>"+
        "</div>"+
        "<div class='tk-lbox-controls' ><button type='button' uitk-navigable='true' ng-attr-aria-describedby='{{tkCloseButtonText ? dialogId + \"_btnClose\" : undefined }}' tabindex='0' id='{{dialogId}}_closeLink' ng-click='hideModal();'><uitk:icon-font icon='cux-icon-close' hidden-text=\"{{'Close' | uitkTranslate}}\"></uitk:icon-font></button><span id='{{dialogId}}_btnClose' ng-if='tkCloseButtonText' class='oui-a11y-hidden'>{{tkCloseButtonText}}</span></div>"+

        "<div id='{{dialogId}}_contentId' class='tk-lbox-content tk-padding-1t' ng-style=\"\" style='height: auto;'><span class='oui-a11y-hidden' tabindex='-1'></span><div ng-transclude></div>" +
        "</div>" +

        "</div>"+
        "</div>" +
        "<span class='oui-a11y-hidden tk-lbox-endElem' tabindex='0' id='{{dialogId}}_endElemId' ng-focus=\"setFocus('start')\">{{\'End of dialog\' | uitkTranslate}}</span>"+

        "</div>"
    };
}]);


dialogApp.directive('uitkDialogCompileHeader', ["$compile", function ($compile) {
    return function ($scope, $element) {
        $compile($scope.headerText)($scope, function (clone) {
            if (!clone.selector) {
                $element.append(clone);
            } else {
                $element.append(clone.selector);
            }
        });
    };
}]);

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.15.0
 */
angular.module('uitk.component.uitkDialogProgressBar', ['uitk.component.uitkNavigable', 'uitk.component.uitkProgressBar', 'uitk.component.uitkButton'])
.directive('uitkDialogProgressBar', function () {
    return {
        scope: {
            model: "="
        },
        replace: true,
        template: [
		             "<div ng-show='model.show && model.progress < 100'>",
		             "<div class='tk-lpgbar-overlay'></div>",
		             "	<div class='tk-lpgbar-dialog' role='alert' aria-live='assertive'>",
		             "		<div class='tk-lpgbar-content-wrapper'>",
		             "			<h2 class='tk-text-align-center'>{{model.headerText}}</h2>",
		             "			<uitk:progress-bar model='model'></uitk:progress-bar>",
		             "<div class='tk-lpgbar-btnspc'>",
		             "			<uitk:button type='button' value='Cancel' ng-click='model.onCancel(); model.progress = 0; model.show = false;' > </uitk:button>",
		             "</div>",
		             "		</div>",
		             "	</div>",
		             "</div>"
        ].join('')
    };
});

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.15.0
 */

(function () {

    /**
	 * This is used for exporting to CSV
	 * @param $compile
	 * @param $rootScope
	 * @param $timeout
	 * @returns {{render: render}}
     */
    var uitkDynamicTableService = function ($compile, $rootScope, $timeout) {
        return {
            render: function (model) {
                var isolatedScope = $rootScope.$new(true);
                model.isExporting = true;
                isolatedScope.exportModel = model;
                $timeout(function () {
                    isolatedScope.$destroy();
                }, 500);
                return $compile("<uitk:dynamic-table view-model='exportModel'></uitk:dynamic-table>")(isolatedScope);
            }
        };
    };

    /**
	 * 
	 * @param $timeout
	 * @param uitkDynamicTableService
	 * @param uitkDynamicTableExporter
	 * @param $filter - used for angular translate
	 * @returns {{restrict: string, replace: boolean, transclude: boolean, scope: {model: string}, controller: controller, link: link, templateUrl: string}}
     */
    var uitkDynamicTable = function ($timeout, uitkDynamicTableService, uitkDynamicTableExporter, $filter, uitkExceptionService, columnCombinations, uitkLiveRegionService) {
        /**
         * Main controller for table component.
         * Contains all functions/logic for default functionality: searching, sorting, pagination, filters, etc
         *
		 * @param {object} $scope
		 * @param {object} tableSortEnum - constant to be used on sort function description (ascending, descending, none)
         * @param {object} uitkEvents - used for logging events
         * @param {attr} $attrs - contains attributes of the table (model, class, etc.)
         * @param {object} uitkTools - utility for setting component IDs
         */
        function controller($scope, tableSortEnum, uitkEvents, $attrs, uitkTools, $element, $http) {
            //LEGACY:KEEP MODEL TO SUPPORT OLD CODE FOR CONSISTENCY WE'RE USING VIEW MODEL FOR ALL COMPONENTS
            if ($scope.viewModel) {
                $scope.model = $scope.viewModel;
            }

            //check crudOptions
            $scope.usingCRUD = false;
            if ($scope.model.crudOptions) {
                if (!_.has($scope.model.crudOptions, 'notificationMessage') || !_.has($scope.model.crudOptions, 'saveRecord')) {
                    uitkExceptionService.throwException("CRUDOptionsException", "notificationMessage (message object) and saveRecord (call back function that returns a promise) are required when using crudOptions on viewModel");
                } else {
                    $scope.usingCRUD = true;
                    //setup modle input holder.
                    $scope.model.columnInput = {};
                }
            }

            $scope.componentId = uitkTools.ComponentId($attrs.id, $scope.model, $element, 'Dynamic Table');

            $scope.preLoadedData = [];
            $scope.model.originalRecords = [];
            $scope.model.selectedRecords = [];
            $scope.model.record = [];
            $scope.model.selectedRecordCount = 0;

            //set bool on overwritable model methods to ensure if we call the default functionality.
            $scope.customOnSortIsDefined = ($scope.model.onSort) ? true : false;
            $scope.customOnSearchIsDefined = ($scope.model.onSearch) ? true : false;
            $scope.customOnPaginateIsDefined = ($scope.model.onPaginate) ? true : false;
            if($scope.model.drawerTemplate===undefined){
                $scope.model.drawerTemplate=false;
            }
            if ($scope.model.customOnEditRowIsDefined === undefined) {
                //When component is initialized second time(when user comes to this screen again), onEditRow function will be available with view-model as onEditRow function is assigned from component if user don't define it
                $scope.customOnEditRowIsDefined = ($scope.model.onEditRow) ? true : false;
                $scope.model.customOnEditRowIsDefined = $scope.customOnEditRowIsDefined;
            }
            else {
                $scope.customOnEditRowIsDefined = $scope.model.customOnEditRowIsDefined;
            }

            //add support for preLoaded data, this allows build in functionality for sort/search/pangination.
            if ($scope.model.records.length > 0 && !$scope.model.isExporting) {
                $scope.preLoadedData = _.clone($scope.model.records);
                $scope.model.records = [];
                $scope.model.totalRecordsCount = 0;
            }

            //Providing default values for Save button in Add/Edit row drawer
            if(!$scope.model.addRowSaveBtnName){
                $scope.model.addRowSaveBtnName = "Save";
            }
            if(!$scope.model.editRowSaveBtnName) {
                $scope.model.editRowSaveBtnName = "Save";
            }
            //Providing default values for Cancel button in Add/Edit row drawer
            if(!$scope.model.addRowCancelBtnName){
                $scope.model.addRowCancelBtnName = "Cancel";
            }
            if(!$scope.model.editRowCancelBtnName) {
                $scope.model.editRowCancelBtnName = "Cancel";
            }

            /**
			 * Function: searches the table for matching criteria
			 * @returns {object} searchConditions: { searchBy: Array,  searchInput: Array } || {} if nothing was searched
			 */
            function getSearchConditions() {
                var searchConditions = $scope.model.columns.reduce(function (conditions, column) {
                    if (column.enableSearch === true && column.searchInput) {
                        conditions.searchBy.push(column.columnId);
                        conditions.searchInput.push(column.searchInput);
                    }
                    return conditions;
                }, { searchBy: [], searchInput: [] });
                return searchConditions.searchBy.length > 0 ? searchConditions : {};
            }

            //set bool on sortable model.column properties.
            if($scope.model.columnSortable === true){
                $scope.model.columns.forEach(function (column) {
                    column.sortable = true;
                });
            }

            /**
			 * Function: sorts the table when a column heading is selected by the end user
			 * @param {string} columnId - heading of the table column that was selected for sorting
             * @returns {object}  {sortBy: string, sortOrder: number }
			 */
            function getSortConditions(columnId) {
                if(typeof columnId === "object" || $scope.model.isMultiSortApplied){ //Check if multi sort applied on column or not
                    return _.cloneDeep($scope.model.multiSortColumns, true);
                }
                else if (columnId) { // Single column sorting
                    var sortColumn = _.find($scope.model.columns, { columnId: columnId });
                    var currentSortState = sortColumn.sortOrder;
                    $scope.model.columns.forEach(function (column) {
                        column.sortOrder = 0;
                    });
                    sortColumn.sortOrder = currentSortState === 0 ? 1 : -currentSortState;
                    return { 'sortBy': [columnId], 'sortOrder': [sortColumn.sortOrder] };
                }
                else {
                    var sortedColumn = _.find($scope.model.columns, function (column) {
                        return column.sortable === true && column.sortOrder !== 0;
                    });
                    return sortedColumn ? {
                        'sortBy': [sortedColumn.columnId],
                        'sortOrder': [sortedColumn.sortOrder]
                    } : {};
                }
            }
            /**
			 * Function: determines which page to navigate the table to
			 * @param {number} requestedPageNumber - page number selected by end user
			 * @returns {object} { pageNumber: number, recordsPerPage: number }
			 */
            function getPaginationParams(requestedPageNumber) {
                if (_.isObject($scope.model.pagination)) {
                    $scope.model.pagination.currentPageNumber = requestedPageNumber;
                    $scope.model.pagination.currentPageNumberInView = requestedPageNumber;
                    return { 'pageNumber': requestedPageNumber, 'recordsPerPage': $scope.table.recordsPerPage() };
                }
                else {
                    return {};
                }
            }

            /**
			 * Function: calls all table functions and assigns all options: search criteria, pagination, and sorting
			 * @param {number} requestedPageNumber - page number selected by end user OR default page number from config
			 * @param {string} sortColumnId - heading of the table column that was selected for sorting by end-user
			 * @returns {object} { pageNumber: number, recordsPerPage: number, sortBy: Array, sortOrder: Array }
			 */
            function getQueryForAllConditions(requestedPageNumber, sortColumn) {
                //Enable the multi selected records link when search criteria, pagination and sorting functions called
                $scope.model.viewAvailableRecords = false;
                return _.assign(getPaginationParams(requestedPageNumber), getSortConditions(sortColumn), getSearchConditions());
            }

            ///Set model functions -------------------------------------------------
            /**
             * Event: updates table with the latest options every time a change is detected
             * @param {object} filterConditions - { pageNumber: number, recordsPerPage: number, sortBy: Array, sortOrder: Array }
             */
            $scope.model.onChange = $scope.model.onChange || function (filterConditions) {
                uitkEvents.setScope($scope).emit('dynamicTable', $scope.componentId + '-controller-onChange', filterConditions);

                //TODO: check for model.enableMultiSelect === true and then prepend the multi-select column to the columns array
                //if($scope.model.enableMultiSelect) {
                //    $scope.model.column;
                //    // prepend lodash style   _.fill(array, value, [start=0], [end=array.length])
                //}

                if ($scope.preLoadedData.length > 0) {
                    //data was preLodaded as static data & not requested from server, let's set the preLoaded data to records.
                    $scope.model.records = $scope.preLoadedData;
                    $scope.model.totalRecordsCount = $scope.preLoadedData.length;
                    // $scope.preLoaded = true;
                }

                if ($scope.updateOriginalRecords === true) {
                    $scope.model.records = _.clone($scope.model.originalRecords);
                    $scope.model.totalRecordsCount = $scope.model.records.length;
                    $scope.updateOriginalRecords = false;
                }


                if ($scope.model.originalRecords.length === 0) {
                    $scope.model.originalRecords = _.clone($scope.model.records);
                }


                var filteredData = _.clone($scope.model.originalRecords).slice();

                //only call onSearch Action if onSearch is not defined by end-developer
                if ($scope.customOnSearchIsDefined === false) {
                    filteredData = $scope.table.onSearchEvent(filterConditions, filteredData);
                }
                //only call onSort Action if onSort is not defined by end-developer.
                if ($scope.customOnSortIsDefined === false) {
                    filteredData = $scope.table.onSortEvent(filterConditions, filteredData);
                }
                $scope.model.totalRecordsCount = filteredData.length;
                //only call onPaginate Action if onPaginate is not defined by end-developer.
                if ($scope.customOnPaginateIsDefined === false) {
                    filteredData =$scope.table.onPaginateEvent(filterConditions, filteredData);
                }
                $scope.model.records = filteredData;
            };


            /**
			 * Event: updates table with the latest options every time a sort is performed by end-user
			 * @param {string} columnId - heading of the table column that was selected for sorting by end-user
             * @returns {object} { pageNumber: number, recordsPerPage: number, sortBy: Array, sortOrder: Array }
			 */
            $scope.model.onSort = $scope.model.onSort || function (columnId) {
                $scope.model.isMultiSortApplied = false;
                $scope.model.onChange(getQueryForAllConditions(1, columnId));
            };

            /**
             * Event: updates table with the selected rows whenever one is selected by end-user
             * @param {string} columnId - heading of the table column that was selected for sorting by end-user
             * @returns {object} { pageNumber: number, recordsPerPage: number, sortBy: Array, sortOrder: Array }
             */
            $scope.model.onRowSelect = $scope.model.onRowSelect || function (event, record, selected) {
                if ($scope.model.enableMultiSelect) {
                    $scope.model.onChange(getQueryForAllConditions($scope.model.pagination.currentPageNumber), $scope.table.onRowSelectEvent(event, record, selected));
                }
            };

            /**
             * Event: updates table with the selected rows whenever one is selected by end-user
             * @param {string} columnId - heading of the table column that was selected for sorting by end-user
             * @returns {object} { pageNumber: number, recordsPerPage: number, sortBy: Array, sortOrder: Array }
             */
            $scope.model.onSelectAllRows = $scope.model.onSelectAllRows || function (selectAll) {
                if ($scope.model.enableMultiSelect) {
                    $scope.model.onChange(getQueryForAllConditions($scope.model.pagination.currentPageNumber), $scope.table.onSelectAllRowsEvent(selectAll));
                }
            };

            /**
			 * Event: updates table with the latest options every time a pagination is performed by end-user
			 * @param {number} requestedPageNumber - page number requested to navigate to by end-user
			 */
            $scope.model.onPaginate = $scope.model.onPaginate || function (requestedPageNumber) {
                $scope.model.pagination.pageNumberError = false;
                $scope.model.onChange(getQueryForAllConditions(requestedPageNumber));
            };

            /**
			 * Event: updates table with the latest options every time a search is performed by end-user
             */
            $scope.model.onSearch = $scope.model.onSearch || function () {
                if($scope.model.loadPersistedModel !== true){
                    $scope.model.onChange(getQueryForAllConditions(1));
                }
            };

            /**
             * Event: updates table with the latest options every time a search is performed by end-user
             */
            $scope.model.onMultiSort = $scope.model.onMultiSort || function () {
                $scope.model.onChange(getQueryForAllConditions(1, $scope.model.multiSortColumns));
            };

            /**
			 * onLoad func get called when table initialize and when table refresh
			 * @type {Function|*}
			 */
            $scope.model.onLoad = $scope.model.onLoad || function (refresh) {

                if($scope.model.loadPersistedModel && typeof $scope.model.getPersistedModel == 'function'){
                    loadViewModel();
                }
                else {
                    if (refresh) {
                        $scope.model.onChange(_.assign({ refresh: true }, getQueryForAllConditions($scope.model.pagination ? $scope.model.pagination.currentPageNumber : 0)));
                    } else {
                        $scope.model.onChange(getQueryForAllConditions(1));
                    }
                }
                return refresh;
            };

            /**
             * getPersistingModel function is used to extract persisted data from viewModel
             * @type {Function|*}
             * @return {persistingModel}
             */
            $scope.model.getPersistingModel = function(){
                var persistingModel = {
                    componentId : $scope.componentId
                };
                var that = this;
                _.forEach(['pagination','isMultiSortApplied','multiSortColumns'], function(property){
                    if(!_.isUndefined(that[property])){
                        persistingModel[property] = _.cloneDeep(that[property]);
                    }
                });
                persistingModel.columns = [];
                _.forEach(that.columns, function(column){
                    var persistingModelColumn = {};
                    _.forEach(['columnId','sortOrder','sortable','layoutOrder','enableSearch','searchInput','showColumnInTable'], function(property){
                        if(!_.isUndefined(column[property])){
                            persistingModelColumn[property] = column[property];
                        }
                    });
                    persistingModel.columns.push(persistingModelColumn);
                });
                return persistingModel;
            }

            /*
             * loadViewModel function fetch view model
             * @type {Function|*}
             * @return {persistingModel}
             */
            function loadViewModel(){
                var persistedViewModel = $scope.model.getPersistedModel($scope.componentId);
                persistedViewModel.$promise.then(function(result){
                    if(result.pagination){
                        for(var property in result.pagination){
                            $scope.model.pagination[property] = result.pagination[property];
                        }
                    }
                    if(result.columns){
                        _.forEach($scope.model.columns, function(column){
                            var persistedColumn = _.find(result.columns ,function(obj) { return obj.columnId === column.columnId; });
                            if(persistedColumn){
                                _.forEach(['sortOrder','sortable','layoutOrder','enableSearch','searchInput','showColumnInTable'], function(property){
                                    column[property] = persistedColumn[property];
                                });
                            }
                        });
                    }

                    $scope.model.isMultiSortApplied = result.isMultiSortApplied;
                    if(result.multiSortColumns){
                        $scope.model.multiSortColumns = _.cloneDeep(result.multiSortColumns);
                    }
                    $timeout(function(){
                        $scope.model.loadPersistedModel = false;
                        $scope.model.onChange(_.assign({ refresh: true }, getQueryForAllConditions($scope.model.pagination ? $scope.model.pagination.currentPageNumber : 0)));
                    });
                });
            }

            $scope.table = {
                /**
                 * This is the default on sort content functionality
                 * @param {object} filterCondition
                 */
                onSortEvent: function (filterCondition, filteredData) {
                    //console.log('filterCondition - ' + filterCondition+' '+ 'filteredData - ' + filteredData);
                    //sort
                    if (filterCondition.sortBy && filterCondition.sortBy.length > 0) {
                        filterCondition.sortBy.forEach(function (sortByField, index) { // not true multi column sort
                            var sortOrder = filterCondition.sortOrder[index];
                            //find combination columns. In UITK, it's the Name column (Last Name, First Name)
                            var colOption = _.find($scope.model.columns, 'combination'); // this only return when one of the columns has 'combination'
                            var sortableColumn = _.find($scope.model.columns, {'columnId':sortByField});
                            if ( typeof colOption !== 'undefined' ) {
                                var combinedColumnId = colOption.columnId;
                                if (combinedColumnId === sortByField && sortOrder) {
                                    filteredData = _.sortBy(filteredData, function (row) {
                                        return columnCombinations(colOption.combination, row);
                                    });
                                    filteredData = sortOrder === -1 ? filteredData.reverse() : filteredData;
                                } else if (sortByField && sortOrder) {
                                    filteredData = _.sortBy(filteredData, sortByField);
                                    filteredData = sortOrder === -1 ? filteredData.reverse() : filteredData;
                                }
                            }
                            else {
                                if (sortByField && sortOrder) {
                                    filteredData = _.sortBy(filteredData, function(obj){
                                        if( sortableColumn.dataType == "text" ){
                                            return obj[sortByField]?obj[sortByField].toLowerCase():obj[sortByField]
                                        }
                                        else {
                                            return obj[sortByField];
                                        }
                                    }); //sorting column data in a case insensitive manner.
                                    filteredData = sortOrder === -1 ? filteredData.reverse() : filteredData;
                                }
                            }

                        });
                    }
                    return filteredData;
                },
                /**
                 * This is the default search content functionality
                 * @param {object} filterCondition - { pageNumber: number, recordsPerPage: number, sortBy: Array, sortOrder: Array }
                 */
                onSearchEvent: function (filterCondition, filteredData) {

                    //begin search
                    if (filterCondition.searchBy && filterCondition.searchBy.length > 0) {

                        filterCondition.searchBy.forEach(function (searchByItem, index) {
                            var searchExact = false,
                                searchType = 'exact',
                                columnToSearchByType = _.find($scope.model.columns, { searchByItemType: searchType });

                            if (typeof columnToSearchByType != 'undefined') {
                                searchExact = searchByItem.toLowerCase() === columnToSearchByType.columnId && columnToSearchByType.searchByItemType === searchType;
                            }

                            if (searchExact) {
                                filteredData = filteredData.filter(function (record) {
                                    return record[searchByItem].toLowerCase() === filterCondition.searchInput[index].toLowerCase();
                                });
                            } else { //search includes
                                filteredData = filteredData.filter(function (record) {
                                    return _.includes(record[searchByItem].toLowerCase(), filterCondition.searchInput[index].toLowerCase());
                                });
                            }
                        });
                    }
                    return filteredData;
                },
                /**
                 * This is the default on Select Row functionality
                 * @param {event} event
                 * @param {object} record - the record that was selected by end-user
                 * @param {type} selected - left for LEGACY code
                 */
                onRowSelectEvent: function (event, record, selected) {
                    var model = $scope.model, availableRecords = _.clone($scope.model.originalRecords).slice(), allSelected = true;

                    //TODO: change this to _isUndefined()
                    if (typeof selected === 'undefined') {
                        if (event.target.tagName === 'A' || event.target.tagName === 'INPUT') {
                            return;
                        }
                        record.selected = !record.selected;
                    }

                    // checking to see if the item selected by the end user already exists in the selectedRecords array
                    var itemAlreadyExists = _.some(model.selectedRecords, function (item) {
                        return item === record;
                    });

                    // if the item does not already exist when selected by end user, then we will add it in.
                    // if the item is deselected then we are removing it from the array
                    if (itemAlreadyExists) {
                        model.selectedRecords.splice(record, 1);
                    } else {
                        model.selectedRecords.push(record);
                    }

                    // if the available records match then selected records then we know everythign has been selected
                    // otherwise we know some records are not selected
                    if (availableRecords.length !== model.selectedRecords.length) {
                        allSelected = false;
                    } else {
                        allSelected = true;
                    }
                    model.selectAllChecked = allSelected;
                    model.totalRecordsCount = availableRecords.length;
                    model.records = availableRecords;
                    model.selectedRecordCount = model.selectedRecords.length;
                },
                /**
                 * This is the default on Select All Rows functionality
                 * @param {boolean} selectAll
                 */
                onSelectAllRowsEvent: function (selectAll) {
                    var model = $scope.model, availableRecords = _.clone($scope.model.originalRecords).slice();
                    model.selectedRecords = [];

                    for (var row = 0 ; row < availableRecords.length ; row++) {
                        if (selectAll) {
                            availableRecords[row].selected = true;
                            model.selectedRecords.push(availableRecords[row]);
                        } else {
                            if (availableRecords[row].selected) {
                                availableRecords[row].selected = false;
                                model.selectedRecords = [];
                            }
                        }
                    }
                    model.totalRecordsCount = availableRecords.length;
                    model.records = availableRecords;
                    model.selectedRecordCount = model.selectedRecords.length;
                },

                /**
                 * This is the number of selected records functionality, it will enable the user has made at least one selection via the checkboxes
                 *
                 */
                showSelectedRecordsEvent: function(){
                    var model = $scope.model;
                    model.records = model.selectedRecords;

                    model.selectAllChecked = true;
                    model.viewAvailableRecords = true;
                },

                /**
                 * This is the View All Records functionality
                 *
                 */
                viewAllRecordsEvent: function(){
                    var model = $scope.model;
                    model.selectedRecordCount = 0;

                    _.each($scope.model.selectedRecords, function(record){
                        record.selected =false;
                    });

                    model.selectedRecords = [];

                    //$scope.model.records = $scope.model.originalRecords;
                    this.clearAllFilters();
                    model.selectAllChecked = false;
                    model.viewAvailableRecords = false;
                },
                /**
                 * This is the default on pagination content functionality
                 * @param {type} filterCondition - { pageNumber: number, recordsPerPage: number, sortBy: Array, sortOrder: Array }
                 */
                onPaginateEvent: function (filterCondition, filteredData) {

                    //pagination
                    if (filterCondition.pageNumber && filterCondition.recordsPerPage) {
                        filteredData = filteredData.splice(filterCondition.pageNumber > 1 ? ((filterCondition.pageNumber - 1) * filterCondition.recordsPerPage) : 0, filterCondition.recordsPerPage);
                    };
                    return filteredData;
                },
                /**
                 * @returns {object} { currentPageNumber: number, paginationWindow: number, recordsPerPage: Array, recordsPerPageChoices: Array }
                 */
                showPagination: function () {
                    return $scope.model.pagination;
                },
                /**
                 * This is the default functionality for determining how many records to display per page
                 * @returns {number} recordsPerPage OR totalRecordsCount
                 */
                recordsPerPage: function () {
                    return $scope.model.pagination ? $scope.model.pagination.recordsPerPage : $scope.model.totalRecordsCount;
                },
                /**
                 * This is the default functionality for determining total pages
                 * @returns {number} total number of pages in the table
                 */
                totalPagesCount: function () {
                    var quotient = parseInt($scope.model.totalRecordsCount / $scope.table.recordsPerPage(), 10);
                    var remainder = ((($scope.model.totalRecordsCount === 0 ? 1 : $scope.model.totalRecordsCount) % $scope.table.recordsPerPage()) > 0 ? 1 : 0);
                    return quotient + remainder;
                },
                /**
                 * This is the default functionality for determining if there is a previous page
                 * @returns {boolean}
                 */
                hasPreviousPage: function () {
                    return $scope.model.pagination.currentPageNumber === 1 ? false : true;
                },
                /**
                 * This is the default functionality for determining previous page number
                 * @returns {number} previous page number
                 */
                previousPageNumber: function () {
                    return $scope.model.pagination.currentPageNumber - 1;
                },
                /**
                 * This is the default functionality for determining if there is a next page available
                 * @returns {boolean}
                 */
                hasNextPage: function () {
                    return this.totalPagesCount() !== $scope.model.pagination.currentPageNumber;
                },
                /**
                 * This is the default functionality for determining the next page number
                 * @returns {number} next page number
                 */
                nextPageNumber: function () {
                    return $scope.model.pagination.currentPageNumber + 1;
                },
                /**
                 * This is the default functionality for determining the last page number
                 * @returns {number} page length of table
                 */
                lastPageNumber: function () {
                    return this.totalPagesCount();
                },
                /**
                 * This is the default functionality for determining the table sort order
                 * @returns {string} table sort order constant
                 */
                sortOrderDescription: function (sortOrder) {
                    switch (sortOrder) {
                        case -1:
                            return tableSortEnum.DECENDING;
                        case 1:
                            return tableSortEnum.ASCENDING;
                        default:
                            return tableSortEnum.NONE;
                    }
                },
                /**
                 * This is the default functionality for removing all filters/options applied to the table: searching, sorting, pagination
                 */
                clearAllFilters: function () {
                    ['pagination', 'columns', 'clearAllFilters'].forEach(function (attr) {
                        if ($scope.model.__init__[attr] && $scope.model.__init__[attr] instanceof Array) {
                            $scope.model.__init__[attr].forEach(function (el, index) {
                                for (var prop in el) {
                                    if (attr === 'columns' && prop !== 'layoutOrder') {
                                        $scope.model[attr][index][prop] = $scope.model.__init__[attr][index][prop];
                                    }
                                }
                            });
                        } else if ($scope.model.__init__[attr] && $scope.model.__init__[attr] instanceof Object) {
                            for (var prop in $scope.model.__init__[attr])
                                $scope.model[attr][prop] = $scope.model.__init__[attr][prop];
                        } else if ($scope.model.__init__[attr]) {
                            $scope.model[attr] = $scope.model.__init__[attr];
                        }
                    });
                    $scope.model.onChange(getQueryForAllConditions(1));
                },

                /**
				 * Export is used for exporting data to CSV format
				 */
                export: function () {
                    var filterConditions = _.assign(getSortConditions(), getSearchConditions());
                    filterConditions.pageNumber = 1;
                    filterConditions.recordsPerPage = $scope.model.totalRecordsCount;
                    $scope.model.onExport(filterConditions, function (result, fileName) {
                        var model = angular.copy($scope.model);
                        model.pagination = { currentPageNumber: 1, recordsPerPage: $scope.model.totalRecordsCount };
                        model.records = result.records;
                        model.totalRecordsCount = result.totalRecordsCount;
                        //exclude the columns from being exported based on the excludeFromExport flag
                        _.remove(model.columns, function (currentColumn) {
                            return currentColumn.excludeFromExport;
                        });
                        var content = uitkDynamicTableService.render(model);

                        $timeout(function () {
                            uitkDynamicTableExporter(content, fileName);
                        });
                        return model;
                    });
                },
                exportNestedData: function () {
                    var filterConditions = _.assign(getSortConditions(), getSearchConditions());
                    filterConditions.pageNumber = 1;
                    filterConditions.recordsPerPage = $scope.model.totalRecordsCount;
                    $scope.model.onExportNestedData(filterConditions);
                    return filterConditions;
                }
            };

            //set pagination options
            if (_.isObject($scope.model.pagination)) {
                $scope.model.pagination.currentPageNumber = $scope.model.pagination.currentPageNumber || 1;
                $scope.model.pagination.paginationWindow = $scope.model.pagination.paginationWindow || 5;
                $scope.model.pagination.recordsPerPage = $scope.model.pagination.recordsPerPage || 10;
                $scope.model.pagination.recordsPerPageChoices = $scope.model.pagination.recordsPerPageChoices || [10, 25, 50, 75, 100];
            }

            $scope.model.records = $scope.model.records || [];

            // default initialization and watchers
            $scope.model.columns.forEach(function (column) {
                if (column.enableSearch === true) {
                    var columnIdRef = column.columnId;
                    column.searchInput = column.searchInput ? column.searchInput : '';
                    $scope.$watch(function ($scope) {
                        // Console Errors Issue for Dynamic Columns Filter
                        var col = _.find($scope.model.columns, { columnId: columnIdRef });
                        if (col) {
                            return col.searchInput;
                        }
                    }, _.after(2, $scope.model.onSearch));
                }
                if (column.sortable === true && !_.includes([1, 0, -1], column.sortOrder)) {
                    column.sortOrder = 0;
                }

                // enable column resizable by defaults
                if ( column.resizable === undefined ) {
                    column.resizable = true;
                }
            });

            if (!$scope.model.__init__) { // save initial state of component
                $scope.model.__init__ = {};
                ['pagination', 'columns', 'clearAllFilters','multiSortColumns'].forEach(function (attr) {
                    if ($scope.model[attr]) {
                        $scope.model.__init__[attr] = angular.copy($scope.model[attr]);
                    }
                });

                if ($scope.model.__init__.pagination && $scope.model.__init__.pagination.recordsPerPage) {
                    delete $scope.model.__init__.pagination.recordsPerPage;
                }
            }

            $scope.isRowsSelected = false;
            if ($scope.model) {
                //if we have a model, let's watch the selectedRecordCount so that we can determine when a row is selected
                $scope.$watch('model.selectedRecordCount', function (value) {
                    if (value > 0) {
                        $scope.isRowsSelected = true;
                    } else {
                        $scope.isRowsSelected = false;
                    }
                }, true);
            }

            <!-- Busy indicator model -->
            $scope.model.busyIndicatorModel = {
                imageUrl : '/uitk-component-showcase/app/images/loader.gif',
                text : 'The application will be available shortly.'
            };

            if ( $scope.model.showBusyIndicator ) {
                $http({
                    url: 'delay',
                    method: 'GET',
                    params: { delayTime: '6' }
                }).success(function() {

                }).error(function() {
                });
            }
        }
        controller.$inject = ["$scope", "tableSortEnum", "uitkEvents", "$attrs", "uitkTools", "$element", "$http"];

        /**
		 *
		 * @param $scope
		 * @param $element
         */
        function link($scope, $element,$ctrl) {

            if ($element[0].id) {
                $scope.rowsDropdownId = $element[0].id + "_rppOptions";
            }

            if (!_.isEqual($scope.model.columns, _.uniq($scope.model.columns, 'columnId'))) {
                $element.html('Error : DuplicateColumnIdException');
                uitkExceptionService.throwException(
                    'DuplicateColumnIdException',
                    'Duplicate column id names found'
                );
            }
            var sortedColumnCount = _.filter($scope.model.columns, function (column) {
                return column.sortable === true && column.sortOrder !== 0;
            }).length;
            if (sortedColumnCount > 1) {
                $element.html('Error : MultipleColumnSortConfigurationError');
                uitkExceptionService.throwException(
                    'MultipleColumnSortConfigurationError',
                     'Use multiSortColumns for multi column sort'
                );
            }

            var allowedDataType = ['character', 'number', 'date', 'text', 'icon', 'checkbox'];
            _.forEach($scope.model.columns, function (column) {
                if (column.dataType && !_.includes(allowedDataType, column.dataType)) {
                    uitkExceptionService.throwException(
                        'DataTypeNotSupportedException',
                        column.dataType + ' is not supported'
                    );
                }
            });

            if ($scope.model.records.length === 0) {
                $scope.model.onLoad(true);
            }

            //Conditional vars/func to be used in view
            //if we are using a table with pagaination do the following;
            if ($scope.model.pagination) {
                $scope.pageNumberIsBad = function (pageNumber) {
                    return pageNumber != $scope.model.pagination.currentPageNumber && pageNumber < 0;
                };
                $scope.isPageNumberIsGood = function (pageNumber) {
                    return pageNumber != $scope.model.pagination.currentPageNumber && pageNumber > 0;
                };
                $scope.isPageNumberEqualToCurrent = function (pageNumber) {
                    return pageNumber === $scope.model.pagination.currentPageNumber;
                };

                //Assign default page number
                $scope.model.pagination.currentPageNumberInView = $scope.model.pagination.currentPageNumber;
                $scope.model.pagination.pageNumberDescribedBy = $scope.componentId + '_pageNumber';

                if($scope.model.pagination.showPaginationFooter===undefined){
                    $scope.model.pagination.showPaginationFooter = true;
                }
            };


            $scope.showTableOptions = $scope.model.clearAllFilters === true || $scope.model.onExport || $scope.model.onExportNestedData || ($scope.model.links && $scope.model.links.length !== 0) || $scope.model.enableMultiSelect === true;
            $scope.isFiltersClear = $scope.model.clearAllFilters === true;

            /*
             * This function is used to check if filter is applied to column or not
             * @type {Function|*}
             * @return true if filter is applied
             */
            $scope.isFiltersApplied = function(){
                var filterApplied = false;
                _.forEach($scope.model.columns, function(column){
                    if(column.searchInput !== "" && column.searchInput !== undefined){
                        filterApplied = true;
                        return false;
                    }

                });
                return filterApplied;
            };
            $scope.isColumnSortable = function (column) {
                return column.sortable === true;
            };
            $scope.sortOrderEqualTo = function (column, order) {
                switch (order) {
                    case 1:
                        return column.sortOrder === order;
                        break;
                    case -1:
                        return column.sortOrder === order;
                        break;
                    case 0:
                        return column.sortOrder === order;
                        break;
                    default:
                        return column.sortOrder !== 0;
                        break;
                }
            };

            /*
             * This function is used to check if multi sort is applied to column or not
             * @type {Function|*}
             * @param {Object} column object
             * @return {boolean} true if multi sort applied to column else false
             */
            $scope.isMultiSortColumn = function(column) {
                var returnFlag = false;
                if($scope.model.isMultiSortApplied){
                    _.forEach($scope.model.multiSortColumns.sortBy, function(sortByColumn){
                        if(sortByColumn === column.columnId){
                            returnFlag = true;
                            return false;
                        }
                    });
                }
                return returnFlag;
            };

            /*
             * This function is used to check sort order of multi sort column
             * @type {Function|*}
             * @param {Object} column object
             * @param {number} sort order
             * @return {boolean} true if column sort order and order is matching else false
             */
            $scope.multiSortOrderEqualTo = function (column, order) {
                var returnFlag = false;
                _.forEach($scope.model.multiSortColumns.sortBy, function(sortByColumn, index){
                    if(sortByColumn === column.columnId && $scope.model.multiSortColumns.sortOrder[index] === order){
                        returnFlag = true;
                        return false;
                    }
                });
                return returnFlag;
            };

            /*
             * This function handles key press and blur events for manual pagination.
             * Calls onPaginate when user press enter key or on blur event.
             *
             * Check if entered page number is within the available page range
             */
            $scope.pageNumberEvent = function(event) {
                var key = event.keyCode || event.which;
                var pageNumber;

                if ($scope.model.pagination.currentPageNumberInView) {
                    pageNumber = parseInt($scope.model.pagination.currentPageNumberInView, 10);
                }

                if(key == 13 || event.type === "blur") {
                    if(pageNumber === undefined || pageNumber < 1 || pageNumber > $scope.table.totalPagesCount()) {
                        $scope.model.pagination.pageNumberError = true;
                        $scope.model.pagination.pageNumberDescribedBy = $scope.componentId + '_pageError';
                        //A11Y changes - Announce error message
                        uitkLiveRegionService.alertMessage("Enter a valid number, one that is in the page range", true);
                        return;
                    } else {
                        $scope.model.pagination.pageNumberError = false;
                        $scope.model.pagination.pageNumberDescribedBy = $scope.componentId + '_pageNumber';
                        if (pageNumber != $scope.model.pagination.currentPageNumber) {
                            $scope.model.onPaginate(pageNumber);
                            //A11Y changes - Announce only if page number is different from previous
                            uitkLiveRegionService.alertMessage("showing page " + $scope.model.pagination.currentPageNumberInView + "of " + $scope.table.totalPagesCount(), true);
                        }
                    }
                }
            };

            $scope.rowSelectedandEditing = $scope.model.onRowSelect && $scope.customOnEditRowIsDefined || $scope.usingCRUD;

            // TODO: Need to update these variables and bind them to the view
            /*
             $scope.noTotalRecordsCount = ($scope.model.totalRecordsCount === 0) ? true : false;
             $scope.showRowTemplate = !$scope.model.rowTemplate && $scope.model.totalRecordsCount !== 0;
             $scope.hasRowTemplate = $scope.model.rowTemplate && $scope.model.totalRecordsCount !== 0;
             */

            if ($scope.model.fixedHeader) {
                var $uitk_table, $uitk_table_ths, $uitk_table_lastRow, offsetTop, offsetBottom,rowCount;

                $(window).scroll(
                    function () {
                        // Callback for any scrolling. Cache the variables as computing on every scroll is expensive.
                        if (!$uitk_table) {
                            $uitk_table = angular.element("#" + $scope.componentId + " .tk-dtbl").first();
                            $uitk_table_ths = angular.element($uitk_table).find("th");
                            offsetTop = angular.element($uitk_table).offset().top;
                            $uitk_table_lastRow = angular.element($uitk_table, "tbody > tr:last-child > td:first-child");
                            offsetBottom = angular.element($uitk_table_lastRow).offset().top + angular.element($uitk_table_lastRow).outerHeight();
                            rowCount = $uitk_table[0].rows.length;
                        }
                        // Checking whether the number of rows changed or not in the table on scroll if yes then only we are cache the new position of the last row
                        if($uitk_table[0].rows.length != rowCount){
                            $uitk_table_lastRow = angular.element($uitk_table, "tbody > tr:last-child > td:first-child");
                            offsetBottom = angular.element($uitk_table_lastRow).offset().top + angular.element($uitk_table_lastRow).outerHeight();
                            rowCount = $uitk_table[0].rows.length;
                        }
                        var winScroll = $(window).scrollTop();

                        // See if the table has scrolled off screen yet
                        if (winScroll - offsetTop > 0 && winScroll < offsetBottom) {
                            $uitk_table_ths.css({
                                "position": "relative",
                                "top": (winScroll - offsetTop - 1),
                                "background-color": "#f3f3f3",
                                "z-index": 2
                            });
                        } else {
                            $uitk_table_ths.css("top", 0);
                        }
                    }
                );
            }

            // Show/hide: validating enable hiding and is Included default properties
            _.each($scope.model.columns, function(column){
                if(column.showAlways === undefined){
                    column.showAlways = false;
                }
                if(column.showColumnInTable === undefined){
                    column.showColumnInTable = true;
                }
                return column;
            });
        }

        /**
		 *
		 */
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                //LEGACY: to support old code.
                model: '=?',
                //NEW for consistency
                viewModel: '='
            },
            controller: controller,
            link: link,
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || 'template/uitk-dynamic-table.html';
            }

        };
    };

    uitkDynamicTableService.$inject = ['$compile', '$rootScope', '$timeout'];
    uitkDynamicTable.$inject = ['$timeout', 'uitkDynamicTableService', 'uitkDynamicTableExporter', '$filter', 'uitkExceptionService', 'columnCombinations', 'uitkLiveRegionService'];

    angular.module('uitk.component.uitkDynamicTable', [
		'uitk.component.uitkNavigable',
		'uitk.component.ngCsv',
        'uitk.uitkUtility','uitk.component.uitkRadioGroup','uitk.component.uitkSelect'])
        .run(["$rootScope", function($rootScope){

            document.addEventListener("touchstart", touchHandler, true);
            document.addEventListener("touchmove", touchHandler, true);
            document.addEventListener("touchend", touchHandler, true);
            document.addEventListener("touchcancel", touchHandler, true);

            function touchHandler(event)
            {
                $rootScope.$apply(function() {
                    var touches = event.changedTouches,
                        first = touches[0],
                        type = "";

                    switch (event.type) {
                        case "touchstart":
                            type = "mousedown";
                            break;
                        case "touchmove":
                            type = "mousemove";
                            break;
                        case "touchend":
                            type = "mouseup";
                            break;
                        default:
                            return;
                    }
                    var simulatedEvent = document.createEvent("MouseEvent");
                    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                        first.screenX, first.screenY,
                        first.clientX, first.clientY, false,
                        false, false, false, 0/*left*/, null);

                    first.target.dispatchEvent(simulatedEvent);
                    //event.preventDefault();

                    var $target = $(event.target.parentElement);
                    if ($target.hasClass('tk-row-order')) {
                        event.preventDefault();
                    }
                })
            }

        }])
	.factory('uitkDynamicTableService', uitkDynamicTableService)
	.directive('uitkDynamicTable', uitkDynamicTable)
    .constant('tableSortEnum', {
        DECENDING: 'descending',
        ASCENDING: 'ascending',
        NONE: 'none'
    });

})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.component.uitkErrorHandler', ['uitk.component.uitkDialog'])
.factory('uitkErrorHandlerModel', function(){
  return {
    show  : false,
    header : 'Error',
    message : "Error has occured"
  };
})
.factory('uitkErrorHandlerHttpInterceptor', ["$q", "uitkErrorHandlerModel", function($q, uitkErrorHandlerModel){
  return {
    requestError : function(rejection) {
      uitkErrorHandlerModel.show = true;
      uitkErrorHandlerModel.message = "HTTP Request Error";
      return $q.reject(rejection);
    },
    responseError : function(rejection) {
      uitkErrorHandlerModel.show = true;
      uitkErrorHandlerModel.message = "HTTP Response Error";
      return $q.reject(rejection);
    }
  };
}])
.directive('uitkErrorHandler', ["uitkErrorHandlerModel", function(uitkErrorHandlerModel){

  function link($scope) {
    $scope.model = uitkErrorHandlerModel;

    $scope.closeModal = function() {
      $scope.model.show = false;
    };
  }

  return {
    restrict : 'E',
    replace : true,
    link : link,
    scope : true,
    template :
    [
     "<div> ",
     "  <uitk:dialog dialog-id='uitkErrorHandlerPopUp' dialog-role='dialog' ",
     "               header-text='{{model.header}}' show='model.show' ng-if='model.show' default-width='30%'>",
     "  {{model.message}} ",
     "  </uitk:dialog>",
     "</div> "
    ].join('')
  };
}])
.config(["$provide", "$httpProvider", function ($provide, $httpProvider) {
  $provide.decorator("$exceptionHandler", ['$delegate', 'uitkErrorHandlerModel', function($delegate, uitkErrorHandlerModel) {
    return function(exception, cause) {
      uitkErrorHandlerModel.show = true;
      uitkErrorHandlerModel.message = exception.stack;
      $delegate(exception, cause);
    };
  }]);
  $httpProvider.interceptors.push('uitkErrorHandlerHttpInterceptor');
}]);

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.component.uitkFileUpload', ['uitk.component.uitkNavigable','uitk.uitkUtility'])
    .directive('uitkFileUpload', ["$timeout", "$compile", function($timeout,$compile){

        function link($scope, $element) {

            $scope.uploadCount = 0;
            $scope.totalFileCount = 0;
            $scope.progressFileCount = 0;
            $scope.model.onLoad();
            $scope.model.fileUploadButtonFocus = false;
            var digits_to_words = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen ', 'twenty '];

            var mandatoryFields = ['id','acceptFileTypes','uploadUrl'];
            _.forEach(mandatoryFields, function(attr){ if(attr && !$scope.model.hasOwnProperty(attr)){
                throw {
                    name : 'MandatoryFieldMissingException',
                    message : attr + ' mandatory field is missing'
                };
            }});

            // $scope.show = false;
            // $scope.hide = function(){
            //     $scope.show = false;
            // }

            if(!$scope.model.maxFileSize) {
                $scope.model.maxFileSize = "5";
            }

            if(!$scope.model.maxFileNumber) {
                $scope.model.maxFileNumber = "3";
            }

            $scope.model.selectFilesBtn = $scope.model.selectFilesBtn || "Select Files";
            $scope.model.tablePlaceholderValue = $scope.model.tablePlaceholderValue || "Select files to upload.";

            if(bowser && bowser.name === "Internet Explorer" && bowser.version==="9.0"){
                /*fix for IE9 security issue. (IE9 does not allow to click on the input file button programatically)*/
                $scope.enableFileUploadButton = true;
            }else{
                $scope.enableFileUploadButton = false;
            }


            if(parseInt($scope.model.maxFileNumber, 10) > 20) {
                throw {
                    name : 'MaxFileNumberException',
                    message : attr + ' cannot be more than 20'
                };
            }

            if(!$scope.model.validFileNameRegEx) {
                $scope.model.validFileNameRegEx = "^[\\w^'@{}\\[\\],$=!\\-().~;`_]*$";
            }

            if(!$scope.model.sequentialUploads){
                $scope.model.sequentialUploads = false;
            }

            $scope.blur = function(){
                $scope.model.fileUploadButtonFocus = false;
            };

            $scope.focus = function(){
                $scope.model.fileUploadButtonFocus = true;
            };

            $scope.setFileUploadButtonFocus = function(){
                $scope.model.fileUploadButtonFocus = false;
            };

            $scope.selectFilesEventHandler = function(){
                $timeout(function(){
                    $("#"+$scope.model.id).click();
                },100);
            };

            $scope.model.getFileUploadCount = function() {
                return $scope.uploadCount;
            }

            $scope.model.getTotalFileCount = function() {
                return $scope.totalFileCount;
            }


            function sortTable(table) {
                var tbody = table.find('tbody');

                tbody.find('tr').sort(function(a, b) {
                    return $('td:first', a).text().localeCompare($('td:first', b).text());
                }).appendTo(tbody);
            }

            $timeout(function() { // extra code
                $element.find(".oui-upld").each( function( index, element ) {
                        var fileIndexer = 0;
                        var fileUploadCounter = 0; //Used to keep of multiple file count uploaded at a time. Show cancel button until all files are uploaded.
                        var fileCountIndex = 0;
                        var $fileInput = $(element).find( "input[type='file']" ).first();
                        var maxFileNumber = parseInt($fileInput.attr("data-max-file-number"), 10);
                       $scope.maxFileCount = maxFileNumber;
                    var placeholderHTML = $compile('<tr><td class="oui-upld-placeholder" translate>{{ model.tablePlaceholderValue }}</td></tr>')($scope);
                        var serverErrorHTML = $compile('<tr><td class="oui-upld-placeholder ux-upld-error" translate>Unable to connect to server.</td></tr>')($scope);
                        var headerHTML = $compile('<thead><tr role="row"><th translate>Filename</th><th translate>Status</th><th translate class="size-col">Size</th><th translate ng-if="!model.hideRemove">Actions</th></tr></thead>')($scope);
                        var rowHTML =  '<td id="" role="rowheader">ImageName.png</td><td><span class="oui-upld-progress-meter" id="oui-upld-index-"><span class="oui-upld-progress-not-started"></span></span></td><td class="size-row"></td>';
                        var errorRowHTML = '<td id="" role="rowheader">ImageName.png</td><td><uitk:icon-font icon="cux-icon-alert_hollow" hidden-text="Alert"></uitk:icon-font><span class="oui-upld-error"></span></td><td>---</td>';

                        //Show/Hide remove link based on hideRemove flag
                        if(!$scope.model.hideRemove) {
                            rowHTML += '<td><a href="#" class="removefile" aria-describedby=""><uitk:icon-font icon="cux-icon-remove"></uitk:icon-font>Remove</a></td>';
                            errorRowHTML += '<td><a href="#" class="removefile" aria-describedby=""><uitk:icon-font icon="cux-icon-remove"></uitk:icon-font>Remove</a></td>';
                        }

                        var fileUploadErrorMessage = "files can be uploaded at one time";
                        if(Number($scope.model.maxFileNumber) === 1){
                            fileUploadErrorMessage = "file can be uploaded at one time";
                        }
                        var maxNoOfFileErrorHTML =  $compile('<td colspan="4" class="oui-upld-placeholder oui-upld-error ux-upld-custom-error ">Only '+digits_to_words[parseInt($scope.model.maxFileNumber, 10)]+'<span translate>'+fileUploadErrorMessage+'</span></td>')($scope);

                        var $description = $(element).find( ".oui-upld-restrictions" );
                        var maxFileSizeSetting = $fileInput.attr("data-max-file-size");
                        var fileTypeSetting = $fileInput.attr("data-accept-file-types");

                        var descriptionText = $compile("<span><span translate>Maximum file size:</span>" + " " + ($fileInput.attr("data-max-file-size") ? ($fileInput.attr("data-max-file-size")+"MB") : "Any") + "<span translate>. Accepted file types:</span>" + " " + ($fileInput.attr("data-accept-file-types") ? $fileInput.attr("data-accept-file-types").replace(/\|/g,", ") : "All") + "</span>")($scope);
                        $description.html( descriptionText );
                        $fileInput.attr("data-max-file-size", ( maxFileSizeSetting*1048576 ));

                        if (fileTypeSetting !== undefined) {
                            var acceptedFilesRegExp = "(\\.|\\/)(" + $fileInput.attr("data-accept-file-types") + ")$";
                            $fileInput.attr("data-accept-file-types", RegExp(acceptedFilesRegExp, "i"));
                        }

                        var selectFilesButton = '#'+$scope.model.id+"-btn";
                        var fileUploadId = '#'+$scope.model.id;
                        var cancelBtnId = '#'+$scope.model.id+"_CancelBtn";
                        var fileTableId = '#'+$scope.model.id+"_Table";
                        var uploadStatus = '#'+$scope.model.id+"-status";
                        var logStatus = '#'+$scope.model.id+"-log";
                        var isMaxFileUpldDisplayed = false;
                        var validFileChars = new RegExp($scope.model.validFileNameRegEx);
                        $scope.$watch('model.uploadUrl', function (newValue,oldValue) {
                            if(newValue!==oldValue){
                                angular.element(element).find(fileUploadId).fileupload('option',{url:newValue});
                            }
                        }, true);
                        angular.element(element).find(fileUploadId).fileupload({
                            dataType: 'text',
                            autoUpload: false,
                            beforeSend : $scope.model.beforeSend,
                            sequentialUploads : $scope.model.sequentialUploads,
                            limitConcurrentUploads: maxFileNumber,
                            done: function (e, data) {
                                data.result = $.parseJSON(_.unescape(data.result)); //IE9 fix. Remove this when migrated to later version browser.
                                var $fileTable = $(e.target).parent().siblings("div.oui-upld-container").first().find("table").first();
                                var rowFileIndexId = "#oui-upld-index-" + data.fileCount;
                                $scope.progressFileCount!=0?$scope.progressFileCount--:$scope.progressFileCount=0;
                                $.each(data.result.files, function (index, file) {
                                    // Set status column to Uploaded
                                    var compiledIcon = $compile("<uitk:icon-font icon='cux-icon-checkmark_hollow' hidden-text='Successful' icon-text='Uploaded'></uitk:icon-font>")($scope);
                                    $fileTable.find(rowFileIndexId).find("td").eq(1).html(compiledIcon);

                                    function formatFileSize (bytes) {
                                        if (typeof bytes !== 'number') {
                                            return '---';
                                        }
                                        if (bytes >= 1073741824) {
                                            return (bytes / 1073741824).toFixed(1) + 'GB';
                                        }
                                        if (bytes >= 1048576) {
                                            return (bytes / 1048576).toFixed(1) + 'MB';
                                        }
                                        return (bytes / 1024).toFixed(0) + 'KB';
                                    }

                                    if(file.fileName === $fileTable.find(rowFileIndexId).find("td").eq(0).text()) {
                                        if (!file.error){
                                            $fileTable.find(rowFileIndexId).find("td").eq(2).html( formatFileSize(file.fileSize) );
                                            if(data.result.files.length === index+1) {
                                                sortTable($(fileTableId));
                                            }
                                            $(logStatus).append("<p> file "+file.fileName+" uploaded successfully. </p>");
                                        } else {
                                            $(logStatus).append("<p> Error occured while uploading file  "+file.name+' due to  '+file.error+"</p>");
                                            $compile($fileTable.find(rowFileIndexId).find("td").eq(1).addClass("oui-upld-error").html( "<span><uitk:icon-font icon='cux-icon-alert_hollow'></uitk:icon-font></span>"+file.error ))($scope);
                                            $fileTable.find(rowFileIndexId).find("td").eq(2).html("---");
                                            $(rowFileIndexId).attr("id", "");
                                        }

                                        data.files[0].newFileName = file.newFileName;
                                        data.files[0].deleteUrl = file.deleteUrl;
                                    }
                                });

                                $scope.uploadCount = 0;

                                data.result.files.forEach(function(file){
                                    if(!file.error){
                                        $scope.uploadCount++;
                                    }
                                });
                                var errorCount = $(fileTableId).find('tr').length - $scope.uploadCount - 1;
                                $(uploadStatus).html($scope.uploadCount+' of '+($scope.uploadCount + errorCount)+' files uploaded successfully. '+errorCount+' error');
                            },

                            progress: function (e, data) {
                                var progress = parseInt(data.loaded / data.total * 100, 10);
                                var prgbId = "#oui-upld-index-" + (data.fileCount);
                                var prgbWidthPct = progress + "%";

                                var progressBar = $(prgbId).find("span.oui-upld-progress-meter>span");
                                progressBar.removeClass("oui-upld-progress-not-started");
                                progressBar.width(prgbWidthPct);
                                progressBar.addClass("oui-upld-progress");
                                progressBar.find('span').html('<span class="oui-a11y-hidden">'+prgbWidthPct+' uploaded</span>');
                            }

                        }).on('fileuploadadd', function (e, data) {
                            $scope.progressFileCount++;
                            data.fileIndex = fileIndexer;
                            fileIndexer++;
                            //$scope.show = true; ///// show true;
                            data.fileCount = fileCountIndex;
                            fileCountIndex++;
                            $scope.totalFileCount++;
                            $scope.setFileUploadButtonFocus();
                        }).on('fileuploaddelete', function (e, data) {
                            fileIndexer--;
                            data.fileIndex = fileIndexer;
                            $timeout(function(){$(selectFilesButton).focus()},1000);
                        }).on('fileuploadprocessalways', function (e, data) {

                            var file = data.files[0];

                            if(!validFileChars.test(file.name)) {
                                file.error = "Invalid File Name";
                                $scope.progressFileCount!=0? $scope.progressFileCount--:$scope.progressFileCount=0;
                            }

                            var $fileTable = $(e.target).parent().siblings("div.oui-upld-container").first().find("table").first();
                            // Add a row to the table.
                            // If it's the placeholder text then build the header row first.
                            if ( $fileTable.hasClass("oui-upld-placeholder") ) {
                                $fileTable.html( headerHTML );
                                // Then remove the placeholder class
                                $fileTable.removeClass("oui-upld-placeholder");
                                $fileTable.addClass("oui-upld-files");
                                // Then add the tbody.
                                $fileTable.append( $("<tbody></tbody>") );
                            }
                            var invalidFileCount =$(fileTableId+" .oui-upld-error").length- $(fileTableId+" .oui-upld-placeholder").length;
                            var maxNumberFileUploaded = ($scope.uploadCount + data.originalFiles.length > maxFileNumber)? true : false;
                            if($("#FileUploadId_Table .ux-upld-custom-error").length>0){
                                $(".ux-upld-custom-error").remove();
                                isMaxFileUpldDisplayed=false;
                            }

                            var rowFileIndexId = "oui-upld-index-" + data.fileCount;
                            var $tbody = $fileTable.find("tbody");
                            var $thisTR;
                            var progressBarId = "prgb-" + data.fileCount;

                            if (!file.error && !maxNumberFileUploaded) {
                                $(logStatus).append("<p> file "+file.name+" upload started. </p>");
                               // $scope.show === true;
                                fileUploadCounter++;
                                var jqXHR = data.submit()
                                    .success(function (result) {
                                        result = $.parseJSON(_.unescape(result)); //IE9 fix. Remove this when migrated to later version browser.
                                        var filesLen = result.files.length;
                                        file.error = result.files[filesLen-1].error;
                                        if(file.error) {
                                            $(fileUploadId).trigger("fileuploaddelete",data);
                                        }
                                        fileUploadCounter--;
                                        if(fileUploadCounter === 0){
                                            if(typeof $scope.model.onFileUploadSuccess === "function"){
                                                $scope.model.onFileUploadSuccess.call(this,result)
                                            }
                                            if(typeof $scope.model.onFileUploadError === "function"){
                                                $scope.model.onFileUploadError.call(this,result)
                                            }
                                        }
                                    })
                                    .error(function (jqXHR, textStatus, errorThrown) {
                                        if (errorThrown === 'abort') {
                                            file.error = '<span>Upload Cancelled</span>';
                                            if($scope.uploadCount < parseInt($scope.model.maxFileNumber, 10)){
                                                $(".ux-upld-custom-error").parent().remove();
                                                maxNumberFileUploaded = false;
                                            }
                                            $compile($fileTable.find("#"+rowFileIndexId).find("td").eq(1).addClass("oui-upld-error").html( "<span><uitk:icon-font icon='cux-icon-alert_hollow'></uitk:icon-font></span>"+file.error ))($scope);
                                            $fileTable.find("#"+rowFileIndexId).find("td").eq(2).html("---");
                                            $("#"+rowFileIndexId).attr("id", "");
                                        } else {
                                            $tbody.remove();
                                            $fileTable.addClass("oui-upld-placeholder").html( serverErrorHTML );
                                        }
                                        fileUploadCounter--;
                                        $scope.progressFileCount!=0?$scope.progressFileCount--:$scope.progressFileCount=0;
                                        if(fileUploadCounter === 0) {
                                            if(typeof $scope.model.onResponseError === "function"){
                                                $scope.model.onResponseError.call(this,jqXHR)
                                            }
                                        }
                                    })
                                    .complete(function () {
                                        if(fileUploadCounter === 0) {
                                            $(cancelBtnId).hide();
                                            $(cancelBtnId).css("visibility", "hidden")
                                           // scope.show == false;
                                            $(cancelBtnId).off('click');
                                        }
                                    });
                                $(cancelBtnId).show();
                                $(cancelBtnId).css("visibility", "visible");
                                $(cancelBtnId).click(function () {
                                    if (jqXHR !== undefined && jqXHR !== null && jqXHR.readyState != 4) {
                                        jqXHR.abort();
                                        if($scope.model.onCancelUpload){
                                            $scope.model.onCancelUpload(file, data, jqXHR);
                                        }
                                        else{
                                            $(logStatus).append("<p> Files That are in progress of uploading have been canceled.</p>");
                                            jqXHR = null;
                                        }
                                    }
                                    $scope.progressFileCount = 0;
                                    return false;
                                });
                            }

                            if (maxNumberFileUploaded) {
                                $scope.totalFileCount --;
                                fileIndexer--;
                                //fileUploadCounter--;
                                data.fileIndex = fileIndexer;
                                if(!isMaxFileUpldDisplayed) {
                                    $scope.progressFileCount = 0;
                                    $thisTR = $("<tr></tr>").html( maxNoOfFileErrorHTML );
                                    isMaxFileUpldDisplayed = true;
                                    $(logStatus).append("<p>"+maxNoOfFileErrorHTML+"</p>");
                                } else {
                                    return false;
                                }
                            } else if (file.error) {
                                $scope.progressFileCount!=0?$scope.progressFileCount--:$scope.progressFileCount=0;
                                $thisTR = $compile($("<tr role='row'></tr>").html( errorRowHTML ))($scope);
                                $thisTR.find(".oui-upld-error").html( file.error );
                                $thisTR.find("td").first().html( file.name );
                                $(fileUploadId).trigger("fileuploaddelete",data);
                                $timeout(function(){$(logStatus).append("<p> Error occured while uploading file  "+file.name+' due to  '+file.error+"</p>");},1000);
                                //For accessibility
                                $thisTR.find("td").first().attr('id',rowFileIndexId+"-filename");
                                $thisTR.find("a").attr('aria-describedby',rowFileIndexId+"-filename");

                                //For accessibility
                                var errorCount = $(fileTableId).find('tr').length - $scope.uploadCount;
                                $(uploadStatus).html($scope.uploadCount+' of '+($scope.uploadCount + errorCount)+' files uploaded successfully. '+errorCount+' error');
                            } else {
                                $thisTR = $compile($("<tr role='row'></tr>").html( rowHTML ))($scope);
                                $thisTR.find("td").first().html( file.name );
                                $thisTR.find(".ux-prgb").attr("id", progressBarId);
                                $thisTR.attr("id", rowFileIndexId);

                                //For accessibility
                                $thisTR.find("td").first().attr('id',rowFileIndexId+"-filename");
                                $thisTR.find("a").attr('aria-describedby',rowFileIndexId+"-filename");
                            }

                            $thisTR.find(".removefile").click( function(e) {
                                e.preventDefault();
                                if($scope.model.onRemoveFile){
                                    $scope.model.onRemoveFile(file, data, e);
                                }
                                else {
                                    if (file.error) {
                                        $scope.totalFileCount--;
                                        $scope.$apply();
                                        if ($(e.target).parents("tr").siblings("tr").length >= 1) {
                                            $(e.target).parents("tr").first().remove();
                                        } else {
                                            $(e.target).closest("table").removeClass("oui-upld-files");
                                            $(e.target).closest("table").addClass("oui-upld-placeholder").html(placeholderHTML);
                                        }
                                        fileIndexer--;
                                        data.fileIndex = fileIndexer;
                                        //For accessibility
                                        var errorCount = $(fileTableId).find('tr').length - $scope.uploadCount - 1;
                                        $(uploadStatus).html($scope.uploadCount + ' of ' + ($scope.uploadCount + errorCount) + ' files uploaded successfully. ' + errorCount + ' error');
                                        $(logStatus).append("<p> file " + file.name + '  removed failed. ' + "</p>");

                                    } else {
                                        $(".ux-upld-custom-error").parent().remove();
                                        isMaxFileUpldDisplayed = false;
                                        if (jqXHR !== undefined && jqXHR !== null) {
                                            jqXHR.abort();
                                            jqXHR = null;
                                        }

                                        //Consumer can set deleteUrl through which uploaded file will be deleted.
                                        var deleteUrl = file.deleteUrl;

                                        //If consumer like to pass only file ID or filename then append with delete URL passed in model.
                                        if ($scope.model.deleteUrl) {
                                            deleteUrl = $scope.model.deleteUrl + file.deleteUrl;
                                        }

                                        deleteFile(data, deleteUrl, $fileTable, e);
                                    }
                                }
                            });

                            function deleteFile(data, deleteUrl, fileTable, e) {
                                $.ajax({
                                    url :deleteUrl,
                                    method:'DELETE',
                                    dataType:'json',
                                    contentType: 'application/json; charset=utf-8',
                                    beforeSend: $scope.model.beforeSend,
                                    success : function(result){
                                        if(typeof $scope.model.onRemoveSuccess === "function") {
                                            $scope.model.onRemoveSuccess.call(this,result);
                                        }

                                        $scope.totalFileCount--;
                                        if(result.files){
                                            $thisTR = $("<tr></tr>").html("<td colspan='4' class= 'ux-upld-custom-error'>"+result.files[0].error+"</td>");
                                            if (data.originalFiles.length>1)
                                                fileTable.find( "tbody" ).append( $thisTR );
                                            else
                                                fileTable.find( "tbody" ).prepend( $thisTR );
                                        } else {
                                            if(e) {
                                                if ( $(e.target).parents("tr").siblings("tr").length >= 1 ) {
                                                    $(e.target).parents("tr").first().remove();
                                                } else {
                                                    $(e.target).closest("table").removeClass("oui-upld-files");
                                                    $(e.target).closest("table").addClass("oui-upld-placeholder").html(placeholderHTML);
                                                }
                                            }
                                            $(fileUploadId).trigger("fileuploaddelete",data);
                                        }

                                        //For accessibility
                                        $scope.uploadCount--;
                                        var errorCount = $(fileTableId).find('tr').length - $scope.uploadCount - 1;
                                        $(uploadStatus).html($scope.uploadCount+' of '+($scope.uploadCount + errorCount)+' files uploaded successfully. '+errorCount+' error');
                                        $(logStatus).append("<p> file  removed successfully."+"</p>");
                                    },
                                    error : function(result) {
                                        if(typeof $scope.model.onRemoveFailure === "function") {
                                            $scope.model.onRemoveFailure.call(this,result);
                                        }

                                    }, complete : function (){

                                    }
                                });
                            }

                            if (data.originalFiles.length>1)
                                $fileTable.find( "tbody" ).append( $thisTR );
                            else
                                $fileTable.find( "tbody" ).prepend( $thisTR );
                        })

                });
            }, 100);
        }

        return {
            restrict : 'AE',
            replace : true,
            scope : {
                model : '='
            },
            templateUrl : function (element, attrs) {
                return attrs.templateUrl || 'template/uitk-file-upload.html';
            },
            link : link
        };
    }]);

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.component.uitkFooter', ['uitk.component.uitkNavigable'])
	.directive('uitkFooter', ["$filter", "$compile", function ($filter, $compile) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			link: function ($scope, element, attrs) {//Todo: remove jQuery selector and do angular way. Make current Year in isolated scope and default to fullYear if none is passed.
				$scope.currentYear = new Date().getFullYear();
				if (window.innerWidth < 640) {
					$scope.notMobile = false;
					$scope.isMobile = true;
				} else {
					$scope.isMobile = false;
					$scope.notMobile = true;
				}

				angular.element('footer > div > ul').after($compile('<p class="mobile" ng-if="isMobile === true && notMobile === false"> &copy; ' + $scope.currentYear + ' Optum, <span translate>Inc.</span> <span translate>All rights reserved.</span></p>')($scope))
				angular.element('footer > div').prepend($compile('<p class="not-mobile" ng-if="isMobile === false && notMobile === true"> &copy; ' + $scope.currentYear + ' Optum, <span translate>Inc.</span> <span translate>All rights reserved.</span></p>')($scope));

				angular.element(window).bind('resize', getResizer($scope, element, window));
				function getResizer(scope, element, window) {
					return function () {
						if (window.innerWidth <= 640) {
							$scope.notMobile = false;
							$scope.isMobile = true;
						} else {
							$scope.isMobile = false;
							$scope.notMobile = true;
						}
						$scope.$digest();
					};
				}
				//For elements
			},
			template: '<footer><div ng-transclude id="#hello"></div> </footer>'
		};
	}])
	
	.directive('uitkFooterLinks', function () {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			template: '<ul class="tk-foot-links" ng-transclude> </ul>'
		};
	})

	.directive('uitkFooterLink', function () {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				url: '@',
				tkLabel: '@',
				tkDisabled: '=',
				tkTarget: '@',
				linkInfoForReader: '@' //added to provide additional information to a screen reader
			},
			link: function (scope, element, attrs) {
				var tkTarget = scope.tkTarget;
				scope.disabledA11y = true;
				if (tkTarget) {
					scope.tkTargetWindow = "_" + tkTarget;
					if (tkTarget === "blank") {
						scope.disabledA11y = false;
					}
				}
			},
			template: [
				'<li>',
				'	<a ng-if="!tkDisabled" href="{{url}}" ng-attr-target="{{tkTargetWindow}}">{{tkLabel}} <span ng-if="!disabledA11y" class="oui-a11y-hidden">{{linkInfoForReader}}</span></a>',
				'   <span ng-if="tkDisabled" class="tk-foot-link-disabled">{{tkLabel}}</span>',
				'</li>',
			].join('')
		};
	})

	.directive('uitkFooterText', function () {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			template: '<p class="tk-foot-text" ng-transclude > </p>'
		};
	});

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.15.0
 */

(function () {
    /**
     * uitkFormLayout Component Definition
     * @param $filter
     * @param uitkExceptionService
     * @returns {{restrict: string, require: string, replace: boolean, templateUrl: templateUrl, link: link}}
     */
    var uitkFormLayoutDirective = function ($filter, uitkExceptionService) {
        return {
            restrict: "E",
            require: '^form',
            replace: true,
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || 'template/uitk-form-layout-template.html';
            }, 
            link: function (scope, element, attrs, formObject) {
                scope.formObject = formObject;

                scope.formErrorMessageModel = {
                    id: 'Error',
                    messageType: 'error',
                    content: '<span>Review the form and correct highlighted fields.</span>',
                    visible: false,
                    messageRole: 'alert'
                };

                scope.layout = scope.layout || 'vertical';
                scope.$on(attrs.id+'-layout-updated', function (event, args, formItems) {
                    if (args) {
                        scope.layout = args;
                    }
                });

                // checking if the client set oneColumnLayout variable in the controller
                if(typeof scope.oneColumnLayout !== "undefined") {
                    scope.oneColumnLayout = scope.oneColumnLayout;
                } else {
                    scope.oneColumnLayout = true;
                }

                scope.$on(attrs.id+'-column-layout-updated', function (event, args, formItems) {
                    if (args) {
                        scope.oneColumnLayout = args;
                    }
                });
            }
        };
    };
    /**
     * uitkField Component Definition
     * @param $compile
     * @param uitkFieldTemplateFactory
     * @param uitkEvents
     * @param $sce
     * @returns {{replace: boolean, scope: {formField: string, formMessages: string, formObject: string}, require: string, link: link}}
     */
    var field = function ($compile, uitkFieldTemplateFactory, uitkEvents, $sce) {
        return {
            replace: true,
            scope: {
                formField: "=",
                formMessages: "=",
                formObject: "="
            },
            require: '^ngModel',
            link: function (scope, ele, attrs, fieldObject) {
                var FormObject = scope.formObject;
                //setup ngModelController: typically added in the browsers, unit test not seeing it so we add it manually anyway
                FormObject[scope.formField.viewModel.name] = fieldObject;
                //set html safe
                if (scope.formField.viewModel.label) scope.formField.htmlTip = $sce.trustAsHtml(scope.formField.viewModel.label.tip);//bind safe html

                $compile(angular.element(uitkFieldTemplateFactory(scope.formField)).appendTo(ele))(scope);

                scope.formField.FormObject = FormObject;
                scope.formField.FormObject.formErrorMessageModel = scope.formMessages;

                CustomValidators(scope.formField.type, scope, ele);

                if (angular.isArray(scope.formField.viewModel.group)) {
                    scope.formField.viewModel.finalFormCheck = updateFieldState;
                }

                //methods to expose to end-consumers
                scope.formField.applyValidation = applyValidation;
                scope.formField.getFieldDom = getFieldDom;
                scope.formField.applyAriaAttr = applyAriaAttr;
                angular.element("input,textarea,button,select,autocomplete,checkbox,radio,dob,calendar", ele).on(((scope.formField.viewModel.validation && scope.formField.viewModel.validation.additionalEvent) ? scope.formField.viewModel.validation.additionalEvent : ' keyup blur'), function () {
                    if (scope.formField.viewModel.label && scope.formField.viewModel.label.required) {
                        applyValidation(FormObject[scope.formField.viewModel.name], scope.formField, this);
                    }

                    //emit for custom validation.
                    uitkEvents.setScope(scope).emit('formLayout', scope.formField.viewModel.id + '-applyValidation', scope.formField);
                    if (scope.formField.viewModel.label) scope.formField.htmlTip = $sce.trustAsHtml(scope.formField.viewModel.label.tip);//maintain safe html after update.
                });

                // hiding the error message popup if the user has made a change to the form
                angular.element("input,textarea,button,select,autocomplete,checkbox,radio,dob,calendar", ele).on('keyup', function () {
                    if(scope.formObject.$errorMessages && scope.formMessages.visible === true) {
                        scope.formMessages.visible = false;
                    }
                });
            },
            controller: function () {
                this.isFormField = function () { return true; };
            }
        };
    };

    /**
     * uitkFieldTemplateFactory
     * A helper service to create tags for form field components.
     *
     * @returns {Function}
     */
    var templateFactory = function () {
        return function (formField) {

            //build out required text
            var requiredText = "";
            if (hasValue(formField)) {
                //once we've added required to label apply on fields as well (Note that check feild validation may not be on all fields)
                formField.viewModel.tkRequired = true;//todo:fix this back, this is causing the textarea feild to be red on init
                requiredText = ' check-field-validation="formField.viewModel.tkRequired" tk-required="formField.viewModel.tkRequired" ';
            }

            // check for regex
            var patternText = "";
            if (hasValue(formField, 'regex')) {
                formField.viewModel.validation.pattern.regex = EscapeRegexForTpl(formField.viewModel.validation.pattern.regex);
                patternText = ' tk-pattern="\'{{formField.viewModel.validation.pattern.regex}}\'"';
            }

            var ariaAttrs = applyAriaAttr(formField.viewModel, formField.type);

            formField.viewModel.tkType = formField.viewModel.tkType || "text";//default tkType to text
            
            /**
             * The implementation of the following form element components has not be refacored for TD, as to put most element attributs isolated scope into a viewModel. 
             * When those compnents is refactored we will need to adjust the implementation here 
            */
            var template = '';

            switch (formField.type) {
                case 'input':
                    //todo: add full implementation so everything works....
                    template = '<uitk:input tk-error-class="formField.FormObject[formField.viewModel.name].$invalid" tk-supress-message="true" tk-type="{{formField.viewModel.tkType}}" ' + ariaAttrs + requiredText + ' ' + patternText + ' id="{{formField.viewModel.id}}" tabindex="-1" model="formField.viewModel.model" name="{{formField.viewModel.name}}" on-blur="formField.viewModel.onBlur(formField)"></uitk:input>';
                    break;
                case 'textarea':
                    template = '<uitk:textarea  ' + ariaAttrs + requiredText + ' tk-error-class="formField.FormObject[formField.viewModel.name].$invalid" id="{{formField.viewModel.id}}" model="formField.viewModel.model" name="{{formField.viewModel.name}}" rows="{{formField.viewModel.rowCount}}" max-char-count="{{formField.viewModel.maxCharCount}}" show-count="{{ formField.viewModel.showCount }}"></uitk:textarea>';
                    break;
                case 'autocomplete':
                    template = '<uitk:auto-complete type="fieldType"  ' + ariaAttrs + requiredText + ' tk-error-class="formField.hasError" tabindex="-1" id="{{formField.viewModel.id}}" model="formField.viewModel.model" name="{{formField.viewModel.name}}" disable-input="formField.viewModel.disabledInput" read-only="formField.viewModel.readOnly" items="formField.viewModel.items" min-length="{{formField.viewModel.minLength}}" on-select="formField.viewModel.onSelect()" on-blur="formField.viewModel.onBlur()" on-focus="formField.viewModel.onFocus()" on-refresh-items="formField.viewModel.onRefreshItems()" />';
                    break;
                case 'button':
                    var subTemplates = "";
                    if (angular.isArray(formField.viewModel.group)) {
                        angular.forEach(formField.viewModel.group, function (formField, index) {
                            subTemplates += '<uitk:button custom-class="oui-rfrm-group-buttons" type="button" ng-if="!formField.viewModel.group[' + index + '].viewModel.link" id="{{formField.viewModel.group[' + index + '].viewModel.id}}" model="formField.viewModel.group[' + index + '].viewModel.model" name="{{formField.viewModel.name}}" value="{{formField.viewModel.group[' + index + '].viewModel.label.text}}" disabled-value="{{formField.viewModel.group[' + index + '].viewModel.disabledValue}}" enable-default="formField.viewModel.group[' + index + '].viewModel.enableDefault" uitk-btn-disabled="formField.viewModel.group[' + index + '].viewModel.disabled" ng-click="formField.viewModel.group[' + index + '].viewModel.onClick(formField)"></uitk:button>';
                            subTemplates += '<a ng-if="formField.viewModel.group[' + index + '].viewModel.link" href="javascript:void(0)" ng-click="formField.viewModel.group[' + index + '].viewModel.onClick(formField)">{{formField.viewModel.group[' + index + '].viewModel.label.text}}</a>';
                        });
                    }
                    template = subTemplates;
                    break;
                case 'calendar':
                    template = '<uitk:calendar id="{{formField.viewModel.id}}" ng-model="formField.viewModel.model" view-model="formField.viewModel.viewModel" name="formField.viewModel.name" labelled-by="{{formField.viewModel.name}}_label" tabindex="-1"></uitk:calendar>';
                    break;
                case 'checkbox':
                    template = '<div class="oui-rfrm-field-container"><uitk:checkbox item-list="formField.viewModel.items" id="{{formField.viewModel.id}}" group-name="{{formField.viewModel.groupName}}" is-group="true" tk-model="formField.viewModel.model" ng-model="formField.viewModel.model"' + requiredText + 'name="{{formField.viewModel.name}}"' + ariaAttrs + ' tabindex="-1" /></div>';
                    break;
                case 'radio':
                    template = '<uitk:radio item-list="formField.viewModel.items" group-name="{{formField.viewModel.groupName}}" id="{{formField.viewModel.id}}"  ' + ariaAttrs + ' model-value="formField.viewModel.model" ng-model="formField.viewModel.model" name="{{formField.viewModel.name}}" tabindex="-1"></uitk:radio>';
                    break;
                case 'multiselect':
                    template = '<uitk-multiselect id="{{formField.viewModel.id}}" name="{{formField.viewModel.name}}" input-model="formField.viewModel.inputModel" output-model="formField.viewModel.outputModel" selection-mode="formField.viewModel.selectionMode" tick-property="formField.viewModel.tickProperty" button-label="{{formField.viewModel.buttonLabel}}" item-label="{{formField.viewModel.itemLabel}}" default-label="{{formField.viewModel.defaultLabel}}" tabindex="-1"> </uitk-multiselect>';
                    break;
                case 'select':
                    //tk-name is required to use in form because component is using transclude, during the time of compile, if name is defined here the form doesn't see it. Out of time to figure out a better solution modifications has been made to select component to support tk-name
                    template = '<uitk:select  ' + ariaAttrs + ' tabindex="-1" tk-name="{{formField.viewModel.name}}" labelled-by="{{formField.viewModel.name}}_label" selected-value ="formField.viewModel.model" item-list="formField.viewModel.items" id="{{formField.viewModel.id}}"  option-value="Select"  ' + requiredText + ' ></uitk:select>';
                    break;
                case 'dob':
                    template = '<uitk:date-of-birth id="{{formField.viewModel.id}}" tabindex="-1" ng-model="formField.viewModel.model" view-model="formField.viewModel.label" name="formField.viewModel.name"></uitk:date-of-birth>';
                    break;
                case 'custom':
                    // check for template
                    // if not exist, break
                    if ( _.isUndefined(formField.viewModel.template) ) {
                        break;
                    }

                    template = formField.viewModel.template.replace('\[model\]', 'ng-model = "formField.viewModel.model"');
                    break;
            }
            return template;
        };
    };

    /**
     * formFieldModel
     * Helper service to create a form field configuration object.
     * 
     * @returns {formField}
     */
    var formFieldModel = function () {
        var formField = function (name, type, viewModel, validation) {//as a service as helper
            this.name = name || "";
            this.type = type || "input";
            this.viewModel = viewModel || {};
        };
        return formField;
    };

    uitkFormLayoutDirective.$inject = ['$filter', 'uitkExceptionService'];
    field.$inject = ['$compile', 'uitkFieldTemplateFactory', 'uitkEvents', '$sce'];

    angular.module("uitk.component.uitkFormLayout", ['uitk.uitkUtility'])
        .directive("uitkFormLayout", uitkFormLayoutDirective)
        .directive("uitkField", field)
        .factory("uitkFieldTemplateFactory", templateFactory)
        .service("uitkFormFieldHelper", formFieldModel);
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
(function () {
    var uitkGlobalNavigation = function ($compile, $timeout, $sce, $window, $rootScope, uitkExceptionService, uitkMenuModel) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                model: '=',
                focusItem: '='
            },
            controller: ["$scope", function ($scope) {
                uitkMenuModel.setLevel($scope);
                if($scope.model.level===1)
                    uitkMenuModel.initializeParents($scope.model, undefined);
                $scope.isHorizontal = true;

                uitkMenuModel.initializeController($scope);
                uitkMenuModel.initializeVisibility($scope);

                $scope.expandMenuOrRedirectToLink = uitkMenuModel.getClickHandler($scope);
                $scope.hideParentMenu = uitkMenuModel.hideParentMenu.bind($scope);
                $scope.isExpanded = uitkMenuModel.isExpanded;
                $scope.isSelected = uitkMenuModel.isSelected.bind($scope);
                $scope.getRootMenuScopeFromChildScope = uitkMenuModel.getRootMenuScopeFromChildScope;

                if ($scope.model.level > 1 && $scope.focusItem) {
                    $scope.focusItem.focusMe = false;
                }

                if($scope.model.level === 1 && !angular.isDefined($scope.model.useStripOnMobile)) {
                    $scope.model.useStripOnMobile = true;
                }

                //configure the top level menu itmes on screens below 640px, default 1.
                if($scope.model.menuItemsOnMobile === undefined){
                    $scope.model.menuItemsOnMobile = 1;
                }

                uitkMenuModel.ValidateModelId($scope.model, uitkExceptionService);
                uitkMenuModel.CheckForBothUrlAndDropdown($scope.model, uitkExceptionService);

                $scope.getTrustedTextTemplate = function (item) {
                    return $sce.trustAsHtml(item.textTemplate);
                };
            }],
            link: function (scope, iElement) {
                uitkMenuModel.initializeSetFocus(scope, iElement, true);
                scope.checkMenuPosition = uitkMenuModel.checkMenuPosition(scope, iElement);
                scope.rootMenu = uitkMenuModel.getRootMenuScopeFromChildScope(scope);

                // Reconfigure the top level menu on resize of the window
                angular.element($window).bind('resize', uitkMenuModel.getResizer(scope, iElement, scope.model.menuItemsOnMobile));
                $timeout(function() {
                    angular.element(document).ready(function() { uitkMenuModel.getResizer(scope, iElement, scope.model.menuItemsOnMobile)(); });
                });
            },
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || 'template/uitk-global-navigation.html';
            }
        };
    };

    var applyParentFocus = function () {
        return {
            link: function (scope, element) {
                if (scope.item) {
                    scope.$watch('item.focusMe', function (a, b) {
                        if (scope.item.focusMe) {
                            element.focus();
                            scope.item.focusMe = false;
                        }
                    })
                }
            }
        }
    };

    var compileLink = function($compile) {
        return function ($scope, $element) {
            $compile($scope.item.textTemplate)($scope, function (clone) {
                if (!clone.selector) {
                    $element.prepend(clone);
                } else {
                    $element.prepend(clone.selector);
                }
            });
        };
    }

    uitkGlobalNavigation.$inject = ['$compile', '$timeout', '$sce', '$window', '$rootScope', 'uitkExceptionService', 'uitkMenuModel'];
    compileLink.$inject = ['$compile'];

    angular.module('uitk.component.uitkGlobalNavigation', ['uitk.component.uitkSlideAnimation', 'uitk.component.uitkNavigable', 'uitk.uitkUtility', 'uitk.Models'])
        .directive('uitkGlobalNavigation', uitkGlobalNavigation)
        .directive('applyParentFocus', applyParentFocus)
        .directive('uitkGlobalNavCompileLink', compileLink);
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */

angular.module('uitk.utility.grids', []).directive('uitkGrids', ["$window", function($window) {
    return {
        link: function(scope, element) {
            var $panelContentColumns = $('.tk-grid', element).find('.tk-module');
            var equalheight = function(container) {

                var currentTallest = 0,
                    currentRowStart = 0,
                    rowDivs = [],
                    $el;

                $(container).each(function() {
                    $el = $(this);
                    $($el).height('auto');
                    var topPostion = $el.position().top;

                    if (currentRowStart !== topPostion) {
                        for (var currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                            rowDivs[currentDiv].height(currentTallest);
                        }

                        rowDivs.length = 0; // empty the array
                        currentRowStart = topPostion;
                        currentTallest = $el.height();
                        rowDivs.push($el);
                    } else {
                        rowDivs.push($el);
                        currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
                    }

                    for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                        rowDivs[currentDiv].height(currentTallest);
                    }
                });
            }

            equalheight($panelContentColumns);

            angular.element($window).bind('resize', function() {
                equalheight($panelContentColumns);
            });
        }
    }
}]);

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.15.0
 */
angular.module('uitk.component.header', ['uitk.component.uitkNavigable','uitk.uitkUtility'])
.directive('uitkHeader', ["$location", function($location) {
	function controller($scope){
		$scope.redirectUrl = function(){
			if($scope.url){
				// if($scope.url[0] === '#'){
				// 	$location.path($scope.url.substring(1));
				// }
				// else{
				// 	window.location = $scope.url;
				// }
				//todo: refactored the above code to make it testable
				$scope.url[0] === '#' ?
					$location.path($scope.url.substring(1)) :
					window.location = $scope.url;
			}
		};
	}
	controller.$inject = ["$scope"];

    return {
      restrict: 'E',
      transclude: true,
      scope: {
    	  logo: "@",
    	  url: "@",
    	  //alternate text for image
    	  altText: "@"

      },
      template: '<header class="tk-head"><div class="tk-head-logo"><a ng-click="redirectUrl()" ng-href="{{url}}"><img ng-src="{{logo}}" alt="{{altText | uitkTranslate}}" /></a></div><div ng-transclude></div></header>',
      replace: true,
     controller: controller

    };
}]);

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
(function () {
    var uitkHeaderDrawer = function ($sce, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                model: '='
            },
            link: function ($scope, $element) {
                if ($scope.model && $scope.model.sections) {
                    if($scope.model.sections.featured) {
                        if($scope.model.sections.featured.content) {
                            //sanatizing HTML content so it's safe to display
                            $scope.featuredContent = $scope.model.sections.featured.content;
                        }
                    }

                    if($scope.model.sections.additional) {
                        //sort the additional section array by the layoutOrder property assigned to each object
                        var sorted = $scope.model.sections.additional.sort(dynamicSort("layoutOrder"));

                        // find out the length of half of the array if it was split in two
                        var half_length = Math.ceil($scope.model.sections.additional.length / 2);

                        //split the additional section array in half so it can be displayed evenly and assign half to the featured section
                        $scope.primaryDetail = sorted.splice(0,half_length);

                        //take the remainder of the array and assign it to the tabIcons section
                        $scope.secondaryDetail = sorted;
                    }

                    if($scope.model.sections.tabIcons) {
                        for(var x = 0; x < $scope.model.sections.tabIcons.length; x++) {
                            if($scope.model.sections.tabIcons[x].selectedTab) {
                                // setting up the initially selected tab based on the viewModel selectedTab property
                                $scope.selectedTab = $scope.model.sections.tabIcons[x].id;
                            }
                        }
                    }
                }

                // sets and displays the current tab when selected by the user
                $scope.setTab = function(newTab){
                    $scope.defaultTabIndex = null;
                    $scope.selectedTab = newTab;
                };

                // sets the selected tab based on the user selection
                $scope.isSet = function(tabNum){
                    return $scope.selectedTab === tabNum;
                };

                $scope.closeDrawer = function(id) {
                    $scope.defaultTabIndex = id;
                    angular.element('#tab_' + id).focus();
                    $scope.uitkSlideUp = 'uitkAnimateDrawerClose';
                    $scope.drawerVisible = false;
                    $timeout(function() {
                        $scope.selectedTab = null;
                    },900);
                };

                $scope.openDrawer = function(id) {
                    $timeout(function() {
                        angular.element('#tab_' + id + '_tabpanel').focus();
                    },100);

                    $scope.drawerVisible = true;
                };

                $scope.toggleContentWaringMessage = function() {

                    if ( $scope.model.message.messageType === 'warning' ) {
                        $scope.model.message.expanded = !$scope.model.message.expanded;
                    }
                };

                $scope.tabKeyupHandler = function(index, event) {
                    var pressedKey = event.keyCode;

                    switch(pressedKey) {
                        // for right or down arrow keys, select next tab
                        case 39:
                        case 40:
                            var nextTab;
                            var count = 0;

                            index = (index + 1) % $scope.model.sections.tabIcons.length;
                            nextTab = $scope.model.sections.tabIcons[index];
                            count++;

                            angular.element('#tab_' + $scope.model.sections.tabIcons[index].id).focus();
                            break;
                        // for left or up arrow keys, select previous tab
                        case 37:
                        case 38:
                            var previousTab;
                            var count = 0;

                            index = (index - 1 >= 0) ? index - 1 : $scope.model.sections.tabIcons.length-1;
                            previousTab = $scope.model.sections.tabIcons[index];
                            count++;

                            angular.element('#tab_' + $scope.model.sections.tabIcons[index].id).focus();
                            break;
                    }
                };

                $scope.drawerKeyUpHandler = function(index, event) {
                    var pressedKey = event.keyCode;

                    switch(pressedKey) {
                        // for escape key, close drawer and set focus back to the selected tab
                        case 27:
                            $scope.closeDrawer();
                            angular.element('#tab_' + $scope.model.sections.tabIcons[index].id).focus();
                            break;
                        case 13:

                    }
                };


                // function to sort an array of objects based on an object's property that is passed to it
                function dynamicSort(property) {
                    var sortOrder = 1;
                    if(property[0] === "-") {
                        sortOrder = -1;
                        property = property.substr(1);
                    }
                    return function (a,b) {
                        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                        return result * sortOrder;
                    }
                }
            },
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || 'template/uitk-header-drawer.html';
            }
        };
    };
    uitkHeaderDrawer.$inject = ["$sce", "$timeout"];

    angular.module('uitk.component.uitkHeaderDrawer', ['ngSanitize', 'uitk.component.uitkSlideAnimation'])
    .directive('uitkHeaderDrawer', uitkHeaderDrawer);
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.component.uitkHelp', ['uitk.uitkUtility'])
.factory('HelpObj', function() {
    var helpObj = { url: '#' };
    return {
        setHelpObj: function(help) {
            helpObj = help;
        },
        getHelpObj: function() {
            return helpObj;
        }
    };
})
.directive('uitkHelp', function(){
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: true,
        controller: ["$scope", "HelpObj", function($scope, HelpObj) {
            $scope.helpLinkInvoked = function() {
                var helpObj = HelpObj.getHelpObj();
                var helpWindow = window.open(helpObj.url, 'webHelp', 'height=600,width=600,left=400px,top=200px,resizable=yes,toolbar=yes,location=yes');
                helpWindow.focus();
            };
        }],
        template: [
            '<a href="javascript:void(0);" ng-click="helpLinkInvoked()" tabindex="0">',
            '<uitk:icon-font icon="cux-icon-help" hidden-text="Opens in a new window"></uitk:icon-font>',
            '<span>{{"Help" | translate}}</span>',
            '</a>'
        ].join('')
    };
});

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
/**
 * Created by jcalahi on 7/20/2016
 */
(function() {
    'use strict';
    
    var uitkHeroImage = function(uitkTools) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                viewModel: '='
            },
            link: function(scope, elem, attrs) {
                scope.componentId = uitkTools.ComponentId(attrs.id, scope.viewModel, elem, 'hero image');
                elem.css({
                    'background-image': 'url(' + scope.viewModel.imageSrc + ')'
                });
            },
            templateUrl: 'template/hero-image.html'
        };
    };

    uitkHeroImage.$inject = ['uitkTools'];

    angular.module('uitk.component.uitkHeroImage', ['uitk.uitkUtility'])
        .directive('uitkHeroImage', uitkHeroImage);
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
(function () {
    var uitkIconFont = function($sce) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                icon: '@',
                hiddenText: '@',
                iconText: '@',
                model: '='
            },
            link: function($scope, $element) {
                // use htmlTemplate if it exists, otherwise use iconText
                if ($scope.model && $scope.model.htmlTemplate && !$scope.iconText) {
                    $scope.trustedHtmlTemplate = $sce.trustAsHtml($scope.model.htmlTemplate);
                } else if ($scope.iconText) {
                    $scope.trustedHtmlTemplate = $scope.iconText;
                }
            },
            templateUrl: 'template/uitk-icon-font.html'
        };
    };
    uitkIconFont.$inject = ["$sce"];

    var uitkCompileTemplate = function($compile) {
        return function($scope, $element) {
            $scope.$watch('trustedHtmlTemplate', function() {
                $compile($scope.model.htmlTemplate)($scope, function(clone) {
                    $element.empty();
                    $element.append(clone);
                });
            });
        };
    };
    uitkCompileTemplate.$inject = ["$compile"];

    angular.module('uitk.component.uitkIconFont', [])
        .directive('uitkIconFont', uitkIconFont)
        .directive('uitkCompileTemplate', uitkCompileTemplate);
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.component.uitkLabel', [])
.directive('uitkLabel', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: true,
        link: function($scope, $element, $attr, ctrl, transclude) {
            $scope['required'] = $attr['required'] == "true";
            transclude(function(content) {
                $element.find('div').replaceWith(content);
            });
        },
        template: '<label class="tk-labl"><div></div><uitk:icon-font ng-if="required" icon="cux-icon-asterisk" hidden-text=", required."></uitk:icon-font></label>'
    };
});

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.component.uitkLicense',['uitk.component.uitkDynamicTable','uitk.uitkUtility'])
.factory('uitkLicenseData', function() { return { licenses : [] }; })
.directive('uitkLicense', ["uitkLicenseData", "$http", function(uitkLicenseData, $http){

  function queryLicenseData(filterCondition, callback) {
    var recordsPerPage = filterCondition.recordsPerPage;
    var pageNumber = filterCondition.pageNumber;
    var filteredData = uitkLicenseData.licenses.slice();

    //sort
    if(filterCondition.sortBy && filterCondition.sortBy.length > 0)
      filterCondition.sortBy.forEach(function(sortByField, index) {
        var sortOrder = filterCondition.sortOrder[index];
        if(sortByField && sortOrder) {
          filteredData = _.sortBy(filteredData, sortByField);
          filteredData = sortOrder === -1 ? filteredData.reverse() : filteredData;
        }
      });

    var totalRecordsCount =  filteredData.length;

    //paginate
    if(pageNumber && recordsPerPage)
      filteredData = filteredData.splice( pageNumber > 1 ? ((pageNumber -1 ) * recordsPerPage) : 0, recordsPerPage);

    callback({
      totalRecordsCount : totalRecordsCount,
      records : filteredData
     });
  }
  														

  function controller($scope){

	  $scope.model = {
		pagination : {},
  		columns :  [
  			{ columnId:'package',	label:'Package', sortOrder:1, sortable:true, layoutOrder:1, cellTemplate:'<span ng-bind="::record.package"> </span>', style:"width:20%;" },
  			{ columnId:'Version', label:'Version', sortOrder:0, sortable:false, layoutOrder:2, cellTemplate:'<span ng-bind="::record.version"> </span>' , style:"width:10%;" },
  			{ columnId:'Copyright', label:'Copyright', sortOrder:0, sortable:false, layoutOrder:3, cellTemplate:'<span ng-bind="::record.copyright"> </span>' , style:"width:50%;" },
  			{ columnId:'License', label:'License', sortable:false, layoutOrder:4, cellTemplate:'<a href="{{::record.licenseUrl}}" title="Goes to External Site"  target="_blank">{{::record.license}}<span class="oui-a11y-hidden">Opens in a new window</span></a>' , style:"width:20%;" }
  		],
  		records : [],
  		totalRecordsCount : 0,
  		links : [
    		'<uitk:icon-font icon="cux-icon-print"></uitk:icon-font> <a href="" ng-click="model.print()">Print</a>'
    	],
  		onChange : function(filterCondition) {
  			var that = this;
	        queryLicenseData(filterCondition, function(result) {
				that.totalRecordsCount = result.totalRecordsCount;
				that.records = result.records;
	  		});
  		},
  		print : function() {		
  			setTimeout(function(){ window.print();});
  		}  
    };
  }
  controller.$inject = ["$scope"];

  function link($scope) {
    $http.get($scope.url).success(function(data){
      uitkLicenseData.licenses = data.licenses;
      $scope.model.pagination.recordsPerPage = 25;
      $scope.model.onLoad();
    });
  }

  return {
    restrict : 'E',
    replace : true,
    scope : {
      url : '@',
      contactNo : '@',
      contactEmail : '@'
    },
    link : link,
    controller : controller,
    template : ['<div>',
                '<h1>{{"Copyright & License Information" | uitkTranslate}}</h1>',
                '<p>{{"Need help finding correct source for a package" | uitkTranslate}}? {{"Contact the product support team at" | uitkTranslate}} {{contactNo}} or <a href="mailto:{{contactEmail}}"> {{contactEmail}} </a> </p>',
                '<uitk:dynamic-table model="model"></uitk:dynamic-table>',
                '</div>'
               ].join('')

  };
}]);

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
(function () {

    /**
     * Primary directive for the line chart component.
     */
    var uitkLineChartDirective = function ($window, uitkExceptionService, dialogService) {
        return {
            restrict: 'E',
            replace: 'true',
            scope: {
                viewModel: '='
            },
            link: function (scope, element, attrs) {

                var LABEL_PADDING_DESKTOP = 7;
                var LABEL_PADDING_TABLET = 11;
                var EXTRA_MARGIN_TABLET = 16;
                var TABLET_SCREEN_SIZE = 992;

                scope.isOpened = dialogService;

                //Throw exception if id is not defined
                if (!scope.viewModel.id) {
                    uitkExceptionService.throwException(
                        'InvalidIdException',
                        'Id is required attribute'
                    );
                }

                if (scope.viewModel.decimalPlaces === undefined) {
                    scope.viewModel.decimalPlaces = 2;
                }

                //Set defaults for the chart label and description if not provided
                scope.viewModel.heading = scope.viewModel.heading || scope.viewModel.id;
                scope.viewModel.description = scope.viewModel.description || 'This is a line chart component.';

                //Default width
                if (!scope.viewModel.width) {
                    scope.viewModel.width = 600;
                }

                //Default height
                if (!scope.viewModel.height) {
                    scope.viewModel.height = 400;
                }

                /**
                 * Show the simple data dialog for this chart
                 */
                scope.contentKeyupHandler = function () {
                    scope.showMe = true;
                };

                /**
                 * Hide the simple data dialog for this chart
                 */
                scope.callBackHideDialog = function () {
                    scope.showMe = false;
                    scope.isOpened.dialogOpened=false;
                    angular.element('#' + scope.viewModel.id + '_dialog_openModalBtn').focus();
                };

                scope.mouseover = function () {
                    var tooltipElement = angular.element(".nvtooltip.xy-tooltip.nv-pointer-events-none");
                    if (tooltipElement.length !== 0) {
                        tooltipElement.attr("aria-hidden", "true");
                        scope.setAriaHidden = true;
                    }
                };

                //Watch model data
                scope.$watch('data', function (data) {
                    nv.addGraph(function () {
                        var chart = nv.models.lineChart();

                        //Chart options
                        chart
                            .showLegend(scope.viewModel.showLegend === undefined ? true : scope.viewModel.showLegend)
                            .useInteractiveGuideline(scope.viewModel.useInteractiveGuideline === undefined ? true : scope.viewModel.useInteractiveGuideline)
                            .showXAxis(scope.viewModel.showXAxis === undefined ? true : scope.viewModel.showXAxis)
                            .showYAxis(scope.viewModel.showYAxis === undefined ? true : scope.viewModel.showYAxis);

                        //Chart styles
                        if (scope.viewModel.margin) {
                            chart.margin(scope.viewModel.margin);
                        }

                        chart.xAxis     //Chart x-axis settings
                            .axisLabel(scope.viewModel.xAxisLabel);

                        chart.yAxis     //Chart y-axis settings
                            .axisLabel(scope.viewModel.yAxisLabel);

                        //X axis format
                        if (typeof scope.viewModel.xAxisFormat === 'function') {
                            chart.xAxis.tickFormat(scope.viewModel.xAxisFormat());
                        }

                        //Y axis format
                        if (typeof scope.viewModel.yAxisFormat === 'function') {
                            chart.yAxis.tickFormat(scope.viewModel.yAxisFormat());
                        }

                        //Padding for desktop
                        chart.yAxis.tickPadding(LABEL_PADDING_DESKTOP);
                        chart.xAxis.tickPadding(LABEL_PADDING_DESKTOP);

                        //Set margin
                        if (scope.viewModel.margin) {
                            var leftMargin = scope.viewModel.margin.left;
                            var leftMarginTab = scope.viewModel.margin.left + EXTRA_MARGIN_TABLET;
                        }

                        //Set height and width of bar chart
                        chart.width(scope.viewModel.width)
                            .height(scope.viewModel.height);

                        //Set min width and height for div
                        angular.element('#' + scope.viewModel.id)
                            .css({'min-width': scope.viewModel.width, 'min-height': scope.viewModel.height});

                        //Any additional options if user would like to set
                        if (typeof scope.viewModel.chartOptions === 'function') {
                            scope.viewModel.chartOptions(chart);
                        }

                        if ($window.innerWidth < TABLET_SCREEN_SIZE) {
                            updateLeftMargin(leftMarginTab, chart);
                        }

                        //Event listener on window resize. This cannot be doable through CSS.
                        angular.element($window).on('resize', function () {
                            if ($window.innerWidth < TABLET_SCREEN_SIZE) {
                                chart.yAxis.tickPadding(LABEL_PADDING_TABLET);
                                chart.xAxis.tickPadding(LABEL_PADDING_TABLET);
                                updateLeftMargin(leftMarginTab, chart);
                            }
                            else {
                                chart.yAxis.tickPadding(LABEL_PADDING_DESKTOP);
                                chart.xAxis.tickPadding(LABEL_PADDING_DESKTOP);
                                updateLeftMargin(leftMargin, chart);
                            }
                        });


                        //Invoke d3 with chart options and data
                        d3.select('#' + scope.viewModel.id + ' svg').datum(scope.viewModel.data)
                            .attr('width', scope.viewModel.width)
                            .attr('height', scope.viewModel.height)
                            .call(chart);

                        nv.utils.windowResize(chart.update);

                        return chart;
                    });
                });

                //Update left margin to adjust extra space between desktop and tablet
                function updateLeftMargin(leftMargin, chart) {
                    if (scope.viewModel.margin) {
                        scope.viewModel.margin.left = leftMargin;
                        chart.margin(scope.viewModel.margin);
                    }
                }
            },
            templateUrl: 'template/uitkLineChartTemplate.html'
        };
    };

    uitkLineChartDirective.$inject = ['$window', 'uitkExceptionService', 'dialogService'];

    angular.module('uitk.component.uitkLineChart', ['uitk.component.uitkButton', 'uitk.component.uitkDialog', 'uitk.uitkUtility'])
        .directive('uitkLineChart', uitkLineChartDirective);
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
(function () {

    var uitkMegaMenu = function (uitkTools, uitkEvents, $timeout, compile, $document) {
        return {
            transclude: true,
            restrict: 'E',
            scope: {
                viewModel: "=",
                focusItem: '='
            },
            link: function (scope, elem, attrs) {
                scope.show = false;
                scope.hasAdditionalInfo = null;
                scope.componentId = uitkTools.ComponentId(attrs.id, scope.viewModel, elem, 'mega menu');

                var close = function () { /* closes the mega menu */
                    scope.show = false;
                    scope.isSelected = null;
                }

                $document.on("click", function (event) { /* click anywhere to close megamenu */
                    var binded = elem.find(event.target).length > 0;
                    if (!binded) {
                        scope.$apply(function () {
                            close();
                        });
                    }
                });

                angular.forEach(scope.viewModel.items, function (item, index) {
                    if (item.dropdown) {
                        scope.viewModel.items[index].menuVisible = false;
                    }
                });
                /**
                 * Event
                 * @param eventScope
                 * @param result
                 */
                var fireEvent = function (eventScope, result) {
                    // return uitkEvents.setScope(eventScope).emit('megamenu', scope.componentId + '-' + result.name, result, { dropdownShow: scope.show });
                    return uitkEvents.setScope(eventScope).emit('megamenu', scope.componentId, result, { dropdownShow: scope.show });
                };

                var fireAdditionalnfoEvent = function (eventScope, result) {
                    return uitkEvents.setScope(eventScope).emit('megamenu', 'learn-more', result);
                };

                var fireViewEvent = function (eventScope, result) {
                    return uitkEvents.setScope(eventScope).emit('megamenu', 'view', result);
                };

                /** shows the dropdown
                 * based on the header titles clicked
                */

                scope.showDropdown = function (itemName, itemIndex) {
                    angular.forEach(scope.viewModel.items, function (result, index) {
                        if (!result.name || !result.title) return;  // check if there is an result.name and title
                        if (result.name === itemName) {
                            if (result.dropdown) {
                                scope.hasAdditionalInfo = false;
                                scope.hasTitleLink = false;
                                if (result.additionalInfo) {
                                    scope.hasAdditionalInfo = true;
                                    scope.additionalInfo = result.additionalInfo.text;
                                }
                                if (result.titleLink) {
                                    scope.hasTitleLink = true;
                                    scope.parentLink = result.titleLink;
                                }
                                scope.show = true;
                                result.menuVisible = scope.show;
                                scope.isSelected = itemIndex;
                                scope.parentName = result.title;
                                scope.aria_parentName = result.name
                                scope.dropDown = result.dropdown;
                                scope.currentItem = scope.viewModel.items[itemIndex];
                                $timeout(function () {
                                    if (scope.hasTitleLink) {
                                        elem.find('#first_focus')[0].focus();
                                    } else {
                                        elem.find('#list_1')[0].focus();
                                    } // focuses an element
                                }, 100);
                            } else {
                                close();
                            }
                            fireEvent(scope, result);
                        }
                    })
                };

                scope.enterKey = function (event, item, index) {
                    if (event.which === 13) { // hit enter button
                        if (scope.show === true && item.title === scope.parentName) { /* if show is already true */
                            close();
                            scope.viewModel.items[index].focusMe = true;
                        } else {
                            if (item.dropdown) {
                                scope.showDropdown(item.name, index);
                            } else { /* will not show if hit enter on item without dropdown */
                                close();
                            }
                        }
                    }
                };

                scope.hideMenu = function (event, index) {
                    if (event.which === 27) {  // hide the parent menu when escape is click
                        close();
                        /* hide and focus on title menu and put the focus back on */
                        scope.viewModel.items[index].focusMe = true; /* angular way to focus an element */
                    }
                };

                scope.lastTabKey = function (event, index) {
                    if (event.shiftKey && event.which == 9) {
                        //shift was down when tab was pressed
                        return;
                    }
                    if (event.which === 9) {
                        close();
                        scope.viewModel.items[index + 1].focusMe = true; // focus on next parent's menu item
                    }
                };

                scope.firstTabKey = function (event, items, index) {
                    if (event.shiftKey && event.which == 9) {
                        if (items.length === index + 1) {
                            // scope.viewModel.items[items.length];
                            close();
                            return;
                        }
                        scope.viewModel.items[index].focusMe = true; // focus on its parent
                        close();
                    }
                };

                scope.tabKey = function (event, index, isSelected) {
                    if (event.shiftKey && event.which == 9 && scope.hasTitleLink === false) { // checks if there is another focusable tem to focus on else close the menu
                        if (index === 0) {
                            close();
                            scope.viewModel.items[isSelected].focusMe = true;
                            return;
                        }
                    }

                    if (event.which == 9) {
                        if (scope.dropDown.length === index + 1 && scope.hasAdditionalInfo === false) { // checks if there is an additional info to focus on else close the menu
                            if (event.shiftKey) return;
                            close();
                            scope.viewModel.items[isSelected].focusMe = true;
                        }
                    }
                };

                scope.view = function (result) {
                    fireViewEvent(scope, result);
                };

                scope.viewAdditionalInfo = function (result) {
                    fireAdditionalnfoEvent(scope, result);
                }




            },
            templateUrl: 'template/uitkMegamenuTemplate.html'
        }
    };

    var applyParentFocus = function ($timeout) {
        return {
            link: function (scope, element) {
                if (scope.item) {
                    scope.$watch('item.focusMe', function (a, b) {
                        if (scope.item.focusMe) {
                            $timeout(function () {
                                element[0].focus();
                            });
                            scope.item.focusMe = false;
                        }
                    });
                }
            }
        }
    };
    applyParentFocus.$inject = ["$timeout"];

    uitkMegaMenu.$inject = ['uitkTools', 'uitkEvents', '$timeout', '$compile', '$document'];

    angular.module('uitk.component.uitkMegaMenu', ['uitk.component.uitkSlideAnimation', 'uitk.component.uitkNavigable', 'uitk.uitkUtility'])
        .directive('uitkMegaMenu', uitkMegaMenu)
        .directive('applyParentFocus', applyParentFocus);
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.component.uitkMessage',['uitk.component.uitkNavigable','uitk.uitkUtility'])
.directive('uitkMessage', ["$timeout", "uitkExceptionService", function($timeout, uitkExceptionService){
	function controller($scope, $element){

		$scope.messageVisibleFlag = false;
		var timer = null;

		function hideMessage(){
			var d = new Date();
			$scope.startTime = d.getTime();
			timer = $timeout(function(){
				var d = new Date();
				var time = d.getTime();
				if($scope.startTime + $scope.model.messageVisibleTime <= time  && !$scope.customfocus){
					$scope.model.visible = false;
					$element.fadeOut($scope.model.animationTime);
					$timeout(function(){
						if($scope.model.activeItem) {
							angular.element($scope.model.activeItem).focus();
						}
						$scope.model.rememberMeValue = $scope.message.rememberMeValue;
						$scope.messageVisibleFlag = false;
					},$scope.model.animationTime);
				}
			},$scope.model.messageVisibleTime);
		}

		$scope.$watch('model.visible', function(newValue, oldValue) {
			if(newValue && ($scope.model.rememberMeValue === false)){
				$scope.messageVisibleFlag = true;
                //It should apply aria attributes once message will be loaded in DOM
                $timeout(function(){
                    $scope.addAriaAttribute();
                });

				$element.hide();
				if($scope.model.position !== 'absolute' && $scope.model.position !== 'inline'){
					/*
			 		* turn on/off the ability to close the messages. Default value true.
			 		*/
			 		if($scope.model.closeButton === undefined){
			 			$scope.model.closeButton = true;
			 		}

					$element.fadeIn($scope.model.animationTime,
						function(){
							var messageCompId = $scope.model.id;
							messageCompId="#"+messageCompId;
							$(messageCompId+ " > .oui-pmsg input:checkbox").attr("tabindex", "0");

                            //Fix for JAWS/IE
							if (isIE()) {
                                $element.focus();
                            } else {
                                angular.element("div",$element)[0].focus();
                            }
						});
				}
				else {
					$element.show();
                    // For inline error messages, set the tabindex and focus on the div element so that the screen readers announce the error message in all browsers
                    $timeout(function(){
                        angular.element('#' + $scope.model.id + ' div.oui-pmsg-inline').attr('tabindex',-1);
                        angular.element('#' + $scope.model.id + ' div.oui-pmsg-inline').focus();
                    });
				}

				if($scope.model.messageType === 'success' && $scope.model.autoFadeOut){
					hideMessage();
				};
			}
            //Changed condition to fix DE99897 & DE108945
            //It should not call fadeOut function in beginning when false is initial value in model
			else if(newValue === false && oldValue === true ) {
				$element.fadeOut($scope.model.animationTime, function(){
					$scope.closeMessageStart = false;
					var messageCompId = $scope.model.id;
					$(messageCompId+ " > .oui-pmsg input:checkbox").attr("tabindex", "0");
					$scope.messageVisibleFlag = false;
				});
			}
		});

		$scope.resetTimer = function(){
			if($scope.model.messageType === 'success' && $scope.closeMessageStart === false && $scope.model.autoFadeOut){
				if($element.is(':animated')) {
					$element.stop().animate({opacity:'100'});
			    }
				hideMessage();
			}
		}

		$scope.closeMessage = function(){
			$scope.model.visible = false;
			$element.fadeOut($scope.model.animationTime,function(){
				$timeout.cancel(timer);
				angular.element($scope.model.activeItem).focus();
			});
			$scope.closeMessageStart = true;
			$scope.model.rememberMeValue = $scope.message.rememberMeValue;
			$timeout(function() {
				$scope.messageVisibleFlag = false;
			}, $scope.model.animationTime);
		}

        $scope.checkPosition = function(type){
            if($scope.model.position === type){
                return true;
            }
            return false;
        }

		$scope.checkMessageType = function(type){
			if($scope.model.messageType === type){
				return true;
			}
			return false;
		}

        $scope.position = function(){
        	return $scope.model.position !== 'absolute' && $scope.model.position !== 'inline';
        }

        $scope.checkEscToCloseMesg = function(e){
	    	if (e.keyCode === 27) {
				$scope.closeMessage();
        	}
        };
	}
	controller.$inject = ["$scope", "$element"];;

    function isIE() {
        var ua = window.navigator.userAgent;

        if(ua.indexOf('MSIE ')>0 || ua.indexOf('Trident/')>0 || ua.indexOf('Edge/')>0){
            return true;
        }

        return false;
    };

	function link($scope, $element){
		var allowedMessageType = ['success','error','warning','information'];
 		if(!_.includes(allowedMessageType, $scope.model.messageType)){
            uitkExceptionService.throwException('MessageTypeNotSupportedException',$scope.model.messageType + ' is not supported');
 		};

 		if(!$scope.model.id){
            uitkExceptionService.throwException('InvalidIdException','Id is required attribute');
 		}

 		if($scope.model.messageType === 'error' && $scope.model.rememberMe){
            uitkExceptionService.throwException('RememeberMeNotSupportedException','Remember me not supported for error message');
 		}

 		if($scope.model.messageType !== 'success' && $scope.model.messageVisibleTime){
            uitkExceptionService.throwException('MessageVisibleTimeNotSupportedException','Message visible time supported only for success message');
 		}

 		if($scope.model.rememberMeValue === undefined){
 			$scope.model.rememberMeValue = false;
 		}

 		/*
 		 * automatic fadeout of success message. Default value true.
 		 */
 		if($scope.model.autoFadeOut === undefined){
 			$scope.model.autoFadeOut = true;
 		}

		$scope.message = {rememberMeValue : false};
		if(!$scope.model.messageVisibleTime){
			$scope.model.messageVisibleTime = 5000;
		}
		if(!$scope.model.animationTime){
			$scope.model.animationTime = 1000;
		}

    	if($scope.model.position === 'absolute' && !$scope.model.visible){
    		$element.hide();
    	}

    	if(!$scope.model.rememberMe){
    		$scope.model.rememberMe = false;
    	}

        //Add aria attributes when message becomes available in DOM
        $scope.addAriaAttribute = function(){
            if($scope.model.position && $scope.model.position === 'inline') {
                $element.find('div.oui-pmsg').removeAttr('tabindex');
                $element.find('span.oui-a11y-hidden').removeAttr('tabindex');
                //Commented below lines to fix DE101458
                /*$('#'+$scope.model.id).attr("aria-relevant","additions");
                $('#'+$scope.model.id).attr("aria-live","assertive");
                $('#'+$scope.model.id).attr("aria-atomic","true");*/
                if(isIE()) {
                    $element.find('div:first-child').attr("role", $scope.model.messageRole);
                } else {
                    $('#'+$scope.model.id).attr("role", $scope.model.messageRole);
                }
            } else {
                $element.find('div:first-child').attr("role", $scope.model.messageRole);
            }

            //Set ARIA attributes only when required - US210487
            if($scope.model.ariaAttributes) {
                $element.find('div:first-child').attr('aria-labelledby', $scope.model.id+'-label');
                $element.find('div:first-child').attr('aria-describedby', $scope.model.id+'-description');
                $element.find('div:first-child').attr('uitk-navigable', 'true');
            } else {
                $element.find('div:first-child').attr('uitk-navigable', 'false');
            }

			if($scope.model.headingLevel) {
				$element.find('#' + $scope.model.id + '-label').attr('aria-level', $scope.model.headingLevel);
			}
        }
	}

	return {
		restrict: 'E',
		replace : true,
		transclude: true,
		controller: controller,
		link: link,
		scope: {
			model : '='
		},
		template : [
		            '<div  id="{{model.id}}" ng-class="{\'oui-pmsg-wrapper\' : position()}" aria-hidden="{{!model.visible || model.rememberMeValue}}" class="message-container" ng-keyup="checkEscToCloseMesg($event)" >',
		        	'<div ng-if="messageVisibleFlag" ng-class="{\'oui-pmsg-success\': checkMessageType(\'success\'),\'oui-pmsg-error\': checkMessageType(\'error\'),\'oui-pmsg-inline\': checkPosition(\'inline\'),\'oui-pmsg-warning\': checkMessageType(\'warning\'),\'oui-pmsg-informational\': checkMessageType(\'information\'),\'oui-pmsg-absolute\':!position()}" ng-mouseover="resetTimer();" ng-focus="customfocus=true" ng-blur="customfocus=false" class="oui-pmsg" aria-hidden="{{!model.visible || model.rememberMeValue}}" tabindex="{{model.position == \'absolute\' ? 0 : -1}}">',
		        	'	<span class="icon-wrapper"><uitk:icon-font ng-if="checkMessageType(\'success\')" icon="cux-icon-checkmark_hollow"></uitk:icon-font></span>',
		        	'	<span class="icon-wrapper"><uitk:icon-font ng-if="checkMessageType(\'error\')" icon="cux-icon-alert_hollow"></uitk:icon-font></span>',
		        	'	<span class="icon-wrapper"><uitk:icon-font ng-if="checkMessageType(\'warning\')" icon="cux-icon-warning"></uitk:icon-font></span>',
		        	'	<span class="icon-wrapper"><uitk:icon-font ng-if="checkMessageType(\'information\')" icon="cux-icon-information"></uitk:icon-font></span>',
		        	'	<div ng-class="{\'oui-pmsg-success-body\': checkMessageType(\'success\'),\'oui-pmsg-error-body\': checkMessageType(\'error\'),\'oui-pmsg-warning-body\': checkMessageType(\'warning\'),\'oui-pmsg-informational-body\': checkMessageType(\'information\')}" >',
		        	'		<span id={{model.id}}-label class="oui-a11y-hidden" role="heading" tabindex="-1">{{model.messageType}} message</span>',
		        	'		<span id={{model.id}}-description tabindex="-1" uitk-compile-message> </span>', // message
					'		<div ng-transclude></div>',
		        	'		<div ng-if="model.rememberMe && !(checkMessageType(\'error\'))" aria-hidden="{{!(model.rememberMe && !checkMessageType(\'error\'))}}" class="tk-margin-top-halft"><input type="checkbox" id={{model.id}}-checkbox ng-model="message.rememberMeValue" uitk-navigable="model.rememberMe && !(checkMessageType(\'error\'))" ng-focus="resetTimer();" tabindex="-1"/> <label id={{model.id}}-labelContent for={{model.id}}-checkbox >{{"Do not show this message again." | translate}}</label></div>',
		        	'	</div>',
		        	'	<button type="button" class="oui-pmsg-close" uitk-navigable="true" ng-if="model.closeButton" onclick="return false;" ng-click="closeMessage()" ng-focus="resetTimer();">',
		        	'		<uitk:icon-font icon="cux-icon-close" hidden-text="Close {{model.messageType}} message"></uitk:icon-font>',
		        	'	</button>',
		        	'</div>',
		        	'</div>'
		            ].join('')
	};
}])
.directive('uitkCompileMessage', ["$compile", function ($compile) {
	  return function($scope, $element) {
		  $scope.$watch('model.content',function(){
			  $compile($scope.model.content)($scope, function(clone){
				  	$element.empty();
            $element.append(clone);
			  });
		  });
	  };
}]);

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.15.0
 */
/*!
  * angular-multi-select : A multi select dropdown directive for AngularJS.
  * https://github.com/isteven/angular-multi-select
  * MIT License | Copyright (c) 2014-2015 Ignatius Steven (https://github.com/isteven)
  */
angular.module( 'uitk.component.uitkMultiSelect', ['ng', 'uitk.uitkUtility', 'uitk.click'] ).directive( 'uitkMultiselect' , [ '$sce', '$timeout', 'uitkEvents', function ( $sce, $timeout, uitkEvents ) {
    return {
        restrict: 
            'AE',

        replace: 
            true,

        scope: 
        {   
            // models
            inputModel      : '=',
            outputModel     : '=',

            // settings based on attribute
            buttonLabel     : '@',
            defaultLabel    : '@',
            directiveId     : '@',
            helperElements  : '@',            
            isDisabled      : '=',
            itemLabel       : '@',
            maxLabels       : '@',
            orientation     : '@',
            selectionMode   : '@',            
                                                         
            // settings based on input model property 
            tickProperty    		: '@',
            disableProperty 		: '@',
            groupProperty   		: '@',
            maxHeight      			: '@',
            inputWidth      		: '@',
            flyoutwindowWidth		: '@',

            // callbacks
            onClose         : '&',
            onItemClick     : '&',
            onOpen          : '&',
            filterListener  : '&?',
            	
            //id
            id : '@'
        },
     
        template: 
            '<span class="tk-multi-sel" role="application">' +        
	    		'<div ng-class="{\'tk-disable-btn\':isDisabled}" class="tk-multi-btn-wrap" uitk-click="toggleCheckboxes( $event ); refreshSelectedItems(); refreshButton();">'+
	    			'<div   style="{{setInputWidth();}}" >' +
			        	'<button  ng-disabled="isDisabled"  id="btn-{{id}}-{{InstanceId}}" type="button" ng-style="setInputWidth()"  class="tk-multi-btn multiSelectButton" ng-bind-html="varButtonLabel" title="{{varButtonTitle}}" aria-labelledby="{{id+\'_label\'}}" role="listbox">' +
			        	'</button>' +
                        '<uitk:icon-font icon="cux-icon-caret_down_centered"></uitk:icon-font>'+
		        	'</div>' +
		        '</div>'+                             
                '<div class="tk-chckbox-layer" ng-style="setFlyoutWidth();">' +                        
                    '<form>' + 
                        '<div class="tk-help-cont" ng-if="displayHelper( \'filter\' ) || displayHelper( \'all\' ) || displayHelper( \'none\' ) || displayHelper( \'reset\' )">' +
                            '<div class="tk-multi-line" ng-if="displayHelper( \'all\' ) || displayHelper( \'none\' ) || displayHelper( \'reset\' )">' +
                                '<span ng-if="!isDisabled && displayHelper( \'all\' ) && displayHelper( \'none\' )">{{"Select:" | uitkTranslate}}</span>' +
                            	'<button  type="button" aria-disabled="{{!enableAllBtn()}}" aria-describedby="allBtnAl1yText" ng-class="{\'disabled\':!enableAllBtn()}" ng-disabled="!enableAllBtn()"  ng-click="select( \'all\',   $event );" class="tk-help-btn tk-help-btnAll" ng-if="!isDisabled && displayHelper( \'all\' )">{{"All" | uitkTranslate}}</button><span id="allBtnAl1yText" class="oui-a11y-hidden" >Button is disabled when all options are selected</span>' +
                            	'<span class="tk-divider" ng-if="!isDisabled && displayHelper( \'all\' ) && displayHelper( \'none\' )">|</span>' +
                                '<button type="button" aria-disabled="{{!enableNoneBtn()}}" aria-describedby="noneBtnAl1yText" ng-class="{\'disabled\':!enableNoneBtn()}"  ng-disabled="!enableNoneBtn()" ng-click="select( \'none\',  $event );" class="tk-help-btn tk-help-btnNone" ng-if="!isDisabled && displayHelper( \'none\' )">{{"None" | uitkTranslate}}</button><span id="noneBtnAl1yText" class="oui-a11y-hidden" >Button is disabled when no options are selected</span>' +
                                '<button type="button" ng-click="select( \'reset\', $event );"  class="tk-help-btn tk-help-btnReset" ng-if="!isDisabled && displayHelper( \'reset\' )" style="float:right">&#8630;&nbsp; {{"Reset" | uitkTranslate}}</button>' +
                            '</div>' +
                            '<div class="tk-multi-line" style="position:relative" ng-if="displayHelper( \'filter\' )">' +
                                '<input type="text" ng-click="select( \'filter\', $event )" ng-model="inputLabel.labelFilter" ng-model-options="{debounce: 200}" ng-change="onModelChange();$scope.getFormElements();" class="tk-input-fltr" />' +
                            '</div>' +
                        '</div>' +
                        '<div class="tk-multi-chck-cont" ng-style="setFlyoutWidth(); setHeight();">' +
                            '<div ng-repeat="item in filteredModel | filter:removeGroupEndMarker" class="tk-multi-item"' +
                                'ng-class="{\'selected\': item[ tickProperty ] , \'tk-multi-horiz\': orientationH, \'tk-multi-vert\': orientationV, \'tk-multi-group\':item[ groupProperty ], \'disabled\':itemIsDisabled( item )}" ' +
                                'ng-click="syncItems( item, $event, $index );"' + 
                                'ng-mouseleave="removeFocusStyle( tabIndex );">' +
                                '<div class="tk-multi-col" ng-if="item[ spacingProperty ] > 0 && ( groupProperty !== \'multiSelectGroup\' || selectionMode !==\'single\' )" ng-repeat="i in numberToArray( item[ spacingProperty ] ) track by $index">&nbsp;</div>' +
                                '<div class="tk-multi-col">' +
                                    '<label for="input-{{$index}}-{{InstanceId}}">' +
                                        '<input id="input-{{$index}}-{{InstanceId}}" class="tk-multi-chck-box focusable" data-title="{{writeLabel( item, \'itemLabel\')}}" type="checkbox" ng-disabled="itemIsDisabled( item )" ng-checked="item[ tickProperty ]" ng-click="syncItems( item, $event, $index )" />' +
                                        '<span ng-if="groupProperty === \'multiSelectGroup\' && selectionMode ===\'single\' && item[spacingProperty] > 0 ">&nbsp;&nbsp;</span>' +
                                        '<span class="tk-multi-tick" ng-class="{disabled:itemIsDisabled( item )}" ng-if="selectionMode !== \'single\' && item[ tickProperty ] === true"><div class="tk-multi-chck">&#10004;</div></span>' +
                                        '<span class="tk-multi-tick" ng-class="{disabled:itemIsDisabled( item )}" ng-if="selectionMode !== \'single\' && item[ tickProperty ] !== true"><div class="tk-multi-chck"></div></span>' +                                        
                                        '<span  class="tk-multi-label" ng-class="{disabled:itemIsDisabled( item )}" ng-bind-html="writeLabel( item, \'itemLabel\' )"></span>' +
                                    '</label>' +                                
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</form>' +
                '</div>' +
            '</span>',

        link: function ( $scope, element, attrs ) {

            $scope.backUp           = [];
            $scope.varButtonLabel   = '';
            $scope.varButtonTitle   = '';
            $scope.scrolled         = false;
            $scope.spacingProperty  = '';
            $scope.indexProperty    = '';            
            $scope.checkBoxLayer    = '';
            $scope.orientationH     = false;
            $scope.orientationV     = true;
            $scope.filteredModel    = [];
            $scope.avaliableModel   = [];
            $scope.inputLabel       = { labelFilter: '' };
            $scope.selectedItems    = [];                                    
            $scope.formElements     = [];
            $scope.tabIndex         = 0;
            $scope.clickedItem      = null;
            $scope.dropDownTitleStr = '';
            $scope.InstanceId       = Math.floor(Math.random() * 99999) + 1;
            $scope.hierarchyLevel = (attrs.hierarchyLevel)? attrs.hierarchyLevel: 2;
            var dropDownTitleTimer      = 500; //time to reset keyboard search of dropdown
            var prevTabIndex            = 0;
            var helperItems             = [];
            var helperItemsLength       = 0;

            // If user specify a height, call this function
            $scope.setHeight = function() {
                if ( typeof $scope.maxHeight !== 'undefined' ) {
                    return {'max-height' : $scope.maxHeight, 'overflow-y' : 'scroll'};
                } else 
                	return '';
            }
            
            $scope.setFlyoutWidth = function() {
                if ( typeof $scope.flyoutwindowWidth !== 'undefined' ) {                    
                	return {'width': $scope.flyoutwindowWidth, 'min-width':$scope.flyoutwindowWidth, 'overflow-x': 'auto', 'overflow-y': 'hidden'};
                } else 
                	return '';
            }   
            
            $scope.setInputWidth = function() {
                if ( typeof $scope.inputWidth !== 'undefined' ) {
                	return {width: $scope.inputWidth};
                } else 
                	return '';
            }

            // A little hack so that AngularJS ng-repeat can loop using start and end index like a normal loop
            // http://stackoverflow.com/questions/16824853/way-to-ng-repeat-defined-number-of-times-instead-of-repeating-over-array
            $scope.numberToArray = function( num ) {
            	var numberToArray = [];
            	if(num > 0) {
            		for(var index=0; index<num; index++) {
            			numberToArray.push(0);
            		}
            	}
                return numberToArray;   
            }

            $scope.onModelChange = function (){
                if($scope.filterListener) {
                    $scope.filterListener()($scope.inputLabel.labelFilter);
                    return;
                }
                $scope.updateFilter();
            }

            $scope.updateFilter = function()
            {
            	var groupNameSearchFlag = false;
            	
                // we check by looping from end of array
                $scope.filteredModel   = [];
                $scope.avaliableModel   =[]
                var i = 0;

                if ( typeof $scope.inputModel === 'undefined' ) {
                    return [];                   
                }
                
                var groupTick = true;
                for( i = $scope.inputModel.length - 1; i >= 0; i-- ) {

                    // if it's group end
                    if ( typeof $scope.inputModel[ i ][ $scope.groupProperty ] !== 'undefined' && $scope.inputModel[ i ][ $scope.groupProperty ] === false ) {
                        $scope.filteredModel.push( $scope.inputModel[ i ] );
                        
                        var index = i - 1;
                        while($scope.inputModel[index].multiSelectGroup === undefined){
                        	index--;
                        }
                        var groupName = $scope.inputModel[index].name.replace("<strong>","").replace("</strong>","");
                        if($scope.inputLabel.labelFilter !== undefined && $scope.inputLabel.labelFilter !== ''){
                    		var indexes = getIndexOf($scope.inputLabel.labelFilter, groupName);
                        	if($scope.inputLabel.labelFilter !== undefined && $scope.inputLabel.labelFilter !== '' && indexes.length > 0){
                        		groupNameSearchFlag = true;
                        	}
                        	else { 
                        		groupNameSearchFlag = false;
                        	}
                    	}
                        
                        groupTick = true;
                    }
                    
                    // if filter string is in one of object property
                    if ( typeof $scope.inputModel[ i ][ $scope.groupProperty ] === 'undefined' && 
                    		(String( $scope.inputModel[ i ][ 'name' ] ).toUpperCase().indexOf( $scope.inputLabel.labelFilter.toUpperCase() ) >= 0 || groupNameSearchFlag) ) {
                        $scope.filteredModel.push( $scope.inputModel[ i ] );
                        
                        //groupTick should be false if any item in group is not selected(with filtering condition applied)
                        if(!$scope.inputModel[i][$scope.tickProperty]){
                        	groupTick = false;
                        }
                    }

                    // if it's group start
                    if ( typeof $scope.inputModel[ i ][ $scope.groupProperty ] !== 'undefined' && $scope.inputModel[ i ][ $scope.groupProperty ] === true ) {
                    	//Check whether group should be selected/deselected based on filter condition
                    	$scope.inputModel[i][$scope.tickProperty] = groupTick;
                    	
                        if ( typeof $scope.filteredModel[ $scope.filteredModel.length - 1 ][ $scope.groupProperty ] !== 'undefined' && $scope.filteredModel[ $scope.filteredModel.length - 1 ][ $scope.groupProperty ] === false ) {
                            $scope.filteredModel.pop();
                        }
                        else {
                            $scope.filteredModel.push( $scope.inputModel[ i ] );
                        }
                        
                    }
                    if ( typeof $scope.inputModel[ i ][$scope.tickProperty] !== 'undefined' && ($scope.inputModel[ i ][$scope.disableProperty] === undefined ||$scope.inputModel[ i ][$scope.disableProperty] === false)) {
                          $scope.avaliableModel.push($scope.inputModel[ i ])
                    }
                }                

                $scope.filteredModel.reverse();  
                $timeout( function() {
                    $scope.getFormElements();               
                },0);
            };

            // List all the input elements.
            // This function will be called everytime the filter is updated. Not good for performance, but oh well..
            $scope.getFormElements = function() {
                $scope.formElements = [];
                for ( var i = 0; i < element[ 0 ].getElementsByTagName( 'FORM' )[ 0 ].elements.length ; i++ ) { 
                    $scope.formElements.push( element[ 0 ].getElementsByTagName( 'FORM' )[ 0 ].elements[ i ] );
                }
            }            

            // check if an item has $scope.groupProperty (be it true or false)
            $scope.isGroupMarker = function( item , type ) {
                if ( typeof item[ $scope.groupProperty ] !== 'undefined' && item[ $scope.groupProperty ] === type ) return true; 
                return false;
            }

            $scope.removeGroupEndMarker = function( item ) {
                if ( typeof item[ $scope.groupProperty ] !== 'undefined' && item[ $scope.groupProperty ] === false ) return false; 
                return true;
            }
            

            // Show or hide a helper element 
            $scope.displayHelper = function( elementString ) {

                if ( attrs.selectionMode && $scope.selectionMode.toUpperCase() === 'SINGLE' ) {

                    switch( elementString.toUpperCase() ) {
                        case 'ALL':                                                        
                        case 'NONE':                            
                            return false;
                        case 'RESET':
                            if ( typeof attrs.helperElements === 'undefined' ) {
                                return true;                    
                            }
                            else if ( attrs.helperElements && $scope.helperElements.toUpperCase().indexOf( 'RESET' ) >= 0 ) {
                                return true;
                            }                            
                            break;
                        case 'FILTER':
                            if ( typeof attrs.helperElements === 'undefined' ) {
                                return true;                    
                            }                            
                            if ( attrs.helperElements && $scope.helperElements.toUpperCase().indexOf( 'FILTER' ) >= 0 ) {
                                return true;
                            }
                            break;                    
                        default:                                         
                            break;
                    }                    

                    return false;
                }

                else {
                    if ( typeof attrs.helperElements === 'undefined' ) {
                        return true;                    
                    }
                    if ( attrs.helperElements && $scope.helperElements.toUpperCase().indexOf( elementString.toUpperCase() ) >= 0 ) {
                        return true;
                    }
                    return false;
                }                
            }                

            // call this function when an item is clicked
            $scope.syncItems = function( item, e, ng_repeat_index ) {

                e.preventDefault();
                e.stopPropagation();

                uitkEvents.setScope($scope).emit('multiSelectDropdown', 'multiSelectDropdown-' + attrs.id, item);

                // if it's globaly disabled, then don't do anything
                if (typeof attrs.disableProperty !== 'undefined' && item[$scope.disableProperty] === true) {
                    return false;
                }

                // don't change disabled items
                if (typeof attrs.isDisabled !== 'undefined' && $scope.isDisabled === true) {
                    return false;
                }

                // we don't care about end of group markers
                if (typeof item[$scope.groupProperty] !== 'undefined' && item[$scope.groupProperty] === false) {
                    return false;
                }
                var index = $scope.filteredModel.indexOf(item);

                //if selected item is selectAll
                if (typeof item[$scope.groupProperty] !== 'undefined' && item[$scope.groupProperty] === true) {
                    if (attrs.selectionMode && $scope.selectionMode.toUpperCase() === 'SINGLE') {
                        return false;
                    }


                    var startIndex = 0;
                    var endIndex = $scope.filteredModel.length - 1;
                    var tempArr = [];
                    var nestLevel = 0;

                    //If a child selectAll is clicked , traverse elements from that to  high level selectAll
                    // If all are selected in between, then make tick property of parent SelectAll to true
                    if ($scope.filteredModel[index][$scope.tickProperty] === false) {
                        var allSelected = true;
                        var highestSelected;
                        var level = 0;
                        var reqIndex = [];
                        for (var k = index - 1; k >= 0; k--) {

                            if (typeof $scope.filteredModel[k][$scope.groupProperty] !== 'undefined' && $scope.filteredModel[k][$scope.groupProperty] === true) {
                                level++;
                                if (level == $scope.hierarchyLevel) {
                                    break;
                                }
                                reqIndex.push(k);

                            }
                            if (typeof $scope.filteredModel[k][$scope.groupProperty] !== 'undefined' && $scope.filteredModel[k][$scope.groupProperty] === false) {
                                break;
                            }
                            //Select 'selectAlls' till highest selected index
                            if ($scope.filteredModel[k][$scope.tickProperty] == false && (typeof $scope.filteredModel[k][$scope.groupProperty] === 'undefined')) {
                                allSelected = false;
                                if(!highestSelected) {
                                    highestSelected = k;
                                }

                            }
                        }

                        if (allSelected == true) {
                            for (var i = 0; i < reqIndex.length; i++) {
                                $scope.filteredModel[reqIndex[i]][$scope.tickProperty] = true;
                            }

                        }

                        if(highestSelected && typeof $scope.filteredModel[highestSelected+1][$scope.groupProperty] !== 'undefined' && $scope.filteredModel[highestSelected+1][$scope.groupProperty] === true) {
                            for (var i = 0; i < reqIndex.length; i++) {
                                if(reqIndex[i] >= highestSelected+1) {
                                    $scope.filteredModel[reqIndex[i]][$scope.tickProperty] = true;
                                }

                            }
                        }

                    }
                    // process items if the start of group marker is clicked ( only for multiple selection! )
                    // if, in a group, there are items which are not selected, then they all will be selected
                    // if, in a group, all items are selected, then they all will be de-selected
                    for (var i = index; i < $scope.filteredModel.length; i++) {
                        if (nestLevel === 0 && i > index) {
                            break;
                        }

                        // if group start
                        if (typeof $scope.filteredModel[i][$scope.groupProperty] !== 'undefined' && $scope.filteredModel[i][$scope.groupProperty] === true) {


                            nestLevel = nestLevel + 1;

                            // To cater multi level grouping
                            if (tempArr.length === 0 && nestLevel != $scope.hierarchyLevel) {
                                startIndex = i + 1;
                            }

                            if (nestLevel > 0 && nestLevel <= $scope.hierarchyLevel) { //when selectAll at next level is encountered, take that into count
                                tempArr.push($scope.filteredModel[i]);

                            }

                            //If a group multiselect is unchecked
                            //Traverse the highest selectAll in that group and uncheck that

                            if ($scope.filteredModel[index][$scope.tickProperty] === true) {

                                var level = 0;
                                var ind;// = index
                                for (ind = index; ind >= 0; ind--) {
                                    if (typeof $scope.filteredModel[ind][$scope.groupProperty] !== 'undefined' && ($scope.filteredModel[ind][$scope.groupProperty] === true || $scope.filteredModel[ind][$scope.groupProperty] === false)) {
                                        if ($scope.filteredModel[ind][$scope.groupProperty] == false) { //If it goes beyond next group break
                                            break;
                                        }
                                        $scope.filteredModel[ind][$scope.tickProperty] = false;
                                        level++;
                                        if (level == $scope.hierarchyLevel) {
                                            break;
                                        }

                                    }
                                }

                            }
                        }

                        // if group end
                        else if (typeof $scope.filteredModel[i][$scope.groupProperty] !== 'undefined' && $scope.filteredModel[i][$scope.groupProperty] === false) {

                            nestLevel = nestLevel - 1;

                            // check if all are ticked or not
                            if (tempArr.length > 0 && nestLevel === 0) {

                                var allTicked = true;

                                endIndex = i;

                                for (var j = 1; j < tempArr.length; j++) {
                                    if (typeof tempArr[j][$scope.tickProperty] !== 'undefined' && tempArr[j][$scope.tickProperty] === false) {
                                        allTicked = false;
                                        break;
                                    }
                                }

                                if (allTicked === true) {

                                    //if all items in a group are aready selected - set group check to false else vice-versa.
                                    item[$scope.tickProperty] = false;

                                    for (j = startIndex; j <= endIndex; j++) {
                                        if ((typeof $scope.filteredModel[j][$scope.groupProperty] === 'undefined') || (typeof $scope.filteredModel[j][$scope.groupProperty] !== 'undefined' && $scope.filteredModel[j][$scope.groupProperty] != false)) {

                                            if ((typeof attrs.disableProperty === 'undefined' )) {
                                                $scope.filteredModel[j][$scope.tickProperty] = false;
                                                // we refresh input model as well
                                                var inputModelIndex = $scope.filteredModel[j][$scope.indexProperty];
                                                $scope.inputModel[inputModelIndex][$scope.tickProperty] = false;
                                            }
                                            else if ($scope.filteredModel[j][$scope.disableProperty] !== true) {
                                                $scope.filteredModel[j][$scope.tickProperty] = false;
                                                // we refresh input model as well
                                                inputModelIndex = $scope.filteredModel[j][$scope.indexProperty];
                                                $scope.inputModel[inputModelIndex][$scope.tickProperty] = false;
                                            }

                                        }
                                    }
                                }

                                else {

                                    //set box/tick value for group item
                                    if (item[$scope.tickProperty] !== undefined)
                                        item[$scope.tickProperty] = !item[$scope.tickProperty];
                                    else
                                        item[$scope.tickProperty] = true;

                                    for (j = startIndex; j <= endIndex; j++) {
                                        if ((typeof $scope.filteredModel[j][$scope.groupProperty] === 'undefined') || (typeof $scope.filteredModel[j][$scope.groupProperty] !== 'undefined' && $scope.filteredModel[j][$scope.groupProperty] != false) && ( typeof attrs.disableProperty === 'undefined' || $scope.filteredModel[j][$scope.disableProperty] !== true)) {
                                            $scope.filteredModel[j][$scope.tickProperty] = true;
                                            // we refresh input model as well
                                            inputModelIndex = $scope.filteredModel[j][$scope.indexProperty];
                                            $scope.inputModel[inputModelIndex][$scope.tickProperty] = true;
                                        }
                                    }
                                }
                            }
                        }

                        // if data
                        else {
                            tempArr.push($scope.filteredModel[i]);
                        }
                    }
                }

                // single item click
                else {

                    // If it's single selection mode
                    if (attrs.selectionMode && $scope.selectionMode.toUpperCase() === 'SINGLE') {

                        // first, set everything to false
                        for (i = 0; i < $scope.filteredModel.length; i++) {
                            $scope.filteredModel[i][$scope.tickProperty] = false;
                        }

                        for (i = 0; i < $scope.inputModel.length; i++) {
                            $scope.inputModel[i][$scope.tickProperty] = false;
                        }

                        // then set the clicked item to true
                        $scope.filteredModel[index][$scope.tickProperty] = true;

                        $scope.toggleCheckboxes(e);
                    }

                    // Multiple
                    else {
                        var level = 0;
                        $scope.filteredModel[index][$scope.tickProperty] = !$scope.filteredModel[index][$scope.tickProperty];

                        //if it is grouped select component - deselect group mark if you select one item
                        if ($scope.groupProperty !== undefined) {
                            if ($scope.filteredModel[index][$scope.tickProperty] === false) {
                                var ind;// = index
                                var unselectLevel = 0;

                                //traverse high level nodes and unselect them including selectAll
                                for (ind = index; ind >= 0; ind--) {
                                    if (typeof $scope.filteredModel[ind][$scope.groupProperty] !== 'undefined' && $scope.filteredModel[ind][$scope.groupProperty] === false) {
                                        break;
                                    }
                                    if (typeof $scope.filteredModel[ind][$scope.groupProperty] !== 'undefined' && $scope.filteredModel[ind][$scope.groupProperty] === true) {
                                        unselectLevel++;
                                        if (unselectLevel == $scope.hierarchyLevel + 1) {
                                            break;
                                        }
                                        $scope.filteredModel[ind][$scope.tickProperty] = false;
                                    }
                                }
                                //if single checkbox is selected, check if all others are selected
                            } else {
                                var allGroupSelected = true;

                                var groupStartIndex = []; // save selectAll points in this
                                for (ind = index; ind >= 0; ind--) {
                                    if (typeof $scope.filteredModel[ind][$scope.groupProperty] !== 'undefined' && $scope.filteredModel[ind][$scope.groupProperty] === false) {
                                        break;
                                    }
                                    if (typeof $scope.filteredModel[ind][$scope.groupProperty] !== 'undefined' && $scope.filteredModel[ind][$scope.groupProperty] === true) {

                                        level++;
                                        if (level == $scope.hierarchyLevel + 1) { //if the
                                            level--;
                                            break;
                                        }
                                        groupStartIndex.push(ind);


                                    }
                                }
                                var inputModelStartIndex = $scope.filteredModel[groupStartIndex[0]][$scope.indexProperty];
                                //If filter model is not empty then check in input model as filtered model will not have full data
                                if ($scope.inputLabel.labelFilter !== undefined && $scope.inputLabel.labelFilter !== '') {
                                    while ($scope.inputModel[inputModelStartIndex + 1][$scope.groupProperty] !== false) {
                                        if (!$scope.inputModel[inputModelStartIndex + 1][$scope.tickProperty]) {
                                            allGroupSelected = false;
                                            break;
                                        }
                                        inputModelStartIndex++;
                                    }
                                }
                                //Traverse all nodes from current groupAll in the same group to end, if all are selected, select 'selectAll'

                                for (ind = groupStartIndex[0] + 1; ind < $scope.filteredModel.length; ind++) {
                                    if (typeof $scope.filteredModel[ind][$scope.groupProperty] !== 'undefined' && $scope.filteredModel[ind][$scope.groupProperty] === false || !allGroupSelected) {
                                        break;
                                    }
                                    if ($scope.filteredModel[ind][$scope.tickProperty] === false) {
                                        allGroupSelected = false;
                                    }
                                }


                                if (allGroupSelected === true) {
                                    $scope.filteredModel[groupStartIndex[0]][$scope.tickProperty] = true;
                                }


                                for (var grpInd = 0; grpInd <= groupStartIndex.length; grpInd++) {
                                    var checkFlag = true;
                                    for (var ind = groupStartIndex[grpInd]; ind > groupStartIndex[grpInd + 1]; ind--) {
                                        if (typeof $scope.filteredModel[ind][$scope.groupProperty] !== 'undefined' && $scope.filteredModel[ind][$scope.groupProperty] === false) {
                                            break;
                                        }
                                        if ($scope.filteredModel[ind][$scope.tickProperty] === false) {
                                            checkFlag = false;
                                            allGroupSelected[grpInd] = false;
                                        }
                                    }


                                    if (checkFlag === true && $scope.filteredModel[groupStartIndex[grpInd + 1]]) {
                                        $scope.filteredModel[groupStartIndex[grpInd + 1]][$scope.tickProperty] = true;
                                    }
                                }


                            }
                        }

                        // we refresh input model as well
                        inputModelIndex = $scope.filteredModel[index][$scope.indexProperty];
                        $scope.inputModel[inputModelIndex][$scope.tickProperty] = $scope.filteredModel[index][$scope.tickProperty];
                    }
                }


            $scope.clickedItem = angular.copy( item );

                // We update the index here
                prevTabIndex = $scope.tabIndex;
                $scope.tabIndex = ng_repeat_index + helperItemsLength;

                // Set focus on the hidden checkbox
                e.target.focus();

                // set & remove CSS style
                $scope.removeFocusStyle( prevTabIndex );
                $scope.setFocusStyle( $scope.tabIndex );
                $timeout(function(){uitkEvents.setScope($scope).emit('multiSelectDropdown', 'multiSelectDropdown-'+attrs.id, $scope.outputModel,$scope.selectedItems)},400);
            }

                    // update $scope.selectedItems
            // this variable is used in $scope.outputModel and to refresh the button label
            $scope.refreshSelectedItems = function() {                
                $scope.selectedItems    = [];
                angular.forEach( $scope.inputModel, function( value ) {
                    if ( typeof value !== 'undefined' && typeof value[ $scope.groupProperty ] === 'undefined' &&
                        		value[ $scope.tickProperty ] === true  && value.name !== $scope.defaultLabel) {
                        $scope.selectedItems.push( value );                               
                    }
                });                                
            }

            // refresh output model as well
            $scope.refreshOutputModel = function() {                
                if ( typeof attrs.outputModel !== 'undefined' ) {            
                    $scope.outputModel = angular.copy( $scope.selectedItems );                    
                    angular.forEach( $scope.outputModel, function( value ) {
                        // remove the index number and spacing number from output model
                        delete value[ $scope.indexProperty ];
                        delete value[ $scope.spacingProperty ];      
                    });
                }                  
            }

            // refresh button label
            $scope.refreshButton = function() {

                $scope.varButtonLabel   = '';
                $scope.varButtonTitle   = '';

                // refresh button label...
                if ( $scope.selectedItems.length === 0 ) {
                    // https://github.com/isteven/angular-multi-select/pull/19          
                	if( typeof $scope.defaultLabel === 'undefined' ) {
                		$scope.defaultLabel = "";
                	}
                	$scope.varButtonLabel = $scope.defaultLabel;
                    $scope.varButtonTitle = $scope.varButtonLabel; 
                }
                else {
                		//If single select dropdown then display the item selected else display "'count' Selected"
	                	if ( attrs.selectionMode && $scope.selectionMode.toUpperCase() === 'SINGLE' ) {
	                		$scope.varButtonLabel = '<div class="tk-multi-btn-label">' + $scope.writeLabel( $scope.selectedItems[0], 'buttonLabel' );
	                		$scope.varButtonTitle = $scope.writeLabel( $scope.selectedItems[0], 'buttonLabel' );
	                    } else {
	                		$scope.varButtonLabel = $scope.selectedItems.length + ' Selected';
	                		$scope.varButtonTitle = $scope.varButtonLabel;
	                	}
                	}
                $scope.varButtonLabel = $sce.trustAsHtml( $scope.varButtonLabel + ' ' );   
                $scope.varButtonTitle = $sce.trustAsHtml( $scope.varButtonTitle + ' ' );
            }

            // Check if a checkbox is disabled or enabled. It will check the granular control (disableProperty) and global control (isDisabled)
            // Take note that the granular control has higher priority.
            $scope.itemIsDisabled = function( item ) {
                
                if ( typeof attrs.disableProperty !== 'undefined' && item[ $scope.disableProperty ] === true ) {                                        
                    return true;
                }
                else {             
                    if ( $scope.isDisabled === true ) {                        
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                
            }
            $scope.getSelectedItems = function(){
                return $scope.filteredModel.filter(function(value){
                    return value[ $scope.tickProperty ] === true && (value[$scope.disableProperty]===undefined || value[$scope.disableProperty]===false);
                }).length;
            };
            $scope.enableAllBtn =function(){
                return ($scope.getSelectedItems() != $scope.avaliableModel.length);
            }
            $scope.enableNoneBtn =function(){
                return ($scope.getSelectedItems()!= 0);
            }
            
            $scope.lowerCase = _.memoize(function(str){
            	return str.toLowerCase();
            })

            // A simple function to parse the item label settings
            $scope.writeLabel = function( item, type ) {
                var label = '';
                var temp = $scope[ type ].split( ' ' );  
                angular.forEach( temp, function( value2 ) {
                    if ( typeof value2 !== 'undefined' ) {                        
                        angular.forEach( item, function( value1, key1 ) {                    
                            if ( key1 === value2 ) {
                                label += value1;
                            }
                        });                    
                    }
                });
                
                if ( type.toUpperCase() === 'BUTTONLABEL' ) {
                    return label;
                }
                if($scope.inputLabel.labelFilter !== undefined && $scope.inputLabel.labelFilter !== '' && !item.multiSelectGroup ){// _.includes($scope.lowerCase(label),$scope.lowerCase($scope.inputLabel.labelFilter))
                	
                	var indexes = getIndexOf($scope.inputLabel.labelFilter, label);
                	var length = $scope.inputLabel.labelFilter.length;
                	if(indexes.length > 0){
                		_.forEachRight(indexes,function(index){
                			label = label.slice(0,index) + '<strong>' + label.slice(index,index+length) + '</strong>' +label.slice(index+length);
                		});
                	}
                }
                return $sce.trustAsHtml( label );
            }
            
            function getIndexOf(searchStr, str) {
                var startIndex = 0, searchStrLen = searchStr.length;
                var index, indexes = [];
                str = $scope.lowerCase(str);
                searchStr = $scope.lowerCase(searchStr);
                while ((index = str.indexOf(searchStr, startIndex)) > -1) {
                	indexes.push(index);
                    startIndex = index + searchStrLen;
                }
                return indexes;
            }
             /************** A11y fix for checkbox checked.**************/
            $scope.bindCheckboxes = function(selector){//for accessiblity
            var selectorType = $(selector).get(0).type; 
                if(selectorType === 'checkbox'){//make sure the focus on element is valid 
                   //find the correct item to bind
                   angular.forEach($scope.inputModel,function(value,key){
                     if($scope.inputModel[key].maker && $scope.inputModel[key].name === $(selector).data('title')){//bind
                        if($scope.inputModel[key].ticked){//check inputModel to make sure it is ticked
                            $(selector).prop('checked','checked');//once true update DOM for input value checked
                        } else {
                            if($(selector).prop('checked')){
                                $(selector).prop('checked','');//if false remove checked prop
                            }
                        }
                    }  
                   });
                 }
            }
             /************** A11y fix for checkbox checked.**************/
            // UI operations to show/hide checkboxes based on click event..
            $scope.toggleCheckboxes = function( e ) {
                 if($scope.isDisabled){return false};

                // We grab the checkboxLayer
                $scope.checkBoxLayer = element.children()[1];

                // We grab the button
                var clickedEl = element.children()[0];

                // Just to make sure.. had a bug where key events were recorded twice
                angular.element( document ).unbind( 'click', $scope.externalClickListener );
                angular.element( document ).unbind( 'keydown', $scope.keyboardListener );                                    

                // clear filter
                $scope.inputLabel.labelFilter = '';                
                $scope.updateFilter();           
                
                // close if ESC key is pressed.
                if ( e.keyCode === 27 ) {
                    angular.element( $scope.checkBoxLayer ).removeClass( 'tk-multi-show' );                    
                    angular.element( clickedEl ).removeClass( 'tk-multi-btn-clicked' );                    
                    angular.element( document ).unbind( 'click', $scope.externalClickListener );
                    angular.element( document ).unbind( 'keydown', $scope.keyboardListener );                                                                            

                    // clear the focused element
                    $scope.removeFocusStyle( $scope.tabIndex );

                    // close callback
                    $scope.onClose( { data: element } );
                    return true;
                }                                

                // The idea below was taken from another multi-select directive - https://github.com/amitava82/angular-multiselect 
                // His version is awesome if you need a more simple multi-select approach.

                // close
                if ( angular.element( $scope.checkBoxLayer ).hasClass( 'tk-multi-show' )) {  
                    angular.element( $scope.checkBoxLayer ).removeClass( 'tk-multi-show' );                    
                    angular.element( clickedEl ).removeClass( 'tk-multi-btn-clicked' );                    
                    angular.element( document ).unbind( 'click', $scope.externalClickListener );
                    angular.element( document ).unbind( 'keydown', $scope.keyboardListener );                                    

                    // clear the focused element
                    $scope.removeFocusStyle( $scope.tabIndex );

                    // close callback
                    $scope.onClose( { data: element } );
                } 
                // open
                else                 
                {          
                     /************** A11y fix for checkbox checked.**************/
                   //bind all checkboxes to model
                   var iList = $('[type=checkbox]',$(e.target).parents(".tk-multi-btn-wrap").next());
                   if(iList.length > 0){
                        angular.forEach(iList,function(val){
                            $scope.bindCheckboxes(val);
                        })    
                   }
                    /************** A11y fix for checkbox checked.**************/
                    
                    helperItems = [];
                    helperItemsLength = 0;

                    angular.element( $scope.checkBoxLayer ).addClass( 'tk-multi-show' );                         
                    angular.element( clickedEl ).addClass( 'tk-multi-btn-clicked' );                
                    angular.element( document ).bind( 'click', $scope.externalClickListener );
                    angular.element( document ).bind( 'keydown', $scope.keyboardListener );  

                    // to get the initial tab index, depending on how many helper elements we have. 
                    // priority is to always focus it on the input filter 
                    $scope.getFormElements();
                    $scope.tabIndex = 0;

                    var helperContainer = angular.element( element[ 0 ].querySelector( '.tk-help-cont' ) )[0];                
                    
                    if ( typeof helperContainer !== 'undefined' ) {
                        for ( var i = 0; i < helperContainer.getElementsByTagName( 'BUTTON' ).length ; i++ ) {
                            helperItems[ i ] = helperContainer.getElementsByTagName( 'BUTTON' )[ i ];
                        }
                        helperItemsLength = helperItems.length + helperContainer.getElementsByTagName( 'INPUT' ).length;
                    } else {
                    	// if there's no filter then just focus on the first checkbox item
                    	$scope.setFocusStyle( $scope.tabIndex + helperItemsLength);
                    }
                    
                    // focus on the filter element on open. 
                    if ( element[ 0 ].querySelector( '.tk-input-fltr' ) ) {
                        element[ 0 ].querySelector( '.tk-input-fltr' ).focus();
                        $scope.tabIndex = $scope.tabIndex + helperItemsLength - 1;
                    }
                    else {                      
                        $scope.formElements[ $scope.tabIndex ].focus();
                    }

                    // open callback
                    $scope.onOpen( { data: element } );
                }                            
            }
            
            // handle clicks outside the button / multi select layer
            $scope.externalClickListener = function( e ) {
            	var targetsArr = element.find( e.target.tagName );
                for (var i = 0; i < targetsArr.length; i++) {                                        
                    if ( e.target === targetsArr[i] ) {
                        return;
                    }
                }

                angular.element( $scope.checkBoxLayer.previousSibling ).removeClass( 'tk-multi-btn-clicked' );                    
                angular.element( $scope.checkBoxLayer ).removeClass( 'tk-multi-show' );
                angular.element( document ).unbind( 'click', $scope.externalClickListener ); 
                angular.element( document ).unbind( 'keydown', $scope.keyboardListener );                
                
                // close callback                
                $timeout( function() {
                    $scope.onClose( { data: element } );
                }, 0 );
            }
   
            // select All / select None / reset buttons
            $scope.select = function( type, e ) {
            	
            	var helperIndex = helperItems.indexOf( e.target );
                $scope.tabIndex = helperIndex;

                switch( type.toUpperCase() ) {
                    case 'ALL':
                        angular.forEach( $scope.filteredModel, function( value ) {                            
                            if ( typeof value !== 'undefined' && value[ $scope.disableProperty ] !== true && (typeof value[ $scope.groupProperty ] === 'undefined' || value[ $scope.groupProperty ] === true) ) {                                
                            	value[ $scope.tickProperty ] = true;
                            }
                        });
                        break;
                    case 'NONE':
                        angular.forEach( $scope.filteredModel, function( value ) {
                            if ( typeof value !== 'undefined' && value[ $scope.disableProperty ] !== true && (typeof value[ $scope.groupProperty ] === 'undefined' || value[ $scope.groupProperty ] === true)) {                                
                                value[ $scope.tickProperty ] = false;
                            }
                        });               
                        break;
                    case 'RESET':            
                        angular.forEach( $scope.filteredModel, function( value ) {                            
                            if ( typeof value[ $scope.groupProperty ] === 'undefined' && typeof value !== 'undefined' && value[ $scope.disableProperty ] !== true ) {                        
                            	var temp = value[ $scope.indexProperty ];                                
                                value[ $scope.tickProperty ] = $scope.backUp[ temp ][ $scope.tickProperty ];
                            }
                        });               
                        break;
                    case 'CLEAR':
                        $scope.tabIndex = $scope.tabIndex + 1;
                        break;
                    case 'FILTER':                        
                        $scope.tabIndex = helperItems.length - 1;
                        break;
                    default:                        
                }                                                                                 
            }            

            // just to create a random variable name                
            var genRandomString = function( length ) {                
                var possible    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                var temp        = '';
                for( var i=0; i < length; i++ ) {
                     temp += possible.charAt( Math.floor( Math.random() * possible.length ));
                }
                return temp;
            }

            // count leading spaces
            $scope.prepareGrouping = function() {
                var spacing     = 0;                                                
                angular.forEach( $scope.filteredModel, function( value ) {
                    value[ $scope.spacingProperty ] = spacing;                    
                    if ( value[ $scope.groupProperty ] === true ) {
                        spacing+=2;
                    }                    
                    else if ( value[ $scope.groupProperty ] === false ) {
                        spacing-=2;
                    }                 
                });
            }

            // prepare original index
            $scope.prepareIndex = function() {
                var ctr = 0;
                angular.forEach( $scope.filteredModel, function( value ) {
                    value[ $scope.indexProperty ] = ctr;
                    ctr++;
                });
            }

            // navigate using up and down arrow
            $scope.keyboardListener = function( e ) {
                var key = e.keyCode ? e.keyCode : e.which;
                var isNavigationKey = false;
            	//Key event in input element should not be treated for jump-to functionality
                var isAlphaNumeric = (key >= 65 && key <= 90) || (key >= 48 && key <= 57);
            	if($(e.target).is("input[type=text]") && isAlphaNumeric){
            		return;	
            	}
                

                // ESC key (close)
                if ( key === 27 ) {
                    $scope.toggleCheckboxes( e );
                }                    
                
                // next element ( tab, down & right key )                    
                else if ( key === 40 || key === 39 || ( !e.shiftKey && key === 9 ) ) {    
                    isNavigationKey = true;
                    prevTabIndex = $scope.tabIndex; 
                    $scope.tabIndex++;                         
                    if ( $scope.tabIndex > $scope.formElements.length - 1 ) {
                    	//if tab outside component - remove focus styles from active item and close dropdown
                    	if (!e.shiftKey && key === 9 ) {
                    		$scope.tabIndex--; 
	                    	$scope.toggleCheckboxes( e );
	                    	return;
                    	} 
                    	else {
                    		//else - cycle to first item.
                    		$scope.tabIndex = 0;
                            prevTabIndex = $scope.formElements.length - 1;
                    	}
                    }                                                            
                    while ( $scope.formElements[ $scope.tabIndex ].disabled === true ) {                                                                        
                        $scope.tabIndex++;
                        if ( $scope.tabIndex > $scope.formElements.length - 1 ) {
                            $scope.tabIndex = 0;                            
                        }                                                                                    
                    }
                }
                
                // prev element ( shift+tab, up & left key )
                else if ( key === 38 || key === 37 || ( e.shiftKey && key === 9 ) ) { 
                    isNavigationKey = true;
                    prevTabIndex = $scope.tabIndex; 
                    $scope.tabIndex--;                              
                    if ( $scope.tabIndex < 0 ) {
                    	//if tab outside component - remove focus styles from active item and close dropdown
                    	if (e.shiftKey && key === 9) {
                    		$scope.tabIndex++; 
	                    	$scope.toggleCheckboxes( e );
	                    	return;
                    	} 
                    	else {
                    		//else - cycle to first item.
                            $scope.tabIndex = $scope.formElements.length - 1;
                            prevTabIndex = 0;
                    	}                    	

                    }                                         
                    while ( $scope.formElements[ $scope.tabIndex ].disabled === true ) {
                        $scope.tabIndex--;
                        if ( $scope.tabIndex < 0 ) {
                            $scope.tabIndex = $scope.formElements.length - 1;
                        }                                                                 
                    }                                 
                } 
                
                //jump-to functionality. For keys a-z and 1-2 detect where to place focus
                else if (( key >= 64) && ( key <= 90)||( key >= 48) && ( key <= 57)) {
                    isNavigationKey = true;
                	prevTabIndex = $scope.tabIndex;
                	$scope.tabIndex++;
                	var keyChar = String.fromCharCode(key);
                    $scope.dropDownTitleStr += keyChar;

                	$scope.searchNextItemTitle();
                    
                	//if we did not find item title - then start search from start of items list
                    if ($scope.tabIndex >= $scope.formElements.length) {
                    	$scope.tabIndex = 0;
                    	$scope.searchNextItemTitle();
                    	
                    	//if did not find item - revert index to previous value
                    	if ($scope.tabIndex >= $scope.formElements.length) {
                    		$scope.tabIndex = prevTabIndex;
                    	}
                    }
                    
                    //prevent loose focus it we select the same already active item
                    if ($scope.tabIndex === prevTabIndex) {
                    	prevTabIndex = -1;
                    }
                }

                if ( isNavigationKey === true ) {                     

                    e.preventDefault();
                    e.stopPropagation();                    

                    // set focus on the checkbox
                         $scope.formElements[ $scope.tabIndex ].focus();   
                         /************** A11y fix for checkbox checked.**************/
                                 $scope.bindCheckboxes(e.target);
                         /************** A11y fix for checkbox checked.**************/
                       
                    // css styling
                    var actEl = $scope.formElements[ $scope.tabIndex ];

                    if ( actEl.type.toUpperCase() === 'CHECKBOX' ) {                                                   
                        $scope.setFocusStyle( $scope.tabIndex );
                        $scope.removeFocusStyle( prevTabIndex );
                    }                    
                    else {
                        $scope.removeFocusStyle( prevTabIndex );
                        $scope.removeFocusStyle( helperItemsLength );
                        $scope.removeFocusStyle( $scope.formElements.length - 1 );
                    } 
                }

                isNavigationKey = false;
            };
            
            var timer = null;//initialize timer
            $scope.resetDropDownTitleStr = function(){
               if(timer != null) $timeout.cancel(timer);//make sure we don't have a timer running, if we do cancel to start over.
               
               timer = $timeout(function(){//Start timer to resech keyboard search string 
                    $scope.dropDownTitleStr = '';
                    },dropDownTitleTimer);
            };
            
            $scope.searchNextItemTitle = function() {
                $scope.resetDropDownTitleStr();     
                while (  $scope.tabIndex < $scope.formElements.length) {
                	var disabled = $scope.formElements[ $scope.tabIndex ].disabled;
                	var title = $($scope.formElements[$scope.tabIndex]).data('title');
                    if (!disabled && (title !== undefined) && (title.length>0) && (title.toUpperCase().substring(0,$scope.dropDownTitleStr.length) === $scope.dropDownTitleStr)) {
                        break;
                	}
                    $scope.tabIndex++;
                }
            }
            
            // set (add) CSS style on selected row
            $scope.setFocusStyle = function( tabIndex ) {    
                angular.element( $scope.formElements[ tabIndex ] ).parent().parent().parent().addClass( 'tk-multi-focus' );                        
            }

            // remove CSS style on selected row
            $scope.removeFocusStyle = function( tabIndex ) {
                angular.element( $scope.formElements[ tabIndex ] ).parent().parent().parent().removeClass( 'tk-multi-focus' );
            }

            ///////////////////////////////////////////////////////
            //
            // Logic starts here, initiated by watch 1 & watch 2.
            //
            ///////////////////////////////////////////////////////

            var tempStr = genRandomString( 5 );
            $scope.indexProperty = 'idx_' + tempStr;
            $scope.spacingProperty = 'spc_' + tempStr;         

            // watch1, for changes in input model property
            // updates multi-select when user select/deselect a single checkbox programatically
            // https://github.com/isteven/angular-multi-select/issues/8
            $scope.$watch( 'inputModel' , function( newVal ) {                                 
                if ( newVal ) {
                    $scope.refreshSelectedItems();                                   
                    $scope.refreshOutputModel();
                    $scope.refreshButton();                              
                    if ( $scope.clickedItem !== null ) {                        
                        $timeout( function() {
                            $scope.onItemClick( { data: $scope.clickedItem } );
                            $scope.clickedItem = null;                    
                        }, 0 );                                                 
                    }                                    
                }
            }, true);

            // watch2 for changes in input model as a whole
            // this on updates the multi-select when a user load a whole new input-model. We also update the $scope.backUp variable
            $scope.$watch( 'inputModel' , function( newVal ) {  
                if ( newVal ) {
                    $scope.backUp = angular.copy( $scope.inputModel );
                    $scope.updateFilter();
                    $scope.prepareGrouping();
                    $scope.prepareIndex();                                                
                    $scope.refreshSelectedItems();                                   
                    $scope.refreshOutputModel();                
                    $scope.refreshButton();                                                                                                                 
                }
            });            

            // watch for changes in directive state (disabled or enabled)
            $scope.$watch( 'isDisabled' , function( newVal ) {         
                $scope.isDisabled = newVal;                               
            });            

            // this is for touch enabled devices. We don't want to hide checkboxes on scroll. 
            angular.element( document ).bind( 'touchstart', function() { 
                $scope.$apply( function() {
                    $scope.scrolled = false;
                }); 
            });
            
            // also for touch enabled devices
            angular.element( document ).bind( 'touchmove', function() { 
                $scope.$apply( function() {
                    $scope.scrolled = true;                
                });
            });
            
            //listener to open dropdown on down key press event
            element.bind("keydown keypress", function (event) {
            	$scope.checkBoxLayer = element.children()[1];
            	var key = event.keyCode ? event.keyCode : event.which;
            	if ((key === 40)&&(!angular.element( $scope.checkBoxLayer ).hasClass( 'tk-multi-show' ))) {
                	$scope.toggleCheckboxes( event ); 
                	$scope.refreshSelectedItems(); 
                	$scope.refreshButton();
                	event.stopPropagation();
                	event.preventDefault();
                } else if ((event.testEvent !== undefined)||(event.testEvent === true)) {
                	$scope.keyboardListener(event);
                }
            });            
                    
        }   
    }
}]);


/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.component.uitkPanel',['uitk.component.uitkSlideAnimation','uitk.component.uitkNavigable','uitk.uitkUtility'])
.directive('uitkPanel', ["$compile", "uitkExceptionService", function($compile, uitkExceptionService){
	
	return {
		restrict : 'E',
		replace : true,
		scope : {
			model : '=',
            scope : '='
		},
		template: [
		           "<div class='tk-panl {{model.styleClass}}' id='{{model.id}}' ng-class='openStyle' ng-style=\"{'width': '{{model.panelWidth}}'}\" >",
		           "<div class='tk-panl-header {{model.headerClass}} tk-panl-header-w-actions' ng-click='togglePanel($event);generateUrl()'>",
		           		"<h2 ng-if='model.title && !model.titleH3'>",
			           		"<a ng-if='model.collapsible' class='tk-panl-helper' href='#' aria-expanded='{{model.open}}' aria-controls='{{model.id}}Content'>",
								"<uitk:icon-font ng-if='!model.open' icon='cux-icon-caret_right'></uitk:icon-font>",
								"<uitk:icon-font ng-if='model.open' icon='cux-icon-caret_down_centered'></uitk:icon-font>",
			           			"<span uitk-panel-compile-header='model.title'></span>",
			           		"</a>",
			           		"<span ng-if='!model.collapsible'><span uitk-panel-compile-header='model.title'></span></span>",
		           		"</h2>",
		           		"<h3 ng-if='model.title && model.titleH3'>",
			           		"<a ng-if='model.collapsible' class='tk-panl-helper' href='#' aria-expanded='{{model.open}}' aria-controls='{{model.id}}Content'>",
							"<uitk:icon-font ng-if='model.open' icon='cux-icon-caret_down_centered'></uitk:icon-font>",
							"<uitk:icon-font ng-if='!model.open' icon='cux-icon-caret_right'></uitk:icon-font>",
							"<span uitk-panel-compile-header='model.title'></span>",
			           		"</a>",
			           		"<span ng-if='!model.collapsible'><span uitk-panel-compile-header='model.title'></span></span>",
			           	"</h3>",
			           	"<ul ng-show='model.showActionLinks' ng-click='$event.stopPropagation();'>",
			           		"<li ng-repeat='link in model.links' class='liclass'>",
				           		"<a ng-hide='link.disabled' ng-href='{{link.url}}' ng-click='linkClick(link, $event);' uitk-navigable='true'>",
				           			"<span uitk-panel-compile-link-text='link'></span>",
								"</a>",
								"<span ng-hide='!link.disabled' aria-disabled='true' role='link' class='tk-panl-disabled-link {{link.iconClass}}'><span uitk-panel-compile-link-text='link'></span></span>",
			           		"</li>",
			           	"</ul>",
			       "</div>",
			       "<div uitk-slide-show='model.open' uitk-slide-show-duration='500' class='tk-panl-content-wrapper'>",
			       		"<div class='tk-panl-content {{model.contentClass}}' tabindex='-1' ng-class=\"{'tk-panl-content-overflow-auto':model.panelHeight || model.panels}\" ",
                        "ng-style=\"{'max-height':'{{model.panelHeight}}','width':'{{model.panelWidth}}'}\" id='{{model.id}}Content' >",
			       			"<div ng-if='!model.panels && model.lazyLoad' ng-include=\"model.url\" class='panelClass' ></div>",
                            "<ng-include ng-if='!model.panels && !model.lazyLoad' src=\"model.templateUrl\" class='panelClass' ></ng-include>",
			       			"<uitk-panel ng-repeat='panel in model.panels' model='panel' class='panelClass'>{{panel.title}}</uitk-panel>",
			       		"</div>",
			       "</div>",
			       "</div>"].join(""),			       
		controller: ['$scope', '$element', function ($scope) {

			/**
             * Toggles the panel open and close
             * 
             * @param event {object} DOM event object for click event
             */
			$scope.togglePanel = function(event) {
				if ($scope.model.collapsible === undefined || $scope.model.collapsible === false) 
					return;
				event.preventDefault();
				event.stopPropagation();
				$scope.model.open = !$scope.model.open;

			}
            /**
            * lazy load content,generate template url
            *
            * @param event {object} DOM event object for click event
            */
			$scope.generateUrl=function(){
                if($scope.model.lazyLoad){
                   $scope.model.url=$scope.model.templateUrl;
                }
            }
			/**
             * executes callback function for links 
             * 
             * @param link {object} object for clicked linked item
             * @param event {object} DOM event object for click event
             */
			$scope.linkClick = function(link){
				if(link.callBack){
					link.callBack.call();
				}
			}

		}],
		compile: function(tElement) {
			/**
             * Compile the panel template 
             */
			var contents = tElement.contents().remove();
			var compiledContents;
			return function($scope, iElement) {
				if(!compiledContents) {
					compiledContents = $compile(contents);
				}
				compiledContents($scope, function(clone) {
					iElement.append(clone);
				});

			/**
             * Throws EmptyModelException if model is not defined 
             */	
			if(!$scope.model){
                uitkExceptionService.throwException('EmptyModelException','Model is undefined');
	        }
			
			/**
             * Throws InvalidIdException if id is not defined 
             */
			if(!$scope.model.id){
                uitkExceptionService.throwException('InvalidIdException','Id is required attribute');
	        }
    	/**
             * Throws InvalidTitleException if title is not defined 
             */	
			if(!$scope.model.title){
                uitkExceptionService.throwException('InvalidTitleException','Title is required attribute');
	        }
			
			/**
             * Throws InvalidLinkTextException or InvalidLinkUrlException if link configuration is invalid 
             */	
			if($scope.model.links){
				_.forEach($scope.model.links, function(link){
					if(!link.text){
                        uitkExceptionService.throwException('InvalidLinkTextException','Link Text is required attribute');
					}
				});
			}

			
			if($scope.model.links && $scope.model.showActionLinks === undefined){
				$scope.model.showActionLinks = true;
			}

			if($scope.model.open === undefined){
				$scope.model.open = false;
			}
            if(($scope.model.lazyLoad === undefined) || ($scope.model.open && $scope.model.lazyLoad) ){
                $scope.model.lazyLoad = false;
            }

			if ($scope.model.collapsible === true) {
				if ($scope.model.open === true) {
					$scope.openStyle =  'tk-panl-open';
				} else {
					$scope.openStyle =  'tk-panl-closed';
				}
			} else {
				 var headerBlock = iElement[0].querySelector('.tk-panl-header');
				 if(headerBlock){
					 headerBlock.removeAttribute("ng-click");
				 }
			}
		;}
		
		}
	};
}])
.directive('uitkPanelCompileHeader', ["$compile", function ($compile) {
	  return function($scope, $element) {
		  $compile($scope.model.title)($scope, function(clone){
	    	if(!clone.selector) {
	    		$element.append(clone);
	    	} else {
	    		$element.append(clone.selector);
	    	}
	    });
	  };
}])
.directive('uitkPanelCompileLinkText', ["$compile", function ($compile) {
	  return function($scope, $element) {
		  $compile($scope.link.text)($scope, function(clone){
	    	if(!clone.selector) {
			  $element.append(clone);
	    	} else {
	    		$element.append(clone.selector);
	    	}
	    });
	  };
}]);

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
(function() {

    var uitkPhiConfirmation = function (uitkEvents, uitkTools) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                viewModel: "="
            },
            link: function (scope, element, attrs) {
                
                scope.componentId = uitkTools.ComponentId(attrs.id, 'PHIConfirmation');
                
                if(!scope.viewModel) {
                    scope.viewModel = {};
                }

                scope.viewModel.nestedData = scope.viewModel.nestedData || {};

                scope.viewModel.acknowledgeData = scope.viewModel.acknowledgeData || {};

                scope.viewModel.totalRecordsCount = scope.viewModel.totalRecordsCount || 0;
                scope.viewModel.isPHIVisible = scope.viewModel.isPHIVisible || false;
                scope.viewModel.showRecordCount = scope.viewModel.showRecordCount || false;
                scope.viewModel.showError = scope.viewModel.showError || false;
                scope.viewModel.isDisplayed = scope.viewModel.isDisplayed || false;
                scope.viewModel.isAcknowledged = scope.viewModel.isAcknowledged || false;
                scope.viewModel.isExportNestedChecked = scope.viewModel.isExportNestedChecked || false;

                scope.onOKClicked = function () {
                    scope.viewModel.isDisplayed = false;
                    uitkEvents.setScope(scope).emit('phiConfirmation', scope.componentId + '-OkClicked');
                };

                scope.onCancelClicked = function () {
                    scope.viewModel.isDisplayed = false;
                    uitkEvents.setScope(scope).emit('phiConfirmation', scope.componentId + '-Cancelled');
                };
            },
            templateUrl: function (element, attrs) {
                return attrs.templateUrl ||  "template/uitk-phi-confirmation.html";
            }
            
        }
    };

    uitkPhiConfirmation.$inject = ['uitkEvents', 'uitkTools'];

    angular.module('uitk.component.uitkPhiConfirmationDialog', [
        'uitk.component.uitkDialog',
        'uitk.component.uitkButton'
    ])
    .directive('uitkPhiConfirmation', uitkPhiConfirmation);
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.component.uitkPicklist',['uitk.component.uitkButton','uitk.component.uitkTooltip','uitk.component.uitkNavigable','uitk.uitkUtility'])
.directive('uitkPicklist', ["$timeout", "uitkLiveRegionService", function($timeout, uitkLiveRegionService){
	return {
		scope:{
			tkModal:'=',
			id: '@'
		},
		replace: true,
		controller:["$scope", function($scope){
			$scope.disableAddButton=true;
			$scope.disableAddAllButton=true;
			$scope.disableRemoveButton=true;
			$scope.disableRemoveAllButton=true;
			$scope.disableMoveUpButton=true;
			$scope.disableMoveDownButton=true;


            /**
             * Updates the disable flag for move up, move  down and remove buttons based on the selected state of the items present in the
             * selected list
             */
            $scope.updateMoveUpAndDownStatus = function(){
                var numberOfItemsSelected = 0;
                var lastSelectedIndex = -1;
                var firstSelectedIndex = -1;
                /*disable the move up and move down buttons by default*/
                $scope.disableMoveUpButton=true;
                $scope.disableMoveDownButton=true;
                for(var i=0 ; i<$scope.tkModal.selectedList.length; i++){
                    //Iterate the selectedList to identify the firstSelectedItem index and the lastSelectedItems index
                    if($scope.tkModal.selectedList[i].selected){
                        numberOfItemsSelected++;
                        if(firstSelectedIndex === -1){
                            firstSelectedIndex = i;
                        }
                        lastSelectedIndex = i;
                    }
                }

                if(numberOfItemsSelected > 0 ){
                    $scope.disableRemoveButton=false;
                    if((numberOfItemsSelected-1)===lastSelectedIndex){
                        $scope.disableMoveUpButton=true;
                    }else{
                        $scope.disableMoveUpButton=false;
                    }

                    if(numberOfItemsSelected===($scope.tkModal.selectedList.length - firstSelectedIndex)){
                        $scope.disableMoveDownButton=true;
                    }else{
                        $scope.disableMoveDownButton=false;
                    }
                }else{
                    $scope.disableRemoveButton=true;
                }
            }
			
			$scope.checkButtonsStatus = function(){
				$scope.disableAddButton = true;
				for(var i=0;i<$scope.tkModal.availableList.length;i++){
					if($scope.tkModal.availableList[i].selected){
						$scope.disableAddButton = false;
						break;
					} 
					
					if(i === $scope.tkModal.availableList.length-1){
						$scope.disableAddButton = true;
					}
				}
				if($scope.tkModal.availableList.length>0){
					$scope.disableAddAllButton =false;
				}else{
					$scope.disableAddAllButton = true;
				}
                
                $scope.updateMoveUpAndDownStatus();

                $scope.disableRemoveButton = true;
                for(var i=0;i<$scope.tkModal.selectedList.length;i++){
					if($scope.tkModal.selectedList[i].selected){
						$scope.disableRemoveButton = false;
						break;
					} 
					
					if(i === $scope.tkModal.selectedList.length-1){
						$scope.disableRemoveButton = true;
					}
				}
				
				if($scope.tkModal.selectedList.length>0){
					$scope.disableRemoveAllButton =false;
				}else{
					$scope.disableRemoveAllButton = true;
					$scope.disableMoveUpButton=true;
					$scope.disableMoveDownButton=true;
				}
			}
			
			$scope.checkButtonsStatus();
			
			$scope.$watch('[tkModal.availableList, tkModal.selectedList]', function() {
				$scope.checkButtonsStatus();
            }, true);
			
			$scope.selectDataInAvailableList = function(index,event){
				$scope.availableIndex = index;
                //Calculate the index of element with filtering
                var indexWithFiltering = -1;
                _.forEach($scope.tkModal.availableList, function (row) {
                    if (row.hide !== true) {
                        index--;
                    }
                    indexWithFiltering++;
                    if (index == -1) {
                        return false;
                    }
                });
				if(event.ctrlKey || !!$scope.tkModal.enableMultiRowSelection){
                    if ($scope.tkModal.availableList[indexWithFiltering].selected) {
                        $scope.tkModal.availableList[indexWithFiltering].selected = false;
					}else{
                        $scope.tkModal.availableList[indexWithFiltering].selected = true;
					}
				}else{
					$scope.tkModal.availableList.forEach(function(element){
						element.selected = false;
					});
                    $scope.tkModal.availableList[indexWithFiltering].selected = true;
				}

                $scope.tkModal.selectAllAvailableRows = $scope.tkModal.availableList.every(function(item){return item.selected==true});
				$scope.checkButtonsStatus();
				
			}
			
			$scope.selectDataInSelectedList = function(index,event){
				$scope.selectedIndex = index;
                //Calculate the index of element with filtering
                var indexWithFiltering = -1;
                _.forEach($scope.tkModal.selectedList, function (row) {
                    if (row.hide !== true) {
                        index--;
                    }
                    indexWithFiltering++;
                    if (index == -1) {
                        return false;
                    }
                });
				if(event.ctrlKey || !!$scope.tkModal.enableMultiRowSelection){
                    if ($scope.tkModal.selectedList[indexWithFiltering].selected) {
                        $scope.tkModal.selectedList[indexWithFiltering].selected = false;
					}else{
                        $scope.tkModal.selectedList[indexWithFiltering].selected = true;
					}
				}else{
					$scope.tkModal.selectedList.forEach(function(element){
						element.selected = false;
					});
                    $scope.tkModal.selectedList[indexWithFiltering].selected = true;
				}
                $scope.tkModal.selectAllSelectedRows = $scope.tkModal.selectedList.every(function(item){return item.selected==true});
				$scope.checkButtonsStatus();
			}

            /**
             * This function will be caleld on add/add all/remove and remove all button clicks, It should present the info for a11y purpose
             *
             */
            $scope.checkItemsList = function(selectedItems, movedItemFrom, movedItemTo) {
                if (movedItemFrom && movedItemTo) {
                    $timeout(function() {
                        if(selectedItems === 1){
                            uitkLiveRegionService.alertMessage(selectedItems + " item moved from " + movedItemFrom + " to " + movedItemTo);
                        }
                        else {
                            uitkLiveRegionService.alertMessage(selectedItems + " item's moved from " + movedItemFrom + " to " + movedItemTo);
                        }
                    }, 500);
                }
            }

            $scope.addValue = function (event) {
                $scope.tkModal.selectedItemsList=0;
				for(var i=0 ; i<$scope.tkModal.availableList.length; i++){
					if($scope.tkModal.availableList[i].selected && !$scope.tkModal.availableList[i].hide){
                        $scope.tkModal.selectedItemsList=$scope.tkModal.selectedItemsList+1;
						$scope.tkModal.availableList[i].selected=false;
						$scope.tkModal.selectedList.push($scope.tkModal.availableList[i]);
						$scope.tkModal.availableList.splice(i,1);
						i--;
					}
				}
				$scope.disableAddButton=true;
				$scope.disableRemoveAllButton=false;
				$scope.checkButtonsStatus();
				if($scope.tkModal.addButtonCallBack) {
					$scope.tkModal.addButtonCallBack();
				}
                $scope.tkModal.selectAllAvailableRows=false;
                $scope.tkModal.selectAllSelectedRows=false;
                $scope.tkModal.updateFilters(event);
                $scope.checkItemsList($scope.tkModal.selectedItemsList, $scope.tkModal.availableListTitle, $scope.tkModal.selectedListTitle);
			}

            $scope.addAll = function (event) {
                $scope.tkModal.selectedItemsList=0;
				for(var i=0 ; i<$scope.tkModal.availableList.length; i++){
                    $scope.tkModal.selectedItemsList=$scope.tkModal.selectedItemsList+1;
					$scope.tkModal.availableList[i].selected=false;
                    $scope.tkModal.availableList[i].hide = null;
					$scope.tkModal.selectedList.push($scope.tkModal.availableList[i]);
					$scope.tkModal.availableList.splice(i,1);
					i--;
				}
				$scope.disableAddButton=true;
				$scope.disableAddAllButton=true;
				$scope.disableRemoveAllButton=false;
				$scope.checkButtonsStatus();
				if($scope.tkModal.addAllButtonCallBack) {
					$scope.tkModal.addAllButtonCallBack();
				}
                $scope.tkModal.selectAllAvailableRows=false;
                $scope.tkModal.selectAllSelectedRows=false;
                $scope.tkModal.updateFilters(event);
                $scope.checkItemsList($scope.tkModal.selectedItemsList, $scope.tkModal.availableListTitle, $scope.tkModal.selectedListTitle);
            };

            $scope.removeValue = function (event) {
                $scope.tkModal.selectedItemsList=0;
				for(var i=0 ; i<$scope.tkModal.selectedList.length; i++){
					if($scope.tkModal.selectedList[i].selected && !$scope.tkModal.selectedList[i].hide){
                        $scope.tkModal.selectedItemsList=$scope.tkModal.selectedItemsList+1;
						$scope.tkModal.selectedList[i].selected=false;
						$scope.tkModal.availableList.push($scope.tkModal.selectedList[i]);
						$scope.tkModal.selectedList.splice(i,1);
						i--;
					}
				}
				$scope.disableRemoveButton=true;
				$scope.disableAddAllButton=false;
				$scope.disableMoveUpButton=true;
				$scope.disableMoveDownButton = true;
				$scope.checkButtonsStatus();
				if($scope.tkModal.removeButtonCallBack) {
					$scope.tkModal.removeButtonCallBack();
				}

                $scope.tkModal.updateFilters(event);
                $scope.tkModal.selectAllAvailableRows=false;
                $scope.tkModal.selectAllSelectedRows=false;
                $scope.checkItemsList($scope.tkModal.selectedItemsList, $scope.tkModal.selectedListTitle, $scope.tkModal.availableListTitle);
			}

            $scope.removeAll = function (event) {
                $scope.tkModal.selectedItemsList=0;
				for(var i=0 ; i<$scope.tkModal.selectedList.length; i++){
                    $scope.tkModal.selectedItemsList=$scope.tkModal.selectedItemsList+1;
					$scope.tkModal.selectedList[i].selected=false;
                    $scope.tkModal.selectedList[i].hide = null;
                    $scope.tkModal.availableList.push($scope.tkModal.selectedList[i]);
                    $scope.tkModal.selectedList.splice(i, 1);
                    i--;
				}
				$scope.disableRemoveButton=true;
				$scope.disableRemoveAllButton=true;
				$scope.disableAddAllButton=false;
				$scope.disableMoveUpButton=true;
				$scope.disableMoveDownButton = true;
				if($scope.tkModal.removeAllButtonCallBack) {
					$scope.tkModal.removeAllButtonCallBack();
				}
                $scope.tkModal.selectAllAvailableRows=false;
                $scope.tkModal.selectAllSelectedRows=false;
                $scope.tkModal.updateFilters(event);
                $scope.checkItemsList($scope.tkModal.selectedItemsList, $scope.tkModal.selectedListTitle, $scope.tkModal.availableListTitle);
			}
			
			$scope.moveUp = function(){
				var selectedIndex = -1;
                var numberOfPositionsMoved = -1;
                if($scope.tkModal.selectedList.length >0 && $scope.tkModal.selectedList[0].selected){
                    numberOfPositionsMoved++;
                }
				$scope.disableMoveDownButton=false;
				for(var i=1 ; i<$scope.tkModal.selectedList.length; i++){
					 if($scope.tkModal.selectedList[i].selected  && !$scope.tkModal.selectedList[i-1].selected){
						 $scope.tkModal.selectedList.splice(i-1,0,$scope.tkModal.selectedList.splice(i,1)[0]);
						 selectedIndex = i-1;
                         numberOfPositionsMoved++;
					 }
				}
				if(selectedIndex === 0 || (numberOfPositionsMoved == selectedIndex) ){
					 $scope.disableMoveUpButton=true;
				}
			}
			
			$scope.moveDown = function(){
				var selectedIndex = -1;
                var numberOfPositionsMoved = -1;
                if($scope.tkModal.selectedList.length >0 && $scope.tkModal.selectedList[$scope.tkModal.selectedList.length-1].selected){
                    numberOfPositionsMoved++;
                }
				$scope.disableMoveUpButton=false;
				for(var i=$scope.tkModal.selectedList.length-2 ; i>=0; i--){
					 if($scope.tkModal.selectedList[i].selected && !$scope.tkModal.selectedList[i+1].selected){
						 $scope.tkModal.selectedList.splice(i+1,0,$scope.tkModal.selectedList.splice(i,1)[0]);
						 selectedIndex = i+1;
                         numberOfPositionsMoved++;
					 }
				}

                 if(selectedIndex === $scope.tkModal.selectedList.length-(numberOfPositionsMoved+1)){
                     $scope.disableMoveDownButton = true;
                 }
			}
			
			$scope.applyHoverState = function(event){
				angular.element(event.currentTarget.parentElement).addClass("tk-pick-hover-state");
			}
			
			$scope.removeHoverState = function(event){
				angular.element(event.currentTarget.parentElement).removeClass("tk-pick-hover-state");			
			}
			
			$scope.applyActiveState = function(event){
				angular.element(event.currentTarget.parentElement).addClass("tk-pick-active-state");
			}
			
			$scope.removeActiveState = function(event){
				angular.element(event.currentTarget.parentElement).removeClass("tk-pick-active-state");			
			}

			$scope.setFocusInAvailable = function(event){              
                if($scope.tkModal.enableMultiRowSelection){
                    if(event.keyCode === 13){
                        //on press of enter key in the table, first item should be selected.
                        angular.element(event.currentTarget).find(":checkbox")[1].focus();
                    }
                }
                else //selection of items with up/down arrow should only happen for main picklist, not enhanced picklist
                {
                    if($scope.availableIndex === undefined && (event.keyCode === 13 || event.keyCode === 40)){
                        $scope.selectDataInAvailableList(0,event);
                        event.preventDefault();
                    }
                    else if($scope.availableIndex >= 0 && $scope.availableIndex < $scope.tkModal.availableList.length-1 && event.keyCode === 40){
                        $scope.selectDataInAvailableList($scope.availableIndex+1,event);
                        event.preventDefault();
                    }
                    else if($scope.availableIndex > 0 && $scope.availableIndex <= $scope.tkModal.availableList.length && event.keyCode === 38){
                        $scope.selectDataInAvailableList($scope.availableIndex-1,event);
                        event.preventDefault();
                    }
                }
			}
			
			$scope.setFocusInSelected = function(event){
				if($scope.tkModal.enableMultiRowSelection){
                    if(event.keyCode === 13){
                        //on press of enter key in the table, first item should be selected.
                        angular.element(event.currentTarget).find(":checkbox")[1].focus();
                    }
                }
                else {  //selection of items with up/down arrow should only happen for main picklist, not enhanced picklist
                    if($scope.selectedIndex === undefined && (event.keyCode === 13 || event.keyCode === 40) ){
                        $scope.setTabIndex = true;
                        $scope.selectDataInSelectedList(0,event);
                        event.preventDefault();
                    }
                    else if($scope.selectedIndex >= 0 && $scope.selectedIndex < $scope.tkModal.selectedList.length-1 && event.keyCode === 40){
                        $scope.selectDataInSelectedList($scope.selectedIndex+1,event);
                        event.preventDefault();
                    }
                    else if($scope.selectedIndex > 0 && $scope.selectedIndex <= $scope.tkModal.selectedList.length && event.keyCode === 38){
                        $scope.selectDataInSelectedList($scope.selectedIndex-1,event);
                        event.preventDefault();
                    }
                }
			}

            /*
                Triggered when checkbox is in focus to highlight entire row.
                Usage: <input type='checkbox' ng-focus='showCurrentRowInFocus($event)' />
             */
            $scope.showCurrentRowInFocus = function(event){
                angular.element(event.target.parentElement.parentElement.parentElement).addClass("tk-pick-hover-state");
            }

            /*
                Triggered when checkbox loses focus to remove highlights from the current row.
                Usage: <input type='checkbox' ng-blur='removeCurrentRowFromFocus($event)' />
             */
            $scope.removeCurrentRowFromFocus = function(event){
                angular.element(event.target.parentElement.parentElement.parentElement).removeClass("tk-pick-hover-state");
            }
		}],
        link: function (scope) {
            //TODO: we need to make this dynamic so we can handle any locale/format, not just mm/dd/yyyy
            //use date.toLocaleString('en-US') to set the local for what is passed in
            scope.transformDate = function(date) {
                var day, month;
                day = date.getDate() <= '9' ? ('0' + date.getDate()) : date.getDate();
                month = (date.getMonth()+1) <= '9' ? ('0' + (date.getMonth()+1)) : (date.getMonth()+1);
                date = month + '/' + day + '/' + date.getFullYear();
                return date;
            }

            //To give backward compatibility
            if (scope.tkModal.columns === undefined) {
                scope.tkModal.columns = [];
                if (scope.tkModal.field1) {
                    scope.tkModal.columns.push({
                        label: scope.tkModal.field1DisplayName || 'Available',
                        cellTemplate: '<span ng-bind="::record.' + scope.tkModal.field1 + '"></span>'
                    });
                }
                if (scope.tkModal.field2) {
                    scope.tkModal.columns.push({
                        label: scope.tkModal.field2DisplayName || 'Selected',
                        cellTemplate: '<span ng-bind="::record.' + scope.tkModal.field2 + '"></span>'
                    });
                }
            }
            if(scope.tkModal.renderAddAllButton === undefined){
                scope.tkModal.renderAddAllButton = true;
            }
            if(scope.tkModal.renderRemoveAllButton === undefined){
                scope.tkModal.renderRemoveAllButton = true;
            }
            scope.tkModal.__init__ = _.cloneDeep(scope.tkModal);

            /*
             * Check and assign enableSearch to each column
             */
            if (scope.tkModal.enableSearch) {
                _.forEach(scope.tkModal.columns, function (column) {
                    if (column.enableSearch !== false) {
                        column.enableSearch = true;
                    }
                });
            }

            /*
             * Check and assign enableSort to each column
             */
            if (scope.tkModal.enableSort) {
                _.forEach(scope.tkModal.columns, function (column) {
                    if (column.enableSort !== false) {
                        column.enableSort = true;
                    }
                    if (column.sortOrderAvailable === undefined) {
                        column.sortOrderAvailable = 0;
                    }
                    if (column.sortOrderSelected === undefined) {
                        column.sortOrderSelected = 0;
                    }
                    if(column.sortOrderAvailable && column.sortOrderAvailable === 1) {
                        scope.originalSortColumnAvailable = column.id;
                    }
                    if(column.sortOrderSelected && column.sortOrderSelected === 1) {
                        scope.originalSortColumnSelected = column.id;
                    }
                });
            }

            /**
             * Function: calls all table functions and assigns all options: search  and sorting
             * @returns {object} {}
             */




            scope.tkModal.getQueryForAllConditions = function (columnIndex, itemFilter, listType) {
                var filteredCondition = {
                    searchAvailable: [],
                    searchSelected: [],
                    sortAvailable: {},
                    sortSelected: {}
                };

                _.forEach(scope.tkModal.columns, function (column) {
                    if (!_.isUndefined(column.searchInputAvailable)) {
                        filteredCondition.searchAvailable.push({'id': column.id, 'input': column.searchInputAvailable, 'label': column.label});
                        if(itemFilter && listType[0] === 'availableList') {
                            scope.searchInput = scope.tkModal.columns[columnIndex].searchInputAvailable;
                            scope.searchInputLabel = scope.tkModal.columns[columnIndex].label;
                        };
                    }
                    if (!_.isUndefined(column.searchInputSelected)) {
                        filteredCondition.searchSelected.push({'id': column.id, 'input': column.searchInputSelected, 'label': column.label});
                        if(itemFilter && listType[0] === 'selectedList') {
                            scope.searchInput = scope.tkModal.columns[columnIndex].searchInputSelected;
                            scope.searchInputLabel = scope.tkModal.columns[columnIndex].label;
                        }
                    }
                    if (column.sortOrderAvailable !== 0) {
                        filteredCondition.sortAvailable = {
                            'id': column.id,
                            'order': column.sortOrderAvailable
                        };
                    }
                    if (column.sortOrderSelected !== 0) {
                        filteredCondition.sortSelected = {
                            'id': column.id,
                            'order': column.sortOrderSelected
                        };
                    }
                });
                return filteredCondition;
            };

            /**
             * This function will be caleld on add/add all/remove and remove all button clicks, It should update data with latest filtering condition
             * @param event object
             */
            scope.tkModal.updateFilters = function (event) {
                scope.tkModal.onChange(event, scope.tkModal.getQueryForAllConditions(), ["availableList", "selectedList"]);
            };



            /**
             * This function is used to apply filtering on data
             *
             * @param event object
             * @param listType, type of list for which this function is invoked (valid type: availableList or selectedList)
             */
            scope.tkModal.onSearch = scope.tkModal.onSearch || function (event, listType,index) {
                scope.tkModal.onChange(event, scope.tkModal.getQueryForAllConditions(index, true, listType), listType);
                $timeout(function(){
                    if(listType[0] === 'selectedList'){
                        uitkLiveRegionService.alertMessage("Filtered for " + scope.searchInput + " under " + scope.searchInputLabel + ". " + scope.getItemCount(listType[0]) + ' items in table');
                    }
                    if(listType[0] === 'availableList'){
                        uitkLiveRegionService.alertMessage("Filtered for " + scope.searchInput + " under " + scope.searchInputLabel + ". " + scope.getItemCount(listType[0]) + ' items in table');
                    }
                }, 500);
            };

            /**
             * This function is used to clear/reset all filtering and sorting within the Available and Selected lists
             */
            scope.tkModal.clearAllFilters = scope.tkModal.clearAllFilters || function () {
                    _.forEach(scope.tkModal.columns, function (row, idx) {
                        // clear out the filtering input boxes
                        row.searchInputAvailable = '';
                        row.searchInputSelected = '';

                        // reset the column's original sort options from the viewModel if they exist
                        scope.originalSortColumnAvailable === row.id ? row.sortOrderAvailable = 1 : row.sortOrderAvailable = 0;
                        scope.originalSortColumnSelected === row.id ? row.sortOrderSelected = 1 : row.sortOrderSelected = 0;
                    });

                    // resets the available list to be the full list again, with no filtering applied
                    _.forEach(scope.tkModal.availableList, function (row) {
                        row.selected = false;
                        row.hide = null;
                    });

                    // resets the selected list to be the full list again, with no filtering applied
                    _.forEach(scope.tkModal.selectedList, function (row) {
                        row.selected = false;
                        row.hide = null;
                    });

                    // resets all lists to be sorted based on the original sort options from the viewModel
                    scope.tkModal.availableList = _.sortBy(scope.tkModal.availableList, scope.originalSortColumnAvailable);
                    scope.tkModal.selectedList = _.sortBy(scope.tkModal.selectedList, scope.originalSortColumnSelected);

                    // resets the select all checkboxes
                    scope.tkModal.selectAllAvailableRows = false;
                    scope.tkModal.selectAllSelectedRows = false;
            };

            /**
             * This function is used to apply sorting on data
             *
             * @param event object
             * @param listType, type of list for which this function is invoked (valid type: availableList or selectedList)
             * @param column, column object on which sorting is performed
             */
            scope.tkModal.onSort = scope.tkModal.onSort || function (event, listType, column) {
                _.forEach(scope.tkModal.columns, function (col) {
                    if (col.id != column.id) {
                        col[listType[0] == 'availableList' ? 'sortOrderAvailable' : 'sortOrderSelected'] = 0;
                    }
                    else {
                        col[listType[0] == 'availableList' ? 'sortOrderAvailable' : 'sortOrderSelected'] = column[listType == 'availableList' ? 'sortOrderAvailable' : 'sortOrderSelected'] == 1 ? -1 : 1;
                    }
                });
                var alertMesg = column.label +' '+((scope.sortOrderEqualTo(column,1,listType))?'sorted ascending':((scope.sortOrderEqualTo(column,-1,listType))?'sorted descending':'Sortable'));
                uitkLiveRegionService.alertMessage(alertMesg);
                scope.tkModal.onChange(event, scope.tkModal.getQueryForAllConditions(), listType);
            }

            /**
             *@param event Event object
             * @param listType, type of list for which this function is invoked (valid type: availableList or selectedList)
             * @type {onSelectAllRows|Function|$scope.model.onSelectAllRows|.model.onSelectAllRows}
             */
            scope.tkModal.onSelectAllRows = scope.tkModal.onSelectAllRows || function(event,listType){
                if(_.contains(listType,'availableList')){
                    _.forEach(scope.tkModal.availableList, function (row) {
                        row.selected = scope.tkModal.selectAllAvailableRows;
                    });
                }else if(_.contains(listType,'selectedList')){
                    _.forEach(scope.tkModal.selectedList, function (row) {
                        row.selected = scope.tkModal.selectAllSelectedRows;
                    });
                }
            }

            /**
             * This function is will be called on change of any filtering condition
             *
             * @param event Event object
             * @param filterCondition, it contains condition of searching & sorting
             * @param listType, type of list for which this function is invoked (valid type: availableList or selectedList)
             */



            scope.tkModal.onChange = scope.tkModal.onChange || function (event, filterCondition, listType) {
                if (_.contains(listType, 'availableList') && filterCondition.searchAvailable && filterCondition.searchAvailable.length > 0) {
                    scope.tkModal.selectAllAvailableRows=false;
                    _.forEach(scope.tkModal.availableList, function (row) {
                        row.selected = false;
                        row.hide = null;
                    });
                    filterCondition.searchAvailable.forEach(function (searchColumn) {
                        _.forEach(scope.tkModal.availableList, function (record) {
                            // checking for numbers and converting to strings so we can match on search criteria
                            if(typeof record[searchColumn.id] === 'number') {
                                record[searchColumn.id] = record[searchColumn.id].toString();
                                searchColumn.input = searchColumn.input.toString();

                                if (!_.includes(record[searchColumn.id], searchColumn.input)) {
                                    record.hide = true;
                                }
                                // converting strings back into numbers so sorting will sort correctly
                                record[searchColumn.id] = parseInt(record[searchColumn.id]);
                            } else {
                                if (!_.includes(record[searchColumn.id].toLowerCase(), searchColumn.input.toLowerCase())) {
                                    record.hide = true;
                                }
                            }

                        });

                    });
                    scope.disableAddButton = true;
                }

                // =========================
                // sort in available list
                // =========================
                if (_.contains(listType, 'availableList') && filterCondition.sortAvailable && filterCondition.sortAvailable.id) {
                    scope.tkModal.selectAllAvailableRows=false;

                    // array to keep original date format from string
                    var tempDatesArray = [];

                    //  Iterate the available list and parse date, also hold value to replace back after sorting
                    _.forEach(scope.tkModal.availableList, function (record) {
                        if ( typeof record[filterCondition.sortAvailable.id] !== 'number' ) {
                            var date = new Date(record[filterCondition.sortAvailable.id]);
                            if ( date.toLocaleString() !== 'Invalid Date') {
                                tempDatesArray.push(angular.copy(record[filterCondition.sortAvailable.id])); // holds values of the date in original string format
                                record[filterCondition.sortAvailable.id] = date.toISOString();
                            }
                        }
                    });

                    scope.tkModal.availableList = _.sortBy(scope.tkModal.availableList, filterCondition.sortAvailable.id);

                    // Set date to original string value passed in
                    _.forEach(scope.tkModal.availableList, function (record) {
                        if ( typeof record[filterCondition.sortAvailable.id] !== 'number' ) {
                            //TODO: when we make the transformDate function dynamic, change this to make sure it accept the correct date format as well
                            var date = new Date(record[filterCondition.sortAvailable.id]);
                            if ( date.toLocaleString() !== 'Invalid Date') {
                                _.forEach(tempDatesArray, function (dateItem) { // loop through all original date string format
                                    var dateToCheck = new Date(dateItem);
                                    if (date.toISOString() === dateToCheck.toISOString()) { // if value in array is the date, replace it with original value
                                        record[filterCondition.sortAvailable.id] = dateItem;
                                    }
                                })
                            }
                        }
                    });

                    scope.tkModal.availableList = filterCondition.sortAvailable.order === -1 ? scope.tkModal.availableList.reverse() : scope.tkModal.availableList;
                }

                // =========================
                // search in selected list
                // =========================
                if (_.contains(listType, 'selectedList') && filterCondition.searchSelected && filterCondition.searchSelected.length > 0) {
                    scope.tkModal.selectAllSelectedRows=false;
                    _.forEach(scope.tkModal.selectedList, function (row) {
                        row.selected = false;
                        row.hide = null;
                    });
                    filterCondition.searchSelected.forEach(function (searchColumn) {
                        _.forEach(scope.tkModal.selectedList, function (record) {
                            // checking for numbers and converting to strings so we can match on search criteria
                            if(typeof record[searchColumn.id] === 'number') {
                                record[searchColumn.id] = record[searchColumn.id].toString();
                                searchColumn.input = searchColumn.input.toString();

                                if (!_.includes(record[searchColumn.id].toLowerCase(), searchColumn.input.toLowerCase())) {
                                    record.hide = true;
                                }

                                // converting strings back into numbers so sorting will sort correctly
                                record[searchColumn.id] = parseInt(record[searchColumn.id]);
                            } else {
                                if (!_.includes(record[searchColumn.id].toLowerCase(), searchColumn.input.toLowerCase())) {
                                    record.hide = true;
                                }
                            }

                        });
                    });
                    scope.disableRemoveButton = true;
                }

                // =========================
                // sort selected list
                // =========================
                if (_.contains(listType, 'selectedList') && filterCondition.sortSelected && filterCondition.sortSelected.id) {
                    scope.tkModal.selectAllSelectedRows=false;

                    // array to keep original date format from string
                    var tempDatesArray = [];

                    //  Iterate the selected list and parse date
                    //  Convert date to ISO format
                    _.forEach(scope.tkModal.selectedList, function (record) {
                        if ( typeof record[filterCondition.sortSelected.id] !== 'number' ) {
                            var date = new Date(record[filterCondition.sortSelected.id]);
                            if ( date.toLocaleString() !== 'Invalid Date') {
                                tempDatesArray.push(angular.copy(record[filterCondition.sortSelected.id])); // holds values of the date in original string format
                                record[filterCondition.sortSelected.id] = date.toISOString();
                            }
                        }
                    });

                    scope.tkModal.selectedList = _.sortBy(scope.tkModal.selectedList, filterCondition.sortSelected.id);

                    // Format date to locale string
                    _.forEach(scope.tkModal.selectedList, function (record) {
                        if ( typeof record[filterCondition.sortSelected.id] !== 'number' ) {
                            //TODO: when we make the transformDate function dynamic, change this to make sure it accept the correct date format as well
                            var date = new Date(record[filterCondition.sortSelected.id]);
                            if ( date.toLocaleString() !== 'Invalid Date') {

                                _.forEach(tempDatesArray, function (dateItem) { // loop through all original date string format
                                    var dateToCheck = new Date(dateItem);
                                    if (date.toISOString() === dateToCheck.toISOString()) { // if value in array is the date, replace it with original value
                                        record[filterCondition.sortSelected.id] = dateItem;
                                    }
                                })

                                // date = scope.transformDate(date);
                                // record[filterCondition.sortSelected.id] = date.toString();
                            }
                        }
                    });

                    scope.tkModal.selectedList = filterCondition.sortSelected.order === -1 ? scope.tkModal.selectedList.reverse() : scope.tkModal.selectedList;
                }
            };

            scope.tkModal.updateFilters();

            scope.isColumnSortable = function (column) {
                return column.enableSort === true;
            };

            scope.sortOrderEqualTo = function (column, order, listType) {
                var fieldName;
                if (listType == 'availableList') {
                    fieldName = 'sortOrderAvailable'
                }
                else {
                    fieldName = 'sortOrderSelected'
                }
                switch (order) {
                    case 1:
                        return column[fieldName] === order;
                    case -1:
                        return column[fieldName] === order;
                    case 0:
                        return column[fieldName] === order;
                }
            };

            scope.getItemCount = function (listType) {
                return _.reduce(scope.tkModal[listType], function (itemCount, value) {
                    itemCount = itemCount + (value.hide !== true ? 1 : 0);
                    return itemCount;
                }, 0);
            }
        },
        templateUrl: function (element, attrs) {
            return attrs.templateUrl || 'template/uitk-picklist.html';
        }
	}

}])
/**
 * compile cell template
 * @param $compile
 * @returns {Function}
 */
.directive("uitkCompilePicklistCellTemplate", ['$compile', function ($compile) {
    var compiledTemplate = _.memoize(function (value) {
        return $compile(value);
    });

    return function ($scope, $element, $attrs) {
        compiledTemplate($scope.column.cellTemplate)($scope, function (clone) {
            $element.append(clone);
        });
    };
}]);
/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
(function () {
    var uitkPrimaryNavigation = function ($compile, $document, $timeout, $sce, $window, uitkExceptionService, uitkMenuModel) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                model: '=',
                focusItem: '='
            },
            controller: ["$scope", function ($scope) {
                uitkMenuModel.setLevel($scope);
                if($scope.model.level===1)
                    uitkMenuModel.initializeParents($scope.model, undefined);
                $scope.isHorizontal = true;

                uitkMenuModel.initializeController($scope);
                uitkMenuModel.initializeVisibility($scope);
                uitkMenuModel.initializeHoverSlider($scope);

                $scope.expandMenuOrRedirectToLink = uitkMenuModel.getClickHandler($scope);
                $scope.hideParentMenu = uitkMenuModel.hideParentMenu.bind($scope);
                $scope.isExpanded = uitkMenuModel.isExpanded;

                if ($scope.model.level > 1 && $scope.focusItem) {
                    $scope.focusItem.focusMe = false;
                }

                if($scope.model.level === 1 && !angular.isDefined($scope.model.useStripOnMobile)) {
                    $scope.model.useStripOnMobile = true;
                }

                uitkMenuModel.ValidateModelId($scope.model, uitkExceptionService);
                uitkMenuModel.CheckForBothUrlAndDropdown($scope.model, uitkExceptionService);

                $scope.getTrustedTextTemplate = function (item) {
                    return $sce.trustAsHtml(item.textTemplate);
                };
            }],
            link: function (scope, iElement) {
                uitkMenuModel.initializeSetFocus(scope, iElement, true);
                scope.checkMenuPosition = uitkMenuModel.checkMenuPosition(scope, iElement);
                scope.rootMenu = uitkMenuModel.getRootMenuScopeFromChildScope(scope);

                // Reconfigure the top level menu on resize of the window
                angular.element($window).bind('resize', uitkMenuModel.getResizer(scope, iElement));
                $timeout(function() {
                    angular.element(document).ready(function() { uitkMenuModel.getResizer(scope, iElement)(); });
                });
                
            },
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || 'template/uitk-primary-navigation.html';
            }
        };
    };

    var applyParentFocus = function () {
        return {
            link: function (scope, element) {
                if (scope.item) {
                    scope.$watch('item.focusMe', function (a, b) {
                        if (scope.item.focusMe) {
                            element.focus();
                            scope.item.focusMe = false;
                        }
                    })
                }
            }
        }
    };

    var compileLink = function($compile) {
        return function ($scope, $element) {
            $compile($scope.item.textTemplate)($scope, function (clone) {
                if (!clone.selector) {
                    $element.prepend(clone);
                } else {
                    $element.prepend(clone.selector);
                }
            });
        };
    }

    uitkPrimaryNavigation.$inject = ['$compile', '$document', '$timeout', '$sce', '$window', 'uitkExceptionService', 'uitkMenuModel'];
    compileLink.$inject = ['$compile'];

    angular.module('uitk.component.uitkPrimaryNavigation', ['uitk.component.uitkSlideAnimation', 'uitk.component.uitkNavigable', 'uitk.uitkUtility', 'uitk.Models'])
        .directive('uitkPrimaryNavigation', uitkPrimaryNavigation)
        .directive('applyParentFocus', applyParentFocus)
        .directive('uitkPrimaryNavCompileLink', compileLink);

})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.15.0
 */
angular.module('uitk.component.uitkProgressBar', ['uitk.component.uitkNavigable', 'uitk.uitkUtility'])
.directive('uitkProgressBar', function () {

    function link(scope) {

        if (scope.model.id === undefined || scope.model.id === '')
            scope.model.id = 'progressBar_' + randomId(6);

        function randomId(length) {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

            if (!length) {
                length = Math.floor(Math.random() * chars.length);
            }

            var str = '';
            for (var i = 0; i < length; i++) {
                str += chars[Math.floor(Math.random() * chars.length)];
            }
            return str;
        }
    }

    return {
        restrict: 'E',
        replace: true,
        scope: {
            model: '='
        },
        template: [
                    '<div class="oui-prog" ng-hide="model.progress==100 || model.progress==0">',
                    '   <div class="oui-prog-top-line"> ',
                    '       <div role="application">',
                    '           <div uitk-navigable class="oui-prog-bar oui-width-11t" ng-class=" model.progress && model.progress > 0 ? \'oui-prog-bar-progress-\' + (model.progress < 10 ? \'0\' + model.progress : model.progress ) : \'oui-prog-bar-progress-00\' "  role="progressbar" aria-labelledby="{{model.id}}" ng-attr-aria-valuenow="{{model.progress}}" aria-valuemin="0" aria-valuemax="100" >',
                    '               <div id="{{model.id}}" class="oui-a11y-hidden">Search Progress</div>',
                    '               <div class="oui-prog-bar-progress"></div>',
                    '           </div>',
                    '       </div>',
                    '       <span ng-if="model.showProgressInPercentage" class="oui-prog-bar-percentage">{{model.progress}}%</span>',
                    '       <a href="" ng-click="model.onCancel(); model.progress = 0;" class="oui-prog-cancel" ng-if="model.showCancelLink">',
                    '           <uitk:icon-font icon="cux-icon-close"></uitk:icon-font>{{"Cancel" | uitkTranslate}}',
                    '       </a>',
                    '   </div>',
                    '   <div class="oui-prog-information" ng-if="model.progress > 0 && model.progress < 100">',
                    '       <span class="oui-prog-status" ng-if="model.showProgressText">{{"Searching" | uitkTranslate}}</span>',
                    '       <span class="oui-prog-info" ng-if="model.infoText" id="progressBarInfo-{{model.id}}"> {{ model.infoText }} </span>',
                    '   </div>',
                    '</div>'
        ].join(''),
        link: link
    }
});

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
(function() {

    /**
     * Primary directive for the pie chart component.
     *
     */
    angular.module('uitk.component.uitkPieChart', [])
        .directive('uitkPieChart', ["dialogService", function(dialogService) {
            return {
                restrict: 'E',
                scope: {
                    viewModel: '='
                },
                link: function(scope) {

                    /**
                     * Show the simple data dialog for this chart
                     */

                    scope.isOpened = dialogService;

                    scope.contentKeyupHandler = function() {
                        scope.showMe = true;
                    };

                    /**
                     * Hide the simple data dialog for this chart
                     */
                    scope.callBackHideDialog = function() {
                        scope.showMe = false;
                        scope.isOpened.dialogOpened=false;
                    };

                    scope.radius = Math.min(scope.viewModel.width, scope.viewModel.height) / 2;
                    scope.arc = d3.svg.arc().innerRadius(-60).outerRadius(scope.radius);

                    scope.label_x1 = function(d, i) {
                        return -scope.arc.centroid(d)[0];
                    };

                    scope.label_y1 = function(d, i) {
                        return -scope.arc.centroid(d)[1];
                    };

                    scope.label_x2 = function(d, i) {
                        var centroid,midAngle;
                        centroid = scope.arc.centroid(d);
                        midAngle = Math.atan2(centroid[1], centroid[0]);
                        var x = Math.cos(midAngle) * -15;
                        return x;
                    };

                    scope.label_y2 = function(d, i) {
                        var centroid,midAngle;
                        centroid = scope.arc.centroid(d);
                        midAngle = Math.atan2(centroid[1], centroid[0]);
                        var y = Math.sin(midAngle) * -15;
                        return y;
                    };

                    scope.configureGraph = function() {
                        var chart = nv.models.pieChart();
                        chart.x(function(d) { return d.label; });
                        chart.y(function(d) { return d.value; });
                        chart.showLabels(scope.viewModel.showLabels);
                        chart.labelsOutside(true);
                        chart.donut(scope.viewModel.donut);
                        chart.donutRatio(0.4);
                        chart.labelThreshold(0.0);
                        chart.showLegend(scope.viewModel.showLegend);

                        var labels;

                        chart.color(function(d) {
                            return d.color;
                        });

                        chart.tooltip.enabled(scope.viewModel.tooltips);

                        //Any additional options if user would like to set
                        if(typeof scope.viewModel.chartOptions === 'function'){
                            scope.viewModel.chartOptions(chart);
                        }

                        //Invoke d3 with chart options and data
                        var svg = d3.select("#" + scope.viewModel.id + " svg");
                        svg.attr('height', scope.viewModel.height);
                        svg.attr('style', 'height:' + scope.viewModel.height + 'px');
                        svg.attr('width', scope.viewModel.width || '100%');
                        svg.datum(scope.viewModel.data[0].values);

                        svg.call(chart);

                        if (scope.viewModel.optionalLine) {
                            chart.legend.updateState(false);
                            labels = d3.selectAll('.nv-label');
                            labels.append('line').attr({
                                x1: scope.label_x1,
                                y1: scope.label_y1,
                                x2: scope.label_x2,
                                y2: scope.label_y2,
                                stroke: '#000',
                                class: "label-line"
                            });
                        }


                        nv.utils.windowResize(chart.update);

                        return chart;
                    };

                    nv.addGraph(scope.configureGraph);
                },
                templateUrl: 'template/uitkPieChartTemplate.html'
            };
        }]);
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */

var radioGroupApp = angular.module('uitk.component.uitkRadioGroup', ['uitk.uitkUtility', 'pascalprecht.translate']);
radioGroupApp
    .directive('uitkRadio', ["$compile", function ($compile) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                itemList: '=',
                groupName: '@',
                modelValue: '=',
                tkDescribedby: '@',
                tkLabelledby: '@',
                onRadioChange: '&onChange'
            },
            transclude: true,
            template: "<div><div role='group' ng-attr-aria-describedby={{tkDescribedby}} ng-attr-aria-labelledby={{tkLabelledby}}>" +
            "<ul class='tk-form-radio'>" +
            "<li ng-repeat='item in itemList' class='template-list-item'>" +
            "<input type='radio' id='{{groupName + $index }}' ng-change='onRadioChange();'  name='{{groupName}}' ng-model='$parent.modelValue'" +
            "ng-disabled='item.disabled'   ng-attr-aria-disabled='{{item.disabled?true:undefined}}' ng-value='{{$index}}'/> " +
            "<label for='{{groupName + $index }}' tabindex='-1'>{{item.label | translate}}</label>" +
            "</li>" +
            "</ul></div></div>",
            link: function (scope, element, attrs, ctrl, transclude) {
                if (scope.itemList == undefined) {
                    var radioContents = transclude().filter(function (index, el) { return el.localName == "uitk:radio-content"; });
                    for (var i = 0; i < radioContents.length; i++) {
                        var tempTemplate = angular.element("<li class='template-list-item'>" +
                            "<input class='compiled-list-item' type='radio' id='{{groupName}}" + i + "' ng-change='onRadioChange();'  name='{{groupName}}' ng-model='modelValue'" +
                            "ng-disabled='" + ($(radioContents[i]).attr('uitk-disabled') == "true" ? true : false) + "' ng-attr-aria-disabled='" + ($(radioContents[i]).attr('disabled') == true ? true : false) + "' ng-value='{{" + i + "}}'/> " +
                            "<label for='{{groupName}}" + i + "'>" + $(radioContents[i]).attr('tk-label') + "</label>" +
                            "</li>");
                        tempTemplate = $compile(tempTemplate)(scope);
                        tempTemplate.find('label').parent().append(radioContents[i]);
                        element.find('ul').append(tempTemplate);
                    }
                }
            }
        };
    }])
    .directive('uitkRadioContent', function () {
        return {
            restrict: 'AE'
            //todo: replace html tag uitk-radio-content with a template here that contain div.
        };
    });

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
(function () {
    var uitkSecondaryNavigation = function ($compile, $document, $timeout, $filter, uitkExceptionService, $window, $sce, uitkMenuModel) {
        return {
            restrict: 'E',
            replace: true,
            transclude: false,
            scope: {
                model: '=',
                focusItem: '='
            },
            controller: ["$scope", function controller($scope) {
                uitkMenuModel.setLevel($scope);
                if($scope.model.level===1)
                    uitkMenuModel.initializeParents($scope.model, undefined);
                $scope.isHorizontal = true;

                uitkMenuModel.initializeController($scope);
                uitkMenuModel.initializeVisibility($scope);

                $scope.expandMenuOrRedirectToLink = uitkMenuModel.getClickHandler($scope);
                $scope.hideParentMenu = uitkMenuModel.hideParentMenu.bind($scope);
                $scope.isExpanded = uitkMenuModel.isExpanded;

                if ($scope.model.level > 1 && $scope.focusItem) {
                    $scope.focusItem.focusMe = false;
                }

                if($scope.model.level === 1 && !angular.isDefined($scope.model.useStripOnMobile)) {
                    $scope.model.useStripOnMobile = true;
                }

                uitkMenuModel.ValidateModelId($scope.model, uitkExceptionService);
                uitkMenuModel.CheckForBothUrlAndDropdown($scope.model, uitkExceptionService);

                $scope.getTrustedTextTemplate = function (item) {
                    return $sce.trustAsHtml(item.textTemplate);
                };
            }],
            link: function (scope, iElement) {
                uitkMenuModel.initializeSetFocus(scope, iElement, true);
                scope.checkMenuPosition = uitkMenuModel.checkMenuPosition(scope, iElement);

                // Reconfigure the top level menu on resize of the window
                angular.element($window).bind('resize', uitkMenuModel.getResizer(scope, iElement));
                $timeout(function() {
                    angular.element(document).ready(function() { uitkMenuModel.getResizer(scope, iElement)(); });
                });
            },
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || 'template/uitk-secondary-navigation.html';
            }
        };
    };

    var applyParentFocus = function () {
        return {
            link: function (scope, element) {
                if (scope.item) {
                    scope.$watch('item.focusMe', function (a, b) {
                        if (scope.item.focusMe) {
                            element.focus();
                            scope.item.focusMe = false;
                        }
                    })
                }
            }
        }
    };

    var compileLink = function($compile) {
        return function ($scope, $element) {
            $compile($scope.item.textTemplate)($scope, function (clone) {
                if (!clone.selector) {
                    $element.prepend(clone);
                } else {
                    $element.prepend(clone.selector);
                }
            });
        };
    }

    uitkSecondaryNavigation.$inject = ['$compile', '$document', '$timeout', '$filter', 'uitkExceptionService', '$window', '$sce', 'uitkMenuModel'];
    compileLink.$inject = ['$compile'];

    angular.module('uitk.component.uitkSecondaryNavigation', ['uitk.component.uitkSlideAnimation', 'uitk.component.uitkNavigable', 'uitk.uitkUtility', 'uitk.Models'])
        .directive('uitkSecondaryNavigation', uitkSecondaryNavigation)
        .directive('applyParentFocus', applyParentFocus)
        .directive('uitkSecondaryNavCompileLink', compileLink);

})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.15.0
 */
angular.module('uitk.component.sessionTimeout', ['uitk.component.uitkDialog','uitk.uitkUtility'])
.directive('uitkSessionTimeout', ["$timeout", "$interval", "$http", "$window", "$filter", function ($timeout, $interval, $http, $window, $filter) {
        function controller($scope){
            if(!$scope.model){
                $scope.model = {};
            }
            if(!$scope.model.sessionTimeoutUrl){
                $scope.model.sessionTimeoutUrl = '/sessionexpired'
            }
            //Difference between logoutTime  and warningTime should be more than 1 minute(we are reducing logoutTime by one minute to give server additional minute before timeout
            if(!$scope.model.sessionWarningTimeInMinutes){
                $scope.model.sessionWarningTimeInMinutes = 10;  // time is in minutes
            }
            if(!$scope.model.sessionLogoutTimeInMinutes){
                $scope.model.sessionLogoutTimeInMinutes = 15;  // time is in minutes
            }
            if(!$scope.model.announceInterval){
                $scope.model.announceInterval = 30;  // internal is in seconds
            }
            $scope.model.show = false;
            $scope.warningTime = null;

            //Reduce client time by 1 min to give server additional minute before timeout.
            $scope.model.sessionLogoutTimeInMinutes -= 1;

            var mins = ($scope.model.sessionLogoutTimeInMinutes - $scope.model.sessionWarningTimeInMinutes);
            var secs = mins * 60;

            var remainingMinutes = Math.floor(secs/60);
            var remainingSeconds = secs - Math.round(remainingMinutes * 60);
            var timeInMinsAndSecs = remainingMinutes + ' minutes ' + remainingSeconds + ' seconds';
            $scope.warningMessage = 'Your session will expire in '+timeInMinsAndSecs+' due to inactivity.';
        }
        controller.$inject = ["$scope"];
	 return {
		    restrict: 'E',
		    replace: true,
		    scope:{
		    	model:'=?'
		    },
            controller: controller,
		    link: function($scope){

		    	
		    	var decrementPromise;
		    	var flag = 0;
		    	var remainingMinutes = 0, remainingSeconds = 0;

		    	// set minutes
		    	var mins = ($scope.model.sessionLogoutTimeInMinutes - $scope.model.sessionWarningTimeInMinutes);
		    	// calculate the seconds
		    	var secs = mins * 60;
		    	var serverTimerPromise; // keep track of last time we called the server
		    	var serverTimeRemaining = $scope.model.sessionLogoutTimeInMinutes * 60000;
                var interval = 0;

		    	function idleLogout() {
		    		var timeupPromise;
		    		window.onload = resetTimer;
		    		window.onmousemove = resetTimer;
		    		window.onmousedown = resetTimer; // catches touchscreen presses
		    		window.onclick = resetTimer; // catches touchpad clicks
		    		window.onscroll = resetTimer; // catches scrolling with arrow keys
		    		window.onkeypress = resetTimer;

		    		function timeup() {
		    			$scope.warningTime = null;
		    			$scope.model.show = true;
		    			countdown();
		    		}

		    		function resetTimer() {
		    			
		    			//If modal window is displayed then do not reset timer on mouse move/click event
			    		if(decrementPromise !== undefined && decrementPromise.$$state.value === undefined){
			    			return;
			    		}
		    			$timeout.cancel(timeupPromise);
		    			timeupPromise = $timeout(timeup,getTimeInMillis($scope.model.sessionWarningTimeInMinutes));
		    			checkServerSession();
		    		}
		    		resetTimer();
		    		startServerTimer();
		    	}

		    	function startServerTimer(){
		    		serverTimerPromise = $interval(function() {
		    			serverTimeRemaining-=1000; //Decrement by 1000 ms
		    		}, 1000);
		    	}
		    	
		    	function checkServerSession(){
		    		if (serverTimeRemaining < 20000) { // 20 seconds remaining, make a server call
		    			resetServerSession();
		    		}
		    	}
		    	
		    	// This function will be called when warning time starts
		    	function countdown() {
		    		$interval.cancel(decrementPromise);
		    		decrementPromise = $interval(decrement, 1000);
		    		flag = 0;
		    	}

		    	$scope.clearCountDown = function() {
		    		$interval.cancel(decrementPromise);
		    		
		    		$scope.model.show = false;
		    		mins = ($scope.model.sessionLogoutTimeInMinutes - $scope.model.sessionWarningTimeInMinutes);
		    		secs = mins * 60;
		    		flag = 1;
                    interval = 0;
		    		resetServerSession();
		    	};

                $scope.setMessage = function() {
                    angular.element('#session-warning-message').html(getWarningMessage());
                };

		    	function resetServerSession() {
		    		$interval.cancel(serverTimerPromise);
		    		// Make AJAX call	
		    		try {
		    			var url = location.href;
		    			if(url.indexOf('#') !== -1){
		    				url = url.substring(0,url.indexOf('#'));
		    			}
		    			$http.get(url);
		    			
		    			serverTimeRemaining = getTimeInMillis($scope.model.sessionLogoutTimeInMinutes);
		    			startServerTimer();
		    		} catch (e) {
		    			throw {
	         				name : 'Exception',
	         				message : e
	         			};
		    		}		
		    	}

		    	function forwardToSessionExpiration(){
		    		var contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));
		    		$window.location = contextPath + $scope.model.sessionTimeoutUrl;
		    	}

		    	function decrement() {
		    		checkServerSession();
	    			remainingMinutes = getMinutes();
	    			remainingSeconds = getSeconds();
                    var warningMessage = getWarningMessage();
	    			secs--;
	    			
	    			if (flag === 0 && remainingMinutes === 0 && remainingSeconds === 0) {
	    				// Time up
	    				$interval.cancel(decrementPromise);
	    				$timeout(forwardToSessionExpiration,5000);
	    			}

                    if(interval === $scope.model.announceInterval) {
                        interval = 0;
                        // announce timeout text
                        $scope.ariaLiveFlag = 'assertive';
                    } else {
                        $scope.ariaLiveFlag = 'off';
                    }
                    interval++;
                    angular.element('#session-warning-message').html(warningMessage);
		    	}

                function getWarningMessage(){
                    remainingMinutes = getMinutes();
                    remainingSeconds = getSeconds();

                    var timeInMinutesAndSeconds = "";
					if(remainingMinutes > 1) {
						timeInMinutesAndSeconds = remainingMinutes +" "+ $filter('uitkTranslate')("minutes")+" ";
					} else if(remainingMinutes === 1) {
						timeInMinutesAndSeconds = remainingMinutes +" "+ $filter('uitkTranslate')("minute")+" ";
					}

					if(remainingSeconds > 1) {
						timeInMinutesAndSeconds += remainingSeconds+" "+$filter('uitkTranslate')("seconds");
					} else if(remainingSeconds === 1) {
						timeInMinutesAndSeconds += remainingSeconds+" "+ $filter('uitkTranslate')("second");
					}

					return $filter('uitkTranslate')("Your session will expire in")+" "+'<span style="font-weight:bold;" id="time-remaining">'+timeInMinutesAndSeconds+'</span>'+" "+$filter('uitkTranslate')("due to inactivity.");
                }
		    	
		    	function getMinutes() {
		    		// minutes is seconds divided by 60, rounded down
		    		mins = Math.floor(secs / 60);
		    		return mins;
		    	}
		    	function getSeconds() {
		    		// take mins remaining (as seconds) away from total seconds remaining
		    		return secs - Math.round(mins * 60);
		    	}

		    	function getTimeInMillis(minutes){
		    		return (minutes * 60 * 1000);
		    	}

		    	idleLogout();
		    },
		    template: [
						'<div ng-show="warningTime !== undefined">',
							'<uitk:dialog dialog-id="session-timeout-dialog" dialog-role="dialog" call-back-show="setMessage();" tk-zindex="100000" tk-aria-describedby="session-timeout-dialog_contentId" tk-close-button-text="{{\'Extend my session\'| uitkTranslate }}" header-text="{{\'Session About to Expire\' | uitkTranslate}}" show="model.show" ng-if="model.show" default-width="30%" call-back-hide="clearCountDown" style="width:30%">',
								'<div class="tk-panl-content">',
									'<div id="session-warning-message" aria-live="{{ariaLiveFlag}}" aria-atomic="true">{{warningMessage}}</div>',
									'<div class="tk-margin-top-1t">{{"Click Continue to remain signed in." | uitkTranslate}}</div>',
									'<div class="tk-margin-top-1t">',
									'<uitk:button type="button" value="{{\'Continue\'| uitkTranslate}}" aria-describedby="extend-session" enable-default="true" ng-click="clearCountDown();" custom-class="uitk-width-7t  tk-margin-top-1t"></uitk:button>',
									'<span tabindex="-1" class="oui-a11y-hidden" id="extend-session">{{"Extend my session" | uitkTranslate}}</span>',
									'</div>',
								'</div>',
							'</uitk:dialog>',
						'</div>'
		               ].join('')
		  };
}]);

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
angular.module('uitk.component.uitkSettingsMenu', [])
.directive('uitkSettingsMenu',['$document','$timeout', function($document,$timeout){
  return {
    restrict : 'E',
    scope : {
    	menuItems : '='
    },
    replace : true,
    link:function(scope,ele){
        scope.menu = {
            open:false
        }

        scope.iconPressed = function(e)
        {
            var targetElement = angular.element(e.target);
            if(e.which == 27){
                scope.menu.open = false;
                angular.element('.tk-settings-menu-container a')[0].focus();
            }
            else if((e.which === 9) && e.shiftKey && targetElement.parent('li').index() == 0){
                    scope.menu.open = false;

            }
            else if((e.which === 9) && !e.shiftKey && (targetElement.parent('li').index() == targetElement.parents('ul li').length)){
                    scope.menu.open = false;
            }
        }
        scope.toggleSubMenu = function(event)
        {
            scope.menu.open = !scope.menu.open;
            $timeout(function () {
                angular.element('.tk-settings-menu-container').find('ul li:first a').focus();
            });
        }
        $document.on('click',function(event){
            if (!angular.element(event.target).closest('.tk-settings-menu-container').length) {
                scope.menu.open = false;
                scope.$apply();
            }


        });
    },
    template : [
                '<div class="tk-settings-menu-container" ng-class="{ \'tk-settings-menu-container-show\' : menu.open }" role="menu" aria-expanded="{{menu.open}}" >',
                '<a href="javascript:void(0);" ng-click="toggleSubMenu($event)" ng-keydown="iconPressed($event)"  aria-label="{{::menuItems.hiddenLabel}}" uitk-navigable><uitk:icon-font icon="cux-icon-settings"></uitk:icon-font></a>',
                '<span class="oui-a11y-hidden">',
                '<span ng-if="menu.open">Expanded</span>',
                '<span ng-if="!menu.open">Collapsed</span>',
                '</span>',
                '<ul class="tk-settings-menu">',
                ' <li ng-repeat="link in menuItems.items" role="menuitem">',
                '   <span ng-if="link.onClick" ng-click="link.onClick($event);menu.open=false;" ng-keydown="iconPressed($event)" uitk-navigable aria-label="{{::link.text}}">{{::link.text}}</span>',
                '   <a ng-if="link.url" href="{{::link.url}}" ng-click="menu.open=false;" ng-keydown="iconPressed($event)" uitk-navigable aria-label="{{::link.text}}">{{::link.text}}</a>',
                ' </li>',
                '</ul>',
                '</div>'
              ].join("")
  };
}]);

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */

(function () {

    var uitkShowHideContent = function ($document,uitkEvents,uitkExceptionService,$timeout) {
        return{
            restrict: "E",
            scope: {
                viewModel: '='
            },
            controller:['$scope',function($scope){
                //throw exception if viewModel is undefined
                if(_.isUndefined($scope.viewModel)){
                    uitkExceptionService.throwException(
                        'viewModelNotDefinedException',
                        'viewModel is not defined'
                    );
                }

                $scope.expandController = !!$scope.viewModel.expandControllerByDefault;
            }],

            link: function (scope, element, attrs){
                /*show/hide content toggle*/
                scope.isExpanded = true;
                scope.toggleShowHideContent = function(event){
                    scope.expandController = !scope.expandController;
                    scope.isExpanded = !scope.isExpanded;
                    if(scope.expandController){
                        $timeout(function(){
                            angular.element(element).find('.tk-content-btnAll').focus();
                        }, 200);
                    }
                };
                /*hide content panel*/
                scope.hideContentInfo=function(){
                    if(!scope.viewModel.skipExternalEventHandling){
                        scope.expandController=false;
                    }
                };
                /**
                 * To collapse the content panel for keyboard users
                 *@param Event object
                 * @param index, index element viewmodel list
                 * @type {hide show/hide conetnt panel|ESC|SHIFT + TAB on firstElement|TAB on list list item}
                 */
                scope.collapseContentPanel = function(event,index,hideContentPnl) {

                    var hideReasonOne =  (event.which === 27); //Escape key event handle
                    var hideReasonTwo = ((index === (scope.viewModel.items.length-1) ) && (event.which === 9) && !event.shiftKey ); //tab key press handle when focus on last element
                    var hideReasonThree = (hideContentPnl && (event.which === 9) && event.shiftKey); // shift+tab key handle when focus on first element

                    if(hideReasonOne || hideReasonTwo || hideReasonThree){
                        scope.isExpanded = true;
                        scope.expandController=false;
                    }
                    if(hideReasonOne){
                        angular.element(element).find('.tk-show-hide-display').focus();
                    }
                };
                /*Show/Hide content elements*/
                var __showOrHideContent = function(item){
                    if(item.selected && item.contentId){
                        angular.element('#'+item.contentId).show();
                    }else{
                        angular.element('#'+item.contentId).hide();
                    }
                }
                /*Select all elements*/
                var __selectAll = function(){
                    _.forEach(scope.viewModel.items,function(item){
                           item.selected = true;
                           __showOrHideContent(item);
                    });
                };
                /*Hide all elements*/
                var __selectNone = function(){
                    _.forEach(scope.viewModel.items,function(item){
                            item.selected = false;
                            __showOrHideContent(item);
                  });
                };

                /*
                 *  Returns the number(count) of items selected.
                 */
                var __getNumberOfItemsSelected = function(){
                    return scope.viewModel.items.filter(function(item){
                        return item.selected == true
                    }).length;
                };

                /*
                 * To know if the Show All button should be enabled or disabled.
                 * If all items are selected, Show All buttons should get disabled.
                 * If atleast one of the item is not selected, Show All button should be enabled.
                 */
                scope.enableShowAll =function(){
                    return (__getNumberOfItemsSelected() != scope.viewModel.items.length);
                }

                /*
                 * To know if the Hide All button should be enabled or disabled.
                 * If none of the items are selected, Hide All button should get disabled.
                 * If atleast one of the item is selected, Hide All button should be enabled.
                 */
                scope.enableHideAll =function(){
                    return (__getNumberOfItemsSelected() != 0);
                }

                /*  checkbox trigger event    */
                scope.select = function(type,event,selectedItem){
                    switch(type){
                        case "ONE":
                            __showOrHideContent(selectedItem);
                            break;
                        case "ALL":
                            __selectAll();
                            break;
                        case "NONE":
                            __selectNone();
                            break;
                    }

                    if(!!scope.viewModel.emitEvent){
                        uitkEvents.setScope(scope).emit('showHideContent', scope.viewModel.id+'-'+type, selectedItem);
                    }
                };
                /*show/hide content elements based on condition items selected*/
                _.forEach(scope.viewModel.items,function(item){
                    __showOrHideContent(item);
                });

            },
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || "template/uitkShowHideContentTemplate.html";
            }
        }
    };

    uitkShowHideContent.$inject = ['$document', 'uitkEvents','uitkExceptionService', '$timeout'];

    angular.module('uitk.component.uitkShowHideContent',['uitk.component.uitkSlideAnimation','uitk.uitkUtility'])
        .directive('uitkShowHideContent', uitkShowHideContent);

})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */

(function () {
    var uitkSelectDirective = function (uitkExceptionService) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            link: function (scope) {

                if (scope.itemList.length == 0) {
                    uitkExceptionService.throwException('ListItemLengthCannotBeZero','List item array length cannot be zero');
                }

                if (scope.checkFieldValidation === undefined) {
                    scope.checkFieldValidation = false;
                }

                scope.$watch("selectedValue", function (newValue, oldValue) {
                    if (!(newValue === scope.itemList[0])) {
                        scope.checkFieldValidation = true;
                    } else {
                        scope.checkFieldValidation = false;
                    }
                }, true);

                //If no selected value then assign first list item as selected value
                if (!scope.selectedValue) {
                    scope.selectedValue = scope.itemList[0];
                }

            },
            scope: {
                itemList: '=', //array of items
                selectedValue: '=', //model data for selected item
                tkRequired: '@',     //make select element required if any value is defined except 0 string
                tkErrorClass: '=',
                onChange: '&',
                tkName:'@',//name attribute needs to be on template for it to be rendered into form elements.
                checkFieldValidation: '=?' // used to set required attributes programmatically
            },
            template: function (ele,attr) {
                
                if (!attr.name) {//support for fomr layuout..name attr cannot be transcluded.
                    return "<select ng-model='selectedValue'  name={{tkName}} ng-change='onChange({selectedValue: selectedValue})'  class='tk-sngl-dpwn' ng-style=\"{'width': 'auto'}\" ng-options='item.label disable when item.isDisabled for item in itemList' ng-attr-aria-invalid='{{tkErrorClass === undefined ? false : tkErrorClass}}' ng-required='(tkRequired && checkFieldValidation) ? true : false' aria-required='{{(tkRequired ) ? true : false}}'>" +
                     "</select>"
                }
               return "<select ng-model='selectedValue' ng-change='onChange({selectedValue: selectedValue})'  class='tk-sngl-dpwn' ng-style=\"{'width': 'auto'}\" ng-options='item.label disable when item.isDisabled for item in itemList' ng-attr-aria-invalid='{{tkErrorClass === undefined ? false : tkErrorClass}}' ng-required='(tkRequired && checkFieldValidation) ? true : false' aria-required='{{(tkRequired ) ? true : false}}'>" +
            "</select>"

            }
        };
    };

    uitkSelectDirective.$inject = ['uitkExceptionService'];

    angular.module('uitk.component.uitkSelect',['uitk.uitkUtility'])
        .directive('uitkSelect', uitkSelectDirective);
})();

/*
 * Copyright (c) Optum 2015 - All Rights Reserved.
 */
(function(){
    function splitButtonController($rootScope,$timeout){
        var that = this;
        var splitButtonClasses = {
            initial: 'oui-sbtn',
            hover: 'oui-sbtn-hover',
            open: 'oui-sbtn-menu-open',
            active: 'oui-sbtn-active'
        };
        var menuItemsClasses = {
            default : 'oui-sbtn-menu-default',
            hover: 'oui-sbtn-menu-hover',
            active: 'oui-sbtn-menu-active'
        };

        var DOWNARROW_KEYCODE = 40, UPARROW_KEYCODE = 38, ESC_KEYCODE = 27, ENTER_KEYCODE = 13, TAB_KEYCODE = 9;

        this.classNames = splitButtonClasses.initial;
        this.menuExpanded = false;
        this.currentMenuItemIndex = -1;

        this.$onInit = function(){
            /**
             * To set the default action based on isDefault flag.
             * Returns the first action as default if isDefault is not provided. Executed once only
             * @returns {Action Object}
             */
            this.defaultAction = (function(){
                var arr = that.actions.filter(function(action){
                    return action.isDefault === true;
                });

                if(arr.length >= 1) return arr[0];
                else return that.actions[0];
            })();

            this.activeAction = this.defaultAction;
        };

        /**
         * Adds an hover class when the component is mouseovered.
         */
        this.onMouseOver = function(){
            if(!that.menuExpanded) {
                that.classNames = [splitButtonClasses.initial, splitButtonClasses.hover].join(" ");
            }
        };

        /**
         * Reset the class to initial value hover class when onMouseLeave event is triggered.
         */
        this.onMouseLeave = function(){
            if(!that.menuExpanded) {
                that.classNames = splitButtonClasses.initial;
            }
        };

        /**
         * Reset the component to normal state by setting to intial class value.
         * Also closes the dropdown if already expanded.
         */
        this.onBlur = function(){
            that.menuExpanded = false;
            that.classNames = splitButtonClasses.initial;
            that.currentMenuItemIndex = -1;
        };

        /**
         * Trigger corresponding action on click of left side of the split button
         */
        this.onActionBtnClick = function(){
            that.activeAction.callback();
            that.classNames = splitButtonClasses.initial;
            that.menuExpanded = false;
        };

        /**
         * Trigger state change when action button is in focus
         */
        this.onActionBtnFocus = function(){
            that.classNames = [splitButtonClasses.initial, splitButtonClasses.active].join(" ");
        };

        /**
         * Reset to original state when action button loses focus.
         */
        this.onActionBtnBlur = function(){
            that.classNames = splitButtonClasses.initial;
        };

        /**
         * Expands the dropdown when arrow button(right side of split button) is clicked.
         */
        this.onArrowBtnClick = function(){
            that.menuExpanded = !that.menuExpanded;
            if(that.menuExpanded){
                that.classNames = [splitButtonClasses.initial, splitButtonClasses.open].join(" ");
                $timeout(function(){
                    that.currentMenuItemIndex = 0;
                },100);

            }
            else{
                that.classNames = [splitButtonClasses.initial, splitButtonClasses.active].join(" ");
            }
        };

        /**
         * Trigger state change for arrow button when in focus
         */
        this.onArrowBtnFocus = function(){
            that.classNames = [splitButtonClasses.initial, splitButtonClasses.active].join(" ");
        };

        /**
         * Reset to original state when arrow button (rigth side) loses focus.
         */
        this.onArrowBtnBlur = function(){
            if(!that.menuExpanded) {
                that.classNames = splitButtonClasses.initial;
                that.currentMenuItemIndex = -1;
            }
        };

        /**
         * Trigger hover behaviour when memu items are mouse hovered.
         * @params MouseEvent
         */
        this.onMenuItemMouseOver = function(event){
            angular.element(event.currentTarget).addClass(menuItemsClasses.hover);
        };

        /**
         * Menu items are reset to original state when mouse leave is triggered.
         * @params MouseEvent
         */
        this.onMenuItemMouseLeave = function(event){
            angular.element(event.currentTarget).removeClass(menuItemsClasses.hover);
        };

        /**
         * Trigger active state behaviour when menu item are selected or pressed.
         * @params MouseEvent
         */
        this.onMenuItemActive = function(event){
            angular.element(event.currentTarget).addClass(menuItemsClasses.active)
        };

        /**
         * Trigger inactive state behaviour when menu item are not selected or pressed.
         * @params MouseEvent
         */
        this.onMenuItemInactive = function(event){
            angular.element(event.currentTarget).removeClass(menuItemsClasses.active)
        };

        /**
         * Executes the corresponding action when items are clicked.
         * @params Action Object
         */
        this.onMenuItemClick = function(action){
            that.activeAction = action;
            that.menuExpanded = false;
            that.activeAction.callback();
            that.classNames = splitButtonClasses.initial;
        };

        this.menuKeyDown = function(event){
            if(!this.menuExpanded){
                return;
            }
            var keyCode = event.which;
            if(keyCode == DOWNARROW_KEYCODE){
                if (this.currentMenuItemIndex == this.actions.length - 1) {
                    this.currentMenuItemIndex = 0;
                }
                else {
                    this.currentMenuItemIndex++;
                }
                event.preventDefault();
            }
            else if(keyCode == UPARROW_KEYCODE){
                if(this.currentMenuItemIndex == 0 || this.currentMenuItemIndex == -1){
                    this.currentMenuItemIndex = this.actions.length - 1;
                }
                else{
                    this.currentMenuItemIndex--;
                }
                event.preventDefault();
            }
            else if(keyCode == ESC_KEYCODE){
                this.currentMenuItemIndex = -1;
                this.menuExpanded = false;
                this.classNames = [splitButtonClasses.initial, splitButtonClasses.active].join(" ");
                event.preventDefault();
            }
            else if(keyCode == ENTER_KEYCODE){
                this.activeAction = this.actions[this.currentMenuItemIndex];
                this.activeAction.callback();
                this.classNames = splitButtonClasses.initial;
                this.currentMenuItemIndex = -1;
                this.menuExpanded = false;
                event.preventDefault();
            }
            else if(keyCode == TAB_KEYCODE){
                this.currentMenuItemIndex = -1;
                this.menuExpanded = false;
            };
        }
    }

    splitButtonController.$inject = ['$rootScope','$timeout'];

    var splitButtonComponent = {
        bindings: {
            actions: '<',
            iconsWithLabel: '<?',
            id: '@',
            a11y: '<?'
        },
        controller: splitButtonController,
        controllerAs: 'splitBtnCtrl',
        templateUrl: "template/uitkSplitButtonTemplate.html"
    };

    angular.module("uitk.component.uitkSplitButton", ['uitk.uitkUtility'])
        .component('uitkSplitButton', splitButtonComponent);
})();

/*
 * Copyright (c) Optum 2015 - All Rights Reserved.
 */
(function(){


    var uitkSusDirective = function($http,$timeout,susViewModel,susDataService,$localStorage,$window){
        return{
            restrict: 'E',
            scope: {
                susConfig:'='
            },

            link: function(scope, element, $rootScope){

                scope.enableQtns = false;
                scope.pageLevelError = false;
                scope.showMessage = false;
                scope.showErrorMessage = false;
                scope.QtnAnswerList = susViewModel.rated1to5
                scope.QtnAnswerListRated10= susViewModel.rated1to10;
                scope.susConfig.susHeaderText = scope.susConfig.susHeaderText || 'System usability Survey';
                scope.susConfig.susQuestionText = scope.susConfig.susQuestionText || 'Based on your recent experience with the Optum product, please indicate whether you agree or disagree with the following statements:';
                scope.dialogObj= {};
                scope.dialogObj.modalShown= false;
                scope.btnDisableFlag = false;
                scope.susConfig.openInSameWindowFlag = scope.susConfig.openInSameWindowFlag || false;

                scope.response ={};

                scope.inlineErrorMessageModel = {
                    id : 'InlineError',
                    messageType : 'error',
                    content : '<span> {{ "An error has occurred, and we are unable to display the page you requested. You can try reloading the page now or in a few minutes." | uitkTranslate }}.</span>',
                    visible : false,
                    position : 'inline',
                    //rememberMe : true,
                    messageRole : 'alert',
                    headingLevel : '2'
                };

                scope.inlineSuccessMessageModel = {
                    id : 'InlineSuccess',
                    messageType : 'success',
                    content : '<span> {{ "Thank you! Your responses have been successfuly submitted." | uitkTranslate }}.</span>',
                    visible : false,
                    position : 'inline',
                    messageRole : 'alert',
                    autoFadeOut:false,
                    headingLevel : '2'
                };
                scope.busyIndicatorModel = {
                    flag:false,
                    imageUrl : '/uitk-component-showcase/app/images/loader.gif',
                    busyIndicatorDelay: 0,
                    text : 'The application will be available shortly.'
                };

                susViewModel.setSurveyUrl(scope.susConfig.url);
                scope.getSurveyurl = scope.susConfig.url+"/api/ServiceOfferings/"+scope.susConfig.surveyID+"?Include=SurveyQuestions&$format=json"


                scope.getSurveyQtns = function(){
                    scope.busyIndicatorModel.flag = true;
                    susDataService.getSurveyQuestions(scope.getSurveyurl).then(function successCallback(response) {

                        if(response.data && response.data.Result && response.data.Result.$values.length > 0){
                            scope.response = response;
                            scope.qtnList = response.data.Result.$values[0].SurveyQuestions.$values;
                            scope.originalObject = angular.copy(response.data.Result.$values[0].SurveyQuestions.$values);
                        }else{
                             // display error
                        }
                        scope.enableQtns = true;
                        scope.busyIndicatorModel.flag = false;
                    }, function errorCallback(response) {
                        scope.busyIndicatorModel.flag = false;
                        scope.pageLevelError = true;
                        scope.enableQtns = false;
                        scope.inlineErrorMessageModel.visible = true;
                    });
                }
                scope.confirmReset = function(form){
                    scope.dialogObj.modalShown = true;
                    scope.SusForm = form;
                }
                scope.resetForm = function(){
                    scope.enableQtns = false;
                    scope.successMessageModel.visible = false;
                    scope.qtnList = angular.copy(scope.originalObject);
                    scope.SusForm.$setPristine();
                    scope.enableQtns = true;
                    scope.showErrorMessage = false;
                    scope.dialogObj.modalShown = false;
                    if(scope.susConfig.resetCallback) {
                        scope.susConfig.resetCallback();
                    }
                    if(!scope.susConfig.openInSameWindowFlag){
                        $window.close();
                    }

                }


                scope.saveSurvey = function(form,e){

                    if(form.$valid){
                        if( scope.successMessageModel.visible == true){
                            scope.successMessageModel.visible = false;
                        }
                        scope.showErrorMessage = false;
                        scope.busyIndicatorModel.flag = true;
                        scope.surveyResult ={};
                        scope.btnDisableFlag = true;
                        scope.answList =[];

                        angular.forEach(scope.qtnList,function(i,j){
                            scope.answList.push({"QuestionId":i.QuestionId,"Answer": i.selectedAnsw});
                        });
                        scope.surveyResult = {
                            "RequestStatus": "status_123",
                            "FeedbackAnswers":scope.answList,
                            "FeedbackRating": 10,
                            "FeedbackUserId": scope.susConfig.feedbackUserId,
                            "EmailAddress":scope.susConfig.emailAddress,
                            "Metadata":scope.susConfig.metaData
                        };

                        scope.saveSurveyurl = scope.susConfig.url+'/api/Surveys/'+scope.response.data.Result.$values[0].PlatformId+'/'+scope.response.data.Result.$values[0].ServiceId;

                        susDataService.saveSusSurvey(scope.saveSurveyurl,scope.surveyResult).
                            then(function successCallback(response) {

                                scope.btnDisableFlag.flag = false;
                                scope.busyIndicatorModel.flag = false;
                                scope.showMessage = true;
                                scope.successMessageModel.messageType = 'success';
                                scope.successMessageModel.content = '<span> {{"Survey saved successfully" | uitkTranslate }}</span>';
                                //scope.successMessageModel.visible = true;
                                scope.inlineSuccessMessageModel.visible = true;
                                $localStorage.susUserInfoObj = $localStorage.susUserInfoObj || {};
                                $localStorage.susUserInfoObj[scope.susConfig.feedbackUserId] = true;
                            }, function errorCallback(response) {
                                scope.busyIndicatorModel.flag = false;
                                scope.pageLevelError = true;
                                scope.enableQtns = false;
                                $localStorage.susUserInfoObj[scope.susConfig.feedbackUserId] = false;
                            });
                    }else{
                        scope.showErrorMessage = true;
                        scope.showMessage = true;
                        scope.successMessageModel.visible = false;
                        scope.successMessageModel.messageType = "error";
                        scope.successMessageModel.content = '<span> {{"Please fill in the required details" | uitkTranslate }}</span>';
                        scope.successMessageModel.autoFadeOut = true;
                        scope.successMessageModel.visible = true;

                    }
                }

                scope.getSurveyQtns();

                scope.successMessageModel = {
                    id : 'success-message',
                    messageType : 'success',
                    content : '<span> {{"Survey saved successfully" | uitkTranslate }}</span>',
                    visible : false,
                    messageRole : 'alertdialog',
                    ariaAttributes : true,
                    headingLevel : '2'
                };

            },
            templateUrl: "template/sustmpl.html"
        }
    };

    uitkSusDirective.$inject = ['$http','$timeout','susViewModel','susDataService','$localStorage','$window'];


    angular.module("uitk.component.uitkSus", ['uitk.component.uitkButton','uitk.component.uitkDialog','ngStorage'])
        .factory('susDataService',["$http", function($http){
            return {
                getSurveyQuestions: function(url) {
                    return   $http({method: 'GET',url: url});
                },
                saveSusSurvey: function(url, data) {
                    return $http({method: 'POST',url: url,data:data});
                }
            }
        }])
        .factory('susViewModel', function(){
            var surveyUrl = "";
            return {
                rated1to5:[

                    {
                        label: '1',
                        value: '1',
                        disabled: false
                    }, {
                        label: '2',
                        value: '2',
                        disabled: false
                    }, {
                        label: '3',
                        value: '3',
                        disabled: false
                    }, {
                        label: '4',
                        value: '4',
                        disabled: false
                    }, {
                        label: '5',
                        value: '5',
                        disabled: false
                    }
                ],
                rated1to10:[
                    {
                        label: '0',
                        value: '0',
                        disabled: false
                    },
                    {
                        label: '1',
                        value: '1',
                        disabled: false
                    }, {
                        label: '2',
                        value: '2',
                        disabled: false
                    }, {
                        label: '3',
                        value: '3',
                        disabled: false
                    }, {
                        label: '4',
                        value: '4',
                        disabled: false
                    }, {
                        label: '5',
                        value: '5',
                        disabled: false
                    },{
                        label: '6',
                        value: '6',
                        disabled: false
                    }, {
                        label: '7',
                        value: '7',
                        disabled: false
                    }, {
                        label: '8',
                        value: '8',
                        disabled: false
                    }, {
                        label: '9',
                        value: '9',
                        disabled: false
                    }, {
                        label: '10',
                        value: '10',
                        disabled: false
                    }
                ],
                getSurveyUrl:function(){
                    return surveyUrl;
                },
                setSurveyUrl : function(val){
                    surveyUrl = val;
                }
            }
        })
        .factory('susHttpInterceptor', ["$q", "susViewModel", function ($q,susViewModel) {
            return {
                request: function (config) {
                    if (!!susViewModel.getSurveyUrl() && (config.url.indexOf(susViewModel.getSurveyUrl()) == 0) ) {
                        config.headers = {};
                    }
                    return config || $q.when(config);
                },
                response: function (response) {
                    return response || $q.when(response);
                },
                responseError: function (response) {
                    return $q.reject(response);
                }
            }
        }])

        .config(["$httpProvider", function ($httpProvider) {
            $httpProvider.interceptors.push('susHttpInterceptor');
        }])
        .directive('uitkSus',uitkSusDirective)
       ;
})();

/*
 * Copyright (c) Optum 2015 - All Rights Reserved.
 */
(function(){


    var uitkSusTakeSurveyDirective = function($http,$timeout,$localStorage,$window){
        return{
            restrict: 'E',
            scope: {
                susConfig:'='
            },

            link: function(scope, element, $rootScope){
                scope.showMessage = false;
                scope.susConfig.openInSameWindowFlag = scope.susConfig.openInSameWindowFlag || false;
                scope.customInformationMessageModel = {
                    id : 'CustomizedInformation',
                    messageType : 'information',
                    visible : true,
                    rememberMe : false,
                    messageRole : 'alertdialog',
                    closeButton:false,
                    ariaAttributes : true,
                    headingLevel : '2'

                }
                $localStorage.susUserInfoObj = $localStorage.susUserInfoObj || {};
                $timeout(function(){
                   if( $localStorage.susUserInfoObj && !$localStorage.susUserInfoObj[scope.susConfig.feedbackUserId] ){
                        scope.showMessage = true;
                    }

                });
                scope.takeSurvey = function(){
                    if(scope.susConfig.openInSameWindowFlag){
                        $window.location.href= scope.susConfig.redirectionUrl;
                    }else{
                        $window.open(scope.susConfig.redirectionUrl,'_blank');
                    }

                    scope.customInformationMessageModel.visible = false;
                }
                scope.dontShowMessage = function(){
                    //$localStorage.feedbackUserId = scope.susConfig.feedbackUserId;
                    $localStorage.susUserInfoObj = $localStorage.susUserInfoObj || {};
                    $localStorage.susUserInfoObj[scope.susConfig.feedbackUserId] = scope.susConfig.feedbackUserId;
                    scope.customInformationMessageModel.visible = false;
                }
                scope.showLater = function(){
                    scope.showMessage = false;
                    scope.customInformationMessageModel.visible = false;
                }
            },

            templateUrl: "template/susTakeSurveyDialogTemplate.html"
        }
    };

    uitkSusTakeSurveyDirective.$inject = ['$http','$timeout','$localStorage','$window'];


    angular.module("uitk.component.uitkSusTakeSurveyDialog", ['uitk.component.uitkButton','uitk.component.uitkMessage','pascalprecht.translate','ngStorage'])
        .directive('uitkSusTakeSurveyDialog',uitkSusTakeSurveyDirective);
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.15.0
 */
(function () {
    var TABS_SWITCH_TIMEOUT = 100;
    angular.module('uitk.component.tabs',['uitk.component.uitkNavigable']).directive('uitkTabs',['uitkEvents', function (uitkEvents) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope:{
                tkModel:'='
            },
            link: function($scope, element, attrs, ctrl){
                $scope.tkModel.eventsEnable = false;
                $scope.tkModel.enableTabIndex=true; //set the active tab's index to 0
                //Set Id for tabs if not specified
                if(!$scope.tkModel.id) {
                    $scope.tkModel.id='tabs_'+ctrl.randomId(6);
                }

                /*
                 * Check if current tab is selected or not
                 */
                $scope.isSelected = function(index){
                    if($scope.tkModel.selectedIndex === index){
                        return true;
                    }
                    return false;
                };
            },
            controller: ["$scope", "$timeout", function($scope, $timeout) {
                /*
                 * This function selects tab based on click and sets focus on tab
                 */
                $scope.selectTab = function (tab, index,event) {
                    if(!tab.disabled) {
                        angular.element('#' + $scope.tkModel.id + '_tab' + $scope.tkModel.selectedIndex + '_tab').attr('aria-selected',false);

                        if($scope.tkModel.selectedIndex !== index) {
                            var prevActiveElem = angular.element('div.tk-tpnl ul li')[$scope.tkModel.selectedIndex];
                            angular.element(prevActiveElem).removeClass('tk-tpnl-selected');
                        }

                        angular.element('#' + $scope.tkModel.id + '_tab' + index + '_tab').attr('aria-selected',true);

                        $scope.tkModel.selectedIndex = index;
                        if(tab.focusElement) {
                            $timeout(function(){
                                angular.element(tab.focusElement).focus();
                            }, TABS_SWITCH_TIMEOUT);
                        } else {
                            $timeout(function(){
                                var tabContentPanel = angular.element('#'+$scope.tkModel.id+'_tab'+index+'_tabpanel');
                                tabContentPanel.focus();
                                if(typeof tab.callback === 'function') {
                                    tab.callback(event, tab); //  callback on click of the tab
                                }
                                if($scope.tkModel.eventsEnable){
                                    uitkEvents.setScope($scope).emit('tabs', 'tabs', event,tab);
                                }
                            }, TABS_SWITCH_TIMEOUT);
                        }


                    }
                };

                // Looping to skip selecting the disabled tabs, starting with the selectedIndex provided by the user
                // if there is one. Otherwise, select the first enabled tab.
                $scope.tkModel.selectedIndex = ($scope.tkModel.selectedIndex % $scope.tkModel.tabs.length) || 0;
                var index = $scope.tkModel.selectedIndex;
                var tab = $scope.tkModel.tabs[index];
                for(var i=index; tab.disabled && i<$scope.tkModel.tabs.length; i++) {
                    index = i;
                    tab = $scope.tkModel.tabs[i];
                }
                if(!tab.disabled) {
                    $scope.tkModel.selectedIndex = index;
                    $scope.templateUrl = tab.templateurl;
                    $scope.selectTab($scope.tkModel.tabs[$scope.tkModel.selectedIndex], $scope.tkModel.selectedIndex);
                }

                /*
                * This function is used to generate random Id for tabs component
                */
                this.randomId = function (length) {
                    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
                    if (! length) {
                        length = Math.floor(Math.random() * chars.length);
                    }
                    var str = '';
                    for (var i = 0; i < length; i++) {
                        str += chars[Math.floor(Math.random() * chars.length)];
                    }
                    return str;
                };

                /*
                * This function is used to handle keyboard functionality on the tabs
                */
                $scope.tabKeyupHandler = function(pane, index, event){
                    var pressedKey = event.keyCode;

                    switch(pressedKey) {
                        // for right or down arrow keys, select next tab
                        case 39:
                        case 40:
                            var nextTab;
                            var count = 0;
                            if($scope.tkModel.selectedIndex !== index) {
                                var prevActiveElem = angular.element('div.tk-tpnl ul li')[index];
                                angular.element(prevActiveElem).removeClass('tk-tpnl-selected');
                            }
                            do { // looping to skip selecting the disabled tabs
                                index = (index + 1) % $scope.tkModel.tabs.length;
                                nextTab = $scope.tkModel.tabs[index];
                                count++;
                            } while(nextTab.disabled && count <= $scope.tkModel.tabs.length);
                            angular.element('#' + $scope.tkModel.id + '_tab' + index + '_tab').focus();
                            var activeElem = angular.element('div.tk-tpnl ul li')[index];
                            angular.element(activeElem).addClass('tk-tpnl-selected');
                            break;
                        // for left or up arrow keys, select previous tab
                        case 37:
                        case 38:
                            var previousTab;
                            var count = 0;
                            if($scope.tkModel.selectedIndex !== index) {
                                var prevActiveElem = angular.element('div.tk-tpnl ul li')[index];
                                angular.element(prevActiveElem).removeClass('tk-tpnl-selected');
                            }
                            do { // looping to skip selecting the disabled tabs
                                index = (index - 1 >= 0) ? index - 1 : $scope.tkModel.tabs.length-1;
                                previousTab = $scope.tkModel.tabs[index];
                                count++;
                            } while(previousTab.disabled && count <= $scope.tkModel.tabs.length);
                            angular.element('#' + $scope.tkModel.id + '_tab' + index + '_tab').focus();
                            var activeElem = angular.element('div.tk-tpnl ul li')[index];
                            angular.element(activeElem).addClass('tk-tpnl-selected');
                            break;
                    };
                };

                /*
                 * This function is used to handle key down functionality on the tabs
                 */
                $scope.tabKeydownHandler = function (event) {
                    if (event.keyCode == 9) {
                        $scope.tkModel.enableTabIndex=false;
                        for (var i = 0; i < $scope.tkModel.tabs.length; i++) {
                            if (i !== $scope.tkModel.selectedIndex) {
                                angular.element('div.tk-tpnl ul li').eq(i).removeClass('tk-tpnl-selected');
                            }
                        }
                        $timeout(function(){ //set the active tab's tabindex to 0
                            $scope.tkModel.enableTabIndex=true;
                        });
                    }
                }

                /*
                * This function is used to handle the keyup event on the tab content.
                */
                $scope.contentKeyupHandler = function(index, event) {
                    if (event.ctrlKey && event.keyCode === 38) { // For Control Key + Up Arrow, change the focus from tab content to the corresponding tab
                        $timeout(function(){
                            angular.element('#' + $scope.tkModel.id + '_tab' + index + '_tab').focus();
                        });
                    }
                };

                $scope.$watch('tkModel.selectedIndex',function(){
                    $scope.templateUrl = $scope.tkModel.tabs[$scope.tkModel.selectedIndex].templateurl;
                });

            }],
            template:[
                '<div id="{{tkModel.id}}" class="tk-tpnl" aria-describedby="{{tkModel.id}}_desc">',
                '<div class="oui-a11y-hidden" id="{{tkModel.id}}_desc" aria-hidden="false" tabindex="-1">Use arrow keys to move between tabs, enter or spacebar to activate</div>',
                '<ul role="tablist" ng-attr-aria-label="{{tkModel.ariaLabel ? tkModel.ariaLabel : undefined}}">',
                '<li role="presentation" ng-class="{\'tk-tpnl-selected\':isSelected($index), \'tk-tpnl-disabled\':pane.disabled}" ng-repeat="pane in tkModel.tabs" >',
                '<span id="{{tkModel.id+\'_tab\'+$index+\'_tab\'}}" role="tab" ng-click="selectTab(pane,$index,$event)" aria-selected="{{isSelected($index)}}"',
                'aria-expanded="{{tkModel.selectedIndex === $index}}" ng-keyup="tabKeyupHandler(pane, $index, $event);" ng-keydown="tabKeydownHandler($event)" aria-disabled="{{pane.disabled}}" uitk-navigable="!pane.disabled" tabindex="{{(tkModel.enableTabIndex && (tkModel.selectedIndex === $index))?0:-1}}" ng-attr-aria-controls="{{$index === tkModel.selectedIndex ? tkModel.id+\'_tab\'+$index+\'_tabpanel\' : undefined }}">{{ pane.title }}</span>',
                '</li>',
                '</ul>',
                '<div class="tk-tpnl-content">',
                    '<div id="{{tkModel.id+\'_tab\'+tkModel.selectedIndex+\'_tabpanel\'}}" ng-keyup="contentKeyupHandler($index, $event);" ng-keydown="contentKeydownHandler( $event);" aria-labelledby="{{tkModel.id+\'_tab\'+tkModel.selectedIndex+\'_tab\'}}" tabindex="{{isSelected($index)?0:-1}}" role="tabpanel"  ng-include="templateUrl">',
                '</div>',
                '</div>',
                '</div>'
            ].join('')
        };

}]);

})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */

angular.module('uitk.component.uitkTextField', ['uitk.uitkUtility', 'uitk.maxlength'])
.directive('uitkInput', ['$filter', '$interpolate', '$timeout', '$sce', 'uitkEvents', 'uitkLiveRegionService', '$locale', '$rootScope', function($filter, $interpolate, $timeout, $sce, uitkEvents, uitkLiveRegionService, $locale, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        /**
         * todo:This component is too large and we need to apply separation of concerns to between the filtering of fields and validations, and too many isolated scope params proves this components is getting out of hand. - clint.
         */
        scope: {
            id: '@',
            name: '@',
            model: '=?',
            tkLayout: '@',
            checkFieldValidation: '=?', // used to set required attributes programmatically
            checkRequireValidation: '=?', // used to set ng-required attributes programmatically
            formatErrorFlag: '=?',
            tkRequired: '=',
            tkMinlength: '@',
            tkMaxlength: '@',
            tkMinValue: '@',
            tkMaxValue: '@',
            tkInvalidNumber: '=?',
            valueOutOfRangeMessage: '@',
            maxCharacterAllowed: '@',
            maxCharacterAllowedMessage: '@',
            tkPattern: '@',
            styleClass: '@',
            tkErrorClass: '=',
            tkAriaDescribedby: '@',
            tkAriaLabelledby: '@',
            tkType: '@',
            emailPattern: '@',
            validateEmail: '@',
            emailErrorMessage: '@',
            tkDisabled: '=',
            tkReadonly: '@',
            tkPlaceholder: '@',
            onBlur: '&', //callback functionality for blur event.
            onFocus: '&', //callback functionality for blur event.
            onKeyup: '&',
            onKeypress: '&',
            onKeydown: '&',
            onChange: '&',
            tkStaticAriaDescribedby: '@', //static aria described by that will be applied for assistive text.
            tkSupressDescribedby: '=',
            tkSupressMessage: '=',
            tkShowHideIcon: '=?',
            tkShowHideText: '=?',
            tkShowPassword: '=?',
            tkSupressMaxCharacterDescribedby: '=?',
            tkFieldName: '@'
        },
        controller: ["$scope", function($scope) {
            //Update maximum allowed character count
            if ($scope.maxCharacterAllowed) {
                $scope.maxCharCount = $scope.maxCharacterAllowed;
            }

            //Limit the maximum character count for phone, zip and ssn
            if ($scope.tkType === 'phone') {
                $scope.maxCharCount = 18;
            } else if ($scope.tkType === 'zip') {
                $scope.maxCharCount = 12;
            } else if ($scope.tkType === 'ssn') {
                $scope.maxCharCount = 13;
            }
        }],
        link: function(scope, element, attributes) {
            switch (scope.tkType) {
                case 'phone':
                    scope.typeOfInput = "tel";
                    break;
                case 'zip':
                    scope.typeOfInput = "text";
                    break;
                case 'ssn':
                    scope.typeOfInput = "text";
                    break;
                case 'password':
                    scope.typeOfInput = "password";
                    break;
                case 'email':
                    //IE 9 does not support type="email" so use type="text"
                    if (bowser && bowser.name == "Internet Explorer" && bowser.version == "9.0") {
                        scope.typeOfInput = "text";
                    } else {
                        scope.typeOfInput = "email";
                    }
                    break;
               case 'number':
                    //IE 9 does not support type="number" so use type="text"
                    if ((bowser && bowser.name == "Internet Explorer")||
                        (bowser && bowser.name == "Firefox")
                        ) {
                        scope.typeOfInput = "text";
                    } else {
                        scope.typeOfInput = "number";
                    }
                    break;

                default:
                    scope.typeOfInput = "text";
                    break;
            }

            var validateInputPhoneNumber = function(number) {
                var regexString = new RegExp('^[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$');
                return regexString.test(number);
            };

            $rootScope.$on('$localeChangeSuccess', function() {
                //$scope.inputType = attributes['tkType'];
                if (scope.tkType === 'phone') {
                    var value = String(scope.model);
                    var number = value.replace(/[^0-9-]+/g, '');
                    if (validateInputPhoneNumber(number)) {
                        scope.model = scope.formatPhoneNumber(number);
                    }
                }
            });

            if (scope.checkFieldValidation === undefined) {
                scope.checkFieldValidation = false;
            }

            if (scope.checkRequireValidation === undefined) {
                scope.checkRequireValidation = true;
            }

            scope.extraClasses = attributes['styleClass'];
            scope.locale = "";
            scope.inputType = attributes['tkType'];

            //Initialize the model text to an empty string if undefined. Otherwise, firefox and chrome
            //will report to the accessability engine it is invalid and read it is such on the first
            //visit to the field.
            scope.model = scope.model || '';

            scope.initialValue = scope.model;

            if (attributes['value']) {
                scope.model = attributes['value'];
            }

            if (scope.maxCharacterAllowed && !scope.maxCharacterAllowedMessage) {
                scope.maxCharacterAllowedMessage = "Accepts no more than " + scope.maxCharacterAllowed + " characters";
            }

            /*
             * Watch on changeLocale variable,
             * This function will re format the phone number according to locale.
             */
            scope.$on("changeLocale", function() {
                scope.inputType = attributes['tkType'];
                if (scope.inputType === 'phone') {
                    var value = String(scope.model);
                    var number = value.replace(/[^0-9-]+/g, '');
                }
            });

            scope.$watch("model", function(newValue) {
                if (newValue !== scope.initialValue) {
                    scope.checkFieldValidation = true;
                }
            });

            /*
             * This function will get invoked on blur of input text field.
             * It will identify filter type and apply it accordingly
             */
            scope.blurEvent = function(event, value) {
                scope.checkFieldValidation = true;
                $timeout(function() {
                    scope.onBlur({"event":event});

                    //The following logic taken from view in an attempt to refactor and expose the addition of error message.
                    scope.showInternalMessageOne = false;
                    scope.showInternalMessageTwo = false;
                    if (scope.tkLayout && scope.formatErrorFlag && (scope.format !== 'email' || (scope.format === 'email' && scope.emailErrorMessage === undefined))) {
                        if (!scope.tkSupressMessage) {
                            scope.showInternalMessageOne = true;
                        }
                    }

                    if (scope.formatErrorFlag && (scope.format !== 'email' || (scope.format === 'email' && scope.emailErrorMessage === undefined))) {
                        if (!scope.tkSupressMessage) {
                            scope.showInternalMessageTwo = true;
                        }
                    }

                    if (scope.showInternalMessageTwo === true || scope.showInternalMessageOne === true) {
                        scope.invalidFormatErrorMessage = "Invalid format."
                    }
                    if(scope.tkInvalidNumber && !scope.valueOutOfRangeMessage) {
                        if (scope.tkMaxValue && scope.tkMinValue ) {
                            scope.valueOutOfRangeMessage = "Enter numeric value in between " + scope.tkMinValue + " and " + scope.tkMaxValue;
                        }
                        else {
                            scope.valueOutOfRangeMessage = "Enter a number.";
                        }
                    }
                });

                if (scope.inputType === 'phone' && this.tkPattern) {
                    //pattern will fire on phone therefore value will be undefined
                    if (event.target.value.length >= 10) {
                        value = event.target.value;
                    }
                }

                if (value === '' || value === undefined) {
                    scope.formatErrorFlag = false;
                    scope.tkInvalidNumber = false;
                    return true;
                }

                scope.formatErrorFlag = false;

                var filterType = '';

                switch (scope.inputType) {
                    case 'phone':
                        filterType = 'phonenumber';
                        break;
                    case 'zip':
                        filterType = 'zipcode';
                        break;
                    case 'ssn':
                        filterType = 'ssnnumber';
                        break;
                    case 'password':
                        filterType = 'password';
                        break;
                    case 'email':
                        filterType = 'email';
                        break;
                    default:
                        filterType = '';
                        break;
                }

                if (filterType === 'phonenumber') {
                    if (validateInputPhoneNumber(value)) {
                        scope.model = scope.formatPhoneNumber(value);
                    } else {
                        scope.formatErrorFlag = true;
                    }
                } else if (filterType === 'zipcode') {
                    scope.model = formatZip(value);
                } else if (filterType === 'ssnnumber') {
                    scope.model = formatSSN(value);
                } else if (filterType === 'email') {
                    validateEmail(scope.model);
                } else if(scope.tkType === 'number'){
                    validateNumberRange(scope.model);
                }
            };

            function validateNumberRange(text){
                var reg = new RegExp(/^[+-]?[0-9]*$/);
                if(!reg.test(text)){
                    scope.tkInvalidNumber = true;
                    scope.formatErrorFlag = true;

                }
                else {
                    if (text < Number(scope.tkMinValue) || text > Number(scope.tkMaxValue)) {
                        scope.tkInvalidNumber = true;
                        scope.formatErrorFlag= true;
                    }
                    else {
                        scope.tkInvalidNumber = false;
                    }
                }
            }
            /*
             * This function takes email as input and validates it according to default pattern or pattern provided to directive.
             * After validation it will set format and formatErrorFlag to display error message.
             * @param {text} email
             */
            function validateEmail(email) {
                if (scope.validateEmail || _.isUndefined(scope.validateEmail)) {
                    var emailRegEx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

                    if (scope.emailPattern) {
                        emailRegEx = new RegExp(scope.emailPattern);
                    }

                    if (!emailRegEx.test(email)) {
                        scope.format = 'email';
                        scope.formatErrorFlag = true;
                    }
                }
            }

            /*
             * This function grabs the phone number pattern set in the translation file and returns it's length.
             * If one isn't set then it defaults to the US length of 10.
             */
            function getPhoneNumberLength() {
                var phonePattern = scope.getPhoneNumberPattern();
                phonePattern = phonePattern.replace(/-|\s/g, "");

                return phonePattern.length;
            }

            /*
             * This function grabs the phone number pattern set in the translations file.
             * If one isn't set then it defaults to the US pattern of 555-555-5555.
             */
            scope.getPhoneNumberPattern = function() {
                var phonePattern = $interpolate("{{'555-555-5555' | uitkTranslate}}")() || '555-555-5555';

                return phonePattern;
            }

            /*
             * This function takes number as input and formats it according to phone number pattern('###-###-####')
             */
            scope.formatPhoneNumber = function(number) {
                var pattern, phoneLength;

                //get the phone number format
                pattern = scope.getPhoneNumberPattern();

                //get the phone number length
                phoneLength = getPhoneNumberLength();

                //return if number is not valid and display error message
                if (number.length > 0) {
                    if (!validateInputPhoneNumber(number) || number.replace(/[^0-9]/g, "").length !== phoneLength) {
                        //scope.format = pattern;
                        scope.formatErrorFlag = true;
                        return number;
                    } else {
                        scope.formatErrorFlag = false;
                    }
                }

                var tempNumber = number.replace(/[^0-9]/g, '').replace(' ', '');

                if (!tempNumber) {
                    return '';
                }

                var formattedNumber = String(tempNumber);
                var pattern_array = pattern.split("-");

                var l1 = pattern_array[0].length;
                var l2 = pattern_array[1].length + pattern_array[0].length;
                var l3 = pattern_array[2].length + pattern_array[1].length + pattern_array[0].length;

                var area, front, end;

                if (pattern === '555-555-5555') {
                    area = tempNumber.substring(0, l1);
                    front = tempNumber.substring(l1, l2);
                    end = tempNumber.substring(l2, l3);
                } else if (pattern === '5555-555-5555') {
                    area = tempNumber.substring(0, 4);
                    front = tempNumber.substring(4, 7);
                    end = tempNumber.substring(7, 11);
                } else if (pattern === '55-5555-5555') {
                    area = tempNumber.substring(0, 2);
                    front = tempNumber.substring(2, 6);
                    end = tempNumber.substring(6, 10);
                }

                if (front) {
                    formattedNumber = (area + "-" + front);
                }

                if (end) {
                    formattedNumber += ("-" + end);
                }

                if (formattedNumber.length === l1 && number.length === l1 + 1 && number.charAt(l1) === '-') {
                    formattedNumber += "-";
                }

                if (formattedNumber.length === l2 + 1 && number.length === l2 + 2 && number.charAt(l2 + 1) === '-') {
                    formattedNumber += "-";
                }

                return formattedNumber;
            }


            /*
             * This function takes number as input and formats it according to zipcode pattern('#####-####')
             */
            function formatZip(number) {
                //return if number is not valid and display error message
                if (!validateInputNumber(number) || number.replace(/[^0-9]/g, "").length !== 9) {
                    scope.format = '55555-5555';
                    scope.formatErrorFlag = true;
                    return number;
                }

                var tempNumber = number.replace(/-/g, '').replace(' ', '');

                if (!tempNumber) {
                    return ''; }

                var formattedNumber = String(tempNumber);

                // #####-####
                var front = tempNumber.substring(0, 5);
                var end = tempNumber.substring(5, 9);

                if (end) {
                    formattedNumber = (front + "-" + end);
                }

                if (formattedNumber.length === 5 && number.length === 6 && number.charAt(5) === '-') {
                    formattedNumber += "-";
                }

                return formattedNumber;
            }

            /*
             * This function takes number as input and formats it according to ssn pattern('###-##-####')
             */
            function formatSSN(number) {

                //return if number is not valid and display error message
                if (!validateInputNumber(number) || number.replace(/[^0-9]/g, "").length !== 9) {
                    scope.format = '555-55-5555';
                    scope.formatErrorFlag = true;
                    return number;
                }

                var tempNumber = number.replace(/-/g, '').replace(' ', '');

                if (!tempNumber) {
                    return ''; }

                var formattedNumber = String(tempNumber);

                // ###-##-####
                var front = tempNumber.substring(0, 3);
                var mid = tempNumber.substring(3, 5);
                var end = tempNumber.substring(5, 9);

                if (mid) {
                    formattedNumber = (front + "-" + mid);
                }

                if (end) {
                    formattedNumber += ("-" + end);
                }

                if (formattedNumber.length === 3 && number.length === 4 && number.charAt(3) === '-') {
                    formattedNumber += "-";
                }

                if (formattedNumber.length === 6 && number.length === 7 && number.charAt(6) === '-') {
                    formattedNumber += "-";
                }

                return formattedNumber;
            }

            /*
             * This function checks whether number is valid or not
             * valid number only contains digit and '-'(hyphen)
             */
            function validateInputNumber(number) {
                var regex = new RegExp('^[0-9 -]*$');
                return regex.test(number);
            }

            //Callback method for keypress event, $timeout is used as model and field status(dirty, invalid) should be updated first then it should fire event
            scope.keypressEvent = function(event) {
                $timeout(function() {
                    scope.onKeypress({"event":event});
                });
            };

            //This function truncates character if paste text is greater than maxCharacterAllowed
            scope.pasteEvent = function(event) {
                var pasteText;
                if (window.clipboardData && window.clipboardData.getData) { // IE
                    pasteText = window.clipboardData.getData('Text');
                }
                else if (event.originalEvent.clipboardData && event.originalEvent.clipboardData.getData) { // other browsers
                    pasteText = event.originalEvent.clipboardData.getData('text/plain');

                }

                if (scope.maxCharacterAllowed && (scope.model || '').length + pasteText.length > scope.maxCharacterAllowed) {
                    scope.model = ((scope.model || '') + pasteText).substring(0, scope.maxCharacterAllowed);
                    event.preventDefault();
                }
            }

            //Callback method for keyup event, $timeout is used as model and field status(dirty, invalid) should be updated first then it should fire event
            scope.keyupEvent = function(event) {
                //When Dragon Naturally Speaking (DNS) sets a text box value in response to speaking a word,
                //only the element's value is updated. The underlying angular model doesn't see the change,
                //resulting in the view and model getting out of sync.
                var elName = '#' + scope.id + '_input';
                var el = angular.element(elName);
                var ctrl = el.controller('ngModel');

                if (ctrl && el.val() !== ctrl.$modelValue) {
                    ctrl.$setViewValue(el.val());
                    ctrl.$render();
                }

                $timeout(function() {
                    scope.onKeyup({"event":event});
                });
            };

            //Callback method for keydown event, $timeout is used as model and field status(dirty, invalid) should be updated first then it should fire event
            scope.keydownEvent = function(event) {
                $timeout(function() {
                    scope.onKeydown({ "event": event });
                });
            };

            //Callback method for onChange
            scope.onchangeEvent = function() {
                $timeout(function() {
                    scope.onChange();
                });
            };

            //Callback method for focus event, $timeout is used as model and field status(dirty, invalid) should be updated first then it should fire event
            scope.focusEvent = function(event) {
                $timeout(function() {
                    scope.onFocus({"event":event});
                });
            };

            scope.getAriaDescribedBy = function() {
                scope.ariaDescribedByIds = '';
                //a11y implemented for show/hide password input field
                if (scope.tkShowHideIcon || scope.tkShowHideText) {
                    scope.ariaDescribedByIds += " " + scope.id + "_inputmask";
                }
                if (scope.formatErrorFlag) { // For fields with format errors
                    scope.ariaDescribedByIds = scope.id + "_format_err";
                }
                if (scope.tkAriaDescribedby) { // For fields with validation errors
                    scope.ariaDescribedByIds += " " + scope.tkAriaDescribedby;
                }
                if (scope.tkStaticAriaDescribedby) { // for fields with input tips like 555-555-5555
                    scope.ariaDescribedByIds += " " + scope.tkStaticAriaDescribedby;
                }
                if (scope.maxCharacterAllowed && !scope.tkSupressMaxCharacterDescribedby) {
                    scope.ariaDescribedByIds += " maxCharacterAllowedMessage";
                }

                return scope.ariaDescribedByIds ? scope.ariaDescribedByIds.trim() : undefined;
            };

            //use icon (or text) to show/hide the text with in a textfield component.
            if (scope.tkShowHideIcon === undefined) {
                scope.tkShowHideIcon = false;
            }

            if (scope.tkShowHideText === undefined) {
                scope.tkShowHideText = false;
            }

            if (scope.tkFieldName === undefined) {
                scope.tkFieldName = 'Password';
            }

            // Show/Hide password functionality
            scope.tkActiveText = 'Show';
            scope.tkShowHide = true;
            scope.tkPasswordMasking = scope.tkFieldName +  ' is hidden'; // a11y - password default state hidden

            //if isAriaLiveAnnounced is set to true in the template uitkLiveRegionService will announce
            scope.showHideInput = function(isAriaLiveAnnounced) {
              scope.tkShowHide = !scope.tkShowHide;

              if (!scope.tkShowHide) {
                var message = $interpolate('{{\'' + scope.tkFieldName + '\ is showing\' | uitkTranslate}}')() || 'Password is showing';
                scope.typeOfInput = 'text';
                scope.tkActiveText = 'Hide';
                uitkEvents.setScope(scope).emit('textfield', scope.id + '-password-state-change', { passwordState: "visible" });
                //a11y implemented for show/hide password button icon
                scope.tkPasswordMasking = message;
                if(isAriaLiveAnnounced) {
                  uitkLiveRegionService.alertMessage(message);
                }

              } else {
                var message = $interpolate('{{\'' + scope.tkFieldName + '\ is hidden\' | uitkTranslate}}')() || 'Password is hidden';
                scope.typeOfInput = 'password';
                scope.tkActiveText = 'Show';
                uitkEvents.setScope(scope).emit('textfield', scope.id + '-password-state-change', { passwordState: "hidden" });
                //a11y implemented for show/hide password button text
                scope.tkPasswordMasking = message;
                if(isAriaLiveAnnounced) {
                  uitkLiveRegionService.alertMessage(message);  
                }
              }
            };

            scope.$watch('tkShowPassword', function(newValue, oldValue) {
                if ((newValue === true && !!scope.tkShowHide) || (newValue === false && scope.tkShowHide === false)) {
                    scope.showHideInput(false);
                }
            });
        },
        templateUrl: 'template/uitk-text-field.html'
    };
}]);

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
/*
 * Release 3.5 changes - Integrated character count functionality, introduced blur and focus callback functions   
 */
var textAreaApp = angular.module('uitk.component.uitkTextarea',['uitk.maxlength','uitk.uitkUtility']);
textAreaApp.directive('uitkTextarea', ["$timeout", "$compile", "uitkLiveRegionService", function($timeout, $compile, uitkLiveRegionService){
	return {
		restrict : 'E',
		replace : true,
		transclude: true,
		require: '?^^uitkField',
		scope : {
			id: '@',
			model: '=',
			checkFieldValidation: '=?', // used to set required attributes programmatically
			maxCharCount: '@', //maximum characters
			name: '@',
			rows: '@',
			width: '@',
			height: '@',
			extraClasses: '@',
			tkErrorClass: '=',
            tkDisabled:'=',
			tkRequired:'@',
            tkTurnOffCharacterCount:'=',
			tkAriaDescribedby: '@',
	        onBlur: '&',  //callback functionality for blur event.
	        onFocus: '&', //callback functionality for blur event.
	        onKeyup: '&'
		},
		link : function($scope, $element, $attr, fieldCtrl) {
			$scope.extraClasses = $attr['styleClass']; 
			$scope.busyFlag = 'false';
			var timeupPromise = null;
			$scope.initialValue = $scope.model;

			if($scope.checkFieldValidation === undefined) {
				$scope.checkFieldValidation = false;
			}

			$scope.isFormLayoutChild = fieldCtrl && fieldCtrl.isFormField();

			$scope.txtAreaSize = {
				width: $scope.width,
				height: $scope.height
			};

			/*
			 * Keep watch on textarea content
			 */
			$scope.$watch('model',function(newVal,oldVal){
				if($scope.model === undefined) {
					$scope.model = "";
				}
				/*Added below condition to avoid screen reader reading the character count when ever there is any
				 change in the model value from undefined to "" or vice versa*/
				if((oldVal === undefined && newVal === "") || (newVal === undefined && oldVal === "") || !!$scope.tkTurnOffCharacterCount){
					return;
				}
				if(newVal !== $scope.initialValue) {
					$scope.checkFieldValidation = true;
				}
                $scope.ariaLiveFlag = 'off';
				$timeout.cancel(timeupPromise);
				
				timeupPromise = $timeout(function(){//todo: we should not be removing from the DOM like the following example.
                	$('#'+$scope.id+'_sub_character_remaining').remove();    

                    // Turn the live region off if there's no char in the text area
                    if ( $scope.model.length === 0 ) {
                        $scope.ariaLiveFlag = 'off';
                    }
                    else {
                        //$scope.ariaLiveFlag = 'polite';
                        if($scope.maxCharCount) {
                            uitkLiveRegionService.alertMessage(($scope.maxCharCount - $scope.model.length) + " characters remaining"); //announce the number of characters remaining using uitkLiveRegionService service
                        }
                    }

                    $timeout(function(){
                    	// hides in form layout view
						if (!$scope.isFormLayoutChild) {
							$('#'+$scope.id+'_character_remaining').append($compile('<div id="'+$scope.id+'_sub_character_remaining">'+($scope.maxCharCount - $scope.model.length) + " <span translate>characters remaining</span></div>")($scope));
						}
                    },10);

				},500);

				//$scope.$emit('character-remaining', ($scope.maxCharCount - $scope.model.length));
			});

			/*
			 * This method is used to announce "zero character remaining" when user enters character after max limit
			 */
			$scope.onKeyupEvent = function(){
                if($scope.tkTurnOffCharacterCount){
                    return;
                }
				//When Dragon Naturally Speaking (DNS) sets a text box value in response to speaking a word,
				//only the element's value is updated. The underlying angular model doesn't see the change,
				//resulting in the view and model getting out of sync.
			    var elName = '#' + $scope.id + '_textarea';
				var el = angular.element(elName);
				var ctrl = el.controller('ngModel');
				if(ctrl && el.val()!==ctrl.$modelValue) {
					ctrl.$setViewValue(el.val());
					ctrl.$render();
				}

				if($scope.maxCharCount - $scope.model.length === 0){
                    $scope.ariaLiveFlag = 'off';
                    $timeout(function () {//todo: we should not be removing from the DOM like the following example.
                        // $('#'+$scope.id+'_sub_character_remaining').remove();//todo:why is this added here for a11y? test case? -this is causing a bug where the total count text is being added to the DOM multiple times-DE96326
                        $scope.ariaLiveFlag = 'polite';
                       /* $timeout(function(){
                            $('#'+$scope.id+'_character_remaining').append('<div id="'+$scope.id+'_sub_character_remaining">'+($scope.maxCharCount - $scope.model.length) + " characters<span class='oui-a11y-hidden'> remaining</span></div>");//todo:why is this added here for a11y? test case? -this is causing a bug where the total count text is being added to the DOM multiple times-DE96326
                        },10);*/
					},500);
				}
			};

			/*
			 * This method is used to set required attribute to the text area programmatically
			 */
			$scope.blurEvent = function(event) {
				$scope.checkFieldValidation = true;
				$timeout(function(){
					$scope.onBlur(event);
				}, 500);
			};


			/*
			 * Keep watch on tkAriaDescribedby
			 * Format aria-describedby attribute value
			 *
			 */
			$scope.$watch('tkAriaDescribedby',function(newVal) {
				$scope.describedByText = '';
				if(newVal !== undefined && newVal !== ''){
					$scope.describedByText += newVal + " ";
				}
				if (!$scope.maxCharCount && $scope.isFormLayoutChild)
				$scope.describedByText += $scope.id + "_character_remaining";
			});

		},
		template: '<div>'+ 
				  	'<textarea id="{{id}}_textarea" ng-style="txtAreaSize"  ng-keyup="onKeyup();onKeyupEvent()" ng-disabled="tkDisabled" ng-blur="blurEvent($event);" name="{{name}}" ng-class="{\'tk-form-field-error\':tkErrorClass} {{extraClasses}}" ng-focus="onFocus()" uitk-maxlength={{maxCharCount}} ng-model="model" rows="{{rows}}" class="tk-form-textarea" ng-trim="false" aria-describedby="{{describedByText}}" aria-required="{{tkRequired ? true : false}}" ng-required="(tkRequired && checkFieldValidation) ? true : false" ng-attr-aria-invalid="{{tkErrorClass == \'\' ? undefined : tkErrorClass}}"></textarea>' +
				  	'<div class="tk-textarea-tip" ng-if="maxCharCount && !isFormLayoutChild && !tkTurnOffCharacterCount " tabindex="-1">' +
				  		'<div id="{{id}}_character_remaining" aria-live="{{ariaLiveFlag}}" aria-atomic="true" aria-relevant="additions" tabindex="-1"><div id="{{id}}_sub_character_remaining">{{maxCharCount - model.length}} {{"characters remaining" | uitkTranslate}}</div></div>' +
				  	'</div>' +
				  '</div>'
	};
}]);

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.15.0
 */
/*
 * This module wraps CKEditor in Angular JS directive. Optional configuration parameters are injected as provided by consuming application.  
 */
angular.module('uitk.component.uitkTexteditor', [])
.directive('uitkTexteditor', function(){
	function link($scope, $element) {
		//Throw exception if id is not provided
		// Done some refactoring to make it testable
		 try {
			 if (!$scope.model.id) {
				$element.html('Error: NoIdFoundException');
				throw {
					name : 'NoIdFoundException',
					message : 'Id is missing'
				};
			 }
		 } catch(err) {
			 // see error
		 }
 		
 		//Extra plugins configuration
 		var extraPlugins = 'button,panel,floatpanel,panelbutton,colorbutton';
 		
 		//Check if plugins configured outside of component
 		if($scope.model.extraPlugins) {
 			extraPlugins = extraPlugins + ',' + $scope.model.extraPlugins;
 		}

		$element[0].id = $scope.model.id;
		
		var defaultConfig = {
			width : '50em', //Default text editor height and width if not provided by consuming application
			height : '20em',
			extraPlugins : extraPlugins,
			removeButtons : 'Underline,Subscript,Superscript,Format' //Remove unwanted buttons
		};

        var config = {};

        angular.extend(config, defaultConfig, $scope.model.userConfig);

		//Update config object with provided inputs
		if($scope.model.editorSize) {
			if($scope.model.editorSize.width) {
				config['width'] = $scope.model.editorSize.width;
			}
			if($scope.model.editorSize.height) {
				config['height'] = $scope.model.editorSize.height;
			}
		}

		//Applying custom text styles
		config['stylesSet'] = [
        	{ name: 'Heading 1', element: 'h1', styles : {'color': '#63666A', 'font-size': '2em'} },
        	{ name: 'Heading 2', element: 'h2', styles:{'color': '#793605', 'font-size': '1.667em', 'font-weight':'bold'} },
        	{ name: 'Heading 3', element: 'h3', styles:{'color': '#282A2E', 'font-size':'1.5em', 'font-weight':'bold'} },
        	{ name: 'Heading 4', element: 'h4',  styles:{'color': '#63666A', 'font-size':'1.333em', 'font-weight':'bold'}},
        	{ name: 'Heading 5', element: 'h5',  styles:{'color': '#282A2E', 'font-size':'1.167em', 'font-weight':'bold'}},
        	{ name: 'Heading 6', element: 'h6',  styles:{'color': '#793605', 'font-size':'1.167em', 'font-weight':'bold'}},
        	{ name: 'Marker', element: 'span', attributes: { 'class': 'marker' } },
        	{ name: 'Big', element: 'big' },
        	{ name: 'Small', element: 'small' }
		];		
		
		//Invoke CKEditor 
		CKEDITOR.replace($element[0], config);

        //To reload the CKEditor with custom styles given by user
        $scope.model.refreshEditor = function() {
            CKEDITOR.instances[$element[0].id].destroy(true);
            angular.extend(config, defaultConfig, $scope.model.userConfig);
            CKEDITOR.replace($element[0], config);
        };
		
		//Function used to get text editor content
		$scope.model.getData = function() {
			return CKEDITOR.instances[$scope.model.id].getData();
		};
	}
	
	return {
		restrict : 'E',
		replace : true,
		scope : {
			model : '='
		},
		link : link,
		template : [
			'<textarea>',
			'</textarea>'
		].join('')
	};
});

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
/**
 * Theme Builder for Home QA - provides ability to toggle which theme is displayed
 * @returns {{scope: {files: string, label: string, theme: string}, link: Function, template: string}}
 */
(function () {
    var uitkThemeRoller =  function ($http) {
        return {
            scope: {
                files: '@',
                label: '@',
                theme:'@'
            },
            /**
             *
             * @param scope
             * @param element
             * @param attrs
             * @param aCtrl
             */
            link: function (scope, element, attrs, aCtrl) {
                scope.splitFiles = scope.files.split(',');

                /**
                 * Function to grab the config file, which is used to construct the dropdown
                 * New array is built from the config file data so the dropdown and <link> tags can be constructed
                 */
                //scope.buildConfigFile = function() {
                    $http.get('../theme-roller/theme-config.json').then(function(result) {
                        var configData = result.data;
                        scope.items = [];

                        //TODO: see if there's a way to break this down into smaller chunks, maybe refactor the objects to make them easier to get to
                        for(var key in configData) {
                            for(var c = 0; c < scope.splitFiles.length; c++) {
                                if(configData[key].component === scope.splitFiles[c]) {
                                    if(scope.items.length < 1) {
                                        // first theme object so we know it's not a duplicate and safe to add to our items array
                                        scope.items.push({'label' : configData[key].theme, 'value' : configData[key].theme, 'files' : [configData[key].file]});
                                    } else {
                                        if(scope.checkIfThemeExists(configData[key].theme)) {
                                            // building out the CSS files array needed for each theme
                                            for(var i = 0; i < scope.items.length; i++) {
                                                // making sure its being added to the right theme files array
                                                if(configData[key].theme === scope.items[i].label) {
                                                    scope.items[i].files.push(configData[key].file);
                                                }
                                            }
                                        } else {
                                            // we know the theme doesnt exist yet so it's safe to add to our items array
                                            scope.items.push({'label' : configData[key].theme, 'value' : configData[key].theme, 'files' : [configData[key].file]});
                                        }
                                    }
                                }
                            }
                        }
                    });
                //};
                //scope.buildConfigFile();

                /**
                 * Helper function to make sure that we aren't adding duplicate theme objects to our items array
                 * @param obj (string) - theme name
                 * @returns {boolean}
                 */
                scope.checkIfThemeExists = function(obj) {
                    if(scope.items.length > 0) {
                        for(var x = 0; x < scope.items.length; x++) {
                            if(obj === scope.items[x].label) {
                                return true;
                            }
                        }
                    }
                    return false;
                };

                /**
                 * Function that builds out the <link> tags for the theme selected from the dropdown and appends in to the <head> tag
                 * Also checks to see if there are any <link> tags not belonging to the selected theme and removes them
                 * @param id  (string) - id that is appended to each link created by the appendTheme function
                 * @param url - (string) - is the url added to the 'href' attribute on the <ling> tag
                 */
                scope.appendTheme = function (id,url) {
                    var links = angular.element.find('[id*="comp_"]') || [];
                    var cssId = id;
                    var theme = id.slice(7);

                    if(links.length !== 0) {
                        for(var x = 0; x < links.length; x++) {
                            var linkTheme = links[x].id.slice(7);
                            if(linkTheme !== theme) {
                                angular.element(links[x]).remove();
                            }
                        }
                    }

                    if (!document.getElementById(cssId)) {
                        var head = document.getElementsByTagName('head')[0];
                        var link = document.createElement('link');
                        link.id = cssId;
                        link.rel = 'stylesheet';
                        link.type = 'text/css';
                        link.href = url;
                        link.media = 'all';
                        head.appendChild(link);
                    }
                };

                /**
                 * Helper function to remove all theme links appended to the <head>
                 * Called when someone selects the default dropdown option
                 */
                scope.removeTheme = function() {
                    var links = angular.element.find('[id*="comp_"]') || [];
                    if(links.length !== 0) {
                        for(var x = 0; x < links.length; x++) {
                            angular.element(links[x]).remove();
                        }
                    }
                };

                /**
                 * This scrubs the data from the config file to make sure it's in the correct format before sending it to the appendTheme() function
                 * Called when someone selects a value from the dropdown
                 * @param selectedTheme (string) - value of the selected theme from the dropdown
                 */
                scope.changeTheme = function(selectedTheme) {
                    if(selectedTheme === "") {
                        scope.removeTheme();
                    } else {
                        for(var i = 0; i < scope.items.length; i++) {
                            if(scope.items[i].value === selectedTheme) {
                                for(var f = 0; f < scope.items[i].files.length; f++) {
                                    var cssID = 'comp_' + f + '_' + scope.items[i].label;

                                    var cssStr = scope.items[i].files[f].slice(16).replace(/\\/g,"/");
                                    var cssPath = '../../' + cssStr;
                                    scope.appendTheme(cssID, cssPath);
                                }
                            }
                        }
                    }
                };
            },
            template: ['<select id="themeDropDown" name="themeDropDown" ng-model="item" ng-change="changeTheme(item)" ><option value="">-- Select a Theme --</option><option ng-repeat="item in items track by $index" value="{{item.value}}">{{item.label}}</option></select>'].join('')
        };
    };
    uitkThemeRoller.$inject = ["$http"];

    angular.module('uitk.component.uitkThemeRoller',[])
        .directive('uitkThemeRoller', uitkThemeRoller);
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.15.0
 */

(function () {

    /**
     *
     * @returns {{restrict: string, replace: boolean, scope: boolean, link: link}}
     */
    var uitkTooltip = function(uitkLiveRegionService){

        function link($scope, $element, $attr) {
            //jQuery formatted selector to search for focusable items
            var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";


            var placement = $attr['tooltipPlacement'] ? $attr['tooltipPlacement'] : "below";
            var action = $attr['tooltipToggle'] ? $attr['tooltipToggle'] : "hover";


            $element.attr('tabindex', 0);

            // aria-disabled defaults to false but allows users to override that.
            if($attr["ariaDisabled"]) {
                $element.attr("aria-disabled", $attr["aria-disabled"]);
            }
            else {
                $element.attr("aria-disabled", false);
            }

            
            // The tooltip has a text link and a target area. Get a reference to the target area.
            var ttipTarget = $element.find('.oui-ttip-structure');
            var ttipTargetID = undefined;

            // We want to set the text link as the aria owner of the target. Does the target exist?
            if(ttipTarget && ttipTarget[0]) {
                // Does the target already have an id? Use it, otherwise use the id of the text link to create one.
                if(ttipTarget[0].id) {
                    ttipTargetID = ttipTarget[0].id;
                }
                else {
                    ttipTargetID = $element.attr('id') + '-description';
                    ttipTarget.attr('id', ttipTargetID);
                }

                $element.attr('aria-owns', ttipTargetID);
                $element.attr('aria-describedby', ttipTargetID);
            }

            switch(placement) {
                case 'below':
                    $element.addClass("oui-ttip");
                    break;
                case 'above':
                    $element.addClass("oui-ttip oui-ttip-above");
                    break;
                case 'left':
                    $element.addClass("oui-ttip oui-ttip-left");
                    break;
                case 'above-left':
                    $element.addClass("oui-ttip oui-ttip-above oui-ttip-left");
                    break;
            }

            //Esc key handler(keyCode = 27)
            $element.bind("keydown", function(event) {
                var $this = $(this);
                // get list of all children elements in given object
                var children = $this.find('*');

                // get list of focusable items
                var focusableItems = children.filter(focusableElementsString).filter(':visible');

                // get currently focused item
                var focusedItem = $( document.activeElement );

                // get the number of focusable items
                var numberOfFocusableItems = focusableItems.length;

                var focusedItemIndex = focusableItems.index(focusedItem);

                if(event.keyCode === 13 && !($element.hasClass('oui-ttip-visible'))) {
                    $scope.showTooltip();
                    angular.element($element[0].querySelector('span.oui-ttip-content')).focus();
                }
                else if( event.keyCode === 27 && $element.hasClass('oui-ttip-visible') ) {
                    $scope.hideTooltip();
                }

                else if ( event.keyCode == 9 ) { // tab or maj+tab
                    if ( !event.shiftKey && (focusedItemIndex == numberOfFocusableItems - 1) ) {
                        $scope.hideTooltip();
                    }
                    if ( event.shiftKey && focusedItemIndex=== -1 ){
                        $scope.hideTooltip();
                    }
                }
            });




                if(action === "hover" ) {

                    $element.bind("mouseenter", function(){
                        $scope.showTooltip();
                    });

                    $element.bind("focus", function() {
                        $scope.showTooltip();
                    });

                    $element.bind("mouseleave", function() {
                        $scope.hideTooltip();
                    });

                    $element.bind("blur", function() {
                        $scope.hideTooltip();
                    });
                }
                else { // action = click
                    $element.bind("click", function(){
                        $scope.showTooltip();
                    });
                }



            $scope.showTooltip = function() {
                if($scope.tooltipForTruncate === "true"){
                    var truncElement = $element[0].querySelector('span.tk-trunc');
                    if(truncElement.offsetWidth >= truncElement.scrollWidth ){
                        return;
                    }
                }

                var ttipTarget = angular.element($element[0].querySelector('span.oui-ttip-structure'));
                var ttipCloseIcon = angular.element($element[0].querySelector('a.tk-tooltip-close'));
                if(!!ttipCloseIcon){
                    ttipCloseIcon.bind('click', function(event){
                        $scope.hideTooltip();
                        event.stopPropagation();
                    })
                }
                ttipTarget.css("opacity","0");
                ttipTarget.stop();
                $element.addClass("oui-ttip-visible");
                setTimeout( function() {
                    ttipTarget.animate({opacity: 1}, 500);
                }, 3);

                ttipTarget.attr('aria-hidden', false);
                uitkLiveRegionService.alertMessage($element[0].innerText || $element[0].textContent);
            }

            $scope.hideTooltip = function() {
                var ttipTarget = angular.element($element[0].querySelector('span.oui-ttip-structure'));
                var ttipCloseIcon = angular.element($element[0].querySelector('a.tk-tooltip-close'));
                if(!!ttipCloseIcon){
                    ttipCloseIcon.unbind('click');
                }
                ttipTarget.css("opacity","1");
                ttipTarget.stop();
                ttipTarget.animate({opacity: 0}, 500, function () {
                    $element.removeClass("oui-ttip-visible");
                });

                ttipTarget.attr('aria-hidden',true);
            }

        }

        return {
            restrict : 'A',
            replace : true,
            scope : {
                tooltipForTruncate: '@'
            },
            link : link
        };
    };
    uitkTooltip.$inject = ["uitkLiveRegionService"];


    var uitkTooltipTextLink = function() {
      return {
        restrict : 'E',
        replace : true,
        transclude : true,
          scope : {
              tkText : '@',
          },
          template: "<span class='tk-ttip-text-link' ng-transclude>{{tkText}}</span>",
      };
    };

    /**
     *
     * @returns {{require: string, restrict: string, replace: boolean, transclude: boolean, scope: {id: string, ttipWidth: string}, link: link, template: string}}
     */
    var uitkTooltipContent = function() {

        function link($scope, $element, $attr) {

            //$scope.$parent.tooltipId = $attr['id'];
            $scope.tooltipId = $element[0].parentElement.id;
            $scope.descripbyId = $scope.id + '_desc';

            // If no ID provided, use the tooltip text's id to generate the name.
            if($attr['id']) {
                $element.attr("name", $attr['id']+"-name");
            }
            else {
                $element.attr("name", $scope.tooltipId+"-name");
            }

            $element.attr("aria-hidden", true);
            $element.attr('role', "tooltip");



            if ( $scope.richContent ) {
                //$element.attr("tabindex", 0);
                $element.attr('aria-haspopup', true);
                $element.attr('tabindex', 0);
            }
        }

        return {
            require : '^?uitkTooltip',
            restrict : 'E',
            replace : true,
            transclude : true,
            scope : {
                id: '@',
                ttipWidth : '@',
                richContent : '=',
                ttipCloseIcon : '@'
            },
            link : link,
            template: '<span class="oui-ttip-structure"><a href="javascript:void(0);" ng-if="ttipCloseIcon" class="tk-tooltip-close"><uitk:icon-font icon="oui-ttip-cux-icon-help cux-icon-close"></uitk:icon-font></a> <span class="oui-ttip-content" tabindex="-1" style="width: {{ttipWidth}};" ng-transclude> </span></span>'
        };
    };

    /**
     *
     * @returns {{restrict: string, scope: {tkContent: string}, template: string}}
     */
    var uitkTruncate = function() { //TODO: Need to decide if there is a better place to define this directive.
        // Placed this directive in tool tip file as it is dependent on the tooltip component and tooltip has some code referring to this element
        return {
            restrict : 'EA',
            scope : {
                tkContent : '@'
            },
            template: '<span uitk-tooltip class="tk-trunc-container" tooltip-for-truncate="true">' +
            '<span class="tk-trunc">{{tkContent}}</span> ' +
            '<uitk-tooltip-content>{{tkContent}}</uitk-tooltip-content>' +
            '</span>'
        };
    };

  angular.module('uitk.component.uitkTooltip',['uitk.uitkUtility'])
        .directive('uitkTooltip', uitkTooltip)
        .directive('uitkTooltipTextLink', uitkTooltipTextLink)
        .directive('uitkTooltipContent', uitkTooltipContent)
        .directive('uitkTruncate',uitkTruncate)
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */

(function () {
    /**
     * Primary directive for the tree component. Sets up the outermost div and p tags for the entire tree and
     * then recursively adds tree nodes for each element in utree.
     *
     * @returns {{restrict: string, scope: {utree: string,  uselectEvent: string, uselectedNode: string}, link: link, templateUrl: string}}
     */
    var uitkTreeDirective = function ($log, uitkEvents, NODE_STATE, uitkTools) {
        return {
            restrict: "E",
            scope: {
                utree: "=",

                //LEGACY: Support backward compatibility
                uselectEvent: "@", // support legacy
                uselectedNode: "=", // support legacy

                // New code
                // Not expect uselectEvent & uselectedNode
                viewModel: '=?'
            },

            controller: ["$scope", function ($scope) {

                /**
                 * Expand on return key when label has focus
                 * @param $event
                 * @param node
                 */
                this.onNodeKeyPress = function ($event, node) {
                    if ($event.keyCode === 13) {
                        this.onNodeToggleExpansion(node);
                    }
                };

                /**
                 * Make the name of this tree available to the nodes and content directives
                 * @returns {*}
                 */
                this.getComponentId = function () {
                    return $scope.componentId;
                };

                /**
                 * Display the CSS nodes and leafs
                 * @param treeNode
                 * @returns {*}
                 */
                this.getFolderClass = function (treeNode) {
                    if (this.treeNodeStateCollapsed(treeNode)) {
                        return $scope.viewModel.cssClassForClosedIcon;
                    } else if (this.treeNodeStateExpanded(treeNode)) {
                        return $scope.viewModel.cssClassForOpenIcon;
                    } else if (this.treeNodeStateLeaf(treeNode)) {
                        return $scope.viewModel.cssClassForLeafIcon;
                    } else {
                        $log.error('Node has an invalid state of ' + treeNode.state);
                    }
                };

                /**
                 * Display the CSS arrow icon for nodes and leafs
                 * @param {type} treeNode
                 * @returns {string}
                 */
                this.getIconClass = function (treeNode) {
                    if (this.treeNodeStateCollapsed(treeNode)) {
                        return "cux-icon-caret_right";
                    } else if (this.treeNodeStateExpanded(treeNode)) {
                        return "cux-icon-caret_down_centered";
                    } else if (this.treeNodeStateLeaf(treeNode)) {
                        return "tk-tree-leaf";
                    } else {
                        $log.error('Node has an invalid state of ' + treeNode.state);
                    }
                };

                /**
                 * Gets the description of the state of the node
                 * @param {object} treeNode
                 * @returns {string}
                 */
                this.stateDescription = function (treeNode) {
                    if (this.treeNodeStateCollapsed(treeNode))
                        return ' Collapsed';
                    if (this.treeNodeStateExpanded(treeNode))
                        return ' Expanded';
                    return ' Leaf';
                };

                /**
                 * Gets the states from the tree node
                 * @param {object} treeNode
                 * @returns {bool}
                 */
                this.treeNodeStateLeaf = function (treeNode) {
                    return NODE_STATE.LEAF === treeNode.state;
                };

                /**
                 * Gets the states from the tree node
                 * @param {object} treeNode
                 * @returns {bool}
                 */
                this.treeNodeStateCollapsed = function (treeNode) {
                    return NODE_STATE.COLLAPSED === treeNode.state;
                };

                /**
                 * Gets the states from the tree node
                 * @param {object} treeNode
                 * @returns {bool}
                 */
                this.treeNodeStateExpanded = function (treeNode) {
                    return NODE_STATE.EXPANDED === treeNode.state;
                };

                /**
                 * Internal event handler for node selection. Captures a standard angular event and propagates
                 * a uitk version. We are using angular events internally so the user's cannot turn them off in
                 * the framework configuration. That would break the tree's functionality.
                 */
                this.onNodeSelect = function (node) {
                    $scope.viewModel.selectNode(node);
                    $scope.viewModel.toggleExpansion(node);
                    uitkEvents.setScope($scope).emit('tree', $scope.componentId + '-NodeSelected', node);
                };

                /**
                 * Internal event handler for toggling the expansion of non-leaf nodes.
                 */
                this.onNodeToggleExpansion = function (node) {
                    $scope.viewModel.toggleExpansion(node);
                    uitkEvents.setScope($scope).emit('tree', $scope.componentId + '-ExpansionToggled', node);
                };

                /**
                 * Internal event handler for toggling the state of checkboxes
                 */
                this.onNodeToggleChecked = function (node) {
                    node.isIndeterminate = false;
                    checkChildren(node);
                    checkParents(node);
                    uitkEvents.setScope($scope).emit('tree', $scope.componentId + '-CheckToggled', node);
                };

                /**
                 * Returns whether the tree is configured to display check boxes
                 * @returns {boolean|*}
                 */
                this.displayCheckBoxes = function () {
                    return $scope.viewModel.useCheckBoxes;
                };


                /**
                 * Returns whether the is configured to display icons
                 * @returns {boolean|*}
                 */
                this.displayIcons = function () {
                    return $scope.viewModel.useIcons;
                };
            }],

            /**
             * add link function to allow unique identify for each instance of tree elements
             *
             * @param {type} scope
             * @param {type} element
             * @param {type} attrs
             */
            link: function (scope, element, attrs) {
                scope.componentId = uitkTools.ComponentId(attrs.id, ((scope.viewModel) ? scope.viewModel : scope.utree), element, 'Tree');

                if (!scope.viewModel) {
                    //LEGACY: We need to support backward compatibility
                    scope.viewModel = scope.utree;
                    scope.viewModel.uselectEvent = scope.uselectEvent;
                    scope.viewModel.uselectedNode = scope.uselectedNode;
                    scope.viewModel.uniqueTreeId = scope.componentId;
                }

                /**
                 * Visits each node in the tree or subtree specified by the node, calling function fn for each one.
                 * @param node Root of the heirarchy to visit. Allows fn to be applied to the entire tree or a subtree.
                 * @param fn A single parameter function to apply to each node in the first parameter.
                 */
                scope.viewModel.forEachNode = function (node, fn) {
                    fn(node);
                    if (node.children) {
                        angular.forEach(node.children, function (child) {
                            scope.viewModel.forEachNode(child, fn);
                        })
                    }
                };

                /**
                 * Insert an new node into the tree
                 * @param node The node to insert
                 * @param parent [Optional] The parent node for the new node. Defaults to the root.
                 * @param index [Optional] The index in parent's children where to add the node. Defaults to the end.
                 */
                scope.viewModel.insertNode = function (node, parent, index) {
                    parent = parent || scope.viewModel;

                    if (angular.isUndefined(index) || index > parent.children.length) {
                        index = parent.children.length;
                    }

                    //If parent is a leaf, change it to a collapsed folder
                    if (parent.state === NODE_STATE.LEAF) {
                        parent.state = NODE_STATE.COLLAPSED;
                    }

                    //Set framework provided defaults on the new node
                    node.parent = parent;
                    node.isIndeterminate = false;
                    node.isNodeChecked = node.isNodeChecked || false;

                    parent.children.splice(index, 0, node);
                    fireEvent(scope, 'NodeInserted', node);
                };

                /**
                 * Remove the node from the tree. Will not remove the root node.
                 * @param node The node to remove
                 */
                scope.viewModel.removeNode = function (node) {
                    if (angular.isUndefined(node.parent)) {
                        return;
                    }

                    if (node === scope.viewModel.selectedNode) {
                        scope.viewModel.selectedNode = null;
                    }

                    var index = _.findIndex(node.parent.children, node);
                    if (index >= 0) {
                        var removedNode = node.parent.children.splice(index, 1);
                        fireEvent(scope, 'NodeRemoved', removedNode);
                    }
                };

                /**
                 * Given a property and value, returns the first node in the tree that has the same value for property.
                 * @param property Specifies the property to compare
                 * @param value Specifices the value to compare
                 * @param node [Optional] Specifies the sub-tree to search. If empty it defaults to the entire tree.
                 * @returns The node if a match is found. Otherwise, null.
                 */
                scope.viewModel.findFirst = function (property, value, node) {
                    //Node is an option parameter that defaults to the root if not supplied.
                    node = node || scope.viewModel;

                    var returnVal = null;
                    if (node[property] === value) {
                        returnVal = node;
                    }
                    else {
                        if(node.children) {
                            for (var i = 0; i < node.children.length && !returnVal; i++) {
                                returnVal = scope.viewModel.findFirst(property, value, node.children[i]);
                            }
                        }
                    }
                    return returnVal;
                };

                /**
                 * Selects a single node
                 * @param node
                 */
                scope.viewModel.selectNode = function (node) {
                    if (scope.viewModel.selectedNode) {
                        scope.viewModel.selectedNode.selected = false;
                    }
                    node.selected = true;
                    scope.viewModel.selectedNode = node;
                    fireEvent(scope, 'NodeSelected', node);
                };

                /**
                 * Expand the tree to node
                 * @param node
                 */
                scope.viewModel.expandNode = function (node) {
                    if (node.state === NODE_STATE.COLLAPSED) {
                        node.state = NODE_STATE.EXPANDED;
                        fireEvent(scope, 'NodeExpanded', node);
                    }
                    if (node.parent) {
                        scope.viewModel.expandNode(node.parent);
                    }
                };

                /**
                 * Collapse the node and its children
                 * @param node
                 */
                scope.viewModel.collapseNode = function (node) {
                    scope.viewModel.forEachNode(node, function (node) {
                        if (node.state === NODE_STATE.EXPANDED) {
                            node.state = NODE_STATE.COLLAPSED;
                            fireEvent(scope, 'NodeCollapsed', node);
                        }
                    });
                };

                /**
                 * Toggles the expansion of a single given node.
                 * @param node The node to expand or collapse.
                 */
                scope.viewModel.toggleExpansion = function (node) {
                    if (NODE_STATE.EXPANDED === node.state) {
                        node.state = NODE_STATE.COLLAPSED;
                        fireEvent(scope, 'NodeCollapsed', node);
                    }
                    else if (NODE_STATE.COLLAPSED === node.state) {
                        node.state = NODE_STATE.EXPANDED;
                        fireEvent(scope, 'NodeExpanded', node);
                    }
                };

                /**
                 * Expands all nodes in the tree
                 */
                scope.viewModel.expandAll = function () {
                    scope.viewModel.forEachNode(scope.viewModel, function (node) {
                        if (node.state !== NODE_STATE.LEAF) {
                            node.state = NODE_STATE.EXPANDED;
                            fireEvent(scope, 'NodeExpanded', node);
                        }
                    })
                };

                /**
                 * Collapses all nodes in the tree
                 */
                scope.viewModel.collapseAll = function () {
                    scope.viewModel.forEachNode(scope.viewModel, function (node) {
                        if (node.state !== NODE_STATE.LEAF) {
                            node.state = NODE_STATE.COLLAPSED;
                            fireEvent(scope, 'NodeCollapsed', node);
                        }
                    })
                };

                /**
                 * Checks a node and sets appropriate checkboxes on its parents.
                 * @param node The node to check / uncheck
                 * @param isChecked [Optional boolean] Defaults to true, checked.
                 */
                scope.viewModel.setNodeChecked = function (node, isChecked) {
                    if (isChecked === undefined) {
                        isChecked = true;
                    }
                    node.isNodeChecked = isChecked;
                    fireEvent(scope, 'NodeChecked', node);
                    node.isIndeterminate = false;
                    checkChildren(node);
                    checkParents(node);
                };

                /**
                 * Helper function to check children if their parent node is checked.
                 */
                checkChildren = function (node) {
                    angular.forEach(node.children, function (child) {
                        child.isNodeChecked = node.isNodeChecked;
                        if (node.isNodeChecked) {
                            child.isIndeterminate = false;
                        }

                        fireEvent(scope, 'NodeChecked', node);
                        checkChildren(child);
                    })
                };

                /**
                 * Helper function to check parents if any or their descendents are checked.
                 * @param node The node whose parent may be checked.
                 */
                checkParents = function (node) {
                    if (node.parent) {
                        var parent = node.parent;
                        var siblings = node.parent.children;

                        if (_.all(siblings, 'isNodeChecked', true)) {
                            parent.isNodeChecked = true;
                            parent.isIndeterminate = false;
                            fireEvent(scope, 'NodeChecked', node);
                        } else if (_.some(siblings, 'isNodeChecked', true) || _.some(siblings, 'isIndeterminate', true)) {
                            parent.isNodeChecked = false;
                            parent.isIndeterminate = true;
                        } else {
                            parent.isNodeChecked = false;
                            parent.isIndeterminate = false;
                        }

                        checkParents(parent);
                    }
                };

                /**
                 * Standarize the way I'm firing events so I'm not violating DRY
                 * @param eventScope
                 * @param eventName
                 * @param eventData
                 */
                var fireEvent = function (eventScope, eventName, eventData) {
                    uitkEvents.setScope(eventScope).emit('tree', scope.componentId + '-' + eventName, eventData);
                };

                /**
                 * Assign parents to child nodes so we can walk back up the tree model.
                 * Also ensure that isNodeChecked to each node.
                 * @param parent
                 */
                var configureTree = function (parent) {
                    angular.forEach(parent.children, function (child) {
                        child.parent = parent;
                        child.isIndeterminate = false;
                        child.isNodeChecked = child.isNodeChecked || false;
                        configureTree(child);
                    })
                };

                //Configure defaults for the tree
                if (scope.viewModel.uselectedNode) {
                    scope.viewModel.selectNode(scope.viewModel.uselectedNode);
                }
                scope.viewModel.useCheckBoxes = scope.viewModel.useCheckBoxes || false;
                scope.viewModel.useIcons = scope.viewModel.useIcons || false;
                scope.viewModel.cssClassForClosedIcon = scope.viewModel.cssClassForClosedIcon || 'cux-icon-folder_closed';
                scope.viewModel.cssClassForOpenIcon = scope.viewModel.cssClassForOpenIcon || 'cux-icon-open';
                scope.viewModel.cssClassForLeafIcon = scope.viewModel.cssClassForLeafIcon || 'cux-icon-document';


                //Configure defaults for the root node.
                scope.viewModel.isIndeterminate = false;
                scope.viewModel.isNodeChecked = scope.viewModel.isNodeChecked || false;

                //Configure defaults for the rest of the tree.
                configureTree(scope.viewModel);

                //Configure the initial checkbox states for the tree.
                scope.viewModel.forEachNode(scope.viewModel, function (node) {
                    if (node.state === NODE_STATE.LEAF && node.isNodeChecked) {
                        checkParents(node);
                    }
                    else if (node.state !== NODE_STATE.LEAF && node.isNodeChecked) {
                        checkChildren(node);
                    }
                });

                //Send event that link function is complete
                fireEvent(scope, 'Linked');
            },
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || "template/uitkTreeDirectiveTemplate.html";
            }
        }
    };


    uitkTreeDirective.$inject = ['$log', 'uitkEvents', 'NODE_STATE', 'uitkTools'];

    angular.module('uitk.component.uitkTree', [
        'uitk.component.uitkSlideAnimation',
        'uitk.uitkUtility', 'uitk.click'
    ])
        .directive('uitkTree', uitkTreeDirective)
        .constant('NODE_STATE',
        {
            'EXPANDED': 'expanded',
            'COLLAPSED': 'collapsed',
            'LEAF': 'leaf'
        }
    )
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.15.0
 */
(function () {
    var uitkVerticalNavigation = function($compile, $document, $timeout, $filter, uitkExceptionService, $sce, uitkMenuModel, uitkEvents) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                model: '=',
                focusItem: '='
            },
            controller: ["$scope", "$element", function ($scope, $element) {
                uitkMenuModel.setLevel($scope);

                if($scope.model.level===1)
                    uitkMenuModel.initializeParents($scope.model, undefined);

                $element.hide();

                if ($scope.model.level === 1) {
                    $scope.model.menuVisible = true;
                }

                if ($scope.model.level > 1 && $scope.focusItem) {
                    $scope.focusItem.focusMe = false;
                }

                $scope.isHorizontal = false;

                //Same as primary from here down
                $scope.expandMenuOrRedirectToLink = uitkMenuModel.getClickHandler($scope);
                $scope.hideParentMenu = uitkMenuModel.hideParentMenu.bind($scope);
                $scope.isExpanded = uitkMenuModel.isExpanded;

                $scope.getTrustedTextTemplate = function (item) {
                    return $sce.trustAsHtml(item.textTemplate);
                };

                uitkMenuModel.ValidateModelId($scope.model, uitkExceptionService);
                uitkMenuModel.CheckForBothUrlAndDropdown($scope.model, uitkExceptionService);
            }],
            link: function (scope, iElement) {
                uitkMenuModel.initializeSetFocus(scope, iElement, true);
                scope.checkMenuPosition = uitkMenuModel.checkMenuPosition(scope, iElement);
            },
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || 'template/uitk-vertical-navigation.html';
            }
        };
    };

    var applyParentFocus = function () {
        return {
            link: function (scope, element) {
                if (scope.item) {
                    scope.$watch('item.focusMe', function (a, b) {
                        if (scope.item.focusMe) {
                            element.focus();
                            scope.item.focusMe = false;
                        }
                    })
                }
            }
        }
    };

    var compileLink = function($compile) {
        return function ($scope, $element) {
            $compile($scope.item.textTemplate)($scope, function (clone) {
                if (!clone.selector) {
                    $element.prepend(clone);
                } else {
                    $element.prepend(clone.selector);
                }
            });
        };
    }

    uitkVerticalNavigation.$inject = ['$compile', '$document', '$timeout', '$filter', 'uitkExceptionService', '$sce', 'uitkMenuModel', 'uitkEvents'];
    compileLink.$inject = ['$compile'];

    angular.module('uitk.component.uitkVerticalNavigation', ['uitk.component.uitkSlideAnimation', 'uitk.component.uitkNavigable', 'uitk.uitkUtility', 'uitk.Models'])
        .directive('uitkVerticalNavigation', uitkVerticalNavigation)
        .directive('applyParentFocus', applyParentFocus)
        .directive('uitkCompileVerticalLink', compileLink);

})();

/*
 * Copyright (c) Optum 2015 - All Rights Reserved.
 */
/**
 * Created by nvenishe on 12/12/2016.
 */
(function(){

    var module = angular.module('uitk.component.uitkWizard',['uitk.component.uitkButton','uitk.uitkUtility']);

    var wizardController = function($scope, uitkEvents, uitkExceptionService, $timeout){
        var controller = this;
        //angular binds viewModel to this instance (controller)

        /**
         * Initialize the viewModel with the defaults.
         */
        function init(){

            if(_.isUndefined(controller.viewModel.id)){
                uitkExceptionService.throwException("IdNotFoundException", "id should be provided with the model");
            }

            controller.viewModel.currentStep = controller.viewModel.currentStep || 1; //defaults to first step of the wizard
            controller.enableTabIndex = true;
            controller.loadInit = false;
            controller.selectedStepIndex = controller.viewModel.currentStep -1;
            controller.isWizardContentToBeFocussed = false;
            controller.isWizardCompleted = false;
            controller.wizardDescriptionId = controller.viewModel.wizardDescriptionId;

            /* Initialize the buttons (next,previous and final) and cancel link objects*/
            controller.viewModel.nextButton=controller.viewModel.nextButton || {};
            controller.viewModel.previousButton=controller.viewModel.previousButton || {};
            controller.viewModel.finishButton=controller.viewModel.finishButton || {};
            controller.viewModel.cancelLink=controller.viewModel.cancelLink || {};

            /* Initialize buttons' and link's labels*/
            controller.viewModel.nextButton.label = controller.viewModel.nextButton.label || "Next";
            controller.viewModel.previousButton.label=controller.viewModel.previousButton.label || "Previous";
            controller.viewModel.finishButton.label=controller.viewModel.finishButton.label || "Finish";
            controller.viewModel.cancelLink.label=controller.viewModel.cancelLink.label || "Cancel";


            controller.viewModel.hasCompletedAllSteps=controller.viewModel.hasCompletedAllSteps || false;

            /* Render the buttons and cancel link by default*/
            controller.viewModel.nextButton.render = controller.viewModel.nextButton.render || true;
            controller.viewModel.previousButton.render=controller.viewModel.previousButton.render || true;
            controller.viewModel.finishButton.render=controller.viewModel.finishButton.render || true;
            controller.viewModel.cancelLink.render=controller.viewModel.cancelLink.render || true;

            /* disabled flag for the buttons and cancel link by default*/
            controller.viewModel.nextButton.disabled = controller.viewModel.nextButton.disabled || false;
            controller.viewModel.previousButton.disabled=controller.viewModel.previousButton.disabled || false;
            controller.viewModel.finishButton.disabled=controller.viewModel.finishButton.disabled || false;
            controller.viewModel.cancelLink.disabled=controller.viewModel.cancelLink.disabled || false;

        }

        init();

        controller.onloadComplete = function() {
            if(controller.loadInit == true) {
                controller.isWizardContentToBeFocussed = true;
            }

        }
        /**
         * get state (styeclas) of the current wizard step based on its index.
         * @param index
         * @returns {string}
         */
        controller.getClass = function(index){
            var result = index - controller.viewModel.currentStep;
            if(result > 0){
                return "oui-wzrd-nav-index";
            }else if(result < 0 ){
                return "oui-wzrd-nav-completed";
            }else{
                return "oui-wzrd-nav-current";
            }
        }

        /**
         * handles the next button click event
         */
        controller.viewModel.nextButton.action = controller.viewModel.nextButton.action || function(){
            var  moveForward = (typeof controller.viewModel.nextButton.callback === 'function') ? controller.viewModel.nextButton.callback.apply(controller.viewModel):true;
            if(moveForward){
                controller.viewModel.currentStep = (controller.viewModel.currentStep < controller.viewModel.wizardSteps.length) ? controller.viewModel.currentStep+1: controller.viewModel.currentStep;
                controller.selectedStepIndex = controller.viewModel.currentStep -1;//-1 since currentStep is not starting as 0 based index.
                controller.loadInit = true;
            }
            triggerEvents("next",controller.viewModel.currentStep-1);
            return true;
        }

        /**
         * handles the previous button click event.
         */
        controller.viewModel.previousButton.action = controller.viewModel.previousButton.action || function(){
            var moveBackward = (typeof controller.viewModel.previousButton.callback === 'function') ? controller.viewModel.previousButton.callback.apply(controller.viewModel): true;
            if(moveBackward){
                controller.viewModel.currentStep = (controller.viewModel.currentStep >  1 ) ? controller.viewModel.currentStep-1: controller.viewModel.currentStep;
                controller.selectedStepIndex = controller.viewModel.currentStep - 1; //-1 since currentStep is not starting as 0 based index.
                controller.loadInit = true;
            }
            triggerEvents("previous",controller.viewModel.currentStep+1);
            return false;
        }

        /**
         * handles the complete button click event.
         */
        controller.viewModel.finishButton.action=controller.viewModel.finishButton.action || function(){
            var  moveForward = (typeof controller.viewModel.finishButton.callback === 'function') ? controller.viewModel.finishButton.callback.apply(controller.viewModel):true;
            if(moveForward){
                controller.viewModel.currentStep = controller.viewModel.wizardSteps.length+1;
                controller.isWizardCompleted = true;
            }
            triggerEvents("finish",controller.viewModel.currentStep-1);
            return false;
        }

        /**
         * handles the cancel link click event.
         */
        controller.viewModel.cancelLink.action=controller.viewModel.cancelLink.action || function(){
            //TO-DO need to implement the default cancel click even listner as part of future release.
            triggerEvents("cancel",controller.viewModel.currentStep);
        }

        /**
         * Renders the corresponding template of a wizard step based on the current step.
         */
        $scope.$watch(function(){return controller.viewModel.currentStep},function(){
            if(controller.viewModel.currentStep <= controller.viewModel.wizardSteps.length){
                $scope.templateUrl = controller.viewModel.wizardSteps[controller.viewModel.currentStep-1].templateurl;
            }
        });

        /**
         * Triggers an event when emitEvent flag is turned on and it the falg is false by default.
         * @param type
         * @param currentStep
         */
        function triggerEvents(type,currentStep){
            if(!!controller.viewModel.emitEvent){
                uitkEvents.setScope($scope).emit('wizard', controller.viewModel.id+'-'+type, currentStep);
            }
        }

        /*
          Select the step specified by index;
         */
        controller.selectStep = function(index){
            if(!controller.isWizardCompleted){
                controller.selectedStepIndex = index;
                controller.viewModel.currentStep = index + 1;
                controller.isWizardContentToBeFocussed = true;
            }
        };

        /*
          Returns the value 0 or -1 based on the step which is focussed.
         */
        controller.getTabIndex = function(index){
            return (controller.enableTabIndex && controller.viewModel.currentStep == index + 1)? 0: -1;
        };

        /*
          manages the focus on list of steps when arrows or enter or spacebar key is pressed.
         */
        controller.onStepsKeyPressEvent = function(event){
            var keyCode = event.which;
            var ul = event.currentTarget;

            /*
            * 37: left arrow, 38: up arrow, 39: right arrow, 40: down arrow
            * 9: tab, 13: enter, 32: space
            * */
            switch(keyCode){
                case 39:
                case 40:
                    if(controller.selectedStepIndex != controller.viewModel.wizardSteps.length-1) {
                        controller.selectedStepIndex++; //Increase the active step by 1
                    }
                    else {
                        controller.selectedStepIndex = 0; //Increase the active step by 1
                    }
                    angular.element(ul).find('li').eq(controller.selectedStepIndex).focus();
                    event.preventDefault();
                    break;

                case 37:
                case 38:
                    if(controller.selectedStepIndex != 0){
                        controller.selectedStepIndex--; //Reduce the active step by 1
                    }
                    else{
                        controller.selectedStepIndex = controller.viewModel.wizardSteps.length -1;
                    }
                    angular.element(ul).find('li').eq(controller.selectedStepIndex).focus();
                    event.preventDefault();
                    break;

                case 13:
                case 32:
                    if(controller.selectedStepIndex < controller.viewModel.currentStep && !controller.isWizardCompleted) {
                        controller.viewModel.currentStep = controller.selectedStepIndex + 1;
                        controller.isWizardContentToBeFocussed = true;
                    }
                    break;

                case 9:
                    controller.enableTabIndex = false;
                    controller.selectedStepIndex = controller.viewModel.currentStep - 1;
                    $timeout(function(){
                        controller.enableTabIndex = true;
                    });
                    break;
            }
        };

        /*
          Returns true if the step needs to be disabled for AT/Screen Readers.
         */
        controller.isStepDisabled = function(index){
            return index >= (controller.viewModel.currentStep);
        };

        /*
          Returns true if the step needs to be selected for AT/Screen Readers.
         */
        controller.isStepSelected = function(index){
            return controller.viewModel.currentStep == index  + 1;
        };

        /*
           Defines the id for the wizard content to which it will refer to.
         */
        controller.getContentDescriptionId = function(){
            return controller.viewModel.id + "_" + (controller.viewModel.currentStep - 1);
        };
    };

    module.component("uitkWizard",{
        templateUrl:"template/uitkWizardTemplate.html",
        bindings:{
            viewModel:"<"
        },
        controllerAs: 'tkWizardCtrl',
        controller:["$scope","uitkEvents","uitkExceptionService", "$timeout",wizardController]
    });

    module.directive("tkFocusWizardContent", ["$timeout", function($timeout){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                attrs.$observe("tkFocusWizardContent", function(value){
                    if(value == "true"){
                       $timeout(function(){

                            var activeStep = scope.tkWizardCtrl.viewModel.wizardSteps[scope.tkWizardCtrl.viewModel.currentStep -1];
                            if(activeStep.focusElementId){
                                element.find('#'+ activeStep.focusElementId).focus();
                            }
                            else{
                                element[0].focus();
                            }
                            scope.tkWizardCtrl.isWizardContentToBeFocussed = false;
                        }, 200);

                    }
                });
            }
        }
    }]);

    module.directive("tkFocusWizardMainContainer", ["$timeout", function($timeout){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                attrs.$observe("tkFocusWizardMainContainer", function(value){
                    if(value === "true"){
                        $timeout(function(){
                            element[0].focus();
                        }, 200);

                    }
                });
            }
        }
    }]);
}());
/*
 * Copyright (c) Optum 2015 - All Rights Reserved.
 */
(function() {
  var _scripts = document.getElementsByTagName("script");
  var _currentScriptPath = _scripts[_scripts.length - 1].src;

  angular
    .module("uitk.component.choropleth")
    .factory("uitkChoroplethBorders", uitkChoroplethBorders);
  
  /**
   * Factory containing helper functions for retrieving and validating border types
   * used by the Leaflet choropleth layer.
   */
  function uitkChoroplethBorders($http, $q) {
    this._getCurrentScriptPath = _getCurrentScriptPath;
    this.isValidBorderType = isValidBorderType;
    this.getBorders = getBorders;
    this.getBorderTypes = getBorderTypes;
    
    return {
      _getCurrentScriptPath: this._getCurrentScriptPath,
      getBorders: this.getBorders,
      getBorderTypes: this.getBorderTypes,
      isValidBorderType: this.isValidBorderType
    };
    
    /**
     * @returns current location from which script was loaded.
     */
    function _getCurrentScriptPath() {
      return _currentScriptPath.substring(0, _currentScriptPath.lastIndexOf("/") + 1);
    }
    
    /**
     * Retrieves the appropriate json of county/state border type from the current path.
     *
     * @param type Choropleth Border type
     * @returns an appropriate json borders file.
     */
    function getBorders(type) {
      var deferred = $q.defer();
      
      $http.get(this._getCurrentScriptPath() + type.toLowerCase() + ".json", {cache: true}).success(function(data) {
        deferred.resolve(data);
      });
      
      return deferred.promise;
    }
    
    /**
     * @returns an array of valid border types that are supported.
     */
    function getBorderTypes() {
      return ["counties", "states"];
    }
    
    /**
     * Check validness of type against valid border types and return true or false.
     *
     * @param type Choropleth Border type
     * @returns true if the type is a valid value, or false if not
     */
    function isValidBorderType(type) {
      var bool;
      
      if (this.getBorderTypes().indexOf(type.toLowerCase()) > -1) {
        bool = true;
      }
      
      return bool;
    }
  }
  uitkChoroplethBorders.$inject = ["$http", "$q"];
})();

/*
 * Copyright (c) Optum 2015 - All Rights Reserved.
 */


/*
 * Copyright (c) Optum 2015 - All Rights Reserved.
 */
var states = {
   "01": "Alabama",
   "02": "Alaska",
   "04": "Arizona",
   "05": "Arkansas",
   "06": "California",
   "08": "Colorado",
   "09": "Connecticut",
   "10": "Delaware",
   "11": "District of Columbia",
   "12": "Florida",
   "13": "Geogia",
   "15": "Hawaii",
   "16": "Idaho",
   "17": "Illinois",
   "18": "Indiana",
   "19": "Iowa",
   "20": "Kansas",
   "21": "Kentucky",
   "22": "Louisiana",
   "23": "Maine",
   "24": "Maryland",
   "25": "Massachusetts",
   "26": "Michigan",
   "27": "Minnesota",
   "28": "Mississippi",
   "29": "Missouri",
   "30": "Montana",
   "31": "Nebraska",
   "32": "Nevada",
   "33": "New Hampshire",
   "34": "New Jersey",
   "35": "New Mexico",
   "36": "New York",
   "37": "North Carolina",
   "38": "North Dakota",
   "39": "Ohio",
   "40": "Oklahoma",
   "41": "Oregon",
   "42": "Pennsylvania",
   "44": "Rhode Island",
   "45": "South Carolina",
   "46": "South Dakota",
   "47": "Tennessee",
   "48": "Texas",
   "49": "Utah",
   "50": "Vermont",
   "51": "Virginia",
   "53": "Washington",
   "54": "West Virginia",
   "55": "Wisconsin",
   "56": "Wyoming"
};

/*
 * Copyright (c) Optum 2015 - All Rights Reserved.
 */
(function() {
  angular
    .module("uitk.component.choropleth")
    .factory("uitkChoroplethColorSeries", uitkChoroplethColorSeries);
  
  /**
   * Factory that manages many different Optum-approved color serie. Contains functions that splice and combined
   * sequential or diverging color serie.
   */
  function uitkChoroplethColorSeries() {
    this._spliceDivergingSeries = _spliceDivergingSeries;
    this._spliceSequentialSeries = _spliceSequentialSeries;
    this.getColorSeriesTypes = getColorSeriesTypes;
    this.getFullSeries = getFullSeries;
    this.getSeries = getSeries;
    this.isValidColorSeriesType = isValidColorSeriesType;
    
    return {
      _spliceSequentialSeries: this._spliceSequentialSeries,
      _spliceDivergingSeries: this._spliceDivergingSeries,
      getFullSeries: this.getFullSeries,
      getSeries: this.getSeries,
      getColorSeriesTypes: this.getColorSeriesTypes,
      isValidColorSeriesType: this.isValidColorSeriesType
    };
    
    /**
     * @returns Returns 5-segment purple color series
     */
    function _getPurpleSeries() {
      return ["#bbc0e9", "#9294cd", "#6c66ae", "#473890", "#27185a"];
    }
    
    /**
     * @returns Returns 5-segment green color series
     */
    function _getGreenSeries() {
      return ["#d4dfb1", "#b4c678", "#93ae3e", "#638104", "#425602"];
    }
    
    /**
     * @returns Returns 5-segment orange color series
     */
    function _getOrangeSeries() {
      return ["#fbcda6", "#f7a467", "#f47b29", "#c36121", "#924719"];
    }
    
    /**
     * @returns Returns 5-segment turqoise color series
     */
    function _getTurqoiseSeries() {
      return ["#b6d9dc", "#80bcc1", "#499fa6", "#007983", "#005157"];
    }
    
    /**
     * @returns Returns 5-segment red color series
     */
    function _getRedSeries() {
      return ["#e5bda7", "#ce8d82", "#b85c5d", "#a22b38", "#741f28"];
    }
    
    /**
     * @returns Returns 5-segment blue color series
     */
    function _getBlueSeries() {
      return ["#add3e3", "#73aece", "#3a89b9", "#00568d", "#00395e"];
    }
    
    /**
     * @returns Returns 5-segment gray color series
     */
    function _getGraySeries() {
      return ["#cccccc", "#a6a6a6", "#808080", "#5a5a5a", "#333333"];
    }
    
    /**
     * @returns Returns single color that lies between orange and turqoise color series
     */
    function _getOrangeTurqoiseNeutral() {
      return ["#fbeecc"];
    }
    
    /**
     * @returns Returns single color that lies between red and green color series
     */
    function _getRedGreenNeutral() {
      return ["#fbeecc"];
    }
    
    /**
     * @returns Returns single color that lies between purple and green color series
     */
    function _getPurpleGreenNeutral() {
      return ["#e6e6e6"];
    }
    
    /**
     * Splices a diverging color series based on the number of segments passed in.
     * Max segments is 11.
     *
     * @param series Color series array to be spliced
     * @param numSegments Number of color series segments to splice into
     * @returns spliced diverging color series array
     */
    function _spliceDivergingSeries(series, numSegments) {
      switch (numSegments) {
        case 1:
        case 2:
        case 3:
          series.splice(1, 4);
          series.splice(2, 4);
          break;
        case 4:
          series.splice(1, 4);
          series.splice(3, 3);
          break;
        case 5:
          series.splice(1, 1);
          series.splice(2, 2);
          series.splice(3, 2);
          series.splice(4, 1);
          break;
        case 6:
          series.splice(1, 1);
          series.splice(3, 3);
          series.splice(5, 1);
          break;
        case 7:
          series.splice(1, 1);
          series.splice(3, 1);
          series.splice(4, 1);
          series.splice(6, 1);
          break;
        case 8:
          series.splice(4, 3);
          break;
        case 9:
          series.splice(4, 1);
          series.splice(5, 1);
          break;
        case 10:
          series.splice(5, 1);
          break;
      }
      
      return series;
    }
    
    /**
     * Splices a diverging color series based on the number of segments passed in.
     * Max segments is 5.
     *
     * @param series Color series array to be spliced
     * @param numSegments Number of color series segments to splice into
     * @returns spliced sequential color series array
     */
    function _spliceSequentialSeries(series, numSegments) {
      switch (numSegments) {
        case 1:
        case 2:
          series.splice(1, 3);
          break;
        case 3:
          series.splice(1, 1);
          series.splice(2, 1);
          break;
        case 4:
          series.splice(2, 1);
          break;
      }
      
      return series;
    }
    
    /**
     * @returns array of valid color series types as string
     */
    function getColorSeriesTypes() {
      return ["purple", "green", "orange", "turqoise", "red", "blue", "gray", "orangeturqoise", "redgreen", "purplegreen"];
    }
    
    /**
     * Interprets series type passed in and returns proper color series.
     * If series type is diverging (combined), it will concatenate the proper sequential series' together.
     *
     * @param seriesType Color series type
     * @returns Full array of sequential/diverging color series
     */
    function getFullSeries(seriesType) {
      var palette = {
        "purple": _getPurpleSeries(),
        "green": _getGreenSeries(),
        "orange": _getOrangeSeries(),
        "turqoise": _getTurqoiseSeries(),
        "red": _getRedSeries(),
        "blue": _getBlueSeries(),
        "gray": _getGraySeries(),
        "orangeturqoise": _getOrangeSeries().reverse().concat(_getOrangeTurqoiseNeutral()).concat(_getTurqoiseSeries()),
        "redgreen": _getRedSeries().reverse().concat(_getRedGreenNeutral()).concat(_getGreenSeries()),
        "purplegreen": _getPurpleSeries().reverse().concat(_getPurpleGreenNeutral()).concat(_getGreenSeries())
      };
      
      seriesType = seriesType.toLowerCase();
      
      return palette[seriesType];
    }
    
    /**
     * Interprets series type passed in and returns proper color series.
     * If series type is diverging (combined), it will concatenate the proper sequential series' together.
     *
     * @param seriesType Color series type
     * @param seriesType Number of color segments
     * @returns Segmented array of sequential/diverging color series
     */
    function getSeries(seriesType, numSegments) {
      numSegments = parseInt(numSegments, 10);
      
      var series = this.getFullSeries(seriesType);
      
      // just use total segments available if equal to or greater than series length
      // if numSegments is less than series length, determine what colors to pass back
      // series.length === 5 specifies the series is sequential
      // series.length === 11 specifies the series is diverging
      if (series) {
        if (series.length === 5) {
          series = this._spliceSequentialSeries(series, numSegments);
        } else if (series.length === 11) {
          series = this._spliceDivergingSeries(series, numSegments);
        }
      }
      
      return series;
    }
    
    /**
     * Determines if passed in type is a valid color series
     *
     * @param seriesType Color series type
     * @returns True if type is a valid color series, or false if not
     */
    function isValidColorSeriesType(type) {
      var bool;
      
      if (type && this.getColorSeriesTypes().indexOf(type.toLowerCase()) > -1) {
        bool = true;
      }
      
      return bool;
    }
  }
})();

/*
 * Copyright (c) Optum 2015 - All Rights Reserved.
 */
(function() {
  angular
    .module("uitk.component.choropleth")
    .factory("uitkChoroplethOptions", uitkChoroplethOptions);
  
  /**
   * Factory containing helper functions for getting and setting
   * choropleth layer defaults.
   */
  function uitkChoroplethOptions() {
    this._getDefaults = _getDefaults;
    this.getOptions = getOptions;
    this.setDefaults = setDefaults;
    
    var mapDefaults = {};
    
    return {
      _getDefaults: this._getDefaults,
      setDefaults: this.setDefaults,
      getOptions: this.getOptions
    };
    
    /**
     * Cotnains static object of defaults for leaflet-dvf.
     *
     * @returns object containing default values for leaflet-dvf choropleth
     */
    function _getDefaults() {
      return {
        locationMode: L.LocationModes.LOOKUP,
        getIndexKey: function(location) {
          return location ? location.text : "0";
        },
        recordsField: null,
        codeField: "FIPS",
        locationTextField: "FIPS",
        layerOptions: {
          fillOpacity: 0.9,
          opacity: 1,
          weight: 0.5,
          numberOfSides: 50
        },
        tooltipOptions: {
          iconSize: new L.Point(130, 60),
          iconAnchor: new L.Point(-5, 60)
        },
        legendOptions: {
          numSegments: 11,
          gradient: false
        },
        filter: function() {
          return true;
        }
      };
    }
    
    /**
     * Retrieves options from a leaflet map controlled by directive.
     *
     * @param mapId Leaflet map ID
     * @returns object of options currently set to map of id mapId
     */
    function getOptions(mapId) {
      return mapDefaults[mapId];
    }
    
    /**
     * Sets the default options to be used by Leaflet-dvf choropleth layer.
     *
     * @param userOptions Options object passed in to directive.
     * @param mapId ID of Leaflet map
     * @returns object of options set to Leaflet map on initialization
     */
    function setDefaults(userOptions, mapId) {
      var isDefined = function(value) {
        return angular.isDefined(value) && value !== null;
      };
      var newDefaults = this._getDefaults();
      
      if (isDefined(userOptions)) {
        newDefaults.locationMode = isDefined(userOptions.locationMode) ? userOptions.locationMode : newDefaults.locationMode;
        newDefaults.getIndexKey = isDefined(userOptions.getIndexKey) ? userOptions.getIndexKey : newDefaults.getIndexKey;
        newDefaults.recordsField = isDefined(userOptions.recordsField) ? userOptions.recordsField : newDefaults.recordsField;
        newDefaults.codeField = isDefined(userOptions.codeField) ? userOptions.codeField : newDefaults.codeField;
        //newDefaults.locationLookup = isDefined(userOptions.locationLookup) ? userOptions.locationLookup : newDefaults.locationLookup;
        newDefaults.locationTextField = isDefined(userOptions.locationTextField) ? userOptions.locationTextField : newDefaults.locationTextField;
        newDefaults.layerOptions = isDefined(userOptions.layerOptions) ? userOptions.layerOptions : newDefaults.layerOptions;
        newDefaults.tooltipOptions = isDefined(userOptions.tooltipOptions) ? userOptions.tooltipOptions : newDefaults.tooltipOptions;
        newDefaults.legendOptions = isDefined(userOptions.legendOptions) ? userOptions.legendOptions : newDefaults.legendOptions;
        newDefaults.filter = isDefined(userOptions.filter) ? userOptions.filter : newDefaults.filter;
      }
      
      if (!mapId) {
        mapId = "map";
      }
      
      mapDefaults[mapId] = newDefaults;
      return newDefaults;
    }
  }
})();

angular.module("uitk.component.uitkAccordion").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitk-accordion.html","<div role=\"tablist\" class=\"tk-acrd\" aria-describedby=\"tablist-desc\">\n    <div class=\"oui-a11y-hidden\" id=\"tablist-desc\" aria-hidden=\"true\" tabindex=\"-1\">Panel headers may have related\n        links, Press Tab to access while header has focus.\n    </div>\n    <div class=\"oui-a11y-hidden\" id=\"tablist-desc-short\" aria-hidden=\"true\" tabindex=\"-1\">This header has links.\n    </div>\n    <!-- Panel header !-->\n    <div id=\"panel{{$index}}_header\" data-panel-index=\"{{$index}}\" ng-repeat-start=\"panelItem in model.panels\"\n         class=\"tk-acrd-header\" ng-class=\"{\'tk-acrd-header-links\':(( panelItem.links.length)?true:false)}\"\n         ng-click=\"togglePanel($index,$event); \" role=\"tab\" uitk-navigable=\"\"\n         ng-style=\"{\'width\': \'{{panelItem.width}}\'}\"\n         aria-selected=\"{{panelItem.open}}\" aria-expanded=\"{{panelItem.open}}\"\n         aria-controls=\"panel{{$index}}_content\"\n         aria-describedby=\"{{(panelItem.links.length)?\'tablist-desc-short\':\'\'}}\">\n        <h2 class=\"tk-acrd-header-color\">\n            <uitk:icon-font ng-if=\"panelItem.open\" icon=\"cux-icon-caret_down_centered\"></uitk:icon-font>\n            <uitk:icon-font ng-if=\"!panelItem.open\" icon=\"cux-icon-caret_right\"></uitk:icon-font>\n            <span>{{panelItem.title}}</span>\n        </h2>\n        <!-- Navigation links for each panel !-->\n        <div class=\"tk-acrd-header-cont\">\n            <ul class=\"tk-header-options\">\n                <li ng-repeat=\"panelLinks in panelItem.links\" class=\"liclass\">\n                    <a ng-if=\"!panelLinks.disabled\" ng-click=\"onLinkClick(panelItem, $index, $event)\" href=\"\"\n                       uitk-accordion-compile-link=\'panelLinks\' uitk-navigable=\"\"></a>\n                    <span ng-if=\'panelLinks.disabled\' class=\"tk-acrd-panel-disabled-link\"\n                          uitk-accordion-compile-link=\'panelLinks\' ng-click=\"$event.stopPropagation();\" aria-disabled=\"true\" tabindex=\"0\"\n                          role=\"link\">\n                    </span>\n                </li>\n            </ul>\n        </div>\n    </div>\n\n    <!-- Panel content using templateUrl defined in view model !-->\n    <div id=\"panel{{$index}}_content\" class=\"tk-acrd-content-container\" ng-if=\"!model.enableLazyLoading || panelItem.open\" tabindex=\"-1\" ng-repeat-end\n         uitk-slide-show=\"isOpenTab($index)\"\n         ng-class=\"{\'tk-acrd-content-container-links\':(( panelItem.links.length)?true:false)}\"\n         uitk-slide-show-duration=\"500\" role=\"tabpanel\" aria-hidden=\"{{!panelItem.open}}\"\n         aria-labelledby=\"panel{{$index}}_header\" ng-style=\"{\'width\':\'{{panelItem.width}}\'} \">\n        <span class=\"oui-a11y-hidden\">{{panelItem.title}} Content</span>\n\n        <div class=\"tk-acrd-content\"  tyle=\"width:{{panelItem.width}}, padding: 1.083rem;\">\n            <div ng-style=\"{\'max-height\':\'{{panelItem.height}}\'}\">\n                <ng-include src=\"panelItem.templateUrl\">\n                </ng-include>\n            </div>\n        </div>\n    </div>\n</div>");}]);
angular.module("uitk.component.uitkAddress").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitk-address.html","<div>\n    <div ng-class=\"{\'oui-rfrm-group-vertical\': layout === \'vertical\', \'oui-rfrm-group\': layout === \'horizontal\'}\">\n        <div ng-class=\"{\'oui-rfrm-label-container-vertical\': layout === \'vertical\', \'oui-rfrm-label-container\': layout === \'horizontal\'}\">\n            <uitk:label for=\"addressId_input\">{{\"Address\" | translate}}</uitk:label>\n        </div>\n        <div class=\"oui-rfrm-field-validation-container\">\n            <div class=\"oui-rfrm-error-container\">\n                <div role=\"group\">\n                    <uitk:input tk-type=\"text\" novalidate id=\"addressId\" style-class=\"tk-width-20t\" model=\"address\" name=\"address\"></uitk:input>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div ng-class=\"{\'oui-rfrm-group-vertical\': layout === \'vertical\', \'oui-rfrm-group\': layout === \'horizontal\'}\">\n        <div ng-class=\"{\'oui-rfrm-label-container-vertical\': layout === \'vertical\', \'oui-rfrm-label-container\': layout === \'horizontal\'}\">\n            <uitk:label for=\"cityId_input\">{{\"City\" | translate}}</uitk:label>\n        </div>\n        <div class=\"oui-rfrm-field-validation-container\">\n            <div class=\"oui-rfrm-error-container\">\n                <div role=\"group\">\n                    <uitk:input tk-type=\"text\" novalidate id=\"cityId\" style-class=\"tk-width-10t\" model=\"city\" name=\"city\"></uitk:input>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div ng-class=\"{\'oui-rfrm-group-vertical\': layout === \'vertical\', \'oui-rfrm-group\': layout === \'horizontal\'}\">\n        <div ng-class=\"{\'oui-rfrm-label-container-vertical\': layout === \'vertical\', \'oui-rfrm-label-container\': layout === \'horizontal\'}\">\n            <uitk:label for=\"provinceId_input\">{{\"Province\" | translate}}</uitk:label>\n        </div>\n        <div class=\"oui-rfrm-field-validation-container\">\n            <div class=\"oui-rfrm-error-container\">\n                <div role=\"group\">\n                    <uitk:input tk-type=\"text\" novalidate id=\"provinceId\" style-class=\"tk-width-10t\" model=\"province\" name=\"province\"></uitk:input>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div ng-class=\"{\'oui-rfrm-group-vertical\': layout === \'vertical\', \'oui-rfrm-group\': layout === \'horizontal\'}\">\n        <div ng-class=\"{\'oui-rfrm-label-container-vertical\': layout === \'vertical\', \'oui-rfrm-label-container\': layout === \'horizontal\'}\">\n            <uitk:label for=\"postalId_input\">{{\"Postal code\" | translate}}</uitk:label>\n        </div>\n        <div class=\"oui-rfrm-field-validation-container\">\n            <div class=\"oui-rfrm-error-container\">\n                <div role=\"group\">\n                    <uitk:input tk-type=\"text\" novalidate id=\"postalId\" style-class=\"tk-width-6t\" model=\"postal\" name=\"postal\"></uitk:input>\n                    <div id=\'postalId_tip\' class=\'tk-input-masking-assistivetext oui-rfrm-tip\' tabindex=\"-1\">\n                        <span class=\"oui-a11y-hidden\">{{\"Format\" | translate}}</span>{{\"postal_pattern\" | translate}}\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>");}]);
angular.module("uitk.component.uitkBarChart").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitkBarChartTemplate.html","<div class=\"tk-barchart\" id=\"{{viewModel.id}}\">\n\n    <uitk:dialog dialog-id=\'{{viewModel.id}}_dialog\' dialog-role=\'alertdialog\'\n                 header-text=\'{{viewModel.heading}} Chart Data\'\n                 show=\'showMe\'\n                 ng-if=\"showMe\"\n                 call-back-hide=\"callBackHideDialog()\"\n                 confirm-dialog=\"false\"\n                 default-width=\'25%\' trigger-element=\'#{{viewModel.id}}_dialog_openModalBtn\'>\n        <div class=\"tk-margin-bottom-1t\" id=\"{{viewModel.id}}_data\" tabindex=\"-1\">{{viewModel.description}}</div>\n        <div role=\"document\" tabindex=\"0\">\n            <table aria-describedby=\"{{viewModel.id}}_data\">\n                <tbody>\n                <tr>\n                    <th scope=\"col\" class=\"tk-accessible-chart-label-column\">Label</th>\n                    <th scope=\"col\">Value</th>\n                </tr>\n                <tr ng-repeat=\"item in viewModel.data[0].values\">\n                    <th scope=\"row\" class=\"tk-accessible-chart-label-column\">{{item.label}}</th>\n                    <td class=\"tk-accessible-chart-value-column\">{{item. value| number:viewModel.decimalPlaces }}</td>\n                </tr>\n                </tbody>\n            </table>\n        </div>\n        <uitk:button type=\"button\" style=\"float:left;\" value=\"Close\" enable-default=\"true\"\n                     ng-click=\"callBackHideDialog();\" custom-class=\'uitk-width-6t uitk-btn-close-dialog\'></uitk:button>\n\n    </uitk:dialog>\n    <div aria-hidden=\"{{isOpened.dialogOpened}}\">\n        <div id=\"{{viewModel.id}}_label\" tabindex=\"-1\"><h2>{{viewModel.heading}}</h2></div>\n        <div ng-class=\"{\'oui-a11y-hidden\': !viewModel.showA11yDescription}\" id=\"{{viewModel.id}}_desc\">\n            {{viewModel.a11yDescription}}\n        </div>\n        <button id=\"{{viewModel.id}}_dialog_openModalBtn\" class=\"tk-barchart-showdata-button\"\n                ng-click=\"contentKeyupHandler()\">Show data for this chart\n        </button>\n        <svg aria-hidden=\"true\" ng-mouseover=\"!setAriaHidden && mouseover();\" aria-labelledby=\"{{viewModel.id}}_label\"\n             aria-describedby=\"{{viewModel.id}}_desc\" role=\"img\" alt={{viewModel.description}}></svg>\n    </div>\n</div>");}]);
angular.module("uitk.component.uitkBreadcrumb").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitk-breadcrumb.html","<ul class=\"oui-crum\" role=\"navigation\" id=\"{{viewModel.id}}\">\n    <li ng-repeat=\"link in viewModel.links\" ng-if=\"($index < 2 || $index < (maxLinks - 2)) && $index < (linksLength - 2)\"><a ng-href=\"{{link.url}}\" uitk-compile-templates=\"{{link.template}}\"></a></li>\n    <li ng-if=\"!showAllItems && linksLength > maxLinks\"><a href=\"\" ng-click=\"show();\"><span aria-hidden=\"true\">[...]</span><span class=\"oui-a11y-hidden\">Click to expand link items</span></a></li>\n    <li ng-repeat=\"link in viewModel.links\" ng-if=\"showAllItems && $index >= 2 && $index >= (maxLinks - 2) && $index <=(linksLength- 3)\"><a ng-href=\"{{link.url}}\" uitk-compile-templates=\"{{link.template}}\"></a></li>\n    <li ng-repeat=\"link in viewModel.links\" ng-if=\"$index >=(linksLength - 2)\"><a ng-href=\"{{link.url}}\" ng-if=\"!$last\" uitk-compile-templates=\"{{link.template}}\"></a><span ng-if=\"$last\" uitk-compile-templates=\"{{link.template}}\"></span></li>\n</ul>");}]);
angular.module("uitk.component.uitkCalendar").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitk-calendar.html","<div class=\'tk-cal\'>\n    <div class=\"oui-rfrm-error-container\" ng-class=\"{\'oui-rfrm-has-error\': viewModel.invalid && viewModel.enableValidation}\">\n        <input type=\'text\' id=\'{{inputCompId}}_cal\' ng-attr-aria-describedby=\'{{getAriaDescribedBy()}}\' name=\'{{inputCompId}}_cal\'\n               aria-labelledby=\'{{labelledBy}}\' ng-aria-required=\'{{viewModel.required}}\' ng-aria-invalid=\'{{viewModel.invalid}}\'\n               ng-model=\'viewModel.dateText\' maxlength=\'{{viewModel.maxInputLength || 25}}\' ng-blur=\'onKeyDown($event)\' class=\'uitk-text-field customFieldSize\'\n               ng-class=\"{\'tk-form-field-error\': viewModel.invalid && viewModel.enableValidation, \'{{viewModel.textFieldClassName}}\': viewModel.textFieldClassName}\"\n               autocomplete=\"off\" aria-autocomplete=\"none\" ng-disabled=\"viewModel.disabled\" />\n        <a href=\'\' ng-if=\"viewModel.iconCalendar && !viewModel.disabled\" class=\'tk-cal-button\' ng-class=\"{\'oui-rfrm-has-error\': viewModel.invalid && viewModel.enableValidation}\"\n           id=\'{{inputCompId}}_calIcon\' aria-label=\'view calendar\'\n           ng-click=\'clickOnCalendarIcon()\'\n           tabindex=\'0\' ng-keyup=\'toggleCalendarOnKeypress($event)\'\n           aria-expanded=\'{{calendarShown && viewModel.iconCalendar}}\'\n           aria-hidden=\'{{!viewModel.iconCalendar}}\'>\n            <uitk:icon-font  icon=\"cux-icon-calendar tk-cal-icon\"></uitk:icon-font>\n        </a>\n        <span ng-if=\"viewModel.iconCalendar && viewModel.disabled\" class=\'tk-cal-button tk-disabled\' id=\'{{inputCompId}}_calIcon\' aria-disabled=\"{{viewModel.disabled}}\" aria-label=\'view calendar\'>\n            <uitk:icon-font  icon=\"cux-icon-calendar tk-cal-icon\"></uitk:icon-font>\n        </span>\n        <span ng-class=\"{\'oui-rfrm-validation\': viewModel.layout === \'horizontal\', \'oui-rfrm-validation-vertical\': viewModel.layout === \'vertical\'}\" ng-if=\"viewModel.enableValidation\">\n            <small id = \"{{inputCompId}}_err\" tabindex=-1\" class=\"error uitk-msg-error-inline\" ng-if=\"viewModel.invalid\">\n                {{ viewModel.errorMessage || \'Date is required\' | translate}}\n            </small>\n        </span>\n        <div class=\'tk-cal-popup open\' aria-hidden=\'{{!calendarShown && viewModel.iconCalendar}}\' ng-if=\'calendarShown && viewModel.iconCalendar\'>\n        <div class=\'tk-cal-heading\'>\n            <a href=\'\' aria-disabled=\"{{!!disablePrevMonthSelection}}\" class=\'tk-cal-prev-month\' ng-click=\'prevMonth()\' tabindex=\'0\' ng-keydown=\'closeCalendarOnEscape($event)\'>\n                <uitk:icon-font icon=\"cux-icon-caret_left\" aria-disabled=\"{{!!disablePrevMonthSelection}}\" hidden-text=\"{{\'Previous Month\' | translate}}\"></uitk:icon-font>\n            </a>\n\n            <select ng-model=\'$parent.selectedMonth\' aria-label=\'select month\' aria-controls=\'{{inputCompId}}_desc\' ng-change=\'changeCalendarView()\' tabindex=\'0\' ng-keyup=\'closeCalendarOnEscape($event)\'>\n                <option ng-repeat=\'month in monthsList\' >{{month}}</option>\n            </select>\n            <select ng-model=\'$parent.selectedYear\' aria-label=\'select year\' aria-controls=\'{{inputCompId}}_desc\' ng-change=\'changeCalendarView()\' tabindex=\'0\' ng-keyup=\'closeCalendarOnEscape($event)\' ng-options=\'year as year for year in years\'>\n            </select>\n\n            <a href=\'\' aria-disabled=\"{{!!disableNextMonthSelection}}\" class=\'tk-cal-next-month\' ng-click=\'nextMonth()\'  tabindex=\'0\' ng-keyup=\'closeCalendarOnEscape($event)\'>\n                <uitk:icon-font icon=\"cux-icon-caret_right\" aria-disabled=\"{{!!disableNextMonthSelection}}\" hidden-text=\"{{\'Next Month\'| translate}}\"></uitk:icon-font>\n            </a>\n\n        </div>\n            <div id=\'{{inputCompId}}_desc\' class=\'oui-a11y-hidden\' role=\'region\' aria-atomic=\'true\' aria-live=\'assertive\' aria-relevant=\'all\'>\n                Showing the calendar for {{$parent.selectedMonth}} {{$parent.selectedYear}}\n            </div>\n            <table class=\'tk-cal-grid\' role=\'grid\' aria-readonly=\'true\' aria-describedby=\'{{inputCompId}}_desc\'>\n                <thead>\n                    <tr role=\'row\'>\n                        <th ng-repeat=\'day in dayAbbreviations\' scope=\"col\" role=\'columnheader\'>\n                            <span class=\'dayAbbr\' data-day-abbr=\'{{day[0]}}\'></span>\n                            <span class=\'oui-a11y-hidden\'> {{day[1]}}</span>\n                        </th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr ng-repeat=\'week in weeks\' role=\'row\'>\n                        <td ng-mousedown=\'selectDate(day.date, true, true)\' ng-keydown=\'selectDateOnKeyPress($event,day.date)\' ng-class=\'{\"other-month\": day.other, \"disabled-date\": day.disabled, \"selected\": day.selected, \"is-today\": day.today, \"tk-first-date\": $parent.$first && $first , \"tk-last-date\": $parent.$last && $last}\' ng-repeat=\'day in week\' tabindex=\'0\' role=\'gridcell\'>\n                            {{day.date | date:\'d\'}}\n                            <span data-ng-if=\"day.today\" class=\"oui-a11y-hidden\">Current date</span>\n                            <span data-ng-if=\"day.selected\" class=\"oui-a11y-hidden\">Selected date</span>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n    <div id=\'{{displayTipId}}_tip\' tabindex=\"-1\" class=\'tk-cal-assistivetext\' ng-if=\"viewModel.displayTipText || displayTipText\" ng-bind-html=\"displayTipText\"></div>\n</div>\n");}]);
angular.module("uitk.component.uitkCheckboxGroup").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitkCheckboxTemplate.html","<div>\n\n    <div ng-if=\'isGroup===\"false\"\' class=\'tk-form-checkboxes-radios\'>\n        <input type=\'checkbox\' id=\'{{id + \"_input\"}}\' name=\'{{id}}\' ng-model=\'itemList.value\'\n               ng-disabled=\'itemList.disabled\' ng-checked=\'itemList.checked\'\n               aria-describedby=\'{{tkDescribedby}}\'\n               ng-click=\'itemList.checked=!itemList.checked; onChange();\'/>\n        <label for=\'{{id + \"_input\"}}\' tabindex=\'-1\'>{{itemList.label | uitkTranslate}}</label>\n    </div>\n\n    <div ng-if=\'isGroup===undefined || isGroup===\"true\"\' role=\'group\' ng-attr-aria-describedby=\'{{tkDescribedby}}\' ng-attr-aria-labelledby=\'{{tkLabelledby}}\'>\n        <ul class=\'tk-form-checkboxes-radios\'>\n            <li ng-repeat=\'item in itemList\' >\n                <input type=\'checkbox\' id=\'{{groupName + $index }}\' ng-attr-aria-invalid=\'{{tkAriainvalid}}\' name=\'{{groupName}}\' ng-model=\'item.value\'\n                       ng-disabled=\'item.disabled\' ng-checked=\'item.checked\'\n                       ng-click=\'item.checked=!item.checked; selectedValue(item.label,item.checked); onChange();\'/>\n                <label for=\'{{groupName + $index }}\' tabindex=\'-1\'>{{item.label | uitkTranslate}}</label>\n            </li>\n        </ul>\n    </div>\n\n</div>");}]);
angular.module("uitk.component.uitkDateOfBirth").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitk-date-of-birth.html","<div class=\"tk-cal\" ng-class=\"{\'tk-rfrm-has-error\': viewModel.invalid && viewModel.enableValidation}\">\n    <div ng-class=\"{\'oui-rfrm-has-error\':viewModel.invalid}\">\n        <!--<div ng-class=\"{\'tk-rfrm-error-container\': viewModel.errorMessage || viewModel.invalid}\">-->\n            <input type=\"text\" id=\"{{inputCompId}}_dob\" name=\"{{inputCompId}}_dob\" aria-labelledby=\"{{viewModel.labelledBy}}\"\n                ng-attr-aria-describedby=\"{{getAriaDescribedBy()}}\" ng-aria-required=\"{{viewModel.required}}\"\n                ng-aria-invalid=\"{{viewModel.invalid}}\"  ng-model=\"viewModel.dateText\" maxlength=\"25\"\n                ng-blur=\"dateTextFieldBlur($event)\" class=\"uitk-text-field customFieldSize\"\n                ng-class=\"{\'tk-form-field-error\': viewModel.invalid && viewModel.enableValidation, \'{{viewModel.textFieldClassName}}\': viewModel.textFieldClassName}\"\n                autocomplete=\"off\" aria-autocomplete=\"none\"/>\n            <span class=\"tk-display-age-info\" id=\"{{inputCompId}}_age_info\"  ng-if=\"!viewModel.invalid && !!viewModel.displayAgeInformation\">\n                <span class=\"oui-a11y-hidden\">You entered&nbsp; </span>{{viewModel.dateToBeDisplayed}}\n            </span>\n            <span ng-class=\"{\'oui-rfrm-validation\': viewModel.layout === \'horizontal\', \'oui-rfrm-validation-vertical\': viewModel.layout === \'vertical\'}\" ng-if=\"viewModel.enableValidation\">\n                <small tabindex=\"-1\" id = \"{{inputCompId}}_err\" class=\"error uitk-msg-error-inline\" ng-if=\"viewModel.invalid\">\n                    {{ viewModel.errorMessage || \'Date is required.\' | translate}}\n                </small>\n            </span>\n        <!--</div>-->\n    </div>\n    <div id=\"{{inputCompId}}_tip\" tabindex=\"-1\" class=\"tk-cal-assistivetext\" ng-if=\"viewModel.renderHintText\">\n        <span class=\"oui-a11y-hidden\">Format&nbsp; </span>{{dateFormatDisplayTip}}\n    </div>\n</div>\n");}]);
/*
 * Copyright (c) Optum 2015 - All Rights Reserved.
 */
(function() {
/**
 * 
 * @param $parse
 * @returns {object} 
 */
var uitkDynamicTableColumnDraggable = function ($parse,$timeout,uitkEvents) {
    /**
     * 
     * @param $scope
     * @param $element
     * @param $attrs
     */
    function link($scope, $element, $attrs) {
        // for drag
        var isDraggable = false;
        if ($attrs.uitkDynamicTableColumnDraggable) {
            isDraggable = $parse($attrs.uitkDynamicTableColumnDraggable)($scope) ? true : false;
        }
        /**
         * 
         * @param event
         */
        //Todo: test that this is working after refactor
        function croReleaseDraggingState(event) {
            var diff = new Date() - event.data.time;
            if (diff < 200) {
                $timeout.cancel(event.data.startDragging);
            } else {
                releaseDraggingState($(event.data.$th));
            }
        }
        /**
         * 
         * @returns {bool} 
         */
        function preventTextSelection() {
            return false;
        }
        /**
         * 
         * @returns {bool} 
         */
        function supportsTransitions() {
            var b = document.body || document.documentElement,
                s = b.style,
                p = 'transition';

            if (typeof s[p] === 'string') {
                return true;
            }

            // Tests for vendor specific prop
            var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'Ms'];
            p = p.charAt(0).toUpperCase() + p.substr(1);

            for (var i = 0; i < v.length; i++) {
                if (typeof s[v[i] + p] === 'string') {
                    return true;
                }
            }

            return false;
        }

        if (isDraggable) {
            
            //todo: validate this is still working should use angular promise $timeout
            $element.on("mousedown", function (event) {
                var $that = $(this);
                $timeout.cancel(startDragging);
                var time = new Date(); //time in milliseconds
                var columnModel = _.find($scope.model.columns, {columnId: $(this).attr("aria-label")});
                
                var startDragging = $timeout(function () {
                    if (!columnModel.resizeInProgress) {
                        setDraggingState($that, event);
                    }
                }, 200);

                $("body").on("mouseup",
                    {
                        $th: $that,
                        time: time,
                        startDragging: startDragging
                    },
                    croReleaseDraggingState);
            });
        }

        var thCoordinatesX = [];
        var thCoordinatesY = [];

        /**
         * Todo: REFACTOR TO NOT USE 'Angular Way' if possible
         * @param $th
         */
        function setInitialState($th) {
            $th.parents("tr").find(".tk-dtbl-cro-dragging").remove();
            $th.parents("tr").find(".tk-dtbl-cro-ghost-overlay").remove();
            $th.parents("tr").find("th").removeClass("tk-dtbl-cro-ghost");
            $("body").off("mouseup", croReleaseDraggingState);
            $("body").removeClass("tk-dtbl-cro-invalid-target");
            $("*").off("selectstart", preventTextSelection)
        }

        /**
         * Todo: REFACTOR TO NOT USE 'Angular Way' if possible
         * @param $th
         * @param event
         */
        function setDraggingState($th, event) {
            // $th is the jQuery th element that's being dragged

            // Add the ghost -- the floating copy of the th
            var $ghost = $("<table class='tk-dtbl tk-dtbl-cro-dragging tk-dtbl-cro-no-transition'><thead><tr></tr></thead></table>");
            var $content = $th.clone();
            var $siblings = $th.siblings("th");
            $ghost.find("tr").append($content);
            $th.prepend($ghost);
            $th.addClass("tk-dtbl-cro-ghost");
            var offset = $ghost.offset();

            $content.css("height", $th.height());

            // These top and left values are for when we want the ghost to follow the pointer.
            $ghost.css("top", 0);
            $ghost.css("left", 0);

            // Add the overlay -- the sheer curtain over the th that's being dragged
            var $overlay = $("<div class='tk-dtbl-cro-ghost-overlay'></div>");
            $overlay.width($th.innerWidth());
            $overlay.height($th.innerHeight());
            $overlay.insertAfter($ghost);

            // Temporarily prevent text selection and add the invalid drop class
            $("body").addClass("oui-util-non-selectable-text tk-dtbl-cro-invalid-target");

            $ghost.focus();

            // Calculate the delta between the left-edge of the ghost and the cursor position and keep track of it
            var horizontalDelta = event.pageX - offset.left;
            $th.attr("data-cro-cursor-delta", horizontalDelta);

            // Do the same for the vertical delta
            var verticalDelta = event.pageY - offset.top;
            $th.attr("data-cro-cursor-delta-y", verticalDelta);

            // Add the draggingState event handler to the body
            $("body").on("mousemove", {
                $th: $th
            }, draggingState)

            $ghost.on("transitionend", function () {
                $ghost.addClass("tk-dtbl-cro-no-transition");
            })

            // Disable text selection (ie<9)
            $("*").on("selectstart", preventTextSelection);

            // Populate the thCoordinates array
            /* Since we won't get mouse events to fire on the underlying ths (because IE doesn't support pointer-events: none) we'll have to do this manually
             by figuring out the page x and y coordinates of all the ths and then checking to see if the mouse is in those cells or not. */
            for (var i = 0; i < $siblings.length; i++) {
                thCoordinatesX[i] = $siblings.eq(i).offset().left;
            }
            thCoordinatesX[thCoordinatesX.length] = $siblings.last().offset().left + $siblings.last().outerWidth();
            thCoordinatesY[0] = $th.offset().top;
            thCoordinatesY[1] = $th.offset().top + $th.outerHeight();

            if (!supportsTransitions()) {
                $ghost.trigger("transitionend");
            }
        }

        /**
         * 
         * @param $th
         */
        function releaseDraggingState($th) {
            // $th is the jQuery th element that's being dragged

            var $ghost = $th.find(".tk-dtbl-cro-dragging");

            $("body").removeClass("oui-util-non-selectable-text");
            $ghost.removeClass("tk-dtbl-cro-no-transition");

            $("body").off("mousemove", draggingState);

            // Determine if we should revert back to initial state or move a column
            // We'll revert back to initial state if there are no siblings with a target

            if ($th.siblings(".tk-dtbl-cro-target-before").length > 0) {
                // Start animation of the ghost moving to where the new column will go
                // First calculate where the left edge of the target column is relative to the moving column
                var $target = $th.siblings(".tk-dtbl-cro-target-before").first();
                var newLeft = 0;
                var leftToRight = ($target.offset().left > $th.offset().left) ? true : false;
                if (leftToRight) {
                    newLeft = ($target.offset().left - $th.offset().left - $th.outerWidth());
                } else {
                    newLeft = ($target.offset().left - $th.offset().left);
                }
                $ghost.css({
                    "top": 0,
                    "left": newLeft
                })
                $ghost.on("transitionend", function () {
                    moveColumn($th, $target, true); // move this column before the sibling with the before class
                    setInitialState($th);
                    removeTargets();
                    $("[data-cro-cursor-delta]").removeAttr("data-cro-cursor-delta");
                    $("[data-cro-cursor-delta]").removeAttr("data-cro-cursor-delta-y");
                });
            } else if ($th.siblings(".tk-dtbl-cro-target-after").length > 0) {
                $target = $th.siblings(".tk-dtbl-cro-target-after").first();
                newLeft = 0;
                leftToRight = ($target.offset().left > $th.offset().left) ? true : false;
                if (leftToRight) {
                    newLeft = ($target.offset().left - $th.offset().left + $target.outerWidth() - $th.outerWidth());
                } else {
                    newLeft = ($target.offset().left - $th.offset().left + $target.outerWidth());
                }
                $ghost.css({
                    "top": 0,
                    "left": newLeft
                })
                $ghost.on("transitionend", function () {
                    moveColumn($th, $target, false); // move this column after the sibling with the after class
                    setInitialState($th);
                    removeTargets();
                    $("[data-cro-cursor-delta]").removeAttr("data-cro-cursor-delta");
                })
            } else {
                $ghost.css({
                    "left": 0,
                    "top": 0
                });
                $ghost.on("transitionend", function () {
                    setInitialState($th);
                    $("[data-cro-cursor-delta]").removeAttr("data-cro-cursor-delta");
                });

                if (parseInt($ghost.css("left"), 10) === 0 &&
                    parseInt($ghost.css("top"), 10) === 0) {
                    $ghost.trigger("transitionend");
                }
            }

            if (!supportsTransitions()) {
                $ghost.trigger("transitionend");
            }
        }

        /**
         * 
         * @param event
         */
        function draggingState(event) {
            var $th = event.data.$th;
            // $th is the jQuery th element that's being dragged

            var $ghost = $th.find(".tk-dtbl-cro-dragging");
            var newLeft = event.pageX - $th.offset().left - $th.attr("data-cro-cursor-delta");
            var newTop = event.pageY - $th.offset().top - $th.attr("data-cro-cursor-delta-y");
            $ghost.css("left", newLeft);
            $ghost.css("top", newTop);

            var x = event.pageX;
            var y = event.pageY;
            if ((x > thCoordinatesX[0]) &&
                (x < thCoordinatesX[thCoordinatesX.length - 1]) &&
                (y > thCoordinatesY[0]) &&
                (y < thCoordinatesY[thCoordinatesY.length - 1])) {
                // We just moused over one of the siblings. Figure out which one it was, and send it to potentialTargetEntry
                var i = 0;
                while (x > thCoordinatesX[i]) {
                    i++;
                }
                --i;
                potentialTargetEntry($th.siblings("th").eq(i), $th, x);
            } else {
                removeTargets();
            }
        }
        /**
         * 
         * @param $th
         * @param $og
         * @param x
         */
        function potentialTargetEntry($th, $og, x) {
            // event handler that fires when the user drags over a th peer of the dragged column th
            // $th = this column's th
            // $og = the dragged column th
            // x, y = coordinates of the event

            // figure out if the drop target should be on the left or the right
            var midpoint = .5 * $th.innerWidth();
            midpoint += $th.offset().left;
            var before = (x < midpoint) ? true : false;

            // figure out if it's on the left of the next sibling or on the right of the previous one
            if ((before && $th.prev("th.tk-dtbl-cro-ghost").length > 0) ||
                (!before && $th.next("th.tk-dtbl-cro-ghost").length > 0)) {
                removeTargets();
                return;
            }

            // build the target indicator if necessary
            var classToAdd = (before) ? "tk-dtbl-cro-target-before" : "tk-dtbl-cro-target-after";
            if ((before && $og.hasClass("tk-dtbl-cro-target-before")) ||
                (!before && $og.hasClass("tk-dtbl-cro-target-after"))) {
                return;
            }
            removeTargets();
            $th.addClass(classToAdd);
            if ($th.find(".tk-dtbl-cro-target").length < 1) {
                var $target = $("<div class='tk-dtbl-cro-target'></div>");
                $target.height($th.innerHeight());
                $th.prepend($target);
            }
        }

        /**
         * 
         */
        function removeTargets() {
            $(".tk-dtbl-cro-target-after, .tk-dtbl-cro-target-before").removeClass("tk-dtbl-cro-target-after tk-dtbl-cro-target-before");
            $(".tk-dtbl-cro-target").remove();
        }

        /**
         * 
         * @param $th
         * @param $target
         * @param before
         */
        function moveColumn($th, $target, before) {

            var draggedColumn = _.find($scope.model.columns, {columnId: $($th).attr("aria-label")});
            var dropColumn = _.find($scope.model.columns, {columnId: $($target).attr("aria-label")});
            var dropColumnLayoutOrder = dropColumn.layoutOrder;
            var componentId = $scope.$parent.componentId;

            $scope.$apply(function () {
                if (dropColumnLayoutOrder >= 1 && draggedColumn.layoutOrder > dropColumn.layoutOrder && !before) { //Right to Left
                    dropColumnLayoutOrder++;
                } else if (dropColumnLayoutOrder <= $scope.model.columns.length && draggedColumn.layoutOrder < dropColumn.layoutOrder && before) { //Left to Right
                    dropColumnLayoutOrder--;
                }

                if (draggedColumn.layoutOrder > dropColumn.layoutOrder) {
                    $scope.model.columns.forEach(function (column) {
                        if (column.layoutOrder >= dropColumnLayoutOrder && column.layoutOrder < draggedColumn.layoutOrder) {
                            column.layoutOrder++;
                        }
                    });
                } else if (draggedColumn.layoutOrder < dropColumn.layoutOrder) {
                    $scope.model.columns.forEach(function (column) {
                        if (column.layoutOrder <= dropColumnLayoutOrder && column.layoutOrder > draggedColumn.layoutOrder) {
                            column.layoutOrder--;
                        }
                    });
                }

                draggedColumn.layoutOrder = dropColumnLayoutOrder;
            });

            //send event to react when columns are dragged
            uitkEvents.setScope().internalBroadcast("broadcast", componentId+"-dragColumns");
        }
        /**
         * HMMMMMMMMMMMMMMMM.....
         */
        function guh() {
            $("*").removeAttr("ng-class ng-repeat ng-attr-style");
        }

        //guh();

    }

    return {
        restrict: 'A',
        replace: false,
        scope: false,
        link: link
    };
};

uitkDynamicTableColumnDraggable.$inject = ['$parse','$timeout','uitkEvents'];

angular.module('uitk.component.uitkDynamicTable')
    .directive('uitkDynamicTableColumnDraggable', uitkDynamicTableColumnDraggable);

})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.7.0
 */

(function () {

    /**
     * label template
     * @param $compile
     */
    var uitkCompileLabel = function ($compile) {
        return function ($scope, $element) {
            $compile($scope.column.label)($scope, function (clone) {
                if (!clone.selector) {
                    $element.append(clone);
                } else {
                    $element.append(clone.selector);
                }
            });
        };
    };

    /**
     * cell and row template
     * @param $compile
     * @returns {Function}
     */
    var uitkCompileCellTemplate = function ($compile) {
        var compiledTemplate = _.memoize(function (value) {
            return $compile(value);
        });

        return function ($scope, $element, $attrs) {
            if (angular.isDefined($scope.link)) {
                if(typeof $scope.link==='string') {
                    //Custom link template
                    $compile($scope.link)($scope, function (clone) {
                        $element.append(clone);
                    });
                } else {
                    //Link template object
                    var cur = '<a tabindex=0 href="' + $scope.link.href
                        + '" title="' + $scope.link.title
                        + '" ng-click="' + $scope.link.click + '">'
                        + $scope.link.text + '</a>';
                    var comp = $compile(cur)($scope);
                    $element.append(comp);
                }
            }
            else if (angular.isUndefined($scope.currentRecord)) { // cell
                compiledTemplate($scope.column[$attrs.uitkCompileCellTemplate])($scope, function (clone) {
                    $element.append(clone);
                });
            }
            else { // row
                $scope.record = $scope.currentRecord;
                compiledTemplate($scope.model.rowTemplate)($scope, function (clone) {
                    $element.append(clone);
                });
            }
        };
    };

    /**
     * column resizing
     * @param $document
     * @param $timeout
     * @returns {{scope: boolean, link: link}}
     */
    var uitkResizableColumn = function ($document, $timeout) {
        function link($scope, $element) {
            var column = $element.parent();
            var table = column.parent().parent().parent(); //TODO tr.thead.table
            var padding = 20 /* Horizontal padding */ + 2 /* resize placeholder */;
            var startX = 0, tableWidth = 0;
            var min_width = 0;
            var columnModel = _.find($scope.model.columns, { columnId: $scope.column.columnId });
            columnModel.resizeInProgress = false;
            columnModel.setWidth = function (width) {
                column.css({ 'width': width + 'px' });
            };
            columnModel.getWidth = function () {
                return parseInt(column.css('width'), 10);
            };
            columnModel.isWidthModifiable = function (width) {
                return width > min_width;
            };

            $timeout(function () {
                if($.isFunction(column.innerWidth)) {
                    column.css({ 'width': (column.innerWidth()) + 'px' });
                }

                min_width = (column.prop('offsetWidth') - padding) / 2;
            });

            $element.on('mousedown', function (event) {
                event.preventDefault();
                startX = event.screenX;
                column = $element.parent();
                table = column.parent().parent().parent(); //TODO: tr.thead.table
                min_width = (column.prop('offsetWidth') - padding) / 2;
                tableWidth = table.prop('offsetWidth');
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
                $scope.$apply(function () {
                    columnModel.resizeInProgress = true;
                });

            });

            function mousemove(event) {
                var cursorChangedBy = (event.screenX - startX);
                var width = parseInt(column.css('width'), 10) + cursorChangedBy;
                var nextColumnModel = _.chain($scope.model.columns).filter(function (col) {
                    return col.layoutOrder > columnModel.layoutOrder;
                }).min('layoutOrder').value();
                if (width > min_width && nextColumnModel.isWidthModifiable(nextColumnModel.getWidth() - cursorChangedBy)) {
                    nextColumnModel.setWidth(nextColumnModel.getWidth() - cursorChangedBy);
                    columnModel.setWidth(width);
                    table.css({ 'width': tableWidth + 'px' });
                    startX = event.screenX;
                }
            }

            function mouseup() {
                $scope.$apply(function () {
                    columnModel.resizeInProgress = false;
                });
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }
        }

        return {
            scope: false,
            link: link
        };
    };

    /**
     * on select row
     * @param $parse
     * @returns {{restrict: string, replace: boolean, scope: boolean, link: link}}
     */
    var uitkSelectable = function ($parse) {

        function link($scope, $element, $attrs) {
            var isSelectable = true;
            if ($attrs.uitkSelectable) {
                isSelectable = $parse($attrs.uitkSelectable)($scope) ? true : false;
            }
            if (isSelectable) {
                $element.attr('tabindex', 0);
                if ($element.attr('ng-click')) {
                    var fn = $parse($element.attr('ng-click'));
                    $element.on('keydown', keydownHandler(fn));
                    $element.on('keyup', keyupHandler(fn));
                }
            }
        };

        /**
         * handles key down event
         * @param event
         * @param fn
         */
        function keydownHandler(event, fn) {
            if (event.which === 13 || event.which === 32) { // enter key or space bar is pressed
                $scope.$apply(function () {
                    fn($scope, { $event: event });
                });
            }
            if (event.which === 32) {
                event.preventDefault();
            }
        };

        /**
         * handles key up event
         * @param event
         * @param fn
         */
        function keyupHandler(event, fn) {
            if (event.which === 32) { // space key is pressed
                $scope.$apply(function () {
                    fn($scope, { $event: event });
                });
                event.preventDefault();
            }
        };

        return {
            restrict: 'A',
            replace: false,
            scope: false,
            link: link
        };
    };


    var uitkDrawerContent = function (drawerSlide, $filter) {

        function link($scope, $element) {

            var rowUniqueId = $scope.componentId + '_' + ((typeof $scope.rowRecord !== 'undefined') ? $scope.rowRecord.index : '');

            $scope.model.recordOperationInProgress = false;

            ///setup Listeners ----------------------------------------->
            $scope.$on(rowUniqueId + "-openDrawer", function (e, v) {
                drawerSlide($element);
            });

            $scope.$on(rowUniqueId + "-closeDrawer", function (e, v) {
                drawerSlide($element, true);
            });
            ///end setup Listeners ----------------------------------------->


        };

        return {
            restrict: 'A',
            replace: true,
            scope: {
                model: "=",
                componentId: "=",
                isEditing: "=",
                rowRecord: '='
            },
            templateUrl: "template/openDrawerContent.html",
            link: link
        };
    };


    var uitkDrawerAction = function (drawerSlide, uitkEvents, $log, columnCombinations) {
        function link($scope, $element) {

            var rowUniqueId = $scope.componentId + '_' + ((typeof $scope.rowRecord !== 'undefined') ? $scope.rowRecord.index : '');
            ///setup Listeners ----------------------------------------->
            $scope.$on(rowUniqueId + "-openDrawer", function (e, v) {
                drawerSlide($element);
            });

            $scope.$on(rowUniqueId + "-closeDrawer", function (e, v) {
                drawerSlide($element, true);
            });
            ///end setup Listeners ----------------------------------------->

            $scope.model.recordOperationInProgress = false;

            var resetColumnInputError = function () {
                $scope.model.columnInput.error = {};
            };

            /*
            This is a generic method to reset columns whenever a new row is added or a row is modified..
             */
            var resetColumns = function (columns,record) {
                //reset column inputs with no record
                angular.forEach(columns, function (e, i) {
                    if ( _.isObject(record) ) {
                        if (e.combination) {
                            if (e.combination.length > 0) {
                                $scope.model.columnInput[e.columnId] = columnCombinations(e.combination,record);
                            }
                        } else {
                            $scope.model.columnInput[e.columnId] = record[e.columnId];
                        };
                    }
                    else {
                        $scope.model.columnInput[e.columnId] = "";
                    }

                });
                resetColumnInputError();
            };

            /**
             * Save or update record
             * @returns {null}
             */
            var saveAndUpdateRecord = function($scope, actualRecord) {
                var _model = $scope.model;

                var val = function (e) {
                    var validate = (e.validationPattern);
                    if (typeof validate !== 'undefined') { // this is defined, meaning we have validationPattern set on model
                        validate = validate.test(_model.columnInput[e.columnId].toString());
                    } else {
                        validate = true;
                    }
                    return validate;
                };

                angular.forEach(_model.columns, function (e, i) {
                    delete _model.columnInput.error[e.columnId];
                    if (typeof e.validationPattern !== 'undefined' && _.isEmpty(_model.columnInput[e.columnId].toString()) || (_model.columnInput[e.columnId] && !val(e))) {
                        _model.columnInput.error[e.columnId] = true;
                    }
                });

                if (_.isEmpty(_model.columnInput.error)) {
                    if (!_model.crudOptions.saveRecord) {
                        $log.warn("saveRecord method not provided on viewModel. (Note:saveRecord should return a promise.)");
                        return null;//save recored method not provided
                    }
                    //save new row validated data to server  side
                    var prommiseToSave = _model.crudOptions.saveRecord(_model.columnInput);
                    if (typeof prommiseToSave.then !== 'function') {
                        $log.warn("No promise was provided therefore no external saving");
                        return null;//no promise provided
                    }

                    prommiseToSave.then(function (recordInfo) {
                        //fail to save
                        if (recordInfo.record === null) {
                            if (_model.crudOptions.notificationMessage) {
                                _model.crudOptions.notificationMessage.content = "<span>" + recordInfo.message + "</span>";
                                _model.crudOptions.notificationMessage.messageType = "error";
                                _model.crudOptions.notificationMessage.visible = true;
                            }
                            return null;
                        }

                        //success save
                        if (_model.crudOptions.notificationMessage) {
                            _model.crudOptions.notificationMessage.content = "<span>" + recordInfo.message + "</span>";
                            _model.crudOptions.notificationMessage.visible = true;
                        }

                        //reset column inputs
                        resetColumns($scope.model.columns);
                        if($scope.model.drawerTemplate){
                            resetColumns($scope.model.additionalColumns);
                        }

                        //send event to react when drawer is closed
                        uitkEvents.setScope().internalBroadcast("broadcast", _model.recordUniqueId + "-closeDrawer", _model.recordUniqueId);

                        //TODO: check to see if record exists
                        if ( typeof (actualRecord) === 'undefined' ) { // adding new record
                            _model.originalRecords.push(recordInfo.record);
                        }
                        else {
                            var foundIdx = _.findIndex(_model.originalRecords, actualRecord);

                            if ( foundIdx > -1 ) {
                                _model.originalRecords[foundIdx] = recordInfo.record;//modified record
                            }
                            else {
                                _model.originalRecords.push(recordInfo.record);
                            }
                        }
                        $scope.updateOriginalRecords = true;
                        _model.onLoad(true);
                        _model.recordOperationInProgress = false;
                    }, function (reason) {
                        //todo: use exception service from utility module to throw error
                        //show error
                    });
                }
                return true;
            };

            var deleteRecord = function($scope, actualRecord) {
                var _model = $scope.model;

                _model.recordOperationInProgress = true;

                // Check to see if record exists
                var foundIdx = _.findIndex(_model.originalRecords, actualRecord);

                if ( foundIdx > -1 ) { // Record was found in original records set
                    // Remove idx from original records
                    var removedArray = _.pullAt(_model.originalRecords, foundIdx);
                    if (!_model.crudOptions.deleteRecord) {
                        $log.warn("deleteRecord method not provided on viewModel. (Note:deleteRecord should return a promise.)");
                        return null;//delete record method not provided
                    }
                    //save new row validated data to server  side
                    var prommiseToDelete = _model.crudOptions.deleteRecord(actualRecord);
                    if (typeof prommiseToDelete.then !== 'function') {
                        $log.warn("No promise was provided therefore no external saving");
                        return null;//no promise provided
                    }

                    prommiseToDelete.then(function (recordInfo) {
                        //fail to delete
                        if (recordInfo.record === null) {
                            if (_model.crudOptions.notificationMessage) {
                                _model.crudOptions.notificationMessage.content = "<span>" + recordInfo.message + "</span>";
                                _model.crudOptions.notificationMessage.messageType = "error";
                                _model.crudOptions.notificationMessage.visible = true;
                            }
                            return null;
                        }

                        //success delete
                        if (_model.crudOptions.notificationMessage) {
                            _model.crudOptions.notificationMessage.content = "<span>" + recordInfo.message + "</span>";
                            _model.crudOptions.notificationMessage.visible = true;
                        }
                    }, function (reason) {
                        //todo: use exception service from utility module to throw error
                        //show error
                    });

                    _model.modalShown = false;

                    _model.onLoad(true);
                    _model.recordOperationInProgress = false;

                }
            };

            $scope.model.openDrawer = $scope.model.openDrawer || function (record) {
                resetColumns($scope.model.columns);
                if($scope.model.drawerTemplate){
                    resetColumns($scope.model.additionalColumns);
                }
                if ($scope.model.recordOperationInProgress) {
                    $scope.model.showErrorMessage();//todo: should find better way to do this
                    return;
                }

                var recordUniqueId = rowUniqueId;
                if ( typeof record !== 'undefined' ) {
                    recordUniqueId = $scope.componentId + '_' + record.index;
                }
                // We need this for the close drawer
                $scope.model.recordUniqueId = recordUniqueId;

                //send event to react when drawer is open
                uitkEvents.setScope().internalBroadcast("broadcast", recordUniqueId + "-openDrawer", recordUniqueId);

                resetColumnInputError();
                //Edit Row----
                if (_.isObject(record)) {
                    // reset columns
                    resetColumns($scope.model.columns,record);
                    if($scope.model.drawerTemplate){
                        resetColumns($scope.model.additionalColumns,record);
                    }

                    record.hideRecord = true;

                    $scope.isEditing = true;
                //End Edit Row ----
                }
                else {
                    $scope.isEditing = false;
                }

                $scope.model.recordOperationInProgress = true;
                //open drawer processed successfully.
                return true;
            };

            /**
             * Working modifyRow
             * @param isEditing
             * @param isCancelling
             */
            $scope.model.modifyRow = function (isEditing, isCancelling,record, event) {
                if (isCancelling) {
                    if (isEditing) {
                       return $scope.model.onEditRowCancel(record, event);
                    } else {
                        return $scope.model.onAddRowCancel();
                    }
                }
                else {
                    if (isEditing) {
                        return $scope.model.onEditRow(record, event);
                    } else {
                        return $scope.model.onAddRow();
                    }
                }
            };

            $scope.model.onEditRow = $scope.model.onEditRow || function (record) {
                saveAndUpdateRecord($scope, record);
                record.hideRecord = false;
                return true;
            };

            /**
             * Working onAddRow
             * @type {Function|*}
             */
            $scope.model.onAddRow = $scope.model.onAddRow || function () {
               return saveAndUpdateRecord($scope);
            };

            /**
             * Working onAddRowCancel
             * @type {Function|*}
             */
            $scope.model.onAddRowCancel = $scope.model.onAddRowCancel || function () {
                // reset columns

                resetColumns($scope.model.columns);
                if($scope.model.drawerTemplate){
                    resetColumns($scope.model.additionalColumns);
                }
                //send event to react when drawer is closed
                uitkEvents.setScope().internalBroadcast("broadcast", $scope.model.recordUniqueId + "-closeDrawer", $scope.model.recordUniqueId);
                $scope.model.recordOperationInProgress = false;
                //process successfully;
                return true;
            };

            /**
             * Working onEditRow
             * @type {Function|*}
             */
            $scope.model.onEditRowCancel = $scope.model.onEditRowCancel || function(record) {
                //send event to react when drawer is closed

                resetColumns($scope.model.columns,record);
                if($scope.model.drawerTemplate){
                    resetColumns($scope.model.additionalColumns,record);
                }
                uitkEvents.setScope().internalBroadcast("broadcast", $scope.model.recordUniqueId + "-closeDrawer", $scope.model.recordUniqueId);
                $scope.model.recordOperationInProgress = false;
                record.hideRecord = false;
                return true;
            };

            /**
             * 
             * @type {Function|*}
             */
            $scope.model.onDelete = $scope.model.onDelete || function(record) {
                if ($scope.model.recordOperationInProgress) {
                    $scope.model.showErrorMessage();//todo: should find better way to do this
                    return;
                }

                $scope.model.modalShown = true;
                if ($scope.model.selectedRecords.length == 0 && _.isObject(record) ) {
                    $scope.model.record = record;
                }
                return true;
            };

            /**
             *
             */
            $scope.model.onDeleteConfirm = function() {

                if ( $scope.model.selectedRecords.length > 0 ) {
                    angular.forEach($scope.model.selectedRecords, function(key, value) {
                        deleteRecord($scope, key);
                    });
                    $scope.model.selectedRecords = [];
                }
                else {
                    if (_.isObject($scope.model.record) ) {
                        deleteRecord($scope, $scope.model.record);
                    }
                    else {
                        $scope.model.modalShown = false;
                    }
                }
                return true;
            }

            $scope.model.onDeleteCancel = function() {
                $scope.model.modalShown = false;
                return true;
            };
        };

        return {
            restrict: 'A',
            replace: true,
            scope: {
                model: "=",
                componentId: "=",
                isEditing: "=?",
                rowRecord: '='
            },
            templateUrl: "template/openDrawerAction.html",
            link: link
        };
    };

    /*
     * Directive function for uitkMultiSortDrawerContent
     * @param drawerSlide
     */
    var uitkMultiSortDrawerContent = function (drawerSlide) {

        function link($scope, $element) {

            /*
             * Initialize dropdown and radio button items
             */
            $scope.dropDownItems = [];

            $scope.textRadioItems = [ {
                label : 'A to Z',
                value : 'ascending'
            },{
                label : 'Z to A',
                value : 'descending'
            }];

            $scope.numberRadioItems = [ {
                label : '0 to 9',
                value : 'ascending'
            },{
                label : '9 to 0',
                value : 'descending'
            }];

            $scope.dateRadioItems = [ {
                label : 'Newest to Oldest',
                value : 'ascending'
            },{
                label : 'Oldest to Newest',
                value : 'descending'
            }];

            /*
             * This function is used to add column in multi sort drawer.
             * @type {Function|*}
             */
            $scope.addAnotherColumn = function(){
                var multiSortColumn = {
                    sortOrder: 0
                };
                $scope.model.multiSortColumnsInDrawer ? $scope.model.multiSortColumnsInDrawer.push(multiSortColumn) : $scope.model.multiSortColumnsInDrawer = [multiSortColumn];
            };

            /*
             * This function is used to remove column from list of columns in multi sort drawer.
             * @type {Function|*}
             * @param {number} index of item that needs to be removed
             */
            $scope.removeColumn = function(index) {
                $scope.model.multiSortColumnsInDrawer.splice(index, 1);
            };

            var componentId = $scope.componentId;

            ///setup Listeners ----------------------------------------->
            $scope.$on(componentId + "-openMultiSortDrawer", function (e, v) {
                $scope.initMultiSortDrawer();
                drawerSlide($element);
            });

            $scope.$on(componentId + "-closeMultiSortDrawer", function (e, v) {
                drawerSlide($element, true);
            });
            ///end setup Listeners ----------------------------------------->

            /*
             * This function is used to restore default state in multiSortColumns.
             * @type {Function|*}
             */
            $scope.restoreDefault = function(){

                //Create multiSortColumnsInDrawer array from initial data
                $scope.model.multiSortColumnsInDrawer = [];
                if($scope.model.__init__.multiSortColumns && $scope.model.__init__.multiSortColumns.sortBy){
                    _.forEach($scope.model.__init__.multiSortColumns.sortBy, function(obj, index){
                        var selectedIndex = _.findIndex($scope.dropDownItems, function(object){
                            return object.value == obj;
                        });
                        $scope.model.multiSortColumnsInDrawer.push({
                            selectedColumn : $scope.dropDownItems[selectedIndex],
                            sortOrder : $scope.model.__init__.multiSortColumns.sortOrder[index] === 1? 0 : 1
                        });
                    });
                }

                //If there is no intial data then show one column by default
                if($scope.model.multiSortColumnsInDrawer.length === 0){
                    var newColumn = {
                        selectedColumn : $scope.dropDownItems[0],
                        sortOrder : 0
                    };
                    $scope.model.multiSortColumnsInDrawer = [newColumn];
                }
            };

            /*
             * This function is called during initialization of multi sort, It will create dropDownItems array and multiSortColumnsInDrawer array
             * @type {Function|*}
             */
            $scope.initMultiSortDrawer = function () {

                //Intialize dropDownItems array from list of columns which is sortable
                $scope.dropDownItems = [];
                _.each(_.sortBy($scope.model.columns,'layoutOrder'), function(column){
                    //add item to dropDownItems as disabled if column is not sortable and it is visible in tabke
                    if(column.sortable == false && column.showColumnInTable == true ){
                        $scope.dropDownItems.push({'label':column.label + " (not sortable)", value:column.columnId, isDisabled:true, dataType:column.dataType});
                    }
                    //add item to dropDownItems if column is not sortable and it is visible in table
                    else if(column.showColumnInTable == true){
                        $scope.dropDownItems.push({'label':column.label, value:column.columnId, dataType:column.dataType});
                    }

                });

                //Create multiSortColumnsInDrawer array which is used in view
                $scope.model.multiSortColumnsInDrawer = [];
                if($scope.model.multiSortColumns && $scope.model.multiSortColumns.sortBy){
                    _.forEach($scope.model.multiSortColumns.sortBy, function(obj, index){
                        var selectedIndex = _.findIndex($scope.dropDownItems, function(object){
                            return object.value == obj;
                        });
                        $scope.model.multiSortColumnsInDrawer.push({
                           selectedColumn : $scope.dropDownItems[selectedIndex],
                           sortOrder : $scope.model.multiSortColumns.sortOrder[index] === 1? 0 : 1
                        });
                    });
                }

                //If there is no item in multiSortColumnsInDrawer then show one item by default
                if($scope.model.multiSortColumnsInDrawer.length === 0){
                    var newColumn = {
                        selectedColumn : $scope.dropDownItems[0],
                        sortOrder : 0
                    };
                    $scope.model.multiSortColumnsInDrawer = [newColumn];
                }
            };

        };

        return {
            restrict: 'A',
            replace: true,
            scope: {
                model: "=",
                componentId: "="
            },
            templateUrl: "template/multiSortDrawerContent.html",
            link: link
        };
    };

    /*
     * Directive function for uitkMultiSortDrawerAction
     * @param drawerSlide
     * @param uitkEvents
     */
    var uitkMultiSortDrawerAction = function (drawerSlide, uitkEvents) {

        function link($scope, $element) {

            var componentId = $scope.componentId;

            ///setup Listeners ----------------------------------------->
            $scope.$on(componentId + "-openMultiSortDrawer", function (e, v) {
                drawerSlide($element);
            });

            $scope.$on(componentId + "-closeMultiSortDrawer", function (e, v) {
                drawerSlide($element, true);
            });
            ///end setup Listeners ----------------------------------------->

            /*
             * Function which gets called when drawer is opened
             * @type {Function|*}
             * @param {object} event object
             */
            $scope.model.openMultiSortDrawer = $scope.model.openMultiSortDrawer || function(event){

                //If recordOperationInProgress flag is true then display error message and return
                if ($scope.model.recordOperationInProgress) {
                    if(typeof $scope.model.showErrorMessage == 'function'){
                        $scope.model.showErrorMessage();
                    }
                    return;
                }
                uitkEvents.setScope().internalBroadcast("broadcast",componentId + "-openMultiSortDrawer");

                $scope.model.recordOperationInProgress = true;
                return true;
            };

            /*
             * Function which gets called when drawer is closed
             * @type {Function|*}
             * @param {object} event object
             */
            $scope.model.closeMultiSortDrawer = $scope.model.closeMultiSortDrawer || function(event){
                uitkEvents.setScope().internalBroadcast("broadcast",componentId + "-closeMultiSortDrawer");

                $scope.model.recordOperationInProgress = false;
                return true;
            };

            /*
             * This function is used to save temporary data from multiSortColumnsInDrawer to multiSortColumns
             * This function will call onMultiSort function and close the drawer
             * @type {Function|*}
             */
            $scope.model.saveMultiSortColumns = $scope.model.saveMultiSortColumns || function() {

                var sortBy = [];
                var sortOrder = [];
                _.forEach($scope.model.multiSortColumnsInDrawer, function(obj){
                    sortBy.push(obj.selectedColumn.value);
                    sortOrder.push(obj.sortOrder === 0 ? 1 : -1); //Radio button selects 0 for ascending, 1 for descending
                });
                $scope.model.multiSortColumns = {sortBy : sortBy, sortOrder: sortOrder};
                $scope.model.multiSortColumnsInDrawer = {};


                //If this is transition from single-sort to multi-sort then set isMultiSortApplied flag to true and make sortOrder of single-column-sort to 0
                if(!$scope.model.isMultiSortApplied){
                    //Set isMultiSortApplied flag to true
                    $scope.model.isMultiSortApplied = true;
                    //Make sortOrder of single-column-sort columns to 0
                    _.forEach($scope.model.columns, function(column){
                       if(column.sortOrder === -1 || column.sortOrder === 1){
                           column.sortOrder = 0;
                       }
                    });
                }
                //Call onMultiSort function
                $scope.model.onMultiSort();

                if(typeof $scope.model.showSuccessMessage == 'function'){
                    $scope.model.showSuccessMessage('Your column sort preference were successfully saved.');
                }
                //Close the drawer
                $scope.model.closeMultiSortDrawer();
            };

        };

        return {
            restrict: 'A',
            replace: true,
            scope: {
                model: "=",
                componentId: "="
            },
            templateUrl: "template/multiSortDrawerAction.html",
            link: link
        };
    };

    /*
     * directive function for uitkShowHideColumnsDrawerContent
    */
    var uitkShowHideColumnsDrawerContent = function (drawerSlide, $filter) {

        function link($scope, $element) {
            var componentId = $scope.componentId;

            ///setup Listeners ----------------------------------------->
            $scope.$on(componentId + "-openShowHideColumnsDrawer", function (e, v) {
                drawerSlide($element);
            });

            $scope.$on(componentId + "-closeShowHideColumnsDrawer", function (e, v) {
                drawerSlide($element, true);
            });

            $scope.$on(componentId + "-dragColumns", function (e, v) {
                $scope.model.showHideFilterColumns = angular.copy($scope.model.columns);
            });
            ///end setup Listeners ----------------------------------------->

            //Sort the coloumn lables
            var orderBy = $filter('orderBy');
            $scope.order = function(predicate) {
                $scope.predicate = predicate;
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.columnsList = orderBy($scope.columnsList, predicate, $scope.reverse);
            };

            $scope.model.showHideFilterColumns = angular.copy($scope.model.columns);

            //showHideFilterColumns =  angular.copy($scope.model.columns);

            var resetFilterColumns = angular.copy($scope.model.columns);

            $scope.restoreDefault = function(){
                $scope.model.columns = angular.copy(resetFilterColumns);
            }

        };

        return {
            restrict: 'A',
            replace: true,
            scope: {
                model: "=",
                componentId: "=",
                isEditing: "="
            },
            templateUrl: "template/openColumnsDrawerContent.html",
            link: link
        };
    };

    /*
     * directive function for uitkShowHideColumnsDrawerAction
    */
    var uitkShowHideColumnsDrawerAction = function (drawerSlide, uitkEvents) {

        function link($scope, $element) {
            var componentId = $scope.componentId;

            $scope.$on(componentId + "-openShowHideColumnsDrawer", function (e, v) {
                drawerSlide($element);
            });

            $scope.$on(componentId + "-closeShowHideColumnsDrawer", function (e, v) {
                drawerSlide($element, true);
            });

            $scope.model.openShowHideColumnsDrawer = $scope.model.openShowHideColumnsDrawer || function (record) {
                /*// Set draggable false wehn drawer is open
                _.each($scope.model.columns, function(column){
                    if(column.draggable === true){
                        column.draggable = false;
                    }
                    return column;
                });*/
                
                //adding width auto when columns resize
                angular.element('.tk-dtbl-reorderable-columns').css('width','auto');
                angular.element('.tk-dtbl-reorderable-columns > tr > th').css('width','auto');

                //send event to react when drawer is open
                uitkEvents.setScope().internalBroadcast("broadcast", componentId + "-openShowHideColumnsDrawer");

                $scope.model.recordOperationInProgress = true;
                //open drawer processed successfully.
                return true;
            };

            /**
             * Working showHideColumnDrawerCancel
             * @type {Function|*}
             */
            $scope.model.showHideColumnDrawerCancel = $scope.model.showHideColumnDrawerCancel || function () {
                //send event to react when drawer is closed
                uitkEvents.setScope().internalBroadcast("broadcast", componentId + "-closeShowHideColumnsDrawer");
                $scope.model.recordOperationInProgress = false;
                //process successfully;
                return true;
            };

            /**
             * Working modifyColumn
             * @param isCancelling
             * @param event
             */
            $scope.model.modifyColumn = $scope.model.modifyColumn || function (isCancelling, event) {

                if (isCancelling) {
                    $scope.model.columns = angular.copy($scope.model.showHideFilterColumns);
                    
                }
                else {
                    $scope.model.showHideFilterColumns = angular.copy($scope.model.columns);
                    if(typeof $scope.model.showSuccessMessage == 'function'){
                        $scope.model.showSuccessMessage('Your column preferences were successfully changed. Drag columns left or right to change the order displayed.');
                    }
                    uitkEvents.setScope().internalBroadcast("broadcast",componentId + "-showHideColumns");
                }
                return $scope.model.showHideColumnDrawerCancel();
            };

        };

        return {
            restrict: 'A',
            replace: true,
            scope: {
                model: "=",
                componentId: "=",
                isEditing: "="
            },
            templateUrl: "template/openColumnsDrawerAction.html",
            link: link
        };
    };

    var uitkShowPagination = function () {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: "template/showPagination.html",
        };
    };

    //helper functions--------------------------------------------
    var drawerSlide = function () {
        return function ($element, slidingUp) {
            var ele = angular.element("td > div", $element);
            if (slidingUp) {
                angular.element(ele).slideUp(400, "linear", function () {
                    // Second open the form row
                    angular.element(ele).slideUp(400, "linear", function () {
                        angular.element("a:first", ele).focus();
                    });
                });
            } else {
                angular.element(ele).slideDown(400, "linear", function () {
                    // Second open the form row
                    angular.element(ele).slideDown(400, "linear", function () {
                        angular.element("input:first", ele).focus();
                    });
                });
            }

        }
    };

    //columns filtering
    var displayColumnFilter = function() {
          return function(columns) {
            var filtered = [];
            _.each(columns, function(column) {
              if(column.showColumnInTable) {
                filtered.push(column);
              }
            });
            return filtered;
          };
      }

    
    var columnCombinations = function () {
        return function (list, record) {

            var result = "";
            angular.forEach(list, function (value, index) {
                var pat = /\{(.*)\}/i
                var newVal = value.match(pat);
                if (newVal.length > 0) {
                    var recordPiece = value.replace(newVal[0], record[newVal[1]]);
                    result += recordPiece; //combination values
                }
            });
            return result;
        }
    };

    uitkMultiSortDrawerContent.$inject = ["drawerSlide"];
    uitkMultiSortDrawerAction.$inject = ["drawerSlide","uitkEvents"];

    uitkShowHideColumnsDrawerContent.$inject = ["drawerSlide", "$filter"];
    uitkShowHideColumnsDrawerAction.$inject = ["drawerSlide", "uitkEvents"];

    uitkDrawerAction.$inject = ["drawerSlide", "uitkEvents", "$log", "columnCombinations"];
    uitkDrawerContent.$inject = ["drawerSlide","$filter"];

    uitkCompileLabel.$inject = ['$compile'];
    uitkCompileCellTemplate.$inject = ['$compile'];

    uitkResizableColumn.$inject = ['$document', '$timeout'];
    uitkSelectable.$inject = ['$parse'];

    angular.module('uitk.component.uitkDynamicTable')
        .filter("displayColumnFilter",displayColumnFilter)
        .directive('uitkCompileLabel', uitkCompileLabel)
        .directive('uitkCompileCellTemplate', uitkCompileCellTemplate)
        .directive('uitkResizableColumn', uitkResizableColumn)
        .directive('uitkShowPagination', uitkShowPagination)
        .directive('uitkSelectable', uitkSelectable)
        .directive('uitkDrawerContent', uitkDrawerContent)
        .directive('uitkDrawerAction', uitkDrawerAction)
        .directive('uitkMultiSortDrawerContent', uitkMultiSortDrawerContent)
        .directive('uitkMultiSortDrawerAction', uitkMultiSortDrawerAction)
        .directive('uitkShowHideColumnsDrawerContent', uitkShowHideColumnsDrawerContent)
        .directive('uitkShowHideColumnsDrawerAction', uitkShowHideColumnsDrawerAction).factory('drawerSlide', drawerSlide).factory('columnCombinations', columnCombinations);

    //LEGACY:
    // Including an empty directive for uitkDynamicTableDirective to support clients that have manually
    // included this in their projects. We've combined all the table components into uitkDynamicTable.
    angular.module('uitk.component.uitkDynamicTableDirective', []);
})();

/*
 * Copyright (c) Optum 2015 - All Rights Reserved.
 */
(function() {

/**
 * This is directive function for row draggable
 * @type {Function|*}
 * @param $parse
 * @param $timeout
 * @param uitkEvents
 * @returns {object}
 */
var uitkDynamicTableRowDraggable = function ($parse,$timeout, uitkEvents) {

    /**
     * @param $scope
     * @param $element
     * @param $attrs
     */
    function link($scope, $element, $attrs) {
        var isDraggable = false;
        if ($attrs.uitkDynamicTableRowDraggable) {
            isDraggable = $parse($attrs.uitkDynamicTableRowDraggable)($scope) ? true : false;
        }

        /*
         * This function is called during release of dragged row. It will prevent rows drag and drop if time difference is less than 200ms(To differentiate between click and drag event)
         * @type {Function|*}
         */
        function croReleaseDraggingState(event) {
            var diff = new Date() - event.data.time;
            if (diff < 200) {
                $timeout.cancel(event.data.startDragging);
            } else {
                releaseDraggingState(event, $(event.data.$tr), $(event.data.$originalTr));
            }
        }

        /*
         * This function is checks if transitions is supported by browser or not
         * @type {Function|*}
         * @return boolean
         */
        function supportsTransitions() {
            var b = document.body || document.documentElement,
                s = b.style,
                p = 'transition';

            if (typeof s[p] === 'string') {
                return true;
            }

            // Tests for vendor specific prop
            var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'Ms'];
            p = p.charAt(0).toUpperCase() + p.substr(1);

            for (var i = 0; i < v.length; i++) {
                if (typeof s[v[i] + p] === 'string') {
                    return true;
                }
            }

            return false;
        }

        if (isDraggable) {
            $element.on("mousedown", function (event) {
                if($(event.target).is("a")){
                    return;
                }
                var $that = $(this);
                $timeout.cancel(startDragging);
                var time = new Date(); //time in milliseconds

                var startDragging = $timeout(function () {
                    $scope.offsetTop = $that.offset().top - $that.parent().parent().offset().top;
                    setDraggingState($that, event);
                }, 200);

                $("body").on("mouseup",
                    function(){
                        var diff = new Date() - time;
                        if(diff < 200){
                            $timeout.cancel(startDragging);
                        }
                    });
            });
        }

        var trCoordinatesX = [];
        var trCoordinatesY = [];

        /*
         * This function creates ghost image and insert at appropriate position
         * It will initialize listeners and calculate x and y position of each rows which will be used during row relase
         * @type {Function|*}
         * @param $tr dragged row
         * @param event event object
         */
        function setDraggingState($tr, event) {
            // Add the ghost -- the floating copy of the tr
            var $ghost = $tr.clone(true);
            var $siblings = $tr.parent().children();
            var $originals = $tr.children();
            $ghost.children().each(function(index)
            {
                // Set ghost cell sizes to match the original sizes
                $(this).width($originals.eq(index).width());
                return $ghost;
            });
            $ghost.addClass("tk-row-drag");
            $($ghost).insertBefore($tr);
            $("body").on("mouseup",
                    {
                        $tr: $ghost,
                        $originalTr: $tr
                    },
                    croReleaseDraggingState);

            $tr.addClass("tk-dtbl-cro-ghost");
            var offset = $ghost.offset();

            $ghost.css("height", $tr.height());

            // These top and left values are for when we want the ghost to follow the pointer.
            $ghost.css("top", event.pageY - offset.top);
            $ghost.css("left", 0);

             // Temporarily prevent text selection and add the invalid drop class
            $("body").addClass("oui-util-non-selectable-text tk-dtbl-cro-invalid-target");

            $ghost.focus();

            // Calculate the delta between the left-edge of the ghost and the cursor position and keep track of it
            var horizontalDelta = event.pageX - offset.left;
            $ghost.attr("data-cro-cursor-delta", horizontalDelta);

            // Do the same for the vertical delta
            var verticalDelta = event.pageY - offset.top;
            $ghost.attr("data-cro-cursor-delta-y", verticalDelta);

            // Add the draggingState event handler to the body
            $("body").on("mousemove", {
                $tr: $ghost
            }, draggingState)

            $ghost.on("transitionend", function () {
                $ghost.addClass("tk-dtbl-cro-no-transition");
            })

            // Disable text selection (ie<9)
            $("*").on("selectstart", function(){return false;});

            // Populate the thCoordinates array
            /* Since we won't get mouse events to fire on the underlying ths (because IE doesn't support pointer-events: none) we'll have to do this manually
             by figuring out the page x and y coordinates of all the ths and then checking to see if the mouse is in those cells or not. */
            for (var i = 0; i < $siblings.length; i++) {
                trCoordinatesY[i] = $siblings.eq(i).offset().top;
            }
            trCoordinatesY[trCoordinatesY.length] = $siblings.last().offset().top + $siblings.last().outerHeight();
            trCoordinatesX[0] = $tr.offset().left;
            trCoordinatesX[1] = $tr.offset().left + $tr.outerWidth();

            if (!supportsTransitions()) {
                $ghost.trigger("transitionend");
            }
        }

        /*
         * This function is called when releasing dragged row
         * @type {Function|*}
         * @param event
         * @param $ghost ghost image of row
         * $originalTr original dragged row
         */
        function releaseDraggingState(event, $ghost, $originalTr) {
            var $tr = event.data.$tr;
            $("body").off("mousemove", draggingState);
            $("body").off("mouseup", croReleaseDraggingState);

            //$originalTr.remove();
            $ghost.children().each(function(index)
            {
                // reset ghost cell sizes to match the original sizes
                $(this).removeAttr("style");
                return $ghost;
            });

            // Temporarily prevent text selection and add the invalid drop class
            $ghost.removeAttr("style");
            $ghost.removeClass("tk-row-drag");

            $ghost.remove();
            $originalTr.removeClass("tk-dtbl-cro-ghost");

            var y = event.pageY;

            if ((y > trCoordinatesY[0]) && ( y < trCoordinatesY[trCoordinatesY.length - 1])) {
                // We just moused over one of the siblings. Figure out which one it was, and move the data in model
                var i = 0;
                while (y > trCoordinatesY[i]) {
                    i++;
                };
                i--;
                var middle = (trCoordinatesY[i] + trCoordinatesY[i+1]) / 2
                //Decreasing - 6 from index as there are 6 rows above actual 1st row(2 add rows, 2 multi-column sort, 2 show/hide columns)
                if(y < middle){
                    moveRow($scope.index, (i-6));
                }
                else{
                    moveRow($scope.index, (i-6+1));
                }
            }
            $("body").removeClass("oui-util-non-selectable-text tk-dtbl-cro-invalid-target");

            if (!supportsTransitions()) {
                $ghost.trigger("transitionend");
            }
        }

        /*
         * This function is used to move rows in $scope.model.records
         * @type {Function|*}
         * @param startPosition : start position of dragged row
         * @param endPosition : end position of dragged row
         */
        function moveRow(startPosition, endPosition){
            $scope.$apply(function () {
                uitkEvents.setScope().internalBroadcast("broadcast", $scope.componentId+"-dragRows", {startPosition:startPosition, endPosition:endPosition});
                $scope.model.records.splice(endPosition, 0, _.cloneDeep($scope.model.records[startPosition]));
                if (startPosition < endPosition) {
                    $scope.model.records.splice(startPosition, 1);
                }
                else if (startPosition > endPosition) {
                    $scope.model.records.splice(startPosition + 1, 1);
                }
            });
        }

        /*
         * This function is used set parameters when dragging rows
         * @type {Function|*}
         * @param event
         */
        function draggingState(event) {
            var $tr = event.data.$tr;
            var $ghost = $tr;
            var newTop = event.pageY - $tr.parent().parent().offset().top;
            $ghost.css("left", 0);//left is always 0 in case of rowDrag
            $ghost.css("top", newTop);
        }
    }

    return {
        restrict: 'A',
        replace: false,
        scope: {
            model: '=',
            index: '=',
            componentId: '@'
        },
        link: link

    };
};

uitkDynamicTableRowDraggable.$inject = ['$parse','$timeout','uitkEvents'];

angular.module('uitk.component.uitkDynamicTable')
    .directive('uitkDynamicTableRowDraggable', uitkDynamicTableRowDraggable);

})();

angular.module("uitk.component.uitkDynamicTable").run(["$templateCache", function($templateCache) {$templateCache.put("template/multiSortDrawerAction.html","<tr class=\"tk-dtbl-add-row-buttons\">\n    <td colspan=\"{{model.columns.length}}\" role=\"presentation\">\n        <div class=\"tk-dtbl-add-row-button-constrainer tk-drawer-action-buttons\" ng-class=\"{edit:isEditing,add:!isEditing}\">\n            <div class=\"tk-dtbl-add-row-button-container\">\n                <span class=\"tk-dtbl-add-row-button-trim\"></span>\n                <span class=\"tk-dtbl-add-row-button-notch\">\n                    <input type=\"button\" class=\"tk-btn-default-action tk-width-10t\" ng-click=\"model.saveMultiSortColumns(model.multiSortColumnsInDrawer, $event)\"\n                           value=\"Save\" role=\"button\" aria-label=\"Save changes Multi Sort\" />\n                    <input type=\"button\" class=\"tk-btn-default-action tk-width-10t\"\n                            value=\"Cancel\" role=\"button\" ng-click=\"model.closeMultiSortDrawer($event)\"\n                           aria-label=\"Cancel changes to multi sort\" />\n                </span>\n            </div>\n        </div>\n    </td>\n</tr>\n");
$templateCache.put("template/multiSortDrawerContent.html","<tr class=\"tk-dtbl-multi-sort-row tk-dtbl-header-row\">\n    <td colspan=\"{{model.columns.length}}\">\n        <div class=\"tk-multi-sort-container\">\n        <div>\n            <span translate>Choose column(s) to sort</span>\n            <a class=\"restore-default\" href=\"\" ng-click=\"restoreDefault();\"><uitk:icon-font icon=\"cux-icon-undo\"></uitk:icon-font> <span translate>Restore Default Sort Order</span></a>\n        </div>\n        <div class=\"column-container\">\n            <table>\n                <tr ng-repeat=\"multiSortColumn in model.multiSortColumnsInDrawer\" >\n                    <td ng-if=\"$first\" translate>Sort by</td>\n                    <td ng-if=\"!$first\" translate>Then by</td>\n                    <td><uitk:select item-list=\"dropDownItems\" selected-value=\"multiSortColumn.selectedColumn\"></uitk:select></td>\n                    <td class=\"tk-sorted-column-data\" ng-if=\"multiSortColumn.selectedColumn.dataType === \'text\' || multiSortColumn.selectedColumn.dataType === \'character\'\"><uitk:radio class=\"oui-rfrm-checkboxes\" item-list=\'textRadioItems\' group-name=\'sortOrderGroup{{$index}}\' model-value=\'multiSortColumn.sortOrder\'></uitk:radio></td>\n                    <td class=\"tk-sorted-column-data\" ng-if=\"multiSortColumn.selectedColumn.dataType === \'number\'\"><uitk:radio class=\"oui-rfrm-checkboxes\" item-list=\'numberRadioItems\' group-name=\'sortOrderGroup{{$index}}\' model-value=\'multiSortColumn.sortOrder\'></uitk:radio></td>\n                    <td class=\"tk-sorted-column-data\" ng-if=\"multiSortColumn.selectedColumn.dataType === \'date\'\"><uitk:radio class=\"oui-rfrm-checkboxes\" item-list=\'dateRadioItems\' group-name=\'sortOrderGroup{{$index}}\' model-value=\'multiSortColumn.sortOrder\'></uitk:radio></td>\n                    <td><a ng-if=\"!$first\" href=\"\" ng-click=\"removeColumn($index);\"><uitk:icon-font icon=\"cux-icon-remove\"></uitk:icon-font> <span translate>Remove</span></a></td>\n                </tr>\n            </table>\n        </div>\n        <div class=\"add-column\">\n            <span ng-click=\"addAnotherColumn();\"><a href=\"\"><uitk:icon-font icon=\"cux-icon-add2\"></uitk:icon-font> <span translate>Add another sort column</span></a></span>\n        </div>\n        </div>\n    </td>\n</tr>");
$templateCache.put("template/openColumnsDrawerAction.html","<tr class=\"tk-dtbl-add-row-buttons\">\n    <td colspan=\"{{model.columns.length}}\" role=\"presentation\">\n        <div class=\"tk-dtbl-add-row-button-constrainer tk-show-hide-action\" ng-class=\"{edit:isEditing,add:!isEditing}\">\n            <div class=\"tk-dtbl-add-row-button-container\">\n                <span class=\"tk-dtbl-add-row-button-trim\"></span>\n                <span class=\"tk-dtbl-add-row-button-notch\">\n                    <input type=\"button\" class=\"tk-btn-default-action tk-width-10t\" ng-click=\"model.modifyColumn(false, $event)\" value=\"Save\" role=\"button\" aria-label=\"{{(isEditing)?\'Save changes to record\':\'Create new record\'}}\" />\n                    <input type=\"button\" class=\"tk-btn-default-action tk-width-10t\" ng-click=\"model.modifyColumn(true, $event)\" value=\"Cancel\" role=\"button\" aria-label=\"{{(isEditing)?\'Reset or Cancel changes to record\':\'Cancel new record creation\'}}\" />\n                </span>\n            </div>\n        </div>\n    </td>\n</tr>\n");
$templateCache.put("template/openColumnsDrawerContent.html","<tr class=\"tk-dtbl-add-row tk-dtbl-header-row\">\n    <td colspan=\"{{model.columns.length}}\">\n        <div class=\"tk-dtbl-add-row-constrainer tk-show-hide-container\">\n        	<div class=\"tk-filter-container\">\n	        	<div class=\"tk-grid\">\n	            	<div class=\"tk-col-1-4\" translate>Select columns to make them show/hide.</div>\n	            	<div class=\"tk-col-3-4 tk-text-align-right\"><a ng-click=\"restoreDefault();\" class=\"restore-default\"><uitk:icon-font icon=\"cux-icon-undo\"></uitk:icon-font> <span translate>Restore Defaults</span></a></div>\n	            </div>\n	        	<div class=\"tk-grid\">\n	            	<div class=\"tk-col-1-4\">\n	            		<div><span translate>Sort by: Column Order</span> | <a ng-click=\"order(\'label\')\" translate>Alphanumeric</a></div>\n	            		<div class=\"oui-util-scroll-vertical filterColumnsList\">\n	            			<ul class=\"sortoptions\">\n					          <li ng-repeat=\"option in model.columns | orderBy:predicate:reverse\" ng-class=\"{\'tk-show-hide-column-selected\' : (option.showColumnInTable && !option.showAlways)}\">\n					            <input type=\"checkbox\" ng-model=\"option.showColumnInTable\" ng-style=\"{\'visibility\': !option.showAlways?\'visible\':\'hidden\'}\">\n					            <label>{{option.label}} <span ng-if=\"option.showAlways\">(always visible)</span></label>\n					          </li>\n					        </ul>\n	            		</div>\n	            	</div>\n	            	<div class=\"tk-col-3-4\"></div>\n	            </div>\n            </div>\n        </div>\n    </td>\n</tr>\n");
$templateCache.put("template/openDrawerAction.html","<tr class=\"tk-dtbl-add-row-buttons\">\n    <td colspan=\"{{model.columns.length}}\" role=\"presentation\">\n        <div class=\"tk-dtbl-add-row-button-constrainer\" ng-class=\"{edit:isEditing,add:!isEditing}\">\n            <div class=\"tk-dtbl-add-row-button-container\">\n                <span class=\"tk-dtbl-add-row-button-trim\"></span>\n                <span class=\"tk-dtbl-add-row-button-notch\">\n                    <input type=\"button\" class=\"tk-btn-default-action tk-width-10t\" ng-click=\"model.modifyRow(isEditing,false,rowRecord, $event)\"\n                           value=\"{{(isEditing)?model.editRowSaveBtnName:model.addRowSaveBtnName}}\"\n                           role=\"button\" aria-label=\"{{(isEditing)?\'Save changes to record\':\'Create new record\'}}\" />\n                    <input type=\"button\" class=\"tk-btn-default-action tk-width-10t\"\n                           ng-click=\"model.modifyRow(isEditing,true,rowRecord, $event)\"\n                           value=\"{{(isEditing)?model.editRowCancelBtnName:model.addRowCancelBtnName}}\"\n                           role=\"button\" aria-label=\"{{(isEditing)?\'Reset or Cancel changes to record\':\'Cancel new record creation\'}}\" />\n                </span>\n            </div>\n        </div>\n    </td>\n</tr>\n");
$templateCache.put("template/openDrawerContent.html","<tr class=\"tk-dtbl-add-row tk-dtbl-header-row\">\n    <td ng-if=\"!model.drawerTemplate\" ng-repeat=\"column in model.columns | displayColumnFilter | orderBy:\'layoutOrder\'\">\n        <div class=\"tk-dtbl-add-row-constrainer\" ng-class=\"{edit:isEditing,add:!isEditing}\" >\n            <div ng-if=\"$index == 0\"  class=\"tk-dtbl-add-row-container\">\n                <span class=\"tk-dtbl-add-row-required\"  uitk-compile-cell-template=\"inputTemplate\"> </span>\n            </div>\n\n            <div ng-if=\"$index > 0\"  class=\"tk-dtbl-add-row-container\"  uitk-compile-cell-template=\"inputTemplate\">\n\n            </div>\n\n        </div>\n    </td>\n     <td ng-if=\"model.drawerTemplate\" colspan=\"{{model.columns.length}}\" class=\"custom-row-template\">\n        <div class=\"tk-dtbl-add-row-constrainer\" ng-class=\"{edit:isEditing,add:!isEditing}\" >\n            <ng-include src=\"model.drawerTemplateUrl\" ></ng-include>\n        </div>\n    </td>\n</tr>");
$templateCache.put("template/showPagination.html","<div class=\"pagination\" role=\"paginator\"\n     ng-class=\"{ \'tk-pageinput-error-display\' : model.pagination.pageNumberError }\">\n    <div class=\"tk-float-left tk-totlrecords\">\n        <span aria-label=\"total number of records\">{{ model.totalRecordsCount }}  {{ \"records\" | translate}} </span>\n        <span ng-if=\"model.selectedRecordCount > 0\"> | <span ng-if=\"model.viewAvailableRecords\">{{ model.selectedRecordCount }}  {{ \"selected\" | uitkTranslate}}</span> <a ng-if=\"!model.viewAvailableRecords\" aria-label=\"total number of selected records\" href=\"\" ng-click=\"table.showSelectedRecordsEvent()\">{{ model.selectedRecordCount }}  {{ \"selected\" | uitkTranslate}}</a></span>\n    </div>\n    <div class=\"tk-float-right\">\n        <div class=\"tk-records-page tk-float-left\"><label style=\"font-weight: normal;\" for=\"{{rowsDropdownId}}\">{{ \"Show\" | translate}}</label>\n            <select id=\"{{rowsDropdownId}}\" ng-model=\"model.pagination.recordsPerPage\" ng-change=\"model.onPaginate(1)\"\n                    ng-disabled=\"model.totalRecordsCount === 0\"\n                    ng-options=\"value for value in model.pagination.recordsPerPageChoices\" aria-label=\"number of records per page\">\n            </select> {{ \"per page\" | translate}}\n        </div>\n        <ul>\n            <li ng-if=\"model.showFirstAndLastBtn\">\n                <a href=\"\" ng-if=\"table.hasPreviousPage()\" ng-click=\"model.onPaginate(1)\" uitk-navigable  title=\"First Page\">\n                    <uitk:icon-font icon=\"cux-icon-rewind\"></uitk:icon-font>\n                </a>\n                <uitk:icon-font ng-if=\"!table.hasPreviousPage()\" aria-disabled=\"true\" icon=\"cux-icon-rewind\"></uitk:icon-font>\n            </li>\n            <li>\n                <a href=\"\" ng-if=\"table.hasPreviousPage()\" ng-click=\"model.onPaginate(table.previousPageNumber())\"\n                   uitk-navigable  title=\"Previous Page\">\n                    <uitk:icon-font icon=\"cux-icon-caret_left\"></uitk:icon-font>\n                </a>\n                <uitk:icon-font ng-if=\"!table.hasPreviousPage()\" aria-disabled=\"true\" icon=\"cux-icon-caret_left\"></uitk:icon-font>\n            </li>\n        </ul>\n            <span class=\"tk-pageinput\">\n                <label style=\"font-weight: normal;\" for=\"{{componentId}}_pageInput\"> {{ \"Page\" | translate}} </label>\n                <input type=\'text\' id=\"{{componentId}}_pageInput\" ng-model=\"model.pagination.currentPageNumberInView\"\n                       ng-class=\"{ \'tk-pageinput-error\' : model.pagination.pageNumberError }\"\n                       class=\'tk-width-3t tk-text-align-right\' uitk-navigable uitk-numbers-only\n                       aria-required=\"true\" aria-invalid=\"{{model.pagination.pageNumberError}}\"\n                       aria-describedby=\"{{model.pagination.pageNumberDescribedBy}}\"\n                       ng-keydown=\"pageNumberEvent($event)\" ng-blur=\"pageNumberEvent($event)\"/>\n                <span> {{ \"of\" | translate}} {{table.totalPagesCount()}}</span>\n                <div class=\"tk-pageerror-message\" aria-hidden=\"{{model.pagination.pageNumberError}}\"\n                     id=\"{{componentId}}_pageError\"\n                     aria-describedby=\"Enter a valid number, one that is in the page range.\"\n                     id=\"{{componentId}}_pageNumberError\" ng-if=\"model.pagination.pageNumberError\">Enter a valid number,\n                    one that is in the page range.\n                </div>\n            </span>\n        <ul>\n            <li>\n                <a href=\"\" ng-if=\"table.hasNextPage()\" ng-click=\"model.onPaginate(table.nextPageNumber())\"\n                   uitk-navigable title=\"Next Page\">\n                    <uitk:icon-font icon=\"cux-icon-caret_right\"></uitk:icon-font>\n                </a>\n                <uitk:icon-font ng-if=\"!table.hasNextPage()\" aria-disabled=\"true\" icon=\"cux-icon-caret_right\"></uitk:icon-font>\n            </li>\n            <li ng-if=\"model.showFirstAndLastBtn\">\n                <a href=\"\" ng-if=\"table.hasNextPage()\" ng-click=\"model.onPaginate(table.lastPageNumber())\"\n                   uitk-navigable title=\"Last Page\">\n                    <uitk:icon-font icon=\"cux-icon-forward\"></uitk:icon-font>\n                </a>\n                <uitk:icon-font ng-if=\"!table.hasNextPage()\" aria-disabled=\"true\" icon=\"cux-icon-forward\"></uitk:icon-font>\n            </li>\n        </ul>\n    </div>\n    <div class=\"oui-util-clear\"></div>\n</div>");
$templateCache.put("template/uitk-dynamic-table.html","<div class=\"tk-dtbl-container\">\n    <span class=\"oui-a11y-hidden\" id=\"{{componentId}}_pageNumber\"> showing page {{model.pagination.currentPageNumberInView}} of {{table.totalPagesCount()}}</span>\n\n    <div ng-if=\"table.showPagination()\" uitk-show-pagination></div>\n\n    <ul ng-if=\"showTableOptions\"\n        class=\"table-action-container\">\n        <li ng-if=\"model.viewAvailableRecords\">\n            <a href=\"\" title=\"View All Records\" ng-click=\"table.viewAllRecordsEvent()\"><uitk:icon-font icon=\"cux-icon-view\"></uitk:icon-font> {{\"View All Records\" | uitkTranslate}}</a>\n        </li>\n        <li ng-if=\"isFiltersClear\">\n            <a href=\"\" ng-if=\"isFiltersApplied()\" ng-click=\"table.clearAllFilters()\"><uitk:icon-font icon=\"cux-icon-filter\"></uitk:icon-font> {{\"Clear All Filters\" | translate}}</a>\n            <span href=\"\" ng-if=\"!isFiltersApplied()\" aria-role=\"button\" aria-disabled=\"true\"><uitk:icon-font icon=\"cux-icon-filter\"></uitk:icon-font> {{\"Clear All Filters\" | translate}}</span>\n        </li>\n\n        <li ng-if=\"model.onExport\">\n            <a href=\"\" title=\"Export to CSV\" ng-click=\"table.export()\"><uitk:icon-font icon=\"cux-icon-export\"></uitk:icon-font> {{\"Export (CSV)\" | translate}}</a>\n        </li>\n\n        <li ng-if=\"model.onExportNestedData\">\n            <a href=\"\" title=\"Export to Excel\" ng-click=\"table.exportNestedData()\"><uitk:icon-font icon=\"cux-icon-export\"></uitk:icon-font> {{\"Export (Excel)\" | translate}}</a>\n        </li>\n\n        <li ng-repeat=\"link in model.links\" uitk-compile-cell-template=\"link\"></li>\n    </ul>\n\n    <table class=\"tk-dtbl tk-dtbl-reorderable-columns\" role=\"grid\"\n           ng-class=\"{ \'tk-dtbl-expandable\' : model.rowTemplate }\" >\n        <thead>\n        <tr>\n            <th ng-repeat=\"column in model.columns | displayColumnFilter | orderBy:\'layoutOrder\'\"\n                ng-class=\"{\'tk-dtbl-non-reorderable-column-cursor\': !column.draggable, \'tk-dtbl-reorderable-column-cursor\': model.columnDraggable, \'tk-dtbl-cell-dotted-right-border\' : column.resizeInProgress, \'tk-dtbl-cro-target-border\' : column.dropInProgress, \'tk-hide-column\': column.cellName === \'multiSelectColumn\' && !model.enableMultiSelect }\"\n                uitk-dynamic-table-column-draggable=\"{{column.draggable || model.columnDraggable}}\"\n                ng-attr-rowspan=\"{{(model.enableSplitHeader && !column.numberOfSplitHeaders) ?  2 :undefined}}\"\n                ng-attr-colspan=\"{{column.numberOfSplitHeaders}}\"\n                ng-if=\"!column.numberOfSplitHeaders || (column.numberOfSplitHeaders > 1 && column.splitHeaderIndex == 1 )\"\n                ng-attr-style=\"{{column.style}}\"\n                aria-label=\"{{column.columnId}}\" aria-sort=\"{{ table.sortOrderDescription(column.sortOrder) }}\"\n                align=\"{{column.align}}\">\n                <span ng-if=\"!model.rowTemplate && column.resizable\" uitk-resizable-column ng-class=\"{\'resizable\' : !$last }\">&nbsp;</span>\n                <div ng-if=\"!column.numberOfSplitHeaders\">\n                    <a ng-if=\"isColumnSortable(column) && (!isMultiSortColumn(column))\" uitk-navigable=\"isColumnSortable(column)\"\n                       class=\"tk-dtbl-as-table-cell {{column.dataType}}\" ng-click=\"model.onSort(column.columnId)\" >\n                        <span class=\"overflow\" uitk-compile-label=\"column.label\">  </span>\n                        <uitk:icon-font ng-if=\"sortOrderEqualTo(column,1)\" icon=\"cux-icon-sort_up\"></uitk:icon-font>\n                        <uitk:icon-font ng-if=\"sortOrderEqualTo(column,-1)\" icon=\"cux-icon-sort_down\"></uitk:icon-font>\n                        <uitk:icon-font ng-if=\"column.sortable && sortOrderEqualTo(column,0)\" icon=\"cux-icon-sort\"></uitk:icon-font>\n\n                        <span ng-if=\"sortOrderEqualTo(column,\'not 0\')\" class=\"oui-a11y-hidden\" > , (sorted {{ table.sortOrderDescription(column.sortOrder) }})</span>\n                        <span ng-if=\"sortOrderEqualTo(column,0)\" class=\"oui-a11y-hidden\" > , (sortable)</span>\n                    </a>\n                    <a ng-if=\"isColumnSortable(column) && (isMultiSortColumn(column))\" uitk-navigable=\"isColumnSortable(column)&& isMultiSortColumn(column)\"\n                       class=\"tk-dtbl-as-table-cell {{column.dataType}}\" aria-disabled=\"true\">\n                        <span class=\"overflow\" uitk-compile-label=\"column.label\">  </span>\n                        <uitk:icon-font ng-if=\"multiSortOrderEqualTo(column,1)\" icon=\"cux-icon-sort_up\"></uitk:icon-font>\n                        <uitk:icon-font ng-if=\"multiSortOrderEqualTo(column,-1)\" icon=\"cux-icon-sort_down\"></uitk:icon-font>\n                    </a>\n\n\n                    <span ng-if=\"!column.sortable\" class=\"tk-dtbl-as-table-cell {{column.dataType}}\"\n                          uitk-compile-label=\"column.label\"></span>\n                    <div ng-if=\"column.cellHeaderTemplate\" uitk-compile-cell-template=\"cellHeaderTemplate\"> </div>\n                </div>\n                <span ng-if=\"!!column.numberOfSplitHeaders\" class=\"tk-group-label\"> {{column.groupLabel}} </span>\n            </th>\n        </tr>\n        <tr ng-if=\"model.enableSplitHeader\">\n            <th ng-repeat=\"column in model.columns \"\n                ng-class=\"{\'tk-dtbl-non-reorderable-column-cursor\':!column.draggable, \'tk-dtbl-non-reorderable-column-cursor\': !model.columnDraggable, \'tk-dtbl-cell-dotted-right-border\' : column.resizeInProgress, \'tk-dtbl-cro-target-border\' : column.dropInProgress, \'tk-hide-column\': column.cellName === \'multiSelectColumn\' && !model.enableMultiSelect }\"\n                uitk-dynamic-table-column-draggable=\"{{column.draggable || model.columnDraggable}}\"\n                ng-if=\"!!column.splitHeaderIndex\"\n                ng-attr-style=\"{{column.style}}\"\n                aria-label=\"{{column.columnId}}\" aria-sort=\"{{ table.sortOrderDescription(column.sortOrder) }}\"\n                align=\"{{column.align}}\">\n                <span ng-if=\"!model.rowTemplate && column.resizable\" uitk-resizable-column ng-class=\"{\'resizable\' : !$last }\">&nbsp;</span>\n                <a ng-if=\"isColumnSortable(column) && (!isMultiSortColumn(column))\" uitk-navigable=\"isColumnSortable(column)\"\n                   class=\"tk-dtbl-as-table-cell {{column.dataType}}\" ng-click=\"model.onSort(column.columnId)\" >\n                    <span class=\"overflow\" uitk-compile-label=\"column.label\">  </span>\n                    <uitk:icon-font ng-if=\"sortOrderEqualTo(column,1)\" icon=\"cux-icon-sort_up\"></uitk:icon-font>\n                    <uitk:icon-font ng-if=\"sortOrderEqualTo(column,-1)\" icon=\"cux-icon-sort_down\"></uitk:icon-font>\n                    <uitk:icon-font ng-if=\"column.sortable && sortOrderEqualTo(column,0)\" icon=\"cux-icon-sort\"></uitk:icon-font>\n\n                    <span ng-if=\"sortOrderEqualTo(column,\'not 0\')\" class=\"oui-a11y-hidden\" > , (sorted {{ table.sortOrderDescription(column.sortOrder) }})</span>\n                    <span ng-if=\"sortOrderEqualTo(column,0)\" class=\"oui-a11y-hidden\" > , (sortable)</span>\n                </a>\n                <a ng-if=\"isColumnSortable(column) && (isMultiSortColumn(column))\" uitk-navigable=\"isColumnSortable(column)&& isMultiSortColumn(column)\"\n                   class=\"tk-dtbl-as-table-cell {{column.dataType}}\" aria-disabled=\"true\">\n                    <span class=\"overflow\" uitk-compile-label=\"column.label\">  </span>\n                    <uitk:icon-font ng-if=\"multiSortOrderEqualTo(column,1)\" icon=\"cux-icon-sort_up\"></uitk:icon-font>\n                    <uitk:icon-font ng-if=\"multiSortOrderEqualTo(column,-1)\" icon=\"cux-icon-sort_down\"></uitk:icon-font>\n                </a>\n\n\n                <span ng-if=\"!column.sortable\" class=\"tk-dtbl-as-table-cell {{column.dataType}}\"\n                      uitk-compile-label=\"column.label\"></span>\n                <div ng-if=\"column.cellHeaderTemplate\" uitk-compile-cell-template=\"cellHeaderTemplate\"> </div>\n            </th>\n        </tr>\n        </thead>\n\n        <tbody ng-if=\"!model.rowTemplate && model.totalRecordsCount !== 0\">\n\n        <!-- Begins Show/Hide Columns -->\n        <tr uitk-show-hide-columns-drawer-content model=\"model\" component-id=\"componentId\"></tr>\n        <tr uitk-show-hide-columns-drawer-action model=\"model\" component-id=\"componentId\"></tr>\n        <!-- Ends Show/Hide Columns -->\n\n        <!-- Begins multiSelectDrawer -->\n        <tr uitk-multi-sort-drawer-content model=\"model\" component-id=\"componentId\"></tr>\n        <tr uitk-multi-sort-drawer-action model=\"model\" component-id=\"componentId\"></tr>\n\n        <!-- Begins onAddRow -->\n        <tr uitk-drawer-content model=\"model\" component-id=\"componentId\"></tr>\n        <tr uitk-drawer-action model=\"model\" component-id=\"componentId\"></tr>\n        <!-- Ends onAddRow -->\n        <tr ng-if=\"!model.onRowSelect\" ng-repeat=\"record in model.records | limitTo : table.recordsPerPage()\" role=\"row\">\n            <td uitk-compile-cell-template=\"cellTemplate\"\n                ng-repeat=\"column in model.columns | displayColumnFilter | orderBy:\'layoutOrder\'\"\n                ng-class=\"{ \'tk-dtbl-cell-dotted-right-border\' : column.resizeInProgress }\" align=\"{{column.align}}\"\n                class=\"tk-dtbl-cell {{column.dataType}}\">\n            </td>\n        </tr>\n        <tr ng-if=\"model.onRowSelect && !customOnEditRowIsDefined && !usingCRUD\" class=\"tk-row-order\" id=\"row_{{$index}}\" ng-repeat=\"record in model.records | limitTo : table.recordsPerPage()\"\n            ng-class=\"{\'tk-row-highlight\': record.selected, \'tk-dtbl-reorderable-row-cursor\': model.rowDraggable}\"\n            aria-selected=\"{{record.selected}}\" role=\"row\" aria-label=\"{{record.firstName}} {{record.lastName}}\"\n            ng-click=\"model.onRowSelect($event, record);\" uitk-selectable\n            uitk-dynamic-table-row-draggable=\"{{model.rowDraggable}}\" model=\"model\" index=\"$index\"\n            component-id=\"{{componentId}}\">\n            <td uitk-compile-cell-template=\"cellTemplate\"\n                ng-repeat=\"column in model.columns | displayColumnFilter | orderBy:\'layoutOrder\'\"  align=\"{{column.align}}\"\n                ng-class=\"{ \'tk-dtbl-cell-dotted-right-border\' : column.resizeInProgress }\"\n                class=\"tk-dtbl-cell {{column.dataType}}\">\n            </td>\n        </tr>\n\n        <tr ng-if=\"rowSelectedandEditing\" ng-hide=\"record.hideRecord\" id=\"{{componentId+\'_\'+$index}}\"\n            ng-repeat-start=\"record in model.records | limitTo : table.recordsPerPage()\" ng-init=\"record.index =$index;\"\n            ng-class=\"{\'tk-row-highlight\': record.selected}\" aria-selected=\"{{record.selected}}\"\n            aria-label=\"{{record.firstName}} {{record.lastName}}\"\n            role=\"row\" ng-click=\"model.onRowSelect($event, record);\" uitk-selectable\n            uitk-dynamic-table-row-draggable=\"{{model.rowDraggable}}\">\n            <td uitk-compile-cell-template=\"cellTemplate\"\n                ng-repeat=\"column in model.columns | displayColumnFilter | orderBy:\'layoutOrder\'\"  align=\"{{column.align}}\"\n                ng-class=\"{ \'tk-dtbl-cell-dotted-right-border\' : column.resizeInProgress, \'tk-hide-column\': column.cellName === \'multiSelectColumn\' && !model.enableMultiSelect }\"\n                class=\"tk-dtbl-cell {{column.dataType}}\">\n            </td>\n        </tr>\n        <!-- Begins onEditRow -->\n        <tr ng-if=\"rowSelectedandEditing\" uitk-drawer-content model=\"model\" component-id=\"componentId\" is-editing=\"true\" row-record=\"record\"  ></tr>\n        <tr ng-show=\"model.recordOperationInProgress\" ng-if=\"rowSelectedandEditing\" uitk-drawer-action model=\"model\" component-id=\"componentId\" is-editing=\"true\" row-record=\"record\" ng-repeat-end></tr>\n        <!-- Ends onEditRow -->\n\n        </tbody>\n\n        <tbody ng-if=\"model.rowTemplate && model.totalRecordsCount !== 0\">\n\n        <!-- Begins multiSelectDrawer -->\n        <tr uitk-multi-sort-drawer-content model=\"model\" component-id=\"componentId\"></tr>\n        <tr uitk-multi-sort-drawer-action model=\"model\" component-id=\"componentId\"></tr>\n\n        <tr uitk-compile-cell-template ng-repeat=\"currentRecord in model.records | limitTo : table.recordsPerPage()\">\n        </tr>\n        </tbody>\n\n        <tbody ng-if=\"model.totalRecordsCount === 0\">\n\n        <!-- Begins onAddRow -->\n        <tr uitk-drawer-content model=\"model\" component-id=\"componentId\"></tr>\n        <tr uitk-drawer-action model=\"model\" component-id=\"componentId\"></tr>\n        <!-- Ends onAddRow -->\n\n        <tr class=\"tk-dtbl-add-row tk-dtbl-header-row\">\n            <td ng-repeat=\"column in model.columns | orderBy:\'layoutOrder\'\">\n                <div class=\"tk-dtbl-add-row-constrainer\">\n                    <div ng-if=\"$index == 0\"  class=\"tk-dtbl-add-row-container\">\n                        <span class=\"tk-dtbl-add-row-required\"  uitk-compile-cell-template=\"inputTemplate\"> </span>\n                    </div>\n\n                    <div ng-if=\"$index > 0\"  class=\"tk-dtbl-add-row-container\" uitk-compile-cell-template=\"inputTemplate\">\n                    </div>\n                </div>\n            </td>\n        </tr>\n\n        <tr class=\"tk-dtbl-add-row-buttons tk-dtbl-header-row\">\n            <td colspan=\"{{model.columns.length}}\" role=\"presentation\">\n                <div class=\"tk-dtbl-add-row-button-constrainer\">\n                    <div class=\"tk-dtbl-add-row-button-container\">\n                        <span class=\"tk-dtbl-add-row-button-trim\"></span>\n                        <span class=\"tk-dtbl-add-row-button-notch\">\n                            <input type=\"button\" class=\"tk-btn-default-action tk-width-10t\" ng-click=\"model.onAddRow()\"\n                                   value=\"Save\" role=\"button\" aria-label=\"Create new record\" />\n                            <input type=\"button\" class=\"tk-btn-default-action tk-width-10t\" ng-click=\"model.onAddRowCancel()\"\n                                   value=\"Cancel\" role=\"button\" aria-label=\"Cancel new record creation\" />\n                        </span>\n                    </div>\n                </div>\n            </td>\n        </tr>\n\n        <tr>\n            <td colspan=\"{{model.columns.length}}\" class=\"tk-dtbl-cell tk-dtbl-no-records\">\n                {{ \"No records found.\" | translate }}\n            </td>\n        </tr>\n        </tbody>\n    </table>\n\n    <div ng-if=\"table.showPagination() && model.pagination.showPaginationFooter\" uitk-show-pagination></div>\n\n    <!-- Confirm modal dialog for delete -->\n    <uitk:dialog ng-if=\"model.modalShown\" dialog-id=\'deleteDialog\' dialog-role=\'dialog\'\n                 header-text=\'Confirm Delete\' show=\'model.modalShown\' default-width=\'45%\'\n                 call-back-hide=\'model.onDeleteCancel()\'>\n\n        <span>Are you sure you want to delete record(s)? This action can\'t be undone. </span>\n        <br/>\n\n        <uitk:button type=\"button\" style=\"float:left;\" value=\"Delete\"\n                     enable-default=\"true\"\n                     ng-click=\"model.onDeleteConfirm();\"\n                     custom-class=\'uitk-width-6t uitk-btn-close-dialog\'></uitk:button>\n\n        <uitk:button type=\"button\" style=\"float:left;\" value=\"Cancel\"\n                     enable-default=\"true\"\n                     onclick=\"document.getElementById(\'deleteDialog_closeLink\').click();\"\n\n                     custom-class=\'uitk-width-6t uitk-btn-close-dialog\'></uitk:button>\n    </uitk:dialog>\n\n    <!-- Busy indicator -->\n    <div ng-if=\"model.showBusyIndicator\">\n        <uitk:busy-indicator model=\"model.busyIndicatorModel\"></uitk:busy-indicator>\n    </div>\n</div>");}]);
angular.module("uitk.component.uitkFileUpload").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitk-file-upload.html","<div>\n    <div class=\"oui-upld\" role=\"group\" aria-describedby=\"{{model.id}}-status\" aria-labelledby=\"{{model.id}}-label\">\n        <!--// select file button-->\n        <input id=\"{{model.id}}-btn\" type=\"button\" class=\"tk-btn\" ng-hide=\"enableFileUploadButton\" ng-class=\"{\'tk-button-focus\':model.fileUploadButtonFocus}\" value=\"{{model.selectFilesBtn | uitkTranslate}}\" aria-describedby=\"{{model.id}}-label {{model.id}}-status {{model.id}}-inputtip\" ng-blur=\"blur();\" ng-focus=\"focus();\"  ng-click=\"selectFilesEventHandler()\" ng-disabled=\"((uploadCount+progressFileCount) >= maxFileCount)\"/>\n        <span class=\"tk-fileinput-button tk-btn\" id=\"fileupload-span\" ng-show=\"enableFileUploadButton\" ng-class=\"{\'tk-button-focus\':model.fileUploadButtonFocus}\">\n                <span class=\"tk-fileinput-selectfiles\">{{ model.selectFilesBtn }}</span>\n                <input id=\"{{model.id}}\"  ng-blur=\"blur();\" ng-focus=\"focus();\" type=\"file\" name=\"{{model.inputName ? model.inputName : \'file[]\'}}\" data-url=\"{{model.uploadUrl}}\" data-max-file-size=\"{{model.maxFileSize}}\" data-max-file-number=\"{{model.maxFileNumber}}\" data-accept-file-types=\"{{model.acceptFileTypes}}\" multiple=\"\" />\n                </span>\n        <input type=\"button\" aria-controls=\"{{model.id}}-log\" uitk-navigable=\"false\" class=\"tk-btn cancel\"  style=\"display:none; visibility:hidden;\" value=\"{{\'Cancel\' | uitkTranslate}}\" id=\"{{model.id}}_CancelBtn\"/>\n        <div id=\"{{model.id}}-status\" class=\"oui-a11y-hidden\"></div>\n        <div id=\"{{model.id}}-log\" class=\"oui-a11y-hidden\" aria-hidden=\"true\" aria-relevant=\"additions\" aria-live=\"assertive\" role=\"log\"></div>\n        <div class=\"oui-upld-container\">\n            <table class=\"oui-upld-placeholder\" id=\"{{model.id}}_Table\" role=\"grid\" aria-readonly=\"true\">\n                <tbody>\n                <tr>\n                    <td>{{model.tablePlaceholderValue | uitkTranslate}}</td>\n                    </tr>\n                </tbody>\n                </table>\n            </div>\n        <p class=\"oui-upld-restrictions\" id=\"{{model.id}}-inputtip\"></p>\n        </div>\n    </div>");}]);
/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.7.0
 */
(function () {

    /**
     * Returns true if there is a required or pattern error on a field.
     * @param field
     * @returns {boolean}
     */
    this.hasNgError = function (field) {

        if (_.find(field.FormObject.$error.required, { '$name': field.viewModel.name })) {
            return true;
        } else if (_.find(field.FormObject.$error.pattern, { '$name': field.viewModel.name })) {
            return true;
        }
        return false;
    };

    /**
     * Converts standard regexp escaping to 3 backslashes
     * @param patternString
     * @returns {*}
     * @constructor
     */
    this.EscapeRegexForTpl = function (patternString) {
        var patternStringResult = patternString.replace(/\\/g, '\\\\\\');
        return patternStringResult;
    };

    /**
     * Helper function used to create aria attributes for form components.
     * @param viewModel
     * @param type
     * @returns {string}
     */
    this.applyAriaAttr = function (viewModel, type) {
        if (viewModel.aria) {
            var ariaAttrs = '';
            angular.forEach(viewModel.aria, function (value, key) {
                if (key.length > 0 && value.length > 0) {
                    //component already have support for aria- we want to use what is already existing.
                    //we will glue layout object into the implementation of components.
                    switch (type) {
                        case 'input':
                            if (key === 'aria-describedby') {
                                key = 'tk-' + key;
                                var tip = (viewModel.label.tip) ? viewModel.name + 'TipId ' : '';
                                value = tip + value;//add built in tip id is part of the template, we must bake this in always and in defaults
                                ariaAttrs = ariaAttrs + key + "='" + value + "' ";
                            }
                            break;
                        case 'checkbox':
                            if (key === 'aria-labelledby') {
                                key = 'tk-labelledby';
                                ariaAttrs = ariaAttrs + key + "='" + value + "' ";
                            }

                            if (key === 'aria-describedby') {
                                key = 'tk-describedby';
                                var tip = (viewModel.label.tip) ? viewModel.name + 'TipId ' : '';
                                value = tip + value;//add built in tip id is part of the template, we must bake this in always and in defaults
                                ariaAttrs = ariaAttrs + key + "='" + value + "' ";
                            }
                            break;
                        case 'textarea':
                            if (key === 'aria-labelledby') {
                                key = 'tk-' + key;
                                ariaAttrs = ariaAttrs + key + "='" + value + "' ";
                            }

                            if (key === 'aria-describedby') {
                                key = 'tk-' + key;
                                var tip = (viewModel.label.tip) ? viewModel.name + 'TipId ' : '';
                                value = tip + value;//add built in tip id is part of the template, we must bake this in always and in defaults
                                ariaAttrs = ariaAttrs + key + "='" + value + "' ";
                            }

                            break;
                        case 'radio':
                            if (key === 'aria-labelledby') {
                                key = 'tk-labelledby';
                                ariaAttrs = ariaAttrs + key + "='" + value + "' ";
                            }

                            if (key === 'aria-describedby') {
                                key = 'tk-describedby';
                                var tip = (viewModel.label.tip) ? viewModel.name + 'TipId ' : '';
                                value = tip + value;
                                ariaAttrs = ariaAttrs + key + "='" + value + "' ";
                            }
                            break;
                        default:
                            ariaAttrs = ariaAttrs + key + "='" + value + "' ";
                            break;
                    }
                }
            });

            //add defaults, certain aria- will need to be present always, since this function is trying to support all
            //cases, we will add if exists and if it doesn't so this attr is always added as component expects it.
            var hasDescribedBy = ariaAttrs.indexOf("describedby") > -1;
            var hasLabelledBy = ariaAttrs.indexOf("labelledby") > -1;
            switch (type) {
                case 'input':
                case 'textarea':
                    if (!hasDescribedBy && viewModel.label.tip) {
                        ariaAttrs += 'tk-aria-describedby="' + viewModel.name + 'TipId" ';
                    }
                    break;
            }

            return ariaAttrs;
        }
    };

    /**
     * Sets the touched, dirty and validity for a form component.
     * @param ngFormField
     * @param bool
     * @param setValidity
     * @returns {*}
     */
    this.updateFieldState = function (ngFormField, bool, setValidity) {
        if (setValidity) {
            ngFormField.$dirty = true;
            ngFormField.$touched = true;
            ngFormField.$untouched = false;
            ngFormField.$invalid = !bool;
            ngFormField.$valid = bool;

        } else {
            ngFormField.$invalid = bool;
            ngFormField.$valid = !bool;
            ngFormField.$touched = bool;
            ngFormField.$untouched = !bool;
        }
        return ngFormField;
    };

    /**
     * Given a field object, returns the associated angular element.
     * @param field
     * @returns {Object}
     */
    this.getFieldDom = function (field) {
        return angular.element("#" + field.viewModel.id + "_" + field.type);
    };

    /**
     * Set up error messages based on the presence of errors in the form field.
     * @param condition
     * @param field
     * @param element
     * @returns {boolean}
     * @constructor
     */
    this.ValidateAndProcess = function (condition, field, element) {
        if (!field.FormObject.$errorMessages) field.FormObject.$errorMessages = {};//setup errorMessage object.

        var ariaDescribedByText = 'aria-describedby';//support for aria-describedby and errors;
        var ariaInvalidText = 'aria-invalid';//support for aria-describedby and errors;
        var describedBy = angular.element(element).attr(ariaDescribedByText);
        var ariaInvalid = angular.element(element).attr(ariaInvalidText);
        var errId = field.viewModel.id + '_err';

        if (condition) {//test for errors & make adjustments for visual and a11y
            field.FormObject.$errorMessages[field.viewModel.name] = field.viewModel.validation.required.message;
            // adding the described-by attribute if there is an error with the select element
            if(field.type === 'select' && !describedBy) {
                angular.element(element).attr(ariaDescribedByText, field.viewModel.id + '_err');
            }
            if (describedBy) {
                var foundErrId = (describedBy.indexOf(errId) > -1);
                if (describedBy && !foundErrId) {
                    angular.element(element).attr(ariaDescribedByText, field.viewModel.id + '_err ' + describedBy.trim());
                }
            }
            if(ariaInvalid) {
                angular.element(element).attr(ariaInvalidText, 'true');
            }

            //update to pattern error message   ng-pattern invoke invalid --
            if (hasValue(field, 'regex') && hasNgError(field) && field.FormObject[field.viewModel.name].$viewValue) {
                field.FormObject.$errorMessages[field.viewModel.name] = field.viewModel.validation.pattern.message;
            }
        } else {
            var isErrorInObj;
            for(var x in field.FormObject[field.viewModel.name].$error) {
                isErrorInObj = true;
            }

            if(!isErrorInObj) {
                delete field.FormObject.$errorMessages[field.viewModel.name];
                if (describedBy) {
                    angular.element(element).attr(ariaDescribedByText, describedBy.replace(errId, ''));
                }
                if(ariaInvalid) {
                    angular.element(element).attr(ariaInvalidText, 'false');
                }
            }
        }
        
        return condition;
    };

    /**
     * Validate the field and set resulting error messages
     * @param ngFieldValidationObject
     * @param field
     * @param fieldDom
     * @returns {boolean}
     */
    this.applyValidation = function (ngFieldValidationObject, field, fieldDom) {
        if (ngFieldValidationObject) {
            // commenting out to fix issue with Select field throwing an error even with valid selection
            //if (field.type == 'select') {
            //    if (field.FormObject[field.viewModel.name].$touched && !field.FormObject[field.viewModel.name].$dirty) {
            //        field.FormObject[field.viewModel.name].$setViewValue(undefined);//reset
            //        field.FormObject[field.viewModel.name].$setViewValue(ngFieldValidationObject.$viewValue);
            //    }
            //}
            ngFieldValidationObject.$validate();
            //is field required && dirty
            return ValidateAndProcess((ngFieldValidationObject.$dirty && ngFieldValidationObject.$invalid) || ngFieldValidationObject.$touched && ngFieldValidationObject.$invalid, field, fieldDom);
        }
    };

    /**
     * Apply additional validators to the given element.
     * @param byType
     * @param scope
     * @param ele
     * @constructor
     */
    this.CustomValidators = function (byType, scope, ele) {
        var hasError = false;

        switch (byType) {
            case 'select':
                //todo: still working on this, finishing up other fields first.
                //special validation for select since value is inside of object.

                scope.formField.FormObject[scope.formField.viewModel.name].$validators[scope.formField.viewModel.name] = function (modelValue, viewValue) {
                    
                    
                    if (scope.formField.FormObject[scope.formField.viewModel.name].$touched) {

                        if (viewValue) {//check for reset
                            //check empty state
                            if (!viewValue.value) {
                                ValidateAndProcess(true, scope.formField, angular.element(byType, ele));
                                return false;
                            } else {
                                if (scope.formField.FormObject[scope.formField.viewModel.name].$error[scope.formField.viewModel.name]) {
                                    delete scope.formField.FormObject[scope.formField.viewModel.name].$error[scope.formField.viewModel.name]
                                };
                                
                                ValidateAndProcess(false, scope.formField, angular.element(byType, ele));
                                return true;
                            }
                        } else {
                            ValidateAndProcess(true, scope.formField, angular.element(byType, ele));
                            return false;
                        };

                    } else {
                        ValidateAndProcess(false, scope.formField, angular.element(byType, ele));
                        return true;
                    };
                    
                };
                break;
            case 'checkbox':
                
                var setEvent = false;
                scope.formField.FormObject[scope.formField.viewModel.name].$validators[scope.formField.viewModel.name] = function (modelValue, viewValue) {
                    if (!setEvent) {
                        scope.$on(scope.formField.viewModel.id + '-checkboxHasChanged', function (event, args) {
                            if (scope.formField.FormObject[scope.formField.viewModel.name].$viewValue) {
                                scope.formField.FormObject[scope.formField.viewModel.name].$touched = true;
                                if(scope.formField.FormObject[scope.formField.viewModel.name].$viewValue.length == 0) {
                                    updateFieldState(scope.formField.FormObject[scope.formField.viewModel.name], false, true);
                                    ValidateAndProcess(true, scope.formField, angular.element("[role=group]", ele));
                                } else {
                                    updateFieldState(scope.formField.FormObject[scope.formField.viewModel.name], true, true);
                                    ValidateAndProcess(false, scope.formField, angular.element("[role=group]", ele));
                                }
                            }
                            scope.formField.FormObject[scope.formField.viewModel.name].$setViewValue(args.itemList);

                            scope.formField.FormObject[scope.formField.viewModel.name].$validate();

                        });
                        setEvent = true;
                    }
                    if (scope.formField.FormObject[scope.formField.viewModel.name].$touched) {
                        if (viewValue) {
                            if (viewValue.length == 0) {
                                updateFieldState(scope.formField.FormObject[scope.formField.viewModel.name], false, true);
                                ValidateAndProcess(true, scope.formField, angular.element("[role=group]", ele));

                            } else {
                                updateFieldState(scope.formField.FormObject[scope.formField.viewModel.name], true, true);
                                ValidateAndProcess(false, scope.formField, angular.element("[role=group]", ele));
                            }
                        } else {
                            updateFieldState(scope.formField.FormObject[scope.formField.viewModel.name], false, true);
                            ValidateAndProcess(true, scope.formField, angular.element("[role=group]", ele));
                        }
                    }
                };

                break;
            case 'radio':
                scope.formField.FormObject[scope.formField.viewModel.name].$validators[scope.formField.viewModel.name] = function (modelValue, viewValue) {
                    if (scope.formField.FormObject[scope.formField.viewModel.name].$touched) {
                        if (viewValue) {
                            if (viewValue.length == 0) {
                                updateFieldState(scope.formField.FormObject[scope.formField.viewModel.name], false, true);
                                ValidateAndProcess(true, scope.formField, angular.element("[role=group]", ele));

                            } else {
                                updateFieldState(scope.formField.FormObject[scope.formField.viewModel.name], true, true);
                                ValidateAndProcess(false, scope.formField, angular.element("[role=group]", ele));
                            }
                        } else {
                            updateFieldState(scope.formField.FormObject[scope.formField.viewModel.name], false, true);
                            ValidateAndProcess(true, scope.formField, angular.element("[role=group]", ele));
                        }
                    }
                };

             break;

            case 'custom':
                // custom validation

                // validate that field object exists
                if (!scope.formField.FormObject[scope.formField.viewModel.name]) return;

                // check for customValidator callback exist
                if ( !scope.formField.viewModel.customValidator ) return;

                scope.formField.viewModel.customValidator(byType, scope, ele);

                break;

            /* case 'textarea':
                 //todo: maybe the same as default...need to check
                 break;*/
            default://input and textarea
                //validate that field object exists
                if (!scope.formField.FormObject[scope.formField.viewModel.name]) return;
                //overload validator required for all fields, ng-required automatically adds required=required we will adjust this.
                scope.formField.FormObject[scope.formField.viewModel.name].$validators.required = function (modelValue, viewValue) {
                    //get field object
                    var ngFieldObject = scope.formField.FormObject[scope.formField.viewModel.name];

                    //remove required attribute for a11y
                    angular.element(byType, ele).removeAttr('required');
                    //validate and process and return if valid.
                    return !ValidateAndProcess((ngFieldObject.$touched || ngFieldObject.$dirty) && !viewValue, scope.formField, angular.element(byType, ele));
                };
                break;
        }
    };

    /**
     * Returns a boolean that indicates if field contains property.
     * @param field
     * @param property
     * @returns {*}
     */
    this.hasValue = function (field, property) {//default required
        switch (property) {
            case 'regex':
                return field.viewModel.validation && field.viewModel.validation.pattern && field.viewModel.validation.pattern.regex;
                
            default:
                //required
                return field.viewModel.label && field.viewModel.label.required;


        }
    };
})();

angular.module("uitk.component.uitkFormLayout").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitk-form-layout-template.html","<ng-form novalidate>\n\n    <div ng-if=\"formErrorMessageModel\">\n        <uitk:message model=\"formErrorMessageModel\"></uitk:message>\n    </div>\n    <div class=\"tk-padding-1t tk-brdr-gray-0 \">\n        <h2>{{formLabel}}</h2>\n        <p ng-if=\"requiredTextHead\" class=\"tk-form-required\"><uitk:icon-font icon=\"cux-icon-asterisk\" hidden-text=\"All Fields Are\"></uitk:icon-font> {{requiredTextHead}}</p><!-- todo: add translate-->\n        <div ng-class=\"oneColumnLayout ? \'oui-rfrm\' : \'oui-rfrm-2col\'\">\n            <div ng-repeat=\"field in formItems\" ng-class=\"{\'oui-rfrm-group-vertical\': layout === \'vertical\', \'oui-rfrm-group\': layout === \'horizontal\', \'oui-rfrm-group-2col\': oneColumnLayout === false}\">\n                <div ng-class=\"{\'oui-rfrm-label-container-vertical\': layout === \'vertical\', \'oui-rfrm-label-container\': layout === \'horizontal\'}\" ng-init=\"hasLabelledby=field.viewModel.aria[\'aria-labelledby\'];labelledByforValue=field.viewModel.id+\'_\'+field.type\">\n                    <uitk:label id=\'{{field.viewModel.name}}_label\' ng-attr-for=\"{{((hasLabelledby)?undefined:labelledByforValue)}}\" ng-if=\"field.viewModel.label.required && field.type !== \'button\'\" required=\"true\"> {{field.viewModel.label.text}}</uitk:label>\n                    <uitk:label id=\'{{field.viewModel.name}}_label\' ng-attr-for=\"{{((hasLabelledby)?undefined:labelledByforValue)}}\" ng-if=\"!field.viewModel.label.required && field.type !== \'button\'\"> {{field.viewModel.label.text}}</uitk:label>\n                </div>\n                <div ng-class=\"{ \'oui-rfrm-has-error\' : field.FormObject.$errorMessages[field.viewModel.name] && field.FormObject[field.viewModel.name].$invalid }\">\n                        <!-- field -->\n                        <uitk:field form-field=\"field\" form-object=\"formObject\" form-messages=\"formErrorMessageModel\" ng-model=\"field.viewModel.model\"></uitk:field>\n                        <!--/field-->\n\n                        <!-- only display inline error if not calendar && dob !-->\n                        <span ng-if=\"field.type !== \'dob\' && field.type !== \'calendar\'\" ng-class=\"{\'oui-rfrm-validation\': layout === \'horizontal\', \'oui-rfrm-validation-vertical\': layout === \'vertical\'}\">\n                            <small id=\"{{field.viewModel.id}}_err\" tabindex=\"-1\"\n                               ng-if=\"field.FormObject.$errorMessages[field.viewModel.name] && field.FormObject[field.viewModel.name].$invalid\">\n                            {{ field.FormObject.$errorMessages[field.viewModel.name] }}\n                            </small>\n                        </span>\n                </div>\n\n                <span class=\"oui-rfrm-tip\" id=\"{{field.viewModel.name}}TipId\" ng-if=\"field.viewModel.label.tip  && field.type !== \'dob\' && field.type !== \'calendar\'\">\n                    <span ng-bind-html=\"field.htmlTip\"></span>\n                </span>\n            </div>\n        </div>\n    </div>\n    \n\n</ng-form>\n");}]);
angular.module("uitk.component.uitkGlobalNavigation").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitk-global-navigation.html","<div>\n    <ul ng-if=\'rootMenu.model.displayMode>0 || rootMenu.model.useStripOnMobile\'\n        ng-class=\'{\"tk-gnav-submenu-open\": model.menuVisible, \"tk-gnav-to-the-left\": model.menuPosition, \"tk-gnav\": model.level===1 }\'\n        uitk-slide-show=\"model.menuVisible\" uitk-slide-show-duration=\"500\">\n        <li ng-repeat=\"item in model.links\" ng-if=\"!item.hidden\"\n            ng-class=\'{\"tk-gnav-selected\": item.selected, \"tk-gnav-disabled\": item.disabled, \"tk-gnav-profileName\" : item.profileName}\'>\n            <uitk-help ng-if=\"item.help\"></uitk-help>\n            <span ng-if=\"item.profileName\">\n                <uitk:icon-font icon=\"cux-icon-person\"></uitk:icon-font>\n                <span>{{\"Welcome\" | translate }}, {{item.profileName}}</span>\n            </span>\n            <a ng-if=\"!item.disabled && !item.help && !item.profileName\"\n               ng-class=\"{\'select-active\': item.selected, \'selected-link\': isSelected(item)}\" href=\"javascript:void(0);\"\n               ng-click=\"expandMenuOrRedirectToLink($event,item)\" ng-keydown=\"hideParentMenu($event, item)\"\n               uitk-global-nav-compile-link=\"item\" apply-parent-focus>\n                <span ng-if=\"item.dropDown && model.level >= 1\" class=\"oui-a11y-hidden\">Has Submenu.</span>\n                <uitk:icon-font ng-if=\" item.dropDown && show === true\" icon=\"cux-icon-caret_down_centered\"></uitk:icon-font>\n                <uitk:icon-font ng-if=\" item.dropDown && !show\" icon=\"cux-icon-caret_right\"></uitk:icon-font>\n\n                <span class=\"oui-a11y-hidden\">\n                    <span ng-if=\"item.dropDown && model.level >= 1 && isExpanded(item)\">Expanded</span>\n                    <span ng-if=\"item.dropDown && model.level >= 1 && !isExpanded(item)\">Collapsed</span>\n                </span>\n            </a>\n            <span ng-if=\"item.disabled && !item.help\" ng-if=\"\" ng-click=\"$event.stopPropagation();\" role=\"link\" aria-disabled=\"true\" ng-bind-html=\"getTrustedTextTemplate(item)\"></span>\n            <uitk-global-navigation ng-if=\"item.dropDown\" model=\"item.dropDown\" ng-init=\"item.dropDown.parentId  = model.id\" focus-item=\"item\"></uitk-global-navigation>\n        </li>\n    </ul>\n    <ul ng-if=\'rootMenu.model.displayMode===0 && !rootMenu.model.useStripOnMobile\'\n        ng-class=\'{\"menuVisible\": model.menuVisible, \"tk-vnav\": model.level===1 }\'\n        role=\"{{model.level === 1 ? \'navigation\' : \'group\'}}\" uitk-slide-show=\"model.menuVisible\"\n        uitk-slide-show-duration=\"500\">\n        <li ng-repeat=\"item in model.links\" ng-class=\'{\"disabled\": item.disabled}\' ng-if=\"!item.hidden\">\n            <uitk-help ng-if=\"item.help\"></uitk-help>\n            <a ng-if=\"!item.disabled && !item.help\" ng-class=\"{\'select-active\': item.selected}\"\n               uitk-navigable=\"!item.disabled\" ng-click=\"expandMenuOrRedirectToLink($event,item)\"\n               ng-attr-aria-expanded=\"{{isExpanded(item)}}\" aria-haspopup=\"{{item.dropDown ? true : false}}\"\n               uitk-global-nav-compile-link=\"item\">\n                <uitk:icon-font ng-if=\"item.dropDown && item.dropDown.menuVisible === true\" icon=\"cux-icon-caret_down_centered\" ></uitk:icon-font>\n                <uitk:icon-font ng-if=\"item.dropDown && item.dropDown.menuVisible === false\" icon=\"cux-icon-caret_right\"></uitk:icon-font>\n            </a>\n            <span ng-if=\"item.disabled && !item.help\" ng-click=\"$event.stopPropagation();\" aria-disabled=\"true\" uitk-global-nav-compile-link=\"item\"></span>\n            <uitk-vertical-navigation ng-if=\"item.dropDown\" model=\"item.dropDown\" ng-init=\"item.dropDown.parentId  = model.id\"></uitk-vertical-navigation>\n        </li>\n    </ul>\n</div>\n");}]);
angular.module("uitk.component.uitkHeaderDrawer").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitk-header-drawer.html","<div class=\"tk-header-drawer\">\n    <!-- optional Message component will be generated here -->\n    <div class=\"tk-hd-message\" ng-if=\"model && model.message\">\n        <uitk:message id=\"messageContent_{{model.message.id}}\" model=\"model.message\" ng-click=\"toggleContentWaringMessage($event)\">\n            <div ng-if=\"model.message.messageType === \'warning\'\">\n                <div class=\"tk-hd-warning-content-title\">\n                    <strong>{{model.message.contentTitle}}</strong>\n                </div>\n\n                <div class=\"tk-hd-warning-content-icon\">\n                    <uitk:icon-font ng-if=\"model.message.expanded\" icon=\"cux-icon-caret_down_centered\"></uitk:icon-font>\n                    <uitk:icon-font ng-if=\"!model.message.expanded\" icon=\"cux-icon-caret_right\"></uitk:icon-font>\n                </div>\n\n                <div class=\"tk-hd-warning-content-message\">\n                    <span ng-class=\"{\'tk-hd-truncate-warning-content\' : !model.message.expanded}\" ng-bind-html=\"model.message.content\"></span>\n                </div>\n            </div>\n        </uitk:message>\n    </div>\n\n    <div class=\"tk-hd-header\">\n        <div class=\"tk-hd-featured-content\" ng-if=\"featuredContent\">\n            <div ng-bind-html=\"featuredContent\"></div>\n        </div>\n\n        <div class=\"tk-hd-additional-content\" ng-if=\"model && model.sections.additional\">\n            <div class=\"tk-hd-primary-detail\" ng-if=\"primaryDetail\">\n                <div class=\"tk-details-container\" id=\"detail_item_{{item.id}}\" ng-repeat=\"item in primaryDetail\">\n                    <div class=\"tk-details-cell\">\n                        <span ng-if=\"item.label\">{{item.label}}</span>\n                    </div>\n                    <div class=\"tk-details-cell\">\n                        <span ng-bind-html=\"item.content\"></span>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"tk-hd-secondary-detail\" ng-if=\"secondaryDetail\">\n                <div class=\"tk-details-container\" id=\"detail_item_{{item.id}}\" ng-repeat=\"item in secondaryDetail\">\n                    <div class=\"tk-details-cell\">\n                        <span ng-if=\"item.label\">{{item.label}}</span>\n                    </div>\n                    <div class=\"tk-details-cell\">\n                        <span ng-if=\"!item.truncateContent\" ng-bind-html=\"item.content\"></span>\n                        <span ng-if=\"item.truncateContent\">\n                          <span uitk-tooltip id=\"\"  tooltip-placement=\"left\">\n                            <span class=\"tk-hd-truncate-content\" ng-bind-html=\"item.content\"></span>\n                            <uitk-tooltip-content>{{item.content}}</uitk-tooltip-content>\n                          </span>\n                        </span>\n                      </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"tk-hd-tab-icons\" ng-if=\"model && model.sections.tabIcons\" aria-describedby=\"tablist_desc\">\n            <div class=\"oui-a11y-hidden\" id=\"tablist_desc\" aria-hidden=\"false\" tabindex=\"-1\">Use arrow keys to move between tabs, enter to activate</div>\n\n            <ul role=\"tablist\">\n                <li class=\"tk-hd-tab-icon\" ng-repeat=\"tab in model.sections.tabIcons | orderBy: \'layoutOrder\'\" ng-class=\"{ selected: isSet(tab.id) }\" role=\"presentation\">\n                    <a class=\"tk-hd-tab-link\" id=\"tab_{{tab.id}}\" href=\"javascript:void(0)\" ng-click=\"setTab(tab.id); openDrawer(tab.id)\" role=\"tab\" tabindex=\"{{(selectedTab === tab.id || defaultTabIndex === tab.id || (selectedTab === undefined && tab.id === model.sections.tabIcons[0].id)) ? 0 : -1}}\" aria-selected=\"{{selectedTab === tab.id ? true : false}}\" aria-expanded=\"{{selectedTab === tab.id ? true : false}}\" ng-attr-aria-controls=\"tab_{{tab.id}}_tabpanel\" ng-keyup=\"tabKeyupHandler($index, $event);\">\n                        <uitk:icon-font id=\"icon_{{tab.id}}\" icon=\"{{tab.iconName}}\" hidden-text=\"{{tab.hiddenText}}\" model=\"tab.model\"></uitk:icon-font>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n\n    <!-- This div is generated if the animation is turned on -->\n    <div role=\"tabpanel\" aria-labelledby=\"tab_{{tab.id}}\" class=\"tk-hd-drawer-container\" uitk-slide-show=\"drawerVisible\" uitk-slide-show-duration=\"{{model.animateDrawer.duration}}\" ng-if=\"model && model.sections.tabIcons && (model.animateDrawer && model.animateDrawer.animate === true)\" ng-repeat=\"tab in model.sections.tabIcons | orderBy: \'layoutOrder\'\" id=\"tab_{{tab.id}}_tabpanel\" tabindex=\"-1\" ng-keyup=\"drawerKeyUpHandler($index, $event);\">\n        <div class=\"tk-hd-drawer\" ng-if=\"isSet(tab.id)\">\n            <h2 class=\"tk-hd-drawer-heading\">{{tab.contentHeading}}</h2>\n\n            <div class=\"tk-hd-drawer-close-btn\">\n                <a class=\"tk-hd-close-link\" href=\"javascript:void(0)\" ng-click=\"closeDrawer(tab.id);\" id=\"tab_{{tab.id}}_close_btn\">\n                    <uitk:icon-font icon=\"cux-icon-close\" hidden-text=\"Close content drawer\"></uitk:icon-font>\n                </a>\n            </div>\n\n            <div class=\"tk-hd-drawer-content\" ng-bind-html=\"tab.content\"></div>\n        </div>\n    </div>\n\n    <!-- This div is generated if the animation is turned off -->\n    <div role=\"tabpanel\" aria-labelledby=\"tab_{{tab.id}}\" class=\"tk-hd-drawer-container\" ng-if=\"model && model.sections.tabIcons && (!model.animateDrawer || model.animateDrawer.animate === false)\" ng-repeat=\"tab in model.sections.tabIcons | orderBy: \'layoutOrder\'\" id=\"tab_{{tab.id}}_tabpanel\" tabindex=\"-1\" ng-keyup=\"drawerKeyUpHandler($index, $event);\">\n        <div class=\"tk-hd-drawer\" ng-if=\"isSet(tab.id)\">\n            <h2 class=\"tk-hd-drawer-heading\">{{tab.contentHeading}}</h2>\n\n            <div class=\"tk-hd-drawer-close-btn\">\n                <a class=\"tk-hd-close-link\" href=\"javascript:void(0)\" ng-click=\"closeDrawer(tab.id);\" id=\"tab_{{tab.id}}_close_btn\">\n                    <uitk:icon-font icon=\"cux-icon-close\" hidden-text=\"Close content drawer\"></uitk:icon-font>\n                </a>\n            </div>\n\n            <div class=\"tk-hd-drawer-content\" ng-bind-html=\"tab.content\"></div>\n        </div>\n    </div>\n\n</div>\n");}]);
angular.module("uitk.component.uitkHeroImage").run(["$templateCache", function($templateCache) {$templateCache.put("template/hero-image.html","<div ng-class=\"viewModel.imageSize === \'big\' ? \'image-container-bg\' : \'image-container-md\'\">\n        <div ng-class=\"viewModel.imageSize === \'big\' ? \'image-inner-content-bg\' : \'image-inner-content-md\'\">\n            <h2 class=\"image-prod-name\">{{ viewModel.productName }}</h2>\n            <h3 class=\"image-prod-desc\">{{ viewModel.productDesc }}</h3>\n        </div>\n    <!--<div class=\"col-md-6\">\n        <img ng-src=\"{{ viewModel.imageSrc }}\" class=\"hero__brandimg\" />\n    </div>-->\n</div>");}]);
angular.module("uitk.component.uitkIconFont").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitk-icon-font.html","<span class=\"tk-icon\"><span aria-hidden=\"true\" class=\"tk-icon-glyph\"><span class=\"{{icon}}\"></span></span><span class=\"html-template\" uitk-compile-template ng-if=\"model && model.htmlTemplate\"></span><span class=\"html-template\" ng-bind-html=\"trustedHtmlTemplate\" ng-if=\"!model && iconText\"></span><span ng-if=\"hiddenText\" class=\"oui-a11y-hidden\">{{hiddenText}}</span></span>");}]);
angular.module("uitk.component.uitkLineChart").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitkLineChartTemplate.html","<div class=\"tk-linechart\" id=\"{{viewModel.id}}\">\n\n    <uitk:dialog dialog-id=\'{{viewModel.id}}_dialog\' dialog-role=\'alertdialog\'\n                 header-text=\'{{viewModel.heading}} Data\'\n                 show=\'showMe\'\n                 ng-if=\"showMe\"\n                 call-back-hide=\"callBackHideDialog()\"\n                 confirm-dialog=\"false\"\n                 default-width=\'25%\' trigger-element=\'#{{viewModel.id}}_dialog_openModalBtn\'>\n        <h3 id=\"{{viewModel.id}}_data\">{{viewModel.description}}</h3>\n        <div role=\"document\" tabindex=\"0\">\n            <div ng-repeat=\"lines in viewModel.data\">\n                <h4 id=\"{{viewModel.id}}_data_{{$index}}\">{{lines.key}}</h4>\n                <table aria-describedby=\"{{viewModel.id}}_data_{{$index}}\">\n                    <tbody>\n                    <tr>\n                        <th scope=\"col\" class=\"tk-accessible-chart-label-column\">Label</th>\n                        <th scope=\"col\">Value</th>\n                    </tr>\n                    <tr ng-repeat=\"item in lines.values\">\n                        <th scope=\"row\" class=\"tk-accessible-chart-label-column\">{{item.x}}</th>\n                        <td class=\"tk-accessible-chart-value-column\">{{item.y| number:viewModel.decimalPlaces }}</td>\n                    </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n        <uitk:button type=\"button\" style=\"float:left;\" value=\"Close\" enable-default=\"true\"\n                     ng-click=\"callBackHideDialog();\" custom-class=\'uitk-width-6t uitk-btn-close-dialog\'></uitk:button>\n\n    </uitk:dialog>\n    <div aria-hidden=\"{{isOpened.dialogOpened}}\">\n        <div id=\"{{viewModel.id}}_label\" tabindex=\"-1\"><h2>{{viewModel.heading}}</h2></div>\n        <div ng-class=\"{\'oui-a11y-hidden\': !viewModel.showA11yDescription}\" id=\"{{viewModel.id}}_desc\">\n            {{viewModel.a11yDescription}}\n        </div>\n        <button id=\"{{viewModel.id}}_dialog_openModalBtn\" class=\"tk-linechart-showdata-button\"\n                ng-click=\"contentKeyupHandler()\">Show data for this chart\n        </button>\n        <svg aria-hidden=\"true\" ng-mouseover=\"!setAriaHidden && mouseover();\" aria-labelledby=\"{{viewModel.id}}_label\"\n             aria-describedby=\"{{viewModel.id}}_desc\" role=\"img\" alt={{viewModel.description}}></svg>\n    </div>\n</div>");}]);
angular.module("uitk.component.uitkMegaMenu").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitkMegamenuTemplate.html","<div class=\"mega-menu-header\">\n    <ul>\n        <li ng-repeat=\"item in viewModel.items\" ng-class=\"isSelected === $index ? \'highlight-background\' : \'\'\" name=\"{{item.name}}\" ng-keydown=\"enterKey($event, item, $index)\">\n            <a href=\"#\" ng-click=\"showDropdown(item.name, $index)\" id=\"{{item.name}}_id\" apply-parent-focus><span>{{item.title}} </span>\n                <uitk:icon-font ng-if=\"item.dropdown && isSelected === $index\" class=\"mega-menu-header-arrow\" icon=\"cux-icon-arrow_down\"></uitk:icon-font>\n                <uitk:icon-font ng-if=\"item.dropdown && (!isSelected || isSelected == undefined || isSelected !== $index)\" class=\"mega-menu-header-arrow\" icon=\"cux-icon-arrow_right\"></uitk:icon-font>\n                <span ng-if=\"item.dropdown\" class=\"oui-a11y-hidden\">Has Submenu</span>\n                <span ng-if=\"show && item.dropdown && isSelected === $index\" class=\"oui-a11y-hidden\">Expanded</span>\n                <span ng-if=\"!show && item.dropdown\" class=\"oui-a11y-hidden\">Collapsed</span>\n            </a>\n        </li>\n    </ul>\n</div>\n\n<div ng-if=\"show\" class=\"mega-menu-container\" role=\"group\" aria-labelledby=\"{{aria_parentName}}_id\" ng-keydown=\"hideMenu($event, isSelected)\">\n    <div class=\"left-column\">\n        <div class=\"left-column-contents\">\n            <h2>{{parentName}}</h2> <!-- same style for the h1-->\n            <a ng-if=\"hasTitleLink\" href=\"{{parentLink}}\" id=\"first_focus\" ng-keydown=\"firstTabKey($event,viewModel.items, isSelected)\" ng-click=\"view(parentName)\">View {{parentName}}</a>\n        </div>\n    </div>\n\n    <div class=\"mid-column\">\n        <div class=\"mid-column-contents\">\n            <ul>\n                <li ng-repeat=\"list in dropDown\">\n                    <a id=\"list_{{$index+1}}\" href=\"{{list.url}}\" ng-keydown=\"tabKey($event,$index, isSelected)\">{{list.name}}\n                        <uitk:icon-font icon=\"cux-icon-arrow_right\"></uitk:icon-font>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n\n    <div class=\"right-column\" ng-if=\"hasAdditionalInfo\">\n        <div class=\"right-column-contents\">\n            <aside class=\"mega-menu-card\">\n                <h3>{{parentName}} Highlight</h3>\n                <p>{{additionalInfo}}</p>\n                <a href=\"#\" ng-keydown=\"lastTabKey($event, isSelected)\" ng-click=\"viewAdditionalInfo(parentName)\">Learn More</a>\n            </aside>\n        </div>\n    </div>\n</div>");}]);
angular.module("uitk.component.uitkPhiConfirmationDialog").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitk-phi-confirmation.html","<div>\n<uitk:dialog dialog-id=\"{{componentId}}Dialog\"\n             dialog-role=\"dialog\" \n             header-text=\"<span>Protected Health Information (PHI) Acknowledgement</span>\" \n             show=\"viewModel.isDisplayed\" confirm-dialog=\"false\" \n             tk-aria-describedby=\"dialogInsTextId\" default-width=\"50%\"\n             trigger-element=\"#uitkOpenPHI_Dialog\">\n\n    <div ng-if=\"viewModel.showRecordCount\" class=\"tk-margin-bottom-1t\">\n        <p class=\"tk-margin-none\">{{ viewModel.totalRecordsCount }} records will be exported.</p>\n        <div class=\"tk-margin-top-1t\">\n            <div class=\"tk-form-checkboxes-radios\">\n                <input type=\"checkbox\" id=\"nested_input\" name=\"nested\"\n                        ng-model=\"viewModel.nestedData.value\" ng-disabled=\"viewModel.nestedData.disabled\" \n                        ng-checked=\"viewModel.nestedData.checked\" aria-describedby=\"onNestedDescription\" \n                        ng-click=\"viewModel.nestedData.checked=!viewModel.nestedData.checked; onChange();\">\n                </input>\n                <label for=\"nested_input\" tabindex=\"-1\">{{viewModel.nestedData.label | uitkTranslate}}</label>\n                <span id=\"onNestedDescription\" class=\"oui-a11y-hidden\" tabindex=\"-1\">Include nested data</span>\n            </div>\n        </div>\n    </div>\n\n    <p>You are about to export protected health information to a file that may be used outside of this application.</p>\n    <p>This information is subject to HIPAA or other privacy laws.</p>\n\n    <div class=\"tk-margin-bottom-1t\">\n        <div class=\"tk-margin-top-1t\">\n            <div class=\"tk-form-checkboxes-radios\">\n                <input type=\"checkbox\" id=\"acknowledge_input\" name=\"acknowledge\"\n                        ng-model=\"viewModel.isAcknowledged\" ng-disabled=\"viewModel.acknowledgeData.disabled\" \n                        ng-checked=\"viewModel.acknowledgeData.checked\" aria-describedby=\"onAcknowledgeDescription\" \n                        ng-click=\"viewModel.acknowledgeData.checked=!viewModel.acknowledgeData.checked; onChange();\" \n                        ng-change=\"ackClicked()\">\n                </input>\n                <label for=\"acknowledge_input\" tabindex=\"-1\">{{viewModel.acknowledgeData.label | uitkTranslate}}</label>\n                <p><span id=\"onAcknowledgeDescription\" class=\"oui-a11y-hidden\" tabindex=\"-1\">I acknowledge that it is my obligation to comply with all privacy and security obligations contained in these laws.</span></p>\n            </div>\n        </div>\n    </div>\n    \n    <!--div class=\"tk-nested-tablet-wrapper\">\n        <div ng-if=\"viewModel.showRecordCount\" class=\"tk-margin-bottom-1t\">\n            <p class=\"tk-margin-none\">{{ viewModel.totalRecordsCount }} records will be exported.</p>\n            <div class=\"tk-margin-top-1t\">\n                <input type=\"checkbox\" class=\"tk-float-left tk-margin-right-min\" id=\"exportNestedMessage\"\n                       ng-model=\"viewModel.isExportNestedChecked\"\n                       ng-change=\"viewModel.exportNestedClicked()\" />\n                <p class=\"tk-margin-none\">Include nested data</p>\n            </div>\n        </div>\n\n        <p>You are about to export protected health information to a file that may be used\n            outside of this application.</p>\n        <p>This information is subject to HIPAA or other privacy laws.</p>\n\n        <div class=\"tk-form-validation-error-panel\" ng-show=\"showError\"\n             role=\"alert\"\n             aria-live=\"assertive\"\n             aria-atomic=\"true\"\n             aria-relevant=\"all\">\n            <div class=\"icon-exclamationmark-container\"><span class=\"icon-exclamationmark\"></span></div>\n            <span class=\"tk-form-validation-error-text\">You must check the box below to export protected health information.</span>\n        </div>\n\n        <div class=\"tk-margin-top-1t\">\n            <input type=\"checkbox\" class=\"tk-float-left tk-margin-right-min\" id=\"acknowledgement\" ng-model=\"viewModel.isAcknowledged\" ng-change=\"ackClicked()\" />\n            <p>I acknowledge that it is my obligation to comply with all privacy and security obligations contained in these laws.</p>\n        </div>\n    </div-->\n\n    <!-- Display a divider here -->\n    <div style=\"border-bottom: 1px solid #ccc; margin: 0rem -1.083rem 0rem -1.083rem\"></div>\n\n    <uitk:button value=\"Export\" type=\"button\" id=\"exportButton\" aria-describedby=\"exportButton-desc\"\n                 uitk-btn-disabled=\"!viewModel.isAcknowledged\"\n                 ng-click=\"onOKClicked()\"\n                 custom-class=\'tk-width-6t uitk-btn-close-dialog\'>\n    </uitk:button>\n    <span tabindex=\"-1\" class=\"oui-a11y-hidden\" id=\"exportButton-desc\">you must check acknowledgement checkbox to enable this button</span>\n    <uitk:button value=\"Cancel\" type=\"button\"\n                 enable-default=\"false\"\n                 ng-click=\"onCancelClicked()\"\n                 custom-class=\"tk-btn-secondary-link uitk-btn-close-dialog\">\n    </uitk:button>\n</uitk:dialog>\n</div>");}]);
angular.module("uitk.component.uitkPicklist").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitk-picklist.html","<div class=\"oui-pick\" role=\"group\">\n\n    <div>\n\n        <div class=\"oui-pick-available {{tkModal.error?\'oui-pick-error\':\'\'}}\" >\n            <h3 ng-if=\"tkModal.availableListTitle\">{{tkModal.availableListTitle}} <span ng-if=\"tkModal.showCount\">({{getItemCount(\'availableList\')}})</span></h3>\n            <h3 ng-if=\"!tkModal.availableListTitle\">{{\"Available\" | uitkTranslate}} <span ng-if=\"tkModal.showCount\">({{getItemCount(\'availableList\')}})</span></h3>\n\n            <!--[if lte IE 9]>\n            <div class=\"old_ie_wrapper\">\n                <!--<![endif]-->\n            <div class=\"oui-util-scroll-vertical\" ng-class=\"{\'tk-pick-scroll-vertical-content\':tkModal.columns.length < 2, \'oui-pick-scroll-horizontal\':tkModal.columns.length > 3 }\" ng-attr-aria-describedby=\"{{tkModal.availableListHintText ? id+\'-src-input-tip\' : undefined}}\" uitk-navigable=\"true\" ng-keydown=\"setFocusInAvailable($event);\">\n                <table class=\"oui-pick-options\" role=\"presentation\">\n                    <thead ng-class=\"{\'tk-hide-column\':tkModal.columns.length == 0 }\">\n                    <tr>\n                        <th ng-if=\"tkModal.enableMultiRowSelection\">\n                            <div>\n                                <label for=\"{{id}}_available_check_all\" class=\"oui-a11y-hidden\">Select All</label>\n                                <input type=\"checkbox\" id=\"{{id}}_available_check_all\" ng-model=\"tkModal.selectAllAvailableRows\" ng-change=\"tkModal.onSelectAllRows($event,\'availableList\')\"/>\n                            </div>\n                        </th>\n                        <th ng-repeat=\"column in tkModal.columns\" aria-sort=\"{{(sortOrderEqualTo(column,1,\'availableList\'))?\'ascending\':((sortOrderEqualTo(column,-1,\'availableList\'))?\'descending\':\'none\')}}\">\n                            <div class=\"oui-util-truncate\" ng-style=\"{ \'width\': column.width }\">\n                                <span ng-if=\"!column.enableSort\">{{column.label}}</span>\n                                <a ng-if=\"column.enableSort\"  ng-click=\"tkModal.onSort($event,[\'availableList\'], column)\" uitk-navigable=\"isColumnSortable(column)\">\n                                    <span>{{column.label}}</span>\n                                    <uitk:icon-font ng-if=\"sortOrderEqualTo(column,1,\'availableList\')\" icon=\"cux-icon-sort_up\"></uitk:icon-font>\n                                    <uitk:icon-font ng-if=\"sortOrderEqualTo(column,-1,\'availableList\')\" icon=\"cux-icon-sort_down\"></uitk:icon-font>\n                                    <uitk:icon-font ng-if=\"column.enableSort && sortOrderEqualTo(column,0,\'availableList\')\" icon=\"cux-icon-sort\"></uitk:icon-font>\n                                    <span class=\"oui-a11y-hidden\">, {{(sortOrderEqualTo(column,1,\'availableList\'))?\'sorted ascending\':((sortOrderEqualTo(column,-1,\'availableList\'))?\'sorted descending\':\'sortable\')}}</span>\n                                </a>\n                                <div ng-if=\"column.enableSearch\">\n                                    <label for=\"available-list-{{column.id}}\" class=\"oui-a11y-hidden\">{{\"Filter by \" + column.label}}</label>\n                                    <input id=\"available-list-{{column.id}}\" type=\"text\" ng-model=\"column.searchInputAvailable\" ng-change=\"tkModal.onSearch($event,[\'availableList\'],$index)\" ng-model-options=\"{ debounce: 500 }\" />\n                                </div>\n                            </div>\n                        </th>\n                    </tr>\n                    </thead>\n                    <tbody>\n                    <tr id=\"picklist-available-{{$index}}\" ng-click=\"selectDataInAvailableList($index,$event);\" ng-class=\"{\'oui-pick-selected\':record.selected}\" ng-repeat=\"record in tkModal.availableList | filter:{ hide: \'!\' }\" ng-init=\"trIndex=$index\">\n                        <td ng-if=\"tkModal.enableMultiRowSelection\">\n                            <div>\n                                <label for=\"{{id}}_available_check_{{$index}}\" class=\"oui-a11y-hidden\" ng-if=\"!!tkModal.allyColumnForCheckbox\">Select for {{record[tkModal.allyColumnForCheckbox]}}</label>\n                                <input type=\"checkbox\" id=\"{{id}}_available_check_{{$index}}\" ng-checked=\"record.selected\" ng-focus=\"showCurrentRowInFocus($event)\" ng-blur=\"removeCurrentRowFromFocus($event)\"/>\n                            </div>\n                        </td>\n                        <td ng-repeat=\"column in tkModal.columns\" ng-class=\"{\'tk-hide-column\':tkModal.columns.length == 0}\" ng-mouseover=\"applyHoverState($event,trIndex)\" ng-mousedown=\"applyActiveState($event,trIndex)\" ng-mouseup=\"removeActiveState($event,trIndex)\" ng-mouseleave=\"removeHoverState($event,trIndex)\">\n                            <div ng-class=\"{\'tk-single-column-content\' : tkModal.columns.length == 1}\" class=\"oui-util-truncate\" ng-style=\"{ \'width\': column.width }\" uitk-compile-picklist-cell-template=\"column.cellTemplate\"></div>\n                            </td>\n                        </tr>\n                    </tbody>\n                    </table>\n                </div>\n            <!--[if lte IE 9]>\n            </div>\n            <!--<![endif]-->\n\n            <p class=\"oui-pick-tip\" ng-if=\"tkModal.availableListHintText\" id=\"{{id}}-src-input-tip\">{{tkModal.availableListHintText}}</p>\n            </div>\n\n\n        <div class=\"oui-pick-buttons tk-pick-transfer-buttons\">\n            <uitk:button type=\"button\" custom-class=\'tk-width-8t\' uitk-btn-disabled=\"disableAddButton\" value=\"{{tkModal.addButtonText?tkModal.addButtonText:\'Add >\'}}\" ng-click=\"addValue($event)\" aria-label=\"Add\" aria-describedby=\"{{id}}-addBtn\" ></uitk:button>\n            <p class=\"oui-a11y-hidden\" id=\"{{id}}-addBtn\">Add highlighted to selected</p>\n            <uitk:button type=\"button\" custom-class=\'tk-width-8t\' uitk-btn-disabled=\"disableAddAllButton\" ng-if=\"tkModal.renderAddAllButton\" value=\"{{tkModal.addAllButtonText?tkModal.addAllButtonText:\'Add All >>\'}}\" ng-click=\"addAll($event)\" aria-label=\"Add All\" aria-describedby=\"{{id}}-addAllBtn\" ></uitk:button>\n            <p class=\"oui-a11y-hidden\" id=\"{{id}}-addAllBtn\" ng-if=\"tkModal.renderAddAllButton\">Add all to selected</p>\n            <uitk:button type=\"button\" custom-class=\'tk-width-8t\' uitk-btn-disabled=\"disableRemoveButton\"  value=\"{{tkModal.removeButtonText?tkModal.removeButtonText:\'< Remove\'}}\" ng-click=\"removeValue($event)\" aria-label=\"Remove\" aria-describedby=\"{{id}}-removeBtn\" ></uitk:button>\n            <p class=\"oui-a11y-hidden\" id=\"{{id}}-removeBtn\">Remove highlighted from selected</p>\n            <uitk:button type=\"button\" custom-class=\'tk-width-8t\' uitk-btn-disabled=\"disableRemoveAllButton\" ng-if=\"tkModal.renderRemoveAllButton\" value=\"{{tkModal.removeAllButtonText?tkModal.removeAllButtonText:\'<< Remove All\'}}\" ng-click=\"removeAll($event)\" aria-label=\"Remove All\" aria-describedby=\"{{id}}-removeAllBtn\"></uitk:button>\n            <p class=\"oui-a11y-hidden\" id=\"{{id}}-removeAllBtn\" ng-if=\"tkModal.renderRemoveAllButton\">Remove all from selected</p>\n            </div>\n\n        <div class=\"oui-pick-selections\">\n            <h3 ng-if=\"tkModal.selectedListTitle\">{{tkModal.selectedListTitle}} <span ng-if=\"tkModal.showCount\">({{getItemCount(\'selectedList\')}})</span></h3>\n            <h3 ng-if=\"!tkModal.selectedListTitle\">{{\"Selected\" | uitkTranslate}} <span ng-if=\"tkModal.showCount\">({{getItemCount(\'selectedList\')}})</span></h3>\n\n            <!--[if lte IE 9]>\n            <div class=\"old_ie_wrapper\">\n                <!--<![endif]-->\n            <div class=\"oui-util-scroll-vertical\" ng-class=\"{\'tk-pick-scroll-vertical-content\':tkModal.columns.length < 2, \'oui-pick-scroll-horizontal\':tkModal.columns.length > 3  }\" tabindex=\"0\" uitk-navigable=\"true\" ng-keydown=\"setFocusInSelected($event);\">\n                <table class=\"oui-pick-options\" ng-attr-aria-describedby=\"{{tkModal.selectedListHintText ? id+\'-dest-input-tip\' : undefined}}\" role=\"presentation\">\n                    <thead ng-class=\"{\'tk-hide-column\':tkModal.columns.length == 0 }\">\n                    <tr>\n                        <th ng-if=\"tkModal.enableMultiRowSelection\">\n                            <div>\n                                <label for=\"{{id}}_selected_check_all\" class=\"oui-a11y-hidden\">Select All</label>\n                                <input type=\"checkbox\" id=\"{{id}}_selected_check_all\" ng-model=\"tkModal.selectAllSelectedRows\" ng-change=\"tkModal.onSelectAllRows($event,\'selectedList\')\" />\n                            </div>\n                        </th>\n                        <th ng-repeat=\"column in tkModal.columns\" aria-sort=\"{{(sortOrderEqualTo(column,1,\'selectedList\'))?\'ascending\':((sortOrderEqualTo(column,-1,\'selectedList\'))?\'descending\':\'none\')}}\">\n                            <div class=\"oui-util-truncate\" ng-style=\"{ \'width\': column.width }\">\n                                <span ng-if=\"!column.enableSort\">{{column.label}}</span>\n                                <a ng-if=\"column.enableSort\"  ng-click=\"tkModal.onSort($event,[\'selectedList\'], column)\" uitk-navigable=\"isColumnSortable(column)\">\n                                    <span>{{column.label}}</span>\n                                    <uitk:icon-font ng-if=\"sortOrderEqualTo(column,1,\'selectedList\')\" icon=\"cux-icon-sort_up\"></uitk:icon-font>\n                                    <uitk:icon-font ng-if=\"sortOrderEqualTo(column,-1,\'selectedList\')\" icon=\"cux-icon-sort_down\"></uitk:icon-font>\n                                    <uitk:icon-font ng-if=\"column.enableSort && sortOrderEqualTo(column,0,\'selectedList\')\" icon=\"cux-icon-sort\"></uitk:icon-font>\n                                    <span class=\"oui-a11y-hidden\">, {{(sortOrderEqualTo(column,1,\'selectedList\'))?\'sorted ascending\':((sortOrderEqualTo(column,-1,\'selectedList\'))?\'sorted descending\':\'Sortable\')}}</span>\n                                </a>\n                                <div ng-if=\"column.enableSearch\">\n                                    <label for=\"selected-list-{{column.id}}\" class=\"oui-a11y-hidden\">{{\"Filter by \" + column.label}}</label>\n                                    <input id=\"selected-list-{{column.id}}\" type=\"text\" ng-model=\"column.searchInputSelected\" ng-change=\"tkModal.onSearch($event,[\'selectedList\'],$index)\" ng-model-options=\"{ debounce: 500 }\"/>\n                                </div>\n                            </div>\n\n            </th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr id=\"picklist-selected-{{$index}}\" droppable=\"true\" ng-repeat=\"record in tkModal.selectedList | filter:{ hide: \'!\' }\" ng-class=\"{\'oui-pick-selected\':record.selected}\" ng-init=\"trIndex=$index\" ng-click=\"selectDataInSelectedList($index,$event)\">\n                <td ng-if=\"tkModal.enableMultiRowSelection\">\n                    <div>\n                        <label for=\"{{id}}_selected_check_{{$index}}\" class=\"oui-a11y-hidden\" ng-if=\"!!tkModal.allyColumnForCheckbox\">Select for {{record[tkModal.allyColumnForCheckbox]}}</label>\n                        <input type=\"checkbox\" id=\"{{id}}_selected_check_{{$index}}\" ng-checked=\"record.selected\" ng-focus=\"showCurrentRowInFocus($event)\" ng-blur=\"removeCurrentRowFromFocus($event)\" />\n                    </div>\n                </td>\n                <td ng-repeat=\"column in tkModal.columns\" ng-class=\"{\'tk-hide-column\':tkModal.columns.length == 0}\" ng-mouseover=\"applyHoverState($event,trIndex)\" ng-mousedown=\"applyActiveState($event,trIndex)\"  ng-mouseup=\"removeActiveState($event,trIndex)\" ng-mouseleave=\"removeHoverState($event,trIndex)\">\n                    <div ng-class=\"{\'tk-single-column-content\' : tkModal.columns.length == 1}\" class=\"oui-util-truncate\" ng-style=\"{ \'width\': column.width }\" uitk-compile-picklist-cell-template=\"column.cellTemplate\"></div>\n                    </td>\n                </tr>\n            </tbody>\n            </table>\n            </div>\n            <!--[if lte IE 9]>\n            </div>\n            <!--<![endif]-->\n\n            <p class=\"oui-pick-tip\" ng-if=\"tkModal.selectedListHintText\" id=\"{{id}}-dest-input-tip\">{{tkModal.selectedListHintText}}</p>\n        </div>\n\n    <div class=\"oui-pick-buttons\" ng-if=\"tkModal.renderMoveUpAndDownButns\">\n        <uitk:button type=\"button\" custom-class=\'tk-width-8t\' uitk-btn-disabled=\"disableMoveUpButton\"  value=\"{{tkModal.moveUpButtonText?tkModal.moveUpButtonText:\'Move Up\'}}\" ng-click=\"moveUp()\"  />\n        <uitk:button type=\"button\" custom-class=\'tk-width-8t\' uitk-btn-disabled=\"disableMoveDownButton\" value=\"{{tkModal.moveDownButtonText?tkModal.moveDownButtonText:\'Move Down\'}}\" ng-click=\"moveDown()\" />\n        </div>\n    </div>\n\n</div>");}]);
angular.module("uitk.component.uitkPieChart").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitkPieChartTemplate.html","<div id=\"{{viewModel.id}}\">\n\n    <uitk:dialog dialog-id=\'uitkPopupId1\' dialog-role=\'alertdialog\'\n                 header-text=\'{{viewModel.heading}} Data\'\n                 show=\'showMe\'\n                 ng-if=\"showMe\"\n                 call-back-hide=\"callBackHideDialog()\"\n                 confirm-dialog=\"false\"\n                 default-width=\'35%\' trigger-element=\'#uitkPopupId1_openModalBtn\'>\n        <div role=\"document\" tabindex=\"0\">\n            <table>\n                <caption class=\"oui-a11y-hidden\">{{viewModel.heading}} Data</caption>\n                <tbody>\n                <tr>\n                    <th scope=\"col\" class=\"tk-accessible-chart-label-column\">Label</th>\n                    <th scope=\"col\">Value</th>\n                </tr>\n                <tr ng-repeat=\"item in viewModel.data[0].values\">\n                    <th scope=\"row\" class=\"tk-accessible-chart-label-column\">{{item.label}}</th>\n                    <td class=\"tk-accessible-chart-value-column\">{{item.value | number:2 }}</td>\n                </tr>\n                </tbody>\n\n            </table>\n        </div>\n    </uitk:dialog>\n    <div aria-hidden=\"{{isOpened.dialogOpened}}\">\n        <div id=\"myChartLabel\"><h2>{{viewModel.heading}}</h2></div>\n        <div id=\"myChartDesc\" ng-class=\"{\'oui-a11y-hidden\': !viewModel.showA11yDescription}\">\n            {{viewModel.a11yDescription}}\n        </div>\n        <button class=\"tk-barchart-showdata-button\" ng-click=\"contentKeyupHandler()\">Show data for this chart</button>\n        <svg aria-labelledby=\"myChartLabel\" aria-describedby=\"myChartDesc\" role=\"img\"\n             alt={{viewModel.description}}></svg>\n    </div>\n</div>\n");}]);
angular.module("uitk.component.uitkPrimaryNavigation").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitk-primary-navigation.html","<div>\n    <ul ng-if=\"rootMenu.model.displayMode > 0 || rootMenu.model.useStripOnMobile\"\n        ng-class=\"{ \'tk-pnav-submenu-open\': model.menuVisible, \'tk-pnav-to-the-left\': model.menuPosition, \'tk-pnav\': model.level === 1 }\"\n        uitk-slide-show=\"model.menuVisible\"\n        uitk-slide-show-duration=\"500\">\n        <li ng-repeat=\"item in model.links\" ng-if=\"!item.hidden\" ng-class=\"{ \'tk-pnav-selected\': item.selected, \'tk-pnav-disabled\': item.disabled }\">\n            <a\n                href=\"javascript:void(0);\"\n                ng-if=\"!item.disabled\"\n                ng-click=\"expandMenuOrRedirectToLink($event, item, true)\"\n                ng-keydown=\"hideParentMenu($event, item)\"\n                uitk-primary-nav-compile-link=\"item\"\n                apply-parent-focus>\n\n                <span ng-if=\"item.dropDown && model.level >= 1\" class=\"oui-a11y-hidden\">Has Submenu.</span>\n                <uitk:icon-font ng-if=\"item.dropDown && show === true\" icon=\"cux-icon-caret_down_centered\"></uitk:icon-font>\n                <uitk:icon-font ng-if=\"item.dropDown && !show\" icon=\"cux-icon-caret_right\"></uitk:icon-font>\n                <span class=\"oui-a11y-hidden\">\n                    <span ng-if=\"item.dropDown && model.level >= 1 && isExpanded(item)\">Expanded</span>\n                    <span ng-if=\"item.dropDown && model.level >= 1 && !isExpanded(item)\">Collapsed</span>\n                </span>\n            </a>\n            <span ng-click=\"$event.stopPropagation();\" role=\"link\" aria-disabled=\"true\" ng-if=\"item.disabled\" ng-bind-html=\"getTrustedTextTemplate(item)\"></span>\n            <uitk-primary-navigation ng-if=\"item.dropDown\" model=\"item.dropDown\" ng-init=\"item.dropDown.parentId  = model.id\" focus-item=\"item\"></uitk-primary-navigation>\n        </li>\n    </ul>\n    <div ng-if=\"model.level === 1 && (rootMenu.model.displayMode > 0 || rootMenu.model.useStripOnMobile)\" id=\"pnavhorizontalslider\" class=\"tk-pnav-hover-div\"></div>\n    <ul ng-if=\"rootMenu.model.displayMode === 0 && !rootMenu.model.useStripOnMobile\"\n        ng-class=\"{ \'menuVisible\': model.menuVisible, \'tk-vnav\': model.level === 1 }\"\n        role=\"{{model.level === 1 ? \'navigation\' : \'group\'}}\"\n        uitk-slide-show=\"model.menuVisible\"\n        uitk-slide-show-duration=\"500\">\n        <li ng-repeat=\"item in model.links\" ng-class=\"{\'disabled\': item.disabled}\" ng-if=\"!item.hidden\">\n            <a\n                ng-class=\"{\'select-active\': item.selected}\"\n                uitk-navigable=\"!item.disabled\"\n                ng-if=\"!item.disabled\"\n                ng-click=\"expandMenuOrRedirectToLink($event, item, false)\"\n                ng-attr-aria-expanded=\"{{isExpanded(item)}}\"\n                aria-haspopup=\"{{item.dropDown ? true : false}}\"\n                uitk-primary-nav-compile-link=\"item\">\n\n                <uitk:icon-font ng-if=\"item.dropDown && item.dropDown.menuVisible\" icon=\"cux-icon-caret_down_centered\"></uitk:icon-font>\n                <uitk:icon-font ng-if=\"item.dropDown && !item.dropDown.menuVisible\" icon=\"cux-icon-caret_right\"></uitk:icon-font>\n            </a>\n            <span ng-click=\"$event.stopPropagation();\" aria-disabled=\"true\" ng-if=\"item.disabled\" uitk-primary-nav-compile-link=\"item\"></span>\n            <uitk-vertical-navigation ng-if=\"item.dropDown\" ng-init=\"item.dropDown.parentId  = model.id\" model=\"item.dropDown\"></uitk-vertical-navigation>\n        </li>\n    </ul>\n</div>");}]);
angular.module("uitk.component.uitkSecondaryNavigation").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitk-secondary-navigation.html","<ul ng-class=\"{ \'menuVisible\': model.menuVisible, \'tk-snav\': model.level === 1 }\"\n    ng-attr-id=\"{{model.level === 1 ? model.id : undefined}}\"\n    uitk-slide-show=\"model.menuVisible\"\n    uitk-slide-show-duration=\"{{model.links.length * 100}}\">\n\n    <li ng-repeat=\"item in model.links\" ng-if=\"!item.hidden\" ng-class=\"{ \'tk-snav-selected\': item.selected, \'disabled\': item.disabled }\">\n\n        <a href=\"javascript:void(0)\" ng-if=\"!item.disabled\" ng-click=\"expandMenuOrRedirectToLink($event,item,true)\"\n           ng-keydown=\"hideParentMenu($event, item)\" uitk-secondary-nav-compile-link=\"item\" apply-parent-focus>\n            <span ng-if=\"item.dropDown && model.level >= 1\" class=\"oui-a11y-hidden\">Has Submenu.</span>\n            <uitk:icon-font ng-if=\"item.dropDown && show === true\" icon=\"cux-icon-caret_down_centered\"></uitk:icon-font>\n            <uitk:icon-font ng-if=\"item.dropDown && !show\" icon=\"cux-icon-caret_right\"></uitk:icon-font>\n            <span class=\"oui-a11y-hidden\">\n                <span ng-if=\"item.dropDown && model.level >= 1 && isExpanded(item)\">Expanded</span>\n                <span ng-if=\"item.dropDown && model.level >= 1 && !isExpanded(item)\">Collapsed</span>\n            </span>\n        </a>\n        <span ng-click=\"$event.stopPropagation();\" role=\"link\" aria-disabled=\"true\" ng-if=\"item.disabled\" ng-bind-html=\"getTrustedTextTemplate(item)\"></span>\n        <uitk-secondary-navigation ng-if=\"item.dropDown\" model=\"item.dropDown\" ng-init=\"item.dropDown.parentId  = model.id\" focus-item=\"item\"></uitk-secondary-navigation>\n    </li>\n</ul>");}]);
angular.module("uitk.component.uitkShowHideContent").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitkShowHideContentTemplate.html","<div  ng-class=\"{ \'tk-show-hide-dropdown\': true, \'tk-active\': expandController }\" id=\"{{viewModel.id}}\" uitk-handle-external-click-event=\"hideContentInfo()\">\n    <a href=\"javascript:void(0);\" role=\"button\" aria-pressed=\"{{!isExpanded}}\" class=\"tk-show-hide-display\" ng-click=\"toggleShowHideContent($event);\">\n        <uitk:icon-font ng-if=\"expandController === true\" icon=\"cux-icon-caret_down_centered\"></uitk:icon-font>\n        <uitk:icon-font ng-hide=\"expandController === true\" icon=\"cux-icon-caret_right\"></uitk:icon-font>\n        <span id=\"{{viewModel.id}}_lbl\">{{viewModel.displayName}}</span>\n        <span class=\"oui-a11y-hidden\">\n            <span>Displays items you can show/hide on the page. Check to show, uncheck to hide.</span>\n            <span ng-if=\"!isExpanded\">Expanded</span>\n            <span ng-if=\"isExpanded\">Collapsed</span>\n        </span>\n    </a>\n    <div ng-class=\"{ \'tk-show-hide-dropdown-menu\': true,\'tk-horizontal-layout\': !!viewModel.displayHorizontal }\" uitk-slide-show=\"expandController\">\n        <div class=\"tk-show-hide-all\">\n            <a href=\"javascript:void(0);\" ng-show=\"enableShowAll()\" ng-keydown=\"collapseContentPanel($event,-1,true)\" role=\"button\" ng-click=\"select(\'ALL\', $event );\" class=\"tk-content-btnAll\">{{\"Show All\" | uitkTranslate}}</a>\n            <span ng-show=\"!enableShowAll()\" aria-disabled=\"true\">{{\"Show All\" | uitkTranslate}}</span>\n            <span class=\"tk-divider\" tabindex=\"-1\" aria-hidden=\"true\">|</span>\n            <a href=\"javascript:void(0);\" ng-show=\"enableHideAll()\" ng-keydown=\"collapseContentPanel($event)\" role=\"button\" ng-click=\"select(\'NONE\', $event );\" class=\"tk-content-btnNone\">{{\"Hide All\" | uitkTranslate}}</a>\n            <span ng-show=\"!enableHideAll()\" aria-disabled=\"true\">{{\"Hide All\" | uitkTranslate}}</span>\n        </div>\n        <div role=\"group\" aria-labelledby=\'{{viewModel.id}}_lbl\'>\n            <ul>\n                <li ng-repeat=\"item in viewModel.items\"><input id=\"elementSelector_checkbox_{{$index}}\" class=\"focusable\" type=\"checkbox\" ng-model=\"item.selected\" ng-click=\"select(\'ONE\', $event, item)\" ng-keydown=\"collapseContentPanel($event, $index)\" /><label tabindex=\"-1\" for=\"elementSelector_checkbox_{{$index}}\"><uitk:icon-font icon=\"{{item.iconClass}}\"></uitk:icon-font> {{item.label}}</label></li>\n            </ul>\n        </div>\n    </div>\n</div>");}]);
angular.module("uitk.component.uitkSplitButton").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitkSplitButtonTemplate.html","<span id=\"{{splitBtnCtrl.id}}-uitk-sbtn\" role=\"application\" aria-roledescription=\"Split Button\" ng-attr-aria-labelledby=\"{{splitBtnCtrl.a11y.labelledBy}}\"  ng-attr-aria-describedby=\"{{splitBtnCtrl.a11y.describedBy}}\" data-ng-class=\"splitBtnCtrl.classNames\" data-ng-mouseover=\"splitBtnCtrl.onMouseOver()\" data-ng-mouseleave=\"splitBtnCtrl.onMouseLeave()\" data-uitk-handle-external-click-event=\"splitBtnCtrl.onBlur()\"><!--\n --><button data-ng-if=\"!splitBtnCtrl.iconsWithLabel\" id=\"{{splitBtnCtrl.id}}-action-btn\" class=\"oui-sbtn-button\" data-ng-click=\"splitBtnCtrl.onActionBtnClick()\" data-ng-focus=\"splitBtnCtrl.onActionBtnFocus()\" data-ng-blur=\"splitBtnCtrl.onActionBtnBlur()\"><span class=\"oui-a11y-hidden\">{{splitBtnCtrl.a11y.actionTypeLabel}}</span>{{splitBtnCtrl.activeAction.label}}</button><!--\n --><button data-ng-if=\"!!splitBtnCtrl.iconsWithLabel\" class=\"oui-sbtn-button\" data-ng-click=\"splitBtnCtrl.onActionBtnClick()\" data-ng-focus=\"splitBtnCtrl.onActionBtnFocus()\" data-ng-blur=\"splitBtnCtrl.onActionBtnBlur()\"><uitk:icon-font icon=\"{{splitBtnCtrl.activeAction.icon}}\" hidden-text=\"{{splitBtnCtrl.a11y.actionTypeLabel+\' \'+splitBtnCtrl.activeAction.label}}\"></uitk:icon-font></button><!--\n --><button type=\"button\" id=\"{{splitBtnCtrl.id}}-arrow-btn\" class=\"oui-sbtn-menu-icon\" aria-describedby=\"{{splitBtnCtrl.id}}-uitk-sbtn-descby\" data-ng-click=\"splitBtnCtrl.onArrowBtnClick()\" data-ng-focus=\"splitBtnCtrl.onArrowBtnFocus()\" data-ng-blur=\"splitBtnCtrl.onArrowBtnBlur()\"\n            aria-haspopup=\"true\" aria-expanded=\"{{splitBtnCtrl.menuExpanded}}\" aria-owns=\"{{splitBtnCtrl.id}}-uitk-sbtn-menu\"\n            aria-activedescendant=\"{{splitBtnCtrl.id}}-uitk-sbtn-menu-item-{{splitBtnCtrl.currentMenuItemIndex}}\"\n            ng-keydown=\"splitBtnCtrl.menuKeyDown($event)\" tabindex=\"0\">\n        <uitk:icon-font icon=\"cux-icon-caret_down_centered\" hidden-text=\"{{splitBtnCtrl.a11y.actionTypeLabel}} - more\"></uitk:icon-font>\n    </button>\n    <span id=\"{{splitBtnCtrl.id}}-uitk-sbtn-descby\" class=\"oui-a11y-hidden\" tabindex=\"-1\">Use Space/Enter to activate menu and then select menu item. Up or down arrow keys to navigate menu items.</span>\n    <ul id=\"{{splitBtnCtrl.id}}-uitk-sbtn-menu\" class=\"oui-sbtn-menu\" role=\"menu\" aria-hidden=\"{{ !splitBtnCtrl.menuExpanded\" }} ng-attr-aria-label=\"{{splitBtnCtrl.a11y.menuAriaLabel}}\">\n        <li id=\"{{splitBtnCtrl.id}}-uitk-sbtn-menu-item-{{$index}}\" role=\"menuitem\" data-ng-repeat=\"action in splitBtnCtrl.actions\" data-ng-class=\"{\'oui-sbtn-menu-default\':(splitBtnCtrl.defaultAction.label === action.label), \'oui-sbtn-menu-active\': (splitBtnCtrl.currentMenuItemIndex == $index)}\" data-ng-mouseover=\"splitBtnCtrl.onMenuItemMouseOver($event)\" data-ng-mouseleave=\"splitBtnCtrl.onMenuItemMouseLeave($event)\" aria-selected=\"{{splitBtnCtrl.currentMenuItemIndex == $index}} \">\n            <a data-ng-if=\"!splitBtnCtrl.iconsWithLabel\" href=\"javascript:void(0);\" data-ng-click=\"splitBtnCtrl.onMenuItemClick(action)\" data-ng-focus=\"splitBtnCtrl.onMenuItemActive($event)\" data-ng-blur=\"splitBtnCtrl.onMenuItemInactive($event)\" tabindex=\"-1\"> <span class=\"oui-a11y-hidden\">{{splitBtnCtrl.a11y.actionTypeLabel}} &nbsp;</span>{{action.label}}</a>\n            <a data-ng-if=\"!!splitBtnCtrl.iconsWithLabel\" href=\"javascript:void(0);\" data-ng-click=\"splitBtnCtrl.onMenuItemClick(action)\" data-ng-focus=\"splitBtnCtrl.onMenuItemActive($event)\" data-ng-blur=\"splitBtnCtrl.onMenuItemInactive($event)\" tabindex=\"-1\">\n                <uitk:icon-font icon=\"{{action.icon}}\" class=\"tk-padding-right-1t\"></uitk:icon-font>\n                <span class=\"oui-a11y-hidden\">{{splitBtnCtrl.a11y.actionTypeLabel}}</span>&nbsp;<span>{{action.label}}</span></a>\n        </li>\n    </ul>\n</span>");}]);
angular.module("uitk.component.uitkSus").run(["$templateCache", function($templateCache) {$templateCache.put("template/sustmpl.html","<div class=\"susContainer\">\n    <h2>{{susConfig.susHeaderText}}</h2>\n    <label class=\"requiredLbl\" data-ng-if=\"!inlineSuccessMessageModel.visible\"><span class=\"cux-icon-asterisk\"></span>Required</label>\n    <!--<p class=\"errorMessage\" ng-if=\"showErrorMessage\" tabindex=\"0\">Please select the required fields.</p>-->\n    <div ng-if=\"showMessage\">\n        <uitk:message model=\"successMessageModel\"></uitk:message>\n    </div>\n    <uitk:dialog dialog-id=\'uitkSUSConform\' dialog-role=\'dialog\'\n                 header-text=\'Cancel Form\' show=\'dialogObj.modalShown\'\n                 ng-if=\"dialogObj.modalShown\"\n                 confirm-dialog=\"false\" tk-aria-describedby=\"dialogInsTextId\"\n                 trigger-element=\'.cancelLink\'>\n        <p id=\"dialogInsTextId\" tabindex=\"-1\">Are you sure you want to cancel this form?\n            All responses will be cleared. This action cannot be undone.\n        </p>\n        <div class=\"tk-lbox-divider\"></div>\n        <table class=\"tk-tabl-form\" role=\"presentation\">\n            <tr>\n                <td>\n                    <uitk:button type=\"button\" style=\"float:left;\" value=\"Cancel Form\" enable-default=\"true\"\n                                 ng-click=\"resetForm()\"\n                                 custom-class=\'uitk-width-6t uitk-btn-close-dialog\'></uitk:button>\n                </td>\n                <td>\n                   <a href=\"javascript:void(0)\" onclick=\"document.getElementById(\'uitkSUSConform_closeLink\').click();\">Return to Form</a>\n                </td>\n            </tr>\n        </table>\n\n    </uitk:dialog>\n    <div ng-if=\"busyIndicatorModel.flag\" aria-hidden=\"true\">\n            <div class=\"uitk-busyindicator-overlay\"></div>\n            <div id=\"busyIndicatorBox\" role=\"alert\" aria-live=\"assertive\" class=\"uitk-busyindicator-dialog\",\n              aria-labelledby=\"busyIndicatorHeading\" aria-describedby=\"busyIndicatorMoreInfo\">\n              <div class=\"uitk-busyindicator-content-wrapper\">\n                <div class=\"uitk-busyindicator-spinner\" id=\"busyIndicatorImage\" tabindex=\"-1\"\n                        aria-labelledby=\"busyIndicatorHeading-{{$parent.id}}\" aria-describedby=\"busyIndicatorMoreInfo\">\n                    <img ng-src=\"{{busyIndicatorModel.imageUrl}}\" />\n                    </div>\n                <h2 id=\"busyIndicatorHeading\" class=\"uitk-busyindicator-message\">Information Loading</h2>\n\n              </div>\n        </div>\n    </div>\n\n    <form class=\"oui-rfrm susFormSection\" name=\"SUSForm\"  novalidate>\n        <section ng-if=\"enableQtns && !inlineSuccessMessageModel.visible\">\n            <div class=\"tk-grid\" ng-repeat=\'qtn in qtnList\' ng-if=\"qtn.QuestionType == \'NPS\' || qtn.QuestionType == \'TEXT\'\">\n                <div class=\"tk-col-12-12 pad-btm-5\">\n                    <label class=\"tk-labl\" id=\"{{qtn.QuestionId}}\" tabindex=\"-1\">{{($index+1)+\') \'}}{{qtn.Question}} </label><span class=\"cux-icon-asterisk\"  ng-if=\"qtn.QuestionType != \'TEXT\'\"></span>\n                </div>\n                <div ng-if=\"qtn.QuestionType == \'NPS\'\" class=\"npsSection\">\n\n                        <ul class=\'tk-form-radio npsRadioList\' role=\'group\' aria-invalid=\"{{(SUSForm[qtn.QuestionId+\'group\'].$invalid && showErrorMessage) || (SUSForm[qtn.QuestionId+\'group\'].$touched && SUSForm[qtn.QuestionId+\'group\'].$invalid)}}\" aria-required=\"true\" aria-labelledby=\'{{$parent.qtn.QuestionId}}\' data-ng-class=\"{\'errorBorder\':(SUSForm[qtn.QuestionId+\'group\'].$invalid && showErrorMessage) || (SUSForm[qtn.QuestionId+\'group\'].$touched && SUSForm[qtn.QuestionId+\'group\'].$invalid)}\">\n                            <li class=\'template-list-item\' data-ng-class=\"{\'lastItem\':$last}\" data-ng-repeat=\"item in QtnAnswerListRated10\">\n                                <input type=\'radio\' id=\'{{$parent.qtn.QuestionId+\"group\"+ $index }}\' name=\'{{qtn.QuestionId+\"group\"}}\' ng-model=\'qtn.selectedAnsw\'\n                                       ng-disabled=\'item.disabled\'  ng-value=\'{{item.label}}\' required data-ng-blur=\"SUSForm[qtn.QuestionId+\'group\'].$setTouched()\"/>\n                                <label for=\'{{$parent.qtn.QuestionId+\"group\"+ $index}}\' tabindex=\'-1\'>\n                                    {{item.label}}\n                                    <span data-ng-if=\"$first\" class=\"oui-a11y-hidden\"> Not likely at all</span>\n                                    <span data-ng-if=\"$last\" class=\"oui-a11y-hidden\"> Extremely likely</span>\n                                </label>\n                                <div data-ng-if=\"$first\" class=\"helpTxt\" id=\"notLikelyDesc\">Not likely at all</div>\n                                <div data-ng-if=\"$last\"  class=\"helpTxt\" id=\"likelyDesc\" data-ng-class=\"{\'lastItemText\':$last}\">Extremely likely</div>\n                            <li ng-show=\"(SUSForm[qtn.QuestionId+\'group\'].$invalid && showErrorMessage) || (SUSForm[qtn.QuestionId+\'group\'].$touched && SUSForm[qtn.QuestionId+\'group\'].$invalid)\" class=\"errorMessageinline tk-col-8-8\" role=\"alert\">Required</li>\n\n                        </ul>\n                </div>\n                <div class=\"oui-rfrm-field-validation-container\" ng-if=\"qtn.QuestionType == \'TEXT\'\">\n                    <div>\n                        <textarea class=\"susTextarea\" ng-model=\"qtn.selectedAnsw\" aria-labelledby=\'{{$parent.qtn.QuestionId}}\'></textarea>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"tk-grid staticQtn\"  ng-if=\"qtn.QuestionType != \'TEXT\' && qtn.QuestionType != \'NPS\'\">\n                <label id=\"susStatement\">3) {{susConfig.susQuestionText}}</label><span class=\"cux-icon-asterisk\"  ng-if=\"qtn.QuestionType != \'TEXT\' && qtn.QuestionType != \'NPS\'\"></span>\n            </div>\n            <div class=\"tk-grid nonNpsSection\"  ng-if=\"qtn.QuestionType != \'TEXT\' && qtn.QuestionType != \'NPS\' \">\n                <div class=\"tk-col-5-12\"></div>\n                <div class=\"tk-col-7-12 tk-padding-top-none pad-left-15\">\n                    <div class=\"template-list-item pad-btm-5\" id=\"disagreeDesc\">Strongly <br/>Disagree</div>\n                    <div class=\"template-list-item \">&nbsp;</div>\n                    <div class=\"template-list-item \">&nbsp;</div>\n                    <div class=\"template-list-item \">&nbsp;</div>\n                    <div class=\"pad-btm-5 template-list-item\" id=\"agreeDesc\">Strongly <br/>Agree</div>\n                </div>\n            </div>\n            <div class=\"tk-grid borderBottom\"  ng-if=\"qtn.QuestionType != \'TEXT\' && qtn.QuestionType != \'NPS\' \">\n                <div class=\"tk-col-5-12\"></div>\n                <div class=\"tk-col-7-12 pad-left-15\">\n                    <div class=\"template-list-item\">1</div>\n                    <div class=\"template-list-item\">2</div>\n                    <div class=\"template-list-item\">3</div>\n                    <div class=\"template-list-item\">4</div>\n                    <div class=\"template-list-item\">5</div>\n                </div>\n            </div>\n\n            <div class=\"tk-grid tk-survey-questions\" ng-repeat=\'qtn in qtnList\' ng-if=\"qtn.QuestionType != \'TEXT\' && qtn.QuestionType != \'NPS\'\" ng-class-odd=\"\'odd\'\" ng-class-even=\"\'even\'\">\n                <div class=\"tk-col-5-12 tk-m-col-5-12\">\n                    <label class=\"tk-labl\" id=\"{{qtn.QuestionId}}\" tabindex=\"-1\">{{qtn.Question}}<span class=\"cux-icon-asterisk\"></span> </label>\n                </div>\n                <ul ng-if=\"qtn.QuestionType == \'Rated1-5\'\" role=\'group\' aria-invalid=\"{{(SUSForm[qtn.QuestionId+\'group\'].$invalid && showErrorMessage) || (SUSForm[qtn.QuestionId+\'group\'].$touched && SUSForm[qtn.QuestionId+\'group\'].$invalid)}}\" aria-required=\"true\" aria-describedby=\'{{$parent.qtn.QuestionId}}\' aria-labelledby=\'susStatement\' class=\"tk-form-radio tk-col-7-12 tk-padding-bottom-none tk-padding-top-none generalSection\" data-ng-class=\"{\'errorBorder\':(SUSForm[qtn.QuestionId+\'group\'].$invalid && showErrorMessage)|| (SUSForm[qtn.QuestionId+\'group\'].$touched && SUSForm[qtn.QuestionId+\'group\'].$invalid)}\">\n                    <li class=\'template-list-item\' data-ng-repeat=\"item in QtnAnswerList\" >\n                        <input type=\'radio\' id=\'{{$parent.qtn.QuestionId+\"group\"+ $index }}\' ng-change=\'onRadioChange();\'  name=\'{{qtn.QuestionId+\"group\"}}\' ng-model=\'qtn.selectedAnsw\'\n                               ng-disabled=\'item.disabled\'  ng-value=\'{{item.label}}\' required data-ng-blur=\"SUSForm[qtn.QuestionId+\'group\'].$setTouched()\"/>\n                        <label for=\'{{$parent.qtn.QuestionId+\"group\"+ $index}}\' tabindex=\'-1\' class=\"oui-a11y-hidden\">{{item.label }}\n                            <span data-ng-if=\"$first\" class=\"oui-a11y-hidden\">Strongly Disagree</span>\n                            <span data-ng-if=\"$last\" class=\"oui-a11y-hidden\">Strongly Agree</span>\n                        </label>\n                    </li>\n                    <li ng-show=\"(SUSForm[qtn.QuestionId+\'group\'].$invalid && showErrorMessage) || (SUSForm[qtn.QuestionId+\'group\'].$touched && SUSForm[qtn.QuestionId+\'group\'].$invalid)\" class=\"errorMessageinline template-list-item\" role=\"alert\">Required</li>\n                </ul>\n\n\n\n            </div>\n\n        <div class=\"btnSection\">\n            <uitk:button\n                    value=\"Submit\"\n                    enable-default=\"true\"\n                    aria-describedby=\"DefaultIconButton-desc\"\n                    ng-click=\"saveSurvey(SUSForm,$event)\"\n                    type=\"button\">\n            </uitk:button>\n            <span tabindex=\"-1\" class=\"oui-a11y-hidden\" id=\"DefaultIconButton-desc\">submit the form onlcik of this submit button.</span>\n\n            <!--<uitk:button-->\n                    <!--value=\"Reset\"-->\n                    <!--enable-default=\"true\"-->\n                    <!--aria-describedby=\"restButton-desc\"-->\n                    <!--ng-click=\"confirmReset(SUSForm)\"-->\n                    <!--type=\"button\">-->\n            <!--</uitk:button>-->\n            <span tabindex=\"-1\" class=\"oui-a11y-hidden\" id=\"restButton-desc\">Click on the reset button to reset form.</span>\n            <a href=\"javascript:void(0)\" ng-click=\"confirmReset(SUSForm)\" class=\"cancelLink\">Cancel</a>\n        </div>\n        </section>\n    </form>\n    <div ng-if=\"!enableQtns && pageLevelError\" class=\"exceptionSection\">\n        <uitk:message model=\"inlineErrorMessageModel\"></uitk:message>\n    </div>\n    <div ng-if=\"inlineSuccessMessageModel.visible\">\n        <uitk:message model=\"inlineSuccessMessageModel\"></uitk:message>\n        <p>Close this tab to exit the survey.</p>\n    </div>\n</div>");}]);
angular.module("uitk.component.uitkSusTakeSurveyDialog").run(["$templateCache", function($templateCache) {$templateCache.put("template/susTakeSurveyDialogTemplate.html","<div ng-if=\"showMessage\" class=\"susMessageContainer\">\n\n    <uitk:message model=\"customInformationMessageModel\">\n        <p>We need you feedback to improve our product.</p>\n        <uitk:button\n                value=\"Take Survey\"\n                enable-default=\"true\"\n                aria-describedby=\"takeSurvey-desc\"\n                ng-click=\"takeSurvey()\"\n                type=\"button\">\n        </uitk:button>\n        <span tabindex=\"-1\" class=\"oui-a11y-hidden\" id=\"takeSurvey-desc\">Click to take the survey.</span>\n        <ul class=\"SUSMessage\">\n            <li>\n                <a ng-click=\"showLater()\">{{\"Show Later\" | translate }} </a>\n            </li>\n            <li><a ng-click=\"dontShowMessage()\"> {{\"Don\'t Show Again\" | translate}} </a></li>\n        </ul>\n\n\n\n\n    </uitk:message>\n</div>");}]);
angular.module("uitk.component.uitkTextField").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitk-text-field.html","<div>\n    <input\n        id=\"{{id}}_input\"\n        ng-attr-aria-describedby=\"{{tkSupressDescribedby === \'true\' ? undefined : getAriaDescribedBy()}}\"\n        type=\"{{typeOfInput}}\"\n        ng-attr-name=\"{{name}}\"\n        class=\"tk-input-masking {{styleClass}}\"\n        ng-class=\"{\'oui-form-field-error\': tkErrorClass}\"\n        ng-blur=\"blurEvent($event, model);\"\n        ng-focus=\"focusEvent($event);\"\n        ng-keyup=\"keyupEvent($event);\"\n        ng-keypress=\"keypressEvent($event);\"\n        ng-paste=\"pasteEvent($event);\"\n        ng-keydown=\"keydownEvent($event);\"\n        ng-change=\"onchangeEvent();\"\n        ng-model=\"model\"\n        autocomplete=\"off\"\n        aria-autocomplete=\"none\"\n        aria-required=\"{{tkRequired ? true : false}}\"\n        ng-attr-aria-invalid=\"{{tkErrorClass}}\"\n        ng-attr-aria-labelledby=\"{{tkAriaLabelledby === \'\' ? undefined : tkAriaLabelledby}}\"\n        ng-attr-placeholder=\"{{tkPlaceholder === \'\' ? undefined : tkPlaceholder}}\"\n        ng-minlength={{tkMinlength}}\n        ng-maxlength={{tkMaxlength}}\n        uitk-maxlength={{maxCharCount}}\n        ng-pattern=\"tkPattern\"\n        ng-disabled=\"tkDisabled\"\n        ng-readonly=\"tkReadonly\"\n        ng-required=\"(tkRequired && checkRequireValidation && checkFieldValidation) ? true : false\" />\n\n    <span ng-if=\"(tkShowHideIcon || tkShowHideText) && tkType === \'password\'\" class=\"tk-show-hide-password\">\n        <span id=\"{{id}}_inputmask\" class=\"oui-a11y-hidden\">{{tkPasswordMasking}}</span>\n        <button id=\"{{id}}_button\" role=\"button\" tabindex=\"0\" type=\"button\" ng-click=\"showHideInput(true)\">\n            <span ng-if=\"tkShowHideText\">{{tkActiveText}} <span class=\"oui-a11y-hidden\" tabindex=\"-1\">{{tkFieldName}}</span></span>\n            <span ng-if=\"!tkShowHideText\">\n                <uitk:icon-font class=\"tkShowHideIcon\" ng-if=\"tkShowHide\" icon=\"cux-icon-view\"></uitk:icon-font>\n                <uitk:icon-font class=\"tkShowHideIcon\" ng-if=\"!tkShowHide\" icon=\"cux-icon-view_no\"></uitk:icon-font>\n                <span class=\"oui-a11y-hidden\" tabindex=\"-1\" translate=\"{{tkActiveText}} {{tkFieldName}}\">{{tkActiveText}} {{tkFieldName}}</span>\n            </span>\n        </button>\n    </span>\n    <div ng-if=\"!tkLayout\">\n        <span\n            id=\"{{id}}_format_err\"\n            ng-class=\"{\'uitk-msg-error-inline-horizontal\': tkLayout === \'horizontal\'}\"\n            ng-if=\"showInternalMessageTwo\"\n            tabindex=\"-1\"\n            translate>{{invalidFormatErrorMessage}}</span>\n    </div>\n    <div ng-if=\"showInternalMessageOne\" ng-class=\"{\'oui-rfrm-validation\': tkLayout === \'horizontal\', \'oui-rfrm-validation-vertical\': tkLayout === \'vertical\'}\">\n        <span\n            id=\"{{id}}_format_err\"\n            ng-class=\"{\'uitk-msg-error-inline-horizontal\': tkLayout === \'horizontal\'}\"\n            tabindex=\"-1\"\n            translate>{{invalidFormatErrorMessage}}</span>\n    </div>\n    <div ng-if=\"!tkLayout\">\n        <span\n            ng-if=\"formatErrorFlag && format === \'email\' && emailErrorMessage !== undefined\"\n            id=\"{{id}}_format_err\"\n            ng-class=\"{\'uitk-msg-error-inline-horizontal\': tkLayout === \'horizontal\'}\"\n            tabindex=\"-1\"\n            translate>{{emailErrorMessage}}</span>\n    </div>\n    <div\n        ng-if=\"tkLayout && formatErrorFlag && format === \'email\' && emailErrorMessage !== undefined\"\n        ng-class=\"{\'oui-rfrm-validation\': tkLayout === \'horizontal\', \'oui-rfrm-validation-vertical\': tkLayout === \'vertical\'}\">\n        <span\n            id=\"{{id}}_format_err\"\n            ng-class=\"{\'uitk-msg-error-inline-horizontal\': tkLayout === \'horizontal\'}\"\n            tabindex=\"-1\"\n            translate>{{emailErrorMessage}}</span>\n    </div>\n    <div\n        class=\"tk-input-masking-assistivetext oui-rfrm-tip\"\n        id=\"{{id}}_maxCharacterAllowedMessage\"\n        ng-if=\"maxCharacterAllowedMessage\"\n        tabindex=\"-1\"\n        translate>{{maxCharacterAllowedMessage}}</div>\n    <div ng-if=\"!tkLayout\">\n        <span\n                ng-if=\"tkInvalidNumber\"\n                id=\"{{id}}_format_err\"\n                ng-class=\"{\'uitk-msg-error-inline-horizontal\': tkLayout === \'horizontal\'}\"\n                tabindex=\"-1\"\n                translate>{{valueOutOfRangeMessage}}</span>\n    </div>\n    <div\n            ng-if=\"tkLayout && tkInvalidNumber\"\n            ng-class=\"{\'oui-rfrm-validation\': tkLayout === \'horizontal\', \'oui-rfrm-validation-vertical\': tkLayout === \'vertical\'}\">\n        <span\n                id=\"{{id}}_format_err\"\n                ng-class=\"{\'uitk-msg-error-inline-horizontal\': tkLayout === \'horizontal\'}\"\n                tabindex=\"-1\"\n                translate>{{valueOutOfRangeMessage}}</span>\n    </div>\n\n</div>\n");}]);
/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.6.0
 */

(function () {
    var uitkTreeNodeContentsDirective = function ($compile) {
        return function ($scope, $element) {
            var template;
            if ( angular.isDefined($scope.tree.nodeTemplate) ) {
                template = $scope.tree.nodeTemplate;
            }
            else {
                template = '<span id="{{treeController.getComponentId()}}}{{tree.label}}{{uid}}cblabel" ' +
                    'ng-class="{\'tk-tree-node-sel\': tree.selected}">{{tree.label}}</span>';
            }
            $compile(template)($scope, function (clone) {
                $element.append(clone);
            });
        };
    };
    uitkTreeNodeContentsDirective.$inject = ["$compile"];

    angular.module('uitk.component.uitkTree')
        .directive('uitkTreeNodeContents', uitkTreeNodeContentsDirective);
})();

/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.6.0
 */

(function () {
    /**
     * Directive creates and manages individual nodes within the tree component.
     *
     * @param $compile
     * @param NODE_STATE
     * @returns {{restrict: string, replace: boolean, scope: {uid: string, tree: string}, compile: compile, controller: *[], templateUrl: string}}
     */
    var uitkTreeNodeDirective = function ($compile) {

        return {
            require: "^^uitkTree",
            restrict: "E",
            replace: true,
            scope: {
                uid: "=",//unique identifier for each instance
                tree: "="
            },

            compile: function (tElement) {
                var contents = tElement.contents().remove();
                var compiledContents;

                /**
                 * get contents of the node
                 *
                 * @param {type} scope
                 * @param {type} iElement
                 * @returns {type}
                 */
                return function (scope, iElement, attrs, treeController) {
                    if (!compiledContents) {
                        compiledContents = $compile(contents);
                    }
                    compiledContents(scope, function (clone) {
                        iElement.append(clone);
                    });

                    //Save a reference to the main controller for the tree component
                    scope.treeController = treeController;
                };
            },
            templateUrl: "template/uitkTreeNodeDirectiveTemplate.html"
        }
    };

    /**
     * Directive to support tri-state checkboxes in the tree view.
     * @returns {{restrict: string, replace: boolean, link: link}}
     */
    var indeterminate = function() {
        return {
            restrict: "A",
            replace: true,
            link: function (scope, iElement) {
                scope.$watch('tree.isIndeterminate', function (newValue) {
                    iElement.prop('indeterminate', newValue);
                });
            }
        }
    };

    uitkTreeNodeDirective.$inject = ['$compile'];

    angular.module('uitk.component.uitkTree')
        .directive('uitkIndeterminate', indeterminate)
        .directive('uitkTreeNode', uitkTreeNodeDirective);
})();

angular.module("uitk.component.uitkTree").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitkTreeDirectiveTemplate.html","<div role=\"application\" class=\"tk-tree\">\n    <p id=\"treeInputInstructions_{{componentId}}\" class=\"oui-a11y-hidden\">\n        {{viewModel.treeDescription}}\n        {{\". Use tab / shift tab to move within the tree and use the enter to make selection.\" | uitkTranslate}}\n    </p>\n\n    <ul role=\"tree\" aria-describedby=\"treeInputInstructions_{{componentId}}\">\n        <uitk-tree-node tree=\"viewModel\" selected-node=\"viewModel.uselectedNode\"\n                        select-event=\"{{viewModel.uselectEvent}}\"\n                        uid=\"componentId\"></uitk-tree-node>\n    </ul>\n</div>\n");
$templateCache.put("template/uitkTreeNodeDirectiveTemplate.html","<li role=\"presentation\">\n    <span ng-click=\"treeController.onNodeToggleExpansion(tree)\" ng-class=\"{\'tk-arrow-disable\': treeController.treeNodeStateLeaf(tree)}\">\n\n        <span class=\"oui-a11y-hidden\" ng-class=\"{\'tk-arrow-disable\': treeController.treeNodeStateLeaf(tree)}\">\n            {{tree.label}} {{treeController.stateDescription(tree)}}\n        </span>\n\n        <uitk:icon-font icon=\"{{treeController.getIconClass(tree)}}\" class=\"tk-tree-expander-icon\"></uitk:icon-font>\n    </span>\n\n    <span>\n        <input\n            id=\"{{treeController.getComponentId()}}{{tree.label}}{{uid}}cb\"\n            ng-if=\"treeController.displayCheckBoxes()\"\n            uitk-click=\"treeController.onNodeToggleChecked(tree)\"\n            ng-model=\"tree.isNodeChecked\"\n            aria-labelledby=\"{{treeController.getComponentId()}}}{{tree.label}}{{uid}}cblabel\"\n            type=\"checkbox\"\n            uitk-indeterminate />\n\n        <span\n            tabindex=\"0\"\n            uitk-tree-node-contents\n            role=\"treeitem\"\n            aria-expanded=\"{{treeController.treeNodeStateExpanded(tree)}}\"\n            class=\"tk-tree-node-label tk-tree-text\"\n            aria-selected=\"{{tree.selected ? \'true\' : \'false\'}}\"\n            aria-describedby=\"{{treeController.getComponentId()}}{{tree.label}}{{uid}}cntdsc\"\n            ng-click=\"treeController.onNodeSelect(tree)\"\n            ng-keypress=\"treeController.onNodeKeyPress($event, tree)\">\n\n            <uitk:icon-font ng-if=\"treeController.displayIcons()\" icon=\"{{treeController.getFolderClass(tree)}}\"></uitk:icon-font>\n        </span>\n\n        <span\n            id=\"{{treeController.getComponentId()}}{{tree.label}}{{uid}}cntdsc\"\n            aria-hidden=\"true\"\n            class=\"oui-a11y-hidden\"\n            tabindex=\"-1\">\n\n            {{tree.description}}\n        </span>\n    </span>\n\n    <ul\n        ng-if=\"!treeController.treeNodeStateLeaf(tree)\"\n        uitk-slide-show=\"treeController.treeNodeStateExpanded(tree)\"\n        uitk-slide-show-duration=\"500\"\n        role=\"group\">\n\n        <uitk-tree-node ng-repeat=\"node in tree.children\" tree=\"node\"></uitk-tree-node>\n    </ul>\n</li>");}]);
angular.module("uitk.component.uitkVerticalNavigation").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitk-vertical-navigation.html","<ul ng-class=\"{ \'menuVisible\': model.menuVisible, \'tk-vnav\': model.level === 1 }\" uitk-slide-show=\"model.menuVisible\" uitk-slide-show-duration=\"500\">\n    <li ng-repeat=\"item in model.links\" ng-class=\"{\'disabled\': item.disabled}\" ng-if=\"!item.hidden\">\n        <a href=\"javascript:void(0);\" ng-class=\"{\'select-active\': item.selected}\" uitk-navigable=\"!item.disabled\" ng-if=\"!item.disabled\" ng-click=\"expandMenuOrRedirectToLink($event, item)\" ng-keydown=\"hideParentMenu($event, item)\" uitk-compile-vertical-link=\"item\" apply-parent-focus>\n            <span ng-if=\"item.dropDown\" class=\"oui-a11y-hidden\">Has Submenu.</span>\n            <uitk:icon-font ng-if=\"item.dropDown && item.dropDown.menuVisible === true\" icon=\"cux-icon-caret_down_centered\" aria-hidden=\"true\"></uitk:icon-font>\n            <uitk:icon-font ng-if=\"item.dropDown && !item.dropDown.menuVisible\" icon=\"cux-icon-caret_right\" aria-hidden=\"true\"></uitk:icon-font>\n\n            <span class=\"oui-a11y-hidden\">\n                <span ng-if=\"item.dropDown && model.level >= 1 && isExpanded(item)\">Expanded</span>\n                <span ng-if=\"item.dropDown && model.level >= 1 && !isExpanded(item)\">Collapsed</span>\n            </span>\n        </a>\n        <span ng-click=\"$event.stopPropagation();\" aria-disabled=\"true\" ng-if=\"item.disabled\" uitk-compile-vertical-link=\"item\"></span>\n        <uitk-vertical-navigation ng-init=\"item.dropDown.parentId  = model.id\" ng-if=\"item.dropDown\" model=\"item.dropDown\" focus-item=\"item\"></uitk-vertical-navigation>\n    </li>\n</ul>\n");}]);
angular.module("uitk.component.uitkWizard").run(["$templateCache", function($templateCache) {$templateCache.put("template/uitkWizardTemplate.html","<p id=\"{{tkWizardCtrl.viewModel.id}}_description\" class=\"wizard-description oui-a11y-hidden\" >This is a wizard which is completed in steps. Use Next and Previous buttons or step buttons to move between steps. Buttons for some steps may be disabled until other steps are successfully completed.</p>\n<div role=\"group\" id=\"{{tkWizardCtrl.viewModel.id}}\" class=\"oui-wzrd\" ng-class=\"{\'oui-wzrd-vertical\':tkWizardCtrl.viewModel.enableVerticalLayout}\" tabindex=\"-1\" aria-roledescription=\"Wizard\" ng-attr-aria-labelledby=\"{{tkWizardCtrl.wizardDescriptionId}}\" ng-attr-aria-describedby=\"{{tkWizardCtrl.viewModel.id}}_description\" tk-focus-wizard-main-container=\"{{tkWizardCtrl.isWizardCompleted}}\">\n    <p id=\"{{tkWizardCtrl.viewModel.id}}_wizardComplete\" class=\"wizard-completed oui-a11y-hidden\" ng-if=\"tkWizardCtrl.isWizardCompleted\">All the steps of Wizard are completed</p>\n    <div class=\"oui-wzrd-header\" aria-roledescription=\"Wizard Steps\">\n        <ul role=\"toolbar\" class=\"oui-wzrd-nav\" ng-keydown=\"tkWizardCtrl.onStepsKeyPressEvent($event)\">\n            <li role=\"button\" id=\"{{tkWizardCtrl.viewModel.id}}_{{$index}}\" ng-class=\"tkWizardCtrl.getClass($index+1)\" tabindex=\"{{tkWizardCtrl.getTabIndex($index)}}\" aria-disabled=\"{{tkWizardCtrl.isStepDisabled($index)}}\" aria-controls=\"{{tkWizardCtrl.viewModel.id}}_content_container\" ng-repeat=\"step in tkWizardCtrl.viewModel.wizardSteps\">\n                <a ng-if=\"($index+1) < tkWizardCtrl.viewModel.currentStep\" ng-click=\"tkWizardCtrl.selectStep($index)\">\n                    <span class=\"oui-a11y-hidden\">Step </span>\n                    <span class=\"oui-wzrd-nav-index\" ng-if=\"tkWizardCtrl.viewModel.renderNavIndexes\">{{$index+1}}</span>\n                    <span class=\"oui-a11y-hidden\"> of {{tkWizardCtrl.viewModel.wizardSteps.length}}</span>\n                    <span>{{step.label}}</span>\n                    <span class=\"oui-a11y-hidden\"> Completed</span>\n                </a>\n                <a ng-if=\"($index+1) >= tkWizardCtrl.viewModel.currentStep\" class=\"tk-pending-nav\">\n                    <span class=\"oui-a11y-hidden\">Step </span>\n                    <span class=\"oui-wzrd-nav-index\" ng-if=\"tkWizardCtrl.viewModel.renderNavIndexes\">{{$index+1}}</span>\n                    <span class=\"oui-a11y-hidden\"> of {{tkWizardCtrl.viewModel.wizardSteps.length}}</span>\n                    <span>{{step.label}}</span>\n                    <span class=\"oui-a11y-hidden\" ng-if=\"tkWizardCtrl.isStepSelected($index)\">Current</span>\n                </a>\n                <div class=\"oui-wzrd-nav-progress\" aria-hidden=\"true\"></div>\n            </li>\n        </ul>\n    </div>\n    <div id=\"{{tkWizardCtrl.viewModel.id}}_content_container\" class=\"oui-wzrd-content\" aria-roledescription=\"Content Panel\" aria-labelledby=\"{{tkWizardCtrl.getContentDescriptionId()}}\">\n        <h3 class=\"oui-a11y-hidden\" ng-if=\"!tkWizardCtrl.isWizardCompleted\">{{tkWizardCtrl.viewModel.wizardSteps[tkWizardCtrl.viewModel.currentStep -1].label}} : Step {{tkWizardCtrl.viewModel.currentStep}} of {{tkWizardCtrl.viewModel.wizardSteps.length}}</h3>\n        <div id=\"{{tkWizardCtrl.viewModel.id}}_content\" tabindex=\"-1\" onload=\"tkWizardCtrl.onloadComplete()\" ng-include=\"templateUrl\" tk-focus-wizard-content=\"{{tkWizardCtrl.isWizardContentToBeFocussed}}\"></div>\n        <div class=\"oui-wzrd-buttons\" ng-if=\"!tkWizardCtrl.viewModel.buttonsTemplateUrl && !tkWizardCtrl.viewModel.hasCompletedAllSteps\">\n            <uitk:button\n                    id=\"{{tkWizardCtrl.viewModel.id}}_previousBtn\"\n                    ng-if=\"(tkWizardCtrl.viewModel.currentStep != 1) && tkWizardCtrl.viewModel.previousButton.render\"\n                    value=\"{{tkWizardCtrl.viewModel.previousButton.label}}\"\n                    ng-click=\"tkWizardCtrl.viewModel.previousButton.action()\"\n                    uitk-btn-disabled=\"tkWizardCtrl.viewModel.previousButton.disabled\"\n                    type=\"button\"\n                    custom-class=\"tk-btn-secondary\">\n            </uitk:button>\n\n            <uitk:button\n                    id=\"{{tkWizardCtrl.viewModel.id}}_nextBtn\"\n                    ng-if=\"(tkWizardCtrl.viewModel.currentStep != tkWizardCtrl.viewModel.wizardSteps.length) && tkWizardCtrl.viewModel.nextButton.render\"\n                    value=\"{{tkWizardCtrl.viewModel.nextButton.label}}\"\n                    ng-click=\"tkWizardCtrl.viewModel.nextButton.action()\"\n                    uitk-btn-disabled=\"tkWizardCtrl.viewModel.nextButton.disabled\"\n                    type=\"button\"\n                    custom-class=\"tk-btn-secondary\">\n            </uitk:button>\n\n            <uitk:button\n                    id=\"{{tkWizardCtrl.viewModel.id}}_finishBtn\"\n                    ng-if=\"(tkWizardCtrl.viewModel.currentStep == tkWizardCtrl.viewModel.wizardSteps.length) && tkWizardCtrl.viewModel.finishButton.render \"\n                    value=\"{{tkWizardCtrl.viewModel.finishButton.label}}\"\n                    ng-click=\"tkWizardCtrl.viewModel.finishButton.action()\"\n                    uitk-btn-disabled=\"tkWizardCtrl.viewModel.finishButton.disabled\"\n                    type=\"button\"\n                    custom-class=\"tk-btn-secondary\">\n            </uitk:button>\n            <a href=\"javascript:void(0)\" id=\"{{tkWizardCtrl.viewModel.id}}_cancelLink\" ng-click=\"tkWizardCtrl.viewModel.cancelLink.action()\" ng-if=\"tkWizardCtrl.viewModel.cancelLink.render\">{{tkWizardCtrl.viewModel.cancelLink.label}}</a>\n\n        </div>\n        <div ng-include=\"tkWizardCtrl.viewModel.buttonsTemplateUrl\" ng-if=\"tkWizardCtrl.viewModel.buttonsTemplateUrl\"></div>\n    </div>\n</div>\n");}]);