'use strict';

angular.module('smartAdminApp').directive('smartAdminApp', function($parse, $timeout) {
    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function(scope, element, attrs) {
            var config = $parse(attrs.config)(scope);
            $(element[0]).highcharts(config);

            scope.$watch(attrs.watch, function(newVal) {
                if (newVal) {
                    var complete = function (options) {
                        var chart = $(element[0]).highcharts();
                        // capture all available series
                        var allSeries = chart.series;
                        for (var i = 0; i < allSeries.length; i++) {
                            allSeries[i].setData(options.series[i].data, false);
                        }

                        chart.redraw();
                    };

                    // doesn't work without the timeout 
                    $timeout(function() {
                        Highcharts.data({
                            table: config.data.table,
                            complete: complete
                        });   
                    }, 0);
                }
            });
        }
    };
});