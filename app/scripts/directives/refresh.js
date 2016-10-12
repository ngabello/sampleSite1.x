/**
 * Created by jholloman on 1/29/2015.
 */
function Refresh() {
  'use strict';
  return ['$window', 'segmentIoTrackingService', 'JourneyService', 'QuoteIntentModel',
    function ($window, segmentIoTrackingService, journeyService, quoteIntentModel) {
    return {
      link: function (scope, el, att) {
        $window.onbeforeunload = function () {
          segmentIoTrackingService.trackCustomEvent('exitAttempt', [{key: 'quoteIntentId', value: quoteIntentModel.getQuoteIntentId()}]);
          return 'Refreshing may clear your session';
        };
        scope.$on('$destroy', function () {
          $window.onbeforeunload = null;
        })
      }
    }
  }]
}
