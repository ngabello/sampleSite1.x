    function LoadingIndicationDirective() {
        'use strict';

        return ['$rootScope','CallTrackerService',function ($rootScope, CallTrackerService){
            return {
                restrict: 'A',
                scope:{
                    id: '@id',
                    callGroup: '@',
                    msg : '@',
                    errorMsg:'@'
                },
                templateUrl: '../views/platform/loadingTemplate.html',

                link: function(scope, element, attrs){
                    scope.display = false;
                    scope.error = false;
                    scope.initTime = new Date();
                    scope.position = {
                        top: attrs.top,
                        left: attrs.left,
                        right: attrs.right,
                        bottom: attrs.bottom
                    };

                    $rootScope.$watch('callTrackerCounter', function(){
                        scope.error = CallTrackerService.anyErrorAfter(scope.initTime, scope.callGroup);
                        scope.display = !scope.error && CallTrackerService.anyInFlightCall(scope.callGroup);
//                        scope.display = true;
                    });
                }
            };
        }];
    };