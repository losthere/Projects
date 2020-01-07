/*
 *** DO NOT MODIFY THE COPYRIGHT HEADER MANUALLY ***
 * Copyright (c) Optum 2015 - All Rights Reserved.
 *** Release process will update accordingly ***
 * @version 3.12.0
 */
(function() {

    /**
     * Primary directive for the pie chart component.
     *
     */
    angular.module('uitk.component.uitkPieChart', [])
        .directive('uitkPieChart', function(dialogService) {
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
						
                        chart.labelsOutside(false);
                        chart.donut(scope.viewModel.donut);
                        chart.donutRatio(0.4);
                        chart.showLegend(scope.viewModel.showLegend);
                        chart.labelThreshold(0.0);

                        var labels;

                        chart.color(function(d) {
                            return d.color;
                        });

                        chart.tooltip.enabled(scope.viewModel.tooltips);
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
                templateUrl: '../lib/js/common/template/uitkPieChartTemplate.html'
            };
        });
})();
