/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 *** Release process will update accordingly ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 * @version 3.14.1
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
                    if (angular.isDefined(scope.onRefreshItems) && scope.serverSearchTerm !== scope.model) {
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
                    scope.filteredList = getFilteredList(newItems, scope.model);
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
