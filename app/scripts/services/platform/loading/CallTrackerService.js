
function CallTrackerService(){
    'use strict';

    return ['$rootScope', function($rootScope){
        var _ALL_CALLS = 'all-calls';
        var registeredCallGroups = {};

        function registerCallWithGroup(callGroup) {
            var groupInfo = registeredCallGroups[callGroup];
            if ( !groupInfo ) {
                groupInfo = registeredCallGroups[callGroup] = { inFlightCalls:0, lastError: 0};
            }
            groupInfo.inFlightCalls += 1;
        }

        function registerCallSuccessWithGroup(callGroup) {
            var groupInfo = registeredCallGroups[callGroup];
            if ( groupInfo ) {
                groupInfo.inFlightCalls -= 1;
            }
        }

        function registerCallErrorWithGroup(callGroup) {
            var groupInfo = registeredCallGroups[callGroup];
            if ( groupInfo ) {
                groupInfo.inFlightCalls -= 1;
                groupInfo.lastError = new Date();
            }
        }

        function forEachCallGroup(callGroups, op) {
            if ( Array.isArray(callGroups) ) {
                for( var i = 0; i < callGroups.length; i++ ) {
                    op(callGroups[i]);
                }
            } else {
                op(callGroups);
            }
        }

        $rootScope.callTrackerCounter = 0;

        return {
            /**
             * @constant {string} - The global call group name. Every call start, success and error is also
             * registered with this call group.
             */
            ALL_CALLS: _ALL_CALLS,

            /**
             * Registers a new asynchronous call with a given set of call groups, incrementing the number of
             * in-flight calls for the call groups. This method also register the call with the global call group.
             *
             * @param callGroups {(string|string[])=all-calls} - call groups the call has to be registered with.
             */
            registerCallStart : function(callGroups){
                registerCallWithGroup(_ALL_CALLS);
                forEachCallGroup(callGroups, registerCallWithGroup);
                $rootScope.callTrackerCounter += 1;
            },

            /**
             * Register a successful asynchronous call with the given set of call groups, decrementing the number
             * of in-flight calls for the call groups.
             *
             * @param callGroups {(string|string[])=all-calls} - call groups the successful call has to be registered with.
             */
            registerCallSuccess : function(callGroups) {
                registerCallSuccessWithGroup(_ALL_CALLS);
                forEachCallGroup(callGroups, registerCallSuccessWithGroup);
                $rootScope.callTrackerCounter += 1;
            },

            /**
             * Register a failed asynchronous call with the given set of call groups, decrementing the number
             * of in-flight calls and setting the last error timestamp for the call groups.
             *
             * @param callGroups {(string|string[])=all-calls} - call groups the failed call has to be registered with.
             */
            registerCallError : function(callGroups) {
                registerCallErrorWithGroup(_ALL_CALLS);
                forEachCallGroup(callGroups, registerCallErrorWithGroup);
                $rootScope.callTrackerCounter += 1;
            },

            /**
             * Checks if there is any in-flight call for any of the given call groups.
             *
             * @param callGroups {(string|string[])=all-calls} - call groups to check.
             */
            anyInFlightCall : function(callGroups) {
                var callCount = 0;

                if ( !callGroups ) {
                    // No call group, test 'all-calls'
                    var callGroup = registeredCallGroups[_ALL_CALLS];
                    if ( callGroup && callGroup.inFlightCalls ) {
                        callCount = callGroup.inFlightCalls > 0;
                    }
                } else {
                    forEachCallGroup(callGroups, function(callGroup) {
                        var group = registeredCallGroups[callGroup];
                        if ( group && group.inFlightCalls ) {
                            callCount += group.inFlightCalls;
                        }
                    });
                }

                return callCount > 0;
            },

            /**
             * Checks if there is any error registered after the given time for any of the given call groups.
             *
             * @param fromTime {Date} - the time to check.
             * @param callGroups {(string|string[])=all-calls} - call groups to check.
             */
            anyErrorAfter : function(fromTime, callGroups) {
                var latestError = new Date(0);

                if ( !callGroups ) {
                    // No call group, test 'all-calls'
                    var callGroup = registeredCallGroups[_ALL_CALLS];
                    if ( callGroup && callGroup.lastError ) {
                        latestError = callGroup.lastError;
                    }
                } else {
                    forEachCallGroup(callGroups, function(callGroup) {
                        var group = registeredCallGroups[callGroup];
                        if ( group && group.lastError && group.lastError > latestError) {
                            latestError = group.lastError;
                        }
                    });
                }

                return fromTime < latestError;
            }
        };
    }];
};
