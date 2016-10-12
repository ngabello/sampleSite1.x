/**
 * Created by jholloman on 2/25/2015.
 */


function OptimizelyTrackingService() {
  'use strict';
  return ['$window', '$location', 'journeyInfo', function ($window, $location, journeyInfo) {
    return {
      trackPage: function ($log, localStorageService) {
        try {
          var optimizely = window['optimizely'] = window['optimizely'] || [];
          var source = localStorageService.get(prefillSource);
          if (source) {
            optimizely.push(["customTag", 'prefill_source', source]);
          }
          optimizely.push(["activate"]);
        } catch (e) {
          if (!(e instanceof ReferenceError)) {
            $log.error('OptimizelyTrackingService failed with exeception', e);
          }
        }
      },
      setJourney: function(){
        //setup and bucketing for optimizely
        //right now just check the journey id
        return $location.search().quotesJourneyId || $window.quotesJourneyId || _.keys(journeyInfo)[0];
      }
    }
  }]
}
