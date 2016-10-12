/**
 * Created by gabello on 12/4/2015.
 */
'use strict';
angular.module('platform.journeyNavigation', ['ui.router'])
  .factory('JourneyService', JourneyService())
  .provider('JourneyRouteService', ['$stateProvider', function ($stateProvider) {
    this.$get = function () {
      return {
        addState: function (stateItem, journeyIdentifier) {
          $stateProvider.state(stateItem.pageName, {
            url: stateItem.url.replace('/', '/' + journeyIdentifier),
          //  name: journeyIdentifier + stateItem.pageName,
            templateUrl: stateItem.templateUrl,
            controller: eval(stateItem.controller),
            controllerAs: stateItem.controllerAs,
            data: stateItem.data
          });
        }
      }
    }
  }
  ])
  //TODO move to a centralized place
  .run(['JourneyService', '$rootScope', function(journeyService, $rootScope){
    $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams){
      journeyService.processStateChange(ev, to, from);
    })
  }]);

