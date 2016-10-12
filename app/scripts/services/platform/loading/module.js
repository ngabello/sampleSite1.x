
    'use strict';
    angular.module('platform.loadingMsg',[])
        .factory('CallTrackerService', CallTrackerService())
        .directive('loadingMsg', LoadingIndicationDirective());

