/**
 * Created by new on 3/12/2015.
 */
function appdynamicsTrackingService(){
'use strict';
  return ['$window', 'appDynamics', function($window, appDynamics){
   return{
     track: function(){
       $window["adrum-app-key"] = appDynamics.appDynamicsId;
       $window['adrum-start-time'] = new Date().getTime();
     }
   }
  }]
}
