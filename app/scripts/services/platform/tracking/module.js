/**
 * Created by gabello on 12/15/2014.
 */
angular.module('platform.eventTracking', ['ngCookies'])
  .factory('segmentIoTrackingService', SegmentIoTrackingService())
  .factory('optimizelyTrackingService', OptimizelyTrackingService())
  .factory('convertTrackingService', ConvertTrackingService())
  .factory('appdynamicsTrackingService', appdynamicsTrackingService())
  .factory('generalTrackingService', GeneralTrackingService())
  //.service('speedTrackingService', speedTrackingService())
  .factory('gaTrackingService', gaTrackingService())
  .factory('qualarooTrackingService', QualarooTrackingService())
  .run(['$rootScope', 'generalTrackingService', 'localStorageService', '$location', function ($rootScope, generalTrackingService, localStorageService, $location) {
      localStorageService.clearAll();
      $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
        generalTrackingService.trackPage(to);
      });
      $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
        if(from.name == 'quoteTermination'){
          $location.path('/postal-code');
        }
      });
    }]);
