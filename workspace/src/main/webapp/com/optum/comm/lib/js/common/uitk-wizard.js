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
        templateUrl:"../lib/js/common/template/uitkWizardTemplate.html",
        bindings:{
            viewModel:"<"
        },
        controllerAs: 'tkWizardCtrl',
        controller:["$scope","uitkEvents","uitkExceptionService", "$timeout",wizardController]
    });

    module.directive("tkFocusWizardContent", function($timeout){
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
    });

    module.directive("tkFocusWizardMainContainer", function($timeout){
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
    });
}());