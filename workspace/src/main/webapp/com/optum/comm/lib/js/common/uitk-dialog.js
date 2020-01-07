/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.13.0
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


dialogApp.directive('uitkDialog', function($timeout,$document,dialogService) {
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
            viewModel: '=',
            handleClose:'=', //This optional attribute set to true will allow to handle close link click and stops default behavior
            callBackBeforeClose: '&'
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
                if(scope.handleClose){
                	if(typeof scope.callBackBeforeClose === 'function'){
                		scope.callBackBeforeClose();
                	}
                	return;
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
			var startX = 0,
			startY = 0,
			x = 0;
			y = 0;
			var isInitialize = true;
			
			
			
			 element.on('mousedown', function (event) {
				// Prevent default dragging of selected content
					 
					 
				 var elementName = event.target.nodeName.toLocaleLowerCase();
				 var className = event.target.className;
				 if(elementName === 'div' && className === 'tk-lbox-header' || (elementName == 'h2' && event.target.firstChild && event.target.firstChild.getAttribute('uitk-dialog-compile-header') === 'headerText')){
				 event.preventDefault();
					if(!isInitialize){
						startX = event.screenX - x;
						startY = event.screenY - y;
					}
					isInitialize = false;
					$document.on('mousemove', mousemove);
					$document.on('mouseup', mouseup);
				}
			});

			function mousemove(event) {
				y = event.screenY - startY;
				x = event.screenX - startX;
				element[0].querySelector('.tk-lbox-dialog').style.top =  y + 'px';
				element[0].querySelector('.tk-lbox-dialog').style.left = x + 'px';
			}

			function mouseup() {
				$document.unbind('mousemove', mousemove);
				$document.unbind('mouseup', mouseup);
			}
        },
        template: "<div class='tk-lbox' ng-show='show' id='{{dialogId}}_main'> "+
        "<span class='oui-a11y-hidden tk-lbox-startElem' tabindex='0' id='{{dialogId}}_startElemId' ng-focus=\"setFocus('end')\">{{\'Beginning of dialog\'| uitkTranslate}}</span>"+
        "<div class='tk-lbox-overlay' aria-hidden='{{!show}}' tabindex='-1' style=\"display: block;\"></div>" +
        "<div id='{{dialogId}}' aria-hidden='{{!show}}' tabindex='-1' ng-attr-aria-labelledby='{{dialogId}}_headerId' aria-describedby='{{tkAriaDescribedby ? tkAriaDescribedby : undefined}}' ng-style='{width: defaultWidth}' class='tk-lbox-dialog' role='{{dialogRole}}'>"+
        "<div class='tk-lbox-content-wrapper'>"+

        "<div id='{{dialogId}}_headerId' tabindex='-1' style='cursor:move;' class='tk-lbox-header'>" +
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
});


dialogApp.directive('uitkDialogCompileHeader', function ($compile) {
    return function ($scope, $element) {
		if($scope.headerText){
			$compile($scope.headerText)($scope, function (clone) {
				if (!clone.selector) {
					$element.append(clone);
				} else {
					$element.append(clone.selector);
				}
			});
		}
    };
});