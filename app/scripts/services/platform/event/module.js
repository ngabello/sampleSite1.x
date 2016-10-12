/**
 * Created by gabello on 4/13/2016.
 */
'use strict';
angular.module('platform.event', [])
  .factory('EventService', EventService())
  .run(['EventService', '$rootScope', function(eventService, $rootScope){
    $rootScope.$on('$stateChangeSuccess', function(){
      eventService.clearMap();
    })
  }]);

