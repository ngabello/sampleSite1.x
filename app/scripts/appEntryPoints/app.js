/**
 * Created by gabello on 12/2/2015.
 */
'use strict';

angular.module('entry.points.app', [
  'ui.router',
  'ui.bootstrap',
  'quotes.config',
  'platform.apiServices',
  'platform.lookupDataService',
  'platform.logging',
  'platform.modal',
  'platform.eventTracking',
  'platform.journeyNavigation',
  'quotes.services',
  'platform.loadingMsg',
  'quotes.models',
  'ngMessages',
  'environment.config',
  'ngIdle',
  'ui.mask',
  'ui.date',
  'templates',
  'idle-timeout',
  'LocalStorageModule',
  'ngSurprise',
  'angularSpinners'
])

  .controller('BaseLandingController', BaseLandingCtrl())
  .factory('quoteRetrieveService', QuoteRetrieveService())
  .config(['$idleProvider', 'environmentLink', function ($idleProvider, environmentLink) {
    console.log(environmentLink.idleDuration);
    $idleProvider.idleDuration(environmentLink.idleDuration);
    $idleProvider.warningDuration(environmentLink.warningDuration);
    //$keepaliveProvider.interval(10);
  }])
  .run(IdleListener())

  .config(['$stateProvider', function ($stateProvider) {
    var states = new getAppEntryPointsFlowState();
    _.values(states).forEach(function (state) {
      $stateProvider.state(state);
    });
  }])

  .directive('defaultLanding', DefaultLanding())
  .directive('toyLanding', ToyLanding())
  .directive('compareNumber', CompareNumber());
