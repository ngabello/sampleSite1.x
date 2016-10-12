/**
 * Created by jholloman on 12/4/2014.
 */
/**
 * @license Angulartics v0.17.0
 * (c) 2013 Luis Farzati http://luisfarzati.github.io/angulartics
 * License: MIT
 */
(function (angular) {
  'use strict';

  /**
   * @ngdoc overview
   * @name angulartics.segment.io
   * Enables analytics support for Segment.io (http://segment.io)
   */

  var getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  };

  angular.module('pachyderm.segment.io', ['angulartics'])
    .config(['$analyticsProvider', 'environmentLink', function ($analyticsProvider, environmentLink) {

     $analyticsProvider.registerPageTrack(function (path, $location) {
        try {
          analytics.page(path, {
            path: path,
            //url:           $location.absUrl(), // TODO: why doesn't this work in Chrome? It's the preferred approach
            url: window.location.toString(),
            env: environmentLink.environment,
            quoteNumber: getCookie('quoteId'),
            previousView: getCookie('previousView')
            //quoteNumber:  window.sessionStorage.quoteID,
            //previousView: window.sessionStorage.previousView
          });

          // set the previousView to path in order
          // to log previous view with each page view
          document.cookie = 'previousView=' + path;
          //window.sessionStorage.previousView = path;
        } catch (e) {
          if (!(e instanceof ReferenceError)) {
            throw('SegmentIO registerPageTrack call failed');
          }
        }
      });

      $analyticsProvider.registerEventTrack(function (action, properties) {
        try {
          properties['env'] = environmentLink.environment;
          properties['quoteNumber'] = getCookie('quoteId');
          //properties['quoteNumber'] = window.sessionStorage.quoteID;
          analytics.track(action, properties);
        } catch (e) {
          if (!(e instanceof ReferenceError)) {
            throw('SegmentIO registerEventTrack call failed');
          }
        }
      });
    }]);
})(angular);
